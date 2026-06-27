import Sidebar from "./Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-zinc-950 text-white min-h-screen">
        {children}
      </main>
    </div>
  );
}

export default Layout;
