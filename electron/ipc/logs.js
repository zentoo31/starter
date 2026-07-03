import { spawn } from "node:child_process";

export function sendInstallLog(event, payload) {
  event.sender.send("install:log", {
    timestamp: new Date().toISOString(),
    ...payload,
  });
}

export function runLoggedProcess(event, command, args, meta = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    child.stdout?.on("data", (data) => {
      sendInstallLog(event, {
        ...meta,
        stream: "stdout",
        kind: "chunk",
        chunk: data.toString(),
      });
    });

    child.stderr?.on("data", (data) => {
      sendInstallLog(event, {
        ...meta,
        stream: "stderr",
        kind: "chunk",
        chunk: data.toString(),
      });
    });

    child.on("error", (error) => {
      sendInstallLog(event, {
        ...meta,
        stream: "stderr",
        kind: "error",
        chunk: error instanceof Error ? error.message : String(error),
      });
      reject(error);
    });

    child.on("close", (code) => {
      sendInstallLog(event, {
        ...meta,
        kind: "exit",
        code,
      });
      resolve({ code });
    });
  });
}
