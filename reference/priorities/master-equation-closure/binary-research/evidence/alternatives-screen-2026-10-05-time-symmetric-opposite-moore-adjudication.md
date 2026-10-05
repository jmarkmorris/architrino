# Independent admission of the all-speed opposite real-frequency certificate

Status: derived computer-assisted admission, 2026-10-05. The independent instrument certifies $\partial_yG>0$ throughout the complete closed rectangle $[0,3/4]\times[0,36]$. Combined with the separately admitted analytic endpoint and large-frequency theorems, this closes opposite real-frequency uniqueness for every strictly subfield speed in the selected equal past/future circle law with $K=c_f=1$. This concerns the balanced circle and its whole-line linear boundary equation.

## Independent sequence

The only mathematical input read before the independent reference was the [all-speed analytic reference](../analysis/alternatives-screen-2026-10-05-time-symmetric-all-speed-frequency-independent-analytic-reference.md). The [Moore mathematical reference](alternatives-screen-2026-10-05-time-symmetric-opposite-moore-mathematical-reference.md) and [independent evaluator](alternatives-screen-2026-10-05-time-symmetric-opposite-moore-reference.py) were then frozen, and known controls passed before any target. Only after these freezes were the subject protocol and implementation read.

The evaluator imports standard-library modules and mpmath interval arithmetic, not subject code, its arithmetic, derivative estimates, or reported lower bounds. Its degree-36 entire polynomials are translated exactly over the rationals to each box midpoint; value and derivative tails use independently derived geometric majorants. The subject instead uses degree-40 midpoint series with alternating-tail estimates and mean-value interval expansion. The evaluators share the explicit analytic determinant, but neither an implementation nor an enclosure scheme.

The first independent target started from one whole rectangle and constructed its own subdivision. It used neither the subject's partition nor its output. A second target used only the subject pilot's exact box endpoints as integration domains. The endpoint extractor first passed an artificial known input with an ignored derivative field.

## Complete enclosure results

The independent evaluator propagates first-order jets in $z=4x^2y$ and evaluates

$$
G_y=4x^2(a_0B_z-2JJ_z)+AB+z(A_zB+AB_z),
$$

retaining all coefficient intervals, signed products, and polynomial and derivative truncation errors. No division by $y$ or $\sqrt y$ occurs; the faces $x=0$ and $y=0$ are ordinary parts of the computation.

Measured by the retained independent evaluator receipts:

| Run | Initial rectangles | Evaluations | Final leaves | Exact cover | Global lower bound |
| --- | ---: | ---: | ---: | --- | --- |
| Independent fresh rectangle | 1 | 373 | 187 | Passed | $>0.00452719248904897$ |
| Subject endpoints independently reevaluated | 531 | 531 | 531 | Passed | $>0.2351878450279208$ |

The first retained exact lower endpoint is

$$
\frac{27101180867613650435067561971111577908436543220933}
{5986310706507378352962293074805895248510699696029696}>0.
$$

The second is

$$
\frac{175988439341380122785680793744503225591156200343383}
{748288838313422294120286634350736906063837462003712}>0.
$$

The coverage audit takes rational box endpoints, rejects invalid bounds, sweeps every consecutive pair of distinct $x$ faces, and requires the active $y$ intervals to tile $[0,36]$ exactly without a gap or positive-width overlap. Input and final partitions passed this audit, independently of the subject's root/path tree. Strict lower endpoints certify positivity on closed boxes, including shared edges.

Measured runtime was 5.239622958935797 seconds for the first target and 8.446737207937986 seconds for the second, from the evaluator's monotonic clock. Both owned foreground processes exited successfully; no continuation process remains.

## Physical conclusion and boundary

Restrict to physical parameters $0<x<3/4$ with $\beta=x/\cos x<1$. The inherited identities are $G(0,x)=-1$ and $F_-(m,x)=m^2G(m^2,x)$; the separate first-frequency theorem gives $G(1,x)>0$. Strict positivity of $G_y$ gives exactly one $y_*(x)\in(0,1)$ zero and no other zero on $[0,36]$. At $m=\pm\sqrt{y_*}$,

$$
\partial_mF_-(m,x)=2m^3G_y(m^2,x)\ne0.
$$

Thus the nonzero opposite real roots are exactly one simple pair in $0<|m|<1$, after applying the separately admitted $|m|\ge6$ inverse exclusion. The double opposite phase root and common-sector classification remain their separate analytic theorems. Nonvanishing $G_y$ also supplies the implicit-function theorem premise at every physical root.

No physical theorem is asserted for $\beta\ge1$ merely because the enclosing interval extends there. This result does not classify nonreal frequencies or imply nonlinear stability, nonlinear quasiperiodic existence, an advanced initial-value solution, a causal first event or binding.

## Controls and arithmetic

Before target execution, the evaluator passed directed rational-conversion controls; exact quadratic translation; the three exact entire-function value/derivative pairs at zero; the full $y\in[0,36]$ zero-$x$ identity $G=y-1$, $G_y=1$; three derivative identities at $z=1$ checked against separately directed trigonometric expressions; and artificial partition controls for complete cover, omission, overlap, exterior boxes and reversed endpoints.

The actual runtime was the shared repository-adjacent venv: Python 3.13.2, mpmath 1.3.0, mpmath libmp backend reported as python, interval decimal precision 50. These facts were measured with the venv interpreter's version/backend query. Exact polynomial translation uses standard-library Fraction. Directed interval arithmetic encloses rational coefficients and subsequent operations; final binary interval endpoints are converted back to exact rationals for recording and positivity decisions.

The results are rigorous interval certificates conditional on this arithmetic implementation and the frozen determinant, endpoint and tail theorems. The separately authored implementation, distinct enclosure scheme, exact controls and coverage audit are independent evidence; they are not a formal proof of the interval library itself.

To reproduce from the checkout, use the tracked evaluator and fresh ignored output names, preserving existing receipts:

    ../.venv/bin/python reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-time-symmetric-opposite-moore-reference.py --known --output .local-data/master-equation-closure/time-symmetric-opposite-moore/known-reproduction.json
    ../.venv/bin/python reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-time-symmetric-opposite-moore-reference.py --target --known-receipt .local-data/master-equation-closure/time-symmetric-opposite-moore/known-reproduction.json --seconds 300 --output .local-data/master-equation-closure/time-symmetric-opposite-moore/rectangle-reproduction.json

These commands name the venv actually measured here; use the configured AAA_VENV equivalent when that variable selects another valid shared venv. Local receipts are retained under the ignored directory .local-data/master-equation-closure/time-symmetric-opposite-moore/. They are local provenance, not a claim that a fresh checkout contains them. The tracked evaluator regenerates a complete certificate without any subject pilot.

| Source or receipt | SHA-256 |
| --- | --- |
| Analytic input | 85a17a66c5c9c8e6812b90b21881a1600e2dd0274106784dce3b6cd7b39757da |
| Independent mathematical reference | a28579dee717fb550644da02c256d95d9b1a6172fe3a024a3b556671e1475d87 |
| Independent evaluator | cdf7f6ff34f5927946c3a661d1a0348decd1e9aaa2b6b8f34ec0082ef8477ecd |
| Independent known-v1.json | 1a7b2abcc380177ba8f3b121d4f337b6609b60c352ae98deb0190ee034d9e6da |
| Independent independent-rectangle-v1.json | 7b7c2f3fd29b9a3bb2e429197439298c6660feb1a89bbf6e503588c2748cd264 |
| Extracted subject-boxes-v1.json | 0bf3c8444c8ee57f8166b30da0cf9a5f69a91c8e10246e108e203376478119f7 |
| Independent subject-partition-recheck-v1.json | b56ef1c7c5b0f158658dd661f6dedb88fa27168786ef924df7be51e4c42064b2 |
| Subject interval implementation | 913773f407168c13624cd5c54c1d6bf9a8e23f99e1f61b66ed546284f0d24f41 |
| Subject interval protocol | a4d8944edda4d6cb6711b2fd5ef6b28e51103c47f2b80dd116d758c5394e2f48 |
| Subject pilot receipt | 7795b770a3ce604f71b1f98c5d334ab96fdf710791bc48da0404f501c290ae0d |

## Falsifiers and remaining limits

Admission fails if the analytic $G$ does not represent the complete selected symbol, the jet identity or tail majorant is wrong, interval conversion rounds inward, any certified box fails its positive bound, the cover has a gap, or an imported endpoint or large-frequency theorem fails. A nonzero multiple opposite real root at a physical speed would contradict this certificate and requires tracing these explicit obligations.

The second run verifies the subject partition's coverage and recomputes positivity independently. It does not reproduce the subject's particular derivative enclosure values or certify their optimality. No frozen subject, analytic reference or earlier source was modified. Scoped whitespace checks of the new mathematical reference and evaluator produced no diagnostics; formatting validation is separate from mathematical evidence.
