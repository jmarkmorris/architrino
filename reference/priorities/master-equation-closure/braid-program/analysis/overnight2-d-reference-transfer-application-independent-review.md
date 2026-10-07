# Independent review of the interval reference-transfer application

## Disposition and frozen scope

Derived disposition: [the prepared interval application](overnight2-d-reference-transfer.py) implements the [reviewed transfer theorem](overnight2-d-reference-transfer-independent-review.md) correctly within its declared scope of a complete, independently accepted constant-weight mesh admission. No required mathematical or implementation correction was found. This is a pre-target review; no transfer output or new trajectory prefix is accepted here. The live Ramon E. Moore lens and retained Specialist charter supplied the review discipline; independently derived polynomial identities and known controls supply the evidence.

The frozen subjects, verified by SHA-256 at opening and closure, are `overnight2-d-reference-transfer.py` at `108e40c360c4158e79151d22ddd325344d173635fe69ad5757f157f7e2756ea0` and [the augmented theorem note](overnight2-d-reference-transfer.md) at `b17a77b728f28c49f678f5c2efa0cbe0ce9a31507f800a9407eeb627a9da07e3`. The consumed exact-node helper `overnight2-d-dense-region.py` is `4b366ac045bb8198c0bbeb41bc52faed9b664833a6e6926541065acd77f60fd6`; the outward interval primitive `overnight-d-tail-interval-independent-check.py` is `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff`. The original eight-member balance-1 seed-1 preparation, kick and selected ceiling remain unchanged, with $c_f=1$.

## Independent polynomial derivation

For a mesh cell of exact encoded duration $h$, displacement $d$, shared velocity nodes $v_0,v_1$ and normalized coordinate $q$, the local Hermite part is $h v_0q+bq^2+cq^3$, with $b=3d-h(2v_0+v_1)$ and $c=-2d+h(v_0+v_1)$. Add the exact cumulative initial-plus-increment node $x_k$ and the correction $q^2(1-q)^2(R_0+R_1q+R_2q^2+R_3q^3)$. Independent expansion gives the coefficients

$$
(x_k,hv_0,b+R_0,c+R_1-2R_0,R_2-2R_1+R_0,R_3-2R_2+R_1,R_2-2R_3,R_3).
$$

These match `mesh_coeff`. The retained Hermite definition uses encoded absolute endpoints, so `old_coeff` correctly computes its displacement by outward subtraction of those endpoints. It does not substitute the mesh's displacement or cache interpretation. Physical-time derivative coefficients are $m c_m/h$, with degree reduced by one. The code differentiates these finite exact polynomial descriptions before restricting either position or velocity to a common interval. It does not differentiate an arbitrary uniform remainder.

On a common interval $[\ell,r]$ in a cell $[t_0,t_1]$, put $q=a+bz$, $a=(\ell-t_0)/h$, $b=(r-\ell)/h$, $0\le z\le1$. Binomial expansion gives coefficient $\sum_{m\ge k}\binom mk c_m a^{m-k}b^k$, exactly the formula in `affine`. The elementary identity

$$
z^k=\sum_{j=k}^n\frac{\binom jk}{\binom nk}\binom nj z^j(1-z)^{n-j}
$$

follows by factoring $z^k$ and applying the binomial theorem to degree $n-k$. Therefore `bernstein_range` is the correct power-to-Bernstein map. Its basis is nonnegative and sums to one, so minimum lower and maximum upper coefficients give a complete componentwise enclosure on the common interval. Degree padding in `difference` is valid. Subtracting interval coefficient lists before bounding retains available cancellation without assuming independence of shared values.

All used binomial coefficients and differentiation integers for degrees at most seven are exactly representable. Interval addition, multiplication, division and verified square root supply the outward operations; duration and normalized-coordinate differences are enclosed rather than assumed exactly representable. Exact cumulative nodes use rational sums with an exact rational comparison to choose adjacent binary endpoints. These enclosing coefficient arrays need not have jointly attainable endpoints to be safe. Dependency inflation can make a result unhelpful but cannot turn it into an underbound.

## Coverage, source definitions and error meanings

`common_partition` includes zero, the requested admitted endpoint and every strict interior node from both time grids. Strict order and finiteness checks precede the interval loop. Each left endpoint selects the cell to its right, and the explicit right-end containment test verifies both containing cells. Closed polynomial boxes cover the common endpoints. Positive-time mesh and Hermite positions and first derivatives join at their respective exact shared nodes; adjacent acceleration traces are not required for this value-only transfer. The negative branch and its birth velocity trace are handled as the separately declared common joined rigid branch, with inherited original initialization bounds. This is a definition of the new complete comparison $B$, not evidence that some earlier numerical negative-time evaluator had exactly that meaning.

The incoming mesh receipt supplies a whole-cell nondecreasing error envelope through each saved right endpoint. Thus using `env[ka]` on every common subinterval of that mesh cell is valid. This semantic premise comes from independently accepted delayed admission, not from the transfer file's inventory checks alone. The code verifies contiguous cell/member inventory, endpoints, finite nonnegative values and reference/domain bindings; it does not reprove trajectory acceptance from an arbitrary JSON with plausible fields. A future variable-weight receipt cannot be substituted under the current constant-alpha contract.

With equal exact constant weight $\alpha$, complete bounds $D_x\ge|Q_A-Q_B|$ and $D_v\ge|Q_A'-Q_B'|$ give the recorded allowances

$$
E_A+\sqrt{\alpha^2D_x^2+D_v^2},\qquad E_A/\alpha+D_x,\qquad E_A+D_v.
$$

The mesh domain proves $W_A=Q_A'$ throughout. Taking $W_B=\Pi_{\mathcal B}Q_B'$ and using projection nonexpansiveness proves the first bound for the feasible weighted error; the third independently bounds the raw derivative error $|V-Q_B'|$. Thus the code need not locate the projection crossings of $Q_B'$ for this task. It does not bound $W_B'$ or prove unit-speed $Q_B$. The output's `raw_velocity_error_upper` must retain this direct meaning, and the original tail reference's definition and endpoint-center requirements remain separate.

The inherited negative-time allowance is identified and dependency-bound rather than repeated as new numerical rows. Consumers must retain that original initialization receipt. The finite positive interval records are not automatically nondecreasing; a consumer requiring that property must use a running maximum. The global maxima are valid over the recorded positive interval, but omit no need for explicit negative history or later old-source coverage.

## Input and provenance inspection

Measured: after the independent controls below, a separate SHA-256/JSON/initial-array inspection verified the retained tail NPZ and metadata against `tail-interval-independent/seed1.json`, checked the literal balance/seed preparation hash, and checked identical encoded initial mesh and retained-reference positions and velocities. This inspection evaluated no transfer target and did not read the pending first400 receipt. The known `abc` digest was checked before the identity instrument was used.

| Read-only evidence | SHA-256 |
| --- | --- |
| `b1-s1-tail-search-h600.npz` | `89d814a745afc689a54cf73ceb3dd6de8679c78e820f8c5d540b960b0e8e633c` |
| `b1-s1-tail-search-h600.json` | `84991ded6f12345c53bf4b080adf418396354f7dfb5fbaabf94849537b5a0951` |
| `tail-interval-independent/seed1.json` | `5d5303746967a62335860f6b8053f99273fcf7ec170539266bc703858ce0a6f9` |
| `mesh-reference-t67.npz` | `b2f9aabf6f3dbf4ac49336e55b34b3ff89e00d005444d37ca62e19e2dd07148c` |
| `mesh-region-t67.json` | `dd2e452fb1e145a95090ce17849cbd41555ca4c611a85fb125e1ef85bc5c2825` |
| `initialization-rational.json` | `45b66ce0e346edd48449ed98308f033607508ad6d99d27d434d19aad225cc7d3` |
| Accepted `delayed-admission-mesh-first160.json` | `351bc49a350019c3e4dde763423ae30bafdef6dad4df27d205f93811958938aa` |
| Literal `geometry-session-20261004/results/0186.json` | `d937eee01771c6a75b49b07ed1f6d1125ed1a91c82fbb4a9b76bf2f529c6d56d` |

These runtime files remain under the established ignored `.local-data/master-equation-closure/` owners. The accepted first160 receipt was used only to verify existing input bindings; the default prospective first400 input remains subject to its own completed-receipt acceptance. The seed-1 tail receipt is used here to identify $B$, not to infer actual tail membership. The target records the imported helper and primitive, both reference inputs, prior admission, initialization/domain dependencies and tail identity receipt, then checks the recorded bytes again before writing final output. Partial rows retain the same interval inventory. A completed output still requires independent coverage, arithmetic and identity adjudication.

## Known controls and fail-closed behavior

Measured: supplied controls passed under the shared venv before any scientific-data binding inspection, including their inherited primitive controls. Separate reviewer-authored exact-rational controls then exercised the actual coefficient and restriction functions against independent expectations:

- On physical time $[0,2]$, $Q=(t/2)^7$ is represented by displacement $1$, terminal velocity $7/2$ and correction $(R_0,R_1,R_2,R_3)=(4,3,2,1)$. Every position coefficient encloses the exact monomial coefficient, and every physical derivative coefficient encloses $7q^6/2$.
- Restriction to $[1/2,3/2]$ has $q=1/4+z/2$. Every resulting position and derivative coefficient was checked against the independent binomial formula. Bernstein hulls enclose their exact endpoint extrema. This exercises the nonunit duration and avoids accidentally treating the derivative as a derivative with respect to $z$.
- An independent retained cubic $Q=t^3$ on $[0,2]$ gives position coefficients $(0,0,0,8)$ and velocity coefficients $(0,0,12)$. At physical time $1$, its differences from the seventh-power mesh control are $1/128-1$ and $7/128-3$, both enclosed after actual pair restriction and subtraction.
- The nonmonotone quadratic $q(1-q)$ has Bernstein hull $[0,1/2]$, although its true maximum is $1/4$. The computed enclosure includes the full Bernstein hull; this checks that the method does not silently replace convex-hull bounds by endpoint values.
- A mixed-grid interval ending inside both full histories gives the exact expected partition $[0,1/4],[1/4,1/2],[1/2,3/4]$ with the expected cell indices. Duplicate nodes, a NaN node, zero endpoint and an endpoint beyond available history were rejected.
- Exact accumulation of initial coordinate $2^{53}$ followed by increments $1,-2^{53}$ encloses the middle value $2^{53}+1$ and final value $1$, independently distinguishing exact increments from rounded absolute-node subtraction.
- Nonfinite intervals, division through zero and an overflowing product raise arithmetic errors. The overflow warning in that deliberate control is expected, and the product was rejected. CLI execution under `-O` rejected with `RuntimeError: ordinary Python required`, so inherited assertion controls cannot silently disappear from this entrypoint.

The finite IEEE754 round-to-nearest/nextafter contract of the reviewed primitive is retained. Subnormal products may enlarge enclosures or make verified square-root iteration fail; they do not justify bypassing the finite-interval checks. This application adds no new unverified transcendental arithmetic. Overflow, invalid durations and resource limits can prevent completion; a partial file is not a successful transfer. Resource caps are implementation limits, not a measured prediction of target cost.

## Falsifiers, preservation and remaining application boundary

The verdict would be overturned by an exact coefficient outside the returned interval, a common interval outside either owning piece, a missing source-history interval or birth trace, a prior envelope that bounds only its endpoint, a changed bound reference, or a raw/feasible velocity substitution. The independent controls test the first algebraic cases; the remaining conditions must also be checked against any completed input and output receipt.

The only new authored file is this companion. Subjects, primitive, prior reviews, runtime evidence and shared research account were not edited. Closing subject/helper identities match those above; relative links and whitespace were checked. This accepts a prepared transfer instrument for its stated premises, not an actual transfer. No scientific target was run or replayed. Complete first400 admission, a completed transfer receipt and its independent adjudication remain necessary before reporting any new bound around the retained reference. Roots, acceleration factors, residuals, continuation, endpoint-center conditions and tail admission remain separate obligations.
