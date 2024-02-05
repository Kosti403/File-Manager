import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";
import path from "path";
export async function decompressFile(currentDirectory, inputPath, outputPath) {
  const srcPath = path.join(currentDirectory, inputPath);
  const destPath = path.join(currentDirectory, outputPath);
  try {
    await pipeline(
      createReadStream(srcPath),
      createBrotliDecompress(),
      createWriteStream(destPath)
    );
    console.log(`File decompressed to ${outputPath}`);
  } catch (error) {
    console.log(`Failed to decompress file: ${inputPath}`, error);
  }
}
