# Self-energy and regularization notes

Purpose: explain why classical "point-charge self-energy" divergences do not arise in this framework, and summarize the role of measure-valued causal surfaces, the $H(0)=0$ convention, and $\eta$-mollification.

## Classical self-energy pathology (contrast)

In classical electrostatics, a static $1/r$ potential yields an electric field $\mathbf{E}\propto 1/r^2$ with energy density proportional to $\|\mathbf{E}\|^2\propto 1/r^4$. Integrating $1/r^4$ over a ball produces a divergent $\int (1/r^2)\,dr$ near $r\to0$, the textbook "infinite self-energy of a point charge." This is an artifact of modeling the source as an enduring, everywhere-filled near field.

## Why the zero-radius divergence is quarantined here

This project does not posit a static near field. Instead:

- Measure-valued expanding causal surfaces (no static $1/r$ near field):
  - Each emission is a razor-thin causal isochron with surface density $q/(4\pi r^2)$, represented by $\rho(T,T_t)=(q/(4\pi r^2))\delta(r-c_f\Delta)H(\Delta)$. The support at fixed $T$ is a causal wake surface $S_r$, not a three-dimensional $1/r^2$ fill down to $r=0$. See [Background and Simple Action](background-and-simple-action.md).

- $H(0)=0$ (no coincident self-kick):
  - The instantaneous emission $(\Delta=0)$ contributes no acceleration to the transmitter; $r=0$ roots beyond $\Delta=0$ do not exist because $r=c_f(T_r-T_t)$. This removes the only event where a literal $r=0$ could enter. See [Causal Set and Delay Geometry](causal-set-and-delay-geometry.md).

- $\eta$-mollification (finite, well-defined work over resolved windows):
  - Replace $\delta(r-c_f\Delta)$ by a narrow Gaussian $\delta_\eta$ with width $\eta>0$ when differentiability is required. Potentials $\Phi_\eta$ and the corresponding potential-gradient bookkeeping variables are then regular functions. On a fixed-transmitter benchmark, a promoted run must test, rather than assume, the resolved-window identity
    $\Delta E_k=-\Delta U$, with $U=q'\Phi_\eta$,
    together with boundedness and regulator refinement. A moving-transmitter or self-hit branch instead requires the history-aware energy construction in [Delay Dynamics and Energy](delay-dynamics-energy.md); a local potential difference alone does not close its wake and boundary exchange. An $\eta\to0$ claim requires weak convergence of the promoted integrals and stable causal-root identity; mollification alone does not prove that limit. See [Well-posedness and Regularization](well-posedness-and-regularization.md).

- Event-driven geometry (self-hits occur at $r>0$):
  - A super-field-speed history interval is necessary for simple nontrivial self roots, but the accepted channel additionally requires a same-transmitter causal root, positive separation or declared core regularization, and retained branch floors. On such a chart, self-hits occur at $r>0$ and yield finite $W^{\mathrm{acc}}/r^2$ contributions. The chart does not establish a global absence of short-distance or regulator-limit divergences.

Net effect: within a declared admissible finite-$\eta$ branch chart, the canonical ontology does not include the static near-field integral that generates the classical point-charge divergence. The narrower result is a quarantine, not a global finiteness theorem: a failed branch floor, core convention, window limit, or $\eta\to0$ convergence test still blocks promotion.

## Practical guidance (numerics and analysis)

- Choose $\eta$ small relative to local geometry (path curvature radius, inter-transmitter spacing) for smooth delayed-history integration. Use $\Delta E_k=-\Delta U$ only for the declared fixed-transmitter benchmark; use the history-aware ledger for general branches.
- Fix comparison normalization on an independently known stationary-transmitter baseline. Agreement between the Green-function surrogate and event-root implementation is parity evidence and does not calibrate away the canonical transmitter-side acceleration weight.
- Treat self-hits as finite-$r$ events only after their root and branch floors pass; ensure $H(0)=0$ in implementation to exclude coincident-time artifacts.

## Sign-resolved bookkeeping

An additional numerical caution is worth stating explicitly: a Noether sea region or assembly may carry a large internal action budget even when its coarse far-wake potential appears weak.

- Positive and negative sectors can superpose so that the net far-field potential is small.
- That cancellation does **not** imply the underlying kinetic work or stored interaction content is individually small in each sector.
- For this reason, diagnostics should track sign-resolved contributions whenever possible rather than relying only on net-potential summaries.

This matters especially for shielding claims. A strongly shielded assembly may look energetically modest from afar while still containing substantial internal positive/negative activity whose cancellation is only effective after superposition. Sign-resolved ledgers therefore help distinguish true low-energy states from high-content states hidden by cancellation.

Plain language: We do not keep a permanent $1/r$ field attached to an architrino. Thin expanding causal surfaces and the $H(0)=0$ endpoint rule remove the classical static self-energy construction from the admitted chart, while finite-width and zero-width limits still have to pass their own boundedness and convergence tests.
