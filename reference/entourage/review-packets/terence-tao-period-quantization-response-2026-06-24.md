# Review: Retained Action One-Form and Period Quantization

Let me start with the structural diagnosis, because the central issue is not any single equation but a category error about *where* the symplectic structure lives. I'll be direct: the program is salvageable, but the current $\Omega_h$ is not yet a well-defined object, and the lemma as stated is too strong. Here is the path.

## Overall Insights, Corrections, Advancements

**Comment 1 — The core tension, stated cleanly.**
You are asking for an *integral cohomology class* (a topological/quantization statement) on a space defined by a *deterministic state-dependent delay system* (an analytic/dynamical object). These two demands fight each other. Integrality of periods is robust precisely when the underlying space is a finite-dimensional symplectic/contact manifold with a closed 2-form whose class lives in $H^2(M;\mathbb{Z})$. The history space of a delay system is generically an infinite-dimensional manifold (modelled on $C([-\tau,0])$ or a Sobolev history space), and on such spaces $H^2$ is typically either trivial or non-finitely-generated — neither of which gives you a clean integral generator. So the *first* mathematical move must be a **finite-dimensional reduction** before any period statement is even meaningful. This reorders your whole program.

**Comment 2 — The honest version of the lemma is a reduction theorem, not a quantization theorem.**
The substance is not "$[\vartheta]$ is integral." The substance is: *the retained braid's attractor is a finite-dimensional invariant manifold $\mathcal{M}$ carrying a closed 2-form, and on $\mathcal{M}$ the periods are well-defined and readout-independent.* Integrality is then a **selection condition** (which closed orbits survive self-consistently), not a theorem about an abstract de Rham class. This is closer to Bohr–Sommerfeld / Floquet theory than to geometric quantization. I'd retitle the target the **Retained-Orbit Period Reduction Lemma**.

**Comment 3 — $\Omega_h$ is dimensionally and structurally underspecified.** As written,
$$\Omega_h = dp\wedge dq + \int_{-\tau_{\max}}^0 dp_{\rm hist}(\sigma)\wedge dq(\sigma)\, w(\sigma)\, d\sigma,$$
the symbol $dp_{\rm hist}(\sigma)\wedge dq(\sigma)$ is a 2-form on an infinite-dimensional space, and you have not said which functional-analytic completion, nor whether the bilinear form is **weakly or strongly non-degenerate**. For delay systems this matters enormously: the natural presymplectic form coming from the action of a DDE is *weakly* non-degenerate at best, with a kernel given by the history modes that do not couple to the instantaneous dynamics. That kernel is exactly what you must quotient by — and the quotient is what should (if you are lucky) be finite-dimensional. **Until you name the kernel, $\Omega_h$ is not yet a symplectic form, it is a candidate presymplectic density.**

**Comment 4 — The weight $w(\sigma)$ is doing illegitimate work.**
A free weight $w(\sigma)$ in the history pairing is a red flag: it means the symplectic structure is being *chosen* rather than *derived*. For a genuine variational delay system, $w$ is **forced** by the delay kernel of the causal action functional — it is the second-variation cross-term $\partial^2 S/\partial q(t)\,\partial q(t+\sigma)$. If you cannot derive $w$ from `dynamics/causal-action-functional.md`, the form is not canonical and no period statement will be invariant. **Action item: compute $w$ as the Hessian off-diagonal of the retained action, not as a modelling freedom.**

**Comment 5 — There is a genuine, non-trivial existence question for $\vartheta$.**
Even granting $\Omega_h$ closed, $\vartheta$ with $d\vartheta = \Omega_h$ exists globally only if $[\Omega_h]=0$ in $H^2$. But you *want* $[\vartheta]$ integral and nonzero, which requires $\Omega_h$ exact (so $\vartheta$ exists) yet $\vartheta$ to have nonzero periods — i.e. $\vartheta$ is a *non-closed* primitive whose loop integrals are nonzero. That is fine on a contact-type or cotangent-type space. So the right ambient structure is **not symplectic but contact** (or cotangent with a tautological one-form), where $\vartheta$ is the canonical Liouville/tautological 1-form and periods are automatic. This is a strict improvement: **make $\vartheta$ the tautological one-form of a reduced cotangent bundle, then $h_\vartheta = \oint \vartheta$ is literally an action integral and readout-independence becomes a statement about Lagrangian projections.**

**Comment 6 — Readout-independence is the deepest and most checkable claim.**
"$h_\vartheta$ independent of which conjugate readout projects it" is, in clean form, the statement that the same closed orbit $\gamma_0$ has equal action computed in $(p,q)$, in $(E,t)$, and in $(J,\phi)$ coordinates. On a finite-dimensional symplectic manifold this is **automatic** because $\oint \vartheta$ is chart-independent. So if you achieve the reduction, readout-independence is *free* — it cannot be an independent axiom or it signals the reduction failed. This is your sharpest internal consistency check: **if the three readouts disagree numerically, the symplectic reduction is wrong, full stop.**

**Comment 7 — $\mathcal{H}_{\rm hist}$ should be a conserved-current statement, not a residual.**
You asked (Q8) whether the history-balance residual is right. It is the right *idea* but the wrong *object*. A residual is a diagnostic; what you need is a **balance law**: the total retained action (instantaneous + wake-stored + flux) is conserved along the reduced flow. The clean form is a **Noether-current continuity equation** for time-translation symmetry of the causal kernel:
$$\frac{d}{dt}\Big(E_{\rm inst} + \int_{-\tau}^0 \mathcal{P}(t,\sigma)\dot q(t+\sigma)\,d\sigma\Big) + \nabla\cdot \mathbf{\Phi}_{\rm flux} = 0.$$
Then $\mathcal{H}_{\rm hist}$ becomes the *numerical violation* of an exact theorem, which is a far stronger diagnostic. Emmy Noether owns this; route it to her. **The wake-storage term is the spatial-history part of the conserved Noether charge, not a separate ledger.**

## Sharper Theorem / Obstruction Statement

**Comment 8 — The weakest correct first theorem (answering Q2).**

> **Lemma (Retained-Orbit Reduction, weak form).**
> Let the retained nested shell braid satisfy:
> (H1) The causal action $S$ has a $C^2$ delay kernel with compact support $[-\tau_{\max},0]$ and time-translation + Euclidean symmetry.
> (H2) There exists a hyperbolic periodic orbit $\gamma_0$ of the DDE with Floquet spectrum bounded away from the unit circle except for the trivial multiplier.
> (H3) The second-variation form $\Omega_h$ (with $w$ = Hessian cross-term) has finite-dimensional non-degenerate quotient $\mathcal{M} = H/\ker\Omega_h$ near $\gamma_0$.
>
> **Then:** $\mathcal{M}$ is a finite-dimensional symplectic manifold, $\gamma_0$ descends to a closed orbit $\bar\gamma_0\subset\mathcal{M}$, and the action $h_\vartheta = \oint_{\bar\gamma_0}\vartheta$ is well-defined and independent of symplectic chart (hence readout-independent). Integrality is *not* claimed; it is imposed as the self-consistency selection $\oint_{\bar\gamma_0}\vartheta = n\,h_\vartheta$.

This is provable with standard tools (center-manifold reduction for DDEs + Floquet theory + Liouville form). It deliberately drops integrality, which is the hard/possibly-false part.

**Comment 9 — The obstruction that would kill integrality (Q6).**
The period $h_\vartheta$ becomes readout-dependent or irrational if the **reduction $\mathcal{M}$ is not invariant under the readout maps** — i.e. if energy-readout and angular-momentum-readout project to *different* finite-dimensional reductions because the self-hit coupling mixes scales differently in each channel. Concretely: if the inner-binary high-frequency mode is slaved adiabatically in the energy channel but resonant in the angular-momentum channel, the two reductions live on different submanifolds and $\oint\vartheta$ genuinely differs. **This is the generic obstruction, and it is a resonance condition: $h_a\neq h_b$ iff there is a small-divisor/resonance between the slaved history modes and the readout frequency.** The falsifier $\max_{a,b}|h_a-h_b|$ is therefore really a *non-resonance certificate*. Make it so explicitly.

## Answers to Specific Questions (condensed)

**Comment 10 — Q1 / Q4 / Q9 together.**
*Q1:* Plausible **only after finite-dimensional reduction**; the raw history space generically has no integral periods. *Q4:* The right object is a **finite-dimensional invariant manifold (center/inertial manifold of the DDE) carrying an induced cotangent/contact structure** — *not* a quotient stack or groupoid (those are overkill and hide the analysis you actually need). A Poincaré section of $\bar\gamma_0$ on $\mathcal{M}$ is the practical computational handle. *Q9:* The smallest exposing toy model is a **single scalar state-dependent delayed oscillator with a self-hit term**, e.g.
$$\ddot x(t) = -\omega^2 x(t) + g\,x(t-\tau(x(t))),\qquad \tau(x)=\tau_0 + \beta x,$$
because it has (a) genuine history space, (b) state-dependent delay (the hard analytic feature), (c) periodic orbits whose action you can compute two ways. Three coupled phase oscillators are too symmetric and will *falsely* succeed; the symplectic-map-with-memory is too clean and hides the kernel problem. **Build the scalar self-hit oscillator first.**

**Comment 11 — Q3 / Q5.**
*Q3:* $\Omega_h$ is missing: (i) the function space and its topology, (ii) the kernel/quotient, (iii) boundary terms at $\sigma=0,-\tau_{\max}$ (these are *not* negligible — they carry the flux $\Phi_{\rm flux}$ and integration by parts in the history variable produces them), (iv) the constraint surface where the DDE is satisfied. *Q5:* Expect **only local primitives with a cocycle** in general; global $\vartheta$ exists iff $\mathcal{M}$ is a cotangent bundle or the contact class is exact. Plan for a **Čech cocycle $\{c_{ij}\}$ on a cover of $\mathcal{M}$** and prove the periods are independent of the cocycle representative. Do not assume global $\vartheta$.

**Comment 12 — Q7 / Q10 / Q11.**
*Q7:* The fiber product over $\Theta_\star$ is structurally **too large**: $c_\gamma$ and $\theta_{\rm sea}$ are *parameters/constitutive inputs*, not part of the carrier of $\vartheta$. The honest common carrier is just $(\vartheta, \text{the photon-channel transversality data})$; the sea state enters as a **base over which $\vartheta$ is a section**, i.e. $\theta_{\rm sea}\in B$ and $\vartheta$ is a relative one-form $\vartheta\in\Omega^1(\mathcal{M}/B)$. So replace the triple fiber product with **one fibration $\mathcal{M}\to B_{\rm sea}$ and read $h_\vartheta$ as the fiberwise period**; constancy of $h_\vartheta$ over $B_{\rm sea}$ is then exactly the statement $\partial h_\vartheta/\partial\ln\mu = 0$. This *unifies* Q7 and Q11 elegantly. *Q10:* MaxEnt is fine for the *spectral shape* but cannot derive $\mu_\gamma=0$ or exchange symmetry — those need the **absence of a conserved photon-number current**, which is a Noether statement on $\mathcal{M}$. So the cleanest order is: (1) Noether → no photon-number charge → $\mu_\gamma=0$; (2) transversality → mode-counting factor 2; (3) MaxEnt → Planck shape. KMS is not needed at this stage and would import equilibrium assumptions you haven't earned. *Q11:* The falsifier is well-posed **only if you fix a renormalization scheme for $q_{\rm obs}$**; the hidden ambiguity is that "extracted $h_\vartheta$" depends on the scheme defining $q_{\rm obs}(\mu)$. Pin it by demanding $h_\vartheta$ is the *scheme-invariant period* and putting all $\mu$-dependence in $\mathcal{K}_{\rm EM}$ — which your structure already wants. Then the falsifier sharpens to: *no scheme makes $\partial h_\vartheta/\partial\ln\mu=0$ consistent with three $\alpha$ anchors* ⟹ fail.

## Minimal Toy Model + First Three Steps

**Comment 13 — Recommended toy and first steps.**
Use the scalar self-hit oscillator above. Then:

1. **Compute $\Omega_h$ from the action.** Write the variational action $S[x]$ whose Euler–Lagrange equation is the DDE, take the second variation, and *read off* $w(\sigma)$ as the Hessian cross-term. Verify $\Omega_h$ is closed and identify $\ker\Omega_h$. (This tests Comments 3–4.)
2. **Reduce.** Apply center-manifold/inertial-manifold reduction near a Hopf-born periodic orbit $\gamma_0$. Confirm $\mathcal{M}$ is finite-dimensional and compute the induced Liouville form $\vartheta$. (This tests Comment 8, H3.)
3. **Compute $\oint\vartheta$ two ways** — in $(p,x)$ and in action-angle $(J,\phi)$ — and measure $|h_a-h_b|$ under $\Delta t$-halving. If they converge to the *same* value, readout-independence holds on the toy; if they split, you have found the resonance obstruction of Comment 9 in its simplest form.

## Fatal Flaws / Circularity

**Comment 14 — One latent circularity to excise.**
The fine-structure row uses $\hbar_\vartheta$ to *define* $\alpha$, while the blackbody and de Broglie rows use $h_\vartheta$ to define energy/momentum quantization. If $h_\vartheta$ is in turn *fitted* from atomic fine-structure data (your falsifier protocol), you risk a closed loop: $h_\vartheta$ extracted from $\alpha$, then used to predict $\alpha$. Break it by **deriving $h_\vartheta$ purely from the orbit geometry of $\bar\gamma_0$ (Step 3 above), with no electromagnetic input**, and only *then* feeding it into the $\alpha$ row. The falsifier is valid only if $h_\vartheta$ is geometry-derived, not $\alpha$-fitted. This is the single most important correction for the next packet.

**Comment 15 — Notation/structure changes before the next solver packet.**
- Rename the target **Retained-Orbit Period Reduction Lemma**; drop "integral de Rham class" from the headline, demote integrality to a selection condition.
- Replace $\Omega_h$ with the pair $(\mathcal{H}, \Omega_h, \ker\Omega_h)$ and *require* $w$ = action Hessian.
- Promote $\vartheta$ to the **tautological one-form on $T^*\mathcal{M}$** (or contact form), making periods canonical.
- Replace $\mathcal{H}_{\rm hist}$ residual with a **Noether continuity equation** plus its numerical violation.
- Replace the triple fiber product with a **single fibration $\mathcal{M}\to B_{\rm sea}$** and define $h_\vartheta$ as the fiberwise period; $\partial h_\vartheta/\partial\ln\mu=0$ becomes "period is a locally constant section."
- Add an explicit **non-resonance certificate** $\min_{\text{slaved modes}}|\text{small divisor}| > \delta$ as a hypothesis, since it controls the $h_a=h_b$ obstruction.

**Bottom line:** the fastest route to closure is *not* to prove integrality abstractly. It is to (i) derive $w$ and $\ker\Omega_h$ from the action Hessian, (ii) prove the finite-dimensional reduction near one periodic orbit, (iii) verify readout-independence numerically on the scalar self-hit oscillator, and (iv) decouple $h_\vartheta$ from the $\alpha$ fit. If readout-independence *fails* on the toy, you have found a generic obstruction and falsified the program at minimal cost — which is exactly the certificate you want.