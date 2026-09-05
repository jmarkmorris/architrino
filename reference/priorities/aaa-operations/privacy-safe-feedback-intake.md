# Privacy-Safe Public Feedback Intake

## Accepted Path

OPS-012 is closed by one reproducible public intake path:

1. Open [the feedback page](../../../feedback.html).
2. Identify the affected public pathname without a query string or fragment.
3. Optionally expand **Optional: include diagnostic details**, review the locally generated `architrino.public-feedback-manifest.v1` record, and copy it.
4. Open the dedicated public GitHub issue form, write the report there, and optionally paste the reviewed diagnostic details.
5. Review the complete public issue before submitting it.

The machine-checkable boundary is [feedback-intake-policy.v1.json](feedback-intake-policy.v1.json). Opening the feedback page does not create an issue, send analytics, contact GitHub, or read the clipboard. The diagnostic generator requests only the same-origin public scene index, markdown index, and scene graph. GitHub is contacted when the reader selects the issue link; the report is submitted only when the reader submits its form.

The diagnostic report is visible before it leaves the browser. The reader controls copying, opening GitHub, editing the report, and final submission.

Diagnostic details are collapsed by default and optional both on the feedback page and in the GitHub form. They help reproduce browser or deployment problems, but their absence does not prevent submission. The feedback page prepares optional troubleshooting information and links to the form; the reader writes and submits the issue on GitHub. Details are not automatically attached to that form.

## Navigation

From the home scene, follow **Archie → User Interface → Webapp Feedback**. The Webapp Feedback sphere launches `feedback.html` through the canonical standalone-app route resolver. The Contact link in About the Webapp remains an additional entry point.

The authored sphere and route are implemented. The generated scene index and graph require refresh with `node scripts/validate-content.mjs --write --strict` followed by `node scripts/build-scene-graph.mjs --write --strict`, then their corresponding `--check --strict` commands. Until that refresh, generated search discovery does not include the new scene.

The feedback page uses the shared standalone navigation bar for table of contents, Back, Forward, Home, and scene search. Home opens the site root because feedback is reached from documentation and can concern any public page. Back and Forward follow browser history, allowing the reader to return to the referring document. The former Applications text link incorrectly implied that feedback belonged to the application launcher.

The shared runtime owns the icons, accessible labels, keyboard behavior, and search panel. Feedback styles are scoped to the form so they do not replace the shared controls' appearance. The narrow layout reserves a row above the title for the controls. Scene search loads the same public scene graph used by the diagnostic generator. Home and table-of-contents navigation use the shared session return marker; that navigation record is not included in the diagnostic manifest.

The navigation update has scoped browser verification, but it does not inherit the older release and performance receipts. The release profile declares a four-file code dependency set and a 32,768-byte ceiling; shared navigation expands that set to fifteen files and exceeds that ceiling. Its canonical controls are 32 CSS pixels tall, below the feedback profile's older 42-pixel floor. Before publication, review these profile assumptions against the shared-navigation requirement and collect new source-bound evidence. Preserve the historical receipts; changing their hashes or relaxing thresholds alone would not establish a passing release.

## Reproducibility Fields

The generated manifest records the reported public pathname, coarse device class, browser family and major version, operating-system family, viewport-width bucket, device-pixel-ratio bucket, browser language, generation time, and the availability, last-modified header, and entry counts of three public runtime manifests.

The three build-facing records are:

- `content/scenes/scenes_index.json`
- `content/markdown/markdown_index.json`
- `content/graph/scene_graph.json`

Their counts and response timestamps help distinguish a stale or incomplete deployment from a browser-only presentation problem. They do not identify a source commit and are not a release receipt.

Plainly: a report can show what kind of browser was used and whether the public content indexes came from the same visible deployment, without collecting a detailed device fingerprint.

## Privacy Boundary

The generator omits the raw user-agent string, URL query and fragment, cookies, local and session storage, clipboard contents, local file names and contents, WebGL renderer, and account identifiers. It writes the already visible manifest to the clipboard only after the Copy action and never reads clipboard contents. Page input is reduced to a same-origin pathname.

The GitHub form warns that issues are public and requires the reporter to confirm that private workflow and identifying material were removed. Free-form problem descriptions and screenshots are controlled by the reporter and therefore remain a human review boundary rather than an automatic privacy guarantee.

Plainly: the automatic part has a narrow allowlist. A person can still paste sensitive material into a public issue, so the form makes the public boundary explicit and requires a final confirmation.

## Failure And Retention Behavior

If one public manifest cannot be fetched, the record says `unavailable` or names the HTTP status; it does not infer that the deployment lacks the file. If clipboard writing is unavailable, the visible manifest is selected for manual copy. The generator keeps no local history. Once submitted, the report follows GitHub's public issue retention and moderation behavior.

The intake must be reopened if it begins sending automatically, includes any forbidden field, loads executable code from a third party, allows a cross-origin manifest request, hides the generated record before submission, or stops requiring public-data confirmation.
