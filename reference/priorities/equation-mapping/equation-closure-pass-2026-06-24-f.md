# Equation Closure Pass 2026-06-24 F

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: conservative equation-inventory addition
- Promotion status: priority-only

## Change Summary

This pass adds `EQ-04A` for the Koide charged-lepton mass relation:

$$
\frac{
\left(\sqrt{m_e}+\sqrt{m_\mu}+\sqrt{m_\tau}\right)^2
}{
m_e+m_\mu+m_\tau
}
\approx
\frac{3}{2}.
$$

The row is placed next to `EQ-04` because it should consume the same generation-by-shielding, exposure, internal-energy, and Noether sea mass-response machinery. It is not a standalone numerology target.

## Score Decision

`EQ-04A` enters the table at score `1` in both current score columns.

Reason: the particle-mass material already records Koide as a speculative charged-lepton benchmark, but there is not yet an accepted charged-lepton retained branch family or shared mass map that predicts $m_e$, $m_\mu$, and $m_\tau$ before Koide is checked.

No existing equation scores change.

## Closure Rule

The row can advance only if a single charged-lepton mass map first predicts

$$
M_{\ell,0}(\theta),\quad
M_{\ell,1}(\theta),\quad
M_{\ell,2}(\theta)
$$

from one retained branch family and one exposure/shielding/Noether sea response record. Koide is then evaluated as the post-prediction residual

$$
\mathcal R_{04A}^{\mathrm{Koide}}(\theta)
=
\left|
\frac{
M_{\ell,0}+M_{\ell,1}+M_{\ell,2}
}{
\left(
\sqrt{M_{\ell,0}}
+
\sqrt{M_{\ell,1}}
+
\sqrt{M_{\ell,2}}
\right)^2
}
-
\frac{2}{3}
\right|.
$$

If $\theta$ is selected by minimizing this residual directly, the row remains comparison-only and cannot justify score movement.

## Files Updated

- [Equation Mapping Detail](equation.md)
- [Equation Mapping Internal Priority](equation-mapping.md)
- [Equation Score-5 Closure Ladder](equation-score-5-closure-ladder.md)
- [EQ-04A Koide Charged-Lepton Mass Relation](eq-04a-koide-charged-lepton-mass-relation.md)

## Next Action

Build a score-neutral residual evaluator or proof packet that consumes a declared charged-lepton generation-by-shielding mass record and reports `no_score_increase` unless the masses are non-Koide predictions from one shared map.
