// EOM Attractor Search — Phase 2 headless ensemble harness.
//
// Extends the Phase 0 profiler (attractor-phase0-release-profile.cpp) into
// the checkpoint-chunked release harness the workstream priorities declare:
//
//   - declared deterministic seed families (exact counts, seed offsets, all
//     tangential speeds strictly off the v = c_f pin);
//   - endpoint-matched prehistory families for the T3 collapse discipline
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

#include <array>
#include <chrono>
#include <cmath>
#include <cstddef>
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
#include <vector>

namespace eom = architrino::eom;

namespace {

constexpr double kPi = 3.141592653589793238462643383279502884;
constexpr const char* kCharge = "0.1666666666666666666666666666666667";
constexpr const char* kNegativeCharge =
    "-0.1666666666666666666666666666666667";
// Declared workload coupling: the section-86 lineage native coupling
// 36 * kappa_eq. A declared campaign choice, not a bind fit.
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
};

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

struct Vector3 {
  double x = 0.0;
  double y = 0.0;
  double z = 0.0;
};

// Release-time endpoint state shared by both prehistory families
// (endpoint-matched within binary64 — the T3 requirement is materially
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
          .tilt_x = "0",
          .tilt_y = "0",
      });
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
  std::size_t population = 6;
  std::size_t seed_offset = 0;
  std::string prehistory = "circular";
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
  bool resume = false;
};

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
  request.thread_count = options.thread_count;
  request.use_analytic_pinned_fold = false;
  request.use_pinned_fold_aware_temporal_step = false;
  return request;
}

void write_frame_row(
    std::ostream& output, std::size_t path_key, std::size_t frame_index,
    const std::string& time_token, const SampledState& state) {
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
         << ",\"stateFlags\":1}";
}

struct CensusAccumulator {
  double minimum_pair_distance = std::numeric_limits<double>::infinity();
};

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
         << ",\"chunkWallSeconds\":" << chunk.timing.total_wall_seconds
         << ",\"cumulativeWallSeconds\":" << cumulative_wall_seconds
         << "}}\n";
}

void write_manifest(
    const std::filesystem::path& path, const Options& options,
    const std::vector<SeedRow>& rows, const std::string& model_fingerprint,
    const std::string& root_clearance_status,
    std::size_t chunks_completed, const std::string& accepted_end,
    std::size_t frames_emitted, double cumulative_wall_seconds,
    const std::string& status) {
  std::ofstream output(path);
  output << std::setprecision(17)
         << "{\"schema\":\"eom_attractor_ensemble_run_manifest/v0\""
         << ",\"runId\":";
  write_json_string(output, options.run_id);
  output << ",\"seedFamily\":\"phase0-shell-v1\""
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
         << ",\"rootTolerance\":";
  write_json_string(output, options.root_tolerance);
  output << ",\"coupling\":";
  write_json_string(output, token(kNativeCoupling));
  output << ",\"modelFingerprint\":";
  write_json_string(output, model_fingerprint);
  output << ",\"releaseRootClearance\":";
  write_json_string(output, root_clearance_status);
  output << ",\"chunksCompleted\":" << chunks_completed
         << ",\"acceptedEndTime\":";
  write_json_string(output, accepted_end);
  output << ",\"framesEmitted\":" << frames_emitted
         << ",\"cumulativeWallSeconds\":" << cumulative_wall_seconds
         << ",\"status\":";
  write_json_string(output, status);
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
    output << ",\"radius\":" << row.radius
           << ",\"height\":" << row.height
           << ",\"phase\":" << row.phase
           << ",\"speed\":" << row.speed
           << ",\"sense\":" << row.sense << '}';
  }
  output << "]}\n";
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
         << ",\"eomEvidenceReason\":\"Native EOM coupled evolution output; "
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
    options.population = static_cast<std::size_t>(
        option_double(argc, argv, "population", 6.0));
    options.seed_offset = static_cast<std::size_t>(
        option_double(argc, argv, "seed-offset", 0.0));
    options.prehistory =
        option_string(argc, argv, "prehistory", options.prehistory);
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
    options.resume = has_flag(argc, argv, "resume");
    options.run_id = option_string(
        argc, argv, "run-id",
        "attractor-ensemble-n" + std::to_string(options.population) +
            "-s" + std::to_string(options.seed_offset) + "-" +
            options.prehistory);
    if (options.population % 2 != 0) {
      throw std::invalid_argument("population must be even (neutral mix)");
    }
    if (options.prehistory != "circular" && options.prehistory != "straight") {
      throw std::invalid_argument("prehistory must be circular or straight");
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

    const auto rows = seed_rows(options.population, options.seed_offset);
    std::vector<eom::NativeCoupledPathInput> paths;
    paths.reserve(rows.size());
    double maximum_seed_speed = 0.0;
    for (const auto& row : rows) {
      maximum_seed_speed = std::max(maximum_seed_speed, row.speed);
      paths.push_back({
          row.path_id,
          row.charge,
          options.prehistory == "circular"
              ? circular_history(
                    row, options.history_depth, options.history_segment_step)
              : straight_history(row, options.history_depth)});
    }
    std::cerr << "seed family=phase0-shell-v1 population="
              << options.population << " offset=" << options.seed_offset
              << " prehistory=" << options.prehistory
              << " maximum_seed_speed=" << maximum_seed_speed
              << " off_pin=" << (maximum_seed_speed < 1.0) << '\n';

    const auto request_template = build_request(options, paths);
    const std::string model_fingerprint =
        eom::native_evolution_model_fingerprint(request_template);

    // Resume state.
    std::optional<eom::NativeEvolutionCheckpoint> checkpoint;
    std::size_t frame_index = 0;
    std::size_t frame_count = 0;
    std::size_t keyframe_count = 0;
    std::size_t chunks_completed = 0;
    double cumulative_wall_seconds = 0.0;
    std::string accepted_end = "0";
    std::string root_clearance_status = "not_checked";
    if (options.resume) {
      checkpoint = eom::read_native_evolution_checkpoint(
          checkpoint_path.string());
      accepted_end = checkpoint->accepted_time;
      // Continue the frame index from the streamed file.
      std::ifstream frames(frames_path);
      std::string line;
      while (std::getline(frames, line)) {
        if (!line.empty()) ++frame_count;
      }
      frame_index = frame_count / options.population;
      keyframe_count = frame_index;
      root_clearance_status = "checked_before_interruption";
      std::cerr << "resume accepted_end=" << accepted_end
                << " frames=" << frame_count << '\n';
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
      std::size_t unresolved = 0;
      for (const auto& row : snapshot.root_certificates) {
        if (row.certificate.status != "certified_complete") {
          ++unresolved;
          std::cerr << "root " << row.receiver_path_id << "<-"
                    << row.source_path_id
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
        write_manifest(
            manifest_path, options, rows, model_fingerprint,
            root_clearance_status, 0, "0", 0, 0.0,
            "blocked_release_root_clearance");
        return 2;
      }
      // Initial frame row (frameIndex 0 at the release time).
      for (std::size_t index = 0; index < initial.size(); ++index) {
        const auto state = sample_state(initial[index].history, "0");
        write_frame_row(frames, index + 1, 0, "0", state);
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
              states[index]);
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

      std::cerr << "chunk_complete index=" << (chunks_completed - 1)
                << " accepted_end=" << accepted_end
                << " chunk_wall=" << chunk.timing.total_wall_seconds
                << " cumulative_wall=" << cumulative_wall_seconds
                << " min_pair_distance="
                << accumulator.minimum_pair_distance << '\n';

      write_manifest(
          manifest_path, options, rows, model_fingerprint,
          root_clearance_status, chunks_completed, accepted_end,
          frame_count, cumulative_wall_seconds, "running");

      if (chunk.status != "completed") {
        final_status = "halted_" +
            (chunk.halt_code.empty() ? chunk.status : chunk.halt_code);
        break;
      }
    }

    write_replay_wrapper(
        frames_path, replay_path, options, frame_count, keyframe_count,
        accepted_end);
    write_manifest(
        manifest_path, options, rows, model_fingerprint,
        root_clearance_status, chunks_completed, accepted_end, frame_count,
        cumulative_wall_seconds, final_status);

    std::cout << "ensemble run_id=" << options.run_id
              << " status=" << final_status
              << " accepted_end=" << accepted_end
              << " chunks=" << chunks_completed
              << " frames=" << frame_count
              << " cumulative_wall=" << cumulative_wall_seconds
              << " out_dir=" << options.out_dir << '\n';
    return final_status == "completed" ? 0 : 3;
  } catch (const std::exception& error) {
    std::cerr << "attractor-ensemble-harness error: " << error.what() << '\n';
    return 1;
  }
}
