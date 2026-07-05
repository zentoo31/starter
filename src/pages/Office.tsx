import Stepper from "@/components/stepper";
import { TriangleAlert } from "lucide-react";
import office_logo from "@/assets/office.jpg";
function Office() {
  return (
    <div className="space-y-8 text-white">
      <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 p-6 shadow-2xl shadow-black/20 md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Instalar Office pro</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400 md:text-base">
                Este es un tutorial para como instalar Office pro de manera sencilla y rápida. Solo sigue los pasos y tendrás tu Office instalado en poco tiempo.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-300">
              <div className="flex items-center gap-2 text-amber-400">
                <TriangleAlert className="size-4" />
                No olvides DESACTIVAR tu antivirus antes de ejecutar el script, ya que podría bloquear la activación.
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
            <img
              src={office_logo}
              alt="Vista previa de Office"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  )
}

export default Office