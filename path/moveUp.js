
import path from "path";

export function moveUp(currentDirectory) {
  const parentDirectory = path.resolve(currentDirectory, "..");
  if (parentDirectory !== currentDirectory) {
    console.log(`Moved up to${parentDirectory}`);
    return parentDirectory;
  } else {
    console.log("You're at the root directory.");
    return currentDirectory;
  }
}
