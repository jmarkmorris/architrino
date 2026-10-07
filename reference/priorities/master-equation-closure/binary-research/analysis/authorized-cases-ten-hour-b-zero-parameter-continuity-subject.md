# Terminal-vector continuity at a hypothetical zero-speed parameter

**Subject disposition: a precise unresolved tail condition, not a continuity theorem or a discontinuity theorem.** Fix a hypothetical $\epsilon_*\in(0,2^{-200000}]$ in the original [compatible preparation family](authorized-cases-ten-hour-b-case.md) with $V_\infty(\epsilon_*)=0$. No such member is presumed to exist. The accepted estimates reduce continuity there to divergence of the original finite outgoing-tail entry radii of nearby positive-speed members. Finite-prefix continuity proves that their entry times diverge, but the cited results do not supply the required radius divergence or its equivalent uniform account-integral condition. This note freezes the subject reconstruction before access to the separately assigned reference. It changes no accepted summary.

All variables are those of the selected amplitude-gradient equation with $K=c_f=1$: $X_\pm(T)=\pm y_\epsilon(s)/(4\epsilon^2)$, $s=4\epsilon^3T$, $r=|y|$, $p=r'$, $h=y\times y'$, and $V_\infty=\epsilon v_\infty$. The fixed cutoff, compatible degree-five past, constant older tail and propagated seams are unchanged. The [all-future assessment](authorized-cases-ten-hour-reference-b-adjudication.md) supplies actual solutions and the zero/positive terminal dichotomy throughout the admitted range. The recently accepted [finite-prefix continuity argument](authorized-cases-ten-hour-b-positive-parameter-continuity-assessment.md) applies at every positive parameter, including the hypothetical zero-speed member: its finite-step proof does not require positive terminal speed.

## 1. Exact tail estimates give an equivalent condition

For each positive-speed parameter, let $s_t(\epsilon)$ be its original qualified outgoing-tail entry supplied by the accepted passage, and let $r_t=r(s_t)$. The [direct-release proof](authorized-cases-ten-hour-b-direct-release-candidate.md), as accepted by the quantitative assessment, gives

$$
r_t\mathcal E_t=128,\qquad r_tp_t^2\ge257,\qquad
r_t|y'_t|^2<259,\qquad |y''|\le16/r^2
$$

after that entry. Its radial bootstrap yields $p\ge p_t/\sqrt2$. Integrating the exact acceleration with this outgoing lower speed, or using the already accepted impulse estimate, gives

$$
|v_\infty-y'_t|\le\frac{32}{p_tr_t}<\frac2{\sqrt{r_t}}.
$$

The constant check is elementary: $\sqrt{259}<17$ and $\sqrt{257}>16$. The vector limit therefore obeys

$$
\frac{11}{\sqrt{r_t}}<|v_\infty|<\frac{19}{\sqrt{r_t}},
\qquad
\frac{11\epsilon}{\sqrt{r_t}}<|V_\infty(\epsilon)|<\frac{19\epsilon}{\sqrt{r_t}}.
\tag{1}
$$

For the lower bound, take the limit in $|y'|\ge p\ge p_t/\sqrt2$ and use $\sqrt{257/2}>11$. This uses the actual vector-limit theorem; radial growth alone would not suffice. The upper integral is checked by the exact control $\int_0^\infty C(R+mu)^{-2}du=C/(mR)$, $R,m>0$. It is an acceleration bound, not a physical energy premise.

Restrict to a relative compact parameter neighborhood $0<a\le\epsilon\le b$ around $\epsilon_*$. Equation (1) proves the exact criterion

$$
V_\infty(\epsilon)\longrightarrow0
\quad\Longleftrightarrow\quad
r_t(\epsilon)\longrightarrow\infty
\quad\text{along positive-speed parameters approaching }\epsilon_*.
\tag{2}
$$

Approaches through zero-speed parameters already have zero vector. If no positive parameters accumulate at $\epsilon_*$, continuity is immediate. Otherwise (2) is necessary and sufficient for continuity of the vector at the zero value, with no directional limit issue. Equivalently, $\mathcal E_t=128/r_t$ must tend to zero. A sequence of positive parameters with $r_t\le R<\infty$ would instead be a rigorous discontinuity witness, giving $|V_\infty|>11a/\sqrt R$; this note constructs no such sequence.

## 2. What finite-prefix continuity establishes

On the hypothetical zero branch, $\mathcal E_*(s)<0$ at every finite $s$. Indeed its derivative is strictly positive while the account tends to zero. For any fixed finite $S$, the complete finite-prefix $C^2$ dependence and continuity of the account formula make $\mathcal E_\epsilon<0$ on $[0,S]$ for all sufficiently close parameters. Every nearby positive member must therefore have its first account crossing, and hence its qualified outgoing entry, after $S$. Consequently

$$
s_t(\epsilon)\longrightarrow\infty.
\tag{3}
$$

This argument uses compact-prefix convergence, not continuity of a hitting-time map. Because $\epsilon_*>0$, normalized and physical finite times have nonsingular continuous scaling. It does not prove (2). The base has $r_*(s)\to\infty$, but convergence on each fixed time interval does not control the nearby radius at its moving, diverging entry time.

The recent positive-member continuity proof starts from a finite state with $rp^2>256$ and a complete incoming interval of controlled acceleration. No state of the hypothetical zero member satisfies this: its independently sharpened bound is $rp^2\le r|y'|^2<9/4$. Waiting longer cannot provide that proof's strict cone. Its openness and uniform-tail construction therefore cannot simply be reused at zero speed.

## 3. Equivalent missing account inequality

Before qualified tail entry the accepted parabolic/passage chart gives, with $\gamma_\epsilon=4\epsilon^3/3$,

$$
\frac34\frac{\gamma_\epsilon}{r_\epsilon^4}
\le\mathcal E_\epsilon'
\le\frac54\frac{\gamma_\epsilon}{r_\epsilon^4}.
\tag{4}
$$

These are the accepted relative-error bounds on the actual generated solution. They are not asserted after the entry. For fixed $S$ and sufficiently close positive parameters, (3) permits integration to $s_t$:

$$
\mathcal E_t(\epsilon)-\mathcal E_\epsilon(S)
=\int_S^{s_t(\epsilon)}\mathcal E_\epsilon'(u)\,du.
\tag{5}
$$

Since $\gamma_\epsilon$ has positive lower and finite upper bounds locally, (4)–(5), $\mathcal E_\epsilon(S)\to\mathcal E_*(S)$, and $\mathcal E_*(S)\to0$ show that (2) is equivalent to the uniform vanishing condition

$$
\lim_{S\to\infty}\ limsup_{\substack{\epsilon\to\epsilon_*\\|V_\infty(\epsilon)|>0}}
\int_S^{s_t(\epsilon)}r_\epsilon(u)^{-4}\,du=0.
\tag{6}
$$

For example, the upper direction follows from

$$
|V_\infty(\epsilon)|^2
<\frac{361}{128}\epsilon^2
\left\{|\mathcal E_\epsilon(S)|
+\frac54\gamma_\epsilon\int_S^{s_t(\epsilon)}r_\epsilon(u)^{-4}\,du\right\}.
$$

For the reverse direction, the lower inequality in (4) bounds that integral by $4[\mathcal E_t-\mathcal E_\epsilon(S)]/(3\gamma_\epsilon)$, and (1) makes $\mathcal E_t\to0$ under terminal continuity. Thus (6) is a precise missing tail inequality, not just a proposed sufficient norm bound. The zero-branch barrier provides a lower bound on its remaining account input; it supplies no uniform upper bound of the form (6) for nearby members.

## 4. Late turns and complete source windows

The corrected zero-branch proof confines the base to its parabolic/grazing chart and gives bounded $h$ and finite total angle. It does not establish a uniform no-return statement for neighboring positive members. The relevant obstruction is a nearby path which follows the base far out, spends a long time near an outer turn, then returns to a bounded radius before the qualified positive-tail entry. The accepted positive-account passage explicitly allows inward crossings and subsequent compact turns. Neither its existence theorem nor monotonicity of the mathematical account excludes this possibility. A spatial no-return theorem, or a direct proof of (6), would close the transfer; neither is among the cited conclusions.

As an analytical control on the tempting time-to-radius inference, the already used zero-parameter central comparison has $r=h^2/(1+e\cos\theta)$ and $ds/d\theta=r^2/h$. With fixed $h>0$ and $e\uparrow1$ from below, the outer radius diverges, the outward prefixes approach the parabolic control, and the return time diverges, but the later inner radius tends to $h^2/2$. Moreover its incoming half-cycle obeys

$$
\int_\pi^{2\pi}r^{-4}\,ds
=h^{-5}\int_\pi^{2\pi}(1+e\cos\theta)^2d\theta
=\frac\pi{h^5}\left(1+\frac{e^2}2\right)
\longrightarrow\frac{3\pi}{2h^5}>0.
$$

This exact elementary control shows why long delay and large excursion alone do not imply a small remaining account integral. It is not a solution or counterexample for the selected delayed preparation, and no comparison history replaces that preparation. A genuine discontinuity claim would still have to construct the actual returning parameter sequence and prove its source coverage.

The accepted finite-prefix proof retains the entire completed source history, comparing delayed accelerations at a common time before transporting the base acceleration by its bounded jerk. The clocks are increasing, so old source times do not re-enter. This is a temporal assertion, not monotonicity of spatial radius: newly generated histories may themselves return inward. The exact tail at $s_t$ uses its original complete incoming source interval, including any pre-entry portion. No uniform incoming-tail estimate at a large base reception can be inferred from endpoint state closeness alone. All complete-past and self/partner census hypotheses remain those of the admitted family.

Finally, the uniform speed refinements reopen the finite positive-entry chart under a *small terminal-speed hypothesis*. That conditional chart cannot be used here to prove the hypothesis that terminal speeds approach zero. Conversely, the base zero-branch chart cannot be silently imposed on all nearby positive futures. Either move would assume the requested conclusion.

## Frozen sources, boundary and falsifiers

Measured by scoped SHA-256 reads before this freeze, the case is `f71e4d62ac98f7de0ab0b958166b70a5e816e0945e1572fd07bbf84b695274cb`; direct-release subject `b413320fc2f358910e0205def7bb7e34d992148ccd477c0b670ad36c4304d38b`; quantitative acceptance `de94d663737d7d004cd2dcbf39f52ea0b4d23742f68d47eaf50de4e08dc071a5`; [corrected zero consumer](authorized-cases-ten-hour-b-zero-branch-phase-correction.md) `c94f90ea18d2ec09681a343c607757639053c50f402738552575d83bd84e0f8f`; its [acceptance](authorized-cases-ten-hour-reference-b-zero-branch-adjudication.md) `759c78b87e087ccfcbb6516d493a529949aea77ad769e70762dc57f4272dddb3`; [barrier acceptance](authorized-cases-ten-hour-reference-b-barrier-adjudication.md) `8c5cf0922254958a9360a575306dec1b403ed8c78f3ce6008aa60164e2820386`; finite-prefix/positive-continuity assessment `dd648379331ae43d8c5c3395ac50d6220242d37d335158aff7764abddf011c9d`; and its [separate cross-assessment](authorized-cases-ten-hour-b-positive-parameter-continuity-reference-assessment.md) `05f372b8dae931ba59e11ec13bc120bee181cd86713cc9d32e1f0c0797d87a4e`.

Derived result at this freeze is the equivalence (2), equivalently (6), and divergence of entry times (3), conditional only on a hypothetical zero member and the accepted premises. Continuity and discontinuity remain unresolved. A proof of uniform entry-radius divergence or (6) would remove this obstruction; an actual positive-parameter sequence with bounded entry radii would disprove continuity. Failure of the exact two-sided tail bounds, pre-entry account-rate interval, complete finite-prefix continuity or the local positive parameter lower bound would falsify the reduction itself. No zero member, new physical equation/history, smoother preparation, arbitrary-history extension, numerical target or scientific process was introduced. Only this disjoint subject file is new.
