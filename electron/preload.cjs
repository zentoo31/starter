const { contextBridge, ipcRenderer } = require("electron");

console.log("PRELOAD FUNCIONA");

contextBridge.exposeInMainWorld("electronAPI", {
  getSystemInfo: () => ipcRenderer.invoke("system:getInfo"),
  checkWinget: () => ipcRenderer.invoke("winget:check"),
  checkProgramInstalled: (program) => ipcRenderer.invoke("program:check-installed", program),
  openNiniteDownload: (selectedIds) => ipcRenderer.invoke("program:open-ninite", selectedIds),
  installProgram: (program) => ipcRenderer.invoke("program:install", program),
  uninstallProgram: (program) => ipcRenderer.invoke("program:uninstall", program),
  executeMassgrave: () => ipcRenderer.invoke("windows:execute-massgrave"),
  onInstallLog: (callback) => {
    const listener = (_event, payload) => callback(payload);

    ipcRenderer.on("install:log", listener);

    return () => {
      ipcRenderer.removeListener("install:log", listener);
    };
  },
});