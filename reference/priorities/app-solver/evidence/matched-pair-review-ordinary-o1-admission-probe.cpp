#include "architrino/eom/ValidatedOrdinaryBridge.hpp"
#include <iostream>
#include <stdexcept>
#include <string>

namespace e = architrino::eom;

e::NativeCoupledEvolutionRequest input(const std::string& velocity = "0",
                                       const std::string& source_z = "10") {
  e::CubicCoefficientTokens receiver{{{"0","0","0","0"},
                                      {"0","0","0","0"},
                                      {"0",velocity,"0","0"}}};
  e::CubicCoefficientTokens source{{{"0","0","0","0"},
                                    {"0","0","0","0"},
                                    {source_z,"0","0","0"}}};
  e::NativeCoupledEvolutionRequest r;
  r.run_id = "independent-o1-admission";
  r.paths = {{"r","1",e::RetainedHistory("rh",{e::CubicHistorySegment("-20","0",receiver)})},
             {"s","1",e::RetainedHistory("sh",{e::CubicHistorySegment("-20","0",source)})}};
  r.start_time="0"; r.end_time="0.0078125";
  r.initial_step="0.0078125"; r.minimum_step="0.00000095367431640625";
  r.field_speed="1"; r.coupling="0.001";
  r.position_increment_budget="1e-8"; r.velocity_increment_budget="1e-8";
  r.integration_method=e::kValidatedFarStepEvolutionPolicy;
  return r;
}

void report(const std::string& label, const e::NativeCoupledEvolutionRequest& r) {
  try {
    const auto c=e::evolve_native_coupled_histories(r);
    std::cout << label << " status=" << c.status << " code=" << c.halt_code
              << " accepted=" << c.accepted_step_count
              << " end=" << c.accepted_end_time
              << " continuation=" << bool(c.validated_continuation)
              << " driver_continuation=" << (c.validated_run && bool(c.validated_run->continuation))
              << std::endl;
  } catch (const std::exception& ex) {
    std::cout << label << " exception=" << ex.what() << std::endl;
  }
}

int main() {
  // The first control has a known supported static exact origin and must
  // complete one step; record that pass before any admission target.
  const auto known=e::evolve_native_coupled_histories(input());
  if (known.status!="completed" || known.accepted_step_count!=1 ||
      known.accepted_end_time!="0.0078125" || !known.validated_continuation)
    throw std::runtime_error("known static control did not complete");
  std::cout << "KNOWN static exact origin completed one step PASS" << std::endl;
  auto cancelled=input(); cancelled.cancellation_requested=[] { return true; };
  const auto k=e::evolve_native_coupled_histories(cancelled);
  if (k.halt_code!="cancelled_at_accepted_boundary" || k.accepted_step_count!=0 ||
      !k.validated_continuation) throw std::runtime_error("known cancellation control failed");
  std::cout << "KNOWN supported cancellation issued its admitted origin PASS" << std::endl;

  auto above=input("1.25");
  report("TARGET above normal",above);
  above.cancellation_requested=[] { return true; };
  report("TARGET above cancelled",above);
  above.memory_budget_bytes=1;
  report("TARGET above tiny-memory",above);
  auto overlap=input("0","0");
  report("TARGET overlap normal",overlap);
  overlap.cancellation_requested=[] { return true; };
  report("TARGET overlap cancelled",overlap);
  overlap.memory_budget_bytes=1;
  report("TARGET overlap tiny-memory",overlap);
}
