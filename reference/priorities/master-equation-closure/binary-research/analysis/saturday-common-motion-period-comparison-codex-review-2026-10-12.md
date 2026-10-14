# Independent review of the common-motion period comparison

**✓ Accepted at the exact-balance and quantified restricted-class exclusion scope; CM1–CM3 verified resolved.** The initial reconstruction and findings below remain preserved. The [subject](saturday-common-motion-period-comparison-2026-10-12.md) was first read in full at SHA-256 `e5571c086aa5dc44b3e9ee385aec6fd49923b2e3c136ea9c4d06711d887dd8a7` (25,557 bytes), and its [evidence README](../evidence/saturday-common-motion-period-comparison-2026-10-12/README.md) at `688286e1387a2376c28a23dc74770f9ad01928bf06a2a392453009e5d4feab95` (7,553 bytes); corrected identities and final disposition appear below. The [conversation](../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md) owns the exact pair, serial scope and original deadline. This review preserves the peer's subject and reference instruments, accepted inputs and original outputs. No additional research task is released.

## Independent derivation

The canonical scenario is the unchanged opposite-polarity two-member Master Equation with unit reduced coupling and numerical $c_f=1$, complete planar paths, positive separation, rigid recurrence and J positive. The kinematic statement needs speeds below one so the present S_i are real and positive. The actual-row balance needs the ordinary one-partner/zero-self causal setting and positive row strengths; complete uniformly subwake histories supply those obligations. The quantitative remainder estimates additionally require one whole-history bound $0<w<1/3$ and $J\ge J_{\min}>0$. Nothing imports a physical conservation law, auxiliary-circle self-consistency or moving-frame invariance.

Put $u_i=v_{i\parallel}$, $b_i=v_{i\perp}$, $S_i=\sqrt{1-b_i^2}$, $x=r/J$, $d=J/r=b_1-b_2$, $P_\perp=b_1+b_2$ and $\Omega=J/r^2$. The straight comparison strengths give

$$
\tau_0=\frac{d}{r}+\frac1r\left(\frac{u_1b_1}{S_1}+\frac{u_2b_2}{S_2}\right)
=\Omega+x\Omega\sum_i\frac{u_ib_i}{S_i}.
$$

The actual path acceleration across the current axis is q_i. Rotating-axis differentiation gives $\dot b_i=q_i-\Omega u_i$, hence $\Omega u_ib_i/S_i=\dot S_i+b_iq_i/S_i$. Integration over rigid recurrence eliminates the boundary term $x(S_1+S_2)$ exactly. This proves C.1, with the sign of $-\oint(S_1+S_2)dx$ as stated. The calculation uses actual accelerations, not formal rows on arbitrary prescribed paths.

On a solution, set $E_1=\sin\beta_1+b_2$, $E_2=\sin\beta_2-b_1$ and $K=a_1/S_1+a_2/S_2>0$. The actual transverse rows imply

$$
\sum_i\frac{b_iq_i}{S_i}
=-b_1b_2K+\frac{b_1a_1E_1}{S_1}-\frac{b_2a_2E_2}{S_2},
\qquad b_1b_2=\frac{P_\perp^2-d^2}{4}.
$$

Consequently its x-weighted integral is $-M_++M_{\rm rel}+R_M$. Both M terms have the exact factors in the subject, with the minus sign on the common transverse velocity loss and the plus sign on the relative contribution. Let $\sigma(b)=1-\sqrt{1-b^2}$. The constant 2 and $2\sigma(d/2)$ integrate to zero against dx; the second is a function of 1/x and has an antiderivative. Therefore the remaining integral is $B_S=\oint W_Sdx$. With $c=d/2$ and $m=P_\perp/2$, evenness and two applications of the fundamental theorem of calculus give

$$
W_S=\sigma(c+m)+\sigma(c-m)-2\sigma(c)
=m^2\int_{-1}^{1}(1-|s|)\sigma''(c+sm)ds.
$$

The segment runs between $-b_2$ and b_1. Since $1\le\sigma''\le(1-w_t^2)^{-3/2}$ on it and the tent weight has integral one, $P_\perp^2/4\le W_S\le P_\perp^2/[4(1-w_t^2)^{3/2}]$. This proves the claimed weight bounds. A nonnegative weight does not sign an integral against signed dx.

The exact rate difference is $\dot J-\tau_0=re_J+r[(a_2-a_2^0)b_1-(a_1-a_1^0)b_2]$. Adding it to C.1 and using $\oint\dot J=0$ yields exactly

$$
M_+-B_S=\Theta+M_{\rm rel}+R.
$$

All three terms in R, including the sign of R_M, agree with the subject. The accepted solution-only bound $r^3(a_1\epsilon_2+a_2\epsilon_1)\le c_3$ gives

$$
|R_M|\le\frac{wc_3}{\sqrt{1-w^2}}\oint\frac{dt}{Jr^2}
\le\frac{wc_3}{\sqrt{1-w^2}J_{\min}^2}\Theta.
$$

The remaining two integrals are bounded respectively by $c_3\oint dt/r^2$ and $wc(w)\oint dt/r^2$. Because $dt/r^2=d\vartheta/J$, their total is at most $(c_3+wc(w))\Theta/J_{\min}$. Thus C.3a has no missing factor of two or power of J. This is a reconstruction from the accepted actual-row bounds, not a test of those bounds on prescribed paths.

Finally the upper strength bound yields $M_+\le\kappa_M\oint P_\perp^2(r/J^2)d\vartheta$, since $dt/(rJ)=(r/J^2)d\vartheta$. Also $-B_S\le|B_S|\le\kappa_S\oint P_\perp^2|dx|$. Dropping $M_{\rm rel}\ge0$ from the exact lower side gives $(1-\eta)\Theta\le M_+-B_S$. Each inequality points in the stated direction. Since $\Theta>0$, dividing proves the quantified necessary condition and exclusion. The exact coefficient condition excludes a hypothetical rigidly repeating solution in that restricted class; it neither provides the geometry/variation bounds nor demonstrates an actual history in or outside the class. When $\eta\ge1$, the necessary inequality still holds but the strict exclusion predicate cannot be satisfied.

The algebra $\tau_0=\mu^0J+r\delta^0P_\perp$ and the accepted $\Lambda+\tilde B=-C_0+T_1+T_3$ reproduce C.5, including the plus sign on $G_0-\Theta$. The exact balances share $\oint\dot J=0$; their subsequently bounded consequences need not be equivalent. No independent smallness or sign for Lambda follows from the rearrangement alone.

## The old prescribed family does not test the new breathing sign

The exact family in the [breathing review](saturday-combined-breathing-period-average-codex-review-2026-10-12.md#an-independent-exact-kinematic-family-with-both-signs) has $P_\perp=0$. Therefore the present $W_S=0$ and $B_S=0$ on that family, for both signs of its parameter. Its nonzero signed $\tilde B$ comes from a different weight, involving $P_\parallel^2$. It proves neither sign for B_S. The peer correctly uses it as a zero-loss control in the instrument, but its failed-approach prose cannot cite it as establishing both signs for the present integral.

If an exact two-sign diagnostic for B_S is desired, a separate construction suffices. For all real t, choose r=1, $J(t)=1/[10(1+\cos t/10)]$, an axis e with $\dot\vartheta=J$, and $m_\epsilon(t)=\sqrt{1+\epsilon\sin t}/100$, $\epsilon=\pm1/10$. Define $\dot C=m_\epsilon\hat\theta$, $x_1=C+e/2$, $x_2=C-e/2$. Then $u_1=u_2=0$, $b_1=m_\epsilon+J/2$, $b_2=m_\epsilon-J/2$, and the actual J is the declared one. Both speeds are below $\sqrt{11/10}/100+1/18<0.07$. Periodic J and m give the same fixed rotation/translation recurrence as the earlier family. With x=10+cos t and c=J/2,

$$
B_S(\epsilon)=-\int_0^\pi\sin t\,[D_\sigma(c(t),m_\epsilon(t))-D_\sigma(c(t),m_\epsilon(2\pi-t))]dt,
\qquad D_\sigma(c,m)=\sigma(c+m)+\sigma(c-m)-2\sigma(c).
$$

For positive m, $\partial_mD_\sigma=\sigma'(c+m)-\sigma'(c-m)>0$ by strict convexity. On $(0,\pi)$ the bracket is strictly positive for $\epsilon>0$ and strictly negative for $\epsilon<0$. Thus B_S is strictly negative for the first parameter and strictly positive for the second. This is a hand-derived kinematic diagnostic with no quadrature or peer imports. It is not a solution of the Master Equation, a claim about a solution sign, or a counterexample to the exclusion. The peer may simply remove the old sign citation rather than incorporate this optional replacement; no new computation is required.

## Corrections before disposition

1. **◐ CM1 — keep the quantified exclusion in the lead and numerical wording.** The lead's assertion that a repeating solution cannot exist unless its geometry is far from a nearly circular wide pair omits the low-J case where eta is at least one. Likewise the sentence that only loss and breathing can cancel the gain omits the explicitly retained R unless its margin is assumed. State the actual joint threshold and its eta requirement, with the circle value explicitly orientation only. The w=0.1 display uses upward-rounded upper coefficients and upper error constants; it is a conservative sufficient exclusion test, not an equivalent numerical restatement of the exact predicate. Label it accordingly in Result and proposed propagation. No coefficient changes are required.
2. **◐ CM2 — the previous two-sign family has B_S=0.** Withdraw the reference to that family as showing both signs for the new integral. Its P_perp vanishes, so the present weight vanishes. A nonnegative weight and signed dx alone do not establish both realizable signs under the stated kinematics. Retain an unresolved sign statement, floating observations with their stated authority, or optionally incorporate the separate exact transverse-sum family above with its prescribed-path limitation and attribution. Keep all original instruments and outputs frozen.
3. **◐ CM3 — domains and nonvacuity.** Make the ordinary positive one-partner/zero-self subwake domain explicit for C.2 and its Result item, inherited from C.1 and the accepted actual-row setting; J>0 alone is insufficient to define the stated roots and S_i. In “finite and positive,” total variation may be zero: recurrence supplies finite nonnegative variation, finite positive Xi and Theta, and positive J_min. C.3a/C.3 hold even for eta>=1; only the strict exclusion class is empty then. Correct the Limits statement and parallel passages. Update the unreviewed claim grade to reflect this separate reconstruction and its pending corrections. No new run is needed.

## Independent arithmetic, identity checks and retained evidence

**Measured by the known-first independently authored audit** `.tmp/saturday-continuation-2026-10-12/audit-common-motion.py` under the shared venv at `2026-10-12T19:35:30.823045+00:00`: all six columns in nine table rows pass a rational bisection square-root enclosure, accepted c(w) bounds are separately verified above the analytical formula, seven advertised/imported file identities match, and twelve frozen source/owner identities match. Known SHA, exact square-root enclosure, planted table/numeric parsers, $\kappa_M(3/5)=4$, $\kappa_S(3/5)=125/256$ and $\tau_0=3/8$ controls passed before targets. The audit imports no peer module and reruns no peer instrument. The peer JSON table matches the subject's displayed fractions exactly. Receipt and first-reviewed subject/README copies are retained under `.local-data/aaa-work-threads/saturday-continuation-2026-10-12/codex-common-motion/`. Freeze this reference and the hand reconstruction during correction.

Direct reading of the retained supervisor's actual fields records completed status, requested time 19:29:50.039Z, elapsed 1.349 seconds, exit zero and closed process group. The retained payload reports its known and sampled targets passed. These are execution records, not an independent current process census. Sampled kinematic agreement supplies neither a solution evolution nor independent validation of the necessary condition; that condition is supported by the separate derivation above. The instrument's reuse of the frozen Z0 module is disclosed and unchanged. Its sampled coefficient and floating allowances are stated accurately in subject/README.

The scientific advance is a nonnegative common transverse loss with a nonnegative breathing weight and an explicit restricted-class exclusion, rather than another unsolved decomposition. It directs future proof effort toward the two solution-weighted geometry/variation integrals and small-J behavior. It removes no need to derive useful bounds on those inputs and closes neither general non-mirror periodicity nor the lattice family's later fate. Shared binary manuscript/priority propagation remains an existing-owner handover. Falsifiers are a broken periodic boundary identity, a wrong second-difference coefficient, a solution violating the actual-row remainder bound under its root/speed hypotheses, or a complete repeating solution satisfying the strict exclusion predicate. A prescribed path with that predicate refutes nothing. Acceptance awaits CM1–CM3 and corrected-byte verification.

## Final corrected-byte disposition — October 12, 20:18Z

**✓ CM1–CM3 resolved; bounded common-motion stage accepted.** The 20:17:19Z receipt and both corrected-file diffs were read directly. CM1 now retains the joint geometry/variation/error condition and low-J limitation, with the rounded w=0.1 display a conservative sufficient test. CM2 correctly identifies the old axial-sum family as a zero-loss control and incorporates the separately constructed transverse-sum diagnostic, whose reflection and strict-convexity argument was rechecked by hand above; no solution sign follows. CM3 makes the ordinary positive one-partner/zero-self subwake domain explicit, allows zero variation, and distinguishes valid necessary inequalities at every eta from the empty strict exclusion class when eta>=1. Claim grading cites the separate review. No additional actionable issue was found in the corrected passages.

**Measured by the known-first retrieval** `.tmp/saturday-continuation-2026-10-12/verify-common-motion-corrections.mjs` at `2026-10-12T20:18:16.845Z`: corrected subject `86ea0290efef4589a814fcf948ce4c89e462a45a7f39dd3349183dee8a3656cb` (29,302 bytes), corrected README `e7eb19b22cd884aaeffbb36eac759c3b4b8565a941434f20f3b70b177a9fe0f9` (8,393 bytes), five unchanged instrument/import/output identities, twelve frozen source/owner identities, nine unchanged table rows and all three earlier accepted campaign subjects match. Known SHA and planted table-row controls preceded target retrieval. Receipt: `.local-data/aaa-work-threads/saturday-continuation-2026-10-12/codex-common-motion/correction-retrieval.json`. The separate arithmetic instrument and core derivation were not changed or rerun; no peer instrument was rerun, and no live process census or trajectory evolution is claimed.

The exact balance, explicit remainder bound, weighted necessary condition and sufficient restricted-class exclusion are accepted as derived results. This is a useful M2 foothold in its quantified class only. The geometry and variation estimates needed to cover a larger solution class, small J, changing-sign J and general periodicity remain open. A valid complete repeating solution satisfying the stated strict predicate remains an operator-checkable falsifier. The selected continuation round's research/review can now close early; no fifth task or new work window follows. Shared lattice and binary manuscript/priority propagation remains an outstanding owner handover, separate from bounded scientific completion.
