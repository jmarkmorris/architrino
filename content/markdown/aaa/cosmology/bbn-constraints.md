# BBN Constraints

## Scope

This document specifies how the Architrino cosmology must satisfy Big Bang Nucleosynthesis (BBN) constraints.

## Core Requirement

Any emergent expansion model must preserve successful light-element predictions:

- Helium mass fraction $Y_p$
- Deuterium abundance D/H
- Lithium-7 behavior (including known tension)

## Standard Comparison Frame

Use conventional reaction-network bookkeeping for direct comparison:

$$
\frac{dn_i}{dt} = \sum_{j,k}\langle\sigma v\rangle_{jk\to i}n_jn_k
- \sum_l\langle\sigma v\rangle_{il}n_in_l.
$$

Only the background history and effective transport terms are modified.

## Architrino Additions

- Expansion history enters through an emergent $H(t)$.
- Medium transport may alter effective neutron/proton freeze-out pathways.
- Any extra mechanism must preserve deuterium and helium while explaining lithium without ad hoc tuning.

## Required Outputs

- Predicted $(Y_p, \text{D/H}, \text{Li/H})$ across parameter ranges.
- Sensitivity to medium-density and transport parameters.
- Joint compatibility region with CMB baryon-density inference.

## Falsifiers

- No parameter region matches both helium and deuterium simultaneously.
- Lithium improvement requires changes that break CMB-compatible baryon density.
- Required transport effects violate other early-universe constraints.

## Immediate Work

1. Implement BBN network run with emergent $H(t)$ input.
2. Add Architrino transport term toggle and isolate its impact.
3. Produce a constraint plot with clear viable/excluded regions.
