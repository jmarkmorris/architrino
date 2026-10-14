# Independent review of the combined breathing integral

**✓ Accepted at the bounded identity-and-conditional-estimate scope; BR1–BR3 verified resolved.** The initial review below preserves its original reconstruction and findings. The [subject](saturday-combined-breathing-period-average-2026-10-12.md) was first read at SHA-256 `48bcb4dd643bd4caa7b15f14060601f45ecb6d4f36af2d3d9b4ccd8d432705df`, its [README](../evidence/saturday-combined-breathing-period-average-2026-10-12/README.md) at `01ad3e0543c952924736f69d95aa1e8097de66b2f430fc848f9053e21c064491`; corrected identities and disposition appear below. This separate review preserves the peer's subject, instrument, imported Z0 instrument and outputs. The [conversation](../../../../op/agent-chats/2026-10-12-saturday-lattice-and-period-averages/chat.md) owns the bound destination, serial gate and unchanged deadline; a subsequent explicit release owns the Lambda stage.

## Independent reconstruction and mathematical scope

The scenario is the unchanged opposite-polarity two-member Master Equation at unit reduced coupling and $c_f=1$, with complete planar paths, positive separation and rigid recurrence. Kinematic identities use actual path accelerations. Solution estimates additionally identify those accelerations with the canonical rows, require whole-past $0<w<1/3$ and $J\ge J_{\min}>0$, and retain the ordinary one-partner/zero-self setting. No physical conservation law or moving-frame invariance is assumed.

Let $x=r/J>0$, $d=1/x$, $c=d/2$, $m=P_\perp/2$. For periodic x, every continuous function of x has an antiderivative on its compact positive range. Therefore $\oint F(d)dx=0$. Since $b_1=c+m$, $b_2=m-c$, and Phi is even, its non-null part is

$$
D(c,m)=\Phi(c+m)+\Phi(c-m)-2\Phi(c)
=m^2\int_{-1}^1(1-|s|)\Phi''(c+sm)ds.
$$

The integration segment lies between $b_1$ and $-b_2$, inside the declared speed interval. Also $\Phi''(b)=(1-b^2)^{-3/2}-1\ge0$. Thus $0\le D\le P_\perp^2\varphi_2(w_t)/4$, proving the displayed two-sided H' bounds and $|H'|\le\kappa_B(w)|P|^2$. The weight vanishes when P does, and the associated integral vanishes even if x varies. This is a quadratic domination bound. It is not an exact quadratic form in P with coefficients independent of P: the integral coefficient depends on m and on the relative transverse velocity c.

For the solution variation estimate, differentiating x and using the accepted exact rate gives

$$
|\dot x|\le |\dot r|/J+r\mu/J+r^2|\delta||P_\perp|/J^2+r^2|e_J|/J^2.
$$

The canonical estimates imply $\mu\le c_1/r^2$, $r^2|\delta|\le c_2$, $r^3|e_J|\le c_3$ with exactly the subject's constants. The factor one-half in delta is essential: $(a_+-a_-)/2=(3w+w^3)/((1-w^2)r^2)$. Since $\Omega=J/r^2>0$, change variables to unwrapped separation angle. The three nonradial integrals are bounded respectively by $\Theta\Xi$, $\Theta\Xi X$ and $\Theta\Xi/J_{\min}$. The radial integral is bounded by $R_{\rm var}/J_{\min}$. This proves B.3 independently. Combining it with the weight bound and $G\ge\alpha\Theta$ proves B.4; it supplies no useful smallness unless its solution-dependent inputs are controlled. P is a velocity sum, twice the common velocity; the speed hypothesis gives $P_{\max}\le2w$.

For the coupling identity, the accepted derivative $\dot Q=2D_A+4\Omega P_\parallel P_\perp$ gives $\oint P_\parallel P_\perp/(2r)=-B-\Lambda$. Subtracting $B_\Phi=Z_0-T_1-T_3$ leaves

$$
\Lambda+\tilde B=-\oint(P_\parallel+\zeta_0)P_\perp/(2r)dt+T_1+T_3=-C_0+T_1+T_3.
$$

The exact period equation becomes $G+C_0=-Z_{\rm curved}-\oint re_Jdt$. Accepted S1 estimates give $|G+C_0|\le(\rho_Z+\rho_e)G/J_{\min}$. The smaller remainder in this representation results from retaining C0 whole; it does not bound C0 or its sign. Bounds for Lambda and breathing separately remain a possible proof route, while a direct bound for C0 is another. No assertion that every approach must use one decomposition follows from the identity.

## An independent exact kinematic family with both signs

This family is an analytical check on kinematics only, not a preparation or a solution of the Master Equation. It provides exact signs without depending on the peer's sampled sign counts. For all real t, choose separation r=1, $J(t)=1/[10(1+\cos t/10)]$, and a rotating unit axis $e(t)$ with $\dot\vartheta=J(t)$. Prescribe a velocity sum $P(t)=p(t)e(t)$ with $p(t)=\tfrac1{10}\sqrt{1+\epsilon\sin t}$ and $\epsilon=\pm1/10$. Define a center C by $\dot C=P/2$, and paths $x_1=C+e/2$, $x_2=C-e/2$. Their actual velocity components are $u_1=u_2=p/2$, $b_1=J/2$, $b_2=-J/2$, so P_perp=0 and the relative angular momentum is indeed J.

Over period $T=2\pi$, the axis advances by one fixed rotation R and $\dot C(t+T)=R\dot C(t)$. Hence $C(t+T)-RC(t)$ is constant, and both paths satisfy the same rigid recurrence. They are smooth and complete with positive separation and J. Speeds satisfy

$$
|v_i|^2\le\frac14\left(\frac{11}{1000}+\frac1{81}\right)<\frac1{100},
$$

so both are strictly below 0.1. With $x=r/J=10+\cos t$, the reduced weight is $H'=p^2/8=(1+\epsilon\sin t)/800$; the Phi part is a null weight. Therefore

$$
\tilde B=\oint H'dx=-\frac1{800}\int_0^{2\pi}(1+\epsilon\sin t)\sin t\,dt=-\frac{\pi\epsilon}{800}=\mp\frac\pi{8000}.
$$

This proves that the kinematic identities alone permit either sign even with a uniform slow-speed bound and rigid recurrence. These prescribed accelerations have not been identified with the canonical rows. It establishes no sign statement or counterexample for solutions.

## Corrections before disposition

1. **◐ BR1 — quadratic domination and relative-velocity dependence.** Replace “quadratic form in the common velocity” and “only the common velocity matters” as exact characterizations by the proved quadratic bound and vanishing at P=0. Explicitly retain the coefficient's dependence on $c=J/(2r)$ and $m=P_\perp/2$. The nonlinear second difference is not a homogeneous quadratic form; no formula or inequality needs changing. P is the velocity sum, twice the common velocity. Keep this distinction in headings, Result, explanatory prose and proposed propagation.
2. **◐ BR2 — restrict route and hypothesis claims.** Lemma B.1 provides a sufficient family of null weights; it does not prove that only functions of J/r may integrate to zero. The statement that the common-velocity direction turns twice per turn is not supplied for an evolving P. State the unresolved Q dependence and the failed attempted removal without importing a fixed-P angular model. Likewise replace the radial equation's asserted inability to supply a bound by the fact that none is derived on this route. Result item 2's “none of those” needs the explicit exception $P_{\max}\le2w$, plus the distinction between finite/positive quantities provided by recurrence and useful smallness not provided. The later section already states the P exception correctly.
3. **◐ BR3 — keep numerical sample and sign authority exact.** The README asserts that the ratio's distance from one is much larger than the effect of using a sampled maximum speed, but provides no certified bound on that effect. Report the actual sampled coefficient and quadrature ratio only; no full-period maximum or error certificate follows. The predicate permits ratio $\le1+10^{-12}$, which should be stated beside its pass. The subject's weight-sample check uses absolute allowance $10^{-14}$ and the H/H' comparison has scale $\max\{|\tilde B|,5\times10^{-4}\mathcal V\}$; disclose those when reporting the respective checks. Floating sign counts are measured observations. If retaining the stronger derived claim that kinematics does not fix the sign, cite or incorporate the separate exact family above, with its prescribed-path limitation. No new run is needed.

## Independent arithmetic and retained evidence

**Measured by the known-first Codex audit** `.tmp/saturday-continuation-2026-10-12/audit-breathing.py` under the shared venv at `2026-10-12T19:11:56.197927Z`: all seven advertised/imported file identities and six frozen accepted input identities match, and all six columns in all nine table rows pass a separately authored rational bisection square-root enclosure and exact-fraction comparison. Known SHA, root enclosure, parsers, $\varphi_2(3/5)=61/64$, $\kappa_B(3/5)=93/256$ and the row-strength half-difference control passed before targets. The audit imports no peer module and reruns no peer instrument. Receipt and first-reviewed copies are under `.local-data/aaa-work-threads/saturday-continuation-2026-10-12/codex-breathing/`; freeze this reference during corrections.

The actual supervisor fields record one completed exit-zero run lasting 2.766 seconds with a closed process group. The payload reports known cases and targets passed. These are retained execution observations, not an independent live process census. The new peer instrument imports the older frozen Z0 module; this is disclosed reuse, not an independent implementation. Sampled identities and exact table arithmetic have separate authority from the hand reconstruction.

Acceptance awaits BR1–BR3 and corrected-byte verification. Falsifiers include a broken antiderivative or periodic boundary condition, a pointwise second-difference bound failure, a solution violating B.3 under its stated root/speed margins, an algebraic error in the C0 balance, or an exact evaluation exceeding a table bound. The exact diagnostic family's claimed sign would be refuted by differentiation/integration yielding another value; it tests no solution-only claim. After disposition, the next useful Lambda stage should address the remaining common-motion comparison, considering C0 directly or retaining its exact coupling to breathing. No general periodicity exclusion is established here.

## Final corrected-byte disposition — October 12, 19:19Z

**✓ BR1–BR3 resolved; bounded breathing stage accepted.** The 19:17:43Z receipt, corrected subject and README diffs were read directly. BR1 retains the exact second-difference dependence on c and m and describes quadratic domination rather than a fixed quadratic form or dependence on the velocity sum alone. BR2 distinguishes a sufficient null-weight family and unresolved attempted estimates from a universal obstruction, and preserves the supplied speed bound and finite positive recurrence inputs without claiming useful smallness. BR3 discloses the actual sample scales, allowances and uncertified speed maximum; the exact prescribed two-sign family above is incorporated with attribution and its kinematic limitation. No mathematical formula or estimate changed, and no new actionable issue was found in the corrected passages.

**Measured by the known-first retrieval** `.tmp/saturday-continuation-2026-10-12/verify-breathing-corrections.mjs` at `2026-10-12T19:19:17.466Z`: corrected subject SHA-256 `d43d49a9f289a1f2b8df192ed87fbac8f3d3dda19559ca1b10576db2529aaf05` (29,628 bytes), corrected README `934da1125e251e63839467df57f67a466acce6f22f9da907f69422384848cbfd` (8,416 bytes), five other advertised/imported identities, all nine table rows and six frozen accepted inputs match. Current manuscript, queue, priorities and lane README identities remain unchanged. Known SHA and planted table controls preceded target retrieval. Receipt: `.local-data/aaa-work-threads/saturday-continuation-2026-10-12/codex-breathing/correction-retrieval.json`. The independent arithmetic instrument and core hand reconstruction stayed frozen; neither the peer instrument nor its reference was rerun or changed. Peer-reported closed compute is retained without an independent live process census.

Accepted derived progress consists of the null-weight identity, quadratic domination, explicit solution-derived variation bound, conditional gain comparison and exact correlated C0 balance. Useful smallness, a solution sign, M2 and general non-mirror periodicity remain open. The exact prescribed family supplies both kinematic signs only. It cannot supply a solution counterexample merely by satisfying speed and recurrence conditions. Shared binary manuscript/priority propagation belongs to the existing owner and remains an outstanding scoped handover; the earlier-round integration remains complete. This bounded disposition permits the already selected Lambda/common-motion comparison under a separate explicit serial release, without reopening S1 or extending the campaign deadline.
