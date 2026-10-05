# Independent assessment of Cartesian growth about the expanding spiral

## Verdict and limits

**Derived verdict: accepted.** The full Cartesian first variation is correct, including the implicit source-clock contribution to the physical source velocity. The common/relative and planar/normal decompositions retain all six Cartesian perturbation coordinates. The listed symmetry modes are genuine. A separately authored interval reference using the unreduced Cartesian response certifies the claimed relative-planar root with strictly positive real part at the exact admitted balance parameters.

The accepted conclusion is a growing linearized mode relative to the spiral's own expansion, realizable as a tangent to complete separated compatible histories. It establishes linearized instability modulo the listed actual symmetries. It does not establish nonlinear instability, departure time, later perturbed fate, a basin statement, or spectral completeness. The exact unperturbed spiral remains the admitted global solution of its particular complete preparation.

This is independent analytical reconstruction after disclosure, using the Jack K. Hale lens. The earlier [spiral admission](alternatives-screen-2026-10-05-logarithmic-spiral-adjudication.md) supplies the exact balanced base state. No unbalanced circle, standard physical law, Weber result or Darwin result is used as a premise.

## Frozen identities and evidence

The following identities were measured with `shasum -a 256` during review:

| Subject | SHA-256 |
| --- | --- |
| [Full Cartesian formulation](alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-formulation.md) | `e7d95a0216b34d1ded8c1f78c0eba340863a62e9fcfb4db2954003f7e29a3331` |
| [Reduced determinant and growth claim](alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-growth.md) | `2b8b28e2605b9ea3c4dfa65d1a17c30d691393ec6e63e2882ad7fba4663cc853` |
| [Cartesian scout](../evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-scout.py) | `4bf0eedf854aa193b1ee349c9e8056c5650ed1383b14b5629d5d710049476308` |
| [Subject certificate](../evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-certificate.py) | `4e86e5d94ff67dc3dfa6099618568fc2cc520ae053b55e377d4027b532504292` |

The new [independent Cartesian interval reference](../evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-independent.py), SHA-256 `a9f806f220149bae96af13912a34f9e0a95c162106102e14554e9959782c134b`, imports no subject or previous reference implementation. It assembles the linear response from the physical source clock, chord, direction and velocity variations in the original radial Cartesian axes. In particular it does not use the subject's reduced matrix $K$, chord-basis determinant or the off-balance substitution $D=1/\lambda$.

Its known controls passed at `2026-10-05T16:09:18.194693+00:00`, before target use at `2026-10-05T16:09:37.321802+00:00`, under the shared venv. The source hash and successful known receipt are required by the target entrypoint. Local evidence is retained under `.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-independent-{known,target}.json`. These receipts are local provenance, not portable tracked prerequisites; the linked instrument reproduces them.

## Exact coordinates and complete root chart

Use $t=1+T$, $\tau=\log t$, $\Omega=\omega J$ with $J(x,y,z)=(-y,x,0)$, and

$$
X_i(T)=t e^{\Omega\tau}U_i(\tau).
$$

Direct differentiation gives

$$
X_i'=e^{\Omega\tau}[U_i'+(I+\Omega)U_i],
$$

$$
X_i''=t^{-1}e^{\Omega\tau}[U_i''+(I+2\Omega)U_i'+(\Omega+\Omega^2)U_i].
$$

The physical velocity contains $(I+\Omega)U_i$, not just $U_i'$. This distinction is essential to both the transmitter factor and its variation.

For a partner root, $1+S=\ell t$ and its similarity time is $\sigma=\tau+\log\ell$. In receiving axes put

$$
C_i=U_i-\ell e^{\Omega\log\ell}U_j(\sigma),\qquad
W_j=e^{\Omega\log\ell}[U_j'(\sigma)+(I+\Omega)U_j(\sigma)].
$$

Then $1-\ell=d_i=|C_i|$, $n_i=C_i/d_i$, and $D_i=1-n_i\cdot W_j$. The fixed inverse-distance partner equation becomes exactly

$$
U_i''+(I+2\Omega)U_i'+(\Omega+\Omega^2)U_i
=-C_i/(d_i^2D_i).
$$

The admitted complete base has one uniform subfield speed bound. The complete causal residual is strictly monotone in source time, has its required remote-past sign, and has exactly one partner zero. Each self chord is strictly shorter than its time delay. These arguments also apply to sufficiently small complete-history perturbations retaining speed margin and present separation, including nonmirror and out-of-plane perturbations. Thus no ordinary root is removed to obtain this local equation.

At the balanced base, $U_+=A$, $U_-=-A$, $A=(a,0,0)$, the root ratio is $\lambda$. With $P=e^{\Omega\log\lambda}$,

$$
c=A+\lambda PA,\quad d=1-\lambda=|c|,\quad n=c/d,
\quad w=P(I+\Omega)A,
$$

and the exact balance gives $D=1+n\cdot w=1/\lambda$ and $(\Omega+\Omega^2)A=-n/(dD)$. This is an actual equilibrium of the transformed equation. Its retained analytic source segment begins at $T=\lambda-1>-1$. The held tail need not and is not transformed through the formal singular origin $T=-1$.

## Independent clock and response differentiation

For modal amplitudes $u_i=x_i e^{k\tau}$, variation of the explicit delayed argument at fixed clock gives

$$
B_i=x_i-\lambda^{k+1}Px_j.
$$

Changing the clock also changes the base source position. Since $\partial_\ell[\ell e^{\Omega\log\ell}U_j^*]=W_j^*$, the total chord variation is $C_i^{(1)}=B_i-W_j^*\ell_i^{(1)}$. Differentiating $1-\ell=|C|$ gives

$$
-\ell_i^{(1)}=n_i\cdot(B_i-W_j^*\ell_i^{(1)}),\qquad
\ell_i^{(1)}=-\frac{n_i\cdot B_i}{D}.
$$

Consequently $d_i^{(1)}=-\ell_i^{(1)}$ and $n_i^{(1)}=(I-n_in_i^{\mathsf T})C_i^{(1)}/d$.

The base physical source velocity expressed in receiving axes varies with clock as $\partial_\ell W_j^*=\Omega W_j^*/\lambda$. Hence

$$
W_j^{(1)}=\lambda^kP[(k+1)I+\Omega]x_j
+\frac{\ell_i^{(1)}}\lambda\Omega W_j^*.
$$

The second term has no additional identity matrix: it differentiates the physical velocity's rotation, whereas differentiating the position would also differentiate its scale. Omitting this clock term or using a similarity-coordinate velocity gives a different and incorrect differential.

Now

$$
D_i^{(1)}=-n_i^{(1)}\cdot W_j^*-n_i\cdot W_j^{(1)},
$$

and ordinary product differentiation of $-C/(d^2D)$ gives

$$
F_i^{(1)}=-\frac{C_i^{(1)}}{d^2D}
+\frac{2c_i d_i^{(1)}}{d^3D}
+\frac{c_iD_i^{(1)}}{d^2D^2}.
$$

Thus the full characteristic equation is precisely the one in the subject. All modal scalar products are complex bilinear extensions of real Cartesian products; there is no conjugation in the differential.

## Full sector decomposition and actual symmetries

In the plus equation, $W_-^*=-w$. Under $x_- =\rho x_+$, $\rho=\pm1$, the minus response variation is $\rho$ times the plus response variation. This follows also directly from inversion and exchange symmetry of the fixed pair. Reflection in the base plane commutes with the linear equation. The six Cartesian coordinates therefore split into two planar $2\times2$ systems and two normal scalar systems. This is a decomposition of the complete linearization, not an imposed mirror restriction.

For a normal amplitude, $n\cdot B=0$, hence the clock variation is zero. The transmitter variation is also zero, and $F^{(1)}=-\lambda B/d^2$. The normal equation is therefore

$$
f_\rho(k)=k(k+1)+\frac\lambda{d^2}(1-\rho\lambda^{k+1})=0.
$$

The following controls follow from differentiating genuine transformations of the admitted complete solution:

| Transformation | Sector | Similarity exponent |
| --- | --- | --- |
| Constant spatial translation normal to the plane | Common normal | $-1$ |
| Constant spatial translation within the plane | Common planar | $-1\pm i\omega$ |
| Rotation about the spiral axis | Relative planar | $0$ |
| Shift of physical time origin | Relative planar | $-1$ |
| Two tilts of the spiral plane | Relative normal | $\pm i\omega$ |

For example, a time-origin shift has physical tangent $q'$, which becomes $t^{-1}(I+\Omega)A$ in similarity coordinates. The axial rotation has constant similarity tangent $JA$. A tilt has normal physical component proportional to $t\cos(\omega\tau)$ or $t\sin(\omega\tau)$, giving the stated imaginary normal exponents.

The normal tilt identities can also be checked algebraically. At $k=i\omega$, the real part of $f_-$ vanishes by $d^2\omega^2=\lambda(1+\lambda\cos\delta)$; its imaginary part vanishes by $d^2\omega=\lambda^2\sin\delta$, which follows from both balance equations. The common normal translation follows immediately from $\lambda^{k+1}=1$.

Spatial/time dilation $q(T)\mapsto bq(T/b)$ preserves this fixed inverse-distance equation. On this particular spiral its infinitesimal tangent is $q-Tq'=q'-\Omega q$, the sum of the time-origin tangent and a negative axial-rotation tangent. It supplies no additional independent exponent. A common constant physical velocity shift is not a symmetry premise.

## Audit of the reduced determinant

To check the subject's second derivation, rotate the receiving planar basis to $(n,Jn)$. At balance $n=(\omega,-1)/\sqrt{1+\omega^2}$. Write $w=(d/\lambda,m)$ in this basis. Direct projection, together with the magnitude balance, gives $m=\lambda\cos\delta/(\omega d)$.

For $B=(I-\rho\lambda^{k+1}P)x$, the clock variation is $-\lambda B_n$. Therefore

$$
C_n^{(1)}=\lambda B_n,\qquad
C_m^{(1)}=B_m-\lambda mB_n.
$$

The direction variation has only its $m$ component. Substituting the physical source-velocity variation gives

$$
D^{(1)}=\frac m d B_m
+\left(\omega m-\frac{\lambda m^2}d\right)B_n
-\rho\lambda^k\{P[(k+1)I+\Omega]x\}_n.
$$

Inserting this into the independently derived response gives

$$
F^{(1)}=KB-\frac{\rho\lambda^{k+2}}d e_1e_1^{\mathsf T}P[(k+1)I+\Omega]x,
$$

where the three entries of $K$ are exactly those displayed in the growth subject. In particular its off-diagonal entries both equal $\lambda^2m/d^2$. This verifies the sign and power of the separate clock/velocity term and the complete reduced determinant. The simplifications are legitimate at the exact balance zero; their analytic extension across the parameter rectangle is an enclosure device, not an assertion that every parameter pair is balanced.

## Subject arithmetic audit and independent certificate

The subject's rational-grid interval operations round lower endpoints down and upper endpoints up after each operation. Signed products and reciprocals have the required containment. Its powers use repeated interval multiplication, which can widen bounds but preserves containment. Degree-80 real Taylor polynomials on $|x|\le2$ with remainders $9\,2^{81}/81!$ for the exponential and $2^{81}/81!$ for sine and cosine are valid. The derivatives of sine and cosine are bounded by one on the real axis; $e^2<9$ bounds the exponential derivative. Complex exponentiation through real exponential, sine and cosine therefore encloses its exact value. The complex automatic sum, product, quotient and exponential rules are correct.

The interval representation of the subject's rational complex preconditioner has positive width, but contains its exact rational value. Proving the inequalities for that enclosure proves them for the fixed contained value. Multiplication by a complex scalar $c$ has real $2\times2$ infinity norm $|\Re c|+|\Im c|$, so the stated norm controls the real-square contraction. For every fixed parameter pair in the full admitted rectangle, the determinant is holomorphic in $k$, and the complex derivative controls its real derivative along line segments. The subject's theorem is therefore a valid sufficient certificate, provided its assertions pass; it is not a count from a finite root search.

The independent instrument takes a different matrix route. It computes $a=(1-\lambda)/|1+\lambda e^{-i\delta}|$, the actual Cartesian $n,w,D=1+n\cdot w$, and every clock/response variation above for each Cartesian basis vector. It then subtracts those columns from the exact transformed kinematic matrix. It uses no $K$ formula and no balance-based denominator simplification. This Cartesian determinant equals the reduced determinant at the exact admitted zero; off that zero the two extensions may differ, which is harmless because the full parameter rectangle contains the actual base.

Its real transcendental bounds use scalar alternating-series endpoint enclosures and monotonicity on $[-1.57,1.57]$ for sine/cosine, including the maximum of cosine at zero when needed. This interval lies strictly inside $(-\pi/2,\pi/2)$. The positive exponential remainder after degree 60 is bounded by its first omitted term divided by $1-x/62$; negative arguments use reciprocal bounds. Every arithmetic operation rounds outward onto a rational $10^{-40}$ grid. The complex derivative is propagated independently by first-order jets through the Cartesian differential.

Known controls were run and recorded before the target. Beyond arithmetic and derivative controls, a fixed radial similarity pair with $a=1/5$, $\lambda=2/3$, $\omega=0$ gives, at $k=0$, the exact planar characteristic matrices

$$
M_-(0)=\operatorname{diag}(-25/2,25/2),\qquad
M_+(0)=\operatorname{diag}(0,5/2).
$$

These follow by direct implicit-root differentiation of that known geometry and were enclosed by the independent matrix implementation. The geometry is a differential control, not an acceleration equilibrium. The known run also enclosed the actual balanced axial and time-origin determinant zeros at $k=0,-1$ before the new root was evaluated.

**Measured independent exact-arithmetic result:** over the entire admitted parameter rectangle and the frozen root square of radius $10^{-5}$, the Cartesian reference gives

$$
\|I-bf'(Q)\|_\infty<0.000160,\qquad
\|bf(k_0)\|_\infty<2.161\times10^{-8},
$$

$$
\text{image radius}<2.321\times10^{-8}<10^{-5}.
$$

The independent fixed rational preconditioner is

$$
b=\frac{-1932220960000+3241208280000i}{355972723815097}.
$$

All admission inequalities used exact rational endpoints, not floating-point summaries. The self-map contraction proves a unique determinant zero in the square for each fixed parameter pair. In particular at the exact admitted balance parameters,

$$
\Re k\in[0.0138698363660541,0.0138898363660541],
$$

$$
\Im k\in[3.2269327188404713,3.2269527188404713].
$$

Its real part is positive. The derivative contraction also excludes $f'(k)=0$ there, so the determinant zero is simple. Real coefficients supply the conjugate root. No conclusion about the rest of the characteristic spectrum is inferred.

## Complete compatible-history tangent

The mode solves the constant-delay linearized equation in similarity time with history prescribed on $[\log\lambda,0]$. In physical coordinates its variation on the retained analytic segment is

$$
\eta_+(T)=(1+T)e^{\Omega\log(1+T)}(1+T)^k x,\qquad
\eta_-=-\eta_+.
$$

Take real and imaginary parts for real history variations. Extend their value, first derivative and second derivative smoothly across a compact interval before $S_c=\lambda-1$, setting them to zero on the earlier held tail. Matching these finite jets can be done by polynomial interpolation. The variation then has bounded complete-past velocity and compact support away from the remote held tail. Sufficiently small amplitude preserves the base's strict speed margin and positive separation.

At release, a nearby root may move slightly to either side of $S_c$. This causes no missing term: the base preparation is $C^{2,1}$ and matches the analytic position, velocity and acceleration at that seam. The clock derivative therefore uses the same base jets on either side, while the extended variation matches its analytic jets there. Every future base source with $T>0$ lies later than $S_c$.

Let $\mathcal M(\alpha)$ be the exact release acceleration mismatch of the raw amplitude-$\alpha$ perturbed history. The root and response are continuously differentiable on this regular history neighborhood, and the characteristic equation gives $\mathcal M(0)=\mathcal M'(0)=0$. Thus $\mathcal M(\alpha)=o(\alpha)$. Choose a fixed endpoint patch width smaller than the uniform separation between release and all nearby release sources. A scalar patch with zero old-end jets and release jets $(0,0,1)$, multiplied by $\mathcal M(\alpha)$ with the correcting sign, changes release acceleration by the exact mismatch while preserving release position and velocity.

This correction changes no sampled release source because its support lies strictly after all those sources; complete root uniqueness prevents a hidden replacement root in the patch. Consequently compatibility is exact, not merely first order. Since the fixed patch's $C^2$ norm is finite, its $o(\alpha)$ coefficient preserves the original tangent in the history norm. This proves realization by actual complete compatible histories. It does not claim that their nonlinear future follows a modal ansatz.

For every finite future interval, the base retains positive separation, source delay, complete history coverage and a strict transmitter margin. The causal equation has differentiable dependence on these regular compatible histories, obtainable by the implicit root derivative and successive local evolution. The displayed mode is therefore the actual finite-time variational solution along the base, rather than a formal perturbation with no admissible initial tangent.

## Relative growth and what remains unresolved

In similarity phase coordinates the mode has envelope $e^{\Re k\tau}=t^{\Re k}$. In physical position it has envelope $t^{1+\Re k}$; rotation preserves its norm. The corresponding physical velocity variation has envelope $t^{\Re k}$. Real modal positions can have oscillatory zeros, so the growth statement concerns their envelope or the full similarity phase state, not a monotone pointwise coordinate.

The certified exponents are distinct from every listed symmetry exponent, all of which have real part zero or minus one. The growing linearized history therefore cannot be removed by a fixed combination of translation, rotation, tilt, time-origin and scale tangents. This is genuine growth relative to the expanding solution, rather than absolute displacement growth already caused by its background radius. A fixed small finite-amplitude approximation eventually requires nonlinear analysis; nothing here certifies its all-future speed margin, root census or terminal behavior.

## Reproduction, falsifiers and disposition

Using fresh receipt names when the retained ones already exist, run the known case before the target:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-independent.py --out .local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-independent-known.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-independent.py --target --known .local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-independent-known.json --out .local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-independent-target.json
```

Load-bearing falsifiers are an omitted clock or physical source-velocity variation, failure of the normal or symmetry identities at the exact balance, a noncontaining interval operation or scalar remainder, a root certificate that fails to cover the full parameter rectangle, or failure of the compatible endpoint correction to preserve the modal tangent. A nonlinear bounded trajectory or a different fate after departure would not refute this linear result. An unsampled additional growing mode would extend the spectrum, not invalidate the one proved here.

Measured repository validation: `git diff --no-index --check /dev/null` returned no whitespace diagnostics for the two new authored files. Repeated `shasum -a 256` returned the four frozen subject identities and the independent-reference identity recorded above. These checks establish repository facts only; the analytical reconstruction and exact-arithmetic target supply the scientific evidence.

Only this assessment, its separate independent evidence source and two matching local receipts are authored in this review. Subjects, their instruments, previous references, shared manuscripts, ledgers and priorities are outside its write scope. No production solver, publication or generator is changed. Both reference runs completed in the foreground and no owned process remains active. This bounded assessment is complete and returns shared integration to the principal investigator.
