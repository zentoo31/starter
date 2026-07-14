import type { Step } from "@/types/step";

function Stepper({ title, description, imageLabel }: Step) {
    return (
        <article key={title} className="overflow-hidden border border-zinc-800 bg-zinc-900/80">
            <div className="border-b border-zinc-800 p-4">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
            </div>
            <div className="p-4">

                <div className="flex min-h-56 items-center justify-center border border-dashed border-zinc-700 bg-zinc-900/80 p-6 text-center text-zinc-400">
                    <img
                        src={imageLabel}
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </article>
    )
}

export default Stepper;