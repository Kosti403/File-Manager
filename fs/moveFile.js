import fs from "fs/promises";
import path from "path";

export async function moveFile(currentDirectory, source, destination) {
  const srcPath = path.join(currentDirectory, source);
  const destPath = path.join(currentDirectory, destination);
  try {
    await fs.rename(srcPath, destPath);
    console.log(`File moved from ${source} to ${destination}`);
  } catch (error) {
    console.log(`Failed to move file: ${source}, error: ${error}`);
  }
}


