# First-order circular response of the inverse-distance candidate

## Retained geometry and expansion

The logarithmic response cancels the first-order correction for radial source motion, but leaves a forward acceleration on a circular opposite-polarity pair. A radially balanced instantaneous circle is therefore a comparison trajectory, not a delayed equilibrium.

**Claim grade: derived for the local Taylor expansion and forced linear comparison; inferred for its secular continuation.** Select the [inverse-distance candidate](../../equation-variants/logarithmic-potential/manuscript.md#after-the-proposed-logarithmic-potential-equation), with no ceiling, self suppression or contact rule. Consider a simple subfield partner root with present separation $r>0$ and present emission-to-receiver direction $\mathbf n_0$. Let $\epsilon\ll1$ bound source and receiver speeds divided by $c_f$. Assume source acceleration throughout the sampled delay obeys $|\mathbf a_j|r/c_f^2=O(\epsilon^2)$, with constants uniform on the comparison interval. A speed bound alone would not justify replacing delayed velocity by present velocity.

Write $\mathbf v_j=\mathbf V_j(T)/c_f$. Taylor expansion of the source position and the root gives

$$
\mathbf r_{\rm delayed}=r(\mathbf n_0+\mathbf v_j)+O(r\epsilon^2),
\quad
r_{\rm delayed}=r[1+\mathbf n_0\cdot\mathbf v_j]+O(r\epsilon^2),
$$

$$
\mathbf n_{\rm delayed}=\mathbf n_0+\mathbf v_j-(\mathbf n_0\cdot\mathbf v_j)\mathbf n_0+O(\epsilon^2),
\qquad
\frac{c_f}{D_t}=1+\mathbf n_0\cdot\mathbf v_j+O(\epsilon^2).
$$

For the power kernel $K_n r^n$, multiplication gives $\sigma K_n r^n[\mathbf n_0+\mathbf v_j+n(\mathbf n_0\cdot\mathbf v_j)\mathbf n_0]+O(K_n r^n\epsilon^2)$. In particular, with $K=\kappa_{\log}|q_iq_j|$,

$$
\mathbf A_i=\frac{\sigma K}{r}\left[\mathbf n_0+\mathbf v_{j,\perp}\right]+O\!\left(\frac{K}{r}\epsilon^2\right).
$$

The first-order radial correction cancels. For a circular pair the source velocity is transverse, so the correction survives. These remainder orders require the declared source-acceleration bound and a root chart uniformly separated from $D_t=0$ and $r=0$; they are not a delayed long-time comparison theorem.

## Circular balance and its forward residual

Place the opposite members at radius $R$ on opposite sides of a common midpoint, each with speed $v=R\omega$. Their instantaneous separation is $2R$. Instantaneous radial balance requires

$$
\frac{v^2}{R}=\frac{K}{2R},
\qquad v^2=\frac K2.
$$

Thus $K<2c_f^2$ is the subfield condition for this comparison circle, and $K/c_f^2\ll1$ is needed for the expansion. Numerical instantiations use $c_f=1$. This condition does not make the delayed circle a solution: opposite polarity and the source's opposite velocity produce the forward acceleration

$$
f=\frac{Kv}{2Rc_f}=\frac{v^3}{Rc_f}>0.
$$

The inverse-distance replacement therefore retains the binary's first-order forward residual. Radial neutrality and circular balance are distinct questions.

## Forced rotating-frame solution

Let the perturbed radius and angle be $R+\eta(T)$ and $\omega T+\psi(T)$, respectively. Hold the leading forward input $f$ at its unperturbed value and keep terms of first order in $v/c_f$. With zero perturbation and perturbation velocity initially, polar acceleration gives

$$
\eta''-2\omega^2\eta-2R\omega\psi'=0,
\qquad
R\psi''+2\omega\eta'=f.
$$

Integrating the second equation and substituting in the first yields

$$
R\psi'=fT-2\omega\eta,
\qquad
\eta''+2\omega^2\eta=2\omega fT.
$$

Consequently, with $\nu=\sqrt2\,\omega$,

$$
\eta=\frac f\omega\left(T-\frac{\sin(\nu T)}{\nu}\right),
\qquad
\eta'=\frac f\omega[1-\cos(\nu T)],
\qquad
\delta|\mathbf V|=f\frac{\sin(\nu T)}{\nu}.
$$

Substitution into the two linear equations and the zero initial data checks every coefficient. The oscillation frequency is $\sqrt2\,\omega$, unlike the inverse-square comparison. The radial drift averaged over this comparison oscillation is

$$
\langle\eta'\rangle=\frac f\omega=\frac{v^2}{c_f}=\frac{K}{2c_f}.
$$

This is half the inverse-square binary's $2v^2/c_f$ coefficient at matched circular speed. A formal slowly varying inverse-distance comparison therefore suggests radius growing linearly with time while its circular speed stays constant to leading order. The inverse-square law's $d(R^2)/dT$ formula cannot be transferred to it. The displayed forced solution is derived on intervals with $|\eta|/R\ll1$, for example a fixed number of periods as $v/c_f\to0$. Controlling a true delayed solution over the much longer secular interval remains unproved.

## Limits and falsifiers

This analysis does not linearize for a stability verdict about the comparison circle: the circle has a nonzero acceleration residual. It computes the forced departure from that circle. A separately authored small-speed calculation whose acceleration differs at order $v/c_f$, or whose first-interval departure differs from the displayed solution at that order after accounting for preparation, would refute the corresponding expansion. A disagreement at order $(v/c_f)^2$ would require the next expansion terms. No numerical instrument or retained binary branch was run for this derivation.
