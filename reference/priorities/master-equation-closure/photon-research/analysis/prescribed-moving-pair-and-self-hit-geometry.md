# Prescribed moving-pair and self-hit geometry

This analysis follows two prescribed planar three-binary braids translated along one axis, together with a declared receiver path. When all three binary layers are enabled in both braids, the internal inventory is twelve architrinos. Each enabled layer contributes one positrino and one electrino. The equations specify trajectories and their causal interception geometry; they do not show that the unchanged Master Equation evolves or retains those trajectories as a photon.

The paths and historical diagnostics originate in the [Photon app manuscript](../../../app-photon/manuscript.md). The app's signal speed $c_{\mathrm{sig}}$ is a configurable diagnostic parameter, while $c_\gamma$ specifies translation of the supplied pair. Comparison with the unmodified primitive causal-root equation requires $c_{\mathrm{sig}}=c_f$. New numerical instantiations use $c_f=1$. Historical sweep rows retain their recorded signal-speed settings and are not all unmodified-Master-Equation calculations.

Here $t$ is reception time and $\tau$ is earlier source time, both measured in absolute time. The Virtual Observer, abbreviated VO, is the prescribed receiver location used to inspect arrivals; it is not a dynamically modeled material detector. The layer indices I, M and O denote Inner, Middle and Outer binary layers. Enabling fewer layers changes the declared source inventory. The following geometry retains the app's role and orientation conventions so its prescribed record remains identifiable.

Claim grade: **derived** for the stated kinematic identities and conditional interception relations on the supplied paths; **measured historical diagnostic** for the finite sweep, as reported by its named instrument and receipt; **guessed conditional hypothesis** for the formation-geometry response. No EOM-retained carrier, stability theorem or photon identification follows. A path failing the declared geometry, an omitted admitted root, or a mismatch with the preserved sweep receipt would overturn the corresponding scoped claim.

## 1. Prescribed pair and orbital phase

Propagation is along the positive absolute-space x axis. The transverse plane has y and z axes. The trailing braid appears on the left of the face-on display and rotates counter-clockwise; the leading braid appears on the right and rotates clockwise. These roles are declared in state, rather than inferred from an arbitrary screen location. Each active binary contributes a red positrino and a blue electrino on opposite sides of its circular orbit.

For braid role $s$, layer $\ell$ and polarity $q$, define the orbital phase at source time $\tau$ by

$$
\theta_{s\ell q}(\tau)=\phi_{s\ell}+\sigma_s2\pi f_{s\ell}\tau+\pi\mathbf 1_{q=-1},
\qquad q\in\{+1,-1\},\quad \ell\in\{I,M,O\}.
$$

Here the trailing role has rotation sign $\sigma_s=+1$ and the leading role has $\sigma_s=-1$. The phase offset $\phi_{s\ell}$, frequency $f_{s\ell}$ and radius $R_{s\ell}$ belong to the particular braid layer; enabling or disabling it changes both its markers and its contribution rows. The whole face-on braid does not rotate as a rigid image.


## 2. Absolute histories and the comparison chart

Let the declared pair separation be nonnegative. The trailing and leading offsets in the moving chart are

$$
\chi_{\mathrm{trailing}}=-\frac{\Delta x}{2},\qquad
\chi_{\mathrm{leading}}=+\frac{\Delta x}{2}.
$$

With a common origin, photon-channel translation speed, and explicit receiver offset, the prescribed absolute histories are

$$
\mathbf r_{s\ell q}(\tau)=\mathbf X_0+c_\gamma\tau\hat{\mathbf x}
+\chi_s\hat{\mathbf x}
+R_{s\ell}\cos\theta_{s\ell q}(\tau)\hat{\mathbf y}
+R_{s\ell}\sin\theta_{s\ell q}(\tau)\hat{\mathbf z},
$$

$$
\mathbf X_{\mathrm{VO}}(t)=\mathbf X_0+c_\gamma t\hat{\mathbf x}
+\chi_{\mathrm{VO}}\hat{\mathbf x}
+y_{\mathrm{VO}}\hat{\mathbf y}+z_{\mathrm{VO}}\hat{\mathbf z}.
$$

The observer's offset remains an input; placing it at the leading center is a possible declared geometry, not an automatic assumption. In absolute-history mode, both source centers and receiver translate before the roots are solved. In the co-moving comparison, the centers and receiver instead remain fixed at their app-frame offsets. The latter is a different prescribed-history calculation, not a coordinate transformation that recovers the moving calculation by relabeling its roots.


## 3. Arrival roots and catch-up geometry

For each enabled source and reception time, the app solves the distance-delay equation for positive delays:

$$
F_i(t;\tau)=\|\mathbf X_{\mathrm{VO}}(t)-\mathbf r_i(\tau)\|
-c_{\mathrm{sig}}(t-\tau)=0,\qquad \tau<t.
$$

The histories, signal speed, scan interval and numerical policy are declared inputs. A search retains the roots it resolves under those inputs. A finite scan cannot establish that no root exists throughout an unbounded past, and an exact sum over retained roots does not certify that the scan retained every relevant root.

Write the root delay as $u=t-\tau$. Its longitudinal separation is

$$
D_x(u)=\chi_{\mathrm{VO}}-\chi_s+c_\gamma u.
$$

For a source behind the receiver, a positive longitudinal gap and small transverse separation give the catch-up scale

$$
u\sim\frac{\chi_{\mathrm{VO}}-\chi_s}{c_{\mathrm{sig}}-c_\gamma},
\qquad c_{\mathrm{sig}}>c_\gamma.
$$

This conditional approximation explains why a small positive speed margin can demand very old source history. At equal speeds, a strictly positive longitudinal gap alone prevents a positive-delay interception for this prescribed translating geometry. That elementary special-case obstruction is stronger than a bounded numerical scan label and must be justified by its geometry, rather than inferred from the label.

For equal longitudinal offsets and a fixed nonzero transverse separation magnitude, the corresponding special-case equation gives

$$
u=\frac{\rho}{\sqrt{c_{\mathrm{sig}}^2-c_\gamma^2}},
\qquad c_{\mathrm{sig}}>c_\gamma,\quad \rho>0.
$$

The fixed-magnitude qualification matters. With a general off-axis observer, the transverse separation can depend on source phase and hence on the unknown delay; the same expression is then an implicit relation, not an explicit solution. Both scales show why simply translating a co-moving field picture afterward misses part of the root problem.


## 4. Same-transmitter speed and phase conditions

For the prescribed helical source, the translation and transverse orbital velocities are orthogonal. Their speed budget is

$$
\left(\frac{v_{k,\mathrm{abs}}}{c_f}\right)^2
=\left(\frac{c_\gamma}{c_f}\right)^2
+\left(\frac{2\pi f_kR_k}{c_f}\right)^2.
$$

The app uses this combined speed for shared-geometry same-transmitter span diagnostics. The budget can nominate a self-hit regime; a self-hit requires a positive same-transmitter distance-delay root with usable residual, derivative margin and geometry. Threshold eligibility is not a substitute for solving that equation.

Partner-hit loops, same-transmitter loops and recurring causal round trips are proposed phase-lock mechanisms. Phase recurrence on prescribed paths is a diagnostic output, not a retained dynamical locking argument.

At $c_\gamma=c_{\mathrm{sig}}=c_f=1$, a nonzero-radius circular transverse path has exact same-transmitter contacts only at whole internal periods: $4R^2\sin^2(\omega u/2)=0$. Every positive contact has $D_t=0$, because its arriving direction is axial and the source's axial speed equals the wake speed. The [root and axial analysis](translating-carrier-root-and-axial-constraints.md) proves this and the leading-plane obstruction. These persistent singular contacts do not define ordinary retained hits.


## 5. Historical finite self-hit sweep

The retained compact receipt reports 756 prescribed cases: six named presets, six translation-speed ratios, three signal-speed ratios and seven observation phases. Within its three-history-cycle, finite-subdivision, finite-root-cap search, it records 5,068 helical roots and 5,116 phase families. The family classification is 4,666 single-hit, 422 singular-candidate and 28 phase-drift families. No stable or candidate phase-lock family was found; 42 cases contained singular candidates.

The strongest singular example has zero recorded source and receiver phase spreads yet is still a singular candidate, not a stable result. Whole-period self contacts explain this exact boundary geometry; the stored finite count and numerical Jacobian margin remain outputs of the historical approximate search. This is a useful negative control against identifying phase coincidence with regular retention. The receipt's root and family totals are different reported populations; their difference is not silently repaired into a new equality. Its headline counts also combine the declared signal speeds $0.6$, $0.8$ and $1$; they are not counts from a pure $c_{\mathrm{sig}}=c_f$ Master-Equation sample.

The negative applies to the declared prescribed cases, search limits and historical classifier. It does not exclude every transmitter history, all phase-lock mechanisms or physical photons. Later admission work added explicit rejected-root reasons without adding a new transmitter-history family, so the same sweep was not regenerated. The retained receipt also states that a migration rerun reproduced headline counts but not the historical raw bytes because the case-row schema evolved. Count agreement is therefore not exact reproduction of the old record, and the raw case rows have not been read for this synthesis.


## 6. Conditional formation-geometry response

The formation-geometry proposal is conditional on an independently certified retained free-photon branch. Only then does it have a referent for asking whether explicit source-coupled and ambient sea states select different stable geometries, such as pair spacing, braid scale or shape ratios and relative phase offsets. A source-coupled release transient must be distinguished from an asymptotic freely propagating state; the transient is not called an equilibrium merely because its shape is visible.

No retained branch, explicit admissible environment family, accepted constitutive bridge to EOM inputs or independent geometry-response reference is provided by these app sources. A controlled null response would constrain only its declared tested domain. Hysteresis, switching, nonzero closed-loop holonomy or transition-rate dependence would overturn an endpoint-only geometry map without refuting every environmental response. Failure to exhibit a retained branch leaves this question without a referent rather than proving a null response.

Even a future geometry response would not by itself imply frequency shift, energy transfer, gravitational redshift, endpoint-only dependence or path independence. Absolute time requires an explicit energy ledger; it does not exclude an unresolved path-history transfer to the Noether sea. The proposed scientific study therefore requires declared relaxation and stability criteria, forward and reverse paths, numerical refinement and an independent theorem or oracle. A pair of runs alone would not settle it.


## Evidence and research routes

The [compact historical sweep receipt](../evidence/helical-self-hit-phase-lock-sweep.receipt.v1.json) identifies `src/apps/photon/PhotonSelfHitSweepRuntime.js` as the historical producer and preserves the declared cases, bounds and reproducibility limitation. Its raw case rows are retained in ignored analytical storage. This consolidation performs no new sweep or equation evolution. The [formation-geometry task](../work-queue.md#pho-009--conditional-formation-geometry-relaxation) retains its deferred / blocked state; the [photon manuscript](../manuscript.md#4-formation-propagation-and-environmental-response) supplies its broader research context.
