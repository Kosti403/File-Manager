import os from "os";
import { compressFile } from "./zlib/compress.js";
import { decompressFile } from "./zlib/decompress.js";
import { createFile } from "./fs/createFile.js";
import { readFileContents } from "./fs/readFileContents.js";
import { copyFile } from "./fs/copyFile.js";
import { moveFile } from "./fs/moveFile.js";
import { deleteFile } from "./fs/deleteFile.js";
import { renameFile } from "./fs/renameFile.js";
import { calculateFileHash } from "./hash/calculateFileHash.js";
import { changeDirectory } from "./path/changeDirectory.js";
import { moveUp } from "./path/moveUp.js";
import { createCLI, closeCLI } from "./readline/cliTools.js";
import { listDirectory } from "./fs/listDirectory.js";
import { osInfo } from "./os/osInfo.js";

class FileManager {
  constructor(username) {
    this.username = username;
    this.currentDirectory = os.homedir();
    this.rl = null;
  }

  async init() {
    console.log(`Welcome to the File Manager, ${this.username}!`);
    this.printCurrentDirectory();
    this.rl = createCLI((input) => this.handleCommand(input));
  }

  printCurrentDirectory() {
    console.log(`You are currently in ${this.currentDirectory}`);
  }

  async handleCommand(input) {
    const [command, ...args] = input.split(" ");
    try {
      switch (command) {
        case "up":
          this.currentDirectory = moveUp(this.currentDirectory);
          break;
        case "cd":
          this.currentDirectory = await changeDirectory(
            this.currentDirectory,
            args[0]
          );
          break;
        case "ls":
          await listDirectory(this.currentDirectory);
          break;
        case "add":
          await createFile(this.currentDirectory, args[0]);
          break;
        case "cat":
          await readFileContents(this.currentDirectory, args[0]);
          break;
        case "cp":
          await copyFile(this.currentDirectory, args[0], args[1]);
          break;
        case "mv":
          await moveFile(this.currentDirectory, args[0], args[1]);
          break;
        case "rm":
          await deleteFile(this.currentDirectory, args[0]);
          break;
        case "rn":
          await renameFile(this.currentDirectory, args[0], args[1]);
          break;
        case "os":
          console.log(osInfo(args[0]));
          break;
        case "hash":
          await calculateFileHash(this.currentDirectory, args[0]);

          break;
        case "compress":
          await compressFile(this.currentDirectory, args[0], args[1]);
          break;
        case "decompress":
          await decompressFile(this.currentDirectory, args[0], args[1]);
          break;
        case ".exit":
          this.exit();
          break;
        default:
          console.log("Invalid input");
      }
    } catch (error) {
      console.error("Operation failed:", error.message);
    }
    this.printCurrentDirectory();
  }

  exit() {
    console.log(`Thank you for using File Manager, ${this.username}, goodbye!`);
    closeCLI(this.rl);
    process.exit();
  }
}

const usernameArg = process.argv.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "User";

const fileManager = new FileManager(username);
fileManager.init();
