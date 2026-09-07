# Horizon-Interface Label Entropy Enumerator Contract

## Status And Claim Boundary

- Queue item: `SF-003` / `horizon_entropy_packet`.
- Result grade: derived priority-contract formulation.
- Scientific status: no horizon-interface carrier, label count, area-law coefficient, thermal limit, Page curve, or information-preservation result is established.
- Upstream admission: one source-bound output satisfying [SF-001](embedded-horizon-interface-boundary-conditions.md) and the same-record boundary in [SF-002](observer-level-strong-field-projection-contract.md).

This packet defines what a terminal label enumerator must count and proves the elementary coefficient reduction that turns local label growth into the observer-level area-law comparison. It does not supply the missing strong-field carrier or treat the standard entropy-area relation as substrate input.

Plainly: the packet specifies a count that would mean something if a real horizon-interface record supplied the labels. It does not invent those labels or claim the desired count.

## Admitted Ensemble

Let a source-bound SF-001 output be

$$
\mathcal O_H
=
\left(
\operatorname{id}(\Theta_{\partial\Omega,W}),
H_W,
\Theta_H,
\mathcal B_H,
\mathcal L_{\partial\Omega,W},
\Pi_{\mathrm{ext}},
\mathcal F_H,
\mathcal P_H
\right),
$$

with every component verdict in $\mathcal F_H$ accepted. To distinguish the surviving candidate family already carried by this upstream record from the physical ensemble constructed below, write that field as $\mathcal B_H^{\mathrm{SF1}}$ in this packet. This is a mathematical alias, not a new machine-contract field.

Let $\mathfrak a_\lambda(\lambda;\mathcal O_H)$ be a separately declared per-label predicate that equals one only when the candidate preserves all accepted SF-001 component rows under its own continuation. Let $\mathfrak m_O(\lambda;\Pi_{\mathrm{ext}})$ be the observer-macrostate projection extracted from the upstream projection bundle. Before counting, freeze a nonempty macrostate cell $C_O$ around $(M,\mathbf J,Q)$ using declared tolerances or a covariance rule that is independent of the label count. Define the raw admitted fiber

$$
\widetilde{\mathcal B}_H(C_O;\mathcal O_H)
=
\left\{
\lambda\in\mathcal B_H^{\mathrm{SF1}}:
\mathfrak a_\lambda(\lambda;\mathcal O_H)=1,
\ \mathfrak m_O(\lambda;\Pi_{\mathrm{ext}})\in C_O
\right\}.
$$

The upstream output-level admission predicate remains unchanged: it admits or rejects $\mathcal O_H$ as a whole. The new $\mathfrak a_\lambda$ predicate is subordinate to that accepted output and tests candidate-specific continuation. A label rejected by any one candidate-specific component is not an entropy state. For one carrier-family member, the macrostate cell and all tolerances are frozen before enumeration; an empty cell is a failed comparison, not permission to widen it after seeing the count. A thermodynamic-area family may use different member cells only through the predeclared scaling rule below.

Plainly: only labels that survive the complete boundary problem and produce the same exterior record enter the raw count.

## Harmless Relabeling Quotient

Let $G_0(\mathcal O_H)$ be a group acting on $\widetilde{\mathcal B}_H(C_O;\mathcal O_H)$. Its identity, composition, and inverses must remain inside the raw admitted fiber, and every action must preserve every path identity, causal-root owner, wake history, boundary-ledger row, Noether sea field, per-label admission result, and observer macrostate cell. Define

$$
\lambda\sim_0\lambda'
\quad\Longleftrightarrow\quad
\exists g\in G_0(\mathcal O_H)
\text{ such that }
\lambda'=g\lambda,
$$

and count the quotient

$$
\mathcal B_H(C_O;\mathcal O_H)
=
\widetilde{\mathcal B}_H(C_O;\mathcal O_H)/G_0(\mathcal O_H).
$$

A permutation is not harmless merely because it leaves a displayed shape unchanged. If it changes a source identity, delayed history, root assignment, conserved-ledger route, release channel, or observer-accessible record, it represents a distinct candidate state and cannot be divided out. Because some labels may have nontrivial stabilizers, the enumerator must construct orbit representatives or apply an exact orbit-counting identity; it may not divide the raw count by $|G_0|$ without checking fixed points.

Plainly: renaming identical bookkeeping labels should not create entropy, but exchanging physically different histories may. The count has to prove which case applies.

## Local Block Family

Let $U$ be a connected finite block of horizon-adjacent alignment patches carried by one admitted $\mathcal O_H$. The extendable local raw family is

$$
\widetilde{\mathcal L}_U^H(\mathcal O_H)
=
\left\{
\lambda|_U:
\lambda\in\widetilde{\mathcal B}_H(C_O;\mathcal O_H)
\right\},
$$

Let $\rho_U(\lambda)=\lambda|_U$ and define the setwise stabilizer $G_{0,U}=\{g\in G_0(\mathcal O_H):gU=U\}$. A local quotient is permitted only if every $g\in G_{0,U}$ descends through restriction: there must be a unique map $\bar g_U$ on $\widetilde{\mathcal L}_U^H$ such that

$$
\bar g_U\circ\rho_U=\rho_U\circ g.
$$

Equivalently, whenever $\rho_U(\lambda)=\rho_U(\mu)$, one must also have $\rho_U(g\lambda)=\rho_U(g\mu)$. This condition makes the local result independent of which global parent realizes a restriction. The induced maps must obey $\overline{gh}_U=\bar g_U\bar h_U$ and therefore form the image group $\bar G_{0,U}$. Only then is the physical local family the well-defined orbit set

$$
\mathcal L_U^H
=
\widetilde{\mathcal L}_U^H/\bar G_{0,U}.
$$

Restriction is taken from globally admitted labels, so a locally attractive pattern that cannot extend to the same complete horizon-interface record is excluded. Distinct global extensions that induce the same local pattern remain distinct in the global ensemble; the local density counts local patterns, not hidden extension multiplicity. If the descent condition fails, the local quotient is undefined and the enumerator must retain parent-orbit provenance rather than infer equivalence from one favorable pair of parents. An independently chosen local permutation group is prohibited because it could merge restrictions whose global parents are physically inequivalent.

Plainly: a local symmetry is harmless only when it comes from a harmless symmetry of the full event record. Local resemblance by itself cannot erase different global histories.

## Limit Families

The area coefficient uses a thermodynamic-area exhaustion, not a continuum refinement of one fixed finite horizon. Declare a compatible family

$$
\left\{
(\mathcal O_H^{(n)},C_O^{(n)},U_n,r_{n+1\to n})
\right\}_{n\ge1},
$$

where $C_O^{(n)}$ is frozen before counting member $n$. Before any enumeration, declare one exterior-label scaling law $\Xi_{n+1\to n}$ that maps the center and covariance or tolerances of $C_O^{(n+1)}$ to those of $C_O^{(n)}$ and states how $(M,\mathbf J,Q)$ scale with represented horizon area. The admissibility rule, harmless-action rule, local patch rule, scaling law $\Xi$, and physical $A_{\mathrm{align}}$ are fixed for the family; the macrostate value itself need not be constant. The block $U_n$ is connected in $\mathcal O_H^{(n)}$, and $r_{n+1\to n}$ preserves accepted labels and ledger ownership while satisfying

$$
\mathfrak m_O\!\left(r_{n+1\to n}\lambda;\Pi_{\mathrm{ext}}^{(n)}\right)
=
\Xi_{n+1\to n}\!\left(
\mathfrak m_O\!\left(\lambda;\Pi_{\mathrm{ext}}^{(n+1)}\right)
\right).
$$

The source-record identifiers differ with $n$, but every member carries one declared family identity, its predeclared member cell, and the compatible restriction and exterior-scaling maps. Require $|U_n|\to\infty$ and $|\partial U_n|/|U_n|\to0$, or expose a bounded finite-boundary correction.

A continuum-refinement sequence holds one physical region fixed while patch resolution changes. It must be reported separately, with its own scale-dependent $A_{\mathrm{align},n}$ and explicit coarse-graining map. It tests resolution stability; it cannot be substituted for thermodynamic-area exhaustion or pooled with it to manufacture a coefficient.

Plainly: enlarging the represented horizon and refining the ruler used to describe one horizon are different limits. The calculation must say which one it is taking.

For each thermodynamic-area block, record

$$
s_U^H
=
\frac{1}{|U|}\log|\mathcal L_U^H|,
\qquad
a_U^H
=
\frac{A_H(U)}{|U|A_{\mathrm{align}}},
\qquad
\alpha_U^H
=
\frac{s_U^H}{a_U^H}
=
\frac{A_{\mathrm{align}}}{A_H(U)}
\log|\mathcal L_U^H|.
$$

The block sequence must expose its patch adjacency, boundary size, represented observer-level area, family identity, member source-record identity, and restriction map. Taking more samples from one fixed small block does not create an area limit.

Plainly: the calculation compares how quickly the number of admissible states grows with how quickly the represented horizon area grows. Repeating one small patch is not evidence for that scaling.

## Area-Coefficient Lemma

Suppose one admitted compatible carrier family and one thermodynamic-area exhaustion satisfy

$$
s_{U_n}^H\longrightarrow s_{\mathrm{align}}^H,
\qquad
a_{U_n}^H\longrightarrow a_H>0.
$$

Then the quotient law for limits gives

$$
\alpha_{U_n}^H
=
\frac{s_{U_n}^H}{a_{U_n}^H}
\longrightarrow
\frac{s_{\mathrm{align}}^H}{a_H}.
$$

Therefore the observer-level area-law coefficient target is exactly

$$
\frac{s_{\mathrm{align}}^H}{a_H}
\stackrel{\mathrm{target}}{=}
\frac14,
$$

not $s_{\mathrm{align}}^H=1/4$ unless the independent area calibration also establishes $a_H=1$. This implication is derived mathematics. Whether the compatible family exists, whether either limit exists, whether $A_{\mathrm{align}}$ is source-bound and fixed on that family, and whether the ratio equals $1/4$ remain unmeasured.

Plainly: one quarter is a ratio of state-count growth to area growth. A state count alone cannot recover it.

## Terminal Enumerator Output

For every block and refinement level, the terminal enumerator must emit:

| Field | Required content |
| --- | --- |
| Source identity | Exact $\mathcal O_H$, compatible-family identity, producer, precision policy, history support, frozen member macrostate cell $C_O^{(n)}$, and predeclared exterior-scaling map $\Xi$. |
| Block identity | Patch membership, adjacency, $|U|$, $|\partial U|$, $A_H(U)$, fixed $A_{\mathrm{align}}$, and restriction-map identity. |
| Raw candidates | Every candidate in upstream $\mathcal B_H^{\mathrm{SF1}}$ reached by the declared finite search. |
| Admission disposition | Per-label $\mathfrak a_\lambda$ result and one exact candidate-specific rejection code for every candidate. |
| Quotient disposition | Canonical representative, global orbit membership, setwise stabilizer, and the declared harmless transformation. |
| Counts | $|\widetilde{\mathcal L}_U^H|$, $|\mathcal L_U^H|$, $s_U^H$, $a_U^H$, and $\alpha_U^H$. |
| Convergence evidence | Nested-block/refinement sequence, boundary fraction, numerical interval, and independently checked small-block rows. |

The production enumerator must be checked on small blocks by a separately authored exhaustive enumerator or an analytic orbit count frozen before production changes. Replay of the same enumerator, a fixture produced by it, or a raw-count division by a presumed group order establishes no independent counting result.

Plainly: every accepted and rejected label must be reconstructible, and a second method must agree on small cases before the large count is trusted.

## Release-Entropy Crossing And Identification Targets

For one time-resolved admitted carrier and its release ledger, freeze an observer access/coarse-graining rule $\mathcal Q_O$ and one entropy functional $H_{\mathcal Q_O}$ before inspecting the crossing. It may be a finite microcanonical count or another explicitly defined observer-level entropy, but the horizon and outgoing rows must use the same type and compatible state partition. Define

$$
T_{\times}
=
\inf\left\{
T:
S_{\mathrm{out},\mathcal Q_O}^{(O)}(T)
\ge
S_{H,\mathcal Q_O}^{(O)}(T)
\right\},
\qquad
S_{H,\mathcal Q_O}^{(O)}(T)
=
H_{\mathcal Q_O}\!\left(\mathcal B_H^{(O)}(T)\right).
$$

Here $\mathcal B_H^{(O)}(T)$ is the observer-accessible projection of the time-resolved physical quotient ensemble defined above, and $S_{\mathrm{out},\mathcal Q_O}^{(O)}(T)=H_{\mathcal Q_O}(\mathcal L_{\mathrm{out}}^{(O)}|_{[T_i,T]})$ uses the same declared observer partition on the accumulated outgoing ledger. $T_{\times}$ is only a crossing diagnostic. It may be identified with a Page time only after the effective comparison separately establishes the needed factorization, global purity or unitary recovery, compatible fine-graining, and horizon-wrapping thermal regime.

This is a recovery target only. The same event record must provide the evolving quotient ensemble, outgoing-channel record, observer access kernel, remnant or reabsorption rows, and complete $E,\mathbf p,\mathbf J$ ledger. A separately fitted radiation curve cannot validate the label count.

Any proposed identification of horizon labels must also provide a map on the admitted quotient ensemble. It passes only if the map preserves the exterior-record distribution, the boundary ledger, finite boundary data, the horizon-wrapping comparison, and the time-resolved release accounting. A many-to-one identification that discards a physically distinct history must expose the lost record and fails the information-preservation target unless that record appears in an outgoing, remnant, reabsorbed, or Noether sea channel.

Plainly: the crossing asks when the declared outgoing record becomes at least as entropic as the declared horizon record. Calling it the Page time requires additional effective-quantum assumptions that this contract does not supply.

## Current Verdict And Falsifiers

Current first blocker: `blocked_missing_accepted_black_hole_horizon_interface_carrier`. No repository artifact supplies a finite admitted $\Lambda_{\mathrm{NS}}^H$ instance or accepted $\mathcal O_H$. After that first blocker, consumption still requires a populated per-label predicate, frozen nonempty member macrostate cells with a predeclared exterior-scaling law, a proven global harmless-relabeling group action whose stabilizers descend independently of parent choice, a compatible thermodynamic-area carrier family, a source-bound alignment-area calibration, and a time-resolved common entropy functional. SF-003 therefore remains open.

The proposed coefficient route is falsified if the enumerator omits or duplicates a label, counts a nonextendable local pattern, divides out a transformation that changes physical history, uses a local action that depends on which global parent is chosen, changes a frozen family rule or member cell after seeing a count, lacks a predeclared exterior-label scaling law, cannot reproduce independently known small-block counts, mixes continuum refinement with area exhaustion, lacks a positive area-density limit, or obtains the target coefficient only by choosing $A_{\mathrm{align}}$ after seeing the count. The release-entropy crossing fails if horizon and outgoing entropies use different carriers, partitions, or entropy types; an untracked channel loses record content; or no crossing occurs within the declared complete release history. A crossing still does not establish a Page curve unless the separately named effective-quantum hypotheses hold.

Plainly: the next required object is real label data from one admitted strong-field carrier. Until that exists, the coefficient and Page curve are specified tests, not results.
