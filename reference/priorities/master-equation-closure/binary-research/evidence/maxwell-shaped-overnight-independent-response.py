"""Independent prescribed-history reference, not the EOM solver.

Compute derivatives of 1/(R D) and v/(R D) using four-variable forward
automatic differentiation. No closed E numerator or receiver identity is used.
All numerical cases use c_f=K=1. Roots use contraction, not bisection.
"""
import argparse
import json
import math
from pathlib import Path
import numpy as np


class Jet:
    def __init__(self, value, derivatives=None):
        self.value = float(value)
        self.d = np.zeros(4) if derivatives is None else np.array(derivatives, float)

    def __add__(self, other):
        other = jet(other)
        return Jet(self.value + other.value, self.d + other.d)

    __radd__ = __add__

    def __neg__(self):
        return Jet(-self.value, -self.d)

    def __sub__(self, other):
        return self + -jet(other)

    def __rsub__(self, other):
        return jet(other) + -self

    def __mul__(self, other):
        other = jet(other)
        return Jet(self.value * other.value, self.d * other.value + other.d * self.value)

    __rmul__ = __mul__

    def __truediv__(self, other):
        other = jet(other)
        return Jet(self.value / other.value,
                   (self.d - (self.value / other.value) * other.d) / other.value)

    def __rtruediv__(self, other):
        return jet(other) / self

    def sqrt(self):
        result = math.sqrt(self.value)
        return Jet(result, self.d / (2 * result))


def jet(value):
    return value if isinstance(value, Jet) else Jet(value)


def contracted_root(source, x, time, speed_bound, tolerance=2e-13):
    """Complete all-root theorem applies only when actual bound is valid."""
    assert 0 <= speed_bound < 1
    x = np.asarray(x, float)
    simultaneous = np.linalg.norm(x - source(time)[0])
    assert simultaneous > 0
    delay = simultaneous
    for iteration in range(10000):
        sampled_delay = np.linalg.norm(x - source(time - delay)[0])
        bound = abs(sampled_delay - delay) / (1 - speed_bound)
        if bound <= tolerance * max(1.0, delay):
            emission = time - delay
            position, velocity, acceleration = source(emission)
            range_value = np.linalg.norm(x - position)
            n = (x - position) / range_value
            denominator = 1 - np.dot(n, velocity)
            assert denominator >= 1 - speed_bound - 1e-12
            return dict(S=float(emission), R=float(range_value), n=n, v=velocity,
                        a=acceleration, D=float(denominator), root_error_estimate=float(bound),
                        root_residual=float(sampled_delay-delay), root_iterations=iteration+1,
                        simultaneous=float(simultaneous),
                        delay_bounds=[float(simultaneous/(1+speed_bound)),
                                      float(simultaneous/(1-speed_bound))])
        delay = sampled_delay
    raise RuntimeError("contraction failed; do not classify as root-free")


def response_at_root(x, u, geometry):
    """Wake derivatives following implicit root; curl checks M separately."""
    x, u = np.asarray(x), np.asarray(u)
    n, v, a, denominator = (geometry[k] for k in ('n', 'v', 'a', 'D'))
    ds = np.concatenate((-n / denominator, [1 / denominator]))
    source_x = x - geometry['R'] * n
    xd = [Jet(x[k], np.eye(4)[k]) for k in range(3)]
    source_xd = [Jet(source_x[k], v[k] * ds) for k in range(3)]
    source_vd = [Jet(v[k], a[k] * ds) for k in range(3)]
    displacement = [xd[k] - source_xd[k] for k in range(3)]
    rd = sum(z*z for z in displacement).sqrt()
    nd = [z / rd for z in displacement]
    dd = 1 - sum(nd[k]*source_vd[k] for k in range(3))
    amplitude = 1 / (rd * dd)
    vector = [amplitude * z for z in source_vd]
    G = -amplitude.d[:3]
    W = -np.array([z.d[3] for z in vector])
    E = G + W
    curl = np.array([vector[2].d[1]-vector[1].d[2],
                     vector[0].d[2]-vector[2].d[0],
                     vector[1].d[0]-vector[0].d[1]])
    M = np.cross(u, curl)
    return dict(G=G, W=W, E=E, M=M, full=E+M, curl=curl)


def reference(source, x, time, u, speed_bound, tolerance=2e-13):
    geometry = contracted_root(source, x, time, speed_bound, tolerance)
    return {**geometry, **response_at_root(x, u, geometry)}


def jsonable(value):
    if isinstance(value, np.ndarray):
        return value.tolist()
    if isinstance(value, np.generic):
        return value.item()
    if isinstance(value, dict):
        return {k: jsonable(v) for k, v in value.items()}
    if isinstance(value, list):
        return [jsonable(v) for v in value]
    return value


def controls():
    records = []
    def check(name, source, x, time, u, q, known_s, expected_e, expected_m):
        result = reference(source, x, time, u, q)
        errors = dict(S=abs(result['S']-known_s),
                      E=float(np.linalg.norm(result['E']-expected_e)),
                      M=float(np.linalg.norm(result['M']-expected_m)))
        assert max(errors.values()) < 2e-11, (name, errors)
        records.append(dict(name=name, errors=errors, result=result))
    zero = np.zeros(3)
    check('stationary source; moving receiver', lambda s:(zero,zero,zero),
          np.array([2.,0,0]), 0., np.array([.2,.3,-.1]), 0., -2.,
          np.array([.25,0,0]), zero)
    b = np.array([.3,.4,0])
    x = np.array([1.,-.7,.5])
    u = np.array([.2,.3,-.1])
    b2, xb = np.dot(b,b), np.dot(x,b)
    discriminant = math.sqrt(xb*xb+(1-b2)*np.dot(x,x))
    delay = (xb+discriminant)/(1-b2)
    e = (1-b2)*x/discriminant**3
    check('affine source; quadratic root and present-position formula',
          lambda s:(b*s,b,zero), x, 0., u, .5, -delay,
          e, np.cross(u,np.cross(b,e)))
    eta, s0 = .08, -2.
    source = lambda s:(np.array([eta*math.sin(s),0,0]),
                      np.array([eta*math.cos(s),0,0]),
                      np.array([-eta*math.sin(s),0,0]))
    x = source(s0)[0] + np.array([2.,0,0])
    v0 = eta*math.cos(s0)
    check('accelerated collinear; acceleration cancels exactly', source,
          x, 0., np.array([-.3,0,0]), eta, s0,
          np.array([(1+v0)/(4*(1-v0)),0,0]), zero)
    eta = .1
    source = lambda s:(np.array([0,eta*(1-math.cos(s-s0)),0]),
                      np.array([0,eta*math.sin(s-s0),0]),
                      np.array([0,eta*math.cos(s-s0),0]))
    e = np.array([.25,-eta/2,0])
    u = np.array([.2,.3,-.1])
    check('accelerated transverse; v zero, explicit transverse acceleration',
          source, np.array([2.,0,0]), 0., u, eta, s0,
          e, np.cross(u,np.array([0,0,-eta/2])))
    return dict(passed=True, known_cases=records,
                scope='automatic potential derivatives and complete contraction root; floating point')


def circle_source(beta, phase=math.pi, radius=1.):
    omega = beta / radius
    def source(s):
        angle = phase + omega*s
        direction = np.array([math.cos(angle), math.sin(angle), 0.])
        tangent = np.array([-math.sin(angle), math.cos(angle), 0.])
        return radius*direction, beta*tangent, -beta*omega*direction
    return source


def circles():
    records = []
    for beta in [.02,.1,.5,.9]:
        result = reference(circle_source(beta), np.array([1.,0,0]),0.,
                           np.array([0,beta,0]), beta)
        h = -beta*result['S']/2
        c, s = math.cos(h), math.sin(h)
        d = 1+beta*s
        F = beta**3+beta**2*s*(2+math.cos(2*h))+beta*math.cos(2*h)-s
        expected = np.array([(1+2*beta*s-beta**2*math.cos(2*h))/(4*c*d**3),
                             F/(4*c*c*d**3),0.])
        assert np.linalg.norm(result['E']-expected) < 2e-11
        assert abs(result['M'][1]) < 2e-12
        records.append(dict(beta=beta, result=result,
                            analytic_error=float(np.linalg.norm(result['E']-expected)),
                            strict_tangential_lower_bound=beta**3/(4*c*c*d**3)))
    return records


if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--circles', action='store_true')
    parser.add_argument('--output')
    args=parser.parse_args()
    result=dict(controls=controls())
    if args.circles:
        result['circles']=circles()
    encoded=json.dumps(jsonable(result), indent=2)+'\n'
    if args.output:
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        Path(args.output).write_text(encoded)
    print(json.dumps(dict(passed=result['controls']['passed'],
                         known_case_count=len(result['controls']['known_cases']),
                         target_case_count=len(result.get('circles', [])))))
