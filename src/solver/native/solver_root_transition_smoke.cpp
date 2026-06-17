#include "architrino/solver/CausalRootSolver.hpp"
#include "architrino/solver/RootLedger.hpp"
#include "architrino/solver/RootLedgerTransition.hpp"

#include <algorithm>
#include <iostream>
#include <vector>

namespace {

architrino::solver::CausalRootRequest make_request(double hitTime = 10.0) {
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
          1e-13,
      },
      architrino::solver::LinearPathSegment{
          "receiver",
          0.0,
          10.0,
          architrino::solver::Vector3{10.0, 0.0, 0.0},
          architrino::solver::Vector3{0.0, 0.0, 0.0},
          architrino::solver::NumericType::F64,
          1e-13,
      },
      hitTime,
      1.0,
      1e-13,
      128,
      64,
  };
}

bool has_transition(const architrino::solver::RootLedgerTransitionReport& report,
                    architrino::solver::RootLedgerTransitionKind kind) {
  const std::uint32_t encoded = static_cast<std::uint32_t>(kind);
  return std::any_of(report.transitions.begin(),
                     report.transitions.end(),
                     [encoded](const architrino::solver::RootLedgerTransitionRow& row) {
                       return row.transitionKind == encoded;
                     });
}

}  // namespace

int main() {
  const architrino::solver::CausalRootRequest request = make_request();
  const architrino::solver::CausalRootResult roots =
      architrino::solver::solve_causal_roots(request);
  const std::vector<architrino::solver::RootLedgerDetailRowF64> ledger =
      architrino::solver::build_root_ledger_detail(request, roots);

  architrino::solver::CausalRootRequest noRootRequest = request;
  noRootRequest.source.startTime = 6.0;
  noRootRequest.source.endTime = 10.0;
  const architrino::solver::CausalRootResult noRoots =
      architrino::solver::solve_causal_roots(noRootRequest);
  const std::vector<architrino::solver::RootLedgerDetailRowF64> noRootLedger =
      architrino::solver::build_root_ledger_detail(noRootRequest, noRoots);

  architrino::solver::CausalRootRequest invalidRequest = make_request(11.0);
  const architrino::solver::CausalRootResult invalidRoots =
      architrino::solver::solve_causal_roots(invalidRequest);
  const std::vector<architrino::solver::RootLedgerDetailRowF64> failureLedger =
      architrino::solver::build_root_ledger_detail(invalidRequest, invalidRoots);

  std::vector<architrino::solver::RootLedgerDetailRowF64> foldedPrior = ledger;
  foldedPrior[0].jacobianSignStratum =
      static_cast<std::uint32_t>(architrino::solver::RootLedgerJacobianSignStratum::Negative);

  std::vector<architrino::solver::RootLedgerDetailRowF64> tailPrior = ledger;
  tailPrior[0].entryKind =
      static_cast<std::uint32_t>(architrino::solver::RootLedgerEntryKind::TailBoundary);
  tailPrior[0].rootKey = 0;

  const auto retained =
      architrino::solver::classify_root_ledger_transitions(ledger, ledger);
  const auto appeared =
      architrino::solver::classify_root_ledger_transitions(noRootLedger, ledger);
  const auto disappeared =
      architrino::solver::classify_root_ledger_transitions(ledger, noRootLedger);
  const auto folded =
      architrino::solver::classify_root_ledger_transitions(foldedPrior, ledger);
  const auto assimilated =
      architrino::solver::classify_root_ledger_transitions(tailPrior, ledger);
  const auto rerun =
      architrino::solver::classify_root_ledger_transitions(ledger, failureLedger);

  const bool ok =
      roots.validation.ok &&
      noRoots.validation.ok &&
      !invalidRoots.validation.ok &&
      retained.validation.ok &&
      appeared.validation.ok &&
      disappeared.validation.ok &&
      folded.validation.ok &&
      assimilated.validation.ok &&
      !rerun.validation.ok &&
      has_transition(retained, architrino::solver::RootLedgerTransitionKind::Retained) &&
      has_transition(appeared, architrino::solver::RootLedgerTransitionKind::Appeared) &&
      has_transition(disappeared, architrino::solver::RootLedgerTransitionKind::Disappeared) &&
      has_transition(folded, architrino::solver::RootLedgerTransitionKind::Folded) &&
      has_transition(assimilated,
                     architrino::solver::RootLedgerTransitionKind::AssimilatedFromTail) &&
      has_transition(rerun,
                     architrino::solver::RootLedgerTransitionKind::LedgerRerunRequired);

  if (!ok) {
    std::cerr << "solver root-transition smoke failed\n";
    return 1;
  }

  std::cout << "solver root-transition=ok retained=" << retained.transitions.size()
            << " appeared=" << appeared.transitions.size()
            << " rerun=" << rerun.transitions.size() << '\n';
  return 0;
}
