// import fs from "fs/promises";
// import { createReadStream, createWriteStream, promises as fsp } from "fs";
// import os from "os";
// import path from "path";
// import readline from "readline";
// import { pipeline } from "stream/promises";
// import { createBrotliCompress, createBrotliDecompress } from "zlib";
// import crypto from "crypto";

// class FileManager {
//   constructor(username) {
//     this.username = username;
//     this.currentDirectory = os.homedir();
//     this.rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//   }

//   async init() {
//     console.log(`Welcome to the File Manager, ${this.username}!`);
//     this.printCurrentDirectory();
//     this.rl.on("line", (input) => this.handleCommand(input));
//   }

//   printCurrentDirectory() {
//     console.log(`You are currently in ${this.currentDirectory}`);
//   }

//   async handleCommand(input) {
//     const [command, ...args] = input.split(" ");
//     try {
//       switch (command) {
//         case "up":
//           this.moveUp();
//           break;
//         case "cd":
//           await this.changeDirectory(args[0]);
//           break;
//         case "ls":
//           await this.listDirectory();
//           break;
//         case "cat":
//           await this.readFileContents(args[0]);
//           break;
//         case "add":
//           await this.createFile(args[0]);
//           break;
//         case "rn":
//           await this.renameFile(args[0], args[1]);
//           break;
//         case "cp":
//           await this.copyFile(args[0], args[1]);
//           break;
//         case "mv":
//           await this.moveFile(args[0], args[1]);
//           break;
//         case "rm":
//           await this.deleteFile(args[0]);
//           break;
//         case "os":
//           this.osInfo(args[0]);
//           break;
//         case "hash":
//           await this.calculateFileHash(args[0]);
//           break;
//         case "compress":
//           await this.compressFile(args[0], args[1]);
//           break;
//         case "decompress":
//           await this.decompressFile(args[0], args[1]);
//           break;
//         case ".exit":
//           this.exit();
//           break;
//         default:
//           console.log("Invalid input");
//       }
//     } catch (error) {
//       console.error("Operation failed:", error.message);
//     }
//     this.printCurrentDirectory();
//   }

//   async moveUp() {
//     const parentDirectory = path.resolve(this.currentDirectory, "..");

//     if (parentDirectory !== this.currentDirectory) {
//       this.currentDirectory = parentDirectory;
//       console.log(`Moved up to ${this.currentDirectory}`);
//     } else {
//       console.log("You're at the root directory.");
//     }
//   }

//   async changeDirectory(targetPath) {
//     const newPath = path.resolve(this.currentDirectory, targetPath);
//     try {
//       const stat = await fsp.stat(newPath);
//       if (stat.isDirectory()) {
//         this.currentDirectory = newPath;
//         console.log(`Changed directory to ${this.currentDirectory}`);
//       } else {
//         console.log(`${targetPath} is not a directory.`);
//       }
//     } catch (error) {
//       console.log(`The directory does not exist.`);
//     }
//   }

//   async listDirectory() {
//     try {
//       const files = await fs.readdir(this.currentDirectory, {
//         withFileTypes: true,
//       });
//       files.forEach((file) => {
//         console.log(`${file.isDirectory() ? "Папка" : "Файл"}: ${file.name}`);
//       });
//     } catch (error) {
//       console.log("Failed to list directory contents");
//     }
//   }

//   async readFileContents(filePath) {
//     const fullPath = path.join(this.currentDirectory, filePath);
//     try {
//       const readStream = createReadStream(fullPath);
//       readStream.pipe(process.stdout);
//     } catch (error) {
//       console.log(`Failed to read file: ${filePath}`);
//     }
//   }

//   async createFile(fileName) {
//     const fullPath = path.join(this.currentDirectory, fileName);
//     try {
//       await fs.writeFile(fullPath, "");
//       console.log(`File created: ${fileName}`);
//     } catch (error) {
//       console.log(`Failed to create file: ${fileName}`);
//     }
//   }

//   async renameFile(oldPath, newPath) {
//     try {
//       await fs.rename(
//         path.join(this.currentDirectory, oldPath),
//         path.join(this.currentDirectory, newPath)
//       );
//       console.log(`File renamed from ${oldPath} to ${newPath}`);
//     } catch (error) {
//       console.log(`Failed to rename file: ${oldPath}`);
//     }
//   }

//   async copyFile(source, destination) {
//     try {
//       const srcPath = path.join(this.currentDirectory, source);
//       const destPath = path.join(this.currentDirectory, destination);
//       await fsp.copyFile(srcPath, destPath);
//       console.log(`File copied from ${source} to ${destination}`);
//     } catch (error) {
//       console.log(`Failed to copy file: ${source}`);
//     }
//   }

//   async moveFile(source, destination) {
//     try {
//       const srcPath = path.join(this.currentDirectory, source);
//       const destPath = path.join(this.currentDirectory, destination);
//       await fsp.rename(srcPath, destPath);
//       console.log(`File moved from ${source} to ${destination}`);
//     } catch (error) {
//       console.log(`Failed to move file: ${source}`);
//     }
//   }

//   async deleteFile(filePath) {
//     try {
//       await fs.unlink(path.join(this.currentDirectory, filePath));
//       console.log(`File deleted: ${filePath}`);
//     } catch (error) {
//       console.log(`Failed to delete file: ${filePath}`);
//     }
//   }

//   osInfo(option) {
//     switch (option) {
//       case "--EOL":
//         console.log(JSON.stringify(os.EOL));
//         break;
//       case "--cpus":
//         console.log(JSON.stringify(os.cpus()));
//         break;
//       case "--homedir":
//         console.log(os.homedir());
//         break;
//       case "--username":
//         console.log(os.userInfo().username);
//         break;
//       case "--architecture":
//         console.log(os.arch());
//         break;
//       default:
//         console.log("Invalid OS info option");
//     }
//   }

//   async calculateFileHash(filePath) {
//     const fullPath = path.join(this.currentDirectory, filePath);
//     try {
//       const hash = crypto.createHash("sha256");
//       const input = createReadStream(fullPath);
//       input.on("readable", () => {
//         const data = input.read();
//         if (data) hash.update(data);
//         else {
//           console.log(`File hash: ${hash.digest("hex")}`);
//         }
//       });
//     } catch (error) {
//       console.log(`Failed to calculate hash for file: ${filePath}`);
//     }
//   }

//   async compressFile(inputPath, outputPath) {
//     const srcPath = path.join(this.currentDirectory, inputPath);
//     const destPath = path.join(this.currentDirectory, outputPath);
//     try {
//       await pipeline(
//         createReadStream(srcPath),
//         createBrotliCompress(),
//         createWriteStream(destPath)
//       );
//       console.log(`File compressed to ${outputPath}`);
//     } catch (error) {
//       console.log(`Failed to compress file: ${inputPath}`);
//     }
//   }

//   async decompressFile(inputPath, outputPath) {
//     const srcPath = path.join(this.currentDirectory, inputPath);
//     const destPath = path.join(this.currentDirectory, outputPath);
//     try {
//       await pipeline(
//         createReadStream(srcPath),
//         createBrotliDecompress(),
//         createWriteStream(destPath)
//       );
//       console.log(`File decompressed to ${outputPath}`);
//     } catch (error) {
//       console.log(`Failed to decompress file: ${inputPath}`);
//     }
//   }

//   async listDirectory() {
//     try {
//       const files = await fs.readdir(this.currentDirectory, {
//         withFileTypes: true,
//       });
//       let table = "";
//       const dirs = [];
//       const fls = [];

//       files.forEach((dirent) => {
//         const row = `  ${dirent.name.padEnd(20)} ${
//           dirent.isDirectory() ? "directory" : "file"
//         }`;
//         if (dirent.isDirectory()) {
//           dirs.push(row);
//         } else {
//           fls.push(row);
//         }
//       });

//       const allEntries = dirs.sort().concat(fls.sort());

//       table += "  Name".padEnd(22) + "Type\n";
//       table += "".padEnd(40, "-") + "\n";

//       allEntries.forEach((entry, index) => {
//         table += `${index.toString().padEnd(4)}${entry}\n`;
//       });

//       console.log(table);
//     } catch (error) {
//       console.log("Failed to list directory contents");
//     }
//   }

//   exit() {
//     console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
//     this.rl.close();
//     process.exit();
//   }
// }

// const usernameArg = process.argv.find((arg) => arg.startsWith("--username="));
// const username = usernameArg ? usernameArg.split("=")[1] : "User";

// const fileManager = new FileManager(username);
// fileManager.init();
