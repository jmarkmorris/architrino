import { getAnimatorSimulationDataset } from "./AnimatorSimulationPlaybackRuntime.js";

export function summarizeAnimatorRecordedPlayback(documentData = {}) {
  const dataset = getAnimatorSimulationDataset(documentData);
  if (!dataset) {
    return {
      hasDataset: false,
      rows: Object.freeze([
        ["Recorded output", "none loaded"],
        ["Computation", "Borg / EOM solver only"],
      ]),
    };
  }
  return {
    hasDataset: true,
    rows: Object.freeze([
      ["Recorded output", dataset.id],
      ["Engine", `${dataset.provenance?.engineId ?? "unknown"} ${dataset.provenance?.engineVersion ?? ""}`.trim()],
      ["Run", dataset.provenance?.runId ?? "unknown"],
      ["Grade", `${dataset.provenance?.claimGrade ?? "unknown"} / ${dataset.provenance?.evidenceStatus ?? "unknown"}`],
      ["Record SHA-256", dataset.provenance?.recordSha256 ?? "unavailable"],
      ["Frames", String(dataset.frames?.length ?? 0)],
      ["Status", dataset.simulation?.halt?.status ?? "unknown"],
    ]),
  };
}
