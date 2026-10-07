"""Independent exact rational inequalities for the optional initial rotation."""
from fractions import Fraction as Q
from pathlib import Path
import json,hashlib
assert Q('1.25')**2==Q(25,16)
assert Q(3,2)**2<3<Q(7,4)**2
print('Known decimal and squared-bracket controls passed before target.',flush=True)
r=Q('2.559210616145');lo=Q('2.55921061613');eps=Q('0.0001');c=r*eps*Q(13,10)
base=Q('0.000176960670384');sqlo=Q('2.5592106107');tilt=Q('0.000000005406333')
assert Q(153,320)*r*r*eps*eps<base*base
assert sqlo*sqlo<lo*lo-c*c/4
assert c*c/(4*(lo+sqlo))<tilt
initial=Q('0.000176966092');assert base+tilt+Q('0.000000000015')<initial
lower=['.0003691085315','.0005162529406','.0008962742090'];budgets=['.0000151763','.00016232075','.00054234202']
assert all(Q(l)-2*initial>Q(b) for l,b in zip(lower,budgets))
result={'passed':True,'knownFirst':True,'instrumentSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'initialUpper':str(initial),'times':[10,12,15],'budgets':budgets,'scope':'exact inequalities for geometric comparison only'}
p=Path('.local-data/master-equation-closure/braid-program/authorized-cases-ten-hour/reference/e-tilt-check-v1.json');assert not p.exists();p.write_text(json.dumps(result,indent=2));print(json.dumps(result))
