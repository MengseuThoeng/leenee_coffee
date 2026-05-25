import { Client } from 'minio';

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL !== 'false',
  accessKey: process.env.MINIO_ROOT_USER || '',
  secretKey: process.env.MINIO_ROOT_PASSWORD || '',
});

const bucketName = process.env.MINIO_BUCKET_NAME || 'menu-images';

export async function uploadImage(
  fileName: string,
  fileBuffer: Buffer,
  mimeType: string
): Promise<string> {
  try {
    // Check if bucket exists, if not create it
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
    }

    // Upload file
    await minioClient.putObject(bucketName, fileName, fileBuffer, fileBuffer.length, {
      'Content-Type': mimeType,
    });

    // Return public URL
    const minioBaseUrl = `${process.env.MINIO_USE_SSL !== 'false' ? 'https' : 'http'}://${process.env.MINIO_ENDPOINT || 'localhost'}:${process.env.MINIO_PORT || '9000'}`;
    const publicUrl = `${minioBaseUrl}/${bucketName}/${fileName}`;
    
    return publicUrl;
  } catch (error) {
    console.error('MinIO upload error:', error);
    throw error;
  }
}

export default minioClient;
