# CRW-005 GitHub Presence and Community review — 2026-09-13

## Scope and disposition

Read [GitHub Presence and Community](../../../../content/markdown/aaa/archie/github-presence-and-community.md) in full (121 lines), inspected its concrete local/public routes and related local owner openings, and performed read-only public HTTP checks. Unchanged pass: no chapter-local factual or routing defect identified, and no normative change proposed. The controlled community/editorial policy remains intact.

Only this receipt was written. No post, discussion, issue, message, account setting, Git mutation, source revision, runtime, generated file or shared record was changed. Reading the Git Lifecycle index did not invoke publication.

Baseline/final source SHA-256: `16c081de2d30ab75838c5afe721ef57435363819bd7ce1867712585c032cdc6e`.

Scoped initial `git --no-optional-locks status --short` returned no chapter change. Full byte comparison against HEAD verifies the unchanged disposition.

## Concrete route evidence

- `git remote get-url --all origin` returned the HTTPS Git remote for `jmarkmorris/architrino`, matching the named repository. This establishes the checkout's configured remote, not institutional status or community activity.
- A fresh unauthenticated Node `fetch` request to the [GitHub repository API](https://api.github.com/repos/jmarkmorris/architrino) returned HTTP 200, the matching full name, `private:false`, `has_discussions:true`, `has_issues:true` and default branch `main`. These fields support route and feature availability only; they do not establish contributor identities, posting volume, moderation quality or independent scientific review.
- A fresh GET of [Discussions](https://github.com/jmarkmorris/architrino/discussions) returned HTTP 200 without redirecting to another destination. The document presents the forum as the intended primary conversational venue; it does not claim a measured active community or exclusive participation.
- The public raw `main` version of [Git Lifecycle](https://raw.githubusercontent.com/jmarkmorris/architrino/main/reference/op/git/README.md) returned HTTP 200 and began with the Git Lifecycle title. The corresponding local index was read in full and routes publication rules to their procedure owner. This verifies the chapter's public operating-procedure route without claiming that public main is byte-identical to the current checkout.
- A fresh GET of [architrino.com](https://www.architrino.com) returned HTTP 200 and the normalized trailing-slash URL. This is availability evidence, not a browser interaction, accessibility or deployment-content audit.

The web tool also returned a public repository page, but labeled it as crawled two months ago; its direct Discussions and Git-file opens returned internal errors. Those outputs were not taken as current absence. The fresh HTTP checks above resolved the bounded route questions. No authentication or write request was used.

## Policy and claim review

The document distinguishes discussion, actionable issues and proposed revisions; welcomes cogent defects without requiring a replacement theory; and explicitly rejects reviewer agreement as independent verification. It treats future adaptation into broader knowledge venues as contingent on external editorial and scholarly standards. These passages preserve evidence and institutional-status boundaries.

Community participation, moderation, contributor treatment and submission length are editorial choices owned by the guide. No disagreement with those choices was promoted into a factual defect. Its forecast of possible other community spaces is not a claim that particular official accounts already exist.

The [Research Notebook](../../../../content/markdown/aaa/archie/research-notebook.md) opening was inspected and identifies its contents as dated project memory rather than a substitute for current proof/status owners, consistent with this guide's route to selected developments. The AI-assisted research heading exists in [About Architrino](../../../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review), line 58. No broader notebook or community-history audit was performed.

## Focused validation

A marked-based Markdown link extractor first passed a known genuine-link/fenced-fake-link control. Applied afterward, it found 10 links in the chapter, including 7 existing local target paths. The one local fragment target was checked against its live heading. Full source equality against HEAD preserves all 11 headings, paragraphs and links. The guide contains no TeX spans or standalone displays.

Direct source/receipt whitespace and local-path checks plus scoped `git diff --check HEAD` pass. Node crypto and `shasum -a 256` verify the source digest. Direct receipt checking matters because a new untracked receipt is omitted by ordinary Git diff.

No scientific acceptance, source completeness, account ownership beyond the named public repository, active human collaboration or review quality is inferred from metadata. No chapter-local blocker or follow-up obligation was identified; shared integration belongs to the coordinator.
