import { Link } from "react-router-dom";
import home from "@/assets/home-icon.svg";
import favicon from "@/assets/favicon.svg";
import apps from "@/assets/apps.svg";

function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white h-screen p-4">
      <div className="flex flex-row gap-4">
        <img src={favicon} className="w-10 h-10" />
        <h1 className="text-2xl mb-8">Starter</h1>
      </div>
      <nav className="flex flex-col gap-2">
        <Link
          className="p-2 rounded hover:bg-zinc-800 flex flex-row gap-4"
          to="/"
        >
          <img src={home} className="w-5 h-5" />
          <span>Inicio</span>
        </Link>

        <Link
          className="p-2 rounded hover:bg-zinc-800 flex flex-row gap-4"
          to="/programs"
        >
          <img src={apps} className="w-5 h-5" />
          <span>Programas</span>
        </Link>

        <Link className="p-2 rounded hover:bg-zinc-800" to="/developer">
          💻 Developer
        </Link>

        <Link className="p-2 rounded hover:bg-zinc-800" to="/settings">
          ⚙ Configuración
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
