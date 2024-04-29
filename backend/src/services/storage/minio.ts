import { Client as MinioClient } from "minio";
import { MinioParams, UploadParams, createFileFromLocalFile } from "./types";
import fs from "fs";
import { database, schema } from "../../zapatos";
import { pool } from "../../database/pool";

const endPoint = process.env.MINIO_ENDPOINT || "127.0.0.1";
const port = parseInt(process.env.MINIO_PORT || "9000");
const useSSL = JSON.parse(process.env.MINIO_USE_SSL || "false");
const accessKey = process.env.MINIO_ACCESS_KEY || "minioadmin";
const secretKey = process.env.MINIO_SECRET_KEY || "minioadmin";
const bucketName = process.env.MINIO_BUCKET_NAME || "bucket";
const region = process.env.MINIO_REGION || "ap-southeast-1";

export default class MinioStorage {
  private minioClient: MinioClient;
  private user_id: string;
  private directory: string;
  constructor(params: MinioParams) {
    this.minioClient = this.initialize();
    this.user_id = params.user_id
    this.directory = params.directory;
  }
  private initialize() {
    const minioClient = new MinioClient({
      endPoint,
      port,
      useSSL,
      accessKey,
      secretKey
    });
    return minioClient;
  }
  async uploadFile(params: UploadParams) {
    const { fileName, filePath, type, display_order, image_type, item_id } = params;
    await this.createBucketIfNotExists();
    const image_url = await this.createFileFromLocalFile({ fileName, filePath });
    await this.deleteFileFromLocalFile({ filePath });
    switch (type) {
      case "profile_pict":
        return await this.insertProfilePicture({ image_url });
      case "item_image":
        return await this.insertItemImage({ image_url, item_id: item_id!, display_order: display_order! });
      case "featured_image":
        return await this.insertFeaturedImage({ image_url, display_order: display_order!, image_type: image_type! });
    }
  }
  // minio
  private async setBucketPolicy() {
    const policy = {
      Version: "2012-10-17",
      Statement: [{
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/*`]
      }]
    };
    this.minioClient.setBucketPolicy(bucketName, JSON.stringify(policy), (err) => {
      if (err) {
        console.error("Error setting bucket policy:", err);
        return;
      }
      console.log("Bucket policy set to 'download' for permanent presigned URLs.");
    });
  }
  private async createBucketIfNotExists() {
    this.minioClient.bucketExists(bucketName, async (err, exists) => {
      if (err) {
        console.error(err);
      }
      if (!exists) {
        this.minioClient.makeBucket(bucketName, region, (err) => {
          console.error(err);
        });
        console.log(`Bucket created successfully in ${region}`);
        await this.setBucketPolicy();
      } else {
        console.log("Bucket already exists");
      }
    });
  };
  private generateUrl(params: { fileName: string }) {
    const { fileName } = params;
    return `http://${endPoint}:${port}/${bucketName}/${this.directory}/${fileName}`
  } 
  private async createFileFromLocalFile(params: createFileFromLocalFile) {
    const { fileName, filePath } = params;
    const objectName = `/${this.directory}/${fileName}`;
    try {
      await this.minioClient.fPutObject(
        bucketName,
        objectName,
        filePath  
      );
      console.log(`File ${fileName} uploaded successfully to minio.`);
      return this.generateUrl({ fileName })
    } catch (error) {
      console.error(`Error uploading file ${fileName} to Minio:`, error);
      throw error;  
    }
  };
  // profile picture
  private async insertProfilePicture(params: { image_url: string }) {
    const { image_url } = params;
    const payload: schema.user_detail.Updatable = {
      updated_at: new Date(),
      profile_picture: image_url
    }
    const data = await database.update("user_detail", payload, { user_id: this.user_id }).run(pool);
    return data;
  }
  // item image
  private async insertItemImage(params: { image_url: string, item_id: string, display_order: number }) {
    const { image_url, display_order, item_id } = params;
    const payload: schema.item_image.Insertable = {
      updated_at: new Date(),
      image_url,
      item_id,
      display_order
    }
    const data = await database.insert("item_image", payload, { returning: ["id"] }).run(pool);
    return data;
  }
  // featured image
  private async insertFeaturedImage(params: { image_url: string, display_order: number, image_type: string }) {
    const { image_url, display_order, image_type } = params;
    const payload: schema.featured_image.Insertable = {
      updated_at: new Date(),
      image_url,
      display_order,
      type: image_type
    }
    const data = await database.insert("featured_image", payload, { returning: ["id"] }).run(pool);
    return data;
  }

  private async deleteFileFromLocalFile(params: { filePath: string }) {
    const { filePath } = params;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Error deleting file:', err")
        return;
      }
    })
    console.log('Local file deleted successfully');
  };
}
