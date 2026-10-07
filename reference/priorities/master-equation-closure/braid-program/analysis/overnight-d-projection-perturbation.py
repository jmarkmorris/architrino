"""Fixed-state projection sensitivity on the original two approaching pairs.
Known vector controls precede the independent snapshot data. No trajectory
comparison or coincidence claim follows from this pointwise measurement.
"""
import json,pathlib,numpy as np
p=pathlib.Path(__file__).resolve().parents[5]/'.local-data/master-equation-closure/overnight-d'
def response(A,v,capped):
 if not capped:return A
 v=v/np.linalg.norm(v);return A-max(float(v@A),0)*v
v=np.array([1.,0,0]);a=np.array([2.,3,0]);e=np.array([-1.,.2,0])
assert np.linalg.norm(response(a+e,v,True)-response(a,v,True)-[0,.2,0])<1e-14
assert abs(np.linalg.norm(response(np.array([-.5,0,0]),v,True)-response(np.array([.5,0,0]),v,True))-.5)<1e-14
print('Known fixed-state projection controls PASS')
for seed in [1,2]:
 r=json.loads((p/f'snapshot-independent/b0-s{seed}.json').read_text());o=json.loads((p/f'b0-s{seed}-h2400-original-endpoint.json').read_text());pair=[r['minimum_pair']['i'],r['minimum_pair']['j']]
 for i in pair:
  rows=[q for q in r['roots'] if q['i']==i];mutual=np.array(next(q['row'] for q in rows if q['j'] in pair));external=sum((np.array(q['row']) for q in rows if q['j'] not in pair),np.zeros(3));v=np.array(o['final']['V'][i]);cap=o['final']['capped'][i]
  print(json.dumps(dict(seed=seed,i=i,cap=cap,external_vector_norm=float(np.linalg.norm(external)),effective_difference=float(np.linalg.norm(response(mutual+external,v,cap)-response(mutual,v,cap))),mutual_effective_norm=float(np.linalg.norm(response(mutual,v,cap))))))
