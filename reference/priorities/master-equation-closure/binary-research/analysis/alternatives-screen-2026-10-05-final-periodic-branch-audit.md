# Final audit of actual noncircular periodic existence

**Claim grade: derived, conditional on the explicitly identified spectral and interval premises below.** The repaired two-level argument proves actual local noncircular periodic solutions of the exactly equal past/future canonical radial comparison law. It also proves a locally unique amplitude branch and exhausts nearby full Cartesian periodic solutions modulo rigid Euclidean transformations and time phase. No missing regularity step or unsatisfied residual equation was found in this audit. The conclusion is local in the complete profile and nominated period, with an existential amplitude neighborhood.

This is a post-disclosure mathematical audit of the [multiple-period source](alternatives-screen-2026-10-05-time-symmetric-multiple-period-independent.md), its [first differentiability assessment](alternatives-screen-2026-10-05-time-symmetric-multiple-period-hale-adjudication.md), its [stronger branch assessment](alternatives-screen-2026-10-05-time-symmetric-multiple-period-hale-branch-adjudication.md), and the [full Cartesian source](alternatives-screen-2026-10-05-time-symmetric-multiple-period-cartesian-independent.md). Their claims were read before the reconstruction below; this is not blind rediscovery or a new numerical certification. The Hale specialist role supplied an analytical lens, not acceptance authority. No antecedent was edited, and no new numerical target, evolution, or sweep was run.

## 1. Exact statement and imported premises

The equation is the radial comparison in [Section 14 of the variation manuscript](../../equation-variants/manuscript.md#14-time-symmetric-direct-interaction), with opposite equal polarities, common coupling $K=1$, wake speed $c_f=1$, and exactly equal past/future weights $\alpha=1/2$. The histories extend through all past and future times. The selected law excludes the zero-age endpoint; its complete positive-age self census is proved below rather than assumed empty. No action principle, standard-physics acceleration law, receiver multiplier, causal release rule, or stability assumption enters this argument.

Define the reference circle by

$$
x=\beta\cos x,\qquad c=\cos x,\qquad D=1+\beta\sin x,
\qquad R=\frac1{4\beta^2cD},\qquad \omega=\frac\beta R,
\qquad 0<\beta<1.
$$

Here $R$ is the circle radius, $\omega$ its angular frequency, and $\beta$ its member speed in the normalized units. The two labeled paths are opposite points on that circle. Their partner ages are $2x/\omega=2Rc$ in each time direction. Each ray has transmitter denominator $D$. The tangent inputs cancel and the radial input is $-1/(4R^2cD)=-R\omega^2$, so the reference solves the full acceleration equation before linearization.

Fix positive integers $j<k$ and a resonance $\beta_0$ satisfying $m_*(\beta_0)=j/k$ and $m_*'(\beta_0)\ne0$. The spectral premises used here are as follows.

| Premise | Exact content used | Evidence boundary of this audit |
| --- | --- | --- |
| [Complete real-frequency assessment](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-complete-adjudication.md), with its [analytical symbol](alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md) | The planar symbol is Hermitian; common frequencies are only $\pm1$ with matrix nullity one, opposite frequencies are zero and one simple pair $\pm m_*$ with $0<m_*<1$; the infinite-frequency inverse bound is complete | The formulas, range implications, and application to periodic Fourier harmonics were checked; the underlying interval partitions and arithmetic were not rerun |
| [Normal-frequency source](alternatives-screen-2026-10-05-time-symmetric-normal-bounded-independent.md) | Periodic normal kernel consists only of one common translation and two opposite tilts | The scalar equations $y^2=\beta^2\sin^2y$ and $y^2=\beta^2\cos^2y$ reproduce this exclusion directly |
| [Complete frequency-monotonicity assessment](alternatives-screen-2026-10-05-time-symmetric-frequency-monotonicity-adjudication.md) | $m_*'<0$ throughout the open speed interval and $m_*((0,1))=(m_{\rm end},1)$, with $0.7974497601<m_{\rm end}<0.7974497625$ | Imported computer-assisted premise; no fresh derivative or endpoint certificate is claimed |
| [Ten-period resonance certificate](time-symmetric-resonance10-moore-adjudication.md) | $m_*=9/10$ at $0.5359185451\le\beta_{10}\le0.5359185463$, with a nonzero parameter crossing and radial null coordinate over the complete bracket | Imported concrete interval premise, sufficient independently of global monotonicity for this particular case |

The nonlinear argument below only requires a fixed transverse resonance and the complete kernel census. The monotonicity premise extends it to every accessible rational frequency and gives the threshold $k\ge5$ when $j=k-1$. The concrete ten-period premise supplies an individually enclosed example. This audit does not count those retained certificates as new independently reproduced arithmetic.

Use phase $s=\nu(\beta)T$, where $\nu=\omega/k$, and define the $2\pi$-periodic reference profile

$$
Q_\beta(s)=\bigl(Rq_k(s),-Rq_k(s)\bigr),\qquad
q_k(s)=(\cos ks,\sin ks,0).
$$

The nominated physical period is $2\pi/\nu=kT_c(\beta)$, where $T_c=2\pi/\omega$ is the reference circle's fundamental period. Differentiating $x=\beta\cos x$ gives $x'=c/D$; substitution in $\omega=4\beta^3cD$ gives

$$
\frac{\omega'}\omega=\frac3\beta+\frac{\beta c^2}{D^2}>0.
$$

Thus $\beta$ is a valid smooth coordinate for every nominated period sufficiently near the selected multiple. On the noncircular branch it labels that period, not a constant physical speed.

## 2. The complete nonlinear root chart

Initially allow unrestricted Cartesian profiles $Y=(Y_1,Y_2)\in C^2_{\rm per}(\mathbb R^6)$, where $C^r_{\rm per}$ has the uniform norms of derivatives through order $r$. Choose a neighborhood of $Q_{\beta_0}$ with instantaneous separation at least $d_0>0$, position bound $M$, and physical speed bound $\nu\|Y_i'\|_\infty\le b<1$ for both labels. The profiles extend periodically to the entire real line.

For partner label $l=3-i$ and time direction $\varepsilon=\pm1$, the positive phase age $\delta$ satisfies

$$
\delta=\nu|Y_i(s)-Y_l(s+\varepsilon\delta)|.
$$

For any two ages, the change in the chord norm is at most $b/\nu$ times their difference. Therefore the left-minus-right root function increases by at least $(1-b)$ times every positive age increment. This global inequality remains valid when an intermediate chord vanishes; differentiability of the norm is needed only near the actual nonzero root. The root function starts negative and tends to positive infinity because the profiles are bounded. It has exactly one positive partner root in each time direction, across all repeated periods.

At that root define $S=s+\varepsilon\delta$, $B=Y_i(s)-Y_l(S)$, $\ell=|B|$, $n=B/\ell$, $v=\nu Y_l'(S)$, and $D_\varepsilon=1+\varepsilon n\cdot v$. Then

$$
\frac{\nu d_0}{1+b}\le\delta\le2\nu M,
\qquad \ell\ge\frac{d_0}{1+b},
\qquad D_\varepsilon\ge1-b>0.
$$

The first lower bound follows by subtracting the source chord from the instantaneous separation. A positive-age self root would require $\delta=\nu|Y_i(s)-Y_i(s+\varepsilon\delta)|\le b\delta$, which is impossible. This proves the complete census and all required range and denominator margins.

The exact residual whose zeros are the complete solutions is

$$
\mathcal F_i(Y,\beta)=\nu^2Y_i''+
\frac12\sum_{\varepsilon=\pm1}\frac{n_{il\varepsilon}}{\ell_{il\varepsilon}^2D_{il\varepsilon}}.
$$

For a profile increment $h$ and frequency increment $\dot\nu$, implicit differentiation gives

$$
\dot\delta=\frac{\ell\dot\nu+\nu n\cdot[h_i(s)-h_l(S)]}{D_\varepsilon},
\qquad
\dot v=\dot\nu Y_l'(S)+\nu h_l'(S)+\varepsilon\nu Y_l''(S)\dot\delta.
$$

The source acceleration multiplied by the source-clock change is present in the last term. The position variation is $\dot B=h_i-h_l(S)-\varepsilon Y_l'(S)\dot\delta$, and differentiating the direction and denominator gives the complete derivative of every acceleration term. No frozen-source derivative is substituted.

## 3. Exactly enough composition regularity

Let $E(f,z)(s)=f(s+z(s))$. Its first two formal variations are

$$
DE(f,z)[h,v]=h(s+z)+f'(s+z)v,
$$

$$
D^2E(f,z)[(h_1,v_1),(h_2,v_2)]
=h_1'(s+z)v_2+h_2'(s+z)v_1+f''(s+z)v_1v_2.
$$

These formulas are genuine continuous Fréchet derivatives at the three levels used in the sources. For the first derivative $C^1\times C^0\to C^0$, the base-function remainder is bounded by $\|v\|_\infty\,\omega_{f'}(\|v\|_\infty)$, where $\omega_{f'}$ is the modulus of continuity of the fixed derivative. The increment remainder is bounded by $\|h'\|_\infty\|v\|_\infty$. Continuity of the operator on increments uses $\|h'\|_\infty$ to bound translations of $h$; it does not require uniform continuity of unit-ball highest derivatives.

For $C^1:C^2\times C^1\to C^1$, differentiate the first variation once in $s$. Its terms are

$$
h'(s+z)(1+z')+f''(s+z)(1+z')v+f'(s+z)v'.
$$

Changes of the fixed $f''$ under translation are controlled by its own modulus of continuity. Changes of $h'$ for unit $C^2$ increments are bounded by $\|h''\|_\infty$ times the shift. The same separation controls the differentiated Taylor remainder. No third derivative of $f$ is required. For $C^2:C^2\times C^0\to C^0$, the second-variation formula uses uniform continuity of the fixed $f''$ and the uniform Lipschitz bound for the test functions $h_i'$; these again suffice in the stated operator norms.

The root residual has age derivative given by multiplication by $D_\varepsilon$. This has a bounded inverse on $C^0$ and on $C^1$; on the latter space its derivative is controlled on a neighborhood and its positive floor prevents division by zero. The implicit-function theorem therefore supplies compatible root graphs at these levels. Applying the composition results to $f=Y_l'$ yields

$$
\mathcal F:C^2\times\mathbb R\to C^0\text{ is }C^1,
\qquad
\mathcal F:C^3\times\mathbb R\to C^1\text{ is }C^1,
\qquad
\mathcal F:C^3\times\mathbb R\to C^0\text{ is }C^2.
$$

The parameter enters through the smooth positive function $\nu(\beta)$, so these are joint assertions including parameter derivatives. The linear highest-derivative term $\nu^2Y''$ has the same required regularity.

The stronger low-level analyticity assertion would be false in general. To see the obstruction without a numerical test, consider $A(t)u=u'(s+t)$ from $C^2$ to $C^0$. For every fixed $u$ its candidate derivative at zero is $u''$. Take $u_n(s)=n^{-2}\sin(ns)$ and $t_n=\pi/n$; their $C^2$ norms are bounded. At $s=0$,

$$
\left[\frac{A(t_n)-A(0)}{t_n}u_n-u_n''\right](0)=-\frac2\pi.
$$

Thus the difference quotient does not converge in the operator norm $C^2\to C^0$. This validates the need for the repair. It does not refute the three composition statements above: there the highest fixed derivative uses its own modulus of continuity, while the test increments have the extra bounded derivative needed for translation estimates. No assertion that the full low-regularity operator is analytic or twice differentiable is used below.

## 4. One range inverse on two levels

Translate the circle family by setting $\widetilde{\mathcal F}(u,\beta)=\mathcal F(Q_\beta+u,\beta)$. At the selected resonance let $L=D_u\widetilde{\mathcal F}(0,\beta_0)$. It has leading term $\nu_0^2\partial_s^2$ and lower-order terms involving values and first derivatives at fixed shifts with smooth coefficients. The latter factor through the compact embedding $C^2\hookrightarrow C^1$. The full operator is therefore Fredholm of index zero: its kernel and cokernel are finite-dimensional, its range is closed, and their dimensions agree.

The complete frequency premise gives

$$
\ker L=\mathcal E\oplus V=:K,\qquad \dim\mathcal E=6,\qquad \dim V=2.
$$

The space $\mathcal E$ contains three translations and three spatial rotations of the reference circle. The space $V$ is the opposite planar resonant mode at rotating harmonic $j$. Generalized secular modes are not periodic. Hermitian planar blocks, real normal blocks, and approximation by periodic smooth functions show that $L$ is symmetric for the real $L^2$ pairing of both labels. Its range is contained in $K^\perp$; equality follows from closed range and the matching codimension. Consequently

$$
L:C^2\cap K^\perp\longrightarrow C^0\cap K^\perp
$$

has a bounded inverse. This argument alone supplies the low inverse once the kernel and symmetry premises are known. The alternative Fourier construction is consistent: the inverse blocks are $O(n^{-2})$, so continuous data give an $H^2$ solution, whose first derivative Fourier series is absolutely convergent; the equation then gives $C^2$ regularity.

If the right-hand side is $C^1$, that same low solution has a $C^1$ lower-order expression. The equation gives $u''\in C^1$, hence $u\in C^3$, with a bound in terms of the $C^1$ data norm. This is the high inverse $C^1\cap K^\perp\to C^3\cap K^\perp$. It is the restriction of the low inverse, not a separately selected inverse. All finite-rank projections use the same smooth vectors on both levels.

## 5. Second parameter derivatives without differentiating the low operator family

Put an arbitrary nearby profile into the Euclidean slice $u\perp\mathcal E$. The six slice equations have, in the six translation and rotation coordinates, the Gram matrix of the Euclidean tangent vectors. Those vectors are independent at positive $R$, so a unique sufficiently small Euclidean transformation supplies the slice. Only spatial transformations are differentiated at this step; no differentiable time-shift action on $C^2$ is assumed.

Write $u=z+w$ with $z\in V$ and $w\perp K$, and denote the full projected equation by

$$
\mathcal R(w,p)=(I-P_K)\widetilde{\mathcal F}(z+w,\beta)=0,
\qquad p=(z,\beta).
$$

Here $P_K$ is the fixed orthogonal projection onto the complete kernel. The low implicit-function theorem gives one local $C^1$ map $w(p)$ into $C^2\cap K^\perp$. The high theorem gives a $C^1$ map into $C^3\cap K^\perp$. Shrinking its parameter neighborhood places its solution inside the low uniqueness neighborhood, so the two maps coincide. In particular the first derivatives $w_i(p)$ belong continuously to $C^3$.

Let $B(p)=D_w\mathcal R(w(p),p)$ on the low complements. It is continuous in operator norm and remains invertible locally. Subtract the first-derivative equations at $p$ and $p+he_j$ to obtain

$$
\begin{aligned}
B(p+he_j)\frac{w_i(p+he_j)-w_i(p)}h
={}&-\frac{B(p+he_j)-B(p)}h\,w_i(p)\\
&-\frac{\mathcal R_i(w(p+he_j),p+he_j)-\mathcal R_i(w(p),p)}h.
\end{aligned}
$$

The first quotient acts on the fixed vector $w_i(p)\in C^3$. Both right-hand quotients therefore converge in $C^0$ by the high-to-low $C^2$ property and the high-space $C^1$ parameter curve. Applying the continuous low inverse proves a second derivative in $C^2$. In compact form the resulting identity is

$$
w_{ij}(p)=-B(p)^{-1}D^2\mathcal R(w(p),p)
\bigl[(w_i(p),e_i),(w_j(p),e_j)\bigr].
$$

The vectors $e_i$ are coordinate vectors in the finite-dimensional parameter space; the bilinear derivative is evaluated on the high space and takes values in the low codomain. Every factor is continuous at exactly the level in which it is used, so the second derivatives are continuous. The argument proves $w\in C^2(p;C^2)\cap C^1(p;C^3)$ without a derivative of $B$ in the operator norm $C^2\to C^0$.

For any smooth fixed kernel vector, pairing the remaining residual with that vector gives a $C^2$ scalar function. Its second derivative combines $D^2\widetilde{\mathcal F}$ on high-space first derivatives with $D\widetilde{\mathcal F}$ on the low-space second derivative of $w$. An add-and-subtract difference quotient justifies this mixed-level chain rule. This closes the regularity step needed to divide out the trivial amplitude.

## 6. Full Cartesian symmetry and every residual component

The full equation and reference circle admit four exact actions: inversion with label exchange $\mathcal A(Y_1,Y_2)=(-Y_2,-Y_1)$; reflection $\mathcal Z$ in the circle plane; reversal $\mathcal R_0Y(s)=\operatorname{diag}(1,-1,1)Y(-s)$; and combined time translation and spatial corotation $\mathcal G_\gamma Y(s)=Q_z(-k\gamma)Y(s+\gamma)$. Reversal interchanges the two source directions and reverses the source velocity, preserving the denominator after the interchange. Equal weights are essential to this covariance.

Each action fixes every $Q_\beta$, preserves $\mathcal E$ and $K$, and is orthogonal for the pairing. It consequently commutes with $P_K$ and preserves the slice. One can choose the uniqueness neighborhood invariant under these compact actions. Range uniqueness then gives $w(gz,\beta)=g w(z,\beta)$ for each action $g$. This only uses each time shift as a bounded isometry; it does not differentiate the time-shift group on $C^2$.

Every $z\in V$ is planar and antipodal, so it is fixed by $\mathcal A$ and $\mathcal Z$. The entire completed profile has the same properties. On the critical two-plane, $\mathcal G_\gamma$ acts as rotation through angle $j\gamma$, so every nonzero $z$ can be put at $a\phi$ with $a>0$, where the real critical vector $\phi$ is fixed by reversal. Uniqueness then makes its completion reversible as well.

The residual already lies in $K$ by the range equation. Its simultaneous symmetry-fixed subspace has the following exact intersection with that kernel.

| Kernel directions | Dimension | Reason they cannot survive in the residual |
| --- | ---: | --- |
| Common translations | 3 | They change sign under inversion/exchange |
| Opposite normal tilts | 2 | They change sign under reflection in the circle plane |
| Axial rotation of the circle | 1 | It changes sign under reversal |
| Critical quadrature | 1 | It changes sign under reversal |
| Reversible critical vector $\phi$ | 1 | It is fixed by all three involutions |

Thus the remaining residual is a multiple of $\phi$, and all seven other components vanish. This is an explicit solvability argument; covariance under Euclidean transformations by itself would not remove those equations. Every nearby full solution can be sliced, has the unique range completion, and can be put in this reversible phase. Hence the scalar zero set exhausts full Cartesian competitors, including initially nonmirror and nonplanar profiles.

## 7. Actual scalar zeros, branch regularity, and its precise limit

Define

$$
h(a,\beta)=\langle\phi,\widetilde{\mathcal F}(a\phi+w(a\phi,\beta),\beta)\rangle,
\qquad
q(a,\beta)=\int_0^1h_a(ta,\beta)\,dt.
$$

Since the circle family solves the equation, $h(0,\beta)=0$, and $h=aq$. Section 5 proves $h\in C^2$, so $q\in C^1$. At resonance,

$$
q_\beta(0,\beta_0)=\langle\phi,L'_{\beta_0}\phi\rangle\ne0.
$$

This derivative is legitimate on the fixed smooth harmonic vector. Equivalently, it is computed in the finite Fourier block: differentiating $F_-(m_*(\beta),\beta)=0$ gives $F_{-,\beta}=-F_{-,m}m_*'\ne0$, and division by the nonzero other eigenvalue gives the critical eigenvalue derivative. The derivative of the positive physical prefactor multiplies a zero eigenvalue and contributes nothing. The range terms are annihilated by $\phi$. No analytic full-operator family is required.

The scalar implicit-function theorem gives a unique local $C^1$ root $\beta=B(a)$. The complete branch

$$
Y(a)=Q_{B(a)}+a\phi+w(a\phi,B(a))
$$

solves the range and scalar equations, hence all six original acceleration equations. It is $C^1$ into $C^3$. Each individual profile is smooth: a $C^r$ profile has a $C^r$ source graph in phase and a $C^{r-1}$ acceleration expression; its equation then improves it to $C^{r+1}$, and the argument iterates inside the positive-margin chart.

The phase/corotation action sending $\phi$ to $-\phi$ makes $h$ odd in $a$ and $q$ even. Scalar uniqueness gives $B(-a)=B(a)$ and $B'(0)=0$. The justified parameter displacement is $B(a)-\beta_0=o(|a|)$. Evenness and $C^1$ regularity alone do not imply an $O(a^2)$ displacement: the even $C^1$ function $|a|^{3/2}$ is an explicit counterexample. The inspected branch sources use $w=o(a)$ and first-order coefficients, which suffice; this audit makes no quadratic parameter-shift or analytic-branch assertion. A smooth profile for each fixed amplitude likewise does not establish higher differentiability of the family in amplitude.

Uniqueness is in the amplitude/period chart. At a fixed physical nominated period, the condition $B(a)=\text{constant}$ may have no amplitude or several amplitudes. Neither monotonicity of $B$ on positive amplitudes nor a nonzero leading period-shift coefficient has been proved.

## 8. Geometric noncircularity and labeled fundamental period

The resonant radial coordinate is nonzero at every admitted rational resonance. One analytical check uses the opposite symbol $H_-=(a,if;-if,d)$, with $p=\beta\sin x/D$ and $u=x^2/D^2$. The exact coefficient identity $2xW=p-u$ gives

$$
\frac fm=-2+(p-u)\operatorname{sinc}(2mx)-p\cos(2mx)<-2+p<0,
\qquad 0<m<1.
$$

Here $0<x<\pi/4$, $0<p<1/2$, and both trigonometric factors are positive, with $\operatorname{sinc}\le1$. If $p-u<0$ its contribution is negative; otherwise it is at most $p$. Thus neither null coordinate can vanish. The strictly negative circular-basis diagonal entries in the analytical symbol also force both circular components to be nonzero at a determinant root. Normalize the real critical first-label profile to

$$
\phi_1(s)=Q_z(ks)(\cos js,-b_*\sin js,0),
\qquad b_*\ne\pm1.
$$

The first-order nonconstant harmonic in $|Y_1(a)|^2$ is $j$, with a nonzero coefficient. A possible circle center is handled by the circumcenter of three profile points at phases $0,2\pi/(3k),4\pi/(3k)$. These remain noncollinear, so their circumcenter is a smooth function of their coordinates and is zero on every reference circle. Its displacement is $aC_1+o(a)$. Subtracting this center contributes only harmonic $k$ at first order in squared radius; it cannot cancel harmonic $j<k$. Every sufficiently small nonzero member is therefore geometrically noncircular, including against shifted centers and nonuniform traversal of a circle.

The base profile retains a nonzero Cartesian harmonic $k$. The critical vector has the nonzero harmonics $k-j$ and $k+j$ because

$$
e^{iks}(\cos js-i b_*\sin js)
=\frac{1+b_*}{2}e^{i(k-j)s}+\frac{1-b_*}{2}e^{i(k+j)s}.
$$

Since $w(a\phi,B(a))=o(a)$, these coefficients remain nonzero on every sufficiently small nonzero branch member. If $d=\gcd(k,j)$, translation by any period must fix all three coefficients, so that period is an integer multiple of $2\pi/d$. Conversely the shift $2\pi/d$ fixes the reference family and critical vector, commutes with the kernel projection, and therefore fixes the unique range completion. It is an actual period. The labeled fundamental physical period is exactly

$$
P_{\rm fund}(a)=\frac{2\pi}{d\nu(B(a))}=\frac{k}{d}\,T_c(B(a)),\qquad a\ne0.
$$

For $j=k-1$, including $j=9,k=10$, the fraction is reduced and the full nominated period is fundamental. The circular base member has the shorter fundamental period $T_c$; it is represented repeatedly in the bifurcation space. No unlabeled exchange period is substituted for a labeled period.

## 9. Coverage and remaining boundaries

The primary result covers an open neighborhood of full $C^2$ Cartesian profiles and nominated periods. It also covers classical solutions sufficiently close in $C^1$. Indeed root displacement is bounded by position displacement using the denominator floor. The sampled-velocity difference splits into an unknown-to-circle difference at the same source phase and a shift of the fixed smooth circle velocity. Both are bounded by $C^1$ profile distance. The full equation then bounds the difference of second derivatives, placing sufficiently close classical solutions inside the $C^2$ neighborhood. This is a restriction to actual solutions and does not claim a differentiable residual on all $C^1$ profiles.

With the declared complete-frequency and monotonicity premises, the nonlinear result holds at every rational $m_*\in(m_{\rm end},1)$. In particular $j=k-1$ is available exactly for $k\ge5$; nominated multiples two through four have only circles locally. At nonresonant circles, the range equation on the six-direction Euclidean complement has the exact circle as its unique nearby solution, so it excludes other nearby full solutions without an additional residual identity.

Every conclusion remains local at a fixed strictly subfield circle and fixed nominated multiple. No numerical amplitude radius, endpoint-uniform neighborhood, finite-amplitude continuation, nonperiodic exhaustion, stable binding, causal release, or initial-value selection is established. The separate unequal-weight theorem in the [Cartesian/weight assessment](alternatives-screen-2026-10-05-time-symmetric-cartesian-weight-adjudication.md) is not needed for this existence proof and has not received a new full audit here. No Maxwell, Weber, or Darwin result is used as a premise.

## 10. Audit provenance, validation, and falsifiers

The hashes below were measured by `shasum -a 256` on exactly the linked antecedents during this audit. Their equality with retained source identities checks which bytes were read; it is not additional mathematical evidence.

| Antecedent | SHA-256 |
| --- | --- |
| Multiple-period source | `7edcaee5928b3bcd4ed80902c1fec15f452fd25564171d1199342cc035d5e8d3` |
| First differentiability assessment | `de1ee5d29d9642ffddd68d2ad1daaecc04773af4fe94c7c9a7dc01cd8752a11e` |
| Stronger branch assessment | `9983f0b7b0d8e1f50e45ecade21f22cdb225f3aee81ad825fdda39d39724d962` |
| Full Cartesian source | `42385b1feacd9a552d8b4c23149b5c1320a70a542140f1b825de1e0e016160c8` |
| Cartesian/weight assessment | `57a8886d8deef529d8620f6ffda5abd8fd34224e8bafd2339d18dedc88285873` |
| Complete real-frequency assessment | `8152c9bea6db6a738067d856eab8e20c006e53cbaed52e4f24fe1b32df80e5a3` |
| Complete monotonicity assessment | `1df2cf51746ba9deca42761153e896ade12c0a89e4c4faf42dd0c9487091b862` |
| Concrete ten-period certificate | `125f89112986c65a6e286dcd40c47a1ed81a47379128f71481de5682ad2f5cdc` |
| Normal-frequency source | `f72f83f2d6f6c3da9d56b86242786ccba7bea94bde98ba77360367324b8d2fdb` |

The mathematical controls are the exact circle balance, the explicit bounded high-frequency counterexample to low-operator differentiability, the compatible inverse restrictions, all eight kernel directions and their involution signs, and the nonzero Fourier coefficients establishing geometric shape and period. No bespoke computational instrument was built. Measured by `node .tmp/maxwell-shaped-overnight/check-documents.mjs` on this file alone, all 11 local links/fragments and 248 mathematical expressions passed with zero failures. The existing checker had a recorded known-case pass in the parent campaign; its implementation was read here, and its fixture-writing control was not rerun under this worker's single-source write restriction. This check validates local links/fragments and strict KaTeX syntax, not the mathematical proof. `git diff --no-index --check /dev/null` on this new file emitted no whitespace diagnostics; its exit status 1 records the expected new-file difference. This file's final hash accompanies the audit handoff.

Only this new audit source is written by this worker. Shared manuscripts, scenario owners, frozen sources, and generated files are left to their existing writers. This worker launches no numerical or background jobs, so none remains to stop or hand off.

Checkable falsifiers are: a missing partner or positive-age self root within the stated uniform-speed chart; a failed modulus-of-continuity estimate at one of the three declared composition levels; incompatible high and low complement solutions; a nonconvergent right-hand quotient when applied to a fixed high-space first derivative; an additional periodic kernel mode or incorrect Hermitian symbol in the imported premises; a symmetry that fails to preserve the projection or uniqueness neighborhood; a surviving residual direction in the eight-direction table; zero finite-harmonic transversality; a vanishing radial or circular null component; or an actual nearby complete periodic solution outside the resulting symmetry orbit. Each would invalidate its indicated proof step. The mathematical audit found none; failure of an imported interval premise would still invalidate the corresponding global resonance coverage even though the local nonlinear argument at any independently valid transverse resonance remains available.
