# Slow binary response and formal secular drift

An isolated opposite-polarity pair receives a forward tangential acceleration even when its supplied circular past is radially balanced. This note derives the first velocity correction directly from the unchanged Master Equation, bounds its local remainder, and solves the resulting first-order response about the zero-delay circular control. It explains the main features of the retained [August trajectory](../evidence/2026-08-11-physical-binary-retained-history-radial-turn.md). It does not certify that trajectory or prove eventual escape.

**Grade:** derived local row estimate and exact solution of the first-order comparison equations; inferred long-time averaged evolution. The derivation is separate from the EOM solver. It has been self-reviewed, not independently adjudicated. All new numerical evaluations use $c_f=1$. Physical numbers below are the historical record's display conversion.

## A local row estimate with an acceleration scale

Fix reception time $T$. Let $\mathbf d=\mathbf X_i(T)-\mathbf X_j(T)$, $r=\|\mathbf d\|>0$, $\mathbf n_0=\mathbf d/r$, and $\mathbf u=\mathbf V_j(T)/c_f$. Assume complete source coverage, one ordinary partner root $S=T-\Delta$, source speed at most $\epsilon c_f$ throughout $[S,T]$, with $0<\epsilon\le1/8$, and Lipschitz source velocity with acceleration bound $A$. The root condition is $c_f\Delta=\|\mathbf X_i(T)-\mathbf X_j(S)\|$. Put $\eta=Ar/c_f^2$.

The speed bound gives

$$
\frac{r}{c_f(1+\epsilon)}\le\Delta\le\frac{r}{c_f(1-\epsilon)}.
$$

Set $\mathbf p=[\mathbf X_j(T)-\mathbf X_j(S)]/r$ and $\mathbf w=\mathbf V_j(S)/c_f$. Integration of source velocity, followed by its Taylor remainder, gives

$$
\|\mathbf p\|\le\frac{\epsilon}{1-\epsilon},\qquad
\|\mathbf p-\mathbf u\|
\le\frac{\epsilon^2}{1-\epsilon}+\frac{\eta}{2(1-\epsilon)^2},
\qquad
\|\mathbf w-\mathbf u\|\le\frac{\eta}{1-\epsilon}.
$$

Indeed $\mathbf p=\mathbf u\,c_f\Delta/r+\mathbf e$, with $\|\mathbf e\|\le A\Delta^2/(2r)$, and $c_f\Delta/r=\|\mathbf n_0+\mathbf p\|$. These identities keep the delayed acceleration contribution visible; merely saying that acceleration is bounded does not make it second order in speed.

For polarity sign $\sigma$ and positive coupling $K$, the exact row is $(\sigma K/r^2)G(\mathbf p,\mathbf w)$, where

$$
G(\mathbf p,\mathbf w)=
\frac{\mathbf n_0+\mathbf p}
{\|\mathbf n_0+\mathbf p\|^3[1-\mathbf n(\mathbf p)\cdot\mathbf w]},
\qquad
\mathbf n(\mathbf p)=\frac{\mathbf n_0+\mathbf p}{\|\mathbf n_0+\mathbf p\|}.
$$

At the origin its differential is $(I-3\mathbf n_0\mathbf n_0^{\mathsf T})\mathbf p+\mathbf n_0(\mathbf n_0\cdot\mathbf w)$. Hence

$$
\mathbf a_i^{(1)}
=\frac{\sigma K}{r^2}
\left[\mathbf n_0+\mathbf u-2(\mathbf n_0\cdot\mathbf u)\mathbf n_0\right],
\qquad
\|\mathbf a_i-\mathbf a_i^{(1)}\|
\le256\frac{K}{r^2}(\epsilon^2+\eta).
$$

A conservative constant can be checked directly. On the segment from the origin to $(\mathbf p,\mathbf w)$, $\|\mathbf n_0+\mathbf p\|\ge6/7$ and the denominator factor is at least $7/8$. In the joint norm $\|\mathbf p\|+\|\mathbf w\|$, the second derivative of $G$ has norm below 100: for $H(\mathbf z)=\mathbf z/\|\mathbf z\|^3$, use $\|H\|\le(7/6)^2$, $\|DH\|\le2(7/6)^3$, $\|D^2H\|\le24(7/6)^4$, $\|Dn\|\le7/6$, and $\|D^2n\|\le6(7/6)^2$, then differentiate $H/(1-n\cdot\mathbf w)$ twice. Taylor's remainder is at most $50(15\epsilon/7)^2$. Replacing the differential's arguments by $\mathbf u$ costs at most $2\|\mathbf p-\mathbf u\|+\|\mathbf w-\mathbf u\|$. Their sum is below $256(\epsilon^2+\eta)$.

Thus an $O(K\epsilon^2/r^2)$ remainder requires the additional scaling $\eta=O(\epsilon^2)$. Near a balanced slow circle this follows at comparison level from $A\sim v^2/R$ and $r\sim2R$. Keeping that scaling on an evolved delayed trajectory is a separate tube estimate.

## Forced response about the zero-delay circle

For an antipodal pair with member radius $R$, member speed $v$, and $\omega=v/R$, the leading radial balance is $v^2=K/(4R)$. This is an exact circle of the zero-delay comparison equation. It is not an equilibrium of the unchanged delayed equation, and the following forced variation is not a stability spectrum about such an equilibrium.

The opposite source velocity is $-v\mathbf e_\theta$, so the first correction is forward with magnitude $f=Kv/(4R^2c_f)=v^3/(Rc_f)$. Write the member radius as $R+\rho$ and angle as $\omega T+\psi$. To first order, the acceleration equations give

$$
\rho''-3\omega^2\rho-2R\omega\psi'=0,\qquad
R\psi''+2\omega\rho'=f.
$$

The supplied circular release has zero perturbation position and velocity. Integration gives

$$
\rho=\frac{2f}{\omega^2}(\omega T-\sin\omega T),\qquad
\rho'=\frac{2f}{\omega}(1-\cos\omega T),\qquad
\delta\|\mathbf V\|=-fT+\frac{2f}{\omega}\sin\omega T.
$$

The speed maximum occurs at $\omega T=\pi/3$, with excess $(\sqrt3-\pi/3)v^2/c_f$. Radial velocity is nonnegative at this order and has a double zero at each completed revolution. At $P=2\pi/\omega$, the radius increment is $4\pi Rv/c_f$ and speed change is $-2\pi v^2/c_f$. A tiny observed inward interval near the double zero is beyond this first-order sign prediction.

## Comparison with the retained run

Use the historical normalized $R=1$, $v=100/299792.458$, $c_f=1$. Node arithmetic, after known trigonometric controls and before target evaluation, gives:

| Quantity | First-order comparison | Historical EOM measurement |
| --- | --- | --- |
| Speed-maximum time | $3139.4193$ | $3140.5$ |
| Speed excess, historical display | $0.02284425\,\mathrm{km/s}$ | $0.02285077\,\mathrm{km/s}$ |
| Radius at one comparison revolution | $2.00838338\,\mathrm{kpc}$ | $2.00840093\,\mathrm{kpc}$ at the reported turn |
| Speed at one comparison revolution | $99.7904155\,\mathrm{km/s}$ | $99.786596\,\mathrm{km/s}$ at the reported turn |

The last two columns do not use exactly the same event time: $P=18836.5157$, whereas the reported numerical sign change is near $18547.875$, or angle $6.1869051$. The comparison supports the leading response independently of the solver but supplies no rigorous trajectory-error bound. In particular, relative agreement of total radius or speed can conceal larger discrepancies in their small changes. The supplied review's blanket “about 0.3%” description and its $99.787$ speed at the completed revolution are not adopted.

The leading tangential acceleration is about $3.7114\times10^{-11}$, while the recorded acceleration tolerances are $10^{-10}$ to $5\times10^{-10}$. Tolerance size alone is not a trajectory-error bound or proof of failure. Reading the instrument's measurement and stopping functions shows that its event uses midpoint positions and velocities from retained enclosures, not an interval sign proof. Root certification and overlap comparisons therefore do not independently certify the exact solution's tiny radial sign change. The recorded data and hashes remain preserved.

## Formal averaging and its boundary

Removing the bounded sine term gives the formal mean drift $\langle R'\rangle=2v^2/c_f$. Substituting the instantaneous comparison balance yields

$$
\frac{d(R^2)}{dT}=\frac{K}{c_f},\qquad
\frac{d\sqrt R}{d\theta}=\frac{\sqrt K}{2c_f}.
$$

This is a quadratic-in-angle spiral at leading averaged order, not a logarithmic spiral. It is an inferred slow-trajectory model. It has not been proved uniformly over the secular time $Rc_f/v^2$, still less over an infinite future. The fixed-circle response itself has $\rho/R=O((v/c_f)\omega T)$ and ceases to be a small perturbation on that secular time. A precise averaged theorem needs scaled time, a defined slowly varying radius, a relative error statement, and complete-history delayed comparison. An unscaled additive $O(v/c_f)$ beside $K/c_f$ does not state a dimensionally complete bound.

The first-order model favors outward mean drift and allows higher-order small radial dips near one revolution. The review's inferred inward duration, depth and renewed expansion remain unverified predictions. Neither BP-001 fate nor a later $170\,\mathrm{km/s}$ crossing follows.

**Falsifiers:** independently differentiate the row expansion or the two forced equations; failure of the stated local inequality under its assumptions overturns the row lemma. Slow-speed runs at several normalized speeds can test the maximum-time, speed-excess and per-cycle-radius scaling, with declared error bounds. A controlled continuation through the small post-turn interval tests renewed expansion; it must resolve the radial velocity sign with trajectory errors, not just midpoint samples. Failure of long-time averaging would defeat the proposed secular route without refuting the local lemma.
