#pragma once

#include "architrino/eom/BlockExclusion.hpp"
#include "architrino/eom/ExactPairBatch.hpp"

#include <cstddef>
#include <cstdint>
#include <string>
#include <vector>

namespace architrino::eom {

struct MovingHistoryMember {
  std::string path_id;
  const RetainedHistory* history;
};

struct CertifiedTraversalRequest {
  std::string traversal_id;
  std::vector<MovingHistoryMember> receivers;
  std::vector<MovingHistoryMember> sources;
  TimeIntervalTokens reception;
  TimeIntervalTokens emission;
  std::string field_speed;
  std::uint64_t exact_tile_pair_limit = 4096;
  std::size_t maximum_nodes = 1000000;
};

struct CertifiedTraversalNode {
  std::string node_id;
  std::string status;
  std::size_t receiver_begin;
  std::size_t receiver_end;
  std::size_t source_begin;
  std::size_t source_end;
  std::uint64_t logical_ordered_pairs;
  Interval residual;
};

struct CertifiedExactTile {
  std::string tile_id;
  std::size_t receiver_begin;
  std::size_t receiver_end;
  std::size_t source_begin;
  std::size_t source_end;
  std::uint64_t logical_ordered_pairs;
};

struct CertifiedTraversalCertificate {
  std::string schema;
  std::string traversal_id;
  std::string status;
  std::string failure_code;
  std::uint64_t logical_ordered_pairs;
  std::uint64_t excluded_pairs;
  std::uint64_t exact_fallback_pairs;
  std::size_t visited_nodes;
  bool coverage_disjoint_complete;
  std::vector<CertifiedTraversalNode> nodes;
  std::vector<CertifiedExactTile> exact_tiles;
};

struct CertifiedTraversalExactBatchRequest {
  const CertifiedTraversalRequest* traversal_request;
  const CertifiedTraversalCertificate* traversal_certificate;
  std::string reception_time;
  std::string search_lower;
  std::string search_upper;
  std::string root_tolerance = "1e-12";
  std::size_t root_max_depth = 256;
  std::size_t root_max_cells = 500000;
  unsigned initial_mpfr_bits = 128;
  unsigned maximum_mpfr_bits = 512;
  std::uint64_t maximum_exact_pairs = 10000000;
  std::size_t thread_count = 1;
};

struct CertifiedTraversalExactBatchCertificate {
  std::string schema;
  std::string traversal_id;
  std::string status;
  std::string failure_code;
  std::uint64_t logical_ordered_pairs;
  std::uint64_t excluded_pairs;
  std::uint64_t exact_pairs_requested;
  std::uint64_t exact_pairs_completed;
  bool coverage_disjoint_complete;
  std::vector<ExactPairCertificate> exact_pair_certificates;
};

[[nodiscard]] CertifiedTraversalCertificate certify_moving_history_traversal(
    const CertifiedTraversalRequest& request);

[[nodiscard]] CertifiedTraversalExactBatchCertificate
certify_traversal_exact_pair_batch(
    const CertifiedTraversalExactBatchRequest& request);

}  // namespace architrino::eom
