# planar common-center three-binary constraint Fixed Axial-Translation Certificate

Date: 2026-08-29
Compatibility identifier: `aaa-corpus-advancement`
Status: accepted bounded-nonexistence certificate for fixed axial-translation interval certificate task
Reader-facing owner: [Planar (2D) Braid Assemblies](../../../../content/markdown/aaa/noether-braid/2d-braid-assemblies.md#fixed-axial-translation-study)
General B1 geometry owner: [coincident-axis three-binary configurations axial translation](../../../../content/markdown/aaa/noether-braid/3d-braid-assemblies.md#axial-translation)

## Decision

No equal-radius, regular-phase planar common-center three-binary constraint prescribed screw-path balance exists at fixed axial group speed $s_{mathrm{grp}}=0.1c_f$ on $2.3743071761\leq\beta_f\leq3.5743071761$. The conclusion is computer-assisted derived: an exact reduction maps the translated tangential residual to the already certified stationary planar common-center three-binary constraint ledger, and an independent outward-rounded interval evaluation proves that the remaining tangential-axial residual norm is greater than $0.5362197437481839991$ throughout the declared domain. The domain contains three causal-root folds; the fold points have zero transversality and divergent same-sign newborn contributions, while certified right neighborhoods have fixed nonzero tangential residual.

Plainly: changing the transverse speed and compatible radius cannot repair the fixed $0.1c_f$ translation. The complete delayed acceleration always retains either a sideways error, an axial error, or both. The result closes this one fixed-speed search window, not every possible translation speed.

## Measured Predecessor

The earlier binary64 diagnostic held the regular phases and $s_{mathrm{grp}}=0.1c_f$ fixed. At the stationary T04 transverse speed $\beta_f=2.974307176117306$, the original stationary radius $R/R_*=0.5617317000713459$ gave radial, tangential, and axial residuals $(2.7828807183,0.9764357759,-0.6131383055)$. Choosing $R/R_*=0.2471576065$ cancelled only the radial component. The complete ordinary-root inventory remained 72. A 1,201-point nearby continuation plus fold probes found no common zero, but finite sampling did not exclude an unsampled solution. Its frozen result has SHA-256 `145b29e3986478813eb36731bd0f2df358b32ae52170723a65336754d63a6538`; its frozen implementation has SHA-256 `b08c9aedc24e8375fa1ff4c316c69e87000d7edfe0f4ee7d48e99aa0313ea61c`.

Plainly: the first study discovered the obstruction and supplied the candidate zero locations. It did not prove that no other speed between its samples worked.

## Exact Screw-Path Reduction

Set

$$
u=\frac{s_{\mathrm{grp}}}{c_f}=0.1,
\qquad
\gamma=\sqrt{1-u^2},
\qquad
b=\frac{\beta_f}{\gamma}.
$$

For receiver-transmitter phase difference $\Delta$ and angular delay $\chi=|\Omega|(T_r-T_t)$, the screw-path causal condition is

$$
2\beta_f\left|\sin\left(\frac{\Delta+\chi}{2}\right)\right|
=
\gamma\chi.
$$

It is therefore exactly the stationary circular-path root equation at effective transverse speed $b$:

$$
\chi
=
2b\left|\sin\left(\frac{\Delta+\chi}{2}\right)\right|.
$$

Plainly: fixed axial translation does change the causal geometry, but in this equal-radius axial chart it changes it in a controlled way. Dividing the transverse speed by $\gamma$ maps every translated causal root to one stationary circular root with the same phase channel and integer root level.

Let $\hat{\mathbf d}_0$ and $\mathbf v_0$ be the stationary causal direction and transmitter velocity at speed $b$. The translated quantities satisfy

$$
\hat{\mathbf d}
=
(\gamma\hat{\mathbf d}_{0,\perp},u),
\qquad
\mathbf v
=
(\gamma\mathbf v_{0,\perp},u),
$$

so the emission factor and causal separation obey

$$
1-\hat{\mathbf d}\mathbin{\cdot}\mathbf v
=
\gamma^2\left(1-\hat{\mathbf d}_0\mathbin{\cdot}\mathbf v_0\right),
\qquad
r=\frac{r_0}{\gamma}.
$$

The two powers of $\gamma$ cancel in the scalar acceleration weight $1/(r^2|1-\hat{\mathbf d}\cdot\mathbf v|)$. Consequently,

$$
a_r^{\mathrm{tr}}(\beta_f,u)
=
\gamma a_r^{\mathrm{circ}}(b),
\qquad
a_t^{\mathrm{tr}}(\beta_f,u)
=
\gamma a_t^{\mathrm{circ}}(b).
$$

Plainly: translation leaves each signed scalar acceleration weight unchanged after the speed remapping. It multiplies the radial and tangential directions by $\gamma$ and adds one axial component. Because $\gamma$ is strictly positive, the translated tangential residual vanishes at exactly the mapped stationary tangential zeros—no additional tangential zero can hide between samples.

For integer root level $m$ and its stationary root coordinate $v_m$, the translated axial coefficient is

$$
a_z^{\mathrm{tr}}(\beta_f,u)
=
u\sum_m
\frac{(-1)^m}
{4\sin^2v_m\,|b\cos v_m-1|}.
$$

Where the stationary radial coefficient is inward, the unique positive compatible radius is

$$
\frac{R_{\mathrm{tr}}}{R_*}
=
-\frac{a_r^{\mathrm{tr}}}{\beta_f^2}
=
\frac{1}{\gamma}\frac{R_{\mathrm{circ}}(b)}{R_*}.
$$

Plainly: radius remains an algebraic output rather than a second independent search direction. Every possible full translated balance must first be one of the already certified stationary tangential zeros after the exact speed remapping.

## Outward-Rounded Domain Certificate

The declared transverse domain maps to

$$
2.3862684970218133124
<
b
<
3.5923138753328678031.
$$

The frozen stationary interval receipt proves that this mapped domain contains exactly one tangential zero, the T04 zero. Mapping its outward-rounded bracket back to translated speed gives

$$
2.95939827433277403511221251179364328
<
\beta_f
<
2.95939827433277403511221251179364497.
$$

At that entire bracket the translated compatible radius and axial residual satisfy

$$
0.56456160060149250752877405249224746
<
\frac{R}{R_*}
<
0.56456160060149250752877405249242015,
$$

$$
-0.90436553591877968626800461058875866
<
\mathcal R_z
<
-0.90436553591877968626800461058859418.
$$

Plainly: the only speed that removes the sideways error has a well-defined positive radial scale, but its axial error is rigorously negative and far from zero. It therefore cannot be a full balance.

The continuous-domain pass covered the regular T02, T03, T04, and T05 pieces and the three intervening fold neighborhoods. After radial elimination it certified

$$
\sqrt{\mathcal R_t^2+\mathcal R_z^2}
>
0.53621974374818399910424108224171645
$$

everywhere a finite ordinary-root residual exists in the declared domain. At each fold, zero transversality makes the acceleration weight divergent, and the same-sign newborn-pair estimate excludes a cancelling finite balance through the certified right neighborhood.

Plainly: the proof covers the continuous interval and its topology changes, not a denser grid. The smallest certified remaining sideways-or-axial error is still more than one-half in the normalized residual units.

## Evidence Independence and Reproducibility

The new interval oracle imports no prescribed-path subject implementation. It consumes the frozen stationary planar common-center three-binary constraint interval receipt with SHA-256 `fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af` and its independently authored outward-rounded oracle with SHA-256 `b16ea1f0137ccbf5349012fb341a461c4af89b5ad968fe1d4151212ebfa582f4`. It implements the exact screw-path reduction and axial signed-weight sum with 80-decimal `mpmath 1.3` `libmpi` interval arithmetic. The certificate script has SHA-256 `672572e3d8a80321260c70276778b2c35059546eee5ab5e906b88afb4e924677`; two consecutive runs reproduced the result artifact byte for byte at SHA-256 `135e6b73f83c3427f56ef5bf717d8b133da8b993b94b92329ead80c5c0dd88af`.

The earlier binary64 discovery placed the mapped tangential zero at $\beta_f=2.95939827433297$, with axial residual $-0.9043655358975944$, compatible scale $0.5645616005787141$, and 72 roots. Those values independently agree with the interval result at their declared discovery precision. This agreement checks the implementation of the exact reduction and ledger; the algebra above is the authority for the reduction itself.

Plainly: an earlier evaluator found the same obstruction numerically, while a separately authored interval calculation now proves it across the whole domain. Repeating the interval run produced exactly the same evidence file.

## Claim Grade, Boundary, and Falsifier

> Claim grade: computer-assisted derived bounded nonexistence. The result applies only to equal radii, regular planar common-center three-binary constraint phases, common circulation, $c_f=1$, fixed axial group speed $s_{\mathrm{grp}}=0.1c_f$, and $2.3743071761\leq\beta_f\leq3.5743071761$. It does not exclude balances at another translation speed, unequal radii, deformed phases, non-axial translation, or another B1 chart. It establishes no release, retention, stability, binding, physical identity, or scientific acceptance. A root-complete common zero of the radial, tangential, and axial residuals inside the declared domain, an invalid stationary zero count, a failure of the exact screw-path reduction, or a failure of outward rounding overturns the conclusion.

Plainly: this one fixed-speed slice is closed. The broader translation-speed chart remains open, and even a future prescribed screw-path balance would still need separate dynamical survival tests.
