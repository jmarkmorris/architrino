# A speed limit forces convergence of the normalized history to the spiral orbit

## Conditional shape theorem

Claim grade: derived candidate, awaiting independent assessment. Suppose an all-future regular strict-subfield continuation of a sufficiently small member of the admitted logarithmic family has a scalar speed limit. Then its normalized, currently aligned position and velocity histories converge to those of the exact admitted expanding spiral on every fixed positive scale interval. In particular, with $w=t-s_0$,

$$
\frac{r(t)}w\longrightarrow a,\qquad
r'(t)\longrightarrow a,\qquad
\frac{h(t)}{r(t)}\longrightarrow a\omega,
$$

$$
\frac{s(t)-s_0}{t-s_0}\longrightarrow\lambda,
\qquad D(t)\longrightarrow\frac1\lambda.
\tag{1}
$$

Here $(a,\omega,\lambda)$ is the exact admitted balance triple. The hypothesis does not assert that any perturbed member actually has such a limit. The theorem identifies the only possible convergent-speed asymptotic regime. The earlier finite nonlinear departure can therefore be followed by this regime only through an asymptotic return toward the spiral orbit, not finite-time capture by it.

The law, complete family and root treatment remain fixed by the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). This subject builds on the [speed-limit rigidity argument](authorized-cases-ten-hour-c-spiral-speed-limit-rigidity.md): its recurrent macroscopic radius, exclusion of late macroscopic inward passages under speed convergence, and regular constant-speed scaling limits are the premises reconstructed below. No new numerical member, response or supplied history is selected.

## Uniform information from each recurrent macroscopic scale

Let

$$
c_*=(1+4\pi)^{-1},\qquad m=c_*/2,
\qquad U=39^3,\qquad L=2U.
$$

The speed-limit argument shows that every sequence $W_j\to\infty$ with $r(s_0+W_j)/W_j\ge m$ has a subsequence whose rescaled position

$$
q_j(u)=W_j^{-1}x(s_0+W_ju)
$$

converges locally uniformly for $u>0$. Its limit satisfies $|q(u)|\ge m$ for $u\ge1$, because the assumed speed limit excludes a fixed negative radial velocity at any radius proportional to time. Sources advance by at least the ratio $1/39$. The limit is $C^1$ for $u>39$ and satisfies the unchanged ordinary equation for $u>39^2$, with constant speed $\nu_*$. These thresholds come from the demonstrated source coverage in that proof.

For $u>U$, the entire causal interval lies above $39^2$. Thus the normal-angle argument for constant speed applies throughout that connected receiving tail. Its heading lag and transmitter factor are constant; direct integration gives a spiral plus a constant vector there. The chord equation, applied at still later sources and then taken to infinity, removes that constant vector. Consequently this same limit has

$$
q(u)=a(u-c)\exp\{i[\omega\log(u-c)+\phi]\},
\qquad u>U,
\tag{2}
$$

where $c\le U$, because its affine positive range is defined for every $u>U$. Its shape coefficients are fixed by the already accepted balance classification. In particular

$$
|q(L)|\ge\frac a2L,
\qquad \min_{1\le u\le L}|q(u)|\ge m.
\tag{3}
$$

These estimates are uniform over the limiting phase and time-origin parameter. They are the information needed for the next step; neither parameter is assumed to converge along the original trajectory.

## A uniform linear radius floor follows

The compactness statement and (3) imply that there is a finite $W_*$ such that every actual $W\ge W_*$ with $r(s_0+W)/W\ge m$ satisfies

$$
\frac{r(s_0+LW)}{LW}>\frac a3>m,
\qquad
\min_{1\le u\le L}\frac{r(s_0+Wu)}W>\frac m2.
\tag{4}
$$

To justify uniformity, a sequence of later and later violations would have precisely the rescaled convergent subsequence described above. Either violation would pass to a contradiction with (3). The inequality $a/3>m$ follows from the accepted rational lower bound $a>277/1000$ and $\pi>3$, which gives $m<1/26$.

Choose one recurrent scale $W_0\ge W_*$ with the required ratio; such scales exist by the radius-recurrence theorem. Set $W_k=L^kW_0$. The first part of (4) makes each later scale eligible for another application. The second part controls the full interval between consecutive scales. Thus, for all $w\ge W_0$,

$$
r(s_0+w)\ge d w,\qquad d:=\frac{m}{2L}>0.
\tag{5}
$$

This coefficient is deliberately conservative. The important conclusion is a positive linear floor on the entire sufficiently late trajectory, obtained under speed convergence. The earlier unconditional power lower bound alone did not establish it.

The macroscopic inward-passage lemma now applies at every sufficiently late time, giving

$$
\liminf_{t\to\infty}r'(t)\ge0.
\tag{6}
$$

At late sources the tangential velocity remains positive, and both source-axis projections of the partner chord are positive. Equation (6) therefore gives $D\ge1-o(1)$ uniformly along the late trajectory. The advancing source ratio ensures that late receptions use those same late sources. This supplies a uniform ordinary-root margin in every fixed positive rescaled window.

## Every scaling limit is a zero-origin spiral

Now take an arbitrary sequence $W_j\to\infty$, not just the recurrent large-radius subsequence. On every compact $u$ interval in $(0,\infty)$, (5) gives $|q_j(u)|\ge d u$, while the unit speed bound and the accepted upper radius bound give uniform position and velocity bounds. The source ratio puts all sources in another fixed positive interval. The late transmitter bound then supplies bounded rescaled acceleration. The exact response passes to the limit as in the speed-limit proof, giving a $C^2$ limiting curve on all of $(0,\infty)$ with speed $\nu_*$ and the unchanged ordinary equation.

Its positive angular momentum follows from constant speed, nonzero acceleration and the inherited nonnegative orientation. Its normal rotates positively, and every sufficiently late causal interval has positive acute lag. The constant-speed calculation therefore gives a classified spiral tail with some time origin $c$ and phase $\phi$. Its special backward range equation,

$$
R'=1-|q''|R,
$$

extends that exact shape through the regular positive-time domain. A positive $c$ would force zero radius inside that domain, contradicting (5). Hence $c\le0$, and the same backward reconstruction reaches every $u>0$. Finally $|q(u)|\le19u/20$ as $u\downarrow0$ excludes $c<0$, because (2) would tend to the positive radius $-ac$. Thus $c=0$ and every subsequential limit has the form

$$
q(u)=a u\exp\{i[\omega\log u+\phi]\},\qquad u>0.
\tag{7}
$$

No singular formal extension is used in the physical past. The limit is a mathematical object defined only for positive scaled time. Its zero origin is a consequence of the uniform bounds on the actual rescaled curves.

## Alignment gives convergence of the whole finite history window

Use the continuous positive angle $\theta(t)$ to align the current position with the positive real axis, and define

$$
Q_t(u)=\frac{e^{-i\theta(t)}x(s_0+(t-s_0)u)}{t-s_0}.
\tag{8}
$$

For every compact interval $I\subset(0,\infty)$,

$$
Q_t(u)\longrightarrow a u e^{i\omega\log u}
\quad\hbox{in }C^2(I).
\tag{9}
$$

Indeed every sequence has a convergent subsequence of the form (7). Alignment at $u=1$ removes its only remaining parameter $\phi$, so every aligned subsequential limit is the same function. Failure of convergence in any one compact-window norm would produce a subsequence bounded away from that unique limit, contradicting compactness. The $C^2$ conclusion follows from the exact response after position, velocity and ordinary source clocks converge; no higher source derivative is needed.

Evaluating these limits at $u=1$ proves the first three statements of (1). The source-clock equation has a unique ordinary root near the limiting one, and its limit is $u_s=\lambda$; the transmitter factor then tends to $1/\lambda$. This proves the remaining statements of (1). Equivalently, each fixed logarithmic-history interval converges to the rotating and expanding spiral history after alignment by the current phase.

This does not prove that $\theta(t)-\omega\log(t-s_0)$ converges to a fixed number. The theorem controls phase differences across every fixed scale interval. Without an integrable rate, a slowly accumulating phase offset remains possible. It also does not assert that speed convergence occurs for any nonzero perturbation, or exclude a departure followed by asymptotic approach to the spiral's stable set.

## Evidence boundaries and falsifiers

The result is conditional on the actual family's speed magnitude having a limit and on acceptance of the preceding rigidity proof. The exact admitted spiral passes the stated normalization as a known case. Every new estimate is analytical; no numerical target, explicit amplitude, production solver or alternative history is introduced.

Falsifiers are a missing uniform tail threshold in the constant-speed reconstruction; a limiting time origin exceeding $U$ despite its positive affine range on $(U,\infty)$; failure of the compactness contradiction establishing (4); loss of the macroscopic condition between iterated scales; a source escaping the proved positive rescaled window; or a nonzero limiting time origin consistent with both the global linear floor and the vanishing upper radius bound at scaled zero. A nonconvergent physical speed or an unbounded accumulated phase offset lies outside the claimed implication.

Only this new subject is written. Prior frozen sources, references, original preparations and shared owners remain unchanged, and no owned computation is active. The subject is frozen for independent assessment before any new full-shape reference is disclosed.
