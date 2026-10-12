"""Prototype validated far-step carrier. Scratch evidence, not production.

Implements one step of the theorem of addendum 1, section 5 (hypotheses H0 to
H5), in exact rational arithmetic with outward rounding to DIGITS decimals. It
imports no solver code and changes no solver behaviour. c_f = 1 throughout.

A path is {"id", "charge", "segments"}; a segment is
{"t0", "t1", "c", "rx", "rv", "provenance"} with c[axis] the four cubic
coefficients about t0, and rx, rv per-axis radii. The meaning of a segment is
the H0 statement: for every t in [t0, t1] the true position lies within rx of
the cubic and the true velocity within rv of its derivative, per axis.

step(paths, T, h, kappa, budgets) returns a certificate. Its status is
"certified" only when H0 to H5 all hold and the declared budgets are met; then
and only then it carries published segments. Otherwise the status is
"declined" with a code and no published continuation.

The canonical per-hit acceleration of receiver i from source j is
kappa q_i q_j n / (r^2 D), n = (x - y) / r, D = 1 - n . u, for source emission
position y and velocity u, receiver position x, r = |x - y|.
"""
from bisect import bisect_right
from fractions import Fraction as Q
from math import isqrt

DIGITS = 36
SCALE = 10 ** DIGITS
ADMITTED = ("exact_prescribed", "validated_far_step")


def down(x):
    return Q((x.numerator * SCALE) // x.denominator, SCALE)


def up(x):
    return Q(-((-x.numerator * SCALE) // x.denominator), SCALE)


def sqrt_down(x):
    if x < 0:
        raise ValueError("negative square root argument")
    return Q(isqrt((x.numerator * SCALE * SCALE) // x.denominator), SCALE)


def sqrt_up(x):
    if x < 0:
        raise ValueError("negative square root argument")
    return Q(isqrt(-((-x.numerator * SCALE * SCALE) // x.denominator)) + 1, SCALE)


class I:
    """Closed interval with rational endpoints; products are rounded outward."""
    __slots__ = ("lo", "hi")

    def __init__(self, lo, hi=None):
        self.lo = Q(lo)
        self.hi = Q(lo if hi is None else hi)
        if self.lo > self.hi:
            raise ValueError("empty interval")

    def __add__(self, o):
        o = o if isinstance(o, I) else I(o)
        return I(self.lo + o.lo, self.hi + o.hi)

    def __sub__(self, o):
        o = o if isinstance(o, I) else I(o)
        return I(self.lo - o.hi, self.hi - o.lo)

    def __neg__(self):
        return I(-self.hi, -self.lo)

    def __mul__(self, o):
        o = o if isinstance(o, I) else I(o)
        p = (self.lo * o.lo, self.lo * o.hi, self.hi * o.lo, self.hi * o.hi)
        return I(down(min(p)), up(max(p)))

    def inverse_positive(self):
        if self.lo <= 0:
            raise ValueError("interval not strictly positive")
        return I(down(1 / self.hi), up(1 / self.lo))

    def hull(self, o):
        return I(min(self.lo, o.lo), max(self.hi, o.hi))

    def meet(self, o):
        return I(max(self.lo, o.lo), min(self.hi, o.hi))

    def contains(self, o):
        return self.lo <= o.lo and o.hi <= self.hi

    def mid(self):
        return (self.lo + self.hi) / 2

    def rad(self):
        return (self.hi - self.lo) / 2

    def mag(self):
        return max(abs(self.lo), abs(self.hi))

    def mig(self):
        if self.lo <= 0 <= self.hi:
            return Q(0)
        return min(abs(self.lo), abs(self.hi))

    def as_floats(self):
        return [float(self.lo), float(self.hi)]


def box_sup_norm(box):
    return sqrt_up(sum(c.mag() ** 2 for c in box))


def box_inf_norm(box):
    return sqrt_down(sum(c.mig() ** 2 for c in box))


def box_sub(a, b):
    return [x - y for x, y in zip(a, b)]


def shifted(c, a):
    """Coefficients about t0 + a of the cubic with coefficients c about t0."""
    c0, c1, c2, c3 = c
    return (c0 + c1 * a + c2 * a * a + c3 * a ** 3,
            c1 + 2 * c2 * a + 3 * c3 * a * a,
            c2 + 3 * c3 * a,
            c3)


def cubic_range(b, L):
    b0, b1, b2, b3 = b
    controls = (b0, b0 + b1 * L / 3, b0 + 2 * b1 * L / 3 + b2 * L * L / 3,
                b0 + b1 * L + b2 * L * L + b3 * L ** 3)
    return I(min(controls), max(controls))


def derivative_range(b, L):
    """Exact range on [0, L] of the quadratic b1 + 2 b2 s + 3 b3 s^2.

    Endpoint values and, when it lies inside, the vertex value. Bernstein
    controls would also enclose it but overestimate a half-period arch by a
    factor of two, which is enough to fail the speed hypothesis needlessly.
    """
    _, b1, b2, b3 = b
    values = [b1, b1 + 2 * b2 * L + 3 * b3 * L * L]
    if b3 != 0:
        vertex = -b2 / (3 * b3)
        if 0 < vertex < L:
            values.append(b1 + 2 * b2 * vertex + 3 * b3 * vertex * vertex)
    return I(min(values), max(values))


def hull_over(path, s0, s1, derivative):
    """Hull of the position or velocity tube of a path over [s0, s1]."""
    segments = path["segments"]
    if s0 < segments[0]["t0"] or s1 > segments[-1]["t1"] or s0 > s1:
        raise ValueError("window outside the retained history")
    result = None
    # Segments are contiguous and ordered; start at the last one with t0 <= s0.
    first = max(bisect_right(segments, s0, key=lambda seg: seg["t0"]) - 1, 0)
    for seg in segments[first:]:
        if seg["t0"] > s1:
            break
        a, b = max(s0, seg["t0"]), min(s1, seg["t1"])
        if a > b:
            continue
        box = []
        for axis in range(3):
            coefficients = shifted(seg["c"][axis], a - seg["t0"])
            rng = (derivative_range if derivative else cubic_range)(
                coefficients, b - a)
            r = (seg["rv"] if derivative else seg["rx"])[axis]
            box.append(I(rng.lo - r, rng.hi + r))
        result = box if result is None else [
            x.hull(y) for x, y in zip(result, box)]
    return result


def past_speed_bound(path, s0, s1):
    """Sup of the speed over the tube on [s0, s1], taken per segment."""
    bound = Q(0)
    for seg in path["segments"]:
        a, b = max(s0, seg["t0"]), min(s1, seg["t1"])
        if a > b:
            continue
        whole = a == seg["t0"] and b == seg["t1"]
        if whole and "_speed_bound" in seg:
            value = seg["_speed_bound"]
        else:
            value = box_sup_norm(hull_over({"segments": [seg]}, a, b, True))
            if whole:
                seg["_speed_bound"] = value  # cache; segments are immutable
        bound = max(bound, value)
    return bound


def end_section(path):
    seg = path["segments"][-1]
    L = seg["t1"] - seg["t0"]
    X, V = [], []
    for axis in range(3):
        b = shifted(seg["c"][axis], L)
        X.append(I(b[0] - seg["rx"][axis], b[0] + seg["rx"][axis]))
        V.append(I(b[1] - seg["rv"][axis], b[1] + seg["rv"][axis]))
    return X, V


def check_h0(paths, T):
    """Provenance, common end time, and exact C1 joins of prescribed data."""
    for path in paths:
        segments = path["segments"]
        if segments[-1]["t1"] != T:
            return f"path {path['id']} history does not end at T"
        for k, seg in enumerate(segments):
            if seg["provenance"] not in ADMITTED:
                return (f"path {path['id']} segment {k} has provenance "
                        f"{seg['provenance']!r}")
            if seg["t1"] <= seg["t0"]:
                return f"path {path['id']} segment {k} has no duration"
            if seg["provenance"] == "exact_prescribed" and (
                    any(seg["rx"]) or any(seg["rv"])):
                return f"path {path['id']} segment {k}: prescribed with radius"
            if k == 0:
                continue
            prev = segments[k - 1]
            if prev["t1"] != seg["t0"]:
                return f"path {path['id']} segment {k} is not contiguous"
            if (prev["provenance"] == "exact_prescribed"
                    and seg["provenance"] == "exact_prescribed"):
                L = prev["t1"] - prev["t0"]
                for axis in range(3):
                    b = shifted(prev["c"][axis], L)
                    if (b[0] != seg["c"][axis][0]
                            or b[1] != seg["c"][axis][1]):
                        return (f"path {path['id']} join {k} is not exactly "
                                "continuously differentiable")
    return ""


def declined(code, reason, detail):
    return {"schema": "validated_far_step_prototype_certificate/v1",
            "status": "declined", "code": code, "reason": reason,
            "detail": detail, "published": None}


def pair_enclosure(xbox, source, s_min, T, h):
    """H3 sign, root window and kernel box for one receiver box and source.

    Returns (state, info, kernel) with state "present", "absent" or a decline
    code. The kernel is n / (r^2 D) as three intervals.
    """
    # The first retained segment may start before s_min; use the tube at s_min.
    start_box = hull_over(source, s_min, s_min, False)
    d0 = box_sub(xbox, start_box)
    sup0, inf0 = box_sup_norm(d0), box_inf_norm(d0)
    info = {"lower_sup_distance": sup0, "lower_inf_distance": inf0,
            "earliest_delay": T - s_min, "latest_delay": T + h - s_min}
    if inf0 > T + h - s_min:
        return "absent", info, None
    if not sup0 < T - s_min:
        return "VFS-H3-01", info, None
    lo, hi = s_min, T
    r_lo = r_hi = None
    for _ in range(8):
        P = hull_over(source, lo, hi, False)
        d = box_sub(xbox, P)
        r_lo, r_hi = box_inf_norm(d), box_sup_norm(d)
        new_lo = max(lo, down(T - r_hi))
        new_hi = min(hi, up(T + h - r_lo))
        if new_lo > new_hi:
            return "VFS-H4-01", dict(info, note="empty root window"), None
        if new_lo == lo and new_hi == hi:
            break
        lo, hi = new_lo, new_hi
    P = hull_over(source, lo, hi, False)
    U = hull_over(source, lo, hi, True)
    d = box_sub(xbox, P)
    r_lo, r_hi = box_inf_norm(d), box_sup_norm(d)
    info.update({"root_window": [lo, hi], "distance": [r_lo, r_hi]})
    if not r_lo > 0:
        return "VFS-H4-01", dict(info, note="distance floor not positive"), None
    r = I(r_lo, r_hi)
    unit = I(-1, 1)
    n = [(c * r.inverse_positive()).meet(unit) for c in d]
    speed = past_speed_bound(source, lo, hi)
    n_dot_u = (n[0] * U[0] + n[1] * U[1] + n[2] * U[2]).meet(
        I(-speed, speed))
    D = I(1) - n_dot_u
    info["transmitter_factor"] = [D.lo, D.hi]
    if not D.lo > 0:
        return "VFS-H4-01", dict(info, note="transmitter factor floor"), None
    weight = (r * r * D).inverse_positive()
    return "present", info, [c * weight for c in n]


def step(paths, T, h, kappa, budgets=None, max_iterations=12):
    T, h, kappa = Q(T), Q(h), Q(kappa)
    reason = check_h0(paths, T)
    if reason:
        return declined("VFS-H0-01", reason, {})
    if h <= 0:
        return declined("VFS-H0-01", "step is not positive", {})
    s_min = max(path["segments"][0]["t0"] for path in paths)
    detail = {"T": T, "h": h, "s_min": s_min, "kappa": kappa}

    # H1, past part.
    past_speeds = {p["id"]: past_speed_bound(p, s_min, T) for p in paths}
    detail["past_speed_bounds"] = past_speeds
    if not max(past_speeds.values()) < 1:
        return declined("VFS-H1-01", "retained past is not sub-wake-speed",
                        detail)

    sections = [end_section(p) for p in paths]
    span = I(0, h)
    half = I(0, h * h / 2)
    boxes = []
    for X0, V0 in sections:
        boxes.append([x + span * v for x, v in zip(X0, V0)])
    accelerations = None
    pair_info = {}
    for iteration in range(max_iterations):
        # H2 on the current boxes.
        for a in range(len(paths)):
            for b in range(a + 1, len(paths)):
                gap = box_inf_norm(box_sub(boxes[a], boxes[b]))
                if not gap > h:
                    detail.update({"iteration": iteration, "gap": gap,
                                   "pair": [paths[a]["id"], paths[b]["id"]]})
                    return declined(
                        "VFS-H2-01", "step boxes are not farther apart than h",
                        detail)
        # H3 and H4 on the current boxes.
        accelerations = []
        pair_info = {}
        for a, receiver in enumerate(paths):
            total = [I(0), I(0), I(0)]
            for b, source in enumerate(paths):
                if a == b:
                    continue
                state, info, kernel = pair_enclosure(
                    boxes[a], source, s_min, T, h)
                pair_info[f"{receiver['id']}<-{source['id']}"] = dict(
                    info, state=state)
                if state.startswith("VFS"):
                    detail.update({"iteration": iteration, "pairs": pair_info})
                    return declined(
                        state,
                        "lower sign is neither uniformly present nor absent"
                        if state == "VFS-H3-01" else "chart is not regular",
                        detail)
                if state == "absent":
                    continue
                factor = kappa * receiver["charge"] * source["charge"]
                total = [t + k * factor for t, k in zip(total, kernel)]
            accelerations.append(total)
        # H5 on the current boxes.
        required = []
        enclosed = True
        for (X0, V0), A, box in zip(sections, accelerations, boxes):
            need = [x + span * v + half * a for x, v, a in zip(X0, V0, A)]
            required.append(need)
            enclosed &= all(b.contains(n) for b, n in zip(box, need))
        if enclosed:
            detail["enclosure_iterations"] = iteration + 1
            break
        boxes = []
        for need in required:
            grown = []
            for c in need:
                pad = up(c.rad() / 8) + Q(1, 10 ** (DIGITS - 6))
                grown.append(I(c.lo - pad, c.hi + pad))
            boxes.append(grown)
    else:
        detail["pairs"] = pair_info
        return declined("VFS-H5-01", "no a priori enclosure was found", detail)

    # H1, step part.
    velocity_boxes = []
    for (X0, V0), A in zip(sections, accelerations):
        velocity_boxes.append([v + span * a for v, a in zip(V0, A)])
    step_speeds = {p["id"]: box_sup_norm(vb)
                   for p, vb in zip(paths, velocity_boxes)}
    v_plus = max(max(step_speeds.values()), max(past_speeds.values()))
    detail.update({"pairs": pair_info, "step_speed_bounds": step_speeds,
                   "v_plus": v_plus,
                   "position_boxes": {p["id"]: b for p, b in zip(paths, boxes)},
                   "acceleration_boxes": {
                       p["id"]: a for p, a in zip(paths, accelerations)}})
    if not v_plus < 1:
        return declined("VFS-H1-01", "step velocity box is not sub-wake-speed",
                        detail)

    # Tube and publication.
    published = []
    growth = {}
    slack = {}
    for path, (X0, V0), A in zip(paths, sections, accelerations):
        c, rx, rv = [], [], []
        grow_x, grow_v, min_slack = Q(0), Q(0), None
        for axis in range(3):
            exact = (X0[axis].mid(), V0[axis].mid(), A[axis].mid() / 2)
            nominal = tuple(down(e) for e in exact) + (Q(0),)
            dev = [abs(e - n) for e, n in zip(exact, nominal)]
            px, pv, pa = X0[axis].rad(), V0[axis].rad(), A[axis].rad()
            radius_x = up(px + h * pv + h * h / 2 * pa
                          + dev[0] + h * dev[1] + h * h * dev[2])
            radius_v = up(pv + h * pa + dev[1] + 2 * h * dev[2])
            # Whole-step comparison. The true position at T + tau lies within
            # px + tau pv + tau^2 pa / 2 of the exact midpoint quadratic, which
            # lies within dev0 + tau dev1 + tau^2 dev2 of the nominal cubic.
            # Bernstein coefficients on [0, h] of radius_x minus that sum, and
            # of radius_v minus the corresponding velocity sum, must be >= 0.
            a0, a1, a2 = px + dev[0], pv + dev[1], pa / 2 + dev[2]
            position_slack = min(radius_x - a0,
                                 radius_x - (a0 + a1 * h / 2),
                                 radius_x - (a0 + a1 * h + a2 * h * h))
            b0, b1 = pv + dev[1], pa + 2 * dev[2]
            velocity_slack = min(radius_v - b0, radius_v - (b0 + b1 * h))
            worst = min(position_slack, velocity_slack)
            if worst < 0:
                raise AssertionError("published tube misses the theorem's tube")
            min_slack = worst if min_slack is None else min(min_slack, worst)
            c.append(nominal)
            rx.append(radius_x)
            rv.append(radius_v)
            grow_x = max(grow_x, radius_x - px)
            grow_v = max(grow_v, radius_v - pv)
        growth[path["id"]] = {"position": grow_x, "velocity": grow_v}
        slack[path["id"]] = min_slack
        published.append({"t0": T, "t1": T + h, "c": c, "rx": rx, "rv": rv,
                          "provenance": "validated_far_step"})
    detail.update({"radius_growth": growth, "whole_step_slack": slack})
    if budgets is not None:
        detail["budgets"] = budgets
        for path in paths:
            g = growth[path["id"]]
            if (g["position"] > budgets["position"]
                    or g["velocity"] > budgets["velocity"]):
                return declined(
                    "VFS-BUDGET-01",
                    "the validated radius growth exceeds the declared budget",
                    detail)
    return {"schema": "validated_far_step_prototype_certificate/v1",
            "status": "certified", "code": "", "reason": "", "detail": detail,
            "published": {p["id"]: s for p, s in zip(paths, published)}}


def extend(paths, certificate):
    """Append a certified step's segments; refuses a declined certificate."""
    if certificate["status"] != "certified":
        raise ValueError("a declined step has no continuation to append")
    return [dict(p, segments=p["segments"] + [certificate["published"][p["id"]]])
            for p in paths]
