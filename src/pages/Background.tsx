import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { WallAPI } from "@/types/wallAPI";

const BACKGROUND_STATE_KEY = "background-page-state";

type PersistedBackgroundState = {
    search: string;
    bgs: WallAPI | null;
};

function Background() {
    const [search, setSearch] = useState("");
    const [bgs, setBgs] = useState<WallAPI | null>(null);

    const notice = (
        <div className="border border-gray-500/30  px-4 py-3 text-xs text-amber-200 m-4">
            <p className="font-semibold">Aviso</p>
            <p className="mt-1 text-amber-100/90">
                Las im&aacute;genes pueden verse en baja resoluci&oacute;n. La imagen que elijas se guarda en <span className="font-medium">Pictures/Starter</span> del sistema.
            </p>
        </div>
    );

    useEffect(() => {
        try {
            const persistedState = sessionStorage.getItem(BACKGROUND_STATE_KEY);

            if (!persistedState) {
                return;
            }

            const parsedState = JSON.parse(persistedState) as PersistedBackgroundState;
            setSearch(parsedState.search ?? "");
            setBgs(parsedState.bgs ?? null);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const stateToPersist: PersistedBackgroundState = {
            search,
            bgs,
        };

        sessionStorage.setItem(BACKGROUND_STATE_KEY, JSON.stringify(stateToPersist));
    }, [search, bgs]);

    async function getBgs(key: string) {
        try {
            const result = await window.electronAPI.showBgs(key);
            console.log(result)
            setBgs(result);

        } catch (error) {
            console.log(error)
        }
    }

    async function setBackground(url: string) {
        try {
            await window.electronAPI.setBg(url);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col gap-2">

            {bgs != null ? (
                <div>
                    <h1 className="text-center text-sm font-semibold text-zinc-400">
                        Powered by Wallpapers.com
                    </h1>
                    <div className="mt-3">{notice}</div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            getBgs(search);
                        }}
                        className="flex items-center gap-2 border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-300 lg:w-80"
                    >
                        <Search className="size-4 shrink-0 text-zinc-500" />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar fondos de pantalla"
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        />
                    </form>
                </div>
            ) : (
                <div className="flex flex-col min-h-screen items-center justify-center">
                    <h1 className="text-center text-sm font-semibold text-zinc-400">
                        Powered by Wallpapers.com
                    </h1>                    
                    <div className="mt-3 w-full max-w-2xl">{notice}</div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            getBgs(search);
                        }}
                        className="flex w-full max-w-2xl items-center gap-4 rounded-xl border border-zinc-700 bg-zinc-900/90 px-6 py-4 shadow-lg"
                    >
                        <Search className="size-6 shrink-0 text-zinc-500" />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar fondos de pantalla..."
                            className="w-full bg-transparent text-lg text-white outline-none placeholder:text-zinc-500"
                        />
                    </form>
                </div>
            )}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {bgs?.items.map((bg) => (
                    <button
                        key={bg.id}
                        className="group relative overflow-hidden cursor-pointer hover:border"
                        onClick={() => setBackground(bg.high)}
                    >
                        <img
                            src={bg.thumb}
                            alt={bg.alt}
                            loading="lazy"
                            className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                        <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                            {bg.alt}
                            <br />
                            <span className="text-blue-400">Click to set as background</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Background;