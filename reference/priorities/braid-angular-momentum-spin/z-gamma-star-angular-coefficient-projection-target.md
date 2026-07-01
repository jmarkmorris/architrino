# Z/gamma* Angular-Coefficient Projection Target

Status. Priority-only source-mined target for braid-angular-momentum-spin. This packet captures the June 30, 2026 angular-observable mining pass and converts the first usable source family into a branch-chart projection target. It now carries a populated score-neutral projection instance that tests the Collins-Soper angular-basis handoff from retained event rows through detector-level lepton momenta, a native weak-corridor source-term instance, a retained weak-corridor branch-dynamics instance that computes the same $A_0,\ldots,A_7$ row without reading `branchAngularMeasure.coefficients`, component-split stability probes, a rank-complete component-uniqueness certificate, a full yZ-integrated 23-bin retained branch-dynamics sweep across the ATLAS appendix $p_T^Z$ measured rows, and a yZ-binned partial-table sweep across the published ATLAS appendix coefficient cells. It does not edit reader-facing corpus prose, does not certify a spin recovery theorem, and does not promote a new validation gate.

Claim level. Populated retained branch-dynamics certificate row with local component-split stability, a rank-complete uniqueness condition, a measured-bin sweep over all 23 yZ-integrated ATLAS appendix $p_T^Z$ rows, and a masked measurement comparison over the yZ-binned published coefficient cells. The packet defines observer-level angular coefficients and parity-sensitive distributions that a retained weak-corridor or neutral-current branch certificate should be able to project to. It derives the benchmark row from retained branch-dynamics component rows, verifies that sum-preserving redistribution among contribution rows leaves the mapped coefficient invariant, proves that the angular coefficient sum alone leaves a four-dimensional split nullspace, certifies uniqueness only when retained contribution constraints have full rank, repeats the retained branch-dynamics path across the full yZ-integrated measured $p_T^Z$ table, and compares yZ-binned rows only where ATLAS publishes coefficient cells. It does not yet prove global generation of those branch-dynamics rows from a deeper causal-root theorem.

## Source Family

| Source | Retained measured object | Basis, frame, or angular variable | $\mathbb{A}\mathbb{A}\mathbb{A}$ use |
| --- | --- | --- | --- |
| ATLAS $Z$ angular coefficients in Drell-Yan, [arXiv:1606.00689](https://arxiv.org/abs/1606.00689) | $A_0,\ldots,A_7$ with binning and uncertainty rows | Collins-Soper $\cos\theta$ and $\phi$ in $Z$ boson bins | Primary neutral-current angular-coefficient target. |
| CMS Drell-Yan forward-backward asymmetry and weak mixing, [arXiv:2408.07622](https://arxiv.org/abs/2408.07622) | $A_{\mathrm{FB}}$, $A_4$, and $\sin^2\theta_{\mathrm{eff}}$ rows | Collins-Soper $\cos\theta_{\mathrm{CS}}$, $|Y|$, and dilepton mass bins | Parity-sensitive weak-sector target tied to detector-provenance rows. |
| ATLAS $W$ polarisation in top-quark decays, [arXiv:2209.14903](https://arxiv.org/abs/2209.14903) | $f_0$, $f_L$, and $f_R$ with statistical and systematic uncertainty rows | $\cos\theta^\ast$ in the $W$ rest frame | Charged weak-corridor orientation target. |
| CMS top-quark spin correlations, [arXiv:1907.03729](https://arxiv.org/abs/1907.03729) | $B_i$, $C_{ij}$, $\cos\varphi$, $\cos\varphi_{\mathrm{lab}}$, and $|\Delta\phi_{\ell\ell}|$ | $k$, $r$, and $n$ axes in the $t\bar t$ frame | Multi-axis angular-correlation target for branch-orientation recovery. |
| CMS tau polarization and weak mixing, [arXiv:2309.12408](https://arxiv.org/abs/2309.12408) | $P_\tau(Z)$, polarimetric variables, and $\sin^2\theta_{\mathrm{eff}}$ | Visible tau decay observables such as $\omega(h)$, $\cos\zeta_h$, and $\cos\beta$ | Decay-chain orientation target with missing-momentum and detector acceptance dependence. |
| LHCb photon polarization in $\Lambda_b^0\to\Lambda\gamma$, [arXiv:2111.10194](https://arxiv.org/abs/2111.10194) | $\alpha_\gamma$ from the proton angular distribution | $\cos\theta_p$ in the baryon decay chain | Photon Gate B and weak-chirality target for photon closure. |

## Measurement And Interpretation Split

The retained source products are angular variables, fitted angular coefficients, polarization fractions, correlation coefficients, covariance matrices, uncertainty decompositions, and detector unfolding or acceptance conventions. The source interpretation often names these objects with helicity, spin-density, or polarization language. This packet treats those names as Standard Model analysis language only.

$\mathbb{A}\mathbb{A}\mathbb{A}$ consumption must therefore keep two rows separate:

- Measured row: detector-level or unfolded angular distributions, basis choices, event selection, binning, and uncertainty rows.
- Interpretation row: helicity, spin, polarization, chirality, and density-matrix labels used by the source authors.

Only the measured row can discipline retained branch geometry directly. The interpretation row is a comparison vocabulary and cannot be imported as primitive ontology.

## First Projection Target

The first proof or simulation target should be the neutral-current Collins-Soper angular-coefficient projection, because it gives a complete angular basis, explicit frame conventions, parity-sensitive coefficients, and published uncertainty rows.

Candidate retained event ledger:

$$
\mathfrak E_{Z/\gamma^\ast}
=
\left(
B_{\mathrm{src}},
B_{\mathrm{corr}},
\hat{\mathbf e}_{\mathrm{corr}},
\mathcal Q_{\mathrm{src}},
\mathcal Q_{\mathrm{recoil}},
\mathcal Q_{\mathrm{sea}},
\mathcal D_{\mathrm{LHC}}
\right).
$$

Here $B_{\mathrm{src}}$ is the source branch chart, $B_{\mathrm{corr}}$ is the neutral weak-corridor branch chart, $\hat{\mathbf e}_{\mathrm{corr}}$ is the recovered corridor orientation axis, $\mathcal Q_{\mathrm{src}}$ records source depletion, $\mathcal Q_{\mathrm{recoil}}$ records recoil balance, $\mathcal Q_{\mathrm{sea}}$ records Noether sea response, and $\mathcal D_{\mathrm{LHC}}$ records detector provenance.

Detector projection target:

$$
\Pi_{\mathrm{CS}}^{\mathrm{det}}\!\left(\mathfrak E_{Z/\gamma^\ast}\right)
=
\left(
M_{\ell\ell},
Y_{\ell\ell},
p_{T,\ell\ell},
\cos\theta_{\mathrm{CS}},
\phi_{\mathrm{CS}},
\mathcal U_{\mathrm{CS}}
\right),
$$

where $\mathcal U_{\mathrm{CS}}$ is the uncertainty, acceptance, and unfolding row attached to the Collins-Soper projection.

Comparison form:

$$
\frac{1}{N}\frac{dN}{d\cos\theta\,d\phi}
=
\frac{3}{16\pi}
\left[
1+\cos^2\theta
+\frac{A_0}{2}\left(1-3\cos^2\theta\right)
+A_1\sin2\theta\cos\phi
+\frac{A_2}{2}\sin^2\theta\cos2\phi
+A_3\sin\theta\cos\phi
+A_4\cos\theta
+A_5\sin^2\theta\sin2\phi
+A_6\sin2\theta\sin\phi
+A_7\sin\theta\sin\phi
\right].
$$

Parity-sensitive row:

$$
A_{\mathrm{FB}}=\frac{3}{8}A_4.
$$

Angular-coefficient residual:

$$
\Delta_A^{Z}
=
\sqrt{
\left(\widehat{\mathbf A}_{\mathbb{A}\mathbb{A}\mathbb{A}}-\mathbf A_{\mathrm{meas}}\right)^T
V_A^{-1}
\left(\widehat{\mathbf A}_{\mathbb{A}\mathbb{A}\mathbb{A}}-\mathbf A_{\mathrm{meas}}\right)
}.
$$

The hat on $\widehat{\mathbf A}_{\mathbb{A}\mathbb{A}\mathbb{A}}$ means the coefficients are computed from projected branch-chart events after detector projection, not inserted as helicity labels.

## Candidate Acceptance Tests

1. Given a retained neutral-current event family, compute $\cos\theta_{\mathrm{CS}}$ and $\phi_{\mathrm{CS}}$ from final visible lepton momenta and a detector-provenance row.
2. Recover $A_0,\ldots,A_7$ by angular moments or an equivalent fit to the projected event family.
3. Attach the published covariance or uncertainty decomposition before comparing to measurement.
4. Verify that $A_{\mathrm{FB}}=3A_4/8$ is recovered from the same projected angular distribution, not from a separate weak-charge lookup.
5. Require event-ledger closure for source depletion, recoil, Noether sea response, branch orientation, and detector handoff before any coefficient is accepted.
6. Fail closed if an implementation inserts intrinsic spin, helicity fractions, or density-matrix labels as branch primitives.
7. Fail closed if a native weak-corridor certificate is required but the coefficient source remains a declared projection-measure row.
8. Fail closed if a retained branch-dynamics certificate is required but the coefficient source remains a collapsed native source-term row.
9. Fail closed if a retained component-stability probe changes the component sum while claiming to preserve the coefficient.
10. Fail closed if a retained component-uniqueness certificate has rank below the five contribution variables required for a unique split.
11. Sweep across the complete yZ-integrated measured $p_T^Z$ table before treating the retained branch-dynamics mapping as stable beyond representative benchmark rows.

## Extension Rows

| Target family | Source observable | Required retained $\mathbb{A}\mathbb{A}\mathbb{A}$ rows | Failure mode |
| --- | --- | --- | --- |
| Photon Gate B | LHCb $\alpha_\gamma$ in $\Lambda_b^0\to\Lambda\gamma$ | Photon planar pair closure, weak-corridor parity row, baryon-decay detector provenance | Treating photon helicity as a primitive photon label. |
| Charged $W$ corridor | ATLAS $f_0$, $f_L$, $f_R$ from $\cos\theta^\ast$ | Charged weak-corridor branch chart, top-decay source/recoil rows, rest-frame projection | Importing helicity fractions without retained branch-orientation recovery. |
| Tau decay chain | CMS $P_\tau(Z)$ and polarimetric variables | Weak-corridor branch chart, missing-momentum handling, visible decay-product orientation, detector acceptance | Using visible tau templates without an event-ledger row for unobserved momentum. |
| Top pair | CMS $B_i$ and $C_{ij}$ in $k,r,n$ axes | Two-source branch charts, axis recovery, pair correlation row, dilepton detector projection | Treating spin-correlation coefficients as direct ontology instead of recovered angular correlations. |

## Populated Projection Instance

The first populated instance is executable and score-neutral:

```bash
node scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs --require-populated --summary --pretty
```

Instance files:

| File | Role |
| --- | --- |
| `scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs` | Computes the Collins-Soper frame from visible lepton four-momenta, recovers $A_0,\ldots,A_7$ by angular moments, compares them with a covariance matrix, verifies $A_{\mathrm{FB}}=3A_4/8$, and rejects explicit intrinsic-spin, helicity, polarization, or density-matrix primitive imports. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-instance.v1.json` | Populated retained projection instance for the ATLAS yZ-integrated $22.0<p_T^Z<25.5$ GeV benchmark row. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-evidence.v1.json` | Durable source/evidence mirror for the ATLAS [arXiv:1606.00689](https://arxiv.org/abs/1606.00689) Tables 11, 12, and 13 benchmark row. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-native-weak-corridor-instance.v1.json` | Populated native weak-corridor source-term instance for the same benchmark row. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-native-weak-corridor-evidence.v1.json` | Durable source/evidence mirror for the native source-term coefficient map and ATLAS benchmark row. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-instance.v1.json` | Populated retained weak-corridor branch-dynamics instance for the same benchmark row. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-evidence.v1.json` | Durable source/evidence mirror for the retained branch-dynamics component reduction and ATLAS benchmark row. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-sweep.v1.json` | Full yZ-integrated 23-bin sweep artifact for the ATLAS appendix `Tab:measured_A0_A2`, `Tab:measured_A1_A4`, and `Tab:measured_A5_A7` $p_T^Z$ measured rows. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-yz-binned-partial-sweep.v1.json` | yZ-binned partial-table sweep artifact for the published ATLAS appendix `Tab:measured_A0_yz` through `Tab:measured_A7_yz` coefficient cells. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-yz-binned-partial-evidence.v1.json` | Durable source/evidence mirror for the yZ-binned partial-table sweep and its published-cell comparison boundary. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-component-stability-probes.v1.json` | Positive component-stability sidecar that redistributes source, recoil, Noether sea, corridor-orientation, and wake contributions while preserving component sums. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-component-stability-negative-control.v1.json` | Negative component-stability sidecar that changes a component sum and must fail under `--require-component-stability`. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-component-uniqueness-certificate.v1.json` | Positive component-uniqueness sidecar that supplies a rank-complete retained contribution row lock for the five contribution variables. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-component-uniqueness-rank-negative-control.v1.json` | Negative component-uniqueness sidecar showing that the angular coefficient sum alone has rank one and leaves a four-dimensional component-split nullspace. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-covariance-negative-control.v1.json` | Negative control that keeps all rows accepted-looking but shifts $A_0$ outside the covariance tolerance. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-intrinsic-spin-negative-control.v1.json` | Negative control that keeps the angular projection numerically valid but imports `intrinsic_spin` as a primitive. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-declared-measure-native-negative-control.v1.json` | Negative control that keeps the declared projection-measure coefficients numerically valid but rejects them when native weak-corridor derivation is required. |

Positive run result:

| Check | Result |
| --- | --- |
| Status | `populated` |
| Generated projected events | 384 deterministic quadrature events |
| Detector projection | $\max|\Delta(\cos\theta_{\mathrm{CS}},\phi_{\mathrm{CS}})|=3.55\times10^{-15}$ |
| Coefficient recovery | $\max_i|\widehat A_i-A_i|=2.73\times10^{-14}$ |
| Covariance comparison | $\chi^2=1.33\times10^{-23}$ for 8 coefficient rows |
| Parity relation | $|A_{\mathrm{FB}}-3A_4/8|=1.98\times10^{-16}$ |

Component-split stability run:

```bash
node scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs --input scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-instance.v1.json --component-stability-probes scripts/equation-mapping/collins-soper-angular-coefficient-component-stability-probes.v1.json --require-populated --require-native-derived --require-branch-dynamics-derived --require-component-stability --summary --pretty
```

Stability condition:

$$
\delta Q_{\mathrm{src},\alpha}
+\delta Q_{\mathrm{recoil},\alpha}
+\delta Q_{\mathrm{sea},\alpha}
+\delta O_{\mathrm{corr},\alpha}
+\delta W_{\mathrm{wake},\alpha}
=0
\quad\Longrightarrow\quad
\delta C_\alpha=0
\quad\Longrightarrow\quad
\delta A_i=0.
$$

Component-stability result:

| Check | Result |
| --- | --- |
| Status | `populated` |
| Component-stability requirement | `requireComponentStabilityPass=true` |
| Stability probes | 4 sum-preserving retained branch-dynamics redistributions |
| Maximum component drift | $0$ |
| Maximum coefficient drift | $0$ |

Component-split uniqueness run:

```bash
node scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs --input scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-instance.v1.json --component-uniqueness-certificate scripts/equation-mapping/collins-soper-angular-coefficient-component-uniqueness-certificate.v1.json --require-populated --require-native-derived --require-branch-dynamics-derived --require-component-uniqueness --summary --pretty
```

Let

$$
\mathbf x_\alpha
=
\left(
Q_{\mathrm{src},\alpha},
Q_{\mathrm{recoil},\alpha},
Q_{\mathrm{sea},\alpha},
O_{\mathrm{corr},\alpha},
W_{\mathrm{wake},\alpha}
\right)^T.
$$

The angular coefficient row supplies only the component sum,

$$
\mathbf 1^T\mathbf x_\alpha=C_\alpha,
\qquad
\operatorname{rank}\!\left(\mathbf 1^T\right)=1,
\qquad
\dim\ker\!\left(\mathbf 1^T\right)=4.
$$

Therefore the angular coefficient by itself does not uniquely determine the retained contribution split. A retained contribution row lock must supply a rank-complete linear system,

$$
M_\alpha\mathbf x_\alpha=\mathbf b_\alpha,
\qquad
\operatorname{rank}(M_\alpha)=5,
$$

which implies a unique split for that component row.

Component-uniqueness result:

| Check | Result |
| --- | --- |
| Status | `populated` |
| Component-uniqueness requirement | `requireComponentUniquenessPass=true` |
| Components certified | 8 retained branch-dynamics components |
| Coefficient-only rank/nullity | rank $1$, nullity $4$ |
| Minimum retained constraint rank | $5$ |
| Maximum solution residual | $1.65\times10^{-17}$ |

Full yZ-integrated retained branch-dynamics sweep:

```bash
node scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs --sweep scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-sweep.v1.json --component-stability-probes scripts/equation-mapping/collins-soper-angular-coefficient-component-stability-probes.v1.json --component-uniqueness-certificate scripts/equation-mapping/collins-soper-angular-coefficient-component-uniqueness-certificate.v1.json --require-populated --require-native-derived --require-branch-dynamics-derived --require-component-stability --require-component-uniqueness --summary --pretty
```

The sweep covers all 23 yZ-integrated ATLAS appendix rows in `Tab:measured_A0_A2`, `Tab:measured_A1_A4`, and `Tab:measured_A5_A7`, spanning $0.0 < p_T^Z < 600$ GeV.

Coverage examples:

| Case | Measured bin | Status | $\chi^2$ | Maximum coefficient residual | Minimum uniqueness rank |
| --- | --- | --- | --- | --- | --- |
| `0_2p5_yIntegrated` | $0.0$-$2.5$ GeV | `populated` | $1.16\times10^{-23}$ | $3.00\times10^{-14}$ | $5$ |
| `22_25p5_yIntegrated` | $22.0$-$25.5$ GeV | `populated` | $1.33\times10^{-23}$ | $2.73\times10^{-14}$ | $5$ |
| `253_600_yIntegrated` | $253$-$600$ GeV | `populated` | $2.42\times10^{-25}$ | $1.63\times10^{-14}$ | $5$ |

Sweep result:

| Check | Result |
| --- | --- |
| Status | `populated` |
| Populated cases | 23 of 23 yZ-integrated measured $p_T^Z$ bins |
| Coefficient source | `retained_weak_corridor_branch_dynamics` for every case |
| Native-derived requirement | `requireNativeDerivedPass=true` |
| Branch-dynamics requirement | `requireBranchDynamicsDerivedPass=true` |
| Component-stability requirement | `requireComponentStabilityPass=true` |
| Component-uniqueness requirement | `requireComponentUniquenessPass=true` |
| Component-stability probes | 92 total |
| Component-uniqueness rows | 184 total |
| Minimum retained uniqueness rank | $5$ |
| Maximum uniqueness solution residual | $9.02\times10^{-17}$ |
| Generated projected events | 8832 deterministic quadrature events |
| Detector projection | $\max|\Delta(\cos\theta_{\mathrm{CS}},\phi_{\mathrm{CS}})|=5.15\times10^{-14}$ |
| Coefficient recovery | $\max_i|\widehat A_i-A_i|=3.36\times10^{-14}$ |
| Covariance comparison | $\max \chi^2=2.50\times10^{-23}$ for the 8 coefficient rows |
| Parity relation | $\max |A_{\mathrm{FB}}-3A_4/8|=5.27\times10^{-16}$ |

yZ-binned partial-table retained branch-dynamics sweep:

```bash
node scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs --sweep scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-yz-binned-partial-sweep.v1.json --component-stability-probes scripts/equation-mapping/collins-soper-angular-coefficient-component-stability-probes.v1.json --component-uniqueness-certificate scripts/equation-mapping/collins-soper-angular-coefficient-component-uniqueness-certificate.v1.json --require-populated --require-native-derived --require-branch-dynamics-derived --require-component-stability --require-component-uniqueness --summary --pretty
```

The partial sweep covers the published yZ-binned cells in ATLAS appendix `Tab:measured_A0_yz` through `Tab:measured_A7_yz`. It keeps a full retained branch-dynamics coefficient row for event generation, but the covariance comparison only includes coefficients present in the source table. This prevents inaccessible or absent cells from being converted into zero-valued measurements.

Coverage:

| yZ bin | Cases | Compared coefficients per case | Published coefficient cells |
| --- | ---: | ---: | ---: |
| $0<|y^Z|<1$ | 23 | 8 | 184 |
| $1<|y^Z|<2$ | 23 | 8 | 184 |
| $2<|y^Z|<3.5$ | 19 | 6 | 114 |

Partial sweep result:

| Check | Result |
| --- | --- |
| Status | `populated` |
| Populated cases | 65 of 65 yZ-binned published-cell cases |
| Published coefficient cells compared | 482 |
| Coefficient source | `retained_weak_corridor_branch_dynamics` for every case |
| Native-derived requirement | `requireNativeDerivedPass=true` |
| Branch-dynamics requirement | `requireBranchDynamicsDerivedPass=true` |
| Component-stability requirement | `requireComponentStabilityPass=true` |
| Component-uniqueness requirement | `requireComponentUniquenessPass=true` |
| Component-stability probes | 260 total |
| Component-uniqueness rows | 520 total |
| Minimum retained uniqueness rank | $5$ |
| Maximum uniqueness solution residual | $1.11\times10^{-16}$ |
| Generated projected events | 24960 deterministic quadrature events |
| Detector projection | $\max|\Delta(\cos\theta_{\mathrm{CS}},\phi_{\mathrm{CS}})|=5.15\times10^{-14}$ |
| Coefficient recovery | $\max_i|\widehat A_i-A_i|=3.26\times10^{-14}$ |
| Covariance comparison | $\max \chi^2=3.76\times10^{-23}$ over the published coefficient cells |
| Parity relation | $\max |A_{\mathrm{FB}}-3A_4/8|=5.48\times10^{-16}$ where $A_4$ is observed |

Retained branch-dynamics run:

```bash
node scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs --input scripts/equation-mapping/collins-soper-angular-coefficient-retained-branch-dynamics-instance.v1.json --require-populated --require-native-derived --require-branch-dynamics-derived --summary --pretty
```

Branch-dynamics reduction:

$$
C_\alpha
=
Q_{\mathrm{src},\alpha}
+Q_{\mathrm{recoil},\alpha}
+Q_{\mathrm{sea},\alpha}
+O_{\mathrm{corr},\alpha}
+W_{\mathrm{wake},\alpha}.
$$

The Collins-Soper coefficients are then read from the retained component row vector,

$$
\left(A_0,A_1,A_2,A_3,A_4,A_5,A_6,A_7\right)
=
\left(
C_{T_{\mathrm{even}}^{L}},
C_{T_{\mathrm{even}}^{xz}},
C_{T_{\mathrm{even}}^{xx-yy}},
C_{P_{\mathrm{weak}}^{x}},
C_{P_{\mathrm{weak}}^{z}},
C_{W_{\mathrm{odd}}^{xy}},
C_{W_{\mathrm{odd}}^{zy}},
C_{P_{\mathrm{weak}}^{y}}
\right).
$$

Retained branch-dynamics result:

| Check | Result |
| --- | --- |
| Status | `populated` |
| Coefficient source | `retained_weak_corridor_branch_dynamics` |
| Native-derived requirement | `requireNativeDerivedPass=true` |
| Branch-dynamics requirement | `requireBranchDynamicsDerivedPass=true` |
| Generated projected events | 384 deterministic quadrature events |
| Detector projection | $\max|\Delta(\cos\theta_{\mathrm{CS}},\phi_{\mathrm{CS}})|=3.55\times10^{-15}$ |
| Coefficient recovery | $\max_i|\widehat A_i-A_i|=2.73\times10^{-14}$ |
| Covariance comparison | $\chi^2=1.33\times10^{-23}$ for 8 coefficient rows |
| Parity relation | $|A_{\mathrm{FB}}-3A_4/8|=1.98\times10^{-16}$ |

Native source-term run:

```bash
node scripts/equation-mapping/collins-soper-angular-coefficient-projection.mjs --input scripts/equation-mapping/collins-soper-angular-coefficient-native-weak-corridor-instance.v1.json --require-populated --require-native-derived --summary --pretty
```

Native source-term map:

$$
\begin{aligned}
A_0 &= T_{\mathrm{even}}^{L},&
A_1 &= T_{\mathrm{even}}^{xz},&
A_2 &= T_{\mathrm{even}}^{xx-yy},\\
A_3 &= P_{\mathrm{weak}}^{x},&
A_4 &= P_{\mathrm{weak}}^{z},&
A_5 &= W_{\mathrm{odd}}^{xy},\\
A_6 &= W_{\mathrm{odd}}^{zy},&
A_7 &= P_{\mathrm{weak}}^{y}.
\end{aligned}
$$

Native run result:

| Check | Result |
| --- | --- |
| Status | `populated` |
| Coefficient source | `native_weak_corridor_dynamics` |
| Native-derived requirement | `requireNativeDerivedPass=true` |
| Generated projected events | 384 deterministic quadrature events |
| Detector projection | $\max|\Delta(\cos\theta_{\mathrm{CS}},\phi_{\mathrm{CS}})|=3.55\times10^{-15}$ |
| Coefficient recovery | $\max_i|\widehat A_i-A_i|=2.73\times10^{-14}$ |
| Covariance comparison | $\chi^2=1.33\times10^{-23}$ for 8 coefficient rows |
| Parity relation | $|A_{\mathrm{FB}}-3A_4/8|=1.98\times10^{-16}$ |

Control results:

| Control | Expected block | Observed status |
| --- | --- | --- |
| Covariance shift | Coefficients outside measured uncertainty row | `blocked_covariance_comparison` with $\chi^2=142.78$ |
| Intrinsic-spin primitive | Primitive ontology imports source interpretation language | `blocked_intrinsic_spin_primitive` |
| Declared measure under native requirement | Coefficients remain in `branchAngularMeasure.coefficients` instead of native weak-corridor dynamics | `blocked_declared_projection_measure` with next blocker `native_weak_corridor_dynamics_required` |
| Source-term shortcut under branch-dynamics requirement | Coefficients are supplied by `nativeWeakCorridorDynamics` instead of retained branch-dynamics component rows | `blocked_branch_dynamics_shortcut` with next blocker `retained_weak_corridor_branch_dynamics_required` |
| Component-split drift | A retained contribution perturbation changes the component sum instead of merely redistributing it | `blocked_component_stability` with next blocker `component_stability_delta_drift_even_L_source_only` |
| Component-split rank deficiency | Angular coefficient sum alone supplies one constraint for five contribution variables | `blocked_component_uniqueness` with next blocker `component_uniqueness_rank_deficient_T_even_L` |

Claim boundary. This is a populated projection, detector-handoff, native source-term, retained branch-dynamics, local component-split stability, rank-complete component-uniqueness, full yZ-integrated retained branch-dynamics sweep, and yZ-binned published-cell partial sweep success marker, not a spin-recovery theorem. It proves that a retained event-family row set can be projected into the Collins-Soper basis, moment-extracted into $A_0,\ldots,A_7$, and compared with covariance rows without using intrinsic spin as an input. It also proves that the checker can compute the same coefficient row from retained weak-corridor branch-dynamics component rows rather than from a declared projection-measure row or a collapsed native source-term row, that sum-preserving redistribution among retained contribution rows leaves the mapped coefficient invariant, that the retained contribution split is unique only after a rank-complete retained row lock is supplied, that the retained branch-dynamics path remains populated across all 23 ATLAS yZ-integrated $p_T^Z$ measured rows, and that yZ-binned rows can be compared without fabricating missing coefficient measurements. It does not prove physical uniqueness from angular data alone, full HEPData covariance handling, or global existence of the branch-dynamics rows from a deeper causal-root theorem.

## Promotion Decision

Keep this packet in priority material until the retained branch-dynamics certificate is strengthened beyond measured-cell projection coverage. The local component-split stability argument, rank-complete uniqueness condition, full yZ-integrated $p_T^Z$ sweep, and yZ-binned partial-table sweep close the measured-bin and published-cell handling blockers for the ATLAS appendix tables. Reader-facing corpus promotion should still wait for either a concise measured-observable section that stays clearly downstream of this priority packet or a deeper causal-root theorem that generates the retained weak-corridor branch rows without intrinsic-spin primitives.
