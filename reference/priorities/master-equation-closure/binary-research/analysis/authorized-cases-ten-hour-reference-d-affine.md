# Blind canonical control for parallel affine source histories

**Derived mathematical control before subject disclosure.** Take two opposite labels with complete prescribed affine histories of the same constant velocity $c$, $|c|<1$, current separation $z=x_1(t)-x_2(t)=dN$, $d>0$, $|N|=1$, and canonical $K=c_f=1$. These prescribed paths are inputs for instantaneous row evaluation; their nonzero returned accelerations mean they are not asserted to solve the coupled equations.

Put $b=z\cdot c$ and $\Delta=\sqrt{b^2+(1-|c|^2)d^2}>0$. The two causal delays are the unique positive roots

$$
R_+=\frac{\Delta+b}{1-|c|^2},\qquad
R_-=\frac{\Delta-b}{1-|c|^2}.
$$

The receiver-to-source ray vectors are $z+cR_+$ and $-z+cR_-$. Each transmitter denominator is $D_\pm=1-n_\pm\cdot c=\Delta/R_\pm>0$. Strictly subfield affine self chords exclude all self roots, and the partner clock is strictly monotone over the complete past. The opposite-polarity canonical acceleration rows are consequently

$$
a_1=-\frac{z+cR_+}{\Delta R_+^2},\qquad
a_2=\frac{z-cR_-}{\Delta R_-^2}.
$$

Using $R_+^{-1}=(\Delta-b)/d^2$ and $R_-^{-1}=(\Delta+b)/d^2$ gives the center acceleration

$$
\frac{a_1+a_2}{2}=\frac{2(N\cdot c)N-c}{d^2}.
$$

Resolve $c=c_\parallel N+c_\perp$ and put $g=\sqrt{1-|c_\perp|^2}$. The relative acceleration is

$$
a_1-a_2=-\frac{2}{d^2}\left(gN-\frac{c_\parallel}{g}c_\perp\right).
$$

Known reductions are: at $c=0$, the center acceleration is zero and relative acceleration is $-2N/d^2$; for parallel common velocity, the center acceleration is $c/d^2$ and relative acceleration remains $-2N/d^2$; for perpendicular common velocity, center acceleration is $-c/d^2$ and relative acceleration is $-2\sqrt{1-|c|^2}N/d^2$. These are exact instantaneous controls, not equilibria or stability states.

Subtracting uniform center motion is not a symmetry of this delayed equation with fixed wake speed: it changes the retarded rays, delays and transmitter denominators and changes the displayed accelerations, although a uniform coordinate subtraction has zero second derivative. The static and moving prescribed histories therefore cannot be interchanged as coupled solutions. Constant spatial translation and orthogonal rotation remain different operations and are not questioned by this control. A target implementation that returns the static relative row for perpendicular nonzero common velocity, zero center acceleration for any nonzero c, the wrong delay sign, or a self root on an affine subfield history would fail these exact controls. No new physical history or target was selected.
