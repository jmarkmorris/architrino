# Horizon Chirality and Planar Spin

This chapter studies one narrow theory question: how the Noether-core `pro/anti` distinction should be understood as a tri-binary approaches the planar horizon state. For this note we set aside bookkeeping questions and focus on geometry, orbit direction, and the reduction from a 3D precessing scaffold to a planar exterior view.

The guiding problem is simple. In ordinary low-stress conditions, the tri-binary is a fully 3D object with ordered binary roles and precession structure. At the event horizon, the same assembly is driven toward coplanarity and alignment. The question is whether `pro/anti` remains directly visible in that planar state or whether only a reduced exterior spin pattern survives.

## Canonical Horizon Condition

The canonical horizon condition is inherited from [singularity-resolution.md](./singularity-resolution.md) and [black-holes.md](./black-holes.md). Near the horizon interface, the working regime is

$$
v_M = c_f,
\qquad
v_O \to c_f,
$$

with the middle and outer binaries becoming coplanar and co-linear with the inner binary at alignment and precession ceasing in that limit.

This chapter does not alter that constitutive rule. It asks what chirality information can still be distinguished once the tri-binary has been compressed into that planar boundary-like state.

## Pro/Anti Before Planar Lock

Away from the horizon, the project already treats `pro/anti` as a handedness or ordering property of the 3D tri-binary scaffold rather than as a net-charge distinction. The standard working convention appears in [spacetime-assemblies.md](spacetime-assemblies.md) and [../assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md):

- `pro`: $H \to M \to L$ ordering in time;
- `anti`: $H \to L \to M$ ordering in time.

That distinction is natural in the ordinary tri-binary because the three binaries occupy non-coplanar planes with an ordered set of normals and a genuine precession structure. In that regime, `pro/anti` is a 3D chirality datum.

The strongest current mathematical candidate beneath that datum comes from [causal-action-functional.md](../dynamics/causal-action-functional.md): the causal writhe

$$
Wr_c[\gamma] = \iint_{\mathcal{L}_{\text{causal}}}
\mathrm{sign}\!\big(\mathbf{v}(t)\times\mathbf{v}(t')\cdot\mathbf{r}\big)\,d\tau
$$

is a signed measure of handedness for the self-interaction pattern, and the same chapter states that changing $Wr_c$ requires tearing the causal locus. So the cleanest current reading is:

- the surface convention for `pro/anti` remains the ordered `HML/HLM` tri-binary distinction;
- the best current formalization candidate is a topological branch label carried by the causal locus, with $Wr_c$ as the leading chirality measure.

The horizon state is different. Once the planes collapse into one planar lock and precession ceases, some of the ordinary 3D chirality data are suppressed. That makes it plausible that the horizon exposes only a reduced exterior signature of the deeper `pro/anti` distinction.

## Broader Pro/Anti Balance in $\mathbb{A}\mathbb{A}\mathbb{A}$

This chapter should also be read against a broader guardrail from the project framing: $\mathbb{A}\mathbb{A}\mathbb{A}$ does **not** naturally suggest a large universal pro/anti imbalance in the substrate as a whole. The medium picture is instead built around persistent local or mesoscopic balance between complementary Noether-core orientations.

Several standing examples point in that direction.

- **Noether Sea / spacetime medium:** the ambient medium is already framed as a coupled pro/anti population rather than a single-sign sea.
- **Photon channel:** the photon assembly is naturally read as a coaxial contra-rotating pro/anti planar pair, or equivalently one `CW` and one `CCW` planar branch in the flat state as an absolute-frame observer compares the two sides of the propagating pair.
- **Higgs-like cluster:** the standing cluster intuition remains a $2+2$ object, with two pro and two anti cores in a three-dimensional coupled state rather than a single-sign configuration.

So when this note isolates `pro/anti`, it is **not** doing so because the larger ontology is expected to drift into a globally pro-dominant or anti-dominant universe. It is doing so because the horizon problem compresses the core strongly enough that the binary branch structure becomes especially visible.

The matter sector then becomes the special case. In the current intuition, what we call ordinary matter may be the regime where pro-core and anti-core encounters act as a kind of geometric can-opener for one another, making fast reconfiguration channels available. In that reading, the standard word "annihilation" is too blunt. The deeper process is a **reaction** or **reconfiguration event** in which the coupled structures open, exchange, and re-express their content through new channels rather than vanishing into nothing.

That broader matter/reaction thesis deserves its own dedicated treatment elsewhere. Inside this chapter, its role is narrower: it reminds us that horizon chirality should be developed inside a theory that is broadly pro/anti balanced, with the dramatic visible asymmetries appearing only in certain reaction channels or assembly sectors.

## Working Dictionary

To keep terms from sliding into one another, use the following provisional dictionary throughout this chapter:

| Label | Meaning in this note | Typical regime |
| --- | --- | --- |
| `pro/anti` | the deeper 3D Noether-core chirality, currently tracked by ordered tri-binary structure such as `HML` versus `HLM` | pre-planar 3D core |
| `CW/CCW` | the exterior planar angular-momentum sign seen from one chosen viewing side of a planarized core | horizon / planar lock |
| `left/right` | a possible axial sign relative to translation, for example $\hat J_{\text{net}} \parallel \pm \hat{\mathbf V}$, if that later proves to control forward exposure of the weak-active structure | high-velocity aligned regime |

This chapter treats these as related but not yet identical labels. One of its main goals is to understand how they may collapse onto one another in the terminal high-velocity regime.

## Comparison Across Sectors

The horizon question becomes clearer when compared against the main assembly sectors already present in the theory.

| Sector | Pro/anti organization | Dimensional character | Why it matters here |
| --- | --- | --- | --- |
| Noether Sea | broadly balanced pro/anti medium | mainly 3D distributed medium | background reminder that AAA does not predict a large universal imbalance |
| Photon channel | coaxial contra-rotating pro/anti planar pair | planar / propagating pair | shows that opposite branch pairing is natural in flat planar states |
| Higgs-like cluster | `2+2` pro/anti cluster | 3D coupled cluster | shows balanced multi-core organization without collapsing to one sign |
| Ordinary matter reaction channels | pro/anti encounters can open rapid reconfiguration channels | mixed 3D and reaction geometry | the place where asymmetry becomes dynamically important rather than globally dominant |

This comparison helps keep the horizon problem honest. The goal is not to prove that the universe is mostly pro or mostly anti. The goal is to understand how one compressed tri-binary advertises its branch structure when driven into the strongest alignment regime.

## Exterior Planar Angular-Momentum Basis

Fix one exterior viewing direction normal to the horizon disk. From that viewpoint, each planar binary appears to rotate either clockwise (`CW`) or counterclockwise (`CCW`). If the three binaries remain distinguishable by role as `H`, `M`, and `L`, then the full planar angular-momentum sign space contains exactly $2^3 = 8$ possibilities.

| Row | H | M | L | Class | Comment |
| --- | --- | --- | --- | --- | --- |
| 1 | `CW` | `CW` | `CW` | uniform | clean common-sign lock |
| 2 | `CW` | `CW` | `CCW` | mixed |  |
| 3 | `CW` | `CCW` | `CW` | mixed |  |
| 4 | `CW` | `CCW` | `CCW` | mixed |  |
| 5 | `CCW` | `CW` | `CW` | mixed |  |
| 6 | `CCW` | `CW` | `CCW` | mixed |  |
| 7 | `CCW` | `CCW` | `CW` | mixed |  |
| 8 | `CCW` | `CCW` | `CCW` | uniform | clean common-sign lock |

This is the complete planar-sign table as viewed from one fixed exterior side of the black-hole horizon. Reversing the viewing side flips `CW` and `CCW`, so the table should always be read relative to a chosen exterior normal.

## Observer Views

The planar angular-momentum table is viewpoint dependent in a controlled way.

- **Absolute-frame exterior observer:** fixes one normal to the planar disk and reads the visible planar circulation as `CW` or `CCW`.
- **Observer on the opposite side of the same disk:** reverses the normal and therefore swaps `CW` with `CCW`.
- **Co-moving or assembly-built observer:** may not have direct access to the absolute normal choice and instead infer only relative handedness, exposure, or wake asymmetry.

So the physically stronger datum is not the literal word `CW` or `CCW` by itself. It is the sign of the planar angular momentum relative to a chosen normal. In standard quantum language, helicity is an angular-momentum projection onto the momentum or propagation axis, usually the projection of spin for an elementary particle. The horizon quantity here is therefore a **boundary helicity proxy**: it becomes helicity-like only when the chosen exterior normal is dynamically tied to a propagation or translation axis.

This is also the right place to keep the substrate/effective split explicit: the substrate dynamics know about absolute path histories, delayed branch intersections, and topological branch labels. Observer-level helicity is a **dimensional reduction** of that deeper structure, not a primitive substrate variable, and boundary helicity should not be silently identified with weak-interaction chirality.

## Boundary Helicity Versus Deeper Chirality

The table above does not by itself prove that all eight rows are equally meaningful as horizon identities.

The simplest exterior quantity is the sign of the common planar angular momentum when all three binaries share one rotation sense. That sign is a boundary-visible two-way distinction:

- all-`CW`;
- all-`CCW`.

This chapter will call that reduced exterior quantity **boundary helicity**: the horizon-local sign of common planar angular momentum relative to a chosen normal. The term is deliberately narrower than standard helicity until the normal is identified with the relevant propagation or translation direction.

The deeper `pro/anti` distinction is plausibly stronger than boundary helicity alone. In the 3D scaffold, `pro/anti` tracks ordered tri-binary chirality, not merely the sign of one visible planar swirl. Once the horizon suppresses precession and forces coplanarity, two different 3D histories may collapse to the same exterior planar sign.

That motivates the following working distinction:

- **Boundary helicity:** the visible sign of the common planar angular momentum at the horizon, measured relative to a chosen normal.
- **Core chirality:** the deeper `pro/anti` distinction inherited from the ordered 3D tri-binary before flattening.

If this distinction is correct, then the horizon does not necessarily erase `pro/anti`, but it may compress it so strongly that the exterior observer sees only a reduced proxy.

## Translation-Axis Alignment at High Velocity

The next question is whether a rapidly translating tri-binary should drive the three orbital angular-momentum vectors toward the translation axis itself.

The answer is dynamical rather than purely kinematic. Straight-line translation does **not** require that result merely from conservation laws. In the path-history dynamics, total linear momentum and total angular momentum are distinct conserved quantities, so an isolated translating assembly may in principle carry internal angular momentum whose axis is not parallel to the center-of-mass velocity.

The stronger argument comes from the high-velocity delay geometry. Let the translation direction define the $z$-axis and use the oblate envelope from [Noether Core Geometry](../assemblies/noether-core-geometry.md) and its dynamics treatment in [Tri-Binary Dynamics](../dynamics/tri-binary-dynamics.md):

$$
\frac{x^2+y^2}{R_\perp^2} + \frac{z^2}{R_\parallel^2} = 1,
\qquad
R_\parallel = \frac{R_\perp}{\gamma},
\qquad
\gamma = \frac{1}{\sqrt{1-\beta^2}},
\qquad
\beta = \frac{v_{\text{trans}}}{c_f}.
$$

Now let one binary orbit in a plane whose unit normal $\hat n$ makes angle $\alpha$ with the translation axis $\hat z$. The central cross-section of the ellipsoid cut by that orbital plane has area

$$
A(\alpha)
=
\frac{\pi R_\perp^2 R_\parallel}
{\sqrt{R_\perp^2\sin^2\alpha + R_\parallel^2\cos^2\alpha}}
=
\frac{\pi R_\perp^2}
{\sqrt{\gamma^2\sin^2\alpha + \cos^2\alpha}}.
$$

This area is maximal at $\alpha = 0$ or $\alpha = \pi$, meaning the orbital normal is parallel or antiparallel to the line of translation. It is minimal at $\alpha = \pi/2$, when the orbital normal is transverse to the motion.

So the delayed geometry creates a real high-speed bias:

- planes with normals parallel or antiparallel to the line of translation inherit the largest available cross-section;
- tilted planes suffer stronger anisotropic squeezing;
- the penalty for tilt grows with $\gamma$.

For small tilt,

$$
A(\alpha)
\approx
\pi R_\perp^2
\left[
1-\frac{\gamma^2-1}{2}\alpha^2
\right],
$$

so the restoring pressure toward axial alignment strengthens as $v_{\text{trans}} \to c_f$.

This gives a precise version of the intuition: a high-velocity tri-binary should be driven toward a state in which the three orbital angular-momentum vectors are **coaxial with the line of translation**, not because momentum conservation alone demands it, but because delayed closure becomes least frustrated there.

## Exact Conservation Versus Dynamical Selection

This distinction is important enough to state plainly.

- **Exact conserved quantities:** the dynamics preserve total momentum and total angular momentum through substrate translation and rotation symmetry.
- **Topological branch data:** writhe and winding-class labels of the causal locus are not ordinary Noether charges, but they are robust branch labels that change only through reconnection or tearing events.
- **Dynamical selection:** alignment of the net orbital axis with the translation direction is neither a new conserved quantity nor a kinematic identity. It is a high-velocity attractor selected by the anisotropic delayed geometry.

In symmetry language, the ambient substrate begins with the full spatial isotropy of $SO(3)$. A fast translating assembly supplies a distinguished direction $\hat{\mathbf V}$ and therefore selects a reduced effective symmetry around that axis, schematically $SO(3)\to SO(2)$, with the remaining planar phase behaving in the aligned limit like a $U(1)$-type degree of freedom. The near-horizon planar lock should therefore be read as a **symmetry-broken dynamical branch** of the underlying theory, not as a new exact conservation law.

## State-Transition Ladder

The emerging picture is easier to reason about if written as a shape-and-label ladder:

$$
\text{3D precessing core}
\;\to\;
\text{oblate translating core}
\;\to\;
\text{axialized high-}v\text{ core}
\;\to\;
\text{planar horizon lock}
\;\to\;
\text{post-lock reconfiguration or reopening}.
$$

The intended label flow along that ladder is:

1. In the ordinary 3D regime, `pro/anti` is carried by ordered tri-binary chirality.
2. Under high translation speed, the orbital normals are biased toward the translation axis.
3. Near the terminal aligned state, the surviving branch data may reduce to the sign of the common axial orientation and then to the sign of the visible planar helicity.
4. After passage through the lock, the core may either preserve that branch, re-expand with the same handed history, or undergo a deeper reconfiguration if the planar degeneracy is strong enough.

This ladder is still a working map, not a completed derivation. Its value is organizational: it shows where the theory expects information to be compressed, preserved, or potentially switched.

## Canonical Horizon Branch Hypothesis

The most conservative horizon hypothesis is that the stable terminal branches are the two uniform planar rows:

- Row 1: `H = M = L = CW`;
- Row 8: `H = M = L = CCW`.

These are the cleanest candidates for the two horizon-level branches that an exterior observer could identify. In that reading, the horizon presents a binary choice of common-sign planar lock.

The six mixed rows should be treated more cautiously. At present they are best read as candidate:

- transitional states during flattening;
- frustrated planar states that still carry unresolved internal shear;
- or short-lived reconfiguration states rather than canonical terminal locks.

This is only a working hypothesis. The current theory does not yet derive that mixed-sign planar states are forbidden. It says only that the two uniform rows are the strongest candidates for stable horizon identities, while the mixed rows appear less natural as endpoint states.

Under the translation-axis argument above, those two rows can be restated more sharply: in the terminal branch the three orbital normals are expected to become coaxial with $\pm \hat{\mathbf V}$, where $\hat{\mathbf V}$ is the unit translation direction. The remaining binary choice is then the sign of the common axial spin.

## Candidate Theories for Pro and Anti at the Horizon

Two main theories are available.

### Theory A: direct planar identification

In the strongest reduction, `pro/anti` at the horizon is simply identified with the two uniform planar states:

- `pro` = all-`CW`,
- `anti` = all-`CCW`,

or the reverse, depending on the chosen sign convention.

This theory is attractive because it makes the horizon classification maximally simple and directly observable from outside.

### Theory B: history-lifted horizon identification

In the more cautious reduction, the two uniform planar states are still the visible horizon branches, but `pro/anti` is not exhausted by the observed `CW/CCW` sign. Instead:

- the uniform planar sign is the **visible boundary marker**;
- the deeper `pro/anti` label still refers to the ordered 3D chirality from which the planar state was reached.

On this reading, the horizon preserves only a compressed image of the deeper tri-binary chirality. The exterior observer sees the branch, but not necessarily the full internal ordering history.

At present, Theory B is the stronger conceptual fit with the existing 3D `HML/HLM` framing, because that framing is richer than a single planar spin sign.

## Possible Left/Right Spin Mapping

The translation-axis picture opens one further possibility. If the terminal high-velocity attractor really forces the common orbital axis onto the line of translation, then the two axial branches

$$
\hat J_{\text{net}} \parallel +\hat{\mathbf V},
\qquad
\hat J_{\text{net}} \parallel -\hat{\mathbf V}
$$

are natural candidates for a left/right or helicity-like pair.

That does **not** automatically make them identical to weak-interaction chirality. The current canon already uses left/right language operationally in terms of whether the weak-coupling triad is exposed or hidden relative to motion and wake geometry. Still, the axial-lock picture suggests a possible underlying bridge:

- the high-velocity core first selects one of the two axial branches $\pm \hat{\mathbf V}$;
- that branch then influences which side of the axial structure is forward-exposed versus wake-hidden;
- the observer-level left/right distinction may therefore descend from the sign choice of the common axial angular momentum in the translating aligned state.

In that reading, the horizon or near-horizon limit does not merely present two boundary-helicity states. It may also reveal the deepest geometric ancestor of a left/right spin distinction:

- `right-like`: net core axis aligned with translation;
- `left-like`: net core axis anti-aligned with translation;

or the reverse, depending on the eventual sign convention.

This should remain a live hypothesis rather than a settled identification. The safe claim is only that the high-velocity math strongly favors **axialization** of the tri-binary angular-momentum vectors along the line of translation, and that the surviving sign choice is exactly the kind of binary datum that could later map onto a left/right spin label.

## Status Table

The current chapter mixes canonical inputs with stronger and weaker hypotheses. The distinction should stay explicit.

| Claim | Status |
| --- | --- |
| horizon lock drives the tri-binary toward coplanarity and suppresses precession | canonical in current project framing |
| `pro/anti` is a deeper 3D core-chirality label rather than a net-charge label | canonical working convention |
| `Wr_c` and causal-locus topology supply the best current formalization candidate for that chirality | strong structural candidate, not yet sole canonical definition |
| the planar exterior sign space has 8 rows for labeled `H/M/L` binaries | exact combinatorial statement |
| high translation speed biases orbital normals toward the translation axis | strong geometric argument in this chapter |
| the two uniform planar rows are the most likely stable terminal horizon branches | strong working hypothesis |
| the six mixed rows are transitional or frustrated rather than stable endpoint states | plausible but still open |
| the axial sign $\hat J_{\text{net}} \parallel \pm \hat{\mathbf V}$ underlies a left/right spin distinction | live speculative hypothesis |
| `pro/anti`, `CW/CCW`, and `left/right` all become the same label in the terminal regime | not yet established |

## Mixed-Sign Planar States

If mixed-sign rows are admitted at all, then the horizon theory becomes more complicated than a simple two-branch picture. Rows 2 through 7 would imply that the three binaries can remain role-distinct in the planar lock while not sharing a common in-plane circulation.

That possibility raises three immediate questions:

1. Are mixed-sign rows dynamically stable, or do they relax toward a common-sign lock?
2. If they are stable, do they define additional horizon classes beyond `pro/anti`?
3. If they are unstable, are they the natural transition states through which a core passes while entering or leaving the horizon interface?

The present note favors the third reading: mixed-sign planar states are more naturally interpreted as transition or frustration states than as clean final branches. But this remains an open dynamics question rather than a closed derivation.

One reason for that preference is action-geometric rather than merely visual. In a strictly flattened disk, mixed-sign configurations plausibly generate stronger phase-slip and more severe branch competition, because not all tangential drives can cooperate in closing the delayed loop on one clean planar branch family. That does not yet amount to a theorem, but it points to the right criterion: mixed rows should be judged by whether they force larger Jacobian stress, larger cycle-to-cycle action variance, or repeated failure of singularity-free phase closure.

## Transition Rules for Pro/Anti Conversion

One of the biggest unresolved questions is whether a core can flip from `pro` to `anti` smoothly, or only through a more singular reconfiguration.

The current chapter points toward the second option. The likely possibilities are:

1. **No flip in ordinary smooth evolution:** away from the planar degeneracy, the ordered 3D core chirality appears robust and should survive adiabatic deformations.
2. **Near-degenerate branch switch at planar lock:** when the three planes collapse into one planar state, some 3D chirality data are compressed strongly enough that a branch change may become dynamically accessible.
3. **Full reconfiguration / reaction channel:** a deeper split, exchange, or reconstruction of the constituent binaries could permit a true $pro \leftrightarrow anti$ conversion.

This is exactly where the language of "annihilation" starts to look too weak. If a pro/anti encounter opens the core and allows branch-changing reconfiguration, the physical process is better described as a structured reaction than as disappearance.

The strongest current language from the dynamics stack is that true branch conversion should be associated with a **mode-lock event** or related non-perturbative reconfiguration, not with an adiabatic drift. If the branch label is indeed carried by the topology of the causal locus, then a smooth $pro \leftrightarrow anti$ conversion would require passage through a singular or near-singular reconnection stage rather than ordinary continuous motion.

Put differently: if branch-changing evolution forces an active delayed branch toward a Jacobian-null boundary, then the exact dynamics encounter the same kind of amplitude wall already familiar from the self-hit geometry. That is why smooth branch inversion should be treated as forbidden or at least highly non-generic in the exact theory. The expected route is instead a discrete mode-lock / reconnection event in which the old branch graph fails and a new one nucleates.

For now, the safest working rule is:

- smooth motion should preserve the deeper branch label;
- planar degeneracy may permit branch ambiguity;
- true branch conversion likely requires a reconfiguration event rather than a mild perturbation.

## Simulation Diagnostics

If this note is to become more than a conceptual sketch, the following diagnostics should be added to simulations of fast translating or horizon-adjacent tri-binaries:

- **Axis-alignment diagnostic:** track $\hat J_{\text{net}} \cdot \hat{\mathbf V}$ and test whether it tends toward $\pm 1$ as $v_{\text{trans}} \to c_f$.
- **Tilt decay diagnostic:** track each orbital-normal angle $\alpha_i$ to test whether non-axial states relax toward the translation axis with a rate that grows with $\gamma$.
- **Planar branch diagnostic:** once the planarity threshold is met, record which of the 8 planar sign rows the assembly occupies.
- **Mixed-row lifetime diagnostic:** test whether rows 2 through 7 are long-lived or short-lived compared with the two uniform rows.
- **Exposure diagnostic:** compare the sign of $\hat J_{\text{net}} \cdot \hat{\mathbf V}$ against forward exposure of the weak-active structure to test the left/right bridge hypothesis.
- **Branch persistence diagnostic:** drive a core into and back out of the planar regime and test whether the same deeper branch label is recovered after re-expansion.

## Provisional Conclusion

The full planar spin-sign space at the horizon has eight rows because each of the three labeled binaries can appear as either `CW` or `CCW` from a fixed exterior viewpoint. But the strongest current theory is that only two of those rows are good candidates for canonical horizon identities: the two uniform common-sign locks.

That yields a disciplined provisional picture:

- `pro/anti` in the ordinary tri-binary is a 3D chirality or ordering property;
- the horizon compresses the tri-binary into a planar state with a reduced exterior signature;
- the exterior planar state has eight logical spin permutations;
- the two uniform rows are the best candidates for stable horizon branches;
- the other six rows are most naturally read as transitional, frustrated, or unstable states unless future dynamics show otherwise.

## Interfaces to Other Chapters

- [singularity-resolution.md](./singularity-resolution.md): canonical horizon alignment condition.
- [black-holes.md](./black-holes.md): horizon interface and strong-field ontology.
- [tri-binary-dynamics.md](../dynamics/tri-binary-dynamics.md): regime map, planarity diagnostics, and alignment observables.
- [planck-scale-tri-binary-alignment.md](../theory-bridges/planck-scale-tri-binary-alignment.md): terminal planar lock and alignment-horizon interpretation.
- [angular-momentum-and-spin.md](../theory-bridges/angular-momentum-and-spin.md): shared proof ledger for promoting boundary-helicity proxy language into observer-level spin or helicity claims.
- [../assemblies/fermions/color-charge-su3.md](../assemblies/fermions/color-charge-su3.md): matter/antimatter chirality convention.
- [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md): ordered-triad and chirality language.
