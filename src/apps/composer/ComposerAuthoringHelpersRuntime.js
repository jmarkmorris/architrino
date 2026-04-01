import { sanitizeComposerEntityId } from "./ComposerDraftScaffoldRuntime.js";

export function formatComposerTransferList(transfers = []) {
  return transfers
    .map((transfer) => {
      const source = `${transfer?.source?.assemblyId ?? ""}.${transfer?.source?.memberId ?? ""}`;
      const target = `${transfer?.target?.assemblyId ?? ""}.${transfer?.target?.memberId ?? ""}`;
      const suffix = Number.isFinite(Number(transfer?.t)) ? ` @ ${Number(transfer.t)}` : "";
      return `${source} -> ${target}${suffix}`;
    })
    .join("\n");
}

export function formatComposerTransferEndpointLabel(endpoint) {
  const assemblyId = String(endpoint?.assemblyId ?? "").trim();
  const memberId = String(endpoint?.memberId ?? "").trim();
  if (!assemblyId || !memberId) {
    return "unknown";
  }
  return `${assemblyId}.${memberId}`;
}

export function describeComposerTransferProvenance(transfer, refLabel = "") {
  if (!transfer) {
    return null;
  }
  const prefix = refLabel ? `${refLabel}: ` : "";
  return `${prefix}${formatComposerTransferEndpointLabel(transfer.source)} -> ${formatComposerTransferEndpointLabel(transfer.target)}`;
}

export function sanitizeComposerGraphicTarget(rawTarget, fallbackAssemblyId = "") {
  if (!rawTarget || typeof rawTarget !== "object") {
    return fallbackAssemblyId ? { type: "assembly", assemblyId: fallbackAssemblyId } : null;
  }
  const type = String(rawTarget.type ?? "").trim().toLowerCase();
  if (type === "assembly") {
    const assemblyId = sanitizeComposerEntityId(rawTarget.assemblyId, "");
    return assemblyId ? { type: "assembly", assemblyId } : null;
  }
  if (type === "path_point") {
    const assemblyId = sanitizeComposerEntityId(rawTarget.assemblyId, "");
    const pointIndex = Math.max(0, Math.round(Number(rawTarget.pointIndex ?? 0) || 0));
    return assemblyId ? { type: "path_point", assemblyId, pointIndex } : null;
  }
  return fallbackAssemblyId ? { type: "assembly", assemblyId: fallbackAssemblyId } : null;
}

export function getComposerGraphicDefaultOffset(size = 0.42) {
  const radius = Math.max(0.18, Number(size) || 0.42);
  return [
    Number((radius * 1.45).toFixed(3)),
    Number((radius * 1.08).toFixed(3)),
    0,
  ];
}

export function createComposerPersonalityMembers(states = []) {
  return Array.from({ length: 6 }, (_, index) => ({
    id: `personality_${index + 1}`,
    slotKind: "personality",
    slotIndex: index,
    state: (() => {
      const state = String(states[index] ?? "unset").trim().toLowerCase();
      return state === "electrino" || state === "positrino" ? state : "unset";
    })(),
  }));
}

export function createComposerGenIFermionPersonalityMembers() {
  return createComposerPersonalityMembers();
}

export function getComposerBuiltInPersonalityStates(templateId) {
  if (templateId === "electron") {
    return Array.from({ length: 6 }, () => "electrino");
  }
  if (templateId === "up_quark") {
    return [
      "positrino",
      "electrino",
      "positrino",
      "positrino",
      "positrino",
      "positrino",
    ];
  }
  if (templateId === "down_quark") {
    return [
      "positrino",
      "positrino",
      "electrino",
      "electrino",
      "electrino",
      "electrino",
    ];
  }
  return [];
}
