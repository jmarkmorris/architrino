# Geometric Analysis of a 1:2:4 Resonant Lock at the Field-Speed Horizon

This hypothesis, a rigid frequency hierarchy $f_O : f_M : f_I = 1 : 2 : 4$ imposed across the full tri-binary operating range (from a low outer-floor like $f_O = 1$ Hz up to $f_O = f_P$), suggests a specific solution class to the delay-differential master equation. In dynamical systems, such integer ratios often signify **mode-locking** within Arnold tongues, where nonlinear oscillators, here coupled by causal wakes, stabilize against perturbations.

If we accept the 1:2:4 ansatz and the condition that the middle binary rides the field speed $c_f$ across the operating range, with the outer reaching $c_f$ only at $f_O=f_P$, the geometric consequences for radii and the stress-tensor of the assembly are restrictive.

Status note: this document is exploratory. It records the live mathematical backbone of the dyadic-lock proposal and states the reduced theorem target clearly. It does not claim a full first-principles derivation from the master equation.

## Proof-Structured Core

This section isolates the mathematically closed part of the proposal so it can be treated as theorem-level **conditional on explicit assumptions**.

### Definitions

Let branch labels be $k\in\{O,M,I\}$ (Outer, Middle, Inner). Define
$$
v_k = 2\pi f_k r_k = \beta_k c_f,\qquad f_k>0,\qquad c_f>0.
$$

### Assumptions

1. **Null-separatrix lock:** $v_M=c_f$.
2. **Frequency bridge multiplier:** $f_M=2f_O$ and $f_I=2f_M=4f_O$.
3. **$\mathbb{Z}_3$ phase test state (radiative-stealth check):** equal dipole magnitudes with phases $(0,2\pi/3,4\pi/3)$.

### Proposition 1 (Kinematic Radius Identities for the 1:2:4 Lock)

Under Assumptions 1-2,
$$
r_O=\frac{\beta_O c_f}{2\pi f_O},\qquad
r_M=\frac{c_f}{4\pi f_O},\qquad
r_I=\frac{\beta_I c_f}{8\pi f_O}.
$$
Hence
$$
\frac{r_M}{r_O}=\frac{1}{2\beta_O},\qquad
\frac{r_I}{r_O}=\frac{\beta_I}{4\beta_O}.
$$
At the outer horizon point $\beta_O=1$, this reduces to
$$
r_M=\frac{r_O}{2},\qquad r_I=\frac{\beta_I}{4}r_O.
$$

**Proof.** Use $r_k=v_k/(2\pi f_k)$ with $v_k=\beta_k c_f$, then apply Assumption 1 ($\beta_M=1$) and Assumption 2 ($f_M=2f_O,\ f_I=4f_O$). Ratios follow by division. $\square$

### Proposition 2 ($\mathbb{Z}_3$ Dipole Cancellation)

Under Assumption 3, the net complex dipole amplitude is zero:
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0.
$$

**Proof.** The three unit phasors are vertices of an equilateral triangle centered at the origin, so their vector sum is zero. Equivalently, they are the three roots of $z^3-1=0$ and the nontrivial roots sum to $-1$. $\square$

### Rigor Boundary (What Is Proven Here vs Not Yet)

Theorem-level within this section means "proved from Assumptions 1-3." It does **not** yet prove the assumptions themselves from the full master equation.

| Claim package | Status in this document |
| --- | --- |
| Radius identities under $v_M=c_f$ and $1:2:4$ lock | Proven from Assumptions 1-2 |
| $\mathbb{Z}_3$ dipole cancellation identity | Proven from Assumption 3 |
| Degree class assignment $(1,1,2)$ from delay-map topology | Open (assumed here; likely regime-dependent once higher folded branches appear) |
| Unique derivation of bridge multiplier $2$ from boundary regularity | Open (assumed here) |
| Spatial double-covering $\Rightarrow$ temporal frequency doubling | Not established; only a heuristic bridge at present |
| Branchwise action partition $1:1:2$ | Demoted: heuristic ledger, not a current theorem target |
| Curvature law $\Gamma_{\text{top}}(K_G)$ from master equation | Open (model closure) |

## What the Delay Math Actually Gives You About Frequency Multiples

The delay/phase structure does **not** by itself force the specific lock $1{:}2{:}4$. What it does force is a **rational resonance lattice**. The dyadic hierarchy then appears after adding one self-similar horizon closure assumption.

### Proposition 3 (Exact Lock Implies Rational Frequency Ratios)

Consider two coupled periodic branches $a$ and $b$ with phases
$$
\theta_a(t)=2\pi f_a t+\phi_a,\qquad
\theta_b(t)=2\pi f_b t+\phi_b.
$$
If the coupled state is exactly periodic modulo phase wrap, then there exist positive integers $p,q$ and a common return time $T_*>0$ such that
$$
\theta_a(t+T_*)=\theta_a(t)+2\pi q,\qquad
\theta_b(t+T_*)=\theta_b(t)+2\pi p.
$$
Therefore
$$
f_a T_* = q,\qquad f_b T_* = p,
$$
and hence
$$
\frac{f_b}{f_a}=\frac{p}{q}\in\mathbb{Q}.
$$

**Proof.** Exact lock means the reduced state on the phase torus returns to itself after finite time $T_*$ up to integer windings in each angular variable. Dividing the two winding equations by $T_*$ gives the ratio formula. $\square$

### Corollary 3.1 (Tri-Binary Resonance Lattice)

For a nested three-branch lock $(O,M,I)$, exact periodic closure implies
$$
\frac{f_M}{f_O}=\frac{p_1}{q_1},\qquad
\frac{f_I}{f_M}=\frac{p_2}{q_2},
\qquad p_j,q_j\in\mathbb{N}.
$$
So the tri-binary hierarchy must lie on a rational lattice
$$
f_O : f_M : f_I
=
1 : \frac{p_1}{q_1} : \frac{p_1 p_2}{q_1 q_2}.
$$

This is the strongest conclusion available from exact periodicity alone. It yields **commensurability**, not yet the specific multiplier $2$.

### Proposition 4 (Self-Similar Horizon Closure Gives a Dyadic Family)

Add the following assumptions for the near-horizon aligned regime:

4. **Common-speed closure:** adjacent active branches share the same leading tangential speed scale,
$$
v_O \approx v_M \approx v_I \approx c_f.
$$
5. **Self-similar nesting:** adjacent radii differ by a fixed factor $s>1$,
$$
r_M=\frac{r_O}{s},\qquad r_I=\frac{r_M}{s}=\frac{r_O}{s^2}.
$$

Then
$$
\frac{f_M}{f_O}\approx s,\qquad
\frac{f_I}{f_M}\approx s,
$$
so the hierarchy becomes
$$
f_O:f_M:f_I \approx 1:s:s^2.
$$

**Proof.** Using $v_k = 2\pi f_k r_k$ and Assumption 4,
$$
\frac{f_M}{f_O}
=
\frac{v_M r_O}{v_O r_M}
\approx
\frac{c_f r_O}{c_f (r_O/s)}
= s.
$$
Similarly,
$$
\frac{f_I}{f_M}
=
\frac{v_I r_M}{v_M r_I}
\approx
\frac{c_f r_M}{c_f (r_M/s)}
= s.
$$
Therefore the frequency hierarchy is $1:s:s^2$. $\square$

### Corollary 4.1 (Minimal Integer Self-Similar Lock)

If one additionally asks for the **smallest nontrivial integer** self-similar nesting factor, then
$$
s_{\min}=2,
$$
which yields
$$
f_O:f_M:f_I = 1:2:4.
$$

This is the cleanest current route to the 1:2:4 hierarchy:

- exact delay lock gives rational commensurability,
- self-similar horizon closure gives the family $1:s:s^2$,
- minimal integer nesting gives $1:2:4$.

### What This Does and Does Not Derive

This is progress, but it is not a full first-principles derivation from the master equation.

What is now mathematically cleaner:

- the frequency hierarchy cannot be arbitrary if the state is exactly periodic,
- the aligned self-similar closure naturally selects the family $1:s:s^2$,
- and the familiar 1:2:4 lock is the minimal integer member of that family.

What remains open:

- why the actual dynamical system should prefer the **minimal** integer factor rather than $s=3,4,\dots$,
- whether the common-speed/self-similar assumptions are true only at the horizon or across the full operating range,
- whether a direct Lyapunov/monotonicity or delay-map bifurcation argument can force $s=2$ without putting it in by hand.

## Reduced-Theorem Target

The strongest next move is no longer another ledger identity. It is a **regularized reduced phase-amplitude map** that can test whether the dyadic lock is dynamically selected.

Pure phase reduction is likely too weak here because the near-separatrix forcing is not perturbative. As the active branch approaches $v=c_f$, the Jacobian factor
$$
\frac{1}{|J|} = \frac{1}{\left|1-\hat{\mathbf{r}}\cdot \mathbf{v}/c_f\right|}
$$
can become very large, so radial or speed perturbations cannot be ignored.

Define the relative phases
$$
\phi_1 = \theta_M - 2\theta_O,\qquad
\phi_2 = \theta_I - 2\theta_M,
$$
and pair them with a reduced amplitude/speed variable for each active layer, for example
$$
\rho_1 \sim r_M-r_M^\star,\qquad
\rho_2 \sim r_I-r_I^\star,
$$
or equivalently a reduced speed variable $\beta_k-\beta_k^\star$.

The natural reduced object is then a regularized branch-coupled return map
$$
P_\eta:(\phi_1,\phi_2,\rho_1,\rho_2)_n
\mapsto
(\phi_1,\phi_2,\rho_1,\rho_2)_{n+1},
$$
sampled once per outer-cycle crossing, with the causal forcing mollified at finite width $\eta>0$.

The theorem setting should therefore be:

- define the map at fixed finite $\eta>0$,
- prove or numerically demonstrate existence of a stable $1{:}2$ fixed point for the relevant two-layer reduction,
- study the Jacobian/eigenvalues of the map near that fixed point as $\beta \to 1$,
- then ask whether the chained tri-binary lock produces a stable $(1{:}2{:}4)$ state,
- and only after that consider the asymptotic behavior as $\eta\to0^+$.

The concrete analytical target is not yet a full tri-binary theorem. It is a local stability theorem for the reduced regularized map near the suspected dyadic fixed point.

## Invariant Backbone

The invariant structure should be stated narrowly.

What remains exact at the isolated-assembly level is the global history-aware conservation of total energy and total angular momentum. Those are the real Noether-level anchors of the problem. They constrain the admissible state space, but they do not by themselves select the dyadic lock.

What may still remain useful below that level is an **adiabatic** rather than exact invariant. The $\mathbb{Z}_3$ phase organization is still worth keeping as a candidate radiation-suppression geometry: if it reduces dipole leakage into the surrounding medium, it can increase persistence of an already-formed lock without itself proving the lock.

What should no longer be treated as foundational is the old branchwise action ledger
$$
\Delta L_O:\Delta L_M:\Delta L_I = 1:1:2.
$$
That ratio may still emerge on a specific attractor, but at present it is not supported by a continuous symmetry and should not be used as a theorem or axiom.

The right reduced-object question is therefore not "which conserved branch action forces $1{:}2{:}4$?" but rather "which monotone or Lyapunov-type quantity contracts the regularized map toward the dyadic lock under fixed total angular momentum?" A plausible target is a cycle-averaged causal-work or phase-slip penalty that grows sharply as non-commensurate drift samples the Jacobian wall.
