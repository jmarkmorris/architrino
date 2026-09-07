# Domain, DNS, And Certificate Inventory — 2026-09-01

## Scope And Measurement Boundary

This record inventories the public Architrino web origin, its DNS delegation, redirect routes, GitHub Pages binding, and TLS certificate. Measurements were taken from the active checkout and the public network at `2026-09-02T01:24:35Z` through `2026-09-02T01:25:24Z`, corresponding to the evening of 2026-09-01 in the operator's local time.

The live observations are measured claims produced by `dig`, `curl`, `openssl`, the GitHub Pages REST API, and Verisign RDAP. They establish what those interfaces returned during the observation window. They do not prove future availability, registrar-account control, automatic renewal, or application correctness.

## Result

The public site has one operational canonical origin: `https://www.architrino.com`. The repository `CNAME`, GitHub Pages API, live redirects, and QR-code source all agree on that origin. The apex domain, both HTTP variants, and the GitHub project-domain route redirect to it while preserving tested paths. The canonical root and a representative standalone app route returned `200`; an intentionally nonexistent route returned `404`.

The current certificate is valid for both `architrino.com` and `www.architrino.com`, chains successfully to a trusted root, and remained valid beyond both 30-day and 60-day check thresholds at measurement time. No outage or certificate-name mismatch was observed.

## Ownership And Authority

| Layer | Current authority or provider | Operational owner | Evidence and check |
| --- | --- | --- | --- |
| Domain registration | IONOS SE, registrar IANA ID `83` | Operator's registrar account; credentials and renewal settings are intentionally outside the repository | Verisign RDAP reported registration on `2026-02-16`, expiration on `2027-02-16`, and `client transfer prohibited`. Recheck through RDAP and the registrar account before the renewal date. |
| Authoritative DNS | Four `ui-dns` nameservers with a `1und1.com` SOA contact | Operator's DNS-provider account | Query every authoritative nameserver for the apex `A` set and `www` `CNAME`; all four agreed during this audit. |
| Pages domain declaration | Repository-root [`CNAME`](../../../../CNAME) containing `www.architrino.com` | Repository maintainers | Confirm the built payload retains this exact file and compare it with the Pages API `cname` and `html_url` fields. |
| Site deployment | GitHub Pages for `jmarkmorris/architrino`, built by Actions from `main` | [`pages.yml`](../../../../.github/workflows/pages.yml) and `aaa-operations` | Pages API reported `status=built`, `build_type=workflow`, `public=true`, and `https_enforced=true`. The workflow is the deployment authority. |
| Redirect and edge serving | GitHub Pages / GitHub edge | GitHub Pages configuration, monitored by `aaa-operations` | Run the route matrix below and require one redirect at most before the canonical response. |
| TLS certificate | GitHub Pages-managed Let's Encrypt certificate | GitHub Pages manages issuance; `aaa-operations` monitors status and expiry | Pages API reported `approved`, both domain names, and expiry on `2026-11-15`; `openssl` independently verified the served certificate and trust chain. |
| Application paths | Static payload produced by the repository builder | The owning app or corpus lane owns content; `aaa-operations` owns public routing checks | Test the root, one representative `.html` app, one asset route during release-gate work, and one deliberate missing route. |

The repository proves the intended deployment owner and domain binding, but it cannot prove who can sign in to the registrar or DNS-provider accounts. Loss of those credentials or disabled renewal would falsify the administrative-ownership assumption and must be checked in the provider account.

## DNS Inventory

| Name and type | Measured value | TTL | Disposition |
| --- | --- | ---: | --- |
| `architrino.com A` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | 300 | Matches GitHub's documented Pages apex set. |
| `architrino.com AAAA` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` | 300 | Matches GitHub's documented Pages IPv6 apex set. |
| `www.architrino.com CNAME` | `jmarkmorris.github.io.` | 300 | Matches the repository owner and GitHub Pages subdomain pattern. |
| `architrino.com NS` | `ns1018.ui-dns.com.`, `ns1028.ui-dns.biz.`, `ns1039.ui-dns.de.`, `ns1071.ui-dns.org.` | 86400 | All four returned the same apex and `www` answers. |
| `architrino.com SOA` | Primary `ns1018.ui-dns.com.`, contact `hostmaster.1und1.com.`, serial `2017060126` | 86400 | Identifies the live authoritative zone family; the serial should change after a provider-side zone edit. |
| `architrino.com MX` | `mx00.ionos.com.` and `mx01.ionos.com.`, preference 10 | 3600 | Mail routing exists but is not a Pages route. Mail-security review is outside OPS-010. |
| `architrino.com TXT` | `v=spf1 include:_spf-us.ionos.com ~all` | 3600 | Mail policy only; it does not verify the Pages domain. |
| `architrino.com CAA` | No answer | — | No DNS restriction on certificate authorities was observed. Route to OPS-011 for a policy decision rather than changing it during this inventory. |
| `architrino.com DS` | No answer | — | No parent-zone DNSSEC delegation was observed. Route to OPS-011 for a provider-capability and policy decision. |
| `_github-pages-challenge-jmarkmorris.architrino.com TXT` | No answer | — | The durable public verification record recommended by GitHub was not observable. This does not prove the account lacks an internal verification state; confirm in the GitHub account and add or retain the prescribed TXT record if verification is incomplete. |
| Random subdomain control | No `A` or `CNAME` answer for `ops010-wildcard-check.architrino.com` | — | No wildcard was observed, which avoids the wildcard takeover exposure GitHub warns against. |

GitHub's current [custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) lists the same four apex IPv4 addresses, four apex IPv6 addresses, and `USERNAME.github.io` subdomain target. Its [domain-verification procedure](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) recommends retaining the `_github-pages-challenge-USERNAME` TXT record.

## Route And Redirect Matrix

| Public route class | Measured first response | Measured final result | Owner and acceptance check |
| --- | --- | --- | --- |
| `http://architrino.com/*` | `301` | `https://www.architrino.com/*` | GitHub Pages; require the path-preserving HTTPS canonical redirect. |
| `https://architrino.com/*` | `301` | `https://www.architrino.com/*` | GitHub Pages; require the path-preserving canonical-host redirect. |
| `http://www.architrino.com/*` | `301` | `https://www.architrino.com/*` | GitHub Pages; require HTTPS enforcement without changing the path. |
| `https://www.architrino.com/` | `200` | Same URL, zero redirects | Canonical public root; release checks must require an HTML response from GitHub Pages. |
| `https://www.architrino.com/equation-mapping.html` | `200` | Same URL, zero redirects | Representative standalone app route; app-equation-mapping owns content and operations owns reachability. |
| `https://jmarkmorris.github.io/architrino/*` | `301` | `https://www.architrino.com/*` | GitHub Pages project domain; require convergence on the custom domain with path preservation. |
| Deliberately nonexistent canonical path | `404` | Same URL | GitHub Pages; correct negative control because the repository declares no custom 404 page. |

The route matrix tested both `/` and `/equation-mapping.html`; the project-domain negative control also preserved the missing path before returning `404`. This samples route classes rather than proving every payload file. OPS-003 should reuse the same checks against the complete release manifest.

## TLS Inventory

| Field | Measured value |
| --- | --- |
| Served subject | `CN=www.architrino.com` |
| Subject alternative names | `architrino.com`, `www.architrino.com` |
| Issuer | Let's Encrypt `YR1` |
| Valid from | `2026-08-17T08:13:52Z` |
| Valid through | `2026-11-15T08:13:51Z` |
| Serial | `05DB96099821A33676421D571A20237867DD` |
| Verified negotiation | TLS 1.3, `TLS_AES_128_GCM_SHA256`, trust verification `OK` |
| GitHub Pages API | Certificate `approved`; HTTPS enforcement enabled |
| 30-day and 60-day checks | Both passed at measurement time |

The certificate is short-lived and GitHub-managed. Its current validity does not prove renewal. The operational check should alert when the Pages API is not `approved`, either host is absent from the certificate, HTTPS enforcement is false, trust verification fails, or less than 30 days remain.

## Canonical-URL Consistency Finding

The operational canonical host is `www.architrino.com`, but some canonical sources still emit or link to `https://architrino.com`. The main functional instance is `ARCHITRINO_WEB_BASE_URL` in [`scripts/ios-textbook-link-routing.mjs`](../../../../scripts/ios-textbook-link-routing.mjs), which causes generated iOS public-web routes to incur the apex-to-`www` redirect. Two reader-facing Archie documents also use the apex URL, while the QR-code source and several other reader-facing documents already use `www`.

This is a measured consistency defect, not an outage: all tested apex links reached the correct path after one redirect. OPS-010 records it without changing authored links or regenerating packages. A later scoped canonical-URL cleanup should change canonical sources first, update tests, and regenerate only under explicit regeneration or final branch/PR authority.

## Reproducible Checks

Run these checks from a network that can reach public DNS, GitHub, and the site:

```bash
dig +noall +answer architrino.com A
dig +noall +answer architrino.com AAAA
dig +noall +answer www.architrino.com CNAME
dig +noall +answer architrino.com NS
dig +noall +answer architrino.com CAA
dig +noall +answer architrino.com DS
dig +noall +answer _github-pages-challenge-jmarkmorris.architrino.com TXT
gh api repos/jmarkmorris/architrino/pages
curl -sS -I http://architrino.com/
curl -sS -I https://architrino.com/equation-mapping.html
curl -sS -I http://www.architrino.com/
curl -sS -I https://www.architrino.com/
curl -sS -I https://www.architrino.com/equation-mapping.html
curl -sS -I https://jmarkmorris.github.io/architrino/equation-mapping.html
openssl s_client -connect www.architrino.com:443 -servername www.architrino.com -verify_return_error </dev/null
```

The DNS answer sets are invalid if they contain an address outside the documented GitHub Pages values, if `www` no longer targets `jmarkmorris.github.io`, if authoritative nameservers disagree, or if an unexpected wildcard answer appears. The routing record is invalid if tested paths stop converging on `https://www.architrino.com`, the canonical route does not return its expected status, the Pages API no longer identifies the same custom domain, or the certificate/HTTPS checks fail.

## Disposition

OPS-010 is complete as an inventory and owner/check contract. No DNS record, domain setting, certificate, redirect, deployment workflow, source link, generated package, or application route was changed.

The remaining observations route as follows:

- GitHub account-level domain verification requires an operator-visible settings check because the expected public TXT proof is absent.
- DNSSEC, CAA, HSTS, and mail-security dispositions belong to OPS-011.
- Canonical-source URL cleanup is safe implementation work but requires a separately accepted task because it touches generated-link inputs and downstream tests.
- Full payload-route coverage belongs to the OPS-003 release gate, using the static release manifest rather than a hand-maintained path list.
