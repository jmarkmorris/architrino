export function createComposerAssemblyLabelRuntime(options = {}) {
  const getCurrentDocument =
    typeof options.getCurrentDocument === "function"
      ? options.getCurrentDocument
      : () => null;
  const getAssemblyDrafts =
    typeof options.getAssemblyDrafts === "function" ? options.getAssemblyDrafts : () => [];
  const getSelectedAssemblyId =
    typeof options.getSelectedAssemblyId === "function"
      ? options.getSelectedAssemblyId
      : () => null;
  const normalizeMemberList =
    typeof options.normalizeMemberList === "function"
      ? options.normalizeMemberList
      : () => [];
  const normalizeSubassemblyList =
    typeof options.normalizeSubassemblyList === "function"
      ? options.normalizeSubassemblyList
      : () => [];
  const getMemberId =
    typeof options.getMemberId === "function" ? options.getMemberId : (member) => member?.id ?? "";

  function getAssemblyLetter(index = 0) {
    let value = Math.max(0, Number(index) || 0);
    let label = "";
    do {
      label = String.fromCharCode(65 + (value % 26)) + label;
      value = Math.floor(value / 26) - 1;
    } while (value >= 0);
    return label;
  }

  function getPrimaryPathAssemblyLetter() {
    const documentData = getCurrentDocument();
    const primaryPathId = documentData?.paths?.[0]?.id ?? null;
    const assemblies = Array.isArray(documentData?.assemblies) ? documentData.assemblies : [];
    if (!primaryPathId || !assemblies.length) {
      return getAssemblyLetter(0);
    }
    const ownerIndex = assemblies.findIndex((assembly) => {
      const motions = Array.isArray(assembly?.motion)
        ? assembly.motion
        : assembly?.motion
          ? [assembly.motion]
          : [];
      return motions.some(
        (motion) => motion?.type === "path.transport" && motion?.pathId === primaryPathId
      );
    });
    return getAssemblyLetter(ownerIndex >= 0 ? ownerIndex : 0);
  }

  function isBareArchitrinoAssembly(assembly) {
    const members = normalizeMemberList(assembly?.members);
    const children = Array.isArray(assembly?.children) ? assembly.children : [];
    const subassemblies = normalizeSubassemblyList(assembly?.subassemblies);
    const hasCore =
      Array.isArray(assembly?.core?.shells) && assembly.core.shells.length > 0;
    const role = String(assembly?.role ?? "").trim().toLowerCase();
    const normalizedMemberId = members.length ? getMemberId(members[0], 0).toLowerCase() : "";
    const isNamedBareCharge =
      role === "electrino" ||
      role === "positrino" ||
      normalizedMemberId.startsWith("electrino") ||
      normalizedMemberId.startsWith("positrino");
    return (
      !hasCore &&
      !children.length &&
      !subassemblies.length &&
      members.length === 1 &&
      isNamedBareCharge
    );
  }

  function normalizeAssemblySceneRole() {
    return "assembly";
  }

  function getAssemblySceneRoleLabel() {
    return "Assembly";
  }

  function getAssemblySceneRoleGlyph() {
    return "A";
  }

  function getAssemblySceneRoleColor() {
    return "#ffc26a";
  }

  function getAssemblyViewportLabel(assembly, index = 0) {
    return `${getAssemblySceneRoleGlyph(assembly?.sceneRole)}${index + 1}`;
  }

  function getSelectedAssemblyLetter() {
    const assemblyDrafts = getAssemblyDrafts();
    const selectedAssemblyId = getSelectedAssemblyId();
    const index = assemblyDrafts.findIndex((assembly) => assembly?.id === selectedAssemblyId);
    return getAssemblyLetter(index >= 0 ? index : 0);
  }

  return {
    getAssemblyLetter,
    getPrimaryPathAssemblyLetter,
    isBareArchitrinoAssembly,
    normalizeAssemblySceneRole,
    getAssemblySceneRoleLabel,
    getAssemblySceneRoleGlyph,
    getAssemblySceneRoleColor,
    getAssemblyViewportLabel,
    getSelectedAssemblyLetter,
  };
}
