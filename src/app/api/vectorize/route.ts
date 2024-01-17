/* eslint-disable import/prefer-default-export */

import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { NextRequest, NextResponse } from "next/server"

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
  const pagesAmt = pageLevelDocs.length
  console.log(pagesAmt)
  return NextResponse.json({ success: true, pages: pagesAmt })
}
