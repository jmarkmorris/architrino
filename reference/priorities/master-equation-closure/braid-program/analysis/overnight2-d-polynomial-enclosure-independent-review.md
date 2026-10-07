# Independent review of bounded-degree polynomial enclosures

## Disposition

**Derived verdict:** the coefficient convolution, degree truncation, uniform-remainder propagation, scalar interval division, interval Horner evaluation and trigonometric composition in the [frozen instrument](overnight2-d-polynomial-enclosure.py) are mathematically sound for their intended scalar domain under the imported finite IEEE binary64 arithmetic contract. The built-in controls and additional independently derived rational controls passed in this review. This accepts the conditional arithmetic argument, not a scientific target, a residual certificate or trajectory admission.

**Two domain-guard findings require disposition before certification use.** `power(p,n)` needs an explicit nonnegative-integer exponent contract and rejection of invalid exponents; presently a negative exponent returns one. The coefficient shape, nonnegative remainder and evaluation-chart guards are Python assertions and disappear under optimized execution. Either replace safety-critical assertions with explicit exceptions or bind every certified invocation to non-optimized Python with validated inputs. An actual outside-chart counterexample under `-O` is retained below.

Only this new review companion was authored. The subject, imported primitives and all earlier reviews remain unchanged. The parent owns the receiving [research account](overnight2-d-followup-and-research-2026-10-07.md), repairs and any later instrument application. No scientific target or heavy computation ran. The Ramon E. Moore role and shared Specialist charter supplied the review lens, not acceptance authority.

## 1. Representation and multiplication proof

A scalar object represents functions on $q\in[-1,1]$ of the form

$$
f(q)=\sum_{k=0}^{12}c_kq^k+r(q),\qquad c_k\in C_k,\qquad |r(q)|\le E.
$$

The uniform remainder needs no continuity for these value operations. Each stored coefficient interval $C_k$ and the nonnegative radius $E$ must enclose the intended exact input. Bare numeric constructor inputs are exact parsed binary64 encodings, not exact unencoded decimal or rational values. Exact-decimal inputs require an enclosing conversion such as `I.decimal`; otherwise initial conversion error has already occurred before polynomial arithmetic starts. The code stores the upper endpoint of an error interval as a point radius, which is sound when that upper endpoint is a valid nonnegative bound.

For coefficient polynomials $A,B$, their product coefficient at degree $n$ is $\sum_{k+\ell=n}a_kb_\ell$. Each shifted vector product in `__mul__` encloses a term and each interval addition encloses the accumulating coefficient. Every degree through 24 is covered. Overwriting the local array slices after constructing the interval sum does not overwrite either input coefficient array.

Let $\|A\|_1=\sum_k\sup|C_k|$, and similarly for $B$. On $[-1,1]$, discarded product coefficients contribute at most the sum of their magnitudes. If the incoming remainder bounds are $E_A,E_B$, then

$$
|A r_B+B r_A+r_A r_B|
\le \|A\|_1 E_B+\|B\|_1 E_A+E_AE_B.
$$

This is exactly the implemented radius, plus the discarded coefficient bound. Dependence between coefficients or repeated operands can widen this enclosure; it cannot invalidate it. Keeping outward intervals for the retained coefficients also accounts for the coefficient arithmetic rounding. Dropped terms must not later be treated as exact zero.

Addition sums remainder radii; negation retains the radius. Scalar interval division is valid when its denominator excludes zero: coefficient division encloses the polynomial part, and the radius is multiplied by an upper bound on the reciprocal magnitude. Division by another polynomial is deliberately unsupported. `power` is valid by induction for nonnegative integer exponents only. `compose` is Horner composition of a nonempty coefficient sequence; all intermediate truncations retain their error radii.

## 2. Point and range evaluation

`value(q)` evaluates the retained coefficient polynomial by outward interval Horner arithmetic and adds the symmetric remainder interval. It supports a scalar point or scalar interval contained in $[-1,1]$. It is not a vectorized point evaluator. For an interval argument, Horner dependency can make the result wide, but every actual polynomial value on that interval remains included.

`bound()` uses the coefficient-zero interval plus the symmetric radius $\sum_{k\ge1}\sup|C_k|+E$, so it encloses the whole chart. `magnitude` returns the exact maximum absolute binary64 endpoint as an upper-bound value; it does not promise the full range of absolute values. That upper-bound semantics is precisely what the radius estimates require.

A uniform function-value remainder is not a derivative bound. For example, $E\sin(Nq)$ has value norm at most $E$ and derivative norm $EN$. No future consumer may differentiate the stored polynomial and infer a derivative enclosure from the same remainder. Source velocities, accelerations and differentiated reference polynomials require their own exact representations or separately bounded derivative remainders.

## 3. Trigonometric composition

The implementation separates the interval constant coefficient $c$ from $z(q)$, retaining the original uniform remainder in $z$. Its recurrences form the cosine series through degree 14 and sine series through degree 15 in $z$. Both may be viewed as Taylor polynomials through degree 15 because the omitted odd cosine coefficient is zero. For real $z$,

$$
|\cos z-C_{15}(z)|\le\frac{|z|^{16}}{16!},\qquad
|\sin z-S_{15}(z)|\le\frac{|z|^{16}}{16!}.
$$

The computed `z.bound()` includes its remainder, and the outward recurrence for the Taylor error therefore bounds the full argument. Polynomial degree truncation during the Taylor recurrence carries its own remainder and does not replace the analytical Taylor remainder; both are included. The imported center sine and cosine use outward degree-79 Taylor arithmetic and an order-80 Lagrange remainder. They need no sampled transcendental oracle.

The final addition identities are correct: cosine uses $C\cos c-S\sin c$, sine uses $C\sin c+S\cos c$. Separately enclosing the center sine and cosine loses correlation but safely enlarges the result, including when the constant coefficient itself is an interval. Large arguments can produce wide enclosures or overflow because there is no argument reduction; that is a conditioning or fail-closed limitation, not permission to report a tighter result. The finite-arithmetic guard rejects nonfinite interval endpoints.

## 4. Roundoff and subnormal boundary

The imported primitives enclose each binary64 elementary operation by neighboring representable numbers. Under round-to-nearest with gradual underflow and correctly behaving `nextafter`, this includes exact results even when a product rounds to zero. Unary sign change and endpoint absolute values are exact for finite binary64 inputs. Repeated widening of exact zeros creates small positive error radii; these are conservative arithmetic noise.

The review checked minimum-subnormal products and a normal-to-subnormal product against exact rational arithmetic. These checks passed on the executing platform. They do not prove platform-independent IEEE behavior. Flush-to-zero or denormals-are-zero modes would violate the assumed arithmetic contract: one neighboring float around zero need not contain the exact product of operands that should have produced a larger subnormal result. Certification receipts must retain the runtime/arithmetic assumptions. The polynomial arithmetic itself uses no square root. The imported primitive's verified square-root routine may fail closed on problematic subnormal cases; this review does not promote its availability beyond its contract.

Overflow was exercised deliberately; the primitive emitted a NumPy overflow warning and then raised `ArithmeticError` for nonfinite bounds. A denominator interval containing zero also raised `ArithmeticError`. These outcomes are unresolved arithmetic domains, not valid enclosures or evidence of scientific exclusion.

## 5. Executed controls and concrete counterexamples

The following built-in command completed with exit zero and both printed control groups reported `PASS`:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1 PYTHONDONTWRITEBYTECODE=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-polynomial-enclosure.py
```

It executes the frozen interval controls and the subject's degree-14 polynomial, cancellation, rational trigonometric-series and stationary-row controls. It calls `kick.iv.controls()`, not the entire kick-crossing control suite. The center-trigonometry path is nevertheless exercised by the subject's trigonometric controls.

Additional lightweight inline Python controls used `Fraction` reference arithmetic. Before those cases, the interval-containment predicate was checked on the known inclusion $3/2\in[1,2]$ and exclusion $3\notin[1,2]$. All the following independent cases passed:

- The degree-24 exact product $(-1/2+q^4/4+q^{12})^2$ at $q=-1,-3/4,0,3/8,1$, checking convolution and discarded terms against exact powers.
- $(q+r)(q^2+s)$ with $|r|\le1/8$, $|s|\le1/4$, at five chart points and endpoint/zero remainder values, checking the incoming-error cross terms.
- Interval evaluation of $q^2-2q+3=(q-1)^2+2$ on $[-1/4,1]$, whose exact range is $[2,57/16]$.
- Division of $q+1$ by the negative interval $[-2,-1]$, checked at three numerator points and three denominator values.
- Sine and cosine of $c+q/8+r$, where $c\in[1/4,1/2]$ and $|r|\le1/16$, checked at endpoint and midpoint constants, three chart points and endpoint/zero remainders. The independent reference was an exact rational Taylor sum with 50 terms and the explicit $|x|^{100}/100!$ error.
- Exact-rational containment for products $(u,1/2)$, $(u,-1/2)$, $(u,u)$ and $(v,1/2)$, where $u$ is the minimum positive subnormal and $v$ the minimum positive normal. The polynomial product $u/2$ and constant sine argument $u$, enclosed against $u\pm u^3/6$, also passed.
- Under ordinary Python execution, division through zero, evaluation outside the chart and multiplication overflowing finite binary64 bounds failed closed as expected.

Two negative controls exposed real input-validation limitations:

1. `power(P.variable(), -1).value(.5)` returned `[0.9999999999999998, 1.0000000000000004]`; the reciprocal at that point is two. A negative exponent must be rejected, not silently interpreted as an empty product. This does not invalidate the implementation for declared nonnegative integer exponents.
2. With the same shared Python interpreter invoked using `-O`, `power(P.variable(),14).value(2.)` returned `[-1.0000000000000153, 1.0000000000000153]`, while the exact value is 16384. The degree-14 tail radius was proved only on $[-1,1]$; disabling the chart assertion permitted invalid use. Under ordinary execution this outside-chart query raises `AssertionError`. Optimized Python also removes assertions in the built-in controls, so a printed `PASS` under that mode is not a validation receipt.

No claim that the sampled control points prove a full enclosure is made. The full enclosure claim comes from the independent algebra and the interval primitive assumptions above; the controls exercise distinct implementation failure modes against known results.

## 6. Source identities, preservation and falsifiers

Direct `shasum -a 256` at review entry measured:

| Source | SHA-256 |
| --- | --- |
| `overnight2-d-polynomial-enclosure.py` | `16a2312c80af64c785c39d07781b843ae1a5a5f6cfac4af70a763720f78abbec` |
| Imported `overnight-d-kick-crossing-independent-check.py` | `ea6b4781df9db8bf71c508fedd8dfe02c7867ab1fdf51f5498d5cbdbbe12fafa` |
| Imported `overnight-d-tail-interval-independent-check.py` | `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff` |

The closing `shasum -a 256` read reproduced all three identities unchanged. Explicit `test -f` checks passed for the two distinct relative-link destinations in this companion; neither uses a fragment. Scoped `git diff --no-index --check /dev/null` on this new file emitted no whitespace diagnostics; its difference exit status is expected for a new file. Inline controls wrote no source or runtime files, with bytecode output disabled. Their inputs, independent references, outcomes and negative counterexamples are retained above.

The algebraic claim is falsified by an input satisfying the representation and arithmetic contract whose exact result is outside the reported interval. Independent exact-polynomial, rational-series and subnormal controls give operator-replayable falsifiers. Use outside the chart, unsupported exponent domains, unaccounted initial encoding error, silently discarded remainders, or differentiation without a derivative-remainder bound invalidates an application even if these controls pass. The primitive and kick modules were read solely to audit the subject's dependency behavior; no new scientific claim about their target applications is made.

This instrument supplies candidate arithmetic for the earlier polynomial-residual proposal. Complete root admission, source-piece coverage, positive off-root denominators, jump allowances, exact reference representation, whole-cell residual bounds and actual-history error transport are all separate and remain unproved by this arithmetic review.
