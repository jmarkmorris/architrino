"""Planar cyclic-sector subject, importing unchanged frozen Cartesian subject.
Known static m2 block at lambda0: diag(1/sqrt2+1/2,-sqrt2-1/4)
is checked before the target certified ring. Target real lambda/omega in[.05,4]
with seeds .1,.25,.5,.75,1,1.5,2,3,4. No complete spectrum claim.
"""
from pathlib import Path
import importlib.util, json, hashlib
p=Path(__file__).with_name('maxwell-shaped-overnight-ring-characteristic.py')
spec=importlib.util.spec_from_file_location('ring_cartesian_subject',p); c=importlib.util.module_from_spec(spec); spec.loader.exec_module(c)
mp=c.mp

def block(case,m,lam):
    M=mp.matrix(2,2)
    for k in range(2):
        w=c.vec(0,0,0); w[k]=1
        z=[mp.exp(1j*m*i*mp.pi/2)*c.rot(i*mp.pi/2)*w for i in range(4)]
        out=c.cart_action(case,lam,z)
        for row in range(2):M[row,k]=out[0][row]
        # The complete other receivers must transform by the same cyclic law.
        for i in range(4):
            predicted=mp.exp(1j*m*i*mp.pi/2)*c.rot(i*mp.pi/2)*out[0]
            assert c.mag(out[i]-predicted)<mp.mpf('1e-45')*(1+c.mag(predicted))
            assert abs(out[i][2])<mp.mpf('1e-45')
    return M

if __name__=='__main__':
    known=c.controls(); zero=mp.mpf(0)
    for full in [False,True]:
        static=dict(beta=zero,r=mp.mpf(1),omega=zero,rows=c.unit_hits(zero),full=full)
        lam=mp.mpf(0); M=block(static,2,lam)
        expected=mp.matrix([[lam**2+1/mp.sqrt(2)+mp.mpf(1)/2,0],[0,lam**2-mp.sqrt(2)-mp.mpf(1)/4]])
        assert max(abs(M[i,j]-expected[i,j]) for i in range(2) for j in range(2))<mp.mpf('1e-55')
    print(json.dumps({'known_static_m2_block':True,'delayed_A_and_static_cartesian':known}),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    print(json.dumps({'pre_target_source_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'imported_cartesian_sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'target_box':'lambda/omega real [.05,4], seeds [.1,.25,.5,.75,1,1.5,2,3,4]','complete_census':False}),flush=True)
    cert=json.loads(Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight-independent/ring-outward-balance-certificate.json').read_text())['certificate']
    blo,bhi=map(mp.mpf,cert['beta']); beta=mp.findroot(lambda b:c.coefficient(b)[1],(blo,bhi),tol=mp.mpf('1e-55'));assert blo<beta<bhi
    for full in [False,True]:
        case=c.ring(beta,full);om=case['omega'];roots=[]
        for seed in ['.1','.25','.5','.75','1','1.5','2','3','4']:
            f=lambda p:mp.det(block(case,2,p*om))/om**4
            try:q=mp.findroot(f,mp.mpf(seed),tol=mp.mpf('1e-42'),maxsteps=70)
            except (ValueError,ZeroDivisionError):continue
            if not(mp.mpf('.05')<q.real<4 and abs(q.imag)<mp.mpf('1e-30')):continue
            if any(abs(q-r)<mp.mpf('1e-25') for r in roots):continue
            roots.append(q)
            lam=q*om;M=block(case,2,lam);w=c.vec(-M[0,1],M[0,0],0);w/=c.mag(w)
            z=[(-1)**i*c.rot(i*mp.pi/2)*w for i in range(4)]
            out=c.cart_action(case,lam,z)
            print(json.dumps({'law':'E+M' if full else 'E','m':2,'p':mp.nstr(q,45),'lambda':mp.nstr(lam,45),'local_radial_tangential_eigenvector':[mp.nstr(w[i],30) for i in range(2)],'det_residual':mp.nstr(abs(mp.det(M)),10),'full12_residual':mp.nstr(max(c.mag(x) for x in out),10)}),flush=True)
