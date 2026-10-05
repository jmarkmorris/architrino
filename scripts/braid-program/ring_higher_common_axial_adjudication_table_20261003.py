#!/usr/bin/env python3
"""Known-first metadata projection and comparison of independent 100 counts.
No contour claim is produced by this projector; scientific counts belong to
its frozen full-rectangle primitive and their binary certificates.
"""
import argparse,hashlib,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
SOURCE=ROOT/'.local-data/ring-exploration/higher-common-axial-independent'
OUT=ROOT/'.local-data/ring-exploration/higher-common-axial-projection-independent'
PRIMITIVE=ROOT/'scripts/braid-program/ring_higher_common_axial_independent_20261003.py'
PRIMITIVE_SHA='6fd5b1d4b85be98765c74e2ebcaeaf6d01d251e5b03b1b6f28ef6f627f757a04'
SUBJECT=ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-higher-common-axial-counts-2026-10-03.md'
SUBJECT_SHA='7e8e8c967eed2ff12a5a74fcd47f7587b13aae9e44cfc039a9e3b2ddd4fe2307'
OTHER=ROOT/'.local-data/ring-exploration/common-axial-higher/all100-summary.json'
OTHER_SHA='253d36819d0292adc1e4d253d6fa021e6b1508d7796afbb025c12b993ddf2cec'
TABLE=ROOT/'reference/priorities/master-equation-closure/braid-program/analysis/ring-higher-common-axial-independent-all100-table-2026-10-03.md'
mp.mp.dps=120

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def binary(a):return [mp.mpf(tuple(v)) for v in a['binary']]
def groups(rows):
    out=[]
    for row in rows:
        assert type(row['count']) is int and row['count']>=0
        if out and row['count']==out[-1]['count'] and row['rung']==out[-1]['last']+2:
            out[-1]['last']=row['rung'];out[-1]['references']+=1
        else:out.append({'first':row['rung'],'last':row['rung'],'count':row['count'],'references':1})
    return out

def known():
    rows=[{'rung':2,'count':0},{'rung':4,'count':0},{'rung':6,'count':2},{'rung':8,'count':2}]
    assert groups(rows)==[{'first':2,'last':4,'count':0,'references':2},{'first':6,'last':8,'count':2,'references':2}]
    try:groups([{'rung':2,'count':-1}])
    except AssertionError:pass
    else:raise AssertionError('negative count accepted')
    a={'passed':True,'instrumentSha256':sha(Path(__file__)),'knownGrouping':groups(rows),'negativeCountRejected':True}
    OUT.mkdir(parents=True,exist_ok=True);(OUT/'known.json').write_text(json.dumps(a,indent=2)+'\n');print(json.dumps({'knownPassed':True}),flush=True)

def target():
    a=json.loads((OUT/'known.json').read_text());assert a['passed'] and a['instrumentSha256']==sha(Path(__file__))
    assert sha(PRIMITIVE)==PRIMITIVE_SHA and sha(SUBJECT)==SUBJECT_SHA and sha(OTHER)==OTHER_SHA
    other=json.loads(OTHER.read_text());assert other['passed'];comparison={r['rung']:r for r in other['rows']};rows=[]
    for t in range(2,201,2):
        path=SOURCE/f'T{t:02d}-target.json';p=json.loads(path.read_text());assert p['passed'] and p['instrumentSha256']==PRIMITIVE_SHA
        assert p['literalBoundaryRealPart']==0 and p['rootCountPerReceiver']==2*t+4
        zero=binary(p['removedZeroValue']);cap=binary(p['outerCap']);L=mp.mpf(tuple(p['outerRadius']['binaryPoint']))
        assert zero[0]>0 and L*L>cap[1]
        reference=ROOT/f'.local-data/ring-exploration/stability/T{t:02d}-certificate.json';assert p['referenceSha256']==sha(reference)
        peer=comparison[t];assert p['zeroCount']==peer['count'] and p['referenceSha256']==peer['referenceSha256']
        rows.append({'rung':t,'count':p['zeroCount'],'panels':len(p['panels']),'outerRadius':str(int(L)),'rootsPerReceiver':p['rootCountPerReceiver'],'selfRootsPerReceiver':p['positiveDelaySelfCountPerReceiver'],'referenceSha256':p['referenceSha256'],'independentReceiptSha256':sha(path),'subjectReceiptSha256':peer['receiptSha256']})
    summary={'passed':True,'instrumentSha256':sha(Path(__file__)),'primitiveSha256':PRIMITIVE_SHA,'subjectDocumentSha256':SUBJECT_SHA,'subjectSummarySha256':OTHER_SHA,'allCountsAgree':True,'groups':groups(rows),'rows':rows,'scope':'metadata projection of separately certified full-contour counts; not a contour verifier'}
    (OUT/'all100-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
    lines=['# Independent hundred-rung common axial count table','','All numbers use $K=c_f=1$. **Grade: measured projection of independently certified full-rectangle scalar counts** from [the adjudication](ring-higher-common-axial-independent-adjudication-2026-10-03.md). Counts include algebraic multiplicity, exclude the simple translation zero, and apply to the literal closed right half-plane whose imaginary boundary is certified zero-free. Every count agrees with the frozen author table. This table supplies no differential-sector or nonlinear fate claim.','','| Rung | Ordinary hits per receiver | Self hits per receiver | Growing common axial roots | Full-contour panels | Outer radius | Independent receipt SHA-256 |','| --- | ---: | ---: | ---: | ---: | ---: | --- |']
    for r in rows:lines.append(f'| T{r["rung"]:02d} | {r["rootsPerReceiver"]} | {r["selfRootsPerReceiver"]} | {r["count"]} | {r["panels"]} | {r["outerRadius"]} | `{r["independentReceiptSha256"]}` |')
    lines+=['','Instrument: `scripts/braid-program/ring_higher_common_axial_adjudication_table_20261003.py`. The exact four-row grouping control and negative-count rejection passed before target projection. Its retained summary binds every scientific reference and independent receipt, and compares it with the frozen subject summary. A wrong count, missing rung, changed digest, failed literal-boundary identity or unmatched reference falsifies the projection; contour validity remains with each full-rectangle certificate.']
    TABLE.write_text('\n'.join(lines)+'\n');print(json.dumps({'passed':True,'groups':summary['groups'],'summarySha256':sha(OUT/'all100-summary.json'),'tableSha256':sha(TABLE)}),flush=True)
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--stage',choices=['known','target'],required=True);a=ap.parse_args();known() if a.stage=='known' else target()
