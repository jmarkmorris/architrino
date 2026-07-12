# Retained-Sea Angular-Momentum Ward Identity and Transport Kernel

Date: 2026-07-11
Verdict: **UNDECIDED**
Claim level: priority-only analytical derivation and modeled-cell specification. No retained homogeneous sea state is claimed, no global drain is exhibited or barred, no corpus promotion is authorized, and no score movement follows.

Parent decision memo: [Global Angular-Momentum Drain — Adversarial Feasibility Memo](global-angular-momentum-drain-adversarial-feasibility-memo.md).

Successor decision: [Same-Action Wake Noether Pullback — Local Storage/Current Decision](same-action-wake-noether-pullback-decision-2026-07-12.md) proves that the action candidate fixes only global time-cut history charges, not a unique spatial wake density/current representative; the named missing input is a local wake-carrier localization and coupling rule.

## Result in One Line

The canonical delayed pair law admits an exact mechanical exchange-current partition, but its directed pair torques leave a generally nonzero Ward defect. A true conservation identity therefore requires a same-record wake angular-momentum density and current that the present retained-sea model does not yet supply. Consequently the zero-frequency transport coefficient cannot be inferred from the finite cage, and the global-drain verdict remains **UNDECIDED**.

## 1. Resolved Delayed Population

Consider a periodic population of resolved Noether braids indexed by $A,B$. Each braid contains architrino sites $a\in A$. This packet uses assembly angular momentum $L_{A,z}$ as a ledger quantity; it does not assign physical mass to architrinos. For a receiver site $a$ at time $T$ and a source site $b$ at its causal emission time $t_{ab}^{(r)}(T)$, the priority-level canonical kernel is

$$
\mathbf F_{a\leftarrow b}^{(r)}(T)
=
\sigma_a\sigma_b\kappa
\frac{W_{ab}^{(r)}(T)}{\left((d_{ab}^{(r)})^2+\varepsilon^2\right)^{3/2}}
\mathbf d_{ab}^{(r)}(T),
$$

with

$$
\mathbf d_{ab}^{(r)}(T)
=
\mathbf x_a(T)-\mathbf x_b\!\left(t_{ab}^{(r)}(T)\right),
\qquad
\left\|\mathbf d_{ab}^{(r)}\right\|
=
c_f\left(T-t_{ab}^{(r)}\right),
$$

and retained receiver-normal branch strength

$$
W_{ab}^{(r)}
=
\left|
\frac{c_f-\mathbf v_a(T)\cdot\widehat{\mathbf d}_{ab}^{(r)}}
{\operatorname{floor}\!\left(c_f-\mathbf v_b(t_{ab}^{(r)})\cdot\widehat{\mathbf d}_{ab}^{(r)}\right)}
\right|.
$$

All active roots must come from one retained root ledger. The formulas below sum over those roots and over the sites in each assembly. They remain parameterized over the periodic sea state, branch population, root policy, and wake-storage completion.

Choose a fixed origin for the axial generator. The directed torque from assembly $B$ into assembly $A$ is

$$
\tau_{A\leftarrow B,z}(T)
=
\sum_{a\in A}\sum_{b\in B}\sum_r
\left[
\mathbf x_a(T)\times\mathbf F_{a\leftarrow b}^{(r)}(T)
\right]_z.
$$

Changing the origin adds the corresponding linear-momentum Ward obligation. A retained angular-momentum result must therefore use the same origin, periodic unwrapping convention, and linear-momentum ledger throughout.

## 2. Microscopic Mechanical Ward Partition

Let $\psi_A(\mathbf x,T)$ be a normalized assignment function for assembly $A$, such as a periodic cell shape function, with $\int_V\psi_A\,dV=1$. Define

$$
\ell_z^{\mathrm{mech}}(\mathbf x,T)
=
\sum_A L_{A,z}(T)\psi_A(\mathbf x,T),
$$

and let $J_{L_z,\mathrm{conv}}^i$ be the corresponding convective material current. For each unordered assembly pair $\{A,B\}$ define the exchange and defect torques

$$
t_{AB,z}
=
\frac{\tau_{A\leftarrow B,z}-\tau_{B\leftarrow A,z}}{2},
\qquad
q_{AB,z}
=
\tau_{A\leftarrow B,z}+\tau_{B\leftarrow A,z}.
$$

The first is antisymmetric, $t_{BA,z}=-t_{AB,z}$, and can be represented as transport. The second is symmetric and cannot be hidden in a bond current.

The within-assembly directed interactions are booked separately as the braid pump row

$$
p_{A,z}
=
\sum_{a\in A}\sum_{b\in A}\sum_r
\left[
\mathbf x_a(T)\times\mathbf F_{a\leftarrow b}^{(r)}(T)
\right]_z,
$$

with the coincidence row excluded by the retained-root convention. When a matter braid is treated as the inserted source, $p_{A,z}$ is the subsystem-boundary pump. When the same branch is used as a sea constituent, $p_{A,z}$ is an intrinsic cell row that must be canceled microscopically; it is not an external source merely because the cell average can vanish.

For point assignment functions, introduce the periodic bond distribution

$$
B_{AB}^i(\mathbf x,T)
=
(X_A^i-X_B^i)
\int_0^1
\delta_V\!\left(\mathbf x-\mathbf X_B-s(\mathbf X_A-\mathbf X_B)\right)ds,
$$

which obeys

$$
\partial_i B_{AB}^i
=
\delta_V(\mathbf x-\mathbf X_B)-\delta_V(\mathbf x-\mathbf X_A).
$$

The exact mechanical partition is then

$$
\partial_T\ell_z^{\mathrm{mech}}
+
\partial_i
\left(
J_{L_z,\mathrm{conv}}^i
+
\sum_{A<B}t_{AB,z}B_{AB}^i
\right)
=
s_z^{\mathrm{ext}}
+
s_z^{\mathrm{braid}}
+
s_z^{\mathrm{pair}},
$$

where

$$
s_z^{\mathrm{braid}}(\mathbf x,T)
=
\sum_Ap_{A,z}\delta_V(\mathbf x-\mathbf X_A),
$$

and

$$
s_z^{\mathrm{pair}}(\mathbf x,T)
=
\frac12\sum_{A<B}q_{AB,z}
\left[
\delta_V(\mathbf x-\mathbf X_A)
+
\delta_V(\mathbf x-\mathbf X_B)
\right].
$$

The same construction works with smooth $\psi_A$ by replacing the delta functions and bond distribution with their shape-function versions.

This is the required relocation test at microscopic resolution:

- $t_{AB,z}$ is a genuine pair-exchange current. It cancels from the periodic volume integral.
- $q_{AB,z}$ is not transport. Its volume integral is the net directed-pair torque defect.
- $p_{A,z}$ is the unresolved within-braid pump. It is a declared source only for the inserted matter-braid subsystem; a homogeneous sea must close it inside the cell ledger.
- An external hold, boundary torque, or prescribed source belongs in $s_z^{\mathrm{ext}}$, not in $s_z^{\mathrm{pair}}$.

For an instantaneous reciprocal central pair law, $q_{AB,z}=0$. The delayed law does not generically have this property because the two directions use different emission events, separations, branch strengths, and velocities:

$$
\mathbf F_{a\leftarrow b}(T)
\ne
-\mathbf F_{b\leftarrow a}(T).
$$

Therefore a particle-only or assembly-only angular-momentum ledger is not a closed Ward identity.

## 3. Required Wake Completion

Rotational closure requires wake storage and wake flux satisfying

$$
\partial_T\ell_z^{\mathrm{wake}}
+
\partial_iJ_{L_z,\mathrm{wake}}^i
=
-s_z^{\mathrm{braid}}-s_z^{\mathrm{pair}}+s_z^{\mathrm{wake,ext}}.
$$

The completed identity would be

$$
\partial_T\ell_z
+
\partial_iJ_{L_z}^i
=
s_z,
$$

with

$$
\ell_z
=
\ell_z^{\mathrm{mech}}+\ell_z^{\mathrm{wake}},
\qquad
J_{L_z}^i
=
J_{L_z,\mathrm{conv}}^i
+
\sum_{A<B}t_{AB,z}B_{AB}^i
+
J_{L_z,\mathrm{wake}}^i,
$$

and $s_z=s_z^{\mathrm{ext}}+s_z^{\mathrm{wake,ext}}$ only. The internal pair defect must disappear from the total ledger.

The current global-drain instrument supplies directed mechanical torques, including the approximately $-0.65$ sea torque in the half-co-orbiting cage, but it does not supply $\ell_z^{\mathrm{wake}}$ and $J_{L_z,\mathrm{wake}}^i$ on the same record. That number therefore measures $q_{AB,z}$ plus any unresolved wake exchange; it is not yet an outward material flux.

This is a conservation defect in the available ledger, not evidence that the ontology violates conservation. The distinction is load-bearing: declaring the defect to be dissipation would assume the drain that the calculation is meant to test.

## 4. Periodic-Cell Ward Test

For one periodic cell of volume $V_c$, time-average over the balanced state's period $P$:

$$
\overline{Q}_{\mathrm{cell},z}
=
\frac1P\int_0^P
\left[
\sum_Ap_{A,z}(T)
+
\sum_{A<B}q_{AB,z}(T)
+
Q_{\mathrm{wake},z}(T)
\right]dT.
$$

Here $Q_{\mathrm{wake},z}$ is the cell integral of the wake-storage rate plus the net wake flux through the periodic faces, using one unwrapped-face convention. An admissible unforced homogeneous state requires

$$
\overline{Q}_{\mathrm{cell},z}=0.
$$

If the periodic face flux cancels but $\overline{Q}_{\mathrm{cell},z}\ne0$, the modeled population has an intrinsic volume source and cannot be the retained steady sea. If $\overline{Q}_{\mathrm{cell},z}=0$ only because two constituent spins grow with opposite signs, the vector average is zero but the local state is unbounded; the cell also fails.

## 5. Linear Long-Wavelength Response

Assume, only for this section, that a periodic balanced state $\mathcal S_0(T)$ has passed the cell Ward test and is bounded. Linearize the full delayed state, including wake variables, about $\mathcal S_0$. Because $\mathcal S_0$ can be periodic, this is a Floquet response problem rather than a static Hessian alone.

Let a slowly varying generalized source potential $\mu_z$ couple to $\ell_z$, and define the generalized torque gradient

$$
f_z^j=-\partial_j\mu_z.
$$

The homogenized constitutive response is

$$
J_{L_z}^i(\mathbf k,\omega)
=
\mathcal K_L^{ij}(\mathbf k,\omega)f_z^j(\mathbf k,\omega).
$$

The Ward identity also gives

$$
-i\omega\,\delta\ell_z
+
ik_i\delta J_{L_z}^i
=
\delta s_z^{\mathrm{ext}}.
$$

For an isotropic state, decompose

$$
\mathcal K_L^{ij}
=
\mathcal K_L^{\parallel}\widehat k^i\widehat k^j
+
\mathcal K_L^{\perp}
(\delta^{ij}-\widehat k^i\widehat k^j).
$$

Only the longitudinal part carries angular momentum away from a localized scalar axial source.

### 5.1 Diffusive pole

With susceptibility $\chi_L$, conductivity $\kappa_L$, and $D_L=\kappa_L/\chi_L$, the source-coupled diffusive response has the order-of-limits structure

$$
\mathcal K_L^{\parallel}(k,\omega)
=
-\kappa_L
\frac{i\omega}{D_Lk^2-i\omega}.
$$

With the Fourier and force signs declared above,

$$
\lim_{\omega\to0}\lim_{k\to0}\mathcal K_L^{\parallel}
=
\kappa_L,
\qquad
\lim_{k\to0}\lim_{\omega\to0}\mathcal K_L^{\parallel}
=
0.
$$

The first is the uniform-gradient transport limit; the second is the equilibrated static limit. A finite $\kappa_L$ permits transport but does not provide a terminal sink.

### 5.2 Ballistic pole

A conserved current or undamped collective mode gives a Drude form

$$
\mathcal K_L^{\parallel}(0,\omega)
=
\frac{\mathcal D_L}{\gamma-i\omega}
+
\mathcal K_{L,\mathrm{reg}}(\omega),
$$

with $\gamma\to0^+$. The zero-frequency response is singular, not a finite drain coefficient. A steady boundary-value solution then requires reservoirs, scattering, or a return branch that fixes the current.

### 5.3 Pinned or gapped pole

A restoring frequency $\Omega_0>0$ gives a reactive response of the form

$$
\mathcal K_L^{\parallel}(0,\omega)
\propto
\frac{-i\omega}{\Omega_0^2-\omega^2-i\gamma\omega},
$$

so

$$
\mathcal K_L^{\parallel}(0,0)=0.
$$

The applied torque produces bounded polarization or oscillatory storage, not a steady exported current.

### 5.4 First-order transparency and a second-order secular wake

First-order transparency means the linear dc coefficient closes:

$$
\mathcal K_L^{(1)}(\mathbf k,0)=0.
$$

That condition does not by itself bar a rectified second-order current driven by a periodic braid source. The relevant object is

$$
J_{L_z,\mathrm{dc}}^i
=
\mathcal K_{L}^{(2),ijk}
(\mathbf k=0;0,\Omega,-\Omega)
f_{z,\Omega}^j f_{z,-\Omega}^k
+
O(f_z^3).
$$

The proposed global drain therefore requires a nonzero, regulator-stable $\mathcal K_L^{(2)}$ while $\mathcal K_L^{(1)}(0)=0$, with the Ward defect canceled on the same record. A local loss-like phase lag $\chi''$ is insufficient because it can describe local storage redistribution without a nonzero surface current.

## 6. Localized Pump Boundary-Value Problem

Write the measured braid pump as

$$
s_{z}^{\mathrm{pump}}(\mathbf x)
=
\dot L_{z,\mathrm{pump}}\,g_a(\mathbf x),
\qquad
\int g_a\,dV=1,
$$

where $g_a$ resolves the finite source region. A true steady problem must also declare a counter-torque or return branch $s_z^{\mathrm{term}}$ such that

$$
\int
\left(s_z^{\mathrm{pump}}+s_z^{\mathrm{term}}\right)dV=0.
$$

Then

$$
\partial_iJ_{L_z}^i
=
s_z^{\mathrm{pump}}+s_z^{\mathrm{term}},
$$

and the expanding-surface flux is fixed kinematically:

$$
\Phi_z^{\mathrm{mat}}(R)
=
\oint_{S_R}J_{L_z}^in_i\,dA
=
\int_{V_R}
\left(s_z^{\mathrm{pump}}+s_z^{\mathrm{term}}\right)dV.
$$

For $a\ll R<R_{\mathrm{term}}$ this requires

$$
\Phi_z^{\mathrm{mat}}(R)=\dot L_{z,\mathrm{pump}}.
$$

For $R>R_{\mathrm{term}}$ the net flux is zero because the terminal counter-torque or return branch has closed the circuit.

For illustration, a three-dimensional diffusive constitutive law outside a pointlike source gives

$$
\ell_z(r)
=
\frac{\dot L_{z,\mathrm{pump}}}{4\pi D_Lr},
\qquad
J_{L_z}^r(r)
=
\frac{\dot L_{z,\mathrm{pump}}}{4\pi r^2},
$$

and hence the required constant inner flux. Without a finite terminal sink or return branch, however, the total stored angular momentum diverges with system size and a finite-time diffusion front grows forever. That is quasi-steady relocation, not OPEN under the decision rule.

Pinned or gapped response has no steady solution with nonzero flux; the source produces secular local storage unless an external constraint carries the torque. Ballistic response can carry the flux, but its amplitude and energy balance are undefined until the reservoirs or closed return path are specified.

## 7. Same-Record Energy Ledger

Let the source pattern rotate at cadence $\Omega_{\mathrm p}$. The pump power is

$$
\dot E_{\mathrm{pump}}
=
\Omega_{\mathrm p}\dot L_{z,\mathrm{pump}}
$$

when the torque and angular velocity are collinear. More generally use the same-record sum $\sum_A\boldsymbol\Omega_A\cdot\boldsymbol\tau_A$.

The energy continuity row must be

$$
\partial_TE
+
\partial_iJ_E^i
=
p^{\mathrm{ext}},
$$

with

$$
\oint_{S_R}J_E^in_i\,dA
=
\dot E_{\mathrm{pump}}
$$

between the source and terminal regions. At the terminal region, the counter-torque must book the corresponding work or an explicitly declared conversion into bounded internal energy. Exporting $L_z$ while energy accumulates without bound fails the steady-state test.

The delayed-force energy defect is the power analogue of $q_{AB,z}$:

$$
p_{AB}^{\mathrm{pair}}
=
\mathbf F_{A\leftarrow B}\cdot\mathbf V_A
+
\mathbf F_{B\leftarrow A}\cdot\mathbf V_B,
$$

supplemented by internal rotational work at assembly resolution. A valid wake completion must cancel both the torque and power defects on the same retained record.

## 8. Minimal Balanced Pumped Cell — Model Only

The smallest useful model is a periodic two-sublattice cell with two resolved neutral Noether braids:

- braid $+$ has its pump axis $+\widehat{\mathbf z}$;
- braid $-$ has its pump axis $-\widehat{\mathbf z}$;
- periodic images supply bonds in both directions, so current can cross a cell face and return through the opposite face;
- both braids use the same retained branch family, with the axis reversal or pro/anti operation specified by the model rather than assumed to be a retained population.

This is not a retained-sea claim. It is the smallest periodic test that distinguishes vector cancellation from microscopic balance. If a finite visualization of the circulation is needed, use a four-braid alternating-axis square, which is the doubled-cell representation of the same two-sublattice model.

Let the intrinsic pump rows be $p_+=+p$ and $p_-=-p$ in global $z$ coordinates. Let $T_{+\leftarrow-}$ and $T_{-\leftarrow+}$ include every cross-braid mechanical torque, and let $W_+$ and $W_-$ be the local wake-storage/exchange rows. Boundedness requires the two separate equations

$$
p+T_{+\leftarrow-}+W_+=0,
$$

$$
-p+T_{-\leftarrow+}+W_-=0.
$$

The cell Ward identity additionally requires

$$
T_{+\leftarrow-}+T_{-\leftarrow+}+W_++W_-=0.
$$

The coarse equality $p_++p_-=0$ is not enough. Each local equation must close without secular growth. The bond-current row must also be nonzero and face-consistent if the cell is claimed to carry transport:

$$
\overline J_{L_z}^{i}
=
\frac{1}{V_cP}
\int_0^P\sum_{A<B}t_{AB,z}B_{AB}^i\,dT
+
\overline J_{L_z,\mathrm{wake}}^i.
$$

Three outcomes are possible:

1. **Balanced but insulating:** both local rows close and $\overline{\mathbf J}_{L_z}=0$. This supplies a viable homogeneous background but no drain.
2. **Balanced and transporting:** both local rows close and a twist-response calculation gives nonzero dc or second-order secular transport. A localized source still needs a terminal counter-torque or return branch.
3. **Intrinsically pumped:** either local row fails or the cell-average Ward defect is nonzero. This population is not an admissible retained homogeneous sea state.

## 9. Fail-Closed Decision

### OPEN is not established

No retained or modeled state in the present record supplies all of:

- a canceled pair-torque defect through explicit wake storage and flux;
- a bounded periodic balanced cell;
- a nonzero linear dc or second-order secular transport coefficient;
- expanding-surface flux equal to $\dot L_{z,\mathrm{pump}}$;
- a declared terminal counter-torque or return branch;
- same-record energy flux equal to the pump power.

The finite cage and its approximately $-0.65$ sea torque do not meet these conditions.

### BARRED is not established

The Ward identity does not force $\mathcal K_L(\mathbf k,0)=0$ before the wake completion and retained balanced state are known. Bound isolated-braid fields also do not force the collective material coefficient to vanish. Therefore a theorem-level BARRED verdict would exceed the available derivation.

### Verdict: UNDECIDED

The exact remaining sub-calculation is:

> On one resolved periodic two-sublattice pro/anti or axis-reversed cell, compute every directed mechanical torque and power transaction from the canonical retained-root ledger; derive or extract the same-record wake angular-momentum and energy storage/current rows that cancel the pair defects; verify both local boundedness equations and the cell Ward identity; then apply an axial boundary twist or long-wavelength source at $(\mathbf k,\omega)$ and extract $\mathcal K_L^{(1)}$ and the rectified $\mathcal K_L^{(2)}(0;\Omega,-\Omega)$ with both orders of limits. Only after that cell passes should the localized-pump solve be run with an explicit terminal counter-torque or return branch.

If the wake completion cannot be constructed from the current ontology, that is the first proof-moving BARRED route. If it can be constructed but the passed cell has only pinned or gapped response and zero second-order secular coefficient for every admissible balanced branch, the transport route is BARRED. If a passed cell has nonzero transport, the route remains only conditionally open until the terminal and energy ledgers close.

## Promotion Disposition

- Current packet: **priority-only**.
- Promotion class: **defer with blocker**.
- Blocker: no retained balanced sea state and no same-record wake angular-momentum/energy storage-current completion.
- Eventual corpus destinations remain those named in the parent memo, but neither this derivation nor its UNDECIDED verdict authorizes promotion.

Closure goal: compute the same-record wake completion and linear-plus-quadratic transport response of one resolved periodic balanced sea cell, then close the localized pump against an explicit terminal torque and energy ledger.
