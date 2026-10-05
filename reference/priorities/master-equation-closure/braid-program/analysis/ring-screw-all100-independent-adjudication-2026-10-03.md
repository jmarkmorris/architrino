# Independent adjudication of the hundred-rung axial screw exclusion

Date: 2026-10-03. **Scenario: unchanged Master Equation; every ordinary positive-delay root, including self roots, retained; numerical inputs use $K=c_f=1$. Verdict: accepted without required repair. Grade: independently reconstructed exact algebraic consequence of previously independently accepted finite-reference outward signs.** This review creates only this new adjudication. Its subject, all earlier instruments and certificates, and coordinator-owned files remain unchanged.

## Verdict and accepted domain

The frozen subject is [Axial screw exclusion through all hundred recorded six-member rungs](ring-screw-all100-extension-2026-10-03.md), SHA-256 `04c71f28f5d02ec27d87660e10f4836b420c78b117009ac895f1bd6966edb0be`. The exact coefficient identity and its all-hundred evidence scope are accepted:

$$
A_z(u)=-u(1-u^2)G_0(0),\qquad G_0(0)>0,
\qquad 0<|u|<1.
$$

Each stationary reference is one of T02, T04, through T200. The corresponding rigid screw has fixed relative phases, a common circular transverse trajectory, and the same constant axial velocity throughout the whole past. Its effective stationary speed is fixed at that reference's admitted speed. The planar-balanced radius and frequency change with $u$; this is not a chart obtained by holding their stationary physical values fixed. Every nonzero subwake velocity in this mapped family has nonzero axial acceleration of the opposite sign. Thus none is an exact rigid screw solution.

The conclusion covers these hundred selected reference branches, not every possible effective speed or unrecorded rung, and not deforming rings or histories with internal axial motion. The sign of a uniform-history acceleration residual is not a damping verdict. The accepted common axial growing components at T10–T200 remain fully compatible with this exclusion.

## Independently reconstructed Cartesian transformation

Work with $c_f=1$ and $\gamma=\sqrt{1-u^2}>0$. Before applying the transformation to any ring, its normalization has two exact analytical controls. At $u=0$, $\gamma=1$ and every coordinate, delay, transmitter and acceleration is unchanged. For a stationary transverse source and receiver separated by $\ell_0$, their scaled translating separation is $\ell_0/\gamma$, their causal delay is $\ell_0/\gamma^2$, their direction is $(\gamma\mathbf n_0,u)$ and their transmitter is $\gamma^2$. Direct substitution into the baseline kernel gives axial acceleration $\gamma^2uK\sigma/\ell_0^2$. These controls identify the required powers of $\gamma$ independently of ring balance. No new numerical instrument or target run is used in this review.

For the target reconstruction, start from a stationary circular reference $\mathbf x_{j,0}(t)=R_0(\cos(\Omega_0t+\alpha_j),\sin(\Omega_0t+\alpha_j))$. Define the whole-past screw directly in Cartesian coordinates by

$$
\mathbf X_j(T)=\left(\gamma^{-1}\mathbf x_{j,0}(\gamma^2T),uT\right).
$$

Its transverse radius and angular frequency are therefore $R_0/\gamma$ and $\gamma^2\Omega_0$. Fix a reception time $T$, put $t_0=\gamma^2T$, and associate a proposed positive delay $\Delta$ with $\delta=\gamma^2\Delta$. The source and receiver angular arguments equal those at stationary reception $t_0$ and emission $t_0-\delta$. If their stationary transverse separation is $\mathbf q_0(\delta)$, the full screw separation is

$$
\mathbf q(\Delta)=\left(\gamma^{-1}\mathbf q_0(\delta),u\Delta\right).
$$

The causal equation $|\mathbf q(\Delta)|=\Delta$ is consequently equivalent to

$$
\gamma^{-2}|\mathbf q_0(\delta)|^2+u^2\Delta^2=\Delta^2
\quad\Longleftrightarrow\quad
|\mathbf q_0(\delta)|^2=\gamma^4\Delta^2=\delta^2.
$$

Both directions of this equivalence hold for every source label and every positive delay. The map $\Delta\leftrightarrow\delta=\gamma^2\Delta$ is thus a bijection of the complete root sets. It neither drops self hits nor inserts zero-delay roots. Every stationary delay satisfies $\delta\le2R_0$, so every screw delay satisfies $\Delta\le2R_0/\gamma^2=2R/\gamma$. Complete delay coverage follows from this equation even though the absolute axial positions are unbounded in the past. A bounded-absolute-history hypothesis from a different topology theorem is unnecessary here.

At a paired root, $\mathbf n_0=\mathbf q_0/\delta$ gives

$$
\mathbf n=(\gamma\mathbf n_0,u),\qquad
\mathbf V_j=(\gamma\mathbf V_{j,0},u).
$$

The velocity appearing in the transmitter is the source velocity at the corresponding emission, so the dot product gives

$$
D=1-\mathbf n\cdot\mathbf V_j
=1-\gamma^2\mathbf n_0\cdot\mathbf V_{j,0}-u^2
=\gamma^2D_0.
$$

Since $\gamma^2>0$, ordinary roots remain ordinary, transmitter signs are preserved, and $|D|=\gamma^2|D_0|$. The baseline per-hit acceleration therefore satisfies the exact vector identity

$$
\frac{K\sigma\mathbf n}{\Delta^2|D|}
=\gamma^2\frac{K\sigma}{\delta^2|D_0|}
(\gamma\mathbf n_0,u).
$$

The complete planar acceleration is $\gamma^3$ times the reference acceleration, while the prescribed screw's planar acceleration is $-R\Omega^2\mathbf e_r=-\gamma^3R_0\Omega_0^2\mathbf e_r$. Hence reference planar balance is preserved exactly. Its required axial acceleration is zero because the whole-past axial trajectory is linear in time.

## The axial coefficient and all-hundred inheritance

The common axial first-variation owner uses the coefficient

$$
w_{m,0}=\frac{K\sigma_m}{\delta_m^3|D_{m,0}|}.
$$

The rigid screw's axial contribution uses one fewer delay power. Summing the preceding vector identity thus gives

$$
A_z=\gamma^2u\sum_m\frac{K\sigma_m}{\delta_m^2|D_{m,0}|}
=\gamma^2u\sum_mw_{m,0}\delta_m.
$$

Independently, Taylor expansion at the origin of the entire scalar quotient gives

$$
H_0(s)=s^2-\sum_mw_{m,0}(1-e^{-s\delta_m}),
\qquad
G_0(0)=\lim_{s\to0}\frac{H_0(s)}s
=-\sum_mw_{m,0}\delta_m.
$$

This establishes the claimed identity including its essential delay factor. Confusing $\sum_mw_{m,0}$ with $\sum_mw_{m,0}\delta_m$ would give a different quantity and is not accepted. Equivalently, the earlier dimensionless signed screw weight satisfies $B_0=\sum_mw_{m,0}\delta_m=KS(b)/R_0^2$; the resulting actual acceleration is $K\gamma^2uS(b)/R_0^2$, including the positive radius and translation factors.

The finite sign premise is inherited from the [independent all-hundred common axial adjudication](ring-higher-common-axial-independent-adjudication-2026-10-03.md), inspected at SHA-256 `71048efadff38bbb08e14271e6d982820e2e0062a60b6e4e02db0e32814652bb`. Its [hundred-row independent table](ring-higher-common-axial-independent-all100-table-2026-10-03.md), SHA-256 `4a5c911a33cadb76b4708ad448147b121c5c799423f04f5ce5bb5230ea78f7b5`, binds one separately reconstructed Cartesian contour receipt for every even reference. The known-first metadata projector explicitly requires the lower authoritative binary endpoint of `removedZeroValue` to be positive at every reference, in addition to matching its admitted exact-reference digest, full per-receiver root count and independent instrument identity. Its accepted summary is SHA-256 `6d8bfbb08eb7a8d470cf1f043099221d9e34a71e4b3f97b3625b2ae2e324b68d`.

This review inspected that positivity obligation in the existing projector and consumes the separately accepted signs. It does not replay the contour instrument, recompute the hundred signs, infer them from winding integers, or reinterpret printed decimals as enclosures. The all-hundred exact reference and census admissions likewise retain their original independent owners. At T$t$ the complete per-receiver ledger contains $2t+4$ ordinary hits, including all channels identified as positive-delay self hits; this is the ledger mapped above.

All numerical certificates use $K=c_f=1$. Retaining positive symbolic $K$ in the substitution changes no sign. In $c_f=1$ units, the baseline scale transformation from the admitted unit-$K$ reference to general positive $K$ multiplies radii and delays by $K$ and divides angular frequencies by $K$. Consequently $w_{m,0}$ scales by $K^{-2}$ and $G_0(0)$ by $K^{-1}$, preserving strict positivity. No dimensional value of $K$ or new numerical wake speed is inferred.

## Boundaries, independence and falsifiers

At $u=0$ the selected stationary circle remains exact. As $|u|\to1$ along this family, $R=R_0/\gamma$ and the complete delay depth diverge, while $\Omega=\gamma^2\Omega_0$ tends to zero. The vanishing axial residual in that singular limit is not a finite-radius rotating equality solution. For a finite-radius screw exactly at $|u|=1$, the root equation requires transverse alignment; its alignment hits have $D=0$ and do not define the unchanged ordinary kernel. At $|u|>1$, $|\mathbf q(\Delta)|\ge|u|\Delta>\Delta$, so there is no positive causal root and zero received acceleration cannot sustain a nonzero centripetal acceleration. These boundary results agree with the [earlier independently reconstructed screw theorem](ring-axial-independent-adjudication-2026-10-03.md#screw-translation-scaling-and-exact-domain-boundary); they introduce no event prescription.

The independent content of this adjudication is the direct Cartesian whole-history construction, two-way causal-root equivalence, transmitter and vector-kernel factors, and the separate Taylor identification of the inherited axial coefficient. The all-hundred outward signs are dependencies already independently accepted elsewhere. No first variation about an unbalanced translating history is computed. The sign of its rigid residual cannot replace a memory-spectrum or nonlinear response calculation; specifically it gives no common axial damping at T10–T200 and no three-dimensional attractor.

**Falsifiers:** a root of either history not carried to the other by $\delta=\gamma^2\Delta$, an incorrect source-emission velocity or transmitter factor, an omitted positive-delay self hit, failure of an admitted exact reference, or an authoritative all-hundred `removedZeroValue` interval containing zero overturns the affected exclusion. A candidate outside the stated rigid whole-past family does not test this theorem. A zero complete axial residual within it would directly contradict the conclusion and require identifying which dependency failed.

**Recommended integration:** extend the selected six-member rigid-screw exclusion through T200 for every nonzero subwake axial velocity, retaining the effective-rung label and the distinction from preparation-dependent common axial response. No subject repair is required. Unrecorded-rung signs, finite nonlinear axial fate and general three-dimensional structures remain open.

**Measured document validation:** a Node checker first passed known math/fenced-code link exclusion, a two-span math fixture and the KaTeX square control, then rendered all 69 mathematical spans and validated all four relative links, including the linked heading. `git diff --no-index --check /dev/null` on this new document emitted no whitespace diagnostics; its exit one records that the file differs from the empty input. These checks establish document syntax and routing only. `shasum -a 256` confirmed the frozen subject identity above after this review; no scientific target was rerun.
