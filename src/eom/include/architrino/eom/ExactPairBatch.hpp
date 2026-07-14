#pragma once

#include "architrino/eom/History.hpp"

#include <cstddef>
#include <string>
#include <vector>

namespace architrino::eom {

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
  std::vector<NativeRootBracket> roots;
};

[[nodiscard]] ExactPairCertificate certify_exact_pair(
    const ExactPairRequest& request);

[[nodiscard]] std::vector<ExactPairCertificate> certify_exact_pair_batch(
    const std::vector<ExactPairRequest>& requests,
    std::size_t thread_count);

}  // namespace architrino::eom
