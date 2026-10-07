# Local parameter continuity on the positive terminal branch

**Independent derived reconstruction, frozen before reading the coordinator's new continuity candidate.** Within the one complete preparation family already admitted for $0<\epsilon\le e_0=2^{-200000}$, the set of parameters having positive terminal speed is relatively open, and its terminal physical velocity vector is continuous. This statement concerns the same two labels, planar mirror history, fixed cutoff, compatible degree-five branch, amplitude-gradient response and $K=c_f=1$. It does not concern arbitrary perturbations of the history, continuity at a zero-speed member, or a neighborhood beyond the admitted interval.

The proof below derives finite-prefix parameter continuity directly by positive-delay steps. It does not infer neutral-history flow continuity from the analyticity of a finite comparison polynomial. All-future existence, actual $C^{5,1}$ regularity, the complete root census and the exact tail estimate are the separately accepted premises in the [quantitative adjudication](authorized-cases-ten-hour-reference-b-adjudication.md). No new trajectory, instrument or numerical target is used.

## Fixed premises and notation

Use the [exact case](authorized-cases-ten-hour-b-case.md), with physical and scaled coordinates related by

$$
X_\epsilon(T)=R_0(\epsilon)y_\epsilon(s),\qquad
R_0(\epsilon)=\frac1{4\epsilon^2},\qquad
s=4\epsilon^3T.
$$

Thus $X_\epsilon'(T)=\epsilon y_\epsilon'(4\epsilon^3T)$, where primes on $y$ refer to scaled time. Write $r=|y|$, $v=y'$, $p=r'$ and $h=y\times v$. The accepted all-future construction gives $r>r_*=2^{-13}$, complete physical speeds below $1/8$, exactly one ordinary partner root, and no positive-delay self root. The source clock obeys

$$
s-s_d=\epsilon L,\quad L=|y(s)+y(s_d)|,\quad
\frac{16}9r\le L\le\frac{16}7r,\quad
\frac57r\le r_d\le\frac97r,\quad
\frac78\le D=1+\epsilon n\cdot v_d\le\frac98.
\tag{1}
$$

Every intermediate source-segment radius has the same comparison. The source clock is strictly increasing; its initial value is in $(-3\epsilon,0)$. The older constant and cutoff past remains part of the root proof even when no future reception samples it.

The accepted positive-account passage reaches an actual outward state with

$$
\mathcal E>0,\qquad p>0,\qquad w=h^2/r<1,\qquad r\mathcal E<128,
\tag{2}
$$

where

$$
\mathcal E=\frac{|v|^2}2-\frac1r-
\frac{\epsilon^2h^2}{2r^3}-\frac{4\epsilon^3p}{3r^2}.
\tag{3}
$$

This is an auxiliary account, not physical energy. From (2) until its first tail entry $r\mathcal E=128$, the accepted passage gives $\mathcal E'>0$, $rp^2\ge1$, decreasing $w$ and continued complete source coverage. At entry $t_\epsilon$,

$$
r_t p_t^2\ge257,\qquad r_t|v_t|^2<259.
\tag{4}
$$

The subsequent exact delayed row gives

$$
|y_\epsilon''(s)|\le16r_\epsilon(s)^{-2},\qquad
p_\epsilon(s)\ge p_t/\sqrt2>0\quad(s\ge t_\epsilon).
\tag{5}
$$

These are the [direct-release tail](authorized-cases-ten-hour-b-direct-release-candidate.md#6-exact-tail-and-continuation) and [passage audit](authorized-cases-ten-hour-b-passage-audit.md#exact-outward-and-tail-factors), as accepted by the quantitative adjudication. The argument uses the exact bound (5) after tail entry, never an extension of the parabolic expansion to a ballistic tail.

## Finite-prefix continuity of the actual neutral solution

Fix an admitted $\epsilon_*>0$ and any finite scaled time $S$. Restrict the parameter to a small relative neighborhood with $\epsilon_*/2<\epsilon<3\epsilon_*/2$, intersected with $(0,e_0]$. Set $\epsilon_-=\epsilon_*/2$ and let $\epsilon_+\le e_0$ be a fixed upper bound. The same fixed-cutoff past varies continuously in the $C^2$ supremum norm on its entire negative half-line: only the polynomial coefficients vary, the compatible jets depend analytically on $\epsilon$ by the already proved uniform contraction, and all negative-time variation vanishes before $-1/8$. This claim concerns the actual prescribed past, not a finite normal form.

Equation (1) supplies a common positive delay

$$
s-s_d\ge d_*:=\frac{16}9\epsilon_-r_*>0.
\tag{6}
$$

Partition $[0,S]$ into finitely many steps of length less than $d_*/2$. At reception in one step, every source lies strictly inside the completed history ending at the previous step face. By clock monotonicity, all required source times lie in the common finite interval $[-3\epsilon_+,S]$. This includes every negative source point and every generated seam.

Here is the direct continuity estimate used on one step. Denote a completed history by $H$ and current position by $z$. Its root solves

$$
g(q)=s-q-\epsilon|z+H(q)|=0,\qquad
-\partial_qg=1+\epsilon n\cdot H'(q)\ge7/8.
\tag{7}
$$

On a compact tube about the base step, separation and the denominator remain strict. Comparing the two root equations and using (7) bounds root displacement by a finite constant times

$$
|\epsilon-\epsilon_*|+|z-z_*|+\|H-H_*\|_{C^0}.
\tag{8}
$$

The exact row is a smooth finite-dimensional function of $\epsilon,z,H(q),H'(q),H''(q)$ wherever its range and $D$ are positive. For the acceleration value, split

$$
H''(q)-H_*''(q_*)=
[H''(q)-H_*''(q)]+[H_*''(q)-H_*''(q_*)].
\tag{9}
$$

The first term is bounded by the completed-history $C^2$ difference. The second uses only the bounded jerk of the base completed history. Its $C^{5,1}$ regularity supplies that bound across the retained sixth-derivative seams. Position and velocity are handled in the same way. Consequently the exact acceleration difference has the bound

$$
|F_\epsilon(z;H)-F_{\epsilon_*}(z_*;H_*)|
\le C\bigl(|z-z_*|+|\epsilon-\epsilon_*|
+\|H-H_*\|_{C^2}\bigr).
\tag{10}
$$

No uniform high-derivative continuity of the neighboring histories is assumed in (9). No derivative of a sixth-order seam is taken. Root monotonicity for the neighboring physical solutions is already supplied by their accepted complete-speed bound; comparison points remain in a compact nonsingular tube after shrinking the parameter neighborhood.

Integrating the first-order equations for $(y,v)$ and applying the elementary integral Gronwall inequality to (10) proves uniform position and velocity convergence on the step. Substitution into (10) then proves uniform acceleration convergence. A first-exit argument keeps the solutions in the chosen tube. Induction over the finite partition proves

$$
\epsilon\longmapsto y_\epsilon|_{[-3\epsilon_+,S]}
\quad\hbox{is continuous in }C^2.
\tag{11}
$$

The accepted theorem already supplies existence and uniqueness of the physical solutions used here. Alternatively, on each step its known completed history turns the equation into an ordinary differential equation with a locally Lipschitz current-state right side, which supplies the same local continuation. Equation (11) needs no theorem asserting continuity of a general neutral semiflow. A missing positive delay, discontinuous source acceleration, a nonsimple root, or lack of a complete source-history norm would break this proof; none occurs in the admitted family.

## Uniform tail entry from a strict finite section

Suppose the base parameter $\epsilon_*$ has positive terminal speed. The accepted dichotomy and passage then supply a finite scaled reception $s_0$ satisfying all four strict inequalities (2). One may take the actual outward $w=1/2$ section after a positive account crossing. Choose $e>0$ with $\mathcal E_{\epsilon_*}(s_0)>2e$. By (11) and the finite-state formula (3), a relative parameter neighborhood $U$ preserves (2) and

$$
\mathcal E_\epsilon(s_0)\ge e,\qquad \epsilon\in U.
\tag{12}
$$

This is already a family-local positive-branch criterion: each member has crossed to positive account at a finite time on its unchanged complete history. To make the later convergence uniform, put $R=128/e$. Until that member's tail entry, account increase and $r\mathcal E<128$ imply $r<R$. Since $p\ge r^{-1/2}$ on this outward interval,

$$
\frac d{ds}r^{3/2}\ge\frac32.
$$

Thus every entry occurs by the common finite scaled time

$$
t_\epsilon\le S:=s_0+\frac23R^{3/2}+1.
\tag{13}
$$

The extra unit makes the chosen common time strictly later than all entries. This proof does not require differentiability or continuity of the first-hitting-time map. It also covers a nearby member whose positive crossing occurred earlier.

At every such entry, $r_*<r_t\le R$. The entire sampled source segment has radii between $(5/7)r_t$ and $(9/7)r_t$, and source delay at most $(16/7)\epsilon_+R$. It lies in the common completed prefix $[-3\epsilon_+,S]$, because no later source clock returns below its release value. The accepted transition's ballistic jet bounds use the same global floor $r_*$ and hence are uniform for this family neighborhood. In particular, this argument neither restarts with a newly supplied past nor drops source acceleration. Source points can lie before their own tail entry; the accepted transition bounds explicitly cover that possibility.

## Uniform remainder and continuity of the terminal vector

Set

$$
\nu=\sqrt{\frac{257}{2R}}>0.
\tag{14}
$$

Equations (4)–(5) give $p_\epsilon\ge\nu$ after each entry. For every $\epsilon\in U$ and $s\ge S$,

$$
r_\epsilon(s)\ge r_*+\nu(s-S),\qquad
|y_\epsilon''(s)|\le
\frac{16}{[r_*+\nu(s-S)]^2}.
\tag{15}
$$

The complete tail and its causal windows remain those of the accepted exact equation. In particular, future roots never reach an older uncontrolled time: their clocks increase, and the supplied past plus the completed prefix was retained at entry. The global strict speed bound provides the unique partner root and exclusion of self roots at every later reception.

Integrating (15) gives a uniform vector remainder for $v_\infty(\epsilon)=\lim_{s\to\infty}y_\epsilon'(s)$:

$$
|v_\infty(\epsilon)-y_\epsilon'(s)|
\le\frac{16}{\nu[r_*+\nu(s-S)]}\quad(s\ge S).
\tag{16}
$$

The family maps $\epsilon\mapsto y_\epsilon'(s)$ are continuous by (11), and (16) makes their convergence uniform on $U$. Their limit is continuous there. Moreover $|v_\infty(\epsilon)|\ge\nu$, since $|v_\epsilon|\ge p_\epsilon\ge\nu$ throughout the tail. Therefore the positive-terminal-speed set is relatively open at every positive member, including a one-sided neighborhood of the admitted upper endpoint.

The physical terminal vector is

$$
V_\infty(\epsilon)=\epsilon v_\infty(\epsilon).
\tag{17}
$$

It is continuous and has $|V_\infty(\epsilon)|\ge\epsilon_-\nu>0$ on $U$. This multiplication is essential; $v_\infty$ and $V_\infty$ are different normalizations.

A common physical tail-entry time is $T_c=S/(4\epsilon_-^3)$. For $T\ge T_c$, (16) yields the uniform physical remainder

$$
|V_\infty(\epsilon)-X_\epsilon'(T)|
\le
\frac{16\epsilon_+}
{\nu[r_*+\nu(4\epsilon_-^3T-S)]}.
\tag{18}
$$

Finite-prefix physical continuity also follows from (11), since $4\epsilon^3T$ varies continuously with $\epsilon$, remains in a common compact scaled interval for fixed finite $T$, and the scaled solutions converge there. Position includes the continuous factor $R_0(\epsilon)$, which is bounded on this local interval away from zero. No uniformity as $\epsilon\downarrow0$ is claimed.

## Scope, source binding and falsifiers

This derived result turns an already classified positive member into a locally robust parameter statement. Its neighborhood is existential unless finite-prefix sensitivity and strict section margins are quantified; it does not improve the separate explicit phase-based interval width or terminal-speed bounds. It proves continuity on the open positive subset, without claiming continuity across zero-speed members, positivity for every admitted parameter, differentiability of terminal velocity, or robustness outside the prescribed mirror family.

The argument is independent of high-order finite coefficient analyticity except for continuity of the original compatible preparation branch, which follows from the already accepted compatibility contraction. Its new finite-flow proof uses actual completed histories and the exact acceleration row. Its tail proof uses only the independently accepted passage and exact acceleration estimate. A counterexample to (11), an omitted source segment in the accepted transition, loss of the strict section (2), or failure of the exact bound (5) would invalidate the corresponding conclusion.

Source identities measured by standard SHA-256 hashing before this freeze:

| Source | SHA-256 |
| --- | --- |
| Fixed case | f71e4d62ac98f7de0ab0b958166b70a5e816e0945e1572fd07bbf84b695274cb |
| Quantitative adjudication | de94d663737d7d004cd2dcbf39f52ea0b4d23742f68d47eaf50de4e08dc071a5 |
| Direct-release subject | b413320fc2f358910e0205def7bb7e34d992148ccd477c0b670ad36c4304d38b |
| Passage audit | e1ec0dad4904046203b77a258e7e413ee877fca2de9ff4a219db76b724fb2432 |
| Fixed-member terminal classification | 6f2c41d88c6cbe83d201b2ab711fc41f2d877be43588575211d336a3abae62cc |

The analytical controls are the exact integral of a reciprocal-square linear-radius bound in (16), the parameter-free history comparison in (10), and the explicit scale derivative $R_0(4\epsilon^3)=\epsilon$. No scientific computation, Python invocation, detached process, Git mutation, source replacement or generated write occurred. The only new file at this independent freeze is this reference reconstruction; existing subjects and references remain unchanged.
