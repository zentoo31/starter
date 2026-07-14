type Program = {
  id: string;
  name: string;
  category: string;
  url: string;
  icon: string;
};

type ProgramSource = Omit<Program, "icon"> & {
  icon?: string;
};

type NiniteProgram = {
  id: string;
  name: string;
  icon: string;
};

type NiniteProgramSource = Omit<NiniteProgram, "icon"> & {
  icon?: string;
};

export type { Program, ProgramSource, NiniteProgram, NiniteProgramSource };