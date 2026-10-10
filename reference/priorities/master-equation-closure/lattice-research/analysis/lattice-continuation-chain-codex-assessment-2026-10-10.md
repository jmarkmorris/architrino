# Independent assessment of the lattice continuation and event reconstruction

The supplied two-target lattice history has a coherent analytical route from its accepted numerical prefix to the first wake-speed obstruction. The event calculation joins directly to the certified histories through time five; it does not need the separate first-environmental-displacement-boundary bracket. Codex reconstructs that join, the finite history-error bounds, residual-row differentiation and propagation argument, and the ordinary and direct-measure continuation obstructions below. Fresh replays of the unchanged history audit and independent event arithmetic reference authenticate the censuses and all 48064 propagation steps against the accepted inputs. Full residual, coefficient and source-prefix enclosures remain accepted inputs rather than newly recomputed results.

This assessment reviews Claude's [chain reconstruction](lattice-continuation-chain-review-2026-10-10.md) under the [operator-selected follow-up](../../../../op/agent-chats/2026-10-10-lattice-darwin-followup/chat.md). One additional review correction is material: the later curved-path Theorem U has an absolute individual-row summability condition that this infinite stationary lattice does not satisfy. Its bounded-cross-field mechanism can be adapted to the prescribed grouped sum, but the theorem as written cannot be cited as literally covering this lattice. The earlier lattice-specific weaker-continuation and measure proofs already retain the required grouped prescription and survive without that citation.

## 1. Equation, preparation and exact scope

The selected law is the unchanged Master Equation, with normalized $c_f=1$, coupling $g=16$, infinite alternating unit cubic lattice, and the existing stationary eight-source block summation. The supplied negative-time pulses and forward release data are the original specific preparation. They are not a self-consistent unforced ancient history or a typical population. The source-selection and finite-error claims are conditional on the actual bounds certified by the earlier stages.

Reading coverage for this assessment includes the full next-event continuation and history audit, full next-event residual statement and independent adjudication, the full beyond-class-boundary continuation, the full weaker-continuation and event-measure derivations, event-measure domain Sections 1–4, and the later curved-path theorem's statements, continuation class and proof of Theorem U. Next-minimum Section 1 and next-maximum Sections 1, 3 and 6 supply the intermediate handover constants. The entire original independent event-reference script and its live retained reproduction owner were read before its known-first replay. The earlier residual certificates, source-prefix numerical refinement, full field/Jacobian implementation and outward residual re-evaluation were not recomputed here. Claude's report retains its separate coverage; combining the two reviews does not promote either beyond what was read or reconstructed.

## 2. Source-time joins and the fixed-history lemma

For distinct anchors, a reception by a receiver displaced by at most $B$ from a source displaced by at most $b$ has range at least $1-B-b$. Hence its emission time is at most $H-1+B+b$. The actual next-minimum and next-maximum continuation sources give:

| Receiver horizon $H$ | Receiver bound $B$ | Received-source displacement $b$ | Certified source endpoint | Positive source-endpoint margin |
| --- | --- | --- | --- | --- |
| $9/4$ | $1/64$ | $1/200000$ | $41/32$ | $0.01562$ |
| $11/4$ | $1/64$ | $1/100000$ | $57/32$ | $0.015615$ |
| $13/4$ | $1/64$ | $1/40000$ | $73/32$ | $0.0156$ |

The inner generated-source cuts also close: $41/32-1+1/200000+1/60000<33/32$, $57/32-1+1/100000+1/60000<33/32$, and $73/32-1+1/40000+1/100000<57/32$. These are exact rational comparisons. They check causal coverage given the named source bounds; they do not recompute the numerical certificates establishing those bounds. Claude separately reconstructs the tight pulse-end join at $259/128$, where the improved radius $1/132$ is essential and the coarser $1/128$ does not suffice.

For the event stage take $H=11/2$, $B=7/20$, and the accepted actual displacement through time five below $0.062304433$. The causal residual at source time five obeys

$$
5+|X_i(t)-X_j(5)|-t\ge6-B-0.062304433-H
=0.087695567>0.
$$

On the fixed subunit past the residual is strictly increasing in emission time and negative in the remote stationary past, so its unique old root precedes five. Stopping the actual solution at the first **global** speed-one arrival also excludes any later root: for $5\le s\le t\le H$,

$$
|X_i(t)-X_j(s)|\ge1-B-0.062304433-(s-5)>t-s.
$$

That second inequality uses the global pre-event source-speed bound. Positivity of the old residual alone does not exclude extra roots on an unrestricted future. The coarser accepted source radius $7/100$ gives emission ceiling $123/25=4.92<5$.

Consequently the event comparison is an ordinary receiver equation with fixed earlier source histories and the same regular grouped stationary field. It deliberately omits self roots. Before the first actual global speed-one time all self-root sets are empty, so that equation equals the Master Equation and uniqueness identifies their solutions. A certified auxiliary receiver speed greater than one at the forcing endpoint then proves that the actual global arrival must already have occurred. After that arrival the auxiliary trajectory is only a comparison object. Source speed controls its old cross-root regularity; an auxiliary receiver's speed may exceed one without making those source roots singular.

**Grade: derived conditional reconstruction.** Falsifiers are a required emission beyond the certified prefix, failure of the common range or source-speed bounds, a missing cross row, or loss of the same summation prescription. Event-time speed values remain supplied by the accepted numerical comparison.

## 3. Finite source-history errors need no unrecorded quadratic remainder

For $K(R,v)=n/[r^2(1-n\cdot v)]$, assume all intermediate histories and roots stay in a tube with range at least $d$, source speed at most $w<1$, and source acceleration at most $b_a$. Put $D=1-n\cdot v$. Differentiation while holding source velocity fixed gives

$$
\partial_RK=\frac{I-3nn^{\mathsf T}}{r^3D}+
\frac{nv^{\mathsf T}(I-nn^{\mathsf T})}{r^3D^2},\qquad
\partial_vK=\frac{nn^{\mathsf T}}{r^2D^2}.
$$

The first matrix has norm at most $2/[d^3(1-w)]+w/[d^3(1-w)^2]$, and the second at most $1/[d^2(1-w)^2]$. The constant two is the exact norm of $I-3nn^{\mathsf T}$.

Interpolate the two source histories as $Y_\theta=Y_0+\theta(Y_1-Y_0)$, retaining the same receiver position and reception time. Let $s_\theta$ be its unique root. If the histories' common position and velocity errors are $E_P,E_V$, implicit differentiation of $s_\theta+|x-Y_\theta(s_\theta)|=t$ gives

$$
|\partial_\theta s_\theta|\le\frac{E_P}{1-w},\qquad
|\partial_\theta R_\theta|\le\frac{E_P}{1-w},\qquad
|\partial_\theta v_\theta(s_\theta)|\le E_V+\frac{b_a E_P}{1-w}.
$$

Integrating the uniform kernel derivative from $\theta=0$ to one yields the finite bound

$$
|\Delta K|\le C_PE_P+C_VE_V,
$$

$$
C_P=\frac2{d^3(1-w)^2}+\frac{w/d^3+b_a/d^2}{(1-w)^3},\qquad
C_V=\frac1{d^2(1-w)^2}.
$$

This is a mean-value bound for finite errors. It is not a first-order Taylor approximation with a missing second-order residual. The tube must cover every interpolated history, root and queried time; source-prefix and convex-neighbourhood checks remain genuine obligations of its application. The event and through-five sources explicitly retain these margins, the source-time shifts and the actual/trial source union.

**Grade: derived.** Falsifier: histories satisfying the complete interpolation-tube hypotheses but violating the displayed finite bound. A range or transmitter margin established only at the two endpoints does not establish those hypotheses.

## 4. Reconstruction of the event continuation obstructions

The accepted event enclosures give $87/16<t_*\le351/64$, every possible first label's $e\cdot a_*>1.4630814180$, and all-pair separation above $0.469218$. These numerical conclusions are retained at their source grade. Translate the event to zero and set $e=v(0)$, $|e|=1$ and $\alpha=e\cdot a_*>0$.

For a hypothetical $C^3$ continuation, the root equation can be divided by its positive delay using $W(h,\tau)=\int_0^1v(h-u\tau)\,du$. At zero, the derivatives of $|W|^2-1$ are $2\alpha$ in $h$ and $-\alpha$ in $\tau$. The implicit-function theorem gives $\tau=2h+O(h^2)$, source time $-h+O(h^2)$, direction $e+O(h^2)$ and transmitter denominator $\alpha h+O(h^2)$. Thus the canonical positive self row is $ge/(4\alpha h^3)+O(h^{-2})$. It cannot be balanced by bounded cross contributions in a $C^3$ equation. Strictly short incoming chords and the stationary remote past remove old self roots near the event.

For the weaker ordinary class, continuity of velocity at zero puts every sufficiently recent self-root direction in the forward cone $e\cdot n>1/2$. With velocity absolutely continuous on each compact interval strictly after zero and the full ordinary equation almost everywhere, the continuous cross field has $e\cdot R(t)\ge\alpha/2$ near zero. Positive self rows force $e\cdot v(t)\ge1+\alpha t/2$. The receiver then advances more than time $t$ along $e$, forcing one unique simple root emitted before zero. Its delay $\delta(t)$ tends to zero.

Differentiating that graph gives the exact identity and bound

$$
\delta'=\frac{n\cdot[v(t)-v(s(t))]}{D},\qquad
\left|(1/\delta)'\right|\le\frac{2M}{g}|A_{\mathrm{selected}}|,
\qquad
\frac12|A_{\mathrm{selected}}|\le e\cdot v'-e\cdot R,
$$

where $M$ is a finite chord-velocity bound. Integration on $[a,b]\subset(0,h)$ bounds $(g/4M)|1/\delta(a)-1/\delta(b)|$ by a projected velocity difference minus a finite cross-field integral. The latter has a finite limit as $a\downarrow0$, whereas $\delta(a)\to0$. No outgoing Taylor expansion, acceleration limit, endpoint integrability or delay monotonicity is needed.

For the direct-measure class, a positive scalar measure on strict positive-delay incidences has an empty own-reception fiber at zero: every earlier incoming chord has length strictly less than its delay. Its reception pushforward therefore has zero atom. The cross density also has zero atom, so the full measure equation forces the outgoing bounded-variation velocity trace to equal $e$. That trace restores the same forward cone. The measure balance then forces the same negative-emission root, locally Lipschitz on compact positive reception intervals. Its canonical simple-chart weight is retained even though the receiver is merely Lipschitz. The reciprocal-delay bound forces infinite positive reception mass as $a\downarrow0$, contradicting finite mass on a compact reception window. This also excludes singular continuous velocity variation within that defined measure class.

The population application needs a common position neighbourhood, not only coordinatewise continuity. Retaining $\sup_i|y_i|<7/20$ gives distinct-label cross range at least $3/10$. Receptions less than $3/20$ after the event sample emissions at least $3/20$ before it. All cross inputs are fixed smooth subunit histories with finite changed support and a regular grouped stationary remainder. Simultaneous first arrivals do not destroy this older-source transmitter margin.

**Grade: independently reconstructed derivations at their explicit classes.** These proofs do not select an outgoing event rule or exclude all varying-history regulator limits. The finite-mass condition concerns whole reception windows up to the diagonal, not merely compact subsets of the open two-time domain. Fixed-path positive cutoff exhaustion with finite dominating mass converges in total variation and preserves the zero atom; changing the path or density can instead concentrate mass, and is a separate question. Falsifiers are an admissible continuation with the selected root approaching zero delay but finite positive mass, or a failure of the fixed-history cross-field hypotheses.

## 5. A required correction to the later-theorem applicability statement

Claude's initial L-3 asserted that the later [curved-path theorem](../../analysis/curved-path-wake-speed-obstructions.md) also applies to this lattice once bounded continuous cross rows are established. That establishes its cross-field hypothesis but does not check its full continuation class. The later theorem expressly requires an **absolutely convergent individual-source row sum** almost everywhere. The stationary infinite lattice uses a specified block grouping instead.

The absolute row sum diverges. Far outside the finite changed support, a stationary source at anchor $n$ has denominator one and row magnitude $g/|X_i(t)-n|^2$. For integer $R$ take the $R^3$ anchors with each coordinate between $R$ and $2R-1$. For a fixed receiver and sufficiently large $R$, these sources sample the stationary remote past, and each magnitude is at least $g/(2\sqrt3 R+|X_i(t)|)^2$. Their absolute subtotal grows at least as a positive constant times $R$. The full individual-row absolute sum is therefore infinite. Alternating signs and the prescribed eight-source grouping make the original grouped field meaningful; they do not make the individual magnitudes summable.

Theorem U as written thus does not literally cover this infinite-lattice continuation class. Its proof can be adapted by taking the already defined grouped cross field as $R$ and retaining the ordinary positive self sum, and the earlier lattice-specific proof of Section 4 already supplies precisely that formulation. To make the adaptation explicit, retain the later theorem's continuous velocity, ordinary-root equation almost everywhere, compact positive-time absolute continuity and positive incoming linear approach rate $a>0$. Continuity of the grouped remainder forces forward speed growth at least $a/2$. The later proof's own-path geometry then gives a newborn delay satisfying $\tau^2\le12t\varepsilon/a$, where $\varepsilon=|v|-1$, and a positive projected self row at least $5g/\tau^2$. Hence $(\varepsilon^2)'\ge5ga/(6t)$, whose logarithmic integral contradicts continuous bounded excess at zero. This restores the selected $g=16$ explicitly. The proof uses the other-source sum only through the already defined bounded continuous grouped remainder; positivity and convergence of the own-path sum remain conditions of the outgoing equation. No change of grouping, equation or physical claim is needed for the established lattice obstruction. Cross-family construction independence remains unknown.

**Grade: derived source-scope correction and grouped-remainder adaptation, cross-reviewed and accepted by Claude in the shared conversation at 19:27:33 UTC.** Falsifier: an absolute individual-row summability theorem for the same stationary lattice, a later Theorem U class definition explicitly admitting this grouped cross field, or a step of the adaptation requiring a stronger other-source summability property than the declared remainder provides. The source theorem itself is preserved.

## 6. Fresh archive replay and evidence boundary

The [replay wrapper](../evidence/lattice-followup-history-replay-2026-10-10.py) imports the unchanged original independent history audit, pinned at SHA-256 `6122ba36703589b5d2e65f8f034d02ac0c3228c7bff3f6ba545fac871044ad69`, and changes only its output directory. The original executable and retained snapshot have that identical hash, measured by Node SHA-256 before replay. Its source and [history/evidence owner](smooth-two-particle-next-event-history.md) were read. The shared venv executed successfully with NumPy 2.2.4. Known mode returned PASS for eight named controls before target mode was launched. Target mode returned PASS and exit 0, with internal elapsed time $8.861657$ seconds by its performance timer.

Fresh receipts reside at `.local-data/master-equation-closure/reciprocal-followup-2026-10-10/history-replay/`. They establish, by the unchanged audit on the actual retained arrays: 1502 exact first-front receiver labels; 1350 ordered incoming labels and bitwise endpoint jets; 152 exact-zero new initial jets; all 513 exact dyadic times; 140326 prospective actual generated rows; 149046 actual/trial union rows, including 8720 trial-only rows; zero missing or extra stored row; and 1278 possible original negative-time pulse rows. Their three consumed archive hashes match the accepted source record:

| Archive | SHA-256 |
| --- | --- |
| Through-five incoming population | `b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988` |
| Stopped next-event proposal | `25d3d3b33ae834ce30ec29366060e32b180a56f37b05f06c103363498b5de9b1` |
| Complete auxiliary reference | `97aa2156bae5557dd19dc7072bc973e1e2e6d33d4b60da3584fbb730172f13ac` |

Reproduction, from the repository root, preserves the original receipt directory:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/lattice-followup-history-replay-2026-10-10.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/lattice-followup-history-replay-2026-10-10.py target
```

This is reproduction of an earlier separately authored oracle, not a new independent oracle or a second residual reconstruction. It authenticates the current arrays and exact selection logic under the declared chart bounds. It does not prove the event speeds, receiver-error propagation or positive arrival acceleration.

The event-continuation source derives its fixed-past lemma from through-five bounds. An `rg` search of Python sources under `.tmp/mec-008-next-event/` and `.local-data/master-equation-closure/next-event/` for `first.class.boundary` or `beyond.class.boundary` returned no matches, exit 1. This is explicit source-search scope, not complete transitive tracing. The beyond-class-boundary source separately confirms that its existence argument uses through-five bounds, while its endpoint displacement witness reuses a first-boundary residual receipt. The earlier reproduction obligation therefore remains with that separate witness/bracket branch; no failure of the event certificate follows from it.

No trajectory, source theorem, earlier oracle, numerical input, historical receipt or stationary summation was changed by this assessment. The residual and source-prefix enclosures, original first-class-boundary reproduction, staggered-branch second-evaluator question, singular-limit dynamics and typicality remain outside the new verified coverage. Sections 7–8 add the residual argument and a replay of the accepted event arithmetic, retaining those input boundaries.

## 7. Residual construction and propagation, reconstructed at the input boundary

The [continuous residual statement](smooth-two-particle-next-event-residual.md) and [independent adjudication](smooth-two-particle-next-event-independent-adjudication.md) explain how a mismatch along a comparison curve becomes a bound for an actual solution. Stored dyadic position, velocity and acceleration jets define piecewise quintic Hermite curves with exact matching through their second derivatives. The third derivative may jump. Bounding the truncated defect's first derivative over every intersected polynomial cell is therefore legitimate piecewise integration; it does not assume continuous jerk.

The source correction is the causal row minus its unchanged stationary row. If $R=R_0-U$, its inverse-power difference is exactly

$$
\frac1{r^p}-\frac1{r_0^p}
=\frac{(r_0-r)\sum_{j=0}^{p-1}r_0^{p-1-j}r^j}{r^pr_0^p},\qquad
r_0-r=\frac{2R_0\cdot U-|U|^2}{r_0+r}.
$$

This identity preserves exact zero for an unchanged source even when the receiver occupies a finite interval box. It bounds the same full row, rather than dropping a source. The stationary polynomial includes the accepted cubic coefficient and finite homogeneous terms, followed by an explicitly bounded infinite remainder. Its far-shell estimate follows from shell count $24m^2+2$ and a decreasing integral; the coefficient intervals, their arithmetic and complete remainder values remain accepted inputs here. Adding the remainder's norm after differentiating only the retained polynomial avoids an unproved remainder derivative.

For the causal row $K=n/(r^2D)$, $D=1-n\cdot v>0$, independently differentiate $s+r=t$ at fixed reception time: $\partial_xs=-n^{\mathsf T}/D$ and $\partial_xR=I+vn^{\mathsf T}/D$. Collecting its terms gives the symmetric receiver Jacobian

$$
\partial_xK=\frac{I}{r^3D}
+\frac{vn^{\mathsf T}+nv^{\mathsf T}}{r^3D^2}
+\frac{nn^{\mathsf T}}{r^3D^3}
\left[|v|^2+2n\cdot v-3-r(n\cdot a_s)\right].
$$

The source-acceleration term arises from differentiating the sampled velocity at its shifted emission time. At fixed receiver position, $\partial_ts=1/D$ gives the explicit-time term

$$
\partial_tK=-\frac{(I-3nn^{\mathsf T})v}{r^3D^2}
-\frac{n\left(|v|^2-(n\cdot v)^2\right)}{r^3D^3}
+\frac{n(n\cdot a_s)}{r^2D^3}.
$$

The complete derivative along the moving receiver is $\partial_x(K-K_0)\widehat v_i+\partial_tK$. These formulas reproduce the source's factored expression by algebra, including source acceleration; no receiver playback factor multiplies the acceleration law. The separate historical reference checks this algebra on exact rational jets, but its field and Jacobian target instruments were not rerun here.

Let $e=x-\widehat x$ be the vector receiver error. On the full admitted receiver/source tube, the Jacobian and history-error bounds yield $|e''|\le\lambda|e|+q+\rho$, where $\rho$ is the continuous residual and $q$ the inherited source error contribution. Integrating twice bounds $|e|$ by a positive Volterra integral; comparison with $P''=\lambda P+q+\rho$ then bounds position and velocity errors. It never differentiates the Euclidean norm at zero. Positive power-series kernels with factorial coefficients and a geometric-tail guard provide rigorous finite-step upper comparisons. A strict first-exit argument closes the assumed tube. Earlier prefix refinement uses already accepted larger error tubes and cumulative acceleration maxima, preventing a circular appeal to its own smaller proposed errors.

**Grade: derived conditional reconstruction.** Claude independently expanded the receiver Jacobian from its earlier tensor formulation and independently derived the explicit-time derivative, accepting both formulas and the cancellation identities at 19:47:59 UTC. It read and agreed with the propagation reasoning. The new algebra and propagation reasoning depend on full-cell field/source bounds and accepted coefficient and residual inputs. Falsifiers are a missing source-shift term, a sign error in the displayed differentiation, a violated complete interpolation tube, or a positive-kernel comparison failing its vector integral inequality. Reading the enclosure method and replaying its final arithmetic do not recompute every earlier interval operation.

## 8. Fresh independent event-reference replay

The [event replay wrapper](../evidence/lattice-followup-event-replay-2026-10-10.py) checks the original independent reference against its byte-exact snapshot at SHA-256 `2837443d591b513558dff9d467304bdd50f29393f9ba7e9794ef2ead07de5a3b`. It removes only the original last command-line dispatcher, retains the exact function bodies and input paths, redirects their output directory, and calls the same known and target functions. Original receipts are preserved. The retained reproduction owner at repository-relative `.local-data/master-equation-closure/next-event/continuation/README.md` and independent reproduction record were read before execution. This owner is retained locally in ignored storage and is not included in a fresh Git checkout.

The shared venv returned PASS for three known control groups before target mode was launched. Target mode returned PASS and exit 0 in $31.457294$ seconds by the original instrument's performance timer. It checked every one of $32\times1502=48064$ positive-kernel position, velocity and acceleration comparisons using exact rational series and geometric remainder bounds, checked continuous component signs and candidate acceleration projections, and independently enclosed endpoint speed radicals from the archived dyadic velocities. It authenticated all five input hashes against the consumed receipts. Node comparison against the original independent target receipt then found identical input hashes and eleven named scientific result fields; only timers were allowed to differ.

The reference reproduces last safe endpoint $87/16$, first forcing endpoint $351/64$, witness anchor $(-1,0,1)$ and witness speed lower bound $1.001463393599081$. Its 32-cell aggregates describe the entire auxiliary comparison. The accepted event uses only the first 31 cells; the final auxiliary cell is not actual post-event evolution. The stronger first-event bounds in Section 4 retain that 31-cell scope.

Fresh receipts reside at `.local-data/master-equation-closure/reciprocal-followup-2026-10-10/event-replay/`; the original accepted field, Jacobian, coefficient, source-prefix and residual bounds remain inputs. This replay establishes current reproducibility of the independent arithmetic reference, not a newly authored independent evaluator or a full residual re-evaluation. Reproduce from the repository root:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/lattice-followup-event-replay-2026-10-10.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/lattice-research/evidence/lattice-followup-event-replay-2026-10-10.py target
```

**Grade: measured by the unchanged independent reference on preserved inputs, with the mathematical comparison reconstructed in Section 7.** Falsifier: failed fresh known controls, an input fingerprint mismatch, an uncovered cell or propagation step, or a changed endpoint predicate under the same authenticated inputs.

Claude verified this replay description and the wrapper's output-only redirection by reading its source and fresh receipts. It did not rerun the reference or inspect its kernel arithmetic line by line. Its final disposition also asked whether the scratch dependencies had retained copies. A known-first retention-map lookup and Node SHA-256 comparison found byte-exact copies of all three named scratch inputs—`event-comparison.json`, `prefix-refinement4.npz` and `event_comparison.py`—under `.local-data/master-equation-closure/next-event/continuation/`, matching the original paths and hashes in `retention.json`. The original reference itself has its byte-exact snapshot under `next-event/independent/`. `validation/event-retained-inputs.json` records all four comparisons. Missing scratch dependencies can therefore be restored from their recorded retained copies following the reproduction owner; a present conflicting file must not be overwritten. This checks the current named copies, not a general backup or retention guarantee.
