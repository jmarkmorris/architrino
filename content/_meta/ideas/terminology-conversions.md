# Terminology Conversions

This note records the current terminology transition for older fermion-structure language.

All uses of `decoration`, `decorated`, and `fermion-decoration` should be examined and transformed during terminology cleanup. In many cases those phrases should be rewritten more precisely in terms of the `axial layer`, `axial architrinos`, `polar sites`, `polar dyads`, `axial pattern`, or `axial frame`, depending on what the sentence is actually describing.

## Canonical Language

Use `axial` for the system-level organization.
Use `polar` for the local site geometry.

This gives the following canonical stack:

- singular unit: `axial architrino`
- plural units: `axial architrinos`
- six-site structure: `axial layer`
- local attachment position: `polar site`
- one axis's two local sites: `polar dyad`
- informal local fallback: `polar pair`
- arrangement across six sites: `axial pattern`
- count/composition language: `axial inventory`
- coarse-grained orientation: `axial frame`
- microscopic motion: `axial circulation`
- local occupancy statement: `polar-site occupancy`

## Rationale

`axial` is the preferred system-level term because it points to the governing geometry and scales well from simple prose to technical discussion:

- axial layer
- axial frame
- axial pattern
- axial inventory
- axial architrino

`polar` is the preferred local term because it describes the specific site geometry clearly:

- polar sites
- polar dyad
- polar pair

`dyad` is preferred over `pair` for canonical technical use.
`doublet` should be avoided because it collides with existing Standard Model terminology.
`orbit` should be avoided because it collides with atomic/orbital language and suggests a cleaner classical trajectory than intended.

## Accepted Terms

| Role | Accepted term | Notes |
| --- | --- | --- |
| singular unit | `axial architrino` | canonical |
| plural units | `axial architrinos` | canonical |
| six-site structure | `axial layer` | canonical coarse-grained term |
| local attachment position | `polar site` | canonical |
| one axis's two local sites | `polar dyad` | canonical |
| informal local fallback | `polar pair` | allowed, not preferred |
| arrangement across six sites | `axial pattern` | canonical |
| count/composition language | `axial inventory` | canonical |
| coarse-grained orientation | `axial frame` | canonical |
| microscopic motion | `axial circulation` | use when dynamics matter |
| local occupancy statement | `polar-site occupancy` | useful technical phrase |

## Terms To Avoid

| Avoid | Why |
| --- | --- |
| `decoration` language by default | too vague; review all uses and replace with the specific axial/polar structure actually meant |
| `axial doublet` | too much collision with electroweak doublet language |
| `doublet` generally | same reason |
| `axial pair` as canonical | too informal/generic |
| `axial dyad` as canonical | mixes system-level `axial` with local two-site geometry |
| `axial orbit` | collides with orbital/orbit language |
| `axial path` | too generic |
| `charge` language by default | keep only for historical or continuity contexts |
| `field` language at the substrate level | collides with QFT/continuum ontology and obscures the emitted wake geometry |

## Translation Table

| Current usage | Accepted replacement |
| --- | --- |
| `personality layer` | `axial layer` |
| `Personality Layer` | `Axial Layer` |
| `personality architrino` | `axial architrino` |
| `personality architrinos` | `axial architrinos` |
| `personality sites` | `polar sites` |
| `personality slots` | `polar sites` or `polar-site slots` |
| `personality pattern` | `axial pattern` |
| `personality inventory` | `axial inventory` |
| `personality frame` | `axial frame` |
| `personality-frame misalignment` | `axial-frame misalignment` |
| `personality principal frame` | `axial frame` or `principal axial frame` |
| `personality charge distribution` | `axial distribution` |
| `personality charge tensor` | `axial-distribution tensor` or `axial moment tensor` |
| `personality charges` | `axial architrinos` or `axial inventory` depending on context |
| `personality charge` | `axial architrino` or `axial contribution` depending on context |
| `binary with personality` | `binary with a polar dyad` or `binary with an axial layer` |
| `personality-dressed binary` | `binary with a polar dyad` |
| `two personality sites on an axis` | `one polar dyad on an axis` |
| `personality swap` | `axial reassignment` or `polar-site reassignment` |
| `personality potentials` | `axial potentials` |
| `personality counts` | `axial inventory` |
| `personality geometry` | `axial geometry` |
| `personality layer rotates` | `axial frame rotates` |
| `the six personality sites` | `the six polar sites` |

## Charge-Language Conversions

Avoid using `charge` or `charges` as the default ontological name for architrinos. Prefer `charge` language only where historical continuity, Standard Model comparison, or higher-level effective/gauge/bookkeeping language genuinely requires it.

| Current usage | Accepted replacement |
| --- | --- |
| `charge` when referring to an architrino as a basic entity | `architrino` |
| `charges` when referring to architrinos as basic entities | `architrinos` |
| `point charge` | `architrino` or `transceiver of potential` |
| `positive charge` | `positrino`, `positive-polarity architrino`, or `positive polarity` |
| `negative charge` | `electrino`, `negative-polarity architrino`, or `negative polarity` |
| `charge sign` | `polarity` |
| `charge carrier` at architrino level | `architrino`, `axial architrino`, or `polarity carrier` depending on context |
| `charges on the poles` | `axial architrinos on the polar sites` |
| `bound charges` in fermion-decoration context | `bound axial architrinos` |
| `charge pattern` in fermion-decoration context | `axial pattern` |
| `charge inventory` in fermion-decoration context | `axial inventory` |
| `charge layer` in fermion-decoration context | `axial layer` |
| `charge frame` in fermion-decoration context | `axial frame` |
| `charge distribution` in fermion-decoration context | `axial distribution` or `axial pattern` |
| `charge tensor` in fermion-decoration context | `axial-distribution tensor` or `axial moment tensor` |

## Field-to-Wake Conversions

Prefer `wake` or `causal wake` over `field` when the subject is the architrino-native emitted structure itself.

Rationale:

- `field` is heavily loaded by QFT and continuum formulations and invites an ontology that $\mathbb{A}\mathbb{A}\mathbb{A}$ is not trying to import.
- `wake` is more descriptive of the AAA mechanism: the architrino precedes the emitted structure, leaves a causal residue behind it, and later interactions occur by wake interception.
- This keeps the causal order explicit: the architrino emits; the wake propagates; receivers later encounter that wake.

Use `field` only when one of the following is genuinely the topic:

- Standard Model or QFT comparison,
- effective continuum approximation,
- observer-level translation,
- established mathematical notation that is explicitly being bridged rather than endorsed as final ontology.

### Field-to-Wake Translation Table

| Current usage | Preferred direction |
| --- | --- |
| `field` when meaning emitted architrino influence | `wake` or `causal wake` |
| `field emitted by an architrino` | `wake emitted by an architrino` or `causal wake emitted by an architrino` |
| `field source` at the architrino level | `wake-emitting source`, `source architrino`, or `emitter` |
| `field shell` | `wake surface` or `causal isochron` |
| `field front` / `wavefront` in AAA substrate prose | `wake front` or `causal isochron` |
| `field self-interaction` in AAA substrate prose | `self-hit` or `self-interception of the wake` |
| `field line` in AAA substrate prose | `line of action` or `radial line of action` |
| `wake field` | `causal wake` if substrate-level; `effective field` if coarse-grained |
| `field speed` | `wake speed` or `causal-wake speed` when prose is being refreshed; keep symbol conventions stable where needed |
| `field configuration` in fermion/assembly ontology | `wake configuration`, `axial pattern`, or the more specific structural term actually meant |
| `field fluctuation` in substrate prose | `wake fluctuation` or `potential fluctuation`, depending on meaning |
| `field` in Standard Model or QFT comparison | keep `field`, but mark the discussion as comparative/effective |

Do not blanket-replace every use of `field`. Each sentence should be checked for level:

- If the sentence is AAA substrate ontology, move toward `wake`.
- If the sentence is effective or comparative, `field` may still be correct.
- If the sentence mixes both, rewrite it so the bridge is explicit rather than hybridized.

## Background-vs-Contents Guidance

The 3D ontological picture should distinguish clearly between the fixed container and what occupies it.

Recommended stack:

- `absolute time + Euclidean void` = the fixed ontological background
- `Noether Sea` = the ambient contents of that background
- `spacetime medium` = a neutral bridge term for those contents when translating toward effective spacetime language
- `spacetime` = emergent/effective geometry or observer-level description

### Preferred usage

- Use `Euclidean void` when the fixed 3D container itself is meant.
- Use `Noether Sea` when the ontological substrate population inside that container is meant.
- Use `spacetime medium` as a bridge term when prose needs to connect reader expectations about spacetime with the constitutive substrate, without yet forcing the full `Noether Sea` term.
- Use `background` carefully: in ontology-first prose, let it mean the fixed container, not the contents.

### Terms to watch

These phrases often need review because they blur container and contents:

- `the background is the Noether Sea`
- `space is the medium`
- `spacetime is filled with`
- `background medium` when it is unclear whether the void or the contents are meant

### Translation table

| Current usage | Preferred direction |
| --- | --- |
| `background` when meaning the fixed container | `Euclidean void`, `absolute background`, or `fixed background` |
| `background` when meaning the ambient substrate | `Noether Sea`, `ambient Noether Sea`, or `background contents` |
| `space is filled with ...` | `the Euclidean void is populated by ...` |
| `the background is the Noether Sea` | `the fixed background is the Euclidean void; its ambient contents are the Noether Sea` |
| `spacetime medium` used as ontology without clarification | keep only if presented as a bridge term; otherwise prefer `Noether Sea` or `Euclidean void` depending on meaning |
| `spacetime` when meaning the substrate contents | `Noether Sea` or `spacetime medium` depending on level |

## Decoration-Language Review

All remaining uses of `decoration`, `decorated`, and `fermion-decoration` should be audited across the corpus and locally rewritten where a more exact AAA term exists.

| Current usage | Preferred direction |
| --- | --- |
| `decoration` as a generic system label | `axial structure`, `axial layer`, or `axial organization` depending on context |
| `decorated` binary / assembly | `binary with a polar dyad`, `assembly with an axial layer`, or other explicit structural wording |
| `fermion-decoration` | `fermion axial structure`, `fermion axial organization`, or other exact axial/polar phrasing |

Do not blanket-replace these mechanically. Each sentence should be checked to determine whether it is really about site geometry, six-site organization, occupancy, frame orientation, inventory, or circulation.

## Preferred AAA Ontological Terms

When writing from the AAA ontology outward, prefer:

- `architrino`
- `electrino`
- `positrino`
- `polarity`
- `transceiver of potential`
- `axial architrino`
- `axial layer`
- `axial pattern`
- `axial inventory`
- `axial frame`
- `polar site`
- `polar dyad`

## Canonical Summary

Use `axial` for the six-unit system-level organization and `polar` for the local site geometry. The canonical terms are `axial architrino`, `polar site`, `polar dyad`, `axial layer`, `axial pattern`, `axial inventory`, and `axial frame`. Use `axial circulation` when discussing microscopic motion. Avoid vague `decoration` wording, `doublet`, `orbit`, and default `charge` wording except for historical or continuity contexts.

## Additional Terminology Opportunities From AAA Corpus Scan

The following review notes come from a close scan of the Markdown documents under `content/markdown/aaa`. These are not yet conversion rules in the same sense as the `personality` and `decoration` mappings above. They are priority candidates for further terminology consolidation, because they either:

- use multiple terms for nearly the same AAA concept,
- blur ontological AAA language with effective or Standard Model language,
- or risk confusion with established terminology from quantum mechanics, relativity, field theory, or higher ontology layers.

Completed families such as `field` to `wake`, background-vs-contents, and the main `Noether Sea` / `spacetime medium` policy are now documented in `content/markdown/aaa/archie/terminology-usage.md` and should no longer be treated as open queue items here.

The `particle` / `wave` / `assembly` / `wake` family is also now moving into canon: the preferred AAA response to standard `particle versus wave` language is `assembly and wake`. Use `particle` and `wave` for standard comparative framing when needed, but treat `assembly` and `wake` as the native ontological pair.

### 1. `spacetime` vs `void` vs `timespace`

This family is now moving into first-draft canon, but the corpus still needs a cleanup pass.

- Some chapters carefully distinguish `Euclidean void` and `absolute time` from emergent `spacetime`.
- Other chapters allow `spacetime` to drift back toward a fundamental substrate term.
- `timespace` also appears in some places and needs to be narrowed.

Recommended direction:

- Use `Euclidean void` and `absolute time` for the fundamental ontological backdrop when that is the intended meaning.
- Use `absolute timespace` only for the formal product background $\mathbb{R}\times\mathbb{R}^3$ when that full structure matters.
- Use `spacetime` for emergent, effective, geometric, relativistic, or observer-level structure.
- Avoid loose `timespace` usage; either make it `absolute timespace` in the formal sense or replace it with the more specific term actually meant.
- Avoid letting plain `spacetime` stand in for the ontological substrate unless the document explicitly says it is speaking at an emergent level.
- Keep the container/content distinction explicit: the `Euclidean void` is the fixed background, while the `Noether Sea` is what occupies that background.

Representative files:

- `content/markdown/aaa/quantum/reality-quantum-causality.md`
- `content/markdown/aaa/foundations/bootstrapping-the-absolute-frame.md`
- `content/markdown/aaa/foundations/ontology.md`

### 2. `nucleus` vs `core` vs `Noether core`

This is a high-value cleanup candidate because `nucleus` strongly collides with atomic and nuclear terminology.

- Some fermion-facing documents still say `nucleus` when they mean the central tri-binary scaffold.
- Elsewhere the same object is called the `core` or `Noether core`.
- In atomic and nuclear chapters, `nucleus` already has its standard meaning, so the overlap can be actively misleading.

Recommended direction:

- Prefer `Noether core` as the canonical technical term for the central tri-binary scaffold.
- Allow `core` as a local shortened form when the referent is already established.
- Avoid `nucleus` for the internal fermion scaffold except perhaps in historical or transition notes that explicitly map old wording to the new canon.

Representative files:

- `content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md`
- `content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md`
- `content/markdown/aaa/nuclear-atomic/nucleon-structure.md`

### 3. `orbit` / `orbital` / `circulation`

This one remains partially unresolved after the earlier axial-language conversion work.

- Some uses of `orbit` and `orbital` are legitimate because they refer to standard atomic orbitals or to genuinely orbit-like binary dynamics.
- Other uses appear to be older wording for nonclassical internal motion that is now better described as `axial circulation` or another explicit AAA dynamical term.
- The problem is not that `orbit` must vanish everywhere; the problem is that the same word is used for several different dynamical ideas.

Recommended direction:

- Keep `orbital` where the text is explicitly discussing standard atomic orbitals.
- Keep `orbit` where a literal orbit-like binary or geometric path is genuinely intended.
- Prefer `axial circulation` or another explicit AAA dynamical term when describing the nonclassical internal motion of the axial architecture.
- Review ambiguous phrases such as `orbit radius`, `nominal orbit`, or `path around the orbit` in foundational and quantum chapters.

Representative files:

- `content/markdown/aaa/quantum/reality-quantum-causality.md`
- `content/markdown/aaa/dynamics/effective-lagrangian.md`
- `content/markdown/aaa/foundations/ontology.md`

### 4. `shell` vs `layer`

This is a genuine overload family, though not every use needs correction.

- `layer` is often being used in a broad and acceptable way: observational layer, constitutive layer, interpretation layer, axial layer.
- `shell` appears in several distinct senses:
  - atomic shell,
  - shielding shell,
  - causal shell or shell geometry,
  - mathematical shell regularization,
  - closed-shell chemistry language.

Recommended direction:

- Do not blanket-convert `shell` to `layer`.
- Instead, define domain-sensitive usage:
  - keep `shell` for standard atomic or chemical shell language,
  - keep mathematical shell terminology where that is the established concept,
  - use `layer` for coarse-grained organizational or explanatory strata,
  - keep `axial layer` as the canonical six-site term.
- Review places where `shell` might be acting as vague structural wording rather than a real atomic, geometric, or mathematical term.

Representative files:

- `content/markdown/aaa/quantum/reality-quantum-causality.md`
- `content/markdown/aaa/spacetime/black-holes.md`
- `content/markdown/aaa/dynamics/master-equation.md`

### 5. Weak-sector local geometry terms

This cluster is smaller, but it still looks under-consolidated.

- `Weak-Coupling Triad` appears to be the intended canonical term.
- Nearby variants still appear, including `exposed triad`, `shielded triad`, and `weak-active triad`.
- Some of these may be useful secondary descriptors rather than errors, but their relationship to the canonical term is not yet crisply stated.

Recommended direction:

- Keep `Weak-Coupling Triad` as the canonical technical term if that remains the intended canon.
- Decide whether `exposed triad` and `shielded triad` are:
  - acceptable descriptive modifiers,
  - subordinate posture descriptions of the same triad,
  - or legacy terms that should be retired.
- Remove or convert `weak-active triad` if it no longer has a distinct canonical role.

Representative files:

- `content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md`
- `content/markdown/aaa/assemblies/fermions/weak-mixing-angle.md`
- `content/markdown/aaa/assemblies/fermions/quarks.md`

### 6. Lower-priority but worth watching: `spin` vs `helicity` vs `chirality`

This family looked more controlled than the others during the scan, so it is not the first conversion target.

- Much of the usage appears to be deliberate Standard Model comparison language.
- Even so, these terms sit close to AAA geometric language and can easily drift if the ontology/effective boundary is not explicit.

Recommended direction:

- Keep standard `spin`, `helicity`, and `chirality` language where the chapter is clearly doing comparison, translation, or phenomenology.
- Continue to avoid presenting those labels as primitive ontological properties of the architrino unless a chapter explicitly frames them as effective or emergent.

Representative files:

- `content/markdown/aaa/quantum/measurement-ontology.md`
- `content/markdown/aaa/quantum/entanglement-nonlocality.md`
- `content/markdown/aaa/foundations/ontology.md`

## Suggested Priority Order For Further Conversion

If a new terminology pass is scheduled, the most important order appears to be:

1. apply the `spacetime` / `void` / `absolute timespace` policy across the corpus
2. `nucleus` vs `core` vs `Noether core`
3. `orbit` / `orbital` / `circulation`
4. `shell` vs `layer`
5. weak-sector triad-family terms

These categories appear to offer the largest clarity gains while reducing the strongest terminology collisions with quantum mechanics, relativity, and higher-level ontological language.
