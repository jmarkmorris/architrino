# Source-Density Master Equation Impact Inventory

## Status

- Purpose: classify the current receiver-weighted dependency surface before any canon, code, schema, evidence, or terminology migration
- Method: fixed-string search followed by semantic inspection of the acceleration and root-transport paths
- Standing: initial promotion inventory; read-only findings with respect to every listed target
- Snapshot date: 2026-07-19
- Result: 110 documentation and priority files plus 35 code, script, and test files contain receiver-normal terminology or symbols under the searched roots

## Finding in plain language

The receiver normal cannot simply be deleted. It has two different jobs in the current system:

1. it is incorrectly used as part of base acceleration strength;
2. it is correctly used in the root-transport identity $dT_t/dT_r=D_r/D_t$.

Promotion must remove only the first job. A mechanical replacement would damage root continuation, historical evidence, schemas, and independent checking instruments.

Claim classification: **measured inventory plus derived semantic split**. The file counts are reproducible with the searches recorded below; individual dispositions remain subject to the full file-by-file migration review.

## 1. Documentation and priority surface

The first search found 110 files:

| Class | Files | Initial disposition |
| --- | ---: | --- |
| Archie guides and controlled terminology | 5 | discussion-controlled canon update after terminology definitions are frozen |
| dynamics canon | 5 | required mathematical rewrite after promotion; rederive rather than relabel |
| validation canon | 20 | review every accepted condition; retire receiver-strength requirements and preserve root-transport requirements |
| other reader-facing canon | 34 | semantic review for inherited law statements and downstream implications |
| priority analyses | 15 | preserve historical claims; add current disposition rather than rewriting past results |
| active priority contracts and workstream documents | 14 | version or replace contracts whose acceptance condition consumes receiver-weighted acceleration |
| frozen evidence | 8 | never rewrite; classify as unaffected geometry evidence, diagnostic-only evidence, or invalidated old-law evidence |
| EOM solver files reached by the documentation search | 2 | inspect with the machine-semantic inventory below |
| scripts and foundational-impact contracts | 3 | replace old-law enforcement only after an independent new-law acceptance path exists |
| JavaScript runtime tests | 4 | distinguish explanatory display expectations from authoritative EOM semantics |

The five dynamics documents requiring first-pass mathematical review are:

- `content/markdown/aaa/dynamics/master-equation.md`
- `content/markdown/aaa/dynamics/causal-action-functional.md`
- `content/markdown/aaa/dynamics/effective-lagrangian.md`
- `content/markdown/aaa/dynamics/energy.md`
- `content/markdown/aaa/dynamics/binary-dynamics.md`

The five controlled Archie references are:

- `content/markdown/aaa/archie/mathematics-style-guide.md`
- `content/markdown/aaa/archie/mathematics-terminology.md`
- `content/markdown/aaa/archie/comparative-glossary.md`
- `content/markdown/aaa/archie/photon-guide.md`
- `content/markdown/aaa/archie/research-notebook.md`

The first three define shared language and equations. They must not be changed opportunistically during a dynamics edit. The last two are downstream consumers that must follow the approved definitions.

## 2. Direct acceleration implementation

The authoritative sharp acceleration currently computes

$$
\left|\frac{D_r}{D_t}\right|
$$

as `receiver_strength` and multiplies the inverse-square contribution by it. The direct implementation locations are:

- `src/eom/src/CertifiedAcceleration.cpp`
- `scripts/eom/oracle/certified_acceleration.py`
- `scripts/eom/oracle/reference_kernel.py`

The same files also multiply the finite-width kernel by $|D_r|$. A source-density implementation would instead multiply the finite-width kernel by $c_f$ and the sharp kernel by $c_f/|D_t|$.

Initial disposition: **semantic replacement required only after the finite-width physical parameters, coincident-birth rule, causal recoil decision, and independent oracle strategy are settled**.

The production implementation and its current oracle must not be modified together and then cited as independent agreement. If both implement the same accepted equation change, their agreement checks implementation parity only. The equation requires a separately justified analytic control or independently maintained instrument.

## 3. Root transport and certificates

Receiver-normal data remains required for

$$
\frac{dT_t}{dT_r}
=
\frac{D_r}{D_t}.
$$

The following areas carry receiver-normal values, branch orientation, or root-continuation information that must be preserved semantically:

- `src/eom/include/architrino/eom/CertifiedAcceleration.hpp`
- `src/eom/include/architrino/eom/ExactPairBatch.hpp`
- `src/eom/src/ExactPairBatch.cpp`
- `src/eom/src/CoupledEvolution.cpp`
- `src/eom/native/eom_borg_shadow_cli.cpp`
- `scripts/eom/oracle/certified_history.py`
- `scripts/eom/oracle/certified_evolution.py`
- root-certification and coupled-history tests under `tests/`

Initial disposition: **retain the mathematical quantity and root-transport behavior**. Whether field names migrate from receiver-normal language to the proposed $D_r$ terminology is a later versioned schema decision.

Fields currently named `receiver_strength` are ambiguous after promotion. A migration must split them into an acceleration weight and a root-transport orientation rather than reusing one field with changed meaning.

## 4. Finite-width event machinery

The current finite-width event route, pinned-fold analysis, quadrature bounds, and event certificates are built around the receiver-weighted integrand. Principal files include:

- `reference/priorities/app-eom/master-eom-binding-v0.md`
- `reference/priorities/app-eom/finite-width-close-approach-caustic-route.md`
- `reference/priorities/app-eom/evolution-contract-v0.md`
- `reference/priorities/app-eom/performance-architecture-survey-and-baseline.md`
- `src/eom/src/CertifiedAcceleration.cpp`
- `scripts/eom/oracle/reference_kernel.py`

Some numerical machinery remains reusable: interval history evaluation, causal residual bounds, source-normal fold detection, finite-width quadrature structure, deterministic reduction, and atomic publication. The integrand, analytic fold coefficients, derivative bounds, regulator ladders, and acceptance values do not transfer automatically.

Initial disposition: **reuse architecture only after rederiving every acceleration-dependent enclosure**. Old certificates remain old-law evidence.

## 5. Validators and independent checks

The validator surface includes:

- `scripts/check-receiver-normal-clean-slate.mjs`
- `scripts/check-content-integrity.mjs`
- `scripts/config/foundational-impact-contracts.json`
- `scripts/validate-content.mjs`

The receiver-normal clean-slate check deliberately enforces the current law. It cannot be changed into a source-density acceptance test in the same edit that changes the law and then be presented as independent evidence.

Initial disposition:

- preserve it unchanged while the current binding remains canonical;
- during authorized migration, rename or freeze it as an old-law historical check;
- create a new source-density checker only after the accepted equation, schema version, and independent analytic controls are fixed;
- keep root-transport checks for $D_r/D_t$ in the new validation family.

## 6. Tests and oracles

The machine search found 35 files under `src/eom`, `scripts`, and `tests`. The files with direct acceleration semantics include:

- `tests/test_eom_native_acceleration.py`
- `tests/test_eom_native_coupled_evolution.py`
- `tests/test_eom_oracle_certified_acceleration.py`
- `tests/test_eom_oracle_reference_kernel.py`
- `tests/animator-delayed-hit-runtime.test.js`
- `tests/photon-runtime.test.js`
- `tests/prescribed-orbit-causal-roots.test.js`

Initial disposition:

- tests of exact receiver-weighted acceleration become old-law regression tests or are versioned to the new contract;
- tests of root geometry and root transport remain applicable if they do not assert receiver-weighted magnitude;
- tests derived from the same implementation formula are parity tests, not physical oracles;
- the static-transmitter moving-receiver analytic control and ordinary-fold impulse theorem should become independent acceptance references after equation promotion.

## 7. Evidence disposition classes

No frozen evidence file is rewritten. Each receives one of four labels in the final migration ledger:

1. **geometry-retained** — root existence, root completeness, history coverage, or interval arithmetic remains valid independently of acceleration strength;
2. **diagnostic-only** — useful performance or failure information, but unable to support the new equation;
3. **old-law-only** — acceleration, evolution, branch, or acceptance result consumes the removed receiver factor and does not transfer;
4. **rerun-eligible** — the underlying retained history remains admissible, but a new independently accepted evaluator and schema are required before rerun.

The eight frozen evidence files found by the first search remain unclassified at individual-file level in this initial inventory. That file-by-file evidence ledger is required before migration, but writing it now would imply that the unresolved finite-width and recoil law were already fixed.

## 8. Reproducible searches

The documentation search is

```text
rg -l -e 'W\^\{\\mathrm\{rec\}\}' -e 'W\^\\mathrm\{rec\\}' -e 'D_T/D_s' -e 'D_\{T' -e 'receiver-normal' content/markdown/aaa reference/priorities/app-eom src/eom scripts tests
```

The machine-name search is

```text
rg -l -e 'receiver_normal' -e 'receiverNormal' -e 'receiver-normal' -e 'D_T' -e 'W\^\{\\mathrm\{rec\}\}' src/eom scripts tests
```

Both searches must be rerun immediately before an authorized migration because concurrent work can change the counts.

## 9. Disposition

This initial inventory closes the architecture-level classification but not the file-by-file migration ledger. It is sufficient to show that promotion is a versioned semantic change, not a formula substitution.

Promotion classification: **priority-only; migration deferred until the equation's coincident-birth and causal-recoil blockers are resolved**.
