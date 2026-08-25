// EOM Attractor Search — Phase 2 headless ensemble harness.
//
// Extends the Phase 0 profiler (attractor-phase0-release-profile.cpp) into
// the checkpoint-chunked release harness the workstream priorities declare:
//
//   - declared deterministic seed families (exact counts, seed offsets, all
//     tangential speeds strictly off the v = c_f pin);
//   - endpoint-matched prehistory families for the collapse discipline
//     (uniform-circular via the provenance-bound factory, and a straight
//     constant-velocity family built as one exact linear segment);
//   - a release-time root-clearance check (every ordered pair must certify
//     complete before the run proceeds);
//   - checkpointed chunks: each chunk's evolution certificate is processed
//     and discarded before the next chunk starts, bounding memory (the
//     Phase 0 profile measured certificate retention at ~0.5 GB/step at
//     N = 24 — holding a long release's full certificate is not viable);
//   - streamed observables: a cluster/escape census JSONL row per chunk
//     and Borg-replayable frame rows (borg-fixture-trajectory.v1 shape)
//     appended as JSONL, wrapped into a single replay JSON at completion;
//   - exact assembly-view-record.v0 publication from the EOM checkpoint's
//     retained histories; sampled replay rows never supply record state;
//   - heartbeats on every accepted step and every chunk; atomic checkpoint
//     files so a killed run resumes with --resume.
//
// The harness is an instrument host, not a physics claim. Trajectory output
// carries the honest evidence grade of the native response
// (executable_architecture_evidence; canonicalEomEvidence stays false while
// Borg shadow output remains noncanonical). Census definitions are declared
// knobs recorded in the run manifest; persistence adjudication belongs to
// the Phase 4 collapse protocol, not to this file.
//
// Build (Linux profiling sandbox example):
//   c++ -std=c++20 -O3 -DNDEBUG -Isrc/eom/include \
//     scripts/eom/attractor-ensemble-harness.cpp \
//     <build>/libeom_native.a -lmpfr -lgmp -pthread \
//     -o attractor-ensemble-harness

#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/History.hpp"

#include <algorithm>
#include <array>
#include <chrono>
#include <cmath>
#include <cstddef>
#include <cstdint>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <numeric>
#include <optional>
#include <sstream>
#include <stdexcept>
#include <string>
#include <string_view>
#include <vector>

namespace eom = architrino::eom;

namespace {

constexpr double kPi = 3.141592653589793238462643383279502884;
constexpr const char* kCharge = "0.1666666666666666666666666666666667";
constexpr const char* kNegativeCharge =
    "-0.1666666666666666666666666666666667";
// Declared workload coupling: 36 * kappa_eq. A declared choice, not a bind fit.
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

bool has_flag(int argc, char** argv, const std::string& name) {
  const std::string flag = "--" + name;
  for (int index = 1; index < argc; ++index) {
    if (flag == argv[index]) {
      return true;
    }
  }
  return false;
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
  double tilt_x = 0.0;
  double tilt_y = 0.0;
  double center_x = 0.0;
  double center_y = 0.0;
  double center_z = 0.0;
  std::array<double, 3> frame_p = {1.0, 0.0, 0.0};
  std::array<double, 3> frame_q = {0.0, 1.0, 0.0};
};

std::vector<SeedRow> f6c_cubic_lattice_rows(
    std::size_t side, double spacing, double orbit_radius,
    double angular_rate, const std::string& orientation_field) {
  const bool site_local = orientation_field == "tetrahedral-parity-v1";
  if (!site_local && orientation_field != "global-plane-v1") {
    throw std::invalid_argument(
        "cubic orientation field must be global-plane-v1 or "
        "tetrahedral-parity-v1");
  }
  std::vector<SeedRow> rows;
  rows.reserve(side * side * side);
  std::array<std::array<double, 3>, 3> normal_second_moment{};
  const double center_index =
      (static_cast<double>(side) - 1.0) / 2.0;
  for (std::size_t gx = 0; gx < side; ++gx) {
    for (std::size_t gy = 0; gy < side; ++gy) {
      for (std::size_t gz = 0; gz < side; ++gz) {
        const int polarity = ((gx + gy + gz) % 2U == 0U) ? +1 : -1;
        const std::string coordinate = side == 2U
            ? std::to_string(gx) + std::to_string(gy) + std::to_string(gz)
            : std::to_string(gx) + "_" + std::to_string(gy) + "_" +
                  std::to_string(gz);
        SeedRow row{
            "g" + coordinate + (polarity > 0 ? "+" : "-"),
            polarity > 0 ? kCharge : kNegativeCharge,
            orbit_radius,
            (static_cast<double>(gz) - center_index) * spacing,
            polarity > 0 ? 0.0 : kPi,
            orbit_radius * angular_rate,
            +1,
            0.0,
            0.0,
            (static_cast<double>(gx) - center_index) * spacing,
            (static_cast<double>(gy) - center_index) * spacing,
            (static_cast<double>(gz) - center_index) * spacing,
        };
        if (site_local) {
          const double sx = gx % 2U == 0U ? 1.0 : -1.0;
          const double sy = gy % 2U == 0U ? 1.0 : -1.0;
          const double sz = gz % 2U == 0U ? 1.0 : -1.0;
          const double inverse_sqrt_two = 1.0 / std::sqrt(2.0);
          const double inverse_sqrt_six = 1.0 / std::sqrt(6.0);
          const double inverse_sqrt_three = 1.0 / std::sqrt(3.0);
          row.frame_p = {
              sy * inverse_sqrt_two, -sx * inverse_sqrt_two, 0.0};
          row.frame_q = {
              sx * sz * inverse_sqrt_six,
              sy * sz * inverse_sqrt_six,
              -2.0 * inverse_sqrt_six};
          const std::array<double, 3> normal = {
              sx * inverse_sqrt_three,
              sy * inverse_sqrt_three,
              sz * inverse_sqrt_three};
          for (std::size_t left = 0; left < 3U; ++left) {
            for (std::size_t right = 0; right < 3U; ++right) {
              normal_second_moment[left][right] +=
                  normal[left] * normal[right];
            }
          }
        }
        rows.push_back(row);
      }
    }
  }
  if (site_local) {
    const double inverse_population = 1.0 / static_cast<double>(rows.size());
    for (std::size_t left = 0; left < 3U; ++left) {
      for (std::size_t right = 0; right < 3U; ++right) {
        const double expected = left == right ? 1.0 / 3.0 : 0.0;
        if (std::abs(normal_second_moment[left][right] * inverse_population -
                     expected) > 1e-12) {
          throw std::runtime_error(
              "tetrahedral-parity orientation failed its exact second-rank "
              "cubic census");
        }
      }
    }
  }
  return rows;
}

// phase0-shell-v1 declared seed family (identical constants to the Phase 0
// profiler). `seed_offset` selects a distinct member of the ensemble by
// shifting the low-discrepancy index; exact counts are (population,
// seed_offset) pairs recorded in the run manifest.
std::vector<SeedRow> seed_rows(std::size_t population, std::size_t offset) {
  constexpr double kAlphaRadius = 0.6180339887498949;   // frac(phi)
  constexpr double kAlphaHeight = 0.41421356237309515;  // sqrt(2) - 1
  constexpr double kAlphaPhase = 0.7320508075688772;    // sqrt(3) - 1
  constexpr double kAlphaSpeed = 0.23606797749978967;   // sqrt(5) - 2
  constexpr double kAlphaSense = 0.6457513110645906;    // sqrt(7) - 2
  std::vector<SeedRow> rows;
  rows.reserve(population);
  for (std::size_t index = 0; index < population; ++index) {
    const std::size_t k = index + offset;
    SeedRow row;
    row.path_id = "a" + std::to_string(index);
    row.charge = (index % 2 == 0) ? kCharge : kNegativeCharge;
    row.radius = 1.5 + 2.0 * lds(k, kAlphaRadius);
    row.height = -1.2 + 2.4 * lds(k, kAlphaHeight);
    row.phase = 2.0 * kPi * lds(k, kAlphaPhase);
    row.speed = 0.35 + 0.30 * lds(k, kAlphaSpeed);
    row.sense = lds(k, kAlphaSense) < 0.5 ? 1 : -1;
    rows.push_back(row);
  }
  return rows;
}

std::vector<SeedRow> f6c_balanced_tetrahedral_rows(
    double positive_rate, double negative_rate, double negative_theta,
    double breathing_rate, double radial_breathing_ratio, double cycle_phase,
    double positive_h_amplitude, double negative_h_amplitude,
    double positive_rho_amplitude, double negative_rho_amplitude,
    double positive_phase_amplitude, double negative_phase_amplitude,
    double positive_h_phase_offset, double negative_h_phase_offset,
    double positive_rho_phase_offset, double negative_rho_phase_offset) {
  constexpr double kScale = 0.3;
  constexpr std::array<std::array<double, 3>, 4> kAxes = {{
      {{1.0, 1.0, 1.0}},
      {{1.0, -1.0, -1.0}},
      {{-1.0, 1.0, -1.0}},
      {{-1.0, -1.0, 1.0}},
  }};
  constexpr std::array<int, 4> kCirculationSigns = {-1, -1, 1, 1};
  constexpr std::array<double, 4> kPhases = {
      0.0, kPi, 4.0 * kPi / 3.0, kPi / 3.0};
  std::vector<SeedRow> rows;
  rows.reserve(8U);
  for (std::size_t module = 0; module < kAxes.size(); ++module) {
    const double inverse_norm = 1.0 / std::sqrt(3.0);
    const double nx = kAxes[module][0] * inverse_norm;
    const double ny = kAxes[module][1] * inverse_norm;
    const double nz = kAxes[module][2] * inverse_norm;
    const double tilt_x = -std::asin(ny);
    const double tilt_y = std::atan2(nx, nz);
    const double cos_x = std::cos(tilt_x);
    const double sin_x = std::sin(tilt_x);
    const double cos_y = std::cos(tilt_y);
    const double sin_y = std::sin(tilt_y);
    const double transverse_norm = std::hypot(nx, ny);
    const std::array<double, 3> desired_u = {
        -ny / transverse_norm, nx / transverse_norm, 0.0};
    const std::array<double, 3> rotated_x = {cos_y, 0.0, -sin_y};
    const std::array<double, 3> rotated_y = {
        sin_y * sin_x, cos_x, cos_y * sin_x};
    const auto dot3 = [](const auto& left, const auto& right) {
      return left[0] * right[0] + left[1] * right[1] +
          left[2] * right[2];
    };
    const double frame_phase = std::atan2(
        dot3(rotated_y, desired_u), dot3(rotated_x, desired_u));
    for (const int polarity : {+1, -1}) {
      const double rate = polarity > 0 ? positive_rate : negative_rate;
      const double h_amplitude = polarity > 0
          ? positive_h_amplitude : negative_h_amplitude;
      const double rho_amplitude = polarity > 0
          ? positive_rho_amplitude : negative_rho_amplitude;
      const double phase_amplitude = polarity > 0
          ? positive_phase_amplitude : negative_phase_amplitude;
      const double h_phase_offset = polarity > 0
          ? positive_h_phase_offset : negative_h_phase_offset;
      const double rho_phase_offset = polarity > 0
          ? positive_rho_phase_offset : negative_rho_phase_offset;
      const double endpoint_h =
          kScale + h_amplitude * std::sin(cycle_phase + h_phase_offset);
      const double endpoint_rho =
          kScale + rho_amplitude * std::sin(cycle_phase + rho_phase_offset);
      const double endpoint_h_rate =
          h_amplitude * breathing_rate *
              std::cos(cycle_phase + h_phase_offset);
      const double endpoint_rho_rate =
          rho_amplitude * breathing_rate * radial_breathing_ratio *
              std::cos(cycle_phase + rho_phase_offset);
      const double endpoint_theta_rate =
          rate - phase_amplitude * breathing_rate * std::sin(cycle_phase);
      const double endpoint_speed = std::sqrt(
          std::pow(endpoint_rho * endpoint_theta_rate, 2) +
          std::pow(endpoint_h_rate, 2) +
          std::pow(endpoint_rho_rate, 2));
      const double sector_theta =
          cycle_phase + phase_amplitude * std::cos(cycle_phase) +
          (polarity > 0 ? 0.0 : negative_theta);
      const double sector_phase =
          static_cast<double>(polarity * kCirculationSigns[module]) *
          sector_theta;
      rows.push_back({
          std::to_string(module) + (polarity > 0 ? "+" : "-"),
          polarity > 0 ? kCharge : kNegativeCharge,
          endpoint_rho,
          static_cast<double>(polarity) * endpoint_h,
          kPhases[module] + frame_phase + sector_phase,
          endpoint_speed,
          (endpoint_theta_rate >= 0.0 ? 1 : -1) * polarity *
              kCirculationSigns[module],
          tilt_x,
          tilt_y,
      });
    }
  }
  return rows;
}

struct Vector3 {
  double x = 0.0;
  double y = 0.0;
  double z = 0.0;
};

struct Campaign1Refinement {
  std::string id;
  double step;
  double history_segment_step;
  std::size_t root_max_depth;
  std::size_t chunk_steps;
};

struct Campaign1Coordinate {
  double separation;
  double speed;
  std::string angle_id;
  std::string prehistory_id;
  Campaign1Refinement refinement;
};

constexpr std::array<double, 3> kCampaign1Separations = {1.0, 2.0, 4.0};
constexpr std::array<double, 3> kCampaign1Speeds = {0.25, 0.50, 0.75};
constexpr std::array<const char*, 3> kCampaign1Angles = {"0", "pi4", "pi2"};
constexpr std::array<const char*, 3> kCampaign1Prehistories = {
    "P0-inertial", "P1-lateral", "P2-longitudinal"};
constexpr std::array<Campaign1Refinement, 3> kCampaign1Refinements = {{
    {"R0", 0.02, 0.10, 192, 5},
    {"R1", 0.01, 0.05, 224, 10},
    {"R2", 0.005, 0.025, 256, 20},
}};
constexpr double kCampaign1HistoryDepth = 20.0;

double campaign1_angle_radians(const std::string& angle_id) {
  if (angle_id == "0") return 0.0;
  if (angle_id == "pi4") return kPi / 4.0;
  if (angle_id == "pi2") return kPi / 2.0;
  throw std::invalid_argument("binary-angle must be 0, pi4, or pi2");
}

const Campaign1Refinement& campaign1_refinement(const std::string& id) {
  for (const auto& refinement : kCampaign1Refinements) {
    if (refinement.id == id) return refinement;
  }
  throw std::invalid_argument("refinement must be R0, R1, or R2");
}

std::string campaign1_scalar_id(double value) {
  std::ostringstream stream;
  stream << std::setprecision(3) << std::defaultfloat << value;
  return stream.str();
}

std::string campaign1_run_id(const Campaign1Coordinate& coordinate) {
  return "rung1-d" + campaign1_scalar_id(coordinate.separation) + "-s" +
      campaign1_scalar_id(coordinate.speed) + "-theta" +
      coordinate.angle_id + "-" + coordinate.prehistory_id + "-" +
      coordinate.refinement.id;
}

Vector3 campaign1_release_position(
    const Campaign1Coordinate& coordinate, int polarity) {
  return {static_cast<double>(polarity) * coordinate.separation / 2.0,
          0.0, 0.0};
}

Vector3 campaign1_release_velocity(
    const Campaign1Coordinate& coordinate, int polarity) {
  const double angle = campaign1_angle_radians(coordinate.angle_id);
  const Vector3 positive{
      -coordinate.speed * std::cos(angle),
      coordinate.speed * std::sin(angle), 0.0};
  return {static_cast<double>(polarity) * positive.x,
          static_cast<double>(polarity) * positive.y, 0.0};
}

// Campaign 1's prehistory is a declared input, not evolved output. Each
// segment is the same analytic cubic rebased to local segment time. The small
// explicit error tokens enclose decimal-token/rebase rounding; they do not
// authorize any post-release path construction.
eom::RetainedHistory campaign1_history(
    const Campaign1Coordinate& coordinate, int polarity) {
  const Vector3 x0 = campaign1_release_position(coordinate, polarity);
  const Vector3 v0 = campaign1_release_velocity(coordinate, polarity);
  Vector3 bump{};
  const double signed_amplitude =
      static_cast<double>(polarity) * 0.25 * coordinate.separation;
  if (coordinate.prehistory_id == "P1-lateral") {
    bump.z = signed_amplitude;
  } else if (coordinate.prehistory_id == "P2-longitudinal") {
    bump.x = signed_amplitude;
  } else if (coordinate.prehistory_id != "P0-inertial") {
    throw std::invalid_argument(
        "prehistory must be P0-inertial, P1-lateral, or P2-longitudinal");
  }

  const double depth = kCampaign1HistoryDepth;
  const double segment_step = coordinate.refinement.history_segment_step;
  const std::size_t segment_count = static_cast<std::size_t>(
      std::llround(depth / segment_step));
  const auto global_coefficients = [depth](
      double position, double velocity, double displacement) {
    return std::array<double, 4>{
        position, velocity, 3.0 * displacement / (depth * depth),
        2.0 * displacement / (depth * depth * depth)};
  };
  const std::array<std::array<double, 4>, 3> global = {
      global_coefficients(x0.x, v0.x, bump.x),
      global_coefficients(x0.y, v0.y, bump.y),
      global_coefficients(x0.z, v0.z, bump.z),
  };

  std::vector<eom::CubicHistorySegment> segments;
  segments.reserve(segment_count);
  for (std::size_t index = 0; index < segment_count; ++index) {
    const double start = -depth + segment_step * static_cast<double>(index);
    const double end = index + 1 == segment_count
        ? 0.0
        : -depth + segment_step * static_cast<double>(index + 1);
    eom::CubicCoefficientTokens local{};
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const auto& c = global[axis];
      local[axis] = {
          token(c[0] + start *
              (c[1] + start * (c[2] + start * c[3]))),
          token(c[1] + start * (2.0 * c[2] + start * 3.0 * c[3])),
          token(c[2] + start * 3.0 * c[3]),
          token(c[3]),
      };
    }
    segments.emplace_back(
        token(start), token(end), local, "1e-11", "1e-11");
  }
  const std::string path_id = polarity > 0 ? "positive" : "negative";
  return eom::RetainedHistory(
      path_id + "-" + coordinate.prehistory_id + "-prehistory",
      std::move(segments));
}

std::vector<SeedRow> campaign1_rows(const Campaign1Coordinate& coordinate) {
  return {
      {"positive", kCharge, coordinate.separation / 2.0, 0.0, 0.0,
       coordinate.speed, 0},
      {"negative", kNegativeCharge, coordinate.separation / 2.0, 0.0, kPi,
       coordinate.speed, 0},
  };
}

std::vector<eom::NativeCoupledPathInput> campaign1_paths(
    const Campaign1Coordinate& coordinate) {
  std::vector<eom::NativeCoupledPathInput> paths;
  paths.push_back({
      "positive", kCharge, campaign1_history(coordinate, +1)});
  paths.push_back({
      "negative", kNegativeCharge, campaign1_history(coordinate, -1)});
  return paths;
}

eom::RetainedHistory stationary_binary_history(
    double depth, double segment_step, int polarity) {
  if (!(depth > 1.0) || !(segment_step > 0.0)) {
    throw std::invalid_argument(
        "stationary binary history requires depth > 1 and segment step > 0");
  }
  const double segment_count_value = depth / segment_step;
  const std::size_t segment_count =
      static_cast<std::size_t>(std::llround(segment_count_value));
  if (std::abs(
          segment_count_value - static_cast<double>(segment_count)) > 1e-9) {
    throw std::invalid_argument(
        "stationary binary history depth must be divisible by segment step");
  }
  const double x = static_cast<double>(polarity) * 0.5;
  std::vector<eom::CubicHistorySegment> segments;
  segments.reserve(segment_count);
  for (std::size_t index = 0; index < segment_count; ++index) {
    const double start =
        -depth + segment_step * static_cast<double>(index);
    const double end = index + 1 == segment_count
        ? 0.0
        : -depth + segment_step * static_cast<double>(index + 1);
    eom::CubicCoefficientTokens coefficients{};
    coefficients[0] = {token(x), "0", "0", "0"};
    coefficients[1] = {"0", "0", "0", "0"};
    coefficients[2] = {"0", "0", "0", "0"};
    segments.emplace_back(
        token(start), token(end), coefficients, "1e-14", "1e-14");
  }
  const std::string path_id = polarity > 0 ? "positive" : "negative";
  return eom::RetainedHistory(
      path_id + "-stationary-held-prehistory", std::move(segments));
}

std::vector<SeedRow> stationary_binary_rows() {
  return {
      {"positive", kCharge, 0.5, 0.0, 0.0, 0.0, 0},
      {"negative", kNegativeCharge, 0.5, 0.0, kPi, 0.0, 0},
  };
}

std::vector<eom::NativeCoupledPathInput> stationary_binary_paths(
    double depth, double segment_step) {
  return {
      {"positive", kCharge,
       stationary_binary_history(depth, segment_step, +1)},
      {"negative", kNegativeCharge,
       stationary_binary_history(depth, segment_step, -1)},
  };
}

// Release-time endpoint state shared by both prehistory families
// (endpoint-matched within binary64 — the requirement is materially
// different prehistories arriving at the same release state).
Vector3 endpoint_position(const SeedRow& row) {
  return {row.radius * std::cos(row.phase),
          row.radius * std::sin(row.phase),
          row.height};
}

Vector3 endpoint_velocity(const SeedRow& row) {
  const double omega = static_cast<double>(row.sense) * row.speed / row.radius;
  return {-row.radius * omega * std::sin(row.phase),
          row.radius * omega * std::cos(row.phase),
          0.0};
}

eom::RetainedHistory circular_history(
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
          .tilt_x = token(row.tilt_x),
          .tilt_y = token(row.tilt_y),
      });
}

struct F6cHarmonicState {
  Vector3 position;
  Vector3 velocity;
};

F6cHarmonicState f6c_cubic_lattice_state(
    const SeedRow& row, double time, double angular_rate) {
  const double angle = angular_rate * time + row.phase;
  const double cosine = std::cos(angle);
  const double sine = std::sin(angle);
  const std::array<double, 3> radial = {
      row.frame_p[0] * cosine + row.frame_q[0] * sine,
      row.frame_p[1] * cosine + row.frame_q[1] * sine,
      row.frame_p[2] * cosine + row.frame_q[2] * sine};
  const std::array<double, 3> tangent = {
      -row.frame_p[0] * sine + row.frame_q[0] * cosine,
      -row.frame_p[1] * sine + row.frame_q[1] * cosine,
      -row.frame_p[2] * sine + row.frame_q[2] * cosine};
  return {
      {row.center_x + row.radius * radial[0],
       row.center_y + row.radius * radial[1],
       row.center_z + row.radius * radial[2]},
      {row.radius * angular_rate * tangent[0],
       row.radius * angular_rate * tangent[1],
       row.radius * angular_rate * tangent[2]},
  };
}

eom::RetainedHistory f6c_cubic_lattice_history(
    const SeedRow& row, double depth, double segment_step,
    double angular_rate) {
  const std::size_t segment_count = static_cast<std::size_t>(
      std::ceil(depth / segment_step));
  const double step = depth / static_cast<double>(segment_count);
  const double fourth_derivative_bound =
      row.radius * std::pow(std::abs(angular_rate), 4);
  const double position_error =
      fourth_derivative_bound * std::pow(step, 4) / 384.0 + 1e-14;
  const double velocity_error =
      fourth_derivative_bound * std::pow(step, 3) + 1e-13;
  std::vector<eom::CubicHistorySegment> segments;
  segments.reserve(segment_count);
  for (std::size_t index = 0; index < segment_count; ++index) {
    const double start = -depth + static_cast<double>(index) * step;
    const double end = index + 1U == segment_count
        ? 0.0
        : -depth + static_cast<double>(index + 1U) * step;
    const double duration = end - start;
    const auto left = f6c_cubic_lattice_state(row, start, angular_rate);
    const auto right = f6c_cubic_lattice_state(row, end, angular_rate);
    const std::array<double, 3> left_position = {
        left.position.x, left.position.y, left.position.z};
    const std::array<double, 3> left_velocity = {
        left.velocity.x, left.velocity.y, left.velocity.z};
    const std::array<double, 3> right_position = {
        right.position.x, right.position.y, right.position.z};
    const std::array<double, 3> right_velocity = {
        right.velocity.x, right.velocity.y, right.velocity.z};
    eom::CubicCoefficientTokens coefficients;
    for (std::size_t axis = 0; axis < 3U; ++axis) {
      const double displacement = right_position[axis] - left_position[axis];
      coefficients[axis] = {
          token(left_position[axis]),
          token(left_velocity[axis]),
          token((3.0 * displacement / duration -
                 2.0 * left_velocity[axis] - right_velocity[axis]) /
                duration),
          token((-2.0 * displacement / duration +
                 left_velocity[axis] + right_velocity[axis]) /
                (duration * duration)),
      };
    }
    segments.emplace_back(
        token(start), token(end), coefficients,
        token(position_error), token(velocity_error));
  }
  return eom::RetainedHistory(
      row.path_id + "-f6c-cubic-lattice-prehistory", std::move(segments));
}

F6cHarmonicState f6c_harmonic_state(
    std::size_t module, int polarity, double time,
    double positive_rate, double negative_rate, double negative_theta,
    double breathing_rate, double radial_breathing_ratio, double cycle_phase,
    double positive_h_amplitude, double negative_h_amplitude,
    double positive_rho_amplitude, double negative_rho_amplitude,
    double positive_phase_amplitude, double negative_phase_amplitude,
    double positive_h_phase_offset, double negative_h_phase_offset,
    double positive_rho_phase_offset, double negative_rho_phase_offset) {
  constexpr double kScale = 0.3;
  constexpr std::array<std::array<double, 3>, 4> kAxes = {{
      {{1.0, 1.0, 1.0}},
      {{1.0, -1.0, -1.0}},
      {{-1.0, 1.0, -1.0}},
      {{-1.0, -1.0, 1.0}},
  }};
  constexpr std::array<int, 4> kCirculationSigns = {-1, -1, 1, 1};
  constexpr std::array<double, 4> kPhases = {
      0.0, kPi, 4.0 * kPi / 3.0, kPi / 3.0};
  const double inverse_norm = 1.0 / std::sqrt(3.0);
  const std::array<double, 3> axis = {
      kAxes[module][0] * inverse_norm,
      kAxes[module][1] * inverse_norm,
      kAxes[module][2] * inverse_norm,
  };
  const double transverse_norm = std::hypot(axis[0], axis[1]);
  const std::array<double, 3> local_u = {
      -axis[1] / transverse_norm,
      axis[0] / transverse_norm,
      0.0,
  };
  const std::array<double, 3> local_v = {
      axis[1] * local_u[2] - axis[2] * local_u[1],
      axis[2] * local_u[0] - axis[0] * local_u[2],
      axis[0] * local_u[1] - axis[1] * local_u[0],
  };
  const double angular_rate = polarity > 0 ? positive_rate : negative_rate;
  const double h_amplitude = polarity > 0
      ? positive_h_amplitude : negative_h_amplitude;
  const double rho_amplitude = polarity > 0
      ? positive_rho_amplitude : negative_rho_amplitude;
  const double phase_amplitude = polarity > 0
      ? positive_phase_amplitude : negative_phase_amplitude;
  const double h_phase_offset = polarity > 0
      ? positive_h_phase_offset : negative_h_phase_offset;
  const double rho_phase_offset = polarity > 0
      ? positive_rho_phase_offset : negative_rho_phase_offset;
  const double breathing_argument = breathing_rate * time + cycle_phase;
  const double radial_breathing_rate =
      breathing_rate * radial_breathing_ratio;
  const double h_argument = breathing_argument + h_phase_offset;
  const double rho_argument =
      radial_breathing_rate * time + cycle_phase + rho_phase_offset;
  const double h = kScale + h_amplitude * std::sin(h_argument);
  const double rho =
      kScale + rho_amplitude * std::sin(rho_argument);
  const double h_rate =
      h_amplitude * breathing_rate * std::cos(h_argument);
  const double rho_rate =
      rho_amplitude * radial_breathing_rate * std::cos(rho_argument);
  const double theta = angular_rate * time + cycle_phase +
      phase_amplitude * std::cos(breathing_argument) +
      (polarity > 0 ? 0.0 : negative_theta);
  const double theta_rate = angular_rate -
      phase_amplitude * breathing_rate * std::sin(breathing_argument);
  const double psi = kPhases[module] +
      static_cast<double>(polarity * kCirculationSigns[module]) * theta;
  const double psi_rate =
      static_cast<double>(polarity * kCirculationSigns[module]) * theta_rate;
  const std::array<double, 3> radial = {
      local_u[0] * std::cos(psi) + local_v[0] * std::sin(psi),
      local_u[1] * std::cos(psi) + local_v[1] * std::sin(psi),
      local_u[2] * std::cos(psi) + local_v[2] * std::sin(psi),
  };
  const std::array<double, 3> tangent = {
      -local_u[0] * std::sin(psi) + local_v[0] * std::cos(psi),
      -local_u[1] * std::sin(psi) + local_v[1] * std::cos(psi),
      -local_u[2] * std::sin(psi) + local_v[2] * std::cos(psi),
  };
  F6cHarmonicState result;
  result.position = {
      static_cast<double>(polarity) * h * axis[0] + rho * radial[0],
      static_cast<double>(polarity) * h * axis[1] + rho * radial[1],
      static_cast<double>(polarity) * h * axis[2] + rho * radial[2],
  };
  result.velocity = {
      static_cast<double>(polarity) * h_rate * axis[0] +
          rho_rate * radial[0] + rho * psi_rate * tangent[0],
      static_cast<double>(polarity) * h_rate * axis[1] +
          rho_rate * radial[1] + rho * psi_rate * tangent[1],
      static_cast<double>(polarity) * h_rate * axis[2] +
          rho_rate * radial[2] + rho * psi_rate * tangent[2],
  };
  return result;
}

eom::RetainedHistory f6c_harmonic_history(
    const SeedRow& row, std::size_t module, int polarity, double depth,
    double segment_step, double positive_rate, double negative_rate,
    double negative_theta, double breathing_rate,
    double radial_breathing_ratio, double cycle_phase,
    double positive_h_amplitude, double negative_h_amplitude,
    double positive_rho_amplitude, double negative_rho_amplitude,
    double positive_phase_amplitude, double negative_phase_amplitude,
    double positive_h_phase_offset, double negative_h_phase_offset,
    double positive_rho_phase_offset, double negative_rho_phase_offset) {
  const std::size_t segment_count = static_cast<std::size_t>(
      std::ceil(depth / segment_step));
  const double step = depth / static_cast<double>(segment_count);
  const double angular_rate = polarity > 0 ? positive_rate : negative_rate;
  const double h_amplitude = polarity > 0
      ? positive_h_amplitude : negative_h_amplitude;
  const double rho_amplitude = polarity > 0
      ? positive_rho_amplitude : negative_rho_amplitude;
  const double phase_amplitude = polarity > 0
      ? positive_phase_amplitude : negative_phase_amplitude;
  const double maximum_radius = 0.3 + std::abs(rho_amplitude);
  const double breathing = std::abs(breathing_rate);
  const double radial_breathing =
      std::abs(breathing_rate * radial_breathing_ratio);
  const double phase_one =
      std::abs(angular_rate) + std::abs(phase_amplitude) * breathing;
  const double phase_two = std::abs(phase_amplitude) * std::pow(breathing, 2);
  const double phase_three = std::abs(phase_amplitude) * std::pow(breathing, 3);
  const double phase_four = std::abs(phase_amplitude) * std::pow(breathing, 4);
  const double radius_one = std::abs(rho_amplitude) * radial_breathing;
  const double radius_two =
      std::abs(rho_amplitude) * std::pow(radial_breathing, 2);
  const double radius_three =
      std::abs(rho_amplitude) * std::pow(radial_breathing, 3);
  const double radius_four =
      std::abs(rho_amplitude) * std::pow(radial_breathing, 4);
  const double fourth_derivative_bound =
      std::abs(h_amplitude) * std::pow(breathing, 4) +
      radius_four + 4.0 * phase_one * radius_three +
      (6.0 * phase_two + 6.0 * std::pow(phase_one, 2)) * radius_two +
      (4.0 * phase_three + 12.0 * phase_one * phase_two +
       4.0 * std::pow(phase_one, 3)) * radius_one +
      (phase_four + 4.0 * phase_one * phase_three +
       3.0 * std::pow(phase_two, 2) +
       6.0 * std::pow(phase_one, 2) * phase_two +
       std::pow(phase_one, 4)) * maximum_radius;
  const double position_error =
      fourth_derivative_bound * std::pow(step, 4) / 384.0 + 1e-12;
  const double velocity_error =
      fourth_derivative_bound * std::pow(step, 3) + 1e-11;
  std::vector<eom::CubicHistorySegment> segments;
  segments.reserve(segment_count);
  for (std::size_t index = 0; index < segment_count; ++index) {
    const double start = -depth + static_cast<double>(index) * step;
    const double end = index + 1U == segment_count
        ? 0.0
        : -depth + static_cast<double>(index + 1U) * step;
    const double duration = end - start;
    const auto left = f6c_harmonic_state(
        module, polarity, start, positive_rate, negative_rate,
        negative_theta, breathing_rate, radial_breathing_ratio, cycle_phase,
        positive_h_amplitude, negative_h_amplitude, positive_rho_amplitude,
        negative_rho_amplitude, positive_phase_amplitude,
        negative_phase_amplitude, positive_h_phase_offset,
        negative_h_phase_offset, positive_rho_phase_offset,
        negative_rho_phase_offset);
    const auto right = f6c_harmonic_state(
        module, polarity, end, positive_rate, negative_rate,
        negative_theta, breathing_rate, radial_breathing_ratio, cycle_phase,
        positive_h_amplitude, negative_h_amplitude, positive_rho_amplitude,
        negative_rho_amplitude, positive_phase_amplitude,
        negative_phase_amplitude, positive_h_phase_offset,
        negative_h_phase_offset, positive_rho_phase_offset,
        negative_rho_phase_offset);
    const std::array<double, 3> left_position = {
        left.position.x, left.position.y, left.position.z};
    const std::array<double, 3> left_velocity = {
        left.velocity.x, left.velocity.y, left.velocity.z};
    const std::array<double, 3> right_position = {
        right.position.x, right.position.y, right.position.z};
    const std::array<double, 3> right_velocity = {
        right.velocity.x, right.velocity.y, right.velocity.z};
    eom::CubicCoefficientTokens coefficients;
    for (std::size_t axis = 0; axis < 3U; ++axis) {
      const double displacement = right_position[axis] - left_position[axis];
      coefficients[axis] = {
          token(left_position[axis]),
          token(left_velocity[axis]),
          token((3.0 * displacement / duration -
                 2.0 * left_velocity[axis] - right_velocity[axis]) /
                duration),
          token((-2.0 * displacement / duration +
                 left_velocity[axis] + right_velocity[axis]) /
                (duration * duration)),
      };
    }
    segments.emplace_back(
        token(start), token(end), coefficients,
        token(position_error), token(velocity_error));
  }
  return eom::RetainedHistory(
      row.path_id + "-harmonic-breathing-prehistory", std::move(segments));
}

// Straight constant-velocity prehistory arriving at the same release state:
// one exact linear segment on [-depth, 0] (a single segment has no interior
// joins, so the exact-rational continuity validation has nothing to reject
// and the error terms stay identically zero).
eom::RetainedHistory straight_history(const SeedRow& row, double depth) {
  const Vector3 x0 = endpoint_position(row);
  const Vector3 v0 = endpoint_velocity(row);
  const auto axis_tokens = [depth](double position, double velocity) {
    return std::array<std::string, 4>{
        token(position - velocity * depth), token(velocity), "0", "0"};
  };
  eom::CubicCoefficientTokens coefficients{
      axis_tokens(x0.x, v0.x),
      axis_tokens(x0.y, v0.y),
      axis_tokens(x0.z, v0.z)};
  std::vector<eom::CubicHistorySegment> segments;
  segments.emplace_back(token(-depth), "0", coefficients, "0", "0");
  return eom::RetainedHistory(
      row.path_id + "-straight-prehistory", std::move(segments));
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

struct SampledState {
  Vector3 position;
  Vector3 velocity;
  double error_bound = 0.0;
};

SampledState sample_state(
    const eom::RetainedHistory& history, const std::string& time_token) {
  const eom::Interval time = eom::Interval::point(
      eom::Interval::decimal_token(time_token).midpoint());
  const auto position = history.position_hull(time);
  const auto velocity = history.velocity_hull(time);
  double error_bound = 0.0;
  for (std::size_t axis = 0; axis < 3; ++axis) {
    error_bound = std::max(
        error_bound,
        (position[axis].upper() - position[axis].lower()) / 2.0);
  }
  return {
      {position[0].midpoint(), position[1].midpoint(),
       position[2].midpoint()},
      {velocity[0].midpoint(), velocity[1].midpoint(),
       velocity[2].midpoint()},
      error_bound};
}

double distance(const Vector3& left, const Vector3& right) {
  return std::hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}

double speed(const Vector3& velocity) {
  return std::hypot(velocity.x, velocity.y, velocity.z);
}

// Union-find over the declared link distance; the census cluster is the
// connected component, its composition the polarity mix.
std::vector<std::size_t> cluster_labels(
    const std::vector<SampledState>& states, double link_distance) {
  std::vector<std::size_t> parent(states.size());
  std::iota(parent.begin(), parent.end(), 0U);
  const auto find = [&parent](std::size_t node) {
    while (parent[node] != node) {
      parent[node] = parent[parent[node]];
      node = parent[node];
    }
    return node;
  };
  for (std::size_t left = 0; left < states.size(); ++left) {
    for (std::size_t right = left + 1; right < states.size(); ++right) {
      if (distance(states[left].position, states[right].position) <=
          link_distance) {
        parent[find(left)] = find(right);
      }
    }
  }
  std::vector<std::size_t> labels(states.size());
  for (std::size_t index = 0; index < states.size(); ++index) {
    labels[index] = find(index);
  }
  return labels;
}

constexpr std::array<double, 12> kSpeedBinEdges = {
    0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.99};

struct Options {
  std::string seed_family = "phase0-shell-v1";
  std::size_t population = 6;
  std::size_t seed_offset = 0;
  std::string prehistory = "circular";
  double binary_separation = 1.0;
  double binary_speed = 0.25;
  double f6c_positive_rate = 1.0;
  double f6c_negative_rate = 1.0;
  double f6c_negative_theta = 0.0;
  double f6c_breathing_rate = 0.0;
  double f6c_radial_breathing_ratio = 1.0;
  double f6c_cycle_phase = 0.0;
  double f6c_positive_h_amplitude = 0.0;
  double f6c_negative_h_amplitude = 0.0;
  double f6c_positive_rho_amplitude = 0.0;
  double f6c_negative_rho_amplitude = 0.0;
  double f6c_positive_phase_amplitude = 0.0;
  double f6c_negative_phase_amplitude = 0.0;
  double f6c_positive_h_phase_offset = 0.0;
  double f6c_negative_h_phase_offset = 0.0;
  double f6c_positive_rho_phase_offset = 0.0;
  double f6c_negative_rho_phase_offset = 0.0;
  double lattice_spacing = 1.0;
  double lattice_orbit_radius = 0.05;
  double lattice_angular_rate = 1.0;
  std::size_t lattice_side = 2;
  std::string lattice_orientation_field = "tetrahedral-parity-v1";
  std::string binary_angle = "0";
  std::string refinement = "R0";
  std::string campaign1_grid_manifest;
  double end_time = 0.2;
  double step = 0.01;
  double minimum_step = 0.0025;
  double history_depth = 8.0;
  double history_segment_step = 0.02;
  std::size_t chunk_steps = 5;
  std::size_t sample_every = 1;
  double link_distance = 1.0;
  double escape_radius = 12.0;
  double pin_speed = 0.95;
  std::size_t thread_count = 4;
  std::string out_dir = "attractor-ensemble-out";
  std::string run_id;
  std::string root_tolerance = "1e-5";
  std::string transmitter_factor_floor = "1e-24";
  std::size_t root_max_depth = 192;
  std::string engine_build_id = "unspecified";
  std::string generating_spec = "unspecified";
  std::string record_date = "unspecified";
  double delay_horizon = 8.0;
  bool resume = false;
};

void hash_resume_token(std::uint64_t& state, const std::string& value) {
  for (const unsigned char character : value) {
    state ^= static_cast<std::uint64_t>(character);
    state *= UINT64_C(1099511628211);
  }
  state ^= UINT64_C(255);
  state *= UINT64_C(1099511628211);
}

std::string harness_resume_fingerprint(
    const Options& options, const std::string& model_fingerprint) {
  std::uint64_t state = UINT64_C(14695981039346656037);
  for (const auto& value : std::vector<std::string>{
           "eom_attractor_resume_configuration/v1",
           options.seed_family,
           std::to_string(options.population),
           std::to_string(options.seed_offset),
           options.prehistory,
           token(options.binary_separation),
           token(options.binary_speed),
           token(options.f6c_positive_rate),
           token(options.f6c_negative_rate),
           token(options.f6c_negative_theta),
           token(options.f6c_breathing_rate),
           token(options.f6c_radial_breathing_ratio),
           token(options.f6c_cycle_phase),
           token(options.f6c_positive_h_amplitude),
           token(options.f6c_negative_h_amplitude),
           token(options.f6c_positive_rho_amplitude),
           token(options.f6c_negative_rho_amplitude),
           token(options.f6c_positive_phase_amplitude),
           token(options.f6c_negative_phase_amplitude),
           token(options.f6c_positive_h_phase_offset),
           token(options.f6c_negative_h_phase_offset),
           token(options.f6c_positive_rho_phase_offset),
           token(options.f6c_negative_rho_phase_offset),
           token(options.lattice_spacing),
           token(options.lattice_orbit_radius),
           token(options.lattice_angular_rate),
           std::to_string(options.lattice_side),
           options.lattice_orientation_field,
           options.binary_angle,
           options.refinement,
           token(options.step),
           token(options.minimum_step),
           token(options.history_depth),
           token(options.history_segment_step),
           std::to_string(options.chunk_steps),
           std::to_string(options.sample_every),
           token(options.link_distance),
           token(options.escape_radius),
           token(options.pin_speed),
           std::to_string(options.thread_count),
           options.root_tolerance,
           options.transmitter_factor_floor,
           std::to_string(options.root_max_depth),
           options.engine_build_id,
           options.generating_spec,
           options.record_date,
           token(options.delay_horizon),
           model_fingerprint,
       }) {
    hash_resume_token(state, value);
  }
  std::ostringstream result;
  result << "fnv1a64-resume-v1:" << std::hex << std::setfill('0')
         << std::setw(16) << state;
  return result.str();
}

eom::NativeCoupledEvolutionRequest build_request(
    const Options& options,
    const std::vector<eom::NativeCoupledPathInput>& paths) {
  eom::NativeCoupledEvolutionRequest request{};
  request.run_id = options.run_id;
  request.paths = paths;
  request.start_time = "0";
  request.end_time = token(options.end_time);
  request.initial_step = token(options.step);
  request.minimum_step = token(options.minimum_step);
  request.maximum_step = token(options.step);
  request.field_speed = "1";
  request.coupling = token(kNativeCoupling);
  request.root_tolerance = options.root_tolerance;
  request.transmitter_factor_floor = options.transmitter_factor_floor;
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
  request.root_max_depth = options.root_max_depth;
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
  request.thread_count = options.thread_count;
  request.use_analytic_pinned_fold = false;
  request.use_pinned_fold_aware_temporal_step = false;
  return request;
}

void write_frame_row(
    std::ostream& output, std::size_t path_key, std::size_t frame_index,
    const std::string& time_token, const SampledState& state,
    int state_flags) {
  // The time token is a plain decimal literal, emitted as a JSON number to
  // match the Borg trajectory row shape.
  output << "{\"pathKey\":" << path_key
         << ",\"frameIndex\":" << frame_index << ",\"time\":" << time_token
         << std::setprecision(17)
         << ",\"position\":{\"x\":" << state.position.x
         << ",\"y\":" << state.position.y
         << ",\"z\":" << state.position.z
         << "},\"velocity\":{\"x\":" << state.velocity.x
         << ",\"y\":" << state.velocity.y
         << ",\"z\":" << state.velocity.z
         << "},\"errorBound\":" << state.error_bound
         << ",\"stateFlags\":" << state_flags << '}';
}

int state_flags_for_charge(const std::string& charge) {
  return charge.starts_with('-') ? 2 : 1;
}

void write_segment(
    std::ostream& output, const eom::CubicHistorySegment& segment) {
  output << "{\"startTime\":";
  write_json_string(output, segment.t_start_token());
  output << ",\"endTime\":";
  write_json_string(output, segment.t_end_token());
  output << ",\"coefficients\":[";
  const auto& coefficients = segment.coefficient_tokens();
  for (std::size_t axis = 0; axis < coefficients.size(); ++axis) {
    if (axis > 0) output << ',';
    output << '[';
    for (std::size_t coefficient = 0;
         coefficient < coefficients[axis].size(); ++coefficient) {
      if (coefficient > 0) output << ',';
      write_json_string(output, coefficients[axis][coefficient]);
    }
    output << ']';
  }
  output << "],\"positionErrors\":[";
  for (std::size_t axis = 0; axis < 3; ++axis) {
    if (axis > 0) output << ',';
    write_json_string(output, segment.position_error_tokens()[axis]);
  }
  output << "],\"velocityErrors\":[";
  for (std::size_t axis = 0; axis < 3; ++axis) {
    if (axis > 0) output << ',';
    write_json_string(output, segment.velocity_error_tokens()[axis]);
  }
  output << "],\"positionError\":";
  write_json_string(output, segment.position_error_token());
  output << ",\"velocityError\":";
  write_json_string(output, segment.velocity_error_token());
  output << '}';
}

void write_interval_vector(
    std::ostream& output, const eom::IntervalVector& values) {
  output << '[';
  for (std::size_t axis = 0; axis < values.size(); ++axis) {
    if (axis > 0) output << ',';
    output << "{\"lower\":" << values[axis].lower()
           << ",\"upper\":" << values[axis].upper() << '}';
  }
  output << ']';
}

void write_release_acceleration_atomic(
    const std::filesystem::path& path,
    const eom::NativeAccelerationSnapshotCertificate& snapshot,
    const std::string& schema) {
  const auto temporary_path = path.string() + ".tmp";
  std::ofstream output(temporary_path, std::ios::trunc);
  if (!output) {
    throw std::runtime_error(
        "failed to open release acceleration temporary file");
  }
  output << std::setprecision(17)
         << "{\"schema\":";
  write_json_string(output, schema);
  output
         << ",\"evidenceBoundary\":"
            "\"EOM-solver diagnostic; not an independent oracle\""
         << ",\"status\":";
  write_json_string(output, snapshot.status);
  output << ",\"failureCode\":";
  write_json_string(output, snapshot.failure_code);
  output << ",\"receptionTime\":";
  write_json_string(output, snapshot.reception_time);
  double minimum_transmitter_factor_magnitude =
      std::numeric_limits<double>::infinity();
  for (const auto& row : snapshot.root_certificates) {
    for (const auto& root : row.certificate.roots) {
      minimum_transmitter_factor_magnitude = std::min(
          minimum_transmitter_factor_magnitude,
          std::min(
              std::abs(std::stod(root.transmitter_factor_lower)),
              std::abs(std::stod(root.transmitter_factor_upper))));
    }
  }
  output << ",\"minimumTransmitterFactorMagnitude\":";
  if (std::isfinite(minimum_transmitter_factor_magnitude)) {
    output << minimum_transmitter_factor_magnitude;
  } else {
    output << "null";
  }
  output << ",\"rootCertificates\":[";
  for (std::size_t index = 0;
       index < snapshot.root_certificates.size(); ++index) {
    const auto& row = snapshot.root_certificates[index];
    if (index > 0) output << ',';
    output << "{\"receiver\":";
    write_json_string(output, row.receiver_path_id);
    output << ",\"transmitter\":";
    write_json_string(output, row.transmitter_path_id);
    output << ",\"status\":";
    write_json_string(output, row.certificate.status);
    output << ",\"failureCode\":";
    write_json_string(output, row.certificate.failure_code);
    output << '}';
  }
  output << "],\"receiverAccelerations\":[";
  const eom::NativeReceiverAcceleration* positive = nullptr;
  const eom::NativeReceiverAcceleration* negative = nullptr;
  for (std::size_t index = 0;
       index < snapshot.acceleration.receiver_totals.size(); ++index) {
    const auto& row = snapshot.acceleration.receiver_totals[index];
    if (index > 0) output << ',';
    output << "{\"pathId\":";
    write_json_string(output, row.receiver_path_id);
    output << ",\"acceleration\":";
    write_interval_vector(output, row.acceleration);
    output << '}';
    if (row.receiver_path_id == "positive") positive = &row;
    if (row.receiver_path_id == "negative") negative = &row;
  }
  output << ']';
  if (positive != nullptr && negative != nullptr) {
    const double lower =
        positive->acceleration[0].lower() -
        negative->acceleration[0].upper();
    const double upper =
        positive->acceleration[0].upper() -
        negative->acceleration[0].lower();
    output << ",\"relativeRadialAcceleration\":{\"axis\":\"+x from negative "
              "to positive\",\"lower\":"
           << lower << ",\"upper\":" << upper << '}';
  }
  output << "}\n";
  output.flush();
  if (!output) {
    throw std::runtime_error("failed to write release acceleration file");
  }
  output.close();
  std::filesystem::rename(temporary_path, path);
}

void log_halt_detail(
    const eom::NativeCoupledEvolutionCertificate& chunk) {
  if (chunk.status == "completed") return;
  std::cerr << "halt_detail status=" << chunk.status
            << " halt_code=" << chunk.halt_code
            << " accepted_end=" << chunk.accepted_end_time << '\n';
  for (const auto& step : chunk.steps) {
    if (step.status == "accepted") continue;
    std::cerr << "rejected_step index=" << step.step_index
              << " attempted_start=" << step.attempted_start
              << " attempted_end=" << step.attempted_end
              << " failure=" << step.failure_code << '\n';
    for (std::size_t substep_index = 0;
         substep_index < step.substeps.size(); ++substep_index) {
      const auto& substep = step.substeps[substep_index];
      std::cerr << "rejected_substep index=" << substep_index
                << " start=" << substep.start_time
                << " end=" << substep.end_time
                << " status=" << substep.status
                << " failure=" << substep.failure_code << '\n';
      if (!substep.endpoint_snapshot.has_value()) continue;
      for (const auto& root : substep.endpoint_snapshot->root_certificates) {
        if (root.certificate.status == "certified_complete") continue;
        std::cerr << "rejected_root receiver=" << root.receiver_path_id
                  << " transmitter=" << root.transmitter_path_id
                  << " status=" << root.certificate.status
                  << " failure=" << root.certificate.failure_code
                  << " diagnostic=" << root.certificate.diagnostic_detail
                  << " precision_bits="
                  << root.certificate.achieved_precision_bits
                  << " mpfr_attempts="
                  << root.certificate.mpfr_attempt_count
                  << " has_difficult_cell="
                  << root.certificate.has_difficult_cell;
        if (root.certificate.has_difficult_cell) {
          std::cerr
              << " difficult_source_segment="
              << root.certificate.difficult_source_segment_index
              << " difficult_cell=["
              << root.certificate.difficult_cell_lower << ','
              << root.certificate.difficult_cell_upper << ']'
              << " difficult_point="
              << root.certificate.difficult_point
              << " difficult_residual=["
              << root.certificate.difficult_point_residual_lower << ','
              << root.certificate.difficult_point_residual_upper << ']'
              << " difficult_transmitter_factor=["
              << root.certificate.difficult_transmitter_factor_lower << ','
              << root.certificate.difficult_transmitter_factor_upper << ']'
              << " difficult_receiver_factor=["
              << root.certificate.difficult_receiver_factor_lower << ','
              << root.certificate.difficult_receiver_factor_upper << ']'
              << " difficult_signs=["
              << root.certificate.difficult_lower_sign << ','
              << root.certificate.difficult_upper_sign << ']';
        }
        std::cerr << '\n';
      }
    }
  }
}

void write_campaign1_probe(
    std::ostream& output, const eom::RetainedHistory& history,
    const std::string& time_token) {
  const eom::Interval time = eom::Interval::point(
      eom::Interval::decimal_token(time_token).midpoint());
  output << "{\"time\":";
  write_json_string(output, time_token);
  output << ",\"position\":";
  write_interval_vector(output, history.position_hull(time));
  output << ",\"velocity\":";
  write_interval_vector(output, history.velocity_hull(time));
  output << '}';
}

// Construction-only exercise for the declared 27 x 3 x 3 workload. This mode
// instantiates and validates every retained-history segment, then exits before
// root search, acceleration evaluation, or coupled evolution.
void write_campaign1_grid_manifest(const std::filesystem::path& path) {
  if (path.has_parent_path()) {
    std::filesystem::create_directories(path.parent_path());
  }
  const auto temporary_path = path.string() + ".tmp";
  std::ofstream output(temporary_path, std::ios::trunc);
  if (!output) {
    throw std::runtime_error(
        "failed to open Campaign 1 workload manifest temporary file");
  }
  output << std::setprecision(17)
         << "{\"schema\":\"campaign1_binary_workload_construction/v0\""
         << ",\"generatingSpec\":\"reference/priorities/braid-program/"
            "campaigns/campaign-1-subfield-binary.md\""
         << ",\"purpose\":\"declared-initial-condition-construction-only\""
         << ",\"evolutionInvoked\":false"
         << ",\"physicsResultBooked\":false"
         << ",\"configurationCount\":27"
         << ",\"prehistoryCount\":3"
         << ",\"refinementCount\":3"
         << ",\"workloadCount\":243"
         << ",\"workloads\":[";
  bool first_workload = true;
  for (const double separation : kCampaign1Separations) {
    for (const double speed_value : kCampaign1Speeds) {
      for (const char* angle_id : kCampaign1Angles) {
        for (const char* prehistory_id : kCampaign1Prehistories) {
          for (const auto& refinement : kCampaign1Refinements) {
            const Campaign1Coordinate coordinate{
                separation, speed_value, angle_id, prehistory_id, refinement};
            const auto paths = campaign1_paths(coordinate);
            if (!first_workload) output << ',';
            first_workload = false;
            output << "{\"runId\":";
            write_json_string(output, campaign1_run_id(coordinate));
            output << ",\"separation\":" << coordinate.separation
                   << ",\"speed\":" << coordinate.speed
                   << ",\"angleId\":";
            write_json_string(output, coordinate.angle_id);
            output << ",\"angleRadians\":"
                   << campaign1_angle_radians(coordinate.angle_id)
                   << ",\"prehistoryId\":";
            write_json_string(output, coordinate.prehistory_id);
            output << ",\"refinement\":{\"id\":";
            write_json_string(output, coordinate.refinement.id);
            output << ",\"maximumStep\":" << coordinate.refinement.step
                   << ",\"maximumPrehistorySegment\":"
                   << coordinate.refinement.history_segment_step
                   << ",\"rootDepth\":"
                   << coordinate.refinement.root_max_depth
                   << ",\"stepsPerChunk\":"
                   << coordinate.refinement.chunk_steps
                   << ",\"chunkDuration\":"
                   << coordinate.refinement.step *
                          static_cast<double>(coordinate.refinement.chunk_steps)
                   << "},\"paths\":[";
            for (std::size_t path_index = 0; path_index < paths.size();
                 ++path_index) {
              if (path_index > 0) output << ',';
              const auto& path_row = paths[path_index];
              const auto& segments = path_row.history.segments();
              double maximum_duration = 0.0;
              for (const auto& segment : segments) {
                maximum_duration = std::max(
                    maximum_duration,
                    std::stod(segment.t_end_token()) -
                        std::stod(segment.t_start_token()));
              }
              output << "{\"id\":";
              write_json_string(output, path_row.path_id);
              output << ",\"charge\":";
              write_json_string(output, path_row.charge);
              output << ",\"historyFingerprint\":";
              write_json_string(
                  output, path_row.history.provenance_fingerprint());
              output << ",\"coverageStart\":";
              write_json_string(output, segments.front().t_start_token());
              output << ",\"coverageEnd\":";
              write_json_string(output, segments.back().t_end_token());
              output << ",\"segmentCount\":" << segments.size()
                     << ",\"maximumSegmentDuration\":" << maximum_duration
                     << ",\"probes\":[";
              constexpr std::array<const char*, 5> kProbeTimes = {
                  "-20", "-15", "-10", "-5", "0"};
              for (std::size_t probe_index = 0;
                   probe_index < kProbeTimes.size(); ++probe_index) {
                if (probe_index > 0) output << ',';
                write_campaign1_probe(
                    output, path_row.history, kProbeTimes[probe_index]);
              }
              output << "]}";
            }
            output << "]}";
          }
        }
      }
    }
  }
  output << "]}\n";
  output.flush();
  if (!output) {
    throw std::runtime_error("failed to write Campaign 1 workload manifest");
  }
  output.close();
  std::filesystem::rename(temporary_path, path);
}

template <typename PathRow>
void write_assembly_view_record_atomic(
    const std::filesystem::path& path, const Options& options,
    const std::vector<PathRow>& published_paths,
    const std::vector<std::string>& declared_path_ids,
    const std::vector<std::size_t>& declared_segment_counts,
    const std::string& model_fingerprint,
    const std::string& accepted_end, const std::string& run_status) {
  if (published_paths.empty() ||
      published_paths.size() != declared_path_ids.size() ||
      published_paths.size() != declared_segment_counts.size()) {
    throw std::invalid_argument(
        "assembly-view record requires one declared id and segment count per path");
  }
  const auto temporary_path = path.string() + ".tmp";
  {
    std::ofstream output(temporary_path, std::ios::trunc);
    if (!output) {
      throw std::runtime_error(
          "failed to open assembly-view record temporary file");
    }
    output << std::setprecision(17)
           << "{\"schema\":\"assembly-view-record.v0\",\"provenance\":{"
           << "\"engineId\":\"eom-solver\",\"engineVersion\":";
    write_json_string(output, options.engine_build_id);
    output << ",\"runId\":";
    write_json_string(output, options.run_id);
    output << ",\"claimGrade\":";
    write_json_string(
        output, accepted_end == "0" ? "chart-hypothesis" : "evolved-record");
    output << ",\"evidenceStatus\":";
    write_json_string(
        output, accepted_end == "0" ? "declared-initial-condition"
                                     : "executable_architecture_evidence");
    output << ",\"generatingSpec\":";
    write_json_string(output, options.generating_spec);
    output << ",\"date\":";
    write_json_string(output, options.record_date);
    output << ",\"recordAuthority\":\"eom-native-coupled-evolution\""
           << ",\"modelFingerprint\":";
    write_json_string(output, model_fingerprint);
    output << ",\"runStatus\":";
    write_json_string(output, run_status);
    output << "},\"window\":{\"start\":0,\"end\":";
    write_json_string(output, accepted_end);
    output << ",\"delayHorizon\":" << options.delay_horizon
           << ",\"sampleInterval\":"
           << options.step * static_cast<double>(options.sample_every)
           << "},\"worldlines\":[";
    for (std::size_t path_index = 0; path_index < published_paths.size();
         ++path_index) {
      if (path_index > 0) output << ',';
      const auto& published = published_paths[path_index];
      const auto& segments = published.history.segments();
      const std::size_t declared_count = declared_segment_counts[path_index];
      if (published.path_id != declared_path_ids[path_index]) {
        throw std::runtime_error(
            "published history order differs from the declared path order");
      }
      if (segments.size() < declared_count) {
        throw std::runtime_error(
            "published history lost declared prehistory segments");
      }
      output << "{\"id\":";
      write_json_string(output, published.path_id);
      output << ",\"pathKey\":" << (path_index + 1)
             << ",\"polarity\":"
             << (state_flags_for_charge(published.charge) == 1 ? 1 : -1)
             << ",\"charge\":";
      write_json_string(output, published.charge);
      output << ",\"stateFlags\":"
             << state_flags_for_charge(published.charge)
             << ",\"coverageStart\":";
      write_json_string(output, segments.front().t_start_token());
      output << ",\"coverageEnd\":";
      write_json_string(output, segments.back().t_end_token());
      output << ",\"interpolation\":\"certified-piecewise-cubic-v0\""
             << ",\"historyFingerprint\":";
      write_json_string(output, published.history.provenance_fingerprint());
      output << ",\"declaredPrehistorySegmentCount\":" << declared_count
             << ",\"evolvedSegmentCount\":"
             << (segments.size() - declared_count)
             << ",\"segments\":[";
      std::size_t segment_index = 0;
      for (const auto& segment : segments) {
        if (segment_index > 0) output << ',';
        write_segment(output, segment);
        ++segment_index;
      }
      output << "]}";
    }
    output << "],\"binaries\":[],\"ansatz\":[],\"events\":[]}\n";
    output.flush();
    if (!output) {
      throw std::runtime_error("failed to write assembly-view record");
    }
  }
  std::filesystem::rename(temporary_path, path);
}

struct CensusAccumulator {
  double minimum_pair_distance = std::numeric_limits<double>::infinity();
};

std::string read_text_file(const std::filesystem::path& path) {
  std::ifstream input(path);
  if (!input) {
    throw std::runtime_error(
        "resume manifest is missing or unreadable: " + path.string());
  }
  std::ostringstream contents;
  contents << input.rdbuf();
  if (!input.good() && !input.eof()) {
    throw std::runtime_error(
        "resume manifest read failed: " + path.string());
  }
  return contents.str();
}

std::size_t manifest_value_start(
    const std::string& manifest, std::string_view field) {
  const std::string key = "\"" + std::string(field) + "\":";
  const std::size_t found = manifest.find(key);
  if (found == std::string::npos) {
    throw std::runtime_error(
        "resume manifest lacks required field: " + std::string(field));
  }
  return found + key.size();
}

std::string manifest_string(
    const std::string& manifest, std::string_view field) {
  std::size_t cursor = manifest_value_start(manifest, field);
  if (cursor >= manifest.size() || manifest[cursor] != '"') {
    throw std::runtime_error(
        "resume manifest field is not a string: " + std::string(field));
  }
  ++cursor;
  std::string value;
  bool escaped = false;
  for (; cursor < manifest.size(); ++cursor) {
    const char character = manifest[cursor];
    if (escaped) {
      switch (character) {
        case '"':
        case '\\': value.push_back(character); break;
        case 'n': value.push_back('\n'); break;
        case 'r': value.push_back('\r'); break;
        case 't': value.push_back('\t'); break;
        default:
          throw std::runtime_error(
              "resume manifest string uses an unsupported escape");
      }
      escaped = false;
    } else if (character == '\\') {
      escaped = true;
    } else if (character == '"') {
      return value;
    } else {
      value.push_back(character);
    }
  }
  throw std::runtime_error(
      "resume manifest has an unterminated string field: " +
      std::string(field));
}

std::string manifest_number_token(
    const std::string& manifest, std::string_view field) {
  std::size_t cursor = manifest_value_start(manifest, field);
  const std::size_t start = cursor;
  while (cursor < manifest.size()) {
    const char character = manifest[cursor];
    if ((character >= '0' && character <= '9') || character == '-' ||
        character == '+' || character == '.' || character == 'e' ||
        character == 'E') {
      ++cursor;
      continue;
    }
    break;
  }
  if (cursor == start) {
    throw std::runtime_error(
        "resume manifest field is not numeric: " + std::string(field));
  }
  return manifest.substr(start, cursor - start);
}

std::size_t manifest_size(
    const std::string& manifest, std::string_view field) {
  const std::string value = manifest_number_token(manifest, field);
  std::size_t consumed = 0;
  const unsigned long long parsed = std::stoull(value, &consumed);
  if (consumed != value.size() ||
      parsed > static_cast<unsigned long long>(
          std::numeric_limits<std::size_t>::max())) {
    throw std::runtime_error(
        "resume manifest size field is invalid: " + std::string(field));
  }
  return static_cast<std::size_t>(parsed);
}

double manifest_double(
    const std::string& manifest, std::string_view field) {
  const std::string value = manifest_number_token(manifest, field);
  std::size_t consumed = 0;
  const double parsed = std::stod(value, &consumed);
  if (consumed != value.size() || !std::isfinite(parsed) || parsed < 0.0) {
    throw std::runtime_error(
        "resume manifest numeric field is invalid: " + std::string(field));
  }
  return parsed;
}

struct ResumeAccounting {
  std::string run_id;
  std::string seed_family;
  std::string model_fingerprint;
  std::string resume_configuration_fingerprint;
  std::string release_root_clearance;
  std::string accepted_end_time;
  std::size_t chunks_completed = 0;
  std::size_t accepted_steps = 0;
  std::size_t rejected_steps = 0;
  std::size_t frames_emitted = 0;
  std::size_t resume_count = 0;
  double cumulative_wall_seconds = 0.0;
};

ResumeAccounting read_resume_accounting(
    const std::filesystem::path& path) {
  const std::string manifest = read_text_file(path);
  if (manifest_string(manifest, "schema") !=
          "eom_attractor_ensemble_run_manifest/v1" ||
      manifest_string(manifest, "resumeAccountingSchema") !=
          "eom_attractor_resume_accounting/v1") {
    throw std::runtime_error(
        "resume manifest predates corrected cumulative accounting");
  }
  return {
      .run_id = manifest_string(manifest, "runId"),
      .seed_family = manifest_string(manifest, "seedFamily"),
      .model_fingerprint = manifest_string(manifest, "modelFingerprint"),
      .resume_configuration_fingerprint =
          manifest_string(manifest, "resumeConfigurationFingerprint"),
      .release_root_clearance =
          manifest_string(manifest, "releaseRootClearance"),
      .accepted_end_time = manifest_string(manifest, "acceptedEndTime"),
      .chunks_completed = manifest_size(manifest, "chunksCompleted"),
      .accepted_steps = manifest_size(manifest, "acceptedSteps"),
      .rejected_steps = manifest_size(manifest, "rejectedSteps"),
      .frames_emitted = manifest_size(manifest, "framesEmitted"),
      .resume_count = manifest_size(manifest, "resumeCount"),
      .cumulative_wall_seconds =
          manifest_double(manifest, "cumulativeWallSeconds"),
  };
}

void write_census_row(
    std::ostream& output, const Options& options,
    const std::string& time_token,
    const std::vector<SeedRow>& rows,
    const std::vector<SampledState>& states,
    const CensusAccumulator& accumulator,
    const eom::NativeCoupledEvolutionCertificate& chunk,
    double cumulative_wall_seconds) {
  const auto labels = cluster_labels(states, options.link_distance);
  Vector3 centroid{};
  for (const auto& state : states) {
    centroid.x += state.position.x;
    centroid.y += state.position.y;
    centroid.z += state.position.z;
  }
  const double count = static_cast<double>(states.size());
  centroid = {centroid.x / count, centroid.y / count, centroid.z / count};

  output << "{\"time\":";
  write_json_string(output, time_token);
  output << std::setprecision(17) << ",\"clusters\":[";
  bool first_cluster = true;
  for (std::size_t root = 0; root < states.size(); ++root) {
    std::vector<std::size_t> members;
    for (std::size_t index = 0; index < states.size(); ++index) {
      if (labels[index] == root) {
        members.push_back(index);
      }
    }
    if (members.empty()) {
      continue;
    }
    if (!first_cluster) output << ',';
    first_cluster = false;
    std::size_t positive = 0;
    Vector3 cluster_centroid{};
    for (const std::size_t member : members) {
      if (rows[member].charge == kCharge) ++positive;
      cluster_centroid.x += states[member].position.x;
      cluster_centroid.y += states[member].position.y;
      cluster_centroid.z += states[member].position.z;
    }
    const double size = static_cast<double>(members.size());
    cluster_centroid = {cluster_centroid.x / size, cluster_centroid.y / size,
                        cluster_centroid.z / size};
    double maximum_separation = 0.0;
    double separation_sum = 0.0;
    std::size_t separation_count = 0;
    for (std::size_t left = 0; left < members.size(); ++left) {
      for (std::size_t right = left + 1; right < members.size(); ++right) {
        const double value = distance(
            states[members[left]].position, states[members[right]].position);
        maximum_separation = std::max(maximum_separation, value);
        separation_sum += value;
        ++separation_count;
      }
    }
    // Mass-free kinematic circulation ledger: sum of (x - centroid) x v.
    Vector3 circulation{};
    for (const std::size_t member : members) {
      const Vector3 offset{
          states[member].position.x - cluster_centroid.x,
          states[member].position.y - cluster_centroid.y,
          states[member].position.z - cluster_centroid.z};
      const Vector3& velocity = states[member].velocity;
      circulation.x += offset.y * velocity.z - offset.z * velocity.y;
      circulation.y += offset.z * velocity.x - offset.x * velocity.z;
      circulation.z += offset.x * velocity.y - offset.y * velocity.x;
    }
    output << "{\"members\":[";
    for (std::size_t index = 0; index < members.size(); ++index) {
      if (index > 0) output << ',';
      write_json_string(output, rows[members[index]].path_id);
    }
    output << "],\"size\":" << members.size()
           << ",\"positive\":" << positive
           << ",\"negative\":" << (members.size() - positive)
           << ",\"netChargeSixths\":"
           << (static_cast<long long>(positive) * 2 -
               static_cast<long long>(members.size()))
           << ",\"centroid\":[" << cluster_centroid.x << ','
           << cluster_centroid.y << ',' << cluster_centroid.z
           << "],\"maxPairSeparation\":" << maximum_separation
           << ",\"meanPairSeparation\":"
           << (separation_count > 0
                   ? separation_sum / static_cast<double>(separation_count)
                   : 0.0)
           << ",\"kinematicCirculation\":[" << circulation.x << ','
           << circulation.y << ',' << circulation.z << "]}";
  }
  output << "],\"escapers\":[";
  std::size_t escaper_count = 0;
  for (std::size_t index = 0; index < states.size(); ++index) {
    const Vector3 offset{
        states[index].position.x - centroid.x,
        states[index].position.y - centroid.y,
        states[index].position.z - centroid.z};
    const double radial = offset.x * states[index].velocity.x +
        offset.y * states[index].velocity.y +
        offset.z * states[index].velocity.z;
    const double range = std::hypot(offset.x, offset.y, offset.z);
    if (range > options.escape_radius && radial > 0.0) {
      if (escaper_count > 0) output << ',';
      write_json_string(output, rows[index].path_id);
      ++escaper_count;
    }
  }
  std::array<std::size_t, kSpeedBinEdges.size() + 1> histogram{};
  double maximum_speed = 0.0;
  std::size_t near_pin = 0;
  for (const auto& state : states) {
    const double value = speed(state.velocity);
    maximum_speed = std::max(maximum_speed, value);
    if (value >= options.pin_speed) ++near_pin;
    std::size_t bin = 0;
    while (bin < kSpeedBinEdges.size() && value >= kSpeedBinEdges[bin]) {
      ++bin;
    }
    ++histogram[bin > 0 ? bin - 1 : 0];
  }
  double maximum_root_time_pressure_ratio = 0.0;
  double minimum_transmitter_factor_magnitude =
      std::numeric_limits<double>::infinity();
  double minimum_same_polarity_root_gap =
      std::numeric_limits<double>::infinity();
  double minimum_opposite_polarity_root_gap =
      std::numeric_limits<double>::infinity();
  std::size_t maximum_root_multiplicity = 0;
  for (const auto& step : chunk.steps) {
    if (step.status != "accepted" || !step.accepted_snapshot.has_value()) {
      continue;
    }
    maximum_root_time_pressure_ratio = std::max(
        maximum_root_time_pressure_ratio, step.root_time_pressure_ratio);
    for (const auto& pair : step.accepted_snapshot->root_certificates) {
      std::vector<std::pair<double, double>> brackets;
      brackets.reserve(pair.certificate.roots.size());
      for (const auto& root : pair.certificate.roots) {
        const double lower = std::stod(root.lower);
        const double upper = std::stod(root.upper);
        brackets.emplace_back(lower, upper);
        const double factor_lower = std::stod(
            root.transmitter_factor_lower);
        const double factor_upper = std::stod(
            root.transmitter_factor_upper);
        minimum_transmitter_factor_magnitude = std::min(
            minimum_transmitter_factor_magnitude,
            std::min(std::abs(factor_lower), std::abs(factor_upper)));
      }
      maximum_root_multiplicity = std::max(
          maximum_root_multiplicity, brackets.size());
      std::sort(brackets.begin(), brackets.end());
      const bool same_polarity = !pair.receiver_path_id.empty() &&
          !pair.transmitter_path_id.empty() &&
          pair.receiver_path_id.back() == pair.transmitter_path_id.back();
      for (std::size_t index = 1; index < brackets.size(); ++index) {
        const double gap = std::max(
            0.0, brackets[index].first - brackets[index - 1].second);
        double& class_minimum = same_polarity
            ? minimum_same_polarity_root_gap
            : minimum_opposite_polarity_root_gap;
        class_minimum = std::min(class_minimum, gap);
      }
    }
  }
  output << "],\"escaperCount\":" << escaper_count
         << ",\"speedHistogramEdges\":[";
  for (std::size_t index = 0; index < kSpeedBinEdges.size(); ++index) {
    if (index > 0) output << ',';
    output << kSpeedBinEdges[index];
  }
  output << ",1],\"speedHistogram\":[";
  for (std::size_t index = 0; index < histogram.size(); ++index) {
    if (index > 0) output << ',';
    output << histogram[index];
  }
  output << "],\"maxSpeed\":" << maximum_speed
         << ",\"nearPinCount\":" << near_pin
         << ",\"minPairDistanceInChunk\":"
         << accumulator.minimum_pair_distance
         << ",\"engine\":{\"status\":";
  write_json_string(output, chunk.status);
  output << ",\"haltCode\":";
  write_json_string(output, chunk.halt_code);
  output << ",\"acceptedSteps\":" << chunk.accepted_step_count
         << ",\"rejectedSteps\":" << chunk.rejected_step_count
         << ",\"mpfrPairs\":" << chunk.timing.root_mpfr_pair_count
         << ",\"maximumRootTimePressureRatio\":"
         << maximum_root_time_pressure_ratio
         << ",\"minimumTransmitterFactorMagnitude\":";
  if (std::isfinite(minimum_transmitter_factor_magnitude)) {
    output << minimum_transmitter_factor_magnitude;
  } else {
    output << "null";
  }
  output << ",\"minimumSamePolarityRootGap\":";
  if (std::isfinite(minimum_same_polarity_root_gap)) {
    output << minimum_same_polarity_root_gap;
  } else {
    output << "null";
  }
  output << ",\"minimumOppositePolarityRootGap\":";
  if (std::isfinite(minimum_opposite_polarity_root_gap)) {
    output << minimum_opposite_polarity_root_gap;
  } else {
    output << "null";
  }
  output << ",\"maximumRootMultiplicity\":" << maximum_root_multiplicity
         << ",\"chunkWallSeconds\":" << chunk.timing.total_wall_seconds
         << ",\"cumulativeWallSeconds\":" << cumulative_wall_seconds
         << "}}\n";
}

void write_manifest(
    const std::filesystem::path& path, const Options& options,
    const std::vector<SeedRow>& rows, const std::string& model_fingerprint,
    const std::string& root_clearance_status,
    std::size_t chunks_completed, const std::string& accepted_end,
    std::size_t accepted_steps, std::size_t rejected_steps,
    std::size_t frames_emitted, std::size_t resume_count,
    double cumulative_wall_seconds,
    const std::string& status) {
  const auto temporary_path = path.string() + ".tmp";
  std::ofstream output(temporary_path, std::ios::trunc);
  if (!output) {
    throw std::runtime_error(
        "failed to open run manifest temporary file");
  }
  output << std::setprecision(17)
         << "{\"schema\":\"eom_attractor_ensemble_run_manifest/v1\""
         << ",\"resumeAccountingSchema\":"
            "\"eom_attractor_resume_accounting/v1\""
         << ",\"runId\":";
  write_json_string(output, options.run_id);
  output << ",\"seedFamily\":";
  write_json_string(output, options.seed_family);
  output
         << ",\"population\":" << options.population
         << ",\"seedOffset\":" << options.seed_offset
         << ",\"prehistoryFamily\":";
  write_json_string(output, options.prehistory);
  output << ",\"historyDepth\":" << options.history_depth
         << ",\"historySegmentStep\":" << options.history_segment_step
         << ",\"requestedEndTime\":" << options.end_time
         << ",\"step\":" << options.step
         << ",\"chunkSteps\":" << options.chunk_steps
         << ",\"sampleEvery\":" << options.sample_every
         << ",\"linkDistance\":" << options.link_distance
         << ",\"escapeRadius\":" << options.escape_radius
         << ",\"pinSpeed\":" << options.pin_speed
         << ",\"threadCount\":" << options.thread_count
         << ",\"delayHorizon\":" << options.delay_horizon
         << ",\"rootMaxDepth\":" << options.root_max_depth
         << ",\"rootTolerance\":";
  write_json_string(output, options.root_tolerance);
  output << ",\"transmitterFactorFloor\":";
  write_json_string(output, options.transmitter_factor_floor);
  output << ",\"coupling\":";
  write_json_string(output, token(kNativeCoupling));
  output << ",\"modelFingerprint\":";
  write_json_string(output, model_fingerprint);
  output << ",\"resumeConfigurationFingerprint\":";
  write_json_string(
      output, harness_resume_fingerprint(options, model_fingerprint));
  output << ",\"engineBuildId\":";
  write_json_string(output, options.engine_build_id);
  output << ",\"generatingSpec\":";
  write_json_string(output, options.generating_spec);
  output << ",\"recordDate\":";
  write_json_string(output, options.record_date);
  output << ",\"releaseRootClearance\":";
  write_json_string(output, root_clearance_status);
  output << ",\"chunksCompleted\":" << chunks_completed
         << ",\"acceptedSteps\":" << accepted_steps
         << ",\"rejectedSteps\":" << rejected_steps
         << ",\"acceptedEndTime\":";
  write_json_string(output, accepted_end);
  output << ",\"framesEmitted\":" << frames_emitted
         << ",\"resumeCount\":" << resume_count
         << ",\"cumulativeWallSeconds\":" << cumulative_wall_seconds
         << ",\"crossChunkComparisonPolicy\":"
            "\"integer-grid-decimal-endpoints/v1\""
         << ",\"status\":";
  write_json_string(output, status);
  if (options.seed_family == "campaign1-subfield-binary-v1") {
    output << ",\"campaign1Coordinate\":{\"separation\":"
           << options.binary_separation << ",\"speed\":"
           << options.binary_speed << ",\"angleId\":";
    write_json_string(output, options.binary_angle);
    output << ",\"angleRadians\":"
           << campaign1_angle_radians(options.binary_angle)
           << ",\"prehistoryId\":";
    write_json_string(output, options.prehistory);
    output << ",\"refinement\":";
    write_json_string(output, options.refinement);
    output << '}';
  } else if (options.seed_family == "stationary-rest-binary-v1") {
    output << ",\"stationaryBinaryCoordinate\":{\"separation\":1"
           << ",\"releaseSpeed\":0"
           << ",\"prehistoryId\":\"stationary-held\""
           << ",\"historyDepth\":" << options.history_depth
           << ",\"refinement\":";
    write_json_string(output, options.refinement);
    output << '}';
  } else if (options.seed_family == "f6c-balanced-tetrahedral-v1") {
    output << ",\"f6cCoordinate\":{\"hPositive\":"
           << 0.3 + options.f6c_positive_h_amplitude *
                  std::sin(options.f6c_cycle_phase +
                           options.f6c_positive_h_phase_offset)
           << ",\"rhoPositive\":"
           << 0.3 + options.f6c_positive_rho_amplitude *
                  std::sin(options.f6c_cycle_phase +
                           options.f6c_positive_rho_phase_offset)
           << ",\"hNegative\":"
           << 0.3 + options.f6c_negative_h_amplitude *
                  std::sin(options.f6c_cycle_phase +
                           options.f6c_negative_h_phase_offset)
           << ",\"rhoNegative\":"
           << 0.3 + options.f6c_negative_rho_amplitude *
                  std::sin(options.f6c_cycle_phase +
                           options.f6c_negative_rho_phase_offset)
           << ",\"positiveRate\":"
           << options.f6c_positive_rate
           << ",\"negativeRate\":" << options.f6c_negative_rate
           << ",\"negativeTheta\":" << options.f6c_negative_theta
           << ",\"breathingRate\":" << options.f6c_breathing_rate
           << ",\"radialBreathingRatio\":"
           << options.f6c_radial_breathing_ratio
           << ",\"radialBreathingRate\":"
           << options.f6c_breathing_rate *
                  options.f6c_radial_breathing_ratio
           << ",\"cyclePhase\":" << options.f6c_cycle_phase
           << ",\"positiveHAmplitude\":"
           << options.f6c_positive_h_amplitude
           << ",\"negativeHAmplitude\":"
           << options.f6c_negative_h_amplitude
           << ",\"positiveRhoAmplitude\":"
           << options.f6c_positive_rho_amplitude
           << ",\"negativeRhoAmplitude\":"
           << options.f6c_negative_rho_amplitude
           << ",\"positivePhaseAmplitude\":"
           << options.f6c_positive_phase_amplitude
           << ",\"negativePhaseAmplitude\":"
           << options.f6c_negative_phase_amplitude
           << ",\"positiveHPhaseOffset\":"
           << options.f6c_positive_h_phase_offset
           << ",\"negativeHPhaseOffset\":"
           << options.f6c_negative_h_phase_offset
           << ",\"positiveRhoPhaseOffset\":"
           << options.f6c_positive_rho_phase_offset
           << ",\"negativeRhoPhaseOffset\":"
           << options.f6c_negative_rho_phase_offset << '}';
  } else if (options.seed_family == "f6c-cubic-lattice-o0-v1") {
    output << ",\"f6cCubicLatticeCoordinate\":{\"spacing\":"
           << options.lattice_spacing
           << ",\"orbitRadius\":" << options.lattice_orbit_radius
           << ",\"angularRate\":" << options.lattice_angular_rate
           << ",\"orbitSpeed\":"
           << options.lattice_orbit_radius * options.lattice_angular_rate
           << ",\"boundaryStatus\":\"finite_replicated_diagnostic\""
           << ",\"latticeSide\":" << options.lattice_side
           << ",\"siteCell\":\"" << options.lattice_side << "x"
           << options.lattice_side << "x" << options.lattice_side
           << "-conventional-open-crop\"}";
  } else if (options.seed_family == "f6c-cubic-site-local-v1") {
    output << ",\"adaptiveCubicMediumCoordinate\":{\"spacing\":"
           << options.lattice_spacing
           << ",\"orbitRadius\":" << options.lattice_orbit_radius
           << ",\"angularRate\":" << options.lattice_angular_rate
           << ",\"candidatePeriod\":"
           << 2.0 * kPi / options.lattice_angular_rate
           << ",\"minimumAntipodalChartPrehistory\":"
           << kPi / options.lattice_angular_rate
           << ",\"orbitSpeed\":"
           << options.lattice_orbit_radius * options.lattice_angular_rate
           << ",\"orientationField\":";
    write_json_string(output, options.lattice_orientation_field);
    output << ",\"siteHistoryContract\":"
              "\"period-antipode-midpoint/v1\""
           << ",\"boundaryStatus\":\"finite_replicated_diagnostic\""
           << ",\"latticeSide\":" << options.lattice_side
           << ",\"siteCell\":\"" << options.lattice_side << "x"
           << options.lattice_side << "x" << options.lattice_side
           << "-conventional-open-crop\"}";
  }
  output << ",\"evidence\":{\"eomEvidenceStatus\":"
            "\"executable_architecture_evidence\""
         << ",\"canonicalEomEvidence\":false}"
         << ",\"seeds\":[";
  for (std::size_t index = 0; index < rows.size(); ++index) {
    const auto& row = rows[index];
    if (index > 0) output << ',';
    output << "{\"pathId\":";
    write_json_string(output, row.path_id);
    output << ",\"charge\":";
    write_json_string(output, row.charge);
    if (options.seed_family == "campaign1-subfield-binary-v1") {
      const Campaign1Coordinate coordinate{
          options.binary_separation, options.binary_speed,
          options.binary_angle, options.prehistory,
          campaign1_refinement(options.refinement)};
      const int polarity = row.charge == kCharge ? +1 : -1;
      const auto position = campaign1_release_position(coordinate, polarity);
      const auto velocity = campaign1_release_velocity(coordinate, polarity);
      output << ",\"releasePosition\":[" << position.x << ',' << position.y
             << ',' << position.z << "]"
             << ",\"releaseVelocity\":[" << velocity.x << ',' << velocity.y
             << ',' << velocity.z << "]"
             << ",\"speed\":" << row.speed << '}';
    } else if (options.seed_family == "stationary-rest-binary-v1") {
      const double signed_x = row.charge == kCharge ? 0.5 : -0.5;
      output << ",\"releasePosition\":[" << signed_x << ",0,0]"
             << ",\"releaseVelocity\":[0,0,0]"
             << ",\"speed\":0}";
    } else {
      output << ",\"radius\":" << row.radius
             << ",\"height\":" << row.height
             << ",\"phase\":" << row.phase
             << ",\"speed\":" << row.speed
             << ",\"sense\":" << row.sense;
      if (options.seed_family == "f6c-balanced-tetrahedral-v1") {
        output << ",\"tiltX\":" << row.tilt_x
               << ",\"tiltY\":" << row.tilt_y;
      } else if (options.seed_family == "f6c-cubic-site-local-v1") {
        const std::array<double, 3> normal = {
            row.frame_p[1] * row.frame_q[2] -
                row.frame_p[2] * row.frame_q[1],
            row.frame_p[2] * row.frame_q[0] -
                row.frame_p[0] * row.frame_q[2],
            row.frame_p[0] * row.frame_q[1] -
                row.frame_p[1] * row.frame_q[0]};
        output << ",\"frameP\":[" << row.frame_p[0] << ','
               << row.frame_p[1] << ',' << row.frame_p[2] << ']'
               << ",\"frameQ\":[" << row.frame_q[0] << ','
               << row.frame_q[1] << ',' << row.frame_q[2] << ']'
               << ",\"frameNormal\":[" << normal[0] << ','
               << normal[1] << ',' << normal[2] << ']';
      }
      output << '}';
    }
  }
  output << "]}\n";
  output.flush();
  if (!output) {
    throw std::runtime_error("failed to write run manifest");
  }
  output.close();
  std::filesystem::rename(temporary_path, path);
}

// Wrap the streamed frame JSONL into one borg-fixture-trajectory.v1-shaped
// replay document the Borg app can visualize.
void write_replay_wrapper(
    const std::filesystem::path& frames_path,
    const std::filesystem::path& replay_path, const Options& options,
    std::size_t frame_count, std::size_t keyframe_count,
    const std::string& end_time_token) {
  std::ifstream frames(frames_path);
  std::ofstream output(replay_path);
  output << std::setprecision(17)
         << "{\"schema\":\"borg-fixture-trajectory.v1\""
         << ",\"manifestId\":";
  write_json_string(output, options.run_id + "-manifest");
  output << ",\"runId\":";
  write_json_string(output, options.run_id);
  output << ",\"nativeRunId\":";
  write_json_string(output, options.run_id + "-native-run");
  output << ",\"recordAuthority\":\"eom-native-coupled-evolution\""
         << ",\"claimLevel\":\"developer-test\""
         << ",\"canonicalEomEvidence\":false"
         << ",\"eomEvidenceStatus\":\"executable_architecture_evidence\""
         << ",\"eomEvidenceReason\":\"EOM solver coupled evolution output; "
            "Borg shadow output remains noncanonical pending the migration "
            "gates.\""
         << ",\"frameCount\":" << frame_count
         << ",\"pathRowCount\":" << frame_count
         << ",\"nativeKeyframeCount\":" << keyframe_count
         << ",\"sampleInterval\":"
         << options.step * static_cast<double>(options.sample_every)
         << ",\"historyStartTime\":0,\"historyEndTime\":"
         << end_time_token
         << ",\"currentStateFrames\":[";
  std::string line;
  bool first = true;
  std::vector<std::pair<std::size_t, std::size_t>> identifiers;
  while (std::getline(frames, line)) {
    if (line.empty()) continue;
    if (!first) output << ',';
    first = false;
    output << line;
    const auto path_key = line.find("\"pathKey\":");
    const auto frame_index = line.find("\"frameIndex\":");
    identifiers.emplace_back(
        std::stoull(line.substr(path_key + 10)),
        std::stoull(line.substr(frame_index + 13)));
  }
  output << "],\"trajectoryFrameIds\":[";
  for (std::size_t index = 0; index < identifiers.size(); ++index) {
    if (index > 0) output << ',';
    write_json_string(
        output,
        options.run_id + "-native-run:frame:" +
            std::to_string(identifiers[index].first) + ':' +
            std::to_string(identifiers[index].second));
  }
  output << "]}\n";
}

}  // namespace

int main(int argc, char** argv) {
  try {
    Options options;
    options.seed_family = option_string(
        argc, argv, "seed-family", options.seed_family);
    options.population = static_cast<std::size_t>(
        option_double(argc, argv, "population", 6.0));
    options.seed_offset = static_cast<std::size_t>(
        option_double(argc, argv, "seed-offset", 0.0));
    options.prehistory =
        option_string(argc, argv, "prehistory", options.prehistory);
    options.binary_separation = option_double(
        argc, argv, "binary-separation", options.binary_separation);
    options.binary_speed = option_double(
        argc, argv, "binary-speed", options.binary_speed);
    options.f6c_positive_rate = option_double(
        argc, argv, "f6c-positive-rate", options.f6c_positive_rate);
    options.f6c_negative_rate = option_double(
        argc, argv, "f6c-negative-rate", options.f6c_negative_rate);
    options.f6c_negative_theta = option_double(
        argc, argv, "f6c-negative-theta", options.f6c_negative_theta);
    options.f6c_breathing_rate = option_double(
        argc, argv, "f6c-breathing-rate", options.f6c_breathing_rate);
    options.f6c_radial_breathing_ratio = option_double(
        argc, argv, "f6c-radial-breathing-ratio",
        options.f6c_radial_breathing_ratio);
    options.f6c_cycle_phase = option_double(
        argc, argv, "f6c-cycle-phase", options.f6c_cycle_phase);
    options.f6c_positive_h_amplitude = option_double(
        argc, argv, "f6c-positive-h-amplitude",
        options.f6c_positive_h_amplitude);
    options.f6c_negative_h_amplitude = option_double(
        argc, argv, "f6c-negative-h-amplitude",
        options.f6c_negative_h_amplitude);
    options.f6c_positive_rho_amplitude = option_double(
        argc, argv, "f6c-positive-rho-amplitude",
        options.f6c_positive_rho_amplitude);
    options.f6c_negative_rho_amplitude = option_double(
        argc, argv, "f6c-negative-rho-amplitude",
        options.f6c_negative_rho_amplitude);
    options.f6c_positive_phase_amplitude = option_double(
        argc, argv, "f6c-positive-phase-amplitude",
        options.f6c_positive_phase_amplitude);
    options.f6c_negative_phase_amplitude = option_double(
        argc, argv, "f6c-negative-phase-amplitude",
        options.f6c_negative_phase_amplitude);
    options.f6c_positive_h_phase_offset = option_double(
        argc, argv, "f6c-positive-h-phase-offset",
        options.f6c_positive_h_phase_offset);
    options.f6c_negative_h_phase_offset = option_double(
        argc, argv, "f6c-negative-h-phase-offset",
        options.f6c_negative_h_phase_offset);
    options.f6c_positive_rho_phase_offset = option_double(
        argc, argv, "f6c-positive-rho-phase-offset",
        options.f6c_positive_rho_phase_offset);
    options.f6c_negative_rho_phase_offset = option_double(
        argc, argv, "f6c-negative-rho-phase-offset",
        options.f6c_negative_rho_phase_offset);
    options.lattice_spacing = option_double(
        argc, argv, "lattice-spacing", options.lattice_spacing);
    options.lattice_orbit_radius = option_double(
        argc, argv, "lattice-orbit-radius", options.lattice_orbit_radius);
    options.lattice_angular_rate = option_double(
        argc, argv, "lattice-angular-rate", options.lattice_angular_rate);
    options.lattice_side = static_cast<std::size_t>(option_double(
        argc, argv, "lattice-side", static_cast<double>(options.lattice_side)));
    options.lattice_orientation_field = option_string(
        argc, argv, "lattice-orientation-field",
        options.lattice_orientation_field);
    options.binary_angle = option_string(
        argc, argv, "binary-angle", options.binary_angle);
    options.refinement = option_string(
        argc, argv, "refinement", options.refinement);
    options.campaign1_grid_manifest = option_string(
        argc, argv, "campaign1-grid-manifest",
        options.campaign1_grid_manifest);
    options.end_time = option_double(argc, argv, "end-time", options.end_time);
    options.step = option_double(argc, argv, "step", options.step);
    options.minimum_step =
        option_double(argc, argv, "minimum-step", options.step / 4.0);
    options.history_depth =
        option_double(argc, argv, "history-depth", options.history_depth);
    options.history_segment_step = option_double(
        argc, argv, "history-segment-step", options.history_segment_step);
    options.chunk_steps = static_cast<std::size_t>(
        option_double(argc, argv, "chunk-steps", 5.0));
    options.sample_every = static_cast<std::size_t>(
        option_double(argc, argv, "sample-every", 1.0));
    options.link_distance =
        option_double(argc, argv, "link-distance", options.link_distance);
    options.escape_radius =
        option_double(argc, argv, "escape-radius", options.escape_radius);
    options.pin_speed =
        option_double(argc, argv, "pin-speed", options.pin_speed);
    options.thread_count = static_cast<std::size_t>(
        option_double(argc, argv, "threads", 4.0));
    options.out_dir = option_string(argc, argv, "out-dir", options.out_dir);
    options.root_tolerance = option_string(
        argc, argv, "root-tolerance", options.root_tolerance);
    options.transmitter_factor_floor = option_string(
        argc, argv, "transmitter-factor-floor",
        options.transmitter_factor_floor);
    options.engine_build_id = option_string(
        argc, argv, "engine-build-id", options.engine_build_id);
    options.generating_spec = option_string(
        argc, argv, "generating-spec", options.generating_spec);
    options.record_date = option_string(
        argc, argv, "record-date", options.record_date);
    options.delay_horizon = option_double(
        argc, argv, "delay-horizon", options.history_depth);
    options.resume = has_flag(argc, argv, "resume");
    if (!options.campaign1_grid_manifest.empty()) {
      write_campaign1_grid_manifest(options.campaign1_grid_manifest);
      std::cout << "campaign1_workload_construction status=completed"
                << " configurations=27 prehistories=3 refinements=3"
                << " workloads=243 evolution_invoked=false"
                << " manifest=" << options.campaign1_grid_manifest << '\n';
      return 0;
    }
    if (options.seed_family == "campaign1-subfield-binary-v1") {
      const auto& refinement = campaign1_refinement(options.refinement);
      options.population = 2;
      options.history_depth = kCampaign1HistoryDepth;
      options.delay_horizon = kCampaign1HistoryDepth;
      options.step = refinement.step;
      options.minimum_step = refinement.step / 4.0;
      options.history_segment_step = refinement.history_segment_step;
      options.root_max_depth = refinement.root_max_depth;
      options.chunk_steps = refinement.chunk_steps;
    } else if (options.seed_family == "stationary-rest-binary-v1") {
      const auto& refinement = campaign1_refinement(options.refinement);
      options.population = 2;
      options.prehistory = "stationary-held";
      options.step = refinement.step;
      options.minimum_step = refinement.step / 4.0;
      options.history_segment_step = refinement.history_segment_step;
      options.root_max_depth = refinement.root_max_depth;
      options.chunk_steps = refinement.chunk_steps;
      options.delay_horizon = options.history_depth;
    } else if (options.seed_family == "f6c-balanced-tetrahedral-v1") {
      options.population = 8;
      options.prehistory = options.f6c_breathing_rate > 0.0
          ? "harmonic-breathing" : "circular";
    } else if (options.seed_family == "f6c-cubic-lattice-o0-v1") {
      options.population = options.lattice_side * options.lattice_side *
          options.lattice_side;
      options.prehistory = "antiphase-global-plane";
      options.lattice_orientation_field = "global-plane-v1";
    } else if (options.seed_family == "f6c-cubic-site-local-v1") {
      options.population = options.lattice_side * options.lattice_side *
          options.lattice_side;
      options.prehistory = "site-local-circular";
    } else if (options.seed_family != "phase0-shell-v1") {
      throw std::invalid_argument(
          "seed-family must be phase0-shell-v1, "
          "campaign1-subfield-binary-v1, stationary-rest-binary-v1, or "
          "f6c-balanced-tetrahedral-v1, f6c-cubic-lattice-o0-v1, or "
          "f6c-cubic-site-local-v1");
    }
    options.run_id = option_string(
        argc, argv, "run-id",
        options.seed_family == "campaign1-subfield-binary-v1"
            ? campaign1_run_id({
                  options.binary_separation, options.binary_speed,
                  options.binary_angle, options.prehistory,
                  campaign1_refinement(options.refinement)})
            : options.seed_family == "stationary-rest-binary-v1"
            ? "stationary-rest-d1-H" +
                  campaign1_scalar_id(options.history_depth) + "-" +
                  options.refinement
            : options.seed_family == "f6c-balanced-tetrahedral-v1"
            ? "f6c-balanced-tetrahedral-p" +
                  campaign1_scalar_id(options.f6c_positive_rate) + "-n" +
                  campaign1_scalar_id(options.f6c_negative_rate) + "-th" +
                  campaign1_scalar_id(options.f6c_negative_theta) +
                  (options.f6c_breathing_rate > 0.0
                       ? "-br" + campaign1_scalar_id(
                                      options.f6c_breathing_rate) +
                             "-cp" + campaign1_scalar_id(
                                         options.f6c_cycle_phase) +
                             (options.f6c_radial_breathing_ratio != 1.0
                                  ? "-rr" + campaign1_scalar_id(
                                                options.f6c_radial_breathing_ratio)
                                  : "") +
                             "-hp" + campaign1_scalar_id(
                                         options.f6c_positive_h_amplitude) +
                             "-hm" + campaign1_scalar_id(
                                         options.f6c_negative_h_amplitude) +
                             "-rp" + campaign1_scalar_id(
                                         options.f6c_positive_rho_amplitude) +
                             "-rm" + campaign1_scalar_id(
                                         options.f6c_negative_rho_amplitude) +
                             "-tp" + campaign1_scalar_id(
                                         options.f6c_positive_phase_amplitude) +
                             "-tm" + campaign1_scalar_id(
                                         options.f6c_negative_phase_amplitude) +
                             "-hhp" + campaign1_scalar_id(
                                          options.f6c_positive_h_phase_offset) +
                             "-hhm" + campaign1_scalar_id(
                                          options.f6c_negative_h_phase_offset) +
                             "-hrp" + campaign1_scalar_id(
                                          options.f6c_positive_rho_phase_offset) +
                             "-hrm" + campaign1_scalar_id(
                                          options.f6c_negative_rho_phase_offset)
                       : "") +
                  "-v1"
            : options.seed_family == "f6c-cubic-lattice-o0-v1"
            ? "f6c-cubic-lattice-o0-n" +
                  std::to_string(options.lattice_side) + "-d" +
                  campaign1_scalar_id(options.lattice_spacing) + "-rho" +
                  campaign1_scalar_id(options.lattice_orbit_radius) +
                  "-omega" +
                  campaign1_scalar_id(options.lattice_angular_rate) + "-v1"
            : options.seed_family == "f6c-cubic-site-local-v1"
            ? "f6c-cubic-site-local-n" +
                  std::to_string(options.lattice_side) + "-d" +
                  campaign1_scalar_id(options.lattice_spacing) + "-rho" +
                  campaign1_scalar_id(options.lattice_orbit_radius) +
                  "-omega" +
                  campaign1_scalar_id(options.lattice_angular_rate) + "-" +
                  options.lattice_orientation_field
            : "attractor-ensemble-n" + std::to_string(options.population) +
                  "-s" + std::to_string(options.seed_offset) + "-" +
                  options.prehistory);
    if (options.population % 2 != 0) {
      throw std::invalid_argument("population must be even (neutral mix)");
    }
    if (options.seed_family == "f6c-balanced-tetrahedral-v1") {
      const std::array<double, 13> breathing_values = {
          options.f6c_breathing_rate,
          options.f6c_radial_breathing_ratio,
          options.f6c_cycle_phase,
          options.f6c_positive_h_amplitude,
          options.f6c_negative_h_amplitude,
          options.f6c_positive_rho_amplitude,
          options.f6c_negative_rho_amplitude,
          options.f6c_positive_phase_amplitude,
          options.f6c_negative_phase_amplitude,
          options.f6c_positive_h_phase_offset,
          options.f6c_negative_h_phase_offset,
          options.f6c_positive_rho_phase_offset,
          options.f6c_negative_rho_phase_offset,
      };
      if (!(options.f6c_positive_rate > 0.0) ||
          !(options.f6c_negative_rate > 0.0) ||
          !std::isfinite(options.f6c_negative_theta) ||
          !std::all_of(
              breathing_values.begin(), breathing_values.end(),
              [](double value) { return std::isfinite(value); }) ||
          options.f6c_breathing_rate < 0.0 ||
          !(options.f6c_radial_breathing_ratio > 0.0)) {
        throw std::invalid_argument(
            "F6c rates and radial breathing ratio must be positive and all "
            "F6c coordinates finite");
      }
      const bool has_amplitude =
          options.f6c_positive_h_amplitude != 0.0 ||
          options.f6c_negative_h_amplitude != 0.0 ||
          options.f6c_positive_rho_amplitude != 0.0 ||
          options.f6c_negative_rho_amplitude != 0.0 ||
          options.f6c_positive_phase_amplitude != 0.0 ||
          options.f6c_negative_phase_amplitude != 0.0;
      if (options.f6c_breathing_rate == 0.0 && has_amplitude) {
        throw std::invalid_argument(
            "F6c breathing amplitudes require a positive breathing rate");
      }
      const auto valid_sector = [
          breathing_rate = options.f6c_breathing_rate,
          radial_breathing_rate = options.f6c_breathing_rate *
              options.f6c_radial_breathing_ratio](
              double angular_rate, double h_amplitude,
              double rho_amplitude, double phase_amplitude) {
        if (!(std::abs(h_amplitude) < 0.3) ||
            !(std::abs(rho_amplitude) < 0.3)) {
          return false;
        }
        const double maximum_speed = std::sqrt(
            std::pow(std::abs(h_amplitude) * breathing_rate, 2) +
            std::pow(
                std::abs(rho_amplitude) * radial_breathing_rate, 2) +
            std::pow(
                (0.3 + std::abs(rho_amplitude)) *
                    (angular_rate +
                     std::abs(phase_amplitude) * breathing_rate),
                2));
        return maximum_speed < 1.0;
      };
      if (!valid_sector(
              options.f6c_positive_rate,
              options.f6c_positive_h_amplitude,
              options.f6c_positive_rho_amplitude,
              options.f6c_positive_phase_amplitude) ||
          !valid_sector(
              options.f6c_negative_rate,
              options.f6c_negative_h_amplitude,
              options.f6c_negative_rho_amplitude,
              options.f6c_negative_phase_amplitude)) {
        throw std::invalid_argument(
            "F6c harmonic prehistory must keep h and rho positive and the "
            "conservative member-speed bound strictly below c_f=1");
      }
    }
    if ((options.seed_family == "f6c-cubic-lattice-o0-v1" ||
         options.seed_family == "f6c-cubic-site-local-v1") &&
        (options.lattice_side < 2U || options.lattice_side % 2U != 0U ||
         options.population != options.lattice_side * options.lattice_side *
             options.lattice_side ||
         !(options.lattice_spacing > 0.0) ||
         !(options.lattice_orbit_radius > 0.0) ||
         !(options.lattice_angular_rate > 0.0) ||
         !std::isfinite(options.lattice_spacing) ||
         !std::isfinite(options.lattice_orbit_radius) ||
         !std::isfinite(options.lattice_angular_rate) ||
         !(options.lattice_orbit_radius * options.lattice_angular_rate <
           1.0))) {
      throw std::invalid_argument(
          "cubic-lattice side must be even and at least two, population must "
          "equal side cubed, spacing, radius, and angular rate must be "
          "positive and finite, and orbit speed must remain below c_f=1");
    }
    if (options.seed_family == "f6c-cubic-site-local-v1" &&
        options.lattice_orientation_field != "tetrahedral-parity-v1") {
      throw std::invalid_argument(
          "site-local cubic seed currently requires the derived "
          "tetrahedral-parity-v1 orientation field");
    }
    if (options.seed_family == "phase0-shell-v1" &&
        options.prehistory != "circular" && options.prehistory != "straight") {
      throw std::invalid_argument("prehistory must be circular or straight");
    }
    if (options.seed_family == "campaign1-subfield-binary-v1") {
      campaign1_angle_radians(options.binary_angle);
      if (options.prehistory != "P0-inertial" &&
          options.prehistory != "P1-lateral" &&
          options.prehistory != "P2-longitudinal") {
        throw std::invalid_argument(
            "prehistory must be P0-inertial, P1-lateral, or P2-longitudinal");
      }
      const auto contains = [](const auto& values, double target) {
        return std::find(values.begin(), values.end(), target) != values.end();
      };
      if (!contains(kCampaign1Separations, options.binary_separation) ||
          !contains(kCampaign1Speeds, options.binary_speed)) {
        throw std::invalid_argument(
            "Campaign 1 separation and speed must be declared grid values");
      }
    }
    if (options.seed_family == "stationary-rest-binary-v1" &&
        !(options.history_depth > 1.0)) {
      throw std::invalid_argument(
          "stationary retained-history depth must exceed unit travel time");
    }
    if (options.chunk_steps == 0 || options.sample_every == 0) {
      throw std::invalid_argument("chunk-steps and sample-every must be >= 1");
    }

    const std::filesystem::path out_dir(options.out_dir);
    std::filesystem::create_directories(out_dir);
    const auto manifest_path = out_dir / "run-manifest.json";
    const auto census_path = out_dir / "census.jsonl";
    const auto frames_path = out_dir / "frames.jsonl";
    const auto replay_path = out_dir / "replay.borg-trajectory.json";
    const auto checkpoint_path = out_dir / "checkpoint.bin";
    const auto assembly_record_path = out_dir / "assembly-view-record.json";
    const auto release_acceleration_path =
        out_dir / "release-acceleration.json";

    const std::optional<Campaign1Coordinate> campaign1_coordinate =
        options.seed_family == "campaign1-subfield-binary-v1"
        ? std::optional<Campaign1Coordinate>({
              options.binary_separation, options.binary_speed,
              options.binary_angle, options.prehistory,
              campaign1_refinement(options.refinement)})
        : std::nullopt;
    const bool stationary_binary =
        options.seed_family == "stationary-rest-binary-v1";
    const bool f6c_balanced_tetrahedral =
        options.seed_family == "f6c-balanced-tetrahedral-v1";
    const bool f6c_cubic_lattice =
        options.seed_family == "f6c-cubic-lattice-o0-v1";
    const bool f6c_cubic_site_local =
        options.seed_family == "f6c-cubic-site-local-v1";
    const bool f6c_cubic = f6c_cubic_lattice || f6c_cubic_site_local;
    const auto rows = campaign1_coordinate.has_value()
        ? campaign1_rows(*campaign1_coordinate)
        : stationary_binary
        ? stationary_binary_rows()
        : f6c_balanced_tetrahedral
        ? f6c_balanced_tetrahedral_rows(
              options.f6c_positive_rate, options.f6c_negative_rate,
              options.f6c_negative_theta, options.f6c_breathing_rate,
              options.f6c_radial_breathing_ratio, options.f6c_cycle_phase,
              options.f6c_positive_h_amplitude,
              options.f6c_negative_h_amplitude,
              options.f6c_positive_rho_amplitude,
              options.f6c_negative_rho_amplitude,
              options.f6c_positive_phase_amplitude,
              options.f6c_negative_phase_amplitude,
              options.f6c_positive_h_phase_offset,
              options.f6c_negative_h_phase_offset,
              options.f6c_positive_rho_phase_offset,
              options.f6c_negative_rho_phase_offset)
        : f6c_cubic
        ? f6c_cubic_lattice_rows(
              options.lattice_side, options.lattice_spacing,
              options.lattice_orbit_radius, options.lattice_angular_rate,
              options.lattice_orientation_field)
        : seed_rows(options.population, options.seed_offset);
    std::vector<eom::NativeCoupledPathInput> paths =
        campaign1_coordinate.has_value()
        ? campaign1_paths(*campaign1_coordinate)
        : stationary_binary
        ? stationary_binary_paths(
              options.history_depth, options.history_segment_step)
        : std::vector<eom::NativeCoupledPathInput>{};
    double maximum_seed_speed = 0.0;
    if (!campaign1_coordinate.has_value() && !stationary_binary) {
      paths.reserve(rows.size());
      for (const auto& row : rows) {
        const int polarity = row.charge == kCharge ? +1 : -1;
        if (f6c_cubic) {
          paths.push_back({
              row.path_id,
              row.charge,
              f6c_cubic_lattice_history(
                  row, options.history_depth, options.history_segment_step,
                  options.lattice_angular_rate)});
          continue;
        }
        if (f6c_balanced_tetrahedral &&
            options.prehistory == "harmonic-breathing") {
          const std::size_t module = static_cast<std::size_t>(
              std::stoul(row.path_id.substr(0, row.path_id.size() - 1U)));
          paths.push_back({
              row.path_id,
              row.charge,
              f6c_harmonic_history(
                  row, module, polarity, options.history_depth,
                  options.history_segment_step,
                  options.f6c_positive_rate,
                  options.f6c_negative_rate,
                  options.f6c_negative_theta,
                  options.f6c_breathing_rate,
                  options.f6c_radial_breathing_ratio,
                  options.f6c_cycle_phase,
                  options.f6c_positive_h_amplitude,
                  options.f6c_negative_h_amplitude,
                  options.f6c_positive_rho_amplitude,
                  options.f6c_negative_rho_amplitude,
                  options.f6c_positive_phase_amplitude,
                  options.f6c_negative_phase_amplitude,
                  options.f6c_positive_h_phase_offset,
                  options.f6c_negative_h_phase_offset,
                  options.f6c_positive_rho_phase_offset,
                  options.f6c_negative_rho_phase_offset)});
          continue;
        }
        paths.push_back({
            row.path_id,
            row.charge,
            options.prehistory == "circular"
                ? circular_history(
                      row, options.history_depth, options.history_segment_step)
                : straight_history(row, options.history_depth)});
      }
    }
    for (const auto& row : rows) {
      maximum_seed_speed = std::max(maximum_seed_speed, row.speed);
    }
    std::cerr << "seed family=" << options.seed_family << " population="
              << options.population << " offset=" << options.seed_offset
              << " prehistory=" << options.prehistory
              << " maximum_seed_speed=" << maximum_seed_speed
              << " off_pin=" << (maximum_seed_speed < 1.0) << '\n';

    const auto request_template = build_request(options, paths);
    const std::string model_fingerprint =
        eom::native_evolution_model_fingerprint(request_template);
    std::vector<std::size_t> declared_segment_counts;
    std::vector<std::string> declared_path_ids;
    declared_segment_counts.reserve(paths.size());
    declared_path_ids.reserve(paths.size());
    for (const auto& path : paths) {
      declared_path_ids.push_back(path.path_id);
      declared_segment_counts.push_back(path.history.segments().size());
    }

    // Resume state.
    std::optional<eom::NativeEvolutionCheckpoint> checkpoint;
    std::size_t frame_index = 0;
    std::size_t frame_count = 0;
    std::size_t keyframe_count = 0;
    std::size_t chunks_completed = 0;
    std::size_t accepted_steps = 0;
    std::size_t rejected_steps = 0;
    std::size_t resume_count = 0;
    double cumulative_wall_seconds = 0.0;
    std::string accepted_end = "0";
    std::string root_clearance_status = "not_checked";
    if (options.resume) {
      checkpoint = eom::read_native_evolution_checkpoint(
          checkpoint_path.string());
      const ResumeAccounting prior = read_resume_accounting(manifest_path);
      if (prior.run_id != options.run_id ||
          prior.seed_family != options.seed_family ||
          prior.model_fingerprint != model_fingerprint ||
          prior.resume_configuration_fingerprint !=
              harness_resume_fingerprint(options, model_fingerprint) ||
          prior.accepted_end_time != checkpoint->accepted_time) {
        throw std::runtime_error(
            "resume manifest identity does not match the checkpoint or request");
      }
      if (prior.release_root_clearance != "certified_complete") {
        throw std::runtime_error(
            "resume manifest lacks certified release root clearance");
      }
      accepted_end = checkpoint->accepted_time;
      chunks_completed = prior.chunks_completed;
      accepted_steps = prior.accepted_steps;
      rejected_steps = prior.rejected_steps;
      cumulative_wall_seconds = prior.cumulative_wall_seconds;
      resume_count = prior.resume_count + 1U;
      // Continue the frame index from the streamed file.
      std::ifstream frames(frames_path);
      std::string line;
      while (std::getline(frames, line)) {
        if (!line.empty()) ++frame_count;
      }
      if (frame_count != prior.frames_emitted ||
          frame_count % options.population != 0U) {
        throw std::runtime_error(
            "resume frame stream does not match cumulative manifest accounting");
      }
      frame_index = frame_count / options.population;
      keyframe_count = frame_index;
      root_clearance_status = prior.release_root_clearance;
      std::cerr << "resume accepted_end=" << accepted_end
                << " chunks=" << chunks_completed
                << " accepted_steps=" << accepted_steps
                << " rejected_steps=" << rejected_steps
                << " frames=" << frame_count
                << " prior_cumulative_wall=" << cumulative_wall_seconds
                << " resume_count=" << resume_count << '\n';
    }

    std::ofstream census(
        census_path, options.resume ? std::ios::app : std::ios::trunc);
    std::ofstream frames(
        frames_path, options.resume ? std::ios::app : std::ios::trunc);
    census << std::setprecision(17);
    frames << std::setprecision(17);

    if (!options.resume) {
      // Release-time root clearance: every ordered pair must certify
      // complete before any release step is trusted.
      std::vector<eom::NativePublishedPath> initial;
      initial.reserve(paths.size());
      for (const auto& path : paths) {
        initial.push_back({path.path_id, path.history});
      }
      const auto snapshot = eom::certify_native_acceleration_snapshot(
          request_template, initial, "0");
      if (stationary_binary || f6c_balanced_tetrahedral ||
          f6c_cubic) {
        write_release_acceleration_atomic(
            release_acceleration_path, snapshot,
            stationary_binary
                ? "stationary_binary_release_acceleration/v0"
                : f6c_cubic_site_local
                ? "f6c_cubic_site_local_release_acceleration/v0"
                : f6c_cubic_lattice
                ? "f6c_cubic_lattice_release_acceleration/v0"
                : "f6c_release_acceleration/v0");
      }
      std::size_t unresolved = 0;
      for (const auto& row : snapshot.root_certificates) {
        if (row.certificate.status != "certified_complete") {
          ++unresolved;
          std::cerr << "root " << row.receiver_path_id << "<-"
                    << row.transmitter_path_id
                    << " status=" << row.certificate.status
                    << " failure=" << row.certificate.failure_code << '\n';
        }
      }
      root_clearance_status = unresolved == 0 && snapshot.status ==
          "certified_complete" ? "certified_complete" : "failed_closed";
      std::cerr << "release_root_clearance status="
                << root_clearance_status
                << " unresolved=" << unresolved << '\n';
      if (root_clearance_status != "certified_complete") {
        write_assembly_view_record_atomic(
            assembly_record_path, options, paths, declared_path_ids,
            declared_segment_counts, model_fingerprint, "0",
            "blocked_release_root_clearance");
        write_manifest(
            manifest_path, options, rows, model_fingerprint,
            root_clearance_status, 0, "0", 0, 0, 0, 0, 0.0,
            "blocked_release_root_clearance");
        return 2;
      }
      // Initial frame row (frameIndex 0 at the release time).
      for (std::size_t index = 0; index < initial.size(); ++index) {
        const auto state = sample_state(initial[index].history, "0");
        write_frame_row(
            frames, index + 1, 0, "0", state,
            state_flags_for_charge(paths[index].charge));
        frames << '\n';
        ++frame_count;
      }
      frames.flush();
      frame_index = 1;
      keyframe_count = 1;
    }

    const auto harness_start = std::chrono::steady_clock::now();
    const double chunk_duration =
        options.step * static_cast<double>(options.chunk_steps);
    std::string final_status = "completed";

    while (std::stod(accepted_end) + 1e-15 < options.end_time) {
      // Integer-grid chunk targets: the k-th chunk always ends at
      // (k+1) * chunk_duration regardless of resume history, so a resumed
      // run requests the same decimal endpoints as an uninterrupted one
      // (the engine's scheduling-tail rule snaps to the requested decimal).
      const std::size_t grid_index = static_cast<std::size_t>(std::floor(
          (std::stod(accepted_end) + options.step / 2.0) / chunk_duration));
      const double chunk_target = std::min(
          options.end_time,
          chunk_duration * static_cast<double>(grid_index + 1));
      auto request = request_template;
      const std::size_t chunk_index = chunks_completed;
      request.accepted_step_callback =
          [&harness_start, chunk_index, &options](
              std::size_t step_index, const std::string& accepted_time) {
            const double wall_seconds =
                std::chrono::duration<double>(
                    std::chrono::steady_clock::now() - harness_start)
                    .count();
            std::cerr << "heartbeat population=" << options.population
                      << " chunk=" << chunk_index
                      << " step=" << step_index
                      << " accepted_time=" << accepted_time
                      << " wall_seconds=" << wall_seconds << std::endl;
          };

      eom::NativeCoupledEvolutionCertificate chunk = [&]() {
        if (!checkpoint.has_value()) {
          request.end_time = token(chunk_target);
          return eom::evolve_native_coupled_histories(request);
        }
        return eom::resume_native_coupled_histories(
            request, *checkpoint, token(chunk_target));
      }();
      cumulative_wall_seconds += chunk.timing.total_wall_seconds;
      accepted_steps += chunk.accepted_step_count;
      rejected_steps += chunk.rejected_step_count;
      log_halt_detail(chunk);

      if (chunk.accepted_step_count == 0) {
        std::cerr << "chunk=" << chunks_completed
                  << " made no progress: status=" << chunk.status
                  << " halt=" << chunk.halt_code << '\n';
        final_status = "halted_" +
            (chunk.halt_code.empty() ? chunk.status : chunk.halt_code);
        break;
      }

      // Stream frames at every sample-every-th accepted step, plus the
      // chunk-boundary census from the last sampled states.
      CensusAccumulator accumulator;
      std::vector<SampledState> boundary_states(options.population);
      std::size_t accepted_in_chunk = 0;
      for (const auto& step_row : chunk.steps) {
        if (step_row.status != "accepted") continue;
        ++accepted_in_chunk;
        const bool sampled =
            accepted_in_chunk % options.sample_every == 0 ||
            step_row.accepted_time == chunk.accepted_end_time;
        if (!sampled) continue;
        std::vector<SampledState> states(options.population);
        for (std::size_t index = 0; index < step_row.published_histories.size();
             ++index) {
          states[index] = sample_state(
              step_row.published_histories[index].history,
              step_row.accepted_time);
        }
        for (std::size_t left = 0; left < states.size(); ++left) {
          for (std::size_t right = left + 1; right < states.size(); ++right) {
            accumulator.minimum_pair_distance = std::min(
                accumulator.minimum_pair_distance,
                distance(states[left].position, states[right].position));
          }
        }
        for (std::size_t index = 0; index < states.size(); ++index) {
          write_frame_row(
              frames, index + 1, frame_index, step_row.accepted_time,
              states[index], state_flags_for_charge(rows[index].charge));
          frames << '\n';
          ++frame_count;
        }
        ++frame_index;
        ++keyframe_count;
        boundary_states = states;
      }
      frames.flush();

      write_census_row(
          census, options, chunk.accepted_end_time, rows, boundary_states,
          accumulator, chunk, cumulative_wall_seconds);
      census.flush();

      // Atomic checkpoint, then discard the chunk certificate (memory
      // bound: nothing of the chunk survives except streams + checkpoint).
      const auto next_checkpoint =
          eom::create_native_evolution_checkpoint(request, chunk);
      eom::write_native_evolution_checkpoint_atomic(
          checkpoint_path.string(), next_checkpoint);
      checkpoint = next_checkpoint;
      accepted_end = chunk.accepted_end_time;
      ++chunks_completed;

      write_assembly_view_record_atomic(
          assembly_record_path, options, checkpoint->paths,
          declared_path_ids, declared_segment_counts, model_fingerprint,
          accepted_end, "running");

      std::cerr << "chunk_complete index=" << (chunks_completed - 1)
                << " accepted_end=" << accepted_end
                << " chunk_wall=" << chunk.timing.total_wall_seconds
                << " cumulative_wall=" << cumulative_wall_seconds
                << " min_pair_distance="
                << accumulator.minimum_pair_distance << '\n';

      write_manifest(
          manifest_path, options, rows, model_fingerprint,
          root_clearance_status, chunks_completed, accepted_end,
          accepted_steps, rejected_steps, frame_count, resume_count,
          cumulative_wall_seconds, "running");

      if (chunk.status != "completed") {
        final_status = "halted_" +
            (chunk.halt_code.empty() ? chunk.status : chunk.halt_code);
        break;
      }
    }

    write_replay_wrapper(
        frames_path, replay_path, options, frame_count, keyframe_count,
        accepted_end);
    if (checkpoint.has_value()) {
      write_assembly_view_record_atomic(
          assembly_record_path, options, checkpoint->paths,
          declared_path_ids, declared_segment_counts, model_fingerprint,
          accepted_end, final_status);
    } else {
      write_assembly_view_record_atomic(
          assembly_record_path, options, paths, declared_path_ids,
          declared_segment_counts, model_fingerprint, "0", final_status);
    }
    write_manifest(
        manifest_path, options, rows, model_fingerprint,
        root_clearance_status, chunks_completed, accepted_end,
        accepted_steps, rejected_steps, frame_count, resume_count,
        cumulative_wall_seconds, final_status);

    std::cout << "ensemble run_id=" << options.run_id
              << " status=" << final_status
              << " accepted_end=" << accepted_end
              << " chunks=" << chunks_completed
              << " accepted_steps=" << accepted_steps
              << " rejected_steps=" << rejected_steps
              << " frames=" << frame_count
              << " resume_count=" << resume_count
              << " cumulative_wall=" << cumulative_wall_seconds
              << " out_dir=" << options.out_dir << '\n';
    return final_status == "completed" ? 0 : 3;
  } catch (const std::exception& error) {
    std::cerr << "attractor-ensemble-harness error: " << error.what() << '\n';
    return 1;
  }
}
