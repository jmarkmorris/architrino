# Fine-Grained Braid Maxwell Exploration Prompt

```text
Closure goal:
Explore Maxwell's four equations directly as observer-level residuals of one finite, individually resolved collection of Noether braids, identifying the smallest braid, causal-history, exposure, and Noether sea records capable of producing each term without modeling a wire, capacitor, magnet, solenoid, or other bulk device.

Use the `research-exploration` skill. Keep the pass report-only and capture worthwhile insights in `reference/priorities/mapping-electromagnetism/brainstorming.md`. Do not promote corpus claims, change equation scores, modify the EOM solver, or treat a prescribed braid as retained evidence.

Read first:
- `AGENTS.md`
- `reference/op/agent-startup-orientation.generated.md`
- `reference/priorities/mapping-electromagnetism/priorities.md`
- `reference/priorities/mapping-electromagnetism/work-queue.md`
- `reference/priorities/mapping-electromagnetism/brainstorming.md`
- `content/markdown/aaa/dynamics/master-equation.md`
- `content/markdown/aaa/assemblies/gauge-structure-emergence.md`
- `content/markdown/aaa/reactions/mode-taxonomy.md`
- `reference/priorities/equation-mapping/eq-12-16a-photon-quantum-gauge-neutrino-packet.md`

Scale choice:
Use a finite observation window $W$ containing $N$ individually indexed braids. Preserve each braid's identity and raw history. Choose one smoothing scale $\ell$ satisfying the declared separation

$$
R_{\mathrm{braid}}\ll\ell\ll L_{\mathrm{variation}},
$$

where $R_{\mathrm{braid}}$ is the largest resolved assembly scale and $L_{\mathrm{variation}}$ is the shortest intended effective-field variation scale. Do not assume that such a separation already exists; state it as a hypothesis and test refinement in $N$, $W$, and $\ell$. Use the same window rule and kernel across every equation and source family. Set $c_f=1$ in every numerical instantiation.

Fine-grained state:
For each braid $A$, retain at least:
- center path $\mathbf X_A(T)$ and drift $\mathbf V_A(T)$;
- ordered internal frame and circulation orientation;
- architrino inventory and polarity-conjugation map;
- exposed charge $Q_{\mathrm{exp}}[A]$ and exposed internal-current record $\mathbf j_{\mathrm{exp}}[A]$ as derivation targets, never assigned observables;
- internal antisymmetric circulation record $\Sigma_A^{ij}$;
- causal-wake history $\mathcal H_A$ and all causal-root contributions used in the window;
- source, receiver, and sea-population role labels that do not alter the underlying ontology; and
- one shared Noether sea population/state record $\Theta_{\mathrm{sea}}$ built from resolved braids wherever current evidence permits.

Do not assign primitive $\mathbf E$, $\mathbf B$, $A_\mu$, force, magnetic moment, susceptibility, permittivity, or permeability to an architrino or braid. At the Master Equation layer, speak only of acceleration contributions and causal-history records.

Required projections:
Propose the least-assumptive common projection family

$$
(\rho_\ell,\mathbf J_\ell,\mathbf E_\ell,\mathbf B_\ell)
=\Pi_\ell
\left[
\{\mathbf X_A,\mathbf V_A,Q_{\mathrm{exp}}[A],
\mathbf j_{\mathrm{exp}}[A],\Sigma_A,\mathcal H_A\}_{A=1}^{N},
\Theta_{\mathrm{sea}}
\right].
$$

Derive $\rho_\ell$ and $\mathbf J_\ell$ from exposed inventory and worldline transport before proposing $\mathbf E_\ell$ and $\mathbf B_\ell$. Treat the electric projection as a receiver-side polar causal-flux summary and the magnetic projection as a candidate axial/circulation summary, then state exactly which parts are definitions, derived geometry, inferred mappings, or guesses. One projection, one coefficient set, and one record id must serve all cases; no per-equation retuning is allowed.

Evaluate these observer-level residuals:

$$
\mathcal R_{\rho}
=\nabla\cdot\mathbf E_\ell-\frac{\rho_\ell}{\epsilon_{\mathrm{eff}}},
$$

$$
\mathcal R_{B}
=\nabla\cdot\mathbf B_\ell,
$$

$$
\mathcal R_{F}
=\nabla\times\mathbf E_\ell
+\frac{\partial\mathbf B_\ell}{\partial T},
$$

$$
\mathcal R_{A}
=\nabla\times\mathbf B_\ell
-\mu_{\mathrm{eff}}\mathbf J_\ell
-\mu_{\mathrm{eff}}\epsilon_{\mathrm{eff}}
\frac{\partial\mathbf E_\ell}{\partial T},
$$

together with

$$
\mathcal R_{\mathrm{cont}}
=\frac{\partial\rho_\ell}{\partial T}
+\nabla\cdot\mathbf J_\ell.
$$

These equations are recovery targets applied after projection. Do not use them to generate architrino paths or to define the substrate response. If $\epsilon_{\mathrm{eff}}$ or $\mu_{\mathrm{eff}}$ is not derived, carry it as one shared constitutive unknown and state the proof burden; do not fit it separately by case.

Minimal source families:
Use the same braid inventory wherever possible and change one feature at a time.

1. Isotropic neutral null: balanced exposed inventory, no coherent drift, no aligned circulation, stationary coarse state.
2. Static exposed-density perturbation: localized $Q_{\mathrm{exp}}\ne0$ with no population drift.
3. Coherent translation: reverse the drift of a fixed exposed-charge population while holding internal records fixed.
4. Internal-circulation alignment: align neutral braid circulation records, then reverse circulation while holding centers fixed.
5. Exposure reconfiguration without local through-flow: change the local exposed polarity or orientation distribution while no braid center crosses the selected surface.
6. Propagating transverse disturbance: launch one localized history perturbation through the resolved braid population and test source-free continuation after it leaves the source cell.

Do not name these cases after devices. Their purpose is to activate charge density, transport current, internal circulation, changing electric projection, and propagating response at the smallest assembly-population scale.

Questions to answer:
1. Which Maxwell terms follow from exact braid inventory, antisymmetry, topology, or charge continuity, and which require statistical or constitutive assumptions?
2. Can $\nabla\cdot\mathbf B_\ell=0$ follow from closed antisymmetric circulation records rather than being imposed by the definition of $\mathbf B_\ell$?
3. What braid-history change supplies the two independent directions required for an axial magnetic projection?
4. Can coherent translation, internal circulation, and exposure reconfiguration feed one $\mathbf B_\ell$ map with the correct independent reversal parities?
5. Does $\mathcal R_{\mathrm{cont}}=0$ force the changing-electric term in $\mathcal R_A$, and can the resolved history show how without device-level language?
6. Can Faraday coupling arise from one evolving causal-history/sea record rather than from importing mutual field creation?
7. Does a transverse disturbance propagate under one fixed projection and sea state without assigning a photon or wave equation as an input?
8. At what $N$, $W$, and $\ell$ do the residuals stabilize, and what braid-level information is lost at that quotient?
9. Are $\epsilon_{\mathrm{eff}}$ and $\mu_{\mathrm{eff}}$ outputs of one sea response, or merely placeholders? State the exact falsifier.
10. What would distinguish direct causal-wake aggregation from a sea-essential response without treating an authored sea model as evidence about nature?

Controls:
- global polarity conjugation;
- coherent-drift reversal;
- internal-circulation reversal;
- rigid rotation and spatial reflection of the full collection;
- time reversal where the declared histories make it meaningful;
- record-split and hidden-retune negatives;
- isotropic neutral null;
- direct-only mathematical control versus one fixed resolved-sea population;
- kernel/window refinement with no parameter change; and
- randomized braid labels preserving all physical records.

For every nonzero residual or apparent success, identify the individual braid histories and causal-root contributions responsible. Agreement between a projection and data derived from the same projection proves only consistency. Any correctness claim requires an independent analytic identity, symmetry theorem, conservation law, or separately authored instrument.

Expected output:
1. A compact term-to-braid matrix with one row for each Maxwell term and continuity.
2. The exact finite-collection definitions proposed for $\rho_\ell$, $\mathbf J_\ell$, $\mathbf E_\ell$, and $\mathbf B_\ell$.
3. A source-family matrix showing parity, null, and covariance predictions before calculation.
4. A separation of exact geometric identities, measured finite-window results, inferred mappings, and guesses.
5. The first blocker for each residual and the smallest missing native carrier.
6. One no-hidden-retune refinement plan across $N$, $W$, and $\ell$.
7. One smallest next artifact, preferably a report-only finite-braid predeclaration rather than a device model or new checker.

Do not claim Maxwell recovery from one case, a smooth-looking plot, a prescribed path family, same-code agreement, or a fitted response. The first success criterion is narrower: one shared projection of an individually auditable braid collection produces the correct nulls, parities, covariance, continuity, and residual trends across the minimal source families.

End with a `Closure goal:` line naming the strongest surviving mapping, its exact claim grade, and the smallest next finite-braid artifact.
```

## Promotion Classification

Classification: `priority-only`.

Promote now: no. This prompt redirects electromagnetic exploration from
device-scale implementations to equation-first finite-braid residuals; it is
not Maxwell recovery evidence.
