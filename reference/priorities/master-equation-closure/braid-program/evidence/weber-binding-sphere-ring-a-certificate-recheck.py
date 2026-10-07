# Lane A: recheck of the uniqueness (injectivity) certificate with mpmath.iv and numpy, written separately from the
# Node instrument. For the alternating ring of N members and the box |g_k - 2 pi/N| <= r in the free gaps g_0..g_{N-2},
# encloses the Jacobian of (T_0..T_{N-2}) by the natural interval extension of
#   dT_i/dg_k = sum_{j>i, i<=k<j} s_ij kappa(A_ij) - sum_{j<i, j<=k<i} s_ij kappa(A_ji),  kappa(x) = (1+cos^2(x/2))/(8 sin^3(x/2)),
# and bounds the infinity norm of I - C J with C the floating inverse of the midpoint matrix.
import sys, json, time
import numpy as np
from mpmath import iv
iv.dps = 30
def cert(N, r):
    q = [(-1) ** i for i in range(N)]; M = N - 1; c = 2 * iv.pi / N; g = [iv.mpf([(c - r).a, (c + r).b]) for _ in range(M)]
    kap = lambda x: (1 + iv.cos(x / 2) ** 2) / (8 * iv.sin(x / 2) ** 3)
    A = {}
    for i in range(N):
        s = iv.mpf(0)
        for j in range(i + 1, N): s = s + g[j - 1]; A[(i, j)] = s
    J = [[iv.mpf(0) for _ in range(M)] for _ in range(M)]
    for i in range(M):
        for k in range(M):
            for j in range(N):
                if j > i and i <= k < j: J[i][k] = J[i][k] + q[i] * q[j] * kap(A[(i, j)])
                if j < i and j <= k < i: J[i][k] = J[i][k] - q[i] * q[j] * kap(A[(j, i)])
    mid = np.array([[float(J[i][k].mid) for k in range(M)] for i in range(M)]); C = np.linalg.inv(mid); norm = 0
    for i in range(M):
        row = iv.mpf(0)
        for k in range(M):
            e = iv.mpf(1 if i == k else 0)
            for m in range(M): e = e - iv.mpf(float(C[i, m])) * J[m][k]
            row = row + iv.mpf(max(abs(e.a), abs(e.b)))
        norm = max(norm, float(row.b))
    # finite-difference sanity of the midpoint Jacobian against a direct evaluation of T with numpy
    def T(gv):
        th = np.concatenate([[0], np.cumsum(gv)]); out = []
        for i in range(M):
            t = 0.0
            for j in range(N):
                if j != i: h = (th[i] - th[j]) / 2; t += q[i] * q[j] * np.cos(h) * np.sign(np.sin(h)) / (4 * np.sin(h) ** 2)
            out.append(t)
        return np.array(out)
    g0 = np.full(M, 2 * np.pi / N); fd = np.zeros((M, M))
    for k in range(M):
        e = np.zeros(M); e[k] = 1e-6; fd[:, k] = (T(g0 + e) - T(g0 - e)) / 2e-6
    Jpt = cert_point(N, q, kap)
    return {'N': N, 'r': r, 'normInfBound': norm, 'certified': bool(norm < 1), 'maxAbsFiniteDifferenceMismatchAtCentre': float(np.abs(fd - Jpt).max())}
def cert_point(N, q, kap):
    M = N - 1; c = 2 * iv.pi / N; out = np.zeros((M, M))
    for i in range(M):
        for k in range(M):
            v = iv.mpf(0)
            for j in range(N):
                if j > i and i <= k < j: v = v + q[i] * q[j] * kap((j - i) * c)
                if j < i and j <= k < i: v = v - q[i] * q[j] * kap((i - j) * c)
            out[i, k] = float(v.mid)
    return out
res = {'utc': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'certificates': [cert(6, 0.025), cert(6, 0.03), cert(4, 0.05), cert(4, 0.1)]}
res['pass'] = bool(res['certificates'][0]['certified'] and res['certificates'][2]['certified'] and max(c['maxAbsFiniteDifferenceMismatchAtCentre'] for c in res['certificates']) < 1e-6)
json.dump(res, open(sys.argv[1], 'w'), indent=1); print(json.dumps(res, indent=1))
