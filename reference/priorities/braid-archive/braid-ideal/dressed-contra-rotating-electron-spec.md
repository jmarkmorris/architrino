# §95 Dressed Contra-Rotating Electron Seed

**Date:** 2026-07-12
**Claim level:** seed-grade shared-record diagnostic; no retained-branch acceptance
**Runner:** `scripts/braid-ideal/dressed-contra-rotating-electron.mjs`
**Fixture:** `scripts/braid-ideal/dressed-contra-rotating-electron-fixture.mjs`
**Owner test:** `tests/braid-ideal-dressed-contra-rotating-electron.test.js`

## Closure target

Test the assembled electron candidate rather than the §93 bare pair: a leading sense-$+1$ pro-braid, its sense-$-1$ C-conjugate anti-braid, and six electrinos in the positrino–positrino pocket. The payload must independently pass four gates:

1. relax to a stable pocket equilibrium;
2. turn the $(\Delta\phi,\Delta z)$ saddle into a restoring well;
3. preserve the self-sunk axial pump;
4. make the certified joint spectrum marginal or stable.

Release also requires net charge $-1e$. Failure of any gate keeps `retainedBranchClaim=false` and `scoreMovement=no_score_increase`.

## Shared retained record

The runner reuses the §93 two-braid rows and reconstructs the §93 joint pencil from its measured static and rate blocks. Scaffold–payload and payload–payload rows use `AbsoluteHistoryRootRuntime` moving-circular production roots. Payload rate derivatives use its retained linear-segment production-root policy. The composed record therefore carries the bare-pair cross coupling and the payload force/torque response through the same production root API. `src/solver/app/AbsoluteHistoryRootRuntime.mjs` is untouched.

For payload site $a$, the seed equilibrium residual is

$$
\mathbf R_a
=
\kappa_\star\sum_{b\ne a}\mathbf F^{\mathrm{rec}}_{ab}
-
\mathbf a^{\mathrm{kin}}_a.
$$

The spinless column projects these rows onto its three reflection-paired axial separations. The co-rotating ansatz projects them onto the shared ring radius, exposed/shielded triad split, and relative pocket phase. A payload equilibrium passes only when the projected residual closes and the symmetric part of its force Jacobian is negative definite.

## Explicit ansätze and relaxation result

The spinless ansatz is a reflection-symmetric six-electrino column. Production-root relaxation moved its three positive heights to

$$
(z_1,z_2,z_3)
=(0.13817,0.38498,0.66992),
$$

but stopped with residual norm $9.06564$. Its symmetric force-Jacobian eigenvalues are approximately

$$
(+110.23822,-43.02230,-168.69485).
$$

It is a saddle, not a stable column.

The co-rotating ansatz is two three-fold electrino rings with a $\pi/3$ triad offset. Relaxation drove it toward the allowed pocket boundary,

$$
(\rho,z_{\mathrm{split}},\phi_0)
=(0.70000,0.61007,0.07542),
$$

with residual norm $1.19991$. Its symmetric force-Jacobian eigenvalues are approximately

$$
(+0.64854,+0.07192,-1.25693).
$$

The two positive directions and boundary-seeking relaxation reject a self-consistent exposed/shielded triad equilibrium. The payload gate therefore fails before a retained dressed object exists.

## Conditional dressed-pair diagnostics

The lower-residual co-rotating boundary configuration was carried forward only as a diagnostic counterfactual. It is not an equilibrium and is not adjudication-eligible.

The local dressed lock Jacobian is

$$
J_{\phi z}^{(95)}
=
\begin{pmatrix}
-6.74185 & 4.15186\\
1.94126 & 8.83542
\end{pmatrix},
$$

with eigenvalues approximately $+9.33670$ and $-7.24313$. The unstable direction is smaller than the §93 value $+12.41166$, but it remains positive: the saddle does not become a well.

The attempted dressed refinement also spoils the sunk pump. Its residual is $0.69576$, compared with the §93 bare-pair residual $1.28\times10^{-4}$. The lock and pump gates both fail.

The raw leading polynomial root has pencil residual $32.9$ and is rejected. With the declared $10^{-3}$ root-residual ceiling, the certified leading joint row is

$$
\lambda_{\mathrm{lead}}
=
+3.20774\pm0.33888i.
$$

This softens the §93 real divergence from $+5.30423$ by about $2.09649$, but it remains strongly unstable. The flutter gate fails.

## Charge and orbital moment

Six electrinos give

$$
Q=-6\epsilon=-1e.
$$

For the co-rotating diagnostic configuration,

$$
L_{z,\mathrm{pay}}=3.06219,
\qquad
\mu_z=-1.53109,
\qquad
g_{\mathrm{orb}}=1.
$$

The $g_{\mathrm{orb}}=1$ readout is the orbital relation for the declared co-rotating payload. It is not a derivation of the electron spin $g$ value.

## Regression controls and decision

Removing the payload recovers the §93 equilibrium, pump, saddle eigenvalues, and joint growth. Removing the trailing braid delegates directly to the §89 single-dressed runner, including its $-1e$ charge, nonzero orbital moment, and surviving flutter.

Decision: `dressed_pair_fails_seed_gate_no_release`. The first failed gate is `payload_equilibrium`; the conditional lock remains a saddle, the pump reopens, and the certified joint spectrum remains unstable. No native retained-history release is authorized.

Reproduce: `node scripts/braid-ideal/dressed-contra-rotating-electron.mjs --pretty`
Owner suite: `node --test --test-name-pattern="§95" tests/braid-ideal-dressed-contra-rotating-electron.test.js`

Next closure goal: replace the boundary-seeking rigid pocket ansätze only if a new force-balance mechanism supplies a bounded six-electrino equilibrium; otherwise treat the present dressed-pair realization as closed negative at seed grade.
