import React from "react";
import { Profile } from "../../types/sommelier";

interface SommelierModeSelectorProps {
  selectedProfile: Profile;
  onSelectProfile: (profile: Profile) => void;
}

const modes: { label: string; value: Profile; icon: string }[] = [
  { label: "Cliente Privado", value: "private", icon: "👤" },
  { label: "Cliente B2B", value: "b2b", icon: "🏢" },
  { label: "Proveedor", value: "supplier", icon: "🏭" },
];

const SommelierModeSelector: React.FC<SommelierModeSelectorProps> = ({
  selectedProfile,
  onSelectProfile,
}) => {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-950/80 p-1">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onSelectProfile(mode.value)}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
            selectedProfile === mode.value
              ? "bg-indigo-500/20 text-indigo-300 shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <span className="text-sm">{mode.icon}</span>
          <span className="hidden sm:inline">{mode.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SommelierModeSelector;
