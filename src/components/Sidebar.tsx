import { NavLink } from "react-router-dom";
import favicon from "@/assets/favicon.svg";
import { HomeIcon, LaptopMinimal, KeyRoundIcon, FileTextIcon, WrenchIcon, ImageIcon } from "lucide-react";

function Sidebar() {
  const menu = [
    {
      title: "Inicio",
      path: "/",
      icon: HomeIcon,
    },
    {
      title: "Programas",
      path: "/programs",
      icon: LaptopMinimal,
    },
    {
      title: "Windows",
      path: "/windows",
      icon: KeyRoundIcon,
    },
    {
      title: "Office",
      path: "/office",
      icon: FileTextIcon,
    },
    {
      title: "Fondos",
      path: "/background",
      icon: ImageIcon
    },
    {
      title: "Herramientas",
      path: "/tools",
      icon: WrenchIcon,
    }
    

  ];
  return (
    <aside className="h-full w-64 shrink-0 overflow-y-auto bg-zinc-900 p-4 text-white">
      <div className="flex flex-row gap-4">
        <img src={favicon} className="w-10 h-10" />
        <h1 className="text-2xl mb-8">Starter</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-4 px-3 py-2 transition-all ${isActive
                  ? "bg-zinc-800 text-white border-l-4 border-zinc-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-6 border-t border-zinc-800 pt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">by zentoo</p>
        <a
          href="https://buymeacoffee.com/zentoo"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-700"
        >
          <span aria-hidden="true">☕</span>
          Buy me a coffee
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
