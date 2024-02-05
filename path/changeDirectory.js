import path from "path";
import { promises as fsp } from "fs";

export async function changeDirectory(currentDirectory, targetPath) {
  const newPath = path.resolve(currentDirectory, targetPath);
  try {
    const stat = await fsp.stat(newPath);
    if (stat.isDirectory()) {
      console.log(`Changed directory to ${newPath}`);
      return newPath;
    } else {
      console.log(`${targetPath}is not a directory.`);
    }
  } catch (error) {
    console.log(`The directory does not exist.`);
  }
  return currentDirectory;
}
