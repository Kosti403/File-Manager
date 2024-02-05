import fs from "fs/promises";
import path from "path";

export async function createFile(currentDirectory, fileName) {
  const fullPath = path.join(currentDirectory, fileName);
  try {
    await fs.writeFile(fullPath, "");
    console.log(`File created: ${fileName}`);
  } catch (error) {
    console.log(`Failed to create file: ${fileName}`);
  }
}
