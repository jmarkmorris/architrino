"""Complete-age floating diagnostic for four fixed triangular/core laws.

Known controls must precede target evaluation. Corner coverage is analytical;
all numerical integration/root output remains diagnostic, not an enclosure.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path
import time

import numpy as np
from scipy.integrate import quad_vec
from scipy.optimize import brentq, least_squares

OUT = Path('.local-data/master-equation-closure/binary-research')
PREFIX = 'alternatives-screen-2026-10-05-width-circle-'
LAWS = [(h, rho) for h in [1/16, 1/32] for rho in [1/32, 1/64]]
PROTOCOL = Path(__file__).parent.parent/'analysis/alternatives-screen-2026-10-05-width-circle-protocol.md'
FROZEN = '43cba14d8afcc39033e21b45fc4ecfb852d4191867273ba6d005fd0703c2b03e'


def window(z, h):
    return max(0.0, 1-abs(z)/h)/h


def partition(beta, radius, h, partner):
    end = 2*beta+beta*h/radius
    shift = -math.pi if partner else 0.0
    knots = [0.0, end]
    levels = []
    lobes = 0
    for k in range(-1, math.ceil(end/(2*math.pi))+2):
        a = shift+2*math.pi*k
        left, right = max(0.0, a), min(end, a+2*math.pi)
        if not left < right:
            continue
        lobes += 1
        sub = [left, right]
        if beta > 1:
            critical = a+2*math.acos(1/beta)
            if left < critical < right:
                sub.append(critical)
        sub.sort()
        knots.extend(sub)

        def gap(theta):
            return 2*radius*math.sin((theta-a)/2)-radius*theta/beta

        for lo, hi in zip(sub[:-1], sub[1:]):
            for level in [-h, 0.0, h]:
                fl, fr = gap(lo)-level, gap(hi)-level
                if fl == 0.0:
                    levels.append((lo, level)); knots.append(lo)
                if fr == 0.0:
                    levels.append((hi, level)); knots.append(hi)
                if fl*fr < 0.0:
                    root = brentq(lambda theta: gap(theta)-level, lo, hi, xtol=2e-14, rtol=1e-14)
                    levels.append((root, level)); knots.append(root)
    knots = sorted(set(knots))
    # Keep all distinct returned crossings, including arbitrarily close ones.
    return knots, sorted(set(levels)), lobes


def integrate(fn, end, knots, tol):
    value, err, info = quad_vec(fn, 0.0, end, epsabs=tol, epsrel=tol,
                                points=knots, limit=max(1000, 4*len(knots)+100),
                                quadrature='gk21', norm='max', full_output=True)
    return value, float(err), {'success': bool(info.success), 'status': int(info.status),
                              'message': info.message, 'evaluations': int(info.neval)}


def circle(beta, radius, h, rho, tol=2e-9):
    end = 2*radius+h
    if beta == 0:
        knots = sorted(set([0.0, end, max(0.0, 2*radius-h), 2*radius]))
        counts = {'self_lobes': 0, 'partner_lobes': 0, 'self_levels': 0, 'partner_levels': 0}
    else:
        sk, sl, sn = partition(beta, radius, h, False)
        pk, pl, pn = partition(beta, radius, h, True)
        knots = sorted(set(theta*radius/beta for theta in sk+pk))
        knots = [max(0.0, min(end, v)) for v in knots]
        counts = {'self_lobes': sn, 'partner_lobes': pn, 'self_levels': len(sl), 'partner_levels': len(pl)}

    def integrand(tau):
        theta = beta*tau/radius
        co, si = math.cos(theta), math.sin(theta)
        rs = 2*radius*abs(math.sin(theta/2))
        rp = 2*radius*abs(math.cos(theta/2))
        ws = window(rs-tau, h)/(rs*rs+rho*rho)**1.5
        wp = window(rp-tau, h)/(rp*rp+rho*rho)**1.5
        return np.array([radius*(1-co)*ws, radius*si*ws,
                         -radius*(1+co)*wp, radius*si*wp])

    v, err, info = integrate(integrand, end, knots, tol)
    ar, at = float(v[0]+v[2]), float(v[1]+v[3])
    return {'beta': beta, 'radius': radius, 'h': h, 'rho': rho,
            'radial': ar, 'tangent': at, 'channels': v.tolist(),
            'residual': [radius*radius*at, radius*ar+beta*beta],
            'estimated_acceleration_error': err, 'partition_knots': len(knots),
            **counts, 'quadrature': info}


def affine_closed(v, h, rho):
    a = abs(v-1)
    q = h/a
    z = v*q/rho
    return v/h*((1/rho-1/math.sqrt(v*v*q*q+rho*rho))/(v*v)
                -a/(h*v**3)*(math.asinh(z)-z/math.sqrt(1+z*z)))


def known():
    controls = []
    for h, rho in LAWS:
        distance = 0.25
        row = np.array([-distance, 0.0])/(distance*distance+rho*rho)**1.5
        value, err, info = integrate(lambda tau: row*window(distance-tau, h), distance+h,
                                     [0, distance-h, distance, distance+h], 2e-12)
        assert info['success'] and np.max(np.abs(value-row)) < 1e-10
        zero = circle(0.0, distance/2, h, rho, 2e-12)
        assert zero['quadrature']['success']
        assert zero['tangent'] == 0.0 and zero['channels'][0] == 0.0
        assert abs(zero['radial']-row[0]) < 1e-10
        affine_errors = []
        for v in [0.5, 2.0]:
            end = h/abs(v-1)
            numerical, error, ai = integrate(lambda tau: np.array([v*tau/(v*v*tau*tau+rho*rho)**1.5*window((v-1)*tau,h)]), end, [0,end], 2e-12)
            exact = affine_closed(v,h,rho)
            affine_errors.append(abs(float(numerical[0])-exact))
            assert ai['success'] and abs(float(numerical[0])-exact) < 1e-9
        sk, sl, _ = partition(1.0, 1.0, h, False)
        pk, pl, _ = partition(1.0, 1.0, h, True)
        assert sum(theta > 1e-12 for theta,level in sl) == 1
        assert len(pl) == 3 and [level for theta,level in pl] == [h,0.0,-h]
        moving = circle(1.0,1.0,h,rho,2e-12)
        assert moving['quadrature']['success'] and moving['tangent'] > 0
        controls.append({'h':h,'rho':rho,'stationary_error':float(np.max(np.abs(value-row))),
                         'zero_speed_error':abs(zero['radial']-row[0]),
                         'affine_errors':affine_errors,'known_positive_tangent':moving['tangent'],
                         'monotone_level_counts':[sum(t>1e-12 for t,l in sl),len(pl)]})
    return {'passed':True,'controls':controls}


def grid():
    betas = np.linspace(math.pi/2,8.0,33)
    radii = np.geomspace(2**-9,2.0,33)
    laws = []
    for h,rho in LAWS:
        rows = []
        for ib,beta in enumerate(betas):
            for ir,radius in enumerate(radii):
                row = circle(float(beta),float(radius),h,rho)
                row['index'] = [ib,ir]
                rows.append(row)
            print(json.dumps({'h':h,'rho':rho,'speed_rows':ib+1,'total':33}),flush=True)
        laws.append({'h':h,'rho':rho,'rows':rows,
                     'quadrature_failures':sum(not v['quadrature']['success'] for v in rows),
                     'tangent_range':[min(v['tangent'] for v in rows),max(v['tangent'] for v in rows)],
                     'smallest_residual':min(rows,key=lambda v:np.linalg.norm(v['residual']))})
    return {'grade':'floating complete-partition diagnostic; no existence or exclusion certificate',
            'beta_nodes':betas.tolist(),'radius_nodes':radii.tolist(),'laws':laws}


def search():
    gr = json.loads((OUT/(PREFIX+'grid.json')).read_text())
    results=[]
    for law in gr['laws']:
        h,rho=law['h'],law['rho']
        rows=law['rows']; byindex={tuple(v['index']):v for v in rows}
        seeds=[]
        for ib in range(32):
            for ir in range(32):
                corners=[byindex[ib+di,ir+dj] for di in [0,1] for dj in [0,1]]
                if all(min(v['residual'][j] for v in corners)<=0<=max(v['residual'][j] for v in corners) for j in [0,1]):
                    seeds.append([(gr['beta_nodes'][ib]+gr['beta_nodes'][ib+1])/2,
                                  math.sqrt(gr['radius_nodes'][ir]*gr['radius_nodes'][ir+1])])
        seeds += [[v['beta'],v['radius']] for v in sorted(rows,key=lambda v:np.linalg.norm(v['residual']))[:24]]
        attempts=[]
        for n,(beta,radius) in enumerate(seeds):
            def residual(z):
                row=circle(float(z[0]),math.exp(float(z[1])),h,rho,2e-10)
                if not row['quadrature']['success']:
                    raise RuntimeError('quadrature failure in root search')
                return np.array(row['residual'])
            fit=least_squares(residual,[beta,math.log(radius)],bounds=([math.pi/2,math.log(2**-9)],[8,math.log(2)]),
                              xtol=1e-11,ftol=1e-11,gtol=1e-11,max_nfev=150,diff_step=1e-5)
            candidate=circle(float(fit.x[0]),math.exp(float(fit.x[1])),h,rho,2e-12)
            candidate['candidate']=max(abs(v) for v in candidate['residual'])<1e-7 and candidate['quadrature']['success']
            candidate['seed']=[beta,radius];candidate['optimizer_success']=bool(fit.success)
            candidate['evaluations']=int(fit.nfev)
            attempts.append(candidate)
            print(json.dumps({'h':h,'rho':rho,'seed':n+1,'seeds':len(seeds),
                              'candidate':candidate['candidate'],'beta':candidate['beta'],
                              'radius':candidate['radius'],'residual':candidate['residual']}),flush=True)
        results.append({'h':h,'rho':rho,'attempts':attempts})
    return {'grade':'floating root search and refinement only; any candidate requires independent enclosure','laws':results}


if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('mode',choices=['known','grid','search']);args=p.parse_args()
    assert hashlib.sha256(PROTOCOL.read_bytes()).hexdigest()==FROZEN
    path=OUT/(PREFIX+args.mode+'.json');assert not path.exists(),path
    if args.mode!='known':assert json.loads((OUT/(PREFIX+'known.json')).read_text())['passed']
    start=time.monotonic()
    result={'known':known,'grid':grid,'search':search}[args.mode]()
    result.update(utc=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),elapsed_seconds=time.monotonic()-start,
                  cf=1,source_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),protocol_sha256=FROZEN)
    path.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'receipt':str(path),'elapsed_seconds':result['elapsed_seconds'],
                      'passed':result.get('passed'),'grade':result.get('grade')}))
