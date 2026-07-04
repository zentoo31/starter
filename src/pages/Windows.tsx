import windows_powershell from "@/assets/windows/windows_powershell_screenshoot.png";
function Windows() {
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold">Activar Windows</h1>
                <p className="mt-1 text-sm text-zinc-400">Encuentra tu clave de producto y activa Windows.</p>
            </div>
            <img src={windows_powershell} className="mt-4 rounded-lg" />
        </div>
    )
}

export default Windows