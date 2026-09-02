# H2 Molecular Bond and Event Ledger

## Status and Claim Boundary

- **Work item:** `NAM-005 molecular_bonding_bridge`
- **Selected molecule:** ground-state molecular hydrogen, $\mathrm H_2$.
- **Status:** Complete at source-bound benchmark-design grade.
- **Current native disposition:** `blocked_missing_native_h2_bond_carrier`.

The source-bound observer target is the $X\,{}^1\Sigma_g^+$ ground electronic state, identified by the NIST Chemistry WebBook as $1s\sigma^2$. NIST reports the equilibrium internuclear distance $r_e=0.74144\,\mathring{\mathrm A}$, vibrational constants $\omega_e=4401.213\,\mathrm{cm}^{-1}$ and $\omega_ex_e=121.336\,\mathrm{cm}^{-1}$, rotational constant $B_e=60.8530\,\mathrm{cm}^{-1}$, rotation-vibration coefficient $\alpha_e=3.0622\,\mathrm{cm}^{-1}$, and centrifugal-distortion constant $D_e=0.0471\,\mathrm{cm}^{-1}$. The NIST-hosted 2010 CODATA review gives the ground-state dissociation-energy benchmark $E_B(\mathrm H_2)=4.4781\,\mathrm{eV}$.

Sources:

- NIST Chemistry WebBook SRD 69, [Hydrogen: constants of diatomic molecules](https://webbook.nist.gov/cgi/cbook.cgi?ID=C1333740&Mask=1828), ground-state row and cited spectroscopy sources.
- P. J. Mohr, B. N. Taylor, and D. B. Newell, [CODATA recommended values of the fundamental physical constants: 2010](https://physics.nist.gov/cuu/pdf/JPCRD2010CODATA.pdf), equation (11) and its cited molecular-energy source.

These are measured or critically compiled observer-level benchmarks. They do not establish an $\mathbb{A}\mathbb{A}\mathbb{A}$ bond mechanism, a literal molecular orbital, a primitive potential, or a retained native $\mathrm H_2$ branch.

Plainly: The data specify what the simplest neutral molecule looks like and how strongly it is bound at the laboratory level. The task here is to define one lower-level record that would have to reproduce all of those facts together.

## Required State Record

The minimum same-record carrier is

$$
\Theta_{\mathrm H_2}
=
\left(
\mathcal A_{p_1},
\mathcal A_{p_2},
\mathcal A_{e_1},
\mathcal A_{e_2},
\mathcal H_{\mathrm{wake}},
\Omega_{\mathrm{excl}},
\theta_{\mathrm{sea}}^{(\ell_c)},
\mathcal B_{\mathrm{bond}},
\mathcal L_{\mathrm{event}},
W,
\mathcal D
\right).
$$

The four assembly ledgers identify two proton and two electron assemblies without replacing the proton by three free quarks or the electron by a point particle. $\mathcal H_{\mathrm{wake}}$ retains the causal histories, $\Omega_{\mathrm{excl}}$ records the joint exclusion boundary, $\theta_{\mathrm{sea}}^{(\ell_c)}$ records the local Noether sea at declared coarse-graining scale, $\mathcal B_{\mathrm{bond}}$ labels the candidate shared molecular branch, $\mathcal L_{\mathrm{event}}$ carries formation, excitation, or dissociation provenance, $W$ fixes the observation window, and $\mathcal D$ fixes the apparatus response.

Plainly: “H₂” is not enough information for a native calculation. The calculation needs the two nuclei, two electron assemblies, their histories, their shared environment, the bond-state label, and the actual preparation and detector records.

## Observer-Level State Target

For the effective comparison only, let $U_{\mathrm{eff}}(R)$ be the ground-state internuclear energy curve. Its equilibrium and local stiffness targets are

$$
\left.\frac{dU_{\mathrm{eff}}}{dR}\right|_{R=r_e}=0,
\qquad
\left.\frac{d^2U_{\mathrm{eff}}}{dR^2}\right|_{R=r_e}>0.
$$

The source constants give the first anharmonic vibrational comparison

$$
G(v)
\approx
\omega_e\left(v+\frac12\right)
-
\omega_ex_e\left(v+\frac12\right)^2,
\qquad
G(1)-G(0)
\approx
\omega_e-2\omega_ex_e
=4158.541\,\mathrm{cm}^{-1}.
$$

The last number is derived from the two NIST constants using the displayed truncated effective expansion; it is not labeled as a separately measured transition. A native candidate must first demonstrate an occupied equilibrium by direct evolution. Curvature about an unoccupied or drifting configuration is not stability evidence.

Plainly: A valid bond must settle near the measured separation and remain there when evolved. A convenient curve fitted around that distance is not enough if the underlying four-assembly history does not actually occupy the state.

## State, Transition, and Falsifier Rows

| Row | Same-record inputs | Required output | Claim grade now | Falsifier |
| --- | --- | --- | --- | --- |
| `H2-ground-state` | Full $\Theta_{\mathrm H_2}$ in an isolated, declared low-excitation environment | One neutral $X\,{}^1\Sigma_g^+$ branch with $1s\sigma^2$ effective symmetry readout and equilibrium $R$ consistent with $0.74144\,\mathring{\mathrm A}$ | Observer target measured/compiled; native carrier guessed | No retained neutral branch, wrong symmetry class, or equilibrium outside a preregistered source uncertainty/tolerance |
| `H2-vibration` | Same branch, one controlled vibrational preparation, same environment and detector calibration | A resolved vibrational ladder whose low-state differences recover $\omega_e$ and $\omega_ex_e$ under refinement | Observer constants measured/compiled; native transition unbuilt | The branch leaves equilibrium, gives the wrong ordering or spacing, or matches only after transition-specific tuning |
| `H2-rotation` | Same branch with a declared rotational preparation and angular-momentum ledger | Rotational differences recover $B_e$, $\alpha_e$, and $D_e$ in the same effective chart | Observer constants measured/compiled; native transition unbuilt | Rotation changes the molecular identity, loses the angular-momentum account, or needs a separate bond carrier |
| `H-plus-H-formation` | Two source-bound neutral hydrogen records, collision geometry, causal histories, ambient Noether sea, radiation/material channels, and apparatus | One $\mathrm H_2$ branch plus all released energy, momentum, angular momentum, recoil, photon/material, Noether sea, and provenance rows | Native event guessed | A product appears without a complete source ledger, released action is hidden, or the final state does not match the ground-state carrier |
| `H2-dissociation` | The same molecular branch with a declared energy-deposition channel | Two source-bound neutral H product records and a complete residual ledger across the $4.4781\,\mathrm{eV}$ benchmark | Observer dissociation energy compiled; native event unbuilt | Products or provenance are missing, the threshold is wrong outside tolerance, or formation and dissociation use incompatible state definitions |
| `withheld-isotopologue` | The same constitutive and projection rules applied to HD or $\mathrm D_2$ after source binding | Isotope-dependent rovibrational shifts without refitting the bond mechanism | Unrun independent check | The model encodes the H₂ constants directly and fails on the withheld isotopologue |

Plainly: One candidate must explain a stable bond, its vibration and rotation, and how it forms or breaks. The isotopologue test checks whether the mechanism predicts a nearby case rather than memorizing H₂.

## Event-Ledger Contract

For each formation, excitation, or dissociation event, the assembly-level account must close as

$$
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{matter}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{radiation}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{recoil}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{sea}}
+
\Delta\mathcal L_{E\mathbf p\mathbf J}^{\mathrm{apparatus}}
=0,
$$

where each term is evaluated from the same event record and absent channels are recorded explicitly as zero or below a declared bound. This is an account identity and acceptance requirement, not a supplied mechanism. Photon details route to the existing radiation-source carrier owner when that channel becomes the active blocker; the molecular lane retains ownership of the initial and final molecular states.

Plainly: Energy or momentum cannot disappear behind the word “bond.” Every formation or breakup record must say where all released or absorbed quantities went and which instrument observed the outcome.

## Acceptance Boundary

NAM-005 closes the selection and ledger-design task because one molecule is source-bound and now has explicit state, transition, account, control, and falsifier rows. It does not pass any of those rows. Promotion requires a native $\Theta_{\mathrm H_2}$ record, direct evolution that occupies the bond, resolution convergence, source-bound residual tolerances, complete event accounting, and the withheld-isotopologue check. No reader-facing corpus change is warranted at this grade.

Closure goal: build one retained $\mathrm H_2$ history that predicts equilibrium geometry, rovibrational structure, and dissociation from the same four-assembly and Noether sea record.
