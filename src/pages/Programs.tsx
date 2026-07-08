import { useState } from "react";
import niniteProgramsData from "@/data/programs_ninite.json";
import { BadgeInfo, Download } from "lucide-react";
type Program = {
  id: string;
  name: string;
  category: string;
  url: string;
};

type NiniteProgram = {
  id: string;
  name: string;
};

const ninitePrograms = (Array.isArray(niniteProgramsData) ? niniteProgramsData : [niniteProgramsData]) as NiniteProgram[];

function Programs() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [selectedNiniteIds, setSelectedNiniteIds] = useState<string[]>([]);

  async function downloadOpenProgram(program: Program) {
    setStatusMessage(`Descargando ${program.name} desde el instalador oficial...`);
    console.log(`downloadOpenProgram result for ${program.name}:`);
    try{
        await window.electronAPI.downloadOpenProgram(program);
    } catch (error) {
      console.error(`Error downloading and opening ${program.name}:`, error);
      setStatusMessage(`Error al descargar y abrir ${program.name}: ${error}`);
      return;
    }
  }

  function toggleNiniteProgram(id: string) {
    setSelectedNiniteIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  async function handleGetNinite() {
    if (!selectedNiniteIds.length) {
      setStatusMessage("Selecciona al menos un programa para generar el enlace de Ninite.");
      return;
    }

    setStatusMessage(null);

    const result = await window.electronAPI.openNiniteDownload(selectedNiniteIds);

    if (result.success) {
      setStatusMessage(`Ninite descargado y abierto desde temporal: ${result.url}`);
      return;
    }

    setStatusMessage(result.error ?? "No se pudo generar el enlace de Ninite.");
  }

  return (
    <div className="p-4 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Programas</h1>
          <p className="mt-1 text-sm text-zinc-400">Selecciona programas para Ninite, y usa las descargas directas cuando no haya winget.</p>
        </div>
      </div>

      <section className="mt-8 space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Ninite</h2>
            <p className="mt-1 text-sm text-zinc-400">Marca los programas que quieras incluir en el instalador de Ninite.</p>
          </div>

          <button
            type="button"
            onClick={handleGetNinite}
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
            <Download className="size-4" />
            Get Ninite
          </button>
        </div>

        <div className="overflow-hidden  border border-zinc-800 bg-zinc-900">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-5 gap-x-8 gap-y-2 p-2">
              {ninitePrograms.map((program) => (
                <label
                  key={program.id}
                  className="flex items-center gap-3 p-2 hover:bg-zinc-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedNiniteIds.includes(program.id)}
                    onChange={() => toggleNiniteProgram(program.id)}
                    className="h-4 w-4  border-zinc-600 bg-zinc-900 text-white accent-amber-300 focus:ring-gray-400"
                  />
                  <span className="text-zinc-100">{program.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="my-4">
        <h1 className="text-3xl font-bold">Descargas Directas</h1>
      </div>

      {statusMessage ? (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
          <BadgeInfo className="mt-0.5 size-4 shrink-0 text-sky-400" />
          <span>{statusMessage}</span>
        </div>
      ) : null}

      <div className="mt-8 flex items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-300">
        <button
          type="button"
          onClick={() => downloadOpenProgram({
            "id": "Google.Chrome",
            "name": "Google Chrome",
            "category": "Browser",
            "url": "https://github.com/Stirling-Tools/Stirling-PDF/releases/download/v2.14.0/Stirling-PDF-windows-x86_64.msi"
          })}
          className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
        >
          <Download className="size-4" />
          Descargar y abrir Chrome
        </button>
      </div>
    </div>
  );
}

export default Programs;
