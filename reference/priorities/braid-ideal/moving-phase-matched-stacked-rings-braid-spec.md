# §96 Moving Phase-Matched Stacked-Rings Braid Seed

**Date:** 2026-07-12  
**Claim level:** seed-grade production-root diagnostic; no retained-branch acceptance  
**Runner:** `scripts/braid-ideal/moving-phase-matched-stacked-rings-braid.mjs`  
**Fixture:** `scripts/braid-ideal/moving-phase-matched-stacked-rings-fixture.mjs`  
**Owner test:** `tests/braid-ideal-moving-phase-matched-stacked-rings-braid.test.js`

## Closure target

Test a moving, untilted alternative to the closed tilted-spindle branch. Each of three coaxial planar rings is an antipodal electrino–positrino binary. The middle ring lies on the field-speed rail, $omega R_M=c_f$. Consecutive rings are separated so that

$$
\frac{z_{\rm gap}}{d}=\frac{u}{c_f}.
$$

The runner tests whether the stack closes radially at one global coupling, has negligible secular axial torque, and has a marginal or stable zero-tilt spectrum. A reverse-ordered, charge-flipped, contra-rotating partner is gated on all three single-stack results.

## Constructed phase match

For an adjacent source ring $a$ and trailing receiver ring $b$, the fixture sets

$$
d_{ab}=|R_b-R_a|,
\qquad
\Delta t_{ab}=\frac{d_{ab}}{c_f},
\qquad
z_{\rm gap}=u\Delta t_{ab},
\qquad
\phi_b=\phi_a-\omega\Delta t_{ab}.
$$

At the selected delayed root, the source emission point and receiver hit point therefore have the same azimuth. Their line of action is radial in the transverse plane, and its axial component is zero. The runner verifies this construction using `AbsoluteHistoryRootRuntime` rather than accepting the analytic relation alone. All additional causal roots remain in the force and torque record.

## Search and gates

The declared search covers all six axial orders, both radial phase-match spacing branches on each gap, two inner-radius ratios, two outer-radius ratios, and three drift speeds. The short branch uses $d_{ab}=|R_b-R_a|$ with equal delayed-ray azimuth; the long branch uses $d_{ab}=R_a+R_b$ with opposite delayed-ray azimuth. For every row, the production-root forces are cycle averaged. The single global coupling is the least-squares coefficient for the three required radial accelerations,

$$
\kappa_\star
=
\frac{\sum_i f_i^{\rm raw}a_i^{\rm req}}
{\sum_i(f_i^{\rm raw})^2},
\qquad
a_i^{\rm req}=-\omega^2R_i.
$$

The dimensionless binding residual is

$$
\epsilon_{\rm bind}
=
\frac{\|\kappa_\star\mathbf f^{\rm raw}-\mathbf a^{\rm req}\|_2}
{\|\mathbf a^{\rm req}\|_2}.
$$

Binding requires $kappa_\star>0$ and $epsilon_{\rm bind}\le 0.03$. Pump freedom requires $|\tau_z|\le 0.02$. The tilt pencil uses production moving-circular roots for static tilt rows and production retained linear-segment roots for tilt-rate rows. Its diagonal second-order coefficients are numerical integration weights $2R_i^2$, not architrino physical masses. Flutter freedom is fail-closed: no unstable complex tilt root may exist, and the leading quotient root must have real part no greater than $10^{-6}$.

## Controls and release discipline

At $u=0$, the imposed axial gaps vanish and the geometry recovers the nested planar limit. Removing two rings leaves the base flat binary. The velocity sweep must expose the direct consequence $z_{\rm gap}\propto u$; this is compared with, but not represented as a derivation of, Lorentz axial contraction.

Phase 2 runs only if binding, pump freedom, and flutter freedom all pass. Otherwise the runner reports the first failed gate, keeps the pro/anti construction unrun, leaves `retainedBranchClaim=false`, and records `scoreMovement=no_score_increase`. A native retained-history release is never inferred from a seed-grade near miss.

## Measured seed verdict

The declared coarse search contains $288$ rows. Binding-only refinement selects the axial order $M\to I\to O$, the long spacing branch on both gaps, and

$$
u=0.48046875c_f,
\qquad
(R_I,R_M,R_O)=(0.99511719,1.25,1.87402344).
$$

The two gaps are

$$
(d_1,d_2)=(2.24511719,2.86914063),
\qquad
(z_1,z_2)=(1.07870865,1.37853241).
$$

The production roots verify the selected transverse lines to axial residuals $4.62\times10^{-13}$ and $6.71\times10^{-14}$. Their geometric axial-torque residuals are $4.26\times10^{-13}$ and $7.27\times10^{-14}$. Thus the Mach construction itself is realized accurately.

The complete root record does not close. At the best positive global coupling,

$$
\kappa_\star=4.52636941,
\qquad
\mathbf R=(0.06849450,-0.02235171,-0.02879827),
$$

so

$$
\|\mathbf R\|_2=0.07759147,
\qquad
\epsilon_{\rm bind}=0.04922985.
$$

The $4.92\%$ relative residual misses the declared $3\%$ binding gate. The neighbor contribution on the inner ring is outward, $+0.07628085$, while the middle and outer neighbor contributions are $-0.00721750$ and $-0.18659108$. One positive coupling therefore cannot make all three rings close exactly.

The complete record is also not pump-free:

$$
\tau_z=+13.37621958.
$$

The designated transverse rays carry negligible geometric axial torque, but the remaining inter-site production roots do not preserve that cancellation.

The zero-tilt pencil is unstable. Its leading quotient root is a real divergence,

$$
\lambda_{\rm lead}=+1.55692239,
$$

and an unstable complex row also survives,

$$
\lambda_{\rm flutter}=+0.73541518+0.99659531i.
$$

The relative $x/y$ tilt-stiffness asymmetry is $0.75514216$, so un-nesting did not remove the complete-record tilt asymmetry in this seed model.

Decision: `single_stack_fails_seed_gate_no_pair_run_no_release`. The first failed gate is `single_stack_binding`; the pump and flutter gates also fail. Phase 2 is not run. No native retained-history release is authorized, and there is no score increase.

The velocity sweep confirms $z_{\rm gap}=ud/c_f$: the axial gaps grow linearly with $u$ at fixed transverse wake distance. This is opposite the direction required for Lorentz axial contraction, so the imposed Mach geometry exposes a kinematic tension rather than deriving the Lorentz behavior.
