import { ipcMain } from "electron";

ipcMain.handle("background:showBgs", async (event, text) => {
    console.log("ejecutando bgs")
    const api = "https://wallpapers.com/api/v1/keyword/" + text + "?limit=20";
    console.log(api);
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
})

ipcMain.handle("background:setBg", async (event, text) => {

})