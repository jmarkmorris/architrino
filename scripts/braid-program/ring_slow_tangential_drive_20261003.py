#!/usr/bin/env python3
"""Smooth external-drive linear modal factors on frozen exact ring witnesses.
An independently formed exponential-antiderivative control runs before
target intervals. No nonlinear forced evolution or conservation claim.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/slow-drive'
mp.mp.dps=110;mp.iv.dps=85
HASHES={2:'3f44600259557b9736b860a904dc986193b7ca21f33cdbbaeb45f8bc0a440c50',
        4:'17b41d073a1aeec059e292b6696ad2fe54c60b27c46d54976848d29062debc4a'}
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def lo(x):return mp.mpf(x._mpi_[0])
def hi(x):return mp.mpf(x._mpi_[1])
def I(x):return mp.iv.mpf(x)
def iv(p,key):return mp.iv.mpf([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][key]])
def enc(x):
    if isinstance(x,dict):return {k:enc(v) for k,v in x.items()}
    if isinstance(x,(list,tuple)):return [enc(v) for v in x]
    if isinstance(x,(str,int,bool)) or x is None:return x
    if hasattr(x,'_mpi_'):return {'display':[mp.nstr(lo(x),60),mp.nstr(hi(x),60)],'binary':[list(t) for t in x._mpi_]}
    return mp.nstr(x,65)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(enc({'stage':stage,'instrumentSha256':sha(Path(__file__)),
        'K':1,'c_f':1,'intervalDps':mp.iv.dps,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'path':str(p.relative_to(ROOT)),'sha256':sha(p)}))
def pulse_transform(z,L,ctx=mp):
    a=2*ctx.pi/L
    return (1-ctx.exp(-z*L))*a*a/(L*z*(z*z+a*a))
def known():
    z=mp.mpf(1);L=mp.mpf(2);a=2*mp.pi/L
    # Direct antiderivatives of exp(-zt) and exp[(-z+ia)t], independently
    # formed before testing the factored real pulse-transform expression.
    constant=(1-mp.exp(-z*L))/z
    oscillatory=((1-mp.exp((-z+mp.j*a)*L))/(z-mp.j*a)).real
    independent=(constant-oscillatory)/L
    got=pulse_transform(z,L)
    error=abs(got-independent);assert error<mp.mpf('1e-105') and independent>0
    area=mp.quad(lambda t:(1-mp.cos(a*t))/L,[0,L/2,L]);assert abs(area-1)<mp.mpf('1e-105')
    # Exact positive polynomial-pulse reference for the same Laplace measure.
    polynomial=mp.quad(lambda t:mp.exp(-t)*6*t*(1-t),[0,1])
    polynomial_exact=6*(3/mp.e-1)
    assert abs(polynomial-polynomial_exact)<mp.mpf('1e-105') and polynomial_exact>0
    save('known',{'passed':True,'directExponentialPrimitiveControl':independent,
                  'factoredPulseTransform':got,'error':error,'unitExternalInputArea':area,
                  'positivePolynomialPulseControl':polynomial_exact})
def target():
    known=json.loads((OUT/'known.json').read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    reports=[]
    for t in [2,4]:
        path=ROOT/f'.local-data/ring-exploration/stability/T{t:02d}-certificate.json'
        assert sha(path)==HASHES[t];p=json.loads(path.read_text());assert p['passed']
        R=iv(p,'/R');witnesses=[]
        for n,row in enumerate(p['positiveRealWitnesses']):
            z0,z1=map(mp.mpf,row['zBracket']);Z=I([z0-mp.mpf('1e-55'),z1+mp.mpf('1e-55')])
            numerator=[iv(p,f'/positiveRealWitnesses/{n}/tangentialKickAdjugateNumerator/{i}') for i in range(2)]
            gp=iv(p,f'/positiveRealWitnesses/{n}/GPrimeOnBracket')
            assert lo(gp)>0 or hi(gp)<0
            assert any(lo(v)>0 or hi(v)<0 for v in numerator)
            residue=[v*R/(Z*gp) for v in numerator]
            durations=[]
            for length in ['0.01','0.1','1','10']:
                L=I(length);transform=pulse_transform(Z,L,mp.iv)
                endpoint=mp.iv.exp(Z*L)*transform
                assert lo(transform)>0 and lo(endpoint)>0
                durations.append({'L':length,'transformPerDeltaV':transform,
                    'endOfPulseTemporalFactorPerDeltaV':endpoint,
                    'endOfPulseTemporalFactorLog10':mp.iv.log(endpoint)/mp.iv.log(10),
                    'postPulseModalVectorPerDeltaV':[v*endpoint for v in residue]})
            witnesses.append({'lambda':Z,'simpleWitness':row['simpleUniqueWithinBracket'],
                              'residueVector':residue,'durations':durations})
        reports.append({'topology':f'T{t:02d}','certificateSha256':sha(path),'witnesses':witnesses})
    save('target',{'passed':True,'reports':reports,
        'grade':'outward linear modal factors conditional on inherited exact reference and simple-pole certificates',
        'nonlinearScope':'no forced finite-amplitude history or chart retention inferred',
        'unknownComplexPoles':'pulse temporal transform has no RHP zeros; excitation also requires nonzero spatial numerator'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    args=p.parse_args();{'known':known,'target':target}[args.stage]()
