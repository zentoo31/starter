
function Stepper({ title, description, imageLabel }: { title: string; description: string; imageLabel: string }) {
    return (
        <article key={title} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80">
            <div className="border-b border-zinc-800 p-4">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
            </div>
            <div className="p-4">

                <div className="flex min-h-56 items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/80 p-6 text-center text-zinc-400">
                    <img
                        src={imageLabel}
                        className="h-full w-full rounded-xl object-cover"
                    />
                </div>
            </div>
        </article>
    )
}

export default Stepper;