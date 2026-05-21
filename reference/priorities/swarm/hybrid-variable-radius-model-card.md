# Hybrid Variable-Radius Tri-Binary Model Card

Promotion status: `priority-only`. This packet records the proposed merge between the nested tri-binary model and the same-level tri-binary model. It does not authorize migration into `content/markdown/aaa`, simulations, scene assets, or app copy. It defines a branch-family target in which the former nested and same-level pictures are sectors of one variable-radius, bounded-speed Noether-core model. After [neutral-knot-cloud-branch-model.md](neutral-knot-cloud-branch-model.md), this hybrid packet is a binary-slot sector of the broader neutral six-site knot-cloud branch family. The slot-radius shorthand $R_a$ is made into a derived support functional in [hybrid-support-radius-functional.md](hybrid-support-radius-functional.md).

The working decision is not to replace the old layer picture immediately. The safer mathematical move is to demote fixed radial nesting and exact pairing from ontology to sector conditions. The general base branch is six labeled architrinos with three positive and three negative sites. The three binaries remain available only when an optional partition into three binary slots is declared and certified. Their radii, speeds, causal-root ledgers, and event rows decide whether a retained branch lies in a nested sector, a same-level sector, a transition sector, or outside the binary-slot sector altogether.

---

## 1. Merge Hypothesis

The general base branch uses site labels $i\in I=\{1,\ldots,6\}$ with $\sum_i\sigma_i=0$ and no required pair relation. This hybrid sector adds a partition

$$
\mathcal{P}=\{P_1,P_2,P_3\},
\qquad
|P_a|=2,
\qquad
\sum_{i\in P_a}\sigma_i=0.
$$

Only after $\mathcal{P}$ is declared may one write $i=(a,\sigma)$, with $a\in\{1,2,3\}$ indexing the three binary slots and $\sigma\in\{+,-\}$ indexing the two architrinos in each slot. The sector branch is a set of closed arclength curves in $\mathbb{R}^3$ with a declared support descriptor:

$$
\mathbf{x}_{a,\sigma}(t)
=
\mathbf{Y}_{a,\sigma}(\Lambda_{a,\sigma}(u)),
\qquad
\mathcal{D}_{\mathrm{supp}}
=
\left(
\mathbf{C},
R_{a,\sigma}^-,
R_{a,\sigma}^+,
\delta_{a,\sigma},
\text{sector labels}
\right).
$$

A sector packet may use the shorthand

$$
\mathbf{x}_{a,\sigma}
=
\mathbf{C}
+
R_a\mathbf{U}_{a,\sigma}
$$

only after it declares how $R_a$ is extracted from $\mathcal{D}_{\mathrm{supp}}$. That shorthand is a sector parametrization, not the base geometry. The branch velocity is checked directly:

$$
\mathbf{u}_{a,\sigma}(t)
=
\dot{\mathbf{x}}_{a,\sigma}(t)-\dot{\mathbf{C}}(t),
\qquad
\|\mathbf{u}_{a,\sigma}(t)\|
=
c_f\nu_{a,\sigma}(t),
$$

with positive bounded speed factors

$$
0<\nu_- \le \nu_{a,\sigma}(t)\le \nu_+.
$$

The old fixed-speed row is recovered when $\nu_{a,\sigma}\equiv1$. The same-level row is recovered when the three support radii share one support band. The nested row is recovered when the three support radii remain ordered and separated on the retained window.

Define the mean slot radius

$$
\bar R(t)=\frac{1}{3}\sum_{a=1}^3 R_a(t),
$$

and the radius-spread residual

$$
\mathcal{R}_{\mathrm{spread}}(W)
=
\sup_{t\in W}
\max_a
\frac{|R_a(t)-\bar R(t)|}{\bar R(t)}.
$$

Here $R_a(t)$ may be an arclength average, a causal-time average, a support-band midpoint, or a certified interval center, but the retained branch packet must declare which convention it uses and emit the derivative rows of [hybrid-support-radius-functional.md](hybrid-support-radius-functional.md). The point of $\mathcal{R}_{\mathrm{spread}}$ is to separate two questions:

1. whether the branch has a common support descriptor sector;
2. whether the branch has closed causal-root, action, event, and observer-export rows.

A small $\mathcal{R}_{\mathrm{spread}}$ is therefore not a branch proof. It is only a sector label.

---

## 2. Branch Sectors

### 2.1 Nested Sector

The nested sector is the retained region in which the three slot radii are persistently ordered:

$$
R_{I}(t)<R_{M}(t)<R_{O}(t)
$$

or the corresponding accepted slot-label convention, with certified radius gaps

$$
\mathcal{G}_{ab}^{R}(W)
=
\inf_{t\in W}
\frac{R_b(t)-R_a(t)}{\bar R(t)}
>
\epsilon_R
$$

for each declared adjacent ordering row. In this sector, `inner`, `middle`, and `outer` may remain useful as weak-stress or continuation labels, but they are not allowed to override the causal-root ledger, speed row, or action row.

### 2.2 Same-Level Sector

The same-level sector is the retained region in which

$$
\mathcal{R}_{\mathrm{spread}}(W)\le\epsilon_{\mathrm{same}},
$$

with a common support band and declared phase/topology data. A same-level branch may be fixed-speed,

$$
\nu_{a,\sigma}\equiv1,
$$

or bounded-speed,

$$
0<\nu_-\le\nu_{a,\sigma}\le\nu_+.
$$

The bounded-speed sector inherits the center-time chart, causal-time roots, speed-weighted Jacobian, speed-ODE solvability, normal reconstruction, self-hit hinge, return certificate, support descriptor, action, event, Krawczyk, and stability rows from [variable-speed-factor-extension.md](variable-speed-factor-extension.md), [bounded-speed-factor-center-time-dynamics.md](bounded-speed-factor-center-time-dynamics.md), [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), [bounded-speed-factor-normal-reconstruction-theorem.md](bounded-speed-factor-normal-reconstruction-theorem.md), [free-support-bounded-speed-dynamics.md](free-support-bounded-speed-dynamics.md), [free-support-action-compatibility-theorem.md](free-support-action-compatibility-theorem.md), [bounded-speed-factor-self-hit-return-lemma.md](bounded-speed-factor-self-hit-return-lemma.md), [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md), and [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md).

### 2.3 Transition Sector

The transition sector is the region in which one or more radius gaps approach zero, change ordering, or fail to remain separated:

$$
0\le
\mathcal{G}_{ab}^{R}(W)
\le
\epsilon_R.
$$

This sector is the mathematical home for the operator question: the old `I/M/O` or `I/M/L` labels may continue as branch-history labels while the geometry becomes approximately same-level. A transition-sector packet must declare whether the labels are:

| Label use | Meaning |
| --- | --- |
| `geometric-order` | slot labels are still radius ordered on $W$ |
| `continuation-history` | slot labels name the branch sector from which the current row was continued |
| `weak-stress-role` | slot labels name a dynamical role, such as near-field-speed hinge or self-hit-prone slot |
| `rejected-label` | the old labels no longer have a ledger-consistent meaning |

No user-facing corpus merge should begin until this label-use row has an accepted status.

---

## 3. Hybrid Dynamics Row

The retained equation must be computed from the actual path acceleration. In a normalized arclength chart, the bounded-speed same-level equation was

$$
\nu_i^2\mathbf{K}_i+\nu_i\nu_i'\mathbf{T}_i
=
\Gamma\widetilde{\mathbf{F}}_i.
$$

In the hybrid variable-radius chart, radial breathing and radial-slot drift add acceleration terms. Write the direct acceleration residual as

$$
\mathcal{R}_{\mathrm{dyn},a,\sigma}^{\mathrm{hyb}}
=
\ddot{\mathbf{x}}_{a,\sigma}
-
\Gamma_{\mathrm{phys}}\widetilde{\mathbf{F}}_{a,\sigma},
$$

or, after projection into tangent, normal, and radial-support rows,

$$
\mathcal{R}_{\mathrm{dyn}}^{\mathrm{hyb}}
=
\left(
\mathcal{R}_{\parallel}^{\nu},
\mathcal{R}_{\perp}^{\nu},
\mathcal{R}_{\mathrm{supp},r}^{\nu},
\mathcal{R}_{\mathrm{mix}}
\right).
$$

Here $\mathcal{R}_{\mathrm{supp},r}^{\nu}$ is the support-radial equation and $\mathcal{R}_{\mathrm{mix}}$ records terms coupling radial change to phase, tangent, curvature, and causal-root motion. A solver may use a simplified sector equation only after it declares the dropped terms and proves they are below the retained tolerance.

The hybrid branch residual should therefore include at least

$$
\mathcal{R}_{\mathrm{hyb}}
=
\left(
\mathcal{R}_{\mathrm{spread}},
\mathcal{R}_{\mathrm{gap}}^{R},
\mathcal{R}_{H}^{\nu},
\mathcal{R}_{\mathrm{root}}^{\nu},
\mathcal{R}_{\mathrm{dyn}}^{\mathrm{hyb}},
\mathcal{R}_{\mathrm{self}},
\mathcal{R}_{E},
\mathcal{R}_{\mathrm{event}},
\mathcal{R}_{\mathrm{export}}
\right),
$$

with every row computed on one active causal-root ledger and one source-pair policy.

---

## 4. Self-Hit And Field-Speed Boundary

The hybrid model keeps the current bounded-speed discipline. Near $c_f$ motion is not by itself a self-hit proof. A same-source ordinary root can enter only when the speed-factor hinge condition is crossed:

$$
\mathcal{A}_i(\lambda^-,\lambda)
=
\mathcal{D}_i(\lambda^-,\lambda),
$$

with a positive same-source Jacobian floor and a short, ledgered event interval. If a slot is called `inner`, `middle`, `outer`, `I`, `M`, `O`, or `L`, that label does not exempt it from the same self-hit rows:

$$
J_{\mathrm{self}}^{\nu}\ge J_{\mathrm{self},0}>0,
\qquad
\operatorname{dur}_u(\mathcal{H}_i)\le\tau_{\mathrm{hit}}^u,
\qquad
\int_{\mathcal{H}_i}(\nu_i-1)_+\,d\lambda\le B_{\mathrm{hit}}.
$$

Here $\operatorname{dur}_u(\mathcal{H}_i)=|\chi_i(\mathcal{H}_i)|$ is the dimensionless center-time duration, with $\operatorname{dur}_t=(R_*/c_f)\operatorname{dur}_u$ when a physical-time report is required.

If those rows are absent, the branch status remains

$$
\texttt{self-hit-mode-unledgered}.
$$

---

## 5. Merge Decision Gate

The user-facing corpus merge begins only after a hybrid merge review packet answers `yes` to every row below.

| Gate | Required object | Current status |
| --- | --- | --- |
| Hybrid branch definition | explicit variables for slot radii, speed factors, phase/topology data, inventory, causal roots, action, event rows, and observer exports | open |
| Sector map | nested, same-level, and transition sectors stated as residual conditions using the support-radius functional, not competing ontologies | staged here |
| Label-use decision | accepted meaning for `I/M/O`, `I/M/L`, `inner`, `middle`, and `outer` inside the hybrid family | open |
| Retained branch candidate | at least one branch packet with finite active roots, positive Jacobian floors, finite memory depth, noncollision, closed dynamics residuals, action/event closure, and stability data | open |
| NTB comparison | explicit comparison against the nested tri-binary causal-closure packet set, naming preserved assumptions, replaced assumptions, and fallback source material | open |
| Same-level comparison | explicit comparison against the same-level and bounded-speed packets in this directory, naming which rows survive unchanged and which must be recomputed with variable radii | open |
| User-facing corpus merge plan | reviewable edit-batch sequence for `content/markdown/aaa`, simulations, and app/assets, with rollback route and validation commands | deferred |
| Operator approval | explicit approval to start the first user-facing corpus merge batch after the review packet is complete | not requested |

The gate separates mathematical success from editorial migration. A retained branch candidate may justify a strong theory statement, but corpus-wide language changes still require the merge plan and operator approval row.

---

## 6. Current Capture Decision

This packet changes the priority-side decision surface:

1. Do not treat same-level tri-binary as a forced replacement for the nested model.
2. Treat nested, same-level, and transition geometries as sectors of one hybrid variable-radius branch family.
3. Keep fixed-speed same-level evidence as the $\nu_i\equiv1$ and small-radius-spread subcase.
4. Keep bounded-speed self-hit rows as the only admissible route for ordinary self-hit intervals.
5. Do not begin user-facing corpus merge until the hybrid merge decision gate passes.

No material in this packet is ready for direct promotion into `content/markdown/aaa` until the retained branch, label-use, NTB comparison, and user-facing merge-plan rows are populated.
