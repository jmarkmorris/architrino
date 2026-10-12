#pragma once
#include "architrino/eom/CoupledEvolution.hpp"
#include <string>
namespace architrino::eom {
[[nodiscard]] std::string create_provider_checkpoint(
    const NativeCoupledEvolutionRequest&, const NativeCoupledEvolutionCertificate&);
[[nodiscard]] NativeCoupledEvolutionCertificate resume_provider_checkpoint(
    const NativeCoupledEvolutionRequest&, const std::string& checkpoint,
    const std::string& requested_end_time);
// One bounded JSON document per single-shot invocation, or one per line in
// server mode; progress and worker readiness use a separate stderr channel.
[[nodiscard]] std::string execute_eom_v2_request(const std::string&,
    const std::string& checkpoint_file = {},
    std::function<bool()> cancellation = {},
    std::function<void(std::size_t,const std::string&)> progress = {});
int run_eom_v2_cli(int argc, char** argv);
}
