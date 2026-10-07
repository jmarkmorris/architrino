# A necessary alignment for bounded angular motion on a nonmirror zero-speed tail

**Grade: derived conditional candidate, awaiting independent assessment.** The affine common-center anisotropy is the leading row of an actual coupled tail when relative velocity tends to zero and midpoint velocity has a limit. It need not disappear with increasing separation. If the direction also converges and the relative angular-motion vector remains bounded, that limit imposes a precise alignment condition. This identifies a restriction on transferring the mirror theorem's full asymptotic estimates; it is not a counterexample to dispersal and supplies no claim that the selected mirror member has zero terminal speed.

The equation and fixed source are those in the [Package D method record](authorized-cases-ten-hour-d-primary-method.md), with unchanged canonical inverse-square acceleration, $c_f=1$ and fixed $K>0$. The [independently accepted affine control](authorized-cases-ten-hour-d-common-center-control.md) is used only after deriving how the actual coupled source windows approach its row. No affine path is substituted for the actual solution.

## Conditional coupled tail and complete roots

Let an actual ordinary coupled solution have complete supplied and generated speed bounded by a single $\beta<1$. Set

$$
Z=X_+-X_-,\quad d=|Z|,\quad N=Z/d,\quad
U=V_+-V_-,\quad C=\frac{X_++X_-}{2}.
\tag{1}
$$

Suppose, as explicit conditional hypotheses,

$$
d(t)\longrightarrow\infty,\qquad U(t)\longrightarrow0,\qquad
C'(t)\longrightarrow c.
\tag{2}
$$

Thus both individual velocities tend to the same vector $c$, with $|c|\le\beta<1$. The relative zero-speed assumption is stronger than dispersal. It is one branch permitted, but not selected, by the accepted mirror theorem.

Complete strict speed yields exactly one partner root per receiver and no positive-delay self root. With $m=1-\beta$, both actual delays obey

$$
\frac{d(t)}{1+\beta}\le R_\pm(t)\le\frac{d(t)}m.
\tag{3}
$$

Because $|d'|\le|U|\to0$, one has $d(t)/t\to0$. It follows that $t-d(t)/m\to\infty$. Therefore both actual source clocks, and every time between either source and reception, eventually lie in the generated future and tend to infinity. No fixed finite history truncation is assumed.

Define the tail velocity modulus

$$
\omega(t)=\max_{i\in\{+,-\}}
\sup_{u\ge t-d(t)/m}|V_i(u)-c|.
\tag{4}
$$

It tends to zero. The definition uses the actual coupled velocities; it is not an assumed decay rate.

## The actual moving-clock rows approach the affine evaluation

For the positive receiver, its actual chord has the exact integral form

$$
S_+(t)=Z(t)+\int_{t-R_+}^tV_-(u)\,du
=dN+cR_++E_+,
\qquad |E_+|\le R_+\omega(t).
\tag{5}
$$

For the negative receiver the same formula holds with $-dN$, its own $R_-$, and the other source velocity. Set $\rho_\pm=R_\pm/d$. The normalized root equations are consequently

$$
\rho_\pm=|\pm N+c\rho_\pm+E_\pm/d|,
\qquad |E_\pm|/d\le\rho_\pm\omega(t).
\tag{6}
$$

For fixed reception direction $N(t)$, compare these with the exact affine equations $\bar\rho_\pm=|\pm N+c\bar\rho_\pm|$. Their gap has monotonicity constant at least $m$, because $|c|\le\beta$. The actual roots lie in $[1/(1+\beta),1/m]$, so (6) gives

$$
|\rho_\pm-\bar\rho_\pm|\le\frac{\omega(t)}{m^2}.
\tag{7}
$$

Put

$$
a(t)=c\cdot N(t),\qquad
q(t)=\sqrt{1-|c|^2+a(t)^2}>0.
\tag{8}
$$

The complete affine algebra then gives $\bar\rho_+=(q-a)^{-1}$ and $\bar\rho_-=(q+a)^{-1}$. Equation (7), (5), and the actual source-velocity convergence show that both directions and both transmitter factors approach their corresponding affine values. All ranges divided by $d$ and all transmitter denominators stay uniformly bounded above and away from zero. Applying the unchanged smooth canonical row on this compact set proves the following actual coupled asymptotics:

$$
C''(t)=\frac K{d(t)^2}\{2a(t)N(t)-c\}
+o(d(t)^{-2}),
\tag{9}
$$

$$
Z''(t)=-\frac{2K}{d(t)^2q(t)}
\{(1-|c|^2+2a(t)^2)N(t)-a(t)c\}
+o(d(t)^{-2}).
\tag{10}
$$

Each remainder means its norm multiplied by $d(t)^2$ tends to zero. The convergence is uniform in the instantaneous direction $N(t)$; convergence of that direction was not used to derive (9)–(10). These are asymptotic identities conditional on an actual solution satisfying (2), not an auxiliary equation chosen as a new physical law.

Constant complete affine sources make $E_\pm=0$ and $\omega=0$, recovering the previously independently checked rows exactly. The static, parallel-drift and perpendicular-drift specializations provide known analytical sign controls before the actual-tail consequence below.

## A bounded angular-motion vector forces alignment

Let

$$
H(t)=Z(t)\times U(t).
\tag{11}
$$

It is the relative angular-motion vector; no physical mass or conserved angular momentum is assumed. Suppose in addition to (2) that

$$
N(t)\longrightarrow N_\infty,
\qquad \sup_{t\ge T}|H(t)|<\infty
\tag{12}
$$

for some finite $T$. Differentiating (11) and using (10) gives

$$
H'(t)=\frac{2K a(t)}{d(t)q(t)}N(t)\times c+o(d(t)^{-1}).
\tag{13}
$$

The necessary condition is

$$
(c\cdot N_\infty)(N_\infty\times c)=0.
\tag{14}
$$

To prove it, suppose the vector on the left is nonzero. The coefficient of $1/d$ in (13) then converges to a nonzero vector $L$. Project onto the unit vector $L/|L|$. For all sufficiently large $t$ the resulting derivative is at least $|L|/(2d(t))$. But $d(t)=o(t)$ implies $d(t)\le t$ eventually in the normalized units, and hence $\int^\infty dt/d(t)=\infty$. The projected $H$ is unbounded, contradicting (12).

Thus, if $c\ne0$, the limiting relative direction must be perpendicular or parallel to the terminal midpoint velocity. This condition is exact at the stated conditional grade; the size of $c$ does not remove it. The proof assumes no specific parabolic rate, no physical energy account, no renewed supplied circle, and no fixed-clock approximation.

## Meaning for the nonmirror transfer

The accepted mirror theorem supplies finite limiting direction and finite angular motion, while allowing zero terminal relative speed. A finite nonmirror perturbation may introduce a nonzero terminal midpoint velocity. Equations (9)–(14) show that one cannot transfer all of those mirror asymptotic properties with unrestricted independent limiting directions merely by proving that midpoint velocity is small. A generic nonzero angle between $c$ and $N_\infty$ produces a torque of order $|c|^2/d$, whose absolute time integral need not be controlled by the accepted integrability of $1/d^2$.

This identifies an exact failed bound: replacing the nonlinear anisotropic relative row by an error $O(|c|^2/d^2)$ and then estimating angular motion absolutely requires an integral of $1/d$, which diverges on the zero-relative-speed tail. Even an arbitrarily small fixed nonzero coefficient does not repair an infinite integral. The actual direction or angular motion may change, the perturbed terminal relative speed may become positive, or an alternative anisotropic account may control the dynamics. None of those possibilities is excluded here.

Accordingly, this is not a demonstration that any admissible nonmirror perturbation fails to disperse. It does not establish that the selected mirror member has zero terminal speed, that the nominal historical member has nonzero terminal midpoint speed, or that either member realizes a forbidden limiting orientation. Those are separate dynamical or source-binding obligations. The result prevents promoting the accepted linear midpoint bound and mirror finite-angle argument directly to a complete nonlinear theorem.

Falsifiers are an actual coupled tail satisfying (2) whose normalized root error violates (7), an omitted factor or sign in (9)–(10), a history satisfying (2) and (12) but violating (14), or convergence of $\int dt/d$ despite $d=o(t)$. A dispersing perturbation with unbounded $H$, altered limiting direction, or positive terminal relative speed does not refute the theorem. No numerical target, solver, source replacement, changed equation, shared-owner edit or reference edit was used.
