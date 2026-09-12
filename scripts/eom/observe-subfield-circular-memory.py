"""Bounded memory-pressure observation; no solver or scientific acceptance authority."""
import json
import os
import resource
import selectors
import signal
import stat
import subprocess
import sys
import time


def runtime_files():
    paths = {os.path.realpath(sys.executable)}
    config = os.path.join(sys.prefix, "pyvenv.cfg")
    if os.path.isfile(config):
        paths.add(os.path.realpath(config))
    return [{"path": name} for name in sorted(paths)]


def usage(value):
    return {"userSeconds": value.ru_utime, "systemSeconds": value.ru_stime,
            "maximumResidentBytes": int(value.ru_maxrss * (1 if sys.platform == "darwin" else 1024))}


def main():
    plan = json.loads(sys.stdin.buffer.readline(65537))
    duration = plan["durationMs"] / 1000
    maximum = plan["maximumBytes"]
    if not 0 < duration <= 2 or not 0 < maximum <= 8 * 1024 * 1024:
        raise ValueError("bounded probe limits required")
    started = time.monotonic()
    stop_reason = None
    child = None

    def stop(signum, frame):
        nonlocal stop_reason
        stop_reason = stop_reason or ("deadline" if signum == signal.SIGALRM else "interrupted")
        if child is None or child.returncode is not None:
            os._exit(124)
        # This is an unwaited direct child; no historical PID lookup is used.
        if child is not None and child.returncode is None:
            try:
                os.kill(child.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass

    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)
    signal.signal(signal.SIGALRM, stop)
    signal.setitimer(signal.ITIMER_REAL, duration)
    if plan.get("mode") == "inventory":
        print(json.dumps({"schema": "circular-observer-runtime.v1", "pid": os.getpid(), "parentPid": os.getppid(),
                          "runtime": runtime_files(), "platform": sys.platform, "python": sys.version,
                          "helperResourceUsageBeforeSerialization": usage(resource.getrusage(resource.RUSAGE_SELF))}), flush=True)
        signal.setitimer(signal.ITIMER_REAL, 0)
        return
    selector = selectors.DefaultSelector()
    buffers = {"stdout": bytearray(), "stderr": bytearray()}
    dropped = {"stdout": 0, "stderr": 0}
    try:
        child = subprocess.Popen(["/usr/bin/memory_pressure"],
                                 stdin=subprocess.DEVNULL, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                 env={**os.environ, "LC_ALL": "C"}, close_fds=True)
        if stop_reason:
            stop(signal.SIGTERM, None)
        for which, stream in (("stdout", child.stdout), ("stderr", child.stderr)):
            os.set_blocking(stream.fileno(), False)
            selector.register(stream, selectors.EVENT_READ, which)
        while selector.get_map():
            for key, _ in selector.select(0.05):
                data = os.read(key.fd, 65536)
                if not data:
                    selector.unregister(key.fileobj)
                    key.fileobj.close()
                    continue
                room = max(0, maximum - len(buffers[key.data]))
                buffers[key.data].extend(data[:room])
                dropped[key.data] += max(0, len(data) - room)
                if dropped[key.data]:
                    stop(signal.SIGTERM, None)
        while True:
            blocked = signal.pthread_sigmask(signal.SIG_BLOCK, {signal.SIGALRM, signal.SIGTERM, signal.SIGINT})
            try:
                waited, status, child_usage = os.wait4(child.pid, os.WNOHANG)
                if waited:
                    child.returncode = os.waitstatus_to_exitcode(status)
            finally:
                signal.pthread_sigmask(signal.SIG_SETMASK, blocked)
            if waited:
                break
            time.sleep(0.01)
        result = {"schema": "circular-memory-observation.v1", "pid": os.getpid(),
                  "parentPid": os.getppid(), "processGroup": os.getpgrp(), "queryPid": waited,
                  "queryClosed": True, "queryExitCode": child.returncode, "stopReason": stop_reason,
                  "elapsedSeconds": time.monotonic() - started, "queryResourceUsage": usage(child_usage),
                  "stdout": bytes(buffers["stdout"]).decode("utf-8", "strict"),
                  "stderr": bytes(buffers["stderr"]).decode("utf-8", "strict"), "droppedBytes": dropped,
                  "runtime": runtime_files()}
        result["helperResourceUsageBeforeSerialization"] = usage(resource.getrusage(resource.RUSAGE_SELF))
        print(json.dumps(result), flush=True)
        signal.setitimer(signal.ITIMER_REAL, 0)
        if stop_reason or child.returncode or any(dropped.values()):
            sys.exit(1)
    finally:
        signal.setitimer(signal.ITIMER_REAL, 0)
        selector.close()
        if child is not None and child.returncode is None:
            stop(signal.SIGTERM, None)
            os.wait4(child.pid, 0)
            child.returncode = -signal.SIGKILL


if __name__ == "__main__":
    main()
