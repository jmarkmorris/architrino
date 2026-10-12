#include "architrino/eom/CertifiedAcceleration.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"
#include <cassert>
#include <iomanip>
#include <iostream>
#include <stdexcept>
namespace e = architrino::eom;
e::RetainedHistory history(const std::string& id,const std::string& z) {
  e::CubicCoefficientTokens c{{{"0","0","0","0"},{"0","0","0","0"},{z,"0","0","0"}}};
  return e::RetainedHistory(id,{e::CubicHistorySegment("-20","0",c,"0","0")});
}
int main() {
  auto receiver=history("receiver-history","0");
  auto plus=history("plus-history","10.005");
  auto minus=history("minus-history","9.995");
  auto group=e::certify_matched_pair_enclosure({
    .policy=e::kMatchedPairPolicySnapshotSingleSlab,.receiver_path_id="receiver",
    .receiver_history=&receiver,.receiver_charge="1",.leader_path_id="plus",
    .leader_history=&plus,.leader_charge="1",.follower_path_id="minus",
    .follower_history=&minus,.follower_charge="-1",.coupling="1",.field_speed="1",
    .reception_time="0",.emission_lower="-20",.far_field_enclosure_fraction="0.5",
    .acceleration_tolerance="0.001",.transmitter_count=3});
  if(group.status!="certified_enclosed") throw std::runtime_error("known group not certified");
  e::ExactPairCertificate marker{};
  marker.schema=e::kMatchedPairMemberMarkerSchema;
  marker.row_id=group.group_id+"/member/plus";
  marker.receiver_history_id=receiver.history_id();
  marker.transmitter_history_id=plus.history_id();
  marker.receiver_history_fingerprint=receiver.provenance_fingerprint();
  marker.transmitter_history_fingerprint=plus.provenance_fingerprint();
  marker.reception_time="0";marker.searched_lower="-20";marker.searched_upper="0";
  marker.field_speed="1";marker.root_tolerance="1e-12";marker.status="certified_enclosed";
  e::NativePairAccelerationRequest request{
    .row_id=marker.row_id,.receiver_path_id="receiver",.transmitter_path_id="plus",
    .receiver_history=&receiver,.transmitter_history=&plus,.root_certificate=&marker,
    .matched_pair_enclosure=&group,.receiver_charge="1",.transmitter_charge="1",
    .coupling="1",.chart="matched_pair_enclosure",.acceleration_tolerance="0.001"};
  auto known=e::certify_pair_acceleration(request);
  if(known.rows.size()!=1||known.rows[0].acceptance_status!="consumed_certified_matched_pair_group")
    throw std::runtime_error("known consumer did not accept the genuine group");
  const double exact_original=320000000.0/15999992000001.0;
  const auto bound=known.rows[0].acceleration[2];
  if(!(bound.lower()<=exact_original && exact_original<=bound.upper()))
    throw std::runtime_error("known static pair value escaped");
  std::cout<<"Known consumer control passed BEFORE mutation targets: genuine group accepted and static pair 320000000/15999992000001 contained.\n";
  const auto report=[&](const char* name,const e::NativePairAccelerationRequest& altered,double exact){
    const auto output=e::certify_pair_acceleration(altered);
    const bool accepted=output.rows.size()==1 && output.rows[0].acceptance_status=="consumed_certified_matched_pair_group";
    const bool contained=accepted && output.rows[0].acceleration[2].lower()<=exact && exact<=output.rows[0].acceleration[2].upper();
    std::cout<<std::setprecision(17)<<"{\"target\":\""<<name<<"\",\"accepted\":"<<(accepted?"true":"false")
      <<",\"knownTruePairValue\":"<<exact<<",\"contained\":"<<(contained?"true":"false")<<"}\n";
  };
  request.coupling="2";
  report("changed_coupling",request,2*exact_original);
  request.coupling="1";request.receiver_charge="2";
  report("changed_receiver_charge",request,2*exact_original);
  request.receiver_charge="1";request.acceleration_tolerance="1e-8";
  report("changed_budget",request,exact_original);
}
