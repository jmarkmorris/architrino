# OPS-031 braid proposals: before and after, October 3, 2026

○ Proposed, not implemented. This document covers groups 3 and 4 of the operator's six-group backlog. Exact selected source excerpts are paired with proposed replacement text; relative link destinations in excerpts are rebased to this proposal location. The mathematical results retain their existing grades; historical numerical tables and receipts remain unchanged. The chart choice in group 3 remains a recommendation for review, not an accepted change to scientific source records or Borg identities.

## 3. Braid geometry

### 3a. Exact affine dimension

Source: [Braid Taxonomy](../../../../content/markdown/aaa/noether-braid/braid-taxonomy.md), lines 25–36.

**Before**

> Let $D(\mathcal B_k)$ be the affine dimension of the complete paths of declared component braid $\mathcal B_k$ in its declared braid frame. A component braid is **2D** when one fixed plane contains all its paths and **3D** when no fixed plane does.

**Proposed after**

> Let $D(\mathcal B_k)$ be the affine dimension of the complete paths of declared component braid $\mathcal B_k$ in its declared braid frame. A component braid is **2D** when its complete paths lie in one fixed plane but not in any affine line, and **3D** when no fixed plane contains them. A component whose complete paths have affine dimension zero or one receives no planar or spatial assignment under this classification.

The final case in the following display must also change. **Before:**

$$
\mathrm{Not\ assigned}, \quad \text{membership or complete path evidence is unavailable}.
$$

**Proposed after:**

$$
\mathrm{Not\ assigned}, \quad \text{membership or complete path evidence is unavailable, or any component has }D<2.
$$

The other cases should use numeric $D(\mathcal B_k)=2$ and $D(\mathcal B_k)=3$, respectively, consistently with the declared affine dimension; “Mixed” means both 2 and 3 occur and every component has one of those two dimensions. The assembly label remains “2D” or “3D.” This avoids equating numeric affine dimension with a string label and keeps the cases disjoint.

The Planar chapter's opening definition repeats the weaker containment condition. **Before:**

> This chapter collects worked records classified as planar (2D) under [Braid Taxonomy](../../../../content/markdown/aaa/noether-braid/braid-taxonomy.md): every declared component braid in a complete, disjoint partition remains in one fixed plane.

**Proposed after:**

> This chapter collects worked records classified as planar (2D) under [Braid Taxonomy](../../../../content/markdown/aaa/noether-braid/braid-taxonomy.md): every declared component braid in a complete, disjoint partition has complete paths of affine dimension exactly two in its declared braid frame.

Scope: this clarifies the stated exact-dimensional convention. The live Borg descriptor already leaves degenerate rank-zero/rank-one components unavailable; its finite-data tolerance is not promoted into an exact mathematical definition.

### 3b. Persistent identities, equal heights and interleaved components

Source: [Spatial Braid Assemblies](../../../../content/markdown/aaa/noether-braid/3d-braid-assemblies.md), lines 343–568. **Recommended proposed choice:** allow equal heights and keep membership independent of optional height ordering. This preserves the chapter's intended inclusion of the planar boundary and interleaved coaxial components. It changes the documented coordinate domain; acceptance is needed before implementation. It does not rename or sort-relabel members.

**Before**

> and strictly ordered axial coordinates

$$
\xi_1<\xi_2<\cdots<\xi_{12}.
$$

> The adjacent spacings and total train length are

$$
d_m=\xi_{m+1}-\xi_m>0,\qquad m\in\{1,\ldots,11\}
$$

**Proposed after**

> Each persistent member index $m$ carries its own axial coordinate $\xi_m\in\mathbb R$. Equal axial coordinates are allowed: different members can lie at the same height while having different transverse positions. To describe the axial spacing, choose an auxiliary ordering permutation $\sigma$ with

$$
\xi_{\sigma(1)}\leq\xi_{\sigma(2)}\leq\cdots\leq\xi_{\sigma(12)}.
$$

> This ordering does not change persistent identities, binary partners or component membership. Ties can be resolved in any declared order because they contribute zero spacing. Define

$$
d_j=\xi_{\sigma(j+1)}-\xi_{\sigma(j)}\geq0,\qquad j\in\{1,\ldots,11\},
$$

$$
L_C=\xi_{\sigma(12)}-\xi_{\sigma(1)}=\sum_{j=1}^{11}d_j.
$$

**Dependent spacing prose — before**

> is a primary two-component circular coordinate because it changes the exact causal delays between architrino worldlines. A common shift of every $\xi_m$ is absorbed into the assembly center and does not create a thirteenth axial coordinate.

**Proposed after**

> describes the ordered axial separations. The permutation assigning these positions to persistent members remains part of the coordinate record: spacings alone do not identify which members occupy which heights. Changing the member-resolved axial positions changes the exact causal delays. A common shift of every $\xi_m$ is absorbed into the assembly center and does not create a thirteenth axial coordinate.

**Circulation subsets — before**

> The counter-rotating coincident-center two-component circular configuration declares the two ordered index subsets

$$
\mathcal I_1=\{1,\ldots,6\},\qquad\mathcal I_2=\{7,\ldots,12\}
$$

**Proposed after**

> The counter-rotating coincident-center two-component circular configuration declares two disjoint six-member circulation subsets of the persistent indices,

$$
\mathcal I_1\mathbin{\dot\cup}\mathcal I_2=\{1,\ldots,12\},\qquad |\mathcal I_1|=|\mathcal I_2|=6.
$$

> Their membership is independent of height ordering; a subset need not occupy the lower or upper six positions.

Retain the following $q_m=\pm q_C$ equations and the statement that the subsets alone do not establish complete coincident-axis components. Replace “full ordered-spacing” in the co-rotating paragraph with “full member-resolved axial-position” so it does not reintroduce identity-by-sort.

**Coaxial endpoint mapping — before**

> Each component separately satisfies the complete coincident-axis three-binary common-midpoint, common-axis, common-frequency, common-circulation, antipodality, and polarity-conjugacy relations. The source record declares the bijection between these twelve endpoint labels and the persistent two-component circular indices $m$.

**Proposed after**

> Each component separately satisfies the complete coincident-axis three-binary common-midpoint, common-axis, common-frequency, common-circulation, antipodality, and polarity-conjugacy relations. The source record declares the bijection between these twelve endpoint labels and the persistent two-component circular indices $m$. In the counter-rotating case, the six endpoints of component 1 form $\mathcal I_1$ and those of component 2 form $\mathcal I_2$. These memberships remain fixed when their axial positions interleave. Setting every $h_{ba}=0$ places all six endpoints of a component at one height and gives the planar restriction without changing any identity or membership.

All worldline, pairing, center-separation and causal-delay equations remain as written. A noninterleaving restriction is not inferred from $d_C>0$; if separately selected, it requires $d_C>\max_a|h_{1a}|+\max_a|h_{2a}|$. This inequality separates the two components in height but does not prevent equal heights within either component. Thus it cannot by itself restore the original strict twelve-height chart.

## 4. Accepted planar results and their spatial summary

These are documentary propagation proposals based on the live [BP-011 subordinate queue](../../master-equation-closure/braid-program/campaigns/planar-three-binary-work-queue.md#accepted-foundation), the [global-tail theorem](../../master-equation-closure/braid-program/evidence/2026-09-02-planar-three-binary-global-tail-calculus-reduction.md), and the [axial-speed certificate](../../master-equation-closure/braid-program/evidence/2026-09-01-planar-three-binary-axial-translation-speed-chart.md). These links document proposal provenance; they are not part of the proposed corpus text. The owner still records the results as accepted/completed. Their historical numerical certificates were inspected, not rerun.

### 4a. Infinite equal-radius ladder

Source: Planar Braid Assemblies, lines 7, 356–358 and 547.

**Before**

> Above speed 20, the accepted rows establish existence but not interval-by-interval completeness.

> The solution list is not a zero-count theorem, completeness above $\beta_f=20$ remains open, and existence still says nothing about release, retention, binding, stability, a physical spectrum, or scientific acceptance.

**Proposed after**

> On the prescribed equal-radius, regular-phase, common-center, common-circulation chart, the finite interval certificate through T200 and a uniform theorem for all later ordinary cells establish the complete infinite balance ladder: exactly one simple inward-radial balance in every even cell T02, T04, and onward, and none in T00 or any odd cell. This is a computer-assisted derived zero census. The arbitrary-precision list supplies coordinate estimates for its first one hundred members; that list alone is not the completeness proof. The result establishes no formation, perturbation stability, binding or physical energy spectrum.

Replace the obsolete remaining-completeness paragraph at line 358 with this explanation of the later result:

> Completeness beyond the finite census follows by separating the old-root background from the newborn fold pair. An outward-rounded bound keeps the old-root background above $1.43$ throughout each post-T200 cell, while the newborn contribution at the right edge is below $0.01$. A uniform derivative comparison excludes additional crossings. Combined with the fold signs, these bounds give no zero in odd cells and exactly one simple zero in even cells. The argument is uniform in the cell index; extending the pointwise numerical list would not supply that conclusion.

Dependent reconciliation: use the same bounded theorem in the introduction, common-angular-speed status row, line 305's “only the interval certificate below” sentence, line 547's mode summary and the conclusion at line 860. Retain the older instruments' measured grades and their true statement that they alone do not prove completeness. At line 547 replace “The arbitrary-precision continuation supplies accepted members through $n=100$, while completeness above speed 20 remains open” with “The arbitrary-precision continuation supplies coordinate estimates through $n=100$; the finite interval certificate through T200 and the uniform tail theorem establish completeness for all ordinary cells.” At line 569 keep the unrelated bounded polarity-word negatives bounded.

### 4b. Nearby-history uniqueness

Source: Planar Braid Assemblies, line 848.

**Before**

> The stronger statement that one supplied past-only history admits no other future requires a local well-posedness and uniqueness theorem for the state-dependent delayed history problem on the same complete-simple-root chart; that uniqueness theorem remains an explicit closure target. Perturbation stability is a further and separate question. An exact circle exists and repeats. What remains unproved is that every sufficiently exact numerical release must select only that continuation and that a slightly disturbed circle returns rather than departing.

**Proposed after**

> A separate local history-flow theorem establishes existence, uniqueness and continuous dependence on $0\leq T\leq0.05$ for a nonzero $W^{2,\infty}$ neighborhood of the exact T04 retained history, while the same complete 72-root chart and its positive delay, separation and transmitter-factor bounds remain valid. Here $W^{2,\infty}$ controls the history together with its first two weak derivatives. The neighborhood radius exists but has not been numerically enclosed. Within this neighborhood, the exact past selects the exact circle over the stated interval. This theorem does not certify a rounded numerical input as lying in that neighborhood, an EOM-solver trajectory through a complete cycle, or return after a perturbation. Perturbation stability remains a separate question.

The retained-prehistory status row and conclusion must say that short-time local history flow is established at this scope, while full-cycle numerical reproduction and return-map stability remain open. Keep the historical release-prefix measurements unchanged.

### 4c. Local phase and radius isolation

Source: Planar Braid Assemblies, line 569.

**Before**

> The dedicated equal-radius antipodal-neutral planar common-center three-binary chart phase search found the regular hexagon and left unequal phases unresolved. The velocity search above held those regular phases fixed. Unequal planar common-center three-binary chart radii were not searched.

**Proposed after**

> The earlier phase search found the regular hexagon without establishing a multidimensional census. Separate interval certificates now establish local isolation of T04 within the antipodal-neutral, common-center, common-circulation planar chart. Write $\delta_2,\delta_3$ for the two phase departures from regular spacing, and $r_2=R_2/R_1$, $r_3=R_3/R_1$ for the independent radius ratios. At equal radii, T04 is the unique full-vector balance when each of $|\delta_2|$, $|\delta_3|$ and $|\beta_f-\beta_{\mathrm{T04}}|$ is at most $9\times10^{-6}$. At regular phases, the corresponding bound on each of $|r_2-1|$, $|r_3-1|$ and $|\beta_f-\beta_{\mathrm{T04}}|$ gives the same uniqueness result. Allowing all five coordinates to vary together, uniqueness holds when every departure is at most $10^{-6}$. These are computer-assisted derived local zero censuses, with all 72 causal roots preserved. They do not exclude wider or disconnected phase-radius branches, nor establish dynamical stability.

The fixed-relative-phase and independent-radius status rows must summarize these local boxes and reserve broader-domain searches as open; the general nonuniform phase search retains its original measured scope. The concluding broad-geometric-closure paragraph must distinguish wider/disconnected domains from these completed local results.

### 4d. Bounded axial-speed result in both chapters

Source: Spatial Braid Assemblies, line 311. The Planar center-translation status row repeats the same stale boundary.

**Before**

> Other axial speeds and broader unequal-radius or phase-deformed charts remain open. The cited control rejects one declared translated planar chart, not axial translation for every coincident-axis configuration.

**Proposed after**

> A separate computer-assisted result excludes nonzero axial translation for the eighteen stationary branches T02 through T36 on $-0.9\leq u=s_{\mathrm{grp}}/c_f\leq0.9$, with $c_f=1$, within the equal-radius, regular-phase, common-circulation prescribed screw-path chart. The reduction gives an axial residual $\mathcal R_z(u)=uS(b_n)$, where $b_n$ is the corresponding stationary balance speed and $S(b_n)$ is its signed axial weight. Interval evaluation establishes $S(b_n)<0$ for each of these eighteen branches, so the residual vanishes only at $u=0$. Higher topology branches, speed domains outside this interval, unequal radii, deformed phases and non-axial translation retain separate obligations. This result does not exclude axial translation for every coincident-axis configuration.

Retain the fixed-$0.1c_f$ study as a worked special case and preserve its original certificate scope. The Planar chapter needs this theorem and reduction immediately after that study, with its center-translation status row and final geometric-scope summary reconciled. The spatial summary can then be shortened to the bounded statement and its existing relative link to the Planar chapter; the full derivation need not be duplicated.

## Implementation boundaries and evidence

The coordinate proposal is not a one-sentence substitution: its dependent ordering, spacing, circulation-subset and endpoint-mapping edits must travel together. The status proposal likewise requires the introduction, coordinate-status table and conclusion to agree with the theorem passages. No source payload, identity, runtime contract or historical certificate is authorized for modification by this proposal.

Direct source reads and the BP-011 Accepted Foundation/Completed sections establish the documentary discrepancies. Elementary affine-span and component-height witnesses in the original review receipts establish group 3 independently; the speed residual's nonvanishing follows from its recorded strict signed weight. The proposed status wording reuses the accepted certificates and does not recertify them. Withdrawal of an accepted result, a mismatched chart hypothesis or a valid counterexample to its recorded proof would require revising group 4 before implementation.

## October 3 implementation disposition

✓ The operator accepted the remaining scoped replacements in this proposal through the six-group batch. They are implemented and separately verified in the [closure receipt](../evidence/ops-031-six-group-closure-2026-10-03.md). The proposal wording above remains historical preparation evidence; no remaining implementation approval is needed for this batch. Separate scientific and optional follow-ups retain their recorded scope.
