"""Independent exact-rational assembly audit of frozen interval receipts.

No balance evaluator or producer helpers are imported. Printed interval endpoints
are expanded for incoming sets and contracted for receiving sets by one last digit.
Binary64 centres and radii are reconstructed exactly. This checks receipt assembly;
validity of the balance/tail enclosures remains an explicitly named premise.
"""
import argparse
import hashlib
import json
import math
from decimal import Decimal
from fractions import Fraction as Q
from pathlib import Path

HERE=Path(__file__).resolve().parent


def read(p):return json.loads(p.read_text())
def write(p,obj):p.write_text(json.dumps(obj,indent=1,default=str)+'\n')
def binary(x):return Q.from_float(float(str(x).replace('np.float64(','').rstrip(')')))
def quantum(x):return Q(Decimal(1).scaleb(Decimal(x).as_tuple().exponent))
def outer(x):return (Q(x[0])-quantum(x[0]),Q(x[1])+quantum(x[1]))
def inner(x):return (Q(x[0])+quantum(x[0]),Q(x[1])-quantum(x[1]))
def strict(a,b):return all(y[0]<x[0] and x[1]<y[1] for x,y in zip(a,b))
def image(r,box='Y'):return strict(list(map(outer,r['K'])),list(map(inner,r[box])))
def domain(r):
    c,radius=binary(r['delta_centre']),binary(r['delta_radius'])
    return c-radius,c+radius
def overlap(a,b):return max(a[0],b[0])<=min(a[1],b[1])
def norm(r,scales):
    s=list(map(binary,scales))
    return max(sum(Q.from_float(math.nextafter(float(m),math.inf))*s[j]/s[i]
                   for j,m in enumerate(row))for i,row in enumerate(r['I_minus_CJ_absmax']))


def admissible(r):
    info=r['tail_info']
    assert Q(info['dprime_lo'])-quantum(info['dprime_lo'])>0
    assert Q(info['Dlo'])-quantum(info['Dlo'])>0
    assert Q(info['Vhi'])+quantum(info['Vhi'])<1


def pi_bounds():
    # Alternating-series remainder, together with the exact Machin identity.
    def atan_inv(q,n=50):
        a=sum((Q((-1)**k,(2*k+1)*q**(2*k+1))for k in range(n)),Q(0))
        b=a+Q((-1)**n,(2*n+1)*q**(2*n+1))
        return min(a,b),max(a,b)
    a,b=atan_inv(5),atan_inv(239)
    return 16*a[0]-4*b[1],16*a[1]-4*b[0]


def known(out):
    assert domain({'delta_centre':'3.0','delta_radius':'.125'})==(Q(23,8),Q(25,8))
    assert outer(['1.0000','2.0000'])==(Q(9999,10000),Q(20001,10000))
    assert strict([(Q(1),Q(2))],[(Q(0),Q(3))])
    assert not strict([(Q(0),Q(2))],[(Q(0),Q(3))])
    assert not overlap((Q(0),Q(1)),(Q(1)+Q(1,10**15),Q(2)))
    assert overlap((Q(0),Q(1)),(Q(1)-Q(1,10**15),Q(2)))
    assert norm({'I_minus_CJ_absmax':[[.1,0],[0,.2]]},[1,1])<1
    assert norm({'I_minus_CJ_absmax':[[1.1,0],[0,.2]]},[1,1])>1
    admissible({'tail_info':{'dprime_lo':'2.0000','Dlo':'.9000','Vhi':'.1000'}})
    try:admissible({'tail_info':{'dprime_lo':'2.0000','Dlo':'.9000','Vhi':'1.1000'}})
    except AssertionError:pass
    else:raise AssertionError('Speed exclusion control must refuse V > 1')
    assert [r['pair']for r in [{'pair':0,'ok':True},{'pair':1,'status':'not run'}]if r.get('ok')]==[0]
    p=pi_bounds();assert Q('3.14159')<p[0]<p[1]<Q('3.14160')
    write(out/'audit-known-controls.json',{'all_pass':True,
        'controls':['exact binary domain','decimal endpoint padding','strict containment positive and negative',
                    'deliberate gap rejection','overlap acceptance','contraction positive and negative',
                    'independent rational pi enclosure','skip an explicitly unrun patch record',
                    'admissibility positive and speed exclusion negative'],
        'order':'All controls executed and saved before loading target receipts'})
    print('AUDIT KNOWN CONTROLS PASS before targets',flush=True)


def audit_old():
    p=read(HERE/'inputs/fold-cover-all.json')['pieces'];p.sort(key=lambda r:binary(r['delta_centre']))
    assert len(p)==218
    rho=[]
    for r in p:
        assert r['certified'] and image(r)
        admissible(r)
        z=norm(r,r['y_radii']);assert z<1;rho.append(z)
    raw_patches=read(HERE/'inputs/fold-patches.json')['patches']+read(HERE/'inputs/fold-patches-2.json')['patches']
    patches=[r for r in raw_patches if r.get('ok')]
    assert len(patches)==217 and sorted(r['pair']for r in patches)==list(range(217))
    for r in patches:
        i=r['pair'];assert r['ok'] and r['certified'] and image(r)
        assert strict(list(map(outer,r['Y'])),list(map(inner,p[i]['Y'])))
        assert strict(list(map(outer,r['Y'])),list(map(inner,p[i+1]['Y'])))
        c=binary(r['centre']);rad=binary(1e-12);g=(c-rad,c+rad)
        assert overlap(domain(p[i]),g) and overlap(g,domain(p[i+1]))
    a,b=domain(p[0])[0],domain(p[-1])[1]
    assert a<=Q('2.8700') and Q('2.9245')<=b
    roots={};pi=pi_bounds();alpha=[Q('.878')*x for x in pi]
    for name in ['lower','upper']:
        r=read(HERE/f'inputs/krawczyk-alpha-0.878pi-{name}.json')
        assert r['certified'] and image(r,'X')
        d=outer(r['K'][0]);y=list(map(outer,r['K'][1:]))+[alpha]
        hits=[i for i,s in enumerate(p)if domain(s)[0]<d[0] and d[1]<domain(s)[1]
              and strict(y,list(map(inner,s['Y'])))]
        assert hits;roots[name]=[p[i]['delta_centre']for i in hits]
    return p,{'all_pass':True,'principal_pieces':218,'patches':217,
              'unselected_attempt_records':len(raw_patches)-len(patches),
              'exact_requested_domain':['2.8700','2.9245'],'binary_outer_domain':[str(a),str(b)],
              'max_weighted_contraction_upper':math.nextafter(float(max(rho)),math.inf),'.878pi_roots_on_curve':roots}


def audit_bridge(base,old,contact=None):
    p=read(base/'cover.json')['pieces'];j=read(base/'joins.json')['joins'];c=read(contact or base/'contact.json')
    assert len(p)==57 and len(j)==57
    for i,r in enumerate(p):
        assert r['piece']==i and r['certified'] and image(r)
        admissible(r)
        assert norm(r,r['y_radii'])<1
        a,b=map(Q,r['decimal_domain']);assert domain(r)[0]<=a and b<=domain(r)[1]
        if i:assert domain(p[i-1])[1]>domain(r)[0]
    assert domain(p[0])[0]<=Q('2.924') and domain(p[-1])[1]>=Q('2.981')
    for i,r in enumerate(j):
        a,b=(old[-1]if i==0 else p[i-1]),p[i]
        assert r['between']==['old-last'if i==0 else i-1,i]
        assert r['certified'] and image(r) and norm(r,r['y_radii'])<1
        admissible(r)
        d=domain(r);assert d[0]==d[1]
        assert all(domain(z)[0]<d[0] and d[1]<domain(z)[1]for z in (a,b))
        assert all(strict(list(map(outer,r['Y'])),list(map(inner,z['Y'])))for z in (a,b))
    assert c['certified'] and image(c,'X') and norm(c,c['radii'])<1
    admissible(c)
    reviewed=read(HERE/'inputs/branch-certificate-summary-extended-2.json')['segments'][0]
    assert c['reviewed_first_segment']==reviewed
    assert strict(list(map(outer,c['X'])),list(map(inner,reviewed['X'])))
    low,high=map(Q,c['alpha_spec'].split(','));assert low==high
    alo,ahi=map(Q,reviewed['alpha_over_pi']);assert alo<=low<=ahi
    pi=pi_bounds();alpha=(low*pi[0],high*pi[1]);d=outer(c['K'][0])
    y=list(map(outer,c['K'][1:]))+[alpha]
    hits=[i for i,r in enumerate(p)if domain(r)[0]<d[0] and d[1]<domain(r)[1]
          and strict(y,list(map(inner,r['Y'])))]
    assert hits
    return {'all_pass':True,'pieces':len(p),'joins':len(j),'contact_piece_matches':hits,
            'contact_alpha_over_pi':str(low),'contact_delta_K':c['K'][0],
            'max_weighted_contraction_upper':math.nextafter(float(max(norm(r,r['y_radii'])for r in p)),math.inf),
            'combined_requested_domain':['2.8700','2.981'],
            'claim':'Continuous exact balance curve, conditional on the frozen interval kernel and its reviewed lemmas; no global endpoint claim'}


def main():
    a=argparse.ArgumentParser();a.add_argument('--output',required=True);a.add_argument('--bridge');a.add_argument('--contact');x=a.parse_args()
    out=Path(x.output).resolve();out.mkdir(parents=True,exist_ok=True);known(out)
    manifest=read(HERE/'input-manifest.json')
    for r in manifest['records']:
        assert hashlib.sha256((HERE/'inputs'/Path(r['copy']).name).read_bytes()).hexdigest()==r['sha256']
    old,result=audit_old();write(out/'old-curve-audit.json',result);print('OLD CURVE AUDIT PASS',flush=True)
    if x.bridge:
        result=audit_bridge(Path(x.bridge).resolve(),old,Path(x.contact).resolve()if x.contact else None);write(out/'bridge-audit.json',result)
        print('BRIDGE AUDIT PASS',flush=True)


if __name__=='__main__':main()
