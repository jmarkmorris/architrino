"""Replay a single corrected candidate in a fresh isolated directory."""
import argparse,copy,json,os,platform,shutil,subprocess,sys
from pathlib import Path
import rdflib
import candidate_reader as p
import result_record_check as rc
M='content/markdown/aaa/dynamics/master-equation.md'
D='reference/priorities/master-equation-closure/analysis/receiver-wake-gradient-closure.md'
C='scripts/equation-mapping/verify-moving-single-root-scalar-gradient.mjs'
R='scripts/equation-mapping/verify-receiver-wake-gradient.mjs'
T='tests/moving-single-root-scalar-gradient-verifier.test.mjs'
H='reference/priorities/development-process-review/evidence/option-b-real-chain-pilot'

def run():
    ap=argparse.ArgumentParser();ap.add_argument('--repo',required=True);ap.add_argument('--work-root',required=True);args=ap.parse_args()
    root=Path(args.work_root).resolve();repo=Path(args.repo).resolve()
    if root==repo or repo in root.parents or root.exists():raise ValueError('Require fresh directory outside repo')
    root.mkdir(parents=True)
    preflight=p.preflight()+'\n'+rc.preflight();(root/'preflight.log').write_text(preflight+'\n');print(preflight,flush=True)
    # Literal expected observations are specified before reading real target inputs.
    expectations={
      'unchanged':{'review':'unchanged-exploratory','selectedChecks':[]},
      'stale-sign':{'consistency':'reject'},
      'changed-sign':{'review':'required','contains':['sign','proof','identity','calculation'],'selectedChecks':['prose-check','scientific-check']},
      'deleted-proof-sign':{'review':'required','contains':['proof','identity','calculation'],'selectedChecks':['prose-check','scientific-check']},
      'deleted-prose-coverage':{'review':'required','contains':['measured-prose'],'selectedChecks':['prose-check']},
      'changed-scalar-edge':{'review':'required','contains':['scalar','proof','identity','calculation'],'selectedChecks':['prose-check','scientific-check']},
      'wrong-displayed-result':{'review':'required','contains':['measured-prose'],'selectedChecks':['prose-check','scientific-check'],'result':'reject'},
      'duplicate-displayed-result':{'consistency':'reject','result':'reject'},
      'outside-selector-comment':{'review':'required','selectedChecks':['prose-check','scientific-check']}}
    (root/'expected.json').write_bytes(p.pack(expectations))
    manifest=json.loads((repo/H/'manifest.json').read_text());commit=manifest['commit'];files={}
    for path,entry in manifest['files'].items():
        raw=subprocess.check_output(['git','-C',str(repo),'show',commit+':'+path]);assert p.sha(raw)==entry['sha256'];files[path]=raw
    protected={str(q.relative_to(repo)):p.sha(q.read_bytes()) for q in (repo/H).iterdir() if q.is_file()}
    protected.update({path:p.sha((repo/path).read_bytes()) for path in files})
    assert all(protected[path]==entry['sha256'] for path,entry in manifest['files'].items())
    before=copy.deepcopy(protected)
    for path,raw in files.items():
        dst=root/'baseline'/path;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(raw)
    node=shutil.which('node');env={'python':sys.version,'node':subprocess.check_output([node,'--version']).decode().strip(),'platform':platform.platform(),'rdflib':rdflib.__version__,'rdflibPath':rdflib.__file__}
    (root/'environment.json').write_bytes(p.pack(env));files['environment.json']=p.pack(env)
    def execute(folder,label):
        receipts=[];report=None
        for argv,name in [([node,C],'scientific-output.json'),([node,'--test',T],'scientific-test.log')]:
            proc=subprocess.run(argv,cwd=folder,capture_output=True,timeout=45)
            if proc.returncode:raise RuntimeError(proc.stderr.decode())
            (root/(label+'-'+name)).write_bytes(proc.stdout)
            receipts.append({'argv':argv,'cwd':str(folder),'exitCode':proc.returncode,'stdoutSha256':p.sha(proc.stdout),'stderrSha256':p.sha(proc.stderr),'inputs':{x:p.sha((folder/x).read_bytes()) for x in [C,R,T]},'environmentSha256':p.sha(p.pack(env))})
            if name.endswith('.json'):report=json.loads(proc.stdout)
        assert all((folder/x).read_bytes()==files[x] for x in [C,R,T])
        return report,receipts
    numerical,receipts=execute(root/'baseline','baseline')
    files['scientific-output.json']=(root/'baseline-scientific-output.json').read_bytes();files['execution.json']=p.pack(receipts)
    files['result_record_check.py']=Path(rc.__file__).read_bytes()
    for name in ['scientific-output.json','execution.json','result_record_check.py']:(root/name).write_bytes(files[name])
    specs={};objects={};rows=[]
    def lines(path,a,z):return (path,{'kind':'lines','first':a,'last':z})
    def whole(path):return (path,{'kind':'whole'})
    def literal(path,text):return(path,{'kind':'literal','text':text})
    def obj(alias,kind,bindings,scope,uri=None):
        bs=[p.bind(files,*b) for b in bindings];specs[alias]=bs
        o={'@id':uri or p.NS+alias,'alias':alias,'@type':kind,'revisionId':'candidate-'+p.sha(p.pack(bs))[:20],'sourceBindings':bs,'scope':scope}
        objects[alias]=o;rows.append(o)
    occurrence=lambda suffix:'https://architrino.com/equation-mapping.html#corpus-equation-'+suffix
    obj('assumptions','Assumption',[lines(M,1556,1556),lines(M,1572,1576)],'Fixed reception/history, selected differentiable root, positive separation, nonzero D; connected chart.')
    obj('definitions','EquationOccurrence',[lines(M,1558,1570)],'Selected geometric definitions; fixed source occurrence.',occurrence('f320108876777c46'))
    obj('constraint','EquationOccurrence',[lines(D,444,450)],'Selected causal equation; no new corpus occurrence identity.')
    obj('coupling','Assumption',[literal(D,'The signed coupling $C_b$ is fixed for that admitted row.')],'C is constant for the selected row.')
    obj('sign','Derivation',[lines(M,1598,1598),lines(D,469,469)],'Continuity and nonzero D on connected U imply one constant sign; componentwise limit explicit.')
    obj('root-derivative','EquationOccurrence',[lines(M,1580,1594)],'Differentiation at fixed reception/history.',occurrence('0d1e584019eb76b1'))
    obj('scalar','EquationOccurrence',[lines(M,1600,1606)],'Definition only; no dependency on root derivative.',occurrence('4c68e6145352e9dc'))
    obj('canonical-row','EquationOccurrence',[lines(D,48,86)],'Declared canonical acceleration row; boundary input from existing law, not derived from scalar identity.')
    obj('proof','Derivation',[lines(D,477,499)],'Local gradient proof only; excludes following measurements/action discussion.')
    obj('identity','EquationOccurrence',[lines(M,1608,1620)],'Conclusion occurrence with proof support, not a numerical theorem.',occurrence('193390fd300cb6a5'))
    obj('numerical-spec','CalculationSpecification',[lines(C,10,30),lines(C,86,93),lines(C,124,194),lines(C,197,213)],'One positive-D circular control; central-point stencils, five refinements, chart bounds/sample checks.')
    obj('reference-inputs','CalculationSpecification',[lines(R,548,579)],'Retained circular history, direction, root, bracket, c_f and coupling used by reference; matching subject configuration reviewed separately.')
    obj('reference','CalculationSpecification',[whole(R)],'Unchanged separately coded bracketed root record; all R controls execute. Common canonical model is not independent.')
    obj('calculation','CalculationSpecification',[whole(C)],'Numerical scalar versus reconstructed ledger; no analytic gradient import.')
    sentence='Across five step refinements, the largest component residual was $2.12\\times10^{-12}$'
    obj('measured-prose','Result',[literal(M,sentence)],'Only displayed maximum; historical generating activity not authenticated. New run is comparison evidence, not its historical producer.')
    obj('theorem-claim','Result',[literal(M,'Claim grade: derived for the identity on one connected regular moving-simple-root chart;')],'Derived claim separated from measurement.')
    obj('scientific-check','CheckObligation',[whole(T)],'Existing numerical test; no Markdown parsing, general proof, negative-D control or arbitrary receiver coverage.')
    obj('prose-check','CheckObligation',[whole('result_record_check.py')],'New isolated comparison of one unique displayed maximum against corresponding run output; not scientific proof.')
    obj('environment','CalculationSpecification',[whole('environment.json')],'Observed runtime metadata; not authenticated environment or dependency distribution lock.')
    obj('run','CalculationRun',[whole('execution.json')],'Actual new isolated scalar and test executions; receipts not operator approval.')
    obj('output','Result',[whole('scientific-output.json')],'Actual new numerical output; not original historical measurement.')
    def edge(kind,a,b,role,why,just):
        identifier=kind+'-'+a+'-'+b
        r={'@id':p.NS+identifier,'@type':'Relationship','revisionId':'candidate-1','kind':p.NS+kind,'fromObject':objects[a]['@id'],'fromRevision':objects[a]['revisionId'],'toObject':objects[b]['@id'],'toRevision':objects[b]['revisionId'],'role':role,'meaning':why,'justifications':[p.bind(files,*j) for j in just]}
        rows.append(r)
    def dep(a,b,why,just,role='mathematical'):edge('dependsOn',a,b,role,why,just)
    dep('definitions','assumptions','r and selected root need the declared domain.',[lines(M,1556,1576)],'domain')
    dep('constraint','definitions','Causal constraint uses separation r and emission time.',[lines(D,444,465)])
    dep('root-derivative','constraint','Differentiate g=0, not geometric notation alone.',[lines(D,444,467)])
    dep('root-derivative','definitions','D and n enter the differential.',[lines(D,444,467)])
    dep('root-derivative','assumptions','Fixed reception/history, differentiable root and nonzero D license differentiation/division.',[lines(D,420,467)],'domain')
    dep('sign','assumptions','Continuity, nonvanishing and connectedness support one sign; continuity is stated here.',[lines(D,469,469)],'domain')
    dep('sign','definitions','D is the transmitter factor whose sign is used.',[lines(D,431,469)])
    dep('scalar','definitions','Definition uses r and C, rather than a previously computed derivative.',[lines(D,469,475)])
    dep('scalar','sign','The selected scalar uses the chart sign epsilon.',[lines(D,469,475)])
    dep('proof','scalar','Differentiate the defined scalar.',[lines(D,469,495)])
    dep('proof','root-derivative','Substitute grad r from the causal derivative.',[lines(D,458,495)])
    dep('proof','coupling','Fixed coupling removes a gradient-of-C term.',[lines(D,442,442),lines(D,479,495)])
    dep('proof','sign','Constant sign removes its derivative; epsilon/D=1/abs(D).',[lines(D,469,495)])
    dep('proof','assumptions','Proof remains on the stated connected regular chart.',[lines(D,420,426),lines(D,497,499)],'domain')
    dep('proof','canonical-row','Final equality identifies the gradient with independently declared A.',[lines(D,48,86),lines(D,479,495)])
    dep('identity','proof','Canonical occurrence states the same local equality proved in D; reviewed correspondence, not a source import.',[lines(M,1608,1620),lines(D,479,499)],'proof-support')
    dep('theorem-claim','identity','Derived claim refers to this equality only under its hypotheses.',[lines(M,1622,1622)],'proof-support')
    dep('calculation','scalar','Scalar values implement C*epsilon/r.',[lines(C,153,160)],'implementation')
    dep('calculation','canonical-row','Ledger is reconstructed from canonical acceleration coefficient.',[lines(C,232,256),lines(D,48,60)],'implementation')
    dep('calculation','numerical-spec','Declared parameters, root solve and stencils determine this experiment.',[lines(C,124,194),lines(C,240,265)],'implementation')
    dep('calculation','reference','Calls reference verifier and consumes circular separation and transmitter factor.',[lines(C,216,235)],'implementation')
    edge('verifies','calculation','identity','verification-target','Tests numerical implementation of the equality on its circular control; does not prove the theorem.',[lines(C,232,256),lines(D,501,503)])
    dep('reference','canonical-row','Reference evaluates the same canonical model through separately coded roots.',[lines(R,205,242)],'implementation-premise')
    dep('reference','reference-inputs','Circular request supplies reference history, geometry, root bracket and coupling.',[lines(R,548,590)],'implementation-input')
    dep('calculation','reference-inputs','Comparison requires subject and reference circular configurations to correspond; this is a reviewed comparison requirement, not a source import.',[lines(C,10,30),lines(C,216,235),lines(R,548,579)],'comparison-requirement')
    dep('reference','constraint','Bracketed root solves causal residual.',[lines(R,117,169)],'implementation-premise')
    dep('measured-prose','calculation','The measured clause reports this calculation; original generating run remains unresolved.',[lines(M,1622,1622),lines(D,501,503)],'reporting-provenance')
    dep('scientific-check','calculation','Test imports and executes this verifier.',[lines(T,4,9)],'implementation')
    edge('checks','scientific-check','calculation','numerical-coverage','Checks returned residual thresholds and controls on one declared circular experiment.',[whole(T)])
    edge('checks','scientific-check','identity','bounded-verification','Numerical implementation evidence only; no equation text read or proof.',[lines(T,26,29),lines(D,503,503)])
    edge('checks','prose-check','measured-prose','record-accuracy','Reads one unique displayed maximum; never delegated to existing numerical test.',[whole('result_record_check.py')])
    edge('checks','prose-check','output','comparison-input','Compares display against maximumAbsoluteResidualAcrossRows of the corresponding run.',[whole('result_record_check.py')])
    edge('usesInput','run','calculation','execution-input','Receipt binds actual calculation bytes.',[whole('execution.json')])
    edge('usesInput','run','reference','execution-input','Receipt binds unchanged imported reference.',[whole('execution.json')])
    edge('usesInput','run','scientific-check','execution-input','Receipt also records existing test execution.',[whole('execution.json')])
    edge('usesInput','run','environment','execution-input','Receipt records observed runtime metadata digest.',[whole('execution.json')])
    edge('generatedBy','output','run','generation','Output belongs to this new observed run, not a historical accepted activity.',[whole('execution.json')])
    doc={'@context':p.CONTEXT,'schemaVersion':'corrected-candidate/v1','scope':'moving-single-root-only','approval':'not-granted','sourceCommit':commit,'@graph':rows}
    p.validate(files,doc)
    (root/'candidate.jsonld').write_bytes(p.pack(doc))
    (root/'source-manifest.json').write_bytes(p.pack({'commit':commit,'files':{k:p.sha(v) for k,v in files.items()},'protectedBefore':before,'candidateSha256':p.sha(p.pack(doc))}))
    cases={'unchanged':(files,doc)}
    changed=dict(files);changed[M]=changed[M].replace(b'The sign $\\epsilon_b=\\operatorname{sgn}(D_b)$ is constant',b'The sign $\\epsilon_b=\\operatorname{sgn}(D_b)$ is variable');assert changed[M]!=files[M]
    cases['stale-sign']=(changed,doc);cases['changed-sign']=(changed,p.refresh(changed,doc))
    def without(identifier):
        d=copy.deepcopy(doc);d['@graph']=[r for r in d['@graph'] if r['@id']!=p.NS+identifier];return d
    cases['deleted-proof-sign']=(files,without('dependsOn-proof-sign'))
    cases['deleted-prose-coverage']=(files,without('checks-prose-check-measured-prose'))
    d=without('dependsOn-scalar-definitions')
    e=copy.deepcopy(next(r for r in doc['@graph'] if r['@id']==p.NS+'dependsOn-scalar-definitions'))
    e['@id']=p.NS+'dependsOn-scalar-root-derivative';e['toObject']=objects['root-derivative']['@id'];e['toRevision']=objects['root-derivative']['revisionId'];e['meaning']='Controlled unsupported edge substitution, not proposed scientific relationship.';d['@graph'].append(e)
    cases['changed-scalar-edge']=(files,d)
    wrong=dict(files);wrong[M]=wrong[M].replace(sentence.encode(),sentence.replace('2.12','9.99').encode())
    # Exact literal selector changes are themselves reviewed candidate metadata.
    d=copy.deepcopy(doc)
    for o in d['@graph']:
        if o.get('alias')=='measured-prose':o['sourceBindings'][0]['selector']['text']=sentence.replace('2.12','9.99')
    cases['wrong-displayed-result']=(wrong,p.refresh(wrong,d))
    # Duplicate display deliberately defeats the literal selector; expected fail closed below.
    duplicate=dict(files);duplicate[M]+=b'\n'+sentence.encode()+b'\n'
    cases['duplicate-displayed-result']=(duplicate,doc)
    comment=dict(files);comment[M]+=b'\n<!-- candidate-only editorial control -->\n'
    cases['outside-selector-comment']=(comment,doc)
    outcomes={}
    for name,(f,d) in cases.items():
        folder=root/'cases'/name;folder.mkdir(parents=True)
        (folder/'candidate.jsonld').write_bytes(p.pack(d))
        for path in manifest['files']:
            dst=folder/path;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(f[path])
        expected=expectations[name]
        try:out=p.compare(files,doc,f,d)
        except ValueError as exc:out={'consistency':'reject','reason':str(exc),'approval':'not-granted'}
        if name in ['stale-sign','duplicate-displayed-result']:
            assert out['consistency']=='reject';out['scientificCheck']='not-run-after-binding-rejection'
            if name=='duplicate-displayed-result':
                try:rc.compare(f[M].decode(),numerical)
                except ValueError:out['proseComparison']='reject'
                else:raise AssertionError('Duplicate accepted')
        else:
            assert out['review']==expected['review'];assert out['selectedChecks']==expected['selectedChecks'],(name,out['selectedChecks'])
            assert set(expected.get('contains',[]))<=set(out['affected']),(name,out['affected'])
            # Execute unchanged controls on every consistent isolated source copy and use that case's actual output.
            actual,receipt=execute(folder,name);out['executionReceipts']=receipt;out['scientificCheck']='pass'
            result=rc.compare(f[M].decode(),actual);out['proseComparison']=result
            out['proseComparisonReceipt']={'checkerSha256':p.sha(files['result_record_check.py']),'proseSha256':p.sha(f[M]),'caseOutputSha256':receipt[0]['stdoutSha256'],'comparisonSha256':p.sha(p.pack(result)),'authority':'observed isolated comparison; not authenticated receipt'}
            assert result['status']==expected.get('result','pass'),name
        out['expectedOutcomeMatched']=True;outcomes[name]=out
    after={path:p.sha((repo/path).read_bytes()) for path in before};assert before==after
    result={'status':'candidate-tested-not-approved','candidateSha256':p.sha(p.pack(doc)),'objects':len(objects),'relationships':len(rows)-len(objects),'outcomes':outcomes,'protectedUnchanged':before==after,'instrumentDigests':{name:p.sha((Path(__file__).parent/name).read_bytes()) for name in ['candidate_reader.py','result_record_check.py','run_candidate.py']},'environment':env,'nonclaims':['dependency completeness','trusted approval','production schema','scientific proof by traversal','historical run authentication']}
    (root/'outcomes.json').write_bytes(p.pack(result));print('PASS corrected candidate: '+str(len(outcomes))+' controlled outcomes; immutable sources/reference/pilot evidence',flush=True)
if __name__=='__main__':run()
