#!/usr/bin/env python3
"""Independent decimal checks for the planar common-center three-binary constraint circular handoff and EOM output.

This instrument does not import the JavaScript constructor or a prescribed
path operator.  It uses Decimal series for the circular endpoint reference and
the unchanged certified-history classes for cubic evaluation.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import sys
from decimal import Decimal, localcontext
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from scripts.eom.oracle.certified_history import CubicHistorySegment, PiecewisePolynomialHistory

PI = Decimal("3.141592653589793238462643383279502884197169399375105820974944592307816406286")


def sincos(x: Decimal) -> tuple[Decimal, Decimal]:
    with localcontext() as c:
        c.prec = 90
        two_pi = 2 * PI
        x = x % two_pi
        if x > PI:
            x -= two_pi
        xx = x * x
        s, st = x, x
        co, ct = Decimal(1), Decimal(1)
        for n in range(1, 70):
            st *= -xx / Decimal((2*n)*(2*n+1))
            ct *= -xx / Decimal((2*n-1)*(2*n))
            s += st
            co += ct
        return +s, +co


def analytic(radius: Decimal, omega: Decimal, phase: Decimal, time: Decimal):
    s, c = sincos(phase + omega*time)
    return ((radius*c, radius*s, Decimal(0)),
            (-radius*omega*s, radius*omega*c, Decimal(0)))


def max_abs(values):
    return max(abs(value) for value in values)


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def check_handoff(path: Path) -> dict:
    raw = json.loads(path.read_text())
    d = raw["declaration"]
    radius, omega = Decimal(d["radius"]), Decimal(d["angularVelocity"])
    declared_p = Decimal(d["historyPositionError"])
    declared_v = Decimal(d["historyVelocityError"])
    m4 = radius * omega**4
    maximum_endpoint_p = Decimal(0)
    maximum_endpoint_v = Decimal(0)
    maximum_p_bound = Decimal(0)
    maximum_v_bound = Decimal(0)
    histories = []
    for member in raw["members"]:
        phase = Decimal(member["phaseAtRelease"])
        parsed = []
        for segment in member["segments"]:
            cubic = CubicHistorySegment.from_decimal_tokens(
                t_start=segment["startTime"], t_end=segment["endTime"],
                coefficients=segment["coefficients"],
                position_error=segment["positionErrors"][0],
                velocity_error=segment["velocityErrors"][0], precision=80)
            parsed.append(cubic)
            start, end = Decimal(segment["startTime"]), Decimal(segment["endTime"])
            p0, v0 = analytic(radius, omega, phase, start)
            p1, v1 = analytic(radius, omega, phase, end)
            cp0, cv0 = cubic.nominal_state(start)
            cp1, cv1 = cubic.nominal_state(end)
            ep = max(max_abs(cp0[i]-p0[i] for i in range(3)), max_abs(cp1[i]-p1[i] for i in range(3)))
            ev = max(max_abs(cv0[i]-v0[i] for i in range(3)), max_abs(cv1[i]-v1[i] for i in range(3)))
            h = end-start
            p_bound = ep + h*ev/Decimal(2) + m4*h**4/Decimal(384)
            v_bound = Decimal(3)*ep/h + Decimal(4)*ev + m4*h**3/Decimal(8)
            maximum_endpoint_p=max(maximum_endpoint_p,ep)
            maximum_endpoint_v=max(maximum_endpoint_v,ev)
            maximum_p_bound=max(maximum_p_bound,p_bound)
            maximum_v_bound=max(maximum_v_bound,v_bound)
        histories.append(PiecewisePolynomialHistory.from_segments(parsed, history_id=member["sourceHistoryId"]))
    accepted = maximum_p_bound <= declared_p and maximum_v_bound <= declared_v
    return {
        "schema":"braid-program/b1-3-circular-prehistory-independent-check.v1",
        "accepted":accepted,
        "authority":"derived Decimal-series endpoint reference plus cubic-Hermite remainder enclosure; independent of the JavaScript constructor; not an EOM result",
        "handoff":{"path":str(path),"sha256":digest(path),"members":len(histories),"segments":sum(len(h.segments) for h in histories)},
        "coverage":[str(histories[0].t_start),str(histories[0].t_end)],
        "maximumFourthDerivative":str(m4),
        "maximumEndpointPositionDefect":str(maximum_endpoint_p),
        "maximumEndpointVelocityDefect":str(maximum_endpoint_v),
        "maximumPositionErrorBound":str(maximum_p_bound),
        "maximumVelocityErrorBound":str(maximum_v_bound),
        "declaredPositionError":str(declared_p),"declaredVelocityError":str(declared_v),
        "falsifier":"any analytic circle value outside a stored cubic plus its declared position/rate radius, any discontinuous join, changed byte hash, or insufficient past coverage",
    }


def root_census(response: dict, expected: list[list[int]]) -> dict:
    rows = 0
    snapshots = 0
    failures = []
    ownership_reference = None
    for step_index, step in enumerate(response.get("stepFailures", [])):
        accounting = step.get("rootAccounting", [])
        if not accounting:
            continue
        snapshots += 1
        current = []
        counts = {}
        for row in accounting:
            owner = (row["receiverPathId"], row["transmitterPathId"])
            roots = row.get("roots", [])
            counts[owner] = len(roots)
            current.extend((owner[0], owner[1], ordinal) for ordinal in range(len(roots)))
            if row.get("status") not in ("certified_complete", "certified_enclosed") or row.get("memoryBoundaryContact"):
                failures.append({"step":step_index,"owner":owner,"reason":"uncertified-row"})
        expected_map={(f"b13-{i}",f"b13-{j}"):expected[i][j] for i in range(6) for j in range(6)}
        for owner,count in expected_map.items():
            if counts.get(owner) != count:
                failures.append({"step":step_index,"owner":owner,"expected":count,"actual":counts.get(owner),"reason":"root-count-change"})
        if ownership_reference is None:
            ownership_reference=current
        elif current != ownership_reference:
            failures.append({"step":step_index,"reason":"non-bijective-root-ownership"})
        rows += len(accounting)
    return {"snapshots":snapshots,"rootRows":rows,"expectedRootsPerSnapshot":sum(map(sum,expected)),"failures":failures,
            "bijectiveOwnership":snapshots>0 and not failures}


def check_response(path: Path, handoff: dict) -> dict:
    response=json.loads(path.read_text())
    census=root_census(response,handoff["declaration"]["expectedRootCountMatrix"])
    reached=response.get("status")=="completed" and Decimal(response.get("acceptedEndTime") or "-1") == Decimal(handoff["declaration"]["period"])
    extensions=response.get("publishedExtensions",[]); ids=[row.get("pathId") for row in extensions]
    if sorted(ids) != [f"b13-{i}" for i in range(6)] or len(set(ids)) != 6:
        raise ValueError("published extensions must contain each planar common-center three-binary constraint path exactly once")
    return {"path":str(path),"sha256":digest(path),"runId":response.get("runId"),"status":response.get("status"),"haltCode":response.get("haltCode"),
            "acceptedEndTime":response.get("acceptedEndTime"),"acceptedStepCount":response.get("acceptedStepCount"),
            "rejectedStepCount":response.get("rejectedStepCount"),"reachedOneCycle":reached,"rootCensus":census,
            "publishedExtensionCounts":{row["pathId"]:len(row.get("segments",[])) for row in extensions},
            "returnMetrics": return_metrics(response, handoff) if reached and census["bijectiveOwnership"] else {"available":False,"reason":"one-cycle/root-continuity gate not open"}}


def segment_from(raw: dict, identity: str) -> CubicHistorySegment:
    return CubicHistorySegment.from_decimal_tokens(t_start=raw["startTime"],t_end=raw["endTime"],coefficients=raw["coefficients"],
        position_error=raw["positionErrors"][0],velocity_error=raw["velocityErrors"][0],precision=80)


def translated_coefficients(segment: CubicHistorySegment, time: Decimal):
    l=time-segment.t_start
    out=[]
    for c0,c1,c2,c3 in segment.coefficients:
        out.append((c0+c1*l+c2*l*l+c3*l*l*l,c1+2*c2*l+3*c3*l*l,c2+3*c3*l,c3))
    return out


def bernstein_abs_upper(coefficients, width: Decimal) -> Decimal:
    a0,a1,a2,a3=coefficients
    controls=(a0,a0+a1*width/3,a0+2*a1*width/3+a2*width*width/3,a0+a1*width+a2*width*width+a3*width**3)
    return max_abs(controls)


def locate(segments, time: Decimal):
    for segment in segments:
        if segment.t_start <= time <= segment.t_end:
            return segment
    raise ValueError(f"history does not cover {time}")


def expected_delays(beta: float, phase_r: float, phase_t: float, same: bool, expected: int):
    end=2*beta
    def f(x): return 2*beta*abs(math.sin((phase_r-phase_t+x)/2))-x
    roots=[]; count=32768
    left=0.0; fl=f(left)
    for k in range(1,count+1):
        right=end*k/count; fr=f(right)
        if fl==0 and not (same and left==0): roots.append(left)
        if fl*fr<0:
            a,b=left,right; fa=fl
            for _ in range(80):
                m=(a+b)/2; fm=f(m)
                if fa*fm<=0:b=m
                else:a=m;fa=fm
            roots.append((a+b)/2)
        left,fl=right,fr
    if abs(f(end))<1e-10: roots.append(end)
    roots=sorted(x/beta for i,x in enumerate(sorted(roots)) if x>1e-10 and (i==0 or abs(x-roots[i-1])>1e-8))
    if len(roots)!=expected: raise ValueError(f"independent root census {len(roots)} != {expected}")
    return roots


def return_metrics(response: dict, handoff: dict) -> dict:
    d=handoff["declaration"]; period=Decimal(d["period"]); depth=Decimal(d["returnAction"]["comparedHistorySeconds"]); radius=Decimal(d["radius"])
    initial=[[segment_from(s,m["sourceHistoryId"]) for s in m["segments"]] for m in handoff["members"]]
    extensions={row["pathId"]:row for row in response["publishedExtensions"]}
    outgoing=[[segment_from(s,f"b13-{i}") for s in extensions[f"b13-{i}"]["segments"]] for i in range(6)]
    dx0=[]; dv0=[]; rx_terms=[]; rv_terms=[]
    for i in range(6):
        inc=locate(initial[i],Decimal(0)); out=locate(outgoing[i],period)
        ip,iv=inc.nominal_state(Decimal(0)); op,ov=out.nominal_state(period)
        dx=tuple(op[a]-ip[a] for a in range(3)); dv=tuple(ov[a]-iv[a] for a in range(3)); dx0.append(dx); dv0.append(dv)
        pe=inc.position_error+out.position_error; ve=inc.velocity_error+out.velocity_error
        rx_terms.append(sum((abs(dx[a])+pe)**2 for a in range(3))/radius**2)
        rv_terms.append(sum((abs(dv[a])+ve)**2 for a in range(3)))
    rx=(sum(rx_terms)/6).sqrt(); rv=(sum(rv_terms)/6).sqrt()
    boundaries={-depth,Decimal(0)}
    for rows,shift in ((initial,Decimal(0)),(outgoing,-period)):
        for member in rows:
            for segment in member:
                for t in (segment.t_start+shift,segment.t_end+shift):
                    if -depth <= t <= 0: boundaries.add(t)
    boundaries=sorted(boundaries); rh_pos=Decimal(0); rh_vel=Decimal(0)
    for left,right in zip(boundaries,boundaries[1:]):
        if right<=left: continue
        width=right-left; member_pos=[]; member_vel=[]
        for i in range(6):
            ins=locate(initial[i],left); outs=locate(outgoing[i],period+left)
            ci=translated_coefficients(ins,left); co=translated_coefficients(outs,period+left)
            p_bounds=[];v_bounds=[]
            for axis in range(3):
                delta=tuple(co[axis][j]-ci[axis][j] for j in range(4))
                ep=((delta[0]-dx0[i][axis])/radius-left*dv0[i][axis]/radius,
                    delta[1]/radius-dv0[i][axis]/radius,delta[2]/radius,delta[3]/radius)
                ev=(delta[1]-dv0[i][axis],2*delta[2],3*delta[3],Decimal(0))
                pos_err=(ins.position_error+outs.position_error+2*(initial[i][-1].position_error+outgoing[i][-1].position_error))/radius + abs(left)/radius*(initial[i][-1].velocity_error+outgoing[i][-1].velocity_error)
                vel_err=ins.velocity_error+outs.velocity_error+initial[i][-1].velocity_error+outgoing[i][-1].velocity_error
                p_bounds.append(bernstein_abs_upper(ep,width)+pos_err); v_bounds.append(bernstein_abs_upper(ev,width)+vel_err)
            member_pos.append(sum(x*x for x in p_bounds)); member_vel.append(sum(x*x for x in v_bounds))
        rh_pos=max(rh_pos,(sum(member_pos)/6).sqrt()); rh_vel=max(rh_vel,(sum(member_vel)/6).sqrt())
    expected={}
    phases=[float(x) for x in d["phases"]]; matrix=d["expectedRootCountMatrix"]
    for i in range(6):
        for j in range(6): expected[(f"b13-{i}",f"b13-{j}")]=expected_delays(float(d["beta"]),phases[i],phases[j],i==j,matrix[i][j])
    root_timing=Decimal(0); root_samples=0
    for step in response.get("stepFailures",[]):
        if not step.get("rootAccounting") or Decimal(step.get("attemptedEnd","-1")) < period-depth: continue
        reception=Decimal(step["attemptedEnd"])
        for row in step["rootAccounting"]:
            delays=sorted((reception-(Decimal(r["lower"])+Decimal(r["upper"]))/2 for r in row["roots"]))
            reference=expected[(row["receiverPathId"],row["transmitterPathId"])]
            if len(delays)!=len(reference): raise ValueError("return root ownership changed")
            for actual,want in zip(delays,reference): root_timing=max(root_timing,abs(actual-Decimal(str(want)))/radius); root_samples+=1
    rh=max(rh_pos,rh_vel,root_timing)
    tol=d["acceptanceTolerances"]
    return {"available":True,"action":"identity rotation, zero translation, identity member permutation, one positive lift",
      "R_X_upper":str(rx),"R_V_upper":str(rv),"R_H_upper":str(rh),"historyPositionUpper":str(rh_pos),"historyVelocityUpper":str(rh_vel),"rootTimingUpper":str(root_timing),"rootTimingSamples":root_samples,
      "passed":rx<=Decimal(tol["positionReturn"]) and rv<=Decimal(tol["velocityReturn"]) and rh<=Decimal(tol["retainedHistoryReturn"]) and root_timing<=Decimal(tol["rootTimingReturn"]),
      "authority":"independent exact-decimal cubic Bernstein control bounds plus independent analytic circular root-delay references; bounds include stored reconstruction radii"}


def compare_rungs(left_path: Path, right_path: Path, handoff: dict) -> dict:
    left=json.loads(left_path.read_text()); right=json.loads(right_path.read_text()); radius=Decimal(handoff["declaration"]["radius"])
    period=Decimal(handoff["declaration"]["period"]); position_terms=[]; velocity_terms=[]
    if left.get("status")!="completed" or right.get("status")!="completed":
        return {"available":False,"passed":False,"reason":"both adjacent rungs must complete"}
    le={row["pathId"]:row for row in left["publishedExtensions"]}; re={row["pathId"]:row for row in right["publishedExtensions"]}
    if sorted(le)!=[f"b13-{i}" for i in range(6)] or sorted(re)!=[f"b13-{i}" for i in range(6)]: raise ValueError("adjacent rung member identity differs")
    for i in range(6):
        ls=segment_from(le[f"b13-{i}"]["segments"][-1],f"left-{i}")
        rs=segment_from(re[f"b13-{i}"]["segments"][-1],f"right-{i}")
        lp,lv=ls.nominal_state(period); rp,rv=rs.nominal_state(period)
        pe=ls.position_error+rs.position_error; ve=ls.velocity_error+rs.velocity_error
        position_terms.append(sum((abs(lp[a]-rp[a])+pe)**2 for a in range(3))/radius**2)
        velocity_terms.append(sum((abs(lv[a]-rv[a])+ve)**2 for a in range(3)))
    position=(sum(position_terms)/6).sqrt(); velocity=(sum(velocity_terms)/6).sqrt(); tol=handoff["declaration"]["acceptanceTolerances"]
    return {"available":True,"left":str(left_path),"right":str(right_path),"normalizedPositionUpper":str(position),"normalizedVelocityUpper":str(velocity),
      "positionTolerance":tol["adjacentRungPosition"],"velocityTolerance":tol["adjacentRungVelocity"],
      "passed":position<=Decimal(tol["adjacentRungPosition"]) and velocity<=Decimal(tol["adjacentRungVelocity"]),
      "authority":"independent endpoint cubic evaluation with both stored reconstruction radii; no same-code or bit-parity comparison"}


def main():
    p=argparse.ArgumentParser(); p.add_argument("--handoff",required=True); p.add_argument("--coarse-response"); p.add_argument("--medium-response"); p.add_argument("--fine-response"); p.add_argument("--prehistory-only",action="store_true"); p.add_argument("--out",required=True)
    a=p.parse_args(); handoff_path=Path(a.handoff).resolve(); handoff=json.loads(handoff_path.read_text())
    prehistory=check_handoff(handoff_path)
    supplied=[a.coarse_response,a.medium_response,a.fine_response]
    if a.prehistory_only:
        if any(supplied): raise ValueError("prehistory-only forbids evolution responses")
        response_paths=[]
    else:
        if not all(supplied): raise ValueError("coarse, medium, and fine responses are all required")
        response_paths=[Path(path).resolve() for path in supplied]
    if response_paths and len(set(response_paths)) != 3: raise ValueError("coarse, medium, and fine responses must be distinct files")
    responses=[check_response(path,handoff) for path in response_paths]
    expected_run_ids=["b1-3-circular-coarse-v1","b1-3-circular-medium-v1","b1-3-circular-fine-v1"]
    if responses and [row["runId"] for row in responses] != expected_run_ids: raise ValueError("response run identities do not match coarse, medium, and fine requests")
    comparisons=[compare_rungs(response_paths[i-1],response_paths[i],handoff) for i in range(1,len(response_paths))]
    result={"schema":"braid-program/b1-3-circular-release-independent-checkpoint.v1","accepted":prehistory["accepted"] and len(responses)==3 and all(r["reachedOneCycle"] and r["rootCensus"]["bijectiveOwnership"] and r["returnMetrics"].get("passed") for r in responses) and len(comparisons)==2 and all(c["passed"] for c in comparisons),
            "prehistory":prehistory,"responses":responses,"adjacentRungComparisons":comparisons,
            "returnMetricsPolicy":"M10-M12 are computed independently per completed rung under the one frozen identity action; incomplete rungs remain unavailable",
            "questions4And5Started":False}
    Path(a.out).write_text(json.dumps(result,indent=2)+"\n")
    print(json.dumps({"accepted":result["accepted"],"prehistoryAccepted":prehistory["accepted"],"responses":len(responses)}))


if __name__=="__main__": main()
