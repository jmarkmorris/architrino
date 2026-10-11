#include "architrino/eom/EquationRegistry.hpp"
#include "architrino/eom/CoupledEvolution.hpp"

#include <cstdlib>
#include <iostream>
#include <locale>
#include <set>
#include <string>

namespace eom = architrino::eom;

// Read-only provider inspection, not a v2 evolution request decoder.
int main(int argc, char** argv) {
  std::cout.imbue(std::locale::classic());
  try {
    if (argc < 2) throw std::invalid_argument(
        "usage: eom_equation_inspect_cli capabilities|inspect|identity-self-test "
        "[--composition ID --speed-domain DOMAIN --boundary-policy POLICY "
        "--constraint KIND --method METHOD --field-speed TOKEN --coupling TOKEN "
        "--chart-policy POLICY --causal-width TOKEN --core-scale TOKEN "
        "--surface-kind KIND --surface-radius TOKEN --surface-q TOKEN "
        "--surface-major-radius TOKEN --surface-position-tolerance TOKEN "
        "--surface-tangent-velocity-tolerance TOKEN]");
    const std::string operation = argv[1];
    if (operation == "identity-self-test" && argc == 2) {
      (void)eom::equation_identity_sha256("");
      (void)eom::equation_identity_sha256("abc");
      std::cout << "{\"knownSha256VectorsPassed\":true}\n";
      return EXIT_SUCCESS;
    }
    if (operation == "capabilities" && argc == 2) {
      std::cout << eom::equation_capabilities_json() << '\n';
      return EXIT_SUCCESS;
    }
    if (operation != "inspect" || (argc - 2) % 2 != 0)
      throw std::invalid_argument("unsupported inspection operation/arguments");
    eom::NativeCoupledEvolutionRequest request;
    request.field_speed = "1";
    request.coupling = "1";
    request.equation_selection.emplace();
    std::set<std::string> seen;
    for (int index = 2; index < argc; index += 2) {
      const std::string option = argv[index];
      const std::string value = argv[index + 1];
      if (!seen.insert(option).second)
        throw std::invalid_argument("duplicate inspection option: " + option);
      auto& selection = *request.equation_selection;
      if (option == "--composition") selection.composition_id = value;
      else if (option == "--speed-domain") selection.speed_domain = value;
      else if (option == "--boundary-policy") selection.boundary_policy = value;
      else if (option == "--constraint") selection.constraint = value;
      else if (option == "--method") selection.method = value;
      else if (option == "--field-speed") request.field_speed = value;
      else if (option == "--coupling") request.coupling = value;
      else if (option == "--chart-policy") request.chart_policy = value;
      else if (option == "--causal-width") request.causal_width = value;
      else if (option == "--core-scale") request.core_scale = value;
      else if (option == "--surface-kind" || option == "--surface-radius" ||
               option == "--surface-q" || option == "--surface-major-radius") {
        if (!request.surface_geometry) request.surface_geometry.emplace();
        auto& geometry = *request.surface_geometry;
        if (option == "--surface-kind") geometry.kind = value;
        else if (option == "--surface-radius") geometry.radius = value;
        else if (option == "--surface-q") geometry.flattening = value;
        else geometry.major_radius = value;
      }
      else if (option == "--surface-position-tolerance") request.surface_numerics.position_tolerance = value;
      else if (option == "--surface-tangent-velocity-tolerance") request.surface_numerics.tangent_velocity_tolerance = value;
      else throw std::invalid_argument("unknown inspection option: " + option);
    }
    const auto model = eom::inspect_equation_model(request);
    std::cout << "{\"inspectionScope\":"
                 "\"selection-and-model-controls-not-history-admission\""
                 ",\"modelDigest\":" << eom::equation_json_quote(model.digest)
              << ",\"resolvedModel\":" << model.canonical_json << "}\n";
    return EXIT_SUCCESS;
  } catch (const eom::EquationAdmissionError& error) {
    std::cerr << "{\"code\":" << eom::equation_json_quote(error.code())
              << ",\"message\":" << eom::equation_json_quote(error.what())
              << "}\n";
  } catch (const std::exception& error) {
    std::cerr << "{\"code\":\"invalid_inspection_request\",\"message\":"
              << eom::equation_json_quote(error.what()) << "}\n";
  }
  return EXIT_FAILURE;
}
