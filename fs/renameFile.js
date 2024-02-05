import fs from "fs/promises";
import path from "path";

export async function renameFile(currentDirectory, oldName, newName) {
  const oldPath = path.join(currentDirectory, oldName);
  const newPath = path.join(currentDirectory, newName);
  try {
    await fs.rename(oldPath, newPath);
    console.log(`File renamed from ${oldPath} to ${newPath}`);
  } catch (error) {
    console.log(`Failed to rename file: ${oldName}, error: ${error}`);
  }
}
