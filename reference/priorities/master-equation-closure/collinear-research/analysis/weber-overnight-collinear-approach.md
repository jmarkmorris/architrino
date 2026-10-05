# Instantaneous Weber-inspired pair: collinear release and approach

Status: subject derivation drafted by the weber-overnight reduction worker; PI integration, measured runs and independent adjudication pending. On 2026-10-05 (continuation run) the corrections raised in the final-hour assessment were assessed and recorded, without rewriting the original sections, in the closing [addendum](#addendum-corrections-after-the-final-hour-assessment-2026-10-05), which supersedes parts of Sections 2.1, 2.2, 2.3 and 6 as marked under their headings.

This document classifies the collinear motion of an isolated pair under one fixed, instantaneous, Weber-inspired acceleration law, for both polarities. Collinear here means zero relative angular momentum: the two members move on one fixed line through their centre of velocity. The questions are whether the pair reaches contact, at what speed and acceleration, whether the acceleration matrix fails first, how the speed behaves near such a failure, when individual speed equals the wake speed, and which special cases are indeterminate. Shared derivations (the implicit acceleration solve, invariants and the planar classification) are in the [binary subject derivation](../../binary-research/analysis/weber-overnight-investigation.md); the brief restatements below make this document readable on its own. The claims concern this one adapted law, not the delayed canonical Master Equation or binding in nature.

## Notation and the law

Members 1 and 2 have positions $\mathbf X_i$, velocities $\mathbf V_i$ and accelerations $\mathbf A_i$ in the absolute (void) frame; dots are absolute-time derivatives. The present separation is $r=\|\mathbf X_1-\mathbf X_2\|$ with unit direction $\mathbf e=(\mathbf X_1-\mathbf X_2)/r$, and $\mathbf w=\mathbf V_1-\mathbf V_2$ is the relative velocity. The polarity sign $\sigma=\operatorname{sign}(q_1q_2)$ is $-1$ for opposite polarity (the attraction target) and $+1$ for like polarity (a control). The coupling $K>0$ is fixed and equal; $c_f$ is the wake speed, set to $1$ in every numerical value. The law is

$$
\mathbf A_{1\leftarrow2}=\frac{\sigma K}{r^2}\left[1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}+\mu_{\mathrm W}\frac{r\ddot r}{c_f^2}\right]\mathbf e,\qquad \mathbf A_{2\leftarrow1}=-\mathbf A_{1\leftarrow2},
\tag{0.1}
$$

with frozen coefficients $\lambda_{\mathrm W}=-1/2$, $\mu_{\mathrm W}=1$, unit integration weights (architrinos have no mass; each member receives the full acceleration), no causal delay and no self term. It is the boxed family of [Section 9 of the equation-variant manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response). Two derived lengths and one dimensionless separation recur:

| Symbol | Definition | Meaning |
| --- | --- | --- |
| $k$ | $2K$ | effective coupling of the separation: each member receives $\sigma K/r^2$, the separation twice that |
| $\kappa$ | $2K/c_f^2$ | critical length; the like-polarity solve fails at $r=\kappa$ |
| $a$ | $2\sigma K\mu_{\mathrm W}/c_f^2$ | signed singular length for general coefficients ($a=\sigma\kappa$ when frozen) |
| $x$ | $rc_f^2/K$ | dimensionless separation; $\kappa$ corresponds to $x=2$ |
| $\varepsilon$ | eq. (2.3) | first integral of the frozen radial motion |
| $s$ | $r-\sigma\kappa$ | shifted separation in which the frozen radial motion is inverse-square |

Speeds below are individual member speeds with the centre of velocity at rest, $\|\mathbf V_1\|=\|\mathbf V_2\|=|\dot r|/2$, unless stated. Speed domains (unrestricted, inclusive ceiling $\|\mathbf V_i\|\le c_f$, strict ceiling $\|\mathbf V_i\|<c_f$) are admissibility labels and do not change the acceleration.

## 1. The collinear solve

The law is implicit because $\ddot r$ contains the unknown accelerations. The [binary derivation, Section 3](../../binary-research/analysis/weber-overnight-investigation.md#3-the-implicit-acceleration-solve-for-an-isolated-pair) solves the full six-unknown linear system: its matrix is $I_6-\alpha\,\mathbf u\mathbf u^{\mathsf T}$ with $\mathbf u=(\mathbf e,-\mathbf e)$ and $\alpha=\sigma K\mu_{\mathrm W}/(c_f^2r)$, its determinant is $\Delta=1-a/r$, and the unique solution, when $\Delta\ne0$, is radial and equal and opposite, $\mathbf A_1=f\mathbf e=-\mathbf A_2$. With zero angular momentum, $\ddot r=2f$ and

$$
\ddot r=\frac{2\sigma K}{r(r-a)}\left(1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}\right).
\tag{1.1}
$$

For the frozen coefficients:

- **Opposite polarity:** $\Delta=1+\kappa/r>1$ at every $r>0$. The solve never fails; there is no critical radius.
- **Like polarity:** $\Delta=1-\kappa/r$ vanishes at the critical radius $r_c=\kappa=2K/c_f^2$ ($x=2$) and is negative inside. At $r_c$ the system has no solution unless $1-\dot r^2/(2c_f^2)=0$, in which case every radial magnitude solves it.

The sum of velocities is conserved, so the centre of velocity moves uniformly along the line ([binary Section 4.1](../../binary-research/analysis/weber-overnight-investigation.md#41-sum-of-velocities-centre-of-velocity-and-angular-momentum)).

## 2. The radial invariant and the shifted inverse-square form

### 2.1 General coefficients

*Superseded in part by the addendum, item 5c.*

Treating $\dot r^2$ as a function of $r$, (1.1) gives $d(\dot r^2)/dr=4\sigma K(1+\lambda_{\mathrm W}\dot r^2/c_f^2)/(r(r-a))$, which separates. For $\mu_{\mathrm W}\ne0$, on any interval not containing $r=a$,

$$
1+\lambda_{\mathrm W}\frac{\dot r^2}{c_f^2}=C\left|1-\frac ar\right|^{2\lambda_{\mathrm W}/\mu_{\mathrm W}},\qquad C\ \text{constant}.
\tag{2.1}
$$

Two consequences hold for the whole family. First, when $\lambda_{\mathrm W}<0$, the value $C=0$ defines an invariant set of uniform motion at the critical relative speed $|\dot r|=c_f/\sqrt{|\lambda_{\mathrm W}|}$, on which the acceleration vanishes identically. Second, by (1.1) and (2.1), $\operatorname{sign}\ddot r=\operatorname{sign}\big(\sigma C(r-a)\big)$. Wherever $r-a$ keeps one sign, the radial acceleration therefore keeps the sign fixed by the first integral for the whole history. It is attractive or repulsive according to $C$, not according to polarity alone. Also, if $\lambda_{\mathrm W}<0<\mu_{\mathrm W}$ and $a\ne0$, the right side of (2.1) tends to zero as $r\to0$, so every history that reaches contact does so at the universal relative speed $c_f/\sqrt{|\lambda_{\mathrm W}|}$.

### 2.2 The frozen coefficients

*Superseded in part by the addendum, item 5a.*

For $(\lambda_{\mathrm W},\mu_{\mathrm W})=(-1/2,1)$, $2\lambda_{\mathrm W}/\mu_{\mathrm W}=-1$ and the invariant can be written as the energy-like quantity of the [binary derivation, eq. (5.4)](../../binary-research/analysis/weber-overnight-investigation.md#5-the-reduced-radial-equation-and-its-first-integral) at zero angular momentum:

$$
\varepsilon=\tfrac12\left(1-\frac{\sigma\kappa}{r}\right)\dot r^2+\frac{\sigma k}{r},\qquad C=1-\frac{\varepsilon}{c_f^2}.
\tag{2.2}
$$

This is a mathematical invariant of the adapted law, not a physical energy account. Solving for the speed,

$$
\dot r^2=\frac{2(\varepsilon r-\sigma k)}{r-\sigma\kappa},\qquad \dot r^2-2c_f^2=\frac{2(\varepsilon-c_f^2)\,r}{r-\sigma\kappa}.
\tag{2.3}
$$

Now shift the separation by the signed critical length, $s=r-\sigma\kappa$. Using $c_f^2\kappa=k$, (2.3) becomes $\dot s^2=2\varepsilon+2G_\sigma/s$ and (1.1) becomes

$$
\ddot s=-\frac{G_\sigma(\varepsilon)}{s^2},\qquad G_\sigma(\varepsilon)=-\sigma k\left(1-\frac{\varepsilon}{c_f^2}\right),\qquad \dot s^2=2\varepsilon+\frac{2G_\sigma}{s}.
\tag{2.4}
$$

**The frozen collinear motion is an inverse-square radial motion in the shifted coordinate $s$, with the same invariant $\varepsilon$ and an effective coupling $G_\sigma$ that depends on $\varepsilon$.** This is the main structural result of the collinear analysis. It is unexpected, because the original law has velocity- and acceleration-dependent terms, yet each history behaves like the simplest radial inverse-square problem with its own strength. Every closed form of radial inverse-square motion (arrival times, turning points, asymptotic rates) therefore transfers exactly. Contact $r=0$ is the point $s=-\sigma\kappa$, which is a regular point of the shifted motion; the critical radius $r=\kappa$ of like polarity is the point $s=0$, where the shifted motion has its own collision singularity.

In unshifted form the acceleration is

$$
\ddot r=-\frac{\sigma k(\varepsilon-c_f^2)}{c_f^2\,(r-\sigma\kappa)^2}.
\tag{2.5}
$$

Its sign is fixed by $\sigma$ and the sign of $\varepsilon-c_f^2$ for the whole history. Opposite polarity is attracted when $\varepsilon<c_f^2$ and repelled when $\varepsilon>c_f^2$. Like polarity is repelled when $\varepsilon<c_f^2$ and attracted when $\varepsilon>c_f^2$. At $\varepsilon=c_f^2$ both move uniformly at relative speed $\sqrt2\,c_f$. By (2.3), $|\dot r|$ never crosses $\sqrt2\,c_f$ at finite nonzero $r$ away from $r_c$; the critical relative speed $\sqrt2\,c_f$ (individual $c_f/\sqrt2$) separates the two regimes.

### 2.3 Contact and equality crossings

*Superseded in part by the addendum, items 5b and 3.*

At contact ($r\to0$) the invariant (2.2) stays finite only if $\dot r^2\to2k/\kappa=2c_f^2$. So **every collinear history that reaches contact does so at relative speed $\sqrt2\,c_f$, individual speed $c_f/\sqrt2$, for both polarities and every $\varepsilon$.** The acceleration there is finite, by (2.5):

$$
\ddot r\big|_{r=0}=-\frac{\sigma c_f^2(\varepsilon-c_f^2)}{k},\qquad \mathbf A_1\big|_{r=0}=\tfrac12\ddot r\,\mathbf e.
\tag{2.6}
$$

The law is undefined at $r=0$ (the simultaneous self pair is excluded), so the history ends at contact and no continuation is selected.

Individual speed equals $c_f$ (centre of velocity at rest) when $\dot r^2=4c_f^2$. On the level $\varepsilon$ this happens at the single radius

$$
r_\times=\frac{\sigma k}{2c_f^2-\varepsilon},
\tag{2.7}
$$

when that radius is positive and lies in the region the history visits.

> Claim grade: derived. Equations (2.1)–(2.7) follow from (1.1) by separation of variables and algebra. Falsifier: a regular collinear state at which (2.5) disagrees with (1.1), or a collinear history that reaches contact at a relative speed other than $\sqrt2\,c_f$. Checks G1–G2 in [checks.mjs](../../binary-research/evidence/weber-overnight-promoted/reduction/checks.mjs) confirmed (2.5) to $7\times10^{-15}$ and (2.7) to $9\times10^{-15}$ at 200 random states; check D4 confirmed the general invariant (2.1) to $8\times10^{-8}$ with random coefficients.

## 3. Opposite polarity: contact at finite speed

For $\sigma=-1$: $s=r+\kappa\in(\kappa,\infty)$, $G_{-}(\varepsilon)=k(1-\varepsilon/c_f^2)$, and the solve is regular everywhere. The classification is by $\varepsilon$ and the initial direction of motion.

| Invariant | Approaching ($\dot r<0$) | Receding ($\dot r>0$) | Radial acceleration |
| --- | --- | --- | --- |
| $\varepsilon<0$ | contact in finite time | turns at $r_{\max}=k/\lvert\varepsilon\rvert$, then contact | toward partner |
| $0\le\varepsilon<c_f^2$ | contact in finite time, speeding up to $\sqrt2c_f$ | escapes; $\dot r^2\to2\varepsilon$ ($\to0$ at $\varepsilon=0$) | toward partner |
| $\varepsilon=c_f^2$ | uniform at $\sqrt2c_f$; contact at $T=r_0/(\sqrt2c_f)$ | uniform at $\sqrt2c_f$, forever | zero |
| $\varepsilon>c_f^2$ | slows toward $\sqrt2c_f$; never turns; contact in finite time | speeds up toward $\sqrt{2\varepsilon}$; escapes | away from partner |

Every approaching history and every history with $\varepsilon<0$ reaches contact. Since $|\dot r|\to\sqrt2c_f>0$ near $r=0$, the arrival time $\int dr/|\dot r|$ is finite. There is no critical radius, no loss of invertibility and no nonunique case before contact. The qualitative reversal at $\varepsilon=c_f^2$ is the collinear expression of the critical relative speed: an opposite-polarity pair approaching faster than $\sqrt2c_f$ is pushed apart, though never enough to turn it before contact.

**Release from rest at $r_0$.** Here $\varepsilon=-k/r_0$, $s_0=r_0+\kappa$ and $G_-=ks_0/r_0$. The radial inverse-square arrival formula in $s$ gives the time to reach separation $r_1$, with $s_1=r_1+\kappa$, and the contact time ($s_1=\kappa$):

$$
T(r_1)=\sqrt{\frac{s_0^3}{2G_-}}\left[\arccos\sqrt{\frac{s_1}{s_0}}+\sqrt{\frac{s_1}{s_0}\Big(1-\frac{s_1}{s_0}\Big)}\right],\qquad
T_{\mathrm{contact}}=\sqrt{\frac{r_0}{2k}}\left[(r_0+\kappa)\arctan\sqrt{\frac{r_0}{\kappa}}+\sqrt{\kappa r_0}\right].
\tag{3.1}
$$

As $\kappa\to0$ this returns the zero-coefficient value $\tfrac{\pi}{2}\sqrt{r_0^3/(2k)}$. Speed increases monotonically during the infall, because $\varepsilon<c_f^2$, to $\sqrt2c_f$ at contact. The acceleration at contact is $\ddot r=c_f^2(\varepsilon-c_f^2)/k$, finite.

**Equality crossings.** For $\varepsilon<2c_f^2$ the relative speed never reaches $2c_f$, so individual speed stays below $c_f$ throughout. For $\varepsilon>2c_f^2$ there is exactly one crossing, at $r_\times=k/(\varepsilon-2c_f^2)$: individual speed exceeds $c_f$ for $r>r_\times$ and is below $c_f$ for $r<r_\times$. The crossing is regular ($\Delta>1$), so the unrestricted history passes through it smoothly. This supplies no continuation within a ceiling domain.

> Claim grade: derived. Falsifier: an opposite-polarity collinear history that turns while approaching, reaches contact at a speed other than $\sqrt2c_f$, or whose contact time from rest differs from (3.1). Check I1 compared (3.1) with direct quadrature of $\int dr/|\dot r|$ at 50 random $(K,r_0)$ to $3\times10^{-15}$, after the known case I0 (the zero-coefficient infall time) passed to $7\times10^{-16}$.

## 4. Like polarity: the critical radius

For $\sigma=+1$: $s=r-\kappa$, $G_+(\varepsilon)=k(\varepsilon/c_f^2-1)$. Outside the critical radius $s>0$; inside, $-\kappa<s<0$. Outside requires $\varepsilon>0$, since both terms of (2.2) are positive there.

### 4.1 Outside the critical radius

| Invariant | Approaching | Receding | Radial acceleration |
| --- | --- | --- | --- |
| $0<\varepsilon<c_f^2$ | turns at $r_t=k/\varepsilon>\kappa$, escapes | escapes; $\dot r^2\uparrow2\varepsilon$ | away from partner |
| $\varepsilon=c_f^2$ | uniform at $\sqrt2c_f$; reaches $r_c$ at the indeterminate point (Section 4.3) | uniform, forever | zero |
| $\varepsilon>c_f^2$ | reaches $r_c$ in finite time with $\dot r\to-\infty$ | escapes, slowing toward $\sqrt{2\varepsilon}$ | toward partner |

### 4.2 Inside the critical radius

| Invariant | Approaching ($\dot r<0$) | Receding ($\dot r>0$) | Radial acceleration |
| --- | --- | --- | --- |
| $\varepsilon<c_f^2$ (including $\varepsilon\le0$) | never turns; contact at $\sqrt2c_f$ | reaches $r_c$ in finite time with $\dot r\to+\infty$ | outward, toward $r_c$ |
| $\varepsilon=c_f^2$ | uniform; contact at $\sqrt2c_f$ | uniform; reaches $r_c$ at the indeterminate point | zero |
| $\varepsilon>c_f^2$ | contact at $\sqrt2c_f$ | turns at $r_t=k/\varepsilon<\kappa$, then contact | inward |

So inside the critical radius every history ends either at contact, with the universal speed $\sqrt2c_f$ and finite acceleration (2.6), or at the critical radius. The like-polarity acceleration inside points *outward* when $\varepsilon<c_f^2$. In the shifted coordinate, $\ddot s=-G_+/s^2$ has the same sign on both sides of $s=0$, so the same outward push that keeps an outside history away from $r_c$ drives an inside history into it.

### 4.3 Approach to the critical radius

Arrival at $r_c$ is a collision of the shifted inverse-square motion at $s=0$. Near arrival time $T_*$, $\dot s^2\approx2|G_+|/|s|$, so

$$
|r-\kappa|\approx\Big(\tfrac92|G_+|\Big)^{1/3}(T_*-T)^{2/3},\qquad |\dot r|\approx\tfrac23\Big(\tfrac92|G_+|\Big)^{1/3}(T_*-T)^{-1/3},\qquad |\ddot r|=\frac{|G_+|}{(r-\kappa)^2}\propto(T_*-T)^{-4/3}.
\tag{4.1}
$$

The arrival is reached in finite time, with divergent speed and acceleration; the pair accelerations $\pm\tfrac12\ddot r\,\mathbf e$ diverge as the determinant $\Delta=1-\kappa/r\to0$, and the regular solution ends there. Because the speed diverges, every such history crosses individual speed $c_f$ before arrival, at $r_\times=k/(2c_f^2-\varepsilon)$ from (2.7). That lies outside $r_c$ when $c_f^2<\varepsilon<2c_f^2$ and inside $r_c$ when $\varepsilon<c_f^2$; for $\varepsilon\ge2c_f^2$ an approaching outside history is superfield throughout.

**Indeterminate case.** On the level $\varepsilon=c_f^2$, $G_+=0$ and the motion is uniform at $|\dot r|=\sqrt2c_f$ in both regions. It reaches $r=\kappa$ in finite time with finite speed. There the solve has $\Delta=0$ and bracket $1-\dot r^2/(2c_f^2)=0$, so every radial acceleration satisfies the law at that instant. The [binary derivation, Section 8](../../binary-research/analysis/weber-overnight-investigation.md#8-like-polarity-in-the-plane) shows that, after desingularizing time, this point is a saddle whose only physically timed invariant curve is the uniform line itself. The uniform passage from outside to inside (ending in contact) or from inside to outside (escaping) is therefore the unique continuously differentiable continuation. Adopting it is a formulation decision, because the law defines no acceleration at that instant.

> Claim grade: derived for the tables, (4.1) and the saddle structure; inferred for the adoption of the uniform continuation through the indeterminate point. Falsifier: a like-polarity collinear history that remains regular while crossing $r=\kappa$ with $\varepsilon\ne c_f^2$; an approaching outside history with $\varepsilon>c_f^2$ that turns before $r_c$; or an arrival rate different from (4.1). Check J confirmed the saddle eigenvalues to $3\times10^{-10}$.

## 5. Comparison with the zero-coefficient control

With $\lambda_{\mathrm W}=\mu_{\mathrm W}=0$ the solve is explicit and the separation obeys $\ddot r=\sigma k/r^2$, the unshifted inverse-square radial problem. The frozen law differs in three ways. First, opposite-polarity contact happens at finite speed $\sqrt2c_f$ with finite acceleration, whereas the control reaches contact with divergent speed. Second, the infall from rest takes longer: at $x=4$, $8.560326833493$ against $2\pi=6.283185307180$. Third, the control has no critical radius and no reversal of the sign of acceleration with $\varepsilon$, while the frozen law has both (like polarity has $r_c$; both polarities reverse at $\varepsilon=c_f^2$). The turning radii of a release from rest coincide (the release point itself). The like-polarity turning radius differs for the same preparation: $k/\varepsilon$ in both laws, but with $\varepsilon$ from (2.2) instead of $\varepsilon_0=\tfrac12\dot r^2+k/r$.

## 6. Speed-domain coverage

*Superseded in part by the addendum, item 3.*

With the centre of velocity at rest:

| History | Supremum of individual speed | Strict | Equality | Superfield |
| --- | --- | --- | --- | --- |
| Opposite polarity, any (maximal history) | $\max\big(c_f/\sqrt2,\ \sqrt{\varepsilon/2}\big)$ | $\varepsilon<2c_f^2$ | not attained for $\varepsilon<2c_f^2$ | $\varepsilon>2c_f^2$ (crossing at $r_\times$) |
| Opposite polarity, release from rest | $c_f/\sqrt2$, approached at contact | yes | no | no |
| Like polarity, outside, $\varepsilon<c_f^2$ | $\sqrt{\varepsilon/2}<c_f/\sqrt2$ | yes | no | no |
| Like polarity, inside, approaching to contact | at most $\max(c_f/\sqrt2,$ initial speed$)$ | if the initial speed is below $c_f$ | — | — |
| Like polarity, arrival at $r_c$ | unbounded | no | crossed at $r_\times$ | yes, before arrival |
| Like polarity, $\varepsilon=c_f^2$ | $c_f/\sqrt2$ | yes, up to the indeterminate instant | no | no |

If the centre of velocity drifts along the line at $V_c$, the individual speeds are $|V_c\pm\dot r/2|$ and the labels change with $V_c$ while the dynamics does not. A drift with $|V_c|\ge c_f$ violates the strict ceiling for every history.

## 7. Predictions at $x=4$ for a Cartesian instrument

With $K=c_f=1$ ($k=\kappa=2$, critical radius $r_c=2$), measured by evaluating the closed forms above in [predictions.mjs](../../binary-research/evidence/weber-overnight-promoted/reduction/predictions.mjs) (output in [predictions.out.txt](../../binary-research/evidence/weber-overnight-promoted/reduction/predictions.out.txt)):

| Case | Frozen law | Zero-coefficient control |
| --- | --- | --- |
| $\sigma=-1$, from rest at $r=4$: contact time | 8.560326833493 | 6.283185307180 |
| relative / individual speed at contact | 1.414213562373 / 0.7071067811865 | divergent |
| $\ddot r$ at contact | $-0.75$ | divergent |
| time to $r=2$; relative speed there | 6.521305376769; 0.7071067811865 | 5.141592653590; 1.0 |
| $\sigma=+1$, from rest at $r=4$: fate | escapes, no contact; relative speed $\to1$ | escapes; relative speed $\to1$ |
| time to $r=8$; relative speed there | 7.191411155128; 0.8164965809277 | 9.182348597571; 0.7071067811865 |
| $\sigma=+1$, at $r=4$ with $\dot r=-1.6$: $\varepsilon=1.14$; first event | critical radius $r=2$ at $T=1.115419163630$, $\dot r\to-\infty$; individual speed $=1$ at $r=2.325581395349$ | not applicable |

The like-polarity release from rest at $x=4$ has $\varepsilon=0.5<c_f^2$, so it is the outside turning-and-escape class at its own turning point and never approaches $r_c$. The time to $r=2$ for $\sigma=-1$ was also reproduced by RK4 on (1.1) (step $10^{-4}$, linear event interpolation) to $7\times10^{-11}$; that is internal consistency, not independent evidence.

## 8. Claims, falsifiers and open questions

**Derived.** The frozen collinear pair is an inverse-square radial motion in the shifted separation $s=r-\sigma\kappa$ with coupling $G_\sigma(\varepsilon)=-\sigma k(1-\varepsilon/c_f^2)$ (2.4). Every contact occurs at relative speed $\sqrt2c_f$ with finite acceleration (2.6). The sign of the radial acceleration is fixed on each history by $\sigma$ and $\operatorname{sign}(\varepsilon-c_f^2)$ (2.5). Opposite polarity has no critical radius, and every approaching history reaches contact in finite time (Section 3). Like polarity reaches its critical radius $r=2K/c_f^2$ in finite time with divergent speed and acceleration whenever the classification tables say so, with rates (4.1). The level $\varepsilon=c_f^2$ is uniform motion and meets an indeterminate solve at $r_c$.

**Inferred.** The uniform passage through the indeterminate like-polarity point is the only continuously differentiable continuation; whether the law should adopt it is a formulation decision.

**Unresolved.** Continuation past contact and past the like-polarity critical radius is undefined; no rule is proposed.

**Falsifiers.** (a) A separately written integrator of the collinear pair from rest at $x=4$, opposite polarity, that does not reach contact at $T=8.560326833493$ with relative speed approaching $1.414213562373$. (b) A like-polarity integration from $x=4$ with $\dot r=-1.6$ that continues regularly past $T=1.115419163630$ or reaches $r=2$ at a different time. (c) Drift of $\varepsilon$ from (2.2) beyond integrator error before an event.

## Measured runs (pending preregistration)

Reserved for preregistered Cartesian runs. No Cartesian time integration was performed by this worker.

## Independent adjudication (pending)

Reserved for the independent reference and adversarial review.

## Addendum: corrections after the final-hour assessment (2026-10-05)

This addendum records the disposition of the corrections raised against this document in the final-hour assessment's section "Corrections and unreviewed scope" ([maxwell-shaped-overnight-weber-checkpoint-assessment.md](../../binary-research/analysis/maxwell-shaped-overnight-weber-checkpoint-assessment.md)), together with the collinear part of the speed-domain correction. Each item was rederived from (1.1) and (2.1)–(2.3) without taking the assessment's statement as a premise, and spot-checked in Node v22 by [corrections-checks.mjs](../../binary-research/evidence/weber-overnight-promoted/round2/corrections/corrections-checks.mjs) (output in [corrections-checks.out.txt](../../binary-research/evidence/weber-overnight-promoted/round2/corrections/corrections-checks.out.txt); known cases K1–K6 passed before the target checks T1–T5c; 19 of 19 passed). The original sections are unchanged; each item quotes the superseded wording and names its section. Nothing here changes the derived results of Section 8: the shifted inverse-square form (2.4), the universal contact speed $\sqrt2c_f$ in the centre-rest frame, the sign rule (2.5) and the classification tables of Sections 3 and 4 all stand. The companion corrections to the binary source are in [its addendum](../../binary-research/analysis/weber-overnight-investigation.md#addendum-corrections-after-the-final-hour-assessment-2026-10-05).

### Item 5a. Equation (2.2): the constant $C$ is $\operatorname{sign}(\Delta)\,(1-\varepsilon/c_f^2)$

**Verdict: accepted.** Equation (2.2) identifies the constant of the general separated invariant (2.1) as $C=1-\varepsilon/c_f^2$. Because (2.1) is written with the absolute value $|1-a/r|=|\Delta|$, that identification holds only where $\Delta>0$: everywhere for opposite polarity, and outside the critical radius for like polarity.

*Derivation.* For the frozen coefficients $2\lambda_{\mathrm W}/\mu_{\mathrm W}=-1$, so (2.1) reads $1-\dot r^2/(2c_f^2)=C/|\Delta|$, that is $C=|\Delta|\,(1-\dot r^2/(2c_f^2))$. Expanding the signed product with (2.2) and $k=\kappa c_f^2$,

$$
\Delta\left(1-\frac{\dot r^2}{2c_f^2}\right)=\Delta-\frac{\varepsilon-\sigma k/r}{c_f^2}=1-\frac{\sigma\kappa}{r}-\frac{\varepsilon}{c_f^2}+\frac{\sigma\kappa}{r}=1-\frac{\varepsilon}{c_f^2},
\tag{A.5}
$$

an identity valid at every regular radial state of either polarity on either chart. Hence

$$
C=\operatorname{sign}(\Delta)\left(1-\frac{\varepsilon}{c_f^2}\right):\qquad C=1-\frac{\varepsilon}{c_f^2}\ \text{where }\Delta>0,\qquad C=-\Big(1-\frac{\varepsilon}{c_f^2}\Big)\ \text{for like polarity inside }r<\kappa .
\tag{A.6}
$$

The constant of (2.1) is specific to the chart on which it is evaluated (an interval between consecutive singular points $r=0$ and $r=a$); on the two charts of one like-polarity history it has opposite signs, while $\varepsilon$ is one number on both. Every equation of Sections 2.2–4 that is written in $\varepsilon$, namely (2.3)–(2.7) and the tables, is unaffected. The sign statement of Section 2.1, $\operatorname{sign}\ddot r=\operatorname{sign}(\sigma C(r-a))$, remains correct on each chart, and with (A.6) it reproduces the sign rule of (2.5) on both charts, because $\operatorname{sign}(r-a)=\operatorname{sign}(\Delta)$ cancels the sign in $C$.

*Spot check.* Check K6 found $C=1-\varepsilon/c_f^2$ at 100 random opposite-polarity states to $2\times10^{-15}$ (known case). Check T5 found $C=-(1-\varepsilon/c_f^2)$ at 100 random interior like-polarity states to $7\times10^{-15}$ and $C=+(1-\varepsilon/c_f^2)$ at 100 exterior states to $9\times10^{-16}$. Check T5b integrated an interior like-polarity history from $r=1.5$ on $\varepsilon=0.8$ ($K=c_f=1$) by RK4 and found $C$ constant at $-0.200000000000$, the value $-(1-\varepsilon)$. Check T5c verified (A.5) at 200 random states on both charts and both polarities to $9\times10^{-16}$. Grade: derived. Falsifier: an interior like-polarity radial state at which $|\Delta|(1-\dot r^2/(2c_f^2))$ equals $+(1-\varepsilon/c_f^2)$ with $\varepsilon\ne c_f^2$.

*Superseded.* Section 2.2, in equation (2.2), the identification "$C=1-\dfrac{\varepsilon}{c_f^2}$", replaced by (A.6).

### Item 5b. Section 2.3: "simultaneous self pair" conflates two exclusions

**Verdict: accepted.** The sentence "The law is undefined at $r=0$ (the simultaneous self pair is excluded)" joins two different things. The absence of a self term is the exclusion of $j=i$ from the sum in the law: a member does not act on itself. Contact is the limit $r\to0$ for two *distinct* members $i\ne j$, where the law is undefined because the unit direction $\mathbf e_{ij}$ and the factor $1/r^2$ have no value at coincident positions. The second exclusion would hold even if a self term were present, and the first says nothing about contact. The corrected statement is: the law defines no acceleration for a distinct pair at $r=0$, because its direction and its inverse-square factor are undefined there; the history therefore ends at contact and no continuation is selected. This is independent of the separate convention that the law contains no self term.

*Superseded.* Section 2.3, the parenthesis "(the simultaneous self pair is excluded)". No derivation or number depends on it.

### Item 5c. Section 2.1: the general integrating factor and its chart-specific constant

**Verdict: partially accepted.** Equation (2.1) already uses $|1-a/r|^{2\lambda_{\mathrm W}/\mu_{\mathrm W}}$ and the restriction "on any interval not containing $r=a$", so the formula is correct as written; the assessment's point that a real power $\Delta^p$ is not real where $\Delta<0$ is met by that absolute value. What Section 2.1 does not say, and should, is that the constant $C$ is chart-specific: the separated equation determines $C$ on each interval between consecutive singular points separately, and nothing in the separation relates its values on the exterior and interior charts of a like-polarity history. For the frozen law the relation is supplied by the single-valued invariant $\varepsilon$ through (A.6), and it is a sign change. The binary source's statement "$I=\Delta$" for the frozen integrating factor has the same chart issue and is corrected in [its addendum, item 5](../../binary-research/analysis/weber-overnight-investigation.md#item-5-section-44-the-integrating-factor-is-delta-and-the-constant-is-chart-specific). Grade: derived. Falsifier: as in item 5a.

*Superseded.* Section 2.1, the words "$C$ constant" in (2.1) are to be read as "$C$ a constant on each such interval, in general different on different intervals". No displayed formula changes.

### Item 3 (collinear part). Section 6: the speed-domain table

**Verdict: accepted.** The first row of the Section 6 table writes the supremum as $\max(c_f/\sqrt2,\sqrt{\varepsilon/2})$, which is undefined for $\varepsilon<0$ and omits the boundary level $\varepsilon=2c_f^2$; and the table's frame declaration ("with the centre of velocity at rest") must be read as a restriction on the contact-speed statement of Section 2.3 as well. The derivation and the corrected radial row are given in full in the [binary addendum, item 3](../../binary-research/analysis/weber-overnight-investigation.md#item-3-section-9-the-speed-domain-table): with the centre at rest the individual speed on a level is $v(r)^2=(\varepsilon r+k)/(2(r+\kappa))$, monotone in $r$ with the sign of $\varepsilon-c_f^2$, tending to $c_f/\sqrt2$ at contact and to $\sqrt{\varepsilon/2}$ at infinity when $\varepsilon\ge0$. The supremum over the maximal history is $c_f/\sqrt2$ for every $\varepsilon\le c_f^2$ (so for every $\varepsilon<0$) and $\sqrt{\varepsilon/2}$, approached only at infinity, for $\varepsilon>c_f^2$. The strict label holds pointwise for $\varepsilon\le2c_f^2$, with a positive uniform margin only for $\varepsilon<2c_f^2$; at $\varepsilon=2c_f^2$ the supremum is $c_f$ at infinity and the margin is zero; for $\varepsilon>2c_f^2$ equality is crossed at $r_\times=k/(\varepsilon-2c_f^2)$, as the row says. The like-polarity rows of the table are confirmed (the exterior speed function $(\varepsilon r-k)/(2(r-\kappa))$ is monotone with the sign of $c_f^2-\varepsilon$, which gives each row's supremum), and the drift sentence is completed: for a drift $\mathbf V_c$ with component $V_\parallel$ along the line and $\mathbf V_\perp$ across it, the individual speeds are $\sqrt{\|\mathbf V_\perp\|^2+(V_\parallel\pm\dot r/2)^2}$; at contact the relative speed $\sqrt2c_f$ is boost-invariant but the individual speeds are $\|\mathbf V_c\pm(c_f/\sqrt2)\mathbf e\|$, and for a drift along the line the faster member reaches $c_f$ at contact once $|V_\parallel|\ge c_f(1-1/\sqrt2)$. Spot checks T3 and T3c of the shared script cover this item (binary addendum, item 3). Grade: derived. Falsifier: a radial opposite-polarity history on $\varepsilon=2c_f^2$ reaching individual speed $c_f$ at finite separation with the centre at rest.

*Superseded.* Section 6, table row "Opposite polarity, any (maximal history) | $\max\big(c_f/\sqrt2,\ \sqrt{\varepsilon/2}\big)$ | $\varepsilon<2c_f^2$ | not attained for $\varepsilon<2c_f^2$ | $\varepsilon>2c_f^2$ (crossing at $r_\times$)", replaced by the corrected radial row of the binary addendum; and Section 2.3's "individual speed $c_f/\sqrt2$" in the contact statement, which is to be read with the centre of velocity at rest.

### Item 4 (collinear part) and item 6

The like-polarity tables of Sections 4.1 and 4.2 already list both directions of motion on every level, including the exterior receding history with $\varepsilon>c_f^2$ ("escapes, slowing toward $\sqrt{2\varepsilon}$") and the exterior receding history on the threshold level ("uniform, forever"), so the omission corrected in the binary source's Theorem 8.1 (binary addendum, item 4) is not present here; the $h=0$ threshold $V_{\mathrm{eff}}(\kappa)=c_f^2$ agrees with the tables' $\varepsilon=c_f^2$. No further defect was found in Sections 1–5 or 7 on rederivation: (2.4)–(2.7), the contact time (3.1) (evaluated by hand at $x=4$ to $8.5603$), the arrival rates (4.1) and the crossing radii of Section 4.3 were reconfirmed where they were used.

### Consequences for the independent reference lane

The reference should re-examine, against this addendum: the sign of its own separated-invariant constant on the interior like-polarity chart (item 5a); its wording at contact if it uses the self-pair phrase (item 5b); its radial speed-domain statements for $\varepsilon<0$, at $\varepsilon=2c_f^2$ and under centre drift (item 3); and, where it reports collinear classes, that both directions of motion appear on the threshold and supercritical like-polarity levels, which the final-hour assessment found compressed in the reference's summary.


## Evidence path promotion, 2026-10-05

The linked scratch files `.tmp/weber-overnight/reduction/checks.mjs`, `.tmp/weber-overnight/reduction/predictions.mjs`, `.tmp/weber-overnight/reduction/predictions.out.txt`, `.tmp/weber-overnight/round2/corrections/corrections-checks.mjs`, `.tmp/weber-overnight/round2/corrections/corrections-checks.out.txt` were moved byte-identically to the durable paths now linked above. The [closeout promotion map](../../binary-research/analysis/weber-overnight-closeout-verification.md#part-3--promotion-map) records each old path, new path and SHA-256. Historical command text and receipt content retain their recorded paths; ignored scratch aliases preserve those provenance-bound paths without making them the durable owner.


### Durable copies of recorded scratch inputs

Recorded command and provenance text retain their original paths. Byte-identical durable owners are [checks.mjs](../../binary-research/evidence/weber-overnight-promoted/reduction/checks.mjs), [predictions.mjs](../../binary-research/evidence/weber-overnight-promoted/reduction/predictions.mjs), [predictions.out.txt](../../binary-research/evidence/weber-overnight-promoted/reduction/predictions.out.txt), [corrections-checks.mjs](../../binary-research/evidence/weber-overnight-promoted/round2/corrections/corrections-checks.mjs), [corrections-checks.out.txt](../../binary-research/evidence/weber-overnight-promoted/round2/corrections/corrections-checks.out.txt). The [promotion map](../../binary-research/analysis/weber-overnight-closeout-verification.md#part-3--promotion-map) records hashes and the retained scratch aliases.
