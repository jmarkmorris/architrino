# Sub-Field Circular-Root Reference

Status: derived analytic root-inventory reference with source-bound, outward-arithmetic hypothesis verification. This is not an EOM root run, an adapter acceptance, H3 execution validation, or a physical trajectory claim.

## Exact subject and reproduction

The instrument pins the sixteen factual source paths and their current byte hashes directly. It does not consume a dispatch manifest or translate retired source identifiers.

The independently authored integer-interval instrument is `scripts/eom/derive-subfield-circular-root-reference.mjs`, SHA-256 `45f27a7aea84b110aa3cfa0583fb869782c2189af6b003aba4ab2215b40ac003`. The full current report is `.local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/subfield-circular-root-reference-20260827-v1.json`, SHA-256 `c5c7ae5e44e37c7a03ac916f2c406a657e9b90067c27a596302a2731a9ae066f`. Its measured wall time was `11.074` seconds. This measures the reference calculation only, not EOM throughput.

Plainly: the report reconstructs the literal prescribed sources independently. It supplies an expected answer for a future root audit without calling the EOM solver or production geometry evaluator.

Reproduce with a new path:

```bash
node scripts/eom/derive-subfield-circular-root-reference.mjs --out <new-report-path>
```

The output is create-exclusive. The fixed run covers `[0,8]`, all sixteen sources, every unordered simultaneous pair, and 4,097 sample endpoints per source. It checks hashes before and after calculation, reports each completed candidate, and emits progress at least every fifteen seconds during a long candidate. Its resource ceiling is 1,800 seconds.

## Derived bounds

For the literal source

$$
\mathbf X_i(T)=\mathbf C_i+\mathbf U_i\cos\theta_i(T)+\mathbf V_i\sin\theta_i(T),
\qquad \theta_i(T)=\phi_i+\omega_i(T-T_{0i}),
$$

define

$$
B_i=\max(\lVert\mathbf U_i\rVert^2,\lVert\mathbf V_i\rVert^2)+|\mathbf U_i\cdot\mathbf V_i|,
\qquad Q_i=\lVert\mathbf C_i\rVert^2+B_i+2(|\mathbf C_i\cdot\mathbf U_i|+|\mathbf C_i\cdot\mathbf V_i|).
$$

Then $\lVert\mathbf X_i(T)\rVert^2\le Q_i$ and $\lVert\dot{\mathbf X}_i(T)\rVert^2\le\omega_i^2B_i$. Consequently $D=2\max_i\sqrt{Q_i}$ bounds every receiver/source distance at independently chosen times, not only simultaneous distances.

Plainly: an entire-orbit enclosing ball supplies the history-depth bound. A simultaneous separation measurement alone would not justify the delayed-source calculation.

The instrument reads original JSON numeric tokens and uses integer outward intervals at scale $10^{-60}$. Sine and cosine use dyadic argument reduction to $|x|\le1/4$, Taylor polynomials through degrees `49/48`, and interval double-angle restoration. The Lagrange remainders are smaller than $10^{-60}$ by exact factorial inequalities. Square-root displays are rounded by exact integer-square comparisons at scale $10^{-12}$. No library trigonometric value enters these bounds.

For continuous clearance, the endpoint grid divides `[0,8]` into $N=4096$ cells. Every time is within $4/N$ of an endpoint. Pair distance has Lipschitz constant at most $2v_{\max}$, so the minimum enclosed endpoint distance minus the upward-rounded $8v_{\max}/N$ is a continuous lower bound. No interpolation assumption or periodic extension is used.

Plainly: sampling is only the starting point. An explicit maximum-between-samples variation is subtracted, so the final positive clearance applies everywhere in the interval.

| Candidate / binding | Members | Two-time distance upper | Speed upper | Continuous clearance lower |
| --- | ---: | ---: | ---: | ---: |
| `coincident-midpoint common-frequency orthogonal-axis three-binary configuration` / `coincident-midpoint-common-frequency` | 6 | 0.860000000000 | 0.675442420522 | 0.120065570910 |
| `coincident-midpoint equal-radius common-frequency orthogonal-axis three-binary configuration` / `coincident-midpoint-equal-radius-common-frequency` | 6 | 0.640000000000 | 0.502654824575 | 0.116146381506 |
| `coincident-midpoint 3:2:1-frequency orthogonal-axis three-binary configuration` / `coincident-midpoint-3-2-1-frequency` | 6 | 0.860000000000 | 0.989601685881 | 0.122016019724 |
| `phase-compensated equal-geometry orthogonal-axis three-binary configuration` / `phase-compensated-equal-geometry` | 6 | 0.640000000002 | 0.465973493693 | 0.126032207519 |
| `axially separated common-frequency orthogonal-axis three-binary configuration` / `axially-separated-common-frequency` | 6 | 0.860000000000 | 0.597935129784 | 0.118840941198 |
| `axially separated equal-radius common-frequency orthogonal-axis three-binary configuration` / `axially-separated-equal-radius-common-frequency` | 6 | 0.640000000002 | 0.486693441117 | 0.003963778308 |
| `axially separated 3:2:1-frequency orthogonal-axis three-binary configuration` / `axially-separated-3-2-1-frequency` | 6 | 0.860000000000 | 0.948349988691 | 0.117367922916 |
| `axial-transverse coincident-axis interior configuration` / `axial-transverse-coincident-axis-interior` | 6 | 0.880000000002 | 0.385055935173 | 0.361293763802 |
| `high-axial coincident-axis interior configuration` / `high-axial-coincident-axis-interior` | 6 | 0.880000000000 | 0.118193676662 | 0.147635169158 |
| `planar common-center three-binary configuration` / `planar-common-center-three-binary` | 6 | 0.880000000000 | 0.691150383790 | 0.282199034481 |
| `coincident-center two-component circular co-rotating configuration` / `coincident-center-two-component-circular-co-rotating` | 12 | 1.679047348946 | 0.534070751111 | 0.377374651632 |
| `coincident-center two-component circular counter-rotating configuration` / `coincident-center-two-component-circular-counter-rotating` | 12 | 1.679047348946 | 0.534070751111 | 0.158958404267 |
| `coaxial-separated two-component circular co-rotating configuration` / `coaxial-separated-two-component-circular-co-rotating` | 12 | 1.933652470250 | 0.385055935173 | 0.361293763802 |
| `coaxial-separated two-component circular counter-rotating configuration` / `coaxial-separated-two-component-circular-counter-rotating` | 12 | 1.933652470250 | 0.385055935173 | 0.301697324165 |
| `coaxial-separated two-planar-braid co-rotating configuration` / `coaxial-separated-two-planar-braid-co-rotating` | 12 | 1.408687332236 | 0.691150383790 | 0.282199034481 |
| `coaxial-separated two-planar-braid counter-rotating configuration` / `coaxial-separated-two-planar-braid-counter-rotating` | 12 | 1.408687332236 | 0.691150383790 | 0.282199034481 |

Plainly: all sixteen satisfy distance below the two-unit retained depth, speed below normalized wake speed one, and strictly positive simultaneous clearance. These are outward bounds for the literal decimal sources. Earlier displayed values such as bare `0.64` for the phase-compensated equal-geometry and axially separated equal-radius common-frequency configurations are not exact outward limits and must not be copied into a new certificate.

## Derived root inventory

Fix reception $T\in[4,8]$ and normalized wake speed $c_f=1$. For $i\ne j$, let

$$
g(\Delta)=\Delta-\lVert\mathbf X_i(T)-\mathbf X_j(T-\Delta)\rVert,\qquad 0\le\Delta\le2.
$$

Positive simultaneous clearance gives $g(0)<0$, and the two-time distance bound gives $g(2)>0$. For $\Delta_2>\Delta_1$, the triangle inequality and the source speed bound give

$$
g(\Delta_2)-g(\Delta_1)\ge(1-v_{\max,j})(\Delta_2-\Delta_1)>0.
$$

Plainly: the delay residual rises strictly from negative to positive, so it crosses zero exactly once. This argument remains valid at a possible two-time spatial coincidence, where differentiating a distance norm would not be justified.

Thus every nonself pair has exactly one positive-delay ordinary causal root. At that root the separation equals a strictly positive delay, and both transmitter and receiver factors are at least their respective $1-v_{\max}$ bounds. For a self pair, $\lVert\mathbf X_i(T)-\mathbf X_i(T-\Delta)\rVert\le v_{\max,i}\Delta<\Delta$ for every $\Delta>0$, so the only self event is the excluded zero-delay endpoint. Histories `[T-2,T]` remain entirely inside the declared `[0,8]` domain.

Plainly: the independent expected ledger contains one ordinary root per different-member pair and none for a member interacting with its own earlier path. This is an analytic prescribed-history fact, not a finding that the Master Equation generates or retains the path.

## Circular carrier construction reference

The independent segment checker `src/prescribed-path-analysis/CircularHistoryConformance.mjs` compares each original decimal cubic directly with the analytic circular source. It imports only the unchanged, separately reviewed integer-interval primitives identified above, not a production geometry evaluator or carrier constructor. The companion budget calculation `scripts/eom/derive-subfield-circular-history-budget.mjs` verifies the conditional construction allowance for all sixteen sources and 132 members. A budget report is not an accepted carrier manifest.

For a nominal segment $[a,b]\subset[2,8)$, use exact width $b-a=0.002$. Define $J=[a_-,b_+]$ by taking the immediately preceding binary64 value of the parsed $a$ and immediately following value of the parsed $b$, then lifting them exactly into rational arithmetic. Require $J\subset[0,8]$ and $0.002\le |J|\le0.00200000000001$. The checker records the parsed endpoint bit patterns and proves the unchanged polynomial on $J$. Its shift from the original local-time origin to $a_-$ uses directed intervals, not rounded scalar coefficients. The saved nominal partition and search window remain unchanged.

Plainly: the solver's interval arithmetic can inspect a few rounding units beyond a nominal endpoint. The proof covers that same small overhang without changing the prescribed path or requesting additional prehistory.

Let $q$ be one saved coordinate polynomial and $f$ its analytic coordinate. On $J$, independently enclose both endpoint position errors by $\eta_x=10^{-13}$ and both endpoint tangent errors by $\eta_v=10^{-12}$. The endpoint-defect Bernstein argument in the [launch readiness proof](2026-08-27-braid-search-launch-readiness.md#derived-continuous-error-argument) and a fourth-derivative ceiling $M_4\le104$ then give the uniform bounds

$$
B_x=\eta_x+\frac{h_{\max}\eta_v}{3}+\frac{104h_{\max}^4}{300},
\qquad
B_v=\frac{6\eta_x}{h_{\min}}+2\eta_v+\frac{104h_{\max}^3}{8},
$$

where $h_{\min}=0.002$ and $h_{\max}=0.00200000000001$. In particular, use the smaller width in the inverse-width velocity term. Outward evaluation gives $B_x<5.64733333345\times10^{-12}$ and $B_v<1.04302000002\times10^{-7}$. Both fit the exact binary64-representable error radii $\epsilon_x=2^{-37}$ and $\epsilon_v=2^{-22}$. Every actual segment must still pass its endpoint checks; the budget does not establish that a future constructor meets them.

Plainly: the bound reserves space for errors in the stored endpoints as well as the curve between them. Exact binary64 error radii prevent the allowance itself from shrinking when the solver reads it.

The analytic source, rather than an assumed perfectly joined saved curve, is the common continuous reference. Each position box centered on $q$ differs from $f$ by at most $\sqrt3(B_x+\epsilon_x)$ in Euclidean norm. Thus any zero admitted by the represented position boxes obeys $|g(\Delta)|\le2\sqrt3(B_x+\epsilon_x)$. Strict monotonicity of the analytic residual yields

$$
\operatorname{diameter}\{\text{represented residual zeros}\}
\le\frac{4\sqrt3(B_x+\epsilon_x)}{1-v_{\max}}
<8.610548313\times10^{-9}<10^{-8}.
$$

Plainly: the declared curve uncertainty fits inside the fixed root tolerance even without assuming exact joins between saved cubics. This is only a representation-error allowance: additional interval-evaluation overestimation, resource limits, root existence/completeness, and actual EOM certification are separate obligations.

The theorem and the API obligation were reviewed independently. The eleven local controls include an exact cubic, a wrong-tangent counterexample, exact dyadic error radii, binary64 endpoint overhangs, and nonconstant-circle endpoints derived from separate rational Taylor polynomials. No adapter or root run produced these controls. The checker deliberately reports `single-segment-only` and withholds H3 authority; source/member/grid completeness and original-byte/fingerprint binding remain whole-manifest obligations.

The current conditional budget report is `.local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/subfield-circular-history-budget-20260827-v1.json`, SHA-256 `6c380ecb86be8ca505ef7975cdd4d8fb844e2191762692a6b5e29134ee5bfebf`. All sixteen candidate rows and 132 member allowances pass; `actualCarrierValidated` and `h3EvidenceEligible` remain false. The independently reviewed instrument identities are:

| Instrument | SHA-256 |
| --- | --- |
| `src/prescribed-path-analysis/CircularHistoryConformance.mjs` | `e06080cc2e7d62af546bb51e60b65e157905c7d765e9f2d5b8c44f71ce3f22f8` |
| `scripts/eom/derive-subfield-circular-history-budget.mjs` | `5e4aff33e4a82444df5d29b29c2dbd509c935668e262816e1ec0c2128d6732bc` |
| `tests/circular-history-conformance.test.js` | `9bc27937fc30f4ed651d56d4815ceb977a42a6ae1a8511d98225c5fefe5c6d3d` |

Plainly: these identities preserve the reviewed measuring instrument and its conditional calculation. They are not identities for an adapter or executable root result. Seven additional independent boundary/negative controls also passed; no production source, root API, or phase-varying display representative reference changed.

## Execution boundary and falsifiers

Any changed source hash, failed fixed-point primitive control, nonpositive continuous clearance, speed reaching one, or distance reaching retained depth two invalidates the root-inventory reference for that row. Any fourth-derivative ceiling violation, expanded-domain escape, failed actual endpoint bound, or continuous error above a fixed radius invalidates the construction certificate. The future adapter must preserve the literal `C/U/V` vectors, phase, cadence, identities, polarity, and source order; an approximately equivalent radius/tilt reconstruction is not the frozen subject. The catalog-wide arbitrary-vector carrier, continuous whole-manifest conformance, reviewed build receipt, and independent complete root ledger remain outstanding.

The proposed next pilot is specified separately in the [sub-field circular-root H3 pilot draft](2026-08-27-subfield-circular-h3-pilot-predeclaration.md). No H3 execution status, score, Borg sign-off, ordinary evolution, stability, binding, retention, or physical claim changes here.

Closure goal: preserve the independent root-inventory reference and use it unchanged to check the sixteen-row circular-history adapter.
