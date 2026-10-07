# Scale incompatibility near the moderate radial proposal

## Result and exact domain

**Subject result, pending independent reconstruction:** every preparation in the closed box below fails the full canonical acceleration equation at reception phase zero for every positive scale. Its complete eight-root chart is ordinary at that reception, but the demanded radial and axial accelerations are incompatible with the complete interaction sum. The normalized full-vector residual is greater than $24/25$ at every scale.

This is a continuous local exclusion, not a whole-domain search conclusion, an everywhere-ordinary chart, a stability result or an actual-fate theorem. It retains $K=c_f=1$, every positive-delay self and partner root, and the absolute source divisor. No event rule or response factor is used.

Define normalized time $\tau=t/R$, $\phi=\kappa\tau$, and complete paths

$$
X_j(t)=R(\rho(\phi)\cos[\beta\tau+j\pi/3+p(\phi)],
\rho(\phi)\sin[\beta\tau+j\pi/3+p(\phi)],(-1)^jz(\phi)),
$$

$$
\rho=1+a\cos2\phi+b\sin2\phi,\qquad
p=(c\cos2\phi+d\sin2\phi)/\kappa,\qquad
z=(\cos\phi-\sin3\phi/8)/20.
$$

Use independent closed halfwidth $2^{-20}$ in the six coordinates around these exact decimal centers:

| Coordinate | Center |
| --- | --- |
| $a$ | 0.0002191395109809334 |
| $b$ | 0.0002346909943333512 |
| $c$ | -0.001118865929608746 |
| $d$ | 0.0019226003081620029 |
| $\beta$ | 1.8999999999999997 |
| $\kappa$ | 8.000000000000002 |

Height is fixed at $1/20$. The closed box is chosen around the retained optimizer output and extends slightly past its search bounds in $\beta,\kappa$; the interval proof covers those extensions explicitly. The underlying [proposal search](overnight2-b-moderate-radial-search.md) found no exact solution.

## Complete causal chart and acceleration equation

At phase zero write normalized delay $s>0$, source phase $\psi=-\kappa s$ and relative angle $\alpha_j=j\pi/3-\beta s+p(\psi)-p(0)$. The receiver-frame separation and source velocity are

$$
Q_j=(\rho(0)-\rho(\psi)\cos\alpha_j,-\rho(\psi)\sin\alpha_j,z(0)-(-1)^jz(\psi)),
$$

$$
V_j=(\kappa\rho'(\psi)\cos\alpha_j-\rho(\psi)w(\psi)\sin\alpha_j,
\kappa\rho'(\psi)\sin\alpha_j+\rho(\psi)w(\psi)\cos\alpha_j,
(-1)^j\kappa z'(\psi)),
\quad w=\beta+\kappa p'.
$$

Primes denote phase derivatives. Every positive-delay hit satisfies $G_j=|Q_j|^2-s^2=0$. Its derivative and signed source divisor are

$$
G_{j,s}=2Q_j\cdot V_j-2s,\qquad D_j=-G_{j,s}/(2s).
$$

The normalized interaction acceleration and demanded acceleration are

$$
A=\sum_{j=0}^5\sum_{s\in\mathcal R_j}
\frac{(-1)^jQ_j}{s^3|D_j|},\qquad
L=(\kappa^2\rho''-\rho w^2,\;2\kappa\rho'w+\rho\kappa^2p'',\;\kappa^2z'')_{\phi=0}.
$$

The physical equation is equivalent to $RL=A$. In particular the canonical scaling is explicit; the residual considered below is $E=RL-A$, and its physical counterpart is $E/R^2$.

The instrument proves a recent-self secant bound greater than one using the lower instantaneous planar speed minus half the uniform acceleration bound times delay. It applies on $0<s\le1/100$. Distinct partners are excluded there by simultaneous separation minus source displacement and delay. A complete position bound excludes all delays beyond the stored remote endpoint. These estimates are uniform over the whole coefficient box and complete past.

Between the recent and remote bounds, every protected root bracket has opposite strict gap signs and a signed derivative interval excluding zero. Interval Newton contracts the root; a complete complementary partition excludes every other delay. The resulting counts for sources zero through five are $(1,3,1,1,1,1)$. Negative signed divisors are retained through absolute values. No sampled count or omitted self term is an input to this chart.

## Scale-free incompatibility and residual gap

For any exact scale the radial/axial determinant must vanish:

$$
\Delta=A_rL_z-A_zL_r=0.
$$

The subject target encloses it in the exact interval

$$
\Delta\in\left[
\frac{59818997387187885497166608570498790951435009097883548003}
{12259964326927110866866776217202473468949912977468817408},
\frac{59843142259606717708025504204326433543179946039385970671}
{12259964326927110866866776217202473468949912977468817408}
\right].
$$

Its lower endpoint exceeds $24/5$ by exact integer cross-multiplication. The stored demand enclosures satisfy

$$
|L_r|<37/10,\qquad |L_t|<1/10,\qquad |L_z|<33/10,
$$

so $|L|^2<2459/100<25$. Since $\Delta=-\det(E_{rz},L_{rz})$, the determinant bound yields

$$
|E|\,|L|\ge|\Delta|>24/5,\qquad |E|>24/25
$$

for every $R>0$. This avoids fitting or bounding $R$. It is a pointwise normalized residual gap; it does not give a positive physical gap uniform as $R$ becomes arbitrarily large.

## Verification and preservation

The [new companion](overnight2-b-moderate-radial-determinant.py) uses frozen generic waveform, geometry and census helpers. Its known controls precede pilot and target: exact demand $(-24/5,0,-1/20)$, determinant $143/10$ for a hand-specified acceleration, the complete static opposite-partner root and derivative, and omitted-root rejection. The exact-center pilot and unchanged whole-box target both pass with all eight roots and nonzero determinant. No source was changed after known or target execution.

| Evidence | SHA-256 |
| --- | --- |
| New companion | addd00cc91fc84dc869dc6a1acf9c7579d2806f412a4add10c298f80d92cf015 |
| Frozen interval helper | a9ee52a136b9b093688c8beac306d43aa370f18c1469b1211dd06867b18c9e9a |
| Frozen floating root hints | 8523e295cca3c44c2fb0a36ed7bee27c94c63b4f1e510c4047689b8bc32e56b1 |
| Input proposal | dd1d8c45d166e0eb99475b1780565477a2fc6e2ad5676abad6a09e289234710c |
| Known receipt | 6d09594ddf3d5a52843c47dfeb3a64ee14abf76c3ebc93eaea1d6fae05a6cbdf |
| Pilot receipt | 8fc66960a47f1502cbc27fbbdbc3548045e03647305af8494a5bd948884e781a |
| Target receipt | fe43598a047b2af39a2cf2334bd778c191feef1741ea0591df0d73244df4fe36 |

Original receipts remain in local ignored storage under .local-data/master-equation-closure/overnight2-b/moderate-radial-determinant. Native jq inspection records a complete target, no unresolved source and 51 complementary leaves. Target measurements are 0.664967 internal seconds, 0.755 supervised seconds, 79,855,616 bytes RSS and 61,306 output bytes. Native wc gives 125,264 bytes for the three receipts. Supervisor e9751e50-5a07-4a50-a7cb-5f913b4c0fe3 closed with exit zero, zero stderr and a closed group.

Reproduce the known, pilot and target stages sequentially with the shared venv and one numerical/BLAS thread. Pilot and target use the owned supervisor, a 180-second deadline, 120-second internal cap, 512 MiB observed RSS cap, four MiB receipt cap and 50,000 complementary leaves. Original exclusive-create receipts must be preserved and any new replay given a distinct output destination. Shared mpmath interval arithmetic remains an explicit numerical dependency.

The result would fail if an interval misses a root, a complementary delay interval is not covered, a recent/remote guard is invalid, a signed divisor is omitted, the demanded acceleration uses the wrong phase derivative, or the determinant/residual inequality is incorrect. An exact preparation outside this box does not contradict the local exclusion. Independent reconstruction is pending; the parent owns integration and the coordinator owns later shared summaries.
