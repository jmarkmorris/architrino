#!/usr/bin/env python
"""Formal seventh-order source polynomial; reuses a declared frozen engine."""
import argparse, hashlib, importlib.util, json, resource, sys, time
from pathlib import Path
BASE=Path(__file__).with_name('overnight2-a-canonical-fifth-order.py')
EXPECTED='6fdffdb810085f4d9f3765065c1353b04c47ab22ca2d6a18c805e1f039288708'
assert hashlib.sha256(BASE.read_bytes()).hexdigest()==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_source_engine',BASE)
E=importlib.util.module_from_spec(spec); spec.loader.exec_module(E)
S=E.S; P=E.P; Q=E.Q
first_field=E.field

def fifth_field(y,w,kind):
    out=first_field(y,w,kind)
    if kind!='generated': return out
    norm2=E.dot(y,y); ri=E.power(norm2,S.Rational(-1,2)); ri2=E.power(norm2,-1)
    n=[E.mul(c,ri) for c in y]; p=E.dot(n,w)
    v=[E.add(w[i],E.mul(E.mul(p,n[i]),-1)) for i in range(2)]
    q2=E.dot(v,v); p2=E.mul(p,p)
    a4=E.add(E.add(E.mul(E.mul(p2,ri),8*Q/3),E.mul(E.mul(q2,q2),S.Rational(1,8))),E.add(E.mul(E.mul(q2,ri),-8*Q/3),E.mul(ri2,Q**2)))
    b4=E.add(E.mul(E.mul(p,q2),S.Rational(1,2)),E.mul(E.mul(p,ri),-19*Q/3))
    a5=E.add(E.add(E.mul(E.mul(E.mul(p2,p),ri),44*Q/15),E.mul(E.mul(E.mul(p,q2),ri),-196*Q/15)),E.mul(E.mul(p,ri2),19*Q**2/5))
    b5=E.add(E.add(E.mul(E.mul(p2,ri),-142*Q/15),E.mul(E.mul(q2,ri),121*Q/30)),E.mul(ri2,3*Q**2/5))
    for i in range(2):
        fourth=E.mul(E.add(E.mul(a4,n[i]),E.mul(b4,v[i])),ri2)
        fifth=E.mul(E.add(E.mul(a5,n[i]),E.mul(b5,v[i])),ri2)
        out[i]=E.add(out[i],E.mul(E.add(E.shift(fourth,4),E.shift(fifth,5)),Q))
    return out
E.field=fifth_field

def equal(a,b):
    assert all(S.expand(x-y)==0 for x,y in zip(a,b)), (a,b)

def known():
    E.N=7
    assert E.power([1,1],-1)==[1,-1,1,-1,1,-1,1,-1]
    _,_,row=E.calculate('affine')
    equal(row[0],[-1,-P,Q**2/2,0,Q**4/8,0,Q**6/16,0])
    equal(row[1],[0,Q,P*Q,0,P*Q**3/2,0,3*P*Q**5/8,0])
    E.N=5
    expected=[[-1,-P,Q**2/2,4*P*Q/3,Q*(64*P**2+3*Q**3-64*Q**2+24*Q)/24,P*Q*(44*P**2-196*Q**2+57*Q)/15],
              [0,Q,P*Q,-5*Q**2/3,P*Q**2*(3*Q-38)/6,-Q**2*(284*P**2-121*Q**2-18*Q)/30]]
    values=fifth_field([E.poly(1),E.poly(0)],[E.poly(P),E.poly(Q)],'generated')
    equal(values[0],[Q*x for x in expected[0]])
    equal(values[1],[Q*x for x in expected[1]])
    rotated=fifth_field([E.poly(0),E.poly(1)],[E.poly(-Q),E.poly(P)],'generated')
    equal(rotated[0],[-x for x in values[1]]); equal(rotated[1],values[0])
    L,D,row=E.calculate('generated')
    equal(row[0],expected[0]); equal(row[1],expected[1])
    return L,D,row

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('mode',choices=['known','target']); ap.add_argument('--output',required=True); args=ap.parse_args()
    resource.setrlimit(resource.RLIMIT_CPU,(95,100)); resource.setrlimit(resource.RLIMIT_FSIZE,(1048576,1048576))
    if args.mode=='known': L,D,row=known()
    else: E.N=7; L,D,row=E.calculate('generated')
    result={'mode':args.mode,'passed':True,'degree':E.N,'grade':'exact formal response only, no evolution or actual remainder','producer_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'engine_sha256':EXPECTED,'clock':[str(S.factor(c)) for c in L],'denominator':[str(S.factor(c)) for c in D],'row':[[str(S.factor(c)) for c in v] for v in row],'wall_seconds':time.monotonic()-E.START,'maxrss':resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,'platform':sys.platform}
    with open(args.output,'x') as f: json.dump(result,f,indent=2); f.write('\n')
    print(json.dumps(result),flush=True)
if __name__=='__main__': main()
