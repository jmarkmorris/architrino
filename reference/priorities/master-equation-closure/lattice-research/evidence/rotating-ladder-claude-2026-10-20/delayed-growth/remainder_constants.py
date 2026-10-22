"""Explicit constants of the remainder estimates and the Rouche step
(note: rotating-ladder-claude-2026-10-20-delayed-small-speed-growth-remainder.md).

Part 1 evaluates the closed-form constant chain (pure arithmetic of the formulas in the note).
Part 2 is a known-case check of the derived termwise bound ||F_j|| <= C_F min(eps^2/tau0, eps/tau0^2)
against the actual per-source Taylor remainders computed from the exact rows (ratios must be <= C_F).
Part 3 checks the closed form f_1 = -m_r lam (lam^2+2) - m_t lam (lam^2+1+k_r) of tr(adj Delta_0 Delta_1)
on the in-plane block against first_order.py, then evaluates the Rouche threshold and disc radius.
Writes remainder-constants.json (refuses to overwrite).
"""
import json, os, sys, math, time
import numpy as np
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from ladder_char import geometry, sources, J3, I3
from first_order import FirstOrder, neutral_root, shift

OUT = __file__.rsplit('/', 1)[0] + '/remainder-constants.json'
assert not os.path.exists(OUT), 'refusing to overwrite an existing receipt'
t0 = time.time()
out = {}
# ---------------- Part 1: constant chain ----------------
L0 = 2.0          # |lambda_hat| <= Lambda_0
w = 0.52          # bound on |theta| in the complex polydisc (|eps||tau0| <= 1/2, |tau/tau0 - 1| <= 0.04)
ch, sh = math.cosh(w), math.sinh(w)
x = ch / 16                                  # |eps^2 q(eps tau)|, |eps| <= 1/4
dev = (1 - x) ** -0.5 - 1                    # |tau/tau0 - 1|
lip = 0.5 * (1 / 16) * 0.5 * (1 - x) ** -1.5 * sh / 3   # contraction constant of the fixed-point map
assert dev < 0.04 and 1.04 * 0.5 <= w + 1e-12 and lip < 1
tlo = 1 - 0.04
rip_own = math.hypot(ch - 1, sh); rip_far = math.hypot(2 + ch - 1, sh)
Nn = max((rip_own / 1.5 + 1) / tlo, (rip_far / 2 + math.sqrt(2)) / tlo)
Vb = 0.25 * math.hypot(sh, ch)
Dlo, Dhi = 1 - ch / 16, 1 + ch / 16
rA = rip_far * (1 / 16) * math.hypot(ch, sh)
num = 1 + 1 / 16 + rA
den3 = tlo ** 3 * Dlo
brack = 1 + (Vb + 2 * Nn) * Nn / Dlo + (Nn / Dlo) * (num * Nn / Dlo + Vb)
CLu = brack / den3
CLw = Nn ** 2 / (tlo ** 2 * Dlo ** 2)
CQ = math.sqrt(2 * (ch ** 2 + sh ** 2))
Cexp = math.exp(L0 * w)
C0 = CLu + Cexp * (CLu * CQ + 0.5 * CLw * CQ * (L0 + 1))
CA = 8 * C0                                   # regime A: ||F|| <= 8 C0 eps^2 / tau0
# regime B (real eps <= 1/4)
tau_lo_far = 1 / math.sqrt(1 + 1 / 16)
D_lo_r = 1 - 1 / 16
kap = tau_lo_far * D_lo_r
CLu_r = (1 / (tau_lo_far ** 2 * kap)) * (1 + 2.25 / D_lo_r + (1 / D_lo_r) * (1.125 / D_lo_r + 0.25))
CLw_r = 1 / (tau_lo_far ** 2 * D_lo_r ** 2)
CT_r_cubic = 2 * CLu_r; CT_r_lin = CLw_r * (L0 + 1)
CB = 4 * (CT_r_cubic + 4) + CT_r_lin + 2 + (L0 + 1)
CF = max(CA, 4 * CB, CB)
out['part1'] = dict(Lambda0=L0, theta_bound=w, tau_ratio_dev=dev, contraction=lip, N_n=Nn, V=Vb, D=[Dlo, Dhi],
                    C_Lu=CLu, C_Lw=CLw, C_Q=CQ, C_exp=Cexp, C0=C0, C_A=CA, C_Lu_real=CLu_r, C_Lw_real=CLw_r,
                    C_B=CB, C_F=CF)
print('Part 1', json.dumps(out['part1']), flush=True)

def Lam(eps, delta):
    K = math.ceil(1 / (eps * delta))
    return 0.5 + (4 / delta) * (2 + math.log(K))

def Sdiff(eps, delta):
    K = math.ceil(1 / (eps * delta))
    return eps ** 2 * (2.03 + (9.36 / delta) * (1.5 + math.log(K)))

# ---------------- Part 2: termwise bound check against actual remainders ----------------
def per_source_T(delta, eps, N, lam, q, p):
    g = geometry(delta, eps, N)
    sig, tau, r, V, A, nu = g['sigma'], g['tau'], g['r'], g['V'], g['A'], g['nu']
    n = r / tau[:, None]
    D = 1 - np.einsum('ij,ij->i', n, V); kap_ = tau * D
    V2 = np.einsum('ij,ij->i', V, V); rA_ = np.einsum('ij,ij->i', r, A)
    Lu = (sig / (tau ** 2 * kap_))[:, None, None] * (I3[None] + np.einsum('ni,nj->nij', V - 2 * n, n) / D[:, None, None]
          - np.einsum('ni,nj->nij', r / kap_[:, None], ((1 - V2 + rA_) / D)[:, None] * n - V))
    Lw = (sig / (tau ** 2 * kap_ ** 2))[:, None, None] * np.einsum('ni,nj->nij', r, r)
    c, s = g['c'], g['s']
    Q = np.zeros((nu.size, 3, 3)); Q[:, 0, 0] = nu * c; Q[:, 0, 1] = nu * s; Q[:, 1, 0] = -nu * s; Q[:, 1, 1] = nu * c; Q[:, 2, 2] = 1
    pj = np.where(sig > 0, 1.0, p); wj = pj * np.exp(1j * q * g['k'])
    B = lam * I3 + J3
    T = -Lu + (wj * np.exp(-lam * g['th']))[:, None, None] * (np.einsum('nij,njk->nik', Lu, Q) - eps * np.einsum('nij,njk,kl->nil', Lw, Q, B))
    return T, g

ys = 1.8782239487; dstar = 2 * math.pi / ys
chk = []
for (lam, q, p) in [(0.5912818j, 0.0, 1.0), (0.3 + 1.2j, 1.1, -1.0), (1.5 + 1.3j, 2.9, 1.0)]:
    T0, g0 = per_source_T(dstar, 0.0, 3000, lam, q, p)
    h = 1e-5
    Tp, _ = per_source_T(dstar, h, 3000, lam, q, p)
    Tm, _ = per_source_T(dstar, -h, 3000, lam, q, p)
    T1 = (Tp - Tm) / (2 * h)
    tau0 = g0['tau']
    for eps in (1e-3, 1e-2, 0.1, 0.25):
        Te, _ = per_source_T(dstar, eps, 3000, lam, q, p)
        F = Te - T0 - eps * T1
        nrm = np.linalg.norm(F, ord=2, axis=(1, 2))
        bound = np.minimum(eps ** 2 / tau0, eps / tau0 ** 2)
        chk.append(dict(lam=[lam.real, lam.imag], q=q, p=p, eps=eps, max_ratio=float(np.max(nrm / bound))))
out['part2_termwise_check'] = chk
print('Part 2 max ratio', max(c['max_ratio'] for c in chk), 'C_F', CF, flush=True)

# ---------------- Part 3: Rouche for the in-step pair ----------------
F = FirstOrder(dstar, 200000)
Om = neutral_root(F, 0.5912818j, 0.0, 1.0).imag
P = F.pieces(0.0, 0.0, 1.0)
Ab = sum(P[k] for k in P if k.startswith('P1') or k.startswith('P2'))
alpha = Ab[0, 1].real
D0z = F.Delta0(0.0, 0.0, 1.0)
kr = D0z[0, 0].real + 1.0; kt = D0z[1, 1].real + 1.0
Mv = (Ab - F.Delta1(0.0, 0.0, 1.0))[:2, :2] @ np.linalg.inv(J3[:2, :2])
mr, mt = Mv[0, 0].real, Mv[1, 1].real
D0c = lambda l: np.array([[l * l - 1 + kr, -2 * l], [2 * l, l * l - 1 + kt]])
D1c = lambda l: np.array([[-mr * l, alpha + mr], [alpha - mt, -mt * l]])
def adj2(M):
    return np.array([[M[1, 1], -M[0, 1]], [-M[1, 0], M[0, 0]]])
f1_check = []; block_check = []
for l in (0.2j, 0.5 + 0.7j):
    D0n = F.Delta0(l, 0.0, 1.0)[:2, :2]; D1n = F.Delta1(l, 0.0, 1.0)[:2, :2]
    block_check.append(float(max(np.max(np.abs(D0n - D0c(l))), np.max(np.abs(D1n - D1c(l))))))
    num_ = np.trace(adj2(D0n) @ D1n)
    cf = -mr * l * (l ** 2 + 2) - mt * l * (l ** 2 + 1 + kr)
    f1_check.append(float(abs(num_ - cf)))
lam1 = mr * (Om ** 2 - 2) / (2 * Om ** 2) + mt / Om ** 2
out['part3_inputs'] = dict(Omega0=Om, k_r=kr, k_t=kt, m_r=mr, m_t=mt, alpha=alpha, block_closed_form_defect=max(block_check),
                           f1_closed_form_defect=max(f1_check), c1=lam1)
print('Part 3 inputs', out['part3_inputs'], flush=True)
dmax = 0.1
th = np.linspace(0, 2 * np.pi, 3601)
bd = 1j * Om + dmax * np.exp(1j * th)
nD0 = max(np.linalg.norm(D0c(l), 2) for l in bd)
nD1 = max(np.linalg.norm(D1c(l), 2) for l in bd)
lmax = Om + dmax
F2 = 12 * lmax ** 2 + 2 * Om ** 2
F1p = abs(mr) * (3 * lmax ** 2 + 2) + abs(mt) * (3 * lmax ** 2 + abs(1 + kr))
fp = 2 * Om ** 3
S0 = F.S0; Slo = S0 - 0.001
M0n = np.linalg.norm(F.Delta0(0.0, 0.0, 1.0) - (J3 @ J3), 2)

def calR(eps, delta=dstar):
    return CF * eps ** 2 * Lam(eps, delta) / Slo + Sdiff(eps, delta) * (M0n + eps * nD1) / Slo

def rhs(eps, rho):
    d = eps * abs(lam1) + rho
    R = calR(eps)
    return 0.5 * F2 * d ** 2 + eps * F1p * d + 2 * nD0 * R + (eps * nD1 + R) ** 2

def ok(eps, rho):
    return fp * rho > rhs(eps, rho) and rho < eps * lam1 and eps * abs(lam1) + rho <= dmax
# threshold for the disc of radius c1 eps / 2
eps2 = None
for e in np.logspace(-12, -2, 2001):
    if ok(e, 0.5 * lam1 * e):
        eps2 = float(e)
    else:
        break
# smallest admissible radius at a few speeds (fixed-point on rho)
radii = {}
for e in (1e-10, 1e-9, 1e-8, eps2):
    rho = 0.0
    for _ in range(200):
        rho = rhs(e, rho) / fp * 1.000001
    radii[f'{e:.3g}'] = dict(rho=rho, rho_over_eps=rho / e, c1_eps=lam1 * e, admissible=bool(ok(e, rho)))
out['part3_rouche'] = dict(disc_radius_dmax=dmax, norm_Delta0_ip=nD0, norm_Delta1_ip=nD1, F2=F2, F1prime=F1p,
                           f0prime=fp, S_lower=Slo, norm_M0=M0n, eps2_for_radius_half_c1_eps=eps2, radii=radii,
                           calR_at={f'{e:g}': calR(e) for e in (1e-8, 1e-6, 1e-4, 1e-3)})
print('Part 3 Rouche', json.dumps(out['part3_rouche'], indent=1))
out['runtime_s'] = time.time() - t0
json.dump(out, open(OUT, 'w'), indent=1)
