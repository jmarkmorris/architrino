#pragma once

#include "architrino/eom/History.hpp"

#include <cstdint>
#include <string>
#include <vector>

namespace architrino::eom {

struct TimeIntervalTokens {
  std::string lower;
  std::string upper;
};

struct MovingHistoryBlockRequest {
  std::string block_id;
  std::vector<const RetainedHistory*> receivers;
  std::vector<const RetainedHistory*> sources;
  TimeIntervalTokens reception;
  TimeIntervalTokens emission;
  std::string field_speed;
};

struct MovingHistoryBlockCertificate {
  std::string schema;
  std::string block_id;
  std::string status;
  std::string precision_route;
  std::uint64_t logical_ordered_pairs;
  std::uint64_t excluded_pairs;
  std::uint64_t exact_fallback_pairs;
  Interval residual;
  Interval distance;
  Interval delay;
  std::vector<std::string> receiver_history_ids;
  std::vector<std::string> source_history_ids;
};

[[nodiscard]] MovingHistoryBlockCertificate certify_moving_history_block(
    const MovingHistoryBlockRequest& request);

}  // namespace architrino::eom
