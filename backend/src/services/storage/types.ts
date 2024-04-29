export type MinioParams = {
  directory: string;
  user_id: string;
}

export type createFileFromLocalFile = {
  fileName: string;
  filePath: string;
}

export type UploadParams = {
  fileName: string;
  filePath: string;
  type: "profile_pict" | "item_image" | "featured_image";
  item_id?: string;
  display_order?: number;
  image_type?: string;
}

export type insertProfilePict = {
  user_id: string;
  image_url: string;
}

export type InsertItemImageParams = {
  item_id: string;
  image_url: string;
  display_order: number;
}

export type insertFeaturedImage = {
  type: string;
  image_url: string;
  display_order: number;
}