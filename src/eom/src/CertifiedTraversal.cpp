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
  std::size_t transmitter_begin;
  std::size_t transmitter_end;
  Interval emission;
  std::size_t emission_depth;
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
    std::size_t receiver_count, std::size_t transmitter_count) {
  if (receiver_count >
      std::numeric_limits<std::uint64_t>::max() / transmitter_count) {
    throw std::overflow_error("ordered-pair count overflows uint64");
  }
  return static_cast<std::uint64_t>(receiver_count) *
      static_cast<std::uint64_t>(transmitter_count);
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
    if (!member.accepted_retained_history) {
      throw std::invalid_argument(
          "authoritative traversal requires accepted retained histories");
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
  const IntervalVector transmitter_positions = member_position_hull(
      request.sources, node.transmitter_begin, node.transmitter_end, emission);
  return norm(subtract(receiver_positions, transmitter_positions)) -
      field_speed * (reception - emission);
}

std::size_t checked_pair_tracking_bytes(std::uint64_t logical_pairs) {
  const std::uint64_t bytes = logical_pairs / 8U +
      (logical_pairs % 8U == 0U ? 0U : 1U);
  if (bytes > static_cast<std::uint64_t>(
                  std::numeric_limits<std::size_t>::max())) {
    throw std::overflow_error("pair tracking size overflows size_t");
  }
  return static_cast<std::size_t>(bytes);
}

void mark_exact_pairs(
    std::vector<bool>& exact_pairs,
    std::size_t transmitter_population,
    const PendingNode& node) {
  for (std::size_t receiver = node.receiver_begin;
       receiver < node.receiver_end; ++receiver) {
    const std::size_t row = receiver * transmitter_population;
    for (std::size_t source = node.transmitter_begin;
         source < node.transmitter_end; ++source) {
      exact_pairs[row + source] = true;
    }
  }
}

std::uint64_t build_membership_tiles(
    const std::vector<bool>& exact_pairs,
    std::size_t receiver_population,
    std::size_t transmitter_population,
    bool traversal_complete,
    std::vector<CertifiedMembershipTile>& memberships,
    std::vector<CertifiedExactTile>& exact_tiles,
    const std::string& traversal_id) {
  std::uint64_t exact_count = 0;
  std::size_t exact_tile_index = 0;
  for (std::size_t receiver = 0; receiver < receiver_population; ++receiver) {
    const std::size_t row = receiver * transmitter_population;
    std::size_t source = 0;
    while (source < transmitter_population) {
      const bool exact = exact_pairs[row + source];
      const std::string status = exact
          ? "exact_tile"
          : (traversal_complete ? "excluded" : "unresolved");
      const std::size_t begin = source;
      while (source < transmitter_population &&
             exact_pairs[row + source] == exact) {
        ++source;
      }
      const std::uint64_t count =
          static_cast<std::uint64_t>(source - begin);
      memberships.push_back({
          .status = status,
          .receiver_begin = receiver,
          .receiver_end = receiver + 1U,
          .transmitter_begin = begin,
          .transmitter_end = source,
          .logical_ordered_pairs = count,
      });
      if (exact) {
        checked_add(exact_count, count);
        exact_tiles.push_back({
            .tile_id = traversal_id + "/exact/" +
                std::to_string(exact_tile_index++),
            .receiver_begin = receiver,
            .receiver_end = receiver + 1U,
            .transmitter_begin = begin,
            .transmitter_end = source,
            .logical_ordered_pairs = count,
        });
      }
    }
  }
  return exact_count;
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
  const bool exact_shared_endpoint =
      request.emission.upper == request.reception.lower;
  if (!exact_shared_endpoint && emission.upper() > reception.lower()) {
    throw std::invalid_argument(
        "emission traversal cannot extend beyond earliest reception: " +
        request.emission.upper + " > " + request.reception.lower);
  }
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  if (field_speed.lower() <= 0.0) {
    throw std::invalid_argument("field speed must be strictly positive");
  }
  validate_members(request.receivers, reception, emission, true);
  validate_members(request.sources, reception, emission, false);

  const std::uint64_t logical_pairs = checked_pair_count(
      request.receivers.size(), request.sources.size());
  if (checked_pair_tracking_bytes(logical_pairs) >
      request.maximum_pair_tracking_bytes) {
    return CertifiedTraversalCertificate{
        .schema = "eom_certified_recursive_causal_index/v1",
        .traversal_id = request.traversal_id,
        .status = "uncertified",
        .failure_code = "resource_envelope_exceeded",
        .logical_ordered_pairs = logical_pairs,
        .excluded_pairs = 0,
        .exact_fallback_pairs = 0,
        .enclosed_pairs = 0,
        .unresolved_pairs = logical_pairs,
        .visited_nodes = 0,
        .coverage_disjoint_complete = true,
        .nodes = {},
        .exact_tiles = {},
        .membership_tiles = {{
            .status = "unresolved",
            .receiver_begin = 0,
            .receiver_end = request.receivers.size(),
            .transmitter_begin = 0,
            .transmitter_end = request.sources.size(),
            .logical_ordered_pairs = logical_pairs,
        }},
    };
  }
  CertifiedTraversalCertificate result{
      .schema = "eom_certified_recursive_causal_index/v1",
      .traversal_id = request.traversal_id,
      .status = "uncertified",
      .failure_code = "resource_envelope_exceeded",
      .logical_ordered_pairs = logical_pairs,
      .excluded_pairs = 0,
      .exact_fallback_pairs = 0,
      .enclosed_pairs = 0,
      .unresolved_pairs = logical_pairs,
      .visited_nodes = 0,
      .coverage_disjoint_complete = false,
      .nodes = {},
      .exact_tiles = {},
      .membership_tiles = {},
  };
  std::vector<bool> exact_pairs(
      static_cast<std::size_t>(logical_pairs), false);
  std::vector<PendingNode> pending{{
      .node_id = "root",
      .receiver_begin = 0,
      .receiver_end = request.receivers.size(),
      .transmitter_begin = 0,
      .transmitter_end = request.sources.size(),
      .emission = emission,
      .emission_depth = 0,
  }};
  bool resource_failed = false;
  while (!pending.empty()) {
    PendingNode node = std::move(pending.back());
    pending.pop_back();
    ++result.visited_nodes;
    const std::size_t receiver_count =
        node.receiver_end - node.receiver_begin;
    const std::size_t transmitter_count = node.transmitter_end - node.transmitter_begin;
    const std::uint64_t pair_count =
        checked_pair_count(receiver_count, transmitter_count);
    const Interval residual =
        node_residual(request, node, reception, node.emission, field_speed);
    if (residual.excludes_zero()) {
      result.nodes.push_back({
          .node_id = node.node_id,
          .status = "excluded",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .transmitter_begin = node.transmitter_begin,
          .transmitter_end = node.transmitter_end,
          .emission_lower = node.emission.lower(),
          .emission_upper = node.emission.upper(),
          .logical_ordered_pairs = pair_count,
          .residual = residual,
      });
      continue;
    }
    const bool membership_leaf =
        pair_count <= request.exact_tile_pair_limit ||
        (receiver_count == 1U && transmitter_count == 1U);
    const bool can_split_emission = membership_leaf &&
        node.emission_depth < request.maximum_emission_depth &&
        node.emission.lower() < node.emission.upper();
    const bool make_exact = membership_leaf && !can_split_emission;
    if (make_exact) {
      mark_exact_pairs(
          exact_pairs, request.sources.size(), node);
      result.nodes.push_back({
          .node_id = node.node_id,
          .status = "exact_tile",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .transmitter_begin = node.transmitter_begin,
          .transmitter_end = node.transmitter_end,
          .emission_lower = node.emission.lower(),
          .emission_upper = node.emission.upper(),
          .logical_ordered_pairs = pair_count,
          .residual = residual,
      });
      continue;
    }

    if (result.visited_nodes >= request.maximum_nodes) {
      result.nodes.push_back({
          .node_id = node.node_id,
          .status = "unresolved",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .transmitter_begin = node.transmitter_begin,
          .transmitter_end = node.transmitter_end,
          .emission_lower = node.emission.lower(),
          .emission_upper = node.emission.upper(),
          .logical_ordered_pairs = pair_count,
          .residual = residual,
      });
      resource_failed = true;
      break;
    }

    result.nodes.push_back({
        .node_id = node.node_id,
        .status = "subdivide",
        .receiver_begin = node.receiver_begin,
        .receiver_end = node.receiver_end,
        .transmitter_begin = node.transmitter_begin,
        .transmitter_end = node.transmitter_end,
        .emission_lower = node.emission.lower(),
        .emission_upper = node.emission.upper(),
        .logical_ordered_pairs = pair_count,
        .residual = residual,
    });

    if (can_split_emission) {
      const double midpoint = node.emission.midpoint();
      pending.push_back({
          .node_id = node.node_id + "/t1",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .transmitter_begin = node.transmitter_begin,
          .transmitter_end = node.transmitter_end,
          .emission = Interval(midpoint, node.emission.upper()),
          .emission_depth = node.emission_depth + 1U,
      });
      pending.push_back({
          .node_id = node.node_id + "/t0",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .transmitter_begin = node.transmitter_begin,
          .transmitter_end = node.transmitter_end,
          .emission = Interval(node.emission.lower(), midpoint),
          .emission_depth = node.emission_depth + 1U,
      });
    } else if (transmitter_count >= receiver_count && transmitter_count > 1U) {
      const std::size_t midpoint =
          node.transmitter_begin + transmitter_count / 2U;
      pending.push_back({
          .node_id = node.node_id + "/s1",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .transmitter_begin = midpoint,
          .transmitter_end = node.transmitter_end,
          .emission = node.emission,
          .emission_depth = node.emission_depth,
      });
      pending.push_back({
          .node_id = node.node_id + "/s0",
          .receiver_begin = node.receiver_begin,
          .receiver_end = node.receiver_end,
          .transmitter_begin = node.transmitter_begin,
          .transmitter_end = midpoint,
          .emission = node.emission,
          .emission_depth = node.emission_depth,
      });
    } else {
      const std::size_t midpoint =
          node.receiver_begin + receiver_count / 2U;
      pending.push_back({
          .node_id = node.node_id + "/r1",
          .receiver_begin = midpoint,
          .receiver_end = node.receiver_end,
          .transmitter_begin = node.transmitter_begin,
          .transmitter_end = node.transmitter_end,
          .emission = node.emission,
          .emission_depth = node.emission_depth,
      });
      pending.push_back({
          .node_id = node.node_id + "/r0",
          .receiver_begin = node.receiver_begin,
          .receiver_end = midpoint,
          .transmitter_begin = node.transmitter_begin,
          .transmitter_end = node.transmitter_end,
          .emission = node.emission,
          .emission_depth = node.emission_depth,
      });
    }
  }
  result.exact_fallback_pairs = build_membership_tiles(
      exact_pairs, request.receivers.size(), request.sources.size(),
      !resource_failed, result.membership_tiles, result.exact_tiles,
      request.traversal_id);
  result.enclosed_pairs = 0;
  const bool exact_resource_failed =
      result.exact_fallback_pairs > request.maximum_exact_pairs;
  if (exact_resource_failed) {
    for (auto& membership : result.membership_tiles) {
      if (membership.status == "exact_tile") {
        membership.status = "unresolved";
      }
    }
    result.unresolved_pairs = result.exact_fallback_pairs;
    result.exact_fallback_pairs = 0;
    result.exact_tiles.clear();
    if (resource_failed) {
      result.unresolved_pairs = logical_pairs;
      result.excluded_pairs = 0;
    } else {
      result.excluded_pairs = logical_pairs - result.unresolved_pairs;
    }
  } else if (resource_failed) {
    result.excluded_pairs = 0;
    result.unresolved_pairs = logical_pairs - result.exact_fallback_pairs;
  } else {
    result.excluded_pairs = logical_pairs - result.exact_fallback_pairs;
    result.unresolved_pairs = 0;
  }
  const bool accounting_complete =
      result.excluded_pairs + result.exact_fallback_pairs +
          result.enclosed_pairs + result.unresolved_pairs == logical_pairs;
  result.coverage_disjoint_complete = accounting_complete;
  result.status = accounting_complete && result.unresolved_pairs == 0
      ? "certified_complete"
      : "uncertified";
  result.failure_code = result.status == "certified_complete"
      ? ""
      : (resource_failed || exact_resource_failed
             ? "resource_envelope_exceeded"
                         : "pair_coverage_incomplete");
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
      .schema = "eom_certified_traversal_exact_pair_batch/v1",
      .traversal_id = traversal.traversal_id,
      .status = "uncertified",
      .failure_code = "traversal_not_certified",
      .logical_ordered_pairs = certificate.logical_ordered_pairs,
      .excluded_pairs = certificate.excluded_pairs,
      .exact_pairs_requested = certificate.exact_fallback_pairs,
      .exact_pairs_completed = 0,
      .enclosed_pairs = certificate.enclosed_pairs,
      .unresolved_pairs = certificate.unresolved_pairs,
      .coverage_disjoint_complete = false,
      .exact_pair_certificates = {},
  };
  if (certificate.traversal_id != traversal.traversal_id ||
      certificate.status != "certified_complete" ||
      !certificate.coverage_disjoint_complete ||
      certificate.unresolved_pairs != 0U) {
    result.excluded_pairs = 0;
    result.exact_pairs_requested = 0;
    result.enclosed_pairs = 0;
    result.unresolved_pairs = result.logical_ordered_pairs;
    result.coverage_disjoint_complete = true;
    return result;
  }
  if (certificate.exact_fallback_pairs > request.maximum_exact_pairs ||
      certificate.exact_fallback_pairs >
          static_cast<std::uint64_t>(
              std::numeric_limits<std::size_t>::max())) {
    result.failure_code = "resource_envelope_exceeded";
    result.unresolved_pairs = result.exact_pairs_requested;
    result.coverage_disjoint_complete =
        result.excluded_pairs + result.unresolved_pairs ==
        result.logical_ordered_pairs;
    return result;
  }
  if (request.warm_starts != nullptr &&
      request.warm_starts->size() !=
          traversal.receivers.size() * traversal.sources.size()) {
    throw std::invalid_argument(
        "traversal exact batch warm-start domain is incomplete");
  }
  const Interval traversal_emission = token_bounds(traversal.emission);
  const Interval exact_search = token_bounds({
      .lower = request.search_lower,
      .upper = request.search_upper,
  });
  if (exact_search.lower() > traversal_emission.lower() ||
      exact_search.upper() < traversal_emission.upper()) {
    throw std::invalid_argument(
        "exact fallback must cover the complete traversal emission interval");
  }
  std::vector<ExactPairRequest> exact_requests;
  exact_requests.reserve(
      static_cast<std::size_t>(certificate.exact_fallback_pairs));
  const auto joint_root_point_state = [&](const std::string& row_id)
      -> const JointRootBracketRequest* {
    if (request.joint_root_point_states == nullptr) return nullptr;
    const auto found = request.joint_root_point_states->find(row_id);
    return found == request.joint_root_point_states->end()
        ? nullptr
        : &found->second;
  };
  const auto joint_history = [&](const std::string& path_id)
      -> const JointAffineRetainedHistory* {
    if (request.joint_histories == nullptr) return nullptr;
    const auto found = request.joint_histories->find(path_id);
    return found == request.joint_histories->end() ? nullptr : &found->second;
  };
  for (const auto& tile : certificate.exact_tiles) {
    for (std::size_t receiver_index = tile.receiver_begin;
         receiver_index < tile.receiver_end; ++receiver_index) {
      for (std::size_t transmitter_index = tile.transmitter_begin;
           transmitter_index < tile.transmitter_end; ++transmitter_index) {
        const auto& receiver = traversal.receivers[receiver_index];
        const auto& source = traversal.sources[transmitter_index];
        const std::size_t logical_index =
            receiver_index * traversal.sources.size() + transmitter_index;
        const std::string joint_row_id =
            receiver.path_id + "/" + source.path_id + "/" +
            request.reception_time;
        exact_requests.push_back({
            .row_id = traversal.traversal_id + "/" + receiver.path_id + "/" +
                source.path_id,
            .receiver = receiver.history,
            .source = source.history,
            .receiver_path_id = receiver.path_id,
            .source_path_id = source.path_id,
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
            .defer_precision_escalation =
                request.defer_precision_escalation,
            .warm_start = request.warm_starts == nullptr
                ? nullptr
                : &(*request.warm_starts)[logical_index],
            .joint_root_point_state =
                joint_root_point_state(joint_row_id),
            .joint_receiver_history = joint_history(receiver.path_id),
            .joint_transmitter_history = joint_history(source.path_id),
        });
      }
    }
  }
  result.exact_pair_certificates =
      certify_exact_pair_batch(exact_requests, request.thread_count);
  for (const auto& exact : result.exact_pair_certificates) {
    if (!exact_certificate_complete(exact)) {
      ++result.unresolved_pairs;
      if (result.failure_code == "traversal_not_certified") {
        result.failure_code = exact.failure_code.empty()
            ? "root_completeness_not_certified"
            : exact.failure_code;
      }
      continue;
    }
    ++result.exact_pairs_completed;
  }
  result.coverage_disjoint_complete =
      result.excluded_pairs + result.exact_pairs_completed +
          result.enclosed_pairs + result.unresolved_pairs ==
      result.logical_ordered_pairs;
  result.status = result.coverage_disjoint_complete &&
          result.unresolved_pairs == 0U
      ? "certified_complete"
      : "uncertified";
  result.failure_code = result.coverage_disjoint_complete
      ? ""
      : "pair_coverage_incomplete";
  return result;
}

}  // namespace architrino::eom
