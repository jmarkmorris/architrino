#include "architrino/eom/BlockExclusion.hpp"

#include <limits>
#include <optional>
#include <stdexcept>

namespace architrino::eom {
namespace {

Interval token_bounds(const TimeIntervalTokens& tokens) {
  const Interval lower = Interval::decimal_token(tokens.lower);
  const Interval upper = Interval::decimal_token(tokens.upper);
  if (lower.lower() > upper.upper()) {
    throw std::invalid_argument("time interval requires lower <= upper");
  }
  return Interval(lower.lower(), upper.upper());
}

IntervalVector history_group_position_hull(
    const std::vector<const RetainedHistory*>& histories,
    const Interval& time) {
  std::optional<IntervalVector> result;
  for (const auto* history : histories) {
    if (history == nullptr) {
      throw std::invalid_argument("history block contains a null history");
    }
    const auto value = history->position_hull(time);
    result = result.has_value() ? hull(*result, value) : value;
  }
  if (!result.has_value()) {
    throw std::invalid_argument("history block requires at least one history");
  }
  return *result;
}

}  // namespace

MovingHistoryBlockCertificate certify_moving_history_block(
    const MovingHistoryBlockRequest& request) {
  if (request.block_id.empty()) {
    throw std::invalid_argument("moving-history block requires an identity");
  }
  if (request.receivers.empty() || request.sources.empty()) {
    throw std::invalid_argument("moving-history block memberships cannot be empty");
  }
  if (request.receivers.size() >
      std::numeric_limits<std::uint64_t>::max() / request.sources.size()) {
    throw std::overflow_error("moving-history block pair count overflows uint64");
  }

  const Interval reception = token_bounds(request.reception);
  const Interval emission = token_bounds(request.emission);
  if (emission.upper() > reception.lower()) {
    throw std::invalid_argument(
        "emission block cannot extend beyond the earliest reception time");
  }
  const Interval field_speed = Interval::decimal_token(request.field_speed);
  if (field_speed.lower() <= 0.0) {
    throw std::invalid_argument("field speed must be strictly positive");
  }

  const auto receiver_positions =
      history_group_position_hull(request.receivers, reception);
  const auto source_positions =
      history_group_position_hull(request.sources, emission);
  const auto displacement = subtract(receiver_positions, source_positions);
  const Interval distance = norm(displacement);
  const Interval delay = reception - emission;
  const Interval residual = distance - field_speed * delay;
  const std::uint64_t pair_count =
      static_cast<std::uint64_t>(request.receivers.size()) *
      static_cast<std::uint64_t>(request.sources.size());
  const bool excluded = residual.excludes_zero();

  MovingHistoryBlockCertificate certificate{
      .schema = "eom_moving_history_block_certificate/v0",
      .block_id = request.block_id,
      .status = excluded ? "excluded" : "exact_fallback",
      .precision_route = "binary64_outward",
      .logical_ordered_pairs = pair_count,
      .excluded_pairs = excluded ? pair_count : 0,
      .exact_fallback_pairs = excluded ? 0 : pair_count,
      .residual = residual,
      .distance = distance,
      .delay = delay,
      .receiver_history_ids = {},
      .source_history_ids = {},
  };
  certificate.receiver_history_ids.reserve(request.receivers.size());
  for (const auto* history : request.receivers) {
    certificate.receiver_history_ids.push_back(history->history_id());
  }
  certificate.source_history_ids.reserve(request.sources.size());
  for (const auto* history : request.sources) {
    certificate.source_history_ids.push_back(history->history_id());
  }
  return certificate;
}

}  // namespace architrino::eom
