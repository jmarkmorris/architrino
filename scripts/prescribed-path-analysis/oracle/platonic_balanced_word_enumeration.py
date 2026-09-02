#!/usr/bin/env python3
"""Balanced polarity words on the five convex regular polyhedra.

Pure enumeration. For each Platonic solid this reports:

  * the order of its point group (all orthogonal maps preserving the vertex set),
  * the number of balanced N:N polarity words,
  * the number of inequivalent classes, up to the point group together with
    global polarity conjugation,
  * one representative word per class,
  * which classes are antipodal-alternating, i.e. assign opposite polarity to
    every antipodal vertex pair and therefore resolve the vertex set into V/2
    neutral binaries through the center.

THIS SCRIPT PERFORMS NO DYNAMICAL EVALUATION. It asserts nothing about motion,
balance, retention, or stability. It is a reusable discrete inventory for
whatever moving-assembly criterion the braid program eventually adopts; the
criterion is not supplied here, and the fixed-point-cloud common-mode residual
is deliberately NOT used, because its zero-internal-motion ansatz does not
describe a co-spherical orbiting assembly.

Companion chapter: content/markdown/aaa/noether-braid/3d-braid-assemblies.md,
Part III. That chapter is unbooked and unpromoted; this file is a discrete
inventory for it and is not evidence for any candidate.

Project python: prefer "${AAA_VENV:-../.venv}/bin/python".
"""

from __future__ import annotations

import itertools

import numpy as np

PHI = (1 + 5 ** 0.5) / 2


def _unit_rows(rows):
    V = np.array(rows, dtype=float)
    return V / np.linalg.norm(V, axis=1)[:, None]


def tetrahedron():
    return _unit_rows([(1, 1, 1), (1, -1, -1), (-1, 1, -1), (-1, -1, 1)])


def octahedron():
    rows = []
    for axis in range(3):
        for sign in (1, -1):
            v = [0, 0, 0]
            v[axis] = sign
            rows.append(tuple(v))
    return _unit_rows(rows)


def cube():
    return _unit_rows(list(itertools.product((1, -1), repeat=3)))


def icosahedron():
    rows = []
    for a in (1, -1):
        for b in (1, -1):
            rows += [(0, a, b * PHI), (a, b * PHI, 0), (b * PHI, 0, a)]
    return _unit_rows(rows)


def dodecahedron():
    rows = list(itertools.product((1, -1), repeat=3))
    for a in (1, -1):
        for b in (1, -1):
            rows += [(0, a / PHI, b * PHI), (a / PHI, b * PHI, 0), (b * PHI, 0, a / PHI)]
    return _unit_rows(rows)


SOLIDS = [("tetrahedron", tetrahedron), ("octahedron", octahedron),
          ("cube", cube), ("icosahedron", icosahedron),
          ("dodecahedron", dodecahedron)]


def point_group_permutations(V):
    """Every orthogonal map preserving the vertex set, as a vertex permutation."""
    n = len(V)
    basis = next(c for c in itertools.combinations(range(n), 3)
                 if abs(np.linalg.det(V[list(c)])) > 1e-6)
    B = V[list(basis)]
    B_inv = np.linalg.inv(B)
    gram = B @ B.T
    found = set()
    for triple in itertools.permutations(range(n), 3):
        C = V[list(triple)]
        if not np.allclose(C @ C.T, gram, atol=1e-9):
            continue
        R = B_inv @ C
        if not np.allclose(R.T @ R, np.eye(3), atol=1e-9):
            continue
        perm, ok = [], True
        for w in V @ R:
            d = np.linalg.norm(V - w, axis=1)
            j = int(np.argmin(d))
            if d[j] > 1e-9:
                ok = False
                break
            perm.append(j)
        if ok and len(set(perm)) == n:
            found.add(tuple(perm))
    return sorted(found)


def antipode_map(V):
    """Index of each vertex's antipode, or None if the solid is not centrally symmetric."""
    n = len(V)
    anti = []
    for i in range(n):
        d = np.linalg.norm(V + V[i], axis=1)
        j = int(np.argmin(d))
        if d[j] > 1e-9:
            return None
        anti.append(j)
    return anti


def balanced_word_classes(n, perms):
    """One representative bitmask per class, mod point group and global conjugation."""
    half, full = n // 2, (1 << n) - 1
    table = [list(enumerate(p)) for p in perms]
    seen, reps = set(), []
    for positions in itertools.combinations(range(n), half):
        mask = 0
        for i in positions:
            mask |= 1 << i
        if mask in seen:
            continue
        orbit = set()
        for pairs in table:
            image = 0
            for src, dst in pairs:
                if mask >> src & 1:
                    image |= 1 << dst
            orbit.add(image)
            orbit.add(full ^ image)
        seen |= orbit
        reps.append(mask)
    return reps


def word(mask, n):
    return "".join("+" if (mask >> i) & 1 else "-" for i in range(n))


def main():
    print("=" * 78)
    print("BALANCED POLARITY WORDS ON THE CONVEX REGULAR POLYHEDRA")
    print("enumeration only — no dynamical evaluation, no motion claim")
    print("=" * 78)

    totals = [0, 0]
    rows = []
    for name, build in SOLIDS:
        V = build()
        n = len(V)
        perms = point_group_permutations(V)
        anti = antipode_map(V)
        reps = balanced_word_classes(n, perms)

        alternating = []
        for mask in reps:
            if anti is None:
                continue
            sig = [1 if (mask >> i) & 1 else -1 for i in range(n)]
            if all(sig[i] * sig[anti[i]] == -1 for i in range(n)):
                alternating.append(mask)

        n_words = len(list(itertools.combinations(range(n), n // 2)))
        print(f"\n### {name.upper()}   V={n}   word {n//2}:{n//2}   |point group|={len(perms)}")
        print(f"  centrally symmetric        : {anti is not None}")
        print(f"  balanced words             : {n_words}")
        print(f"  inequivalent classes       : {len(reps)}")
        print(f"  antipodal-alternating      : {len(alternating)}"
              f"{'  (resolves into %d neutral binaries)' % (n // 2) if alternating else ''}")
        if len(reps) <= 16:
            for mask in reps:
                tag = "   <- antipodal-alternating" if mask in alternating else ""
                print(f"     {word(mask, n)}{tag}")
        else:
            print(f"     representatives suppressed ({len(reps)} classes); "
                  f"antipodal-alternating representatives:")
            for mask in alternating[:8]:
                print(f"     {word(mask, n)}")
            if len(alternating) > 8:
                print(f"     ... and {len(alternating) - 8} more")

        rows.append((name, n, len(perms), n_words, len(reps), len(alternating)))
        totals[0] += len(reps)
        totals[1] += len(alternating)

    print("\n" + "=" * 78)
    print(f"{'solid':<14}{'V':>3}{'word':>8}{'|G|':>6}{'words':>9}{'classes':>9}{'antipodal':>11}")
    for name, n, g, w, c, a in rows:
        print(f"{name:<14}{n:>3}{f'{n//2}:{n//2}':>8}{g:>6}{w:>9}{c:>9}{a:>11}")
    print("-" * 78)
    print(f"{'TOTAL':<14}{'':>3}{'':>8}{'':>6}{'':>9}{totals[0]:>9}{totals[1]:>11}")


if __name__ == "__main__":
    main()
