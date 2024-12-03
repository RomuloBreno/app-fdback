// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // Importa a função getSignedUrl

// // Criação do cliente S3 com as credenciais e a região
// const s3 = new S3Client({
//   region: process.env.S3_REGION || 'us-east-2',
//   credentials: {
//     accessKeyId: process.env.S3_KEY_ID as string,
//     secretAccessKey: process.env.S3_SECRET as string,
//   },
// });

// export async function generateSignedUrl(key: string, extension: string) {
//   const expiresIn = 6000; // 6000 segundos
//   const expirationDate = new Date();
//   expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);

//   const params: PutObjectCommand = {
//     Bucket: process.env.S3_BUCKET_NAME as string,
//     Key: `temp/${key}`,
//     Expires: expirationDate, // Expiração em 600 segundos (10 minutos)
//     ContentType: `image/${extension.replace('.', '')}`,
//   };

//   // Cria o comando PutObjectCommand
//   const command = new PutObjectCommand(params);
  
//   try {
//     // Usando getSignedUrl para gerar a URL assinada
//     const url = await getSignedUrl(s3, command);
//     return url; // Retorna a URL assinada
//   } catch (err) {
//     console.error("Erro ao gerar URL assinada:", err);
//     throw err;
//   }
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

