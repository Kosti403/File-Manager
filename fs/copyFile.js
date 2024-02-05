import fs from "fs/promises";
import path from "path";

export async function copyFile(currentDirectory, source, destination) {
  const srcPath = path.join(currentDirectory, source);
  const destPath = path.join(currentDirectory, destination);
  try {
    await fs.copyFile(srcPath, destPath);
    console.log(`File copied from ${source} to ${destination}}`);
  } catch (error) {
    console.log(`Failed to copy file: ${source}, error: ${error}`);
  }
}
