"""Independent exact-rational short-time three-path evolution reference.

Canonical c_f=1, prescribed static past, charges (1,1,-1), kappa=.001.
Uses field/derivative comparison bounds; no solver or author oracle import.
"""
import json
import pathlib
from fractions import Fraction as Q

def magnitude_bracket(a0,al,au,l,L,T):
    if l>=0:
        lower,upper=l*al,L*au
    else:
        assert L<=0
        lower,upper=l*au,L*al
    return (a0*T*T/2+lower*T**4/24,a0*T*T/2+upper*T**4/24),(
        a0*T+lower*T**3/6,a0*T+upper*T**3/6)

assert magnitude_bracket(Q(2),Q(2),Q(2),Q(0),Q(0),Q(1,2)) == (
    (Q(1,4),Q(1,4)),(Q(1),Q(1)))
print("Known constant acceleration gives exact x=1/4, v=1 BEFORE references/targets.",flush=True)
k=Q(1,1000)
definitions={
 "receiver":(Q(0),-1,Q(1,10**8),lambda u:k/(10+u)**2-k/(11+u)**2,
             lambda u:-2*k/(10+u)**3+2*k/(11+u)**3),
 "plus":(Q(10),1,Q(1,10**6),lambda u:k/(10+u)**2+k/(1-u)**2,
         lambda u:-2*k/(10+u)**3+2*k/(1-u)**3),
 "minus":(Q(11),-1,Q(1,10**6),lambda u:k/(11-u)**2+k/(1-u)**2,
          lambda u:2*k/(11-u)**3+2*k/(1-u)**3)}
cases=[]
for T in (Q(1,128),Q(1,64),Q(1,32)):
    paths={}
    for name,(x0,direction,epsilon,F,D) in definitions.items():
        a0=F(Q(0));al=min(a0,F(epsilon));au=max(a0,F(epsilon))
        l,L=D(Q(0)),D(epsilon)
        assert l<=L and al>0 and au*T<1 and au*T*T/2<epsilon
        u,v=magnitude_bracket(a0,al,au,l,L,T)
        x=sorted(x0+direction*z for z in u)
        velocity=sorted(direction*z for z in v)
        paths[name]={"position_z":list(map(str,x)),"velocity_z":list(map(str,velocity))}
    assert 1-Q(2,10**6)>T and 11+Q(1,10**6)<20-T
    cases.append({"time":str(T),"paths":paths})
reference={"schema":"independent_three_path_short_time_reference/v1","field_speed":"1",
           "coupling":"0.001","prescribed_past":["-20","0"],"positions_z":["0","10","11"],
           "charges":["1","1","-1"],"method":"monotone static-past field and derivative comparison, closed all-far bootstrap",
           "cases":cases}
root=pathlib.Path(__file__).resolve().parents[4]
destination=root/"reference/priorities/app-solver/evidence/matched-pair-review-stage3-three-path-brackets.json"
if destination.exists():
    assert json.loads(destination.read_text())==reference
else:
    with destination.open("x") as f:json.dump(reference,f,indent=2);f.write("\n")
print("Independent reference frozen BEFORE target reads.",flush=True)
directory=root/"reference/priorities/app-solver/evidence/matched-pair-stage-3-cpp-candidate-v2"
rows=[json.loads(s) for s in (directory/"candidate-producer.jsonl").read_text().splitlines()]
for r in rows:
    if r["case"]!="K2-three-path" or r["status"]!="certified":continue
    T=Q(r["end"]);truth=next(c["paths"] for c in cases if Q(c["time"])==T)
    h=Q(r["end"])-Q(r["start"])
    for p in r["paths"]:
        c=list(map(Q,p["coefficients"][2]))
        x=sum(c[j]*h**j for j in range(4));v=c[1]+2*c[2]*h+3*c[3]*h*h
        px,pv=map(Q,(p["position_error"][2],p["velocity_error"][2]))
        tx,tv=(list(map(Q,truth[p["id"]][k])) for k in ("position_z","velocity_z"))
        assert x-px<=tx[0]<=tx[1]<=x+px
        assert v-pv<=tv[0]<=tv[1]<=v+pv
    print({"target":"independent_three_path_evolution","time":str(T),"all_three_path_position_velocity_brackets_contained":True},flush=True)
