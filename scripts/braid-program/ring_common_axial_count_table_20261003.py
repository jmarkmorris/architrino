"""Receipt projection, not an independent spectral verifier."""
import argparse
import hashlib
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/common-axial-higher'
SOURCE_SHA='9fca837d700c3815663d549b8de4d93b3945767ca199c318d8741dbe3ee300ad'
METHOD_SHA='0e4fb74fba6ff5a7f74140070ee6b1e7cf9dc5652f822961516c37f80116acf3'
TABLE=ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-common-axial-all100-table-2026-10-03.md'

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def groups(rows):
    result=[]
    for row in rows:
        if result and result[-1]['count']==row['count'] and result[-1]['last']+2==row['rung']:
            result[-1]['last']=row['rung'];result[-1]['references']+=1
        else:result.append(dict(first=row['rung'],last=row['rung'],count=row['count'],references=1))
    return result
def known():
    control=groups([dict(rung=2,count=0),dict(rung=4,count=2),dict(rung=6,count=2),dict(rung=8,count=4)])
    assert control==[dict(first=2,last=2,count=0,references=1),dict(first=4,last=6,count=2,references=2),dict(first=8,last=8,count=4,references=1)]
    assert sha(Path(__file__))==hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    (OUT/'projection-known.json').write_text(json.dumps(dict(passed=True,instrumentSha256=sha(Path(__file__)),control=control),indent=2)+'\n')
def target():
    known=json.loads((OUT/'projection-known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    rows=[]
    for rung in range(2,201,2):
        path=OUT/f'T{rung:02d}-zero-target.json';p=json.loads(path.read_text())
        assert p['passed'] and p['topology']==rung and p['K']==p['c_f']==1
        assert p['instrumentSha256']==SOURCE_SHA and p['methodSha256']==METHOD_SHA
        assert p['gamma']['pointBinary']==[0,0,0,0]
        count=p['rightHalfPlaneZeroCount'];assert count>=0 and count%2==0
        rows.append(dict(rung=rung,count=count,outerRadius=p['outerRadius']['display'],
                         panels=len(p['panels']),receiptSha256=sha(path),referenceSha256=p['referenceSha256']))
    result=dict(passed=True,instrumentSha256=sha(Path(__file__)),subjectInstrumentSha256=SOURCE_SHA,
                K=1,c_f=1,grade='measured receipt projection; no independent contour verification',groups=groups(rows),rows=rows)
    (OUT/'all100-summary.json').write_text(json.dumps(result,indent=2)+'\n')
    text='# Six-member common axial right-half-plane counts\n\n'
    text+='All numbers use $K=c_f=1$. These are complete counts of nonneutral scalar common axial roots in $\\Re s>0$, with multiplicity, for the hundred admitted T02–T200 references. The entire quotient removes the exact translation zero; the imaginary boundary is separately excluded. This is a measured projection of the [owning contour account](ring-higher-common-axial-counts-2026-10-03.md), pending its independent adjudication. No other sector or nonlinear fate is counted. Each row binds a complete binary boundary receipt under `.local-data/ring-exploration/common-axial-higher/`.\n\n'
    text+='| Rung | Growing common axial roots | Outer radius | Zero-free upper panels | Receipt SHA-256 |\n| --- | ---: | ---: | ---: | --- |\n'
    for row in rows:text+=f"| T{row['rung']:02d} | {row['count']} | {row['outerRadius']} | {row['panels']} | `{row['receiptSha256']}` |\n"
    TABLE.write_text(text)
    print(json.dumps(dict(passed=True,references=len(rows),groups=result['groups'],summarySha256=sha(OUT/'all100-summary.json'),tableSha256=sha(TABLE))))
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','target'],required=True);args=parser.parse_args()
    known() if args.stage=='known' else target()
