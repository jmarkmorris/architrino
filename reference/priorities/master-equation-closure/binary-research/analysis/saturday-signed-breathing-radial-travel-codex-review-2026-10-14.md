# Independent review of signed breathing and radial travel — October 14, 2026

## Current disposition

**Derived mathematics supported, with actionable claim-boundary corrections pending.** The [subject](saturday-signed-breathing-radial-travel-2026-10-14.md), first reviewed at 28,727 bytes and SHA-256 `199b10119ee38e6951832a997705fd14b52691f48c5e01c593a6edbdc3dffc4a`, relates the two breathing integrals exactly and gives a new bound on the common-motion integral. Reconstructing its proof from the actual component equations supports W.1–W.6 and the inequalities of W.7. The signed interpretation of W.7 needs an additional margin for the isotropic integral; its result summary also omits one error term. The formal ellipse calculation is a useful auxiliary comparison, but does not prove that a second recurrence identity is necessary or that the actual leading coupled dynamics cannot close the question.

The same complete planar opposite-unit-polarity, unit-reduced-coupling scenario is retained, with the unchanged Master Equation and numerical $c_f=1$. Separation is positive; the solution repeats after the same fixed rotation and translation for both members; its whole past has speed at most $0<w<1/3$; and relative angular momentum satisfies $J\ge J_{\min}>0$. These assumptions give one ordinary partner row per member and no own row. Low positive J and zeros/sign changes remain outside this released task. No trajectory is evaluated. A bounded disposition can follow corrected-byte verification without proving general periodicity.

## Coverage and source boundary

The full new subject and shared checkpoint are read, together with the current binary manuscript Section 9, the live periodicity queue entry and current owner framing. Actual controlling passages are inspected: non-mirror Proposition H, its remainder definitions and proof; straight-strength reduction and Proposition Z.3 with its integrands; breathing B.1–B.2 and B.5; curved-window Lemma S.1 and Corollary S1.1; and the previously accepted radial-period identities, floor and final separate review. The canonical per-hit acceleration, emission-side transmitter factor, boxed all-root sum, partner/self split and zero-delay exclusion are read from `content/markdown/aaa/dynamics/master-equation.md`. Startup owners match their already-read current bytes by native SHA-256 retrieval. The review uses neither an observer-level conservation law nor an external inverse-square law as a premise.

The separately authored [arithmetic reference](../evidence/saturday-signed-breathing-codex-review-2026-10-14/signed_constants_reference.py) imports no peer instrument, source output or earlier checker. Primitive accepted row and curvature estimates remain dependencies, rather than being re-proved by numeric agreement. The author of the subject reports no instrument or job; wider process census remains unknown. Coordinator scratch, first-reviewed bytes and execution receipts are retained under `.local-data/aaa-work-threads/saturday-breathing-lattice-low-angular-momentum-2026-10-14/codex-binary-review/`.

## Independent reconstruction

Write $x=r/J$, $\mathbf P=\mathbf v_1+\mathbf v_2$, and let $P_\parallel,P_\perp$ be its components along and across the current separation axis. Put $Q=P_\parallel^2-P_\perp^2$, $d=J/r=b_1-b_2$, $\Phi(b)=1-\sqrt{1-b^2}-b^2/2$, and $D_\Phi=\Phi(b_1)+\Phi(b_2)-2\Phi(d/2)$. The accepted weights are $W_S=P_\perp^2/4+D_\Phi$ and $H'=Q/8-D_\Phi$, so directly

$$
W_S+H'=\frac{|\mathbf P|^2}{8},\qquad
B_S+\tilde B=I,\qquad I=\frac18\oint|\mathbf P|^2dx.
$$

Rigid recurrence makes $x$ and $|\mathbf P|^2$ periodic. Thus $I=-\tfrac14\oint x\,\mathbf P\cdot(\mathbf A_1+\mathbf A_2)dt$ on solutions. Identifying the actual accelerations with the received rows is the dynamical step; the first weight identity is kinematic. No boundary term survives.

Let $\mu=(a_1+a_2)/2$, $\delta=(a_2-a_1)/2$, and $A_\parallel,A_\perp$ be the row-sum components. Proposition H supplies $A_\parallel=2\delta-\chi$, $A_\perp=-\mu P_\perp-\delta d+e_P$ and $2\delta=(P_\parallel+\zeta)/r^2$. Consequently the two products are independently obtained as

$$
A_\parallel P_\parallel\pm A_\perp P_\perp
=\frac{P_\parallel^2\mp r^2\mu P_\perp^2}{r^2}
+\frac{\zeta P_\parallel}{r^2}-\chi P_\parallel
\mp\delta dP_\perp\pm e_PP_\perp.
$$

The upper sign is the isotropic derivative; the lower is the integrand used by $\Lambda$. The whole-speed constraint gives $|\mathbf P|\le2w$ and the useful sharper product $|dP_\perp|=|b_1^2-b_2^2|\le w^2$. Inserting the accepted bounds for $\zeta,\chi,\delta,e_P$ yields the subject's $4k_1/r^2+k_A'/r^3$ remainder, with no discarded mixed term. Since $r^2\mu\in[\alpha,c_1]$ and $c_1\ge1$, the leading isotropic numerator has absolute value at most $4w^2c_1$, while the leading $\Lambda$ numerator is nonnegative and at most $c_1|\mathbf P|^2$. This supports W.2 and W.3. Their integrals use $\mathcal N=\oint dt/(rJ)$ and $\oint dt/(Jr^2)\le\Theta/J_{\min}^2$, where $\Theta=\oint Jdt/r^2>0$.

For W.4, the exact straight comparison gives $r^2\mu^0=1+\dot r/2+\xi_0/2$, with $|\xi_0|\le z_0$. A separate integration by parts gives $\oint\dot r\,d\vartheta=\oint\dot J\,dt/r$, rather than zero. The accepted $|\dot J|\le2wc_1/r$ and S1 curvature error then produce the claimed gain lower bound. Retaining the two curvature terms, $T_1$ and $T_3$, gives

$$
\Lambda+\tilde B\ge(1-\eta_\Lambda)\Theta-t_1\mathcal N,
\qquad \eta_\Lambda=z_0/2+h_1/J_{\min}.
$$

Combining this with W.3 and $|\tilde B|\le4w^2\kappa_B\mathcal V$ proves the necessary inequality of W.5. Substituting the accepted variation and radial-average bounds proves its sufficient exclusion; it remains a sufficient class predicate, not an unconditional travel bound or a necessary criterion for absence of repetition. The positive-J and speed assumptions are retained in each substitution. For constant separation, $\ddot r=0$ gives $J^2=r^3A_r\ge c_-r$ throughout. The already accepted range through $10^6$ and the new strict numeric comparison on $10^6\le r\le2\times10^7$ therefore establish W.6 in its declared subclass.

## Sign and order conditions

Set $H=1-\eta_\Lambda-\eta_\Lambda'-\lambda_\Lambda$ and $E_I=(k_A/4)\mathcal N/\Theta+k_A'/(4J_{\min}^2)$. The reconstructed inequalities are

$$
\tilde B\ge H\Theta,\qquad B_S\le(-H+E_I)\Theta.
$$

Thus $H>0$ proves $\tilde B>0$, whereas the stated upper bound signs $B_S$ only if $H>E_I$. “Nearly the same amount” also requires $E_I$ small relative to the relevant breathing size; “nearly the whole gain” requires the full error and loss fractions to be small, not merely a positive H. This is a logical distinction, not an actual-solution counterexample.

The displayed W.3 estimate alone bounds a second-order principal term and third-order straight-row remainder plus a curvature allowance $k_A'\Theta/(4J_{\min}^2)$, whose coefficient is $O(w)$. A full second-order statement can nevertheless be justified on this repeating class using the accepted separation floor $r\ge c_-/(4w^2)$:

$$
\oint\frac{dt}{Jr^2}\le\frac{4w^2}{c_-}\mathcal N,
\qquad |\Lambda_1|\le\left(k_1+\frac{k_A'w^2}{c_-}\right)\mathcal N.
$$

Since $k_A'=O(w)$ and $c_-\to2$, this is $O(w^3)\mathcal N$ as $w\to0$ in this explicitly scoped solution class. The same substitution bounds the isotropic integral by $(k_A/4+k_A'w^2/c_-)\mathcal N=O(w^2)\mathcal N$. It need not improve the fixed-speed numeric predicate; both the original inverse-J bound and this alternative are valid. The additional floor argument, or a narrower statement about the principal term, is necessary to explain the full order claim.

## Independent arithmetic

Before targets, the reference passes exact zero-speed coefficient limits, an even quartic weight-algebra control and rational factor checks. It then uses exact fractions and a separately proved square-root enclosure $.99498743710^2<.99<.99498743711^2$. All tested constant/rounding directions in W.2–W.6 pass. At the new constant-separation bounds the sufficient-test upper left side is $9743812828113/12104000000000=.8050076692\ldots$, while the lower right side is $9111230930671/9156676000000=.9950369468\ldots$. Hence $.8051<.9950$ safely proves the claimed contradiction. The displayed envelope is exactly $.015015+.008155\rho_r$, equal to $1.00177$ at 121; it defeats this conservative test there, not a solution class. The exact coefficient defining the displayed $.01028$ bound is confirmed using unrounded rational inputs.

The first reference version passes its known cases but does not finish its targets: its coarse square-root lower bound is insufficient to confirm the tighter g/z0 caps, and multiplying already rounded component caps is insufficient for the $.01028$ cap. Those failures are retained with the first source. Tightening the proved square-root bracket and testing the unrounded scalar expression repairs the reference without changing the peer subject or a theorem. The second run again passes controls first and exits zero. Both source versions and the execution failure/pass receipts are retained; this does not establish primitive lattice bounds, causal-root census or actual motion.

## Formal comparison boundary

Parity and integration by parts support the two integrals in Section 6 for the explicitly prescribed ellipse and fixed common velocity: $\oint\cos2f\,dx=0$ and the second Fourier coefficient gives $\oint\sin2f\,dx=-2\pi J\lambda^2/\sqrt{1-e^2}$. The scalar auxiliary balance can therefore be made to hold by choosing J. This shows that the tested scalar comparison is not algebraically contradictory.

However the constant $\mathbf P$ used there does not solve Proposition H's leading common-motion evolution: the leading row sum has generally nonzero components $P_\parallel/r^2$ and $-P_\perp/r^2$. The comparison also freezes the relative orbit and J rather than enforcing their coupled evolution. Statements about the relative sizes of the resulting dropped terms have no proved error bound. Satisfaction of that scalar balance cannot prove impossibility of another estimate from the delayed equations or establish that every proof requires a second recurrence identity. Such an identity is a reasonable inferred candidate route. The model stays a prescribed comparison with no solution or no-go authority.

## Actionable corrections

1. **SB1 — Restore the full sign margins.** Carry $\eta_\Lambda'$ into Result item 5. Throughout the lead, W.7 interpretation, Section 5 and proposed propagation distinguish $H>0$ for $\tilde B>0$ from $H>E_I$ for the stated negative-$B_S$ conclusion; qualify near-equality/near-full-gain language with small relative error/loss fractions. The two displayed inequalities themselves are supported and need no change.
2. **SB2 — Scope the auxiliary obstruction and candidate next identity.** Keep the explicit ellipse integral as a comparison, but withdraw “cannot follow from the J balance and leading-order dynamics alone” as a proved restriction on the actual coupled problem. The model does not obey the leading common-motion equation or evolving J/orbit, and its dropped-error orders are unproved. Call a second recurrence identity a candidate, not a necessary prerequisite; apply this to the title/lead/result/Section 6/remaining target/proposed propagation and the shared checkpoint's current account. No new model run is needed.
3. **SB3 — Explain the curvature boundary in the speed-order claim.** Either restrict the second-order wording to the principal/straight-row terms, leaving the explicit curvature allowance, or include the separation-floor conversion above to justify the full integral order on the repeating solution class. Do not describe the whole W.3 remainder as merely third order while displaying the unqualified inverse-J curvature term. Keep fixed-speed bounds and the original reference unchanged; no extra numeric run is required.
4. **SB4 — Describe coefficient/cutoff improvement precisely.** The new predicate has smaller leading/variation coefficients and a worse inverse-J allowance; “halved” is approximate, not literal equivalence or uniform dominance. The envelope only proves the displayed test cannot hold at $\rho_r\ge121$; it does not prove the test holds or tolerates every travel below that value. State the exact envelope and keep both predicates available. Replace “1.0018” with exact 1.00177 if claiming an exact evaluation. This is a test property, not an actual radial-travel theorem.
5. **SB5 — Complete operator-policy reading before revision.** The checkpoint explicitly says the operator explanation standard was not read this session. Read its full live text and its imported exposition authority before correcting; retain the honest chronology and reused source-reading boundary. No falsely backdated pre-read claim, scientific rerun or tracker edit is requested.

Correct only the released subject (and its own README if created); preserve all frozen sources, references and first-reviewed bytes. Return one consolidated corrected-byte/coverage receipt, then stop. Task 2 remains gated until independent corrected-byte verification and recorded disposition. General signed anisotropic breathing, radial travel, residual X, low-J and non-mirror periodicity remain open; this reviewed restricted-class progress can close the selected first stage after corrections.

## Final corrected-byte disposition — October 14

**Accepted at bounded derived scope, recorded 2026-10-14T10:42:09.343Z.** Full corrected-document reading resolves SB1–SB5. The two sign margins are separated and the full error allowance restored; the floor conversion independently derived in this review now justifies the full speed-order statement on the repeating solution class. The prescribed ellipse remains an auxiliary scalar comparison, with no impossibility or necessary-prerequisite inference about the coupled law. The coefficient and cutoff claims are scoped to their sufficient tests, and completed policy reading is reported with honest after-derivation timing.

Corrected subject: 33,427 bytes, SHA-256 `de707792ff1227bca000e1fd7ea9f825101d88fc9e656b960cc9ae0dab3c467f`. Known-first SHA/link/KaTeX checks render all 481 subject spans with no error, verify local file targets and match the ten frozen binary dependency identities, six launch identities and independent reference. Exact first/corrected subjects and the first review remain retained separately. The original numeric reference and its failure/pass outputs are unchanged; no scientific rerun or history evaluation occurs. The added floor conversion is a separately reconstructed analytic bound, not a new numerical experiment. The peer reports stopped/compute clear; wider census remains unknown.

Accepted: exact isotropic relation between the breathing integrals, controlled common-motion integral, full-error sufficient exclusion with smaller leading/variation coefficients, constant-separation exclusion through normalized separation `2e7` at whole-past speed bound .1, and the explicitly conditional anisotropic/signed-breathing requirements. General solution-derived radial travel, X, signed anisotropic breathing, low-J and general periodicity remain open. The auxiliary comparison is retained at inferred comparison grade. This completes task 1 of the selected six-hour round at bounded scope and permits the selected same-family lattice task only after its explicit shared release. No low-angular-momentum or extra binary work is released by this disposition.
