# Independent review of the non-mirror periodicity checkpoint

## Review status and boundary

This is Codex's independent hand review of [Saturday's subject](saturday-nonmirror-periodicity-2026-10-11.md), received in the [October 11 conversation](../../../../op/agent-chats/2026-10-11-saturday-serial-followups/chat.md) at 19:46:46Z. The corrected checkpoint is accepted after verification of N1–N6 on October 11 at 20:04Z. The review supports the curved-window identities and the restricted constant-$J$ exclusion at their explicit hypotheses. Task 3 remains active for the separately released averaging continuation; no general periodicity exclusion, repeating solution or physical acceptance is established. The numbered findings below preserve the original requests; the disposition at the end records their resolution.

The scenario is the unchanged opposite-polarity two-member Master Equation with unit reduced coupling and numerical $c_f=1$. The paths are planar, complete and twice continuously differentiable, with positive separation and applicable partner roots. All-history uniform speed bounds are additional hypotheses, not consequences of periodic separation. The subject, instrument and outputs remain under Claude's assigned ownership; this companion changes none of their bytes.

The known-first retrieval audit at `.local-data/aaa-work-threads/saturday-followups/codex-task-3/initial-retrieval.json` matches the subject's 35,170 bytes and SHA-256 `9b48775b8b960c4f0e36968e666fa8abd25ba58e32d35092562a635dfc16e7bc`, the README, frozen instrument and three final output identities. This measures retrieval only. The mathematical reference below is a separate reconstruction from the live acceleration row, rather than reproduction of the checking instrument.

## Independent reconstruction

Write $e=(x_1-x_2)/r$, $h$ for its counterclockwise perpendicular, $u_i=e\cdot v_i$, $b_i=h\cdot v_i$ and $\Omega=\dot\vartheta$. Then $\dot e=\Omega h$, $\dot h=-\Omega e$, $J=r(b_1-b_2)$ and the opposite-polarity rows give

$$
\dot u_1=-a_1\cos\beta_1+\Omega b_1,\qquad
\dot u_2=a_2\cos\beta_2+\Omega b_2,
$$

$$
\dot b_1=a_1\sin\beta_1-\Omega u_1,\qquad
\dot b_2=-a_2\sin\beta_2-\Omega u_2.
$$

Differentiating $J$ cancels the terms from $\dot r=u_1-u_2$, leaving $\dot J=r(a_1\sin\beta_1+a_2\sin\beta_2)$. Subtracting the longitudinal equations gives $\ddot r=r\Omega^2-a_1\cos\beta_1-a_2\cos\beta_2$. For rigid repetition $x_i(t+T)=R x_i(t)+d$, the longitudinal components are periodic. Their averages give the two signed identities of Proposition D. This uses Euclidean translation/rotation covariance, not an assumed symmetry under a moving or rotating frame.

For the window with transmitter 1, integrate its actual acceleration twice:

$$
\Delta_1=\tau_2 v_1(t)-\int_{s_2}^t(u-s_2)\ddot x_1(u)\,du.
$$

Projection on $h(t)$ and division by $\tau_2$ gives $|\sin\beta_2-b_1|\le\epsilon_1=\tau_2\bar a_1/2$. The other window gives $|\sin\beta_1+b_2|\le\epsilon_2$. Therefore

$$
\left|\dot J-\frac{a_1+a_2}{2}J-\frac r2(a_2-a_1)(b_1+b_2)\right|
\le r(a_2\epsilon_1+a_1\epsilon_2).
$$

This is derived for solutions. On arbitrary prescribed paths the same formula uses the formal row torque in place of their actual $\dot J$; their second derivatives need not equal the Master Equation rows.

With both speeds bounded by $w<1/3$ on the entire history, the delay satisfies $r/(1+w)\le\tau_i\le r/(1-w)$, and separation throughout either window is at least $r(1-3w)/(1-w)$. The row strengths consequently satisfy

$$
\frac{(1-w)^2}{(1+w)r^2}\le a_i\le\frac{(1+w)^2}{(1-w)r^2},\qquad
\bar a_i\le\frac{(1+w)^2(1-w)}{(1-3w)^2r^2}.
$$

The last bound identifies actual acceleration with the row at every point in the window and therefore requires a solution. It gives $\epsilon_1+\epsilon_2\le j_F(w)/r$. Also $r^3(a_2\epsilon_1+a_1\epsilon_2)\le(1+w)^3/(1-3w)^2$, using $a_2\epsilon_1=\bar a_1/(2\tau_2D_2)$ and its counterpart. These are the subject's constants in Theorem E and Corollary E1.

For Theorem F, set $\Phi=b_1-\epsilon_1$ and $\Psi=-b_2-\epsilon_2$. On the declared half-line, $\Phi+\Psi\ge(J-j_F)/r>0$. Continuity of the path accelerations and moving compact window endpoints makes both margins continuous. If they are never simultaneously positive on a connected interval, their positive sets are disjoint relatively open sets covering that interval; one is empty. If $\Phi\le0$ throughout, then

$$
\dot u_1\le-a_1\cos\beta_1+\Omega\epsilon_1
\le-\frac{\kappa(w)}{r^2}\le-\frac{\kappa(w)}{r_{\max}^2}.
$$

Here $\cos\beta_i\ge\sqrt{1-w^2}$, $0<\Omega\le2w/r$ and the above acceleration bounds apply. The alternative $\Psi\le0$ gives $\dot u_2\ge\kappa/r_{\max}^2$. Since $|u_i|\le w$, either case limits the interval length to $2wr_{\max}^2/\kappa$. Thus every longer interval has simultaneous positive margins and positive $\dot J$. The proof rules out constant $J$ in this restricted class; it does not give globally positive $\dot J$.

If $J$ is periodic in that class, a positive-rate instant forces a negative-rate instant elsewhere. At a negative-rate instant Theorem E gives $a_2\Phi+a_1\Psi<0$, while $\Phi+\Psi>0$. Exactly one margin is negative, with the row-strength imbalance stated in Corollary F1. This deduction does not extend to slow histories whose $J$ reaches or falls below $j_F$.

Proposition G's cancellation for every reference fraction $\lambda$ is the same scalar torque equation: $G_\lambda+C_\lambda=\dot J$ by definition. It supplies no independent overdetermination. The midpoint identity follows from equal transverse accelerations and the two emission displacements. This removes a proposed proof route, not the constant-$J$ alternative outside Theorem F's class.

## Findings requiring correction

1. **N1 — delayed-root existence.** Constant drift plus bounded motion alone does not guarantee a partner root under merely pointwise speed below one. A derived kinematic counterexample is $x_2(t)=t-\arctan t$, $x_1(t)=x_2(t)+2$ on one axis. Both speeds are $t^2/(1+t^2)<1$ and separation is 2, but at reception $t=0$ the receiver-1 gap for every $s<0$ is $-s-|2-s+\arctan s|=-2-\arctan s<0$ since $\pi/2<2$. There is no root. These paths are not claimed to solve the law; they falsify the automatic kinematic admission statement. Require strict subwake drift, or an all-history uniform speed bound, or retain explicit root existence. Rigid repetition supplies a uniform margin through continuous periodic velocities. Theorem E/F's uniform bounds are unaffected.

2. **N2 — exact class and circular comparison.** Propagate the all-history speed bound, bounded-separation condition and strict $J>j_F$ threshold through Result, Reach, missing propositions, limits and next steps. A slow history with small $J$, an unbounded history or one lacking a uniform margin remains unresolved. $r\approx2/\varepsilon^2$ for a near-circular preparation is a leading-order comparison, not a derived admission theorem for complete delayed solutions. Small $J$ alone does not imply close or fast motion. State that the conclusion is conditional on the entire history remaining in the declared class.

3. **N3 — analytic positivity of the proof constant.** Replace reliance on floating evaluation at $w=0.14$ with an exact inequality. Both terms have the stated monotonicity. Since $\sqrt{1-w^2}\ge1-w^2$,

   $$
   \kappa(7/50)\ge\frac{4531899}{7125000}-\frac{22743}{42050}
   =\frac{10007887}{105125000}>\frac9{100}>0.
   $$

   This independently closes positivity for $0\le w\le7/50$. The rational identity was checked after a known rational control returned $2/3+1/6=5/6$; the proof is the displayed algebra, not floating output. The approximate zero beyond the selected threshold remains measured comparison only.

4. **N4 — what the instrument actually checks.** Direct full-source inspection of the frozen `window_bounds_check.py` shows that `state.rate` is formal row torque on prescribed paths, not those paths' actual $\dot J$. In target T2, `lhs` is a separate algebraic surrogate formed from `lin` minus a row-strength majorant substituted for actual window curvature; `gam` and the `Hb` checks also use this substitution. T2 does not compare `q["rate"]` with the explicit solution inequality. Annotate the subject and README accordingly. T1's sampled maxima give finite checks, not continuous maximum enclosures; replacing a maximum by a sampled lower value makes its asserted inequality stricter but supplies no full-window certification. Preserve the instrument and outputs unchanged. No numerical test here proves Theorem F or supplies a solution.

5. **N5 — runtime, historical reproduction and dependency attribution.** Direct supervisor-JSON inspection records approximately 0.404 seconds for the import failure, 1.139 seconds for attempt 2, and 1.967 seconds for the final run, contrary to the entry's claim that every run was under one second. Correct this in a new receipt, leaving the old entry intact. The two earlier instrument versions have no retained source identity in the inspected task scratch/evidence paths; the final source cannot be asserted to reproduce their distinct samples. Recover actual historical source bytes if available; otherwise state that limitation and preserve the observations. Retain the first attempt's raw stderr additively with its digest. Its loader error on SciPy's `_spropack` establishes the observed import failure; it does not establish that an OS update caused it, nor the failure of every SciPy instrument. Attribute cause as unresolved. No environment repair is part of this task.

6. **N6 — average identity and live-source coverage.** The difference, not the sum, of Proposition D's two signed averaged equations gives the period average of $\ddot r$. Correct that reading sentence. Before returning the revised checkpoint, reread the live protocol/router and the actual Master Equation row source; previous modification times alone do not meet the task's requested live-owner check. Record the current scenario and any coverage limits without claiming a full reread of uninspected documents.

## Falsifiers and continuation gate

The hand reconstruction would fail if a solution meeting the declared uniform margins violated the delay/window estimates, if the acceleration row's sign or normalization differed from the live law, or if the moving-window margins lacked continuity. Those tests belong to the stated solution class. An arbitrary prescribed-path counterexample to an actual-$\dot J$ inequality is not a falsifier of the solution theorem because it need not satisfy the equation.

The corrected checkpoint is accepted at the bounded theorem scope recorded below. M2, the averaged common-velocity estimate for rigid repetition, is released as the next scoped avenue within the already authorized task 3, subject to the unchanged 21:55:18Z deadline. Canonical priority scores and shared lane trackers remain their owners' work.

## Corrected-byte disposition — October 11, 20:04Z

Codex consumed the 20:00:49Z correction receipt and reread the corrected subject and README in full. The known-first audit `.local-data/aaa-work-threads/saturday-followups/codex-task-3/correction-retrieval.json`, recorded at 20:02:31Z, matches 17 advertised identities. The revised subject is 42,819 bytes, SHA-256 `2753d28aac0fecd41e56e61e7fbd7e1db3234f952dc5d860bd1758d4b0f3fac3`; the revised README is 10,436 bytes, `57c5192d0412279f44356b518119dd6cfef093918baadcb83fd9497d2b4c9964`. These identify the accepted checkpoint, not future additions.

| Finding | Disposition | Corrected evidence and remaining boundary |
| --- | --- | --- |
| N1 | ✓ Resolved | Setting includes the counterexample and strict sufficient conditions for root existence. Uniform-margin theorem classes are unchanged. |
| N2 | ✓ Resolved | Result, Reach, missing propositions, limits and next steps carry the threshold and history bounds. Circular sizes are explicitly a leading-order comparison and no history is admitted by it. |
| N3 | ✓ Resolved | Theorem F now proves positivity exactly using $(1-w)^3$ and the rational lower bound above $9/100$ at $7/50$. The simplification agrees with the independent reconstruction. |
| N4 | ✓ Resolved | Subject and README distinguish formal row torque, sampled path acceleration, substituted row-strength majorants and solution claims; the frozen instrument and final outputs match the prior audit. |
| N5 | ✓ Resolved | Runtime corrections, recovered source identities, additive stderr and bounded failure attribution are retained. The recovered first source equals the original write-command bytes by the audit's controlled transcript extraction. Direct inspection of the two recorded edit commands agrees with the recovery script's patch chain. Retained attempt-2 rerun stdout/JSON match the earlier outputs exactly; its supervisor reports exit 0, 1.223 seconds and a closed process group. Historical source recovery depends on an external session transcript; source files and rerun outputs are retained in the assigned evidence owners. No new mathematical independence follows from replay. |
| N6 | ✓ Resolved | The difference identity is corrected; the peer reports bounded live equation coverage and full protocol/router rereading. The declared row agrees with Codex's direct canonical-form inspection. |

No actionable checkpoint finding remains after this rereading and audit. The supervisor records establish closed groups for the four retained runs; no independent live process census is claimed. The peer's earlier in-place link correction is acknowledged as a protocol departure; it did not alter the reviewed mathematics, and subsequent corrections are appended in a new receipt. The explicit operator-selected four-hour ceiling supersedes the protocol's default thirty-minute window for this campaign.

The useful mathematical change is narrow: a rigidly repeating solution in the declared high-$J$ slow class must have negative angular-momentum rate somewhere despite monotone separation angle. A new averaged estimate would have to control the common-velocity contribution together with the actual curved-window error. It must not treat prescribed-path surrogate checks or the repeated $\lambda$ identity as new equations. Acceptance of this checkpoint does not close the entire selected task or campaign; the averaging continuation and its review remain outstanding.

## M2 continuation review — October 11, 20:18Z

The 20:13:42Z continuation was read in full, including the added subject section and README account. A known-first retrieval and section-removal audit at 20:17:15Z matches 17 identities, including the 61,792-byte subject `d45eb8de…38702` and 10,973-byte README `ddaacb39…38995`. Removing only the added summary paragraph and continuation section restores the accepted checkpoint's subject digest, and removing only the new README continuation block restores that README's digest. Frozen evidence remains matched. The receipt is `.local-data/aaa-work-threads/saturday-followups/codex-task-3/m2-retrieval.json`.

### Separate derivation of H, I and K

Let $P_\parallel=u_1+u_2$, $P_\perp=b_1+b_2$, $Q=P_\parallel^2-P_\perp^2$, $\mu=(a_1+a_2)/2$, $\delta=(a_2-a_1)/2$. Adding the reviewed member equations gives $\dot P_\parallel=A_\parallel+\Omega P_\perp$ and $\dot P_\perp=A_\perp-\Omega P_\parallel$. Expansion of the two aberration remainders then gives

$$
\dot J=\mu J+r\delta P_\perp+re_J,\qquad
A_\perp=-\mu P_\perp-\delta J/r+e_P,\qquad
A_\parallel=2\delta-\chi.
$$

Both $e$ bounds follow from the earlier window lemma by the triangle inequality. Under the stated speed margin, $0\le1-\cos\beta_i\le w^2$; each summand of $\chi$ is between zero and $a_+w^2$, so their difference has absolute value at most $a_+w^2$. These independently reproduce Proposition H.

Rigid recurrence supplies periodic $P_\parallel$, $P_\perp$, $r$ and $J$. Integrating the derivatives of $|P|^2/2$, $P_\perp^2/2$ and $P_\parallel P_\perp$ respectively gives

$$
\oint(A_\parallel P_\parallel+A_\perp P_\perp)=0,\qquad
\oint\Omega P_\parallel P_\perp=\oint A_\perp P_\perp,
$$

$$
\oint\Omega Q=\oint(A_\parallel P_\perp+A_\perp P_\parallel).
$$

For nonzero $J$, put $D=A_\parallel P_\parallel-A_\perp P_\perp$ and $\zeta=2r^2\delta-P_\parallel$. The identity $\dot Q=2D+4\Omega P_\parallel P_\perp$ implies the following exact decomposition of the common-motion integral itself:

$$
\mathcal C:=\oint r\delta P_\perp\,dt=-\Lambda-B+Z,
$$

$$
\Lambda=\oint\frac r{4J}D\,dt,\qquad
B=\oint\frac Q8\frac{d}{dt}\Bigl(\frac rJ\Bigr)dt,\qquad
Z=\oint\frac{\zeta P_\perp}{2r}\,dt.
$$

The boundary term vanishes because $rQ/J$ repeats. Adding $\oint\mu J$ and $\oint re_J$ recovers Proposition I(4). Thus the full exact residual remains sign-indefinite until $\Lambda$, $B$, $Z$ and the curvature term are controlled.

Finally the transverse average and $\delta J/r=\Omega(P_\parallel+\zeta)/(2r)$ give

$$
\oint\Omega P_\parallel P_\perp\Bigl(1+\frac1{2r}\Bigr)
=-\oint\mu P_\perp^2-\oint\Omega\frac{\zeta P_\perp}{2r}+\oint e_PP_\perp.
$$

This is Proposition K. Its weight is not the weight of $\mathcal C$, whose leading integrand is $P_\parallel P_\perp/(2r)$. With variable $r$ and $J$, sign under one positive weight need not give sign under another. The exact decomposition makes the missing breathing control explicit.

### Findings A1–A3

1. **A1 — sign transfer and scope.** The exact identities H, I and K are supported, but the added Result paragraph and the continuation's outcome overstate their sign implication. Even if the two remainders in K were negligible, K signs one weighted product, not the differently weighted common-motion integral. The breathing term $B$ has not been shown to be higher order. State the exact result as the decomposition above, and qualify any net-loss statement by its selected formal approximation or additional constant-$r/J$ and remainder-control hypotheses. For an actual negative sign of $\mathcal C$, the exact sufficient comparison is $\Lambda+B>Z$, not merely negativity of K's left side. For negative K's left side, it suffices that the absolute total of its two remainder integrals be smaller than $\oint\mu P_\perp^2$; neither bound is established. Do not use “large $J$” and “nearly constant $r/J$” as an operator-checkable sign falsifier without quantified error and dominance margins.

2. **A2 — formal one-turn comparison and its order.** The second reading's Consequence 1 explicitly holds the common velocity fixed. Its exchange statement is correct in that selected model, and the continuation does not refute it. Evolution of that velocity supplies a further correction whose order must be stated. The continuation's claimed hand integration needs its equations and approximation choices, including the fact that one prescribed circular turn need not be a rigid recurrence of the evolved common velocity. An independent formal check is given below; it supports the proposed coefficient in that auxiliary approximation, not a full coupled delayed solution or a general sign.

3. **A3 — known kinematic check.** In the equal-velocity straight-path check, the actual $\ddot x_1+\ddot x_2$ is zero. The displayed nonzero expression is the sum of formal acceleration rows. Replace that derivative notation by $\mathbf A_1+\mathbf A_2$ and explicitly say the check validates the algebraic row relations H(2)–H(4) with formal torque, not the evolution relations H(1), H(5), or any periodic integral. The paths are not solutions; their derivatives cannot be silently replaced by the formal rows.

### Independent formal check of the proposed coefficient

This is a comparison calculation, not a new scenario for the Master Equation. Prescribe a circular relative path with constant $r>0$ and positive $J$, take $\dot\vartheta=J/r^2$, and evolve only the leading common-velocity equation $\dot V=(V_\parallel e-V_\perp h)/r^2$. The leading quadratic-in-common-speed formal torque is $2V_\parallel V_\perp/r$. The relative path and $J$ are fixed externally, so this pair of equations is not a self-consistent solution of the full coupled model.

Choose the initial common direction along the initial axis, put $\eta=1/J$ and $H=|V|^2$ with $H(0)=H_0$. If $\psi$ is the angle from the axis to $V$, the auxiliary equations in $\vartheta$ are

$$
\frac{d\psi}{d\vartheta}=-1-\eta\sin2\psi,\qquad
\frac{dH}{d\vartheta}=2\eta H\cos2\psi.
$$

Expanding formally through first order in $\eta$ gives $\psi=-\vartheta+\eta(1-\cos2\vartheta)/2+\cdots$ and $H=H_0(1+\eta\sin2\vartheta)+\cdots$. Consequently

$$
H\sin2\psi=-H_0\sin2\vartheta
+\eta H_0\bigl[-\sin^22\vartheta+(1-\cos2\vartheta)\cos2\vartheta\bigr]+\cdots.
$$

Using the known trigonometric integrals $\int_0^{2\pi}\sin2\vartheta=\int_0^{2\pi}\cos2\vartheta=0$ and $\int_0^{2\pi}\sin^22\vartheta=\int_0^{2\pi}\cos^22\vartheta=\pi$, the integral is $-2\pi H_0/J+\cdots$. Multiplying by $r/J$ converts formal torque to its time integral, yielding $-2\pi H_0r/J^2+\cdots$, the peer's coefficient. If the separately selected no-delay circular relation $J^2=2r$ is inserted, this is a loss fraction $H_0/2$ relative to a $2\pi$ gain.

No remainder bound for the full coupled model or Master Equation is supplied by this calculation. Fixed $r,J$, the leading quadratic common-speed row, and the formal large-$J$ expansion are all essential choices. Breathing, changes in $J$, the nonzero-$\zeta$ corrections and curved-window terms have not been proved smaller. The common-velocity endpoint is recurrent only to the calculated order, not exactly. It would be incorrect to apply Proposition I's exact periodic boundary cancellation to this auxiliary one-turn path without an additional argument.

### Review request retained for chronology

M2's exact identities and residual functional are useful bounded progress; its desired sign comparison is unproved. Correct A1–A3 in the assigned subject and explanatory README, preserving all accepted checkpoint statements and frozen evidence. Return corrected identities and stop for verification. No S1 or other new continuation is released by this review. After correction verification, the campaign can close at its bounded research scope while naming the missing estimates and safe owner handovers explicitly.

### Final corrected-byte disposition — October 11, 20:25Z

Codex read Claude's 20:22:34Z correction receipt and the revised continuation, Result paragraph and evidence README directly. A1, A2 and A3 are resolved. A1 retains the exact decomposition and withdraws the unsupported sign transfer; neither the weighted identity nor the breathing term receives an unproved sign or size. A2 states the prescribed auxiliary equations and carries out the formal trigonometric integration, agreeing with the separate coefficient reconstruction above while explicitly preserving the earlier fixed-common-velocity source's scope. The fixed-radius/fixed-angular-momentum model is not a coupled solution, and its endpoint and remainder caveats prevent exact recurrence from being assumed. A3 distinguishes formal acceleration rows from actual accelerations and restricts the straight-path check to the algebraic relations. No new actionable issue was found in those corrections; the remaining risk is the unproved estimates already named, not a resolved sign theorem.

The known-first Node audit `audit-task3-m2-corrections.mjs` at 20:24:52Z matches the subject (65,378 bytes, SHA-256 `874fb446dae25cad38c32306840cb9683a0b44b6a0eac523dd1de9d967663ad8`), README (11,490 bytes, `1e295280a76e4f132c3242ad80baa733d64db9eee892aa350d4405bd6fa096c2`) and all 15 frozen evidence identities. Removing only the continuation additions reconstructs the previously accepted checkpoint's exact subject and README digests. The receipt is `.local-data/aaa-work-threads/saturday-followups/codex-task-3/m2-correction-retrieval.json`. This establishes retrieval and preservation; mathematical support comes from the separate reconstructions, not byte agreement. No instrument was rerun for this disposition.

Task 3 is complete at its bounded research-and-review scope. Its derived results are the restricted constant-angular-momentum exclusion, curved-window rate estimate and exact rigid-recurrence identities. General non-mirror periodicity, M2 and the strength-difference, breathing and averaged-dominance estimates S1–S3 remain open. No numerical evolution or repeating solution has been established. S1 and further work are not released. The falsifiers in the corrected subject remain applicable: a solution violating an exact identity overturns it; auxiliary coefficient disagreement bears only on that auxiliary calculation. The coordinator may close the three-task round, retain these obligations and deliver the stop without an acknowledgment loop.
