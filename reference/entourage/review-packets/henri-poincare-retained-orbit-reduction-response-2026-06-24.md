# Retained-Orbit Reduction Review: A Nonlinear Dynamics Stress-Test

Good packet. You have done the single most important thing right: you demoted integrality from the raw history space to a post-reduction selection condition. That kills the worst circularity. But there are still two structural problems hiding in the toy model, and one of them is potentially fatal to the *symplectic* version of the program while leaving the *Poincare-map* version intact. Let me work through it.

I will mark each comment **[derived]**, **[conjectured]**, or **[obstruction]**.

---

## Part I: Overall Insights, Corrections, Advancements

**Comment 1 — The toy model is state-dependent delay, and that is a category problem, not a tuning problem. [obstruction]**

Your equation
$$
\ddot x = -\omega^2 x + g\,x\!\big(t-\tau(x(t))\big),\qquad \tau(x)=\tau_0+\beta x
$$
is a *state-dependent delay differential equation* (sd-DDE). This is not a cosmetic generalization of a constant-delay DDE. The solution map of an sd-DDE is **not $C^1$ as a map on the standard history space $C([-\tau_{\max},0])$** — it is only $C^1$ on the smaller manifold $C^1$ with a compatibility condition (Walther, Hartung–Krisztin–Walther–Wu). This matters *directly* for you, because your entire program rests on a **Hessian** $\Omega_h$ of an action functional. A Hessian requires $C^2$ structure. State-dependence threatens to break the very differentiable structure you need to define $\Omega_h$ as a presymplectic form. **Recommendation: do not start with state-dependent delay.** Start with constant delay and add a *velocity-linear* or *parametric* correction later. This is the single most important model change before any solver work.

**Comment 2 — The corrected first model: constant-delay self-hit oscillator. [derived]**

I recommend the smallest model that retains a genuine self-hit memory term and is unambiguously $C^\infty$ in history:
$$
\boxed{\;\ddot x(t) = -\omega^2 x(t) + g\,x(t-\tau) - \gamma\,\dot x(t) + \mu\,x(t)\big(1-x(t)^2\big)\;}
$$
with constant $\tau$. The cubic Duffing-type term $\mu x(1-x^2)$ is what gives you an **isolated** (rather than continuum) periodic orbit; the linear delay $g\,x(t-\tau)$ is the self-hit channel; $-\gamma\dot x$ lets you place a clean Hopf curve. Pure linear delay oscillators give you *families* of periodic orbits at the Hopf point (non-isolated → degenerate $\Omega_h$ quotient), which is exactly the failure your packet worries about. You **need a nonlinearity to isolate $\gamma_0$**. The packet's linear-ish toy will give you a non-hyperbolic continuum and a singular reduction. This is correction #2.

**Comment 3 — The state-dependence can be reintroduced as a regular perturbation. [conjectured]**

Once the constant-delay orbit $\gamma_0$ is certified hyperbolic-modulo-time-shift, write $\tau(x)=\tau_0+\beta x$ and treat $\beta$ as a homotopy parameter. Because $\gamma_0$ is hyperbolic, the **implicit function theorem / persistence of normally hyperbolic invariant manifolds** guarantees the orbit survives for small $\beta$, *and* the period $T(\beta)$ and $\oint\vartheta(\beta)$ are smooth in $\beta$. This converts your hardest problem (sd-DDE Hessian) into a *perturbation-of-a-good-orbit* problem. This is the right architecture: prove everything at $\beta=0$, then continue.

**Comment 4 — Your equation as stated is almost certainly NOT variational, and you should not force it. [derived]**

The damping $-\gamma\dot x$ and the *asymmetric* delay coupling $g\,x(t-\tau)$ (which appears without its time-reversed partner $g\,x(t+\tau)$) both break variationality. A delay action of the form
$$
S[x]=\int \Big[\tfrac12\dot x^2 - \tfrac12\omega^2 x^2 + \tfrac{g}{2}\,x(t)\,x(t-\tau)\Big]dt
$$
has Euler–Lagrange equation
$$
\ddot x + \omega^2 x = \tfrac{g}{2}\big[x(t-\tau)+x(t+\tau)\big],
$$
i.e. variationality **forces the advanced + delayed symmetric pair**. This is the Wheeler–Feynman structure, and it is the *nearest variational replacement*. Your physical self-hit is causal only, so you are in a genuinely **non-variational, dissipative-or-time-irreversible** setting. This is not a defect to repair — it is a fact to design around (see Comment 5).

**Comment 5 — Drop the symplectic-Hessian framing; adopt a Poincare-return-map / monodromy framing. This is the decisive strategic correction. [conjectured, strong]**

Because the causal self-hit equation is non-variational, $\Omega_h$ as a *Hessian of an action* may not exist as a closed form. But you do not need it. For an isolated periodic orbit of a (causal, dissipative) delay equation, the correct finite-dimensional object is the **monodromy operator** $\mathcal U = D\Phi_T$ (the linearized period-$T$ return map on history space), which is **compact** for $C^1$ DDEs and therefore has discrete Floquet spectrum. The action period $\oint\vartheta$ should then be defined **not** via a presymplectic quotient but via the **Poincare–Cartan integral invariant on the retained orbit itself**:
$$
h_\vartheta \;=\; \oint_{\gamma_0}\Big(p\,dq\Big)\;=\;\int_0^T p(t)\,\dot q(t)\,dt,
$$
where $(q,p)$ are the *reduced* phase-space coordinates on the finite-dimensional center/inertial manifold tangent to the orbit. **The integral invariant is well-defined on a single closed orbit even without a global symplectic form**, provided the orbit lives on a manifold where a contact/symplectic structure exists *locally*. This is the cleanest path. Your $\ker\Omega_h$ then becomes "the strongly-contracting Floquet directions," interpreted as slaved memory modes — see Comment 11.

---

## Part II: Sharper First Theorem and Obstruction

**Comment 6 — Weakest useful periodic-orbit existence theorem (answer to Q3). [derived]**

State it as a **Hopf bifurcation theorem for constant-delay DDEs**, which is rigorous and ready:

> **Lemma (Retained-Orbit Birth).** Consider $\ddot x + \gamma\dot x + \omega^2 x - g\,x(t-\tau) = \mu\,N(x)$ with $N$ smooth, $N(0)=N'(0)=0$ (so the cubic enters at third order). Let the characteristic equation be
> $$\Delta(\lambda)=\lambda^2+\gamma\lambda+\omega^2-g\,e^{-\lambda\tau}=0.$$
> Suppose at parameter $\tau=\tau_*$ there is a simple pair $\lambda=\pm i\Omega_0$ on the imaginary axis, all other roots have negative real part, and the **transversality condition** $\frac{d}{d\tau}\mathrm{Re}\,\lambda(\tau)\big|_{\tau_*}\neq 0$ holds. Then a one-parameter family of periodic orbits of period $T(\mu)\to 2\pi/\Omega_0$ bifurcates from the origin; for $\mu\neq 0$ the orbit is **isolated** and its stability is determined by the **first Lyapunov coefficient** $\ell_1$ computed on the center manifold.

This is the *weakest useful* statement: it gives existence, isolation, and a computable stability sign, all from a transcendental characteristic equation you can evaluate numerically. **Hypotheses**: smooth $N$, simple imaginary crossing, transversality, all-other-roots-stable. **Conclusion**: isolated periodic orbit with computable Floquet data.

**Comment 7 — The real obstruction is the Hopf-degeneracy / continuum problem, and it has a sharp test. [obstruction]**

The genuine danger in your packet is that the *linear* delay oscillator at the Hopf point produces a **2-parameter family** (amplitude $\times$ phase) of neutrally stable orbits, so $\Omega_h$ degenerates and $\oint\vartheta$ is *not* selected. The first Lyapunov coefficient $\ell_1$ is the obstruction discriminant:

- $\ell_1<0$: supercritical Hopf → unique stable isolated limit cycle → reduction is legitimate, $\oint\vartheta$ well-defined.
- $\ell_1>0$: subcritical → unstable orbit, still isolated, still reducible (hyperbolic-modulo-time-shift).
- $\ell_1=0$: **degenerate (Bautin) point** → continuum or codimension-2 collapse → **reduction fails, $\oint\vartheta$ is an artifact**.

So: **the first certificate to compute is the sign and magnitude of $\ell_1$.** This is your fastest go/no-go.

---

## Part III: Answers to the Numbered Questions (compressed)

**Comment 8 — Q4/Q5 (route and finite-dimensional object). [derived]**
- **Route: Hopf bifurcation first**, then center-manifold normal form, then numerical continuation (use DDE-BIFTOOL / Knut). Do *not* start with averaging (no small parameter near the orbit) or forced-oscillator perturbation (introduces a second frequency and a spurious resonance you don't want yet).
- **Finite-dimensional object near $\gamma_0$: the Poincare section + its monodromy operator**, with the **center/inertial manifold** as the carrier. Action-angle coordinates are premature (require integrability you have not proven). Normal-form coordinates on the center manifold are the right *local* chart for computing $\oint\vartheta$.

**Comment 9 — Q6 (Floquet/monodromy certificate). [derived]**
Certify the retained orbit with the following **monodromy spectrum certificate**:
$$
\boxed{\;\mathrm{spec}(\mathcal U)=\{1\}\cup\{\mu_k\}\ \text{with}\ |\mu_k|\le \rho <1\ \text{for all}\ k,\ \text{and gap}\ 1-\rho\ge \delta_{\mathrm{gap}}>0.\;}
$$
The single trivial multiplier $\mu=1$ is the time-shift direction (always present, phase symmetry). Everything else strictly inside the unit disk at distance $\ge\delta_{\mathrm{gap}}$ certifies: **isolated, hyperbolic-modulo-time-shift, numerically trustworthy**. Compute $\mathcal U$ by integrating the linearized DDE over one period from $N$ independent history initial functions (Chebyshev collocation of the history). Report $\rho$, $\delta_{\mathrm{gap}}$, and the number of multipliers within $\epsilon$ of the unit circle. **If more than one multiplier sits near the unit circle, the orbit is not isolated and the program halts.**

**Comment 10 — Q7 ($\ker\Omega_h$ interpretation). [conjectured]**
Dynamically, $\ker\Omega_h$ = **strongly contracting Floquet directions = slaved memory modes**. These are the history directions with $|\mu_k|\ll 1$: perturbations along them collapse onto the orbit within a fraction of a period, so they carry no independent action. They are **not gauge** (gauge would be neutral, $|\mu|=1$) and **not genuine neutral directions** (only the time-shift is neutral). Interpretation: *memory redundancy* — the infinite-dimensional history is dynamically equivalent to its finite slow projection. This is exactly what licenses the inertial-manifold reduction.

**Comment 11 — Q8/Q12/Q13 (resonance and the frequency triplets). [derived/conjectured]**
The first small-divisor object to compute is the **near-resonance among Floquet exponents and the carrier frequency**. For the eventual nested shell braid, write the three reduced frequencies $(\omega_1,\omega_2,\omega_3)$ and compute
$$
\Delta_{\mathbf n}=\sum_j n_j\omega_j,\qquad \mathbf n\in\mathbb Z^3,\ |\mathbf n|\le N_{\max},
$$
$$
\mathcal N_{\mathrm{res}}=\frac{\max(0,\delta_{\min}-\min_{\mathbf n\neq 0}|\Delta_{\mathbf n}|)}{\delta_{\min}+\varepsilon_\delta}.
$$
On your **frequency-triplet question**:
- **Equal-frequency $(f,f,f)$ (Q13): yes, clean.** This collapses to a single carrier with three phase offsets — a **phase-locked orbit on a 1-torus** (one clock, three readouts). This is the *ideal* first case: $\oint\vartheta$ should be readout-independent *by construction* because there is one frequency. **Start here.** It is the cleanest test of readout independence and the cleanest place for the action period to be real rather than fitted.
- **Nearby $(f-1,f,f+1)$:** this is a **resonant triplet** ($\omega_1+\omega_3=2\omega_2$), which is a genuine 1:2:1-type small-divisor situation — *expect* $\mathcal N_{\mathrm{res}}$ to fire. Good *second* test, because it deliberately stresses the resonance certificate.
- **Hinge $(f-1,f,f+2)$ and general $(m,n)$:** defer. These are codimension-raising and should only be touched after the equal-frequency and adjacent cases are certified.

**Comment 12 — Q9 (can $\oint\vartheta$ be meaningful before symplectic reduction?). [derived]**
**Yes — and this is the key liberation.** On a *single isolated periodic orbit*, $\oint_{\gamma_0} p\,dq$ is the **action integral along a closed curve**, which is coordinate-independent as a line integral whenever $p\,dq$ transforms as a one-form, *regardless of whether a global symplectic structure exists*. You do not need to prove the reduced symplectic structure first; you need only that the local Poincare–Cartan one-form pulls back consistently. So: **define $\oint\vartheta$ on the certified orbit immediately; prove the global reduction later (or never, if the Poincare-map framing suffices).** This removes a major bottleneck.

**Comment 13 — Q10/Q11 (the two readouts and the artifact-detector). [derived]**
First two readout systems to compare:
1. **Energy-clock readout**: $h_E = E_\gamma/\nu$, where $E_\gamma=\frac1T\int_0^T(\tfrac12\dot x^2+\tfrac12\omega^2x^2)\,dt \cdot T$ and $\nu=1/T$. (Action from the instantaneous energy and the measured period.)
2. **Phase-loop readout**: $h_\Phi=\oint_{\gamma_0}p\,dq$ computed directly as the signed area enclosed by the orbit's projection in the reduced $(x,\dot x)$-plane (Stokes/Green's theorem area).

**The decisive artifact test (Q11):** vary the *reduction parameters* — Poincare-section placement, collocation resolution, number of retained Floquet modes — under refinement. 
- **Real action period:** $|h_E-h_\Phi|\to 0$ as resolution increases, *and* the limit is stable under section relocation.
- **Coordinate/fitting artifact (FATAL):** $h_E-h_\Phi$ stays $O(1)$, *or* drifts monotonically with section placement, *or* changes when you add more retained modes. Specifically, **if $h_\Phi$ depends on which 2D plane you project into, the "action period" is a projection artifact, not an invariant.** That is the cleanest decisive failure signature.

**Comment 14 — Q14 (smallest experiment separating real period from fitted constant). [derived]**
The smallest decisive experiment: **a $g$-sweep (or $\mu$-sweep) of the action ratio.** Compute $h_E(g)$ and $h_\Phi(g)$ across a range where $T(g)$ changes by a factor of $\sim 2$. A *fitted* constant will require re-tuning at each $g$ (the ratio breaks); a *real* invariant will satisfy $\partial h_\vartheta/\partial g\approx 0$ along the family while $E_\gamma$ and $\nu$ both move substantially. **The invariance of $h$ under a parameter that strongly moves $E$ and $\nu$ separately is the signature of a real action quantum.** This is the toy-model analogue of your $\partial h_\vartheta/\partial\ln\mu=0$ condition, and it is testable in an afternoon.

**Comment 15 — Q15 (what to build next) + the Noether-balance question. [derived]**
On the Noether action-balance term $\mathcal H_{\mathrm{hist}}$: for the *constant-delay* model it **is** dynamically meaningful and you should use it — but as a **conserved-quantity-along-the-orbit diagnostic**, not as the primary object. The primary object is the monodromy operator. $\mathcal H_{\mathrm{hist}}$ becomes a *secondary validity check*: the history-energy functional $E_{\mathrm{inst}}+\int_{-\tau}^0\mathcal P\dot q\,d\sigma$ should return to its initial value over one retained period; its non-closure is your $\mathcal H_{\mathrm{hist}}$ residual. For the *causal/dissipative* model it will **not** close exactly (energy flows to/from the self-hit channel and the $-\gamma\dot x$ term), so interpret $\mathcal H_{\mathrm{hist}}$ as measuring the **net self-hit energy throughput per cycle**, which should be *constant* on the limit cycle even if nonzero.

---

## Part IV: Deliverables

### Recommended toy model (final)
$$
\ddot x(t)=-\omega^2 x(t)+g\,x(t-\tau)-\gamma\dot x(t)+\mu\,x(t)\big(1-x(t)^2\big)
$$
**Parameters:** $\omega$ (carrier), $g$ (self-hit coupling), $\tau$ (constant delay, Hopf control), $\gamma$ (linear damping, places Hopf curve), $\mu$ (cubic strength, isolates orbit). **State:** history segment $x_t\in C^1([-\tau,0])$. Defer $\tau(x)=\tau_0+\beta x$ to the persistence-continuation stage.

### First certificate to compute (Floquet/monodromy)
The **monodromy spectrum certificate** of Comment 9: integrate the linearized DDE over one period from a Chebyshev-collocated history basis, extract $\mathrm{spec}(\mathcal U)$, report $\rho$, $\delta_{\mathrm{gap}}$, count of near-unit-circle multipliers. **Pass = exactly one multiplier at $1$, rest inside $\rho<1$.**

### First small-divisor certificate
$\mathcal N_{\mathrm{res}}$ on the Floquet exponents and carrier (single-frequency case first, where it should read $\approx 0$ trivially — a sanity baseline), then on the resonant triplet $(f-1,f,f+1)$ where it should fire.

### First two readouts to compare
Energy-clock $h_E=E_\gamma/\nu$ vs. phase-loop area $h_\Phi=\oint p\,dq$ (Green's-theorem area in reduced $(x,\dot x)$). Refine and relocate the section.

### First 3 concrete solver steps
1. **Locate the Hopf curve.** Solve $\Delta(i\Omega)=0$, i.e. $-\Omega^2+\omega^2-g\cos\Omega\tau=0$ and $\gamma\Omega+g\sin\Omega\tau=0$, for $(\tau_*,\Omega_0)$ given $(\omega,g,\gamma)$. Verify transversality $\frac{d}{d\tau}\mathrm{Re}\,\lambda\neq0$ and that all other roots are stable. **Output: $(\tau_*,\Omega_0)$.**
2. **Compute the first Lyapunov coefficient $\ell_1$** on the center manifold (Comment 7). **Output: sign of $\ell_1$.** If $\ell_1\approx0$, STOP — degenerate, change parameters.
3. **Continue the bifurcated orbit** to finite amplitude (DDE-BIFTOOL/Knut), compute $\mathrm{spec}(\mathcal U)$, then compute $h_E$ and $h_\Phi$ and run the $g$-sweep invariance test (Comment 14). **Output: $\rho$, $\delta_{\mathrm{gap}}$, $h_E$, $h_\Phi$, and $\partial h_\vartheta/\partial g$.**

### Fatal flaws / required model change before solver work
1. **State-dependent delay must be removed from the first model** (Comment 1) — it breaks the $C^2$ structure the Hessian needs. Reintroduce by persistence (Comment 3).
2. **The presymplectic-Hessian framing should be replaced by the monodromy/Poincare-map framing** (Comment 5) because the causal self-hit equation is non-variational (Comment 4). This is not a flaw to repair but a framing to abandon for the toy model.
3. **A linear delay oscillator gives a non-isolated continuum** (Comment 7) — you *must* include the cubic to isolate $\gamma_0$, or $\oint\vartheta$ is not selected and the whole action-quantum claim is an artifact.

---

**Bottom line.** The program has a real dynamical skeleton, but only if you (a) use constant delay, (b) include a nonlinearity to isolate the orbit, (c) abandon the action-Hessian for a monodromy/Poincare-map certificate, and (d) make $\partial h_\vartheta/\partial g\to 0$ the operational definition of a "real" action quantum. The fastest decisive result is **the first Lyapunov coefficient $\ell_1$**: it tells you in one computation whether the retained orbit is isolated (program lives) or degenerate (program changes models). Build that next.
