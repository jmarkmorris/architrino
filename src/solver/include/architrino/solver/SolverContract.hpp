#pragma once

#include "architrino/solver/SolverTypes.hpp"

namespace architrino::solver {

ValidationReport validate_model_contract(const ModelContract& model);
ValidationReport validate_error_budget(const ErrorBudget& budget);
ValidationReport validate_simulation_envelope(const SimulationEnvelope& envelope);

AdmissionReport admit_simulation_envelope(const ModelContract& model,
                                          const ErrorBudget& budget,
                                          const SimulationEnvelope& envelope,
                                          const SolverCapabilityEnvelope& capability);

}  // namespace architrino::solver
