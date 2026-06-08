import React from "react";
import { Profile } from "../../types/sommelier";

interface SommelierModeSelectorProps {
  selectedProfile: Profile;
  onSelectProfile: (profile: Profile) => void;
}

const modes: { label: string; value: Profile | "admin" }[] = [
  { label: "Cliente Privado", value: "private" },
  { label: "Cliente B2B", value: "b2b" },
  { label: "Proveedor/Bodega", value: "supplier" },
];

const SommelierModeSelector: React.FC<SommelierModeSelectorProps> = ({
  selectedProfile,
  onSelectProfile,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-lg bg-zinc-900/80 border-white/10">
      <h3 className="text-sm font-semibold text-muted dark:text-muted-dark">
        Seleccionar Perfil de Usuario
      </h3>
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onSelectProfile(mode.value)}
          className={`w-full py-2 px-4 text-sm rounded-lg transition ${
            selectedProfile === mode.value
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-black/20 border-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-700/20"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};

export default SommelierModeSelector;
