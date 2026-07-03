
import { useEffect, useMemo, useRef, useState } from "react";
import { BadgeInfo, PlayCircle, Trash2 } from "lucide-react";

type InstallLog = {
  timestamp: string;
  source?: string;
  action?: string;
  programId?: string;
  programName?: string;
  stream?: string;
  kind?: string;
  chunk?: string;
  code?: number | null;
};

function Develop() {
  const [logs, setLogs] = useState<InstallLog[]>([]);
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = window.electronAPI.onInstallLog((payload: InstallLog) => {
      setLogs((current) => [...current, payload].slice(-400));
    });

    setConnected(true);

    return () => {
      unsubscribe();
      setConnected(false);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [logs]);

  const activeCount = useMemo(() => {
    return logs.filter((log) => log.kind !== "exit").length;
  }, [logs]);

  function clearLogs() {
    setLogs([]);
  }

  return (
    <div className="p-4 text-white">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Developer</h1>
          <p className="mt-1 text-sm text-zinc-400">Salida en tiempo real de instalaciones y desinstalaciones.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <PlayCircle className={`size-4 ${connected ? "text-emerald-400" : "text-zinc-500"}`} />
              {connected ? "Escuchando logs" : "Sin conexión"}
            </div>
          </div>

          <button
            type="button"
            onClick={clearLogs}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-200 transition hover:bg-zinc-800"
          >
            <Trash2 className="size-4" />
            Limpiar
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
        <BadgeInfo className="size-4 text-sky-400" />
        <span>{activeCount} eventos recibidos</span>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/80">
        <div className="border-b border-zinc-800 px-4 py-3 text-sm text-zinc-400">
          Log stream
        </div>

        <div className="max-h-[65vh] overflow-auto px-4 py-4 font-mono text-xs leading-6 text-zinc-200">
          {logs.length ? (
            logs.map((log, index) => (
              <div key={`${log.timestamp}-${index}`} className="mb-3 rounded-lg border border-zinc-800 bg-zinc-900/80 p-3">
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-zinc-500">
                  <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  {log.source ? <span>{log.source}</span> : null}
                  {log.action ? <span>{log.action}</span> : null}
                  {log.programName ? <span>{log.programName}</span> : null}
                  {log.stream ? <span>{log.stream}</span> : null}
                  {log.kind ? <span>{log.kind}</span> : null}
                  {typeof log.code === "number" ? <span>code {log.code}</span> : null}
                </div>
                {log.chunk ? <pre className="mt-2 whitespace-pre-wrap wrap-break-word text-zinc-100">{log.chunk}</pre> : null}
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-zinc-800 p-6 text-sm text-zinc-500">
              Aún no hay eventos. Inicia una instalación o desinstalación para ver la salida real aquí.
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

export default Develop;