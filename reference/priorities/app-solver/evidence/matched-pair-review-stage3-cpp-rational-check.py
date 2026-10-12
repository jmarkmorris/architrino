"""Independent rational checks of the C++ candidate probe output.

Known polynomial checks precede target reads. Binary64 endpoints are exact
binary rationals; coefficient/radius tokens are exact decimal rationals.
"""
import json
import pathlib
from fractions import Fraction as Q

def slack(X,V,A,c,rx,rv,t):
    nominal_x=sum(c[k]*t**k for k in range(4))
    nominal_v=c[1]+2*c[2]*t+3*c[3]*t*t
    want_x=[X[k]+t*V[k]+t*t*A[k]/2 for k in range(2)]
    want_v=[V[k]+t*A[k] for k in range(2)]
    return min(want_x[0]-(nominal_x-rx),nominal_x+rx-want_x[1]), min(
        want_v[0]-(nominal_v-rv),nominal_v+rv-want_v[1])

assert slack([Q(1)]*2,[Q(2)]*2,[Q(6)]*2,[Q(1),Q(2),Q(3),Q(0)],Q(1,10),Q(1,5),Q(1,2)) == (Q(1,10),Q(1,5))
assert slack([Q(1),Q(2)],[Q(0)]*2,[Q(0)]*2,[Q(1),Q(0),Q(0),Q(0)],Q(1,2),Q(0),Q(0))[0] < 0
print("Known rational whole-set comparison cases passed BEFORE target reads.",flush=True)
root=pathlib.Path(__file__).resolve().parents[4]
source=root/".local-data/eom-matched-pair/2026-10-11/reviewer-targets/stage3-cpp-independent-probes.stdout"
rows=[json.loads(s) for s in source.read_text().splitlines() if s.startswith("{")]
for r in rows:
    if r["case"] == "publication_token" and r["status"] == "certified":
        X,V,A=([Q(x) for x in r[k]] for k in ("X0","V0","A"))
        c=list(map(Q,r["c"]))
        for t in (Q(0),Q(1,8)):
            sx,sv=slack(X,V,A,c,Q(r["rx"]),Q(r["rv"]),t)
            print({"target":"exact_nominal_tube_vs_theorem_set","initial":r["initial"],
                   "elapsed":str(t),"position_slack":float(sx),"velocity_slack":float(sv)},flush=True)
    elif r["case"] == "exact_time_extent":
        extra=Q(r["end"])-Q(r["start"])-Q(r["h"])
        assert r["status"] == "certified" and extra == Q(3,10**7)
        print({"target":"published_extent_exceeds_requested_h","excess_exact":str(extra)},flush=True)
    elif r["case"] == "conditional_affine_tubes":
        d,v,nu,ell,w,a,J,C,B=(Q(r[k]) for k in ("floor","speed","nu","ell","w","a","J","C","radius"))
        assert Q(r["epsVp"]) >= Q(1,100) and Q(r["epsVm"]) >= Q(1,50)
        assert w >= Q(1,100)+Q(1,100)+Q(1,50)
        bound=C*((2*nu+v)*ell/(d**3*nu**3)+(w+a*ell/nu+J)/(d*d*nu*nu))
        assert B >= bound
        exact=Q(-2021,1210000000)
        assert -B <= exact <= B
        assert Q(-1000,101) > Q(-21,2) > Q(-550,51)
        print({"target":"window_maximum_velocity_allowance","exact_acceleration":str(exact),
               "roots_in_different_cells":True,"allowance_at_least_1_over_25":True,
               "rational_formula_contained":True},flush=True)

# Independent three-path bootstrap: until t=1/32 the receiver is in
# [-1e-8,0], sources within 1e-6 of 10 and 11. Min separation > t keeps all
# cross-root emissions in exact static prescribed past. Acceleration bounds
# 2e-5 and .00102 close this bootstrap; hence receiver f(x) below is exact.
f=lambda x: -Q(1,1000)/(Q(10)-x)**2+Q(1,1000)/(Q(11)-x)**2
assert f(Q(0)) == Q(-21,12100000)
print("Known three-path f(0)=-21/12100000 passed BEFORE consumer target reads.",flush=True)
data=root/"reference/priorities/app-solver/evidence/matched-pair-stage-3-cpp-candidate/candidate-consumer.jsonl"
consumer=[json.loads(s) for s in data.read_text().splitlines()]
true=[f(Q(0)),f(Q(-1,10**8))]
for traversal in (False,True):
    row=next(r for r in consumer if r["case"]=="C1-validated-tubes-grouped" and r["traversal"] is traversal)
    interval=list(map(Q,row["totals"]["receiver"][2]))
    assert interval[0] <= true[0] <= true[1] <= interval[1]
    assert row["enclosed_groups"] == 1 and row["logical_pairs"] == 9
    print({"target":"independent_three_path_true_acceleration_containment",
           "traversal":traversal,"true_lower_exact":str(true[0]),
           "true_upper_exact":str(true[1]),"one_group_two_source_relationships":True},flush=True)
