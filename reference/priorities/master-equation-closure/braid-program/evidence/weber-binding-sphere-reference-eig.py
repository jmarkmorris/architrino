"""weber-binding-sphere-reference-eig.py

Reference lane, Part 2: eigenvalues of the rotating-frame Jacobians written by
weber-binding-sphere-reference-sixbody.mjs (finite-difference Jacobians of the
full nonlinear rotating-frame vector field at confirmed equilibria). Uses
numpy.linalg.eig in the shared venv; nothing else is imported from the repository.
Run: ../../../../../../.venv/bin/python weber-binding-sphere-reference-eig.py
"""
import json
import sys
import numpy as np

src = sys.argv[1] if len(sys.argv) > 1 else "weber-binding-sphere-reference-jacobians.json"
data = json.load(open(src))
report = {}
THRESH_ABS = 1e-6

for name, rec in data.items():
    J = np.array(rec["J"], dtype=float)
    Om = rec["Omega"]
    ev = np.linalg.eigvals(J)
    order = np.argsort(-ev.real)
    ev = ev[order]
    maxre = float(ev.real.max())
    thr = 1e-3 * Om
    unstable = int((ev.real > thr).sum())
    unstableLoose = int((ev.real > THRESH_ABS).sum())
    entry = {
        "Omega": Om,
        "size": int(J.shape[0]),
        "maxRealPart": maxre,
        "unstableCount(Re>1e-3 Omega)": unstable, "unstableCount(Re>1e-6)": unstableLoose, "threshold": thr,
        "eigenvalues": [[float(z.real), float(z.imag)] for z in ev],
    }
    if name.startswith("K7"):
        wr = rec["omega_r"]
        # expected multiset: 0 x4, +-i Omega x3 each, +-i omega_r x1 each
        expected = [0] * 4 + [1j * Om] * 3 + [-1j * Om] * 3 + [1j * wr, -1j * wr]
        exp = np.array(expected, dtype=complex)
        # greedy matching
        rem = list(ev)
        worst = 0.0
        for e in exp:
            k = int(np.argmin([abs(r - e) for r in rem]))
            worst = max(worst, abs(rem[k] - e))
            rem.pop(k)
        entry["K7_worstMatch"] = float(worst)
        entry["K7_pass"] = bool(worst <= 1e-5)
        # characteristic polynomial coefficients vs s^4 (s^2+Om^2)^3 (s^2+wr^2)
        cp = np.poly(J)
        ref = np.poly(exp)
        entry["K7_charpolyMaxCoefficientError"] = float(np.max(np.abs(cp - ref)))
        print(f"{name}: K7 worst eigenvalue match {worst:.3e} ({'PASS' if worst <= 1e-5 else 'FAIL'}), charpoly coefficient error {entry['K7_charpolyMaxCoefficientError']:.3e}")
    else:
        rho = rec.get("rho")
        print(f"{name}: rho={rho} Omega={Om:.10g} max Re={maxre:.10g} ({maxre/Om:.6g} Omega) unstable directions (Re>1e-3 Omega)={unstable} (Re>1e-6: {unstableLoose})")
        # print the eigenvalues with positive real part
        pos = [z for z in ev if z.real > thr]
        print("   unstable eigenvalues:", ", ".join(f"{z.real:.8g}{'+' if z.imag>=0 else '-'}{abs(z.imag):.8g}i" for z in pos))
        # count purely imaginary / zero
        entry["zeroCount(|z|<1e-6)"] = int((np.abs(ev) < thr).sum())
        entry["imaginaryPairs(|Re|<1e-6,|Im|>1e-6)"] = int(((np.abs(ev.real) < thr) & (np.abs(ev.imag) > thr)).sum())
    report[name] = entry

json.dump(report, open("weber-binding-sphere-reference-spectra.json", "w"), indent=2)
print("wrote weber-binding-sphere-reference-spectra.json")
