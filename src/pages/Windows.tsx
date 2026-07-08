import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import type { CodeSnippet } from "@/components/codeCard";
import type { Step } from "@/types/step";
import Stepper from "@/components/stepper";
import windows_powershell from "@/assets/windows/windows_powershell_screenshoot.png";
import windows_no_activated from "@/assets/windows/windows_no_activated.png";
import windows_powershell_copy from "@/assets/windows/windows_powershell_copy.png";
import windows_administrator from "@/assets/windows/windows_administrator.png";
import windows_select from "@/assets/windows/windows_select.png";
import windows_activated from "@/assets/windows/windows_activated.png";

const chromeWingetCommand = "irm https://get.activated.win | iex";

const steps: Step[] = [
    {
        title: "1. Powershell o CMD",
        description: "Abre la powershell en MODO ADMINISTRADOR, buscando en el menú de inicio o usando el atajo de teclado Windows + X.",
        imageLabel: windows_powershell,
    },
    {
        title: "2. Pegar este comando",
        description: "Pegar el comando: 'irm https://get.activated.win | iex' dentro de la terminal y presiona enter. Esto iniciará el proceso de activación de Windows.",
        imageLabel: windows_powershell_copy,
    },
    {
        title: "3. Ejecutar como administrador",
        description: "Al presionar enter se abrirá una ventana de confirmación, haz clic en 'Sí' para permitir que el script se ejecute con privilegios de administrador.",
        imageLabel: windows_administrator,
    },
    {
        title: "4. Seleccionar la opción de activación",
        description: "Presionar el número 1 y luego presionar enter para iniciar el proceso de activación de Windows.",
        imageLabel: windows_select,
    },
    {
        title: "5. Esperar la activación",
        description: "El proceso de activación puede tardar unos minutos. Una vez completado, verás un mensaje indicando que Windows se ha activado correctamente.",
        imageLabel: windows_no_activated,
    },
    {
        title: "6. Verificar la activación",
        description: "Para asegurarte de que Windows se ha activado correctamente, puedes ir a Configuración > Sistema > Acerca de y verificar el estado de activación.",
        imageLabel: windows_activated,
    }
];

const snippets: CodeSnippet[] = [
    {
        title: "Comando principal",
        description: "Reemplázalo por el comando real que quieras enseñar en el tutorial.",
        code: "irm https://get.activated.win | iex",
    }
];


function Windows() {
    const [installingAuto, setInstallingAuto] = useState(false);
    const [autoInstallStatus, setAutoInstallStatus] = useState<string | null>(null);

    async function handleExecuteMassgrave() {
        setInstallingAuto(true);
        setAutoInstallStatus(null);

        try {
            const result = await window.electronAPI.executeMassgrave();

            setAutoInstallStatus(
                result.success
                    ? "PowerShell se abrió con permisos de administrador."
                    : result.error ?? "No se pudo abrir PowerShell como administrador."
            );
        } finally {
            setInstallingAuto(false);
        }
    }

    return (
        <div className="space-y-8 text-white">
            <section className="overflow-hidden border border-zinc-800 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 shadow-2xl shadow-black/20 md:p-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl space-y-4">

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Activar Windows</h1>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400 md:text-base">
                                Activar Windows de manera sencilla y rápida. Solo sigue los pasos y tendrás tu Windows activado en poco tiempo.
                            </p>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-300">
                            <div className="flex items-center gap-2 text-amber-300">
                                <TriangleAlert className="size-4" />
                                No olvides DESACTIVAR tu antivirus antes de ejecutar el script, ya que podría bloquear la activación.
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
                        <img
                            src={windows_no_activated}
                            alt="Vista previa de Windows PowerShell"
                            className="h-full w-full rounded-xl object-cover"
                        />
                    </div>
                </div>
            </section>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-white">Instalación auto</p>
                        <p className="mt-1 text-sm text-zinc-400">Abrirá PowerShell como administrador para ejecutar el comando de instalación.</p>
                    </div>

                    <button
                        type="button"
                        onClick={handleExecuteMassgrave}
                        disabled={installingAuto}
                        className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {installingAuto ? "Abriendo..." : "Ejecutar Massgrave"}
                    </button>
                </div>

                {autoInstallStatus ? (
                    <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300">
                        {autoInstallStatus}
                    </div>
                ) : null}

                <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300">
                    {chromeWingetCommand}
                </div>
            </div>


            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold text-white">Pasos con imágenes</h2>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {steps.map((step) => (
                        <Stepper key={step.title} {...step} />
                    ))}
                </div>
            </section>

        </div>
    );
}

export default Windows;