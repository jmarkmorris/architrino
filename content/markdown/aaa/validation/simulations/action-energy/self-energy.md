# Self-energy and regularization notes

Purpose: explain why classical "point-charge self-energy" divergences do not arise in this framework, and summarize the role of measure-valued causal surfaces, the $H(0)=0$ convention, and $\eta$-mollification.

## Classical self-energy pathology (contrast)

In classical electrostatics, a static $1/r$ potential yields an electric field $\mathbf{E}\propto 1/r^2$ with energy density proportional to $\|\mathbf{E}\|^2\propto 1/r^4$. Integrating $1/r^4$ over a ball produces a divergent $\int (1/r^2)\,dr$ near $r\to0$, the textbook "infinite self-energy of a point charge." This is an artifact of modeling the source as an enduring, everywhere-filled near field.

## Why the divergence is absent here

This project does not posit a static near field. Instead:

- Measure-valued expanding causal surfaces (no static $1/r$ near field):
  - Each emission is a razor-thin causal isochron with surface density $q/(4\pi r^2)$, represented by $\rho(t,s)=(q/(4\pi r^2))\delta(r-c_f\tau)H(\tau)$. The support at fixed $t$ is a causal wake surface $S_r$, not a three-dimensional $1/r^2$ fill down to $r=0$. See [Background and Simple Action](background-and-simple-action.md).

- $H(0)=0$ (no coincident self-kick):
  - The instantaneous emission $(\tau=0)$ contributes nothing to the force on the emitter; $r=0$ roots beyond $\tau=0$ do not exist because $r=c_f(t-t_0)$. This removes the only event where a literal $r=0$ could enter. See [Causal Set and Delay Geometry](causal-set-and-delay-geometry.md).

- $\eta$-mollification (finite, well-defined work over resolved windows):
  - Replace $\delta(r-c_f\tau)$ by a narrow Gaussian $\delta_\eta$ with width $\eta>0$ when differentiability is required. Potentials $\Phi_\eta$ and forces $-\nabla(q'\Phi_\eta)$ are then regular functions; on any resolved interval the work-energy identity holds:
    $\Delta E_k=-\Delta U$, with $U=q'\Phi_\eta$,
    and remains finite. As $\eta\to0$, integrals converge in the weak sense to the impulsive model without introducing infinities. See [Well-posedness and Regularization](well-posedness-and-regularization.md).

- Event-driven geometry (self-hits occur at $r>0$):
  - Self-interaction requires outrunning recent wake surfaces $(\|\mathbf{v}\|>c_f)$. Self-hits are intersections with one's own earlier wakes at strictly positive radius $r>0$, yielding finite $1/r^2$ impulses (repulsive, like-on-like). There is no accumulation of divergent near-field energy at $r\to0$.

Net effect: the canonical ontology (moving surface measures, H(0)=0, mollification for analysis) avoids the classical point-charge self-energy divergence by construction.

## Practical guidance (numerics and analysis)

- Choose $\eta$ small relative to local geometry (path curvature radius, inter-source spacing) for smooth ODE integration; verify $\Delta E_k=-\Delta U$ on resolved windows.
- Calibrate $\kappa$ using stationary/slow benchmarks (Method 2) and use the event-driven law (Method 3) for many-body dynamics; no per-hit emitter-speed amplitude weighting is introduced.
- Treat self-hits as ordinary finite r>0 events; ensure H(0)=0 in implementation to exclude coincident-time artifacts.

## Sign-resolved bookkeeping

An additional numerical caution is worth stating explicitly: a Noether sea region or assembly may carry a large internal action budget even when its coarse far-wake potential appears weak.

- Positive and negative sectors can superpose so that the net far-field potential is small.
- That cancellation does **not** imply the underlying kinetic work or stored interaction content is individually small in each sector.
- For this reason, diagnostics should track sign-resolved contributions whenever possible rather than relying only on net-potential summaries.

This matters especially for shielding claims. A strongly shielded assembly may look energetically modest from afar while still containing substantial internal positive/negative activity whose cancellation is only effective after superposition. Sign-resolved ledgers therefore help distinguish true low-energy states from high-content states hidden by cancellation.

Plain language: We don’t keep a permanent 1/r field glued to the point. Instead we use thin expanding causal surfaces, ignore the instant of emission for self-push, and (when needed) slightly thicken those wake surfaces so calculus works—so nothing ever “blows up” at r=0.
