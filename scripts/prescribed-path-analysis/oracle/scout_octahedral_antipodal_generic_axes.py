#!/usr/bin/env python3

"""Measured nine-channel scout for the exact BP-016 quotient edges/interiors."""

from __future__ import annotations

import json
import math


VERTICES = ((1., 0., 0.), (-1., 0., 0.), (0., 1., 0.), (0., -1., 0.), (0., 0., 1.), (0., 0., -1.))
POLARITIES = (1, -1, 1, -1, 1, -1)
RAYS = ((-3., -10., 11.), (3., -11., 10.), (1., 1., 1.), (-11., 10., 3.))
EDGES = ((0, 1), (1, 2), (2, 0), (2, 3), (3, 0))
TRIANGLES = ((0, 1, 2), (0, 2, 3))


def dot(a, b): return sum(x * y for x, y in zip(a, b))
def add(a, b): return tuple(x + y for x, y in zip(a, b))
def sub(a, b): return tuple(x - y for x, y in zip(a, b))
def mul(a, s): return tuple(x * s for x in a)
def cross(a, b): return (a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0])
def norm(a): return math.sqrt(dot(a, a))
def unit(a): return mul(a, 1 / norm(a))


def rotate(axis, vector, angle):
    c, s = math.cos(angle), math.sin(angle)
    return add(add(mul(vector, c), mul(cross(axis, vector), s)), mul(axis, dot(axis, vector) * (1-c)))


def root(axis, beta, receiver, transmitter):
    def f(delay): return norm(sub(receiver, rotate(axis, transmitter, -beta * delay))) - delay
    lo, hi = 0., 2.000000000001
    if not (f(lo) > 0 and f(hi) < 0): raise ArithmeticError("lost strict-sub-field root bracket")
    for _ in range(70):
        mid = (lo + hi) / 2
        if f(mid) > 0: lo = mid
        else: hi = mid
    return (lo + hi) / 2


def nine_channels(axis, beta):
    accelerations = []
    minimum_factor = math.inf
    for receiver_index in (0, 2, 4):
        receiver = VERTICES[receiver_index]
        total = (0., 0., 0.)
        for transmitter_index, transmitter in enumerate(VERTICES):
            if transmitter_index == receiver_index: continue
            delay = root(axis, beta, receiver, transmitter)
            emitted = rotate(axis, transmitter, -beta * delay)
            displacement = sub(receiver, emitted)
            direction = mul(displacement, 1 / delay)
            velocity = mul(cross(axis, emitted), beta)
            factor = 1 - dot(direction, velocity)
            minimum_factor = min(minimum_factor, factor)
            contribution = mul(displacement, POLARITIES[receiver_index] * POLARITIES[transmitter_index] / (delay**3 * factor))
            total = add(total, contribution)
        accelerations.append(total)
    prescribed = [sub(mul(axis, dot(axis, VERTICES[index])), VERTICES[index]) for index in (0, 2, 4)]
    denominator = sum(dot(row, row) for row in prescribed)
    scale = sum(dot(acceleration, row) for acceleration, row in zip(accelerations, prescribed)) / denominator
    residuals = tuple(component for acceleration, row in zip(accelerations, prescribed) for component in sub(acceleration, mul(row, scale)))
    return residuals, scale, minimum_factor


def axis_on_edge(edge, t): return unit(add(mul(RAYS[edge[0]], 1-t), mul(RAYS[edge[1]], t)))
def axis_in_triangle(triangle, a, b): return unit(add(add(mul(RAYS[triangle[0]], a), mul(RAYS[triangle[1]], b)), mul(RAYS[triangle[2]], 1-a-b)))


def scout(edge_steps=8, beta_steps=16, interior_order=4):
    best_edges = []
    for edge in EDGES:
        best = None
        for ti in range(edge_steps + 1):
            t = ti / edge_steps
            axis = axis_on_edge(edge, t)
            for bi in range(beta_steps + 1):
                beta = 0.001 + 0.998 * bi / beta_steps
                residuals, scale, floor = nine_channels(axis, beta)
                row = dict(t=t, beta=beta, maximumResidual=max(map(abs, residuals)), inferredScale=scale,
                           minimumTransmitterFactor=floor, residuals=residuals)
                if best is None or row["maximumResidual"] < best["maximumResidual"]: best = row
        best_edges.append(dict(edge=edge, best=best))
    best_interiors = []
    for triangle in TRIANGLES:
        best = None
        for ai in range(interior_order + 1):
            for bi in range(interior_order + 1 - ai):
                a, b = ai / interior_order, bi / interior_order
                axis = axis_in_triangle(triangle, a, b)
                for speed_index in range(beta_steps + 1):
                    beta = 0.001 + 0.998 * speed_index / beta_steps
                    residuals, scale, floor = nine_channels(axis, beta)
                    row = dict(a=a, b=b, beta=beta, maximumResidual=max(map(abs, residuals)), inferredScale=scale,
                               minimumTransmitterFactor=floor, residuals=residuals)
                    if best is None or row["maximumResidual"] < best["maximumResidual"]: best = row
        best_interiors.append(dict(triangle=triangle, best=best))
    return {
        "schema": "braid-program/octahedral-antipodal-generic-axis-nine-channel-scout.v1",
        "grid": {"edgeSteps": edge_steps, "betaSteps": beta_steps, "interiorBarycentricOrder": interior_order,
                 "speedRange": ["0.001", "0.999"], "c_f": 1},
        "edgeMinima": best_edges,
        "simplexMinima": best_interiors,
        "claimBoundary": "measured floating finite-grid scout of all nine residual components after a least-squares common scale; not an interval root certificate, complement exclusion, continuous edge/interior exclusion, or common-zero isolation",
        "falsifier": "a replay disagreement at a recorded grid point, an omitted quotient edge/simplex point, a smaller grid residual than recorded, or a nonpositive transmitter factor",
        "nextObject": "outward-rounded subdivision of all five distinct quotient edges, using the scout minima only to order boxes; evaluate all nine channels and certify a sign obstruction or apply interval Newton to every surviving box",
    }


if __name__ == "__main__": print(json.dumps(scout(), indent=2, sort_keys=True))
