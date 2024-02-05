
import crypto from "crypto";
import fs from "fs";
import path from "path";

export async function calculateFileHash(currentDirectory, filePath) {
  const fullPath = path.join(currentDirectory, filePath);
  try {
    const hash = crypto.createHash("sha256");
    const input = fs.createReadStream(fullPath);

    return new Promise((resolve, reject) => {
      input.on("readable", () => {
        const data = input.read();
        if (data) {
          hash.update(data);
        } else {
          resolve(hash.digest("hex"));
        }
      });

      input.on("error", reject);
    });
  } catch (error) {
    console.error(
      `Ошибка при расчёте хеша файла: ${filePath}, ошибка: ${error}`
    );
    throw error; // Переброс ошибки для обработки на более высоком уровне
  }
}
