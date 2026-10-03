# Prepared populations, response coordinates and scale constraints

## Scope and status

The shared pressure-response object remains Deferred / blocked. This note identifies its missing substrate inputs and prepares a kinematic alternative for operator discussion; it does not redefine the accepted v0 object, select a sea composition or launch a calculation. Dimensional and coordinate identities below are derived and self-reviewed; the population and collective readout constructions remain proposals.

## Pressure requires a defined account

The substrate constants have dimensions $[c_f]=LT^{-1}$ and $[K]=[\kappa q^2]=L^3T^{-2}$. Every product of them has zero mass exponent, whereas ordinary pressure has dimension $ML^{-1}T^{-2}$. Thus these constants alone do not normalize an ordinary physical pressure. An accepted account could introduce an observer-facing bookkeeping normalization; that is not an intrinsic architrino mass. Even though a specific-pressure scale with dimension $L^{-1}T^{-2}$ can be formed, for example $c_f^8/K^3$, dimensional availability supplies no stress definition or mechanism to apply it.

The Master Equation specifies acceleration from histories. To compare preparations, give their constituents, positions, velocities, complete pasts, environment and boundary operations. An effective pressure can label that comparison only after a same-record stress/flux account, averaging convention and dimensional calibration define it. A number called $\Delta P_\ell$ cannot serve as an executable input before those definitions exist. No pressure–density equation or externally applied acceleration is inserted here.

## Proposed dimensionless preparation coordinate

One candidate is an isotropic density preparation coordinate $h$. At a declared initial cut, map braid centers by

$$
C_a(h)=F(h)C_a(0),\qquad F(h)=e^{-h/3}I.
$$

Keep the constituent identities and each braid's internal geometric parameters fixed for this comparison. With the same braid count in the corresponding transformed volume,

$$
\rho_{\rm NS}^{\rm prep}(h)=e^h\rho_{\rm NS}^{\rm prep}(0),
\qquad h=\Delta\ln\rho_{\rm NS}^{\rm prep}.
$$

This is a coordinate declaration, not an EOM symmetry or an evolved density law. Changing centers requires specifying the entire pertinent past and exterior; an affine image of a solution is not automatically another solution. Internal paths are not silently rescaled. The preparation must preserve clearance and supply the full mutual response, or explicitly identify the narrower prescribed diagnostic.

On two accepted, linked population records with declared branch transitions and readout windows, a proposed response is

$$
\mathbf R_h^{(\ell)}
=\frac1h\left(
\Delta\ln n,\Delta\ln\chi_{\rm sea},\Delta\ln\Gamma_N,
\Delta S_{ij},\Delta\mathcal M_{\rm sea}^{ab}
\right).
$$

Every logged scalar must be positively and operationally defined. The prepared density difference and evolved readout difference need not coincide. A general strain direction instead needs its own declared $F(h)$ and readout; there is no direction-independent scalar response by definition.

Compare $h$ with a smaller step using unchanged readouts, root coverage and accounts. A record-mismatch control is meaningful without predicting an unknown response sign; an opposite-sign control needs a stated analytical sign reference. If an accepted same-record pressure $P(h)$ later exists with nonzero $dP/dh$, then the differential pressure response obeys $\mathbf R_P=\mathbf R_h/(dP/dh)$. If that derivative vanishes or depends on an untracked preparation variable, pressure is not a valid local coordinate along this family.

Recommendation: discuss this density-coordinate comparison as an amendment or preparatory companion. Its parameter, admission and readout choices are concrete, but remain unadopted; the v0 pressure pair and score are preserved.

## Effective speed is a channel readout

Wake fronts propagate at $c_f$. A collective effective speed must refer to a defined disturbance and detector record; it is not a changed primitive wake speed. A group-delay readout is one candidate, rather than the only possible meaning of effective speed. Carrier, phase and front speeds are different observables.

For a frequency-resolved comparison with time convention $e^{i\omega T}$, fix the launch disturbance, receiver observables, station separation $L_2-L_1>0$, reference frame, analysis window and source/detector calibration. Suppose nonzero transfer functions $H_1,H_2$ exist for a declared approximately stationary channel. Define

$$
\tau_{21}(\omega)=-\partial_\omega\arg[H_2(\omega)/H_1(\omega)],
\qquad
c_{\rm eff}^{\rm grp}(\omega)=\frac{L_2-L_1}{\tau_{21}(\omega)}.
$$

Only a positive resolved delay with a controlled dependence on station distance licenses this positive local speed. A periodic background needs its phase and sideband convention; an unstable or strongly time-dependent background needs a finite-window response instead of assuming stationary transfer. Do not average unrelated channels into one scalar.

For the analytical pure-delay control $H_2/H_1=e^{-i\omega(L_2-L_1)/c_f}$, the formula returns $c_f$. A candidate sea delay factor can be $c_f/c_{\rm eff}^{\rm grp}$ after that specific readout is accepted. Group delay alone proves neither a signal-front speed bound nor the universal inequality $c_{\rm eff}<c_f$. The [corpus weak-field comparison](../../../../../content/markdown/aaa/spacetime/noether-sea.md#refractive-gravity-and-effective-metric) retains its constitutive hypothesis. No transfer function was extracted here.

## A scaled history needs an equation check

For the unchanged causal-root equation, scaling lengths by $a>0$ and absolute times by $b>0$ gives the covariance

$$
X_i^{a,b}(T)=aX_i(T/b),\qquad
c_f^{a,b}=\frac ab c_f,\qquad K^{a,b}=\frac{a^3}{b^2}K.
$$

Delays scale by $b$, transmitter weights remain the same, and both sides of the acceleration equation scale by $a/b^2$. Holding $c_f$ fixed requires $b=a$; then preserving the generic solution by this transformation requires $K^{a,a}=aK$. There is no nontrivial generic dilation symmetry with both constants fixed.

This does not exclude special continuously scaled solutions: a zero-acceleration stationary configuration remains an equilibrium when its geometry is dilated. Nor does it exclude continuous shape parameters or a different solution family. It does exclude treating arbitrary geometric copies of a moving braid as accepted histories at unchanged constants.

For the specific alternating six-ring balances in the [Braid ladder](../../braid-program/evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md), size is fixed by the complete radial ledger and speed parameter $\beta=\Omega R/c_f$. Its recorded high-rung asymptotic is

$$
R_*=\frac K{c_f^2},\qquad
\frac R{R_*}=\frac3{2\beta}+\frac{3\ln2}{\pi\beta^2}
+o(\beta^{-2}),\qquad
P=\frac{2\pi R}{\beta c_f}.
$$

Thus along that ledger-selected family, increasing rung index gives radii of inverse-index order and periods of inverse-square order. Smaller high rungs have greater superfield site speeds. This is not a dynamical retuning law, physical energy spectrum or proof of stable constituents. Importing the exact family requires selecting its actual rung history, not an arbitrary continuous scale; a guessed sea construction can retain other scale parameters only with its own equation-residual and admission obligations.

## Collective rates and infinite-population admission

The [weak-coupling checkerboard lemma](../../lattice-research/analysis/checkerboard-weak-coupling-rate.md) proves a linear coherent growth rate $\gamma^2=(4\pi/3)K n_{\rm arch}[1+O(\sqrt g)]$ on that bare-architrino preparation. It is not a braid-population susceptibility or signal speed. The exact mode's existence for every positive coupling does not exclude all static ordered populations. The binary slow drift and the ring's unknown stability likewise do not exhaust all candidate coupled histories.

Comparing this bare rate with a ring frequency gives only a formal scale ratio,

$$
\frac{\gamma^2}{\Omega^2}\sim\frac{8\pi}{9}
\frac{n_{\rm arch}R^3}{\beta},
$$

using both the weak-coupling lattice and high-rung ring limits. It supplies no accepted braid-density packing bound: their constituents and domains differ, neutral assembly responses can cancel, and a dense high-rung substitution can violate the weak-coupling assumption. Internal frequency alone does not establish a restoring response or eliminate a collective instability.

Any infinite preparation must justify its actual received-root sum and derivatives. The [lattice summation discussion](../../lattice-research/manuscript.md#18-the-topology-and-summation-rule-are-part-of-the-result) and [independent envelope adjudication](../../analysis/population-admissibility-independent-adjudication.md) distinguish a sufficient $p>1$ distant-past envelope from the coordinated-velocity divergence witness and other conditional weighted-moment routes. That envelope is not a universally necessary history class or an adopted physical sea distribution. Equal-time neutrality does not supply delayed weighted moment cancellation.

Falsifiers: a valid dimensional pressure account resolves the missing normalization but not the preparation mechanism; an admitted retained family satisfying the claimed dilation at unchanged constants supersedes that family's scale objection; a failure of the pure-delay sign check overturns the proposed readout; a controlled collective spectrum or received-tail theorem for the declared sea changes the population constraints. No population calculation was run here.
