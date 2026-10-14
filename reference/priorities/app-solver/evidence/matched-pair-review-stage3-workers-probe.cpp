// Independent known-first ordering/join and real evolution controls; c_f=1.
#include "architrino/eom/ValidatedWorkers.hpp"
#include "architrino/eom/ValidatedEvolution.hpp"
#include <array>
#include <atomic>
#include <cassert>
#include <iostream>
#include <stdexcept>
#include <system_error>
namespace e=architrino::eom;
int main(){
  std::vector<std::exception_ptr> errors;std::array<int,8> touched{};
  auto known=e::validated_run_indexed(8,1,[&](size_t i){++touched[i];return false;},errors);
  assert(known==8);for(int n:touched)assert(n==1);
  std::cout<<"Known serial all-success: every index once and no terminal BEFORE targets.\n"<<std::flush;
  size_t runs=0;
  for(size_t workers:{1U,2U,4U,8U})for(bool lower_throw:{false,true})for(int launch_failure:{-1,0,1})for(int repeat=0;repeat<8;++repeat){
    std::array<std::atomic<int>,8> counts{};std::atomic<bool> tail_seen=false;
    auto terminal=e::validated_run_indexed(8,workers,[&](size_t i){
      ++counts[i];
      // Force the highest terminal to finish before index zero returns,
      // exercising selection independently of task completion order.
      if(i==0 && workers>1 && launch_failure!=0)while(!tail_seen.load())std::this_thread::yield();
      if(i==7)tail_seen.store(true);
      if(i==7 && !lower_throw)throw std::runtime_error("higher exception");
      if(i==0 && lower_throw)throw std::runtime_error("lower exception");
      return i==0 || i==7;
    },errors,[&](size_t ordinal){if(int(ordinal)==launch_failure)throw std::system_error(std::make_error_code(std::errc::resource_unavailable_try_again));});
    assert(terminal==0 && bool(errors[0])==lower_throw);
    for(size_t i=0;i<8;++i){assert(counts[i]<=1);if(workers==1)assert(counts[i]==(i==0?1:0));else assert(counts[i]==1);}
    // The call returned, so all increment counts are stable and joined.
    ++runs;
  }
  std::cout<<runs<<" ordering/launch-failure runs passed; all started work joined.\n"<<std::flush;
  e::ValidatedEvolutionRequest q;q.run_id="independent-worker-evolution";q.policy=e::kValidatedFarStepEvolutionPolicy;
  for(size_t i=0;i<8;++i){
    const std::string id="p"+std::to_string(i),position=std::to_string(3*i);
    e::CubicCoefficientTokens c={{{"0","0","0","0"},{"0","0","0","0"},{position,"0","0","0"}}};
    q.paths.push_back({id,i%2?"-1":"1",e::RetainedHistory(id,{e::CubicHistorySegment("-100","0",c)})});
  }
  q.start_time="0";q.end_time="0.03125";q.initial_step="0.0078125";q.minimum_step=q.initial_step;
  q.coupling="0.001";q.increment_budget={1e-3,1e-3};q.pair_policy=e::kValidatedWholeStepPairPolicy;
  q.groups={{"p0","p1"},{"p2","p3"},{"p4","p5"}};
  auto serial=e::evolve_validated_far_step_histories(q);assert(serial.run.status=="completed");
  assert(serial.attempts.front().producer.accounting.off_diagonal==56);
  std::cout<<"Known eight-path serial grouped run completed BEFORE worker changes.\n"<<std::flush;
  for(size_t workers:{2U,3U,4U,8U}){
    q.worker_count=workers;auto parallel=e::evolve_validated_far_step_histories(q);assert(parallel.run.status=="completed");
    assert(parallel.worker_count==workers && parallel.run.accepted_step_count==serial.run.accepted_step_count);
    for(size_t i=0;i<8;++i)assert(e::validated_history_digest(serial.paths[i].history)==e::validated_history_digest(parallel.paths[i].history));
    for(size_t j=0;j<parallel.attempts.size();++j){
      auto& a=serial.attempts[j].producer;auto& b=parallel.attempts[j].producer;
      assert(b.worker_count==workers && a.pairs.size()==b.pairs.size() && a.groups.size()==b.groups.size());
      for(size_t i=0;i<a.paths.size();++i)for(size_t k=0;k<3;++k){assert(a.paths[i].acceleration[k].lower()==b.paths[i].acceleration[k].lower());assert(a.paths[i].acceleration[k].upper()==b.paths[i].acceleration[k].upper());}
    }
  }
  std::cout<<"Real eight-path grouped histories and acceleration boxes identical at 2,3,4,8 workers; metadata accurate.\n";
}
