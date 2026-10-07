# Independent review of the outer-equal regular containing domain

## Verdict and discharged dependency

**Derived verdict: supported; no mathematical defect found.** The phase floor $\rho\ge1/32$ for exact outer-equal configurations with $b\ge2$ is independent of the radius-five certificate. The same-circle factor argument is also independently valid. The separately completed [full paired-value certificate and theorem review](overnight2-c-paired-value-full-independent-review.md) now discharges the remaining $b<5$ premise, making the proposed compact containing-domain statement supported in the stated class.

The frozen subject is [the outer-equal regular-domain note](overnight2-c-outer-equal-regular-domain.md), supplied SHA-256 `8ecd73572a4c23cb1e74331dc6aaf3f0348b4de1036d64738ff1086d18a9cc8b`. The selected law remains $K_{\log}=c_f=1$, unchanged logarithmic transmitter weighting, persistent unit polarities and complete circular histories. The relevant class has $r_1=1$, $r_2=r_3=b\ge2$, $\omega\ge0$ and $\omega b\le1$. The live Ramon E. Moore lens and original exploration stop 13:55:15 UTC/hard deadline 15:25:15 UTC on October 7, 2026 remain in force. This review is analytical and launches no additional numerical target.

## Independent phase-floor reconstruction

Scale length and time by $b$, leaving the two outer pair radii equal to one and the inner radius $a=1/b\le1/2$. The unit-circle speed is $v=\omega b\in[0,1]$. Order the two positive unit-circle phases at clockwise gap $0<\beta<\pi$ and set $\rho=\min(\beta,\pi-\beta)$.

Direct source enumeration gives the difference of the two complete equal-radius contributions as $L=[Q_v(\beta)+Q_v(\pi-\beta)]/2$. Their own-antipode terms cancel. Each of the smaller pair's four rows across the two receivers has tangential magnitude at most $a/[(1-a)^2(1+a)]$. The actual smaller-source speed is $va\le a$, so its factor bound remains valid even when $v=1$. The resulting cap is increasing in $a$ and obeys

$$
C(a)=\frac{4a}{(1-a)^2(1+a)}\le C(1/2)=\frac{16}{3}.
$$

The small-angle lemma from the [independent phase review](overnight2-c-inner-phase-independent-review.md) was proved on the complete unit-circle chart for every $0\le v\le1$, not only for the original geometric placement of the smaller pair. Its proof uses $3H_v(\alpha)\ge\alpha D_v$, an inverse-root domain bound and the sign of $B_v(\gamma+\pi)$ to obtain $Q_v(\gamma)\ge1/(3\gamma)$ for $0<\gamma\le1/16$. The same chart also gives $Q_v(x)>0$ for every $0<x<\pi$. These are response identities independent of exactness and of the third pair's radius, so their transfer here is legitimate.

If $\rho\le1/16$, these inequalities imply $L\ge1/(6\rho)$. Exact tangential balance requires $L\le C(a)\le16/3$, hence $1\le32\rho$. If instead $\rho>1/16$, then $\rho>1/32$ immediately. Thus every exact configuration in this branch has $\rho\ge1/32$, without using any upper bound on $b$ or the new interval certificate.

## Independent same-circle factor estimate

For a same-circle channel with clockwise present angle $\gamma\in(0,2\pi)$, let its complete emission angle be $\alpha\in(0,2\pi)$. Write

$$
\gamma=H_v(\alpha)=\alpha-2v\sin(\alpha/2),\qquad
D_v(\alpha)=1-v\cos(\alpha/2).
$$

For $0\le v\le1$, $D_v'(\alpha)=(v/2)\sin(\alpha/2)\ge0$ throughout this interval. Since $H_v(0)=0$ and $H_v'=D_v$, monotonicity under the integral gives

$$
\gamma=\int_0^\alpha D_v(s)\,ds\le\alpha D_v(\alpha).
$$

When $\alpha\le\pi$, this implies $D_v\ge\gamma/\alpha\ge\gamma/\pi$. When $\alpha\ge\pi$, the cosine is nonpositive and $D_v\ge1$. Consequently, if $\gamma\ge\rho$ with $0<\rho\le\pi/2$, both cases imply $D_v\ge\rho/\pi>\rho/4$. In the second case the necessary comparison is $1\ge\rho/\pi$, which follows from the stated upper bound on $\rho$. No unsupported global assertion $D_v\ge\gamma/\pi$ for angles above $\pi$ is used.

The two outer antipodal pairs have directed partner angles drawn from $\beta$, $\pi-\beta$, $\pi$, $\pi+\beta$ and $2\pi-\beta$. This list follows by placing their four phases at $0,-\beta,\pi,\pi-\beta$ and taking clockwise differences; reversing an interaction interchanges the complementary entries. Every listed angle is at least $\rho$. Therefore all twelve directed outer-to-outer partner channels have $D>1/128$ once $\rho\ge1/32$. This remains true at $v=1$ and does not exclude any channel near the wake-speed boundary.

## All remaining factors, distances and delays

For radii $r,s$ and delayed angle $\psi$, $\tau^2=r^2+s^2-2rs\cos\psi$ and $D=1+\omega rs\sin\psi/\tau$. If $r\le s$, the difference $\tau^2-s^2\sin^2\psi=(s\cos\psi-r)^2\ge0$ proves $rs|\sin\psi|/\tau\le r$. Swapping the radii proves the symmetric bound by $\min(r,s)$. Every channel involving an inner member has that minimum equal to one, and hence

$$
D\ge1-\omega\ge1-1/b\ge1/2.
$$

This includes sixteen directed mixed-radius channels and both inner own-antipode channels; it uses the actual circular transmitter geometry in both source-receiver directions. Together with the twelve outer channels, the full count is thirty, all with the conservative common floor $D\ge1/128$.

For the containing domain's prescribed configurations, $\rho\ge1/32$ and $b\ge2$. The least outer cross-pair distance is $2b\sin(\rho/2)\ge b\rho/2\ge1/32$, using $\sin z\ge z/2$ for $z\le\pi/4$. Outer own-antipode distances are $2b\ge4$, the inner own-antipode distance is two, and mixed distances are at least $b-1\ge1$. Thus every simultaneous partner distance is at least $1/32$, independently of balance.

The complete circular-root theorem applies to these distinct prescribed circles with speeds at most one. It gives exactly thirty ordinary positive partner roots and zero positive self roots, including at $\omega b=1$. Present distance $d$ is at most the causal chord length $\tau$ plus source travel at speed at most one over the delay, so $d\le2\tau$. Hence $\tau\ge1/64$. Every causal chord is at most the sum of its two radii; for $b\le5$, this is at most ten. Thus all partner delays lie in $[1/64,10]$ over the complete history, without a finite-history cutoff.

## Compact containment and continuity

The full paired-value certificate proves the previously conditional exact-set bound $b<5$. Combining that result with the independent phase floor and the hypothesis $\omega b\le1$ places every exact configuration with $b\ge2$ in

$$
2\le b\le5,\qquad 0\le\omega\le1/b,\qquad
1/32\le\beta\le\pi-1/32,\qquad \chi\in\mathbb T.
$$

The inner positive phase $\chi$ is measured after rotating one outer positive phase to zero. This is a closed bounded parameter set times a phase torus, hence compact. Including $b=5$ closes the exact upper-radius boundary even though exact balance there is excluded. Including $\omega=0$ adds prescribed static comparison configurations without claiming any static equilibrium.

All positions remain distinct, every partner root is unique, and the displayed delay and factor floors hold throughout this domain. The ordinary implicit-function theorem therefore gives continuous partner-root dependence and continuous complete balance equations, including the closed wake-speed endpoint and the phase-torus identification. This is a regular containing set, not an exclusion of that set or a practical-cost statement for a proposed cover.

## Controls, falsifiers and disposition

Independent analytical controls include the exact cap $C(1/2)=16/3$, the static factor $D_0=1$, and own-antipode channels with present angle $\pi$, emission angle at least $\pi$ and factor at least one. The integral inequality is an elementary consequence of the displayed nonnegative derivative, with its two emission-angle cases kept separate. The directed root count explicitly separates twelve outer, sixteen mixed and two inner channels. No new numerical evidence was required.

The phase restriction holds independently of the new $b<5$ certificate; compact radius containment uses that now-completed result. The conclusions do not cover $1<b<2$, arbitrary unequal radii, an exact reference, stability or actual-time dynamics. A wrong directed-angle inventory, invalid use of the small-angle lemma at $v=1$, factor below the stated floor, extra positive root, or an exact configuration violating the phase or radius bound would falsify the corresponding assertion. A residual enclosure containing zero inside the compact set leaves exactness unresolved. The frozen subject, full certificate, pilot, previous reviews and receipts were preserved. Parent integration remains separate. This completes the requested review queue.
