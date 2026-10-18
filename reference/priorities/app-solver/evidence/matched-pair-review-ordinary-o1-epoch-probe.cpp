#include "architrino/eom/ValidatedOrdinaryBridge.hpp"
#include <iostream>
#include <stdexcept>
#include <string>

namespace e=architrino::eom;

e::ValidatedEvolutionRequest driver(const std::string& begin,
                                     const std::string& end,
                                     const std::string& history_begin) {
  e::CubicCoefficientTokens r{{{"0","0","0","0"},{"0","0","0","0"},{"0","0","0","0"}}};
  e::CubicCoefficientTokens s{{{"0","0","0","0"},{"0","0","0","0"},{"10","0","0","0"}}};
  e::ValidatedEvolutionRequest q;
  q.run_id="review-epoch";
  q.policy=e::kValidatedFarStepEvolutionPolicy;
  q.paths={{"r","1",e::RetainedHistory("rh",{e::CubicHistorySegment(history_begin,begin,r)})},
           {"s","1",e::RetainedHistory("sh",{e::CubicHistorySegment(history_begin,begin,s)})}};
  q.start_time=begin; q.end_time=end; q.initial_step="0.0078125";
  q.minimum_step="0.00000095367431640625";
  q.field_speed="1"; q.coupling="0.001"; q.increment_budget={1e-8,1e-8};
  return q;
}

e::NativeCoupledEvolutionRequest ordinary(const e::ValidatedEvolutionRequest& q) {
  e::NativeCoupledEvolutionRequest r;
  r.run_id=q.run_id;
  for(const auto& p:q.paths)r.paths.push_back({p.id,p.charge,p.history});
  r.start_time=q.start_time;r.end_time=q.end_time;r.initial_step=q.initial_step;
  r.minimum_step=q.minimum_step;r.field_speed=q.field_speed;r.coupling=q.coupling;
  r.position_increment_budget="1e-8";r.velocity_increment_budget="1e-8";
  r.integration_method=e::kValidatedFarStepEvolutionPolicy;
  return r;
}

int main() {
  const auto k=e::evolve_native_coupled_histories(ordinary(driver("0","0.0078125","-20")));
  if(k.status!="completed"||k.accepted_step_count!=1||k.accepted_end_time!="0.0078125")
    throw std::runtime_error("known ordinary origin failed");
  std::cout<<"KNOWN small exact epoch completed one step PASS"<<std::endl;
  const auto q=driver("10000000000000000","10000000000000000.0078125","9999999999999980");
  // This target separates unchanged driver capability from bridge admission.
  const auto d=e::evolve_validated_far_step_histories(q);
  std::cout<<"TARGET driver status="<<d.run.status<<" end="<<d.run.accepted_end_time
           <<" count="<<d.run.accepted_step_count<<std::endl;
  try {
    const auto a=e::evolve_native_coupled_histories(ordinary(q));
    std::cout<<"TARGET ordinary status="<<a.status<<" end="<<a.accepted_end_time
             <<" count="<<a.accepted_step_count<<std::endl;
  } catch(const std::exception& ex) {
    std::cout<<"TARGET ordinary exception="<<ex.what()<<std::endl;
  }
}
