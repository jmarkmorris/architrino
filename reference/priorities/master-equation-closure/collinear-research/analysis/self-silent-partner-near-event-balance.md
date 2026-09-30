# Partner-only near-event balance with zero self-action

**Date:** 2026-09-15. **Status:** exploratory recalculation under the operator's clarified FSC scope; no partner event rule or outcome adopted. **Premises:** $c_f=1$, no self-action including equality, unchanged ordinary partner reception, and the regular least-change speed-cap response. **Grade:** derived geometry, regular equations, and continuous-launch obstruction; diagnostic smoothing results are not physical event decisions.

## 1. Self response is zero throughout this calculation

Set $a_{\mathrm{self}}\equiv0$ by the operator's stated model scope. All labeled emissions remain in the history, but no self-family acceleration enters the ledger, normalization, smoothing, or cap response. In particular the [Gaussian self-driven straight solution](cap-only-normalized-ledger-resolution-test.md) is excluded, not an unresolved alternative within this model.

For the isolated opposite-polarity mirror pair, write $X_1=x$, $X_2=-x$, $v=x'$, and $K=\kappa|q_1q_2|>0$. On a complete ordinary partner chart the remaining equations are

$$
|x(t)+x(s)|=t-s,\qquad s<t,
$$

$$
a_{\mathrm p}(t)
=-K\sum_{s\in\mathcal C_{\mathrm p}(t)}
\frac{n(t,s)}{(t-s)^2|1+n(t,s)v(s)|},
\qquad n=\operatorname{sign}(x(t)+x(s)),
$$

$$
x'=v,\qquad v'=P(v,a_{\mathrm p}),\qquad |v|\le1,
$$

where $P(1,a)=\min(a,0)$, $P(-1,a)=\max(a,0)$, and $P(v,a)=a$ in the interior. Undefined partner families still prevent use of the finite ordinary sum; zero self-action does not define a partner-family response.

## 2. Normalized balance on the actual first ordinary outgoing chart

For a continuous outgoing launch with $v(0^+)=1$, sufficiently small positive times have $v>1/2$, $x>0$, and exactly one new partner root determined by

$$
s+x(s)=t-x(t).
$$

Its acceleration is backward,

$$
a_{\mathrm p}(t)=-\frac{K}{(t-s)^2[1+v(s)]}<0.
$$

With self response absent and no other partner roots, the normalized ledger is exactly

$$
\Lambda=|a_{\mathrm p}|,\qquad b=a_{\mathrm p}/\Lambda=-1.
$$

Thus the accumulated-acceleration parameter gives $dv/d\theta=-1$ while $v>-1$. This establishes a direction and rate in that calculation parameter, not a finite available parameter interval beginning at incidence. The ordinary-time magnitude still obeys $\Lambda\ge K/(2t^2)$.

### Complete older-history exclusion for this chart

Assume the given incoming cap is $x(s)=s$ on $[-L,0]$ and the earlier history satisfies $|x(s)|<-s$ for $s<-L$, as does a strictly sub-field incoming history leading into this cap. This condition is explicit intake, not a reason to erase old records. For earlier emissions,

$$
|x(t)+x(s)|\le t+|x(s)|<t-s,
$$

so none is causal. For the old cap $[-L,0)$, the inherited-family equality requires $x(t)=-t$, which is impossible on the positive outgoing chart. All remaining partner roots are in $[0,t)$, where $s+x(s)$ is strictly increasing and gives the unique root above. With zero self-action and no external sources, this is the complete ledger on the stated right interval.

### Continuous-launch obstruction without a self remainder

For that complete ledger, the cap retains the backward acceleration throughout the positive-velocity interval. For $0<\delta<t$,

$$
v(t)-v(\delta)
\le-\frac K2\left(\frac1\delta-\frac1t\right).
$$

The right side tends to $-\infty$ as $\delta\downarrow0$, while a continuous bounded velocity has a finite left side. Hence no continuous velocity-preserving launch from incidence solves this isolated mirror problem with the stated earlier-history condition and ordinary right chart. Unlike the earlier conditional lemma, this recalculation does not leave a hypothetical self cancellation available.

This is a solution-class obstruction, not an unbounded-velocity prediction. Jumps, contact residence, a singular partner event treatment, or paths without this regular right trace are outside the theorem; none is established here. The result does not license replacing the event with a selected reversal.

## 3. Direction changes across the event

### Sharp reversal followed by sub-field slowing — 2026-09-16

**Question and scope:** can an instantaneous reversal at coincidence be followed immediately by slowing below field speed, thereby leaving the old partner family? This calculation uses only the sharp partner equation, the authorized speed ceiling, and zero self response. The incoming cap and earlier-history exclusion are those in section 2. No event jump is supplied by a smoothing calculation or a prescribed outgoing trajectory.

**Candidate solution class:** suppose a rebound solution exists on $0<t\le T$, with $X_A(t)=-y(t)$, $X_B(t)=y(t)$, $y(0)=0$, and outward speed $w(t)=y'(t)$ satisfying $0<w(t)\le1$. Assume $y$ is absolutely continuous through zero, $w$ is continuous and locally absolutely continuous for positive times, and $y(t)<t$ for every $t>0$. The last condition expresses leaving the exact full-speed rebound ray immediately. It includes a continuous right velocity with any nonzero outward trace $0<u\le1$, provided the $u=1$ case slows immediately. The proof itself does not require a velocity trace at zero or continuity with the incoming velocity.

**Complete root census:** for an old cap emission $s<0$, receiver-to-center distance is $y(t)-s<t-s$, so no old cap root remains. For $s<-L$, the retained earlier-history condition gives $|-y(t)+x(s)|\le y(t)+|x(s)|<t-s$. No history is deleted. New partner emissions satisfy

$$
y(t)+y(s)=t-s,
\qquad H(s):=s+y(s)=t-y(t).
$$

Here $H(0)=0<t-y(t)$, while $H(t)=t+y(t)>t-y(t)$. Since $H'=1+w>1$ on positive times, exactly one root lies in $0<s(t)<t$. Its distance is $r=t-s(t)>0$ and its transmitter factor is $D_t=1+w(s(t))>1$, so this is an ordinary isolated root, not the old degenerate family. With no external sources and zero self response, it is the complete acceleration ledger on this candidate interval.

The sharp Master Equation then gives A rightward acceleration

$$
\ddot X_A(t)=\frac{K}{[t-s(t)]^2[1+w(s(t))]}.
$$

This slows its leftward motion. The ceiling retains this acceleration even if A momentarily has velocity $-1$. Consequently

$$
w'(t)=-\frac{K}{[t-s(t)]^2[1+w(s(t))]}
\le-\frac{K}{2t^2}.
$$

For any $0<\delta<t\le T$, local absolute continuity permits integration:

$$
w(t)-w(\delta)
\le-\frac K2\left(\frac1\delta-\frac1t\right).
$$

The left side is bounded because $0<w\le1$; the right side tends to negative infinity as $\delta\downarrow0$. This is a contradiction. It applies even if an instantaneous velocity jump at zero were separately granted: no bounded outgoing speed can satisfy this inequality over an initial ordinary outward leg.

**Derived conclusion:** immediate departure from the old family followed by a regular sub-field outward rebound does not solve the sharp equation in this isolated mirror class. Leaving the old family removes that particular degeneracy but exposes the singular near-zero-range response of a new, isolated partner root. Those are distinct obstructions. This result does not establish rest, a bounce, an event jump, an infinite-reversal solution, or global failure of all FSC histories. It does not cover an outgoing history lacking any initial ordinary outward interval, a different older-history census, broken mirror symmetry, or additional transmitters.

**Verification and falsifiers:** this is a direct Master Equation derivation using the complete root inequalities, monotonicity of $H$, the canonical transmitter weight, the cap sign, and integration on $[\delta,t]$. A missing root under the stated history assumptions, an incorrect sign or weight, or a bounded function satisfying the displayed integrated inequality would overturn the proof. No simulation, smoothing, or kinematic example was used.

The direction of receiver 1's partner contribution is geometry-dependent:

| Geometry | Partner contribution direction | Relation to current velocity |
| --- | --- | --- |
| Incoming ordinary cap approach | Positive | Forward at $v=+1$; regular cap removes it. |
| Older partner family at incidence | Positive for every positive-range cap emission | Forward relative to the incoming velocity, but magnitude is nonordinary. |
| First regular positive-side outgoing chart | Negative | Braking; $b=-1$ and the cap retains it. |
| Exact immediate rebound $x=-t$ | Positive for the full older cap family | Opposes the negative rebound velocity; magnitude remains nonordinary. |

The third row does not continue unchanged into the fourth. The normalized backward driving direction cannot be assumed to persist until and after full reversal. Zero self-action simplifies the ledger but does not remove this partner-geometry change.

## 4. Recheck the auxiliary profiles without self action

The earlier diagnostic used a finite source-memory horizon $h$, core kernel $F_c(u)=u/(u^2+c^2)^{3/2}$, and $\delta_\eta(z)=\phi(z/\eta)/\eta$. Now retain only

$$
a_{\mathrm p}^{\eta,c}(t)
=-K\int_{2t-h}^{2t}F_c(u)\delta_\eta(|u|-2t+u)\,du
$$

on the straight test history. At each fixed $0<t<h/2$ and $c>0$, both the centered Gaussian and the even unit-mass profile $\phi_H(z)=z^2\phi_G(z)$ give

$$
\lim_{\eta\downarrow0}a_{\mathrm p}^{\eta,c}(t)
=-\frac K2F_c(t)<0.
$$

Their normalized partner-only balances therefore both tend to $-1$, and subsequent $c\downarrow0$ gives the canonical $-K/(2t^2)$. The previous opposite-balance example depended on including the now-excluded self response and is not an ambiguity of this partner-only regular chart.

At the exact diagnostic event, the Gaussian gives a forward partner contribution proportional to $\phi_G(0)/\eta$, whereas $\phi_H(0)=0$ gives zero at that single event. Neither value is adopted as the sharp partner response. A fixed-positive-time agreement does not determine what happens in a shrinking time interval around incidence.

### Explicit shrinking-interval balance on the straight diagnostic

To expose that interval, set $t=\lambda\eta$ and $c=\rho\eta$, with fixed $\lambda\ge0$ and $\rho>0$. Directly splitting the partner integral into negative and positive emission-center displacements gives

$$
a_{\mathrm p}^{\eta,\rho\eta}(\lambda\eta)
=\frac K{\eta^2}\left[
\phi(-2\lambda)\left(\frac1\rho-\frac1{\sqrt{(h/\eta-2\lambda)^2+\rho^2}}\right)
-\int_0^{2\lambda}\frac{z\,\phi(2z-2\lambda)}{(z^2+\rho^2)^{3/2}}\,dz
\right],
$$

for $2\lambda\eta<h$. This is an exact finite-parameter formula on the test path. The first term is the forward older-family contribution; the second is the backward portion. Their competition depends on the profile and relative core width $\rho$. At $\lambda=0$ the second term vanishes. For the Gaussian at fixed $\rho$, the first term decays exponentially as $\lambda$ grows, whereas the second has leading order $1/(2\lambda^2)$, so the diagnostic switches from forward to backward. This locates the relevant problem in a shrinking event interval rather than in a self-force ambiguity.

This formula does not describe the evolved path once braking begins. A meaningful event limit must evolve the geometry during that interval and show that its outgoing state is independent of unadopted auxiliary choices. No values of $\rho$, profile, or impulse have been selected.

## 5. Current conclusion and verification

The partner-only normalized balance is unambiguously backward on the first ordinary outgoing chart. The cap prevents speed from exceeding one but does not itself provide a way to attach that chart continuously to incidence. A possible finite event transition must come from the singular partner reception together with the evolving path; it cannot come from self action, a presumed persistent negative pulse, or an arbitrary finite value at the single point $r=0$.

Verification is analytic: root monotonicity, triangle inequalities for older-history exclusion, the integrated acceleration bound, the standard simple-root delta factor, and the substitution $u=\eta z$ in the finite diagnostic. The straight ordinary limit and the $\lambda=0$ value check the factors and directions. No numerical instrument or simulation was run.

Falsifiers are an additional partner root under the explicit history inequalities, a sign or normalization error in the ordinary row, a continuous capped launch satisfying the stated differential inequality, or a failure of the scaled-integral substitution. A valid singular partner event solution would advance the unresolved part, not refute the bounded regular calculation. No canonical or exploratory event decision is made here.
