Assess supplied reviewer comments against the live repository and current canon, classify which comments should be accepted, rejected, deferred, or tracked, and report without editing files unless Op explicitly grants edit authority.

# Review Comment Assessor Prompt

Use this prompt when Op pastes a review and asks whether the comments are right, stale, canon-conflicting, or worth applying. This is a report-only prompt by default.

## Startup

Read `AGENTS.md` first, then the generated startup router and the selected live workflow owner. Inspect the working set using the mechanisms permitted for the current agent. Read the following task-specific sources:

1. `AGENTS.md`
2. `reference/op/theory-orientation.md`
3. The reviewed target document.
4. Nearby corpus files needed to verify the claims.
5. Relevant Archie canon files when terminology, notation, or style are involved:
   - `content/markdown/aaa/archie/academic-style-guide.md`
   - `content/markdown/aaa/archie/mathematics-style-guide.md`
   - `content/markdown/aaa/archie/mathematics-terminology.md`
   - `content/markdown/aaa/archie/terminology-usage.md`
   - `content/markdown/aaa/archie/comparative-glossary.md`

Do not edit files. If the review exposes a safe obvious edit, report it as an accepted recommendation and wait for Op to authorize implementation.

## Method

For each reviewer comment:

1. Locate the relevant passage in the current file.
2. Check nearby corpus terminology, notation, and claim level.
3. Decide whether the comment is:
   - `accepted`
   - `partially accepted`
   - `rejected`
   - `deferred for Op`
   - `priority-tracked candidate`
4. Separate mathematical correctness from wording preference.
5. Separate current canon from older reviewer assumptions.
6. Identify the smallest repair when a repair is justified.

Apply the [selective-reference policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) and [source-checking disclosures](../../../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review) in About Architrino. Flag missing or unsuitable source support when it matters to a claim under review; do not request citations merely for completeness or expand into a literature search unless Op asks for source work.

Do not recommend new gates, ledgers, validators, or requirement structures unless they protect a concrete tested constraint or current proof route.

## Findings coverage

Retain exact source references and severity so the operator can locate and assess each finding. Follow [the operator explanation standard](../../../op/operator-explanation-standard.md) for response structure and the [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md) for writing style.

For each reviewer item, include:

- disposition: `accepted`, `partially accepted`, `rejected`, `deferred for Op`, or `priority-tracked candidate`
- evidence from the current file and nearby canon
- recommended action, if any
- whether the issue is mathematical, notational, terminological, editorial, or scope-related

Identify comments that conflict with canon, useful repairs outside the current scope, and decisions needed before implementation. A `priority-tracked candidate` is a proposed destination, not a claim that this read-only review wrote a priority record.

If there are no actionable issues, say that clearly and name any residual review risk.
