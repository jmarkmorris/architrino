"""Render the accepted g=16 comparison curves; this is not an EOM integrator.

Run `known` before `plot`. Frozen inputs are checked before target evaluation.
Outputs live in .local-data/master-equation-closure/motion-plots/.
"""
import hashlib
import json
import os
import sys
from fractions import Fraction
from pathlib import Path

import mpmath as mp

mp.mp.dps = 70
ROOT = Path(__file__).resolve().parents[4]
INPUT = ROOT / '.tmp/mec-008-signed-error'
OUT = ROOT / '.local-data/master-equation-closure/motion-plots'
OUT.mkdir(parents=True, exist_ok=True)
os.environ.setdefault('MPLCONFIGDIR', str(ROOT / '.tmp/mec-008-motion-plots/mpl'))
os.environ.setdefault('XDG_CACHE_HOME', str(ROOT / '.tmp/mec-008-motion-plots/cache'))
ALPHA = mp.sqrt(2) - mp.mpf(11)/8
BETA = ALPHA + 1
L = mp.mpf(1)/4
BT = mp.mpf(17)/64
BS = mp.mpf(9)/32
M = mp.mpf(3)/25
EXPECTED = {
    'source-polynomials.json': '3131fa6c02a4044b3fa6652803e5b9f3af5a011f4e84209e3989e17353491344',
    'target-polynomials.json': 'e0eb2392612fddba9c14dc0e2883d9f675a11309f1ae5245395cb002dcab04b6',
    'source-polynomials-after.json': '7dd5826f8ba6523e168d715a30f2bfa60ad1c0db9516076060691decbc3fd203',
    'target-polynomials-after.json': '74a20c3944dddd5522ea0ff66c961a2a0e323260664e3e38570a55c7f284c40e',
}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def rational(value):
    f = Fraction(value)
    return mp.mpf(f.numerator)/f.denominator


def decode(coefficients):
    return [rational(a) + rational(b)*mp.sqrt(2) for a, b in coefficients]


def evaluate(coefficients, value):
    result = mp.mpf(0)
    for coefficient in reversed(coefficients):
        result = result*value + coefficient
    return result


def derivative(coefficients):
    return [i*c for i, c in enumerate(coefficients)][1:] or [mp.mpf(0)]


def piece(before, after, u):
    return evaluate(before if u <= L else after, u)


def pulse(t):
    v = 8*(t + mp.mpf(5)/4)
    return v*(1-v*v)**4 / 65536 if abs(v) < 1 else mp.mpf(0)


def x_error(u):
    return mp.mpf('4e-13')*min(u, M) + mp.mpf('1e-11')*max(u-M, 0)


def velocity_error(u):
    return mp.mpf('4e-13') if u <= M else mp.mpf('1e-11')


def z_error(u):
    return mp.mpf('6e-13') if u <= M else mp.mpf('8e-12')


def known():
    c = decode([['1/2', '0'], ['0', '1/3'], ['2', '0']])
    assert mp.almosteq(evaluate(c, mp.mpf(2)), mp.mpf('8.5')+2*mp.sqrt(2)/3)
    assert mp.almosteq(evaluate(derivative(c), mp.mpf(2)), 8+mp.sqrt(2)/3)
    # Two polynomials with equal value and derivative at the known join.
    before = [mp.mpf(0), mp.mpf(0), mp.mpf(1)]
    after = [-L*L, 2*L]
    assert piece(before, after, L) == L*L
    assert piece(before, after, L+1) == L*L+2*L
    assert evaluate(derivative(before), L) == evaluate(derivative(after), L)
    assert mp.almosteq(pulse(-mp.mpf(31)/24), -mp.mpf(1)/314928)
    assert mp.almosteq(pulse(-mp.mpf(29)/24), mp.mpf(1)/314928)
    assert pulse(-mp.mpf(11)/8) == pulse(-mp.mpf(9)/8) == pulse(0) == 0
    assert x_error(0) == 0
    assert mp.almosteq(x_error(M), mp.mpf('4.8e-14'))
    assert mp.almosteq(x_error(BT), mp.mpf('1.50425e-12'))
    # Mirror and separation transformations do not subtract nearby unit positions.
    x = mp.mpf('1e-12')
    assert x-(-x) == 2*x
    receipt = {'result': 'PASS', 'script_sha256': digest(Path(__file__)),
               'controls': ['rational radical decoding', 'ascending Horner evaluation',
                            'polynomial derivative', 'piecewise join and variable convention',
                            'exact pulse extrema and endpoints', 'integrated error bounds',
                            'mirror displacement and twice-displacement separation']}
    (OUT/'known.json').write_text(json.dumps(receipt, indent=2)+'\n')
    print(json.dumps(receipt, indent=2))


def plot():
    known_record = json.loads((OUT/'known.json').read_text())
    assert known_record['result'] == 'PASS'
    for name, sha in EXPECTED.items():
        assert digest(INPUT/name) == sha, name
    tb = json.loads((INPUT/'target-polynomials.json').read_text())
    ta = json.loads((INPUT/'target-polynomials-after.json').read_text())
    sb = json.loads((INPUT/'source-polynomials.json').read_text())
    sa = json.loads((INPUT/'source-polynomials-after.json').read_text())
    xb, xa = decode(tb['quadratic'][0]), decode(ta['quadratic'][0])
    zb, za = decode(tb['linear'][2]), decode(ta['linear'][2])
    vb, va = decode(tb['velocity_second']), decode(ta['velocity_second'])
    for before, after in [(xb, xa), (zb, za), (vb, va)]:
        assert abs(evaluate(before, L)-evaluate(after, L)) < mp.mpf('1e-55')
    for u in [mp.mpf(0), M, L, BT]:
        assert abs(piece(derivative(xb), derivative(xa), u)-piece(vb, va, u)) < mp.mpf('1e-55')
    midpoint = piece(vb, va, M)
    assert mp.mpf('-3.811e-12') < midpoint < mp.mpf('-3.810e-12')
    # These are plotting/fidelity checks against already accepted values, not a new certificate.
    source_curves = {}
    for name in ['vertical_plus', 'vertical_minus', 'transverse_plus']:
        pairs = []
        for dimension in range(3):
            before = [decode(sb['families'][name]['g16'][order]['position'][dimension])
                      for order in ['linear', 'quadratic']]
            after = [decode(sa['families'][name]['g16'][order]['position'][dimension])
                     for order in ['linear', 'quadratic']]
            for b, a in zip(before, after):
                assert abs(evaluate(b, L)-evaluate(a, L)) < mp.mpf('1e-55')
            pairs.append((before, after))
        source_curves[name] = pairs

    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    import numpy as np
    from mpl_toolkits.axes_grid1.inset_locator import inset_axes

    purple, teal, orange, blue = '#7047b8', '#087f8c', '#c36b16', '#3768ab'
    ink, muted, grid = '#222738', '#626777', '#e6e7ed'
    plt.rcParams.update({'font.family': 'DejaVu Sans', 'font.size': 11,
                         'axes.titlesize': 14, 'axes.labelsize': 11,
                         'axes.spines.top': False, 'axes.spines.right': False,
                         'axes.edgecolor': '#adb0bc', 'axes.labelcolor': ink,
                         'text.color': ink, 'xtick.color': muted, 'ytick.color': muted,
                         'figure.facecolor': 'white', 'axes.facecolor': '#fcfbfe',
                         'savefig.facecolor': 'white', 'svg.fonttype': 'none'})

    def array(values):
        return np.array([float(v) for v in values])

    def style(ax):
        ax.grid(True, color=grid, linewidth=.7)
        ax.set_axisbelow(True)
        ax.axhline(0, color='#a3a6b2', linewidth=.8)

    def arrows(ax, xx, yy, indices, color):
        for i in indices:
            j = min(i+8, len(xx)-1)
            ax.annotate('', xy=(xx[j], yy[j]), xytext=(xx[i], yy[i]),
                        arrowprops={'arrowstyle': '-|>', 'color': color, 'lw': 1.5,
                                    'mutation_scale': 13})

    def save(fig, name):
        fig.savefig(OUT/f'{name}.png', dpi=150)
        fig.savefig(OUT/f'{name}.svg')
        plt.close(fig)

    us = sorted(set(mp.linspace(0, BT, 701)+[M, L, mp.mpf(125)/512, mp.mpf(131)/512]))
    ts = array([BETA+u for u in us])
    xs, zs = array([piece(xb, xa, u) for u in us]), array([piece(zb, za, u) for u in us])
    vel = array([2*piece(vb, va, u) for u in us])
    ex, ez = array([x_error(u) for u in us]), array([z_error(u) for u in us])
    ev = array([2*velocity_error(u) for u in us])
    end_lo, end_hi = float(BETA+mp.mpf(125)/512), float(BETA+mp.mpf(131)/512)
    mid_t = float(BETA+M)

    fig, axes = plt.subplots(2, 2, figsize=(15, 10.8))
    fig.subplots_adjust(left=.075, right=.97, top=.86, bottom=.15, wspace=.27, hspace=.50)
    fig.suptitle('The two targets: shared vertical motion and changing separation',
                 x=.075, y=.965, ha='left', fontsize=21, fontweight='bold')
    fig.text(.075, .915, 'g = 16   |   wake speed = 1   |   time t = T/ℓ: one unit is one lattice wake-crossing time',
             color=muted, fontsize=11)
    past = mp.linspace(-mp.mpf(7)/5, -mp.mpf(11)/10, 601)
    ax = axes[0, 0]
    ax.plot(array(past), array([pulse(t) for t in past])*1e6, color=purple, lw=2.6)
    ax.set(title='A  Supplied past: both follow this same motion',
           xlabel='Time before release, t', ylabel='Vertical displacement / ℓ  (×10⁻⁶)')
    ax.text(.02, .96, 'Down → up → back to rest\nSeparation stays exactly ℓ',
            transform=ax.transAxes, va='top', fontsize=10)
    ax.text(.02, -.26, 'At t = −1.125 both settle; at release t = 0 everyone is at rest.',
            transform=ax.transAxes, fontsize=9, color=muted)
    style(ax)
    ax = axes[0, 1]
    ax.plot(ts, zs*1e6, color=teal, lw=2.6)
    ax.fill_between(ts, (zs-ez)*1e6, (zs+ez)*1e6, color=teal, alpha=.2)
    ax.set(title='B  Common vertical displacement after return',
           xlabel='Time after release, t', ylabel='Vertical displacement / ℓ  (×10⁻⁶)')
    ax.text(.02, .96, 'Both targets remain still until t ≈ 1.0392.\nTheir vertical curves coincide by symmetry.',
            transform=ax.transAxes, va='top', fontsize=10)
    style(ax)
    ax = axes[1, 0]
    ax.plot(ts, 2*xs*1e12, color=purple, lw=2.3)
    ax.fill_between(ts, 2*(xs-ex)*1e12, 2*(xs+ex)*1e12, color=purple, alpha=.18)
    ax.axvspan(end_lo, end_hi, color=orange, alpha=.13)
    ax.set(title='C  Change in the distance between the targets',
           xlabel='Time after release, t', ylabel='(Separation − ℓ) / ℓ  (×10⁻¹²)')
    ax.text(.02, .96, 'Curve: polynomial comparison\nShading: certified position enclosure',
            transform=ax.transAxes, va='top', fontsize=10)
    style(ax)
    ax = axes[1, 1]
    ax.plot(ts, vel*1e12, color=teal, lw=2.3)
    # Separate fills preserve the certified step in the error bound at u=.12.
    early = np.array([u <= M for u in us])
    late = np.array([u >= M for u in us])
    ax.fill_between(ts[early], (vel[early]-8e-13)*1e12,
                    (vel[early]+8e-13)*1e12, color=teal, alpha=.2)
    ax.fill_between(ts[late], (vel[late]-2e-11)*1e12,
                    (vel[late]+2e-11)*1e12, color=teal, alpha=.2)
    ax.axvspan(end_lo, end_hi, color=orange, alpha=.13)
    ax.set(title='D  Separation speed: the brief approach is real',
           xlabel='Time after release, t', ylabel='Separation speed / wake speed  (×10⁻¹²)')
    style(ax)
    ax.text(.53, .16, 'Above zero: separating\nBelow zero: approaching',
            transform=ax.transAxes, fontsize=9)
    zoom = inset_axes(ax, width='46%', height='49%', loc='upper left', borderpad=1.1)
    select = np.array([mp.mpf('0.08') <= u <= M for u in us])
    zoom.plot(ts[select], vel[select]*1e12, color=teal, lw=1.6)
    zoom.fill_between(ts[select], (vel[select]-ev[select])*1e12,
                      (vel[select]+ev[select])*1e12, color=teal, alpha=.25)
    zoom.errorbar([mid_t], [float(2*midpoint)*1e12], yerr=[.8], fmt='o',
                  color=orange, ms=4, capsize=3)
    zoom.set_title('Approach close-up · same units', fontsize=10)
    zoom.tick_params(labelsize=8)
    style(zoom)
    for axis in [axes[0, 1], axes[1, 0], axes[1, 1]]:
        axis.axvline(float(BETA+L), color=muted, ls=':', lw=1)
    fig.text(.075, .043,
             'A is exact prescribed input. B–D show second-order pulse-amplitude comparisons with certified error enclosures.\n'
             'Orange strip: latest reception interval. Dotted line: comparison polynomial join. The imposed past is not an unforced preparation.',
             fontsize=10, color=muted)
    save(fig, 'target-motion')

    fig, axes = plt.subplots(1, 2, figsize=(15, 7.4), sharex=True, sharey=True)
    fig.subplots_adjust(left=.085, right=.96, top=.79, bottom=.17, wspace=.17)
    fig.suptitle('Magnified paths after the environmental response returns',
                 x=.085, y=.95, ha='left', fontsize=21, fontweight='bold')
    fig.text(.085, .885,
             'Each panel starts at its target’s own lattice site; the sites are ℓ apart. Time t ≈ 1.0392–1.3048.\n'
             'Horizontal axis units: 10⁻¹² ℓ. Vertical axis units: 10⁻⁶ ℓ. The horizontal units are one million times smaller.',
             fontsize=11, color=muted, va='top')
    for ax, sign, title, color in zip(axes, [-1, 1], ['Left target', 'Right target'], [purple, teal]):
        xx, zz = sign*xs*1e12, zs*1e6
        ax.fill_betweenx(zz, xx-ex*1e12, xx+ex*1e12, color=color, alpha=.2)
        ax.plot(xx, zz, lw=2.5, color=color)
        ax.scatter([0], [0], c=ink, s=35, zorder=5)
        arrows(ax, xx, zz, [200, 315, 480, 655], color)
        idx = us.index(M)
        ax.scatter([xx[idx]], [zz[idx]], color=orange, s=40, zorder=6)
        join_idx = us.index(L)
        ax.scatter([xx[join_idx]], [zz[join_idx]], color=muted, s=20, marker='s', zorder=6)
        ax.set(title=title, xlabel='Horizontal displacement / ℓ  (×10⁻¹²)')
        ax.axvline(0, color='#a3a6b2', linewidth=.8)
        style(ax)
    axes[0].set_ylabel('Vertical displacement / ℓ  (×10⁻⁶)')
    fig.text(.085, .065,
             'Arrows follow time along second-order pulse-amplitude comparisons. Orange point: certified approach; square: polynomial join.\n'
             'Shading encloses horizontal position. Vertical error < 8 × 10⁻¹² ℓ. Different axis scales distort angles. g = 16; wake speed = 1.',
             fontsize=10, color=muted)
    save(fig, 'target-paths')

    su = sorted(set(mp.linspace(0, BS, 701)+[L]))
    samples = {}
    for name, components in source_curves.items():
        samples[name] = np.array([[float(sum(piece(b, a, u) for b, a in zip(before, after)))
                                  for before, after in components] for u in su])
    fig = plt.figure(figsize=(15, 7.8))
    fig.subplots_adjust(left=.06, right=.97, top=.78, bottom=.18, wspace=.17)
    fig.suptitle('The four nearby sources that first feed back to the right target',
                 x=.06, y=.95, ha='left', fontsize=20, fontweight='bold')
    fig.text(.06, .89,
             'Their early response occurs at t ≈ 0.0392–0.3205; the target receives those histories later.\n'
             'This figure ends at the certified early-source horizon. It does not extend source paths to t ≈ 1.3.',
             fontsize=11, color=muted, va='top')
    ax = fig.add_subplot(121, projection='3d')
    positions = [(1, 0, 1), (1, 0, -1), (1, 1, 0), (1, -1, 0)]
    colors = [blue, orange, purple, purple]
    for p, color in zip(positions, colors):
        ax.scatter(*p, color=color, s=65, depthshade=False)
        ax.plot([0, p[0]], [0, p[1]], [0, p[2]], color=color, ls=':', alpha=.45)
        ax.plot([p[0], 1], [p[1], 0], [p[2], 0], color=color, ls='--', alpha=.6)
    ax.scatter(0, 0, 0, color=ink, s=85, depthshade=False)
    ax.scatter(1, 0, 0, color=teal, s=85, depthshade=False)
    ax.text(-.08, 0, .14, 'Left target', fontsize=10)
    ax.text(1.04, 0, .14, 'Right target', fontsize=10)
    ax.set(xlabel='x / ℓ', ylabel='y / ℓ', zlabel='z / ℓ', title='Starting geometry')
    ax.set_box_aspect((1.5, 2, 2))
    ax.view_init(elev=20, azim=-59)
    ax.set_xlim(-.3, 1.35)
    ax.set_ylim(-1.25, 1.25)
    ax.set_zlim(-1.25, 1.25)
    ax.tick_params(labelsize=8)
    ax = fig.add_subplot(122)
    labels = [('vertical_plus', 'Above right target', blue),
              ('vertical_minus', 'Below right target', orange),
              ('transverse_plus', 'Two side neighbors (same x–z projection)', purple)]
    for name, label, color in labels:
        a = samples[name]*1e6
        ax.plot(a[:, 0], a[:, 2], color=color, lw=2.5, label=label)
        arrows(ax, a[:, 0], a[:, 2], [140, 340, 570], color)
        j = su.index(L)
        ax.scatter([a[j, 0]], [a[j, 2]], color=color, s=20, marker='s', zorder=5)
    ax.scatter([0], [0], c=ink, s=30, zorder=5)
    ax.set(title='Early paths relative to each source’s own start',
           xlabel='Horizontal displacement / ℓ  (×10⁻⁶)',
           ylabel='Vertical displacement / ℓ  (×10⁻⁶)')
    ax.legend(fontsize=9, loc='upper right', frameon=False)
    style(ax)
    ax.set_aspect('equal', adjustable='datalim')
    fig.text(.06, .065,
             'Left: dotted leg = original pulse to neighbor; dashed leg = neighbor’s later response to right target.\n'
             'Right: second-order pulse-amplitude comparisons; starts overlaid; axes magnify equally. Squares: polynomial join.\n'
             'Source position error < 3 × 10⁻¹³ ℓ (smaller than a pixel here). g = 16; wake speed = 1.',
             fontsize=10, color=muted)
    save(fig, 'neighbor-paths')

    receipt = {'grade': 'rendering of accepted analytic comparisons, not a new trajectory certificate',
               'g': 16, 'c_f': 1, 'precision_decimal_digits': mp.mp.dps,
               'target_offset_domain': [0, str(BT)], 'source_offset_domain': [0, str(BS)],
               'source_absolute_domain': [str(ALPHA), str(ALPHA+BS)],
               'target_absolute_domain': [str(BETA), str(BETA+BT)],
               'midpoint_target_velocity': str(midpoint),
               'midpoint_separation_velocity': str(2*midpoint),
               'midpoint_separation_velocity_error': '8e-13',
               'target_endpoint_comparison_x': str(piece(xb, xa, BT)),
               'target_endpoint_comparison_z': str(piece(zb, za, BT)),
               'max_horizontal_position_error': str(x_error(BT)),
               'fidelity_checks': 'PASS input hashes; endpoint joins; derivative arrays; accepted midpoint value',
               'input_hashes': EXPECTED, 'script_sha256': digest(Path(__file__)),
               'output_hashes': {p.name: digest(p) for p in sorted(OUT.glob('*')) if p.suffix in ['.png', '.svg']}}
    (OUT/'receipt.json').write_text(json.dumps(receipt, indent=2)+'\n')
    print(json.dumps(receipt, indent=2))


if __name__ == '__main__':
    if sys.argv[1:] == ['known']:
        known()
    elif sys.argv[1:] == ['plot']:
        plot()
    else:
        raise SystemExit('usage: smooth-two-particle-motion-plots.py known|plot')
