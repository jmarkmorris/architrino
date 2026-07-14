#include "architrino/eom/CoupledEvolution.hpp"

#include <array>
#include <cmath>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

std::string token(double value) {
  std::ostringstream stream;
  stream << std::setprecision(17) << value;
  return stream.str();
}

struct State {
  std::array<double, 3> x;
  std::array<double, 3> v;
};

eom::CubicHistorySegment hermite(
    double t0, double t1, const State& a, const State& b,
    double position_error, double velocity_error) {
  const double h = t1 - t0;
  eom::CubicCoefficientTokens coefficients;
  for (std::size_t axis = 0; axis < 3; ++axis) {
    const double delta = b.x[axis] - a.x[axis];
    coefficients[axis] = {
        token(a.x[axis]), token(a.v[axis]),
        token(3.0 * delta / (h * h) - (2.0 * a.v[axis] + b.v[axis]) / h),
        token(-2.0 * delta / (h * h * h) + (a.v[axis] + b.v[axis]) / (h * h))};
  }
  return eom::CubicHistorySegment(
      token(t0), token(t1), coefficients,
      token(position_error), token(velocity_error));
}

eom::RetainedHistory circular_history(
    const std::string& id, double radius, double omega, double phase,
    double start, double end, int segment_count) {
  const auto state = [&](double time) {
    const double angle = omega * time + phase;
    return State{{radius * std::cos(angle), radius * std::sin(angle), 0.0},
                 {-radius * omega * std::sin(angle),
                  radius * omega * std::cos(angle), 0.0}};
  };
  const double h = (end - start) / segment_count;
  const double m4 = std::abs(radius) * std::pow(std::abs(omega), 4);
  const double position_error = m4 * std::pow(h, 4) / 300.0 + 1e-14;
  const double velocity_error = m4 * std::pow(h, 3) / 8.0 + 1e-14;
  std::vector<eom::CubicHistorySegment> segments;
  for (int index = 0; index < segment_count; ++index) {
    const double t0 = start + h * index;
    const double t1 = index + 1 == segment_count ? end : start + h * (index + 1);
    segments.push_back(hermite(
        t0, t1, state(t0), state(t1), position_error, velocity_error));
  }
  return eom::RetainedHistory(id, std::move(segments));
}

double midpoint(const eom::Interval& interval) {
  return interval.midpoint();
}

}  // namespace

int main() {
  constexpr double radius = 1.0;
  constexpr double speed = 0.5;
  constexpr double omega = speed / radius;
  const double history_depth = 4.0;
  std::vector<eom::NativeCoupledPathInput> paths;
  paths.push_back({"a", "0.1666666666666666666666666666666667",
                   circular_history("a-history", radius, omega, 0.0,
                                    -history_depth, 0.0, 128)});
  paths.push_back({"b", "-0.1666666666666666666666666666666667",
                   circular_history("b-history", radius, omega, M_PI,
                                    -history_depth, 0.0, 128)});
  eom::NativeCoupledEvolutionRequest request{
      .run_id = "binary-circular-probe",
      .paths = paths,
      .start_time = "0",
      .end_time = "2",
      .initial_step = "0.01",
      .minimum_step = "0.0025",
      .field_speed = "1",
      .coupling = "32.4125179963575",
      .root_tolerance = "1e-5",
      .source_normal_floor = "1e-24",
      .acceleration_tolerance = "1e-5",
      .position_tolerance = "1e-6",
      .velocity_tolerance = "1e-6",
      .correction_tolerance = "1e-7",
      .root_max_depth = 192,
      .root_max_cells = 300000,
      .max_correction_iterations = 12,
      .max_step_attempts = 10000,
      .max_rejected_steps = 20,
      .thread_count = 4,
  };
  std::vector<eom::NativePublishedPath> histories;
  for (const auto& path : paths) histories.push_back({path.path_id, path.history});
  const auto snapshot = eom::certify_native_acceleration_snapshot(request, histories, "0");
  std::cout << std::setprecision(17)
            << "status=" << snapshot.status << " failure=" << snapshot.failure_code << '\n';
  for (const auto& row : snapshot.root_certificates) {
    std::cout << row.receiver_path_id << "<-" << row.source_path_id
              << " roots=" << row.certificate.roots.size()
              << " status=" << row.certificate.status
              << " failure=" << row.certificate.failure_code << '\n';
    for (const auto& root : row.certificate.roots) {
      std::cout << "  emission=[" << root.lower << ',' << root.upper
                << "] Ds=[" << root.source_normal_lower << ','
                << root.source_normal_upper << "] Dt=["
                << root.receiver_normal_lower << ','
                << root.receiver_normal_upper << "]\n";
    }
  }
  for (const auto& total : snapshot.acceleration.receiver_totals) {
    std::cout << "accel " << total.receiver_path_id << " = ["
              << midpoint(total.acceleration[0]) << ','
              << midpoint(total.acceleration[1]) << ','
              << midpoint(total.acceleration[2]) << "]\n";
  }
  {
    constexpr double self_speed = 2.0;
    std::vector<eom::NativeCoupledPathInput> curved_paths;
    curved_paths.push_back({
        "curved", "0.1666666666666666666666666666666667",
        circular_history("curved-history", 1.0, self_speed, 0.0, -4.0, 0.0, 1024)});
    auto self_request = request;
    self_request.run_id = "curved-self-probe";
    self_request.paths = curved_paths;
    self_request.coupling = "36";
    self_request.root_tolerance = "1e-7";
    self_request.acceleration_tolerance = "1e-4";
    std::vector<eom::NativePublishedPath> curved_histories{{
        curved_paths[0].path_id, curved_paths[0].history}};
    const auto curved_snapshot = eom::certify_native_acceleration_snapshot(
        self_request, curved_histories, "0");
    std::cout << "curved-self status=" << curved_snapshot.status
              << " failure=" << curved_snapshot.failure_code << '\n';
    for (const auto& row : curved_snapshot.root_certificates) {
      std::cout << "curved roots=" << row.certificate.roots.size()
                << " root_status=" << row.certificate.status
                << " root_failure=" << row.certificate.failure_code << '\n';
      for (const auto& root : row.certificate.roots) {
        const double emission = 0.5 * (std::stod(root.lower) + std::stod(root.upper));
        const double delta = -self_speed * emission;
        const double residual = delta - 2.0 * self_speed * std::sin(delta / 2.0);
        std::cout << "  emission=[" << root.lower << ',' << root.upper
                  << "] delta=" << delta << " hinge_residual=" << residual << '\n';
      }
    }
    for (const auto& total : curved_snapshot.acceleration.receiver_totals) {
      std::cout << "curved accel=[" << midpoint(total.acceleration[0]) << ','
                << midpoint(total.acceleration[1]) << ','
                << midpoint(total.acceleration[2]) << "]\n";
    }

    const State line_start{{-8.0, 0.0, 0.0}, {2.0, 0.0, 0.0}};
    const State line_end{{0.0, 0.0, 0.0}, {2.0, 0.0, 0.0}};
    std::vector<eom::CubicHistorySegment> line_segments;
    line_segments.push_back(hermite(-4.0, 0.0, line_start, line_end, 0.0, 0.0));
    std::vector<eom::NativeCoupledPathInput> straight_paths;
    straight_paths.push_back({
        "straight", "0.1666666666666666666666666666666667",
        eom::RetainedHistory("straight-history", std::move(line_segments))});
    self_request.run_id = "straight-self-probe";
    self_request.paths = straight_paths;
    std::vector<eom::NativePublishedPath> straight_histories{{
        straight_paths[0].path_id, straight_paths[0].history}};
    const auto straight_snapshot = eom::certify_native_acceleration_snapshot(
        self_request, straight_histories, "0");
    std::cout << "straight-self status=" << straight_snapshot.status
              << " failure=" << straight_snapshot.failure_code;
    for (const auto& row : straight_snapshot.root_certificates) {
      std::cout << " roots=" << row.certificate.roots.size();
    }
    std::cout << '\n';
  }
  const auto evolution = eom::evolve_native_coupled_histories(request);
  std::cout << "evolution status=" << evolution.status
            << " end=" << evolution.accepted_end_time
            << " accepted=" << evolution.accepted_step_count
            << " rejected=" << evolution.rejected_step_count
            << " halt=" << evolution.halt_code << '\n';
  std::cout << "timing total=" << evolution.timing.total_wall_seconds
            << " history_window="
            << evolution.timing.history_window_wall_seconds
            << " traversal=" << evolution.timing.traversal_wall_seconds
            << " root_batch="
            << evolution.timing.exact_root_batch_wall_seconds
            << " root_binary64_cpu="
            << evolution.timing.root_binary64_cpu_seconds
            << " root_mpfr_cpu=" << evolution.timing.root_mpfr_cpu_seconds
            << " mpfr_attempts="
            << evolution.timing.root_mpfr_attempt_count
            << " acceleration="
            << evolution.timing.acceleration_wall_seconds
            << " history_copy_hash="
            << evolution.timing.history_copy_hash_wall_seconds
            << " correction=" << evolution.timing.correction_wall_seconds
            << " reused_start_snapshots="
            << evolution.timing.reused_start_snapshot_count
            << " recertification="
            << evolution.timing.recertification_wall_seconds
            << " rejection=" << evolution.timing.rejection_wall_seconds
            << '\n';
  for (const auto& step : evolution.steps) {
    if (step.status != "accepted") {
      std::cout << "rejected [" << step.attempted_start << ','
                << step.attempted_end << "] failure=" << step.failure_code << '\n';
      for (const auto& substep : step.substeps) {
        std::cout << "  substep failure=" << substep.failure_code
                  << " correction=" << substep.correction_error.value_or(-1.0)
                  << " start=" << substep.start_snapshot.status << ':'
                  << substep.start_snapshot.failure_code;
        if (substep.endpoint_snapshot.has_value()) {
          std::cout << " endpoint=" << substep.endpoint_snapshot->status << ':'
                    << substep.endpoint_snapshot->failure_code;
          for (const auto& root_row : substep.endpoint_snapshot->root_certificates) {
            if (root_row.certificate.status != "certified_complete") {
              std::cout << " root=" << root_row.receiver_path_id << "<-"
                        << root_row.source_path_id << ':'
                        << root_row.certificate.failure_code;
            }
          }
        }
        std::cout << '\n';
      }
    }
  }
  for (const auto& path : evolution.histories) {
    const auto time = eom::Interval::decimal_token(evolution.accepted_end_time);
    const auto x = path.history.position_hull(time);
    const auto v = path.history.velocity_hull(time);
    std::cout << "final " << path.path_id << " x=["
              << midpoint(x[0]) << ',' << midpoint(x[1]) << ',' << midpoint(x[2])
              << "] v=[" << midpoint(v[0]) << ',' << midpoint(v[1]) << ','
              << midpoint(v[2]) << "]\n";
  }
}
