---
name: math-preview
description: Render math-heavy Markdown, notation tables, or drafted explanations as a verified KaTeX browser preview and readable PNG excerpts. Use when ordinary chat or Markdown rendering is inadequate or the user requests a mathematical preview; simple equations do not require it.
---

# Math Preview

Show readable, accurately rendered mathematics while preserving the source.

Use the repository's bundled Markdown-It, KaTeX, fonts, and app colors through [the helper](scripts/render-preview.mjs). This is an on-demand local presentation workflow, not a corpus generator or mathematical verifier. Do not change formulas, source documents, app code, or generated publication artifacts to make a preview render.

Prose written around a preview, and the response that delivers it, follow [the operator explanation standard](../../../reference/op/operator-explanation-standard.md), which owns audience, explanation density, and response shape.

## Render

1. Identify the requested document or section. For newly drafted explanations, save the exact intended Markdown in the task's writable artifact directory first. Preserve code examples and all four TeX delimiter forms. Do not substitute Unicode approximations or generated artwork for equations.
2. Choose an absolute HTML output path in the task's supplied artifact directory, or a temporary directory when none is supplied. Do not hardcode a previous task's directory or port. The default theme is the app's purple background and white text; use `--theme light` only when requested or appropriate for the deliverable.
3. Run from the repository root, substituting actual quoted paths:

   ```bash
   node .agents/skills/math-preview/scripts/render-preview.mjs --input INPUT.md --output OUTPUT.html --serve
   ```

   The helper creates one self-contained HTML snapshot and prints its local preview URL. It serves only that single output file, not a repository directory.

4. Read the JSON receipt: source hash, selected section, math count, image omissions, output path, and server URL. Rendering failures stop before replacing an existing preview; report the offending expression without silently changing it. Check `--help` for options. `--section "Exact heading text"` includes that heading and its subsections, stopping before the next peer or parent heading. An absent or ambiguous heading is an error.
5. For a long document, keep the full HTML and render a second output with `--section` for the requested image. Avoid one extremely tall screenshot with unreadable text. The preview intentionally disables source links and lists images without fetching them; tell the user if those omissions matter. Navigation within the preview remains usable.

## Display and capture

- Use the browser tools available in the current environment and their documented APIs, following any applicable browser skill. Follow the user's browser selection and the tools' permission rules; report a blocked action or unavailable capability. This skill does not authorize an alternate browser or permission bypass. Do not navigate to local file URLs; use the helper's loopback URL for the deliberately limited preview. The dedicated port is intentional because the artifact is outside the web-app tree. Do not restart the shared app server for this workflow.
- Keep the helper's command session and printed PID associated with this task. Reuse an owned preview server by rendering to the same registered output and reloading the tab. It reads that exact HTML file on each request. Never stop another task's server. A saved HTML file remains usable after its preview server stops; the URL is temporary.
- Open or claim the appropriate preview tab. Check the visible page, KaTeX error elements, and font readiness before taking the screenshot. Use the normal browser viewport or a full-page capture of a bounded excerpt; do not resize solely to make a screenshot prettier.
- Save the screenshot as PNG in the artifact directory, then inspect it. Verify legible subscripts, superscripts, bold vectors, fractions, white math on purple, and unclipped table content. Fix presentation issues in the preview template, not in the source mathematics. A parse pass alone does not establish visual quality.
- Leave the full document open as a browser deliverable when the user wants it. Include the PNG inline in the final reply and link the standalone HTML, so the reader gets the full document for browsing and a legible image inside the conversation. Distinguish source preservation and rendering checks from mathematical correctness. State that these are snapshots; rerender after source edits. The Markdown source stays authoritative, and the screenshot is a checked view of one particular version of it.

## Maintain

Keep this helper as the owner of disposable math previews. Reuse the existing library loader and app palette; do not copy vendor bundles or route normal textbook/app builds through this skill. Change the shared preview template for presentation fixes rather than accumulating per-document CSS patches.

Run `node --test tests/math-preview.test.js` after helper changes, then exercise a real document through the browser. Use the Skill Creator validator for skill metadata changes. Do not run corpus regeneration merely because this skill or its routing guidance changed; report generated guidance drift under the repository's normal policy.
