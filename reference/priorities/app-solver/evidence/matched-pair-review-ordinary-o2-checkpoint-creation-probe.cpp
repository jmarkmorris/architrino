// Independent checkpoint creation binding targets, c_f=1. Reuses only
// the separately authored exact static input; known creation runs first.
#define main replay_seal_probe_unused_main
#include "matched-pair-review-ordinary-o2-replay-seal-probe.cpp"
#undef main
#include <boost/json.hpp>
int main(){
  auto r=input();auto genuine=e::evolve_native_coupled_histories(r);
  auto cp=e::create_validated_provider_checkpoint(r,genuine);
  if(cp.empty()||genuine.accepted_step_count!=1||!genuine.validated_continuation)
    throw std::runtime_error("known matching original checkpoint failed");
  auto resumed=e::resume_validated_provider_checkpoint(r,cp,"0.015625");
  if(resumed.run.status!="completed"||resumed.run.accepted_step_count!=2)
    throw std::runtime_error("known matching checkpoint restart failed");
  std::cout<<"KNOWN genuine ordinary checkpoint creation and restart PASS"<<std::endl;
  auto foreign=r;
  e::CubicCoefficientTokens c{{{"0","0","0","0"},{"0","0","0","0"},{"15","0","0","0"}}};
  foreign.paths[1].history=e::RetainedHistory("s",{e::CubicHistorySegment("-20","0",c)});
  auto other=e::evolve_native_coupled_histories(foreign);
  try{
    auto text=e::create_validated_provider_checkpoint(r,other);
    auto doc=boost::json::parse(text).as_object();
    std::cout<<"TARGET different-origin certificate checkpoint issued bytes="<<text.size()
             <<" accepted="<<doc.at("acceptedCount")
             <<" caller_source_origin=10 certificate_source_origin=15"<<std::endl;
  }catch(const std::exception& ex){std::cout<<"TARGET different-origin certificate refused="<<ex.what()<<std::endl;}
  auto changed=genuine;
  changed.histories=other.histories;
  try{
    auto text=e::create_validated_provider_checkpoint(r,changed);
    std::cout<<"TARGET changed public certificate histories checkpoint issued bytes="<<text.size()<<std::endl;
  }catch(const std::exception& ex){std::cout<<"TARGET changed public certificate histories refused="<<ex.what()<<std::endl;}
  return 0;
}
