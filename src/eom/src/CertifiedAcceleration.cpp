#include "architrino/eom/CertifiedAcceleration.hpp"

#include <algorithm>
#include <atomic>
#include <cstddef>
#include <exception>
#include <map>
#include <mutex>
#include <limits>
#include <optional>
#include <set>
#include <stdexcept>
#include <string>
#include <thread>
#include <tuple>
#include <utility>
#include <vector>

namespace architrino::eom {
namespace {

class AccelerationCertificationError : public std::runtime_error {
 public:
  using std::runtime_error::runtime_error;
};

Interval token_bounds(const std::string& lower, const std::string& upper) {
  const Interval lower_value = Interval::decimal_token(lower);
  const Interval upper_value = Interval::decimal_token(upper);
  if (lower_value.lower() > upper_value.upper()) {
    throw std::invalid_argument("interval token lower bound exceeds upper bound");
  }
  return Interval(lower_value.lower(), upper_value.upper());
}

bool same_interval(const Interval& left, const Interval& right) {
  return left.lower() == right.lower() && left.upper() == right.upper();
}

bool same_vector(const IntervalVector& left, const IntervalVector& right) {
  return same_interval(left[0], right[0]) &&
         same_interval(left[1], right[1]) &&
         same_interval(left[2], right[2]);
}

void require_positive(const Interval& value, const char* label) {
  if (value.lower() <= 0.0) {
    throw std::invalid_argument(std::string(label) + " must be positive");
  }
}

void require_nonzero_charge(const Interval& value, const char* label) {
  if (value.contains_zero()) {
    throw std::invalid_argument(std::string(label) + " must have certified sign");
  }
}

int charge_polarity(const Interval& receiver, const Interval& source) {
  return receiver.strict_sign() == source.strict_sign() ? 1 : -1;
}

bool root_overlaps_segment(
    const Interval& emission,
    const CubicHistorySegment& segment) {
  const Interval segment_interval = token_bounds(
      segment.t_start_token(), segment.t_end_token());
  return emission.intersection(segment_interval).has_value();
}

NativeAccelerationRow reconstruct_row(
    const NativePairAccelerationRequest& request,
    const NativeRootBracket& root,
    std::size_t row_index,
    const Interval& receiver_charge,
    const Interval& source_charge,
    const Interval& coupling,
    const Interval& source_normal_floor) {
  const auto& root_certificate = *request.root_certificate;
  const Interval reception =
      Interval::decimal_token(root_certificate.reception_time);
  const Interval emission = token_bounds(root.lower, root.upper);
  if (!request.receiver_history->covers(reception) ||
      !request.source_history->covers(emission)) {
    throw AccelerationCertificationError(
        "acceleration evaluation lies outside retained-history coverage");
  }
  if (root.source_segment_indices.empty()) {
    throw AccelerationCertificationError("root lacks source segment identity");
  }
  for (const std::size_t index : root.source_segment_indices) {
    if (index >= request.source_history->segments().size() ||
        !root_overlaps_segment(
            emission, request.source_history->segments()[index])) {
      throw AccelerationCertificationError(
          "root source segment identity does not cover the root enclosure");
    }
  }

  const IntervalVector receiver_position =
      request.receiver_history->position_hull(reception);
  const IntervalVector receiver_velocity =
      request.receiver_history->velocity_hull(reception);
  const IntervalVector source_position =
      request.source_history->position_hull(emission);
  const IntervalVector source_velocity =
      request.source_history->velocity_hull(emission);
  const IntervalVector displacement =
      subtract(receiver_position, source_position);
  const Interval separation = norm(displacement);
  if (separation.contains_zero()) {
    throw AccelerationCertificationError(
        "sharp acceleration separation enclosure contains zero");
  }
  const IntervalVector direction = divide(displacement, separation);
  const Interval field_speed =
      Interval::decimal_token(root_certificate.field_speed);
  const Interval evaluated_source_normal =
      field_speed - dot(direction, source_velocity);
  const Interval certified_source_normal = token_bounds(
      root.source_normal_lower, root.source_normal_upper);
  const auto source_normal_intersection =
      evaluated_source_normal.intersection(certified_source_normal);
  if (!source_normal_intersection.has_value()) {
    throw AccelerationCertificationError(
        "root and acceleration source-normal enclosures disagree");
  }
  const Interval source_normal = *source_normal_intersection;
  if (source_normal.contains_zero() ||
      source_normal.strict_sign() != root.source_normal_sign) {
    throw AccelerationCertificationError(
        "sharp acceleration source-normal sign is uncertified");
  }
  if (interval_absolute(source_normal).lower() < source_normal_floor.upper()) {
    throw AccelerationCertificationError(
        "sharp acceleration source-normal floor is not certified");
  }

  const Interval evaluated_receiver_normal =
      field_speed - dot(direction, receiver_velocity);
  const Interval certified_receiver_normal = token_bounds(
      root.receiver_normal_lower, root.receiver_normal_upper);
  const auto receiver_normal_intersection =
      evaluated_receiver_normal.intersection(certified_receiver_normal);
  if (!receiver_normal_intersection.has_value()) {
    throw AccelerationCertificationError(
        "root and acceleration receiver-normal enclosures disagree");
  }
  const Interval receiver_normal = *receiver_normal_intersection;
  const Interval branch_orientation = receiver_normal / source_normal;
  const Interval receiver_strength = interval_absolute(branch_orientation);
  const Interval radial_denominator =
      interval_square(separation) * separation;
  const IntervalVector inverse_square_direction =
      divide(displacement, radial_denominator);
  const Interval signed_scale =
      coupling * receiver_charge * source_charge * receiver_strength;
  const IntervalVector acceleration =
      scale(signed_scale, inverse_square_direction);

  return NativeAccelerationRow{
      .row_id = request.row_id + "/root/" + std::to_string(row_index),
      .receiver_path_id = request.receiver_path_id,
      .source_path_id = request.source_path_id,
      .row_index = row_index,
      .chart = "sharp_root",
      .reception_time = root_certificate.reception_time,
      .emission_lower = root.lower,
      .emission_upper = root.upper,
      .source_segment_indices = root.source_segment_indices,
      .separation = separation,
      .source_normal = source_normal,
      .receiver_normal = receiver_normal,
      .branch_orientation = branch_orientation,
      .receiver_strength = receiver_strength,
      .polarity = charge_polarity(receiver_charge, source_charge),
      .charge_product_magnitude =
          interval_absolute(receiver_charge * source_charge),
      .coupling = coupling,
      .accumulation_group = request.receiver_path_id,
      .acceptance_status = "consumed_certified_sharp_root",
      .root_precision_route = root.precision_route,
      .root_precision_bits = root.precision_bits,
      .acceleration = acceleration,
  };
}

void validate_pair_request(const NativePairAccelerationRequest& request) {
  if (request.row_id.empty() || request.receiver_path_id.empty() ||
      request.source_path_id.empty() || request.receiver_history == nullptr ||
      request.source_history == nullptr || request.root_certificate == nullptr) {
    throw std::invalid_argument(
        "pair acceleration request requires row, path, history, and root identities");
  }
}

NativePairAccelerationCertificate uncertified_pair(
    const NativePairAccelerationRequest& request,
    const std::string& failure_code) {
  return {
      .schema = "eom_native_pair_acceleration_certificate/v0",
      .row_id = request.row_id,
      .receiver_path_id = request.receiver_path_id,
      .source_path_id = request.source_path_id,
      .chart = "sharp",
      .status = "uncertified",
      .failure_code = failure_code,
      .root_certificate_row_id = request.root_certificate->row_id,
      .reduction_policy = kDeterministicReductionPolicy,
      .reconstruction_matches = false,
      .rows = {},
      .total_acceleration = std::nullopt,
  };
}

}  // namespace

NativePairAccelerationCertificate certify_pair_acceleration(
    const NativePairAccelerationRequest& request) {
  validate_pair_request(request);
  const auto& root_certificate = *request.root_certificate;
  try {
    if (root_certificate.schema != "eom_native_exact_pair_certificate/v0") {
      throw AccelerationCertificationError("unsupported root certificate schema");
    }
    if (root_certificate.receiver_history_id !=
            request.receiver_history->history_id() ||
        root_certificate.source_history_id !=
            request.source_history->history_id()) {
      throw AccelerationCertificationError("root certificate history identity mismatch");
    }
    if (root_certificate.receiver_history_fingerprint !=
            request.receiver_history->provenance_fingerprint() ||
        root_certificate.source_history_fingerprint !=
            request.source_history->provenance_fingerprint()) {
      throw AccelerationCertificationError(
          "root certificate retained-history provenance mismatch");
    }
    if (root_certificate.status != "certified_complete" ||
        !root_certificate.root_free_complement ||
        root_certificate.memory_boundary_contact) {
      throw AccelerationCertificationError(
          "sharp acceleration requires a complete interior root certificate");
    }
    const Interval reception =
        Interval::decimal_token(root_certificate.reception_time);
    const Interval searched_upper =
        Interval::decimal_token(root_certificate.searched_upper);
    if (!same_interval(reception, searched_upper)) {
      throw AccelerationCertificationError(
          "acceleration requires root coverage through reception time");
    }
    const Interval receiver_charge =
        Interval::decimal_token(request.receiver_charge);
    const Interval source_charge =
        Interval::decimal_token(request.source_charge);
    const Interval coupling = Interval::decimal_token(request.coupling);
    const Interval source_normal_floor =
        Interval::decimal_token(request.source_normal_floor);
    const Interval acceleration_tolerance =
        Interval::decimal_token(request.acceleration_tolerance);
    require_nonzero_charge(receiver_charge, "receiver charge");
    require_nonzero_charge(source_charge, "source charge");
    require_positive(coupling, "coupling");
    require_positive(source_normal_floor, "source-normal floor");
    require_positive(acceleration_tolerance, "acceleration tolerance");

    std::vector<NativeAccelerationRow> rows;
    rows.reserve(root_certificate.roots.size());
    std::vector<IntervalVector> contributions;
    contributions.reserve(root_certificate.roots.size());
    for (std::size_t index = 0; index < root_certificate.roots.size(); ++index) {
      auto row = reconstruct_row(
          request, root_certificate.roots[index], index, receiver_charge,
          source_charge, coupling, source_normal_floor);
      contributions.push_back(row.acceleration);
      rows.push_back(std::move(row));
    }
    const IntervalVector total = fixed_pairwise_sum(contributions);
    for (const auto& component : total) {
      if (component.width() > acceleration_tolerance.lower()) {
        throw AccelerationCertificationError(
            "sharp acceleration enclosure exceeds the declared tolerance");
      }
    }
    std::vector<IntervalVector> replay;
    replay.reserve(rows.size());
    for (const auto& row : rows) {
      replay.push_back(row.acceleration);
    }
    const bool reconstruction_matches =
        same_vector(total, fixed_pairwise_sum(replay));
    if (!reconstruction_matches) {
      throw AccelerationCertificationError(
          "emitted acceleration rows do not reconstruct the pair total");
    }
    return {
        .schema = "eom_native_pair_acceleration_certificate/v0",
        .row_id = request.row_id,
        .receiver_path_id = request.receiver_path_id,
        .source_path_id = request.source_path_id,
        .chart = "sharp",
        .status = rows.empty() ? "inactive" : "active",
        .failure_code = "",
        .root_certificate_row_id = root_certificate.row_id,
        .reduction_policy = kDeterministicReductionPolicy,
        .reconstruction_matches = true,
        .rows = std::move(rows),
        .total_acceleration = total,
    };
  } catch (const AccelerationCertificationError& error) {
    return uncertified_pair(request, error.what());
  }
}

NativeAccelerationReconstructionCertificate certify_acceleration_reconstruction(
    const std::vector<std::string>& path_ids,
    const std::vector<NativePairAccelerationRequest>& pair_requests,
    std::size_t thread_count) {
  if (path_ids.empty() || thread_count == 0U) {
    throw std::invalid_argument(
        "acceleration reconstruction requires paths and at least one thread");
  }
  std::set<std::string> unique_paths;
  for (const auto& path_id : path_ids) {
    if (path_id.empty() || !unique_paths.insert(path_id).second) {
      throw std::invalid_argument(
          "acceleration reconstruction path identities must be nonempty and unique");
    }
  }
  if (path_ids.size() >
      std::numeric_limits<std::size_t>::max() / path_ids.size()) {
    throw std::overflow_error("ordered-pair matrix size overflows size_t");
  }
  const std::size_t expected_count = path_ids.size() * path_ids.size();
  std::map<std::pair<std::string, std::string>, std::size_t> request_indices;
  for (std::size_t index = 0; index < pair_requests.size(); ++index) {
    validate_pair_request(pair_requests[index]);
    const auto key = std::make_pair(
        pair_requests[index].receiver_path_id,
        pair_requests[index].source_path_id);
    if (!request_indices.emplace(key, index).second) {
      throw std::invalid_argument("duplicate ordered-pair acceleration request");
    }
  }
  if (request_indices.size() != expected_count) {
    throw std::invalid_argument("ordered-pair acceleration domain is incomplete");
  }

  std::vector<NativePairAccelerationRequest> canonical_requests;
  canonical_requests.reserve(expected_count);
  for (const auto& receiver : path_ids) {
    for (const auto& source : path_ids) {
      const auto found = request_indices.find({receiver, source});
      if (found == request_indices.end()) {
        throw std::invalid_argument("ordered-pair acceleration domain is incomplete");
      }
      canonical_requests.push_back(pair_requests[found->second]);
    }
  }

  std::map<std::string, const RetainedHistory*> path_histories;
  std::map<std::string, Interval> path_charges;
  std::map<std::string, Interval> receiver_times;
  std::optional<Interval> run_coupling;
  std::optional<Interval> run_field_speed;
  for (const auto& request : canonical_requests) {
    const Interval coupling = Interval::decimal_token(request.coupling);
    const Interval field_speed =
        Interval::decimal_token(request.root_certificate->field_speed);
    if (run_coupling.has_value() && !same_interval(*run_coupling, coupling)) {
      throw std::invalid_argument("all-pair reconstruction requires one coupling");
    }
    if (run_field_speed.has_value() &&
        !same_interval(*run_field_speed, field_speed)) {
      throw std::invalid_argument("all-pair reconstruction requires one field speed");
    }
    run_coupling = coupling;
    run_field_speed = field_speed;
    const Interval reception =
        Interval::decimal_token(request.root_certificate->reception_time);
    const auto prior_time = receiver_times.find(request.receiver_path_id);
    if (prior_time != receiver_times.end() &&
        !same_interval(prior_time->second, reception)) {
      throw std::invalid_argument(
          "each receiver requires one acceleration reception time");
    }
    receiver_times.insert_or_assign(request.receiver_path_id, reception);
    for (const auto& [path_id, history, charge_token] : {
             std::tuple<std::string, const RetainedHistory*, std::string>{
                 request.receiver_path_id, request.receiver_history,
                 request.receiver_charge},
             std::tuple<std::string, const RetainedHistory*, std::string>{
                 request.source_path_id, request.source_history,
                 request.source_charge}}) {
      const auto prior_history = path_histories.find(path_id);
      if (prior_history != path_histories.end() &&
          prior_history->second != history) {
        throw std::invalid_argument(
            "path has inconsistent retained-history inputs");
      }
      path_histories.insert_or_assign(path_id, history);
      const Interval charge = Interval::decimal_token(charge_token);
      const auto prior_charge = path_charges.find(path_id);
      if (prior_charge != path_charges.end() &&
          !same_interval(prior_charge->second, charge)) {
        throw std::invalid_argument("path has inconsistent charge inputs");
      }
      path_charges.insert_or_assign(path_id, charge);
    }
  }

  std::vector<NativePairAccelerationCertificate> pair_certificates(
      canonical_requests.size());
  const std::size_t worker_count =
      std::min(thread_count, canonical_requests.size());
  std::atomic<std::size_t> next_index{0};
  std::exception_ptr failure;
  std::mutex failure_mutex;
  std::vector<std::thread> workers;
  workers.reserve(worker_count);
  for (std::size_t worker = 0; worker < worker_count; ++worker) {
    workers.emplace_back([&]() {
      try {
        while (true) {
          const std::size_t index = next_index.fetch_add(1U);
          if (index >= canonical_requests.size()) {
            return;
          }
          pair_certificates[index] =
              certify_pair_acceleration(canonical_requests[index]);
        }
      } catch (...) {
        std::lock_guard<std::mutex> lock(failure_mutex);
        if (failure == nullptr) {
          failure = std::current_exception();
        }
      }
    });
  }
  for (auto& worker : workers) {
    worker.join();
  }
  if (failure != nullptr) {
    std::rethrow_exception(failure);
  }

  const bool all_certified = std::all_of(
      pair_certificates.begin(), pair_certificates.end(), [](const auto& pair) {
        return pair.status != "uncertified" && pair.total_acceleration.has_value();
      });
  std::vector<NativeReceiverAcceleration> receiver_totals;
  bool reconstruction_matches = all_certified;
  if (all_certified) {
    for (std::size_t receiver_index = 0; receiver_index < path_ids.size();
         ++receiver_index) {
      std::vector<IntervalVector> source_totals;
      source_totals.reserve(path_ids.size());
      for (std::size_t source_index = 0; source_index < path_ids.size();
           ++source_index) {
        const std::size_t pair_index =
            receiver_index * path_ids.size() + source_index;
        source_totals.push_back(
            *pair_certificates[pair_index].total_acceleration);
      }
      const IntervalVector total = fixed_pairwise_sum(source_totals);
      reconstruction_matches = reconstruction_matches &&
          same_vector(total, fixed_pairwise_sum(source_totals));
      receiver_totals.push_back({path_ids[receiver_index], total});
    }
  }
  return {
      .schema = "eom_native_acceleration_reconstruction_certificate/v0",
      .status = all_certified ? "certified_complete" : "uncertified",
      .failure_code = all_certified ? "" : "ordered_pair_acceleration_uncertified",
      .reduction_policy = kDeterministicReductionPolicy,
      .logical_ordered_pairs = expected_count,
      .complete_ordered_pair_domain = true,
      .reconstruction_matches = reconstruction_matches,
      .path_ids = path_ids,
      .pair_certificates = std::move(pair_certificates),
      .receiver_totals = std::move(receiver_totals),
  };
}

}  // namespace architrino::eom
