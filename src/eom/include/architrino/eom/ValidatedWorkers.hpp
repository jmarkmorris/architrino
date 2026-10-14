// Deterministic execution of indexed tasks for the validated far step.
//
// validated_run_indexed runs task(i) for i in [0, count) and returns the
// lowest index whose task ended terminally, or count if none did. A task ends
// terminally by returning true or by throwing. A thrown exception is caught
// on the thread that ran the task and stored in errors[i]; it never crosses
// a thread. The caller decides what the terminal index means: it inspects
// errors[index] and its own per-index records. Because the lowest terminal
// index is returned whatever its kind, an exception at a higher index never
// displaces a refusal at a lower one.
//
// With worker_count 1 the tasks run in index order on the calling thread and
// stop at the first terminal one, exactly as a plain loop would. With more,
// up to worker_count - 1 helper threads share the indices with the calling
// thread and every task runs. Every helper that was started is joined before
// this function returns or throws. If a helper cannot be started, the work is
// completed by the calling thread and the helpers already running, and the
// result is the same.
//
// Each task must write only to state owned by its own index and may read
// shared state that no task writes. Under that rule the returned index, the
// stored errors and every per-index record are independent of worker_count
// and of scheduling, except that with worker_count 1 the tasks after the
// first terminal one are not run at all.
//
// before_launch, if set, is called on the calling thread before each helper
// is started, with that helper's ordinal. It exists so that a test can make
// a launch fail.
#pragma once

#include <algorithm>
#include <atomic>
#include <cstddef>
#include <exception>
#include <functional>
#include <thread>
#include <vector>

namespace architrino::eom {

inline std::size_t validated_run_indexed(
    std::size_t count,
    std::size_t worker_count,
    const std::function<bool(std::size_t)>& task,
    std::vector<std::exception_ptr>& errors,
    const std::function<void(std::size_t)>& before_launch = {}) {
  errors.assign(count, nullptr);
  std::vector<char> terminal(count, 0);
  const auto run = [&](std::size_t index) {
    try {
      terminal[index] = task(index) ? 1 : 0;
    } catch (...) {
      errors[index] = std::current_exception();
      terminal[index] = 1;
    }
  };
  if (worker_count <= 1U || count <= 1U) {
    for (std::size_t index = 0; index < count; ++index) {
      run(index);
      if (terminal[index] != 0) return index;
    }
    return count;
  }
  std::atomic<std::size_t> next{0U};
  const auto drain = [&] {
    for (;;) {
      const std::size_t index = next.fetch_add(1U);
      if (index >= count) return;
      run(index);
    }
  };
  std::vector<std::thread> helpers;
  // Joins whatever was started, on every way out of this function.
  struct Joiner {
    std::vector<std::thread>& threads;
    ~Joiner() {
      for (auto& thread : threads) {
        if (thread.joinable()) thread.join();
      }
    }
  } joiner{helpers};
  const std::size_t helper_count = std::min(worker_count, count) - 1U;
  helpers.reserve(helper_count);
  try {
    for (std::size_t ordinal = 0; ordinal < helper_count; ++ordinal) {
      if (before_launch) before_launch(ordinal);
      helpers.emplace_back(drain);
    }
  } catch (...) {
    // A helper could not be started. The calling thread and the helpers
    // already running complete the work below.
  }
  drain();
  for (auto& helper : helpers) helper.join();
  for (std::size_t index = 0; index < count; ++index) {
    if (terminal[index] != 0) return index;
  }
  return count;
}

}  // namespace architrino::eom
