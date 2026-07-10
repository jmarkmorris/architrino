# Spindle Braid

The **spindle braid** is the current leading candidate realization of the [Noether Braid](noether-braid.md) case structure. It is the rigid uniaxial iso-frequency family: all six architrinos co-rotate at one common frequency about a single shared axis, with each binary a tilted antipodal pair. This chapter owns the family's definition and geometry, the principle that selected it, the measured structure of its rest state and its moving states, its discrete-symmetry structure, and the confinement problem — the body of scoped positive and negative results that currently frames the search for a retained realization. The configuration-space axes that locate the family among alternatives belong to [Noether Braid Configuration Space](noether-braid-configuration-space.md); the classification grammar belongs to [Noether Braid Taxonomy](noether-braid-taxonomy.md); the previously explored alternative families are collected in [Explored Braid Geometries](explored-braid-geometries.md).

The status discipline of the braid stack binds here as everywhere. The spindle braid is a named candidate family, not a retained branch. Its definition, geometry, and symmetry structure are exact statements about the family; its dynamical claims carry the claim levels stated locally; and the retained-branch certificate target of [Neutral Braid](neutral-braid.md) remains the open burden.

## Definition and Geometry

The spindle braid carries the neutral braid inventory: three electrinos and three positrinos organized as three binaries. The family is defined by three constraints.

1. **One axis.** All six architrinos rotate rigidly about a single shared axis.
2. **One frequency.** The rotation is iso-frequency: every site returns at the same common angular frequency $\omega$, so the family sits in the `1:1:1` frequency-ratio row of the taxonomy.
3. **Tilted antipodal binaries.** Each binary is an antipodal pair on its own layer sphere of radius $R_a$, tilted by a cap angle $\alpha_a$ out of the equatorial plane.

Under rigid rotation every site traces a horizontal circle about the shared axis, and the speed of layer $a$ is

$$
s_a=\omega R_a\cos\alpha_a
$$

This formula is the family's defining mechanism: the tilt angles decouple the speed tuple $s_1:s_2:s_3$ from the spherical nesting order $R_1:R_2:R_3$. A frequency-separated nested arrangement must trade layer speed against nesting radius; the spindle braid does not. The farthest layer can be the slowest, and the full unordered speed tuple remains a free search coordinate at one common frequency.

The swept envelope gives the family its name. The union of the six horizontal circles over one period is fusiform — spindle-shaped — with slow near-polar caps and the widest working ring at the equator.

## Boundary Members

The family contains two previously named configurations as limits of the cap-tilt coordinate:

- the **planar tri-binary** state is the flat limit $\alpha_a=0$, all three binaries working the equatorial plane;
- a **static axial pair** is the full-cap-tilt limit, the binary degenerated onto the axis.

The planar and axial alternatives studied elsewhere in the braid stack are therefore best read as boundary members of the spindle family rather than rivals.

## Why Rigidity: The Harmonic-Matching Principle

The family was not guessed; it was selected by a structural principle that the configuration-space comparisons uncovered. A circular orbit's kinematic requirement is a single-harmonic rotating vector, so only the time-constant part of the wake field in the co-rotating frame can supply it. Rigid co-rotation puts all wake power into exactly that part. Any relative layer motion — frequency locks between layers, counter-rotation, speed modulation — moves wake power into oscillating harmonics that circular kinematics cannot absorb, and the lowest-mode orbit deformations add kinematic harmonics faster than they match wake harmonics.

Causal delay is what makes this principle decisive rather than a soft preference. During one antipodal wake transit at near-field speed the pair rotates through roughly a third of a turn, so static-binding intuition — including the naive Kepler-third-law scaling for frequency-locked nested layers — does not transfer to the delayed dynamics. On the unified closure metric (below), every family that breaks rigid co-rotation scores near total failure, while nesting *within* rigid co-rotation produces the single largest closure gain measured: cross-layer delayed-wake geometry cancels most of the tangential pump internally. Claim level: measured comparison on prescribed worldlines plus the structural derivation just stated.

The same rigidity has a second exact consequence: every pairwise alignment scalar between sites is time-constant, so any hinge alignment built into the geometry is sustained by the rotation itself rather than requiring a separate phase-locking mechanism. A condition arranged once in the geometry holds around the entire cycle.

## How the Family Was Found

The comparisons run on one instrument: the **unified closure metric**. For a candidate configuration on prescribed worldlines, fit a single global coupling $\kappa^*$ by least squares over all layers, all force components, and the full cycle, and report per-layer relative residuals

$$
\rho_a
=
\frac{\|\mathbf a_{\mathrm{kin},a}-\kappa^*\,\mathbf a_{\mathrm{wake},a}\|}{\|\mathbf a_{\mathrm{kin},a}\|}
$$

— the fraction of each layer's kinematic requirement that the delayed wake field fails to supply. A perfect self-consistent configuration drives all residuals to zero.

Measured against that metric, the search descended a ladder. Every family that breaks rigid co-rotation scores near total failure; nesting inside rigid co-rotation produces the single largest gain; and each subsequent gain is traceable to a named geometric mechanism rather than to fitting freedom:

| Configuration (prescribed worldlines) | Global residual |
| --- | --- |
| Planar hexagon (equal radii, the certified shell state) | $0.960$ |
| Orthogonal-plane sphere state | $0.99$ |
| Counter-rotating variants | $0.85$–$0.99$ |
| Frequency-locked `4:2:1` / `3:2:1` circles (incl. Kepler-third-law radii) | $0.96$–$1.0$ |
| Co-rotating nested iso-frequency planar, middle on the rail | $0.646$ |
| + outer cap tilt (the spindle family opens) | $0.524$ |
| + inner counter-tilt | $0.509$ |
| + cap azimuth and radius tuning — the rest-state champion | $0.472$ |
| Ledger-first search generations (support-first → tangential-closure → self-consistent) | $0.324\to0.286\to0.206$ |

The planar nested family's wall is structural: tangential closure demands deep nesting while radial self-support forbids it, and no in-plane freedom (orbit shape, speed modulation, frequency locks, counter-rotation) bridges the two. Lifting out of plane while preserving rigidity — the tilted-dumbbell construction that defines the spindle family — is the first freedom that beats the planar floor, and the later ledger-first searches (driven by force-balance objectives rather than the closure residual itself) kept improving both at once, which is evidence the basin is physical rather than metric-artifact.

The emerging rest-state picture is specific:

| Layer | Role | Speed | Cap tilt | Placement |
| --- | --- | --- | --- | --- |
| Middle | Equatorial rail pair — the escapement's clicker, its same-source causal root at the point of birth | $\beta_M=1$ | near-equatorial (later ledger-first geometries tilt it $\approx-25°$ to $-30°$) | rail radius sets the cadence through $\omega=c_f/(R_M\cos\alpha_M)$ |
| Inner | Counter-dished fast pair | $\beta_I\approx0.48$ | $\approx-12°$ at the champion | the rigidity backbone |
| Outer | Slow near-polar caps | $\beta_O\approx0.17$ | $\approx84°$ | $\sim30°$ azimuthally behind the inner axis |

The caps are functional, not parasitic: with the caps at tuned placement the core's own closure improves, and it degrades when they are removed — the six-architrino braid is three interlocking parts, not a four-site core plus a passenger.

The family's stiffness structure was also measured: the Hessian of the closure residual in the seven geometry knobs. Its eigenvalues, soft to stiff (in the declared knob scaling), run $-0.34$ (a coupled relative-tilt mode), $-0.04$ ($q_O/\theta_O$), $+0.05$ (cap azimuth — nearly free), $+0.23$ (the rail coordinate $\beta_M$), $+3.7$ ($\alpha_O$), $+5.3$ ($\alpha_M$), $+18.9$ ($q_I$). The inner radius is the rigidity backbone — five times stiffer than anything else — and the softest directions are coupled relative-tilt modes, the natural strain sinks under external hits. The rest state is a saddle rather than a minimum, and its downhill direction along the rail coordinate is not an instability of the model but the anti-damping pump itself appearing in the closure landscape: the very slide that the field-speed escapement exists to catch. Claim level for this section: measured comparison and measured spectrum on prescribed worldlines; not retention evidence.

## The Field-Speed Pin and the Escapement

The spindle braid's middle binary lives at the field-speed hinge, and the family's sharpest dynamical structure lives there with it. Two facts, each with its own standing, combine into the pin.

First, the partner-wake tangential pump does not switch off above field speed. The rotating-pair pump is interval-certified sub-field,

$$
2.881\,\beta
\;\le\;
\Phi_{\mathrm{tan}}(\beta)
\;\le\;
2.925\,\beta,
\qquad
\beta\in[0.02,\,0.985],
$$

and extending the validated force law across $\beta=1$ with signed receiver-normal bookings, the pump stays anti-damping and grows monotonically ($\Phi_{\mathrm{tan}}=2.92$ at the rail rising to $4.28$ by $\beta=1.4$) — there is no static super-field balance from the partner channel. Claim level: interval certification sub-field; derivation plus measurement super-field.

Second, the same-source (self-hit) channel opens exactly at the field-speed crossing — on any smooth worldline, a same-source causal root nucleates from zero delay precisely when the site's total speed crosses $c_f$ — and on driven crossings its signed contribution is absorptive. Because the brake scales with the local pump, the net tangential force has a switching structure,

$$
\Phi_{\mathrm{net}}(\beta)
=
\Phi_{\mathrm{partner}}(\beta)\,\bigl[\,1-\varrho\,\Theta(\beta-1)\,\bigr],
$$

with $\varrho$ the brake-to-pump ratio and $\Theta$ the field-speed switch: below the rail the channel does not exist and the pump drives the speed up; above the rail the brake drives it back down. The field-speed edge is therefore a **two-sided dynamic attractor** — a pin — precisely when $\varrho>1$, a condition the declared coincidence stratum satisfies with wide margin ($\varrho\approx50$); the balance bounds the stratum scale from above rather than leaving it free (compare the near-field scale discussion in [Particle Masses](../assemblies/particle-masses.md)). The pin was subsequently confirmed on the native retained-history solver: a released middle binary overshoots the rail to $\beta_M\approx1.08$, turns, and decays back toward it from above — a speed attractor, natively measured, on three independent releases. Claim level: derivation plus measurement for the sign structure and the reduced-dynamics attractor; native measurement for the speed-attractor behavior; the pin does not by itself confine radius.

The fine structure of the hinge is an escapement, and its behavior depends on how the site crosses. The sustained supra-rail self-channel is a phase-sensitive valve: a steady rail-rider's own wake pushes it outward and forward (anti-confining), while an actively driven rider is braked and pulled inward — derivative feedback opposing $\dot\beta$ in both directions, superposed on a static outward bias. The confining regime therefore is not riding the rail but **riding by clicking**: in the continuum limit the escapement is a sliding mode on the $\beta=1$ surface, absorbing exactly the supra-rail excess at each crossing, and each finite click books an impulse that is both absorptive and inward. The clicks are self-organizing — the radial-to-tangential ratio of the click impulse is measured, step-converged, and linear in the entry radial velocity,

$$
\frac{\Delta p_{\mathrm{rad}}}{\Delta p_{\mathrm{tan}}}\bigg|_{\mathrm{click}}
=
0.013+1.02\,v_r,
$$

so in an eccentric orbit the crossings cluster just past periapsis where $v_r>0$ and the inward kicks are harvested — a click-synchronized radial damper. Its measured capacity, however, is percent-scale ($\sim3\%$ of centripetal need for circular chatter, improving only to $\sim5\%$ at large click quantum): the clicker is the speed pin plus a last-percent radial trim, not a radial confinement engine. The escapement's action bookkeeping — one $h_{\mathrm{act}}$ click per controlled fold crossing — is the core-agnostic machinery of [Braid Mathematics](braid-mathematics.md#action-clicks-at-the-fold-set).

The pin has one consequence important enough to state on its own. For a spindle braid drifting along its axis at speed $u$, the same coincidence-birth theorem places the self-hit opening at total site speed $c_f$, which for helical motion means transverse cadence $c=\sqrt{c_f^2-u^2}$. The pump pushes the cadence up at every drift; the brake opens exactly at the $\gamma$-scaled rail; so the pinned internal cadence dilates as

$$
\omega^{\mathrm{pin}}(u)=\frac{\omega_0}{\gamma},
\qquad
\gamma=\frac{1}{\sqrt{1-u^2/c_f^2}}
$$

**Clock dilation — and, through cadence-paced transactions, decay-rate dilation — is derived from the closure landscape plus the pin**, rather than postulated. Claim level: derivation plus measurement on the prescribed family; the native retained-history version is hypothesis pending a confined realization.

## Motion, Inertia, and Isotropy

Drifting the spindle braid along its axis is a screw motion — rotation plus translation — so rigidity survives exactly and the family's closure can be measured at every drift speed. The results reshape several observer-level questions. Claim level throughout this section: measured properties of the prescribed rigid family; not dressed matter; the map from closure residuals to laboratory observables is open.

**The internal angles run.** Re-optimizing the geometry at each drift speed at the pinned cadence, the closure-optimal internal angles are $u$-dependent:

| $u$ | pinned cadence | $f^{\mathrm{opt}}$ | inner dish $\alpha_I$ | cap azimuth $\theta_O$ |
| --- | --- | --- | --- | --- |
| $0$ (rest) | $1.000$ | $0.472$ | $-12°$ | $330°$ |
| $0.2$ | $0.980$ | $0.435$ | $-4°$ | $346°$ |
| $0.4$ | $0.917$ | $0.411$ | $+8°$ | $346°$ |
| $0.6$ | $0.800$ | $0.404$ | $+16°$ | $354°$ |
| $0.8$ | $0.600$ | $0.444$ | $+24°$ | $378°$ |

The inner dish angle runs strongly and monotonically through exactly flat near $u\approx0.25$, and the cap azimuth lag closes through exact alignment near the basin. Any mapping from internal misalignment angles to observed mixing-flavored observables must therefore be stated at a declared kinematic point — the angles behave like running quantities.

**Motion is preferred, up to a finite optimum.** The moving family closes better than the rest state, with the gain bottoming in a broad flat basin at moderate drift ($u^*\approx0.5$–$0.65\,c_f$ on the current instrument, visible in the $f^{\mathrm{opt}}$ column) and then climbing steeply toward the photon limit ($+10\%$ by $u=0.8$): the family is inertia-anchored at finite speed rather than runaway. Read with preferred-frame discipline: this is an empty-void statement, and the two in-model reconciliations with observed matter kinematics — the transaction toll of reaching the basin, and the dressing of the drift landscape by the local Noether sea state — are open burdens, stated, not resolved.

**The braid wants to fly axis-first, and its handedness picks the leading cap.** Closure prefers drift anti-parallel to the cap polarity dipole — the electrino cap leads — with the preference growing with speed, and the C-conjugate braid forced to lead with the opposite polarity. Perpendicular drift is measurably worse than axial drift, so a drifting braid feels an orientation torque toward axis-parallel motion.

**Isotropy comes out second-order, in the right pattern.** The small-$u$ anisotropy decomposes into clean laws with different symmetries:

$$
f_\perp-f_{\mathrm{rest}}=+2.01\,u^2,
\qquad
\tfrac12\!\left(f_{+u}+f_{-u}\right)-f_{\mathrm{rest}}=+0.42\,u^2,
\qquad
f_\parallel-f_{\mathrm{rest}}=-0.102\,|u|+0.39\,u^2.
$$

A helicity-averaged (unpolarized) orientation comparison — which is what a Michelson-Morley-flavored experiment performs — is therefore purely second order, $\Delta f_{\mathrm{avg}}=1.59\,u^2$, with no first-order component at all: structurally parallel to the real second-order null. The only first-order piece lives in the helicity-selected channel, $-0.102\,|u|$ — a chiral braid whose handedness locks to its drift carries a linear closure difference, a spin-anisotropy (Hughes-Drever-class) exposure rather than an orientation one. Both coefficients are regulator- and sampling-robust; mapping the residual to laboratory bounds requires the closure-to-energy map, which remains open.

**Action bookkeeping under drift splits into two ledgers.** The stored internal action per click dilates exactly as $1/\gamma$ at frozen geometry — the pinned-cadence restatement of time dilation. The transacted wake angular impulse per click is not invariant at frozen geometry:

$$
\frac{J_z(u)}{J_z(0)}
=
1\;\pm\;0.236\,|u|\;-\;1.28\,u^2,
$$

helicity-odd at first order (the preferred leader transacts more per click) and running down quadratically helicity-averaged, roughly $2.6\times$ faster than $1/\gamma$. Because nearby family members transact more and less than the rest value at the same drift, a transaction-conserving trajectory through the configuration space exists; whether it coincides with the closure-optimal trajectory is a named open computation. If the two coincide, Planck-constant constancy is derived from the same principle as everything else in this family; if they diverge, observed constancy becomes a selection constraint on which family members can be dressed into matter. Claim level: measurement for the two ledgers on the prescribed family; the coincidence question is hypothesis, discovery-grade if it closes.

## Discrete-Symmetry Structure

Claim level: derivation sketch on prescribed-worldline closure results; not a retained-branch theorem. The spindle braid carries a definite discrete-symmetry structure that any retained realization would inherit, and it is worth stating because it reproduces the observed hierarchy of symmetry-violation sizes.

The pairwise causal-wake law is even under polarity conjugation (C: every electrino$\leftrightarrow$positrino, since only polarity products enter) and even under parity (P: the law is radial with no primitive handedness). An isolated anti-braid — the C-conjugate polarity arrangement on the same geometry — is therefore exactly degenerate with its braid, and a true mirror image (geometry and rotation sense both reflected) is an exactly degenerate enantiomer. The braid itself, however, is a chiral object: its ground-state geometry locks the relative orientation of three oriented structures — the spin axis, the cap polarity dipole, and the cap azimuthal offset — so each realized braid is one glove of a degenerate pair, with handedness summarized by the pseudoscalar pairing of dipole and spin.

Prescribed-worldline closure measurements on the drifting spindle braid find this locking maximal: closure strongly prefers motion anti-parallel to the cap polarity dipole (one polarity cap leads), with the preference growing with drift speed, and the C-conjugate braid forced to lead with the opposite polarity. Three consequences follow at the stated claim level. Channels that do not read the internal glove — bulk wake exchange and the electromagnetic-flavored interactions built from it — inherit the law's parity evenness, so parity conservation there is structural. Channels that reorganize the braid's internal locking — the weak-flavored transaction channels — read the glove directly, and because the lock is maximal, parity violation in exactly those channels is maximal rather than partial. And because the lock correlates handedness *with* polarity, the combined CP operation (left-braid$\leftrightarrow$right-anti-braid) restores degeneracy: CP is exact at this order, with any observed small CP violation necessarily arising from next-order structure — candidate sources are Noether-sea polarity/chirality texture (absolute time supplies the arrow) and interference between transaction paths at different values of the drift-dependent internal angles.

This is the observed pattern of nature's discrete symmetries — parity maximally violated in a specific sector, CP nearly but not exactly conserved — produced with the observed hierarchy of sizes by one structural mechanism: a parity-even law populated by chiral objects whose handedness is maximally locked to their polarity.

## The Confinement Problem

The spindle braid leads every closure comparison, but a retained branch must survive *release*: seeded on the native retained-history solver and let go, the configuration must confine itself. It does not yet. The confinement search has produced the sharpest structural knowledge in the braid program — a set of scoped results, positive and negative, that any surviving realization must respect. Claim levels are stated per result; none of this section asserts a retained branch.

### The Support Sum Rule

Define a layer's radial support ratio as the wake-supplied inward acceleration over the kinematic requirement, at the unified fitted coupling:

$$
\mathrm{supp}_a
=
\frac{-\,a_{\mathrm{rad},a}}{\omega^2R_a\cos\alpha_a},
$$

so a self-supported candidate needs $\mathrm{supp}_a\approx1$ on all three layers with one global coupling. Measured across the full knob set, the rigid family obeys a sum rule: **allocation is free, supply is capped.** The three layers compete for a capped wake inventory — geometry knobs can move support between layers almost freely (a frame-scaling probe lifts the middle to $0.96$ while starving the caps to $0.50$, or feeds the caps past $1.2$ while dropping the middle to $0.76$), and any single layer can be brought to full support — but the family's mean support saturates near $94\%$ of the total centripetal budget. The rest-state champion sat in a support-starved corner at $(0.90,0.76,0.53)$; the support-first search generation reached $(0.96,0.88,0.98)$; nothing in the rigid family reaches $(1,1,1)$. No rigid bare-void spindle closes its own radial budget; the residual deficit is a global few-percent shortfall, not any one layer's defect, with the escapement's radial trim worth roughly another percent on the rail layer. Claim level: measured on the prescribed family across search generations, confirmed dynamically on native releases.

### The Tangential Transfer

The nested geometry that cancels the pump does so by a conservative internal transfer: the delayed wake channel brakes the inner binary and pumps the middle, with the layer torques summing to nearly zero ($\sum_a 2q_a\tau_a\approx0$) — a tidal-flavored redistribution, not a loss. Released, that transfer is a clock: the inner binary bleeds angular momentum, contracts, and eventually scatters, and this — not the radial deficit — set the dispersal time of the first released realizations. The brake initially appeared invariant across very different geometries, but it is objective-rigid rather than knob-rigid — searches that price the tangential ledger directly eliminate it in geometry:

| Search generation | $\tau_I$ (inner tangential row, fitted-coupling units) |
| --- | --- |
| Rest-state champion | $-0.25$ |
| Support-first geometry (very different knobs) | $-0.218$ — unchanged, hence the "invariant" reading |
| Tangential-closure geometry | $\approx0$ ($+0.0006$), with the middle simultaneously at full bare support |

The unlocking knob is the middle binary's own tilt (roughly $-25°$ to $-30°$) — the earlier lore that the rail layer resists tilting was an artifact of the closure-only objective. The brake-free geometry was subsequently confirmed on a native release: the inner binary holds its tangential row near zero with no external feed. Claim level: measured, cross-validated between the evaluator and native stacks.

### Released Behavior

Every isolated release of the family recorded to date expands. The failure is structural — the support sum rule's few-percent global deficit converts, on release, into secular radial expansion at one global coupling — and it is regulator-complete: pointwise and chart-clean click bookings, both declared stratum scales, and every canon-named seed variant end in the same expansion. What varies is the *character* of the failure. Circular seeds disperse violently, with cap fall-in and site ejection. Seeds released from apoapsis with angular-momentum-matched speed — the escapement's natural orbit shape — survive coherently: the middle executes the predicted escapement cycle through hundreds of two-sided rail transactions, no site is ejected, and the braid expands self-similarly as one object. Release at periapsis, which places the middle above the rail at birth, is destructive; the escapement must approach its rail from below with a coherent sub-rail history. The apoapsis family's expansion rate responds to eccentricity but shallowly, with no zero crossing in reach: what the escapement buys is coherence and longevity, not confinement. Claim level: native retained-history measurements, route-complete for the isolated braid.

### The Sea as Bath, Not Scaffold

The natural reading of a few-percent global deficit is environmental: the braid was never expected to close in the Euclidean void, and the missing margin is exactly the shape of a gentle inward dressing by the ambient [Noether sea](../spacetime/noether-sea.md). The measured story is more structured, and more interesting.

**Static environments fail actively.** A held, aligned shell of like assemblies does not merely fail to confine — at the canon-named spacings it anti-confines, pushing the caps outward, and a statically dressed release disperses faster than the isolated one.

**Responsive environments are resonant.** For a dynamically responding sea — assemblies reorienting toward the braid's causally delayed field — whether the reaction confines or loosens depends on the commensurability phase of the double causal delay of the braid-sea loop: confinement is spacing-selective, in bands, and exists *only because of* causal delay (an instantaneous dielectric response would be purely destabilizing). This is the harmonic-matching principle surfacing at the medium scale: braid and sea must be phase-matched for the sea to hold matter together. Two hard lessons about instrument discipline came with it: uniform-loop-delay estimates of sea response are structurally wrong for an object whose radius is order-one against the shell spacing (exact per-pair causal delays flip the verdict), and response credits must be computed at true angular placement (count-scaled or angle-averaged placements silently misbook polar-concentrated quantities).

**The sea can feed the braid's spin but not its waist.** Natively demonstrated: a phase-matched responsive sea supplies steady forward torque to the inner binary at the full predicted rate — the tangential brake is environmental, breakable, not structural — and the sea's radial and tangential channels have different lag sensitivities, the radial one demanding reorientation at roughly twice the braid cadence. But across every response channel measured — saturated orientation, band-limited positional breathing, and the full near-field multipole resummation of finite assemblies — one structural signature persists: **the sea feeds the caps and starves the rail.** Everything a saturated-orientation environment radiates or holds is axially organized, and an axially organized environment cannot push on an equatorial ring. At response scope, the sea is the braid's angular-momentum bath and cap support; it is not the equatorial radial scaffold.

The positive half of this is a mechanism-level picture worth stating at capture grade: a closed angular-momentum metabolism in which the sea feeds the braid, the internal wake channel transfers the feed inner-to-middle, the middle's escapement absorbs the surplus and re-emits it as wake, and the outgoing wake drives the sea's orientation order. On this picture the braid is an open system in steady state with its bath: isolated matter runs down on the tangential clock, and matter needs its medium not for decoration but for metabolism. Claim level: native demonstration for the inner feed; estimate grade for the loop; the loop has not been closed self-consistently.

### Corridors Without Basins

The search did find static configurations whose *seed* ledgers close completely. A self-consistent static dressing exists in which every layer's total radial support lands inside the declared corridor (dressed rows $1.002/0.999/0.994$), and when the artificial lattice constraint is dropped the closing environment is not a lattice at all: the braid's own deficit map selects an octahedral cage of six neighbors with polar coverage — totals $1.001/0.996/0.994$, a solvation shell, braid-selected rather than lattice-imposed. The companion negative is exact: the cap credit is a polar-site quantity (the two on-axis neighbors carry all of it, the mid-latitude neighbors tax the middle), the FCC first coordination shell has no polar sites, and no FCC occupancy closes the corridor — **a braid cannot live at a lattice site of an FCC sea.** The stable object such a cage describes is really a braid-plus-cage complex, closer to a molecule in a solvent than to a particle in a lattice, and the cage carries its own reciprocity burden: the polar members that supply the cap credit receive its Newton-pair as an unsupported inward pull of $0.64$ of the corridor force scale, so the complex needs a bulk anchor or cage dynamics of its own.

Released, the strongest such configuration — corridor-complete, torque-equilibrated, polar-covering — produced the arc's cleanest negative principle. The seed corridor is **an equilibrium without a basin**: the near-field credit that closes the cap's ledger is an attraction with no restoring gradient, and the released cap falls into its own credit source an order of magnitude faster than the bare braid disperses (coherence lost at $0.09$ rotations against the bare braid's $0.83$). The same release produced the family's first upward rail loss — once the braid's axis begins to tip, the field-speed pin, defined transverse to that axis, does not recapture from above — and the first native nutation measurements on a released braid ($9.5°$ of axis tilt within one rotation). The principle generalizes and now binds candidate design: at static grade, corridor closure and dynamic confinement are not merely different questions; a force balance purchased from attractive near-fields actively purchases the capture failure mode. What a surviving realization needs is not balance but a **basin** — restoring gradients in every opened direction. Claim level: native retained-history measurements; the basin principle is the measured summary of the static-environment scope.

The basin question is now an instrument, not a slogan. The seed-grade radial stability matrix — the Jacobian of net radial force with respect to the slow radial coordinates at frozen rotation, with a negative-definite symmetric part as the sufficient restoring condition (the system is non-conservative, so this is not the curvature of any energy) — reproduces the held-cage capture in seconds: the dressed cage's spectrum carries a positive escape mode along exactly the cap-out/cage direction the native release followed, and the cage member's own coordinate is anti-restoring. It is the standing pre-tabling gate: no candidate is released natively without passing it. And it produced the arc's most consequential positive result: **the bare braid's shape block is a basin** — all three shape eigenvalues restoring, the first basin in the program's history. The bare braid is not balanced in the fitted-coupling frame (the sum rule caps its mean support below one), and its residual instability is a pure **dilation mode**: a uniform inward shortfall on all layers, contraction rather than dispersal.

The dilation mode then resolved, and the resolution rewrote the confinement question. Two corrections built the honest frame. First, quasi-static size changes must run at the **rail-pinned cadence**: during contraction the middle stays on the field-speed rail — the natively confirmed attractor — so the cadence responds to the radius through $\omega=c_f/(R_M\cos\alpha_M)$, and under that pin the wake supply scales as $1/\lambda^2$ against a need scaling as $1/\lambda$: the size mode acquires a restoring feedback. **The speed pin is also the size pin.** Second, the per-configuration coupling refit was a gauge that exactly absorbed the dilation gain — the mechanical content of the fitted-coupling sum rule, and the reason the size mode looked unbalanced in every earlier frame. With the coupling frozen once and the rail pin active, the bare braid has a **true radial equilibrium with a fully restoring basin**, at which every layer sits at full support by definition rather than by corridor hunt — the corridor search of the entire arc was the search for this fixed point through a gauge that hid it. The joint fixed point with the tangential ledger exists as a named self-equilibrated configuration: radial residuals at solver precision, restoring spectrum, inner and outer tangential rows at zero, the middle's rail pump left to the escapement — and **no environment at all**: the sea remains the braid's angular-momentum bath and cap support, but this object does not need it for its radial ledger.

Two consequences carry beyond the search. The braid's absolute size becomes a derived constant — the equilibrium rail radius lands at $R_M^{\mathrm{eq}}\approx3.5$ in units of $\kappa\epsilon^2/c_f^2$, the same scale family as the declared near-field floor of [Particle Masses](../assemblies/particle-masses.md), sitting well above that floor, so the arrest is coupling-scale self-support rather than discreteness rescue — an anchor for the mass-map program. And the closure metric and the force-ledger metrics now disagree openly (the self-equilibrated cell scores worse on closure than earlier corridor cells that dispersed), with the release arc's uniform verdict that the ledgers, not the closure residual, govern survival. Claim level: seed-grade instrument, quasi-static, single-time rigid booking; the axis and nutation modes — the named killer of the held-cage release — are not yet in the stability matrix, so a native release of the self-equilibrated cell must carry the axis-wobble watch and should expect it to be decisive.

### Where the Search Stands

The isolated braid's *fitted-gauge* release routes are measured and closed: circular, chart-booked, epicyclic, and statically dressed releases all expand or capture. The held-static environment scope is closed from both sides — the sea cannot statically scaffold the braid, and the braid-selected cage is not self-supporting. The frontier now leads with the **self-equilibrated bare braid**: the rail-pinned fixed point above, radially restoring with its tangential ledger closed and no environment, awaiting a native release whose decisive open question is the axis/nutation sector the stability matrix does not yet cover. Behind it, still live: the **co-orbital cage** (members trading the credit's inward pull against their own centripetal need), **bulk-boundary equilibrium** in a genuinely populated medium, and sea self-structure beyond driven response — a standing-phonon reading whose burden is formation history rather than response calculation. The durable positives that any route inherits: the field-speed pin as a native speed attractor — now understood to pin size along with speed — the escapement's coherence, the geometric elimination of the tangential brake, the sea's demonstrated inner feed, the stability-matrix pre-tabling gate, and the basin principle. And one theme recurs at every scale — escapement click phasing, sea spacing bands, reorientation rates, drift cadence — the delayed dynamics rewards commensurability: harmonic matching is the selection principle of this family from its geometry up through its medium.

## Candidate Status and Open Burden

The spindle braid is a named candidate family, not a retained branch. Its rest-state realizations do not self-support under native release, and its statically dressed realizations close their seed ledgers without possessing a basin. The family's definition, geometry, and symmetry structure survive every one of those results unchanged — each rejection has sharpened the search's knowledge of what a surviving realization must supply, and the open work is the confinement mechanism, not the family.

Whatever realization is proposed, the retention contract is the one stated in [Braid Recovery Requirements](braid-recovery-requirements.md) and the certificate target of [Neutral Braid](neutral-braid.md): the required rows must close on one ledger identity, and a favorable geometry, symmetry, or comparison diagnostic cannot rescue an open dynamics, action, or stability row. The alternative families collected in [Explored Braid Geometries](explored-braid-geometries.md) remain the comparison population that gives this candidacy its meaning, and any of them re-enters if the spindle route is decisively rejected.
