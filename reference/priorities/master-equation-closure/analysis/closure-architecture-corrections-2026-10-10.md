# Corrections from the reciprocal closure review

## Scope and governing sources

This addendum records scoped corrections selected through the operator's overnight [reciprocal review plan](reciprocal-review-plan-2026-10-09.md). The [Claude review](closure-architecture-review-2026-10-10.md) supplies the numbered findings; Codex checks them against their sources and writes this addendum. Separate verification is pending. Existing proof inputs, numerical records and historical review receipts retain their bytes. This addendum governs the clarifications named below, without adopting a law or claiming theory closure.

## F1-1: the slope bound is needed on the emission bracket

The [constrained-response regular-chart proof](regular-chart-history-to-ledger-well-posedness.md) states a transmitter-factor floor at each active root and then uses it between roots of two compared histories. Retain its other assumptions and strengthen this hypothesis as follows. For every candidate history in the declared tube and every active slot, its causal residual $G_c(T,s)$ is absolutely continuous in $s$ on the common compact emission bracket, and

$$
\partial_sG_c(T,s)\ge d_t>0
$$

almost everywhere throughout that bracket. At positive range this derivative is $D_t$ in normalized units. A nonzero-range bracket with $D_t\ge d_t$ everywhere is a sufficient concrete condition. A strict uniform speed bound below wake speed provides a bracket-wide lower bound $1-c_a$, but a floor only at the root does not provide the larger declared $d_t$ between roots.

For roots $S,\widetilde S$ of histories $h,\widetilde h$, suppose $S\le\widetilde S$. At the root $\widetilde S$ of the second residual, their residuals differ by at most $2\eta$, because each receiver and source position changes by at most $\eta$. Absolute continuity and the strengthened slope hypothesis give

$$
d_t(\widetilde S-S)
\le G_c(h;T,\widetilde S)-G_c(h;T,S)
=G_c(h;T,\widetilde S)
\le2\eta.
$$

The reversed ordering gives the same estimate. Thus $|S-\widetilde S|\le2\eta/d_t$, and the subsequent estimates retain their stated constants on this narrower chart. This is a derived repair of the root-shift argument, not a counterexample to local continuation. Falsifier: a pair meeting the strengthened bracket hypothesis and residual bound but violating the displayed root-shift bound.

The theorem remains about the proposed constrained response and normal-cone evolution. It does not establish canonical well-posedness at a root birth or other exceptional event.

## F1-2: long periodic-image histories contain wound roots

The [topological target](topological-causal-root-ledger-proof-target.md#torus-root-setup) admits every winding-labeled periodic image. This differs from retaining only the shortest-distance representative. Let the lifted source path have uniform speed at most $u<c_f$, and let

$$
d_{ij,n}(T)=\|\widetilde{\mathbf X}_i(T)-\widetilde{\mathbf X}_j(T)-Ln\|.
$$

For fixed reception time $T$, the periodic-image residual at delay $\tau$ satisfies

$$
G_{ij,n}(T,T)=d_{ij,n}(T),\qquad
G_{ij,n}(T,T-\tau)
\le d_{ij,n}(T)-(c_f-u)\tau.
$$

If $d_{ij,n}(T)>0$ and the retained horizon exceeds $d_{ij,n}(T)/(c_f-u)$, continuity supplies a positive-delay root. For an own image with $n\ne0$, $d_{ii,n}=L\|n\|$. For partners the simultaneous offset must remain in $d_{ij,n}$; $L\|n\|$ alone is not the finite-horizon bound.

With a complete past and the same uniform speed bound, each nonzero-distance image therefore has a root. Moreover the causal residual is strictly increasing in emission time: for $s_2>s_1$, the range change is at least $-u(s_2-s_1)$, so the residual change is at least $(c_f-u)(s_2-s_1)>0$. Each such image has exactly one root. There are countably infinitely many image classes and hence countably infinitely many admitted roots per ordered pair. A finite-horizon image ledger cannot exclude all older image receptions in this scenario.

This is a derived periodic-laboratory clarification. Its acceleration consumer would need a declared infinite image-summation prescription and convergence argument; the topology-only target does not provide one. It changes neither the compact pair-contact lemma nor the absence of nearby roots on a strict sub-wake own arc in the zero-winding class. Falsifier: a complete uniformly sub-wake lifted history lacking the positive-delay root for a nonzero-distance image, or two roots in one such class.

## F1-3 and F1-4: existing review and local-existence coverage

The affine theorem in the [pairwise ledger proof design](pairwise-causal-root-ledger-closure.md#bounded-raw-history-reconstruction-and-lineage) is accepted at its bounded prescribed-history scope by the [affine adjudication](mec-005-affine-independent-adjudication.md). This supersedes the design header's historical claim that its independent adjudication remains open. Full-envelope completion remains separate.

The canonical [regular-chart local-existence lemma](coincide-or-not.md#regular-chart-dde-local-existence-lemma) already belongs to the contact analysis. Its fixed-past method-of-steps statement uses a complete finite census, positive range and absolute transmitter-factor margins, retained-boundary and inactive-search margins, and locally Lipschitz source velocities. A new theorem is not needed to remedy an asserted absence of this result. Uniform quantitative dependence on families of histories is a separate burden, as the existing lemma itself states. These are measured source-coverage conclusions from the named passages; a conflicting current source or missing cited lemma would overturn them.

## F2-2: a conditional regular-row argument does not replace missing measurements

A strict pointwise sub-wake bound on an infinite past is insufficient for root existence. At reception $T=0$ and receiver position zero, let a one-dimensional source have $x(s)=s-a-e^s$ for $s\le0$, with $a>0$ and $c_f=1$. Its speed $1-e^s$ belongs to $[0,1)$, but its causal residual is $a+e^s>0$ at every past emission. There is no root. This is a derived prescribed-history counterexample, not an evolved solution.

A source with a uniform speed bound $u<1$ has the stronger proper-past property: its causal residual tends to negative infinity in the remote past. At positive simultaneous separation $d$, it has a unique root by strict monotonicity. The triangle inequality gives $d\le(1+u)\tau$, hence $\tau\ge d/(1+u)$; the stronger bound $\tau\ge d$ is false for moving sources. Positive delay and source regularity near the sampled emission then give bounded continuous rows locally. A release kick received exactly at the event can break that continuity.

The released rigid preparations have more structure than the counterexample, but applying the conditional argument to every recorded arrival still requires its preparation, sampled-emission and kick conditions. This review does not establish them for the 24 arrivals lacking the recorded rate/row checks. The [release analysis](../braid-program/analysis/released-balances-and-nonrigid-search-2026-10-05.md) and ledger support 274 recorded arrivals and 250 measured hypothesis checks. Neither an inferred generic rate nor an unverified regular-row shortcut promotes the remaining arrivals to measured theorem applications. Falsifier: retained records establishing all missing rate and continuity conditions, or a source meeting the strengthened uniform-margin conditions but lacking the stated root.

## F0-1 and F5-3: release measurements govern the copied summaries

The frozen release analysis and slow-regime synthesis contain summary wording that attributes the positive arrival rate and regular rows to all 274 arrivals. Their recorded claim-grade paragraph and ledger F-BRD-58 support 250 such checks, namely 130 plus 120, among 274 arrivals in 276 runs. This addendum governs the stronger frozen summary sentences: the remaining 24 arrivals have not acquired these measured hypotheses. Current parent and Braid summaries and registry row COL-28 use the two counts separately. The finite trajectories and their retained inputs have not changed. Falsifier: retained rate and root-regularity records covering the missing 24, rather than an inference from the general theorem.

## F2-4 and F3-3: governing corrections and related event theorems

Where the frozen curved-path theorem displays a superseded working-interval condition or recent-root interval, its explicit scope corrections and adjudication govern the proof. The root-birth law likewise remains a leading-order result under its corrected delay, curvature and geometric-variation conditions. No unbounded-error asymptotic has been promoted to an exact event certificate.

The earlier stationary-past lattice event family and the later curved-path release family prove overlapping arrival obstructions under different hypotheses. The later continuation class permits an absolutely convergent sum of rows from infinitely many sources, provided its bounded continuous remainder assumptions are proved for the branch in question. Its applicability is not excluded by an infinite number of labels alone. The parent manuscript now links the families and states these domain differences. Their separate construction relative to one another remains unknown; publication dates and absence of cross-references establish no independence. The separate first-event and older first-class-boundary lattice certificates retain their own adjudications and reproducibility limits.

## Pending integration and verification

All six Claude packets have finished their bounded reading. Codex has applied the first living-summary correction batch; Darwin assessment and separate verification remain in progress. Accepted parent and geometry-summary corrections, exact before/after versions and Claude's separate verification will be recorded in the review plan. This addendum alone does not claim that every source proof or instrument has been checked.
