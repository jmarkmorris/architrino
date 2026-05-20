# Field-Speed Head-On Finite-History Report

## Scope

This report extends the in-flight wake root audit into a finite-history dual-mollified calculation for the exact affine field-speed head-on seed. It is a theory-success marker for the boundary case, not a candidate-cycle or branch-chart authorization.

Artifacts:

- `field_speed_head_on_finite_history_input.v0.json`
- `field_speed_head_on_finite_history_result.v0.json`
- `../../../../../scripts/proof-programs/field-speed-head-on-finite-history.mjs`

## Executed Command

```bash
node scripts/proof-programs/field-speed-head-on-finite-history.mjs --input reference/priorities/proof-programs/breather-proof/certificate/field_speed_head_on_finite_history_input.v0.json --out reference/priorities/proof-programs/breather-proof/certificate/field_speed_head_on_finite_history_result.v0.json --pretty
```

## Result

The evaluator returned:

| Field | Value |
| --- | --- |
| `status` | `finite_history_formula_evaluated_pre_origin` |
| `claim_level` | `closed-form finite-history dual-mollified acceleration for affine field-speed pre-origin history` |
| `theory_success_marker` | `closed_form_field_speed_self_continuum_regularized_acceleration` |
| `candidate_cycle_authorized` | `false` |
| `branch_chart_authorized` | `false` |
| `updates_live_ledger` | `false` |
| shell mollifier | compact $C^1$ polynomial $\delta(z)=15(1-z^2)^2/16$ on $|z|\le1$ |
| $\delta_\eta(0)$ for $\eta=0.02$ | `46.875` |
| partner shell value at $t=0$ | exactly `0`; the partner shift is outside compact support |
| continuous $H\to\infty$ right self acceleration | `-1472.6215563702156` |

For the sampled horizons, the continuous right-receiver acceleration moves from about `-1287.5632` at $H=0.25$ to about `-1471.1567` at $H=32$, approaching the closed-form horizon limit above. The raw countable-emission comparison with cadence $1$ approaches the corresponding discrete same-source sum and remains a comparison row only; it is not a continuum limit.

## Mathematical Advance

For the right Positrino before the origin caustic, set
$$
\Delta(t)=2(x_0-c_ft).
$$
The same-source continuum contributes
$$
a_R^{\mathrm{self}}(t;H,\eta,\epsilon_c)
=
-g\,\delta_\eta(0)
\int_0^H
\frac{du}{c_f^2u^2+\epsilon_c^2}
=
-\frac{g\,\delta_\eta(0)}{c_f\epsilon_c}
\arctan\!\left(\frac{c_fH}{\epsilon_c}\right).
$$
The partner in-flight tail contributes
$$
a_R^{\mathrm{partner}}(t;H,\eta,\epsilon_c)
=
-g\,\delta_\eta(\Delta(t))
\int_0^H
\frac{du}{(\Delta(t)+c_fu)^2+\epsilon_c^2}
$$
or
$$
a_R^{\mathrm{partner}}
=
-\frac{g\,\delta_\eta(\Delta(t))}{c_f\epsilon_c}
\left[
\arctan\!\left(\frac{\Delta(t)+c_fH}{\epsilon_c}\right)
-
\arctan\!\left(\frac{\Delta(t)}{\epsilon_c}\right)
\right].
$$

Thus the infinite-history limit is finite for fixed $\eta$ and $\epsilon_c$:
$$
a_R^{\mathrm{self}}(\infty,\eta,\epsilon_c)
=
-\frac{\pi g\,\delta_\eta(0)}{2c_f\epsilon_c}.
$$
For the compact polynomial certificate candidate
$$
\delta(z)=\frac{15}{16}(1-z^2)^2
$$
on $|z|\le1$ and zero outside,
$$
\delta_\eta(0)=\frac{15}{16\eta},
$$
so
$$
a_R^{\mathrm{self}}(\infty,\eta,\epsilon_c)
=
-\frac{15\pi g}{32c_f\eta\epsilon_c}.
$$
The same expression diverges as
$$
O\!\left(\frac{1}{\eta\epsilon_c}\right)
$$
as $\eta,\epsilon_c\to0$.

At $t=0$ with $x_0=1$ and $\eta=0.02$, the partner separation is $\Delta(0)=2$. Since $\eta<\Delta(0)$, the compact partner shell factor $\delta_\eta(\Delta(0))$ is exactly zero. This removes the non-compact-tail ambiguity and leaves the same-source continuum as the obstruction.

## Consequence

The countable-infinity intuition is not rejected because the past history is long. It is rejected as an exact seed because the field-speed same-source continuum has no regulator-independent acceleration. For fixed regulators, the infinite-history integral saturates; when the regulators are removed, the self-continuum diverges. Therefore an acceptable head-on seed needs a preparation mechanism that removes the exact $v=c_f$ continuum before the branch chart is allowed: dephasing, curvature, held-release preparation, finite-width preparation, or a solved branch-certified history.

## Capture Decision

Promote the formula-level result into `content/markdown/aaa/proof-programs/collinear-breather.md` as a field-speed boundary theorem target. Keep the numeric fixture and command output priority-side. This is a true theory advance because it replaces the qualitative in-flight wake concern with a closed-form regularized acceleration and a regulator-limit obstruction.
