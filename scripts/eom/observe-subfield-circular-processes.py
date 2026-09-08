"""Bounded process observation; no solver or scientific acceptance authority."""
import hashlib
import ctypes
import json
import os
import resource
import selectors
import signal
import stat
import subprocess
import sys
import time


def file_record(name):
    fd = os.open(name, os.O_RDONLY | os.O_NONBLOCK | os.O_NOFOLLOW)
    try:
        before = os.fstat(fd)
        if not stat.S_ISREG(before.st_mode) or before.st_size > 128 * 1024 * 1024:
            raise ValueError("bounded regular runtime file required")
        digest = hashlib.sha256()
        count = 0
        while True:
            block = os.read(fd, min(65536, before.st_size + 1 - count))
            if not block:
                break
            count += len(block)
            if count > before.st_size:
                raise ValueError("runtime file grew")
            digest.update(block)
        after = os.fstat(fd)
        if count != before.st_size or (before.st_size, before.st_mtime_ns, before.st_ctime_ns) != (after.st_size, after.st_mtime_ns, after.st_ctime_ns):
            raise ValueError("runtime file changed")
        return {"path": name, "sha256": digest.hexdigest(), "bytes": count}
    finally:
        os.close(fd)


def runtime_files():
    paths = {os.path.realpath(sys.executable)}
    config = os.path.join(sys.prefix, "pyvenv.cfg")
    if os.path.isfile(config):
        paths.add(os.path.realpath(config))
    for module in tuple(sys.modules.values()):
        value = getattr(module, "__file__", None)
        if value:
            paths.add(os.path.realpath(value))
    if sys.platform != "darwin":
        raise ValueError("reviewed macOS runtime inventory required")
    dyld = ctypes.CDLL(None)
    dyld._dyld_image_count.restype = ctypes.c_uint32
    dyld._dyld_get_image_name.argtypes = [ctypes.c_uint32]
    dyld._dyld_get_image_name.restype = ctypes.c_char_p
    count = dyld._dyld_image_count()
    if count > 1024:
        raise ValueError("loaded runtime image census exceeds bound")
    for index in range(count):
        image = dyld._dyld_get_image_name(index)
        if not image:
            raise ValueError("loaded runtime image name unavailable")
        name = image.decode("utf-8", "strict")
        if not name.startswith(("/System/", "/usr/lib/")):
            paths.add(os.path.realpath(name))
    return [file_record(name) for name in sorted(paths)]


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
        child = subprocess.Popen(["/bin/ps", "-axo", "pid=,ppid=,pgid=,lstart=,stat=,rss=,comm="],
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
        result = {"schema": "circular-process-observation.v1", "pid": os.getpid(),
                  "parentPid": os.getppid(), "processGroup": os.getpgrp(), "psPid": waited,
                  "psClosed": True, "psExitCode": child.returncode, "stopReason": stop_reason,
                  "elapsedSeconds": time.monotonic() - started, "psResourceUsage": usage(child_usage),
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
