# Independent admission of the T04 enclosure repair and retry

Date: 2026-10-03. Reviewer: coordinator, separately derived analytical reference and byte/control admission after subject freeze. Scenario: unchanged Master Equation, all positive-delay self roots, $K=c_f=1$. Subject: [implicit-root enclosure proof](ring-t04-enclosure-followup-2026-10-03.md), final pre-admission SHA-256 `ed9e52d09754836b9419a7659fc1a7dafea276fdae61004c3fa879687811064a`. Sole production change: `src/eom/src/CertifiedAcceleration.cpp`, SHA-256 `e4eca33d561c8c696b177b1786850dcefc28ccd6efeca3ae49cedb5f23f14e0c`.

**Verdict:** accept the reusable optional sharp acceleration enclosure and admit the explicitly requested unchanged-input coarse/medium/fine one-cycle retry. This is a derived enclosure construction with controlled implementation checks, not acceptance of evolved motion. The unchanged independent checkpoint still decides the scientific retry outcome. No initial uncertainty, tolerance, ordinary root, transmitter floor, equation, oracle or historical receipt is narrowed or replaced.

## Separately derived enclosure identity

Fix every exact nominal cubic coefficient and reception/coupling/wake-speed parameter in its token interval. Treat receiver position and source position/velocity error **values at the eventual root** as independent parameters within the admitted balls. These values need no presumed error second derivative. With receiver center $X_c$, position difference $p=X-X_c-e_Y$ and velocity error $e_V$, the auxiliary homotopy is

$$
q=X_c+lp-Y_0(s),\qquad V=V_0(s)+le_V,\qquad
g=|q|-c_f(T-s),\qquad 0\le l\le1.
$$

The convex position parameter path stays in the original receiver-minus-source-error box. Uniform opposite endpoint signs in one existing source segment and a uniformly nonzero nominal derivative $D_0=c_f-n\cdot V_0$ give one root for every parameter. Differentiating the causal graph gives $s_l=-n\cdot p/D_0$, with $n=q/|q|$. The kernel divisor is instead $D=c_f-n\cdot V$. It too must exclude zero over the full box. Distinguishing these two divisors is essential: treating $e_V$ as the derivative of a constant position error would be unjustified.

For the original kernel $F=Cc_fq/(|q|^3|D|)$, direct independent differentiation gives, with $W=Cc_f/(|q|^3|D|)$,

$$
F_{q_j}=W\left[e_j-3n_jn-\frac{q(-V_j+(n\cdot V)n_j)}{|q|D}\right],
\qquad F_{V_j}=Wq\frac{n_j}{D}.
$$

These derivatives include negative $D$ because $d\log|D|=dD/D$ on either nonzero branch. Along changing emission, $F_s=-F_qV_0+F_VA_0$. Therefore the total parameter derivative is

$$
\frac{dF}{dl}=\left(F_q-\frac{F_sn^{\mathsf T}}{D_0}\right)p+F_Ve_V.
$$

Integrating this identity over $[0,1]$ gives a centered mean-value interval containing every actual root/kernel value. It bounds a superset of physically correlated error values, which is conservative. The source-error values are held fixed along an auxiliary algebraic path; no modified source history is inserted into the EOM. Tokens with nonzero rounding width remain parameters throughout the base and derivative evaluation.

## Implementation inspection and fallback

**Measured by the scoped Git diff and direct read of the changed sharp code:** the implementation reconstructs nominal cubic position/velocity/acceleration from the original tokens; requires the whole root bracket in exactly one source segment; evaluates uniform endpoint signs; guards positive range and both divisors; encloses the nominal center root by interval-Newton intersections; and evaluates the derivative identity over the original full root and uncertainty boxes. The optional result is intersected with the previous direct enclosure. Empty intersection raises an error. Ineligible cases retain the old direct route. Every existing row is still summed, including every admitted positive-delay self hit. The route metadata changes when the optional intersection actually narrows a component; arithmetic remains binary64 outward.

This proof supports reusable graph conditioning, not an assurance that every input can pass a width gate. A truly wide admitted uncertainty remains wide. A root crossing a source-segment boundary, failed homotopy sign, zero-containing divisor or absent nominal range causes fallback, not a root deletion.

## Independent analytical controls and unchanged oracle

The fresh production fixture passed the exact static opposite-polarity acceleration $-1/4$ and the complete affine source $Y(s)=(2+2s,0,0)$ at a fixed origin: both past roots $s=-2,-2/3$ are present, with respective signed divisors $-1,3$ and contributions $1/4,-3/4$, total $-1/2$. The coordinator's initially proposed one-root interpretation was wrong and was rejected before any production target. This correction is preserved; it is not a claimed solver defect.

For the uncertain affine control, receiver/source position errors are each $10^{-6}$ and source velocity error is $10^{-6}$. The complete analytical boxes retain both roots. Let $L\in[1.999998,2.000002]$ and $e\in[-0.000001,0.000001]$. Independently derived whole per-hit ranges are

$$
F_{\rm far}=\frac1{L^2(1+e)},\qquad
F_{\rm near}=-\frac9{L^2(3+e)}.
$$

The [separate admission instrument](../../../../../scripts/eom/ring_t04_enclosure_independent_admission_20261003.py) computes both with 100-digit outward intervals and interprets native receipt endpoints as their exact binary64 values. Each whole closed range lies inside the new native per-hit interval. This is stronger than matching selected floating-point corners, and exercises graph conditioning with both divisor signs and unchanged nonzero error balls. The supplied analytical root certificate tests the acceleration encloser; the separately recorded uncertain-root enumeration limitation remains outside this repair.

Known SHA-256, exact affine-row and interval containment/rejection controls were recorded before this instrument's target. The producer also recorded production controls before the T04 diagnostic. The two selected existing sharp/oracle and rail/superwake comparison methods passed using their unchanged Decimal oracle and unchanged assertions. The wrapper only supplied a freshly rebuilt fixture packet. A wrapper import error and an earlier documentation overstatement were repaired before admission, with prior records preserved.

The diagnostic at the retained old start snapshot $T=0.0029296875$ now encloses the selected antipodal pair inside its unchanged $8\times10^{-6}$ gate. It is not the old attempted endpoint, new balance or newly admitted evolution. Its purpose is to show the repaired production path reaches the diagnostic gate on the same history/errors. The upcoming checkpoint remains authoritative for motion.

## Successor launch identity and acceptance scope

The first pre-admission proof's literal bytes survive under `.local-data/ring-followup/t04/revisions/analysis-first-frozen.md`, and the original successor manifest remains unchanged. Its documentary claim that both whole uncertainty ranges had been checked was too broad; a separate two-range checker and corrected proof produced a new `manifest-v2.json`. Production source, executable and earlier controls did not change in that revision. This is a pre-admission repair, not retroactive acceptance.

The independent target authenticates the 120 bindings of the new manifest, verifies byte counts and digests, compares every original binding against the historical complete manifest, and finds exactly the declared acceleration source changed. All three original request and transport-wire byte identities remain equal; the past-only handoff and historical executable remain bound. The new executable is an additional binding, not a relabeling of the old one. The unchanged launcher reauthenticates these identities before and after each parser/evolution/checker stage.

| Item | SHA-256 |
| --- | --- |
| Reviewed successor manifest | `56c3d5f7a04bf9515643181f7a7c0744ddfa8e646a00c940d6900e92f5b16dfe` |
| Original historical complete manifest | `115d93f581e1279e10397d930b7082dcfbf543e223d6674e707dd8e1b89be587` |
| Fresh EOM executable | `3c0a21c1893577d8b01c0948bf346d2f38cea003028e80d59559c8998cec5aff` |

Local acceptance is written by the independent target to `.local-data/ring-followup/t04/independent-admission/target.json`, binding this review owner and the exact successor manifest. Its schema's historical `questions-1-3-only` scope denotes the original parser/input/evolution handoff objects consumed by the bounded launcher. It authorizes the user's selected repair/retry only; broader nearby-history return maps, retention qualification and the old questions four/five remain deferred. The original three scientific requests, budgets, uncertainty balls and unchanged independent checkpoint are preserved. The explicit operator selection supplies retry authority after this admission.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/eom/ring_t04_enclosure_independent_admission_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/eom/ring_t04_enclosure_independent_admission_20261003.py --stage target
```

**Falsifiers:** wrong kernel/root derivative, a surrogate parameter outside the original box, a failed uniform endpoint/divisor condition, a true kernel value outside its new interval, an unchanged-oracle failure, omitted root, changed original input/request bytes or failed binding defeats the corresponding admission. A stopped retry retains only what the independent checkpoint actually accepts; no full-cycle claim follows from this repair alone.
