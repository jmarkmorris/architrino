"""Separately derived directional unit-frame clock columns.

The formulas were fixed before reading the subject unit-frame helper.  A
directional scalar Dual differentiates en,et; the old nested-potential reference
is left unchanged and supplies independent Cartesian known-case checks.
Physical source jets and receiver velocity are Cartesian vectors held fixed
under basis rotation.  Source J is comparison history J only. K=cf=1.
"""
import importlib.util,json,argparse
from pathlib import Path
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-signed-potential-jacobian.py')
s=importlib.util.spec_from_file_location('potential',p);pot=importlib.util.module_from_spec(s);s.loader.exec_module(pot)
D,I,iv=pot.D,pot.I,pot.iv

def frame(R,v,a,u,j,law,polarity=-1):
    R=I(R);vn,vt=map(I,v);an,at=map(I,a);un,ut=map(I,u);jn,jt=map(I,j);den=1-vn
    assert R.a>0 and den.a>0 and law in ('E','full')
    def response(z):
        rr,vnn,vtt,ann,att,unn,utt=z;dd=1-vnn;w=1-vnn*vnn-vtt*vtt
        en=polarity*w/(rr*rr*dd*dd)
        et=-polarity*(w*vtt/(rr*rr)+(vtt*ann+dd*att)/rr)/(dd*dd*dd)
        return [en,et] if law=='E' else [en+utt*et,(1-unn)*et]
    values=[R,vn,vt,an,at,un,ut];f=response(list(map(D,values)))
    directions=[
        [1/den,(vt*vt/R-an)/den,-(at+vn*vt/R)/den,(at*vt/R-jn)/den,-(an*vt/R+jt)/den,ut*vt/(R*den),-un*vt/(R*den)],
        [I(0),vt/R,-vn/R,at/R,-an/R,ut/R,-un/R]]
    theta=[vt/(R*den),1/R];ax=[[I(0) for _ in range(2)] for _ in range(2)]
    for k in range(2):
        g=response([D(x,d) for x,d in zip(values,directions[k])])
        ax[0][k]=g[0].d-f[1].v*theta[k]
        ax[1][k]=g[1].d+f[0].v*theta[k]
    return {'F':[x.v for x in f],'AX':ax}

def overlap(a,b):return a.a<=b.b and b.a<=a.b
def known():
    baseline=pot.known();zero=['0','0'];m=frame('2',zero,zero,zero,zero,'E')
    for i in range(2):
        for k in range(2):assert pot.contains(m['AX'][i][k],'.25' if i==k==0 else '-.125' if i==k==1 else 0)
    m=frame('2.5',['.2','0'],zero,zero,zero,'full')
    assert pot.contains(m['AX'][0][0],'.24') and pot.contains(m['AX'][1][1],'-.12')
    cases=[('2',['0','0'],['0','.03'],['.2','.3'],['0','.05']),('1.7',['.21','-.13'],['.04','.07'],['-.16','.28'],['-.03','.11'])]
    for law in ('E','full'):
        for rr,v,a,u,j in cases:
            f=frame(rr,v,a,u,j,law);c=pot.matrices([rr,'0','0'],v+['0'],a+['0'],u+['0'],law,-1,j+['0'])
            for i in range(2):
                assert overlap(f['F'][i],c['F'][i])
                for k in range(2):assert overlap(f['AX'][i][k],c['AX'][i][k])
    return {'passed':True,'potentialControls':baseline,'cases':['opposite-polarity static clock diag(1/4,-1/8)','affine clock diag(6/25,-3/25)','nonzero sourceA/J and receiverU E/full directional columns versus frozen nested potential']}

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--output',required=True);args=ap.parse_args();out={'known':known(),'scope':'known-case-first independent geometric clock reference; physical meanvalue/frame obligations remain explicit; no target admitted'}
    Path(args.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out))
