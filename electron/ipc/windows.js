import { ipcMain } from "electron";
import { spawn } from "node:child_process";

ipcMain.handle("windows:execute-massgrave", async () => {
  const wingetCommand = "irm https://get.activated.win | iex";
  const command = `Start-Process -FilePath powershell.exe -Verb RunAs -ArgumentList @('-NoExit', '-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', \"${wingetCommand}\")`;

  const child = spawn("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", command], {
    windowsHide: false,
    stdio: "ignore",
  });

  return await new Promise((resolve) => {
    child.on("error", (error) => {
      resolve({ success: false, error: error instanceof Error ? error.message : "No se pudo abrir PowerShell" });
    });

    child.on("close", (code) => {
      resolve({
        success: code === 0,
        error: code === 0 ? null : `PowerShell terminó con código ${code}`,
      });
    });
  });
});
