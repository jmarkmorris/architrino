#!/usr/bin/env python
"""Independent finite inner/outer ring-torus Surface reference.

Run --known-only and preserve its receipt before target reads. Uses frozen
independent history/root/kernel helpers; no production EOM imports. Explicit
--compare edges must preserve both geometry and latitude preparation.
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

OBLATE = Path(__file__).with_name("surface-oblate-reference.py")
OBLATE_SHA = "12f3e2e9e150040e7cb78ead946cbd04191ee21739d798cfc8d29315556f371c"
spec = importlib.util.spec_from_file_location("frozen_latitude_reference", OBLATE)
o = importlib.util.module_from_spec(spec)
spec.loader.exec_module(o)
d, k, mp = o.d, o.k, o.mp
require, out, fingerprint = d.require, d.out, o.fingerprint
HELPER, HELPER_SHA, ORACLE_SHA = o.HELPER, o.HELPER_SHA, o.ORACLE_SHA
LatitudeHistory, PHASES = o.LatitudeHistory, o.PHASES
RESIDUAL_LIMIT, PRECISION_LIMIT = d.RESIDUAL_LIMIT, d.PRECISION_LIMIT


def torus_gradient(x, major, minor):
    u = k.dot(x, x) + major*major - minor*minor
    return k.vector(4*(u-2*major*major)*x[i] if i < 2 else 4*u*x[i] for i in range(3))


def torus_parts(x, v, interaction, major, minor):
    """Differentiate quartic (X.X+L²-r²)²-4L²(X²+Y²) independently."""
    g = torus_gradient(x, major, minor)
    g2 = k.dot(g, g)
    require(g2 > 0, "torus quartic normal is singular")
    u = k.dot(x, x) + major*major - minor*minor
    # Product rule: V^T H V = 8(X.V)^2 +4u(V.V)-8L²(Vx²+Vy²).
    vhv = 8*k.dot(x,v)**2 + 4*u*k.dot(v,v) - 8*major*major*(v[0]**2+v[1]**2)
    normal = k.scale(k.dot(g, interaction)/g2, g)
    tangent = k.subtract(interaction, normal)
    curvature = k.scale(-vhv/g2, g)
    support = k.subtract(curvature, normal)
    return dict(netInteraction=interaction, tangentInteraction=tangent,
                discardedNormal=normal, curvature=curvature, support=support,
                totalAcceleration=k.add(tangent,curvature))


def dense_screen(segment, major, minor):
    """Exact rational polynomial ranges; geometric factorization and tube bounds.

    Phi=psi*B, psi=(rho-L)^2+z^2-r², B=(rho+L)^2+z²-r².
    With rho>0 and B>0, |distance|=|psi|/(s+r), s²=psi+r².
    gPhi=B*gPsi+psi*gB gives a lower normal bound. Norm(H) is
    bounded by 12*R²+12*L²+4*r² on the entire position tube.
    """
    L, r = Q(major), Q(minor)
    require(L>r>0,"reference requires a ring torus")
    x=[[Q(t) for t in row] for row in segment["coefficients"]]
    v=[[(i+1)*row[i+1] for i in range(3)] for row in x]
    h=Q(segment["end"])-Q(segment["start"])
    require(h>0,"nonpositive retained segment")
    xx=d.pdot(x,x);rho2=d.pdot(x[:2],x[:2]);z2=d.pmul(x[2],x[2])
    u=d.padd(xx,[L*L-r*r])
    phi=d.padd(d.pmul(u,u),[-4*L*L*t for t in rho2])
    radial_u=d.padd(u,[-2*L*L])
    g=[[4*t for t in d.pmul(radial_u if i<2 else u,row)] for i,row in enumerate(x)]
    ranges={key:d.dense_range(poly,h) for key,poly in
            (("xx",xx),("rho2",rho2),("z2",z2),("vv",d.pdot(v,v)),
             ("phi",phi),("gv",d.pdot(g,v)))}
    require(ranges["rho2"][0]>0,"nominal torus history reaches axis")
    require(all(Q(t)>=0 for key in ("positionErrors","velocityErrors") for t in segment[key]),"negative error radius")
    ex=k.norm(k.vector(segment["positionErrors"]));ev=k.norm(k.vector(segment["velocityErrors"]))
    lo_rho,hi_rho=(mp.sqrt(d.qmp(t)) for t in ranges["rho2"])
    zlo=max(mp.mpf(0),d.qmp(ranges["z2"][0]));zhi=max(mp.mpf(0),d.qmp(ranges["z2"][1]))
    Lm,rm=mp.mpf(major),mp.mpf(minor)
    radial_min=0 if lo_rho<=Lm<=hi_rho else min(abs(lo_rho-Lm),abs(hi_rho-Lm))
    smin=mp.sqrt(radial_min**2+zlo)
    Bmin=(lo_rho+Lm)**2+zlo-rm*rm
    require(smin>0 and Bmin>0 and lo_rho>ex,"torus position tube/regularity not separated")
    max_phi=max(abs(d.qmp(t)) for t in ranges["phi"])
    psi_max=max_phi/Bmin
    gradient_lower=2*Bmin*smin-psi_max*2*mp.sqrt((hi_rho+Lm)**2+zhi)
    max_x=mp.sqrt(max(0,d.qmp(ranges["xx"][1])))
    max_v=mp.sqrt(max(0,d.qmp(ranges["vv"][1])))
    Hessian_upper=12*(max_x+ex)**2+12*Lm*Lm+4*rm*rm
    gradient_tube_lower=gradient_lower-Hessian_upper*ex
    require(gradient_tube_lower>0,"quartic gradient tube reaches zero")
    nominal_distance=psi_max/(smin+rm)
    nominal_tangent=max(abs(d.qmp(t)) for t in ranges["gv"])/gradient_lower
    return dict(distance=nominal_distance+ex,
                tangent=nominal_tangent+ev+max_v*Hessian_upper*ex/gradient_tube_lower,
                speed=max_v+ev,nominalDistance=nominal_distance,
                nominalTangent=nominal_tangent,nominalSpeed=max_v,
                ambientRadius=max_x+ex,normalLower=gradient_tube_lower,
                axisLower=lo_rho-ex)


def controls():
    require(fingerprint(OBLATE)==OBLATE_SHA,"frozen latitude helper changed")
    require(fingerprint(HELPER)==HELPER_SHA,"frozen root/cubic helper changed")
    require(fingerprint(k.__file__)==ORACLE_SHA,"frozen kernel changed")
    original=d.controls();mp.dps=100
    L,r,w=map(mp.mpf,(".1",".05",".1"));zero=k.vector((0,0,0))
    results=[]
    for rho,cosine,expected in ((".13",".6",("-.000468",0,"-.000624")),
                                (".07","-.6",("-.000252",0,".000336"))):
        rho,co=mp.mpf(rho),mp.mpf(cosine);si=mp.mpf(".8")
        x=k.vector((rho,0,r*si));n=k.vector((co,0,si))
        # X_phi=(0,rho,0), X_theta=(-r*sin(theta),0,r*cos(theta)).
        # Their cross product / (rho*r) is the outward unit normal.
        Xphi=k.vector((0,rho,0));Xtheta=k.vector((-r*si,0,r*co))
        cross=k.vector((Xphi[1]*Xtheta[2],0,-Xphi[1]*Xtheta[0]))
        require(k.norm(k.subtract(k.scale(1/k.norm(cross),cross),n))<mp.mpf("1e-85"),"parameterized torus normal control")
        velocity=k.scale(w,Xphi);parts=torus_parts(x,velocity,zero,L,r)
        require(k.norm(k.subtract(parts["curvature"],k.vector(expected)))<mp.mpf("1e-85"),"exact inner/outer azimuth curvature control")
        require(k.norm(k.subtract(torus_gradient(x,L,r),k.scale(8*L*rho*r,n)))<mp.mpf("1e-85"),"quartic and parameterized normal mismatch")
        for td,pd in ((".2","0"),(".2",".1")):
            td,pd=mp.mpf(td),mp.mpf(pd)
            velocity=k.add(k.scale(td,Xtheta),k.scale(pd,Xphi))
            curvature=k.scale(-(r*td*td+rho*co*pd*pd),n)
            actual=torus_parts(x,velocity,zero,L,r)["curvature"]
            require(k.norm(k.subtract(actual,curvature))<mp.mpf("1e-85"),"parameterized second fundamental form control")
        interaction=k.vector((".002","-.003",".004"))
        velocity=k.scale(w,Xphi);parts=torus_parts(x,velocity,interaction,L,r)
        normal=k.scale(k.dot(n,interaction),n)
        require(k.norm(k.subtract(parts["discardedNormal"],normal))<mp.mpf("1e-85"),"torus interaction projector control")
        require(k.norm(k.subtract(parts["support"],k.subtract(k.vector(expected),normal)))<mp.mpf("1e-85"),"torus net-only support control")
        require(k.norm(k.subtract(k.scale(-1,parts["curvature"]),k.vector(expected)))>mp.mpf("1e-4"),"wrong curvature sign negative missed")
        require(k.norm(k.subtract(d.sphere(x,velocity,zero)["curvature"],parts["curvature"]))>mp.mpf("1e-4"),"sphere substitution negative missed")
        safe=dict(start="0",end="1",coefficients=[[str(rho),"0","0","0"],["0","0","0","0"],[".04","0","0","0"]],positionErrors=["0"]*3,velocityErrors=["0"]*3)
        require(dense_screen(safe,".1",".05")["distance"]<mp.mpf("1e-85"),"exact static torus dense control")
        bow=dict(safe,coefficients=[[str(rho),"0","0","0"],["0",".01","-.01","0"],[".04","0","0","0"]])
        require(dense_screen(bow,".1",".05")["distance"]>mp.mpf("1e-8"),"between-endpoint torus bow missed")
        inflation=dense_screen(dict(safe,positionErrors=["1e-5"]*3,velocityErrors=["1e-6"]*3),".1",".05")
        # sqrt(3)>1.7 supplies a strict analytical margin, avoiding an
        # equality comparison between differently rounded sqrt products.
        require(inflation["distance"]>mp.mpf("1.7e-5") and inflation["tangent"]>mp.mpf("1.7e-6"),"position/velocity tube inflation omitted")
        results.append(dict(latitudeRadius=out(rho),normal=[out(t) for t in n],curvature=[out(t) for t in k.vector(expected)]))
    receiver=k.inertial_history((".13",0,".04"),(0,0,0))
    source=k.inertial_history(("-.13",0,".04"),(0,0,0))
    root,residual=d.solve(receiver,source,mp.mpf(".05"),mp.mpf("-.5"))
    require(abs(root+mp.mpf(".21"))<mp.mpf("1e-85"),"static torus antipodal delay control")
    acceleration=k.sharp_root_acceleration(receiver,source,".05",root,1,"1e-6",-1)
    expected=k.vector((-mp.mpf("1e-6")/mp.mpf(".26")**2,0,0))
    require(k.norm(k.subtract(acceleration,expected))<mp.mpf("1e-85"),"static torus antipodal kernel control")
    projector=torus_parts(receiver(mp.mpf(0)).position,zero,acceleration,L,r)
    require(k.norm(k.subtract(projector["tangentInteraction"],k.vector((mp.mpf(".64")*expected[0],0,-mp.mpf(".48")*expected[0]))))<mp.mpf("1e-85"),"exact static torus kernel/projector control")
    print("Known parameterized inner/outer torus normal/curvature, mixed second form, static delayed kernel/projector, wrong-sign/sphere-substitution, dense bow and tube controls passed BEFORE targets.",file=sys.stderr,flush=True)
    return dict(status="passed",frozenControls=original,latitudes=results,staticRoot=out(root),staticCausalResidual=out(residual),wrongSignRejected=True,sphereSubstitutionRejected=True,interiorBowRejected=True,tubeInflationVerified=True)


def validate_case(request):
    m,g=request["model"],request["model"]["geometry"]
    require(m["compositionId"]=="canonical-surface/v1" and m["fieldSpeed"]=="1" and Q(m["coupling"])==Q("1e-6") and m["speedDomain"]=="unrestricted" and m["constraint"]=="surface" and m.get("boundaryPolicy","none")=="none" and m.get("method","numerical")=="numerical","scenario selection mismatch")
    require(g["kind"]=="ring-torus" and Q(g["majorRadius"])==Q(".1") and Q(g["radius"])==Q(".05"),"unsupported torus dimensions")
    require(all(Q(t)==0 for t in g.get("center",["0"]*3)),"translated scenario outside reference")
    require(all(Q(t)==(1 if i==j else 0) for i,row in enumerate(g.get("orientation",[["1","0","0"],["0","1","0"],["0","0","1"]])) for j,t in enumerate(row)),"rotated scenario outside reference")
    require(Q(request["interval"]["start"])==0 and Q(request["interval"]["end"])==Q(".15"),"finite interval differs from protocol")
    require(len(request["paths"])==6,"reference requires six paths")
    rho=request["paths"][0]["history"]["radius"]
    require(Q(rho) in (Q(".13"),Q(".07")),"unexpected latitude")
    for i,p in enumerate(request["paths"]):
        h=p["history"]
        require(p["pathId"]==f"p{i}" and p["charge"]==("-1" if i%2 else "1") and h["kind"]=="uniform-circular" and h["phase"]==PHASES[i],"3:3 phase/polarity mismatch")
        require(all(Q(h[key])==Q(value) for key,value in (("start","-.5"),("end","0"),("radius",rho),("height",".04"),("angularSpeed",".1"))),"torus latitude preparation mismatch")
        require(Q(h["speed"])==Q(rho)*Q(".1") and (Q(rho)-Q(".1"))**2+Q(h["height"])**2==Q(".05")**2,"exact prepared speed/surface mismatch")
        require(all(Q(h.get(key,"0"))==0 for key in ("tiltX","tiltY")),"tilted past outside reference")
    return g["majorRadius"],g["radius"],rho


def evaluate_case(name, request, response, precision):
    mp.dps=precision
    major,minor,circle = validate_case(request)
    require(response["runId"]==request["runId"] and response["status"]=="completed" and response["checkpoint"]["durable"] is True,"completion/run/durable checkpoint mismatch")
    require(Q(response["acceptedCoverage"]["start"])==0 and response["evidence"]["constraint"]=="artificial-surface" and response["evidence"]["numericalAcceptance"]=="constrained_solution_enclosure","accepted constraint evidence missing")
    paths={p["pathId"]:p for p in request["paths"]}
    records={r["pathId"]:r["segments"] for r in response["checkpoint"]["data"]["histories"]}
    require(len(response["checkpoint"]["data"]["histories"])==6 and set(records)==set(paths),"output population mismatch")
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
        for _,rows in index.values():
            require(len({tuple(row["reception"]) for row in rows})==len(rows),"duplicate full-slab ledger identity")
            d.cover(rows,start,end)
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
            screen=dense_screen(segment,major,minor)
            for key,value in screen.items():
                if key in maximum:maximum[key]=max(maximum[key],value)
            require(screen["speed"]<mp.mpf(".02") and screen["ambientRadius"]<mp.mpf(".1501"),"whole-time finite-chart proof margin fails")
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
            parts=torus_parts(state.position,state.velocity,interaction,mp.mpf(major),mp.mpf(minor))
            row=d.box_at(diagnostic_index,reception,(id,))
            for key,value in parts.items():d.boxes_contains(value,row[key],key)
            solution=solutions[(id,lo,hi)]
            d.boxes_contains(parts["totalAcceleration"],solution["accelerationBound"],"independent solution acceleration")
            u=torus_gradient(state.position,mp.mpf(major),mp.mpf(minor))
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
    separation=2*mp.mpf(circle)*mp.sin(minimum_phase/2)-2*maximum["speed"]*end
    require(minimum_phase>mp.mpf("1.04") and separation>0,"conditional whole-time partner separation margin fails")
    root_proof=dict(minimumInitialPhase=out(minimum_phase),simultaneousPartnerSeparationLower=out(separation),monotonicityLower=out(1-max(maximum["speed"],mp.mpf(circle)*mp.mpf(".1"))),oldMemoryResidualUpper=out(2*mp.mpf(".1501")-mp.mpf(".5")),scope="Conditional on coherent validated solutions, one strictly past partner root and no positive self root throughout declared memory/window; older tail excluded only under ambient radius <=.1501 (exact supplied past <=L+r=.15).")
    return dict(points=points,maximum=maximum,partnerRoots=root_count,computedSourceRoots=computed,histories=history,records=records,shape=(major,minor,circle),rootProof=root_proof)


def main():
    parser=argparse.ArgumentParser(__doc__)
    parser.add_argument("--known-only",action="store_true")
    parser.add_argument("--case",action="append",nargs=3,metavar=("NAME","REQUEST","RESPONSE"),default=[])
    parser.add_argument("--compare",action="append",nargs=2,metavar=("FIRST","SECOND"),default=[])
    args=parser.parse_args();started=time.monotonic();known=controls()
    if args.known_only:
        print(json.dumps(dict(schema="surface-torus-known-reference/v1",knownControls=known,targetReads=0,sourceSha256=fingerprint(__file__),latitudeHelperSha256=fingerprint(OBLATE),helperSha256=fingerprint(HELPER),oracleSha256=fingerprint(k.__file__))));return
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
        summary[name]=dict(requestSha256=hashlib.sha256(rq).hexdigest(),responseSha256=hashlib.sha256(rs).hexdigest(),shape=dict(majorRadius=fine["shape"][0],minorRadius=fine["shape"][1],latitudeRadius=fine["shape"][2]),midpointPoints=len(fine["points"]),partnerRoots=fine["partnerRoots"],computedSourceRoots=fine["computedSourceRoots"],maximum={key:out(value) for key,value in fine["maximum"].items()},precisionRootFactorDifference=out(root_difference),precisionAccelerationDifference=out(acceleration_difference),wholeTimeRootProof=fine["rootProof"])
        evaluated[name]=fine
    comparisons={}
    for first,second in args.compare:
        a,b=evaluated[first],evaluated[second]
        require(tuple(map(Q,a["shape"]))==tuple(map(Q,b["shape"])),"shape/latitude change is not refinement")
        comparisons[f"{first}:{second}"]=d.compare(a,b)
    print(json.dumps(dict(schema="surface-torus-independent-reference/v1",status="passed",knownControls=known,sourceSha256=fingerprint(__file__),latitudeHelperSha256=fingerprint(OBLATE),helperSha256=fingerprint(HELPER),oracleSha256=fingerprint(k.__file__),residualLimit=RESIDUAL_LIMIT,precisionLimit=PRECISION_LIMIT,referencePrecisions=[70,100],cases=summary,matchedComparisons=comparisons,wallSeconds=time.monotonic()-started,scope="Independent delayed point roots/kernel and product-rule quartic support, parameterized exact torus controls and midpoint ODE residual; exact rational full-segment polynomial bounds plus declared tubes; conditional whole-time root uniqueness. Reviewed production inclusion remains the solution-existence premise. No independent full-slab solution proof, UI, stability, energy or physical confinement qualification.")))


if __name__=="__main__":main()
