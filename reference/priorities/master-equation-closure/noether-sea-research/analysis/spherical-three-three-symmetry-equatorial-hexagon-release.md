# Equal-speed rotating hexagon release with finite-time speed increase

Status: derived finite-window normal-constrained motion, pending independent review. Owner: sphere-symmetry / emmy-noether lens; coordinator owns synthesis. This companion preserves all earlier subjects. The external preparation is initial history, not an equation-generated formation claim. No physical energy, tangent controller, stability spectrum, or all-time persistence is asserted.

## Preparation and canonical reduction

Set $R=K_{\mathrm{int}}=c_f=1$, $\theta_k=k\pi/3$, $\sigma_k=(-1)^k$, and $a_k=(\cos\theta_k,\sin\theta_k,0)$ for $0\leq k<6$. Prescribe the complete past

$$
X_k(T)=(\cos(\theta_k+p(T)),\sin(\theta_k+p(T)),0),\qquad
p(T)=\begin{cases}0&T\leq-1/4,\\ \frac14T(1+4T)^3&-1/4\leq T\leq0.\end{cases}
$$

This history is $C^2$ at $-1/4$, smooth inside each piece, and returns to the original phase at release: $p(0)=0$, $p'(0)=1/4$. It need only match the subsequent solution in position and velocity at zero. Writing $u=1+4T\in[0,1]$ gives $p'=u^2(4u-3)/4$, hence $|p'|\leq1/4$. No collision occurs because the six points remain a regular hexagon.

The whole history is invariant under rotation by $\pi/3$ combined with cyclic label permutation and a global polarity reversal. Products of polarities, the root equation, and the canonical kernel preserve this operation. Reflection across the equatorial plane is also a whole-history symmetry. Uniqueness of the smooth local constrained equation therefore retains both symmetries. They imply, for the actual motion,

$$
X_k(T)=(\cos(\theta_k+\Phi(T)),\sin(\theta_k+\Phi(T)),0),\qquad
\Phi(0)=0,\quad \Phi'(0)=1/4.
$$

The root certificate below closes this local argument over a quantitative interval. It excludes positive-delay self roots by sub-wake-speed geometry rather than deleting them. For each partner there is exactly one root, and every emission in this interval lies before $-1/4$. Consequently its transmitter factor is exactly one. For receiver zero, put $x=(\cos\Phi,\sin\Phi,0)$, $t=(-\sin\Phi,\cos\Phi,0)$ and

$$
d_k(\Phi)=|x-a_k|=\sqrt{2-2\cos(\Phi-\theta_k)},\qquad
A(x)=\sum_{k=1}^{5}(-1)^k\frac{x-a_k}{d_k^3}.
$$

The exact normal-constrained equation is $x''=A+\lambda x$, with $\lambda=-\Phi'^2-x\cdot A$. Its tangential component is the autonomous scalar equation

$$
\Phi''=f(\Phi),\qquad
f(\Phi)=\sum_{k=1}^{5}(-1)^k\frac{\sin(\Phi-\theta_k)}{[2-2\cos(\Phi-\theta_k)]^{3/2}}.
$$

Thus rigid shape and equal simultaneous speeds follow from discrete history symmetry and uniqueness; neither imposes constant speed.

## First nonzero speed derivative

Reflection-paired sources give $f(0)=0$. Differentiating each summand gives $\cos\psi/d^3-3\sin^2\psi/d^5$ before its polarity sign. The two nearest opposite-polarity sources contribute $7/4$ each, the two same-polarity sources contribute $-5/(12\sqrt3)$ each, and the antipodal opposite-polarity source contributes $1/8$. Hence

$$
c:=f'(0)=\frac{29}{8}-\frac{5}{6\sqrt3},\qquad 3<c<4.
$$

All derivatives here are from the post-release side. In particular,

$$
\Phi''(0)=0,\qquad \Phi'''(0)=\frac c4>0,\qquad
s(T)=\Phi'(T)=\frac14+\frac c8T^2+o(T^2).
$$

The first nonzero derivative of the tangent acceleration is $c/4$; the first nonzero derivative of the speed after its initial value is $s''(0)=c/4$. This computes departure along an actual released trajectory, not a stability spectrum about the prescribed rotating history.

## Quantitative bounds through a declared angle event

Here is a direct analytic derivative bound, independent of numerical evolution. In the spatial ball $|x-a_0|\leq1/16$, every partner distance is at least $15/16$. For $H(r)=r/|r|^3$, $|H|=|r|^{-2}$ and $\|DH\|\leq2|r|^{-3}$. If $w$ is a unit vector, $n=r/|r|$, and $b=n\cdot w$, then

$$
D^2H[w,w]=|r|^{-4}[-6bw+(15b^2-3)n],\qquad
|D^2H[w,w]|^2=|r|^{-8}(9-18b^2+45b^4)\leq36|r|^{-8}.
$$

Summing five terms yields $|A|<6$, $\|DA\|<13$, and $|D^2A[w,w]|<39$. Since $f=t\cdot A(x)$, with $x'=t$, $t'=-x$, $t''=-t$ when differentiating in angle, $|f''|<6+3(13)+39=84$. On $0\leq\Phi\leq Q:=1/64$, the spatial ball condition holds and

$$
\frac32<f'(\Phi)<6,\qquad
\frac32\Phi<f(\Phi)<6\Phi\quad(\Phi>0).
$$

For example, the lower derivative bound follows from $c-84/64>27/16>3/2$. Let $T_Q$ be the first event $\Phi(T_Q)=Q$. Bootstrap $\Phi'\leq13/50$. Since $f>0$ for positive angle, $\Phi'\geq1/4$ and the angle event is reached by $1/16$ unless the bootstrap first fails. Before it,

$$
\Phi'\leq\frac14+\frac{3}{32}\frac1{16}
=\frac14+\frac3{512}<\frac{13}{50}.
$$

The strict estimate precludes such failure. Smooth ODE continuation on this compact strip gives the event and

$$
\frac{25}{416}<T_Q<\frac1{16},\qquad
\frac14<\Phi'(T)<\frac{13}{50}\quad(0<T\leq T_Q).
$$

Integrating $T/4\leq\Phi(T)\leq13T/50$ in the bounds for $f$ gives the explicit speed drift

$$
\frac3{16}T^2<s(T)-\frac14<\frac{39}{50}T^2
\qquad(0<T\leq T_Q).
$$

This interval ends at a declared angle event. Its time bounds locate that event; the proof establishes motion through the event itself.

## Complete root and normal-support certificate

For $0\leq T\leq T_Q$, the candidate stationary-source root for partner $k$ is $S=T-d_k(\Phi(T))$. Since $d_k\geq1-|x-a_0|\geq63/64$,

$$
d_k-T-\frac14\geq\frac{63}{64}-\frac1{16}-\frac14=\frac{43}{64}>0.
$$

All five candidates therefore sample the old stationary sites with this uniform emission margin. The entire past plus constructed future through the event has speed at most $13/50<1$. For every partner, $h(S)=T-S-|X_i(T)-X_j(S)|$ has $h'(S)=-1+\widehat r\cdot V_j(S)\leq-37/50<0$. The candidate is consequently the unique root; equivalently the delay residual increases strictly. For self, $|X_i(T)-X_i(S)|\leq(13/50)(T-S)<T-S$ excludes every $S<T$. This proves the complete root census: five partner roots, no positive-delay self roots, transmitter denominator exactly one, and no unexamined branch. Current partner separations remain exactly those of a regular hexagon, with minimum one. Receiver playback factors, if recorded, are at least $37/50$ and do not multiply the canonical acceleration.

For support, the equal-radius chord identity gives

$$
A_n(\Phi)=x\cdot A=\frac12\sum_{k=1}^{5}\frac{(-1)^k}{d_k(\Phi)},\qquad
A_n(0)=-\frac54+\frac1{\sqrt3}.
$$

On the larger distance strip, $|dA_n/d\Phi|\leq(5/2)(15/16)^{-2}<3$. Since $13/20<5/4-1/\sqrt3<3/4$, the angle interval implies $3/5<-A_n<1$. Therefore the actual outward normal support obeys

$$
\frac12<\frac35-\left(\frac{13}{50}\right)^2
<\lambda=-s^2-A_n<1.
$$

This is nonzero external normal support, with no tangential support. It supplies the sphere scenario specified by the assignment; it is not free unconstrained assembly motion.

## Verdict, falsifiers, and evidence boundary

**Derived:** the specified complete preparation releases an actual normal-constrained alternating equatorial hexagon with equal positive but strictly increasing speeds on $(0,T_Q]$. Its shape rotates rigidly; its rotation rate changes. The canonical all-time constant-speed rotating-history exclusion concerns different history data and does not contradict this result. The proof stops inside the stationary-emission domain and asserts neither later persistence nor autonomous formation.

Independent adjudication should recompute the signed five-source derivative, the Hessian bound, the strict bootstrap and the complete-root argument. A wrong sign in the nearest-neighbor contribution, a speed reaching one, an emission reaching $-1/4$, or a normal multiplier outside the displayed bounds would falsify the corresponding claim. No numerical instrument, numerical evolution, physical energy interpretation, or new equation was used. The next dependency is independent derivation and coordinator integration; there is no unresolved mathematical blocker within this finite window.

Measured preservation receipt: `shasum -a 256` over the symmetry-prefixed analysis files reproduced all eight previously frozen subject hashes. The explicit new-file check `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/noether-sea-research/analysis/spherical-three-three-symmetry-equatorial-hexagon-release.md` emitted no whitespace diagnostics (exit 1 denotes the new-file difference). These checks establish file preservation and formatting only, not independent mathematical acceptance.
