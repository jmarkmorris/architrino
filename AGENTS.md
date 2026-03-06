# Project Notes For Agents

- Math rendering target is `KaTeX` in the web app context.
- Preserve TeX delimiters and content exactly (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`).
- Do not allow markdown emphasis parsing to mutate TeX subscripts/superscripts (for example `_i`, `^2`).
- When using the TLA AAA in prose/math, always use the stylized form `$\mathbb{A}\mathbb{A}\mathbb{A}$` (code: `$\mathbb{A}\mathbb{A}\mathbb{A}$`), except in literal file paths or code identifiers.
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
