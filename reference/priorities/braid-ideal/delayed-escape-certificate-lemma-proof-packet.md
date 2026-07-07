# Delayed Escape Certificate Lemma Proof Packet

Status: priority-only proof packet, 2026-07-07.
Claim level: derivation-closure proof for a conditional no-return certificate on one state-plus-history row only. This packet does not claim a retained branch, accepted evidence, hypothesis persistence beyond a recorded window, stability, observer export, score movement, or corpus promotion.
Corpus disposition: defer with blocker. Promote only after operator review and, for any retained application, same-record retained-history evidence rather than priority-only proof scaffolding.

Owner checker: [delayed-escape-certificate-check.mjs](../../../scripts/braid-ideal/delayed-escape-certificate-check.mjs), tests in [braid-ideal-delayed-escape-certificate-check.test.js](../../../tests/braid-ideal-delayed-escape-certificate-check.test.js).
Interval certificate: [planar-tangential-screen-interval-certificate.mjs](../../../scripts/braid-ideal/planar-tangential-screen-interval-certificate.mjs), tests in [braid-ideal-planar-tangential-screen-interval-certificate.test.js](../../../tests/braid-ideal-planar-tangential-screen-interval-certificate.test.js).
Companion audit: [Six-Point Equivariant Reduction Proof Audit](six-point-equivariant-reduction-proof-audit-2026-07-06.md), ranked proofing action 3.
Channel hypothesis source: [Six-Point Symmetry Invariant Lemma Proof Packet](six-point-symmetry-invariant-lemma-proof-packet.md).
Executable witnesses: the eleven `SH-0` toy rows recorded 2026-07-07 in the [Shell-Braid Run Matrix](sh-run-matrix.md) (ten declared axis-neutral sweep rows plus the `vt000` zero-angular-momentum control).

Notation: architrino sites use the signed polarity-unit labels $\epsilon_{+,\bullet}$ and $\epsilon_{-,\bullet}$. The kernel, branch weight, softening, coupling, Jacobian floor, and field speed $c_f$ are exactly those of the partner-wake master-equation kernel stated in the six-point packet. Propagation is at field speed $c_f$; no light-delay language is used.

Step labels: (C), (WP), (S), (D$_{\mathrm{op}}$), (P), (M), (W), and (H) are hypothesis rows, each checkable or monitorable on one recorded state-plus-history row; Lemmas 1-4, Lemma A, the Theorem, and the Corollary are derivations under those hypotheses; the anti-damping remark consumes a sampled diagnostic (the planar tangential screen) and derives only its sign routing; the interval-certification section records an executed certificate, rigorous conditional on its declared rounding model, with the certified-clock corollary a derivation conditional on the labeled rigid-to-released transfer hypothesis; the persistence routes in the remaining obligations are labeled speculation.

## Object Under Proof

A conditional no-return certificate: explicit inequalities, checkable on one state-plus-history row at a certificate time $T_0$, implying that the reduced radius cannot execute a return turn at any later time while the declared hypotheses remain in force. The certificate covers both invariant-channel forms — the zero-angular-momentum $S_3\times\langle\iota\rangle$ channel and the axis-neutral rotating $C_3\times\langle\iota\rangle$ channel — under partner-wake-only assumptions.

The 2026-07-06 audit's provisional hypothesis list was: outward $\dot R$ at $T_0$, monotone $R$ over one memory depth behind $T_0$, sub-field-speed, Jacobian floor, and an inverse-square bound on delayed inward force. This packet discharges that list with two improvements. First, full memory-depth monotonicity is not needed: the causal-root distance floor (Lemma 2) converts a current-time separation floor into a root-distance floor using only the sub-field-speed cap on the retained source paths, and only the weaker past-radius cap (P) survives, used solely for the polarity sign discard. Second, the inverse-square envelope is derived, not assumed, and it is polarity-resolved (Lemma 4): same-polarity partner rows are discarded by an exact radial-sign argument, the antipodal partner is controlled by its exact $2R$ separation, and the two opposite-polarity non-antipodal partners are controlled by a channel-intrinsic separation floor (Lemma A), so no same-polarity separation hypothesis appears at all.

## Setup

Six architrino worldlines $\mathbf X_\ell:[-h,T^*)\to\mathbb{R}^3$ under the partner-wake master-equation kernel of the six-point packet, with coupling $\kappa$, softening $\varepsilon\ge 0$, field speed $c_f$, sign-preserving Jacobian floor $J_f\in(0,1)$, and branch weight $W$. Same-source rows are excluded (partner-wake-only). The retained history window reaches back to the hold start $-h$.

Channel hypothesis **(C)**: the solution lies on an invariant channel of the staged six-point lemma — $\operatorname{Fix}(S_3\times\langle\iota\rangle)$ for the zero-angular-momentum seed or $\operatorname{Fix}(C_3\times\langle\iota\rangle)$ for the axis-neutral rotating release — so the dynamic center is $\mathbf 0$ and all six sites share one reduced radius

$$
R(t)=\|\mathbf X_\ell(t)\|
\qquad\text{for every }\ell .
$$

Well-posedness hypothesis **(WP)**: on the interval under certification every retained root is transversal with source Jacobian above the declared floor, the retained root set varies so that each $\mathbf A_\ell$ is piecewise continuous in $t$, and $\dot R$ is locally Lipschitz, so $\ddot R$ exists almost everywhere and the fundamental theorem of calculus applies to $\dot R^2$. This is the same well-posedness window as assumption A3 of the audit.

A **return turn** at $t_1>T_0$ means $\dot R(t)>0$ on $[T_0,t_1)$ and $\dot R(t_1)=0$.

## Certificate Hypotheses

Fix a certificate time $T_0$ and let $t>T_0$. The monitored hypotheses at reception time $T\in[T_0,t]$ are:

- **(S) sub-field speed.** Every worldline speed on the retained window $[-h,T]$ satisfies $\|\dot{\mathbf X}_\ell\|\le\beta c_f$ with a declared $\beta<1$. The pre-$T_0$ part is checkable on the recorded history; the post-$T_0$ part is a monitored event.
- **(D$_{\mathrm{op}}$) opposite-polarity separation floor.** The current minimum separation over opposite-polarity non-antipodal pairs satisfies $\|\mathbf X_{\epsilon_{+,i}}(T)-\mathbf X_{\epsilon_{-,j}}(T)\|\ge\gamma_{\mathrm{op}}R(T)$ for $i\ne j$, with a declared $\gamma_{\mathrm{op}}>0$. By Lemma A this holds unconditionally on the invariant channel with $\gamma_{\mathrm{op}}=1$; a larger measured $\gamma_{\mathrm{op}}$ tightens the envelope. No same-polarity separation floor appears anywhere in the signed certificate.
- **(P) past-radius cap.** $R(s)\le R(T_0)$ for every $s\in[-h,T_0]$ in the retained window; checkable on the recorded history at $T_0$. This is a weaker checkable remnant of the audit's memory-depth monotonicity hypothesis, used only for the same-polarity sign discard in Lemma 4.
- **(M) root-count cap.** Each directed pair retains at most $m$ causal roots at $T$. Discharged: by Theorem M below, (S) plus recorded root coverage at $T_0$ forces exactly one transversal root per directed pair, so $m=1$ inside every (S)-valid window; $m$ survives as a declared cap only for kernels or regimes outside (S).
- **(W) weight cap.** Branch weights obey Lemma 3's bound $W\le W_{\max}=(1+\beta)/\max(J_f,\,1-\beta)$, which follows from (S) and the Jacobian floor rather than being independent.

Define the signed envelope constant

$$
K_{\mathrm{sgn}} \;=\; m\,\kappa\,W_{\max}\,(1+\beta)^2\left(\frac14+\frac{2}{\gamma_{\mathrm{op}}^2}\right),
$$

and, for comparison, the isotropic constant $K_{\mathrm{iso}}=5m\kappa W_{\max}(1+\beta)^2/\gamma^2$ of the unsigned remark after Lemma 4, where $\gamma$ is the all-pair separation floor. The margin hypothesis at $T_0$ is

$$
\textbf{(H)}\qquad
v_0:=\dot R(T_0)>0,
\qquad
v_0^2 \;>\; \frac{2K_{\mathrm{sgn}}}{R(T_0)} .
$$

## Lemma 1 - Reduced-Radius Identity and Centrifugal Sign

On the channel **(C)**, for any site $\ell$ with $\mathbf x=\mathbf X_\ell$, $\mathbf v=\dot{\mathbf X}_\ell$, $\mathbf a=\ddot{\mathbf X}_\ell$, and $R=\|\mathbf x\|>0$,

$$
\ddot R
=\hat{\mathbf x}\cdot\mathbf a+\frac{\|\mathbf v_\perp\|^2}{R},
\qquad
\mathbf v_\perp=\mathbf v-(\hat{\mathbf x}\cdot\mathbf v)\,\hat{\mathbf x},
$$

hence $\ddot R\ge\hat{\mathbf x}\cdot\mathbf a\ge-\|\mathbf a\|$.

*Proof.* $\dot R=\hat{\mathbf x}\cdot\mathbf v$. Differentiating, $\ddot R=(\|\mathbf v\|^2+\mathbf x\cdot\mathbf a)/R-(\mathbf x\cdot\mathbf v)^2/R^3=\hat{\mathbf x}\cdot\mathbf a+(\|\mathbf v\|^2-(\hat{\mathbf x}\cdot\mathbf v)^2)/R$, and $\|\mathbf v\|^2-(\hat{\mathbf x}\cdot\mathbf v)^2=\|\mathbf v_\perp\|^2\ge0$. $\blacksquare$

The transverse term is nonnegative and is discarded in the certificate, which is the precise sense in which angular momentum can only help escape on this channel.

## Lemma 2 - Causal-Root Distance Floor

Let $t_r$ be a causal root for receiver $\ell$ at reception time $T$ with source $\ell'$, so the root distance is $d=\|\mathbf X_\ell(T)-\mathbf X_{\ell'}(t_r)\|=c_f(T-t_r)$. If the source path satisfies the speed cap $\|\dot{\mathbf X}_{\ell'}\|\le\beta c_f$ on $[t_r,T]$ and the current separation satisfies $\|\mathbf X_\ell(T)-\mathbf X_{\ell'}(T)\|\ge D$, then

$$
d\;\ge\;\frac{D}{1+\beta}.
$$

*Proof.* By the triangle inequality and the speed cap,
$D\le\|\mathbf X_\ell(T)-\mathbf X_{\ell'}(t_r)\|+\|\mathbf X_{\ell'}(t_r)-\mathbf X_{\ell'}(T)\|\le d+\beta c_f(T-t_r)=d+\beta d=(1+\beta)\,d$. $\blacksquare$

The bound holds for prehistory roots as well: hold-window speeds are $0$ (stationary hold) or $f_v c_f$ (rotating hold), both $\le\beta c_f$ once $\beta\ge f_v$, and the speed cap controls the path displacement across the `kick-at-release` velocity jump because the position path remains Lipschitz with constant $\beta c_f$. Memory-depth monotonicity of $R$ is not used.

## Lemma 3 - Branch-Weight Cap

Under (S) at the reception and emission events, and with the sign-preserving Jacobian floor $J_f$,

$$
W=\left|\frac{c_f-\mathbf v_{\mathrm{rec}}\cdot\hat{\mathbf d}}{\operatorname{floor}(c_f-\mathbf v_{\mathrm{src}}\cdot\hat{\mathbf d})}\right|
\;\le\;\frac{(1+\beta)}{\max(J_f,\,1-\beta)}\;=:\;W_{\max}.
$$

*Proof.* The numerator obeys $|c_f-\mathbf v_{\mathrm{rec}}\cdot\hat{\mathbf d}|\le(1+\beta)c_f$. Under (S) the raw denominator satisfies $c_f-\mathbf v_{\mathrm{src}}\cdot\hat{\mathbf d}\ge(1-\beta)c_f>0$, and the sign-preserving floor can only raise its magnitude to at least $J_f c_f$, so the denominator magnitude is at least $\max(J_f,1-\beta)\,c_f$. $\blacksquare$

## Lemma A - Channel Separation Floor

On $\operatorname{Fix}(C_3\times\langle\iota\rangle)$ — hence also on its subset $\operatorname{Fix}(S_3\times\langle\iota\rangle)$ — at every time $t$: the antipodal-pair separation equals $2R(t)$ exactly, and every opposite-polarity non-antipodal separation satisfies

$$
\|\mathbf X_{\epsilon_{+,i}}(t)-\mathbf X_{\epsilon_{-,j}}(t)\|
=\sqrt{4\|\mathbf x_\parallel\|^2+\|\mathbf x_\perp\|^2}
\;\ge\;R(t),
\qquad i\ne j,
$$

where $\mathbf x_\parallel$ and $\mathbf x_\perp$ are the components of $\mathbf x=\mathbf X_{\epsilon_{+,i}}(t)$ parallel and perpendicular to the spin axis $\hat{\mathbf n}$. Equality holds exactly on planar configurations ($\mathbf x_\parallel=0$). So (D$_{\mathrm{op}}$) holds unconditionally with $\gamma_{\mathrm{op}}=1$.

*Proof.* On the channel, $\mathbf X_{\epsilon_{+,j}}=\varrho^k\mathbf x$ for $k\in\{1,2\}$ with $M_\varrho=\operatorname{Rot}(\hat{\mathbf n},2\pi/3)$, and $\mathbf X_{\epsilon_{-,j}}=-\varrho^k\mathbf x$ by $\iota$-invariance, so the separation is $\|\mathbf x+\varrho^k\mathbf x\|$. Split $\mathbf x=\mathbf x_\parallel+\mathbf x_\perp$: the rotation fixes $\mathbf x_\parallel$ and rotates $\mathbf x_\perp$ by $\pm2\pi/3$, so $\|\mathbf x_\perp+\varrho^k\mathbf x_\perp\|^2=2\|\mathbf x_\perp\|^2(1+\cos\tfrac{2\pi}{3})=\|\mathbf x_\perp\|^2$, and by orthogonality $\|\mathbf x+\varrho^k\mathbf x\|^2=4\|\mathbf x_\parallel\|^2+\|\mathbf x_\perp\|^2\ge\|\mathbf x_\parallel\|^2+\|\mathbf x_\perp\|^2=R^2$. The antipodal statement is $\|\mathbf x-(-\mathbf x)\|=2R$. $\blacksquare$

Same-polarity separations $\|\mathbf x-\varrho^k\mathbf x\|=\sqrt{3\|\mathbf x_\perp\|^2}$ carry no floor — they vanish on axis-degenerate configurations ($\mathbf x_\perp\to0$). The signed envelope below makes this harmless.

## Lemma 4 - Signed Delayed Inward-Force Envelope

Under **(C)**, **(WP)**, (S), (D$_{\mathrm{op}}$), (M), (W), and (P), at any reception time $T\ge T_0$ such that $R$ is nondecreasing on $[T_0,T]$, every site satisfies

$$
\ddot R(T)\;\ge\;-\frac{K_{\mathrm{sgn}}}{R(T)^2},
\qquad
K_{\mathrm{sgn}}=m\,\kappa\,W_{\max}\,(1+\beta)^2\left(\frac14+\frac{2}{\gamma_{\mathrm{op}}^2}\right).
$$

*Proof.* Fix receiver $\ell$ at $\mathbf x=\mathbf X_\ell(T)$, $R=R(T)$, and group its five partners by polarity.

*Same-polarity partners (two rows, discarded by sign).* For a same-polarity source the polarity product is $+1$ and the root term's radial component is
$+\kappa W\,(R-\hat{\mathbf x}\cdot\mathbf X_{\mathrm{src}}(t_r))/(d^2+\varepsilon^2)^{3/2}$.
Since $\hat{\mathbf x}\cdot\mathbf X_{\mathrm{src}}(t_r)\le\|\mathbf X_{\mathrm{src}}(t_r)\|=R(t_r)$, and $R(t_r)\le R(T)$ — by (P) when $t_r\le T_0$ and by the assumed monotonicity on $[T_0,T]$ when $t_r\in[T_0,T]$ — the radial component is nonnegative. Same-polarity rows therefore cannot contribute inward reduced-radius acceleration and are discarded, regardless of how small the same-polarity separations become.

*Antipodal partner (one row).* Its current separation is exactly $2R$ by Lemma A, so Lemma 2 gives root distance $d\ge2R/(1+\beta)$; with at most $m$ roots and $\kappa Wd/(d^2+\varepsilon^2)^{3/2}\le\kappa W_{\max}/d^2$, its inward radial contribution is at most $m\kappa W_{\max}(1+\beta)^2/(4R^2)$.

*Opposite-polarity non-antipodal partners (two rows).* Their current separations are at least $\gamma_{\mathrm{op}}R$ by (D$_{\mathrm{op}}$) (with $\gamma_{\mathrm{op}}=1$ available unconditionally by Lemma A), so Lemma 2 gives $d\ge\gamma_{\mathrm{op}}R/(1+\beta)$ and each contributes inward at most $m\kappa W_{\max}(1+\beta)^2/(\gamma_{\mathrm{op}}^2R^2)$.

Summing the three opposite-polarity rows and applying Lemma 1 (the transverse term is nonnegative and the optional acceleration cap only rescales the total toward zero) gives $\ddot R(T)\ge-K_{\mathrm{sgn}}/R(T)^2$. $\blacksquare$

**Isotropic remark.** Without (P) and without in-window monotonicity, but with an all-pair separation floor $\min_{\ell\ne\ell'}\|\mathbf X_\ell(T)-\mathbf X_{\ell'}(T)\|\ge\gamma R(T)$, the unsigned bound $\|\mathbf A_\ell\|\le K_{\mathrm{iso}}/R^2$ with $K_{\mathrm{iso}}=5m\kappa W_{\max}(1+\beta)^2/\gamma^2$ follows by the same per-root estimate applied to all five partners. The signed form is strictly stronger in the regimes that matter: on the reference geometry ($\gamma=\gamma_{\mathrm{op}}=\sqrt2$) it is smaller by the factor $\gamma^2(\tfrac14+\tfrac2{\gamma_{\mathrm{op}}^2})/5=\tfrac12$, and when same-polarity sites approach each other ($\gamma\to0$, as in the recorded `vt000` close pass with $\gamma_{\mathrm{same}}\approx3.5\times10^{-3}$) the isotropic constant diverges while $K_{\mathrm{sgn}}$ is unaffected.

## Lemma 5 - Causal-Root Uniqueness and Transversality Under Sub-Field Speed

Fix receiver $\ell$, source $\ell'$, and reception time $T$, and define the causal residual on the retained window,

$$
\varphi_T(s)=\|\mathbf X_\ell(T)-\mathbf X_{\ell'}(s)\|-c_f(T-s),
\qquad s\in[-h,T],
$$

whose zeros are the retained causal roots. If the source path obeys the (S) speed cap $\|\dot{\mathbf X}_{\ell'}\|\le\beta c_f$ with $\beta<1$ on $[-h,T]$, then:

1. $\varphi_T$ is strictly increasing with rate at least $(1-\beta)c_f$: for $-h\le s_1<s_2\le T$,
$\varphi_T(s_2)-\varphi_T(s_1)\ge-\|\mathbf X_{\ell'}(s_2)-\mathbf X_{\ell'}(s_1)\|+c_f(s_2-s_1)\ge(1-\beta)c_f\,(s_2-s_1)>0$,
by the reverse triangle inequality and the Lipschitz speed cap. Hence the directed pair retains **at most one** causal root — no root bifurcation, fold, or extra branch can exist while (S) holds. No separation hypothesis, monotone or otherwise, is used.
2. At a root $t_r$ with root distance $d>0$, $\varphi_T$ is differentiable and $\varphi_T'(t_r)=c_f-\hat{\mathbf d}\cdot\dot{\mathbf X}_{\ell'}(t_r)\ge(1-\beta)c_f$, so the source-normal Jacobian satisfies $(c_f-\mathbf v_{\mathrm{src}}\cdot\hat{\mathbf d})/c_f\ge1-\beta>0$: every retained root is transversal with sign-definite margin, above any declared floor $J_f\le1-\beta$, and the sign-preserving floor is inactive.
3. The root map is regular: with $F(T,s)=\varphi_T(s)$, $\partial F/\partial T=\hat{\mathbf d}\cdot\dot{\mathbf X}_\ell(T)-c_f\in[-(1+\beta)c_f,-(1-\beta)c_f]$ and $\partial F/\partial s\in[(1-\beta)c_f,(1+\beta)c_f]$, so by the implicit function theorem $t_r(T)$ is locally Lipschitz with
$\dfrac{dt_r}{dT}=-\dfrac{\partial F/\partial T}{\partial F/\partial s}\in\left[\dfrac{1-\beta}{1+\beta},\,\dfrac{1+\beta}{1-\beta}\right]>0$:
the root time advances strictly and monotonically with reception time. This discharges the root-transversality and root-map-regularity parts of **(WP)** under (S). $\blacksquare$

## Lemma 6 - Root-Coverage Persistence

For the same directed pair, let $g(T)=\varphi_T(-h)=\|\mathbf X_\ell(T)-\mathbf X_{\ell'}(-h)\|-c_f(T+h)$. Under the receiver-side (S) cap, $g$ is strictly decreasing with rate at least $(1-\beta)c_f$: for $T_1<T_2$, $g(T_2)-g(T_1)\le\|\mathbf X_\ell(T_2)-\mathbf X_\ell(T_1)\|-c_f(T_2-T_1)\le-(1-\beta)c_f(T_2-T_1)$. Hence if the pair has a retained root at some reception time $T_1$ — equivalently $g(T_1)\le0$, the checkable window-depth seed $c_f(T_1+h)\ge\|\mathbf X_\ell(T_1)-\mathbf X_{\ell'}(-h)\|$ — then $g(T)<0$ strictly for every $T>T_1$, and since $\varphi_T(T)$ equals the current pair separation, which is positive whenever the pair is non-coincident, the continuous strictly increasing $\varphi_T$ has **exactly one** zero, interior to the window, with strictly positive delay. Coverage, once seeded, persists for as long as (S) holds. $\blacksquare$

## Theorem M - Root-Count Persistence: (M) Discharged With $m=1$

Assume (S) holds on the retained window through reception time $t$, every directed pair had a retained root at $T_0$ (recorded as zero missing roots at $T_0$), and no two sites coincide on $[T_0,t]$ (supplied for opposite-polarity pairs by Lemma A; same-polarity coincidence is excluded on the channel whenever $\mathbf x_\perp\ne0$). Then every directed pair retains **exactly one** transversal causal root at every reception time in $[T_0,t]$. Consequently hypothesis (M) holds with $m=1$ as a theorem rather than a monitored cap, the envelope constant tightens to

$$
K_{\mathrm{sgn}}=\kappa\,W_{\max}\,(1+\beta)^2\left(\frac14+\frac{2}{\gamma_{\mathrm{op}}^2}\right),
$$

and the hypothesis-persistence burden of the certificate reduces to (S) alone: (D$_{\mathrm{op}}$) persists with the channel at $\gamma_{\mathrm{op}}=1$ by Lemma A, and (M) persists under (S) by Lemmas 5-6.

*Proof.* Uniqueness and transversality at each reception time are Lemma 5; existence from the $T_0$ seed is Lemma 6; the count is therefore exactly one throughout $[T_0,t]$. $\blacksquare$

The goal's anticipated monotone-separation condition is unnecessary: strict monotonicity of the causal residual in the emission time is forced by the sub-field speed cap alone, so root bifurcation is impossible anywhere in the sub-field regime, not merely on outward windows. Conversely, once (S) fails the protection lapses — a source segment at or above $c_f$ can fold the residual and spawn multiple roots — so any recorded multi-root or missing-root event while speeds are sub-field is a runner or root-selection defect, not a physical signal, in the same audit class as $\operatorname{Fix}(G)$ drift.

## Theorem - Delayed Escape Certificate

Assume **(C)**, **(WP)**, that **(P)** holds on the recorded history at $T_0$, and that every directed pair has a retained root at $T_0$. Let $t_{\mathrm{viol}}\in(T_0,\infty]$ be the first time after $T_0$ at which (S) fails or (D$_{\mathrm{op}}$) fails at its declared level (with $t_{\mathrm{viol}}=\infty$ if neither ever fails); (M) needs no monitoring — by Theorem M it holds with $m=1$ throughout $[T_0,t_{\mathrm{viol}})$. If the margin hypothesis **(H)** holds at $T_0$, then

$$
\dot R(t)\;\ge\;\sqrt{v_0^2-\frac{2K_{\mathrm{sgn}}}{R(T_0)}}\;>\;0
\qquad\text{for all }t\in[T_0,\,t_{\mathrm{viol}}),
$$

so no return turn occurs on $[T_0,t_{\mathrm{viol}})$. If $t_{\mathrm{viol}}=\infty$, then additionally $R(t)\ge R(T_0)+(t-T_0)\sqrt{v_0^2-2K_{\mathrm{sgn}}/R(T_0)}\to\infty$ and no return turn ever occurs. Equivalently: a return turn cannot be the first event; any return turn must be preceded by a violation of a declared hypothesis.

*Proof.* Let $t_1=\sup\{t\in(T_0,t_{\mathrm{viol}}):\dot R>0\text{ on }[T_0,t)\}$; $t_1>T_0$ since $v_0>0$ and $\dot R$ is continuous. On $[T_0,t_1)$ all hypotheses hold and $R$ is increasing, so the monotonicity precondition of Lemma 4 is met and $\ddot R\ge-K_{\mathrm{sgn}}/R^2$ almost everywhere. Since $\dot R>0$ there,

$$
\tfrac{d}{dt}\!\left(\tfrac12\dot R^2\right)=\dot R\,\ddot R\;\ge\;-\frac{K_{\mathrm{sgn}}\dot R}{R^2}=\tfrac{d}{dt}\!\left(\frac{K_{\mathrm{sgn}}}{R}\right)
\quad\text{a.e.},
$$

and both sides are integrable on compact subintervals by **(WP)**, so for $t\in[T_0,t_1)$

$$
\dot R(t)^2\;\ge\;v_0^2+\frac{2K_{\mathrm{sgn}}}{R(t)}-\frac{2K_{\mathrm{sgn}}}{R(T_0)}\;>\;v_0^2-\frac{2K_{\mathrm{sgn}}}{R(T_0)}\;>\;0 .
$$

If $t_1<t_{\mathrm{viol}}$, continuity forces $\dot R(t_1)=0$, contradicting the uniform positive lower bound. Hence $t_1\ge t_{\mathrm{viol}}$ and the displayed bound holds on $[T_0,t_{\mathrm{viol}})$. When $t_{\mathrm{viol}}=\infty$, integrating $\dot R\ge\sqrt{v_0^2-2K_{\mathrm{sgn}}/R(T_0)}$ gives the linear lower bound and $R\to\infty$. $\blacksquare$

Under the isotropic remark's stronger all-pair floor and without (P), the same argument runs verbatim with $K_{\mathrm{iso}}$ in place of $K_{\mathrm{sgn}}$; the signed form is the sharper certificate wherever both apply.

## Corollary - Axis-Neutral Rotating Release Strengthening

The certificate hypotheses and conclusion are identical for the zero-angular-momentum $S_3\times\langle\iota\rangle$ channel and the axis-neutral rotating $C_3\times\langle\iota\rangle$ channel, in both `kick-at-release` and `moving-prehistory` forms. In particular the no-return theorem strengthens from zero-angular-momentum release to axis-neutral rotating release under partner-wake-only assumptions.

*Proof.* Lemma 1 discards the nonnegative transverse term $\|\mathbf v_\perp\|^2/R$, so axis-neutral rigid rotation — which enters the reduced dynamics only through $\mathbf v_\perp$ and through the source-path histories — cannot lower the $\ddot R$ envelope below $-K_{\mathrm{sgn}}/R^2$; Lemma 2 holds for rotating prehistory paths because they obey the same speed cap; Lemma A and the polarity grouping of Lemma 4 are properties of the $\iota$- and $C_3$-invariant configuration, not of the release; Lemma 3 and the Theorem use no other property of the release. The common-radius structure required by Lemma 1 is supplied on the rotating channel by the staged six-point lemma's $C_3\times\langle\iota\rangle$ reduction. $\blacksquare$

**Anti-damping remark.** The known tangential anti-damping pump (certified band $2.881\,\beta\le\Phi_{\mathrm{tan}}(\beta)\le2.925\,\beta$ on $\beta\in[0.02,0.985]$, Interval Certification Home section below; third-chart consilience in the work log) is transverse: it feeds $\|\mathbf v_\perp\|^2$, whose sign is favorable for escape in Lemma 1. Its threat is exclusively to hypothesis (S) — it drives speeds toward $c_f$ — which is a monitored failure event, not a return channel. This incorporates the anti-damping driving term into the certificate with the correct sign discipline: it can end certification, it cannot produce a return turn while certification is in force.

## What the Theorem Does Not Claim

1. It does not prove that (S) persists; persistence of (S) is the sole remaining open hypothesis, and a finite recorded row can never establish the $t_{\mathrm{viol}}=\infty$ branch by itself. (D$_{\mathrm{op}}$) at its unconditional level $\gamma_{\mathrm{op}}=1$ persists by Lemma A as long as the channel hypothesis **(C)** persists, and (M) persists under (S) by Theorem M.
2. It does not claim a retained branch, accepted evidence, stability transverse to the invariant channel, or observer export.
3. It does not apply after a field-speed crossing: once (S) fails the certificate window is closed and only the ordering statement (return turn cannot precede first violation) survives.
4. It does not import any frozen-octahedral chart quantity; $K_{\mathrm{sgn}}$ and $K_{\mathrm{iso}}$ are built only from declared caps and the row's own coupling, floor, and softening.

## Executable Witness Consumption - 2026-07-07 Rows

The owner checker evaluates, per recorded row: admissible certificate times $T_0$ (samples with $\dot R(T_0)>0$ before the first recorded hypothesis violation), the window caps $\beta$, $\gamma$, $\gamma_{\mathrm{op}}$, $m$, the past-radius cap (P), the measured branch-weight maximum against $W_{\max}$, both envelope constants $K_{\mathrm{sgn}}$ and $K_{\mathrm{iso}}$, both margins, the sharpening ratio, and the ordering witness (no return turn inside any hypothesis-valid margin window).

Witness summary across the eleven 2026-07-07 rows (`vt000` control plus the ten declared axis-neutral rows in both prehistory modes), checker outputs recorded alongside each row's run directory:

- Every row is fail-closed for certification: `eternalNoReturnCertificate=false` with the persistence blocker, `windowCertificateGranted=false` in all eleven rows. The compression-first rows (`vt000`, both `vt025` rows, `vt050-kick`) admit no certificate time at frame resolution — $\dot R\le0$ at every recorded sample before the (S) violation. The rows with admissible times ($3$ to $26$ candidates each, all satisfying (P)) still fail the margin inequality: $v_0^2\le2.5\times10^{-2}$ against the signed requirement $2K_{\mathrm{sgn}}/R_0\in[4.0\times10^2,\,5.7\times10^2]$ (signed deficits $-402$ to $-565$).
- The signed envelope closes half the requirement: $K_{\mathrm{sgn}}/K_{\mathrm{iso}}\in[0.466,\,0.498]$ across the seven rows with admissible candidates (isotropic requirements $2K_{\mathrm{iso}}/R_0\in[8.1\times10^2,\,1.2\times10^3]$ reduce to the signed values above; deficit closed by $50.2\%$-$53.4\%$ per row). The measured window floors are $\gamma_{\mathrm{op}}=\gamma\in[1.15,\,1.40]$ — inside the certified windows the all-pair minimum is the opposite-polarity minimum, so the entire gain comes from the polarity resolution ($5/\gamma^2\to\tfrac14+2/\gamma_{\mathrm{op}}^2$), not from a floor change. The remaining deficit is dominated by $W_{\max}=(1+\beta)/\max(J_f,1-\beta)\approx40$ as $\beta\to1$ near the crossing at $J_f=0.05$, which no separation-side sharpening removes.
- Lemma A's channel floor is witnessed tight: the full-record opposite-polarity minimum is $\gamma_{\mathrm{op}}\ge1.0000$ in all eleven rows, with the equality value attained as trajectories traverse the planar configuration; and the `vt000` control's same-polarity close pass reaches $\gamma_{\mathrm{same}}\approx3.5\times10^{-3}$, where $K_{\mathrm{iso}}$ diverges but $K_{\mathrm{sgn}}$ is unaffected — the qualitative robustness gain of the signed form.
- Every row violates (S) at its recorded field-speed crossing ($t=0.14$ to $t=0.73$).
- The ordering statement of the Theorem is witnessed consistently in all eleven rows: no return turn sits inside any hypothesis-valid margin window (no window certifies, and the one recorded early outward-to-inward turn family — the marginal `vt050` turns — has no margin-satisfying $T_0$ candidate preceding it, as the Theorem requires).
- Measured branch-weight maxima sit inside the Lemma 3 cap $W_{\max}$ in every row with admissible candidates.
- Theorem M is witnessed beyond its guarantee zone: every one of the eleven rows records `maxRootsPerDirectedPair = 1` and `missingRoots = 0` over the entire run — including the post-crossing segments where the uniqueness protection has lapsed — and `smallJacobianRoots = 0` throughout, consistent with the Lemma 5 transversality margin $1-\beta$ inside the sub-field windows. The checker therefore consumes $m=1$ with provenance `theorem_M_confirmed_by_record`; a recorded multi-root or missing-root event inside a sub-field window would be flagged as a runner audit failure per Lemma 5.
- The corollary's sign discipline is witnessed: the rotating rows (`vt080`-`vt099`) never compress, and increasing $f_v$ advances the (S) violation time in the kick family, exactly the anti-damping/energy-injection channel the remark names.

Certification with positive margin is expected only for rows with weaker effective coupling, larger release radius, or sea-screened kernels; those are downstream consumers (`sh0sea_dipole_wake_sum`, sea-stabilized rows), and this packet's checker is the object they should call. At the unconditional channel floor $\gamma_{\mathrm{op}}=1$ the signed margin requirement scales as $2K_{\mathrm{sgn}}/R_0=4.5\,m\kappa W_{\max}(1+\beta)^2/R_0$, so at moderate $\beta\lesssim0.5$ (where $W_{\max}=3$) the requirement drops to $O(30\kappa/R_0)$ — certifiable margins become reachable for effective couplings $\kappa_{\mathrm{eff}}\lesssim v_0^2R_0/30$ rather than $v_0^2R_0/60$ under the isotropic form.

## Interval Certification Home - Planar Tangential Screen

This packet is the home for the planar tangential anti-damping screen, upgraded 2026-07-07 from a sampled diagnostic to a certified inequality. The input was the first-hunt result of the [Axis-Neutral Rotating-Wave Spectrum Packet](axis-neutral-rotating-wave-spectrum-packet.md): tangential residual strictly positive at every sample over $\beta\in[0.02,0.985]$ with growth $\Phi_{\mathrm{tan}}\approx2.9\beta$, evaluated by [axis-neutral-rotating-wave-residual-scan.mjs](../../../scripts/braid-ideal/axis-neutral-rotating-wave-residual-scan.mjs) on the exact planar rotating channel with the declared kernel row ($c_f=1$, $\kappa=1$, zero softening, receiver-normal over source-normal branch weight as implemented — the scan applies no Jacobian floor, and the certificate proves a $J_f=0.05$ floor would never engage on the certified interval, so floored and unfloored kernels coincide there; partner-wake only).

**Certified statement (executed 2026-07-07).** By [planar-tangential-screen-interval-certificate.mjs](../../../scripts/braid-ideal/planar-tangential-screen-interval-certificate.mjs) (tests in [braid-ideal-planar-tangential-screen-interval-certificate.test.js](../../../tests/braid-ideal-planar-tangential-screen-interval-certificate.test.js)), with $c_1=2.881$ and $c_2=2.925$,

$$
c_1\,\beta\;\le\;\Phi_{\mathrm{tan}}(\beta)\;\le\;c_2\,\beta
\qquad\text{for all }\beta\in[0.02,\,0.985],
$$

together with the certified radial sign $\Phi_{\mathrm{rad}}(\beta)\le-0.672$ and the certified source-normal floor $c_f-\mathbf v_{\mathrm{src}}\cdot\hat{\mathbf d}\ge0.693\,c_f$ on the same interval. The computed conservative constants are $c_1=2.8814$, $c_2=2.9242$ (10330 accepted boxes at relative enclosure tolerance $0.004$, zero unresolved boxes); the recorded values above are rounded outward. Claim level: rigorous interval certificate conditional on the declared rounding model — every interval operation widened outward by $10^{-13}$ relative, sin/cos results widened by an additional $10^{-12}$ absolute and clamped to $[-1,1]$, which exceeds faithful-libm error bounds on the argument range by more than two orders of magnitude; no other numerical assumption is made.

How the burdens were discharged:

1. **Certified constant-lag enclosures (discharged).** Per directed pair, bisection with outward-rounded sign tests of the lag residual $G(s)=2\lvert\sin((\psi-\beta s)/2)\rvert-s$ from a certified bracket ($G>0$ near $0$, $G<0$ at $s=4$); indeterminate midpoints are contracted through the transversality bound $\lvert G'\rvert\ge1-\beta_{\mathrm{hi}}$ (the same $c_f(1-\beta)$ mechanism as (WP)/A3 and Lemma 5), which pins the lag inside $[m+G_{\mathrm{lo}}/(1-\beta_{\mathrm{hi}}),\,m+G_{\mathrm{hi}}/(1-\beta_{\mathrm{hi}})]$.
2. **Certified root-count completeness (discharged in this packet).** By Lemma 5 and Theorem M, on the sub-field-speed channel each directed pair has exactly one transversal causal root with residual-derivative floor $(1-\beta)c_f$, so the root-topology class is pinned at $m=1$ and no unenclosed root can contribute to the sum.
3. **Outward-rounded residual evaluation (discharged).** $\Phi_{\mathrm{tan}}$ and $\Phi_{\mathrm{rad}}$ are evaluated term by term in vector form over the enclosed lags with the outward-rounded interval arithmetic above, mirroring the sampled scan's kernel rows exactly; interval positivity of the source-normal denominator is verified per box before division.
4. **Finite subdivision with endpoint discipline (discharged).** Adaptive subdivision of $[0.02,0.985]$; a box is accepted only when the tangential enclosure is strictly positive, the radial enclosure is strictly negative, and the tangential enclosure width is below the declared relative tolerance; the certified object is the ratio band $c_1\le\Phi_{\mathrm{tan}}/\beta\le c_2$, not bare positivity.
5. **Same-record discipline (maintained).** Every constant comes from the declared kernel row; no cross-chart imports (in particular no frozen-octahedral ledger values), matching non-claim 4 above.

Consumption inside this certificate. The certified band upgrades the anti-damping remark's driving term from sampled to certified, and the routing is the dominate-or-exploit split with both branches sign-correct. Nothing in the radial envelope $-K_{\mathrm{sgn}}/R^2$ needs to dominate $\Phi_{\mathrm{tan}}$: the pump is transverse and orthogonal to the radial projection in Lemma 1, which is the exploit branch, and it is exact. The domination question lives entirely in hypothesis (S), where the band now yields a certified clock:

**Certified-clock corollary (derivation, conditional on the transfer hypothesis).** On the rigid planar channel with radius $\rho$, the tangential kernel acceleration is $(\kappa/\rho^2)\,\Phi_{\mathrm{tan}}(\beta)$ and $\beta=v_t/c_f$, so on the certified interval

$$
\frac{d\beta}{dt}\;\ge\;\frac{c_1\,\kappa}{c_f\,\rho^2}\,\beta,
\qquad
\beta(t)\;\ge\;\beta_0\,e^{\,c_1\kappa\,(t-t_0)/(c_f\rho^2)},
$$

so the pumped rigid channel reaches the certified ceiling $\beta=0.985$ from any $\beta_0\ge0.02$ within

$$
\Delta t\;\le\;\frac{c_f\,\rho^2}{c_1\,\kappa}\,\ln\!\frac{0.985}{\beta_0}\;\le\;1.353\,\frac{c_f\,\rho^2}{\kappa}.
$$

Under the transfer hypothesis — that the screen residual tracks the tangential wake force on near-channel released rows (hypothesis: the screen is evaluated on the rigid ansatz, released rows deviate from it) — an isolated rigid rotating row cannot keep (S) beyond this bound unless an internal or environmental absorber (breathing exchange, hinge clicks, Noether sea response; see `internal_tangent_authority_derivation`) removes the pumped tangential action: (S)-failure is now a certified clock, not a sampled trend. Whether released non-rigid rows inherit the clock — forcing $t_{\mathrm{viol}}<\infty$ for the isolated rotating channel without an absorber — remains labeled speculation pending the persistence obligation below.

No new validator, schema, or gate was added: the certificate is a finite directed-rounding computation in the existing diagnostic script family, and its output — the constant pair $(c_1,c_2)$ with its $\beta$-interval and the certified radial and source-normal rows — is recorded here and consumed by the anti-damping remark and the persistence obligation.

## Remaining Obligations

1. Operator review of this packet.
2. Hypothesis-persistence lemma for the $t_{\mathrm{viol}}=\infty$ branch. (D$_{\mathrm{op}}$) at $\gamma_{\mathrm{op}}=1$ persists with the channel by Lemma A, and (M) persists under (S) by Theorem M, so the open persistence burden is (S) alone — exactly the anti-damping absorption question.
3. Further sharpening beyond the polarity-resolved envelope: the remaining slack is the norm bound on the three opposite-polarity rows and the uniform $(1+\beta)$ delay factor; an exact signed pair-field evaluation on the reference geometry, or a delay-resolved treatment of the antipodal row, could tighten $K_{\mathrm{sgn}}$ further. The dominant deficit driver in the recorded rows is however $W_{\max}\to(1+\beta)/J_f$ as $\beta\to1$, which no separation-side sharpening removes.
4. Rigid-to-released transfer lemma for the certified clock: bound the deviation of a released near-channel row's tangential wake force from the rigid-ansatz screen value, so the certified $(S)$-failure clock applies to released rows without the transfer hypothesis. Labeled speculation until a bounding route is named.

## Promotion Classification

- Corpus promotion: defer with blocker; candidate destinations after operator review are [Symmetric Shell Braid](../../../content/markdown/aaa/noether-braid/symmetric-shell-braid.md#isolated-release-and-the-return-response-question) (the certificate as the precise conditional form of the return-response question for isolated release) and [nested-shell-braid-dynamics](../../../content/markdown/aaa/noether-braid/nested-shell-braid-dynamics.md) as a theorem-target restatement without priority links.
- Priority status: conditional theorem proved at priority level with hypotheses checkable on sweep output rows; all eleven current witness rows fail-closed (no certified window); the signed envelope halves the margin requirement; the interval certification is executed with its band recorded; (S)-persistence — the anti-damping absorption question — is the sole open hypothesis burden, now carrying a certified clock on the rigid channel under the labeled transfer hypothesis.
- Next proofing consumers: the (S)-persistence and rigid-to-released transfer lemmas, and `sh0sea_dipole_wake_sum`, which should compare its computed sea response against this packet's margin inequality through the owner checker.
