#pragma once

#include "architrino/eom/ValidatedEvidence.hpp"
#include <memory>

#include "architrino/eom/History.hpp"
#include "architrino/eom/Interval.hpp"

#include <cstddef>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

// Execution-method selection for the grouped two-source far-field enclosure.
// It selects an algorithm; it does not select or modify an interaction law.
inline constexpr const char* kMatchedPairPolicyDisabled = "disabled";
inline constexpr const char* kMatchedPairPolicySnapshotSingleSlab =
    "canonical_snapshot_single_slab/v1";
// Stage 2 policies. Both admit a window spanning several cubic segments of
// each source. The exact policy requires zero error tokens and no analytic
// certificate on every segment the window meets; the hypotheses of the
// piecewise theorem then hold by construction. The tube-conditional policy
// also admits declared position and velocity error radii; its enclosure is
// conditional on those radii enclosing the true path and its derivative, and
// the certificate says so in history_grade.
inline constexpr const char* kMatchedPairPolicySnapshotPiecewiseExact =
    "canonical_snapshot_piecewise_exact/v1";
inline constexpr const char* kMatchedPairPolicySnapshotPiecewiseTube =
    "canonical_snapshot_piecewise_validated_tube/v1";

// Evidence seam. The validated-tube policy admits
// declared radii only when the request carries evidence issued by a validated
// far-step producer whose coupling equals the request's and whose population
// contains the receiver and both members with exactly these charges and
// exactly this history content. There is no registry: the evidence object is
// passed explicitly and rechecked against the histories actually supplied.
[[nodiscard]] inline bool matched_pair_policy_is_known(
    const std::string& policy) {
  return policy == kMatchedPairPolicySnapshotSingleSlab ||
      policy == kMatchedPairPolicySnapshotPiecewiseExact ||
      policy == kMatchedPairPolicySnapshotPiecewiseTube;
}
inline constexpr const char* kMatchedPairCertificateSchema =
    "eom_native_matched_pair_enclosure_certificate/v1";
// Root-row marker for a logical source relationship owned by a group. It
// records that the root search was bypassed. It carries no roots and makes no
// root-free-complement claim.
inline constexpr const char* kMatchedPairMemberMarkerSchema =
    "eom_native_matched_pair_member_marker/v1";

struct MatchedPairMemberEvidence {
  std::string path_id;
  std::string history_id;
  std::string history_fingerprint;
  std::string charge;
  std::optional<std::size_t> segment_index;
  std::string segment_start;
  std::string segment_end;
  // g(S0) = |R - X(S0)| - (T_r - S0), enclosed uniformly over the receiver
  // box R. Strictly negative: one interior root. Strictly positive: none.
  std::optional<Interval> window_start_residual;
  std::string disposition = "not_evaluated";
  // Retained history start of this member. When it precedes the window start,
  // the residual below is recomputed here from this member's own position hull
  // over [history start, window start] and must be strictly negative, which
  // proves that interval holds no causal root for this receiver event.
  std::string history_start;
  std::optional<Interval> prefix_residual;
  // Piecewise policies only: last segment the window meets, and upper bounds
  // of the Euclidean norms of the declared position and velocity radius
  // vectors over the segments the window meets.
  std::optional<std::size_t> last_segment_index;
  std::optional<double> position_radius_upper;
  std::optional<double> velocity_radius_upper;
};

struct NativeMatchedPairEnclosureCertificate {
  std::string schema;
  std::string group_id;
  std::string policy;
  std::string receiver_path_id;
  std::string receiver_history_id;
  std::string receiver_history_fingerprint;
  // Leader precedes follower in canonical path order. The leader's reduction
  // slot owns the single numerical interval; the follower's slot carries the
  // additive identity and refers to this group.
  MatchedPairMemberEvidence leader;
  MatchedPairMemberEvidence follower;
  std::string reception_time;
  std::string emission_lower;
  std::string emission_upper;
  // Mathematical input tokens the enclosure was certified for. A consumer
  // must present exactly these values; a changed scalar requires a fresh
  // certificate, never a relabelled interval.
  std::string receiver_charge;
  std::string coupling;
  std::string field_speed;
  std::string far_field_enclosure_fraction;
  std::string acceleration_tolerance;
  // whole_retained_history: the window starts at both members' retained
  // history start. member_prefix_reproved: at least one member has earlier
  // retained history and its root-free prefix was re-proved from that
  // member's own history. not_established otherwise. No prefix evidence is
  // imported from the caller.
  std::string window_coverage = "not_established";
  std::size_t transmitter_count = 0;
  // certified_enclosed | certified_absent | declined
  std::string status;
  std::string failure_code;
  std::optional<IntervalVector> receiver_position_hull;
  std::optional<IntervalVector> source_domain_hull;
  std::optional<double> distance_floor;
  std::optional<double> speed_upper;
  std::optional<double> transmitter_factor_floor;
  std::optional<double> separation_upper;
  std::optional<double> relative_speed_upper;
  std::optional<double> acceleration_upper;
  std::optional<double> prefactor_upper;
  std::optional<double> radius_upper;
  std::optional<Interval> member_width_slice;
  std::optional<double> admission_width_threshold;
  std::optional<double> emitted_width;
  std::optional<IntervalVector> acceleration;
  // Piecewise policies only. Window start, every interior segment boundary
  // of either source, and the reception time, in increasing order.
  std::vector<std::string> cell_boundaries;
  // Upper bound of the summed nominal velocity jumps of one source across
  // its joins in the window (the larger of the two sources' sums).
  std::optional<double> join_velocity_jump_upper;
  // exact_cubic: one error-free cubic slab. exact_piecewise_cubic: several
  // error-free cubic segments, continuous with continuous derivative by the
  // history layer's exact join validation. carrier_declared_tubes: the
  // enclosure covers every path consistent with the declared radii and is
  // conditional on those radii enclosing the true path and its derivative.
  std::string history_grade = "exact_cubic";
  // The evidence the group was certified with; a recheck uses it again.
  std::shared_ptr<const ValidatedPopulationEvidence> validated_evidence = {};
};

struct MatchedPairEnclosureRequest {
  std::string policy;
  std::string receiver_path_id;
  const RetainedHistory* receiver_history = nullptr;
  std::string receiver_charge;
  std::string leader_path_id;
  const RetainedHistory* leader_history = nullptr;
  std::string leader_charge;
  std::string follower_path_id;
  const RetainedHistory* follower_history = nullptr;
  std::string follower_charge;
  std::string coupling;
  std::string field_speed;
  std::string reception_time;
  // Lower end of the declared root-search window shared by both members.
  std::string emission_lower;
  std::string far_field_enclosure_fraction;
  std::string acceleration_tolerance;
  // Full source-path count N of the snapshot. Never the number of groups.
  std::size_t transmitter_count = 0;
  // Producer-issued evidence for histories with declared radii. Null for
  // exact histories.
  std::shared_ptr<const ValidatedPopulationEvidence> validated_evidence = {};
};

// Exact decimal-token predicates. Interval enclosures of tokens are always
// two units in the last place wide, so equality is decided on the tokens.
[[nodiscard]] int compare_exact_decimal_tokens(
    const std::string& left,
    const std::string& right);
[[nodiscard]] bool exact_decimal_token_is_zero(const std::string& token);
[[nodiscard]] bool exact_decimal_tokens_are_opposite(
    const std::string& left,
    const std::string& right);

// Whole-step tube-form bound, for use inside a validated far step. The slab
// is [slab_lower, slab_upper], exact tokens: the retained past of both
// members up to the step start. The receiver set is a box that holds for the
// whole step. The radius is that of the piecewise tube-form theorem, from
// bounds over the whole slab: the distance floor between the receiver box and
// the box hull of both members' position tubes, the speed bound of their
// velocity tubes, the equal-time separation, the nominal equal-time relative
// velocity with both members' largest velocity radii, the nominal
// acceleration bound and the nominal velocity jumps at joins.
//
// This function checks nothing about reception. The caller must have
// established that, for every reception time of the step and every receiver
// point in the box, each member has exactly one causal root and that root
// lies in the slab. It also does not check evidence: the caller supplies
// histories whose tubes are already admitted.
struct WholeStepPairBoundRequest {
  IntervalVector receiver_box{Interval::point(0.0), Interval::point(0.0),
                              Interval::point(0.0)};
  std::string receiver_charge;
  std::string coupling;
  const RetainedHistory* leader_history = nullptr;
  std::string leader_charge;
  const RetainedHistory* follower_history = nullptr;
  std::string follower_charge;
  std::string slab_lower;
  std::string slab_upper;
};

struct WholeStepPairBound {
  // certified | declined
  std::string status = "declined";
  // MPE-CHARGE-01 charges are not exact opposites; MPE-WINDOW-01 the slab is
  // not covered by both histories; MPE-HISTORY-01 an analytic carrier;
  // MPE-GEO-01 no positive distance floor; MPE-SPEED-01 speed bound not
  // below 1; MPE-BOUND-01 radius not finite.
  std::string failure_code;
  std::size_t cell_count = 0;
  IntervalVector source_domain_hull{Interval::point(0.0), Interval::point(0.0),
                                    Interval::point(0.0)};
  double distance_floor = 0.0;
  double speed_upper = 0.0;
  double factor_floor = 0.0;
  double separation_upper = 0.0;
  double relative_speed_upper = 0.0;
  double acceleration_upper = 0.0;
  double join_jump_upper = 0.0;
  double leader_velocity_radius_upper = 0.0;
  double follower_velocity_radius_upper = 0.0;
  double prefactor_upper = 0.0;
  // B. The pair's acceleration has every component in [-B, B].
  double radius_upper = 0.0;
};

[[nodiscard]] WholeStepPairBound whole_step_pair_bound(
    const WholeStepPairBoundRequest& request);

// Pure function: reads the three histories and the run tokens, mutates
// nothing, and returns a certificate whose status is certified_enclosed,
// certified_absent or declined. A declined certificate carries no
// acceleration interval; diagnostic bounds computed before the decline remain.
[[nodiscard]] NativeMatchedPairEnclosureCertificate
certify_matched_pair_enclosure(const MatchedPairEnclosureRequest& request);

// What a consumer is about to use a group for: the identities, event and
// mathematical scalars of its own request. Every field is compared with the
// certificate; scalar tokens are compared as exact decimals.
struct MatchedPairConsumerInputs {
  std::string receiver_path_id;
  const RetainedHistory* receiver_history = nullptr;
  std::string member_path_id;
  const RetainedHistory* member_history = nullptr;
  std::string reception_time;
  std::string receiver_charge;
  std::string member_charge;
  std::string coupling;
  std::string field_speed;
  std::string acceleration_tolerance;
};

// Consumer-side recheck used before a grouped interval enters a reduction.
// Returns an empty string when the certificate is usable for exactly this
// request, otherwise the reason it must be refused. Besides identities,
// provenance, event and coverage, it requires the requested receiver charge,
// member charge, coupling, wake speed and tolerance to equal the certified
// tokens, recomputes the two-slice slice and threshold, the prefactor and the
// radius from the recorded bounds and the requested scalars, and requires the
// recorded slice, threshold, prefactor, radius, width and interval to equal
// the recomputed ones exactly. This is an internal-consistency check of one
// certificate against one request. It cannot verify the recorded bounds
// against the histories; matched_pair_certificate_difference against a fresh
// certification does that.
[[nodiscard]] std::string matched_pair_certificate_refusal(
    const NativeMatchedPairEnclosureCertificate& certificate,
    const MatchedPairConsumerInputs& consumer);

// Field-by-field comparison of a supplied certificate with one certified
// afresh from the actual inputs. Returns an empty string when every retained
// field is identical: identities, tokens, coverage, both members' evidence,
// hulls, every whole-slab bound, the prefactor, radius, slice, threshold,
// width, interval, status and failure code. Otherwise returns the name of the
// first differing field. Doubles and interval endpoints are compared exactly.
[[nodiscard]] std::string matched_pair_certificate_difference(
    const NativeMatchedPairEnclosureCertificate& supplied,
    const NativeMatchedPairEnclosureCertificate& fresh);

}  // namespace architrino::eom
