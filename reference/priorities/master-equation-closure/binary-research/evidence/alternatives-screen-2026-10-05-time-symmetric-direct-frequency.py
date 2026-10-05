"""Independent direct Cartesian tensor reference; measured frequencies only."""
import argparse
import json
import mpmath as mp

mp.mp.dps = 65
I = mp.eye(2)
J = mp.matrix([[0, -1], [1, 0]])


def rot(t):
    return mp.matrix([[mp.cos(t), -mp.sin(t)], [mp.sin(t), mp.cos(t)]])


def derivative(n, v, acc, radius, eps):
    nn = n * n.T
    den = 1 + eps * (n.T * v)[0]
    proj = I - nn
    clock = I - eps * v * n.T / den
    mat = -((I - 3 * nn) * clock - eps * n * v.T * proj * clock / den
            - radius * (n.T * acc)[0] * nn / den**2) / (radius**3 * den)
    vel = eps * nn / (radius**2 * den**2)
    return mat, vel


def tensors(beta):
    x = mp.findroot(lambda z: z - beta * mp.cos(z), (0, beta))
    c = mp.cos(x)
    den = 1 + beta * mp.sin(x)
    r = 1 / (4 * beta**2 * c * den)
    omega = beta / r
    rows = []
    for eps in [-1, 1]:
        phase = 2 * eps * x
        source = -r * mp.matrix([mp.cos(phase), mp.sin(phase)])
        receiving = mp.matrix([r, 0])
        ray = receiving - source
        length = mp.norm(ray)
        n = ray / length
        velocity = omega * J * source
        acc = -omega**2 * source
        mat, vel = derivative(n, velocity, acc, length, eps)
        rows.append((eps, mat / omega**2, vel / omega))
    return x, rows


def symbol(m, parity, x, rows):
    own = mp.j * m * I + J
    ans = own * own
    for eps, mat, vel in rows:
        ans -= mat / 2
        ans += parity * (mat - vel * own) * rot(2 * eps * x) * mp.exp(2 * mp.j * eps * m * x) / 2
    return ans


def det(m, parity, x, rows):
    d = mp.det(symbol(m, parity, x, rows))
    assert abs(mp.im(d)) < mp.mpf('1e-50')
    return mp.re(d)


def known():
    n = mp.matrix([1, 0])
    zero = mp.matrix([0, 0])
    for eps in [-1, 1]:
        mat, vel = derivative(n, zero, zero, mp.mpf(4), eps)
        assert mp.norm(mat - mp.matrix([[mp.mpf(1)/32, 0], [0, -mp.mpf(1)/64]])) < mp.mpf('1e-60')
        assert mp.norm(vel - mp.matrix([[mp.mpf(eps)/16, 0], [0, 0]])) < mp.mpf('1e-60')
    x, rows = tensors(mp.mpf('0.2'))
    assert mp.norm(symbol(1, 1, x, rows) * mp.matrix([1, mp.j])) < mp.mpf('1e-55')
    assert mp.norm(symbol(0, -1, x, rows) * mp.matrix([0, 1])) < mp.mpf('1e-55')
    for parity in [-1, 1]:
        h = symbol(mp.mpf('1.7'), parity, x, rows)
        assert mp.norm(h - h.H) < mp.mpf('1e-55')
    limit = [(eps, mp.matrix([[1, 0], [0, -mp.mpf('0.5')]]), mp.zeros(2)) for eps in [-1, 1]]
    for m in [mp.mpf('0.5'), mp.mpf('1.3'), mp.mpf(4)]:
        assert abs(det(m, 1, 0, limit) - (m*m-1)**2) < mp.mpf('1e-55')
        assert abs(det(m, -1, 0, limit) - m*m*(m*m-1)) < mp.mpf('1e-55')
    return {'passed': True, 'controls': ['stationary full derivative in both directions', 'translation and phase at nonzero speed', 'Hermitian real-frequency symbol', 'zero-speed limiting determinants']}


def target():
    results = []
    for raw in ['0.1', '0.25', '0.5', '0.75', '0.9', '0.99']:
        beta = mp.mpf(raw)
        x, rows = tensors(beta)
        opposite = lambda m: det(m, -1, x, rows)
        root = mp.findroot(opposite, (mp.mpf('0.5'), mp.mpf('1.1')))
        common_coefficient = mp.diff(lambda m: det(m, 1, x, rows), 1, 2) / 2
        phase_coefficient = mp.diff(opposite, 0, 2) / 2
        results.append({'beta': raw, 'x': str(x), 'oppositeCandidate': str(root), 'oppositeSlope': str(mp.diff(opposite, root)), 'commonDoubleCoefficient': str(common_coefficient), 'oppositeZeroDoubleCoefficient': str(phase_coefficient), 'grade': 'finite precision candidate and derivatives, not enclosure or complete root census'})
    return results


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--target', action='store_true')
    args = p.parse_args()
    answer = {'knownFirst': known()}
    if args.target:
        answer['target'] = target()
    print(json.dumps(answer, indent=2))
