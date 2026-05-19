# Medium Exclusion Volume

This chapter analyzes volume exclusion across ordinary matter and medium-level propagation. It complements [Condensed Matter](../nuclear-atomic/condensed-matter.md), [Molecular Geometry](../nuclear-atomic/molecular-geometry.md), [Spacetime Assemblies](./spacetime-assemblies.md), and [Gravitational Waves](./gravitational-waves.md) by asking how ordinary exclusion boundaries coexist with deeper Noether-Sea response.

When chemists use the **van der Waals (VdW) volume** of a molecule, they mean the space excluded by its electron cloud: the effective hard-core volume a molecule presents to its neighbors. This is estimated from atomic van der Waals radii (Bondi, 1964) and corrected for bond overlaps. For example:

| Molecule    | Formula | VdW Volume (Å³) |
| ----------- | ------- | --------------- |
| Hydrogen    | H₂      | 25              |
| Helium      | He      | 27              |
| Nitrogen    | N₂      | 34              |
| Water       | H₂O     | 55              |

*(1 Å³ = 10⁻²⁴ cm³)*

## Molecular Occupancy Baseline

### How much volume do gas molecules actually occupy in air?

At everyday conditions (≈1 atm, room temperature), air is extremely sparse. A quick estimate using van der Waals volumes shows why:

- Take nitrogen (N₂) as representative with VdW volume ≈ 34 Å³ per molecule. One mole then “hard-core” occupies about 34 × 10⁻²⁴ cm³ × N_A ≈ 20 cm³.
- One mole of an ideal gas occupies ≈ 24,000 cm³ at 298 K and 1 atm.
- Packing fraction ≈ 20 cm³ / 24,000 cm³ ≈ 0.08–0.1%.

Intuition scales:
- Average intermolecular spacing ≈ 3–4 nm.
- Mean free path in air ≈ 60–70 nm.

Conclusion: gas molecules “consume” well under one-tenth of a percent of the available volume; most of the space is empty compared to liquids/solids.

### Number densities in air (molecules per cm³, dry air at 1 atm and 25°C)

Using the ideal gas law, dry air at 1 atm and 298 K contains about $2.46 \times 10^{19}$ molecules per $\mathrm{cm}^3$. Multiplying by typical volume fractions gives:
- Nitrogen (N₂, 78.084%): about $1.92 \times 10^{19}$ per $\mathrm{cm}^3$
- Oxygen (O₂, 20.946%): about $5.16 \times 10^{18}$ per $\mathrm{cm}^3$
- Argon (Ar, 0.934%): about $2.30 \times 10^{17}$ per $\mathrm{cm}^3$
- Carbon dioxide (CO₂, ~420 ppm): about $1.03 \times 10^{16}$ per $\mathrm{cm}^3$
- Neon (Ne, 18.2 ppm): about $4.5 \times 10^{14}$ per $\mathrm{cm}^3$
- Helium (He, 5.24 ppm): about $1.29 \times 10^{14}$ per $\mathrm{cm}^3$
- Methane (CH₄, ~1.9 ppm): about $4.7 \times 10^{13}$ per $\mathrm{cm}^3$
- Krypton (Kr, 1.14 ppm): about $2.8 \times 10^{13}$ per $\mathrm{cm}^3$
- Hydrogen (H₂, 0.55 ppm): about $1.35 \times 10^{13}$ per $\mathrm{cm}^3$
- Nitrous oxide (N₂O, ~0.336 ppm): about $8.3 \times 10^{12}$ per $\mathrm{cm}^3$
- Xenon (Xe, 0.087 ppm): about $2.1 \times 10^{12}$ per $\mathrm{cm}^3$
- Ozone (O₃, variable; e.g., 30 ppb): about $7.4 \times 10^{11}$ per $\mathrm{cm}^3$

Notes:
- “Dry air” omits water vapor. At 25°C and 50% RH, H₂O is ~1.6% by volume (about $3.9 \times 10^{17}$ per $\mathrm{cm}^3$), reducing the dry-air constituents by the same fraction. At 100% RH (25°C), H₂O is ~3.1% (about $7.7 \times 10^{17}$ per $\mathrm{cm}^3$).
- At STP (0°C, 1 atm), total density is about $2.69 \times 10^{19}$ per $\mathrm{cm}^3$; scale species accordingly.
- Despite these high number densities, the “hard-core” geometric occupancy is only ~0.08–0.1% of the volume (see VdW estimate above). In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, ordinary molecular exclusion occupies only a small fraction of the available Euclidean volume, while deeper Noether-Sea implementation layers remain available for medium-level propagation.

This gives a **geometric baseline** for how much space a molecule excludes. In real matter, the effective boundary is also affected by bonding, compression, temperature, pressure, and the channel being probed.

The kinetic baseline is not just occupied volume; it is also the collision length compared with the scale being probed. For a dilute molecular species with number density $n_m$ and effective hard-core diameter $d_m$, the order-of-magnitude mean free path is
$$
\lambda_m
\sim
\frac{1}{\pi d_m^2 n_m},
$$
up to the usual order-one correction for relative molecular motion. A probe of size $L$ is in a continuum regime only when
$$
\mathrm{Kn}_m
\equiv
\frac{\lambda_m}{L}
\ll 1.
$$
When $\mathrm{Kn}_m$ is not small, a molecular continuum pressure or viscosity description is a poor model even if the geometric occupancy is tiny.

This distinction is useful for $\mathbb{A}\mathbb{A}\mathbb{A}$ because molecular exclusion and Noether-Sea response answer different questions. Molecular packing fraction estimates what ordinary matter blocks geometrically. Mean-free-path and Knudsen estimates say whether a gas can be treated as a continuum at the scale of the probe. Neither estimate determines whether a photon, neutrino, gravitational-wave channel, or clock-rate comparison couples strongly to the Noether Sea. Those channels require their own coupling and propagation records.

For any simulation or synthetic-observable packet that compares ordinary matter with medium-level propagation, the minimal separation is
$$
\phi_{\mathrm{VdW}}
=
n_m V_{\mathrm{VdW}},
\qquad
\mathrm{Kn}_m
=
\frac{\lambda_m}{L},
\qquad
\mathcal C_X
=
\text{declared coupling record for channel }X.
$$
A low $\phi_{\mathrm{VdW}}$ or high $\mathrm{Kn}_m$ may explain molecular sparsity or gas-kinetic behavior; it is not evidence by itself for transparency of channel $X$.

---

## Levels of Excluded Volume

1. **Geometric VdW Volume (constant)**

   * Fixed by tabulated radii.
   * Methane, for instance, is \~71 Å³ regardless of conditions.

2. **Effective Excluded Volume (variable)**

   * Neighboring molecules can compress, stretch, or reorganize electron density.
   * Hydrogen bonding, solvation shells, or $\pi$–$\pi$ stacking alter the apparent space occupied.

3. **Macroscopic Boundaries (everyday examples)**

   * *Air–water boundary*: photons (visible light) mostly pass through, but molecules from one side can’t enter the other without surface disruption.
   * *Air–skin boundary*: oxygen molecules do not pass freely; they are excluded by cellular membranes unless aided by proteins.
   * *Metal–skin boundary*: copper atoms in a wire do not freely diffuse into biological tissue, but photons (infrared heat, visible light reflections) cross that boundary easily.

4. **Temperature & Pressure Effects**

   * Raising T: molecules vibrate more, structures loosen, apparent excluded volume rises.
   * Raising P: electron clouds compress slightly, effective excluded volume shrinks.

---

## Propagation Across Excluded Regions

Maximally packed van der Waals volumes define exclusion domains for ordinary atoms and molecules. They do not automatically block every observer-level channel or every deeper medium-level propagation mode.

* **Ordinary matter (atoms, electrons)**: Blocked. They *are* the walls.
* **Photons**: Sometimes pass, sometimes absorbed.
  * Visible light moves through water and glass, but not metal.
  * X-rays probe deep into flesh but are stopped by bone.
  * Gamma rays cut through meters of concrete.
* **Neutrinos**: Pass almost completely unhindered; light-years of lead would be needed to stop them.
  Compare [Neutrinos](../assemblies/fermions/neutrinos.md) for the assembly-level channel picture.
* **Dark matter candidates**: If WIMPs or axions exist, they would also pass through matter as though it weren’t there.
  Compare [Dark Matter](../cosmology/dark-matter.md) for the cosmological inference side.
* **Gravitons (hypothetical)**: in standard language, gravity-channel quanta would be weakly blocked by ordinary molecular exclusion.
  Compare [Gravitational Waves](./gravitational-waves.md) for the effective propagation layer.
* **Effective spacetime description**: in standard GR language, matter changes the metric rather than blocking spacetime as a substance. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the Euclidean void remains fixed; the relevant implementation layer is Noether-Sea response and effective metric reconstruction.

---

## Background Timespace vs. Implemented Medium

- Background: the mathematical arena in this project is absolute timespace (one global time × Euclidean 3-space). It is fixed, non-dynamical, and does not curve.
- Implemented “spacetime”: the effective medium that carries corridors and supports propagation is realized by coherent assembly architecture at scales far smaller than molecules (a Noether-Sea implementation layer, or in bridge prose a spacetime medium layer, not a separate substrate inventory). Its microstructure can modulate effective propagation, boundaries, and coherence without altering the background kinematics.

This is the same implementation layer developed in [Emergent Metric](./emergent-metric.md) and [Spacetime Assemblies](./spacetime-assemblies.md).

## Big Picture

* **At the molecular level**: van der Waals volume defines exclusion for atoms and molecules.
* **At the material level**: boundaries (air–water, skin–air, skin–metal) are just large-scale manifestations of those exclusions.
* **At the cosmic level**: photons, neutrinos, dark matter candidates, and gravitational waves can propagate through ordinary matter with coupling mechanisms that are not determined by molecular hard-core exclusion alone.

In other words, the van der Waals volume is an exclusion region mainly for **ordinary fermionic matter**. Other observer-level channels and effective fields interact with matter through different coupling mechanisms, so molecular exclusion alone does not determine their propagation.

---
