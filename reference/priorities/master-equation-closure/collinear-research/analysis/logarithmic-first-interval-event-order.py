"""Evaluate the proved stationary logarithmic first-event criterion, c_f=1.

This is scalar quadrature and root evaluation, not a trajectory simulation or
an interval certificate. Analytical controls run before any target evaluation.
Run with the repository's shared Python environment.
"""
import json
import mpmath as mp

mp.mp.dps = 60


def bisect(function, left, right):
    left, right = mp.mpf(left), mp.mpf(right)
    fl, fr = function(left), function(right)
    if fl == 0:
        return left
    if fr == 0:
        return right
    if fl * fr >= 0:
        raise ValueError("A sign-changing bracket is required")
    for _ in range(190):
        middle = (left + right) / 2
        fm = function(middle)
        if fm == 0:
            return middle
        if fl * fm < 0:
            right = middle
        else:
            left, fl = middle, fm
    return (left + right) / 2


def clock_over_2a(u, coupling):
    return mp.quad(lambda w: mp.exp(-w*w/(2*coupling)), [0, u]) / coupling


def source_time_over_2a(u, coupling):
    return clock_over_2a(u, coupling) - mp.exp(-u*u/(2*coupling))


def criterion(coupling):
    return mp.quad(lambda w: mp.exp((1-w*w)/(2*coupling)), [0, 1]) / coupling - 1


def text_number(value):
    return mp.nstr(value, 32)


if __name__ == "__main__":
    assert abs(mp.quad(lambda w: w*w, [0, 1]) - mp.mpf(1)/3) < mp.mpf("1e-55")
    assert abs(bisect(lambda z: z*z-2, 1, 2) - mp.sqrt(2)) < mp.mpf("1e-55")
    try:
        bisect(lambda z: z*z+1, 0, 1)
    except ValueError:
        pass
    else:
        raise AssertionError("Non-bracketing input was accepted")
    print("Known controls PASS before targets: polynomial integral, sqrt(2) root, invalid bracket.", flush=True)

    critical = bisect(criterion, 1, 2)
    examples = []
    for coupling in map(mp.mpf, ["0.5", "1", "2"]):
        join_first = criterion(coupling) > 0
        u = bisect(lambda v: source_time_over_2a(v, coupling), 0, 1) if join_first else mp.mpf(1)
        examples.append({
            "K": text_number(coupling),
            "first_event": "release-wake arrival" if join_first else "excluded speed-one boundary",
            "u": text_number(u),
            "x_over_a": text_number(2*mp.exp(-u*u/(2*coupling))-1),
            "T_over_a": text_number(2*clock_over_2a(u, coupling)),
        })
    print(json.dumps({
        "grade": "high-precision numerical evaluation of a derived scalar criterion; not certified intervals",
        "K_critical": text_number(critical),
        "critical_x_over_a": text_number(2*mp.exp(-1/(2*critical))-1),
        "critical_T_over_a": text_number(2*mp.exp(-1/(2*critical))),
        "examples": examples,
    }, indent=2))
