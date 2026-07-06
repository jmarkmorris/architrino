Closure goal: Verify whether another agent's edits correctly resolve a specified review on a target file, and report any remaining issues without editing files.

# Review Closure Verifier Prompt

Use this prompt when Op asks whether another agent's edits correctly resolved a prior numbered review. This is review-only by default.

## Startup

Run:

```bash
git status --short --untracked-files=all
git diff -- [TARGET_FILE]
```

Then read:

1. The relevant sections of `[TARGET_FILE]`.
2. The original review items Op supplied.
3. Nearby corpus files needed to verify terminology, notation, and conventions.
4. Relevant Archie canon files when the review touches style, terminology, TeX, or claim level.

Do not edit files. Do not assume the prior agent's diff is correct merely because it changed the requested area.

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

## Output

Findings first, ordered by severity. Use exact file and line references.

For each original review item, state:

- `resolved`, `partially resolved`, or `unresolved`
- evidence from the current file
- any remaining issue
- whether a new issue was introduced

Then include:

- new issues introduced by the edits
- any nearby-corpus consistency risks
- validation commands run, if any

If there are no actionable issues, say that clearly and note any residual review risk.
