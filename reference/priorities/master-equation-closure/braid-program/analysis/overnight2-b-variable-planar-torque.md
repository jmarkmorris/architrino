# Angular drift from a positive tangential acceleration

## Subject result and analytical statement

Computer-assisted derived subject result, pending independent reconstruction. The completed fixed-cell interval calculation below supplies a positive complete-partner margin. The analytical implication converts it into a duration bound and excludes an unbounded exact future. Use the canonical coefficient-one equation with wake speed one and retain every ordinary positive-delay root.

Let the complete histories be

$$
X_j(t)=R\bigl(\rho(\tau)\cos[\theta(\tau)+j\pi/3],
\rho(\tau)\sin[\theta(\tau)+j\pi/3],
(-1)^j z(\tau)\bigr),\qquad \tau=t/R,\quad R>0,
$$

where $\rho,\theta,z$ are $C^2$, $j=0,\ldots,5$ and polarities alternate. Write $\theta(\tau)=\beta\tau+p(\tau)$ and $\omega=\dot\theta=\beta+\dot p$. Assume complete-history bounds

$$
\frac35\le\beta\le\frac75,\qquad
|\rho-1|\le e,\quad |\dot\rho|\le e,\quad |\dot p|\le e,\qquad
e=\frac1{1000},
$$

$$
|z|\le h=\frac15,\qquad |\dot z|\le u=\frac25.
$$

No bound on the absolute phase correction $p$ or on second derivatives is required beyond $C^2$ regularity. The planar angular rate remains positive. All hypotheses are in normalized time; $R$ is a fixed positive physical scale.

Suppose the complete partner sum satisfies $A_{t,\mathrm{partner}}\ge m>0$ at every reception uniformly on these bounds. Then no such history can satisfy the canonical equation over an unbounded future interval. More quantitatively, any connected interval of exact balance of normalized length $T$ obeys

$$
T\le \frac{R\,\Delta_\beta}{(1-e)m},
\qquad
\Delta_\beta=(1+e)^2(\beta+e)-(1-e)^2(\beta-e)
=4\beta e+2e+2e^3.
$$

For physical elapsed time, multiply the right side by $R$ again. This is an upper bound on how long an exact path can remain inside all the declared complete-history norms, conditional on regular exactness there. It supplies no continuation or actual trajectory.

## Delayed geometry with a drifting absolute phase

Use the receiver's current radial and tangential directions as coordinates. Put

$$
r=\rho(\tau),\quad s=\rho(\tau-d),\quad
\alpha=j\pi/3-\int_{\tau-d}^{\tau}\omega(v)\,dv,\quad
Z=z(\tau)-(-1)^jz(\tau-d).
$$

The separation and delayed source velocity are

$$
Q=(r-s\cos\alpha,-s\sin\alpha,Z),
$$

$$
V_s=(\dot s\cos\alpha-s\omega_s\sin\alpha,
\dot s\sin\alpha+s\omega_s\cos\alpha,
(-1)^j\dot z(\tau-d)).
$$

Here $\dot s$ and $\omega_s$ mean source radial derivative and angular rate evaluated at $\tau-d$, rather than delay derivatives. Hence

$$
G=r^2+s^2-2rs\cos\alpha+Z^2-d^2,
$$

$$
G_d=2\dot s(r\cos\alpha-s)-2rs\omega_s\sin\alpha
+2Z(-1)^j\dot z(\tau-d)-2d.
$$

At an actual root the signed ordinary divisor is $D=-G_d/(2d)$. The partner tangential row is $(-1)^j(-s\sin\alpha)/(d^3|D|)$. All quantities refer to the delayed source.

Over a beta interval $B$, enclose $\omega_s$ and the delay-averaged angular rate in $W=B+[-e,e]$. Then $\alpha\in j\pi/3-Wd$, $r,s\in[1-e,1+e]$, $\dot s\in[-e,e]$, $Z^2\in[0,4h^2]$ and the axial part of $G_d$ belongs to $[-4hu,4hu]$. These intervals enclose both the actual gap and its actual derivative for every admissible history. The global phase correction may drift because only its increments enter.

Every source speed satisfies

$$
|V_s|\le\sqrt{e^2+(1+e)^2(\beta+e)^2+u^2}<\frac32.
$$

Simultaneous partner planar separation is at least $1-e$. Thus for $0<d\le1/4$ the distance-minus-delay gap is strictly greater than $(1-e)-(5/2)d>0$. Every root has

$$
d\le2\sqrt{(1+e)^2+h^2}<\frac{21}{10}<3.
$$

Consequently protected partner roots and complementary exclusion on $[1/4,3]$ suffice for a complete partner chart, without truncating the old history.

## Every self row is tangentially positive

At a self root the accumulated angle is

$$
\delta=\int_{\tau-d}^{\tau}\omega(v)\,dv.
$$

Its bounds are $0<(\beta-e)d\le\delta\le(\beta+e)d<3<\pi$, using $(7/5+1/1000)(21/10)<3$. The self tangential separation is $s\sin\delta>0$. Positive self polarity and the absolute source divisor make every retained ordinary self row positive. No numerical enumeration of self roots is substituted for this complete sign argument. Under the regular finite-sum premise,

$$
A_t\ge A_{t,\mathrm{partner}}\ge m>0.
$$

A nonordinary root or undefined sum is outside the exactness premise and is never silently omitted.

## Exact balance forces a bounded quantity to increase

The normalized prescribed tangential acceleration is

$$
L_t=2\dot\rho\,\omega+\rho\dot\omega.
$$

Define the kinematic quantity $J=\rho^2\omega$. It has no mass factor and no independently imposed conservation law. Its derivative is simply $\dot J=\rho L_t$, by differentiation. The scaled canonical equation $R L_t=A_t$ would therefore imply

$$
\dot J=\frac{\rho A_t}{R}\ge\frac{(1-e)m}{R}>0.
$$

But the same complete-history bounds give

$$
(1-e)^2(\beta-e)\le J\le(1+e)^2(\beta+e).
$$

Integrating $\dot J$ over an exact interval of length $T$ yields the displayed duration bound. An unbounded exact future is impossible. This proof does not assume angular-momentum conservation, an external force law, periodicity, convergence of time averages or a uniform second-derivative bound. It uses only the canonical acceleration equation and elementary kinematics.

For a normalized tangential residual $E_t=R L_t-A_t$, the same calculation yields an additional necessary condition on any interval:

$$
\sup |E_t|\ge m-\frac{R\Delta_\beta}{(1-e)T}
$$

whenever the right side is positive. Indeed if $\varepsilon=\sup|E_t|<m$, then $\dot J=\rho(A_t+E_t)/R\ge(1-e)(m-\varepsilon)/R$. This is a scale- and duration-dependent residual bound; it is not a uniform physical error bound.

## Completed subject certificate

The [subject companion](overnight2-b-variable-planar-torque.py) tested 64 equal closed beta cells on $[3/5,7/5]$, using the explicit interval geometry above and the frozen subject root-cover helper. Every cell has exactly five complete ordinary partner channels with positive signed divisors and a positive tangential sum. Native jq inspection of the target records 64 excluded cells, zero unresolved and zero pending. The common margin is the exact minimum of the 64 rational interval lower endpoints:

$$
m=\frac{11356556164673805239481846560619392804717141876694604791}{196159429230833773869868419475239575503198607639501078528}>0.
$$

The exact cells are $[3/5+k/80,3/5+(k+1)/80]$ for $k=0,\ldots,63$, with shared closed endpoints. Each actual partner root is enclosed by a uniform opposite-sign protected bracket with a negative derivative. Interval Newton contraction retains it, and the helper excludes the full complement through delay three. Every actual profile is covered by these interval evaluations at every reception, without phase sampling.

Known controls passed first and were recorded before the measured pilot at indices 0,21,42,63. They include an unequal-radius diametric case with squared gap 21 and derivative -5, complete static cancellation, the independently derived flat unit-circle lower bound, exact toy partition/minimum checks and the complete self-sign inequalities. The pilot passed all four cells; its measured cost was recorded before the unchanged 64-cell target. Limits were 120 internal seconds, 180 supervised seconds, 512 MiB memory, eight MiB per receipt and one numerical thread. No adaptive subdivision or budget increase occurred.

| Stage | Internal seconds | Supervised seconds | Peak RSS bytes | Receipt bytes |
| --- | ---: | ---: | ---: | ---: |
| Known | 0.11987200006842613 | Synchronous | 38404096 | 32612 |
| Pilot | 0.21639091707766056 | 0.274 | 38371328 | 80173 |
| Target | 2.3903868342749774 | 2.456 | 40517632 | 1255578 |

Pilot supervisor 17fedb87-4a14-4236-8f1d-2b56e3f87eaa and target supervisor b9bec1c8-d7ab-48a3-b7f4-5783a72962dd closed with exit zero, zero stderr and closed process groups. They finished before the first 15-second heartbeat; per-cell progress was flushed. The shared venv ran with one numerical/BLAS thread and bytecode disabled. The three original receipts total 1,368,363 bytes and remain under the local runtime owner .local-data/master-equation-closure/overnight2-b/variable-planar-torque/. These are local provenance, not public CI dependencies; no remote backup or archive-recovery claim is made.

| Artifact | SHA-256 |
| --- | --- |
| Subject source | c738b95020369cb6a282b005e30222e01c85fe1433b834ed012a2f4e441e786e |
| Frozen root-cover helper | a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a |
| Known receipt | bf1a576c14a5d0ffa999266807bbafe9236a035a4643bc45cb9b5f610abb0060 |
| Pilot receipt | 9e38bd2c44af6b539936ed79dd823ce1da2f90c89727804ea2f62d44e82b665b |
| Target receipt | 78cd8b2a35f025f1a7f84fc592c73999494091fc6041dd40f999db561e7ed2e3 |

Reproduction uses the linked companion's sequential known, pilot and target modes with the frozen helper. Exclusive receipt creation preserves originals. Reusing a subject helper is not independent confirmation; a separately authored geometry, root cover and analytical reconstruction remain required for acceptance.

## Verification boundary and falsifiers

The angular-drift implication above is derived from the subject interval premise. The combined result requires independent review of both pieces. A missing partner root, false interval enclosure, nonpositive partner sum, self delay or angle outside the complete geometric bound, or an incorrect scale identity defeats the conclusion. An exact complete history satisfying all displayed norms beyond the stated duration would refute it. Shared interval-library defects remain a computational falsifier even after separate implementations agree.

The result does not apply to arbitrary amplitude radius/phase motion or to incomplete past bounds. It proves neither existence nor the fate of a released preparation. The [current research account](overnight2-b-followup-and-research-2026-10-07.md) owns this provisional work; original earlier subjects and their evidence remain unchanged.
