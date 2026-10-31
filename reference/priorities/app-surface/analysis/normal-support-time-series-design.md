# Signed normal-support histories and aggregate readouts

## Operator proposal and disposition

On October 29, 2026, the operator proposed a time graph showing every architrino's inward/outward support, with positive values outward and negative values inward, and an overall measure based on the average sum of magnitudes, then explicitly requested implementation here in Codex. The linked plots are implemented as Surface's primary support readout. This bounded implementation selection does not activate the queued research campaign or change the equation or recorded support. The existing [acceleration account](../manuscript.md#tangent-dynamics-and-superposed-normal-acceleration) owns the constraint mathematics; the [six-pole conversion reference](six-pole-replay-independent-reference-2026-10-29.md#time-velocity-and-acceleration) owns that replay's units.

**Claim grade: inferred** for the graph's usefulness. Direct reading of `SurfaceViewer.js::setTime` shows arrows normalize each vector before drawing it at a fixed relative length, so their direction is visible while magnitude is not encoded. The graph exposes magnitude, sign changes and differences between members, with an explicit coincidence label when all recorded scalar histories agree. Operator testing must establish whether this improves interpretation; a graph that obscures overlapping histories or hides uncertainty would defeat that purpose. Arrows are now an optional overlay, initially off.

## The scalar to plot

Let $\mathbf n_i(T)$ be the outward unit normal at member $i$ on the actual fixed surface, and let $\mathbf C_i(T)$ be the additional normal support acceleration already defined by the constrained equation. Define

$$
c_i(T)=\mathbf n_i(T)\cdot\mathbf C_i(T).
$$

Positive $c_i$ means outward support, negative means inward support and zero means no additional normal adjustment at that event. Architrino-level quantities are accelerations, so label the plot **Normal support acceleration**, with a short explanation that this is the additional acceleration required to hold each path on the selected surface. On a sphere, its sign is radial relative to the center. For an ellipsoid or torus, use the local outward surface normal; a vector from the global center is generally a different direction.

**Claim grade: derived** from the existing normal-only constraint: because $\mathbf C_i$ is parallel to unit $\mathbf n_i$, $|c_i|=\|\mathbf C_i\|$. If $\mathbf A_i$ denotes the receiver-superposed interaction acceleration, the spherical case is

$$
c_i=-\frac{\|\mathbf V_i\|^2}{R}-\mathbf n_i\cdot\mathbf A_i.
$$

This is the additional support needed to make the actual radial acceleration match the path's curvature requirement. The discarded normal interaction alone is not that quantity. Keep canonical normal interaction and required geometric normal acceleration available as optional explanatory overlays, with different labels. All projections occur after receiver superposition; no per-hit discarded-normal records are added. A wrong orientation, a tangent component in the alleged support, or failure of this spherical identity beyond declared errors falsifies the corresponding implementation.

## Population magnitude and time averages

For a fixed population of $N$ members, define the instantaneous sum of support magnitudes and its per-member mean:

$$
S(T)=\sum_{i=1}^{N}|c_i(T)|,\qquad M(T)=\frac{S(T)}{N}.
$$

The operator's proposed average of the sum of magnitudes is the time average over a declared interval $[T_a,T_b]$:

$$
\overline S_{[T_a,T_b]}=\frac{1}{T_b-T_a}\int_{T_a}^{T_b}S(T)\,dT,\qquad T_b>T_a.
$$

Recommend **Mean total support** for $\overline S$, with **Mean support per architrino** $\overline S/N$ alongside it when comparing populations. Label the selected averaging interval visibly. The per-member normalization supports population comparisons but does not remove dependence on geometry, coupling, units or preparation. These are descriptive acceleration readouts, not a physical energy, work or force account.

Take magnitudes before adding. Both $|\sum_i c_i|$ and $\|\sum_i\mathbf C_i\|$ can be small while individual members need substantial support. In an antipodally symmetric configuration, the vector sum can vanish even when every member needs outward support. For signed contributions $+a$ and $-a$, the magnitude sum is $2|a|$, not zero. These are analytical controls for a future implementation, not measured target results.

A smaller $\overline S$ means less additional support in that stated interval and scenario. It does not show that free evolution preserves the same configuration, that a physical environment supplies the support or that the assembly is stable. Such conclusions retain their same-history evolution and independent scientific obligations.

## Recommended display

Use one shared time plot with all member curves and a prominent horizontal zero line, labelled outward above and inward below. Use the app's absolute-time coordinate and a linear signed vertical scale. Preserve existing polarity colors and distinguish same-polarity members by line style and their stable display labels. The legend can select or hide members; hovering highlights the same member in the three-dimensional view. A cursor follows the playback time, and the graph never extrapolates outside accepted or admitted replay coverage.

Place a compact second panel below it for $S(T)$, which is nonnegative. Show the selected interval's mean total support and mean per-member support as numeric summaries. This keeps the population measure separate from individual signed traces. For symmetric histories, retain all member identities but explicitly say when several curves coincide; do not shift or jitter identical curves to suggest differences. Arrows can remain an optional direction overlay while the graph supplies the primary magnitude/history view.

## Data, uncertainty and replay boundaries

Consume the recorded support quantity at its own reception/sample time. `SurfaceRecord.js` already validates receiver-total `support`, `curvature` and `discardedNormal` vector intervals for EOM records; source reading alone does not establish that every record contains a dense, continuous scalar support history. Form a signed scalar enclosure with the corresponding surface-normal enclosure over the same reception domain. Do not project an old sample onto a normal evaluated at a different playback time and label it instantaneous support.

For the radius-ten analytical replay, the retained scaled support $l=-w^2-r$ becomes $c_i=l/10$, and retained scaled time $t$ becomes absolute time $T=10t$. Apply that conversion once, consistently with the independent reference. Symmetry can make all six signed scalar histories equal; this is a reason to label overlap, not to drop members from population totals. Uncertain endpoint times and unavailable class evaluations retain their actual status.

Show recorded interval uncertainty and data gaps. If an enclosure spans zero, its direction is unresolved there; a midpoint-line crossing is not a certified support reversal. A point sample with an uncertain time is not a bound on the intervening slab. Connecting samples may be a clearly labelled display interpolation, but it supplies no new continuous certificate or event time.

For an interval $[l,u]$ in $c_i$, the absolute-value enclosure is $[0,\max(|l|,|u|)]$ when it spans zero, and otherwise $[\min(|l|,|u|),\max(|l|,|u|)]$. Aggregate all members over common covered reception domains. Missing support for one member makes the population aggregate unavailable there; do not silently substitute zero or change the denominator. Where whole-slab support bounds exist, integrate their magnitude-sum bounds over a complete partition to enclose the time average. Where only samples exist, a time-weighted numerical summary can be shown as a **sampled estimate**, with its method and covered interval, rather than a certified average. Uneven sample spacing rules out an unweighted row mean as a time average. Do not bridge missing intervals or manufacture support values from visual path interpolation.

## Selected implementation scope

The feature serves both supported Surface record kinds and the declared population sizes, with explicit unavailable states for missing evidence. It is a readout of the existing equation/record data, not another dynamics path. [The pure display-data adapter](../../../../src/apps/surface/SurfaceSupportData.js) owns projection, magnitude reduction, common reception coverage and summaries. [The plot module](../../../../src/apps/surface/SurfaceSupportPlots.js) owns the two responsive SVG plots, common window, playback cursor, graph seeking, keyboard navigation, member visibility/selection and coincidence labels. The composition root wires them to the retained-history viewer; hiding a member never changes population totals. The longest complete span control selects a summarizable interval without filling gaps.

EOM normal projection evaluates the outward implicit gradient over the retained cubic position tube, including its position errors, across the diagnostic's own reception domain. The sphere, oblate spheroid and polynomial ring-torus gradients retain their actual outward orientation, including the torus inner wall. An undefined normal enclosure makes that value unavailable. This arithmetic is a rounded display reduction of the retained evidence, not an independently certified new trajectory or scientific acceptance of an import. Both plots expose recorded bounds; analytical samples retain time whiskers and clearly labelled midpoint connections. Point samples use lower-endpoint display clocks for the explicitly sampled trapezoidal estimate.

## Bounded implementation verification — October 29, 2026

**✓ Done; claim grade: measured** by `node scripts/surface/check-support-readout.mjs`: explicit-use analytical controls pass for outward/inward/zero support, the oblate gradient, both torus walls, unresolved normal refusal, magnitude-before-sum, antipodal vector cancellation, missing members, supported populations, six-member multiplicity, unequal sample spacing, missing observations, radius-ten conversion and the independently specified release value $1/400$. The initial known controls passed before the target readout. The independent mathematical references are the outward implicit-gradient definitions above and the unchanged frozen six-pole conversion reference. These controls protect displayed signs, units, population weighting and coverage; they neither evolve a path nor enroll a recurring suite.

**✓ Done; claim grade: measured** by a bounded Node readout of the current local checked archives (`/api/eom/v2/qualified-sphere`, `qualified-oblate`, `qualified-torus-outer`, `qualified-torus-inner`) and the shipped analytical JSON: every selected archive maps to six member series. Each EOM archive retains 129 support slabs per member with intervening missing time domains; none supports a full-window continuous mean. The six-pole replay retains 740 observations per member, of which 52 lack support. Its longest complete sampled span is approximately $T\in[24.3668459362,87.4668459362]$. The sampled total-mean interval on those lower-endpoint clocks is approximately $[0.05769685,0.06055484]$, and the mean per member is approximately $[0.00961614,0.01009247]$. These are descriptive display estimates over the stated observations, not new scientific bounds between them. Missing data or a different archive can change both the available span and the estimate.

**✓ Done; claim grade: measured** by actual in-app-browser DOM, interaction and screenshot observations at the local development URL: reviewed sphere and six-pole loading render both plots; graph clicking and Home/End update the playback time and both cursor positions; member selection updates the receiver and viewer highlight without rounding the exact selected playback time; hiding a member reduces drawn member curves while leaving the all-population summary unchanged; optional arrows toggle; complete-span selection exposes the sampled summaries and full-range selection reports gaps. The narrow 390×844 observation has document width 390, plot width 350 and a matching SVG view box, with readable axes and stacked summaries; the default viewport was restored. The inspected browser error log was empty within its requested ten-entry scope. No fresh EOM calculation, broad regression suite, deployed-site check or independent peer review of this implementation was performed. A failed analytical control, mismatched cursor, changed total after hiding a member, incorrect conversion, bridged missing interval or overflow in the named viewport would overturn its corresponding bounded delivery claim.
