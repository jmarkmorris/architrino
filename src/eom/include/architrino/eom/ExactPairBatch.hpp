#pragma once

#include "architrino/eom/History.hpp"

#include <cstddef>
#include <limits>
#include <string>
#include <vector>

namespace architrino::eom {

struct ExactPairCertificate;

struct ExactPairWarmStart {
  const ExactPairCertificate* certificate = nullptr;
  const RetainedHistory* receiver = nullptr;
  const RetainedHistory* source = nullptr;
};

struct ExactPairRequest {
  std::string row_id;
  const RetainedHistory* receiver;
  const RetainedHistory* source;
  std::string reception_time;
  std::string search_lower;
  std::string search_upper;
  std::string field_speed;
  std::string root_tolerance;
  std::size_t max_depth = 192;
  std::size_t max_cells = 200000;
  unsigned initial_mpfr_bits = 128;
  unsigned maximum_mpfr_bits = 512;
  bool force_precision_escalation = false;
  // Return an uncertified advisory before entering MPFR so a cost-aware
  // controller can adjust the receiver-time interval first.
  bool defer_precision_escalation = false;
  const ExactPairWarmStart* warm_start = nullptr;
  // Once-per-snapshot warm-history equality bounds for this request's source
  // path, computed by the snapshot certifier so each pair avoids an O(window)
  // per-pair token walk.  When warm_source_equality_precomputed is false the
  // pair falls back to the exact token walk; the precomputed bounds are
  // exactly the values that walk would establish.
  bool warm_source_equality_precomputed = false;
  double warm_source_prefix_token_stable_upper =
      -std::numeric_limits<double>::infinity();
  std::size_t warm_source_aligned_equal_segments = 0;
};

struct NativeRootFreeCell {
  std::size_t source_segment_index;
  std::string lower;
  std::string upper;
  std::string residual_lower;
  std::string residual_upper;
  std::string receiver_normal_lower;
  std::string receiver_normal_upper;
  // Binary64 mirrors of the tokens above (tokens are max_digits10 and
  // round-trip exactly).  They exist so warm-start replay does not re-parse
  // every retained cell on every snapshot; numeric_values_valid guards
  // cells built by older producers.
  double lower_value = 0.0;
  double upper_value = 0.0;
  double residual_lower_value = 0.0;
  double residual_upper_value = 0.0;
  bool numeric_values_valid = false;
};

struct NativeRootBracket {
  std::string lower;
  std::string upper;
  std::string source_normal_lower;
  std::string source_normal_upper;
  std::string receiver_normal_lower;
  std::string receiver_normal_upper;
  int source_normal_sign;
  std::vector<std::size_t> source_segment_indices;
  std::string precision_route;
  unsigned precision_bits;
};

struct ExactPairCertificate {
  std::string schema;
  std::string row_id;
  std::string receiver_history_id;
  std::string source_history_id;
  std::string receiver_history_fingerprint;
  std::string source_history_fingerprint;
  std::string reception_time;
  std::string searched_lower;
  std::string searched_upper;
  std::string field_speed;
  std::string root_tolerance;
  std::string status;
  std::string failure_code;
  bool root_free_complement;
  bool memory_boundary_contact;
  bool coincident_endpoint_excluded;
  bool precision_escalated;
  unsigned achieved_precision_bits;
  std::size_t visited_cells;
  std::size_t excluded_cells;
  std::size_t difficult_cells;
  std::string diagnostic_detail;
  std::vector<NativeRootBracket> roots;
  double binary64_cpu_seconds = 0.0;
  double mpfr_cpu_seconds = 0.0;
  std::size_t mpfr_attempt_count = 0;
  double mpfr_escalation_cpu_seconds = 0.0;
  std::size_t mpfr_escalation_attempt_count = 0;
  std::size_t warm_excluded_cells = 0;
  std::size_t reevaluated_cells = 0;
  double warm_residual_drift_upper = 0.0;
  // A negative residual prefix remains root-free for later receiver times
  // while the receiver speed is certified below the field speed.  Carrying
  // this frontier avoids replaying every older root-free cell.
  bool stable_negative_prefix_certified = false;
  std::string stable_negative_prefix_upper;
  std::size_t incremental_prefix_reuse_count = 0;
  std::vector<NativeRootFreeCell> root_free_cells;
  bool has_difficult_cell = false;
  std::size_t difficult_source_segment_index = 0;
  std::string difficult_cell_lower;
  std::string difficult_cell_upper;
  std::string difficult_point;
  std::string difficult_point_residual_lower;
  std::string difficult_point_residual_upper;
  std::string difficult_source_normal_lower;
  std::string difficult_source_normal_upper;
  std::string difficult_receiver_normal_lower;
  std::string difficult_receiver_normal_upper;
  int difficult_lower_sign = 0;
  int difficult_upper_sign = 0;
};

// Maximal warm-history token-equality bounds for one source path, computed
// once per snapshot and shared by every pair that reads this source.  The
// bounds are exactly what the per-pair token walks would establish:
// prefix_token_stable_upper is the largest time T such that the segments
// covering [search_lower, T] carry identical tokens in both histories, and
// aligned_equal_segments is the length of the leading run of index-aligned
// token-equal segments.
struct WarmSourceEqualityBounds {
  double prefix_token_stable_upper;
  std::size_t aligned_equal_segments;
};

[[nodiscard]] WarmSourceEqualityBounds compute_warm_source_equality_bounds(
    const RetainedHistory& current,
    const RetainedHistory& warm,
    double search_lower);

[[nodiscard]] ExactPairCertificate certify_exact_pair(
    const ExactPairRequest& request);

[[nodiscard]] std::vector<ExactPairCertificate> certify_exact_pair_batch(
    const std::vector<ExactPairRequest>& requests,
    std::size_t thread_count);

}  // namespace architrino::eom
