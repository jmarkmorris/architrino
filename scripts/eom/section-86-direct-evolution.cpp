#include "architrino/eom/CoupledEvolution.hpp"

#include <algorithm>
#include <array>
#include <cmath>
#include <cstddef>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <map>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

constexpr double kPi = 3.141592653589793238462643383279502884;
constexpr double kAlphaMiddle = 0.2834414705238791;
constexpr double kOmega = 1.0415596039524766;
constexpr double kPeriod = 2.0 * kPi / kOmega;
constexpr double kKappaRelease = 0.2862286103053385;
constexpr double kNativeCoupling = 36.0 * kKappaRelease;
constexpr const char* kCharge = "0.1666666666666666666666666666666667";
constexpr const char* kNegativeCharge =
    "-0.1666666666666666666666666666666667";

using Vector = std::array<double, 3>;

double gOmega = kOmega;
double gPeriod = kPeriod;

struct State {
  Vector x;
  Vector v;
};

struct Layer {
  std::string name;
  double radius;
  double alpha;
  double phase;
};

struct SeedTilts {
  std::array<double, 3> x{};
  std::array<double, 3> y{};
};

struct Sample {
  double time;
  double amplitude;
  double angle_im;
  double angle_mo;
  double angle_oi;
  double maximum_radius;
  double maximum_speed;
};

struct Options {
  double cycles = 0.05;
  double step = 0.01;
  double minimum_step = 0.0025;
  double maximum_step = 0.01;
  double history_depth = 8.0;
  double history_segment_step = 0.02;
  double amplitude = 1e-3;
  double omega_scale = 1.0;
  std::string seed = "imx";
  std::string chart = "sharp";
  double acceleration_tolerance = 5e-3;
  double quadrature_tolerance = 5e-3;
  double position_tolerance = 2e-6;
  double velocity_tolerance = 2e-6;
  std::string output;
  bool snapshot_only = false;
  bool skip_control = false;
  bool adaptive_step_growth = false;
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

bool has_flag(int argc, char** argv, const std::string& flag) {
  const std::string target = "--" + flag;
  for (int index = 1; index < argc; ++index) {
    if (argv[index] == target) {
      return true;
    }
  }
  return false;
}

Vector subtract(const Vector& left, const Vector& right) {
  return {left[0] - right[0], left[1] - right[1], left[2] - right[2]};
}

Vector cross(const Vector& left, const Vector& right) {
  return {left[1] * right[2] - left[2] * right[1],
          left[2] * right[0] - left[0] * right[2],
          left[0] * right[1] - left[1] * right[0]};
}

double dot(const Vector& left, const Vector& right) {
  return left[0] * right[0] + left[1] * right[1] +
         left[2] * right[2];
}

double norm(const Vector& value) {
  return std::sqrt(dot(value, value));
}

Vector unit(const Vector& value) {
  const double magnitude = norm(value);
  if (!(magnitude > 0.0)) {
    throw std::runtime_error("zero layer-frame basis vector");
  }
  return {value[0] / magnitude, value[1] / magnitude,
          value[2] / magnitude};
}

SeedTilts seed_tilts(const std::string& seed, double amplitude) {
  SeedTilts result;
  if (seed == "none") return result;
  if (seed == "imx") {
    result.x = {amplitude, -amplitude, 0.0};
    return result;
  }
  if (seed == "mox") {
    result.x = {0.0, amplitude, -amplitude};
    return result;
  }
  if (seed == "imy") {
    result.y = {amplitude, -amplitude, 0.0};
    return result;
  }
  if (seed == "mode" || seed == "mode-conjugate") {
    constexpr std::array<double, 3> magnitudes{1.0, 0.3278991455356466,
                                               0.9759890107038188};
    constexpr std::array<double, 3> phases{0.7709063963501985,
                                           kPi / 2.0,
                                           2.673198103085392};
    for (std::size_t index = 0; index < 3; ++index) {
      result.x[index] = magnitudes[index] * std::cos(phases[index]);
      result.y[index] = magnitudes[index] * std::sin(phases[index]);
      if (seed == "mode-conjugate") result.y[index] = -result.y[index];
    }
    const double mean_x = (result.x[0] + result.x[1] + result.x[2]) / 3.0;
    const double mean_y = (result.y[0] + result.y[1] + result.y[2]) / 3.0;
    double maximum = 0.0;
    for (std::size_t index = 0; index < 3; ++index) {
      result.x[index] -= mean_x;
      result.y[index] -= mean_y;
      maximum = std::max(maximum, std::hypot(result.x[index], result.y[index]));
    }
    for (std::size_t index = 0; index < 3; ++index) {
      result.x[index] *= amplitude / maximum;
      result.y[index] *= amplitude / maximum;
    }
    return result;
  }
  throw std::invalid_argument("unknown perturbation seed: " + seed);
}

eom::RetainedHistory circular_history(
    const std::string& id, const Layer& layer, int sign, double tilt_x,
    double tilt_y, double depth, double segment_step) {
  const double cylindrical_radius = layer.radius * std::cos(layer.alpha);
  const double height = sign * layer.radius * std::sin(layer.alpha);
  const double phase = layer.phase + (sign < 0 ? kPi : 0.0);
  const double computed_tangential_speed =
      std::abs(cylindrical_radius * gOmega);
  return eom::RetainedHistory::uniform_circular(
      id,
      {
          .t_start = token(-depth),
          .t_end = "0",
          .maximum_segment_step = token(segment_step),
          .cylindrical_radius = token(cylindrical_radius),
          .height = token(height),
          .angular_speed = token(gOmega),
          .tangential_speed = token(computed_tangential_speed),
          .phase = token(phase),
          .tilt_x = token(tilt_x),
          .tilt_y = token(tilt_y),
      });
}

std::vector<eom::NativeCoupledPathInput> make_paths(const Options& options) {
  const std::array<Layer, 3> layers{{
      {"I", 0.5540023029040714, -0.4738568919164604,
       -0.28274333882308134},
      {"M", 1.0, kAlphaMiddle, 2.0943951023931953},
      {"O", 0.7521203514419849, 1.1257373675363425,
       5.925392810520749},
  }};
  const SeedTilts tilts = seed_tilts(options.seed, options.amplitude);
  std::vector<eom::NativeCoupledPathInput> paths;
  paths.reserve(6U);
  for (std::size_t layer_index = 0; layer_index < layers.size(); ++layer_index) {
    for (const int sign : {1, -1}) {
      const std::string suffix = sign > 0 ? "+" : "-";
      const std::string path_id = layers[layer_index].name + suffix;
      paths.push_back({
          path_id, sign > 0 ? kCharge : kNegativeCharge,
          circular_history(
              path_id + "-history", layers[layer_index], sign,
              tilts.x[layer_index], tilts.y[layer_index],
              options.history_depth, options.history_segment_step)});
    }
  }
  return paths;
}

State state_at(const eom::RetainedHistory& history, const std::string& time) {
  const eom::Interval point = eom::Interval::decimal_token(time);
  const auto position = history.position_hull(point);
  const auto velocity = history.velocity_hull(point);
  return {{position[0].midpoint(), position[1].midpoint(),
           position[2].midpoint()},
          {velocity[0].midpoint(), velocity[1].midpoint(),
           velocity[2].midpoint()}};
}

using Frame = std::array<Vector, 3>;
using Matrix = std::array<Vector, 3>;

struct FrameStates {
  std::array<Frame, 3> frames;
  double maximum_radius;
  double maximum_speed;
};

FrameStates frames_at(
    const std::vector<eom::NativePublishedPath>& histories,
    const std::string& time) {
  std::map<std::string, State> states;
  double maximum_radius = 0.0;
  double maximum_speed = 0.0;
  for (const auto& path : histories) {
    const State state = state_at(path.history, time);
    states.emplace(path.path_id, state);
    maximum_radius = std::max(maximum_radius, norm(state.x));
    maximum_speed = std::max(maximum_speed, norm(state.v));
  }
  std::array<Frame, 3> frames;
  const std::array<std::string, 3> names{"I", "M", "O"};
  for (std::size_t index = 0; index < names.size(); ++index) {
    const State& plus = states.at(names[index] + "+");
    const State& minus = states.at(names[index] + "-");
    const Vector e1 = unit(subtract(plus.x, minus.x));
    const Vector relative_velocity = subtract(plus.v, minus.v);
    const double projection = dot(relative_velocity, e1);
    const Vector e2 = unit({
        relative_velocity[0] - projection * e1[0],
        relative_velocity[1] - projection * e1[1],
        relative_velocity[2] - projection * e1[2]});
    frames[index] = {e1, e2, unit(cross(e1, e2))};
  }
  return {frames, maximum_radius, maximum_speed};
}

Vector rotation_vector(const Frame& control, const Frame& perturbed) {
  Matrix rotation{};
  for (std::size_t row = 0; row < 3; ++row) {
    for (std::size_t column = 0; column < 3; ++column) {
      for (std::size_t basis = 0; basis < 3; ++basis) {
        rotation[row][column] +=
            perturbed[basis][row] * control[basis][column];
      }
    }
  }
  const double cosine = std::clamp(
      (rotation[0][0] + rotation[1][1] + rotation[2][2] - 1.0) / 2.0,
      -1.0, 1.0);
  const double theta = std::acos(cosine);
  const Vector skew{
      rotation[2][1] - rotation[1][2],
      rotation[0][2] - rotation[2][0],
      rotation[1][0] - rotation[0][1]};
  if (theta < 1e-7) {
    return {0.5 * skew[0], 0.5 * skew[1], 0.5 * skew[2]};
  }
  const double scale = theta / (2.0 * std::sin(theta));
  return {scale * skew[0], scale * skew[1], scale * skew[2]};
}

Sample measure_difference(
    const std::vector<eom::NativePublishedPath>& control_histories,
    const std::vector<eom::NativePublishedPath>& perturbed_histories,
    const std::string& time) {
  const FrameStates control = frames_at(control_histories, time);
  const FrameStates perturbed = frames_at(perturbed_histories, time);
  std::array<Vector, 3> rotations;
  Vector mean{0.0, 0.0, 0.0};
  for (std::size_t index = 0; index < rotations.size(); ++index) {
    rotations[index] =
        rotation_vector(control.frames[index], perturbed.frames[index]);
    for (std::size_t axis = 0; axis < 3; ++axis) {
      mean[axis] += rotations[index][axis] / 3.0;
    }
  }
  double square_sum = 0.0;
  for (const auto& rotation : rotations) {
    const Vector relative = subtract(rotation, mean);
    square_sum += dot(relative, relative);
  }
  const double angle_im = norm(subtract(rotations[0], rotations[1]));
  const double angle_mo = norm(subtract(rotations[1], rotations[2]));
  const double angle_oi = norm(subtract(rotations[2], rotations[0]));
  return {std::stod(time),
          std::sqrt(square_sum / 3.0),
          angle_im, angle_mo, angle_oi,
          perturbed.maximum_radius, perturbed.maximum_speed};
}

double log_slope(
    const std::vector<Sample>& samples, std::size_t stride,
    double minimum_time, double maximum_amplitude) {
  std::vector<std::pair<double, double>> points;
  for (std::size_t index = 0; index < samples.size(); index += stride) {
    const auto& sample = samples[index];
    if (sample.time >= minimum_time && sample.amplitude > 1e-12 &&
        sample.amplitude <= maximum_amplitude) {
      points.emplace_back(sample.time, std::log(sample.amplitude));
    }
  }
  if (points.size() < 3U) return std::numeric_limits<double>::quiet_NaN();
  double mean_x = 0.0;
  double mean_y = 0.0;
  for (const auto& [x, y] : points) {
    mean_x += x;
    mean_y += y;
  }
  mean_x /= static_cast<double>(points.size());
  mean_y /= static_cast<double>(points.size());
  double covariance = 0.0;
  double variance = 0.0;
  for (const auto& [x, y] : points) {
    covariance += (x - mean_x) * (y - mean_y);
    variance += (x - mean_x) * (x - mean_x);
  }
  return covariance / variance;
}

void write_samples(const std::string& output, const std::vector<Sample>& samples) {
  if (output.empty()) return;
  std::ofstream stream(output);
  if (!stream) throw std::runtime_error("cannot open sample output: " + output);
  stream << "time,cycles,relative_tilt_rms,angle_im,angle_mo,angle_oi,"
            "maximum_radius,maximum_speed\n";
  stream << std::setprecision(17);
  for (const auto& sample : samples) {
    stream << sample.time << ',' << sample.time / gPeriod << ','
           << sample.amplitude << ',' << sample.angle_im << ','
           << sample.angle_mo << ',' << sample.angle_oi << ','
           << sample.maximum_radius << ',' << sample.maximum_speed << '\n';
  }
}

const std::vector<eom::NativePublishedPath>* histories_covering(
    const eom::NativeCoupledEvolutionCertificate& evolution,
    double time) {
  const eom::Interval point = eom::Interval::point(time);
  for (const auto& step : evolution.steps) {
    if (step.status != "accepted" || std::stod(step.accepted_time) < time) {
      continue;
    }
    const bool covered = std::all_of(
        step.published_histories.begin(), step.published_histories.end(),
        [&](const auto& path) { return path.history.covers(point); });
    if (covered) return &step.published_histories;
  }
  const bool final_covered = std::all_of(
      evolution.histories.begin(), evolution.histories.end(),
      [&](const auto& path) { return path.history.covers(point); });
  return final_covered ? &evolution.histories : nullptr;
}

}  // namespace

int main(int argc, char** argv) {
  try {
    Options options;
    options.cycles = option_double(argc, argv, "cycles", options.cycles);
    options.step = option_double(argc, argv, "step", options.step);
    options.minimum_step =
        option_double(argc, argv, "minimum-step", options.step / 4.0);
    options.maximum_step =
        option_double(argc, argv, "maximum-step", options.step);
    options.history_depth =
        option_double(argc, argv, "history-depth", options.history_depth);
    options.history_segment_step = option_double(
        argc, argv, "history-segment-step", options.history_segment_step);
    options.amplitude =
        option_double(argc, argv, "amplitude", options.amplitude);
    options.seed = option_string(argc, argv, "seed", options.seed);
    options.omega_scale =
        option_double(argc, argv, "omega-scale", options.omega_scale);
    gOmega = kOmega * options.omega_scale;
    gPeriod = 2.0 * kPi / gOmega;
    options.chart = option_string(argc, argv, "chart", options.chart);
    options.acceleration_tolerance = option_double(
        argc, argv, "acceleration-tolerance",
        options.acceleration_tolerance);
    options.quadrature_tolerance = option_double(
        argc, argv, "quadrature-tolerance",
        options.quadrature_tolerance);
    options.position_tolerance = option_double(
        argc, argv, "position-tolerance", options.position_tolerance);
    options.velocity_tolerance = option_double(
        argc, argv, "velocity-tolerance", options.velocity_tolerance);
    options.output = option_string(argc, argv, "output", options.output);
    options.snapshot_only = has_flag(argc, argv, "snapshot-only");
    options.skip_control = has_flag(argc, argv, "skip-control");
    options.adaptive_step_growth =
        has_flag(argc, argv, "adaptive-step-growth");

    auto paths = make_paths(options);
    eom::NativeCoupledEvolutionRequest request{
        .run_id = "section-86-direct-" + options.seed,
        .paths = paths,
        .start_time = "0",
        .end_time = token(options.cycles * gPeriod),
        .initial_step = token(options.step),
        .minimum_step = token(options.minimum_step),
        .maximum_step = token(options.maximum_step),
        .field_speed = "1",
        .coupling = token(kNativeCoupling),
        .root_tolerance = "1e-5",
        .source_normal_floor = "1e-24",
        .acceleration_tolerance = token(options.acceleration_tolerance),
        .chart_policy = options.chart,
        .causal_width = "0.05",
        .core_scale = "0.05",
        .quadrature_tolerance = token(options.quadrature_tolerance),
        .event_impulse_tolerance = "1e-6",
        .regulator_convergence_tolerance = "1e-3",
        .position_tolerance = token(options.position_tolerance),
        .velocity_tolerance = token(options.velocity_tolerance),
        .correction_tolerance = "2e-7",
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
        .thread_count = 8,
        .use_adaptive_step_growth = options.adaptive_step_growth,
    };
    std::vector<eom::NativePublishedPath> initial_histories;
    for (const auto& path : paths) {
      initial_histories.push_back({path.path_id, path.history});
      if (const auto& certificate =
              path.history.uniform_circular_endpoint_certificate();
          certificate.has_value()) {
        std::cerr << "history " << path.path_id
                  << " circular_endpoint="
                  << certificate->valid_reception_time
                  << " tangential_speed="
                  << certificate->tangential_speed << '\n';
      }
    }
    const auto snapshot = eom::certify_native_acceleration_snapshot(
        request, initial_histories, "0");
    std::size_t unresolved_roots = 0U;
    for (const auto& row : snapshot.root_certificates) {
      if (row.certificate.status != "certified_complete") {
        ++unresolved_roots;
        std::cerr << "root " << row.receiver_path_id << "<-"
                  << row.source_path_id << " status=" << row.certificate.status
                  << " failure=" << row.certificate.failure_code << '\n';
      }
    }
    std::size_t unresolved_accelerations = 0U;
    for (const auto& pair : snapshot.acceleration.pair_certificates) {
      if (pair.status == "uncertified") {
        ++unresolved_accelerations;
        std::cerr << "acceleration " << pair.receiver_path_id << "<-"
                  << pair.source_path_id << " chart=" << pair.chart
                  << " status=" << pair.status
                  << " failure=" << pair.failure_code
                  << " cells=" << pair.quadrature_visited_cells << '\n';
      } else if (pair.chart == "finite_width") {
        std::cerr << "acceleration " << pair.receiver_path_id << "<-"
                  << pair.source_path_id << " chart=" << pair.chart
                  << " status=" << pair.status
                  << " cells=" << pair.quadrature_visited_cells
                  << " precision_bits="
                  << pair.achieved_acceleration_precision_bits << '\n';
      }
    }
    for (const auto& receiver : snapshot.acceleration.receiver_totals) {
      std::cerr << "receiver_acceleration " << receiver.receiver_path_id
                << " midpoint="
                << receiver.acceleration[0].midpoint() << ','
                << receiver.acceleration[1].midpoint() << ','
                << receiver.acceleration[2].midpoint() << '\n';
    }
    Options control_options = options;
    control_options.seed = "none";
    control_options.amplitude = 0.0;
    const auto control_paths = make_paths(control_options);
    std::vector<eom::NativePublishedPath> control_initial_histories;
    for (const auto& path : control_paths) {
      control_initial_histories.push_back({path.path_id, path.history});
    }
    const Sample initial = measure_difference(
        control_initial_histories, initial_histories, "0");
    std::cout << std::setprecision(17)
              << "object worldlines=6 net_charge=0 omega=" << gOmega
              << " omega_scale=" << options.omega_scale
              << " period=" << gPeriod << " coupling=" << kNativeCoupling
              << " charges=+1/6,-1/6_per_layer"
              << " geometry_I=0.5540023029040714,-0.4738568919164604,"
                 "-0.28274333882308134"
              << " geometry_M=1,0.2834414705238791,2.0943951023931953"
              << " geometry_O=0.7521203514419849,1.1257373675363425,"
                 "5.925392810520749"
              << " history_depth=" << options.history_depth
              << " history_segment_step=" << options.history_segment_step
              << " initial_step=" << options.step
              << " minimum_step=" << options.minimum_step
              << " maximum_step=" << options.maximum_step
              << " adaptive_step_growth="
              << options.adaptive_step_growth
              << " chart=" << options.chart
              << " acceleration_tolerance="
              << options.acceleration_tolerance
              << " quadrature_tolerance="
              << options.quadrature_tolerance
              << " position_tolerance=" << options.position_tolerance
              << " velocity_tolerance=" << options.velocity_tolerance
              << " seed=" << options.seed
              << " seed_scale=" << options.amplitude
              << " initial_amplitude=" << initial.amplitude << '\n'
              << "snapshot status=" << snapshot.status
              << " failure=" << snapshot.failure_code
              << " unresolved_roots=" << unresolved_roots
              << " acceleration_status=" << snapshot.acceleration.status
              << " acceleration_failure=" << snapshot.acceleration.failure_code
              << " unresolved_accelerations=" << unresolved_accelerations
              << " pair_route=" << snapshot.pair_selection_route << '\n';
    if (options.snapshot_only || snapshot.status != "certified_complete") {
      return snapshot.status == "certified_complete" ? 0 : 2;
    }

    auto control_request = request;
    control_request.run_id = "section-86-direct-control";
    control_request.paths = control_paths;
    std::optional<eom::NativeCoupledEvolutionCertificate> control_evolution;
    if (!options.skip_control) {
      control_evolution =
          eom::evolve_native_coupled_histories(control_request);
    }
    const auto evolution = eom::evolve_native_coupled_histories(request);
    const auto report_steps = [](const char* label, const auto& run) {
      for (const auto& step : run.steps) {
        if (step.status == "accepted") {
          std::size_t uncertified_root_rows = 0U;
          std::size_t caustic_routes = 0U;
          std::size_t finite_width_pairs = 0U;
          std::size_t maximum_quadrature_cells = 0U;
          if (step.accepted_snapshot.has_value()) {
            for (const auto& row :
                 step.accepted_snapshot->root_certificates) {
              if (row.certificate.status == "caustic_route_required") {
                ++caustic_routes;
              } else if (row.certificate.status != "certified_complete") {
                ++uncertified_root_rows;
              }
            }
            for (const auto& pair :
                 step.accepted_snapshot->acceleration.pair_certificates) {
              if (pair.chart == "finite_width") {
                ++finite_width_pairs;
                maximum_quadrature_cells = std::max(
                    maximum_quadrature_cells,
                    pair.quadrature_visited_cells);
              }
            }
          }
          double maximum_position_error = 0.0;
          double maximum_velocity_error = 0.0;
          for (const auto& error : step.local_errors) {
            maximum_position_error = std::max(
                maximum_position_error, error.position_error);
            maximum_velocity_error = std::max(
                maximum_velocity_error, error.velocity_error);
          }
          std::cerr << label << " step=" << step.step_index
                    << " status=accepted"
                    << " accepted_time=" << step.accepted_time
                    << " atomic=" << step.publication_atomic
                    << " accepted_snapshot="
                    << (step.accepted_snapshot.has_value()
                            ? step.accepted_snapshot->status
                            : "missing")
                    << " uncertified_root_rows="
                    << uncertified_root_rows
                    << " caustic_routes=" << caustic_routes
                    << " finite_width_pairs=" << finite_width_pairs
                    << " maximum_quadrature_cells="
                    << maximum_quadrature_cells
                    << " maximum_position_error="
                    << maximum_position_error
                    << " maximum_velocity_error="
                    << maximum_velocity_error << '\n';
        } else {
          std::cerr << label << " step=" << step.step_index
                    << " status=" << step.status
                    << " failure=" << step.failure_code << '\n';
          for (const auto& substep : step.substeps) {
            std::cerr << "  substep " << substep.start_time << "->"
                      << substep.end_time
                      << " status=" << substep.status
                      << " iterations=" << substep.correction_iterations;
            if (substep.correction_error.has_value()) {
              std::cerr << " correction_error="
                        << *substep.correction_error;
            }
            if (!substep.failure_code.empty()) {
              std::cerr << " failure=" << substep.failure_code;
            }
            std::cerr << '\n';
            if (!substep.endpoint_snapshot.has_value() ||
                substep.endpoint_snapshot->status == "certified_complete") {
              continue;
            }
            for (const auto& row :
                 substep.endpoint_snapshot->root_certificates) {
              if (row.certificate.status != "certified_complete") {
                std::cerr << "  endpoint root " << row.receiver_path_id
                          << "<-" << row.source_path_id
                          << " status=" << row.certificate.status
                          << " failure=" << row.certificate.failure_code
                          << " precision_bits="
                          << row.certificate.achieved_precision_bits << '\n';
              }
            }
          }
          for (const auto& error : step.local_errors) {
            std::cerr << "  local_error " << error.path_id
                      << " position=" << error.position_error
                      << " velocity=" << error.velocity_error << '\n';
          }
          if (step.recertification_snapshot.has_value()) {
            for (const auto& row :
                 step.recertification_snapshot->root_certificates) {
              if (row.certificate.status != "certified_complete") {
                std::cerr << "  recertification root "
                          << row.receiver_path_id << "<-"
                          << row.source_path_id
                          << " status=" << row.certificate.status
                          << " failure=" << row.certificate.failure_code
                          << " root_free_complement="
                          << row.certificate.root_free_complement << '\n';
              }
            }
            for (const auto& pair : step.recertification_snapshot
                                         ->acceleration.pair_certificates) {
              if (pair.status == "uncertified") {
                std::cerr << "  recertification acceleration "
                          << pair.receiver_path_id << "<-"
                          << pair.source_path_id
                          << " chart=" << pair.chart
                          << " failure=" << pair.failure_code
                          << " cells=" << pair.quadrature_visited_cells
                          << '\n';
              }
            }
          }
        }
      }
    };
    if (control_evolution.has_value()) {
      report_steps("control", *control_evolution);
    }
    report_steps("perturbed", evolution);
    std::vector<Sample> samples{initial};
    for (const auto& step : evolution.steps) {
      if (step.status == "accepted") {
        const double time = std::stod(step.accepted_time);
        const auto* control_histories = control_evolution.has_value()
            ? histories_covering(*control_evolution, time)
            : nullptr;
        if (control_histories != nullptr) {
          samples.push_back(measure_difference(
              *control_histories, step.published_histories,
              step.accepted_time));
        }
      }
    }
    write_samples(options.output, samples);
    const Sample& final = samples.back();
    const double fit_start = std::min(0.25 * gPeriod, final.time * 0.2);
    if (control_evolution.has_value()) {
      std::cout << "control status=" << control_evolution->status
                << " halt=" << control_evolution->halt_code
                << " accepted_end=" << control_evolution->accepted_end_time
                << " accepted_steps="
                << control_evolution->accepted_step_count
                << " rejected_steps="
                << control_evolution->rejected_step_count << '\n';
    } else {
      std::cout << "control status=skipped_diagnostic_only\n";
    }
    std::cout << "evolution status=" << evolution.status
              << " halt=" << evolution.halt_code
              << " accepted_end=" << evolution.accepted_end_time
              << " accepted_steps=" << evolution.accepted_step_count
              << " rejected_steps=" << evolution.rejected_step_count
              << " final_cycles=" << final.time / gPeriod
              << " final_amplitude=" << final.amplitude
              << " amplitude_ratio="
              << (initial.amplitude > 0.0
                      ? final.amplitude / initial.amplitude
                      : std::numeric_limits<double>::quiet_NaN())
              << " max_radius=" << final.maximum_radius
              << " max_speed=" << final.maximum_speed << '\n';
    std::cout << "growth slope_stride_1="
              << log_slope(samples, 1U, fit_start, 0.25)
              << " slope_stride_2="
              << log_slope(samples, 2U, fit_start, 0.25)
              << " slope_stride_5="
              << log_slope(samples, 5U, fit_start, 0.25)
              << " slope_stride_10="
              << log_slope(samples, 10U, fit_start, 0.25) << '\n';
    std::cout << "timing total=" << evolution.timing.total_wall_seconds
              << " root_batch="
              << evolution.timing.exact_root_batch_wall_seconds
              << " correction=" << evolution.timing.correction_wall_seconds
              << " mpfr_attempts="
              << evolution.timing.root_mpfr_attempt_count << '\n';
    const bool control_completed = !control_evolution.has_value() ||
        control_evolution->status == "completed";
    return control_completed && evolution.status == "completed"
        ? 0
        : 3;
  } catch (const std::exception& error) {
    std::cerr << "section-86-direct-evolution error: " << error.what() << '\n';
    return 1;
  }
}
