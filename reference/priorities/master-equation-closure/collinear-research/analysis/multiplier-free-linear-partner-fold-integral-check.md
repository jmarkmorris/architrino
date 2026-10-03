# Independent frozen-history integral at the first partner fold

**Date:** 2026-10-02. **Status:** ✓ Done for the assigned frozen-integral check. **Scope:** an independently authored acceleration-integral calculation on the three retained multiplier-free linear histories. This is not an evolved trajectory, a rigorous enclosure or a proof of coupled transit. **Instrument:** [source-time integral checker](../../../../../scripts/collinear-research/linear-partner-fold-independent-integral.py). **Equation:** the complete partner/self linear law with absolute transmitter weights and $c_f=1$; no cap, receiver response, softening, impulse or self-root suppression.

**Measured conclusion:** source-time quadrature converges on each frozen history and the fold integral is stable across the three supplied histories. Their endpoint velocity increments do not match that integral at comparable accuracy: the residual changes sign and its magnitude increases at the finest resolution relative to the middle resolution. This independently supports a finite acceleration integral on the interpolants, while withholding full coupled-transit validation. It establishes no new evolved passage, turn or return.

The calculation separates two questions: whether the acceleration on a frozen path has a finite integral through its source fold, and whether that integral agrees with the path's velocity change. Quadrature convergence on a specified interpolant answers the first numerical question. Agreement across independently frozen histories and a small equation residual are additional requirements before interpreting them as an evolved solution.

## Independent calculation and known control

For a source-time clock $F(S)$ and receiver-time clock $G(T)$, a root branch solves $F(S)=G(T)$. Its linear contribution has the form

$$
a(T)=\sigma k\frac{T-S}{|F'(S)|},\qquad
\sigma\in\{-1,+1\}.
$$

On a reception interval where $G'$ has no zero, change variables from reception time to emission time on every branch. Absolute integration weights give

$$
\int a(T)\,dT
=\sigma k\int\frac{T(S)-S}{|G'(T(S))|}\,dS.
$$

The source derivative has canceled from the integration density. A source fold is therefore regular in this variable; both source branches are retained separately, even when their source-clock orientations differ. This cancellation is a change of integration variable, not a modification of the instantaneous equation.

Set $P(S)=S+x(S)$ and $Q(S)=S-x(S)$. The checker accounts for positive-distance partner $(F,G,\sigma)=(P,Q,-1)$, negative-distance partner $(Q,P,+1)$, negative-distance self $(P,P,-1)$, and positive-distance self $(Q,Q,+1)$. Every earlier root must satisfy $S<T$; the exact zero-delay self diagonal is excluded. The channel identities themselves give the required displacement signs when $S<T$. The held negative-time source is included analytically, with a finite source-time lower bound larger than every causal age permitted by the bounded receiver window and held position. This bound is an exact domain reduction on the held tail, not memory truncation.

The instrument uses SciPy piecewise-polynomial root solving to enumerate the full saved interpolant, rather than the evolving instrument's root census. It constructs cubic Hermite positions from saved $(T,x,v)$ and differentiates that same position to obtain velocities. The root solver is tested before target use. Integration splits at source extrema, source interpolation knots, receiver knots pulled back to source time, and receiver-window boundary levels. Gaussian quadrature then integrates regular source-time intervals. No source branch is assigned zero because its weight is large.

The artificial known case has $P_{\rm source}(S)=2-CS^2/2$, with curvature $C=B=0.6$ on the negative side and $C=b=1.4$ on the positive side, while $Q_{\rm receiver}(T)=T$. Reception fold time is two. For a reception width $\delta>0$, the exact fold-pair integral is

$$
I(\delta)=-k\left[\left(\frac1{\sqrt{2B}}+\frac1{\sqrt{2b}}\right)\left(4\sqrt\delta-\frac23\delta^{3/2}\right)+\left(\frac1B-\frac1b\right)\delta\right].
$$

This follows by integrating the two source parabolas, each with its absolute weight. It tests unequal curvatures and reinforcing branches, rather than a symmetric cancellation. At $\delta=0.01$, the exact value is $-0.175375393119686$ and the source-time quadrature differs by $3.05\times10^{-16}$. The two solved roots differ from their exact values by at most $4.83\times10^{-15}$. The passing known receipt was saved before opening a target history, and the known case is rerun and recorded at the beginning of every target command.

## Target results

The source files are `.local-data/collinear-research/multiplier-free-linear/delayed-h1024.npz`, `delayed-h2048.npz` and `delayed-h4096.npz`; each independent receipt records its input SHA-256. The checker reads only their time, position and velocity arrays. It does not consume the saved evolving-instrument ledger or inspect a forthcoming transit instrument. These are exploratory postbirth histories, not independently certified trajectories.

For each saved interpolant, the checker locates the first source $P$ maximum near self birth, then solves $Q(T_f)=P(S_f)$ for its reception fold. At six reception probes with offsets $\pm10^{-2}$, $\pm10^{-3}$ and $\pm10^{-4}$, the complete polynomial census records the partner/self roots and their source weights. The expected transition is three partner roots and one self root before the fold, followed by one partner root and one self root. Root count on a polynomial interpolant is distinct from a continuous certificate for the exact delayed solution.

| Saved time step | Independently located reception fold $T_f$ | Source curvature four steps before / after its maximum | Receiver $Q'(T_f)$ | Probe census before / after |
| --- | ---: | ---: | ---: | --- |
| $1/1024$ | 13.10002980005 | 0.598738 / 1.396712 | 3.094632 | 3 partner + 1 self / 1 partner + 1 self |
| $1/2048$ | 13.10002794806 | 0.598945 / 1.405416 | 3.093387 | 3 partner + 1 self / 1 partner + 1 self |
| $1/4096$ | 13.10001876114 | 0.599092 / 1.384463 | 3.093671 | 3 partner + 1 self / 1 partner + 1 self |

These curvatures are measurements of the retained cubic interpolants, not estimates with certified errors for the exact incoming/outgoing acceleration traces $B,b$. At the interpolated maximum itself the curvatures are approximately 0.599290, 0.599221 and 1.482663 respectively. The differing maximum values show why a fixed-step interpolation cannot supply a uniform two-sided trace certificate just by reproducing its node velocities.

Integrate the complete acceleration ledger over $[T_f-\delta,T_f+\delta]$. Let $I$ denote that integral and $\Delta v$ the difference of the frozen interpolant's endpoint velocities. The displayed residual is $\Delta v-I$.

| Saved step | Half-width $\delta$ | Full acceleration integral $I$ | Frozen velocity increment $\Delta v$ | Integrated-equation residual $\Delta v-I$ |
| --- | ---: | ---: | ---: | ---: |
| $1/1024$ | 0.01 | -0.05368243454 | -0.04633613634 | +0.00734629820 |
| $1/2048$ | 0.01 | -0.05368546496 | -0.05295147118 | +0.00073399378 |
| $1/4096$ | 0.01 | -0.05368209950 | -0.05556609849 | -0.00188399899 |
| $1/1024$ | 0.002 | -0.01911636048 | -0.01197359575 | +0.00714276473 |
| $1/2048$ | 0.002 | -0.01911920701 | -0.01842154965 | +0.00069765736 |
| $1/4096$ | 0.002 | -0.01911554276 | -0.02101390895 | -0.00189836619 |
| $1/1024$ | 0.0005 | -0.00856893599 | -0.00291066594 | +0.00565827005 |
| $1/2048$ | 0.0005 | -0.00857083895 | -0.00800524152 | +0.00056559743 |
| $1/4096$ | 0.0005 | -0.00856670731 | -0.01054250290 | -0.00197579559 |

For all nine windows, quadrature orders 16 and 32 differ by at most $6.94\times10^{-18}$ on the same frozen polynomial path. This is numerical integration agreement, not a rigorous enclosure. The three-history integral spreads are approximately $3.37\times10^{-6}$, $3.66\times10^{-6}$ and $4.13\times10^{-6}$ at the respective widths. By contrast the finest velocity-increment residual is about $1.9\times10^{-3}$ at every width. Its nonmonotone refinement prevents claiming that these histories converge to a solution of the integrated equation through this fold. The smaller coarse windows contain few trajectory steps; their Hermite endpoint values provide an interpolation check, not additional dynamical information between those steps.

At the finest resolution and $\delta=0.002$, the full ledger integral separates into positive-distance partner fold pair $-0.01573877641$, surviving negative-distance partner $+0.00004732903$, negative-distance self $-0.00342409539$, and positive-distance self zero. The zero channel is established by the polynomial census and diagonal exclusion on this window, not by a no-self scenario. The two coalescing partner branches reinforce with absolute source weights.

The fold endpoint can also be approached by removing a reception layer of width $\varepsilon$ from the pair integral, then decreasing that layer. On the finest interpolant, the complete pair integral from $T_f-0.002$ to $T_f$ is $-0.01573877641$:

| Removed layer $\varepsilon$ | Truncated pair integral | Omitted signed tail | Tail divided by $\sqrt\varepsilon$ |
| --- | ---: | ---: | ---: |
| $10^{-4}$ | -0.01232237554 | -0.00341640086 | -0.341640 |
| $2.5\times10^{-5}$ | -0.01403898727 | -0.00169978913 | -0.339958 |
| $6.25\times10^{-6}$ | -0.01489185158 | -0.00084692483 | -0.338770 |

The omitted tail approximately halves when the cutoff is quartered, as expected for an integrable inverse-square-root fold. The coarser receipts show the same pattern. This is observed cutoff convergence on the frozen curves; it supplies neither an impulse nor a prescription for the evolved receiver.

## Disposition and validation

The independent frozen-integral calculation passes its exact control and yields a finite, stable fold integral. The integrated trajectory consistency check remains negative at the supplied resolutions: the velocity increment is not converged to that integral. Consequently this result strengthens the frozen-path integrability evidence without establishing the coupled fold transit or promoting any later numerical event. No mathematical impossibility of such transit follows from the discrepancy.

Before file creation, `rg` over `scripts`, `tests` and `reference` for the new instrument/report basenames returned no existing named consumer or binder in that scope. Both earlier trajectory instruments, saved source histories and their receipts were read-only. The independent receipts retain the source hashes and individual source-sector contributions, so omitted roots or a wrong sign can be checked against the concrete integral. All three target jobs completed with exit zero; measured foreground wall times were 18.296, 64.600 and 220.459 seconds, with advancing ten-second heartbeats on the longer runs. No job remains active.

The new script was exercised by its known case and three target invocations. Scoped Markdown/file-link and whitespace checks are recorded with the final handoff; they do not constitute mathematical validation.

## Reproduction and evidence limits

Run the shared venv, in this order:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-partner-fold-independent-integral.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-partner-fold-independent-integral.py --h 1024
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-partner-fold-independent-integral.py --h 2048
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-partner-fold-independent-integral.py --h 4096
```

Receipts belong to `.local-data/collinear-research/multiplier-free-linear-fold-independent/`. Jobs are watched foreground processes and emit a fixed ten-second wall-clock heartbeat while active. No new standing test or production EOM change is included.

The independent reference is the exact artificial fold integral and a separately implemented source-time transformation. Quadrature-order agreement is consistency evidence about its numerical integration. Cross-history refinement is evidence about the three supplied interpolants. Neither proves a full coupled trajectory, unique gluing, exact source curvatures at self birth, or later turns and returns. Cubic histories smooth the finite acceleration-trace change across a step; their very smallest fold neighborhoods therefore need not reproduce the exact piecewise-curvature asymptotics uniformly as the reception cutoff vanishes.

A failed exact control, missed polynomial root, receiver-clock zero in the chosen window, wrong channel sign, use of a signed rather than absolute weight, or nonconvergent quadrature would invalidate the instrument's result. A persistent integral/velocity discrepancy would prevent promoting these histories as satisfying the integrated equation near the fold. A mathematically justified event transit on an evolved solution would require its own complete-ledger and continuous-history evidence.
