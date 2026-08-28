# Frozen lossless packaging expectations

Closure goal: preserve every accepted parent-evidence byte and original source binding while reducing physical evidence-file pressure, without changing any numerical result or authority.

## Independent freeze and scope

This contract and its [literal inventory](../../../../tests/fixtures/f6c-lossless-packaging-expectations.v1.json) precede implementation of the packaging writer. The inventory was independently captured at `2026-08-28T00:56:34.661Z` using Node's filesystem, SHA-256 and assertion primitives, with no import of an adapter, producer or packaging implementation. Its SHA-256 is `79a91daedff0fdb712b5b76ff0a4d8c345711eb2c4b69c0731a509da701e48fc` and its length is 40,636 bytes. The captured live acceptance owner was `04a889345ee7c4cd43b0f41bebb70cb2f176ac4d13af035204347f3c6904feaf`, 359,719 bytes; it is an observation at this freeze, not permission to substitute that version in a later run.

Plainly: the expected contents are written down before the code that will package them. Later approval must still use the actual current document and its separately fixed identity.

**Measured input inventory:** original parent one contributes thirteen evidence/stage-log files totaling 3,697,701 bytes, plus its historical owner of 318,717 bytes. Accepted original parent two contributes thirteen evidence/stage-log files totaling 3,716,521 bytes, plus its historical owner of 350,973 bytes. These 28 distinct physical inputs total 8,083,912 bytes. Node's direct byte reads, SHA-256 calculations and before/after device/inode/size/modification/change-time comparisons establish this inventory only. Repeating the capture and finding different bytes or identities falsifies its continued applicability.

Plainly: the initial package has about eight megabytes of original material. This is measured input size, not package size, compression performance, numerical runtime or whole-history capacity.

Both attempts are conditional emission-refinement evidence. Parent-one closure remains original caller `9158`, final chunk `1eda87`, exit zero, `261.94229158400003` seconds. Parent-two closure remains original caller `95033`, final chunk `01a7f4`, exit zero, `274.738` seconds. Packaging never creates a fresh historical completion observation. Rejected `pilot-parent-2-v1`, its outer directory and caller observation are excluded and remain untouched. Parent-zero evidence, fresh caller-observation files, current approval, source files and runtime files are outside this initial payload scope and remain separately bound.

Plainly: copying the accepted records cannot turn an old run into a new run, repair a rejected attempt, or establish acceleration balance.

## Exact thirteen-file inventories and historical owners

Each parent has exactly these roles: `plan`, `manifest`, `comparison`, `operation`, `launcher_log`, `resource_log`, `queries`, `rows`, `pieces`, `producer_stdout`, `producer_stderr`, `comparison_stdout`, `comparison_stderr`. The inventory gives every exact original absolute logical path, current physical source path, byte length, SHA-256 and observed filesystem identity. The plan and operation supply the stage-log bindings; direct reads independently confirm all four logs, including the one-line completion records. No basename-only lookup, directory scan, inferred filename or caller-supplied alternate binding replaces this explicit inventory.

Plainly: all thirteen files matter, including the small logs proving that each original stage actually ended. A folder containing most of the files is not complete evidence.

The parent-one plan's logical readiness-owner binding is SHA-256 `7b4fb29001fac6cd21b91f8e3e0b6f38a5fc93a53a52c4f7939a75304e548d7c`, 318,717 bytes, supplied by `.local-data/braid-analysis/f6c-parent-emission-refinement-20260827/readiness-owner.7b4fb2.md`. The accepted parent-two plan's logical readiness-owner binding is `07762d5c1b0478e7030e9846b3aab237c1ca6d28581090061ab04b5c5d10fd42`, 350,973 bytes, supplied by `.local-data/braid-analysis/f6c-parent-adapter-20260827/readiness-owner.07762d5c.md`. Both logically name the same canonical readiness document, but they are different historical generations and must retain distinct explicit routes. The fixture records the six parent-one historical wrapper/control archives separately; none is a package member.

Plainly: two versions of the same document can coexist, but neither may pretend to be the other. Historical executable wrappers stay in their existing explicit archives, outside the evidence package.

## Frozen package layout

The initial format is uncompressed and indexed. Its exact byte sequence is the ASCII magic `F6C-EVIDENCE-PACKAGE-v1\n`, one canonical ASCII JSON index followed by LF, the concatenated original payload bytes, and the exact ASCII footer `\nF6C-EVIDENCE-PACKAGE-END-v1\n`, then end-of-file. The index has exactly `schema`, `entries` and `payloadBytes`; schema is `braid-program/f6c-lossless-evidence-package.v1`. Every entry has exactly `name`, `role`, `parentIndex`, `original` and `offset`. `original` has exactly `path`, `sha256` and `bytes`. JSON object keys are sorted, separators are compact, floats and duplicate keys are forbidden, and the canonical re-encoding must equal the original index bytes. The index limit is 1,048,576 bytes; the entry limit is 4,096; each package and each member is bounded by 67,108,864 bytes, including all framing for the package.

Plainly: the package is a checked table of contents followed by the untouched file bytes. It does not parse and rewrite scientific JSON, round decimal strings, normalize line endings or compress evidence.

The frozen member names are `parents/1/<role>` and `parents/2/<role>` for the thirteen roles above, plus `owners/<full-SHA-256>` for the two historical owners. Owner entries use `role=acceptanceOwner` and `parentIndex=null`; the parent descriptor explicitly selects the required owner generation. Other entries use their exact integer parent index. Entries and payloads are sorted lexicographically by member name. Offsets are nonnegative exact integers relative to the first payload byte: the first is zero, each following offset equals the previous offset plus its exact byte length, and `payloadBytes` equals the final end offset. Gaps, overlaps, unindexed bytes, integer overflow, booleans used as integers, zero-length members, duplicate names or duplicate original path/hash/length tuples reject. A repeated original path with distinct hashes is allowed only for the explicitly mapped historical owner generations.

Plainly: every payload byte has exactly one declared owner, and the two old readiness documents are kept separately by their full fingerprints.

A reader takes an externally frozen expected inventory or explicit admitted bindings, not merely the hashes claimed inside its input. It first captures the complete package binding and physical identity, validates the entire index and exact end-of-file, and verifies each requested member's exact byte length and SHA-256 against that independent expectation. It provides an inert bounded byte view or stream; archive names are identifiers, never filesystem extraction destinations. If extraction is needed for independent comparison, write only into a new owned directory with exclusive creation, never to original evidence paths. Reject absolute names, empty/dot/dot-dot components, backslashes, NUL, nonallowlisted names, ambiguous normalized aliases, symlink paths and duplicate physical-source hardlink aliases. Existing accepted public/private publication hardlinks remain legitimate: capture the declared public path once, retain its private alias untouched, and do not reject solely because its link count exceeds one. Reject source/package replacement, rename or mutation even if replacement bytes match. Recheck all physical sources through final publication and context closure.

Plainly: a corrupted package cannot authenticate itself by changing its own table of contents. The reader compares against the independently saved expectations and never uses embedded names to overwrite files.

## Adapter boundary and resource accounting

Logical historical bindings remain unchanged: `(original path, original SHA-256, original byte length)` resolves only through an explicit relation to `(physical package binding, member name)`. The package has its own independently recorded path, size, SHA-256 and captured identity. A historical owner route is distinct from current-owner approval. Current approval, current/historical executable sources, mathematical references, original ancestry and runtime files are never sourced from package bytes. All existing acceptance, complete-stream, parent-membership, closed-stage, claim-flag and final source checks remain obligations of the adapter. A package reader does not import or execute members, run numerical work, choose geometry or interaction strengths, or confer acceptance by itself.

Plainly: the package changes where old evidence is stored, not what the evidence means or which code is trusted to calculate with it.

The complete physical-source union must be independently enumerated after explicit logical routing: count each canonical physical package once, retain every separately consumed ancestry/source/runtime/current-owner/archive file, reject physical hardlink aliases, and sum their actual byte sizes. The unchanged adapter bounds are 512 physical files and 1,073,741,824 physical bytes. The package cannot hide an unbounded logical index or expansion. If the 28 eligible files are replaced in the adapter's consumed physical union by one package, the local arithmetic reduction is 27 files; any separate index, expectations, reader, controls, current approval or other newly consumed file must be added. Originals remain on disk and must not also be consumed redundantly under another alias. This arithmetic is not a measured whole-history capacity result.

Plainly: storing twenty-eight old files in one checked container can reduce open-file pressure, but only a complete inventory of the next real invocation shows whether the adapter fits.

Every creation or admission attempt retains the existing 1,800-second inclusive deadline, 2,147,483,648-byte aggregate RSS limit, one-worker policy, 1,000-millisecond maximum RSS observation gap, 15-second heartbeat, 40%/64-GiB launch admission and 20%/16-GiB running stop thresholds. The 64-MiB aggregate scientific/output limit and 16-MiB combined-log limit are not reset per package, parent, worker or file; explicitly classify every output and count package framing. Record actual wall time through final source check/publication/process exit, sampled aggregate memory, complete output/storage sizes and owned process/group/lock closure. No nine-parent, ten-parent or full-history numerical fit may be inferred from this inventory or a one-parent run.

Plainly: making fewer files does not grant extra time, memory or output space. The real bounded run must still demonstrate those costs.

## Independent acceptance checks

Before reviewing the writer, preserve this contract and fixture hashes. A separately authored decoder, with no import from writer/reader implementation, must reconstruct all 28 byte sequences and compare each directly with the frozen originals and expected lengths/hashes. Test complete package identity, exact member names and all historical bindings. A round trip using only the writer's own reader tests agreement, not independent correctness. Retain originals, rejected attempts and any failed package output as separate evidence; never delete old evidence to make a capacity claim.

Plainly: the independent check reads the package in its own way and compares it to the original files, so a shared encoding mistake cannot validate itself.

Required rejection controls include wrong magic/schema/footer; truncation at every framing boundary and within payload; extra trailing bytes; duplicate, reordered, missing or foreign members; wrong original path/parent/role/size/hash; one-byte alteration with recomputed internal hashes; malformed/noncanonical/duplicate-key index; negative/fractional/bool/overflow offsets; overlapping/gapped ranges; path traversal and aliases; executable/runtime/current-owner admission; rejected-v1 admission; source mutation and byte-identical replacement; output collision; partial write or interruption; over-limit file/byte/index/time/memory/log totals; and broken final source or private/public publication identity. Failure must preserve foreign evidence, close owned work and never report durable success. Metadata-only adapter tests must show numerical counters remain zero, and actual packaged admission must yield exactly the previously authenticated parent records without modifying frozen mathematical references.

Plainly: damaged or misattributed evidence must fail loudly without erasing either the originals or someone else's files. Exact record reconstruction proves packaging fidelity only; numerical accuracy still requires its separate checks.

Closure goal: implement and independently accept this byte-preserving package and its explicit adapter routing, then measure the next complete physical-source union and bounded run.
