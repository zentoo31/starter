import { Card, CardTitle, CardHeader, CardContent } from "@/components/card";
import { MonitorCog, CircleAlertIcon, CpuIcon, MemoryStickIcon, GpuIcon, HardDriveIcon } from "lucide-react";
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
      <div>
        <h1 className="text-2xl font-bold flex flex-row gap-2 items-center">
          <MonitorCog className="w-6 h-6" />
          Información del Sistema
        </h1>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2">
              <CircleAlertIcon className="w-5 h-5 mr-2" />
              Sistema Operativo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Plataforma: {info?.os.platform}</p>
            <p>Distro: {info?.os.distro}</p>
            <p>Release: {info?.os.release}</p>
            <p>Codename: {info?.os.codename}</p>
            <p>Hostname: {info?.os.hostname}</p>
            <p>Serial: {info?.os.serial}</p>
            <p>Arquitectura: {info?.os.arch}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2">
              <CpuIcon className="w-5 h-5" />
              CPU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p>Marca: {info?.cpu.manufacturer}</p>
              <p>CPU: {info?.cpu.brand}</p>
              <p>Arquitectura: {info?.cpu.socket}</p>
              <p>Velocidad: {info?.cpu.speed} GHz</p>
              <p>Núcleos Físicos: {info?.cpu.physicalCores}</p>
              <p>Hilos: {info?.cpu.cores}</p>
              <p>Virtualización: {info?.cpu.virtualization ? "Habilitada" : "Deshabilitada"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2">
              <MemoryStickIcon className="w-5 h-5" />
              Memoria RAM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p>Total: {((info?.mem?.total ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
              <p>Usada: {((info?.mem?.used ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
              <p>Libre: {((info?.mem?.free ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-2">
              <GpuIcon className="w-5 h-5" />
              Tarjeta Gráfica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p>Nombre: {info?.graphics.controllers[0]?.name}</p>
              <p>Marca: {info?.graphics.controllers[0]?.vendor}</p>
              <p>Modelo: {info?.graphics.controllers[0]?.model}</p>
              <p>VRAM: {info?.graphics.controllers[0]?.vram} MB</p>
              <p>Versión del Driver: {info?.graphics.controllers[0]?.driverVersion}</p>
              <p>Memoria Total: {info?.graphics.controllers[0]?.memoryTotal} MB</p>
              <p>Memoria Libre: {info?.graphics.controllers[0]?.memoryFree} MB</p>
              <p>Memoria Usada: {info?.graphics.controllers[0]?.memoryUsed} MB</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2">
            <HardDriveIcon className="w-5 h-5" />
            Discos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {info?.disks.map((disk, index) => (
            <div key={index} className="mb-4">
              <p>Nombre del Sistema de Archivos: {disk.fs}</p>
              <p>Tamaño: {((disk.size ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
              <p>Usado: {((disk.used ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
              <p>Disponible: {((disk.available ?? 0) / 1024 / 1024 / 1024).toFixed(2)} GB</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
