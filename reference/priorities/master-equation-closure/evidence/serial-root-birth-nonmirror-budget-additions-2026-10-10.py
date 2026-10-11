"""The two actual-row additions of the budget assessment, and the release cap's final product.

Uses this review's own seventh-order account and its majorant rule (imported from
serial-root-birth-nonmirror-account-order7-budgets-2026-10-10.py). Subject of the comparison:
overnight2-a-reference-adiabatic-budget.md, equations (9) and (10) and its two displayed diagnostics,
5.5780297607500293e-12 (vector) and 5.1847567341653100e-10 (phase); and the final product of
overnight2-a-reference-adiabatic-release.md, 4.25 * 5.1 * 40.2 * eps^5 plus the polynomial residual,
against its cap 4e-15. The allowances 9e13 and 2.2e12 and the release factors 4.25, 5.1 and 40.2 are
those documents' inputs and are not derived here. Exact rational arithmetic. Known cases run first.
"""
import importlib.util
import json
import pathlib
import sympy as sp

here = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("budgets", here / "serial-root-birth-nonmirror-account-order7-budgets-2026-10-10.py")
bud = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bud)
al, x, y = bud.al, bud.x, bud.y
maj, EPS = bud.majorant, bud.EPS_PLUS

k = bud.known()
out = {"known": {a: bool(v) for a, v in k.items()}, "known_result": "PASS" if all(k.values()) else "FAIL"}
if out["known_result"] == "PASS":
    Cr, Ct = sp.Integer(9) * 10 ** 13, sp.Rational(22, 10) * 10 ** 12
    Qx, Py = x + 1, y
    Zn = x - al * y / 2 + sp.Rational(7, 2) * al ** 2
    Zt = -y + 2 * al + al * x / 2 + sp.Rational(5, 4) * al ** 3
    vector = sp.Integer(0)
    for Z in (Zn, Zt):
        ZP = sp.diff(Z, y)
        KZ = sp.expand(Py * sp.diff(Z, y) + 2 * Qx * sp.diff(Z, x) - al * sp.diff(Z, al) - Z)
        if ZP != 0:
            vector += maj(ZP, lambda j: -j - 1, j_shift=8, scale=Cr)
        vector += maj(KZ, lambda j: -j - 1, j_shift=8, scale=Ct)
    one = sp.Integer(1)
    phase = (maj(al ** 10 * one, lambda j: -j, scale=2 * Cr / 3) + maj(al ** 7 * one, lambda j: -j, scale=Ct)
             + maj(al ** 9 * (x + sp.Rational(5, 3)), lambda j: -j, scale=Ct) + maj(al ** 10 * y, lambda j: -j, scale=2 * Ct / 3))
    release = sp.Rational(425, 100) * sp.Rational(51, 10) * sp.Rational(402, 10) * EPS ** 5 + sp.Rational(333, 100) / 10 ** 21
    target = {
        "vector addition equals 5.5780297607500293e-12 to the displayed digits and is below 5.579e-12": abs(sp.Float(vector, 25) - sp.Float("5.5780297607500293e-12", 25)) < sp.Float("1e-28") and vector < sp.Rational(5579, 1000) / 10 ** 12,
        "phase addition equals 5.1847567341653100e-10 to the displayed digits and is below 5.185e-10": abs(sp.Float(phase, 25) - sp.Float("5.1847567341653100e-10", 25)) < sp.Float("1e-26") and phase < sp.Rational(5185, 1000) / 10 ** 10,
        "release product 4.25*5.1*40.2*eps^5 plus 3.33e-21 is below 4e-15": release < sp.Rational(4, 10 ** 15),
    }
    out["values"] = {"vector_addition": str(sp.Float(vector, 20)), "phase_addition": str(sp.Float(phase, 20)), "release_product": str(sp.Float(release, 20))}
    out["target"] = {a: bool(v) for a, v in target.items()}
    out["target_result"] = "PASS" if all(target.values()) else "FAIL"
print(json.dumps(out, indent=1))
raise SystemExit(0 if out.get("target_result") == "PASS" else 1)
