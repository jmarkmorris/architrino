#!/usr/bin/env python
"""Independent finite off-equator oblate Surface qualification instrument.

Run --known-only and retain its receipt before reading any EOM result. This
instrument imports frozen independent reference helpers, never production EOM.
Pass explicit --compare edges only for matched q=1/sphere or oblate refinements.
"""
from __future__ import annotations

import argparse
from fractions import Fraction as Q
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import time

HELPER = Path(__file__).with_name("surface-stage-d-reference.py")
HELPER_SHA = "20f1534998299e4c6202b51b93b42938043e6ab3c3d8ab9ecbb14e72af80c976"
spec = importlib.util.spec_from_file_location("frozen_surface_reference", HELPER)
d = importlib.util.module_from_spec(spec)
spec.loader.exec_module(d)
k, mp = d.k, d.mp
require, out = d.require, d.out
RESIDUAL_LIMIT, PRECISION_LIMIT = d.RESIDUAL_LIMIT, d.PRECISION_LIMIT
ORACLE_SHA = "a3b94301b2994c29e1107de44d627db9566abe9cda60ec8e00b89d9351a275f6"
PHASES = ("0", "1.0471975511965977461542144610931676",
          "2.0943951023931954923084289221863353",
          "3.1415926535897932384626433832795029",
          "4.1887902047863909846168578443726705",
          "5.2359877559829887307710723054658381")


def fingerprint(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def weights(radius, flattening):
    a, c = mp.mpf(radius), mp.mpf(radius) * mp.mpf(flattening)
    return k.vector((1/a**2, 1/a**2, 1/c**2))


def diagonal(diag, vector):
    return k.vector(diag[i] * vector[i] for i in range(3))


def quadratic_parts(x, v, interaction, diag):
    """Normal-only support derived from twice differentiating X^T D X=1."""
    u = diagonal(diag, x)
    u2 = k.dot(u, u)
    require(u2 > 0, "quadratic normal is singular")
    normal = k.scale(k.dot(u, interaction)/u2, u)
    tangent = k.subtract(interaction, normal)
    curvature = k.scale(-k.dot(v, diagonal(diag, v))/u2, u)
    support = k.subtract(curvature, normal)
    return dict(netInteraction=interaction, tangentInteraction=tangent,
                discardedNormal=normal, curvature=curvature, support=support,
                totalAcceleration=k.add(tangent, curvature))


class LatitudeHistory(d.History):
    """Frozen cubic evaluator with a separately authored constant-height past."""
    def __call__(self, time):
        if time > self.prepared_end:
            return super().__call__(time)
        p = self.preparation
        require(time >= mp.mpf(p["start"]), "point before declared memory")
        require(all(Q(p.get(key, "0")) == 0 for key in ("tiltX", "tiltY")),
                "reference requires untilted circular preparation")
        require(Q(p["speed"]) == abs(Q(p["radius"])*Q(p["angularSpeed"])),
                "exact circular radius/speed mismatch")
        r, w = mp.mpf(p["radius"]), mp.mpf(p["angularSpeed"])
        angle = mp.mpf(p["phase"]) + w*time
        return k.HistoryState(k.vector((r*mp.cos(angle), r*mp.sin(angle), mp.mpf(p["height"]))),
                              k.vector((-r*w*mp.sin(angle), r*w*mp.cos(angle), 0)))


def weighted_dot(a, b, diag):
    return d.pdot([[diag[i]*c for c in a[i]] for i in range(3)], b)


def dense_screen(segment, radius, flattening):
    """Exact rational Bernstein nominal ranges plus separately derived tubes."""
    a, c = Q(radius), Q(radius)*Q(flattening)
    diag = (1/a**2, 1/a**2, 1/c**2)
    coefficients = [[Q(x) for x in row] for row in segment["coefficients"]]
    velocity = [[(i+1)*row[i+1] for i in range(3)] for row in coefficients]
    h = Q(segment["end"])-Q(segment["start"])
    require(h > 0, "nonpositive retained segment")
    ranges = {
        "xx": d.dense_range(d.pdot(coefficients, coefficients), h),
        "vv": d.dense_range(d.pdot(velocity, velocity), h),
        "phi1": d.dense_range(weighted_dot(coefficients, coefficients, diag), h),
        "xDv": d.dense_range(weighted_dot(coefficients, velocity, diag), h),
        "Dx2": d.dense_range(weighted_dot(coefficients, coefficients, tuple(x*x for x in diag)), h),
        "Dv2": d.dense_range(weighted_dot(velocity, velocity, tuple(x*x for x in diag)), h),
    }
    require(ranges["phi1"][0] > 0 and ranges["Dx2"][0] > 0,
            "dense nominal quadratic normal cannot be certified")
    require(all(Q(value)>=0 for key in ("positionErrors","velocityErrors") for value in segment[key]), "negative component error radius")
    ex = k.norm(k.vector(segment["positionErrors"]))
    ev = k.norm(k.vector(segment["velocityErrors"]))
    max_x = mp.sqrt(d.qmp(ranges["xx"][1]))
    max_v = mp.sqrt(max(0, d.qmp(ranges["vv"][1])))
    max_u = mp.sqrt(d.qmp(ranges["Dx2"][1]))
    max_Dv = mp.sqrt(max(0, d.qmp(ranges["Dv2"][1])))
    lower_u = mp.sqrt(d.qmp(ranges["Dx2"][0]))
    largest = d.qmp(max(diag))
    tube_lower = lower_u-largest*ex
    require(tube_lower > 0, "dense quadratic normal tube reaches zero")
    radial = mp.mpf(radius)*max(abs(mp.sqrt(d.qmp(value))-1) for value in ranges["phi1"])
    tangent = max(abs(d.qmp(value)) for value in ranges["xDv"])
    return dict(distance=radial+ex,
                tangent=(tangent+max_u*ev+max_Dv*ex+largest*ex*ev)/tube_lower,
                speed=max_v+ev, nominalDistance=radial,
                nominalTangent=tangent/lower_u, nominalSpeed=max_v,
                ambientRadius=max_x+ex, normalLower=tube_lower)


def controls():
    require(fingerprint(HELPER) == HELPER_SHA, "frozen reference helper identity changed")
    require(fingerprint(k.__file__) == ORACLE_SHA, "frozen interaction oracle identity changed")
    original = d.controls()
    mp.dps = 100
    a, c, rho, z, w = map(mp.mpf, (".1", ".06", ".06", ".048", ".1"))
    x, v = k.vector((rho, 0, z)), k.vector((0, rho*w, 0))
    diag = weights(a, c/a)
    # Parameterization Y=(a cos(lambda)cos(theta),a cos(lambda)sin(theta),c sin(lambda)).
    # At sin(lambda)=.8, cos(lambda)=.6, theta=0, cross(Y_theta,Y_lambda)
    # independently supplies the outward normal; project the known circle Y''.
    theta_derivative = k.vector((0, rho, 0))
    latitude_derivative = k.vector((-a*mp.mpf(".8"), 0, c*mp.mpf(".6")))
    cross = k.vector((theta_derivative[1]*latitude_derivative[2], 0,
                      -theta_derivative[1]*latitude_derivative[0]))
    n = k.scale(1/k.norm(cross), cross)
    circle_acceleration = k.vector((-rho*w*w, 0, 0))
    normal_acceleration = k.scale(k.dot(n, circle_acceleration), n)
    zero = k.vector((0, 0, 0))
    parts = quadratic_parts(x, v, zero, diag)
    require(k.norm(k.subtract(parts["curvature"], normal_acceleration)) < mp.mpf("1e-85"),
            "parameterized oblate normal curvature mismatch")
    geodesic = k.subtract(circle_acceleration, normal_acceleration)
    require(abs(k.dot(n, geodesic)) < mp.mpf("1e-85") and k.norm(geodesic) > 0,
            "off-equator geodesic curvature control")
    require(k.norm(k.subtract(parts["curvature"], k.vector((-mp.mpf(".1944")/1924, 0, -mp.mpf(".432")/1924)))) < mp.mpf("1e-85"),
            "exact latitude normal curvature control")
    interaction=k.vector((".002","-.003",".004"))
    coupled=quadratic_parts(x,v,interaction,diag)
    expected_normal=k.scale(k.dot(n,interaction),n)
    expected_tangent=k.subtract(interaction,expected_normal)
    require(k.norm(k.subtract(coupled["discardedNormal"],expected_normal))<mp.mpf("1e-85") and
            k.norm(k.subtract(coupled["tangentInteraction"],expected_tangent))<mp.mpf("1e-85") and
            k.norm(k.subtract(coupled["support"],k.subtract(normal_acceleration,expected_normal)))<mp.mpf("1e-85"),
            "parameterized oblate interaction projector/support control")
    wrong = k.scale(-1, parts["curvature"])
    require(abs(k.dot(diagonal(diag,x),wrong)+k.dot(v,diagonal(diag,v))) > mp.mpf(".001"),
            "wrong curvature sign negative not detected")
    unflattened = quadratic_parts(x, v, zero, weights(a, 1))
    require(k.norm(k.subtract(unflattened["curvature"], normal_acceleration)) > mp.mpf("1e-5"),
            "omitted flattening negative not detected")
    sx, interaction = k.vector((".06",0,".08")), k.vector((".002","-.003",".004"))
    flat_limit = quadratic_parts(sx,v,interaction,weights(a,1))
    spherical = d.sphere(sx,v,interaction)
    require(all(k.norm(k.subtract(flat_limit[key], spherical[key])) < mp.mpf("1e-85") for key in flat_limit),
            "q=1 spherical projector/curvature limit mismatch")
    safe = dict(start="0",end="1",coefficients=[[".06","0","0","0"],["0","0","0","0"],[".048","0","0","0"]],positionErrors=["0"]*3,velocityErrors=["0"]*3)
    require(dense_screen(safe,".1",".6")["distance"] < mp.mpf("1e-85"), "exact stationary oblate control")
    bow = dict(safe,coefficients=[[".06","0","0","0"],["0",".01","-.01","0"],[".048","0","0","0"]])
    require(dense_screen(bow,".1",".6")["distance"] > mp.mpf("1e-8"), "between-endpoint geometry bow missed")
    require(weighted_dot([[Q(".06")],[Q(0)],[Q(".048")]],[[Q(".06")],[Q(0)],[Q(".048")]],(Q(100),Q(100),Q(2500,9))) == [Q(1)], "weighted quadratic rational control")
    prep=dict(start="-.5",end="0",radius=".06",height=".048",angularSpeed=".1",speed=".006",phase="0")
    require(LatitudeHistory(prep,[])(mp.mpf("-.1")).position[2] == mp.mpf(".048"), "constant-height preparation control")
    print("Known parameterized oblate normal/geodesic curvature, q=1 limit, wrong-sign/omitted-flattening and full-interior controls passed BEFORE target reads.",file=sys.stderr,flush=True)
    return dict(status="passed", frozenControls=original,
                oblateCurvature=[out(t) for t in normal_acceleration],
                geodesicCurvature=[out(t) for t in geodesic],qOneLimit=True,
                wrongSignRejected=True,omittedFlatteningRejected=True,interiorBowRejected=True)


def validate_case(request):
    m,g = request["model"],request["model"]["geometry"]
    require(m["compositionId"]=="canonical-surface/v1" and m["fieldSpeed"]=="1" and
            Q(m["coupling"])==Q(".000001") and m["speedDomain"]=="unrestricted" and m["constraint"]=="surface" and m.get("boundaryPolicy","none")=="none" and m.get("method","numerical")=="numerical", "scenario selection mismatch")
    require(g["kind"] in ("sphere","oblate") and Q(g["radius"])==Q(".1"), "unsupported fixed shape")
    require(all(Q(x)==0 for x in g.get("center",["0"]*3)),"translated scenario outside reference")
    require(all(Q(x)==(1 if i==j else 0) for i,row in enumerate(g.get("orientation",[["1","0","0"],["0","1","0"],["0","0","1"]])) for j,x in enumerate(row)),"rotated scenario outside reference")
    q = g.get("flattening","1") if g["kind"]=="oblate" else "1"
    require(Q(q) in (Q(".6"),Q(1)), "unexpected flattening")
    z = ".048" if Q(q)==Q(".6") else ".08"
    require(Q(request["interval"]["start"])==0 and Q(request["interval"]["end"])==Q(".15"), "finite interval differs from declared experiment")
    require(len(request["paths"])==6,"reference requires six paths")
    for i,p in enumerate(request["paths"]):
        h=p["history"]
        require(p["pathId"]==f"p{i}" and p["charge"]==("-1" if i%2 else "1") and h["kind"]=="uniform-circular" and h["phase"]==PHASES[i],"3:3 phase/polarity preparation mismatch")
        require(all(Q(h[key])==Q(value) for key,value in (("start","-.5"),("end","0"),("radius",".06"),("height",z),("angularSpeed",".1"),("speed",".006"))),"latitude preparation mismatch")
        require(Q(h["radius"])**2/Q(g["radius"])**2+Q(h["height"])**2/(Q(g["radius"])*Q(q))**2==1,"prepared latitude is not on selected surface")
    return g["radius"],q


def evaluate_case(name, request, response, precision):
    mp.dps=precision
    radius,q = validate_case(request)
    diag=weights(radius,q)
    paths={p["pathId"]:p for p in request["paths"]}
    records={r["pathId"]:r["segments"] for r in response["checkpoint"]["data"]["histories"]}
    require(set(records)==set(paths),"output population mismatch")
    history={id:LatitudeHistory(paths[id]["history"],segments) for id,segments in records.items()}
    roots_index=d.index_boxes(response["ledgers"]["partnerRoots"],("receiverPathId","transmitterPathId"))
    diagnostic_index=d.index_boxes(response["surfaceDiagnostics"],("pathId",))
    solution_rows=response["ledgers"]["surfaceSolutions"]
    solutions={(s["pathId"],mp.mpf(s["start"]),mp.mpf(s["end"])):s for s in solution_rows}
    require(len(solutions)==len(solution_rows),"duplicate solution certificate identity")
    start,end=mp.mpf(request["interval"]["start"]),mp.mpf(response["acceptedCoverage"]["end"])
    require(end==mp.mpf(request["interval"]["end"]),"run did not reach declared endpoint")
    require(set(roots_index)=={(a,b) for a in paths for b in paths if a!=b},"ordered full-slab partner accounting missing")
    require(set(diagnostic_index)=={(id,) for id in paths},"receiver diagnostic population missing")
    for index in (roots_index,diagnostic_index):
        for _,rows in index.values():d.cover(rows,start,end)
    snapshots=response["ledgers"]["pointRoots"]
    require(snapshots,"point-root ledger absent")
    for snapshot in snapshots:
        rows=snapshot["pairs"]
        pairs={(r["receiverPathId"],r["transmitterPathId"]):r for r in rows}
        require(len(rows)==36 and set(pairs)=={(a,b) for a in paths for b in paths},"complete point ordered-pair accounting missing")
        require(all(len(row["roots"])==(0 if a==b else 1) for (a,b),row in pairs.items()),"self/partner point multiplicity mismatch")
    maximum={key:mp.mpf(0) for key in ("distance","tangent","speed","nominalDistance","nominalTangent","nominalSpeed","ambientRadius","odeResidual","causalResidual","normalLeak","supportTangentLeak","interaction","tangentInteraction","joinPositionGap","joinVelocityGap","meridionalPositionChange","meridionalSpeed")}
    points=[];root_count=computed=segment_count=0
    earliest=mp.mpf("-.5")
    for id,segments in records.items():
        previous=None;frontier=start
        for segment in segments:
            lo,hi=mp.mpf(segment["start"]),mp.mpf(segment["end"])
            if hi<=start:continue
            require(lo==frontier and hi<=end,"retained future coverage gap/overrun")
            frontier=hi;segment_count+=1
            screen=dense_screen(segment,radius,q)
            for key,value in screen.items():
                if key in maximum:maximum[key]=max(maximum[key],value)
            require(screen["speed"]<mp.mpf(".02") and screen["ambientRadius"]<mp.mpf(".1001"),"whole-time finite-chart proof margin fails")
            right_x=k.vector(row[0] for row in segment["coefficients"])
            right_v=k.vector(row[1] for row in segment["coefficients"])
            if previous:
                h=mp.mpf(previous["end"])-mp.mpf(previous["start"])
                pc=[[mp.mpf(c) for c in row] for row in previous["coefficients"]]
                left_x=k.vector(c[0]+h*(c[1]+h*(c[2]+h*c[3])) for c in pc)
                left_v=k.vector(c[1]+h*(2*c[2]+h*3*c[3]) for c in pc)
            else:
                initial=history[id](start);left_x,left_v=initial.position,initial.velocity
            for field,left,right,error in (("Position",left_x,right_x,"positionErrors"),("Velocity",left_v,right_v,"velocityErrors")):
                delta=k.subtract(left,right)
                maximum["join"+field+"Gap"]=max(maximum["join"+field+"Gap"],k.norm(delta))
                for i in range(3):
                    budget=mp.mpf(segment[error][i])+(mp.mpf(previous[error][i]) if previous else 0)
                    require(abs(delta[i])<=budget+mp.mpf("1e-60"),"join/preparation endpoint tubes incompatible")
            previous=segment
            reception=(lo+hi)/2;receiver=history[id];state=receiver(reception)
            terms=[];root_values=[]
            for source_id,source in history.items():
                if source_id==id:continue
                emission,residual=d.solve(receiver,source,reception,earliest)
                factor=k.normal_factors(receiver,source,reception,emission,1)[0]
                row=d.box_at(roots_index,reception,(id,source_id))
                d.boxes_contains((emission,factor),(row["emission"],row["factor"]),"independent partner root/factor")
                terms.append(k.sharp_root_acceleration(receiver,source,reception,emission,1,request["model"]["coupling"],mp.mpf(paths[id]["charge"])*mp.mpf(paths[source_id]["charge"])))
                maximum["causalResidual"]=max(maximum["causalResidual"],residual)
                root_values.append((source_id,emission,factor));root_count+=1;computed+=emission>0
            interaction=k.vector(mp.fsum(term[i] for term in terms) for i in range(3))
            parts=quadratic_parts(state.position,state.velocity,interaction,diag)
            row=d.box_at(diagnostic_index,reception,(id,))
            for key,value in parts.items():d.boxes_contains(value,row[key],key)
            solution=solutions[(id,lo,hi)]
            d.boxes_contains(parts["totalAcceleration"],solution["accelerationBound"],"independent solution acceleration")
            u=diagonal(diag,state.position)
            maximum["normalLeak"]=max(maximum["normalLeak"],abs(k.dot(u,parts["tangentInteraction"])))
            support=parts["support"]
            maximum["supportTangentLeak"]=max(maximum["supportTangentLeak"],k.norm(k.subtract(support,k.scale(k.dot(support,u)/k.dot(u,u),u))))
            maximum["interaction"]=max(maximum["interaction"],k.norm(interaction))
            maximum["tangentInteraction"]=max(maximum["tangentInteraction"],k.norm(parts["tangentInteraction"]))
            offset=reception-lo
            acceleration=k.vector(2*mp.mpf(c[2])+6*offset*mp.mpf(c[3]) for c in segment["coefficients"])
            residual=k.norm(k.subtract(acceleration,parts["totalAcceleration"]))
            maximum["odeResidual"]=max(maximum["odeResidual"],residual)
            require(residual<=mp.mpf(RESIDUAL_LIMIT),"point ODE residual exceeds predeclared budget")
            maximum["meridionalPositionChange"]=max(maximum["meridionalPositionChange"],abs(state.position[2]-mp.mpf(paths[id]["history"]["height"])))
            maximum["meridionalSpeed"]=max(maximum["meridionalSpeed"],abs(state.velocity[2]))
            points.append(dict(path=id,time=reception,roots=root_values,acceleration=parts["totalAcceleration"]))
        require(frontier==end,"path ends before accepted endpoint")
        print(f"{name} dps={precision} path={id} roots={root_count} computed={computed}",file=sys.stderr,flush=True)
    require(len(solutions)==segment_count,"solution certificate population/segment mismatch")
    require(computed>0 and maximum["interaction"]>0 and maximum["tangentInteraction"]>0,"computed interaction/feedback absent")
    require(maximum["meridionalPositionChange"]>mp.mpf("1e-12") and maximum["meridionalSpeed"]>mp.mpf("1e-12"),"off-equator meridional motion not exercised")
    require(maximum["distance"]<=mp.mpf(request["numerics"]["surfacePositionTolerance"]) and maximum["tangent"]<=mp.mpf(request["numerics"]["surfaceTangentVelocityTolerance"]),"independent full polynomial+tube geometry screen exceeds budget")
    minimum_phase=min(mp.mpf(PHASES[i+1])-mp.mpf(PHASES[i]) for i in range(5))
    minimum_phase=min(minimum_phase,2*mp.pi-mp.mpf(PHASES[-1]))
    separation=2*mp.mpf(".06")*mp.sin(minimum_phase/2)-2*maximum["speed"]*end
    require(minimum_phase>mp.mpf("1.04") and separation>0,"conditional whole-time partner separation margin fails")
    root_proof=dict(minimumInitialPhase=out(minimum_phase),simultaneousPartnerSeparationLower=out(separation),monotonicityLower=out(1-max(maximum["speed"],mp.mpf(".006"))),oldMemoryResidualUpper=out(2*mp.mpf(".1001")-mp.mpf(".5")),scope="Conditional on coherent validated solutions, one strictly past partner root and no positive self root throughout declared memory/window; older tail excluded only under the same fixed-surface/tube assumption.")
    return dict(points=points,maximum=maximum,partnerRoots=root_count,computedSourceRoots=computed,histories=history,records=records,shape=(radius,q),rootProof=root_proof)


def main():
    parser=argparse.ArgumentParser(__doc__)
    parser.add_argument("--known-only",action="store_true")
    parser.add_argument("--case",action="append",nargs=3,metavar=("NAME","REQUEST","RESPONSE"),default=[])
    parser.add_argument("--compare",action="append",nargs=2,metavar=("FIRST","SECOND"),default=[])
    args=parser.parse_args();started=time.monotonic();known=controls()
    if args.known_only:
        print(json.dumps(dict(schema="surface-oblate-known-reference/v1",knownControls=known,targetReads=0,sourceSha256=fingerprint(__file__),helperSha256=fingerprint(HELPER),oracleSha256=fingerprint(k.__file__))));return
    require(args.case,"at least one explicit case required")
    evaluated={};summary={}
    for name,request_file,response_file in args.case:
        require(name not in evaluated,"duplicate case name")
        rq,rs=Path(request_file).read_bytes(),Path(response_file).read_bytes()
        request,response=json.loads(rq),json.loads(rs);request=request.get("request",request)
        coarse=evaluate_case(name,request,response,70);fine=evaluate_case(name,request,response,100)
        root_difference=acceleration_difference=mp.mpf(0)
        require(len(coarse["points"])==len(fine["points"]),"precision point population differs")
        for low,high in zip(coarse["points"],fine["points"]):
            require(low["path"]==high["path"] and abs(low["time"]-high["time"])<mp.mpf("1e-60"),"precision point identity differs")
            acceleration_difference=max(acceleration_difference,k.norm(k.subtract(low["acceleration"],high["acceleration"])))
            for a,b in zip(low["roots"],high["roots"]):
                require(a[0]==b[0],"precision source identity differs")
                root_difference=max(root_difference,abs(a[1]-b[1]),abs(a[2]-b[2]))
        require(root_difference<mp.mpf(PRECISION_LIMIT) and acceleration_difference<mp.mpf(PRECISION_LIMIT),"70/100 precision disagreement")
        summary[name]=dict(requestSha256=hashlib.sha256(rq).hexdigest(),responseSha256=hashlib.sha256(rs).hexdigest(),shape=dict(radius=fine["shape"][0],flattening=fine["shape"][1]),midpointPoints=len(fine["points"]),partnerRoots=fine["partnerRoots"],computedSourceRoots=fine["computedSourceRoots"],maximum={key:out(value) for key,value in fine["maximum"].items()},precisionRootFactorDifference=out(root_difference),precisionAccelerationDifference=out(acceleration_difference),wholeTimeRootProof=fine["rootProof"])
        evaluated[name]=fine
    comparisons={}
    for first,second in args.compare:
        a,b=evaluated[first],evaluated[second]
        require(Q(a["shape"][0])==Q(b["shape"][0]) and Q(a["shape"][1])==Q(b["shape"][1]),"shape change is not refinement/matched q=1 comparison")
        comparisons[f"{first}:{second}"]=d.compare(a,b)
    contrast=None
    if "oblate-base" in evaluated and "q1-control" in evaluated:
        a,b=evaluated["oblate-base"],evaluated["q1-control"]
        t=mp.mpf(".15");contrast_rows=[]
        for id,first in a["histories"].items():
            second=b["histories"][id]
            delta=(first(t).position[2]-mp.mpf(first.preparation["height"]))-(second(t).position[2]-mp.mpf(second.preparation["height"]))
            budget=sum(mp.mpf(case["records"][id][-1]["positionErrors"][2]) for case in (a,b))
            require(abs(delta)>budget+mp.mpf("1e-12"),"meridional shape contrast unresolved within emitted radii")
            contrast_rows.append(dict(path=id,time=out(t),meridionalDisplacementDifference=out(delta),summedPositionRadius=out(budget)))
        contrast=dict(rows=contrast_rows,scope="Changed-q endpoint meridional displacement relative to each exact initial height; exhibits this matched-latitude scenario's shape effect, not a refinement or isolated universal constitutive law.")
    print(json.dumps(dict(schema="surface-oblate-independent-reference/v1",status="passed",knownControls=known,sourceSha256=fingerprint(__file__),helperSha256=fingerprint(HELPER),oracleSha256=fingerprint(k.__file__),residualLimit=RESIDUAL_LIMIT,precisionLimit=PRECISION_LIMIT,referencePrecisions=[70,100],cases=summary,matchedComparisons=comparisons,shapeContrast=contrast,wallSeconds=time.monotonic()-started,scope="Independent delayed point roots/kernel/quadratic support and ODE residual; rational full-segment nominal weighted polynomial screens plus declared tubes; conditional whole-time causal uniqueness. Reviewed production inclusion remains the solution-existence premise. No independent full-slab solution proof, UI, stability, energy or torus qualification.")))


if __name__=="__main__":main()
