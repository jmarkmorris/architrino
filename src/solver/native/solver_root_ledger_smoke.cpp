#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/RootLedger.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <cmath>
#include <iostream>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-10) {
  return std::abs(left - right) <= tolerance;
}

architrino::solver::CausalRootRequest make_request() {
  return architrino::solver::CausalRootRequest{
      "receiver",
      "source",
      architrino::solver::LinearPathSegment{
          "source",
          0.0,
          10.0,
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          0.0,
      },
      architrino::solver::LinearPathSegment{
          "receiver",
          0.0,
          10.0,
          architrino::solver::Vector3{10.0, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          0.0,
      },
      10.0,
      1.0,
      1e-13,
      128,
      64,
  };
}

ArchitrinoSolverCausalRootRequestF64 make_c_request(double hitTime = 10.0) {
  return ArchitrinoSolverCausalRootRequestF64{
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          10.0,
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          0.0,
      },
      ArchitrinoSolverLinearPathSegmentF64{
          0.0,
          10.0,
          ArchitrinoSolverVector3F64{10.0, 0.0, 0.0},
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          0.0,
      },
      hitTime,
      1.0,
      1e-13,
      128,
      64,
  };
}

}  // namespace

int main() {
  static_assert(sizeof(architrino::solver::RootLedgerDetailRowF64) == 192);

  const architrino::solver::CausalRootRequest request = make_request();
  const architrino::solver::CausalRootResult roots =
      architrino::solver::solve_causal_roots(request);
  const std::vector<architrino::solver::RootLedgerDetailRowF64> ledger =
      architrino::solver::build_root_ledger_detail(request, roots);
  const architrino::solver::BinaryLayoutDescriptor layout =
      architrino::solver::binary_layout_descriptor(
          architrino::solver::BinaryLayoutId::RootLedgerDetailV1);

  architrino::solver::CausalRootRequest noRootRequest = request;
  noRootRequest.source.startTime = 6.0;
  noRootRequest.source.endTime = 10.0;
  const architrino::solver::CausalRootResult noRoots =
      architrino::solver::solve_causal_roots(noRootRequest);
  const std::vector<architrino::solver::RootLedgerDetailRowF64> noRootLedger =
      architrino::solver::build_root_ledger_detail(noRootRequest, noRoots);

  architrino::solver::CausalRootRequest invalidRequest = request;
  invalidRequest.hitTime = 11.0;
  const architrino::solver::CausalRootResult invalidRoots =
      architrino::solver::solve_causal_roots(invalidRequest);
  const std::vector<architrino::solver::RootLedgerDetailRowF64> failureLedger =
      architrino::solver::build_root_ledger_detail(invalidRequest, invalidRoots);
  ArchitrinoSolverRootLedgerDetailRowF64 abiRows[8]{};
  int abiRowCount = 0;
  ArchitrinoSolverCausalRootRequestF64 cRequest = make_c_request();
  const int abiStatus =
      architrino_solver_build_root_ledger_detail_f64(&cRequest, abiRows, 8, &abiRowCount);
  ArchitrinoSolverRootLedgerDetailRowF64 abiFailureRows[8]{};
  int abiFailureRowCount = 0;
  ArchitrinoSolverCausalRootRequestF64 cInvalidRequest = make_c_request(11.0);
  const int abiFailureStatus =
      architrino_solver_build_root_ledger_detail_f64(
          &cInvalidRequest,
          abiFailureRows,
          8,
          &abiFailureRowCount);
  const ArchitrinoSolverAbiInfo abiInfo = architrino_solver_abi_info();

  const bool ok =
      layout.name == "root_ledger_detail.v1" &&
      layout.rowSizeBytes == sizeof(architrino::solver::RootLedgerDetailRowF64) &&
      roots.validation.ok &&
      !ledger.empty() &&
      ledger[0].entryKind ==
          static_cast<std::uint32_t>(architrino::solver::RootLedgerEntryKind::ActiveRoot) &&
      ledger[0].rootKind ==
          static_cast<std::uint32_t>(architrino::solver::RootLedgerRootKind::Partner) &&
      ledger[0].jacobianSignStratum ==
          static_cast<std::uint32_t>(architrino::solver::RootLedgerJacobianSignStratum::Positive) &&
      ledger[0].sourceKey == architrino::solver::stable_root_ledger_key("source") &&
      ledger[0].receiverKey == architrino::solver::stable_root_ledger_key("receiver") &&
      ledger[0].rootKey != 0 &&
      nearly_equal(ledger[0].emissionTime, 0.0) &&
      nearly_equal(ledger[0].hitTime, 10.0) &&
      nearly_equal(ledger[0].delay, 10.0) &&
      nearly_equal(ledger[0].jacobian, 1.0) &&
      noRoots.validation.ok &&
      noRootLedger.size() == 1 &&
      noRootLedger[0].entryKind ==
          static_cast<std::uint32_t>(architrino::solver::RootLedgerEntryKind::InactiveGap) &&
      noRootLedger[0].statusCode ==
          static_cast<std::uint32_t>(architrino::solver::StatusCode::RootNotBracketed) &&
      nearly_equal(noRootLedger[0].intervalStart, 6.0) &&
      nearly_equal(noRootLedger[0].intervalEnd, 10.0) &&
      !invalidRoots.validation.ok &&
      !failureLedger.empty() &&
      failureLedger[0].entryKind ==
          static_cast<std::uint32_t>(architrino::solver::RootLedgerEntryKind::Failure) &&
      failureLedger[0].statusCode ==
          static_cast<std::uint32_t>(architrino::solver::StatusCode::InsufficientHistoryDepth) &&
      (failureLedger[0].stateFlags & architrino::solver::kRootLedgerFirstFailureFlag) != 0 &&
      abiInfo.root_ledger_detail_row_f64_bytes == 192 &&
      abiStatus == 0 &&
      abiRowCount == static_cast<int>(ledger.size()) &&
      abiRows[0].entry_kind ==
          static_cast<std::uint32_t>(architrino::solver::RootLedgerEntryKind::ActiveRoot) &&
      abiRows[0].root_key != 0 &&
      nearly_equal(abiRows[0].jacobian, 1.0) &&
      abiFailureStatus == 0 &&
      abiFailureRowCount == static_cast<int>(failureLedger.size()) &&
      abiFailureRows[0].entry_kind ==
          static_cast<std::uint32_t>(architrino::solver::RootLedgerEntryKind::Failure) &&
      abiFailureRows[0].status_code ==
          static_cast<std::uint32_t>(architrino::solver::StatusCode::InsufficientHistoryDepth);

  if (!ok) {
    std::cerr << "solver root-ledger smoke failed\n";
    return 1;
  }

  std::cout << "solver root-ledger=ok rows=" << ledger.size()
            << " no-root=" << noRootLedger.size()
            << " failure=" << failureLedger.size() << '\n';
  return 0;
}
