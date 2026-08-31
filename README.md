# Architrino

Architrino is the source repository for `architrino.com`. It combines the $\mathbb{A}\mathbb{A}\mathbb{A}$ theory corpus, the interactive Architrino Assembly Architecture web app, generated textbook/scene artifacts, and a set of standalone research and visualization applications.

The repo is intentionally content-heavy. Most public pages are not handwritten HTML pages; they are scene JSON files that point to markdown, generated graph manifests, and browser runtimes.

## Run Locally

Use the local web server so browser ES modules, JSON, markdown, images, and WASM assets load with the same path model as the deployed site.

```bash
node scripts/dev/start-local-dev.mjs
```

Then open:

```text
http://127.0.0.1:5173/
```

To use another port:

```bash
PORT=5174 node scripts/dev/start-local-dev.mjs
```

There is no `npm install` step for ordinary local serving. The root app is served from `index.html`, `app.js`, `style.css`, `vendor/`, `content/`, `src/`, and the standalone HTML entrypoints in the repo root.

The local server prepares Borg playback records, the equation registry, and the full-corpus source index before listening. These outputs are built from tracked sources. During the Pages proof phase their tracked copies remain available for the old publisher; only the second migration PR removes them after live Actions verification. For a separate static server or direct focused tests without saved outputs, run `node scripts/prepare-runtime-assets.mjs --write` once first. `npm test` includes this setup automatically. Repeating setup leaves unchanged output files untouched.

## Web App

The default web app is the Architrino Assembly Architecture scene navigator. Its root scene is:

```text
content/scenes/architrino_assembly_architecture.json
```

The root scene organizes the corpus into these top-level areas:

- Foundations
- Dynamics
- Noether Braid
- Noether Sea and Effective Spacetime
- Standard Model Assemblies
- Atomic and Nuclear Assemblies
- Reactions
- Quantum
- Cosmology
- Validation
- Philosophy-History
- Project, documentation, applications, and outreach material

The navigator renders the explicit scene network as interactive sphere layouts. Users can descend into scene children, open linked markdown, search the scene manifest, use the textbook table of contents, and open standalone apps from app scenes.

Basic controls:

- Click or tap a sphere to enter a linked scene or open its action.
- Drag to pan.
- Pinch or trackpad-pinch to zoom.
- Use the toolbar for search, home, back/forward navigation, document view, PDF export, and textbook navigation where available.

## Public Applications

The public Applications scene is the source of truth for the app list shown in the navigator:

```text
content/scenes/archie/applications.json
```

Current application and application-like surfaces include:

- A1 Lorentz Geometry: `ideal-braid.html`
- Photon and Polarization Visualization App: `photon.html`
- Causal Delay Feedback: `causal-delay-feedback.html`
- Equation Mapping: `equation-mapping.html`
- It's Greek to Me! — Alpha to Omega: `greek-letter-match.html`
- Animator: `animator.html`
- Borg App: `borg.html`
- Molecule Visualization: `molecule.html`
- Periodic Table, Hyde Periodic Table, Atom, and Standard Model scene surfaces

Standalone app launch routing lives in:

```text
src/apps/navigator/StandaloneAppLaunchRuntime.js
```

App runtime code is under `src/apps/`. EOM under `src/eom/` is the endorsed solver and sole forward production target. New app and simulation work routes through its contracts and recorded datasets.

## Content Model

Canonical authored content lives under:

```text
content/markdown/aaa/
```

The main corpus folders cover foundations, dynamics, Noether Braid, spacetime, assemblies, nuclear and atomic structure, reactions, quantum, cosmology, validation, philosophy-history, proof programs, and project-facing guides.

Scene files live under:

```text
content/scenes/
```

Scene files define the explicit navigation network. Authored scene fields include:

- `objects[]`
- `objects[].subScenes[]`
- `objects[].markdownPath`
- `objects[].markdownSection`

Generated artifacts are derived from those authored sources. Do not hand-edit generated files during ordinary content work.

Important generated outputs include:

- `content/scenes/scenes_index.json`
- `content/markdown/markdown_index.json`
- `content/graph/scene_graph.json`
- `content/graph/runtime_routes.json`
- `content/graph/textbook_toc.json`
- `content/generated/markdown/textbook/toc.md`
- `content/generated/markdown/textbook/reading-copies/`
- `content/generated/pdf/textbook/review-copies/`
- `reference/op/agent-startup-orientation.generated.md`

The [iOS Reader](apps/ios/ArchitrinoReader/README.md) and its package exporter are retained development capabilities. Its textbook package is generated on demand, not refreshed or freshness-gated on every PR. App Store release is deferred until theory closure and an explicit operator release decision.

The [children's-book pilot](reference/learning-office/childrens-books/production/README.md) likewise retains its sources and verified layout recipe. Its pages, PDFs, social derivatives, and review bundles are on-demand local exports, not routine PR or website outputs.

## Common Commands

Focused content and graph checks:

```bash
node scripts/validate-content.mjs --check --strict
node scripts/build-scene-graph.mjs --check --strict
node scripts/build-agent-startup-orientation.mjs --check
node scripts/build-textbook-md-pdf.mjs --check
```

Regenerate generated content only when a check reports drift or when the work requires refreshed generated output:

```bash
node scripts/validate-content.mjs --write
node scripts/build-scene-graph.mjs --write --strict
node scripts/build-agent-startup-orientation.mjs --write
node scripts/build-textbook-md-pdf.mjs --write
node scripts/build-textbook-review-pdfs.mjs --write
```

Focused app-routing and runtime checks:

```bash
node --test tests/standalone-app-launch.test.js
node scripts/check-animator-runtime-wiring.mjs
```

Full integrity gate before push:

```bash
node scripts/check-content-integrity.mjs
node scripts/check-animator-runtime-wiring.mjs
```

Python scripts should use the shared environment when needed:

```bash
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" <script>
```

## Repository Map

- `index.html`, `app.js`, `style.css`: root web app shell.
- `*.html` at the repo root: standalone browser app entrypoints.
- `src/apps/architrino/`: scene navigator runtime.
- `src/apps/`: standalone application runtimes and app-specific modules.
- `src/services/`, `src/runtime/`, `src/domain/`: shared runtime, service, and domain helpers.
- `content/markdown/aaa/`: authored corpus markdown.
- `content/scenes/`: authored scene JSON plus generated scene index.
- `content/graph/`: generated scene graph, runtime routes, and textbook TOC manifests.
- `content/generated/`: generated reading copies and review PDFs.
- `reference/op/agent-startup-orientation.generated.md`: generated compact startup orientation for repo agents.
- `scripts/`: validators, generators, solver/proof tooling, and local dev utilities.
- `tests/`: Node and Python tests for runtime, content, solver, and proof artifacts.
- `reference/`: operator procedures, priority workstreams, architectural decisions, research notes, and non-public staging material.
- `apps/ios/`: iOS reader project and reader assets used by the web app.

## Deployment

The public site is transitioning from branch publishing to the GitHub Pages workflow in `.github/workflows/pages.yml`. Keep the current custom-domain and HTTPS settings. Leave the repository Actions variable `ARCHITRINO_PAGES_DEPLOY_ENABLED` unset or `false` for the first merge, which retains the old publisher's generated files and still triggers the existing branch deployment. The new workflow only builds and tests until explicitly enabled. After merge verification, follow the [two-stage cutover and rollback procedure](reference/op/machine-artifact-retention.md#two-stage-pages-cutover) to switch Pages to **GitHub Actions**, enable deployment, and verify the live apps and generated data. Remove tracked runtime files only in a second PR after that live acceptance.

The workflow validates source, proves reconstruction in a source-only temporary checkout, builds an isolated site directory, and publishes that directory without committing its build output. Deployment requires `ARCHITRINO_PAGES_DEPLOY_ENABLED=true`, a push or manual run on `main`, a successful build, and a Pages publishing source of GitHub Actions. PRs validate and build but cannot publish. The transient Pages upload is retained for one day. Local equivalent: `node scripts/build-static-site.mjs --out .tmp/site` (the destination must be empty). The builder copies only tracked non-hidden files and declared generated runtime outputs; it never copies `.git`, ignored local runs, or unrelated files from the checkout.

Source history remains in Git. Easily regenerated runtime payloads leave Git tracking after the publishing path is proven. See [Machine Artifact Retention](reference/op/machine-artifact-retention.md) for the storage budget, setup contract, temporary retained set, and historical-cleanup boundary.

## Commit And Push Checks

Git hooks are configured through `.githooks`.

The pre-commit hook checks content references, the scene graph, textbook reading copies, receiver-weighted compatibility status, current Master Equation terminology, notation drift, and animator runtime wiring.

The pre-push hook runs the Content Integrity gate and animator runtime wiring audit.

## License

Project-authored code and documents are licensed under the [MIT License](LICENSE), Copyright (c) 2026 J Mark Morris. Bundled third-party libraries, datasets, images, and derivatives retain their own licenses and attribution requirements; see [Licenses, Attribution & Source Use](content/markdown/aaa/archie/licenses-attributions.md).

For the policy on selecting and presenting references, see [About Architrino](content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution); its [research and review disclosure](content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review) explains source checking. These editorial rules do not replace item-specific license requirements.
