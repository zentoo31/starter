import { ipcMain, app } from "electron";
import { downloadFile } from "./programs.js";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import https from "node:https";
import { execFile } from "node:child_process";

ipcMain.handle("background:showBgs", async (event, text) => {
    const api = "https://wallpapers.com/api/v1/keyword/" + text + "?limit=30";
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

ipcMain.handle("background:setBg", async (event, url) => {
    const picturesPath = app.getPath("pictures");
    const starterFolder = path.join(picturesPath, "starter");

    // Crear la carpeta si no existe
    fs.mkdirSync(starterFolder, { recursive: true });

    // Ruta donde se guardará la imagen
    const destination = path.join(
        starterFolder,
        `background-${Date.now()}.jpg`
    );

    // Descargar la imagen
    await downloadFile(url, destination);

    // Cambiar el fondo de pantalla
    const script = `
                Add-Type @"
                using System.Runtime.InteropServices;
                public class Wallpaper {
                    [DllImport("user32.dll", EntryPoint="SystemParametersInfoW", CharSet=CharSet.Unicode)]
                    public static extern bool SystemParametersInfo(
                        int uAction,
                        int uParam,
                        string lpvParam,
                        int fuWinIni
                    );
                }
                "@

                $result = [Wallpaper]::SystemParametersInfo(
                    20,
                    0,
                    "${destination}",
                    3
                )

                Write-Host $result
                `;
    await new Promise((resolve, reject) => {
        execFile(
            "powershell.exe",
            [
                "-NoProfile",
                "-ExecutionPolicy",
                "Bypass",
                "-Command",
                script
            ],
            (error, stdout, stderr) => {
                if (error) return reject(error);
                resolve();
            }
        );
    });

    return destination;
});