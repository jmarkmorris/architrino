#include "architrino/eom/CertifiedAcceleration.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

#include <algorithm>
#include <chrono>
#include <cmath>
#include <cstdlib>
#include <functional>
#include <iomanip>
#include <iostream>
#include <limits>
#include <numbers>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

namespace eom = architrino::eom;

namespace {

std::string token(double value) {
  std::ostringstream stream;
  stream << std::setprecision(std::numeric_limits<double>::max_digits10)
         << value;
  return stream.str();
}

double seconds_since(const std::chrono::steady_clock::time_point& start) {
  return std::chrono::duration<double>(
             std::chrono::steady_clock::now() - start)
      .count();
}

void print_interval(const eom::Interval& value) {
  std::cout << std::setprecision(std::numeric_limits<double>::max_digits10)
            << "{\"lower\":\"" << value.lower() << "\",\"upper\":\""
            << value.upper() << "\",\"midpoint\":\"" << value.midpoint()
            << "\",\"width\":\"" << value.width() << "\"}";
}

struct PairMeta {
  std::size_t step_index;
  std::size_t receiver_index;
  std::size_t source_index;
  double reception_time;
};

struct FailureLocation {
  std::size_t failed_step;
  std::size_t pair_count_at_failure;
  std::size_t failed_pair_slot;
};

FailureLocation locate_failure(const PairMeta& meta,
                               std::size_t pair_count_at_failure) {
  return {
      .failed_step = meta.step_index + 1,
      .pair_count_at_failure = pair_count_at_failure,
      .failed_pair_slot = meta.receiver_index * 2 + meta.source_index + 1,
  };
}

struct AnalyticGeometry {
  eom::Interval residual;
  eom::Interval source_normal;
  eom::Interval receiver_normal;
};

eom::Interval serialized_point(double value) {
  return eom::Interval::decimal_token(token(value));
}

eom::Interval serialized_interval(double lower, double upper) {
  const auto serialized_lower = serialized_point(lower);
  const auto serialized_upper = serialized_point(upper);
  return {serialized_lower.lower(), serialized_upper.upper()};
}

bool token_is_finite_numeric_zero(const std::string& value) {
  std::size_t consumed = 0;
  const double parsed = std::stod(value, &consumed);
  return consumed == value.size() && std::isfinite(parsed) && parsed == 0.0;
}

void require_planar_metadata(
    const eom::UniformCircularEndpointCertificate& receiver,
    const eom::UniformCircularEndpointCertificate& source) {
  if (!token_is_finite_numeric_zero(receiver.height) ||
      !token_is_finite_numeric_zero(receiver.tilt_x) ||
      !token_is_finite_numeric_zero(receiver.tilt_y) ||
      !token_is_finite_numeric_zero(source.height) ||
      !token_is_finite_numeric_zero(source.tilt_x) ||
      !token_is_finite_numeric_zero(source.tilt_y)) {
    throw std::invalid_argument(
        "clean scalar circular certificate requires zero height and zero tilt");
  }
}

AnalyticGeometry circular_geometry(
    const std::string& reception_token, const eom::Interval& emission,
    const eom::UniformCircularEndpointCertificate& receiver,
    const eom::UniformCircularEndpointCertificate& source,
    const std::string& field_speed_token) {
  const auto receiver_rate_interval =
      eom::Interval::decimal_token(receiver.angular_speed);
  const auto reception_interval =
      eom::Interval::decimal_token(reception_token);
  const auto receiver_phase_interval =
      eom::Interval::decimal_token(receiver.phase);
  const auto source_rate_interval =
      eom::Interval::decimal_token(source.angular_speed);
  const auto source_phase_interval =
      eom::Interval::decimal_token(source.phase);
  const auto theta_receiver =
      receiver_rate_interval * reception_interval + receiver_phase_interval;
  const auto theta_source =
      source_rate_interval * emission + source_phase_interval;
  const auto delta = theta_receiver - theta_source;
  const auto sine = eom::interval_sin(delta);
  const auto cosine = eom::interval_cos(delta);
  const auto rr =
      eom::Interval::decimal_token(receiver.tangential_speed) /
      eom::interval_absolute(receiver_rate_interval);
  const auto rs =
      eom::Interval::decimal_token(source.tangential_speed) /
      eom::interval_absolute(source_rate_interval);
  const auto two = eom::Interval::point(2.0);
  const auto separation = eom::interval_sqrt(
      rr * rr + rs * rs - two * rr * rs * cosine);
  const auto c = eom::Interval::decimal_token(field_speed_token);
  const auto delay = reception_interval - emission;
  const auto source_normal =
      c - rr * rs * source_rate_interval * sine / separation;
  const auto receiver_normal =
      c - rr * rs * receiver_rate_interval * sine / separation;
  return {separation - c * delay, source_normal, receiver_normal};
}

std::vector<std::size_t> source_segments_covering(
    const eom::RetainedHistory& source, double lower, double upper) {
  const auto bracket = serialized_interval(lower, upper);
  std::size_t lower_index = source.segment_index_at(lower);
  std::size_t upper_index = source.segment_index_at(upper);
  if (lower_index > 0) {
    const auto& join = source.segments()[lower_index].t_start_interval();
    if (bracket.lower() <= join.upper() && bracket.upper() >= join.lower()) {
      --lower_index;
    }
  }
  if (upper_index + 1 < source.segments().size()) {
    const auto& join = source.segments()[upper_index + 1].t_start_interval();
    if (bracket.lower() <= join.upper() && bracket.upper() >= join.lower()) {
      ++upper_index;
    }
  }
  std::vector<std::size_t> indices;
  indices.reserve(upper_index - lower_index + 1);
  for (std::size_t index = lower_index; index <= upper_index; ++index) {
    indices.push_back(index);
  }
  return indices;
}

eom::ExactPairCertificate certify_circular_pair(
    const std::string& row_id, const eom::RetainedHistory& receiver,
    const eom::RetainedHistory& source, const std::string& reception_token,
    const std::string& search_lower_token,
    const std::string& field_speed_token) {
  constexpr double root_tolerance = 1e-10;
  constexpr std::size_t maximum_cells = 100000;
  const double reception = std::stod(reception_token);
  const double search_lower = std::stod(search_lower_token);
  std::size_t visited = 0;
  bool complete = true;
  struct RootCandidate {
    double lower;
    double upper;
    int source_normal_sign;
  };
  std::vector<RootCandidate> root_intervals;
  const auto& receiver_endpoint = receiver.uniform_circular_endpoint_certificate();
  const auto& source_endpoint = source.uniform_circular_endpoint_certificate();
  if (!receiver_endpoint.has_value() || !source_endpoint.has_value()) {
    throw std::invalid_argument(
        "clean circular certificate requires factory-certified circular histories");
  }
  require_planar_metadata(*receiver_endpoint, *source_endpoint);
  std::function<void(double, double, std::size_t)> classify;
  classify = [&](double lower, double upper, std::size_t depth) {
    if (!complete) return;
    if (++visited > maximum_cells || depth > 128) {
      complete = false;
      return;
    }
    const eom::Interval cell = serialized_interval(lower, upper);
    const auto geometry = circular_geometry(
        reception_token, cell, *receiver_endpoint, *source_endpoint,
        field_speed_token);
    if (geometry.residual.excludes_zero()) return;
    const auto lower_geometry = circular_geometry(
        reception_token, serialized_point(lower), *receiver_endpoint,
        *source_endpoint, field_speed_token);
    const auto upper_geometry = circular_geometry(
        reception_token, serialized_point(upper), *receiver_endpoint,
        *source_endpoint, field_speed_token);
    const int lower_sign = lower_geometry.residual.strict_sign();
    const int upper_sign = upper_geometry.residual.strict_sign();
    if (geometry.source_normal.strict_sign() != 0 && lower_sign != 0 &&
        upper_sign != 0 && lower_sign == upper_sign) {
      return;
    }
    if (upper - lower <= root_tolerance) {
      if (geometry.source_normal.strict_sign() == 0 || lower_sign == 0 ||
          upper_sign == 0 || lower_sign == upper_sign) {
        complete = false;
        return;
      }
      root_intervals.push_back(
          {lower, upper, geometry.source_normal.strict_sign()});
      return;
    }
    const double midpoint = lower + (upper - lower) / 2.0;
    if (token(midpoint) == token(lower) || token(midpoint) == token(upper)) {
      complete = false;
      return;
    }
    classify(lower, midpoint, depth + 1);
    classify(midpoint, upper, depth + 1);
  };
  classify(search_lower, reception, 0);
  std::sort(root_intervals.begin(), root_intervals.end(), [](const auto& left,
                                                             const auto& right) {
    return left.lower < right.lower;
  });
  std::vector<RootCandidate> merged_intervals;
  for (const auto& root : root_intervals) {
    const bool overlaps_or_touches =
        !merged_intervals.empty() &&
        serialized_point(root.lower).lower() <=
            serialized_point(merged_intervals.back().upper).upper();
    if (overlaps_or_touches) {
      if (root.source_normal_sign !=
          merged_intervals.back().source_normal_sign) {
        complete = false;
        break;
      }
      merged_intervals.back().upper =
          std::max(merged_intervals.back().upper, root.upper);
      continue;
    }
    merged_intervals.push_back(root);
  }
  std::vector<eom::NativeRootBracket> merged;
  merged.reserve(merged_intervals.size());
  for (const auto& candidate : merged_intervals) {
    const double lower = candidate.lower;
    const double upper = candidate.upper;
    const auto geometry = circular_geometry(
        reception_token, serialized_interval(lower, upper), *receiver_endpoint,
        *source_endpoint, field_speed_token);
    const auto lower_geometry = circular_geometry(
        reception_token, serialized_point(lower), *receiver_endpoint,
        *source_endpoint, field_speed_token);
    const auto upper_geometry = circular_geometry(
        reception_token, serialized_point(upper), *receiver_endpoint,
        *source_endpoint, field_speed_token);
    if (geometry.source_normal.strict_sign() == 0 ||
        geometry.source_normal.strict_sign() != candidate.source_normal_sign ||
        lower_geometry.residual.strict_sign() == 0 ||
        upper_geometry.residual.strict_sign() == 0 ||
        lower_geometry.residual.strict_sign() ==
            upper_geometry.residual.strict_sign()) {
      complete = false;
      break;
    }
    merged.push_back({
        .lower = token(lower),
        .upper = token(upper),
        .source_normal_lower = token(geometry.source_normal.lower()),
        .source_normal_upper = token(geometry.source_normal.upper()),
        .receiver_normal_lower = token(geometry.receiver_normal.lower()),
        .receiver_normal_upper = token(geometry.receiver_normal.upper()),
        .source_normal_sign = geometry.source_normal.strict_sign(),
        .source_segment_indices = source_segments_covering(source, lower, upper),
        .precision_route = "clean_room_analytic_circular_interval",
        .precision_bits = 53,
    });
  }
  return {
      .schema = "eom_native_exact_pair_certificate/v0",
      .row_id = row_id,
      .receiver_history_id = receiver.history_id(),
      .source_history_id = source.history_id(),
      .receiver_history_fingerprint = receiver.provenance_fingerprint(),
      .source_history_fingerprint = source.provenance_fingerprint(),
      .reception_time = reception_token,
      .searched_lower = search_lower_token,
      .searched_upper = token(reception),
      .field_speed = field_speed_token,
      .root_tolerance = token(root_tolerance),
      .status = complete ? "certified_complete" : "uncertified",
      .failure_code = complete ? "" : "analytic_interval_exhausted",
      .root_free_complement = complete,
      .memory_boundary_contact = false,
      .coincident_endpoint_excluded = false,
      .precision_escalated = false,
      .achieved_precision_bits = 53,
      .visited_cells = visited,
      .excluded_cells = visited - merged.size(),
      .difficult_cells = 0,
      .roots = std::move(merged),
  };
}

int interface_boundary_self_check() {
  constexpr double reception = 0.0;
  constexpr double non_root_emission = -0.1;
  const auto receiver = eom::RetainedHistory::uniform_circular(
      "self-check-receiver",
      {.t_start = "-1.74",
       .t_end = "6.411413578754679",
       .maximum_segment_step = "0.002",
       .cylindrical_radius = "1",
       .height = "0",
       .angular_speed = "0.98",
       .tangential_speed = "0.98",
       .phase = "0"});
  const auto source = eom::RetainedHistory::uniform_circular(
      "self-check-source",
      {.t_start = "-1.74",
       .t_end = "6.411413578754679",
       .maximum_segment_step = "0.002",
       .cylindrical_radius = "0.44",
       .height = "0",
       .angular_speed = "2.45",
       .tangential_speed = "1.078",
       .phase = "0.2"});
  const auto tilted_source = eom::RetainedHistory::uniform_circular(
      "self-check-tilted-source",
      {.t_start = "-1.74",
       .t_end = "6.411413578754679",
       .maximum_segment_step = "0.002",
       .cylindrical_radius = "0.44",
       .height = "0",
       .angular_speed = "2.45",
       .tangential_speed = "1.078",
       .phase = "0.2",
       .tilt_x = "0.1",
       .tilt_y = "0"});
  const auto raised_source = eom::RetainedHistory::uniform_circular(
      "self-check-raised-source",
      {.t_start = "-1.74",
       .t_end = "6.411413578754679",
       .maximum_segment_step = "0.002",
       .cylindrical_radius = "0.44",
       .height = "0.1",
       .angular_speed = "2.45",
       .tangential_speed = "1.078",
       .phase = "0.2"});
  const auto zero_metadata_certificate = certify_circular_pair(
      "zero-planar-metadata", receiver, source, "0", "-0.01", "1");
  const bool zero_planar_metadata_accepted =
      zero_metadata_certificate.status == "certified_complete";
  const auto metadata_rejected = [&](const eom::RetainedHistory& candidate) {
    try {
      static_cast<void>(certify_circular_pair(
          "nonzero-planar-metadata", receiver, candidate, "0", "-0.01",
          "1"));
      return false;
    } catch (const std::invalid_argument&) {
      return true;
    }
  };
  const bool nonzero_tilt_rejected = metadata_rejected(tilted_source);
  const bool nonzero_height_rejected = metadata_rejected(raised_source);
  const auto geometry = circular_geometry(
      token(reception), serialized_point(non_root_emission),
      *receiver.uniform_circular_endpoint_certificate(),
      *source.uniform_circular_endpoint_certificate(), "1");
  if (!geometry.residual.excludes_zero() ||
      geometry.source_normal.strict_sign() == 0) {
    throw std::runtime_error("self-check bracket is not a certified non-root");
  }
  const eom::ExactPairCertificate external{
      .schema = "eom_native_exact_pair_certificate/v0",
      .row_id = "deliberate-non-root-external-certificate",
      .receiver_history_id = receiver.history_id(),
      .source_history_id = source.history_id(),
      .receiver_history_fingerprint = receiver.provenance_fingerprint(),
      .source_history_fingerprint = source.provenance_fingerprint(),
      .reception_time = "0",
      .searched_lower = "-1.74",
      .searched_upper = "0",
      .field_speed = "1",
      .root_tolerance = "1e-10",
      .status = "certified_complete",
      .failure_code = "",
      .root_free_complement = true,
      .memory_boundary_contact = false,
      .coincident_endpoint_excluded = false,
      .precision_escalated = false,
      .achieved_precision_bits = 53,
      .visited_cells = 0,
      .excluded_cells = 0,
      .difficult_cells = 0,
      .roots = {{
          .lower = token(non_root_emission),
          .upper = token(non_root_emission),
          .source_normal_lower = token(geometry.source_normal.lower()),
          .source_normal_upper = token(geometry.source_normal.upper()),
          .receiver_normal_lower = token(geometry.receiver_normal.lower()),
          .receiver_normal_upper = token(geometry.receiver_normal.upper()),
          .source_normal_sign = geometry.source_normal.strict_sign(),
          .source_segment_indices = source_segments_covering(
              source, non_root_emission, non_root_emission),
          .precision_route = "deliberate_non_root_interface_boundary_check",
          .precision_bits = 53,
      }},
  };
  const auto acceleration = eom::certify_pair_acceleration({
      .row_id = "deliberate-non-root-branch",
      .receiver_path_id = receiver.history_id(),
      .source_path_id = source.history_id(),
      .receiver_history = &receiver,
      .source_history = &source,
      .root_certificate = &external,
      .receiver_charge = "1",
      .source_charge = "1",
      .coupling = "1",
      .chart = "sharp",
      .source_normal_floor = "1e-6",
      .acceleration_tolerance = "1e-4",
  });
  const bool branch_geometry_accepted =
      acceleration.status != "uncertified" && acceleration.rows.size() == 1;
  const double segment_join = source.segments()[1].t_start();
  const auto join_indices =
      source_segments_covering(source, segment_join, segment_join);
  const bool segment_join_complete =
      join_indices.size() == 2 && join_indices[0] + 1 == join_indices[1];
  const auto reporting_location = locate_failure(
      {.step_index = 1956,
       .receiver_index = 1,
       .source_index = 0,
       .reception_time = 0.0},
      11739);
  const bool failure_report_uses_pair_metadata =
      reporting_location.failed_step == 1957 &&
      reporting_location.pair_count_at_failure == 11739 &&
      reporting_location.failed_pair_slot == 3;
  const bool self_check_pass =
      branch_geometry_accepted && segment_join_complete &&
      zero_planar_metadata_accepted && nonzero_tilt_rejected &&
      nonzero_height_rejected && failure_report_uses_pair_metadata;
  std::cout << "{\"status\":\""
            << (self_check_pass ? "PASS" : "FAIL")
            << "\",\"deliberate_bracket_residual_excludes_zero\":true,"
               "\"eom_branch_geometry_accepted\":"
            << (branch_geometry_accepted ? "true" : "false")
            << ",\"eom_causal_residual_validation\":false,"
               "\"segment_join_lists_both_adjacent\":"
            << (segment_join_complete ? "true" : "false") << ',' <<
               "\"zero_planar_metadata_accepted\":"
            << (zero_planar_metadata_accepted ? "true" : "false") << ',' <<
               "\"nonzero_tilt_rejected\":"
            << (nonzero_tilt_rejected ? "true" : "false") << ',' <<
               "\"nonzero_height_rejected\":"
            << (nonzero_height_rejected ? "true" : "false") << ',' <<
               "\"failure_report_uses_pair_metadata\":"
            << (failure_report_uses_pair_metadata ? "true" : "false") << ',' <<
               "\"root_completeness_owner\":"
               "\"clean_analytic_interval_certificate\"}\n";
  return self_check_pass ? 0 : 1;
}

}  // namespace

int main(int argc, char** argv) {
  if (argc == 2 && std::string(argv[1]) == "--interface-boundary-self-check") {
    try {
      return interface_boundary_self_check();
    } catch (const std::exception& error) {
      std::cerr << "interface-boundary self-check failed: " << error.what()
                << '\n';
      return 1;
    }
  }
  if (argc != 17) {
    std::cerr
        << "usage: t1_section14_native N_T heartbeat_every threads max_step "
           "reception_start period history_window receiver_radius "
           "receiver_rate source_radius source_rate source_phase_base "
           "field_speed receiver_charge source_charge_0 source_charge_1\n"
           "       t1_section14_native --interface-boundary-self-check\n";
    return 2;
  }
  try {
    const std::size_t sample_count = std::stoull(argv[1]);
    const std::size_t heartbeat_every = std::stoull(argv[2]);
    const std::size_t thread_count = std::stoull(argv[3]);
    const double maximum_step = std::stod(argv[4]);
    const double reception_start = std::stod(argv[5]);
    const double period = std::stod(argv[6]);
    const double history_window = std::stod(argv[7]);
    const double receiver_radius = std::stod(argv[8]);
    const double receiver_rate = std::stod(argv[9]);
    const double source_radius = std::stod(argv[10]);
    const double source_rate = std::stod(argv[11]);
    const double source_phase_base = std::stod(argv[12]);
    const std::string field_speed = argv[13];
    const std::string receiver_charge = argv[14];
    const std::vector<std::string> source_charges{argv[15], argv[16]};
    if (sample_count == 0 || heartbeat_every == 0 || thread_count == 0 ||
        maximum_step <= 0.0 || period <= 0.0 || history_window <= 0.0) {
      throw std::invalid_argument("positive numeric run controls required");
    }

    const double history_start = reception_start - history_window;
    const double history_stop = reception_start + period;
    std::vector<eom::RetainedHistory> receivers;
    std::vector<eom::RetainedHistory> sources;
    receivers.reserve(3);
    sources.reserve(2);
    for (std::size_t index = 0; index < 3; ++index) {
      const double phase =
          2.0 * std::numbers::pi_v<double> * static_cast<double>(index) / 3.0;
      receivers.push_back(eom::RetainedHistory::uniform_circular(
          "middle-receiver-" + std::to_string(index),
          {.t_start = token(history_start),
           .t_end = token(history_stop),
           .maximum_segment_step = token(maximum_step),
           .cylindrical_radius = token(receiver_radius),
           .height = "0",
           .angular_speed = token(receiver_rate),
           .tangential_speed = token(receiver_radius * receiver_rate),
           .phase = token(phase)}));
    }
    for (std::size_t index = 0; index < 2; ++index) {
      const double phase =
          source_phase_base + static_cast<double>(index) * std::numbers::pi_v<double>;
      sources.push_back(eom::RetainedHistory::uniform_circular(
          "inner-source-" + std::to_string(index),
          {.t_start = token(history_start),
           .t_end = token(history_stop),
           .maximum_segment_step = token(maximum_step),
           .cylindrical_radius = token(source_radius),
           .height = "0",
           .angular_speed = token(source_rate),
           .tangential_speed = token(source_radius * source_rate),
           .phase = token(phase)}));
    }

    const auto started = std::chrono::steady_clock::now();
    const std::size_t total_pairs = sample_count * 6;
    std::size_t pair_progress = 0;
    std::size_t root_progress = 0;
    std::size_t zero_root_pairs = 0;
    std::size_t one_root_pairs = 0;
    std::size_t multi_root_pairs = 0;
    eom::Interval signed_sum = eom::Interval::point(0.0);
    eom::Interval magnitude_sum = eom::Interval::point(0.0);
    std::cerr << "heartbeat N_T=" << sample_count << " step=0/"
              << sample_count << " simulation_time=" << reception_start
              << " root_progress=0 pair_progress=0/" << total_pairs
              << " wall_seconds=0.000\n";

    for (std::size_t chunk_start = 0; chunk_start < sample_count;
         chunk_start += heartbeat_every) {
      const std::size_t chunk_stop =
          std::min(sample_count, chunk_start + heartbeat_every);
      std::vector<eom::ExactPairRequest> requests;
      std::vector<PairMeta> metadata;
      requests.reserve((chunk_stop - chunk_start) * 6);
      metadata.reserve((chunk_stop - chunk_start) * 6);
      for (std::size_t step = chunk_start; step < chunk_stop; ++step) {
        const double reception =
            reception_start + period * static_cast<double>(step) /
                                  static_cast<double>(sample_count);
        for (std::size_t receiver_index = 0; receiver_index < 3;
             ++receiver_index) {
          for (std::size_t source_index = 0; source_index < 2; ++source_index) {
            const std::string row_id =
                "T" + std::to_string(step) + "-r" +
                std::to_string(receiver_index) + "-s" +
                std::to_string(source_index);
            requests.push_back({
                .row_id = row_id,
                .receiver = &receivers[receiver_index],
                .source = &sources[source_index],
                .reception_time = token(reception),
                .search_lower = token(reception - history_window),
                .search_upper = token(reception),
                .field_speed = field_speed,
                .root_tolerance = "1e-10",
                .max_depth = 256,
                .max_cells = 1000000,
                .initial_mpfr_bits = 128,
                .maximum_mpfr_bits = 512,
                .force_precision_escalation = true,
            });
            metadata.push_back({.step_index = step,
                                .receiver_index = receiver_index,
                                .source_index = source_index,
                                .reception_time = reception});
          }
        }
      }
      std::vector<eom::ExactPairCertificate> root_certificates;
      root_certificates.reserve(requests.size());
      for (std::size_t index = 0; index < requests.size(); ++index) {
        const auto& request = requests[index];
        root_certificates.push_back(certify_circular_pair(
            request.row_id, *request.receiver, *request.source,
            request.reception_time, request.search_lower, request.field_speed));
      }
      for (std::size_t index = 0; index < root_certificates.size(); ++index) {
        const auto& roots = root_certificates[index];
        const auto& meta = metadata[index];
        ++pair_progress;
        if (roots.status != "certified_complete" || !roots.root_free_complement) {
          const auto location = locate_failure(meta, pair_progress);
          std::cout << "{\"status\":\"NOT-VERIFIABLE\",\"sample_count_N_T\":"
                    << sample_count << ",\"failed_step\":"
                    << location.failed_step << ",\"pair_count_at_failure\":"
                    << location.pair_count_at_failure
                    << ",\"failed_pair_slot\":" << location.failed_pair_slot
                    << ",\"root_count_before_failure\":"
                    << root_progress
                    << ",\"missing_input_or_interface\":\"native complete-root "
                       "certificate failed: "
                    << roots.failure_code << "\"}\n";
          return 0;
        }
        root_progress += roots.roots.size();
        if (roots.roots.empty()) {
          ++zero_root_pairs;
        } else if (roots.roots.size() == 1) {
          ++one_root_pairs;
        } else {
          ++multi_root_pairs;
        }
        const auto acceleration = eom::certify_pair_acceleration({
            .row_id = roots.row_id,
            .receiver_path_id = receivers[meta.receiver_index].history_id(),
            .source_path_id = sources[meta.source_index].history_id(),
            .receiver_history = &receivers[meta.receiver_index],
            .source_history = &sources[meta.source_index],
            .root_certificate = &roots,
            .receiver_charge = receiver_charge,
            .source_charge = source_charges[meta.source_index],
            .coupling = "1",
            .chart = "sharp",
            .source_normal_floor = "1e-6",
            .acceleration_tolerance = "1e-4",
            .initial_mpfr_bits = 128,
            .maximum_mpfr_bits = 512,
        });
        if (acceleration.status == "uncertified" ||
            acceleration.rows.size() != roots.roots.size()) {
          const auto location = locate_failure(meta, pair_progress);
          std::cout << "{\"status\":\"NOT-VERIFIABLE\",\"sample_count_N_T\":"
                    << sample_count << ",\"failed_step\":"
                    << location.failed_step << ",\"pair_count_at_failure\":"
                    << location.pair_count_at_failure
                    << ",\"failed_pair_slot\":" << location.failed_pair_slot
                    << ",\"root_count_before_failure\":"
                    << root_progress
                    << ",\"missing_input_or_interface\":\"native certified "
                       "branch acceleration failed: "
                    << acceleration.failure_code << "\"}\n";
          return 0;
        }
        const auto receiver_state = receivers[meta.receiver_index]
                                        .uniform_circular_analytic_state(
                                            eom::Interval::decimal_token(
                                                token(meta.reception_time)));
        if (!receiver_state.has_value()) {
          throw std::runtime_error("receiver analytic state unavailable");
        }
        const eom::IntervalVector tangent = eom::divide(
            receiver_state->velocity,
            eom::Interval::decimal_token(
                receivers[meta.receiver_index]
                    .uniform_circular_endpoint_certificate()
                    ->tangential_speed));
        for (const auto& row : acceleration.rows) {
          const eom::Interval scalar = eom::dot(row.acceleration, tangent);
          signed_sum = signed_sum + scalar;
          magnitude_sum = magnitude_sum + eom::interval_absolute(scalar);
        }
      }
      const std::size_t completed_steps = chunk_stop;
      const double simulation_time =
          reception_start + period * static_cast<double>(completed_steps - 1) /
                                static_cast<double>(sample_count);
      std::cerr << std::setprecision(17) << "heartbeat N_T=" << sample_count
                << " step=" << completed_steps << "/" << sample_count
                << " simulation_time=" << simulation_time
                << " root_progress=" << root_progress << " pair_progress="
                << pair_progress << "/" << total_pairs << " wall_seconds="
                << seconds_since(started) << '\n';
    }

    const eom::Interval divisor =
        eom::Interval::point(static_cast<double>(sample_count));
    const eom::Interval average_net = signed_sum / divisor;
    const eom::Interval average_magnitude = magnitude_sum / divisor;
    const eom::Interval surviving =
        eom::interval_absolute(signed_sum) / magnitude_sum;
    const eom::Interval cancellation = eom::Interval::point(1.0) - surviving;
    std::cout << "{\"status\":\"MEASURED\",\"claim_grade\":\"measured\","
              << "\"sample_count_N_T\":" << sample_count
              << ",\"pair_count\":" << pair_progress
              << ",\"root_count\":" << root_progress
              << ",\"root_count_histogram_by_pair\":{\"0\":"
              << zero_root_pairs << ",\"1\":" << one_root_pairs
              << ",\"multi\":" << multi_root_pairs << "},"
              << "\"average_net_signed_root_sum\":";
    print_interval(average_net);
    std::cout << ",\"average_magnitude_sum\":";
    print_interval(average_magnitude);
    std::cout << ",\"surviving_fraction_S\":";
    print_interval(surviving);
    std::cout << ",\"cancellation_fraction_C\":";
    print_interval(cancellation);
    std::cout << ",\"wall_seconds\":\"" << seconds_since(started)
              << "\"}\n";
    return 0;
  } catch (const std::exception& error) {
    std::cerr << "t1_section14_native error: " << error.what() << '\n';
    return 1;
  }
}
