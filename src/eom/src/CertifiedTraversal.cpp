#include "architrino/eom/CertifiedTraversal.hpp"

#include <algorithm>
#include <limits>
#include <optional>
#include <stdexcept>
#include <string>
#include <unordered_set>
#include <utility>
#include <vector>

namespace architrino::eom {
namespace {

struct PendingNode {
  std::string node_id;
  std::size_t receiver_begin;
  std::size_t receiver_end;
  std::size_t source_begin;
  std::size_t source_end;
};

Interval token_bounds(const TimeIntervalTokens& tokens) {
  const Interval lower = Interval::decimal_token(tokens.lower);
  const Interval upper = Interval::decimal_token(tokens.upper);
  if (lower.lower() > upper.upper()) {
    throw std::invalid_argument("time interval requires lower <= upper");
  }
  return Interval(lower.lower(), upper.upper());
}

std::uint64_t checked_pair_count(
    std::size_t receiver_count, std::size_t source_count) {
  if (receiver_count >
      std::numeric_limits<std::uint64_t>::max() / source_count) {
    throw std::overflow_error("ordered-pair count overflows uint64");
  }
  return static_cast<std::uint64_t>(receiver_count) *
      static_cast<std::uint64_t>(source_count);
}

void checked_add(std::uint64_t& total, std::uint64_t value) {
  if (total > std::numeric_limits<std::uint64_t>::max() - value) {
    throw std::overflow_error("traversal coverage count overflows uint64");
  }
  total += value;
}

void validate_members(
    const std::vector<MovingHistoryMember>& members,
    const Interval& reception,
    const Interval& emission,
    bool receiver_members) {
  if (members.empty()) {
    throw std::invalid_argument("traversal memberships cannot be empty");
  }
  std::unordered_set<std::string> identities;
  identities.reserve(members.size());
  for (const auto& member : members) {
    if (member.path_id.empty() || member.history == nullptr) {
      throw std::invalid_argument(
          "traversal members require path identities and histories");
    }
    if (!identities.insert(member.path_id).second) {
      throw std::invalid_argument(
          "traversal path identities must be unique within each membership");
    }
    const Interval required = receiver_members ? reception : emission;
    if (!member.history->covers(required)) {
      throw std::invalid_argument(
          "traversal member does not cover its declared time interval");
    }
  }
}

IntervalVector member_position_hull(
    const std::vector<MovingHistoryMember>& members,
    std::size_t begin,
    std::size_t end,
    const Interval& time) {
  std::optional<IntervalVector> result;
  for (std::size_t index = begin; index < end; ++index) {
    const IntervalVector position = members[index].history->position_hull(time);
    result = result.has_value() ? hull(*result, position) : position;
  }
  if (!result.has_value()) {
    throw std::invalid_argument("traversal node membership cannot be empty");
  }
  return *result;
}

Interval node_residual(
    const CertifiedTraversalRequest& request,
    const PendingNode& node,
    const Interval& reception,
    const Interval& emission,
    const Interval& field_speed) {
  const IntervalVector receiver_positions = member_position_hull(
      request.receivers, node.receiver_begin, node.receiver_end, reception);
  const IntervalVector source_positions = member_position_hull(
      request.sources, node.source_begin, node.source_end, emission);
  return norm(subtract(receiver_positions, source_positions)) -
      field_speed * (reception - emission);
}

bool exact_certificate_complete(const ExactPairCertificate& certificate) {
  return certificate.root_free_complement &&
      !certificate.memory_boundary_contact &&
      certificate.status != "uncertified";
}

}  // namespace

CertifiedTraversalCertificate certify_moving_history_traversal(
    const CertifiedTraversalRequest& request) {
  if (request.traversal_id.empty()) {
    throw std::invalid_argument("certified traversal requires an identity");
  }
  if (request.exact_tile_pair_limit == 0U || request.maximum_nodes == 0U) {
    throw std::invalid_argument("traversal resource limits must be positive");
  }
  const Interval reception = token_bounds(request.reception);
  const Interval emission = token_bounds(request.emission);
  if (emission.upper() > reception.lower()) {
    throw std::invalid_argument(
        "emission traversal cannot extend beyond earliest reception");
  }
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  if (field_speed.lower() <= 0.0) {
    throw std::invalid_argument("field speed must be strictly positive");
  }
  validate_members(request.receivers, reception, emission, true);
  validate_members(request.sources, reception, emission, false);

  const std::uint64_t logical_pairs = checked_pair_count(
      request.receivers.size(), request.sources.size());
  CertifiedTraversalCertificate result{
      .schema = "eom_certified_moving_history_traversal/v0",
      .traversal_id = request.traversal_id,
      .status = "uncertified",
      .failure_code = "resource_envelope_exceeded",
      .logical_ordered_pairs = logical_pairs,
      .excluded_pairs = 0,
      .exact_fallback_pairs = 0,
      .visited_nodes = 0,
      .coverage_disjoint_complete = false,
      .nodes = {},
      .exact_tiles = {},
  };
  std::vector<PendingNode> pending{{
      .node_id = "root",
      .receiver_begin = 0,
      .receiver_end = request.receivers.size(),
      .source_begin = 0,
      .source_end = request.sources.size(),
  }};
  std::size_t tile_index = 0;
  while (!pending.empty()) {
    if (result.visited_nodes >= request.maximum_nodes) {
      return result;
    }
    PendingNode node = std::move(pending.back());
    pending.pop_back();
    ++result.visited_nodes;
    const std::size_t receiver_count =
        node.receiver_end - node.receiver_begin;
    const std::size_t source_count = node.source_end - node.source_begin;
    const std::uint64_t pair_count =
        checked_pair_count(receiver_count, source_count);
    const Interval residual =
        node_residual(request, node, reception, emission, field_speed);
    if (residual.excludes_zero()) {
      checked_add(result.excluded_pairs, pair_count);
      result.nodes.push_back({
          .node_id = node.node_id,
          .status = "excluded",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .source_begin = node.source_begin,
          .source_end = node.source_end,
          .logical_ordered_pairs = pair_count,
          .residual = residual,
      });
      continue;
    }
    const bool make_exact =
        pair_count <= request.exact_tile_pair_limit ||
        (receiver_count == 1U && source_count == 1U);
    if (make_exact) {
      checked_add(result.exact_fallback_pairs, pair_count);
      const std::string tile_id =
          request.traversal_id + "/exact/" + std::to_string(tile_index++);
      result.nodes.push_back({
          .node_id = node.node_id,
          .status = "exact_tile",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .source_begin = node.source_begin,
          .source_end = node.source_end,
          .logical_ordered_pairs = pair_count,
          .residual = residual,
      });
      result.exact_tiles.push_back({
          .tile_id = tile_id,
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .source_begin = node.source_begin,
          .source_end = node.source_end,
          .logical_ordered_pairs = pair_count,
      });
      continue;
    }

    if (source_count >= receiver_count && source_count > 1U) {
      const std::size_t midpoint =
          node.source_begin + source_count / 2U;
      pending.push_back({
          .node_id = node.node_id + "/s1",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .source_begin = midpoint,
          .source_end = node.source_end,
      });
      pending.push_back({
          .node_id = node.node_id + "/s0",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .source_begin = node.source_begin,
          .source_end = midpoint,
      });
    } else {
      const std::size_t midpoint =
          node.receiver_begin + receiver_count / 2U;
      pending.push_back({
          .node_id = node.node_id + "/r1",
          .receiver_begin = midpoint,
          .receiver_end = node.receiver_end,
          .source_begin = node.source_begin,
          .source_end = node.source_end,
      });
      pending.push_back({
          .node_id = node.node_id + "/r0",
          .receiver_begin = node.receiver_begin,
          .receiver_end = midpoint,
          .source_begin = node.source_begin,
          .source_end = node.source_end,
      });
    }
  }
  const bool complete = result.excluded_pairs <= logical_pairs &&
      result.exact_fallback_pairs == logical_pairs - result.excluded_pairs;
  result.coverage_disjoint_complete = complete;
  result.status = complete ? "certified_complete" : "uncertified";
  result.failure_code = complete ? "" : "pair_coverage_incomplete";
  return result;
}

CertifiedTraversalExactBatchCertificate certify_traversal_exact_pair_batch(
    const CertifiedTraversalExactBatchRequest& request) {
  if (request.traversal_request == nullptr ||
      request.traversal_certificate == nullptr) {
    throw std::invalid_argument(
        "traversal exact batch requires request and certificate");
  }
  const auto& traversal = *request.traversal_request;
  const auto& certificate = *request.traversal_certificate;
  CertifiedTraversalExactBatchCertificate result{
      .schema = "eom_certified_traversal_exact_pair_batch/v0",
      .traversal_id = traversal.traversal_id,
      .status = "uncertified",
      .failure_code = "traversal_not_certified",
      .logical_ordered_pairs = certificate.logical_ordered_pairs,
      .excluded_pairs = certificate.excluded_pairs,
      .exact_pairs_requested = certificate.exact_fallback_pairs,
      .exact_pairs_completed = 0,
      .coverage_disjoint_complete = false,
      .exact_pair_certificates = {},
  };
  if (certificate.traversal_id != traversal.traversal_id ||
      certificate.status != "certified_complete" ||
      !certificate.coverage_disjoint_complete) {
    return result;
  }
  if (certificate.exact_fallback_pairs > request.maximum_exact_pairs ||
      certificate.exact_fallback_pairs >
          static_cast<std::uint64_t>(
              std::numeric_limits<std::size_t>::max())) {
    result.failure_code = "resource_envelope_exceeded";
    return result;
  }
  std::vector<ExactPairRequest> exact_requests;
  exact_requests.reserve(
      static_cast<std::size_t>(certificate.exact_fallback_pairs));
  for (const auto& tile : certificate.exact_tiles) {
    for (std::size_t receiver_index = tile.receiver_begin;
         receiver_index < tile.receiver_end; ++receiver_index) {
      for (std::size_t source_index = tile.source_begin;
           source_index < tile.source_end; ++source_index) {
        const auto& receiver = traversal.receivers[receiver_index];
        const auto& source = traversal.sources[source_index];
        exact_requests.push_back({
            .row_id = traversal.traversal_id + "/" + receiver.path_id + "/" +
                source.path_id,
            .receiver = receiver.history,
            .source = source.history,
            .reception_time = request.reception_time,
            .search_lower = request.search_lower,
            .search_upper = request.search_upper,
            .field_speed = traversal.field_speed,
            .root_tolerance = request.root_tolerance,
            .max_depth = request.root_max_depth,
            .max_cells = request.root_max_cells,
            .initial_mpfr_bits = request.initial_mpfr_bits,
            .maximum_mpfr_bits = request.maximum_mpfr_bits,
            .force_precision_escalation = false,
        });
      }
    }
  }
  result.exact_pair_certificates =
      certify_exact_pair_batch(exact_requests, request.thread_count);
  for (const auto& exact : result.exact_pair_certificates) {
    if (!exact_certificate_complete(exact)) {
      result.failure_code = exact.failure_code.empty()
          ? "root_completeness_not_certified"
          : exact.failure_code;
      return result;
    }
    ++result.exact_pairs_completed;
  }
  result.coverage_disjoint_complete =
      result.excluded_pairs + result.exact_pairs_completed ==
      result.logical_ordered_pairs;
  result.status = result.coverage_disjoint_complete
      ? "certified_complete"
      : "uncertified";
  result.failure_code = result.coverage_disjoint_complete
      ? ""
      : "pair_coverage_incomplete";
  return result;
}

}  // namespace architrino::eom
