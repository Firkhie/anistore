import { v4 } from "uuid";
import { generateFullPath, getFileExtension, renameFile } from "../file";

export type UploadDataParams = {
  file: Express.Multer.File;
  fileName?: string;
}

export default class UploadData {
  private file: Express.Multer.File;
  private fileName: string;
  constructor(params: UploadDataParams) {
    this.file = params.file;
    this.fileName = params.fileName || v4();
  }
  private getParams() {
    const { originalname, path } = this.file;
    return {
      originalname,
      path,
      fileName: this.fileName
    };
  }
  public async execute(): Promise<string> {
    const { originalname, path, fileName } = this.getParams();
    const newName = getFileExtension(fileName)
      ? fileName
      : fileName + getFileExtension(originalname);
    renameFile(path, newName);
    const newPath = generateFullPath(`tmp/resources/${newName}`);
    return newPath;
  }
}
