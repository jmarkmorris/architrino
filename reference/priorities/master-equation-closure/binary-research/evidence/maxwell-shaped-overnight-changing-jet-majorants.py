"""Explicit lower-part jets in frozen changing-scale units.
Fixed subject imported unchanged. Current normalized jets Mj; source jets
expanded by the provisional factor2^(3j-2). Safe local parameter<=2^-40.
No radial/source-scale improvement, startup inventory or fate certified here.
"""
import argparse,json,hashlib,importlib.util
from pathlib import Path
subject_path=Path(__file__).with_name('maxwell-shaped-overnight-jet-majorants.py')
spec=importlib.util.spec_from_file_location('fixed_jet_subject',subject_path);s=importlib.util.module_from_spec(spec);spec.loader.exec_module(s)
integer_path=Path(__file__).with_name('maxwell-shaped-overnight-jet-majorants-integer.py')
spec2=importlib.util.spec_from_file_location('integer_jet_subject',integer_path);integer=importlib.util.module_from_spec(spec2);spec2.loader.exec_module(integer)
iv,I=s.iv,s.I

def known():
    controls=s.known()
    assert 2**(3*2-2)==16 and 2**(3*6-2)==65536
    assert (64*2**16)*(I(1)/4096)**2==I(1)/4
    assert integer.ceiling_upper(I(1)/3)==1
    return dict(passed=True,base=controls,cases=['source weight16 at second jet and65536 at sixth','changing highest gain one-quarter atdelta1/4096','exact upward ceiling'])

def target():
    delta=I(0,I(1)/2**40);L=iv.mpf([iv.mpf(8)/9,iv.mpf(32)/7]);D=iv.mpf([iv.mpf(7)/8,iv.mpf(9)/8]);n=[I(-1,1)]*3
    past=[0,2,16,256,2**16,2**32,2**64];M=past[:];rows=[]
    for k in range(5):
        j=k+2;rec=s.point_jets(k);src=s.point_jets(k)
        for q in range(1,j):
            rec[q]=[I(-M[q],M[q])]*3
            source_bound=2**(3*q-2)*M[q]
            src[q]=[I(-source_bound,source_bound)]*3
        bounds=[]
        for full in [False,True]:
            F,U=s.response(k,delta,L,n,D,rec,src,full)
            bounds.append(s.upper_norm([x[k]*s.math.factorial(k) for x in F]))
        N=bounds[0] if bounds[0].b>=bounds[1].b else bounds[1]
        upper=integer.ceiling_upper(N);M[j]=max(past[j],2*upper)
        rows.append(dict(position_jet=j,N_upper=upper,M_preserved=M[j],source_weight=2**(3*j-2),directed_raw=s.export.encode(N)))
    return dict(local_delta_upper='2^-40',L=['8/9','32/7'],D=['7/8','9/8'],provisional_source_scale_ratio='between1/2 and2',current_scaled_velocity_norm='<=2',source_scaled_velocity_norm='<=4',past_current_weighted_jet_limits=past[2:],rows=rows,highest_weighted_gain=s.export.encode(64*2**16*delta.b**2),scope='conditional normalized lower-part/jet preservation; no radial/remainder/startup certificate or improvement of provisional ratio')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--target',action='store_true');parser.add_argument('--output',required=True);args=parser.parse_args();result=dict(known=known());print(json.dumps(result),flush=True)
    assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    result.update(pre_target_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),imported_subject_sha256=hashlib.sha256(subject_path.read_bytes()).hexdigest(),imported_integer_sha256=hashlib.sha256(integer_path.read_bytes()).hexdigest())
    if args.target:result['majorants']=target()
    Path(args.output).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
