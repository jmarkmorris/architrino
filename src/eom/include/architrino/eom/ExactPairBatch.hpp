#pragma once

#include "architrino/eom/History.hpp"

#include <cstddef>
#include <limits>
#include <string>
#include <vector>

namespace architrino::eom {

struct ExactPairCertificate;
struct JointRootBracketRequest;
class JointAffineRetainedHistory;

struct ExactPairWarmStart {
  const ExactPairCertificate* certificate = nullptr;
  const RetainedHistory* receiver = nullptr;
  const RetainedHistory* source = nullptr;
};

struct ExactPairRequest {
  std::string row_id;
  const RetainedHistory* receiver;
  const RetainedHistory* source;
  // Coupled-state path identities are distinct from retained-history
  // provenance identities.  Empty values preserve the standalone exact-pair
  // convention of using history_id().
  std::string receiver_path_id;
  std::string source_path_id;
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
  // per-pair token walk. When warm_source_equality_precomputed is false the
  // pair falls back to the same timestamp-rebased token walk.
  bool warm_source_equality_precomputed = false;
  double warm_source_prefix_token_stable_upper =
      -std::numeric_limits<double>::infinity();
  const std::vector<std::size_t>* warm_source_segment_index_map = nullptr;
  // Optional admitted joint coefficient state at the difficult point.  The
  // exact-pair consumer ignores its nominal geometry, ordinary radii, factor,
  // and tolerance fields and recomputes those independently from this request's
  // retained histories and difficult cell before applying the joint theorem.
  const JointRootBracketRequest* joint_root_point_state = nullptr;
  const JointAffineRetainedHistory* joint_receiver_history = nullptr;
  const JointAffineRetainedHistory* joint_transmitter_history = nullptr;
};

struct NativeRootFreeCell {
  std::size_t transmitter_segment_index;
  std::string lower;
  std::string upper;
  std::string residual_lower;
  std::string residual_upper;
  std::string receiver_factor_lower;
  std::string receiver_factor_upper;
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
  std::string transmitter_factor_lower;
  std::string transmitter_factor_upper;
  std::string receiver_factor_lower;
  std::string receiver_factor_upper;
  int transmitter_factor_sign;
  std::vector<std::size_t> transmitter_segment_indices;
  std::string precision_route;
  unsigned precision_bits;
};

struct ExactPairCertificate {
  std::string schema;
  std::string row_id;
  std::string receiver_history_id;
  std::string transmitter_history_id;
  std::string receiver_history_fingerprint;
  std::string transmitter_history_fingerprint;
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
  double binary64_worker_wall_seconds = 0.0;
  // Additive subphases of binary64_worker_wall_seconds. These are diagnostic
  // only and do not participate in certificate identity or acceptance.
  double binary64_setup_wall_seconds = 0.0;
  double binary64_warm_start_wall_seconds = 0.0;
  double binary64_cell_setup_wall_seconds = 0.0;
  double binary64_cell_classification_wall_seconds = 0.0;
  double binary64_finalization_wall_seconds = 0.0;
  double mpfr_worker_wall_seconds = 0.0;
  std::size_t mpfr_attempt_count = 0;
  double mpfr_escalation_worker_wall_seconds = 0.0;
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
  std::string difficult_transmitter_factor_lower;
  std::string difficult_transmitter_factor_upper;
  std::string difficult_receiver_factor_lower;
  std::string difficult_receiver_factor_upper;
  int difficult_lower_sign = 0;
  int difficult_upper_sign = 0;
};

// Maximal warm-history token-equality bounds for one source path, computed
// once per snapshot and shared by every pair that reads this source.  The
// bounds are exactly what the per-pair token walks would establish:
// prefix_token_stable_upper is the largest time T such that the segments
// covering [search_lower, T] carry identical tokens in both histories, and
// warm_to_current_segment_indices maps each prior segment to its token-equal
// current segment by time, with size_t::max() for segments not retained.
struct WarmSourceEqualityBounds {
  double prefix_token_stable_upper;
  std::vector<std::size_t> warm_to_current_segment_indices;
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
