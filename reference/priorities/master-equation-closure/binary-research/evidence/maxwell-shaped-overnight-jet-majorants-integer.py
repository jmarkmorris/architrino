"""Integer compact-box continuation of unchanged directed jet-majorant subject.
Round each preserved jet bound upward BEFORE computing the next row.
This is a subject wrapper, not an independent reference implementation.
"""
from pathlib import Path
import importlib.util,json,hashlib,argparse
path=Path(__file__).with_name('maxwell-shaped-overnight-jet-majorants.py')
spec=importlib.util.spec_from_file_location('jet_majorant_subject',path);s=importlib.util.module_from_spec(spec);spec.loader.exec_module(s)
iv,I=s.iv,s.I

def ceiling_upper(x):
    sign,man,exp,bc=x._mpi_[1];num=(-1 if sign else 1)*man
    if exp>=0:return num*2**exp
    den=2**(-exp);return -((-num)//den)

def known():
    original=s.known()
    assert ceiling_upper(I(1)/3)==1
    assert ceiling_upper(-I(1)/3)==0
    assert ceiling_upper(I(5))==5
    return dict(passed=True,base=original,ceiling=['positive third','negative third','integer five'])

def target():
    eps=I(0,I(1)/2**40);L=iv.mpf([iv.mpf(8)/9,iv.mpf(32)/7]);D=iv.mpf([iv.mpf(7)/8,iv.mpf(9)/8]);n=[I(-1,1)]*3
    past=[0,2,16,256,2**16,2**32,2**64];M=past[:];rows=[]
    for k in range(5):
        j=k+2;rec=s.point_jets(k);src=s.point_jets(k)
        for q in range(1,j):rec[q]=[I(-M[q],M[q])]*3;src[q]=[I(-M[q],M[q])]*3
        N=[]
        for full in [False,True]:
            F,U=s.response(k,eps,L,n,D,rec,src,full)
            N.append(s.upper_norm([x[k]*s.math.factorial(k) for x in F]))
        bound=N[0] if N[0].b>=N[1].b else N[1]
        Ninteger=ceiling_upper(bound);M[j]=max(past[j],2*Ninteger)
        rows.append(dict(position_jet=j,N_upper=Ninteger,M_preserved=M[j],directed_raw=s.export.encode(bound),highest_source_jet_zero=True))
    return dict(epsilon_upper='2^-40',chart=dict(L=['8/9','32/7'],D=['7/8','9/8'],unit_n_components='[-1,1]',velocity_norm='<=2',past_jet_norms=past[2:]),rows=rows,highest_gain=s.export.encode(64*eps.b**2),changing_gain_delta='1/4096 gives1/4',scope='conditional compact smooth/piecewise bounded-jet chart; no initial-patch inventory or radial/remainder constants certified')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--target',action='store_true');p.add_argument('--output',required=True);a=p.parse_args();result=dict(known=known());print(json.dumps(result),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    result.update(pre_target_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),imported_subject_sha256=hashlib.sha256(path.read_bytes()).hexdigest())
    if a.target:result['majorants']=target()
    Path(a.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
