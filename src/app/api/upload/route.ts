import { NextRequest, NextResponse } from "next/server"
import generateFileId from "@/lib/generate-file-id"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3"
import createS3Client from "@/lib/create-s3-client"

const s3 = createS3Client()

async function streamToArrayBuffer(stream: ReadableStream) {
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

export async function POST(request: NextRequest) {
  const data = await request.body
  if (!data) return NextResponse.json({ success: false })

  const arrayBuffer = await streamToArrayBuffer(data)
  const blob = new Blob([arrayBuffer])
  const loader = new PDFLoader(blob)
  const pageLevelDocs = await loader.load()
  const pageCount = pageLevelDocs.length
  const paperId = await generateFileId(arrayBuffer)

  // STEP 1: Upload file to S3
  try {
    const uploadResult = await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Your S3 bucket name
        Key: `${paperId}.pdf`, // Desired filename in S3
        Body: arrayBuffer, // File content
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

    return NextResponse.json({ success: true, pageCount, paperId })
  } catch (error) {
    console.error("Error uploading file to S3:", error)
    return NextResponse.json({ success: false, error: "File upload failed" })
  }
}
