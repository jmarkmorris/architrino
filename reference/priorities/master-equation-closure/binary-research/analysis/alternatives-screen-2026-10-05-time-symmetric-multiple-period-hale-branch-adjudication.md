# Post-disclosure assessment of the stronger multiple-period branch

**Derived admission:** the two-level construction proves a locally unique $C^1$ nontrivial branch in the selected reversible, planar, antipodal periodic profile space, for each sufficiently large fixed integer $k$. Every sufficiently small nonzero branch member has genuinely noncircular shape and labeled fundamental period equal to the nominated $k$-fold circle period. No nonlinear stability or uniqueness outside that symmetry class follows.

This is an adversarial assessment after reading the independently frozen [Poincare source](alternatives-screen-2026-10-05-time-symmetric-multiple-period-independent.md), SHA-256 7edcaee5928b3bcd4ed80902c1fec15f452fd25564171d1199342cc035d5e8d3. It is distinct from the earlier [Hale C1 existence assessment](alternatives-screen-2026-10-05-time-symmetric-multiple-period-hale-adjudication.md), SHA-256 de1ee5d29d9642ffddd68d2ad1daaecc04773af4fe94c7c9a7dc01cd8752a11e, which was independently reconstructed before reading this stronger source and asserted only amplitude-by-amplitude existence. Both antecedents are preserved unchanged. The stronger result below uses the additional two-level regularity proof, not an inference from the earlier existence claim.

## 1. Exact functional setting

The law remains the selected equal half-weight past/future canonical radial acceleration with $K=c_f=1$ and opposite polarities. Work in the fixed phase $s=\nu(\beta)T$, of period $2\pi$, where $\nu=\omega/k$. The trivial physical profile is $Y_\beta(s)=R(\beta)(\cos ks,\sin ks)$ and the second label is $-Y$. Reversibility is $Y(-s)=E Y(s)$ with $E=\operatorname{diag}(1,-1)$.

The complete periodic source roots satisfy $d_\varepsilon=\nu|Y(s)+Y(s+\varepsilon d_\varepsilon)|$. On a neighborhood with $\nu\|Y'\|_\infty\le b<1$ and $|Y|\ge r_0>0$, the global chord inequality makes each root function strictly increasing in age, including intermediate points where a nonroot chord could vanish. It has exactly one positive partner root in each time direction. At the roots the chord is nonzero and $D_\varepsilon\ge1-b>0$. The same chord inequality excludes all nonzero-age self roots. This covers the complete repeated periodic past and future.

The nonlinear residual is

$$
\mathcal F(Y,\beta)=\nu(\beta)^2Y''
+\frac12\sum_{\varepsilon=\pm1}
\frac{n_\varepsilon}{\ell_\varepsilon^2D_\varepsilon}.
$$

It preserves the stated mirror, planar and reversal restrictions by exact covariance. Solving it in this space solves all original Cartesian rows; no unmatched projected equation is discarded.

Use $X_0=C^2_{\rm per,rev}$, $Z_0=C^0_{\rm per,rev}$, $X_1=C^3_{\rm per,rev}$ and $Z_1=C^1_{\rm per,rev}$. The physical circle and all fixed kernel/projection vectors are smooth and lie in both levels.

## 2. Composition estimates at exactly the required levels

For $E(f,z)(s)=f(s+z(s))$,

$$
DE(f,z)[h,v]=h(s+z)+f'(s+z)v,
$$

and

$$
D^2E(f,z)[(h_1,v_1),(h_2,v_2)]
=h_1'(s+z)v_2+h_2'(s+z)v_1+f''(s+z)v_1v_2.
$$

The first formula defines a continuous Frechet derivative $C^1\times C^0\to C^0$. For the increment in the shift, the remainder is bounded by the shift size times the modulus of continuity of the fixed $f'$, plus $\|h'\|_\infty\|v\|_\infty$. The second formula is a continuous second derivative $C^2\times C^0\to C^0$: the fixed $f''$ is uniformly continuous, and the derivatives of unit-$C^2$ test increments are uniformly Lipschitz.

At the intermediate level, $E:C^2\times C^1\to C^1$ is $C^1$. Differentiating the first formula in $s$ gives

$$
h'(s+z)(1+z')
+f''(s+z)(1+z')v+f'(s+z)v'.
$$

Each term is continuous in the required operator norm. In particular, the remainder in the differentiated base-profile term is controlled by the modulus of continuity of $f''$; the test-increment shift error is controlled by $\|h''\|_\infty\|v\|_{C^1}$. A third derivative of $f$ is unnecessary here.

Apply the implicit-function theorem to the root equation in $C^0$ or $C^1$, respectively. Its age derivative is multiplication by $D_\varepsilon$, invertible at either level because of the positive floor and the corresponding regularity. Root uniqueness identifies the resulting graphs. Applying the composition estimates to $f=Y'$ proves exactly

$$
\mathcal F:X_0\times\mathbb R\to Z_0\text{ is }C^1,\qquad
\mathcal F:X_1\times\mathbb R\to Z_1\text{ is }C^1,\qquad
\mathcal F:X_1\times\mathbb R\to Z_0\text{ is }C^2.
$$

All parameter dependence through $\nu(\beta)$ is smooth. The velocity variation retains the shift term $\varepsilon\nu Y_j''(S)\delta d_\varepsilon$, as well as $\delta\nu\,Y_j'(S)$ and $\nu h_j'(S)$. Thus the source-acceleration term from the full physical derivative is present. These statements do not assert $C^2:X_0\to Z_0$.

## 3. Compatible low and high complement inverses

At the resonant circle, the linearization is $\nu_k^2\partial_s^2$ plus a smooth lower-order operator using values and first derivatives at fixed shifts. The lower-order part is compact from $C^2$ to $C^0$. Conjugation by $Q(ks)$ gives the admitted Hermitian Fourier blocks. Reversal removes the phase mode and selects one real vector $\phi$ at harmonic $k-1$; the complete frequency theorem excludes other kernels.

Normalize $\phi$ in real $L^2$. Formal symmetry on trigonometric polynomials, extended by periodic $C^2$ approximation, gives $\langle\phi,Lu\rangle=0$. Fredholm index zero then identifies the exact range as $\phi^\perp$. This gives the low complement inverse $Z_0\cap\phi^\perp\to X_0\cap\phi^\perp$.

The source's Fourier construction supplies the same inverse directly: finitely many noncritical blocks are invertible, the noncritical part of the critical block is invertible, and the inverse tail is $O(j^{-2})$ for fixed $k$. Therefore an $L^2$ right-hand side orthogonal to $\phi$ has a unique orthogonal $H^2$ solution. The Fourier Cauchy–Schwarz estimate makes its first-derivative series absolutely convergent, hence the solution is $C^1$. Its equation then yields $u''\in C^0$, establishing the bounded $C^0\to C^2$ inverse.

For a $C^1$ right-hand side, this $C^2$ solution makes the lower-order expression $C^1$, so $u''\in C^1$. It is the same solution in $C^3$, with a bounded $C^1\to C^3$ inverse. Both restrictions use the same orthogonal projection and kernel. Constants may depend on the fixed $k$.

## 4. Why the two-level difference quotient is valid

Translate the trivial circle family and let $\mathcal R(w,p)$ be the projected range residual, where $p=(a,\beta)$ and $w\perp\phi$. The low-level implicit-function theorem gives a unique local $C^1$ map $w(p)$ into $X_0$. The high-level theorem gives a $C^1$ map into $X_1$. Shrink the high-level parameter neighborhood so its solution lies in the low-level uniqueness neighborhood. The two maps are then identical. In particular, each first parameter derivative $w_i(p)$ is a vector of $X_1$, continuously depending on $p$ in that norm.

Let $B(p)=D_w\mathcal R(w(p),p)$ as an operator from the low complement to the low codomain complement. It is operator-norm continuous and locally invertible there. First differentiation gives

$$
B(p)w_i(p)+\mathcal R_i(w(p),p)=0.
$$

Subtract at $p$ and $p+he_j$:

$$
B(p+he_j)\frac{w_i(p+he_j)-w_i(p)}h
=-\frac{B(p+he_j)-B(p)}h\,w_i(p)
-\frac{\mathcal R_i(w(p+he_j),p+he_j)-\mathcal R_i(w(p),p)}h.
$$

The first right-hand quotient acts on the fixed high-space vector $w_i(p)$. The high-to-low $C^2$ property and the high-space $C^1$ solution curve therefore give its limit in $Z_0$. They also give the second quotient's limit. No derivative of $B$ in the operator norm $X_0\to Z_0$ is asserted or needed.

Applying the continuous low inverse proves the second parameter derivative in $X_0$. Its continuity follows from continuity of the high-to-low second derivative, the high-space first derivatives of $w$, and the low inverse. Finite-dimensional parameter calculus then gives $w\in C^2(p;X_0)$ while retaining $w\in C^1(p;X_1)$.

The scalar residual is consequently $C^2$: its second derivative pairs the high-space first derivatives with $D^2\mathcal F$, and the low-space second derivative of $w$ with $D\mathcal F$. This is a genuine gain along the finite-dimensional solution set. It does not contradict the lower differentiability of the original nonlinear map on all of $X_0$.

## 5. Unique local branch

Write the scalar residual as $h(a,\beta)$, with $h(0,\beta)=0$. Then

$$
g(a,\beta)=\int_0^1h_a(ta,\beta)\,dt
$$

is $C^1$ and $h=ag$. At resonance the mixed derivative is the fixed-kernel-vector pairing $\langle\phi,L'_{\beta_k}\phi\rangle$, since range terms are annihilated. This derivative is legitimate at the high-to-low level, or directly on the finite Fourier block; full low-operator analyticity is not used.

The admitted simple frequency crossing gives $g_\beta(0,\beta_k)\ne0$. The ordinary finite-dimensional implicit-function theorem, equivalently strict local monotonicity plus difference quotients, supplies one nearby $C^1$ root $\beta(a)$ for each sufficiently small amplitude. The complete solution profile is $C^1$ into $C^3$.

Local uniqueness means that, in the declared symmetry space and projection chart, all nearby solutions consist of the trivial circle family and this amplitude-parametrized nontrivial branch. It does not mean uniqueness among arbitrary mirror-breaking, nonplanar or differently normalized histories. The proof supplies no uniform neighborhood as $k\to\infty$.

Each individual profile is smooth: a $C^r$ profile, $r\ge2$, has a $C^r$ phase root graph and a $C^{r-1}$ acceleration expression; the equation improves the profile to $C^{r+1}$. Iteration preserves the positive root and separation margins.

## 6. Shape and labeled fundamental period

Let $n=k-1$ and choose the resonant rotating vector $(\cos ns,-b_k\sin ns)$, where $b_k\to2$. Its physical complex planar profile is

$$
e^{iks}(\cos ns-i b_k\sin ns)
=\frac{1+b_k}{2}e^{is}
+\frac{1-b_k}{2}e^{i(2k-1)s}.
$$

For sufficiently large $k$ both coefficients are nonzero. Since $w(a,\beta(a))=o(a)$ and the circle profile has only harmonic $k$, the nonlinear profile's first Fourier coefficient is a nonzero constant times $a+o(a)$. Any period $p$ of that profile must satisfy $e^{ip}=1$ by translation of this coefficient. Hence its labeled fundamental phase period is exactly $2\pi$, and its labeled physical fundamental period is $2\pi/\nu(\beta(a))=kT(\beta(a))$. An unlabeled exchange period is a different question and is not silently identified with this one.

The shape proof also holds. The three chosen base-circle points are noncollinear, so their circumcenter is a smooth function of the nearby profile. Along the branch it has the form $aC_1+o(a)$ because the circle family's circumcenter is identically zero. The leading nonconstant harmonic in $|Y|^2$ is $k-1$. Subtraction of the center contributes at first order only harmonic $k$, and cannot cancel it. Thus the squared distance from the circumcenter is nonconstant. Any geometrical circle containing the profile would have that circumcenter, a contradiction. This excludes an arbitrary shifted center and nonuniform parametrization, not merely circles centered at the origin.

## 7. Final scope and falsifiers

The stronger branch, shape and labeled minimal-period assertions are admitted for the source's sufficiently large fixed integers. The source's two-level proof is the additional premise distinguishing this admission from the earlier weaker Hale existence result.

The concrete $k=10$ case is also admitted after a separate coefficient check. The [independent resonance certificate](time-symmetric-resonance10-moore-adjudication.md) already proves the physical parameter margin, complete spectral resonance, nonzero parameter crossing and nonzero radial coefficient. Its retained complete-bracket intervals have both $d<0$ and $f<0$. Using the null vector $(d,if)$, the physical first harmonic is $(d+f)/2$, whose strict negative upper bound was checked directly from those exact rational receipt endpoints after an elementary known control. Therefore every additional hypothesis of the stronger argument holds at this concrete resonance. The all-speed frequency theorem supplies the kernel census in place of a small-speed asymptotic assumption. This gives a locally unique $C^1$ branch, genuinely noncircular profiles and labeled fundamental period $20\pi/\omega(\beta(a))$ near $\beta_{10}\in[0.5359185451,0.5359185463]$, still without an explicit nonlinear amplitude radius or stability assertion.

No numerical target was run, no Poincare or coordinator source was modified, and no shared owner was edited. Falsifiers are failure of a stated composition operator-norm estimate; noncoincidence of the two complement inverses or projected solutions; a right-hand quotient in Section 4 that does not converge in $Z_0$; an extra reversible kernel or wrong range annihilator; zero scalar transversality; a vanishing first-harmonic coefficient; or a failure of the circumcenter harmonic separation. Stability, global continuation and causal initial-value selection remain separate obligations.
