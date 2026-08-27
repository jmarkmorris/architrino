#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

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
#include <stdexcept>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

constexpr double kPi = 3.141592653589793238462643383279502884;
constexpr double kPeriod = 19.63359163663986;
constexpr double kHistoryDepth = 1.0;
constexpr double kSegmentStep = 0.02;
constexpr double kOmega = 0.3200222059958718;
constexpr double kAxialHalfSeparation = 0.31;
constexpr double kRho1 = 0.30;
constexpr double kRho2 = 0.22;
constexpr double kPositiveAmplitude = 0.24;
constexpr double kNegativeAmplitude = 0.27;
constexpr double kNegativePhase = 3.0434178831651124;
constexpr double kFourthDerivativeBound = 0.2630789992329708;
constexpr double kPositionError = 1.4032301044563296e-10;
constexpr double kVelocityError = 2.6307901344382553e-7;

using Vec3 = std::array<double, 3>;

struct State {
  Vec3 position;
  Vec3 velocity;
};

struct Member {
  std::string id;
  int polarity;
  std::size_t axis_index;
  std::size_t ring_index;
  int branch_sign;
  double amplitude;
  double phase;
};

struct RowRecord {
  std::size_t phase_index = 0;
  std::string receiver;
  std::string transmitter;
  std::string status;
  std::string failure_code;
  std::size_t root_count = 0;
  bool root_free_complement = false;
  bool memory_boundary_contact = false;
  bool coincident_endpoint_excluded = false;
  bool row_passed = false;
  double minimum_delay = std::numeric_limits<double>::infinity();
  double minimum_transmitter_factor_margin =
      std::numeric_limits<double>::infinity();
  double minimum_receiver_factor_margin =
      std::numeric_limits<double>::infinity();
  std::size_t visited_cells = 0;
  unsigned achieved_precision_bits = 0;
};

Vec3 add(const Vec3& left, const Vec3& right) {
  return {left[0] + right[0], left[1] + right[1], left[2] + right[2]};
}

Vec3 subtract(const Vec3& left, const Vec3& right) {
  return {left[0] - right[0], left[1] - right[1], left[2] - right[2]};
}

Vec3 scale(const Vec3& value, double factor) {
  return {value[0] * factor, value[1] * factor, value[2] * factor};
}

double dot(const Vec3& left, const Vec3& right) {
  return left[0] * right[0] + left[1] * right[1] +
      left[2] * right[2];
}

double norm(const Vec3& value) {
  return std::sqrt(dot(value, value));
}

Vec3 cross(const Vec3& left, const Vec3& right) {
  return {
      left[1] * right[2] - left[2] * right[1],
      left[2] * right[0] - left[0] * right[2],
      left[0] * right[1] - left[1] * right[0]};
}

std::string decimal_token(double value) {
  if (std::abs(value) < 1e-300) value = 0.0;
  std::ostringstream output;
  output << std::setprecision(std::numeric_limits<double>::max_digits10)
         << value;
  return output.str();
}

double parse_token(const std::string& token) {
  std::size_t consumed = 0;
  const double value = std::stod(token, &consumed);
  if (consumed != token.size() || !std::isfinite(value)) {
    throw std::runtime_error("non-finite numeric token in root certificate");
  }
  return value;
}

double signed_interval_margin(
    const std::string& lower_token,
    const std::string& upper_token) {
  const double lower = parse_token(lower_token);
  const double upper = parse_token(upper_token);
  if (lower > 0.0) return lower;
  if (upper < 0.0) return -upper;
  return 0.0;
}

std::string json_escape(const std::string& value) {
  std::string result;
  result.reserve(value.size());
  for (const char character : value) {
    switch (character) {
      case '\\': result += "\\\\"; break;
      case '"': result += "\\\""; break;
      case '\n': result += "\\n"; break;
      case '\r': result += "\\r"; break;
      case '\t': result += "\\t"; break;
      default: result += character; break;
    }
  }
  return result;
}

State state(const Member& member, double time) {
  const double theta = kOmega * time + member.phase;
  const std::array<double, 3> phases{
      theta, theta - 2.0 * kPi / 3.0, theta + 2.0 * kPi / 3.0};
  std::array<double, 3> harmonic{};
  std::array<double, 3> harmonic_rate{};
  for (std::size_t index = 0; index < 3; ++index) {
    harmonic[index] = member.amplitude * std::cos(phases[index]);
    harmonic_rate[index] =
        -member.amplitude * kOmega * std::sin(phases[index]);
  }
  const auto& [u, v, w] = harmonic;
  const auto& [u_dot, v_dot, w_dot] = harmonic_rate;
  const std::array<Vec3, 3> resultants{
      Vec3{0.0, v, w}, Vec3{u, 0.0, -w}, Vec3{-u, -v, 0.0}};
  const std::array<Vec3, 3> resultant_rates{
      Vec3{0.0, v_dot, w_dot},
      Vec3{u_dot, 0.0, -w_dot},
      Vec3{-u_dot, -v_dot, 0.0}};
  const std::array<Vec3, 3> axes{
      Vec3{1.0, 0.0, 0.0},
      Vec3{0.0, 1.0, 0.0},
      Vec3{0.0, 0.0, 1.0}};
  const Vec3& axis = axes[member.axis_index];
  const Vec3& resultant = resultants[member.axis_index];
  const Vec3& resultant_rate = resultant_rates[member.axis_index];
  const double kappa = norm(resultant);
  const Vec3 e = scale(resultant, 1.0 / kappa);
  const double kappa_dot = dot(e, resultant_rate);
  const Vec3 e_dot = scale(
      subtract(resultant_rate, scale(e, kappa_dot)), 1.0 / kappa);
  const Vec3 tangent = cross(axis, e);
  const Vec3 tangent_dot = cross(axis, e_dot);
  const double radius_difference = kRho1 * kRho1 - kRho2 * kRho2;
  const double alpha =
      (kappa * kappa + radius_difference) / (2.0 * kappa);
  const double alpha_dot = 0.5 * kappa_dot -
      0.5 * radius_difference * kappa_dot / (kappa * kappa);
  const double beta = std::sqrt(std::max(0.0, kRho1 * kRho1 - alpha * alpha));
  const double beta_dot = -alpha * alpha_dot / beta;
  const Vec3 branch_rate =
      add(scale(tangent, beta_dot), scale(tangent_dot, beta));
  const bool first_ring = member.ring_index == 1U;
  const Vec3 transverse = first_ring
      ? add(scale(e, alpha), scale(tangent, member.branch_sign * beta))
      : subtract(
            scale(e, kappa - alpha),
            scale(tangent, member.branch_sign * beta));
  const Vec3 transverse_rate = first_ring
      ? add(
            add(scale(e, alpha_dot), scale(e_dot, alpha)),
            scale(branch_rate, member.branch_sign))
      : subtract(
            add(
                scale(e, kappa_dot - alpha_dot),
                scale(e_dot, kappa - alpha)),
            scale(branch_rate, member.branch_sign));
  const int axial_sign = first_ring ? member.polarity : -member.polarity;
  return {
      add(scale(axis, axial_sign * kAxialHalfSeparation), transverse),
      transverse_rate};
}

std::vector<Member> members() {
  const std::array<int, 3> positive_signs{-1, -1, 1};
  const std::array<int, 3> negative_signs{-1, -1, 1};
  std::vector<Member> result;
  result.reserve(12);
  for (const auto& sector : std::array{
           std::tuple{"positive", 1, kPositiveAmplitude, 0.0, positive_signs},
           std::tuple{"negative", -1, kNegativeAmplitude, kNegativePhase,
                      negative_signs}}) {
    const auto& [name, polarity, amplitude, phase, signs] = sector;
    for (std::size_t axis = 0; axis < 3; ++axis) {
      for (std::size_t ring = 1; ring <= 2; ++ring) {
        result.push_back({
            "f5-axis-" + std::to_string(axis + 1U) + "-ring-" +
                std::to_string(ring) + "-" + name + "-worldline",
            polarity,
            axis,
            ring,
            signs[axis],
            amplitude,
            phase});
      }
    }
  }
  return result;
}

eom::RetainedHistory materialize_history(const Member& member) {
  const double start_time = -kHistoryDepth;
  const double end_time = kPeriod;
  const std::size_t segment_count = static_cast<std::size_t>(
      std::ceil((end_time - start_time) / kSegmentStep));
  const double step =
      (end_time - start_time) / static_cast<double>(segment_count);
  std::vector<eom::CubicHistorySegment> segments;
  segments.reserve(segment_count);
  for (std::size_t index = 0; index < segment_count; ++index) {
    const double segment_start =
        start_time + step * static_cast<double>(index);
    const double segment_end = index + 1U == segment_count
        ? end_time
        : start_time + step * static_cast<double>(index + 1U);
    const double duration = segment_end - segment_start;
    const State left = state(member, segment_start);
    const State right = state(member, segment_end);
    eom::CubicCoefficientTokens coefficients{};
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const double delta = right.position[axis] - left.position[axis];
      coefficients[axis] = {
          decimal_token(left.position[axis]),
          decimal_token(left.velocity[axis]),
          decimal_token(
              3.0 * delta / (duration * duration) -
              (2.0 * left.velocity[axis] + right.velocity[axis]) /
                  duration),
          decimal_token(
              -2.0 * delta / (duration * duration * duration) +
              (left.velocity[axis] + right.velocity[axis]) /
                  (duration * duration))};
    }
    segments.emplace_back(
        decimal_token(segment_start), decimal_token(segment_end),
        std::move(coefficients), decimal_token(kPositionError),
        decimal_token(kVelocityError));
  }
  return eom::RetainedHistory(member.id + "/nominal-cubic", std::move(segments));
}

void write_optional_number(std::ostream& output, double value) {
  if (std::isfinite(value)) {
    output << std::setprecision(std::numeric_limits<double>::max_digits10)
           << value;
  } else {
    output << "null";
  }
}

void write_record(
    const std::filesystem::path& output_path,
    const std::string& source_sha,
    const std::string& enclosure_sha,
    std::size_t samples,
    const std::vector<Member>& source_members,
    const std::vector<eom::RetainedHistory>& histories,
    const std::vector<RowRecord>& rows,
    double elapsed_seconds,
    bool passed) {
  std::filesystem::create_directories(output_path.parent_path());
  std::ofstream output(output_path);
  if (!output) throw std::runtime_error("failed to open output record");
  const std::size_t certified_rows = static_cast<std::size_t>(std::count_if(
      rows.begin(), rows.end(), [](const RowRecord& row) {
        return row.row_passed;
      }));
  output << "{\n  \"schema\": \"f5_eom_enclosed_root_audit/v1\",\n"
         << "  \"candidate\": \"F5-revised-phase-varying-campaign-realization\",\n"
         << "  \"claimBoundary\": \"candidate-specific prescribed-history H3 root evidence; not H4, H5, retention, stability, binding, score, or physical-realization evidence\",\n"
         << "  \"sourceSha256\": \"" << json_escape(source_sha) << "\",\n"
         << "  \"enclosureRecordSha256\": \""
         << json_escape(enclosure_sha) << "\",\n"
         << "  \"normalizedFieldSpeed\": 1,\n"
         << "  \"period\": " << std::setprecision(17) << kPeriod << ",\n"
         << "  \"historyDepth\": " << kHistoryDepth << ",\n"
         << "  \"maximumSegmentStep\": " << kSegmentStep << ",\n"
         << "  \"analyticInterpolationErrorBounded\": true,\n"
         << "  \"fourthDerivativeBound\": " << kFourthDerivativeBound
         << ",\n"
         << "  \"positionError\": " << kPositionError << ",\n"
         << "  \"velocityError\": " << kVelocityError << ",\n"
         << "  \"rootTolerance\": \"1e-8\",\n"
         << "  \"rootMaxDepth\": 192,\n"
         << "  \"rootMaxCells\": 300000,\n"
         << "  \"initialMpfrBits\": 128,\n"
         << "  \"maximumMpfrBits\": 512,\n"
         << "  \"threadCount\": 8,\n"
         << "  \"receptionSamples\": " << samples << ",\n"
         << "  \"requiredRows\": " << samples * 144U << ",\n"
         << "  \"evaluatedRows\": " << rows.size() << ",\n"
         << "  \"passingRows\": " << certified_rows << ",\n"
         << "  \"passed\": " << (passed ? "true" : "false") << ",\n"
         << "  \"elapsedWallSeconds\": " << elapsed_seconds << ",\n"
         << "  \"members\": [\n";
  for (std::size_t index = 0; index < source_members.size(); ++index) {
    if (index > 0) output << ",\n";
    output << "    {\"worldlineId\": \""
           << json_escape(source_members[index].id)
           << "\", \"polarity\": " << source_members[index].polarity
           << ", \"historyFingerprint\": \""
           << histories[index].provenance_fingerprint() << "\"}";
  }
  output << "\n  ],\n  \"rows\": [\n";
  for (std::size_t index = 0; index < rows.size(); ++index) {
    if (index > 0) output << ",\n";
    const auto& row = rows[index];
    output << "    {\"phaseIndex\": " << row.phase_index
           << ", \"receiver\": \"" << json_escape(row.receiver)
           << "\", \"transmitter\": \""
           << json_escape(row.transmitter) << "\", \"status\": \""
           << json_escape(row.status) << "\", \"failureCode\": \""
           << json_escape(row.failure_code) << "\", \"rootCount\": "
           << row.root_count << ", \"rootFreeComplement\": "
           << (row.root_free_complement ? "true" : "false")
           << ", \"memoryBoundaryContact\": "
           << (row.memory_boundary_contact ? "true" : "false")
           << ", \"coincidentEndpointExcluded\": "
           << (row.coincident_endpoint_excluded ? "true" : "false")
           << ", \"minimumDelay\": ";
    write_optional_number(output, row.minimum_delay);
    output << ", \"minimumTransmitterFactorMargin\": ";
    write_optional_number(output, row.minimum_transmitter_factor_margin);
    output << ", \"minimumReceiverFactorMargin\": ";
    write_optional_number(output, row.minimum_receiver_factor_margin);
    output << ", \"visitedCells\": " << row.visited_cells
           << ", \"achievedPrecisionBits\": "
           << row.achieved_precision_bits << ", \"rowPassed\": "
           << (row.row_passed ? "true" : "false") << '}';
  }
  output << "\n  ]\n}\n";
}

}  // namespace

int main(int argc, char** argv) {
  try {
    std::size_t samples = 0;
    std::filesystem::path output_path;
    std::string source_sha;
    std::string enclosure_sha;
    for (int index = 1; index < argc; ++index) {
      const std::string argument = argv[index];
      if (argument == "--samples" && index + 1 < argc) {
        samples = static_cast<std::size_t>(std::stoull(argv[++index]));
      } else if (argument == "--out" && index + 1 < argc) {
        output_path = argv[++index];
      } else if (argument == "--source-sha" && index + 1 < argc) {
        source_sha = argv[++index];
      } else if (argument == "--enclosure-sha" && index + 1 < argc) {
        enclosure_sha = argv[++index];
      } else {
        throw std::invalid_argument("unknown or incomplete argument: " + argument);
      }
    }
    if ((samples != 8U && samples != 32U && samples != 128U) ||
        output_path.empty() || source_sha.empty() || enclosure_sha.empty()) {
      throw std::invalid_argument(
          "usage: eom_f5_root_pilot_cli --samples 8|32|128 --out PATH "
          "--source-sha SHA256 --enclosure-sha SHA256");
    }

    const auto source_members = members();
    std::vector<eom::RetainedHistory> histories;
    histories.reserve(source_members.size());
    for (const auto& member : source_members) {
      histories.push_back(materialize_history(member));
    }

    const auto started = std::chrono::steady_clock::now();
    std::vector<RowRecord> rows;
    rows.reserve(samples * source_members.size() * source_members.size());
    bool passed = true;
    for (std::size_t phase_index = 0; phase_index < samples; ++phase_index) {
      const double reception =
          kPeriod * static_cast<double>(phase_index) /
          static_cast<double>(samples);
      const std::string reception_token = decimal_token(reception);
      const std::string search_lower_token =
          decimal_token(reception - kHistoryDepth);
      std::vector<eom::ExactPairRequest> requests;
      requests.reserve(144);
      for (std::size_t receiver = 0; receiver < histories.size(); ++receiver) {
        for (std::size_t transmitter = 0; transmitter < histories.size();
             ++transmitter) {
          requests.push_back({
              .row_id = source_members[receiver].id + "/" +
                  source_members[transmitter].id + "/phase-" +
                  std::to_string(phase_index),
              .receiver = &histories[receiver],
              .source = &histories[transmitter],
              .receiver_path_id = source_members[receiver].id,
              .source_path_id = source_members[transmitter].id,
              .reception_time = reception_token,
              .search_lower = search_lower_token,
              .search_upper = reception_token,
              .field_speed = "1",
              .root_tolerance = "1e-8",
              .max_depth = 192,
              .max_cells = 300000,
              .initial_mpfr_bits = 128,
              .maximum_mpfr_bits = 512,
          });
        }
      }
      const auto certificates = eom::certify_exact_pair_batch(requests, 8);
      if (certificates.size() != requests.size()) {
        throw std::runtime_error("root batch returned incomplete row count");
      }
      for (std::size_t index = 0; index < certificates.size(); ++index) {
        const std::size_t receiver = index / histories.size();
        const std::size_t transmitter = index % histories.size();
        const auto& certificate = certificates[index];
        RowRecord row{
            .phase_index = phase_index,
            .receiver = source_members[receiver].id,
            .transmitter = source_members[transmitter].id,
            .status = certificate.status,
            .failure_code = certificate.failure_code,
            .root_count = certificate.roots.size(),
            .root_free_complement = certificate.root_free_complement,
            .memory_boundary_contact = certificate.memory_boundary_contact,
            .coincident_endpoint_excluded =
                certificate.coincident_endpoint_excluded,
            .visited_cells = certificate.visited_cells,
            .achieved_precision_bits = certificate.achieved_precision_bits,
        };
        for (const auto& root : certificate.roots) {
          row.minimum_delay = std::min(
              row.minimum_delay,
              reception - parse_token(root.upper));
          row.minimum_transmitter_factor_margin = std::min(
              row.minimum_transmitter_factor_margin,
              signed_interval_margin(
                  root.transmitter_factor_lower,
                  root.transmitter_factor_upper));
          row.minimum_receiver_factor_margin = std::min(
              row.minimum_receiver_factor_margin,
              signed_interval_margin(
                  root.receiver_factor_lower,
                  root.receiver_factor_upper));
        }
        const bool self = receiver == transmitter;
        const bool common_pass =
            certificate.status == "certified_complete" &&
            certificate.root_free_complement &&
            !certificate.memory_boundary_contact;
        row.row_passed = self
            ? common_pass && certificate.coincident_endpoint_excluded &&
                certificate.roots.empty()
            : common_pass && !certificate.roots.empty() &&
                row.minimum_delay > 0.0 &&
                row.minimum_transmitter_factor_margin > 0.0 &&
                row.minimum_receiver_factor_margin > 0.0;
        passed = passed && row.row_passed;
        rows.push_back(std::move(row));
      }
      const double elapsed = std::chrono::duration<double>(
          std::chrono::steady_clock::now() - started).count();
      std::cerr << "heartbeat candidate=F5 rung=" << samples
                << " phase=" << (phase_index + 1U) << '/' << samples
                << " certified="
                << std::count_if(rows.begin(), rows.end(), [](const auto& row) {
                     return row.row_passed;
                   })
                << '/' << rows.size() << " failures="
                << std::count_if(rows.begin(), rows.end(), [](const auto& row) {
                     return !row.row_passed;
                   })
                << " elapsed_seconds=" << elapsed
                << " output=" << output_path.string() << '\n';
      if (!passed) break;
    }
    const double elapsed = std::chrono::duration<double>(
        std::chrono::steady_clock::now() - started).count();
    write_record(
        output_path, source_sha, enclosure_sha, samples, source_members,
        histories, rows, elapsed, passed && rows.size() == samples * 144U);
    return passed && rows.size() == samples * 144U ? 0 : 2;
  } catch (const std::exception& error) {
    std::cerr << "error: " << error.what() << '\n';
    return 1;
  }
}
