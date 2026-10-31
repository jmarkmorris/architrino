"""Spacing-parametrized bridge from the reviewed turning curve to the reviewed twist branch.

The frozen evaluator, fold driver and reviewer interval linear solver are inputs. New code
chooses boxes, records controls, assembles certificates and checks an explicitly frozen graph.
No EOM evolution is computed. All numerical units have c_f = K = 1 and R = 1000.
"""
import argparse,hashlib,json,math,os,sys,time
from pathlib import Path
from decimal import Decimal as Dec
import numpy as np
from mpmath import iv

HERE=Path(__file__).resolve().parent
sys.path.insert(0,str(HERE/'inputs'))
import twisted_certificate as tc
import fold,fold_controls
from reviewer_reference import strict_solve,CAPTURE

def numeric(x):return float(str(x).replace('np.float64(','').rstrip(')'))
def save(path,data):path.write_text(json.dumps(data,indent=1,default=str)+'\n')
def load(path):return json.loads(path.read_text())

def settings():
    tc.SPLIT_K0,tc.SPLIT_S,tc.SPLIT_K1,tc.SPLIT_S2,tc.SPLIT_S3=200,8,12,4,1
    fold.solve_enclosure=strict_solve

def controls(out):
    assert numeric('np.float64(0.125)')==.125 and numeric('.125')==.125
    manifest=load(HERE/'input-manifest.json')
    for r in manifest['records']:
        assert hashlib.sha256((HERE/'inputs'/Path(r['copy']).name).read_bytes()).hexdigest()==r['sha256']
    settings()
    # Exact coupled linear system: z=(16/23,-18/23), known before any new target.
    A=[[iv.mpf(2),iv.mpf('.5')],[iv.mpf('.25'),iv.mpf('1.5')]]
    C=[[iv.mpf('.5'),iv.mpf(0)],[iv.mpf(0),iv.mpf(2)/3]]
    M=[[(1 if i==j else 0)-sum((C[i][k]*A[k][j] for k in range(2)),iv.mpf(0)) for j in range(2)]for i in range(2)]
    z,rho=strict_solve(C,M,[iv.mpf(1),iv.mpf(-1)],[1.,1.])
    assert z[0].a<=(iv.mpf(16)/23).a and (iv.mpf(16)/23).b<=z[0].b
    assert z[1].a<=(-iv.mpf(18)/23).a and (-iv.mpf(18)/23).b<=z[1].b
    # Frozen fold controls include scalar sign controls and the independently reviewed .9*pi case.
    (out/'krawczyk-alpha-0.9pi.json').write_bytes((HERE/'inputs/krawczyk-alpha-0.9pi.json').read_bytes())
    old=list(sys.argv);cwd=Path.cwd()
    try:
        os.chdir(out);sys.argv=['fold_controls.py','controls-frozen.json'];fold_controls.main()
    finally:sys.argv=old;os.chdir(cwd)
    assert all(r['ok']for r in load(out/'controls-frozen.json').values())
    save(out/'controls-complete.json',{'all_pass':True,'exact_linear_system':['16/23','-18/23'],'rho':rho,'scenario':{'c_f':1,'K':1,'R':1000}})
    print('CONTROLS PASS before new targets',flush=True)

def piece(a,b,seed,N=4000):
    a,b=Dec(a),Dec(b);c=float((a+b)/2);r=math.nextafter(float((b-a)/2)+2e-13,math.inf)
    yh=fold.float_solve_y(c,seed)
    ya=fold.float_solve_y(c-r,yh);yb=fold.float_solve_y(c+r,yh)
    disp=np.maximum(np.abs(ya-yh),np.abs(yb-yh));attempts=[]
    for fac in [(2.,4.,4.),(3.,6.,6.)]:
        ry=np.array(fac)*disp+np.array([2e-8,2e-7,2e-5]);CAPTURE.clear()
        rec=fold.certify(c,r,yh,ry,N)
        rec.update(decimal_domain=[str(a),str(b)],factor=list(fac),linear_solver=CAPTURE.copy())
        attempts.append(rec)
        if rec['certified']:return rec,attempts
    return rec,attempts

def pilot(out):
    controls(out);P=load(HERE/'inputs/fold-cover-all.json')['pieces'];P.sort(key=lambda p:numeric(p['delta_centre']))
    seed=list(map(numeric,P[-1]['y_centre']));rows=[]
    for a,b in [('2.924','2.926'),('2.949','2.951'),('2.979','2.981')]:
        t=time.time();rec,tries=piece(a,b,seed);name='pilot-'+a+'.json';save(out/name,{'result':rec,'attempts':tries})
        rows.append({'domain':[a,b],'certified':bool(rec['certified']),'seconds':time.time()-t,'file':name})
        print('PILOT',a,b,rec['certified'],rows[-1]['seconds'],flush=True)
    save(out/'pilot-complete.json',{'all_pass':all(r['certified']for r in rows),'pieces':rows})

def refined_pilot(out):
    controls(out);P=load(HERE/'inputs/fold-cover-all.json')['pieces'];P.sort(key=lambda p:numeric(p['delta_centre']))
    seed=list(map(numeric,P[-1]['y_centre']));rows=[]
    for centre in ['2.925','2.950','2.980']:
        success=None;attempts=[]
        for width in ['.001','.0005','.00025']:
            c,w=Dec(centre),Dec(width);a,b=str(c-w/2),str(c+w/2)
            t=time.time();rec,tries=piece(a,b,seed);name='pilot-'+centre+'-w'+width+'.json'
            save(out/name,{'result':rec,'attempts':tries});attempts.append({'width':width,'certified':bool(rec['certified']),'seconds':time.time()-t,'file':name})
            print('REFINED PILOT',centre,width,rec['certified'],attempts[-1]['seconds'],flush=True)
            if rec['certified']:success=width;break
        rows.append({'centre':centre,'passing_width':success,'attempts':attempts})
    save(out/'pilot-complete.json',{'all_pass':all(r['passing_width'] for r in rows),'pieces':rows})

def main():
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['pilot','refined-pilot']);p.add_argument('--output',required=True);args=p.parse_args()
    out=Path(args.output).resolve();out.mkdir(parents=True,exist_ok=True);settings()
    (refined_pilot if args.mode=='refined-pilot' else pilot)(out)

if __name__=='__main__':main()
