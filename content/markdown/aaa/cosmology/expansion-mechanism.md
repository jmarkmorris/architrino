# Expansion Mechanism

## Core Idea

The Euclidean void does not expand. What evolves is the Noether sea and the state of assemblies moving through it.

## Effective Scale Factor in a Fixed Void

Define an effective scale history from medium structure:

$$
a(t)\propto \frac{\langle L_{\text{core}}(t)\rangle}{\langle L_{\text{core}}(t_{\text{ref}})\rangle},
$$

where $L_{\text{core}}$ is a representative assembly-separation scale.

This $a(t)$ is a summary of medium evolution inside fixed $(x,y,z)$, not geometric stretching of the container.

Equivalent bookkeeping choices can be used in the same ontology:

$$
a(t)\ \leftrightarrow\ \langle R_{\text{core}}(t)\rangle
\quad\text{or}\quad
a(t)\propto \rho_{\text{sea}}(t)^{-1/3}.
$$

These are effective parameterizations of medium state, not independent geometric claims.

## Clock-Rate Redshift Interpretation

Cosmological redshift is treated as cumulative propagation through a changing medium plus clock-rate mismatch between emitter and observer environments.

Use the proper-time map:

$$
\frac{d\tau}{dt}=F\!\left(\mathbf{v},\rho_{\text{sea}},\Phi_{\text{eff}},\text{clock geometry}\right).
$$

A photon that traverses regions with different $\rho_{\text{sea}}$ and $\Phi_{\text{eff}}$ is read by clocks with different local rates. The observed $z$ is then an emergent comparison of those rates along the path history.

Operationally:

$$
1+z = \frac{\nu_e}{\nu_o}
= \frac{(d\tau/dt)_o}{(d\tau/dt)_e},
$$

so redshift is treated as path-integrated medium evolution plus endpoint clock-rate comparison.

For modeling and diagnostics, separate at least three effective channels:

- endpoint clock-rate comparison,
- source/observer relative-motion (Doppler-like) contribution,
- propagation contribution from traversed medium state and gradients.

## Photon-Propagation Contribution

Beyond endpoint clock comparison, the same transport picture can include path-dependent photon energy evolution in medium transit ("redshift toll").

In this reading, effective redshift accumulation may depend on photon energy, traversed medium state, and path environment, so redshift is modeled as a transport kernel rather than a single universal linear rule.

Line-of-sight medium flow and local contraction/expansion regions can, in principle, contribute signed shifts, so local blueward and redward biases should be treated within one transport kernel rather than as disconnected exceptions.

Propagation channels must preserve image sharpness and $(1+z)$ time-dilation consistency; models requiring generic scattering-loss redshift are excluded.

## Dissipation and Rescaling Picture

Apparent expansion is interpreted as relaxation of medium state:

- high-curvature source regions inject energy into outbound assembly flows,
- lower-density regions evolve toward larger characteristic assembly scales and lower effective temperatures,
- observer-level expansion summaries track this rescaling history.

## Dark-Energy Language in This Frame

The parameter

$$
w=\frac{p}{\rho}
$$

remains useful as an effective descriptor, but its physical content is medium stress and relaxation state, not an independent vacuum-fluid ontology.

## Hubble-Tension Link

Early-inferred and local-inferred expansion rates probe different medium states:

- Early probes sample a more uniform, less-relaxed sea history.
- Local probes sample pockets that are further along relaxation and dissipation trajectories.

So the $H_0$ split is interpreted as state-dependent inference from one ontology, not two incompatible universes.

In this framing, $H_0$ is not expected to be strictly universal at all environments; local scatter is read as part of medium-state dependence.

Quasar redshift distributions are interpreted in the same transport-and-source framework, separating source-population evolution from path-history accumulation within one model.

## Timescape-Style Bridge, $\mathbb{A}\mathbb{A}\mathbb{A}$ Mechanism

Conceptually, this layer is adjacent to inhomogeneous/clock-calibration cosmologies, but the implementation here remains one explicit medium-state model:

- clock-rate mapping is computed from shared Noether-sea state variables,
- expansion-like inference shifts are environment-conditioned readouts, not ontology splits,
- local-ladder versus early-time differences are modeled as distinct sampling of one evolving medium.

## Effective Friedmann Bridge (Comparison Layer)

For data-comparison work, one may retain a Friedmann-like summary:

$$
H^2 = \frac{8\pi G_{\text{eff}}}{3}\left(\rho_m+\rho_r+\rho_{\text{sea}}\right)-\frac{k_{\text{eff}}}{a^2},
$$

with $a(t)$ interpreted as a medium-state parameter and $G_{\text{eff}},k_{\text{eff}}$ as effective summaries of assembly-medium response.

## Expansion-Module Interface

In the modular cosmology map, this page provides:

- ontic inputs: medium density/stress state, clock-rate map, and transport environment,
- effective outputs: inferred $a(t)$, $H(z)$, and redshift-distance behavior,
- shared bridge variables used by `dark-energy.md`, `hubble-s8-tensions.md`, and `CMB.md`.
