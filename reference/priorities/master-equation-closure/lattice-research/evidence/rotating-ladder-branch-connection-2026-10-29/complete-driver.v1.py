"""Produce the bounded bridge; frozen interval kernel and pilot functions are inputs.

Run controls first. Receipts are checkpointed after every piece/join. The independent
Fraction-based readback audit is a separate instrument, not this selection driver.
"""
import argparse
import math
import time
from decimal import Decimal as D
from pathlib import Path
import numpy as np
from mpmath import iv
from certify_connection import HERE, CAPTURE, controls, fold, load, numeric, piece, save, settings, tc


def contained(a,b):
    return all(D(x[0]) > D(y[0]) and D(x[1]) < D(y[1]) for x,y in zip(a,b))


def join(a,b):
    # Parameters of new pieces include an explicit overlap pad. A thin certificate
    # at an interior point common to both is sufficient to identify their solutions.
    lower=max(numeric(p['delta_centre'])-numeric(p['delta_radius']) for p in (a,b))
    upper=min(numeric(p['delta_centre'])+numeric(p['delta_radius']) for p in (a,b))
    assert lower <= upper
    c=(lower+upper)/2
    yh=fold.float_solve_y(c,list(map(numeric,a['y_centre'])))
    CAPTURE.clear()
    rec=fold.certify(c,0.0,yh,np.array([1e-7,5e-6,5e-6]),4000)
    rec['inside_both']=contained(rec['Y'],a['Y']) and contained(rec['Y'],b['Y'])
    return rec


def main():
    p=argparse.ArgumentParser();p.add_argument('--output',required=True);args=p.parse_args()
    out=Path(args.output).resolve();out.mkdir(parents=True,exist_ok=True)
    assert not (out/'cover.json').exists(), 'New execution requires a new output directory'
    settings();controls(out)
    old=load(HERE/'inputs/fold-cover-all.json')['pieces']
    old.sort(key=lambda r:numeric(r['delta_centre']))
    seed=list(map(numeric,old[-1]['y_centre']));pieces=[];attempts=[]
    start=time.time()
    for i in range(57):
        a=D('2.924')+D('.001')*i;b=a+D('.001')
        rec,tries=piece(str(a),str(b),seed)
        rec['piece']=i;pieces.append(rec);attempts.append(tries)
        save(out/'cover.json',{'pieces':pieces,'requested_domain':['2.924','2.981']})
        save(out/'attempts.json',attempts)
        print('COVER',i,rec['certified'],round(time.time()-start,1),flush=True)
        assert rec['certified'],f'piece {i} not certified; receipt retained'
        seed=list(map(numeric,rec['y_centre']))
    joins=[]
    for i,(a,b) in enumerate(zip([old[-1]]+pieces[:-1],pieces)):
        rec=join(a,b);rec['between']=['old-last' if i==0 else i-1,i]
        joins.append(rec);save(out/'joins.json',{'joins':joins})
        print('JOIN',rec['between'],rec['certified'],rec['inside_both'],round(time.time()-start,1),flush=True)
        assert rec['certified'] and rec['inside_both'],f'join {i} failed; receipt retained'
    first=load(HERE/'inputs/branch-certificate-summary-extended-2.json')['segments'][0]
    A,af,ar=tc.alpha_interval('.8801,.8801')
    x0=[float((D(a)+D(b))/2)for a,b in first['K']]
    x,_,_=tc.float_solve(x0,af,1000.,8000)
    contact=tc.krawczyk(x,[2e-5,5e-8,2e-6],A,af,ar,iv.mpf(1000),4000,4)
    contact['alpha_spec']='.8801,.8801';contact['alpha_interval']=tc.ivstr(A)
    contact['reviewed_first_segment']=first
    contact['X_inside_reviewed_X']=contained(contact['X'],first['X'])
    matches=[]
    for i,rec in enumerate(pieces):
        c=numeric(rec['delta_centre']);r=numeric(rec['delta_radius'])
        d0,d1=map(float,contact['K'][0])
        ys=contact['K'][1:]+[tc.ivstr(A)]
        if c-r<d0 and d1<c+r and contained(ys,rec['Y']):matches.append(i)
    contact['spacing_piece_matches']=matches;save(out/'contact.json',contact)
    assert contact['certified'] and contact['X_inside_reviewed_X'] and matches
    save(out/'production-complete.json',{'all_pass':True,'pieces':len(pieces),'joins':len(joins),
        'contact_piece_matches':matches,'seconds':time.time()-start,
        'claim':'Bounded connection only, pending independent receipt audit and proof review',
        'scenario':{'c_f':1,'K':1,'R':1000}})
    print('PRODUCTION COMPLETE',len(pieces),len(joins),matches,flush=True)


if __name__=='__main__':main()
