# Architrino MCP Brainstorming

This file holds provisional ideas for the `app-mcp` workstream. Promote an idea into [priorities.md](priorities.md) or a focused contract only when it has a concrete owner, completion boundary, source-authority rule, and validation path.

## Ideas

- Consider a compact `capabilities` resource or tool that returns supported tool schemas, snapshot freshness, service version, and declared limits without exposing internal deployment details.
- Explore a user-selectable retrieval budget expressed as maximum records, characters, graph depth, and response bytes so clients can build context without hidden truncation.
- Measure deterministic-search recall with a reviewed question set before introducing embeddings. Use misses to define the semantic fallback's job rather than adding embeddings by default.
- Consider precomputed typed graph-path caches only after ordinary bounded traversal is profiled. Cost and latency claims require measurement.
- Explore client-facing deep links that open the matching Architrino GitHub Pages route while returning repository paths separately for developer clients.
- Consider signed snapshot manifests if clients need to verify that an index was built from the declared repository commit. The signing and key-distribution model needs a separate security decision.
- Preserve the possibility of a private operator profile that can retrieve priority material, but do not mix that visibility with the public service or public cache keys.
