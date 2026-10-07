# Independent assessment of spatial phase transport

**Derived assessment; after disclosure.** Accept the [spatial transport subject](overnight2-a-spatial-phase-transport.md) for exactly the complete-history neighborhood already admitted by the [finite spatial assessment](authorized-cases-followup-reference-d-finite-radius-assessment.md). Its intrinsic phase argument supplies the missing direction comparison, so the [accepted nominal contradiction](overnight2-a-reference-nominal-phase-fate.md) extends to that entire spatial neighborhood. The first auxiliary-account zero occurs strictly before separation $2\times10^{16}$, including exclusion of a simultaneous zero at the hypothetical endpoint. The inherited safe-turn and positive-terminal theorems then give all-future ordinary continuation, individual velocity limits and strictly positive limiting relative speed for every member. A numerical uniform lower terminal speed is a separate assessment.

This review reconstructs the geometry and transfer, rather than inferring them from agreement with the subject. The Hale and Moore lenses guide attention to complete source histories, exact differentiation and explicit margins; they are not acceptance authority. The original law, literal coefficients, $c_f=R_0=1$, independent perturbations of the two histories, and regularity remain unchanged. No physical plane at infinity, angular floor at infinity or new preparation is asserted.

## Exact developed geometry

Let $s=\epsilon T$, $Y=(X_+-X_-)/2$, $A=Y_{ss}$, $r=|Y|$, $p=Y_s\cdot n$, $h=|Y\times Y_s|$, $n=Y/r$, $\ell=(Y\times Y_s)/h$, and $t=\ell\times n$. The negative-stage angular floor supplies $h>0$. Write $A=A_n n+A_t t+A_\ell\ell$ and introduce $\theta_s=h/r^2$ with $\theta(0)=0$. Differentiating the angular vector first gives

$$
(Y\times Y_s)_s=rA_t\ell-rA_\ell t,\qquad
h_s=rA_t,\qquad
\ell_s=-\frac{rA_\ell}{h}t.
$$

It follows, without a fixed-plane assumption, that

$$
n_\theta=t,\qquad
\ell_\theta=-\zeta t,\qquad
t_\theta=-n+\zeta\ell,\qquad
\zeta=\frac{r^3A_\ell}{h^2}.
\tag{1}
$$

The last identity uses $t\times n=-\ell$ and $\ell\times t=-n$, fixing both signs. This explicitly retains the normal acceleration.

To avoid conflating frame transport with physical motion, denote the transported basis by $a_f,b_f$. Solve

$$
(a_f)_\theta=-\ell(\ell_\theta\cdot a_f),\qquad
(b_f)_\theta=-\ell(\ell_\theta\cdot b_f),\qquad
a_f(0)=n(0),\quad b_f(0)=t(0).
\tag{2}
$$

For example $(a_f\cdot\ell)_\theta=-\ell_\theta\cdot a_f+a_f\cdot\ell_\theta=0$, and $(|a_f|^2)_\theta=-2(a_f\cdot\ell)(\ell_\theta\cdot a_f)=0$. The corresponding cross inner product and $b_f=\ell\times a_f$ are preserved. On any finite regular interval, the locally bounded coefficients give the unique absolutely continuous orthonormal frame, including the allowed one-sided release seam.

For any in-plane vector $v$, let $\widetilde v=(v\cdot a_f,v\cdot b_f)$. Because $v\cdot(a_f)_\theta=v\cdot(b_f)_\theta=0$,

$$
\widetilde v_\theta=\operatorname{dev}(\Pi v_\theta),
\qquad \Pi=I-\ell\ell^{\mathsf T}.
\tag{3}
$$

Here $\operatorname{dev}$ takes components in the displayed orthonormal basis and preserves in-plane norms. Equations (1)–(3) give exactly

$$
\widetilde n=(\cos\theta,\sin\theta),\qquad
\widetilde t=(-\sin\theta,\cos\theta).
\tag{4}
$$

No bound on accumulated normal rotation is needed: the two directions in the final comparison are developed by the same frame. A transported frame around a closed normal path need not return to its initial physical orientation; that possible rotation does not alter (3) or the shared-coordinate comparison. These statements concern a one-parameter path and do not assert a path-independent flattening of arbitrary surfaces.

## Scalar and vector response derivatives

Set $P=hp$, $Q=h^2/r$, $\alpha=\epsilon/h$, $a_r=r^2A_n$, and $b_t=r^2A_t$. Since $p_s=A_n+h^2/r^3$, the independent chain rule gives

$$
h_\theta=\frac{hb_t}{Q},\qquad
P_\theta=\frac{Pb_t}{Q}+Q+a_r,\qquad
Q_\theta=2b_t-P,\qquad
\alpha_\theta=-\frac{\alpha b_t}{Q}.
\tag{5}
$$

Normal acceleration changes $\ell$ but not any derivative in (5). For $e=(Q-1)n-Pt$, the full derivative and the projected derivative of $c=e/h$ are

$$
e_\theta=2b_t n-\left(1+a_r+\frac{Pb_t}{Q}\right)t-P\zeta\ell,
$$
$$
\Pi c_\theta=\frac{(Q+1)b_t}{hQ}n-\frac{1+a_r}{h}t.
\tag{6}
$$

The normal term in the first line has not vanished physically. Equation (3) removes its contribution to the developed derivative exactly.

More generally, for $z=h^{-1}(Z_n n+Z_t t)$, differentiation produces the normal term $h^{-1}Z_t\zeta\ell$ and the ordinary two-dimensional rotation terms from (1). Projecting and developing leaves precisely the planar corrected-vector derivative. For either scalar component $Z$, an acceleration-response perturbation contributes

$$
\delta(\widetilde z_\theta)
=\operatorname{Rot}(\theta)\,\frac1h
\begin{pmatrix}
(Z_n)_P\delta a+K_{Z_n}\delta b/Q\\
(Z_t)_P\delta a+K_{Z_t}\delta b/Q
\end{pmatrix},
\qquad
K_Z=PZ_P+2QZ_Q-\alpha Z_\alpha-Z.
\tag{7}
$$

Likewise, for $I=h^{-2}F(P,Q,\alpha)$,

$$
\delta I_\theta=h^{-2}\left[F_P\delta a+
\frac{PF_P+2QF_Q-\alpha F_\alpha-2F}{Q}\delta b\right].
\tag{8}
$$

The phase expression $\Theta=\theta-h/\epsilon-\alpha(Q-2/3)-(2/3)\alpha^2P$ therefore has exactly the already assessed scalar derivative. Equations (7)–(8) justify reusing the accepted scalar and developed-vector majorants. They would not justify bounding the full physical derivative of $z$ by its planar derivative.

The [accepted spatial seventh-order reference](overnight2-a-reference-spatial-seventh-order.md) supplies the actual radial and full transverse-vector bounds on one common polynomial-error vector plus a separate vector of norm $2\nu$. This is stronger than a formal extension of a tangential scalar coefficient. Projection cannot enlarge either bound, and the isotropic term keeps its original magnitude without an invented $Q$ factor. Both physical partner clocks, the auxiliary centered clock, sampled midpoint supremum and source acceleration remain within that inherited theorem.

## Finite comparison and the common reference

For each original complete nominal extension with speed bound $b_0<1$, the admitted radius is

$$
\delta_*=\min\{10^{-20},(1-b_0)/(2\epsilon)\}
$$

in the subject's complete-history norm. On $[-3,0]$ the position perturbation is at most $(1+3\epsilon)\delta_*$ and its velocity perturbation at most $\epsilon\delta_*$. Thus the complete strict-speed bound persists, the earlier-source gap at $-3$ remains positive, and monotonicity excludes older partner roots. The remote extension is not assigned the generated speed ceiling.

The finite spatial assessment gives an extra initial comparison error at most $(1+23\epsilon)\delta_*$. Against the original ideal mirror release this is already included in $E(0)<1.411\times10^{-16}$. The Euclidean comparison through forty in the [release assessment](overnight2-a-reference-adiabatic-release.md) uses no planar component identity. Its row Lipschitz constants and root displacement estimates therefore apply to every member of this ball and yield

$$
|\delta Y|<1.129\times10^{-15},\quad
|\delta Y_s|<1.695\times10^{-13},\quad
|\delta h|,|\delta P|<1.73\times10^{-13},\quad
|\delta Q|<3.48\times10^{-13}.
\tag{9}
$$

This extension concerns the finite comparison only. The ideal release proof remains a proof for its own mirror path, and the actual spatial path is reached through (9); it is not made mirror by assumption.

The radius and angular variables on the connecting release tube remain near one. Differentiating the angular rate gives

$$
\left|\delta\left(\frac h{r^2}\right)\right|
\le1.01|\delta h|+2.01|\delta Y|
<1.78\times10^{-13}.
$$

Integration over slow-time length $40\epsilon$, with $\epsilon<.000334$, gives $|\delta\theta(40)|<2.4\times10^{-15}$. Both angles start at zero in their own developed bases. This compares intrinsic accumulated angles, not physical orientations of distinct planes.

The explicit expression

$$
\widetilde z=h^{-1}\operatorname{Rot}(\theta)(Z_n,Z_t)
$$

now gives the finite vector transfer directly. On the release box, the combined component sensitivity to $(P,Q)$ is near one per coordinate and the $h$ sensitivity is small; bounding them conservatively by two gives less than $1.05\times10^{-12}$ from (9), within the subject's $2\times10^{-12}$. The extra angle term is at most $3\epsilon(2.4\times10^{-15})<3\times10^{-18}$. The scalar gradient bounds already assessed for $I$ give transfer below $5\times10^{-16}$. For $\Theta$, the dominant term is $|\delta h|/\epsilon<5.19\times10^{-10}$; the $Q,P,\theta$ terms and the derivative of $\alpha$ fit below the retained $6\times10^{-10}$ cap.

Use the exact nominal $I_0,h_0,Q_0,\phi_*$ as a common scalar and developed-direction reference. They are not asserted to equal a perturbed member's initial values. The ideal-to-nominal initial scalar discrepancy is the already bounded literal radius defect, and (9) pays for the full spatial initial perturbation at the restart. Relative to their own initial $n,t$ bases, the nominal and ideal leading directions are the same coordinate formula up to that defect; absolute initial orientation is irrelevant to the literal phase gap.

The ideal release and actual later monotone-$h$ intervals have at most $1.73\times10^{-13}$ overlap at forty. The previously checked density bound $.02$ near that restart therefore pays less than $4\times10^{-15}$ without doubling the global vector integral. The six centered source generations remain later than physical twenty at restart; monotonic playback preserves them thereafter. This is used together with, not in place of, the separate generated coverage of the two physical clocks.

## Consequence and exact limits

On a proposed negative first passage to $r=10^{16}$, all original finite spatial barriers and response hypotheses remain strictly inside their admitted domains. Equations (3)–(9) retain the nominal final allowances: common-reference account error below $4\times10^{-14}$, developed-vector displacement below $3.34\times10^{-6}$, and phase-expression error below $3\times10^{-8}$. The endpoint coercivity and direction reconstruction are scalar or developed-plane statements, hence unchanged.

At a simultaneous first account zero, the exact account inequality becomes non-strict. The subsequent numerical bounds remain strict through their existing reserves, just as in the nominal assessment. Thus the contradiction covers $\mathcal J\le0$ at first $r=10^{16}$, not merely a strictly negative endpoint. It again requires a literal phase distance below $.214$, incompatible with the independently enclosed distance above $.328061$. Finite negative-stage continuation then forces first account zero strictly before $d=2\times10^{16}$.

The [accepted inward-zero assessment](authorized-cases-two-hour-d-reference-inward-assessment.md) already covers the entire spatial class and includes an inward zero before the first large excursion. It reaches the [accepted outward theorem](authorized-cases-outgoing-d-reference-assessment.md), after which the [positive-terminal assessment](authorized-cases-two-hour-d-coordinator-terminal-assessment.md) gives individual velocity limits and $d(T)/T\to|U_\infty|>0$. Neither proof requires the transported frame, a surviving angular floor or a limiting physical plane. Thus the spatial extension is an actual all-future dispersal result, not merely a norm bound.

Analytical controls are the fixed-plane case $\zeta=0$, the arbitrary bounded normal coefficient in (1)–(3), preservation of the six frame inner products, and the independent scalar chain rule (5). A counterexample must respect the exact complete-history norm and root premises; an arbitrary rotating vector or a nearby present state alone is not an admitted physical history. Falsifiers are a tangential term missing in (2), a normal contribution to (5), failure of the common vector error decomposition, loss of either physical source clock, or a finite comparison exceeding (9). No such missing inequality remains in this reconstruction.

## Provenance and validation

This assessment uses the successfully admitted retained assignment 9ab0a867-5e03-4290-a759-1c31e4f69168; receive-file exited zero with the complete payload and payloadVerified true. Its receipt reported transportVerified false, which is not promoted into a transport-verification claim here. Native shasum -a 256 independently reproduced all ten assignment source identities before writing.

| Frozen input | SHA-256 |
| --- | --- |
| Spatial subject | e1b4f8f361bc4b26c38fdee981c31e103e09a739df95a91f304640afef24c15b |
| Nominal fate reference | cb98a51a60652f88ffb424599c4f04e5bdfd8c079a16c203af30dd8baa692eb8 |
| Spatial seventh-order reference | ed0943d83705f188bd37cf36c4a2c53e0c9f1cae8170ce68ea4404d3e04ca256 |
| Release reference | 59dcc6986395e03db97de66233a4f6db05ac5f3df4f30cab5d3395b2b5361f11 |
| Finite spatial owner | 8c661274200ca2eb24e7dbebf86af9aef4cde8a3f422407bda319daf676a708b |
| Finite spatial assessment | bf0c4bd70ffc49fae295065ab4ceec2e57ca9af28c82841940f7a40bc234bbe4 |

No new instrument, scientific target or physical trajectory was run. This review writes only this new report; original local receipts and all earlier frozen mathematical files are retained. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) is the receiving integration owner, maintained by the coordinator.

**Freeze receipt.** The established authorized-cases-followup-document-check.mjs command with this report's repository-relative path passed known controls first, then 95 mathematical spans, nine local links and whitespace checks. This validates document syntax and destinations only. A closing native shasum -a 256 reproduced all ten dispatch-source identities, including the six above. The additionally read inward-zero assessment measured 479738c020bac8ceea5faa265c1d56df266f53a9978dab519490dc80962f00e2, matching its previously frozen identity. This report is frozen after the final repeated syntax check; no mathematical correction to the spatial subject is required beyond retaining the already governing nonpositive-endpoint clarification.
