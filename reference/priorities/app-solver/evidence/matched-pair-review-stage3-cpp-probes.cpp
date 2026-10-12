// Independent scratch-candidate probes. Known static case precedes targets.
#include "validated_far_step_candidate.hpp"
#include <cassert>
#include <iomanip>
#include <iostream>
namespace e = architrino::eom;
e::CubicCoefficientTokens z(const std::string& a,const std::string& b="0") {
  return {{{"0","0","0","0"},{"0","0","0","0"},{a,b,"0","0"}}};
}
vfs::Path path(const std::string& id,const std::string& value,
              const std::string& velocity="0",const std::string& end="0",
              const std::string& begin="-20") {
  return {id,"1",e::RetainedHistory(id,{e::CubicHistorySegment(begin,end,z(value,velocity))})};
}
void interval(const e::Interval& i) {std::cout<<'['<<i.lower()<<','<<i.upper()<<']';}
int main() {
  std::cout<<std::setprecision(17);
  vfs::Producer producer;
  auto known=producer.step({path("r","0"),path("s","10")},"0","0.0078125","0.001",vfs::Budgets{1e-8,1e-8});
  assert(known.status=="certified");
  assert(known.paths[0].acceleration[2].lower() <= -1e-5 && known.paths[0].acceleration[2].upper() >= -1e-5);
  std::cout<<"Known static acceleration -1/100000 contained BEFORE targets.\n";
  for(const std::string initial:{"0.1","1.2345678901234567","0.33333333333333331"}) {
    std::vector<vfs::Path> paths{path("r",initial,"0.12345678901234567"),path("s","10")};
    auto sections=paths[0].history.endpoint_state_hull();
    auto c=producer.step(paths,"0","0.125","0",std::nullopt);
    std::cout<<"{\"case\":\"publication_token\",\"initial\":\""<<initial<<"\",\"status\":\""<<c.status<<"\"";
    if(c.status=="certified") {
      const auto& p=c.paths[0];const auto& s=*p.segment;
      std::cout<<",\"X0\":";interval(sections.position[2]);
      std::cout<<",\"V0\":";interval(sections.velocity[2]);
      std::cout<<",\"A\":";interval(p.acceleration[2]);
      std::cout<<",\"c\":[";
      for(int k=0;k<4;k++)std::cout<<(k?",":"")<<'"'<<s.coefficient_tokens()[2][k]<<'"';
      std::cout<<"],\"rx\":\""<<s.position_error_tokens()[2]<<"\",\"rv\":\""<<s.velocity_error_tokens()[2]<<'"';
    }
    std::cout<<"}\n";
  }
  auto epoch=producer.step({path("r","0","0","10000000000","9999999980"),path("s","10","0","10000000000","9999999980")},"10000000000","0.0002987","0",std::nullopt);
  std::cout<<"{\"case\":\"exact_time_extent\",\"status\":\""<<epoch.status<<"\",\"start\":\""<<epoch.start<<"\",\"h\":\""<<epoch.step<<"\",\"end\":\""<<epoch.end<<"\"}\n";
  auto receiver=path("r","0");
  auto plus=path("a_plus","10");auto minus=path("b_minus","11");minus.charge="-1";
  auto request=[&]() {
    e::MatchedPairEnclosureRequest q;
    q.policy=e::kMatchedPairPolicySnapshotPiecewiseTube;
    q.receiver_path_id=receiver.id;q.receiver_charge=receiver.charge;q.receiver_history=&receiver.history;
    q.leader_path_id=plus.id;q.leader_charge=plus.charge;q.leader_history=&plus.history;
    q.follower_path_id=minus.id;q.follower_charge=minus.charge;q.follower_history=&minus.history;
    q.coupling="0.001";q.field_speed="1";q.reception_time="0";q.emission_lower="-20";
    q.far_field_enclosure_fraction="0.25";q.acceleration_tolerance="1";q.transmitter_count=3;
    return q;
  };
  auto group_known=e::certify_matched_pair_enclosure(request());
  assert(group_known.status=="certified_enclosed");
  assert(group_known.acceleration->at(2).lower()<=-21.0/12100000 && group_known.acceleration->at(2).upper()>=-21.0/12100000);
  std::cout<<"Known nonzero static matched pair -21/12100000 contained BEFORE tube target.\n";
  e::HistoryErrorTokens px{"0","0","0.0001"};
  auto affine=[&](const std::string& id,const std::string& charge,const std::string& first,const std::string& join,const std::string& velocity,const std::string& early,const std::string& late) {
    return vfs::Path{id,charge,e::RetainedHistory(id,{
      e::CubicHistorySegment("-20","-10.5",z(first,velocity),px,e::HistoryErrorTokens{"0","0",early}),
      e::CubicHistorySegment("-10.5","0",z(join,velocity),px,e::HistoryErrorTokens{"0","0",late})})};
  };
  plus=affine("a_plus","1","9.8","9.895","0.01","0.001","0.01");
  minus=affine("b_minus","-1","10.6","10.79","0.02","0.02","0.002");
  auto without=e::certify_matched_pair_enclosure(request());
  assert(without.failure_code=="MPE-EVIDENCE-01");
  // Conditional geometry test: these known C1 affine paths are truly inside
  // the declared tubes. Caller registration supplies no generating proof;
  // this deliberately tests the arithmetic, not validated-history origin.
  e::matched_pair_register_validated_population({"0.001",{
    {receiver.id,receiver.charge,receiver.history.provenance_fingerprint()},
    {plus.id,plus.charge,plus.history.provenance_fingerprint()},
    {minus.id,minus.charge,minus.history.provenance_fingerprint()}}});
  auto group=e::certify_matched_pair_enclosure(request());
  assert(group.status=="certified_enclosed");
  std::cout<<"{\"case\":\"conditional_affine_tubes\",\"status\":\""<<group.status<<"\",\"floor\":"<<*group.distance_floor<<",\"speed\":"<<*group.speed_upper<<",\"nu\":"<<*group.transmitter_factor_floor<<",\"ell\":"<<*group.separation_upper<<",\"w\":"<<*group.relative_speed_upper<<",\"a\":"<<*group.acceleration_upper<<",\"J\":"<<*group.join_velocity_jump_upper<<",\"epsVp\":"<<*group.leader.velocity_radius_upper<<",\"epsVm\":"<<*group.follower.velocity_radius_upper<<",\"C\":"<<*group.prefactor_upper<<",\"radius\":"<<*group.radius_upper<<",\"caller_registration_accepted\":true}\n";
}
