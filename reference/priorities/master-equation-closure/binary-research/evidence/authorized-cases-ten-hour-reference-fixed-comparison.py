"""Exact independent fixed-case comparison; no subject imports."""
import argparse, hashlib, json
from fractions import Fraction as F
from pathlib import Path

def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def difference(a,b): return F(a)-F(b)
def known():
    assert difference('3/4','1/2') == F(1,4)
    assert difference('0.125','1/8') == 0
    assert difference('1/2','3/4') < 0
    return {'passed':True,'cases':['positive exact reduction','decimal rational equality','negative reduction rejected']}

p=argparse.ArgumentParser(); p.add_argument('--baseline'); p.add_argument('--subject'); p.add_argument('--comparison'); p.add_argument('--known-receipt'); p.add_argument('--out'); a=p.parse_args()
k=known()
if not a.subject:
    print(json.dumps({'knownFirst':k},indent=2)); raise SystemExit
assert json.loads(Path(a.known_receipt).read_text())['knownFirst']['passed']
old=json.loads(Path(a.baseline).read_text()); new=json.loads(Path(a.subject).read_text()); c=json.loads(Path(a.comparison).read_text())
assert c['baselineSHA']==sha(a.baseline) and c['subjectSHA']==sha(a.subject)
assert old['trial']==new['trial']
for field in ['inputSHA','oldReceiptSHA','oldRowsSHA','physicalPrefixEnd']:
    assert old[field]==new[field],field
for field in ['r','W','Wend','nu']:
    assert F(old['recurrence']['prior'][field])==F(new['recurrence']['prior'][field]),field
changes={}
for name,ov,nv,row in [('psi',old['physical']['psi'],new['physical']['psi'],c['psi']),('initialPsi',old['originalActualBracket']['psi'],new['originalActualBracket']['psi'],c['initialPsi'])]+[(f,old['recurrence'][f],new['recurrence'][f],c['bounds'][f]) for f in ['W','R','U','A']]:
    d=difference(ov,nv)
    assert d>0 and F(row['old'])==F(ov) and F(row['current'])==F(nv) and F(row['reduction'])==d,name
    changes[name]={'old':str(F(ov)),'new':str(F(nv)),'reduction':str(d),'approximateReduction':float(d)}
for field in ['W','R','U']:
    o=old['recurrence']['slack'][field]; n=new['recurrence']['slack'][field]
    assert F(n)>F(o)>0 and F(c['slack'][field]['reduction'])==difference(o,n)
assert new['recurrence']['accepted'] and all(new['recurrence']['strict'].values())
out={'passed':True,'knownFirst':k,'subjectSHA':sha(a.subject),'baselineSHA':sha(a.baseline),'sameTrial':True,'samePhysicalPrior':True,'changes':changes,'scope':'exact fixed inputs and strict bound/slack comparison; scientific premises audited separately'}
Path(a.out).write_text(json.dumps(out,indent=2)+'\n'); print(json.dumps({'passed':True,'out':a.out}))
