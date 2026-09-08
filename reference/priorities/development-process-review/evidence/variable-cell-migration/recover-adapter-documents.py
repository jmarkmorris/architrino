"""Exact old document recovery. Does not execute historical code."""
import hashlib,json,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[5];OUT=Path(__file__).resolve().parent
sys.path.insert(0,str(ROOT/'scripts/eom'));import f6c_variable_cell_adapter as a
sha=lambda b:hashlib.sha256(b).hexdigest()
def matches(raw,h):return sha(raw)==h
assert matches(b'abc','ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')and not matches(b'abc','0'*64)
rows=[]
for role,p,h in a.SOURCES:
 if role not in ('integralProof','correlatedProof','gkProof','refinedClosure'):continue
 spec='897fe1aa79be7ae1e77144d52ef396d209645323^:'+p
 raw=subprocess.check_output(['git','show',spec],cwd=ROOT)
 assert matches(raw,h),(role,sha(raw),h)
 file=OUT/(Path(p).name+'.source');file.write_bytes(raw);assert file.read_bytes()==raw
 rows.append(dict(role=role,original=dict(path=str(ROOT/p),sha256=h,bytes=len(raw)),physical=dict(path=str(file),sha256=h,bytes=len(raw)),gitSource=spec))
(OUT/'adapter-document-archives.json').write_text(json.dumps(rows,indent=2)+'\n')
print(json.dumps(rows,indent=2))
