const { contextBridge, ipcRenderer } = require("electron");

console.log("PRELOAD FUNCIONA");

contextBridge.exposeInMainWorld("electronAPI", {
  getSystemInfo: () => ipcRenderer.invoke("system:getInfo"),
});