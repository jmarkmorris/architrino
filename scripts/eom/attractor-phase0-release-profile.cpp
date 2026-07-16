// EOM Attractor Search — Phase 0 workload characterization driver.
//
// Releases a neutral N-architrino population (declared deterministic
// low-discrepancy seed family, factory-certified uniform-circular
// prehistories, all tangential speeds strictly off the v = c_f pin) into
// the coupled delayed-history engine for a fixed short horizon, and dumps
// the engine's own per-phase timing ledger (NativeEvolutionTiming plus
// per-step snapshot timings and traversal pair-route counts) as JSON.
//
// This driver is a cost instrument only. It makes no physics claim; the
// timing authority is the engine's internal steady-clock ledger, and the
// pair-route counts are the engine's own traversal certificates. It never
// modifies engine behavior.
//
// Build (Linux profiling sandbox example):
//   c++ -std=c++20 -O3 -DNDEBUG -Isrc/eom/include \
//     scripts/eom/attractor-phase0-release-profile.cpp \
//     <build>/libeom_native.a -lmpfr -lgmp -pthread \
//     -o attractor-phase0-release-profile

#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/History.hpp"

#include <array>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

constexpr double kPi = 3.141592653589793238462643383279502884;
constexpr const char* kCharge = "0.1666666666666666666666666666666667";
constexpr const char* kNegativeCharge =
    "-0.1666666666666666666666666666666667";
// Declared workload coupling: 36 * kappa_eq. A profiling choice, not a bind fit.
constexpr double kNativeCoupling = 36.0 * 0.2862286103053385;

std::string token(double value) {
  std::ostringstream stream;
  stream << std::setprecision(17) << value;
  return stream.str();
}

double option_double(
    int argc, char** argv, const std::string& name, double fallback) {
  const std::string prefix = "--" + name + "=";
  for (int index = 1; index < argc; ++index) {
    const std::string argument = argv[index];
    if (argument.rfind(prefix, 0) == 0) {
      return std::stod(argument.substr(prefix.size()));
    }
  }
  return fallback;
}

std::string option_string(
    int argc, char** argv, const std::string& name,
    const std::string& fallback) {
  const std::string prefix = "--" + name + "=";
  for (int index = 1; index < argc; ++index) {
    const std::string argument = argv[index];
    if (argument.rfind(prefix, 0) == 0) {
      return argument.substr(prefix.size());
    }
  }
  return fallback;
}

// Deterministic low-discrepancy fraction: frac(0.5 + k * alpha).
double lds(std::size_t k, double alpha) {
  const double value = 0.5 + static_cast<double>(k) * alpha;
  return value - std::floor(value);
}

struct SeedRow {
  std::string path_id;
  const char* charge;
  double radius;
  double height;
  double phase;
  double speed;
  int sense;
};

// phase0-shell-v1 declared seed family. Neutral alternating polarity;
// per-architrino circle about the z axis; tangential speeds in
// [0.35, 0.65] c_f — strictly off the v = c_f pin.
std::vector<SeedRow> seed_rows(std::size_t population) {
  constexpr double kAlphaRadius = 0.6180339887498949;   // frac(phi)
  constexpr double kAlphaHeight = 0.41421356237309515;  // sqrt(2) - 1
  constexpr double kAlphaPhase = 0.7320508075688772;    // sqrt(3) - 1
  constexpr double kAlphaSpeed = 0.23606797749978967;   // sqrt(5) - 2
  constexpr double kAlphaSense = 0.6457513110645906;    // sqrt(7) - 2
  std::vector<SeedRow> rows;
  rows.reserve(population);
  for (std::size_t index = 0; index < population; ++index) {
    SeedRow row;
    row.path_id = "a" + std::to_string(index);
    row.charge = (index % 2 == 0) ? kCharge : kNegativeCharge;
    row.radius = 1.5 + 2.0 * lds(index, kAlphaRadius);
    row.height = -1.2 + 2.4 * lds(index, kAlphaHeight);
    row.phase = 2.0 * kPi * lds(index, kAlphaPhase);
    row.speed = 0.35 + 0.30 * lds(index, kAlphaSpeed);
    row.sense = lds(index, kAlphaSense) < 0.5 ? 1 : -1;
    rows.push_back(row);
  }
  return rows;
}

eom::RetainedHistory seed_history(
    const SeedRow& row, double depth, double segment_step) {
  const double angular_speed =
      static_cast<double>(row.sense) * row.speed / row.radius;
  return eom::RetainedHistory::uniform_circular(
      row.path_id + "-prehistory",
      {
          .t_start = token(-depth),
          .t_end = "0",
          .maximum_segment_step = token(segment_step),
          .cylindrical_radius = token(row.radius),
          .height = token(row.height),
          .angular_speed = token(angular_speed),
          .tangential_speed = token(row.speed),
          .phase = token(row.phase),
          .tilt_x = "0",
          .tilt_y = "0",
      });
}

void write_json_string(std::ostream& output, const std::string& value) {
  output << '"';
  for (const char character : value) {
    switch (character) {
      case '"': output << "\\\""; break;
      case '\\': output << "\\\\"; break;
      case '\n': output << "\\n"; break;
      case '\r': output << "\\r"; break;
      case '\t': output << "\\t"; break;
      default: output << character; break;
    }
  }
  output << '"';
}

void write_snapshot_timing_json(
    std::ostream& output, const eom::NativeSnapshotTiming& timing,
    std::uint64_t excluded_pairs, std::uint64_t exact_pairs,
    const std::string& reception_time) {
  output << "{\"reception_time\":";
  write_json_string(output, reception_time);
  output << ",\"traversal_excluded_pairs\":" << excluded_pairs
         << ",\"traversal_exact_pairs\":" << exact_pairs
         << ",\"history_window_wall_seconds\":"
         << timing.history_window_wall_seconds
         << ",\"traversal_wall_seconds\":" << timing.traversal_wall_seconds
         << ",\"exact_root_batch_wall_seconds\":"
         << timing.exact_root_batch_wall_seconds
         << ",\"root_binary64_cpu_seconds\":"
         << timing.root_binary64_cpu_seconds
         << ",\"root_pair_count\":" << timing.root_pair_count
         << ",\"root_mpfr_cpu_seconds\":" << timing.root_mpfr_cpu_seconds
         << ",\"root_mpfr_pair_count\":" << timing.root_mpfr_pair_count
         << ",\"acceleration_wall_seconds\":"
         << timing.acceleration_wall_seconds
         << ",\"total_wall_seconds\":" << timing.total_wall_seconds << '}';
}

void write_evolution_timing_json(
    std::ostream& output, const eom::NativeEvolutionTiming& timing) {
  output << "{\"snapshot_total_wall_seconds\":"
         << timing.snapshot_total_wall_seconds
         << ",\"snapshot_count\":" << timing.snapshot_count
         << ",\"history_window_wall_seconds\":"
         << timing.history_window_wall_seconds
         << ",\"traversal_wall_seconds\":" << timing.traversal_wall_seconds
         << ",\"exact_root_batch_wall_seconds\":"
         << timing.exact_root_batch_wall_seconds
         << ",\"root_binary64_cpu_seconds\":"
         << timing.root_binary64_cpu_seconds
         << ",\"root_pair_count\":" << timing.root_pair_count
         << ",\"root_reevaluated_cells\":" << timing.root_reevaluated_cells
         << ",\"root_warm_excluded_cells\":"
         << timing.root_warm_excluded_cells
         << ",\"root_mpfr_cpu_seconds\":" << timing.root_mpfr_cpu_seconds
         << ",\"root_mpfr_pair_count\":" << timing.root_mpfr_pair_count
         << ",\"root_mpfr_attempt_count\":" << timing.root_mpfr_attempt_count
         << ",\"root_mpfr_escalation_cpu_seconds\":"
         << timing.root_mpfr_escalation_cpu_seconds
         << ",\"acceleration_wall_seconds\":"
         << timing.acceleration_wall_seconds
         << ",\"finite_width_execution_union_wall_seconds\":"
         << timing.finite_width_execution_union_wall_seconds
         << ",\"sharp_execution_union_wall_seconds\":"
         << timing.sharp_execution_union_wall_seconds
         << ",\"acceleration_worker_idle_orchestration_wall_seconds\":"
         << timing.acceleration_worker_idle_orchestration_wall_seconds
         << ",\"acceleration_precision_escalation_worker_seconds\":"
         << timing.acceleration_precision_escalation_worker_seconds
         << ",\"history_copy_hash_wall_seconds\":"
         << timing.history_copy_hash_wall_seconds
         << ",\"correction_wall_seconds\":" << timing.correction_wall_seconds
         << ",\"reused_start_snapshot_count\":"
         << timing.reused_start_snapshot_count
         << ",\"recertification_wall_seconds\":"
         << timing.recertification_wall_seconds
         << ",\"rejection_wall_seconds\":" << timing.rejection_wall_seconds
         << ",\"total_wall_seconds\":" << timing.total_wall_seconds << '}';
}

}  // namespace

int main(int argc, char** argv) {
  try {
    const std::size_t population = static_cast<std::size_t>(
        option_double(argc, argv, "population", 6.0));
    const double end_time = option_double(argc, argv, "end-time", 0.2);
    const double step = option_double(argc, argv, "step", 0.01);
    const double minimum_step =
        option_double(argc, argv, "minimum-step", step / 4.0);
    const double history_depth =
        option_double(argc, argv, "history-depth", 8.0);
    const double history_segment_step =
        option_double(argc, argv, "history-segment-step", 0.02);
    const std::size_t thread_count = static_cast<std::size_t>(
        option_double(argc, argv, "threads", 4.0));
    const std::string output_path = option_string(
        argc, argv, "output", "attractor-phase0-profile.json");
    const std::string root_tolerance =
        option_string(argc, argv, "root-tolerance", "1e-5");

    if (population % 2 != 0) {
      throw std::invalid_argument("population must be even (neutral mix)");
    }

    const auto rows = seed_rows(population);
    std::vector<eom::NativeCoupledPathInput> paths;
    paths.reserve(population);
    double maximum_seed_speed = 0.0;
    for (const auto& row : rows) {
      maximum_seed_speed = std::max(maximum_seed_speed, row.speed);
      paths.push_back({
          row.path_id,
          row.charge,
          seed_history(row, history_depth, history_segment_step)});
    }
    std::cerr << "seed family=phase0-shell-v1 population=" << population
              << " maximum_seed_speed=" << maximum_seed_speed
              << " off_pin=" << (maximum_seed_speed < 1.0) << '\n';

    eom::NativeCoupledEvolutionRequest request{};
    request.run_id =
        "attractor-phase0-n" + std::to_string(population);
    request.paths = paths;
    request.start_time = "0";
    request.end_time = token(end_time);
    request.initial_step = token(step);
    request.minimum_step = token(minimum_step);
    request.maximum_step = token(step);
    request.field_speed = "1";
    request.coupling = token(kNativeCoupling);
    request.root_tolerance = root_tolerance;
    request.source_normal_floor = "1e-24";
    request.acceleration_tolerance = token(5e-3);
    request.chart_policy = "sharp";
    request.causal_width = "0.05";
    request.core_scale = "0.05";
    request.quadrature_tolerance = token(5e-3);
    request.event_impulse_tolerance = "1e-6";
    request.regulator_convergence_tolerance = "1e-3";
    request.position_tolerance = token(2e-6);
    request.velocity_tolerance = token(2e-6);
    request.correction_tolerance = "2e-7";
    request.root_max_depth = 192;
    request.root_max_cells = 500000;
    request.quadrature_max_depth = 32;
    request.quadrature_max_cells = 300000;
    request.event_max_depth = 24;
    request.event_max_cells = 300000;
    request.initial_mpfr_bits = 128;
    request.maximum_mpfr_bits = 512;
    request.max_correction_iterations = 12;
    request.max_step_attempts = 200000;
    request.max_rejected_steps = 1000;
    request.thread_count = thread_count;
    request.use_analytic_pinned_fold = false;
    request.use_pinned_fold_aware_temporal_step = false;

    const auto wall_start = std::chrono::steady_clock::now();
    request.accepted_step_callback =
        [&wall_start, population](
            std::size_t step_index, const std::string& accepted_time) {
          const double wall_seconds =
              std::chrono::duration<double>(
                  std::chrono::steady_clock::now() - wall_start).count();
          std::cerr << "heartbeat population=" << population
                    << " step=" << step_index
                    << " accepted_time=" << accepted_time
                    << " wall_seconds=" << wall_seconds << std::endl;
        };

    const auto run = eom::evolve_native_coupled_histories(request);
    const double driver_wall_seconds =
        std::chrono::duration<double>(
            std::chrono::steady_clock::now() - wall_start).count();

    std::ofstream output(output_path);
    if (!output) {
      throw std::runtime_error("cannot open output: " + output_path);
    }
    output << std::setprecision(17)
           << "{\"schema\":\"eom_attractor_phase0_release_profile/v0\""
           << ",\"seed_family\":\"phase0-shell-v1\""
           << ",\"population\":" << population
           << ",\"thread_count\":" << thread_count
           << ",\"requested_interval\":[0," << end_time << ']'
           << ",\"step\":" << step
           << ",\"minimum_step\":" << minimum_step
           << ",\"history_depth\":" << history_depth
           << ",\"history_segment_step\":" << history_segment_step
           << ",\"root_tolerance\":";
    write_json_string(output, root_tolerance);
    output << ",\"coupling\":";
    write_json_string(output, token(kNativeCoupling));
    output << ",\"status\":";
    write_json_string(output, run.status);
    output << ",\"halt_code\":";
    write_json_string(output, run.halt_code);
    output << ",\"accepted_end_time\":";
    write_json_string(output, run.accepted_end_time);
    output << ",\"accepted_step_count\":" << run.accepted_step_count
           << ",\"rejected_step_count\":" << run.rejected_step_count
           << ",\"driver_wall_seconds\":" << driver_wall_seconds
           << ",\"evolution_timing\":";
    write_evolution_timing_json(output, run.timing);

    // Per accepted-step snapshot rows: the escaped-vs-close pair route
    // split over time comes from the engine's traversal certificates.
    output << ",\"accepted_step_snapshots\":[";
    bool first_row = true;
    for (const auto& step_row : run.steps) {
      if (step_row.status != "accepted" ||
          !step_row.accepted_snapshot.has_value()) {
        continue;
      }
      const auto& snapshot = *step_row.accepted_snapshot;
      if (!first_row) output << ',';
      first_row = false;
      write_snapshot_timing_json(
          output, snapshot.timing, snapshot.traversal_excluded_pairs,
          snapshot.traversal_exact_pairs, snapshot.reception_time);
    }
    output << ']';

    // Per accepted-step atomic timing rows.
    output << ",\"accepted_step_timings\":[";
    first_row = true;
    for (const auto& step_row : run.steps) {
      if (step_row.status != "accepted") continue;
      if (!first_row) output << ',';
      first_row = false;
      output << "{\"step_index\":" << step_row.step_index
             << ",\"accepted_time\":";
      write_json_string(output, step_row.accepted_time);
      output << ",\"corrected_substeps_wall_seconds\":"
             << step_row.timing.corrected_substeps_wall_seconds
             << ",\"history_copy_hash_wall_seconds\":"
             << step_row.timing.history_copy_hash_wall_seconds
             << ",\"recertification_wall_seconds\":"
             << step_row.timing.recertification_wall_seconds
             << ",\"rejection_wall_seconds\":"
             << step_row.timing.rejection_wall_seconds
             << ",\"total_wall_seconds\":"
             << step_row.timing.total_wall_seconds << '}';
    }
    output << ']';

    // Endpoint kinematics for the escape census (positions, velocities).
    output << ",\"endpoint_states\":[";
    const eom::Interval endpoint = eom::Interval::point(
        eom::Interval::decimal_token(run.accepted_end_time).midpoint());
    for (std::size_t index = 0; index < run.histories.size(); ++index) {
      const auto& path = run.histories[index];
      if (index > 0) output << ',';
      const auto position = path.history.position_hull(endpoint);
      const auto velocity = path.history.velocity_hull(endpoint);
      output << "{\"path_id\":";
      write_json_string(output, path.path_id);
      output << ",\"charge\":";
      write_json_string(output, rows[index].charge);
      output << ",\"position\":["
             << position[0].midpoint() << ',' << position[1].midpoint()
             << ',' << position[2].midpoint() << "],\"velocity\":["
             << velocity[0].midpoint() << ',' << velocity[1].midpoint()
             << ',' << velocity[2].midpoint() << "]}";
    }
    output << "]}\n";

    std::cout << "phase0 population=" << population
              << " status=" << run.status
              << " halt=" << run.halt_code
              << " accepted_end=" << run.accepted_end_time
              << " accepted_steps=" << run.accepted_step_count
              << " rejected_steps=" << run.rejected_step_count
              << " engine_wall=" << run.timing.total_wall_seconds
              << " driver_wall=" << driver_wall_seconds
              << " output=" << output_path << '\n';
    return run.accepted_step_count > 0 ? 0 : 2;
  } catch (const std::exception& error) {
    std::cerr << "attractor-phase0-release-profile error: " << error.what()
              << '\n';
    return 1;
  }
}
