"""Read coefficient histories; extract stable gaps and interpolated events."""
import hashlib
import json
import os
from pathlib import Path
import sys

import numpy as np
from scipy.interpolate import CubicHermiteSpline
from scipy.optimize import brentq, minimize_scalar

ROOT=Path(__file__).resolve().parents[4]
HERE=ROOT/'.local-data/master-equation-closure/later-motion'
HERE.mkdir(parents=True,exist_ok=True)
os.environ.setdefault('MPLCONFIGDIR',str(ROOT/'.tmp/mec-008-later-continuation/mpl'))
os.environ.setdefault('XDG_CACHE_HOME',str(ROOT/'.tmp/mec-008-later-continuation/cache'))


def sha():return hashlib.sha256(Path(__file__).read_bytes()).hexdigest()


def known():
    t=np.array([0.,1.,2.]);q=CubicHermiteSpline(t,t**3,3*t*t)
    assert abs(q(.37)-.37**3)<1e-15
    assert abs(q(.37,1)-3*.37**2)<1e-15
    assert abs(brentq(lambda x:x-.37,0,1)-.37)<1e-14
    opt=minimize_scalar(lambda x:(x-.37)**2,bounds=(0,1),method='bounded')
    assert abs(opt.x-.37)<1e-12
    # Norm increment calculated without subtracting two nearby unit numbers.
    delta=np.array([3e-12,4e-6,0.])
    e=np.array([1.,0.,0.]);q=2*e@delta+delta@delta
    inc=q/(np.sqrt(1+q)+1)
    assert abs(inc-11e-12)<1e-21
    report={'result':'PASS','script_sha256':sha(),'controls':['cubic Hermite polynomial','known linear root','known quadratic minimum','stable small gap increment']}
    (HERE/'analyze-known.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps(report))


def target(filename):
    known=json.loads((HERE/'analyze-known.json').read_text());assert known['result']=='PASS'
    data=np.load(HERE/filename)
    t=data['t'];sites=data['sites'];Y=data['Y'];V=data['V']
    idx={tuple(p):i for i,p in enumerate(sites)}
    j=idx[(1,0,0)]
    # Curves from each coefficient, with no cancellation against unit anchors.
    z=CubicHermiteSpline(t,Y[:,j,0,2],V[:,j,0,2])
    x=CubicHermiteSpline(t,Y[:,j,1,0],V[:,j,1,0])
    turns={}
    for name,q in [('z_linear',z),('x_quadratic',x)]:
        roots=[]
        for a,b in zip(t[:-1],t[1:]):
            if a<1.05:continue
            if q(a,1)*q(b,1)<0:
                rt=brentq(lambda s:q(s,1),a,b,xtol=1e-14)
                roots.append({'time':float(rt),'value':float(q(rt))})
        turns[name]=roots
    gaps={};gap_samples={}
    for name,site in [('outward',(2,0,0)),('upward',(1,0,1))]:
        k=idx[site];direction=sites[k]-sites[j]
        dY=np.sum(Y[:,k]-Y[:,j],axis=1);dV=np.sum(V[:,k]-V[:,j],axis=1)
        curve=CubicHermiteSpline(t,dY,dV)
        def increment(s):
            delta=curve(s);q=2*np.sum(direction*delta,axis=-1)+np.sum(delta*delta,axis=-1)
            return q/(np.sqrt(1+q)+1)
        values=increment(t)
        gap_samples[name]=values
        kmin=np.argmin(values)
        if kmin==0:tm=t[0]
        elif kmin==len(t)-1:tm=t[-1]
        else:tm=minimize_scalar(increment,bounds=(t[kmin-1],t[kmin+1]),method='bounded',options={'xatol':1e-14}).x
        gaps[name]={'minimum_time':float(tm),'minimum_gap_minus_one':float(increment(tm)),'end_gap_minus_one':float(increment(t[-1]))}
    parent=json.loads((ROOT/'.local-data/master-equation-closure/later-motion/leading/result.json').read_text())
    discrepancies=[]
    for q in parent['samples']:
        tt=float(q['t']);discrepancies.append({'time':tt,'z_error':float(z(tt)-float(q['height'])),'vz_error':float(z(tt,1)-float(q['velocity']))})
    # Frozen early second-order polynomial is an independent analytical target.
    import mpmath as mp
    mp.mp.dps=60
    raw=json.loads((ROOT/'.tmp/mec-008-signed-error/target-polynomials.json').read_text())
    def poly(coeff,u,order=0):
        decoded=[mp.mpf(a)+mp.sqrt(2)*mp.mpf(b) for a,b in coeff]
        for _ in range(order):decoded=[i*v for i,v in enumerate(decoded)][1:]
        return mp.polyval(list(reversed(decoded)),u)
    u=mp.mpf(3)/25;tt=float(mp.sqrt(2)-mp.mpf(3)/8+u)
    early={'time':tt,'x_difference':float(x(tt)-float(poly(raw['quadratic'][0],u))),'vx_difference':float(x(tt,1)-float(poly(raw['quadratic'][0],u,1)))}
    result={'grade':'measured coefficient comparison; interpolated extrema and approximate gaps, no finite-amplitude certificate','input':filename,'turns':turns,'gaps':gaps,'independent_first_order_discrepancies':discrepancies,'frozen_early_quadratic_comparison':early,'script_sha256':sha(),'known_receipt':known}
    name=filename.replace('.npz','-analysis.json')
    (HERE/name).write_text(json.dumps(result,indent=2)+'\n')
    draw(t,z,x,turns,gaps,gap_samples,filename)
    print(json.dumps(result,indent=2))


def draw(t,z,x,turns,gaps,gap_samples,filename):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'axes.spines.top':False,'axes.spines.right':False,'axes.labelcolor':'#20313b','text.color':'#20313b','axes.edgecolor':'#b6c1c7','xtick.color':'#445860','ytick.color':'#445860'})
    fig,axs=plt.subplots(2,2,figsize=(14,9.4),dpi=160)
    fig.patch.set_facecolor('#f6f5f0')
    fig.subplots_adjust(left=.075,right=.97,top=.835,bottom=.16,hspace=.43,wspace=.28)
    fig.text(.075,.955,'Later motion of the targets and their neighbors',fontsize=22,weight='bold')
    fig.text(.075,.916,'Analytical amplitude comparison  |  g = 16  |  wake speed = 1  |  208 stored coefficient histories',fontsize=11.5)
    fig.text(.075,.883,'Common height reverses repeatedly; the curves do not establish eventual ringing down.',fontsize=12.5)
    blue='#226c99';orange='#bf5a28';purple='#78529d';green='#2d7a66'
    for ax in axs.flat:
        ax.set_facecolor('#ffffff');ax.grid(alpha=.22,color='#adb6bc');ax.axhline(0,color='#81929a',lw=.8)
        ax.set_xlabel(r'Time $t=T/\ell$')
    ax=axs[0,0]
    ax.plot(t,z(t)*1e6,color=blue,lw=2.3);ax.set_xlim(.95,2);ax.set_ylim(-1.0,5.6)
    ax.set_title('A  ·  Common height of both targets',loc='left',weight='bold',pad=13)
    ax.set_ylabel(r'Height ($10^{-6}\ell$)')
    offsets=[(-68,16),(-68,35),(-100,22)]
    for row,offset in zip(turns['z_linear'],offsets):
        tt=row['time'];yy=row['value']*1e6
        ax.scatter([tt],[yy],s=30,color=orange,zorder=5)
        ax.annotate(f'{yy:+.3f} at t={tt:.3f}',(tt,yy),xytext=offset,textcoords='offset points',fontsize=9.5,color=orange,bbox={'facecolor':'white','edgecolor':'none','alpha':.85,'pad':2},arrowprops={'arrowstyle':'-','color':orange,'lw':.6})
    ax=axs[0,1]
    ax.plot(t,2*x(t)*1e9,color=purple,lw=2.3);ax.set_xlim(.95,2)
    ax.set_title('B  ·  Target separation change',loc='left',weight='bold',pad=13)
    ax.set_ylabel(r'Separation minus $\ell$ ($10^{-9}\ell$)')
    ax.text(.04,.93,'The earlier tiny approach is below this scale.',transform=ax.transAxes,fontsize=9.5,va='top')
    for ax,name,color,title,scale,unit in [(axs[1,0],'outward',green,'C  ·  Gap to the outward neighbor',1e12,r'$10^{-12}\ell$'),(axs[1,1],'upward',orange,'D  ·  Gap to the upward neighbor',1e6,r'$10^{-6}\ell$')]:
        ax.plot(t,gap_samples[name]*scale,color=color,lw=2.3);ax.set_xlim(0,2)
        ax.set_title(title,loc='left',weight='bold',pad=13)
        ax.set_ylabel('Gap minus '+r'$\ell$'+' ('+unit+')')
        tm=gaps[name]['minimum_time'];ym=gaps[name]['minimum_gap_minus_one']*scale
        ax.scatter([tm],[ym],s=28,color=color,zorder=5)
        ax.annotate(f'Minimum {ym:.3f}\nat t={tm:.3f}',(tm,ym),xytext=(-104,24),textcoords='offset points',fontsize=9.5,color=color,arrowprops={'arrowstyle':'-','color':color,'lw':.6})
        ax.text(.035,.93 if name=='outward' else .70,'Positive: farther apart\nNegative: closer together',transform=ax.transAxes,fontsize=9,va='top',color='#586a72')
    fig.text(.075,.088,'Each neighbor gap uses both particles at the same time. The initial gap is one lattice spacing; vertical scales differ.',fontsize=10.5)
    fig.text(.075,.057,'First and second amplitude coefficients, dt = 1/2048. No finite-amplitude error bands are established here.',fontsize=10.5)
    fig.text(.075,.026,'Prescribed historical preparation. This is a mathematical comparison, not an EOM solver simulation.',fontsize=10.5)
    paths=[]
    for ext in ['png','svg']:
        path=HERE/('later-motion.'+ext);fig.savefig(path,facecolor=fig.get_facecolor());paths.append(path)
    plt.close(fig)
    report={'result':'rendered; visual inspection required','source_npz':filename,'script_sha256':sha(),'outputs':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in paths}}
    (HERE/'plot-receipt.json').write_text(json.dumps(report,indent=2)+'\n')


if __name__=='__main__':
    if sys.argv[1]=='known':known()
    else:target(sys.argv[2])
