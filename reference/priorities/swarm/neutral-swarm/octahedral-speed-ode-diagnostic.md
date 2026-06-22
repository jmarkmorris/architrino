# Octahedral Speed-ODE Diagnostic

Promotion status: `priority-only`. This packet records the executable frozen-ledger speed-ODE diagnostic for the rigid octahedral carrier. It consumes the certified all-pairs root ledger from `scripts/neutral-swarm/octahedral-root-ledger.mjs` and the fixed-speed force convention from [octahedral-force-residual-diagnostic.md](octahedral-force-residual-diagnostic.md), but it does not build a bounded-speed live ledger and does not retain a branch.

Run the diagnostic with:

```bash
node scripts/neutral-swarm/octahedral-speed-ode-diagnostic.mjs --out /tmp/neutral-swarm-octahedral-speed-ode.json --pretty
node scripts/neutral-swarm/octahedral-speed-ode-diagnostic.mjs --validate /tmp/neutral-swarm-octahedral-speed-ode.json --pretty
```

The artifact schema is

$$
\texttt{neutral-braid-octahedral-speed-ode-diagnostic/v1}.
$$

---

## 1. Frozen-Ledger Row

On the rigid fixed-speed ledger, the scalar tangent forcing is

$$
f_i^1(\theta)
=
\mathbf{T}_i(\theta)\cdot
\widetilde{\mathbf{F}}_i(\theta),
$$

where $\widetilde{\mathbf{F}}_i$ is the all-pairs force row from [octahedral-force-residual-diagnostic.md](octahedral-force-residual-diagnostic.md). The frozen-ledger speed primitive with diagnostic scale $\Gamma$ is

$$
A_i(\theta)
=
\Gamma
\int_0^\theta f_i^1(s)\,ds.
$$

A periodic speed factor can be certified on this frozen ledger only if

$$
\int_0^{2\pi}
f_i^1(\theta)\,d\theta
=0
$$

for every receiver site, before the speed-band and clock/length rows are considered. This is weaker than the fixed-speed pointwise tangent row, but it is still a real closure condition.

---

## 2. Current Executable Verdict

With the default periodic half-open phase mesh, the diagnostic validates as:

| Row | Current executable result |
| --- | --- |
| Source root ledger | `all-pairs-root-ledger-certified` |
| Bounded-speed live-ledger handoff | `bounded-speed-ledger-handoff-open` |
| Mean-split certificate | `frozen-fixed-ledger-mean-obstruction` |
| Speed-ODE zero-mean row | `sampled-speed-ode-zero-mean-failed` |
| Periodic primitive row | `sampled-periodic-primitive-failed` |
| Retention | `not_retained` |

The sampled mean is the same for all six receiver sites:

$$
\frac{1}{2\pi}
\int_0^{2\pi}
f_i^1(\theta)\,d\theta
\approx
0.18420699635,
$$

so

$$
\int_0^{2\pi}
f_i^1(\theta)\,d\theta
\approx
1.15740669293.
$$

The mean-split row shows the source of the obstruction:

$$
\langle f_{i,\mathrm{partner}}^1\rangle
\approx
0.18420699635,
\qquad
\langle f_{i,\mathrm{cross}}^1\rangle
=0.
$$

Thus the cross-binary rows cancel in the certified frozen period mean, while the antipodal-partner row leaves a positive drift. The artifact still uses `sampled-speed-ode-zero-mean-failed` and `sampled-periodic-primitive-failed` as diagnostic status labels because the primitive and extrema are evaluated by the executable mesh. For $\Gamma=1$, the sampled primitive endpoint is

$$
A_i(2\pi)
\approx
1.15740669293,
$$

so the primitive is not periodic.

The diagnostic now emits a `mean_split_certificate` object. The antipodal-partner part is analytic on the certified root bracket. If $y_*$ is the constant partner root, then

$$
2\cos\frac{y_*}{2}-y_*=0,
\qquad
J_*=1+\sin\frac{y_*}{2},
$$

and the partner tangent contribution is

$$
\boxed{
\left\langle f_{i,\mathrm{partner}}^1\right\rangle
=
\frac{\sin y_*}{y_*^3\left(1+\sin(y_*/2)\right)}
\approx
0.18420699635.
}
$$

This certifies the positive partner drift away from zero on the frozen ledger. The cross-binary part is certified by the phase anti-periodicity lemma

$$
C_i\left(\theta+\frac{\pi}{2}\right)=-C_i(\theta),
\qquad
C_i(\theta)=f_{i,\mathrm{cross}}^1(\theta),
$$

using the two certified cross-binary reduced root graphs from [octahedral-root-ledger-certification-target.md](octahedral-root-ledger-certification-target.md). Therefore

$$
\int_0^{2\pi}f_{i,\mathrm{cross}}^1(\theta)\,d\theta=0.
$$

The executable still emits sampled anti-periodicity checksum rows for audit, but the mathematical cross-binary mean cancellation is now the certified frozen-ledger input. This remains a fixed-ledger statement, not a bounded-speed live-ledger result.

---

## 3. Interpretation

This diagnostic closes only the frozen fixed-ledger speed-ODE overread:

$$
\texttt{closed-rejected:frozen-fixed-ledger-speed-primitive}.
$$

The rejected implication is that the certified rigid root ledger and nonzero tangent force can be converted into a periodic bounded-speed primitive while keeping the rigid geometry, fixed-speed roots, fixed-speed Jacobians, and fixed force weights frozen.

It does not reject bounded-speed continuation in general. A true bounded-speed candidate must rebuild the clocks, roots, Jacobians, derivative columns, tail interface, force checksum, support rows, action/Noether rows, event rows, and coupled Krawczyk data on one live ledger as required by [Bounded Speed Factor All Pairs Ledger Handoff Contract](../shell-swarm/bounded-speed-factor-all-pairs-ledger-handoff-contract.md) and [Bounded Speed Factor Coupled Fixed Point Theorem](../shell-swarm/bounded-speed-factor-coupled-fixed-point-theorem.md).

The companion intake script `scripts/neutral-swarm/octahedral-zero-mean-correction-intake.mjs` consumes this diagnostic and packages the frozen source vector as $\mathbf{m}_{\mathrm{frz}}=m_*\mathbf{1}_6$ for the live range condition. That bridge still leaves `live-ledger-derivative-open` and `zero-mean-correction-open`.

The next surviving route is therefore not a frozen speed primitive on the rigid carrier. It is either:

1. a bounded-speed live-ledger rebuild where $G_r^\nu$, $J_r^\nu$, $F_i^\nu$, and the speed primitive are solved together; or
2. a deformed support-band, phase-offset, or case-reduction candidate whose tangent forcing is recomputed on its own all-pairs ledger.
