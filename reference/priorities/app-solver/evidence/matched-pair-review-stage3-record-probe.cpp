// Independent known-first admission and boundary-binding probes; c_f=1.
#include "architrino/eom/ValidatedRunRecord.hpp"
#include <boost/json.hpp>
#include <cassert>
#include <iostream>
namespace e=architrino::eom;namespace j=boost::json;
e::ValidatedEvolutionRequest request(){
  e::ValidatedEvolutionRequest q;q.run_id="independent-record-review";q.policy=e::kValidatedFarStepEvolutionPolicy;
  for(const auto& p:{std::array<std::string,3>{"r","1","0"},std::array<std::string,3>{"a","1","10"},std::array<std::string,3>{"b","-1","11"}}){
    e::CubicCoefficientTokens c={{{"0","0","0","0"},{"0","0","0","0"},{p[2],"0","0","0"}}};
    q.paths.push_back({p[0],p[1],e::RetainedHistory(p[0],{e::CubicHistorySegment("-40","0",c)})});
  }
  q.start_time="0";q.end_time="0.015625";q.initial_step="0.0078125";q.minimum_step=q.initial_step;
  q.coupling="0.001";q.increment_budget={1e-3,1e-3};q.pair_policy=e::kValidatedWholeStepPairPolicy;q.groups={{"a","b"}};
  return q;
}
void report(const char* label,const e::ValidatedRestoreResult& r){
  std::cout<<label<<": status="<<r.status<<" stage="<<r.stage<<" paths="<<r.paths.size()<<" evidence="<<bool(r.evidence)<<" continuation="<<bool(r.continuation)<<" reason="<<r.reason<<"\n"<<std::flush;
}
int main(){
  auto q=request();auto empty=e::ValidatedRunRecord::open(q);auto bytes=empty.serialize();
  auto known=e::replay_validated_run_record(bytes);assert(known.status=="restored" && known.paths.size()==3 && !known.evidence);
  std::cout<<"Known exact-origin zero-leg replay passes BEFORE malformed-origin/control targets.\n"<<std::flush;
  for(int mode=0;mode<5;++mode){
    auto doc=j::parse(bytes);auto& body=doc.as_object().at("body").as_object();
    const char* name=nullptr;
    if(mode==0){name="zero_minimum";body.at("controls").as_object().at("minimum_step")="0";}
    if(mode==1){name="no_attempt_allowance";body.at("controls").as_object().at("max_attempts_per_step")=0;}
    if(mode==2){name="bad_charge";body.at("origin").as_object().at("paths").as_array()[0].as_object().at("charge")="not-a-number";}
    if(mode==3){name="unrepresentable_coupling";body.at("scalars").as_object().at("coupling")="1e400";}
    if(mode==4){name="duplicate_identifier";body.at("origin").as_object().at("paths").as_array()[1].as_object().at("id")="r";}
    try{auto changed=e::validated_run_record_reseal(j::serialize(doc));report(name,e::replay_validated_run_record(changed));}
    catch(const std::exception& x){std::cout<<name<<": refused at construction: "<<x.what()<<"\n";}
  }
  auto certificate=e::evolve_validated_far_step_histories(q);assert(certificate.run.status=="completed");
  auto record=e::ValidatedRunRecord::open(q);assert(record.append(q,certificate).empty());
  auto text=record.serialize();e::ValidatedRestoreExpectation identity;identity.record_identity=e::validated_run_record_identity(text);
  auto restored=e::restore_validated_run(text,identity,4);assert(restored.status=="restored" && restored.evidence && restored.continuation);
  for(size_t i=0;i<3;++i)assert(e::validated_history_digest(restored.paths[i].history)==e::validated_history_digest(certificate.paths[i].history));
  std::cout<<"Known genuine one-leg append/selected restore binds all paths BEFORE request mutations.\n"<<std::flush;
  for(int mode=0;mode<4;++mode){
    auto wrong=q;const char* name;
    if(mode==0){name="request_charge_changed";wrong.paths[0].charge="2";}
    else if(mode==1){name="request_id_changed";wrong.paths[0].id="different";}
    else if(mode==2){name="request_field_speed_changed";wrong.field_speed="2";}
    else{name="request_stale_evidence";wrong.evidence=certificate.evidence;}
    auto target=e::ValidatedRunRecord::open(q);auto reason=target.append(wrong,certificate);
    std::cout<<name<<": appended="<<reason.empty()<<" reason="<<reason<<"\n"<<std::flush;
  }
}
