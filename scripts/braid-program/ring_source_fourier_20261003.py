"""Periodic source Fourier comparison, never an evolution instrument.

All roots are represented by the emission-time pushforward integral. Stage
known must pass on this exact source identity before target is permitted.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-exploration/source'
mp.mp.dps = 60


def identity():
    return hashlib.sha256(Path(__file__).read_bytes()).hexdigest()


def integrate(fn, panels=24):
    return mp.quad(fn, [2*mp.pi*j/panels for j in range(panels+1)])/(2*mp.pi)


def coefficient(x, radius, omega, members, harmonic, panels=24):
    # Evaluate each source explicitly; do not short-circuit phase cancellation.
    total = [mp.mpc(0) for _ in range(3)]
    for j in range(members):
        phase = 2*mp.pi*j/members

        def row(theta, axis):
            position = [radius*mp.cos(theta+phase), radius*mp.sin(theta+phase), 0]
            separation = [x[k]-position[k] for k in range(3)]
            distance = mp.sqrt(sum(v*v for v in separation))
            return ((-1)**j)*separation[axis]/distance**3 * mp.exp(-1j*harmonic*(theta+omega*distance))

        for axis in range(3):
            total[axis] += integrate(lambda theta: row(theta, axis), panels)
    return total


def stringify(value):
    if isinstance(value, dict):
        return {k: stringify(v) for k,v in value.items()}
    if isinstance(value, (list,tuple)):
        return [stringify(v) for v in value]
    if isinstance(value, (str,bool,int)) or value is None:
        return value
    if isinstance(value, mp.mpc):
        return {'real':mp.nstr(value.real,45), 'imag':mp.nstr(value.imag,45)}
    return mp.nstr(value,45)


def save(stage, values):
    OUT.mkdir(parents=True, exist_ok=True)
    payload = {'stage':stage, 'sourceSha256':identity(), 'c_f':1, 'K':1,
               'grade':'measured quadrature comparison; no sign certificate', **values}
    (OUT/(stage+'.json')).write_text(json.dumps(stringify(payload),indent=2)+'\n')
    print(json.dumps({'stage':stage,'path':str(OUT/(stage+'.json')),'passed':values['passed']}))


def known():
    # Independent closed forms precede any exact-ring target.
    constant = integrate(lambda t: mp.mpf(1)/4)
    harmonic = integrate(lambda t: mp.exp(-1j*t)/4)
    square_axis = coefficient([0,0,2],mp.mpf(1),mp.mpf('.1'),4,2)
    binary_axis = coefficient([0,0,2],mp.mpf(1),mp.mpf('.1'),2,1)
    distance = mp.sqrt(5)
    expected = [-mp.exp(-1j*mp.mpf('.1')*distance)/distance**3,
                1j*mp.exp(-1j*mp.mpf('.1')*distance)/distance**3,0]
    errors = [abs(constant-mp.mpf(1)/4),abs(harmonic),
              max(map(abs,square_axis)),max(abs(a-b) for a,b in zip(binary_axis,expected))]
    assert max(errors)<mp.mpf('1e-50')
    save('known', {'passed':True, 'controls':['static source coefficient 1/4',
         'static source k1 zero','alternating square axis zero',
         'binary axis closed rotating vector'], 'absoluteErrors':errors})


def target():
    receipt = json.loads((OUT/'known.json').read_text())
    assert receipt['passed'] and receipt['sourceSha256']==identity()
    beta=mp.mpf('1.826430964654678725003434188109838')
    radius=mp.mpf('0.975976431801690696803573313538935')
    omega=beta/radius
    rows=[]
    for distance_ratio, polar_angle in [(10,mp.pi/6),(10,mp.pi/2),(100,mp.pi/6),(100,mp.pi/2)]:
        distance=distance_ratio*radius
        direction=[mp.sin(polar_angle),0,mp.cos(polar_angle)]
        x=[distance*a for a in direction]
        for k in [0,1,3,9]:
            value=coefficient(x,radius,omega,6,k)
            refined=coefficient(x,radius,omega,6,k,48)
            # An independently derived far-distance coefficient, with a
            # deterministic analytic error bound from the analysis.
            b=beta*mp.sin(polar_angle)
            phase=mp.exp(-1j*k*omega*distance)
            integral=integrate(lambda t:mp.exp(-1j*k*t+1j*k*b*mp.cos(t)),48)
            leading=[6*a*phase*integral/distance**2 for a in direction] if k%6==3 else [0,0,0]
            bound=6*(radius/(distance-radius)**3+3*distance*radius/(distance-radius)**4
                     +abs(k)*omega*radius**2/(2*distance**2*(distance-radius)))
            error=max(abs(a-b) for a,b in zip(refined,leading))
            assert error<=bound
            rows.append({'distanceOverR':distance_ratio,'theta':polar_angle,'k':k,
                         'coefficient':refined,'norm':mp.sqrt(sum(abs(a)**2 for a in refined)),
                         'panelRefinementDifference':max(abs(a-b) for a,b in zip(value,refined)),
                         'farCoefficient':leading,'observedFarError':error,
                         'derivedFarErrorUpper':bound})
    save('target',{'passed':True,'scenario':'prescribed approximation of exact T02 source; stationary virtual probe',
                  'referencePrecision':'33-digit displayed beta and radius, not exact-balance interval',
                  'rows':rows,'boundary':'quadrature and refinement are measured; analytical identities supply exact cancellation'})


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--stage',choices=['known','target'],required=True)
    args=parser.parse_args()
    known() if args.stage=='known' else target()
