import { ipcMain } from "electron";
import si from "systeminformation";

ipcMain.handle("system:getInfo", async () => {
    console.log("entro al ipc")
    console.log("ipc called")
    const [cpu, mem, graphics, os, disks] = await Promise.all([
        si.cpu(),
        si.mem(),
        si.graphics(),
        si.osInfo(),
        si.fsSize()
    ]);

    return {
        cpu, mem, graphics, os, disks
    }
})
