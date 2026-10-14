// Demonstrate that replay cannot detect all changed controls from step logs.
#include "architrino/eom/ValidatedEvolution.hpp"
#include <cassert>
#include <iostream>
namespace e=architrino::eom;
e::ValidatedEvolutionRequest request(){
  e::ValidatedEvolutionRequest q;q.run_id="independent-replay-control";
  q.policy=e::kValidatedFarStepEvolutionPolicy;
  for(const auto& v:{std::array<std::string,3>{"r","1","0"},std::array<std::string,3>{"a","1","10"},std::array<std::string,3>{"b","-1","11"}}){
    e::CubicCoefficientTokens c={{{"0","0","0","0"},{"0","0","0","0"},{v[2],"0","0","0"}}};
    q.paths.push_back({v[0],v[1],e::RetainedHistory(v[0],{e::CubicHistorySegment("-40","0",c)})});
  }
  q.start_time="0";q.end_time="0.03125";q.initial_step="0.0078125";q.minimum_step=q.initial_step;
  q.coupling="0.001";q.increment_budget={1e-3,1e-3};
  q.pair_policy=e::kValidatedWholeStepPairPolicy;q.groups={{"a","b"}};return q;
}
int main(){
  auto a=request();auto b=a;b.increment_budget={1e-2,1e-2};
  auto x=e::evolve_validated_far_step_histories(a);
  assert(x.run.status=="completed" && x.attempts.front().producer.accounting.group_intervals==1);
  auto acc=x.attempts.front().producer.paths.front().acceleration[2];
  const long double known=-21.L/12100000.L;
  assert(acc.lower()<=known && known<=acc.upper());
  std::cout<<"Known static grouped acceleration contained BEFORE changed nonbinding budget target.\n"<<std::flush;
  auto y=e::evolve_validated_far_step_histories(b);
  assert(x.run.status=="completed" && y.run.status=="completed");
  bool equal=x.run.accepted_end_time==y.run.accepted_end_time && x.run.accepted_step_count==y.run.accepted_step_count;
  for(size_t i=0;i<x.paths.size();++i)equal=equal && e::validated_history_digest(x.paths[i].history)==e::validated_history_digest(y.paths[i].history);
  assert(equal);
  assert(x.continuation->state().increment_budget.position!=y.continuation->state().increment_budget.position);
  std::cout<<"Changed budget 0.001 -> 0.01: same times/count/chains; distinct genuine bound continuation controls.\n";
}
