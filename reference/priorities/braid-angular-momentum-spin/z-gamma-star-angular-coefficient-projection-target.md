# Z/gamma* Angular-Coefficient Projection Target

Status. Priority-only source-mined target for braid-angular-momentum-spin. This packet captures the June 30, 2026 angular-observable mining pass and converts the first usable source family into a branch-chart projection target. It now carries a populated score-neutral projection instance that tests the Collins-Soper angular-basis handoff from retained event rows through detector-level lepton momenta. It does not edit reader-facing corpus prose, does not certify a spin recovery theorem, and does not promote a new validation gate.

Claim level. Defer with blocker. The packet defines observer-level angular coefficients and parity-sensitive distributions that a future retained weak-corridor or neutral-current branch certificate should be able to project to. It does not supply that certificate.

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
| `scripts/equation-mapping/collins-soper-angular-coefficient-covariance-negative-control.v1.json` | Negative control that keeps all rows accepted-looking but shifts $A_0$ outside the covariance tolerance. |
| `scripts/equation-mapping/collins-soper-angular-coefficient-intrinsic-spin-negative-control.v1.json` | Negative control that keeps the angular projection numerically valid but imports `intrinsic_spin` as a primitive. |

Positive run result:

| Check | Result |
| --- | --- |
| Status | `populated` |
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

Claim boundary. This is a populated projection and detector-handoff success marker, not a branch-geometry theorem. It proves that a retained event-family row set can be projected into the Collins-Soper basis, moment-extracted into $A_0,\ldots,A_7$, and compared with a covariance row without using intrinsic spin as an input. It does not yet prove that native retained branch geometry derives the ATLAS coefficient values.

## Promotion Decision

Keep this packet in priority material until a retained branch-chart implementation can emit the detector projection, angular basis, covariance-aware comparison, and event-ledger closure rows from native branch dynamics rather than from a declared projection-measure instance. Reader-facing corpus promotion should wait for a branch-geometry certificate or simulation that derives at least the Collins-Soper $Z/\gamma^\ast$ coefficient row without intrinsic-spin primitives.
