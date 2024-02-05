import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";
import path from "path";

export async function compressFile(currentDirectory, inputPath, outputPath) {
  const srcPath = path.join(currentDirectory, inputPath);
  const destPath = path.join(currentDirectory, outputPath);
  try {
    await pipeline(
      createReadStream(srcPath),
      createBrotliCompress(),
      createWriteStream(destPath)
    );
    console.log(`File compressed to ${outputPath}`);
  } catch (error) {
    console.log(`Failed to compress file: ${inputPath}`, error);
  }
}
