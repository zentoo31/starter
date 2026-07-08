import { NavLink } from "react-router-dom";
import favicon from "@/assets/favicon.svg";
import { HomeIcon, LaptopMinimal, KeyRoundIcon, FileTextIcon } from "lucide-react";

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
    

  ];
  return (
    <aside className="w-64 bg-zinc-900 text-white h-screen p-4">
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
                `relative flex items-center gap-4 rounded-lg px-3 py-2 transition-all ${isActive
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
    </aside>
  );
}

export default Sidebar;
