"""Replay the isolated real-chain pilot; writes only --work-root, never Git."""
import argparse
import copy
import json
from pathlib import Path
import platform
import re
import shutil
import subprocess
import sys
import time
import pilot as p
import rdflib
import pyparsing

MASTER='content/markdown/aaa/dynamics/master-equation.md'
ANALYSIS='reference/priorities/master-equation-closure/analysis/receiver-wake-gradient-closure.md'
CALC='scripts/equation-mapping/verify-moving-single-root-scalar-gradient.mjs'
REF='scripts/equation-mapping/verify-receiver-wake-gradient.mjs'
CHECK='tests/moving-single-root-scalar-gradient-verifier.test.mjs'
HISTORY='reference/priorities/development-process-review/evidence/final-validation/additional-check-results.json'
PATHS=[MASTER,ANALYSIS,CALC,REF,CHECK,HISTORY,'reference/priorities/master-equation-closure/work-log.md']
IDS={'definitions':'corpus-equation-f320108876777c46','root-derivative':'corpus-equation-0d1e584019eb76b1','scalar':'corpus-equation-4c68e6145352e9dc','identity':'corpus-equation-193390fd300cb6a5'}
URIS={x:'https://architrino.com/equation-mapping.html#'+y for x,y in IDS.items()}
URIS.update({x:p.NS+x for x in ['assumptions','derivation','calculation','reference','result','check']})
ALIASES={v:k for k,v in URIS.items()}

def between(start,end):return {'kind':'between','start':start,'end':end}

def make_records(files):
    specs={
        'assumptions':('Assumption',MASTER,between('**Moving-single-root scalar representative','Differentiating the causal constraint')),
        'derivation':('Derivation',ANALYSIS,between('### Moving-Single-Root Scalar-Gradient Theorem','## Partner Root, Same-History Root, And Diagonal Boundary')),
        'calculation':('CalculationSpecification',CALC,{'kind':'whole-file'}),
        'reference':('CalculationSpecification',REF,{'kind':'whole-file'}),
        'check':('CheckObligation',CHECK,{'kind':'whole-file'}),
        'result':('Result',MASTER,between('> Claim grade: derived for the identity on one connected regular moving-simple-root chart','**Finite-ledger scalar-superposition theorem'))}
    for k,occurrence in IDS.items():specs[k]=('EquationOccurrence',MASTER,{'kind':'equation-occurrence','id':occurrence})
    objects={}
    for alias,(kind,path,selector) in specs.items():
        b=p.binding(files,path,selector)
        objects[alias]={'@id':URIS[alias],'@type':kind,'revisionId':'initial-'+b['selectedBytesSha256'][:20],'sourceBinding':b}
    edges=[('definitions','assumptions'),('root-derivative','definitions'),('scalar','root-derivative'),('derivation','scalar'),('identity','derivation'),('calculation','identity'),('calculation','reference'),('result','calculation')]
    rows=list(objects.values())
    for kind,edgeset in [('dependsOn',edges),('checks',[('check','identity'),('check','calculation'),('check','result')])]:
        for a,b in edgeset:
            rows.append({'@id':p.NS+kind+'-'+a+'-'+b,'@type':'Relationship','revisionId':'initial',
                         'kind':p.NS+kind,'fromObject':URIS[a],'fromRevision':objects[a]['revisionId'],
                         'toObject':URIS[b],'toRevision':objects[b]['revisionId'],
                         'justification':copy.deepcopy(objects[a]['sourceBinding'])})
    return {'@context':p.CONTEXT,'schemaVersion':'real-chain-pilot/v1','scopeId':'moving-single-root','@graph':rows}

def result_check(files,actual):
    # A separately specified reporting obligation: the displayed 3-significant-
    # digit maximum must agree with the computed residual within half a unit
    # of its last displayed digit. This is a result-record check, not a proof.
    src=files[MASTER].decode()
    m=re.search(r'Across five step refinements, the largest component residual was \$(\d+\.\d+)\\times10\^\{(-?\d+)\}\$',src)
    if not m:raise ValueError('Recorded result missing/ambiguous syntax')
    shown=float(m[1])*10**int(m[2]);unit=10**(int(m[2])-len(m[1].split('.')[1]))
    return {'status':'pass' if abs(shown-actual)<=unit/2 else 'reject','displayed':shown,'actual':actual,'absoluteTolerance':unit/2}

def run_command(root,args):
    before={path:p.sha((root/path).read_bytes()) for path in [CALC,REF,CHECK]}
    proc=subprocess.run(args,cwd=root,capture_output=True,timeout=45)
    after={path:p.sha((root/path).read_bytes()) for path in [CALC,REF,CHECK]}
    if before!=after:raise AssertionError('Scientific source mutated during execution')
    return proc,{'command':args,'exitCode':proc.returncode,'inputDigests':before,'stdoutSha256':p.sha(proc.stdout),'stderrSha256':p.sha(proc.stderr),'sourceStable':True}

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--repo',required=True);ap.add_argument('--commit',required=True);ap.add_argument('--work-root',required=True);args=ap.parse_args()
    repo=Path(args.repo).resolve();root=Path(args.work_root).resolve()
    if root==repo or repo in root.parents:raise ValueError('Work root must be outside repository')
    root.mkdir(parents=True,exist_ok=True)
    if (root/'baseline').exists():raise ValueError('Refusing to overwrite existing pilot baseline')
    known=p.preflight()
    # Validate reporting instrument against explicitly known 2.12e-12 and wrong value.
    literal={MASTER:b'Across five step refinements, the largest component residual was $2.12\\times10^{-12}$'}
    assert result_check(literal,2.12e-12)['status']=='pass'
    assert result_check(literal,0.5)['status']=='reject'
    (root/'preflight.log').write_text(known+'\nPASS: known recorded result and wrong-result controls\n')
    print(known,flush=True)
    expected=p.strict_json((Path(__file__).parent/'expected.json').read_bytes())
    def git(*a):return subprocess.check_output(['git','-C',str(repo),*a])
    oid=git('rev-parse','--verify','--end-of-options',args.commit+'^{commit}').decode().strip()
    if not re.fullmatch('[0-9a-f]{40}',args.commit) or oid!=args.commit:raise ValueError('Full exact commit required')
    live_before={name:p.sha((repo/name).read_bytes()) for name in PATHS}
    files={name:git('show',oid+':'+name) for name in PATHS}
    baseline=root/'baseline'
    for name,raw in files.items():
        path=baseline/name;path.parent.mkdir(parents=True,exist_ok=True);path.write_bytes(raw)
    doc=make_records(files);p.validate(files,doc)
    (root/'records.jsonld').write_bytes(p.pack(doc))
    (root/'context.json').write_bytes(p.pack(p.CONTEXT))
    # All source snapshots and the newly authored mapping are identified separately.
    manifest={'commit':oid,'approval':'not-established-exploratory','mappingProvenance':'authored during this pilot; not present in historical Git snapshot',
              'files':{name:{'sha256':p.sha(raw),'bytes':len(raw),'gitEntry':git('ls-tree',oid,'--',name).decode().strip()} for name,raw in files.items()},
              'recordsSha256':p.sha(p.pack(doc)),'contextSha256':p.sha(p.pack(p.CONTEXT)),'liveComparedToGit':{name:live_before[name]==p.sha(raw) for name,raw in files.items()}}
    (root/'manifest.json').write_bytes(p.pack(manifest))
    node=shutil.which('node')
    if not node:raise ValueError('Node unavailable')
    calc,calc_receipt=run_command(baseline,[node,CALC])
    test,test_receipt=run_command(baseline,[node,'--test',CHECK])
    for name,data in [('calculation.stdout.json',calc.stdout),('calculation.stderr.log',calc.stderr),('test.stdout.log',test.stdout),('test.stderr.log',test.stderr)]: (root/name).write_bytes(data)
    if calc.returncode or test.returncode:raise AssertionError('Unchanged scientific check failed')
    actual=p.strict_json(calc.stdout)
    assert actual['status']=='verified_regular_only'
    # Independently fixed acceptance thresholds from the pre-existing test contract.
    assert actual['maximumAbsoluteResidualAcrossRows']<=2e-9
    assert actual['negativeControls']['rawInverseSquareScalar']['maximumAbsoluteResidual']>=0.1
    assert actual['negativeControls']['outsideCertifiedChart']['status']=='not_advanced_outside_regular_chart'
    residual=actual['maximumAbsoluteResidualAcrossRows']
    cases={'unchanged':(files,doc)}
    harmless=dict(files);harmless[MASTER]+=b'\n<!-- Isolated pilot: harmless editorial note. -->\n';cases['harmless-prose']=(harmless,doc)
    assumption=dict(files);old=b'a connected receiver chart $U$';new=b'a disconnected receiver chart $U$'
    if assumption[MASTER].count(old)!=1:raise ValueError('Assumption mutation not unique')
    assumption[MASTER]=assumption[MASTER].replace(old,new)
    cases['stale-assumption']=(assumption,doc)
    cases['changed-assumption-refreshed']=(assumption,p.refresh(assumption,doc))
    omit=copy.deepcopy(doc);omit['@graph']=[r for r in omit['@graph'] if r['@id']!=p.NS+'dependsOn-definitions-assumptions'];cases['omitted-relationship']=(files,omit)
    add=copy.deepcopy(doc);new_edge=copy.deepcopy(next(r for r in doc['@graph'] if r['@id']==p.NS+'dependsOn-calculation-identity'))
    ass=next(r for r in doc['@graph'] if r['@id']==URIS['assumptions'])
    new_edge.update({'@id':p.NS+'dependsOn-calculation-assumptions','toObject':URIS['assumptions'],'toRevision':ass['revisionId']});add['@graph'].append(new_edge);cases['added-relationship']=(files,add)
    wrong=dict(files);old=b'largest component residual was $2.12\\times10^{-12}$';new=b'largest component residual was $9.99\\times10^{-12}$'
    if wrong[MASTER].count(old)!=1:raise ValueError('Result mutation not unique')
    wrong[MASTER]=wrong[MASTER].replace(old,new);cases['wrong-recorded-result']=(wrong,p.refresh(wrong,doc))
    coverage=copy.deepcopy(doc);coverage['@graph']=[r for r in coverage['@graph'] if r['@id']!=p.NS+'checks-check-result'];cases['removed-check-coverage']=(files,coverage)
    outcomes={}
    for name,(candidate,records) in cases.items():
        folder=root/'cases'/name;folder.mkdir(parents=True)
        (folder/'records.jsonld').write_bytes(p.pack(records))
        for path,raw in candidate.items():
            if raw!=files[path]:
                target=folder/path;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(raw)
        try:
            result=p.compare(files,doc,candidate,records)
            # Existing scientific controls execute against each candidate copy.
            # Only prose/metadata differ; immutable reference/check bytes retained.
            if name!='unchanged':
                copied=folder/'execution';shutil.copytree(baseline,copied)
                for path,raw in candidate.items():(copied/path).write_bytes(raw)
                execution,receipt=run_command(copied,[node,'--test',CHECK])
                if execution.returncode:raise AssertionError(name+' existing test failed')
                (folder/'test.stdout.log').write_bytes(execution.stdout);(folder/'execution-receipt.json').write_bytes(p.pack(receipt))
            result['executionReceipt']=test_receipt if name=='unchanged' else receipt
            result['existingScientificCheck']='pass'
            result['recordedResultComparison']=result_check(candidate,residual)
            got={'consistency':'pass','reviewStatus':result['reviewStatus'],'affected':sorted(ALIASES[x] for x in result['affectedDeclaredObjects']),'selectedChecks':sorted(ALIASES[x] for x in result['selectedChecks']),'recordedResult':result['recordedResultComparison']['status']}
        except ValueError as error:
            result={'consistency':'reject','reason':str(error),'approval':'not-granted','existingScientificCheck':'not-run'}
            got={'consistency':'reject','reviewStatus':'not-evaluated','affected':None,'selectedChecks':None,'recordedResult':'not-run'}
        assert got==expected[name],(name,got,expected[name])
        result['modeledAByteChangeGate']='review-required' if candidate!=files or p.pack(records)!=p.pack(doc) else 'unchanged'
        result['expectedOutcomeMatched']=True;outcomes[name]=result
    # Confirm source recovery at the named revision independent of scratch copies.
    retrieved=git('show',oid+':'+MASTER)
    assert retrieved==files[MASTER]
    historical_record={'recoveredSourceSha256':p.sha(retrieved),'commit':oid,'graphHistory':'No prior committed B graph exists; mapping is retrospective pilot data'}
    live_after={name:p.sha((repo/name).read_bytes()) for name in PATHS}
    report={'schema':'option-b-real-chain-pilot-report/v1','manifest':manifest,'environment':{'python':sys.version,'node':subprocess.check_output([node,'--version']).decode().strip(),'platform':platform.platform(),'rdflib':rdflib.__version__,'pyparsing':pyparsing.__version__,'rdflibLocation':str(Path(rdflib.__file__).resolve())},
            'instrumentDigests':{n:p.sha((Path(__file__).parent/n).read_bytes()) for n in ['pilot.py','run_pilot.py','expected.json']},
            'baselineScientificExecution':[calc_receipt,test_receipt],'cases':outcomes,'retrieval':historical_record,
            'repositorySourcesStable':live_before==live_after,'liveSourceDigestsBefore':live_before,'liveSourceDigestsAfter':live_after,
            'nonclaims':['production adoption','authenticated baseline approval','semantic dependency completeness','new scientific theorem','global scalar','action/conservation closure']}
    assert report['repositorySourcesStable']
    (root/'report.json').write_bytes(p.pack(report))
    print('PASS: eight fixed expected outcomes; unchanged scientific controls; source preservation',flush=True)

if __name__=='__main__':main()
