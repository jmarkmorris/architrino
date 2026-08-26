# Prescribed Geometry

`prescribed-assembly-spec.v2` is the declarative source for display-only prescribed architrino histories. Every executable finite assembly retains one explicit `constituents` row and one explicit `worldlines` row per architrino. Optional `geometry.lattices` rows describe how those individual rows occupy a repeated or procedurally generated architrino population. Optional `geometry.seas` rows group explicit constituents into assemblies that inhabit or pass through a declared visualization frame.

Plainly: a lattice explains architrino sites; a sea explains assembly populations. Neither declaration erases the persistent identity or path of any architrino that is actually present in an executable record.

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

## Sea Contract

Each `geometry.seas[]` row has a stable `id`, one versioned `model`, and one `materialization` declaration. `assembly-population-sea.v1` is the registered model. It declares a `visualization-frame.v1`, an optional axis-aligned viewing `region`, and one or more `assemblyTemplates`. A template declares `assemblyClass`, optional `variant`, `populationRole`, `memberCount`, and `geometryOwner`. The class and variant are extensible concrete labels, so current rows can distinguish `braid` variants `pro` and `anti`, or name `neutrino`, `photon`, and later assembly ideas without changing the schema.

Plainly: the sea model is not another kind of lattice. It says which complete assemblies are present and how their group centers move through the view.

An explicit assembly instance binds `memberConstituentIds` to one template and declares `inertial-group.v1` motion relative to the visualization frame. At the declared epoch, the validator evaluates every member worldline and requires their geometric mean position and velocity to match the declared group state within $10^{-12}$. This is an unweighted geometric centroid, not a mass center. The frame velocity is then added to the relative group velocity to obtain the absolute prescribed velocity.

Plainly: `velocity: [0,0,0]` on `groupMotion` means group-$v=0$ in the visualization frame. The architrinos inside that assembly may still move internally, provided their velocities average to the declared group motion.

## Pro/Anti Sea With Passing Assemblies

The following JSON is a schematic contract example. Its member counts, identifiers, and owner strings are placeholders and do not define or approve a braid, neutrino, or photon geometry.

Plainly: use the counts and owner identifiers from each assembly's accepted geometry source when constructing a real configuration.

```json
{
  "id": "visualized-noether-sea",
  "model": {
    "kind": "assembly-population-sea.v1",
    "frame": {
      "kind": "visualization-frame.v1",
      "epochTime": 0,
      "originAtEpoch": [0, 0, 0],
      "velocity": [0, 0, 0]
    },
    "region": {
      "kind": "axis-aligned-box.v1",
      "minimum": [-10, -10, -10],
      "maximumExclusive": [10, 10, 10]
    },
    "assemblyTemplates": [
      { "id": "pro-braid", "assemblyClass": "braid", "variant": "pro", "populationRole": "sea-background", "memberCount": 8, "geometryOwner": "canonical-pro-braid-spec-id" },
      { "id": "anti-braid", "assemblyClass": "braid", "variant": "anti", "populationRole": "sea-background", "memberCount": 8, "geometryOwner": "canonical-anti-braid-spec-id" },
      { "id": "neutrino", "assemblyClass": "neutrino", "populationRole": "transient", "memberCount": 6, "geometryOwner": "canonical-neutrino-spec-id" },
      { "id": "photon", "assemblyClass": "photon", "populationRole": "transient", "memberCount": 4, "geometryOwner": "canonical-photon-spec-id" }
    ]
  },
  "materialization": {
    "status": "explicit-finite",
    "boundaryInterpretation": "visualization-window",
    "instances": [
      {
        "id": "pro-0",
        "templateId": "pro-braid",
        "memberConstituentIds": ["pro-0-0", "pro-0-1", "pro-0-2", "pro-0-3", "pro-0-4", "pro-0-5", "pro-0-6", "pro-0-7"],
        "groupMotion": { "kind": "inertial-group.v1", "epochTime": 0, "positionAtEpoch": [-2, 0, 0], "velocity": [0, 0, 0] }
      },
      {
        "id": "anti-0",
        "templateId": "anti-braid",
        "memberConstituentIds": ["anti-0-0", "anti-0-1", "anti-0-2", "anti-0-3", "anti-0-4", "anti-0-5", "anti-0-6", "anti-0-7"],
        "groupMotion": { "kind": "inertial-group.v1", "epochTime": 0, "positionAtEpoch": [2, 0, 0], "velocity": [0, 0, 0] }
      },
      {
        "id": "neutrino-0",
        "templateId": "neutrino",
        "memberConstituentIds": ["nu-0", "nu-1", "nu-2", "nu-3", "nu-4", "nu-5"],
        "groupMotion": { "kind": "inertial-group.v1", "epochTime": 0, "positionAtEpoch": [0, 3, 0], "velocity": [0, 0, 0] }
      },
      {
        "id": "photon-0",
        "templateId": "photon",
        "memberConstituentIds": ["photon-0", "photon-1", "photon-2", "photon-3"],
        "groupMotion": { "kind": "inertial-group.v1", "epochTime": 0, "positionAtEpoch": [0, -3, 0], "velocity": [0, 0.4, 0] }
      }
    ]
  }
}
```

Every named member above must also appear once in the enclosing specification's `constituents` array and own one row in `worldlines`. `geometryOwner` identifies the canonical geometry authority for the assembly template; the extensible `assemblyClass` label does not establish that geometry or a physical particle identity by itself. A `visualization-window` is only the displayed finite population and does not imply that unseen assemblies exist outside its region.

Plainly: pro and anti braids can form the background, while a neutrino or photon can pass through slowly or remain stationary in the chosen view. The JSON still has to provide the actual constituent paths for every displayed assembly.

Sea declarations may also use `status: "template-only"` with `boundaryInterpretation: "population-template"`. Such a row declares possible assembly types but has no `instances` and produces no executable source worldlines.

Plainly: a template-only sea records a future population idea without pretending that its assemblies have already been built.

## Extension Rule

New procedural lattice families are added in `PrescribedLatticeOperators.mjs` with a new versioned `generator.kind`, complete validation, deterministic site identities, explicit boundary semantics, and tests with independently fixed expected coordinates. New sea families are added in `PrescribedSeaModels.mjs` with a new versioned `model.kind`, explicit frame and population semantics, and matching fail-closed tests. Existing generator or model meanings are not broadened silently.

Plainly: future lattice and sea ideas have deliberate extension points, but malformed or unregistered ideas fail closed.

The lattice and sea layers are prescribed geometry. They invoke no EOM solver, causal-root evaluator, retention test, stability test, energy calculation, constitutive sea-response law, or candidate-acceptance rule.

Closure goal: encode repeated and randomized architrino populations and assembly-level sea populations reproducibly while preserving individual finite constituent identities and preventing finite visualization windows from claiming an unmaterialized infinite environment or a derived Noether-sea law.
