import { useEffect, useMemo, useState } from "react";
import programsData from "@/data/programs.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Spinner } from "@/components/spinner";
import { BadgeInfo, Download, Search, TriangleAlert, Trash2 } from "lucide-react";

type Program = {
  id: string;
  name: string;
  category: string;
  methods?: {
    winget?: string;
    direct?: {
      url: string;
      silentArgs?: string[];
    };
  };
};

const programs = (Array.isArray(programsData) ? programsData : [programsData]) as Program[];

function Programs() {
  const [query, setQuery] = useState("");
  const [wingetStatus, setWingetStatus] = useState<{ installed: boolean; version: string | null; error: string | null } | null>(null);
  const [checkingWinget, setCheckingWinget] = useState(true);
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [installedPrograms, setInstalledPrograms] = useState<Record<string, boolean>>({});
  const [checkingPrograms, setCheckingPrograms] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function checkWinget() {
      setCheckingWinget(true);

      const result = await window.electronAPI.checkWinget();

      setWingetStatus(result);
      setCheckingWinget(false);
    }

    checkWinget();
  }, []);

  useEffect(() => {
    async function refreshInstalledStates() {
      const nextCheckingState = Object.fromEntries(programs.map((program) => [program.id, true]));

      setCheckingPrograms(nextCheckingState);

      const results = await Promise.all(
        programs.map(async (program) => {
          const result = await window.electronAPI.checkProgramInstalled(program);

          return [program.id, result.available && result.installed] as const;
        }),
      );

      setInstalledPrograms(Object.fromEntries(results));
      setCheckingPrograms({});
    }

    refreshInstalledStates();
  }, []);

  async function refreshProgramInstalledState(program: Program) {
    const result = await window.electronAPI.checkProgramInstalled(program);

    setInstalledPrograms((current) => ({
      ...current,
      [program.id]: result.available && result.installed,
    }));
  }

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return programs;
    }

    return programs.filter((program) => {
      return [program.name, program.category, program.id, program.methods?.winget ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [query]);

  async function handleInstall(program: Program) {
    if (!program.methods?.direct?.url && !program.methods?.winget) {
      setStatusMessage(`No hay método de instalación configurado para ${program.name}.`);
      return;
    }

    if (!program.methods?.direct?.url && !wingetStatus?.installed) {
      setStatusMessage("Winget no está instalado en este sistema.");
      return;
    }

    setInstallingId(program.id);
    setStatusMessage(null);

    try {
      const result = await window.electronAPI.installProgram(program);

      if (result.success) {
        setStatusMessage(`${program.name} se instaló correctamente.`);
        await refreshProgramInstalledState(program);
      } else {
        setStatusMessage(result.stderr || result.stdout || `Falló la instalación de ${program.name}.`);
      }
    } finally {
      setInstallingId(null);
    }
  }

  async function handleUninstall(program: Program) {
    if (!program.methods?.winget) {
      setStatusMessage(`La desinstalación no está disponible para ${program.name} porque no tiene winget ID.`);
      return;
    }

    if (!wingetStatus?.installed) {
      setStatusMessage("Winget no está instalado en este sistema.");
      return;
    }

    setInstallingId(program.id);
    setStatusMessage(null);

    try {
      const result = await window.electronAPI.uninstallProgram(program);

      if (result.success) {
        setStatusMessage(`${program.name} se desinstaló correctamente.`);
        await refreshProgramInstalledState(program);
      } else {
        setStatusMessage(result.stderr || result.stdout || `Falló la desinstalación de ${program.name}.`);
      }
    } finally {
      setInstallingId(null);
    }
  }

  return (
    <div className="p-4 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Programas</h1>
          <p className="mt-1 text-sm text-zinc-400">Busca un programa y ejecútalo desde la URL directa o desde winget, según la configuración.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-300">
          {checkingWinget ? (
            <div className="flex items-center gap-2">
              <Spinner className="size-4" />
              Verificando winget...
            </div>
          ) : wingetStatus?.installed ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <Download className="size-4" />
              Winget listo {wingetStatus.version ? `(${wingetStatus.version})` : ""}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-400">
              <TriangleAlert className="size-4" />
              Winget no encontrado
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
        <Search className="size-4 text-zinc-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar programa, categoría o ID..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
        />
      </div>

      {statusMessage ? (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
          <BadgeInfo className="mt-0.5 size-4 shrink-0 text-sky-400" />
          <span>{statusMessage}</span>
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredPrograms.map((program) => {
          const isInstalled = installedPrograms[program.id] === true;
          const isCheckingInstalled = checkingPrograms[program.id] === true;
          const canInstall = Boolean((program.methods?.direct?.url || (wingetStatus?.installed && program.methods?.winget)) && !isInstalled);
          const canUninstall = Boolean(wingetStatus?.installed && program.methods?.winget);

          return (
            <Card key={program.id} className="border-zinc-800 bg-zinc-900 text-white">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{program.name}</CardTitle>
                    <p className="mt-1 text-sm text-zinc-400">{program.category}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {isCheckingInstalled ? (
                        <span className="rounded-full border border-zinc-700 px-2 py-1 text-zinc-400">Comprobando...</span>
                      ) : isInstalled ? (
                        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-emerald-300">Instalado</span>
                      ) : (
                        <span className="rounded-full border border-zinc-700 px-2 py-1 text-zinc-400">No instalado</span>
                      )}
                    </div>
                  </div>
                  <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                    {program.id}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-zinc-300">
                  <p>
                    <span className="text-zinc-500">Winget ID:</span> {program.methods?.winget ?? "No configurado"}
                  </p>
                  {!program.methods?.winget ? (
                    <p className="text-xs text-zinc-500">Sin winget ID no se puede comprobar instalación ni desinstalar desde aquí.</p>
                  ) : null}
                  {program.methods?.direct?.url ? (
                    <p className="break-all">
                      <span className="text-zinc-500">Descarga directa:</span> {program.methods.direct.url}
                    </p>
                  ) : null}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleInstall(program)}
                    disabled={!canInstall || installingId === program.id}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition cursor-pointer disabled:opacity-50"
                  >
                    {installingId === program.id ? <Spinner className="size-4" /> : <Download className="size-4" />}
                    {installingId === program.id ? "Instalando..." : isInstalled ? "Ya instalado" : "Instalar"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUninstall(program)}
                    disabled={!canUninstall || installingId === program.id || !isInstalled}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-zinc-800"
                  >
                    {installingId === program.id ? <Spinner className="size-4" /> : <Trash2 className="size-4" />}
                    Desinstalar
                  </button>

                  {program.methods?.direct?.url ? (
                    <a
                      href={program.methods.direct.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
                    >
                      Descargar
                    </a>
                  ) : null}
                </div>

                {!wingetStatus?.installed ? (
                  <p className="mt-4 text-xs text-amber-400">
                    Para instalar desde aquí necesitas winget instalado en Windows.
                  </p>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!filteredPrograms.length ? (
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-6 text-sm text-zinc-400">
          No se encontraron programas con ese filtro.
        </div>
      ) : null}
    </div>
  );
}

export default Programs;
