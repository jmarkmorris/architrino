# Full Cartesian local classification at a transverse multiple-period resonance

Status: independently derived analytical candidate, 2026-10-05, under the [frozen Cartesian protocol](alternatives-screen-2026-10-05-time-symmetric-multiple-period-cartesian-protocol.md). The coordinator's prospective full Cartesian classification argument was not read before this source was frozen. The earlier branch source and every antecedent remain unchanged. Independent assessment is required before integration.

**Derived conclusion.** At any fixed transverse rational resonance specified below, every sufficiently nearby complete classical periodic binary, allowing its nominated period to vary locally, is either a circle or, modulo a constant Euclidean transformation and time phase, a member of a single small planar, antipodal, reversible noncircular branch. There is no additional local nonmirror or nonplanar branch. The proof uses uniqueness of the full projected range solution and exact symmetries of that equation; it does not assume that Euclidean covariance alone annihilates the missing range equations.

This is a local classification of complete periodic boundary solutions of the selected equal-past/future equation. It is not a stability, causal release or initial-value theorem. The neighborhood and amplitude bound depend on the chosen resonance. Periods outside the selected neighborhood are not classified.

## 1. Exact case and transverse hypothesis

Use precisely Section 14 of [the binary source](alternatives-screen-2026-10-05-binary.md), with opposite polarities, equal half weights for past and future, and $K=c_f=1$. Set

$$
x=\beta\cos x,\qquad c=\cos x,\qquad D=1+\beta\sin x,\qquad R=(4\beta^2cD)^{-1},\qquad \omega=\beta/R.
$$

The balanced physical circle is $X_1(t)=R(\cos\omega t,\sin\omega t,0)$ and $X_2=-X_1$. Its complete partner ages are $2x/\omega$ in each direction; no positive-age self root exists. Its physical fundamental period is $T(\beta)=2\pi/\omega(\beta)$.

Fix integers $k>j>0$ and a speed $0<\beta_0<1$ satisfying

$$
m_*(\beta_0)=\frac jk,\qquad m_*'(\beta_0)\ne0.
\tag{1}
$$

Here $m_*$ is the unique positive opposite planar frequency in the [complete all-speed classification](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-classification.md), independently admitted in its [complete assessment](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-complete-adjudication.md). The derivative condition in (1) is a hypothesis at the chosen resonance, not an unproved global speed-monotonicity claim. For $j=k-1$, all sufficiently large $k$ satisfy it by the independently assessed small-speed branch. The [separate ten-period certificate](time-symmetric-resonance10-moore-adjudication.md) supplies the concrete case $j=9,k=10$, with $0.5359185451\le\beta_0\le0.5359185463$ and a strictly positive fixed-frequency parameter derivative.

Put $\nu(\beta)=\omega(\beta)/k$, $s=\nu t$, and

$$
q_k(s)=(\cos ks,\sin ks,0),\qquad Q_\beta(s)=(R(\beta)q_k(s),-R(\beta)q_k(s)).
$$

Profiles have nominated phase period $2\pi$. This includes every physical period sufficiently near $kT(\beta_0)$: direct differentiation gives

$$
\frac{\omega'}\omega=\frac3\beta+\frac{\beta c^2}{D^2}>0,
$$

so $\beta\mapsto2\pi/\nu(\beta)$ is a local smooth coordinate for the nominated period. On a noncircular solution $\beta$ labels this frequency, not its pointwise physical speed.

## 2. Complete full Cartesian root chart

Initially impose no mirror, plane or reversal constraint. Let $Y=(Y_1,Y_2)\in C^2_{\rm per}(\mathbb R/2\pi\mathbb Z;\mathbb R^6)$ be close to $Q_{\beta_0}$, extended to the whole line. Choose the open chart so that

$$
\min_s|Y_1(s)-Y_2(s)|\ge d_0>0,\qquad
\nu\max_i\|Y_i'\|_\infty\le b<1,\qquad
\max_i\|Y_i\|_\infty\le M.
$$

For $i\ne l$ and $\varepsilon=\pm1$, the source phase is $S=s+\varepsilon\delta_{il\varepsilon}(s)$, where

$$
\delta=\nu|Y_i(s)-Y_l(s+\varepsilon\delta)|.
\tag{2}
$$

The root function is strictly increasing with increment at least $(1-b)$ times the age increment, by the global source chord bound. This remains true at intermediate ages where a chord vanishes. It is negative at zero and tends to positive infinity because the profiles are bounded. Consequently each source direction has exactly one positive root, including all possible repeated-period ages. With $B=Y_i-Y_l(S)$, $\ell=|B|$, $n=B/\ell$ and $v=\nu Y_l'(S)$,

$$
\frac{\nu d_0}{1+b}\le\delta\le2\nu M,\qquad
D_\varepsilon=1+\varepsilon n\cdot v\ge1-b.
\tag{3}
$$

The lower bound follows from $\ell\ge d_0-b\delta/\nu$. Every nonzero-age self root is excluded by $\nu|Y_i(s)-Y_i(s+\varepsilon\delta)|\le b\delta<\delta$. The treatment of the zero-age diagonal is precisely the selected law's existing convention; no new diagonal contribution or exclusion is introduced.

Define the full residual, with the partner index $l=3-i$,

$$
\mathcal F_i(Y,\beta)=\nu(\beta)^2Y_i''+\frac12\sum_{\varepsilon=\pm1}\frac{n_{il\varepsilon}}{\ell_{il\varepsilon}^2D_{il\varepsilon}}.
\tag{4}
$$

Its zeros solve all six Cartesian acceleration equations on the complete all-time histories. Circle balance gives $\mathcal F(Q_\beta,\beta)=0$ exactly.

For increments $(h,\dot\nu)$, implicit differentiation retains the full source clock:

$$
\dot\delta=\frac{\ell\dot\nu+\nu n\cdot[h_i(s)-h_l(S)]}{D_\varepsilon},\qquad
\dot B=h_i-h_l(S)-\varepsilon Y_l'(S)\dot\delta,
$$

$$
\dot v=\dot\nu Y_l'(S)+\nu h_l'(S)+\varepsilon\nu Y_l''(S)\dot\delta.
\tag{5}
$$

The last term is the physical source acceleration times the physical source-time shift. With $P_n=I-nn^{\mathsf T}$,

$$
\dot n=P_n\dot B/\ell,\quad
\dot D_\varepsilon=\varepsilon(\dot n\cdot v+n\cdot\dot v),\quad
\delta\!\left(\frac n{\ell^2D_\varepsilon}\right)
=\frac{(I-3nn^{\mathsf T})\dot B}{\ell^3D_\varepsilon}
-\frac{n\dot D_\varepsilon}{\ell^2D_\varepsilon^2}.
\tag{6}
$$

Equations (5)–(6), together with $\delta(\nu^2Y_i'')=\nu^2h_i''+2\nu\dot\nu Y_i''$, recover the complete Cartesian tensor used in the spectral antecedents. Neither source velocities nor source accelerations are frozen during differentiation.

## 3. Differentiability and the complete linear range

Let $X_r=C^{r+2}_{\rm per}(\mathbb R^6)$ and $Z_r=C^r_{\rm per}(\mathbb R^6)$ for $r=0,1$. On the chart (3),

$$
\mathcal F:X_0\times\mathbb R\to Z_0\text{ is }C^1,\qquad
\mathcal F:X_1\times\mathbb R\to Z_1\text{ is }C^1,\qquad
\mathcal F:X_1\times\mathbb R\to Z_0\text{ is }C^2.
\tag{7}
$$

These are full Cartesian statements. For composition $E(f,z)=f(s+z(s))$, its first derivative is $h(s+z)+f'(s+z)v$, and its second is $h_1'(s+z)v_2+h_2'(s+z)v_1+f''(s+z)v_1v_2$. Taylor remainders use uniform continuity of the fixed highest derivative and the uniform derivative bound on increments. This proves respectively $C^1:C^1\times C^0\to C^0$, $C^1:C^2\times C^1\to C^1$ and $C^2:C^2\times C^0\to C^0$. Applying these to the source velocity $Y_l'$ gives (7). The implicit age derivative is multiplication by $D_\varepsilon$, boundedly invertible on the relevant $C^0$ or $C^1$ space. Positive range makes the norm and direction operations smooth. This is the same finite-level argument independently checked in the [stronger branch assessment](alternatives-screen-2026-10-05-time-symmetric-multiple-period-hale-branch-adjudication.md), with six unrestricted components. No $C^2:X_0\to Z_0$ or analytic low-operator family is assumed.

Translate the trivial family: $\widetilde{\mathcal F}(u,\beta)=\mathcal F(Q_\beta+u,\beta)$. At $(0,\beta_0)$ write $L=D_u\widetilde{\mathcal F}$. The complete real-frequency and normal theorems give

$$
K:=\ker L=\mathcal E\oplus V,\qquad \dim\mathcal E=6,\quad\dim V=2.
\tag{8}
$$

Here $\mathcal E$ consists of three constant translations and three infinitesimal spatial rotations of $Q_{\beta_0}$; the two-dimensional $V$ is the opposite planar mode at rotating harmonic $j$. The two subspaces are orthogonal for the normalized real $L^2$ pairing of both labels. Secular generalized modes are not periodic and contribute no kernel vectors. The space $\mathcal E$ is independent of $\beta$ near $\beta_0$, since changing $R$ only rescales its rotational vectors.

The complete Hermitian planar blocks and real normal blocks make $L$ symmetric in this pairing. Its leading term is $\nu_0^2\partial_s^2$, and its remainder is bounded $C^1\to C^0$, hence compact $C^2\to C^0$. The exact range and complement inverse are

$$
\operatorname{Ran}L=Z_0\cap K^\perp,\qquad
L:X_0\cap K^\perp\longrightarrow Z_0\cap K^\perp
\quad\hbox{boundedly invertible}.
\tag{9}
$$

For an explicit completeness argument, rotate by the fixed factor $Q(ks)$ and solve every Fourier block, omitting only its kernel projection. All remaining finite blocks are invertible; the complete large-frequency bound gives inverse size $O(n^{-2})$ as the integer harmonic $n$ tends to infinity. This yields an $H^2$ solution for every $L^2$ right-hand side orthogonal to $K$. Its first derivative Fourier series is absolutely convergent by Cauchy–Schwarz and $\sum n^{-2}<\infty$. Thus it is $C^1$; its equation improves it to $C^2$ for continuous data, with a bounded $C^0\to C^2$ inverse. Symmetry proves the reverse range inclusion. For $C^1$ data the lower-order expression is $C^1$, so the same solution is $C^3$, with bounded $C^1\to C^3$ inverse. This also verifies closed range without a Fourier truncation.

## 4. Euclidean slice and unique full range completion

Use the slice $u\perp\mathcal E$. Every sufficiently nearby profile can be put uniquely in this slice by a Euclidean transformation sufficiently near the identity. Indeed the six equations $\langle gY-Q_\beta,e_a\rangle=0$, for a basis $e_a$ of $\mathcal E$, have derivative in the six translation/rotation coordinates equal, up to invertible basis rescaling and sign, to the Euclidean orbit Gram matrix. Translations are independent; rotations about the three axes give respectively opposite normal sine, opposite normal cosine and opposite planar tangent profiles. These six vectors are independent at every positive $R$, so the Gram matrix is positive definite. Finite-dimensional inversion gives the stated local slice. This does not quotient out any equation.

Let $P_K$ be the fixed $L^2$ orthogonal projection onto (8). In the slice write $u=z+w$, $z\in V$, $w\in X_0\cap K^\perp$. Solve

$$
(I-P_K)\widetilde{\mathcal F}(z+w,\beta)=0.
\tag{10}
$$

The inverse (9) and derivative continuity make $w\mapsto w-L^{-1}(I-P_K)\widetilde{\mathcal F}(z+w,\beta)$ a contraction on a sufficiently small ball, uniformly for sufficiently small $(z,\beta-\beta_0)$. Thus (10) has exactly one nearby completion $w=w(z,\beta)$, jointly $C^1$ into $X_0$. It satisfies $w(0,\beta)=0$ and $D_zw(0,\beta_0)=0$. Every full solution in the slice must have exactly this completion.

Repeating the construction on $X_1\to Z_1$ and using low-level uniqueness identifies the high-level solution with the same $w$, which is therefore $C^1$ into $C^3$. It is $C^2$ into $C^2$ along the finite-dimensional parameters. To see this last assertion without low-operator differentiability, let $B(p)$ be the low range derivative in $w$, $p=(z,\beta)$. Differentiating once gives $B(p)w_i(p)+\mathcal R_i(p)=0$. Subtraction at $p$ and $p+he_l$ gives

$$
B(p+he_l)\frac{w_i(p+he_l)-w_i(p)}h
=-\frac{B(p+he_l)-B(p)}h\,w_i(p)
-\frac{\mathcal R_i(p+he_l)-\mathcal R_i(p)}h.
\tag{11}
$$

The fixed vector $w_i(p)$ belongs to $C^3$ and the parameter curve is $C^1$ there. The high-to-low $C^2$ property in (7) gives convergence of both right-hand quotients in $C^0$. The continuous low inverse then gives continuous second derivatives into $C^2$. No derivative of $B$ in the norm $C^2\to C^0$ was used. Consequently every finite-dimensional component of the remaining residual is $C^2$.

## 5. Exact symmetry forces the full completion into the planar mirror space

The following actions fix every $Q_\beta$ and are orthogonal for the pairing:

$$
\mathcal A(Y_1,Y_2)=(-Y_2,-Y_1),\qquad
\mathcal ZY_i=\operatorname{diag}(1,1,-1)Y_i,
$$

$$
\mathcal RY_i(s)=E Y_i(-s),\quad E=\operatorname{diag}(1,-1,1),\qquad
\mathcal G_\alpha Y_i(s)=Q_z(-k\alpha)Y_i(s+\alpha).
\tag{12}
$$

The action $\mathcal A$ combines the label exchange symmetry with central inversion; both labels have the same opposite-polarity coupling. Orthogonal spatial transformations preserve ranges and dot products, so $\mathcal A$ and $\mathcal Z$ preserve (2)–(4). Time reflection in $\mathcal R$ interchanges $\varepsilon=+1$ and $-1$, reverses the physical source velocity, and preserves $D_\varepsilon$ after that interchange. Equal weights are essential. Time translation and spatial rotation prove covariance under $\mathcal G_\alpha$. These are exact full nonlinear covariances on complete histories.

Differentiating covariance at the fixed circle shows that each action preserves $K$; orthogonality then shows it commutes with $P_K$. They also preserve the Euclidean tangent space and hence the slice. The $C^2$ and $C^3$ norms can be chosen invariant under these actions. Uniqueness in (10) therefore implies

$$
w(gz,\beta)=g\,w(z,\beta)
\tag{13}
$$

for each action $g$ in (12). For $\mathcal G_\alpha$ this holds for every phase $\alpha$: the circle is fixed and the norm ball is invariant under this compact group, so the transformed completion remains in the same uniqueness ball.

Every vector of $V$ is opposite between labels and planar. Thus $\mathcal A z=z$ and $\mathcal Zz=z$ pointwise. Equations (13) force $\mathcal Aw=w$ and $\mathcal Zw=w$ for every critical coordinate $z$, before imposing any residual equation. Hence every range-completed profile obeys

$$
Y_2=-Y_1,\qquad Y_{1z}=Y_{2z}=0.
\tag{14}
$$

In particular every nearby full solution, after the Euclidean slice transformation, is exactly antipodal and planar. This excludes possible separate nonmirror or nonplanar local branches by uniqueness of the full range problem, not by merely observing their absence from the linear kernel.

## 6. Time phase, reversal and the remaining eight equations

Choose the real critical vector

$$
\phi_1(s)=Q_z(ks)(\cos js,-b_*\sin js,0),\qquad \phi_2=-\phi_1,
\tag{15}
$$

with a nonzero normalization understood. Its quadrature $\psi$ is the imaginary part of $Q_z(ks)(1,ib_*,0)e^{ijs}$, with the same opposite second label. They have equal norms and are orthogonal; normalize them to an orthonormal basis of $V$. Reversal fixes $\phi$ and negates $\psi$. The action $\mathcal G_\alpha$ multiplies the complex critical mode by $e^{ij\alpha}$, so it rotates the real critical plane transitively on its circles. Every nonzero $z\in V$ can therefore be transformed to $a\phi$, with $a=\|z\|>0$.

For $z=a\phi$, (13) also gives $\mathcal Rw=w$. Thus the entire profile lies in the fixed space

$$
\mathcal S=\operatorname{Fix}\mathcal A\cap\operatorname{Fix}\mathcal Z\cap\operatorname{Fix}\mathcal R.
$$

The full residual is in $\mathcal S$ by covariance. Equation (10) places it in $K$. Crucially,

$$
K\cap\mathcal S=\operatorname{span}\{\phi\}.
\tag{16}
$$

To check all omitted components: $\mathcal A$ removes all three common translations, $\mathcal Z$ removes both opposite normal tilts, and $\mathcal R$ removes the axial phase rotation and the critical quadrature. These account for seven of the eight kernel dimensions. Hence no Euclidean residual survives (16); the sole remaining equation is the scalar critical equation. This is the required range-complement argument. Euclidean invariance of the nonlinear law alone would not have proved it.

For $z=0$, range uniqueness gives $w=0$, so the solution is a circle. For $z\ne0$, the combined rotation and time translation above puts every possible full solution into precisely this reversible representative. Both operations are allowed by the quotient in the theorem.

## 7. Unique scalar branch and amplitude quotient

Define

$$
h(a,\beta)=\langle\phi,\widetilde{\mathcal F}(a\phi+w(a\phi,\beta),\beta)\rangle.
$$

The two-level argument makes $h$ $C^2$, and $h(0,\beta)=0$. Set

$$
q(a,\beta)=\int_0^1 h_a(ta,\beta)\,dt,\qquad h=a q.
$$

Then $q$ is $C^1$, $q(0,\beta_0)=0$, and

$$
q_\beta(0,\beta_0)=\langle\phi,L'_{\beta_0}\phi\rangle\ne0.
\tag{17}
$$

The pairing is evaluated on a fixed smooth Fourier vector. It does not assert differentiability of the whole low operator in its operator norm. To verify its nonzero value, write $F_-(m,\beta)=\det H_-(m,\beta)$. The unique positive root is simple in $m$, so

$$
\partial_\beta F_-(j/k,\beta_0)=-\partial_mF_-(j/k,\beta_0)m_*'(\beta_0)\ne0.
$$

The nonzero other eigenvalue converts this determinant derivative to a nonzero critical eigenvalue derivative. Multiplication by the positive physical factor $\omega(\beta)^2$ cannot change this at a zero eigenvalue. This proves (17).

Continuity keeps $q_\beta$ away from zero. Strict monotonicity and the intermediate value theorem therefore yield one and only one nearby parameter $\beta=B(a)$ for every sufficiently small $a$, with $B(0)=\beta_0$. Difference quotients give $B'=-q_a/q_\beta$, so $B$ is $C^1$. The branch

$$
Y(a)=Q_{B(a)}+a\phi+w(a\phi,B(a))
\tag{18}
$$

solves all of (4), by (16). It is $C^1$ into $C^3$; each individual solution is smooth by the equation and repeated source-graph regularity improvement.

The action $\mathcal G_{\pi/j}$ sends $\phi$ to $-\phi$. Equivariance and the scalar residual transformation imply $h(-a,\beta)=-h(a,\beta)$ and $q(-a,\beta)=q(a,\beta)$. Scalar uniqueness gives $B(-a)=B(a)$ and relates the two signed branches by the allowed phase/rotation action. Thus the nontrivial solutions modulo Euclidean transformations and time phase are represented by one half-branch $a>0$, in addition to the trivial circle family. In particular $B'(0)=0$. No sign or nonvanishing assertion about a higher period-shift coefficient is needed.

At a fixed nominated period, the nearby noncircular solutions are precisely the amplitudes with $B(a)$ equal to its frequency parameter. This may be empty or may contain more than one amplitude; the present theorem does not prove monotonicity of $B$ on $a>0$.

## 8. Radial nondegeneracy, shape and fundamental period

The construction (15) is available at every resonance in (1), not only at small speed. Here is an explicit check. Write the opposite symbol as $H_-=(a,if;-if,d)$ and put $p=\kappa c\sin x=\beta\sin x/D$, $u=x^2/D^2$. The exact phase identity gives $2xW=p-u$, hence at $0<m<1$,

$$
\frac fm=-2+(p-u)\operatorname{sinc}(2mx)-p\cos(2mx)<-2+p<0.
\tag{19}
$$

Indeed $0<x<\pi/4$, $0<p<1/2$, and both trigonometric factors are positive, with $\operatorname{sinc}\le1$. If $p-u<0$ its term is already negative; otherwise it is at most $p$. Thus $f\ne0$. At the determinant root a null vector cannot have zero radial or zero tangential coordinate. Moreover the strictly negative diagonal entries in the circular basis imply both circular components of that null vector are nonzero: if one vanished, the equation with its nonzero diagonal would force the other to vanish. Consequently the radial coefficient can be normalized to one, $b_*$ is finite, and $b_*\ne\pm1$.

Along (18), $w=o(a)$ in $C^2$, since $D_zw(0,\beta_0)=0$ and $w(0,\beta)=0$. The first-order squared-radius profile has a nonzero harmonic $j$. A possible shift of a circle's center contributes at first order only harmonic $k$. More formally, the circumcenter of the three profile points at $0,2\pi/(3k),4\pi/(3k)$ is smooth near the base circle and vanishes on every $Q_\beta$. Along the branch it is $aC_1+o(a)$; subtracting it changes the squared radius at first order by $-2Ra\,q_k(s)\cdot C_1$, of harmonic $k$. Since $0<j<k$, this cannot cancel harmonic $j$. Every sufficiently small nonzero member is therefore geometrically noncircular, even allowing an arbitrary circle center and nonuniform traversal.

The first label retains a nonzero Cartesian harmonic $k$ from the base circle. Its critical perturbation has the two nonzero harmonics $k-j$ and $k+j$, by (19) and the circular-component argument. These coefficients remain nonzero for all sufficiently small nonzero $a$. Put $d=\gcd(k,j)$. Any period of the profile must act trivially on these three Fourier coefficients, so it is an integer multiple of $2\pi/d$.

Conversely the phase shift $s\mapsto s+2\pi/d$ fixes $Q_\beta$ and every vector in $V$. It is an exact symmetry, preserves the kernel and projection, and hence fixes the unique range completion. Therefore $2\pi/d$ is an actual period, proving the labeled fundamental physical period

$$
P_{\rm fund}(a)=\frac{2\pi}{d\,\nu(B(a))}=\frac{k}{d}\,T(B(a)),\qquad a\ne0.
\tag{20}
$$

For a reduced fraction $j/k$, $d=1$, so the full nominated period is fundamental. In particular this holds for $j=k-1$ and for $k=10,j=9$. A nonreduced rational specification gives repeated profiles of the corresponding reduced branch; range uniqueness excludes an additional nearby branch that breaks this repetition while retaining the larger nominated period. This is a statement about labeled paths; an unlabeled exchange period is not substituted for (20).

## 9. Neighborhood, completeness and limitations

The primary neighborhood is an open set of full $C^2$ profiles and nominated periods around the selected circle. No symmetry condition is imposed on the input solutions. After a constant Euclidean transformation and time phase, all solutions in a sufficiently small such neighborhood are exhausted by the circle family and (18). In particular the pair's midpoint is constant, and both paths lie in a fixed plane, for every classified solution, although their initial coordinates may display neither fact.

The result also covers classical solutions sufficiently close in $C^1$, with their periods close. On the complete chart the acceleration difference from the smooth comparison circle is bounded by $C\|Y-Q_\beta\|_{C^1}$. Root differences have the same bound by (3); source-velocity comparison uses the unknown velocity's uniform difference from the circle velocity and the fixed circle's Lipschitz derivative at the shifted argument. It requires no a priori bound on the unknown third derivative. Subtracting the circle equation from (4) then bounds $\|(Y-Q_\beta)''\|_\infty$ by that same quantity. Thus sufficiently small $C^1$ distance of classical solutions implies the required $C^2$ distance. This is a solution-set upgrade, not a claim that (4) defines a $C^1$ map on all $C^1$ profiles.

The chart preserves positive separation, a strict physical speed margin and both complete partner roots for every solution. It supplies no uniform amplitude radius over different resonances or as $\beta$ approaches either endpoint. Transversality failure is outside the theorem. Arbitrarily different nominated periods, large amplitudes, nonperiodic perturbations, relative periodic motions with drift, and global continuation are outside its domain. No physical action principle, Galilean symmetry, advanced initial-value theorem or nonlinear stability inference enters the argument.

## 10. Provenance, checks and falsifiers

The frozen [preceding multiple-period subject](alternatives-screen-2026-10-05-time-symmetric-multiple-period-independent.md), SHA-256 `7edcaee5928b3bcd4ed80902c1fec15f452fd25564171d1199342cc035d5e8d3`, supplies the initial invariant-space branch and two-level proof. Its [independent stronger assessment](alternatives-screen-2026-10-05-time-symmetric-multiple-period-hale-branch-adjudication.md), SHA-256 `440c2de47a6d00ee2b21a93ddea4285df4b6232bd40039c3e05efdce801ee896`, was read as an antecedent. Neither contains the full Cartesian uniqueness argument in Sections 4–7.

The complete spectral source has SHA-256 `a3cbe5e262005ce6c11e7a0abf21163497056f3382b2ba45b76ac713e74f05d9`; its complete independent assessment, rather than its earlier partial assessment, is the acceptance antecedent. The normal source has SHA-256 `f72f83f2d6f6c3da9d56b86242786ccba7bea94bde98ba77360367324b8d2fdb`. The concrete [ten-period certificate](time-symmetric-resonance10-moore-adjudication.md) has SHA-256 `125f89112986c65a6e286dcd40c47a1ed81a47379128f71481de5682ad2f5cdc`; its full-symbol interval derivative and radial-coordinate tests cover the whole retained root bracket. The present protocol has SHA-256 `1284108850ba5d7686858ae89b5c2c993761b099088a4f1cb96f7a169ffef667`.

No new numerical target, instrument or regular test was needed. The explicit analytical controls are circle balance, all six Euclidean tangent vectors, the complete kernel dimension, the action of every involution on every kernel component, the exact phase identities in (19), and the full projection commutation in (13). The derivative orders were checked against the separately assessed two-level construction. File identities are recorded using `shasum -a 256` over the named sources. Only the new Cartesian protocol and this subject were written; earlier frozen sources and shared owners were not edited.

Falsifiers are an omitted complete root; a failed source-clock or acceleration term in (5); a false mapping property in (7); an extra periodic kernel direction; a nonsymmetric linear block or incorrect range annihilator; a singular Euclidean slice Gram matrix; a symmetry that fails to commute with the fixed projection; a transformed completion leaving the uniqueness chart; a surviving Euclidean component in (16); a zero parameter derivative in (17); a failed high-to-low difference quotient in (11); a vanishing leading radial or circular component; or a nearby full solution outside the claimed symmetry orbit. The full Cartesian symmetry reduction needs only the low-level unique range solution; if the stronger scalar regularity bridge were refuted, that reduction would survive as a classification by the exact scalar zero set, while the unique $C^1$ branch assertion would have to be withdrawn.
