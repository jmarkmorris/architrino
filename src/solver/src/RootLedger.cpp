#include "architrino/solver/RootLedger.hpp"

#include <algorithm>
#include <cmath>
#include <limits>
#include <tuple>

static_assert(sizeof(architrino::solver::RootLedgerDetailRowF64) == 192);

namespace architrino::solver {
namespace {

constexpr std::uint64_t kFnvOffsetBasis = 14695981039346656037ULL;
constexpr std::uint64_t kFnvPrime = 1099511628211ULL;

std::uint64_t fnv_append(std::uint64_t hash, std::string_view value) {
  for (const char ch : value) {
    hash ^= static_cast<unsigned char>(ch);
    hash *= kFnvPrime;
  }
  return hash;
}

std::uint64_t fnv_append_u64(std::uint64_t hash, std::uint64_t value) {
  for (int index = 0; index < 8; ++index) {
    hash ^= static_cast<unsigned char>((value >> (index * 8)) & 0xffU);
    hash *= kFnvPrime;
  }
  return hash;
}

std::uint64_t make_row_key(const CausalRootRequest& request,
                           RootLedgerEntryKind entryKind,
                           std::uint32_t sequenceIndex,
                           std::uint64_t rootKey) {
  std::uint64_t hash = kFnvOffsetBasis;
  hash = fnv_append(hash, request.sourceId);
  hash = fnv_append(hash, "->");
  hash = fnv_append(hash, request.receiverId);
  hash = fnv_append_u64(hash, static_cast<std::uint64_t>(entryKind));
  hash = fnv_append_u64(hash, sequenceIndex);
  hash = fnv_append_u64(hash, rootKey);
  return hash;
}

std::uint64_t make_root_key(const CausalRootRequest& request, const CausalRoot& root) {
  std::uint64_t hash = kFnvOffsetBasis;
  hash = fnv_append(hash, request.sourceId);
  hash = fnv_append(hash, "->");
  hash = fnv_append(hash, request.receiverId);
  hash = fnv_append(hash, "#");
  hash = fnv_append_u64(hash, static_cast<std::uint64_t>(root.rootId));
  hash = fnv_append(hash, root.rootKind);
  return hash;
}

double finite_or_zero(double value) {
  return std::isfinite(value) ? value : 0.0;
}

RootLedgerRootKind root_kind_for(const CausalRootRequest& request, const CausalRoot* root) {
  if (root != nullptr && root->rootKind == "self") {
    return RootLedgerRootKind::Self;
  }
  if (request.sourceId == request.receiverId) {
    return RootLedgerRootKind::Self;
  }
  if (root != nullptr && root->rootKind == "partner") {
    return RootLedgerRootKind::Partner;
  }
  return RootLedgerRootKind::Unknown;
}

RootLedgerJacobianSignStratum jacobian_stratum(double jacobian, double tolerance) {
  if (!std::isfinite(jacobian)) {
    return RootLedgerJacobianSignStratum::NonFinite;
  }
  if (std::abs(jacobian) <= tolerance) {
    return RootLedgerJacobianSignStratum::NearZero;
  }
  return jacobian < 0.0 ? RootLedgerJacobianSignStratum::Negative
                        : RootLedgerJacobianSignStratum::Positive;
}

std::uint32_t status_code_u32(StatusCode code) {
  return static_cast<std::uint32_t>(code);
}

StatusCode first_non_ok_status(const ValidationReport& validation) {
  for (const StatusRecord& status : validation.statuses) {
    if (status.code != StatusCode::Ok) {
      return status.code;
    }
  }
  return StatusCode::Ok;
}

std::uint32_t state_flags_for(StatusCode statusCode, bool firstFailure) {
  std::uint32_t flags = firstFailure ? kRootLedgerFirstFailureFlag : 0U;
  if (statusCode == StatusCode::RootUnresolved) {
    flags |= kRootLedgerUnresolvedFlag;
  }
  if (statusCode == StatusCode::SmallJacobian ||
      statusCode == StatusCode::TransversalityFloorFailed) {
    flags |= kRootLedgerSmallJacobianFlag;
  }
  return flags;
}

std::pair<double, double> ordered_interval(double start, double end) {
  start = finite_or_zero(start);
  end = finite_or_zero(end);
  if (end < start) {
    std::swap(start, end);
  }
  return {start, end};
}

RootLedgerDetailRowF64 make_empty_row(const CausalRootRequest& request,
                                      RootLedgerEntryKind entryKind,
                                      std::uint32_t sequenceIndex,
                                      StatusCode statusCode,
                                      double intervalStart,
                                      double intervalEnd,
                                      bool firstFailure = false) {
  const auto [orderedStart, orderedEnd] = ordered_interval(intervalStart, intervalEnd);
  return RootLedgerDetailRowF64{
      make_row_key(request, entryKind, sequenceIndex, 0),
      stable_root_ledger_key(request.sourceId),
      stable_root_ledger_key(request.receiverId),
      0,
      orderedStart,
      orderedEnd,
      0.0,
      finite_or_zero(request.hitTime),
      0.0,
      0.0,
      0.0,
      0.0,
      orderedStart,
      orderedEnd,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      static_cast<std::uint32_t>(entryKind),
      static_cast<std::uint32_t>(root_kind_for(request, nullptr)),
      status_code_u32(statusCode),
      static_cast<std::uint32_t>(RootLedgerJacobianSignStratum::Unknown),
      sequenceIndex,
      0,
      state_flags_for(statusCode, firstFailure),
      0,
  };
}

RootLedgerDetailRowF64 make_active_root_row(const CausalRootRequest& request,
                                            const CausalRoot& root,
                                            std::uint32_t sequenceIndex,
                                            bool firstFailure) {
  const auto [bracketStart, bracketEnd] = ordered_interval(root.bracketStart, root.bracketEnd);
  const std::uint64_t rootKey = make_root_key(request, root);
  return RootLedgerDetailRowF64{
      make_row_key(request, RootLedgerEntryKind::ActiveRoot, sequenceIndex, rootKey),
      stable_root_ledger_key(request.sourceId),
      stable_root_ledger_key(request.receiverId),
      rootKey,
      bracketStart,
      bracketEnd,
      finite_or_zero(root.emissionTime),
      finite_or_zero(root.hitTime),
      finite_or_zero(root.delay),
      finite_or_zero(root.residual),
      finite_or_zero(root.jacobian),
      finite_or_zero(root.branchWeight),
      bracketStart,
      bracketEnd,
      finite_or_zero(root.sourcePoint.x),
      finite_or_zero(root.sourcePoint.y),
      finite_or_zero(root.sourcePoint.z),
      finite_or_zero(root.receiverPoint.x),
      finite_or_zero(root.receiverPoint.y),
      finite_or_zero(root.receiverPoint.z),
      static_cast<std::uint32_t>(RootLedgerEntryKind::ActiveRoot),
      static_cast<std::uint32_t>(root_kind_for(request, &root)),
      status_code_u32(root.statusCode),
      static_cast<std::uint32_t>(jacobian_stratum(root.jacobian, request.rootTolerance)),
      sequenceIndex,
      static_cast<std::uint32_t>(std::max(0, root.iterations)),
      state_flags_for(root.statusCode, firstFailure),
      0,
  };
}

bool interval_has_width(double start, double end, double tolerance) {
  return std::isfinite(start) && std::isfinite(end) && end > start + tolerance;
}

}  // namespace

std::uint64_t stable_root_ledger_key(std::string_view value) {
  return fnv_append(kFnvOffsetBasis, value);
}

std::vector<RootLedgerDetailRowF64> build_root_ledger_detail(
    const CausalRootRequest& request,
    const CausalRootResult& result) {
  std::vector<RootLedgerDetailRowF64> rows;
  const auto [searchStart, searchEnd] =
      ordered_interval(request.source.startTime, std::min(request.source.endTime, request.hitTime));
  const double tolerance = std::isfinite(request.rootTolerance) && request.rootTolerance > 0.0
                               ? request.rootTolerance
                               : 0.0;
  std::uint32_t sequenceIndex = 0;

  if (!result.validation.ok) {
    rows.push_back(make_empty_row(request,
                                  RootLedgerEntryKind::Failure,
                                  sequenceIndex++,
                                  first_non_ok_status(result.validation),
                                  searchStart,
                                  searchEnd,
                                  true));
  }

  std::vector<CausalRoot> roots = result.roots;
  std::stable_sort(roots.begin(), roots.end(), [](const CausalRoot& left, const CausalRoot& right) {
    return std::tie(left.emissionTime, left.rootId) < std::tie(right.emissionTime, right.rootId);
  });

  bool firstFailureAssigned = !rows.empty();
  for (const CausalRoot& root : roots) {
    const bool rootFailed = root.statusCode != StatusCode::Ok;
    const bool firstFailure = rootFailed && !firstFailureAssigned;
    rows.push_back(make_active_root_row(request, root, sequenceIndex++, firstFailure));
    if (firstFailure) {
      firstFailureAssigned = true;
    }
  }

  double cursor = searchStart;
  for (const CausalRoot& root : roots) {
    const auto [bracketStart, bracketEnd] = ordered_interval(root.bracketStart, root.bracketEnd);
    if (interval_has_width(cursor, bracketStart, tolerance)) {
      rows.push_back(make_empty_row(request,
                                    RootLedgerEntryKind::InactiveGap,
                                    sequenceIndex++,
                                    StatusCode::RootNotBracketed,
                                    cursor,
                                    bracketStart));
    }
    cursor = std::max(cursor, bracketEnd);
  }
  if (interval_has_width(cursor, searchEnd, tolerance)) {
    rows.push_back(make_empty_row(request,
                                  RootLedgerEntryKind::InactiveGap,
                                  sequenceIndex++,
                                  StatusCode::RootNotBracketed,
                                  cursor,
                                  searchEnd));
  }

  if (rows.empty()) {
    const StatusCode code = first_non_ok_status(result.validation);
    rows.push_back(make_empty_row(request,
                                  RootLedgerEntryKind::InactiveGap,
                                  sequenceIndex,
                                  code == StatusCode::Ok ? StatusCode::RootNotBracketed : code,
                                  searchStart,
                                  searchEnd));
  }

  std::stable_sort(rows.begin(), rows.end(), [](const RootLedgerDetailRowF64& left,
                                                const RootLedgerDetailRowF64& right) {
    return std::tie(left.sequenceIndex, left.entryKind, left.ledgerKey) <
           std::tie(right.sequenceIndex, right.entryKind, right.ledgerKey);
  });
  return rows;
}

}  // namespace architrino::solver
