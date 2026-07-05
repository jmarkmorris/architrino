# Self-Contained Review Packet: Retained Action One-Form And Period Quantization

Closure goal:
Stress-test the retained action one-form and Period Quantization Lemma, then return the shortest rigorous path toward proof, obstruction, or falsification.

## Desired Response

Please first give overall insights, corrections, and advancements. Then answer the specific questions below.

Aim for 12-15 substantive comments total. Prioritize proof strategy, hidden assumptions, counterexamples, and the smallest mathematical objects we should build next.

## Reviewer Lens

Use a Terence Tao-style mathematical analyst lens. Focus on whether the proposed period-quantization program can be made rigorous for a deterministic state-dependent delay/self-hit system, or whether the history-space structure creates a generic obstruction.

## Context

We are developing a Noether braid theory. A Noether braid is a retained closed assembly with causal-delay wake channels, self-hit, energy/momentum/angular-momentum ledgers, and a surrounding Noether sea state. Exact shell support and binary grouping are branch-level proof obligations; the nested shell braid candidate adds three ordered support bands when that role map is declared.

The current goal is to avoid inserting Planck's constant independently into several standard equations. Instead, we want $h$ to arise as one retained action period whose projections produce photon energy, de Broglie momentum, angular momentum, blackbody occupancy, and fine-structure coupling.

## Current Proposed Structure

In a delayed causal system, the instantaneous phase space may be insufficient. We therefore propose an extended history-space presymplectic form:

$$
\Omega_h
=
\mathrm d p\wedge \mathrm d q
+
\int_{-\tau_{\max}}^{0}
\mathrm d p_{\mathrm{hist}}(\sigma)
\wedge
\mathrm d q(\sigma)\,
w(\sigma)\,\mathrm d\sigma,
\qquad
\mathrm d\vartheta=\Omega_h.
$$

The action unit is intended to be the period of one retained braid action one-form:

$$
h_\vartheta
=
\oint_{\gamma_0}\vartheta,
\qquad
\hbar_\vartheta=\frac{h_\vartheta}{2\pi}.
$$

## Target Lemma

Period Quantization Lemma:
For a retained nested shell braid on a closed branch chart with smooth Euclidean-motion and time-translation symmetry of the causal kernel, the de Rham class $[\vartheta]$ is integral, and the generator period $h_\vartheta$ is independent of which conjugate readout projects it: energy-frequency, momentum-wavevector, or angular momentum.

The residual target is:

$$
\mathcal R_h^\vartheta
=
\left(
\frac{E_\gamma-h_\vartheta\nu}{E_\gamma+\varepsilon_E},
\frac{\|\mathbf p_\gamma-\hbar_\vartheta\mathbf k\|}{\|\mathbf p_\gamma\|+\varepsilon_p},
\frac{\left|\oint_\gamma\vartheta-nh_\vartheta\right|}{\left|\oint_\gamma\vartheta\right|+\varepsilon_I},
\frac{|J-n\hbar_\vartheta|}{|J|+\varepsilon_J},
\max_{a,b}\frac{|h_a-h_b|}{|h_\vartheta|+\varepsilon_h},
\mathcal H_{\mathrm{hist}},
\mathcal S_{\mathrm{retune}}
\right).
$$

The history-balance term is intended to prevent a naive local $\oint p\,dq$ from being accepted when action is stored in causal wakes or lost through radiated/self-hit flux:

$$
\mathcal H_{\mathrm{hist}}
=
\frac{
\left|
\Delta\int_{-\tau}^{0}\mathcal P(t,\sigma)\dot q(t+\sigma)\,d\sigma
+
\Delta\Phi_{\mathrm{flux}}
\right|
}
{|h_\vartheta|+\varepsilon_h}.
$$

## Shared Carrier

The combined Planck/blackbody/fine-structure carrier is intended to be a fiber product over a minimal common carrier:

$$
\Theta_\star
=
(\vartheta,P_\gamma,c_\gamma,\theta_{\mathrm{sea}}),
\qquad
\Theta_{h\alpha}
=
\Theta_h
\times_{\Theta_\star}
\Theta_{\mathrm{bb}}
\times_{\Theta_\star}
\Theta_\alpha.
$$

## Blackbody Target

The Planck spectrum should be derived by maximum entropy on the photon mode measure, with mode counting and exchange symmetry explicit:

$$
\bar n_i
=
\frac{1}
{\exp((h_\vartheta\nu_i-\mu_\gamma)/(k_BT))-1}.
$$

The transverse-mode factor should come from photon-channel transversality. Zero photon chemical potential should be derived as absence of a conserved photon-number charge, not assumed.

## Fine-Structure Target

The coupling is:

$$
\alpha
=
\frac{q_{\mathrm{obs}}^2}
{4\pi\epsilon_0\hbar_\vartheta c_\gamma}.
$$

Running $\alpha(\mu)$ should be carried only by the electromagnetic response kernel and charged-threshold inventory:

$$
\frac{\partial h_\vartheta}{\partial\ln\mu}=0,
\qquad
\alpha(\mu)
=
\alpha[
\mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}}),
I_\mu
].
$$

Proposed falsifier:
Fit $\alpha(0)$, one atomic fine-structure anchor, and one running point. Extract the implied $h_\vartheta$ from each through the action one-form row. If the extracted action periods disagree under refinement, or if matching running $\alpha$ requires $\partial h_\vartheta/\partial\ln\mu\ne0$, the program fails.

## Specific Questions

1. Is the proposed Period Quantization Lemma mathematically plausible for a deterministic state-dependent delay/self-hit system, or does the history-space setting generically destroy integral periods?
2. What is the weakest correct theorem statement we should try first? Please state hypotheses, conclusion, and the likely proof route.
3. Is $\Omega_h$ written above structurally adequate as a history-space presymplectic form, or is it missing terms, constraints, quotienting, boundary conditions, or functional-analytic structure?
4. What is the right mathematical object for the retained branch chart: finite-dimensional invariant torus, delay-differential history manifold, Poincare section, quotient stack, groupoid of histories, or something else?
5. What must be proven for $\vartheta$ to be globally defined, or should we expect only local primitives with transition functions and a cocycle?
6. What obstruction would make $[\vartheta]$ non-integral or make the period irrational/readout-dependent?
7. Is the fiber product over $\Theta_\star=(\vartheta,P_\gamma,c_\gamma,\theta_{\mathrm{sea}})$ the right categorical structure, or should the shared carrier be larger or smaller?
8. Does the proposed history-balance residual correctly isolate wake storage and radiated/self-hit flux, or should it be replaced by a conserved-current or boundary-pairing statement?
9. What is the smallest toy model that could demonstrate the proof route or expose failure: delayed oscillator, two-body self-hit loop, three coupled phase oscillators, or a symplectic map with memory?
10. For blackbody recovery, is MaxEnt on the mode measure the cleanest first proof route, or should detailed balance, ergodicity, or KMS-like structure be required first?
11. For $\alpha(\mu)$, is the "running may not move $h_\vartheta$" falsifier well-posed, and what hidden renormalization convention could make it ambiguous?
12. What concrete theorem, counterexample, or numerical certificate should be built next to advance toward closure fastest?

## Expected Output

- Overall insights, corrections, and advancements.
- A sharper theorem statement or obstruction statement.
- A minimal toy model recommendation.
- The first 3 proof or counterexample steps.
- Any fatal flaw or circularity.
- Any notation or structure that should be changed before we build the next solver packet.

Closure goal:
Obtain a rigorous next proof target or obstruction test for the retained action one-form and period-uniqueness program.
