"""Independent rational stationary bounds on an auxiliary comparison radius."""
# Versioned execution adaptation, 2026-10-10, of the preserved reference stationary-domain.py (SHA-256 d6585f02272ee58e9febd42bd2c5d9c216dc5eb3243e16e673fda1ab2a2987c9). Function bodies are unchanged; the build driver serial-boundary-reference-build-2026-10-10.py lists every substitution. Not an independently authored reference.
from fractions import Fraction as F
from pathlib import Path
from math import nextafter,inf
import json,sys
HERE=Path('.local-data/master-equation-closure/serial-boundary-reproduction-2026-10-10/reference')

def upper(q):
 x=float(q);return nextafter(x,inf) if F.from_float(x)<q else x

def coefficients(B):
 q=B*B
 return F(65,2)*(6/(1-q)+2*q/(1-q)**2),F(65,2)*(30/(1-q)+22*q/(1-q)**2+4*q*(1+q)/(1-q)**3)

def known():
 assert coefficients(F(0))==(F(195),F(975))
 assert F(3,40)>F(1,16) and F(81,16)-1+F(3,40)+F(1,100)<F(17,4)
 r={'result':'PASS','controls':['exact zero-radius solid-harmonic coefficients','auxiliary radius and source-cut arithmetic']};(HERE/'stationary-domain-known.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r))

def target():
 assert json.loads((HERE/'stationary-domain-known.json').read_text())['result']=='PASS'
 B=F(3,40);c,d=coefficients(B);assert c<197 and d<986
 a=F(143271,10000);out={'result':'PASS','radius':str(B),'C5':upper(c),'CD':upper(d),'stationary_field_cubic_coefficient':upper(a+c*B*B),'stationary_derivative_quadratic_coefficient':upper(3*a+d*B*B),'source_cut':str(F(81,16)-1+B+F(1,100)),'scope':'analytic comparison domain only; original environmental class remains1/16'};(HERE/'stationary-domain-target.json').write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out,indent=2))
known() if sys.argv[1]=='known' else target()
