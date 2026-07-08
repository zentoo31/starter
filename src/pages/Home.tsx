import { CardTitle, CardHeader, CardContent } from "@/components/card";
import { CircleAlertIcon, CpuIcon, MemoryStickIcon, GpuIcon, HardDriveIcon, NetworkIcon } from "lucide-react";
import { useSystem } from "@/context/SystemContext";
import { Spinner } from "@/components/spinner";
function Home() {
  const { info, loading } = useSystem();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner />
        <p className="mt-4 text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="p-4 gap-4 flex flex-col">
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="overflow-hidden border border-zinc-800 bg-zinc-900/80 p-4">
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2">
              <CircleAlertIcon className="w-5 h-5 mr-2 my-2" />
              Sistema Operativo
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-1 text-sm text-zinc-400">
            <p>Plataforma: {info?.os.platform}</p>
            <p>Distro: {info?.os.distro}</p>
            <p>Release: {info?.os.release}</p>
            <p>Codename: {info?.os.codename}</p>
            <p>Hostname: {info?.os.hostname}</p>
            <p>Serial: {info?.os.serial}</p>
            <p>Arquitectura: {info?.os.arch}</p>
          </CardContent>
        </div>
        <div className="overflow-hidden border border-zinc-800 bg-zinc-900/80 p-4">
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2 my-2">
              <CpuIcon className="w-5 h-5" />
              CPU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-1 text-sm text-zinc-400">
              <p>Marca: {info?.cpu.manufacturer}</p>
              <p>CPU: {info?.cpu.brand}</p>
              <p>Arquitectura: {info?.cpu.socket}</p>
              <p>Velocidad: {info?.cpu.speed} GHz</p>
              <p>Núcleos Físicos: {info?.cpu.physicalCores}</p>
              <p>Hilos: {info?.cpu.cores}</p>
              <p>Virtualización: {info?.cpu.virtualization ? "Habilitada" : "Deshabilitada"}</p>
            </div>
          </CardContent>
        </div>
        <div className="overflow-hidden border border-zinc-800 bg-zinc-900/80 p-4">
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2 my-2">
              <MemoryStickIcon className="w-5 h-5" />
              Memoria RAM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-1 text-sm text-zinc-400">
              <p className="text-blue-200">Total: {((info?.mem?.total ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
              <p className="text-red-200">Usada: {((info?.mem?.used ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
              <p className="text-green-200">Libre: {((info?.mem?.free ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
            </div>
          </CardContent>
        </div>
        <div className="overflow-hidden border border-zinc-800 bg-zinc-900/80 p-4">
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2 my-2">
              <GpuIcon className="w-5 h-5" />
              Tarjeta Gráfica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-1 text-sm text-zinc-400">
              {info?.graphics.controllers.map((gpu, index) => (
                <div key={index} className="mb-4 border border-zinc-800 bg-zinc-900/80 p-4 rounded-lg">
                  <p>Nombre: {gpu.name}</p>
                  <p>Marca: {gpu.vendor}</p>
                  <p>Modelo: {gpu.model}</p>
                  <p>VRAM: {gpu.vram} MB</p>
                  <p>Versión del Driver: {gpu.driverVersion}</p>
                  <p>Memoria Total: {gpu.memoryTotal} MB</p>
                  <p>Memoria Libre: {gpu.memoryFree} MB</p>
                  <p>Memoria Usada: {gpu.memoryUsed} MB</p>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </div>
      <div className="overflow-hidden border border-zinc-800 bg-zinc-900/80 p-4">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2 my-2">
            <HardDriveIcon className="w-5 h-5" />
            Discos
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-1 text-sm text-zinc-400 flex flex-row gap-4 flex-wrap">
          {info?.disks.map((disk, index) => (
            <div key={index} className="mb-4 border border-zinc-800 bg-zinc-900/80 p-4 rounded-lg mx-2">
              <p>{disk.fs}</p>
              <p className="text-blue-200">Tamaño: {((disk.size ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
              <p className="text-red-200">Usado: {((disk.used ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
              <p className="text-green-200">Disponible: {((disk.available ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
            </div>
          ))}
        </CardContent>
      </div>
      <div className="overflow-hidden border border-zinc-800 bg-zinc-900/80 p-4">
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2 my-2">
              <NetworkIcon className="w-5 h-5" />
              Interfaces de Red
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-1 text-sm text-zinc-400">
              {info?.networkInterfaces.map((iface, index) => (
                <div key={index} className="mb-4 border border-zinc-800 bg-zinc-900/80 p-4 rounded-lg">
                  <p>Interfaz: {iface.iface}</p>
                  <p>Nombre: {iface.ifaceName}</p>
                  <p>IP v4: {iface.ip4}</p>
                  <p>Subnetmask v4: {iface.ip4subnet}</p>
                  <p>IP v6: {iface.ip6}</p>
                  <p>Subnetmask v6: {iface.ip6subnet}</p>
                  <p>MAC: {iface.mac}</p>
                  <p>Virtual: {iface.virtual ? "Sí" : "No"}</p>
                  <p>Tipo: {iface.type}</p>
                  <p>Velocidad: {iface.speed} Mbps</p>
                  <p>DHCP: {iface.dhcp ? "Sí" : "No"}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
    </div>
  );
}

export default Home;
