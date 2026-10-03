"""Plot the declared attractive scalar curves, not evolved trajectories.

Run from the repository root using the shared venv. The normalized example
uses c_f = K = L_* = 1. The manuscript derives the plotted expressions.
"""

from pathlib import Path
import os

REPO = Path(__file__).resolve().parents[5]
os.environ.setdefault("MPLCONFIGDIR", str(REPO / ".tmp/lpr-explanation/matplotlib"))
os.environ.setdefault("XDG_CACHE_HOME", str(REPO / ".tmp/lpr-explanation/cache"))

import numpy as np
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt


def curves(z):
    z = np.asarray(z, dtype=float)
    if np.any(z <= 0):
        raise ValueError("The radial domain requires z > 0")
    return np.log(z), 1 - 1 / z, 1 / z, 1 / z**2


# Known controls precede the plotted grid. These check plotting definitions,
# not a numerical solution of either history-dependent equation.
assert curves(1.0) == (0.0, 0.0, 1.0, 1.0)
assert curves(0.5)[1:] == (-1.0, 2.0, 4.0)
try:
    curves(0.0)
except ValueError:
    pass
else:
    raise AssertionError("Zero radius must be rejected")
print("Known controls PASS before plotting: common zero and slope; half-radius values; zero-radius rejection.")

z = np.geomspace(0.1, 4, 600)
phi_log, phi_current, accel_log, accel_current = curves(z)
blue, orange = "#2463a0", "#bb5b22"
plt.rcParams.update({"font.size": 11, "axes.spines.top": False, "axes.spines.right": False})
fig, axes = plt.subplots(1, 2, figsize=(12, 4.8), layout="constrained")

axes[0].plot(z, phi_log, color=blue, lw=2.5, label=r"Logarithmic: $\ln z$")
axes[0].plot(z, phi_current, color=orange, lw=2.5, label=r"Canonical: $1-1/z$")
axes[0].set(title="Attractive potentials: common reference zero", ylabel=r"$\Phi/K$", xscale="log")
axes[0].axhline(0, color="#7c858e", lw=0.7)
axes[0].scatter([1], [0], s=35, color="#444b52", zorder=3)
axes[0].legend(loc="lower right", frameon=False)

axes[1].plot(z, accel_log, color=blue, lw=2.5, label=r"Logarithmic: $1/z$")
axes[1].plot(z, accel_current, color=orange, lw=2.5, label=r"Canonical: $1/z^2$")
axes[1].set(title="Static inward acceleration magnitude", ylabel=r"$A/(K/L_*)$", xscale="log", yscale="log")
axes[1].scatter([1], [1], s=35, color="#444b52", zorder=3)
axes[1].legend(loc="upper right", frameon=False)

for ax in axes:
    ax.axvline(1, color="#7c858e", ls="--", lw=0.9)
    ax.set(xlabel=r"Distance ratio $z=r/L_*$", xlim=(0.1, 4))
    ax.set_xticks([0.1, 0.5, 1, 2, 4], labels=["0.1", "0.5", "1", "2", "4"])
    ax.grid(alpha=0.16, which="major")

fig.suptitle("Logarithmic versus canonical radial response", fontsize=16, weight="bold")
fig.supxlabel("Matched acceleration at r = L*. The reference radius is not a wake-speed event.", fontsize=10)
output = Path(__file__).with_suffix(".png")
fig.savefig(output, dpi=170, facecolor="white")
plt.close(fig)
print(f"Saved {output}")
