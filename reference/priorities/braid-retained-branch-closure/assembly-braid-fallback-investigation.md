# Assembly Braid Fallback Investigation

Promotion status: `priority-only`. Task id:
`assembly_braid_fallback_investigation`.

Priority status: `low-priority-fallback-with-selection-guardrail`. This packet
is conditional on stalls in the neutral braid, shell braid, and nested shell
braid closure programs. It does not replace [Neutral Braid Base Certificate](neutral-braid/neutral-braid-base-certificate.md),
[Shell Braid Reduction Row](shell-braid/shell-braid-reduction-row.md), or
[Nested Shell Braid Reduction Row](nested-shell-braid/nested-shell-braid-reduction-row.md).
It also does not modify the central-inventory bookkeeping in
[central-inventory-and-event-ledgers.md](shell-braid/central-inventory-and-event-ledgers.md)
or the hollow-support packet in
[central-inventory-hollow-support.md](neutral-braid/central-inventory-hollow-support.md).

This packet is not the full ambient-medium selection problem. Even a retained
six-site or nested shell braid branch must still win the Noether sea selection
residual promoted in [Noether Sea](../../../content/markdown/aaa/spacetime/noether-sea.md#composition):
it must show why its assembly class dominates the weak homogeneous medium
rather than another possible architrino assembly class. The fallback packet
only controls the larger $N$-site route when the existing six-site,
central-inventory, or axial-interface rows require extra labels in one shared
ledger.

The fallback question is narrow:

$$
\text{can every architrino in a larger assembly participate in one Noether braid ledger?}
$$

Here "larger assembly" means an $N$-site branch with $N>6$, not a six-site
neutral braid plus externally attached polar-site or axial-inventory appendages,
and not a neutral braid plus a separately statused central inventory. If this
fallback ever opens, the whole branch must be treated as one Noether braid
candidate with one inventory, one causal-root ledger, one action/Noether row,
and one event ledger.

---

## 1. Scope And Status

This packet records a possible fallback architecture only. It is not a retained
branch, not a charged-fermion model, not a nuclear model, and not a migration
authority for corpus prose. Its purpose is to prevent one specific ambiguity:
if central-inventory or polar-site separation fails, the next attempt must not
quietly add hidden architrinos outside the Noether braid certificate. Either
those architrinos are outside the retained branch, or they enter one enlarged
branch ledger.

The fallback object is an $N$-site assembly braid candidate

$$
\mathfrak{R}_{\mathrm{asm}}^\nu(B,W;N)
$$

with labeled architrino set

$$
A_B=\{1,\ldots,N\},
\qquad
N>6,
$$

polarity map

$$
\sigma:A_B\to\{+1,-1\},
$$

closed arclength curves

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
\|\mathbf{Y}_i'(\lambda)\|=1,
$$

positive bounded speed factors

$$
0<\nu_-\le\nu_i(\lambda)\le\nu_+<\infty,
$$

and center-time trajectories

$$
\mathbf{x}_i(u)=\mathbf{Y}_i(\Lambda_i(u)).
$$

The branch has no privileged six-site core, no separately kept nucleus, and no
unledgered external polar-site attachment. Any six-site, shell, nested shell,
central-inventory, or axial-inventory reading must be recovered later as a
quotient, reduction, or compatibility row.

Promotion decision: `priority-only`. This fallback is not ready for
`content/markdown/aaa` unless the lower-cost six-site and central-inventory
programs stall and an executable $N$-site certificate supplies a concrete
retained or rejected branch box.

---

## 2. When The Fallback Opens

The fallback opens only after at least one of the cleaner closure routes reaches
a documented hard obstruction:

| Primary route | Stall condition that may open this fallback | What the fallback is allowed to test |
| --- | --- | --- |
| neutral six-site braid | all-pairs six-site root, dynamics, action, or event rows cannot close without extra labels | whether the extra labels must join the same root/action/event ledger |
| shell braid | common support-band closure requires persistent source labels outside the six shell sites | whether those labels are real branch participants rather than support artifacts |
| nested shell braid | binary-partition or ordered-radius closure fails, but a larger recurrent $N$-site ledger remains coherent | whether the larger ledger is the retained object and nested shells are only a quotient |
| central inventory inside hollow support | resolved or regularized central labels cannot be kept separate without singularity, hidden energy, or root-ledger mismatch | whether central-inventory labels must be promoted into the same all-pairs ledger |
| axial inventory compatibility | axial inventory cannot be recovered as a compatibility interface from central-inventory plus choreography rows | whether the axial inventory is a sector exposure of one larger branch |

The fallback does not open merely because an $N$-site ansatz looks richer or more
symmetrical. It opens only when a lower-dimensional certificate fails for a
mathematical reason that the $N$-site ledger can state and test.

The opening condition should therefore be recorded as

$$
\mathcal{O}_{\mathrm{fallback}}
=
\left(
S_{\mathrm{stall}},
\mathcal{R}_{\mathrm{stall}},
A_{\mathrm{extra}},
\Pi_{\mathrm{consumer}},
\mathrm{nonfit}
\right),
$$

where $S_{\mathrm{stall}}$ names the stalled primary route,
$\mathcal{R}_{\mathrm{stall}}$ names the failing residual, $A_{\mathrm{extra}}$
is the proposed extra label set, $\Pi_{\mathrm{consumer}}$ names the row that
consumes those labels, and `nonfit` asserts that no observed particle mass,
charged-lepton ratio, CKM datum, electron radius, or measured $\alpha$ selected
the extra labels.

---

## 3. General $N$-Site Inventory And Polarity Rows

The enlarged inventory row is

$$
N_+(B)=\sum_{i\in A_B}\mathbf{1}_{\sigma_i=+1},
\qquad
N_-(B)=\sum_{i\in A_B}\mathbf{1}_{\sigma_i=-1},
$$

$$
N(B)=N_+(B)+N_-(B),
\qquad
Q(B)=\epsilon\left(N_+(B)-N_-(B)\right).
$$

The integer charge index is

$$
k_B=N_+(B)-N_-(B)=\frac{Q(B)}{\epsilon}.
$$

The fallback may test any finite $N>6$ only if $N$, $N_+$, $N_-$, and $k_B$ are
declared before the branch solve. The inventory cannot be adjusted after
observer-facing targets are inspected.

For every receiver $i$, the source-site polarity inventory is

$$
N_{\mathrm{attr},i}
=
\#\{j\in A_B:j\ne i,\ \sigma_i\sigma_j=-1\},
$$

and

$$
N_{\mathrm{rep},i}
=
\#\{j\in A_B:j\ne i,\ \sigma_i\sigma_j=+1\}.
$$

Equivalently,

$$
N_{\mathrm{attr},i}
=
\begin{cases}
N_- & \sigma_i=+1,\\
N_+ & \sigma_i=-1,
\end{cases}
\qquad
N_{\mathrm{rep},i}
=
\begin{cases}
N_+-1 & \sigma_i=+1,\\
N_--1 & \sigma_i=-1.
\end{cases}
$$

These rows are structural inventory rows only. They do not prove attraction,
repulsion balance, support closure, shielding, or stability. The realized force
still depends on retained causal roots, delays, Jacobians, directions,
multiplicities, support terms, medium-response terms, and event rows.

If a subset $S\subset A_B$ is claimed to recover the neutral six-site row, then

$$
|S|=6,
\qquad
\sum_{i\in S}\sigma_i=0
$$

must be an emitted reduction row, not a premise. If no such subset closes, the
fallback branch may still be investigated as a larger assembly, but it cannot
claim the neutral braid, shell braid, or nested shell braid reductions.

---

## 4. Relation To Existing Six-Site And Charged Rows

The six-site neutral braid is the preferred base route because it has the lowest
inventory cost:

$$
N=6,
\qquad
N_+=N_-=3,
\qquad
Q=0.
$$

The assembly-braid fallback contains that route only as a reduction:

$$
\mathfrak{R}_{\mathrm{asm}}^\nu(B,W;N)
+
\mathcal{R}_{6\mathrm{site}}
\Longrightarrow
\mathfrak{R}_{\mathrm{neutral}}^{0}(B_S,W).
$$

The reduction residual must specify the six labels $S$, the inherited root
subledger, any cross-label terms discarded by the quotient, and the tolerance
under which the six-site row is still meaningful. A six-label visual pattern is
not enough.

For charged rows, the existing same-level split writes

$$
\mathcal{I}_B
=
\left(
N_+(B),N_-(B);
C_{\mathrm{cent}}(B),
S_{\mathrm{chor}}
\right),
$$

with $S_{\mathrm{chor}}=(3,3)$ in the default same-level choreography row. The
fallback rejects this split as a premise. Instead it asks whether a single
$N$-site ledger can later expose a charged sector through a quotient

$$
\Pi_Q:
\mathcal{L}_{\mathrm{asm}}
\to
\left(Q,\mathcal{I}_{\mathrm{ax}},\mathcal{I}_{\mathrm{cent}}\right)_{\mathrm{eff}},
$$

where $\mathcal{L}_{\mathrm{asm}}$ is the full branch ledger. The effective
central-inventory and axial-inventory outputs are then recovery targets, not
independent ingredients.

This relation is stricter than the central-inventory packet. The central
inventory route may keep labels inside hollow support if it supplies resolved or
regularized representatives. The assembly-braid fallback has no such separation:
every label participates in the same all-pairs root, action, Noether, and event
rows unless a quotient row proves that it is unobservable or dynamically
decoupled below tolerance.

---

## 5. Added Mathematical Cost And Proof Risks

The cost of the fallback grows faster than the inventory count. The ordered
cross-site source-pair set is

$$
\Pi_{\mathrm{src}}^{\mathrm{asm}}
=
\{(i,j)\in A_B\times A_B:i\ne j\},
\qquad
|\Pi_{\mathrm{src}}^{\mathrm{asm}}|=N(N-1).
$$

For every ordered pair and active causal root,

$$
G_{ij,\alpha}^{\nu}(u,\eta)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta
=0,
$$

with

$$
|J_{ij,\alpha}^{\nu}(u)|\ge J_0>0.
$$

The full force row becomes

$$
F_i^\nu(u)
=
\sum_{j\ne i}
\sum_{\alpha\in\mathcal{A}_{ij}^{\nu}(u)}
\sigma_i\sigma_j
\frac{W_{ij,\alpha}^{\mathrm{rec},\nu}(u)}
{\eta_{ij,\alpha}(u)^2}
\widehat{\mathbf{R}}_{ij,\alpha}(u)
+
F_{i,\mathrm{self}}^\nu
+
F_{i,\mathrm{med}}^\nu
+
F_{i,\mathrm{supp}}^\nu.
$$

Here $J_{ij,\alpha}^{\nu}$ is only the source-normal transversality row for
root isolation. The active force/action branch strength is the same-record
receiver-normal factor $W_{ij,\alpha}^{\mathrm{rec},\nu}$, so any fallback
packet that lacks the corresponding $D_s,D_t,DW^{\mathrm{rec}}$ row is
`receiver-normal-restart-required`.

The fallback therefore adds these proof risks:

| Risk | Mathematical burden |
| --- | --- |
| root explosion | certify active, excluded, and tail status for $N(N-1)$ ordered source pairs |
| quotient ambiguity | prove which six-site, charged, axial, or central rows are recovered rather than inserted |
| hidden fitting | prevent $N$, polarity counts, or quotient choices from being selected by observer-facing targets |
| noncollision pressure | maintain positive separation and Jacobian floors across more same-polarity and opposite-polarity channels |
| action exactness | show one total action or a declared action obstruction for the enlarged history-work one-form |
| event provenance | account for energy, momentum, angular momentum, charge, source provenance, recoil, and Noether sea update across all labels |
| observer-export leakage | keep Lorentz, photon, mass-map, color, strong-field, and cosmology exports downstream of the same retained ledger |

This is why the packet is low priority. It increases the branch dimension,
source-pair count, quotient burden, and nonfit burden before the lower-cost
six-site and central-inventory routes have been exhausted.

---

## 6. Minimal Certificate Rows And Rejection Criteria

The minimal fallback certificate is

$$
\mathfrak{R}_{\mathrm{asm}}^\nu(B,W;N)
=
\left(
\mathsf{FallbackOpening},
\mathsf{AssemblyInventory},
\mathsf{Curves}^{\nu},
\mathsf{GaugePeriod}^{\nu},
\mathsf{RangeNoncollision},
\mathsf{AllPairsRoot}^{\nu},
\mathsf{Tail}^{\nu},
\mathsf{ForceDynamics}^{\nu},
\mathsf{FiniteMode},
\mathsf{ActionNoether}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{ReductionQuotient},
\mathsf{ObserverExport},
\mathsf{Status}
\right).
$$

Required rows:

| Row | Required payload | Failure code |
| --- | --- | --- |
| $\mathsf{FallbackOpening}$ | stalled primary route, failing residual, extra labels, consuming row, nonfit statement | `fallback-not-open` |
| $\mathsf{AssemblyInventory}$ | fixed $N>6$, $N_+$, $N_-$, $Q$, $k_B$, polarity map, source-site attraction/repulsion inventory | `assembly-inventory-open` |
| $\mathsf{Curves}^{\nu}$ | $N$ closed arclength curves, bounded speed factors, causal clocks, inverse maps, center-time paths | `assembly-curve-chart-open` |
| $\mathsf{GaugePeriod}^{\nu}$ | center gauge, phase gauges, common-period or winding-period rows for all labels | `assembly-period-open` |
| $\mathsf{RangeNoncollision}$ | finite range, positive label separation, no unresolved central or polar-site singular representatives | `assembly-noncollision-open` |
| $\mathsf{AllPairsRoot}^{\nu}$ | active, excluded, and tail root statuses for every ordered pair $i\ne j$ | `assembly-all-pairs-root-ledger-open` |
| $\mathsf{Tail}^{\nu}$ | finite owned tail cover and tail error carried into all residuals | `assembly-tail-ledger-open` |
| $\mathsf{ForceDynamics}^{\nu}$ | tangential speed row, normal curvature row, force ledger, support and medium terms zero or action-accounted | `assembly-dynamics-open` |
| $\mathsf{FiniteMode}$ | finite coefficient chart or direct curve-level certificate for all $N$ labels | `assembly-finite-mode-open` |
| $\mathsf{ActionNoether}^{\nu}$ | total action or obstruction, action-derived scale or inertia operator, Noether currents, Noether sea exchange | `assembly-action-noether-open` |
| $\mathsf{Event}^{\nu}$ | endpoint convention, root-fold, support-boundary, topology-change, source provenance, recoil, and exchange rows | `assembly-event-ledger-open` |
| $\mathsf{ReductionQuotient}$ | six-site, shell, nested shell, central-inventory, axial-inventory, or charged-sector quotient statuses | `assembly-quotient-open` |
| $\mathsf{ObserverExport}$ | Lorentz, photon, mass-map, color, strong-field, and cosmology rows marked `passed`, `failed`, or `not_computed` | `observer-export-not-statused` |

Immediate rejection criteria:

| Rejection status | Trigger |
| --- | --- |
| `fallback-not-open` | no documented neutral, shell, nested shell, or central-inventory stall requires the larger ledger |
| `inventory-fit-detected` | $N$, polarity counts, or subset choices are selected from observer-facing benchmarks |
| `hidden-appendage-detected` | any architrino contributes force, charge, action, or event data without entering $A_B$ |
| `six-site-reduction-faked` | a six-site row is asserted without an emitted subledger, cross-term bound, and quotient tolerance |
| `central-inventory-reintroduced` | central inventory is inserted as a separate unledgered branch ingredient |
| `axial-inventory-drift` | axial inventory is treated as an identity rather than a recovered compatibility or exposure row |
| `all-pairs-ledger-unowned` | any ordered pair lacks active, excluded, or tail status |
| `action-event-split` | dynamics, action, Noether, and event rows consume different ledgers |
| `observer-export-rescue` | a downstream observer export is used to rescue an unretained assembly branch |

The only successful status this packet can define is conditional:

$$
\texttt{assembly-braid-fallback-candidate-statused}.
$$

That status means the fallback has a complete investigation ledger. It does not
mean the branch is retained. Retention would still require the same root,
dynamics, support, action, Noether, event, stability, inventory, quotient, and
observer-export closure demanded of the lower-cost braid programs.

Promotion decision: `priority-only`. The mathematical advance is the explicit
fallback boundary: if larger-assembly architrinos cannot be handled as central
inventory, axial inventory, or lower-case reductions, they must either enter one
$N$-site Noether braid certificate with all-pairs closure or be rejected from the
branch claim.
