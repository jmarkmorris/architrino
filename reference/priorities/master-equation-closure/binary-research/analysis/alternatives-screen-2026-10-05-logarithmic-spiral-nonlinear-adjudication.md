# Independent assessment of nonlinear departure from the expanding spiral

## Verdict and accepted statement

**Derived verdict: accepted, with the local symmetry-orbit and finite-departure scope stated in the subject.** The actual inverse-distance equation has complete compatible mirror-planar preparations arbitrarily close in $C^2$ to the specified spiral preparation whose nonlinear futures leave a fixed neighborhood of the local symmetry family in similarity-history norm. Separation, the complete ordinary root census and a strict speed margin persist through the constructed departure time. The proof uses an actual nonlinear time map on a solution manifold; it does not equate a growing linear mode with nonlinear departure without further argument.

The departure time has similarity-time order $\log(1/\eta)$. For each fixed $0<\beta<\alpha_0=0.0138698363660541$, the construction permits the stated upper bound $\tau_\eta\le C_\beta+\beta^{-1}\log(1/\eta)$ and the corresponding polynomial physical-time upper bound. Constants and neighborhoods are existential. Neither an exact departure-rate asymptotic nor any fate after departure is established.

No material defect was found. One local-neighborhood choice should be made explicit when using the observable-norm consequence: shrink the symmetry parameter chart so every representative extends regularly over the doubled observation window. This is possible uniformly on the fixed window and does not change the theorem. It is detailed below.

This is an independent analytical reconstruction after disclosure, using the Jack K. Hale lens. Its accepted premises are the earlier [exact spiral admission](alternatives-screen-2026-10-05-logarithmic-spiral-adjudication.md) and [Cartesian growing-mode assessment](alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-adjudication.md). No full spectral census, fastest-mode assertion, Weber/Darwin result or standard physical law is used.

## Sources and the external theorem actually checked

The [frozen nonlinear subject](alternatives-screen-2026-10-05-logarithmic-spiral-nonlinear-departure.md) has SHA-256 `4c0b6b39862e52dc0fb2ab27538586b978f7467ac71e908c0b93364375add785`, measured with `shasum -a 256`. It is not edited in this review.

I read conditions (S1)–(S3), Theorem 3.2.1 and the following local Lipschitz discussion in the [primary Hartung–Krisztin–Walther–Wu source, Section 3.2, printed pages 29–30](https://aimath.org/WWN/variabletimelag/sur0b.pdf). The theorem requires a $C^1$ functional on an open $C^1$ history domain, derivatives extendible to continuous history directions, jointly continuous extended evaluation, and a nonempty compatibility set. It gives a $C^1$ compatibility manifold, a local semiflow with $C^1$ fixed-time maps, and the variational derivative. The same source distinguishes joint evaluation continuity from the stronger operator-norm continuity on continuous histories. These are the imported mathematical facts; the specific checks and the departure proof below are reconstructed independently.

## Full phase space and the derivative-extension condition

Use the full first-order state $Z=(U_+,V_+,U_-,V_-)$, with $V_i=U_i'$ and twelve real components, on $C^1([-H,0],\mathbb R^{12})$. Choose $H>h_*=-\log\lambda$ and a strict interior interval of allowed delays around $h_*$. At the equilibrium the history is $\phi_*=(A,0,-A,0)$.

The ambient open set must not impose $u'=v$ throughout the supplied segment. For an arbitrary ambient history $\phi=(u,v)$, define the partner clock by

$$
G_i(\ell,\phi)=1-\ell-
|u_i(0)-\ell P_\ell u_j(\log\ell)|=0,
\qquad P_\ell=e^{\Omega\log\ell}.
$$

Let $s=\log\ell$, $C=u_i(0)-\ell P_\ell u_j(s)$ and $n=C/|C|$. The derivative with respect to $\ell$ is

$$
G_\ell=-1+n\cdot P_\ell[(I+\Omega)u_j(s)+u_j'(s)]
=:-D_{\rm clock}.
$$

At the equilibrium $D_{\rm clock}=1/\lambda>0$. A sufficiently small open $C^1$ neighborhood preserves that bound, the positive chord length and the interior source point. The implicit-function theorem therefore defines a $C^1$ clock. For a history direction $\chi$,

$$
D\ell(\phi)\chi
=-\frac{n\cdot[\chi_{u_i}(0)-\ell P_\ell\chi_{u_j}(s)]}{D_{\rm clock}}.
$$

Only values of the direction occur. This formula extends to continuous directions and is jointly continuous in the $C^1$ base history and continuous direction.

The physical source velocity in the equation is instead

$$
W=P_\ell[v_j(s)+(I+\Omega)u_j(s)],\qquad D=1-n\cdot W.
$$

On arbitrary ambient histories, $D$ need not equal $D_{\rm clock}$. Both equal $1/\lambda$ at the equilibrium and both remain positive after shrinking the neighborhood. The use of independent $u,v$ components is therefore consistent; replacing $u_j'$ by $v_j$ in the implicit-function calculation before restricting to physical histories would not be justified.

For clarity, the full velocity differential has the form

$$
DW(\phi)\chi=P_\ell[\chi_{v_j}(s)+(I+\Omega)\chi_{u_j}(s)]
$$

$$
\hspace{1em}
+\frac{D\ell(\phi)\chi}{\ell}P_\ell
\{\Omega[v_j+(I+\Omega)u_j]+v_j'+(I+\Omega)u_j'\}(s).
$$

The derivatives $u_j',v_j'$ are coefficients belonging to the base history; no derivative of $\chi$ occurs. The same is true for the differential of $C/(d^2D)$, where $d=1-\ell$. Thus the actual first-order functional

$$
f_i(\phi)=\left(v_i(0),
-(I+2\Omega)v_i(0)-(\Omega+\Omega^2)u_i(0)-C_i/(d_i^2D_i)\right)
$$

satisfies all three smoothness conditions. Moving evaluation is continuous jointly in its base and direction, although it is generally not operator-norm continuous on the unit ball of $C^0$. The proof does not require the latter false property.

The explicit coefficient formulas also give a uniform bound for the extended derivatives on a smaller convex $C^1$ ball. Integrating along a line segment within that ball gives $|f(\phi)-f(\psi)|\le L\|\phi-\psi\|_{C^0}$. This local estimate is what is needed for finite-time control and the doubled-window observation argument.

Balance puts $\phi_*$ in $X_f=\{\phi:\phi'(0)=f(\phi)\}$. Its tangent space is the closed subspace $E=\{\chi:\chi'(0)=Df(\phi_*)\chi\}$. The cited theorem therefore supplies precisely the differentiable time maps used below.

## Physical histories, complete roots and the original preparation

Physical data satisfy $u'=v$ across their supplied segment. This relation is preserved by the first component of the equation; after one full history width every generated segment is physical, even for an ambient manifold construction. The witnessing histories are physical from the start. Their finite-time $C^{2,1}$ regularity follows because the actual source clock has bounded derivative, delayed source jets are locally Lipschitz, and the chord and transmitter denominators stay separated from zero.

For physical histories in the smaller chart,

$$
q_i'=e^{\Omega\tau}[V_i+(I+\Omega)U_i]
$$

stays uniformly below unit speed, and $|U_+-U_-|$ stays positive. The old supplied past has its own fixed speed margin. The complete chord argument then gives exactly one partner root per receiver and no positive-delay self root over the joined history. The locally implicit clock is that complete root. No missing earlier root or arbitrary root selector is concealed in the functional formulation.

The original preparation is not a constant similarity history on all of $[-H,0]$: its earlier held tail and patch intrude if $H>h_*$. The finite entry step in the subject correctly avoids replacing that preparation. The accepted compatible-history construction gives a family with variation supported in one fixed finite physical past interval, $C^2$ difference $O(\eta)$, and a certified modal tangent on the retained analytic source segment. A release correction of size $o(\eta)$ supplies exact compatibility while preserving that tangent.

On the fixed physical interval through $T_e=e^{\tau_e}-1$, $\tau_e>H$, the base has positive source delay, complete speed margin and bounded source jets. A finite history width contains all base and nearby source times there. The same implicit-clock differentiability and compatible-state construction in physical coordinates yield finite-time $C^1$ dependence. Consequently, in the manifold chart at the generated entry,

$$
z_\eta=\eta\chi_e+o(\eta),\qquad \chi_e\ne0,
$$

where $\chi_e$ is the certified modal history advanced through the finite entry time. Every point of that segment is generated future, so its base is exactly $\phi_*$. This proves the needed reachability of the tangent from the specified complete preparation without inverting a delay time map or asserting that arbitrary manifold points can be so reached.

## Compact linear time map and the spectral cut

At equilibrium the variational equation is $\xi'=L\xi_\tau$ with $L$ bounded on continuous first-order histories. Delayed state derivatives do not enter as independent variables. The clock contribution contains only fixed coefficients and delayed position/velocity components. It is therefore an ordinary delay linear equation in the full first-order state, despite the source acceleration coefficient that appeared when differentiating the clock.

For a fixed $a>H$, bounded $C^1$ input histories give uniformly bounded $\xi$ and $\xi'$ on $[-H,a]$. Since $L$ is constant, differentiation for positive time gives $\xi''=L(\xi')_\tau$, also uniformly bounded. The segment at $a$ lies strictly after zero, so values and first derivatives are bounded and equicontinuous. Arzela–Ascoli gives compactness of $\mathcal A=\mathcal T(a)$ in $C^1$ on $E$. Compatibility passes to the limit. Nonlinear compactness is not invoked.

The admitted mode supplies multipliers $e^{ka},e^{\bar k a}$ with modulus at least $e^{\alpha_0a}>1$. Choose $r_c$ between one and this bound, avoiding the compact operator's spectrum. Let $E_u$ contain every generalized eigenspace with modulus above $r_c$, and let $E_s$ be its invariant complement. The former is finite dimensional and contains $\chi_e$. The complementary spectral radius is strictly smaller than the smallest modulus retained in $E_u$.

Thus one can choose $1<b<m$ between those spectral sets and use equivalent norms with

$$
\|\mathcal A_s\|\le b,\qquad
\|\mathcal A_u^{-1}\|\le m^{-1}.
$$

The subject's supremum norms follow directly from the strict spectral-radius inequalities and have these bounds. Use their maximum on the direct sum.

This resolves the possible slow-mode/fastest-mode mismatch. The proof does not place only the known pair in $E_u$ while leaving unknown faster modes in $E_s$. It includes all multipliers above the cut. The known pair is sufficient to put the actual entry tangent in this expanding block. Unknown faster modes cannot defeat its lower expansion bound. Nonzero generalized eigenspaces are physical because $\mathcal A$ has physical generated histories in its range and is invertible on each such finite-dimensional block.

## Nonlinear cone and finite regular departure

In a $C^1$ manifold chart, the time-$a$ map is $P(z)=\mathcal Az+R(z)$ with $\|R(z)\|\le\varepsilon\|z\|$ on a sufficiently small ball. This is a uniform consequence of differentiability, with no quadratic remainder assumption.

For $z=(u,s)$ in the cone $\|s\|\le\|u\|$, the maximum norm is $\|u\|$. Hence

$$
\|u_+\|\ge(m-\varepsilon)\|u\|,
\qquad \|s_+\|\le(b+\varepsilon)\|u\|.
$$

Choose $\varepsilon$ so that $\gamma=m-\varepsilon>1$ and $b+\varepsilon<\gamma$. The cone is invariant while iterates remain in the chart, and the unstable component grows by at least $\gamma$. The actual entry family lies in the cone because its leading tangent is nonzero in $E_u$ and its $E_s$ component is $o(\eta)$.

Also $\|P(z)\|\le M\|z\|$ for a fixed $M>1$. Let $N_\eta$ be the first step at which $\|u\|\ge d_0$, for a fixed sufficiently small threshold. Its preceding steps have full norm below $d_0$, the exit step has full norm at most $Md_0$, and

$$
\frac{\log(d_0/\|u_\eta\|)}{\log M}
\le N_\eta
\le1+\frac{\log(d_0/\|u_\eta\|)}{\log\gamma}.
$$

Existence of that step follows by contradiction from the lower geometric growth if all iterates stayed below threshold. This is an argument about the nonlinear map, not an extrapolation of the mode.

Between sample times, the local $C^0$ Lipschitz bound on $f$, its integral equation and Gronwall give a fixed bound $C_a$ for the $C^1$ state deviation during one time step. Shrinking $d_0$ so that $C_aMd_0$ stays inside all regularity, speed, separation and clock margins prevents an earlier chart exit. Local continuation then gives an actual solution through the exit step. The complete earlier supplied data were unchanged outside their authorized small perturbation, so the full root census remains valid through departure.

## Distance from the full local symmetry family

At a fixed similarity reference time, translations, rotations and time-origin shifts give the explicit seven-parameter family in the subject. Its parameter derivative is injective. Common translations account for three independent directions; the three rotations give axial and two tilt directions; the time-origin direction has an independent relative radial component. Dilation is a combination already present. Thus the local family is an embedded $C^1$ submanifold $\mathcal S$ of compatible histories.

Its tangent consists of the accepted modes with real parts zero or minus one. All corresponding time-$a$ multipliers have modulus at most one. Hence the spectral projection onto $E_u$ annihilates $T_{\phi_*}\mathcal S$. In manifold coordinates every sufficiently nearby symmetry point $w$ satisfies $\|w_u\|\le\kappa\|w_s\|$ with a fixed $\kappa<1/4$. This follows from differentiability and injectivity of the symmetry differential into $E_s$; it does not identify all of $E_s$ with symmetry directions.

If a cone point $z$ were within $\|u\|/4$ of such a symmetry point, projection to the two components would give $\|w_u\|>3\|u\|/4$ and $\|w_s\|<5\|u\|/4$, contradicting the preceding inequality. The exit point consequently has a fixed positive distance from the local orbit. The manifold chart and its inverse have bounded derivatives on a smaller neighborhood, so this lower bound transfers to the original $C^1$ history norm.

The witnessing family remains mirror-planar under the exact equation, but the comparison family allows all translations and rotations in three dimensions. Their inclusion cannot remove the departure. The conclusion is local in symmetry-parameter space; it is not a statement about distance to remote or singularly parameterized formal spirals.

## Observable norm and departure-time bounds

For the doubled-window conclusion, choose the local symmetry chart small enough that its explicit representatives extend over $[-2H,0]$ and all their subsegments remain in the regular neighborhood. In particular, the normalized time-origin parameter may be bounded by a fixed fraction of $e^{-2H}$, keeping its logarithm argument positive. Translations and rotations extend continuously over this fixed compact window as well. This is a harmless further shrinking of the already local orbit chart.

For small enough $\eta$, the departure time tends to infinity and its preceding $2H$ window is generated. For each such symmetry representative $w$, both trajectories obey the same first-order equation on the shorter last window. Therefore

$$
\|Z_{\tau_\eta}-w_{\tau_\eta}\|_{C^1([-H,0])}
\le(1+L)\|Z-w\|_{C^0([\tau_\eta-2H,\tau_\eta])}.
$$

The value estimate is immediate; each derivative difference is a difference of $f$ on histories contained in the doubled window. Taking the infimum over the same local orbit gives a fixed positive uniform position/velocity-history departure. The change from $(U,V)$ to $(U,e^{-\Omega\tau}q')=(U,V+(I+\Omega)U)$ has a fixed bounded inverse, so no acceleration observation is required. This is a finite similarity-window observation, not an asserted displacement at one instant or on a fixed-duration physical window.

Since $\|u_\eta\|\asymp\eta$, the two cone bounds imply $\tau_\eta=\tau_e+aN_\eta\asymp\log(1/\eta)$. For a chosen $0<\beta<\alpha_0$, place the spectral cut above $e^{\beta a}$ and below $e^{\alpha_0a}$. Compactness permits a cut avoiding the spectrum; choose $m$ and then $\varepsilon$ so that $\gamma>e^{\beta a}$. The claimed logarithmic upper bound follows, and exponentiating gives the polynomial bound on $1+T_\eta$. Uncomputed modes can accelerate departure, so an equality with inverse growth rate is neither needed nor established.

## Falsifiers, validation and disposition

The accepted result concerns actual nearby complete compatible histories and their finite regular departure, with the unchanged $p=1$, $K=R_*=c_f=1$ law. It does not assert that the perturbed futures remain uniformly subfield after departure, stop dispersing, collide, or approach another state. No numerical neighborhood, threshold or departure constant is certified.

Load-bearing falsifiers are: a derivative of a variation direction entering the claimed continuous-direction extension; loss of either clock or transmitter margin in the chosen ambient chart; failure of the original-history entry tangent to equal the admitted mode; failure of linear compactness after a full history width; placing an unknown faster multiplier in the complementary spectral block; failure of the uniform differentiability remainder or cone inequalities; or a symmetry tangent with a positive multiplier. A later nonlinear outcome different from the base spiral does not by itself refute the theorem, which stops at departure.

Validation is analytical and source-based: the primary theorem and its exact smoothness hypotheses were checked, the actual implicit functional and extension were differentiated, finite-time entry was reconstructed, and compactness, spectral norms, the nonlinear cone, local symmetry distance and doubled-window estimate were proved above. No new numerical instrument or target was needed. Measured repository validation: repeated `shasum -a 256` returned the frozen subject hash recorded above, and `git diff --no-index --check /dev/null` applied to this new assessment returned no whitespace diagnostics. These checks establish repository facts only.

Only this new assessment is written. The nonlinear subject, previous subjects and evidence, shared manuscripts, ledgers, registries and priorities remain outside this review's write scope. No production solver, publication or generator is changed, and no owned process is active. This bounded review is complete and returns integration to the principal investigator.
