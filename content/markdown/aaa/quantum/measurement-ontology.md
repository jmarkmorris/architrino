# Measurement Ontology

## Purpose and Scope

This chapter fixes what a measurement event is in $\mathbb{A}\mathbb{A}\mathbb{A}$ at the ontological level. It is narrower than the full Born-rule program. The aim here is to remove the placeholder and state the minimum physical architecture:

- what counts as the system,
- what counts as the apparatus,
- what turns an interaction into a record,
- and what the theory must reproduce to match ordinary quantum measurement practice.

## Core Claim

Measurement is not a primitive axiom and not a special observer intervention. It is a physical interaction between assemblies that drives a metastable target across a separatrix and then locks the resulting branch into a persistent macroscopic record.

So the ontology is:

- **system:** an assembly or coupled assembly-subsystem with reduced state $X$,
- **apparatus:** another assembly network engineered so that its wake structure couples strongly to a chosen coordinate of $X$,
- **environment:** the surrounding Noether Sea plus uncontrolled apparatus degrees of freedom,
- **measurement outcome:** the attractor basin into which the coupled system settles,
- **record:** a durable asymmetry in apparatus/environment variables that can be re-read without reconstructing the original metastable state.

## No Heisenberg Cut

The ontology rejects a fundamental system-observer split.

At the substrate level there are only:

- architrinos with definite positions and velocities in absolute time,
- their causal wakes,
- and the assemblies built from those constituents.

What standard quantum mechanics calls a "measurement" is therefore just a special regime of assembly-assembly coupling with three features:

1. strong targeted perturbation of a metastable degree of freedom,
2. amplification into many apparatus degrees of freedom,
3. dissipation into the surrounding sea so that coherent reversal becomes practically inaccessible.

## Minimal Dynamical Model

Let $X(t)$ denote reduced coordinates for the measured subsystem and $A(t)$ the relevant apparatus coordinates. The coupled deterministic coarse-grained dynamics may be written schematically as
$$
\dot X = F_X(X,A,\mathcal{W}),
\qquad
\dot A = F_A(X,A,\mathcal{W}),
$$
where $\mathcal{W}$ denotes the local causal-wake background inherited from the apparatus, environment, and prior path history.

Let the metastable branch boundary be defined by a separatrix
$$
\Sigma(X,A)=0.
$$
Then the measurement transition is the first crossing time
$$
\tau_{\text{meas}}
=
\inf\{t>t_0:\Sigma(X(t),A(t))=0\}.
$$

This is the ontology-level replacement for instantaneous collapse. The transition is continuous in absolute time, though it may appear effectively abrupt to a coarse observer.

## What Makes an Interaction a Record

Not every separatrix crossing is a measurement record. A record requires stability and amplifiability.

Introduce a coarse record variable $R(A)$ extracted from apparatus state. A measurement record exists only if, after the transition,
$$
|R(A(t)) - R(A_{\text{pre}})| > R_*,
$$
for some readout threshold $R_*$, and if the new branch remains stable for a persistence time $T_{\text{rec}}$:
$$
\tau_{\text{persist}} > T_{\text{rec}}.
$$

In plain terms, a record needs both:

- a macroscopically legible state change,
- and enough environmental locking that the branch does not immediately recohere.

This is why a microscopic interaction is not automatically a measurement, while a detector avalanche, pointer shift, bubble track, or durable bit-flip is.

## Relation to the Wavefunction

The wavefunction remains an effective observer-level object. In a measurement context it tracks:

- the coarse-grained envelope over still-accessible branches before the record forms,
- the basin weights associated with those branches,
- and the observer's epistemic uncertainty about which branch the deterministic microdynamics will realize.

Before the threshold crossing, the effective description may remain approximately unitary. After the record-forming crossing, the appropriate effective description changes because the system has entered a different attractor basin and the apparatus/environment has stored that branch information irreversibly for practical purposes.

So "collapse" is not an extra physical law. It is the observer's forced update once the ontology has already selected a branch.

## Measurement Channels

Different measurement types correspond to different apparatus couplings, but the ontology is the same.

### Position-like measurements

The apparatus couples to spatial localization or arrival geometry. The record is a site-selective apparatus response such as a screen hit or detector cell trigger.

### Momentum- or phase-like measurements

The apparatus couples to a resonance band, interference geometry, or transport mode. The record is a stable branch in the apparatus-sensitive phase channel.

### Spin / discrete-outcome measurements

The apparatus couples to a discrete assembly orientation or topological branch. The record is a branch-specific amplification, for example one of two detector channels.

In this language, "spin up" and "spin down" are not tiny literal arrows hidden inside the particle. They are the two stable branch labels selected by the apparatus relative to its chosen measurement axis.

The important point is that the ontology never changes: different observables correspond to different coarse coordinates and different apparatus couplings, not different laws of collapse.

## Born-Rule Interface

This chapter does not derive the Born rule by itself. It fixes the ontology that the Born-rule derivation must sit on.

The closure target is that basin weights induced by the deterministic flow reproduce the usual outcome weights:
$$
P_k = \mu_*(B_k),
$$
with $B_k$ the record-forming attractor basins and $\mu_*$ the relevant invariant or coarse-grained measure.

The measurement ontology therefore connects directly to the basin-measure program in [wavefunction-ontology.md](./wavefunction-ontology.md) and the separatrix-time program in [superposition-mechanism.md](../theory-bridges/superposition-mechanism.md).

## Closure Targets

For this chapter to count as closed, the repo still needs:

1. one explicit apparatus-target toy model with a computed separatrix,
2. one explicit record variable $R(A)$ and persistence criterion,
3. one derived estimate of finite collapse time $\tau_{\text{meas}}$,
4. one bridge from basin weights to observed frequencies.

This chapter now fixes the ontology and interface. The remaining work is derivational, not definitional.

## Falsification Gate

The ontology fails if any of the following occur:

- a genuine measurement record can be shown to form without any finite-time physical branch-selection process,
- the same apparatus can produce reproducible outcomes while no durable apparatus/environment asymmetry is created,
- or experiments force strictly instantaneous projection as a fundamental event rather than an effective coarse description.

Equivalently, the theory requires
$$
\tau_{\text{meas}} > 0
$$
for real record-forming interactions, even if that time becomes extremely short in ordinary laboratory practice.

## Related Chapters

- [collapse-problem.md](../theory-bridges/collapse-problem.md)
- [superposition-mechanism.md](../theory-bridges/superposition-mechanism.md)
- [wavefunction-ontology.md](./wavefunction-ontology.md)
- [pilot-wave-character.md](../theory-bridges/pilot-wave-character.md)
