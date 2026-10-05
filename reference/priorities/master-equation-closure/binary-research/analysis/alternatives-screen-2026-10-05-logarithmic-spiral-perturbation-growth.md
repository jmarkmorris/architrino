# A growing relative mode of the inverse-distance spiral

## Certificate protocol frozen before its target

This source continues the [full Cartesian perturbation formulation](alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-formulation.md). Its question is whether the mirror-planar relative sector has a genuine exponent with positive real part. The measured scout located $k\simeq0.0138798363660541+3.2269427188404713i$, after its balance, symmetry and differential controls. This location is not yet an existence assertion. The certificate will use the closed complex rectangle centered at this finite decimal, with coordinate radius $10^{-5}$, and the entire admitted balance rectangle of radius $10^{-10}$ in $(\omega,\delta)$. Both rectangles and the method below are frozen before certificate target use.

## Independent reduced planar determinant

Use the receiving chord basis $(n,Jn)$ rather than the radial basis. At the exact balance zero,

$$
n=\frac{(\omega,-1)}{\sqrt{1+\omega^2}},\qquad
D=1/\lambda,\qquad d=1-\lambda.
$$

The delayed positive-member velocity $w=P(I+\Omega)A$ has components

$$
w_n=d/\lambda,\qquad w_m=m=\frac{\lambda\cos\delta}{\omega d}.
$$

Here the full acceleration magnitude gives $a\sqrt{1+\omega^2}=\lambda/(\omega d)$, and the direction balance gives $n\cdot w=d/\lambda$. These identities are used only at the admitted exact zero. Off that zero the formulas below are an analytic extension used for interval containment, not a changed physical response.

Let $P=\left(\begin{smallmatrix}\cos\delta&\sin\delta\\-\sin\delta&\cos\delta\end{smallmatrix}\right)$, $\Omega=\left(\begin{smallmatrix}0&-\omega\\\omega&0\end{smallmatrix}\right)$, and

$$
\alpha=\frac{\lambda^2}{d^2}+\frac{\lambda^2\omega m}{d}-\frac{\lambda^3m^2}{d^2},\qquad
\beta=\frac{\lambda^2m}{d^2},\qquad
K=\begin{pmatrix}\alpha&\beta\\\beta&-\lambda/d^2\end{pmatrix}.
$$

For $x_j=\rho x_i$ put $B=(I-\rho\lambda^{k+1}P)x$. The exact clock variation is $\ell^{(1)}=-\lambda B_n$. Therefore $C_n^{(1)}=\lambda B_n$, $C_m^{(1)}=B_m-\lambda mB_n$, and

$$
D^{(1)}=\frac m d B_m+\left(\omega m-\frac{\lambda m^2}d\right)B_n
-\rho\lambda^k\{P[(k+1)I+\Omega]x\}_n.
$$

Substitution into the response differential gives

$$
F^{(1)}=KB-\frac{\rho\lambda^{k+2}}d e_1e_1^{\mathsf T}P[(k+1)I+\Omega]x.
$$

Thus the characteristic matrix in this basis is

$$
M_\rho(k)=k^2I+k(I+2\Omega)+\Omega+\Omega^2
-K(I-\rho\lambda^{k+1}P)
+\frac{\rho\lambda^{k+2}}d e_1e_1^{\mathsf T}P[(k+1)I+\Omega].
$$

A zero of $f(k)=\det M_-(k)$ supplies a nonzero relative-planar modal vector. This derivation preserves the source-clock contribution and is independent of the scout's Cartesian matrix implementation. The scalar function is entire in $k$ at every fixed allowed parameter pair. Complex conjugation gives the paired exponent because its coefficients are real.

## Exact enclosure method

A separate instrument will use rational real intervals, rectangular complex intervals and first-order automatic differentiation in complex $k$. It will evaluate $\lambda=\exp(-\delta/\omega)$ and $\lambda^{k+j}=\exp[-(k+j)\delta/\omega]$ directly. Real exponential, sine and cosine intervals will use rational Taylor polynomials with explicit remainders on their declared ranges. The full parameter rectangle is propagated through every entry.

Let $k_0$ be the frozen rational complex center, $Q$ its square of radius $r=10^{-5}$, and $b$ a nonzero rational complex approximation to $1/f'(k_0)$. Its selection need not be accurate a priori. Exact interval bounds must show

$$
\|I-bf'(Q)\|_\infty<1,\qquad
\|bf(k_0)\|_\infty+r\|I-bf'(Q)\|_\infty<r,
$$

uniformly over the admitted parameter rectangle. Multiplication by a complex number $c$ has real matrix infinity norm $|\Re c|+|\Im c|$, so rectangular interval bounds give a sufficient check. The map $k\mapsto k-bf(k)$ then contracts $Q$ into itself for each allowed fixed parameter pair. At the admitted exact balance zero it has one zero inside $Q$, whose real part is strictly positive since the whole rectangle lies to the right of $0.0138$.

Before target use the instrument must pass rational interval sign/reciprocal controls, complex multiplication and exponential controls, automatic-derivative controls on a known polynomial and exponential, an exactly known complex contraction and a rejected failed self-map. It must also enclose the known axial-rotation and time-origin determinant zeros at the admitted parameter rectangle. These controls establish the arithmetic and symmetry obligations before target evaluation; a separate reviewer must assess the derivation and certificate.

## Interpretation boundary

A certified exponent in this rectangle is distinct from the actual translation, rotation, tilt and time-origin symmetry exponents listed in the formulation. It grows as $t^{\Re k}$ relative to the spiral and as $t^{1+\Re k}$ in positional amplitude. This would disprove linear attraction modulo those symmetries. It would not identify a nonlinear perturbed fate, establish a generic instability basin, or classify every characteristic root. The full nonmirror and normal perturbations remain present in the formulation even though one invariant mirror-planar sector can suffice for a growing-mode result.

Certificate execution, evidence grade, falsifiers and final disposition will be recorded after the known-first runs. No target existence result is asserted by this protocol section alone.

## Completed certificate and evidence grade

**Certified arithmetic result, pending independent assessment of this new subject:** the exact admitted expanding spiral has a conjugate pair of growing relative-planar characteristic modes. One exponent lies in

$$
\Re k\in[0.0138698363660541,\ 0.0138898363660541],\qquad
\Im k\in[3.2269327188404713,\ 3.2269527188404713].
$$

The [separate rational certificate](../evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate.py), SHA-256 `4e86e5d94ff67dc3dfa6099618568fc2cc520ae053b55e377d4027b532504292`, passed its known controls at `2026-10-05T15:59:30.860698+00:00`, before the target at `2026-10-05T15:59:49.867572+00:00`. The target used the full declared parameter and characteristic rectangles. Its rational assertions establish

$$
\|I-bf'(Q)\|_\infty<0.000235,\qquad
\|bf(k_0)\|_\infty<6.634\times10^{-9},\qquad
\text{image radius}<8.982\times10^{-9}<10^{-5}.
$$

The last inequality proves the contraction self-map. The nonzero rational complex preconditioner was selected from a rounded midpoint of the enclosed center derivative; that selection carries no mathematical assumption, because the subsequent interval inequalities verify it. The instrument's stored interval for that rational multiplier encloses its exact value, so its bounds hold for the exact multiplier even though the outward grid representation has positive width.

Every interval arithmetic operation rounds outward to a rational grid of size $10^{-60}$, using integer floor/ceiling. Thus no floating-point rounding affects admission. On $|x|\le2$, the degree-80 real exponential polynomial has error at most $9\,2^{81}/81!$, using $e^2<9$; the sine and cosine polynomials of the same Taylor degree have error at most $2^{81}/81!$. Complex exponentiation is computed as $e^{\Re z}(\cos\Im z+i\sin\Im z)$. Automatic derivatives follow the exact analytic sum, product, quotient and exponential rules. Each complex argument stays within those declared real-component ranges. Recorded floating-point summaries are explanatory only; all inequalities admitting the root use fractions.

The earlier [Cartesian scout](../evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-scout.py), SHA-256 `4bf0eedf854aa193b1ee349c9e8056c5650ed1383b14b5629d5d710049476308`, passed known controls at `2026-10-05T15:54:37.656989+00:00`, then completed its target at `2026-10-05T15:54:57.475563+00:00`. It measured $k\simeq0.0138798363660541+3.2269427188404713i$. Its full equilibrium residual was below $2\times10^{-16}$, all symmetry residuals below $10^{-15}$, and the independent implicit-response differential controls below $5\times10^{-9}$ at their declared finite difference step. Those are instrument measurements, not exact proof of balance or spectrum. The admitted earlier exact balance and the new whole-rectangle contraction supply those respective proof obligations.

The two perturbation instruments share this author's mathematical derivation but no imported code. Their agreement checks different implementations and coordinate formulas. It does not substitute for a fresh independent review of the linearization, reduced determinant and interval certificate.

## Meaning for complete compatible perturbations

The linearized mode can be realized as a tangent to complete separated compatible histories. On the retained analytic interval $S_c\le T\le0$, prescribe the real part of

$$
\dot q_+(T)=(1+T)\exp[\Omega\log(1+T)](1+T)^k x,\qquad
\dot q_-=-\dot q_+.
$$

Here the dot denotes variation with respect to history amplitude, not physical time differentiation. Extend these variation jets smoothly across a short earlier segment and set the variation to zero on the old held tail. The base patch matches the analytic source jets at $S_c$, so root variations through that seam use exactly the derivatives already included in the characteristic equation. A sufficiently small perturbation has the same strict complete speed margin and positive separation on its supplied past.

At release the first variation of the acceleration mismatch is zero by the characteristic equation. Any higher-order mismatch can be corrected with an endpoint position patch that preserves the release position and velocity, has zero jets at its older endpoint, and changes only the release second derivative. Choose its support close enough to zero to stay strictly later than every nearby release source; then the exact release acceleration depends on no changed source sample. Multiplying the standard scalar patch $\tfrac12d_0^2 z^3(1-z)^2$ by the actual mismatch sets compatibility exactly. Its coefficient is $o(\eta)$ for history amplitude $\eta$, because the first variation vanishes. The correction therefore preserves the displayed modal tangent. Here $d_0>0$ is a fixed small patch width and $z=1+T/d_0$ on its support. This construction supplies actual compatible histories tangent to the growing linearized direction; it does not assume that their nonlinear futures remain equal to a modal ansatz.

Real and imaginary parts supply real perturbations with growth envelope $t^{\Re k}$ in the similarity phase state. The growing eigenspace is disjoint from the tangent space generated by constant spatial translations, rotations, tilts and time-origin/scale transformations, since their exponents are the separately checked symmetry values. Hence the linearized dynamics is unstable relative to the expansion even after removing those actual symmetries. This is stronger than an absolute positional increase, which the base already has.

No nonlinear instability theorem or all-future fate of a perturbed history is asserted here. The exact uniformly subfield chart supports the local variational statement and finite-time differentiability for regular compatible histories. A growing mode will eventually leave the domain of a fixed small linear approximation; its later nonlinear branch, speed margin and root census require a separate continuation argument. Nor does this calculation prove that every perturbation grows: the full characteristic problem contains both symmetry and other sectors.

## Reproduction, falsifiers and ownership

The four retained receipts are local evidence under `.local-data/master-equation-closure/binary-research/`, named `alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-scout-{known,target}.json` and `alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate-{known,target}.json`. They are not portable tracked inputs. The two linked instruments reproduce them using the shared venv; each refuses receipt overwrite and requires a same-source known receipt before its target. For the certificate:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate.py --out .local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate-known.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate.py --target --known .local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate-known.json --out .local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate-target.json
```

Use fresh output names when reproducing retained receipts. The scout has the same command structure with `certificate` replaced by `scout`.

Scientific falsifiers are an omitted source-clock or transmitter variation; failure of the chord-basis reduction at the exact balance zero; a rational interval failing to contain its exact operation or Taylor remainder; a contraction bound that omits the full parameter rectangle; or an alleged growing direction belonging to the actual symmetry tangent space. A later nonlinear bounded orbit would not refute the existence of this growing linear mode, just as this mode does not refute the admitted exact spiral's existence.

Only the two new perturbation analyses, two matching evidence scripts and four local receipts are authored in this bounded contribution. The admitted spiral subject, certificates, reference, assessment and all previous research sources remain unchanged. Both target computations completed in the foreground; the scout session was collected and no owned process remains active. No production solver, regular test, shared integration, regeneration or publication was performed. Fresh independent mathematical assessment remains the required next step before integration.
