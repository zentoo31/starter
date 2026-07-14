import Stepper from "@/components/stepper";
import type { Step } from "@/types/step";
import { TriangleAlert } from "lucide-react";
import office_logo from "@/assets/office.jpg";
import office_download from "@/assets/office/office_download.png";
import office_extract from "@/assets/office/office_extract.png";
import office_execute from "@/assets/office/office_execute.png";
import office_installation from "@/assets/office/office_installation.png";
import office_already from "@/assets/office/office_already.png";
function Office() {
  const steps: Step[] = [
    {
      title: "Descargar Office pro",
      description: "Visita este sitio web para descargar el instalador de Office pro: https://www.mediafire.com/file/x27tq1ly89wqdf9/0FF1C3_2021_-_by_Diekrolo.rar/file",
      imageLabel: office_download
    },
    {
      title: "Extraer el archivo RAR",
      description: "Una vez descargado el archivo RAR, utiliza un programa de extracción como WinRAR o 7-Zip para extraer su contenido en una carpeta de tu elección.",
      imageLabel: office_extract
    },
    {
      title: "Ingresar a la carpeta y ejecutar OInstall",
      description: "Dentro de la carpeta extraída, busca el archivo llamado OInstall y haz doble clic en él para ejecutar el instalador de Office pro. Sigue las instrucciones en pantalla para completar la instalación.",
      imageLabel: office_execute
    },
    {
      title: "Seleccionar los componentes de Office a instalar e iniciar la instalación",
      description: "Una vez que hayas ejecutado el instalador, selecciona los componentes de Office que deseas instalar y haz clic en 'Siguiente' para comenzar la instalación.",
      imageLabel: office_installation
    },
    {
      title: "Esperar mientras se completa la instalación y verificar que Office pro esté instalado correctamente",
      description: "Una vez que la instalación haya finalizado, abre cualquier aplicación de Office para verificar que se haya instalado correctamente y que esté funcionando sin problemas.",
      imageLabel: office_already
    }
  ];

  return (
    <div className="space-y-8 text-white">
      <section className="overflow-hidden border border-zinc-800 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 shadow-2xl shadow-black/20 md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Instalar Office pro</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400 md:text-base">
                Instalar Office pro de manera sencilla y rápida. Solo sigue los pasos y tendrás tu Office instalado en poco tiempo.
              </p>
            </div>

            <div className="border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-300">
              <div className="flex items-center gap-2 text-amber-300">
                <TriangleAlert className="size-4" />
                No olvides DESACTIVAR tu antivirus antes de ejecutar el script, ya que podría bloquear la activación.
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl overflow-hidden border border-zinc-800 bg-zinc-950/70 p-3">
            <img
              src={office_logo}
              alt="Vista previa de Office"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <div>
        <h2 className="text-2xl font-semibold text-white">Pasos con imágenes</h2>
      </div>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {
          steps.map((step, index) => (
            <Stepper key={index} {...step} />
          ))
        }
      </section>
    </div>
  )
}

export default Office