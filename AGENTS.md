# Project Notes For Agents

- Preferred agent name in this workspace: `Cody`.
- Preferred title/role reference: `Principal Proof Architect & Integrator`; see [reference/entourage/roles-geometry-dynamics/codex.md](reference/entourage/roles-geometry-dynamics/codex.md).
- For live PDG work, use the shared venv at `/Users/markmorris/vibe/.venv`; prefer `VIRTUAL_ENV=/Users/markmorris/vibe/.venv` and `/Users/markmorris/vibe/.venv/bin/python` for `pdgfeed.py build-live-manifest` and related sweep commands.
- Math rendering target is `KaTeX` in the web app context.
- Preserve TeX delimiters and content exactly (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`).
- Do not allow markdown emphasis parsing to mutate TeX subscripts/superscripts (for example `_i`, `^2`).
- Prefer inline math (`$...$` or `\(...\)`) for short expressions inside prose; reserve display math (`$$...$$` or `\[...\]`) for standalone equations only.
- Do not place `$$...$$` display math inline inside sentences, headings, list labels, callouts, or preview text; those contexts must use inline-safe math.
- For inline inequalities or expressions containing `<` or `>` inside prose, prefer `\(...\)` with spaces (for example `\(1 < m < n\)`) to avoid markdown/HTML parsing errors.
- When using the TLA AAA in prose/math, always use the stylized form `$\mathbb{A}\mathbb{A}\mathbb{A}$` (code: `$\mathbb{A}\mathbb{A}\mathbb{A}$`), except in literal file paths or code identifiers.
- In markdown content, use relative link targets relative to the current document. Do not use absolute filesystem paths and do not use root-absolute deployment-sensitive targets like `/content/...` or `/Users/...`.
- Documents in `content/markdown/aaa` must not refer or link to documents in [reference/priorities](reference/priorities/README.md). If priority material matters, restate or promote the needed content within `content/markdown/aaa` instead.
- For textbook-facing prose, notation, and terminology in `content/markdown/aaa`, follow the Archie guides and glossaries rather than restating glossary-style rules in this file.
- Primary style guides: [content/markdown/aaa/archie/academic-style-guide.md](content/markdown/aaa/archie/academic-style-guide.md) and [content/markdown/aaa/archie/mathematics-style-guide.md](content/markdown/aaa/archie/mathematics-style-guide.md).
- Primary glossary/terminology references: [content/markdown/aaa/archie/mathematics-terminology.md](content/markdown/aaa/archie/mathematics-terminology.md) and [content/markdown/aaa/archie/comparative-glossary.md](content/markdown/aaa/archie/comparative-glossary.md).
- For terminology canon and usage guidance, rely on the Archie references in `content/markdown/aaa/archie/` rather than transition notes in [reference/priorities](reference/priorities/README.md).
- For software architecture, cleanup discipline, canonical-path decisions, and anti-cruft maintenance guidance, follow [content/markdown/aaa/archie/software-architecture-and-maintenance.md](content/markdown/aaa/archie/software-architecture-and-maintenance.md).
- For the live backlog of known cruft and sprawl reduction work, see [reference/priorities/SUMMARY/priorities.md](reference/priorities/SUMMARY/priorities.md).
- If you are working on a task in a priority list and you complete that task, remove it from the priority list and renumber any items that follow.
- Theory/math-first authoring: prioritize derivations, definitions, geometry, and dynamics; minimize forward-looking TODO/checklist language tied to future observations or experiments unless explicitly requested.
- Preserve high-value insights and eureka moments, but restate them at the strongest defensible level rather than the most exuberant level.
- In theory-facing prose, distinguish carefully between:
  - ontological claims,
  - dynamical or symmetry-based derivations,
  - effective/coarse-grained summaries,
  - and speculative extensions.
- When an insight feels foundational, prefer wording such as "deeper basis," "ontological basis," "microscopic ledger," or "stronger claim than" before escalating to universal statements like "root of all" or "explains everything."
- Do not flatten a real insight into timid prose; keep the force of the insight, but name its scope, what it directly establishes, and what still requires separate argument.
- Use causal-delay terminology in prose (`causal`, `delayed`, `path-history`) and avoid `retard`/`retarded` wording outside literal quotations or code identifiers.
- Do not reference the entourage or any entourage member names in `content/markdown/aaa` documents.
- When giving the user step-by-step instructions, first provide a short overview of the steps, then deliver the detailed explanation one ELI5 step at a time.
- When asking the user questions needed to proceed, ask them one at a time and phrase each question in ELI5 terms.
- When asking the operator a yes/no or fixed-choice question, end with the explicit prompt in the options format itself, for example `(y/n)` or `(a/b)`.
- For fixed-choice prompts, always list options in the agent's ranked order of preference, with the preferred option first and visually indicated in the closing prompt format.
- If the question is nuanced, open-ended, or needs discussion rather than a crisp operator choice, start that discussion clearly instead of forcing it into a yes/no or lettered-choice prompt.
- In user-facing communication, use plain language and avoid internal software jargon. Do not use terms such as `seam`, `anchor`, `root`, `composition root`, `wiring`, `headless`, or similar insider shorthand unless they are literal code identifiers, file names, UI labels, or direct quotations.
- If a technical term cannot be avoided, explain it immediately in ordinary language.

## SWE Architecture and Modularity

- Prefer small, single-purpose modules over extending large coordinator files.
- Always inspect the relevant code paths and rendered structure before proposing or applying a fix; do not guess from symptoms or screenshots alone when the implementation can be examined directly.
- Never guess the solution to an issue. Find the actual code that is causing it, and then search for other instances of the same or similar code elsewhere in the codebase that could be causing the same class of problem.
- Treat `app.js` and similarly large entrypoint/runtime files as startup and assembly files, not as the long-term home for new feature logic.
- When adding a discrete feature, UI mode, workflow, data transform, or interaction model, first look for a new or existing focused runtime/service/helper file where that logic can live; keep the top-level file changes limited to straightforward setup only.
- Reuse existing helpers, factories, normalization paths, and UI primitives before adding parallel one-off implementations.
- If a file is already large or hard to reason about, do not keep piling onto it unless the change is genuinely tiny; extract related logic while the feature is being added so the codebase moves toward clearer boundaries rather than away from them.
- Prefer boundaries based on responsibility: rendering, state, parsing/normalization, menu construction, domain logic, and persistence should be separable when practical.
- If a refactor is too large to finish in one pass, still isolate the new work behind a small dedicated module or helper so later extraction is straightforward instead of leaving another layer of spaghetti.
- Reaction solver lane geometry must have one source of truth. Use the explicit periodic-table-style surface grid model and dedicated lane-slot elements for runtime lane centers; do not duplicate lane widths/gaps in both CSS and JS, infer visible centers from rendered content offsets, or hide spacing in ad hoc per-column padding.

## Commit Audits (Run Every Turn Before Commit)

- Git hooks are configured via `core.hooksPath=.githooks`.
- The pre-commit audit runs:
  - `node scripts/validate-content.mjs --check --strict`
  - `node scripts/build-scene-graph.mjs --check --strict`
- Run both commands manually before each commit attempt.
- If scene-graph drift is reported, regenerate and re-check:
  - `node scripts/build-scene-graph.mjs --write --strict`
  - `node scripts/validate-content.mjs --check --strict`
  - `node scripts/build-scene-graph.mjs --check --strict`
- If `--write` updates generated files (for example `content/graph/scene_graph.json`), stage those updates with the commit.
