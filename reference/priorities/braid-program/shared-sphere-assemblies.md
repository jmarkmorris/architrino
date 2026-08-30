# Shared-Sphere Assemblies

A shared-sphere assembly is a prescribed collection of architrinos whose worldlines remain on one common sphere: one fixed center, one radius, and every member at that radius for all time. The chart is the two-dimensional companion to [Shared-Circle Assemblies](../../../content/markdown/aaa/dynamics/shared-circle-assemblies.md), and it stands in the same relation to the braid taxonomy — a shared-sphere record becomes a named Noether-braid locus only when its member inventory, polarity pairing, centers, axes, frequencies, and circulation satisfy that braid's exact coordinate contract. Co-sphericity is an appearance. Taxonomy follows the coordinate record.

The classification matters because the braid program is already full of shared-sphere objects that were never collected under one name. Several taxonomy members are unconditionally co-spherical by declaration; many more become co-spherical on an exact sub-locus that the configuration chart does not currently carry as an axis; and the most heavily evaluated eight-member candidates sit either on the shared sphere or one scalar condition away from it. Gathering them exposes a pattern that no single campaign could see: **every unconditionally co-spherical object the program has evaluated has returned a negative**, and in the one case where the evolution was allowed to choose, it left the shared sphere immediately.

Plainly: this chapter is about assemblies whose members all sit at the same distance from one center. Many things the program already studies turn out to be exactly that, and so far the sphere has been a place where candidates fail rather than a place where they live.

## Document Status

- Owner: [Braid Program](priorities.md)
- Kind: classification chapter, chart definition, and screening record
- Status: in progress, unbooked, and not promoted. The chart, the taxonomy intersections, the evaluated inventory, and the Platonic discrete enumeration are written; the items under [Outstanding Work](#outstanding-work) are pending, and the Platonic corner is enumerated but unscreened. No registry entry, chart slice, candidate row, or evidence booking is claimed — see [Standing Dispositions](#standing-dispositions).
- Created: 2026-08-29
- Claim level: derived chart algebra and taxonomy intersections; one complete discrete enumeration with no dynamical content; cited measured results owned by their originating documents; explicitly marked inference and speculation. No screening result is claimed on any co-spherical configuration in this document.
- Scope: prescribed co-spherical configurations, their polarity words, their intersections with the braid taxonomy, and the screening results available on them
- Exclusions: no retained-branch, binding, stability, particle-identity, effective-mass, or formation claim; co-sphericity is prescribed geometry and is never supplied by the substrate

## The Shared-Sphere Chart

Choose a fixed center $\mathbf C$, a radius $R>0$, and $2N$ distinct members. The chart requires

$$\|\mathbf X_k(T)-\mathbf C\|=R\qquad\text{for all }k\text{ and all }T.$$

A balanced $N{:}N$ polarity word assigns $N$ sites each polarity, so $q_k\in\{+\epsilon,-\epsilon\}$ and $\sum_k q_k=0$, in the sense already canon for the shared circle. Compatible scale is reported as $R/R_*$ with $R_*=\kappa\epsilon^2/c_f^2$, and every numerical result uses normalized units with $c_f=1$. Global rotation about $\mathbf C$ and global polarity conjugation are gauge; reflection is a valid reduction only together with the applicable circulation reversal and only after that covariance is checked.

**The condition is on members, and only on members.** This has to be said at the definition rather than in a footnote, because an assembly can carry several distinguishable spheres at once and only one of them qualifies. `F6c` already documents the hazard in its own terms: its four track centers lie on a track-center circumsphere of radius $|h_\sigma|$, while the complete circular tracks lie on the generally larger orbit spherical envelope of radius $\sqrt{h_\sigma^2+\rho_\sigma^2}$, and the two coincide only when $\rho_\sigma=0$. A configuration whose *track centers* are co-spherical, or whose centers form a regular polyhedron, is not thereby a shared-sphere assembly. Only $\|\mathbf X_k(T)-\mathbf C\|=R$ on the architrino worldlines admits a record to this chart.

Plainly: the moving architrinos have to be on the sphere. It is not enough that the centers of their orbits are, and mistaking one for the other is the easiest way to think a candidate belongs here when it does not.

The shared circle is the degenerate case. Any circle lies on a sphere, so every shared-circle record is a shared-sphere record whose members happen to be coplanar with the center. The converse fails, and the way it fails is the whole content of this chapter.

**[derived; latitude-dependent speed]** This is the structural difference between the two charts, and it is not cosmetic. Under rigid co-rotation about an axis $\hat{\mathbf n}$ through $\mathbf C$ at rate $\Omega$, a member at colatitude $\theta_k$ from that axis sits at distance $\rho_k=R\sin\theta_k$ from the rotation axis, so its speed coordinate is

$$\beta_{f,k}=\frac{|\Omega|R\sin\theta_k}{c_f}=\beta_f^{\mathrm{eq}}\sin\theta_k,\qquad \beta_f^{\mathrm{eq}}\equiv\frac{|\Omega|R}{c_f}.$$

The shared circle carries **one** speed coordinate and can therefore be searched by solving a single scalar balance condition $a_t(\beta_f)=0$. A rigidly co-rotating shared sphere carries a **family** of speed coordinates indexed by latitude, spanning $0$ at the poles to $\beta_f^{\mathrm{eq}}$ at the equator. No single speed can be imposed across a nondegenerate co-spherical arrangement, and the certified shared-circle velocity ladder does not lift.

Plainly: on a spinning circle every member moves at the same speed, so one number describes the motion. On a spinning sphere members near the poles move slowly and members near the equator move fast, so one number never suffices. That single fact separates the two chapters and is why shared-circle results cannot simply be carried over.

Two immediate corollaries fall out. Setting $\theta_k=\pi/2$ for every member recovers the single-speed case and reduces the chart to the shared circle, which is exactly why the equal-radius `B1.3` locus is a shared *circle* rather than a nondegenerate shared sphere. Setting $\theta_k\in\{0,\pi\}$ for every member sends every speed to zero and collapses the arrangement onto two points, which is exactly why the deprecated all-axial `B1.4` boundary cannot be a nondegenerate shared sphere at equal radii.

### Sub-charts

**Rigid co-rotating shared sphere.** One axis, one rate, fixed colatitudes, fixed relative longitudes. Every pair distance is constant. This is the screening default and the sub-chart on which the existing negatives were booked.

**Sector-partitioned shared sphere.** Members are partitioned into groups with independent cadences or independent breathing histories, subject to the common-radius condition being maintained along the history rather than at one instant. This sub-chart is what `F6c` occupies when its two orbit-envelope radii are held equal, and it is the only route by which a shared sphere survives contact with an independently evolving polarity sector.

A third possibility — a frozen arrangement with no internal motion, translating rigidly at constant group velocity — is *not* a sub-chart of this classification. It is the corpus's deliberately restricted negative control, its members do not orbit, and nothing in this chapter is evaluated on it. See [Part III](#part-iii--the-platonic-corner) for why that control cannot stand in for a co-spherical screen.

## The Sphere Is Not Supplied By The Substrate

Before any member of this classification is taken seriously, one obligation has to be stated, because the chart's convenience actively conceals it.

**[derived; constraint-acceleration warning]** Imposing $\|\mathbf X_k(T)-\mathbf C\|=R$ requires a normal acceleration that the bare Master Equation does not supply. A prescribed co-spherical history is a *declaration*, not a solution; the residual it must discharge includes the radial component that holds each member on the sphere, and nothing in the substrate offers a constraint acceleration to pay for it. [Neutral Six-Point Balance and A2 Rotation](neutral-six-point-balance-and-a2-rotation.md) records this directly in its externally-constrained-spherical-motion section, and every claim in this chapter inherits it.

Plainly: writing down a sphere and putting architrinos on it does not make them stay there. The sphere is a description of a candidate motion, and the candidate has to earn it from the acceleration law like anything else.

This is why co-sphericity is a screening slice rather than a structural hypothesis, and why a positive result anywhere in this chapter would produce a candidate and nothing more. Screening can rule out; only evolution can rule in.

## Exact Taxonomy Intersections

For a Family-A or Family-B member with all three binary midpoints at the braid center, both endpoints of binary $a$ sit at distance exactly $R_a$ from that center and are antipodal on that sphere. The co-sphericity test therefore collapses to the single scalar condition $R_1=R_2=R_3$. Note carefully what is *not* required: the axial half-separations $h_a$ and transverse orbit radii $\rho_a$ may still differ per binary, since only $h_a^2+\rho_a^2$ is constrained. Different binaries may sit at different latitudes on the same sphere.

**[derived; classification table]**

| Member | Co-spherical | Exact condition |
|---|---|---|
| `A1.2`, `A3.2` | unconditional | common $R$ declared in the member contract |
| `A2` | unconditional | common $R$, $h$, $\rho$; three small circles at $\pm h$ |
| `A1`, `A1.1`, `A1.3`, `A1.4`, `A3`, `A3.1`, `A3.3`, `A3.4` | sub-locus | $R_1=R_2=R_3$ |
| `B1`, `B1.1`, `B1.2` | sub-locus | $R_1=R_2=R_3$, with $h_a^2+\rho_a^2$ equal across binaries |
| `B1.3` | degenerate sub-locus | $R_1=R_2=R_3$ with $h_a=0$ collapses to the shared **circle** |
| `B1.4` (deprecated) | barred | equal radii with $\rho_a=0$ produce coordinate coincidence at $\pm R\hat{\mathbf n}_B$ |
| `C1`, `C2` | sub-locus | $\exists\,\zeta,R$ with $(\xi_m-\zeta)^2+\rho_m^2=R^2$ for all twelve worldlines, center on $\hat{\mathbf n}_C$ |
| `C3`, `C4` | constrained sub-locus | component centers are separated by $d_C>0$, so at most one component center can be the sphere center and the other component must be all-equatorial |
| `C5`, `C6` | sub-locus | equal radii *within* each component; the two components need not share a radius |

**[inference; the C5/C6 row is the one worth the attention]** `C5` and `C6` already declare $h_{ba}=0$ within each component, so their co-spherical sub-locus resolves into **two parallel latitude circles on one sphere**, offset along the common axis by $d_C$, with the sphere center at $\zeta=(d_C^2+R_2^2-R_1^2)/2d_C$ and $R^2=\zeta^2+R_1^2$. This is the only member of the classification that is a genuinely two-dimensional shared-sphere object with no shared-circle analogue and no single-latitude degeneracy, and it is the natural place to look for a nondegenerate co-spherical history. What would confirm its interest is an acceleration-balanced two-latitude configuration; what would deflate it is a proof that the two-ring axial no-balance argument already covering staggered rings extends to unequal component radii.

Plainly: most braid families can be made co-spherical by setting their radii equal. Two families are co-spherical by definition. One family, C5/C6, becomes something the circle chapter could never describe — two rings at different heights on one sphere — and that is the shape most worth testing.

## Inventory Of Evaluated Shared-Sphere Objects

Each row is owned by the document named; this chapter collects dispositions and does not restate the evidence.

**[measured and derived, per row; grades and instruments belong to the owning documents]**

| Object | Co-sphericity | Disposition |
|---|---|---|
| Orthogonal-plane weave $3{:}3$ | unconditional; three great circles in orthogonal planes, an `A1.2` locus | interval-certified bounded no-balance for every $\beta_f\in[0.25,12]$ on the fixed relative-phase locus ([brainstorming](brainstorming.md)) |
| Rigid co-rotating octahedron | unconditional; $h=R/\sqrt3$, $\rho=R\sqrt{2/3}$, the cyclic-symmetric A2/B1 overlap | excluded by a one-signed axial-sum argument for $h>0$ ([brainstorming](brainstorming.md)); corroborated on a different channel by the audit below |
| `F6b` | unconditional; the $h_+=h_-$, $\rho_+=\rho_-$ specialization of `F6c` | `DEMOTED`; measured member-acceleration failure, repairs exhausted ([candidate registry](candidate-registry.md)) |
| Stationary six sites on $S^2$ | unconditional | no stationary balance in the aligned-ring, staggered-ring, regular-octahedral, or single-ring transitive strata ([neutral six-point balance](neutral-six-point-balance-and-a2-rotation.md)); the global sphere question remains open |
| Platonic vertex sets, all five | unconditional; unit circumradius | **not evaluated.** The discrete inventory is complete at 917 balanced classes; no applicable moving-assembly criterion exists yet ([Part III](#part-iii--the-platonic-corner)) |
| `F6c` | sub-locus $R_{\mathrm{orbit},+}=R_{\mathrm{orbit},-}$, maintained along the history | `STASIS` at `H5`; the sub-locus is not where the evidence sits ([F6c geometry](f6c-geometry.md)) |
| `SD3` | sub-locus $\|P\mathbf y_+\|=\|P\mathbf y_-\|$ | one bounded five-coordinate slice, no return |
| `F5` regular chart | barred; the chart requires $\rho_1\ne\rho_2$ | the collapse to equal radii is a degenerate chart boundary that reinstates same-circle collision ([inferring braid requirements](../mapping-equations/inferring-braid-requirements.md)) |

Two entries deserve to be read together rather than as separate rows.

**[measured; owned by F6c geometry]** `F6b` is the single-sphere specialization of `F6c`, and the Master Equation rejected it in an unusually informative way. Projection of the evaluated acceleration onto the common three-coordinate tangent of the fixed shared-radius history leaves $68.408\%$ of the acceleration norm outside that tangent. Granting the two polarity sectors separate axial, radial, and phase histories — that is, releasing the single shared sphere into two independently breathing sector envelopes — reduces the measured normal fraction to $2.31\times10^{-15}$.

Plainly: when eight members were pinned to one sphere the acceleration law pushed most of its effort in a direction the arrangement could not move, and when the two polarity groups were allowed their own radii that objection almost entirely disappeared. The dynamics did not merely decline the shared sphere; it indicated where it wanted to go instead.

**[inference; pattern across the inventory, not a theorem]** No unconditionally co-spherical object in the program has passed a balance test, on any channel, at any member count. The four failures are independent in kind — an axial-sum sign argument, an interval-certified bounded exclusion, a measured tangent-projection residual, and a stationary-strata sweep — and they do not compose into a proof. What would establish the pattern as a theorem is a general co-sphericity obstruction argument; what would overturn it is a single balanced nondegenerate co-spherical history, for which `C5`/`C6` two-latitude configurations are the most promising unexamined stratum.

The sections above define the chart and collect what is known. The chapter is not complete; what remains is consolidated in [Outstanding Work](#outstanding-work) at the end, and the three missing chapter sections listed there belong before the Platonic corner rather than after it.

## Part III — The Platonic Corner

The final part of the chapter is the one corner of the classification where the discrete enumeration is finite and can be completed. It is placed last because its due diligence has not been performed: the enumeration is done, no applicable criterion exists yet to evaluate it against, and the temptation to substitute an inapplicable one is itself part of what this part is about.

### The Shape Of The Irony

$\mathbb{A}\mathbb{A}\mathbb{A}$ is constituted by a refusal. It sits below general relativity, quantum theory, the Standard Model, and $\Lambda$CDM, and it declines to take any of them as input. The layer discipline exists precisely to keep borrowed structure out of substrate reasoning: no mass, no primitive magnetism, no quantization postulate, no spacetime substrate. The program is aggressively bottom-up, and its search spaces are correspondingly raw — configuration charts with a dozen continuous axes, campaigns that close only as scoped negatives, a candidate registry in which every row sits in `STASIS`.

And yet the natural screening basis for the most symmetric shared-sphere arrangements turns out to be the oldest surviving classification theorem in mathematics. Euclid's Book XIII closes by proving that there are exactly five convex regular polyhedra and no more. That result is roughly twenty-three centuries old, predates every framework $\mathbb{A}\mathbb{A}\mathbb{A}$ refuses to import, and is the one piece of structure a theory this stubborn can accept without embarrassment — because it is not physics. It is a fact about three-dimensional Euclidean space, and Euclidean space is what $\mathbb{A}\mathbb{A}\mathbb{A}$ actually postulates.

The second irony is sharper and less comfortable. Physics already has a famous cautionary tale about explaining nature with the Platonic solids, and it is Kepler's. The *Mysterium Cosmographicum* of 1596 nested the five solids between the planetary spheres to fix the orbital radii, and it was beautiful, quantitative, ambitious, and wrong. Kepler spent decades recovering from it, and the recovery produced the actual laws. So the moment this program reaches for the same objects, it inherits the most notorious precedent for geometry-as-explanation in the history of physics.

The discipline that separates the two cases is not subtle, but it has to be said out loud, because it is the whole justification for this part. Kepler used the solids as an **answer**. This audit uses them as a **screen**. The braid program's charter already fixes what a screen can do: screening can rule out; only evolution can rule in. A screen that comes back entirely negative has therefore discharged its full obligation, and a screen that came back positive would have produced a candidate and nothing more. There is no version of this exercise in which the solids explain anything. That asymmetry is what makes it safe to run.

Plainly: the five regular solids are the oldest exactly-known shapes in mathematics, and the most famous wrong answer in the history of astronomy. Both facts are reasons to be careful, not reasons to skip the check — as long as the check is only ever used to eliminate options.

### Neutrality Is Free Here, And That Is The Real Result

The reason the Platonic solids sit inside this classification at all is that their vertex sets are exactly co-spherical by construction. The reason they are worth the trouble of enumerating is a counting fact that is easy to miss.

**[derived; elementary]** The five convex regular polyhedra have vertex counts $4$, $6$, $8$, $12$, and $20$. Every one of them is even. Consequently every Platonic vertex set admits a balanced polarity word. There is no Platonic solid on which polarity neutrality is obstructed, and no vertex left over.

This deserves emphasis because in most structural problems neutrality is a **constraint**: it consumes a degree of freedom, and configurations must be built to satisfy it. Here it costs nothing. Every solid in the classification satisfies it, and the parity that makes it free is a property of the solids, not of the theory. The result is that the polarity assignment stops being a constraint to be discharged and becomes a **free discrete axis** — the 2-colouring itself is an independent search dimension laid over a geometry that is already fully determined.

**[derived]** Four of the five solids are centrally symmetric: the octahedron, cube, icosahedron, and dodecahedron each have $V/2$ antipodal vertex pairs. On those four, the *antipodal-alternating* colouring — opposite polarity at each antipodal pair — resolves the whole vertex set into $V/2$ neutral binaries sharing one centre, which is exactly the compositional primitive the [braid taxonomy](../../../content/markdown/aaa/noether-braid/braid-taxonomy.md) uses and exactly the condition under which the taxonomy intersections above collapse to $R_1=R_2=R_3$. The tetrahedron is the exception; it has no antipodal pairs, so its balanced words are edge-versus-opposite-edge splits rather than binary decompositions.

Now the coincidence that motivated the audit.

| Solid | $V$ | Balanced word | Neutral binaries | Program object at that count |
|---|---|---|---|---|
| Tetrahedron | 4 | 2:2 | — (no antipodes) | nothing in the program |
| Octahedron | 6 | 3:3 | 3 | base / Family-A / Family-B braid, six worldlines |
| Cube | 8 | 4:4 | 4 | `F6b` and `F6c`, eight architrinos on four tetrahedral axes |
| Icosahedron | 12 | 6:6 | 6 | Family C, twelve worldlines |
| Dodecahedron | 20 | 10:10 | 10 | nothing in the program |

**[inference; the coincidence is real, its significance is not established]** Three of the program's structural counts — six worldlines as three neutral binaries, eight as the polarity-resolved tetrahedral pair, twelve as six binaries in one record — land exactly on the octahedron, the cube, and the icosahedron. The program did not get there by enumerating polyhedra. It got there from taxonomy, from counterflow requirements, and from what the solver could carry. That the counts coincide is either a hint that the admissible structures are symmetry-selected, or an artefact of small even numbers being scarce. This chapter does not decide which. What would confirm the stronger reading is a retained branch whose stabilizer is a polyhedral point group; what would deflate it is a retained branch at an odd or non-Platonic count.

Plainly: every regular solid can be polarity-balanced for free, and the three counts the braid program already cares about are exactly the octahedron, cube, and icosahedron. That is suggestive enough to check and nowhere near enough to believe.

### The Discrete Inventory

The search space here is finite, and it is small. Because the point groups are finite and the polarity assignment is discrete, the balanced words on a Platonic vertex set can be enumerated completely, up to the solid's full point group together with global polarity conjugation.

**[measured; pure enumeration, no dynamical content; instrument `scripts/prescribed-path-analysis/oracle/platonic_balanced_word_enumeration.py`]**

| Solid | $V$ | Word | Point group order | Balanced colourings | Inequivalent classes | Antipodal-alternating classes |
|---|---|---|---|---|---|---|
| Tetrahedron | 4 | 2:2 | 24 | 6 | 1 | — (no antipodes) |
| Octahedron | 6 | 3:3 | 48 | 20 | 2 | 1 |
| Cube | 8 | 4:4 | 48 | 70 | 6 | 3 |
| Icosahedron | 12 | 6:6 | 120 | 924 | 14 | 4 |
| Dodecahedron | 20 | 10:10 | 120 | 184756 | 894 | 20 |
| **Total** | | | | | **917** | **28** |

That is the whole discrete axis: **917 configurations**, of which 28 resolve into neutral binaries through the center. Anything the program eventually wants to say about co-spherical Platonic arrangements can be said about all of them, exhaustively, in one pass. The enumeration is a reusable input and carries no physics.

One structural note survives independently of any dynamical criterion. On the octahedron, the antipodal-alternating class — three neutral binaries on three orthogonal axes — is the *same* configuration as the two-segregated-triangle split, because each face triangle is the antipodal image of the other. That identification is exact and it is why the octahedron is the one solid this program has actually tested.

The cube tempts an analogous identification and does not support it. The cube's antipodal-alternating class is the stella octangula, and equal-scale `F6c` reproduces that compound — but at the level of **track centers**, with $h_+=h_-$, not at the level of the moving members. The corpus rejects the member identification outright except in the degenerate limit $\rho_+=\rho_-=0$: for nonzero transverse radii the instantaneous member positions are displaced from those centers and are generally not cube vertices. The evaluated `F6b` representative has $h=\rho=0.30$, nowhere near that limit. **No architrino assembly on cube vertices has been evaluated**, and reading `F6b`'s negative as a cube result would be a track-center-versus-member confusion the F6c chapter exists partly to prevent.

### What Is And Is Not Excluded

**[derived and measured, per row; owned by the cited documents]**

| Solid | Negative on record | Motion class covered | Open |
|---|---|---|---|
| Octahedron | **yes, two** — the face-opposite A2 octahedron fails the stationary condition with partner contribution $\sqrt{17}/4\ne0$, and the regular-octahedral stratum contains no stationary balance; separately, the rigid co-rotating octahedron is excluded for $h>0$ by a one-signed axial sum | stationary; rigid co-rotation about a body diagonal | every non-rigid octahedral history: breathing, independent cadences, sector-decoupled radii |
| Cube | **no** | — | everything |
| Tetrahedron | **no** | — | everything; the 2:2 transient remains unreproduced |
| Icosahedron | **no** | — | everything, including whether any Family-C history is icosahedral |
| Dodecahedron | **no** | — | everything |

So the honest position is that **one of the five solids has been tested, and it failed twice** — which is also the only one the program had an independent reason to test, since six members is the base braid count. The other four are unexamined, and the enumeration above is a queue against that gap rather than a report on it.

### The Screen That Does Not Exist Yet

Due diligence on this corner has **not** been performed, and it is worth being exact about why, because the gap is instructive.

The only exact point-set criterion the corpus currently offers is the fixed-point-cloud common-mode residual, and it is inapplicable here. Its ansatz is $\mathbf X_i(T)=\mathbf R_i+\mathbf UT$ for *every* member: one common constant velocity, every internal velocity relative to the group center exactly zero, every pair distance constant for all time. No orbits, no circulation, no axes, no phases, no cadence — a frozen constellation carried rigidly through the void. The corpus states the limit directly: sampling a prescribed orbit at frozen phases while discarding its internal velocities does not evaluate that orbit's history and supplies no necessary condition for a moving assembly.

A shared-sphere assembly is the opposite of that ansatz in every respect that matters. Its members orbit, its pair distances vary, and — per the chart section above — under rigid co-rotation its members do not even share a speed. Evaluating the frozen-translation criterion on Platonic vertex sets would return a technically correct answer to a question nobody in this program has asked, and reporting it as due diligence would misrepresent an untested corner as a screened one. It is therefore left out.

Plainly: the shapes are worth checking, the tool to check them with does not exist yet, and running the wrong tool would look like an answer without being one.

**[derived; conditional obligation on the future instrument]** One consequence is available in advance, and it should constrain how that instrument is built. If the criterion produces a second-rank tensor constructed *equivariantly* from the configuration, and the subgroup preserving a given polarity word acts irreducibly on $\mathbb R^3$, then Schur's lemma forces that tensor to be a multiple of the identity, and the criterion can only be satisfied degenerately. Under that hypothesis, residual symmetry is a liability rather than an asset, and the polarity word is the lever that breaks it. Whether the applicable moving-assembly criterion is equivariant in the required sense is exactly the thing to check first.

The instrument that would license real due diligence is item 1 of [Outstanding Work](#outstanding-work) — the moving-assembly replacement for the shared circle's signed second-harmonic condition. Until it exists, the Platonic corner is an open obligation, not a discharged one, and the 917 classes are a queue rather than a result.

### Why The Corner Is Worth Holding

Almost nothing in the braid program can be closed exhaustively. The configuration chart has more than a dozen axes, most of them continuous, and its own status line still reads `DRAFT INVENTORY`. Every negative the program has booked is scoped: it names declared ranges and a motion class, and it covers nothing outside them. That is honest and it is also exhausting, because a scoped negative never quite finishes anything.

The Platonic corner is the one place where the enumeration terminates. There are exactly five solids because Euclid proved there are exactly five; there are exactly 917 balanced classes because the symmetry groups are finite and the colourings are discrete. Whatever criterion eventually applies, it can be applied to all of them and the discrete question will be *closed* rather than scoped. That is a rare prospect in this program, and the reason it exists is that a Greek geometer finished the hard part of the classification twenty-three centuries ago and left the residue finite.

**[speculation; later family question]** The corpus already flags the natural continuation and its constraint: because only three axes can be mutually orthogonal, extensions beyond the orthogonal triad require a different symmetry class — tetrahedrally or icosahedrally distributed axes — and such an axis set is not a new braid type until an exact coordinate family and a complete residual obligation are chosen. What the rest of this chapter suggests such a family will have to do is break its own symmetry somewhere: in the polarity word, in the orbital phases, or in the radii. The rigid co-rotating octahedron fails on its axial sum, the orthogonal-plane weave fails across a certified speed band, and the fully co-spherical `F6b` fails on its tangent projection and improves by fifteen orders of magnitude the moment its two polarity sectors are allowed different radii. In every evaluated case the maximally symmetric, perfectly co-spherical arrangement is the one the acceleration law declines. Perfect symmetry does not look like the target. It looks like the thing to spend.

And that is where Kepler's ghost stops being a warning and becomes a useful precedent. He was wrong because he treated the solids as the answer and the orbits as the thing to be brought into agreement with them. The inverse discipline is the one available here: enumerate the solids, hold the corner open, build the instrument that can actually evaluate an orbiting assembly, and let the dynamics decide. The enumeration is done. The screen is a debt, not a payment.

### Reproduction

```
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/platonic_balanced_word_enumeration.py
```

The instrument builds each solid's vertex set at unit circumradius in exact algebraic form, derives each point group by enumerating the orthogonal maps preserving the vertex set, orbit-marks balanced colourings as bitmasks under that group together with global polarity conjugation, and reports class counts, one representative word per class, and which classes are antipodal-alternating. It performs no dynamical evaluation and asserts nothing about motion.

## Standing Dispositions

**Terminology is settled.** `balanced polarity word` is approved for use here, on a spherical vertex set rather than one circle. `shared-sphere assembly` is the adopted chart name. Two collision guards remain in force and are not open questions: keep the term clear of `spherical envelope` in the envelope-aspect-ratio sense ($\xi=1$), and of `concentric` in the reserved absolute-frame-diagnostic sense. The corpus antecedents this chart generalizes are `common sphere`, used descriptively in [A2 symmetry and return response](../../../content/markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md), and `orbit spherical envelope`, defined locally in [F6c geometry](f6c-geometry.md).

**`N:N` scope is settled.** Shared-circle `N:N` remains reserved to the circle chart and is never braid notation. The spherical use inherits the polarity-word semantics only.

**Nothing is booked.** This chapter is not entered in the [shared-circle assembly registry](shared-circle-assembly-registry.md), is not a named slice of the [configuration chart](configuration-chart.md), holds no row in the [candidate registry](candidate-registry.md), and books no evidence file. The classification needs substantially more work and review before any ledger entry is appropriate, and items 1 through 4 of [Outstanding Work](#outstanding-work) gate that. Cite this document; do not index it.

**Not promoted.** The chapter stays under `reference/priorities`. It parallels a `content/markdown/aaa/dynamics` chapter in architecture, and that resemblance is not a promotion path. Nothing here moves into the corpus without a separate theory decision.

## Outstanding Work

Ordered by what blocks what. Everything that involves evaluating a configuration waits on the first item.

### Gating

1. **A moving-assembly residual criterion for co-spherical arrangements.** The replacement for the shared circle's signed second-harmonic condition, evaluated on actual histories rather than frozen phases. This is the missing instrument. The corpus's fixed-point-cloud common-mode operator assumes $\mathbf X_i(T)=\mathbf R_i+\mathbf UT$ — zero internal motion, constant pair distances — and cannot substitute for it under any framing. Until this exists, **no configuration in this classification can be screened at all**: not the Platonic corner, not `C5`/`C6`, not any taxonomy sub-locus. A first check on whatever is built: is the resulting tensor equivariant, and does the Schur argument in Part III therefore bite?

### Chapter sections still to write

These belong before Part III rather than after it.

2. **Collision-free structure on the sphere.** The shared-circle winding lemma has no direct analogue: co-spherical members at different latitudes never meet regardless of phase, while members sharing a latitude circle inherit the circular constraint exactly. The correct statement is a per-latitude condition plus a cross-latitude clearance bound, derived rather than asserted. The `F5` collapse and the `F6c` clearance warning both belong here — equal center radii say how far members are from the center, not how far they are from one another.
3. **Complete causal-root balance protocol on the sphere.** The canonical ledger must include every cross-transmitter root and every nontrivial same-transmitter root, and the latitude-dependent speed family means fold structure varies across members of one arrangement. The shared-circle root algebra does not transfer.
4. **The two-latitude chart.** Exact coordinates, admissible polarity words, and balance conditions for the `C5`/`C6` shared-sphere sub-locus.

### Open physics

5. **Four of the five solids are unexamined.** Only the octahedron carries a negative. The cube, tetrahedron, icosahedron, and dodecahedron have no evaluation of any kind, and the 917-class enumeration is a queue against that gap rather than a report on it.
6. **Octahedral non-rigid histories are open.** The two negatives on record cover the stationary case and rigid co-rotation about a body diagonal. Breathing, independent cadences, and sector-decoupled radii are untouched.
7. **`C5`/`C6` two parallel latitude circles on one sphere** is the most promising unexamined stratum — the only member of the classification with no shared-circle analogue and no single-latitude degeneracy. A balanced nondegenerate co-spherical history there would overturn the inventory's negative pattern.
8. **The count coincidence is undecided.** Whether six, eight, and twelve landing on the octahedron, cube, and icosahedron reflects symmetry selection or the scarcity of small even numbers. Confirmed by a retained branch whose stabilizer is a polyhedral point group; deflated by a retained branch at an odd or non-Platonic count.
9. **A general co-sphericity obstruction argument**, which is what would convert the four independent negatives from a pattern into a theorem.

### Deferred by operator decision — no action

10. **Registry and chart routing.** Whether shared-sphere records get a registry parallel to the [shared-circle assembly registry](shared-circle-assembly-registry.md), and whether co-sphericity becomes a named cross-layer slice of the [configuration chart](configuration-chart.md). Not to be reopened until items 1 through 4 are done. See [Standing Dispositions](#standing-dispositions).
11. **Promotion** to `content/markdown/aaa`. Same gate, and a separate theory decision besides.

Closure goal: develop shared-sphere assemblies into a complete classification — chart, collision structure, root-balance protocol, and the two-latitude sub-chart — build the moving-assembly criterion that lets any of it be screened, and convert the accumulated co-sphericity negatives into either a general obstruction theorem or a nondegenerate two-latitude candidate, before any registry, chart, or promotion question is reopened.
