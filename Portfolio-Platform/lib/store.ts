import { create } from "zustand";

type ShellState = {
  terminalOpen: boolean;
  commandOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  toggleTerminal: () => void;
  setCommandOpen: (v: boolean) => void;
};

export const useShellStore = create<ShellState>((set) => ({
  terminalOpen: false,
  commandOpen: false,
  setTerminalOpen: (v) => set({ terminalOpen: v }),
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  setCommandOpen: (v) => set({ commandOpen: v }),
}));
