# Planar-Pair Symbolic Substrate Instance

Status. Priority instance for `photon_planar_pair_transverse_ledger`, downstream of [photon-planar-pair-ledger-substrate-packet.md](photon-planar-pair-ledger-substrate-packet.md) and [ideal-analyzer-and-sg-residual-instance.md](ideal-analyzer-and-sg-residual-instance.md). This file instantiates the planar-pair substrate residuals in a symbolic branch with declared cancellation, transverse survival, bridge state, and helicity rows. It is priority material only.

Claim level. Symbolic substrate rows populated by declaration. The packet shows the algebraic row format needed for a coaxial contra-rotating polarity-conjugate planar pair to feed photon Gate B. It does not prove a Gate A photon branch, source recoil, wake ledger, material analyzer dynamics, or no-signaling polarization theorem.

Promotion decision. Defer with blocker. The symbolic rows are useful as a target instance, but reader-facing promotion should wait until a Gate A-admissible planar-pair branch and material analyzer response provide the same quantities from the native ledger.

## Symbolic Branch Declarations

Fix a Gate A transverse frame

$$
(\hat{\mathbf e},\hat{\mathbf u},\hat{\mathbf v}),
\qquad
\hat{\mathbf u}\times\hat{\mathbf v}=\hat{\mathbf e},
$$

and choose a symbolic helicity sign

$$
\lambda_{\mathrm{hel}}\in\{+1,-1\}.
$$

Declare the effective pro/anti exposure and planar signs by

$$
q_{\mathrm{pro}}^{\mathrm{eff}}=q_\gamma,
\qquad
q_{\mathrm{anti}}^{\mathrm{eff}}=-q_\gamma,
\qquad
s_{\mathrm{pro}}^{\mathrm{plane}}
=
-s_{\mathrm{anti}}^{\mathrm{plane}}.
$$

Declare a clean transverse oscillatory action ledger

$$
\mathbf a_{\mathrm{pro}}
+
\mathbf a_{\mathrm{anti}}
+
\mathbf a_{\mathrm{wake}}
=
A_\gamma
\left(
\hat{\mathbf u}
+
i\lambda_{\mathrm{hel}}\hat{\mathbf v}
\right),
\qquad
A_\gamma>\varepsilon_{\mathrm{amp}},
$$

with no free longitudinal component:

$$
P_{\parallel}
\left(
\mathbf a_{\mathrm{pro}}
+
\mathbf a_{\mathrm{anti}}
+
\mathbf a_{\mathrm{wake}}
\right)
=\mathbf 0.
$$

The corresponding symbolic helicity ledger is declared as

$$
\mathbf J_{\gamma}^{\mathrm{sub}}
=
\lambda_{\mathrm{hel}}\hbar\hat{\mathbf e},
\qquad
\mathbf J_{\mathrm{src,rem}}=\mathbf 0,
$$

with any source or remnant angular momentum assumed to be routed by a separate event ledger.

## Static Cancellation Row

The static exposure residual in [photon-planar-pair-ledger-substrate-packet.md](photon-planar-pair-ledger-substrate-packet.md) becomes

$$
\Delta_Q^\gamma
=
\frac{
\left|
q_\gamma-q_\gamma
\right|
}{
2|q_\gamma|+\varepsilon_Q
}
=0.
$$

This is only static exposure cancellation. It does not by itself provide a photon branch.

## Transverse Survival And Longitudinal Exclusion

The declared action ledger gives

$$
\mathbf a_{\perp}^{\mathrm{sub}}
=
A_\gamma
\left(
\hat{\mathbf u}
+
i\lambda_{\mathrm{hel}}\hat{\mathbf v}
\right),
\qquad
\left\|
\mathbf a_{\perp}^{\mathrm{sub}}
\right\|>\varepsilon_{\mathrm{amp}},
$$

so the transverse-survival residual is

$$
\Delta_{\mathrm{surv}}^\gamma=0.
$$

The longitudinal residual is

$$
\Delta_{\parallel}^{\mathrm{sub}}
=
\frac{\|\mathbf 0\|}{\|\mathbf a_{\gamma}^{\mathrm{sub}}\|+\varepsilon_{\mathrm{amp}}}
=0.
$$

Thus the symbolic branch has a nonzero transverse ledger and no free longitudinal support. This is not yet a physical no-longitudinal-mode proof because the Gate A branch and source/wake ledger are declared rather than derived.

## Bridge-State And Helicity Rows

For

$$
\boldsymbol{\epsilon}_{\lambda_{\mathrm{hel}}}
=
\frac{1}{\sqrt 2}
\left(
\hat{\mathbf u}
+
i\lambda_{\mathrm{hel}}\hat{\mathbf v}
\right),
$$

the normalized symbolic transverse action is

$$
\frac{
\mathbf a_{\perp}^{\mathrm{sub}}
}{
\|\mathbf a_{\perp}^{\mathrm{sub}}\|
}
=
\boldsymbol{\epsilon}_{\lambda_{\mathrm{hel}}},
$$

after the declared bridge normalization. Therefore

$$
\Delta_{\epsilon}^{\gamma}=0.
$$

The helicity row gives

$$
\Delta_{\mathrm{hel}}^\gamma
=
\left|
\frac{\hat{\mathbf e}\cdot
\lambda_{\mathrm{hel}}\hbar\hat{\mathbf e}}{\hbar}
-
\lambda_{\mathrm{hel}}
\right|
+
\frac{
\|P_{\perp}\lambda_{\mathrm{hel}}\hbar\hat{\mathbf e}\|
}{
\hbar+\varepsilon_J
}
=0.
$$

## Event-Ledger Condition

The symbolic event angular-momentum row can be written as

$$
\Delta_{\mathbf J}^{\gamma}
=
\left\|
\Delta\mathbf J_{\mathrm{src}}
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\Delta\mathbf J_{\mathrm{recoil}}
-
\Delta\mathbf J_{\mathrm{wake}}
\right\|.
$$

The symbolic instance may set $\Delta_{\mathbf J}^{\gamma}=0$ only by declaring

$$
\Delta\mathbf J_{\mathrm{src}}
=
\lambda_{\mathrm{hel}}\hbar\hat{\mathbf e}
+
\Delta\mathbf J_{\mathrm{recoil}}
+
\Delta\mathbf J_{\mathrm{wake}}.
$$

This is an event-ledger condition, not a populated source model. If the source, recoil, or wake terms are absent, the Gate B physical branch remains blocked even though the algebraic substrate rows above evaluate to zero.

## Instance Verdict

The symbolic residual vector is

$$
\mathcal R_{\gamma B}^{\mathrm{sub,sym}}
=
\left(
\Delta_A,
0,
0,
0,
0,
0,
\Delta_{\mathbf J}^{\gamma},
\Delta_{\mathrm{handoff}}^\gamma
\right).
$$

Its local algebraic verdict is

$$
\mathrm{symbolic\_substrate\_rows\_pass\_by\_declaration}.
$$

The physical promotion verdict is still blocked because $\Delta_A$, $\Delta_{\mathbf J}^{\gamma}$, $\Delta_{\mathrm{handoff}}^\gamma$, the source/recoil/wake ledger, and the material analyzer dynamics are not populated from a native Gate A planar-pair branch.
