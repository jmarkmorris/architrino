# Prioritized Textbook Authoring Backlog
## *Current gaps and thin spots inferred from the obsolete TOC against the live webapp textbook*

This file replaces the old outline as a working backlog. The ordering below is intentional:

1. Missing canonical homes first
2. Existing stubs to flesh out second

---

## I. Missing Canonical Homes

These topics still need a clear textbook home in the current webapp structure.

### 1. Assembly Atlas
- Status: missing as a canonical chapter
- Why first: this is core theory infrastructure, not optional garnish
- Scope:
  - topological classes of assemblies
  - stability domains
  - bifurcation maps
  - basin-of-attraction reference material
- Likely home: `Standard Model Assemblies` or a cross-linked bridge between `Dynamics` and `Standard Model Assemblies`

### 2. Chronology of Nature
- Status: ingredients exist, but the unified narrative spine is missing
- Why high priority: cosmology needs one chronological walkthrough instead of forcing readers to reconstruct the sequence from separate chapters
- Scope:
  - early causal-emission regime
  - thermalization and background structure
  - BBN epoch
  - recombination and the CMB
  - structure formation
  - late-time assembly
- Likely home: `Cosmology`

### 3. Black Holes, Jets, and Recycling
- Status: scattered references only
- Why high priority: this is a major test of the theory's strong-field and feedback picture
- Scope:
  - collapse without singular ontological commitment
  - jet production
  - recycling and re-emission
  - observational signatures
- Likely home: `Spacetime` with strong links into `Cosmology`

### 4. Dense Matter and Degeneracy Pressure
- Status: no dedicated canonical treatment
- Why high priority: needed for compact objects and high-density assembly physics
- Scope:
  - dense assembly packing
  - degeneracy-pressure reinterpretation
  - neutron-star style regimes
  - equation-of-state comparison
- Likely home: `Atomic and Nuclear Assemblies`

### 5. Hierarchy Problem and Asymptotic Safety
- Status: discussed only indirectly
- Why medium priority: important comparative chapter, but downstream of the core derivation stack
- Scope:
  - what the standard hierarchy problem claims
  - how $\mathbb{A}\mathbb{A}\mathbb{A}$ reframes or dissolves it
  - relation to UV completion and asymptotic-safety discussions
- Likely home: `Foundations` or `Philosophy-History` as a comparison chapter

### 6. Reconstructing Physics and Cosmology
- Status: missing synthesis chapter
- Why medium priority: useful only after the theory-core chapters are stable
- Scope:
  - what has been reconstructed
  - what was reduced to geometry and delayed causal dynamics
  - what remains open
- Likely home: concluding chapter spanning `Foundations`, `Dynamics`, and `Cosmology`

### 7. Vision for the Future / Toward New Technologies
- Status: no canonical home
- Why last: lowest priority under a theory-first authoring model
- Scope:
  - possible technological implications
  - simulation and modeling consequences
  - limits on speculation
- Likely home: final outlook material, not part of the core derivation spine

---

## II. Existing Stubs To Flesh Out

These chapters already exist in the webapp textbook, but they still read as placeholders, fragments, or very thin sketches.

### 1. [nuclear-binding.md](../../markdown/aaa/nuclear-atomic/nuclear-binding.md)
- Priority: highest stub
- Needs:
  - deuteron as the first real nuclear test case
  - alpha stability
  - magic numbers and shell behavior
  - isotope selection and transmutation logic

### 2. [nucleon-structure.md](../../markdown/aaa/nuclear-atomic/nucleon-structure.md)
- Priority: highest stub
- Needs:
  - proton and neutron geometry
  - neutral-axis coupling
  - comparison to Yukawa and chiral EFT language
  - scorecard against mass and moment data

### 3. [atomic-spectra.md](../../markdown/aaa/nuclear-atomic/atomic-spectra.md)
- Priority: high
- Needs:
  - real spectroscopy coverage
  - fine and hyperfine structure mapping
  - Lamb-shift interpretation
  - precision-clock relevance

### 4. [molecular-geometry.md](../../markdown/aaa/nuclear-atomic/molecular-geometry.md)
- Priority: high
- Needs:
  - bonding geometries
  - screening and many-body assembly effects
  - relation to VSEPR-like regularities without borrowing its ontology

### 5. [condensed-matter.md](../../markdown/aaa/nuclear-atomic/condensed-matter.md)
- Priority: high
- Needs:
  - phases and collective organization
  - lattice and band-style behavior
  - transport and emergent order

### 6. [no-go-theorems.md](../../markdown/aaa/validation/no-go-theorems.md)
- Priority: medium
- Needs:
  - a disciplined comparison against Bell, Kochen-Specker, and related constraint frameworks
  - explicit statement of which assumptions $\mathbb{A}\mathbb{A}\mathbb{A}$ does and does not share

### 7. [known-tensions.md](../../markdown/aaa/validation/known-tensions.md)
- Priority: medium
- Needs:
  - explicit unresolved problems
  - failure conditions
  - where the theory is still provisional

---

## III. Practical Authoring Order

If the goal is to strengthen the webapp textbook in the most useful order, the next passes should be:

1. `Assembly Atlas`
2. `Chronology of Nature`
3. [nuclear-binding.md](../../markdown/aaa/nuclear-atomic/nuclear-binding.md)
4. [nucleon-structure.md](../../markdown/aaa/nuclear-atomic/nucleon-structure.md)
5. `Black Holes, Jets, and Recycling`
6. [atomic-spectra.md](../../markdown/aaa/nuclear-atomic/atomic-spectra.md)
7. `Dense Matter and Degeneracy Pressure`
8. [molecular-geometry.md](../../markdown/aaa/nuclear-atomic/molecular-geometry.md)
9. [condensed-matter.md](../../markdown/aaa/nuclear-atomic/condensed-matter.md)
10. [no-go-theorems.md](../../markdown/aaa/validation/no-go-theorems.md)
11. [known-tensions.md](../../markdown/aaa/validation/known-tensions.md)
12. `Hierarchy Problem and Asymptotic Safety`
13. `Reconstructing Physics and Cosmology`
14. `Vision for the Future / Toward New Technologies`
