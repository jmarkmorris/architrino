#pragma once

#include "architrino/eom/EquationProvider.hpp"

namespace architrino::eom {

struct ResolvedEquationModel {
  const std::string canonical_json;
  const std::string digest;
};

// Only built-in registered providers can be selected. Unknown or currently
// unavailable combinations throw EquationAdmissionError before computation.
[[nodiscard]] const EquationProvider& require_equation_provider(
    const NativeCoupledEvolutionRequest& request);
// V7 checkpoints and canonical event maps retain their own admission boundary.
void require_canonical_equation_operation(const NativeCoupledEvolutionRequest&);
[[nodiscard]] ResolvedEquationModel inspect_equation_model(
    const NativeCoupledEvolutionRequest& request);
[[nodiscard]] std::string equation_capabilities_json();
[[nodiscard]] std::string equation_build_identity_json();

}  // namespace architrino::eom
