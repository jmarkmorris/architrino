"""Independent selected residual reconciliation and rational crossing comparison."""
# Versioned execution adaptation, 2026-10-10, of the preserved reference event-reference.py (SHA-256 bf82e5150ef0d8eb8776d4ca63ad1fdecc0a9e721be054dadbed9a38610ec364). Function bodies are unchanged; the build driver serial-boundary-reference-build-2026-10-10.py lists every substitution. Not an independently authored reference.
from pathlib import Path
from fractions import Fraction as F
from math import factorial,nextafter,inf
import json,sys,hashlib,numpy as np
HERE=Path('.local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/reference');BASE=Path('.local-data/master-equation-closure');RECEIPT=BASE/'serial-boundary-reproduction-2026-10-10/selected-check/selected-residual.json';SUBJECT=Path('reference/priorities/master-equation-closure/lattice-research/analysis/smooth-two-particle-first-class-boundary-selected-certificate.py')
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def up(q):
 x=float(q);return nextafter(x,inf) if F.from_float(x)<q else x
def down(q):
 x=float(q);return nextafter(x,-inf) if F.from_float(x)>q else x
def quad(y,v,a,h):return [y+h*v+h*h*a/2,v+h*a,a]
def kernels(lam,h):
 z=lam*h*h;N=12;c=sum(z**n/F(factorial(2*n)) for n in range(N+1));s=sum(z**n/F(factorial(2*n+1)) for n in range(N+1));rc=z/F((2*N+3)*(2*N+4));rs=z/F((2*N+4)*(2*N+5));assert max(rc,rs)<1
 c+=z**(N+1)/factorial(2*N+2)/(1-rc);s+=z**(N+1)/factorial(2*N+3)/(1-rs);return c,h*s,(c-1)/lam if lam else h*h/2

def evolve(p,v,q,l,h):
 c,s,d=kernels(l,h);return c*p+s*v+d*q,l*s*p+c*v+s*q

def known():
 assert quad(F(1),F(2),F(4),F(1,2))==[F(5,2),F(4),F(4)]
 assert evolve(F(1),F(2),F(3),F(0),F(1))==(F(9,2),F(5))
 c,s,d=kernels(F(1),F(1,2));assert c>sum(F(1,4)**n/F(factorial(2*n)) for n in range(30)) and c< F(112763,100000)
 q=F(3);p,v=evolve(F(0),F(0),q,F(0),F(1,2));assert p==F(3,8) and v==F(3,2)
 r={'result':'PASS','controls':['exact quadratic jet','constant acceleration closed form','independent long positive-series enclosure','zero-error constant forcing']};(HERE/'event-reference-known.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))
LITERAL_INPUT_SHA256={
 "reference/priorities/master-equation-closure/lattice-research/analysis/smooth-two-particle-first-class-boundary-selected-certificate.py": "b255840a827d029b889072d550f51420c2492c4d06f6991746a8e1b0680d1f18",
 ".local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/selected-check/selected-residual.json": "e4c019f5f2f8172b9ed8064c6340cb9f758a81cbc152e6954093ace37fdfaa15",
 ".local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/reference/stopped-reference-target.json": "beb85950aead9706534fe57f2dbb7d48df672c7f3572568d886ed851e78be7de",
 ".local-data/master-equation-closure/first-class-boundary/history/endpoint.json": "7f12bb3732b6846089abd5179cff34bd8fcefb7f880ed9f4700e3cb166be7db3",
 ".local-data/master-equation-closure/post-restart/approximant/population-h17-4.json": "f8b50337e4f8266624ed0b35c9258520ba4e497808dde46e7131861e38173679",
 ".local-data/master-equation-closure/post-restart/approximant/population-h21-4.npz": "b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988",
 ".local-data/master-equation-closure/post-restart/approximant/population-h17-4.npz": "d3b20784dcd8ce5665f2293ffd847fa3dc85179d035729e9aca411e3bb17e6c6"
}
def target():
 for _path,_expected in LITERAL_INPUT_SHA256.items():assert sha(_path)==_expected,_path
 assert json.loads((HERE/'event-reference-known.json').read_text())['result']=='PASS';r=json.loads(RECEIPT.read_text());sr=json.loads((HERE/'stopped-reference-target.json').read_text());endpoint=json.loads((BASE/'first-class-boundary/history/endpoint.json').read_text());hist=json.loads((BASE/'post-restart/approximant/population-h17-4.json').read_text());assert sr['result']=='PASS'
 assert r['source_sha256']==sha(SUBJECT)==r['known']['source_sha256'] and r['known']['result']=='PASS'
 assert sha(r['archive'])==r['archive_sha256']=='b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988'
 assert sha(r['incoming_archive'])==r['incoming_archive_sha256']=='d3b20784dcd8ce5665f2293ffd847fa3dc85179d035729e9aca411e3bb17e6c6'
 assert r['time']==['5','81/16'] and r['points']==[[-1,0,0],[1,0,0]] and r['comparison_radius']=='3/40' and r['incoming_source_radius']=='1/100'
 assert r['source_points']==hist['source_points']+[[1,0,0]] and r['source_exact_zero_through']==hist['source_exact_zero_through']+['1']
 edges=[];H=F(81,16);B=F(3,40);BS=F(1,100)
 for i,pt in enumerate(r['points']):
  for j,(sp,cut) in enumerate(zip(r['source_points'],r['source_exact_zero_through'])):
   n=sum((x-y)**2 for x,y in zip(pt,sp));limit=H+B+BS-F(cut)
   if n and limit>0 and n<limit*limit:edges.append([i,j])
 assert edges==r['generated_edges'];assert r['max_emission']<float(H-1+B+BS)<17/4
 assert len(r['residual_bins'])==32;left=F(5)
 for row in r['residual_bins']:
  assert F(row['from'])==left and F(row['through'])-left==F(1,512);left=F(row['through'])
 assert left==H and [max(x['residual'][i] for x in r['residual_bins']) for i in range(2)]==r['per_receiver_residual']
 data=dict(np.load(r['archive']));wid=int(np.flatnonzero(np.all(data['source_points']==[-1,0,0],axis=1))[0]);results=[];h=F(1,16)
 for i,(label,L,Q) in enumerate(zip(r['points'],[F(20),F(38)],[F(85,1000),F(18,100)])):
  ep=next(x for x in endpoint['focus'] if x['point']==label);p0,v0=[F.from_float(x) for x in ep['accepted_errors'][:2]];s=sr['selected'][i]
  assert F.from_float(s['L'])<L and F.from_float(s['Q'])+F.from_float(r['per_receiver_residual'][i])<Q
  jets=[]
  for k,q in enumerate(['y','v','a']):
   saved=data['source_'+q][5120,wid] if i==0 else data['target_'+q][5120,0]
   assert list(saved)==r['endpoint5'][q][i]==ep['trial_'+q];jets.append(list(map(F.from_float,saved)))
  ph,vh=evolve(p0,v0,Q,L,h);ah=L*ph+Q
  exact=[quad(jets[0][j],jets[1][j],jets[2][j],h) for j in range(3)]
  for k in range(3):
   for j in range(3):assert F.from_float(r['endpoint_comparison_lower'][k][i][j])<=exact[j][k]<=F.from_float(r['endpoint_comparison_upper'][k][i][j])
  position=exact[2][0]-ph;velocity=jets[1][2]-vh;acceleration=jets[2][2]-ah
  first=None
  for k in range(1,129):
   hh=F(k,2048);pp,vv=evolve(p0,v0,Q,L,hh);bound=quad(jets[0][2],jets[1][2],jets[2][2],hh)[0]-pp
   if bound>F(1,16):first=F(5)+hh;break
  results.append({'point':label,'lambda':str(L),'forcing':str(Q),'endpoint_errors':list(map(up,[ph,vh,ah])),'vertical_position_lower_at_H':down(position),'continuous_vertical_velocity_lower':down(velocity),'continuous_vertical_acceleration_lower':down(acceleration),'crossing_contradiction_by':str(first) if first else None})
 assert results[0]['vertical_position_lower_at_H']>1/16 and results[1]['continuous_vertical_velocity_lower']>0 and results[1]['continuous_vertical_acceleration_lower']>0
 A=F.from_float(sr['global_acceleration']);P0=F(62304432625,10**12);V0=F(177391004262,10**12);hh=F(1,1024);early=P0+hh*V0+A*hh*hh/2;assert early<F(1,16)
 out={'result':'PASS','receiver_results':results,'event_interval':['5121/1024',results[0]['crossing_contradiction_by']],'all_environmental_position_upper_at_5121_1024':up(early),'scope':'environmental boundary before next target maximum; no unique first identity and no continuation beyond boundary','selected_edges':len(edges),'residual_sha256':sha(RECEIPT),'subject_sha256':sha(SUBJECT),'stopped_reference_sha256':sha(HERE/'stopped-reference-target.json'),'endpoint_sha256':sha(BASE/'first-class-boundary/history/endpoint.json'),'instrument_sha256':sha(__file__)};(HERE/'event-reference-target.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
known() if sys.argv[1]=='known' else target()
