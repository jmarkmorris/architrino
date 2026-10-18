"""Separate rational audit: no peer code or history inputs are imported."""
from fractions import Fraction as F
from pathlib import Path
import json

def q(s): return F(str(s))

def coefficients(w, s):
    c1=(1+w)**2/(1-w)
    c2=(3*w+w**3)/(1-w*w)
    c3=(1+w)**3/(1-3*w)**2
    curved=(1+w)**3/((1-w)*(1-3*w)**2)*(1+(3+2*w)/s)
    g=1/s-1
    z=2*w*g
    k1=(2*w*z+2*w**3*c1+w*w*c2)/4
    ka=4*w*w*c1+4*k1
    kap=2*w*(curved+c3)
    h1=w*c1+2*w*curved+c3+w*g*c1
    t1=2*w*w*g*c1
    kb=(2/s**3-1)/8
    cm=2*(1-w)**2*s/(1+w)
    cp=2*c1
    return dict(c1=c1,c2=c2,c3=c3,c=curved,g=g,z0=z,k1=k1,
                kA=ka,kAprime=kap,h1=h1,t1=t1,kappaB=kb,cm=cm,cp=cp)

zero=coefficients(F(0),F(1))
assert zero==dict(c1=F(1),c2=F(0),c3=F(1),c=F(4),g=F(0),z0=F(0),
                 k1=F(0),kA=F(0),kAprime=F(0),h1=F(1),t1=F(0),
                 kappaB=F(1,8),cm=F(2),cp=F(2))
# Arbitrary even quartic Phi: direct rational check of W.1's algebra.
c0=F(1,10); m=F(1,20)
phi=lambda b:b**4
sigma=lambda b:b*b/2+phi(b)
b1=c0+m; b2=m-c0; d=2*c0
delta_phi=phi(b1)+phi(b2)-2*phi(d/2)
ws=sigma(b1)+sigma(b2)-2*sigma(d/2)
assert ws==m*m+delta_phi
assert F(1,8)*((F(3,10)**2+4*m*m)-(F(3,10)**2-4*m*m))==m*m
assert F(1,4)*F(2)*F(2)/F(2)==F(1,2)
print('KNOWN FIRST: exact zero-speed table, quartic weight algebra, rational factors PASS',flush=True)

w=F(1,10); sl=q('.99498743710'); su=q('.99498743711')
assert sl*sl<1-w*w<su*su
a=coefficients(w,sl)
caps={'c1':'1.3445','c2':'.30405','c3':'2.7164','c':'12.725',
      'g':'.005038','z0':'.0010076','k1':'.001483','h1':'5.3966',
      't1':'.0001355','kappaB':'.1288','cp':'2.6889'}
checks={key+' upper': a[key]<=q(cap) for key,cap in caps.items()}
checks.update({
 'isotropic N coefficient':a['kA']/4<=q('.01493'),
 'curvature coefficient':a['kAprime']/4<=q('.7721'),
 'inverse cminus':1/a['cm']<=q('.6825'),
 'cminus lower':a['cm']>=q('1.4653'),
 'Theta constant':a['z0']/2<=q('.000504'),
 'Lambda principal':w*w*a['c1']<=q('.013445'),
 'variation coefficient':4*w*w*a['kappaB']<=q('.005152'),
 'constant coefficient':w*w*a['c1']+a['k1']+a['t1']+4*w*w*a['kappaB']*a['c1']<=q('.0220'),
 'X coefficient':4*w*w*a['kappaB']*2*w*a['c2']<=q('.0003133'),
 'inverse J coefficient':4*w*w*a['kappaB']*a['c3']<=q('.0140'),
 'rho gain coefficient':w*a['cp']<=q('.2689'),
 'lambda bound':(w*w*a['c1']+a['k1']+a['t1'])/a['cm']<=q('.01028'),
 'constant r J floor':q('1210.4')**2<=q('1.4653')*10**6,
 'constant r X cap':q('3694.5')**2*q('1.4653')>=2*10**7,
})
base=q('.6825')*q('.0220'); slope=base*q('.2')+q('.005152')
assert base==q('.015015') and slope==q('.008155')
checks['rho121 displayed test impossible']=base+slope*121>1
j=q('1210.4'); x=q('3694.5')
lhs=q('.6825')*(q('.0220')+q('.0003133')*x+q('.0140')/j)
rhs=q('.999496')-q('5.3966')/j-q('.7721')/(j*j)
checks['constant r intermediate cap']=q('.0220')+q('.0003133')*x+q('.0140')/j<=q('1.1796')
checks['constant r final upper']=lhs<=q('.8051')
checks['constant r final lower']=rhs>=q('.9950')
checks['constant r strict contradiction']=lhs<rhs
assert all(checks.values()),checks
out={'known_first':'pass','checks':checks,
     'constant_separation_lhs_upper':str(lhs),'constant_separation_rhs_lower':str(rhs),
     'decimal_orientation_lhs':float(lhs),'decimal_orientation_rhs':float(rhs),
     'envelope_base':str(base),'envelope_slope':str(slope),'envelope_at121':str(base+slope*121),
     'curvature_floor_conversion_coefficient_upper':str(a['kAprime']*w*w/a['cm']),
     'limit':'Exact scalar arithmetic with a proved rational square-root enclosure; no peer imports, no evolution, no root/history certificate or general periodicity claim'}
root=Path('.local-data/aaa-work-threads/saturday-breathing-lattice-low-angular-momentum-2026-10-14/codex-binary-review')
root.mkdir(parents=True,exist_ok=True)
with (root/'independent-arithmetic.json').open('x') as f: json.dump(out,f,indent=2); f.write('\n')
print(json.dumps(out,indent=2))
