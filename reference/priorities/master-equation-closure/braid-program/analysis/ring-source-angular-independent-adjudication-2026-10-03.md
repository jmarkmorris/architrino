# Independent adjudication of the ring-source and angular-response derivation

## Verdict and actual independence

The [source and angular-response analysis](ring-source-and-angular-response-2026-10-03.md) is accepted at **derived conditional** grade for its complete periodic pushforward identity, fixed-probe neutral-ring mean and harmonic selection, fixed-harmonic far-distance coefficient and error bound, limiting caustic directions, and geometric angular-kick and formal Laplace identities. The reconstruction below derives those results directly from the baseline causal integral and Euclidean kinematics. It does not replay a numerical quadrature, import a target evaluator or independently recalculate the inherited ring balance or planar characteristic matrix. Its independence is mathematical reconstruction of the new algebra and domains; inherited exact-ring and characteristic premises retain their existing evidence owners.

No substantive equation correction is required. Three boundaries are essential to this verdict: a cycle average at a caustic is a measure integral, not pointwise continuation; the far-distance remainder is for one fixed Fourier coefficient, not a uniform pointwise acceleration bound near caustics; and a present-time velocity impulse is an external piecewise smooth preparation, not a complete compatible $C^2$ history supplied by the T02 nonlinear theorem. The target preserves these distinctions. A claim that every tangential kick excites an unstable pole remains conditional until a nonzero numerator is independently enclosed at a certified positive root.

The reviewed input had SHA-256 `b5e25937b8503548a49ed5bbd328e0c408299f4263ff2a3e18a4a20e363d23d3`, measured by `shasum -a 256` on that single analysis file before the reconstruction. The closing validation checks that identity again. No shared queue, index, source derivation, equation, score, rank or production instrument is changed by this adjudication. All numerical units, where needed, use $c_f=1$.

## 1. Complete periodic pushforward reconstructed on the time circle

Take one bounded periodic source path $Y(s)$ with period $P$ and a fixed receiver $x$ that never meets it. Define $r(s)=|x-Y(s)|>0$, $f(s)=s+r(s)/c_f$ and $b(s)=(x-Y(s))/r(s)^3$. The unchanged per-hit acceleration is obtained from the source-time integral

$$
A(T)=\sigma K\int_{\mathbb R}b(s)\delta(T-f(s))\,ds.
$$

At a regular reception the delta change of variables contributes $1/|f'(s)|$ for every preimage. Since $f'=1-\mathbf n\cdot\dot Y/c_f$, this is the canonical transmitter weight $c_f/|D_t|$. Negative slopes are therefore included with positive absolute weight. Source speed exceeding wake speed does not invalidate the integral identity; it invalidates only a monotone one-preimage substitution.

To obtain the period average without that substitution, define the periodic delta distribution $\delta_P(t)=\sum_{n\in\mathbb Z}\delta(t-nP)$. Since $f(s+P)=f(s)+P$ and $b(s+P)=b(s)$, the arrival measure on one reception period is the pushforward

$$
A_P(T)=\sigma K\int_0^P b(s)\delta_P(T-f(s))\,ds.
$$

For any continuous periodic test function $\psi$,

$$
\int_0^P\psi(T)A_P(T)\,dT
=\sigma K\int_0^Pb(s)\psi(f(s))\,ds.
$$

The identity follows by integrating the periodic delta first. Positive clearance bounds $b$ and makes the source integral finite. This establishes a finite signed vector measure even when arrival derivatives vanish. Taking $\psi=1$ proves the displayed mean in the subject. Taking $\psi(T)=e^{-ik\Omega T}$ proves its Fourier integral. This proof counts every emission once modulo the period and does not presume a bounded number of monotone arrival branches.

At a regular reception the preimages lie in a compact delay interval because the source is bounded. Each has a nonzero derivative, so there are finitely many isolated preimages; an infinite accumulating sequence would have a critical accumulation point. The ordinary-root expression is thus finite there. At a finite-order caustic the measure remains finite and the ordinary density can diverge integrably; at a constant-arrival interval it can contain an atom. The subject excludes that persistent singular case from its ordinary-field statement. None of these measure facts selects an outgoing receiver trajectory through a singular event.

Grade: derived on complete periodic source histories with positive fixed-receiver clearance. Falsifier: a complete periodized causal integral violating the test-function identity defeats the result. An unbounded source, moving receiver, omitted negative-slope branch or collision invalidates a stated premise rather than refuting the conditional theorem.

## 2. Neutral cancellation, temporal selection and axis evaluation

Let $M=2N$, $\alpha_j=2\pi j/M$, $q_j=(-1)^j$, and $Y_j(s)=Y_0(s+\alpha_j/\Omega)$. The source-only cycle integral of $b_j$ is independent of $j$ by translating the integration variable. Multiplying by polarity and summing gives $\sum_jq_j=0$, hence zero mean at every fixed receiver with positive clearance. No far-distance or low-speed assumption enters this cancellation.

For a temporal coefficient, the same translation adds a phase $e^{ik\alpha_j}$. The total coefficient is therefore the base coefficient multiplied by

$$
\sum_{j=0}^{M-1}e^{i(\pi+2\pi k/M)j}.
$$

This finite geometric series is nonzero precisely when $e^{i(\pi+2\pi k/M)}=1$, that is $k\equiv N\pmod M$. It then equals $M$. Consequently only odd multiples of $N\Omega$ are permitted. The cancellation concerns permitted temporal frequencies; it does not guarantee a nonzero coefficient at each one. Real fields supply the corresponding negative-frequency conjugates.

For an axial receiver $x=(0,0,z)$, range is $r_0=\sqrt{R^2+z^2}$ for every member and every emission. The arrival map is simply $s\mapsto s+r_0/c_f$, so each channel has one ordinary root with transmitter factor one even when $\Omega R>c_f$. The vector sum is proportional to the zero mode $\sum q_j$ in its axial component and to $\sum q_je^{i\alpha_j}$ in its transverse component. Both vanish for $M\ge4$. For $M=2$ the second sum equals two, giving transverse magnitude $2KR/(R^2+z^2)^{3/2}$ and zero axial component. These checks reconstruct the subject's axis distinction independently from the full ordinary root equation, not from a multipole approximation.

Grade: derived fixed-probe cancellations and harmonic selection. Falsifier: a complete fixed-receiver coefficient violating the finite sum under these exact paths defeats the claim. A changed polarity, displaced or removed source, unequal radius, or moving receiver has different premises and must be reevaluated.

## 3. Far coefficient, remainder and caustic limit

Put $x=\rho e$, $|e|=1$, $\rho>R$, and let $Y$ be the radius-$R$ base source. Define $a=e\cdot Y$. Algebra gives

$$
r-(\rho-a)=\frac{R^2-a^2}{r+\rho-a},
\qquad
0\le r-(\rho-a)\le\frac{R^2}{2(\rho-R)}.
$$

The denominator bound uses both $r\ge\rho-R$ and $\rho-a\ge\rho-R$. This independently confirms the arrival-phase remainder. For the vector kernel,

$$
\left|\frac{x-Y}{r^3}-\frac{e}{\rho^2}\right|
\le\frac{R}{(\rho-R)^3}+\rho|r^{-3}-\rho^{-3}|
\le\frac{R}{(\rho-R)^3}+\frac{3\rho R}{(\rho-R)^4}.
$$

The final inequality is the mean-value bound for $t^{-3}$ over $t\ge\rho-R$, together with $|r-\rho|\le R$. Split the Fourier integrand difference into the exact-kernel difference times its unit-modulus phase and the approximate kernel times the phase difference. The elementary bound $|e^{iu}-e^{iv}|\le|u-v|$ adds at most $|k|\Omega R^2/[2c_f\rho^2(\rho-R)]$. Summing absolute source magnitudes supplies exactly the subject's three-term $KM$ remainder bound. It is $O(KMR(1+|k|\beta)/\rho^3)$ for fixed source parameters and fixed harmonic.

With $e\cdot Y=R\sin\theta\cos(\Omega s-\phi)$, change variable $\eta=\Omega s-\phi$. The leading coefficient is

$$
\frac{q_rKM}{\rho^2}e\,e^{-ik(\Omega\rho/c_f+\phi)}
\frac1{2\pi}\int_0^{2\pi}e^{-ik\eta+ik\beta\sin\theta\cos\eta}\,d\eta,
$$

for a permitted harmonic, confirming the phase sign. Expand the last exponential in powers of $b=\beta\sin\theta$. For positive integer $k$, the first term with Fourier order $k$ occurs at degree $k$; the coefficient of $e^{ik\eta}$ in $\cos^k\eta$ is $2^{-k}$. The next admissible degree has the same parity and is $k+2$. This proves $I_k(b)=i^k(kb/2)^k/k!+O(b^{k+2})$ and the order-$N$ angular zero near the axis. No observer-level field law is imported.

The leading arrival map after subtracting its large constant is $\eta-b\cos\eta$. Its derivative is $1+b\sin\eta$, with no zero for $|b|<1$. For $|b|>1$ it has stationary points with nonzero second derivative, hence ordinary folds. At $|b|=1$ the second derivative vanishes and the third derivative is nonzero, giving a cubic limiting stationary point. This is a large-distance direction boundary. Exact finite-distance caustics require the exact arrival equation and $D_t=0$ together. The Fourier bound remains valid as a measure integral across isolated caustics; pointwise ordinary acceleration may diverge there, so the bound must not be interpreted as a uniform pointwise estimate.

Grade: derived fixed-harmonic coefficient and explicit positive-clearance error bound; derived limiting caustic classification. Falsifier: an exact coefficient outside the bound at $\rho>R$, an inconsistent phase convention, or a finite-distance caustic identification that bypasses the exact equations defeats its respective claim. No radiative energy or action flux follows from this acceleration coefficient alone.

## 4. Angular kinematics, present kick and Laplace numerator

For one common displacement in the rotating frame, write $u=(a,b)$ and $X=Q(\Omega T)(R+a,b)$. Euclidean cross multiplication gives

$$
X\times\dot X=\Omega[(R+a)^2+b^2]+(R+a)b'-ba'.
$$

Keeping linear terms yields $\delta h=2\Omega Ra+Rb'$. Differentiating the exact cross product gives $h'=X\times X''=X\times A^{\mathrm{ME}}$. This is a geometric diagnostic without a primitive mass factor. Its constancy on the exact reference uses radial acceleration; rotational covariance does not imply a conserved particle-only angular account for arbitrary delayed histories.

At the external impulse, all positions and all positive-delay emission histories are unchanged. The canonical arriving acceleration depends on these positions and the delayed source velocities, not directly on the receiver's newly changed velocity. Thus the immediate acceleration remains the original centripetal vector. Independently projecting $X''$ in rotating coordinates gives

$$
u''+2\Omega Ju'-\Omega^2u=\delta A,
\qquad
u(0)=0,\quad u'(0)=\delta v e_2,\quad\delta A(0^+)=0.
$$

Its components give $a''(0^+)=2\Omega\delta v$, $b''(0^+)=0$. The radial-coordinate identity $\rho''=A\cdot e_r+v_t^2/\rho$ gives the exact immediate change $2\Omega\delta v+(\delta v)^2/R$. This verifies the prograde and retrograde initial radial response, without extrapolating to later ring retention or an adjacent rung.

A velocity jump is incompatible with a globally $C^1$ path at the impulse. It is an explicitly imposed preparation whose post-impulse first step is well defined while every delayed source lies in the smooth supplied past. After source arguments reach the impulse, the preparation requires a piecewise smooth evolution class, or a specified smooth drive. The subject claims only the immediate response and formal linear ordinary-chart initial-value formula, and explicitly distinguishes it from the compatible nonlinear ancient histories; this is the correct boundary.

For zero perturbation past and $u(0)=0$, Laplace transformation of $u''$ produces $z^2\widehat u-u'(0)$, and transformation of the Coriolis term produces $2\Omega zJ\widehat u$. Each ordinary delayed position term contributes $e^{-z\Delta}\widehat u$; each delayed velocity term contributes $ze^{-z\Delta}\widehat u$, since the initial position is zero. Combining the complete first-variation rows yields

$$
A(z)\widehat u(z)=\delta v e_2.
$$

For a $2\times2$ matrix, direct inversion gives numerator $\operatorname{adj}A(z)e_2=(-A_{12}(z),A_{11}(z))^{\mathsf T}$. At a certified positive determinant zero, a nonzero component of this numerator prevents cancellation of the inverse singularity. This remains true for a multiple determinant zero; a nonzero analytic numerator cannot cancel a vanishing determinant. Conversely, existence of an unstable root alone does not prove that this preparation excites it. The requested interval numerator check is therefore a real dependency, not a redundant test.

Grade: derived kinematics, immediate response and formal transform identity. The unstable tangential response is derived only conditional on a certified nonzero numerator at a certified positive root and a valid ordinary-chart initial-value interpretation. Falsifier: a direct first-variation derivation with a different complete Laplace row, a zero numerator at every relevant unstable pole, or a claimed smooth nonlinear flow treating the externally discontinuous history as compatible defeats its corresponding assertion.

## 5. Integration boundary and validation

This adjudication supports zero stationary-probe mean, exact axial field cancellation for at least four alternating members, permitted odd multiples of $N\Omega$, the inverse-square fixed-harmonic leading coefficient and its remainder, and the history-qualified kick formula. It supplies neither a moving-ring mean mutual acceleration nor a balanced coaxial assembly, neither a stable probe seat nor a ring-to-ring transition, and neither a conserved angular-momentum theorem nor an action identification. Those questions require their own full paths and source/reception histories.

The inherited premises remain the [exact ladder](../evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md), the [T02 independent characteristic evaluation](t02-symmetric-characteristic-independent-evaluation.md), and the [T02 nonlinear adjudication](t02-nonlinear-history-independent-adjudication-2026-10-03.md). This review does not upgrade their numerical authority. The separate axial subject and instrument remain frozen during this assignment. The known-control validator `node .tmp/ring-source-adjudication/validate.mjs` passed before target use and then rendered 102 mathematical spans, resolved four local links, found no trailing whitespace in this adjudication, and confirmed the reviewed source and both frozen axial identities. Its companion axial syntax check rendered 120 mathematical spans and resolved seven links. `git diff --no-index --check /dev/null` produced no whitespace diagnostics for either new analysis. These are measured syntax, link and preservation checks, distinct from the mathematical reconstruction above.
