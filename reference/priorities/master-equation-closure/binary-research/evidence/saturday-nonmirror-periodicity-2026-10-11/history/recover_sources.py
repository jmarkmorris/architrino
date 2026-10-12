"""Recover the two earlier versions of window_bounds_check.py from the session
transcript and check the patch chain against the final instrument's SHA-256.
Known control first: SHA-256 of b'abc'."""
import hashlib, json, sys
sha = lambda b: hashlib.sha256(b).hexdigest()
assert sha(b"abc") == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
print("known case passed (sha256 abc)")
T = "/Users/markmorris/.claude/projects/-Users-markmorris-vibe-architrino/7c455498-a954-444c-9ffa-a2ea702de1a9.jsonl"
MARK = "cat > $E/window_bounds_check.py <<'EOF'\n"
cmds = []
for line in open(T):
    try: o = json.loads(line)
    except Exception: continue
    msg = o.get("message") or {}
    c = msg.get("content")
    if not isinstance(c, list): continue
    for part in c:
        if isinstance(part, dict) and part.get("type") == "tool_use" and part.get("name") == "Bash":
            cmd = part.get("input", {}).get("command", "")
            if MARK in cmd: cmds.append(cmd)
print("transcript commands containing the heredoc:", len(cmds))
assert len(cmds) == 1
body = cmds[0].split(MARK, 1)[1]
a1 = body.split("\nEOF\n", 1)[0] + "\n"
s = a1
def rep(a, b):
    global s
    assert s.count(a) == 1, a[:50]
    s = s.replace(a, b)
# patch 1 (attempt 1 -> attempt 2), as executed at 19:39Z
rep("import cmath, json, math, random, sys\nfrom scipy.optimize import brentq\n", "import cmath, json, math, random, sys\n")
rep("""    return brentq(g, lo, t, xtol=1e-15, rtol=4e-16, maxiter=400)
""", """    hi = t                      # g(lo) > 0 > g(hi); g strictly decreasing: plain bisection
    assert g(lo) > 0.0 > g(hi)
    for _ in range(200):
        mid = 0.5 * (lo + hi)
        if mid == lo or mid == hi: break
        if g(mid) > 0.0: lo = mid
        else: hi = mid
    return 0.5 * (lo + hi)
""")
rep("Usage: python window_bounds_check.py [out.json]", "Standard library only (pure-Python bisection for the causal root).\nUsage: python window_bounds_check.py [out.json]")
a2 = s
# patch 2 (attempt 2 -> final)
rep('''def curved(wcap):
    """two paths with analytic speed bounds below wcap, separated."""
    def one(c):
        u = cmath.rect(rng.uniform(0, 0.5 * wcap), rng.uniform(0, 6.28))
''', '''def curved(wcap, counter=False):
    """two paths with analytic speed bounds below wcap, separated.
    counter=True: opposite transverse drifts at wide separation, so that the
    explicit lower bound of Theorem P is positive on part of the sample."""
    ang = rng.uniform(0, 6.28)
    def one(c, sign=0):
        u = cmath.rect(rng.uniform(0, 0.5 * wcap), rng.uniform(0, 6.28))
        if sign: u = sign * cmath.rect(0.45 * wcap, ang + 0.5 * math.pi)
''')
rep('''    return one(cmath.rect(rng.uniform(1.0, 40.0), rng.uniform(0, 6.28))), one(0j)
''', '''    if counter:
        return one(cmath.rect(rng.uniform(1.0, 300.0), ang), 1), one(0j, -1)
    return one(cmath.rect(rng.uniform(1.0, 40.0), ang)), one(0j)
''')
rep("min_sinbeta=1e9, min_explicit=1e9, min_gamma=1e9, J_pos=0, J_neg=0, explicit_bound_positive=0)",
    "min_sinbeta=1e9, min_explicit=1e9, min_gamma=1e9, min_Hb_pointwise=1e9, Hb_samples=0,\n          J_pos=0, J_neg=0, explicit_bound_positive=0)")
rep('''for case in range(1500):
    wcap = rng.choice([0.05, 0.1, 0.125, 0.2, 0.3, 0.6, 0.9])
    p1, p2 = curved(wcap)
    w = max(p1.wmax, p2.wmax)
    t = rng.uniform(-50, 50)
''', '''for case in range(2400):
    counter = case >= 1500
    wcap = rng.choice([0.05, 0.1, 0.125, 0.14] if counter else [0.05, 0.1, 0.125, 0.2, 0.3, 0.6, 0.9])
    p1, p2 = curved(wcap, counter)
    w = max(p1.wmax, p2.wmax)
    t = rng.uniform(-5, 5) if counter else rng.uniform(-50, 50)
''')
rep('''    t2["samples"] += 1
''', '''    if w <= 0.1476:   # pointwise form of (H-b): |theta'| tau_j Bbar < 2 A_i
        thd = abs(J) / (R * R)
        A1, A2 = q["rho1"] * dot(q["n1"], q["rh"]), -q["rho2"] * dot(q["n2"], q["rh"])
        t2["min_Hb_pointwise"] = min(t2["min_Hb_pointwise"], (2 * A1 - thd * q["tau2"] * Bbar) * R * R,
                                     (2 * A2 - thd * q["tau1"] * Bbar) * R * R)
        t2["Hb_samples"] += 1
    t2["samples"] += 1
''')
rep('"min_explicit", "min_gamma"):', '"min_explicit", "min_gamma", "min_Hb_pointwise"):')
final = open(sys.argv[1], "rb").read()
print("attempt1 sha", sha(a1.encode()), len(a1.encode()))
print("attempt2 sha", sha(a2.encode()), len(a2.encode()))
print("chain    sha", sha(s.encode()), len(s.encode()))
print("final    sha", sha(final), len(final))
assert s.encode() == final, "patch chain does not reproduce the final instrument"
open(sys.argv[2] + "/window_bounds_check.attempt1.py", "w").write(a1)
open(sys.argv[2] + "/window_bounds_check.attempt2.py", "w").write(a2)
print("RECOVERY CHAIN MATCHES FINAL INSTRUMENT")
