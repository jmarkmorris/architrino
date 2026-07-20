# Architrino MCP Work Log

This file is the chronological work log for the `app-mcp` priority area. Use it for dated implementation status, validation evidence, failed paths, deployment measurements, adjudications, and handoffs. Keep provisional ideas in [brainstorming.md](brainstorming.md), the compact live queue in [priorities.md](priorities.md), and stable architecture or contract detail in focused sibling files.

## Log Entries

### 2026-07-20 - Priority Packet Seeded

- Created the `app-mcp` priority packet from the operator-provided Architrino MCP architecture proposal.
- Preserved the central decision: the repository remains authoritative, GitHub Pages remains the human interface, and a separately deployed MCP service reads immutable generated indexes.
- Aligned the generic starting directory sketch with the live repository: authored corpus under `content/markdown/aaa/`, scenes under `content/scenes/`, graph artifacts under `content/graph/`, and existing service contracts and source-index checks under the Archie service paths.
- Corrected the web math-rendering reference from MathJax to the repository's KaTeX target.
- Kept the hosting order as an unverified candidate ranking because provider pricing, limits, and protocol support are time-sensitive.
- Narrowed V1 to `search`, `read`, `topics`, and `neighbors`; staged graph composition tools and semantic retrieval behind explicit contracts and evidence.
- Added fail-closed boundaries for source authority, visibility, priority-material exclusion, canonical parents, proof-status routing, pagination, truncation, and missing sources.
- Left the workstream unranked. Its first unresolved object is the executable `source_index_contract`; a future full priority-scoring pass must compare it with every live bucket before assigning numeric rank, value, cost, or ROI.
- Current repository inspection found an existing check-only Archie source-index scaffold and fixture contracts, but no production MCP runtime or production index writer. That makes reuse of the existing source classes and service boundary the first integration constraint.
