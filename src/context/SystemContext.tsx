import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { SystemInfo } from "@/types/systemInfo";

interface SystemContextType {
  info: SystemInfo | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: ReactNode }) {
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);

    const data = await window.electronAPI.getSystemInfo();

    setInfo(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SystemContext.Provider
      value={{
        info,
        loading,
        refresh,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);

  if (!context) {
    throw new Error("useSystem debe usarse dentro de SystemProvider");
  }

  return context;
}