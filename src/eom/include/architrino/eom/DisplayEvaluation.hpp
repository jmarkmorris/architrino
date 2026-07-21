#pragma once

#include "architrino/eom/History.hpp"

#include <array>
#include <cstddef>
#include <string>
#include <utility>
#include <vector>

namespace architrino::eom {

struct DisplayEvaluationPath {
  std::string path_id;
  double charge = 0.0;
  const RetainedHistory* history = nullptr;
};

struct DisplayEvaluationRequest {
  std::vector<DisplayEvaluationPath> paths;
  double reception_time = 0.0;
  double field_speed = 0.0;
  double coupling = 0.0;
  double root_relative_tolerance = 1e-9;
  double source_normal_floor = 0.0;
  double causal_width = 0.0;
  double core_scale = 0.0;
  double far_field_enclosure_fraction = 0.0;
  double acceleration_tolerance = 0.0;
  std::size_t thread_count = 1U;
};

struct DisplayReceiverAcceleration {
  std::string receiver_path_id;
  std::array<double, 3> acceleration{};
};

struct DisplayPairRootCount {
  std::string receiver_path_id;
  std::string source_path_id;
  std::size_t root_count = 0U;
};

struct DisplayEvaluationResult {
  std::string status;
  std::string failure_code;
  std::vector<DisplayReceiverAcceleration> receiver_accelerations;
  std::vector<DisplayPairRootCount> pair_root_counts;
  std::vector<std::pair<std::string, std::string>> regulated_pairs;
  std::size_t root_pair_count = 0U;
  std::size_t root_count = 0U;
  std::size_t far_field_pair_count = 0U;
  double far_field_error_width_total = 0.0;
  double far_field_error_width_max_receiver = 0.0;
  double emission_to_current_source_ratio_max = 0.0;
  double emission_to_current_source_ratio_sum = 0.0;
  std::size_t emission_to_current_source_ratio_sample_count = 0U;
  double root_wall_seconds = 0.0;
  double acceleration_wall_seconds = 0.0;
  double total_wall_seconds = 0.0;
};

// Display evaluation is deliberately not a certificate. It uses binary64
// point arithmetic, an uncertified root search, and a fixed-order regulated
// quadrature. Its result is suitable only for non-evidence display output.
[[nodiscard]] DisplayEvaluationResult evaluate_display_acceleration(
    const DisplayEvaluationRequest& request);

}  // namespace architrino::eom
