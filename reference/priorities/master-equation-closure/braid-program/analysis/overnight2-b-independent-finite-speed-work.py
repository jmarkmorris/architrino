"""Prepared independent scalar-chord interval work reference.

No subject or prior instrument imports. Scientific stages require known-first
receipts. Prepared for explicit authorization; authoring this file runs no stage.
"""
from fractions import Fraction as F
from pathlib import Path
from datetime import datetime, timezone
import argparse
import hashlib
import json
import resource
import signal
import sys
import time
import mpmath as mp

IV = mp.iv
IV.dps = 45
HERE = Path(__file__).resolve().parent
OWNER = HERE.parents[4] / '.local-data/master-equation-closure/overnight2-b/independent-finite-speed-work'
MEMORY_LIMIT = 512 * 1024**2
OUTPUT_LIMIT = 8 * 1024**2
WALL_LIMIT = 900
START = None
LAST = None


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def as_fraction(endpoint):
    sign, mantissa, exponent, bitcount = endpoint
    if bitcount < 0:
        raise ArithmeticError('nonfinite interval endpoint')
    value = F(-mantissa if sign else mantissa)
    return value * 2**exponent if exponent >= 0 else value / 2**(-exponent)


def endpoints(value):
    return tuple(as_fraction(t) for t in value._mpi_)


def point(value):
    q = F(value)
    return IV.mpf(q.numerator) / q.denominator


def interval(lower, upper=None):
    if upper is None:
        return point(lower)
    lo, hi = point(lower), point(upper)
    return IV.mpf([lo.a, hi.b])


def intersect(left, right):
    a, b = endpoints(left)
    c, d = endpoints(right)
    lo, hi = max(a, c), min(b, d)
    if lo > hi:
        raise ArithmeticError('empty inclusion intersection')
    return interval(lo, hi)


def width(value):
    lo, hi = endpoints(value)
    return hi-lo


def contains(value, rational):
    lo, hi = endpoints(value)
    return lo <= F(rational) <= hi


def packed(value):
    # Each endpoint is exactly signed_integer * 2**exponent.
    out = []
    for sign, mantissa, exponent, bitcount in value._mpi_:
        if bitcount < 0:
            raise ArithmeticError('nonfinite receipt endpoint')
        out.append([str(-mantissa if sign else mantissa), exponent])
    return out


def diagnostic(value):
    return [float(q) for q in endpoints(value)]


def resident_bytes():
    raw = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return raw if sys.platform == 'darwin' else raw*1024


def guard():
    if time.monotonic()-START > WALL_LIMIT:
        raise TimeoutError('900-second internal deadline')
    if resident_bytes() > MEMORY_LIMIT:
        raise MemoryError('512 MiB resident limit')


def alarm_handler(_signum, _frame):
    raise TimeoutError('900-second internal alarm')


def profile(phi, p):
    a,b,c,d,e,f,H,beta,kappa = p
    c2,s2 = IV.cos(2*phi),IV.sin(2*phi)
    c3,s3 = IV.cos(3*phi),IV.sin(3*phi)
    return (1+a*c2+b*s2, -2*a*s2+2*b*c2,
            c*c2+d*s2, -2*c*s2+2*d*c2,
            H*IV.cos(phi)+e*c3+f*s3,
            -H*IV.sin(phi)-3*e*s3+3*f*c3)


def geometry(phi, delta, p, j, receiver=None):
    rec = profile(phi,p) if receiver is None else receiver
    r,rp,pr,pp,z,zp = rec
    beta,kappa = p[7:]
    s,sp,ps,pps,zs,zsp = profile(phi-kappa*delta,p)
    sigma = -1 if j % 2 else 1
    gamma = j*IV.pi/3-beta*delta+ps-pr
    cg,sg = IV.cos(gamma),IV.sin(gamma)
    dz = z-sigma*zs
    distance = IV.sqrt((r-s)**2+4*r*s*(IV.sin(gamma/2)**2)+dz**2)
    source_dot = kappa*sp*(r*cg-s)-r*s*(beta+kappa*pps)*sg+kappa*zsp*(sigma*z-zs)
    receiver_dot = kappa*rp*(r-s*cg)-r*s*(beta+kappa*pp)*sg+kappa*zp*dz
    return distance,source_dot,receiver_dot,-r*s*sg,r-s*cg


def contract(gap, initial, iterations):
    root = initial
    slope_magnitude = interval('0.75','1.25')
    for _ in range(iterations):
        lo,hi = endpoints(root)
        middle = point((lo+hi)/2)
        candidate = middle+gap(middle)/slope_magnitude
        updated = intersect(root,candidate)
        old_width,new_width = width(root),width(updated)
        root = updated
        if new_width >= old_width*F(999,1000):
            break
    return root


def root_interval(phi,p,j,receiver=None,iterations=40):
    rec = profile(phi,p) if receiver is None else receiver
    def gap(delta):
        return geometry(phi,delta,p,j,rec)[0]-delta
    return contract(gap,interval('0.79','2.63'),iterations)


def channel(phi,p,j,receiver=None,iterations=40):
    rec = profile(phi,p) if receiver is None else receiver
    delay = root_interval(phi,p,j,rec,iterations)
    distance,source_dot,receiver_dot,torque_numerator,radial_numerator = geometry(phi,delay,p,j,rec)
    divisor = intersect(1-source_dot/delay,interval('0.75','1.25'))
    denominator = delay**3*divisor
    sign = -1 if j % 2 else 1
    return (sign*receiver_dot/denominator,sign*torque_numerator/denominator,
            sign*radial_numerator/denominator,delay,divisor)


def cell(phi,p):
    rec = profile(phi,p)
    work,torque = point(0),point(0)
    max_width = F(0)
    min_divisor = F(5,4)
    max_divisor = F(3,4)
    for j in range(1,6):
        w,t,_radial,delay,divisor = channel(phi,p,j,rec)
        work += w
        torque += t
        max_width = max(max_width,width(delay))
        dlo,dhi = endpoints(divisor)
        min_divisor,max_divisor = min(min_divisor,dlo),max(max_divisor,dhi)
    return work,torque,max_width,min_divisor,max_divisor


def known():
    controls = {}
    def check(name,value):
        controls[name] = bool(value)
        if not value:
            raise AssertionError(name)
    try:
        a = interval(-1,2)
        check('generic_product', endpoints(a*a) == (F(-2),F(4)))
        check('square_range', endpoints(a**2) == (F(0),F(4)))
        check('sqrt_four', endpoints(IV.sqrt(point(4))) == (F(2),F(2)))
        linear = contract(lambda q:2-q,interval(1,3),100)
        check('linear_root_two',contains(linear,2) and width(linear)<F(1,10**24))
        static = [point(0) for _ in range(9)]
        work,torque,radial = point(0),point(0),point(0)
        for j,square in enumerate([1,3,4,3,1],1):
            w,t,ar,delta,divisor = channel(point(0),static,j,iterations=100)
            lo,hi = endpoints(delta)
            check('static_chord_'+str(j),lo*lo<=square<=hi*hi and width(delta)<F(1,10**24))
            check('static_divisor_'+str(j),contains(divisor,1))
            work,torque,radial = work+w,torque+t,radial+ar
        check('static_work',contains(work,0) and width(work)<F(1,10**22))
        check('static_torque',contains(torque,0) and width(torque)<F(1,10**22))
        exact_radial = -point(F(5,4))+1/IV.sqrt(point(3))
        check('static_radial',contains(radial-exact_radial,0) and width(radial-exact_radial)<F(1,10**22))
        # Non-root geometry controls deliberately distinguish the two velocities.
        separate = [point(0) for _ in range(6)]+[point(1),point(0),point(1)]
        _distance,sd,rd,_t,_r = geometry(point(0),IV.pi/2,separate,3)
        check('source_axial_dot_minus_one',contains(sd,-1) and width(sd)<F(1,10**35))
        check('receiver_axial_dot_zero',contains(rd,0) and width(rd)<F(1,10**35))
        _distance,sd,rd,_t,_r = geometry(IV.pi/2,IV.pi/2,separate,3)
        check('source_axial_dot_zero',contains(sd,0) and width(sd)<F(1,10**35))
        check('receiver_axial_dot_minus_one',contains(rd,-1) and width(rd)<F(1,10**35))
        check('dyadic_serialization',packed(point(F(-3,8)))==[['-3',-3],['-3',-3]])
        speed2=(F('.1501')*F('.0004'))**2+(F('1.0002')*(F('.2001')+F('.1501')*F('.0004')))**2+(F('.1501')*F('.8506'))**2
        diameter2=4*(F('1.0002')**2+F('.8502')**2)
        check('speed_below_quarter',speed2<F(1,16))
        check('diameter_below_263_over_100',diameter2<F('2.63')**2)
        check('root_lower_bracket',F('.79')*F('1.25')<F('.9998'))
        return {'complete':True,'passed':True,'controls':controls,
                'speed_squared':str(speed2),'diameter_squared':str(diameter2)}
    except Exception as exc:
        return {'complete':False,'passed':False,'controls':controls,
                'failure':type(exc).__name__+': '+str(exc)}


def parameters(lo,hi,central):
    if central:
        return [point(0) for _ in range(6)]+[point(lo),point(F(1,5)),point(F(3,20))]
    return [interval('-0.0001','0.0001') for _ in range(6)]+[
        interval(lo,hi),interval('0.1999','0.2001'),interval('0.1499','0.1501')]


def run_stage(stage,folder):
    identity = digest(Path(__file__))
    known_path = folder/'known.json'
    prior = json.loads(known_path.read_text())
    if not(prior.get('passed') and prior.get('instrument_sha256')==identity):
        raise RuntimeError('matching independently recorded known pass required')
    if stage in ('target','endpoints'):
        pilot = json.loads((folder/'pilot.json').read_text())
        if not(pilot.get('complete') and pilot.get('instrument_sha256')==identity):
            raise RuntimeError('matching completed pilot required')
    if stage=='endpoints':
        bins=[('lower',F(4,5),F(4,5)),('upper',F(17,20),F(17,20))]
        count=2048
    else:
        bins=[(str(i),F(4,5)+F(i,320),F(4,5)+F(i+1,320)) for i in range(16)]
        if stage=='pilot':
            bins=bins[:1]
        count=128 if stage=='pilot' else 1024
    result={'complete':False,'records':[],'known_sha256':digest(known_path),
            'root_iterations_max':40,'endpoint_encoding':'signed integer times 2 to exponent',
            'per_cell_columns':['index','work_interval','torque_interval'],
            'phase_cells_per_bin':count,'failure':None}
    bytes_used=0
    try:
        global LAST
        for name,lo,hi in bins:
            p=parameters(lo,hi,stage=='endpoints')
            rec={'bin':name,'height':[str(lo),str(hi)],'complete':False,
                 'parameters':[packed(v) for v in p],'cells':[],
                 'mean_work':None,'mean_torque':None}
            result['records'].append(rec)
            sum_work,sum_torque=point(0),point(0)
            max_root_width=F(0)
            min_divisor,max_divisor=F(5,4),F(3,4)
            for index in range(count):
                guard()
                left=2*IV.pi*index/count
                right=2*IV.pi*(index+1)/count
                phi=IV.mpf([left.a,right.b])
                work,torque,rwidth,dlo,dhi=cell(phi,p)
                sum_work+=work
                sum_torque+=torque
                entry=[index,packed(work),packed(torque)]
                rec['cells'].append(entry)
                bytes_used+=len(json.dumps(entry,separators=(',',':')))+1
                max_root_width=max(max_root_width,rwidth)
                min_divisor,max_divisor=min(min_divisor,dlo),max(max_divisor,dhi)
                if bytes_used>OUTPUT_LIMIT-65536:
                    raise RuntimeError('receipt byte budget reached')
                if time.monotonic()-LAST>=5:
                    print(json.dumps({'progress':'phase','stage':stage,'bin':name,
                          'completed':index+1,'total':count,'seconds':time.monotonic()-START}),flush=True)
                    LAST=time.monotonic()
            mean_work,mean_torque=sum_work/count,sum_torque/count
            rec.update(complete=True,mean_work=packed(mean_work),mean_torque=packed(mean_torque),
                       positive_work=endpoints(mean_work)[0]>0,
                       positive_torque=endpoints(mean_torque)[0]>0,
                       negative_torque=endpoints(mean_torque)[1]<0,
                       root_count=5*count,max_root_width=str(max_root_width),
                       divisor_range=[str(min_divisor),str(max_divisor)])
            print(json.dumps({'progress':'bin','stage':stage,'bin':name,
                  'mean_work_display_only':diagnostic(mean_work),
                  'mean_torque_display_only':diagnostic(mean_torque)}),flush=True)
        result['complete']=True
        result['all_work_positive']=all(r['positive_work'] for r in result['records'])
        result['work_exclusion_certified']=stage=='target' and result['all_work_positive']
        result['endpoint_signs_certified']=stage=='endpoints' and result['records'][0]['positive_torque'] and result['records'][1]['negative_torque']
    except Exception as exc:
        result['failure']=type(exc).__name__+': '+str(exc)
        # All complete cells, including those in an interrupted bin, remain retained.
    return result


def save(output,stage,result):
    result.update(stage=stage,instrument_sha256=digest(Path(__file__)),
                  interval_dps=IV.dps,mpmath_version=mp.__version__,K=1,c_f=1,
                  utc=datetime.now(timezone.utc).isoformat(),
                  wall_seconds=time.monotonic()-START,max_rss_bytes=resident_bytes())
    data=json.dumps(result,separators=(',',':'))+'\n'
    if len(data.encode())>OUTPUT_LIMIT:
        raise RuntimeError('full receipt exceeds 8 MiB; original output not overwritten')
    output.parent.mkdir(parents=True,exist_ok=True)
    with output.open('x') as stream:
        stream.write(data)
    print(json.dumps({'receipt':str(output),'sha256':digest(output),
                      'complete':result['complete'],'seconds':result['wall_seconds']}),flush=True)


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--stage',choices=['known','pilot','target','endpoints'],required=True)
    parser.add_argument('--output',type=Path,required=True)
    args=parser.parse_args()
    output=args.output.resolve()
    if not output.is_relative_to(OWNER.resolve()):
        raise SystemExit('receipt path must remain under independent-finite-speed-work owner')
    if output.exists():
        raise SystemExit('receipt already exists; choose a fresh retained run directory')
    START=LAST=time.monotonic()
    signal.signal(signal.SIGALRM,alarm_handler)
    signal.alarm(WALL_LIMIT)
    try:
        result=known() if args.stage=='known' else run_stage(args.stage,output.parent)
        signal.alarm(0)
        save(output,args.stage,result)
    finally:
        signal.alarm(0)
    raise SystemExit(0 if result['complete'] else 1)
