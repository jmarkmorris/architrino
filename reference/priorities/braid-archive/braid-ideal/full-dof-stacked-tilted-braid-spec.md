# §97 Full-DOF Stacked/Tilted Braid Search

**Date:** 2026-07-12

**Claim level:** seed-grade production-root search; no retained-branch acceptance

**Runner:** `scripts/braid-ideal/full-dof-stacked-tilted-braid.mjs`

**Fixture:** `scripts/braid-ideal/full-dof-stacked-tilted-braid-fixture.mjs`

**Owner test:** `tests/braid-ideal-full-dof-stacked-tilted-braid.test.js`

## Closure target

Treat the §96 flat stack and the tilted spindle as two configurations of one evaluator. A ring configuration declares $R_i$, $omega_i$, $alpha_i$, $z_i$, $phi_i$, rotation sense, polarity orientation, and two-site or three-site occupancy. The global configuration declares axial drift, handedness, payload metadata, ambient-sea metadata, and whether same-source roots are active. Eccentricity, breathing, axis misalignment, non-rigid axial amplitude, three-site rings, and ambient-sea response are represented in the schema but remain defaulted off in this pass.

For each antipodal binary, the two sites follow

$$
\mathbf x_{i,s}(t)
=
\begin{pmatrix}
sR_i\cos\alpha_i\cos(\sigma_i\omega_i t+\phi_i)\\
sR_i\cos\alpha_i\sin(\sigma_i\omega_i t+\phi_i)\\
z_i+sR_i\sin\alpha_i+ut
\end{pmatrix},
\qquad s\in\{+1,-1\}.
$$

Thus $alpha_i=0$ gives a planar ring at axial position $z_i$, while nonzero $alpha_i$ gives the signed axial offsets of the tilted-spindle family. Static rows use all roots returned by the production moving-circular API. When the total site speed exceeds $c_f$, the same-source production-root API is also evaluated. Tilt-rate rows are bracketed by retained linear segments, but every retained root is returned by the production API. The central runtime is unchanged.

## Score and gates

The search metric fits one radial coupling,

$$
\kappa_\star
=
\frac{\mathbf f_r\cdot\mathbf a_r^{\rm req}}
{\mathbf f_r\cdot\mathbf f_r},
\qquad
\epsilon_{\rm bind}
=
\frac{\|\kappa_\star\mathbf f_r-\mathbf a_r^{\rm req}\|_2}
{\|\mathbf a_r^{\rm req}\|_2}.
$$

It then measures the complete-record axial torque and the tilt/axis-sector pencil. The diagonal second-order coefficients are numerical weights, not architrino ontology. The search objective is

$$
J
=
\epsilon_{\rm bind}
+|\tau_z|
+\max(0,\operatorname{Re}\lambda_{\rm lead}).
$$

The fail-closed gates are $kappa_\star>0$, $epsilon_{\rm bind}\le0.03$, $|\tau_z|\le0.02$, and $\operatorname{Re}\lambda_{\rm lead}\le10^{-6}$. The pro/anti lock and payload phases run only after all single-triple gates pass.

## Control reproduction

The evaluator has explicit legacy-control modes because the two earlier packets used different declared coupling fits. The §96 control uses its radial fit and original no-self-hit record. It reproduces

$$
\epsilon_{\rm bind}=0.0492298548241,
\qquad
\tau_z=13.3762195778,
\qquad
\operatorname{Re}\lambda_{\rm flutter}=0.735415180399.
$$

The tilted-spindle control uses its original representative-site full-vector coupling fit and full gyroscopic axis pencil. It reproduces

$$
\tau_z=0.424030029234,
\qquad
\operatorname{Re}\lambda_{\rm flutter}=0.198856884972.
$$

Both control comparisons pass at $10^{-9}$. Search rows do not inherit either compatibility label: they use the §97 radial fit and enable same-source roots from total site speed. This distinction prevents the legacy controls from silently changing while keeping the new search record complete under its declared rule.

## Declared staged coverage

The single-triple search evaluates $105$ distinct points:

- two corner seeds;
- $27$ rational per-ring frequency combinations around each seed, with multipliers $\{0.75,1,1.25\}$;
- two coordinate passes over each free ring phase with offsets $\{-\pi/3,-\pi/6,0,\pi/6,\pi/3\}$;
- each ring independently sampled at tilt fractions $\{0,0.25,0.5,0.75,1\}$ of its spindle tilt;
- each ring independently placed at total site-speed ratios $1.05$ and $1.20$; all six supra-field rows return same-source roots;
- twelve deterministic random restarts over frequency multipliers $[0.6,1.4]$, phase offsets $[-\pi,\pi]$, and tilt fractions $[0,1]$.

All $105$ rows receive bind and pump evaluation. The best three receive the full tilt/axis-sector pencil. This is a staged local search, not an exhaustive covering of the continuous parameter space.

## Measured verdict

The best fully scored point descends from the spindle seed. Its common cadence is $0.781169702964$, its middle tilt is flattened, and its outer phase is $5.40179403492$. It gives

$$
\kappa_\star=0.221642672331,
\qquad
\epsilon_{\rm bind}=0.118508409171,
\qquad
\tau_z=0.0988703712292,
$$

and

$$
\operatorname{Re}\lambda_{\rm lead}=0.721318143353,
\qquad
\operatorname{Re}\lambda_{\rm flutter}=0.436644289848,
\qquad
J=0.938696923753.
$$

It fails bind, pump freedom, and flutter freedom. All three fully scored finalists fail all three gates. The persistent blockers on that shortlist are therefore `bind`, `pump`, and `flutter`; flutter is not removed by the best bind/pump compromise.

The pair and payload phases are gated and were not run. No native retained-history release is authorized. The result is evidence against the sampled local region, not proof that the stacked/tilted continuum is intrinsically unstable or pumped.

## Unswept region and next axis

The pass does not cover simultaneous six-ring pro/anti optimization, payload internal configurations, eccentricity or breathing, tumble, non-rigid axial modes, three-site rings, ambient-sea response, or a continuous global optimizer over all radii, gaps, cadences, phases, and tilts. The highest-value next bare-geometry axis is a simultaneous continuous optimization of radii and axial gaps together with cadence, phase, and tilt. Those variables were held at their corner values or opened one coordinate family at a time here; their correlated movement is the largest remaining gap before adding the pair or payload.
