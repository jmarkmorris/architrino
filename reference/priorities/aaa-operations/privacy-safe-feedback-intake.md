# Privacy-Safe Public Feedback Intake

## Accepted Path

OPS-012 is closed by one reproducible public intake path:

1. Open [the feedback page](../../../feedback.html).
2. Identify the affected public pathname without a query string or fragment.
3. Review and optionally copy the locally generated `architrino.public-feedback-manifest.v1` record.
4. Open the dedicated public GitHub issue form and paste the reviewed manifest.
5. Review the complete public issue before submitting it.

The machine-checkable boundary is [feedback-intake-policy.v1.json](feedback-intake-policy.v1.json). Opening the feedback page does not create an issue, send analytics, contact GitHub, or read the clipboard. The page requests only the same-origin public scene index, markdown index, and scene graph. GitHub is contacted only after the reader selects the issue link, and GitHub does not receive anything until the reader submits its form.

Plainly: the diagnostic report is visible before it leaves the browser. The reader controls copying, opening GitHub, editing the report, and final submission.

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
