import { PineconeClient } from "@pinecone-database/pinecone"

const getPineconeClient = async () => {
  const client = new PineconeClient()

  await client.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT as string,
  })

  return client
}
export default getPineconeClient
