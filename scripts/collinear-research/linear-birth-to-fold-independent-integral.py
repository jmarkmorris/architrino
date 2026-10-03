#!/usr/bin/env python
"""Independently audit a resolved held-release path with immutable services.

Only t,x,v are read. Event scalars and any parent ledger are not an oracle.
This checks polynomial histories, not a rigorous enclosure of a solution.
"""
from __future__ import annotations
import argparse
from datetime import datetime, timezone
import hashlib
import importlib.util
import json
from pathlib import Path
import threading
import time
import numpy as np
from scipy.interpolate import CubicHermiteSpline, PPoly

ROOT=Path(__file__).resolve().parents[2]
SERVICE_PATH=Path(__file__).with_name("linear-partner-fold-coupled-integral-check.py")
spec=importlib.util.spec_from_file_location("immutable_coupled_integral_service",SERVICE_PATH)
service=importlib.util.module_from_spec(spec)
spec.loader.exec_module(service)
oracle=service.oracle
OUT=ROOT/".local-data/collinear-research/linear-birth-to-fold-independent"


def census(clocks,T):
    rows=[]
    for name,s,r,sign in [("partner_positive","P","Q",-1),
                           ("partner_negative","Q","P",1),
                           ("self_negative","P","P",-1),
                           ("self_positive","Q","Q",1)]:
        for S in oracle.roots(clocks[s],float(clocks[r](T)),high=T):
            if S>=T-2e-9:
                continue
            den=abs(float(clocks[s].derivative()(S)))
            if den==0:
                raise ValueError("nonordinary row at census probe")
            rows.append({"channel":name,"S":S,"delay":T-S,
                         "absolute_denominator":den,
                         "acceleration":sign*oracle.K*(T-S)/den})
    return rows


def known():
    OUT.mkdir(parents=True,exist_ok=True)
    # Redirect receipt storage only, preserving all earlier oracle receipts.
    # Neither scientific parameter nor integration code is altered.
    known_dir=OUT/"known-runs"/datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S.%fZ")
    known_dir.mkdir(parents=True,exist_ok=False)
    oracle.OUT=known_dir
    service.OUT=known_dir
    service.known()
    static={"P":PPoly(np.array([[1.],[ -2.5]]),[-3.,3.]),
            "Q":PPoly(np.array([[1.],[ -3.5]]),[-3.,3.])}
    ledger=census(static,2.)
    if len(ledger)!=1 or ledger[0]["channel"]!="partner_positive" or abs(ledger[0]["S"]-1)>1e-12:
        raise AssertionError(ledger)
    value=service.integrate(static["P"],static["Q"],1.9,2.1,-1,16)["integral"]
    if abs(value+0.2*oracle.K)>1e-12:
        raise AssertionError(value)
    diagonal=service.integrate(static["P"],static["P"],1.9,2.1,-1,16)["integral"]
    if diagonal!=0:
        raise AssertionError(diagonal)
    result={"status":"passed","static_partner_count":1,"static_self_count":0,
            "static_integral_error":abs(value+.2*oracle.K),
            "diagonal_integral":diagonal,"cf":1}
    receipt=known_dir/"new-wrapper-known.json"
    receipt.write_text(json.dumps(result,indent=2)+"\n")
    print("NEW WRAPPER KNOWN",json.dumps(result),flush=True)
    return str(receipt.relative_to(ROOT))


def target(path,known_receipt,whole_only=False):
    path=path.resolve()
    # Bind exactly the bytes opened by this calculation, even if another
    # authorized writer later replaces the shared source path.
    payload=path.read_bytes()
    digest=hashlib.sha256(payload).hexdigest()
    snapshot_dir=OUT/"inputs"
    snapshot_dir.mkdir(exist_ok=True)
    snapshot=snapshot_dir/(path.stem+"-"+digest[:20]+".npz")
    if snapshot.exists():
        if hashlib.sha256(snapshot.read_bytes()).hexdigest()!=digest:
            raise ValueError("input snapshot identity collision")
    else:
        snapshot.write_bytes(payload)
    history=oracle.History(snapshot)
    if np.any(np.diff(history.t)<=0):
        raise ValueError("nonincreasing supplied reception times")
    dense=history.position
    P,Q=history.clocks["P"],history.clocks["Q"]
    candidates=oracle.roots(P.derivative(),0,0.,history.t[-1])
    birth_candidates=[t for t in candidates
                      if 1e-4<t<history.t[-1]-1e-4
                      and float(dense(t-1e-4,1))>-1 and float(dense(t+1e-4,1))<-1]
    if len(birth_candidates)!=1:
        raise ValueError(f"ambiguous polynomial birth extrema {birth_candidates}")
    birth=birth_candidates[0]
    contacts=oracle.roots(dense,0,0.,history.t[-1])
    if len(contacts)!=3:
        raise ValueError(f"unexpected contact census {contacts}")
    contact=contacts[-1]
    fold_candidates=oracle.roots(Q,float(P(birth)),contact,history.t[-1])
    if len(fold_candidates)!=1:
        raise ValueError(f"ambiguous reception fold {fold_candidates}")
    fold=fold_candidates[0]
    events={"birth":birth,"third_contact":contact,"partner_fold":fold}
    event_census=[]
    for name,t in events.items():
        for offset in [-1e-3,-1e-4,1e-4,1e-3]:
            ledger=census(history.clocks,t+offset)
            event_census.append({"event":name,"offset":offset,"T":t+offset,
                                 "partner_count":sum(r["channel"].startswith("partner") for r in ledger),
                                 "self_count":sum(r["channel"].startswith("self") for r in ledger),
                                 "ledger":ledger})
    windows=[("birth_positive",birth+1e-4,birth+.01,None),
             ("third_contact",contact-.002,contact+.002,contact),
             ("partner_fold",fold-.002,fold+.002,fold)]
    result_windows=[]

    def window(name,lo,hi,event=None,ns=(61,121,241),whole_events=None):
        levels=[]
        for n in ns:
            if whole_events is not None:
                tc,tf=whole_events
                T=np.r_[np.linspace(lo,tc,n),
                        (tf-(tf-tc)*np.linspace(1,0,n)**2)[1:],
                        np.linspace(tf,hi,n)[1:]]
            elif event is None:
                T=np.linspace(lo,hi,2*n-1)
            else:
                T=np.r_[event-(event-lo)*np.linspace(1,0,n)**2,
                        event+(hi-event)*np.linspace(0,1,n)[1:]]
            receiver={}
            for clock,sign in [("P",1),("Q",-1)]:
                receiver[clock]=CubicHermiteSpline(T,T+sign*dense(T),1+sign*dense(T,1))
            orders=[]
            for order in [8,16]:
                channels={}
                for channel,s,r,sign in [("partner_positive","P","Q",-1),
                                         ("partner_negative","Q","P",1),
                                         ("self_negative","P","P",-1),
                                         ("self_positive","Q","Q",1)]:
                    channels[channel]=service.integrate(history.clocks[s],receiver[r],lo,hi,sign,order)
                value=sum(d["integral"] for d in channels.values())
                dv=float(dense(hi,1)-dense(lo,1))
                orders.append({"order":order,"channels":channels,"integral":value,
                               "dv":dv,"dv_minus_integral":dv-value})
            levels.append({"samples_per_side":n,"quadrature":orders})
            print("PROGRESS",json.dumps({"history":path.name,"window":name,"samples":n,
                    "integral":orders[-1]["integral"],"dv":orders[-1]["dv"],
                    "residual":orders[-1]["dv_minus_integral"]}),flush=True)
        return {"name":name,"lo":lo,"hi":hi,"split_events":whole_events,
                "refinement":levels}

    cutoffs=[]
    if whole_only:
        result_windows.append(window("whole_postbirth",birth+1e-4,fold+.002,
                                     ns=(241,481,961),whole_events=(contact,fold)))
    else:
        for name,lo,hi,event in windows:
            result_windows.append(window(name,lo,hi,event))
        for epsilon in [1e-4,2.5e-5,6.25e-6]:
            cutoffs.append(window("birth_cutoff",birth+epsilon,birth+.001,None,(121,)))
    result={"status":"full-resolved-interpolant-integral-check","cf":1,
            "history_path":str(path.relative_to(ROOT)),"history_sha256":digest,
            "retained_input":str(snapshot.relative_to(ROOT)),"known_receipt":known_receipt,
            "oracle_sha256":hashlib.sha256(oracle_path()).hexdigest(),
            "range_service_sha256":hashlib.sha256(SERVICE_PATH.read_bytes()).hexdigest(),
            "wrapper_sha256":hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            "read_arrays":["t","x","v"],"event_scalars_used":False,
            "event_locations":events,"all_birth_extrema":candidates,
            "census":event_census,"windows":result_windows,"birth_cutoffs":cutoffs}
    suffix="-whole-independent.json" if whole_only else "-independent.json"
    (OUT/(path.stem+suffix)).write_text(json.dumps(result,indent=2)+"\n")
    print("RESULT",path.name,json.dumps(events),flush=True)


def oracle_path():
    return Path(oracle.__file__).read_bytes()


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--known",action="store_true")
    parser.add_argument("--history",type=Path)
    parser.add_argument("--whole-only",action="store_true")
    args=parser.parse_args()
    start=time.monotonic();stop=threading.Event()
    def heartbeat():
        while not stop.wait(10):
            print(f"HEARTBEAT full-resolved-independent wall={time.monotonic()-start:.1f}s",flush=True)
    thread=threading.Thread(target=heartbeat,daemon=True);thread.start()
    try:
        known_receipt=known()
        if args.history:
            target(args.history,known_receipt,args.whole_only)
    finally:
        stop.set();thread.join()
        print(f"FINISHED wall={time.monotonic()-start:.3f}s",flush=True)


if __name__=="__main__":
    main()
