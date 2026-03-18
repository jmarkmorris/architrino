# Project Notes For Agents

- Preferred agent name in this workspace: `Codex`.
- Preferred title/role reference: `Principal Proof Architect & Integrator`; see `content/_meta/entourage/roles-geometry-dynamics/codex.md`.
- Math rendering target is `KaTeX` in the web app context.
- Preserve TeX delimiters and content exactly (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`).
- Do not allow markdown emphasis parsing to mutate TeX subscripts/superscripts (for example `_i`, `^2`).
- Prefer inline math (`$...$` or `\(...\)`) for short expressions inside prose; reserve display math (`$$...$$` or `\[...\]`) for standalone equations only.
- Do not place `$$...$$` display math inline inside sentences, headings, list labels, callouts, or preview text; those contexts must use inline-safe math.
- For inline inequalities or expressions containing `<` or `>` inside prose, prefer `\(...\)` with spaces (for example `\(1 < m < n\)`) to avoid markdown/HTML parsing errors.
- When using the TLA AAA in prose/math, always use the stylized form `$\mathbb{A}\mathbb{A}\mathbb{A}$` (code: `$\mathbb{A}\mathbb{A}\mathbb{A}$`), except in literal file paths or code identifiers.
- In markdown content, use relative link targets relative to the current document. Do not use absolute filesystem paths and do not use root-absolute deployment-sensitive targets like `/content/...` or `/Users/...`.
- For textbook-facing prose and notation in `content/markdown/aaa`, follow the Archie guides in `content/markdown/aaa/archie/academic-style-guide.md`, `content/markdown/aaa/archie/mathematics-style-guide.md`, and `content/markdown/aaa/archie/mathematics-terminology.md` as applicable.
- Theory/math-first authoring: prioritize derivations, definitions, geometry, and dynamics; minimize forward-looking TODO/checklist language tied to future observations or experiments unless explicitly requested.
- Use causal-delay terminology in prose (`causal`, `delayed`, `path-history`) and avoid `retard`/`retarded` wording outside literal quotations or code identifiers.
- Do not reference the entourage or any entourage member names in `content/markdown/aaa` documents.
- When giving the user step-by-step instructions, first provide a short overview of the steps, then deliver the detailed explanation one ELI5 step at a time.
- When asking the user questions needed to proceed, ask them one at a time and phrase each question in ELI5 terms.

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
