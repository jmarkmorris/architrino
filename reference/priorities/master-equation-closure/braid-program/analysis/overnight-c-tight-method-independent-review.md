# Independent review of the tighter circular interval method

## Verdict and remaining evidence boundary

Claim grade: derived. No unsound refinement was found in the frozen tight evaluator on the exact declared subfield domain. The smaller circular distance-derivative bound is valid throughout the delay interval, the antipodal fast path preserves the shared-radius dependency present in this geometry, and intersecting the two on-root radial expressions preserves every true residual. Root coverage and the strict-sign exclusion criterion remain valid.

The new cover driver addresses two limitations identified in the [earlier method review](overnight-c-interval-method-independent-review.md): it checks the entire leaf partition before every save, and it stores exact binary endpoint tuples for each newly excluded leaf. This is a substantive improvement to the saved evidence contract.

Three boundaries remain:

1. The equal-interval antipodal fast path is correct because the declared pair radii occupy disjoint intervals. Equal non-point enclosures do not generally mean equal parameters. Reuse for independent radii with identical ranges would be unsound; the frozen full-cover driver's exact domain check and the fixed residual construction preserve the necessary contract here.
2. Inherited exclusions retain their original evidence. Rows inherited from the earlier evaluator can still contain display strings without exact endpoints, and the new driver does not reevaluate their residuals. Their recorded source ancestry remains necessary. The new endpoint format applies to new exclusions; it does not retroactively strengthen earlier rows.
3. This audit establishes method soundness under the inspected interval backend and execution contract. It does not verify a final cover, replay target leaf residuals, or independently measure the reported sixteen-leaf pilot. A partial cover remains partial. A finished exclusion still needs a complete saved partition, successful execution, frozen source and runtime identity, and a supported witness for every excluded leaf.

The actual completed-cover claim, if one becomes available, is separate from this method verdict. No scientific acceptance or status promotion is supplied by this reviewer.

## Frozen sources and geometry

The subject files are the [tight interval evaluator](../evidence/overnight-c-tight-interval.py) and [tight cover driver](../evidence/overnight-c-tight-cover.py). `shasum -a 256` measured the assigned source identities:

| Subject | SHA-256 |
| --- | --- |
| Tight evaluator | `71c94b26243a7bd2eca7dfe41b6513779e0573a001e148649aaf420e4e7a6004` |
| Tight cover driver | `b5f1a6810042533dfe1625417f5c772d702eca426a94c05979cee29a44d7d564` |

The evaluator pins the earlier `overnight-c-subfield-interval.py` and replaces only its in-memory `root_row` function. The cover driver pins the tight evaluator and the earlier continuation helper. The earlier source files are preserved. The inherited `residual_box` resolves the replaced row function through its original module's globals, so the new rows are actually used by the three-receiver residual calculation.

The [logarithmic equation owner](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) remains authoritative. Complete paths are $X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)}$ for all real time, with fixed unit polarity $q_{a,s}=s$, $K_{\log}=c_f=1$, all ordinary positive-delay roots, unchanged absolute transmitter weighting, and no ceiling or receiver multiplier. The parameter domain is exactly

$$
r_1=1,\quad r_2\in[6/5,7/5],\quad r_3\in[8/5,9/5],
\qquad\omega\in[1/10,1/2],
$$

$$
\phi_1=0,\qquad \phi_2,\phi_3\in[-22/7,22/7].
$$

The phase rectangle contains a complete representative for each phase; its proof and rational subdivision contract are unchanged from the earlier review. This refinement is not a superfield evaluator and does not inherit the separate superfield theorem's root census.

## Distance derivative, root initialization, and complete coverage

Claim grade: derived. For fixed receiver radius $a>0$, circular source radius $b>0$, and delayed relative angle $\theta=\delta-\omega\tau$, write

$$
d^2=a^2+b^2-2ab\cos\theta.
$$

The two exact identities

$$
d^2-b^2\sin^2\theta=(a-b\cos\theta)^2,
\qquad
d^2-a^2\sin^2\theta=(b-a\cos\theta)^2
$$

imply $b|\sin\theta|\le d$ and $a|\sin\theta|\le d$. For positive distance they therefore give

$$
\frac{ab|\sin\theta|}{d}\le\min(a,b),
\qquad
\left|\frac{dd}{d\tau}\right|\le\omega\min(a,b).
$$

This is an off-root geometric bound. It does not substitute causal delay for geometric distance. At a possible zero-distance trial point, the same global Lipschitz bound follows by continuity and integration of the bounded derivative on the adjoining intervals. Such a trial point is not an ordinary causal root with positive delay.

Let $v_*$ be any upper bound for $\omega\min(a,b)$ over a parameter box. The code obtains one from the upper endpoint of `w * min(a.b, b.b)`. Since $\min(a,b)\le\min(a_{\max},b_{\max})$, the construction is valid for both source orientations. At a root, $d(\tau)=\tau$ and the distance Lipschitz bound yields $d(0)\le(1+v_*)\tau$. Thus the tighter initial interval

$$
\tau\in\left[\frac{d_{\min}}{1+v_*},\ a+b\right]
$$

is sound whenever $d_{\min}\le d(0)$. The bound does not require the smaller radius to belong to the source: it controls distance change, rather than source displacement. This distinction is necessary when the source circle is the larger one.

The source factor along the geometric distance chart is $D=1+\omega ab\sin\theta/d=1-d'$. Therefore $1-v_*\le D\le1+v_*$ also holds away from roots. The existing mean-value contraction using geometric distance can safely intersect its derivative enclosure with this tighter interval. At a root only, replacing $d$ by $\tau$ in the final source factor is valid. The midpoint and finite-step stopping arguments from the earlier review remain unchanged; the floating-point width comparison controls only termination of contraction.

All source speeds remain at most $9/10$, so the entire-history census is still one positive root for each distinct source-receiver pair and none for self. Present separation is at least $1/5$ between different radii and at least two within an antipodal pair. The causal residual is strictly decreasing, starts positive for partners, and is negative for delay greater than $a+b$. Self starts at the excluded zero-delay endpoint and is negative thereafter. The tighter bound removes no admitted channel; it contracts the same thirty partner roots.

For cross-pair channels, the three maximum derivative bounds are $1/2$, $1/2$, and $7/10$, giving the uniform source-factor floor $3/10$. These are derived domain bounds, not observed root margins. The antipodal same-pair channels have the stronger floor proved next.

## Antipodal shared-radius fast path

Claim grade: derived. In the actual residual construction the three radius enclosures lie in the pairwise disjoint ranges $\{1\}$, $[6/5,7/5]$, and $[8/5,9/5]$. Every descendant box retains that separation. Consequently identical radius enclosures identify the same binary; its opposite endpoint has relative phase exactly $\pi$. This is why the code's equality test on interval tuples is legitimate here. It must not be interpreted as a generic rule for two independent unknown radii.

For this shared radius $a$, put $x=\omega\tau/2$. The geometric range bound gives $0<\tau\le2a$, hence

$$
0<x\le\omega a\le\frac9{10}<\frac\pi2,
\qquad
\cos x\ge1-\frac{(9/10)^2}{2}=\frac{119}{200}>0.
$$

Thus the antipodal distance is exactly $d(\tau)=2a\cos x$ throughout the whole initial root interval, without an absolute-value ambiguity. The causal equation and derivative are

$$
\tau=2a\cos(\omega\tau/2),
\qquad
-h'(\tau)=D=1+\omega a\sin(\omega\tau/2).
$$

The latter identity is valid off-root as the derivative of $h(\tau)=2a\cos(\omega\tau/2)-\tau$. Since $\sin x\ge0$ in this chart, $1\le D\le1+\omega a\le19/10$. The fast-path initialization $[2a/(1+v_*),2a]$ and every subsequent mean-value contraction therefore contain the unique root. Its denominators are positive throughout. The fast path has no tangent pole because its entire argument interval stays below $9/10$ and cosine has the positive floor above.

At a root, the delayed relative angle is $\theta=\pi-2x$. Therefore $1-\cos\theta=2\cos^2x$, $\sin\theta=2\sin x\cos x$, and $\tau^2=4a^2\cos^2x$. Substitution into the ordinary logarithmic rows gives

$$
A_r=\frac{\sigma}{2aD},
\qquad
A_t=-\frac{\sigma\tan x}{2aD}.
$$

The actual same-binary partner has $\sigma=-1$, so these become $A_r=-1/(2aD)$ and $A_t=\tan x/(2aD)$. The code retains $\sigma$ explicitly and implements the same identities. This simplification uses the true shared parameter $a$; replacing independently variable $a,b$ by one symbol would invalidate it even if their interval bounds happened to match.

The installed `mpmath/libmp/libmpi.py` implementation of `mpi_tan` was inspected: it evaluates interval sine and cosine and divides them with the interval division routine. On this chart the denominator cannot contain zero under the proved argument bounds. As with the earlier method, this is an audit of the used backend path with known-case corroboration, not formal verification of the full numerical library.

## Intersecting the two radial expressions

Claim grade: derived. For a general cross-pair row, the causal identity is $\tau^2=a^2+b^2-2ab\cos\theta$. Rearranging gives

$$
2a(a-b\cos\theta)=\tau^2+a^2-b^2.
$$

Hence the two expressions evaluated after root contraction are exactly equal at every causal root:

$$
\frac{\sigma(a-b\cos\theta)}{\tau^2D}
=\frac{\sigma}{2aD}\left(1+\frac{a^2-b^2}{\tau^2}\right).
$$

Each interval evaluation separately contains every true radial row. Their intersection therefore also contains every true row, even though the two expressions lose different parameter correlations when evaluated over a box. This is an on-root identity and is not used to replace the off-root derivative in the contraction. The radii, delay, and source-factor denominators all have positive floors on the declared domain.

An empty intersection would signal an implementation or enclosure failure and raises an exception; it does not authorize excluding the leaf. The tangential expression remains the original enclosed row. After summing the rows, the unchanged strict-sign test excludes a leaf only if one necessary residual interval has strictly positive lower endpoint or strictly negative upper endpoint. All boundary points remain included in that test.

## Cover checks, serialization, and inherited witnesses

Claim grade: derived. The new driver first checks that the stored domain equals the exact frozen base domain, then checks the incoming union of excluded and unresolved paths with the earlier complete-tree validator. During computation a leaf is replaced only by its exclusion, a retained unresolved leaf, or its two exact midpoint children. Those operations preserve the complete rational cover.

The new `save` function constructs the entire unresolved list and invokes `old.check_partition` before constructing and serializing the saved result. Thus every successful checkpoint save has passed the no-duplicate, no-ancestor, matching-sibling tree check. The completion flag is computed from that checked unresolved list. The prior order, in which the final assertion followed the save, is not used here. Output-size validation precedes the temporary-file write and atomic replacement. An exception stops the run rather than creating a new scientific exclusion for a removed pending leaf; the last successful checkpoint remains the earlier complete structural cover.

For each new exclusion the record stores the path, residual component, display string, exact endpoint tuples, and the tight evaluator hash. Each finite endpoint tuple is encoded as four decimal integer strings: sign, mantissa, exponent, and bit count. Its exact numerical value is

$$
(-1)^{\mathrm{sign}}\,\mathrm{mantissa}\,2^{\mathrm{exponent}}.
$$

No conversion to a machine floating-point number occurs during this serialization. Decimal strings also preserve mantissas too large for a consumer's ordinary floating-point integer range. A verifier must parse these fields as integers, interpret finite tuple semantics, and check endpoint ordering and strict sign. The bit count is representation metadata, not an additional numerical factor. Actual denominator floors and bounded elementary arguments make the evaluated rows finite in this chart; a nonfinite tuple would require separate investigation, not acceptance as a finite witness.

Exact serialization makes a stored new interval reproducible as a number. It does not, by itself, prove that the interval encloses the physical residual; that remains the responsibility of the audited evaluator and its execution. The driver's source receipt hash records the resumed ancestry, and its dependency checks retain the frozen evaluator chain. It continues to trust the inherited excluded rows and does not transform earlier three-field records into new exact-endpoint certificates. A final cover assessment must retain that distinction.

## Independent exact controls and receipts

The [independent review instrument](../evidence/overnight-c-review-tight-exact.py) imports no subject implementation and performs no leaf calculation. Its [known controls](../evidence/overnight-c-review-tight-controls.json) ran first: rational arithmetic, signed dyadic endpoint extraction, a radial-identity value of $-3/52$, and exact JSON string round-trip of large positive and negative binary endpoints. Only after that receipt passed did the [target checks](../evidence/overnight-c-review-tight-target.json) evaluate the domain-specific bounds and identities.

An exact tangent geometry with $a=3$, $b=5$, $\cos\theta=3/5$, $\sin\theta=4/5$, and $d=4$ attains $ab|\sin\theta|/d=3=\min(a,b)$. The checker verifies both squared distance identities there. It also verifies the antipodal radial and tangential simplifications algebraically with rational half-angle sine and cosine. The chosen positive $D$ in that algebra test is a factor instance; the test is not presented as an independently solved complete moving history. The analytical derivation supplies the causal and source-factor relation.

The exact domain checks returned cross-pair derivative bounds $(1/2,1/2,7/10)$, cross-pair source-factor floor $3/10$, antipodal half-angle upper bound $9/10$, cosine floor $119/200$, and antipodal source-factor bounds $[1,19/10]$. They also confirmed the disjoint radius ranges that protect the fast-path interpretation.

Both commands exited zero under the executable shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-tight-exact.py controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-tight-controls.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-tight-exact.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-tight-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-tight-target.json
```

The review instrument hash is `e036c7bfe079902270481fee7eb5fefcb9c81ebf99e82594e64b7b9dfa45ffd4`. Its target mode requires a successful controls receipt with the same hash. The receipts corroborate exact algebra, constants, and encoding; they do not establish pilot timing, target exclusions, or finished coverage.

Scoped validation parsed the new Python source with `ast.parse` under the shared venv and checked all seven relative file-link targets with `test -f`; both exited zero. `git diff --no-index --check /dev/null` on the new Markdown returned 1 against the empty source and emitted no whitespace diagnostics. Final `shasum -a 256` measurements retained both assigned subject hashes and the review-instrument hash. `git --no-optional-locks status --short` restricted to the four new review paths listed those four as untracked; this establishes no broader checkout condition.

Files created are this review, `evidence/overnight-c-review-tight-exact.py`, `evidence/overnight-c-review-tight-controls.json`, and `evidence/overnight-c-review-tight-target.json`, under the Braid Program owner. No subject or earlier reference file was edited. No target cover, sustained computation, extra agent, or sidebar message was launched. The method audit is complete with no mathematical blocker found on its exact domain; completion and adjudication of the actual cover remain with the parent.

Falsifiers are a violation of the circular distance bound, a fast-path call representing independent unequal radii, a root outside the maintained interval, an inward interval operation, a missing cover leaf, an incorrectly encoded endpoint, or an unsupported inherited exclusion. A successful small pilot does not resolve any such defect or establish whole-box exclusion.
