#pragma once
#include "architrino/eom/CoupledEvolution.hpp"
namespace architrino::eom {
// Shared exploratory point evolution. No error enclosure or certificate is produced.
[[nodiscard]] NativeCoupledEvolutionCertificate evolve_display_point_histories(
    const NativeCoupledEvolutionRequest& request);
}
