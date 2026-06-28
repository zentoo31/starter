import { useEffect, useState } from "react";
import type { SystemInfo } from "@/types/systemInfo";

function Home() {
  const [info, setInfo] = useState<SystemInfo | null>(null);
  useEffect(() => {
    async function load(){
      const datos: SystemInfo = await window.electronAPI.getSystemInfo();
      setInfo(datos);
      console.log(datos)
    }
    load();
  }, []);

  return (
    <>
      <h1>This is home</h1>
      <pre>{info?.cpu.brand}</pre>
    </>
  );
}

export default Home;
