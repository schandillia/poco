/* eslint-disable import/prefer-default-export, @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server"
import generateFileId from "@/lib/generate-file-id"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
// import AWS from "aws-sdk"

// const s3 = new AWS.S3()

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

  /*
  STEP 1: Upload file to S3
  STEP 2: Add reference to file in Postgres
  */
  // return NextResponse.redirect(new URL(`/research/${paperId}`, request.url))
  return NextResponse.json({ success: true, pageCount, paperId })
}
