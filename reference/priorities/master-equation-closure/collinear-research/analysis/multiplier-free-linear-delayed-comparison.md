# Multiplier-free linear delayed comparison

## Result and equation scope

The intended comparison is now made between the ordinary instantaneous oscillator and a delayed response with a linear spatial numerator, without a quadratic receiver multiplier. Independent bounded numerical instruments find passage, immediate outgoing braking, a turn and return, followed by a farther second turn. Their first two crossing speeds are approximately 0.457136 and 0.787762, and turning distances are 0.846661 and 1.798242. The ordinary instantaneous oscillator repeats with crossing speed 0.378305 and turning distance 0.5. Thus the measured loss of recurrence on these first excursions survives removal of the inherited factor. The earlier three-crossing numbers and modified logarithmic invariant are not results for this equation.

The independent prefix next approaches wake speed at positive separation on the third inward leg, with a local equality estimate. Crossing equality would change causal-root geometry; it is not an imposed speed boundary. A separately derived local self-birth theorem is in the [independent reference](multiplier-free-linear-independent-check.md), conditional on the exact incoming solution satisfying its continuous hypotheses. Later all-root numerical candidates are retained below, with their event-validation limits. No indefinite growth, global escape, repeating retained history, or genuine no-continuation theorem is established. This investigation adopts no physical linear response for architrinos and changes no production EOM path.

## Preparation and complete law

Two persistent opposite-polarity labels have positions $x(T)$ and $-x(T)$, with $x(T)=a=0.5$ and zero velocity for all $T\le0$. They are released at rest at $T=0$. The held past is imposed preparation, not an equilibrium of the released equation. Set $k=0.2862286103053385$ and normalized wake speed $c_f=1$. The coefficient matches the earlier inverse-square release acceleration at separation one only; equality of normalized numbers with different dimensional coefficients is a comparison convention.

The ordinary instantaneous control is

$$
x'=v,\qquad v'=-2kx.
$$

For a partner emission at $S<T$, let $d=x(T)+x(S)$ and require $T-S=|d|$. For a self emission let $e=x(T)-x(S)$ and require $T-S=|e|$. The intended delayed equation retains every admitted positive-delay root:

$$
x'=v,\qquad
v'=-k\sum_{\mathcal C_p(T)}\frac{d}{|1+\operatorname{sgn}(d)v(S)|}
+k\sum_{\mathcal C_s(T)}\frac{e}{|1-\operatorname{sgn}(e)v(S)|}.
$$

This follows by replacing the spatial inverse-square numerator by the selected signed linear numerator while retaining polarity, causal arrival, absolute transmitter weighting and same-law self reception. The [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md) owns those retained conventions. The linear numerator is itself the selected exploratory modification; the complete delayed equation is geometrically nonlinear. There is no receiver response, cap, length, excluded earlier self root, contact kick, or prescribed reversal. The exact zero-delay diagonal is outside the causal law; excluding it does not exclude earlier self arrivals.

Write $P(S)=S+x(S)$ and $Q(S)=S-x(S)$. The complete root families are:

| Channel and displacement | Scalar root equation | Additional admissibility |
| --- | --- | --- |
| Partner, $d>0$ | $P(S)=Q(T)$ | $S<T$, $d>0$ |
| Partner, $d<0$ | $Q(S)=P(T)$ | $S<T$, $d<0$ |
| Self, $e<0$ | $P(S)=P(T)$ | $S<T$, $e<0$ |
| Self, $e>0$ | $Q(S)=Q(T)$ | $S<T$, $e>0$ |

Every monotone sector between extrema of $P$ and $Q$ must be considered. In the held past the roots are available analytically; the past is not truncated. On a complete strict-subfield history, the fixed-reception residual is strictly monotone, so there is exactly one earlier partner root at nonzero separation and no earlier self root. This geometric theorem licenses the single-root prefix, and ceases to license it when speed crosses one.

## Independent exact references

Direct differentiation gives the ordinary solution and invariant

$$
x=a\cos(\sqrt{2k}T),\qquad v=-a\sqrt{2k}\sin(\sqrt{2k}T),\qquad E=\frac12v^2+kx^2=ka^2.
$$

While the delayed partner source remains in the held past, $S=T-x-a\le0$, the equation becomes $x''=-k(x+a)$ and hence

$$
x=2a\cos(\sqrt{k}T)-a,\qquad v=-2a\sqrt{k}\sin(\sqrt{k}T).
$$

The interval stops at its history join or an earlier causal-chart event. These exact solutions were checked before target use by both independently authored instruments. The quantity $E$ is mathematical bookkeeping, with no primitive mass or physical-energy assertion.

For the complete delayed equation, its exact derivative is

$$
E'=kv\left(2x-\sum_{\mathcal C_p}\frac{d}{|D_p|}+\sum_{\mathcal C_s}\frac{e}{|D_s|}\right).
$$

On the single-root self-free prefix this is $kv(2x-d/D_p)$. No identity makes it zero, and no global sign is proved. The former invariant $-\frac12\log(1-v^2)+kx^2$ belongs to the factor-bearing model; it is neither conserved here nor even real above wake speed.

The [local slow-history lemma](collinear-review-integration-2026-10-03.md#local-leading-order-delay-balance) separates the leading range-delay contribution from the source-weight contribution. For the selected linear numerator each supplies half of the leading term $4k|x|v^2$, with an acceleration remainder bounded by $20k(2|x|)\varepsilon^2$ under $|v|\le\varepsilon\le1/8$ and $MR\le\varepsilon^2$. This is a conditional local derivation, not a sign theorem for the present moderate-speed run or a completed cycle-growth theorem. It refines analytical attribution without changing the measured prefix or the completed postfold results.

## Independently checked bounded event sequence

The [independent prefix instrument](../../../../../scripts/collinear-research/multiplier-free-linear-independent-prefix.py) evolves $x,v$ directly with fourth-order Runge–Kutta steps and cubic history interpolation, stopping before speed equality. The [complete-ledger exploratory instrument](../../../../../scripts/collinear-research/multiplier-free-linear-comparison.py) uses midpoint steps and explicitly enumerates partner and self sectors. They share the declared law, but were authored independently and the prefix results were returned before the independent author read the other instrument or its target output. Exact controls test the equation-specific normalization and known trajectories; refinement tests consistency, not continuous error certification.

| Event | Ordinary oscillator, exact | Multiplier-free delayed prefix, independently measured | Interpretation |
| --- | --- | --- | --- |
| First contact | Speed 0.378305 | $T=1.942296749$, speed 0.457136 | Transverse subfield passage; partner root collapses to zero delay and acceleration tends to zero |
| First turn | Distance 0.5 | $T=4.757251974$, distance 0.846661 | Outgoing braking reverses velocity; no turn time was supplied |
| Return contact | Speed 0.378305 | $T=6.946971230$, speed 0.787762 | Return passage remains subfield |
| Second turn | Distance 0.5 | $T=10.426504986$, distance 1.798242 | Second excursion exceeds first in this bounded calculation |
| Third inward wake-speed event | Never reached: exact maximum speed 0.378305 | Equality estimate $T=12.411882246$, $x\approx0.861795$ | First self-root birth; no cap or domain exclusion in this equation |

The independent instrument stops with speed margin about $9.89\times10^{-8}$ at $T=12.411882081$, partner acceleration approximately $-0.599216209$. The equality time is a local extrapolation, not a certified enclosure. The independent reference reports its refinement table and control errors. At subcritical contacts, the corrected affine-history substitution gives $x''=-2kx/(1+\operatorname{sgn}(x)v_c)^2+o(|T-T_c|)$; the earlier coefficient is withdrawn in the [independent contact correction](multiplier-free-linear-self-birth-to-fold-independent-check.md#exact-affine-control-and-correction-of-the-earlier-contact-coefficient). Acceleration tends to zero at contact, and braking begins immediately afterward. The numerical chronology is consistent with that distinct analytical contact reference.

## Regime changes and retained later candidates

The [postfold continuation](multiplier-free-linear-postfold-continuation.md) reaches the next upward speed crossing at $T\approx16.166574$, $x\approx-9.022338$, $v=-1$. The [independent event theorem](multiplier-free-linear-postfold-independent-check.md#existence-of-both-upward-crossing-branches-and-uniqueness-obstruction) proves multiple local continuous-velocity, finite-one-sided-acceleration continuations in the punctured/integral equation class under its smooth-history hypotheses. The newborn self root cannot be omitted, and the stated equation does not uniquely select a branch in that class. The [independent incoming integral audit](multiplier-free-linear-postfold-integral-check.md) is separate from numerical refinement. The old later-turn candidates below remain historical; a branch-specific future and continuous exact-release enclosure are unresolved.

The following table preserves the original exploratory candidates. The [resolved-release continuation](multiplier-free-linear-self-birth-to-fold.md) supersedes their third-contact and first-fold uncertainty with new numerical evolution from the held release, independently checked on complete roots and acceleration integrals. Its third speed is 1.896351 and fold time approximately 13.100022. Continuous exact-release enclosure and later outer-turn/return claims remain unresolved; old fixed-step measurements are not relabeled as the new result.

At the first negative-speed crossing, earlier source history has $P'=1+v>0$ up to its endpoint; later superfield motion has $P'<0$. A new self root is unavoidable. If incoming acceleration is $-B$ and the finite outgoing trace is $-b$, the independently derived matching relation is

$$
b=B+\frac{k}{B}+\frac{k}{\sqrt{Bb}}.
$$

For the measured $B\approx0.599216209$, this gives $b\approx1.390462971$. The new self contribution is bounded but nonzero, so it changes acceleration without supplying an impulse or velocity jump. Extending the old partner-only equation or preserving the old acceleration trace fails this relation. The independent reference proves unique short coupled continuation in a smooth incoming-history, finite-trace class by parameterizing reception with the earlier self source. Its regular-singular equations select the bounded branch without an outgoing parameter. The measured positive separation and regular surviving partner row are consistent with this theorem, but its continuous hypotheses are not certified by sampled margins.

The all-root instrument was then run through $T=24$ at steps $1/1024$, $1/2048$ and $1/4096$. It uses cubic Hermite retained histories, splits each $P,Q$ sector at every interpolated speed extremum, brackets each candidate root, checks direction and delay, and sums absolute transmitter weights. The source velocity is the derivative of that interpolated position. No channel failure is assigned zero. An unresolved nonordinary row ends the run explicitly; a sampled transit does not certify a caustic. The trial position predictor includes its quadratic acceleration term to avoid fitting an inconsistent local position/velocity history. All revised controls passed before these runs.

| Later event or census | Measured candidate on finest all-root history | Evidence boundary |
| --- | --- | --- |
| Self birth | First sampled one-partner/one-self ledger at $T=12.412109375$ | Independent local trace reference; fixed-step birth timing is less accurate than independent prefix estimate |
| Third contact | $T\approx13.012281$, speed approximately 1.896354 | Candidate only after coupled self birth; older roots remain, so the subfield zero-total-acceleration statement cannot be copied here |
| Partner multiplicity after contact | Three partner roots and one self root sampled from $T=13.012451172$ | All monotone sectors of the interpolated history included; no independent continuous census certificate |
| First inherited partner fold | Three-to-one partner transition sampled at $T=13.100097656$ | Two positive-distance roots coalesce at the inherited $P$ maximum; acceleration has an integrable fold singularity, not a proved dynamical stop |
| Later outer turn | $T\approx16.305132$, distance approximately 9.089188 | Candidate; step refinement gives 16.313457, 16.307507, 16.305132, insufficient to promote the later coupled event sequence |
| Later history through $T=24$ | Additional one-sided turns, up to three partner and seven self roots sampled | Retained exploratory evidence only; no completed return, cycle, indefinite growth or escape claim |

Ordinary positive-delay folds have locally integrable acceleration proportional to $|T-T_*|^{-1/2}$ when the numerator is bounded and source/receiver transversality holds. Where the source maximum has unequal quadratic sides due to the self-birth acceleration change, each side needs its own coefficient. A numerical small denominator or a finite terminal time is not a no-go theorem. The fixed-step instrument neither certifies the local event integral nor proves unique coupled gluing through this fold; its late turns are not established geometry advances.

The [coupled fold follow-up](multiplier-free-linear-partner-fold-transit.md) supplies an independent conditional local theorem with continuous velocity, unequal one-sided source curvatures and the complete root transition, plus a coupled receiver evolution on supplied Hermite history. Its [independent source-time integral audit](multiplier-free-linear-partner-fold-integral-check.md) finds nonconvergent integrated-equation residuals in the older fixed-step receiver paths. Their sampled fold passage and later turns remain exploratory. The [resolved release](multiplier-free-linear-self-birth-to-fold.md) measures the required history from the held preparation through third contact and this fold, with independent root/integral checks and conditional finite-contact/approach proofs. Postfold evolution reaches the new upward speed event described above. A continuous rigorous exact-release enclosure and branch-specific later evolution remain unresolved. The conditional uniqueness obstruction at upward self birth supplies no nonexistence theorem for all continuation. Persistent characteristic families, deeper degeneracy or a non-locally-finite root sum would require their actual analysis if encountered; none is inferred from a finite horizon or numerical sensitivity.

## Reproduction, evidence and falsifiers

Run the shared executable venv from the repository root:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/multiplier-free-linear-comparison.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/multiplier-free-linear-comparison.py --h 0.000244140625 --end 24
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/multiplier-free-linear-independent-prefix.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/multiplier-free-linear-independent-prefix.py --h 0.000244140625 --end 16
```

Receipts and histories are in `.local-data/collinear-research/multiplier-free-linear/` and `.local-data/collinear-research/multiplier-free-linear-independent/`. The former contains an instrument snapshot and excluded preliminary interpolation runs in `preliminary/`; the historical factor-bearing script and `.local-data/collinear-research/linear-response/` remain intact. Known-case receipts precede target receipts. Jobs were watched in the foreground and the longer run emitted an advancing ten-second heartbeat; no unattended job remains.

A separately evolved prefix with different first contacts or turns under the same preparation would overturn the bounded measured comparison. A missed admissible root or wrong absolute source weight would refute the claimed ledger on an interpolated history. Failure of the local self matching relation would refute that continuation candidate; failure of reception-time integral convergence would prevent promoting the late numerical events. A later bounded or repeating history would defeat any indefinite-growth extrapolation, which is not made. Markdown/link validation does not establish mathematical correctness.
