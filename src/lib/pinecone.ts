import { Pinecone } from "@pinecone-database/pinecone"

const getPineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
  environment: process.env.PINECONE_ENVIRONMENT as string,
})
export default getPineconeClient
