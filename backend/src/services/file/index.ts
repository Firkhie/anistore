import path from "path";
import fs from "fs";

export const generateFullPath = (dir: string) => {
  if (path.isAbsolute(dir)) return dir;

  const abs_path = path.join(process.env.PWD!, dir);
  return abs_path;
};

export const getFileExtension = (file: string) => {
  return path.extname(file);
};

export const renameFile = (filePath: string, newName: string) => {
  const oldPath = path.dirname(filePath);
  const newPath = path.join(oldPath, newName);
  return fs.renameSync(filePath, newPath);
};