#include "architrino/eom/CertifiedAcceleration.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"
#include <boost/property_tree/json_parser.hpp>
#include <boost/property_tree/ptree.hpp>
#include <array>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

namespace eom = architrino::eom;
using Tree = boost::property_tree::ptree;

void require(bool value, const char* message) {
  if (!value) throw std::runtime_error(message);
}

eom::CubicHistorySegment parse_segment(const Tree& raw) {
  eom::CubicCoefficientTokens c;
  eom::HistoryErrorTokens ep, ev;
  std::size_t axis=0;
  for(const auto& row:raw.get_child("coefficients")) {
    require(axis<3,"too many coefficient rows");std::size_t k=0;
    for(const auto& token:row.second) {
      require(k<4,"too many coefficients");c[axis][k++]=token.second.get_value<std::string>();
    }
    require(k==4,"wrong coefficient count");++axis;
  }
  require(axis==3,"wrong axis count");
  axis=0;for(const auto& x:raw.get_child("positionErrors")) {require(axis<3,"position error count");ep[axis++]=x.second.get_value<std::string>();}
  require(axis==3,"position error count");
  axis=0;for(const auto& x:raw.get_child("velocityErrors")) {require(axis<3,"velocity error count");ev[axis++]=x.second.get_value<std::string>();}
  require(axis==3,"velocity error count");
  return {raw.get<std::string>("startTime"),raw.get<std::string>("endTime"),c,ep,ev};
}

eom::NativePairAccelerationCertificate evaluate(
    const std::string& id,const eom::RetainedHistory& receiver,
    const eom::RetainedHistory& source,const std::string& reception,
    const std::string& root_tolerance,const std::string& tolerance,
    const std::string& source_charge="1",
    const eom::ExactPairCertificate* analytical_root=nullptr) {
  const auto root=analytical_root!=nullptr ? *analytical_root : eom::certify_exact_pair({.row_id=id,.receiver=&receiver,.source=&source,
    .reception_time=reception,.search_lower=receiver.segments().pin(0)->t_start_token(),
    .search_upper=reception,.field_speed="1",.root_tolerance=root_tolerance,
    .max_depth=256,.max_cells=100000,.initial_mpfr_bits=128,.maximum_mpfr_bits=512});
  if(root.status!="certified_complete"||!root.root_free_complement||root.memory_boundary_contact)
    throw std::runtime_error(id+": fresh ordinary root census not certified: "+root.failure_code+" "+root.diagnostic_detail);
  const auto pair=eom::certify_pair_acceleration({.row_id=id,.receiver_path_id=receiver.history_id(),
    .transmitter_path_id=source.history_id(),.receiver_history=&receiver,.transmitter_history=&source,
    .root_certificate=&root,.receiver_charge="1",.transmitter_charge=source_charge,.coupling="1",
    .chart="sharp",.transmitter_factor_floor="1e-12",.acceleration_tolerance=tolerance});
  require(pair.status=="active"&&pair.total_acceleration.has_value(),"sharp pair not certified");
  return pair;
}

void print(const eom::NativePairAccelerationCertificate& pair) {
  std::cout<<"{\"id\":\""<<pair.row_id<<"\",\"status\":\""<<pair.status<<"\",\"roots\":"<<pair.rows.size()<<",\"rows\":[";
  bool first=true;for(const auto& row:pair.rows) {
    if(!first)std::cout<<',';first=false;
    std::cout<<"{\"route\":\""<<row.acceleration_precision_route<<"\",\"emission\":[\""<<row.emission_lower<<"\",\""<<row.emission_upper<<"\"],\"acceleration\":[";
    for(std::size_t a=0;a<3;++a){if(a)std::cout<<',';std::cout<<'['<<row.acceleration[a].lower()<<','<<row.acceleration[a].upper()<<']';}
    std::cout<<"]}";
  }
  std::cout<<"],\"total\":[";
  for(std::size_t a=0;a<3;++a){if(a)std::cout<<',';std::cout<<'['<<(*pair.total_acceleration)[a].lower()<<','<<(*pair.total_acceleration)[a].upper()<<']';}
  std::cout<<"]}";
}

void known() {
  // The target segment parser first consumes an independently specified
  // linear source with Y(s)=2+2s on [-4,0]. Its two causal roots are -2
  // and -2/3, with same-polarity contributions +1/4 and -3/4.
  std::istringstream stream(R"({"startTime":"-4","endTime":"0","coefficients":[["-6","2","0","0"],["0","0","0","0"],["0","0","0","0"]],"positionErrors":["0","0","0"],"velocityErrors":["0","0","0"]})");
  Tree raw;boost::property_tree::read_json(stream,raw);
  const eom::CubicCoefficientTokens zero{{{"0","0","0","0"},{"0","0","0","0"},{"0","0","0","0"}}};
  const eom::CubicCoefficientTokens two{{{"2","0","0","0"},{"0","0","0","0"},{"0","0","0","0"}}};
  const eom::RetainedHistory origin("origin",{{"-4","0",zero}});
  const eom::RetainedHistory fixed("fixed",{{"-4","0",two}});
  const eom::RetainedHistory linear("linear",{parse_segment(raw)});
  auto stationary=evaluate("static-minus-quarter",fixed,origin,"0","1e-8","1e-9","-1");
  auto negative=evaluate("linear-two-root-negative-D",origin,linear,"0","1e-8","1e-9");
  require(stationary.rows.size()==1&&(*stationary.total_acceleration)[0].lower()<=-.25&&(*stationary.total_acceleration)[0].upper()>=-.25,"static analytical value missed");
  require(negative.rows.size()==2&&(*negative.total_acceleration)[0].lower()<=-.5&&(*negative.total_acceleration)[0].upper()>=-.5,"linear two-root analytical total missed");
  bool negative_hit=false;
  for(const auto& row:negative.rows)if(row.transmitter_factor->upper()<0){
    negative_hit=true;require(row.acceleration[0].lower()<=.25&&row.acceleration[0].upper()>=.25,"negative-D per-hit analytical value missed");
  }
  require(negative_hit,"negative-D root omitted");
  const eom::HistoryErrorTokens ep{"1e-6","0","0"},ev{"1e-6","0","0"},none{"0","0","0"};
  const eom::RetainedHistory uncertain_receiver("uncertain-receiver",{{"-4","0",zero,ep,none}});
  const eom::RetainedHistory uncertain_source("uncertain-source",{{"-4","0",linear.segments().pin(0)->coefficient_tokens(),ep,ev}});
  // This analytical certificate supplies the two complete perturbed linear
  // root boxes directly. |receiver error - source error| <= 2e-6 moves the
  // far root by at most 2e-6 and the near root by at most 2e-6/3; the signed
  // derivative floors remain at least .999999 and 2.999999. It tests the
  // acceleration encloser, not uncertain-history root enumeration.
  auto analytical=eom::certify_exact_pair({.row_id="known-linear",.receiver=&origin,.source=&linear,
    .reception_time="0",.search_lower="-4",.search_upper="0",.field_speed="1",
    .root_tolerance="1e-8",.max_depth=256,.max_cells=100000});
  analytical.row_id="analytical-uncertain-linear";
  analytical.receiver_history_id=uncertain_receiver.history_id();
  analytical.transmitter_history_id=uncertain_source.history_id();
  analytical.receiver_history_fingerprint=uncertain_receiver.provenance_fingerprint();
  analytical.transmitter_history_fingerprint=uncertain_source.provenance_fingerprint();
  analytical.root_tolerance="1e-3";
  analytical.roots={{"-2.00001","-1.99999","-1.000001","-0.999999","1","1",-1,{0},"analytical_linear_error_ball",53},
    {"-0.66668","-0.66665","2.999999","3.000001","1","1",1,{0},"analytical_linear_error_ball",53}};
  auto uncertain=evaluate("negative-D-input-ball",uncertain_receiver,uncertain_source,"0","1e-3","1e-3","1",&analytical);
  require(uncertain.rows.size()==2,"uncertainty-ball root count changed");
  // Exact rational corner values; the separately authored Python interval
  // checker verifies enclosure of the whole closed analytic range.
  for(const auto& row:uncertain.rows)for(const double r:{2.-2e-6,2.+2e-6})for(const double e:{-1e-6,1e-6}){
    const double value=row.transmitter_factor->upper()<0 ? 1/(r*r*(1+e)) : -9/(r*r*(3+e));
    require(row.acceleration[0].lower()<=value&&row.acceleration[0].upper()>=value,"uncertainty-ball per-hit analytical corner missed");
  }
  std::cout<<"{\"passed\":true,\"stage\":\"known\",\"cases\":[";print(stationary);std::cout<<',';print(negative);std::cout<<',';print(uncertain);std::cout<<"]}\n";
}

eom::RetainedHistory load_history(const std::string& id,const Tree& handoff,const Tree& response) {
  std::vector<eom::CubicHistorySegment> segments;
  for(const auto& member:handoff.get_child("members"))if(member.second.get<std::string>("pathId")==id)
    for(const auto& segment:member.second.get_child("segments"))segments.push_back(parse_segment(segment.second));
  require(segments.size()==4096,"initial segment count changed");
  for(const auto& member:response.get_child("publishedExtensions"))if(member.second.get<std::string>("pathId")==id)
    for(const auto& segment:member.second.get_child("segments"))segments.push_back(parse_segment(segment.second));
  return {id,std::move(segments)};
}

int main(int argc,char** argv) {
  std::cout<<std::setprecision(17);
  try{
    require(argc>=2,"known or target required");
    const std::string stage=argv[1];
    if(stage=="known")known();
    else if(stage=="target"){
      require(argc==4,"target requires handoff and response paths");
      Tree handoff,response;boost::property_tree::read_json(argv[2],handoff);boost::property_tree::read_json(argv[3],response);
      const auto rec=load_history("b13-0",handoff,response),src=load_history("b13-3",handoff,response);
      const auto reception=response.get<std::string>("acceptedEndTime");
      require(reception=="0.0029296875","wrong retained diagnostic endpoint");
      const auto forward=evaluate("retained-antipodal-0-3",rec,src,reception,"2e-8","8e-6","-1");
      const auto reverse=evaluate("retained-antipodal-3-0",src,rec,reception,"2e-8","8e-6","-1");
      require(forward.rows.size()==3&&reverse.rows.size()==3,"antipodal root count changed");
      std::cout<<"{\"passed\":true,\"stage\":\"target-diagnostic\",\"evolutionExecuted\":false,\"cases\":[";print(forward);std::cout<<',';print(reverse);std::cout<<"]}\n";
    }else throw std::runtime_error("unknown stage");
    return 0;
  }catch(const std::exception& error){std::cerr<<error.what()<<'\n';return 1;}
}
