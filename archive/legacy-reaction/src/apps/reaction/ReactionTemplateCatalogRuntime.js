import { getReactionCanonicalBaseLabel } from "./ReactionLabelCatalogRuntime.js";

const reactionAssemblyTemplateRowTemplateIds = Object.freeze([
  Object.freeze(["noether_core", "noether_pair", "noether_quad"]),
  Object.freeze(["electron"]),
  Object.freeze(["down_quark", "up_quark"]),
  Object.freeze(["pi_plus", "pi_minus", "upi0", "dpi0"]),
  Object.freeze(["k_minus", "k_plus", "sk0", "dk0"]),
  Object.freeze(["b_minus", "b_plus", "bB0", "dB0"]),
]);

export const reactionAssemblyTemplateMenuRows = Object.freeze(
  reactionAssemblyTemplateRowTemplateIds.map((row) =>
    Object.freeze(
      row.map((template) =>
        Object.freeze({
          template,
          label: getReactionCanonicalBaseLabel(template),
        })
      )
    )
  )
);
