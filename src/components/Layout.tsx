import Sidebar from "./Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-zinc-950 p-6 text-white">
        {children}
      </main>
    </div>
  );
}

export default Layout;
