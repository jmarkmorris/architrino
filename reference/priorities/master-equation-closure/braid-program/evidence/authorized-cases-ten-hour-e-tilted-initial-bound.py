"""Optional directed release-distance bound; no trajectory integration."""
from pathlib import Path
import importlib.util,hashlib,json,sys
p=Path(__file__).with_name("authorized-cases-ten-hour-e-interval-jets-v2.py")
assert hashlib.sha256(p.read_bytes()).hexdigest()=="73ffb3275981a367ef039b9d06dc7d37817b1bb7e514557ecb30fbb4cfd634fa"
s=importlib.util.spec_from_file_location("initial_distance_iv",p);j=importlib.util.module_from_spec(s);s.loader.exec_module(j)
I,iv,mp=j.I,j.iv,j.mp

def bound(r,rs,a,b,c):
    assert j.lower(rs)>j.upper(abs(c))/2
    radial=iv.sqrt(rs**2-c**2/4)
    return iv.sqrt((a*a+b*b)/4+c*c/16)+abs(r-rs)+(c*c/4)/(rs+radial)

def known():
    assert j.contains(bound(I(1),I(1),I(3),I(4),I(0)),mp.mpf("2.5"))
    assert j.contains(bound(I(2),I(1),I(0),I(0),I(0)),mp.mpf(1))
    r=rs=I(1);a=b=I(0);c=I(6)/5
    cost=bound(r,rs,a,b,c);assert j.contains(cost,mp.mpf(1)/2)
    q1=[I(4)/5,I(0),I(3)/5];q2=[I(0),I(1),I(0)]
    assert j.contains(j.dot(q1,q1),1) and j.contains(j.dot(q1,q2),0)
    initial=[[I(1),I(0),c],[I(0),I(1),I(0)],[I(-1),I(0),I(0)],[I(0),I(-1),I(0)]]
    comparison=[q1,q2,[-x for x in q1],[-x for x in q2]]
    norms=[j.norm([x[k]-y[k]-(c/4 if k==2 else I(0)) for k in range(3)]) for x,y in zip(initial,comparison)]
    exact=iv.sqrt(13)/10
    assert j.lower(norms[0])<=j.upper(exact) and j.upper(norms[0])>=j.lower(exact)
    assert all(j.upper(v)<j.lower(cost) for v in norms)
    return {"passed":True,"cases":["zero tilt gives half planar offset","pure radius mismatch","rational proper tilt with sin3/5 cos4/5","direct four-member error norm sqrt13/10 below bound1/2"]}

if __name__=="__main__":
    controls=known()
    if sys.argv[1:]==["--known"]:print(json.dumps(controls,indent=2));sys.exit()
    assert len(sys.argv)==3 and not Path(sys.argv[2]).exists()
    source=Path(sys.argv[1]);assert hashlib.sha256(source.read_bytes()).hexdigest()=="833067a9918618126adacf31b62c75616cf1c2ee78101ae586a15bcd1379b227"
    rs=iv.mpf(["2.55921061613","2.55921061616"]);r=I("2.559210616145");eps=I(".0001")
    a=eps*r;b=a*I(".7");c=a*I("1.3");initial=bound(r,rs,a,b,c)
    rows=[]
    for row in json.loads(source.read_text())["rows"]:
        if row["T"] in ["10","12","15"]:
            low=I(row["rmsDistance"][0]);rows.append({"T":row["T"],"trialRmsLower":row["rmsDistance"][0],"positionErrorBudgetForTwofold":j.bound(low-2*I(j.upper(initial)))[0]})
    out={"claim":"directed explicit initial configuration comparison and existing trial observable budget only; no actual departure","known":controls,"initialUpper":j.bound(initial)[1],"radius":j.bound(rs),"observableSha256":hashlib.sha256(source.read_bytes()).hexdigest(),"rows":rows}
    Path(sys.argv[2]).write_text(json.dumps(out,indent=2));print(json.dumps(out,indent=2))
