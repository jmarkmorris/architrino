# Octahedral Antipodal Generic-Axis Edge Exclusion

Date: 2026-09-02
Compatibility identifier: `aaa-corpus-advancement`
Status: complete computer-assisted derived exclusion on all five quotient edges
Queue owner: [BP-016 — Platonic Braid Qualification and Prescribed-History Program](../work-queue.md#bp-016--platonic-braid-qualification-and-prescribed-history-program)
Mathematical owner: [Platonic Moving-History Reduction](../platonic-moving-history-reduction.md)

## Exact Domain And Root Ownership

The [exact quotient-domain packet](2026-09-02-octahedral-antipodal-generic-axis-domain.md) gives the four primitive rays

$$
\mathbf r_0=(-3,-10,11),\quad
\mathbf r_1=(3,-11,10),\quad
\mathbf r_2=(1,1,1),\quad
\mathbf r_3=(-11,10,3),
$$

and the five closed edges $(0,1)$, $(1,2)$, $(2,0)$, $(2,3)$, and $(3,0)$. On edge $(i,j)$ the certificate uses

$$
\hat{\mathbf n}_{ij}(t)
=
\frac{(1-t)\mathbf r_i+t\mathbf r_j}
{\lVert(1-t)\mathbf r_i+t\mathbf r_j\rVert},
\qquad 0\leq t\leq1,
$$

and covers $(t,\beta)\in[0,1]^2$ with outward-rounded interval boxes. The closed $\beta=1$ face is only a computational cap; the scientific result is restricted to $0\leq\beta<1$ with $c_f=1$. Shared vertices are deliberately retained in every incident closed edge, so no boundary point is lost by deduplication.

Plainly: the certificate covers every point on the exact five-edge boundary and every strict sub-field speed. A corner appears in both neighboring edge charts on purpose.

For each interval box and every ordered pair $u\ne v$, the checker finds endpoint signs enclosing the causal delay $\tau_{uv}$ and records the exact owner $u\leftarrow v$. The strict-sub-field contraction theorem in the mathematical owner proves uniqueness and excludes every complementary partner root for $0\leq\beta<1$. All 30 directed partner owners occur on every accepted box; there are no nontrivial self roots. The interval transmitter-factor floor across the complete accepted cover is

$$
\min D_{uv}>0.0239350503710699968568826566806687263482545324.
$$

The largest reported delay enclosure width is $1.5$. Width alone is not an accuracy claim: each accepted enclosure has the required outward endpoint signs and positive transmitter factor, and the residual test uses the entire enclosure.

Plainly: every acceleration contribution has a named receiver and transmitter, and no favorable root is selected while another possible strict-sub-field root is omitted.

## Nine-Channel Exclusion

For representative receivers $+\mathbf e_x$, $+\mathbf e_y$, and $+\mathbf e_z$, the checker encloses the complete acceleration sums $\mathbf a_u$ and the prescribed rigid directions

$$
\mathbf p_u=\hat{\mathbf n}(\hat{\mathbf n}\mathbin{\cdot}\mathbf u)-\mathbf u.
$$

It forms one common least-squares scalar

$$
s=\frac{\sum_u\mathbf a_u\mathbin{\cdot}\mathbf p_u}{\sum_u\lVert\mathbf p_u\rVert^2}
$$

and evaluates all nine Cartesian components of $\mathbf a_u-s\mathbf p_u$. Any prescribed balance must make every one of these residuals zero, so one outward-rounded component interval excluding zero rejects the complete box.

The adaptive cover accepted 9,078 boxes after processing 17,836 boxes. The edge results are:

| Edge | Accepted boxes | Processed boxes | Maximum depth | Minimum $D_{uv}$ | Sign-excluding channel counts $(0,\ldots,8)$ |
| --- | ---: | ---: | ---: | ---: | --- |
| $(0,1)$ | 652 | 1,240 | 5 | $0.0239350503710699968568826566806687263482545324$ | $(0,15,9,590,0,0,38,0,0)$ |
| $(1,2)$ | 2,567 | 5,070 | 11 | $0.0467352358203298136925058002200473638300993074$ | $(23,1296,35,1098,0,17,98,0,0)$ |
| $(2,0)$ | 1,872 | 3,680 | 11 | $0.0440530260422108728993262388569365364547679904$ | $(22,1159,2,684,0,3,2,0,0)$ |
| $(2,3)$ | 2,567 | 5,070 | 11 | $0.0467352358203298136925058002200473638300993074$ | $(24,1026,1337,0,0,123,57,0,0)$ |
| $(3,0)$ | 1,420 | 2,776 | 7 | $0.117253566567370191783087503641354596463757231$ | $(0,14,133,717,0,556,0,0,0)$ |

Every accepted box has at least one sign-excluding channel. The survivor list therefore contains exactly zero boxes. Interval Newton and Krawczyk are required for every survivor, so the edge application count is exactly zero rather than an unevaluated remainder.

Plainly: subdivision never encountered a box that still might contain a common balance. There is consequently no candidate edge zero to refine or certify.

> **Claim grade: computer-assisted derived bounded nonexistence.** No antipodal-alternating rigid regular-octahedron prescribed acceleration balance occurs on any of the five exact quotient edges for $0\leq\beta<1$. This is a continuous interval result, not an inference from the earlier finite scout.

## Reproduction, Independence, And Boundary

Run the certificate with:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/certify_octahedral_antipodal_generic_axis_edges.py
```

The checker uses 70-decimal-digit `mpmath` `libmpi` intervals. The installed interval and elementary-function source files are bound in its output, and lower and upper operations route through their floor- and ceiling-rounded primitives. The checker SHA-256 is `ef8634756884578bcafd72ee2bf2aa40b32c0d5becd6789b1603a3335d2357b8`. Its stable output SHA-256 is `d3ae819c47d9a2be6fbac0b592903f23f794adcee27da4ee2ab9f302bfd53d08`.

The independent references are the exact quotient reconstruction in `freeze_octahedral_antipodal_generic_axis_domain.py` and the analytic strict-sub-field uniqueness theorem in the mathematical owner. The unchanged `AnalyticalBraidEvaluator` separately samples every declared edge, retains five partner roots at every receiver, and evaluates the same nine common-scale residual channels. That floating-point agreement is a consistency check only; it is not the interval proof.

This result covers only the five closed quotient edges and strict sub-field speed domain. It makes no claim about either simplex interior, $\beta\geq1$, another polarity word, non-rigid history, EOM evolution, retention, stability, binding, physical identity, score, or scientific acceptance. Acceleration balance has not been found, so no stability analysis is admissible on these edge histories.

Plainly: the boundary is ruled out, but the two triangular interiors remain mathematically open. Nothing here says an octahedron evolves as or remains a physical assembly.

## Falsifier And Next Object

The result is overturned by a missing quotient edge or ordered owner, a second strict-sub-field partner root, a nontrivial self root, a nonpositive transmitter factor, a gap in the accepted edge-speed cover, a reported excluding interval that contains zero, an outward-rounding failure, or an independently certified common-scale balance on a declared edge.

The next exact object is an outward-rounded cover of the two open simplex interiors with the same 30-owner root ledger and nine residual channels. Boundary boxes must inherit the present edge ownership rather than double-book or discard it; every interior survivor must receive interval Newton or Krawczyk treatment.

Closure goal: certify or isolate every common-zero survivor in the two exact generic-axis simplex interiors without weakening the root, ownership, rounding, or nine-channel obligations.
