# Mode Taxonomy

This chapter defines the controlled vocabulary for reaction-level assembly transitions. It is the canonical terminology source for `reactions/*.md`.

## Scope

The goal is consistency, not new phenomenology. Standard observer-level reaction equations remain unchanged unless a chapter explicitly derives a deviation.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly-Level Interpretation

At assembly level, these terms refer to substrate dynamics in absolute time:

- **Mode-lock event:** a discrete stability transition where a driven tri-binary/wake configuration settles into an allowed propagating or bound mode.
- **Wake-strain threshold:** the local instability boundary in Noether-Sea-coupled transport; below threshold, energy disperses into medium excitations, above threshold, stable mode formation is allowed.
- **Nucleation:** relocking/reorganization of existing substrate content (with provenance-preserving architrino bookkeeping), not creation ex nihilo.
- **Planar-mode nucleation (photon channels):** lock-in to a stable planar propagating mode carrying energy-momentum and polarization structure.
- **Corridor-mode nucleation (weak channels):** lock-in to corridor-type interaction modes used for $W^\pm/Z$ channel bookkeeping.
- **Pair nucleation:** local substrate recruitment/reconfiguration into $e^+e^-$ assemblies under threshold-satisfying two-photon forcing, constrained to recover standard kinematic and rate limits in validated regimes.

Observer-level equations remain the operational layer. Assembly-level language is accepted only when it preserves threshold, cross-section, timing, and conservation closure against standard phenomenology.

## Core Terms

- **Mode-lock event:** generic lock-in transition where transport energy is reorganized into a stable propagating or bound assembly mode.
- **Wake-strain threshold:** local trigger condition where trajectory forcing and medium state exceed stability boundary for a mode-lock event.
- **Nucleation:** formation of a stable assembly mode from local substrate reconfiguration, with conservation/provenance bookkeeping.

## Channel-Specific Terms

- **Planar-mode nucleation:** photon-channel lock-in language. Use for electromagnetic radiation channels (for example synchrotron, bremsstrahlung) unless a chapter justifies another term.
- **Corridor-mode nucleation:** weak-channel language reserved for $W^\pm/Z$ interaction contexts.
- **Pair nucleation:** $\gamma\gamma \rightarrow e^+e^-$ language at ontology level; must map to standard threshold/rate constraints in validated limits.

## Usage Rules

- Use `mode-lock event` when speaking generically across channels.
- Use `planar-mode` for photon emission in reaction chapters.
- Reserve `corridor` wording for weak channels to avoid semantic leakage into EM chapters.
- When a chapter uses provisional ontology terms, it must also state the observer-level mapping target (threshold, cross-section, timing).

## Mapping Discipline

- Ontology language cannot replace observer-level closure tests.
- Any provisional map must preserve:
  - reaction thresholds,
  - validated rate limits,
  - conservation laws,
  - explicit frame/timing conventions.

If these are not maintained, standard QED/SM transport language is authoritative for that regime.
