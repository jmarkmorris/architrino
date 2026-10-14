// Independently authored persistence identity/replay controls. c_f=1.
#include "architrino/eom/ValidatedRunRecord.hpp"
#include <boost/json.hpp>
#include <array>
#include <cassert>
#include <iostream>
namespace e = architrino::eom;
namespace j = boost::json;
e::ValidatedEvolutionRequest input() {
  e::ValidatedEvolutionRequest q;
  q.run_id="independent-record-replay";q.policy=e::kValidatedFarStepEvolutionPolicy;
  for (const auto& p : {std::array<std::string,3>{"r","1","0"},
                       std::array<std::string,3>{"a","1","10"},
                       std::array<std::string,3>{"b","-1","11"}}) {
    e::CubicCoefficientTokens c={{{"0","0","0","0"},{"0","0","0","0"},{p[2],"0","0","0"}}};
    q.paths.push_back({p[0],p[1],e::RetainedHistory(p[0],{e::CubicHistorySegment("-40","0",c)})});
  }
  q.start_time="0";q.end_time="0.015625";q.initial_step="0.0078125";q.minimum_step=q.initial_step;
  q.coupling="0.001";q.increment_budget={1e-3,1e-3};
  q.pair_policy=e::kValidatedWholeStepPairPolicy;q.groups={{"a","b"}};
  return q;
}
void cleared(const char* name,const e::ValidatedRestoreResult& r) {
  assert(r.status=="refused" && r.paths.empty() && !r.evidence && !r.continuation && r.ledger.empty() && !r.record);
  std::cout<<name<<": refused, no usable partial state, stage="<<r.stage<<"\n"<<std::flush;
}
void same_paths(const std::vector<e::ValidatedFarStepPath>& a,const std::vector<e::ValidatedFarStepPath>& b) {
  assert(a.size()==b.size());
  for(size_t i=0;i<a.size();++i) {
    assert(a[i].id==b[i].id && a[i].charge==b[i].charge);
    assert(e::validated_history_digest(a[i].history)==e::validated_history_digest(b[i].history));
  }
}
int main() {
  assert(e::validated_run_record_identity("abc")=="ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  std::cout<<"Known external SHA-256 abc passes BEFORE identity targets.\n"<<std::flush;
  auto q=input();auto zero=e::ValidatedRunRecord::open(q);
  auto first=e::evolve_validated_far_step_histories(q);assert(first.run.status=="completed");
  auto record=zero;assert(record.append(q,first).empty());auto bytes=record.serialize();
  e::ValidatedRestoreExpectation by_hash;by_hash.record_identity=e::validated_run_record_identity(bytes);
  auto known=e::restore_validated_run(bytes,by_hash,4);
  assert(known.status=="restored" && known.identity_basis=="expected_record" && known.evidence && known.continuation);
  same_paths(known.paths,first.paths);
  std::cout<<"Known genuine selected-record replay passes BEFORE expectation/corruption targets.\n"<<std::flush;
  e::ValidatedRestoreExpectation controls;controls.controls=record.controls();
  auto control_known=e::restore_validated_run(bytes,controls,2);
  assert(control_known.status=="restored" && control_known.identity_basis=="expected_controls");
  auto bare=e::replay_validated_run_record(bytes,3);
  assert(bare.status=="restored" && bare.identity_basis=="record_only");
  cleared("empty expectation",e::restore_validated_run(bytes,{}));
  auto origin_only=controls;origin_only.controls.reset();origin_only.origin=record.origin_members();
  cleared("origin-only expectation",e::restore_validated_run(bytes,origin_only));
  auto contradictory=by_hash;contradictory.controls=record.controls();
  cleared("contradictory expectation",e::restore_validated_run(bytes,contradictory));
  auto malformed=by_hash;malformed.record_identity="not-a-hash";
  cleared("malformed hash expectation",e::restore_validated_run(bytes,malformed));
  auto doc=j::parse(bytes);doc.as_object().at("body").as_object().at("controls").as_object().at("increment_budget")=j::array{"0.01","0.01"};
  auto changed=e::validated_run_record_reseal(j::serialize(doc));
  cleared("resealed slack controls selected by full identity",e::restore_validated_run(changed,by_hash));
  cleared("resealed slack controls selected by original controls",e::restore_validated_run(changed,controls));
  auto valid_changed=e::replay_validated_run_record(changed,4);
  assert(valid_changed.status=="restored" && valid_changed.identity_basis=="record_only" && valid_changed.record_identity!=known.record_identity);
  same_paths(valid_changed.paths,known.paths);
  std::cout<<"Bare replay intentionally accepts self-consistent slack controls without claiming original identity.\n"<<std::flush;
  auto zero_doc=j::parse(zero.serialize());
  zero_doc.as_object().at("body").as_object().at("origin").as_object().at("paths").as_array()[0].as_object().at("charge")="2";
  auto other_origin=e::validated_run_record_reseal(j::serialize(zero_doc));
  auto weaker=e::restore_validated_run(other_origin,controls);
  assert(weaker.status=="restored" && weaker.identity_basis=="expected_controls" && weaker.paths[0].charge=="2" && !weaker.evidence && !weaker.continuation);
  auto with_origin=controls;with_origin.origin=zero.origin_members();
  cleared("controls with original origin",e::restore_validated_run(other_origin,with_origin));
  std::cout<<"Controls-only zero-leg restore intentionally accepts another admitted origin.\n"<<std::flush;
  auto q2=q;q2.paths=first.paths;q2.evidence=first.evidence;q2.continuation=first.continuation;
  q2.start_time=first.run.accepted_end_time;q2.end_time="0.03125";q2.worker_count=1;
  auto second=e::evolve_validated_far_step_histories(q2);assert(second.run.status=="completed");
  assert(record.append(q2,second).empty());
  auto replay_q2=q2;replay_q2.paths=known.paths;replay_q2.evidence=known.evidence;replay_q2.continuation=known.continuation;replay_q2.worker_count=4;
  auto replay_second=e::evolve_validated_far_step_histories(replay_q2);assert(replay_second.run.status=="completed");
  same_paths(second.paths,replay_second.paths);assert(known.record->append(replay_q2,replay_second).empty());
  assert(known.record->serialize()==record.serialize());
  std::cout<<"Known genuine two-leg continuation reissues evidence and record identically BEFORE post-leg failure targets.\n"<<std::flush;
  auto multi=record.serialize();auto false_final=j::parse(multi);
  false_final.as_object().at("body").as_object().at("final").as_object().at("accepted_step_count")=999;
  cleared("false final after complete replay",e::replay_validated_run_record(e::validated_run_record_reseal(j::serialize(false_final)),4));
  auto false_second=j::parse(multi);
  false_second.as_object().at("body").as_object().at("legs").as_array()[1].as_object().at("status")="cancelled";
  cleared("false second leg after first replay",e::replay_validated_run_record(e::validated_run_record_reseal(j::serialize(false_second)),2));
  auto claims=e::read_validated_run_record(multi);assert(claims.status=="read" && claims.record);
  auto before=claims.record->serialize();assert(!claims.record->append(q2,second).empty());assert(claims.record->serialize()==before);
  std::cout<<"Claims-only record cannot append; rejected append preserves bytes.\n"<<std::flush;
  for(int mode=0;mode<3;++mode) {
    auto wrong=q2;if(mode==0)wrong.paths[0].id="wrong";else if(mode==1)wrong.paths[0].charge="2";else wrong.evidence.reset();
    auto target=zero;assert(target.append(q,first).empty());before=target.serialize();
    assert(!target.append(wrong,second).empty() && target.serialize()==before);
    std::cout<<"Continued append binding target "<<mode<<": refused and byte-preserved.\n"<<std::flush;
  }
}
