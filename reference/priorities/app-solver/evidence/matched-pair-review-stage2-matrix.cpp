// Independently prepared piecewise adapter of the unchanged Stage 1 reviewer instrument.
#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"
#include <iostream>
#include <stdexcept>
#include <vector>
namespace e = architrino::eom;
using Requests = std::vector<e::NativePairAccelerationRequest>;
e::RetainedHistory static_history(const std::string& id, const std::string& z) {
  e::CubicCoefficientTokens c{{{"0","0","0","0"},{"0","0","0","0"},{z,"0","0","0"}}};
  return e::RetainedHistory(id,{e::CubicHistorySegment("-20","-10",c,"0","0"),e::CubicHistorySegment("-10","0",c,"0","0")});
}
int main(int argc, char** argv) {
  const std::vector<std::string> ids{"receiver","plus","minus"};
  const std::vector<std::string> charges{"1","1","-1"};
  std::vector<e::NativePublishedPath> paths;
  paths.push_back({ids[0],static_history("receiver-history","0")});
  paths.push_back({ids[1],static_history("plus-history","10.005")});
  paths.push_back({ids[2],static_history("minus-history","9.995")});
  e::NativeCoupledEvolutionRequest settings;
  settings.run_id="independent-matrix-binding";
  for (std::size_t i=0;i<3;++i) settings.paths.push_back({ids[i],charges[i],paths[i].history});
  settings.start_time="0"; settings.end_time="0";
  settings.initial_step="0.1";settings.minimum_step="0.1";
  settings.field_speed="1";settings.coupling="1";
  settings.root_tolerance="1e-7";settings.transmitter_factor_floor="1e-24";
  settings.acceleration_tolerance="0.001";settings.far_field_enclosure_fraction="0.5";
  settings.matched_pair_enclosure_policy=e::kMatchedPairPolicySnapshotPiecewiseExact;
  settings.use_certified_traversal=false;
  const auto snapshot=e::certify_native_acceleration_snapshot(settings,paths,"0");
  if(snapshot.status!="certified_complete" || snapshot.matched_pair_enclosed_groups!=1)
    throw std::runtime_error("known snapshot failed");
  const e::NativeMatchedPairEnclosureCertificate* group=nullptr;
  for(const auto& candidate:snapshot.matched_pair_enclosure_certificates)
    if(candidate.status=="certified_enclosed") group=&candidate;
  if(!group) throw std::runtime_error("known group absent");
  Requests original;
  for(std::size_t r=0;r<3;++r) for(std::size_t s=0;s<3;++s) {
    const auto& root=snapshot.root_certificates.at(3*r+s).certificate;
    const bool grouped=r==0 && s!=0;
    original.push_back({.row_id=root.row_id,.receiver_path_id=ids[r],.transmitter_path_id=ids[s],
      .receiver_history=&paths[r].history,.transmitter_history=&paths[s].history,.root_certificate=&root,
      .matched_pair_enclosure=grouped?group:nullptr,.receiver_charge=charges[r],.transmitter_charge=charges[s],
      .coupling="1",.chart=grouped?"matched_pair_enclosure":"sharp",.transmitter_factor_floor="1e-24",
      .acceleration_tolerance="0.001"});
  }
  const auto known=e::certify_acceleration_reconstruction(ids,original,1U);
  if(known.status!="certified_complete") throw std::runtime_error("known matrix rejected");
  bool contained=false;
  for(const auto& total:known.receiver_totals) if(total.receiver_path_id=="receiver") {
    const double z=320000000.0/15999992000001.0;
    contained=total.acceleration[0].lower()<=0 && total.acceleration[0].upper()>=0 &&
      total.acceleration[1].lower()<=0 && total.acceleration[1].upper()>=0 &&
      total.acceleration[2].lower()<=z && total.acceleration[2].upper()>=z;
  }
  if(!contained) throw std::runtime_error("known analytical static total escaped");
  std::cout<<"Known matrix control passed BEFORE targets: all nine slots accepted; exact static receiver vector (0,0,320000000/15999992000001) contained.\n";
  if(argc==2 && std::string(argv[1])=="--known-only") return 0;
  int escaped=0;
  const auto reject=[&](const std::string& name,const Requests& changed,const std::vector<std::string>& names) {
    bool accepted=false;
    try {accepted=e::certify_acceleration_reconstruction(names,changed,1U).status=="certified_complete";}
    catch(const std::exception&) {}
    std::cout<<"{\"target\":\""<<name<<"\",\"accepted\":"<<(accepted?"true":"false")<<"}\n";
    escaped+=accepted?1:0;
  };
  auto changed=original; changed.erase(changed.begin()+2); reject("missing_member_slot",changed,ids);
  changed=original;changed[2]=changed[1];reject("duplicated_member_slot",changed,ids);
  changed=original;changed[2].matched_pair_enclosure=nullptr;reject("missing_group_reference",changed,ids);
  auto copy=*group;changed=original;changed[2].matched_pair_enclosure=&copy;reject("second_certificate_object",changed,ids);
  changed=original;changed[4].matched_pair_enclosure=group;reject("certificate_on_exact_slot",changed,ids);
  changed=original;changed[2].transmitter_path_id="foreign";reject("foreign_member",changed,ids);
  changed=original;for(auto& row:changed) row.coupling="2";reject("changed_coupling",changed,ids);
  changed=original;changed[1].receiver_charge="2";changed[2].receiver_charge="2";reject("changed_receiver_charge",changed,ids);
  changed=original;changed[2].transmitter_charge="-2";reject("changed_source_charge",changed,ids);
  auto wrong_root=*original[2].root_certificate;wrong_root.field_speed="2";
  changed=original;changed[2].root_certificate=&wrong_root;reject("changed_marker_speed",changed,ids);
  auto moved=static_history("minus-history","9.9");changed=original;changed[2].transmitter_history=&moved;
  reject("changed_member_history",changed,ids);
  auto forged=*group;forged.distance_floor=100.0;forged.radius_upper=3e-8;
  const e::Interval tiny(-3e-8,3e-8);forged.acceleration=e::IntervalVector{tiny,tiny,tiny};forged.emitted_width=tiny.width();
  changed=original;changed[1].matched_pair_enclosure=&forged;changed[2].matched_pair_enclosure=&forged;
  reject("forged_distance_and_interval",changed,ids);
  auto absent=*group;absent.status="certified_absent";absent.leader.disposition="absent";absent.follower.disposition="absent";
  const auto zero=e::Interval::point(0.0);absent.acceleration=e::IntervalVector{zero,zero,zero};absent.emitted_width=0.0;
  changed=original;changed[1].matched_pair_enclosure=&absent;changed[2].matched_pair_enclosure=&absent;
  reject("false_absence",changed,ids);
  const auto mutate=[&](const std::string& name,auto fn) {
    auto bad=*group;fn(bad);auto rows=original;
    rows[1].matched_pair_enclosure=&bad;rows[2].matched_pair_enclosure=&bad;
    reject(name,rows,ids);
  };
  mutate("removed_boundary",[](auto& x){x.cell_boundaries.erase(x.cell_boundaries.begin()+1);});
  mutate("moved_boundary",[](auto& x){x.cell_boundaries[1]="-9";});
  mutate("added_boundary",[](auto& x){x.cell_boundaries.insert(x.cell_boundaries.begin()+1,"-15");});
  mutate("zero_jump",[](auto& x){x.join_velocity_jump_upper=0;});
  mutate("missing_jump",[](auto& x){x.join_velocity_jump_upper.reset();});
  mutate("wrong_grade",[](auto& x){x.history_grade="exact_cubic";});
  mutate("wrong_leader_last",[](auto& x){x.leader.last_segment_index=0;});
  mutate("wrong_follower_last",[](auto& x){x.follower.last_segment_index=0;});
  mutate("missing_leader_last",[](auto& x){x.leader.last_segment_index.reset();});
  mutate("wrong_policy",[](auto& x){x.policy=e::kMatchedPairPolicySnapshotSingleSlab;});
  return escaped==0?0:1;
}
