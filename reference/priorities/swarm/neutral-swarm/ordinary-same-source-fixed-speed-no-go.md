# Ordinary Same-Source Fixed-Speed No-Go Certificate

Promotion status: `priority-only`. Closure status: `closed-rejected` only for the ordinary same-source positive-delay root hypothesis on the rigid fixed-speed circular carrier. This packet isolates the same-source row from the rigid octahedral carrier worked example in [../shell-swarm/octahedral-carrier-worked-example.md](../shell-swarm/octahedral-carrier-worked-example.md). It does not reject any broader neutral swarm, shell swarm, nested shell swarm, event-ledger, bounded-speed, fold-layer, or deformed support-band route.

Executable witness:

```bash
node scripts/neutral-swarm/octahedral-same-source-witness.mjs --out /tmp/neutral-swarm-octahedral-same-source-witness.json --pretty
node scripts/neutral-swarm/octahedral-same-source-witness.mjs --validate /tmp/neutral-swarm-octahedral-same-source-witness.json --pretty
```

The artifact schema is

$$
\texttt{neutral-swarm-octahedral-same-source-witness/v1}.
$$

---

## 1. Narrow Hypothesis

Use one site on a circular carrier with exact field-speed motion

$$
\omega=\frac{c_f}{R},
$$

and write the dimensionless positive delay as

$$
y=\omega(t-s)=\frac{c_f(t-s)}{R}.
$$

For the same source on this circular carrier, the worked example gives the dimensionless ordinary same-source root equation

$$
y=2\left|\sin\frac{y}{2}\right|.
$$

The ordinary same-source convention here excludes the zero-delay tangent limit $y=0$ and asks whether a retained positive-delay ordinary same-source root exists for

$$
y>0.
$$

No controlled self-hit, fold-layer, event-ledger, bounded-speed, support deformation, or super-field-speed row is declared in this hypothesis.

---

## 2. Small-Delay Exclusion

Suppose first that

$$
0<y\le2.
$$

Set

$$
z=\frac{y}{2}.
$$

Then

$$
0<z\le1,
$$

so $z$ lies in the positive interval where

$$
\sin z<z.
$$

Because $z\in(0,1]$, $\sin z>0$, hence

$$
2\left|\sin\frac{y}{2}\right|
=2\sin z
<2z
=y.
$$

Therefore the root equation

$$
y=2\left|\sin\frac{y}{2}\right|
$$

cannot hold for any

$$
0<y\le2.
$$

---

## 3. Larger-Delay Exclusion

For any two points on the same unit circular carrier, the dimensionless separation is bounded by the diameter:

$$
\left\|
\mathbf{p}(\theta)-\mathbf{p}(\theta-y)
\right\|
\le2.
$$

Thus the same-source right side satisfies

$$
2\left|\sin\frac{y}{2}\right|\le2.
$$

If

$$
y>2,
$$

then

$$
2\left|\sin\frac{y}{2}\right|\le2<y,
$$

so the same-source root equation again cannot hold.

---

## 4. Certificate Result

Combining the small-delay and larger-delay exclusions, no retained positive-delay ordinary same-source root exists for the rigid fixed-speed circular carrier:

$$
\nexists\,y>0
\quad\text{such that}\quad
y=2\left|\sin\frac{y}{2}\right|.
$$

The only equality approached by the ordinary same-source equation is the excluded zero-delay tangent limit

$$
y=0.
$$

Therefore the same-source status for this narrow hypothesis is

$$
\texttt{ordinary-same-source-excluded}.
$$

Equivalently, the machine-readable closure status is

$$
\texttt{closed-rejected:ordinary-same-source-positive-delay}.
$$

This row may be consumed by a rigid octahedral fixed-speed ledger only as a no-go certificate for ordinary same-source positive-delay roots. It does not add a same-source force contribution and does not retain a branch.

---

## 5. Rejection Boundary

This certificate rejects only the ordinary same-source positive-delay root hypothesis on the rigid exact-$c_f$ circular carrier. It does not reject:

1. controlled self-hit rows that declare and account for a same-source event;
2. super-field-speed regimes;
3. regularized fold-layer rows;
4. event-ledger routes;
5. bounded-speed rows;
6. deformed support-band carriers;
7. shell swarm case reductions;
8. nested shell swarm case reductions;
9. the general neutral swarm branch program.

Any later packet that claims one of those routes must declare its own root equation, endpoint convention, event or fold accounting, and downstream force/action/Noether obligations on the same ledger.
