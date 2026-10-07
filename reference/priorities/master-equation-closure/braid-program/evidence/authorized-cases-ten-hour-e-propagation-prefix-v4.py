"""Bounded immutable-stream consumer for the exact E+M prefix through T=15."""
from pathlib import Path
import importlib.util,hashlib,json,sys,time,signal,resource
from datetime import datetime,timezone
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
LOCAL=ROOT/'.local-data/master-equation-closure/braid-program/authorized-cases-ten-hour'
PINS={
'authorized-cases-ten-hour-e-propagation-controller-v2.py':'34f430d602502f6e54a9ebeb3d969a7c9b0b70d69dff15d3a413d528e7754f50',
'authorized-cases-ten-hour-e-propagation-geometry.py':'bd12fbb0a60d7b6ca2d264f46570be9b8ce7cd7912c0e8f8bc194e5f05155c5c',
'authorized-cases-ten-hour-e-propagation.py':'a1b850177383f0aa2fff17e6014b9e3305f9240010b33a25c8b480b0533284ba',
'authorized-cases-ten-hour-e-residual-v3.py':'1aea647e4f61c9cc9636e54119c581f6a013352930c1569e6d905ae5661cbee0',
'authorized-cases-ten-hour-reference-e-residual-stream.py':'7677e32af2d1c3fa142364e9ec66515c96d91cd45975c7f76b0fb38fff7578b1',
'authorized-cases-ten-hour-reference-e-seam-audit-v2.py':'6246594bd91333aef876b535c9b39bc0f697c1bc8873f62429679e805e1af305',
'authorized-cases-ten-hour-reference-e-propagation-audit.py':'3a21fe4738c5e30160d60ac8f35497be6153fdc14d64c0d7aa70f65bd8289be9',
'authorized-cases-ten-hour-reference-e-pilot-audit-v2.py':'911422519232a587d5181ab256b541576129d263b53759a9c1de09000b81177e',
'authorized-cases-ten-hour-e-trial-v3.py':'9eda27ebc606c922453dc056c06b07ddb3e48095a1e461e4e7ad8a0bc2c058dd',
'authorized-cases-ten-hour-e-interval-jets-v2.py':'73ffb3275981a367ef039b9d06dc7d37817b1bb7e514557ecb30fbb4cfd634fa'}
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
for name,digest in PINS.items():assert sha(HERE/name)==digest
spec=importlib.util.spec_from_file_location('e_prefix_controller',HERE/'authorized-cases-ten-hour-e-propagation-controller-v2.py');c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
g,I,iv,mp=c.g,c.I,c.iv,c.mp
SOURCE=ROOT/'.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight/ring-full-plus1e4-h0025.history.json'
SOURCE_SHA='ef83cb8910090bf4c7179ebef65986c8895bb0d693e1a50bc5099a018393e193'
STREAM=ROOT/'.local-data/master-equation-closure/braid-program/authorized-cases-ten-hour/reference/e-residual-reference-t15-v1.rows.jsonl'
OUT=LOCAL/'e-propagation-reference-prefix-t15.json';ROWS=LOCAL/'e-propagation-reference-prefix-t15.rows.jsonl'
KNOWN=HERE/'authorized-cases-ten-hour-e-propagation-prefix-v4-known.json'
BUDGET=I('0.00043990155')
STOP=False

def signal_stop(sig,frame):
    global STOP;STOP=True
for sig in (signal.SIGINT,signal.SIGTERM):signal.signal(sig,signal_stop)
def line_object(line):
    if not line.endswith(b'\n'):return None
    obj=json.loads(line)
    assert isinstance(obj,dict) and obj.get('kind') in ('header','cell','footer')
    return obj
def budget_exhausted(position_bounds):
    return max(g.upper(x) for x in position_bounds)>=g.lower(BUDGET)

def known():
    assert line_object(b'{"kind":"cell","segment":0}\n')['segment']==0
    assert line_object(b'{"kind":"cell"}') is None
    try:line_object(b'{"kind":"unknown"}\n')
    except AssertionError:pass
    else:raise AssertionError('unknown stream object accepted')
    h=hashlib.sha256();h.update(b'abc');h.update(b'def')
    assert h.hexdigest()==hashlib.sha256(b'abcdef').hexdigest()
    lines=[b'{"kind":"cell","segment":0}\n',b'{"kind":"cell","segment":1}\n']
    cells=hashlib.sha256()
    for line in lines:cells.update(line)
    footer=line_object((json.dumps({'kind':'footer','cellCount':2,'rowsSha256':cells.hexdigest()})+'\n').encode())
    assert footer['cellCount']==len(lines) and footer['rowsSha256']==hashlib.sha256(b''.join(lines)).hexdigest()
    assert not budget_exhausted([I('.0004'),I('.0001')])
    assert budget_exhausted([BUDGET,I('.0001')])
    report={'passed':True,'time':datetime.now(timezone.utc).isoformat(),'instrumentSha256':sha(Path(__file__)),
            'cases':['complete newline-delimited JSON record','partial line deferred','unknown record rejected','incremental prefix digest','reference cell-only footer digest','scientific budget below and at boundary'],
            'scope':'stream wrapper controls only; target not evaluated'}
    KNOWN.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))

def target():
    known=json.loads(KNOWN.read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    assert sha(SOURCE)==SOURCE_SHA and not OUT.exists() and not ROWS.exists()
    assessment=HERE.parent/'analysis/authorized-cases-ten-hour-reference-e-propagation-output-assessment.md'
    assert sha(assessment)=='1fe5355e223fd34a654cae1de67bd4f72bc011e10abd8f0923ce7fbcf2bea832'
    started=time.monotonic();last_progress=started
    print(json.dumps({'phase':'load frozen trial','time':datetime.now(timezone.utc).isoformat()}),flush=True)
    trial=g.res.m.Trial(SOURCE,max_time=15);run=c.Propagation(trial,'1e-3','1e-3',terminal=15);run.seed_accepted_pilot()
    expected=[k for k,t in enumerate(trial.times[:-1]) if t<15]
    offset=0;digest=hashlib.sha256();row_digest=hashlib.sha256();seen=0;header=None;footer=None;inode=None;terminal='stopped';failure=None;scientific_stop=None
    def rss():return resource.getrusage(resource.RUSAGE_SELF).ru_maxrss*(1 if sys.platform=='darwin' else 1024)
    def append(obj):
        with ROWS.open('a') as out:out.write(json.dumps(obj,separators=(',',':'))+'\n')
        assert ROWS.stat().st_size<32*1024**2,'propagation stream output budget'
    try:
        deadline=datetime(2026,10,6,9,15,tzinfo=timezone.utc)
        while not STOP and time.monotonic()-started<9600 and datetime.now(timezone.utc)<deadline:
            assert rss()<1024**3,'one GiB resident budget'
            if not STREAM.exists():time.sleep(.5);continue
            st=STREAM.stat();assert st.st_size>=offset and st.st_size<20*1024**2
            if inode is None:inode=st.st_ino
            assert st.st_ino==inode,'producer stream replaced'
            with STREAM.open('rb') as inp:inp.seek(offset);line=inp.readline()
            obj=line_object(line) if line else None
            if obj is None:
                if time.monotonic()-last_progress>=30:
                    print(json.dumps({'phase':'await residual row','received':seen,'completed':len(run.records),'elapsed':time.monotonic()-started}),flush=True);last_progress=time.monotonic()
                time.sleep(.5);continue
            offset+=len(line);digest.update(line)
            if header is None:
                assert obj['kind']=='header' and obj['sourceSha256']==SOURCE_SHA
                assert obj['instrumentSha256']==PINS['authorized-cases-ten-hour-reference-e-residual-stream.py']
                assert obj['referenceSha256']==PINS['authorized-cases-ten-hour-reference-e-seam-audit-v2.py'] and obj['terminal']=='15'
                assert obj['selectedSegments']==expected and mp.mpf(obj['trialBounds']['speed'])<mp.mpf('.6')
                assert mp.mpf(obj['preparation']['pastSpeed'][1])<mp.mpf('.6')
                header=obj
                append({'kind':'header','sourceSha256':SOURCE_SHA,'producerHeaderSha256':hashlib.sha256(line).hexdigest(),'pins':PINS,
                        'consumerSha256':sha(Path(__file__)),'terminal':'15','caps':{'position':'1e-3','velocity':'1e-3'},'gamma':'1/16','independentSeedCells':3})
                for seed in run.results:append({'kind':'seed','row':seed})
                continue
            if obj['kind']=='footer':
                assert obj['rowsSha256']==row_digest.hexdigest() and obj['cellCount']==seen
                if obj['terminal']=='completed':
                    assert seen==len(expected);terminal='completed'
                else:terminal='producer stopped'
                footer=obj;break
            assert obj['kind']=='cell' and obj['segment']==seen
            row_digest.update(line)
            k=obj['segment'];row=obj['row'];left=trial.times[k];right=min(trial.times[k+1],mp.mpf(15))
            assert g.lower(I(row['left']))<=left<=g.upper(I(row['left'])) and g.lower(I(row['right']))<=right<=g.upper(I(row['right']))
            if k>=3:
                result=run.advance(k,row);append({'kind':'cell','row':result,'producerLineSha256':hashlib.sha256(line).hexdigest()})
            else:append({'kind':'seedInput','segment':k,'producerLineSha256':hashlib.sha256(line).hexdigest()})
            seen+=1
            positions=[e['position'] for e in run.records[-1]['errors']]
            if budget_exhausted(positions):
                terminal='observable budget exhausted'
                scientific_stop={'budget':g.bound(BUDGET),'positionUpper':g.bound(g.p.max_upper(positions)),
                                 'face':g.bound(I(run.records[-1]['right'])),'segment':k,
                                 'meaning':'fixed sufficient departure test unavailable from this monotone enclosure; no physical failure'}
                print(json.dumps({'phase':terminal,**scientific_stop}),flush=True);break
            if time.monotonic()-last_progress>=30:
                maximum=max(g.upper(e['position']) for e in run.records[-1]['errors'])
                print(json.dumps({'phase':'prefix advanced','received':seen,'completed':len(run.records),'time':str(run.records[-1]['right']),
                                  'positionUpper':str(maximum),'elapsed':time.monotonic()-started,'peakRSS':rss()}),flush=True);last_progress=time.monotonic()
    except Exception as exc:
        terminal='failed';failure=type(exc).__name__+': '+str(exc)
    if STREAM.exists():
        with STREAM.open('rb') as inp:assert hashlib.sha256(inp.read(offset)).hexdigest()==digest.hexdigest(),'consumed producer prefix mutated'
    receipt={'terminal':terminal,'failure':failure,'time':datetime.now(timezone.utc).isoformat(),'instrumentSha256':sha(Path(__file__)),
             'sourceSha256':SOURCE_SHA,'producerPrefixBytes':offset,'producerPrefixSha256':digest.hexdigest(),'producerFooter':footer,
             'independentCellLinesSha256':row_digest.hexdigest(),
             'receivedRows':seen,'completedCells':len(run.records),'lastProvedFace':g.bound(I(run.records[-1]['right'])),
             'scientificStop':scientific_stop,
             'lastErrors':[{key:g.bound(value) for key,value in e.items()} for e in run.records[-1]['errors']],
             'outputRowsSha256':sha(ROWS) if ROWS.exists() else None,'wallSeconds':time.monotonic()-started,'peakRSS':rss(),
             'claim':'subject finite actual-error prefix only; independent output assessment and observable comparison required'}
    OUT.write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps({'terminal':terminal,'failure':failure,'output':str(OUT),'sha256':sha(OUT)}),flush=True)
    if terminal=='failed':raise SystemExit(2)
if __name__=='__main__':
    if sys.argv[1:]==['--known']:known()
    elif sys.argv[1:]==['--target']:target()
    else:raise SystemExit('Use --known or separately admitted --target')
