#include "architrino/solver/SolverSelfTest.hpp"
#include "architrino/solver/SolverCAbi.hpp"

#include <iostream>

int main() {
  const ArchitrinoSolverModelContract model{
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      (1U << 2U) | (1U << 4U) | (1U << 5U),
  };
  const ArchitrinoSolverErrorBudgetF64 budget{
      1e-14,
      1e-14,
      1e-13,
      1e-12,
      1e-12,
      1e-12,
      1e-9,
      1e-6,
  };
  const ArchitrinoSolverSimulationEnvelopeF64 envelope{
      16,
      1,
      128ULL * 1024ULL * 1024ULL,
      512ULL * 1024ULL * 1024ULL,
      0.0,
      10.0,
      0.01,
      0.01,
      1,
      0,
      1,
      1,
      0,
      0,
  };
  ArchitrinoSolverAdmissionReportF64 admission{};
  ArchitrinoSolverStatusRow statuses[4]{};
  int statusCount = 0;
  const int admissionStatus = architrino_solver_admit_simulation_envelope_f64(
      &model,
      &budget,
      &envelope,
      nullptr,
      &admission,
      statuses,
      4,
      &statusCount);
  const bool abiAdmissionOk =
      admissionStatus == 0 &&
      admission.admitted == 1 &&
      admission.validation_ok == 1 &&
      admission.decision == 2 &&
      admission.selected_precision_path == 5 &&
      admission.stress_summary.entity_count == 16 &&
      admission.stress_summary.has_time_step_count_estimate == 1 &&
      admission.stress_summary.dominant_stress == 6 &&
      statusCount == 1 &&
      statuses[0].status_code == 6 &&
      statuses[0].status_severity == 1 &&
      statuses[0].stage == 4;

  std::cout << architrino::solver::solver_contract_smoke_report() << '\n';
  return abiAdmissionOk &&
                 architrino::solver::solver_contract_smoke() &&
                 architrino::solver::causal_root_smoke()
             ? 0
             : 1;
}
