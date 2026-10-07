# Larger rapid radial motion: bounded proposal search

## Outcome and meaning

**Measured proposal-search failure:** the two fixed starts completed, but neither retained preparation approached full-vector balance on the denser sample. Relative RMS residuals were approximately 0.796 and 0.752. Their sampled root counts varied strongly with reception phase. These floating diagnostics do not prove a continuous exclusion, an exact candidate or a nonordinary event. The [separate topology investigation](overnight2-b-fast-radial-topology.md) asks whether the count variation has a rigorous continuous consequence.

The proposed mechanism was to increase the radial acceleration demand through rapid radial deformation and reduce the scale mismatch found in constant-radius fast-height preparations. This is a declared search of prescribed histories in the existing six-member class, with the canonical $K=c_f=1$ equation and every returned positive-delay partner and self root. No receiver factor, cap, truncation, event rule or stability calculation is introduced.

## Family, objective and controls

For normalized time $\tau=t/R$ and phase $\phi=\kappa\tau$, the complete paths are

$$
X_j(t)=R(\rho(\phi)\cos[\beta\tau+j\pi/3+p(\phi)],
\rho(\phi)\sin[\beta\tau+j\pi/3+p(\phi)],(-1)^jz(\phi)),
$$

$$
\rho=1+a\cos2\phi+b\sin2\phi,\quad
p=(c\cos2\phi+d\sin2\phi)/\kappa,\quad
z=(\cos\phi-\sin3\phi/8)/10.
$$

The bounded search uses $|a|\le0.38$, $|b|\le0.02$, $|c|,|d|\le0.005$, $\beta\in[1.8,1.9]$ and $\kappa\in[8,32]$. It fits a positive constant scale to the complete vector equation $RL=A$. Here $L$ is the normalized path acceleration and $A$ is the complete sampled canonical acceleration sum, including absolute source divisors.

The domain has $\rho\ge0.6$, angular rate at least 1.78 and planar speed at least 1.068. A conservative acceleration bound of 2000 gives a self secant-speed floor 1.058 for delays at most $10^{-5}$. The complete diameter is below three. These estimates support the floating evaluator's recent and remote search boundaries; they do not certify its root completeness between grid points.

The [companion](overnight2-b-fast-radial-search.py) passed independently specified waveform derivatives, analytical static acceleration, the admitted flat T02 full-vector reference and the conservative recent-self estimate before the pilot. Two fixed starts used $(a,\kappa)=(0.30,16)$ and $(0.35,24)$, with $b=c=d=0$ and the admitted T02 literal rotation seed. Objectives sampled 16 phases and 1024 delay intervals, with fixed normalization per start. The retained best proposal from each start was reprobed at 96 phases and 4096 delay intervals. This reprobe uses the same evaluator and is not independent evidence.

## Retained outcomes

| Measured quantity | First start | Second start |
| --- | ---: | ---: |
| Best objective RMS under fixed initial normalization | 0.4224668811 | 0.3784714370 |
| Dense relative RMS | 0.7957690952 | 0.7520176194 |
| Dense fitted full-vector scale | 0.0054659212 | 0.0033932480 |
| Dense radial-only scale | 0.0242092671 | 0.0132824295 |
| Dense axial-only scale | 0.0741987931 | 0.0070002943 |
| Dense radius-weighted mean tangential acceleration | 2.336422070 | 1.257363136 |
| Dense axial work diagnostic | 0.4837192761 | 0.2329521573 |
| Distinct sampled six-channel root-count vectors | 31 | 36 |

These values are from native jq inspection of the retained target JSON. The exact retained coefficient decimals are preserved in that receipt and reproduced in the topology treatment. Dense means are sampled diagnostics, not validated period integrals. The search completed 164 objective calls and both starts with no operational failure or pending start. This establishes failure of these selected numerical proposals; it does not establish failure of every parameter choice in the declared domain.

## Receipts and preservation

| Evidence | SHA-256 |
| --- | --- |
| Search companion | ce4da3efbedece341ba6ed08bc8382bdd3e756dbc645f24482ae530df998bbfb |
| Frozen evaluator | 8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1 |
| Known receipt | 68fd55b98dd23f11799ccd88eb558de1e06099538bc8792906618703f0153dc1 |
| Pilot receipt | 9cfd1eb348e795fe4a8b2df6e12956dcee2a1660e02662f34074dc75976da47b |
| Target receipt | 0877e6ee9075080b014c71cfcc63a0c7050847bc27eaa7e4e3440095c3c1ed18 |

Original receipts are retained in local ignored storage at .local-data/master-equation-closure/overnight2-b/fast-radial-search. The seven-call pilot measured 10.483559 internal seconds, 10.753 supervised seconds, 75,546,624 bytes RSS and 67,773 receipt bytes. The target measured 180.722548 internal seconds, 180.963 supervised seconds, 77,185,024 bytes RSS and 135,275 receipt bytes. The three receipts total 205,428 bytes. These are observed costs, not predictions for other searches.

The target ran within the declared 20 optimizer evaluations per start, 400 total objective-call cap, 300 internal seconds, 360 supervised seconds, 512 MiB and eight MiB output, with one numerical thread. The owned supervisor d9d935ce-4f1d-47c5-8499-8c8bb68d0b5a advanced its heartbeat and closed with exit zero, zero stderr and a closed process group. No numerical process remains from this search.

Reproduction uses the shared venv and this companion's known, pilot and target stages in that order, with OPENBLAS_NUM_THREADS, OMP_NUM_THREADS and MKL_NUM_THREADS set to one. The known controls precede every fresh pilot/target chain. Original exclusive-create receipts must be preserved; a new run needs its own explicitly selected output location. Independent reconstruction of the numerical failure metrics is not claimed. A lower residual under an improved method would not contradict this bounded outcome; an arithmetic or root-search error could invalidate the reported diagnostics.
