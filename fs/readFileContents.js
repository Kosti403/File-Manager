import fs from "fs";
import path from "path";

export async function readFileContents(currentDirectory, filePath) {
  const fullPath = path.join(currentDirectory, filePath);
  try {
    const data = await fs.promises.readFile(fullPath, "utf8");
    console.log(data);
  } catch (error) {
    console.log(`Failed to read file: ${filePath}, error: ${error}`);
  }
}
