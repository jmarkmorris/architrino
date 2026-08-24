# Borg Current Root-Time Budget Theorem — 2026-07-20

## Disposition

- Protocol: unchanged `EOM_BORG_NATIVE_V8`
- Preset: unchanged `research-certified-v1`
- Allocation hash: `74919ee63dc27d0aa7c43453e1762f380da886a63377912905f8f8070d3b9b3d`
- Population: six paths, deterministic seed 0, history depth `1.01`
- Current accepted prefix: `T=6.457226562499999`
- Terminal status: `root_completeness_not_certified`
- Terminal pair: receiver `1001`, transmitter `1002`
- Engine semantics, budget, gate, and published history changes: none

The current master-equation/EOM tree changes the measured decision row, but the existing shadow representation is still inadmissible. The production independent-box residual width is `1.0419675138687171e-3`, only `3.113351730342e-7` above the available residual width `1.0416561786956829e-3`. A non-authoritative shared-symbol replay gives a much smaller projected width. After charging the nonlinear Euclidean-norm remainder derived below, its inferred root-time width is `2.2480341383515460e-4`, below the unchanged `1e-3` tolerance. However, the fallback-dominance consumer rejects that state because every measured per-path coefficient projection exceeds its published ordinary radius.

Claim grades: `measured-current-binary` for the accepted prefix, terminal row, and independent-box width; `derived` for the theorem; `inferred` for applying the theorem to the binary64 shadow state. The fallback-dominance rejection is `measured-current-shadow-binary` and `derived` from the ordinary-radius containment rule. The shadow result cannot certify a solver decision.

Falsifier: a rebuilt replay makes all six named coefficient projections no wider than their ordinary radii without changing the shadow propagation, or a separately certified inclusion corrector publishes a dominated state for this row.

## Root-Time Budget Theorem

At a fixed reception/emission point, write the joint displacement set as

$$
\mathbf d=\mathbf d_0+\sum_j\mathbf a_j\epsilon_j+\mathbf r,
\qquad |\epsilon_j|\le 1,
\qquad |r_k|\le\rho_k.
$$

Let $r_0=\lVert\mathbf d_0\rVert$, let $\mathbf q=\mathbf d_0/r_0$, and define

$$
P=\sum_j|\mathbf q\mathbin{\cdot}\mathbf a_j|
  +\sum_k|q_k|\rho_k,
$$

$$
B=\sqrt{\sum_k\left(\sum_j|a_{kj}|+\rho_k\right)^2}.
$$

If $B<r_0$, the Hessian norm of $\lVert\mathbf d\rVert$ along every admitted line from $\mathbf d_0$ is at most $1/(r_0-B)$. Taylor's theorem therefore gives the conservative residual-width bound

$$
W_g\le 2\left(P+\frac{B^2}{2(r_0-B)}\right).
$$

For a one-sign transmitter-side factor with magnitude floor $m>0$, a difficult point residual containing zero maps through the simple-root mean-value row to

$$
W_S\le\frac{W_g}{m}.
$$

The unchanged root-time budget $\tau_S$ is therefore met whenever

$$
2\left(P+\frac{B^2}{2(r_0-B)}\right)\le m\tau_S.
$$

This is a budget theorem, not a state-propagation theorem. It proves the root-time consequence of an admitted joint displacement set. A production consumer must separately prove that its retained shared coefficients and independent remainder enclose the true coupled state.

Claim grade: `derived`. Falsifier: an admitted displacement satisfying the stated hypotheses produces a Euclidean residual width or simple-root image wider than the displayed bounds.

## Current Seed-0 Row

| Quantity | Current value |
| --- | ---: |
| Reception time | `6.4573265624999987` |
| Emission point | `6.4044954299926751` |
| Nominal separation lower bound | `5.3068927518720901e-2` |
| Joint displacement radius upper bound | `1.7583103065752816e-4` |
| Projected affine residual width | `2.3358335487121392e-4` |
| Nonlinear remainder width | `5.8451014205730445e-7` |
| Theorem residual width | `2.3416786501327129e-4` |
| Transmitter-side-factor lower bound | `1.0416561786956829` |
| Theorem root-time width | `2.2480341383515460e-4` |
| Fixed root-time tolerance | `1.0e-3` |

The theorem image uses about `22.48%` of the fixed root-time budget, but this is not an admitted-state result. The production consumer measures the following fallback-dominance failures:

| Path | Axis 0 projection / ordinary | Axis 1 projection / ordinary | Axis 2 projection / ordinary |
| --- | ---: | ---: | ---: |
| Receiver `1001` | `1.28818` | `1.28847` | `1.24280` |
| Transmitter `1002` | `1.26225` | `1.24630` | `1.23263` |

The excess is about `23%`–`29%`, far above a rounding adjustment. Scaling the coefficients down to fit would discard states without an inclusion proof. The correct next mechanism is a genuine preconditioned inclusion corrector.

## Representation-Decomposition Ablations

Two observer-only ablations identify why the first shadow decomposition fails. They do not alter the EOM solver, acceptance gate, retained histories, budget, or Research allocation hash.

The baseline observer introduces both a fresh root-bracket symbol for every sharp row and a fresh symbol for the complete certified acceleration enclosure. The latter already encloses the root evaluation, so treating both complete widths as independent can pay twice for the same uncertainty. Suppressing only the root-bracket symbols reduces the projection/ordinary ratios to:

| Path | Axis 0 | Axis 1 | Axis 2 |
| --- | ---: | ---: | ---: |
| Receiver `1001` | `1.08668` | `1.15637` | `1.03708` |
| Transmitter `1002` | `1.00813` | `1.08898` | `0.98500` |

This falsifies the claim that root-bracket duplication is the whole blocker, but shows that it accounts for most of the original excess.

Suppressing both complete-width injections leaves only the propagated shared coefficients and accepted local-error symbols. That deliberately incomplete decomposition passes ordinary fallback dominance and gives:

| Quantity | Propagated-only value |
| --- | ---: |
| Joint residual width | `1.9114432702459094e-4` |
| Joint root-time width | `1.8350040150861844e-4` |
| Ordinary fallback residual width | `1.0691267530651867e-3` |
| Root-time tolerance | `1.0e-3` |

The propagated-only row uses about `18.35%` of the root-time budget, leaving about `8.16e-4` of root-time width for a certified nonlinear and rounding remainder. It is still `inferred`, not admissible, because simply suppressing the complete acceleration enclosure does not prove that remainder. The result settles the representation target: replace complete-width reinjection with a centered interval-Jacobian decomposition, then certify the implicit corrector remainder by Krawczyk inclusion.

Claim grades: `measured-current-shadow-binary` for the ablation outputs and unchanged solver result; `derived` for identifying the two simultaneous width injections in the observer code; `inferred` for interpreting the propagated-only row as the linear part of the future admitted representation. Falsifier: the production interval-Jacobian remainder consumes the available slack, fails fallback dominance, or fails strict Krawczyk containment.

The July 18 shadow evidence remains a valid historical measurement of the pre-current trajectory. It rejected the then-measured naive affine row; it did not prove that every later equation contract or theorem-backed representation must fail.

## Independent Controls And Isolation

`RootTimeBudget.cpp` implements the theorem with outward-rounded binary64 interval operations. The native fixture supplies four separately checkable controls:

- a common-translation difference with zero exact displacement uncertainty;
- a radial `4e-4` coefficient whose exact residual width is `8e-4` and passes;
- a radial `6e-4` coefficient whose exact residual width is `1.2e-3` and fails;
- a transverse `1e-2` coefficient independently checked against $\sqrt{1+0.01^2}-1$ by the 90-digit Decimal test.

`JointState.cpp` implements aligned shared-symbol subtraction and does not advance unless the existing ordinary radii dominate every per-path affine projection. Its analytic two-path control makes the independent box fail at `4.04082e-2` while the shared-symbol row passes at `8.0016e-4`; an under-sized ordinary fallback is deliberately rejected.

`Krawczyk.cpp` implements the outward-rounded dense Krawczyk image. It independently certifies preconditioner nonsingularity by interval determinant elimination rather than consuming a producer-asserted flag. A nonlinear $z^2-2=0$ control encloses the independent Decimal value $\sqrt 2$, a dense two-row linear control contracts, and a wrong-sign preconditioner fails strict interior containment.

`DelayedRootSensitivity.cpp` certifies the implicit root derivative through the one-sign transmitter-side factor and propagates the emission-time response into the transmitter position. `SharpAccelerationSensitivity.cpp` then certifies the current sharp-root acceleration Jacobian, including transmitter motion and the derivative of the acceleration weight. Independent Decimal controls check both rows and a zero-factor control does not advance.

`CenteredAffine.cpp` implements the explicit-map part of the new representation: a centered mean-value form retains aligned shared coefficients and charges center enclosure, Jacobian variation, input remainder, and floating rounding to a separate outward remainder. A nonlinear square control retains its quadratic residual, while a common translation cancels to the charged rounding floor.

`JointRootBracket.cpp` closes the existence step that a width bound alone does not settle. From an admitted joint residual radius and a one-sign transmitter-side factor over the containing cell, it constructs one common root bracket and requires strict opposite endpoint signs for every shared symbol assignment. `ExactPairBatch.cpp` now consumes that certificate at the MPFR difficult-cell point. It independently recomputes nominal displacement, nominal residual, ordinary fallback radii, cell bounds, and transmitter and receiver factors from its own retained histories; the state producer supplies only the aligned coefficients, remainders, and evaluation center. A control whose independent product box cannot surround the root returns a complete root-free complement and one tolerance-compliant root through `joint_affine_outward_with_mpfr_factor`.

`JointAffineHistory.cpp` now supplies the retained representation consumed by that bridge. Each cubic stores aligned shared-symbol coefficient rows plus separate position and velocity remainders. Point evaluation uses outward interval Horner arithmetic, charges coefficient-evaluation rounding to the remainder, and rejects either position or velocity state when its projection is not dominated by the canonical ordinary radius. The exact-pair consumer can evaluate receiver and transmitter joint histories directly: it chooses a nominal Newton center inside the difficult cell, evaluates the two cubics, and then applies the strict interval theorem. Newton selects the center only; it is not acceptance evidence. `NativeCoupledEvolutionRequest` carries these joint histories by path ID into the small-population exact-pair batches used by Borg.

`JointSharpRow.cpp` supplies the first production population step for those histories. It retains the point sharp-row derivative as the shared acceleration coefficients and uses the interval derivative over the complete ordinary input box to charge Jacobian variation and independent receiver-position, transmitter-position, and transmitter-velocity remainders. Outward subtraction rounding is charged before the input containment check. The row fails unless the affine input lies inside the ordinary position/velocity boxes and the centered acceleration image lies inside the already certified acceleration row. Its analytic derivative control retains the independent `-0.0064` coefficient; a deliberately tight acceleration fallback is rejected.

The shadow flag-isolation process test remains bit-identical across every published and terminal field. The added theorem fields use the versioned `eom_shadow_affine_diagnostic/v2` sidecar and cannot change acceptance.

Validation on the rebuilt current tree passes:

- native CTest: `3/3`;
- native history/root layer including the independent Decimal controls: `32/32`;
- Borg native process and sidecar isolation: `13/13`.

The representative fixed-contract replay was:

```text
node scripts/eom/profile-borg-incremental-chunks.mjs \
  .tmp/eom-native-dev/eom_borg_shadow_cli \
  --certified-budget-id=research-certified-v1 --seed=0 --chunks=100 \
  --history-depth=1.01 --root-details=false \
  --history-error-series=false --summary-only=true --aggregate-only=true \
  --shadow-affine-output=/tmp/borg-current-research-seed0-joint-dominance-20260720.ndjson
```

The profiler emitted a heartbeat while running; no job was detached or left unwatched.

The decomposition ablations used the same command plus, respectively, `--shadow-affine-disable-root-enclosure-symbols=true` and both that flag and `--shadow-affine-disable-acceleration-enclosure-symbols=true`. Both runs halted at the same accepted prefix with the same Research allocation hash.

## Remaining Acceptance Object

The first missing accepted object is:

> Assemble the actual 18-by-18 endpoint-acceleration corrector Jacobian from the certified sharp-row derivatives, use Krawczyk to enclose the implicit remainder, and publish the contracted shared coefficients and remainder with every retained cubic segment. Then consume that state in the `1001/1002` root without changing the preset hash.

The root-time consumer, strict root-bracket theorem, exact-pair difficult-cell bridge, retained joint-cubic evaluator, centered certified sharp-row map, explicit centered form, and generic Krawczyk theorem now exist. The remaining missing upstream objects are summing the live snapshot rows, closing the 18-component implicit endpoint corrector, appending its admitted state, and preserving it in the Borg incremental cache. The literal 300-second requirement remains open.
