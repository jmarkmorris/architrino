"""Independent exact restriction check, preserving parent failed horizon."""
import argparse,hashlib,json
from pathlib import Path
from fractions import Fraction as Q
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def check_rows(parent,child,H):
    left=Q(0);want=[]
    for row in parent:
        right=Q(row['t']);assert right>left
        if left<H:
            out={**row,'t':str(min(H,right))};want.append((out,left,right))
        left=right
    assert H<=left and len(want)==len(child)
    for (a,l,r),b in zip(want,child):
        assert Q(a['t'])==Q(b['t'])
        for k,v in a.items():
            if k!='t':assert b[k]==v,'changed inherited bound '+k
        z=b['restriction'];assert Q(z['parentCellLeft'])==l and Q(z['parentCellRight'])==r and z['boundsUnchanged'] is True
    assert Q(child[-1]['t'])==H

def known():
    p=[dict(t='1',x='.1'),dict(t='2',x='.2')]
    c=[dict(**p[0],restriction=dict(parentCellLeft='0',parentCellRight='1',boundsUnchanged=True)),dict(t='3/2',x='.2',restriction=dict(parentCellLeft='1',parentCellRight='2',boundsUnchanged=True))]
    check_rows(p,c,Q('3/2'))
    bad=json.loads(json.dumps(c));bad[1]['x']='.1'
    try:check_rows(p,bad,Q('3/2'))
    except AssertionError:pass
    else:raise AssertionError('changed bound accepted')
    return {'passed':True,'cases':['exact interior restriction','whole bound unchanged','changed bound rejected']}
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--subject');p.add_argument('--output',required=True);a=p.parse_args();out={'known':known()};print(json.dumps(out),flush=True)
    if a.subject:
        c=json.loads(Path(a.subject).read_text());z=c['restriction'];parent=z['parentResult'];s=json.loads(Path(parent).read_text());review=json.loads(Path(z['assessment']).read_text())
        assert review['acceptedPrefix'] and c['firstFailure'] is None and z['inheritedFailure']==s['firstFailure'] and z['parentRequestedHorizon']==s['horizon']
        assert sha(parent)==z['parentResultSHA']==review['subjectSHA'] and sha(parent+'.jsonl')==z['parentRowsSHA']==review['rowsSHA'] and sha(z['assessment'])==z['assessmentSHA']
        assert c['inputSHA']==s['inputSHA']==review['inputSHA']==sha(c['input'])
        pr=list(map(json.loads,Path(parent+'.jsonl').read_text().splitlines()));cr=list(map(json.loads,Path(a.subject+'.jsonl').read_text().splitlines()));check_rows(pr,cr,Q(c['horizon']))
        assert len(cr)==c['bins'] and Q(c['final']['t'])==Q(c['horizon']);out['target']={'accepted':True,'subject':a.subject,'sha256':sha(a.subject),'rowsSHA':sha(a.subject+'.jsonl'),'horizon':c['horizon'],'bins':len(cr),'scope':'unchanged independently accepted completed prefix; inherited extension failure'}
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
