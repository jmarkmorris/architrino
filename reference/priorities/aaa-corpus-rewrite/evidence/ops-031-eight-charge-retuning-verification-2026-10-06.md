# OPS-031 — Separate verification of corrections 6–8, October 6

## Disposition and scope

Items 6, 7 and 8 in the [approved eight-correction proposal](../analysis/ops-031-eight-change-proposal-2026-10-06.md) are **resolved** at their bounded mathematical and editorial scope. This worker independently checked the repaired charge/statistic distinction, continuum-summary grading and branch-preservation criterion. No corpus or control record was edited by this worker. CRW-005 remains closed; neither an action-derived charge nor an evolved braid is established by these repairs.

Preparation read live AGENTS, the startup router, the architrino-review skill and its owner, the review-closure-verifier, About Architrino and relevant mathematical/claim-level canon. Reading covered the full [three-binary chapter](../../../../content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md), 535 lines by `wc -l`, in contiguous overlapping `sed` ranges with clipped portions reread. [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) reading covered the continuum and analytic summary, the action-energy subsection, the scalar-kernel variation and its derivative-of-delta reduction, trajectory reconstruction, conditional total-energy/no-runaway statements and the earlier sharp-energy diagnostic cross-reference. This is not a fresh whole-Master-Equation theorem review. The original [tail receipt](../../aaa-operations/evidence/ops-031-master-tail-review-2026-10-05.md) and [three-binary receipt](../../aaa-operations/evidence/ops-031-nested-shell-dynamics-review-2026-10-05.md) supplied the original findings; the elementary references below were reconstructed independently rather than accepted because another reviewer agreed.

Final source SHA-256 by `shasum -a 256`: Master Equation `af193e30d009f0ea868651319761de7b70ae9dc34e1698345ead34554bac01fc`; three-binary chapter `65bdcff69f61b75b888ebc3675c40e0065c0805bfe08fa8b4c70a79c8dd03216`. The integration coordinator retains the complete before snapshots in `.tmp/ops-031-eight-integration/`; the proposal records their original versions. These hashes identify the checked bytes, not mathematical correctness.

## Item 6 — Failed statistic and conditional charge

**Resolved.** The current explicit integral is named $E_{\mathrm{stat}}$, its kinetic sum is named $E_{\mathrm{diag}}$, and the conditional conservation/residual displays instead use the separately unsupplied $E_{\mathrm{Noether}}$. The text expressly states that static normalization is insufficient, that this statistic fails the general residual identity, and that no charge is supplied here. The trajectory work integral remains a reconstruction, with its independence limitation intact. Later $E_{\mathrm{wake}}$ conservation and no-runaway statements remain explicitly conditional on a separately derived charge. The earlier sharp-energy diagnostic cross-reference was additionally qualified during verification: it now names an independently derived boundary-functional target and states that the linked subsection supplies a statistic rather than a derived charge.

**Independent derived reference, with known control first.** Set $c_f=1$ and let $C=\mu_{\mathrm{arch}}\kappa\sigma_{12}|q_1q_2|\ne0$ for a separated pair without self roots. Ordinary integration of the composed kernel derivative, when its upper-time boundary vanishes, gives

$$
E_{\mathrm{stat}}(T)=\frac12\sum_{i,j}\int_{-\infty}^{T}\mathcal K_{ij}(T,s)\,ds
$$

For the known static control $\mathbf X_1=R\mathbf e_x$, $\mathbf X_2=0$, each ordered root has delay $R$, unit transmitter Jacobian and collapsed density $C/R$. Thus the statistic is $C/R$, with the positive static sign for like polarity. This checks normalization without asserting conservation.

Now choose $\mathbf X_1(T)=[R+\epsilon y(T)]\mathbf e_x$, $\mathbf X_2(T)=0$, where $y(T)=(T-R)\chi(T-R)$ and the smooth compact cutoff is one near zero and supported in $|T-R|<R/4$. At $T=R$, the incoming emission neighborhood near zero is unchanged, $y=0$, $y'=1$ and $y''=0$. Small $|\epsilon|$ keeps the whole prescribed path below wake speed with separated transversal roots. The moving-receiver order contributes $C/[R+\epsilon y(T)]$; the reverse order's incoming emission history remains static. Consequently

$$
E_{\mathrm{stat}}'(R)=-\frac{C\epsilon}{2R^2}+O(\epsilon^2)
$$

In the full ordered scalar-action variation, worldline 1 appears once as receiver and once as transmitter, each with the outer factor one-half. At the static control both scale derivatives supply the same outward radial acceleration contribution, while the constraint-derivative integrals vanish because separation and direction are constant in the other integration variable. The resulting acceleration is $\mathbf A_{1,\mathrm{act}}^{(0)}=C\mathbf e_x/(\mu_{\mathrm{arch}}R^2)$. Therefore the required interaction derivative in the displayed residual balance is

$$
-\sum_i\mu_{\mathrm{arch}}\mathbf V_i\cdot\mathbf A_{i,\mathrm{act}}=-\frac{C\epsilon}{R^2}+O(\epsilon^2)
$$

Actual acceleration cancels after using $K_\mu'=\sum_i\mu_{\mathrm{arch}}\mathbf V_i\cdot\mathbf A_i$. The factor-two discrepancy is an off-shell identity test of this scaffold, not an evolved-trajectory claim or a failure of the canonical acceleration law. The repaired prose says precisely that. The future-reception integration domain alone cannot rescue a statistic whose ordinary derivative integral collapses to the reception density.

**Reopening condition:** A complete localized time-translation variation of the exact scaffold, with all ordered appearances and cut terms, that establishes this exact integral as the charge and passes this witness would reopen the disposition. No replacement charge, fitted correction, physical mass or unselected acceleration term was introduced.

## Item 7 — Continuum target

**Resolved.** The analytic summary now calls the available work geometric reductions and diagnostic checks, explicitly withholds retained EOM solutions, and separately names derivation of the Noether sea response equation and wave solutions as an effective continuum target. Contiguous `sed` reading of the neighboring continuum body confirms that its response equation, emergent channel speed and dispersion relation are still requested derivations. A plane wave can solve a specified effective equation; naming that solution class supplies neither the equation nor its reduction from the microscopic law. This is the independent logical reference for the grading repair. No Maxwell or acoustic equation was imported into architrino dynamics.

**Reopening condition:** An independently checked declared coarse-graining limit, response equation and wave solution within the chapter's accepted scope would allow a stronger summary. No such result is claimed by this verification. The surrounding body is preserved at its conditional recovery scope.

## Item 8 — Continuous retuning and discrete events

**Resolved.** The repaired paragraph separates discrete member/root identities and branch incidence from continuous delays, weights and exchange values. It requires maintained chart margins and unchanged discrete identities in addition to the first-order closure equation. A nonzero constraint contribution no longer alone declares a branch event, while zero projected change no longer certifies preserved identity. The action increment and closure equations are unchanged, and action quantization, retention, generation and strong-field claims retain their stated hypotheses or recovery-target grades across the whole chapter.

**Independent derived reference.** A stationary transmitter at the origin, receiver event at $T_r=0$ at range $1+\eta$, and retained interval $[-2,-1/2]$, with $|\eta|<1/4$ and $c_f=1$, give causal residual $g(s;\eta)=1+\eta+s$. At the known control $\eta=0$, the root is $s=-1$ and $\partial_sg=1$. For every stated $\eta$, the unique root $s=-(1+\eta)$ stays inside the interval, positive separation and transversality remain intact, and the discrete root identity does not change. Yet continuous delay $\ell=1+\eta$ changes. With $y=\log(1+\eta)$ and $C(y,\ell)=\ell-e^y$, the first-order changes at zero satisfy

$$
D_yC[\Delta y]=-\Delta\eta,\qquad D_\ell C[\Delta\ell]=\Delta\eta,\qquad D_yC[\Delta y]+D_\ell C[\Delta\ell]=0
$$

This checks compensating continuous contributions without a root event. Conversely $F(u;\eta)=u^2-\eta$ has no roots for negative $\eta$ and two oppositely oriented roots for positive $\eta$: its signed degree is zero on both regular sides despite a changed unsigned inventory. A compressed zero increment therefore cannot certify full discrete identity without an injectivity theorem. The repair is consistent with the canon's integer root-ledger definition and the same-record requirements in [Braid Recovery Requirements](../../../../content/markdown/aaa/noether-braid/braid-recovery-requirements.md).

**Reopening condition:** An explicit exclusively discrete injective definition of the original increment would defeat its continuous-data interpretation; any stronger preservation criterion must still prove chart and stability admission. These witnesses are prescribed geometry, not EOM solutions. The optional rest-scaling clarification from the original review is outside the accepted batch and remains optional.

## Implementation regression and remaining limits

During the first post-edit reading, item 6's standalone equations had single-dollar delimiters rather than the approved double-dollar delimiters. This worker reported that regression before closure. The coordinator identified replacement-string dollar expansion and repaired the implementation. A subsequent actual-source `sed` reread of the entire corrected item-6 block confirmed the double-dollar delimiters were restored, including the unchanged work reconstruction and pair approximation. This is an observed and repaired implementation issue; the final dispositions above apply to the final hashes, not the first intermediate version.

No further introduced substantive issue was identified in this worker's bounded item-6/7 context and full item-8 chapter reading. This does not certify every theorem in Master Equation or the wider corpus. External comparison citations were unchanged and not freshly inspected; no bibliographic verification is claimed. No solver, simulation, generator or publication command ran. Rendering and complete replacement/anchor checks belong to the coordinator's separate receipt; this worker's independent evidence is the calculus and closed-form root geometry above. Wall time, resource burden and model superiority were not measured.

Final `shasum -a 256` reconfirmed both source versions above. `git diff --no-index --check /dev/null` on this newly written receipt emitted no whitespace diagnostic; exit status 1 denotes its expected new-file difference. This receipt's links and TeX remain subject to the coordinator's combined authored-record validation.

After the mathematical review, the coordinator restored the unaffected one-sign circular count display and its existing viewer association, inadvertently removed by the item-2 replacement fragment. A scoped `sed` reread confirmed that restoration. An independent Node byte-reconstruction check first passed the known SHA-256 `abc` control; removing only the restored count passage from the final Master Equation returned the earlier inspected hash `47b627e6055471c9c81f1e83e66a50a4bedc83377c923bfe8b4766894de86034`. Thus the entire remainder, including items 6–8's Master Equation contexts, is byte-identical to that inspected version. The final hash above includes the restored passage. This restoration does not change the item-6/7 mathematical verdicts; the unchanged three-binary hash preserves item 8's verified version.
