import json,math,sys,time
from pathlib import Path
from fractions import Fraction as Q
from mpmath import iv,mp
import numpy as np
import twisted_certificate as tc
import fold,fold_controls
HERE=Path(__file__).resolve().parent
CAPTURE=[]

def strict_solve(C,M,Fd,sc):
    n=len(sc);s=[iv.mpf(float(v)) for v in sc]
    g=[sum((C[i][j]*Fd[j] for j in range(n)),iv.mpf(0))/s[i] for i in range(n)]
    A=[[M[i][j]*s[j]/s[i] for j in range(n)] for i in range(n)]
    # Every absolute value and row sum remains an outward-rounded interval.
    rho=max(sum((abs(x) for x in row),iv.mpf(0)).b for row in A)
    assert rho<1
    gmax=max(abs(x).b for x in g)
    b=(gmax/(1-rho)).b
    Z=[iv.mpf([-b,b]) for _ in range(n)]
    for _ in range(35):
        Zn=[g[i]+sum((A[i][j]*Z[j] for j in range(n)),iv.mpf(0)) for i in range(n)]
        Z=[iv.mpf([max(x.a,y.a),min(x.b,y.b)]) for x,y in zip(Z,Zn)]
    answer=[Z[i]*s[i] for i in range(n)]
    CAPTURE.append({'Ci':[[tc.ivstr(x) for x in r] for r in C],'M':[[tc.ivstr(x) for x in r] for r in M],
        'Fd':[tc.ivstr(x) for x in Fd],'sc':list(map(float,sc)),'rho_upper':str(rho),'Z':[tc.ivstr(x) for x in answer]})
    return answer,float(rho)

def save(n,x):Path(n).write_text(json.dumps(x,indent=1)+'\n')

def main():
    tc.SPLIT_K0,tc.SPLIT_S,tc.SPLIT_K1,tc.SPLIT_S2,tc.SPLIT_S3=200,8,12,4,1
    sys.argv=['fold_controls.py','reviewer-original-controls.json'];fold_controls.main()
    assert all(x['ok'] for x in json.loads(Path(sys.argv[1]).read_text()).values())
    # Independent coupled linear system with exact rational solution (16/23,-18/23).
    A=[[iv.mpf(2),iv.mpf('.5')],[iv.mpf('.25'),iv.mpf('1.5')]]
    C=[[iv.mpf('.5'),iv.mpf(0)],[iv.mpf(0),iv.mpf(2)/3]]
    M=[[(1 if i==j else 0)-sum((C[i][k]*A[k][j] for k in range(2)),iv.mpf(0)) for j in range(2)] for i in range(2)]
    Z,rho=strict_solve(C,M,[iv.mpf(1),iv.mpf(-1)],[1.,1.])
    for z,r in zip(Z,[iv.mpf(16)/23,-iv.mpf(18)/23]):assert z.a<=r.a and r.b<=z.b
    for a,b,sgn in [('.1','.2',-1),('-.2','-.1',1)]:
        Z,_=strict_solve([[iv.mpf(1)]],[[iv.mpf(0)]],[2*iv.mpf([a,b])],[1.])
        assert (-Z[0]).b<0 if sgn==-1 else (-Z[0]).a>0
    save('reviewer-strict-solve-known.json',{'known_coupled_system':True,'exact_solution':['16/23','-18/23'],'toy_sign_controls':True,'rho':rho,'captures':CAPTURE.copy()})
    print('All original and strict interval linear-solve controls PASS before targets',flush=True)
    fold.solve_enclosure=strict_solve
    for name in ['below','above']:
        old=json.loads(Path('fold-sign-'+name+'-inner.json').read_text())
        CAPTURE.clear()
        c=float(old['delta_centre']);r=float(old['delta_radius']);yh=list(map(float,old['y_centre']));ry=old['y_radii']
        rec=fold.certify(c,r,yh,np.array(ry),old['N'])
        assert rec['certified'] and rec['dalpha_ddelta_sign']==('negative' if name=='below' else 'positive')
        rec['reviewer_strict_linear_solve']=CAPTURE.copy()
        save('reviewer-sign-'+name+'.json',rec)
        print(name,rec['dalpha_ddelta'],rec['scaled_rho'],flush=True)
    # Repair literal outer decimal endpoints of the joined chain, preserving the old boxes.
    cover=json.loads(Path('fold-cover-all.json').read_text())['pieces'];cover.sort(key=lambda p:float(p['delta_centre']))
    for label,index in [('first',54),('last',162)]:
        old=cover[index];c=float(old['delta_centre']);r=float(old['delta_radius'])
        # One extra radius ulp does not cover the centre's decimal discrepancy; use a small, explicit pad.
        r=math.nextafter(r+1e-14,math.inf)
        yh=list(map(float,old['y_centre']));CAPTURE.clear()
        rec=fold.certify(c,r,yh,np.array(old['y_radii']),old['N'])
        assert rec['certified']
        rec['reviewer_strict_linear_solve']=CAPTURE.copy();rec['source_piece']=index
        save('reviewer-endpoint-'+label+'.json',rec)
        print('endpoint',label,rec['Delta'],flush=True)
    # Check one actual microscopic gap patch, near the minimum.
    patch=next(p for p in json.loads(Path('fold-patches.json').read_text())['patches'] if p.get('ok'))
    c=float(patch['centre']);Y=patch['Y'];yh=[(float(a)+float(b))/2 for a,b in Y]
    ry=[math.nextafter(max(abs(float(a)-v),abs(float(b)-v))+1e-18,math.inf) for (a,b),v in zip(Y,yh)]
    CAPTURE.clear();rec=fold.certify(c,1e-12,yh,np.array(ry),4000);assert rec['certified']
    rec['reviewer_strict_linear_solve']=CAPTURE.copy();rec['patch_pair']=patch['pair']
    save('reviewer-patch.json',rec)
    save('reviewer-complete.json',{'original_controls_pass':True,'strict_linear_controls_pass':True,'signs':['negative','positive'],'endpoints':[54,162],'patch_pair':patch['pair'],'all_certified':True})

if __name__=='__main__':main()
