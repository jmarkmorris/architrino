"""Directed instantaneous configuration distance; exact trial planning only."""
from pathlib import Path
import importlib.util,json,sys,hashlib,signal,time
p=Path(__file__).with_name("authorized-cases-ten-hour-e-trial-v3.py")
assert hashlib.sha256(p.read_bytes()).hexdigest()=="9eda27ebc606c922453dc056c06b07ddb3e48095a1e461e4e7ad8a0bc2c058dd"
s=importlib.util.spec_from_file_location("obs_trial",p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
j=m.j;I,iv,mp=j.I,j.iv,j.mp

def nonnegative(a):
    assert j.upper(a)>=0
    return iv.mpf([max(mp.mpf(0),j.lower(a)),j.upper(a)])

def observable(x,r):
    a=[v/2 for v in j.sub(x[0],x[2])];b=[v/2 for v in j.sub(x[1],x[3])]
    c=[(x[0][k]+x[2][k]-x[1][k]-x[3][k])/4 for k in range(3)]
    A=j.dot(a,a);B=j.dot(b,b);C=j.dot(a,b)
    gap=iv.sqrt(nonnegative((A-B)**2+4*C**2))
    s1=iv.sqrt(nonnegative((A+B+gap)/2));s2=iv.sqrt(nonnegative((A+B-gap)/2))
    return iv.sqrt(nonnegative(((s1-r)**2+(s2-r)**2)/2+j.dot(c,c)))

def square(a,b,c=None,shift=None):
    c=c or [I(0)]*3;shift=shift or [I(0)]*3
    return [[shift[k]+z[k]+sign*c[k] for k in range(3)] for z,sign in [(a,1),(b,-1),([-v for v in a],1),([-v for v in b],-1)]]

def known():
    z=I(0);o=I(1);q=I(1)/10
    cases=[(square([o,z,z],[z,o,z]),I(0)),(square([z,o,z],[z,z,o],shift=[I(3),I(-2),I(7)]),I(0)),(square([o+q,z,z],[z,o+q,z]),q),(square([o+q,z,z],[z,o-q,z]),q),(square([o,z,z],[z,o,z],c=[z,z,q]),q),(square([z,z,z],[z,z,z]),o)]
    for x,expected in cases:
        value=observable(x,o);assert j.lower(value)<=j.lower(expected) and j.upper(value)>=j.upper(expected)
        assert j.upper(value)-j.lower(value)<mp.mpf("1e-18")
    x=square([o,z,z],[z,o,z]);x[0][0]+=q
    value=observable(x,o);exact=iv.sqrt(3)*q/4
    assert j.lower(value)<=j.upper(exact) and j.upper(value)>=j.lower(exact)
    assert j.upper(value)<j.lower(q/2)
    return {"passed":True,"cases":["exact square","proper rotation and translation","uniform scale","unequal orthogonal diagonals","alternating normal deformation","rank zero","single radial label displacement sqrt3 d/4"]}

if __name__=="__main__":
    controls=known()
    if sys.argv[1:]==["--known"]:print(json.dumps(controls,indent=2));sys.exit()
    assert len(sys.argv)==3 and not Path(sys.argv[2]).exists()
    signal.signal(signal.SIGALRM,lambda *_:sys.exit("observable60s deadline"));signal.alarm(60)
    start=time.monotonic();trial=m.Trial(sys.argv[1],"20");rstar=iv.mpf(["2.55921061613","2.55921061616"])
    initial=trial.eps*trial.r*iv.sqrt(I("3.18"))/2+abs(trial.r-rstar)
    rows=[]
    for t in ["0","10","12","15","18","20"]:
        x=[[a.c[0] for a in trial.point(i,mp.mpf(t))[0]] for i in range(4)]
        d=observable(x,rstar);budget=d-2*I(j.upper(initial))
        rows.append({"T":t,"rmsDistance":j.bound(d),"initialDistanceUpper":j.bound(initial)[1],"ratioLower":j.bound(d/I(j.upper(initial)))[0],"positionErrorBudgetForTwofold":j.bound(budget)[0]})
    out={"claim":"exact trial instantaneous configuration observable only; actual solution requires position error certificate","known":controls,"inputSha256":hashlib.sha256(Path(sys.argv[1]).read_bytes()).hexdigest(),"radius":j.bound(rstar),"wallSeconds":time.monotonic()-start,"rows":rows}
    Path(sys.argv[2]).write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
