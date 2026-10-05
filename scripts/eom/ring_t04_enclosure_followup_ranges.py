#!/usr/bin/env python3
"""Known-first outward analytical-range inclusion for native control rows."""
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/t04'
mp.iv.dps=80
iv=mp.iv

def contains(row,value):
    lower=iv.mpf(str(row[0]));upper=iv.mpf(str(row[1]))
    # Binary comparisons preserve complete interval endpoints; no rounded
    # decimal presentation is used to decide inclusion.
    return lower.a<=value.a and upper.b>=value.b

def known():
    quarter=iv.mpf(1)/4
    assert contains(['.24','.26'],quarter)
    assert not contains(['.26','.27'],quarter)
    record={'passed':True,'control':'exact quarter accepted; disjoint interval rejected',
            'instrumentSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
    (OUT/'ranges-known.json').write_text(json.dumps(record)+'\n')
    print('Known exact inclusion/rejection passed before native range target.',flush=True)

def target():
    path=OUT/'diagnostic/production-known.json'
    packet=json.loads(path.read_text())
    rows=next(c['rows'] for c in packet['cases'] if c['id']=='negative-D-input-ball')
    error=iv.mpf(['-.000001','.000001'])
    length=iv.mpf(['1.999998','2.000002'])
    values=[1/(length**2*(1+error)),-9/(length**2*(3+error))]
    assert len(rows)==2
    for row,value in zip(rows,values):
        assert contains(row['acceleration'][0],value)
    record={'passed':True,'instrumentSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        'productionKnownSha256':hashlib.sha256(path.read_bytes()).hexdigest(),
        'scope':'Both whole closed scalar uncertainty ranges lie in native per-hit enclosures; no evolution claim',
        'intervalEndpoints':[[list(map(int,t)) for t in value._mpi_] for value in values]}
    (OUT/'ranges-target.json').write_text(json.dumps(record,indent=2)+'\n')
    print('Both whole closed analytical ranges lie in native control rows.',flush=True)

if __name__=='__main__':
    known();target()
