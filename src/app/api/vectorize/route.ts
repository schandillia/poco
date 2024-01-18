/* eslint-disable import/prefer-default-export, @typescript-eslint/no-unused-vars */

import { Pinecone } from "@pinecone-database/pinecone"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { NextRequest, NextResponse } from "next/server"
import { OpenAIEmbeddings } from "@langchain/openai"
import { PineconeStore } from "@langchain/community/vectorstores/pinecone"
import generateFilename from "@/lib/generateFilename"

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
  const paperName = await generateFilename(arrayBuffer)

  // Vectorize and index document
  const pinecone = new Pinecone()
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX as string)

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  })
  await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
    namespace: paperName,
  })

  return NextResponse.json({ success: true, pages: pagesAmt })
}
