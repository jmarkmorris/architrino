"""Export literal original histories/kicks with binary64 round-trip decimal text."""
import json,pathlib,numpy as np
ROOT=pathlib.Path(__file__).resolve().parents[5]; OUT=ROOT/'.local-data/master-equation-closure/overnight-d'
known=[np.pi,1e-4,-.12345678901234567]
assert all(float(format(x,'.17g'))==x for x in known)
print('KNOWN binary64 round-trip PASS',flush=True)
a=json.loads((ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json').read_text())
for balance in [0,1]:
 b=a['balances'][balance]
 for seed in [1,2]:
  rng=np.random.default_rng(seed); kick=rng.normal(size=(8,3)); kick*=1e-4/np.linalg.norm(kick)
  assert np.array_equal(kick,np.load(OUT/f'b{balance}-s{seed}-h2400-original-endpoint.npz')['kick'])
  rows=[[8,b['w']]]+[[b['r'][i],b['phi'][i],b['z'][i],b['s'][i],*kick[i]] for i in range(8)]
  text='\n'.join(' '.join(format(x,'.17g') for x in row) for row in rows)+'\n'
  assert [float(v) for v in text.split()]==[float(v) for row in rows for v in row]
  path=OUT/f'b{balance}-s{seed}-input.txt';path.write_text(text);print(path.name)
