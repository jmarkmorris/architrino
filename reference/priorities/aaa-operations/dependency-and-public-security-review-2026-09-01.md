# Dependency And Public-Security Review — 2026-09-01

## Status And Boundary

OPS-011 is complete at the repository-policy boundary. The review covers the locked npm graph, browser-vendored assets, GitHub Actions references, automatic third-party executable loading, the live public response headers, and the DNS and mail-security controls routed from OPS-010. The machine-checkable source of truth is [public-security-policy.v1.json](public-security-policy.v1.json).

This review did not change a GitHub account setting, DNS record, certificate, mail setting, hosting provider, deployment, or production response. Account-only and provider-only controls have explicit operator dispositions below.

## Dependency And Supply-Chain Result

The project has one exact direct npm dependency, Mermaid. Its lockfile contains 111 non-root production entries and integrity metadata. The first `npm audit --package-lock-only --json` run reported one moderate Mermaid vulnerability group covering five advisories in 11.16.0. Mermaid was advanced to the first patched release, 11.16.1; the checked-in browser bundle, package manifest, lockfile, provenance record, and reader attribution were updated together. A second lockfile audit returned zero known vulnerabilities at the time of the review.

Plainly: the audit found a real issue in the only npm dependency, the browser copy was replaced with the patched byte-for-byte package asset, and the same audit then passed. This result is time-bound: a future advisory can make the same version fail later.

The content-integrity workflow now runs `npm audit --package-lock-only --audit-level=moderate --omit=dev` on every push and pull request. Dependabot checks both npm and GitHub Actions weekly. All five external Actions references were changed from movable major tags to full 40-character commit identifiers, with the major release retained in a comment for review readability. GitHub documents a full commit identifier as the immutable and most secure Action reference.

Plainly: a compromised movable tag can no longer silently change the code used by these workflows. Updating an Action now requires a visible source change.

## Reviewed Public Assets

| Asset | Observed version | Review disposition |
| --- | --- | --- |
| Mermaid | 11.16.1 | Registry package asset with five trailing-space runs normalized for the repository diff gate; package integrity and before/after SHA-256 values are recorded; accepted. |
| markdown-it | 13.0.2 | Frozen reviewed byte with embedded version/license header; accepted, but its next update must add package-integrity provenance. |
| Three.js and CSS2DRenderer | r161 | Frozen matching pair with embedded Three.js revision/license header; accepted, but the next update must add package-integrity provenance. |
| KaTeX | 0.16.11 | Frozen shared web/reader asset with embedded version and bundled license; accepted, and JavaScript, CSS, fonts, and license must move together. |
| Periodic-Table-JSON | unversioned tracked snapshot | Data-only frozen snapshot; accepted subject to CC BY-SA and per-image attribution preservation. |

The versioned policy binds every listed runtime or data snapshot to its current SHA-256. The automated test fails if a reviewed byte changes without a corresponding policy review.

Plainly: the older vendored libraries are not being called freshly sourced just because their files are present. They are accepted as frozen, identified bytes; changing any of them now forces an explicit review.

## Third-Party Browser Code

The source audit found that the Support Architrino Research page dynamically created a script element for `liberapay.com/Architrino/widgets/button.js`. That path was outside the earlier HTML-tag-only negative control. The widget was removed; the existing ordinary Liberapay link remains and contacts Liberapay only after the reader selects it. The source test now includes shared runtime code and rejects dynamic script construction and remote executable JavaScript URLs in addition to remote executable or media HTML tags.

PubChem remains the one explicit external data lookup: the Molecule form sends an unlisted formula only after the disclosed Add action. It is not executable code and remains governed by [observability-policy.v1.json](observability-policy.v1.json).

Plainly: merely reading the site no longer downloads donation-provider code. A reader can still follow the donation link, and the molecule lookup remains an intentional button-driven data request.

## Browser Header Dispositions

The live `https://www.architrino.com/` response returned `200` with GitHub Pages headers but no `Content-Security-Policy` or `Strict-Transport-Security` header. The source has two remaining top-level inline script blocks, so a strict `script-src 'self'` policy would currently break those pages.

- **Content Security Policy:** required follow-up under OPS-003. First remove or externalize the remaining inline executable blocks, then prove Mermaid, KaTeX, workers, fonts, images, and local data under candidate directives. Deploy a real response header on a header-capable host, or prove a static meta policy without weakening it. Until then, the compensating control is no automatically loaded remote executable code.
- **HSTS:** deferred until the deployment path controls response headers. Continue enforcing HTTPS in GitHub Pages and checking HTTP-to-HTTPS redirects. Do not add `includeSubDomains` or request preload until every intended subdomain and the mail boundary are reviewed.

Plainly: CSP and HSTS are not claimed present. Their safe implementation needs deployment work; adding a partially working policy now could disable pages or lock an unready subdomain into HTTPS.

## DNS, Domain, Certificate, And Mail Dispositions

| Control | Live observation | Disposition |
| --- | --- | --- |
| Pages domain verification | No public `_github-pages-challenge-jmarkmorris.architrino.com` TXT answer | Operator action required: verify `architrino.com` in the `jmarkmorris` GitHub account and retain GitHub's exact TXT record. GitHub identifies this as protection against domain takeover. |
| DNSSEC | No parent DS answer | Operator action recommended: enable through IONOS with provider-generated keys, record the disable rollback, and verify DS/DNSKEY validation from two resolvers. |
| CAA | No CAA answer | Deferred until GitHub's complete supported issuer set is confirmed. The current certificate is from Let's Encrypt, but constraining issuance from one observed certificate alone could block a future Pages renewal path. |
| HSTS | Not present | Deferred as described above; HTTPS enforcement and redirect checks remain required. |
| SPF | `v=spf1 include:_spf-us.ionos.com ~all` | Accept the current soft-fail record until every legitimate sender is inventoried. |
| DMARC | IONOS-managed `v=DMARC1; p=none;` | Monitoring-only. Identify a monitored report mailbox and align every legitimate sender before moving to quarantine or reject. |
| DKIM | `s1-ionos` and `s2-ionos` return keys; `s42582890` maps to IONOS but its target key was not returned | Verify DKIM in the IONOS account and inspect a delivered message for aligned DKIM before strengthening DMARC. |

IONOS documents default DKIM activation when its name servers are used, support for CAA records, and DNSSEC support for eligible domains. Provider documentation establishes available controls, not their enabled state for this account.

Plainly: the website is serving correctly, but account ownership proof, DNS signing, certificate-authority restrictions, and stronger anti-spoofing settings are separate changes. Each can cause an outage if applied with an incomplete account or sender inventory, so this review records the exact safe next action instead of changing public infrastructure silently.

## Evidence Sources

- [GitHub secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)
- [GitHub Pages domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [GitHub Pages custom-domain management](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [npm audit command reference](https://docs.npmjs.com/cli/v11/commands/npm-audit/)
- [IONOS CAA configuration](https://www.ionos.com/help/domains/caa-records-konfigurieren/add-change-or-delete-a-caa-record/)
- [IONOS DNSSEC overview](https://www.ionos.com/help/domains/glossary-important-terms-and-topics-explained/dnssec/)
- [IONOS DKIM authentication](https://www.ionos.com/help/domains/configuring-mail-servers-and-other-related-records/email-authentication-with-dkim/)
- [IONOS DMARC configuration](https://www.ionos.com/help/domains/configuring-mail-servers-and-other-related-records/configuring-a-dmarc-record-for-a-domain/)

## Claim Boundary And Falsifiers

The dependency counts, hashes, workflow references, source patterns, response headers, and DNS answers are measured by the named local or public instruments. They do not prove that no undisclosed vulnerability exists, that GitHub or IONOS account settings are correct, that mail authentication aligns on a real message, or that a future response and DNS answer will remain unchanged.

This review must be reopened if `npm audit` reports an advisory, a reviewed hash changes, an Action reference ceases to be a full commit identifier, authored client code automatically loads remote executable code, public headers change, the Pages verification TXT remains absent after operator verification, DNSSEC or CAA is enabled without the stated checks, or a delivered message fails aligned SPF or DKIM.
