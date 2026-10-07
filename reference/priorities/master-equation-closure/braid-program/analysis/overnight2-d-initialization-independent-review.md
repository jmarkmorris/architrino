# Independent review of rational initialization bounds

## Disposition

**Derived disposition:** the [initialization checker](overnight2-d-initialization-check.py) correctly encloses the literal rigid birth positions, original post-kick velocities and their discrepancies from the stored initial nodes. Exact-rational Taylor evaluation reduces arithmetic inflation while preserving the preparation defined in the [frozen source-kick review](overnight-d-kick-crossing-independent-review-2026-10-07.md). No preparation, kick, history-joining convention or equation has changed.

**Measured receipt:** the retained `initialization-rational.json` gives

$$
\max_j E_x^j=2.6645352591003773\times10^{-15},\qquad
\max_j E_v^j=6.661405910386724\times10^{-16},
$$

$$
\max_j\left(\tfrac15 E_x^j+E_v^j\right)
\le1.1990476428587482\times10^{-15}.
$$

Here each $E_x^j,E_v^j$ is the checker's coordinate absolute-sum upper bound, so it also bounds the corresponding Euclidean norm. The weighted result is the maximum of separately enclosed per-member expressions, with coefficient $1/5$ represented as an exact decimal interval. These are upper bounds, not measured true discrepancies. Code review, independent analytic controls and receipt-binding checks support their initialization-only meaning; this review did not rerun the target.

No mathematical defect was found for the retained input. A reusable invocation must retain ordinary Python execution or add an explicit optimized-execution rejection: this checker uses assertions for its preparation identity, kick and speed guards, and for its numerical controls. A printed control pass under `-O` would not establish those checks. This execution qualification does not change the audited literal input or the supported initialization result.

## 1. Exact-rational trigonometric enclosure

Let the interval endpoints $a,b$ be interpreted as their exact binary64 rational values, and set $m=(a+b)/2$, $r=(b-a)/2$. Both operations occur in `Fraction` arithmetic. The recurrence builds

$$
S_{79}(m)=\sum_{k=0}^{39}\frac{(-1)^km^{2k+1}}{(2k+1)!},\qquad
C_{79}(m)=\sum_{k=0}^{39}\frac{(-1)^km^{2k}}{(2k)!}.
$$

The cosine sum has degree 78 and is also its degree-79 Taylor polynomial because the degree-79 coefficient is zero. Since every derivative of sine and cosine has absolute value at most one, Taylor's theorem gives, for either function $f$,

$$
|f(m)-P_{79}(m)|\le\frac{|m|^{80}}{80!}.
$$

The same derivative bound gives the global Lipschitz inequality $|f(x)-f(m)|\le|x-m|\le r$ for all $x\in[a,b]$. Therefore the exact rational interval

$$
\left[P_{79}(m)-\frac{|m|^{80}}{80!}-r,
P_{79}(m)+\frac{|m|^{80}}{80!}+r\right]
$$

contains the full image. This is precisely `rational_trig`. Its explicit $|m|\le16$ guard bounds the intended evaluation domain; the radius need not satisfy a corresponding smallness condition because the Lipschitz inequality is global. The resulting interval can be wider than $[-1,1]$ without becoming invalid. There is no floating trigonometric call, numerical integration or sampled approximation in this construction.

The displayed remainder applies equally to negative centers and to cosine. An alternating-series proof is not needed by the subject; that separately derived fact provides independent controls below.

## 2. Conversion to outward binary64 endpoints

For an ordered exact-rational interval $[A,B]$, `enclose` converts each endpoint to binary64 and compares the converted value with the original rational using `Fraction.from_float`. If the proposed lower endpoint lies above $A$, it moves down one adjacent float; if the proposed upper endpoint lies below $B$, it moves up one adjacent float. Under the stated correctly behaving binary64 conversion and `nextafter` contract, the resulting interval encloses $[A,B]$.

This comparison also handles underflow: a positive rational below the minimum subnormal may convert to zero, which is already a valid lower bound, while its upper endpoint is moved to the least positive subnormal. Negative underflow is symmetric. Exact representable values need no widening. Overflow or a nonfinite interval fails rather than supplying a finite certificate. Independent rational controls exercised subnormal half-ulp cases as well as normal rounding in both directions.

All later products, differences, vector assembly and coordinate sums use the unchanged outward interval primitive. Parsed literal radii, phases, heights, angular rate, stored nodes and kick entries mean exact binary64 encodings. The calculation does not silently reinterpret their original decimal spelling as an exact decimal quantity. The weight `.2` is explicitly enclosed from the exact decimal $1/5$.

## 3. Same preparation and same comparison join

For each member $j$, the exact literal rigid birth position and incoming velocity are

$$
\mathbf b_j=(r_j\cos\phi_j,r_j\sin\phi_j,z_j),\qquad
\mathbf v_j^-=(-r_j\omega\sin\phi_j,r_j\omega\cos\phi_j,0).
$$

The original encoded kick is $\mathbf k_j$, so the exact post-kick velocity used here is $\mathbf v_j^+=\mathbf v_j^-+\mathbf k_j$. The instrument checks its interval norm is strictly below one; no initial ceiling projection is introduced. The inspected literal preparation has $u=0$, matching these formulas, and the metadata identifies balance one and seed one. Equality between the stored kick and metadata kick is checked rather than regenerating or reseeding it.

Writing stored nodes as $\mathbf x_j^0,\mathbf v_j^0$, the checker's errors bound

$$
|\mathbf x_j^0-\mathbf b_j|\le E_x^j,\qquad
|\mathbf v_j^+-\mathbf v_j^0|\le E_v^j.
$$

The frozen source-kick review defines $\mathbf d_j=\mathbf x_j^0-\mathbf b_j$ and translates the negative comparison rigid path by that fixed vector. Thus the exact-minus-reference position error on the complete negative past is the constant $-\mathbf d_j$, the negative velocity error is zero, and the post-kick velocity error is exactly the second expression above. The new checker evaluates the same three quantities. In particular, it does not set the initial position error to zero merely because the comparison's two position traces agree.

The older bounds, `3.905159011915094e-12` for position and `3.594631445249012e-13` for post-kick velocity, included outward floating Taylor-series inflation. Replacing that arithmetic by exact-rational Taylor evaluation and one final outward conversion can produce the much smaller recorded bounds even though the new coordinate absolute-sum norm is conservative relative to the Euclidean norm. This is a sharper enclosure of the same discrepancy, not a changed initial condition or evidence that either upper bound is attained.

Application to a later comparison reference requires its initial position and velocity nodes to equal the stored nodes checked here. The new initialization receipt itself concerns the named seed-one NPZ. Residual transport, source-time corrections, event terms and finite-history trajectory membership remain separate obligations.

## 4. Controls and receipt audit

The shared-venv command below completed with exit zero and both control groups reported `PASS`:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 PYTHONDONTWRITEBYTECODE=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-initialization-check.py
```

No `--target` invocation was made. Independent inline controls first checked the containment predicate on a known inclusion and exclusion, and the separately written series bracket at zero. They then passed:

- Sine and cosine enclosures at centers $-16,-3,-1/4,0,1/4,1,16$, compared with consecutive exact rational partial sums of 60 and 61 terms. Their omitted alternating tails decrease in magnitude at these orders, giving independent brackets.
- The interval-radius enclosure on $[-3/4,1/4]$, checked at its endpoints and selected interior points against those rational series brackets.
- Outward rational conversion for $1/3$, $-1/7$, $1\pm2^{-54}$, $\pm2^{-1075}$, $2^{-1022}-2^{-1075}$ and $2^{53}+1/3$.
- A separate exact rigid initialization: radius two, angular rate $1/4$, phase zero and height three, with kick $(1/8,-1/16,1/32)$. The enclosed birth position contains $(2,0,3)$ and the post-kick velocity contains $(1/8,7/16,1/32)$, checking the tangent signs and unmodified kick addition.

The identity auditor was checked against the known SHA-256 of `abc` and a known file-hash match and mismatch before reading the receipt. All five recorded dependencies matched their files. Direct checks confirmed balance one, seed one, $u=0$, metadata literal-input identity and exact array equality of the NPZ and metadata kicks. Initial position, initial velocity and kick arrays each have finite shape `(8,3)`. The receipt contains each member label zero through seven exactly once, and all three published maxima equal maxima over their corresponding eight rows. These are provenance and aggregation checks; they are not target reproduction.

## 5. Identities and preservation

Direct `shasum -a 256` and the controlled dependency audit established:

| Artifact | SHA-256 |
| --- | --- |
| Initialization checker | `971ffef31463214b3c2d846378f6f3c348c91ccdf4af212a95e6893a1fab15cf` |
| Initialization receipt | `45b66ce0e346edd48449ed98308f033607508ad6d99d27d434d19aad225cc7d3` |
| Frozen interval primitive | `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff` |
| Seed-one NPZ | `99c0555f4eb52236bcb0a3c615fb96a32a4d3a1bc488bd89081d411c62619b84` |
| Seed-one metadata | `274e0fc6f36fce114848fa9b511ee213bc00ac355f23da253a4e830621488502` |
| Literal preparation | `d937eee01771c6a75b49b07ed1f6d1125ed1a91c82fbb4a9b76bf2f529c6d56d` |
| Frozen source-kick review | `2ed369583c7e65fae15b0616b6dfab6a5248d47064f61b2dcf15b282638d0c5e` |

Only this review companion was authored. No subject, oracle, receipt, preparation, previous review or runtime evidence was edited. Inline controls used bytecode suppression and wrote no files. The retained source-kick review supplies the initialization definition; the Ramon E. Moore role and shared Specialist charter supply an analytical lens only. The parent owns integration in the [research account](overnight2-d-followup-and-research-2026-10-07.md).

The closing `shasum -a 256` read reproduced the checker, initialization receipt and old source-kick review identities unchanged. Explicit `test -f` checks passed for all three distinct relative-link destinations; none uses a fragment. Scoped `git diff --no-index --check /dev/null` on this new review emitted no whitespace diagnostics; its difference exit status is expected for a new file.

The enclosure claim is falsified by an exact trigonometric value outside its rational Taylor-plus-radius interval, an exact rational endpoint outside the converted binary64 bracket, or a represented initial discrepancy larger than its admitted bound. Its preparation binding fails if the literal data, selected balance/seed, encoded kick or stored initial nodes differ from the recorded identities. The weighted bound cannot be used with another weight or norm without a corresponding comparison. These are initialization bounds only; a later departure from an error tube would not by itself refute this local result.
