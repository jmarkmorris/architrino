# B-to-B current-source acceptance

## Boundary and authority

The recurring [checker](../../../../scripts/equation-mapping/check-current-source-maps.mjs) compares current source maps with an externally selected accepted B checkpoint and an externally selected reviewed transition. The caller supplies both record paths and both SHA-256 values. It does not calculate an expected value from the record it is about to accept. No candidate field, approval flag, missing argument, or default current-file hash grants acceptance.

The [fixed selection record](option-b-five-profile-selection.json) supplies the four caller inputs to required Content Integrity. Selecting or updating that record is an operator/reviewer responsibility, not an automatic consequence of a green consistency check. Digest selection identifies reviewed bytes; this implementation does not authenticate a human reviewer or establish that a proposed source change is scientifically correct. The transition's review reference is attribution, not executable authority.

The initial [accepted B checkpoint](option-b-five-profile-accepted-b.json) preserves the five existing accepted source-map generations byte-for-byte. The [initial transition](option-b-five-profile-transition.json) authorizes no source changes. Its reference points to the existing five-profile consistency and review account; it does not itself claim independent acceptance of this new checker implementation. The completed [independent review and integration](../analysis/option-b-repository-reconciliation.md#current-acceptance-mechanism) are separate evidence for the mechanism.

## Records and checks

Each accepted checkpoint profile contains its name, fixed manifest path, exact prior manifest text, `historicalEvidenceBindings`, and `operationalRefreshEligibility`. Those retained evidence records preserve the old scientific/historical path, digest and category; they are not reopened as current source selections. Main's admission controls can compare the entry's retained evidence directly against these records without reading the former A baseline files.

The reviewed transition binds the predecessor checkpoint digest, identifies its review reference, and lists the exact candidate map path, map digest and changes for every required profile. Each change is a JSON-pointer scalar replacement with exact before/after values. The checker independently derives the delta and demands equality with that list. It rejects absent or extra changes, source/profile omission, additions, deletion, path substitution, scope changes, role changes, graph rewiring, selector/contract changes and historical ancestry changes.

Source changes default to denied, including revision-only changes. Each eligible path must have a closed `{path, role, rationale}` grant in the externally selected predecessor checkpoint. Grants must be unique and resolve to an existing predecessor source with its exact role; the transition cannot introduce eligibility. The broad `current-source` label alone grants nothing: some inherited rows with that label are frozen scientific proofs or declarations. Eligible roles are limited to `current-source`, `admission` and `launcher`, and even those roles require an exact grant. The initial checkpoint grants only the migrated admission entries, their launchers, the common outer launcher and acceleration’s prescribed launcher helper. Preparers, reducers, executors, publishers and every document remain ungranted. Rationale is attribution, not scientific proof. Any changed source or relationship must use a different revision ID. A source revision change requires all referring endpoint revisions to match, and changing those relationship records requires fresh relationship revisions. This preserves the revision-reuse rule in the existing impact query. Independent references, scientific controls/contracts, resource plans and the shared manifest reader remain protected even when a selected transition requests a change. A separately reviewed policy extension is needed for those later responsibilities; this bounded implementation does not finish their migration or establish new mathematical applicability.

The generic implementation accepts a caller-specified nonempty exact profile census, so later families need no hardcoded generation hashes. The production checker supplies the original five-profile census. Each candidate is validated by the unchanged `current-source-manifest/v1` reader. Its A-era `baseline` metadata remains historical provenance and is not interpreted as new B acceptance authority.

All selected records, the retained historical proof, each candidate map and every declared current source are captured as canonical regular files. The capture retains original device/inode/size/modification/change-time identity and SHA-256. Every capture is checked again before the synchronous checker result is published; same-byte inode replacement fails. A source selected inconsistently by two profiles fails. No scientific target, worker, compiler or production numerical campaign is executed by this check.

## One-time transfer proof and pre-edit binders

Before editing, `rg` over scripts, tests and repository documentation identified the required Content Integrity invocation, root-cover admission suite, successor controls, and the retained analysis/disposition references as consumers of the old checker. Searches found no current-source manifest binding to the checker path. The old reader remains untouched because maps select its exact bytes. Main owns the existing test adaptations and disposition/CI integration.

The [historical transfer record](option-b-five-profile-historical-transfer.json) retains the pre-edit checker source and digest, exact five original descriptor texts, historical helper identities and the five successful pre-edit transfer reports. Its instrument digest is `a1624fa9d4a9470748ecca32772de1f990f72b915138c4e8ff5867d8b2f1ed60`. That instrument's built-in known extraction case preceded its Git/target reads. The transfer record is checkpoint-bound retained data: routine acceptance does not execute it, retrieve Git history, parse old JavaScript pin tables, or compare current bytes to the A generation.

| Profile | Sources | Relationships | Retained evidence records |
| --- | ---: | ---: | ---: |
| prescribed-response | 15 | 29 | 9 |
| f6c-acceleration | 16 | 31 | 11 |
| root-cover | 18 | 35 | 3 |
| cached-root-cover | 25 | 49 | 3 |
| cached-root-cover-full | 26 | 51 | 11 |

Counts above are measured by the preserved pre-edit transfer reports and the new explicit-selection CLI report. No existing map, scientific/reference source, original descriptor, or shared reader was changed by this assignment.

## Validation and integration handoff

`node --test tests/option-b-current-source-transition.test.mjs` passed 37 tests, zero failures/skips/cancellations, in 611.356959 ms after the revision-continuity, nonblocking-open and default-deny eligibility fixes. The first control uses the independent published abc answer from main's [known-answer record](../../../../scripts/equation-mapping/fixtures/known-hash-answers.json), followed by a manually stated valid operational source/revision/edge transition. Controls cover later generic profiles and B-to-B-to-B checkpoints, external selection omissions/substitution, exact delta authorization, protected roles, revision reuse, source/stage replacement, graph/profile coverage, duplicate records/JSON, stale bytes, symlinks, and original same-byte replacement through final checking. Capture opens include `O_NONBLOCK`: a FIFO with no writer is rejected by the regular-file check. Its regression runs in a child with a one-second timeout and SIGKILL fallback, so removal of the flag cannot hang the suite; the child first captures the known regular abc source successfully.

The eligibility controls also copy the actual five-profile metadata and sources into isolated fixtures, verify each unchanged baseline first, and then propose fully revisioned successors for the acceleration reference proof and normalized-member predeclaration. Both valid candidate graphs reject specifically because those paths have no eligibility grant, despite their inherited `current-source` labels. The production maps and scientific documents remain unchanged. Edited checkpoint eligibility rejects under the original selected digest before a missing candidate file is read. Closed, duplicate, unknown-path, wrong-role, protected-role and transition-injected grants reject.

After those known controls passed, the exact command below returned source consistency pass for all five profiles and zero reviewed changes:

```bash
node scripts/equation-mapping/check-current-source-maps.mjs --accepted-baseline reference/priorities/development-process-review/contracts/option-b-five-profile-accepted-b.json --accepted-baseline-sha256 fa46cb15e63e86d599be8e3ef3f8ca764890ccaf863e05b368afaefc03edc373 --transition reference/priorities/development-process-review/contracts/option-b-five-profile-transition.json --transition-sha256 f0f66a8076e9cc60d75fd2ef27850eb6ab4568fa6c00b90bbef2b70837935dfb
```

Original integration checkpoint identities, measured then with `shasum -a 256` (later family consumer adaptations are recorded in their own transfer evidence):

| Artifact | SHA-256 |
| --- | --- |
| Accepted B checkpoint | fa46cb15e63e86d599be8e3ef3f8ca764890ccaf863e05b368afaefc03edc373 |
| Initial transition | f0f66a8076e9cc60d75fd2ef27850eb6ab4568fa6c00b90bbef2b70837935dfb |
| Fixed selection record | e251b94094f071db11563336f2fec39252190fc301939e193190cc4d935d97ef |
| Historical transfer proof | e6cd6633b50ff562a397f649afa40d0aa324180f013634660468ef0b65ed0998 |
| Current checker | 6c2637604422e9692ae6ed3a74c04748dac63164f100c32c94fa66373cd4a04d |
| Transition helper | 5ab045757df6c7df7d364f39ba2ac62ec90666e092581b5b3faa08d232dda039 |
| Focused controls | be1d2f773b68a68b8a4accbdc36fc6ecfda92d2a6f47b757a2ee106ff99da388 |
| Unchanged manifest reader | 9097ef3fd3fb2040b48c601d81c184188e8a992aa4464694860d05d0bf76a56e |

`rg` over the current checker, transition helper and new controls finds no 64-hex hash literals, `inspectTransfer`, `extractLegacyPins`, `circularSuccessor`, or `execFileSync`. The historical APIs were removed only after their proof was preserved. Existing callers, the required-gate selection, the new test slot and the known-answer consumer inventory are now adapted; the old parser and successor controls have reviewed retirement dispositions. The [integrated validation record](../analysis/option-b-repository-reconciliation.md#source-expectations-transferred-and-validation-retained) reports 85 passing final controls and the required gate's passing B checks, while retaining its two separate corpus/generated failures. The existing impact query is not modified.

Claim grade: measured for the named bounded controls and five-profile byte checks; inferred for preservation of operational intent from the explicit graph/role constraints. An unauthorized transition admitted under unchanged external selections, revision reuse, a missing required profile/check, altered protected source, or a same-byte replacement surviving final checking falsifies the corresponding claim. A passing declared graph is not proof that source code has no undeclared dependencies. Nonblocking open prevents FIFO-open blocking but does not impose an explicit maximum size on regular source reads; no resource-bounded capture claim is made. No heavy suite or scientific acceptance claim is included.

## Source-role preservation through remaining families

The accepted [prevention review](../evidence/option-a-validation-rca/prevention-workflow-review.md#source-role-preservation-substantially-implemented-at-the-inspected-b-boundary) is carried through the existing full-B continuation. Before retiring a family's A route, its reconciliation must map the original obligation to its B record, external predecessor selection, actual enforcing consumer, preserved positive/negative controls and retirement condition. Retain historical and independent-control values and their applicability; a historical source is not a current successor merely because it occupies a live repository path. A protected graph role may safeguard several kinds of expectation in one payload without changing their individual meaning.

Every later family retains the exact predecessor path/role eligibility rule and default denial. Empty eligibility means no source refresh, including operational-looking sources. A selected candidate transition cannot grant itself eligibility, weaken protected roles, rewrite ancestry or substitute expected values from its subject. Family admission must check the final declared bindings through the real loading or execution route, including language bridges and retained comparison inputs, and exercise rejection before removing the superseded route. The [Python and known-answer family](../analysis/option-b-repository-reconciliation.md#python-and-known-answer-graph-integration) records the current obligation mapping; subsequent Python/Borg and other family continuations use the same owners and mechanism. No new queue, blanket pin refresh, scientific acceptance or publication authority follows from this requirement.
