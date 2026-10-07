# An explicit inward radial criterion forces a finite unit endpoint

## Quantitative theorem

Claim grade: derived candidate pending independent assessment. Let $a$ be a regular generated time of the admitted logarithmic family, and suppose its source $b=s(a)$ is also generated. Put $r_a=|x(a)|$ and $p_a=r'(a)$. If

$$
p_a\le-1+2^{-50},
\tag{1}
$$

then the maximal strict-subfield continuation ends at unit speed no later than

$$
a+\frac{(-p_a)r_a}{8}.
\tag{2}
$$

This is an explicit sufficient criterion on an actual generated history. It does not assert that the departing family enters it. The deliberately conservative power of two is a proof constant, not a measured physical threshold.

Consequently every all-future continuation obeys $p>-1+2^{-50}$ once its source is generated. Once its source's source is generated, it also obeys

$$
D>2^{-50},\qquad R<2^{51}r.
\tag{3}
$$

These bounds concern inward radial speed, the ordinary source denominator and delay scale. They do not impose a ceiling response or establish a uniform gap between total speed and one.

The fixed law, complete preparation, actual compatible family and root treatment remain those of the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). The proof makes quantitative the independently assessed [radial-margin argument](authorized-cases-ten-hour-c-spiral-radial-margin.md). Its essential refinement is temporal: the second inward budget used below lies entirely before $a$, so only the short future interval in (2) is assumed for contradiction.

## The short future assumption makes the preceding arc almost null

Write $\eta_0=2^{-50}$ and $u=-p_a\ge1-\eta_0$. Suppose the regular strict continuation exists through $a+ur_a/8$. Let $L=R(a)=a-b$. The local-delay inward budget on that short future interval gives

$$
1-E(a)\ge\frac{u^2r_a^2}{128L^2},
\qquad E=|v|^2.
$$

Since $E(a)\ge u^2$ and $1-u^2\le2\eta_0$, it follows that

$$
q:=\frac{r_a}{L}
\le\frac{16\sqrt{\eta_0}}{1-\eta_0}
\le32\sqrt{\eta_0}=2^{-20}.
\tag{4}
$$

The root equation gives $(1-q)L\le r_b\le(1+q)L$. Let $e_b=x(b)/r_b$. The displacement integral and the speed bound imply

$$
0\le1+v(t)\cdot e_b,
\qquad
\frac1L\int_b^a[1+v(t)\cdot e_b],dt\le2q.
\tag{5}
$$

Choose $m\in[b+L/4,b+L/2]$ with $1+v(m)\cdot e_b\le8q$. Then

$$
|v(m)+e_b|\le4\sqrt q.
\tag{6}
$$

Every reception in $[b,a]$ is generated. The acute-angle projection argument gives $x''\cdot(-e_b)>0$ throughout this interval, even when a reception samples an earlier generated or admitted source. Thus (6) extends uniformly:

$$
|v(t)+e_b|\le4\sqrt q\qquad(m\le t\le a).
\tag{7}
$$

All sampled angles lie in the accepted continuous acute sector; no wrapped-angle comparison is used.

## Small net velocity change controls the whole acceleration integral

At $a$, the radial assumption gives $|v(a)+e_a|\le\sqrt{2\eta_0}$. Hence

$$
|e_a-e_b|\le4\sqrt q+\sqrt{2\eta_0}<\frac1{128}.
$$

The acute angle $\delta=\theta(a)-\theta(b)$ is therefore less than $\pi/12$. Every chord angle on $[m,a]$ lies between $\theta(b)-\pi/2$ and $\theta(b)+\delta$. Projection onto the unit vector of angle $\theta(b)+3\pi/4$ is at least one half of the acceleration magnitude. Consequently

$$
\int_m^a|x''(t)|\,dt
\le2|v(a)-v(m)|\le16\sqrt q.
\tag{8}
$$

The exact range inequality $(\log R)'\ge-2|x''|$ now gives

$$
\frac{R(m)}L\le\exp(32\sqrt q)
\le\exp(1/32)<2.
\tag{9}
$$

For example, the elementary series bound $e^x\le(1-x)^{-1}$ for $0\le x<1$ gives $e^{1/32}\le32/31<2$.

Because $m-b\le L/2$, the unit speed bound gives

$$
\frac{r(m)}L\ge\frac12-q\ge\frac14,
\qquad \frac{r(m)}L\le\frac32+q<2.
\tag{10}
$$

The angle of $x(m)$ lies between those of $x(b)$ and $x(a)$. Using $\delta<\pi/12$, (6) and $4\sqrt q\le1/256$ gives

$$
p(m)\le-\cos\delta+4\sqrt q<-\frac12.
\tag{11}
$$

Also its inward fixed-axis projection is at least $1-8q$, so

$$
1-E(m)\le1-(1-8q)^2\le16q\le2^{-16}.
\tag{12}
$$

## The contradictory budget is entirely in the known past

The short interval required to apply the inward budget at $m$ has length

$$
\ell_m=\frac{[-p(m)]r(m)}8<\frac L4,
$$

by (10) and $|p(m)|<1$. Since $m\le b+L/2$, this interval ends before $b+3L/4<a$. It is therefore wholly inside the already existing regular strict trajectory, and requires no additional future assumption.

Apply its budget using (9)–(11):

$$
1-E(m)\ge\frac{p(m)^2}{128}
\left(\frac{r(m)}{R(m)}\right)^2
>\frac{1/4}{128}\left(\frac18\right)^2
=2^{-15}.
\tag{13}
$$

This contradicts (12). The strict continuation cannot persist through the proposed interval after $a$. The accepted finite-maximal-endpoint theorem then gives unit arrival by (2), with positive separation and a regular earlier partner source. No assertion about continuation beyond that endpoint is made.

## Explicit margins on an infinite branch

An all-future branch cannot satisfy (1) at any time whose source is generated. At a later reception whose source's source is generated, its source radial velocity therefore exceeds $-1+2^{-50}$. The source-axis inequality $D\ge1+p_s$ for negative $p_s$, and $D\ge1$ otherwise, proves the first part of (3).

The same radial bound holds on the entire causal interval, because the source clock increases. Integrating it gives $r_s-r<(1-2^{-50})R$. Combine this with $R\le r+r_s$ to obtain $R<2^{51}r$, proving the second part of (3). The earlier quantitative source-ratio bound supplies a finite explicit generation cutoff if desired; the formulation by two generated source levels avoids tying this theorem to a particular choice of elapsed-time origin.

## Scope, consistency and falsifiers

The exact admitted expanding spiral has positive radial speed and never satisfies the event criterion. It is consistent with all stated margins. Every numerical constant above is an analytical rational bound in the mandated $c_f=1$ units; no numerical trajectory, newly built instrument or explicit perturbation amplitude is used.

The missing later-fate step remains actual entry: the accepted nonlinear departure gives a finite history-norm exit, not the signed radial inequality (1). The theorem neither selects a member nor replaces its complete past. Its value is an explicit finite-horizon implication rather than another asymptotic alternative.

Falsifiers are an incorrect temporal placement of the budget interval at $m$; failure of the fixed acceleration projection on $[b,a]$; an invalid estimate in (4), (8), (9), or (13); or use of a prescribed receiving interval where the equation does not hold. Earlier complete histories and frozen evidence remain unchanged. Only this new subject is written, no owned computation is active, and independent assessment is required before integration.
