# Rendering erratum for the frozen seven-tenths subject

The frozen [dynamics seven-tenths subject](spherical-three-three-hexagon-extension-dynamics-seven.md), SHA-256 `a8f0a77ef477d8cb7e3db31c839c1b779f4a52f3653784673b2dab1c09ec2fa0`, remains unchanged. This erratum records a source-rendering defect separately from the mathematical adjudication.

Measured by `rg -n -b -o '\x0c.{0,100}'` on that exact file: source line 202 contains byte `0x0c` (form feed) at zero-based byte offset 11276, followed by `rac7{100}`. The intended final conditional-event display is:

$$
h=\frac{7/100}{13/16}=\frac{28}{325}>\frac7{100}.
$$

The replacement interpretation is a TeX backslash followed by `frac7{100}`. It does not modify the frozen bytes or extend the claim: this is a conditional lower bound for later motion retaining $u\ge1/4$ and $q<3/8$; the reached actual interval ends at $h=7/100$. The strict comparison is exact because $28\cdot100-7\cdot325=525>0$.

The coordinator reported the rendering failure after a controlled capture check. The local byte diagnostic above independently locates the reported character; it is not a new mathematical instrument or numerical evolution. Falsifiers are a different source identity/byte location or an incorrect interpretation of the displayed conditional bound. The [separate symmetry adjudication](spherical-three-three-hexagon-extension-dynamics-seven-adjudication.md) retains its own frozen identity and verdict. No prior subject, reference, instrument or shared synthesis is edited. Rendering/regeneration cost remains unprofiled.
