import numpy as np
# Sanity: mollified integral of a fold. g(s)=a*(s-s*)^2 - c (c>0 -> two simple roots).
# Sharp sum of 1/|g'| over the 2 roots = 2/(2 sqrt(a c)) = 1/sqrt(a c).
# Mollified Int delta_eta(g) ds should -> 1/sqrt(a c) as eta->0 (finite, c fixed).
# AT the caustic c=0, the integral ~ 2/sqrt(a eta) -> inf (peak diverges), but the
# TIME-integral of a caustic transit is finite. Verify both statements.
def delta_eta(g,eta):
    out=np.zeros_like(g);m=np.abs(g)<eta;out[m]=(0.5/eta)*(1+np.cos(np.pi*g[m]/eta));return out
def moll_int(a,c,eta,S=6.0,ns=400000):
    s=np.linspace(-S,S,ns);g=a*s*s-c;return np.trapz(delta_eta(g,eta),s)
a=2.0
print("c>0 fixed: mollified Int delta_eta(g) ds  vs sharp 1/sqrt(a c)")
for c in [0.5,0.1]:
    sharp=1.0/np.sqrt(a*c)
    print(f"  c={c}: sharp={sharp:.4f}   eta=0.05->{moll_int(a,c,0.05):.4f}  0.02->{moll_int(a,c,0.02):.4f}  0.005->{moll_int(a,c,0.005):.4f}")
print("\nc=0 (exact caustic): peak Int scales ~ 2/sqrt(a eta) (diverges):")
for eta in [0.05,0.02,0.01,0.005]:
    print(f"  eta={eta}: Int={moll_int(a,0.0,eta):.4f}   2/sqrt(a eta)={2/np.sqrt(a*eta):.4f}")
print("\nBUT transit IMPULSE: Int over receiver-time of a caustic ~ |T-T*|^-1/2 is finite.")
print("  model a(T)=K|T|^-1/2 for |T|>t_eta~eta, capped for |T|<t_eta:")
for eta in [0.05,0.02,0.01,0.005]:
    T=np.linspace(-1,1,2000001);teta=np.sqrt(eta)
    aT=np.where(np.abs(T)>teta, np.abs(T)**-0.5, teta**-0.5)
    imp=np.trapz(aT,T)
    print(f"    eta={eta} (t_eta={teta:.3f}): impulse={imp:.4f}  (converges to 4.0)")
