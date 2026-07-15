#include "architrino/eom/CoupledEvolution.hpp"

#include <algorithm>
#include <array>
#include <cmath>
#include <cstddef>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

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
    result.partner_radial +=
        s * s * std::abs(std::cos(half)) / (phase * phase);
    result.partner_tangential +=
        s * s * orientation * std::sin(half) / (phase * phase);
  }
  for (const double phase : result.self) {
    const double half = phase / 2.0;
    const double orientation = std::copysign(1.0, std::sin(half));
    result.self_radial +=
        s * s * std::abs(std::sin(half)) / (phase * phase);
    result.self_tangential +=
        s * s * orientation * std::cos(half) / (phase * phase);
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
      .source_normal_floor = "1e-24",
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
                 << row.source_path_id << ':' << row.certificate.status << ':'
                 << row.certificate.failure_code << ":cells="
                 << row.certificate.visited_cells << ":difficult="
                 << row.certificate.difficult_cells;
      }
    }
    for (const auto& pair : snapshot.acceleration.pair_certificates) {
      if (pair.status != "certified") {
        failures << "; acceleration=" << pair.receiver_path_id << "<-"
                 << pair.source_path_id << ':' << pair.status << ':'
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
    const bool self = row.receiver_path_id == row.source_path_id;
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
          row.receiver_path_id + "<-" + row.source_path_id);
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

void evolve_binary(const Options& options) {
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
  eom::NativeCoupledEvolutionRequest request{
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
      .source_normal_floor = "1e-24",
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
      .use_adaptive_step_growth = false,
  };
  std::vector<eom::NativePublishedPath> initial_histories;
  for (const auto& path : paths) {
    initial_histories.push_back({path.path_id, path.history});
  }
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
    if (options.mode != "snapshot-grid") {
      throw std::invalid_argument(
          "mode must be snapshot, formula, partner-roots, evolve, or "
          "snapshot-grid");
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
