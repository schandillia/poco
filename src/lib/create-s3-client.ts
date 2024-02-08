import { S3Client } from "@aws-sdk/client-s3"

const createS3Client = (): S3Client => {
  const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY
  const bucketRegion = process.env.AWS_S3_REGION

  if (!accessKeyId || !secretAccessKey || !bucketRegion) {
    throw new Error("Missing AWS Credentials")
  }

  const client = new S3Client({
    region: bucketRegion,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })

  return client
}

export default createS3Client
