# OPS-031 — Six-group before/after proposal, October 3

Status: accepted for implementation on October 3, 2026. The operator selected the recommendation to apply all six groups and independently review consequential changes, including the fixed-identity braid chart choice. Implementation and separate verification are complete; see the [closure receipt](../evidence/ops-031-six-group-closure-2026-10-03.md). The before/after passages below preserve the approved proposal. CRW-005 remains closed. This packet groups the unresolved findings without promoting any scientific result. The two separate neutron-dipole and direction-normalization questions are outside this proposal.

Groups 1–2 are below. Groups 3–4 have their exact source excerpts, dependent equation changes and geometry recommendation in the [braid proposal](ops-031-braid-before-after-2026-10-03.md). Groups 5–6 retain the already prepared exact replacements in [September 26 proposal items 4–9](ops-031-repair-proposal-2026-09-26.md#4-define-the-receiver-record-and-inferred-axis): items 4–8 are Action Model Comparison; item 9 is Braid Recovery Requirements. Those passages retain their proposal-era wording; the October 3 acceptance and closure receipt above supersede that status.

## 1. Master Equation: October 3 corrections

Target: [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md). Mathematical witnesses and falsifiers are in the [part-2 review](../../aaa-operations/evidence/ops-031-master-equation-part-2-review-2026-10-03.md).

### Successive-hit distance

Before:

> **Radial motion and the $1/r^2$ factor (local trend):**
>
> - **Inward motion** ($V_r < 0$, receiver moving toward the emission point): decreases $r_{ij}$ between close successive hits, tending to **increase** subsequent per-hit strengths via $1/r^2$ (all else equal).
> - **Outward motion** ($V_r > 0$): increases $r_{ij}$, tending to **decrease** subsequent per-hit strengths.
>
> **Important caveat:** Path-history delay shifts both the causal root $T_t$ and $\hat{\mathbf{r}}_{ij}$ over finite intervals, so these are strictly **local** statements about infinitesimal time evolution. The global trajectory depends on the full history of all transmitters.

Proposed after:

> **Receiver displacement and successive-hit distance.** With the emission point held fixed, inward receiver displacement decreases separation and outward displacement increases it. Along a tracked simple causal root, the emission point also changes. Differentiating $r_{ij}=c_f(T_r-T_t)$ gives $dr_{ij}/dT_r=c_f(1-D_{r,ij}/D_{t,ij})$. Thus receiver radial velocity alone does not determine whether successive-hit separation grows or shrinks, even infinitesimally. The inverse-square factor increases when this total separation decreases; the full contribution also depends on the transmitter weight and line of action.

### Forward-time member relabeling

Before displayed map:

$$
(a,j,T,T_t)\longmapsto(\pi(a),\pi(j),T+P_u,T_t+P_u).
$$

Proposed displayed map:

$$
(a,j,T,T_t)\longmapsto(\pi^{-1}(a),\pi^{-1}(j),T+P_u,T_t+P_u).
$$

Proposed sentence after the display and its preserved viewer link:

> The inverse permutation follows from the declared convention: $\boldsymbol\xi_{\pi^{-1}(a)}^{(u)}(T+P_u)=\boldsymbol\xi_a^{(u)}(T)$. Applying this relabeling to both events preserves their separation and delay under the common translation.

Retain the existing root-identity, weight, event and full-solution obligations. Preserve the display's existing equation-viewer anchor; its changed equation would require the ordinary authorized generated-content refresh later.

### Transmitter degeneracy and receiver tangency

Before:

> with approach from the admissible side $J_{ii}>0$. Geometrically, this is the state where the receiver trajectory is tangent to the causal wake surface of its own past emission (the “riding-the-shock” limit).

Proposed after:

> with approach from the declared side $J_{ii}>0$. This is loss of transversality in the emission-time root equation: its derivative with respect to $T_t$ vanishes at fixed reception. Tangency of the receiver to a fixed past-emission wake instead requires $D_{r,ii}=0$. The two conditions coincide on the uniform-circular root chart discussed below, but not on a general curved history.

### Stationary playback and reversal

Before:

> $D_r=0$ is a root-playback turning point. It changes the sign of branch playback but is not an acceleration pole, zero, or chart boundary.

Proposed after:

> For $D_t\ne0$, $D_r=0$ makes the tracked emission time stationary. Playback reverses only if $D_r/D_t$ changes sign; vanishing alone does not imply reversal. This event is not an acceleration pole or zero and does not by itself invalidate the simple-root chart.

## 2. Chart thresholds and auxiliary constructions

### Chosen threshold versus actual singularity

Before, Master Equation:

> When this floor fails, the active root is caustic-like or degenerate and must be routed to a different branch chart or regularization regime.

Proposed after:

> Failure of the chosen positive floor means that this chart's certified bound no longer applies. A root with nonzero transmitter derivative can remain simple and admit another justified regular chart. A zero derivative is a distinct singular event requiring the applicable fold or higher-singularity treatment.

Retain the subsequent circular-partner example and its link.

### Finite regulator/history chart

Before, Emergence of Structure:

> The native state is $\mathsf Z=(\mathbf X,\mathbf V)$, and the constrained flow is still the same lower-level dynamics:

Proposed after:

> The native state is $\mathsf Z=(\mathbf X,\mathbf V)$. Restricting admissible histories preserves the Master Equation when every contributing causal root remains included and the acceleration kernel is unchanged. A finite regulator or history cutoff defines an auxiliary flow unless an exact restriction or controlled recovery argument establishes its relation to the complete law. For the chosen flow, write:

Keep the following displayed flow equation and viewer link. Replace its following explanation as a necessary companion:

Before:

> where $\mathsf Z_T(\theta)=\mathsf Z(T+\theta)$ is the stretch of history the delayed equation needs. The constraints restrict which histories are available; they are not causes acting from outside.

Proposed after:

> where $\mathsf Z_T(\theta)=\mathsf Z(T+\theta)$ denotes the retained history. Here $F_L$ is the canonical delayed flow only where the preceding exactness conditions hold; otherwise it denotes the declared auxiliary flow for this construction. The constraints restrict which histories are available; they are not causes acting from outside.

### Infinite-source convergence

Before, Emergence of Structure:

> exist under a declared summation prescription: add up contributions within distance $R$, let $R$ grow, and require a limit. Acceptable mechanisms include local neutrality, angular cancellation, shielding, a screened kernel, a finite horizon, or a declared subtraction. Without one, the sum is not defined.

Proposed after:

> exist under a declared summation prescription: add contributions within distance $R$, let $R$ grow, and prove a limit. Neutrality, angular cancellation and shielding require sufficient quantitative bounds; their names alone do not establish convergence. Screening, a finite horizon or subtraction can be useful mathematical constructions, but a conclusion about the complete Master Equation must state the exact cancellation, retained boundary account or controlled limit that justifies the construction. Otherwise it describes an auxiliary model.

Companion before, Master Equation, following its infinite-source limit:

> exists, or it must supply local neutrality, angular cancellation, shielding, a screened kernel, finite active horizon, or a mean-field/principal-value subtraction. Without this condition, the many-transmitter wake sum is not a well-defined acceleration law even though each individual hit has the correct surface-density falloff.

Proposed after:

> exists under the declared prescription. Neutrality, angular cancellation and shielding must supply bounds sufficient to establish that limit. A screened kernel, finite horizon or subtraction must be identified as an exact reformulation with its required boundary account, a controlled approximation, or an auxiliary comparison. None establishes the complete-law limit merely by being named. Individual inverse-square falloff alone does not define the infinite acceleration sum.

The September 26 methods decision permits useful approximations; this proposal preserves that permission and the exhaustion lemma's valid centered accounting. No new kernel, cutoff or subtraction is selected as a physical law. Remaining related overview sentences must be harmonized with these exact distinctions during any accepted integration.

## Preparation and limits

The Before passages were read from the live target files with bounded `sed` reads on October 3. Groups 5–6 were rechecked against the live Action Model and weak-clock row with `sed`/`rg`; their old wording still matches the prepared proposal. This is a review proposal, not a completed implementation or full-document closure review. Before implementation, compare each exact target again, preserve concurrent changes and evidence identities, check the dependent diagram/equation bindings, and obtain independent mathematical verification of consequential changes. No corpus, generated asset or runtime file was edited to prepare this packet.
