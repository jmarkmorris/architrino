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

struct NativeFarFieldEnclosureCertificate {
  std::string schema;
  std::string row_id;
  std::string receiver_path_id;
  std::string transmitter_path_id;
  std::string receiver_history_id;
  std::string transmitter_history_id;
  std::string receiver_history_fingerprint;
  std::string transmitter_history_fingerprint;
  std::string reception_time;
  std::string emission_lower;
  std::string emission_upper;
  std::string status;
  std::string failure_code;
  std::optional<IntervalVector> displacement_hull;
  std::optional<Interval> separation;
  std::optional<Interval> receiver_speed;
  std::optional<Interval> transmitter_speed;
  std::optional<Interval> transmitter_factor_lower_bound;
  std::optional<Interval> pair_magnitude_bound;
  std::optional<Interval> pair_width_budget;
  std::optional<Interval> derived_cutoff_radius;
  std::optional<IntervalVector> acceleration;
};

struct NativePairAccelerationRequest {
  std::string row_id;
  std::string receiver_path_id;
  std::string transmitter_path_id;
  const RetainedHistory* receiver_history;
  const RetainedHistory* transmitter_history;
  const ExactPairCertificate* root_certificate;
  const NativeFarFieldEnclosureCertificate* far_field_enclosure = nullptr;
  std::string receiver_charge;
  std::string transmitter_charge;
  std::string coupling;
  std::string chart = "sharp";
  std::string transmitter_factor_floor = "1e-30";
  std::string causal_width = "0.2";
  std::string core_scale = "0.2";
  std::string acceleration_tolerance = "1e-9";
  std::string quadrature_tolerance = "1e-9";
  std::size_t quadrature_max_depth = 32;
  std::size_t quadrature_max_cells = 200000;
  // Cost-only execution budget. Cell identities and reductions remain serially
  // ordered; only independent enclosure evaluations may run concurrently.
  std::size_t quadrature_thread_count = 1;
  unsigned initial_mpfr_bits = 128;
  unsigned maximum_mpfr_bits = 512;
  bool force_precision_escalation = false;
  bool use_analytic_pinned_fold = true;
  bool use_correlated_self_chord = true;
  bool use_stable_circular_residual = true;
};

struct NativeAccelerationRow {
  std::string row_id;
  std::string receiver_path_id;
  std::string transmitter_path_id;
  std::size_t row_index;
  std::string chart;
  std::string reception_time;
  std::string emission_lower;
  std::string emission_upper;
  std::vector<std::size_t> transmitter_segment_indices;
  std::optional<Interval> separation;
  std::optional<Interval> transmitter_factor;
  std::optional<Interval> receiver_factor;
  std::optional<Interval> root_playback;
  std::optional<Interval> acceleration_weight;
  int polarity;
  Interval charge_product_magnitude;
  Interval coupling;
  std::string accumulation_group;
  std::string acceptance_status;
  std::string root_precision_route;
  unsigned root_precision_bits;
  std::string acceleration_precision_route;
  unsigned acceleration_precision_bits;
  IntervalVector acceleration;
};

struct NativePairAccelerationCertificate {
  std::string schema;
  std::string row_id;
  std::string receiver_path_id;
  std::string transmitter_path_id;
  std::string chart;
  std::string status;
  std::string failure_code;
  std::string root_certificate_row_id;
  std::string reduction_policy;
  std::size_t quadrature_visited_cells;
  std::size_t analytic_fold_visited_cells;
  std::size_t correlated_self_chord_visited_cells = 0;
  std::size_t stable_circular_residual_visited_cells = 0;
  bool acceleration_precision_escalated;
  unsigned achieved_acceleration_precision_bits;
  double pair_wall_seconds = 0.0;
  double finite_width_wall_seconds = 0.0;
  double precision_escalation_wall_seconds = 0.0;
  std::size_t precision_escalation_attempt_count = 0;
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
  double pair_execution_union_wall_seconds = 0.0;
  double finite_width_execution_union_wall_seconds = 0.0;
  double sharp_execution_union_wall_seconds = 0.0;
  double finite_width_sharp_overlap_wall_seconds = 0.0;
  double worker_idle_orchestration_wall_seconds = 0.0;
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
