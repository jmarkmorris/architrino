# Prescribed Geometry

`prescribed-assembly-spec.v2` is the declarative source for display-only prescribed architrino histories. Every executable finite assembly retains one explicit `constituents` row and one explicit `worldlines` row per architrino. Optional `geometry.lattices` rows describe how those individual rows occupy a repeated or procedurally generated population.

Plainly: a lattice declaration explains the pattern. It does not erase the persistent identity or path of any architrino that is actually present in an executable record.

## Lattice Contract

Each `geometry.lattices[]` row has a stable `id`, one versioned `generator`, and one `materialization` declaration. The registered generators are:

| Generator | Declared geometry |
| --- | --- |
| `translation-lattice.v1` | A three-dimensional translation basis, a finite motif of architrino site templates, and a finite or infinite integer-index extent. |
| `seeded-random-sites.v1` | A reproducible finite site sample in an axis-aligned box, using `xorshift32.v1`, a nonzero 32-bit seed, a site count, and cyclic template assignment. |

Plainly: generator names are versioned contracts, not arbitrary code embedded in JSON. A future lattice idea receives a new registered generator and validator rather than changing the meaning of an existing record.

Every site template declares `id`, `polarity`, and `role`. Translation-lattice templates also declare `fractionalPosition` in the half-open unit cell $[0,1)^3$. Three linearly independent `basisVectors` map that fractional cell geometry into the worldline coordinate system.

Plainly: the motif can contain any finite three-dimensional pattern of positive- and negative-polarity architrinos. The basis vectors repeat that complete pattern without assuming a cubic cell.

The lattice position is an epoch condition, not a replacement for path history. An explicit materialization checks each bound worldline at `materialization.epochTime`; that worldline remains the sole declaration of subsequent and prior motion.

Plainly: a moving architrino can begin on a lattice site and then follow any registered prescribed worldline. The lattice does not silently hold it fixed or generate its dynamics.

## Finite Translation-Lattice Example

```json
{
  "id": "body-centered-cell",
  "generator": {
    "kind": "translation-lattice.v1",
    "origin": [0, 0, 0],
    "basisVectors": [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    "extent": {
      "kind": "finite-index-box.v1",
      "minimum": [0, 0, 0],
      "maximumExclusive": [1, 1, 1]
    },
    "siteTemplates": [
      { "id": "corner", "fractionalPosition": [0, 0, 0], "polarity": 1, "role": "braid" },
      { "id": "body", "fractionalPosition": [0.5, 0.5, 0.5], "polarity": -1, "role": "braid" }
    ]
  },
  "materialization": {
    "status": "explicit-finite",
    "epochTime": 0,
    "boundaryInterpretation": "cropped-periodic-template",
    "instances": [
      { "cellIndex": [0, 0, 0], "templateId": "corner", "constituentId": "positive-0", "worldlineId": "positive-path-0" },
      { "cellIndex": [0, 0, 0], "templateId": "body", "constituentId": "negative-0", "worldlineId": "negative-path-0" }
    ]
  }
}
```

For `explicit-finite`, the validator enumerates every generated site, requires exactly one binding for each site, checks template polarity and role against the constituent, and evaluates the bound worldline at `epochTime`. The worldline position must equal the generated lattice position within $10^{-12}$.

Plainly: an incomplete crop, duplicated site, wrong polarity, wrong path owner, or shifted path is rejected. The declaration cannot imply neighbors that the finite realization did not materialize.

`boundaryInterpretation` states what the finite extent means:

- `finite-population` means the declared population ends at the finite boundary.
- `cropped-periodic-template` means the explicit rows are a finite crop of a repeated generating rule; unmaterialized copies are not constituents of this record.
- `infinite-template` is allowed only with `status: "template-only"` and `extent.kind: "infinite-index-space.v1"`.

Plainly: an ideal infinite lattice and a finite executable crop are different objects in the specification.

## Seeded-Random Example

```json
{
  "id": "random-sample",
  "generator": {
    "kind": "seeded-random-sites.v1",
    "algorithm": "xorshift32.v1",
    "seed": 123456789,
    "siteCount": 2,
    "templateAssignment": "cyclic.v1",
    "domain": {
      "kind": "axis-aligned-box.v1",
      "minimum": [-1, -1, -1],
      "maximumExclusive": [1, 1, 1]
    },
    "siteTemplates": [
      { "id": "positive", "polarity": 1, "role": "braid" },
      { "id": "negative", "polarity": -1, "role": "braid" }
    ]
  },
  "materialization": {
    "status": "explicit-finite",
    "epochTime": 0,
    "boundaryInterpretation": "finite-sample",
    "instances": [
      { "sampleIndex": 0, "templateId": "positive", "constituentId": "positive-0", "worldlineId": "positive-path-0" },
      { "sampleIndex": 1, "templateId": "negative", "constituentId": "negative-0", "worldlineId": "negative-path-0" }
    ]
  }
}
```

`xorshift32.v1` generates three uniform half-open interval draws per sample in $x,y,z$ order. Sample $n$ receives template $n\bmod m$, where $m$ is the number of `siteTemplates`. Changing the algorithm, draw order, or template-assignment rule requires a new versioned generator contract.

Plainly: the seed and algorithm make the random coordinates auditable. Randomness here specifies geometry only; it is not evidence for equilibrium, retention, stability, or physical realization.

## Template-Only Declarations

`status: "template-only"` records a population family without binding it to the spec's explicit constituents. It must not include `epochTime` or `instances`. A finite translation template declares either `finite-population` or `cropped-periodic-template`; an infinite translation pattern declares `infinite-template`; an unmaterialized random family declares `stochastic-template`.

Plainly: template-only JSON can preserve an idea that is not finite or not yet instantiated, while preventing downstream code from treating imagined sites as source worldlines.

## Extension Rule

New procedural families are added in `PrescribedLatticeOperators.mjs` with a new versioned `generator.kind`, complete validation, deterministic site identities, explicit boundary semantics, and tests with independently fixed expected coordinates. Existing generator meanings are not broadened silently.

Plainly: future lattice ideas have a deliberate extension point, but malformed or unregistered ideas fail closed.

The lattice layer is prescribed geometry. It invokes no EOM solver, causal-root evaluator, retention test, stability test, energy calculation, or candidate-acceptance rule.

Closure goal: encode repeated and randomized architrino populations reproducibly while preserving individual finite constituent identities and preventing finite crops from claiming an unmaterialized infinite environment.
