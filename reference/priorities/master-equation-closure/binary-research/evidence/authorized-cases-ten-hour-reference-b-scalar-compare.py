"""Known-first exact comparison of two independent frozen interval receipts."""
import argparse,json,hashlib
from pathlib import Path

def samegrid(box,p,target):
 l,h=box
 if p<=target:return l<<(target-p),h<<(target-p)
 k=1<<(p-target);return l//k,-((-h)//k)
def overlap(a,b):return max(a[0],b[0])<=min(a[1],b[1])
def dec(a,p,n=12):
 k=10**n;lo=a[0]*k//(1<<p);hi=-((-a[1]*k)//(1<<p))
 def st(x):return ('-' if x<0 else '')+str(abs(x)//k)+'.'+str(abs(x)%k).zfill(n)
 return [st(lo),st(hi)]
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def known():
 assert samegrid((1,2),2,4)==(4,8)
 assert samegrid((-9,-7),4,2)==(-3,-1)
 assert overlap((1,3),(3,5)) and not overlap((1,2),(3,5))
 assert dec((1,1),2,3)==['0.250','0.250']
 assert dec((-1,-1),3,2)==['-0.13','-0.12']
 return {'passed':True,'controls':['directed precision conversion','signed conversion','overlap and disjoint intervals','directed decimal bounds']}
def target():
 root=Path('.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour')
 ap=root/'reference/b-scalar-target-v1.json';bp=root/'coordinator-b-interval/phase-v2.json'
 assert sha(ap)=='581e86e35efd9b570d60a2a7a468ee53e333fbb3956e37c3f41bc102ae62118c'
 assert sha(bp)=='ba577cfa1c86b09f92866d2a100f2582333527addada3104429ced93a92f64db'
 a=json.loads(ap.read_text());b=json.loads(bp.read_text());p=a['precision_bits'];q=b['precision'];P=max(p,q)
 def aa(k):return samegrid(tuple(int(v,16) for v in a['boxes'][k]),p,P)
 def bb(k):
  z=b[k];assert z['scale_bits']==q
  box=(int(z['lo_hex'],16),int(z['hi_hex'],16));assert box[1]-box[0]==int(z['width_units_hex'],16)
  return samegrid(box,q,P)
 pairs=[('pi','pi'),('log2','log2'),('log3','log3'),('zr','normalized_initial_real'),('zi','normalized_initial_imag'),('d','normalized_initial_parameter'),('critical','critical_phase'),('remainder','modulo_interval'),('distance','distance_to_multiple')]
 checks={x:overlap(aa(x),bb(y)) for x,y in pairs};assert all(checks.values())
 j=int(a['modular']['index'],16);assert j==int(b['quotient_floor_lo_hex'],16)==int(b['quotient_floor_hi_hex'],16)
 # Independently reconstruct each receipt's modular interval from critical phase and uncertain period.
 for C,pi,M,D in [(aa('critical'),aa('pi'),aa('remainder'),aa('distance')),(bb('critical_phase'),bb('pi'),bb('modulo_interval'),bb('distance_to_multiple'))]:
  period=(2*pi[0],2*pi[1]);v=(j*period[0],j*period[1]) if j>=0 else (j*period[1],j*period[0])
  mod=(C[0]-v[1],C[1]-v[0]);assert M[0]<=mod[0] and mod[1]<=M[1]
  dist=(min(mod[0],period[0]-mod[1]),min(mod[1],period[1]-mod[0]));assert D[0]<=dist[0] and dist[1]<=D[1]
  assert D[0]>(1<<(P-203999))
 union=(min(aa('distance')[0],bb('distance_to_multiple')[0]),max(aa('distance')[1],bb('distance_to_multiple')[1]))
 analytic=1<<(P-209000);actual=(union[0]-analytic,union[1]+analytic)
 assert actual[0]>(1<<(P-204000))
 return {'passed':True,'independent_overlap':checks,'same_turn_index':True,'turn_index_bits':abs(j).bit_length(),'distance_directed_decimal':dec(union,P),'actual_distance_after_zero_branch_budget':dec(actual,P),'finite_distance_exceeds_twice_nu':True,'analytic_budget':'2^-209000','nu':'2^-204000','reference_sha':sha(ap),'subject_sha':sha(bp)}
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('mode',choices=['known','target']);ap.add_argument('--out',required=True);a=ap.parse_args();r=known() if a.mode=='known' else target();r['source_sha']=sha(__file__);p=Path(a.out);assert not p.exists();p.write_text(json.dumps(r,indent=2,sort_keys=True)+'\n');print(json.dumps(r))
