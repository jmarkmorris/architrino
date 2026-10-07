# A complete ordinary chart for a functional neighborhood above wake speed

## The admitted geometric family

Use $K=c_f=1$ and retain every ordinary positive-delay partner and self root. Normalize physical positions by a fixed $R>0$ and write $\tau=t/R$. The planar reference paths are the rotating unit hexagon

$$
Y_j^0(\tau)=(\cos(\beta\tau+j\pi/3),\sin(\beta\tau+j\pi/3)),\qquad j=0,\ldots,5.
$$

For the existing six-member radius/phase/alternating-height class, let $Y_j(\tau)$ denote the actual normalized planar position and $z_j(\tau)=(-1)^jz(\tau)$ the normalized height. A dot in this document means differentiation in $\tau$, so $\dot Y_j$ and $\dot z_j$ equal physical velocity components. Require the complete-history uniform bounds

$$
\beta\in[1.825,1.828],\quad
|Y_j-Y_j^0|\le\varepsilon=0.001,\quad
|\dot Y_j-\dot Y_j^0|\le\nu=0.01,\quad
|z_j|\le h=0.125,\quad |\dot z_j|\le u=0.5.
$$

These are exact rational bounds, imposed for all real $\tau$ and every member. The profiles may have arbitrary harmonics and period. Require at least $C^1$ paths for the causal geometry; $C^2$ paths are needed when asking the separate acceleration-balance question.

**Measured subject finding, pending independent reconstruction:** the [interval companion](overnight2-b-superwake-norm-chart-recent.py) certifies source counts $(1,3,1,1,1,1)$ at every reception for every history satisfying these bounds. Every signed divisor has magnitude greater than $1/20$. All delays lie between $7/20$ and $2$. The eight-root list includes one positive self root and a negative-divisor partner root, both retained with the canonical absolute divisor. The result is a complete all-past, all-reception ordinary chart. For relatively periodic prescribed profiles, the protected root labels yield a full-period chart without sampling reception phase.

This is geometric admission only. It supplies no exact acceleration balance, stability or nonlinear-fate result. The proof tolerates a functional family of prescribed paths but does not assert those paths solve an initial-history evolution problem.

An explicit sign-changing finite-amplitude member is $\rho=1$, $p=0$, $z=0.1\cos(2\tau)-0.0125\sin(6\tau)$ and $\beta=1.8264309646546788$. Its height norm is at most $0.1125$ and axial speed norm at most $0.275$, with zero planar errors. Its height is positive at $\tau=0$ and negative at $\tau=\pi/2$. Its source-count chart is therefore admitted by the proposed uniform theorem, without using the earlier floating survey as proof. Other admissible profiles need not be this waveform.

## Uniform scalar enclosures

For receiver zero, let $Q_{p,j}=Y_0(\tau)-Y_j(\tau-d)$ be the planar separation at a positive normalized delay $d$. Its reference value has norm at most two, and its error has norm at most $2\varepsilon$. Hence

$$
\left||Q_{p,j}|^2-|Q_{p,j}^0|^2\right|\le8\varepsilon+4\varepsilon^2=:E_p.
$$

The axial separation has magnitude at most $2h$, so its square lies in $[0,4h^2]$. With $\alpha_j=j\pi/3-\beta d$, the squared causal gap is enclosed by

$$
G_j=|Q_j|^2-d^2\in
4\sin^2(\alpha_j/2)-d^2+[-E_p,E_p+4h^2]. \tag{1}
$$

For the source contraction, the planar reference source speed is $\beta$. Using the separation and velocity errors gives

$$
|Q_{p,j}\cdot\dot Y_j-Q_{p,j}^0\cdot\dot Y_j^0|
\le2\varepsilon\beta+2\nu+2\varepsilon\nu.
$$

The axial contraction has magnitude at most $2hu$. Since $Q_{p,j}^0\cdot\dot Y_j^0=-\beta\sin\alpha_j$, differentiation with respect to delay gives

$$
\partial_dG_j\in-2\beta\sin\alpha_j-2d+[-E_d,E_d],\quad
E_d=2(2\varepsilon\beta+2\nu+2\varepsilon\nu+2hu). \tag{2}
$$

These bounds use no reception phase. They apply independently at every time and to every waveform within the global norms. The squared gap is differentiable for the actual $C^1$ history; the enclosure in (2) bounds its derivative and need not be the derivative of an arbitrary selection from the interval in (1).

At a causal root, the signed source divisor is $D_j=-\partial_dG_j/(2d)$. Thus a strict derivative enclosure provides ordinariness as well as the uniqueness used below.

## Complete near and remote complements

Set the recent cutoff to $d_-=1/4$. The planar perturbation $E_j=Y_j-Y_j^0$ has derivative norm at most $\nu$, so $|E_j(\tau)-E_j(\tau-d)|\le\nu d$. The self planar chord therefore obeys

$$
\frac{|Y_j(\tau)-Y_j(\tau-d)|}{d}
\ge\beta\frac{\sin(\beta d/2)}{\beta d/2}-\nu
\ge\beta\left(1-\frac{(\beta d_-/2)^2}{6}\right)-\nu>1.
$$

Here the argument lies between zero and $1/4$ throughout the declared range, so the elementary sine lower bound applies. The full spatial chord is at least its planar component. Consequently there is no positive self root in $(0,d_-]$, regardless of axial acceleration or waveform frequency. This is an analytic exclusion of the complete interval, not a zero-delay numerical truncation.

For a partner, the simultaneous reference planar separation is at least one, so the actual separation is at least $1-2\varepsilon$. The actual source speed is at most $V_+=\sqrt{(\beta+\nu)^2+u^2}$. Therefore

$$
|Q_j(\tau,d)|-d\ge1-2\varepsilon-(1+V_+)d_->0
$$

throughout the same recent interval. All paths lie in a ball of normalized radius $\sqrt{(1+\varepsilon)^2+h^2}$. Every positive root is consequently at most twice this radius. The finite numerical interval ends an additional $1/100$ beyond its outward upper bound, which covers the remote past analytically.

The first version used cutoff $1/100$. Its constant squared-gap error was too wide on the following self complement, and the pilot stopped unresolved. The present version extends the proven near region to $1/4$; it does not change the parameter domain or increase a subdivision budget. The original failed instrument and receipt remain frozen.

## Protected roots, complements and continuation

Rough decimal root-location hints select possible protected brackets; they are not root evidence. In each bracket the interval companion proves opposite uniform endpoint signs using (1), then a uniform nonzero derivative using (2). The intermediate-value theorem and monotonicity give exactly one root for every actual history at every reception. Inclusive interval Newton steps retain all those roots. Every intervening interval is recursively excluded either by a strict gap sign or by a strict derivative sign and same-sign endpoint gaps. The closed recent, protected, complementary and remote pieces cover all positive delays.

The target contains eight protected roots and 48 complementary leaves. Its rational root/divisor intervals imply $7/20<d<2$ and $|D|>1/20$ throughout. Source one has three ordered roots, whose divisor signs are positive, negative and positive; all other source roots have positive divisor. In particular no negative-divisor root or positive self root is discarded.

For $C^2$ paths, each delay depends $C^1$ on reception time by the implicit function theorem. Fixed disjoint protected brackets identify each branch globally. If the relative geometry repeats over a deformation period, uniqueness within each bracket forces the corresponding delay function to repeat. This establishes the full-period chart without a phase mesh. For merely $C^1$ paths, the joint gap regularity still suffices for continuously differentiable local root functions where the derivative hypotheses hold; no higher regularity than the paths provide is claimed.

## Known-first evidence and resource limits

The new instrument uses the frozen determinant subject's interval encoding, interval intersection and complement helpers. That dependency is subject reuse, not independent agreement. No subject or reference was edited together with this calculation. The known stage precedes each new pilot and checks five complete analytically known static partner channels, the diametric gap and derivative, exact norm-error constants and the recent-self sine bound. A preparation typo in the expected derivative-error numerator was caught before any target: the correct value is $301/1250$, not $302/1250$. Both the failed preparation and the corrected known result are retained.

The corrected-cutoff pilot completed in 0.059684 internal seconds,0.143 supervised seconds and 38,223,872 bytes peak RSS. The target completed in 0.069673 internal seconds,0.155 supervised seconds and 38,240,256 bytes peak RSS. Both scientifically passed and their supervisors closed with exit zero,zero stderr and closed process groups. The predeclared limits were 120 internal seconds,180 supervisor seconds,512 MiB,eight MiB per receipt and one numerical thread. No target was run for the original failed-cutoff source.

| Artifact | SHA-256 |
| --- | --- |
| Frozen reused determinant helper | `2050ae06ece7a6e0ba5172c83ab2354be9ddf68fa3e5870f233e00c47ed4f4a3` |
| Original failed-cutoff instrument | `f41b6db13df4b906cead8283d655f0923ebf1463a51e887030ee4e689b332fc2` |
| Original failed pilot | `fe0b05c59af89edb99e2703d7be42a2209deeceff4b875466a2e2fab4e76a842` |
| New instrument | `a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a` |
| New known receipt | `57c5fdebed053a7ea8c7b02a6b5d8f72c38c79b14bec1457e5180c820a4379f4` |
| New pilot receipt | `e7be17065925f06e6ef17cbc0dee12193afdcd1db6e9f82c94d1cd025cc7f865` |
| New target receipt | `84c00158e4f8432978b43320c5da7c2f24087e3ff36cce866dc0f5ce46bd898d` |

Receipts are retained under `.local-data/master-equation-closure/overnight2-b/superwake-norm-chart-recent/`; the first source's receipts remain in the sibling `superwake-norm-chart/` directory. The tracked companions provide reproduction with the shared venv and stated frozen dependency. Local receipt paths are provenance, not public CI dependencies. Original evidence has not been deleted, moved or replaced; no remote-backup or archive-recovery claim is made.

The target uses mpmath interval arithmetic at 55 decimal digits. An independently authored instrument must reconstruct (1), (2), all guards, every protected root and complement, and the stated coarse margins before acceptance. A profile satisfying all norms but having an extra root, a zero divisor, or a root outside the exhaustive cover would falsify the geometric claim. Violation of a norm by a proposed waveform defeats its admission but does not contradict the chart. Parent integration belongs in [the current research account](overnight2-b-followup-and-research-2026-10-07.md).
