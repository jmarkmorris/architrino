#!/usr/bin/env python
"""Known modular controls for the frozen interval evaluator; no target input."""
import hashlib
import importlib.util
import json
from pathlib import Path

source=Path(__file__).with_name("authorized-cases-ten-hour-coordinator-b-interval-v2.py")
digest="1b915c86a312c0564b59a6d5c72497fd9188321c457863259143e0e6794e48a7"
assert hashlib.sha256(source.read_bytes()).hexdigest()==digest
spec=importlib.util.spec_from_file_location("subject_interval_v2_known",source)
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
G=module.GRID
cases=[]
for lo,hi,expected in ((7,9,(1,1,1,3,1,3)),(-9,-7,(-2,-2,3,5,1,3))):
    a,b,remainder,distance=module.modular(module.V(lo*G,hi*G),module.vv(6))
    got=(a,b,remainder.lo//G,remainder.hi//G,distance.lo//G,distance.hi//G)
    assert got==expected
    cases.append({"input":[lo,hi],"period":6,"expected":expected,"got":got})
a,b,remainder,distance=module.modular(module.V(6*G-1,6*G+1),module.vv(6))
assert (a,b)==(0,1) and remainder is None and distance is None
out=Path(".local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/coordinator-b-interval/final-known-v2.json")
assert not out.exists()
payload={"passed":True,"subject_sha256":digest,"instrument_sha256":hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
         "controls":cases,"boundary_straddling":{"floors":[a,b],"unresolved":True},"boundary":"known rational-period controls only"}
out.write_text(json.dumps(payload,indent=2)+"\n")
print(json.dumps({"passed":True,"output":str(out),"sha256":hashlib.sha256(out.read_bytes()).hexdigest()}))
