# Polarity-Phase Rigid Screen Results

Promotion status: `priority-only`. This packet records a rigid-carrier screen over neutral three-plus/three-minus polarity assignments and binary phase offsets. It tests whether the tangential failure of the rigid octahedral carrier is caused by the specific opposite-pair polarity convention

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

The result is negative. Polarity reassignment and rigid phase offsets improve the zero-offset row but do not close tangential force balance.

---

## 1. Screened Carrier

The carrier was the rigid octahedral row

$$
\mathbf{x}_{a,+}(\theta)
=
R\mathbf{p}_a(\theta+\phi_a),
\qquad
\mathbf{x}_{a,-}(\theta)
=
-R\mathbf{p}_a(\theta+\phi_a),
$$

with

$$
\phi_1=0,
\qquad
\phi_2,\phi_3\in[0,2\pi).
$$

The carrier directions were

$$
\begin{aligned}
\mathbf{p}_1(\theta)&=(\cos\theta,\sin\theta,0),\\
\mathbf{p}_2(\theta)&=(0,\cos\theta,\sin\theta),\\
\mathbf{p}_3(\theta)&=(\sin\theta,0,\cos\theta).
\end{aligned}
$$

The screen retained only neutral polarity rows:

$$
\sum_{i=1}^6\sigma_i=0,
\qquad
q_i=\sigma_i\epsilon,
\qquad
\sigma_i\in\{+1,-1\}.
$$

For every such neutral row, each receiver has the structural source-site inventory $(N_{\mathrm{attr}},N_{\mathrm{rep}})=(3,2)$ from [attraction-repulsion-inventory-theorem.md](attraction-repulsion-inventory-theorem.md). The screen still has to compute the delayed weighted force sums because the $3$-$2$ count is not a closure proof.

Since global sign reversal does not change $\sigma_i\sigma_j$, this gives twenty assignments in the fixed enumeration used by the search.

---

## 2. Active-Root Convention

For each receiver, the screen retained the same-binary partner and the four cross-binary sources. Same-source roots were not retained. For every ordered retained source, the first positive causal-delay root was solved:

$$
\left\|
\mathbf{x}_i(\theta)
-\mathbf{x}_j(\theta-y)
\right\|
=
Ry.
$$

The dimensionless force was

$$
\widetilde{\mathbf{F}}_i(\theta)
=
\sum_{j\in\mathcal{A}_i}
\frac{\sigma_i\sigma_j}
{y_{ij}^2|J_{ij}|}
\hat{\mathbf{r}}_{ij},
$$

and the tangential residual was

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}
=
\mathbf{u}_i\cdot\widetilde{\mathbf{F}}_i.
$$

The optimizer minimized the RMS tangential residual over $\phi_2,\phi_3$ for each polarity row, with penalties for root-count loss, low Jacobian floor, and low Euclidean separation.

---

## 3. Best Rows

The ten best screened rows were:

| Polarity row | $\phi_2$ | $\phi_3$ | Tangential RMS | Tangential max | $J_{\min}$ | $d_{\min}/R$ | Root count |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| $+---++$ | $0.006683$ | $3.148086$ | $0.829635$ | $1.787420$ | $0.727176$ | $0.996664$ | $5$-$5$ |
| $-+--++$ | $3.110984$ | $3.110959$ | $0.831430$ | $1.707289$ | $0.718954$ | $0.984805$ | $5$-$5$ |
| $+-++--$ | $6.252471$ | $3.110587$ | $0.831450$ | $1.707140$ | $0.718835$ | $0.984622$ | $5$-$5$ |
| $-+++--$ | $6.252051$ | $6.251799$ | $0.831484$ | $1.706226$ | $0.718714$ | $0.984435$ | $5$-$5$ |
| $--++-+$ | $3.144137$ | $3.174271$ | $0.831501$ | $1.729116$ | $0.719869$ | $0.983800$ | $5$-$5$ |
| $+++---$ | $3.174090$ | $3.143482$ | $0.831512$ | $1.728015$ | $0.719920$ | $0.983888$ | $5$-$5$ |
| $++-+--$ | $3.174117$ | $3.143463$ | $0.831515$ | $1.727932$ | $0.719912$ | $0.983875$ | $5$-$5$ |
| $++--+-$ | $3.143332$ | $3.174081$ | $0.831517$ | $1.727711$ | $0.719922$ | $0.983893$ | $5$-$5$ |
| $--+-++$ | $3.173757$ | $3.142479$ | $0.831524$ | $1.726409$ | $0.720012$ | $0.984052$ | $5$-$5$ |
| $---+++$ | $3.173628$ | $3.142138$ | $0.831527$ | $1.725884$ | $0.720048$ | $0.984115$ | $5$-$5$ |

The best row has a good root floor and noncollision floor, but the tangential residual is still order one:

$$
\operatorname{rms}
\left(
\widetilde{\mathcal{R}}_{\mathrm{tan}}
\right)
\approx0.829635,
\qquad
\max
\left|
\widetilde{\mathcal{R}}_{\mathrm{tan}}
\right|
\approx1.787420.
$$

---

## 4. Comparison

The best polarity-phase row improves the zero-offset opposite-pair row but does not materially beat the best rigid phase rows:

| Row | Tangential RMS | Tangential max | Interpretation |
| --- | ---: | ---: | --- |
| Zero-offset opposite-pair row | $1.1009590702$ | $2.0636859695$ | rigid seed fails |
| Best opposite-pair phase row | about $0.8798$ | about $1.8433$ | phase offsets help |
| Best neutral polarity-phase row | about $0.8296$ | about $1.7874$ | polarity reassignment helps slightly |
| Best arclength common-breathing row | about $0.4659$ | about $1.1024$ | deformation helps more but fails curvature closure |

The polarity-phase screen therefore does not identify a retained rigid branch.

This closes only the retention overread

$$
\texttt{closed-rejected:polarity-phase-improvement-implies-retention}.
$$

The rejected implication is that neutral polarity reassignment plus rigid phase-offset RMS improvement implies a retained branch. The screen still has pointwise tangential leakage, with best maximum residual about $1.7874$, and it does not close support-complete roots, action, Noether, event, stability, or convergence rows. The proof packet is [Polarity Phase Improvement Not Retention](../neutral-braid/polarity-phase-improvement-not-retention.md), and the executable witness is `scripts/neutral-braid/octahedral-polarity-phase-retention-witness.mjs`.

---

## 5. Dynamics Inference

The rigid tangential failure is not only a consequence of choosing opposite polarities inside each binary. Neutral polarity reassignment preserves the per-receiver $3$ attractive / $2$ repulsive site count while shifting which delayed line-of-action forces carry those signs; the rigid geometry still leaves pointwise tangential leakage.

The live dynamics path remains deformation of the carrier curves or addition of a declared force-balance channel:

1. arclength curve deformation,
2. plane-normal precession,
3. antipodal relaxation,
4. controlled self/fold-layer contribution,
5. or Noether sea medium response with event-ledger closure.

Failure codes:

$$
\texttt{tangential-residual-open},
\qquad
\texttt{rigid-polarity-phase-insufficient},
\qquad
\texttt{not-retained}.
$$
