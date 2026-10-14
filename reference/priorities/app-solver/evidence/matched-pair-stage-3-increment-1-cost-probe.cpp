// Cost probe for the serial validated evolution driver (Stage 3 increment 1,
// version 3). It measures wall time per accepted step for static populations
// of several sizes, and for the first and last steps of a longer run, using
// the library's public entry point only. c_f = 1.
//
// A timing is a measurement of this machine and this build, not a property of
// the method. A known case runs first: the two-path static run must complete,
// accept exactly the requested number of steps and end at the requested time,
// or the program exits with status 2 before any timing is reported.
//
// Populations: N static exact histories on [-20, 0], on the z axis at
// 0, 1, 2, ..., with charges alternating +1, -1, coupling 1/1000. All pairs
// are uniformly present: the largest separation, 15, is below the retained
// past of 20. Step 1/128, increment budgets 1e-8, no retries expected. A run
// that does not complete is reported with its refusal and is not timed as a
// result.
#include "architrino/eom/ValidatedEvolution.hpp"

#include <chrono>
#include <cstddef>
#include <iostream>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

eom::ValidatedFarStepPath static_path(const std::string& id,
                                      const std::string& charge,
                                      const std::string& z) {
  const eom::CubicCoefficientTokens tokens{
      {{"0", "0", "0", "0"}, {"0", "0", "0", "0"}, {z, "0", "0", "0"}}};
  return {id, charge,
          eom::RetainedHistory(
              id + "-history", {eom::CubicHistorySegment("-20", "0", tokens)})};
}

std::vector<eom::ValidatedFarStepPath> line(std::size_t count) {
  std::vector<eom::ValidatedFarStepPath> paths;
  for (std::size_t i = 0; i < count; ++i) {
    paths.push_back(static_path("p" + std::to_string(i),
                                i % 2U == 0U ? "1" : "-1",
                                std::to_string(i)));
  }
  return paths;
}

struct Timed {
  eom::ValidatedEvolutionCertificate run;
  double seconds = 0.0;
};

Timed timed(eom::ValidatedEvolutionRequest request) {
  const auto begin = std::chrono::steady_clock::now();
  Timed out;
  out.run = eom::evolve_validated_far_step_histories(request);
  out.seconds = std::chrono::duration<double>(
      std::chrono::steady_clock::now() - begin).count();
  return out;
}

eom::ValidatedEvolutionRequest request_for(
    std::vector<eom::ValidatedFarStepPath> paths, const std::string& start,
    const std::string& end) {
  eom::ValidatedEvolutionRequest request;
  request.run_id = "cost";
  request.policy = eom::kValidatedFarStepEvolutionPolicy;
  request.paths = std::move(paths);
  request.start_time = start;
  request.end_time = end;
  request.initial_step = "0.0078125";
  request.minimum_step = "0.0078125";
  request.coupling = "0.001";
  request.increment_budget = eom::ValidatedFarStepBudgets{1e-8, 1e-8};
  return request;
}

void report(const std::string& label, std::size_t paths, const Timed& t) {
  const std::size_t steps = t.run.run.accepted_step_count;
  const double per_step = steps > 0U ? t.seconds / steps : 0.0;
  const double ordered_pairs = static_cast<double>(paths * (paths - 1U));
  std::size_t iterations = 0;
  for (const auto& attempt : t.run.attempts) {
    iterations += attempt.producer.enclosure_iterations;
  }
  std::cout << "{\"case\":\"" << label << "\",\"paths\":" << paths
            << ",\"status\":\"" << t.run.run.status
            << "\",\"halt_refusal_code\":\"" << t.run.halt_refusal_code
            << "\",\"accepted_steps\":" << steps
            << ",\"rejected_steps\":" << t.run.run.rejected_step_count
            << ",\"accepted_end\":\"" << t.run.run.accepted_end_time
            << "\",\"enclosure_iterations\":" << iterations
            << ",\"seconds\":" << t.seconds
            << ",\"seconds_per_step\":" << per_step
            << ",\"seconds_per_step_per_ordered_pair\":"
            << (ordered_pairs > 0.0 ? per_step / ordered_pairs : 0.0)
            << "}\n";
}

}  // namespace

int main() {
  // Known case first: 16 steps of 1/128 on two paths end exactly at 1/8.
  {
    const Timed known = timed(request_for(line(2), "0", "0.125"));
    const bool ok = known.run.run.status == "completed" &&
        known.run.run.accepted_step_count == 16U &&
        known.run.run.rejected_step_count == 0U &&
        known.run.run.accepted_end_time == "0.125";
    std::cout << "{\"case\":\"known\",\"passed\":" << (ok ? "true" : "false")
              << "}\n";
    if (!ok) return 2;
  }
  // Size: 16 steps each.
  for (const std::size_t count : {2U, 3U, 4U, 8U, 16U}) {
    report("size-" + std::to_string(count), count,
           timed(request_for(line(count), "0", "0.125")));
  }
  // History length: two paths, 16 steps at the start, and 16 steps after
  // 240 and after 496 generated segments, resumed with the returned
  // continuation.
  {
    report("length-first-16", 2, timed(request_for(line(2), "0", "0.125")));
    Timed grown = timed(request_for(line(2), "0", "1.875"));
    report("length-0-to-240", 2, grown);
    eom::ValidatedEvolutionRequest tail = request_for(
        grown.run.paths, grown.run.run.accepted_end_time, "2");
    tail.evidence = grown.run.evidence;
    tail.continuation = grown.run.continuation;
    report("length-last-16-after-240", 2, timed(tail));
    Timed longer = timed(request_for(line(2), "0", "3.875"));
    report("length-0-to-496", 2, longer);
    eom::ValidatedEvolutionRequest tail2 = request_for(
        longer.run.paths, longer.run.run.accepted_end_time, "4");
    tail2.evidence = longer.run.evidence;
    tail2.continuation = longer.run.continuation;
    report("length-last-16-after-496", 2, timed(tail2));
  }
  return 0;
}
