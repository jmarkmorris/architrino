# Octahedral Fold-Aware Clock/Length Chart Closure Proof

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-clock-length-orbit-symmetry-reduction](octahedral-fold-aware-clock-length-orbit-symmetry-reduction.md). The predecessor staged the receiver-orbit reduction as a sampled equivariance checksum. This packet upgrades the reduction itself to an analytic chart-closure statement for the scalar clock/length row.

It does not certify the representative interval profile, clock/length return, bounded-speed live ledger, or retained branch.

Its direct successor is [octahedral-fold-aware-representative-profile-decomposition](octahedral-fold-aware-representative-profile-decomposition.md), which proves the antipodal-partner row is pointwise null at the certified zero and reduces the remaining representative interval target to the cross-binary coarea profile.

## Theorem Scope

The theorem applies to the scalar fold-aware receiver forcing

$$
f_i(u)=T_i(u)\cdot F_i^{\mathrm{fold}}(u)
$$

on the rigid period-rescaled octahedral carrier. The receiver orbit is

$$
\{1+,1-,2+,2-,3+,3-\}.
$$

The chart assumptions are:

$$
\texttt{all\_ordered\_distinct\_sources\_required=true},
$$

$$
\texttt{fold\_aware\_all\_positive\_roots\_required=true},
$$

$$
\texttt{same\_coarea\_convention\_required=true}.
$$

No fixed speed window is imposed:

$$
\texttt{speed\_constraint=none}.
$$

The checksum uses the representative zero-ray speed ratio

$$
v_0\approx3.021564740248.
$$

This is not a full tensor, observer-export, or unrestricted signed-octahedral invariance claim. It is a scalar receiver-orbit chart-closure claim for the clock/length forcing row.

## Signed-Cyclic Generators

The cyclic generator is

$$
C:\;1+\mapsto2+\mapsto3+\mapsto1+,
$$

and similarly for the negative labels, with carrier map

$$
Q_C(x,y,z)=(z,x,y).
$$

The antipodal generator is

$$
S:\;i+\leftrightarrow i-.
$$

In the signed-label convention used here,

$$
Q_S=-I,
\qquad
\sigma_S=0.
$$

Equivalently, in an unsigned carrier convention this is a half-period shift:

$$
Y_{i-}(u)=Y_{i+}(u+\pi).
$$

The proof fixes the signed-label convention so the two descriptions are not mixed inside the same formula.

## Chart-Closure Identities

For a receiver $i$ and source $j$, define

$$
\Phi_{ij}(u,\eta)
=
\|Y_i(u)-Y_j(u-\eta)\|-\eta.
$$

For $g\in\langle C,S\rangle$, the carrier satisfies

$$
Y_{g i}(u+\sigma_g)=Q_gY_i(u),
\qquad
\dot Y_{g i}(u+\sigma_g)=Q_g\dot Y_i(u).
$$

Therefore

$$
\boxed{
\Phi_{g i,g j}(u+\sigma_g,\eta)
=
\Phi_{ij}(u,\eta).
}
$$

The positive root sets are in bijection:

$$
\eta\in\mathcal R_{ij}^+(u)
\quad\Longleftrightarrow\quad
\eta\in\mathcal R_{g i,g j}^+(u+\sigma_g).
$$

The Jacobian and force sign are preserved:

$$
J_{g i,g j}(u+\sigma_g,\eta)
=
J_{ij}(u,\eta),
\qquad
q_{g i}q_{g j}=q_iq_j.
$$

Thus the fold-aware all-root force transforms as

$$
F_{g i}^{\mathrm{fold}}(u+\sigma_g)
=
Q_gF_i^{\mathrm{fold}}(u),
$$

and the scalar forcing is identical:

$$
\boxed{
T_{g i}(u+\sigma_g)\cdot F_{g i}^{\mathrm{fold}}(u+\sigma_g)
=
T_i(u)\cdot F_i^{\mathrm{fold}}(u).
}
$$

With the same mean-subtracted primitive convention,

$$
A_i(u)
=
\int_0^u\left(f_i(q)-\overline f_i\right)\,dq,
$$

the primitive transports as

$$
A_{g i}(u+\sigma_g)-A_{g i}(\sigma_g)
=
A_i(u)-A_i(0).
$$

Because all six period-rescaled receiver carriers have the same path-length ratio,

$$
\frac{L_{g i}}{H}=\frac{L_i}{H},
$$

the clock offset and positivity criterion transport across the receiver orbit.

## Burden Reduction

This closes the chart part of the six-to-one reduction:

$$
\boxed{
6\;\text{receiver interval rows}
\quad\leadsto\quad
1\;\text{representative interval row}.
}
$$

The representative interval row is still open. The remaining proof targets are:

$$
f_{1+}(u)\;\text{enclosure},
\qquad
A_{\min},
\qquad
\overline A,
\qquad
A_{\max},
$$

and a stratified root/coarea enclosure for the representative receiver.

The $|J|$ target cannot honestly be a single positive global floor across the fold-aware all-root chart. At projected fold phases, the ordinary root Jacobian reaches zero. The next packet must therefore own:

- positive $|J|$ floors on regular subcharts;
- explicit fold rows where $|J|=0$ is handled by the coarea coordinate;
- bounded coarea-weighted contributions through fold phases.

## Executable Checksum

The executable diagnostic [octahedral-fold-aware-clock-length-chart-closure-proof.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-clock-length-chart-closure-proof.mjs) emits:

- the source symmetry-reduction validation status;
- theorem-scope assumptions;
- signed-cyclic generator conventions;
- analytic transport identities;
- a covariance checksum for the two generators;
- the six-to-one interval burden reduction;
- the non-retention verdict.

The companion test [neutral-braid-octahedral-fold-aware-clock-length-chart-closure-proof.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-clock-length-chart-closure-proof.test.js) verifies source validation, identity statements, generator conventions, covariance checksums, receiver-burden reduction, CLI validation, and non-retention guards.

## Claim Boundary

This packet certifies:

$$
\texttt{certifies\_receiver\_orbit\_chart\_closure=true},
$$

and therefore

$$
\texttt{certifies\_interval\_receiver\_orbit\_symmetry\_reduction=true}.
$$

It does not certify:

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
\texttt{fold-aware-clock-length-receiver-orbit-chart-closure-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only`. It is mathematically substantive because it closes the receiver-orbit chart reduction and removes five redundant interval receiver rows from the next proof burden. It should not be promoted into reader-facing AAA prose until the representative $1+$ interval profile is certified or until a separate theorem-target edit is scoped for the conditional chart-closure lemma.
