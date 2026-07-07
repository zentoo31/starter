import { app, ipcMain, shell } from "electron";
import fs from "node:fs";
import fsp from "node:fs/promises";
import https from "node:https";
import path from "node:path";
import { URL } from "node:url";
import { runLoggedProcess } from "./logs.js";
import { runWinget } from "./winget.js";

const niniteProgramsPath = path.resolve(process.cwd(), "src", "data", "programs_ninite.json");

async function readNinitePrograms() {
  const raw = await fsp.readFile(niniteProgramsPath, "utf8");
  const parsed = JSON.parse(raw);

  return Array.isArray(parsed) ? parsed : [];
}

function buildNiniteUrl(selectedIds) {
  const uniqueIds = [...new Set(selectedIds.map((id) => String(id).trim().toLowerCase()).filter(Boolean))];

  if (!uniqueIds.length) {
    return null;
  }

  return `https://ninite.com/${uniqueIds.join("-")}/ninite.exe`;
}

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

function getNiniteFileName(selectedIds) {
  return `ninite-${selectedIds.join("-")}.exe`;
}

async function openDirectDownload(program) {
  if (!program?.methods?.direct?.url) {
    return {
      success: false,
      code: null,
      stdout: "",
      stderr: "No hay descarga directa configurada.",
    };
  }

  await shell.openExternal(program.methods.direct.url);

  return {
    success: true,
    code: 0,
    stdout: "",
    stderr: "",
  };
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

ipcMain.handle("program:open-ninite", async (_event, selectedIds = []) => {
  try {
    const ninitePrograms = await readNinitePrograms();
    const availableIds = new Set(ninitePrograms.map((program) => String(program.id).trim().toLowerCase()));
    const matchedIds = selectedIds
      .map((id) => String(id).trim().toLowerCase())
      .filter((id) => availableIds.has(id));

    const url = buildNiniteUrl(matchedIds);

    if (!url) {
      return {
        success: false,
        url: null,
        error: "Selecciona al menos un programa compatible con Ninite.",
      };
    }

    const tempDir = await fsp.mkdtemp(path.join(app.getPath("temp"), "starter-ninite-"));
    const installerPath = path.join(tempDir, getNiniteFileName(matchedIds));

    await downloadFile(url, installerPath);
    await runLoggedProcess(_event, installerPath, [], {
      source: "ninite",
      action: "install",
      programId: matchedIds.join("-"),
      programName: "Ninite",
    });

    return {
      success: true,
      url: installerPath,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      url: null,
      error: error instanceof Error ? error.message : "No se pudo generar el enlace de Ninite",
    };
  }
});

ipcMain.handle("program:install-direct", async (_event, program) => {
  return openDirectDownload(program);
});

ipcMain.handle("program:install", async (event, program) => {
  if (program?.methods?.direct?.url) {
    return openDirectDownload(program);
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
