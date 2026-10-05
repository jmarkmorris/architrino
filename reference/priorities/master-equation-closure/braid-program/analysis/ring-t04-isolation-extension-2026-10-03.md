# T04 coupled isolation extension with a fixed preconditioner

Date: 2026-10-03. Scenario: unchanged Master Equation, all positive-delay self roots retained, $K=c_f=1$ numerically. Subject instrument: [ring_t04_isolation_extension_20261003.py](../../../../../scripts/braid-program/ring_t04_isolation_extension_20261003.py), SHA-256 `6ed9af56f1aac8623589dae39566d266535ed6d202e6f76a613603f1ec8ba7ae`. **Grade: computer-assisted derived candidate local isolation, awaiting a separately constructed adjudication.** The accepted exact T04 zero and its full-vector covariance discharge are inherited from the [frozen coupled certificate](../evidence/2026-09-02-planar-three-binary-coupled-box-certificate.md); their proof is not repeated here.

## Result and exact scope

The regular equal-radius T04 circle is the unique full-vector balance in the same five-coordinate antipodal-binary, common-positive-angular-rate chart, now with uniform halfwidth $10^{-5}$:

$$
|\delta_2|,|\delta_3|,|r_2-1|,|r_3-1|,|\beta_f-\beta_{\rm T04}|\le10^{-5}.
$$

This is a tenfold extension of the earlier $10^{-6}$ box. The phase coordinates are in radians; $r_2,r_3$ are radius ratios, and $\beta_f=\Omega R/c_f$ is the speed scale for the first binary radius. The other two binary speeds are $c_f r_2\beta_f$ and $c_f r_3\beta_f$. Overall phase is fixed; the three positive endpoints have phases $0,2\pi/3+\delta_2,4\pi/3+\delta_3$, with antipodal negative partners and polarity word `+-+-+-` in binary-pair order. No root, multiplier, response factor, or event rule changes.

The complete 72 directed causal roots, including the six positive-delay self roots, retain their source ownership and ordinals throughout the enlarged box. The global complement proof uses 336 interval boxes, maximum depth six. Its printed lower-margin diagnostics are $|G_\vartheta|>0.1155954462$, scaled separation $>0.2631375461$ and absolute transmitter factor $>0.1121528150$; the exact binary endpoints in the receipt are authoritative. **Grade: computer-assisted derived interval admissions by the declared instrument, within this box.** A missed root, incorrect ordinal, unresolved complement, causal fold or zero-containing transmitter factor falsifies this admission.

There is no nonregular coupled phase-radius branch through that declared neighborhood. **Grade: derived conditional on this certificate's independent acceptance and the inherited exact zero.** This excludes only rigid common-rate circles with antipodal binary partners in the stated chart. It says nothing about unequal-rate paths, breathing, ellipses, non-antipodal circles, slow precession, disconnected branches, axial deformation, retention or stability. A separately certified nonregular full-vector zero inside the box falsifies it; a zero outside the box does not.

## Five necessary equations and the new uniqueness proof

For receiver $i$, let $a_{t,i}$ be its tangential acceleration coefficient and $s_i=a_{r,i}/r_i$ its radial acceleration coefficient divided by radius ratio. Every exact circle in this chart must satisfy the five necessary equations

$$
f=(a_{t,0},a_{t,2},a_{t,4},s_2-s_0,s_4-s_0)=0.
$$

The frozen instrument encloses these equations and their five-variable Jacobian by outward automatic differentiation through every implicit causal root. Its former full interval-matrix inverse is replaced here by a constant point-centered matrix $Y$: invert the midpoint Jacobian at the recorded T04 center using 110-digit point arithmetic, then treat every stored binary coefficient of $Y$ as an exact constant in 75-digit interval operations. The numerical inversion merely proposes $Y$. Its center defect bound below $10^{-55}$ certifies that $Y$ is nonsingular; correctness of the later uniqueness proof does not require $Y$ to be an exact inverse.

On the whole enlarged box, use one constant weighted norm

$$
\|v\|_w=\max_i |v_i|/w_i,
\qquad
\|I-YJ(x)\|_w\le q<1.
$$

The stored positive weights have diagnostic values approximately $(1,0.641711,0.00187121,0.00165275,0.00649106)$. They are computational proposals only: positivity, every ratio $w_j/w_i$ and every row sum $\sum_j|(I-YJ)_{ij}|w_j/w_i$ are evaluated outward. The certificate's final upper bound is $q<0.645609$.

Here is the independent mathematical obligation of that bound. If $x,y$ are two zeros in the convex declared box, then

$$
x-y=\int_0^1\bigl[I-YJ(y+t(x-y))\bigr](x-y)\,dt.
$$

Taking the same weighted norm gives $\|x-y\|_w\le q\|x-y\|_w$, hence $x=y$. Thus the five equations have at most one zero in the box. The accepted scalar T04 bracket is strictly inside its speed interval and supplies one zero. Rotation through $\pi/3$ combined with the polarity-label flip discharges every remaining tangential and receiver-radial compatibility equation at that exact regular point, just as in the inherited proof. Its inward radial coefficient selects the positive overall radius. Consequently the selected subsystem and the full circular balance each have exactly one zero here.

The conventional Krawczyk image $c-Yf(c)+(I-YJ(X))(X-c)$ need not fit inside this uniform box, and the receipt explicitly records `strictInclusion: false`. Image containment is not used to assert existence. Existence comes from the accepted exact scalar/covariance premise; uniform weighted contraction supplies uniqueness. A contraction test with different weights in different subboxes would not prove this theorem and is not what was done.

## Why the 32-subbox cover is valid

The complete root/complement chart is first certified on the entire $10^{-5}$ box. Each coordinate is then split once at its midpoint, giving all $2^5=32$ closed subboxes. Their union covers the whole box. Each subbox recomputes its implicit-root images and Jacobian; every subroot image lies strictly inside the corresponding globally owned root box. Thus the already complete global root census transfers to every subbox without a new root-selection premise.

With the same fixed $Y$, form $I-YJ$ on each subbox and take an entrywise interval hull of all 32 defect matrices. This hull contains $I-YJ(x)$ at every point of the whole box, including the boundaries. Only after forming that global hull are the single common weight vector and row-norm upper bound calculated. This tightens natural interval differentiation without assuming that separate local contractions imply global injectivity.

The frozen complement implementation computes its terminal causal-domain bound using a high-precision point product. The new instrument separately encloses the sliver between that point bound and the outward interval bound $\beta_f(r_i+r_j)$ for every directed channel, and certifies a strictly negative causal residual there. Its coincident-self-origin inequality is also recomputed outward: on $0<\vartheta\le1$, $2\sin(\vartheta/2)\ge\vartheta(1-\vartheta^2/24)$ gives positive residual from $\beta_f r_i(1-1/24)-1>0$. These guards ensure the new census does not rely on the final bit of a point endpoint product. The frozen primitives themselves are unchanged.

## Analytical controls before targets

The instrument passed and recorded these controls before any final target run:

1. A known invertible five-dimensional integer linear system has the exact solution $(0.1,-0.2,0.3,-0.4,0.5)$. The new constant-preconditioner and interval-hull constructions enclose that solution, with defect below $10^{-65}$. This tests the matrix orientation, constant binary coefficients, Krawczyk calculation and cover-hull arithmetic against an analytical answer.
2. A prescribed stationary alternating unit hexagon has baseline radial acceleration coefficient $-5/4+1/\sqrt3$ and zero tangential coefficient at every member. A separately written direct projection sum encloses the analytical radial coefficient, and all twelve receiver compatibility differences contain zero with magnitude below $10^{-65}$. This is a kernel/control geometry, not an exact stationary solution or a stability reference. The analytical self-origin coefficient at $\beta=3$, $r=1$ is also checked as $15/8$.
3. The accepted exact T04 scalar bracket preserves all 72 roots; direct interval evaluation of its twelve compatibility rows contains zero in every row. The exact-zero premise remains the inherited theorem and covariance argument. This is a reference-protocol check, not a new independent proof of the old balance.

The final known-case receipt binds the new instrument and every imported frozen dependency before the target can run; changed bytes force the controls to be run again. A target-first path/argument error occurred in an earlier draft before scientific evaluation, was corrected in the new instrument, and was followed by fresh controls before all final runs. Earlier unweighted and unsplit bounds selected the final cover; their failures never asserted branches.

## Target outcomes and obstructions

| Uniform coordinate halfwidth | Jacobian cover | Complete root chart | Outward weighted defect upper bound | Disposition |
| --- | --- | --- | --- | --- |
| $2\times10^{-6}$ | Whole box | 72 roots, all complements | $0.251663$ | Unique zero by exact-zero premise and contraction |
| $10^{-5}$ | Whole box | 72 roots, all complements | $1.276019$ | Bound fails; no branch conclusion |
| $10^{-5}$ | All 32 coordinate halves | 72 global roots and contained subroot images | $0.645609$ | Unique zero by exact-zero premise and contraction |
| $10^{-4}$ | Not reached | Root admission stopped | Not assigned | Fixed proposal box too narrow; no branch conclusion |

The $10^{-4}$ trial stops because one parametric causal Newton image spans approximately $[5.511742013,5.514951034]$, while its fixed proposal box spans approximately $[5.512446524,5.514246524]$. This is an enclosure escape under the retained $9\times10^{-4}$ proposal radius, not an observed fold, a missed-root count or a balanced branch. No full root admission or Jacobian verdict is claimed at $10^{-4}$.

The final 32-subbox target completed in 18.5633 wall seconds by its own monotonic timer. This is measured runtime for that recorded invocation, not a cost law. No larger exploration, continuation or evolution was run.

## Frozen bindings and reproduction

The current unchanged dependency bytes are SHA-256 `27dfcfdb7214941eb3fff1aebea7a018faee171ae1402c5d374d31d143ed6092` for the coupled instrument and `0d306efda0e0fbb0c3a2032996553505624a4df446de718cc1bf6acdc290c4fd` for its shared unequal-radius primitives. These current digests differ from the historical strings printed in the older evidence; they are bound as the actual dependencies and are not silently substituted for historical pins. The exact source JSON remains `569902016197cdbea29082ffd1fcf3881d962f5c1cba26f3eeb56dcdcaa2e7a8`, and the old coupled certificate remains `4a5cfafa884ef8b407103786323722478750db18c3f21b2a4a96160f8bb0ac93`. The new instrument changed neither imported file nor either historical artifact. `git diff --` on the two imported scripts produced no output in this session; that reports their working-tree diff scope, not causal attribution of their historical digest differences.

Final local receipts, with exact binary interval endpoints rather than rounded display values as proof authority:

| Receipt under `.local-data/ring-exploration/t04-isolation-extension/` | SHA-256 |
| --- | --- |
| `known.json` | `77c401553bd2134a21a4c673f1006b76bbd7b30c456e03a06298691790cc1174` |
| `width-2e-6.json` | `adc28034f7f31757162a6082f2f6976c15be507310dc57caaf332a31e3474360` |
| `width-1e-5.json` | `04adae910efbc2075b22f4cecdd200c3e55a63966b03fd34879a3d9854507cd7` |
| `width-1e-5-cover32.json` | `ec2912f88566495e639d88091bf02b24bb018ecd986dd40a119b4d5bdb3dc016` |
| `width-1e-4.json` | `3d0c1d943582d32f716cd0d4f94503fa4496982cef628ec2ef904f3ad18c3387` |

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_t04_isolation_extension_20261003.py known --output .local-data/ring-exploration/t04-isolation-extension/known.json
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_t04_isolation_extension_20261003.py target --width 1e-5 --cover32 --known .local-data/ring-exploration/t04-isolation-extension/known.json --output .local-data/ring-exploration/t04-isolation-extension/width-1e-5-cover32.json
```

The mathematical subject is frozen for independent adjudication. No shared index, registry, tracker, queue, manuscript, rank, score or scenario was edited. Recommended next action: independently reconstruct the implicit Jacobian and the complete cover/contraction logic before integrating this extension. A wider chart should use a separately declared root proposal strategy and Jacobian cover; the failed $10^{-4}$ enclosure alone supplies no scientific verdict.
