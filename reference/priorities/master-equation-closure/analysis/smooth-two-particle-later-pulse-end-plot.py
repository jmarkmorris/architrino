"""Render the fixed pulse-end continuation certificate, without accepting it.

Known polynomial controls precede target access. All earlier figures and all
certificate/approximant inputs are read-only. Floating conversion is for display.
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
BASE=ROOT/'.local-data/master-equation-closure/later-pulse-ends'
OUT=BASE/'figure'
ARCHIVE=BASE/'target-approximant.npz'
CERTIFICATE=BASE/'certificate.json'
ARCHIVE_SHA='e386baec09b4668ad34a24f001aa2755bf08887c72c0623d0eed7a64eab40199'
CERTIFICATE_SHA='5b85ca6db1541fcc16956f3ee6b6780f9612b7d37412e58fa040c21c52c51e3d'
PREFIX=ROOT/'.local-data/master-equation-closure/later-certification/approx/approximant-h1024.npz'
os.environ.setdefault('MPLCONFIGDIR',str(OUT/'mpl'))
os.environ.setdefault('XDG_CACHE_HOME',str(OUT/'cache'))
mp.mp.dps=60


def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()


def coefficients(data,h):
    y0,v0,a0,y1,v1,a1=data
    c0=y0;c1=h*v0;c2=h*h*a0/2
    d=y1-c0-c1-c2;e=h*v1-c1-2*c2;f=h*h*a1-2*c2
    return [c0,c1,c2,10*d-4*e+f/2,-15*d+7*e-f,6*d-3*e+f/2]


def evaluate(c,u,h,order=0):
    cc=list(c)
    for _ in range(order):cc=[i*q for i,q in enumerate(cc)][1:]
    result=0
    for q in reversed(cc):result=result*u+q
    return result/h**order


def known():
    h=Fraction(1,16);q=list(map(Fraction,[2,-1,3,0,-2,1]))
    data=[evaluate(q,t,Fraction(1),d) for t in [Fraction(0),h] for d in range(3)]
    c=coefficients(data,h)
    for d in range(3):
        for u in [Fraction(0),Fraction(2,7),Fraction(1)]:assert evaluate(c,u,h,d)==evaluate(q,u*h,Fraction(1),d)
    assert Fraction.from_float(.1)==Fraction(3602879701896397,36028797018963968)
    # A known endpoint band has strictly positive width around its center.
    center=Fraction(3,2);half=Fraction(1,16)
    assert center-half<Fraction(3,2)<center+half
    OUT.mkdir(parents=True,exist_ok=True)
    receipt={'result':'PASS','source_sha256':digest(Path(__file__)),'controls':['exact dyadic quintic value and first two derivatives','exact binary64 rational conversion','known endpoint band ordering']}
    (OUT/'known.json').write_text(json.dumps(receipt,indent=2)+'\n')
    print(json.dumps(receipt),flush=True)


def target(assessment,review):
    receipt=json.loads((OUT/'known.json').read_text())
    assert receipt['result']=='PASS'
    assert digest(ARCHIVE)==ARCHIVE_SHA and digest(CERTIFICATE)==CERTIFICATE_SHA
    cert=json.loads(CERTIFICATE.read_text())
    assert cert['target_archive_sha256']==ARCHIVE_SHA and cert['horizon']=='259/128'
    assert cert['g']==16 and cert['c_f']==1
    assert digest(PREFIX)==cert['source_archive_sha256']
    prefix_receipt=Path(cert['frozen_prefix_receipt'])
    assert digest(prefix_receipt)==cert['frozen_prefix_receipt_sha256']
    review_hash=None
    if assessment=='accepted':
        assert review is not None,'Accepted display requires the final review path'
        rp=Path(review);rtext=rp.read_text()
        assert 'accepted' in rtext.lower() and len(rtext)>100
        review_hash=digest(rp)
    data=np.load(ARCHIVE);old=np.load(PREFIX)
    arrays=[data[k][:,0,2] for k in ['y','v','a']]
    for k in ['y','v','a']:
        assert data[k].shape==(2073,1,3) and data[k].dtype==np.float64
        assert np.array_equal(data[k][:2049],old['receiver_'+k][:,1:2])
    h=Fraction(1,1024);coeff=[]
    for k in range(2072):
        endpoints=[Fraction.from_float(float(a[k+e])) for e in [0,1] for a in arrays]
        exact=coefficients(endpoints,h)
        coeff.append([mp.mpf(q.numerator)/q.denominator for q in exact])
    mh=mp.mpf(1)/1024;H=mp.mpf(259)/128
    def val(t,d=0):
        t=mp.mpf(t);j=min(2071,max(0,int(mp.floor(t/mh))))
        return evaluate(coeff[j],(t-j*mh)/mh,mh,d)
    center=mp.sqrt(2)+mp.sqrt(3)-mp.mpf(9)/8
    half=mp.mpf(7)/120000
    # Outward binary64 display bounds contain the exact radical interval.
    ends=[np.nextafter(float(center-half),-np.inf),np.nextafter(float(center+half),np.inf)]
    assert mp.mpf(ends[0])<=center-half and mp.mpf(ends[1])>=center+half
    assert 2<ends[0]<ends[1]<float(H)
    times=np.linspace(1.95,float(H),2001)
    heights=np.array([float(val(t)) for t in times])*1e6
    velocities=np.array([float(val(t,1)) for t in times])*1e6
    ep=cert['uniform_error_budgets']['position']*1e6
    ev=cert['uniform_error_budgets']['velocity']*1e6
    assert cert['actual_tail_vertical_velocity'][1]<0
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'axes.spines.top':False,'axes.spines.right':False,'axes.edgecolor':'#a1afb6','axes.labelcolor':'#263940','text.color':'#263940','xtick.color':'#536870','ytick.color':'#536870'})
    fig,axs=plt.subplots(2,1,figsize=(12.8,9.4),dpi=170,sharex=True)
    fig.patch.set_facecolor('#f6f4ee');fig.subplots_adjust(left=.10,right=.96,top=.79,bottom=.20,hspace=.26)
    blue='#256c97';amber='#b66b25';gray='#798d97'
    fig.text(.10,.95,'Motion through the remaining pulse ends',fontsize=22,weight='bold')
    fig.text(.10,.905,'Common target height and vertical velocity  |  g = 16  |  wake speed = 1',fontsize=11.5)
    fig.text(.10,.865,'Pulse-end window: 8 paths per target, 16 directed paths altogether.',fontsize=12,color=amber)
    fig.text(.10,.832,'All remaining endpoints are enclosed in t ∈ [2.021206, 2.021323].',fontsize=10.7,color=amber)
    for ax in axs:
        ax.set_facecolor('white');ax.grid(alpha=.2);ax.axvspan(2,float(H),color=blue,alpha=.035)
        ax.axvline(2,color=gray,ls='--',lw=1.2)
        ax.axvspan(*ends,color=amber,alpha=.32,lw=0)
        ax.axvline(float(H),color=gray,lw=.8)
        ax.set_xlim(1.95,float(H)+.0008)
    ax=axs[0]
    ax.fill_between(times,heights-ep,heights+ep,color=blue,alpha=.23,label=r'Height enclosure $\pm0.06$')
    ax.plot(times,heights,color=blue,lw=2,label='Central polynomial')
    ax.set_ylabel(r'Height ($10^{-6}\ell$)');ax.set_ylim(.87,1.145)
    ax.legend(loc='lower left',fontsize=10,frameon=False)
    ax.text(2,.79,'Prior horizon\n$t=2$',transform=ax.get_xaxis_transform(),ha='center',va='top',fontsize=10,color=gray,bbox={'facecolor':'white','edgecolor':'none','alpha':.85,'pad':2})
    ax.annotate('Remaining pulse-end\nreceptions',xy=(float(center),1.033),xytext=(1.998,1.128),fontsize=10,color=amber,ha='left',arrowprops={'arrowstyle':'->','color':amber,'lw':.9})
    ax.scatter([float(H)],[float(val(H))*1e6],color=blue,s=25,zorder=5)
    ax=axs[1]
    ax.fill_between(times,velocities-ev,velocities+ev,color=blue,alpha=.23,label=r'Velocity enclosure $\pm0.12$')
    ax.plot(times,velocities,color=blue,lw=2)
    ax.axhline(0,color='#697f89',lw=1)
    ax.set_ylabel(r'Vertical velocity ($10^{-6}c_f$)');ax.set_xlabel(r'Time $t=T/\ell$')
    ax.set_ylim(-2.55,max(velocities)+.7)
    ax.legend(loc='upper right',fontsize=10,frameon=False)
    ax.text(.57,.66,'After $t=2$, the entire band\nstays below zero.',transform=ax.transAxes,fontsize=11,color=blue)
    ax.scatter([float(H)],[float(val(H,1))*1e6],color=blue,s=25,zorder=5)
    ax.text(float(H),-.23,r'$H=259/128$',transform=ax.get_xaxis_transform(),ha='right',fontsize=10,color=gray)
    fig.text(.10,.123,'The tail certificate excludes a fourth turn through H. The current downward excursion is unfinished.',fontsize=10.7)
    fig.text(.10,.088,'Identical supplied past and infinite alternating lattice. Continued descent does not establish eventual settling.',fontsize=10.5)
    status='Independent assessment complete.' if assessment=='accepted' else 'New continuation and propagation await independent acceptance.'
    fig.text(.10,.052,status,fontsize=10.5)
    outputs={}
    for ext in ['png','svg']:
        path=OUT/('later-pulse-end-motion.'+ext);fig.savefig(path,facecolor=fig.get_facecolor());outputs[path.name]=digest(path)
    plt.close(fig)
    result={'result':'rendered; visual inspection required','assessment':assessment,'review_sha256':review_hash,'known':receipt,'source_sha256':digest(Path(__file__)),'target_archive_sha256':digest(ARCHIVE),'certificate_sha256':digest(CERTIFICATE),'frozen_prefix_receipt_sha256':digest(prefix_receipt),'unchanged_target_prefix':'binary64 equality on all nodes through2','horizon':'259/128','display_interval':[1.95,float(H)],'pulse_end_enclosure':{'formula':'sqrt(2)+sqrt(3)-9/8 plus or minus7/120000','outward_display_endpoints':ends,'paths_per_target':8,'directed_paths_total':16},'position_error':cert['uniform_error_budgets']['position'],'velocity_error':cert['uniform_error_budgets']['velocity'],'outputs':outputs,'scope':'Plotting fidelity only; new continuation, propagation and tail sign require independent acceptance.'}
    (OUT/'receipt.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('mode',choices=['known','target']);parser.add_argument('--assessment',choices=['pending','accepted'],default='pending');parser.add_argument('--review')
    args=parser.parse_args();known() if args.mode=='known' else target(args.assessment,args.review)
