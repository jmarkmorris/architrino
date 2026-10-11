# Direct mixed variation of the characteristic-tail cross action

## Scope and reference identity

This reference derives the mixed action coefficient directly from the double integral in the [frozen characteristic-tail candidate](characteristic-tail.md#161-frozen-phase-a-candidate). It provides an analytic reference for task 5 of the [serial review plan](reciprocal-review-plan-2026-10-09.md#operator-selected-serial-follow-up-through-residuals). No numerical action evaluator or historical finite-difference output was used in the derivation. The result is derived at the regular cross-worldline scope; it does not make the candidate's self-history integral finite or recover the missing instrument behind the historical table.

The test changes one present transmitter segment and one strictly future receiver segment. Its mixed derivative detects whether the action's present variation depends on that future path. A finite smooth present probe makes this an ordinary double-integral calculation, avoiding a distributional point probe. The normalization of the future causal regulator then fixes the answer exactly, including at finite regulator width.

## Frozen kernel and regular cross contribution

Set the wake speed to $c_f=1$. For receiver time $t$, transmitter time $s$, their time difference $u=t-s$, and Euclidean separation $r$, the fixed kernel is

$$
K_h^{(\eta)}(r,u-r)
=\int_{-h}^{u-r}\frac{\delta_\eta(z)}{(u-z)^2}\,dz,
\qquad
\delta_\eta(z)=\frac{e^{-1/(1-(z/\eta)^2)}}{\eta Z}
\mathbf 1_{\{|z|<\eta\}},
\qquad
Z=\int_{-1}^{1}e^{-1/(1-y^2)}\,dy.
$$

Here $h$ is the retained memory horizon, $\eta$ the causal-mismatch regulator width, $z$ the mismatch integration variable, and $y$ its dimensionless normalized coordinate. The regulator is smooth, nonnegative and integrates to one by the substitution $z=\eta y$. Its support lies within $(-\eta,\eta)$; choose $0<3\eta<h$. Define $\chi_h(t,s)=\mathbf 1_{\{0<t-s<h\}}$, preserving the candidate's strict past ordering.

For two distinct worldlines $a,b$, retain both ordered cross contributions and the original pair factor:

$$
S_\times(\xi,\varepsilon)
=-\frac{\Lambda}{2}\int_I\!dt\int_I\!ds\,
\chi_h(t,s)
\left[K_h^{(\eta)}(r_{ba},u-r_{ba})
+K_h^{(\eta)}(r_{ab},u-r_{ab})\right].
$$

The symmetric signed coupling $\Lambda$ is the candidate's proxy bookkeeping coefficient, held fixed. The indices $ba$ mean receiver $b$ at $t$ and transmitter $a$ at $s$; $ab$ means the reverse. Both $r_{ba}$ and $r_{ab}$ depend on the varied worldlines below. This is the cross contribution extracted from the frozen expression, rather than a proposed replacement for the full candidate. The separate quadratic motion terms have zero mixed derivative between parameters belonging to different worldlines; self terms are outside the calculation.

## Probe histories and endpoint clearance

Let $\mathbf e_x,\mathbf e_y$ be perpendicular unit vectors, $R>0$ the base separation, and $\tau_0$ the center of the present probe. Choose smooth compactly supported profiles $\phi,\psi$ with $\phi\ge0$ and $\int_I\phi(s)\,ds=1$. Their supports are separated in time: every time in $\operatorname{supp}\psi$ is later than every time in $\operatorname{supp}\phi$. Set

$$
\mathbf X_a^{(\xi)}(s)=\xi\phi(s)\mathbf e_y,
\qquad
\mathbf X_b^{(\varepsilon)}(t)=R\mathbf e_x+\varepsilon\psi(t)\mathbf e_y.
$$

The parameters $\xi$ and $\varepsilon$ vary the present transmitter and future receiver respectively. Require $\psi(t)=1$ for every $t\in[s+R-\eta,s+R+\eta]$ with $s\in\operatorname{supp}\phi$. Also require both variation supports to lie strictly inside $[T_-+h,T_+-h]$ for $I=[T_-,T_+]$, with $R-\eta>0$ and $R+\eta<h$. These conditions put the entire causal regulator inside the integration domain, away from its time and memory endpoints. Smooth profiles and sufficiently small parameters keep the velocities below the wake speed in this local test.

A concrete normalized choice is $R=1$, $\Lambda=1$, $h=3$, $I=[-4,5]$, $\tau_0=0$, $\operatorname{supp}\phi\subset(-0.05,0.05)$, $\operatorname{supp}\psi\subset(0.5,1.5)$, and $\psi=1$ on $[0.7,1.3]$. Each of $\eta=0.05,0.1,0.2$ satisfies these conditions, including the source's stricter $2\eta<R$. The causal support lies within $[0.75,1.25]$ at the widest width. Both variation supports lie inside the memory-clear interval $[-1,2]$.

## Derivation from the action integral

For the $ba$ contribution,

$$
r_{ba}(t,s)=\sqrt{R^2+(\varepsilon\psi(t)-\xi\phi(s))^2}.
$$

At $(\xi,\varepsilon)=(0,0)$ its first derivatives vanish and its mixed derivative is

$$
\partial_\xi r_{ba}=\partial_\varepsilon r_{ba}=0,
\qquad
\partial_\xi\partial_\varepsilon r_{ba}
=-\frac{\phi(s)\psi(t)}{R}.
$$

During a spatial variation $u$ is fixed. The integrand defining $K_h^{(\eta)}$ therefore stays fixed; only its upper endpoint moves. Direct differentiation gives

$$
\left.\frac{\partial}{\partial r}K_h^{(\eta)}(r,u-r)\right|_u
=-\frac{\delta_\eta(u-r)}{r^2}.
$$

Combining these identities, the product of first separation derivatives vanishes, and

$$
\left.\partial_\xi\partial_\varepsilon
K_h^{(\eta)}(r_{ba},u-r_{ba})\right|_{0,0}
=\frac{\phi(s)\psi(t)}{R^3}\delta_\eta(t-s-R).
$$

No coincidence is approached: $r_{ba}\ge R$ for all probe parameters. Whenever the kernel integrand contributes, $u-z\ge r_{ba}\ge R$. The regulated kernel and the needed spatial derivatives are bounded on the compact integration region for each fixed positive $\eta$. This permits differentiation under the integral. The fixed indicator $\chi_h$ creates no spatial endpoint term.

For the reverse $ab$ contribution the mixed derivative contains $\phi(t)\psi(s)$. Its support requires a present receiver time $t$ and a strictly future transmitter time $s$, so $t-s<0$ and $\chi_h(t,s)=0$. The second ordered pair therefore contributes zero to this mixed derivative. There is no second factor to cancel the frozen $1/2$.

It follows that

$$
\left.\partial_\xi\partial_\varepsilon S_\times\right|_{0,0}
=-\frac{\Lambda}{2R^3}
\int_I\phi(s)
\left[\int_I\psi(t)\delta_\eta(t-s-R)\,dt\right]ds
=-\frac{\Lambda}{2R^3}.
$$

In the middle expression the inner integral depends on $s$ and is one for each $s$ in the present probe's support: $\psi$ equals one on that entire causal support, and the normalized regulator is fully included. The remaining $s$ integral is one by the chosen normalization of $\phi$. Thus the normalized numerical test has exact mixed coefficient $-1/2$, without taking $\eta\to0$ or shrinking the present probe. This derivation starts with the action integral and does not use the [source's Euler-coefficient calculation](characteristic-tail.md#164-future-only-transverse-cross-pair-control) as an oracle.

## Controls and finite-difference comparison

The same integral provides analytically known controls before numerical targets. Zero coupling gives zero; a future profile disjoint from every causal regulator support gives zero; changing the present profile integral from one to $m$ multiplies the answer by $m$; reversing the signed coupling reverses the answer. These controls concern the mixed derivative, not the background action, which can remain nonzero. The regulator's unit integral and compact support are separately known by its definition. A numerical evaluator also needs the requested separable double-integral control to check its quadrature and variation mechanism independently of this kernel.

For nonzero probe amplitudes $p,q$, a symmetric direct-action comparison is

$$
D_{p,q}=
\frac{S_\times(p,q)-S_\times(p,-q)-S_\times(-p,q)+S_\times(-p,-q)}{4pq}.
$$

For exact integration at fixed profiles and fixed positive $\eta$, Taylor expansion gives $D_{p,q}=-\Lambda/(2R^3)+O(p^2+q^2)$ as the amplitudes approach zero. The constant requires bounds on higher derivatives and is not quantified here. Refining time quadrature, $\eta$, $p$ and $q$ separately is needed to distinguish quadrature, regulator-resolution and finite-probe errors; agreement at one setting does not establish any of those bounds. A subtraction of nearly equal background actions also requires a numerical cancellation check.

The result is falsified by an error in the displayed upper-endpoint derivative, ordered-pair support argument, or normalization step under these exact hypotheses. A converged separately authored direct-action evaluator that disagrees after independently passing controls would prompt review of these steps and the evaluator's domain and factors. It would not license changing the frozen action or refitting the pair factor. Reproducing this coefficient with new profiles or settings is distinct from replaying the historical table's original digits and settings.

## Development record

Codex authored this analytic reference before delivery of task 5 and before reading any task-5 peer numerical implementation. At creation, the shared transcript still ends at Codex's prepared but undelivered `2026-10-11T02:29:54.142Z` assignment by a tail read; a native Claude app check returned a transport timeout without entering or sending text. Task 5 remains pending delivery and execution; tasks 6 and 7 remain unreleased. This reference is preparation for independent adjudication, not task-5 completion.

The frozen source binding is SHA-256 `bdd09dd6d3305b5ae78abebbd5f59e853a1c411f108b5becc1671a4a29cd9c3d`, checked with native `shasum -a 256` for retention. The source, its original table, earlier subjects/references and prior receipts are unchanged. The fresh Codex reference owner retains this document, the source snapshot and known-first presentation-check output. Presentation validation checks links, fragments, TeX and whitespace; mathematical acceptance rests on the derivation above and the later independent action comparison.
