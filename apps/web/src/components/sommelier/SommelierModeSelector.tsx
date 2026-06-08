import React from "react";
import type { Profile } from "../../types/sommelier";
import {
  SOMMELIER_PROFILES,
  PROFILE_STORAGE_KEY,
} from "../../data/sommelier/profiles";

interface SommelierModeSelectorProps {
  selectedProfile: Profile;
  onSelectProfile: (profile: Profile) => void;
  isSaved: boolean;
  onClear: () => void;
}

const profiles: Profile[] = ["private", "b2b", "producer", "admin"];

const SommelierModeSelector: React.FC<SommelierModeSelectorProps> = ({
  selectedProfile,
  onSelectProfile,
  isSaved,
  onClear,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-950/80 p-1">
        {profiles.map((id) => {
          const p = SOMMELIER_PROFILES[id];
          return (
            <button
              key={id}
              onClick={() => onSelectProfile(id)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                selectedProfile === id
                  ? "bg-indigo-500/20 text-indigo-300 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title={p.description}
            >
              <span className="text-sm">{p.icon}</span>
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onClear}
        className="rounded-md px-2 py-1 text-[10px] text-zinc-600 transition-colors hover:text-zinc-400"
        title="Restablecer perfil (olvidar perfil guardado)"
      >
        {isSaved ? "💾" : ""} Reset
      </button>
    </div>
  );
};

export default SommelierModeSelector;
