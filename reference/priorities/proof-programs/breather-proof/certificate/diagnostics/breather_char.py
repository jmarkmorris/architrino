import numpy as np
from breather_moll import simulate, CF, fields
# 1) integrator control: instantaneous Coulomb attraction+self must be handled;
#    instead verify dt/eta convergence of the mollified partner-only collapse time.
# 2) characterize Gamma(radius): does the SIGN change come from partner->self handover?

def gamma_by_radius(lam, ec, eta, **kw):
    r=simulate(lam,ec=ec,eta=eta,**kw)
    X=r['X']; G=r['Gam']; Gp=r['Gp']; Gs=r['Gs']
    m=np.isfinite(G)
    rad=np.abs(X[m]); Gn=G[m]; gp=Gp[m]; gs=Gs[m]
    # bin by radius
    edges=np.array([0,0.1,0.2,0.3,0.5,0.7,0.9,1.01])
    print(f"  radius-binned Gamma (lam={lam},ec={ec},eta={eta}):")
    print(f"    {'|X| bin':>12} {'Gamma_net':>11} {'Gamma_part':>11} {'Gamma_self':>11} {'n':>6}")
    for a,b in zip(edges[:-1],edges[1:]):
        sel=(rad>=a)&(rad<b)
        if sel.sum()<3: continue
        print(f"    [{a:.2f},{b:.2f})  {np.mean(Gn[sel]):+11.3f} {np.mean(gp[sel]):+11.3f} {np.mean(gs[sel]):+11.3f} {sel.sum():6d}")
    return r

# convergence of collapse dynamics (partner-only proxy: set self off by huge ec_self? -- instead vary dt,eta)
print("=== dt / eta convergence (crossing time, lam=1, ec=0.3) ===")
for dt,eta in [(4e-3,0.08),(2e-3,0.05),(1e-3,0.03)]:
    r=simulate(1.0,ec=0.3,eta=eta,dt=dt,h=8.0,Tmax=8.0)
    X=r['T']; cr=[r['T'][i] for i in range(1,len(r['X'])) if r['X'][i-1]*r['X'][i]<0]
    tc=cr[0] if cr else float('nan')
    print(f"  dt={dt:.0e} eta={eta:.2f}: first crossing T={tc:.4f}  V@end={r['V'][-1]:+.3f}  |X|max={np.nanmax(np.abs(r['X'])):.3f}")

print("\n=== Gamma sign structure ===")
gamma_by_radius(1.0,0.3,0.05,dt=2e-3,h=9.0,Tmax=12.0)
print()
gamma_by_radius(0.5,0.3,0.05,dt=2e-3,h=9.0,Tmax=12.0)
