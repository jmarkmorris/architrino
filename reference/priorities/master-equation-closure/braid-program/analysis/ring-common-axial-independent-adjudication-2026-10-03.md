# Independent adjudication of common axial decay

Date: 2026-10-03. Subject: [Common axial braking at T02, T04 and T06](ring-common-axial-decay-2026-10-03.md), final frozen SHA-256 `cbaf533298922679b8b3b8b49a0f7d17c91f96a73c206f20a0d11806a3125a49`. Subject instrument SHA-256 `0e4fb74fba6ff5a7f74140070ee6b1e7cf9dc5652f822961516c37f80116acf3`; known receipt `8cab069c7e7b15a5e1bb9be40b1b9cfab00035599ec532f8335435e33c54f5b9`; target receipt `8a1575a94e53bde4954b3dc3e33e00a6fe56492662f1e7f3665b7afbe1c8fb48`. Scenario: unchanged Master Equation, $K=c_f=1$, complete positive-delay self reception. Reviewer and implementation are separate from the subject author.

## Verdict

**Accepted, computer-assisted derived and independently checked:** the common axial characteristic function has exactly one root in each stated closed strip, the simple translation root at zero. Every other root has real part strictly below $-0.4$ at T02, $-1$ at T04 and $-0.5$ at T06. This is a complete scalar count, with a proved outer exclusion rather than a finite root search. The separate Cartesian reconstruction and full counterclockwise rectangle count agree with the subject's vertical-half-boundary construction without using its contour routine, weights or packet-reader implementation.

**Accepted, derived linear response:** a flat-past common axial velocity increment $U$ produces velocity and acceleration that decay exponentially, while the displacement tends to $U/(-B)$. More generally, finite admitted histories give a common-sector linear solution that approaches a constant displacement. This supports linear stability modulo axial translation in this sector. The complete ring remains unstable through its separately established other sectors. No nonlinear all-future axial retention, permanent finite axial speed, physical qualification or general three-dimensional stability is established.

During review, the rational control's original outer bound used $3.5|s|+1.25$ where the correct numerator is $4|s|+1.25$. The subject author corrected that coefficient, reran analytical controls before a fresh target and froze the final files identified above. Its final targets also deepen every strip by $10^{-20}$, eliminating ambiguity from a rounded point representation of a decimal rational. Both corrections are accepted. This review's independent checker uses the corrected analytical control and an independently chosen upward binary enclosure of each requested decimal strip depth. No further mathematical repair of the final frozen subject is required.

Falsifiers: a failed inherited exact balance, omitted ordinary root, invalid Cartesian denominator enclosure, failed boundary disk or outer inequality, or nonzero independently counted winding defeats the corresponding spectral claim. A history or input different from the stated preparation changes its response. An invalid inverse-transform subtraction would defeat the decay conclusion. The authoritative binary fields are retained in the independent target receipt, rather than only decimal summaries.

## 1. Independent Cartesian weights and inherited balance

The exact speed, radius and complete ordinary scalar root charts are inherited from the accepted [axial owner](ring-axial-sectors-2026-10-03.md) and [its separate adjudication](ring-axial-independent-adjudication-2026-10-03.md). The new calculation begins from their frozen geometry intervals; it does not independently prove the exact existence theorem again.

At reception, take receiver position $(R,0,0)$. An ordinary root has emitted planar source position $\mathbf y=R(\cos\theta,\sin\theta,0)$, velocity $\mathbf V=\Omega J\mathbf y$, separation $\mathbf r=(R,0,0)-\mathbf y$, range $\ell=\sqrt{\mathbf r\cdot\mathbf r}$ and transmitter factor $D=1-\mathbf r\cdot\mathbf V/\ell$. The checker constructs these Cartesian vectors directly from the inherited root half-angle and verifies the scalar root residual contains zero. It computes range by the Cartesian square root, rather than inserting the subject's $2R\sin x$ weight formula.

For an axial displacement difference $\delta z=z(T)-z(T-\ell)$, the reference separation and source velocity are horizontal. Implicit causal differentiation therefore gives zero first-order delay shift: $\delta\ell=0$ and $\delta S=0$. The unit-vector change is purely axial, $\delta n_z=\delta z/\ell$, and $\delta D=0$ because both reference axial components vanish. Differentiating the ordinary row gives

$$
\delta a_z=\frac{\sigma}{\ell^3|D|}\,[z(T)-z(T-\ell)],\qquad \sigma=q_iq_j.
$$

This independently yields the common scalar equation. The ordinary positive-delay self row has exactly the same formula; present and delayed evaluations of one member's path remain separate. No positive-$D$ restriction is imposed.

Before any spectrum, the independent checker verifies the full expected root labels and branches: eight rows per receiver at T02, twelve at T04 and sixteen at T06. There is one ordinary self hit per receiver. It reconstructs radial and tangential acceleration sums from the same Cartesian rows and confirms their interval residuals contain the accepted exact balance. This check is consistent with the inherited exact theorem; interval containment alone is not a new proof of a balance. Every reconstructed range is positive and every transmitter interval excludes zero.

Writing $w_j=\sigma_j/(\ell_j^3|D_j|)$ and $B=\sum_jw_j\ell_j$ gives

$$
H(s)=s^2-\sum_jw_j(1-e^{-s\ell_j}),\qquad
H(0)=0,\qquad H'(0)=-B>0.
$$

Hence zero is simple. The quotient $G=H/s$ extends to an entire function, with $G(0)=-B$. Removing the symmetry zero is mathematically exact, and introduces no pole in the argument-principle count.

## 2. Separate full-contour count

For any $\operatorname{Re}s\geq-\gamma$, direct absolute-value estimation gives

$$
|H(s)-s^2|\leq C_\gamma=\sum_j|w_j|(1+e^{\gamma\ell_j}).
$$

Thus every characteristic zero in the strip satisfies $|s|^2\leq C_\gamma$. The independent checker uses the full rectangle with vertices $-\gamma\pm iL$ and $L\pm iL$, traversed counterclockwise. The conservative inequality $C_\gamma<(L-\gamma)^2<L^2$ excludes every root outside that rectangle within the strip. In particular, its right and horizontal sides are ordinary zero-free boundaries; they are still included in the separate contour certificate.

The reconstructed outward caps, rounded upward for display, are:

| Reference | Exact requested $\gamma$ | $L$ | $C_\gamma$ upper cap | Independent full-boundary disk panels | Zeros of $G$ |
| --- | ---: | ---: | ---: | ---: | ---: |
| T02 | 0.4 | 7 | 27.824239 | 58 | 0 |
| T04 | 1 | 20 | 323.101173 | 70 | 0 |
| T06 | 0.5 | 38 | 1314.739188 | 68 | 0 |

The actual boundary depth is the upper binary endpoint of an outward enclosure of the exact decimal rational requested in the table. It is therefore at least that rational depth, so the displayed closed strips are literally covered. The subject's separately widened depth is also stronger than its displayed claim.

On a straight boundary panel from $a$ to $b$, set $m=(a+b)/2$, choose a point $c$ inside the interval enclosure of $G(m)$, and use an interval enclosure of $G'$ on the whole panel rectangle. An upper radius

$$
r=\sup|G(m)-c|+\frac{|b-a|}{2}\sup_{[a,b]}|G'|
$$

contains the entire image of the panel by integration of the derivative. The actual checker adds a positive rounding allowance and certifies $r<|c|$. This zero-free disk is convex. Independently selected point vertices inside the endpoint-value intervals are checked to lie inside that same disk. Consequently the true panel and the straight segment between those vertices are continuously homotopic without passing through zero. Adjacent panel vertices agree exactly, including closure of the polygon.

The derivative is reconstructed independently as

$$
G'(s)=1-\sum_jw_j\frac{s\ell_je^{-s\ell_j}-(1-e^{-s\ell_j})}{s^2}.
$$

No panel reaches $s=0$, so the quotient form is legitimate there. Adaptive subdivisions stop only after the disk exclusion and vertex inclusion inequalities pass with outward arithmetic. This differs from the subject's direct rectangular image enclosure on a conjugate half-boundary.

The new checker counts positive-real-ray intersections of the entire counterclockwise polygon. For segment endpoints $(x_0,y_0)$ and $(x_1,y_1)$, the crossing abscissa is enclosed by

$$
x_{\rm cross}=\frac{x_0y_1-x_1y_0}{y_1-y_0}.
$$

A positive-abscissa upward crossing contributes $+1$ and a downward crossing $-1$; a half-open convention counts shared real-axis vertices once. Every relevant crossing abscissa excludes zero. The net winding is zero in all three references. Since $G$ is entire, these are zero counts rather than zero-minus-pole counts. The separate target has four, eight and four positive-ray crossings respectively, all canceling; this does not contradict the subject's absence of negative-ray crossings in its upper-half polygon.

The subject's clockwise sign convention also checks analytically. If the upper vertical lift ends at principal argument plus $2\pi k$, conjugation contributes the same vertical argument increment on the lower reversed half. The outer zero-free homotopy subtracts twice the top principal argument. The total clockwise winding is $2k$, hence its enclosed zero count is $-2k$. The known conjugate-pair control and the separate counterclockwise calculation both verify the orientation. No bounded frequency cutoff or sampled phase unwrapping is used.

**Grade: independently measured outward disk and root-count inequalities supporting the derived complete spectral exclusion.** Instrument: [ring_common_axial_independent_adjudication_20261003.py](../../../../../scripts/braid-program/ring_common_axial_independent_adjudication_20261003.py). Target receipt: `.local-data/ring-exploration/common-axial-adjudication/target.json`, SHA-256 `b7a62a8f6e8a2cb0c7c6404f522a0d9c71abfc1e8584957be16f3fbef2c0b432`.

## 3. Residue subtraction and braking reconstructed

For a flat axial past and a prepared velocity increment $U$ at zero, direct Laplace transformation of the retarded scalar equation gives

$$
Z(s)=\frac{U}{H(s)},\qquad
\widehat{z'}(s)=\frac{U}{G(s)},\qquad
\widehat{z''}(s)=\frac{Us}{G(s)}-U.
$$

The impulse is external preparation; the baseline equation governs the post-input first variation. The last subtraction uses the prepared right derivative $z'(0^+)=U$ and has the correct sign. The residue of $Z$ at zero is $C=U/(-B)$.

Choose $a>\gamma$. The functions

$$
F(s)=\frac{U}{H(s)}-\frac Cs+\frac C{s+a},\qquad
V(s)=\frac{U}{G(s)}-\frac U{s+a}
$$

are analytic on the certified strip after the removable zero singularity is filled in. Their artificial pole $-a$ is strictly outside. Uniformly on bounded-width vertical strips with real part at least $-\gamma$, the outer cap gives $H=s^2+O(1)$ and $G=s+O(s^{-1})$. Thus $F,V=O(|s|^{-2})$. The acceleration transform is also $O(|s|^{-2})$. Subtraction of $C/s$ alone would leave an $O(|s|^{-1})$ term and would not provide the claimed absolute integral; the compensating $C/(s+a)$ closes that issue.

On a large Bromwich rectangle, the horizontal integrals of these subtracted transforms tend to zero. The shifted line $\operatorname{Re}s=-\gamma$ has an absolutely integrable transform norm: its compact part is bounded by the nonzero boundary certificate, and its tails by the quadratic decay. Multiplication by $e^{sT}$ therefore proves

$$
z(T)-C=O(e^{-\gamma T}),\qquad z'(T)=O(e^{-\gamma T}),\qquad z''(T)=O(e^{-\gamma T}).
$$

The exponentially decaying artificial terms have depth $a>\gamma$ and preserve these bounds. The constants are finite and proportional to $|U|$; they are not supplied as numerical envelopes. This establishes damping bounds, rather than an exact single decay rate. In particular, $B<0$ is not itself a velocity decay exponent.

The independently reconstructed displacement coefficients are enclosed within the following conservatively rounded intervals:

| Reference | $-B$ | Eventual displacement divided by $U$ |
| --- | --- | --- |
| T02 | $[6.04394488383156,6.04394488383158]$ | $[0.16545485096582,0.16545485096583]$ |
| T04 | $[28.6606567326922,28.6606567326923]$ | $[0.03489103579609,0.03489103579610]$ |
| T06 | $[76.2653563368128,76.2653563368130]$ | $[0.01311211338977,0.01311211338978]$ |

The first memory step remains consistent: before the shortest delay, $z''=Wz$ with $W=\sum w_j<0$, so an initial positive velocity begins at zero acceleration and then receives a negative axial acceleration. Subsequent delayed terms are essential to the asymptotic conclusion. The constant endpoint is an axial displacement, not an axially translating exact ring.

## 4. Arbitrary finite histories and the scope of linear stability

The spectral claim's description as common-sector linear stability modulo translation can also be justified without importing a general delay-stability theorem. Let $d_*\geq\max_j\ell_j$ and provide a finite axial history $\phi$ on $[-d_*,0]$, current value $z_0=\phi(0)$ and prepared right velocity $v_0$. For $T\geq0$, the negative-time source evaluations are equivalent to the compact forcing

$$
f(T)=-\sum_jw_j\phi(T-\ell_j)\,\mathbf1_{[0,\ell_j)}(T).
$$

Let $k$ be the flat-past unit-velocity solution just established. It has $k(0)=0$, $k'(0)=1$, $k''(0^+)=0$, approaches $1/(-B)$ and has exponentially decaying first and second derivatives. Transforming the initial-history equation or direct convolution gives

$$
z(T)=z_0k'(T)+v_0k(T)+\int_0^T k(T-t)f(t)\,dt.
$$

After $T>d_*$, the integral is over a fixed compact interval. The derivative bounds therefore imply

$$
z(T)\longrightarrow
\frac{v_0-\sum_jw_j\int_0^{\ell_j}\phi(t-\ell_j)\,dt}{-B},
$$

with exponentially decaying position error and velocity. For acceleration, $k'''(T)=Wk'(T)-\sum_jw_jk'(T-\ell_j)$ after all initial delays, so it decays too and the same convolution argument applies. For the constant history $\phi=c$, $v_0=0$, the limit is exactly $c$, as translation symmetry requires. The finite Green bounds give linear continuous dependence on the history norm and stability modulo that constant mode. Smooth compact inputs are handled by the same convolution reasoning.

This proof concerns the axial first variation only. A finite nonlinear axial disturbance changes in-plane geometry at second order and may excite growing sectors. Neither the scalar strip theorem nor this Green representation proves nonlinear attraction of the full ring.

## 5. Controls, independence and reproduction

The new checker imports no subject contour, weight calculation, packet reader or external comparison implementation. It independently decodes the inherited binary interval entries, reconstructs Cartesian geometry, derives the scalar weights and derivative, covers four complete boundary edges with derivative-bounded disks, and counts a full counterclockwise positive-ray winding. The accepted exact geometric references remain shared premises. Independence concerns the new scalar count and response derivation, not a new independent proof of the ring existence theorem.

Before its targets, it passed the stationary-source analytical axial derivative $1/8$ at separation two, the zero count for $G=s+1$ in the declared right strip, and the count two for

$$
G(s)=\frac{(s-1/2)^2+1}{s+3}.
$$

The two roots are exactly $1/2\pm i$ and its pole is outside the counted domain. Direct polynomial subtraction gives $G-s=(-4s+1.25)/(s+3)$; the corrected bound $(4r+1.25)/(r-3)<r$ at $r=19.9$ is outward certified. This control checks both orientation and outer-domain reasoning. An initial known-control attempt encountered real-axis vertices excluded by an unnecessary assertion; the half-open crossing convention repaired that new checker. The next known attempt encountered serialization of complex point vertices. Both failures occurred before any ring target. After those repairs, the analytical controls passed before the successful target. No subject or oracle was edited by this reviewer.

Known receipt: `.local-data/ring-exploration/common-axial-adjudication/known.json`, SHA-256 `96a4fc89461b1eb88db317a7680cd02635e86b059fa758468d854841d86fb05b`. Reference digests checked before target admission are T02 `3f44600259557b9736b860a904dc986193b7ca21f33cdbbaeb45f8bc0a440c50`, T04 `17b41d073a1aeec059e292b6696ad2fe54c60b27c46d54976848d29062debc4a`, and T06 `1d01bee2714f3cddc4c65bdfa21b9216ec768edcded5bd5ab6bfe62efcef2e9e`.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_common_axial_independent_adjudication_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_common_axial_independent_adjudication_20261003.py --stage target
```

All numerical instantiations use $c_f=1$. The new analysis, new checker and its local receipts are owned by this review. Shared indexes, queues, manuscript, work log, ranking, score, qualification, scenario and EOM solver remain unchanged. The coordinator owns integration of the accepted bounded conclusion.
