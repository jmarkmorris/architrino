# Independent review of explicit inner-middle separation bounds

## Known-first arithmetic record

This review independently reconstructs [the inner-middle separation theorem](overnight2-c-inner-separation-bound.md) for the coefficient-one logarithmic equation with $K_{\log}=c_f=1$, complete circular histories, unchanged transmitter factor, fixed unit polarities and all causal hits. Its mathematical reference is the delayed geometry and exact receiver equation developed below, not an earlier subject instrument.

Before target arithmetic, the separately authored [rational checker](../evidence/overnight2-c-separation-independent-check.py) passed `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-separation-independent-check.py --stage known`. The recorded known answers are $1/3+1/6=1/2$, $(2/5)(5/2)=1$, and $1/7-1/5=-2/35$. The source SHA-256 is `d08324dbaa40d74fce6754815fd6991717ac4b67de87f887a750117af3a49ca5`; its known receipt is `.local-data/master-equation-closure/overnight2-c/review-separation-known.json`. This record precedes the checker's first target-coefficient run.

The checker imports only standard-library arithmetic, hashing, command-line and file modules. It checks exact constants; the interval of outer radii, delayed-source estimates and phase dependence require the analytic reconstruction below.

## Verdict and separately verified correction

**Derived and independently reconstructed:** both strict separation bounds hold for exact common-center circular references in the stated strictly subfield class, at every relative phase:

$$
d>\frac1{21}\quad(r_3\ge2),\qquad
d>\frac{(r_3-1)^3}{24}\quad(1<r_3\le2).
$$

Here $d$ is the minimum simultaneous endpoint distance between the radius-one pair and the middle pair. The second proof includes its upper endpoint; at $r_3=2$ the first bound is stronger. The proof uses all five received partner rows and the required circular acceleration at the chosen radius-one receiver. It does not require a fixed speed margin for the outer sources, and it does not substitute an instantaneous interaction for a delayed row.

The initially read subject's final phase formula used $\operatorname{dist}(\phi_2,\pi\mathbb Z)$ without expressly fixing $\phi_1=0$. The parent corrected exactly that definition to $\rho=\operatorname{dist}(\phi_2-\phi_1,\pi\mathbb Z)$. A separate `rg -n 'rho='` read returned the corrected expression at subject line 109, and `shasum -a 256` returned final subject digest `3f5179f1f9ca26a43f1288f50b54e286b1d12d77b42e77715846e3a5f816fa73`. This resolves the phase-gauge omission without changing either separation theorem. The reviewer did not edit the subject.

## Delayed geometry and the complete receiver equation

Let $u=|\omega|$, let $s=r_3$, and assume $1=r_1<r_2<s$ and $us<1$. Each source has constant speed below one on its complete circular past. For a partner source with speed $v<1$ and simultaneous distance $p>0$, define $f(\tau)=\tau-|X_i(0)-X_j(-\tau)|$. The source-path Lipschitz estimate implies that $f$ strictly increases. It is negative at zero and nonnegative by $\tau=r_i+r_j$, so there is exactly one positive root. The same-label displacement is at most $v\tau<\tau$, so no positive self root exists. This gives thirty directed partner roots and no positive self roots for the complete six-member histories. Every partner root has $D=1-n\cdot V_j>0$.

At a root, the causal chord has length $\tau$. Triangle inequalities comparing that chord with the present separation give

$$
\frac{p}{1+v}\le\tau\le\frac{p}{1-v},\qquad 1-v\le D\le1+v.
$$

For a unit-polarity logarithmic row, $A=q_iq_j n/(\tau D)$ and $|A|=1/(\tau D)$. In particular,

$$
|A|\ge\frac{1-v}{(1+v)p}.
$$

This lower bound uses two upper bounds on positive factors in the same denominator; it does not require those upper bounds to be attained together. The weaker resulting estimate remains valid for every root.

At the radius-one receiver, a source of radius $b\ge1$ and delayed relative angle $\theta$ has $\tau^2=1+b^2-2b\cos\theta$. The geometric identity

$$
\tau^2-b^2\sin^2\theta=(1-b\cos\theta)^2\ge0
$$

gives $|n\cdot V_j|=u b|\sin\theta|/\tau\le u$. Therefore $D\ge1-u$ for every source at this receiver, independently of how close the source's own speed is to one. This is the factor floor needed for both far middle and outer rows.

Write the receiver position as $x$ with $|x|=1$, and choose the nearer middle endpoint $y$ so that $|x-y|=d$. Antipodal symmetry makes this the minimum across both radius-one endpoints as well. The near endpoint's polarity can be either sign; the argument uses norms. The reverse triangle inequality gives $r_2\le1+d$, while the other middle endpoint obeys $|x+y|\ge2-d$.

The receiver has precisely five rows: its own antipodal partner, two middle endpoints and two outer endpoints. The own partner's delay satisfies $\tau_0=2\cos(u\tau_0/2)$, with $0<\tau_0\le2$. Since $u<1$, the angle $u\tau_0/2<1<\pi/2$, so the cosine is positive and the factor is $D_0=1+u\sin(u\tau_0/2)\ge1$. Its present distance is two and $\tau_0\ge2/(1+u)$, giving $|A_0|\le(1+u)/2$. This argument holds throughout both branches, not only for $u<1/2$.

Put $v_2=ur_2<1$. For $d<2$, the far middle row and two outer rows obey

$$
|A_{\mathrm{far}}|\le\frac{1+v_2}{(1-u)(2-d)},\qquad
|A_{\mathrm{outer},+}|+|A_{\mathrm{outer},-}|\le\frac{2}{(1-u)(s-1)}.
$$

The outer estimate uses the actual delayed chord lower bound $\tau\ge s-1$, valid at every emission phase. The required radius-one circular acceleration has norm $u^2$. Rearranging the exact vector equation and applying the triangle inequality consequently gives the necessary comparison

$$
\frac{1-v_2}{(1+v_2)d}
\le |A_{\mathrm{near}}|
\le\frac{1+u}{2}+\frac{1+v_2}{(1-u)(2-d)}+\frac{2}{(1-u)(s-1)}+u^2.
$$

The following contradictions use this full comparison with conservative bounds. They do not assume radial alignment, favorable tangential cancellation, a particular polarity of the near row or a suppressed self response.

## Outer radius at least two

Suppose $s\ge2$ and $d\le1/21$. Then $u<1/s\le1/2$ and $v_2\le(1+d)/2\le11/21$. The near-row lower bound decreases when either $v_2$ or $d$ increases, so

$$
|A_{\mathrm{near}}|\ge\frac{1-11/21}{(1+11/21)(1/21)}=\frac{105}{16}.
$$

The own-partner row is at most $3/4$. The far middle distance is at least $41/21$, giving $\tau_{\mathrm{far}}\ge41/32$; with $D\ge1/2$ its norm is at most $64/41$. Each outer row has delayed distance at least one and factor at least $1/2$, so the two sum in norm to at most four. The prescribed acceleration is at most $1/4$. Thus exactness would require

$$
|A_{\mathrm{near}}|\le\frac34+\frac{64}{41}+4+\frac14=\frac{269}{41},
\qquad \frac{105}{16}-\frac{269}{41}=\frac1{656}>0.
$$

The positive exact difference proves a contradiction even at $d=1/21$. This yields the strict bound $d>1/21$. No upper bound on $s$ was used in this branch.

## Outer radius between one and two, including the endpoint

Put $s=1+h$, where $0<h\le1$, and suppose $d\le h^3/24$. Then $d\le h/24<h$, so the source-speed upper bound $V=(1+d)/s$ is itself strictly below one. Since $(1-v)/(1+v)$ decreases with $v$,

$$
|A_{\mathrm{near}}|\ge\frac{1-V}{(1+V)d}=\frac{h-d}{d(2+h+d)}.
$$

The numerator satisfies $h-d\ge23h/24$ and the second denominator factor satisfies $2+h+d\le73/24$. Both are positive, so substituting the smaller numerator and larger denominator preserves the lower-bound direction:

$$
|A_{\mathrm{near}}|\ge\frac{23h}{73d}\ge\frac{552}{73h^2}.
$$

For the other rows, $1-u\ge h/s$ and $v_2\le(1+d)/s$. Thus the far middle norm is at most

$$
\frac{s+1+d}{h(2-d)}\le\frac{73}{47h}\le\frac{73}{47h^2},
$$

where the middle inequality uses $d\le1/24$ and the last uses $h\le1$. The two outer norms together are at most $2s/h^2\le4/h^2$. The own-partner norm is at most one and the prescribed acceleration norm is at most one. Replacing each of these unit bounds by $1/h^2$ is conservative. Hence

$$
|A_{\mathrm{near}}|\le\frac{1+1+4+73/47}{h^2}=\frac{355}{47h^2},
$$

$$
\frac{552}{73h^2}-\frac{355}{47h^2}=\frac{29}{3431h^2}>0.
$$

Again the contradiction includes equality at the proposed distance cutoff. It proves $d>h^3/24$ on the entire continuous interval $0<h\le1$; no parameter sampling is used. At $h=1$, the two valid cutoffs are $1/24$ and $1/21$, whose difference is $1/168>0$. The branch for $s\ge2$ supplies the stronger endpoint restriction.

If an exact sequence has this particular inner-middle minimum distance tending to zero, it eventually has $s<2$ by the first branch. The second then gives $s-1<(24d)^{1/3}\to0$. This is a necessary scaling for an inner-middle approach, not a statement about every possible outer-middle approach or proof that any such exact sequence exists.

## Relative phase and radial gap

Let $\delta=\phi_2-\phi_1$ and $\rho=\operatorname{dist}(\delta,\pi\mathbb Z)\in[0,\pi/2]$. The two middle endpoints differ by a half-turn. Their minimum squared distance from the positive inner endpoint is therefore

$$
d^2=1+r_2^2-2r_2|\cos\delta|
=(r_2-1)^2+2r_2(1-\cos\rho)
=(r_2-1)^2+4r_2\sin^2(\rho/2).
$$

This derives the corrected phase formula without choosing an angular origin. In the $s\ge2$ branch, exactness excludes the region where this expression is at most $1/441$, including its boundary. The smallness of $r_2-1$ alone does not place a configuration in that region: a nonzero relative phase can keep $d$ large. Conversely, $d$ small forces both a small radial gap and proximity to one of the two aligned endpoint phases. The complement of the excluded region is not an existence certificate.

## Exact arithmetic result, verification limits and falsifiers

After the known-control record, `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-separation-independent-check.py --stage target` returned `passed: true`. It independently recomputed the first lower bound $105/16$, total upper bound $269/41$ and gap $1/656$; the second lower coefficient $552/73$, total upper coefficient $355/47$ and gap $29/3431$; and the endpoint cutoff difference $1/168$. The receipt is `.local-data/master-equation-closure/overnight2-c/review-separation-exact.json`. The rational arithmetic verifies the constants; the foregoing inequalities establish their applicability to all phases, complete roots and every $h\in(0,1]$.

The reviewer created only this report, its separately authored checker and two review-prefixed local receipts. No root-search worker, trajectory calculation, interval replay or stability computation ran. The source's relative-phase correction was made by the parent and independently read back here. No previous source, review, main report or shared owner was edited by this reviewer.

Falsifiers are a missed admitted root in the strict subfield census, failure of the causal two-sided delay estimate, a source factor below the derived receiver-radius floor, a near norm below its stated lower bound, a far/outer/own norm above its stated upper bound, failure of the triangle-inequality comparison, an exact-rational margin of nonpositive sign, or an exact reference with the defined endpoint distance at or below its relevant cutoff. The relative-phase identity is directly checkable from the two simultaneous Euclidean distances. A claim about superfield histories, actual-time contact, physical stability or an arbitrary radial-gap exclusion would exceed this proof.

The recommended parent integration is to retain the two explicit strict bounds, both endpoint statements and the corrected relative-phase formula at the independently reconstructed grade. No broader theory closure or existence conclusion follows.
