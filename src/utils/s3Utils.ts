import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Criação do cliente S3 com as credenciais e a região
const s3 = new S3Client({
  region: process.env.S3_REGION || 'us-east-2',
  credentials: {
    accessKeyId: process.env.S3_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET as string,
  },
});

export async function generateSignedUrl(key: string, extension: string): Promise<string> {
  const expiresIn = 600; // 10 minutos

  const params = {
    Bucket: process.env.S3_BUCKET_NAME as string,
    Key: `temp/${key}`,
    ContentType: `image/${extension.replace('.', '')}`,
  };

  const command = new PutObjectCommand(params);

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn });
    return signedUrl;
  } catch (err) {
    console.error("Erro ao gerar URL assinada:", err);
    throw err;
  }
}

// import AWS from "aws-sdk";

// const s3 = new AWS.S3({
//   signatureVersion: "v4",
//   region: process.env.S3_REGION || 'us-east-2',
//   credentials: {
//     accessKeyId: process.env.S3_KEY_ID as string,
//     secretAccessKey: process.env.S3_SECRET as string,
//   },
// });

// export async function generateSignedUrl(key:string, extension:string) {
//   const params = {
//         Bucket: process.env.S3_BUCKET_NAME as string,
//         Key: `temp/${key}`,
//         Expires: 600, // Expiração em 60 segundos (Date)
//         ContentType: `image/${extension.replace('.','')}`,
//         // ContentType: `application/octet-stream`,
//   }
//   return s3.getSignedUrl("putObject", params);
// }

