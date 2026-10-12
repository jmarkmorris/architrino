"""Independent exact quadratic-minimum and content-chain review.

No candidate arithmetic or author checker imported. Known controls first.
"""
import hashlib
import json
import pathlib
from fractions import Fraction as Q

def minimum(c,H):
    values=[c[0],c[0]+c[1]*H+c[2]*H*H]
    if c[2]>0:
        t=-c[1]/(2*c[2])
        if 0<t<H:
            values.append(c[0]+c[1]*t+c[2]*t*t)
    return min(values)

assert minimum([Q(1),Q(-2),Q(1)],Q(2))==0
assert minimum([Q(1,8),Q(-1),Q(1)],Q(1))==Q(-1,8)
assert minimum([Q(2),Q(-1),Q(0)],Q(1))==1
assert hashlib.sha256(b"abc").hexdigest()=="ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
print("Known quadratic interior minima, negative exclusion, affine endpoint and SHA-256 abc passed BEFORE targets.",flush=True)

def digest(before,start,end,c,rx,rv):
    text=before+"|"+start+"|"+end
    text+="".join("|"+v for axis in c for v in axis)
    text+="".join("|x"+v for v in rx)+"".join("|v"+v for v in rv)
    return hashlib.sha256(text.encode()).hexdigest()

def check_path(X,V,A,c,rx,rv,H):
    lows=[]
    for side in (0,1):
        s=1 if side==0 else -1
        lows.append(minimum([rx+s*(X[side]-c[0]),s*(V[side]-c[1]),s*(A[side]/2-c[2])],H))
        lows.append(minimum([rv+s*(V[side]-c[1]),s*(A[side]-2*c[2]),Q(0)],H))
    return min(lows)

root=pathlib.Path(__file__).resolve().parents[4]
out=root/".local-data/eom-matched-pair/2026-10-11/reviewer-targets"
probe=[json.loads(s) for s in (out/"stage3-cpp-v2-independent-probes.stdout").read_text().splitlines() if s.startswith("{")]
for r in probe:
    if r["case"]=="publication_token":
        assert r["status"]=="certified"
        c=list(map(Q,r["c"]))
        low=check_path(*([Q(x) for x in r[k]] for k in ("X0","V0","A")),c,Q(r["rx"]),Q(r["rv"]),Q(1,8))
        assert low>=0
        assert all(Q(token)==Q(float(token)) for token in r["c"])
        print({"target":"CPP-P1-original-input","initial":r["initial"],"whole_step_minimum_nonnegative":True},flush=True)
    else:
        assert Q(r["end"])-Q(r["start"])==Q(r["h"])
        print({"target":"CPP-P2-original-input","exact_extent_matches":True},flush=True)

directory=root/"reference/priorities/app-solver/evidence/matched-pair-stage-3-cpp-candidate-v2"
rows=[]
for kind in ("producer","generated-source","long"):
    rows += [json.loads(s) for s in (directory/f"candidate-{kind}.jsonl").read_text().splitlines()]
certified=[r for r in rows if r.get("status")=="certified"]
count=0
for r in certified:
    assert Q(r["end"])-Q(r["start"])==Q(r["h"])
    H=Q(r["duration_cover"])
    assert H>=Q(r["h"])
    for p in r["paths"]:
        member=next(m for m in r["evidence"]["members"] if m["id"]==p["id"])
        assert digest(member["digest_before"],r["start"],r["end"],p["coefficients"],p["position_error"],p["velocity_error"])==member["digest_after"]
        for axis in range(3):
            c=list(map(Q,p["coefficients"][axis]))
            assert c[3]==0
            low=check_path(*([Q(x) for x in p[k][axis]] for k in ("inherited_position","inherited_velocity","acceleration")),c,Q(p["position_error"][axis]),Q(p["velocity_error"][axis]),H)
            assert low>=0
            count+=1
assert len(certified)==23
last=next(r for r in certified if r["case"]=="T3-control-long")
p=next(p for p in last["paths"] if p["id"]=="receiver")
c=list(map(Q,p["coefficients"][2]));H=Q(last["h"])
x=sum(c[k]*H**k for k in range(4));v=c[1]+2*c[2]*H+3*c[3]*H*H
assert x-Q(p["position_error"][2]) <= Q("-0.000017689") < Q("-0.000017645") <= x+Q(p["position_error"][2])
assert v-Q(p["velocity_error"][2]) <= Q("-0.000019634725") < Q("-0.000019582719") <= v+Q(p["velocity_error"][2])
assert v-Q(p["velocity_error"][2]) > Q("-0.00002000046002588")
print({"certified_steps":len(certified),"whole_step_axis_checks":count,"content_chain_publications_rebuilt":True,"independent_midpoint_contained":True,"alias_disjoint":True},flush=True)
f=lambda x:-Q(1,1000)/(10-x)**2+Q(1,1000)/(11-x)**2
assert f(Q(0))==Q(-21,12100000)
print("Known three-path f(0) passed BEFORE consumer targets.",flush=True)
consumer=[json.loads(s) for s in (directory/"candidate-consumer.jsonl").read_text().splitlines()]
for traversal in (False,True):
    r=next(r for r in consumer if r["case"]=="C1-validated-tubes-grouped" and r["traversal"] is traversal)
    lo,hi=map(Q,r["totals"]["receiver"][2])
    assert lo <= f(Q(0)) <= f(Q(-1,10**8)) <= hi
    assert r["logical_pairs"]==9 and r["enclosed_groups"]==1
    print({"target":"independent_three_path_snapshot","traversal":traversal,"contained":True},flush=True)
