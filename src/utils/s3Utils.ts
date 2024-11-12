// import { S3Client, PutObjectCommand, PutObject } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import dotenv from 'dotenv';

// dotenv.config();

// const s3 = new S3Client({
//   apiVersion:'v4',
//   region: process.env.S3_REGION || 'us-east-2',
//   credentials: {
//     accessKeyId: process.env.S3_KEY_ID as string,
//     secretAccessKey: process.env.S3_SECRET as string,
//   },
// });

// export async function generateSignedUrl(key: string, extension:string) {
//   const params = {
//     Bucket: process.env.S3_BUCKET_NAME as string,
//     Key: `temp/${key}`,
//     Expires: new Date(Date.now() + 60 * 10000), // Expiração em 60 segundos (Date)
//     ContentType: `image/${extension.replace('.','')}`,
//     // ContentType: `application/octet-stream`,
//   };

//   const command = new PutObjectCommand(params);
//   return await getSignedUrl(s3, command);
// }
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: process.env.S3_REGION || 'us-east-2',
  credentials: {
    accessKeyId: process.env.S3_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET as string,
  },
});

export async function generateSignedUrl(key:string, extension:string) {
  const params = {
        Bucket: process.env.S3_BUCKET_NAME as string,
        Key: `temp/${key}`,
        Expires: 600, // Expiração em 60 segundos (Date)
        ContentType: `image/${extension.replace('.','')}`,
        // ContentType: `application/octet-stream`,
  }
  return s3.getSignedUrl("putObject", params);
}

