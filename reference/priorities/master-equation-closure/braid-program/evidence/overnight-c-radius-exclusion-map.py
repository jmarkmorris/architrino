"""Illustrate checked radius exclusions; plotted samples are not proof evidence."""
import os
from pathlib import Path
os.environ['MPLCONFIGDIR']=str(Path('.tmp/overnight-c/matplotlib').resolve())
os.environ['XDG_CACHE_HOME']=str(Path('.tmp/overnight-c/cache').resolve())
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from fractions import Fraction as Q


def bound(r,s):
    return 1/s**2-s**2/(2*(s**2+1))+2*s/(s-1)*(1/(r-1)+1/(s-1))


if __name__=='__main__':
    assert abs(bound(11.,11.)-float(-Q(35161,738100)))<1e-14
    assert abs(bound(7.,20.)-float(-Q(6005717,173713200)))<1e-14
    print('Known rational corner controls passed; proceeding to illustration')
    s=np.geomspace(2,70,800);r=np.linspace(1.001,14,500)
    S,R=np.meshgrid(s,r);B=bound(R,S);B=np.ma.masked_where(R>=S,B)
    fig,ax=plt.subplots(figsize=(9,5.3),layout='constrained')
    fig.set_facecolor('#faf9f5');ax.set_facecolor('#efeee9')
    ax.contourf(S,R,B,levels=[-100,0,100],colors=['#72a98d','#efeee9'])
    ax.contour(S,R,B,levels=[0],colors=['#1c5740'],linewidths=1.6)
    ax.axvspan(35,70,facecolor='#c9ddec',alpha=.85,zorder=2)
    ax.axvline(35,color='#285a79',linewidth=1.4,zorder=4)
    ax.fill_between(s,np.minimum(s,14),14,color='white',zorder=3)
    ax.plot(s,np.minimum(s,14),color='#a6a5a0',linewidth=1,zorder=4)
    for x,y,text,offset in [(11,11,'11, 11',(-25,15)),(20,7,'20, 7',(9,10)),(30,6,'30, 6',(9,10))]:
        ax.plot(x,y,'o',color='#173e30',markersize=5,zorder=5)
        ax.annotate(text,(x,y),xytext=offset,textcoords='offset points',fontsize=10,
                    bbox={'facecolor':'#faf9f5','edgecolor':'none','pad':2},zorder=6)
    ax.text(15,9.4,'Radial\nexclusion',fontsize=12,color='#123c2b')
    ax.text(39,11.8,'Vector exclusion\n'+r'$r_3\geq35$',fontsize=12,color='#173f5a')
    ax.text(9,2.4,'Not excluded by these bounds',fontsize=11,color='#5a5b58')
    ax.text(3.5,11.8,'Outside radius ordering',fontsize=10,color='#8a8a85')
    ax.set_xscale('log');ax.set_xlim(2,70);ax.set_ylim(1,14)
    ax.set_xticks([2,5,10,20,35,70],labels=['2','5','10','20','35','70'])
    ax.set_xlabel(r'Outermost radius ratio $r_3$');ax.set_ylabel(r'Middle radius ratio $r_2$')
    ax.set_title('Subfield radius exclusions',loc='left',fontsize=18,pad=30)
    ax.text(0,1.025,r'$r_1=1$, $1<r_2<r_3$, $|\omega|r_3<1$; unchanged logarithmic equation',
            transform=ax.transAxes,fontsize=10,color='#555b56')
    ax.grid(alpha=.16);ax.spines[['top','right']].set_visible(False)
    fig.text(.5,-.015,'Analytical exclusions for all phases; the sampled contour only illustrates the radial bound.',
             ha='center',fontsize=8,color='#555b56')
    owner=Path(__file__).parent.parent
    svg=owner/'analysis/overnight-c-radius-exclusion-map.svg'
    fig.savefig(svg,bbox_inches='tight')
    svg.write_text('\n'.join(line.rstrip() for line in svg.read_text().splitlines())+'\n')
    fig.savefig('.local-data/master-equation-closure/overnight-c/radius-exclusion-map.png',dpi=160,bbox_inches='tight')
    print('Saved analytical illustration as SVG and local inspection PNG')
