export const animatorSceneRoleOptions = [
  { value: "assembly", label: "Assembly" },
];

export const animatorAssemblyTemplateMenuRows = [
  [
    { template: "noether_core", label: "Pro Noether Core" },
    { template: "noether_pair", label: "Noether Pair" },
    { template: "noether_quad", label: "Noether Quad" },
  ],
  [
    { template: "electron", label: "Pro Electron" },
  ],
  [
    { template: "down_quark", label: "Pro Down Quark" },
    { template: "up_quark", label: "Pro Up Quark" },
  ],
];

export const animatorTimelineAddTypeEntries = [
  { id: "pause", label: "Pause" },
  { id: "warp", label: "Warp" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio" },
  { id: "graphic", label: "Graphic" },
  { id: "camera", label: "Observer" },
];

export const animatorTimelineAddTypeIds = new Set(
  animatorTimelineAddTypeEntries.map((entry) => entry.id)
);

export const generationTransitions = {
  electron: { nextScene: "content/scenes/standard-model-particles/muon.json", nextLabel: "Pro Muon" },
  muon: { nextScene: "content/scenes/standard-model-particles/tau.json", nextLabel: "Pro Tau" },
  neutrino: {
    nextScene: "content/scenes/standard-model-particles/muon_neutrino.json",
    nextLabel: "Pro Muon Neutrino",
  },
  muon_neutrino: {
    nextScene: "content/scenes/standard-model-particles/tau_neutrino.json",
    nextLabel: "Pro Tau Neutrino",
  },
  up_quark: { nextScene: "content/scenes/standard-model-particles/charm.json", nextLabel: "Pro Charm Quark" },
  charm: { nextScene: "content/scenes/standard-model-particles/top.json", nextLabel: "Pro Top Quark" },
  down_quark: { nextScene: "content/scenes/standard-model-particles/strange.json", nextLabel: "Pro Strange Quark" },
  strange: { nextScene: "content/scenes/standard-model-particles/bottom.json", nextLabel: "Pro Bottom Quark" },
};
