# A bounded cubic-row calculation for the original canonical entry question

**Status: proposed formal method; no new physical result.** The accepted slow-binary seed bound loses too much early phase information to decide the actual nominal pair's late radial entry. A possible improvement is to retain the next signed term of the generated mirror acceleration before estimating its remainder, then treat the already admitted nominal/spatial difference with the existing complete-history estimates. This note authorizes no mirror replacement as the actual target. The fixed canonical law, coupling, original nominal preparation, complete extensions and $c_f=1$ remain unchanged.

The [accepted wider slow-binary assessment](slow-binary-wider-regime-independent-adjudication.md) and its [subject](slow-binary-wider-regime.md) give the scaled mirror row through second order, with signed anisotropic cubic error. This proposed calculation is a formal expansion of that response, used as a mathematical reference. It does not integrate a new preparation or bypass the EOM solver. A positive terminal speed of the literal nominal case is still unproved.

In the receiving polar frame let $Y=(r,0)$ and $V=(p,q)$, with slow-time derivatives and wake-speed parameter $\epsilon$. Write the exact mirror chord as $S=Y+Y(\sigma)$, range $R=|S|$, positive delay $u=s-\sigma=\epsilon R$, $D=1+\epsilon N\cdot V(\sigma)$ and $A=-4N/(R^2D)$. On generated smooth windows, the existing second-order row supplies the formal coefficients

$$
A_0=(-1/r^2,0),\quad A_1=(-p/r^2,q/r^2),\quad
J_0=(2p/r^3,-q/r^3).
$$

Here $J_0$ is the ordinary derivative of the leading central row along the leading motion, including rotation of the receiving frame. The proposed cubic calculation inserts

$$
Y(\sigma)=Y-uV+\tfrac12u^2(A_0+\epsilon A_1)-\tfrac16u^3J_0+O(\epsilon^4),
$$
$$
V(\sigma)=V-u(A_0+\epsilon A_1)+\tfrac12u^2J_0+O(\epsilon^3),
\quad u=2\epsilon rL,
$$

then solves the implicit norm equation for $L$ coefficient by coefficient. The $O$ symbols are formal placeholders. Uniform bounds for their actual-history values, including source generation and seam coverage, are a separate obligation before physical use. In particular differentiating an already bounded error term does not automatically bound its derivative.

A short exact-symbolic instrument first checks polynomial arithmetic and the complete affine-source response obtained by setting the source acceleration and jerk jets to zero. Its exact radial and tangential control is

$$
A_r^{\rm aff}=-\frac{\sqrt{1-\epsilon^2q^2}+\epsilon p}{r^2},\qquad
A_t^{\rm aff}=\frac{\epsilon q+\epsilon^2pq/\sqrt{1-\epsilon^2q^2}}{r^2}.
$$

This is a prescribed-history evaluation, not an actual affine coupled future. The expected cubic coefficient is zero in both components. The control must pass before insertion of the generated jets. The target is only the exact symbolic cubic coefficient and lower-order parity with the accepted row, not an evolved trajectory or a remainder certificate.

Use the shared venv, one numerical thread, a supervised foreground process with a 120-second outer deadline, a 90-second internal wall limit, 512 MiB cooperative resident-memory limit, bounded output and advancing coefficient progress. No compiled source is used. Freeze the instrument after its known pass, retain both receipts and preserve failures. A separately derived assessment is required before the new coefficient becomes a mathematical premise. The receiving report is [the main A account](overnight2-a-followup-and-research-2026-10-07.md). If the coefficient or a usable uniform remainder cannot be supported, retain that exact limitation and do not turn the formal row into a production evolution law.

**Known-control receipt, 2026-10-07 05:13:43 UTC, before target access.** The [symbolic instrument](../evidence/overnight2-a-canonical-cubic-row.py) passed exact product, reciprocal and square-root controls and returned the expected affine row through degree three, including zero cubic coefficients in both components. The retained local receipt is `.local-data/master-equation-closure/overnight2-a/canonical-cubic-known.json`, which reports `passed: true`, 0.0892 seconds and 63,832,064 peak resident bytes on Darwin. The closed supervisor lease is `16df58d3-63e5-4d03-a32c-134aca080fde`. Its producer identity is `4597fc61ac72297a5ece734b529346404e8a0760ae19ea7882979e62a2fb4019`, confirmed by native SHA-256; the instrument is frozen for its generated-jet target. An earlier known-only invocation failed its reciprocal assertion because a Python integer division introduced a floating coefficient; exact sympification of input lists corrected that issue. The failed lease `04369f26-3006-47cb-95a2-947e51c70a2b` and its log remain preserved, with process group closed. No target preceded the pass.
