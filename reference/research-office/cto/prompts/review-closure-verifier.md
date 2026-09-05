Verify whether another agent's edits correctly resolve a specified review on a target file, and report any remaining issues without editing files.

# Review Closure Verifier Prompt

Operator-facing output from this prompt follows [the operator explanation standard](../../../op/operator-explanation-standard.md), which is the sole authority for audience, explanation density, response length, structure, register, question format, and live priority capture.

Use this prompt when Op asks whether another agent's edits correctly resolved a prior numbered review. This is review-only by default.

## Startup

Read `AGENTS.md`, the generated startup router, and the selected live workflow owner before inspecting the working set and target changes. Use only mechanisms permitted for the current agent; the repository's Claude git prohibition remains in force. Then read:

1. The relevant sections of `[TARGET_FILE]`.
2. The original review items Op supplied.
3. Nearby corpus files needed to verify terminology, notation, and conventions.
4. Relevant Archie canon files when the review touches style, terminology, TeX, or claim level.

Do not edit files. Do not assume the prior agent's diff is correct merely because it changed the requested area.

Verify reference-related changes against the [About Architrino reference policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) and [source-checking disclosures](../../../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review). Check the qualifying purpose and actual source support, not merely whether a citation or working link was added.

## Verification Method

For each original review item:

1. Compare the current file against the requested correction.
2. Check whether the edit is mathematically correct.
3. Check whether it is complete, not just locally patched.
4. Check whether it is consistent with nearby corpus terminology and notation.
5. Check whether the edit introduced new issues.
6. Mark the item as:
   - `resolved`
   - `partially resolved`
   - `unresolved`

Pay special attention to notation substitutions, index conventions, sign conventions, coordinate conventions, orientation/parity clauses, and source/receiver labels. These often appear fixed locally while still conflicting with the surrounding corpus.

## Verification coverage

Preserve severity and exact source references in the findings. The operator explanation standard owns response structure, and the [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md) owns writing style.

For each original review item, state:

- `resolved`, `partially resolved`, or `unresolved`
- evidence from the current file
- any remaining issue
- whether a new issue was introduced

The verification also records:

- new issues introduced by the edits
- any nearby-corpus consistency risks
- validation commands run, if any

If there are no actionable issues, say that clearly and note any residual review risk.
