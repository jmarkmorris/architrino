// Independently authored analytical controls; c_f=1. No fixture helpers.
#include "architrino/eom/MatchedPairEnclosure.hpp"
#include "architrino/eom/ValidatedEvolution.hpp"
#include <cassert>
#include <iostream>
namespace e=architrino::eom;
e::CubicCoefficientTokens z(std::string a,std::string b="0",std::string c="0",std::string d="0") {
  return {{{"0","0","0","0"},{"0","0","0","0"},{a,b,c,d}}};
}
e::RetainedHistory history(std::string id,std::string a,std::string b="0",std::string c="0",std::string d="0",std::string lower="-20") {
  return e::RetainedHistory(id,{e::CubicHistorySegment(lower,"0",z(a,b,c,d))});
}
e::WholeStepPairBound bound(const e::RetainedHistory& a,const e::RetainedHistory& b) {
  e::WholeStepPairBoundRequest q;
  q.receiver_box[2]=e::Interval(-0.125,0.125);
  q.receiver_charge="1";q.coupling="0.001";
  q.leader_history=&a;q.follower_history=&b;q.leader_charge="1";q.follower_charge="-1";
  q.slab_lower="-20";q.slab_upper="0";
  return e::whole_step_pair_bound(q);
}
void emit(const char* label,const e::WholeStepPairBound& b) {
  std::cout<<label<<" B="<<e::validated_far_step_exact_token(b.radius_upper)
    <<" separation="<<e::validated_far_step_exact_token(b.separation_upper)<<"\n"<<std::flush;
}
e::ValidatedEvolutionRequest request(bool two=false) {
  e::ValidatedEvolutionRequest q;
  q.run_id="independent-group-review";q.policy=e::kValidatedFarStepEvolutionPolicy;
  q.paths={{"r","1",history("r","0","0","0","0","-40")},
    {"a","1",history("a","10","0","0","0","-40")},
    {"b","-1",history("b","11","0","0","0","-40")}};
  if(two){q.paths.push_back({"c","1",history("c","20","0","0","0","-40")});q.paths.push_back({"d","-1",history("d","21","0","0","0","-40")});}
  q.start_time="0";q.end_time="0.03125";q.initial_step="0.0078125";q.minimum_step="0.0078125";
  q.coupling="0.001";q.increment_budget={1e-3,1e-3};
  q.pair_policy=e::kValidatedWholeStepPairPolicy;q.groups={{"a","b"}};
  if(two)q.groups.push_back({"c","d"});return q;
}
int main(){
  auto a=history("a","10"),b=history("b","11");
  auto k=bound(a,b);assert(k.status=="certified");
  // The net static contribution decreases along the axis: its derivative
  // is -2/(10-x)^3 + 2/(11-x)^3 < 0. Use correlated endpoints.
  long double lo=0.001L*(-1/(9.875L*9.875L)+1/(10.875L*10.875L));
  long double hi=0.001L*(-1/(10.125L*10.125L)+1/(11.125L*11.125L));
  assert(-k.radius_upper<=lo && hi<=k.radius_upper);
  emit("known_static_full_box",k);
  std::cout<<"Known independent static full-box truth enclosed BEFORE targets.\n"<<std::flush;
  auto moving=history("moving","11","0.1");auto m=bound(a,moving);assert(m.status=="certified");emit("moving_affine_full_box",m);
  auto bump=history("bump","10","0.025","-0.00375","0.000125");auto v=bound(a,bump);
  assert(v.status=="certified" && v.separation_upper>=3.0/64);emit("interior_cubic",v);
  // p(s)=s(s-1/2)(s-1) is zero at all three selected nodes but 3/64
  // at s=1/4. The whole-slab separation may not be zero.
  auto q=request();auto full=e::evolve_validated_far_step_histories(q);assert(full.run.status=="completed");
  for(const auto& x:full.attempts)if(x.disposition=="accepted"){
    const auto& p=x.producer;assert(p.accounting.self_excluded==3 && p.accounting.off_diagonal==6);
    assert(p.accounting.group_intervals==1 && p.accounting.grouped_members==2);
    auto g=p.groups.front();assert(g.receiver=="r" && g.disposition=="grouped");
    assert(g.interval_width>=2*g.radius_upper);
    for(auto axis:p.paths.front().acceleration)assert(axis.lower()<=-g.radius_upper && axis.upper()>=g.radius_upper);
  }
  std::cout<<"Known three-path grouping accounting and one interval pass BEFORE multiple groups.\n"<<std::flush;
  auto multi=e::evolve_validated_far_step_histories(request(true));assert(multi.run.status=="completed");
  for(const auto& x:multi.attempts)if(x.disposition=="accepted"){
    const auto& p=x.producer;assert(p.accounting.self_excluded==5 && p.accounting.off_diagonal==20);
    assert(p.accounting.group_intervals==6 && p.accounting.grouped_members==12);
    assert(p.accounting.individual_present+p.accounting.individual_absent+p.accounting.grouped_members==20);
    long double truth=.001L*(1/121.L-1/100.L+1/441.L-1/400.L);
    assert(p.paths[0].acceleration[2].lower()<=truth && truth<=p.paths[0].acceleration[2].upper());
  }
  std::cout<<"Two disjoint groups, five paths: six group intervals, twelve identities, all twenty relationships accounted.\n";
  auto cutq=q;size_t count=0;cutq.accepted_step_callback=[&](auto,const auto&){++count;};cutq.cancellation_requested=[&]{return count==2;};
  auto cut=e::evolve_validated_far_step_histories(cutq);assert(cut.run.status=="cancelled");
  auto resumed=q;resumed.paths=cut.paths;resumed.evidence=cut.evidence;resumed.continuation=cut.continuation;resumed.start_time=cut.run.accepted_end_time;
  auto suffix=e::evolve_validated_far_step_histories(resumed);assert(suffix.run.status=="completed");
  for(size_t i=0;i<full.paths.size();++i)assert(e::validated_history_digest(full.paths[i].history)==e::validated_history_digest(suffix.paths[i].history));
  std::cout<<"Known genuine grouped resume matches chains BEFORE declaration mutation.\n"<<std::flush;
  resumed.groups={{"b","a"}};auto refused=e::evolve_validated_far_step_histories(resumed);
  assert(refused.run.accepted_step_count==0 && refused.run.status=="halted");
  auto bad=request(true);bad.groups.push_back({"b","c"});auto overlap=e::evolve_validated_far_step_histories(bad);assert(overlap.run.accepted_step_count==0 && !overlap.evidence);
  std::cout<<"Changed declaration and overlapping groups refused without new acceptance.\n";
}
