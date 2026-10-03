# Independent adjudication of the slow binary comparison

**Date:** 2026-10-03. **Scope:** unchanged inverse-square Master Equation, complete supplied histories, ordinary positive-delay roots, no cap, receiver multiplier, root omission or event rule. **Disposition:** the local kernel, stated acceleration-dependent remainder, mirror-pair proxy identity and forced circular comparison are accepted by a separate reconstruction. The infinite-future fate claim is not established. A new [bounded secular theorem](slow-binary-controlled-secular-comparison.md) extends the comparison under explicit preparation and smallness assumptions.

This adjudication reconstructs the formulas from the [canonical per-hit acceleration](../../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration). It does not replay the EOM solver, a retained trajectory or the numerical table in the [subject](slow-binary-first-order-drift.md). The subject and its historical evidence remain unchanged. The assigned Germund Dahlquist role supplies an analytical lens, not acceptance authority. The new secular theorem is derived and self-reviewed; this adjudication does not independently review a theorem authored alongside it.

## The local root and row

At one reception time, let the present receiver–source displacement be $r\mathbf n_0$, with $r>0$ and $\|\mathbf n_0\|=1$. Write $\mathbf u=\mathbf V_j(T)/c_f$, $\Delta=T-S>0$, $\mathbf p=[\mathbf X_j(T)-\mathbf X_j(S)]/r$, and $\mathbf w=\mathbf V_j(S)/c_f$. Assume source speed at most $\epsilon c_f$ on the complete root interval, $\epsilon\le1/8$, and Lipschitz source velocity with acceleration bound $A$. Set $\eta=Ar/c_f^2$.

The causal condition, triangle inequality and integrated source velocity give

$$
\frac{r}{c_f(1+\epsilon)}\le\Delta\le\frac{r}{c_f(1-\epsilon)},\qquad
\|\mathbf p\|\le\frac{\epsilon}{1-\epsilon}
$$

The difference between source displacement and a constant present-velocity extrapolation is at most $A\Delta^2/2$. Also $|c_f\Delta/r-1|\le\epsilon/(1-\epsilon)$. Consequently

$$
\|\mathbf p-\mathbf u\|
\le\frac{\epsilon^2}{1-\epsilon}+\frac{\eta}{2(1-\epsilon)^2},\qquad
\|\mathbf w-\mathbf u\|\le\frac{\eta}{1-\epsilon}
$$

These estimates require acceleration small on the delay scale if the remainder is to be quadratic in speed. A finite acceleration bound by itself is insufficient.

The transmitter factor is positive because $\|\mathbf w\|<1$. With polarity sign $\sigma$ and coupling $K>0$, the exact row is $(\sigma K/r^2)G$, where

$$
G(\mathbf p,\mathbf w)
=\frac{\mathbf n_0+\mathbf p}
{\|\mathbf n_0+\mathbf p\|^3[1-\mathbf n(\mathbf p)\cdot\mathbf w]},\qquad
\mathbf n(\mathbf p)=\frac{\mathbf n_0+\mathbf p}{\|\mathbf n_0+\mathbf p\|}
$$

Differentiating the inverse-square direction and reciprocal transmitter factor at the origin separately gives

$$
DG(0,0)[\mathbf p,\mathbf w]
=(I-3\mathbf n_0\mathbf n_0^{\mathsf T})\mathbf p
+\mathbf n_0(\mathbf n_0\cdot\mathbf w)
$$

Substituting the common present velocity in these two slots yields the accepted coefficient

$$
\mathbf A^{(1)}
=\frac{\sigma K}{r^2}
\left[\mathbf n_0+\mathbf u-2(\mathbf n_0\cdot\mathbf u)\mathbf n_0\right]
$$

The coefficient combines source displacement and transmitter weighting. It is not a primitive receiver-velocity factor.

### An independently bounded Taylor remainder

Use the joint norm $\|(\mathbf p,\mathbf w)\|_* =\|\mathbf p\|+\|\mathbf w\|$. Along the segment from the origin, $\|\mathbf n_0+\mathbf p\|\ge6/7$, $1-\mathbf n\cdot\mathbf w\ge7/8$, and $\|(\mathbf p,\mathbf w)\|_*\le15\epsilon/7$. Put $H(\mathbf z)=\mathbf z/\|\mathbf z\|^3$ and $a=1-\mathbf n\cdot\mathbf w$.

Direct differentiation gives the bounds

$$
\|H\|\le(7/6)^2,\quad
\|DH\|\le2(7/6)^3,\quad
\|D^2H\|\le24(7/6)^4
$$

The direction map satisfies $\|D\mathbf n\|\le7/6$ and $\|D^2\mathbf n\|\le6(7/6)^2$. In the joint norm, $\|Da\|\le1$ and $\|D^2a\|\le3$: the latter follows by adding its source-displacement quadratic term and its two mixed terms. Thus

$$
\|D(a^{-1})\|\le(8/7)^2,\qquad
\|D^2(a^{-1})\|\le2(8/7)^3+3(8/7)^2
$$

The product rule for $G=H/a$ bounds its second derivative by less than $100$. Taylor's quadratic remainder is therefore at most $50(15\epsilon/7)^2$. Replacing the differential's arguments by $\mathbf u$ costs at most $2\|\mathbf p-\mathbf u\|+\|\mathbf w-\mathbf u\|$. Since

$$
50(15/7)^2+16/7<256,\qquad
64/49+8/7<256
$$

the retained bound is accepted:

$$
\|\mathbf A-\mathbf A^{(1)}\|
\le256\frac K{r^2}(\epsilon^2+\eta)
$$

The numerical constant is conservative. Its validity does not establish that it is useful at a particular recorded speed. The slow secular proof below independently closes $\eta=O(\epsilon^2)$ on its own future tube.

## The mirror-pair proxy

Let the members have opposite polarity and mirrored positions $\mathbf X_\pm=\pm\mathbf x(T)$. Define member radius $\rho=\|\mathbf x\|$, present separation $r=2\rho$, unit radial direction $\mathbf e=\mathbf x/\rho$, member velocity $\mathbf v=\dot{\mathbf x}$, radial speed $v_r=\mathbf e\cdot\mathbf v$, and transverse velocity $\mathbf v_\perp=\mathbf v-v_r\mathbf e$. The opposite source's present velocity is $-\mathbf v$.

The accepted local row therefore gives

$$
\mathbf A_+=-\frac K{r^2}\mathbf e
+\frac K{r^2c_f}(\mathbf v-2v_r\mathbf e)+\mathbf R_A
$$

For the per-member comparison scalar $\mathcal E_0=\|\mathbf v\|^2/2-K/(2r)$, the identity $\dot r=2v_r$ cancels the zeroth-order radial work. The result is

$$
\dot{\mathcal E}_0
=\frac K{r^2c_f}(\|\mathbf v_\perp\|^2-v_r^2)+\mathbf v\cdot\mathbf R_A,\qquad
|\mathbf v\cdot\mathbf R_A|
\le256\frac{K\|\mathbf v\|}{r^2}
\left(\epsilon^2+\frac{Ar}{c_f^2}\right)
$$

This independently accepts the [Q&R proxy comparison](../../analysis/research-alternatives-assessment-2026-10-03.md#a-bounded-mirror-pair-comparison). Tangential gain and radial loss have the stated leading signs where the remainder is smaller. The scalar has units of squared speed and is not a derived physical total-energy account. A complete uniformly subfield history excludes ordinary self roots by the chord-speed bound; that exclusion must be stated rather than implemented by deleting an active channel.

## The forced circular comparison

The zero-delay comparison circle has member radius $R$, speed $v$ and angular rate $\omega=v/R$, with $v^2=K/(4R)$. Its first delayed correction is forward, of magnitude $f=v^3/(Rc_f)$. Write the radial and angular changes as $\rho_1$ and $\psi_1$, with zero initial changes and derivatives. Differentiating polar acceleration and the inverse-square radial row gives

$$
\rho_1''-3\omega^2\rho_1-2R\omega\psi_1'=0,\qquad
R\psi_1''+2\omega\rho_1'=f
$$

The second equation integrates to $R\psi_1'+2\omega\rho_1=fT$. Substitution in the first gives $\rho_1''+\omega^2\rho_1=2\omega fT$, so

$$
\rho_1=\frac{2f}{\omega^2}(\omega T-\sin\omega T),\qquad
\rho_1'=\frac{2f}{\omega}(1-\cos\omega T),\qquad
\delta\|\mathbf V\|=-fT+\frac{2f}{\omega}\sin\omega T
$$

The maximum-speed and completed-revolution formulas in the corrected subject follow directly. This is forced response about an equilibrium of a declared comparison equation, not a stability spectrum about a nonexistent equilibrium of the unchanged delayed law. Its fixed-circle expansion is not uniform at secular time; the separate theorem uses a changing geometric radius instead.

## Review disposition and falsifiers

| Claim | Disposition | Boundary |
| --- | --- | --- |
| Local first-order kernel | Independently derived and accepted | Ordinary one-root chart with the stated speed and acceleration bounds |
| Constant $256$ remainder | Independently bounded and accepted | Acceleration term retained; no speed-only estimate without its scaling |
| Mirror proxy balance | Independently differentiated and accepted | Comparison scalar only; no physical total-energy conclusion |
| Forced circular formulas | Independently solved and accepted | First-order finite-orbit comparison |
| Historical tiny radial sign change | Not adjudicated | No trajectory or interval certificate recomputed |
| Finite secular-time comparison | New derived theorem, self-reviewed | Explicit preparation and conservative smallness restriction in the companion |
| Infinite-future escape or BP-001 campaign fate | Unproved | Not a consequence of a finite slow interval |

A counterexample to the local inequality must satisfy its speed, source-acceleration and root assumptions. An independently differentiated row or proxy with a different coefficient overturns the corresponding accepted claim. Failure of the companion theorem within its explicit complete-history class overturns the new result without affecting the local reconstruction. No numerical target was executed and no historical receipt was changed.

## Verification record

The separate document checker in `.tmp/binary-secular-independent/check.mjs` passed its known SHA-256, fenced-link, math-link and valid/invalid KaTeX controls before inspecting these two new documents. Its final target pass checked 192 mathematical spans, six local links and two fragments, with no syntax, link or trailing-whitespace issue. These are document checks, not an independent numerical proof of the theorem.

SHA-256 comparison against the pre-write inventory confirmed unchanged bytes for the original slow-binary subject and regular-chart theorem. The shared alternatives assessment changed concurrently through coordinator-owned formulation work; the coordinator separately checked that the proxy input section was unchanged. The canonical Master Equation's whole-file digest also changed concurrently. Its per-hit acceleration, transmitter factor and acceleration weight were re-read and matched the startup equation input; `git diff -- content/markdown/aaa/dynamics/master-equation.md` showed no hunk in that definition. Whole-file preservation is not claimed for those two concurrently maintained references, and causal attribution of the canonical change is unresolved here. This investigation wrote neither shared reference.
