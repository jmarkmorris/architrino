# Independent review of whole-cell variation matrices

## Disposition and scope

**Derived disposition:** the [variation instrument](overnight2-d-interval-variation.py) correctly encloses translated roots, normals, source factors and signed receiver/source matrices on its admitted domain. The appended “Root and source boxes for the matrix region” section of the [comparison note](overnight2-d-interval-comparison.md) states the correct conditional construction. Earlier sections of that note retain their previous independent disposition and were not re-adjudicated here.

**Measured receipt scope:** `interval-variation-pilot.json` records receiver zero on the reference cell `[0,0.1]`, with Euclidean translation radius $P=10^{-5}$, independent source-velocity addition radius $Z=10^{-6}$ and weight $\alpha=1/5$. Its receiver logarithmic-norm upper bound is `0.15868114386350968`. It includes all seven partner channels, whose complete source boxes are strictly negative. Code review, known controls and identity auditing found no defect invalidating this bounded matrix result. No target was rerun, and this result supplies no propagated error or actual-history admission.

**Qualification requiring disposition:** positive-source boxes whose lower endpoint is exactly an ordinary knot omit the preceding cell's acceleration trace. They enclose the right-owned values and interior pieces, but not both one-sided derivatives on that closed endpoint. Broader use must include the missing trace or explicitly prove an almost-everywhere/right-trace interpretation adequate for the consumer. The current negative-source pilot is unaffected. The variation entrypoint should also enforce the domain's increment-defined flag and matching terminal time, as the residual checker already does; both hold in the audited pilot.

Only this new companion was authored. The sources, mathematical note, receipts, imported oracles and earlier reviews were left unchanged. The parent owns integration in the [research account](overnight2-d-followup-and-research-2026-10-07.md). The live Ramon E. Moore role and retained Specialist charter supplied a review lens, not acceptance authority.

## 1. Candidate and translated roots

Fix reception time $t$ and let the complete reference source be globally $L$-Lipschitz with $L<1$. Its causal gap at translation $\mathbf p$ is

$$
G_{\mathbf p}(\tau)=\tau-|\mathbf x_i(t)+\mathbf p-\mathbf x_j(t-\tau)|.
$$

The reverse triangle inequality gives $|G_{\mathbf p}(\tau)-G_0(\tau)|\le|\mathbf p|\le P$. Strong monotonicity with lower slope $1-L$ then gives

$$
|\tau(\mathbf p)-\tau(0)|\le\frac{P}{1-L}.
$$

Combining this with the reviewed squared-gap bound $\delta_0$ for an arbitrary positive candidate proves $|\tau(\mathbf p)-\widehat\tau|\le\delta_0+P/(1-L)=\delta$. The code's candidate gap is computed from independent interval reference polynomials. Numerical root samples only propose the candidate, and their errors are not assumed zero.

Positive-root existence uses the separate current separation premise $d>P$. The complete root theorem supplies $\tau(\mathbf p)\ge(d-P)/(1+L)$, so intersecting the candidate-plus-error delay interval with this lower bound is valid. The source interval is enlarged before this tightening, which may be conservative but cannot omit a translated source time.

The translated source-to-receiver vector differs from its candidate by at most $P+L\delta$. Adding a coordinate box with that radius to the candidate vector box therefore contains every actual vector. Dividing by the positive delay interval contains every actual unit normal. The entire coordinate quotient box need not consist of unit vectors.

An exact affine control illustrates the bounds without a root solver: take source $x_j(s)=s/2$, reception time zero and receiver position two. The nominal delay is four. For collinear translations $|p|\le1/4$, the translated delay is $4+2p$, attaining displacement $1/2=P/(1-L)$. The vector displacement is also $1/2=P+L\delta$ when the candidate is exact. This establishes the constants and signs independently of the implementation's numerical proposals.

## 2. Geometric factor intersections

At an actual admitted root, $|\mathbf n|=1$, $|\mathbf v|\le L$ and $|\mathbf z|\le Z$. Hence

$$
\gamma=1-\mathbf n\cdot\mathbf v\ge1-L,\qquad
D=1-\mathbf n\cdot(\mathbf v+\mathbf z)\ge1-L-Z.
$$

The code intersects the direct interval dot-product bounds with these analytic lower bounds. This is valid for the actual geometry even though the surrounding normal box contains vectors of other lengths and the coordinate addition box contains points of Euclidean norm larger than $Z$. Actual points obey both the box and ball/unit-normal constraints. Interval substitution need not retain every artificial corner of their Cartesian product.

Accordingly the output is a bound on the stated Euclidean homotopy region, not on every independent coordinate combination in the raw boxes. Intersections producing an empty interval fail through the interval constructor. Positive delay and factor margins are checked before division. Source velocity addition does not change the causal root equation, so it correctly enters $D$ but not the root-shift estimate.

## 3. Source velocity and acceleration coverage

Negative source boxes use the analytic rigid derivative and its acceleration, enclosed by the independently reviewed rational trigonometric routine. A fixed reference position translation does not change either derivative. The trigonometric routine's bounded-center guard can reject a distant argument; this is a conservative unresolved domain, not a root exclusion.

For positive source time, the code iterates through all intersecting cell interiors and takes coordinate hulls of their enclosed velocities and accelerations. Each cell's derivatives come from its declared polynomial coefficients, not differentiation of a uniform value remainder. A box crossing zero is rejected for separate jump treatment. A box extending beyond the stored source endpoint is also rejected. Candidate source-polynomial composition separately rejects a candidate spanning pieces, even when the later derivative-box routine could cover that union; this can limit coverage without creating an invalid bound.

The lower-endpoint selection uses `searchsorted(..., side='right')-1`. At an exact knot it starts with the following cell, so the preceding acceleration trace is absent. Independent control used a continuous piecewise quadratic source with acceleration $1/4$ on $[0,1]$, $1/8$ on $[1,2]$ and $-1/4$ on $[2,3]$, with continuous velocity. Over `[0.5,2.5]`, the routine enclosed all three accelerations and the velocity range. Over `[1,1.5]`, it returned first-coordinate acceleration `[0.12499999999999714, 0.1250000000000025]`, excluding the left trace $1/4$ at one. Thus a claim to enclose both one-sided matrices at every closed source endpoint would be false.

A proved almost-everywhere interpretation can suffice for an integrated comparison, but the endpoint convention must be explicit and compatible with homotopy integration and event handling. The simplest full-trace correction is to include the preceding cell endpoint when the lower source endpoint equals an interior knot. The right endpoint currently may include the following cell at an exact knot, so its treatment is asymmetric. No repair was made here.

## 4. Signed matrix formulas and norm use

At fixed reception time and fixed independent velocity addition, differentiating the root gives $\partial s/\partial\mathbf p=-\mathbf n^\top/\gamma$ and $\partial\tau/\partial\mathbf p=\mathbf n^\top/\gamma$. Therefore

$$
N=\frac{\partial\mathbf n}{\partial\mathbf p}
=\frac{(I-\mathbf n\mathbf n^\top)(I+\mathbf v\mathbf n^\top/\gamma)}{\tau}.
$$

Writing $\mathbf W=\mathbf v+\mathbf z$ and source acceleration $\mathbf a$, the row $f=\sigma\mathbf n/(\tau^2D)$ has derivatives

$$
B=\sigma\left[
\frac{(I+\mathbf n\mathbf W^\top/D)N}{\tau^2D}
-\frac{2\mathbf n\mathbf n^\top}{\tau^3D\gamma}
-\frac{(\mathbf n\cdot\mathbf a)\mathbf n\mathbf n^\top}{\tau^2D^2\gamma}
\right],\qquad
C=\frac{\sigma\mathbf n\mathbf n^\top}{\tau^2D^2}.
$$

Independent product and chain rules give the negative sign on the source-acceleration term. The implementation matches all factors, matrix orders and polarity signs. It uses the actual reference derivative as the feasible velocity on the admitted strict-interior reference. It does not substitute an unknown exact-source acceleration.

Because the Euclidean translation and velocity-addition balls are star-shaped, the same boxes enclose every point on the homotopy and hence each entry of its averaged matrices. Receiver matrices are summed with their signs before the norm. The delayed block is $[-B/\alpha\ C]$. The norm adapter explicitly converts the matrix-norm result's `.hi` to a point upper bound, and subsequent division by two uses outward arithmetic. It therefore respects the previously identified norm return contract. Tiny-midpoint verification failures remain fail-closed limitations of the imported norm instrument.

## 5. Preparation and receipt binding

The new entrypoint verifies every listed domain dependency, requires the literal-preparation dependency, checks the reference NPZ identity, fixes the original preparation tag, checks balance one/seed one and its literal hash, and compares the loaded negative-history dictionary with literal `balances[1]`. The shared selection validator rejects invalid cell/receiver selections, nonunit partner weights and unsupported candidate degrees. Optimized Python is rejected. These guards address the substantive preparation and selection problems identified in the earlier residual review.

The variation entrypoint does not explicitly require `dom['increment_defined']` or `data['T'][-1]==dom['end']`. It relies on the recognized domain producer and matched input to imply them. Add those checks for an explicit representation/coverage contract rather than treating arbitrary positive JSON fields as a certificate. Domain-dependency completeness and trusted mathematical meaning also remain external premises: verifying hashes of a listed dependency set does not establish that an arbitrary receipt was correctly produced.

For this pilot, the independently controlled identity auditor matched all 22 pilot dependencies, all seven domain dependencies and all nine reference-producer dependencies. Direct metadata/data checks confirmed balance one, seed one, $u=0$, literal identity, original encoded kick equality and equality of the refined reference's initial position/velocity nodes with the original stored nodes. The matched domain has `increment_defined=true`, terminal time equal to the NPZ endpoint, complete-reference speed upper `0.724250801106246` and present separation lower `3.5263854838817754`. The reference's first encoded cell is `[0,0.1]`. Its receipt lists receiver zero and partners one through seven, all with negative source intervals. The omitted positive-knot trace cannot affect those rows.

Dependency hashes are computed when writing the receipt. Inputs must remain frozen during execution, or startup/completion identity checks must bind loaded bytes to receipt bytes. This review inspected the preserved receipt and frozen sources and did not rerun the target.

## 6. Validation and preservation

The shared-venv `overnight2-d-interval-variation.py controls` command, with one-thread BLAS settings and bytecode output disabled, returned exit zero. The imported norm controls and static signed tensor, exact receiver norm $3/8$ and delayed-block squared norm $5/16$ controls passed. Additional inline controls verified the following independently known cases:

- At $\tau=2$, $\mathbf n=(1,0,0)$, $\mathbf v=(1/2,0,0)$, $\mathbf W=(3/4,0,0)$ and $\mathbf a=(1/8,0,0)$, direct substitution gives $B=\operatorname{diag}(-3,1/2,1/2)$ and $C=\operatorname{diag}(4,0,0)$. The interval port enclosed these matrices and their sign reversals. This is a pointwise algebra control, not a whole-history domain assertion.
- The three-piece quadratic source above exercised full interior piece coverage, the exact lower-knot omission and source-zero rejection.
- Before receipt auditing, the hash tool was checked against the known digest of `abc`, and the dependency comparator was checked on an actual matching digest and a deliberately wrong digest. The audited identity counts and preparation checks are recorded above.

Direct SHA-256 reads measured:

| Artifact | SHA-256 |
| --- | --- |
| Variation source | `8c6d387f828527140d2445bd1387b71aaf9ead58b66ce7b311255d9a25bca17b` |
| Comparison note including the newly reviewed appended section | `2ce1f7a02012b8afff330f4bf02887e2087aadbc925b3d4784f4b3eb91d91449` |
| Variation pilot receipt | `5f62483e7fcf2caf36ece7d57ef74470c2eff2b25e04ff6db92f119dc1d29930` |
| Refined reference NPZ | `6ba8e300c6d6b3addfd4485460b1393aece72651b1835a5e66935189b8222755` |
| Refined domain receipt | `7eef27ac17b5c4f1afc3eb9dd5533b60a947bc37dc801c14b744498acf945562` |
| Imported residual checker | `9b8baa6135d12145275a5b64fb8f803623ce04d802e65f5ae68f6b24d7a54554` |
| Imported initialization checker | `4cea0ac572420687f0445508759403e4c2da8ef13f2bfe8e9c97c72438db2915` |
| Imported matrix norm | `c026c2689ee0b222f00cbfeb7beb56f42f3423a39b13dae82588cb8def978775` |

The unchanged pilot retains the complete dependency list. The updated initialization dependency adds an optimized-execution guard; the residual dependency's relevant new selection and provenance guards were inspected here. No blanket acceptance of unrelated changed code is implied. Inline controls wrote no files, and no source, oracle, old review, receipt or target result was edited.

Closing `shasum -a 256` reads reproduced the variation source, comparison note and pilot receipt identities unchanged. Explicit `test -f` checks passed for all three distinct relative-link destinations, none with fragments. Scoped `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics; its difference exit status is expected for a new file.

The root estimate is falsified by a complete $L$-Lipschitz source and positive separated translation violating the derived displacement bound. The factor intersection fails if used without the actual unit-normal and Euclidean-ball premises. The matrix enclosure is falsified by a valid root/homotopy point whose signed derivative lies outside its box. The positive lower-knot example already falsifies a two-sided closed-endpoint coverage claim, so that claim must not be attached to the present code. The receipt's small matrix bounds do not establish a propagated envelope, source-front allowance, residual coverage or actual-history membership.
