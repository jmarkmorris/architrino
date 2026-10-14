#include "architrino/eom/ValidatedEvolution.hpp"
#include <cassert>
#include <iomanip>
#include <iostream>
namespace e=architrino::eom;
e::CubicCoefficientTokens constant(const std::string& z) {
  return {{{"0","0","0","0"},{"0","0","0","0"},{z,"0","0","0"}}};
}
int main() {
  e::ValidatedEvolutionRequest q;
  q.policy=e::kValidatedFarStepEvolutionPolicy;q.run_id="independent-ledger-probe";
  q.paths={{"r","1",e::RetainedHistory("r",{e::CubicHistorySegment("-20","0",constant("0"))})},
           {"s","1",e::RetainedHistory("s",{e::CubicHistorySegment("-20","0",constant("10"))})}};
  q.start_time="0";q.end_time="0.125";q.initial_step="0.125";q.minimum_step="0.0001";
  q.coupling="0";q.increment_budget={1e-6,1e-6};
  auto known=e::evolve_validated_far_step_histories(q);
  assert(known.run.status=="completed" && known.ledger.size()==2);
  auto state=known.paths[1].history.endpoint_state_hull();
  assert(state.position[2].lower()<=10 && state.position[2].upper()>=10);
  assert(state.velocity[2].lower()<=0 && state.velocity[2].upper()>=0);
  assert(known.ledger[1].position.total[2]<1e-6);
  std::cout<<"Known zero-coupling static source at 10 and finite large budget pass BEFORE tiny-budget target.\n"<<std::flush;
  q.increment_budget={1e-25,1e-25};
  auto target=e::evolve_validated_far_step_histories(q);
  std::cout<<std::setprecision(17)<<"tiny_budget: status="<<target.run.status
           <<" accepted="<<target.run.accepted_step_count<<" budget=1e-25";
  if(!target.ledger.empty()){
    const auto& p=target.ledger[1].position;
    std::cout<<" inherited="<<p.inherited[2]<<" increment="<<p.increment[2]
             <<" total="<<p.total[2]<<" actual_growth_exceeds_budget="<<(p.total[2]-p.inherited[2]>1e-25);
  }
  std::cout<<"\n";
}
