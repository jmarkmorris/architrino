# Octahedral Fold-Aware Representative Profile Decomposition

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-clock-length-chart-closure-proof](octahedral-fold-aware-clock-length-chart-closure-proof.md) and [octahedral-fold-aware-zero-bracket-certificate](octahedral-fold-aware-zero-bracket-certificate.md). The chart-closure packet reduces the receiver-orbit interval burden to one representative row. This packet decomposes that representative row for receiver $1+$ and proves that the antipodal-partner contribution is pointwise null at the certified partner zero.

It does not certify the cross-binary interval profile, clock/length return, bounded-speed live ledger, or retained branch.

Its direct successor is [octahedral-fold-aware-cross-binary-quarter-profile-certificate](octahedral-fold-aware-cross-binary-quarter-profile-certificate.md), which turns the quarter-shift identity into full-period primitive extrema, mean, centered excursion, and sampled clock positivity formulas.

## Representative Decomposition

For the representative receiver $1+$, write the scalar fold-aware forcing as

$$
f_{1+}^{\mathrm{fold}}(u;v)
=
f_{\mathrm{partner}}(u;v)
+
f_{\times}(u;v),
$$

where $f_{\mathrm{partner}}$ is the source row $1+\leftarrow1-$ and $f_{\times}$ is the sum over sources

$$
\{2+,2-,3+,3-\}.
$$

No fixed speed window is imposed:

$$
\texttt{speed\_constraint=none}.
$$

The only speed input is the certified positive speed-ratio zero enclosure

$$
3.02156\le v_*\le3.02157,
\qquad
v_*\approx3.021564740248.
$$

All positive roots are included. Cross-binary rows remain under the coarea convention; they are not replaced by a dropped-root one-root ledger.

## Partner Pointwise Null Lemma

For receiver $1+$, use

$$
p(\theta)=(\cos\theta,\sin\theta,0),
\qquad
T(\theta)=(-\sin\theta,\cos\theta,0).
$$

The antipodal partner is

$$
p_-(\theta-\delta)=-p(\theta-\delta).
$$

At trace scale $s=v$ and period ratio $h=1$, the partner displacement is

$$
R(\theta,\delta)
=
v\left(p(\theta)+p(\theta-\delta)\right)
=
2v\cos x\,p(\theta-x),
\qquad
x=\delta/2.
$$

The causal-root equation becomes

$$
|R|=\delta
\quad\Longleftrightarrow\quad
x=vq\cos x,
\qquad
q=\operatorname{sgn}(\cos x).
$$

Thus the regular three-root partner sheet is exactly

$$
x-v\cos x=0,
\qquad
x\in(0,\pi/2),
$$

and

$$
x+v\cos x=0,
\qquad
x\in(\pi/2,v),
\qquad
v<\pi,
$$

with one positive-cosine root and two negative-cosine roots throughout the certified bracket.

The unit displacement is

$$
\widehat R=q\,p(\theta-x),
$$

so

$$
T(\theta)\cdot\widehat R
=
-q\sin x.
$$

For the antipodal partner source, the force sign is $-1$. Therefore each partner-root scalar tangential contribution is

$$
S_\alpha(v)
=
\frac{q_\alpha\sin x_\alpha}
{4x_\alpha^2|1+x_\alpha\tan x_\alpha|}.
$$

This expression is independent of $\theta$. The zero-bracket period contribution for the same root is

$$
P_\alpha(v)
=
\frac{\pi\tan x_\alpha}
{2x_\alpha|1+x_\alpha\tan x_\alpha|}.
$$

Using $x_\alpha=vq_\alpha\cos x_\alpha$ gives the proportionality

$$
\boxed{
P_\alpha(v)=2\pi v\,S_\alpha(v).
}
$$

Summing over the three partner roots,

$$
\boxed{
P_{\mathrm{all}}(v)
=
2\pi v\,S_{\mathrm{partner}}(v).
}
$$

Because $v>0$, the certified zero

$$
P_{\mathrm{all}}(v_*)=0
$$

implies

$$
\boxed{
f_{\mathrm{partner}}(u;v_*)=S_{\mathrm{partner}}(v_*)=0
\quad\text{for every }u.
}
$$

This is a pointwise null result, not merely a zero-period-mean result.

## Cross-Binary Remainder

At the certified zero, the representative profile reduces to

$$
\boxed{
f_{1+}^{\mathrm{fold}}(u;v_*)
=
f_{\times}(u;v_*).
}
$$

The remaining representative interval profile is therefore the cross-binary coarea row

$$
f_{\times}(u)
=
\sum_{j\in\{2+,2-,3+,3-\}}
\sum_{\alpha\in\mathcal R^+_{1+,j}(u)}
\frac{\sigma_{1+j}\,T_{1+}(u)\cdot\widehat R_{1+j,\alpha}(u)}
{\delta_{1+j,\alpha}(u)^2 |J_{1+j,\alpha}(u)|}.
$$

The cross-binary row must use the fold chart from the prior packets:

$$
F_{\kappa,v}(\tilde\theta,\delta)
=
\frac{\delta^2}{v^2}
-2
+\sin(2\tilde\theta-\delta)
+\kappa\sin\delta
=0.
$$

With

$$
\phi=2\tilde\theta-\delta,
$$

define

$$
Q_{\kappa,v}(\delta)
=
\frac{\delta^2}{v^2}+\kappa\sin\delta,
\qquad
A_{\kappa,v}(\delta)
=
\frac{2\delta}{v^2}+\kappa\cos\delta.
$$

The interval proof must not use a global positive $|J|$ floor. The fold-chart identity

$$
F_\delta
=
\frac{2\delta}{v^2}J
$$

cancels the projected $1/|J|$ singularity in the coarea-weighted fold cells. The next proof packet must therefore partition the representative row into:

- regular projected-root cells with local positive $|J|$ floors;
- explicit fold cells where $J=0$ is handled by the $\phi$ coarea coordinate;
- local $\delta$ or $Q$ charts where $A_{\kappa,v}$ is small or changes sign.

The cross-binary remainder also has a useful quarter-shift symmetry:

$$
\boxed{
f_{\times}\left(u+\frac{H}{4}\right)
=
-f_{\times}(u),
\qquad
f_{\times}\left(u+\frac{H}{2}\right)
=
f_{\times}(u).
}
$$

This gives an exact period-mean row:

$$
\boxed{
\overline f_{\times}=0.
}
$$

If

$$
C_{\times}
=
\int_0^{H/4}f_{\times}(q)\,dq,
$$

and

$$
A_{\times}(u)
=
\int_0^u f_{\times}(q)\,dq,
$$

then for $0\le u\le H/4$,

$$
\boxed{
A_{\times}\left(u+\frac{H}{4}\right)
=
C_{\times}-A_{\times}(u),
\qquad
A_{\times}\left(u+\frac{H}{2}\right)
=
A_{\times}(u).
}
$$

The full-period primitive mean reduces to

$$
\boxed{
\overline A_{\times}
=
\frac{C_{\times}}{2}.
}
$$

Thus the remaining interval proof does not need to enclose a full-period primitive directly. It can enclose $A_{\times}$ on one quarter-period and the single quarter integral $C_{\times}$, then transport the extrema and $\overline A_{\times}$ by symmetry.

## Clock/Length Quantities Left Open

For the mean-subtracted primitive,

$$
A_{\times}(u)
=
\int_0^u
\left(
f_{\times}(q)-\overline f_{\times}
\right)\,dq,
$$

the remaining interval proof must enclose

$$
A_{\min},
\qquad
\overline A,
\qquad
A_{\max}.
$$

The weighted first moment form is

$$
\overline A
=
\frac{1}{H}
\int_0^H
(H-q)
\left(
f_{\times}(q)-\overline f_{\times}
\right)\,dq.
$$

Once these intervals are outward-rounded, the already-derived clock/length row applies directly:

$$
\nu_{\min}^{\mathrm{clk}}
=
v_*+A_{\min}-\overline A,
\qquad
\nu_{\max}^{\mathrm{clk}}
=
v_*+A_{\max}-\overline A.
$$

The sampled targets to certify, not assume, are

$$
\nu_{\min}^{\mathrm{clk}}\approx2.892219447399,
\qquad
\nu_{\max}^{\mathrm{clk}}\approx3.150910033097.
$$

## Executable Checksum

The executable diagnostic [octahedral-fold-aware-representative-profile-decomposition.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-representative-profile-decomposition.mjs) emits:

- validation status for the zero-bracket and chart-closure source packets;
- the representative decomposition identity;
- the partner scalar root formula and the proportionality $P_\alpha(v)=2\pi vS_\alpha(v)$;
- a phase-sampled checksum over receiver $1+$ showing the partner row is pointwise null to numerical tolerance;
- a cross-binary quarter-shift checksum showing $f_{\times}(u+H/4)=-f_{\times}(u)$ and $f_{\times}(u+H/2)=f_{\times}(u)$;
- the fixed-speed obstruction witness showing the total tangential forcing remains nonzero;
- the cross-binary coarea interval profile as the next proof target.

The companion test [neutral-swarm-octahedral-fold-aware-representative-profile-decomposition.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-representative-profile-decomposition.test.js) verifies source validation, no fixed speed window, the partner null identity, fold-aware root counts, fixed-speed obstruction preservation, open cross-binary profile boundaries, CLI emission, and JSON validation.

The checksum reports:

$$
\texttt{partner\_root\_counts=[3]},
$$

$$
\texttt{cross\_root\_counts=[4,6]},
\qquad
\texttt{active\_root\_counts=[7,9]}.
$$

The sampled maximum partner tangential magnitude is

$$
\max |f_{\mathrm{partner}}|
\approx
6.04\times10^{-14},
$$

and the sampled maximum difference between total and cross tangential forcing is

$$
\max |f_{\mathrm{total}}-f_{\times}|
\approx
6.06\times10^{-14}.
$$

The sampled maximum cross-binary quarter-shift antisymmetry residual is below numerical tolerance, as is the sampled half-period residual:

$$
\max\left|f_{\times}(u+H/4)+f_{\times}(u)\right|
\lesssim10^{-13},
$$

$$
\max\left|f_{\times}(u+H/2)-f_{\times}(u)\right|
\lesssim10^{-13}.
$$

At the inherited pointwise witness $\theta=\pi/4$, the total tangential forcing remains approximately

$$
T\cdot F^{\mathrm{fold}}
\approx
-0.168424847206,
$$

so fixed-speed pointwise tangential closure remains rejected.

## Claim Boundary

This packet certifies:

$$
\texttt{certifies\_partner\_pointwise\_tangential\_zero=true}.
$$

It also certifies the symmetry-level cross-binary period-mean row:

$$
\texttt{certifies\_cross\_binary\_period\_mean\_zero=true}.
$$

It explicitly does not certify:

$$
\texttt{certifies\_total\_pointwise\_tangential\_zero=false},
$$

$$
\texttt{certifies\_cross\_binary\_coarea\_interval\_profile=false},
$$

$$
\texttt{certifies\_representative\_interval\_profile=false},
$$

$$
\texttt{certifies\_receiver\_orbit\_interval\_clock\_length\_return=false},
\qquad
\texttt{certifies\_bounded\_speed\_live\_ledger=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{fold-aware-representative-partner-null-decomposition-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it converts the representative interval problem from a five-source all-root profile into a four-source cross-binary coarea profile and proves that the antipodal-partner row is pointwise null at the certified zero. It should not be promoted into reader-facing AAA prose until the cross-binary interval profile is certified or until a separate conditional theorem-target edit is scoped.
