#!/usr/bin/env python3
"""Clean-room Tier-2 epsilon_bind reduction library (blind reduction author).

Implements, FROM THE OWNING QUOTES IN THE FIXTURE PACKET ONLY
(reference/priorities/app-solver/evidence/t2-t4-fixture-data-2026-07-15.json):

  * prescribed helical/circular worldlines (uniform circular motion about z,
    optional common drift (0,0,u); zero-radius static payload sites),
  * complete causal-root records per directed source->receiver pair over the
    declared delay window, INCLUDING same-source (self) roots for sources
    whose total speed exceeds c_f,
  * the canonical per-hit law A = kappa*sigma*|q_i q_j|/r^2 * W^rec * r_hat
    with W^rec = |D_T/D_s| (master-equation.md quotes) under the declared
    soft regulator (see SOFT-REGULATOR INTERPRETATION below),
  * the Section-96 per-ring cycle-averaged radial rows, kappa_star
    least-squares fit, epsilon_bind norm, and z-pump tau_z,
  * the Section-99 all-dynamic-site Cartesian-component fit, kappa_star,
    epsilon_bind, and |tau_z|.

Nothing under scripts/braid-ideal/ was opened, imported, grepped, or executed
(standing blind-authorship firewall).

SOFT-REGULATOR INTERPRETATION (documented, per the dispatch):
  The declared prescription is "W^rec -> D_s/(D_s^2+soft^2)" (fixture packet,
  global_conventions.soft_regulator_family, quoting fold-crossing-chart-spec
  §82).  The canonical W^rec is |D_T|/|D_s|; the regulator targets the D_s
  caustic.  It is therefore read as regularizing the 1/|D_s| factor only:

      W_soft = |D_T| * |D_s| / (D_s^2 + soft^2),   soft = 0.02.

  At soft -> 0 this recovers |D_T/D_s| exactly; D_T is left untouched.

ROOT COMPLETENESS ARGUMENT (authored here):
  For a receiver frozen at reception time T (position P) and a source in
  uniform circular motion (radius rho_s, signed angular rate Om, drift u),
  the causal-root condition c_f*(T-t_e) = |P - x_s(t_e)| with tau = T - t_e
  is equivalent (for tau > 0) to G(tau) = 0 with

      G(tau) = c2*tau^2 + c1*tau + c0 + B*cos(Om*tau - gamma),

      c2 = c_f^2 - u^2,          c1 = -2*beta*u,
      c0 = -(rho_r^2 + rho_s^2 + beta^2),   B = 2*rho_r*rho_s,
      beta = z_r0 - z_s0  (drift cancels; exact rational),
      gamma = (Om*T + phi_s) - (om_r*T + phi_r)  (exact a + b*pi form),

  because G = (c_f*tau - d)(c_f*tau + d) and c_f*tau + d > 0 for tau > 0.
  All coefficients are exact rationals (times pi for gamma): every fixture
  constant is a finite decimal, sample times are rational multiples of pi,
  so degeneracies (e.g. the luminal rail omega*R = c_f) are decided EXACTLY
  in Fraction arithmetic, never by floating comparison.

  Cross pairs (distinct worldlines): certified subdivision on [0, W]:
    - EXCLUSION: |G'(tau)| <= L_G = 2*|c2|*W + |c1| + |B*Om| globally, so a
      cell [a,b] with midpoint m and |G(m)| > L_G*(b-a)/2 + pad contains no
      root (outward-rounding pad covers evaluation error).
    - BRACKET ADMISSION: strict certified sign change (|G|>pad at both ends)
      plus monotonicity |G'(m)| > M2*(b-a)/2 + pad with the global bound
      |G''| <= M2 = 2*|c2| + |B|*Om^2 gives exactly one root; refined by
      certified bisection.
    - BENIGN AMBIGUITY (root at a probe point, e.g. the Section-96
      constructed phase-match roots, which sit at exact rationals): if
      |G(m)| <= pad but |G'(m)| is certified away from zero, the interval
      [m-r, m+r] with r = 2*(|G(m)|+pad)/|G'(m)| and M2*r <= |G'(m)|/2
      contains exactly one root and G is certified nonzero at m+-r; the
      remainder of the cell is processed normally.
    - FAIL CLOSED: if a cell reaches max_depth without exclusion or
      admission (fold/tangency, D_s ~ 0 at a root), a RootWall
      ("analytic_interval_exhausted") is raised with the cell location.
  B = 0 exactly (payload receivers/sources on axis) reduces G to a rational
  quadratic with c0 < 0 and c2 > 0: exactly one positive root, closed form.

  Self pairs (source = receiver worldline): the trivial tau = 0 root is a
  double root of G, so the factored reduction is used instead:
  |P - x(T-tau)|^2 = 4*rho^2*sin^2(om*tau/2) + u^2*tau^2, hence nontrivial
  roots solve |sin(xi)| = lam*xi with xi = |om|*tau/2 and
  lam^2 = (c_f^2-u^2)/(om^2*rho^2) (exact rational).
    - lam^2 >= 1 (subluminal or exactly luminal): NO positive-delay self
      root, proved by |sin xi| < xi <= lam*xi (decided exactly).
    - lam < 1: on each interval (k*pi, (k+1)*pi), h(xi)=|sin xi|-lam*xi has
      h = sin(xi-k*pi) - lam*xi, with a single interior extremum at
      xi*_k = k*pi + arccos(lam); h is strictly monotone on each half.
      h(k*pi) = -lam*k*pi < 0 (k>=1), h(0) = 0 with h'(0) = 1-lam > 0.
      Roots are enumerated per monotone half-piece by certified bisection;
      |h(xi*_k)| <= pad is a tangency -> RootWall (fail closed).

PRECISION CONTROL: all numerics run under mpmath at a declared dps with
  pad = 10^-(dps-6) and root_tol = 10^-(dps-12); the reduction is run at two
  dps rungs (default 40 and 60) and the observable movement between rungs is
  reported as the certified-width surrogate w_cert (predeclared refinement-
  ladder option).  Identification passes run at a low rung (dps 20).
"""

from __future__ import annotations

import time
from dataclasses import dataclass, field
from fractions import Fraction as F
from typing import Callable, Optional

import mpmath as mp


# --------------------------------------------------------------------------
# exact scalars: value = a + b*pi with a, b rational
# --------------------------------------------------------------------------


@dataclass(frozen=True)
class Ex:
    a: F = F(0)
    b: F = F(0)

    def __add__(self, other: "Ex") -> "Ex":
        return Ex(self.a + other.a, self.b + other.b)

    def __sub__(self, other: "Ex") -> "Ex":
        return Ex(self.a - other.a, self.b - other.b)

    def scale(self, r: F) -> "Ex":
        return Ex(self.a * r, self.b * r)

    def num(self) -> mp.mpf:
        value = mp.mpf(self.a.numerator) / self.a.denominator
        if self.b:
            value += mp.pi * mp.mpf(self.b.numerator) / self.b.denominator
        return value


def fnum(fr: F) -> mp.mpf:
    return mp.mpf(fr.numerator) / fr.denominator


# --------------------------------------------------------------------------
# worldlines
# --------------------------------------------------------------------------


@dataclass(frozen=True)
class Site:
    sid: str
    rho: F                 # circle radius (0 for static payload)
    omega: F               # signed angular rate (sense included; 0 static)
    phase: Ex              # angular phase at t = 0
    z0: F                  # height at t = 0 (drift adds u*t)
    polarity: int          # +1 positrino, -1 electrino (epsilon units)
    dynamic: bool = True
    strength: F = F(1)     # hit-weight strength factor (sea proxy: 0.12)


@dataclass
class Configuration:
    label: str
    sites: list
    u: F                   # common drift speed along +z
    window: F              # declared delay window (time units before T)
    soft: F                # declared soft regulator
    cf: F = F(1)
    omega_base: F = F(4, 5)  # cycle period 2*pi/omega_base
    notes: dict = field(default_factory=dict)


def sample_times(config: Configuration, n: int) -> list:
    """Uniform reception samples over one rotation period 2*pi/omega_base."""
    return [Ex(F(0), F(2 * k, n) / config.omega_base) for k in range(n)]


def site_theta(site: Site, T: Ex) -> Ex:
    return Ex(site.phase.a + site.omega * T.a, site.phase.b + site.omega * T.b)


def site_position(site: Site, T: Ex, u: F):
    th = site_theta(site, T).num()
    rho = fnum(site.rho)
    z = fnum(site.z0) + fnum(u) * T.num()
    return (rho * mp.cos(th), rho * mp.sin(th), z)


def site_velocity(site: Site, T: Ex, u: F):
    th = site_theta(site, T).num()
    ro = fnum(site.rho * site.omega)
    return (-ro * mp.sin(th), ro * mp.cos(th), fnum(u))


# --------------------------------------------------------------------------
# certified causal-root machinery
# --------------------------------------------------------------------------


class RootWall(Exception):
    """analytic_interval_exhausted / degeneracy: fail closed."""

    def __init__(self, kind: str, detail: dict):
        super().__init__(f"{kind}: {detail}")
        self.kind = kind
        self.detail = detail


@dataclass
class Ctx:
    dps: int
    max_depth: int = 220
    # Soft branch-factor variant.  All coincide on Section-96 roots, where
    # D_T = D_s exactly (rigid co-rotating common-drift record), so the §96
    # match cannot discriminate them; §99 contra-rotating records can.
    #   "dt_ds": |D_T|*|D_s|/(D_s^2+soft^2)   (documented primary reading)
    #   "ds_ds": D_s^2/(D_s^2+soft^2)         (literal §82 token, D_s only)
    #   "dt_dt": D_T^2/(D_T^2+soft^2)         (receiver-normal only)
    #   "signed": D_T*D_s/(D_s^2+soft^2)      (DECLARED placement, supplementary
    #             extraction 2026-07-15b: signed branch factors, no absolute
    #             value; polarity product carries attraction/repulsion; the
    #             r^2 factor is never regularized; roots with r <= 1e-8 are
    #             skipped entirely)
    w_mode: str = "dt_ds"

    @property
    def pad(self) -> mp.mpf:
        return mp.mpf(10) ** (-(self.dps - 6))

    @property
    def root_tol(self) -> mp.mpf:
        return mp.mpf(10) ** (-(self.dps - 12))


def _bisect_monotone(Gf, Gpf, a, b, Ga, Gb, M2, ctx: Ctx, wall_detail):
    """Certified bisection on a monotone bracket with benign-ambiguity exit."""
    while (b - a) > ctx.root_tol:
        m = (a + b) / 2
        Gm = Gf(m)
        if abs(Gm) <= ctx.pad:
            gmin = abs(Gpf(m)) - M2 * (b - a)
            if gmin > 0 and (abs(Gm) + ctx.pad) / gmin < ctx.root_tol:
                r = (abs(Gm) + ctx.pad) / gmin
                return (m - r, m + r)
            raise RootWall(
                "analytic_interval_exhausted",
                {**wall_detail, "cell": (str(a), str(b)),
                 "reason": "ambiguous value with uncertifiable slope in bisection"},
            )
        if (Gm > 0) == (Gb > 0):
            b, Gb = m, Gm
        else:
            a, Ga = m, Gm
    return (a, b)


def cross_pair_roots(receiver: Site, source: Site, T: Ex,
                     config: Configuration, ctx: Ctx, wall_detail):
    """All causal roots tau in (0, W] for distinct worldlines.  Certified."""
    u, cf, W = config.u, config.cf, config.window
    beta = receiver.z0 - source.z0
    A = receiver.rho * receiver.rho + source.rho * source.rho
    c2x = cf * cf - u * u
    if c2x <= 0:
        raise RootWall("drift_at_or_above_field_speed", dict(wall_detail))
    c1x = F(-2) * beta * u
    c0x = -(A + beta * beta)
    Bx = F(2) * receiver.rho * source.rho
    Om_f = source.omega
    gamma = site_theta(source, T) - site_theta(receiver, T)

    c2, c1, c0 = fnum(c2x), fnum(c1x), fnum(c0x)
    Wn = fnum(W)
    roots = []

    if Bx == 0:
        # rational quadratic; c0 <= 0 and c2 > 0 -> exactly one positive root
        if c0x == 0:
            raise RootWall("coincident_worldline_points", dict(wall_detail))
        disc = c1x * c1x - 4 * c2x * c0x
        tau = (-c1 + mp.sqrt(fnum(disc))) / (2 * c2)
        width = abs(tau) * mp.mpf(10) ** (-(ctx.dps - 4)) + ctx.root_tol
        if abs(tau - Wn) <= width + ctx.pad:
            raise RootWall("window_boundary_root", {**wall_detail, "tau": str(tau)})
        if 0 < tau < Wn:
            roots.append((tau - width, tau + width))
        return roots

    B, Om, gam = fnum(Bx), fnum(Om_f), gamma.num()
    absB, absOm = abs(B), abs(Om)
    L_G = 2 * abs(c2) * Wn + abs(c1) + absB * absOm + 1
    M2 = 2 * abs(c2) + absB * absOm * absOm + 1

    def Gf(t):
        return c2 * t * t + c1 * t + c0 + B * mp.cos(Om * t - gam)

    def Gpf(t):
        return 2 * c2 * t + c1 - B * Om * mp.sin(Om * t - gam)

    G0, GW = Gf(mp.mpf(0)), Gf(Wn)
    if abs(G0) <= ctx.pad:
        raise RootWall("coincident_worldline_points", dict(wall_detail))
    if abs(GW) <= ctx.pad:
        raise RootWall("window_boundary_root", dict(wall_detail))

    split_alt = mp.mpf(15) / 32
    stack = [(mp.mpf(0), Wn, G0, GW, 0)]
    while stack:
        a, b, Ga, Gb, depth = stack.pop()
        h2 = (b - a) / 2
        m = a + h2
        Gm = Gf(m)
        if abs(Gm) <= ctx.pad:
            gp = abs(Gpf(m))
            r = 2 * (abs(Gm) + ctx.pad) / gp if gp > 0 else mp.inf
            if gp > ctx.pad and M2 * r <= gp / 2 and r < h2 / 2:
                lo, hi = m - r, m + r
                Glo, Ghi = Gf(lo), Gf(hi)
                if abs(Glo) > ctx.pad and abs(Ghi) > ctx.pad and (Glo > 0) != (Ghi > 0):
                    roots.append((lo, hi))
                    stack.append((a, lo, Ga, Glo, depth + 1))
                    stack.append((hi, b, Ghi, Gb, depth + 1))
                    continue
            if depth >= ctx.max_depth:
                raise RootWall(
                    "analytic_interval_exhausted",
                    {**wall_detail, "cell": (str(a), str(b)), "reason": "tangency-suspect"},
                )
            m2 = a + (b - a) * split_alt
            Gm2 = Gf(m2)
            if abs(Gm2) <= ctx.pad:
                raise RootWall(
                    "analytic_interval_exhausted",
                    {**wall_detail, "cell": (str(a), str(b)),
                     "reason": "double ambiguous probes (tangency)"},
                )
            stack.append((a, m2, Ga, Gm2, depth + 1))
            stack.append((m2, b, Gm2, Gb, depth + 1))
            continue
        if abs(Gm) > L_G * h2 + ctx.pad:
            continue  # certified rootless cell
        if (Ga > 0) != (Gb > 0) and abs(Ga) > ctx.pad and abs(Gb) > ctx.pad:
            if abs(Gpf(m)) > M2 * h2 + ctx.pad:
                roots.append(
                    _bisect_monotone(Gf, Gpf, a, b, Ga, Gb, M2, ctx, wall_detail)
                )
                continue
        if depth >= ctx.max_depth:
            raise RootWall(
                "analytic_interval_exhausted",
                {**wall_detail, "cell": (str(a), str(b)), "reason": "depth exhausted"},
            )
        stack.append((a, m, Ga, Gm, depth + 1))
        stack.append((m, b, Gm, Gb, depth + 1))
    roots.sort(key=lambda rr: rr[0])
    return roots


def self_pair_roots(site: Site, config: Configuration, ctx: Ctx, wall_detail):
    """Nontrivial self roots via the exact |sin xi| = lam*xi reduction."""
    u, cf, W = config.u, config.cf, config.window
    if site.rho == 0 or site.omega == 0:
        return []  # static or on-axis site: no self history displacement
    lam2 = (cf * cf - u * u) / (site.omega * site.omega * site.rho * site.rho)
    if lam2 >= 1:
        return []  # exact decision: no positive-delay self root (H(0)=0 strict)
    if lam2 <= 0:
        raise RootWall("drift_at_or_above_field_speed", dict(wall_detail))
    lam = mp.sqrt(fnum(lam2))
    absom = fnum(abs(site.omega))
    Xi = absom * fnum(W) / 2
    acs = mp.acos(lam)
    pi = mp.pi
    roots_xi = []

    def h(x):
        return abs(mp.sin(x)) - lam * x

    def hp_rising(k):
        def hp(x):
            return mp.cos(x - k * pi) - lam
        return hp

    k = 0
    while k * pi < Xi:
        kpi = k * pi
        xstar = kpi + acs
        top = min((k + 1) * pi, Xi)
        hpk = hp_rising(k)
        if k == 0:
            pass  # h(0)=0 trivial root excluded (H(0)=0); h>0 on (0, xi*_0]
        else:
            lo = kpi
            hi = min(xstar, Xi)
            if hi > lo:
                hlo, hhi = h(lo), h(hi)
                if abs(hhi) <= ctx.pad:
                    raise RootWall(
                        "analytic_interval_exhausted",
                        {**wall_detail, "reason": "self-root tangency at extremum/window",
                         "xi": str(hi)},
                    )
                if (hlo > 0) != (hhi > 0):
                    roots_xi.append(
                        _bisect_monotone(h, hpk, lo, hi, hlo, hhi, mp.mpf(1),
                                         ctx, wall_detail)
                    )
        if xstar < top:
            lo, hi = xstar, top
            hlo, hhi = h(lo), h(hi)
            if abs(hlo) <= ctx.pad or abs(hhi) <= ctx.pad:
                raise RootWall(
                    "analytic_interval_exhausted",
                    {**wall_detail, "reason": "self-root tangency at extremum/window",
                     "xi": str(lo)},
                )
            if (hlo > 0) != (hhi > 0):
                roots_xi.append(
                    _bisect_monotone(h, hpk, lo, hi, hlo, hhi, mp.mpf(1),
                                     ctx, wall_detail)
                )
        k += 1
    return [((2 / absom) * lo, (2 / absom) * hi) for (lo, hi) in roots_xi]


# --------------------------------------------------------------------------
# per-hit force under the canonical law + declared soft regulator
# --------------------------------------------------------------------------


def receiver_force(receiver: Site, T: Ex, config: Configuration, ctx: Ctx,
                   sources: Optional[list] = None, diagnostics: Optional[dict] = None,
                   include_self: bool = True):
    """Raw (kappa=1) summed delayed force on `receiver` at reception time T."""
    u, cf, soft = config.u, config.cf, config.soft
    P = site_position(receiver, T, u)
    Vr = site_velocity(receiver, T, u)
    cfn, softn = fnum(cf), fnum(soft)
    Tn = T.num()
    Fx = Fy = Fz = mp.mpf(0)
    src_list = config.sites if sources is None else sources
    for source in src_list:
        wall_detail = {
            "receiver": receiver.sid, "source": source.sid,
            "reception_time": str(Tn),
        }
        if source is receiver:
            if not include_self:
                continue
            encl = self_pair_roots(source, config, ctx, wall_detail)
        else:
            encl = cross_pair_roots(receiver, source, T, config, ctx, wall_detail)
        sigma = receiver.polarity * source.polarity
        for (lo, hi) in encl:
            tau = (lo + hi) / 2
            te = Tn - tau
            th = fnum(source.omega) * te + source.phase.num()
            rs = fnum(source.rho)
            ex = (rs * mp.cos(th), rs * mp.sin(th),
                  fnum(source.z0) + fnum(u) * te)
            ro = fnum(source.rho * source.omega)
            ev = (-ro * mp.sin(th), ro * mp.cos(th), fnum(u))
            rvx, rvy, rvz = P[0] - ex[0], P[1] - ex[1], P[2] - ex[2]
            d = mp.sqrt(rvx * rvx + rvy * rvy + rvz * rvz)
            if d <= mp.mpf("1e-8"):
                continue  # declared hard per-root distance floor (supp. 15b)
            rhx, rhy, rhz = rvx / d, rvy / d, rvz / d
            DT = cfn - (Vr[0] * rhx + Vr[1] * rhy + Vr[2] * rhz)
            Ds = cfn - (ev[0] * rhx + ev[1] * rhy + ev[2] * rhz)
            if ctx.w_mode == "dt_ds":
                Wsoft = abs(DT) * abs(Ds) / (Ds * Ds + softn * softn)
            elif ctx.w_mode == "ds_ds":
                Wsoft = Ds * Ds / (Ds * Ds + softn * softn)
            elif ctx.w_mode == "dt_dt":
                Wsoft = DT * DT / (DT * DT + softn * softn)
            elif ctx.w_mode == "sym":
                Wsoft = abs(DT) * abs(Ds) / mp.sqrt(
                    (DT * DT + softn * softn) * (Ds * Ds + softn * softn))
            elif ctx.w_mode == "signed":
                Wsoft = DT * Ds / (Ds * Ds + softn * softn)
            else:
                raise ValueError(f"unknown w_mode {ctx.w_mode}")
            strength = fnum(receiver.strength * source.strength)
            mag = strength * sigma * Wsoft / (d * d)
            Fx += mag * rhx
            Fy += mag * rhy
            Fz += mag * rhz
            if diagnostics is not None:
                diagnostics["root_count"] = diagnostics.get("root_count", 0) + 1
                diagnostics["min_distance"] = min(
                    diagnostics.get("min_distance", d), d)
                diagnostics["min_abs_Ds"] = min(
                    diagnostics.get("min_abs_Ds", abs(Ds)), abs(Ds))
                diagnostics["max_enclosure_width"] = max(
                    diagnostics.get("max_enclosure_width", mp.mpf(0)), hi - lo)
                if source is receiver:
                    diagnostics["self_root_count"] = (
                        diagnostics.get("self_root_count", 0) + 1)
    return (Fx, Fy, Fz), P


# --------------------------------------------------------------------------
# Section 96 configuration + measurement
# --------------------------------------------------------------------------


def build_section96(rounded_tokens: bool = False) -> Configuration:
    """Selected §96 row: axial order M->I->O, long branch both gaps.

    Primary radii are the exact dyadic values 0.9951171875 / 1.8740234375
    (whose 8-digit roundings are the spec tokens and which the §99 baseRings
    literals freeze verbatim); `rounded_tokens=True` uses the literal 8-digit
    spec tokens as a sensitivity diagnostic.
    """
    om = F(4, 5)
    u = F("0.48046875")
    RM = F("1.25")
    if rounded_tokens:
        RI, RO = F("0.99511719"), F("1.87402344")
    else:
        RI, RO = F("0.9951171875"), F("1.8740234375")
    order = [("M", RM), ("I", RI), ("O", RO)]
    ring_phase = {"M": Ex()}
    ring_z = {"M": F(0)}
    for (aid, Ra), (bid, Rb) in zip(order, order[1:]):
        d = Ra + Rb  # long ('sum') spacing branch on both gaps
        ring_phase[bid] = ring_phase[aid] + Ex(-om * d, F(1))
        ring_z[bid] = ring_z[aid] - u * d
    zmean = sum(ring_z.values(), F(0)) / 3
    sites = []
    for rid, R in order:
        for tag, pol, extra in (("positrino", 1, Ex()), ("electrino", -1, Ex(F(0), F(1)))):
            sites.append(Site(
                sid=f"{rid}:{tag}", rho=R, omega=om,
                phase=ring_phase[rid] + extra, z0=ring_z[rid] - zmean,
                polarity=pol,
            ))
    return Configuration(
        label="section96_selected_row" + ("_roundedTokens" if rounded_tokens else ""),
        sites=sites, u=u, window=F(8), soft=F("0.02"),
        notes={"radii": {"I": str(RI), "M": str(RM), "O": str(RO)},
               "axial_order": "M->I->O", "branch": "long(sum) both gaps"},
    )


def measure_section96(ctx: Ctx, rounded_tokens: bool = False,
                      n_samples: int = 3, heartbeat: Optional[Callable] = None,
                      include_self: bool = True, ring_order=("M", "I", "O")):
    """Per-ring cycle-averaged raw radial rows, kappa*, residuals, eps, tau_z."""
    with mp.workdps(ctx.dps):
        config = build_section96(rounded_tokens)
        times = sample_times(config, n_samples)
        om2 = fnum(config.omega_base * config.omega_base)
        rings = list(ring_order)
        ring_R = {s.sid.split(":")[0]: fnum(s.rho) for s in config.sites}
        acc = {r: [] for r in rings}
        tau_raw_samples = []
        diags: dict = {}
        started = time.monotonic()
        for k, T in enumerate(times):
            tau_raw = mp.mpf(0)
            for site in config.sites:
                Fv, P = receiver_force(site, T, config, ctx, diagnostics=diags,
                                       include_self=include_self)
                th = site_theta(site, T).num()
                radial = Fv[0] * mp.cos(th) + Fv[1] * mp.sin(th)
                acc[site.sid.split(":")[0]].append(radial)
                tau_raw += P[0] * Fv[1] - P[1] * Fv[0]
            tau_raw_samples.append(tau_raw)
            if heartbeat:
                heartbeat(f"s96 sample={k + 1}/{n_samples} "
                          f"roots={diags.get('root_count', 0)} "
                          f"wall={time.monotonic() - started:.1f}s")
        f_rows = [sum(acc[r]) / len(acc[r]) for r in rings]
        spread = max(max(v) - min(v) for v in acc.values())
        a_rows = [-om2 * ring_R[r] for r in rings]
        Sfa = sum(f * a for f, a in zip(f_rows, a_rows))
        Sff = sum(f * f for f in f_rows)
        kappa = Sfa / Sff
        resid = [kappa * f - a for f, a in zip(f_rows, a_rows)]
        rnorm = mp.sqrt(sum(x * x for x in resid))
        anorm = mp.sqrt(sum(a * a for a in a_rows))
        eps = rnorm / anorm
        tau_avg = sum(tau_raw_samples) / len(tau_raw_samples)
        return {
            "label": config.label,
            "dps": ctx.dps,
            "cycle_samples": n_samples,
            "include_self_roots": include_self,
            "ring_order": rings,
            "f_raw_per_site_rows": [mp.nstr(x, 30) for x in f_rows],
            "a_req_rows": [mp.nstr(x, 30) for x in a_rows],
            "kappa_star_per_site_rows": mp.nstr(kappa, 30),
            "kappa_star_ring_sum_rows": mp.nstr(kappa / 2, 30),
            "residual_vector": [mp.nstr(x, 30) for x in resid],
            "residual_norm": mp.nstr(rnorm, 30),
            "epsilon_bind": mp.nstr(eps, 30),
            "tau_z_at_kappa_per_site_rows": mp.nstr(kappa * tau_avg, 30),
            "tau_z_at_kappa_ring_sum_rows": mp.nstr(kappa * tau_avg / 2, 30),
            "raw_tau_z_cycle_avg": mp.nstr(tau_avg, 30),
            "per_ring_sample_site_spread_max": mp.nstr(spread, 8),
            "root_count": diags.get("root_count", 0),
            "self_root_count": diags.get("self_root_count", 0),
            "min_root_distance": mp.nstr(diags.get("min_distance", mp.mpf(0)), 12),
            "min_abs_Ds": mp.nstr(diags.get("min_abs_Ds", mp.mpf(0)), 12),
            "max_root_enclosure_width": mp.nstr(
                diags.get("max_enclosure_width", mp.mpf(0)), 6),
        }


# --------------------------------------------------------------------------
# Section 99 configurations (stride mapping from the fixture packet)
# --------------------------------------------------------------------------


BASE_RINGS = [
    ("I", F("0.9951171875"), F("0.8"), F("-0.34"), F("1.345498903589793")),
    ("M", F("1.25"), F("0.8"), F("0"), F("0")),
    ("O", F("1.8740234375"), F("0.8"), F("0.34"), F("2.191779057179586")),
]
RADIUS_SCALES = [[F(1)] * 3, [F("0.9"), F("1.05"), F("1.1")]]
OMEGA_SCALES = [[F(1)] * 3, [F("1.08"), F("0.94"), F("1.03")]]
STACK_SCALES = [F("0.8"), F("1.15")]
PHASES_PI = [F(1), F(7, 6), F(4, 3), F(3, 2)]      # multiples of pi
POCKET_WIDTHS = [F("1.1"), F("1.45")]
OCCUPANCIES = [(2, 2, 2), (3, 2, 3)]
POLARITY_PATTERNS = [(1, 1, 1), (1, -1, 1)]
ORDERINGS = ["pro_pocket_anti", "anti_pocket_pro"]
SEA_ROWS = [False, True]
STRIDES = {"radius": 1, "omega": 2, "stack": 4, "phase": 2, "pocket": 3,
           "occ": 5, "polpat": 7, "ordering": 6, "sea": 1}


def _pick(rows, stride, index):
    return rows[(index // stride) % len(rows)]


def pair_configuration(index: int) -> dict:
    return {
        "pairIndex": index,
        "radiusScales": _pick(RADIUS_SCALES, STRIDES["radius"], index),
        "omegaScales": _pick(OMEGA_SCALES, STRIDES["omega"], index),
        "stackScale": _pick(STACK_SCALES, STRIDES["stack"], index),
        "relativePhasePi": _pick(PHASES_PI, STRIDES["phase"], index),
        "pocketWidth": _pick(POCKET_WIDTHS, STRIDES["pocket"], index),
        "occupancy": _pick(OCCUPANCIES, STRIDES["occ"], index),
        "polarityPattern": _pick(POLARITY_PATTERNS, STRIDES["polpat"], index),
        "ordering": _pick(ORDERINGS, STRIDES["ordering"], index),
        "sea": _pick(SEA_ROWS, STRIDES["sea"], index),
    }


def build_section99(index: int, electron: bool = False, drift: F = F(0)) -> Configuration:
    sel = pair_configuration(index)
    pw = sel["pocketWidth"]
    sites = []
    for braid, sense in (("pro", 1), ("anti", -1)):
        if sel["ordering"] == "pro_pocket_anti":
            cz = -pw / 2 if braid == "pro" else pw / 2
        else:
            cz = pw / 2 if braid == "pro" else -pw / 2
        for i, (rid, br, bo, bz, bph) in enumerate(BASE_RINGS):
            j = i if braid == "pro" else 2 - i
            rho = br * sel["radiusScales"][j]
            omag = bo * sel["omegaScales"][j]
            ringz = bz * sel["stackScale"] if braid == "pro" else -bz * sel["stackScale"]
            phase0 = Ex(bph, F(0))
            if braid == "anti":
                phase0 = phase0 + Ex(F(0), sel["relativePhasePi"])
            n = sel["occupancy"][i]
            for k in range(n):
                pol = sel["polarityPattern"][i] * (1 if k % 2 == 0 else -1)
                if braid == "anti":
                    pol = -pol
                sites.append(Site(
                    sid=f"{braid}:{rid}:{k}",
                    rho=rho, omega=F(sense) * omag,
                    phase=phase0 + Ex(F(0), F(2 * k, n)),
                    z0=cz + ringz, polarity=pol,
                ))
    if electron:
        scale = F("0.8")
        for off in (F("0.08"), F("0.2"), F("0.34")):
            mag = max(F("0.025"), off * scale)
            for sign in (1, -1):
                sites.append(Site(
                    sid=f"payload:column:{'p' if sign > 0 else 'm'}{off}",
                    rho=F(0), omega=F(0), phase=Ex(), z0=F(sign) * mag,
                    polarity=-1,
                ))
    if sel["sea"]:
        # Proxy-sea construction (supplementary extraction 2026-07-15b):
        # exactly three source-only sites, center (0,0,0), equatorial circle
        # radius = spacing 2.2, omega = cadence 0.7 POSITIVE sense (not braid
        # sense), phase = orientationLag pi/12 + 2*pi*k/3, polarity (+1,-1,+1),
        # strength = density 0.12, chargeUnits 0, dynamic = false (sources
        # only; excluded from fit/pump/charge), co-drifting with the assembly.
        for k in range(3):
            sites.append(Site(
                sid=f"sea:{k}",
                rho=F("2.2"), omega=F("0.7"),
                phase=Ex(F(0), F(1, 12) + F(2 * k, 3)),
                z0=F(0), polarity=(1 if k % 2 == 0 else -1),
                dynamic=False, strength=F("0.12"),
            ))
    return Configuration(
        label=f"section99_{'electron' if electron else 'photon'}_pair{index}"
              f"_u{drift}",
        sites=sites, u=drift, window=F(6), soft=F("0.02"),
        notes={**{k: str(v) for k, v in sel.items()},
               "sea_reconstructable": True,
               "sea_sites_built": bool(sel["sea"]),
               "payload": "column static scale 0.8" if electron else "none"},
    )


def measure_section99(config: Configuration, ctx: Ctx, n_samples: int,
                      heartbeat: Optional[Callable] = None,
                      include_self: bool = True):
    """Stacked all-dynamic-site Cartesian LSQ fit: kappa*, eps_bind, |tau_z|."""
    with mp.workdps(ctx.dps):
        times = sample_times(config, n_samples)
        Sfa = Sff = Saa = mp.mpf(0)
        tau_samples = []
        diags: dict = {}
        started = time.monotonic()
        dyn = [s for s in config.sites if s.dynamic]
        for k, T in enumerate(times):
            tau_raw = mp.mpf(0)
            for site in dyn:
                # Source scope (supplementary extraction 2026-07-15b): the
                # source loop ranges over ALL sites (incl. non-dynamic sea
                # proxies); receivers/fit/pump/charge over dynamic sites only.
                Fv, P = receiver_force(site, T, config, ctx,
                                       sources=config.sites,
                                       diagnostics=diags,
                                       include_self=include_self)
                om2 = fnum(site.omega * site.omega)
                a = (-om2 * P[0], -om2 * P[1], mp.mpf(0))
                Sfa += Fv[0] * a[0] + Fv[1] * a[1] + Fv[2] * a[2]
                Sff += Fv[0] * Fv[0] + Fv[1] * Fv[1] + Fv[2] * Fv[2]
                Saa += a[0] * a[0] + a[1] * a[1] + a[2] * a[2]
                tau_raw += P[0] * Fv[1] - P[1] * Fv[0]
            tau_samples.append(tau_raw)
            if heartbeat:
                heartbeat(f"{config.label} N={n_samples} sample={k + 1}/{n_samples} "
                          f"roots={diags.get('root_count', 0)} "
                          f"wall={time.monotonic() - started:.1f}s")
        kappa = Sfa / Sff
        eps = mp.sqrt(abs(kappa * kappa * Sff - 2 * kappa * Sfa + Saa)) / mp.sqrt(Saa)
        tau_avg = sum(tau_samples) / len(tau_samples)
        charge_units = sum(s.polarity for s in dyn)
        return {
            "label": config.label,
            "configuration": dict(config.notes),
            "dps": ctx.dps,
            "cycle_samples": n_samples,
            "include_self_roots": include_self,
            "drift_u": str(config.u),
            "dynamic_sites": len(dyn),
            "charge_units_epsilon": charge_units,
            "charge_in_e": str(F(charge_units, 6)),
            "kappa_star": mp.nstr(kappa, 30),
            "epsilon_bind": mp.nstr(eps, 30),
            "abs_tau_z": mp.nstr(abs(kappa * tau_avg), 30),
            "raw_tau_z_cycle_avg": mp.nstr(tau_avg, 30),
            "root_count": diags.get("root_count", 0),
            "self_root_count": diags.get("self_root_count", 0),
            "min_root_distance": mp.nstr(diags.get("min_distance", mp.mpf(0)), 12),
            "min_abs_Ds": mp.nstr(diags.get("min_abs_Ds", mp.mpf(0)), 12),
            "max_root_enclosure_width": mp.nstr(
                diags.get("max_enclosure_width", mp.mpf(0)), 6),
        }
