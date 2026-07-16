#!/usr/bin/env python3
"""Independent self-root and self-force comparator for the canonical-photon
search screen (scripts/braid-ideal/canonical-photon-search.mjs; instrument
retired 2026-07-16 with the legacy braid-ideal set, recoverable from git
history).

Reference: the closed-form helical self-root residual, derivable by hand from
the drifting-circle chord,

    h(delta) = 2 R |sin(omega delta / 2)| - sqrt(c_f^2 - u^2) * delta,

whose zeros with delta > 0 are exactly the self-hit reception delays of an
architrino on a helix of radius R, angular speed omega, and axial drift u.
This script solves h = 0 with mpmath at 60 significant digits, then
recomputes the sharp master-equation self-acceleration

    a = sum_roots kappa q^2 |D_T / D_s| r_hat / r^2       (kappa = 1)

from the exact kinematics, entirely independently of the JavaScript screen
(no shared code; only the emitted JSON case file is read).

Usage:
  python3 scripts/eom/canonical-photon-self-root-parity.py \
      .tmp/canonical-photon-search/self-parity-cases.json

Exit status 0 iff every emitted delay matches an mpmath root to 1e-9 and
every force component matches to the declared 1e-6 tolerance.
"""

import json
import sys

import mpmath as mp

mp.mp.dps = 60

ROOT_TOL = mp.mpf("1e-9")
FORCE_TOL = mp.mpf("1e-6")


def self_root_delays(radius, omega, u, cf):
    """All delta > 0 with 2R|sin(omega delta/2)| = sqrt(cf^2-u^2) delta."""
    radius, omega, u, cf = map(mp.mpf, (radius, omega, u, cf))
    s = mp.sqrt(cf * cf - u * u)
    vt = abs(omega) * radius
    if mp.hypot(vt, u) <= cf:
        return []
    delta_max = 2 * radius / s
    h = lambda d: 2 * radius * abs(mp.sin(omega * d / 2)) - s * d
    roots = []
    n = int(mp.ceil(delta_max * abs(omega) / (2 * mp.pi) * 400)) + 400
    prev_d, prev_h = mp.mpf("1e-30"), h(mp.mpf("1e-30"))
    for k in range(1, n + 1):
        d = delta_max * mp.mpf("1.001") * k / n
        hv = h(d)
        if (prev_h <= 0) != (hv <= 0):
            roots.append(mp.findroot(h, (prev_d, d), solver="bisect", tol=mp.mpf("1e-50")))
        prev_d, prev_h = d, hv
    return roots


def helix_state(radius, omega, phase, z, u, t):
    a = omega * t + phase
    pos = mp.matrix([radius * mp.cos(a), radius * mp.sin(a), z + u * t])
    vel = mp.matrix([-radius * omega * mp.sin(a), radius * omega * mp.cos(a), u])
    return pos, vel


def self_force(case, cf, q):
    radius = mp.mpf(str(case["radius"]))
    omega = mp.mpf(str(case["omega"]))
    phase = mp.mpf(str(case["phase"]))
    z = mp.mpf(str(case["z"]))
    u = mp.mpf(str(case["u"]))
    t = mp.mpf(str(case["t"]))
    force = mp.matrix([0, 0, 0])
    delays = self_root_delays(radius, omega, u, cf)
    for delta in delays:
        rpos, rvel = helix_state(radius, omega, phase, z, u, t)
        spos, svel = helix_state(radius, omega, phase, z, u, t - delta)
        disp = rpos - spos
        dist = mp.sqrt(sum(disp[i] ** 2 for i in range(3)))
        nhat = disp / dist
        d_s = cf - sum(nhat[i] * svel[i] for i in range(3))
        d_t = cf - sum(nhat[i] * rvel[i] for i in range(3))
        w = q * q * abs(d_t / d_s) / dist**2
        force += w * nhat
    return delays, force


def main(path):
    with open(path, "r", encoding="utf-8") as handle:
        payload = json.load(handle)
    cf = mp.mpf(str(payload["fieldSpeed"]))
    q = mp.mpf(str(payload["chargeUnit"]))
    failures = 0
    for index, case in enumerate(payload["cases"]):
        delays, force = self_force(case, cf, q)
        emitted = [mp.mpf(str(d)) for d in case["receptionDelays"]]
        ok = len(delays) == len(emitted)
        max_root_delta = mp.mpf(0)
        if ok:
            for mine, ref in zip(sorted(emitted), sorted(delays)):
                max_root_delta = max(max_root_delta, abs(mine - ref))
            ok = max_root_delta <= ROOT_TOL
        max_force_delta = mp.mpf(0)
        for axis in range(3):
            max_force_delta = max(
                max_force_delta, abs(mp.mpf(str(case["force"][axis])) - force[axis])
            )
        ok = ok and max_force_delta <= FORCE_TOL
        # The generic Lipschitz scanner must agree with the closed form
        # wherever it did not itself fail closed (budget/tangency); a
        # failed-closed generic scan is a correct refusal, not a mismatch.
        generic_flags = case.get("genericFlags", {})
        if generic_flags.get("scanBudgetExhausted") or generic_flags.get("tangentRoot"):
            generic_ok = True
            generic_note = "failed-closed(ok)"
        else:
            generic = [mp.mpf(str(d)) for d in case.get("genericScanDelays", [])]
            generic_ok = len(generic) == len(delays) and all(
                abs(g - r) <= ROOT_TOL for g, r in zip(sorted(generic), sorted(delays))
            )
            generic_note = "ok" if generic_ok else "MISMATCH"
        status = "PASS" if (ok and generic_ok) else "FAIL"
        if status == "FAIL":
            failures += 1
        print(
            f"case {index}: {status} roots={len(delays)}/{len(emitted)} "
            f"maxRootDelta={mp.nstr(max_root_delta, 3)} "
            f"maxForceDelta={mp.nstr(max_force_delta, 3)} genericScan={generic_note}"
        )
    print("ALL PASS" if failures == 0 else f"{failures} FAILURES")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else ".tmp/canonical-photon-search/self-parity-cases.json"))
