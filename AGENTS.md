# Project Notes For Agents

- Math rendering target is `KaTeX` in the web app context.
- Preserve TeX delimiters and content exactly (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`).
- Do not allow markdown emphasis parsing to mutate TeX subscripts/superscripts (for example `_i`, `^2`).
- Theory/math-first authoring: prioritize derivations, definitions, geometry, and dynamics; minimize forward-looking TODO/checklist language tied to future observations or experiments unless explicitly requested.

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
