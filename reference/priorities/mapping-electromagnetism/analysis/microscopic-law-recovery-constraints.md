# Constraints on Microscopic Laws from Coulomb and Liénard–Wiechert Recovery

## Purpose and scope

Coulomb and Liénard–Wiechert behavior constrain what a microscopic theory must produce in its electromagnetic regime. They do not, by themselves, identify the microscopic acceleration equation. This analysis derives several conditional constraints on that recovery: the factorization of static source and receiver responses, the distance powers available from finite direct sums, the vector structure required by moving sources, and the separate requirement for a radiative response. It also identifies what distant recovery leaves undecided about a local speed-crossing event.

The [originating discussion](../../braid-program/brainstorming.md#coulomb-recovery-and-the-microscopic-acceleration-law) asks whether charged assemblies could recover these laws under a different microscopic equation. No replacement equation is selected here. The canonical [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), original binary histories and unrestricted architrino velocities retain their existing meaning. Standard electromagnetic equations enter only as observer-level recovery targets or conditional comparison mathematics.

All substrate numerical conventions use $c_f=1$. The symbol $c_{\mathrm{eff}}$ denotes propagation speed in an effective electromagnetic description. Its relation to substrate units and to observer clocks and rulers must be supplied by a recovery map. An effective source trajectory restricted to speed below $c_{\mathrm{eff}}$ is a classical comparison domain, not an architrino speed ceiling.

This packet specializes the existing [effective-field requirements](../../mapping-equations/analysis/inferring-braid-requirements.md#effective-field-requirement-ledger), [multi-receiver response protocol](e0-e4-multi-receiver-electric-response.md), and [single-source comparison](../manuscript.md#35-one-delayed-source-the-liénardwiechert-solution-against-the-per-hit-kernel). It supplies conditional mathematics, not retained assemblies, a constitutive medium, a new benchmark inventory or a changed equation score.

## 1. What is being recovered

A microscopic history records architrino positions, causal emissions and any retained wake or environment state. Denote that complete record by $\mathcal H$. At the most general level relevant here, write the acceleration law as

$$
\ddot{\mathbf X}_i(T)=\mathcal F_i[\mathcal H_{\le T}].
$$

This notation does not choose an interaction kernel. To compare a solution with an electromagnetic experiment requires additional, independently specified maps: which retained configuration counts as a source, which observable describes the receiving assembly, and how distances and times are read. Naming an effective field after dividing one measured acceleration by a fitted coefficient does not establish that the same field serves other receivers.

Let $A$ label a source assembly and $B$ a receiver assembly. Let $\mathcal O_{B\leftarrow A}$ be the source-induced change in the chosen receiver observable, with the source-absent background subtracted. The initial static comparison will use the leading group-acceleration response of a slow, isotropic receiver. Its scalar response coefficient is $\chi_B$; no intrinsic architrino mass or primitive $q\mathbf E/m$ law is assumed. Internal deformation is a separate observable and can remain nonzero when leading group translation vanishes.

In a weak-response regime, a proposed microscopic-to-observable map may admit the factorization

$$
\delta\mathcal O_{B\leftarrow A}
=\mathcal P_B\,\mathcal G\,\mathcal K\,\mathcal S_A\,\delta u_A.
$$

Here $\delta u_A$ is a small source perturbation, $\mathcal S_A$ maps source structure into emission, $\mathcal K$ represents microscopic interaction, $\mathcal G$ includes propagation and any derived environmental response, and $\mathcal P_B$ maps the received record into the receiver observable. The operators can include time integrals and tensor components. This is a conditional response description: a differentiable response and the declared separation must first exist on an actual retained background solution. No stability spectrum is being computed about an assumed equilibrium. Time-translation invariance, isotropy and Fourier representations used below are further effective-regime assumptions.

Only the combined operator is constrained by a source-to-receiver measurement. Algebraically, inserting an admissible invertible intermediate map $H$ as $\mathcal K'=H\mathcal K$ and $\mathcal G'=\mathcal G H^{-1}$ leaves the product unchanged. This demonstrates non-uniqueness of factor identification; it does not prove that arbitrary factors are causal, well posed or realizable by architrinos. Microscopic evidence is needed to distinguish physically admissible realizations.

## 2. Static Coulomb requirements

### 2.1 Range, direction and a universal charge

For source and receiver extents small compared with separation $R$, define the unit direction $\mathbf n$ from source to receiver. The static Coulomb recovery target is

$$
\mathcal O_{B\leftarrow A}(R\mathbf n)
=\frac{C_{BA}}{R^2}\mathbf n+o(R^{-2}),
\qquad
C_{BA}=C_{\mathrm E}\chi_B Q_A.
$$

The constant $C_{\mathrm E}>0$ fixes one common effective normalization; $Q_A$ is independently defined effective source charge. The leading term must be uniform over orientations and internal phases declared to represent the same isotropic charged state. An anisotropic receiver may instead have a declared tensor response, but that tensor must serve all source cases without refitting. The scalar target here applies to the isotropic comparison class.

The factorization has a checkable consequence. Every two-by-two minor of the source-receiver coefficient matrix must vanish:

$$
C_{BA}C_{DC}-C_{BC}C_{DA}=0.
$$

Indeed, substitution of $C_{BA}=C_{\mathrm E}\chi_BQ_A$ makes both products equal. Conversely, for a nonzero coefficient matrix with every such minor zero, choose $C_{B_0A_0}\ne0$ and set $\chi_B=C_{BA_0}$ and $C_{\mathrm E}Q_A=C_{B_0A}/C_{B_0A_0}$. The minors then reconstruct the factorization. This converse establishes only an algebraic separation. It does not identify the factors with physical charge or independently derive their normalization.

Physical Coulomb recovery additionally requires source-charge additivity in the linear regime, the declared sign reversal under charge conjugation, absence of a leading source monopole for an effectively neutral assembly, and common superposition across independent sources. Neutral receivers may still polarize or respond to gradients. Raw acceleration coefficients need not satisfy $C_{BA}=C_{AB}$: different receiving assemblies can have different responses. Reciprocal force or energy normalizations belong to a further derived assembly account.

Claim grade: derived coefficient-factorization constraint, conditional on the stated observable and isotropic Coulomb target. A transverse leading response, an orientation-dependent leading coefficient in that class, or a nonzero minor falsifies that particular recovery map. Vanishing minors alone do not establish charge additivity or a retained physical assembly.

### 2.2 What a static causal hit fixes

For a comparison law retaining a sharp causal surface, write one radial contribution as

$$
\int e_A(S)\,k(r)\,w_0(r,S)\,\hat{\mathbf r}\,
\delta\!\left(\Phi(R,T,S)\right)\,dS.
$$

The emission density is $e_A$, the radial magnitude kernel is $k$, the additional weight is $w_0$, and $\Phi=0$ selects admitted causal events. At a single static simple root $S_*$, delta collapse gives the magnitude

$$
e_A(S_*)\,k(R)\,
\frac{w_0(R,S_*)}{|\partial_S\Phi(R,T,S_*)|}.
$$

With scalar receiver response $\chi_B$, Coulomb recovery constrains this combined product to have the required inverse-square tail and source normalization. It cannot identify each factor separately. For the current stationary-source control, $\Phi=R-(T-S)$ and $|\partial_S\Phi|=1$; the canonical $k(R)=R^{-2}$ already supplies the exponent. Its successful static comparison therefore cannot serve as an independent derivation of that microscopic exponent.

### 2.3 A compact direct sum cannot create a slower tail

Let a finite set of direct contributions have offsets $|\boldsymbol\delta_\alpha|\le L$, bounded coefficients $b_\alpha(R)$, and pure-power radial kernel

$$
\mathbf K_p(\mathbf r)=\frac{\mathbf r}{|\mathbf r|^{p+1}},\qquad p>0.
$$

For $R\gg L$, Taylor expansion gives

$$
\mathbf K_p(R\mathbf n+\boldsymbol\delta_\alpha)
=R^{-p}\mathbf n
+R^{-p-1}[I-(p+1)\mathbf n\mathbf n^{\mathsf T}]\boldsymbol\delta_\alpha
+O(L^2R^{-p-2}).
$$

The derivative used here is $\partial_b(K_p)_a=R^{-p-1}[\delta_{ab}-(p+1)n_an_b]$ on the ray $R\mathbf n$. Summing finitely many bounded terms proves that the result is $O(R^{-p})$. If their summed coefficient tends to a nonzero constant, the leading exponent remains $p$. For fixed coefficients with zero sum, cancellation exposes a faster-decaying spatial moment.

Consequently, a nonzero unamplified monopole tail requires $p=2$ to recover Coulomb scaling. For $p>2$, the stated finite sum cannot produce a nonzero $R^{-2}$ tail. Cancellation of a slower tail with $p<2$ is a different possibility, but any surviving term must still meet the direction, isotropy and charge-factorization requirements. Matching an exponent alone is insufficient.

For delayed sources, bounded coefficients additionally require uniformly bounded active-root count and causal weights over the observation family. A bounded receiver response is needed to transfer the estimate to its observable. An extended environment, growing root population, singular weight or distance-dependent amplification lies outside this theorem and must be derived separately if invoked.

### 2.4 What static recovery leaves open dynamically

Under the Fourier convention $\widehat f(\mathbf k)=\int e^{-i\mathbf k\cdot\mathbf x}f(\mathbf x)\,d^3x$, the exact Coulomb target has

$$
\widehat\phi(\mathbf k)=\frac{4\pi C_{\mathrm E}}{|\mathbf k|^2}\widehat\rho(\mathbf k),
\qquad
\widehat{\mathbf E}(\mathbf k)
=-\frac{4\pi iC_{\mathrm E}\mathbf k}{|\mathbf k|^2}\widehat\rho(\mathbf k).
$$

Here $\rho$ is effective charge density and $\phi$ is an effective scalar potential. The spatial identity follows from $-\nabla^2(1/R)=4\pi\delta^3(\mathbf x)$, with its normalization fixed by flux through a sphere. Thus the exact static target fixes the zero-frequency longitudinal response, meaning the component parallel to $\mathbf k$. In an asymptotic recovery claim, the corresponding long-wavelength limit requires control of the omitted corrections.

Static data do not determine propagation speed or time-dependent transverse response. As an explicit comparison, the causal wave Green responses

$$
\widetilde G_c(\mathbf k,\omega)
=\frac{1}{|\mathbf k|^2-(\omega+i0)^2/c^2},\qquad c>0,
$$

all have the same $\omega=0$ value $1/|\mathbf k|^2$ while propagating at different symbolic speeds $c$. The $i0$ specifies the causal boundary prescription for time convention $e^{-i\omega t}$. These are mathematical comparison kernels, not alternative selected architrino equations. They exhibit directly why static inverse-square recovery cannot establish the dynamical law.

## 3. Moving-source and radiation requirements

### 3.1 The classical target

Let an effective point source of constant charge $Q$ follow a twice continuously differentiable trajectory $\mathbf z(t_{\mathrm e})$, with speed below $c_{\mathrm{eff}}$. At an observation event $(\mathbf x,t)$ off the source worldline, define $R=|\mathbf x-\mathbf z(t_{\mathrm e})|>0$, $\mathbf n=(\mathbf x-\mathbf z(t_{\mathrm e}))/R$, $\boldsymbol\beta=\dot{\mathbf z}(t_{\mathrm e})/c_{\mathrm{eff}}$, $\mathbf a=\ddot{\mathbf z}(t_{\mathrm e})$, and $d=1-\mathbf n\cdot\boldsymbol\beta$. The source time solves $t-t_{\mathrm e}=R/c_{\mathrm{eff}}$; assume a complete past history admitting that unique root. The target fields are

$$
\mathbf E_{\mathrm{LW}}
=C_{\mathrm E}Q
\left[
\frac{(1-\beta^2)(\mathbf n-\boldsymbol\beta)}{d^3R^2}
+\frac{\mathbf n\times[(\mathbf n-\boldsymbol\beta)\times\mathbf a]}{c_{\mathrm{eff}}^2d^3R}
\right],
\qquad
\mathbf B_{\mathrm{LW}}=\frac{\mathbf n\times\mathbf E_{\mathrm{LW}}}{c_{\mathrm{eff}}}.
$$

All source quantities in the brackets are evaluated at $t_{\mathrm e}$. This conventional formula and its differentiations are given in [Fitzpatrick, Accelerated Charges](https://farside.ph.utexas.edu/teaching/jk1/Electromagnetism/node155.html). It is an external effective target, not a primitive acceleration rule. A finite assembly requires a controlled point-source approximation over the wavelengths, distances and frequencies being compared. No approximation valid only at large distances licenses point-source claims inside the assembly.

### 3.2 A scalar multiplier of one delayed radial direction is insufficient

For uniform source motion, $\mathbf a=0$. Let $P_\perp=I-\mathbf n\mathbf n^{\mathsf T}$ project perpendicular to the delayed source direction. The target has

$$
P_\perp\mathbf E_{\mathrm{LW}}
=-\frac{C_{\mathrm E}Q(1-\beta^2)}{d^3R^2}\,
P_\perp\boldsymbol\beta.
$$

This is nonzero when source velocity has a transverse component. Every vector of the form $f(R,\boldsymbol\beta,\mathcal H)\mathbf n$ has zero perpendicular projection, regardless of its scalar weight. Changing only the radial magnitude or the power of $d$ therefore cannot turn that directly identified vector into the full moving-charge electric field.

At small source speed the velocity-field numerator and weight combine as

$$
\frac{R^2\mathbf E_{\mathrm{vel}}}{C_{\mathrm E}Q}
=\mathbf n+3\mathbf n(\mathbf n\cdot\boldsymbol\beta)-\boldsymbol\beta+O(\beta^2)
=\mathbf n+2\mathbf n(\mathbf n\cdot\boldsymbol\beta)-\boldsymbol\beta_\perp+O(\beta^2),
$$

where $\boldsymbol\beta_\perp=P_\perp\boldsymbol\beta$. The canonical single-hit comparison instead gives $\mathbf n[1+\mathbf n\cdot\boldsymbol\beta]+O(\beta^2)$ when the two propagation conventions are identified solely for formula comparison. The first-order difference is $2\mathbf n(\mathbf n\cdot\boldsymbol\beta)-\boldsymbol\beta$. This is a direct-identification obstruction, not a theorem against assembly, wake-state or receiver-response recovery.

The identity $\mathbf B=\mathbf n\times\mathbf E/c_{\mathrm{eff}}$ presupposes that the full single-source effective $\mathbf E$ has already been recovered. Substituting a purely radial hit into it gives zero. It therefore does not show that radial hit magnitude and direction alone contain the recovered magnetic datum. In a multi-source field, the source-specific cross products must be summed before the directional labels are discarded.

#### Geometry of the earlier and current source positions

The perpendicular component is defined relative to the line from the source's earlier emission position to the observation point. It does not mean that the entire electric field is perpendicular to that line. For a positive classical charge moving at constant velocity, the full electric field points along the line from its current position to the observation point. These two lines generally differ. The magnitude still has velocity and angular dependence; the direction statement does not replace the field with an instantaneous Coulomb law.

For a concrete geometry, place the earlier source at $(0,0)$, an observation point $P$ at $(0,R)$, and let the source move right at speed $v$. Over the causal travel time $\Delta t=R/c_{\mathrm{eff}}$, it moves to $(\beta R,0)$, where $\beta=v/c_{\mathrm{eff}}$. The sketch shows a positive source and the electric-field arrow at $P$:

```text
         ↖ E
          P •
            |\
            | \
            |  \
      S_old •───• S_now
              → v
```

The old-source line is vertical. The line from the current source to $P$ points up and left. In this geometry $\mathbf n=(0,1)$, $\boldsymbol\beta=(\beta,0)$ and $d=1$, so the uniform-motion field has the exact component form

$$
\mathbf E
=\frac{C_{\mathrm E}Q(1-\beta^2)}{R^2}(-\beta,1),
\qquad
\frac{E_x}{E_y}=-\beta.
$$

Thus the field has an upward component along the earlier-source line and a leftward component perpendicular to it. At $v=c_{\mathrm{eff}}/2$, the leftward component has half the magnitude of the upward component. This numerical ratio is a classical comparison; the substrate convention remains $c_f=1$, without assigning a value to $c_{\mathrm{eff}}$.

The general direction follows from an exact kinematic identity. With $\mathbf R_{\mathrm{now}}=\mathbf x-\mathbf z(t)$ and uniform $\mathbf v$,

$$
\mathbf R_{\mathrm{now}}
=\mathbf x-\mathbf z(t_{\mathrm e})-\mathbf v(t-t_{\mathrm e})
=R(\mathbf n-\boldsymbol\beta).
$$

The velocity-field formula is a positive scalar times this vector for $Q>0$, and has the opposite direction for $Q<0$. This agrees with the [classical uniform-motion identity](https://farside.ph.utexas.edu/teaching/jk1/Electromagnetism/node155.html). The result remains causal: earlier position and velocity suffice to extrapolate the current position when velocity really is constant. If the source changes its motion after the sampled emission, the observer does not learn that change before its signal arrives; the uniform-motion extrapolation then need not equal the actual current position.

Claim grade: derived geometry and component ratio within the classical constant-velocity target. If source motion and the source-to-observer direction are collinear, $\boldsymbol\beta_\perp=0$ and this transverse component vanishes. The original strictly collinear architrino binary therefore acquires no sideways acceleration from this comparison. Uniform source motion also has no acceleration-radiation term: a component transverse to the earlier-source line does not by itself identify radiation. No assembly recovery or microscopic-law change is asserted.

### 3.3 Radiation requires a different distant amplitude

At an emission event with $\boldsymbol\beta=0$, the radiative target becomes

$$
\mathbf E_{\mathrm{rad}}
=\frac{C_{\mathrm E}Q}{c_{\mathrm{eff}}^2R}
\mathbf n\times(\mathbf n\times\mathbf a).
$$

It is transverse and is nonzero for transverse source acceleration. The distant comparison follows observation events with a fixed outgoing signal phase, rather than taking $R\to\infty$ at a fixed reception time before the signal arrives. This is a field-amplitude statement; recovering energy transport also requires the corresponding effective energy and boundary account. The conventional distinction between inverse-square and inverse-distance terms is discussed in [Feynman, Volume II, Chapter 21](https://www.feynmanlectures.caltech.edu/II_21.html#Ch21-S1).

There is a useful conditional bound for direct recovery. Suppose every source-tagged canonical hit in that observation family has range at least $R-L$, the number of terms is at most $N_*$, the normalized transmitter factors obey $|D_t|\ge d_*>0$, and coupling magnitudes are bounded by $K_*$. Then

$$
\left\|\sum_{\mathrm{hits}}\mathbf A_{\mathrm{hit}}\right\|
\le\frac{N_*K_*}{d_*(R-L)^2}=O(R^{-2}).
$$

Require these hit bounds uniformly throughout a fixed-duration signal-phase observation window $W_R$. Suppose the linearized receiver projection obeys $\|\mathcal P_Rf\|_{\mathrm{out}}\le C\|f\|_{L^\infty(W_R)}$, with $C$ independent of $R$, and its source-dependent input is precisely the bounded direct-hit sum. The source-induced observable is then also $O(R^{-2})$ in the declared output norm. Its product with $R$ tends to zero and cannot equal a nonzero radiative $R^{-1}$ amplitude in that family. A readout requiring derivatives or additional history is covered only if its corresponding input norm has its own uniform bound.

Claim grade: derived obstruction for bounded finite direct sums and bounded receiver readout. A proposed radiation mechanism must identify which assumption changes: for example a distributed evolving carrier, a resolved extended environment, additional causal weights or populations, or a response that is not bounded in the stipulated norm. This list supplies possibilities to investigate, not evidence that any works. The theorem does not establish that the full Master Equation lacks radiation, and it says nothing by itself about the existence of a wake-energy current.

### 3.4 The receiver response is a further condition

Recovering source fields is not sufficient to recover how moving assemblies respond to them. The effective electric and magnetic readouts must serve multiple independently specified receiver classes. In the slow-receiver classical regime, the signed translation response must reproduce the electric and magnetic velocity dependence after the receiver normalization is derived; at higher effective speeds, the appropriate full assembly kinematics and energy-response map are additional obligations. No primitive cross-product acceleration or intrinsic mass is inserted into $\mathcal F_i$ to satisfy this condition.

## 4. A sufficient effective route and its remaining burden

One sufficient route is to derive, in the intended continuum regime, effective source density $\rho$, current $\mathbf J$ and potentials $\phi,\mathbf A$ satisfying

$$
\partial_t\rho+\nabla\cdot\mathbf J=0,
\qquad
\left(c_{\mathrm{eff}}^{-2}\partial_t^2-\nabla^2\right)\phi=4\pi C_{\mathrm E}\rho,
$$

$$
\left(c_{\mathrm{eff}}^{-2}\partial_t^2-\nabla^2\right)\mathbf A
=\frac{4\pi C_{\mathrm E}}{c_{\mathrm{eff}}^2}\mathbf J,
\qquad
\nabla\cdot\mathbf A+c_{\mathrm{eff}}^{-2}\partial_t\phi=0.
$$

Here $\mathbf A$ is an effective vector potential, distinguished from bold acceleration $\mathbf A_{ij}$ by its role and lack of particle indices. Define effective fields by $\mathbf E=-\nabla\phi-\partial_t\mathbf A$ and $\mathbf B=\nabla\times\mathbf A$. These equations are sufficient effective outputs to target; assuming them microscopically would not constitute recovery. The potential representation is not a unique necessary microscopic architecture. Equivalent field or response formulations can produce the same observables.

For no added incoming homogeneous field, the causal Green function is

$$
G_{\mathrm R}(\mathbf x,t)
=\frac{\delta(t-|\mathbf x|/c_{\mathrm{eff}})}{4\pi|\mathbf x|},
$$

giving $\phi=4\pi C_{\mathrm E}G_{\mathrm R}*\rho$ and $\mathbf A=(4\pi C_{\mathrm E}/c_{\mathrm{eff}}^2)G_{\mathrm R}*\mathbf J$, where $*$ integrates over source space and time. This wave-equation construction is an independently known classical reference; see [Feynman, sections 21–2 through 21–5](https://www.feynmanlectures.caltech.edu/II_21.html#Ch21-S2).

For $\rho(\mathbf x,t)=Q\delta^3(\mathbf x-\mathbf z(t))$ and $\mathbf J=\rho\dot{\mathbf z}$, spatial integration leaves the source-time constraint $h(t_{\mathrm e})=t-t_{\mathrm e}-R(t_{\mathrm e})/c_{\mathrm{eff}}$. Its derivative is $h'=-d$. Delta collapse therefore gives

$$
\phi=\frac{C_{\mathrm E}Q}{Rd},
\qquad
\mathbf A=\frac{\dot{\mathbf z}}{c_{\mathrm{eff}}^2}\phi.
$$

The potential has one inverse causal factor. The derivative identities

$$
\partial_t t_{\mathrm e}=\frac1d,
\qquad
\nabla t_{\mathrm e}=-\frac{\mathbf n}{c_{\mathrm{eff}}d}
$$

follow by differentiating $h=0$. Using them in the field derivatives produces the velocity and acceleration terms in section 3.1. In particular, the field's cubic denominators and transverse terms follow from derivatives of both potentials and of the delayed source data; matching the potential denominator alone does not recover them.

The microscopic burden is to derive this common response, source continuity, receiver coupling, effective speed and observer transformation behavior from the same retained dynamics, with corrections controlled over the declared regime. Boundary and energy accounts must accompany claims about radiation or backreaction. The prescribed classical source path provides an independent target; it is not a self-consistent solution of a proposed microscopic theory.

## 5. Distant recovery does not fix local speed-crossing behavior

The original binary exposes a separate local question. On a prescribed smooth transverse crossing, use elapsed substrate time $t>0$ from the event and incoming slope $a>0$. The existing [local geometry](../../braid-program/analysis/speed-crossing-opposing-interaction-geometry.md#leading-cancellation-and-its-limit) gives $r(t)\sim2t$ and $|D_t(t)|\sim at$ for the newborn self root. For a conditional comparison magnitude $k(r)|D_t|^{-\nu}$ with $k(r)\sim k_0r^m$, $k_0>0$, its acceleration is

$$
\mathbf A_{\mathrm{self}}(t)
\sim\kappa q_i^2k_0\,2^m a^{-\nu}t^{m-\nu}\mathbf e,
$$

where $\mathbf e$ is the limiting inward direction. A nonzero fixed-sign contribution has finite accumulated acceleration exactly when $m>\nu-1$ and bounded acceleration exactly when $m\ge\nu$. The borderline $m=\nu-1$ is logarithmically divergent.

If uniform emission and the same sharp causal delta are retained, the change-of-variables identity fixes $\nu=1$. It is not a free exponent within that unchanged scaffold. Then:

| Radial magnitude near zero | Local self contribution | Accumulated acceleration |
| --- | --- | --- |
| $k(r)\sim k_0r^{-2}$ | $t^{-3}$ | Divergent |
| $k(r)\to k_0>0$ | $t^{-1}$ | Logarithmically divergent |
| $k(r)\sim k_0r^m$, $0<m<1$ | $t^{m-1}$ | Finite, with unbounded acceleration |
| $k(r)\sim k_0r$ | Finite nonzero limit | Finite |
| $k(r)\sim k_0r^m$, $m>1$ | Tends to zero | Finite |

Thus merely making the radial magnitude bounded and nonzero at zero would not remove the accumulated singularity on this fixed crossing. A far-distance requirement $k(r)\sim C/r^2$ as $r\to\infty$ supplies no condition on $m$ as $r\to0$. Those are independent limits. A recovery requirement imposed down to arbitrarily small primitive separations would be a stronger assumption and would remove that particular freedom.

At positive limiting range $r\to R_0>0$ with $k(R_0)\ne0$, a branch with $|D_t|\sim d_0t^b$ instead contributes $t^{-b\nu}$ and is locally integrable only for $b\nu<1$. Changing the kernel only near zero does not alter this positive-range criterion. Cancellation in the complete signed vector sum can change the total behavior, as the separate reflected-source example demonstrates.

Claim grade: derived tests on fixed prescribed root geometry with nonzero stated asymptotic coefficients. They are not solutions of a modified equation, proofs of well-posed continuation, or amendments to the original binary. Changing a kernel can change the incoming trajectory and root geometry as well as the local exponent. The original history's full event equation would still need to be satisfied. Classical external-field recovery does not by itself settle microscopic self-hit, coincidence or event-extension rules.

## 6. What is constrained and what remains free

| Ingredient | Requirement from the declared electromagnetic recovery | What is not determined by this requirement alone |
| --- | --- | --- |
| Static observable | Inverse-square leading range, radial isotropic direction, charge additivity and receiver/source factorization | Individual microscopic radial kernel or emission factor without restrictions on the other factors |
| Bounded compact direct tail | Nonzero monopole exponent must be two | Extended-medium, singular-weight or collective alternatives outside the finite-sum assumptions |
| Moving-source observable | Full velocity-dependent vector and angular structure | Whether that structure comes from assembly organization, wake evolution or another microscopic mechanism |
| Radiation observable | Transverse inverse-distance amplitude, correct delayed phase and effective speed | A physical carrier or energy current merely from matching an amplitude |
| Source and receiver maps | One common field response across sources and receivers, with conserved effective current in the Maxwell route | Primitive charge normalization, intrinsic mass, or a receiver-specific fitted field |
| Propagation | Common causal effective response in the tested regime | Equality of $c_{\mathrm{eff}}$ and $c_f$ before clocks, rulers and the propagation map are derived |
| Short-distance and self-event law | Compatibility with the full chosen microscopic dynamics and any claimed continuation | Local core exponent, impulse prescription or same-time self term from distant Coulomb data |
| Microscopic velocity | No restriction follows on individual architrino speed from the effective-source domain used here | A universal architrino speed ceiling |

The completed result is a set of conditional restrictions and sufficient effective targets. It does not prove that the current equation can or cannot recover electromagnetism through a complete assembly/environment response, and it does not establish the existence of a better microscopic equation. A candidate becomes discriminating only when it supplies the missing maps and survives the same static, moving-source and radiation comparisons without separate retuning.

## Development record and next artifact

The static factorization, finite-sum bound, moving-source direction obstruction and local exponent conditions were derived in parallel read-only analytical assignments and reconciled with the live equation and mapping owners. The classical reference formulas were checked against primary university teaching sources. Exact controls are the static limit of the displayed fields, the perpendicular projection for uniform motion, the rank-one coefficient identity and delta collapse on a simple root. No numerical trajectories or new numerical validation instrument were used.

The next focused derivation is the most general admissible leading assembly/environment response that could supply the missing moving-source transverse term and radiative term while preserving the static charge map. Its assumptions must be explicit and derived from retained histories where a physical claim is intended. A guessed response function can illustrate a necessary form but cannot establish a microscopic mechanism. Existing retained-assembly and constitutive-response prerequisites remain in their current owners; this packet adds no executable queue object or acceptance decision.
