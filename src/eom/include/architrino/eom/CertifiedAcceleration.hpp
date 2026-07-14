#pragma once

#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/Interval.hpp"

#include <cstddef>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

inline constexpr const char* kDeterministicReductionPolicy =
    "fixed_pairwise_interval_tree_v0";

struct NativePairAccelerationRequest {
  std::string row_id;
  std::string receiver_path_id;
  std::string source_path_id;
  const RetainedHistory* receiver_history;
  const RetainedHistory* source_history;
  const ExactPairCertificate* root_certificate;
  std::string receiver_charge;
  std::string source_charge;
  std::string coupling;
  std::string source_normal_floor = "1e-30";
  std::string acceleration_tolerance = "1e-9";
};

struct NativeAccelerationRow {
  std::string row_id;
  std::string receiver_path_id;
  std::string source_path_id;
  std::size_t row_index;
  std::string chart;
  std::string reception_time;
  std::string emission_lower;
  std::string emission_upper;
  std::vector<std::size_t> source_segment_indices;
  Interval separation;
  Interval source_normal;
  Interval receiver_normal;
  Interval branch_orientation;
  Interval receiver_strength;
  int polarity;
  Interval charge_product_magnitude;
  Interval coupling;
  std::string accumulation_group;
  std::string acceptance_status;
  std::string root_precision_route;
  unsigned root_precision_bits;
  IntervalVector acceleration;
};

struct NativePairAccelerationCertificate {
  std::string schema;
  std::string row_id;
  std::string receiver_path_id;
  std::string source_path_id;
  std::string chart;
  std::string status;
  std::string failure_code;
  std::string root_certificate_row_id;
  std::string reduction_policy;
  bool reconstruction_matches;
  std::vector<NativeAccelerationRow> rows;
  std::optional<IntervalVector> total_acceleration;
};

struct NativeReceiverAcceleration {
  std::string receiver_path_id;
  IntervalVector acceleration;
};

struct NativeAccelerationReconstructionCertificate {
  std::string schema;
  std::string status;
  std::string failure_code;
  std::string reduction_policy;
  std::size_t logical_ordered_pairs;
  bool complete_ordered_pair_domain;
  bool reconstruction_matches;
  std::vector<std::string> path_ids;
  std::vector<NativePairAccelerationCertificate> pair_certificates;
  std::vector<NativeReceiverAcceleration> receiver_totals;
};

[[nodiscard]] NativePairAccelerationCertificate certify_pair_acceleration(
    const NativePairAccelerationRequest& request);

[[nodiscard]] NativeAccelerationReconstructionCertificate
certify_acceleration_reconstruction(
    const std::vector<std::string>& path_ids,
    const std::vector<NativePairAccelerationRequest>& pair_requests,
    std::size_t thread_count);

}  // namespace architrino::eom
