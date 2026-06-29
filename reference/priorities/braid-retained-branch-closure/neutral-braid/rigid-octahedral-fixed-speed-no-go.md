# Rigid Octahedral Fixed-Speed No-Go Certificate

Promotion status: `priority-only`. Closure status: `closed-rejected` for the narrow rigid zero-offset fixed-speed octahedral carrier hypothesis. This packet formulates the narrow rejection certificate for the rigid zero-offset octahedral carrier under the fixed-speed neutral-braid force convention. It uses the carrier and root formulas from [Octahedral Carrier Worked Example](../shell-braid/octahedral-carrier-worked-example.md), the force convention from [octahedral-force-residual-diagnostic.md](octahedral-force-residual-diagnostic.md), and the executable witness:

```bash
node scripts/neutral-braid/octahedral-fixed-speed-witness.mjs --out /tmp/neutral-braid-octahedral-fixed-speed-witness.json --pretty
node scripts/neutral-braid/octahedral-fixed-speed-witness.mjs --validate /tmp/neutral-braid-octahedral-fixed-speed-witness.json --pretty
```

This packet rejects only the rigid zero-offset octahedral carrier with fixed speed, neutral opposite-pair polarity, ordinary same-source excluded, and the sampled/certified root convention stated below. It does not reject deformed support-band, bounded-speed, shell braid, nested shell braid, or general neutral braid hypotheses.

---

## 1. Narrow Hypothesis

The hypothesis under test is:

$$
\mathbf{x}_{a,\sigma}(\theta)
=
\sigma R\mathbf{p}_a(\theta),
\qquad
a\in\{1,2,3\},
\qquad
\sigma\in\{+1,-1\},
$$

with

$$
\begin{aligned}
\mathbf{p}_1(\theta)&=(\cos\theta,\sin\theta,0),\\
\mathbf{p}_2(\theta)&=(0,\cos\theta,\sin\theta),\\
\mathbf{p}_3(\theta)&=(\sin\theta,0,\cos\theta).
\end{aligned}
$$

The fixed-speed row is

$$
\omega=\frac{c_f}{R},
$$

and the neutral opposite-pair polarity is

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

The ordinary same-source row is excluded. The consumed source-pair policy for each receiver is therefore the ordered all-pairs neutral braid policy

$$
\Pi_{\mathrm{all}}^{\mathrm{oct}}
=
\{
((a,\sigma),(b,\sigma')):
(a,\sigma)\ne(b,\sigma')
\}.
$$

The force convention is the dimensionless delayed force

$$
\widetilde{\mathbf{F}}_i(\theta)
=
\sum_{j\ne i}
\frac{\operatorname{sign}(q_iq_j)W_{ij}^{\mathrm{rec}}(\theta)}
{y_{ij}(\theta)^2}
\widehat{\mathbf{R}}_{ij}(\theta),
$$

where the positive-delay roots solve

$$
G_{ij}(\theta,y)
=
\left\|
\mathbf{x}_i(\theta)
-
\mathbf{x}_j(\theta-y)
\right\|
-y
=0,
$$

and

$$
\widehat{\mathbf{R}}_{ij}(\theta)
=
\frac{
\mathbf{x}_i(\theta)-\mathbf{x}_j(\theta-y_{ij}(\theta))
}
{y_{ij}(\theta)}.
$$

The fixed-speed tangent closure requirement is

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
=
\mathbf{T}_i(\theta)\cdot\widetilde{\mathbf{F}}_i(\theta)
=0
$$

for every retained receiver site and phase on the same root ledger.

---

## 2. Existing Exact Rows

The worked example already gives the simultaneous Euclidean noncollision floor

$$
d_{\min}=R.
$$

For the antipodal partner root,

$$
y
=
2\left|\cos\frac{y}{2}\right|
$$

has the unique positive root on $0<y<\pi$,

$$
y_*\approx1.4781702664,
$$

with partner Jacobian

$$
J_{\mathrm{partner}}
=
1+\frac{\sin y_*}{y_*}
\approx1.6736120292.
$$

For an ordinary same-source circular carrier at exact speed $c_f$,

$$
y
=
2\left|\sin\frac{y}{2}\right|
$$

has no retained positive-delay same-source root except the excluded limit $y=0$. Therefore the no-go target below does not depend on adding an ordinary same-source force contribution.

---

## 3. Single-Phase Tangential Obstruction

It is enough to reject the rigid fixed-speed hypothesis to find one receiver site and one phase where the fixed-speed tangent residual is nonzero on the consumed root ledger.

Use receiver

$$
i=(1,+),
\qquad
\theta=0.
$$

Then

$$
\mathbf{x}_{1,+}(0)=(1,0,0),
\qquad
\mathbf{T}_{1,+}(0)=(0,1,0).
$$

### 3.1 Antipodal partner contribution

The antipodal partner is $(1,-)$. Its delayed source point is

$$
\mathbf{x}_{1,-}(-y)=(-\cos y,\sin y,0),
$$

and the partner root is $y_*$. Hence

$$
\widehat{\mathbf{R}}_{(1,+),(1,-)}
=
\frac{(1+\cos y_*,-\sin y_*,0)}{y_*}.
$$

Because $\operatorname{sign}(q_{1,+}q_{1,-})=-1$, the partner contribution to the tangent residual is

$$
S_{\mathrm{partner}}
=
\frac{\sin y_*}
{y_*^3\left(1+\frac{\sin y_*}{y_*}\right)}.
$$

Numerically,

$$
S_{\mathrm{partner}}\approx0.1842069963.
$$

### 3.2 Cross-binary $(2,\pm)$ contribution

For source $(2,+)$,

$$
\mathbf{x}_{2,+}(-y)=(0,\cos y,-\sin y),
$$

so

$$
\left\|(1,0,0)-\mathbf{x}_{2,+}(-y)\right\|=\sqrt{2}.
$$

Thus the retained positive-delay root is exactly

$$
y=\sqrt{2},
\qquad
J=1,
$$

and

$$
\mathbf{T}_{1,+}(0)\cdot\widehat{\mathbf{R}}_{(1,+),(2,+)}
=
-\frac{\cos\sqrt{2}}{\sqrt{2}}.
$$

For source $(2,-)$,

$$
\mathbf{x}_{2,-}(-y)=(0,-\cos y,\sin y),
$$

again with

$$
y=\sqrt{2},
\qquad
J=1,
$$

and

$$
\mathbf{T}_{1,+}(0)\cdot\widehat{\mathbf{R}}_{(1,+),(2,-)}
=
\frac{\cos\sqrt{2}}{\sqrt{2}}.
$$

The polarity signs are opposite for these two rows. Therefore their combined tangent contribution is

$$
S_{2,\pm}
=
-\frac{\cos\sqrt{2}}{2\sqrt{2}}
-\frac{\cos\sqrt{2}}{2\sqrt{2}}
=
-\frac{\cos\sqrt{2}}{\sqrt{2}}.
$$

Numerically,

$$
S_{2,\pm}\approx-0.1102688441.
$$

### 3.3 Cross-binary $(3,\pm)$ contribution

For sources $(3,+)$ and $(3,-)$, the delayed source points have zero $y$-coordinate:

$$
\mathbf{x}_{3,+}(-y)=(-\sin y,0,\cos y),
\qquad
\mathbf{x}_{3,-}(-y)=(\sin y,0,-\cos y).
$$

Since the receiver tangent is $\mathbf{T}_{1,+}(0)=(0,1,0)$, each corresponding chord has zero tangent projection:

$$
\mathbf{T}_{1,+}(0)\cdot\widehat{\mathbf{R}}_{(1,+),(3,+)}
=0,
\qquad
\mathbf{T}_{1,+}(0)\cdot\widehat{\mathbf{R}}_{(1,+),(3,-)}
=0.
$$

Thus the $(3,\pm)$ sources do not affect this scalar tangent obstruction, provided their retained roots and Jacobian floors are present on the certified root ledger.

---

## 4. Reduced No-Go Scalar

At the single phase and receiver above, the rigid fixed-speed tangent residual reduces to

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
=
\frac{\sin y_*}
{y_*^3\left(1+\frac{\sin y_*}{y_*}\right)}
-
\frac{\cos\sqrt{2}}{\sqrt{2}},
$$

where $y_*$ is the unique root of

$$
y=2\cos\frac{y}{2},
\qquad
0<y<\pi.
$$

The executable witness gives

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\approx
0.0739381522956.
$$

Therefore the current sampled/numeric witness rejects the rigid zero-offset octahedral fixed-speed pointwise tangential hypothesis under this force convention once the root convention is certified at this node:

$$
\texttt{rejected\_by\_single\_phase\_fixed\_speed\_tangential\_residual}.
$$

This is stronger than merely observing a large grid maximum, because the obstruction has been reduced to one explicit scalar expression plus a root certificate for $y_*$ and the finite root-ledger validity at $\theta=0$.

---

## 5. Interval Closure Certificate

The exact analytic closure target is:

$$
\boxed{
\frac{\sin y_*}
{y_*^3\left(1+\frac{\sin y_*}{y_*}\right)}
\ne
\frac{\cos\sqrt{2}}{\sqrt{2}}
}
$$

with $y_*$ defined by

$$
y_*=2\cos\frac{y_*}{2},
\qquad
0<y_*<\pi.
$$

No transcendence proof is needed for the branch verdict. The fixed-speed tangent row requires exact zero at every retained node; an interval enclosure excluding zero at one required node rejects the hypothesis.

The executable witness emits the interval certificate:

| Row | Required certificate |
| --- | --- |
| Partner root enclosure | $y_*\in[1.47817026642,1.47817026644]$ for the unique root of $y=2\cos(y/2)$ on $0<y<\pi$ |
| Partner tangent contribution | $S_{\mathrm{partner}}\in[0.18420699634,0.18420699636]$ |
| Cross $(2,\pm)$ contribution | $S_{2,\pm}\in[-0.11026884406,-0.11026884404]$ |
| Cross $(3,\pm)$ contribution | $S_{3,\pm}=0$ at $\theta=0$ |
| Tangent obstruction interval | $\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)\in[0.07393815228,0.07393815232]$ |

Thus

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\ge
0.07393815228
>
0.
$$

This is the closure row for the narrow hypothesis. Fixed-speed tangent closure requires $\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)=0$ for every retained receiver and phase on the consumed root ledger. The required row fails at $(i,\theta)=((1,+),0)$, so the rigid zero-offset octahedral fixed-speed neutral-braid hypothesis is rejected under the declared source-pair, polarity, and same-source policies:

$$
\texttt{closed-rejected:rigid-octahedral-fixed-speed-neutral-row}.
$$

---

## 6. Boundary Of The Rejection

This no-go packet does not exclude:

1. a deformed support-band carrier that changes $\mathbf{x}_{a,\sigma}$ and the root sheets;
2. a nonzero phase-lock row tuned by the causal-wake dynamics;
3. a bounded-speed factor row, where the tangent projection becomes a speed-ODE source rather than a fixed-speed zero row;
4. a shell braid or nested shell braid branch with different support, memory, or inventory rows;
5. a regularized fold-layer or distinct split-source representative with its own action and event ledger;
6. a general neutral braid hypothesis outside the rigid zero-offset octahedral representative.

The retained-branch status for this hypothesis is

$$
\texttt{not\_retained}.
$$

The next precise action is not to retry this rigid fixed-speed row. It is to move to a different hypothesis class: interval-certify the root ledger as reusable infrastructure, then test bounded-speed factors or deformed support-band carriers on the same all-pairs source convention.
