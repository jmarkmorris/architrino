"""Measured locator for the preregistered inverse-distance spiral; no certificate."""
import argparse,hashlib,json
from pathlib import Path
from datetime import datetime,timezone
import mpmath as m
m.mp.dps=70

def balance(w,d):
    l=m.exp(-d/w)
    return w*m.sin(d)-m.cos(d)-1/l, (1-l)**2*w*w-l*(1+l*m.cos(d))

def known():
    assert balance(m.mpf(3),m.mpf(0))==(-2,-2)
    x,y=m.findroot(lambda x,y:(2*x+y-4,x-y+1),(0,0))
    assert abs(x-1)<m.mpf('1e-60') and abs(y-2)<m.mpf('1e-60')
    return ['exact zero-angle response (-2,-2)','independent linear-system root (1,2)']

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--known');p.add_argument('--out',required=True);a=p.parse_args()
    digest=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    out=dict(sourceSHA=digest,time=datetime.now(timezone.utc).isoformat(),known=known(),target=None)
    if a.target:
        prior=json.loads(Path(a.known).read_text());assert prior['sourceSHA']==digest and prior['known']==out['known'] and prior['target'] is None
        w,d=m.findroot(balance,(m.mpf('2.3'),m.mpf('1.1')))
        l=m.exp(-d/w);L=m.sqrt(1+l*l+2*l*m.cos(d));r=(1-l)/L;v=r*m.sqrt(1+w*w)
        out['target']={k:m.nstr(z,65) for k,z in dict(omega=w,delta=d,lambda_=l,a=r,speed=v,D=1/l,F1=balance(w,d)[0],F2=balance(w,d)[1]).items()}
        out['grade']='measured root locator only; no existence, uniqueness, full response or fate certificate'
    with Path(a.out).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out,indent=2))
