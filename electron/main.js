import { app, BrowserWindow } from "electron";
import "./ipc/system.js";
import "./ipc/winget.js";
import "./ipc/programs.js";
import "./ipc/windows.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const preloadPath = path.join(__dirname, "preload.cjs");
console.log(fs.existsSync(preloadPath));

console.log(preloadPath);
console.log("Main iniciado");
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(process.cwd(), "public", "icon.ico"),
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname, "../dist/index.html"));
  console.log("ventana")
}

app.whenReady().then(() => {
  createWindow();
  console.log("electron iniciado")
});

