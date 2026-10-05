# OPS-031 Master Equation continuation review — 2026-10-04

## Scope and disposition

This report-only current-document pilot reviewed the complete Master Equation source block at lines 2883–3955, from `Parameters and Numerical Implementation` through `Maximum-curvature binary (declared indexed-binary idealization)`, stopping before `Symmetric delayed spiral (advanced non-circular benchmark)` at line 3956. This is partial chapter coverage and partial priority-1 cycle coverage; it does not certify the chapter or complete the cycle. The next heading is scheduled for review on 2026-10-05. The coordinator owns shared cursor and coverage reconciliation.

Two supported current defects are proposed for adjudication. No source text, shared tracker, generated artifact, scientific instrument, or scientific evidence record was changed. Historical calibration defects are separate and are not routed as new findings. The coordinator accepted the preceding calibration as eligibility for this bounded pilot; that decision establishes neither general model superiority nor corpus-wide correctness.

Reviewer runtime model identifier and reasoning settings were not exposed. The mandatory startup memory search exposed a registry summary naming earlier OPS-031 repair topics; no prior review receipts, proposals, or repair snapshots were opened by this reviewer. Consequently the calibration was not fully blinded. This limitation remains applicable to interpretation of the pilot, whose current findings were independently supported by the algebra below.

## Inspected source snapshot

The complete source was frozen in `.tmp/ops-031-oct04/master-equation-pilot-source.md`; the assigned block was copied to `.tmp/ops-031-oct04/master-equation-pilot-block.md`. The findings and decisive quoted passages below are durable in this receipt. SHA-256 values were measured with `shasum -a 256` on the named files, not inferred from commit messages.

| Source | SHA-256 |
| --- | --- |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) and frozen complete copy | `8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f` |
| Assigned block, source lines 2883–3955 | `13cadf8933f6e5ec6749504619070a455949b4bcd01f81df1d1169217fc87af1` |
| [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md), definitions and singular-event limits at lines 1–95 | `9d3f86ff4ca93124bcbca63d028db5fae7d25d169fd780ee44ae9e3035b8d0ea` |
| [AGENTS.md](../../../../AGENTS.md) | `679920441e69b3ebc503bc57e0ccd4ed7f8bb24dbe6b111fe6a6f39e4354edd5` |
| [Startup router](../../../op/agent-startup-orientation.generated.md) | `8323732f6364240e5cf69753be853ffcde19bb287d21883cf751bb4742364df6` |
| [Periodic review owner](../../../op/periodic-document-review.md) | `5eb0fecb992d3b547554da3b45c6c4c9ae25bf5797ee428148ad54209b93b836` |
| [Corpus reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md) | `07d11f4dadb19c195bfdeab710bd8fa7ba7b5e899433955983a4cec6a0e93b6e` |
| [Operator explanation standard](../../../op/operator-explanation-standard.md) | `328459c22faedf6038054a924c576d52764c41c636273f7b6e30067097e9ace6` |
| [Theory orientation](../../../op/theory-orientation.md) | `3b447b9b7a1961e71edfbc1cca8f300f498237f9069d10a1afa53e05cb4c3668` |
| [Review skill entry](../../../../.agents/skills/architrino-review/SKILL.md) | `46c16cb11b5919542fced16160884d7b73488e1de7511b4e757a97426aa757b8` |
| [Review skill owner](../../../op/skills/skill-architrino-review.md) | `be43ee282cbff046d759a131057b3d9c5428c7b1db2f051db7a18092b78ef2d7` |

The full block was read in contiguous source ranges 2883–3100, 3101–3310, 3310–3635, and 3636–3955. Nearby Master Equation definitions at lines 1–90 and the diagnostic action-energy definition at lines 855–940 were read to ground the weight and action distinction. The Causal Action Functional was read only for the relevant current definitions and limits. Scientific analyzer runs, broad corpus searches, external sources, and earlier repair snapshots were not part of this pilot.

## Finding 1 — unit playback does not remove the circular acceleration pole

**Disposition:** demonstrated local mathematical contradiction; proposed correction, not implemented. **Grade:** derived from the stated circular kernel and an independently reconstructed Taylor expansion. **Importance:** substantive, because it misidentifies the singularity that a retained circular branch must control.

At Master Equation line 3578 the source says:

> A circular self branch born on $D_t=0$ marks a chart boundary; it does not supply a singular receiver-side amplitude on the uniform circular ansatz.

The preceding paragraph at line 3576 correctly states that $D_r/D_t=1$ on nondegenerate circular roots while $W^{\mathrm{acc}}=c_f/|D_t|$ grows without bound. These are different quantities. In the declared law, the acceleration is evaluated at the receiver; its magnitude includes the transmitter coarea weight and is not multiplied by signed root playback.

To check the contradiction independently, take a higher-lobe birth with sign $s$, root $\xi_*>0$, and $\beta_*$. The root function is $g(\xi,\beta)=s\sin\xi-\xi/\beta$. At birth, $g=g_\xi=0$, $s\sin\xi_*=\xi_*/\beta_*$, and $s\cos\xi_*=1/\beta_*$. Direct differentiation gives $g_\beta=\xi_*/\beta_*^2$ and $g_{\xi\xi}=-\xi_*/\beta_*$. For $\mu=\beta-\beta_*>0$ and $\delta=\xi-\xi_*$, the leading Taylor equation is therefore

$$
0=\frac{\xi_*}{\beta_*^2}\mu-\frac{\xi_*}{2\beta_*}\delta^2+O(\mu^{3/2}),
\qquad
\delta=\pm\sqrt{\frac{2\mu}{\beta_*}}+O(\mu).
$$

The transmitter factor $J=1-\beta s\cos\xi$ has $J_\xi=\beta s\sin\xi=\xi_*$ at birth, so

$$
J=\pm\xi_*\sqrt{\frac{2\mu}{\beta_*}}+O(\mu).
$$

At fixed positive $R$, the separation tends to $r_*=2R\xi_*/\beta_*>0$. Thus the nondegenerate-side branch acceleration magnitude $\kappa q^2/(r^2|J|)$ diverges proportionally to $\mu^{-1/2}$. The radial projection also has a strictly positive limiting direction coefficient and diverges. Equal endpoint factors leave the playback derivative equal to one; they do not cancel the acceleration pole. This is a parameter-family result about prescribed circles, not a theorem about transit impulse along an evolved history or a claim that the singular endpoint is an admissible state.

**Smallest proposed correction:** replace the quoted clause with: “its signed root-playback derivative remains one on the nondegenerate circular roots, while its receiver-evaluated branch acceleration diverges as the transmitter Jacobian vanishes.” Preserve the chart-boundary and retained-closure caveats.

**Falsifier:** supply a different explicitly selected acceleration kernel in which the factor $1/|J|$ cancels, or refute the displayed Taylor derivatives on the declared circular chart. Neither unit playback nor an undefined singular-event continuation overturns the nondegenerate-side limit.

## Finding 2 — the current scalar functional counts the transmitter collapse once

**Disposition:** demonstrated inconsistency with the linked current scalar definition; proposed correction, not implemented. **Grade:** derived from the current declared functional and the fold expansion above. **Importance:** substantive, because an extra collapse factor changes the singular order and can change conclusions about integrability.

At Master Equation line 3519 the source says:

> so the action-counting density carries an additional $|g_{\beta_f,s_n}'|^{-1}$ and scales as $O(\mu^{-1})$ at fixed nonzero $r_n^\star$.

The current [Causal Action Functional definition](../../../../content/markdown/aaa/dynamics/causal-action-functional.md#core-functional-definitions), lines 37–67, instead defines a receiver-time average of the root sum $W^{\mathrm{acc}}/(r^2+\epsilon_c^2)$, with every distinct ordered root counted once. Its definition explicitly disallows an extra playback multiplier. At a positive-separation fold, $W^{\mathrm{acc}}=1/|J|$ and $|J|$ is proportional to $\sqrt\mu$, while the distance denominator tends to a positive constant. Each root and its pair sum therefore scale proportionally to $\mu^{-1/2}$, not $\mu^{-1}$.

The identity $g'=-J/\beta$ is correct. It does not require a second factor of $|g'|^{-1}$ after the root weight has already been included. For a delta representation, collapsing once produces the coarea weight once. The nearby Master Equation action-energy diagnostic at lines 881–909 independently reinforces this bookkeeping distinction: its $1/r$ delta kernel collapses to $W^{\mathrm{acc}}/r$ and expressly says that the weight is not inserted a second time.

**Smallest proposed correction:** retain $g'=-J/\beta$, then state that the declared receiver-time scalar branch magnitude has the same $O(\mu^{-1/2})$ fold scaling at fixed positive separation. State that a distinct action functional must declare its own pre-collapse integrand and measure before any different singular scaling is assigned. Do not equate the scalar with a variational action.

**Falsifier:** identify an explicitly defined different functional with a pre-collapse singular factor that independently yields a second inverse Jacobian, and identify its intended scope in this passage. That would establish a claim about that separate functional; it would not change the current scalar definition. A reception-time approach with $\mu\propto(T-T_*)^2$ may produce a $1/|T-T_*|$ singularity, but does not turn the scalar's parameter-family scaling into $\mu^{-1}$.

## No-change examples and evidence limits

| Reviewed claim | Independent reference or reasoning | Disposition and boundary |
| --- | --- | --- |
| Parameters and finite-width resolution, lines 2883–2951 | $\kappa q^2/r^2$ has acceleration units; direct differentiation of a fixed-emission gap gives $\partial_{T_r}g=\hat{\mathbf r}\cdot\mathbf V_r-c_f=-D_r$. | No change. The $\eta/|D_r|$ resolution scale is local, with stationary crossings and stability appropriately separated. Spatial-index cost claims are explicitly conditional and require measurement. |
| Slow head-on reduction, lines 3054–3084 | With equal polarity magnitudes and a symmetric separation $r$, the two instantaneous leading-order inward accelerations contribute $-2\kappa\epsilon^2/r^2$ to $\ddot r$. | No change to the leading-order equation or the explicit restriction against continuing it through coincidence. This does not validate higher-order delay corrections. |
| Sub-field-speed circular partner root and projections, lines 3090–3290 | The chord bound gives $\xi\le\beta_f<1<\pi/2$; strict decrease of $\cos\xi-\xi/\beta_f$ yields uniqueness. Direct endpoint vector geometry gives $D_r=D_t=c_f(1+\beta_f\sin\xi)$ and the displayed inward radial, positive tangential coefficients. | No change. Positive tangential acceleration excludes the isolated constant-speed circle in this ansatz; it says nothing about a broader branch's stability. |
| Principal self-root birth and branch count, lines 3320–3558 | Expanding $\sin\xi/\xi=1-\xi^2/6+\cdots$ gives $\xi_0\sim\sqrt{6\mu}$, $J_0\sim2\mu$, and $1/(r_0^2|J_0|)\sim1/(48R^2\mu^2)$. Each absolute-sine half-wave is concave and contributes at most two roots. | No change to these formulas or their uniform-circular scope. They do not prove bounded root count for arbitrary bounded-speed histories. |
| Signed self-root direction and threshold, lines 3590–3660 | The circular self chord has direction $|\sin\xi|\mathbf e_r+s\cos\xi\mathbf e_\theta$. Positive multiplier implies outward radial projection; the principal tangential sign changes at $\xi=\pi/2$, hence $\beta_f=\pi/2$. | No change. The one-sign sheet table is explicitly a restricted subchart, followed by the full absolute-value census. |
| Partner high-speed leading terms, lines 3820–3868 | Substitute $\cos\xi=\xi/\beta_f$ and $\xi=\pi/2-\pi/(2\beta_f)+O(\beta_f^{-2})$ into the independently checked partner projections. | No change to $a_\theta=(4C/\pi^2)\beta_f+O(C)$ and $a_r=-2C/\pi+O(C/\beta_f)$. Formal self sums remain unverified global asymptotics near fold neighborhoods. |
| Equilibrium before stability, lines 3813–3817 and 3876–3955 | Uniform circular kinematics require inward acceleration $-\omega^2R\mathbf e_r$ and zero tangential acceleration. An outward residual cannot support that prescribed circle. | No change to the separation of algebraic candidates, singular-event completion, retained history, and stability. No spectrum or retained evolution was computed in this review. |

Reported analyzer scan minima, algebraic zeros, root angles, numerical radial coefficients, and counterfactual scans were read as source-attributed measurements. The analyzer was not rerun and its implementation was not reviewed. They are not newly independently verified measurements in this receipt. The chord and weight algebra above is independent mathematical support for the stated local formulas only. The incomplete formal self-sum asymptotics were not promoted into accepted global results.

Any counterexample to the displayed chord geometry, implicit derivatives, or Taylor coefficients would overturn the corresponding no-change mathematical disposition. An independently reproduced mismatch in the named analyzer's recorded domain would overturn the source's numerical measurement, but this review supplies no such mismatch.

## Attribution and continuation

These findings concern the inspected current snapshot. The coordinator separately reported that both suspect sentences were already present in two preserved pre-repair snapshots by exact-text `rg`; this reviewer did not inspect those snapshots. That limited observation supports treating these as older missed defects rather than regressions demonstrated to have been introduced by the recent approved repairs. Earliest introduction and causal attribution remain unresolved here.

Recommended next work: adjudicate the two proposed corrections through the scientific/editorial owner, preserving the distinct scalar/action definitions and singular-event scope. Continue report-only coverage at `Symmetric delayed spiral (advanced non-circular benchmark)` on 2026-10-05. No source repair or expanded scientific recomputation is authorized by this receipt.
