"""Saturday initiative 4, instrument B.  Independent reconstruction of the root ledger and
balance of a rigid six-member ring (alternating polarity, coupling K = 1, c_f = 1).

Derivation used here (not copied from the certificates): receiver at R e1 at time 0, source j
at angle j pi/3 - Omega*Delta at emission.  With 2v the angle from source to receiver,
0 < v < pi, the chord is 2 R sin v, so the causal condition Delta = chord reads
    beta sin v - v = m pi/6,   m = j (mod 6),   beta = Omega R.
The unit vector from emission point to receiver is (sin v, cos v) in the (radial, tangential)
frame of the receiver, the source velocity projected on it is beta cos v, so D = 1 - beta cos v.
Row = (-1)^m K n / (4 R^2 sin^2 v |D|).  Radial balance: K C_r / R^2 = -Omega^2 R, tangential: C_t = 0.

Known case first: one source at rest (beta -> 0 is not a ring; instead the elementary check is
the root equation itself on a hand case), then the two documented rings.
"""
from mpmath import mp, mpf, sin, cos, pi, sqrt, acos, findroot, floor, ceil
mp.dps = 40

def roots(beta):
    """all (m, v, branch) with beta sin v - v = m pi/6, 0 < v < pi"""
    vc = acos(1/beta) if beta > 1 else mpf(0)            # maximum of F
    Fmax = beta*sin(vc) - vc
    out = []
    F = lambda v: beta*sin(v) - v
    m_lo = int(ceil(-pi/(pi/6))) ; m_hi = int(floor(Fmax/(pi/6)))
    for m in range(m_lo, m_hi + 1):
        y = m*pi/6
        if y <= -pi: continue
        # descending branch on (vc, pi): F decreases from Fmax to -pi
        if y < Fmax and y > -pi:
            lo, hi = vc, pi
            for _ in range(140):
                mid = (lo + hi)/2
                if F(mid) > y: lo = mid
                else: hi = mid
            out.append((m, (lo + hi)/2, "descending"))
        # rising branch on (0, vc): F increases from 0 to Fmax
        if y > 0 and y < Fmax:
            lo, hi = mpf(0), vc
            for _ in range(140):
                mid = (lo + hi)/2
                if F(mid) < y: lo = mid
                else: hi = mid
            out.append((m, (lo + hi)/2, "rising"))
    return out, Fmax

def ledger(beta, name, R_doc=None):
    rs, Fmax = roots(beta)
    Cr = Ct = mpf(0); rows = []
    for m, v, br in rs:
        D = 1 - beta*cos(v); sg = (-1)**(m % 2)
        cr = sg/(4*sin(v)*abs(D)); ct = sg*cos(v)/(4*sin(v)**2*abs(D))
        Cr += cr; Ct += ct; rows.append((m, m % 6, br, v, D, cr, ct))
    R = -Cr/beta**2; Om = beta/R
    print(f"\n{name}: beta = {mp.nstr(beta, 20)}")
    print(f"  roots per receiver: {len(rs)}  (ordered hits over six receivers: {6*len(rs)})")
    cnt = [0]*6
    for m, j, br, v, D, cr, ct in rows: cnt[j] += 1
    print(f"  roots by source offset j = 0..5: {cnt}")
    print(f"  tangential sum C_t = {mp.nstr(Ct, 5)}   radial sum C_r = {mp.nstr(Cr, 18)}")
    print(f"  R = -C_r/beta^2 = {mp.nstr(R, 20)}   Omega = {mp.nstr(Om, 20)}" + (f"   documented R {R_doc}" if R_doc else ""))
    print("   m  j  branch       delay              D             radial share    tangential share")
    for m, j, br, v, D, cr, ct in sorted(rows, key=lambda r: (r[0], r[2])):
        print(f"  {m:3d} {j:2d}  {br:10s}  {mp.nstr(2*R*sin(v), 15):>17s}  {mp.nstr(D, 15):>18s}  {mp.nstr(cr, 8):>12s}  {mp.nstr(ct, 8):>12s}")
    dmin = min(abs(r[4]) for r in rows); delmin = min(2*R*sin(r[3]) for r in rows); delmax = max(2*R*sin(r[3]) for r in rows)
    print(f"  smallest |D| = {mp.nstr(dmin, 17)}   smallest delay = {mp.nstr(delmin, 17)}   largest delay = {mp.nstr(delmax, 17)}")
    # nearest fold of the rigid family: the top admitted level m_top = floor(Fmax/(pi/6)) loses its pair when Fmax = m_top pi/6
    mtop = int(floor(Fmax/(pi/6)))
    bf = findroot(lambda b: sqrt(b*b - 1) - acos(1/b) - mtop*pi/6, beta)
    bup = findroot(lambda b: sqrt(b*b - 1) - acos(1/b) - (mtop + 1)*pi/6, beta)
    print(f"  max of beta sin v - v = {mp.nstr(Fmax, 12)} = {mp.nstr(Fmax/(pi/6), 10)} * pi/6 ; top admitted level m = {mtop} (source offset {mtop % 6})")
    print(f"  that level's two roots merge (positive-range fold, D = 0) at beta_fold = {mp.nstr(bf, 15)} : speed margin {mp.nstr((beta-bf)/beta*100, 5)} %")
    print(f"  the next level's pair would be born at beta = {mp.nstr(bup, 15)} : {mp.nstr((bup-beta)/beta*100, 5)} % above")
    selfrow = [r for r in rows if r[0] == 0]
    if selfrow:
        m, j, br, v, D, cr, ct = selfrow[0]
        print(f"  own-path row (m = 0): delay {mp.nstr(2*R*sin(v), 12)}, D = {mp.nstr(D, 12)}, radial share {mp.nstr(cr, 8)} of C_r = {mp.nstr(Cr, 8)}, tangential share {mp.nstr(ct, 8)}")
        print(f"  without the own-path row the tangential sum would be {mp.nstr(Ct - ct, 8)} instead of zero")
    return dict(R=R, Om=Om, n=len(rs), Ct=Ct, dmin=dmin, delmin=delmin)

if __name__ == "__main__":
    # known case: hand-checkable root.  beta = 2, level m = 0: 2 sin v = v has the root v = 1.895494267033981...
    rs, _ = roots(mpf(2))
    v0 = [v for m, v, b in rs if m == 0][0]
    print("known case: 2 sin v = v root", mp.nstr(v0, 18), " residual", mp.nstr(2*sin(v0) - v0, 3))
    assert abs(v0 - mpf("1.895494267033980947")) < mpf(10)**-15
    # known case 2: a single stationary source at distance L gives row K/L^2 with D = 1: (beta = 0 limit of D)
    assert 1 - 0*cos(mpf(1)) == 1
    t02 = ledger(mpf("1.826430964654678725003434188109838"), "T02 ring", "0.975976431801690696803573313538935")
    assert t02["n"] == 8 and abs(t02["R"] - mpf("0.975976431801690696803573313538935")) < mpf(10)**-28
    t04 = ledger(mpf("2.974307176117293568"), "T04 ring", "0.5617317000712902207")
    assert t04["n"] == 12 and abs(t04["R"] - mpf("0.5617317000712902207")) < mpf(10)**-15
