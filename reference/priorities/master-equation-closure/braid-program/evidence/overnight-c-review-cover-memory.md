# Bounded-memory preparation for the independent saved-cover audit

## Disposition

Claim grade: derived implementation finding, supported by a small synthetic memory measurement. The [original independent audit](overnight-c-review-cover-audit.py) retains all parsed ancestor receipts simultaneously and builds an in-memory tree and row summaries. That design cannot ensure the unchanged 400 MB research budget for the permitted final cover sizes. It remains frozen and was not run on the final target.

The separately authored [streaming audit](overnight-c-review-cover-streaming-audit.py) preserves the original mathematical and provenance obligations while storing only two adjacent receipt snapshots in a temporary SQLite database. Exact endpoint validation reuses the original independent checker by its frozen SHA-256 `601b32127cab24f9c40ca27824f7d908d0af5523c41b5a4f5661524708986df8`. This is reuse of a separately authored evidence validator, not import of a residual evaluator. The new checker never imports any subject evaluator or reruns a target residual.

The [method report](../analysis/overnight-c-cover-independent-review.md) retains its preparation record and now includes final adjudication. This companion records the memory-driven change, the additional refresh producer review, and the new controls. Final target adjudication is separate and must retain a partial verdict when unresolved leaves remain.

## Synthetic measurement and its limits

A standard-library deep-object-size instrument first passed an empty-list case and a repeated-singleton case, where the exact expected size is `sys.getsizeof(list)` plus one copy of `None`. Only then did it inspect small synthetic endpoint-shaped receipts. For 1,000 rows it measured 293,030 serialized bytes and 1,010,266 parsed-object bytes; for 2,000 rows it measured 586,030 serialized bytes and 2,018,594 parsed-object bytes. This is approximately 1,008 incremental parsed bytes per row. A linear projection gives about 151 MB for one 150,000-row receipt, 302 MB for two, or 907 MB for six, before JSON decoding copies, validator dictionaries, partition sets, or interpreter overhead.

These are synthetic measurements and projections, not measurements of any target receipt and not rigorous worst-case RSS bounds. They show why replacing six resident receipts by two resident Python objects would still give inadequate assured headroom. No target data were opened for this assessment.

## Streaming implementation and memory contract

The checker reads 8 KiB binary chunks and incrementally decodes UTF-8. It admits at most 65,536 characters per JSON value and 1,000,000 bytes of bounded metadata, hashes exactly the bytes it consumes, and rejects truncated values, duplicate keys, trailing data, invalid endpoint tuples, or a mismatching frozen digest. Each witness is validated and then inserted into a disk table before the next is read. The raw receipt and its complete parsed object are never resident together. Paths are bounded to the reviewed depth forty. The leaf cap is 150,001 because the reviewed subject stops after the split that first crosses its 150,000-leaf threshold; admitting that final crossing state does not raise the subject's continuing-work limit.

SQLite uses an 8 MiB page cache, file-backed temporary storage, and disabled memory mapping. Primary-key path order supports complete-tree and ancestry traversal. A separate `(status, ordinal)` index supports refresh order comparisons without sorting the full payload in memory. Only two adjacent snapshots are retained on disk; the older child table is dropped after its transition is checked. The scratch database must not already exist and is removed on exit.

The exact complete-tree check recursively visits matching lower and upper path children while streaming leaves in lexical order. It uses depth-bounded stack state and an exact rational volume accumulator, without an in-memory trie or set of all leaves. Duplicate leaf insertion is rejected by the database primary key. The traversal rejects ancestor overlap, missing siblings, wrong split coordinates, and extra leaves, and requires normalized volume one.

Continuation ancestry is checked by merging two ordered leaf streams. Every old exclusion must survive with identical canonical row content; descendants of each old unresolved leaf must occupy its region and use the appropriate evaluator identity. At refresh transitions the two excluded streams are compared in their original order, every existing exact row must remain identical, display-only rows may change only into original-evaluator exact rows, unresolved paths/order remain identical, and the changed-row count must match `refreshed`. Each ancestor is independently checked for exact domain, complete partition, source/dependency identity, completion flag and row metadata. No manifest receipt may remain outside the checked ancestry.

All original audit obligations remain: exact strict signs; printed/exact sign agreement; complete rational partition; precise declared domain; frozen code and subject-control identities; inheritance and refresh preservation; runtime-source inventory; explicit incomplete status; and no independent residual replay. The manifest supplies four core controls and exactly one control for its selected refresh producer. The selected producer must match the final receipt. Both original and streamed refresh sources are pinned, but the abandoned original partial refresh is not inserted into the new output's ancestry.

A peak-resident-memory guard of 320,000,000 bytes is checked every thousand ingested leaves and between phases, reserving headroom below the research budget. This is a periodic process guard, not a hard operating-system memory cap. Actual target peak RSS must still be measured by the checker and supervisor. The bounded buffers, disk-backed rows and indexes remove the identified receipt-count-dependent Python-memory growth; the synthetic controls do not constitute a formal proof of SQLite's allocator behavior.

## Streamed refresh review

Read-only `diff -u` between [original refresh](overnight-c-witness-refresh.py) and [streamed refresh](overnight-c-witness-refresh-stream.py) found the following changes: `write_atomic` now sends `json.dump` directly to the temporary output, checks its final size below 75 MB, and replaces the destination; the known case checks literal signed-dyadic-string and Boolean bytes; the source-bound control receipt and default output use distinct names. The evaluator/dependency pins, root/partition logic, refresh loop, original input source requirement, exact row encoding, and inherited-row semantics are unchanged.

`shasum -a 256` measured streamed refresh source `6df95c3f85445dcf48deb45dd88ec1130c687bd33ff85f9f17e19fe1fa49c573` and its source-bound known receipt `d27f1958bf4017a79ae4d4918bac86bf2575e7928eb8691f0d0eadcb9e2b734f`. The serialization change does not introduce a mathematical change. It also does not turn refresh reproduction into an independent residual calculation or make an inherited completion flag sufficient evidence by itself.

## Known-first controls and launch identity

The first synthetic malformed-tree pass exposed a checker cursor-cleanup defect: a failed traversal left an SQLite read cursor active, blocking the next test-table replacement. Explicit cursor cleanup was added to both traversal and ancestry routines before any real target was used. The final controls also exercise a floating metadata exponent split across reader chunks, avoiding an incremental-parser boundary error. No subject was changed to pass these controls.

The final [controls receipt](overnight-c-review-cover-streaming-controls.json) passed at 26,001,408 bytes peak RSS. It includes the frozen independent endpoint/sign controls, valid synthetic ancestry for both refresh producers, missing/duplicate/overlapping/mismatched leaf rejection, zero-containing exact endpoint rejection, display-only final rejection, false completion rejection, duplicate-key and trailing-JSON rejection, changed inherited/exact-refresh row rejection, a 1,024-leaf complete tree across multiple chunks, and a numeric exponent spanning a read boundary. Standard-library `ast.parse` also accepted the checker under the shared venv, exit 0.

Frozen new checker SHA-256: `54567e2a95fbdd364be24ad425da7847c3d3065ff5914964a99a257e1d1909f5`. Controls SHA-256: `82fcba0ee484c49ab4b784d1f47a49253ce4e2eee45dae8724d1daf4aa3d3e6d`. The parent supplied the final manifest SHA-256 `097cc39c68e855bdf7c2045f6a715666309f4fabe16bbc802ebcf9a341763959`, matched by `shasum`; its final target execution belongs to the parent's single owned supervisor, not a second reviewer-launched job.

The exact command provided to the parent is:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-cover-streaming-audit.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-cover-streaming-controls.json --manifest reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-cover-manifest.json --scratch .local-data/master-equation-closure/overnight-c/overnight-c-review-cover-audit.sqlite
```

This preparation read no cover receipt and launched no target audit. At preparation, the parent reported the final leaf-cap-stopped cover had 114,308 excluded and 35,693 unresolved leaves; those counts were not treated as independent measurements before target execution. The manifest requests `require_complete: false`.

The parent's subsequent supervised run completed successfully. The frozen [target audit receipt](overnight-c-review-cover-streaming-target.json), SHA-256 `b5d80459bb488656341fb4fc2c37c01b1094076ac9d39578cb211b9ea1ff7d60`, measures peak resident memory 36,667,392 bytes and validates those counts, exact witnesses, six-stage ancestry, five controls and 87 runtime sources. The [final independent disposition](../analysis/overnight-c-cover-independent-review.md#final-disposition-valid-partial-cover) remains valid partial evidence, with 35,693 unresolved leaves and no independent residual replay or whole-box exclusion.
