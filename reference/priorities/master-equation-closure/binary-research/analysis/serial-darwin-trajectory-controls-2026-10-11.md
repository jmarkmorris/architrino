# Three remaining Darwin trajectory controls (serial task 6, 2026-10-11)

This report covers the three trajectory controls that the [binary priorities](../priorities.md) recorded as unlaunched: the unchanged DC-100 mirror circle for 200 periods, the DG-100 preparation with the velocity coupling switched off for 200 periods, and DC-100 with a common velocity along the circle's normal for 50 periods. The law is the selected instantaneous comparison functional of [equation-variants Section 10](../../equation-variants/manuscript.md#10-darwin-inspired-low-speed-interaction-comparison) with unit integration weights and $K=c_f=1$. It is a comparison equation, not the delayed Master Equation. Nothing here concerns physical mass, validates a delayed law, or says anything about general drift.

**Outcome.** All three controls ran to their full horizons at three numerical settings each, with no contact, escape, domain-departure or acceleration-matrix obstruction event in any of the nine runs. Each was compared with a reference that shares no code with the instrument: the exact circle, the closed-form Kepler orbit, and a reduced one-degree motion solved by quadrature. Every difference from those references is small and shrinks when the tolerance is tightened; I infer from those comparisons that the differences are integration error (Section 5; corrected after review, Section 10). One preregistered tolerance is missed: at the primary setting the energy-like invariant drifts by $1.7\times10^{-8}$ and $2.0\times10^{-8}$ over 200 periods in controls 1 and 2, above the $10^{-8}$ that the preregistration set for drift over a run. The tighter setting and the fixed-step method stay below it. These runs are a selected extension of the preregistered table to longer horizons and are not a preregistration pass.

## 1. What was run, and with what

**Subject instrument (unchanged).** [`darwin-overnight-pair-instrument.mjs`](../evidence/darwin-overnight-pair-instrument.mjs), SHA-256 `868f68e860d453d1c60a57d4367034fe2cb80fdc009d468414d0c9c4e0242296`, verified before use. A fresh [wrapper](../evidence/serial-darwin-trajectory-controls-wrapper-2026-10-11.mjs) imports its `runCase` function, refuses to run if that hash differs, builds the three preparations, and writes only to a new directory. It does not call the instrument's own controls or command line, which write to the original receipts.

**Original domain and event settings, kept.** Contact radius $10^{-3}$, escape radius $10^{4}$, declared speed bound $0.1$, declared bound $0.05$ on $\epsilon=K/(c_f^2r)$, obstruction thresholds $|\det H|<10^{-12}$ or condition number above $10^{12}$, event time tolerance $10^{-9}$, output cadence one two-hundredth of the DC-100 period. These are the [preregistration's](darwin-overnight-preregistration.md) Section 2 values as coded in the retained target runner, with one difference that I kept and disclose (review comment R6-03): the preregistration asks for a cadence of at most one two-hundredth of the shortest relevant period. The retained cadence is $4448.433075160754/200=22.2421653758$. For controls 1 and 3 that meets the rule (the radial period of control 3 is longer, $4481.89$). For control 2 the shortest relevant period is the zero-coupling radial period $4427.64025246$, whose two-hundredth is $22.1382012623$, so the retained cadence exceeds the rule by $0.47$ percent. No run was repeated to remove this.

**Numerical settings.** P: Dormand–Prince 5(4), relative tolerance $10^{-10}$, absolute $10^{-12}$ (the original primary). C: the same method at relative tolerance $10^{-12}$, absolute $10^{-12}$ (the original convergence setting). R5: classical fourth-order Runge–Kutta with fixed step 5, clipped to the output cadence (the original cross-integrator). R5 is a different method inside the same instrument, so it tests the time stepping and not the acceleration assembly.

**Preparations.** In all three, $\mathbf X_1=(50,0,0)$, $\mathbf X_2=(-50,0,0)$, polarities $(+1,-1)$, $u=0.07062245515464487$, reference period $4448.433075160754$.

| Control | Velocities | Switches | Horizon |
| --- | --- | --- | --- |
| 1. DC-100 | $(0,u,0)$, $(0,-u,0)$ | full law | 200 periods, $889686.6150321508$ |
| 2. DG-100, zero coupling | $(0.005,u,0.002)$, $(0.005,-u,0)$ | velocity coupling 0, inverse-distance term 1 | 200 periods |
| 3. DC-100 plus common normal velocity | $(0,u,0.005)$, $(0,-u,0.005)$ | full law | 50 periods, $222421.6537580377$ |

The instrument echoes the switches it used; control 2 echoed coupling 0 and pair term 1. Control 3 keeps $u$, the near-circle of the [confinement proof](darwin-aligned-quantitative-confinement-2026-10-10.md), and not the separately balanced speed.

**Preparation checks against retained sources (known case k6, passed).** The retained promoted case file `DG-100.json` equals the preparation built here in positions, velocities, polarities, all seven domain and event settings, cadence, $u$ and period; its horizon is exactly 20 periods and its setting is P. In binary64 arithmetic $\pi\cdot100/u$ equals the retained period exactly, and $\sqrt{2/401}$ equals the retained $u$ exactly.

## 2. The mathematics behind the references

I derived the following from the functional before running anything, and wrote it into a [reference script](../evidence/serial-darwin-trajectory-controls-reference-2026-10-11.py) in 60-digit arithmetic. For opposite polarity, with centre velocity $\mathbf V_c=(\mathbf V_1+\mathbf V_2)/2$, half relative velocity $\mathbf v=(\mathbf V_1-\mathbf V_2)/2$ and $\mathbf X_1-\mathbf X_2=r\mathbf e$,

$$
L=|\mathbf V_c|^2+|\mathbf v|^2+\frac Kr-\frac{K}{2r}\Big[|\mathbf V_c|^2-|\mathbf v|^2+(\mathbf V_c\cdot\mathbf e)^2-(\mathbf v\cdot\mathbf e)^2\Big].
$$

**Mirror motion (derived).** With $\mathbf V_c=0$ and polar coordinates $(r,\theta)$ for the relative vector, $L=\tfrac14\dot r^2(1+K/r)+\tfrac14r^2\dot\theta^2(1+K/(2r))+K/r$. A circle needs $\partial L/\partial r=0$ at $\dot r=0$, which gives member speed $u$ with $u^2=2K/(4r+K)$, that is $u^2=2/401$ at $r=100$, and period $\pi r/u$. The exact solution is $r=100$, $\theta=(2u/r)\,t$.

**Zero velocity coupling (derived).** Then $L=|\mathbf V_c|^2+|\mathbf v|^2+K/r$, so the centre moves uniformly and the relative vector obeys $\ddot{\mathbf d}=-2K\mathbf d/r^3$, a Kepler problem with parameter $2K$. For control 2 the relative speed is below the circular value, so the start is the apocentre. The closed form gives semi-major axis $99.7711483734$, eccentricity $0.00229376558603$, pericentre $99.5422967468$, apocentre $100$ and radial period $4427.64025246$. The position at any time follows from Kepler's equation.

**Common normal velocity (derived).** The total generalized momentum is $\mathbf P=2A\mathbf V_c$ with $A=(1-K/(2r))I-(K/(2r))\mathbf e\mathbf e^{\mathsf T}$, and it is conserved. When $\mathbf P$ is normal to the relative plane, that plane is invariant, $\mathbf V_c=\mathbf P/(2-K/r)$ along the normal, and the relative motion has the angular invariant $\ell=\tfrac12r^2\dot\theta\,(1+K/(2r))$ and the energy-like invariant

$$
E=\frac{\dot r^2}{4}\Big(1+\frac Kr\Big)+W(r),\qquad
W(r)=\frac{\ell^2}{r^2(1+K/(2r))}-\frac Kr+\frac{P^2}{4(1-K/(2r))}.
$$

This is the proof's equation (1) at zero latitude, which I reached separately; the reference script confirms the proof's two exact constants from my $W$: the slope $-1/800000000$ at separation 100 for this momentum, and zero slope at the separately balanced speed. For control 3, $P=0.00995$ and $\ell=7.09755674304$. The separation moves between $100$ and an outer turning point

$$
r_{\rm out}=100.002518844060,\qquad r_{\rm out}-100=0.00251884406<\tfrac1{360}=0.00277778,
$$

with radial period $4481.89443050$, an angle advance of $2\pi+0.0471034074$ per radial period and a centre displacement of $22.4094707343$ per radial period. These are invariants of the comparison functional, not physical accounts.

## 3. Known cases, run and recorded before any target

**Wrapper, six of six passed on its only run** (`known.json`):

| Known case | Result |
| --- | --- |
| k1. Zero-coupling mirror circle, five periods | separation within $[-3.4\times10^{-9},\,+4.6\times10^{-8}]$ of 100; return error $4.8\times10^{-7}$ |
| k2. Coupled circle with $u^2=2K/(4r_0+K)$, five periods | separation within $[-3.4\times10^{-9},\,+4.5\times10^{-8}]$ of 100; return error $4.7\times10^{-7}$ |
| k3. Negative: the zero-coupling speed under the coupled law | separation reaches $100.505$; correctly fails the circle test |
| k4. Negative: `interaction = 0` on the DG-100 preparation | straight lines; separation $636.2887$ after one period, equal to free motion within $2\times10^{-12}$; echoed switches 0 and 0 |
| k5. Replay of the retained full-coupling DG-100, 20 periods, in a fresh path | first apocentre $100.04718038761$ and last pericentre $99.99975966227$, against retained $100.047180388$ and $99.9997596623$ |
| k6. Retained case file and period | equal, as stated in Section 1 |

k4 is the planted wrong switch: it shows that removing both terms is distinguishable from the selected control, which keeps the inverse-distance term.

**Reference script, thirteen of thirteen passed** before it read any target: the Kepler propagator at the start, after one period, at half a period and in its initial velocity; the reduced quadrature applied to the Kepler effective potential, which returned the closed-form pericentre, period and an angle advance of $2\pi$; the coupled balance at $u^2=2/401$; the two exact constants of the proof; and a negative (the zero-coupling speed leaves a nonzero slope in the coupled balance).

## 4. Results

Every run stopped by reaching its requested horizon exactly. No run recorded any event other than turning points. All measured numbers below are from the pair instrument in binary64 arithmetic under Node 26.3.0; "error" means instrument minus reference.

### 4.1 Control 1: DC-100 for 200 periods

| Setting | Steps | Separation minus 100 at the end | Phase error (rad) | Relative position error | Energy-like drift (relative) | Largest $\lvert\Delta\mathbf J\rvert/\lvert\mathbf J\rvert$ |
| --- | --- | --- | --- | --- | --- | --- |
| P | 50,402 | $+1.73\times10^{-6}$ | $-1.63\times10^{-5}$ | $1.6\times10^{-3}$ | $+1.73\times10^{-8}$ | $8.6\times10^{-9}$ |
| C | 110,401 | $+4.2\times10^{-8}$ | $-3.97\times10^{-7}$ | $4.0\times10^{-5}$ | $+4.2\times10^{-10}$ | $2.1\times10^{-10}$ |
| R5 | 200,000 | $-6.3\times10^{-8}$ | $+5.9\times10^{-7}$ | $5.9\times10^{-5}$ | $-5.5\times10^{-10}$ | $2.7\times10^{-10}$ |

**Reading (measured).** The pair completes 200 revolutions on the circle. Over all 40,001 samples the separation stays within $[-3.4\times10^{-9},+1.73\times10^{-6}]$ of 100 at P and within $4.2\times10^{-8}$ at C. The centre moves less than $1.1\times10^{-10}$ and the momentum drift is below $6\times10^{-16}$. The instrument reports 398, 398 and 397 turning-point events; their separations lie inside the ranges just given, so they are the instrument's own slow numerical wobble and not a property of the circle. The matrix determinant stays at $0.99985000562$, its closed-form value $(1-4a^2)(1-a^2)^2$ with $a=1/200$, and the condition number at $1.02$.

### 4.2 Control 2: DG-100 with zero velocity coupling for 200 periods

| Setting | Steps | Relative position error | Separation error | Centre error | Largest turning-time error | Largest turning-radius error | Energy-like drift |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P | 45,250 | $1.84\times10^{-3}$ | $+4.1\times10^{-7}$ | $1.2\times10^{-10}$ | $1.3\times10^{-2}$ | $2.0\times10^{-6}$ | $+1.97\times10^{-8}$ |
| C | 95,275 | $1.69\times10^{-4}$ | $+4.5\times10^{-8}$ | $1.2\times10^{-11}$ | $1.2\times10^{-3}$ | $1.9\times10^{-7}$ | $+1.9\times10^{-9}$ |
| R5 | 200,000 | $6.0\times10^{-5}$ | $-2.2\times10^{-8}$ | $1.2\times10^{-10}$ | $3.0\times10^{-4}$ | $6.3\times10^{-8}$ | $-5.7\times10^{-10}$ |

**Reading (measured against a derived closed form).** The instrument records 401 turning points; the Kepler orbit has exactly 401 in this horizon. Every one has the right kind, time and radius within the errors shown. The separation runs between $99.54230$ and $100$, with no apsidal advance, as a closed Kepler ellipse must. The largest member speed is $0.0758$ and the largest $\epsilon$ is $0.01005$, both inside the declared domain. With the coupling off the matrix is the identity, and the instrument reports determinant 1 and condition number 1 throughout.

So with the velocity coupling removed, the same preparation follows an ellipse of eccentricity $0.00229$: its speed is below the zero-coupling circular speed and the separation dips by $0.458$ each radial period, about ten times the $0.047$ excursion of the full-coupling run (wording corrected, R6-04). The retained 20-period full-coupling run of the same preparation stayed within $[99.99976,100.04718]$. This control therefore isolates what the velocity coupling contributes to that preparation; it makes no statement about which law is right.

### 4.3 Control 3: DC-100 plus common normal velocity for 50 periods

| Setting | Steps | Separation error at the end | Phase error (rad) | Centre drift error | Inner turning points minus 100 | Outer turning points minus 100 | Energy-like drift |
| --- | --- | --- | --- | --- | --- | --- | --- |
| P | 12,603 | $+4.3\times10^{-7}$ | $-1.0\times10^{-6}$ | $-1.2\times10^{-9}$ | $[+8.8\times10^{-9},\,+4.3\times10^{-7}]$ | $[0.00251884584,\,0.00251927343]$ | $+4.3\times10^{-9}$ |
| C | 27,753 | $+1.1\times10^{-8}$ | $-2.5\times10^{-8}$ | $-3.8\times10^{-11}$ | $[+2.2\times10^{-10},\,+1.0\times10^{-8}]$ | $[0.00251884414,\,0.00251885460]$ | $+1.1\times10^{-10}$ |
| R5 | 50,001 | $-2.0\times10^{-8}$ | $+4.9\times10^{-8}$ | $-1.5\times10^{-11}$ | $[-1.4\times10^{-8},\,-2.8\times10^{-10}]$ | $[0.00251882310,\,0.00251883677]$ | $-1.4\times10^{-10}$ |

**Reading (measured against a derived reduced motion).** The instrument records 99 turning points; the reduced motion has exactly 99 in this horizon, alternating outer and inner as predicted, with times within $5.3\times10^{-3}$ (P), $1.3\times10^{-4}$ (C) and $3.5\times10^{-5}$ (R5) of the quadrature. The outer turning point is the derived $100.00251884$ to the errors shown; that value lies inside the bracket $(100.00250,\,100.00254)$ of the confinement proof and agrees with the $100.0025188$ of my earlier [addendum](darwin-overnight-addendum-2026-10-10.md#8-update-2026-10-10t1916z-the-finite-preparation-is-now-admitted-by-proof). The relative vector stays in its plane (normal component zero at P and C, $-4\times10^{-12}$ at R5), the centre stays on the normal axis within $2\times10^{-11}$, and the centre's travel along the normal matches the quadrature to $1.2\times10^{-9}$ or better. The instrument's initial momentum, angular invariant and energy-like invariant equal my derived formulas to $3\times10^{-19}$, $3\times10^{-16}$ and $8\times10^{-19}$. The determinant moves between $0.99985000562$ and $0.99985001318$, which is its closed form at separations $100$ and $100.00252$.

**Against the proved enclosure $100\le r\le100+1/360$.** Every sampled and every located separation is below $100.0025193$, so the upper bound is never approached: the margin is $2.6\times10^{-4}$. At the lower bound the exact motion touches $100$ at every inner turning point, so the measured inner turning points fall on one side or the other. R5's fall below $100$, by between $2.8\times10^{-10}$ and $1.37\times10^{-8}$, and 60 of its 10,101 records are below $100$; those of P and C are at or above $100$. An earlier version of this paragraph said that a loss of energy must move the inner turning point below $100$. That was wrong, and it is withdrawn (R6-01): at fixed angular invariant and momentum a loss of energy moves it outward. Section 10.1 gives the correct relation and what the records show. The dips are about six orders of magnitude above binary64 rounding of a number near 100 (about $1.4\times10^{-14}$); I infer that they are numerical, from the reference and refinement comparisons, and they are measured departures of a rounded trajectory from the interval, not statements about the law. The proof itself says that a rounded trajectory without a validated error bound cannot falsify the exact theorem by leaving its narrowest bound; equally, these runs do not prove it.

**Against the proof's other bounds (its equations 13 and 16), over all 10,101 raw samples and events per setting.** The largest radial speed is $1.7656\times10^{-6}$ at all three settings, below the proved $1/500000=2\times10^{-6}$. The latitude of the relative vector is exactly zero at P and C and at most $5.5\times10^{-14}$ at R5, below the proved $1/75000$. The largest member speed is $0.07080$, below the proved $0.07801$.

## 5. Discrepancies and how each was resolved

1. **Energy-like drift at P exceeds the preregistered $10^{-8}$ in controls 1 and 2.** The values are $1.73\times10^{-8}$ and $1.97\times10^{-8}$. The preregistration sets that figure for drift "over a run", without restricting it to a length; its own table has horizons of 5, 10 and 20 periods, and these 200-period runs extend it (corrected, R6-03). By its own rule a miss marks the number as unchecked and sends it to adjudication; it stays a miss of the acceptance rule whatever the adjudication finds. The measured accuracy, kept separate from that rule, is the reference comparison: C drifts $4.2\times10^{-10}$ and $1.9\times10^{-9}$, R5 drifts with the opposite sign, and the exact solutions show that P's trajectory error is $1.6\times10^{-3}$ and $1.8\times10^{-3}$ in position after 200 periods. The growth with horizon has the pattern of accumulated integration error. The frozen investigation reports, for its circles at 20 periods and setting P, a relative separation deviation of at most $1.8\times10^{-9}$ and an energy-like drift of at most $1.7\times10^{-9}$; at 200 periods I measure $1.73\times10^{-8}$ for both, ten times as much for ten times the horizon. The position error grows faster: my five-period known case k2 returns within $4.7\times10^{-7}$ and the 200-period run within $8.1\times10^{-4}$ per member, a factor of 1,700 for a horizon 40 times longer, close to the square, as a slowly growing frequency error would give. Grade: the sizes are measured; "linear" and "quadratic" growth are inferred from two horizons each.
2. **Tolerance settings are not error bounds.** Tightening the relative tolerance by 100 reduced the measured position error by 41 in controls 1 and 3 and by 11 in control 2. C keeps the absolute tolerance at $10^{-12}$, the same as P. I have not established why control 2 improves less; I infer that the absolute tolerance limits it. No error bound is claimed from any tolerance value; the errors quoted are measured against the references.
3. **Sign of the drift.** The two adaptive settings gain energy and the fixed-step method loses it, in all three controls. A sign change between methods does not by itself show that the law has no departure (corrected, R6-04). The support for reading these differences as numerical is the agreement with the separately derived references and its improvement under refinement. Grade: inferred, bounded by the measured errors in the tables.

Every measured difference is quantified against a separately coded reference. Two attributions remain inferences and not established causes: the smaller improvement in control 2 (item 2), and the origin of the invariant errors that displace control 3's inner turning points (Section 10.1).

## 6. What this establishes, and what it does not

- **Derived:** the circular speed $u^2=2K/(4r+K)$; the Kepler reduction at zero coupling; the reduced motion and its turning point $r_{\rm out}$ for control 3.
- **Measured (pair instrument, binary64, the three preparations and horizons above, three numerical settings):** all three trajectories stay regular and inside the declared domain for their full horizons and agree with the separately coded references to the errors tabulated.
- **Independence.** The three numerical settings share the instrument's assembly of the acceleration equations, so their mutual agreement is not independent evidence. The independent evidence is the comparison with the exact circle, the Kepler closed form and the reduced quadrature, written in another language with no shared code. The reduced motion and the confinement proof are two derivations from the same functional; they are separate work, and the trajectory is new evidence that the proof did not have.
- **Boundaries.**
  - *Sampled, not continuous.* Ranges are over 40,001 or 10,001 samples and the located turning points. Stop and domain events are tested for a sign change at each integration step (steps of at most 22.2 time units against periods above 4,400); a double crossing inside one step would not be seen.
  - *Binary64 preparation.* The proof's theorem is stated for exact rational data at fixed momentum. The instrument's inputs differ from those by rounding ($3\times10^{-19}$ in momentum), so the theorem is not claimed for the rounded preparation; the reduced reference uses the binary64 values directly and gives $r_{\rm out}$ inside the enclosure.
  - *Scope.* One separation, three preparations, finite horizons. No statement about other separations, general drift, the delayed law, or physical accounts.

**Falsifiers.** A correct reduction of the functional that gives a different circular speed, Kepler parameter or outer turning point. A separately written integrator of the same equations that, after passing its own known cases, leaves the separation of control 3 outside $[100,r_{\rm out}]$ by more than its own measured error, or finds a stop event inside these horizons. A recomputation from the retained raw records that disagrees with the summaries.

## 7. Failures and limitations

1. **Two reference-script runs failed before the passing one; both are retained with their sources.** Each divided by zero in the reduced quadrature at a turning point, where my integrand is a removable $0/0$: the first through the quadrature rule's near-endpoint nodes, the second through a bisection bracket placed too close to the turning point. Neither produced a known-case result or read a target. I replaced the quotient by its limiting value wherever $|\sin(\phi/2)|$ or $|\cos(\phi/2)|$ is below $10^{-8}$, with $\phi$ the quadrature angle, and raised the working precision from 50 to 60 digits. The limit is exact only at the turning point itself; on that small interval it is an approximation, quantified in Section 10.4, and 60-digit arithmetic is not a claim of 60-digit accuracy (corrected, R6-04). I saw only the error traces, not target comparisons, before making those changes.
2. **The wrapper and the nine target runs each ran once and were not repeated.**
3. **Reading coverage was partial, because of the packet's length.** Read in full: the pair instrument (all 743 lines; lines 564–743, the self-check, controls and command line, only after the runs), the retained long-run runner and the retained DG-100 case file. Also read in full, the last parts after the runs: the preregistration (71 lines) and the confinement proof (231 lines). Read in part: the retained target runner, lines 1–45; the Codex Darwin review, lines 80–128 (findings, receipts, final assessment) and its headings; my addendum, Sections 3 and 8 and its headings; the frozen investigation, only Section 13.4's opening, the freeze paragraph that proposes these three controls, the circle results paragraph, and the lines naming DC-100 or DG-100; the binary priorities, only the Darwin paragraph. A search of the live binary work queue for "Darwin" returned no line, so I read nothing there. I did not read the instrument's operational-evidence document beyond its long-run paragraph heading. Nothing in this report depends on text I did not read, but I cannot say those documents contain nothing else relevant.
4. **One of my own steps was skipped silently.** The command that should have copied the wrapper source into the owner before the first run was guarded by a freshness test, which failed because the coordinator's subfolder was already there; the runs then proceeded. I found this at the end and made the copy then, as described in Section 8.
5. **No platform, permission or identity limit was met.** The session identity matched; all compute ran under the supervisor with closed process groups.

## 8. Retention

Sources in the parent `evidence/` folder: the wrapper and the reference script named above. Owner `.local-data/master-equation-closure/serial-darwin-trajectory-controls-2026-10-11/`. The coordinator had already created that directory with its own `codex-dispatch` subfolder; I listed its file names once, did not read or change its files, and left it out of my manifests; every file of mine there is new:

- `run1/known.json`; nine `*.summary.json` files (preparation, parameters, integrator counts, initial invariants, final state, suprema, every turning point, every twentieth sample, extrema over all samples, and the hash of the raw record); nine complete raw records, compressed after hashing, with every sample and event; `targets-index.json`.
- `reference-run3.json` (passing), the two failed reference runs with their error traces, and the reference source as it stood at each run; a copy of the wrapper source, made after the runs (my copy step before the first run was skipped because the directory already existed; the wrapper was not edited after its first run, and the hash recorded inside `known.json` and every summary, `615baf3a…c95b`, equals the copy's); `derived-extras.json` (turning-point extremes and drift checks computed from the summaries) and `derived-extras-2.json` (the proof-bound checks of Section 4.3, computed from the raw records); `commands.txt`.
- Supervisor records for five jobs: known cases, targets, and the three reference runs (two failed with exit 1, one completed), each with a closed process group; final closeout.
- `outputs.sha256` and `sources.sha256`. The second covers the wrapper, the reference script, the unchanged instrument, the investigation, the proof, the preregistration and the retained DG-100 case file.

Nothing was lost by compaction: the raw records keep full coverage. No frozen investigation, instrument, reference, case or receipt was changed, and the instrument's original output directory was not written.

## 9. Unresolved work and proposed integration

**Unresolved for task 6.** None of the three selected runs is missing. Every measured difference from the references is quantified; the two attributions named at the end of Section 5 are inferred and not established. Open items a reviewer may want: the cause of the smaller improvement in control 2 (Section 5, item 2); a full read of the documents listed in Section 7, item 3; and an integrator that does not share the instrument's assembly, which would be needed to test the assembly itself beyond these three analytic comparisons.

**Proposed integration, for the coordinator; not applied.** In the binary priorities' Darwin paragraph, replace the statement that these three runs are unlaunched by their results: DC-100 holds its circle for 200 periods with measured separation error $4\times10^{-8}$ at the tighter setting; the zero-coupling DG-100 control follows the closed-form Kepler ellipse between $99.5423$ and $100$ with all 401 turning points matched; the near-circle with common normal velocity has measured separations from $100$ to $100.00251927$ at P, $100$ to $100.00251885$ at C, and $100-1.37\times10^{-8}$ to $100.00251884$ at R5 over 50 periods, with all 99 turning points matched to the reduced motion. Stated separately: the theorem's enclosure $100\le r\le100+1/360$ is proved for exact data; the measured upper extremes are $2.6\times10^{-4}$ inside it, and R5's records fall below its lower end by up to $1.37\times10^{-8}$, which is a property of that rounded run (corrected, R6-02). Keep the grades: measured trajectories under a comparison functional, each checked against a separately coded analytic reference; no general-drift theorem and no delayed law.

## 10. Corrections after the coordinator's review (2026-10-11)

The coordinator reviewed this report at SHA-256 `78f3617dcbc6a1b03af896a58abf1564fb5e4685d3777436197ca78a23f5e86a` and raised four comments in its [review](serial-darwin-trajectory-controls-codex-review-2026-10-11.md). Those bytes are retained as `report-as-reviewed-78f3617d.md` in the supplement owner named in Section 10.5. The passages above that were wrong or too broad were corrected in place, each marked with its comment number; no table value changed. The wrapper, the reference script, their outputs and both original manifests are unchanged.

A third script, [`serial-darwin-trajectory-controls-supplement-2026-10-11.py`](../evidence/serial-darwin-trajectory-controls-supplement-2026-10-11.py), imports the reference script unchanged and reads the retained raw records of control 3. It integrates nothing. Its eight known cases passed before any target, on its only run, under the supervisor: the inner root at the unperturbed invariants is 100; the slope at the binary64 data is $-1/800000000$ within $10^{-18}$; lowering the energy alone moves the exact inner root outward by the first-order amount; lowering the angular invariant alone, and lowering the momentum alone, each move it inward by the first-order amount; a planted wrong sign of the angular term misses by more than half; and the invariants of the prepared state, recomputed in 60-digit arithmetic from formulas written from the functional, equal the derived values.

### 10.1 R6-01: the inner turning point and the three invariants

**Disposition: the energy-only explanation is withdrawn; the coordinator's relation is confirmed.** With $D=r^2+r/2$ and $q=1-1/(2r)$, differentiating $E=W(r;\ell,P)$ at a simple turning root gives

$$
\delta r_{\rm in}=\frac{\delta E-(2\ell/D)\,\delta\ell-(P/(2q))\,\delta P}{W'(100)},\qquad W'(100)=-\frac1{800000000},
$$

to first order. I re-derived this and checked each term against exact root shifts (the known cases above). Because the slope is negative, a loss of energy alone moves the inner root outward. Grade: derived.

**What the records show (measured, 60-digit recomputation from the binary64 states).** At each of the 49 located inner turning points of each setting I recomputed the state's energy-like invariant, angular invariant and momentum, and solved for the exact inner root of $W$ at those values. The state's separation equals that root within $1.5\times10^{-20}$ at every point. This is an identity of the reduction for a state with zero radial speed in the invariant plane; it confirms the reduction and says which invariant errors displace the turning point. It does not say why those errors arose.

At R5's last inner turning point ($t=219610$), which is its most inward, the three first-order terms are:

| Term | Invariant error | Displacement of the inner root |
| --- | --- | --- |
| energy-like | $-6.80\times10^{-13}$ | $+5.44\times10^{-4}$ (outward) |
| angular | $-4.81\times10^{-10}$ | $-5.44\times10^{-4}$ (inward) |
| momentum | $-3.56\times10^{-15}$ | $-1.42\times10^{-8}$ (inward) |
| sum | | $-1.37\times10^{-8}$, the measured dip |

The energy and angular terms are each forty thousand times the dip and cancel to about one part in a million; their remainder is $+5.6\times10^{-10}$. The net inward displacement is therefore set almost entirely by a momentum error of $3.6\times10^{-15}$, magnified by the very small slope. At P and C the same two large terms cancel with the opposite signs (energy inward, angular outward) and the net is outward, $+4.3\times10^{-7}$ and $+1.0\times10^{-8}$ at their last inner turning points. The first-order sum matches the exact root within $5.4\times10^{-11}$ (P) and $6\times10^{-14}$ (C, R5).

**Reading.** The position of the measured inner turning point relative to 100 is the small remainder of large cancelling invariant errors, and at R5 it is governed by an error in the fifteenth decimal of the momentum. So its sign carries no information about the law. That the invariant errors themselves are numerical is inferred from the reference and refinement comparisons; I have not established how each method produces them, and I make no error budget for them. Falsifier: a correct differentiation of $W$ with a different sign or coefficient; or a recomputation from the raw states in which the separation at an inner turning point differs from the root at that state's invariants by more than the arithmetic allows.

### 10.2 R6-02: measured range and theorem, stated separately

**Disposition: corrected in Sections 4.3 and 9, and the comparison label is clarified here.** Strict membership of every sampled and located separation in $[100,\,100+1/360]$, from the raw records:

| Setting | Records | Minimum minus 100 | Maximum minus 100 | Records below 100 | Strictly inside |
| --- | --- | --- | --- | --- | --- |
| P | 10,101 | $0$ | $0.0025193$ | 0 | yes |
| C | 10,101 | $0$ | $0.0025189$ | 0 | yes |
| R5 | 10,101 | $-1.37\times10^{-8}$ | $0.0025188$ | 60 | no |

The field `sampled_inside_enclosure_100_to_100_plus_1_over_360` in the retained reference output is true for all three settings because it used samples only and allowed $10^{-6}$ below 100. It is a widened comparison label, not strict membership; the retained output is left as it is and this table supersedes that label. The theorem's enclosure is a statement about exact data under its hypotheses. These are observations of rounded trajectories at retained times, not continuous bounds.

### 10.3 R6-03: what the preregistration actually says

**Disposition: corrected in the outcome paragraph and in Sections 1 and 5.** The drift tolerance of $10^{-8}$ is for drift "over a run" and is not tied to 20 periods; the preregistered table has 5-, 10- and 20-period horizons, and the present 200- and 50-period runs are a selected extension. Against that tolerance at the primary setting: control 1 misses in the energy-like invariant ($1.73\times10^{-8}$) and meets it in the angular invariant ($8.6\times10^{-9}$) and momentum; control 2 misses in the energy-like invariant ($1.97\times10^{-8}$) and meets it in the others ($9.8\times10^{-9}$); control 3 meets all three. The two misses stand as misses of the acceptance rule. The measured accuracy against the references is reported separately and does not convert them into passes. The cadence difference for control 2, $0.47$ percent above the preregistered limit, is disclosed in Section 1.

### 10.4 R6-04: the endpoint approximation, attribution, and wording

**Disposition: corrected in Sections 4.2, 5 and 7, and quantified here.**

- *The approximation.* The reference script uses the limiting value of the quotient $G$ where $|\sin(\phi/2)|<10^{-8}$ at the inner end or $|\cos(\phi/2)|<10^{-8}$ at the outer end, that is on an interval of width $2\times10^{-8}$ in $\phi$ at each end, which is within $2.5\times10^{-19}$ of the turning point in separation for control 3. The limit is exact only at the endpoint. Measured at the threshold, the quotient differs from the limit by $5.0\times10^{-21}$ relative.
- *What accuracy is supported.* Doubling the number of quadrature pieces from 8 to 16 changes the radial period by $1.2\times10^{-45}$, the angle advance by $1.7\times10^{-48}$ and the centre travel by $6\times10^{-48}$. From the measured threshold difference and the interval width I estimate the endpoint approximation's effect on the period at about $10^{-25}$; that is an estimate, not a bound. In the Kepler known case the same quadrature matched the closed-form period within that case's tolerance of $10^{-25}$. The report quotes these quantities to twelve significant figures, which this supports. No 60-digit accuracy is claimed.
- *Attribution.* The statement that a property of the law could not change sign with the method is withdrawn as too broad; Section 5, item 3 now rests the inference on the reference and refinement comparisons.
- *Wording.* "No longer near-circular" is replaced by the eccentricity and the excursion.

### 10.5 Retention and what remains

Supplement owner `.local-data/master-equation-closure/serial-darwin-trajectory-controls-supplement-2026-10-11/`: the report as reviewed; the supplement source as run; `supplement-run1.json`, which holds two JSON documents in sequence (the imported reference script's own known-case output, then the supplement's); its error stream; the supervisor record (run `39202596-f58d-4e26-b651-5484c5c26c14`, completed, exit zero, process group closed); closeout; `outputs.sha256` and `sources.sha256`. The original owner and its two manifests are unchanged and still verify.

**Not done.** No error budget for how each integration method produces its invariant errors; no explanation of control 2's smaller improvement; no rerun at the preregistered cadence for control 2; no integrator independent of the instrument's assembly. The reading-coverage limits of Section 7 are unchanged.
