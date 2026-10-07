# Moderate radial motion inside a sampled eight-root sector

## Bounded outcome

**Measured search failure:** the only eligible fixed start retained the sampled eight-root pattern during its bounded optimization, but its best dense relative RMS residual remained about 0.409. This is not a small-residual candidate. Its radial-only and axial-only scales still differ substantially. The [separate continuous certificate](overnight2-b-moderate-radial-determinant.md) tests the retained proposal without relying on sampled eligibility.

The question was whether smaller radial modulation could improve radial/axial balance while avoiding the root-count changes observed in the [larger-radial search](overnight2-b-fast-radial-search.md). The new complete prescribed paths keep the existing six-member common-radius/common-phase/alternating-height form, with

$$
\rho=1+a\cos2\phi+b\sin2\phi,\qquad
p=(c\cos2\phi+d\sin2\phi)/\kappa,\qquad
z=(\cos\phi-\sin3\phi/8)/20,\qquad \phi=\kappa t/R.
$$

The six bounds are $|a|\le0.04$, $|b|\le0.02$, $|c|,|d|\le0.01$, $\beta\in[1.8,1.9]$ and $\kappa\in[8,24]$. The canonical equation uses $K=c_f=1$ and all returned ordinary positive-delay partner and self roots with absolute source divisor. There is no new response factor or event law.

## Eligibility, objective and limitations

Four fixed starts used $(a,\kappa)=(0.005,8),(0.01,12),(0.015,16),(0.02,20)$, with $b=c=d=0$ and the same admitted T02 rotation seed. Only a start with returned counts $(1,3,1,1,1,1)$ at every coarse and dense phase was eligible. Objectives used 24 phases and 1536 delay intervals; dense checks used 96 phases and 4096 intervals. During optimization a different returned count vector was an invalid evaluation. This is sampled conditioning, not an independently admitted continuous chart.

Known controls passed before the pilot: independently specified waveform derivatives, analytical static acceleration, admitted flat T02 full-vector balance and the uniform recent-self bound. The parameter domain has radius at least 0.94, angular rate at least 1.76, planar speed at least 1.6544 and a conservative total acceleration bound of 230. These support the recent guard at delay $10^{-5}$; the complete position bound supplies the remote search cutoff. They do not certify the floating root finder between samples.

The pilot made only the first start eligible. The second and fourth left the sampled eight-root sector; the third failed with nonpositive fitted scale. Those failures remain in the original receipt. The target optimized only the eligible start, with at most twelve optimizer evaluations, 400 total objective calls and 300 internal seconds. The target finished 84 calls with zero invalid evaluations and a relative objective-improvement stopping condition.

The retained exact decimal vector $(a,b,c,d,\beta,\kappa)$ is

$$
(0.0002191395109809334,\;0.0002346909943333512,\;
-0.001118865929608746,\;0.0019226003081620029,\;
1.8999999999999997,\;8.000000000000002).
$$

| Dense measured diagnostic | Value |
| --- | ---: |
| Relative RMS residual | 0.4086359568519436 |
| Fitted full-vector scale | 0.2334313112441632 |
| Radial-only scale | 0.43586322103023817 |
| Axial-only scale | 0.006574113774558939 |
| Radius-weighted mean tangential acceleration | 1.0184576013687787 |
| Axial work diagnostic | 0.01076326878027308 |

The dense sample retained the same eight-root pattern. These diagnostics use the same floating evaluator as the objective and are not independent evidence or validated period integrals. The retained frequency and rotation lie at opposite search boundaries; no statement about families beyond those bounds follows.

## Evidence, cost and preservation

| Evidence | SHA-256 |
| --- | --- |
| [Companion](overnight2-b-moderate-radial-search.py) | 4d5a0a7596d7a1b14026652c739a7621e0221d8bb2e82d14c1050c2e48d6f834 |
| Frozen evaluator | 8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1 |
| Known receipt | 3438a211fae3a5d6f175a93cda3b21b1286850580a343f6c939648032b8dd942 |
| Pilot receipt | 985cdbac3cc0e21cd7d736800d9fd5ee361d18b765de5f3794ed3fce28ef5a0d |
| Target receipt | dd1d8c45d166e0eb99475b1780565477a2fc6e2ad5676abad6a09e289234710c |

Native jq inspection of the retained JSON supplies the diagnostics above. The pilot measured 4.267706 internal seconds, 4.627 supervised seconds and 76,201,984 bytes RSS. The target measured 12.057695 internal seconds, 12.330 supervised seconds and 76,349,440 bytes RSS. Three receipts occupy 253,231 bytes by native wc. They remain in local ignored storage at .local-data/master-equation-closure/overnight2-b/moderate-radial-search.

Supervisor 2ec11770-fd37-479b-b070-b29f63fd94b3 closed the target with exit zero, zero stderr and a closed group. The declared limits were 300 internal seconds, 360 supervised seconds, 512 MiB observed RSS, eight MiB output and one numerical/BLAS thread. No extra start or budget enlargement was used.

Reproduction uses the shared venv and the companion's known, pilot and target stages in order, preserving original exclusive-create receipts and using a new explicit destination for any replay. The result establishes the outcome of this bounded method only. A different successful preparation would not contradict it; a root-finding or arithmetic error could invalidate its diagnostics. Exactness, continuous ordinary admission, stability and actual fate remain separate obligations.
