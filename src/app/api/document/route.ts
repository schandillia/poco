import { NextRequest, NextResponse } from "next/server"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import {
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3"
import createS3Client from "@/lib/create-s3-client"
import { PaperSchema } from "@/schemas"
import { db } from "@/lib/db"
import * as z from "zod"
import { v4 } from "uuid"

const paperId = v4()

const s3 = createS3Client()

// Convert file to ArrayBuffer
async function streamToArrayBuffer(stream: ReadableStream) {
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get("file") as File
  if (!file) throw new Error("No file uploaded")
  const arrayBuffer = await file.arrayBuffer()
  const paperTitle = file.name
  const blob = new Blob([arrayBuffer])
  const loader = new PDFLoader(blob)
  const pageLevelDocs = await loader.load()
  const pageCount = pageLevelDocs.length

  // STEP 1: Upload file to S3
  try {
    const uploadResult = await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
        Key: `${paperId}.pdf`, // Desired filename in S3
        Body: Buffer.from(arrayBuffer), // File content
      }),
    )

    // Option 1: Verify using ETag
    const headObjectResponse = await s3.send(
      new HeadObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${paperId}.pdf`,
      }),
    )

    if (uploadResult.ETag !== headObjectResponse.ETag) {
      throw new Error("ETag mismatch: Upload might be incomplete")
    }

    // Option 2: Verify using Object Lifecycle Rules (configure in S3 console)

    // Option 3: Verify file size & metadata
    const getObjectResponse = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${paperId}.pdf`,
      }),
    )

    if (getObjectResponse.ContentLength !== arrayBuffer.byteLength) {
      throw new Error("File size mismatch: Upload might be incomplete")
    }

    // Add more metadata checks as needed

    // Option 4: Use server-side S3 events (configure Lambda function)

    try {
      // Validate using Zod
      const validatedFields = PaperSchema.parse({
        id: paperId,
        paperTitle,
        pageCount,
      })
      // Create entry in prisma file db
      await db.paper.create({
        data: validatedFields,
      })

      return NextResponse.json({ validatedFields }, { status: 200 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Validation failed, access error details
        console.error("Validation errors:", error.issues)
        // Example: Log each issue's code and message
        error.issues.forEach((issue) => {
          console.error(`${issue.code}: ${issue.message}`)
        })
        // Handle the errors appropriately (e.g., return a response with error messages to the client)
        return NextResponse.json({ error: "Invalid fields" }, { status: 400 })
      } else {
        return NextResponse.json({ error: "Validation error" }, { status: 400 })
      }
    }
  } catch (error) {
    console.error("Error uploading file to S3:", error)
    return NextResponse.json({ error: "File upload failed" }, { status: 500 })
  }
}
