"""Exact-rational constants for the declared superfield sector, subject-side."""
from fractions import Fraction as Q
from pathlib import Path
import hashlib,json
assert Q(2,3)+Q(1,3)==1
print('Known rational sum passed before target constants',flush=True)
values={
'sine_squared_margin':(1-Q(7,25)**2/6)**2-Q(97,100),
'interpair_coefficient_margin':Q(97,100)*Q(23,20)-1,
'early_gap_upper':Q(4,1025)-Q(1,100),
'self_coefficient_margin':Q(97,100)*Q(21,20)**2-1,
'initial_derivative_upper':1-Q(21,10)*(Q(101,200)-Q(101,200)**3/6),
'final_derivative_lower':2*(2-Q(27,25)*Q(27,20)**2),
'upper_angle':Q(27,25)*Q(27,10)+Q(1,50)}
assert values['sine_squared_margin']>0 and values['interpair_coefficient_margin']>0
assert values['early_gap_upper']<0 and values['self_coefficient_margin']>0
assert values['initial_derivative_upper']<0 and values['final_derivative_lower']==Q(317,5000)>0
assert values['upper_angle']==Q(367,125)<3
result={'passed':True,'known':'2/3+1/3=1','source_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'values':{k:str(v) for k,v in values.items()},'boundary':'Exact arithmetic on stated proof constants; not independent proof adjudication'}
path=Path('.local-data/master-equation-closure/overnight2-c/superfield-constants.json')
assert not path.exists();path.write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result))
