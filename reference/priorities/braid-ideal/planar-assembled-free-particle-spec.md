# §99 Planar Assembled Free Particle: Photon and Electron

**Date:** 2026-07-12

**Claim level:** seed-grade force-balance, charge, geometry, and pump screen;
the target stability and locking readings are retired as void; no
retained-branch acceptance

## Recovery adjudication — 2026-07-14

The force-balance precondition retires the Section 99 target stability and
local-locking row. The best photon replay has
$\epsilon_{\rm bind}=0.9922225625$ and the electron rest target has
$\epsilon_{\rm bind}=0.9999927135$, both far outside the declared $0.03$ gate.
The analytic symmetric-pair anchor remains a strong implementation test, but an
anchor cannot turn either screened target into an equilibrium. The non-bind,
charge, pump, causal-root, and planarity rows survive at T1 diagnostic scope;
the target eigenvalues and saddle readings are historical only. See the
[retirement evidence](evidence/section-99-stability-force-balance-retirement-2026-07-14.md).

**Runner:** `scripts/braid-ideal/planar-assembled-free-particle.mjs`

**Fixture:** `scripts/braid-ideal/planar-assembled-free-particle-fixture.mjs`

**Owner test:** `tests/braid-ideal-planar-assembled-free-particle.test.js`

## Decision target

This packet evaluates the free-particle candidate as one assembly from the start. No isolated-triple gate is present. The photon candidate is a neutral contra-rotating pro/anti planar pair with no payload. The electron candidate is the same pair plus six explicit electrino worldlines in the axial pocket, with charge

$$
Q=6\left(-\frac{|e|}{6}\right)=-1e.
$$

Every selected row is tested with one common coupling $\kappa_\star$. Native release remains fail-closed unless the same full assembly passes radial closure, pump cancellation, relative-coordinate locking, the full stability pencil, collision and root checks, and the explicit charge ledger.

## Production-root footing and pencil validation

Static rows use `AbsoluteHistoryRootRuntime.mjs` moving-circular production roots. Rate derivatives use retained linear segments whose roots are returned by the same production solver. The central solver is untouched.

The planar assembly pencil uses the active coordinates

$$
(\Delta\phi,\Delta z,R_{p,I},R_{p,M},R_{p,O},R_{a,I},R_{a,M},R_{a,O})
$$

and, for the electron, three additional arrangement-specific payload coordinates. The matrix multiplying $\lambda^2$ contains numerical integration weights only; it is not architrino ontology.

Before the search magnitudes are admitted, a hand-checkable instantaneous symmetric pair fixes the sign convention. For two conjugate binaries of radius $R$ and separation $d$, the relative-phase potential is

$$
V(\phi)
=
2\left[
-\frac{1}{\sqrt{d^2+4R^2\sin^2(\phi/2)}}
+\frac{1}{\sqrt{d^2+4R^2\cos^2(\phi/2)}}
\right].
$$

At $R=0.75$ and $d=1.4$, the analytic Hessian is $0.5402209218336725$, the numerical integration weight is $1.125$, and the expected frequency is $0.6929620299578214$. The pencil returns $0.6929620299578213$, an error of $1.11\times10^{-16}$. The anchor passes as an implementation control; it does not authorize a stability claim for a target that fails force balance.

Compatibility replays also pass at $10^{-9}$:

| Control | Reproduced row |
|---|---:|
| §92 free pair | $\operatorname{Re}\lambda=0.19885688497216406$ |
| §92 hard lock | $\operatorname{Re}\lambda=0.19629953398461314$ |
| §93 cross-coupled pair | $\Delta z=1.419842173795055$, $\Delta\phi=3.8435815410366416$, $\operatorname{Re}\lambda=5.304228260638436$ |
| §95 dressed pair | $Q=-1e$, $\operatorname{Re}\lambda=3.2077413497534404$, negative release verdict preserved |

## Exact coverage

The search exercised 380 complete assemblies.

| Object | Rows | Speeds | Payload coverage |
|---|---:|---|---|
| Photon | 60 | $u/c_f\in\{0,0.9,0.99,0.999,0.9999\}$ | none, by definition |
| Electron | 320 | $u/c_f\in\{0,0.25,0.5,0.75\}$ | column, ring of six, octahedron, two triangles; static, co-rotating, and counter-rotating where defined; payload scale factors $0.8$ and $1$ |

The pair schedule covered 12 photon and four electron pair configurations; occupancies $(2,2,2)$ and $(3,2,3)$; polarity-orientation patterns $(+,+,+)$ and $(+,-,+)$; relative phases $\{\pi,7\pi/6,4\pi/3,3\pi/2\}$; pocket widths $\{1.1,1.45\}$; two radius/frequency/stack schedules; proxy-sea off and on; and both pro–pocket–anti and anti–pocket–pro orderings. It did not exhaust the full Cartesian product.

Not exercised: a constitutive Noether sea, an explicit cap coordinate, the singular endpoint $u=c_f$, or native retained-history release. The sea-on rows use one explicitly labeled ambient proxy ring; they do not realize a constitutive sea law.

## Photon result

The best coarse photon row has $\kappa_\star=0.09446654050233466$, pump residual $3.71\times10^{-16}$, and binding residual $0.9916649426542679$. Its sampling ladder is

| Cycle samples | $\kappa_\star$ | $\epsilon_{\rm bind}$ | $|\tau_z|$ |
|---:|---:|---:|---:|
| 3 | $0.1240934380$ | $0.9823877638$ | $3.65\times10^{-16}$ |
| 6 | $0.1240934380$ | $0.9823877638$ | $2.95\times10^{-16}$ |
| 12 | $0.0918066564$ | $0.9893250830$ | $1.71\times10^{-16}$ |
| 24 | $0.0669851117$ | $0.9922225625$ | $1.46\times10^{-16}$ |

The null is not near the $0.03$ binding threshold and does not improve with the sampling ladder.

The same selected photon geometry was continued through every declared speed
rather than re-optimized at each speed. Every row has correct neutral charge
and converged causal roots, but every row fails binding. At $u/c_f=0.9999$, the
row has $\epsilon_{\rm bind}=0.9999005117$. Its historical frozen-target pencil
returned a phase/pocket saddle with symmetric eigenvalues
$(+0.0459749578,-0.1731764580)$ and
$\operatorname{Re}\lambda_{\rm lead}=+0.8610716517$, but those values carry no
stability authority after the force-balance failure. The rest row also fails
force balance, so no force-balanced rest-photon candidate was found in the
declared coverage; the near-$c_f$ continuation does not recover the photon.

## Electron result

The lowest coarse objective occurs for the scale-$0.8$ static column at $u/c_f=0.25$. It has the correct explicit charge and a small pump residual, but $\epsilon_{\rm bind}=0.9999997624$. The same rest-selected geometry and payload were continued through all four electron speeds.

At rest the row has

$$
\kappa_\star=6.3558550\times10^{-5},
\qquad
\epsilon_{\rm bind}=0.9999927135,
$$

The historical frozen-target pencil returned a phase/pocket saddle with
symmetric eigenvalues
$(+7.12958\times10^{-4},-2.01234\times10^{-4})$ and
$\operatorname{Re}\lambda_{\rm lead}=+0.8639279470$; these values are void as
stability and locking claims. Every boosted row retains correct charge and pump
cancellation but fails binding. The $3\to6\to12\to24$ replay keeps
$\epsilon_{\rm bind}$ within $3.1\times10^{-7}$ of one and does not expose a
coarse-sampling null.

## Confirmatory planarity sweep

The best coarse photon and electron configurations were replayed at 12 cycle samples with

$$
\alpha\in\{-0.05,-0.02,0,0.02,0.05\}.
$$

For the photon, the declared objective is minimized at $\alpha=0$ with $0.9893250829891368$; the nearest nonzero row is $0.9893549944295850$. For the electron, all five rows require nonpositive fitted coupling at this sampling grade, and the least-bad objective is again the planar row. Within this narrow confirmatory sweep, the planar family is preferred.

This is a planarity result only. The evaluator has no explicit cap degree of freedom, so the sweep does not establish a cap theorem. It also does not adjudicate the handedness relation $\chi=\operatorname{sign}(p\cdot S)$, because the cap dipole $p$ is absent from the modeled object.

## Decision

Decision: `neither_planar_assembly_closes_in_declared_geometry_payload_and_proxy_sea_coverage`.

The photon and electron charge ledgers close, and some rows cancel the net pump,
but neither object reaches radial closure. Because the targets are not
equilibria, their relative-coordinate and full-spectrum readings are not
stability verdicts. No native retained-history release is authorized.
`retainedBranchClaim=false`; `scoreMovement=no_score_increase`.

This is a negative result for the declared planar geometry, explicit payload families, and proxy-sea coverage. It is not evidence that a constitutive Noether sea law has failed, and it does not establish that the constitutive law is the sole remaining lever. Promotion classification: priority-only; no reader-facing corpus claim is earned.

Reproduce: `node scripts/braid-ideal/planar-assembled-free-particle.mjs --pretty`
Owner test: `node --test tests/braid-ideal-planar-assembled-free-particle.test.js`
