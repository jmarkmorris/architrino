# Directed receiver-refinement scheduling successor

The [v7 source](../evidence/alternatives-screen-2026-10-05-width-entry-directed-v7.mjs) changes only the refinement schedule of the [v6 growing-width instrument](alternatives-screen-2026-10-05-width-entry-directed-growing-controls.md). If source refinement from the previous level improves the worst failed margin by less than one quarter of its remaining deficit, the instrument bisects the receiver interval early. At maximum receiver depth it still attempts every allowed source refinement before declaring the interval unresolved. This is an efficiency heuristic: it neither changes an interval bound nor admits a failed interval.

The source is frozen at hash `ac203a62017dc9d5f43d8d569e9757db6ff5eb42d440c773bae4ad5878208c15`. At 15:26:36 UTC its known controls passed before target use, in 0.145 measured seconds and 107528192 bytes RSS. The local receipt is `width-entry-directed-v7-controls/receipt.json` beneath `.local-data/master-equation-closure/collinear-research/alternatives-screen-2026-10-05/`. Mathematical references and all earlier sources remain unchanged.

The admitted fourth-law candidate and the travel/source/depth limits are unchanged. Every leaf must still satisfy both strict directed inequalities. The ongoing v6 run retains its own deadline and output; it is not silently replaced or deleted.
