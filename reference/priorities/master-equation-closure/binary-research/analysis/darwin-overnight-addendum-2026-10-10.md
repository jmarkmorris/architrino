# Addendum after the frozen checkpoint, 2026-10-10T04:12Z: the drifting aligned circle, the angular bound and two mode labels

## Status

This addendum governs where it differs from the [frozen Darwin investigation](darwin-overnight-investigation.md) (SHA-256 `640ef664e67ef0ff1538efc22d91500b6ee804ac8afb62ee211ca5ce39ee4ce1`) and from its frozen checkpoint of 2026-10-05T15:30Z. It changes no byte of either. The frozen checkpoint itself provides for this: "any later correction goes in a separate addendum".

It answers the five findings D-01 to D-05 of the [Codex review](darwin-codex-review-2026-10-10.md) (SHA-256 `9f9df84b43cc65931788f4a85046236743bc2c96697284e6b12202621f379f44` when assessed). The Claude coordinator session assessed each finding by its own algebra before accepting it, as recorded below. All five are accepted. It was written under the operator's overnight direction of 2026-10-10 as relayed by Codex in the [shared conversation](../../../../op/agent-chats/2026-10-09-closure-review-plan/chat.md); separate verification by Codex is requested and not yet recorded here.

**What is under discussion.** The law is the instantaneous comparison functional of the equation-variants manuscript's Section 10, for two members of opposite polarity, with unit weights and $K=c_f=1$. It is a comparison law and not the Master Equation. Its conserved quantities are mathematical invariants of that functional and not physical accounts. No historical Darwin law, no delayed law and no mass enters.

**What does not change.** The binary verdict GO at the preregistered level; theorem 13.5(i), stability of the circle family inside the mirror subspace; every measured run; the ring verdict. General drift, with the circle's plane not normal to the conserved momentum, remains an open target and is untouched here.

## Notation

The separation is $r$. The conserved total momentum is $\mathbf P$ and $q=|\mathbf P|^2$. With $\mathbf P\ne0$ as polar axis, $\chi$ is the latitude of the separation direction, so that an aligned circle, one whose plane is normal to $\mathbf P$, has $\chi=0$. The conserved component of the relative angular invariant along $\mathbf P$ is $j$ (the investigation's $\ell_{\mathbf P}$). Further

$$
D(r)=r^2+\frac r2,\qquad f=\frac1D,\qquad \beta_1=\frac r{r-1},\qquad \beta_2=\frac{2r}{2r-1},\qquad g(r)=\frac{(2r+1)^2}{2(4r+1)} .
$$

The twice-reduced potential of Section 13.5(ii)(a) is

$$
V_{\rm am}(r,\chi;j,q)=\frac{j^2}{D\cos^2\chi}-\frac1r+\frac q4\left[\beta_2+(\beta_1-\beta_2)\sin^2\chi\right],\qquad r>1 .
$$

I re-derived this from the investigation's Sections 1, 4 and 13.1: the mirror-subspace coefficients $a=1+1/r$ and $b=1+1/(2r)$, the Routhian $-1/r+\tfrac14\mathbf P^{\mathsf T}(I+M)^{-1}\mathbf P$ with eigenvalues $\beta_1$ along the separation and $\beta_2$ across it, and the azimuthal reduction. It agrees with the frozen text.

## 1. The balance of an aligned rotating circle (D-01, D-03)

An aligned rotating circle of radius $r_c$ is a critical point of $V_{\rm am}$ at $\chi=0$ with $j\ne0$. Setting the radial derivative to zero, with $\beta_2'=-2/(2r-1)^2$ and $f'=-D'/D^2$, gives

$$
j^2=g(r_c)\left[1-\frac{q\,r_c^2}{2(2r_c-1)^2}\right].
$$

Two consequences follow, and the frozen text has neither.

**The angular invariant of a drifting circle is not that of the circle at rest.** At the same radius it is smaller by the bracket. A circle prepared with the zero-drift value $j^2=g(r_c)$ and then given a drift is not balanced: see Section 3.

**Not every momentum and radius has a real rotating circle.** The bracket must be positive:

$$
q<q_{\max}(r_c)=\frac{2(2r_c-1)^2}{r_c^2}.
$$

At $r_c=100$ this is $q<7.9202$. For example $r_c=100$, $q=9$ would need $j^2=-6.8679$, so no rotating circle exists there. Inside the declared approximation domain, where member speeds are at most $0.1$ and so $q$ is at most about $0.04$, the condition always holds; the restriction matters only for the frozen theorem's phrase "for every $\mathbf P$".

**Grade: derived.** *Falsifier:* a critical point of $V_{\rm am}$ at $\chi=0$ whose $j^2$ differs from the display; or a real rotating aligned circle with $q\ge q_{\max}(r_c)$.

## 2. The radial curvature at the balanced circle (D-01)

Differentiating twice at fixed $j$ and then inserting the balance of Section 1:

$$
k_r=\partial_r^2V_{\rm am}\Big|_{\chi=0}
=\frac{8}{r_c(4r_c+1)(2r_c+1)}+\frac q4\left(\beta_2''-\beta_2'\,\frac{f''}{f'}\right),
\qquad
\beta_2''=\frac{8}{(2r-1)^3},\qquad
\frac{f''}{f'}=\frac{2}{2r+\tfrac12}-\frac{2(2r+\tfrac12)}{r^2+\tfrac r2}.
$$

The first term is the curvature of the circle at rest. The frozen text gives the drift's contribution as $\tfrac14\beta_2''q$ alone. That omits the term in $\beta_2'$, which is there because the drift changes the balanced $j^2$. The omitted term is negative. Whether it outweighs the retained one depends on the radius: the bracket $\beta_2''-\beta_2'f''/f'$ vanishes where $8r^3-12r^2-6r-1=0$, that is at $r=(1+2^{1/3}+2^{2/3})/2\approx1.9237$, is positive for smaller $r>1$ and negative for larger. So at the radii of the table, $20$ and $100$, and at every radius of the declared domain, the drift lowers the radial curvature slightly where the frozen text says it raises it; for $1<r<1.9237$ it raises it. (An earlier wording of this sentence claimed the lowering without the restriction; Codex's verification corrected it.)

| Radius and momentum | Frozen text prints | Frozen text's own formula gives | Corrected $k_r$ |
| --- | --- | --- | --- |
| $r_c=100$, $q=1.019701\times10^{-4}$ (the DG-100 momentum) | $9.926\times10^{-7}$ | $9.9257\times10^{-7}$ | $9.925309\times10^{-7}$ |
| $r_c=100$, $q=0.01$ | $9.989\times10^{-7}$ | $9.9508\times10^{-7}$ | $9.913030\times10^{-7}$ |
| $r_c=20$, $q=0.01$ | $1.213\times10^{-4}$ | $1.20783\times10^{-4}$ | $1.202957\times10^{-4}$ |

The circle at rest has $9.925435\times10^{-7}$ at $r_c=100$ and $1.204456\times10^{-4}$ at $r_c=20$. The third column is my addition to the review's finding: the two values printed for $q=0.01$ are not reproduced by the frozen text's own formula either. At both radii the printed increase over the circle at rest is about two and a half times the formula's, as far as four printed digits show. I have not found the cause and do not guess it; the record of it is the frozen script named in the investigation's Section 13, which I did not run.

**The curvature is positive for every real aligned circle with $r_c>1$.** This is Codex's argument and I have checked it. At fixed $r_c$, $k_r$ is a first-degree function of $q$. At $q=0$ it is the positive curvature of the circle at rest. At $q=q_{\max}$, where $j=0$, it is

$$
-\frac{2}{r_c^3}+\frac{q_{\max}}4\,\beta_2''=\frac{2}{r_c^3(2r_c-1)}>0 .
$$

A first-degree function positive at both ends of an interval is positive throughout it. The endpoint $q=q_{\max}$ is used only as an endpoint; it is not a rotating circle. So the frozen theorem's side condition "at which $\partial_r^2V_{\rm am}(r_c,0)>0$" is automatically met once the circle is real, and need not be checked case by case.

The latitude curvature is $2j^2/D+\tfrac12q(\beta_1-\beta_2)$, positive for a real circle with $r_c>1$, as the frozen text says.

**Grade: derived for the formulas and the positivity; measured, by the float calculation of Section 6, for the decimal values.** *Falsifier:* a second derivative of $V_{\rm am}$ at a balanced circle, at fixed balanced $j$, that reproduces a value printed in the frozen text for $q=0.01$; or a real aligned circle with $r_c>1$ and $k_r\le0$.

## 3. The preparation "DC-100 plus a common velocity along the normal" is near a circle, not on one (D-02)

The frozen checkpoint's class row and its proposed follow-up run describe the aligned circle as the mirror circle DC-100 with a common velocity added along the circle's normal, and call it a relative equilibrium. Adding a common velocity leaves the relative velocity, and therefore $j$, unchanged at $j^2=g(100)$. At that $j$ and $r=100$ the radial derivative of $V_{\rm am}$ is

$$
\partial_rV_{\rm am}=\frac q4\beta_2'=-\frac{q}{2(2r-1)^2}\ne0 .
$$

For the proposed common velocity $(0,0,0.005)$, $|\mathbf P|=2(1-1/(2r))\times0.005$, $q=9.90025\times10^{-5}$, the derivative is $-1.25\times10^{-9}$, and to first order the balanced radius at that unchanged $j$ lies about $1.26\times10^{-3}$ further out. The preparation is therefore not the equilibrium. That it is a small radial oscillation about a nearby aligned circle is **inferred** from this first-order estimate and is not proved here: Theorem 13.5(ii)(a), as restated in Section 4, asserts that some neighbourhood of the circle is stable and gives no size for it, so whether this particular finite displacement lies inside that neighbourhood is unchecked. Establishing it would need an explicit bound from the conserved excess of the energy-like function over its minimum, which this addendum does not supply.

On an aligned circle the angular invariant and a member's tangential speed $u_\perp$ are tied by $j=(r+\tfrac12)u_\perp$, so they cannot both be held fixed while the radius changes. An exact aligned circle with drift can be prepared in three ways, which differ. The numbers are for DC-100 with the common velocity above, whose mirror circle has $u_\perp=0.0706224552$ and $j=7.0975567$.

1. **Keep the radius.** At $r_c=100$ set $j$ to the value of Section 1 and the tangential speed to $j/(r_c+\tfrac12)=0.0706220138$, lower by the fraction $6.25\times10^{-6}$.
2. **Keep $j$.** Start at the radius where Section 1 holds for the unchanged $j$, which is $100.0012594$, with tangential speed $j/(r+\tfrac12)=0.0706215702$.
3. **Keep the tangential speed.** Solve $(r+\tfrac12)^2u_\perp^2=g(r)\,[1-qr^2/(2(2r-1)^2)]$ for the radius, which gives $99.9987469$; $j$ is then $7.0974682$.

An earlier wording of this paragraph offered "keep the tangential speed and start at the balanced radius for that $j$", which runs the second and third together; Codex's verification corrected it. A test of the theorem should say which preparation it uses. No run is requested or made here, and none of these preparations is admitted as a test by this addendum. **The three sets of decimal values are measured, by a float calculation that first returned radius $100$ and the mirror circle's speed for all three at $q=0$.**

**Grade: derived, for the statement that the preparation is not balanced; the two decimal values measured by the float calculation of Section 6; inferred, for its description as a small oscillation about a nearby circle.** *Falsifier:* zero radial derivative of $V_{\rm am}$ at $r=100$, $\chi=0$, $j^2=g(100)$ and $q\ne0$.

## 4. Theorem 13.5(ii)(a), restated on its actual domain (D-03)

**Statement.** Fix a nonzero momentum $\mathbf P_0$ and a radius $r_c>1$ with $|\mathbf P_0|^2<q_{\max}(r_c)$, and let $j_0\ne0$ be given by Section 1. The aligned rotating circle of radius $r_c$ about the axis $\hat{\mathbf P}_0$ is then a strict local minimum of $V_{\rm am}(\cdot,\cdot;j_0,|\mathbf P_0|^2)$, and is nonlinearly orbitally stable modulo the drift of the centre and the azimuthal phase in this sense: for perturbations that keep $\mathbf P=\mathbf P_0$, including those that change $j$, the reduced variables $(r,\chi,\dot r,\dot\chi)$ stay near the aligned circle belonging to the perturbed $j$; for perturbations that also move $\mathbf P$ within a small enough neighbourhood of $\mathbf P_0$, the same holds about the aligned circle of the new momentum, whose axis and radius vary continuously.

**What the restatement adds to the frozen wording.** A real rotating balance, $j_0^2>0$, is required and is not automatic. The base momentum is nonzero and fixed, and the neighbourhood of momenta is local, because the polar axis $\hat{\mathbf P}$ is not defined at $\mathbf P=0$ and no statement uniform across zero momentum is made. The curvature condition is dropped as a hypothesis because Section 2 proves it. The proof is the frozen one: the reduced system has a positive velocity form for $r>1$, the conserved energy-like function exceeds its value at the minimum by a positive definite amount nearby, and the implicit function theorem moves the minimum continuously with $j$ and $\mathbf P$.

**What it still does not say.** Nothing about $\mathbf P=0$, which belongs to theorem 13.5(i). Nothing about circles whose plane is not normal to $\mathbf P$, the case of the measured runs DG-100 and DT-100, which remains the open target of 13.5(ii)(b). Nothing about the full state, whose centre drifts without bound. No instrument run of an aligned circle exists.

**Grade: derived, by the frozen proof on the corrected domain; reconstructed by Codex and read, not independently reconstructed in full, by me. My own check covers the balance, both curvatures and the positivity.** *Falsifier:* a real aligned rotating circle with $r_c>1$ from which arbitrarily small perturbations at fixed $\mathbf P$ leave a fixed neighbourhood in the reduced variables.

## 5. Two smaller corrections

**The angular bound in Section 9 (D-04).** The frozen text says that inside the declared domain, separation at least $20$ and member speed at most $0.1$, "every history with $\ell\ne0$ has $\ell^2\gg1/2$". That does not follow and is false. For a mirror state $\ell=b\,r\,u_\perp$, with $u_\perp$ the transverse speed of a member; an upper bound on speed gives an upper bound on $\ell$ and no lower one. The frozen checkpoint's own case DL-100 starts inside the domain with $r=100$ and $u_\perp=0.005$, so $\ell=0.5025$ and $\ell^2=0.2525<1/2$, and the checkpoint records it, correctly, as a contact-class history. The correct statement is the classification the same section gives: histories with $\ell^2>1/2$ have a pericentre and those with $\ell^2\le1/2$ do not, and both kinds occur inside the declared domain. Theorem 13.5(i) is unaffected: it obtains $\ell^2>1/2$ from nearness to a circle, where $\ell_0^2=g(r_0)>1/2$. The binary verdict is unaffected: its cases are circles and eccentric orbits with $\ell^2>1/2$. **Grade: derived.** *Falsifier:* the stated DL-100 data giving $\ell^2>1/2$.

**Mode labels in the checkpoint's two class rows (D-05).** With $M=m(I+\mathbf e\mathbf e^{\mathsf T})$ and $m=\sigma/(2r)$, the velocity Hessian has eigenvalues $1+\mu$ on common motions and $1-\mu$ on relative motions, where $\mu=2m$ along the separation and $\mu=m$ across it. For opposite polarity the eigenvalue that vanishes at $r=1/2$ is therefore $1-1/(2r)$ on the two common transverse motions, and for like polarity it is the same value on the two relative transverse motions. The investigation's Section 2 table says this. The checkpoint's class row for opposite polarity says "$r=1/2$ (double, relative mode)" and its row for like polarity says "$r=1/2$ (common mode)"; the two labels are interchanged. Read them as: opposite polarity, common transverse, double; like polarity, relative transverse, double. The labels at $r=1$ are right in both rows. **Grade: derived.** *Falsifier:* the Hessian acting on a common transverse vector, for opposite polarity at $r=1/2$, giving a nonzero result.

## 6. The check behind the decimal values

The file [darwin-addendum-aligned-circle-check.mjs](../evidence/darwin-addendum-aligned-circle-check.mjs) (SHA-256 `b7b129ec8e959f5e58810f5717874013b07e45eb59ad4a86f0abfc4d6031aec2`) is mine, imports nothing and integrates nothing. It evaluates the formulas above and, as a second route, differentiates $V_{\rm am}$ numerically by extrapolated central differences.

It runs a known case first and stops if that fails: at $q=0$ and $r=2,20,100$ it must return $j^2=g(r)$ and $k_r=8/(r(4r+1)(2r+1))$. It passed all three before any target was evaluated. On the targets the two routes agree to nine or more digits for $k_r$ and the radial derivative at the balanced $j$ is below $10^{-15}$. Its values for D-01 and D-03 agree with those of Codex's separate calculation to the digits Codex printed.

The two calculations share the formula for $V_{\rm am}$, which each of us derived from the frozen definitions, and nothing else. Their agreement supports the algebra from that formula onward. It is not evidence about any trajectory, and it is float arithmetic, not an enclosure.

To repeat it from the repository root:

```bash
node reference/priorities/master-equation-closure/binary-research/evidence/darwin-addendum-aligned-circle-check.mjs
```

## 7. Where the living summaries are affected

The living variant and binary manuscripts, the ledger and the registry are maintained by Codex, who reports that their present wording already bounds the ring result and leaves general drift open, and that the aligned-circle theorem and the proposed aligned test need the wording of Sections 1 to 4 above. I have not edited them. Three points for whoever does:

1. Wherever theorem 13.5(ii)(a) is cited, cite it with "for a real rotating aligned circle" and a nonzero momentum.
2. Wherever the aligned follow-up run is listed, say whether it prepares the exact circle or the near-circle of Section 3.
3. Wherever the declared domain is described, do not say that it implies $\ell^2>1/2$.
