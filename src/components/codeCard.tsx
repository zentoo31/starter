import { useState } from "react";
import { Check, ClipboardCopy } from "lucide-react";

type CodeSnippet = {
        title: string;
        description: string;
        code: string;
};

function CodeCard({ title, description, code }: CodeSnippet) {
    
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-lg shadow-black/10">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{description}</p>
                </div>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs font-medium text-zinc-200 transition hover:bg-zinc-800"
                >
                    {copied ? <Check className="size-4 text-emerald-400" /> : <ClipboardCopy className="size-4" />}
                    {copied ? "Copiado" : "Copiar"}
                </button>
            </div>

            <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm leading-6 text-zinc-100">
                <code>{code}</code>
            </pre>
        </div>
    );
}

export default CodeCard;
export type { CodeSnippet };