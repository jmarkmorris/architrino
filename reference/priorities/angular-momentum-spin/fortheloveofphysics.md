Here’s the transcript formatted without timestamps:

## Quantisation of Angular Momentum - Explained Visually

The old model of the atom, an electron revolving around a nucleus, had one obvious thing: angular momentum. This is a very important physical quantity because, for rotating systems, angular momentum is conserved in nature.

But now in modern physics, this electron revolving around a nucleus has been replaced by a stationary electron cloud model of the atom. This is because quantum mechanics can predict the probability density of where the electron is most likely to be found in the atom. In this model, the angular momentum quantity may not be very obvious, but it is still ever present, and more importantly, in atomic physics it is quantized.

So the question is: what is quantization of angular momentum? In the classical model of a particle revolving around a nucleus, there is no restriction on the magnitude or the direction of the angular momentum. Depending upon the speed, radial distance, or the plane of revolution, the angular momentum vector can take any direction or magnitude in classical physics.

But that is not true in quantum physics. When we talk about quantum systems, angular momentum can only take those values which are allowed by the theory of quantum mechanics. In fact, the magnitude and the direction of angular momentum can only take very specific values, which is known as the quantization of angular momentum.

## Angular Momentum Operator

In the quantum mechanical framework, this quantity is associated with four distinct operators that can give us meaningful information about the system. So $L_x$, for example, is the operator associated with the x component of the angular momentum vector. $L_y$ and $L_z$ are the operators corresponding to the y and z components of this angular momentum vector. When we combine these operators to create the magnitude, we end up getting the $L^2$ operator.

In theory, together these operators can give us all the information about the angular momentum vector. But the problem is that in quantum mechanics we have something called the uncertainty principle. You must have all heard of the position and linear momentum uncertainty principle: for a moving particle, you cannot measure the position and the linear velocity at any given point in time simultaneously with absolute accuracy.

Similar uncertainty relationships also exist for angular momentum, which say that you cannot measure the components of angular momentum, $L_x$, $L_y$, and $L_z$, simultaneously with absolute accuracy for a given system. In fact, there is a limit given by these uncertainty relations beyond which you cannot accurately measure them in a given system.

These kinds of uncertainty relations go back to commutator algebra of the quantum mechanical framework. Whenever two operators do not commute, they have a corresponding uncertainty relationship, and this is true for $L_x$, $L_y$, and $L_z$.

However, what is interesting is that this is not necessarily true for the $L^2$ operator. If we find the $L^2$ commutator with either $L_x$, $L_y$, or $L_z$ separately, then we find that they do commute. This means we can measure $L^2$ and $L_x$ together, or $L^2$ and $L_y$ together, or $L^2$ and $L_z$ together.

That means we have to make a choice, and by convention in the physics community we choose the $L^2$ and $L_z$ representation. Therefore, the theory of quantum mechanics can give us precise information about $L^2$, the magnitude of angular momentum, and $L_z$, the z component of angular momentum for a given system.

But this is information that we can obtain only from the wave function solution of the system. Coming to the wave function solution, it is a solution of the Schrodinger equation. When we try to solve for central potentials like the Coulomb interaction of an atom, and because of spherical symmetry, we write this wave function in terms of spherical coordinates $r$, $\theta$, and $\phi$.

When we do that, the wave function can be written in three distinct parts. The radial solution, as the name suggests, gives us that part of the wave function solution which varies with respect to the radial distance from the nucleus. The angular solution gives us that part of the wave function solution which varies as we go from north to south. The azimuthal solution gives us that part of the wave function solution as we go from west to east along the equator or along a latitude.

The various boundary conditions associated with these solutions lead to three distinct quantum numbers: $n$, $l$, and $m$. Now $n$ is related to the energy of the system, so we are not concerned with that in today’s video. $l$ and $m$, however, are very much responsible for the angular momentum of the system.

In fact, if we combine the angular solution and the azimuthal solution, we get what is called spherical harmonics, which are effectively the eigenstates of the angular momentum vector. So if we apply these operators, $L^2$ and $L_z$, onto the spherical harmonics, we get two very beautiful solutions. These equations are known as the eigenvalue equations for the angular momentum operator. These solutions, or the eigenvalues corresponding to $L^2$ and $L_z$, depend on the quantum numbers $l$ and $m$.

I’ll try to show you an intuitive way of how these quantum numbers are decided.

## Angular and Azimuthal Solutions

First, the azimuthal solutions are nothing but oscillatory solutions given by $e^{im\phi}$, $\phi$ being the angle from west to east if you go along a latitude.

Now we can look at the behavior of $\cos(m\phi)$, which is similar to that of $\sin(m\phi)$, although separated by a phase difference of $\pi/2$. So for $m = 2$, you end up getting this kind of oscillatory solution.

These kinds of solutions are easy to understand because we are very much used to oscillatory solutions along the x-axis. But what if I try to represent the same oscillation in a polar plot? That is a much better representation of the azimuthal nature of the solutions.

In this plot, the radial distance represents the functional value of the oscillation, and wherever the function goes to zero, the radius becomes zero. The plot looks something like this. I can do the same for other values of $m = 0, 1, 2, 3$, and we end up getting more and more oscillations, and as a result, more and more lobes in the polar plot.

This gives you a very beautiful visual idea of what $m$ really represents. It represents the oscillations of the wave function around the azimuthal direction. With greater and greater values of $m$, you end up getting more oscillations, which corresponds to a greater value of angular momentum, because with more oscillations the effective wavelength decreases. We know that wavelength and angular momentum, or momentum in general, have an inverse proportionality.

But you may ask: why integral values of $m$? This is because when we undergo one complete revolution, I want to come back to the same point with the same value of the function. If I try to do that for, let’s suppose, $m = 2.5$, then that does not happen. If you notice the polar plot, the wave does not close in on itself. These kinds of values are therefore not allowed.

The wave function must, at the end of the day, have the same value at the same location, even though you took one complete revolution and came back to the same point. So this boundary condition effectively restricts the value of the quantum number $m$ to only integral values. You can have $0, 1, 2, 3, 4$, and so on, or the negative values, because even the negative values are allowed. The positive and negative values of $m$ simply change the direction of the angular momentum vector.

Now if we come to the angular solutions, that part of the Schrodinger equation which is responsible for $\theta$, then we effectively get something called associated Legendre functions. The associated Legendre functions give us how the wave function varies as we go from the north to the south pole.

I know the mathematical expressions are quite complicated here, but notice a few essential details. The Legendre functions are mth-order derivatives of what is known as a Legendre polynomial. The Legendre polynomial is given by Rodrigues’ formula. Students who are familiar with mathematical physics may have seen these expressions before.

The way to solve this kind of differential equation corresponding to $\theta$ is to employ what is known as the power series method. But the power series method does not really give us finite solutions for all cases. It only gives us finite solutions when the power series terminates after a particular series number.

So the short answer is: to get a finite wave function solution, we must terminate the power series solution. That leads to very specific integral values of $l$. $l$ essentially represents the number of terms present in the power series solution. So $l$ is restricted to values like $0, 1, 2, 3$, and so on.

But if you also look at the connection between the associated Legendre function and Rodrigues’ formula, the Legendre polynomial is a polynomial of order $l$. If you take a derivative of a polynomial of order $l$, you cannot do the derivative more than $l$ number of times, because if you do that, you will end up getting zero. This means that $m$ is therefore restricted to all the values less than $l$.

For example, if $l = 0$, then $m$ can only have a zero value. But if $l = 1$, $m$ can have values of $-1$, $0$, or $+1$, and then you can take it forward for $l = 2$, $3$, and further.

Given these quantum numbers, I can write down the mathematical expressions for each of them, and I can represent them in a normal 2D plane graph. You can clearly see the oscillatory nature of these solutions. What is even interesting is that if I try to plot them in a polar plot with respect to $\theta$, then suddenly we have these beautiful diagrams, these lobe- and petal-like shapes.

In fact, if we combine the azimuthal solutions that you saw earlier and these associated Legendre polynomial plots, we effectively get an idea about the shape of the orbitals and why orbitals have those unique shapes of lobes and petals. But a detailed discussion on that is probably a topic for a next video. Today I want to focus on angular momentum.

## Angular Momentum Quantization

Coming back to those equations, we can now see how the various values of $l$ and $m$ quantum numbers influence what is going to be the angular momentum magnitude and the angular momentum direction.

For example, if we take $l = 0$, the s orbital, it is clear that the magnitude of angular momentum is zero and the z component of angular momentum is zero. That means the s orbital has no angular momentum at all. This is the easiest example to understand.

But if we go to $l = 1$, what happens then? Here the magnitude of angular momentum is $\sqrt{2}\hbar$. But the z component can have three distinct values: $-\hbar$, $0$, and $+\hbar$.

How do we represent them in a diagram? For example, it can only have a fixed length, so it can only be found on the surface of a sphere. Any value above that or any value below that is not allowed. So for a p orbital, the angular momentum vector will lie only on the surface of the sphere.

Now what if we include the z component? The z component is effectively the component of this $L$ vector onto the z-axis. All the angular momentum vectors that have a very specific z component lie along a conical surface, which intersects with the sphere and creates this circular shape.

This diagram visually demonstrates beautifully what the magnitudes and directions of the angular momentum vector are for the p orbital. As far as magnitude is concerned, only one value is possible: $\sqrt{2}\hbar$. No other value is allowed. But as far as the direction is concerned, the angular momentum vector can lie on any one of these conical or circular surfaces.

At this point, there are a few questions that may have come up in your mind. First of all, when we earlier talked about the convention of $L^2$ and $L_z$, I specifically mentioned that these are the only two quantities that we can precisely know. But from the diagram, you may say: wait, the choice of coordinate axis is ours, right? So why do we not choose the z-axis to be along the direction of the angular momentum vector?

If you notice, if I do make that choice, if I choose the z-axis to be in the direction of the angular momentum vector, then $L_y$ and $L_z$ will become precisely equal to zero. That is not allowed in quantum mechanics, and it goes back to the uncertainty principle.

Even here, as the angular momentum vector can take any orientation on the conical shape, if you look at its rotation at each point along the circle, it projects different values on the xy plane, which is perpendicular to the z-axis. Because it projects different values on the xy plane, the components of $L_x$ and $L_y$ are constantly changing. In fact, the average of $L_x$ and the average of $L_y$ comes out to be zero because they can take positive and negative values here.

So the theory can only tell us what $L_z$ and the magnitude of $L$ are. It cannot tell us what $L_x$ and $L_y$ are.

One more misconception that may arise here in this diagram is: is the angular momentum vector precessing around the z-axis? Even though I have shown the animation in this manner to create a visual representation, there is no precession involved.

If I look at all these three distinct cases separately, what these shapes actually mean is that the angular momentum vector can take any direction lying on the inverted cone, the circle, and the cone. So even specifying the angular momentum vector with an arrow is kind of misleading, because it can be anywhere in this particular shape. It is only the magnitude and the z component that we are pretty much sure of. The exact direction is still kind of smeared along the cone or along the circular surface.

We can do the same thing for the d orbital, for quantum number $l = 2$. If I do that, we will see that the magnitude here comes out to be $\sqrt{6}\hbar$, and the possible z components come out to be $+2\hbar$, $+\hbar$, $0$, $-\hbar$, and $-2\hbar$.

In a very similar manner, we can represent them in this beautiful diagram. The angular momentum vector has a magnitude which is $\sqrt{6}\hbar$, which is fixed by the radius of a sphere, and their z components lead to these kinds of conical and circular surfaces where the angular momentum vector is effectively smeared across those surfaces.

## Spin Angular Momentum

Until this point, we have only talked about the orbital angular momentum of an electron in the presence of a nucleus. However, the electron also has its own distinct spin angular momentum. This is an intrinsic property of angular momentum that an electron has, and as it turns out, the eigenvalue equations for the spin operator are also somewhat similar.

The only difference is that the quantum number $s$ can only take values of one half. So if we represent that visually, we get this kind of shape. The electron’s intrinsic angular momentum can only have $+\hbar/2$ in the positive z-axis or $-\hbar/2$ in the negative z-axis.

## Summary

This is something that is verified by what is known as the Stern-Gerlach experiment. In the Stern-Gerlach experiment, we pass a beam of electrons through a nonuniform magnetic field. When we do that, because the nonuniform magnetic field interacts slightly differently with the spin-up and spin-down electrons, the beam splits into two parts. This result is actual proof that the electron has an intrinsic spin.

We can perform a similar experiment for the orbital angular momentum case. For example, if we take the s orbital, $l = 0$, you will end up getting a scenario in which the beam does not split because the s orbital has no angular momentum in the first place. But for $l = 1$, there are three distinct orientations, so the beam will split into three spots. For $l = 2$, there are five distinct orientations, so the beam will split into five distinct spots.

This is something that I have only shown from a visual understanding perspective, because the Stern-Gerlach experiment is a little bit hard to perform for orbital angular momentum. Usually in atoms, the orbital angular momentum and the spin angular momentum couple together to create a sort of effective angular momentum of the system.

Nonetheless, both the spin angular momentum and the orbital angular momentum in an atom are quantized. They can only have very specific magnitudes and specific directions which are allowed by quantum mechanical theory. This is one of the ways in which a quantum system is so vastly different from our classical understanding of angular momentum.

I have made a lot of effort in creating these visualizations to give you a better understanding of the topic. If this is something that you are interested in, then please make a comment in the video, and I will try to create more such animated and visual perspectives for understanding various topics in physics.

I’m Dwijit Das. This is For the Love of Physics. Thank you so much. Take care. Bye-bye.