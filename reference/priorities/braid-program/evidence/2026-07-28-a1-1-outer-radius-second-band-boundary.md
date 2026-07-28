# A1.1 Second Outer-Radius Band Topology-Boundary Diagnostic

Date: `2026-07-28`

Status: `counterexample-diagnostic`,
`exact-history-edge-root-topology-boundary`,
`complete-36-channel-accounting`, `null-score`,
`prescribed-path-only`, `diagnostic-only`, and `priority-only`.

## Scope and predeclaration

This receipt records the next and only the next adjacent outer-radius strip
above the first controlled expansion. The sealed prior combined box is

$$
\frac{7}{8}\le\alpha_1\le\frac{15}{16},
\qquad
\alpha_2=1,
\qquad
\frac{17}{16}\le\alpha_3\le\frac{19}{16}.
$$

The predeclared added strip was

$$
\frac{19}{16}\le\alpha_3\le\frac54.
$$

The relative phases remain exactly $(0,2\pi/3,4\pi/3)$ and the history reach
remains $\chi=9/4$. The inner-radius interval, normalized field-speed pin,
numerical floors, subdivision rules, resource ceilings, endpoint ownership,
fold visibility, null score, and fail-closed dispositions are unchanged. No
inner-radius expansion, phase variation, later outer band, EOM evolution,
energy or action calculation, GR calculation, or candidate disposition was
authorized.

Plainly: the run changed one coordinate range only. It attempted the strip
immediately above $19/16$ and retained every earlier control and claim limit.

The diagnostic owner is the
[second-band protocol](../../../../src/prescribed-path-analysis/protocols/a1-1-outer-radius-second-band-expansion-protocol.v1.json),
executed by the prescribed-only
[shared expansion diagnostic](../../../../src/prescribed-path-analysis/A11OuterRadiusBandExpansionDiagnostic.mjs).
The root enclosures continue to use the canonical A1.1 interval certifier.

## Exact prior-box control

Before the added strip was adjudicated, the exact prior combined box was
re-executed. Its sealed identities reproduced:

| Prior artifact | Expected and observed hash |
| --- | --- |
| First-expansion protocol | `ba964f401401b36a46e96683e7329fa21ac13ce04331d1c909648a6df237b8bd` |
| First-expansion result | `389fe1a37065198fe4f6c5139b9359c733b22a08dd5f800c2e7d66703977bc57` |
| First-expansion summary | `a8c789f826ff286ef01f02f0a9aacc6faa72991e5e8535a436bc0531027eb23a` |

Plainly: the new execution first recovered the old combined box byte for byte.
The boundary below is not an artifact of changing the prior control.

## First topology boundary

For either outer same-endpoint self channel, the circular self-root equation at
the retained history edge is

$$
2\alpha_3\sin\left(\frac{\chi}{2}\right)=\chi.
$$

It reaches that edge at

$$
\alpha_{3,\star}
=
\frac{\chi}{2\sin(\chi/2)}
=
\frac{9}{8\sin(9/8)}
=
1.2468584789674295.
$$

This lies strictly inside the declared strip because
$19/16<\alpha_{3,\star}<5/4$. The affected ordered channels are
`a1-1-binary-3-endpoint-1<-a1-1-binary-3-endpoint-1` and
`a1-1-binary-3-endpoint-2<-a1-1-binary-3-endpoint-2`.

Plainly: the outer self root reaches the last permitted history point before
the planned radius reaches $5/4$, so the run stops at that earlier radius.

At the lower strip edge, boundary, and proposed upper strip edge, the
history-edge causal residual is respectively
`-0.10711446401464908`, `0`, and `0.0056689852477380676`. The
delay derivative at the boundary is `-0.4623839040979407`, so the root is
simple rather than a fold. Independent direct-coordinate squared-residual
recomputation gives exactly zero for both affected channels at the edge.
Below the edge each row has one simple root in the declared interior history;
at the edge the root is on the history boundary; above it the root lies beyond
the unchanged history reach.

Plainly: this is a root-topology boundary caused by the frozen history window.
It is not a numerical ambiguity, resource exhaustion, or physical-candidate
rejection.

## Complete channel and projection checks through the edge

All $36$ ordered channels were inventoried over the adjudicated prefix

$$
\frac{7}{8}\le\alpha_1\le\frac{15}{16},
\qquad
\alpha_2=1,
\qquad
\frac{17}{16}\le\alpha_3\le\alpha_{3,\star}.
$$

| Channel class | Ordered channels | Continuous disposition through the edge |
| --- | ---: | --- |
| Same-transmitter self | $6$ | Four no-root rows; two exact history-edge boundary rows |
| Same-binary opposite endpoint | $6$ | One root on every row |
| Inter-binary representatives | $12$ | One root on every representative |
| Exact endpoint-inversion reuse | $12$ | One root on every paired row |

The inter-binary treatment evaluated $5{,}244$ fold boxes and $384$ anchor
boxes, reached maximum depth $12$, and left no unresolved inter-binary box
under the unchanged ceilings. A refined $24$-phase history-edge partition
gave maximum squared-residual upper bound `-0.09760301139300503`; its
independent direct-coordinate witness was `-0.10462698643286039`. The
synthetic exact-fold and resource-exhaustion controls continued to fail
closed.

Plainly: the first obstruction is exactly the pair of outer self rows. Every
other root-topology obligation finishes through that radius without relaxing
a gate.

The six continuous phase-projection sheets remain strictly increasing through
the edge. For the outer-transmitter class, the retained continuous bounds are

$$
P\ge\frac{1023}{16384}>0,
\qquad
\left.\partial_\delta G\right|_\theta\le-\frac{1023}{110080},
\qquad
\left.\partial_\delta G\right|_\epsilon\le-\frac1{64},
$$

and

$$
\frac{33}{30100}
\le
\frac{d\theta}{d\epsilon}
\le
430.
$$

Endpoint inversion had zero enclosure difference. The maximum phase-seam
difference was `2.0872192862952943e-14` against the unchanged `1e-12`
tolerance. Twelve independent boundary witnesses had maximum normalized
residual `6.139621386711707e-16`; their largest reception-fixed and
emission-fixed finite-difference derivative differences were
`5.779119405247002e-10` and `1.0478968803795397e-9`, below the retained
`1e-6` tolerance.

Plainly: phase order does not reverse before the root reaches the history
edge. The topology boundary, not a monotonicity failure, is the first stop.

## Evidence identity and replay

The protocol hash is
`79c93f59eb113fbeb7ad05aa9f6067b06ccc129bd4df9d2ca3a7f5e3ce9a1cfd`.
The result hash is
`ae2596b32d046c4657de805777732e4695d455e2ad247546f7f5d1fbb9900e95`.
The
[durable summary](a1-1-outer-radius-second-band-expansion-summary.v1.json)
hash is
`284bf4e33f82a996d31ce04547f52fa49f1e4f144e10753a18602232c26be37c`.
The complete ignored ledger is
`.local-data/braid-program/a1-1/a1-1-outer-radius-second-band-expansion.v1.json.gz`
with raw-ledger hash
`8a04c03ad042bf165d8200ffe9d41021a143ced931653e5a4bc27c9fb49af647`.
The deterministic replay command is:

```bash
node scripts/prescribed-path-analysis/run-a1-1-outer-radius-second-band-expansion.mjs --check
```

Plainly: the retained summary and ignored full ledger are hash-bound to one
deterministic execution, including the exact stop edge.

## Claim boundary

This is a null-score prescribed-path topology counterexample for completing
the full proposed strip under the unchanged history reach. It does not change
candidate status and does not establish or refute retention, stability,
binding, physical superluminal transport, physical realization, energy,
action, angular-momentum dynamics, radiation, pressure, GR recovery, or any
EOM-solver result. No calculation or claim is made above
$\alpha_{3,\star}$ under the present protocol.

Plainly: the calculation locates the first exact chart boundary. It says
nothing about whether a physical assembly exists or whether another,
separately authorized history protocol would change the bookkeeping.
