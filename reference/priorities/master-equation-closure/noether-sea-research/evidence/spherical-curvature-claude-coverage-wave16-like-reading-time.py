# Wave 16: enclose the time at which the next image class (the like images +e2, +e3 at chord sqrt(2 + sqrt2 sin q)) is first read, from the closed but
# uncertified step-10 candidate set S of the final run: while the like images are unread the step model holds and q(t) lies in S, so the first reading
# time t_like (the first t with t = chord(q(t))) satisfies lo(chord(S)) <= t_like <= up(chord(S)), intersected with the step's time interval.
import sys, json
from mpmath import iv, mp
iv.dps = 30
d = json.load(open(sys.argv[1])); st = d["steps"][-1]; assert st["certified"] is False and st["step"] == 10
S = iv.mpf([st["S"][0], st["S"][1]]); t_int = iv.mpf([st["t_int"][0], st["t_int"][1]])
ch = iv.sqrt(2 + iv.sqrt(iv.mpf(2))*iv.sin(S))
lo_ = max(mp.mpf(ch.a), mp.mpf(t_int.a)); hi_ = min(mp.mpf(ch.b), mp.mpf(t_int.b))
print("step 10 S =", st["S"]); print("chord(S) of the like images =", [mp.nstr(ch.a, 20), mp.nstr(ch.b, 20)])
print("t_like in [", mp.nstr(lo_, 20), ",", mp.nstr(hi_, 20), "]  (non-empty:", lo_ <= hi_, ")")
s9 = d["steps"][8]; ev = s9["end_v_str"]; rv = s9["reduction_speed_at_end"]
print("step 9 excess of the enclosed speed over the fixed-image reduction: [", mp.nstr(mp.mpf(ev[0]) - mp.mpf(rv[1]), 12), ",", mp.nstr(mp.mpf(ev[1]) - mp.mpf(rv[0]), 12), "]")
