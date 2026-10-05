# Frozen enlarged-circle diagnostic specification

Status: frozen before new diagnostic targets, 2026-10-05. This assignment keeps exactly the four triangular-window/core laws, $K_{ij}=c_f=1$, self sign $+1$ and opposite-polarity partner sign $-1$. The complete all-time antipodal circle is the only target. No spectrum, causal preparation or stability inference is authorized.

The declared rectangle is $\beta\in[\pi/2,32]$, $R\in[2,128]$. The separately frozen [analytical bounds](alternatives-screen-2026-10-05-width-large-bounds.md), subject to independent coordinating assessment before this target, exclude its complement of the smaller rectangle $\beta\in[11/4,7/2]$, $R\in[2,4]$. In fact those bounds exclude the corresponding unbounded speed and radius tails, but no sweep supplies that conclusion. The diagnostic receipt must retain both the original rectangle and the analytical masks; pointwise non-finding in the remaining rectangle is not a complete exclusion.

The new driver imports the unchanged [validated diagnostic kernel](../evidence/alternatives-screen-2026-10-05-width-circle-search.py), SHA-256 `4b8a3231a6f55054db30aa6c4d3801c3b955df2d7a3319b2865dce5e7554d8b1`. Its [original protocol](alternatives-screen-2026-10-05-width-circle-protocol.md) retains SHA-256 `43cba14d8afcc39033e21b45fc4ecfb852d4191867273ba6d005fd0703c2b03e`. Neither reference is edited. The analytical bounds source is frozen as `f4db3fa3af575e5ab8ce76b8ab945eecb4229cce816ed42262c5e8b8ee8e4806`.

## Complete integral and corner coverage

At receiver $(R,0)$, phase $\theta=\beta\tau/R$, the kernel integrates the four signed components from self displacement $R(1-\cos\theta,\sin\theta)$ and partner displacement $R(1+\cos\theta,-\sin\theta)$ over the complete age interval $[0,2R+h]$. Each range is at most $2R$, so every older age is exactly inactive. The final residuals remain $F_1=R^2A_t$ and $F_2=RA_r+\beta^2$.

For each chord lobe, write $r=2R\sin((\theta-a)/2)$ on $[a,a+2\pi]$, with $a=2\pi k$ for self and $a=(2k-1)\pi$ for partner. The gap $r-R\theta/\beta$ is concave on the lobe, with at most one stationary point $a+2\arccos(1/\beta)$ when $\beta>1$. Splitting at every cusp and stationary point gives monotone intervals. On each, the three gap levels $-h,0,h$ have at most one crossing, and a sign bracket locates it; an exact endpoint equality is retained. Thus every triangular support or central corner is represented, including intervals on both sides of a local maximum. A floating degeneracy near a touching event remains a diagnostic precision issue, never a proof that the event is absent.

This argument applies at every speed and radius in the declared rectangle. Its maximal complete phase endpoint is $2\beta+\beta h/R\le65$, below the earlier diagnostic's possible endpoint 272. Ages can be larger and windows narrower relative to radius, so the new known controls additionally check a large-radius stationary integral and an analytically located central corner. The eventual numerical target is smaller after analytical masking, but its kernel remains the full self/partner integral with all these partitions.

## Known-first controls

Before any target, the driver verifies all frozen source hashes and runs the imported stationary, zero-speed, affine-self and monotone-corner controls. These known mathematical references are unchanged. It then checks each law at radius 128 and zero speed against the exact softened stationary radial response, with zero tangent and zero self input. Finally it checks the partner central corner at $\theta=\pi/2$, choosing $\beta=\pi/(2\sqrt2)$ and $R=128$: both chord range and age are exactly $\sqrt2R$, and the first-lobe gap is strictly decreasing. All three corner levels must be returned in their known order. These controls are outside the circle search target and have independently known answers.

The known receipt is written before target use, and the coordinator must inspect the frozen driver/specification and analytical masks before authorizing the target. Replaying the same imported kernel is reproducibility; the exact stationary response, affine integral, corner geometry and analytical exclusion are the independent references.

## Bounded grid and root diagnostic

The grid uses 33 equally spaced speed nodes from $11/4$ to $7/2$ and 33 geometric radius nodes from two to four for each law. Boundary rows are retained even where the analytical bounds already exclude them. Every point uses the unchanged complete kernel with requested absolute and relative quadrature tolerance $2\times10^{-9}$. Each record retains all signed channels, residuals, the quadrature status/error estimate, corner/lobe counts, runtime and any exception. An evaluation timeout is a retained failure. A skipped or failed node cannot be classified as empty.

A subsequent separately recorded root-search mode selects at most 24 seeds per law: first cells whose four corner values straddle zero in both residual coordinates, then the twelve smallest residual norms and the twelve smallest absolute radial residuals, removing duplicate seeds and applying the cap. Search variables are $(\beta,\log R)$ inside the closed smaller rectangle. Each least-squares attempt uses at most 80 function evaluations, requested quadrature tolerance $2\times10^{-10}$ and optimizer tolerances $10^{-11}$. Final evaluation uses quadrature tolerance $2\times10^{-12}$. Every optimizer failure, quadrature failure, timeout and unprocessed seed remains explicit.

A floating candidate requires successful final quadrature, both residual magnitudes below $10^{-7}$, and the acceleration error estimate multiplied by $\max(R^2,R)$ below $10^{-8}$. These are detection criteria only. At the first candidate the driver stops the search, retains all pending seeds, and returns it for an independently authored integral/enclosure method before any existence or stability claim.

Each target mode has a 300-second wall-time cap and the stricter science cutoff at 21:47:16 UTC. A five-second per-evaluation alarm bounds calls into the unchanged kernel; it is shortened to the remaining mode/cutoff budget. Guards stop new work when less than two seconds remain. Ten-second flushed heartbeats report progress. The grid retains its exact expected node inventory, so missing nodes are explicit; the search retains its seed inventory and completed attempts. No silent process is left running.

## Output and falsifiers

Only new evidence/protocol sources with prefix `alternatives-screen-2026-10-05-width-large-` are written. Receipts use the matching ignored binary-research owner and refuse overwrite. The fixed diagnostic kernel and all previous sources remain unchanged.

A missed chord lobe, gap corner or complete age; an altered sign or coefficient; failure of a known control; a target run before the known receipt; or an unreported failed/pending node invalidates the corresponding diagnostic report. An independently balanced circle in the analytically excluded regions would falsify that theorem, whereas a circle between grid nodes would only expose the expected incompleteness of diagnostics. Regions not excluded analytically or by a later independent enclosure stay unresolved.
