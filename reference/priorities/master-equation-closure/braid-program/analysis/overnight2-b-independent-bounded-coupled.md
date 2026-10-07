# Independent bounded coupled period-obstruction review

## Scope and known-first record

This review independently adjudicates [the bounded coupled subject](overnight2-b-bounded-coupled-obstruction.md): a region theorem for regular periodic solutions of the normalized instantaneous limiting equation, followed by its implication for exact canonical slow families with finite positive scale limit. No numerical shooting output or proposed orbit membership is used as evidence. The parent owns integration; frozen subjects, earlier oracles and shared owners remain unchanged.

The [independent rational instrument](overnight2-b-independent-bounded-coupled.py) uses a freshly authored interval class with exact `Fraction` endpoints, signed corner multiplication and reciprocal division. Square-root bounds come from 80 exact dyadic bisections, not the subject's integer-square-root decimal grid. The independent scalar cover is predeclared as 256 equal subintervals, and evaluates the full natural interval expression for $G$ rather than the subject's monotonic endpoint formula. It imports no subject or earlier instrument.

Before target use, the known stage exited zero at 2026-10-07 04:21:45 UTC under the executable shared venv with all three numerical-thread environment variables set to one. It checked signed interval multiplication, negative interval division, exact rational addition, exact square roots at $4$ and $9/16$, the separately specified rational bracket $(1.4142,1.4143)$ for $\sqrt2$, $J(0)=0$, $J(1)=21/40$, and the exact circular-limit range $1<G(0)<11/10$. Internal elapsed time was 0.000825 seconds by `time.perf_counter()`. The original known receipt is retained as `.local-data/master-equation-closure/overnight2-b/independent-bounded-coupled/known.json`. The known-stage instrument identity is `b62c42242a5bb22af17e3b974764a306f2579821734f82781bd0ba458ed8daeb`. This pass is recorded before the target cover.

## Verdict and independent reconstruction

**Derived and independently accepted within the stated domain.** Every regular radial/axial periodic solution of the normalized limiting equation satisfying all the declared geometric, angular and period bounds obeys
$$
W_\chi\ge\frac{379439}{8467200}>\frac1{25}.
$$
No mathematical repair to the frozen bounded-region theorem is required. The strict scalar positivity was established by the independent continuous rational enclosure below. The result consequently excludes these orbits as finite-positive-scale limits of exact canonical slow families satisfying the convergence and uniformity hypotheses of the [independently reconstructed coupled-period conditions](overnight2-b-independent-coupled-period.md). It is not an existence claim, an orbit-membership certificate or a finite-speed threshold.

Use $K=c_f=1$. Dots denote derivatives in the normalized time $\chi$, not physical time or an unnormalized slow phase. Set $u=\dot r$, $v=\dot z$, $w=\ell/r$ and $h=z/r$. The simultaneous canonical acceleration obtained from the five partners is
$$
A_r^{(0)}=\frac1{\sqrt3r^2}-\frac{r}{(r^2+4z^2)^{3/2}}-\frac{r}{4(r^2+z^2)^{3/2}},
$$
$$
A_z^{(0)}=-\frac{4z}{(r^2+4z^2)^{3/2}}-\frac{z}{4(r^2+z^2)^{3/2}}.
$$
The limiting equation is $\ddot r=w^2/r+A_r^{(0)}$, $\ddot z=A_z^{(0)}$. The independently reconstructed first-order mean is
$$
W_\chi=\left\langle\frac{Pu^2+2Quv+Sv^2+Cw^2}{r^2}\right\rangle_\chi,
$$
with
$$
P=-\frac1{1+4h^2}-\frac1{(1+4h^2)^2}+\frac23+\frac{h^2-1}{4(1+h^2)^2},
$$
$$
Q=-\frac{4h}{(1+4h^2)^2}-\frac{h}{2(1+h^2)^2},
$$
$$
S=\frac{2(1-4h^2)}{(1+4h^2)^2}+\frac23+\frac{1-h^2}{4(1+h^2)^2},\qquad
C=\frac{2-4h^2}{(1+4h^2)^2}-\frac23+\frac1{4(1+h^2)}.
$$
The mixed coefficient is symmetric; its quadratic contribution is $2Quv$. The velocity and mean normalizations matter: under the finite-positive-scale reduction $R\epsilon^2\to\lambda>0$, $\chi=\eta/\sqrt\lambda$ and $W_\chi=\lambda W$. Thus the necessary zero mean survives this normalization, while the numerical bounds on $T$ and $\ell$ must be imposed in this same time coordinate.

For $a_0=19/12$ and $\Phi=a_0\log r+f(h)$ with the stated $f$, direct differentiation gives
$$
f'=\frac{2h}{1+4h^2}+\frac{h}{4(1+h^2)},\qquad f''=S-\frac23,
$$
$$
r\Phi_r=a_0-hf',\quad r\Phi_z=f',\quad r^2\Phi_{rr}=-a_0+2hf'+h^2f'',\quad r^2\Phi_{rz}=-f'-hf'',\quad r^2\Phi_{zz}=f''.
$$
Substitution into the displayed rational coefficients gives exactly
$$
P-r^2\Phi_{rr}=\frac{6h^2}{1+4h^2},\quad Q-r^2\Phi_{rz}=0,\quad S-r^2\Phi_{zz}=\frac23,\quad C-r\Phi_r=-B(h),
$$
where $B(h)=6h^2(3+4h^2)/(1+4h^2)^2$. These are identities, with no approximation in speed or height at this stage.

A regular periodic solution has periodic positions and velocities; $r\ge1$ keeps $\Phi$ smooth. Therefore $\langle\ddot\Phi\rangle_\chi=0$. The chain rule contains the centrifugal term $\Phi_rw^2/r$ as well as $\nabla\Phi\cdot A^{(0)}$. Removing this total derivative from the quadratic mean produces
$$
W_\chi=\left\langle\frac{6h^2u^2}{r^2(1+4h^2)}+\frac{2v^2}{3r^2}-\frac{B(h)w^2}{r^2}+\frac{G(h^2)}{r^3}\right\rangle_\chi.
$$
To check the last sign and power independently, write $x=h^2$ and $J=hf'=2x/(1+4x)+x/[4(1+x)]$. Then
$$
-\nabla\Phi\cdot A^{(0)}=r^{-3}\left[\frac{J-a_0}{\sqrt3}+\frac{a_0+3J}{(1+4x)^{3/2}}+\frac{a_0}{4(1+x)^{3/2}}\right]=r^{-3}G(x).
$$
In the last denominator the $J$ contributions cancel; in the middle denominator they add to $3J$. This directly verifies the consequential sign of the acceleration term.

## Continuous scalar enclosure and period margin

The subject's scalar lower-bound construction is valid: $J'>0$, $0\le J<3/4<a_0$, so the negative first numerator requires a lower bound for $\sqrt3$, whereas the two positive terms require upper bounds for their denominator roots. Its adjacent closed rational cells cover the declared interval. Independent acceptance here instead uses a natural interval evaluation of the full expression on 256 cells. For each rational square-root argument the independent bisection maintains $L^2\le q\le U^2$, and every rational operation encloses all values of its operands. Denominators are positive. Dependency overestimation can widen an interval but cannot invalidate inclusion.

The target exited zero at 2026-10-07 04:22:05 UTC after the recorded known pass. All 256 closed cells covering $[0,5929/10000]$ returned a strictly positive lower bound. Their minimum is the exact rational
$$
\frac{249764169122847844132003989737665723151065689122142376819744410184823801154371584}{27868910933941843515016836036266601977936175683959063149048233677106949506216897243}>0.
$$
Its decimal display is approximately $0.008962107264071715$; the proof uses the fraction, not the display. Every cell and both endpoints of every computed $G$ enclosure remain in the target receipt. This establishes positivity on the continuous region, not merely at sampled points.

For the angular coefficient, direct simplification yields
$$
\frac{27}{16}-B(h)=\frac{3(4h^2-3)^2}{16(1+4h^2)^2}\ge0.
$$
Consequently $1\le r\le6/5$ and $|\ell|\le3/20$ imply
$$
\frac{2}{3r^2}\ge\frac{25}{54},\qquad \frac{B(h)w^2}{r^2}=\frac{B(h)\ell^2}{r^4}\le\frac{243}{6400}.
$$
Let $T>0$ be a complete radial/axial period. On its two cyclic arcs joining a maximum and a minimum of $z$, total variation is at least twice the height range. The two stated extrema therefore imply
$$
\int_0^T|v|\,d\chi\ge2(\max z-\min z)\ge4\frac{37}{50}.
$$
Cauchy–Schwarz and $T\le7$ now give
$$
\langle v^2\rangle_\chi\ge\frac{16(37/50)^2}{T^2}\ge\frac{5476}{30625}.
$$
Discarding the nonnegative radial term and the positive scalar term in the exact identity gives
$$
W_\chi\ge\frac{25}{54}\frac{5476}{30625}-\frac{243}{6400}=\frac{379439}{8467200}>\frac1{25}.
$$
The companion independently checks these rational constants. The positive $G$ contribution could strengthen this inequality, but is unnecessary for the stated margin.

## Scope, falsifiers and retained validation

The theorem requires regular periodic solutions of the normalized limiting differential equation, a positive full period, and every displayed bound holding across that period. A periodic coordinate trace alone without the equation does not license the total-derivative substitution. Relative periodicity is sufficient: the absolute azimuth need not close after one radial/axial period. No simultaneous-turning-point assumption, Fourier truncation or numerical shooting result enters the proof.

For its slow-family consequence, retain the canonical equation, complete ordinary-root coverage in the slow subwake limit, uniform profile bounds and derivative convergence sufficient for the previously established limiting equation and necessary mean. The finite positive scale limit is essential. The result does not address degenerate scale limits, arbitrary finite-speed configurations, or coupled limiting orbits outside this region. It neither establishes nor denies the existence of limiting-equation orbits inside the region; it excludes their use as limits of exact canonical slow families under the specified hypotheses. No numerical proposal's region membership was reviewed.

Operator-checkable falsifiers are: a failure of one displayed rational Hessian identity; an incorrect sign or power of $r$ in the substitution of $A^{(0)}$; an invalid rational square-root bracket or uncovered scalar cell in the independent receipt; failure of the periodic variation estimate; or a regular solution satisfying all stated bounds but with $W_\chi\le1/25$. A finite-speed example without the required limiting convergence would not falsify this theorem. Remaining obligations are extension beyond the declared region and any separately requested verified orbit membership or finite-speed threshold; none is claimed here.

Validation was limited to this derivation and the short, separately authored exact arithmetic instrument. The target's internal elapsed time was 0.105837 seconds by `time.perf_counter()`; known and target commands completed synchronously with exit zero and launched no background job. Peak memory was not profiled, so no empirical peak-memory claim is made. No regular test suite, generator, Git mutation, numerical shooting run or additional reviewer was used.

All receipts are retained locally under `.local-data/master-equation-closure/overnight2-b/independent-bounded-coupled/`; no deletion, movement, replay or remote-backup claim is made. SHA-256 provenance is:

| Item | SHA-256 |
| --- | --- |
| Frozen subject Markdown | `ad0707b1bd661ed09b7145b0543f37b2139598bc8cbdeb88f2ddf74850c6cbeb` |
| Frozen subject instrument | `47f7341086a33ef6f5f81a2f8762d7d8a04446db229e79ade9af1981f7474c38` |
| Independent instrument | `b62c42242a5bb22af17e3b974764a306f2579821734f82781bd0ba458ed8daeb` |
| Independent known receipt | `07f383bda10e65964f23ef2bd2e151c13fd021f4d54c2c8c9a1e901628dc625f` |
| Independent target receipt | `b5af322155e1f8e2961f234e82cdc57a5139e95cafd9fffe027ffa66cfca2250` |

The only authored deliverables of this bounded review are this document and its independent Python companion. Frozen subjects, previous independent oracles, parent reports and shared owners were not edited. The parent owns integration and disposition of the larger research allocation.

Final scoped validation: the shared-venv built-in `compile` accepted the companion without creating bytecode; `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for either new deliverable (exit one denotes the new-file difference). `shasum -a 256` reproduced all five provenance hashes above after the work. By `wc -lc`, the original known receipt is 20 lines and 627 bytes and the target receipt is 2,578 lines and 133,154 bytes. These retained local receipts and the tracked reproducer support the bounded result; they do not assert remote evidence availability.
