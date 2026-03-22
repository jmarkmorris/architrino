export const composerSceneRoleOptions = [
  { value: "assembly", label: "Assembly" },
  { value: "reactant", label: "Reactant" },
  { value: "product", label: "Product" },
];

export const composerAssemblyTemplateMenuRows = [
  [
    { template: "noether_core", label: "Noether Core" },
    { template: "higgs_cluster", label: "Higgs Cluster" },
  ],
  [
    { template: "electron", label: "Electron" },
  ],
  [
    { template: "down_quark", label: "Down Quark" },
    { template: "up_quark", label: "Up Quark" },
  ],
];

export const composerTimelineAddTypeEntries = [
  { id: "pause", label: "Pause" },
  { id: "warp", label: "Warp" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio" },
  { id: "graphic", label: "Graphic" },
  { id: "camera", label: "Observer" },
  { id: "reaction", label: "Reaction" },
];

export const composerTimelineAddTypeIds = new Set(
  composerTimelineAddTypeEntries.map((entry) => entry.id)
);

export const generationTransitions = {
  electron: { nextScene: "content/scenes/standard-model-particles/muon.json", nextLabel: "Muon" },
  muon: { nextScene: "content/scenes/standard-model-particles/tau.json", nextLabel: "Tau" },
  neutrino: {
    nextScene: "content/scenes/standard-model-particles/muon_neutrino.json",
    nextLabel: "Muon Neutrino",
  },
  muon_neutrino: {
    nextScene: "content/scenes/standard-model-particles/tau_neutrino.json",
    nextLabel: "Tau Neutrino",
  },
  up_quark: { nextScene: "content/scenes/standard-model-particles/charm.json", nextLabel: "Charm" },
  charm: { nextScene: "content/scenes/standard-model-particles/top.json", nextLabel: "Top" },
  down_quark: { nextScene: "content/scenes/standard-model-particles/strange.json", nextLabel: "Strange" },
  strange: { nextScene: "content/scenes/standard-model-particles/bottom.json", nextLabel: "Bottom" },
};
