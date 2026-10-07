# Frequency-independent crossing torque for small cosine heights

## Scope and proposed margin

Claim grade: derived enclosure with a measured subject target, pending independent reconstruction. Take the canonical six-member class with unit normalized radius, constant positive planar rate $\beta$, no periodic phase correction, and $z(\phi)=H\cos\phi$, where $H,\kappa>0$ and $\phi=\kappa t/R$. The physical axial-speed amplitude is $v=H\kappa$. For
$$
\frac{19}{100}\le\beta\le\frac{21}{100},\qquad 0<H\le\frac1{10},\qquad H\kappa\le\frac{19}{20},
$$
the [subject interval instrument](overnight2-b-cosine-small-height.py) encloses the tangential acceleration at the descending height zero strictly above $1/10$. Its prescribed tangential acceleration is zero, so this sign excludes exact balance at every $R>0$. There is no upper frequency bound beyond the physical speed condition; as $H$ tends to zero, the permitted $\kappa$ can grow without bound.

The law is $K=c_f=1$ with all ordinary positive-delay partner and self roots. The total speed is bounded by $\sqrt{(21/100)^2+(19/20)^2}<49/50<1$. The complete monotone-gap proof supplies one positive ordinary root for each of the five partners, no positive self root and positive source divisors. Thus all roots are included by this finite sum; no memory cutoff is used.

## Uniform geometry at the crossing

At reception phase $\phi=\pi/2$ the receiver height is zero. For partner $j$ and normalized delay $d$ define
$$
\alpha_j=j\pi/3-\beta d,\qquad \ell=\kappa d,\qquad \sigma_j=(-1)^j.
$$
The source height is $\sigma_jH\sin\ell$, and the delayed source axial velocity is $-\sigma_jv\cos\ell$. Therefore the normalized distance obeys
$$
q(d)^2=4\sin^2(\alpha_j/2)+H^2\sin^2\ell,
$$
and its source axial projection is exactly
$$
Q_zV_{s,z}=Hv\sin\ell\cos\ell.
$$
In particular
$$
q_0(d)\le q(d)\le q_H(d),\qquad |Q_zV_{s,z}|\le Hv/2,
$$
where $q_0=2|\sin(\alpha_j/2)|$ and $q_H=\sqrt{4\sin^2(\alpha_j/2)+H^2}$. These bounds hold for every frequency and every actual causal root, including roots with phase lag beyond several height periods. The factor one half in the projection uses the cosine relation between height and axial velocity; it is not an arbitrary reduction in the velocity bound.

Both comparison distances are Lipschitz with constant at most $\beta\le21/100$. Their positive roots are unique and their gaps decrease with secant magnitude in $[79/100,121/100]$. Comparison at the actual root gives $d_{0,j}\le d_j\le d_{H,j}$. Both comparison roots lie in $[1/2,21/10]$ by their current planar chords and bounded comparison diameters.

The canonical source divisor and tangential row are
$$
D_{s,j}=1+\frac{\beta\sin\alpha_j-Hv\sin\ell\cos\ell}{d_j},\qquad
A_{t,j}=-\frac{\sigma_j\sin\alpha_j}{d_j^3D_{s,j}}.
$$
An interval for the comparison-root pair, together with the full projection range $[-Hv/2,Hv/2]$, encloses each row. Correlations discarded by this substitution may widen the answer but do not remove an admitted value.

## Subject implementation and known-first sequence

The companion imports the frozen [thin-height subject's](overnight2-b-thin-height-torque.py) algebra, whose comparison term is $4h^2$ and projection ceiling is $2hu$. Substituting $h=H/2$ and $u=v/2$ produces exactly $H^2$ and $Hv/2$. These are comparison-algebra inputs only: the actual physical height remains $H$ and physical speed remains $v$. No frozen subject or independent reference was modified.

Before pilot or target use, exact rational controls checked both substitutions; an interval at lag $\pi/4$ enclosed the known projection $Hv/2$; static comparison roots and torque cancellation were recovered; and the complete speed bound was checked. Known receipt SHA-256 is ba465cbfd4f8092d091c061bc5096a35cfaa1560dea0c4c112935090c5660026.

The pilot used $\beta=1/5$ and $H\le1/20$, returning a positive interval in 0.026603 internal seconds and 26,329,088 bytes peak RSS. Its identity is 2a50a4861776cbb671ac12e23ed84a97c575ecac5446405f06de1bddd304c868. Its fixed five-channel cost supported the unchanged full-rate target. Both commands completed synchronously with exit zero.

The target used the full displayed parameter region and completed synchronously with exit zero in 0.007563 internal seconds and 26,329,088 bytes peak RSS. Its tangential lower endpoint is
$$
\frac{1346184289269500917806782102912112610472608711}{11417981541647679048466287755595961091061972992}>\frac1{10}.
$$
The strict comparison follows by multiplying the positive denominator; its numerator times ten exceeds the denominator. Target receipt identity is dbf706a8423594daa80bb1cc93d0039f539c9455d5a0cc4609f18191e518c217. The wrapper identity is 1dca8b7eb63910c3ded8248899bf7a34bfc0e20f43517ac0e47d433af2c24532; its frozen subject dependency is ec4bee456af7b4d96ee623ece692f0b9724e157eb9954ae6cd916b431354d40e. Limits were sixty seconds, 512 MiB, one MiB per receipt and one numerical thread. No numerical job remains.

Original receipts remain under .local-data/master-equation-closure/overnight2-b/cosine-small-height/. They are exclusive writes with authenticated known-stage source identity. No replay or remote backup is asserted. The mpmath outward-interval library remains a common arithmetic dependency to disclose in independent review.

## Conditional synthesis across all positive amplitudes and frequencies

The following broader conclusion is a proposal until both this small-height bound and the [complete crossing cover](overnight2-b-centered-domain-cover.md) receive independent acceptance. Together with the already accepted [lobe-endpoint theorem](overnight2-b-independent-lobe-endpoint.md), they would exclude every cosine member satisfying
$$
H>0,\quad\kappa>0,\quad\beta\in[19/100,21/100],\quad
\beta^2+H^2\kappa^2\le(19/20)^2,
$$
at every positive scale, with unit normalized radius and no periodic phase correction.

To see the complete parameter disposition, define $\eta=H\kappa/\sqrt{(19/20)^2-\beta^2}\in(0,1]$. Heights $H\le1/10$ lie in the frequency-independent bound above. For $1/10\le H\le5/6$ and $\eta\ge1/10$, the exact point belongs to the finite cover's domain. In the same height range with $\eta<1/10$, one has $\kappa<19/20<\pi/2$, so the endpoint theorem excludes it. Finally, $H>5/6$ gives $\kappa<(19/20)/(5/6)=57/50<\pi/2$, and the same endpoint theorem applies. Boundaries at $H=1/10$, $H=5/6$ and $\eta=1/10$ are included in the closed interval domains. This is an exhaustive division, not an inference from a sampled sweep.

Even if accepted, this combined conclusion would concern the constant-radius cosine family in its stated rotation interval and speed budget. It would not exclude variable radius, arbitrary phase correction, asymmetric height or all speeds below one. No exact spatial reference or stability verdict is supplied.

## Falsifiers and independent obligations

A wrong cosine source projection, invalid comparison-root ordering, missed root, nonpositive actual divisor, wrong interval substitution or actual crossing torque at or below the proposed lower bound would invalidate the corresponding claim. Independent verification must reconstruct the comparison and row enclosures without importing this wrapper or its subject dependency. The wider synthesis additionally needs an independently complete finite cover, not merely its volume total or selected accepted leaves. Existing independent references and historical receipts must remain frozen throughout that review.
