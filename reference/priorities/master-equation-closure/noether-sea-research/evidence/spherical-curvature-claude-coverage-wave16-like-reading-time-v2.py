# Wave 16 (v2; v1 preserved): enclose the time at which the next image class (the like images +e2, +e3 at chord sqrt(2 + sqrt2 sin q)) is first read,
# from the first closed-but-uncertified step k of a run. While the like images are unread the step model holds and q(t) lies in the closed set S_k, so
# the first reading time t_like (the first t with t = chord(q(t))) satisfies t_like >= max(lo(chord(S_k)), t_start_k) (and t_like > t_end_{k-1}, the
# certified end). The upper bound t_like <= up(chord(S_k)) holds only when up(chord(S_k)) <= t_end_k (otherwise the images could still be unread at the
# step end, and only the lower bound is established); the script states which case applies.
import sys, json
from mpmath import iv, mp
iv.dps = 30
d = json.load(open(sys.argv[1])); st = d["steps"][-1]; assert st["certified"] is False
S = iv.mpf([st["S"][0], st["S"][1]]); t_int = iv.mpf([st["t_int"][0], st["t_int"][1]])
ch = iv.sqrt(2 + iv.sqrt(iv.mpf(2))*iv.sin(S)); cha = mp.mpf(ch.a); chb = mp.mpf(ch.b)
lo_ = max(cha, mp.mpf(t_int.a)); ub_ok = chb <= mp.mpf(t_int.b)
print("first uncertified step:", st["step"], "t_int =", st["t_int"]); print("S_k =", st["S"]); print("chord(S_k) of the like images = [", mp.nstr(cha, 20), ",", mp.nstr(chb, 20), "]")
print("t_like lower bound:", mp.nstr(lo_, 20)); print("t_like upper bound:", (mp.nstr(chb, 20) if ub_ok else "not established by this step (up(chord(S_k)) exceeds the step end)"))
cert = [s for s in d["steps"] if s.get("certified")]; s_last = cert[-1]; ev = s_last["end_v_str"]; rv = s_last["reduction_speed_at_end"]
print("last certified step:", s_last["step"], "t_end =", s_last["t_int"][1]); print("excess of the enclosed speed over the fixed-image reduction there: [", mp.nstr(mp.mpf(ev[0]) - mp.mpf(rv[1]), 12), ",", mp.nstr(mp.mpf(ev[1]) - mp.mpf(rv[0]), 12), "]")
