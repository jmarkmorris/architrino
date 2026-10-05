"""Known-first exact prefix transport of accepted min inventory + extension."""
import argparse,importlib.util,json
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-composition-check.py');s=importlib.util.spec_from_file_location('frozen',p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();o={'known':m.known()};print(json.dumps(o),flush=True)
    if a.receipt:
        r=json.loads(Path(a.receipt).read_text());t=r['prefixTransport'];assert m.sha(r['input'])==r['inputSHA'] and m.sha(t['oldInput'])==t['oldInputSHA']
        for key in ['oldSpec','oldCells','newSpec','newCells']:assert m.sha(t[key])==t[key+'SHA']
        old=json.loads(Path(t['oldSpec']).read_text());new,nx,nc=m.joined(t['newSpec']);ox=m.rows(t['oldCells']);assert old['inputSHA']==t['oldInputSHA'] and new['inputSHA']==r['inputSHA'] and old['law']==new['law']==r['law']
        assert Q(old['end'])==Q(new['start'])==Q(t['seam']);m.coverage(ox,old['start'],old['end']);assert nx==m.rows(t['newCells'])
        rows=m.rows(a.receipt+'.jsonl');assert rows==ox+nx and m.coverage(rows,r['start'],r['end'])==r['cells']
        for x in rows:
            assert Q(x['bound'])>=0
            # Min cells inherit independently assessed input geometry from producers;
            # extension cells retain explicit uniform root boxes.
            if 'R' in x:assert Q(x['R']['lo'])>0 and Q(x['D']['lo'])>0 and Q(m.source(x)['hi'])<Q(x['left'])
        assert t['completePastSpecificationIdentical'] and t['identicalKnots']==10081
        o['target']={'accepted':True,'receipt':a.receipt,'sha256':m.sha(a.receipt),'rowsSHA':m.sha(a.receipt+'.jsonl'),'cells':len(rows),'oldCells':len(ox),'extensionCounts':nc,'end':r['end'],'scope':'exact accepted minimum-prefix plus accepted extension; independently checked completepast/10081jet identity and producer mathematics are separate premises, no trajectory'}
    Path(a.output).write_text(json.dumps(o,indent=2)+'\n');print(json.dumps(o),flush=True)
