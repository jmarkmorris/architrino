# Independent review of numerical front alignment

## Verdict and scope

**Derived disposition:** the polynomial restriction and refactoring in the [frozen front-alignment proposal](overnight2-d-front-alignment.md) are correct in exact arithmetic. Its smooth-branch argument is also valid on a complete admitted strict-subunit-speed reference, provided the front monitor is centered at the zero-position of the same comparison source used in the trial. Restricting a trial approximation to that front and restarting continuously is a numerical reference construction; it supplies no physical reset or alternative continuation law.

**Required notation qualification:** for the joined reference, the monitor center is the declared comparison birth node, normally the encoded `X[0]`, and the negative rigid comparison path includes its constant translation to that node. If the symbol $\mathbf X_j(0)$ in the frozen note instead denotes the literal unshifted physical birth position, the claimed exact branch equivalence does not follow. The parent has confirmed the first interpretation. The physical preparation remains related to this comparison by the prior initialization and representation-error bounds. The frozen note was not edited by this review.

This is mathematical and protocol review only. No new implementation was inspected, no numerical controls or target were run, and no numerical residual-concentration result was independently assessed here. The parent reports that a new implementation has passed controls; those execution claims are outside this review's evidence. The exact tests below state the independent expected answers.

## 1. Why the negative extension is valid before the reference front

Let $\mathbf b_j$ be the declared comparison source position at source time zero. Let the comparison negative path be continuous there and let its specified rigid formula, including its joining translation, have an analytic extension $\mathbf E_j(s)$ beyond zero. Require that the extension retains a global speed bound $L<1$ over the source region needed by the trial. The original reference and this extension agree for $s\le0$.

At a receiver point $\mathbf Q_i(t)$, define the source-time causal gap and front monitor by

$$
g_j(t,s)=|\mathbf Q_i(t)-\mathbf E_j(s)|-(t-s),
\qquad
F_{ij}(t)=t-|\mathbf Q_i(t)-\mathbf b_j|.
$$

Then $g_j(t,0)=-F_{ij}(t)$. The strict source-speed bound makes the gap strictly increasing in $s$. Complete negative history and positive delay/range admission supply its unique root. Therefore

$$
F_{ij}(t)<0\ \Longrightarrow\ S_{ij}(t)<0,
\qquad
F_{ij}(t)=0\ \Longrightarrow\ S_{ij}(t)=0.
$$

On the negative-root domain the analytically extended source and the original comparison source have exactly the same position and velocity, so they yield exactly the same ordinary channel row. The extension cannot secretly add another root there when the strict monotonicity hypotheses hold. The proof concerns the same declared comparison path and its source-time domain; it does not identify the unknown exact physical trajectory's reception time.

If the whole trial receiver path is also strictly subunit speed, the reverse triangle inequality makes $F_{ij}$ strictly increasing. A pending channel can then cross its source-zero front at most once. The earliest zero among the complete pending channel list is the first possible branch change. Already crossed channels must continue using the original completed comparison source history, with all ordinary contributions retained and the normal method-of-steps coverage condition enforced.

The intended translation at the negative join is essential. Suppose the reference source birth is $\mathbf b_j=\mathbf X_j^{\mathrm{literal}}(0)+\mathbf d_j$. Replacing $\mathbf b_j$ in the monitor by the literal point changes its value by at most $|\mathbf d_j|$, but does not leave its zero exactly unchanged. A small shift is an error allowance, not exact equality. It must be accounted for when comparing the reference front to the physical front. The floating evaluator's computed joining shift additionally needs its own representation enclosure.

A numerical trial polynomial may depend on integration stages lying beyond its earliest front. Discarding that part does not prove that the retained polynomial equals a step generated entirely from the original nonsmooth right-hand side. This is acceptable for an arbitrary approximate reference, because its residual is recomputed using the original reference histories. The valid exact assertion is equality of the two channel formulas at retained negative source times, not zero residual or exact physical evolution of the retained trial polynomial.

## 2. Restriction and refactoring preserve the reference exactly in algebra

Let the original trial interval be $[a,a+h]$, with $h>0$, normalized coordinate $q=(t-a)/h$, and degree-at-most-seven position polynomial

$$
P(q)=\sum_{k=0}^7c_kq^k.
$$

For a cut $\theta\in(0,1]$, the retained width is $h_*=\theta h$ and $u=(t-a)/h_*$. The exact restriction is

$$
P_*(u)=P(\theta u)=\sum_{k=0}^7c_k\theta^k u^k.
$$

Its time derivatives satisfy

$$
\frac{dP_*}{dt}=\frac{\theta P_q'(\theta u)}{\theta h}=\frac{P_q'(\theta u)}h,
\qquad
\frac{d^2P_*}{dt^2}=\frac{P_q''(\theta u)}{h^2}.
$$

Thus restriction changes neither value nor physical-time derivative anywhere on the retained interval. Its endpoint data are the original left position/velocity and $P(\theta),P_q'(\theta)/h$ at the cut. The right velocity is the derivative of the position polynomial; it need not equal a separately evaluated Runge–Kutta velocity-state interpolant. Using the latter without a correction would spoil the claimed exact reference continuity.

The four new highest power coefficients are $c_k\theta^k$ for $k=4,5,6,7$. The [independently reviewed anchoring identities](overnight2-d-dense-anchoring-independent-review.md) determine a factored correction with precisely those coefficients. The endpoint Hermite term supplies the four retained endpoint constraints. The difference between this refactored polynomial and the exact restriction has degree at most three and zero value and first derivative at both endpoints, so it vanishes identically. This proves the refactoring assertion.

The next numerical cell must start with the same cut position and physical derivative to produce a $C^1$ positive-time reference. Its acceleration may have distinct left and right traces. A zero-width cut is excluded, and very close fronts must not be hidden by silently perturbing a physical event rule. In floating arithmetic, endpoint time, width, polynomial evaluation, and the new coefficient conversion all require consistency or outward error allowances. The algebra does not make those operations exact.

## 3. Required localization and restart controls

Before accepting a retained cell as lying on the intended branch, the implementation needs the following mathematical facts or an explicit quantified allowance where it approximates them:

1. **Complete pending inventory.** Every ordered partner channel belongs to exactly one pending/crossed state. Its monitor uses that channel's declared reference birth point. Whole-cell receiver-speed and monitor bounds exclude unobserved crossings; isolated point signs alone do not prove the census.
2. **Admitted source domain.** Negative analytic extension is used only as a trial device for pending channels. Crossed channels use complete original comparison history with compatible position derivatives. No unfinished positive source history is evaluated, and positive range and transmitter margins accompany every retained row.
3. **Earliest-front localization.** All pending front candidates in the trial must be considered before choosing the cut. Brackets, monotonicity, and uncertainty must distinguish a proved earliest event from overlapping or nearly coincident possibilities. Different encoded root values are not proof of different mathematical front times.
4. **Declared traces at restart.** The incoming cell uses the appropriate left acceleration trace and the outgoing construction uses the appropriate right trace for every crossed channel. A generic source evaluator that returns the negative trace at exactly $s=0$ cannot silently stand in for the outgoing right-hand side. Simultaneous channels must all contribute to the complete right trace.
5. **Continuous numerical state.** Restart from the retained position and its left physical derivative, rebuild any cached right-hand-side data after the branch change, and discard the trial endpoint and stages beyond the cut. Preserve the discarded calculation as numerical provenance if needed, not as retained source history.
6. **Original-history residual.** Every retained residual evaluation must use the original comparison histories and source-zero traces, without the analytic continuation used to generate the trial. A localization discrepancy requires an event-slab residual bound even if a nominal event lies exactly at the recorded node.

The one-sided row jump can be checked directly. At a positive front time $t_*$, let $\mathbf n$ be the shared unit normal, $\mathbf v_j^\pm$ the source velocity traces, and $D_t^\pm=1-\mathbf n\cdot\mathbf v_j^\pm>0$. Then

$$
\Delta\mathbf a_{ij}
=\frac{\sigma_{ij}\mathbf n}{t_*^2}
\frac{\mathbf n\cdot(\mathbf v_j^+-\mathbf v_j^-)}{D_t^+D_t^-}.
$$

The acceleration changes; the receiver velocity does not jump. A root-location error can leave a small retained interval evaluated on the wrong trial branch, but a residual computed with original histories exposes that discrepancy. Its integrated effect must be bounded with the possible forcing times and later propagation. Merely taking samples away from the recorded node can miss it.

A certified lower monitor slope $\kappa>0$ converts a monitor-value error bound $\delta$ into a time-displacement bound $\delta/\kappa$, provided the true zero is bracketed in that same admitted interval. Errors in receiver position, birth-point representation, and polynomial evaluation all contribute to $\delta$. The exact physical front has the additional unknown trajectory discrepancy; locating a reference front does not remove that admission obligation.

## 4. Independent exact controls

For $P(q)=q^5$, $h=1$, and $\theta=1/2$, restriction gives $P_*(u)=u^5/32$ on a physical interval of width $1/2$. The right position is $1/32$, and its physical derivative is $(5/32)/(1/2)=5/16$. More generally, $dP_*/dt=5u^4/16$ agrees with the old derivative $5q^4$ at $q=u/2$. This checks the physical-time scaling rather than only the coefficient power rule.

For a scalar acceleration jump at time $t_*$, with accelerations $a_-$ and $a_+$ and $\Delta a=a_+-a_-$, the exact continuous solution is

$$
v(t)=v_0+a_-t+\Delta a(t-t_*)_+,
$$

$$
x(t)=x_0+v_0t+\tfrac12a_-t^2+\tfrac12\Delta a(t-t_*)_+^2.
$$

Both position and velocity have matching traces at the split, while acceleration takes its assigned one-sided values. A procedure producing a velocity reset or reusing $a_-$ as the outgoing acceleration fails this control. The example tests the numerical join only; it does not introduce an event prescription for the architrino law.

For a stationary source at zero and a receiver approaching from distance $d>0$ at speed $0\le v<1$, $Q_i(t)=d-vt$ remains positive at the first front and its monitor is $F(t)=(1+v)t-d$. Thus the exact front is $t_*=d/(1+v)$ with positive slope $1+v$. This gives a direct localization and transversality control. Translating the declared source birth point changes this value in the expected geometric way, so the control can also detect a mismatch between a literal and a joined-reference birth center.

These controls were independently derived here; this review did not execute an implementation or reproduce the parent's reported control runs.

## 5. Interpretation, falsifiers, and validation

The analytic extension is a numerical integration device for an already prescribed source branch. It becomes an unauthorized physical modification only if its post-front continuation is retained or interpreted as the actual law without the original-history residual and error allowance, or if restart imposes a new velocity reset, root exclusion, or event rule. The reviewed protocol expressly disallows those actions. Within its conditions it constructs an approximate reference for the unchanged law.

The branch assertion is falsified by a complete uniquely admitted strict-subunit source/receiver pair with a negative monitor but a nonnegative source time, using the same birth center. The restriction assertion is falsified by a changed polynomial value or physical derivative on the retained interval. The continuous-join claim is falsified by unequal position or velocity traces. A claimed complete front census is falsified by an omitted pending crossing under its declared whole-cell bounds. A floating location error without its residual allowance invalidates an application rather than the exact polynomial theorem.

The subject SHA-256 measured before review was `9a484ab55698ccd601ae022dbf24a760a735333824c7bd88c6f0761d55d6c855`. Evidence consists of the causal-gap sign proof, exact restriction/refactoring identities, explicit acceleration-step solution, and straight-receiver front control above. The [previous dense-reference review](overnight2-d-dense-reference-independent-review.md) retains the separate complete-history, compatibility, and residual limitations.

Only this new review companion was authored. The parent owns implementation and the receiving [research account](overnight2-d-followup-and-research-2026-10-07.md). No frozen subject, earlier review, numerical target, running process, or shared owner was changed. Actual-history admission remains unresolved.

Final editorial receipt: repeat `shasum -a 256` returned the unchanged subject identity `9a484ab55698ccd601ae022dbf24a760a735333824c7bd88c6f0761d55d6c855`. File-scoped `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/braid-program/analysis/overnight2-d-front-alignment-independent-review.md` emitted no whitespace diagnostics (difference exit status 1). Explicit `test -f` checks passed for all four local link destinations; there are no fragment targets. No numerical target, executable control, or child agent was run by this review.
