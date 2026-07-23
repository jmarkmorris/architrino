# Generalized Family-B Common-Axis Train Analytics

Status: exact train chart implemented. The bounded prescribed-path pilot measured on 2026-07-22 is historical diagnostic evidence only: it instantiated $c_f=4$, whereas current workspace policy requires $c_f=1$. Its twelve rejected rows characterize those twelve protocol rows and do not close, rank, or negatively adjudicate the generalized train configuration space.

Claim grade: the coordinate, dimension-extension, and causal-delay reductions are derived from the declared exact paths. The numerical rows are measured historical diagnostics from the prescribed-path evaluator. Comparisons below apply only to that bounded legacy sample and cannot support a current Family-B recommendation before a $c_f=1$ rerun.

## Scope And Taxonomy Boundary

The operator supplied a drawing dated 2021-01-02 with twelve ordered orbital traces along one axis and an orbit-radius envelope that grows toward the center and contracts toward the ends. The drawing supplies two admissible source signals:

- an ordered common-axis train;
- a source-inspired central radius envelope.

The drawing does not determine polarity, phase, circulation, frequency, binary counterpart pairing, or payload placement. Red and blue drawing colors and the visible point locations do not carry those declarations.

This lane is an operator-directed generalization of Family B. The six-orbital chart contains canonical B1 as an exact coordinate submanifold and, in its nearest generalization, adds relative binary-midpoint dimensions without changing the three-binary inventory or common-axis relation. This priority packet does not itself change the canonical taxonomy:

- canonical B1 remains three neutral binaries about one common midpoint;
- the six-orbital single train is a generalized Family-B coordinate chart whose common-midpoint locus is B1;
- the twelve-orbital train is composed analytically from two six-orbital components and may be a componentwise coordinate extension of Family C when pairings remain internal;
- `payload architrino` means one explicitly declared prescribed architrino worldline associated with one adjacent core-orbital pair. It does not mean an Accessory Configuration, captured architrino, axial layer, or another established assembly component.

The campaign evaluates fixed worldlines only. It does not invoke path evolution, the EOM solver, perturbation evolution, stability linearization, or a retained-history handoff.

## B1 Submanifold And Midpoint-Dimension Extension

Fix the three neutral binary pairs and label their two orbital paths by $(a,+)$ and $(a,-)$ for $a\in\{1,2,3\}$. Every pair of axial coordinates has the exact decomposition

$$
b_a=\frac{\xi_{a,+}+\xi_{a,-}}{2},
\qquad
h_a=\frac{\xi_{a,+}-\xi_{a,-}}{2},
$$

so that

$$
\xi_{a,+}=b_a+h_a,
\qquad
\xi_{a,-}=b_a-h_a.
$$

When the two paths also obey the B1 polarity-conjugate, antipodal, common-frequency, and common-circulation relations, they may be written

$$
\mathbf X_{a,+}(T)
=
\mathbf C(T)
+b_a\hat{\mathbf n}_B
+h_a\hat{\mathbf n}_B
+\rho_a\mathbf u_a(T),
$$

$$
\mathbf X_{a,-}(T)
=
\mathbf C(T)
+b_a\hat{\mathbf n}_B
-h_a\hat{\mathbf n}_B
-\rho_a\mathbf u_a(T),
$$

where

$$
\mathbf u_a(T)
=
\cos\theta_a(T)\hat{\mathbf e}_1
+\sin\theta_a(T)\hat{\mathbf e}_2.
$$

Canonical B1 is the exact locus

$$
b_1=b_2=b_3=0.
$$

If $b_1=b_2=b_3=b$, the common value is absorbed into the braid center by $\mathbf C(T)\mapsto\mathbf C(T)+b\hat{\mathbf n}_B$, so this also represents the same intrinsic B1 geometry. After quotienting out that common translation, allowing independent binary midpoints adds only two intrinsic continuous coordinates, for example

$$
\beta_1=b_2-b_1,
\qquad
\beta_2=b_3-b_1.
$$

Equivalently, six ordered axial coordinates modulo one common shift contain five intrinsic axial coordinates: the three B1 half-separations $(h_1,h_2,h_3)$ plus two relative-midpoint coordinates $(\beta_1,\beta_2)$. This nearest train generalization is therefore a dimension extension of B1, not evidence for a new topological family.

For a twelve-core train with fixed internal pairings, the same decomposition applies independently to each six-core component. Relative component displacement already belongs to the Family-C composition chart; relaxing the three common-midpoint equalities inside each component adds two intrinsic midpoint coordinates per component. Payload worldlines are different: adding them changes the declared source inventory and is not merely a dimension extension.

## Exact Common Coordinate System

Use one right-handed orthonormal frame

$$
\left(
\hat{\mathbf n},
\hat{\mathbf e}_1,
\hat{\mathbf e}_2
\right),
$$

where $\hat{\mathbf n}$ is the oriented translation axis. Let

$$
N_o=6
$$

for a single train and

$$
N_o=12
$$

for a dual train. Assign persistent orbital indices

$$
m\in\{1,\ldots,N_o\}
$$

and ordered axial coordinates

$$
\xi_1<\xi_2<\cdots<\xi_{N_o}.
$$

The primary spacing coordinates and total train length are

$$
d_m=\xi_{m+1}-\xi_m>0,
\qquad
\mathbf d=(d_1,\ldots,d_{N_o-1}),
$$

$$
L_{\mathrm{train}}=\xi_{N_o}-\xi_1.
$$

For prescribed group-translation speed $s_{\mathrm{grp}}$,

$$
\mathbf C_m(T)
=
\mathbf C_0
+s_{\mathrm{grp}}T\hat{\mathbf n}
+\xi_m\hat{\mathbf n},
$$

with the first analytical domain restricted to

$$
0\le s_{\mathrm{grp}}<c_f.
$$

No observer-level propagation speed is inserted as a premise. Core orbital $m$ is

$$
\mathbf X_m(T)
=
\mathbf C_m(T)
+\rho_m
\left[
\cos\theta_m(T)\hat{\mathbf e}_1
+\sin\theta_m(T)\hat{\mathbf e}_2
\right],
$$

$$
\theta_m(T)=q_m\omega_mT+\phi_m,
\qquad
q_m\in\{+1,-1\}.
$$

Every pilot frequency makes an integer number of turns over the declared return period. The exact source record stores the frame, $\mathbf d$, $L_{\mathrm{train}}$, every $\rho_m$, $\omega_m$, $\phi_m$, $q_m$, polarity, component assignment, and source hash.

## Counterpart And Component Maps

The binary-counterpart map is a fixed-point-free involution:

$$
\pi(\pi(m))=m,
\qquad
\pi(m)\ne m.
$$

The adjacency reference uses

$$
\pi_{\mathrm{adj}}
=
(1\ 2)(3\ 4)(5\ 6)
$$

for the single train and

$$
\pi_{\mathrm{adj}}
=
(1\ 2)(3\ 4)(5\ 6)
(7\ 8)(9\ 10)(11\ 12)
$$

for the dual train. The crossed-pairing control keeps pairings internal to each component but uses

$$
\pi_{\mathrm{cross}}
=
(1\ 6)(2\ 5)(3\ 4)
(7\ 12)(8\ 11)(9\ 10).
$$

Each pair is polarity neutral. The machine record separately declares its radii, frequency relation, phase relation, circulation relation, axial midpoint, axial separation, and exact constraint. Changing only $\pi$ does not change acceleration because the master-equation evaluator reads declared paths and polarities, not a semantic pairing label. A future pairing-effect test must alter the paired worldline relations before a dynamical difference can be attributed to pairing.

The dual train has

$$
\mathcal B^{(1)}=\{\mathbf X_1,\ldots,\mathbf X_6\},
\qquad
\mathcal B^{(2)}=\{\mathbf X_7,\ldots,\mathbf X_{12}\}.
$$

The pilot orders $\mathcal B^{(1)}$ before $\mathcal B^{(2)}$, keeps counterpart pairs internal to each component, uses equal frequencies, and makes the two components counter-rotate with relative phase $\pi$. Co-rotating, rational-frequency, reflection-conjugate, and mismatched component strata remain declared Monte Carlo coordinates rather than inferred properties of the drawing.

## Payload Map And Exact Worldlines

For $N_o=12$, define six adjacent-pair slots

$$
P_k=(2k-1,2k),
\qquad
k=1,\ldots,6,
$$

with midpoint

$$
\mu_k=\frac{\xi_{2k-1}+\xi_{2k}}{2}.
$$

Payload worldline $k$ is

$$
\mathbf Y_k(T)
=
\mathbf C_0
+s_{\mathrm{grp}}T\hat{\mathbf n}
+(\mu_k+\epsilon_k)\hat{\mathbf n}
+a_k\hat{\mathbf e}_1
+b_k\hat{\mathbf e}_2
+\rho_{Y,k}
\left[
\cos\psi_k(T)\hat{\mathbf e}_1
+\sin\psi_k(T)\hat{\mathbf e}_2
\right],
$$

$$
\psi_k(T)=q_{Y,k}\omega_{Y,k}T+\phi_{Y,k}.
$$

The pilot midpoint stratum uses $\epsilon_k=a_k=b_k=0$, six payload radii $\rho_{Y,k}=0.07$, common return frequency, and alternating polarity so the payload inventory is neutral. Each payload record declares polarity, offsets, radius, frequency, phase, circulation, component, adjacent slot, and reflection relation. The full source-inspired inventory is twelve core orbitals plus six payload architrinos, for eighteen declared worldlines.

The payload map $P_k$ and binary map $\pi$ are separate machine fields. The crossed-pairing control changes $\pi$ while preserving $P_k$.

## Exact Causal-Delay Equations

Write any prescribed source path as

$$
\mathbf Z_a(T)
=
\mathbf C_0
+s_{\mathrm{grp}}T\hat{\mathbf n}
+\zeta_a\hat{\mathbf n}
+\boldsymbol\delta_a(T).
$$

For transmitter $a$ at $T-u$ and receiver $b$ at $T$, every retained positive delay satisfies

$$
\left\|
\left(
\zeta_b-\zeta_a+s_{\mathrm{grp}}u
\right)\hat{\mathbf n}
+\boldsymbol\delta_b(T)
-\boldsymbol\delta_a(T-u)
\right\|
=c_fu,
\qquad
u>0.
$$

This one equation supplies all four interaction classes:

### Core To Core

$$
\left\|
\left(
\xi_b-\xi_a+s_{\mathrm{grp}}u
\right)\hat{\mathbf n}
+\mathbf r_b(T)
-\mathbf r_a(T-u)
\right\|
=c_fu.
$$

### Core To Payload

$$
\left\|
\left(
\mu_k+\epsilon_k-\xi_a+s_{\mathrm{grp}}u
\right)\hat{\mathbf n}
+\boldsymbol\delta_{Y,k}(T)
-\mathbf r_a(T-u)
\right\|
=c_fu.
$$

### Payload To Core

$$
\left\|
\left(
\xi_b-\mu_k-\epsilon_k+s_{\mathrm{grp}}u
\right)\hat{\mathbf n}
+\mathbf r_b(T)
-\boldsymbol\delta_{Y,k}(T-u)
\right\|
=c_fu.
$$

### Payload To Payload

$$
\left\|
\left(
\mu_\ell+\epsilon_\ell-\mu_k-\epsilon_k+s_{\mathrm{grp}}u
\right)\hat{\mathbf n}
+\boldsymbol\delta_{Y,\ell}(T)
-\boldsymbol\delta_{Y,k}(T-u)
\right\|
=c_fu.
$$

Binary-counterpart, adjacent non-counterpart, same-component, and cross-component rows differ only by the declared index restrictions and source metadata. They use the same exact root equation.

## Symmetry And Closed-Form Boundary

The equation is exact but generally transcendental because $u$ occurs inside the transmitter phase. The following reductions are permitted:

- If the transmitter has no transverse motion, the reception-time transverse displacement is constant and squaring yields a quadratic equation in $u$.
- If both paths are axial and stationary in the co-translating chart, the positive root reduces to the appropriate branch of

  $$
  \left|\Delta\zeta+s_{\mathrm{grp}}u\right|=c_fu.
  $$

- Equal frequency, equal radius, phase conjugacy, and reflection symmetry can pair contribution rows or reduce the number of distinct scalar equations. They do not generally remove the retarded phase $\omega u$.
- Rational frequencies supply a finite common return period. They do not by themselves make an individual causal root algebraic.
- Reflection and component conjugacy can cancel or duplicate complete-cycle reductions only when the exact transform and probe mapping are declared.

Every rotating sector in the pilot therefore uses certified enumeration of all retained simple roots in the strict sub-field-speed domain. The source-speed certificate also excludes a positive-delay same-source root: the path length traveled by the same source is strictly smaller than $c_fu$. The residual is consequently complete over the declared core-plus-payload source inventory, while Noether-sea and undeclared contributions remain outside the claim.

## Acceleration Residuals

For every core and payload worldline,

$$
\mathbf R_a(T)
=
\ddot{\mathbf Z}_a^{\mathrm{prescribed}}(T)
-\mathbf A_a^{\mathrm{ME}}(T).
$$

The reducer reports

$$
R_{\parallel,a}
=
\mathbf R_a\cdot\hat{\mathbf n},
$$

$$
R_{r,a}
=
\mathbf R_a\cdot\hat{\mathbf e}_{r,a}(T),
\qquad
R_{\theta,a}
=
\mathbf R_a\cdot\hat{\mathbf e}_{\theta,a}(T),
$$

with the radial and positive-phase tangential basis taken from the exact trajectory. For each projection it retains pointwise rows, signed cycle average, RMS, maximum absolute value, primary/refined comparison, and source-resolved root contributions.

A row must converge in all three projections. Convergence does not mean the residual is small, and neither condition means stability, retention, binding, or realization.

## Pilot Protocol

The implemented protocol is

`src/prescribed-path-analysis/protocols/generalized-family-b-pilot-protocol.v1.json`.

Its predeclared coordinates and controls include:

- geometry class: six-core single or twelve-core dual;
- payload count: zero or six in the measured pilot, with zero or three available for single scaling controls;
- ordered spacings and train length;
- equal spacing, nonuniform spacing, and held-in seeded perturbations;
- source-inspired central envelope, equal radius, and reflection-broken controls;
- phases, radii, frequencies, circulation, component phase, and component ordering;
- adjacency and crossed counterpart maps;
- payload midpoint, axial-offset, transverse-offset, polarity, and randomized-placement strata;
- $s_{\mathrm{grp}}/c_f=0.025$ in the pilot;
- fixed seed `20210102`, one neighborhood sample per reference, and held-out seed `20210103`;
- primary/refined cycle grids of $8/16$ time samples and $4\times8/6\times12$ angular samples;
- root tolerance $10^{-12}$, refined root tolerance $10^{-14}$, root-transversality floor $10^{-8}$, and minimum-separation floor $0.02$.

The probability measures are uniform over the declared bounded spacing, radius, and phase perturbations. Categorical geometry, payload, pairing, circulation, reflection, and frequency strata are compared separately. There is no global score.

The analytical objective vector contains root completeness, root margin, minimum separation, three complete-cycle residual projections, residual refinement, spacing sensitivity, exterior exposure, wake-flux cancellation, anisotropy, peak exterior response, matched payload benefit, and numerical uncertainty. Hinge and action/angular-momentum rows remain diagnostic-only.

## Measured Pilot Result

Instrument: `evaluatePrescribedRecordAnalysis({ sourceRecord, protocol })` through the generalized Family-B complete-cycle campaign reducer. Grade: measured prescribed-path analytics.

Current disposition: historical diagnostic only. The protocol used $c_f=4$, fixed $s_{\mathrm{grp}}/c_f=0.025$, stationary exterior probe surfaces, six reference rows, and one seeded neighbor per reference. It did not sweep $c_f=1$ translation speeds, absolute train-to-probe offsets, the full independent spacing vector, the full phase-radius-frequency chart, or the legal discrete pairing sectors. Twelve rows in this space are not an exhaustive search, a representative Monte Carlo census, or evidence that the generalized train idea is unfavorable.

The campaign evaluated six references and one seeded neighborhood sample around each reference:

- total rows: 12;
- independently accepted: 0;
- diagnostic-only rejected: 12;
- database integrity: `ok`;
- database fingerprint: `1933870fea7dbd9d0c703d0ecb31e0aa2afbda60442f6ab4f1729441fc2f7fe6`;
- manifest hash: `1a8b5c951fe843530eebf16c3ef4432adeee5b5d106b059e582f68beaa7073df`;
- summary hash: `0b090554d36801ce34e767a556df7613a472a31402e612be9b37beefaf2aac5c`;
- independent campaign evidence hash: `7201b921f3fa7b5552308b23008def10628ec5b018ea9b9ce4fcd71bb7c18d47`;
- database-generation hash: `eeddf19f84b29b78a84b21a775e3a907ea1f4f011f8855ff3d1aa46913183216`;
- deterministic export inventory hash: `b84c8d6cda6395ea24f7244dc33decf81306f5d980066c7f514f9b0a5681bbcc`, reproduced identically in two exports;
- measured candidate evaluation time: $267.583$ seconds;
- measured database size: $1{,}070{,}960{,}640$ bytes.

The live local artifacts are:

- `.local-data/braid-analysis/generalized-family-b-pilot/`;
- `.local-data/braid-analysis/generalized-family-b-pilot.sqlite`.

### Reference Objective Rows

| Reference | Axial RMS | Radial RMS | Tangential RMS | Exterior $\eta_{\mathrm{ext}}$ | Wake-flux $\eta$ | Residual refinement |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| single central envelope | 4.3232 | 6.1265 | 1.1216 | 0.012320 | 0.082762 | pass |
| dual central envelope, no payload | 7.6049 | 7.5035 | 2.7771 | 0.009352 | 0.067036 | fail |
| dual central envelope, six payloads | 27.0090 | 23.3130 | 21.1213 | 0.007991 | 0.059656 | fail |
| dual equal radius, no payload | 7.2499 | 5.0437 | 3.2437 | 0.010308 | 0.070041 | fail |
| dual reflection broken | 6.2323 | 8.3596 | 2.6098 | 0.009408 | 0.066972 | fail |
| dual crossed pairing, six payloads | 27.0090 | 23.3130 | 21.1213 | 0.007991 | 0.059656 | fail |

Every row also failed the outer-surface quadrature and spacing-sensitivity acceptance gates. The single reference and its seeded neighbor converged in the three internal residual projections, but their residual magnitudes remained nonzero and their required outer/sensitivity gates failed. This is a finite-width region of reproducible residual evaluation, not a finite-width acceleration-balance region.

### Matched Payload Difference

For the exact six-payload minus no-payload dual pair,

| Measure | No payload | Six payloads | $\Delta G_{\mathrm{payload}}$ |
| --- | ---: | ---: | ---: |
| axial residual RMS | 7.6049 | 27.0090 | +19.4041 |
| radial residual RMS | 7.5035 | 23.3130 | +15.8095 |
| tangential residual RMS | 2.7771 | 21.1213 | +18.3442 |
| minimum root margin | 3.66149 | 3.66149 | 0 |
| exterior $\eta_{\mathrm{ext}}$ | 0.009352 | 0.007991 | -0.001361 |
| wake-flux $\eta$ | 0.067036 | 0.059656 | -0.007380 |

Lower exterior ratios improved, but all three internal residual objectives degraded sharply. The six midpoint payloads therefore do not provide a multi-objective payload benefit.

### Control Comparisons

- Inferred from measured rows: the single central-envelope reference has smaller axial, radial, and tangential residual RMS than the matching dual central-envelope reference, but worse exterior ratios.
- Inferred from measured rows: the central radius envelope does not outperform equal radius. Equal radius improves axial and radial residual RMS but worsens tangential residual RMS and exterior ratios.
- Inferred from measured rows: reflection symmetry does not dominate the adverse control. Breaking reflection improves axial and tangential RMS but worsens radial RMS.
- Derived from source identity: changing only the binary map leaves the exact worldlines unchanged, so the adjacency and crossed-map rows are identical. This kills any claim that a semantic pairing label alone controls wake balance.
- Measured: every root ledger is complete and transverse in the certified sub-field-speed domain. Root completeness is not the failed physical discriminator in this pilot.

## Hinge, Action, And Angular-Momentum Disposition

No hinge candidate is reported. The pilot differentiates one grouped spacing coordinate, not the full phase-radius-frequency-spacing-payload Jacobian after global-phase removal. It therefore cannot establish a coordinate-robust orbital, binary, adjacent-pair, or payload hinge.

No action organization is reported because the prescribed-path stack does not yet contain an independently accepted particle-plus-wake action reducer.

The separately implemented axial angular-momentum diagnostic evaluates the per-unit-$\mu_{\mathrm{arch}}$ mechanical term plus the integrated declared-source axial moment of acceleration with a zero wake datum at the cycle start. It inserts neither $h$ nor $\hbar$. Primary/refined rows are not used as an acceptance gate, and no plateau, integer family, photon spin, or quantization claim is made.

## Recommendation

Do not use the legacy pilot to accept or reject the generalized train idea, rank its configuration classes, or decide its taxonomy location. No measured pilot row passed its historical protocol, but that local result is not a negative Family-B finding.

Retain at least these three configuration classes as regression anchors inside a much larger $c_f=1$ search:

1. the six-core single central-envelope reference, because its residual projections and its seeded neighbor reproduce under time refinement;
2. the twelve-core equal-radius no-payload control, because it defeats the central envelope on axial and radial residual RMS and therefore remains a necessary falsifier;
3. the twelve-core central-envelope no-payload reference, as the matched baseline for future spacing and payload studies.

Keep the six midpoint-payload geometry as a matched payload control rather than treating its one historical comparison as a general payload verdict. Do not treat the crossed pairing as a distinct acceleration geometry until the paired path relations differ.

The next analytical search should first establish the B1-submanifold embedding at $c_f=1$, then open the two relative-midpoint dimensions $(\beta_1,\beta_2)$ while retaining the existing B1 coordinates $(h_a,\rho_a,\phi_a,\omega_a)$. Only a predeclared bounded domain with adequate space-filling coverage, held-out samples, co-translating exterior probes, and refinement may close that searched domain negative.

## Explicit Falsifiers

- **Spacing-dependent wake balance:** reject if no finite-width region passes all three residual projections and spacing perturbations, or if the region disappears under held-out seeds or refinement.
- **Payload benefit:** reject if the exact matched payload difference improves exterior cancellation only by degrading an internal residual, root, separation, or uncertainty objective.
- **Hinge structure:** reject if multiple indices are equivalent within uncertainty, the index changes with refinement or coordinates, or the result depends on ordering or tuned weights.
- **Action or angular-momentum organization:** reject if an independently authored reducer disagrees, held-out samples erase the pattern, or sampling-measure changes move the apparent family.

## Promotion Routing

The exact common-axis source and delay equations may be promoted into the reader-facing analysis methodology without changing canonical Family-B taxonomy. The B1-submanifold and midpoint-dimension reduction remains priority-only pending operator disposition of the taxonomy boundary. The legacy measured campaign remains historical priority evidence and cannot support a current candidate verdict.
