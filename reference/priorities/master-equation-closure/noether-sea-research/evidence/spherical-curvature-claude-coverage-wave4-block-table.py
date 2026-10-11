# Wave 4 (1): per-block dominant roots and static slopes from the wave-4 hexagon spectrum JSON (box Re in [-2,8]).
# Run from the checkout root: ../.venv/bin/python -I reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave4-block-table.py
import json, numpy as np
d = json.load(open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave4-hexagon-spectrum.json"))
c = d["scalar_coefficients"]
cM_t = {int(k): v for k, v in c["cM_t"].items()}; cN_t = {int(k): v for k, v in c["cN_t"].items()}; cM_z = {int(k): v for k, v in c["cM_z"].items()}
D_t, D_z = c["D_t"], c["D_z"]
desc = {("0","t"): "all six move the same way around the ring (rigid rotation about e_z; neutral)",
        ("1","t"): "azimuthal amplitude cos(phi_j): in-plane translation-like shift of the ring along an in-plane axis (pairs with k=5)",
        ("2","t"): "azimuthal amplitude cos(2 phi_j): two-fold in-plane distortion, opposite pairs squeezed (pairs with k=4)",
        ("3","t"): "alternating azimuthal: positrinos one way, electrinos the other, each toward one unlike neighbour (pairwise approach)",
        ("4","t"): "conjugate of k=2 (same pattern, opposite phase)",
        ("5","t"): "conjugate of k=1 (same pattern, opposite phase)",
        ("0","z"): "all six move up together: uniform latitude shift of the ring (the equator-to-latitude mode)",
        ("1","z"): "vertical amplitude cos(phi_j): rigid tilt of the ring about an in-plane axis (neutral; pairs with k=5)",
        ("2","z"): "vertical amplitude cos(2 phi_j): two-fold saddle warp of the ring (pairs with k=4)",
        ("3","z"): "alternating vertical: positrinos up, electrinos down (the symmetry worker's mode)",
        ("4","z"): "conjugate of k=2 (same pattern, opposite phase)",
        ("5","z"): "conjugate of k=1 (same pattern, opposite phase)"}
gs = ["4", "2", "1", "0.5", "0.25", "0.1"]
print("| block | pattern | static slope Delta_k(0)/g | " + " | ".join(f"dominant root, g={g}" for g in gs) + " |")
print("| --- | --- | --- | " + " | ".join("---" for g in gs) + " |")
rows = []
for k in range(6):
    for pol in "tz":
        w = np.exp(1j*k*np.pi/3)
        if pol == "t": slope = -D_t + sum(w**m*cM_t[m] for m in range(1, 6))   # cM_t already carries sigma_m
        else:          slope = -D_z + sum(w**m*cM_z[m] for m in range(1, 6))   # cM_z already carries sigma_m
        slope = complex(slope); slope_s = f"{slope.real:+.6f}" + (f"{slope.imag:+.1e}i" if abs(slope.imag) > 1e-12 else "")
        cells = []
        for g in gs:
            mode = [m for m in d["results"][g]["modes"] if m["k"] == k and m["pol"] == pol][0]
            roots = sorted(mode["roots"], key=lambda r: -r[0])
            r = roots[0]; cells.append(f"${r[0]:+.5f}{r[1]:+.5f}i$" + (" (zero root present)" if mode["zero_root_multiplicity"] > 0 else ""))
        rows.append((k, pol, slope_s, cells))
        print(f"| $k={k}$, {pol} | {desc[(str(k),pol)]} | ${slope_s}$ | " + " | ".join(cells) + " |")
print()
print("k=3 vertical block, all roots in box by g:")
for g in gs:
    mode = [m for m in d["results"][g]["modes"] if m["k"] == 3 and m["pol"] == "z"][0]
    print(g, [(round(r[0], 5), round(r[1], 5)) for r in sorted(mode["roots"], key=lambda r: -r[0])])
