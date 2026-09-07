# Common-Axis Source, Moment, and Field Matrix

## Status and authority

This report-only packet completes EMAP-001 at constraint-design grade. It defines six independent comparison cases for a candidate common-axis assembly record. It does not establish a retained braid, electron or positron structure, a magnetic moment, a Maxwell recovery, or an architrino-level electromagnetic field.

Claim grades:

- the six observer-level parity requirements are **deduced recovery requirements** from standard electromagnetic comparison behavior;
- the exposed-current projection below is an **inferred candidate map**, not a unique native derivation;
- any common-axis geometry used to instantiate the map remains a **candidate realization** until an accepted retained history supplies every required row;
- this packet contains no new measured claim.

Plainly: the matrix says what a successful source record must distinguish. It does not say that the present geometry already succeeds.

## Candidate source record

For a declared observation window $W$, let $mathbf C[W]$ be the assembly center, $mathbf V[W]=\dot{\mathbf C}[W]$ its group velocity, $mathbf r_i=mathbf X_i-mathbf C$ the member displacement, and $mathbf u_i=\dot{\mathbf X}_i-mathbf V$ the internal velocity. Let $epsilon_i$ be the signed polarity and $w_i^{\mathrm{exp}}[W]$ a derived exposure weight that includes shielding and the declared projection window.

Define the candidate exposed charge, axial circulation, and raw exposed-current moment by

$$
Q_{\mathrm{exp}}[W]
=
\sum_i w_i^{\mathrm{exp}}[W]\epsilon_i,
$$

$$
\Gamma_{\mathrm{exp}}[W]
=
\sum_i w_i^{\mathrm{exp}}[W]\epsilon_i
\left(\mathbf r_i\times\mathbf u_i\right)\cdot\hat{\mathbf n},
$$

$$
\mathbf M_{\mathrm{exp}}[W]
=
\frac12\sum_i w_i^{\mathrm{exp}}[W]\epsilon_i
\left(\mathbf r_i\times\mathbf u_i\right).
$$

Here $hat{\mathbf n}$ is the candidate body axis. $mathbf M_{\mathrm{exp}}$ is a geometric source moment. An observer-level magnetic moment requires a separately derived normalization and projection; the definition above does not assign one by notation. Whole-assembly transport is recorded separately as

$$
\mathbf J_{\mathrm{tr}}[W]=Q_{\mathrm{exp}}[W]\mathbf V[W].
$$

Plainly: internal circulation uses motion relative to the moving center, while translation uses the center's motion. Subtracting $mathbf V$ prevents a transported charged assembly from being mistaken for a changed internal rotor.

The observer-level magnetic comparison remains a projection of one source, wake, sea, and boundary record,

$$
\mathbf B_{\mathrm{eff}}
=
\Pi_B
\left[
\mathcal H_{\mathrm{src}},
\mathcal H_{\mathrm{wake}},
\Theta_{\mathrm{sea}}^{\mathrm{EM}},
\mathcal H_{\partial\Omega}
\right].
$$

In a declared weak diagnostic regime, direct-source, sea-mediated, and mixed shares may be reported separately. Their sum is not assumed outside that regime, and no receiver-specific response may be hidden inside $Pi_B$.

## Same-record contract

Every case binds the following rows to one `sameRecordId` or to a declared transformation pair whose immutable parent is that record:

1. member identities, paths, polarities, exposure weights, $mathbf C$, $mathbf V$, $hat{\mathbf n}$, $mathbf r_i$, and $mathbf u_i$ over the same window $W$;
2. $Q_{\mathrm{exp}}$, $Gamma_{\mathrm{exp}}$, $mathbf M_{\mathrm{exp}}$, and $mathbf J_{\mathrm{tr}}$ computed from those rows rather than copied from labels;
3. accepted causal-root and wake histories, boundary history, Noether sea state, and the direct/sea/mixed provenance classification;
4. the `EQ-13` effective-field projection and the `EQ-27` moment projection on the same source record;
5. observation region, resolution, gauge chart when used, comparison normalization, and tolerance; and
6. a transformation manifest proving that only the declared circulation, polarity, translation, or proper rotation changed.

Plainly: a sign test is meaningful only when the two sides differ in the named switch and nothing else. Rebuilding the geometry, changing the exposure rule, or changing the sea state would make the comparison ambiguous.

## Six-case matrix

| Case | $Q_{\mathrm{exp}}$ | $Gamma_{\mathrm{exp}}$ | $mathbf V$ | $mathbf M_{\mathrm{exp}}$ | Expected observer-level magnetic parity | Required same-record binding | Independent Maxwell comparison | Exact falsifier |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Axis-only null | $0$ | $0$ | $mathbf0$ | $mathbf0$ | Null: an axis label alone produces no magnetic readout above the frozen reference tolerance. | One neutral, circulation-null, stationary record with a nondegenerate $hat{\mathbf n}$ and explicit zero rows; source, wake, sea, boundary, and projection identifiers remain present. | Zero-current Maxwell solution in the same boundary chart. | A nonzero $mathbf B_{\mathrm{eff}}$ survives with no exposed current, transported charge, boundary drive, or independently declared sea excitation, or the null is obtained by omitting a contributing row. |
| Circulation reversal | Unchanged; use $0$ to isolate the intrinsic row | $Gamma_{\mathrm{exp}}\mapsto-\Gamma_{\mathrm{exp}}$ | $mathbf0$ | $mathbf M_{\mathrm{exp}}\mapsto-\mathbf M_{\mathrm{exp}}$ | Odd intrinsic response: $mathbf B_{\mathrm{int}}\mapsto-\mathbf B_{\mathrm{int}}$ at corresponding observation points, while scalar exposure and the reference sea state remain unchanged. | Paired histories differ only by internal circulation reversal; persistent identities, geometry, exposure weights, window, boundary, and sea state are shared. | Fixed-loop current reversal under the Biot-Savart/Maxwell solution. | The intrinsic field does not reverse within tolerance, $Q_{\mathrm{exp}}$ or exposure changes, or the reversed record is not an accepted history of the same source family. |
| Polarity conjugation | $Q_{\mathrm{exp}}\mapsto-Q_{\mathrm{exp}}$; neutral stays neutral | $Gamma_{\mathrm{exp}}\mapsto-\Gamma_{\mathrm{exp}}$ | Unchanged | $mathbf M_{\mathrm{exp}}\mapsto-\mathbf M_{\mathrm{exp}}$ | Odd source response in the weak Maxwell regime after whole-history conjugation; geometry orientation and circulation sense do not change merely because every polarity changes sign. | Paired conjugate histories share paths, velocities, window, boundary, constitutive law, and conjugately matched basin evidence; only signed polarity and derived exposure-current rows conjugate. | Charge/current sign reversal in the same linear Maxwell boundary problem. | The magnetic projection keeps its sign without an independently identified even sea/background contribution, conjugation changes spatial orientation or circulation, or the pair uses unrelated source laws. |
| Translation reversal | Unchanged and choose $Q_{\mathrm{exp}}\ne0$ for the transported-charge discriminator | Unchanged | $mathbf V\mapsto-\mathbf V$ | Unchanged because $mathbf u_i=\dot{\mathbf X}_i-\mathbf V$ | The translation-generated share is odd, $mathbf B_{\mathrm{tr}}\mapsto-\mathbf B_{\mathrm{tr}}$, while the intrinsic share is unchanged. A neutral record with $Q_{\mathrm{exp}}=0$ supplies the translation null control. | Paired histories share the internal body-frame record, exposure, axis, wake law, sea state, and boundary chart; only group velocity reverses, with observation points compared in the corresponding translated frame. | Low-speed moving-charge field, $mathbf B_{\mathrm{tr}}\propto Q_{\mathrm{exp}}\mathbf V\times\mathbf R/R^3$, plus a stationary current-loop intrinsic moment. | $mathbf M_{\mathrm{exp}}$ changes under pure group-velocity reversal, the transported-charge share does not reverse, or a neutral rigid translation produces a source monopole term without another declared carrier. |
| Rigid axis rotation | Unchanged | Unchanged as a body-axis scalar | $mathbf V\mapsto\mathsf R\mathbf V$ | $mathbf M_{\mathrm{exp}}\mapsto\mathsf R\mathbf M_{\mathrm{exp}}$ | Proper rotational covariance: $mathbf B_{\mathrm{eff}}'(\mathbf C+\mathsf R\mathbf R)=\mathsf R\mathbf B_{\mathrm{eff}}(\mathbf C+\mathbf R)$, with no extra sign or laboratory-axis preference. | One history and its properly rotated copy share identities, window, constitutive law, root classification, and transformed boundary/observation chart; $det\mathsf R=+1$. | Rotational covariance of a Maxwell current distribution and its field. | A proper rigid rotation changes an invariant magnitude, introduces a sign flip not supplied by the rotation, or leaves a preferred laboratory direction in the residual. |
| Neutral far-field multipole | $0$ | Nonzero for the dipole case | $mathbf0$ | Nonzero and finite | No charge-monopole or transported-charge term; the leading magnetic comparison is the dipole field when $mathbf M_{\mathrm{exp}}\ne0$, and reverses with the moment. If the moment vanishes, the first nonzero higher multipole must be named rather than inferred from the axis. | One neutral localized source record binds complete signed exposure and current inventory to nested far-field observation shells, fixed boundary/sea state, and one moment normalization. | Localized neutral current loop and magnetic-dipole far field, $mathbf B_{\mathrm{dip}}\propto[3(\boldsymbol\mu\cdot\hat{\mathbf R})\hat{\mathbf R}-\boldsymbol\mu]/R^3$. | Net-charge cancellation is used to force the current moment to zero by definition, the measured leading far-field angular pattern or radial scaling disagrees with the declared multipole, or omitted wake/sea/boundary rows supply the apparent field. |

Plainly: the null case asks whether an axis is being mistaken for magnetism. The next four rows separately flip circulation, polarity, translation, and orientation. The last row checks whether a neutral object can still carry an internal current moment, as an ordinary neutral current loop can.

## Direct-wake and sea-response disposition

For every non-null case, report the pair of diagnostic residuals

$$
\Delta_{\mathrm{parity}}
=
\left\|
\mathbf B_{\mathrm{eff}}^{\mathrm{transformed}}
-
\mathcal T_B\mathbf B_{\mathrm{eff}}^{\mathrm{base}}
\right\|,
\qquad
\Delta_{\mathrm{source}}
=
\left\|
\mathbf M_{\mathrm{exp}}^{\mathrm{transformed}}
-
\mathcal T_M\mathbf M_{\mathrm{exp}}^{\mathrm{base}}
\right\|,
$$

where $\mathcal T_B$ and $\mathcal T_M$ are the row's declared sign or rotation operations. Evaluate the same residuals for direct, sea-mediated, and mixed diagnostic shares when that partition is defined. A parity pass in the total field does not authorize cancellation of large failing shares unless the constitutive derivation predicts that cancellation on the same record.

Plainly: two wrong contributions that happen to cancel are not a source derivation. The packet keeps each possible route visible so a future accepted record can show which route actually carries the magnetic response.

## Completion boundary

All six required cases now name net exposed charge, internal polarity-weighted circulation, assembly group velocity, raw exposed-current moment, expected observer-level parity, same-record bindings, an independent analytic Maxwell comparison, and an exact failure condition. This completes the report-only EMAP-001 object.

No tolerance is invented here. A future executable packet must freeze its observation region, norm, reference state, and tolerance before inspecting candidate output. No row changes `EQ-13` or `EQ-27`, promotes a candidate geometry, or supplies missing retained source evidence.
