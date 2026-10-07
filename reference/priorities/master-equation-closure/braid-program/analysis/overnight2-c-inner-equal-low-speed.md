# A low-speed exclusion using the complete neutral-pair response

## Proposed continuous exclusion

**Derived claim pending independent reconstruction:** in the selected distinct-member three-neutral-pair circular class with $r_1=r_2=1$, $2\le b=r_3\le4$ and $0\le\omega\le1/80$, the two positive inner receivers can be ordered so that

$$
A_{1,t}-A_{2,t}\ge\frac{55}{912}>0.
$$

Thus some absolute tangential balance residual is at least $55/1824$. Combined with the independently checked exclusion of $b\ge4$, an exact inner-equal configuration with $b\ge2$ must satisfy $2\le b<4$ and $\omega>1/80$. The result concerns every phase in this domain. The law remains $K_{\log}=c_f=1$, with unchanged transmitter weighting, persistent unit polarities and complete circular histories. No new numerical instrument or target is used.

## The correlated inner contribution

Order the positive inner endpoints with clockwise separation $\beta\in(0,\pi)$ and put $v=\omega$. The complete three-inner-source difference is

$$
L=\frac{Q_v(\beta)+Q_v(\pi-\beta)}2\ge Q_v(\pi/2),
$$

by the checked convexity of $Q_v=B_v(\cdot)-B_v(\cdot+\pi)$. At angle $\pi/2$, the complete emission angle lies between $\pi/2$ and $\pi/2+2v$, and its positive cotangent is divided by a factor at most one. Therefore

$$
B_v(\pi/2)\ge\cot(\pi/4+v).
$$

For $0\le v\le1/80$, $\tan v\le v/(1-v^2/2)\le2v$. Using $(1-t)/(1+t)\ge1-2t$ for $t\ge0$ gives $\cot(\pi/4+v)\ge1-4v$. At present angle $3\pi/2$, the negative cotangent has magnitude at least one and its factor is at most $1+v$, giving $-B_v(3\pi/2)\ge1/(1+v)\ge1-v$. Hence

$$
L\ge Q_v(\pi/2)\ge2-5v.
$$

No inner phase-separation lower bound is required for this comparison. It retains the two inner receivers' correlated source inventory.

## Bound the static neutral pair before estimating delay error

At a positive unit-radius receiver and zero angular rate, the radius-$b$ neutral pair has complete tangential response

$$
G^{(0)}_{1,b,t}(\theta)
=-\frac{2b(b^2+1)\sin\theta}
{(b^2-1)^2+4b^2\sin^2\theta}.
$$

This follows by summing the positive source at angle $\theta$ and its negative partner at $\theta+\pi$ using their separate static distances. The square $(b^2-1-2b|\sin\theta|)^2\ge0$ bounds the denominator below by $4b(b^2-1)|\sin\theta|$. For nonzero sine it follows that

$$
|G^{(0)}_{1,b,t}(\theta)|\le\frac{b^2+1}{2(b^2-1)}
=\frac12+\frac1{b^2-1}\le\frac56,\qquad b\ge2.
$$

At zero sine the response vanishes and the same bound holds. Consequently the difference of this pair's static tangential contributions at any two unit receivers has magnitude at most $5/3$. This bounds each complete neutral pair before taking a difference; it is smaller than the earlier sum of four independent row caps.

## A controlled comparison of moving and static rows

For one outer source, write $p_0=x-y(0)$ for the present chord and $p=x-y(-\tau)$ for its causal chord. Put $d=|p_0|\ge b-1$, $|p|=\tau$, and source speed $w=vb\le4v<1$. The source displacement obeys $|p-p_0|\le w\tau$. The exact Euclidean inversion identity

$$
\left|\frac p{|p|^2}-\frac{p_0}{|p_0|^2}\right|
=\frac{|p-p_0|}{|p|\,|p_0|}
$$

therefore bounds that difference by $w/d$. The source factor satisfies $D\ge1-w$ and $|1-D|\le w$. For either polarity, the complete moving row is $A=\sigma p/(\tau^2D)$ and the static row at the same present geometry is $A^{(0)}=\sigma p_0/d^2$. Splitting the difference as an inversion difference divided by $D$ plus $A^{(0)}(1/D-1)$ gives

$$
|A-A^{(0)}|\le\frac{2w}{d(1-w)}
\le\frac{2vb}{(b-1)(1-vb)}.
$$

This is the actual delayed-row comparison, not a modified equation or a replacement history for the target. Each of the two sources has its own causal delay. Across the two receivers there are four such rows, so the total error in their outer-pair tangential difference is at most

$$
\frac{8vb}{(b-1)(1-vb)}
\le\frac{16v}{1-4v},\qquad 2\le b\le4.
$$

The last inequality uses $b/(b-1)\le2$ and $vb\le4v$. All denominators stay positive on the declared speed interval.

## The residual margin

The complete difference of inner tangential accelerations is bounded below by

$$
A_{1,t}-A_{2,t}
\ge 2-5v-\frac53-\frac{16v}{1-4v}.
$$

Both subtracted speed functions increase for $0\le v<1/4$. At $v=1/80$, the lower bound becomes

$$
\frac13-\frac1{16}-\frac4{19}
=\frac{304-57-192}{912}
=\frac{55}{912}>0.
$$

It is therefore positive throughout the stated domain, including $v=0$. The triangle inequality supplies the maximum-component bound $55/1824$. The required circular acceleration has no tangential component, so this contradicts exact full balance. It does not assert that the static comparison configuration is exact or that a numerical integration approximates the true history.

## Complete roots and evidence boundary

Here outer speed is at most $1/20$ and inner speed at most $1/80$, so the complete circular partner-root theorem applies with strict source-speed margins. All thirty positive partner roots and zero positive self roots remain included. At either selected inner receiver, the three inner and two outer source rows exhaust its equation. The remaining receiver equations are not needed for this necessary-condition contradiction.

The static pair sum, geometric square, inversion identity and exact rational margin are analytic controls. For example the inversion identity is exact for any two nonzero Euclidean vectors, and at zero angular rate the comparison error vanishes. No sample, optimizer, interval cover or completed target is rerun. The argument requires independent reconstruction of the pairwise static sum, the delay-error comparison and their compatible domains before the proposed lower angular-rate bound is integrated as checked.

A wrong static polarity sign, lost root, invalid factor denominator, omitted one of the four comparison rows or exact configuration in the declared region would falsify the corresponding step. The remaining domain $2\le b<4$, $\omega>1/80$, as well as $1<b<2$, the outer-equal branch and arbitrary unequal radii, remain unresolved by this theorem.
