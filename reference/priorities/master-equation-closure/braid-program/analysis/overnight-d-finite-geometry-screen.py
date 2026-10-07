"""Geometry-preserving delayed error screen, not a validated enclosure.

The old screen and independent interval oracle remain frozen. This instrument
uses their retained input, but its coefficients and integration are floating.
"""
import argparse
import importlib.util
import json
import pathlib
import time
import numpy as np

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('finite_defect', HERE/'overnight-d-finite-defect-screen.py')
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)


def matrices(tau, n, v, w, dw, sign):
    """Derivative in receiver translation p and source velocity addition z."""
    gamma = 1-n@v
    D = 1-n@w
    N = (np.eye(3)-np.outer(n, n))@(np.eye(3)+np.outer(v, n)/gamma)/tau
    B = sign*((np.eye(3)+np.outer(n, w)/D)@N/(tau*tau*D)
              - 2*np.outer(n, n)/(tau**3*D*gamma)
              - (n@dw)*np.outer(n, n)/(tau*tau*D*D*gamma))
    C = sign*np.outer(n, n)/(tau*tau*D*D)
    return B, C


def controls():
    B, C = matrices(2., np.array([1., 0, 0]), np.zeros(3), np.zeros(3), np.zeros(3), 1)
    assert np.max(abs(B-np.diag([-.25, .125, .125]))) < 1e-15
    assert np.max(abs(C-np.diag([.25, 0, 0]))) < 1e-15
    # Independent closed-form constant-velocity causal quadratic, not root code.
    y = np.array([2., -1., .7]); v = np.array([.2, .1, -.15])
    def closed(p, z):
        r = y+p; dot = r@v; a = 1-v@v
        tau = (dot+np.sqrt(dot*dot+a*(r@r)))/a
        n = (r+v*tau)/tau
        return n/(tau*tau*(1-n@(v+z))), tau, n
    _, tau, n = closed(np.zeros(3), np.zeros(3))
    B, C = matrices(tau, n, v, v, np.zeros(3), 1)
    h = 1e-5; eye = np.eye(3)
    fdB = np.column_stack([(closed(h*u, np.zeros(3))[0]-closed(-h*u, np.zeros(3))[0])/(2*h) for u in eye])
    fdC = np.column_stack([(closed(np.zeros(3), h*u)[0]-closed(np.zeros(3), -h*u)[0])/(2*h) for u in eye])
    assert np.max(abs(B-fdB)) < 1e-9 and np.max(abs(C-fdC)) < 1e-9
    # Prescribed circular source, translating receiver to keep n fixed while
    # emission time varies: p'(s)=v-n gives a closed-form chain-rule witness.
    nc = np.array([.6, .8, 0.]); vc = np.array([0., .3, 0.]); ac = np.array([-.09, 0., 0.])
    Bc, _ = matrices(2., nc, vc, vc, ac, -1)
    Dc = 1-nc@vc
    expected = -nc*(2/(8*Dc)+(nc@ac)/(4*Dc*Dc))
    assert np.max(abs(Bc@(vc-nc)-expected)) < 1e-14
    # Weighted oscillator energy has zero logarithmic growth at alpha=sqrt(k).
    alpha = 2.; M = np.block([[np.zeros((3, 3)), alpha*eye], [-alpha*eye, np.zeros((3, 3))]])
    assert np.max(abs(M+M.T)) == 0
    print(json.dumps(dict(control='static tensor, independent causal quadratic derivatives, circular source chain rule, oscillator cancellation',status='PASS',B_error=float(np.max(abs(B-fdB))),C_error=float(np.max(abs(C-fdC))))),flush=True)


def main(args):
    controls()
    if args.mode == 'controls':
        return
    meta = json.loads((base.OUT/(args.tag+'.json')).read_text())
    h = np.load(base.OUT/(args.tag+'.npz'))
    b = json.loads((base.ROOT/'.local-data/master-equation-closure/geometry-session-20261004/results/0186.json').read_text())['balances'][meta['balance']]
    H = base.History(h['T'], h['X'], h['V'], b)
    end = min(args.end, float(H.T[-1])); times = np.linspace(0, end, args.steps+1)
    E = np.full(8, 1e-14); errors = [E.copy()]; records = []; start = time.monotonic(); last = start
    first = None
    for k in range(args.steps):
        t = float((times[k]+times[k+1])/2); dt = times[k+1]-times[k]
        mu = np.zeros(8); force = np.zeros(8); q = np.zeros(8); allrx = []; allrv = []; minS = np.inf
        for i in range(8):
            x, v, a = H.raw(i, t); A = np.zeros(3); Bsum = np.zeros((3, 3))
            for j in range(8):
                if i == j:
                    continue
                row, z = H.row(t, x, i, j); A += row
                xs, vs, accs = H.raw(j, z['s']); w, dw = base.feasible(vs, accs)
                n = (x-xs)/z['tau']; B, C = matrices(z['tau'], n, vs, w, dw, H.pol[i]*H.pol[j]); Bsum += B
                minS = min(minS, z['s'])
                if z['s'] > 0:
                    # Delayed error is sampled from its own past, not current maximum.
                    assert z['s'] < times[k], 'step too large for explicit delayed screen'
                    ej = float(np.interp(z['s'], times[:k+1], np.asarray(errors)[:, j]))
                    force[i] += np.linalg.norm(np.column_stack((-B/args.alpha, C)), 2)*ej
            r = base.residual(v, a, A); allrx.append(r['rx']); allrv.append(r['rv'])
            w, dw = base.feasible(v, a)
            q[i] = r['lam']*max(0., 1-w@w)/2
            M = np.block([[np.zeros((3, 3)), args.alpha*np.eye(3)], [Bsum/args.alpha, -.5*r['lam']*np.eye(3)]])
            mu[i] = np.linalg.eigvalsh((M+M.T)/2)[-1]
            force[i] += np.hypot(args.alpha*r['rx'], r['rv'])
        # Frozen-coefficient positive screen; Q/E omitted and explicitly reported.
        growth = np.exp(dt*mu)
        E = growth*E + np.where(abs(mu)>1e-12, np.expm1(dt*mu)/np.maximum(mu,1e-300), dt)*force
        errors.append(E.copy())
        rec = dict(t=float(times[k+1]), max_E=float(max(E)), position_bound_screen=float(max(E)/args.alpha), max_mu=float(max(mu)), max_forcing=float(max(force)), max_rx=max(allrx), max_rv=max(allrv), max_Q=float(max(q)), min_source=float(minS))
        records.append(rec)
        if first is None and max(E) > .001:
            first = rec.copy()
        if time.monotonic()-last > 15:
            print(json.dumps(dict(progress=k+1,total=args.steps,t=t,max_E=float(max(E)),wall=time.monotonic()-start)),flush=True);last=time.monotonic()
        if max(E) > args.stop:
            break
    out = dict(grade='sampled geometry and delayed comparison screen; no interval envelope; Q and kick mismatch omitted',alpha=args.alpha,tag=args.tag,steps=args.steps,end=end,first_velocity_threshold=first,final=records[-1],records=records,wall=time.monotonic()-start)
    path = base.OUT/(args.output+'.json');path.write_text(json.dumps(out,indent=2)+'\n')
    print(json.dumps({key:out[key] for key in ['grade','alpha','steps','first_velocity_threshold','final','wall']}),flush=True)


if __name__ == '__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['controls','target']);p.add_argument('--tag',default='b1-s1-h4800-refinement-endpoint');p.add_argument('--steps',type=int,default=128);p.add_argument('--end',type=float,default=10.);p.add_argument('--alpha',type=float,default=.2);p.add_argument('--stop',type=float,default=.01);p.add_argument('--output',default='b1-s1-finite-geometry-screen');main(p.parse_args())
