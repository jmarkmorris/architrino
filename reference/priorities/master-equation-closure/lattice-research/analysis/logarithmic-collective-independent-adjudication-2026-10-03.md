# Independent adjudication of logarithmic checkerboard collective growth

The fixed-source restoring response and the collective instability proof are accepted in their declared domains. A displaced receiver has an opposing acceleration when every source remains fixed. A disturbance in which both polarity populations respond has additional delayed displacement and transmitter-velocity contributions, and the complete linear equation admits an exponentially growing staggered mode for every positive coupling. These are different questions, with different answers.

**Claim grade: derived, conditional on the inverse-distance reception variant, neutral-cell stationary background and exponentially decaying complete histories specified below.** This adjudication supplies a separate analytical construction of the [subject operator and growth theorem](logarithmic-collective-stability-independent-analysis.md). In particular, the row variation is recovered from the emission-time distribution rather than assumed from the subject's implicit-root calculation. The infinite-history derivative, cancellation in the small-growth-rate limit and strict sign comparison are proved explicitly. No numerical output from the subject's instrument is used as acceptance evidence. The [original static proof](logarithmic-static-checkerboard-response.md) and both comparison references remain unchanged.

## Scenario and theorem being accepted

The selected [logarithmic comparison law](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) retains causal propagation, polarity and the canonical transmitter-root weight while replacing inverse-square reception by inverse-distance reception. Set $c_f=1$, let $K>0$ be its coupling, and let $\ell>0$ be lattice spacing. No speed ceiling, receiver multiplier, root exclusion or event continuation is included.

The stationary sites are $X_i(T)=\ell i$, $i\in\mathbb Z^3$, with polarity $(-1)^{i_1+i_2+i_3}$. For a source $j=i-d$, put $s_d=(-1)^{d_1+d_2+d_3}$, $r_d=\ell|d|$ and $n_d=d/|d|$. Every distinct source has one simple positive-delay root $E=T-r_d$ and denominator $D_t=1$. A stationary label has no positive-delay self root. The static sum is evaluated in eight-site signed cells $d=2m+e$, with $e\in\{0,1\}^3$, after deleting only the zero-separation origin row. Its history-dependent correction will be absolutely summed.

The accepted statement is the following. In the spatially bounded ancient-history class with exponential temporal decay, the full first variation is

$$
u_i''(T)=\frac{KS}{3\ell^2}u_i(T)
+K\sum_{d\ne0}s_d\left[
-H_d u_{i-d}(T-r_d)+B_d u_{i-d}'(T-r_d)\right],
$$

$$
H_d=\frac{I-2n_dn_d^{\mathsf T}}{r_d^2},
\qquad B_d=\frac{n_dn_d^{\mathsf T}}{r_d},
\qquad
S=\sum_{d\ne0}^{\mathrm{cells}}\frac{s_d}{|d|^2}<0.
$$

Here $u_i$ is a displacement, its prime is differentiation in absolute time, and $I$ is the three-dimensional identity matrix. For every $g=K>0$, a positive number $a_g$ exists such that $u_i(T)=(-1)^{i_1+i_2+i_3}Ue^{a_gT/\ell}$ solves this linear equation for each constant vector $U$. A neighborhood of the staggered wavevector also has positive real characteristic roots. No uniqueness or multiplicity assertion about $a_g$ is accepted or needed.

This theorem gives a linear instability in the stated spatially bounded class. It gives neither a localized nonlinear disturbance nor a complete spectrum nor an outgoing trajectory after a singular event. Those limitations are part of the accepted conclusion.

## Stationary summation and the receiver derivative

Let $f(z)=z/|z|^2$. Each distant signed cell is a third coordinate finite difference of $f$. Applying the fundamental theorem of calculus in each coordinate bounds that cell by an integral of $\partial_1\partial_2\partial_3 f$ over a fixed cube. Homogeneity gives bounds $Cr^{-4}$ for its acceleration and $Cr^{-5}$ for its receiver derivative, uniformly for receiver displacements in a ball of radius less than $\ell/2$. Summing the $O(r^2)$ cells in a unit radial layer proves absolute convergence after grouping and local uniform convergence of the derivative. It does not prove absolute convergence of individual stationary rows.

The Gaussian evaluation preserves that exact grouping. For $z\ne0$,

$$
|z|^{-2}=\int_0^\infty e^{-t|z|^2}\,dt,
\qquad
f(z)=\int_0^\infty z e^{-t|z|^2}\,dt.
$$

The mixed third derivative of the scalar Gaussian has absolute bound $Ct^3r^3e^{-ctr^2}$ on a distant cell. Its integral is $Cr^{-5}$. For the vector Gaussian the corresponding bound is $C(t^2r^2+t^3r^4)e^{-ctr^2}$, whose integral is $Cr^{-4}$. A receiver derivative increases decay to $Cr^{-5}$. All constants may depend on the fixed displacement ball and spacing; all finitely many exceptional cells are handled separately with their origin row omitted. These integrated absolute estimates justify the cell-sum/integral interchange, including the receiver derivative.

At each fixed $t>0$, individual Gaussian rows are absolutely summable, so inversion and cubic symmetry may be applied before integration. The acceleration at the anchor is zero. Direct differentiation and the equality of its three diagonal entries then give

$$
J=\frac K{\ell^2}\sum_{d\ne0}^{\mathrm{cells}}
\frac{s_d}{|d|^2}(I-2n_dn_d^{\mathsf T})
=\frac{KS}{3\ell^2}I.
$$

The scalar $S$ is the trace of the dimensionless derivative; the factor $1/3$ therefore follows from isotropy, not a spherical approximation. Define

$$
A(t)=\sum_{m\in\mathbb Z}e^{-tm^2},\quad
B(t)=\sum_{m\in\mathbb Z}e^{-t(m+1/2)^2},\quad
C(t)=\sum_{m\in\mathbb Z}(-1)^m e^{-tm^2}.
$$

The grouped Gaussian identity is $S=\int_0^\infty[C(t)^3-1]dt$. The alternating series gives $C(t)<1$, and the half-integer Gaussian Fourier expansion gives $C(t)=\sqrt{\pi/t}\,B(\pi^2/t)>0$. At small $t$, this last expression decays exponentially after its power prefactor; at large $t$, $C(t)^3-1=O(e^{-t})$. Thus the integral exists and is strictly negative. The static anchor is an equilibrium, and its held-source receiver derivative is strictly restoring in every direction. This part of the original proof is accepted independently of any numerical lattice sum.

## Row variation from the emission-time distribution

The [canonical root Jacobian](../../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) supplies the ordinary-row interpretation of the emission-time delta. For the logarithmic law and $c_f=1$, one row can be written on a simple-root chart as

$$
K s_d\int_{-\infty}^{T} f(R(E))\,
\delta\bigl(|R(E)|-(T-E)\bigr)\,dE,
\qquad R(E)=X_i(T)-X_j(E).
$$

This representation is used only near the stationary positive-delay root. There the incidence map has nonzero derivative, so the delta pullback and its first variation are defined. No singular-root extension is being selected.

Set $X_i(T)=\ell i+\epsilon u_i(T)$ and differentiate at $\epsilon=0$. With $E_0=T-r_d$, put $w(E)=u_i(T)-u_j(E)$. The unperturbed gap is $E-E_0$, its variation is $n_d\cdot w(E)$, and the integrand variation is $H_dw(E)$. Distributional differentiation therefore gives

$$
\delta A_{i\leftarrow j}
=K s_d\int\left[
H_dw(E)\delta(E-E_0)
+\frac{n_d}{r_d}(n_d\cdot w(E))\delta'(E-E_0)
\right]dE.
$$

Integrating the second term against $\delta'$ differentiates only $w(E)$, whose derivative is $-u_j'(E)$. Consequently

$$
\delta A_{i\leftarrow j}
=K s_d\left[H_d\{u_i(T)-u_j(T-r_d)\}
+B_du_j'(T-r_d)\right].
$$

This calculation independently fixes the positive sign, range power and factor of the transmitter-velocity term. It also explains why no receiver-velocity multiplier belongs in the acceleration row: the receiver position is held at the reception event during the emission-time integration. Background transmitter velocity and acceleration vanish, so no additional first-order root-shift term survives. The absolute transmitter denominator has positive sign throughout this neighborhood and introduces no sign ambiguity.

Three exact controls are available without running the subject instrument. A held source at range $r$ has derivative $-r^{-2}$ longitudinally and $+r^{-2}$ in each transverse direction. A common time-independent translation has zero variation in every row before summation. For the six unit-axis sources in normalized coordinates, the staggered source matrix is $2(a-1)e^{-a}I$, obtained by adding the axis dyads. Each control agrees with the displayed operator. The translation control is a grouped static comparison and does not assign a boundary value to a general infinite-history symbol at growth rate zero.

## Differentiation of the infinite history correction

Use histories on $T\le0$ with

$$
\|u\|_{\eta,2}
=\sup_{i,T\le0}e^{-\eta T}
\left(|u_i(T)|+|u_i'(T)|+|u_i''(T)|\right)<\infty,
\qquad \eta>0.
$$

The derivatives are actual time derivatives of the displacement; independently chosen displacement and velocity records are not permitted. The first variation is a bounded map from this history space to the analogous weighted acceleration space. This is a statement about the acceleration functional, not a nonlinear evolution theorem on that space.

In a sufficiently small neighborhood, displacement is bounded by $\delta<\ell/4$ and speed by $1/2$. For distinct labels, the causal gap is strictly increasing as a function of emission time, has a positive same-time value, and tends to minus infinity in the ancient past. It has exactly one root with denominator greater than $1/2$. Its delay differs from $r_d$ by at most $2\delta$, since both positions differ from their anchors by at most $\delta$. A same-label displacement over a positive delay is bounded by half that delay, so no positive-delay self root exists.

Split each nonlinear row into its stationary-source value at the displaced current receiver and its moving-source correction. The grouped stationary part has the locally uniform derivatives proved above. In the correction, every source displacement and velocity at the actual root is bounded by

$$
C\|u\|_{\eta,2}\,e^{\eta T}e^{-\eta r_d},
$$

where the constant absorbs the bounded shift of emission time. Range is uniformly comparable to $r_d$, and the transmitter denominator stays above $1/2$. First variations are therefore dominated by a summable multiple of $(r_d^{-2}+r_d^{-1})e^{-\eta r_d}$. This supplies absolute convergence of both delayed sums.

The difference quotient is controlled as well. The root shift is $O(|\epsilon|\|u\|_{\eta,2}e^{\eta T})$. Taylor expansion of $f$, expansion of the positive denominator, and the bound on $u_j''$ control the velocity evaluated at this shifted root. On $T\le0$, products of two temporal weights are bounded by the single weight. After subtracting the first variation, the remote row correction is bounded by

$$
C\epsilon^2\|u\|_{\eta,2}^2 e^{\eta T}
e^{-\eta r_d}(r_d^{-1}+r_d^{-2}+r_d^{-3}).
$$

The finite set of short ranges changes the constant, not summability. The stationary grouped remainder is controlled by the next receiver derivative of its signed cells. This proves differentiability into weighted acceleration space and legitimizes differentiation of the entire correction. It requires only a Lipschitz bound for the source velocity, supplied here by bounded $u_j''$; a third time derivative is unnecessary. The proof gives no derivative-tail result for nondecaying arbitrary complete histories.

## Collective symbol and the cancellation at small growth rate

Put $t=T/\ell$, $v_i(t)=u_i(\ell t)/\ell$, $\rho_d=|d|$, and $g=K>0$ in normalized wake-speed units. A trial mode $v_i(t)=Ue^{at+ik\cdot i}$ gives

$$
F(k,a)=a^2I-\frac{gS}{3}I-gM(k,a),
$$

$$
M(k,a)=\sum_{d\ne0}
e^{-a\rho_d-i(k+Q)\cdot d}
\left[-\frac{I-2n_dn_d^{\mathsf T}}{\rho_d^2}
+a\frac{n_dn_d^{\mathsf T}}{\rho_d}\right],
\qquad Q=(\pi,\pi,\pi).
$$

The expression converges absolutely for real $k$ and $\operatorname{Re}a>0$. Finite derivatives introduce polynomial factors and remain locally uniformly convergent. For complex $k$, the sufficient local domain is $|\operatorname{Im}k|_2<\operatorname{Re}a$. For positive real $a$ and real $k$, inversion pairing turns its phase into a cosine, giving a real symmetric matrix. At $k=Q$, cubic symmetry gives $M(Q,a)=m(a)I$, with

$$
3m(a)=\sum_{d\ne0}\frac{(a\rho_d-1)e^{-a\rho_d}}{\rho_d^2}.
$$

The two parts of this sum diverge separately as $a\downarrow0$. An absolutely convergent representation of their difference is needed. Define

$$
p(t)=(\pi/t)^{3/2},\qquad
R(t)=A(t)^3-1-p(t),\qquad C_0=\int_0^\infty R(t)\,dt.
$$

Gaussian Fourier transformation gives $R(t)=-1+O(t^{-3/2}e^{-\pi^2/t})$ near zero and $R(t)=-p(t)+O(e^{-t})$ at infinity. Thus $R$ is absolutely integrable. This auxiliary difference is a convergent identity for the symbol; it is not an extra subtraction in the reception law.

For $a,r>0$, integrating a Gaussian mixture gives

$$
\frac{e^{-ar}}{r^2}
=\int_0^\infty w_a(t)e^{-tr^2}dt,
\qquad
w_a(t)=\operatorname{erfc}\left(\frac a{2\sqrt t}\right).
$$

One verification differentiates with respect to $a$: the integral of $t^{-1/2}e^{-tr^2-a^2/(4t)}$ is $\sqrt\pi e^{-ar}/r$, so the derivative is $-e^{-ar}/r$, and the value at $a=0$ is $r^{-2}$. The Gaussian integral itself follows from the substitution $t\mapsto a^2/(4r^2t)$, which implies that its derivative is minus $r$ times its value, together with its Gaussian value at zero. All differentiated integrals are convergent for $a>0$.

Apply the operator $-a\partial_a-1$ to this identity. Its weight is

$$
z_a(t)=\frac{a}{\sqrt{\pi t}}e^{-a^2/(4t)}-w_a(t).
$$

After positive-integral evaluation of the undifferentiated lattice sum and ordinary differentiation on compact positive $a$ intervals, it follows that

$$
3m(a)=\int_0^\infty z_a(t)R(t)\,dt.
$$

The continuum contribution cancels because its undifferentiated integral is $4\pi/a$, which $-a\partial_a-1$ annihilates. This cancellation occurs between finite quantities for $a>0$. Writing $x=a/(2\sqrt t)$ gives $|z_a(t)|\le1+\sqrt{2/(\pi e)}$, uniformly in $a,t$. For each fixed $t$, $z_a(t)\to-1$ as $a\downarrow0$. Dominated convergence against the integrable $R$ proves $m(a)\to-C_0/3$. No assertion of absolute convergence at $a=0$ is used.

## Strict comparison and the growing mode

The essential sign is $C_0-S<0$. A separate algebraic form of the Gaussian comparison makes its strictness explicit. Splitting integer pairs into equal and unequal parity after the change of variables $(m,n)\mapsto((m+n)/2,(m-n)/2)$ proves

$$
A(t)^2=A(2t)^2+B(2t)^2,\quad
B(t)^2=2A(2t)B(2t),\quad
C(t)^2=A(2t)^2-B(2t)^2.
$$

The sums are absolutely convergent. Squaring and subtracting gives $A^4-B^4=C^4$. To see the required inequality without assigning either integral an unproved sign, put $x=B^4/C^4>0$. Then

$$
A^3-B^3=C^3\left[(1+x)^{3/4}-x^{3/4}\right]<C^3<1.
$$

The bracket decreases strictly from one because its derivative is $(3/4)[(1+x)^{-1/4}-x^{-1/4}]<0$. The inequalities are strict since both $B$ and $C$ are positive. Gaussian transformation at $u=\pi^2/t$ now gives

$$
C_0-S=\int_0^\infty p(t)
\left[A(u)^3-B(u)^3-1\right]dt<0.
$$

The integral is finite because it equals the difference of the two already established finite integrals. Thus $C_0<S<0$ is accepted analytically. It does not depend on the subject's quadrature or its reported decimal values.

At the staggered wavevector, $F(Q,a)=f_g(a)I$, where

$$
f_g(a)=a^2-\frac{gS}{3}-g m(a),\qquad
\lim_{a\downarrow0}f_g(a)=\frac{g(C_0-S)}3<0.
$$

At large $a$, both exponentially weighted source sums tend to zero, so $f_g(a)\to+\infty$. Continuity therefore gives at least one positive zero for each $g>0$. The explicit staggered mode has finite ancient norm whenever $0<\eta<a_g/\ell$ and can have arbitrarily small amplitude. It satisfies the full linear equation, including the restoring receiver term. In the translated history norm its size grows by $e^{a_gT/\ell}$, so this is an instability of the declared linear system, rather than merely a positive number in an unrelated formal spectrum.

For nearby real wavevectors, choose positive endpoints $a<b$ at which $F(Q,a)$ is negative definite and $F(Q,b)$ positive definite. Matrix continuity preserves both signs in an open neighborhood of $Q$. Ordered eigenvalues of a real symmetric matrix vary continuously with the matrix, so each ordered eigenvalue crosses zero somewhere in $(a,b)$. This proves positive real characteristic roots in that neighborhood. It does not assert distinct crossings, a differentiable eigenvector family or a localized superposition theorem.

The finite-time linear continuation claim is also valid with its compatibility restriction made explicit. Distinct-source delays are at least one in normalized time. On each interval of length at most one, delayed source values are known, the current receiver term is an ordinary constant-coefficient equation, and the ancient remote tail remains exponentially bounded. Only finitely many source distances sample any newly constructed bounded interval. Position and velocity therefore have a unique finite-time continuation. A globally twice continuously differentiable history also requires its acceleration at the joining time to equal the displayed linear equation; the growing mode automatically has that compatibility. This construction supplies no nonlinear phase-space theorem.

## Adjudication, checks and remaining scope

The requested collective theorem is accepted at linear grade. Its decisive inputs are the complete ordinary-root row variation, integrated signed-cell estimates, exponentially decaying remote history, the dominated Gaussian remainder limit and the strict comparison $C_0<S$. The held-source restoring response remains a valid advantage over its matched inverse-square static comparison. That advantage does not provide collective stability for the present checkerboard: delayed responding sources yield growth for every positive coupling in the stated class.

**Claim grade: derived.** The separate mathematical controls are the longitudinal/transverse stationary row, row-by-row rigid translation, six-axis source matrix and explicit substitution of the staggered mode. Falsifiers are an incorrect delta-variation sign or factor; a nonintegrable signed-cell bound; a history correction or difference quotient exceeding the displayed summable domination; failure of the Gaussian-mixture identity or strict comparison; or an explicit growing mode that does not satisfy the full equation. A change of kernel, transmitter weight, background summation or ancient-history class changes the scenario rather than refuting this result.

No new numerical instrument was required, and no numeric target was replayed. The subject's measured constants and sampled root brackets are not independently certified here. The proof establishes existence rather than uniqueness, simplicity or a root enclosure. It provides no arbitrary nondecaying complete-past operator, imaginary-axis realization, left-half-plane spectrum, square-summable localized nonlinear disturbance, nonlinear instability theorem, retained population or variant-adoption decision.

The separately written document is the only durable edit in this assignment. The collective subject, static subject and original comparison script were inventoried with `shasum -a 256` before the edit; the recorded bindings are checked after validation in `.tmp/logarithmic-collective-adjudication/frozen.sha256`. Queue and disposition integration belong to the coordinator.
