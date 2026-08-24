# Terminology Usage

This document preserves durable terminology guidance for $\mathbb{A}\mathbb{A}\mathbb{A}$ textbook-facing writing. Its purpose is not to track migration work, but to record canonical usage patterns, level distinctions, sentence-level examples, and the underlying rationale when a terminology choice protects the ontology from being blurred by inherited language. As terminology families stabilize, their durable guidance should live here and be removed from the open conversion queue.

Words are part of the theory machinery here. A good term tells the reader whether the sentence is naming substrate ontology, assembly behavior, effective recovery, historical source language, or standard comparison language. A loose term can move a claim across levels without anyone noticing.

Despite the filename, this document is not only a usage sheet in the narrow copyediting sense. It is also the place where the project records why certain terms are preferred, what level-boundary errors those preferences prevent, and how $\mathbb{A}\mathbb{A}\mathbb{A}$ native wording should relate to older Standard Model or relativistic vocabulary. In that sense it functions as a canon-and-rationale reference for terminology decisions that remain important after the immediate cleanup pass is over.

Use this document alongside [academic-style-guide.md](./academic-style-guide.md), [mathematics-style-guide.md](./mathematics-style-guide.md), [mathematics-terminology.md](./mathematics-terminology.md), and [comparative-glossary.md](./comparative-glossary.md).

## Canon Ownership and Precedence

The four references overlap by design but do not have equal ownership of the same question:

1. [Mathematics Style Guide](./mathematics-style-guide.md) owns formal equation construction, notation layers, TeX form, and mathematical presentation.
2. [Mathematical Terminology](./mathematics-terminology.md) owns canonical cross-chapter symbols and their sole meanings.
3. This document owns reader-facing term selection, level-qualified usage, and terminology rationale.
4. [Comparative Glossary](./comparative-glossary.md) is a translation aid between frameworks. It does not override native terminology or mathematical symbol canon.

When two references appear to conflict, apply the owner above and repair the non-owner. A chapter-local definition may specialize an unreserved symbol, but it may not silently redefine a canonical glyph or term.

## Core Principle

Choose terms by ontological level.

- Use substrate-native language when the subject is architrino ontology or causal microdynamics.
- Use effective or comparative language when the subject is observer-level closure, continuum approximation, or Standard Model comparison.
- Do not let terms drift across levels without saying so explicitly.

The recurring editorial task is not merely lexical replacement. It is ontological bookkeeping. A good terminology choice tells the reader which level is being described, what sort of thing is being claimed to exist, and which parts of older language are being retained only as a translation aid. A bad terminology choice can make an effective summary sound ontological, or make an ontological claim sound like inherited Standard Model shorthand.

A standing instance of this rule: the $\mathbb{A}\mathbb{A}\mathbb{A}$ primitive dynamical law is the **acceleration law** — architrinos carry no primitive mass, so `force law` never names the substrate law (see [Architrino](../foundations/architrino.md)). `Force law` remains correct at the observer/comparison layer and in historical prose: the effective Lorentz-force law as a recovery target, Newtonian and MOND-class comparison frameworks, and lists of emergent effective closures. Contrast sentences that deny substrate status should say "not a substrate-level law" rather than "not a substrate force law," which would imply the category exists.

## Canon Maintenance Rule

Treat terminology maintenance as a theory-protective cleanup discipline, not as a search for literary variation.

- Keep changes small, surgical, and level-aware.
- Use terminology cleanup to prevent category mistakes across ontology levels, not to add synonym churn.
- Once a terminology family is stable, place its durable rule in the Archie canon docs and remove it from transition notes or open cleanup queues.
- Keep canon docs positive-only and canonical; do not preserve retired $\mathbb{A}\mathbb{A}\mathbb{A}$ vocabulary for its own sake.
- When a sentence still blurs levels, rewrite it so ontology, effective bookkeeping, and comparative language are explicitly separated.
- Pay special attention to recurring confusion pairs such as `spacetime` versus `Euclidean void` / `absolute timespace`, and `shell` versus `layer`, because those often hide constitutive ambiguity rather than harmless style variation.

## Verification and Advancement Usage

Use verification language that separates policy, verification outcome, and advancement disposition. The terms below preserve the conservative behavior without making a temporary or input-dependent state sound permanent.

| When you mean... | Prefer | Usage |
| --- | --- | --- |
| a policy or process requires verification before an item may move forward | `Verification required for advancement` | Use only for the policy. Do not use it as an outcome or status. |
| a required verification completed and met its declared conditions | `Verification passed` | Name the completed check and its declared acceptance conditions when useful. |
| a required verification ran and did not meet its declared conditions | `Verification failed` | Name the check and its failure witness when available. |
| a required verification could not be completed because an input, inventory, evidence source, authority, or convergence condition is missing or unresolved | `Verification incomplete` | Name the missing or unresolved requirement and the exact place to inspect or rerun. |
| a verification does not apply to the item or claim under review | `Verification not applicable` | Name the scope reason; do not use this outcome merely because verification was skipped or unavailable. |
| the item moves forward or does not move forward | `Advanced` or `Not advanced` | State the disposition separately from the verification outcome. Use `Not advanced` as the umbrella disposition when the narrower cause is mixed, unknown, or not important to the sentence. |

Do not substitute `Verification failed` for a missing-input case. A checker may run successfully and correctly report that the subject's verification is incomplete. Conversely, do not call a completed tolerance miss or contradiction incomplete merely because the item can be revised and tried again. `Verification passed` does not by itself mean `Advanced`: other required verifications or advancement conditions may remain.

Sentence guidance:

- Prefer: "The required residual check ran. Verification failed at the declared tolerance, so the candidate was not advanced."
- Prefer: "Verification is incomplete because the retained root inventory is missing. The candidate was not advanced."
- Prefer: "Verification passed for the declared residual check, but the candidate was not advanced because the independent-reference check remains incomplete."
- Prefer: "Verification is not applicable to the display-only camera transform because it does not affect solver values or evidence."
- Prefer: "Verification is required for advancement: unresolved evidence cannot be promoted."
- Preserve machine-readable legacy values, external protocol strings, hashes, retained fixtures, and compatibility fields exactly when changing them would break a contract or invalidate provenance. Explain their current meaning at the nearest human-facing surface instead of silently relabeling the stored value.

## Ledger, Ledger Entry, and Record Usage

Use `ledger` for the $\mathbb{A}\mathbb{A}\mathbb{A}$ accounting structure that keeps related readouts, sources, carriers, and response terms tied together. A ledger is not just a data table; it is the named bookkeeping structure that lets the theory say which quantities belong to the same retained causal history or Noether sea response.

Use `ledger entry` for a specific channel inside that shared accounting structure. Bare, unqualified `row` is not reader-facing terminology. A qualified row term is acceptable only when the subject is literally a data, table, coefficient, support, or protocol row and the row structure matters. Otherwise name the entry, contribution, record, or channel directly.

`Record` and `ledger` are a ratified level distinction, not synonyms. Use `record` (specifically `path-history record`, `the record`) for the ontic history itself at the substrate level: the worldlines, polarities, and identities that constitute the complete state, including the causal-wake structure those worldlines fix. Use `ledger` for the accounting kept against that record: the bookkeeping structure of entries for energy, momentum, angular momentum, polarity count, and response terms whose balances are computed from the record. The record is ontology; the ledger is bookkeeping about it. Ledger entries are functionals of the record, not automatically independent contents carried by a wake; the substrate-level development of this distinction is [Information and the Wake](../philosophy-history/information-and-the-wake.md).

`Record` also remains correct for ordinary records: measurement records, historical records, stored files, log entries, or explicit record-forming events. Do not use `record` for the accounting structure itself; when the prose means a conserved or retained accounting structure, use `ledger`.

Sentence guidance:

- Prefer: "The balance lives in the wake record between emission and reception" (substrate ontic history).
- Prefer: "The clock, ruler, and envelope readouts belong to one ledger" (accounting).
- Prefer: "The density term belongs to the Noether sea continuity ledger."
- Prefer: "The proof packet records the failed route in the work log."
- Avoid: "The clock row closes the map." Name the clock entry, coefficient, or test instead.
- Avoid by default: "The retained record evolves" when the meaning is a retained ledger.

Related ratified terms from the conservation and information program:

- `geometric reach`: the set of receivers whose positions the isochrons of a given transmitter history have had time to arrive at; contact in this sense is universal within the reach set and diluted with distance, never cut off.
- `active roots`: the causal roots currently contributing legal hits with nonvanishing branch strength at a receiver event. A pair can be inside geometric reach yet have no active roots. Mechanism ownership stays with the Master Equation chapter.
- The four-tier taxonomy of conserved quantities, `counting invariants`, `record invariant`, `symmetry ledger entries`, and `conditional topological invariants`, is the canonical classification; see [Information and the Wake](../philosophy-history/information-and-the-wake.md) for the survey and the dynamics chapters for mechanisms.

## Architrino Architecture, AAA, and Disallowed Variants

Use `Architrino` as the public project, product, repository, and app identity. Use `Architrino Assembly Architecture` when the full theory name is needed.

For reader-facing prose, first establish the full name before using any shortened form. After that, prefer `the Architrino architecture` when clarity matters and `the architecture` only when the local antecedent is unambiguous. In formal textbook prose and math, follow [academic-style-guide.md](./academic-style-guide.md): use `$\mathbb{A}\mathbb{A}\mathbb{A}$` for the theory name rather than plain-text variants.

Plain `AAA` is allowed only where literal text brevity or interoperability is the point: compact app labels, search keys, code identifiers, file names, generated indices, or an explicit parenthetical abbreviation after the full name. Do not use `AAA` as the standalone public brand.

Do not use `A^3`, `A³`, `$A^3$`, or any A-cubed form anywhere in project prose, UI, artwork, icons, covers, title graphics, badges, URLs, email, social handles, search keys, citation labels, or code-like naming surfaces. These forms are disallowed variants: not shorthand, not math styling, and not optional visual marks. Use `Architrino`, `Architrino Assembly Architecture`, `AAA` only in the limited interoperability cases above, or `$\mathbb{A}\mathbb{A}\mathbb{A}$` in formal prose and math.

## Axial and Polar Usage

Use `axial` for the six-site system-level organization and `polar` for the local site geometry.

| When you mean... | Prefer | Avoid by default | Example |
| --- | --- | --- | --- |
| one of the six outward fermion constituents | `axial architrino` | `charge` | "The fermion contains six axial architrinos bound to polar sites." |
| the six-site organization as a whole | `axial layer` | vague six-site wording when the organized structure matters | "Weak bookkeeping is carried by the axial layer." |
| one local attachment location | `polar site` | generic `slot` when geometry matters | "Each axis contributes two polar sites." |
| the two local sites on one axis | `polar dyad` | generic pair-language when the site geometry matters | "A polar dyad may be occupied symmetrically or asymmetrically." |
| the six-site arrangement | `axial pattern` | vague `configuration` when six-site structure is meant | "Color and weak assignments depend on the axial pattern." |
| the count/composition across the six sites | `axial inventory` | generic `charges` | "The electron has an all-electrino axial inventory." |
| coarse-grained orientation of the six-site structure | `axial frame` | vague orientation wording when frame structure matters | "Weak mixing is phrased as axial-frame misalignment." |
| microscopic motion of the six-site structure | `axial circulation` | `axial orbit` | "Use axial circulation when the motion is internal and nonclassical." |

This distinction carries more than descriptive neatness. `Axial` names the organized six-site whole as a system with bookkeeping, orientation, and symmetry consequences. `Polar` names the local geometric seat or site. If those levels are blurred, the prose starts to slide between constituent placement and whole-assembly organization, and the reader loses track of whether a sentence is about local attachment geometry or about the electroweakly meaningful six-site arrangement.

## Charge, Polarity, and Architrino Usage

At the architrino level, the ontological term is not `charge`. The primitive is an `architrino` with definite `polarity`.

Capitalization rule: write `architrino`, `electrino`, and `positrino` in lowercase in ordinary prose, mathematical prose, table cells, captions, and non-title link text. Capitalize only at the beginning of a sentence or title, or when the word is part of an established proper name such as `Architrino Assembly Architecture`.

| When you mean... | Prefer | Keep `charge` only when... | Example |
| --- | --- | --- | --- |
| the basic entity | `architrino`, `electrino`, `positrino` | not applicable | "The architrino is a transceiver of potential." |
| the primitive sign carried by that entity | `polarity` | not applicable | "Like polarities repel; unlike polarities attract." |
| effective electric bookkeeping | `electric charge`, `charge`, $q=\pm\epsilon$ | comparison, bookkeeping, gauge language, or observer-level description | "The axial inventory yields net electric charge $-e$." |
| a fermion’s outward six-site contribution | `axial inventory`, `axial pattern`, `axial architrinos` | not applicable | "The quark’s axial inventory determines its electric bookkeeping." |

Polarity notation rule:

- Use full words, `electrino` and `positrino`, when naming the entity species.
- Use $\epsilon_+$ and $\epsilon_-$ when writing compact polarity inventories, axial-inventory counts, weak-coupling-triad inventories, or neutral Noether braid content.
- Prefer count expressions such as $5\epsilon_+ + 1\epsilon_-$ or $A_{\Sigma}=3\epsilon_-$.
- Avoid initial-letter polarity shorthand such as `6E`, `5P,1E`, `P/E`, `P+`, or `P-`. Those collide with electron/proton language, energy $E$, parity/probability/pressure $P$, and Standard Model notation.

Sentence guidance:

- Prefer: "The architrino has definite polarity."
- Prefer: "The assembly carries electric charge $Q$ at the effective level."
- Avoid by default: "The basic entities are charges."

The important reframing here is that `charge` is not being denied; it is being relocated. In $\mathbb{A}\mathbb{A}\mathbb{A}$, `charge` is a higher-level bookkeeping summary of a deeper polarity-bearing substrate. Keeping `polarity` for the primitive level prevents the reader from importing the point-charge ontology too early, while keeping `charge` for effective summaries preserves continuity with standard electrodynamic and particle-physics calculations.

## Pro/Anti Orientation and Polarity Conjugation

`Pro/anti` and polarity conjugation are independent binary labels. Do not use either one as a synonym for the other.

| When you mean... | Canonical term | Transformation rule |
| --- | --- | --- |
| the deformation-stable orientation of an indexed three-dimensional Noether braid frame | `pro-Noether braid orientation` / `anti-Noether braid orientation`; compactly `pro/anti orientation` | derive the sign from the indexed path or angular-momentum-frame record; $C$ leaves the orientation unchanged because it relabels polarity at fixed worldlines, while $P$ reverses the orientation |
| the same worldlines with every architrino polarity reversed | `polarity-conjugate braid`, `polarity-conjugate branch`, or $C(\mathfrak B)$ | $C$ exchanges the two polarity assignments; $P$ does not perform this exchange |
| a particle branch and its antiparticle branch | `matter branch` and `polarity-conjugate antimatter branch` when the matter assignment is established | the whole retained branch record and the charged-sector polarity inventory must transform together |
| the two products of a pair-production channel under the named hypothesis below | `pro-anti fermion pair` (hypothesis-attached shorthand) | polarity-conjugate and orientation-opposite — a $CP$-image pair under the [orientation-antimatter correspondence hypothesis](#orientation-antimatter-correspondence-hypothesis) |
| the proposed photon carrier after planarization | `coaxial contra-rotating polarity-conjugate planar pair` | the planar limit no longer carries the three-dimensional pro/anti ordering, but the relation between $\mathfrak B$ and $C(\mathfrak B)$ remains defined |

Do not call the $C$-image an `anti-braid`. That phrase collides with `anti-Noether braid orientation`, which is the orientation label. Do not infer matter/antimatter from pro/anti orientation alone, and do not attach opposite effective-charge entries to pro/anti orientation alone. The one sanctioned bridge between the two labels is the named hypothesis below, and prose that uses it must say so.

The two-label bookkeeping can be written explicitly. Let $o_{\mathrm{PA}}\in\{+1,-1\}$ denote the retained pro/anti orientation when that three-dimensional ordering exists, and let

$$
\chi_{\mathrm{pol}}
=
\operatorname{sign}(\mathbf p\cdot\mathbf S)
$$

denote the polarity-weighted handedness when the polarity dipole $\mathbf p$ is nonzero. Define the polarity-assignment sign on that chart by

$$
c_{\mathrm{pol}}
\equiv
\chi_{\mathrm{pol}}o_{\mathrm{PA}},
\qquad
\chi_{\mathrm{pol}}=o_{\mathrm{PA}}c_{\mathrm{pol}}.
$$

Then $C$ leaves $o_{\mathrm{PA}}$ fixed and reverses $c_{\mathrm{pol}}$; $P$ reverses $o_{\mathrm{PA}}$ and leaves $c_{\mathrm{pol}}$ fixed; both reverse $\chi_{\mathrm{pol}}$; and $CP$ preserves $\chi_{\mathrm{pol}}$. This factorization is definition-level symmetry bookkeeping on a chart where both signs exist. It is not a retained-branch theorem, and it does not manufacture either sign when the underlying orientation or dipole is absent.

At the planar limit, precession order ceases and $o_{\mathrm{PA}}$ is not assigned. Use the relational notation $\mathfrak B$ and $C(\mathfrak B)$ instead. Opposite circulation signs, effective-charge entries, and other photon-pair ledgers must be derived for those two member records; they must not be smuggled in by naming the pair `pro/anti`.

### Orientation-Antimatter Correspondence Hypothesis

One named working hypothesis connects the two labels. The `orientation-antimatter correspondence hypothesis` holds that matter fermion branches carry the pro-Noether braid orientation, antimatter branches carry the anti-Noether braid orientation, and pair production draws its two products from complementary pro/anti oriented carriers in the Noether sea — the explicitly typed two-braid source architecture of [Spontaneous Assembly and Pair Production](#spontaneous-assembly-and-pair-production). Under this hypothesis the two products of pair production are polarity-conjugate **and** orientation-opposite: $CP$-images of one another rather than bare $C$-images.

The two halves of that statement carry different grades. The polarity-conjugate half is the benchmarked half: the observer-level pair-production record — conjugate charge entries, equal masses, conserved lepton number — constrains exactly the $C$-image charged-sector ledgers. Standard physics carries no counterpart of $o_{\mathrm{PA}}$, so the orientation half is hypothesis, not recovery.

The hypothesis is discriminable. The $C$-image and $CP$-image relations differ in the handedness ledger — $C$ reverses $\chi_{\mathrm{pol}}$ while $CP$ preserves it — so the produced pair's relative polarity-weighted handedness, compared against weak-sector handedness benchmarks, is the discriminating observable. The discriminator lives on three-dimensional fermion products: $\chi_{\mathrm{pol}}$ degenerates in the planar limit, so photon-side records cannot decide it.

Usage license: pair-production prose may use `pro-anti fermion pair` as shorthand for this hypothesis-attached relation. At first use in a document, name or link this hypothesis so the underived half stays visible. Claim level: named hypothesis with a stated discriminator; not a retained-branch result.

## Site and Drift Usage

Two frequently used kinematic terms with canonical meanings (operator-ratified 2026-07-08).

| When you mean... | Prefer | Notes | Example |
| --- | --- | --- | --- |
| the instantaneous position an architrino occupies in an assembly configuration | `site` | every architrino is a transceiver, so its site can transmit and receive; compounds inherit this (`six-site`, `single-site self-hit`, `polar site`) | "The B1 record has six sites on its prescribed common-axis paths." |
| the point an arriving causal wake was born | `transmitter site at emission time $T_t$` | the delayed formalism evaluates the transmitter at the causal root's emission time, not at reception time | "The line of action runs from the transmitter site at $T_t$ to the receiver site at $T_r$." |
| uniform, unaccelerated translation of an assembly (or of the medium) relative to the void frame | `drift`, `drift speed` $u$ | drift deliberately connotes non-acceleration — uniform rotation plus drift is a screw motion; accelerated translation should be named as such, never called drift | "At drift $u$ the branch cadence is $\omega_0\sqrt{1-u^2/c_f^2}$." |

## Transmitter and Receiver Event Usage

Use `transmitter` for the architrino at the past emission event $T_t$ whose wake arrives at the event being evaluated. Use `receiver` for the architrino at the current reception event $T_r$ whose acceleration is being evaluated. The two labels name causal roles on one hit; a single architrino may occupy either role on different hits and occupies both roles on a self-hit.

The separation vector always runs from emission to reception:

$$
\mathbf r_t=\mathbf X_r(T_r)-\mathbf X_t(T_t).
$$

The corresponding factors are

$$
D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t),
\qquad
D_r=c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r),
$$

with exact root playback

$$
\frac{dT_t}{dT_r}=\frac{D_r}{D_t}.
$$

Use `transmitter-side factor` for $D_t$ and `receiver-side factor` for $D_r$. Use `root-playback derivative` for the signed ratio $D_r/D_t$. In the canonical acceleration law, use `transmitter-side acceleration weight` for $W^{\mathrm{acc}}=c_f/|D_t|$. Never describe $D_r/D_t$ as an acceleration weight.

Do not use the transmitter's position at $T_r$ as part of an arriving hit unless the sentence explicitly introduces a separate present-position diagnostic. Keep `source` where it has another established meaning, such as a document source, evidence source, software source, radiation source class, or generic source term in an equation.

## Field and Wake Usage

Use `wake` or `causal wake` for emitted substrate-level $\mathbb{A}\mathbb{A}\mathbb{A}$ structure. Reserve `field` for effective, continuum, or explicitly comparative discussion.

| When you mean... | Prefer | Keep `field` only when... | Example |
| --- | --- | --- | --- |
| emitted architrino influence | `wake`, `causal wake` | not applicable | "The architrino emits a causal wake that later intersects the receiver." |
| the emitted front/surface | `wake front`, `wake surface`, `causal isochron` | not applicable | "Self-hit occurs when the worldline re-enters its own wake surface." |
| line-of-force style substrate prose | `line of action` | not applicable | "The push is radial along the line of action." |
| coarse-grained continuum closure | `effective field` | continuum, observer-level, QFT-style bridge language | "At the effective level the wake superposition behaves like a field." |
| hybrid phrase `wake field` | `causal wake` or `effective field` | only if the sentence is rewritten to specify level | "Use `causal wake` for substrate prose and `effective field` for coarse-grained closure." |
| propagation-rate label | `wake speed` | symbol stability or established comparative notation | "The wake speed is denoted by $c_f$." |

Sentence guidance:

- Prefer: "The wake propagates at speed $c_f$."
- Prefer: "The coarse-grained wake behaves like an effective field."
- Avoid by default: "The field emitted by the architrino..." when pure substrate $\mathbb{A}\mathbb{A}\mathbb{A}$ prose is intended.

The mapping issue is subtle. `Field` in standard usage often behaves like an all-purpose carrier word for both ontology and mathematics. `Wake` is sharper because it keeps the emitted structure tied to causal history, source provenance, and later intersections. The field description is not thereby false; it is a closure or continuum summary of many wake contributions. Using `wake` at the substrate level therefore preserves the causal picture that $\mathbb{A}\mathbb{A}\mathbb{A}$ is trying to expose, instead of immediately compressing it into a solved continuum object.

## Background and Contents Usage

Keep the fixed 3D container distinct from what occupies it.

| When you mean... | Prefer | Avoid by default | Example |
| --- | --- | --- | --- |
| the fixed 3D container | `Euclidean void`, `fixed background`, `absolute background` | `background` used ambiguously | "The Euclidean void is the fixed spatial container." |
| what occupies that container | `Noether sea`, `ambient Noether sea`, `background contents` | `background` if it blurs container and contents | "The Noether sea occupies the Euclidean void." |
| a neutral explanatory bridge toward spacetime language | `spacetime medium` | using it as the primary ontological label | "The spacetime medium is a bridge term for the Noether sea in reader-facing prose." |
| emergent geometry or observer-level closure | `spacetime` | using `spacetime` as the fixed substrate | "Spacetime is emergent, not the ontological container." |

Sentence guidance:

- Prefer: "The fixed background is the Euclidean void; its ambient contents are the Noether sea."
- Prefer: "The Noether sea acts as the constitutive substrate within the void."
- Avoid by default: "The background is the Noether sea."
- Avoid by default: "Spacetime is filled with..." when the actual meaning is ontological substrate contents.

This separation matters because many inherited phrases silently fuse container and contents. Once that fusion happens, the prose begins to oscillate between talking about geometry, medium, and occupancy as though they were one object. $\mathbb{A}\mathbb{A}\mathbb{A}$ needs the split kept clean: the void is the fixed container, the Noether sea is what occupies it, and emergent spacetime is a downstream description reconstructed from how assemblies and wakes behave in that occupied background.

## Noether Sea, Vacuum, Aether, and Medium

These terms are not interchangeable.

| When you mean... | Prefer | Use with caution | Example |
| --- | --- | --- | --- |
| the ontological substrate contents | `Noether sea` | not applicable | "Clock rates depend on local Noether sea density." |
| a neutral transitional bridge term | `spacetime medium` | only as a bridge term, not as the primary ontology word | "The spacetime medium reproduces effective metric behavior." |
| a generic constitutive statement | `medium` | only if the referent is already clear | "The medium response modifies wake transport." |
| standard-physics historical or comparative language | `vacuum`, `aether` | only when the comparison is explicit | "In QFT terms this would be described as a vacuum effect." |

Sentence guidance:

- Prefer: "The Noether sea is the canonical ontological term."
- Prefer: Use `Noether sea` as the standalone canonical name, and use `Noether sea` as the compound modifier before another noun: `Noether sea density`, `Noether sea delay factor`.
- Capitalization rule: write `Noether sea` in ordinary prose and non-title link text. Reserve `Noether Sea` for title contexts such as headings, frontmatter titles, scene titles, generated TOC titles, and title-cased chapter names.
- Avoid: `Noether-Sea`. Do not hyphenate the canonical term in prose or titles.
- Prefer: "Use `spacetime medium` when easing the reader from effective spacetime language to constitutive substrate language."
- Avoid by default: "vacuum" as the native $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology term.
- Use analogy-heavy medium terms such as `superfluid` only when the local document supplies a concrete mathematical analogue: a defined order parameter, transport equation, quantized-vorticity analogue, critical-velocity criterion, two-fluid model, or comparable mechanism. Without that support, use neutral medium-response or transport language.

Each inherited alternative carries conceptual drag. `Vacuum` invites empty-space or ground-state associations; `aether` imports a historical debate that is not quite the same as the present ontology; `medium` is often too generic to do the constitutive work by itself. `Noether sea` is therefore valuable not because novelty is desirable, but because it is specific enough to name the ontological substrate contents without silently borrowing the wrong metaphysics from neighboring frameworks.

## Noether Braid Usage

Use `Noether braid` as the canonical reader-facing term for a neutral braided assembly scaffold. The base, Family-A, and Family-B inventories contain six architrinos in three neutral binaries; Family C contains twelve architrinos in six neutral binaries. The term names the retained top-level branch and its causal-return ledger before an exact family member or coordinate record has been certified.

| When you mean... | Prefer | Avoid by default | Example |
| --- | --- | --- | --- |
| the broad neutral braided-assembly class | `Noether braid` | legacy neutral-scaffold labels or treating one inventory size as universal | "The Noether braid supplies the neutral scaffold." |
| a Family-A or Family-B defining inventory | `six architrino worldlines in three neutral binaries` | `core orbitals` or an unspecified six-site inventory | "The B1 record declares six architrino worldlines in three neutral binaries." |
| a Family-C defining inventory | `twelve architrino worldlines in six neutral binaries` | `twelve-core`, `dual core`, or treating the two ordered index subsets as B1 components without declaring that constraint | "The C2 record declares twelve coaxial architrino worldlines in six neutral binaries." |
| six additional architrinos associated with a braid, with each site's polarity and position declared | `Accessory Configuration` | `payload`, `dressing`, an unspecified accessory count, or language that assumes the sites surround the braid | "The Accessory Configuration crosses the braid envelope in this record." |
| a proposed branch or branch family before all certificate ledgers close | `candidate braid` | treating the branch as retained or certified before the same-ledger evidence closes | "The iso-frequency braid remains a candidate braid until its phase, support, energy, and stability ledgers close." |
| a retained branch promoted through return-map, stability, alignment, and observer-export closure | `certified braid` | linear-operator status labels or using `retained branch` when Lorentz export and stability ledgers are still missing | "A certified braid must reproduce Lorentz clock and ruler deformation at observer export." |
| the base six-body case before an exact binary decomposition | `Noether braid` or `candidate braid`, according to evidence level | assigning a family member before its coordinate relations are present | "The candidate braid does not yet have a certified binary partition." |
| the common-midpoint, coincident-axis, common-frequency one-braid member | `B1` or `Family-B member B1` | old shape-based family aliases | "B1 has coincident binary axes and one common frequency." |
| the fully symmetric Family-A member | `A2` or `Family-A member A2` | a support-band name that hides the equal-coordinate conditions | "A2 has three cyclically equivalent binaries." |
| the zero-axial-offset Family-A member or one of its indexed frequency variants | `A1`, `A1.3`, or the exact applicable member ID | `inner/middle/outer` naming or an old shape-based family alias | "A1.3 has the indexed frequency ratio $f_1:f_2:f_3=4:2:1$ and $h_a=0$." |
| the general axial-decomposition Family-A member or one of its indexed variants | `A3`, `A3.3`, or the exact applicable member ID | treating nonzero endpoint-orbit-center offsets as A1 | "A3.3 has the indexed frequency ratio $f_1:f_2:f_3=4:2:1$." |
| a mathematically protected braid, link, or framing class | `protected braid class`, `linking class`, `framing class`, or the specific invariant | treating every Noether braid as already topologically protected | "A protected braid class is certified only after the assembly topological charge ledger closes." |

The word `braid` is chosen because the object is a collection of persistent worldline strands whose delayed histories remain coupled. It should not be overread. A Noether braid is not automatically a braid-group invariant, a knot invariant, or a proof of fermionic exchange behavior. Those are additional theorem targets. When a sentence needs that stronger claim, name the actual invariant, such as a linking number, a framed self-linking sign, flat phase-bundle holonomy, or the full assembly topological charge.

Durable symbols and internal runtime identifiers may still contain `NS`, `noether_braid`, or `nested-shell-braid`. Treat those strings as stable implementation identifiers, not as preferred prose or source-title guidance. Do not invent alternate non-braid aliases unless a later canon decision explicitly changes the taxonomy.

## Oblate Spheroidal Envelope, Spheroid, and Ellipsoid

Use `oblate spheroidal envelope` for the Noether braid boundary when the text is naming the project geometry precisely. Use `oblate spheroidal exclusion envelope` when exclusion, packing, or overlap is the active point. After a local paragraph has established that object, `spheroid` or `oblate spheroid` may be used as a short ordinary-geometry phrase, but the full project term should anchor the passage first.

| When you mean... | Prefer | Use with caution | Example |
| --- | --- | --- | --- |
| the Noether braid boundary with two equal transverse axes and one contraction axis | `oblate spheroidal envelope` | `spheroid` only after the full term is established | "The app displays an oblate spheroidal envelope with $\xi=R_{\parallel}/R_{\perp}$." |
| the same geometry as an exclusion or packing boundary | `oblate spheroidal exclusion envelope` | generic `surface` if it hides the exclusion role | "Packing calculations use the oblate spheroidal exclusion envelope." |
| ordinary geometry shorthand inside a local derivation | `oblate spheroid` | `spheroid` without context | "The oblate spheroid has semiaxes $(R_{\perp},R_{\perp},R_{\parallel})$." |
| a generic quadric or comparison class | `ellipsoid` | only when the geometry is generic, triaxial, or comparative | "Maclaurin spheroids and Jacobi ellipsoids belong to the broader ellipsoid comparison family." |
| Lorentz-linked Noether braid display geometry | `oblate spheroidal envelope` with the Lorentz axis ratio stated separately | `Lorentz spheroid`, `Lorentz-spheroid` | "The Lorentz lesson displays an oblate spheroidal envelope whose zero-extra-scale target is $\xi=1/\gamma$." |

The reason for the distinction is mathematical as well as stylistic. `Ellipsoid` is a broad class and can suggest three independent semiaxes. The Noether braid Lorentz lesson uses an axisymmetric oblate spheroid: two equal transverse semiaxes and one shortened longitudinal semiaxis. The Lorentz content is not in the name of the surface; it is in the closure target that relates the axis ratio to $\gamma$. Keep that burden explicit by writing the geometry term and the Lorentz law as separate claims.

## Spacetime, Void, and Timespace

Use `spacetime` for emergent/effective structure, not as the default name for the substrate.

The preferred $\mathbb{A}\mathbb{A}\mathbb{A}$ stack is:

- `Euclidean void` for the fixed 3D spatial container
- `absolute time` for the universal temporal parameter
- `absolute timespace` for the formal product background $\mathbb{R}\times\mathbb{R}^3$
- `Noether sea` for the ambient substrate contents within that background
- `spacetime medium` only as a bridge term toward effective spacetime language
- `spacetime` for emergent relativistic or observer-level geometry

The critical discipline is that `spacetime` should not silently absorb the ontology. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the ontological backdrop is not a curved four-dimensional spacetime manifold. The void and absolute time are fundamental; effective spacetime is a downstream description of how assemblies and wakes propagate through the Noether sea.

| When you mean... | Prefer | Avoid by default | Example |
| --- | --- | --- | --- |
| fixed ontological container | `Euclidean void` | plain `spacetime` | "The Euclidean void does not curve." |
| global product background as a formal ontology term | `absolute timespace` | bare `timespace`, vague `spacetime` in ontology-first prose | "Absolute timespace is $\mathbb{R}\times\mathbb{R}^3$." |
| the ambient contents of that background | `Noether sea` | `spacetime` when the contents are meant directly | "The Noether sea occupies the Euclidean void within absolute timespace." |
| a bridge from ontology to relativistic reader language | `spacetime medium` | using it as the primary ontological term | "The spacetime medium is a bridge term for reader-facing translation." |
| emergent relativistic geometry | `spacetime`, `effective metric`, `effective geometry` | not applicable | "Spacetime curvature is an emergent refractive effect." |

Sentence guidance:

- Prefer: "The Euclidean void is the fixed spatial container."
- Prefer: "Absolute timespace is the formal product of absolute time and the Euclidean void."
- Prefer: "Spacetime is an emergent effective geometry, not the ontological background."
- Prefer: "The Noether sea occupies the void; it is not identical with the void."
- Avoid by default: "Spacetime is the fundamental container."
- Avoid by default: "Timespace" as a loose synonym for everything from container to contents to effective geometry.

Usage examples:

| Instead of... | Prefer... | Why |
| --- | --- | --- |
| "Spacetime is filled with Noether braids." | "The Euclidean void is populated by Noether braids." | The sentence is about contents occupying the fixed container, not about emergent geometry. |
| "Spacetime contains the Noether sea." | "The Noether sea occupies the Euclidean void." | `Spacetime` should not stand in for the ontological background here. |
| "Timespace bends around matter." | "Effective spacetime curvature appears around matter-rich regions." | The claim is observer-level and geometric, not about the fixed substrate. |
| "The timespace medium slows clocks." | "The Noether sea slows physical clocks." | The sentence is about substrate contents, not the formal product background. |
| "Spacetime is the absolute background." | "Absolute time and the Euclidean void form the fixed background." | Splits the temporal and spatial factors cleanly instead of importing relativistic wording. |
| "Timespace is filled with a dense medium." | "Absolute timespace contains a Euclidean void populated by the Noether sea." | Use `absolute timespace` only when the full product structure matters, then name the contents separately. |
| "The medium is spacetime itself." | "The spacetime medium is a bridge term for the Noether sea." | Keeps the bridge term from becoming the ontology. |
| "Spacetime expands as the medium evolves." | "Effective spacetime expansion summarizes evolving Noether sea structure." | Marks the level shift from constitutive substrate to effective description. |
| "Matter curves the void." | "Matter changes Noether sea density and stress, producing an emergent effective metric." | The void stays fixed; the response belongs to the contents and the effective geometry. |
| "Timespace redshifts the photon." | "Redshift reflects Noether sea evolution and clock-rate comparison across the path." | Replaces vague background-language with the specific constitutive mechanism. |

Bridge examples:

- Good bridge sentence: "For reader-facing translation, one may say that the spacetime medium acquires an effective metric response, but the underlying ontology remains absolute time, Euclidean void, and Noether sea contents."
- Good formal sentence: "Absolute timespace is the product background $\mathbb{R}\times\mathbb{R}^3$, while relativistic spacetime is an effective geometry reconstructed from assembly and wake dynamics."
- Good ontological sentence: "The Euclidean void does not expand; what evolves is the Noether sea within it."
- Bad mixed-level sentence: "Spacetime, the medium, and the background are all the same thing."

Editorial rule:

- Use `absolute timespace` when a chapter truly needs the formal product-manifold label.
- Use `Euclidean void` and `absolute time` when the prose is naming the substrate concretely.
- Use plain `spacetime` only when the sentence is deliberately operating at the emergent, relativistic, or observer-level description.

The deeper mapping discipline is that effective relativity language should remain available without being allowed to swallow the ontology. In other words, $\mathbb{A}\mathbb{A}\mathbb{A}$ does not need to ban `spacetime`; it needs to stop `spacetime` from becoming a covert name for every layer of the theory at once. The terminology stack above is how that discipline is maintained in prose.

## Particle, Wave, Assembly, and Wake

The standard quantum phrase `particle versus wave` should be treated as a description of a limit or paradox inside the standard mathematical formalism, not as the native $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

The preferred $\mathbb{A}\mathbb{A}\mathbb{A}$ response is `assembly and wake`.

- `assembly` names the localized ontological object: an architrino or a bound hierarchy of architrinos with definite geometry, inventory, stability conditions, and interaction channels.
- `wake` names the distributed causal structure emitted by those architrinos or assemblies: the potential-bearing residue that propagates outward, overlaps, interferes, and later contributes to received interactions.
- The point of the `and` is that the two are not rival identities of one thing. The assembly is the source-organized object; the wake is its emitted causal structure.
- In $\mathbb{A}\mathbb{A}\mathbb{A}$, interference, diffraction, phase accumulation, and nonlocal-looking transport belong primarily to wake behavior, while localization, counting, detection records, and bound-state identity belong primarily to assembly behavior.

This yields a cleaner translation rule:

| When standard prose says... | $\mathbb{A}\mathbb{A}\mathbb{A}$ clarification |
| --- | --- |
| `particle` | usually an `assembly` viewed at the observer or phenomenological level |
| `wave` | usually a `wake`, `causal wake`, or effective wake superposition |
| `particle-wave duality` | an effective observational tension that $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterprets as `assembly and wake` |
| `wave-particle paradox` | not a native $\mathbb{A}\mathbb{A}\mathbb{A}$ paradox; it marks a limit of the standard formal split between localized entity and distributed propagation |

Use `particle` when doing Standard Model comparison, detector language, cross-section language, or historical discussion of quantum mechanics. Use `assembly` when stating $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology directly.

Use `wave` when discussing standard QM language, experimental narratives, or intentionally effective descriptions. Use `wake` when naming the emitted substrate-level causal structure in $\mathbb{A}\mathbb{A}\mathbb{A}$.

### Wake Equation, Map, Pattern, and Spectrum

Use `wake equation` for the $\mathbb{A}\mathbb{A}\mathbb{A}$-native source-history construction that superposes the causal wakes emitted by the constituent architrinos in a declared source record. The wake equation is a construction rule, not the structure it produces. For a fixed source record and analysis protocol, the evaluated scalar over $(T,\mathbf X)$ is the `wake map`; its spatial or temporal structure is the `wake pattern`; and a frequency or angular-mode decomposition is the `wake spectrum`.

This distinction keeps two nearby equations separate. The `Master Equation` is the acceleration law: it maps received causal-root hits to the acceleration of a receiving architrino. A standard or effective `wave equation` is a continuum comparison or recovery equation. Neither term is a synonym for `wake equation`. Likewise, an `assembly wake` is shorthand for the superposition of the constituent architrino wakes; the assembly is not treated as one transmitter.

| When you mean... | Prefer | Avoid by default |
| --- | --- | --- |
| the native source-history construction of a superposed causal wake | `wake equation` | `wave equation` |
| the evaluated scalar for one declared source record and protocol | `wake map` | `wake equation` when the result rather than the rule is meant |
| the visible spatial or temporal structure of that map | `wake pattern` | `wave pattern` in substrate-level prose |
| its frequency or angular-mode decomposition | `wake spectrum` | `wave spectrum` in substrate-level prose |
| the received-hit acceleration law | `Master Equation` | `wake equation` |
| a genuine continuum or quantum recovery equation | `wave equation`, qualified by level | `wake equation` |

Sentence guidance:

- Prefer: "The observed particle is an assembly in $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology."
- Prefer: "The interference pattern is produced by wake structure, not by an ontic particle-wave ambiguity."
- Prefer: "$\mathbb{A}\mathbb{A}\mathbb{A}$ responds to particle-versus-wave language with assembly and wake."
- Avoid by default: "The assembly is sometimes a particle and sometimes a wave."

This is not a mere relabeling of the old paradox. The explanatory burden is being repartitioned. Localization, counting, and stable identity are assigned to assembly structure, while distributed propagation, phase transport, and interference are assigned to wake structure. The gain is that the reader is no longer asked to imagine one ontic thing flipping between incompatible metaphors. Instead, the theory says that two coupled but distinct aspects of one causal process were previously being compressed into the same vocabulary.

## Noether Braid and Assembly Usage

Use `Noether braid` for one complete braid record. A base, Family-A, or Family-B record has six architrinos; a Family-C record has twelve worldlines in one top-level record. Use `particle` mainly at the effective or comparative level.

| When you mean... | Prefer | Avoid by default | Example |
| --- | --- | --- | --- |
| one complete neutral braid record | `Noether braid`, with its family or worldline count when needed | language that silently assumes every family has six worldlines | "The axial layer is bound to the six-worldline fermion Noether braid." |
| $\mathbb{A}\mathbb{A}\mathbb{A}$ compositional object | `assembly` | `particle` as default ontology word | "The assembly remains stable under delayed feedback." |
| Standard Model or observer-facing language | `particle` | not applicable | "The particle is observed as electrically neutral." |

This distinction prevents a common scale-collapse in exposition. In fermion prose, the six-worldline Noether braid is one structural component inside a larger assembly; it is not the whole object. Meanwhile `particle` remains useful for experimental, asymptotic, and Standard Model-facing prose. Keeping these nouns separated lets the text move between internal architecture and observer-level phenomenology without silently conflating scaffold, whole assembly, and measurement label.

## Spontaneous Assembly and Pair Production

Use `spontaneous assembly` when the prose needs to name an auxiliary assembly that appears through a causal channel without being one of the explicitly supplied boundary assemblies.

This term is important because $\mathbb{A}\mathbb{A}\mathbb{A}$ should not borrow the Standard Model habit of making such events sound either magical or ontologically empty. A spontaneous assembly is still an ordinary assembly. `Spontaneous` names how it enters the channel at the level of the description: the assembly was not listed as an explicit incoming boundary assembly, but it still appears through a causal local process.

This wording is especially useful in pair-production prose. Standard quantum language often says that a strong field or unstable vacuum can produce a particle-antiparticle pair "spontaneously." In $\mathbb{A}\mathbb{A}\mathbb{A}$, that should be recast as spontaneous assembly production from a causal local source architecture rather than as uncaused emergence from nothing.

Represent the local source architecture as an explicitly declared assembly of two complete Noether-braid records. For a two-braid assembly, use the typed relation record

$$
\mathcal P_2
=
\left(
\mathfrak B_1,\mathfrak B_2;
\mathcal L_{\mathrm{pair}},
R_C,
R_o,
R_{\omega},
R_{\mathrm{axis}},
R_{\mathrm{plane}}
\right),
$$

where $\mathcal L_{\mathrm{pair}}$ identifies the common assembly ledger; $R_C$ declares the polarity-conjugation relation; $R_o$ declares the pro/anti-orientation relation when that orientation exists; $R_{\omega}$ declares relative circulation; $R_{\mathrm{axis}}$ declares the axis relation; and $R_{\mathrm{plane}}$ declares planarity. An omitted row is unknown, not false. This is a relation record, not a new braid family or particle species.

Do not use `Noether Pair` as a canonical ontology term because the name does not say which of these relations is intended. Use `assembly of two Noether braids` when only multiplicity is known, `pro/anti-orientation Noether-braid composite` when $R_o$ alone is the defining relation, and `a braid and its polarity-conjugate braid` when $R_C$ is the defining relation. Use a Family-C identifier only for one shared twelve-worldline top-level record satisfying the applicable Family-C chart; do not infer Family C from two separate six-worldline records. Likewise, do not call the assembly a photon unless the photon-specific planarity, polarity-conjugation, circulation, propagation, helicity, and binding conditions are all declared.

For spontaneous pro-anti fermion pair production, the source record declares both the polarity-conjugate and opposite-orientation relations. The `pro-anti` label invokes the [orientation-antimatter correspondence hypothesis](#orientation-antimatter-correspondence-hypothesis): $R_C$ is the benchmarked half, while opposite $R_o$ values inherited from complementary sea carriers are the hypothesis half. When the local energy and bookkeeping conditions are right, this typed two-braid source can furnish the spontaneous assemblies needed for the channel. The event may look spontaneous at observer level because no incoming particle directly triggers it, but the ontology remains causal: the local two-braid state, ambient medium conditions, and energy transfer open the channel.

| When you mean... | Prefer | Avoid by default | Example |
| --- | --- | --- | --- |
| an auxiliary assembly entering a channel without being listed as a primary boundary input | `spontaneous assembly` | `support assembly` when the quantum-production linkage matters | "The beta-family law admits two spontaneous assemblies of Noether braid type." |
| a particle-antiparticle creation event described in $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology | `spontaneous assembly-pair production`, `spontaneous pro-anti fermion pair production` (the `pro-anti` label invokes the [orientation-antimatter correspondence hypothesis](#orientation-antimatter-correspondence-hypothesis)) | bare `vacuum fluctuation` language as ontology | "A typed two-braid source can open a spontaneous pro-anti fermion pair-production channel when sufficient energy is supplied." |
| an observer-level description that keeps the trigger unresolved but not uncaused | `spontaneous` plus explicit causal qualification | wording that implies acausal creation from nothing | "The pair appears spontaneous at observer level, but the local two-braid source assembly supplies the neutral architecture." |

## Association and Dissociation in Reactions

In $\mathbb{A}\mathbb{A}\mathbb{A}$-first reaction prose, do not use `decay` as the native verb for an assembly event. Use `associate` for the formation or docking of a reaction-built sub-assembly, and use `dissociate` for the breakup, release, or channel exit of that assembly.

This rule is specifically about assembly events and reaction narration. It does not ban every use of the English word `decay`.

The deeper reason is ontological, not merely stylistic. `Decay` is a poor explanatory verb for $\mathbb{A}\mathbb{A}\mathbb{A}$ because it suppresses the very questions the theory is trying to keep visible: what sub-assemblies formed, what sub-assemblies broke apart, what shielding changed, what corridor associated, what corridor dissociated, and how provenance was preserved. In other words, `decay` tends to package a structured reaction into an opaque one-word outcome label.

This is why repeated use of Standard Model `decay` language can mislead even when the underlying mathematics is not in question. The issue is not that mainstream physics lacks calculational structure for those channels. The issue is that `decay` carries a weak ontological picture. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the stronger explanatory task is to identify the assembly process: association, dissociation, reconfiguration, shielding gain, shielding loss, corridor formation, corridor release, or some other specific channel.

For that reason, the project should not solve the problem by constantly repeating `decay` and then adding parenthetical apologies. The cleaner discipline is to make `decay` non-default everywhere in $\mathbb{A}\mathbb{A}\mathbb{A}$ prose. Native wording should carry the explanation. Legacy wording should be quarantined as a comparison label only when needed for interoperability with standard literature.

The practical mapping rule is therefore:

- `reaction` is the default replacement when a sentence names a channel but does not yet specify the mechanism in detail.
- `associate` and `dissociate` are the preferred mechanistic verbs when the sentence is about the formation or breakup of assemblies or sub-assemblies.
- `reconfigure`, `convert`, `relax`, `shielding-gain transition`, and `shielding-loss transition` remain available when they are the sharper mechanism.
- `decay` should appear only as a quoted or explicitly marked legacy label, for example at first mention of a Standard Model channel name.

This policy also reveals an important mapping fact between ontologies: many processes that standard language groups under `decay` are not one kind of thing in $\mathbb{A}\mathbb{A}\mathbb{A}$. Some are dissociations of unstable assemblies. Some are associations of new shielding layers or new binaries. Some are corridor-mediated reconfigurations. Some are mixed association-dissociation events. Treating them all as `decay` hides those distinctions precisely where $\mathbb{A}\mathbb{A}\mathbb{A}$ most needs them.

`Reaction` also needs to stay broader than collision language. In $\mathbb{A}\mathbb{A}\mathbb{A}$, a reaction is a channel event, not necessarily a visibly two-body encounter. A reaction may involve multiple incoming assemblies, medium-mediated forcing, or a single assembly reaching instability while unresolved ambient path-history and a local potential pulse together open a dissociation channel. For that reason, `reaction` is the right umbrella term even when the event looks spontaneous at observer level.

This point is worth stating explicitly because the ontology is causal, not magical. A "spontaneous" reaction in $\mathbb{A}\mathbb{A}\mathbb{A}$ does not mean uncaused. It means that the relevant micro-causal trigger was not operationally resolved in the sentence, model, or experiment. If an assembly reaches an edge orbit or instability threshold at the same moment that a potential pulse ripples through and the assembly dissociates, that is still a reaction. The word `reaction` names the channel event. The sharper follow-up question is then whether the channel is best described as dissociation, association, reconfiguration, shielding loss, or some more specific mechanism.

| When you mean... | Prefer | Keep other wording only when... | Example |
| --- | --- | --- | --- |
| a reaction channel in general, when mechanism detail is not yet being foregrounded | `reaction` | not applicable | "The charged-current reaction connects the heavy and light assembly channels." |
| an apparently spontaneous threshold event affecting one assembly | `reaction`, `spontaneous reaction` | the sentence needs to emphasize that the trigger is unresolved at observer level rather than absent in ontology | "The excited assembly undergoes a spontaneous reaction when a threshold pulse opens a dissociation corridor." |
| a transient sub-assembly or corridor forming during a reaction | `associate`, `association` | not applicable | "A charged corridor associates during the weak interaction." |
| a transient or unstable assembly breaking apart into other assemblies or released channels | `dissociate`, `dissociation` | not applicable | "The meson dissociates into lighter assemblies." |
| a stable relation, equilibrium hold, or energy term | `bind`, `binding`, `bound state` | the sentence is about sustained structure, binding energy, or equilibrium rather than the reaction event itself | "The axial layer is bound to the Noether braid." |
| a Standard Model comparative label or fixed historical name | quoted legacy label plus native replacement, for example `beta reaction` (SM label: `beta decay`) | the sentence is explicitly introducing a mainstream canonical label or quoting a source | "At first mention, write `beta reaction` (SM label: `beta decay`)." |
| a non-assembly quantity such as trajectory loss, amplitude falloff, or a measured rate label | `orbital decay`, `geometric decay`, `decay rate` | the sentence is not using `decay` as an ontological event verb for assemblies | "The observed orbital decay constrains extra drag." |

Sentence guidance:

- Prefer: "During the reaction, a transient corridor associates and then dissociates after charge transfer."
- Prefer: "The unstable assembly dissociates into a lighter assembly and emitted byproducts."
- Prefer: "During nucleosynthesis, proton and neutron assemblies associate into light nuclei."
- Prefer: "The top-to-bottom weak reaction proceeds through corridor association and later dissociation."
- Prefer: "The unstable assembly undergoes a spontaneous reaction when an ambient pulse opens a dissociation path."
- Prefer: "The event appears spontaneous at observer level, but in $\mathbb{A}\mathbb{A}\mathbb{A}$ it is still a causal reaction driven by local threshold conditions and path history."
- Prefer at first mention: "`beta reaction` (SM label: `beta decay`)."
- Avoid by default: "The assembly decays..." when the prose is stating $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology directly.

Editorial boundary:

- Keep `decay` for mathematical or continuum phrases such as `orbital decay`, `geometric decay`, `exponentially decaying amplitude`, or `decaying equation of state`.
- Do not use generic Standard Model `decay` wording as running prose in $\mathbb{A}\mathbb{A}\mathbb{A}$ chapters. Replace it with `reaction` unless a sharper mechanism term is ready.
- Keep `decay` only when the text is naming a fixed historical or canonical label from standard literature, and translate it immediately into native $\mathbb{A}\mathbb{A}\mathbb{A}$ wording.
- Rewrite `decay` to `dissociate` when the sentence is explaining what an assembly physically does in $\mathbb{A}\mathbb{A}\mathbb{A}$.
- Rewrite reaction-built `assembled`, `capture`, `regrowth`, `re-binding`, or similar event language to `associate` when the point is the formation of a transient or newly stabilized sub-assembly.
- Do not let `reaction` shrink into collision-only language. A reaction may be multi-assembly, medium-mediated, or apparently spontaneous when a single assembly crosses a threshold under unresolved local driving.
- When in doubt, ask: is this sentence naming a Standard Model label, or is it trying to explain the actual $\mathbb{A}\mathbb{A}\mathbb{A}$ process? If it is explaining the process, do not use `decay`.

## Orbit, Circulation, Shell, and Layer Usage

These pairs are context-sensitive and should not be flattened.

| When you mean... | Prefer | Avoid by default | Example |
| --- | --- | --- | --- |
| standard atomic orbitals or genuinely orbit-like binary motion | `orbit`, `orbital` | not applicable | "Atomic orbitals remain standard observer-level language." |
| nonclassical internal axial motion | `axial circulation` | `orbit` if it suggests a classical trajectory | "The weak bookkeeping depends on axial circulation, not a classical orbit." |
| atomic, chemical, or mathematical shell language | `shell` | forced conversion to `layer` | "Electron shell language remains standard in chemistry contexts." |
| organizational or constitutive strata | `layer` | vague `shell` | "The axial layer is the six-site organization." |

These choices are partly about metaphor control. `Orbit` and `shell` bring with them strong visual and classical intuitions. Sometimes that is appropriate and should be preserved. Sometimes it quietly smuggles the wrong geometry into a nonclassical internal structure. The goal is therefore not blanket purification, but disciplined use: keep inherited terms when they genuinely match the level and mechanism, and switch to `circulation` or `layer` when the text needs to stop the reader from over-literalizing the picture.

## Weak-Sector Local Geometry

Use `weak-coupling triad` as the canonical technical term and the only base term for the three-site weak-coupling geometry.

If a sentence needs to describe coupling posture, keep `weak-coupling triad` as the noun and write the posture around it, for example:

- "the weak-coupling triad is exposed to the Noether sea"
- "the weak-coupling triad is rotated into the wake"
- "the complementary three polar sites carry the remaining bookkeeping"

The reason to keep one stable base noun here is that weak-sector prose can otherwise become too improvisational. Once multiple near-synonyms begin circulating, the reader can no longer tell whether a new phrase signals a new mechanism or merely a stylistic variation. `Weak-coupling triad` fixes the geometry as the noun, while posture, exposure, and orientation are added explicitly in the sentence around it.

## Assembled Intelligence Usage

Use `Assembled Intelligence` as the corpus expansion of the initialism `AI`. Do not expand `AI` as `artificial intelligence` in corpus prose. The term `artificial` misclassifies the referent, and the assembly framing is the accurate one: in $\mathbb{A}\mathbb{A}\mathbb{A}$, every intelligence, human or machine, is an assembly-level phenomenon. `Assembled Intelligence` therefore unifies the two cases rather than segregating them; the difference between them is architecture, not essence.

Usage rules:

- The initialism `AI` remains valid everywhere and needs no change.
- On the first standalone spelled-out use in a document, write `AI (Assembled Intelligence)` or `Assembled Intelligence (AI)`.
- Capitalize `Assembled Intelligence` when introducing the expansion; generic lowercase `assembled intelligence` is acceptable in running prose.
- Titles of external works, direct quotations, and proper names of external fields, programs, or organizations keep their original wording.
- `artificial intelligence`, `machine intelligence`, and `synthetic intelligence` are not corpus terms; outside the quotation and title exception, normalize them to `Assembled Intelligence` or `AI`.

## Editorial Rule of Thumb

When a sentence feels ambiguous, ask three questions:

1. Is this substrate ontology, effective closure, or Standard Model comparison?
2. Am I naming the container, the contents, or the emergent geometry?
3. Am I naming a specific structure, or am I using a vague inherited label?

If the answer is unclear, rewrite the sentence so the level and referent are explicit.

One practical test is to ask what misunderstanding the sentence would invite if a Standard Model-trained reader encountered it cold. If the likely misunderstanding changes what the reader thinks exists, what carries causation, or what level a quantity belongs to, the terminology is not yet sharp enough.
