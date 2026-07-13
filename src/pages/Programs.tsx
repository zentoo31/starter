import { useMemo, useState } from "react";
import niniteProgramsData from "@/data/programs_ninite.json";
import directProgramsData from "@/data/programs.json";
import { BadgeInfo, Download, Search } from "lucide-react";
import type { NiniteProgram, NiniteProgramSource, Program, ProgramSource } from "@/types/programs";
const defaultProgramIcon = "/favicon.svg";

const niniteProgramSources = (Array.isArray(niniteProgramsData) ? niniteProgramsData : [niniteProgramsData]) as NiniteProgramSource[];
const directProgramSources = (Array.isArray(directProgramsData) ? directProgramsData : [directProgramsData]) as ProgramSource[];

const ninitePrograms = niniteProgramSources.map(
  (program) => ({
    ...program,
    icon: program.icon?.trim() ? program.icon : defaultProgramIcon,
  }),
) as NiniteProgram[];
const directPrograms = directProgramSources.map((program) => ({
  ...program,
  icon: program.icon?.trim() ? program.icon : defaultProgramIcon,
})) as Program[];

function Programs() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [selectedNiniteIds, setSelectedNiniteIds] = useState<string[]>([]);
  const [niniteQuery, setNiniteQuery] = useState("");
  const [directQuery, setDirectQuery] = useState("");

  const filteredNinitePrograms = useMemo(() => {
    const query = niniteQuery.trim().toLowerCase();

    if (!query) {
      return ninitePrograms;
    }

    return ninitePrograms.filter((program) => {
      return [program.name, program.id].some((value) => value.toLowerCase().includes(query));
    });
  }, [niniteQuery]);

  const filteredDirectPrograms = useMemo(() => {
    const query = directQuery.trim().toLowerCase();

    if (!query) {
      return directPrograms;
    }

    return directPrograms.filter((program) => {
      return [program.name, program.id, program.category].some((value) => value.toLowerCase().includes(query));
    });
  }, [directQuery]);

  async function downloadOpenProgram(program: Program) {
    setStatusMessage(`Descargando ${program.name} desde el instalador oficial...`);
    console.log(`downloadOpenProgram result for ${program.name}:`);
    try {
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">Ninite</h2>
            <p className="mt-1 text-sm text-zinc-400">Marca los programas que quieras incluir en el instalador de Ninite.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-300">
              <Search className="size-4 shrink-0 text-zinc-500" />
              <input
                type="search"
                value={niniteQuery}
                onChange={(event) => setNiniteQuery(event.target.value)}
                placeholder="Buscar en Ninite"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500 sm:w-72"
              />
            </div>

            <button
              type="button"
              onClick={handleGetNinite}
              className="inline-flex cursor-pointer items-center gap-2 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              <Download className="size-4" />
              Get Ninite
            </button>
          </div>
        </div>

        <div className="overflow-hidden border border-zinc-800 bg-zinc-900">
          <div className="overflow-x-auto">
            <div className="grid gap-2 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredNinitePrograms.length ? filteredNinitePrograms.map((program) => (
                <label
                  key={program.id}
                  className="flex cursor-pointer items-center gap-3 border border-zinc-800 bg-zinc-950/40 p-3 transition hover:border-zinc-700 hover:bg-zinc-800/60"
                >
                  <input
                    type="checkbox"
                    checked={selectedNiniteIds.includes(program.id)}
                    onChange={() => toggleNiniteProgram(program.id)}
                    className="h-4 w-4 border-zinc-600 bg-zinc-900 text-white accent-amber-300 focus:ring-gray-400"
                  />
                  <img src={program.icon} alt="" aria-hidden="true" className="h-5 w-5 shrink-0 rounded-md" />
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-medium text-zinc-100">{program.name}</span>
                    <span className="block truncate text-xs text-zinc-500">{program.id}</span>
                  </div>
                </label>
              )) : (
                <div className="col-span-full rounded-xl border border-dashed border-zinc-700 px-4 py-6 text-sm text-zinc-400">
                  No hay resultados para esa búsqueda.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Descargas Directas</h1>
            <p className="mt-1 text-sm text-zinc-400">Busca un programa y abre su instalador oficial sin pasar por Ninite.</p>
          </div>

          <div className="flex items-center gap-2 border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-300 lg:w-80">
            <Search className="size-4 shrink-0 text-zinc-500" />
            <input
              type="search"
              value={directQuery}
              onChange={(event) => setDirectQuery(event.target.value)}
              placeholder="Buscar descarga directa"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredDirectPrograms.length ? filteredDirectPrograms.map((program) => (
            <article
              key={program.id}
              className="border border-zinc-800 bg-zinc-900/80 p-4 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <img src={program.icon} alt="" aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 rounded-md" />
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-white">{program.name}</h2>
                    <p className="mt-1 text-sm text-zinc-400">{program.category}</p>
                  </div>
                </div>
                <span className="rounded-full border border-zinc-700 px-2 py-1 text-xs uppercase tracking-wide text-zinc-400">
                  Directo
                </span>
              </div>

              <p className="mt-4 break-all text-xs text-zinc-500">{program.url}</p>

              <button
                type="button"
                onClick={() => downloadOpenProgram(program)}
                className="cursor-pointer mt-4 inline-flex w-full items-center justify-center gap-2 bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                <Download className="size-4" />
                Descargar y abrir
              </button>
            </article>
          )) : (
            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/60 px-4 py-6 text-sm text-zinc-400 md:col-span-2 xl:col-span-3">
              No hay descargas directas para esa búsqueda.
            </div>
          )}
        </div>
      </section>

      {statusMessage ? (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
          <BadgeInfo className="mt-0.5 size-4 shrink-0 text-sky-400" />
          <span>{statusMessage}</span>
        </div>
      ) : null}
    </div>
  );
}

export default Programs;
