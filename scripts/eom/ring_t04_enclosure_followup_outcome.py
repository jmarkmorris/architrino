#!/usr/bin/env python3
"""Known-first exact trace accounting; no EOM scientific acceptance."""
import hashlib
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-followup/t04'

def trace(lines):
    rows=[json.loads(line) for line in lines.splitlines() if line.strip()]
    samples=[r for r in rows if r.get('kind')=='resource-sample']
    return {'sampleCount':len(samples),'maximumSampledAggregateRssBytes':max((r['rssBytes'] for r in samples),default=0),
            'lastResourceSample':samples[-1] if samples else None}

def known():
    result=trace('{"kind":"resource-sample","rssBytes":32}\n{"kind":"resource-sample","rssBytes":64}\n')
    assert result['sampleCount']==2 and result['maximumSampledAggregateRssBytes']==64
    assert trace('')['sampleCount']==0
    try:trace('not-json')
    except json.JSONDecodeError:pass
    else:raise AssertionError('malformed trace accepted')
    record={'passed':True,'instrumentSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        'known':'two exact samples32/64 -> count2/max64; empty count0; malformed rejected'}
    (OUT/'outcome-known.json').write_text(json.dumps(record)+'\n')
    print('Known exact trace count/max and invalid-input rejection passed before target.',flush=True)

def target():
    resources=OUT/'retry/coarse-evolution/resources.ndjson'
    progress=OUT/'retry/coarse-evolution/stderr.log'
    stdout=OUT/'retry/coarse-evolution/stdout.json'
    lease=ROOT/'.local-data/owned-compute/leases/b0173c4c-b6ad-4465-aab9-c8f2864552f2.json'
    state=trace(resources.read_text()); accepted=[json.loads(s) for s in progress.read_text().splitlines() if s.strip()]
    assert all(r['schema']=='eom_accepted_step_progress/v1' for r in accepted)
    state.update({'passed':True,'instrumentSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        'claimBoundary':'Exact operational trace accounting only; no complete response, independent checkpoint, cycle or retained-prefix acceptance',
        'limits':{'aggregateRssBytes':1610612736,'stageWallSeconds':7200},
        'maximumExceedsUnchangedLimit':state['maximumSampledAggregateRssBytes']>1610612736,
        'progress':accepted,'stdoutBytes':stdout.stat().st_size,
        'providerReceiptPresent':(OUT/'retry/coarse-evolution/process-receipt.json').exists(),
        'mediumStarted':(OUT/'retry/medium-inspection').exists(),
        'fineStarted':(OUT/'retry/fine-inspection').exists(),
        'checkpointPresent':(OUT/'retry/independent-checkpoint.json').exists(),
        'ownedLease':json.loads(lease.read_text()),
        'bindings':[{'path':str(p),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
                    for p in (resources,progress,stdout,lease)]})
    assert state['stdoutBytes']==0 and state['maximumExceedsUnchangedLimit']
    (OUT/'outcome.json').write_text(json.dumps(state,indent=2)+'\n')
    print(json.dumps({'maximumRssBytes':state['maximumSampledAggregateRssBytes'],'lastProgress':accepted[-1],
        'stdoutBytes':state['stdoutBytes'],'checkpointPresent':state['checkpointPresent']}),flush=True)

if __name__=='__main__':known();target()
