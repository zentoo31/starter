import { ipcMain } from "electron";
import { spawn } from "node:child_process";
import { runLoggedProcess } from "./logs.js";

export function runWinget(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("winget", args, {
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}

ipcMain.handle("winget:check", async () => {
  try {
    const result = await runWinget(["--version"]);

    return {
      installed: result.code === 0,
      version: result.stdout.trim(),
      error: result.stderr.trim(),
    };
  } catch (error) {
    return {
      installed: false,
      version: null,
      error: error instanceof Error ? error.message : "No se pudo ejecutar winget",
    };
  }
});

ipcMain.handle("winget:install", async (event, programId) => {
  const result = await runLoggedProcess(event, "winget", [
    "install",
    "--id",
    programId,
    "-e",
    "--silent",
    "--accept-package-agreements",
    "--accept-source-agreements",
  ], {
    source: "winget",
    action: "install",
    programId,
  });

  return {
    success: result.code === 0,
    code: result.code,
    stdout: "",
    stderr: "",
  };
});

ipcMain.handle("winget:uninstall", async (event, programId) => {
  const result = await runLoggedProcess(event, "winget", [
    "uninstall",
    "--id",
    programId,
    "-e",
    "--silent",
    "--accept-source-agreements",
  ], {
    source: "winget",
    action: "uninstall",
    programId,
  });

  return {
    success: result.code === 0,
    code: result.code,
    stdout: "",
    stderr: "",
  };
});
