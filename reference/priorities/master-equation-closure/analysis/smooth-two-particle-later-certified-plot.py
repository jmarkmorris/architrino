"""Render the fixed later-turn certificate inputs; no acceptance authority.

Exact dyadic nodal data define quintic curves. Known polynomial controls run
before the target archive is read. Previous comparison figures stay untouched.
"""
import argparse
from fractions import Fraction
import hashlib
import json
import os
from pathlib import Path

import mpmath as mp
import numpy as np

ROOT=Path(__file__).resolve().parents[4]
OUT=ROOT/'.local-data/master-equation-closure/later-certification/figure'
ARCHIVE=ROOT/'.local-data/master-equation-closure/later-certification/approx/approximant-h1024.npz'
MANIFEST=ARCHIVE.with_suffix('.json')
TURNS=ROOT/'.local-data/master-equation-closure/later-certification/check/turns.json'
ARCHIVE_SHA='1213e65680c1d6753fd74b955013a32582b487593bad8da8dc711924fcc6de08'
TURNS_SHA='65b65db75fd86794694fefa58436aff566ea8371da775472309ef105146606c6'
os.environ.setdefault('MPLCONFIGDIR',str(ROOT/'.tmp/mec-008-later-certification/dahlquist/mpl'))
os.environ.setdefault('XDG_CACHE_HOME',str(ROOT/'.tmp/mec-008-later-certification/dahlquist/cache'))
mp.mp.dps=60


def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()


def coefficients(data,h):
    y0,v0,a0,y1,v1,a1=data
    c0=y0;c1=h*v0;c2=h*h*a0/2
    d=y1-c0-c1-c2;e=h*v1-c1-2*c2;f=h*h*a1-2*c2
    return [c0,c1,c2,10*d-4*e+f/2,-15*d+7*e-f,6*d-3*e+f/2]


def evaluate(c,theta,h,order=0):
    cc=list(c)
    for _ in range(order):cc=[j*x for j,x in enumerate(cc)][1:]
    value=0
    for q in reversed(cc):value=value*theta+q
    return value/h**order


def known():
    h=Fraction(1,8)
    q=[Fraction(v) for v in [1,-2,0,3,-1,2]]
    data=[evaluate(q,t,Fraction(1),order) for t in [Fraction(0),h] for order in range(3)]
    c=coefficients(data,h)
    for order in range(3):
        for u in [Fraction(0),Fraction(1,7),Fraction(1)]:
            assert evaluate(c,u,h,order)==evaluate(q,h*u,Fraction(1),order)
    assert Fraction.from_float(.1)==Fraction(3602879701896397,36028797018963968)
    OUT.mkdir(parents=True,exist_ok=True)
    receipt={'result':'PASS','source_sha256':digest(Path(__file__)),'controls':['exact rational quintic value and first two derivatives at known points','binary64 exact dyadic decoding']}
    (OUT/'known.json').write_text(json.dumps(receipt,indent=2)+'\n')
    print(json.dumps(receipt),flush=True)


def target(assessment):
    checked=json.loads((OUT/'known.json').read_text())
    assert checked['result']=='PASS'
    assert digest(ARCHIVE)==ARCHIVE_SHA and digest(TURNS)==TURNS_SHA
    manifest=json.loads(MANIFEST.read_text());turns=json.loads(TURNS.read_text())
    assert manifest['array_sha256']==turns['archive_sha256']==ARCHIVE_SHA
    residual=Path(turns['residual_receipt'])
    assert digest(residual)==turns['residual_receipt_sha256']
    assert turns['three_consecutive_turns']=='PASS'
    if assessment=='accepted':
        review=ROOT/'reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-certification-independent-adjudication.md'
        text=review.read_text()
        # Explicit opt-in is insufficient without the live final verdict.
        assert 'Final acceptance of the numerical residual certificate is pending' not in text
        assert 'Accepted' in text or 'accepted' in text
    archive=np.load(ARCHIVE)
    assert np.array_equal(archive['receivers'][1],[1,0,0])
    y=archive['receiver_y'][:,1,2];v=archive['receiver_v'][:,1,2];a=archive['receiver_a'][:,1,2]
    assert y.shape==v.shape==a.shape==(2049,)
    h=Fraction(manifest['step_numerator'],manifest['step_denominator'])
    exact=[]
    for k in range(2048):
        data=[Fraction.from_float(float(arr[k+end])) for end in [0,1] for arr in [y,v,a]]
        exact.append(coefficients(data,h))
    coeff=[[mp.mpf(q.numerator)/q.denominator for q in c] for c in exact]
    mh=mp.mpf(h.numerator)/h.denominator
    def val(t,order=0):
        t=mp.mpf(t);j=min(2047,max(0,int(mp.floor(t/mh))))
        return evaluate(coeff[j],(t-j*mh)/mh,mh,order)
    # Dyadic plotting grid evaluates the whole piecewise curve, not an unrelated
    # spline through display samples. MP values become floats only for plotting.
    times=np.arange(16385,dtype=float)/8192
    height=np.array([float(val(t)) for t in times])
    roots=[]
    for turn in turns['turns']:
        lo,hi=map(mp.mpf,turn['time'])
        root=mp.findroot(lambda t:val(t,1),(lo,hi))
        assert lo<root<hi
        roots.append(float(root))
    epos=turns['position_error'];evel=turns['velocity_error']
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'axes.spines.top':False,'axes.spines.right':False,'axes.edgecolor':'#9eafb7','axes.labelcolor':'#243940','text.color':'#243940','xtick.color':'#52676f','ytick.color':'#52676f'})
    fig=plt.figure(figsize=(14,10.5),dpi=160,facecolor='#f5f4ee')
    fig.text(.075,.952,'Three later turns of the two targets',fontsize=24,weight='bold')
    fig.text(.075,.912,'Continuous polynomial with full-law error enclosure  |  g = 16  |  wake speed = 1',fontsize=12)
    main=fig.add_axes([.075,.465,.895,.375],facecolor='white')
    blue='#286c98';orange='#b85e2f';green='#397d69';purple='#815e9c'
    colors=[orange,green,purple]
    main.fill_between(times,(height-epos)*1e6,(height+epos)*1e6,color=blue,alpha=.23,label=r'Position enclosure $\pm0.06$ millionths')
    main.plot(times,height*1e6,color=blue,lw=2.1,label='Central polynomial')
    main.axhline(0,color='#82949b',lw=.8);main.grid(alpha=.2)
    main.set_xlim(0,2.06);main.set_ylim(-.85,5.45)
    main.set_ylabel(r'Common height ($10^{-6}\ell$)');main.set_xlabel(r'Time $t=T/\ell$')
    main.legend(loc='upper left',fontsize=10,frameon=False)
    main.text(.18,.36,'Stationary while the earlier\nwakes travel to the targets',fontsize=10,color='#586d74')
    names=['First peak','Trough','Second peak']
    offsets=[(-55,23),(-93,45),(-112,55)]
    for k,(turn,root,color,offset) in enumerate(zip(turns['turns'],roots,colors,offsets)):
        lo,hi=turn['time'];yy=float(val(root))*1e6
        main.axvspan(lo,hi,color=color,alpha=.35,lw=0)
        main.scatter([root],[yy],s=24,color=color,zorder=5)
        h0,h1=turn['actual_height_range'];low=np.floor(h0*1e9)/1000;high=np.ceil(h1*1e9)/1000
        main.annotate(f'{k+1}  {names[k]}\n[{low:.3f}, {high:.3f}]',(root,yy),xytext=offset,textcoords='offset points',fontsize=10,color=color,ha='left',bbox={'facecolor':'white','edgecolor':'none','alpha':.8,'pad':1.5},arrowprops={'arrowstyle':'-','color':color,'lw':.8})
    fig.text(.075,.377,'Velocity inside each turning window',fontsize=14,weight='bold')
    fig.text(.075,.350,'Opposite endpoint velocity signs and a fixed acceleration sign locate one turn in each shaded window.',fontsize=10.5)
    panel_width=.26
    for k,(turn,color) in enumerate(zip(turns['turns'],colors)):
        left=.075+k*.3175
        ax=fig.add_axes([left,.175,panel_width,.130],facecolor='white')
        lo,hi=turn['time'];pad=(hi-lo)*.35
        ts=np.linspace(lo-pad,hi+pad,321)
        vv=np.array([float(val(t,1)) for t in ts])*1e6
        ax.fill_between(ts,vv-evel*1e6,vv+evel*1e6,color=blue,alpha=.23)
        ax.plot(ts,vv,color=blue,lw=1.6)
        ax.axvspan(lo,hi,color=color,alpha=.18,lw=0);ax.axvline(lo,color=color,lw=.8);ax.axvline(hi,color=color,lw=.8)
        ax.axhline(0,color='#819299',lw=.8);ax.grid(alpha=.17)
        ax.set_xlim(lo-pad,hi+pad)
        ax.set_xticks([lo,hi]);ax.set_xticklabels([f'{lo:.6f}',f'{hi:.6f}'],fontsize=9)
        ax.set_title(f'{k+1}  {names[k]}',loc='left',color=color,weight='bold',fontsize=11,pad=9)
        if k==0:ax.set_ylabel(r'$v_z$ ($10^{-6}c_f$)',fontsize=10)
        ax.text(.5,-.32,f'[{lo:.10f}, {hi:.10f}]',transform=ax.transAxes,ha='center',fontsize=8.7,color=color)
    fig.text(.075,.085,'Fixed supplied history and alternating infinite lattice; no physical length scale is selected. Horizon: 0 ≤ t ≤ 2.',fontsize=10.5)
    fig.text(.075,.055,'Uniform height band: ±6 × 10⁻⁸ lattice spacings. Consecutive-turn sign coverage: 1.25 ≤ t ≤ 2.',fontsize=10.5)
    status='Independent certificate assessment complete.' if assessment=='accepted' else 'Certificate inputs are under independent assessment.'
    fig.text(.075,.025,status+' This finite interval establishes no long-time damping law.',fontsize=10.5)
    outputs={}
    for ext in ['png','svg']:
        path=OUT/('later-certified-height.'+ext);fig.savefig(path,facecolor=fig.get_facecolor());outputs[path.name]=digest(path)
    plt.close(fig)
    receipt={'result':'rendered; visual inspection required','assessment_display':assessment,'known_control':checked,'source_sha256':digest(Path(__file__)),'archive_sha256':digest(ARCHIVE),'turn_receipt_sha256':digest(TURNS),'residual_receipt_sha256':digest(residual),'position_error_used':epos,'velocity_error_used':evel,'curve_domain':[0,2],'turn_sign_domain':turns['covered_time'],'polynomial_peak_times_display_only':roots,'outputs':outputs,'claim_boundary':'Plotting fidelity only; mathematical authority requires independent assessment of the residual and propagation certificates.'}
    (OUT/'receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
    print(json.dumps(receipt,indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('mode',choices=['known','target']);parser.add_argument('--assessment',choices=['pending','accepted'],default='pending')
    args=parser.parse_args();known() if args.mode=='known' else target(args.assessment)
