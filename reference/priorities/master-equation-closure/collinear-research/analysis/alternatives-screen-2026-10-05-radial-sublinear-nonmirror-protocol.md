# Frozen nonmirror preparation and sufficient-inequality family

Status: analytical specification frozen before using the new preparation in the contact theorem. Fix one exponent $0<p<1$, put $q=1-p$, and keep $K=R_*=c_f=1$. The selected sharp radial per-hit response is $\sigma n/(R^p|D|)$, with every ordinary positive-delay self and partner root retained. The two persistent labels have opposite polarity and remain constrained to the same line. No mirror condition, fixed-center condition, Galilean transformation, collision rule, core or width is added.

The accepted [mirror contact theorem](alternatives-screen-2026-10-05-radial-sublinear-contact-independent.md) and its [assessment](alternatives-screen-2026-10-05-radial-sublinear-contact-adjudication.md) are antecedents only. The nonmirror root equations, inequalities, preparation compatibility and endpoint coefficients are to be derived directly. The forthcoming coordinating nonmirror reference is not consulted.

## Explicit complete preparation

Choose

$$
V_1=\frac3{32},\qquad V_2=\frac5{32},\qquad
0<a\le\frac14\left(\frac{q}{1024}\right)^{1/q},\qquad d=\frac a{16}.
$$

Thus the common initial drift is $1/8$ and the initial relative approach speed is $w_0=V_2-V_1=1/16$. The numerical constants specify the history, not the equation. For every $S\le-d$, prescribe the complete affine tails

$$
x_1(S)=a+V_1S,\qquad x_2(S)=-a+V_2S.
$$

Let $A_1,A_2$ be the unique positive scalar solutions

$$
A_1=(1-V_2)^{p-1}\left(2a+\frac{A_1d^2}{12}\right)^{-p},\qquad
A_2=(1+V_1)^{p-1}\left(2a+\frac{A_2d^2}{12}\right)^{-p}.
$$

On $-d\le S\le0$, set $z=(S+d)/d$ and

$$
x_1'(S)=V_1+A_1d\,z^2(1-z),\qquad
x_2'(S)=V_2-A_2d\,z^2(1-z),
$$

with positions obtained by integrating from their affine values at $S=-d$. Both patches have zero acceleration at the old seam. Their release velocities remain $V_1,V_2$, while release accelerations are $-A_1,+A_2$. The scalar equations are intended to impose exact compatibility with partner roots lying in the affine tails; that source placement and the full root census must be proved before using the preparation.

A concrete member is $p=1/2$, $a=2^{-26}$, $d=2^{-30}$. The general sufficient upper bound at $p=1/2$ is $a\le2^{-24}$, so this choice has strict slack. No numerical trajectory is required to define any member; the monotone scalar equations define the endpoint patches exactly.

## General sufficient family for open robustness

Consider a complete separated collinear history, locally $C^{2,1}$, compatible at release with the selected ordinary equation, with uniformly bounded complete past speeds $B_{\rm past}<1/2$. At release define

$$
g_0=x_1(0)-x_2(0)>0,\qquad
w_0=v_2(0)-v_1(0)>0,\qquad
B_0=\max(|v_1(0)|,|v_2(0)|).
$$

Freeze the sufficient strict inequality

$$
L:=B_0+\sqrt{w_0^2+\frac{12g_0^q}{q}}-w_0<\frac12.
$$

The proposed theorem is that every such history has a unique ordinary separated future ending in finite contact while both speeds stay strictly below one. Its proof must derive the nonmirror source ranges and transmitter factors, establish all-root completeness, close the speed bootstrap from this inequality and rule out positive-separation breakdown. The chosen explicit preparation must be shown to satisfy the hypotheses with strict margins and to retain a moving center.

Robustness is to be stated as an open set relative to the compatible complete collinear-history space. A useful topology near the affine-tail preparation controls the global weighted positional difference $\sup_{S\le0}|\Delta x_i(S)|/(a+|S|)$, the global velocity difference and local $C^{2,1}$ regularity. This permits nearby tail drift parameters as well as non-affine history perturbations. Compatibility is a constraint on admissible histories, not a property of every unconstrained perturbation. No full-spatial robustness claim is selected.

## Required endpoint and boundary account

The proof must characterize both distinct partner source clocks and acceleration coefficients at contact in terms of the actual two terminal velocities. It must not replace them by a reflected speed or infer their transformation under a common drift. The positive-delay root census must be checked at the limiting contact reception as well as throughout separation. Zero-range coincidence is to remain an explicit boundary of the ordinary sharp law, with no root deletion used to obtain a continuation.

The intended result concerns the incoming finite-contact trace only. No passage, reflection, sticking, weak continuation or post-contact selector is authorized. Falsifiers include incompatible patch jets, a release source inside the wrong history segment, an omitted root, failure of the complete speed/range bounds, a positive-gap endpoint with ordinary margins intact, or incorrect incoming source-time factors. Only new files with the assigned nonmirror prefix are written; prior subjects and shared owners remain unchanged.
