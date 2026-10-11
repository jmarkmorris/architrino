# Wave 2 (b) and (c): exact closed forms for the release speed curvature d^2|v|/dT^2 by the Jacobian route,
# and symmetry-persistence check for the velocity patterns on the static-field first step.
# Run from the checkout root: ../.venv/bin/python -I reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave2-closed-forms.py
import sympy as sp, numpy as np, itertools, json, sys
K, R, v = sp.symbols('K R v', positive=True)

def static_field(X, sources):
    """A(X) = K sum sigma (X - Xj)/|X-Xj|^3 and its Jacobian, exact sympy, for receiver polarity qi."""
    A = sp.zeros(3, 1); J = sp.zeros(3, 3)
    for (Xj, sig) in sources:
        d = X - Xj; r2 = (d.T * d)[0]; r = sp.sqrt(r2)
        A += sig * K * d / r**3
        J += sig * K * (sp.eye(3) / r**3 - 3 * d * d.T / r**5)
    return sp.simplify(A), sp.simplify(J)

def curvature(X, V, sources):
    """d^2|v|/dT^2 at release for the selected law X'' = P A - |v|^2 n / R with static sources (derived route of wave-1 F3)."""
    A, J = static_field(X, sources)
    n = X / R; P = sp.eye(3) - n * n.T
    PA = P * A; nA = (n.T * A)[0]
    speed = sp.sqrt((V.T * V)[0])
    a = PA - speed**2 / R * n
    dvA = (a.T * A)[0] + (V.T * J * V)[0]
    dspeed = (V.T * A)[0] / speed
    return sp.simplify((dvA - dspeed**2) / speed), sp.simplify(dspeed), sp.simplify(sp.sqrt((PA.T * PA)[0])), sp.simplify(nA), sp.simplify((V.T * J * V)[0] / speed**2)

e = [sp.Matrix([1, 0, 0]), sp.Matrix([0, 1, 0]), sp.Matrix([0, 0, 1])]
out = {}
# --- six poles, receiver positrino at +e1, sources: +e2,+e3 like; -e1,-e2,-e3 unlike
six = [(R * e[1], 1), (R * e[2], 1), (-R * e[0], -1), (-R * e[1], -1), (-R * e[2], -1)]
X0 = R * e[0]
w = sp.Matrix([1, 1, 1]) / sp.sqrt(3)
def unit(u): return u / sp.sqrt((u.T * u)[0])
t_V1 = unit(w.cross(e[0])); t_V2 = unit((sp.eye(3) - e[0] * e[0].T) * w); t_V2R = -t_V2
t_V4 = -e[1]  # +e1 moves toward -e2 along the shared quarter circle
th = sp.rad(10); t_V5 = sp.cos(th) * t_V1 + sp.sin(th) * e[0].cross(t_V1)
for name, t in [("V1", t_V1), ("V2", t_V2), ("V2R", t_V2R), ("V3", t_V1), ("V4", t_V4), ("V5", t_V5)]:
    c, ds, pa, na, jq = curvature(X0, v * t, six)
    out[f"sixpole-{name}"] = {"d2speed": str(c), "dspeed": str(ds), "absPA": str(pa), "nA": str(na), "vJv_over_v2": str(jq),
        "num_R1_v1": float(c.subs({K: 1, R: 1, v: 1})), "num_R1_v05": float(c.subs({K: 1, R: 1, v: sp.Rational(1, 2)})), "num_R10_v05": float(c.subs({K: 1, R: 10, v: sp.Rational(1, 2)}))}
    print(f"six poles {name}: d2|v|/dT2 = {c}   (R=v=1: {out[f'sixpole-{name}']['num_R1_v1']:.6f}; R=1,v=1/2: {out[f'sixpole-{name}']['num_R1_v05']:.6f}; R=10,v=1/2: {out[f'sixpole-{name}']['num_R10_v05']:.6e})  dspeed={ds}  vJv/v^2={jq}")
# --- hexagon, receiver positrino at azimuth 0, V1 about e3
hexs = [(R * sp.Matrix([sp.cos(k * sp.pi / 3), sp.sin(k * sp.pi / 3), 0]), (1 if k % 2 == 0 else -1)) for k in range(1, 6)]
c, ds, pa, na, jq = curvature(R * e[0], v * e[1], hexs)
out["hexagon-V1"] = {"d2speed": str(c), "dspeed": str(ds), "absPA": str(pa), "nA": str(na), "vJv_over_v2": str(jq), "num_R1_v1": float(c.subs({K: 1, R: 1, v: 1}))}
print(f"hexagon V1: d2|v|/dT2 = {c} = {sp.nsimplify(c)}  (R=v=1: {out['hexagon-V1']['num_R1_v1']:.6f}) PA={pa} nA={na} vJv/v^2={jq}")
# --- meridional G3, receiver positrino at u(pi/6), V2 toward +e3 pole
a0 = sp.pi / 6
def u(a): return sp.Matrix([sp.cos(a), 0, sp.sin(a)])
def Qz(phi): return sp.Matrix([[sp.cos(phi), -sp.sin(phi), 0], [sp.sin(phi), sp.cos(phi), 0], [0, 0, 1]])
Xm = R * u(a0); tm = sp.Matrix([-sp.sin(a0), 0, sp.cos(a0)])
mer = [(R * Qz(2 * sp.pi * k / 3) * u(a0), 1) for k in (1, 2)] + [(-R * Qz(2 * sp.pi * k / 3) * u(a0), -1) for k in (0, 1, 2)]
c, ds, pa, na, jq = curvature(Xm, v * tm, mer)
out["meridional-V2"] = {"d2speed": str(c), "dspeed": str(ds), "absPA": str(pa), "nA": str(na), "vJv_over_v2": str(jq), "num_R1_v1": float(c.subs({K: 1, R: 1, v: 1})), "num_R1_v05": float(c.subs({K: 1, R: 1, v: sp.Rational(1, 2)}))}
print(f"meridional V2: d2|v|/dT2 = {c}\n   (R=v=1: {out['meridional-V2']['num_R1_v1']:.6f}; R=1,v=1/2: {out['meridional-V2']['num_R1_v05']:.6f})  dspeed={ds} ({float(ds.subs({K:1,R:1,v:1})):.6f}) |PA|={pa} ({float(pa.subs({K:1,R:1})):.6f}) nA={na} ({float(na.subs({K:1,R:1})):.6f})")

# --- (c) symmetry persistence: group elements acting on (position, polarity, velocity) data on the first step
print("\n(c) symmetry check")
def perm(p):  # permutation matrix e_i -> e_{p[i]}
    M = np.zeros((3, 3)); 
    for i in range(3): M[p[i], i] = 1
    return M
C3 = perm([1, 2, 0]); m23 = perm([0, 2, 1]); m12 = perm([1, 0, 2]); I3 = np.eye(3)
wn = np.ones(3) / np.sqrt(3)
pos = [I3[0], I3[1], I3[2], -I3[0], -I3[1], -I3[2]]; pol = [1, 1, 1, -1, -1, -1]
def nrm(x): return x / np.linalg.norm(x)
patt = {}
patt["V1"] = [nrm(np.cross(wn, n)) for n in pos]
patt["V2"] = [nrm(np.sign(n @ wn) * (wn - (n @ wn) * n)) for n in pos]
patt["V3"] = patt["V1"][:3] + patt["V1"][:3]
patt["V4"] = [-I3[1], -I3[2], -I3[0], I3[2], I3[0], I3[1]]
def F(q, X):  # polarity-signed static field on a receiver of polarity q at X
    return sum(np.sign(q * pol[j]) * (X - pos[j]) / np.linalg.norm(X - pos[j])**3 for j in range(6))
def is_symmetry(g, sign):  # sign=+1 polarity preserving, -1 reversing; returns mapping i->j or None
    mp = []
    for i in range(6):
        gx = g @ pos[i]; js = [j for j in range(6) if np.allclose(gx, pos[j]) and pol[j] == sign * pol[i]]
        if not js: return None
        mp.append(js[0])
    return mp
rng = np.random.default_rng(1)
def equivariant(g, sign):
    for _ in range(20):
        X = rng.normal(size=3); X = X / np.linalg.norm(X) * rng.uniform(0.3, 1.2)
        for q in (1, -1):
            if not np.allclose(g @ F(q, X), F(sign * q, g @ X), atol=1e-12): return False
    return True
elems = {"C3": (C3, 1), "m23": (m23, 1), "m12": (m12, 1), "-I": (-I3, -1), "-m23": (-m23, -1), "-m12": (-m12, -1), "-C3": (-C3, -1)}
res = {}
for pname, t in patt.items():
    good = []
    for gname, (g, sign) in elems.items():
        mp = is_symmetry(g, sign)
        if mp is None: continue
        if not equivariant(g, sign): print("equivariance failed", gname); continue
        if all(np.allclose(g @ t[i], t[mp[i]]) for i in range(6)): good.append((gname, mp))
    orbit = set([0]); changed = True
    while changed:
        changed = False
        for gname, mp in good:
            for i in list(orbit):
                if mp[i] not in orbit: orbit.add(mp[i]); changed = True
    res[pname] = {"invariant_elements": [g for g, _ in good], "orbit_of_member0": sorted(orbit), "transitive": len(orbit) == 6}
    print(pname, "invariant under", [g for g, _ in good], "orbit of member 0:", sorted(orbit), "transitive:", len(orbit) == 6)
out["symmetry"] = res
json.dump(out, open("reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave2-closed-forms.json", "w"), indent=1)
