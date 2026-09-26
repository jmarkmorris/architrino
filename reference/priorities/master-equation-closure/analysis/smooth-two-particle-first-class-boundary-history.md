# Endpoint geometry for the first environmental displacement boundary

## Scope and result

The [accepted continuation through $t=5$](smooth-two-particle-through-five-independent-adjudication.md) supplies a complete-population state inside the original environmental displacement ceiling $1/16$. This audit identifies useful directions for testing whether some environmental architrino reaches that ceiling before the selected targets turn downward. It retains the same prescribed complete past, alternating infinite cubic lattice, stationary eight-source block sum, $g=16$, $c_f=1$ and unmodified Master Equation.

At $t=5$, the environmental architrino anchored at $(-1,0,0)$ has vertical displacement greater than $0.05630171$, upward velocity greater than $0.12650013$ and upward acceleration greater than $0.17358555$. Its distance from its anchor is increasing at a rate greater than $0.12630786$. The reflected anchor $(2,0,0)$ has the same conservative displayed bounds. These are actual endpoint bounds obtained from authenticated numerical vectors and independently accepted vector-error bounds. They do not establish any future boundary event.

The exact fixed direction aligned with the numerical displacement maximizes the guaranteed projected position at this endpoint. Its gain over the vertical axis is only about $3.16\times10^{-6}$. The vertical unit vector $e_z=(0,0,1)$ is therefore a simpler witness direction for the subsequent bounded comparison. It points upward for both reflected environmental anchors; reflection reverses the horizontal component, not the vertical component.

The archived numerical population ends at $2571/512=5.021484375$. Its subsequent refined construction-boundary bracket near $5.02206464$ is numerical evidence only. No trajectory is evolved by this audit. The exact prospective census contains 1278 affected identities through the selected horizon $81/16$, and 1326 through the larger reserve horizon $41/8$; neither census alone proves continuation to its horizon.

## 1. Authenticated endpoint data

The endpoint instrument authenticates the frozen `population-h21-4.npz`, the accepted per-receiver comparison `pulse.json`, and the final independent acceptance document by their recorded SHA-256 digests. Every stored node at $t=5$ lies exactly on the $1/1024$ grid. Position, velocity and acceleration vectors are retained as exact dyadic fractions and binary64 hexadecimal strings in `endpoint.json`, under `focus[].exact_dyadic_vectors` and `focus[].binary64_hex_vectors`.

The following are decimal renderings of the stored comparison vectors. They are numerical centers, before the accepted errors are applied; all three components are retained, including the tiny second-coordinate numerical terms.

| Anchor | Numerical displacement $\widetilde y(5)$ | Numerical velocity $\widetilde v(5)$ | Numerical acceleration $\widetilde a(5)$ |
| --- | --- | --- | --- |
| $(-1,0,0)$ | $(0.0006119735378591911,\ 2.7824068285078616\times10^{-19},\ 0.059301493909973385)$ | $(0.0019156693804688184,\ -1.098482523128928\times10^{-19},\ 0.14188694334619503)$ | $(-0.000286774503329702,\ 1.084223903303908\times10^{-17},\ 0.26246823138055225)$ |
| $(2,0,0)$ | $(-0.0006119735378587424,\ -3.5586175930876554\times10^{-19},\ 0.05930149390997168)$ | $(-0.0019156693804675798,\ -1.9682508980045068\times10^{-18},\ 0.14188694334618998)$ | $(0.0002867745033321451,\ -2.8569262398970196\times10^{-18},\ 0.26246823138053804)$ |
| $(0,0,0)$ | $(0.0003639608578810065,\ 1.2404556107114465\times10^{-20},\ 0.038028420580814196)$ | $(0.0010326508527407473,\ -5.0105996629592\times10^{-19},\ 0.1355303676873786)$ | $(-0.0009231621631727567,\ -6.792591327485331\times10^{-18},\ 0.49682147983197905)$ |
| $(1,0,0)$ | $(-0.0003639608578810065,\ 1.2404556107114465\times10^{-20},\ 0.038028420580814196)$ | $(-0.0010326508527407473,\ -5.0105996629592\times10^{-19},\ 0.1355303676873786)$ | $(0.0009231621631727567,\ -6.792591327485331\times10^{-18},\ 0.49682147983197905)$ |

The selected target vectors are bitwise exact reflections after reversing the horizontal component. The separately evolved environmental comparison vectors are not bitwise reflected: their position, velocity and acceleration differences under reflection are bounded numerically by $1.707\times10^{-15}$, $5.052\times10^{-15}$ and $1.422\times10^{-14}$. The audit preserves these differences and the separate accepted error bounds rather than replacing either stored vector by the other's reflection. This is a property of the numerical archive, not evidence against symmetry of the original equation and preparation.

The accepted norm-error bounds at the endpoint are as follows. Each bounds the full vector difference between actual and numerical states.

| Anchor | Position error | Velocity error | Acceleration error |
| --- | ---: | ---: | ---: |
| $(-1,0,0)$ | 0.0029997811069441185 | 0.015386807779435943 | 0.08888267385559726 |
| $(2,0,0)$ | 0.0029997810971065836 | 0.015386807742704388 | 0.08888267393779314 |
| $(0,0,0)$ | 0.003140262445561797 | 0.017517640790580904 | 0.11482753082505835 |
| $(1,0,0)$ | 0.0031402624453960295 | 0.017517640788999183 | 0.11482753081392268 |

Subtracting these bounds from the corresponding vertical components gives actual endpoint bounds with the following conservative decimal rounding:

| Anchor | Vertical displacement lower bound | Vertical velocity lower bound | Vertical acceleration lower bound |
| --- | ---: | ---: | ---: |
| $(-1,0,0)$ | 0.05630171 | 0.12650013 | 0.17358555 |
| $(2,0,0)$ | 0.05630171 | 0.12650013 | 0.17358555 |
| $(0,0,0)$ | 0.03488815 | 0.11801272 | 0.38199394 |
| $(1,0,0)$ | 0.03488815 | 0.11801272 | 0.38199394 |

## 2. Fixed projections and actual radial velocity

Let $\widetilde y,\widetilde v,\widetilde a$ be a saved endpoint triple, and let $p,v,a$ be its accepted position, velocity and acceleration error bounds. For any fixed unit vector $n$, Cauchy's inequality gives

$$
n\cdot y\ge n\cdot\widetilde y-p,\qquad
n\cdot y'\ge n\cdot\widetilde v-v,\qquad
n\cdot y''\ge n\cdot\widetilde a-a.
$$

The maximum of the first lower bound over fixed unit directions occurs at $n_0=\widetilde y/\lVert\widetilde y\rVert$. For the anchor $(-1,0,0)$ this direction is approximately $(0.01031914904,0,0.99994675616)$. Outward interval evaluation yields projected position, velocity and acceleration lower bounds greater than $0.0563048704101$, $0.1265123490394$ and $0.1735686234406$. The fixed direction optimizes the initial position bound; this does not assert that it maximizes an arbitrary future comparison involving velocity and acceleration.

An exact rational unit direction is also available:

$$
n_{\rm rat}=\frac{1}{36865}(384,0,36863),
\qquad 384^2+36863^2=36865^2.
$$

It gives lower bounds greater than $0.0563048701297$, $0.1265123922643$ and $0.1735683309449$. For the reflected anchor, replace 384 by $-384$. The vertical direction avoids both the square-root definition of $n_0$ and the larger rational coefficients, while losing only a small endpoint margin. Any later assertion that a projected position reaches $1/16$ must include a valid acceleration or error comparison over the intervening interval; positive endpoint velocity alone is insufficient.

Actual radial velocity requires accounting for uncertainty in the direction from the anchor. Put $r=\lVert\widetilde y\rVert$ and $u=p/r<1$. Because the actual position lies in the ball of radius $p$ about $\widetilde y$, its unit radial direction differs from $n_0$ by an angle whose sine is at most $u$. Decompose the numerical velocity as $\widetilde v=v_\parallel n_0+v_\perp$, with $v_\parallel>0$. Then

$$
\frac{d}{dt}\lVert y\rVert
\ge v_\parallel\sqrt{1-u^2}-\lVert v_\perp\rVert u-v.
$$

The actual displacement is nonzero because $r>p$, so this derivative is well defined. The first term bounds the retained parallel component after the direction uncertainty; the second charges the worst transverse component; the last subtracts the accepted velocity error. For $(-1,0,0)$ the audit gives $u<0.05058256023$, $\lVert v_\perp\rVert<0.000451414868$ and actual radial velocity greater than $0.1263078677898$. This is stronger than the direct numerator-and-denominator triangle estimate, which gives only $0.1128482333818$. Both are endpoint statements, not future radial monotonicity claims.

## 3. Competing environmental receivers

The instrument checks every one of the 1348 allocated environmental endpoint vectors and its accepted error. It records all rows, not only the proposed witness. A reporting subset consists of the 38 environmental rows whose endpoint displacement upper bound is at least $1/32$. Checking the entire stored tail adds no further row to this subset.

The most relevant competing families are shown below. The intervals are conservative outward decimal envelopes covering every member of each listed family; the first family is not proved to be the first physical boundary receiver.

| Environmental anchors | Actual displacement norm at $5$ |
| --- | --- |
| $(-1,0,0),(2,0,0)$ | $[0.0563048704,\ 0.0623044327]$ |
| $(0,\pm1,0),(1,\pm1,0)$ | $[0.0524090653,\ 0.0587293065]$ |
| $(0,0,1),(1,0,1)$ | $[0.0488103213,\ 0.0553320884]$ |
| $(0,0,-1),(1,0,-1)$ | $[0.0477296025,\ 0.0542224160]$ |

The first two families have overlapping displacement intervals. Thus the current endpoint errors cannot establish which architrino is physically closest to its class boundary. A stopped-solution argument can nevertheless show that some environmental boundary occurs before a target turnaround by deriving a contradiction from the assumption that every environmental path remains inside the class up to a chosen horizon. Such an argument must retain all competing receivers; it cannot identify the first receiver merely from the numerical stopping label.

## 4. Saved tail and prospective population census

The archive contains 23 nodes, defining 22 quintic cells, from $5$ through $2571/512$. The separate known-controlled outward Bernstein audit covers all 1350 comparison polynomials on this interval. Its environmental polynomial norm bounds are

$$
\widetilde P<0.062414305873,\qquad
\widetilde V<0.170290735182,\qquad
\widetilde A<0.557267073518.
$$

The proposed witness's numerical vertical velocity and acceleration remain respectively above $0.1418869433461$ and $0.2624682313805$ throughout those saved cells. These are rigorous properties of the comparison polynomial, not of the actual solution after $5$. The separate construction manifest brackets its numerical displacement guard by $[5.022064637392759,5.022064638324082]$, outside the last stored uniform node. The audit neither extends the archive to that bracket nor treats the bracket as an actual event.

For an environmental anchor $n$, retain the accepted first-front index

$$
m(n)=\min\{\lVert n-c\rVert^2:\ c\in\{(0,0,0),(1,0,0)\},\ \lVert n-c\rVert^2\ge2\}.
$$

Its first excitation is at $\sqrt{m(n)}-11/8$, with the original unit-neighbor exception included by the restriction in this definition. Consequently the prospective census through $H$ is determined by $m(n)\le(H+11/8)^2$. Exact integer enumeration gives:

| Horizon $H$ | Maximum squared first-front distance | Environmental identities | Including both targets |
| --- | ---: | ---: | ---: |
| $5$ | 40 | 1172 | 1174 |
| $81/16$ | 41 | 1276 | 1278 |
| $41/8$ | 42 | 1324 | 1326 |

The selected horizon $81/16$ adds 104 environmental identities with $m=41$ and exact onset $\sqrt{41}-11/8$. The reserve horizon $41/8$ adds another 48 with $m=42$. All these labels already occur in the 1350-identity allocation. The receipt `census.json` records each label, its exact integer $m$ and its index in the accepted full-population order. The census is conditional on the same first-excitation theorem and a stopped continuation; it supplies no post-$5$ motion by itself.

## 5. Evidence and falsifiers

The local evidence owner is `.local-data/master-equation-closure/first-class-boundary/history/`. `endpoint.json` contains the exact four endpoint triples, separate errors, full 1350-row endpoint audit, projection and radial bounds, numerical reflection discrepancies and stored tail nodes. `tail-polynomial.json` contains the continuous numerical-only bounds for all 22 saved cells. `census.json` contains complete label and first-front inventories for the three horizons. Their source instruments are respectively `endpoint.py`, `tail.py` and `census.py` under `.tmp/mec-008-first-class-boundary/archive/`; unchanged source snapshots are retained in the evidence directory.

The immutable input paths are `.local-data/master-equation-closure/post-restart/approximant/population-h21-4.npz`, `.tmp/mec-008-through-five/hale/pulse.json` and the linked accepted through-five assessment. The endpoint receipt binds their digests in `archive_sha256`, `accepted_errors_sha256` and `independent_acceptance_sha256`. Each known-control receipt binds its executable source, and the census receipt additionally binds the complete endpoint receipt through `endpoint_audit_sha256`. These pointers preserve the exact inputs used by the new boundary comparison without revising any preceding certificate.

Fresh known controls precede each target extraction. They include exact dyadic Hermite reconstruction and vector norms, axis and rational three-four-five projections, a nonzero-error direction-cone check, the empty and 24-label early first-front cases, and exact horizon threshold arithmetic. No archive, accepted comparison receipt, residual subject or independent reference was modified. All extraction commands completed with exit code zero; no trajectory integration was run.

These conclusions are falsified by an authenticated-input mismatch, incorrect endpoint indexing, an invalid projection or cone inequality, a failed outward operation, an omitted allocated candidate, or a mismatch between a reported first-front index and its anchor distances. The first actual environmental class exit, its identity and time, and its ordering relative to a future target turnaround remain the subsequent continuation proof's responsibility. Reaching the displacement ceiling would mark the boundary of the present proof class, not a collision criterion or a failure of the Master Equation.
