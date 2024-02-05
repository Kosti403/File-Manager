import os from "os";

export const getEOL = () => JSON.stringify(os.EOL);

export const getCPUs = () => JSON.stringify(os.cpus());

export const getHomeDir = () => os.homedir();

export const getUsername = () => os.userInfo().username;

export const getArchitecture = () => os.arch();

export const osInfo = (option) => {
  switch (option) {
    case "--EOL":
      return getEOL();
    case "--cpus":
      return getCPUs();
    case "--homedir":
      return getHomeDir();
    case "--username":
      return getUsername();
    case "--architecture":
      return getArchitecture();
    default:
      return "Invalid OS info option";
  }
};
