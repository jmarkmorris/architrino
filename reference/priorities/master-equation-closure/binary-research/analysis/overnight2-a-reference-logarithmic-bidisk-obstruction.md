# Independent assessment of the logarithmic source-domain obstruction

**Derived acceptance.** The [bidisk subject](overnight2-a-logarithmic-bidisk-obstruction.md) proves more than failure of the previous Wiener-norm estimate: in first-Cartesian-component-one eigenvector coordinates, the holomorphic source map cannot send the entire radius-$1/100$ complex bidisk into itself. Its first clock jet already violates a necessary disk-map derivative inequality. This conclusion does not exclude continuation on a larger or differently shaped complex domain, a collection of local charts, or any actual physical continuation.

This assessment follows the independently frozen [clock-jet reference](overnight2-a-reference-logarithmic-clock-jet.md). That reference and its interval instrument were completed before disclosure of this new disk argument. The present proof is therefore an after-disclosure adjudication using an already independent exact first-jet enclosure. No pilot or higher coefficient is needed, and none is read.

## First jet and normalization

Retain the registered coefficient-one logarithmic mirror-planar case, exact balance zero, exact growing root $k=\alpha+i\beta$, and the original compatible family. The first Cartesian eigenvector component is one. The frozen differential gives

$$
\ell(z,w)=\lambda+Lz+\bar Lw+\cdots,\qquad
L=-\frac{n_0\cdot(I+\lambda^{k+1}P)v}{D_0}.
$$

At the exact balance $D_0=1/\lambda$, so the subject's expression with an explicit leading factor $\lambda$ is identical. The interval reference evaluated the direct denominator over the full parameter rectangle, without replacing off-balance values by that identity. It proves $|L|>.83786$, and hence the subject's required weaker $|L|>.2$.

The established coefficient-sum condition and its necessary radius are

$$
\|\ell^k\|_r\ge\lambda^\alpha+
2r|k|\lambda^{\alpha-1}|L|,
\qquad
r<r_{\mathcal A}:=
\frac{\lambda^{1-\alpha}(1-\lambda^\alpha)}
{2|k||L|}.
\tag{1}
$$

This part is inherited from the independently derived first-jet reference. Equality in (1)'s radius condition cannot provide a strict norm contraction. A unit-eigenvector radius would need rescaling by $|v|_2$; none is silently substituted here.

## Derivation from a holomorphic disk restriction

Assume, for contradiction, that the source map is holomorphic on the open bidisk and preserves it:

$$
(z,w)\longmapsto
(z\ell(z,w)^k,w\ell(z,w)^{\bar k}),
\qquad |z|,|w|<r.
\tag{2}
$$

If there is no holomorphic branch defining (2) throughout that domain, the claimed domain admission already fails. Otherwise let

$$
F(\zeta,\eta)=\zeta\,\ell(r\zeta,r\eta)^k.
$$

The first source component of (2) gives $|F|<1$ on the unit bidisk. Since $L\ne0$, choose $u=L/\bar L$, which has modulus one. The restriction $f(t)=F(t,ut)$ is holomorphic on the unit disk and vanishes at zero. Its quotient $g(t)=f(t)/t$ extends holomorphically across zero.

For every $R<1$, on $|t|=R$ one has $|g(t)|\le1/R$. The maximum principle, followed by $R\uparrow1$, proves $|g(t)|\le1$ for every interior point. Its value and derivative are exactly

$$
g(0)=\lambda^k,\qquad
g'(0)=rk\lambda^{k-1}(L+u\bar L)
=2rk\lambda^{k-1}L.
\tag{3}
$$

Let $a=g(0)$; then $|a|=\lambda^\alpha<1$. The disk transformation

$$
h(t)=\frac{g(t)-a}{1-\bar a g(t)}
$$

has denominator separated from zero, takes values in the closed unit disk and satisfies $h(0)=0$. Applying the same quotient argument to $h$ gives $|h'(0)|\le1$. Since $h'(0)=g'(0)/(1-|a|^2)$, equations (3) imply the necessary inequality

$$
2r|k|\lambda^{\alpha-1}|L|
\le1-\lambda^{2\alpha}.
\tag{4}
$$

This proof uses only a one-variable restriction strictly inside the bidisk; it does not need extension to the closed boundary or convergence of a Wiener coefficient sum there. As analytical controls, constant $g$ has zero derivative, while the disk automorphism $g(t)=(a+t)/(1+\bar a t)$ saturates $|g'(0)|=1-|a|^2$. They confirm the squared modulus on the right side and the absence of an extra factor two in that disk inequality. The factor two on the left arises separately from aligning the two first clock coefficients.

Solving (4) for $r$ gives

$$
r\le r_{\rm disk}:=
\frac{\lambda^{1-\alpha}(1-\lambda^{2\alpha})}
{2|k||L|}
=(1+\lambda^\alpha)r_{\mathcal A}.
\tag{5}
$$

The disk necessary radius is larger than the Wiener necessary radius. The new conclusion is stronger in its meaning, not a smaller numerical bound: violation of (4) excludes the actual self-map property, whereas violation of the Wiener estimate alone excludes only that norm criterion.

## Coarse numerical margins checked independently

The admitted exact enclosures give $.615<\lambda<.616$, $0<\alpha<.014$ and $|k|>3.22$. For the logarithm bound, the positive exponential series gives

$$
e^{.49}>1+.49+\frac{.49^2}{2}+\frac{.49^3}{6}
>1.629>\frac{200}{123}=\frac1{.615}.
$$

The last comparison is the exact integer inequality $1629(123)=200367>200000$. Therefore $-\log\lambda<.49$, and $1-e^{-x}<x$ for positive $x$ yields

$$
1-\lambda^{2\alpha}<2\alpha(-\log\lambda)<.01372.
\tag{6}
$$

The other fractional-power estimate can be checked with an even coarser rational base. Since $\lambda<.616<5/8$ and $1-\alpha>7/8$,

$$
\lambda^{1-\alpha}<(5/8)^{7/8}<2/3.
$$

The final inequality, raised to the eighth power, follows from

$$
5^7\,3^8=512578125<536870912=2^8\,8^7.
$$

It implies the subject's proposed $.616^7<(2/3)^8$ as well, and gives $\lambda^{\alpha-1}>3/2$. With the independently certified $|L|>.2$ and $r=.01$, the left side of (4) is strictly greater than

$$
2(.01)(3.22)(1.5)(.2)=.01932.
$$

This exceeds (6)'s upper bound by $.00560$, with both comparisons strict. The radius-$1/100$ source self-map is therefore impossible under the stated normalization. No higher-degree term can repair this derivative inequality.

## Scope and preservation

The conclusion concerns the proposed same complex bidisk. It does not show that $U$ lacks a holomorphic extension to that bidisk when its source values are supplied by a larger domain, nor that a noncircular domain or another composition argument must fail. It does not locate a physical unit-speed event or any other event, and it does not replace the original history by the formal manifold germ. No new mathematical or physical claim about a specific finite-amplitude future is made.

Falsifiers are a normalization mismatch, a wrong implicit-clock derivative, failure of the independent $L$ enclosure, a missing holomorphic hypothesis for the claimed source map, or an incorrect aligned disk restriction in (3). A successful alternative-domain continuation would be consistent with this result.

Native shasum -a 256 before writing matched all eight identities in the admitted assignment b68fd84f-d8e2-4ad8-b82b-0dc290a92744. The two load-bearing inputs for this first serial review are:

| Input | SHA-256 |
| --- | --- |
| Bidisk subject | 4dbba18537524e6f0e35512cfc9547d361e1ea39f10e80ed3cb82179807eaa06 |
| Independently frozen clock-jet reference | cd5d939e24c49fd367fc83788057f121b8b634ec8bb1c158bfdc15f068439df9 |

The complete retained assignment was emitted with exit zero and payloadVerified true; its transportVerified false is not relabeled here. Only this new report is authored for this assessment. The original clock-jet instrument, receipts, subject and earlier references remain unchanged. No scientific computation or new instrument is needed for the displayed algebra, and no owned process is active. The coordinator's [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns integration. This first assessment is frozen before reading the second subject.

Validation: the established authorized-cases-followup-document-check.mjs command passed its known controls and this report's 57 mathematical spans and three local links, with no whitespace findings. A subsequent native shasum -a 256 check matched both load-bearing identities above. This is a document validation receipt, separate from the displayed mathematical proof.
