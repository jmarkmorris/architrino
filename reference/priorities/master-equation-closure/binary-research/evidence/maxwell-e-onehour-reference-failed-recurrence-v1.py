"""Independent arithmetic audit of a literal failed-trial recurrence receipt.

Uses the immutable separately authored recurrence reference, never subject code.
Reported derivative families remain inputs: their mathematical/domain admission
and the independent raw-knot geometry audit are separate obligations.
"""
import argparse, importlib.util, json
from fractions import Fraction as Q
from pathlib import Path

p = Path(__file__).with_name('maxwell-e-first-event-neutral-integrated-radius-reference.py')
s = importlib.util.spec_from_file_location('immutable_recurrence', p)
x = importlib.util.module_from_spec(s)
s.loader.exec_module(x)

def known():
    inherited = x.known()
    assert max(Q(1), Q(2)) * Q('3/2') == 3
    assert max(Q(1), Q('1/2')) * Q('3/2') == Q('3/2')
    assert all(a < b for a,b in [(Q(1),Q(2)),(Q(2),Q(3)),(Q(3),Q(4))])
    assert not all(a < b for a,b in [(Q(1),Q(1)),(Q(2),Q(3)),(Q(3),Q(4))])
    return dict(passed=True, inherited=inherited, cases=['metric rise and fall', 'strict equality rejected'])

def audit(path):
    z=json.loads(Path(path).read_text()); old=json.loads(Path(z['oldReceipt']).read_text())
    assert x.sha(z['oldReceipt'])==z['oldReceiptSHA'] and x.sha(z['oldReceipt']+'.jsonl')==z['oldRowsSHA']
    rows=list(map(json.loads,Path(z['oldReceipt']+'.jsonl').read_text().splitlines()))
    assert z['trial']==old['failure']['candidate'] and z['passed'] and z['failure'] is None
    assert x.sha(old['input'])==old['inputSHA']==z['inputSHA']
    assert x.sha(old['defects'])==old['defectSHA']
    a=z['recurrence']; trial=z['trial']; prev=rows[-1]
    for key in ['r','W','Wend','nu','angularPrefix']: assert Q(a['prior'][key])==Q(prev[key])
    nu=Q(a['nu']); dt=Q(trial['right'])-Q(trial['left'])
    assert Q(prev['t'])==Q(trial['left']) and dt==Q(a['dt']) and nu==Q(trial['nu'])
    w0=Q(prev['Wend'])*max(Q(1),nu/Q(prev['nu'])); assert w0==Q(a['previousW'])
    defects=list(map(json.loads,Path(old['defects']).read_text().splitlines()))
    delta=[Q(d['bound']) for d in defects if Q(d['left'])<=Q(trial['left']) and Q(d['right'])>=Q(trial['right'])]
    assert len(delta)==1 and delta[0]==Q(a['delta'])
    src={k:Q(v) for k,v in z['physical']['sourceIntrinsic']}; geo=list(map(Q,z['physical']['sourceGeometry'])); psi=Q(z['physical']['psi'])
    c=z['nominal']['coefficients']; block=a['block']; bounds={**c,'Pc':block['Pc']}
    ra,rc,bc=map(Q,[z['receiving'][k] for k in ['rMin','rc','bc']])
    terms=x.base.terms(bounds,[src[k] for k in ['r','u','a']],geo,psi,a['delta'],bc,ra,rc)
    assert terms['fq']==Q(a['oldForcing']['fq']) and terms['fH']==Q(a['oldForcing']['fH'])
    def packet(k):
        value=a['components'][k]
        return {**value,'columns':value['cols']}
    fq,qparts=x.projected_packet(packet('q'),src,geo,psi,Q(0),Q(c['Cq']),terms['fq'])
    fh,_=x.projected_packet(packet('H'),src,geo,psi,Q(a['delta']),Q(c['CH']),terms['fH'])
    matrix=[list(map(x.B,row)) for row in block['M']]; sym=[list(map(x.B,row)) for row in block['S']]
    for i in range(3):
        for j in range(3): x.enclose(sym[i][j],x.div(x.add(matrix[i][j],matrix[j][i]),(Q(2),Q(2))))
    midpoint=[[(lo+hi)/2 for lo,hi in row] for row in sym]; log=a['lognorm']
    assert midpoint==[list(map(Q,row)) for row in log['midpoint']]
    alpha=Q(log['alpha']); minors=x.minors([[alpha-v if i==j else -v for j,v in enumerate(row)] for i,row in enumerate(midpoint)])
    assert minors==list(map(Q,log['minors'])) and min(minors)>=0
    radius=Q(log['radius']); assert radius>=x.sqrtupper(sum(((hi-lo)/2)**2 for row in sym for lo,hi in row))
    mu=alpha+radius; assert mu==Q(log['mu'])
    forcing=Q(a['forcing']); assert forcing>=x.sqrtupper((nu*fq)**2+(fh+(Q(c['UH'])+Q(block['Pc'])/ra)*fq)**2)
    E,P=map(Q,[a['E'],a['P']]); exp=x.iv.exp(x.IQ(mu)*x.IQ(dt)); assert x.IQ(E).a>=exp.b
    assert (P>=dt) if mu==0 else (x.IQ(P).a>=((exp-1)/x.IQ(mu)).b)
    W=max(Q(1),E)*w0+P*forcing; Wend=E*w0+P*forcing
    assert W==Q(a['W']) and Wend==Q(a['Wend'])
    ir=a['radius']; qr=max(abs(v) for v in x.B(block['Qcol'][0])); den=1-dt*qr
    assert den>0 and den==Q(ir['denominator']) and qr==Q(ir['Qr'])
    assert Q(ir['previous'])==Q(prev['r']) and Q(ir['W'])==W and Q(ir['nu'])==nu and Q(ir['dt'])==dt and Q(ir['fqr'])==qparts[0]
    integ=(Q(prev['r'])+dt*(W+qparts[0]))/den; norm=W/nu; R=min(integ,norm)
    assert integ==Q(ir['integral']) and norm==Q(ir['norm']) and R==Q(ir['bound'])==Q(a['R'])
    U=W+Q(c['Cq'])*R+fq; assert U==Q(a['U'])
    e=z['originalE']['coefficients']; A=Q(e['Cx'])*(R+src['r']+geo[0]*psi)+Q(e['Hv'])*(src['u']+geo[1]*psi)+Q(e['B'])*(src['a']+geo[2]*psi)+Q(a['delta'])
    assert A==Q(a['A']) and z['originalE']['S']==z['nominal']['C']
    values={'W':W,'R':R,'U':U}; limits={'W':Q(trial['trialW']),'R':Q(trial['trialR']),'U':Q(trial['trialU'])}
    strict={k:values[k]<limits[k] for k in values}; slacks={k:limits[k]-values[k] for k in values}
    assert strict==a['strict'] and all(strict.values())==a['accepted']
    assert slacks=={k:Q(v) for k,v in a['slack'].items()}
    return dict(passed=True,subjectSHA=x.sha(path),refinements=z['refinements'],accepted=all(strict.values()),slacks={k:str(v) for k,v in slacks.items()},scope='independent exact endpoint/metric/defect/forcing, symmetric matrix/lognorm, interval exp/phi, radius/velocity and original E acceleration arithmetic; derivative-family bounds and physical root/history geometry require separate admission; no new propagation row')

if __name__=='__main__':
    p=argparse.ArgumentParser(); p.add_argument('--receipt'); p.add_argument('--output',required=True); a=p.parse_args()
    result={'knownFirst':known()}
    if a.receipt: result['target']=audit(a.receipt)
    with Path(a.output).open('x') as f: json.dump(result,f,indent=2); f.write('\n')
    print(json.dumps(result))
