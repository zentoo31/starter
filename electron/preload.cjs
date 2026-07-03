const { contextBridge, ipcRenderer } = require("electron");

console.log("PRELOAD FUNCIONA");

contextBridge.exposeInMainWorld("electronAPI", {
  getSystemInfo: () => ipcRenderer.invoke("system:getInfo"),
  checkWinget: () => ipcRenderer.invoke("winget:check"),
  checkProgramInstalled: (program) => ipcRenderer.invoke("program:check-installed", program),
  installProgram: (program) => ipcRenderer.invoke("program:install", program),
  uninstallProgram: (program) => ipcRenderer.invoke("program:uninstall", program),
  onInstallLog: (callback) => {
    const listener = (_event, payload) => callback(payload);

    ipcRenderer.on("install:log", listener);

    return () => {
      ipcRenderer.removeListener("install:log", listener);
    };
  },
});