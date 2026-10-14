// Independent controller probes. Known uninterrupted/resumed equality first.
#include "architrino/eom/ValidatedEvolution.hpp"
#include <cassert>
#include <iostream>
#include <limits>
namespace e = architrino::eom;
e::CubicCoefficientTokens z(const std::string& a, const std::string& b="0") {
  return {{{"0","0","0","0"},{"0","0","0","0"},{a,b,"0","0"}}};
}
e::ValidatedEvolutionRequest request(const std::string& step, const std::string& end) {
  e::ValidatedEvolutionRequest r;
  r.run_id="independent-controller-probe";
  r.policy=e::kValidatedFarStepEvolutionPolicy;
  r.paths={{"r","1",e::RetainedHistory("r",{e::CubicHistorySegment("-20","0",z("0"))})},
           {"s","1",e::RetainedHistory("s",{e::CubicHistorySegment("-20","0",z("-9","0.5"))})}};
  r.start_time="0";r.end_time=end;r.initial_step=step;r.minimum_step="0.0001";
  r.coupling="0";r.increment_budget={1e-6,1e-6};r.max_accepted_steps=100;
  return r;
}
bool same(const e::ValidatedEvolutionCertificate& a,const e::ValidatedEvolutionCertificate& b) {
  if(a.paths.size()!=b.paths.size())return false;
  for(std::size_t i=0;i<a.paths.size();++i)
    if(e::validated_history_digest(a.paths[i].history)!=e::validated_history_digest(b.paths[i].history))return false;
  return true;
}
e::ValidatedEvolutionCertificate cancelled(const e::ValidatedEvolutionRequest& base) {
  auto r=base;std::size_t count=0;
  r.accepted_step_callback=[&](auto,const auto&){++count;};
  r.cancellation_requested=[&]{return count>=2;};
  return e::evolve_validated_far_step_histories(r);
}
e::ValidatedEvolutionCertificate resumed(e::ValidatedEvolutionRequest r,
                                        const e::ValidatedEvolutionCertificate& cut) {
  r.paths=cut.paths;r.evidence=cut.evidence;r.start_time=cut.run.accepted_end_time;
  return e::evolve_validated_far_step_histories(r);
}
int main() {
  auto uniform=request("0.125","0.5");
  auto whole=e::evolve_validated_far_step_histories(uniform);
  auto cut=cancelled(uniform);auto again=resumed(uniform,cut);
  assert(whole.run.status=="completed" && cut.run.status=="cancelled");
  assert(cut.run.accepted_end_time=="0.25" && same(whole,again));
  std::cout<<"Known fixed-step cancellation/resume reproduces every history chain BEFORE adaptive target.\n"<<std::flush;
  auto adaptive=request("1.5","3");
  auto full=e::evolve_validated_far_step_histories(adaptive);
  auto partial=cancelled(adaptive);auto continuation=resumed(adaptive,partial);
  assert(full.run.status=="completed" && partial.run.status=="cancelled" && continuation.run.status=="completed");
  std::cout<<"adaptive_resume: boundary="<<partial.run.accepted_end_time
           <<" controller_step="<<partial.run.controller_step_size
           <<" full_steps="<<full.run.accepted_step_count
           <<" prefix_steps="<<partial.run.accepted_step_count
           <<" resumed_steps="<<continuation.run.accepted_step_count
           <<" same_chains="<<same(full,continuation)<<"\n";
  auto positive=request("0.125","0.125");positive.total_budget=e::ValidatedFarStepBudgets{1e-6,1e-6};
  auto admitted=e::evolve_validated_far_step_histories(positive);
  assert(admitted.run.status=="completed" && admitted.evidence);
  std::cout<<"Known finite positive total budgets admit a complete certified step BEFORE budget mutations.\n"<<std::flush;
  for(auto value:{std::numeric_limits<double>::quiet_NaN(),std::numeric_limits<double>::infinity()}) {
    auto bad=positive;bad.total_budget=e::ValidatedFarStepBudgets{value,value};
    try {auto r=e::evolve_validated_far_step_histories(bad);
      std::cout<<"nonfinite_total: nan="<<(value!=value)<<" status="<<r.run.status
               <<" accepted="<<r.run.accepted_step_count<<" evidence="<<bool(r.evidence)<<"\n";
    } catch(const std::exception& ex) {std::cout<<"nonfinite_total: refused="<<ex.what()<<"\n";}
  }
  auto empty=request("0.125","0");auto zero=e::evolve_validated_far_step_histories(empty);
  assert(zero.run.status=="completed" && zero.run.accepted_end_time=="0");
  std::cout<<"Known zero-length request at the actual history boundary completes BEFORE boundary mutation.\n"<<std::flush;
  empty.start_time="1";empty.end_time="1";
  try {auto r=e::evolve_validated_far_step_histories(empty);
    std::cout<<"zero_length_wrong_boundary: status="<<r.run.status
             <<" accepted_end="<<r.run.accepted_end_time
             <<" history_end="<<r.paths[0].history.segments().back().t_end_token()<<"\n";
  } catch(const std::exception& ex) {std::cout<<"zero_length_wrong_boundary: refused="<<ex.what()<<"\n";}
}
