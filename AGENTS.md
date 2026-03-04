# Project Notes For Agents

- Math rendering target is `KaTeX` in the web app context.
- Preserve TeX delimiters and content exactly (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`).
- Do not allow markdown emphasis parsing to mutate TeX subscripts/superscripts (for example `_i`, `^2`).
- Theory/math-first authoring: prioritize derivations, definitions, geometry, and dynamics; minimize forward-looking TODO/checklist language tied to future observations or experiments unless explicitly requested.
