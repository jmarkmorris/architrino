# Color Charge and SU(3)

This chapter gives the current assembly-level interpretation of color charge and effective `SU(3)` structure. Its purpose is to explain how quark color bookkeeping, confinement language, and tri-binary scaffold geometry are meant to fit together before the full topological confinement derivation is closed. It is the fermion-side companion to [Gluons and the Strong Force: Geometric Origins](../bosons/gluons.md) and [Quarks](./quarks.md).

---

## Ontology, Notation, and Generations

### Tri‑binary scaffold (the “Noether core”)

Each fermion is built on a **tri‑binary scaffold**: three nested electrino:positrino binaries sharing a center. We sometimes call this scaffold a **Noether core** to emphasize that all conserved quantities (electric charge, color, baryon number, etc.) are encoded in its internal symmetries, in the spirit of Noether’s theorem; see [Nested Binaries and the Noether Core](../../spacetime/noether-core.md).

We label the three binaries by their dynamical regime:

- **H‑binary (High / inner)**
  - Smallest radius
  - Velocity $v_H > c_f$
  - Self‑hit regime (strong path memory, highest curvature/energy)

- **M‑binary (Medium / middle)**
  - Intermediate radius
  - Velocity $v_M = c_f$
  - Symmetry‑breaking “pivot” scale

- **L‑binary (Low / outer)**
  - Largest radius
  - Velocity $v_L < c_f$
  - Lowest curvature; outer envelope, expansion/contraction behavior

Each binary defines one **axis** with two polar **polar sites**, each occupied by either:

- Electrino (−e/6), or  
- Positrino (+e/6).

So each Noether core has 3 axes (H, M, L) × 2 poles = **6 polar sites**.

We distinguish:

- **Scaffold architrinos**: the three e/p pairs in the H, M, L binaries (2 per binary → 6 per quark).
- **Axial architrinos**: the 6 ±e/6 decorations on the poles.

For a Gen‑I quark:

- 6 scaffold architrinos (3 binaries × 2)  
- 6 axial architrinos  
- Total per quark: 12.

For a Gen‑I baryon (3 quarks):

- 18 scaffold architrinos  
- 18 axial architrinos  
- **36 architrinos** total.

We will use “tri‑binary” for the structure; “Noether core” when we are emphasizing its role as the seat of conserved charges.



### Generational excitation states

Standard Model “generations” are interpreted as **excitation states** of the same tri‑binary topology:

- **Gen‑I (ground‑state assembly)**  
  - All three binaries assembled: [H, M, L].  
  - Fully shielded H core.

- **Gen‑II (first excitation)**  
  - Only [H, M] assembled coherently.  
  - L‑binary is **unassembled** (or transient): the outer shield is absent, exposing more of the H/M structure.

- **Gen‑III (second excitation)**  
  - Only [H] assembled.  
  - M and L cannot maintain coherent orbits at that energy; the H self‑hit core is effectively naked.

We treat these as **different assembly states**, not dissociation products in time. Heavier generations require energy input to form and relax back via W/Z/$\gamma$/$\nu$ emission.

In this section, color is defined on **Gen‑I** Noether cores; higher generations inherit the same color structure via their remaining axes (H only, or H+M).



### Braid orientation: matter vs antimatter

Beyond which binaries are present, their **precession order** defines a braid orientation:

- **Matter** tri‑binaries: precession order $H \to M \to L$ in time (one chirality).  
- **Antimatter** tri‑binaries: precession order $H \to L \to M$ (opposite chirality).

This **braid chirality** will underpin our distinction between particles and antiparticles across all sectors and will later feed into CP‑related questions. Here, we keep **color** as a vector‑like degree of freedom: it does **not** depend on braid chirality.



## Colorless Fermions: Axis Uniformity

**Core rule:**  
Color charge appears only when the tri‑binary axes are **not equivalent**. If all three axes carry the same axial pattern, there is no “which axis is special?” degree of freedom → **no color**.

### Stealth and color neutrality

The guiding physical picture is that long-lived assemblies must suppress time-dependent far-field leakage. A useful test state is the equal-phase triad
$$
\phi \in \left(0,\frac{2\pi}{3},\frac{4\pi}{3}\right),
$$
for which
$$
1+e^{i2\pi/3}+e^{i4\pi/3}=0.
$$
This does not derive the full color algebra by itself, but it gives a clean geometric reason why three-way closure is special: three balanced phase channels can hide the leading dipole signal. In that heuristic sense, color-singlet organization is not just algebraic neutrality but a **stealth condition** that helps the Noether core survive without strong radiative leakage.

### Electron and positron

- **Electron**:
  $(\text{H},\text{M},\text{L}) = (-/-,\ -/- ,\ -/-)$
  - Each axis: net −2e/6.  
  - Total: −6e/6 = −e.  
  - All axes identical → SU(3)$_c$ singlet.

- **Positron**:
  $(+/+,\ +/+,\ +/+)$
  - Each axis: net +2e/6.  
  - Total: +e.  
  - All axes identical → singlet.

### Neutrinos: near-photon colorless neutral pairs

Neutrinos are now treated as near-photon neutral assemblies rather than ordinary six-site axial-layer fermions. The working picture is a near-planar pro/anti Noether-core pairing close to the photon channel, but not fully locked into the photon mode.

This makes the color statement sharper:

- The neutrino has no stable quark-like axial layer on which one H, M, or L axis can become exceptional.
- Its pro/anti pairing cancels charge-like exposure and leaves no color triplet degree of freedom.
- The balanced $3P,3E$ notation used in weak bookkeeping is an interaction projection, not a constituent color pattern.

Older neutral-axis patterns such as
$$
(-/+,\ -/+,\ -/+)
$$
or
$$
(+/+,\ -/+,\ -/-)
$$
are therefore best read as effective exposure diagrams for weak-channel coupling, not as the canonical neutrino inventory. Residual internal-binary exposure inside the near-photon pair remains the natural place to seek neutrino mass eigenstates and oscillation structure.

We do **not** claim a PMNS-level derivation yet; that is a targeted future calculation in the [neutrino section](./neutrinos.md).



## Quarks: Axis Exceptionality and Admissible Patterns

Quarks are color‑charged because **one axis is in a different axial class than the other two**.

### General “two‑same + one‑different” rule

Let each axis pattern be coarse‑classified as:

- **P−**: pure electrino $(-\!/-)$  
- **P+**: pure positrino $(+\!/+)$  
- **Pm**: mixed $(-\!/+)$ (net neutral, dipolar)

The key structural rule for **admissible, stable quark‑like Noether cores** is:

> Exactly **two axes share the same axial class**, and the third is **different in kind** (P− vs P+ vs Pm).  

We **forbid** stable states with all three axes in different classes (e.g. H: P+, M: P−, L: Pm). Those “three-different” configurations have no clear background/exceptional split; in our picture they are dynamically unstable in the Noether-Sea medium and quickly relax or disintegrate.

Therefore:

- **Colorless**: H,M,L all same class (e.g., all P− or all Pm).  
- **Colored quark**: H,M,L pattern is one of:
  - $P_{\text{bkg}}, P_{\text{bkg}}, P_{\text{exc}}$  
  where $P_{\text{exc}} \ne P_{\text{bkg}}$.

Color degree of freedom is then:  
**which axis carries $P_{\text{exc}}$?**



### Up‑type quarks (5p, 1e)

Up‑type (u,c,t) Gen‑I quarks have:

- 5 positrinos, 1 electrino among 6 polar sites.

At axis‑class level:

- **Two axes**: P+ ($+/+)$  
- **One axis**: Pm (contains the single electrino; local pattern e.g. $-/+$)

Thus:

- Background class: P+  
- Exceptional class: Pm

Define color basis:

- $|u_H\rangle$: H axis is Pm (exceptional), M and L = P+.  
- $|u_M\rangle$: M exceptional.  
- $|u_L\rangle$: L exceptional.

These span the color space:
$\mathcal{H}^{\text{color}}_u = \mathrm{span}\{|u_H\rangle,|u_M\rangle,|u_L\rangle\} \cong \mathbb{C}^3.$

Pole assignment inside the exceptional axis (which pole hosts the electrino) changes local dipole structure but not which axis is exceptional; at the level of color it’s a **gauge‑like internal redundancy**.

Anti‑up quarks use an anti‑tri‑binary with 5 electrinos, 1 positrino (and reversed braid), forming the conjugate triplet **3̄** with basis $|\bar u_H\rangle,|\bar u_M\rangle,|\bar u_L\rangle$.



### Down‑type quarks (4e, 2p)

Down‑type (d,s,b) Gen‑I quarks have:

- 4 electrinos, 2 positrinos among 6 slots.

All admissible axis‑class patterns consistent with 4e,2p and the “two‑same + one‑different” rule group naturally into two **families**.

#### Family I — “one P+ axis, two P− axes”

Written as (H,M,L):

- (A) $(P-, P-, P+)$ → $(-\!/-,-/- ,+\!/+)$  
- (B) $(P-, P+, P-)$  
- (C) $(P+, P-, P-)$

Here:

- Background: P− on two axes.  
- Exceptional: P+ on one axis.

#### Family II — “one P− axis, two Pm axes”

- (D) $(Pm, Pm, P-)$ → $(-\!/+,-/+,-/-)$  
- (E) $(Pm, P-, Pm)$  
- (F) $(P-, Pm, Pm)$

Here:

- Background: Pm on two axes.  
- Exceptional: P− on one axis.

In both families, the same structural pattern appears:

> Two axes share one class; one axis in the other class.

Thus for down‑type $d$ we again define:

- $|d_H\rangle$: H axis is exceptional (either P+ among P−, or P− among Pm).  
- $|d_M\rangle$: M exceptional.  
- $|d_L\rangle$: L exceptional.

and:
$\mathcal{H}^{\text{color}}_d = \mathrm{span}\{|d_H\rangle,|d_M\rangle,|d_L\rangle\} \cong \mathbb{C}^3.$

#### Family selection: dynamic, not arbitrary

We must not over‑predict.

- If **both** families were independently stable and long‑lived for the same down‑flavor, we’d have extra down‑like quarks beyond d/s/b. That is not observed.
- Therefore, the dynamics must:

  1. Select one family per flavor (e.g. d uses Family II, s uses Family I), or  
  2. Make one family metastable/short‑lived only at high energies, or  
  3. Contextually select families inside hadrons (baryon environment determines which pattern survives).

### Rigorous low-energy selection criterion

Fix one down flavor and let $\Omega_I,\Omega_{II}$ be the Family I/II constrained sectors of the full 9-axis baryon network phase space (after quotienting axis-label gauge redundancy).

Define the reduced energy minima
$$
E_F^\star \equiv \min_{X\in\Omega_F}\mathcal{E}(X),\qquad F\in\{I,II\},
$$
and local Hessians
$$
H_F \equiv D^2\mathcal{E}(X_F^\star).
$$
For finite but low effective noise/temperature $T_{\mathrm{eff}}$, use the harmonic free-energy approximation
$$
\mathcal{F}_F(T_{\mathrm{eff}})
=
E_F^\star+\frac{T_{\mathrm{eff}}}{2}\log\det H_F
+\mathcal{O}(T_{\mathrm{eff}}^2).
$$

Linearize the delay dynamics about each minimizer and let
$$
\rho_F\equiv \max_{j\neq 1}|\mu_j^{(F)}|
$$
be the Floquet spectral radius of nontrivial multipliers.

**Theorem (Single-family low-energy survival).**  
Assume there exists $F_\star\in\{I,II\}$ such that:

1. **Local dynamical stability:** $\rho_{F_\star}<1$.
2. **Competitor exclusion:** either $\rho_{\bar F}\ge 1$ (linearly unstable), or $\rho_{\bar F}<1$ and
$$
\Delta\mathcal{F}\equiv \mathcal{F}_{\bar F}-\mathcal{F}_{F_\star}>0.
$$
3. **Low-energy regime:** $T_{\mathrm{eff}}\ll \Delta\mathcal{F}$ and forcing amplitude is below the inter-family escape barrier.

Then stationary occupation satisfies
$$
\frac{\pi_{\bar F}}{\pi_{F_\star}}
\lesssim
\exp\!\left(-\frac{\Delta\mathcal{F}}{T_{\mathrm{eff}}}\right),
$$
so $\pi_{\bar F}\to 0$ as $T_{\mathrm{eff}}\to 0$. Hence exactly one down-family survives as the low-energy ambient family.

*Proof sketch:* stable branches are metastable wells of the same delay flow; occupation ratio follows from large-deviation/Kramers scaling with free-energy gap, and unstable branches have zero asymptotic weight.

**Concrete screening corollary (Family II preference test).**  
If the reduced minimum can be decomposed as
$$
E_F^\star = E_{\text{core},F}+E_{\text{self-hit},F}+E_{\text{strain},F}-s\,N_{Pm}^{(F)},
$$
with $N_{Pm}^{(I)}=0$, $N_{Pm}^{(II)}=2$, then Family II is selected whenever
$$
2s>
\big(E_{\text{core},II}-E_{\text{core},I}\big)
+\big(E_{\text{self-hit},II}-E_{\text{self-hit},I}\big)
+\big(E_{\text{strain},II}-E_{\text{strain},I}\big),
$$
and the stability condition $\rho_{II}<1$ holds.

**Failure condition (theory-level, explicit).**  
The model fails this selection requirement if, over the low-energy ambient window relevant to nucleons,
$$
\rho_I<1,\qquad \rho_{II}<1,\qquad
|\mathcal{F}_{II}-\mathcal{F}_I|\le \varepsilon_F
$$
for tolerance $\varepsilon_F$ set by simulation uncertainty and environmental broadening.  
In that case both families are generically long-lived and comparably populated, which over-predicts down-type species and requires revision of the assembly-selection mechanism.



## Color Hilbert Space and SU(3) Structure

For any quark flavor $q$, define the color state space
$$
\mathcal{H}^{\text{color}}_q \equiv \mathrm{span}\{|q_H\rangle,|q_M\rangle,|q_L\rangle\}\cong\mathbb{C}^3,
$$
where $|q_H\rangle,|q_M\rangle,|q_L\rangle$ mean "axis-exceptionality on H/M/L", respectively.
Fix this ordered basis and identify it with the canonical triplet basis
$$
|q_H\rangle\leftrightarrow e_1,\quad |q_M\rangle\leftrightarrow e_2,\quad |q_L\rangle\leftrightarrow e_3.
$$

### Admissible color transformations

We model internal color reconfiguration by linear maps $U:\mathcal{H}^{\text{color}}_q\to\mathcal{H}^{\text{color}}_q$ satisfying:

- Preserve net electric charge and total axial inventory.
- Preserve the one-axis-exceptionality sector (map superpositions of $|q_H\rangle,|q_M\rangle,|q_L\rangle$ to itself).
- Preserve Born norm (probability conservation): $U^\dagger U=I$.
- Preserve oriented color volume (gauge-fixed convention): $\det U=1$.

So the effective color action is represented by
$$
U\in SU(3).
$$

The usual global phase map $|q\rangle\to e^{i\theta}|q\rangle$ is treated as unobservable gauge redundancy (it does not change which axis is exceptional or relative axis phases).

### Generator basis from axis operations

Let $E_{ab}$ be matrix units in the ordered basis $(H,M,L)$, i.e.
$(E_{ab})_{cd}=\delta_{ac}\delta_{bd}$ for $a,b\in\{H,M,L\}$.
Define Hermitian generators:
$$
T^{(x)}_{ab}\equiv \frac{1}{2}(E_{ab}+E_{ba}),\qquad
T^{(y)}_{ab}\equiv -\frac{i}{2}(E_{ab}-E_{ba})
\quad (a<b),
$$
giving six off-diagonal generators:
$(HM),(HL),(ML)$ each with $(x,y)$ components.
Define diagonal generators:
$$
H_1\equiv \frac{1}{2}(E_{HH}-E_{MM}),\qquad
H_2\equiv \frac{1}{2\sqrt{3}}(E_{HH}+E_{MM}-2E_{LL}).
$$
These eight matrices are exactly the standard $T^a=\lambda_a/2$ basis up to the explicit relabeling $1\leftrightarrow H$, $2\leftrightarrow M$, $3\leftrightarrow L$.

### Algebra closure (rigorous statement)

**Proposition.** The real span of
$$
\mathcal{B}=\{T^{(x)}_{HM},T^{(y)}_{HM},T^{(x)}_{HL},T^{(y)}_{HL},T^{(x)}_{ML},T^{(y)}_{ML},H_1,H_2\}
$$
is an 8-dimensional Lie algebra isomorphic to $\mathfrak{su}(3)$; equivalently,
$$
[T^a,T^b]=i f^{abc}T^c
$$
for the standard SU(3) structure constants in this basis.

**Proof.** Each element of $\mathcal{B}$ is Hermitian and traceless, and there are eight linearly independent such matrices. Under the basis identification above, $\mathcal{B}$ maps one-to-one to the Gell-Mann basis $\{\lambda_a/2\}_{a=1}^8$, whose commutator algebra is $\mathfrak{su}(3)$. Therefore the axis-exceptionality generators close under commutator with the same structure constants.

### Example: H↔M axis-swap generator

The infinitesimal H↔M mixer is
$$
T^{(x)}_{HM}
=\frac{1}{2}\begin{pmatrix}
0&1&0\\
1&0&0\\
0&0&0
\end{pmatrix}
=\frac{\lambda_1}{2}.
$$
It continuously rotates exceptionality between H and M while leaving L unchanged at first order. Together with $T^{(y)}_{HM}=\lambda_2/2$, it generates the embedded SU(2) subgroup acting on the $(H,M)$ color plane.



## Baryons, Color Singlets, and the 9‑Axis Braid

A Gen‑I baryon (e.g., proton or neutron) consists of:

- 3 quarks → 3 Noether cores  
- Each with H, M, L axes  
- Total of **9 axes**: H₁,M₁,L₁; H₂,M₂,L₂; H₃,M₃,L₃.  
- 18 scaffold architrinos + 18 axial architrinos → **36 architrinos**.

### Color singlet condition as closed braid

In SU(3):

- Baryon color state: $3 \otimes 3 \otimes 3 \supset 1$ (fully antisymmetric singlet).

In tri‑binary geometry:

- A color singlet baryon is a configuration where each of H, M, L is exceptional **once** across the three quarks, and the 9 axes form a **closed coupling network** (a closed braid).
- Example proton (uud, schematic):

  - Quark 1 (u): exceptional on H → $|u_H\rangle$  
  - Quark 2 (u): exceptional on M → $|u_M\rangle$  
  - Quark 3 (d): exceptional on L → $|d_L\rangle$

At large distances, axis‑dependent multipoles from each regime cancel:

- H‑exceptionality from one quark is compensated by M and L exceptionality from others in the composite singlet combination.  
- Net color flux into the surrounding Noether Sea is zero; only isotropic monopole fields (charge, baryon number, mass) remain.

This closed 3‑strand braid (in color space) is **topologically distinct** from 2‑strand configurations (mesons). Breaking a baryon into pure leptons/mesons would require nonlocal rupture of the Noether cores: that is the topological underpinning for **baryon number conservation** in this model (proton stability).


## Residual Strong Force and Nuclear Binding

Even for color‑singlet nucleons:

- Internal H, M, L structures and down‑quark family choices determine how perfectly the 9‑axis braid is screened at distances ≲ 1–2 fm.

Heuristic:

- At inter‑nucleon separations ~ a few fm, outer L‑axes (and to some degree M‑axes) from neighboring nucleons begin to overlap and couple via the Noether-Sea tri‑binary medium.  
- These residual couplings act like **meson exchange** in standard nuclear physics, producing an attractive Yukawa‑like force with a hard‑core repulsion scale tied to H/M structure.

We will exploit:

- Down‑quark Family I vs II patterns,  
- Axis‑overlap geometry (L‑L, L‑M interactions),  

to derive nucleon–nucleon potentials and binding energies in the nuclear section. Here we just note:

> Residual strong force emerges from the same axis/braid structure as color, via imperfect screening of H/M/L at finite nucleon separations.

## Closure Interface: Confinement Energy Scaling

The algebraic SU(3) closure above is necessary but not sufficient for full confinement closure.

Energy-side target inherited from the topological program:
$$
E_{\mathrm{open}}(L)=\sigma_{\mathrm{eff}}L+E_0+\mathcal{O}(1/L),\qquad \sigma_{\mathrm{eff}}>0,
$$
for open color braids/flux sectors, while closed singlet sectors satisfy
$$
E_{\mathrm{closed}}(L)\to E_{\infty}<\infty
$$
and vanishing far-field color flux.

The Wilson-loop benchmark is the observer-level gauge-theory diagnostic for the same distinction. For a rectangular loop $C_{R,T}$ in the fundamental color representation, the strong-sector branch should recover
$$
\left\langle W(C_{R,T})\right\rangle_{\theta}
\sim
\exp\!\left[-\sigma_{\mathrm{eff}}(\theta)\,R\,T+\mathcal{O}(R+T)\right]
$$
in the confining window, while non-confining or screened limits must show the corresponding perimeter-law or string-breaking behavior. This target is not a claim that the lattice Wilson loop is fundamental ontology; it is the tested gauge-invariant way to compare open color-corridor energy with QCD.

The same branch must also provide a closed-sector mass-gap diagnostic. For a pair of gauge-invariant closed color probes separated by $R$,
$$
\left\langle \mathcal{O}_{\mathrm{closed}}(0)\mathcal{O}_{\mathrm{closed}}(R)\right\rangle_{\theta}
\sim
\exp\!\left[-M_{\mathrm{gap}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)R\right],
\qquad
M_{\mathrm{gap}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)>0.
$$
This is the mass-gap recovery target for closed strong-sector braids, separate from the open-string tension target.

This energy law is a closure target, not a restatement of QCD in native vocabulary. The observer-level benchmarks to preserve are the static-potential string tension, the absence of asymptotic free color charge, a finite pure-gauge mass gap, and the hadron-spectrum constraints currently organized by QCD and lattice calculations. A useful confinement residual is
$$
\mathcal{R}_{\mathrm{conf}}(\theta)
=
d_{\sigma}\!\left(\sigma_{\mathrm{eff}}(\theta),\sigma_{\mathrm{QCD}}\right)
+
d_{\mathrm{gap}}\!\left(M_{\mathrm{glue}}^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta),M_{\mathrm{glue}}^{\mathrm{lat}}\right)
+
d_{\mathrm{free}}\!\left(O_{\mathrm{color}}(\theta),O_{\mathrm{color}}^{\max}\right),
$$
where the terms compare the extracted open-sector tension, the lowest closed strong-sector excitation scale, and the predicted free-color signal against the corresponding accepted benchmark or bound. The same branch record must drive all three terms. If $\sigma_{\mathrm{eff}}$, the mass gap, and free-color suppression require independent Noether-Sea variables or separate color-sector fits, the confinement program has reproduced the appearance of QCD rather than deriving its non-perturbative content.

This chapter therefore carries:
- **already closed:** color Hilbert space, generator construction, and $\mathfrak{su}(3)$ algebra closure;
- **to close quantitatively:** open-vs-closed energy scaling with explicit $\sigma_{\mathrm{eff}}$ extraction from medium shear/torsion, finite mass-gap recovery, and bounded free-color residuals.

Primary topology spine: [dynamics/causal-action-functional.md](../../dynamics/causal-action-functional.md).

## Summary and Interfaces

- A **Noether core / tri‑binary** is a three-axis $(H,M,L)$, six-site axial structure: the minimal unit that carries conserved charges via its internal symmetries.
- **Colorless** charged leptons have identical axial patterns on all three axes, while neutrinos are colorless near-photon pro/anti neutral pairs; neither route supplies quark-like axis exceptionality.
- **Quarks** have “two‑same + one‑different” axis‑class patterns:
  - Up‑type: two P+ axes, one Pm axis.  
  - Down‑type: either (two P−, one P+) or (two Pm, one P−) families.
- Color = which axis (H,M,L) is exceptional. This yields a natural triplet color space $\mathbb{C}^3$ on which SU(3) acts via charge‑preserving, det‑1 reconfigurations of axis exceptionality and phase.
- **Baryon color singlets** = closed 9‑axis braids; **flux tubes** = open braids in the Noether Sea with linear energy cost per unit length → confinement.
- Down‑quark pattern families, H/M/L regime differences, and braid orientation are downstream interfaces for neutrino oscillation modeling, proton-neutron mass and moment differences, residual nuclear forces, and QCD phase-transition or early-universe thermodynamics. Those applications must inherit the same color-exceptionality and confinement ledger rather than introducing separate color rules.
