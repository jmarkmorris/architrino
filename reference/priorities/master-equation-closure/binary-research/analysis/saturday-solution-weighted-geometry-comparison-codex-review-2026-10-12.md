# Independent review of the binary radial-period geometry estimate — October 12, 2026

## Initial disposition

The [subject](saturday-solution-weighted-geometry-comparison-2026-10-12.md), 21,511 bytes at `de49b7e8d6541087024a2d8104af6a344acd4a6b962975af0ed951f19ab79612`, gives a useful new reduction. The independently reconstructed radial period identity controls the angular average of $r/J^2$ through radial travel, and thereby removes its supremum from the sufficient exclusion. It also supports a closest-separation floor and the stated constant-separation exclusion at $w=1/10$. The general repeating-history question remains open: radial travel, $X=\sup r/J$ and the error allowance through $J_{\min}$ remain in the comparison. Four corrections below are required before corrected-byte acceptance.

This review belongs to the [two-hour round](../../../../op/agent-chats/2026-10-12-saturday-evolved-history-and-geometry/chat.md). It creates a separate reference and companion, edits no peer subject or accepted input, and licenses no low-J work or equation change. The setting retains complete planar opposite-polarity paths, unit reduced coupling, $c_f=1$, rigid recurrence, positive separation and $J$, whole-past speed bound $w<1/3$, one ordinary partner row per member and no own row.

## Independent derivation

**Radial identity and its boundary term, derived.** With $\mathbf r=\mathbf X_1-\mathbf X_2$, $\Omega=\dot\vartheta=J/r^2$ and inward relative radial acceleration $\mathcal A=\hat{\mathbf r}\cdot(\ddot{\mathbf X}_2-\ddot{\mathbf X}_1)$, differentiating the norm gives $\ddot r=J^2/r^3-\mathcal A$. Rigid recurrence makes $r$, $\dot r$ and $J$ periodic even though the individual Cartesian positions need not be periodic. Therefore the derivative of $r\dot r/J$ has zero period integral. Direct differentiation gives

$$
\oint\frac{r\mathcal A}{J}dt=\Theta+\oint\frac{\dot r^2}{J}dt-\oint\frac{r\dot r\dot J}{J^2}dt.
$$

On solutions the actual row components identify $\mathcal A=A_r=a_1\cos\beta_1+a_2\cos\beta_2$. This identification is the only dynamical substitution in G.1; the preceding identity is kinematic. No mass, force, conservation law or external virial theorem is used as a premise. The earlier inverse-square comparison is explicitly a comparison, not a solution of the selected delayed law.

**Average bound and separation floor, derived.** The accepted complete-history row bounds give $c_-/r^2\le A_r\le c_+/r^2$, $|\dot J|\le wc_+/r$ and $|\dot r|\le2w$. Put $N=\oint dt/(rJ)=\oint(r/J^2)d\vartheta$. The three terms in the preceding identity bound $c_-N$ above by $\Theta+2wR_1+wc_+R_2$, and bound $c_+N$ below by $\Theta-wc_+R_2$. The direction of both inequalities agrees with G.2. The lower estimate can be negative and then carries no positive size conclusion. These are angular-average estimates; they do not bound $\Xi$ pointwise.

At a minimum of periodic $r$, $\ddot r\ge0$ implies $J^2\ge c_-r$. Since $J\le2wr$, the minimum radius is at least $c_-/(4w^2)$ and the angular momentum there is at least $c_-/(2w)$. At a maximum, $\ddot r\le0$ instead gives $J^2\le c_+r$. Thus the minimum/maximum statements of G.3 follow, including for constant separation. The closest-approach lower bound does not become a global $J_{\min}$ lower bound for a breathing history.

**Variation, loss and exclusion, derived.** The accepted actual-row equation for $\dot J$ gives

$$
|\dot x|\le |\dot r|/J+c_1/(rJ)+c_2|P_\perp|/J^2+c_3/(rJ^2),\qquad x=r/J.
$$

Integrating before taking a geometric supremum gives $V\le R_1+(c_1+c_2P_{\perp\max}X+c_3/J_{\min})N$. This is a valid intermediate form of the previously accepted proof; $dt/(rJ)$ equals $N$ in both occurrences. Inserting it into C.3 gives G.4. The argument still takes $P_\perp^2$ out at its supremum and discards the positive $M_{\rm rel}$, so neither correlation is recovered by the new estimate.

In the exact balance $M_+-B_S=\Theta+M_{\rm rel}+R$, $|R|\le\eta\Theta$ implies

$$
-B_S\ge[1-\eta-L]\Theta,\qquad
L=\frac{4w^2\kappa_M}{c_-}\left[1+(2w+wc_+/J_{\min})\rho_r\right].
$$

This independently reconstructs G.5, with an essential condition on any sign interpretation: $1-\eta-L>0$. If it is not positive, the bound does not sign $B_S$. The exclusion G.6 follows by substituting the upper bound on $N$ and $R_1\le\rho_r\Theta$; it is sufficient, not necessary for absence of recurrence. For $\eta\ge1$ its strict predicate is empty.

**Constant separation, derived.** With $\dot r=0$ at every time, $\rho_r=0$ and the actual radial equation gives $J^2=r^3A_r\ge c_-r$. Consequently $J_{\min}\ge\sqrt{c_-r}$ and $X\le\sqrt{r/c_-}$ hold throughout, rather than only at closest approach. Combining this with the separation floor and $r\le10^6$ supplies the global bounds needed by the sufficient test. The proof does not assume mirror symmetry, constant J or fixed-centre circular motion. It excludes that specified subclass, not all breathing or all constant-separation histories at larger radius.

## Independent numeric audit

The separately authored [rational reference](../evidence/saturday-solution-weighted-geometry-codex-review-2026-10-12/geometry_constants_reference.py) imports no peer code and evaluates no history. Known cases precede targets: at the algebraic zero-speed limit the row constants are exactly $(c_-,c_+,c_1,c_2,c_3,\kappa_M,\kappa_S,e_1,e_2)=(2,2,1,0,1,1/2,1/4,1,0)$; a prescribed circular kinematic control with $r=2$, $J=2$ and $\mathcal A=1/2$ has both sides of G.1 equal to the integral of $1/2$, with derivative terms zero. These do not admit a solution of the delayed equation.

After those passes, exact fractions prove $.994987^2<.99<.994988^2$ and verify every weakening direction in the displayed constants, separation/closest-J bounds, sufficient coefficients and loss coefficient. The constant-separation comparison has an upper left side $23108622537/61000000000=.3788298776\ldots$ and lower right side $1205491/2679120=.4499578219\ldots$, hence the claimed $.379<.449$ bounds and strict contradiction hold. One short run through the shared venv exits zero; exact values remain in `.local-data/aaa-work-threads/saturday-evolved-history-2026-10-12/codex-binary-review/independent-arithmetic.json`. No peer instrument exists and nothing is rerun from the peer. This is independent arithmetic plus the separate hand derivation above, not a measured repeating solution or a general periodicity certificate.

## Actionable findings

1. **GVR1 — Finish the actual dependency reading and disclose chronology.** Complete the untruncated Proposition D statement/proof and B1–B5 derivations, including the positive-cosine/root assumptions and solution-only acceleration identification; read the exact controlling review passages, not only final dispositions. The release allowed verified earlier full reads, so unchanged full coverage may be reused with an explicit byte check and time; incomplete/truncated coverage must be completed now. Check the actual canonical row/history passages against the current unchanged source. Preserve the disclosed pre-reading derivation chronology, and state the newly completed coverage and any consequences before correcting. No new run is requested.
2. **GVR2 — The breathing-sign conclusion requires the full bracket.** Result item 4, Section 5's breathing bullet and proposed propagation imply negativity or nearly-full-gain cancellation from moderate/zero radial travel alone. G.5 supplies only $-B_S\ge(1-\eta-L)\Theta$. At zero travel the loss is indeed below .01845 of $\Theta$, but negativity requires $\eta<1-L$ and “nearly all” requires eta small as well. State the exact positive-bracket requirement throughout and restrict the reduced missing upper-bound target to a class where that bracket is positive. Likewise the lead's angular-average description is close to one half only under appropriate small-speed and small travel/error terms; the general bounds themselves remain the source of truth. No theorem inequality changes.
3. **GVR3 — Replace the approximate radial-travel cutoff with a scoped checkable statement.** The displayed sufficient test's lower envelope is exactly $.02777775+.01571555\rho_r$ after dropping nonnegative X/inverse-J terms. It is $.97071075$ at $\rho_r=60$, below one, and $1.00214185$ at 62, above one. Therefore “cannot hold once radial travel exceeds about sixty, whatever else holds” is imprecise; either remove the claimed cutoff or use the proved safe statement $\rho_r\ge62$ defeats this displayed conservative sufficient test. It is not a physical recurrence boundary or a bound on solutions. The separately labelled ellipse comparison supplies no delayed-law obstruction to a better correlated estimate.
4. **GVR4 — State the X coefficient's full speed dependence.** After $P_{\perp\max}\le2w$, the X term's prefactor is $8w^3\kappa_S(w)c_2(w)/c_-$, multiplied by the radial-travel factor, not a constant times $w^3$ with $c_2$ independent of speed. Since $c_2(w)=(3w+w^3)/(1-w^2)=O(w)$, it is $O(w^4)$ for fixed geometric inputs as $w\to0$. Keep the exact coefficient, qualify the asymptotic held-fixed quantities and correct the lead/limits/propagation's third-order wording. This improves the route's interpretation without altering the exclusion.

Correct only the released subject, preserving all earlier subjects, independent references and this companion. Return one consolidated corrected-byte receipt with coverage and stop. Low-J/J-zero work remains unreleased. A bounded radial-identity reduction and a valid explicitly restricted exclusion can close item 3 at its selected scope; universal periodicity is not required for that disposition, and unused wall time does not authorize another target.

## Final corrected-byte disposition — October 12, 22:07Z

**Accepted at bounded derived scope.** Full reading of the corrected subject resolves GVR1–GVR4. The actual row, root and dependency assumptions are now inspected without truncation and the after-derivation chronology remains explicit. Breathing signs and the reduced target require the full positive bracket $1-\eta-L$; the near-half average language carries its speed/travel conditions. The radial-travel cutoff is scoped to the displayed conservative test at 62, and the X term's fourth-order held-fixed dependence is explicit. No theorem, inequality or numeric constant changed. The initial “to be audited” label beside G.7 is superseded by the independent numeric audit and this disposition.

The corrected subject is 27,034 bytes at `a63c245333af3c6e0cb0ccb6758332b057d046a82edf8bd04c0ec1c2bbaeb008`. Known-first SHA/link/KaTeX checks match it, render all 343 math spans without error, find no missing local file target, match 54 frozen earlier scientific identities and verify the independently authored reference is unchanged. The first-reviewed subject remains retrieved by its exact hash in `.local-data/aaa-work-threads/saturday-evolved-history-2026-10-12/codex-binary-review/first-reviewed.md`; the peer needed no duplicate copy. `corrected-validation.json` records the final checks. No scientific rerun occurred; the peer reports stopped/compute clear, with wider census unknown.

Accepted: the exact radial period identity, angular-average comparison, closest-separation floor, necessary weighted comparison without the former supremum, conditional breathing lower bound and constant-separation exclusion at whole-past speed at most .1 through normalized separation $10^6$, within the complete planar unit-coupling ordinary class. Constant J, mirror symmetry and fixed-centre circular motion are not required by the last exclusion. No general repeating-pair impossibility, useful unconditional radial-travel/X bound, low-J result, history evolution or physical endpoint follows. This closes item 3 at its selected bounded scope. All three operator-selected round items can now close after scoped owner propagation and operational stop/scheduler closeout; no extra low-J initiative is released.
