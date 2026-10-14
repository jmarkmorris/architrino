#include "architrino/eom/ValidatedEvolution.hpp"
#include <cassert>
#include <iostream>
namespace e=architrino::eom;
e::CubicCoefficientTokens z(const std::string& value) {
  return {{{"0","0","0","0"},{"0","0","0","0"},{value,"0","0","0"}}};
}
bool binds(const e::ValidatedEvolutionRequest& r) {
  if(!r.evidence || r.evidence->members().size()!=r.paths.size()) return false;
  for(const auto& p:r.paths){bool found=false;
    for(const auto& m:r.evidence->members())
      if(m.path_id==p.id && m.charge==p.charge && m.digest_after==e::validated_history_digest(p.history))found=true;
    if(!found)return false;
  }
  return true;
}
int main() {
  e::ValidatedEvolutionRequest q;
  q.policy=e::kValidatedFarStepEvolutionPolicy;q.run_id="independent-v3-admission";
  q.paths={{"r","1",e::RetainedHistory("r",{e::CubicHistorySegment("-20","0",z("0"))})},
           {"s","1",e::RetainedHistory("s",{e::CubicHistorySegment("-20","0",z("10"))})}};
  q.start_time="0";q.end_time="0.125";q.initial_step="0.125";q.minimum_step="0.0001";
  q.coupling="0";q.increment_budget={1e-6,1e-6};
  auto issued=e::evolve_validated_far_step_histories(q);
  assert(issued.run.status=="completed" && issued.evidence);
  auto valid=q;valid.paths=issued.paths;valid.evidence=issued.evidence;
  valid.start_time=issued.run.accepted_end_time;valid.end_time=valid.start_time;
  assert(binds(valid));
  auto known=e::evolve_validated_far_step_histories(valid);
  assert(known.run.status=="completed" && known.evidence==issued.evidence);
  std::cout<<"Known genuine generated zero-length evidence binds and is retained BEFORE stale-evidence targets.\n"<<std::flush;
  auto stale=q;stale.evidence=issued.evidence;stale.end_time="0";
  assert(!binds(stale));
  for(int mode=0;mode<3;++mode){auto r=stale;
    if(mode==1){r.end_time="0.125";r.cancellation_requested=[](){return true;};}
    if(mode==2){r.end_time="0.125";r.max_accepted_steps=0;}
    auto out=e::evolve_validated_far_step_histories(r);
    std::cout<<"stale_on_exact_prefix: mode="<<mode<<" status="<<out.run.status
             <<" accepted_end="<<out.run.accepted_end_time
             <<" evidence_status="<<out.run.evidence_status<<" evidence="<<bool(out.evidence)
             <<" continuation="<<bool(out.continuation)<<" binds="<<binds(r)<<"\n";
  }
  auto exact=q;exact.end_time="0";
  auto exact_known=e::evolve_validated_far_step_histories(exact);
  assert(exact_known.run.status=="completed" && !exact_known.evidence);
  std::cout<<"Known exact prefix with finite coupling and no evidence passes BEFORE malformed scalar target.\n"<<std::flush;
  exact.coupling="not-a-number";
  try {auto out=e::evolve_validated_far_step_histories(exact);
    std::cout<<"invalid_coupling_early: status="<<out.run.status<<" continuation="<<bool(out.continuation)<<"\n";
  }catch(const std::exception& ex){std::cout<<"invalid_coupling_early: refused="<<ex.what()<<"\n";}
}
