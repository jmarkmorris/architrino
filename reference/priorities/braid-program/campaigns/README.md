# Campaigns

One spec per search campaign, named `YYYY-MM-<plain-descriptor>.md`. A campaign spec declares: objective, chart region (coordinates and ranges from ../configuration-chart.md), motion classes expressed, instruments and their accepted-capability basis, predeclared tolerances and gates, coverage table (the searched-territory record), and status line. Results do not accumulate here — they land in ../evidence/ and the spec carries one-line graded pointers.

The first spec in this directory must be the instrument gate: which engine capabilities are accepted for program use and what every campaign must show before its results are booked.

Machine-readable pre-evaluation freezes may also live here when a reviewed campaign design requires exact row and protocol identities before execution. The B1.1 local-landscape freeze is [`b1-1-score-landscape-manifest.v1.json`](b1-1-score-landscape-manifest.v1.json) plus its [`complete-cycle protocol`](b1-1-score-landscape-complete-cycle-protocol.v1.json). These files declare inputs only; their presence does not authorize analytical execution.

The operator-authorized [parallel agent search manifest](parallel-agent-braid-search.v1.json) is a separate dispatch contract for prescribed-geometry and `H1/H2` work. It freezes source hashes, disjoint report-only lanes, unique local output roots, a six-worker aggregate ceiling, one coordinator, and one database writer. Its F5 `H3` and ordinary EOM lanes remain dependency-gated and are not executable from that manifest.
