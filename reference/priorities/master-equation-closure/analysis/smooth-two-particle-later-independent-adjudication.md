# Independent adjudication of the later environmental returns

## Verdict and scope

**Accepted as a derived continuation through $T=2\ell$ for the fixed prescribed history, infinite alternating lattice, unchanged eight-source block sum, $g=16$ and $c_f=1$.** Independent reconstruction of the [frozen continuation subject](smooth-two-particle-later-continuation.md) verifies the integrated old-pulse bound, strict continuation margins, causal-source cutoff, complete cross roots, exclusion of positive self roots, history-class bounds, and receiving census. The independently checked result extends existence and regularity; it does not certify new signed motion of the actual targets.

One sentence in the subject's census needs a narrow correction. The excluded family with first excitation distance $\sqrt2$ and return distance $2$ has the same anchor onset as the excluded family with excitation distance $2$ and return distance $\sqrt2$. Both onsets are $2+\sqrt2-11/8$. The subject identifies the latter as the nearest excluded family and says the other excluded combinations are later. There is a tie. The exclusion margin and every displayed count remain correct. This clarification is recorded here without changing the frozen subject.

| Claim | Adjudication |
| --- | --- |
| Actual classical continuation through $2\ell$ | Accepted for the fixed input and coupling |
| Known old-pulse-only source prefix suffices for every new received row | Accepted |
| Exactly one positive root per cross channel; no positive self root | Accepted on the complete joined histories |
| Original regular history class and uniqueness within the stated comparison class | Accepted |
| 76 generated source identities, 1,032 generated channels and 184 generated receivers | Accepted |
| 328 entered old channels, 206 environmental old receivers and 208 nonconstant histories | Accepted |
| 21 generated sources and 25 original-excitation paths per target | Accepted |
| General first- and second-amplitude row formulas | Accepted as coefficient equations, conditional on the inherited stationary jet cancellation |
| Background-only target error below $6\times10^{-8}$ in position and $1.2\times10^{-7}$ in velocity | Accepted conditional on the exact omitted-background target paths staying inside $9\times10^{-6}$ |
| Later turning points and neighbor gaps from the numerical instruments | Measured comparison results; no actual-solution error certificate |
| Eventual ring-down, a damping law or a typical populated-universe result | Not established |

The independent reference is the reconstruction below, supplemented by separately authored exact rational arithmetic and integer enumeration. The author's arithmetic and census implementation was neither read nor executed. The accepted [first-return adjudication](smooth-two-particle-next-feedback-independent-adjudication.md), [signed-error adjudication](smooth-two-particle-signed-error-independent-adjudication.md), and the stationary-field and onset results they consume remain dependencies; this review does not recertify their full proofs. The canonical acceleration weight was checked against the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md). No mass, force, friction or oscillator law enters this argument.

## 1. Why integrating the old pulse sharpens the bound

Use dimensionless time $t=T/\ell$ and dimensionless displacement $y_i=(X_i-\ell i)/\ell$. The two original targets occupy $0$ and $e_1$ in the simple cubic lattice, whose polarity is $\sigma_i=(-1)^{i_1+i_2+i_3}$. Their identical supplied displacement is $p(u)e_3$ at emission time $s=-11/8+u$, where

$$
p(u)=-(1-8u)u^4(1-4u)^4,
\qquad 0\le u\le1/4,
$$

and is zero elsewhere. All other supplied pasts are stationary. The source pulse therefore has a finite interval of activity, which must remain visible when bounding its accumulated acceleration contribution.

For $f=u(1-4u)$, direct differentiation gives $p=-(f^5)'/5$. Since $f(0)=f(1/4)=0$ and $f(1/8)=1/16$, integration of the two signed lobes gives

$$
\int_0^{1/4}|p|\,du=\frac1{2621440}=:I_p.
$$

The derivative zeros at $1/12$ and $1/6$ give opposite extrema of magnitude $A_p=1/314928$. The two lobes each move from zero to an extremum and back, so $\int|p'|=4A_p$. These equalities are exact and were independently checked symbolically after known controls passed.

For one old-pulse channel, write $R_0=k+y(t)$, $R=R_0-p(u)e_3$, $n=R/|R|$, $n_0=R_0/|R_0|$, and $K(R)=R/|R|^3$. Put $v_r=y'(t)$, $D_r=1-n\cdot v_r$ and $D_t=1-n_3p'$. Differentiation of the causal equation gives

$$
\frac{dt}{du}=\frac{D_t}{D_r}.
$$

The acceleration correction is $Q=K(R)/D_t-K(R_0)$. Hence

$$
Q\frac{dt}{du}
=\frac{K(R)-K(R_0)}{D_r}
+\frac{K(R_0)n_3p'}{D_r}.
$$

This is where the canonical transmitter denominator cancels. The receiver factor here comes from a change of integration variable; it does not modify the instantaneous Master Equation.

Let $\delta=|R_0|-|R|$ and $F=K(R_0)/D_r$. Differentiating the ranges gives

$$
n_3p'=\delta'-(n_0-n)\cdot v_r\,\frac{dt}{du}.
$$

Substitution and integration by parts reproduce the subject's impulse identity, including the final term with denominator $D_r^2$. At pulse entry $\delta=0$, and at a completed endpoint $\delta=0$ again. At an intermediate endpoint, $|\delta|\le|p|$. The remaining integrals are bounded by $I_p$ because every one contains this displacement factor. Charging $\max|p'|$ over the whole future interval would discard the cancellation that supplies the sharper result.

The lower range $7/5$ is valid along the entire subtraction segment: $\sqrt2-1/128-A_p>7/5$. Thus $|K|\le(5/7)^2$, $\|DK\|\le2(5/7)^3$, and $\|D(R/|R|)\|\le5/7$. Differentiation of $F$ gives precisely the subject's $D_F$ bound; the derivative of the receiver velocity contributes $A(1+\nu)/(1-v)$, while the change in source direction contributes $(5/7)[v(1+\nu)/(1-v)+\nu]v$. These terms verify the stated $E(v,A)$ and both the once- and twice-integrated bounds. In particular, the twice-integrated endpoint term uses $\int|p(u(t))|dt\le(1+\nu)I_p/(1-v)$; it does not retain a nonzero endpoint indefinitely.

## 2. Known source histories and the continuation margin

Let $\alpha=\sqrt2-11/8$ be the first environmental onset and $a_0=33/32$ the source cutoff. The previously accepted solution has displacement below $1/256$ through $21/16$. Its earliest possible generated reception is later than $\alpha+1-2/256>a_0$. Consequently every required source path through $a_0$ satisfies a receiver equation containing only the two original old-pulse corrections and the unchanged stationary field.

The elementary first-exit bounds on that accepted prefix first give displacement below $1/4096$ and speed below $1/4400$. The pointwise old-row estimate remains below $g/6400$, so acceleration below $1/400$ is available before applying the integrated estimate. Applying that estimate then gives the following independently reconstructed upper bounds:

| Quantity on $0\le t\le a_0$ | Independently reconstructed bound | Strict proof ceiling |
| --- | ---: | ---: |
| Source displacement | $<1.560158\times10^{-5}$ | $1/60000$ |
| Source speed | $<6.110794\times10^{-5}$ | $1/16000$ |

The displayed decimals are rounded upward from exact rational expressions retained in the review receipt. The two targets remain stationary throughout this prefix; the imposed past-pulse speed has its separate ceiling $1/8192$.

For the full continuation use

$$
Y(t)=b+K_0(t-1)_+^2,qquad
b=\frac1{30000},\quad K_0=\frac1{144},
\qquad |y_i'|\le\frac1{32}.
$$

Here $K_0$ is the coefficient of the displacement bound, distinguished from the vector kernel $K(R)$. Its endpoint is $Y(2)=157/22500<1/128=:B$. A known source has displacement at most $b_s=1/60000$. At the source cutoff, the causal residual satisfies $2-a_0<1-B-b_s$. Monotonicity in emission time then puts its unique root strictly below $a_0$, with

$$
s\le 1+B+b_s=\frac{241879}{240000}<a_0.
$$

This establishes the needed source functions before solving the new receiving equations. No unconstructed source future is substituted. Only environmental sources first excited at squared distances two through five can be sampled, because the shell-six onset is later than the upper bound on $s$.

For generated receiver-source anchor distances, $2-\alpha+B+b_s<2$. Therefore squared distances one, two and three are the only possibilities. Bounding their populations by $6,12,8$ and their ranges below by the subject's rational $d_j-B-b_s$ yields its $Q_j$ values. The correction is zero before $t=d_j$: its source onset is at least $\alpha$ and $\alpha-B>0$. That extra absence interval matters when integrating twice.

The reconstructed global acceleration bound is below $0.034572398<1/16$. This bound is obtained directly from the position and source-history bounds, so using $A=1/16$ in the old impulse estimate is not circular. The old twice-integrated contribution is below $0.000026760615<1/32000$.

For the stationary term, expand $Y^3$ and integrate each monomial against $t-s$. For $w=(t-1)_+$ this gives

$$
gC\int_0^t(t-s)Y(s)^3ds
=gC\left[\frac{b^3t^2}{2}+\frac{b^2K_0w^4}{4}
+\frac{bK_0^2w^6}{10}+\frac{K_0^3w^8}{56}\right].
$$

The coefficients $1/4,1/10,1/56$ follow from integrating $3b^2K_0w^2$, $3bK_0^2w^4$ and $K_0^3w^6$ twice. For each generated family, $(t-d_j)_+\le(2-d_j)w$ on $t\le2$. After adding all terms, the constant part lies strictly below $b$, and the coefficient of $w^2$ is below $0.006512308<1/144$. The separately integrated speed bound is below $0.016857399<1/32$. Exact rational checks verify all these strict comparisons.

A first exit from either bootstrap bound is therefore impossible. The finite receiving equations are ordinary locally Lipschitz equations on a slightly larger regular domain, because all delayed source functions are already known. Bounded positions and velocities permit continuation through $t=2$. The argument retains the complete infinite stationary block field, whose accepted local estimate is $|S_0(y)|\le1400|y|^3$; it does not replace the physical population by a finite set of ordinary charges.

## 3. Independent receiving census

Before counting a channel, its entry is separated from the horizon. A source with first old excitation distance $\sqrt m$ starts moving at $a_j=\sqrt m-11/8$ while still at its anchor. Reception of that first generated event at another receiver differs by at most $B$ from $a_j+\sqrt n$, where $n$ is their squared anchor separation. Independent squared rational enclosures for the square roots put every included event below $2-B$ and every excluded event above $2+B$.

The complete received generated census is:

| First excitation squared distance $m$ | Source labels | Admitted return squared distances $n$ | Channels |
| --- | ---: | --- | ---: |
| 2 | 24 | 1, 2, 3 | 624 |
| 3 | 8 | 1, 2 | 144 |
| 4 | 12 | 1 | 72 |
| 5 | 32 | 1 | 192 |
| Total | 76 |  | 1,032 |

The independent integer-set enumeration gives 184 distinct receivers. It defines each source by its first eligible exciting distance, rather than counting the same source twice when it receives both original pulses. As noted in the verdict, excluded $(m,n)=(2,4)$ and $(4,2)$ share the smallest excluded anchor time. Both lie safely after $2+B$.

The old pulse has entered shells with squared radii $2,3,4,5,6,8,9,10,11$. Their independently enumerated sizes are $12,8,6,24,24,12,30,24,24$, totaling 164 per center and 328 ordered channels. Shell twelve begins after $2+B$. The endpoints through shell nine occur before $2-B$, while shell-ten and shell-eleven endpoints occur after $2+B$. Thus 232 old channels have completed their pulse reception and 96 remain unfinished. The union of old environmental receivers contains 206 labels. Generated reception adds precisely the two targets, giving 208 affected histories.

Counting reception alone does not establish nonconstant motion. At any non-target receiver's first direct onset the leading displacement is order five when the exciting vector has a nonzero third component, and order six otherwise, with the nonzero coefficients supplied by the accepted onset calculation. Two distinct targets cannot give equal direct distances at an integer site, because equality would require its first coordinate to be $1/2$. Generated paths cannot precede the first direct onset by the triangle inequality; at a tied collinear onset their source motion begins at least one order too late to cancel the direct leading acceleration. Thus each of the 206 environmental histories is nonconstant somewhere in the interval. The two target histories were already proved nonconstant. This verifies the stronger count of 208 nonconstant histories without asserting that all move at every instant.

For either target, the source identities divide into four first-return sources, twelve sources in its own face-diagonal shell, one outward axial neighbor, and four further sources excited by the opposite target. There are 21 identities. Four members of the twelve-source group have received a second original excitation early enough for that additional history to return by $t=2$, so there are 25 original-pulse-to-source-to-target paths. The composed endpoint displacement bound is $B+2b_s+|p(u)|$, obtained by adding the two causal range inequalities. It verifies that the eight last composite pulse paths have unfinished pulse-end receptions at the horizon. The count therefore includes their active histories without extending their pulse polynomial past its support.

## 4. Roots, regularity and uniqueness

The full prescribed and evolved paths have speed below $1/32$ and displacement below $B$. For delay residual $f(\tau)=\tau-|i-j+y_i(t)-y_j(t-\tau)|$, the triangle inequality gives

$$
f(\tau_2)-f(\tau_1)\ge\frac{31}{32}(\tau_2-\tau_1),
\qquad \tau_2>\tau_1.
$$

This argument does not require differentiating a range at zero. A cross channel starts with negative residual and has positive residual sufficiently far in the past, so it has exactly one positive root. Its range is at least $1-2B=63/64$. The original half-width $1/256$ root tube remains positive, its transmitter factor is at least $31/32$, and the complement residual is at least $31/(32\cdot256)$. For a self channel, $f(0)=0$ and the same inequality excludes every positive root. The zero-delay diagonal is unevaluated.

There are at most two old and 26 generated corrections at a receiver. The inherited per-correction time-derivative bound below six applies because ranges exceed $7/8$, complete source acceleration stays below $3/8$, and source and receiver speeds are below $1/4$. Adding the stationary derivative gives jerk below $169g=2704$. The complete acceleration ceiling is still $3/8$, set by the looser supplied-past bound. In physical units these are $3/(8\ell)$ and $2704/\ell^2$, below the original class ceilings. Endpoint flatness preserves $C^3$ joins; the larger proof displacement bound $\ell/128$ still preserves the original separation and density requirements.

For another classical continuation with the identical complete supplied past, same summation prescription, displacement at most $B$ and speed at most $1/4$, every cross delay is at least $1-2B$. On intervals shorter than this delay, all source values come from the already common history, so locally Lipschitz receiver uniqueness applies. Induction gives equality through $t=2$. The receiving set stays finite because the disturbance begins at a finite past time, propagation has unit speed, and the underlying lattice has finite density. This is uniqueness within the stated regular comparison class, not a conclusion about arbitrary infinite perturbations or root folds.

## 5. Comparison equations and numerical fidelity

The [amplitude instrument](smooth-two-particle-later-instrument.md) evolves the first two coefficients in $y_i(t;\lambda)=\lambda a_i+\lambda^2b_i+R_i$, with the prescribed history multiplied by $\lambda$ and the physical input at $\lambda=1$. Reconstructing the causal equation gives first source-time shift $s_1=-n\cdot(a_i-a_j)$. Expanding the source velocity at that shifted time gives $\lambda a_j'+\lambda^2(b_j'+s_1a_j'')$. Expanding the range kernel and $[1-n(R)\cdot y_j']^{-1}$, then subtracting the stationary source at the same moving receiver, reproduces both displayed coefficients. The current receiver's $b_i$ cancels; its $a_i$ remains in the quadratic terms. This checks the mechanism behind the general row formula separately from the instrument's own high-precision control.

The stationary field's zeroth, first and second spatial jets vanish under the inherited summation prescription, so it contributes no term to these two coefficient equations. That exact cancellation justifies a finite changed-history coefficient sum. It supplies no bound on the third and higher coefficients at amplitude one. Fixed anchor delays in the coefficient equations are the result of expansion; they are not the moving roots of the finite-amplitude trajectory.

The [nonlinear comparison source](smooth-two-particle-later-nonlinear.py) instead integrates complete finite-amplitude changed rows at numerically solved moving roots. It first constructs 76 old-source histories through $33/32$, then samples those histories while integrating the two targets and four selected neighbors through $t=2$. Reading the source confirms that it subtracts each stationary source row at the same moving receiver and includes both original pulses where applicable. Its cancellation-stable formula for the difference of inverse powers is algebraically correct. It omits $gS_0(y)$ in both stages, so it is also a comparison equation. It is not output from the EOM solver.

Read-only inspection of the retained receipts in `.local-data/master-equation-closure/later-motion/` finds a successful known-control receipt before target execution, including a direct 70-digit implicit canonical old row and exact quintic-history control. The reported discrepancy for that old row is $3.37\times10^{-18}$ rounded upward. The refined nonlinear methods report sampled target-height agreement within $1.90\times10^{-15}$ and sampled target-velocity agreement within $7.38\times10^{-15}$. The independent coefficient instrument and nonlinear comparison agree within $1.11\times10^{-13}$ in sampled target position and $4.61\times10^{-13}$ in sampled target velocity. These are recorded numerical differences, not errors relative to the actual infinite-lattice solution. This adjudication inspected their method and receipts; it did not rerun the trajectory jobs or independently certify those sampled extrema.

The comparisons consistently contain three later changes of vertical direction and a smaller second peak-to-trough excursion. That supports the inference that the finite-interval motion turns repeatedly. It does not certify the finite-amplitude signs, prove that these are the only turns, or prove eventual damping. A selected discrete minimum is also not an enclosed continuous-time minimum. Tiny horizontal gap increments require substantially sharper error control than the vertical excursions.

### The remaining numerical proof obligation

For a comparison path $\widehat y$, define its full-equation residual as

$$
\mathcal E_i(t)=\widehat y_i''(t)-gS_0(\widehat y_i(t))
-g\sum_j\sigma_i\sigma_jQ_{ij}[\widehat y](t),
$$

where every $Q_{ij}$ uses its exact implicit causal root and the same complete comparison histories. Certifying the actual trajectory requires interval bounds for this residual, including interpolation, time integration, source-root error and floating-point evaluation. The source residual must first be propagated on $[0,33/32]$; that propagated source-history error must then enter every receiving correction through its own root and transmitter factor. The stationary term must be included at both stages. Finally, a Volterra error inequality on a sufficiently small comparison tube must enclose both positions and velocities through $t=2$.

The subject's receiver-derivative estimate is valid for that purpose: differentiating the source root gives $D_y s=-n^{\mathsf T}/D$; differentiating the range gives norm at most $(1-V_s)^{-1}$; differentiating the denominator gives $(V_s/r_*+A_s)/(1-V_s)$. Subtracting $DK(R_0)$ before bounding yields exactly the terms displayed in its equation (14). The broad existence ball proves regularity but is not a sharp numerical error tube. Neither method refinement, agreement of the two comparisons, nor a background-only bound replaces the required residual enclosure.

At $t=2$ there is no proved singular obstruction to further continuation. The present reduction stops at its chosen known-source cutoff. Crossing that artificial cutoff first requires extending the prefix; genuinely returned source emissions must be included once the sampled source times reach their own first generated receptions. Continued polynomial extrapolation alone would not perform that extension.

## 6. Conditional effect of the omitted stationary field

**The separate [background-comparison subject](smooth-two-particle-later-background-comparison.md) passes independent reconstruction at its stated conditional scope.** It compares two exact mathematical evolutions, one with the stationary field and one with that field omitted. Its hypothesis concerns the exact latter evolution:

$$
\sup_{0\le t\le2}|\widetilde y_i(t)|\le9\times10^{-6}
\quad\text{for both targets}.
$$

Under this hypothesis, the target position difference is below $6\times10^{-8}$ and its velocity difference is below $1.2\times10^{-7}$. The numerical trace staying inside the stated radius does not prove the hypothesis. These bounds are therefore accepted as a conditional mathematical comparison, not as certified numerical trajectory errors or a theorem that the actual targets have the later reported turns.

Removing the positive stationary majorants from the continuation proof preserves all its strict existence and old-source bounds for the exact comparison. On the source prefix, the two evolutions have identical exciting pasts. The receiver derivative estimate gives Lipschitz constant below $6.132446<7$. The only additional acceleration error is $q_s=22400/60000^3$. With zero initial error, the nonnegative integral comparison solves $z''=7z+q_s$. At $a_0=33/32$, independently enclosed positive series give

$$
|y_j-\widetilde y_j|<9.906794\times10^{-11}<1.1\times10^{-10}=:E_P,
$$

$$
|y_j'-\widetilde y_j'|<2.987451\times10^{-10}<3.1\times10^{-10}=:E_V.
$$

For a fixed receiver, the source roots differ by at most $E_P/(1-v_s)$. Adding the source motion over that time shift gives received position error at most $E_P/(1-v_s)$ and velocity error at most $E_V+A_sE_P/(1-v_s)$. The difference of the two unit range directions is bounded by the position error divided by the range floor. Substitution into $K(R)/D$ gives exactly the subject's coefficients $C_P(r)$ and $C_V(r)$. In particular, the acceleration factor $A_s$ is necessary because the two rows sample their source velocities at different times.

Inside the temporary actual target tube $10^{-5}$, the five unit-distance, twelve face-diagonal and four body-diagonal sources have safe range floors $99/100$, $7/5$ and $12/7$. Independent rational reconstruction gives receiver Lipschitz constant below $0.611373<1$ and total source-history plus direct-background error below $9.884041\times10^{-8}<10^{-7}$. The target difference starts from zero through $t=1$, so the unit-Lipschitz scalar comparison over the remaining time $w\le1$ gives

$$
|y_i-\widetilde y_i|\le10^{-7}(\cosh w-1)
<5.430807\times10^{-8},
$$

$$
|y_i'-\widetilde y_i'|\le10^{-7}\sinh w
<1.175202\times10^{-7}.
$$

The assumed exact-comparison radius plus the rounded position error is $9.06\times10^{-6}<10^{-5}$, excluding a first exit. This verifies the conditional estimate and its treatment of the earlier stationary-field effect on the source histories; bounding only the direct target stationary field would omit that contribution.

The independent series instrument uses exact fractions and sums through degree eighteen. For each positive series, successive term ratios decrease, so its first omitted term divided by one minus the next-ratio bound encloses the tail. Its known controls passed before the target run; eight exact strict comparisons then passed. No numerical trajectory was processed by this arithmetic check.

The [later-motion synthesis](smooth-two-particle-later-motion.md) was also read for claim grading. Its opening and numerical sections identify the turns as comparison measurements, and its background section expressly separates the exact-path hypothesis from sampled maxima. Those boundaries should accompany every shortened presentation of the result. In particular, statements about horizontal separation at the endpoint inherit the numerical comparison grade.

## Development evidence and falsifiers

The independent reviewer used the interval-analysis lens with writes confined to this adjudication and `.tmp/mec-008-later-continuation/moore/`. No reviewed subject, mathematical reference, numerical instrument or shared tracker was modified. The review instrument `check.py` first passed exact fraction arithmetic, the six axial neighbors, integer translation and norm, a known polynomial integral, and squared rational root brackets. Its `known.json` was written and inspected before `target` execution. Target mode requires that successful receipt to match the script's current hash.

The target run then passed 33 exact strict inequalities and the independent census, including the 76/1,032/184 source-channel-receiver counts, 328/206 old-channel-receiver counts, 208 affected labels, and 21/25 target source-path counts. `target.json` retains exact rational values, positive margins and measured hashes of the reviewed files. The checks ran under the shared project venv, Python 3.13.2. The instrument establishes arithmetic and finite set membership; the analytical reconstruction above establishes why those are the relevant checks. It is not a trajectory certifier.

The additional frozen background-comparison subject was checked without reading or running its contributor instrument. The independent `background_check.py` writes separate `background-known.json` and `background-target.json` receipts, the latter retaining the subject hash and every exact positive margin. The continuation subject remained unchanged during that additional review. Only the conditional background comparison was added to the accepted scope; the absence of a global numerical residual enclosure remains material.

At review completion, `shasum -a 256` on the continuation and background subjects matched their respective retained review receipts. The adjudication passed `git diff --no-index --check /dev/null` against this exact Markdown path; this checks whitespace, not the mathematics or numerical trajectories.

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-continuation/moore/check.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-continuation/moore/check.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-continuation/moore/background_check.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-continuation/moore/background_check.py target
```

An incorrect impulse term, failed strict bootstrap inequality, source root above the known cutoff, omitted generated receiver family, canceled leading direct onset, additional causal root, or violated original class ceiling would overturn the associated accepted claim. A coefficient mismatch against direct differentiation would overturn the coefficient formula. A failed refinement or independent comparison beyond its recorded numerical discrepancy would overturn that numerical evidence. A new actual-solution residual enclosure could strengthen the later signed-motion grade; an unbounded or insufficient enclosure would leave it unresolved. The earlier accepted finite-interval theorems and the obstruction to unforced preparation are unchanged by this review.
