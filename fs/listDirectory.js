import fs from "fs/promises";

export async function listDirectory(currentDirectory) {
  try {
    const files = await fs.readdir(currentDirectory, { withFileTypes: true });
    let table = "  Name".padEnd(22) + "Type\n" + "".padEnd(40, "-") + "\n";
    const dirs = [];
    const fls = [];

    files.forEach((dirent) => {
      const row = `  ${dirent.name.padEnd(20)} ${
        dirent.isDirectory() ? "directory" : "file"
      }`;
      if (dirent.isDirectory()) {
        dirs.push(row);
      } else {
        fls.push(row);
      }
    });

    const allEntries = dirs.sort().concat(fls.sort());
    allEntries.forEach((entry) => {
      table += `${entry}\n`;
    });

    console.log(table);
  } catch (error) {
    console.log("Failed to list directory contents", error);
  }
}

