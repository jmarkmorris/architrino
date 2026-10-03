#!/usr/bin/env python
"""Wrapper around the unchanged, controlled frozen source-time oracle.

Reads receiver (T,x,v) only; never reads/tunes to parent accumulated integrals.
The resulting check is conditional on the fixed pre-seed source interpolant.
"""
from __future__ import annotations
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path
import threading
import time
import numpy as np
from scipy.interpolate import CubicHermiteSpline, PPoly

ROOT = Path(__file__).resolve().parents[2]
oracle_path = Path(__file__).with_name("linear-partner-fold-independent-integral.py")
spec = importlib.util.spec_from_file_location("fold_integral_oracle", oracle_path)
oracle = importlib.util.module_from_spec(spec)
spec.loader.exec_module(oracle)
OUT = ROOT / ".local-data/collinear-research/multiplier-free-linear-fold-independent"


def relevant_blocks(source, receiver, lo, hi):
    """Exact polynomial-sector range reduction before using the oracle.

    A sector with clock range disjoint from the receiver clock range cannot
    contain a root. Evaluate each endpoint and every polynomial extremum.
    This preserves all admitted roots; it is not a physical exclusion rule.
    """
    if oracle.roots(receiver.derivative(), 0, lo, hi):
        raise ValueError("nonmonotone receiver")
    minimum, maximum = sorted([float(receiver(lo)), float(receiver(hi))])
    endpoint = source(source.x)
    low = np.minimum(endpoint[:-1], endpoint[1:])
    high = np.maximum(endpoint[:-1], endpoint[1:])
    for s in oracle.roots(source.derivative(), 0):
        j = int(np.clip(np.searchsorted(source.x, s, side="right")-1, 0, len(low)-1))
        val = float(source(s))
        low[j], high[j] = min(low[j], val), max(high[j], val)
    included = np.flatnonzero((low <= maximum+1e-12) & (high >= minimum-1e-12))
    chunks = np.split(included, np.flatnonzero(np.diff(included)>1)+1)
    return [PPoly(source.c[:, chunk[0]:chunk[-1]+1], source.x[chunk[0]:chunk[-1]+2])
            for chunk in chunks if len(chunk)]


def integrate(source, receiver, lo, hi, sign, order):
    blocks = relevant_blocks(source, receiver, lo, hi)
    total, sectors = 0.0, []
    for block in blocks:
        value, rows = oracle.source_integral(block, receiver, lo, hi, sign, oracle.K, order)
        total += value
        sectors.extend(rows)
    return {"integral": total, "source_blocks": [(float(b.x[0]), float(b.x[-1])) for b in blocks],
            "source_sectors": sectors}


def known():
    original = oracle.known()
    B, b, delta = .6, 1.4, .01
    source = PPoly(np.array([[0., 0.], [-B/2, -b/2], [B, 0.], [2-B/2, 2.]]), [-1, 0, 1])
    results=[]
    for n in [61, 121, 241]:
        T = np.r_[2-delta*np.linspace(1, 0, n)**2, 2+delta*np.linspace(0, 1, n)[1:]]
        # Exact known receiver x=0, Q=T, v=0 on this same sampling scheme.
        q = CubicHermiteSpline(T, T, np.ones_like(T))
        value = integrate(source, q, 2-delta, 2, -1, 16)["integral"]
        error=abs(value-original["exact_integral"])
        if error>1e-12:
            raise AssertionError((n, value, error))
        results.append({"samples_per_side":n,"error":error})
    result={"status":"passed","receiver_mapping_and_range_reduction":results}
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT/"coupled-wrapper-known.json").write_text(json.dumps(result,indent=2)+"\n")
    print("WRAPPER KNOWN",json.dumps(result),flush=True)


def target():
    source_path=ROOT/".local-data/collinear-research/multiplier-free-linear/delayed-h4096.npz"
    receiver_path=ROOT/".local-data/collinear-research/multiplier-free-linear-fold/coupled-h4096-tol1e-10.npz"
    source_history=oracle.History(source_path)
    data=np.load(receiver_path)
    # Order by reception time rather than assuming a source-parameter order.
    before=np.argsort(data["T"])
    T0,x0,v0=data["T"][before],data["x"][before],data["v"][before]
    T=np.r_[T0,data["Tout"][1:]]
    X=np.r_[x0,data["xout"][1:]]
    V=np.r_[v0,data["vout"][1:]]
    if np.any(np.diff(T)<=0):
        raise ValueError("receiver times not strictly increasing")
    dense=CubicHermiteSpline(T,X,V)
    seed=float(T[0])
    fold=float(data["Tout"][0])
    lo,hi=fold-.002,fold+.002
    # Independently exclude recent-source roots, rather than accept the
    # parent assertion that every admitted source precedes the seed.
    probe=np.r_[T[(T>=seed)&(T<=hi)],hi,
                oracle.roots(dense.derivative(2),0,seed,hi)]
    vmax=float(np.max(dense(probe,1)))
    if vmax>=-1:
        raise ValueError("recent P/Q monotonicity not proved on interpolant")
    pseed=seed+float(dense(seed))
    qseed=seed-float(dense(seed))
    qlo=lo-float(dense(lo))
    plo=lo+float(dense(lo))
    gap_positive=qlo-pseed
    gap_negative=qseed-plo
    if min(gap_positive,gap_negative)<=0:
        raise ValueError("recent partner range separation failed")
    clocks={}
    for name,clock in source_history.clocks.items():
        end=np.searchsorted(clock.x,seed)
        if abs(float(clock.x[end])-seed)>1e-12:
            raise ValueError("seed does not match source knot")
        clocks[name]=PPoly(clock.c[:,:end],clock.x[:end+1])
    rows=[]
    for n in [61,121,241]:
        times=np.r_[fold-.002*np.linspace(1,0,n)**2,
                    fold+.002*np.linspace(0,1,n)[1:]]
        receiver_clocks={}
        for name,sign in [("P",1),("Q",-1)]:
            receiver_clocks[name]=CubicHermiteSpline(times,times+sign*dense(times),
                                                     1+sign*dense(times,1))
        quadrature=[]
        for order in [8,16]:
            channels={}
            for name,s,r,sign in [("partner_positive","P","Q",-1),
                                   ("partner_negative","Q","P",1),
                                   ("self_negative","P","P",-1),
                                   ("self_positive","Q","Q",1)]:
                channels[name]=integrate(clocks[s],receiver_clocks[r],lo,hi,sign,order)
            integral=sum(c["integral"] for c in channels.values())
            dv=float(dense(hi,1)-dense(lo,1))
            quadrature.append({"order":order,"channels":channels,"integral":integral,
                               "endpoint_dv":dv,"dv_minus_integral":dv-integral})
        census=[]
        for offset in [-.001,-.0001,.0001,.001]:
            t=fold+offset
            pp,qq=t+float(dense(t)),t-float(dense(t))
            counts={}
            for name,s,level in [("partner_positive","P",qq),("partner_negative","Q",pp),
                                 ("self_negative","P",pp),("self_positive","Q",qq)]:
                ss=oracle.roots(clocks[s],level)
                counts[name]=ss
            census.append({"offset":offset,"T":t,"channels":counts})
        row={"samples_per_side":n,"quadrature":quadrature,"census":census}
        rows.append(row)
        print("PROGRESS",json.dumps({"samples":n,"integral":quadrature[-1]["integral"],
                                      "dv":quadrature[-1]["endpoint_dv"],
                                      "residual":quadrature[-1]["dv_minus_integral"]}),flush=True)
    result={"status":"conditional-coupled-path-integral-check","cf":1,
            "source_path":str(source_path.relative_to(ROOT)),"source_sha256":hashlib.sha256(source_path.read_bytes()).hexdigest(),
            "receiver_path":str(receiver_path.relative_to(ROOT)),"receiver_sha256":hashlib.sha256(receiver_path.read_bytes()).hexdigest(),
            "oracle_sha256":hashlib.sha256(oracle_path.read_bytes()).hexdigest(),
            "read_arrays":["T","x","v","Tout","xout","vout"],
            "unused_parent_integral_arrays":["Jpair","Jregular","Jout"],
            "seed":seed,"fold":fold,"window":[lo,hi],
            "recent_source_exclusion":{"max_velocity":vmax,
                "positive_partner_clock_gap":gap_positive,
                "negative_partner_clock_gap":gap_negative,
                "self_census":"strict P decrease and Q increase leave only excluded diagonal"},
            "refinement":rows}
    (OUT/"coupled-h4096-tol1e-10-independent.json").write_text(json.dumps(result,indent=2)+"\n")


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--known",action="store_true")
    parser.add_argument("--target",action="store_true")
    args=parser.parse_args()
    start=time.monotonic()
    stop=threading.Event()
    def heartbeat():
        while not stop.wait(10):
            print(f"HEARTBEAT coupled-integral wall={time.monotonic()-start:.1f}s",flush=True)
    thread=threading.Thread(target=heartbeat,daemon=True)
    thread.start()
    try:
        known()
        if args.target:
            target()
    finally:
        stop.set();thread.join()
        print(f"FINISHED wall={time.monotonic()-start:.3f}s",flush=True)


if __name__=="__main__":
    main()
