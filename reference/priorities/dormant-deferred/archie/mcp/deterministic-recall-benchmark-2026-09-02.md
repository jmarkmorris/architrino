# MCP Deterministic Recall Benchmark — 2026-09-02

## Scope And Authority

This is a reviewed retrieval benchmark over the immutable full-corpus source-index snapshot. It measures whether the existing `topics`, `search`, `read`, `neighbors`, and `walk` tools can retrieve source-grounded public material for eight representative natural-language questions and five exact or graph retrieval obligations. It does not judge the scientific truth of the returned material, raise any source's authority, or authorize remote deployment.

Plainly: this benchmark asks whether the source can be found and loaded with its existing labels. Finding a page is not proof that every claim on it is correct.

The reviewed expected sources are declared in [`mcp-deterministic-recall-benchmark.v1.json`](../../../../../tests/archie-service/fixtures/mcp/mcp-deterministic-recall-benchmark.v1.json). They cover fixed-void cosmology, clock recovery, magnetic-emergence wording, prescribed-versus-evolved geometry, generated-source ownership, causal-root acceleration, claim grades and falsifiers, and emergent mass. Each expected source was selected from the authored repository material before the retrieval change was evaluated.

## Baseline Failure

The prior search path scored exact phrases or required every raw query token to occur in indexed text. On the eight frozen questions, including punctuation and ordinary question words, it returned a nonempty top-10 result for 0 of 8 cases. The failure was reproducible against the current full-corpus snapshot and did not affect exact `read`, deterministic `topics`, or declared-edge graph traversal.

Plainly: words such as “why” and a trailing question mark made otherwise ordinary questions miss relevant pages.

## Deterministic Repair

The search engine retains all prior exact rules and adds a fallback only for records that otherwise score zero. The fallback:

- tokenizes Unicode letters and numbers and therefore removes punctuation from matching;
- removes one fixed, source-controlled list of question and function words;
- requires at least 60% coverage and at least two matching tokens for a multi-token query;
- applies fixed weights for title, alias, keyword, route, and indexed-content matches;
- preserves the existing stable source-id tie-break and explicit authority preference; and
- performs no stemming, inferred synonym expansion, model call, embedding lookup, repository scan, or visibility bypass.

The executable checker is [`check-mcp-deterministic-recall-benchmark.mjs`](../../../../../scripts/archie-service/check-mcp-deterministic-recall-benchmark.mjs). It drives the public tool contracts directly, follows pagination, verifies all expected source identities, requires exact read fragments and source authority, and rejects any non-public or `priority_only` result.

## Measured Result

| Measure | Result |
| --- | ---: |
| Natural-language `search` recall at 10 | 8/8 |
| Exact `read` recall | 2/2 |
| `topics` enumeration cases | 1/1 |
| `neighbors` and `walk` graph cases | 2/2 |
| Public visibility or priority-authority leaks | 0 |
| Embedding or model calls | 0 |

The existing MCP contract fixture remained byte-for-byte valid because the new fallback activates only for records that receive no score from the earlier rules. The focused seven-test tool-contract suite passed unchanged.

Plainly: all reviewed retrieval needs now close through deterministic source text and declared graph structure. The fallback did not rewrite old successful rankings or open hidden material.

## MCP-003 Outcome And Embeddings Decision

MCP-003 passed: its reviewed benchmark exposed the baseline deterministic-search defect, the bounded lexical repair corrected that defect, and every declared acceptance case passed without a visibility or authority leak. Separately, the embeddings implementation proposal received a measured negative decision because no residual reviewed case requires approximate semantic similarity. Do not add an embedding model, external provider, private vector store, embedding freshness pipeline, semantic cost center, or semantic authority layer on the present evidence.

The decision is falsified if a later reviewed natural-language benchmark identifies an important public source that remains unreachable by reasonable deterministic token, title, route, exact-read, topic, or declared-graph methods. Any future embedding proposal must then separately define and enforce model identity, privacy, freshness, measured cost, visibility filtering before and after ranking, repository-source provenance, deterministic fallback behavior, and a prohibition on authority promotion before implementation.

Plainly: MCP-003 succeeded. Only the proposal to add embeddings was declined; semantic retrieval remains a possible later fallback, but it has no measured job to do today.

Closure goal: preserve source-grounded deterministic retrieval and reconsider embeddings only after a reviewed residual recall failure survives reasonable deterministic repair.
