# Trial-source correction and the next comparison toward $t=5$

## Status

This supplement preserves the frozen [target continuation analysis](smooth-two-particle-five-continuation.md) and [complete-population comparison](smooth-two-particle-class-preserving-continuation.md). It corrects one omitted numerical-trial contribution in the former and diagnoses which estimates should be refined next. It neither changes the Master Equation nor enlarges the original history class. No new trajectory evolution or long residual calculation was run for this note.

## 1. Four numerical-trial rows in the $19/4$ comparison

The exact first-front census in the target theorem has 130 possible actual generated rows through $19/4$ when the receiver displacement is below $3/100$. Independent review found four additional nonzero rows of the numerical trial: source sites $(0,\pm3,0)$ and $(0,0,\pm3)$, each at squared range ten from the right target. The exact solution has zero contribution from these sources before the corresponding front, but their polynomial trial histories are not identically zero on the whole required prefix. Consequently, an actual-row census alone does not bound the difference between the actual and trial equations.

The previously accepted second source-prefix certificate gives position and velocity errors below $2.018426\times10^{-8}$ and $8.290898\times10^{-8}$ through $73/32$. Its rounded bounds $P_s=2.1\times10^{-8}$ and $V_s=8.3\times10^{-8}$ cover these four rows. Let $r=\underline{\sqrt{10}}-3/100-1/100$, and use the coefficient functions $C_P,C_V$ from the frozen target theorem. A sufficient additional constant acceleration-error term is

$$
q_{\mathrm{trial}}=64\left[C_P(1/1000,1/100,r)P_s+C_V(1/1000,r)V_s\right]<6.359042\times10^{-7}.
$$

Adding this term to the $\lambda=20$ comparison for the quarter interval increases its endpoint position, velocity and acceleration bounds by less than

$$
(2.204\times10^{-8},\ 1.943\times10^{-7},\ 1.077\times10^{-6}).
$$

The corrected bounds are therefore

$$
P<0.003432848,\qquad V<0.018392583,\qquad A<0.093595537.
$$

The frozen theorem's tight displayed acceleration allowance $0.093595$ is replaced by $0.093596$. Its wider operational allowances $(0.00344,0.0184,0.0936)$ remain valid. The corrected continuous vertical-velocity lower bound exceeds $0.013239166$, and the vector-displacement upper bound is below $0.019658953<3/100$. Thus the correction preserves the strict upward-motion conclusion through $19/4$ when combined with the complete-population certificate.

This correction uses an error bound for the trial-only rows rather than deleting them or silently equating actual and numerical channel sets. Subsequent comparisons must use the union of both sets, with a bound for every nonzero numerical row.

## 2. Which terms dominate the target comparison toward $5$?

The exact comparison is linear in its initial errors and in each nonnegative error source. Repeating the frozen uniform $\lambda=60$ calculation with all 158 numerical-trial rows permits the following separate contributions to the endpoint bounds:

| Error source | Position-error contribution | Velocity-error contribution |
| --- | ---: | ---: |
| Target position error already present at $9/2$ | 0.02006038 | 0.15525269 |
| Target velocity error already present at $9/2$ | 0.01578589 | 0.12238275 |
| Newly checked residual on $[9/2,5]$ | 0.00001888 | 0.00020506 |
| Received source position errors | 0.00237961 | 0.02094144 |
| Received source velocity errors | 0.00555448 | 0.04867558 |
| Total | 0.04379923 | 0.34745749 |

Approximately 82% of the position allowance comes from the inherited target state; the new interval's residual contributes less than 0.05%. Tightening only the new residual cannot repair this uniform comparison. Its principal problem is amplification of inherited uncertainty by a receiver derivative bound charged at the final radius throughout the whole interval.

A bounded comparison experiment keeps the same histories, residuals, source errors and all 158 trial rows, but uses three successive receiver radii:

| End of interval | Proposed receiver radius | Receiver derivative bound used | Endpoint position error | Endpoint velocity error |
| --- | ---: | ---: | ---: | ---: |
| $19/4$ | 0.03 | 20 | 0.003443 | 0.018482 |
| $39/8$ | 0.04 | 29 | 0.007015 | 0.041237 |
| $5$ | $1/16$ | 60 | 0.017153 | 0.134345 |

This calculation is a diagnosis of a better comparison, not a certificate at $5$. Each proposed receiver radius still requires continuous vector closure, and the vertical sign must be checked continuously using the corresponding time-dependent error profile. The smaller intermediate radii reduce the final position allowance by more than half without any historical residual rerun. The endpoint velocity allowance is close to the trial endpoint velocity $0.1355303677$, so a coarse whole-cell minimum may be insufficient; refining the comparison cells or retaining sharper source-specific constants is preferable to concluding that a turn occurred.

## 3. The inherited population uncertainty

Independent review found the analogous distinction in the population comparison: 57,156 actual possible generated edges, but 58,260 edges in the actual/trial union, including 1,104 trial-only edges. The maximum receiver degree is 139 for actual rows and 141 for the union. The separate, independently authored `nineteen-union.py` keeps actual rows in the receiver derivative and the complete union in the received-error forcing. Its frozen receipt `.tmp/mec-008-post-restart/moore/nineteen-union-target.json`, under residual budget $0.01$, gives errors below $(0.012282265,0.089231594,0.628338737)$ and full state below $(0.043639265,0.173612594,0.863730737)$. These close the receiver radius $1/20$. This union correction is a named independent input; the earlier actual-only forcing receipt is retained solely for the diagnostic decomposition below and must not be used as a complete acceptance certificate.

For the frozen full-population $17/4\to19/4$ comparison, retain $\lambda=51$ and the original delayed forcing profile, but replace the provisional new residual budget $0.01$ by the measured enclosing budget $0.001520358$. Its error decomposition becomes

| Error source | Position-error contribution | Velocity-error contribution |
| --- | ---: | ---: |
| Initial position error at $17/4$ | 0.00428620 | 0.03056115 |
| Initial velocity error at $17/4$ | 0.00268041 | 0.01917229 |
| New interval residual | 0.00050038 | 0.00378032 |
| Received inherited-source errors | 0.00255773 | 0.02074145 |
| Total | 0.01002471 | 0.07425520 |

This is a decomposition of that frozen sufficient estimate, not a replacement independent acceptance theorem. Approximately 70% of its position allowance comes from the initial state and 26% from received histories. Substituting the smaller measured residual alone therefore does not close the next quarter-step restart inside the environmental displacement ceiling $1/16$.

The first useful refinement is a time-dependent receiver bound over the unchanged numerical population prefix, followed by source-specific or source-time-specific derivative and error bounds where they materially reduce the comparison. A sharper residual calculation on unchanged older prefixes is the next option if these bounds still exceed the available class margin. It is not justified merely by observing that the old stationary remainder factor was conservative: the revised residual must be independently enclosed and propagated before it changes any accepted error.

## 4. Concrete next calculation, with the original class unchanged

The numerical contributor has supplied a complete population prefix through $5$ as part of the stopped archive at the literal path `.local-data/master-equation-closure/post-restart/approximant/population-h21-4.npz`. Its saved endpoint is $2571/512$, before the numerical environmental $1/16$ bracket near $5.02206464$. Those are numerical construction facts only. They establish neither an actual environmental exit nor an actual event ordering against the later target speed bracket.

For a stopped comparison through $5$, use the auxiliary bound $|y_i|\le1/16$ for every receiver, including the targets. This is stricter than the original target displacement allowance, so it does not enlarge the history class. Even the coarse simultaneous range bound is then $1-2/16=7/8$, and every generated source time satisfies

$$
s\le5-7/8=33/8<17/4.
$$

The already accepted full source histories through $17/4$ therefore cover the next comparison. Further source-history evolution is unnecessary for this domain argument. The complete numerical prefix through $5$ should be authenticated, checked for exact inherited joins and the actual/trial source union, and enclosed with a continuous full-law residual on its newly required suffix. Then apply a time-dependent, source-resolved first-exit comparison using the accepted source errors through $17/4$. The numerical archive already supplies the candidate; the remaining work is certification and error propagation.

If the continuous upper bounds close below $1/16$ through $5$, combine that complete-population result with the refined continuous target sign comparison. If they do not, retain the stopped-solution formulation and quantify the failing margin. To certify a later environmental class exit, establish that all environmental labels remain inside before the lower time and, under the hypothesis of no earlier exit, that a particular label must exceed the ceiling by the upper time. No statement of actual exit follows from the constructor guard alone.

## Evidence and reproduction

The new bounded instrument is the literal path `.tmp/mec-008-post-restart/hale/five_diagnosis.py`. It passed closed-form constant-acceleration, linear-superposition and four-row coefficient controls before either target diagnosis. Its receipts are `.tmp/mec-008-post-restart/hale/five-diagnosis-known.json` and `.tmp/mec-008-post-restart/hale/five-diagnosis-target.json`. The source-prefix correction cites the frozen independent receipt `.tmp/mec-008-next-maximum/moore/onward-error-target.json`. The exact target archive and full-law residual are authenticated by the preceding theorem's receipts. The population decomposition reuses the frozen `nineteen-target.json` forcing profile and does not launch a new population calculation.

Reproduce this bounded diagnosis with the shared venv, controls first:

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-post-restart/hale/five_diagnosis.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-post-restart/hale/five_diagnosis.py target
```

The correction is falsified by an uncovered additional trial row or an invalid inherited source-error bound. The diagnostic recommendation is falsified if continuous receiver-tube closure, the complete source union, shifted-root bounds, or the refined sign comparison fails; any such failure identifies the next estimate to improve, not a modification of the law.
