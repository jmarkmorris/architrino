"""Measured display projections; never a balance or stability instrument."""
import argparse
import hashlib
import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-exploration/figures'
FREQ = ROOT / 'reference/priorities/master-equation-closure/braid-program/analysis/ring-frequency-table-2026-10-03.json'
INVENTORY = ROOT / 'reference/priorities/master-equation-closure/braid-program/analysis/ring-inventory-ladders-all600-table-2026-10-03.md'
FIGURE = ROOT / 'reference/priorities/master-equation-closure/braid-program/analysis/ring-exploration-summary-2026-10-03.svg'

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def table_rows(source):
    result = []
    for line in source.splitlines():
        if not line.startswith('| '):
            continue
        fields = [x.strip() for x in line.split('|')[1:-1]]
        if len(fields) != 10 or not fields[0].isdigit():
            continue
        result.append(dict(M=int(fields[0]), rung=fields[1], beta=float(fields[2]),
                           R=float(fields[3]), omega=float(fields[4]), period=float(fields[5]),
                           Rv=float(fields[6]), hits=int(fields[7]), self_hits=int(fields[8])))
    return result

def known():
    fixture = '| 2 | T02 | 2 | 0.5 | 4 | 1.5707963267948966 | 1 | 8 | 1 | 0.5 |\n'
    rows = table_rows(fixture)
    assert len(rows) == 1 and rows[0]['omega'] == rows[0]['beta']/rows[0]['R']
    assert rows[0]['Rv'] == rows[0]['R']*rows[0]['beta'] == 1
    assert rows[0]['M'] == 2 and rows[0]['hits'] == 8
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT/'known.json').write_text(json.dumps(dict(passed=True, instrumentSha256=sha(Path(__file__)),
        control='exact circular identity beta=2,R=1/2,omega=4,Rv=1'), indent=2)+'\n')

def target():
    control = json.loads((OUT/'known.json').read_text())
    assert control['passed'] and control['instrumentSha256'] == sha(Path(__file__))
    os.environ['MPLCONFIGDIR'] = str(OUT/'matplotlib-cache')
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    import numpy as np
    data = json.loads(FREQ.read_text())
    assert data['schema'] == 'ring-frequency-arithmetic-projection.v1'
    rows = data['rows']; assert len(rows) == 100
    others = table_rows(INVENTORY.read_text()); assert len(others) == 600
    beta = np.array([float(x['beta']) for x in rows])
    radius = np.array([float(x['radius']) for x in rows])
    omega = np.array([float(x['omega']) for x in rows])
    angular = np.array([float(x['angular_momentum_per_member']) for x in rows])
    assert np.allclose(omega,beta/radius,rtol=1e-13)
    assert np.allclose(angular,beta*radius,rtol=1e-13)
    plt.rcParams.update({'font.size':10,'axes.spines.top':False,'axes.spines.right':False,
                        'svg.fonttype':'none','figure.facecolor':'#fbfbf7','axes.facecolor':'#fbfbf7'})
    fig, ax = plt.subplots(1,3,figsize=(15,4.6),layout='constrained')
    ax[0].loglog(omega,radius,'o',ms=2.8,label='100 exact-reference records')
    ax[0].loglog(omega,np.sqrt(1.5/omega),label='Leading envelope',lw=1.6)
    ax[0].loglog(omega,np.sqrt(1.5/omega)+np.log(2)/(np.pi*omega),label='Next-order envelope',lw=1.6)
    ax[0].set(xlabel='Allowed angular frequency Ω',ylabel='Six-member radius R',title='Discrete loci; envelopes are asymptotic')
    ax[0].legend(fontsize=8)
    ax[1].plot(beta,angular,'o',ms=3,label='Six-member Rv')
    ax[1].axhline(1.5,ls='--',c='#666666',label='Limit 3/2')
    ax[1].set(xlabel='Allowed speed β',ylabel='Angular momentum per member Rv',title='Six-member Rv falls by 15.50%')
    ax[1].legend(fontsize=8)
    for M in (2,4,6,8,10,12,24):
        if M == 6:
            xx=beta; yy=angular/(M*M/24)
        else:
            rr=[r for r in others if r['M']==M]; assert len(rr)==100
            xx=np.array([r['beta'] for r in rr]); yy=np.array([r['Rv'] for r in rr])/(M*M/24)
        ax[2].semilogx(xx,yy,'.-',ms=2,lw=.8,label=f'{M} members')
    ax[2].axhline(1,ls='--',c='#666666')
    ax[2].set(xlabel='Allowed speed β',ylabel='Rv / (M²/24)',title='Other inventories need not fall monotonically')
    ax[2].legend(fontsize=8,ncol=2)
    fig.suptitle('Alternating rings — baseline Master Equation, K = c_f = 1\nAll 700 tabulated references have independently checked growing planar modes',fontsize=13)
    fig.savefig(FIGURE)
    fig.savefig(OUT/'ring-exploration-summary.png',dpi=160)
    plt.close(fig)
    (OUT/'target.json').write_text(json.dumps(dict(passed=True,instrumentSha256=sha(Path(__file__)),
        frequencySha256=sha(FREQ),inventorySha256=sha(INVENTORY),figureSha256=sha(FIGURE),
        grade='measured display projection; no new balance, sign, spectrum or asymptotic proof',
        rows=700,K=1,c_f=1),indent=2)+'\n')

if __name__ == '__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=('known','target'),required=True)
    args=parser.parse_args()
    known() if args.stage=='known' else target()
