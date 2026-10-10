# Small positional phase perturbation of the actual hexagon release

Status: derived finite-window sensitivity subject, pending independent reconstruction. Scenario: $R=K_{\mathrm{int}}=c_f=1$, three alternating polarities of each sign, complete externally prepared histories, canonical interaction with every admitted root, and only the selected normal sphere constraint. The [accepted unperturbed release](spherical-three-three-symmetry-equatorial-hexagon-release.md) is preserved. This companion supplies an actual-motion phase comparison, not another prescribed constant-speed candidate or a stability spectrum.

## Complete preparation and source labels

Let $\theta_k=k\pi/3$, $\sigma_k=(-1)^k$, $a_k=(\cos\theta_k,\sin\theta_k,0)$, and $\beta=1/4$. Before $T=-1/4$, every member is stationary at $a_k$. On $[-1/4,0]$ set $u=1+4T$, $p(T)=\beta T(1+4T)^3$, and

$$
H(u)=10u^3-15u^4+6u^5,\qquad
p_0(T)=p(T)+\delta H(u),\quad p_k(T)=p(T)\ (k\ne0),
\qquad0<|\delta|\le\frac1{1000}.
$$

The prepared positions are $X_k=(\cos(\theta_k+p_k),\sin(\theta_k+p_k),0)$. Since $H(0)=H'(0)=H''(0)=0$, this joins the stationary past with $C^2$ regularity. At the release cut $H(1)=1$, $H'(1)=H''(1)=0$, so member zero starts at phase $\delta$, and all six initial angular velocities and speed magnitudes are $1/4$. The future equation is imposed with position/velocity matching; it need not match the external preparation's acceleration at zero.

The baseline preparation has $|p'|\le1/4$. Also $H'=30u^2(1-u)^2\le15/8$, so every prepared speed is at most $1/4+(15/2)|\delta|\le103/400<13/50$. The phase difference of any pair relative to the original hexagon is at most $|\delta|$, since $0\le H\le1$. Therefore prepared simultaneous partner separations are at least $1-|\delta|>99/100$. The old sites themselves are unchanged.

## Actual static-source equations with correct self omission

While all emissions sample the old stationary sites and speeds remain below one, receiver $i$ has five partner roots and no positive-delay self root. Its acceleration is

$$
A_i(x)=\sum_{j\ne i}\sigma_i\sigma_j\frac{x-a_j}{|x-a_j|^3}.
$$

The omitted term is the receiver's own label $i$, not a geometrically chosen nearest old site and not the perturbed member for every receiver. After rotation by $-\theta_i$, the five retained labels have relative angles $m\pi/3$, $1\le m\le5$, and products $(-1)^m$. Thus every receiver's own phase obeys exactly the same scalar equation

$$
\phi_i''=f(\phi_i),\qquad
f(\phi)=\sum_{m=1}^{5}(-1)^m
\frac{\sin(\phi-m\pi/3)}{[2-2\cos(\phi-m\pi/3)]^{3/2}}.
$$

All positions stay equatorial by reflection and uniqueness of the smooth constrained equation. The five unchanged members have identical scalar initial data and therefore a common phase $\Phi$ with $\Phi(0)=0$, $\Phi'(0)=1/4$. The changed member has phase $\Psi$ with $\Psi(0)=\delta$, $\Psi'(0)=1/4$. The changed member's later position does not enter the other five kernels during this old-source window; its arriving emissions still come from $a_0$. No symmetry of the whole perturbed assembly is falsely invoked to infer six equal speeds.

The accepted five-source bounds give $f(0)=0$, $c=f'(0)=29/8-5/(6\sqrt3)$, $3<c<4$, and $|f''|<84$ on the spatial strip $|x-a_i|\le1/16$. Pairing old sources shows $f$ is odd, so $f'$ is even. Consequently on $|\phi|\le1/64$,

$$
\frac32<f'(\phi)<6,\qquad |f(\phi)|<6|\phi|.
$$

This reuses the accepted analytical Hessian bound, not a numerical evolution instrument.

## Two-sided finite-time phase and speed splitting

Use the common declared event $T_E$ defined by the unchanged members reaching $\Phi(T_E)=1/128$. The accepted unperturbed proof gives

$$
\frac{25}{832}<T_E<\frac1{32},\qquad
0\le\Phi(T)\le\frac1{128},\qquad
\frac14\le\Phi'(T)<\frac{13}{50}.
$$

Put $y=\Psi-\Phi$. As long as both phases stay in the derivative strip, the fundamental theorem of calculus gives the exact difference equation

$$
y''=a(T)y,\qquad
a(T)=\int_0^1 f'(\Phi+\xi y)\,d\xi,\qquad
\frac32<a(T)<6,\qquad y(0)=\delta,\quad y'(0)=0.
$$

Writing $w=\operatorname{sgn}(\delta)y$ makes $w(0)=|\delta|>0$. The integral equation $w=|\delta|+\int_0^T(T-t)a(t)w(t)\,dt$ proves positivity, increasing $w$, and by iteration/comparison

$$
|\delta|\le w(T)\le |\delta|\cosh(\sqrt6T),\qquad
\frac32|\delta|T<w'(T)<6|\delta|T\cosh(\sqrt6T)\quad(T>0).
$$

For $T\le1/32$, $\cosh(\sqrt6T)<101/100$. One exact check uses $(2n)!\ge2^n$, giving $\cosh x\le(1-x^2/2)^{-1}\le1024/1021<101/100$. Hence

$$
|\delta|\le\operatorname{sgn}(\delta)(\Psi-\Phi)<\frac{101}{100}|\delta|,
$$

$$
\boxed{\frac32|\delta|T
<\operatorname{sgn}(\delta)(\Psi'-\Phi')
<\frac{303}{50}|\delta|T\qquad(0<T\le T_E).}
$$

For positive $\delta$, the shifted member is ahead and faster; for negative $\delta$, it is behind and slower. The negative-offset member initially decelerates because $f(\delta)<0$, but its angular velocity remains positive on the entire event interval. There is no reversal or stopping claim hidden in the speed norm.

Indeed $|\Psi|\le1/128+101/100000<1/64$, strictly closing the phase bootstrap. The unchanged acceleration is bounded by $6/128$, so $\Phi'\le1/4+3/2048$. Adding the difference estimate gives

$$
\frac14-\frac{303}{1600000}<\Psi'
<\frac14+\frac3{2048}+\frac{303}{1600000}<\frac{13}{50}.
$$

Thus both angular velocities are positive and below $13/50$, and the displayed difference is the actual speed difference. Smooth bounded scalar acceleration continues the solutions through $T_E$ with no premature exit. The assembly's simultaneous speed spread equals $|\Psi'-\Phi'|$ and satisfies the boxed bounds. At the common event it is in particular greater than $(75/1664)|\delta|$ and less than $(303/1600)|\delta|$.

The initial splitting derivative is $s_0'(0)-s_k'(0)=f(\delta)$, of the same sign as $\delta$ and with magnitude between $(3/2)|\delta|$ and $6|\delta|$. More precisely it is $c\delta+O(\delta^2)$ by the derivative bound. The integrated finite-time estimate above is separate from this initial derivative calculation.

## History, roots, separation and signed support

For each receiver every old partner distance is at least $1-|\phi_i|>63/64$. Candidate roots $S=T-d_{ij}$ consequently obey

$$
-\frac14-S=d_{ij}-T-\frac14>\frac{63}{64}-\frac1{32}-\frac14=\frac{45}{64}>0.
$$

All source velocities at these roots vanish, so their canonical transmitter factors are exactly one. The entire prepared history and actual evolution through the event have speed below $13/50$. For fixed reception point the partner root function $T-S-|X_i(T)-X_j(S)|$ is strictly decreasing in $S$, with one-sided slope at most $-37/50$. Thus the five displayed partner roots are complete and unique. The path-length bound $|X_i(T)-X_i(S)|<(T-S)$ excludes every positive-delay self root. Receiver playback factors exceed $37/50$ and do not multiply the acceleration.

The five unchanged members retain their original mutual separations. For a pair involving member zero, comparison with the unperturbed regular hexagon and $|\Psi-\Phi|<101/100000$ gives simultaneous separation greater than $1-101/100000>99/100$. This closes the distinct-partner hypothesis and applies together with the already checked preparation separation bound.

For any member, the exact static-source radial acceleration in its own coordinates is the even function

$$
N(\phi)=\frac12\sum_{m=1}^5\frac{(-1)^m}{\sqrt{2-2\cos(\phi-m\pi/3)}},\qquad
N(0)=-\frac54+\frac1{\sqrt3}.
$$

The accepted spatial estimate gives $|N'|<3$, so on $|\phi|\le1/64$ one has $3/5<-N<1$. With the verified positive speeds below $13/50$, the outward-signed normal multiplier satisfies, for all six members,

$$
\frac12<\frac35-\left(\frac{13}{50}\right)^2
<\lambda_i=-\phi_i'^2-N(\phi_i)<1.
$$

The normal support is nonzero and outward throughout this comparison. Its perturbation is also controlled: $|\lambda_0-\lambda_k|\le(\Psi'+\Phi')|\Psi'-\Phi'|+3|\Psi-\Phi|<4|\delta|$. The sign of that support difference is not asserted.

## Scoped verdict and falsifiers

**Derived:** both signs of the small positional phase offset generate actual finite-window speed splitting from equal initial speeds, while equatorial motion, complete ordinary roots, separation and outward normal support remain certified through the unchanged members' common angle event. The six-point configuration loses exact regular-hexagon shape; its five unchanged members continue the baseline phase only because all arriving emissions still sample the fixed old sites. This is a delayed-history window claim, not a claim that receivers are dynamically independent forever.

No physical energy, recurrence, chaos, attraction, asymptotic stability, new law, root deletion, tangent controller or numerical evolution is supplied. Independent verification must check the correct label-specific self omission, the quintic derivative/preparation bound, the two-sided difference comparison, common event bootstrap and whole-history root margins. Any failed inequality there would falsify the corresponding finite-window claim. The next dependency is independent adjudication and coordinator integration; earlier subjects and references remain frozen.

Measured preservation: `shasum -a 256` reproduced the frozen equatorial-release identity `86231a4749f14db1112de5e43a8a574d595bbc2ba43ad30228d87c3d6e240ee6`, support-reference identity `88f9d45cdaf5c6e1ffa65cc0003525414a62fd60620aad4ae97b4410946b0a5e`, and support-adjudication identity `811cf90fa167f3d5f858054fe682cca6af7218bbf2ff1bd9afe7aeafcf7ddf4a`. Measured hygiene: `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics (exit 1 denotes its new-file difference). These checks establish the named preservation and formatting only, not independent mathematical acceptance. No instrument, job or generated output was created.
