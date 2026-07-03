import { app, ipcMain } from "electron";
import fs from "node:fs";
import fsp from "node:fs/promises";
import https from "node:https";
import path from "node:path";
import { URL } from "node:url";
import { runLoggedProcess } from "./logs.js";
import { runWinget } from "./winget.js";

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        const nextUrl = new URL(response.headers.location, url).toString();

        downloadFile(nextUrl, destination).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`No se pudo descargar el archivo. Status: ${response.statusCode}`));
        response.resume();
        return;
      }

      const fileStream = fs.createWriteStream(destination);

      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close(() => resolve(destination));
      });

      fileStream.on("error", reject);
    });

    request.on("error", reject);
  });
}

async function installProgramDirect(event, program) {
  if (!program?.methods?.direct?.url) {
    return {
      success: false,
      code: null,
      stdout: "",
      stderr: "No hay descarga directa configurada.",
    };
  }

  const tempDir = await fsp.mkdtemp(path.join(app.getPath("temp"), "starter-"));
  const installerName = getFileNameFromUrl(program.methods.direct.url);
  const installerPath = path.join(tempDir, installerName);

  await downloadFile(program.methods.direct.url, installerPath);

  const silentArgs = program.methods.direct.silentArgs?.length
    ? program.methods.direct.silentArgs
    : ["/silent", "/install"];

  const result = await runLoggedProcess(event, installerPath, silentArgs, {
    source: "direct",
    action: "install",
    programId: program.id,
    programName: program.name,
  });

  return {
    success: result.code === 0,
    code: result.code,
    stdout: "",
    stderr: "",
  };
}

function getFileNameFromUrl(url) {
  const parsedUrl = new URL(url);
  const fileName = path.basename(parsedUrl.pathname);

  return fileName || "installer.exe";
}

function isWingetInstalledOutput(output, packageId) {
  return output
    .split(/\r?\n/)
    .some((line) => line.trim().includes(packageId));
}

ipcMain.handle("program:check-installed", async (_event, program) => {
  if (!program?.methods?.winget) {
    return {
      available: false,
      installed: false,
    };
  }

  try {
    const result = await runWinget([
      "list",
      "--id",
      program.methods.winget,
      "-e",
    ]);

    const installed = result.code === 0 && isWingetInstalledOutput(result.stdout, program.methods.winget);

    return {
      available: true,
      installed,
    };
  } catch {
    return {
      available: true,
      installed: false,
    };
  }
});

ipcMain.handle("program:install-direct", async (event, program) => {
  return installProgramDirect(event, program);
});

ipcMain.handle("program:install", async (event, program) => {
  if (program?.methods?.direct?.url) {
    return installProgramDirect(event, program);
  }

  if (program?.methods?.winget) {
    const result = await runLoggedProcess(event, "winget", [
      "install",
      "--id",
      program.methods.winget,
      "-e",
      "--silent",
      "--accept-package-agreements",
      "--accept-source-agreements",
    ], {
      source: "winget",
      action: "install",
      programId: program.id,
      programName: program.name,
    });

    return {
      success: result.code === 0,
      code: result.code,
      stdout: "",
      stderr: "",
    };
  }

  return {
    success: false,
    code: null,
    stdout: "",
    stderr: "El programa no tiene método de instalación configurado.",
  };
});

ipcMain.handle("program:uninstall", async (event, program) => {
  if (!program?.methods?.winget) {
    return {
      success: false,
      code: null,
      stdout: "",
      stderr: "La desinstalación solo está disponible para programas con winget ID.",
    };
  }

  const result = await runLoggedProcess(event, "winget", [
    "uninstall",
    "--id",
    program.methods.winget,
    "-e",
    "--silent",
    "--accept-source-agreements",
  ], {
    source: "winget",
    action: "uninstall",
    programId: program.id,
    programName: program.name,
  });

  return {
    success: result.code === 0,
    code: result.code,
    stdout: "",
    stderr: "",
  };
});
