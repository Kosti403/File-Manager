import readline from "readline";

export const createCLI = (handleInput) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (input) => handleInput(input));

  return rl;
};

export const closeCLI = (rl) => {
  rl.close();
};
