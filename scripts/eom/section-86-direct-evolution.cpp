#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/CoupledEvolution.hpp"

#include <algorithm>
#include <array>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <fstream>
#include <filesystem>
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
  double prehistory_amplitude = 0.03;
  double omega_scale = 1.0;
  std::string seed = "imx";
  std::string prehistory_seed = "circular";
  std::string chart = "sharp";
  double acceleration_tolerance = 5e-3;
  double quadrature_tolerance = 5e-3;
  double position_tolerance = 2e-6;
  double velocity_tolerance = 2e-6;
  std::string output;
  std::string state_output;
  std::string checkpoint_output;
  std::string failed_candidate_output_prefix;
  bool snapshot_only = false;
  bool skip_control = false;
  bool adaptive_step_growth = false;
  bool continuous_adaptive_step = false;
  bool synchronized_multirate = false;
  bool certificate_cost_feedback = false;
  std::size_t certificate_cost_probe_adjustments = 1;
  double certificate_cost_probe_scale = 0.5;
  bool analytic_pinned_fold = true;
  bool correlated_self_chord = true;
  bool stable_circular_residual = true;
  bool pinned_fold_aware_temporal_step = true;
  bool warm_root_exclusion = true;
  std::size_t thread_count = 8;
  std::size_t heartbeat_steps = 100;
  std::size_t accepted_steps = 0;
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

void write_failed_candidate_histories_atomic(
    const std::string& path,
    const std::string& start_time,
    const std::string& reception_time,
    const std::string& failure_code,
    std::size_t correction_iteration,
    const std::vector<eom::NativePublishedPath>& histories) {
  const std::string temporary = path + ".tmp";
  std::ofstream stream(temporary, std::ios::trunc);
  if (!stream) {
    throw std::runtime_error("failed to open failed-candidate output");
  }
  stream << "start_time\treception_time\tfailure_code\tcorrection_iteration"
            "\tpath_id\thistory_id"
            "\thistory_fingerprint\tsegment_index\tt_start\tt_end"
            "\tx0\tx1\tx2\tx3\ty0\ty1\ty2\ty3"
            "\tz0\tz1\tz2\tz3\tposition_error\tvelocity_error\n";
  for (const auto& path_record : histories) {
    std::size_t segment_index = 0U;
    for (const auto& segment : path_record.history.segments()) {
      stream << start_time << '\t' << reception_time << '\t'
             << failure_code << '\t' << correction_iteration << '\t'
             << path_record.path_id << '\t'
             << path_record.history.history_id() << '\t'
             << path_record.history.provenance_fingerprint() << '\t'
             << segment_index << '\t' << segment.t_start_token() << '\t'
             << segment.t_end_token();
      for (const auto& axis : segment.coefficient_tokens()) {
        for (const auto& coefficient : axis) {
          stream << '\t' << coefficient;
        }
      }
      stream << '\t' << segment.position_error_token() << '\t'
             << segment.velocity_error_token() << '\n';
      ++segment_index;
    }
  }
  stream.flush();
  if (!stream) {
    throw std::runtime_error("failed to write failed-candidate output");
  }
  stream.close();
  std::filesystem::rename(temporary, path);
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

Vector add(const Vector& left, const Vector& right) {
  return {left[0] + right[0], left[1] + right[1], left[2] + right[2]};
}

Vector scale(const Vector& value, double factor) {
  return {factor * value[0], factor * value[1], factor * value[2]};
}

Vector cross(const Vector& left, const Vector& right) {
  return {left[1] * right[2] - left[2] * right[1],
          left[2] * right[0] - left[0] * right[2],
          left[0] * right[1] - left[1] * right[0]};
}

Vector rotate_x(const Vector& value, double angle) {
  const double cosine = std::cos(angle);
  const double sine = std::sin(angle);
  return {value[0], cosine * value[1] - sine * value[2],
          sine * value[1] + cosine * value[2]};
}

Vector rotate_y(const Vector& value, double angle) {
  const double cosine = std::cos(angle);
  const double sine = std::sin(angle);
  return {cosine * value[0] + sine * value[2], value[1],
          -sine * value[0] + cosine * value[2]};
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

struct SeedHistoryState {
  Vector position;
  Vector velocity;
};

std::pair<double, double> prehistory_envelope(double time, double depth) {
  const double phase = kPi * time / depth;
  const double envelope =
      std::sin(phase) * std::sin(phase) +
      0.35 * std::sin(2.0 * phase) * std::sin(2.0 * phase);
  const double derivative =
      (kPi / depth) *
      (std::sin(2.0 * phase) + 0.7 * std::sin(4.0 * phase));
  return {envelope, derivative};
}

SeedHistoryState custom_seed_state(
    const Options& options, const Layer& layer, int sign,
    std::size_t layer_index, double endpoint_tilt_x,
    double endpoint_tilt_y, double time) {
  const double nominal_radius = layer.radius * std::cos(layer.alpha);
  const double tangential_speed = std::abs(nominal_radius * gOmega);
  const double cylindrical_radius = tangential_speed / std::abs(gOmega);
  const double height = sign * layer.radius * std::sin(layer.alpha);
  const double phase = layer.phase + (sign < 0 ? kPi : 0.0) + gOmega * time;
  const auto [envelope, envelope_derivative] =
      prehistory_envelope(time, options.history_depth);

  double radius = cylindrical_radius;
  double radial_velocity = 0.0;
  double tilt_x = endpoint_tilt_x;
  double tilt_x_velocity = 0.0;
  if (options.prehistory_seed == "radial-breath" ||
      options.prehistory_seed == "radial-breath-io") {
    radius *= 1.0 + options.prehistory_amplitude * envelope;
    radial_velocity = cylindrical_radius * options.prehistory_amplitude *
        envelope_derivative;
  } else if (options.prehistory_seed == "tilt-modulated" ||
             options.prehistory_seed == "tilt-modulated-io") {
    constexpr std::array<double, 3> layer_pattern{1.0, -1.0, -0.5};
    tilt_x += layer_pattern[layer_index] * options.prehistory_amplitude *
        envelope;
    tilt_x_velocity = layer_pattern[layer_index] *
        options.prehistory_amplitude * envelope_derivative;
  } else {
    throw std::invalid_argument(
        "prehistory seed must be circular, radial-breath, radial-breath-io, "
        "tilt-modulated, or tilt-modulated-io");
  }

  const double cosine = std::cos(phase);
  const double sine = std::sin(phase);
  Vector position{radius * cosine, radius * sine, height};
  Vector velocity{
      radial_velocity * cosine - radius * gOmega * sine,
      radial_velocity * sine + radius * gOmega * cosine,
      0.0};

  position = rotate_x(position, tilt_x);
  velocity = add(
      rotate_x(velocity, tilt_x),
      scale(cross({1.0, 0.0, 0.0}, position), tilt_x_velocity));
  position = rotate_y(position, endpoint_tilt_y);
  velocity = rotate_y(velocity, endpoint_tilt_y);
  return {position, velocity};
}

eom::RetainedHistory custom_seed_history(
    const Options& options, const std::string& id, const Layer& layer,
    int sign, std::size_t layer_index, double endpoint_tilt_x,
    double endpoint_tilt_y) {
  const std::size_t segment_count = static_cast<std::size_t>(
      std::ceil(options.history_depth / options.history_segment_step));
  if (segment_count == 0U) {
    throw std::invalid_argument("custom V5 prehistory has no segments");
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
    const auto start = custom_seed_state(
        options, layer, sign, layer_index, endpoint_tilt_x,
        endpoint_tilt_y, t0);
    const auto end = custom_seed_state(
        options, layer, sign, layer_index, endpoint_tilt_x,
        endpoint_tilt_y, t1);
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
    // The piecewise cubic is the admitted retained history. These enclosures
    // absorb decimal construction roundoff at exact segment joins.
    segments.emplace_back(
        token(t0), token(t1), std::move(coefficients), "1e-14", "1e-13");
  }
  return eom::RetainedHistory(id, std::move(segments));
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
      const bool io_seed =
          options.prehistory_seed == "radial-breath-io" ||
          options.prehistory_seed == "tilt-modulated-io";
      const bool use_circular_history =
          options.prehistory_seed == "circular" ||
          (io_seed && layer_index == 1U);
      const auto history = use_circular_history
          ? circular_history(
                path_id + "-history", layers[layer_index], sign,
                tilts.x[layer_index], tilts.y[layer_index],
                options.history_depth, options.history_segment_step)
          : custom_seed_history(
                options, path_id + "-history", layers[layer_index], sign,
                layer_index, tilts.x[layer_index], tilts.y[layer_index]);
      paths.push_back({
          path_id, sign > 0 ? kCharge : kNegativeCharge,
          std::move(history)});
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

void write_endpoint_states(
    const std::string& output,
    const eom::NativeCoupledEvolutionCertificate& evolution) {
  if (output.empty()) return;
  std::ofstream stream(output);
  if (!stream) {
    throw std::runtime_error("cannot open endpoint-state output: " + output);
  }
  stream << "accepted_step,time,path_id,x,y,z,vx,vy,vz,"
            "x_radius,y_radius,z_radius,vx_radius,vy_radius,vz_radius\n";
  stream << std::setprecision(17);
  std::size_t accepted_step = 0U;
  for (const auto& step : evolution.steps) {
    if (step.status != "accepted") continue;
    ++accepted_step;
    const eom::Interval time = eom::Interval::decimal_token(step.accepted_time);
    for (const auto& path : step.published_histories) {
      const auto position = path.history.position_hull(time);
      const auto velocity = path.history.velocity_hull(time);
      stream << accepted_step << ',' << step.accepted_time << ','
             << path.path_id;
      for (const auto& component : position) {
        stream << ',' << component.midpoint();
      }
      for (const auto& component : velocity) {
        stream << ',' << component.midpoint();
      }
      for (const auto& component : position) {
        stream << ',' << 0.5 * component.width();
      }
      for (const auto& component : velocity) {
        stream << ',' << 0.5 * component.width();
      }
      stream << '\n';
    }
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
    options.prehistory_amplitude = option_double(
        argc, argv, "prehistory-amplitude", options.prehistory_amplitude);
    options.prehistory_seed = option_string(
        argc, argv, "prehistory-seed", options.prehistory_seed);
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
    options.state_output =
        option_string(argc, argv, "state-output", options.state_output);
    options.checkpoint_output = option_string(
        argc, argv, "checkpoint-output", options.checkpoint_output);
    options.failed_candidate_output_prefix = option_string(
        argc, argv, "failed-candidate-output-prefix",
        options.failed_candidate_output_prefix);
    options.thread_count =
        option_size(argc, argv, "thread-count", options.thread_count);
    options.heartbeat_steps =
        option_size(argc, argv, "heartbeat-steps", options.heartbeat_steps);
    options.accepted_steps =
        option_size(argc, argv, "accepted-steps", options.accepted_steps);
    options.certificate_cost_probe_adjustments = option_size(
        argc, argv, "certificate-cost-probe-adjustments",
        options.certificate_cost_probe_adjustments);
    options.certificate_cost_probe_scale = option_double(
        argc, argv, "certificate-cost-probe-scale",
        options.certificate_cost_probe_scale);
    options.snapshot_only = has_flag(argc, argv, "snapshot-only");
    options.skip_control = has_flag(argc, argv, "skip-control");
    options.adaptive_step_growth =
        has_flag(argc, argv, "adaptive-step-growth");
    options.continuous_adaptive_step =
        has_flag(argc, argv, "continuous-adaptive-step");
    options.synchronized_multirate =
        has_flag(argc, argv, "synchronized-multirate");
    options.certificate_cost_feedback =
        has_flag(argc, argv, "certificate-cost-feedback");
    options.analytic_pinned_fold =
        !has_flag(argc, argv, "disable-analytic-pinned-fold");
    options.correlated_self_chord =
        !has_flag(argc, argv, "disable-correlated-self-chord");
    options.stable_circular_residual =
        !has_flag(argc, argv, "disable-stable-circular-residual");
    options.pinned_fold_aware_temporal_step =
        !has_flag(argc, argv, "disable-pinned-fold-temporal-step");
    options.warm_root_exclusion =
        !has_flag(argc, argv, "disable-warm-root-exclusion");

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
        .thread_count = options.thread_count,
        .use_adaptive_step_growth = options.adaptive_step_growth,
        .use_continuous_adaptive_step =
            options.continuous_adaptive_step,
        .use_synchronized_multirate_publication =
            options.synchronized_multirate,
        .use_certificate_cost_feedback =
            options.certificate_cost_feedback,
        .certificate_cost_maximum_probe_adjustments =
            options.certificate_cost_probe_adjustments,
        .certificate_cost_probe_scale =
            token(options.certificate_cost_probe_scale),
        .use_analytic_pinned_fold = options.analytic_pinned_fold,
        .use_correlated_self_chord = options.correlated_self_chord,
        .use_stable_circular_residual =
            options.stable_circular_residual,
        .use_pinned_fold_aware_temporal_step =
            options.pinned_fold_aware_temporal_step,
        .use_warm_root_exclusion = options.warm_root_exclusion,
        .diagnostic_maximum_accepted_steps = options.accepted_steps,
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
                  << " analytic_fold_cells="
                  << pair.analytic_fold_visited_cells
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
    control_options.prehistory_seed = "circular";
    const auto control_paths = make_paths(control_options);
    std::vector<eom::NativePublishedPath> control_initial_histories;
    for (const auto& path : control_paths) {
      control_initial_histories.push_back({path.path_id, path.history});
    }
    const Sample initial = measure_difference(
        control_initial_histories, initial_histories, "0");
    double maximum_endpoint_position_difference = 0.0;
    double maximum_endpoint_velocity_difference = 0.0;
    for (std::size_t index = 0; index < initial_histories.size(); ++index) {
      const State control = state_at(control_initial_histories[index].history, "0");
      const State candidate = state_at(initial_histories[index].history, "0");
      maximum_endpoint_position_difference = std::max(
          maximum_endpoint_position_difference,
          norm(subtract(candidate.x, control.x)));
      maximum_endpoint_velocity_difference = std::max(
          maximum_endpoint_velocity_difference,
          norm(subtract(candidate.v, control.v)));
    }
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
              << " continuous_adaptive_step="
              << options.continuous_adaptive_step
              << " synchronized_multirate="
              << options.synchronized_multirate
              << " certificate_cost_feedback="
              << options.certificate_cost_feedback
              << " certificate_cost_probe_adjustments="
              << options.certificate_cost_probe_adjustments
              << " certificate_cost_probe_scale="
              << options.certificate_cost_probe_scale
              << " analytic_pinned_fold="
              << options.analytic_pinned_fold
              << " pinned_fold_aware_temporal_step="
              << options.pinned_fold_aware_temporal_step
              << " warm_root_exclusion=" << options.warm_root_exclusion
              << " chart=" << options.chart
              << " acceleration_tolerance="
              << options.acceleration_tolerance
              << " quadrature_tolerance="
              << options.quadrature_tolerance
              << " position_tolerance=" << options.position_tolerance
              << " velocity_tolerance=" << options.velocity_tolerance
              << " thread_count=" << options.thread_count
              << " diagnostic_accepted_steps=" << options.accepted_steps
              << " seed=" << options.seed
              << " seed_scale=" << options.amplitude
              << " prehistory_seed=" << options.prehistory_seed
              << " prehistory_amplitude=" << options.prehistory_amplitude
              << " endpoint_position_match="
              << maximum_endpoint_position_difference
              << " endpoint_velocity_match="
              << maximum_endpoint_velocity_difference
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
    const auto attach_heartbeat = [&](auto& run_request, const char* label) {
      const auto heartbeat_start = std::chrono::steady_clock::now();
      std::cerr << "heartbeat run=" << label
                << " step=0 t=" << run_request.start_time
                << " wall_seconds=0" << std::endl;
      run_request.accepted_step_callback =
          [heartbeat_start, interval = options.heartbeat_steps,
           label](std::size_t step_index, const std::string& time) {
            if (interval == 0U || step_index % interval != 0U) {
              return;
            }
            const double wall_seconds = std::chrono::duration<double>(
                std::chrono::steady_clock::now() - heartbeat_start).count();
            std::cerr << "heartbeat run=" << label
                      << " step=" << step_index
                      << " t=" << time
                      << " wall_seconds=" << wall_seconds << std::endl;
          };
    };
    std::optional<eom::NativeCoupledEvolutionCertificate> control_evolution;
    if (!options.skip_control) {
      attach_heartbeat(control_request, "control");
      control_evolution =
          eom::evolve_native_coupled_histories(control_request);
    }
    attach_heartbeat(request, "perturbed");
    if (!options.failed_candidate_output_prefix.empty()) {
      request.failed_substep_candidate_callback =
          [prefix = options.failed_candidate_output_prefix,
           sequence = std::size_t{0}](
              const std::string& start_time,
              const std::string& reception_time,
              const std::string& failure_code,
              std::size_t correction_iteration,
              const std::vector<eom::NativePublishedPath>& histories) mutable {
            const std::string path =
                prefix + ".candidate-" + std::to_string(sequence++) + ".tsv";
            write_failed_candidate_histories_atomic(
                path, start_time, reception_time, failure_code,
                correction_iteration, histories);
            std::cerr << "failed_candidate start=" << start_time
                      << " t=" << reception_time
                      << " failure=" << failure_code
                      << " iteration=" << correction_iteration
                      << " output=" << path << std::endl;
          };
    }
    const auto evolution = eom::evolve_native_coupled_histories(request);
    if (!options.checkpoint_output.empty()) {
      eom::write_native_evolution_checkpoint_atomic(
          options.checkpoint_output,
          eom::create_native_evolution_checkpoint(request, evolution));
      std::cerr << "checkpoint accepted_step="
                << evolution.accepted_step_count
                << " t=" << evolution.accepted_end_time
                << " output=" << options.checkpoint_output << std::endl;
    }
    const auto report_steps = [](const char* label, const auto& run) {
      for (const auto& step : run.steps) {
        if (step.status == "accepted") {
          std::size_t uncertified_root_rows = 0U;
          std::size_t caustic_routes = 0U;
          std::size_t finite_width_pairs = 0U;
          std::size_t maximum_quadrature_cells = 0U;
          std::size_t maximum_analytic_fold_cells = 0U;
          std::size_t maximum_correlated_self_chord_cells = 0U;
          std::size_t maximum_stable_circular_residual_cells = 0U;
          std::size_t maximum_root_reevaluated_cells = 0U;
          std::size_t maximum_root_warm_excluded_cells = 0U;
          bool middle_endpoint_continuation = false;
          bool middle_interior_fold = false;
          const auto observe_snapshot_cost = [&](const auto& observed) {
            for (const auto& row : observed.root_certificates) {
              maximum_root_reevaluated_cells = std::max(
                  maximum_root_reevaluated_cells,
                  row.certificate.reevaluated_cells);
              maximum_root_warm_excluded_cells = std::max(
                  maximum_root_warm_excluded_cells,
                  row.certificate.warm_excluded_cells);
            }
            for (const auto& pair :
                 observed.acceleration.pair_certificates) {
              maximum_quadrature_cells = std::max(
                  maximum_quadrature_cells,
                  pair.quadrature_visited_cells);
              maximum_analytic_fold_cells = std::max(
                  maximum_analytic_fold_cells,
                  pair.analytic_fold_visited_cells);
              maximum_correlated_self_chord_cells = std::max(
                  maximum_correlated_self_chord_cells,
                  pair.correlated_self_chord_visited_cells);
              maximum_stable_circular_residual_cells = std::max(
                  maximum_stable_circular_residual_cells,
                  pair.stable_circular_residual_visited_cells);
            }
          };
          if (step.accepted_snapshot.has_value()) {
            observe_snapshot_cost(*step.accepted_snapshot);
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
              }
            }
          }
          if (step.recertification_snapshot.has_value()) {
            observe_snapshot_cost(*step.recertification_snapshot);
          }
          double maximum_position_error = 0.0;
          double maximum_velocity_error = 0.0;
          double maximum_multirate_position_error = 0.0;
          double maximum_multirate_velocity_error = 0.0;
          std::size_t pinned_fold_onset_paths = 0U;
          for (const auto& substep : step.substeps) {
            observe_snapshot_cost(substep.start_snapshot);
            if (substep.endpoint_snapshot.has_value()) {
              observe_snapshot_cost(*substep.endpoint_snapshot);
            }
            pinned_fold_onset_paths = std::max(
                pinned_fold_onset_paths,
                substep.pinned_fold_onset_certificates.size());
            for (const auto& onset :
                 substep.pinned_fold_onset_certificates) {
              if (onset.path_id == "M+" || onset.path_id == "M-") {
                middle_endpoint_continuation = true;
              }
            }
            for (const auto& continuation :
                 substep.endpoint_root_continuations) {
              if ((continuation.receiver_path_id == "M+" ||
                   continuation.receiver_path_id == "M-") &&
                  continuation.receiver_path_id ==
                      continuation.source_path_id) {
                middle_endpoint_continuation = true;
              }
            }
            for (const auto& event : substep.event_impulses) {
              if ((event.receiver_path_id == "M+" ||
                   event.receiver_path_id == "M-") &&
                  event.receiver_path_id == event.source_path_id) {
                middle_interior_fold = true;
              }
            }
          }
          std::string middle_self_root_classification =
              "no_root_topology_change";
          if (middle_endpoint_continuation && middle_interior_fold) {
            middle_self_root_classification = "mixed";
          } else if (middle_endpoint_continuation) {
            middle_self_root_classification =
                "coincident_endpoint_root_continuation";
          } else if (middle_interior_fold) {
            middle_self_root_classification = "interior_fold";
          }
          for (const auto& error : step.local_errors) {
            maximum_position_error = std::max(
                maximum_position_error, error.position_error);
            maximum_velocity_error = std::max(
                maximum_velocity_error, error.velocity_error);
          }
          for (const auto& error : step.multirate_synchronization_errors) {
            maximum_multirate_position_error = std::max(
                maximum_multirate_position_error, error.position_error);
            maximum_multirate_velocity_error = std::max(
                maximum_multirate_velocity_error, error.velocity_error);
          }
          std::ostringstream multirate_coarse_paths;
          for (std::size_t index = 0;
               index < step.multirate_coarse_path_ids.size(); ++index) {
            if (index > 0U) multirate_coarse_paths << ',';
            multirate_coarse_paths << step.multirate_coarse_path_ids[index];
          }
          std::cerr << label << " step=" << step.step_index
                    << " status=accepted"
                    << " accepted_time=" << step.accepted_time
                    << " step_size="
                    << (std::stod(step.accepted_time) -
                        std::stod(step.attempted_start))
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
                    << " maximum_analytic_fold_cells="
                    << maximum_analytic_fold_cells
                    << " maximum_correlated_self_chord_cells="
                    << maximum_correlated_self_chord_cells
                    << " maximum_stable_circular_residual_cells="
                    << maximum_stable_circular_residual_cells
                    << " maximum_root_reevaluated_cells="
                    << maximum_root_reevaluated_cells
                    << " maximum_root_warm_excluded_cells="
                    << maximum_root_warm_excluded_cells
                    << " history_window_active_lower="
                    << (step.accepted_snapshot.has_value()
                            ? step.accepted_snapshot->causal_prefix_exclusion
                                  .active_search_lower
                            : "")
                    << " history_window_excluded_duration="
                    << (step.accepted_snapshot.has_value()
                            ? step.accepted_snapshot->causal_prefix_exclusion
                                  .excluded_duration
                            : 0.0)
                    << " history_window_separation_upper="
                    << (step.accepted_snapshot.has_value()
                            ? step.accepted_snapshot->causal_prefix_exclusion
                                  .separation_upper
                            : 0.0)
                    << " step_wall_seconds="
                    << step.timing.total_wall_seconds
                    << " middle_self_root_classification="
                    << middle_self_root_classification
                    << " maximum_position_error="
                    << maximum_position_error
                    << " maximum_velocity_error="
                    << maximum_velocity_error
                    << " multirate_coarse_paths="
                    << (step.multirate_coarse_path_ids.empty()
                            ? "none"
                            : multirate_coarse_paths.str())
                    << " maximum_multirate_position_error="
                    << maximum_multirate_position_error
                    << " maximum_multirate_velocity_error="
                    << maximum_multirate_velocity_error
                    << " certificate_cost_probe="
                    << step.certificate_cost_probe
                    << " certificate_cost_deferred_pairs="
                    << step.certificate_cost_deferred_pair_count
                    << " certificate_cost_mpfr_attempts="
                    << step.certificate_cost_mpfr_attempt_count
                    << " certificate_cost_cooldown_remaining="
                    << step.certificate_cost_cooldown_remaining
                    << " pinned_fold_onset_paths="
                    << pinned_fold_onset_paths << '\n';
        } else {
          std::cerr << label << " step=" << step.step_index
                    << " status=" << step.status
                    << " failure=" << step.failure_code
                    << " certificate_cost_probe="
                    << step.certificate_cost_probe
                    << " certificate_cost_deferred_pairs="
                    << step.certificate_cost_deferred_pair_count
                    << " certificate_cost_mpfr_attempts="
                    << step.certificate_cost_mpfr_attempt_count << '\n';
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
    write_endpoint_states(options.state_output, evolution);
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
    std::size_t accepted_corrector_iterations = 0U;
    std::size_t rejected_corrector_iterations = 0U;
    std::size_t accepted_corrector_substeps = 0U;
    std::size_t rejected_corrector_substeps = 0U;
    double correction_snapshot_wall_seconds = 0.0;
    std::vector<std::size_t> corrector_iterations;
    double accepted_step_size = 0.0;
    for (const auto& step : evolution.steps) {
      if (step.status == "accepted") {
        accepted_step_size = std::stod(step.accepted_time) -
            std::stod(step.attempted_start);
      }
      for (const auto& substep : step.substeps) {
        corrector_iterations.push_back(substep.correction_iterations);
        correction_snapshot_wall_seconds +=
            substep.timing.snapshot_total_wall_seconds;
        if (substep.status == "accepted_candidate") {
          ++accepted_corrector_substeps;
          accepted_corrector_iterations += substep.correction_iterations;
        } else {
          ++rejected_corrector_substeps;
          rejected_corrector_iterations += substep.correction_iterations;
        }
      }
    }
    const double corrector_exclusive_wall_seconds = std::max(
        0.0,
        evolution.timing.correction_wall_seconds -
            correction_snapshot_wall_seconds -
            evolution.timing.history_copy_hash_wall_seconds);
    std::cout << "evolution status=" << evolution.status
              << " halt=" << evolution.halt_code
              << " accepted_end=" << evolution.accepted_end_time
              << " attempted_steps=" << evolution.steps.size()
              << " accepted_steps=" << evolution.accepted_step_count
              << " rejected_steps=" << evolution.rejected_step_count
              << " controller_step_size="
              << evolution.controller_step_size
              << " certificate_cost_cooldown_remaining="
              << evolution.controller_certificate_cost_cooldown_remaining
              << " accepted_step_size=" << accepted_step_size
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
              << " snapshot_total="
              << evolution.timing.snapshot_total_wall_seconds
              << " snapshot_count=" << evolution.timing.snapshot_count
              << " history_window="
              << evolution.timing.history_window_wall_seconds
              << " traversal=" << evolution.timing.traversal_wall_seconds
              << " root_batch="
              << evolution.timing.exact_root_batch_wall_seconds
              << " root_binary64_cpu="
              << evolution.timing.root_binary64_cpu_seconds
              << " root_pair_count="
              << evolution.timing.root_pair_count
              << " root_reevaluated_cells="
              << evolution.timing.root_reevaluated_cells
              << " root_warm_excluded_cells="
              << evolution.timing.root_warm_excluded_cells
              << " root_mpfr_cpu="
              << evolution.timing.root_mpfr_cpu_seconds
              << " root_mpfr_escalation_cpu="
              << evolution.timing.root_mpfr_escalation_cpu_seconds
              << " root_mpfr_escalation_attempts="
              << evolution.timing.root_mpfr_escalation_attempt_count
              << " root_mpfr_pairs="
              << evolution.timing.root_mpfr_pair_count
              << " acceleration="
              << evolution.timing.acceleration_wall_seconds
              << " finite_width_union="
              << evolution.timing.finite_width_execution_union_wall_seconds
              << " sharp_union="
              << evolution.timing.sharp_execution_union_wall_seconds
              << " finite_sharp_overlap="
              << evolution.timing.finite_width_sharp_overlap_wall_seconds
              << " acceleration_worker_idle="
              << evolution.timing
                     .acceleration_worker_idle_orchestration_wall_seconds
              << " acceleration_precision_escalation_worker="
              << evolution.timing
                     .acceleration_precision_escalation_worker_seconds
              << " acceleration_precision_escalation_attempts="
              << evolution.timing
                     .acceleration_precision_escalation_attempt_count
              << " history_copy_hash="
              << evolution.timing.history_copy_hash_wall_seconds
              << " correction=" << evolution.timing.correction_wall_seconds
              << " correction_snapshot="
              << correction_snapshot_wall_seconds
              << " corrector_exclusive="
              << corrector_exclusive_wall_seconds
              << " recertification="
              << evolution.timing.recertification_wall_seconds
              << " rejection=" << evolution.timing.rejection_wall_seconds
              << " mpfr_attempts="
              << evolution.timing.root_mpfr_attempt_count
              << " accepted_corrector_substeps="
              << accepted_corrector_substeps
              << " rejected_corrector_substeps="
              << rejected_corrector_substeps
              << " accepted_corrector_iterations="
              << accepted_corrector_iterations
              << " rejected_corrector_iterations="
              << rejected_corrector_iterations
              << " corrector_iterations=";
    for (std::size_t index = 0; index < corrector_iterations.size(); ++index) {
      if (index > 0U) {
        std::cout << ',';
      }
      std::cout << corrector_iterations[index];
    }
    std::cout << '\n';
    const auto expected_completion = [&](const auto& run) {
      return run.status == "completed" ||
          (options.accepted_steps > 0U &&
           run.halt_code == "diagnostic_accepted_step_limit_reached" &&
           run.accepted_step_count == options.accepted_steps);
    };
    const bool control_completed = !control_evolution.has_value() ||
        expected_completion(*control_evolution);
    return control_completed && expected_completion(evolution)
        ? 0
        : 3;
  } catch (const std::exception& error) {
    std::cerr << "section-86-direct-evolution error: " << error.what() << '\n';
    return 1;
  }
}
