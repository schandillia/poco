/* eslint-disable import/prefer-default-export, @typescript-eslint/no-unused-vars */
import { Pinecone } from "@pinecone-database/pinecone"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { NextRequest, NextResponse } from "next/server"
import { OpenAIEmbeddings } from "@langchain/openai"
import { PineconeStore } from "@langchain/community/vectorstores/pinecone"
import { json } from "stream/consumers"
import generateFileId from "@/lib/generate-file-id"

async function streamToArrayBuffer(stream: ReadableStream) {
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

export async function POST(request: NextRequest) {
  const response = await request.body
  if (!response) return NextResponse.json({ success: false })
  // Convert the ReadableStream to an ArrayBuffer
  const arrayBuffer = await new Response(response).arrayBuffer()
  const blob = new Blob([arrayBuffer])
  const loader = new PDFLoader(blob)
  const pageLevelDocs = await loader.load()
  const pageCount = pageLevelDocs.length
  // const paperName = await generateFileId(arrayBuffer)

  // Vectorize and index document
  // Uncomment the following section when project ready because every OpenAI API call costs money
  // const pinecone = new Pinecone()
  // const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX as string)

  // const embeddings = new OpenAIEmbeddings({
  //   openAIApiKey: process.env.OPENAI_API_KEY,
  // })
  // await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
  //   pineconeIndex,
  //   maxConcurrency: 5,
  //   namespace: paperName,
  // })

  console.log({ success: true, pageCount })

  return NextResponse.json({ success: true, pageCount })
}
