import { NextResponse } from "next/server"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

// Securely import AWS credentials from environment variables
const S3_REGION = process.env.AWS_S3_REGION
const S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID
const S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY
const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME

if (
  !S3_REGION ||
  !S3_ACCESS_KEY_ID ||
  !S3_SECRET_ACCESS_KEY ||
  !S3_BUCKET_NAME
) {
  throw new Error("Missing AWS S3 credentials in environment variables!")
}

const s3Client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
})

export async function GET(_: Request, { params }: { params: { key: string } }) {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: `${params.paperId}.pdf`,
  })

  const src = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

  return NextResponse.json({ src })
}
