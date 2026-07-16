# Antipodal Binary Circular-Force and Spiral-Law Evidence — 2026-07-14

## Scope and disposition

This packet executes the [antipodal-binary spiral-law dispatch](../antipodal-binary-spiral-law-dispatch-packet.md) against the current native `src/eom` engine. It verifies the revised circular force law, certifies the dispatched root gates, reproduces the $s=0.5$ direct-evolution anchor, and tests a radially balanced sub-field-speed start up to the field-speed boundary.

Disposition: `priority-only`; `circular_force_law_native_cross_checked`; `circular_force_law_independently_confirmed_90_digit_oracle`; `field_speed_rail_is_a_singular_boundary_on_the_circular_family`; `through_rail_classical_continuation_not_defined`; `no_score_increase`; **`prehistory_independence_not_attempted`**; **`near_rail_cubic_is_a_seed_transient`**.

**Adjudicated 2026-07-14** — see the [adjudication](antipodal-binary-spiral-law-adjudication-2026-07-14.md). The analytic content of this packet reproduces on an independent 90-digit oracle and stands. Two dispositions were corrected on adjudication: `not_a_two_sided_attractor` is **withdrawn** (no evolution here bears on it), and the near-rail cubic is **demoted to a seed transient** (fitted at $t/h\approx0.005$). The dispatched question — whether a prehistory-independent spiral exists — is **not attempted**: every evolution below seeds a circular prehistory, so no collapse test was run.

## Reproducible instrument

Source: [antipodal-binary-spiral-law.cpp](../../../../../scripts/eom/antipodal-binary-spiral-law.cpp)

Build from the repository root:

```bash
cmake --build .tmp/eom-native-dev --target eom_native -j 4
c++ -std=c++20 -O3 -DNDEBUG \
  -Isrc/eom/include -I/opt/homebrew/include \
  scripts/eom/antipodal-binary-spiral-law.cpp \
  .tmp/eom-native-dev/libeom_native.a \
  /opt/homebrew/lib/libmpfr.dylib \
  /opt/homebrew/lib/libgmp.dylib \
  -pthread -o .tmp/antipodal-binary-spiral-law
```

The circular snapshots use $R=1$, $c_f=1$, unit charge magnitude, and unit coupling to read the dimensionless force functions directly. The direct evolutions use charges $+1/6$ and $-1/6$, net charge zero, and the declared coupling for each radially balanced start. Every native snapshot covers two worldlines and all four ordered pairs.

## Complete-root circular force law

Put the positive receiver at $R(1,0)$ with velocity $s c_f(0,1)$. Define the complete positive root sets

$$
\mathcal P(s)=\left\{\varphi>0:\varphi=2s\left|\cos\left(\frac{\varphi}{2}\right)\right|\right\},
$$

$$
\mathcal S(s)=\left\{\delta>0:\delta=2s\left|\sin\left(\frac{\delta}{2}\right)\right|\right\}.
$$

For a partner root let $\epsilon_p=\operatorname{sgn}\cos(\varphi/2)$; for a self root let $\epsilon_s=\operatorname{sgn}\sin(\delta/2)$. Direct circular geometry gives

$$
\hat{\mathbf n}_p
=\epsilon_p\left(\cos\frac{\varphi}{2},-\sin\frac{\varphi}{2}\right),
\qquad
\hat{\mathbf n}_s
=\epsilon_s\left(\sin\frac{\delta}{2},\cos\frac{\delta}{2}\right).
$$

On each root, the source-normal and receiver-normal factors are equal. Their ratio in $W^{\rm rec}$ is therefore exactly one away from a caustic. The force functions are the complete root sums

$$
\boxed{
F_r(s)
=\sum_{\varphi\in\mathcal P(s)}
\frac{s^2\left|\cos(\varphi/2)\right|}{\varphi^2}
-\sum_{\delta\in\mathcal S(s)}
\frac{s^2\left|\sin(\delta/2)\right|}{\delta^2}
=\frac{s}{2}\left(
\sum_{\varphi\in\mathcal P(s)}\frac1\varphi
-\sum_{\delta\in\mathcal S(s)}\frac1\delta
\right)
}
$$

and

$$
\boxed{
F_\theta(s)
=\sum_{\varphi\in\mathcal P(s)}
\frac{s^2\epsilon_p\sin(\varphi/2)}{\varphi^2}
+\sum_{\delta\in\mathcal S(s)}
\frac{s^2\epsilon_s\cos(\delta/2)}{\delta^2}.
}
$$

Thus

$$
a_r=-\frac{\kappa q^2}{R^2}F_r(s),
\qquad
a_\theta=\frac{\kappa q^2}{R^2}F_\theta(s).
$$

For the unique partner root write $u=\varphi/2$, so $s=u/\cos u$. Below field speed there is no self root and

$$
\boxed{
F_r=\frac{1}{4\cos u},
\qquad
F_\theta=\frac{\sin u}{4\cos^2u},
\qquad
s=\frac{u}{\cos u}.
}
$$

On the primary self branch write $w=\delta/2$, so $s=w/\sin w$. While the partner root is still unique,

$$
\boxed{
F_r=\frac{1}{4\cos u}-\frac{1}{4\sin w},
\qquad
F_\theta=\frac{\sin u}{4\cos^2u}
+\frac{\cos w}{4\sin^2w}.
}
$$

The complete [force table](antipodal-binary-circular-force-table-2026-07-14.csv) records the native cross-checks and exact-formula rows.

## Exact thresholds and rail asymptotics

The self root exists if and only if $s>1$. At $s-1=10^{-6}$ the exact root is $0.0048989777706154322$, while $\sqrt{24(s-1)/s}$ agrees beyond five significant figures. At $s=1.05$ the exact root is $1.0768233446760229$ and the square-root approximation differs by about $0.72\%$.

For $s=1+\varepsilon$,

$$
F_r(s)=F_{r,p}(1)-\frac{1}{4\sqrt{6\varepsilon}}+O(1),
\qquad
F_\theta(s)=\frac{1}{24\varepsilon}+O(1).
$$

The newborn self-hit is therefore an outward radial divergence and a stronger forward tangential divergence. It is not a brake at onset.

The circular-balance radius

$$
R_\star(s)=\frac{\kappa q^2F_r(s)}{s^2c_f^2}
$$

exists only when $F_r>0$. On the one-partner/one-self sheet, $F_r=0$ occurs exactly at $u=w=\pi/4$:

$$
\boxed{s_R=\frac{\pi}{2\sqrt2}=1.1107207345395915.}
$$

There is no positive circular-balance radius for $1<s<s_R$. The self tangential term changes from pump to brake only at $w=\pi/2$, namely $s=\pi/2$, but the total measured $F_\theta$ remains positive through $s=3$.

## Root and engine gates

- $s<1$: native self-root count zero at every measured row through $s=0.999$.
- $s>1$: native self-root count one at $s=1.01,1.05,1.1,1.2,1.5,2,3$.
- $s=2$: native $\delta_s=3.7909885373523533$, reproducing the independent theorem-gate value $3.7909885379$.
- $s=3$: native partner roots $2.3402419602$, $5.3263577770$, and $5.8762007211$, with a certified root-free complement.
- $s=5$: the separate native partner-only completeness gate returns $2.6128798809$, $3.9547658793$, and $7.6749342972$, with a certified root-free complement.
- Native circular accelerations match the closed root sums from about $10^{-10}$ below field speed to $2.2\times10^{-7}$ at the $s=3$ multi-root row under the declared tolerances.
- At $s=1.001$ the exact formula is finite for fixed $s$ but the native sharp self-root cluster does not certify at the attempted resolution. This row is recorded as derived rather than native-certified.

## Evolution and reduced spiral law

Let $K=\kappa q^2$. If $w=R\dot\theta$ denotes tangential speed, the circular-response reduction is

$$
\ddot R=\frac{w^2}{R}-\frac{K}{R^2}F_r(w/c_f),
\qquad
\dot w=\frac{K}{R^2}F_\theta(w/c_f)-\frac{\dot R}{R}w.
$$

This is exact at a circular-history launch. Away from a circular history, the full master equation remains history-dependent, so substituting $F_r(s)$ and $F_\theta(s)$ as a memoryless global force law would overclaim.

The dispatched $s=0.5$, $R=1$ anchor reproduces exactly with $K=32.4125179963575/36$:

$$
R(2)=1.1532465268881593,
\quad
v(2)=0.6886482861893841,
\quad
\dot R(2)=0.2150273962646203,
$$

with 200 accepted steps and zero rejections. Extended to $T=6$, the same path reaches a maximum total speed $0.7014857336568063$ at $T=2.67$, then converts tangential motion into radial expansion; it ends at $R=2.8744743931$ and $s=0.6371191337$. It never reaches the field-speed rail.

For a radially balanced near-rail launch, the same $K$ gives $s_0=0.95$ and $R_0=0.33070936489917174$. The sharp native evolution reaches

$$
t=0.0205,
\quad
s=0.9991564982018826,
\quad
R=0.3307255953426569,
\quad
\dot R=0.0023942757704928,
$$

with 41 accepted steps and zero rejections. Over $0.97<s<0.9991565$, its measured path fits

$$
R(s)=R_0+0.1366559777\,(s-0.95)^3
\qquad\textbf{(seed transient — not a law)}
$$

with maximum absolute residual $1.54\times10^{-9}$, or $9.5\times10^{-5}$ of the measured radial span.

**Claim level: `seed transient`.** This is the leading Taylor coefficient of the seeded circular launch, not a property of the object. The launch conditions $\dot R(0)=\ddot R(0)=0$ force radius to move at third order while the partner channel moves speed at first order, so a cubic is what a cubic-by-construction launch must fit; the small residual measures that construction, not agreement with a law. The window is $t=0.0205$ against a partner delay $\varphi(0.95)/\omega=0.4988076023$ — **$4.1\%$ of one causal delay**, and $t/h\approx0.005$ against this packet's declared $h\in[2.5,4]$. The whole fit lies inside the interval in which the future is still driven by the seeded segment, which the dispatch excludes by name: *"No exponent fitted below one memory depth."* It is retained as a recorded launch measurement and carries the same class as the $0.60113$ seed transient in the work log.

Both the sharp and finite-width-fallback evolutions enter the self-root publication wall when asked to step beyond this row. The analytic force law explains why: the sharp master-equation acceleration has no finite right-hand limit at $s=1$. A classical through-rail spiral path is therefore not defined by the present sharp equation. Continuing past $c_f$ would require an additional, independently declared regularization or constitutive law; choosing one here would tune the object rather than measure the dispatched master equation.

The super-field radially balanced control at $s=1.2$, $R=1$, $K=s^2/F_r=19.463737646797217$ publishes a sharp native step from $s=1.2$ to $1.2011066769400294$ in $10^{-4}$ time units. This agrees with the positive $F_\theta(1.2)$ row and rules out an immediate super-field brake. The short row is a directional control, not a long-horizon orbit claim.

## Convergence

Sub-field control at $s=0.5$, $T=0.5$:

| Refinement | Final radius | Final speed | Difference from base |
| --- | ---: | ---: | ---: |
| base: $\Delta t=0.01$, $h=4$, segment $0.03125$ | $1.0024056560856158$ | $0.5600695858740943$ | — |
| half step | $1.0024056430538040$ | $0.5600696573288181$ | $1.30\times10^{-8}$ in radius; $7.15\times10^{-8}$ in speed |
| $h=5$ | $1.0024056560856158$ | $0.5600695858740943$ | zero at printed precision |
| half segment width | $1.0024056549770435$ | $0.5600696078055958$ | $1.11\times10^{-9}$ in radius; $2.19\times10^{-8}$ in speed |

Super-field control at $s=1.2$, $T=10^{-4}$:

| Refinement | Final radius | Final speed | Difference from base |
| --- | ---: | ---: | ---: |
| base: one $10^{-4}$ step, $h=2.5$, segment $0.005$ | $0.9999999999849850$ | $1.2011066769400294$ | — |
| two $5\times10^{-5}$ steps | $0.9999999999849807$ | $1.2011066771793786$ | $4.3\times10^{-15}$ in radius; $2.39\times10^{-10}$ in speed |
| $h=3.5$ | $0.9999999999849850$ | $1.2011066769400294$ | zero at printed precision |
| half segment width | $0.9999999999849843$ | $1.2011066773244470$ | $6.7\times10^{-16}$ in radius; $3.84\times10^{-10}$ in speed |

## Adjudication

The revised packet's analytic refutation is confirmed by the native measurements, and each of the four points below was subsequently reproduced on an [independent 90-digit oracle](antipodal-binary-spiral-law-adjudication-2026-07-14.md):

1. the self-hit born at $s=1^+$ is a forward pump, not a sink;
2. $F_\theta$ does not change sign at $s=1$ and remains positive through the dispatched $s=3$ coverage — the oracle extends this to the complete root sums across $s\in[0.25,10]$, minimum $+0.0638$ at $s=0.25$;
3. $F_r<0$ immediately above the rail, so no positive circular-balance radius exists until $s=\pi/(2\sqrt2)$;
4. the sharp acceleration diverges at the rail **on the circular family**, so the present equation supplies no classical through-rail continuation there. The caustic $D_s^{\rm self}=1-s\cos(\delta/2)\to1-s\to0$ is the mechanism and is expected to be generic; that has not been shown off the circular manifold.

What these do **not** establish, per adjudication: whether the rail attracts. Point 1 refutes the *mechanism* of the two-sided-attractor prediction; no evolution here refutes its conclusion, and "two-sided" is vacuous while point 4 holds. The two sub-rail seeds disagree — the $s=0.95$ start runs toward the rail throughout, the $s=0.5$ start peaks at $s=0.7015$ and falls away — and both are single circular seeds at different $(R_0,s_0)$.

Promotion classification: `defer with blocker`. The circular root-sum law is derivation-grade, native-cross-checked, and independently confirmed; reader-facing promotion should wait for review of the singular-boundary interpretation and an explicit decision about whether the master equation is intended to acquire a physical finite-width constitutive completion.

**Open blockers recorded on adjudication:**

- The dispatched collapse test is unrun. Four materially different prehistories at one $(R_0,s_0)$, evolved past $h$, phase-plotted $s$ versus $R$. Until then there is no spiral law here, only seed-indexed rows.
- The declared $K=32.4125179963575/36=0.90034772212104166667$ is **not** the radial-balance coupling for the $s=0.5$, $R=1$ start it is declared balanced at. Balance requires $K_\star=s^2c_f^2/F_r(0.5)=2s\varphi=0.90036722258974714607$; the declared value misses by $2.17\times10^{-5}$ relative, leaving a residual radial acceleration $+5.41\times10^{-6}$. This packet computes $K=s^2/F_r$ correctly to 15 digits at $s=1.2$, so the $s=0.5$ value reads as carried rather than recomputed. $R_0(0.95)$ is self-consistent with the declared $K$ to 15 digits, so that launch is balanced on a coupling $2.2\times10^{-5}$ off its stated definition.
- The $s=2$ hinge cross-check is weaker than reported. The exact root is $\delta_s(2)=3.790988534073$; the native value $3.7909885373523533$ and the §86 gate value $3.7909885379$ are each wrong by $\approx3.5\times10^{-9}$ while agreeing with each other to $6\times10^{-10}$ — five times closer to each other than either is to the truth. The dispatch's pencil value $3.7909885341$ is the accurate one. Inside the declared $6.23\times10^{-9}$ residual, so nothing downstream breaks, but the two engine-side routes appear to share a root-finder tolerance and the agreement is 8 digits, not 9.
