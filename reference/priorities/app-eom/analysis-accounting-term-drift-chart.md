# Accounting-Term First Variation on the Uniform-Drift Chart

## Result in plain language

On the stated one-way test chart, the accounting term supplies exactly the
missing first-order row:

$$
\boxed{
\frac{R^2}{\kappa\sigma_{tr}|q_tq_r|}\mathbf A_C
=2p\mathbf N-\boldsymbol\beta+O(\beta^2).
}
$$

Therefore the P16 scale row and the same-action accounting row add to

$$
\boxed{
\frac{R^2}{\kappa\sigma_{tr}|q_tq_r|}
\left(\mathbf A_{\mathrm{scale}}+\mathbf A_C\right)
=\mathbf N+O(\beta^2).
}
$$

The observer-level present-position conspiracy is **restored exactly through
first order**: both the longitudinal magnitude error $-2p\mathbf N$ and the
transverse emission-ray tilt $+\boldsymbol\beta$ cancel.

This is not a full Darwin-order match. Continuing the same exact static-test
pullback one order farther gives

$$
\frac{R^2}{\kappa\sigma_{tr}|q_tq_r|}
\left(\mathbf A_{\mathrm{scale}}+\mathbf A_C\right)
=
\mathbf N\left(1+\frac12\beta^2-\frac32p^2\right)
+p\boldsymbol\beta+O(\beta^3).
$$

The radial second-order coefficients already equal the independent
uniform-motion benchmark, but the base retains a nonradial
$+p\boldsymbol\beta$ row. P19 must use this corrected direct-source base;
it must not treat the first-order restoration as a completed second-order
recovery.

For the reciprocal opposite-polarity circular pair, P4/P10's full
receiver-plus-transposed-source variation remains radial and points inward.
It is $O(\beta^2)$ relative to the scale row and does no work on the exact
circular velocity. The attractive scale row still has a forward tangential
$O(\beta)$ component. Hence the selected scale law plus $\mathbf A_C$ has an
**outward leading secular tendency**, not inward spiraling and not circular
closure, on that prescribed chart.

**Claim grade: derived** on the positive-source-normal, endpoint-clear P10/P13
chart, with P16's static normalization and the prompt's one-way test limit.
The observer-level comparison is an **observer-level recovery target**, not an
architrino-level premise. The circular direction statement is **derived for
the instantaneous row and power on the prescribed circular chart**; “outward
leading secular tendency” is **inferred from the positive leading tangential
power**, not a completed evolved-orbit theorem.

**Primary falsifiers:** Differentiate the displayed exact coefficient in
Section 2. A coefficient other than $2p$ on $\mathbf N$ or $-1$ on
$\boldsymbol\beta$ overturns the first-order verdict. A retained reverse
ordered pair in the virtual-observer chart would violate the declared
no-history/no-back-reaction scope and require a different calculation. On the
circle, a nonzero leading tangential component of the full P4/P10
$\mathbf A_C$, or nonpositive orbit-averaged scale-row power, overturns the
stated secular sign.

No numerical or solver runs were used.

## 1. Chart, normalization, and ordered-pair scope

Let the receiver event be $(T,\mathbf X_r(T))$, with
$\mathbf V_r(T)=\mathbf0$, and let the transmitter follow the eternal line

$$
\mathbf X_t(S)=\mathbf X_t(T)+\mathbf u(S-T),
\qquad
\boldsymbol\beta\equiv\frac{\mathbf u}{c_f},
\qquad
\beta<1.
$$

At the unique retained emission root $S=S_*$, define

$$
\mathbf r=\mathbf X_r(T)-\mathbf X_t(S_*),
\qquad
r=\|\mathbf r\|,
\qquad
\mathbf n=\frac{\mathbf r}{r},
$$

$$
a\equiv\mathbf n\cdot\boldsymbol\beta,
\qquad
J\equiv\frac{D_s}{c_f}=1-a>0.
$$

The same-time separation from the transmitter's present position is

$$
\mathbf R=\mathbf X_r(T)-\mathbf X_t(T),
\qquad
R=\|\mathbf R\|,
\qquad
\mathbf N=\frac{\mathbf R}{R},
\qquad
p=\mathbf N\cdot\boldsymbol\beta.
$$

The causal condition $T-S_*=r/c_f$ gives the exact bridge

$$
\boxed{\mathbf R=r(\mathbf n-\boldsymbol\beta).}
$$

The active ordered pair is transmitter $t\to r$ only. “Full ordered-pair
first variation” here means that every $r$, $\mathbf n$, and source-normal
$J$ contribution from varying P10's $K_C$ for that active pair is retained.
The source-coordinate coefficient belongs to the transmitter's recoil
equation. A separate reverse pair $r\to t$ would describe wake emitted by the
test receiver and received later by the transmitter; it is absent by the
prompt's no-history/no-back-reaction test limit. It must not be inserted into
the receiver row.

All acceleration rows below are normalized by the same static-source
calibration used in P16. Thus the common factor
$\kappa\sigma_{tr}|q_tq_r|$ is outside both the scale and accounting terms.

**Claim grade: definitions plus declared test-limit scope.**

**Falsifier:** If the intended chart contains a reciprocal receiver history,
then it has two active ordered pairs and is not the one-way virtual-observer
chart defined in the task. If $J\le0$, the positive-normal simple-root
collapse used below is invalid.

## 2. Full first variation of the residual kernel

Use P10's time-normalized constraint

$$
g(T,S)=T-S-\frac{r(T,S)}{c_f}.
$$

On the endpoint-clear characteristic split,

$$
D K_C^{(\eta)}
=-\frac{\delta_\eta'(g)}{c_fr},
\qquad
D=\partial_r-\frac{1}{c_f}\partial_g.
$$

Receiver-coordinate variation is along $\mathbf n$, so the sharp interior
coefficient is the P4/P10 receiver pullback

$$
\boxed{
\mathbf C_{C,t\to r}^{(0)}
=
\left.
\frac{1}{c_fJ}
\frac{\partial}{\partial S}
\left(\frac{\mathbf n}{rJ}\right)
\right|_{S=S_*}.
}
$$

There is no endpoint term under the declared compact-interior or
period-matched P10 convention. P13 makes this coefficient independent of the
endpoint-clear characteristic split.

For constant transmitter velocity,

$$
\frac{\partial r}{\partial S}=-c_fa,
$$

$$
\frac{\partial\mathbf n}{\partial S}
=-\frac{c_f}{r}
\left(\boldsymbol\beta-a\mathbf n\right),
$$

$$
\frac{\partial a}{\partial S}
=-\frac{c_f}{r}\left(\beta^2-a^2\right),
\qquad
\frac{\partial J}{\partial S}
=\frac{c_f}{r}\left(\beta^2-a^2\right).
$$

Substitution retains the direction change, inverse-distance change, and
source-normal change:

$$
\boxed{
\mathbf C_{C,t\to r}^{(0)}
=
\frac{1}{r^2J^2}
\left[
-\boldsymbol\beta
+2a\mathbf n
-\frac{\beta^2-a^2}{J}\mathbf n
\right].
}
$$

This is the full sharp ordered-pair accounting coefficient for the stated
uniform source and static test receiver. In particular, no derivative of $J$
has been dropped; it is the last term in the bracket and begins at second
order.

**Claim grade: derived from P10's exact $D K_C$ identity and the simple-root
delta pullback.**

**Falsifier:** Direct differentiation of $\mathbf n/(rJ)$ must reproduce the
boxed expression. An omitted first-order term could arise only from
$\partial_S\mathbf n$, $\partial_Sr$, or $\partial_SJ$; all three derivatives
are displayed. A nonzero split-dependent spatial derivative would contradict
P13's $D H=0$ identity.

## 3. First-order coefficients in the present-position basis

The exact present/emission relations expand as

$$
\frac rR
=1+p+\frac12(\beta^2+p^2)+O(\beta^3),
$$

$$
\mathbf n
=
\mathbf N\left(1-p+\frac12(p^2-\beta^2)\right)
+\boldsymbol\beta+O(\beta^3),
$$

$$
J=1-p+p^2-\beta^2+O(\beta^3).
$$

Keeping only first order in the exact accounting coefficient gives

$$
\boxed{
\frac{R^2}{\kappa\sigma_{tr}|q_tq_r|}\mathbf A_C
=2p\mathbf N-\boldsymbol\beta+O(\beta^2).
}
$$

Thus, in the requested $(\mathbf N,\boldsymbol\beta)$ basis, the coefficients
are

$$
\boxed{C_N=2p,\qquad C_\beta=-1.}
$$

Writing
$\boldsymbol\beta=p\mathbf N+\boldsymbol\beta_\perp$ makes the geometry more
transparent:

$$
2p\mathbf N-\boldsymbol\beta
=p\mathbf N-\boldsymbol\beta_\perp.
$$

The accounting row has longitudinal coefficient $+p$, transverse coefficient
$-1$ against $\boldsymbol\beta_\perp$, and first-order norm $\beta$. Its
transverse part rotates the delayed emission-ray row back toward the present
ray; its longitudinal part restores the missing magnitude.

**Claim grade: derived.**

**Falsifier:** Setting $p=0$ must leave the pure transverse correction
$-\boldsymbol\beta$; setting
$\boldsymbol\beta=p\mathbf N$ must leave $+p\mathbf N$. Either failure exposes
a basis or sign error.

## 4. Conspiracy verdict

P16's selected scale row is

$$
\mathbf A_{\mathrm{scale}}
=
\kappa\sigma_{tr}|q_tq_r|
\frac{\mathbf n}{r^2J}.
$$

Its first-order present-position expansion is

$$
\frac{R^2}{\kappa\sigma_{tr}|q_tq_r|}
\mathbf A_{\mathrm{scale}}
=
\mathbf N(1-2p)+\boldsymbol\beta+O(\beta^2).
$$

Adding the accounting row gives

$$
\begin{aligned}
\frac{R^2}{\kappa\sigma_{tr}|q_tq_r|}
(\mathbf A_{\mathrm{scale}}+\mathbf A_C)
&=
\mathbf N(1-2p)+\boldsymbol\beta
+2p\mathbf N-\boldsymbol\beta
+O(\beta^2)\\
&=\boxed{\mathbf N+O(\beta^2)}.
\end{aligned}
$$

**Verdict: conspiracy restored exactly through first order.** There is no
first-order residual in either direction or magnitude.

The exact constant-velocity sum in emission variables is also useful:

$$
\boxed{
\frac{\mathbf n}{r^2J}
+\mathbf C_{C,t\to r}^{(0)}
=
\frac{(1-\beta^2)\mathbf n-J\boldsymbol\beta}
{r^2J^3}.
}
$$

The coefficient of $\mathbf n$ follows from

$$
J^2+2aJ-(\beta^2-a^2)=1-\beta^2.
$$

Expansion through second order gives

$$
\boxed{
\frac{R^2}{\kappa\sigma_{tr}|q_tq_r|}
(\mathbf A_{\mathrm{scale}}+\mathbf A_C)
=
\mathbf N\left(1+\frac12\beta^2-\frac32p^2\right)
+p\boldsymbol\beta+O(\beta^3).
}
$$

Therefore the first-order pass does not imply a second-order pass. Relative
to the observer-level uniform-motion electric benchmark, the remaining
static-receiver residual at the next order is

$$
\boxed{
\Delta\mathbf A^{(2)}
=
\frac{\kappa\sigma_{tr}|q_tq_r|}{R^2}
p\boldsymbol\beta.
}
$$

**Claim grade: derived for the same one-way static-test chart.** The benchmark
comparison is an **observer-level recovery test**.

**Falsifier:** Expanding the exact boxed emission-variable sum must either
remove $p\boldsymbol\beta$ or change one of the radial coefficients. A
reciprocal source row or moving-receiver accounting term cannot be silently
used as a falsifier because either changes the chart; it must be calculated
as a declared additional ordered pair.

## 5. Reciprocal circular opposite pair

The circular pair is not the one-way test chart. Both worldlines have
histories, so the full coefficient of a variation contains the incoming
receiver row and the transposed future source row. P4/P10 derived their sum on
the principal circular partner branch.

With

$$
c=\cos\xi,
\qquad
s=\sin\xi,
\qquad
J_p=1+\beta s,
\qquad
\cos\xi=\frac{\xi}{\beta},
$$

the full accounting coefficient on worldline $1$ is

$$
\boldsymbol{\mathscr C}_{1,p}^{(0)}
=
\frac{\omega\beta c}{4c_fR J_p^3}\mathbf e_r.
$$

For opposite polarities, $\sigma_{12}=-1$, hence

$$
\boxed{
\mathbf A_{C,1}^{(0)}
=
-\kappa|q_1q_2|
\frac{\omega\beta c}{4c_fR J_p^3}\mathbf e_r,
}
$$

so $\mathbf A_C$ points radially inward. The mirror row on worldline $2$ is
also inward toward the common center. Its magnitude relative to the scale row
is

$$
\frac{\|\mathbf A_C\|}{\|\mathbf A_{\mathrm{scale}}\|}
=\frac{\beta^2c^3}{J_p^3}=O(\beta^2).
$$

At worldline $1$, the incoming emission ray is

$$
\mathbf n_-=c\mathbf e_r-s\mathbf e_\theta.
$$

The attractive selected scale row is proportional to

$$
-\mathbf n_-
=-c\mathbf e_r+s\mathbf e_\theta.
$$

Its tangential component is forward and is $O(\beta)$ because
$s=\beta+O(\beta^3)$. It therefore supplies positive instantaneous power,

$$
\mathbf V_1\cdot\mathbf A_{\mathrm{scale},1}>0.
$$

The accounting row is radial, so on the exact circular velocity

$$
\mathbf V_1\cdot\mathbf A_{C,1}=0.
$$

The same signs hold on worldline $2$. Consequently the leading tangential
energy input survives:

$$
\boxed{
\text{selected scale row}+\mathbf A_C
\;\Longrightarrow\;
\text{outward leading secular tendency}.
}
$$

The inward accounting row changes the radial balance at Darwin order, but it
does not close the orbit because it cannot cancel the leading forward
tangential scale row.

**Claim grade:** inward radial sign, zero accounting power on the exact circle,
and positive scale-row power are **derived on the prescribed P4/P10 chart**.
The word “outward” is an **inferred leading secular orbital consequence** of
that positive power. A complete self-consistent evolved pair trajectory is
not derived here.

**Falsifier:** A tangential $O(\beta)$ term in the full reciprocal
$\mathbf A_C$ could cancel the scale pumping, but P4's complete
receiver-plus-transposed-source coefficient is exactly radial on this chart.
An evolved-history calculation with nonpositive orbit-averaged power would
falsify the secular inference without changing the instantaneous row result.

## 6. Corrected Part 4/P19 direct-source rows

For the static receiver, the scale and accounting pieces separately expand as

$$
\frac{R^2}{\kappa\sigma_{tr}|q_tq_r|}
\mathbf A_{\mathrm{scale}}
=
\mathbf N\left(
1-2p+\frac32p^2-\frac12\beta^2
\right)
+\boldsymbol\beta(1-p)
+O(\beta^3),
$$

$$
\frac{R^2}{\kappa\sigma_{tr}|q_tq_r|}
\mathbf A_C
=
\mathbf N(2p+\beta^2-3p^2)
+\boldsymbol\beta(-1+2p)
+O(\beta^3).
$$

The corrected direct-source base that P19 must match is therefore:

| Direct-source basis row | Scale coefficient | $\mathbf A_C$ coefficient | Corrected base | Observer benchmark |
| --- | ---: | ---: | ---: | ---: |
| $\mathbf N$ | $1$ | $0$ | $1$ | $1$ |
| $p\mathbf N$ | $-2$ | $+2$ | $0$ | $0$ |
| $\boldsymbol\beta$ | $+1$ | $-1$ | $0$ | $0$ |
| $p^2\mathbf N$ | $+3/2$ | $-3$ | $-3/2$ | $-3/2$ |
| $\beta^2\mathbf N$ | $-1/2$ | $+1$ | $+1/2$ | $+1/2$ |
| $p\boldsymbol\beta$ | $-1$ | $+2$ | $+1$ | $0$ |

Thus the old P11 first-order cargo requirements $b=2$ and $a=-1$ are not
portable. For the same P7A velocity-record numerator, the recoil-inclusive
base changes the first-order matching equations to

$$
\boxed{b=0,\qquad a=0.}
$$

At second order, those forced first-order values leave the corrected base's
$+p\boldsymbol\beta$ coefficient equal to $+1$ rather than $0$. Within the
unchanged P7A direct-source ansatz, the corresponding coefficient is

$$
1-a+b,
$$

which remains $1$ after $a=b=0$. Hence the existing local velocity-record
family still cannot match the full static-receiver direct-source sector:
the first-order contradiction is removed, but a second-order
$p\boldsymbol\beta$ contradiction replaces it.

This packet does not assign moving-receiver accounting coefficients. Those
require the reciprocal/moving-receiver $K_C$ variation under P19's declared
history convention. In particular, the present calculation does not decide
the $h\boldsymbol\beta$, $z\mathbf N$, or other receiver-source bilinear rows.

**Claim grade:** the six-row corrected base and the changed $a,b$ conditions
are **derived** on the static-test chart. Rejection of the unchanged P7A
direct-source family is **derived conditional on retaining P11's exact local
$(a,b)$ cargo basis and the one-way test convention**. The status of the full
moving-receiver P19 table remains **open**.

**Falsifier:** A corrected second-order expansion of the same exact
$K_C$ pullback with zero $p\boldsymbol\beta$ coefficient would remove the
direct-sector contradiction. A new cargo basis with a second-order
$p\boldsymbol\beta$ row but no first-order $p\mathbf N$ or
$\boldsymbol\beta$ rows would evade this particular no-solution result by
changing the P7A ansatz.

## 7. Claim ledger and disposition

| Claim | Grade | Operator-checkable falsifier |
| --- | --- | --- |
| The one-way static-test $K_C$ row is the exact coefficient in Section 2. | derived | Direct differentiation of $\mathbf n/(rJ)$ gives another coefficient. |
| $\mathbf A_C$ supplies $2p\mathbf N-\boldsymbol\beta$ at first order. | derived | The present-position expansion changes either coefficient. |
| Scale plus $\mathbf A_C$ restores $\mathbf N+O(\beta^2)$. | derived | A first-order $p\mathbf N$ or transverse row remains after addition. |
| The observer-level benchmark has no first-order source-drift row. | observer-level recovery target inherited from P11 | The independent uniform-motion field expansion contains such a row. |
| The restored static-test base retains $+p\boldsymbol\beta$ at second order. | derived | Expansion of the exact emission-variable sum removes it. |
| Circular-pair $\mathbf A_C$ is inward and radial. | derived in P4/P10 and reapplied here | The full receiver-plus-transposed-source variation has a tangential term or opposite radial sign. |
| The prescribed circular chart has positive leading scale-row power and zero accounting-row power. | derived | Either displayed dot product changes sign. |
| The reciprocal pair has an outward leading secular tendency. | inferred from the derived leading power | A self-consistent evolved-history solution has nonpositive orbit-averaged power. |
| P19 must replace the old first-order direct-source base by zero $p\mathbf N$ and zero $\boldsymbol\beta$ rows. | derived workflow consequence | The selected law omits $\mathbf A_C$ or its first-order coefficients differ. |
| The unchanged P7A $(a,b)$ direct-source family remains inconsistent at second order. | derived conditional on that ansatz and chart | An allowed member satisfies $a=b=0$ and also cancels $+p\boldsymbol\beta$. |

Disposition: **priority-only**. The decisive first-order drift-chart
calculation passes, while the next-order direct-source row and the
moving-receiver accounting coefficients remain outside corpus-promotion
readiness.
