# Prescribed Photon Geometry and Observer Diagnostics

## 1. The role of the visualization

### 1.1 A candidate pair and an explanatory instrument

The Photon and Polarization Visualization app studies a prescribed candidate: two coaxial, contra-rotating planar Noether braids translated along a common axis. Each braid contains independently enabled Inner, Middle and Outer binary layers. Its diagrams make the source geometry visible, while its analysis follows delayed source histories to a declared Virtual Observer and reconstructs a transverse diagnostic. The geometry is supplied to the calculation. Its appearance on screen does not show that the equations of motion retain it as a freely propagating photon.

This distinction determines the meaning of every output. A numerical causal root is a candidate event on the supplied histories. An admitted contribution has additionally passed the app's geometric and derivative checks. A field fit summarizes a sampled sum of those contributions. None of these statements alone establishes a retained assembly, dynamical stability, helicity, a material analyzer response, Malus-law recovery or a Noether sea constitutive law. Those physical questions have separate theory and EOM solver owners.

The [app contract](priorities.md) records implemented behavior, continuing product requirements and open physical questions separately. This exposition follows that distinction. Statements about implementation and tests are attributed to the retained local records; no fresh application execution or independent verification of the scientific owners is supplied here. Literal interfaces, control ranges, historical findings and source identities remain in the [source coverage](analysis/manuscript-source-coverage.md).

### 1.2 Prescribed analysis and production histories

The shared prescribed-history interface composes three declared history kinds: linear transmitter histories, moving-circular transmitter histories, and moving-circular same-transmitter histories. Photon supplies constrained app state to this interface. The interface is a display and reference capability; it does not accept arbitrary history functions or become a second production solver.

Production-authoritative histories, causal-root ledgers, rejected-root reasons, phase records and physical acceptance belong to the EOM solver bridge. The app can consume such accepted evidence when a suitable contract exists. Its present prescribed circular geometry does not create that evidence. Extending the allowed history families is a change of analytical scope, distinct from adding another preset or scanning more settings within an existing family.

## 2. Geometry, coordinates and time

### 2.1 The two braid views

Propagation is along the positive absolute-space x axis. The transverse plane has y and z axes. The trailing braid appears on the left of the face-on display and rotates counter-clockwise; the leading braid appears on the right and rotates clockwise. These roles are declared in state, rather than inferred from an arbitrary screen location. Each active binary contributes a red positrino and a blue electrino on opposite sides of its circular orbit.

The two face-on diagrams maintain a fixed separation and stable camera scale for readability. An edge-on diagram shows the same pair along the propagation axis. Changing the pair separation changes the edge-on trace spacing and the source-history offsets; it does not spread the face-on diagrams apart. Its separation arrow spans the trace centers, and the trace height equals the diameter of the largest enabled binary. This deliberately distinguishes diagram layout from the geometry used by the causal calculation.

For braid role $s$, layer $\ell$ and polarity $q$, define the orbital phase at source time $\tau$ by

$$
\theta_{s\ell q}(\tau)=\phi_{s\ell}+\sigma_s2\pi f_{s\ell}\tau+\pi\mathbf 1_{q=-1},
\qquad q\in\{+1,-1\},\quad \ell\in\{I,M,O\}.
$$

Here the trailing role has rotation sign $\sigma_s=+1$ and the leading role has $\sigma_s=-1$. The phase offset $\phi_{s\ell}$, frequency $f_{s\ell}$ and radius $R_{s\ell}$ belong to the particular braid layer; enabling or disabling it changes both its markers and its contribution rows. The whole face-on braid does not rotate as a rigid image.

### 2.2 Absolute histories and the comparison chart

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

The retained separation contract makes absolute history the authoritative app diagnostic for pair separation. Co-moving results are explicitly comparison-only. This authority concerns which app calculation interprets the separation control; it does not establish a physical photon separation.

### 2.3 Speed controls and temporal windows

The app distinguishes the branch signal speed from the photon-channel translation speed. Direct controls specify their ratios to the wake speed separately. A second, provisional Lorentz-factor chart derives both controls from a supplied factor. That chart is an app parameterization, not a derived map from Noether sea state. The sources leave final local-speed authority blocked on such a source-bound physical input; no constitutive formula is supplied by this manuscript.

Numerical wake-speed normalization is $c_f=1$. The source-recorded defaults use I/M/O frequencies of 4, 2 and 1 Hz and radii chosen from $v=2\pi rf$ to give transverse orbital speeds of $1.2c_f$, $c_f$ and $0.8c_f$. Their displayed radii are approximately 0.0477, 0.0796 and 0.1273 in app units. These are prescribed defaults, not selected physical photon scales. The animation scale of 0.20 makes their visible rates 0.8, 0.4 and 0.2 cycles per real second.

The default field plot covers three middle-layer cycles, so its source-recorded duration is $T_{\mathrm{run}}=3/f_M=1.5\,\mathrm{s}$ at the default middle frequency. The controls also allow another cycle-reference layer and a cycle count from one to twelve. The default three-middle-cycle description must therefore remain scoped to its default setting. Animation time continues through a plot wrap. A short forward gap ahead of the moving time cursor leaves the rest of the waveform visible.

The field-fit window is a third temporal choice: the slowest enabled layer's common period. The app's power-of-two frequency family permits a common period, but a selected reference harmonic still summarizes only one component of the sampled waveform. Plot duration, animation speed and fitting window do not have interchangeable meanings.

## 3. Causal roots of a moving apparatus

### 3.1 The arrival equation

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

### 3.2 Three different meanings of an old or missing root

A retained root has an age in the selected reference cycles,

$$
N_{\mathrm{age}}=(t-\tau)f_{\mathrm{ref}}.
$$

The app classifies it as fresh through one cycle, aging above one through two cycles, and stale above two cycles. These thresholds are display-review conventions. They are neither physical lifetimes nor a derived decay law. The record preserves all three counts and the oldest retained age, so changing the threshold changes an inspectable contract.

A stale retained root is distinct from a stale history window: the latter means the scanned interval lies on the already-passed side of the arrival equation and produced no root there. The no-catch-up label likewise describes a failure to catch the receiver inside the declared scan interval. Keeping these conditions separate prevents a diagnostic label from silently becoming a global existence theorem.

### 3.3 Root admission and field admission

At a candidate hit, define the source-to-receiver unit direction $\mathbf n$ from the unregularized displacement. With source velocity $\mathbf v_t$ and receiver velocity $\mathbf v_r$, the two causal factors and a dimensionless source Jacobian are

$$
D_t=c_{\mathrm{sig}}-\mathbf v_t(\tau)\cdot\mathbf n,
\qquad D_r=c_{\mathrm{sig}}-\mathbf v_r(t)\cdot\mathbf n,
\qquad J=\frac{D_t}{c_{\mathrm{sig}}}.
$$

A small Jacobian concerns velocity projected along the causal direction. Large total source speed does not by itself imply a small Jacobian, particularly when most velocity is transverse. The signed root-playback derivative is $D_r/D_t$ on a regular branch. It is distinct from the instantaneous acceleration weight used below.

The same-transmitter admission packet uses a source-factor floor of $10^{-4}$ in normalized app units and a numerical singular boundary at $10^{-9}$. Missing or nonfinite factor evidence, or an otherwise uncertified causal-factor status, fails closed. Subject to that status precedence, magnitudes through the singular boundary are singular; magnitudes above it through the floor fail the Jacobian margin; only an above-floor factor with zero causal-factor status is admitted. The signed margin against the floor is retained, and candidate count must equal admitted plus rejected count.

The generalized facade additionally requires a finite root residual within ten times the request tolerance and checks its root status. Field reconstruction then applies another admission test: complete consistent causal-factor data, finite unit direction, positive finite distance and finite nonzero charge. A rejected field branch remains inspectable with its reason and contributes the zero vector. Numerical-root discovery, root admission and permission to contribute to the observer sum are three separate decisions.

## 4. From contributions to a transverse diagnostic

### 4.1 Transmitter weighting and display regularization

For a unit positive receiver and unit coupling, the app's source-bound contribution is

$$
\mathbf a_{i,k}(t)=q_i\frac{c_{\mathrm{sig}}}{|D_{t,i,k}|}
\frac{\mathbf n_{i,k}}{R_{\mathrm{display},i,k}^{2}},
\qquad R_{\mathrm{display},i,k}=\max(R_{i,k},0.08).
$$

The source packet attributes the acceleration weight to the Master Equation and its binding owner. Here it is the declared rule consumed by the display, not a new derivation from those outside documents. The receiver factor belongs to signed root playback and does not multiply this instantaneous acceleration. Missing or inconsistent source factor, receiver factor, playback or weight records do not license reconstructing a convenient value from incomplete data.

The 0.08 floor belongs only to the inverse-square display denominator, in app-coordinate units. The direction remains normalized using the actual displacement; flooring the direction's normalization as well would introduce a different attenuation. Both history modes declare the same display floor. It is not a physical short-distance law, an EOM modification or a regulator-independent field result.

### 4.2 Layer partition and coefficient closure

Each source hit belongs to exactly one I/M/O layer. Project its acceleration onto the transverse plane and sum within that layer:

$$
\mathbf E_{\perp,\ell}(t)=\sum_{i,k:\operatorname{layer}(i)=\ell}
\left[(\mathbf a_{i,k}\cdot\hat{\mathbf y})\hat{\mathbf y}
+(\mathbf a_{i,k}\cdot\hat{\mathbf z})\hat{\mathbf z}\right],
\qquad \mathbf E_\perp(t)=\sum_\ell\mathbf E_{\perp,\ell}(t).
$$

This equality is a bookkeeping identity for admitted, retained contributions. It remains meaningful when the sum has incomplete source coverage. It does not show that an unresolved transmitter contributed nothing physically.

For $N$ uniformly spaced samples, indexed from zero through $N-1$, over the declared common-period window starting at $t_0$, define the reference phase $\varphi_n=2\pi f_{\mathrm{ref}}(t_n-t_0)$. For transverse component $a\in\{y,z\}$ and layer $\ell$, the app records

$$
\bar E_{a,\ell}=\frac1N\sum_n E_{a,\ell}(t_n),\qquad
C_{a,\ell}=\frac2N\sum_n(E_{a,\ell}(t_n)-\bar E_{a,\ell})\cos\varphi_n,
$$

$$
S_{a,\ell}=\frac2N\sum_n(E_{a,\ell}(t_n)-\bar E_{a,\ell})\sin\varphi_n,
\qquad A_{a,\ell}=\sqrt{C_{a,\ell}^2+S_{a,\ell}^2},
\qquad \phi_{a,\ell}=\operatorname{atan2}(-S_{a,\ell},C_{a,\ell}).
$$

The total field uses the same samples and projection. Consequently its DC, cosine and sine coefficients equal the sums of their layer coefficients. Amplitudes do not add in this way: phase cancellation occurs before the magnitude is formed. A pair of large layer amplitudes can therefore accompany a small total diagnostic without contradicting exact coefficient closure. The phase of a zero-amplitude component has no determined directional meaning.

### 4.3 Residuals answer different questions

The layer record separates four diagnostics. The branch-sum residual tests the normalized RMS agreement of each total sample with its layer sum. Harmonic closure tests agreement of total DC, cosine and sine coefficients with their layer sums. The total fit residual measures the waveform omitted by the selected-frequency fit. The largest delay-equation residual reports root-solve accuracy within the fit window.

Coverage is reported alongside these residuals through unresolved and unstable transmitter counts and the minimum absolute transmitter Jacobian. Complete-for-declared-samples means every declared transmitter produced a usable retained-row result at every sampled time. Partial-retained-root-sum means that the algebraic sum is exact for its retained rows while at least one time has unresolved or unstable coverage. Neither label is a statement about unsampled times or arbitrary histories.

The source tests require branch and harmonic closure residuals at or below $10^{-9}$. These identity checks can expose misgrouping, but agreement between two arrangements of the same rows is not independent evidence for the physical law. Likewise, a high single-frequency fit residual need not indicate a faulty root sum: it may correctly reveal harmonics the fit does not represent.

## 5. Polarization and analyzer comparisons

### 5.1 A fitted component of a sampled field

The polarization inset summarizes a selected harmonic of the actual branch-sum transverse diagnostic over the common-period window:

$$
E_y(t)\approx A_y\cos(\omega t+\phi_y),\qquad
E_z(t)\approx A_z\cos(\omega t+\phi_z).
$$

Relative amplitude and phase lag characterize a linear, circular or elliptical fitted curve. The formula panel also reports Stokes-style observer summaries, fit residual and analyzer summaries. Optional raw branch-sum points behind the fit let the reader distinguish the sampled trajectory from its one-frequency approximation. A clean ellipse does not mean every field sample lies on it or that a material photon has the corresponding helicity.

The historical review identified why the fitting window matters: fitting a reference frequency over an interval that is not a common period lets a slower component contaminate the reference coefficient. More samples within that same inadequate window do not remove the window's nonorthogonality. The later app contract specifies the slowest enabled layer's common period and preserves residuals rather than presenting the fit as the entire computed waveform. This is a source-recorded correction of the diagnostic's meaning, not a fresh runtime test.

### 5.2 Instantaneous and accumulated analyzer fractions

For analyzer angle $\theta$ in the transverse plane, let

$$
\hat{\mathbf a}=\cos\theta\hat{\mathbf y}+\sin\theta\hat{\mathbf z}.
$$

With a positive denominator regularizer, the instantaneous fraction and common-period projected-energy fraction are

$$
\mu(t)=\frac{|\hat{\mathbf a}\cdot\mathbf E(t)|^2}{|\mathbf E(t)|^2+\varepsilon},
\qquad
\bar\mu=\frac{\langle|\hat{\mathbf a}\cdot\mathbf E|^2\rangle}
{\langle|\mathbf E|^2\rangle+\varepsilon}.
$$

An average of instantaneous ratios is generally different from a ratio of averaged energies. A residual between them can therefore contain a definitional difference even with an exactly computed waveform. The retained contract uses the accumulated-energy definition for the common-period summary and distinguishes it from an instantaneous sample. Its fit-to-field comparison must compare the same estimator and window on both sides.

These are observer-level projection diagnostics. A displayed angular dependence supplies neither a material-analyzer mechanism nor a derivation of Malus' law. The positive regularizer also means a vanishing field does not support a meaningful polarization inference merely because the numerical fraction remains finite.

### 5.3 The magnetic comparison

An ideal plane wave propagating along the positive x axis supplies a separately labeled comparison:

$$
\mathbf B_{\mathrm{comparison}}=\frac1{c_{\mathrm{sig}}}\hat{\mathbf x}\times\mathbf E_\perp,
\qquad B_y=-\frac{E_z}{c_{\mathrm{sig}}},\quad B_z=\frac{E_y}{c_{\mathrm{sig}}}.
$$

This effective plane-wave relation is not a primitive magnetic input, a derivation of a branch-local field, or a rule justified for every off-axis source direction. The app contract does not require a separate magnetic graph unless a later diagnostic needs to compare a non-plane-wave reconstruction. In particular, the fixed propagation direction in this comparison must not be mistaken for each individual hit's direction.

## 6. Same-transmitter roots and the finite negative result

### 6.1 Speed eligibility does not establish a hit

For the prescribed helical source, the translation and transverse orbital velocities are orthogonal. Their speed budget is

$$
\left(\frac{v_{k,\mathrm{abs}}}{c_f}\right)^2
=\left(\frac{c_\gamma}{c_f}\right)^2
+\left(\frac{2\pi f_kR_k}{c_f}\right)^2.
$$

The app uses this combined speed for shared-geometry same-transmitter span diagnostics. The budget can nominate a self-hit regime; a self-hit requires a positive same-transmitter distance-delay root with usable residual, derivative margin and geometry. Threshold eligibility is not a substitute for solving that equation.

A root record retains source and receiver phase at the hit, with cycle index, layer, role and polarity. An unmodeled Virtual Observer has explicitly not-applicable receiver phase, rather than an invented clock. Circular phase spreads distinguish a wraparound cluster from a wide distribution. Families retain missing and not-applicable counts and group by layer, braid role, charge, root kind and source cycle.

Partner-hit loops, same-transmitter loops and recurring causal round trips are proposed phase-lock mechanisms. Phase recurrence on prescribed paths is a diagnostic output, not a retained dynamical locking argument. Rejected near-singular candidates can remain in a singular-candidate family for inspection but cannot be promoted to candidate or stable phase-lock families. Same-transmitter roots remain outside the observer-field sum under the present facade contract.

### 6.2 What the sweep did and did not find

The retained compact receipt reports 756 prescribed cases: six named presets, six translation-speed ratios, three signal-speed ratios and seven observation phases. Within its three-history-cycle, finite-subdivision, finite-root-cap search, it records 5,068 helical roots and 5,116 phase families. The family classification is 4,666 single-hit, 422 singular-candidate and 28 phase-drift families. No stable or candidate phase-lock family was found; 42 cases contained singular candidates.

The strongest singular example has zero recorded source and receiver phase spreads yet is still a singular candidate, not a stable result. This is a useful negative control against identifying phase coincidence with regular retention. The receipt's root and family totals are different reported populations; their difference is not silently repaired into a new equality.

The negative applies to the declared prescribed cases, search limits and historical classifier. It does not exclude every transmitter history, all phase-lock mechanisms or physical photons. Later admission work added explicit rejected-root reasons without adding a new transmitter-history family, so the same sweep was not regenerated. The retained receipt also states that a migration rerun reproduced headline counts but not the historical raw bytes because the case-row schema evolved. Count agreement is therefore not exact reproduction of the old record, and the raw case rows have not been read for this synthesis.

### 6.3 An analytic reference has a different role

The facade source describes an independent stationary fixture at $c_f=1$: a transmitter at the origin, receiver at $x=2$, and reception at $t=3$. Its delay equation is $2=3-t_e$, giving emission time 1, delay and distance 2, and both causal factors equal to 1. With unit positive source and unit coupling, the full observer vector is $(1/4,0,0)$. This vector is longitudinal in that fixture; it is not a nonzero transverse photon-field example.

Independent source and receiver clocks of periods 1 and 2 give source phase 0 degrees in cycle 1 and receiver phase 180 degrees in cycle 1. The retained source also describes a bounded no-catch-up fixture and same-transmitter receiver-phase checks. These analytic expectations have an independent mathematical referent, unlike a replay of the facade's own output. The tests' reported agreement remains historical evidence here: the fixture implementation and execution were not inspected or rerun.

## 7. Search, display and evidence provenance

### 7.1 Comparing complete configurations

Configuration search begins with the current normalized settings and constructs nearby and systematic variations in enabled layers, frequency powers, radii, phases, separation, observer position and analyzer angle. The short interactive action examines a bounded sample. Deep comparison evaluates the full constructed pool and yields between candidates, allowing redraw and progress reporting. Full-pool evaluation is still bounded by the candidate builder; it is not exhaustive over a continuous parameter space.

A direct-versus-Lorentz-factor filter applies to normalized inputs before evaluation. A phase-family filter applies afterward because its class is an output of the root analysis. An absent-family selection requires zero helical families in every available inspected mode; stable, candidate or singular selections retain a row if at least one inspected mode reports that class. A requested stable class does not cause such a family to exist.

Both modes use the same candidate builder, prescribed analysis, scoring rules and serializer. Deep rows carry both co-moving and absolute-history summaries or explicit failure status. Their normalized state snapshots are insulated from later UI changes, but their numerical summaries do not have an independent scientific oracle. These two meanings of independence must remain separate through export and import.

### 7.2 Interesting, suspect and certified

The search design values low-residual fitted polarization, strong cancellation, sharp transitions, robustness under small nudges, agreement or informative disagreement between history modes, healthy causal-root structure, simple explanations and representative diversity. These are inspection criteria, not physical acceptance scores. Missed transmitters, small Jacobians, large delay residuals or unstable diagnostics label a suspect case; an extreme but poorly resolved value is not clean polarization evidence.

Each retained result holds a complete settings snapshot, reason tags, score components, polarization and diagnostic summaries, comparison status and deltas, a compact sample or plot summary, and a short explanatory note. Deep provenance additionally records path identity, filters and both independence boundaries. Results support preview without losing the current state, load/play, rename/delete, selected or complete JSON export/import, and promotion into session presets. Such promotion is organizational: it does not promote a physical claim. Resetting a preset restores the last loaded complete state.

### 7.3 Visual requirements and source-recorded failures

The product contract keeps fixed-size polarity markers, neutral-purple orbit blending, layered trails, a shared Paths toggle and a stable face-on reference scale. Radii remain ordered and the outer radius capped at its initial value. Controls include playback and keyboard pause, time and state resets, animation scale, layer settings, observer coordinates, analyzer angle, speed mode and preset/search functions. Observer sliders show a zero marker and snap within two steps of zero. These conventions make comparisons legible without redefining the prescribed state.

The retained July code review is valuable because green tests coexisted with substantive defects: incomplete field stubs could produce identically zero fields while passing finiteness checks; a constant role-derived helicity label appeared informative; root identities could be mismatched when arrays were reordered; and an estimator mismatch appeared as analyzer error. It also identified state races, import provenance hazards, lifecycle leaks, retry behavior, repeated per-frame rendering work and gaps between tested helpers and the live orchestrator. Every finding and its proposed remedy remains mapped in support as a historical observation, not automatically a current defect.

Later local packets explicitly record common-period fitting, consistent display regularization, correct transmitter weighting, layer-ledger closure, separate admission classes and scheduled deep comparison. Those records define the exposition's relevant diagnostic boundaries. Their test counts establish what the sources report about those revisions; they do not retroactively certify every historical remediation or establish current browser behavior. A new implementation claim would require the live app, tests and independent references outside this manuscript's read scope.

## 8. Open physical and architectural boundaries

### 8.1 Local speed and formation geometry

A source-bound map from Noether sea variables to the app's local speeds remains unresolved. Direct sliders and a provisional Lorentz-factor chart expose alternatives for inspection but do not derive an environmental response. In particular, identifying photon-channel speed with an effective local speed is a separate target, not a premise that establishes all aspects of photon geometry.

The formation-geometry proposal is conditional on an independently certified retained free-photon branch. Only then does it have a referent for asking whether explicit source-coupled and ambient sea states select different stable geometries, such as pair spacing, braid scale or shape ratios and relative phase offsets. A source-coupled release transient must be distinguished from an asymptotic freely propagating state; the transient is not called an equilibrium merely because its shape is visible.

No retained branch, explicit admissible environment family, accepted constitutive bridge to EOM inputs or independent geometry-response reference is provided by these app sources. A controlled null response would constrain only its declared tested domain. Hysteresis, switching, nonzero closed-loop holonomy or transition-rate dependence would overturn an endpoint-only geometry map without refuting every environmental response. Failure to exhibit a retained branch leaves this question without a referent rather than proving a null response.

Even a future geometry response would not by itself imply frequency shift, energy transfer, gravitational redshift, endpoint-only dependence or path independence. Absolute time requires an explicit energy ledger; it does not exclude an unresolved path-history transfer to the Noether sea. The proposed scientific study therefore requires declared relaxation and stability criteria, forward and reverse paths, numerical refinement and an independent theorem or oracle. A pair of runs alone would not settle it.

### 8.2 Delimited application scope

Shared visual extraction remains conditional on demonstrated cross-app maintenance need. Runtime decomposition waits for reviewed correctness boundaries to stabilize and must preserve one behavior path rather than introduce a parallel implementation. These architectural deferrals remain separate from the physical questions.

The app continues to defer proof-grade photon residual evaluation, material analyzer substrate dynamics, Bell-pair and no-signaling behavior, three-dimensional rendering, group rotation of the face-on braids and persistent project libraries beyond basic presets and export. It provides a way to inspect prescribed geometry and its diagnostic consequences. A certificate of retained photon behavior requires the additional physical argument and evidence that the display deliberately keeps distinct.
