# Independent review of source-piece enclosures and scalar steps

## Disposition and scope

**Derived disposition:** the [source-piece instrument](overnight2-d-source-piece-enclosure.py) implements the [declared value-enclosure construction](overnight2-d-source-piece-enclosure.md) correctly for a valid completed, increment-defined reference with continuous position and velocity at ordinary knots. Its position and velocity remainders are independently bounded; no uncontrolled remainder is differentiated. The [barrier-step instrument](overnight2-d-barrier-step.py) has the correct exponential and shifted-series tails and returns a valid upper allowance for nonnegative scalar inputs satisfying its step-size domain.

No mathematical defect was found within those domains. Both built-in control suites and additional independent cases passed. No scientific target or heavy computation ran. Only this new companion was authored; the subjects, oracles, repaired variation source and previous reviews were not edited. The parent owns integration in the [research account](overnight2-d-followup-and-research-2026-10-07.md). The Ramon E. Moore role and retained Specialist charter supply the review lens only.

## 1. Polynomial extension with separate value remainders

Let $s(q)$ denote a candidate source map for reception parameter $q\in[-1,1]$, with all possible values enclosed by $S$. Choose any declared polynomial piece $Q_k$ as an extension across $S$. For every actual piece $\ell$, compute

$$
E_c^x\ge\sup_{s\in S\cap I_\ell}|Q_{\ell,c}(s)-Q_{k,c}(s)|,
\qquad
E_c^v\ge\sup_{s\in S\cap I_\ell}|Q'_{\ell,c}(s)-Q'_{k,c}(s)|,
$$

and take the maxima over the covered pieces. At any candidate time, choose its actual piece. The triangle inequality proves

$$
|Q_c(s(q))-Q_{k,c}(s(q))|\le E_c^x,\qquad
|Q'_c(s(q))-Q'_{k,c}(s(q))|\le E_c^v.
$$

The composed extension already has its interval polynomial coefficient and truncation errors. Adding these independent uniform radii therefore encloses the actual source position and velocity. Correlations lost between those two enclosures can inflate later calculations but cannot remove the actual joint values.

The implementation chooses an extension using a floating midpoint only to select an index. The proof permits any valid extension piece, so that selection is not a correctness premise. For each other intersected cell, it maps a fresh polynomial parameter over the complete clipped source interval and composes both exact cell polynomials there. Subtraction occurs before the coordinate magnitude bound. Taking maxima of the computed upper endpoints preserves their outward-bound property. The extension's own cell has identically zero mathematical difference and can be skipped.

Velocity is built from independently differentiated exact cell coefficients. It is not obtained by differentiating the position remainder. The candidate-to-root derivative correction must still use the actual reference's acceleration bounds, as the note states. Large remainders can make a future residual certificate unusable; they do not license a smaller allowance or substituting the extension as the actual source.

## 2. Ordinary knots and source coverage

For strictly positive $S$ within completed history, the loop covers all intersecting cell interiors, using exact encoded endpoints for clipping. An interval reaching source zero is rejected, as is one extending beyond the completed endpoint. Negative intervals delegate to the already reviewed analytic negative-history enclosure. No ordinary piece is selected solely because it contains the midpoint; the midpoint selects only the common extension.

At a lower endpoint exactly equal to a knot, the index convention can omit the preceding cell's isolated endpoint. For this component that is harmless under its stated $C^1$ reference premise: both position and velocity agree across the knot, and those are the only returned fields. This differs from the acceleration-trace issue in the earlier variation review. The component must not be reused to infer an acceleration enclosure or complete two-sided velocity-jump coverage. The separate source-zero rejection is necessary.

At a terminal singleton, the final piece can supply its left position and velocity values. Outward inflation of the candidate range can nevertheless extend just beyond the reference and cause rejection; such a stop is unresolved coverage, not an invalid enclosure. Valid finite array shapes, increasing time nodes beginning at zero, exact cumulative nodes and shared endpoint velocities are premises supplied by the recognized reference/domain consumer. This helper itself is not a preparation or receipt validator.

For the subject's independent quadratic control, the right extension is $Q_k(s)=1+2(s-1)+2(s-1)^2$. On the left, $Q(s)=s^2$, so

$$
Q-Q_k=-(s-1)^2,\qquad Q'-Q_k'=-2(s-1).
$$

On $[3/4,1]$, the absolute maxima are $1/16$ and $1/2$, attained at $3/4$. Both differences vanish on the right piece. The note's stated error magnitudes are therefore correct; the orientation of a difference does not affect these coordinate absolute-value bounds.

## 3. Scalar factors and step proof

Let $N$ be the positive `terms` parameter. The recurrences accumulate terms indexed zero through $N$:

$$
S_N(x)=\sum_{k=0}^{N}\frac{x^k}{k!},\qquad
T_N(x)=\sum_{k=0}^{N}\frac{x^k}{(k+1)!}.
$$

For $0\le x<1$, their tails obey

$$
0\le e^x-S_N(x)
\le\frac{x^{N+1}}{(N+1)!}\frac1{1-x/(N+2)},
$$

$$
0\le\varphi(x)-T_N(x)
\le\frac{x^{N+1}}{(N+2)!}\frac1{1-x/(N+3)},
\qquad \varphi(x)=\sum_{k=0}^{\infty}\frac{x^k}{(k+1)!}.
$$

After the first omitted term, every subsequent ratio is no greater than $x/(N+2)$ or $x/(N+3)$ respectively. The geometric-series domination proves the formulas, including the shift by one factorial in $\varphi$. These are exactly the implementation's `erem` and `prem`. Nonnegative series terms justify retaining the partial-sum lower bound while adding the tail only to the upper bound. Interval evaluation encloses both factors for every point of an interval argument.

For initial allowance $E_0\ge0$, growth $m\ge0$, forcing $f\ge0$ and width $h\ge0$, the scalar solution is

$$
U(h)=e^{mh}E_0+h\varphi(mh)f.
$$

The product $mh$ is known to be nonnegative, so intersecting its outward product interval with $[0,\infty)$ is justified. All remaining products and sums are outward. The returned `I(value.hi)` is an encoded upper allowance. It is not an interval containing every possible exact value of $U(h)$; consumers must preserve the upper-bound interpretation. This contract is explicitly documented in the source.

The guard rejects negative input lower bounds and any factor argument with upper endpoint at least one. Thus uncertainty touching the step-size boundary can fail closed even when a particular exact product is smaller. Negative growth is outside this implementation's domain; it cannot be supplied by bypassing the guard or replacing it with an unproved truncation. Zero growth gives the linear comparison $E_0+hf$, and zero width gives $E_0$, possibly with harmless outward inflation. No cancellation of nearly equal exponentials or division by growth occurs.

The module accepts Python `True` as a term count because it is an integer subclass. This evaluates the mathematically valid $N=1$ formula and causes no enclosure defect, though an API wishing to reject Boolean counts can do so explicitly. The arithmetic contract still assumes finite scalar interval inputs and the previously reviewed IEEE/gradual-underflow behavior. The new domain guards and new control checks use explicit exceptions; inherited assertion-based control suites must be run under ordinary Python for validation.

## 4. Executed known controls

Both subject scripts were run without target arguments using the shared venv, one-thread BLAS settings and bytecode output disabled. Both exited zero. The source-piece suite passed its imported residual/arithmetic controls and the exact two-piece quadratic case. The scalar suite passed imported primitive controls, independent rational factorial-series checks, constant-growth/forcing solution and zero-growth checks.

Additional inline controls first verified their interval-containment predicate on a known inclusion and exclusion. A three-piece exact source used

$$
Q(s)=
\begin{cases}
s^2,&0\le s\le1,\\
1+2(s-1)+2(s-1)^2,&1\le s\le2,\\
5+6(s-2)-(s-2)^2,&2\le s\le3.
\end{cases}
$$

On $S=[1/2,5/2]$, the middle extension has exact maximal position error $3/4$ and velocity error three. The instrument listed all three pieces and returned first-coordinate bounds `0.7500000000001141` and `3.0000000000001497`. Exact rational position and velocity values at five points were enclosed. Source-zero and unfinished-history ranges were rejected. Small positive remainders in the identically zero coordinates reflect conservative interval arithmetic.

For the scalar module, independent 60-term exact rational references with rigorous tails were first checked at zero. Factor intervals on $[1/4,1/2]$ were tested for $N=1,2,18$ at three exact rational arguments. A nonnegative parameter box $E_0\in[1,2]$, $m\in[0,1/2]$, $f\in[0,1]$, $h\in[0,1/4]$ enclosed the independently derived upper-corner value. Zero growth, zero width, zero data and eight invalid-domain/term-count cases also behaved as specified. These are implementation controls against known mathematics; they are not target or history evidence.

## 5. Identities, preservation and falsifiers

Direct `shasum -a 256` reads measured:

| Artifact | SHA-256 |
| --- | --- |
| Source-piece instrument | `11144e93e728e903494e623629909f9abc3b129e64bb9c227e3a13d3e259d7f2` |
| Source-piece mathematical note | `593d0325cf33277ec77dee205047753972f6f66943995bbcff5c36924f3b7690` |
| Barrier-step instrument | `65a39e2dc851a1af5c2d8459bdd1fcd7a2fdffda3572bd3bee797b896cd62943` |
| Imported residual checker | `9b8baa6135d12145275a5b64fb8f803623ce04d802e65f5ae68f6b24d7a54554` |
| Imported polynomial arithmetic | `308510f8faef225562e7a0baa05f3149317ffe4a36fa30975d3c7314c14b0b1c` |
| Frozen interval primitive | `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff` |

Inline controls wrote no files; their analytic inputs and outcomes are retained here. No scientific target, repaired variation target or propagation computation was run or adjudicated. This review does not change the prior norm, residual, initialization or variation dispositions.

Closing `shasum -a 256` reads reproduced all three subject identities unchanged. Explicit `test -f` checks passed for the four distinct relative-link destinations, none with fragments. Scoped `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics; its difference exit status is expected for a new file.

The source enclosure is falsified by a declared actual piece value outside its composed extension plus certified error, or an omitted unequal trace under an asserted coverage convention. Differentiating its uniform position remainder would invalidate a derivative claim. The scalar component is falsified by nonnegative admitted inputs whose exact solution exceeds the returned upper allowance, or by a series tail exceeding its displayed geometric bound. A complete application still needs admitted root/source domains, residual and matrix bounds, event treatment, correct delayed-envelope coverage and a valid first-contact argument. These components alone establish none of those trajectory-level obligations.
