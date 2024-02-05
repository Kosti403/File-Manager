import fs from "fs/promises";
import path from "path";

export async function deleteFile(currentDirectory, filePath) {
  const fullPath = path.join(currentDirectory, filePath);
  try {
    await fs.unlink(fullPath);
    console.log(`File deleted: ${filePath}`);
  } catch (error) {
    console.log(`Failed to delete file: ${filePath}, error: ${error}`);
  }
}
