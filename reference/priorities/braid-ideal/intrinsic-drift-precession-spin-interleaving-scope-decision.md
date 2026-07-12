# Intrinsic Drift / Precession And Spin-Interleaving Scope Decision

**Decision:** keep the two programs separate (operator option (a), 2026-07-11).  
**Claim level:** priority-only derivation and simulation targets.  
**Authority boundary:** this decision separates proof burdens. It does not authorize a new simulation, identify flutter with spin, establish a retained branch, or promote either claim into corpus prose.

## Why The Programs Separate

The two programs ask different mathematical questions and consume different evidence:

| Program | Question | Current evidence | Required proof object |
| --- | --- | --- | --- |
| relative-phase / tilt dynamics | Does a perturbation of the locked co-rotating layers grow, saturate into a bounded motion, or return to the locked branch? | seed-grade gyroscopic-circulatory flutter, restoring shape block, drift-orientation response, and emerging nonlinear / Noether sea forcing diagnostics | a retained nonlinear evolution or return map with a stability basin and falsifier |
| spinor return | Does the visible ordered frame return after $2\pi$ while its history-lifted state returns only after $4\pi$? | ordered-frame and causal-writhe theorem targets; no accepted nontrivial retained spinor row | a retained $2\pi/4\pi$ holonomy table bound to active-root, phase, wake, and angular-momentum rows |

The word `precession` in the first program means relative phase-and-tilt drift among layers that otherwise share one bulk rotation axis and cadence. It does not mean three independently tilting spinning tops. The antipodal shape coordinates can remain in their restoring basin while a separate relative-phase / tilt mode flutters.

The second program is not a stability test. A stable $2\pi$-periodic assembly can still have trivial $SO(3)$ return, and a marginal flutter eigenvalue does not establish a spinor double cover.

## Program A: Relative-Phase / Tilt Dynamics

Use a perturbation coordinate that removes the common bulk rotation, for example

$$
\mathbf q
=
(\delta\varphi_I-\delta\varphi_M,
 \delta\varphi_O-\delta\varphi_M,
 \delta\alpha_I,
 \delta\alpha_M,
 \delta\alpha_O),
$$

with any exact global-rotation null removed before the verdict. The local seed pencil has the schematic form

$$
M\ddot{\mathbf q}
+G\dot{\mathbf q}
+(\Gamma-K)\mathbf q
=0,
$$

but the closure target is the retained nonlinear and environmentally coupled evolution,

$$
M(\mathbf q)\ddot{\mathbf q}
+G(\mathbf q,\dot{\mathbf q})
+\mathbf F_{\mathrm{wake}}[h_T]
+\mathbf F_{\mathrm{NS}}[h_T]
=0,
$$

on the same history $h_T$ used for roots, wake exchange, action, and angular momentum.

The program must distinguish three outcomes:

1. unbounded or escape-crossing growth;
2. bounded nonlinear saturation or a limit cycle; and
3. return to the locked branch within a declared basin.

A seed eigenvalue on the imaginary axis is only a marginal linear result. It is not spin-$\tfrac12$, and it is not a retained-particle certificate. The program's falsifier is failure to find a bounded or returning retained evolution below the declared escape threshold after regulator and history-window convergence.

Candidate nonlinear-saturation and Noether sea forcing diagnostics belong here. They may test whether the seed flutter is a quiet-void linear artifact, but they may not be labeled a spin mechanism.

## Program B: Ordered-Frame Spinor Return

The spinor program consumes an ordered nested shell braid frame together with the retained history that makes the frame physical. Its minimum acceptance pattern is:

$$
\Pi_{W,r_\star}^{2\pi}=1,
\qquad
\Pi_{W,r_\star}^{4\pi}=0,
\qquad
\Delta_{\Pi_W}(r_\star)\le\varepsilon_{\Pi_W},
\qquad
\Delta_{\mathrm{gc}}(r_\star)\le\varepsilon_{\mathrm{gc}},
$$

on one retained active-root row $r_\star$. The visible frame must return after $2\pi$, the non-gauge history lift must remain distinct there, and the full lifted state must restore after $4\pi$.

The I:M:O versus I:O:M crossing order may label handedness or a representability class. It is not sufficient evidence for $4\pi$ return. Likewise, co-cyclic and alternating phase patterns remain candidate inputs until a retained return table shows a nontrivial history lift.

The program fails if the full non-gauge retained state already returns after $2\pi$, fails to return after $4\pi$, changes active-root identity without an admissible branch event, or cannot reproduce the required effective spin, weak-chirality, and measurement handoffs.

The existing [spinor-holonomy return-table packet](../braid-angular-momentum-spin/spinor-holonomy-return-table-packet.md) and [control table](../braid-angular-momentum-spin/spinor-holonomy-control-table.md) own this proof route.

## Join Condition

The programs may be joined only if one retained history supplies a common invariant with both of these properties:

1. it controls the sign or boundedness class of the relative-phase / tilt evolution; and
2. it supplies the nontrivial $2\pi/4\pi$ history-lift distinction.

The join must therefore be a same-record implication, not a shared visual analogy:

$$
\mathcal I[h_T]
\Longrightarrow
\bigl(\text{bounded phase / tilt dynamics}\bigr)
\quad\text{and}\quad
\bigl(\text{nontrivial }4\pi\text{ return}\bigr).
$$

Until such an invariant is populated, the dynamics program cannot claim spin closure, and the spinor program cannot claim to cure flutter.

## Promotion Routing

- **Priority-only now:** both programs and their join condition.
- **Dynamics destination after retained evidence:** the spindle-braid stability treatment, at measured or derived grade appropriate to the record.
- **Spinor destination after retained evidence:** the angular-momentum-and-spin bridge, with the $2\pi/4\pi$ table and effective symmetry / measurement obligations intact.
- **No present promotion:** the current decision changes scope, not theory status.

