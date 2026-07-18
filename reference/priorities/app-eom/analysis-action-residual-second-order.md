# Action-Residual Test for the Principal Circular Partner Branch

## Result

**Derived:** The pure scalar $1/r$ causal action does not pass the scale-only residual test on the principal sub-field-speed circular partner chart. The receiver-side interior residual is strictly nonzero. Including the transposed source-side contribution from the symmetrized ordered pair does not cancel it; the two contributions leave a nonzero radial Euler coefficient on each worldline.

**Derived:** The residuals of the two antipodal worldlines sum to zero as a total linear-momentum row, but that global cancellation is not the required variational cancellation. The two worldlines admit independent compactly supported variations, so each Euler coefficient must vanish separately.

**Inferred from the action ledger defined in the corpus:** The surviving coefficient must either be cancelled by an invariant action-level repair, such as an endpoint-clear characteristic-tail term, or be retained as a recoil-inclusive wake-history acceleration row with energy, momentum, and angular-momentum increments from the same action. The present calculation does not prove that recoil ledger closes.

**Derived status consequence:** The calculation does not derive the canonical scale-only acceleration law. On this chart, the acceleration-first second-order Master EOM therefore remains a postulate. A closed recoil-inclusive action would instead derive a different second-order equation containing the recoil row.

No numerical runs were used.

## 1. Certified chart and boundary convention

Use the symmetric, non-translating, opposite-polarity circular history
$$
\mathbf X_1(T)=R(\cos\omega T,\sin\omega T,0),
\qquad
\mathbf X_2(T)=-\mathbf X_1(T),
\qquad
\beta\equiv\frac{R\omega}{c_f}\in(0,1).
$$
For receiver $1$ at time $T$, write the unique partner emission time as
$$
T_{\mathrm{em}}=T-\Delta,
\qquad
\xi\equiv\frac{\omega\Delta}{2}\in\left(0,\frac{\pi}{2}\right).
$$
The derived branch certificate in `content/markdown/aaa/dynamics/binary-dynamics.md` and `content/markdown/aaa/dynamics/master-equation.md` gives
$$
\cos\xi=\frac{\xi}{\beta},
\qquad
r_p=2R\cos\xi>0,
\qquad
J_p=1+\beta\sin\xi>1,
\qquad
W_p^{\mathrm{rec}}=1.
$$
The root is unique because $h_\beta(\xi)=\cos\xi-\xi/\beta$ is strictly decreasing on $(0,\pi/2)$. The chart therefore has one retained partner row per receiver, no self-hit row, a positive collision floor, and a positive source-normal Jacobian floor.

**Claim grade: derived.**

**Falsifier:** A second positive-delay partner root for $0<\beta<1$, a zero of $J_p$, or loss of $r_p>0$ would invalidate this chart reduction. The displayed monotonicity and interval bounds exclude all three on the stated chart.

Choose an action interval larger than the tested window $W_0=[T_a,T_b]$, with more than one partner delay of clearance on both sides. Admit only compactly supported variations inside $W_0$. For a compactly supported mollifier, take $\eta$ small enough that its causal-support tube also stays inside that clearance. This makes the endpoint part $\mathbf C_{p,\mathrm{bdry}}^{(\eta)}$ vanish on $W_0$. A period-matched convention could be tested separately; it is not needed here.

**Claim grade: derived from the declared boundary convention.**

**Falsifier:** If the mollifier support or the transposed future reception reaches an action endpoint, an endpoint coefficient survives and this compact-interior calculation no longer applies.

## 2. Precise scale-only promotion condition

For each receiver $i$, define the signed constraint-residual acceleration numerator
$$
\mathbf R_{C,i}^{(\eta)}(T)
\equiv
\sum_j
\kappa\,\sigma_{ij}|q_iq_j|\,
\mathbf C_{ij}^{(\eta)}(T).
$$
The scale-only action derives the canonical branch law on $W_0$ only if
$$
\lim_{\eta\to0^+}
\int_{W_0}
\left\|\mathbf R_{C,i}^{(\eta)}(T)\right\|\,dT
=0
$$
for each independently varied worldline, with the active root, $r_p$ floor, $J_p$ floor, $W_p^{\mathrm{rec}}=1$, inactive-root convention, and compact-interior boundary convention held fixed through the limit.

For the present one-row chart, branch-sum cancellation at receiver $1$ would require
$$
\mathbf C_{12}^{(0)}(T)=\mathbf0.
$$
It is not enough that $\mathbf R_{C,1}^{(0)}+\mathbf R_{C,2}^{(0)}=\mathbf0$, because the first variation contains independent coefficients of $\delta\mathbf X_1$ and $\delta\mathbf X_2$.

**Claim grade: derived from the promotion condition and independence of compact interior variations.**

**Falsifier:** A valid reduction of the same action showing that the two worldline variations are constrained rather than independent would change this condition. No such constraint is part of the selected branch chart.

## 3. Receiver-side interior evaluation

Rotational invariance permits evaluation at $T=0$. Let
$$
c\equiv\cos\xi,
\qquad
s\equiv\sin\xi,
\qquad
\mathbf e_r=(1,0,0),
\qquad
\mathbf e_\theta=(0,1,0).
$$
For the incoming partner root,
$$
\widehat{\mathbf r}_{-}
=c\,\mathbf e_r-s\,\mathbf e_\theta,
\qquad
\mathbf n_{-}
=s\,\mathbf e_r+c\,\mathbf e_\theta,
$$
where $\mathbf n_{-}$ is the derivative of the chord direction under increasing source phase. At fixed receiver time, let $\alpha=\omega T_{\mathrm{em}}/2$ locally, so the retained root is at $\alpha=-\xi$. Then
$$
r(\alpha)=2R\cos\alpha,
\qquad
J(\alpha)=1-\beta\sin\alpha.
$$
Define
$$
a_p
\equiv
-\tan\xi+\frac{\beta\cos\xi}{J_p}.
$$
Direct differentiation gives
$$
\left.
\partial_{T_{\mathrm{em}}}
\left(
\frac{\widehat{\mathbf r}_{12}}
{r_{12}J_{12}}
\right)
\right|_{T_{\mathrm{em}}=T-\Delta}
=
\frac{\omega}{4R\cos\xi\,J_p}
\left(
\mathbf n_{-}+a_p\widehat{\mathbf r}_{-}
\right).
$$
The sharp receiver-side interior coefficient displayed by the integration-by-parts identity in `master-equation.md` is therefore
$$
\boldsymbol{\mathscr C}_{-,\mathrm{recv}}^{(0)}
\equiv
\frac{1}{c_fJ_p}
\left.
\partial_{T_{\mathrm{em}}}
\left(
\frac{\widehat{\mathbf r}_{12}}
{r_{12}J_{12}}
\right)
\right|_{T-\Delta}
=
\frac{\omega}{4c_fR\cos\xi\,J_p^2}
\left(
\mathbf n_{-}+a_p\widehat{\mathbf r}_{-}
\right).
$$
Because $\mathbf n_{-}\perp\widehat{\mathbf r}_{-}$,
$$
\left\|
\boldsymbol{\mathscr C}_{-,\mathrm{recv}}^{(0)}
\right\|
=
\frac{\omega}{4c_fR\cos\xi\,J_p^2}
\sqrt{1+a_p^2}
>0.
$$
The chord-normal component alone proves non-vanishing. No choice of radial scale coefficient can cancel a vector component produced by rotation of the line of action.

The regularized interior expression has the form
$$
\int dT_{\mathrm{em}}\,
\delta_\eta(\widetilde g_{12})
\partial_{T_{\mathrm{em}}}
\left[
\frac{\widehat{\mathbf r}_{12}}
{c_f r_{12}J_{12}}
\right].
$$
On this chart, the differentiated coefficient is smooth, $r_p$ and $J_p$ have positive floors, and the root is simple. The approximate-identity limit therefore converges to the displayed nonzero coefficient uniformly on compact interior subwindows.

**Claim grade: derived.**

**Falsifier:** The receiver-side verdict would be overturned by an algebraic error in the chord derivative or by an additional retained incoming row with the exact opposite coefficient. The explicit orthogonal component and the unique-root certificate exclude those two mechanisms on this chart.

## 4. Transposed source contribution does not cancel the residual

The scalar double-time action contains the symmetrized ordered pair. Varying $\mathbf X_1(T)$ therefore produces both:

1. the incoming receiver coefficient from partner emission at $T-\Delta$; and
2. the transposed source coefficient from the same event on worldline $1$ reaching receiver $2$ at $T+\Delta$.

At $T=0$, the future transposed chord and its phase derivative are
$$
\widehat{\mathbf r}_{+}
=-c\,\mathbf e_r-s\,\mathbf e_\theta,
\qquad
\mathbf n_{+}
=s\,\mathbf e_r-c\,\mathbf e_\theta.
$$
The corresponding derivative is
$$
\left.
\partial_{T_1}
\left(
\frac{\widehat{\mathbf r}_{21}}
{r_{21}J_{21}}
\right)
\right|_{T_1=\Delta}
=
\frac{\omega}{4R\cos\xi\,J_p}
\left(
\mathbf n_{+}-a_p\widehat{\mathbf r}_{+}
\right).
$$
The source-side integration by parts has the opposite derivative sign, while source-coordinate variation of the kernel has the opposite spatial sign. These two signs cancel. After the action's factor $1/2$ for the symmetrized ordered pair, the combined sharp interior coefficient is
$$
\boldsymbol{\mathscr C}_{1,p}^{(0)}
=
\frac{1}{2c_fJ_p}
\left[
\partial_{T_{\mathrm{em}}}
\left(
\frac{\widehat{\mathbf r}_{12}}
{r_{12}J_{12}}
\right)
+
\partial_{T_1}
\left(
\frac{\widehat{\mathbf r}_{21}}
{r_{21}J_{21}}
\right)
\right]
=
\frac{\omega\beta\cos\xi}
{4c_fR J_p^3}
\mathbf e_r.
$$
Here $\boldsymbol{\mathscr C}$ is normalized exactly as the interior
integration-by-parts coefficient displayed above, with the common
$\kappa\,\sigma_{ij}|q_iq_j|$ interaction factor outside it. Any universal
overall action normalization convention multiplies the whole row and cannot
change the zero-versus-nonzero verdict.

The simplification uses
$$
\sin\xi+a_p\cos\xi
=
\frac{\beta\cos^2\xi}{J_p}.
$$
Every factor in the final magnitude is positive for $0<\beta<1$. Thus the source pullback cancels the receiver residual's tangential component but leaves a strictly nonzero radial component.

With the common coupling restored, the residual numerator for receiver $1$ has the form
$$
\mathbf R_{C,1}^{(0)}
=
\kappa\,\sigma_{12}|q_1q_2|\,
\boldsymbol{\mathscr C}_{1,p}^{(0)}.
$$
For opposite polarities, $\sigma_{12}=-1$, so this coefficient points radially inward. Its magnitude is constant under rotation, and hence
$$
\int_{W_0}
\left\|\mathbf R_{C,1}^{(0)}(T)\right\|\,dT
=
|W_0|\,
\kappa|q_1q_2|
\frac{\omega\beta\cos\xi}
{4c_fR J_p^3}
>0.
$$
The mirror calculation gives
$$
\mathbf R_{C,2}^{(0)}=-\mathbf R_{C,1}^{(0)}.
$$
Consequently, the total pair momentum row cancels, but neither worldline Euler coefficient vanishes.

**Claim grade: derived for the displayed pure scalar action, the selected circular branch, and compact-interior boundary convention.**

**Falsifier:** A complete first variation of this same action would overturn the conclusion only if it exposed another interior term on the same one-root chart equal to $-\boldsymbol{\mathscr C}_{1,p}^{(0)}$. An endpoint term cannot do so under compactly supported interior variations. A new invariant counterterm can cancel it, but that is an action repair rather than a cancellation inside the pure scalar scaffold.

## 5. Verdict for the scale-only action

The alternatives on this chart are now separated.

| Alternative | Verdict | Claim grade |
| --- | --- | --- |
| Per-branch vanishing | Excluded: the receiver-side chord-normal component is strictly nonzero. | derived |
| Cancellation among incoming branches | Excluded: there is exactly one incoming partner root and no self-hit root. | derived |
| Cancellation by the transposed source contribution | Excluded for the pure scalar symmetrized action: a nonzero radial coefficient remains. | derived |
| Cancellation by an endpoint term | Excluded under the declared compact-interior variation convention. | derived |
| Cancellation by a characteristic-tail or richer invariant counterterm | Not evaluated here; this changes the action scaffold and must carry its own endpoint convention and Noether increments. | open derivation target |
| Recoil-inclusive retention | Required if no invariant counterterm is adopted, but conservation closure from the same action remains unproved on this chart. | inferred requirement, not a closed theorem |

The strict conclusion is
$$
\lim_{\eta\to0^+}
\int_{W_0}
\left\|\mathbf R_{C,i}^{(\eta)}(T)\right\|\,dT
\ne0
$$
for the pure scalar principal circular partner action under the stated chart and boundary convention.

**Claim grade: derived.**

This result falsifies the pure scalar action as a scale-only derivation on this chart. It does not falsify the Master EOM as a postulate, and it does not prove that every richer invariant action must fail.

**Claim grade: derived logical scope.**

## 6. Recoil-inclusive ledger required by the nonzero residual

If the residual is retained, define its mechanical bookkeeping row by
$$
\mathbf R_{C,i}^{(\eta)}(T)
=
\sum_j
\kappa\,\sigma_{ij}|q_iq_j|\,
\mathbf C_{ij}^{(\eta)}(T),
\qquad
\mathbf A_{i,\mathrm{recoil}}^{(\eta)}(T)
=
\frac{1}{\mu_{\mathrm{arch}}}
\mathbf R_{C,i}^{(\eta)}(T).
$$
Here $\mu_{\mathrm{arch}}$ is only the universal action/energy bookkeeping conversion. It is not an architrino mass and does not alter the acceleration-first substrate description.

The recoil-inclusive action equation is then
$$
\mu_{\mathrm{arch}}\mathbf A_i
=
\mathbf R_{\mathrm{scale},i}^{(\eta)}
+
\mathbf R_{C,i}^{(\eta)}.
$$
The same action and the same retained branch rows must supply wake-history increments satisfying, after inclusion of declared window-boundary fluxes,
$$
\frac{dE_{\mathrm{wake},C}^{(\eta)}}{dT}
=
-\sum_i
\mathbf V_i\cdot\mathbf R_{C,i}^{(\eta)},
$$
$$
\frac{d\mathbf P_{\mathrm{wake},C}^{(\eta)}}{dT}
=
-\sum_i\mathbf R_{C,i}^{(\eta)},
$$
$$
\frac{d\mathbf J_{\mathrm{wake},C}^{(\eta)}}{dT}
=
-\sum_i
\mathbf X_i\times\mathbf R_{C,i}^{(\eta)}.
$$
These equations state the required recoil ledger; they do not assert that the pure scalar action already supplies it.

On the exactly symmetric circular benchmark, the derived paired residual is radial, so
$$
\sum_i\mathbf V_i\cdot\mathbf R_{C,i}^{(0)}=0,
\qquad
\sum_i\mathbf R_{C,i}^{(0)}=\mathbf0,
\qquad
\sum_i\mathbf X_i\times\mathbf R_{C,i}^{(0)}=\mathbf0.
$$
These global zeros are symmetry degeneracies of this benchmark. They do not prove a same-action recoil ledger for deformations of the chart, and they do not remove the nonzero radial coefficient from either worldline equation.

**Claim grade:** the three required balance equations are **derived requirements** from same-action Noether closure; their satisfaction by an explicit wake-history functional is **open**. The three circular global projections are **derived** from the radial antipodal coefficient.

**Falsifier for recoil-inclusive viability:** If the same regularized action cannot construct wake-history increments whose derivatives supply the three negative residual projections on a branch-preserving deformation of this chart, the residual cannot be reclassified as legitimate recoil. It would instead be an unclosed change to the acceleration law.

## 7. Consequence for the second-order postulate

The quadratic kinetic scaffold produces a second derivative in its Euler equation, but the pure scalar interaction does not produce the canonical scale-only right-hand side on this chart. Therefore:

- the canonical acceleration-first second-order Master EOM is not derived by this action;
- it remains a postulate on the tested chart;
- a successful invariant counterterm could still derive the canonical scale-only law; and
- a successful recoil-inclusive wake ledger would derive a second-order law containing $\mathbf A_{\mathrm{recoil}}$, not the present scale-only law.

**Claim grade: derived logical consequence of the nonzero residual.**

**Falsifier:** An invariant action-level repair must show, on this same chart and boundary convention, that its interior Euler derivative is exactly $-\mathbf R_{C,i}^{(\eta)}$, that the accepted receiver-normal inverse-square row is unchanged, and that its energy, momentum, and angular-momentum boundary increments close. Such a result would replace the present postulate status with an action derivation on this chart.

## 8. Smallest next lemma

### Principal-circle recoil-pullback lemma

**Target statement:** On a branch-preserving neighborhood of the principal circular partner chart, with the same compact-interior or period-matched endpoint convention, the regularized pure scalar action's full ordered-pair first variation admits wake-history increments
$$
\left(
E_{\mathrm{wake},C}^{(\eta)},
\mathbf P_{\mathrm{wake},C}^{(\eta)},
\mathbf J_{\mathrm{wake},C}^{(\eta)}
\right)
$$
whose cut derivatives equal the three negative residual projections above, with errors tending to zero in $L^1(W_0)$ as $\eta\to0^+$ while $r_p$, $J_p$, $W_p^{\mathrm{rec}}$, and the inactive-root gap retain positive floors.

This is the smallest next lemma because the present calculation has already excluded vanishing and internal pair cancellation. What remains is exactly the question whether the nonzero coefficient is a legitimate recoil transfer carried by the same action, or an unclosed alteration of the canonical acceleration row.

The lemma must be tested on branch-preserving perturbations, not only on the exact antipodal circle, because the exact circle makes all three global recoil projections vanish by symmetry.

**Claim grade: derivation target.**

**Pass consequence:** The pure scalar scaffold would support a recoil-inclusive second-order action law on this branch neighborhood, while the canonical scale-only law would still require explicit cancellation of $\mathbf R_C$.

**Fail consequence:** The pure scalar scaffold would be unable to support either the canonical scale-only law or a conserved recoil-inclusive replacement on this branch class. The acceleration-first second-order Master EOM would remain an independent postulate pending a different invariant action.
