"""Read-only subject-prefix receipt monitor; no mathematical acceptance."""
from pathlib import Path
from decimal import Decimal
from datetime import datetime,timezone
import json,hashlib,sys
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
SOURCE=ROOT/'.local-data/master-equation-closure/braid-program/authorized-cases-ten-hour/e-propagation-reference-prefix-t15.rows.jsonl'
KNOWN=HERE/'authorized-cases-ten-hour-e-propagation-monitor-known.json'
def summarize(row):
    return {'segment':row['segment'],'left':row['left'],'right':row['right'],
            'errors':{key:str(max(Decimal(m['errors'][key][1]) for m in row['members'])) for key in ('position','velocity','acceleration')},
            'sourceForcing':str(max(Decimal(m['sourceForcing'][1]) for m in row['members'])),
            'sourceContributions':sum(len(m['sourceContributions']) for m in row['members'])}
def contains(row,t):return Decimal(row['left'][1])<=t<=Decimal(row['right'][0])
def known():
    row={'segment':7,'left':['.99','1.01'],'right':['1.99','2.01'],'members':[{'errors':{k:['0',v] for k,v in zip(('position','velocity','acceleration'),('1e-8','2e-8','3e-8'))},'sourceForcing':['0','4e-8'],'sourceContributions':[{}]}]*4}
    got=summarize(row);assert got['errors']['position']=='1E-8' and got['sourceContributions']==4
    assert contains(row,Decimal('1.5')) and not contains(row,Decimal('1')) and not contains(row,Decimal('2'))
    report={'passed':True,'time':datetime.now(timezone.utc).isoformat(),'instrumentSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'cases':['exact decimal maxima','source contribution count','strict observation containment rejects uncertain faces'],'scope':'JSON receipt summarization only'}
    KNOWN.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
def target():
    known=json.loads(KNOWN.read_text());assert known['passed'] and known['instrumentSha256']==hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    latest=None;observations={};count=0
    with SOURCE.open('rb') as f:
        for line in f:
            if not line.endswith(b'\n'):break
            obj=json.loads(line)
            if obj['kind']!='cell':continue
            row=obj['row'];latest=row;count+=1
            for t in ('10','12','15'):
                if contains(row,Decimal(t)):observations[t]=summarize(row)
    print(json.dumps({'time':datetime.now(timezone.utc).isoformat(),'subjectCellsAfterSeed':count,'latest':summarize(latest) if latest else None,
                      'observationCells':observations,'boundary':'subject receipt summary, not independent acceptance'},indent=2))
if __name__=='__main__':
    if sys.argv[1:]==['--known']:known()
    elif sys.argv[1:]==['--target']:target()
    else:raise SystemExit('Use --known or --target')
