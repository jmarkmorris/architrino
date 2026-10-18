// Independently authored continuation-boundary probe, c_f=1. The static
// exact-origin controls execute and are recorded before mutable-result targets.
#include "architrino/eom/ValidatedOrdinaryBridge.hpp"
#include "architrino/eom/ProviderTransport.hpp"
#include <iostream>
#include <stdexcept>
namespace e = architrino::eom;

e::NativeCoupledEvolutionRequest input() {
  e::NativeCoupledEvolutionRequest r;
  r.run_id="independent-o2-replay-seal";
  for (const auto& pair : {std::pair{"r","0"},std::pair{"s","10"}}) {
    e::CubicCoefficientTokens c{{{"0","0","0","0"},
                                 {"0","0","0","0"},
                                 {pair.second,"0","0","0"}}};
    r.paths.push_back({pair.first,"1",e::RetainedHistory(pair.first,
      {e::CubicHistorySegment("-20","0",c)})});
  }
  r.start_time="0";r.end_time="0.0078125";
  r.initial_step="0.0078125";r.minimum_step="0.00000095367431640625";
  r.field_speed="1";r.coupling="0.001";
  r.position_increment_budget="1e-8";r.velocity_increment_budget="1e-8";
  r.integration_method=e::kValidatedFarStepEvolutionPolicy;
  return r;
}

int main() {
  auto r=input();
  auto known=e::evolve_native_coupled_histories(r);
  if(known.status!="completed"||known.accepted_step_count!=1||
     !known.validated_continuation||!known.validated_continuation->record())
    throw std::runtime_error("known static ordinary record control failed");
  const auto bytes=known.validated_continuation->record()->serialize();
  e::ValidatedRestoreExpectation expectation;
  expectation.record_identity=e::validated_run_record_identity(bytes);
  auto restored=e::restore_validated_run(bytes,expectation,1);
  if(restored.status!="restored"||!restored.continuation||!restored.record||
     restored.replayed_rejected_steps!=0)
    throw std::runtime_error("known selected replay failed");
  auto sealed=e::native_validated_continuation_from_replay(restored);
  if(!sealed||sealed->rejected_step_count()!=0||sealed->record_status()!="recorded")
    throw std::runtime_error("known genuine replay bridge failed");
  std::cout<<"KNOWN static one-step complete replay and genuine sealed boundary PASS"<<std::endl;

  auto forged=restored;
  forged.replayed_rejected_steps=99;
  try {
    auto bad=e::native_validated_continuation_from_replay(forged);
    std::cout<<"TARGET changed public replay counter minted="<<bool(bad)
             <<" rejected="<<bad->rejected_step_count()<<" record="<<bad->record_status()<<std::endl;
    auto resumed=r;
    resumed.paths.clear();
    for(const auto& p:restored.paths)resumed.paths.push_back({p.id,p.charge,p.history});
    resumed.start_time="0.0078125";resumed.end_time="0.015625";
    resumed.validated_population_evidence=restored.evidence;
    resumed.validated.continuation=bad;
    resumed.initial_accepted_step_count=bad->accepted_step_count();
    resumed.initial_rejected_step_count=99;
    auto run=e::evolve_native_coupled_histories(resumed);
    std::cout<<"TARGET forged counter continued status="<<run.status
             <<" accepted="<<run.accepted_step_count<<" rejected="<<run.rejected_step_count
             <<" continuation="<<bool(run.validated_continuation)<<std::endl;
    auto checkpoint=e::create_validated_provider_checkpoint(r,run);
    std::cout<<"TARGET forged counter checkpoint issued bytes="<<checkpoint.size()<<std::endl;
  } catch(const std::exception& ex) {
    std::cout<<"TARGET changed public replay counter refused="<<ex.what()<<std::endl;
  }

  auto alternate=r;
  alternate.coupling="0.002";
  auto alternate_record=e::ValidatedRunRecord::open(e::native_validated_request(alternate));
  auto swapped=restored;
  swapped.record=alternate_record;
  try {
    auto bad=e::native_validated_continuation_from_replay(swapped);
    std::cout<<"TARGET unrelated zero-leg record minted="<<bool(bad)
             <<" accepted="<<bad->accepted_step_count()
             <<" record_accepted="<<bad->record()->final_state().accepted_step_count
             <<" record="<<bad->record_status()<<std::endl;
  } catch(const std::exception& ex) {
    std::cout<<"TARGET unrelated zero-leg record refused="<<ex.what()<<std::endl;
  }
}
