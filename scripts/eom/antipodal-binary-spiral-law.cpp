#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/Checkpoint.hpp"

#include <algorithm>
#include <array>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

// Example physical-unit event run (the EOM request remains normalized to
// c_f=1; physical units are an input/output mapping only):
//
//   antipodal-binary-spiral-law \
//     --mode=physical-target \
//     --initial-speed-km-s=100 --target-speed-km-s=170 \
//     --physical-radius-kpc=2 \
//     --physical-field-speed-km-s=299792.458 \
//     --history-depth=3 --history-segment-step=0.1 \
//     --duration=1000 --chunk-duration=25 \
//     --step=1 --minimum-step=0.01 --maximum-step=1 \
//     --chart=sharp --acceleration-tolerance=1e-10 \
//     --heartbeat-every=25 --thread-count=4 \
//     --output=physical-target.csv \
//     --checkpoint=physical-target.checkpoint.bin
//
// Resume by repeating the same scenario and numerical options with a larger
// --duration and --resume=1. The checkpoint scenario identity is verified.

namespace eom = architrino::eom;

namespace {

constexpr double kPi = 3.141592653589793238462643383279502884;

using Vector = std::array<double, 3>;

struct Options {
  std::string mode = "snapshot-grid";
  std::string output;
  std::string seed = "circular";
  double s = 0.5;
  double radius = 1.0;
  double history_depth = 4.0;
  double history_segment_step = 0.01;
  double spiral_radial_rate = 0.08;
  double perturbation_amplitude = 0.12;
  double root_tolerance = 1e-9;
  double acceleration_tolerance = 1e-5;
  double duration = 2.0;
  double step = 0.01;
  double minimum_step = 0.0025;
  double maximum_step = 0.01;
  double coupling = 32.413220013230898;
  std::string chart = "sharp_with_finite_width_fallback";
  std::size_t thread_count = 4;
  std::string checkpoint;
  std::string restart_checkpoint;
  bool resume = false;
  double chunk_duration = 100.0;
  std::size_t heartbeat_every = 25;
  bool adaptive_step_growth = false;
  bool continuous_adaptive_step = false;
  bool certificate_cost_feedback = false;
  double initial_speed_km_s = 0.0;
  double target_speed_km_s = 0.0;
  double physical_radius_kpc = 0.0;
  double physical_field_speed_km_s = 0.0;
};

struct RootFormula {
  std::vector<double> partner;
  std::vector<double> self;
  double partner_radial = 0.0;
  double partner_tangential = 0.0;
  double self_radial = 0.0;
  double self_tangential = 0.0;
};

struct SnapshotRow {
  double s = 0.0;
  double f_r = 0.0;
  double f_theta = 0.0;
  double formula_f_r = 0.0;
  double formula_f_theta = 0.0;
  double acceleration_r = 0.0;
  double acceleration_theta = 0.0;
  std::size_t partner_roots = 0;
  std::size_t self_roots = 0;
  double maximum_hinge_residual = 0.0;
  double maximum_formula_error = 0.0;
  std::string root_status;
  std::string acceleration_status;
};

struct EvolutionSample {
  double time = 0.0;
  double radius = 0.0;
  double speed = 0.0;
  double radial_velocity = 0.0;
  double tangential_velocity = 0.0;
  double s = 0.0;
};

struct PhysicalEventBracket {
  std::string kind;
  EvolutionSample before;
  EvolutionSample after;
};

struct PhysicalOutputSummary {
  bool positive_radial_departure_seen = false;
  std::optional<EvolutionSample> maximum_speed_sample;
};

struct SeedState {
  Vector position;
  Vector velocity;
};

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
    if (argument.starts_with(prefix)) {
      return std::stod(argument.substr(prefix.size()));
    }
  }
  return fallback;
}

std::size_t option_size(
    int argc, char** argv, const std::string& name,
    std::size_t fallback) {
  const std::string prefix = "--" + name + "=";
  for (int index = 1; index < argc; ++index) {
    const std::string argument = argv[index];
    if (argument.starts_with(prefix)) {
      return static_cast<std::size_t>(
          std::stoull(argument.substr(prefix.size())));
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
    if (argument.starts_with(prefix)) {
      return argument.substr(prefix.size());
    }
  }
  return fallback;
}

bool option_bool(
    int argc, char** argv, const std::string& name, bool fallback) {
  const std::string value = option_string(
      argc, argv, name, fallback ? "true" : "false");
  if (value == "true" || value == "1") return true;
  if (value == "false" || value == "0") return false;
  throw std::invalid_argument("--" + name + " must be true, false, 1, or 0");
}

double midpoint(const eom::Interval& interval) {
  return interval.midpoint();
}

double norm(const Vector& value) {
  return std::sqrt(
      value[0] * value[0] + value[1] * value[1] + value[2] * value[2]);
}

double dot(const Vector& left, const Vector& right) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

double bisect_root(
    const auto& function, double lower, double upper,
    double tolerance = 1e-14) {
  double f_lower = function(lower);
  double f_upper = function(upper);
  if (f_lower == 0.0) return lower;
  if (f_upper == 0.0) return upper;
  if (std::signbit(f_lower) == std::signbit(f_upper)) {
    throw std::runtime_error("root bisection requires a sign change");
  }
  for (int iteration = 0; iteration < 200; ++iteration) {
    const double middle = lower + 0.5 * (upper - lower);
    const double f_middle = function(middle);
    if (f_middle == 0.0 || upper - lower <= tolerance) return middle;
    if (std::signbit(f_middle) == std::signbit(f_lower)) {
      lower = middle;
      f_lower = f_middle;
    } else {
      upper = middle;
      f_upper = f_middle;
    }
  }
  return lower + 0.5 * (upper - lower);
}

std::vector<double> scan_roots(
    const auto& function, double upper, bool exclude_zero) {
  constexpr std::size_t cells = 1000000U;
  std::vector<double> roots;
  double x0 = exclude_zero ? std::max(1e-12, upper / cells) : 0.0;
  double f0 = function(x0);
  for (std::size_t index = 1; index <= cells; ++index) {
    const double x1 = upper * static_cast<double>(index) /
        static_cast<double>(cells);
    if (!(x1 > x0)) continue;
    const double f1 = function(x1);
    if (f1 == 0.0 || std::signbit(f0) != std::signbit(f1)) {
      const double root = f1 == 0.0 ? x1 : bisect_root(function, x0, x1);
      if ((!exclude_zero || root > 1e-10) &&
          (roots.empty() || std::abs(root - roots.back()) > 1e-8)) {
        roots.push_back(root);
      }
    }
    x0 = x1;
    f0 = f1;
  }
  return roots;
}

RootFormula analytic_formula(double s) {
  if (!(s > 0.0)) throw std::invalid_argument("s must be positive");
  RootFormula result;
  result.partner = scan_roots(
      [s](double phase) {
        return phase - 2.0 * s * std::abs(std::cos(phase / 2.0));
      },
      2.0 * s, false);
  result.self = scan_roots(
      [s](double phase) {
        return phase - 2.0 * s * std::abs(std::sin(phase / 2.0));
      },
      2.0 * s, true);
  for (const double phase : result.partner) {
    const double half = phase / 2.0;
    const double orientation = std::copysign(1.0, std::cos(half));
    const double transmitter_factor =
        std::abs(1.0 + s * orientation * std::sin(half));
    result.partner_radial +=
        s * s * std::abs(std::cos(half)) /
        (phase * phase * transmitter_factor);
    result.partner_tangential +=
        s * s * orientation * std::sin(half) /
        (phase * phase * transmitter_factor);
  }
  for (const double phase : result.self) {
    const double half = phase / 2.0;
    const double orientation = std::copysign(1.0, std::sin(half));
    const double transmitter_factor =
        std::abs(1.0 - s * orientation * std::cos(half));
    result.self_radial +=
        s * s * std::abs(std::sin(half)) /
        (phase * phase * transmitter_factor);
    result.self_tangential +=
        s * s * orientation * std::cos(half) /
        (phase * phase * transmitter_factor);
  }
  return result;
}

eom::RetainedHistory circular_history(
    const std::string& id, double radius, double s, double phase,
    double depth, double segment_step) {
  const double omega = s / radius;
  return eom::RetainedHistory::uniform_circular(
      id,
      {
          .t_start = token(-depth),
          .t_end = "0",
          .maximum_segment_step = token(segment_step),
          .cylindrical_radius = token(radius),
          .height = "0",
          .angular_speed = token(omega),
          .tangential_speed = token(s),
          .phase = token(phase),
          .tilt_x = "0",
          .tilt_y = "0",
      });
}

SeedState seed_state(
    const Options& options, const std::string& seed, double time,
    double phase) {
  const double radius = options.radius;
  const double speed = options.s;
  double radial_position = radius;
  double radial_velocity = 0.0;
  double azimuth = phase;
  double angular_velocity = speed / radius;

  if (seed == "log-spiral-in" || seed == "log-spiral-out") {
    const double signed_rate = seed == "log-spiral-in"
        ? -options.spiral_radial_rate
        : options.spiral_radial_rate;
    const double endpoint_radial_speed = signed_rate * radius;
    if (!(std::abs(endpoint_radial_speed) < speed)) {
      throw std::invalid_argument(
          "spiral radial speed must be smaller than endpoint speed");
    }
    angular_velocity =
        std::sqrt(speed * speed - endpoint_radial_speed * endpoint_radial_speed) /
        radius;
    radial_position = radius * std::exp(signed_rate * time);
    radial_velocity = signed_rate * radial_position;
    azimuth = angular_velocity * time + phase;
  } else if (seed == "perturbed") {
    const double x = kPi * time / options.history_depth;
    const double envelope =
        std::sin(x) * std::sin(x) +
        0.35 * std::sin(2.0 * x) * std::sin(2.0 * x);
    const double envelope_derivative =
        (kPi / options.history_depth) *
        (std::sin(2.0 * x) + 0.7 * std::sin(4.0 * x));
    radial_position =
        radius * (1.0 + options.perturbation_amplitude * envelope);
    radial_velocity =
        radius * options.perturbation_amplitude * envelope_derivative;
    azimuth = speed * time / radius + phase +
        0.6 * options.perturbation_amplitude * envelope;
    angular_velocity = speed / radius +
        0.6 * options.perturbation_amplitude * envelope_derivative;
  } else if (seed == "circular") {
    azimuth = speed * time / radius + phase;
  } else {
    throw std::invalid_argument(
        "seed must be circular, log-spiral-in, log-spiral-out, or perturbed");
  }

  const double cosine = std::cos(azimuth);
  const double sine = std::sin(azimuth);
  return {
      .position = {radial_position * cosine, radial_position * sine, 0.0},
      .velocity = {
          radial_velocity * cosine - radial_position * angular_velocity * sine,
          radial_velocity * sine + radial_position * angular_velocity * cosine,
          0.0},
  };
}

eom::RetainedHistory custom_seed_history(
    const Options& options, const std::string& id, const std::string& seed,
    double phase) {
  const std::size_t segment_count = static_cast<std::size_t>(
      std::ceil(options.history_depth / options.history_segment_step));
  if (segment_count == 0U) {
    throw std::invalid_argument("custom seed history has no segments");
  }
  const double step =
      options.history_depth / static_cast<double>(segment_count);
  std::vector<eom::CubicHistorySegment> segments;
  segments.reserve(segment_count);
  for (std::size_t index = 0; index < segment_count; ++index) {
    const double t0 = index == 0U
        ? -options.history_depth
        : -options.history_depth + step * static_cast<double>(index);
    const double t1 = index + 1U == segment_count
        ? 0.0
        : -options.history_depth +
            step * static_cast<double>(index + 1U);
    const double dt = t1 - t0;
    const auto start = seed_state(options, seed, t0, phase);
    const auto end = seed_state(options, seed, t1, phase);
    eom::CubicCoefficientTokens coefficients{};
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const double delta = end.position[axis] - start.position[axis];
      coefficients[axis] = {
          token(start.position[axis]), token(start.velocity[axis]),
          token(
              3.0 * delta / (dt * dt) -
              (2.0 * start.velocity[axis] + end.velocity[axis]) / dt),
          token(
              -2.0 * delta / (dt * dt * dt) +
              (start.velocity[axis] + end.velocity[axis]) / (dt * dt))};
    }
    // These small enclosures absorb decimal roundoff at exact segment joins.
    // The piecewise cubic itself is the admitted prehistory; no analytic seed
    // formula is used by the evolution after construction.
    segments.emplace_back(
        token(t0), token(t1), std::move(coefficients), "1e-11", "1e-10");
  }
  return eom::RetainedHistory(id, std::move(segments));
}

eom::RetainedHistory history_for_seed(
    const Options& options, const std::string& id, double phase) {
  if (options.seed == "circular") {
    return circular_history(
        id, options.radius, options.s, phase, options.history_depth,
        options.history_segment_step);
  }
  return custom_seed_history(options, id, options.seed, phase);
}

eom::NativeCoupledEvolutionRequest make_request(
    const Options& options, double s) {
  std::vector<eom::NativeCoupledPathInput> paths;
  paths.push_back({
      "positive", "1",
      circular_history(
          "positive-history", options.radius, s, 0.0,
          options.history_depth, options.history_segment_step)});
  paths.push_back({
      "negative", "-1",
      circular_history(
          "negative-history", options.radius, s, kPi,
          options.history_depth, options.history_segment_step)});
  return {
      .run_id = "antipodal-binary-snapshot-s" + token(s),
      .paths = std::move(paths),
      .start_time = "0",
      .end_time = "0.01",
      .initial_step = "0.01",
      .minimum_step = "0.0025",
      .maximum_step = "0.01",
      .field_speed = "1",
      .coupling = "1",
      .root_tolerance = token(options.root_tolerance),
      .transmitter_factor_floor = "1e-24",
      .acceleration_tolerance = token(options.acceleration_tolerance),
      .chart_policy = "sharp",
      .causal_width = "0.05",
      .core_scale = "0.05",
      .quadrature_tolerance = "1e-8",
      .event_impulse_tolerance = "1e-7",
      .regulator_convergence_tolerance = "1e-3",
      .position_tolerance = "1e-8",
      .velocity_tolerance = "1e-8",
      .correction_tolerance = "1e-8",
      .root_max_depth = 224,
      .root_max_cells = 500000,
      .quadrature_max_depth = 32,
      .quadrature_max_cells = 300000,
      .event_max_depth = 24,
      .event_max_cells = 300000,
      .regulator_refinement_levels = 3,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .max_correction_iterations = 12,
      .max_step_attempts = 10000,
      .max_rejected_steps = 100,
      .thread_count = options.thread_count,
  };
}

SnapshotRow measure_snapshot(const Options& options, double s, bool verbose) {
  auto request = make_request(options, s);
  std::vector<eom::NativePublishedPath> histories;
  for (const auto& path : request.paths) {
    histories.push_back({path.path_id, path.history});
  }
  const auto snapshot =
      eom::certify_native_acceleration_snapshot(request, histories, "0");
  SnapshotRow result;
  result.s = s;
  result.root_status = snapshot.status;
  result.acceleration_status = snapshot.acceleration.status;
  if (snapshot.status != "certified_complete" ||
      snapshot.acceleration.status != "certified_complete") {
    std::ostringstream failures;
    for (const auto& row : snapshot.root_certificates) {
      if (row.certificate.status != "certified_complete") {
        failures << "; root=" << row.receiver_path_id << "<-"
                 << row.transmitter_path_id << ':' << row.certificate.status << ':'
                 << row.certificate.failure_code << ":cells="
                 << row.certificate.visited_cells << ":difficult="
                 << row.certificate.difficult_cells;
      }
    }
    for (const auto& pair : snapshot.acceleration.pair_certificates) {
      if (pair.status != "certified") {
        failures << "; acceleration=" << pair.receiver_path_id << "<-"
                 << pair.transmitter_path_id << ':' << pair.status << ':'
                 << pair.failure_code;
      }
    }
    throw std::runtime_error(
        "snapshot failed at s=" + token(s) + ": " + snapshot.failure_code +
        "; acceleration=" + snapshot.acceleration.failure_code +
        failures.str());
  }

  std::vector<double> native_partner;
  std::vector<double> native_self;
  for (const auto& row : snapshot.root_certificates) {
    const bool selected_receiver = row.receiver_path_id == "positive";
    const bool self = row.receiver_path_id == row.transmitter_path_id;
    if (selected_receiver) {
      for (const auto& root : row.certificate.roots) {
        const double emission =
            0.5 * (std::stod(root.lower) + std::stod(root.upper));
        const double phase = -s * emission / options.radius;
        if (self) {
          native_self.push_back(phase);
          result.maximum_hinge_residual = std::max(
              result.maximum_hinge_residual,
              std::abs(
                  phase - 2.0 * s * std::abs(std::sin(phase / 2.0))));
        } else {
          native_partner.push_back(phase);
          result.maximum_hinge_residual = std::max(
              result.maximum_hinge_residual,
              std::abs(
                  phase - 2.0 * s * std::abs(std::cos(phase / 2.0))));
        }
      }
    }
    if (row.certificate.status != "certified_complete" ||
        !row.certificate.root_free_complement) {
      throw std::runtime_error(
          "root complement is not certified complete for " +
          row.receiver_path_id + "<-" + row.transmitter_path_id);
    }
  }
  std::sort(native_partner.begin(), native_partner.end());
  std::sort(native_self.begin(), native_self.end());
  result.partner_roots = native_partner.size();
  result.self_roots = native_self.size();

  const auto formula = analytic_formula(s);
  if (native_partner.size() != formula.partner.size() ||
      native_self.size() != formula.self.size()) {
    throw std::runtime_error(
        "native/analytic root count mismatch at s=" + token(s));
  }
  for (std::size_t index = 0; index < native_partner.size(); ++index) {
    result.maximum_formula_error = std::max(
        result.maximum_formula_error,
        std::abs(native_partner[index] - formula.partner[index]));
  }
  for (std::size_t index = 0; index < native_self.size(); ++index) {
    result.maximum_formula_error = std::max(
        result.maximum_formula_error,
        std::abs(native_self[index] - formula.self[index]));
  }

  const auto found = std::find_if(
      snapshot.acceleration.receiver_totals.begin(),
      snapshot.acceleration.receiver_totals.end(),
      [](const auto& total) { return total.receiver_path_id == "positive"; });
  if (found == snapshot.acceleration.receiver_totals.end()) {
    throw std::runtime_error("positive receiver acceleration is missing");
  }
  result.acceleration_r = midpoint(found->acceleration[0]);
  result.acceleration_theta = midpoint(found->acceleration[1]);
  result.f_r = -result.acceleration_r * options.radius * options.radius;
  result.f_theta =
      result.acceleration_theta * options.radius * options.radius;
  result.formula_f_r = formula.partner_radial - formula.self_radial;
  result.formula_f_theta =
      formula.partner_tangential + formula.self_tangential;
  result.maximum_formula_error = std::max(
      result.maximum_formula_error,
      std::abs(result.f_r - result.formula_f_r));
  result.maximum_formula_error = std::max(
      result.maximum_formula_error,
      std::abs(result.f_theta - result.formula_f_theta));

  if (verbose) {
    std::cout << std::setprecision(17)
              << "s=" << s << " partner_roots=" << result.partner_roots
              << " self_roots=" << result.self_roots
              << " F_r=" << result.f_r
              << " F_theta=" << result.f_theta
              << " formula_F_r=" << result.formula_f_r
              << " formula_F_theta=" << result.formula_f_theta
              << " hinge_residual=" << result.maximum_hinge_residual
              << " formula_error=" << result.maximum_formula_error << '\n';
    std::cout << "  partner_phases=";
    for (std::size_t index = 0; index < native_partner.size(); ++index) {
      if (index > 0U) std::cout << ',';
      std::cout << native_partner[index];
    }
    std::cout << "\n  self_phases=";
    for (std::size_t index = 0; index < native_self.size(); ++index) {
      if (index > 0U) std::cout << ',';
      std::cout << native_self[index];
    }
    std::cout << '\n';
  }
  return result;
}

void write_snapshot_rows(
    const std::string& path, const std::vector<SnapshotRow>& rows) {
  if (path.empty()) return;
  std::ofstream stream(path);
  if (!stream) throw std::runtime_error("cannot open output: " + path);
  stream << "s,F_r,F_theta,formula_F_r,formula_F_theta,acceleration_r,"
            "acceleration_theta,partner_roots,self_roots,"
            "maximum_hinge_residual,maximum_formula_error,root_status,"
            "acceleration_status\n";
  stream << std::setprecision(17);
  for (const auto& row : rows) {
    stream << row.s << ',' << row.f_r << ',' << row.f_theta << ','
           << row.formula_f_r << ',' << row.formula_f_theta << ','
           << row.acceleration_r << ',' << row.acceleration_theta << ','
           << row.partner_roots << ',' << row.self_roots << ','
           << row.maximum_hinge_residual << ',' << row.maximum_formula_error
           << ',' << row.root_status << ',' << row.acceleration_status << '\n';
  }
}

void measure_partner_roots(const Options& options, double s) {
  auto request = make_request(options, s);
  const auto& receiver = request.paths[0].history;
  const auto& source = request.paths[1].history;
  const auto certificate = eom::certify_exact_pair({
      .row_id = "partner-root-gate-s" + token(s),
      .receiver = &receiver,
      .source = &source,
      .reception_time = "0",
      .search_lower = token(-options.history_depth),
      .search_upper = "0",
      .field_speed = "1",
      .root_tolerance = token(options.root_tolerance),
      .max_depth = 224,
      .max_cells = 500000,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
  });
  if (certificate.status != "certified_complete" ||
      !certificate.root_free_complement) {
    throw std::runtime_error(
        "partner root gate failed at s=" + token(s) + ": " +
        certificate.status + ':' + certificate.failure_code);
  }
  const auto formula = analytic_formula(s);
  if (certificate.roots.size() != formula.partner.size()) {
    throw std::runtime_error(
        "partner native/analytic root count mismatch at s=" + token(s));
  }
  std::cout << std::setprecision(17) << "s=" << s
            << " partner_roots=" << certificate.roots.size()
            << " root_free_complement=true phases=";
  for (std::size_t index = 0; index < certificate.roots.size(); ++index) {
    if (index > 0U) std::cout << ',';
    const auto& root = certificate.roots[index];
    const double emission =
        0.5 * (std::stod(root.lower) + std::stod(root.upper));
    std::cout << -s * emission / options.radius;
  }
  std::cout << '\n';
}

EvolutionSample measure_evolution_state(
    const std::vector<eom::NativePublishedPath>& histories,
    const std::string& time) {
  const auto found = std::find_if(
      histories.begin(), histories.end(),
      [](const auto& path) { return path.path_id == "positive"; });
  if (found == histories.end()) {
    throw std::runtime_error("positive path is missing from evolution history");
  }
  const eom::Interval point = eom::Interval::decimal_token(time);
  const auto position_interval = found->history.position_hull(point);
  const auto velocity_interval = found->history.velocity_hull(point);
  const Vector position{
      midpoint(position_interval[0]), midpoint(position_interval[1]),
      midpoint(position_interval[2])};
  const Vector velocity{
      midpoint(velocity_interval[0]), midpoint(velocity_interval[1]),
      midpoint(velocity_interval[2])};
  const double radius = norm(position);
  const double speed = norm(velocity);
  const double radial_velocity = dot(position, velocity) / radius;
  const double tangential_velocity =
      (position[0] * velocity[1] - position[1] * velocity[0]) / radius;
  return {
      .time = std::stod(time),
      .radius = radius,
      .speed = speed,
      .radial_velocity = radial_velocity,
      .tangential_velocity = tangential_velocity,
      .s = speed,
  };
}

void write_evolution_samples(
    const std::string& path, const std::vector<EvolutionSample>& samples) {
  if (path.empty()) return;
  std::ofstream stream(path);
  if (!stream) throw std::runtime_error("cannot open output: " + path);
  stream << "time,radius,speed,radial_velocity,tangential_velocity,s\n";
  stream << std::setprecision(17);
  for (const auto& sample : samples) {
    stream << sample.time << ',' << sample.radius << ',' << sample.speed << ','
           << sample.radial_velocity << ',' << sample.tangential_velocity << ','
           << sample.s << '\n';
  }
}

EvolutionSample parse_physical_output_sample(const std::string& line) {
  std::array<double, 5> values{};
  std::size_t begin = 0U;
  for (std::size_t index = 0U; index < values.size(); ++index) {
    const std::size_t comma = line.find(',', begin);
    if (comma == std::string::npos) {
      throw std::runtime_error(
          "physical-target resume output has a malformed row");
    }
    values[index] = std::stod(line.substr(begin, comma - begin));
    begin = comma + 1U;
  }
  return {
      .time = values[0],
      .radius = values[1],
      .speed = values[2],
      .radial_velocity = values[3],
      .tangential_velocity = values[4],
      .s = values[2],
  };
}

PhysicalOutputSummary truncate_physical_output_to_checkpoint(
    const std::string& path, double accepted_end) {
  std::ifstream input(path);
  if (!input) {
    throw std::runtime_error(
        "cannot read physical-target resume output: " + path);
  }
  const std::filesystem::path temporary = path + ".resume.tmp";
  std::ofstream output(temporary, std::ios::trunc);
  if (!output) {
    throw std::runtime_error(
        "cannot create physical-target resume temporary output: " +
        temporary.string());
  }
  std::string line;
  if (!std::getline(input, line)) {
    throw std::runtime_error("physical-target resume output is empty");
  }
  output << line << '\n';
  PhysicalOutputSummary summary;
  while (std::getline(input, line)) {
    const EvolutionSample sample = parse_physical_output_sample(line);
    if (sample.time > accepted_end + 1e-12) continue;
    output << line << '\n';
    summary.positive_radial_departure_seen =
        summary.positive_radial_departure_seen ||
        sample.radial_velocity > 0.0;
    if (!summary.maximum_speed_sample.has_value() ||
        sample.speed > summary.maximum_speed_sample->speed) {
      summary.maximum_speed_sample = sample;
    }
  }
  output.close();
  if (!output) {
    throw std::runtime_error(
        "physical-target resume temporary output write failed");
  }
  std::filesystem::rename(temporary, path);
  return summary;
}

std::vector<eom::NativeCoupledPathInput> make_binary_paths(
    const Options& options) {
  constexpr const char* charge =
      "0.1666666666666666666666666666666667";
  constexpr const char* negative_charge =
      "-0.1666666666666666666666666666666667";
  std::vector<eom::NativeCoupledPathInput> paths;
  paths.push_back({
      "positive", charge,
      history_for_seed(options, "positive-history", 0.0)});
  paths.push_back({
      "negative", negative_charge,
      history_for_seed(options, "negative-history", kPi)});
  return paths;
}

eom::NativeCoupledEvolutionRequest make_evolution_request(
    const Options& options,
    const std::vector<eom::NativeCoupledPathInput>& paths) {
  return {
      .run_id = "antipodal-binary-evolution-s" + token(options.s),
      .paths = paths,
      .start_time = "0",
      .end_time = token(options.duration),
      .initial_step = token(options.step),
      .minimum_step = token(options.minimum_step),
      .maximum_step = token(options.maximum_step),
      .field_speed = "1",
      .coupling = token(options.coupling),
      .root_tolerance = token(options.root_tolerance),
      .transmitter_factor_floor = "1e-24",
      .acceleration_tolerance = token(options.acceleration_tolerance),
      .chart_policy = options.chart,
      .causal_width = "0.05",
      .core_scale = "0.05",
      .quadrature_tolerance = token(options.acceleration_tolerance),
      .event_impulse_tolerance = "1e-6",
      .regulator_convergence_tolerance = "1e-3",
      .position_tolerance = "1e-6",
      .velocity_tolerance = "1e-6",
      .correction_tolerance = "1e-7",
      .root_max_depth = 192,
      .root_max_cells = 500000,
      .quadrature_max_depth = 32,
      .quadrature_max_cells = 300000,
      .event_max_depth = 24,
      .event_max_cells = 300000,
      .regulator_refinement_levels = 3,
      .initial_mpfr_bits = 128,
      .maximum_mpfr_bits = 512,
      .max_correction_iterations = 12,
      .max_step_attempts = 200000,
      .max_rejected_steps = 1000,
      .thread_count = options.thread_count,
      .use_adaptive_step_growth = options.adaptive_step_growth,
      .use_continuous_adaptive_step = options.continuous_adaptive_step,
      .use_certificate_cost_feedback =
          options.certificate_cost_feedback,
  };
}

std::vector<eom::NativePublishedPath> published_paths(
    const std::vector<eom::NativeCoupledPathInput>& paths) {
  std::vector<eom::NativePublishedPath> initial_histories;
  for (const auto& path : paths) {
    initial_histories.push_back({path.path_id, path.history});
  }
  return initial_histories;
}

void evolve_binary(const Options& options) {
  const auto paths = make_binary_paths(options);
  auto request = make_evolution_request(options, paths);
  const auto initial_histories = published_paths(paths);
  const auto start_snapshot =
      eom::certify_native_acceleration_snapshot(request, initial_histories, "0");
  if (start_snapshot.status != "certified_complete" ||
      start_snapshot.acceleration.status != "certified_complete") {
    throw std::runtime_error(
        "evolution start snapshot is uncertified: " +
        start_snapshot.failure_code + "; acceleration=" +
        start_snapshot.acceleration.failure_code);
  }
  const auto evolution = eom::evolve_native_coupled_histories(request);
  std::vector<EvolutionSample> samples;
  samples.push_back(measure_evolution_state(initial_histories, "0"));
  for (const auto& step : evolution.steps) {
    if (step.status == "accepted") {
      samples.push_back(
          measure_evolution_state(step.published_histories, step.accepted_time));
    }
  }
  write_evolution_samples(options.output, samples);
  const auto& final = samples.back();
  std::cout << std::setprecision(17)
            << "evolution status=" << evolution.status
            << " halt=" << evolution.halt_code
            << " accepted_end=" << evolution.accepted_end_time
            << " attempted_steps=" << evolution.steps.size()
            << " accepted_steps=" << evolution.accepted_step_count
            << " rejected_steps=" << evolution.rejected_step_count
            << " initial_s=" << options.s
            << " initial_radius=" << options.radius
            << " seed=" << options.seed
            << " coupling=" << options.coupling
            << " effective_coupling=" << options.coupling / 36.0
            << " charge_magnitude=0.16666666666666667"
            << " history_depth=" << options.history_depth
            << " history_segment_step=" << options.history_segment_step
            << " chart=" << options.chart
            << " final_time=" << final.time
            << " final_radius=" << final.radius
            << " final_speed=" << final.speed
            << " final_radial_velocity=" << final.radial_velocity
            << " final_tangential_velocity=" << final.tangential_velocity
            << " initial_cycles="
            << final.time * options.s / (2.0 * kPi * options.radius)
            << " samples=" << samples.size() << '\n';
  if (evolution.status != "completed") {
    for (const auto& step : evolution.steps) {
      if (step.status != "accepted") {
        std::cerr << "rejected start=" << step.attempted_start
                  << " end=" << step.attempted_end
                  << " failure=" << step.failure_code << '\n';
      }
    }
    throw std::runtime_error("evolution did not complete");
  }
}

void evolve_binary_to_physical_target(Options options) {
  constexpr double kKilometresPerKiloparsec =
      3.0856775814913673e16;
  constexpr double kSecondsPerJulianYear = 31557600.0;
  if (!(options.initial_speed_km_s > 0.0) ||
      !(options.target_speed_km_s > options.initial_speed_km_s) ||
      !(options.target_speed_km_s < options.physical_field_speed_km_s) ||
      !(options.physical_radius_kpc > 0.0) ||
      !(options.physical_field_speed_km_s > 0.0)) {
    throw std::invalid_argument(
        "physical-target requires 0 < initial-speed-km-s < "
        "target-speed-km-s < physical-field-speed-km-s and "
        "physical-radius-kpc > 0");
  }
  if (options.output.empty() || options.checkpoint.empty()) {
    throw std::invalid_argument(
        "physical-target requires --output and --checkpoint");
  }
  if (options.resume && !options.restart_checkpoint.empty()) {
    throw std::invalid_argument(
        "physical-target cannot combine --resume with "
        "--restart-checkpoint");
  }
  if (!(options.chunk_duration > 0.0) ||
      !(options.duration > 0.0) || options.heartbeat_every == 0U) {
    throw std::invalid_argument(
        "physical-target requires positive duration, chunk-duration, and "
        "heartbeat-every");
  }

  options.radius = 1.0;
  options.seed = "circular";
  options.s =
      options.initial_speed_km_s / options.physical_field_speed_km_s;
  const double target_s =
      options.target_speed_km_s / options.physical_field_speed_km_s;

  // The sharp EOM snapshot independently supplies the radial coefficient.
  // Choose the coupling so the prescribed circular endpoint is radially
  // balanced at release. Evolution thereafter is unconstrained.
  const auto balance = measure_snapshot(options, options.s, false);
  if (balance.partner_roots != 1U || balance.self_roots != 0U ||
      !(balance.f_r > 0.0)) {
    throw std::runtime_error(
        "physical-target release is not a certified one-partner-root, "
        "no-self-root balance point");
  }
  options.coupling =
      36.0 * options.s * options.s * options.radius / balance.f_r;

  const auto paths = make_binary_paths(options);
  auto request = make_evolution_request(options, paths);
  const std::string scenario_run_id =
      "antipodal-binary-physical-target-r" +
      token(options.physical_radius_kpc) + "-v" +
      token(options.initial_speed_km_s) + "-to" +
      token(options.target_speed_km_s) + "-cf" +
      token(options.physical_field_speed_km_s) +
      (options.adaptive_step_growth ? "-adaptive-growth" : "") +
      (options.continuous_adaptive_step ? "-continuous-adaptive" : "") +
      (options.certificate_cost_feedback ? "-certificate-cost" : "");
  request.run_id = scenario_run_id;
  auto initial_histories = published_paths(paths);
  const double years_per_solver_time =
      options.physical_radius_kpc * kKilometresPerKiloparsec /
      options.physical_field_speed_km_s / kSecondsPerJulianYear;

  std::optional<eom::NativeEvolutionCheckpoint> checkpoint;
  PhysicalOutputSummary prior_output;
  std::string accepted_end = "0";
  EvolutionSample previous =
      measure_evolution_state(initial_histories, accepted_end);
  if (!options.restart_checkpoint.empty()) {
    const auto source =
        eom::read_native_evolution_checkpoint(options.restart_checkpoint);
    if (!source.run_id.starts_with(scenario_run_id)) {
      throw std::runtime_error(
          "physical-target restart source has the wrong scenario family");
    }
    request.run_id = scenario_run_id + "-restart-" +
        source.checkpoint_fingerprint.substr(0U, 16U);
    request.start_time = source.accepted_time;
    request.paths.clear();
    initial_histories.clear();
    for (const auto& path : source.paths) {
      request.paths.push_back({path.path_id, path.charge, path.history});
      initial_histories.push_back({path.path_id, path.history});
    }
    accepted_end = source.accepted_time;
    previous = measure_evolution_state(initial_histories, accepted_end);
  } else if (options.resume) {
    checkpoint = eom::read_native_evolution_checkpoint(options.checkpoint);
    if (!checkpoint->run_id.starts_with(scenario_run_id)) {
      throw std::runtime_error(
          "physical-target checkpoint scenario identity mismatch");
    }
    request.run_id = checkpoint->run_id;
    accepted_end = checkpoint->accepted_time;
    std::vector<eom::NativePublishedPath> resumed_histories;
    for (const auto& path : checkpoint->paths) {
      resumed_histories.push_back({path.path_id, path.history});
    }
    previous = measure_evolution_state(resumed_histories, accepted_end);
    prior_output = truncate_physical_output_to_checkpoint(
        options.output, std::stod(accepted_end));
  } else {
    const auto start_snapshot = eom::certify_native_acceleration_snapshot(
        request, initial_histories, accepted_end);
    if (start_snapshot.status != "certified_complete" ||
        start_snapshot.acceleration.status != "certified_complete") {
      throw std::runtime_error(
          "physical-target start snapshot is uncertified: " +
          start_snapshot.failure_code + "; acceleration=" +
          start_snapshot.acceleration.failure_code);
    }
  }

  std::ofstream stream(
      options.output,
      options.resume ? std::ios::app : std::ios::trunc);
  if (!stream) {
    throw std::runtime_error("cannot open output: " + options.output);
  }
  stream << std::setprecision(17);
  if (!options.resume) {
    stream << "time,radius,speed,radial_velocity,tangential_velocity,"
              "elapsed_years,radius_kpc,speed_km_s,"
              "radial_velocity_km_s,tangential_velocity_km_s\n";
    stream << previous.time << ',' << previous.radius << ','
           << previous.speed << ',' << previous.radial_velocity << ','
           << previous.tangential_velocity << ','
           << previous.time * years_per_solver_time << ','
           << previous.radius * options.physical_radius_kpc << ','
           << previous.speed * options.physical_field_speed_km_s << ','
           << previous.radial_velocity * options.physical_field_speed_km_s
           << ','
           << previous.tangential_velocity *
                  options.physical_field_speed_km_s
           << '\n';
    stream.flush();
  }

  std::optional<PhysicalEventBracket> terminal_event;
  if (previous.speed >= target_s) {
    terminal_event = PhysicalEventBracket{
        .kind = "target_reached",
        .before = previous,
        .after = previous,
    };
  }
  bool positive_radial_departure_seen =
      prior_output.positive_radial_departure_seen ||
      previous.radial_velocity > 0.0;
  EvolutionSample maximum_speed_sample =
      prior_output.maximum_speed_sample.value_or(previous);
  if (previous.speed > maximum_speed_sample.speed) {
    maximum_speed_sample = previous;
  }
  std::string final_status = terminal_event.has_value()
      ? terminal_event->kind : "maximum_duration_reached";
  std::size_t chunks = 0U;
  std::size_t cumulative_accepted = 0U;
  std::size_t cumulative_rejected = 0U;
  const auto wall_start = std::chrono::steady_clock::now();

  while (!terminal_event.has_value() &&
         std::stod(accepted_end) + 1e-15 < options.duration) {
    const double chunk_target = std::min(
        options.duration,
        std::stod(accepted_end) + options.chunk_duration);
    request.end_time = token(chunk_target);
    const std::size_t chunk_index = chunks;
    request.accepted_step_callback =
        [&options, &wall_start, chunk_index](
            std::size_t step_index, const std::string& accepted_time) {
          if (step_index % options.heartbeat_every != 0U) return;
          const double wall_seconds = std::chrono::duration<double>(
              std::chrono::steady_clock::now() - wall_start).count();
          std::cerr << "heartbeat mode=physical-target chunk="
                    << chunk_index << " step=" << step_index
                    << " accepted_time=" << accepted_time
                    << " wall_seconds=" << wall_seconds << std::endl;
        };

    const auto chunk = checkpoint.has_value()
        ? eom::resume_native_coupled_histories(
              request, *checkpoint, token(chunk_target))
        : eom::evolve_native_coupled_histories(request);
    cumulative_accepted += chunk.accepted_step_count;
    cumulative_rejected += chunk.rejected_step_count;

    for (const auto& step_row : chunk.steps) {
      if (step_row.status != "accepted") continue;
      const auto sample = measure_evolution_state(
          step_row.published_histories, step_row.accepted_time);
      stream << sample.time << ',' << sample.radius << ',' << sample.speed
             << ',' << sample.radial_velocity << ','
             << sample.tangential_velocity << ','
             << sample.time * years_per_solver_time << ','
             << sample.radius * options.physical_radius_kpc << ','
             << sample.speed * options.physical_field_speed_km_s << ','
             << sample.radial_velocity * options.physical_field_speed_km_s
             << ','
             << sample.tangential_velocity *
                    options.physical_field_speed_km_s
             << '\n';
      if (sample.speed > maximum_speed_sample.speed) {
        maximum_speed_sample = sample;
      }
      if (!terminal_event.has_value()) {
        const bool target_crossing =
            previous.speed < target_s && sample.speed >= target_s;
        const bool radial_turn =
            positive_radial_departure_seen &&
            previous.radial_velocity > 0.0 &&
            sample.radial_velocity <= 0.0;
        if (target_crossing || radial_turn) {
          terminal_event = PhysicalEventBracket{
              .kind = target_crossing && radial_turn
                  ? "target_and_radial_turn_same_step"
                  : (target_crossing ? "target_reached" : "radial_turn"),
              .before = previous,
              .after = sample,
          };
        }
      }
      positive_radial_departure_seen =
          positive_radial_departure_seen || sample.radial_velocity > 0.0;
      previous = sample;
    }
    stream.flush();

    const auto report_root_failures = [&chunk] {
      const auto report_snapshot = [](const char* label,
                                      const auto& snapshot) {
        if (snapshot.status == "certified_complete") return;
        std::cerr << "snapshot_failure stage=" << label << " status="
                  << snapshot.status << " failure_code="
                  << snapshot.failure_code << " acceleration_status="
                  << snapshot.acceleration.status
                  << " acceleration_failure_code="
                  << snapshot.acceleration.failure_code << std::endl;
        for (const auto& root : snapshot.root_certificates) {
          if (root.certificate.status == "certified_complete") continue;
          std::cerr << "root_failure receiver="
                    << root.receiver_path_id << " transmitter="
                    << root.transmitter_path_id << " status="
                    << root.certificate.status << " failure_code="
                    << root.certificate.failure_code << " detail="
                    << root.certificate.diagnostic_detail
                    << " precision_bits="
                    << root.certificate.achieved_precision_bits
                    << " difficult_segment="
                    << root.certificate.difficult_source_segment_index
                    << " difficult_cell=["
                    << root.certificate.difficult_cell_lower << ','
                    << root.certificate.difficult_cell_upper << "]"
                    << std::endl;
        }
        for (const auto& pair : snapshot.acceleration.pair_certificates) {
          if (pair.status == "certified_complete") continue;
          std::cerr << "acceleration_failure receiver="
                    << pair.receiver_path_id << " transmitter="
                    << pair.transmitter_path_id << " status="
                    << pair.status << " failure_code="
                    << pair.failure_code << " precision_bits="
                    << pair.achieved_acceleration_precision_bits
                    << std::endl;
        }
      };
      for (auto step = chunk.steps.rbegin(); step != chunk.steps.rend();
           ++step) {
        if (step->status == "accepted") continue;
        std::cerr << "step_failure attempted=[" << step->attempted_start
                  << ',' << step->attempted_end << "] failure_code="
                  << step->failure_code << std::endl;
        for (const auto& substep : step->substeps) {
          std::cerr << "substep_failure interval=[" << substep.start_time
                    << ',' << substep.end_time << "] failure_code="
                    << substep.failure_code << std::endl;
          report_snapshot("start", substep.start_snapshot);
          if (substep.endpoint_snapshot.has_value()) {
            report_snapshot("endpoint", *substep.endpoint_snapshot);
          }
        }
        if (step->accepted_snapshot.has_value()) {
          report_snapshot("accepted", *step->accepted_snapshot);
        }
        if (step->recertification_snapshot.has_value()) {
          report_snapshot(
              "recertification", *step->recertification_snapshot);
        }
        break;
      }
    };

    if (chunk.accepted_step_count == 0U) {
      report_root_failures();
      final_status = "halted_" +
          (chunk.halt_code.empty() ? chunk.status : chunk.halt_code);
      break;
    }

    const auto next_checkpoint =
        eom::create_native_evolution_checkpoint(request, chunk);
    eom::write_native_evolution_checkpoint_atomic(
        options.checkpoint, next_checkpoint);
    checkpoint = next_checkpoint;
    accepted_end = chunk.accepted_end_time;
    ++chunks;

    const double wall_seconds = std::chrono::duration<double>(
        std::chrono::steady_clock::now() - wall_start).count();
    std::cerr << std::setprecision(17)
              << "chunk_complete mode=physical-target index="
              << (chunks - 1U) << " accepted_end=" << accepted_end
              << " speed_km_s="
              << previous.speed * options.physical_field_speed_km_s
              << " radius_kpc="
              << previous.radius * options.physical_radius_kpc
              << " elapsed_years="
              << previous.time * years_per_solver_time
              << " snapshot_wall_seconds="
              << chunk.timing.snapshot_total_wall_seconds
              << " root_binary64_worker_wall_seconds="
              << chunk.timing.root_binary64_worker_wall_seconds
              << " root_mpfr_worker_wall_seconds="
              << chunk.timing.root_mpfr_worker_wall_seconds
              << " history_copy_hash_wall_seconds="
              << chunk.timing.history_copy_hash_wall_seconds
              << " correction_wall_seconds="
              << chunk.timing.correction_wall_seconds
              << " recertification_wall_seconds="
              << chunk.timing.recertification_wall_seconds
              << " wall_seconds=" << wall_seconds << std::endl;

    if (terminal_event.has_value()) {
      final_status = terminal_event->kind;
      break;
    }
    if (chunk.status != "completed" ||
        std::stod(chunk.accepted_end_time) + 1e-15 < chunk_target) {
      report_root_failures();
      final_status = "halted_" +
          (chunk.halt_code.empty() ? chunk.status : chunk.halt_code);
      break;
    }
  }

  std::cout << std::setprecision(17)
            << "physical_target status=" << final_status
            << " accepted_end=" << accepted_end
            << " accepted_steps=" << cumulative_accepted
            << " rejected_steps=" << cumulative_rejected
            << " initial_speed_km_s=" << options.initial_speed_km_s
            << " target_speed_km_s=" << options.target_speed_km_s
            << " final_speed_km_s="
            << previous.speed * options.physical_field_speed_km_s
            << " final_radius_kpc="
            << previous.radius * options.physical_radius_kpc
            << " elapsed_years="
            << previous.time * years_per_solver_time
            << " coupling=" << options.coupling
            << " effective_coupling=" << options.coupling / 36.0
            << " release_partner_roots=" << balance.partner_roots
            << " release_self_roots=" << balance.self_roots
            << " adaptive_step_growth=" << options.adaptive_step_growth
            << " continuous_adaptive_step="
            << options.continuous_adaptive_step
            << " certificate_cost_feedback="
            << options.certificate_cost_feedback
            << " maximum_accepted_speed_km_s="
            << maximum_speed_sample.speed *
                   options.physical_field_speed_km_s
            << " maximum_accepted_speed_time="
            << maximum_speed_sample.time;
  if (terminal_event.has_value()) {
    std::cout << " event=" << terminal_event->kind
              << " event_time_lower=" << terminal_event->before.time
              << " event_time_upper=" << terminal_event->after.time
              << " event_elapsed_years_lower="
              << terminal_event->before.time * years_per_solver_time
              << " event_elapsed_years_upper="
              << terminal_event->after.time * years_per_solver_time
              << " event_radius_kpc_lower="
              << terminal_event->before.radius * options.physical_radius_kpc
              << " event_radius_kpc_upper="
              << terminal_event->after.radius * options.physical_radius_kpc
              << " event_speed_km_s_lower="
              << terminal_event->before.speed *
                     options.physical_field_speed_km_s
              << " event_speed_km_s_upper="
              << terminal_event->after.speed *
                     options.physical_field_speed_km_s
              << " event_radial_velocity_km_s_lower="
              << terminal_event->before.radial_velocity *
                     options.physical_field_speed_km_s
              << " event_radial_velocity_km_s_upper="
              << terminal_event->after.radial_velocity *
                     options.physical_field_speed_km_s;
  }
  std::cout << '\n';
}

}  // namespace

int main(int argc, char** argv) {
  try {
    Options options;
    options.mode = option_string(argc, argv, "mode", options.mode);
    options.output = option_string(argc, argv, "output", options.output);
    options.seed = option_string(argc, argv, "seed", options.seed);
    options.s = option_double(argc, argv, "s", options.s);
    options.radius = option_double(argc, argv, "radius", options.radius);
    options.history_depth =
        option_double(argc, argv, "history-depth", options.history_depth);
    options.history_segment_step = option_double(
        argc, argv, "history-segment-step", options.history_segment_step);
    options.spiral_radial_rate = option_double(
        argc, argv, "spiral-radial-rate", options.spiral_radial_rate);
    options.perturbation_amplitude = option_double(
        argc, argv, "perturbation-amplitude",
        options.perturbation_amplitude);
    options.root_tolerance =
        option_double(argc, argv, "root-tolerance", options.root_tolerance);
    options.acceleration_tolerance = option_double(
        argc, argv, "acceleration-tolerance",
        options.acceleration_tolerance);
    options.duration =
        option_double(argc, argv, "duration", options.duration);
    options.step = option_double(argc, argv, "step", options.step);
    options.minimum_step =
        option_double(argc, argv, "minimum-step", options.minimum_step);
    options.maximum_step =
        option_double(argc, argv, "maximum-step", options.maximum_step);
    options.coupling =
        option_double(argc, argv, "coupling", options.coupling);
    options.chart = option_string(argc, argv, "chart", options.chart);
    options.thread_count =
        option_size(argc, argv, "thread-count", options.thread_count);
    options.checkpoint =
        option_string(argc, argv, "checkpoint", options.checkpoint);
    options.restart_checkpoint = option_string(
        argc, argv, "restart-checkpoint", options.restart_checkpoint);
    options.resume = option_bool(argc, argv, "resume", options.resume);
    options.chunk_duration = option_double(
        argc, argv, "chunk-duration", options.chunk_duration);
    options.heartbeat_every = option_size(
        argc, argv, "heartbeat-every", options.heartbeat_every);
    options.adaptive_step_growth = option_bool(
        argc, argv, "adaptive-step-growth", options.adaptive_step_growth);
    options.continuous_adaptive_step = option_bool(
        argc, argv, "continuous-adaptive-step",
        options.continuous_adaptive_step);
    options.certificate_cost_feedback = option_bool(
        argc, argv, "certificate-cost-feedback",
        options.certificate_cost_feedback);
    options.initial_speed_km_s = option_double(
        argc, argv, "initial-speed-km-s", options.initial_speed_km_s);
    options.target_speed_km_s = option_double(
        argc, argv, "target-speed-km-s", options.target_speed_km_s);
    options.physical_radius_kpc = option_double(
        argc, argv, "physical-radius-kpc", options.physical_radius_kpc);
    options.physical_field_speed_km_s = option_double(
        argc, argv, "physical-field-speed-km-s",
        options.physical_field_speed_km_s);

    if (options.mode == "snapshot") {
      const auto row = measure_snapshot(options, options.s, true);
      write_snapshot_rows(options.output, {row});
      return 0;
    }
    if (options.mode == "formula") {
      const auto formula = analytic_formula(options.s);
      std::cout << std::setprecision(17)
                << "s=" << options.s
                << " partner_roots=" << formula.partner.size()
                << " self_roots=" << formula.self.size()
                << " F_r="
                << formula.partner_radial - formula.self_radial
                << " F_theta="
                << formula.partner_tangential + formula.self_tangential
                << " partner_phases=";
      for (std::size_t index = 0; index < formula.partner.size(); ++index) {
        if (index > 0U) std::cout << ',';
        std::cout << formula.partner[index];
      }
      std::cout << " self_phases=";
      for (std::size_t index = 0; index < formula.self.size(); ++index) {
        if (index > 0U) std::cout << ',';
        std::cout << formula.self[index];
      }
      std::cout << '\n';
      return 0;
    }
    if (options.mode == "partner-roots") {
      measure_partner_roots(options, options.s);
      return 0;
    }
    if (options.mode == "evolve") {
      evolve_binary(options);
      return 0;
    }
    if (options.mode == "physical-target") {
      evolve_binary_to_physical_target(options);
      return 0;
    }
    if (options.mode != "snapshot-grid") {
      throw std::invalid_argument(
          "mode must be snapshot, formula, partner-roots, evolve, "
          "physical-target, or snapshot-grid");
    }
    const std::vector<double> speeds{
        0.25, 0.5, 0.75, 0.9, 0.95, 0.99, 0.999,
        1.001, 1.01, 1.05, 1.1, 1.2, 1.5, 2.0, 3.0, 5.0};
    std::vector<SnapshotRow> rows;
    for (const double s : speeds) {
      rows.push_back(measure_snapshot(options, s, true));
    }
    write_snapshot_rows(options.output, rows);
    return 0;
  } catch (const std::exception& error) {
    std::cerr << "antipodal-binary-spiral-law error: " << error.what()
              << '\n';
    return 1;
  }
}
