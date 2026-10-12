"""Task 2: copy the live solver source and its two out-of-tree build inputs into a private snapshot,
with SHA-256 of every live file taken before and after the copy and of every copied file.
The snapshot is accepted only if all three digests agree for every file and the file list did not change."""
import hashlib, json, os, shutil, sys, time, subprocess
root = os.getcwd(); dest = sys.argv[1]
assert not os.path.exists(dest), "destination exists"
extra = ["reference/priorities/app-solver/contracts/master-eom-binding-v1.md",
         "reference/priorities/master-equation-closure/equation-variants/surface-constraint/definition.md"]
def listing():
    out = []
    for dp, dn, fn in os.walk("src/eom"):
        dn[:] = [d for d in dn if d not in ("build", ".git")]
        for f in fn: out.append(os.path.join(dp, f))
    return sorted(out) + extra
def sha(p):
    return hashlib.sha256(open(p, "rb").read()).hexdigest()
t0 = time.time(); files = listing(); before = {f: sha(f) for f in files}
for f in files:
    d = os.path.join(dest, f); os.makedirs(os.path.dirname(d), exist_ok=True); shutil.copyfile(f, d)
copied = {f: sha(os.path.join(dest, f)) for f in files}
files2 = listing(); after = {f: sha(f) for f in files2}
ok = files == files2 and before == copied == after
head = subprocess.run(["git", "--no-optional-locks", "rev-parse", "HEAD"], capture_output=True, text=True).stdout.strip()
status = subprocess.run(["git", "--no-optional-locks", "status", "--short", "--", "src/eom"] + extra, capture_output=True, text=True).stdout
man = dict(consistent=ok, head=head, started_utc=time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(t0)), seconds=round(time.time() - t0, 3),
           file_count=len(files), git_status_short=status.splitlines(),
           tree_sha256=hashlib.sha256("".join(f"{before[f]}  {f}\n" for f in files).encode()).hexdigest(),
           files=[dict(path=f, bytes=os.path.getsize(f), sha256=before[f]) for f in files])
json.dump(man, open(dest + ".manifest.json", "w"), indent=1)
print("consistent:", ok, " files:", len(files), " tree digest:", man["tree_sha256"], " seconds:", man["seconds"])
sys.exit(0 if ok else 1)
