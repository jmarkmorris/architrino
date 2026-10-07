"""Read-only census under explicit campaign owner selectors; never signals a process."""
from pathlib import Path
import json,hashlib,subprocess,sys
from collections import Counter
from datetime import datetime,timezone
HERE=Path(__file__).resolve().parent
BASE=HERE/'authorized-cases-ten-hour-reference-campaign-compute-census'
OWNERS={'01a10ebb-fea3-7150-a18f-f0c33c30a2fb','authorized-cases-ten-hour-coordinator'}
TERMINAL={'completed','failed','stopped','timed_out','reconciled_stopped','reconciled_closed'}
A=Path('.local-data/master-equation-closure/binary-research/authorized-cases-ten-hour/a/own-lease-closeout-v3.json')
REQUIRED={'83a634b7-7e19-4e30-ba63-9a69eb4e1b95','13e2ddb1-06a5-4880-b64d-71fc7bfe7c81','67cdad56-c4ed-4660-86c0-361f3b439d06','6168ba99-13e7-41d4-992b-f43fdec45a28','47cdc13e-e600-405c-9e70-42098d737a0e'}
def sha(b):return hashlib.sha256(b).hexdigest()
def selected(x):return x.get('owner',{}).get('task') in OWNERS
def exception(x):return x.get('status') not in TERMINAL or x.get('processGroupClosed') is not True
def marker(x):return 'authorized-cases-ten-hour' in ' '.join([x.get('command',''),*x.get('args',[])])
def summarize(xs):return {'count':len(xs),'statusCounts':dict(sorted(Counter(x['status'] for x in xs).items())),'allTerminal':all(x['status'] in TERMINAL for x in xs),'allProcessGroupsClosed':all(x.get('processGroupClosed') is True for x in xs),'exceptions':[x['runId'] for x in xs if exception(x)]}
def write(suffix,x):
    p=Path(str(BASE)+suffix);assert not p.exists();p.write_text(json.dumps(x,indent=2)+'\n');return str(p)
def known():
    closed={'runId':'closed','owner':{'task':next(iter(OWNERS))},'status':'completed','processGroupClosed':True}
    live={'runId':'live','owner':{'task':'authorized-cases-ten-hour-coordinator'},'status':'running','processGroupClosed':False}
    unrelated={'runId':'unrelated','owner':{'task':'other'},'status':'completed','processGroupClosed':True}
    failed={**closed,'runId':'failed','status':'failed','exitCode':1}
    marked={**unrelated,'runId':'marker','args':['authorized-cases-ten-hour-example.py']}
    xs=[closed,live,unrelated,failed,marked];chosen=[x for x in xs if selected(x)]
    assert [x['runId'] for x in chosen]==['closed','live','failed']
    assert summarize(chosen)=={'count':3,'statusCounts':{'completed':1,'failed':1,'running':1},'allTerminal':False,'allProcessGroupsClosed':False,'exceptions':['live']}
    assert [x['runId'] for x in xs if marker(x) and not selected(x)]==['marker']
    assert not exception(failed) and not marker(closed)
    out={'passed':True,'instrumentSha256':sha(Path(__file__).read_bytes()),'time':datetime.now(timezone.utc).isoformat(),'controls':['closed/live/unrelated exact owner selection','closed failed run is operationally closed, not scientific acceptance','marked unrelated owner reported without broadening selection','status counts and outstanding live exception']}
    print(write('-known.json',out))
def target():
    known=json.loads(Path(str(BASE)+'-known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__).read_bytes())
    ar=json.loads(A.read_text());assert len(ar)==6 and len({x['runId'] for x in ar})==6
    required=REQUIRED|{x['runId'] for x in ar};allrows=[];files={}
    for p in sorted(Path('.local-data/owned-compute/leases').glob('*.json')):
        b=p.read_bytes();x=json.loads(b);assert x['runId']==p.stem;allrows.append(x);files[x['runId']]={'path':str(p),'sha256':sha(b)}
    chosen=[x for x in allrows if selected(x)];outrows=[]
    for x in chosen:
        proc=subprocess.run(['node','scripts/dev/owned-compute-supervisor.mjs','status','--run-id',x['runId']],check=True,capture_output=True,text=True,timeout=10)
        state=json.loads(proc.stdout);y=state['lease'];assert y['runId']==x['runId'] and selected(y)
        row={k:y.get(k) for k in ['runId','owner','status','processGroupClosed','exitCode','exitSignal','startedAtUtc','finishedAtUtc','stopReason','error','stderrBytes','command','args','elapsedWallSeconds']}
        row.update(files[x['runId']]);row['supervisorClassification']=state['classification'];outrows.append(row)
    ids={x['runId']:x for x in allrows};checks=[]
    for rid in sorted(required):
        x=ids.get(rid);checks.append({'runId':rid,'present':x is not None,'selected':bool(x and selected(x)),'owner':None if x is None else x.get('owner'),'status':None if x is None else x.get('status'),'processGroupClosed':None if x is None else x.get('processGroupClosed')})
    outside=[{'runId':x['runId'],'owner':x.get('owner'),'status':x.get('status'),'reason':'literal campaign marker in command/args; not added to owner-selected count'} for x in allrows if marker(x) and not selected(x)]
    out={'time':datetime.now(timezone.utc).isoformat(),'scope':'exact current owner.task selectors only; mandatory identities cross-checked; no process signalling or state mutation','ownerSelectors':sorted(OWNERS),'instrumentSha256':sha(Path(__file__).read_bytes()),'knownReceiptSha256':sha(Path(str(BASE)+'-known.json').read_bytes()),'aScopedReceiptSha256':sha(A.read_bytes()),'supervisorSourceSha256':sha(Path('scripts/dev/owned-compute-supervisor.mjs').read_bytes()),'leaseFilesRead':len(allrows),'summary':summarize(outrows),'ownerCounts':dict(Counter(x['owner']['task'] for x in outrows)),'mandatoryChecks':checks,'unselectedLiteralCampaignMarkers':outside,'leases':outrows}
    print(write('-receipt.json',out));print(json.dumps({k:out[k] for k in ['time','summary','ownerCounts','mandatoryChecks','unselectedLiteralCampaignMarkers']},indent=2))
if __name__=='__main__':known() if sys.argv[1]=='known' else target()
