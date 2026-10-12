// Independent scratch-candidate probes. Known static case precedes targets.
#include "validated_far_step_candidate_v2.hpp"
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
  auto known=producer.step({path("r","0"),path("s","10")},nullptr,"0","0.0078125","0.001",vfs::Budgets{1e-8,1e-8});
  assert(known.status=="certified");
  assert(known.paths[0].acceleration[2].lower() <= -1e-5 && known.paths[0].acceleration[2].upper() >= -1e-5);
  std::cout<<"Known static acceleration -1/100000 contained BEFORE targets.\n";
  for(const std::string initial:{"0.1","1.2345678901234567","0.33333333333333331"}) {
    std::vector<vfs::Path> paths{path("r",initial,"0.12345678901234567"),path("s","10")};
    auto sections=paths[0].history.endpoint_state_hull();
    auto c=producer.step(paths,nullptr,"0","0.125","0",std::nullopt);
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
  auto epoch=producer.step({path("r","0","0","10000000000","9999999980"),path("s","10","0","10000000000","9999999980")},nullptr,"10000000000","0.0002987","0",std::nullopt);
  std::cout<<"{\"case\":\"exact_time_extent\",\"status\":\""<<epoch.status<<"\",\"start\":\""<<epoch.start<<"\",\"h\":\""<<epoch.step<<"\",\"end\":\""<<epoch.end<<"\"}\n";
  static_assert(!std::is_default_constructible_v<e::ValidatedPopulationEvidence>);
  std::vector<vfs::Path> base{path("r","0"),path("s","10")};
  auto grown=producer.extend(base,known);
  auto second=producer.step(grown,known.evidence,known.end,"0.0078125","0.001",vfs::Budgets{1e-8,1e-8});
  assert(second.status=="certified");
  std::cout<<"Known sealed evidence admits genuine inherited continuation BEFORE evidence mutations.\n";
  auto missing=producer.step(grown,nullptr,known.end,"0.0078125","0.001",std::nullopt);
  assert(missing.code=="VFS-H0-01" && missing.evidence==nullptr);
  auto coupling=producer.step(grown,known.evidence,known.end,"0.0078125","0.002",std::nullopt);
  assert(coupling.code=="VFS-H0-01" && coupling.evidence==nullptr);
  auto changed=grown;changed[1].charge="2";
  auto charge=producer.step(changed,known.evidence,known.end,"0.0078125","0.001",std::nullopt);
  assert(charge.code=="VFS-H0-01" && charge.evidence==nullptr);
  changed=grown;
  changed[1].history=e::RetainedHistory("s",{
    e::CubicHistorySegment("-20","-10",{{{"0","0","0","0"},{"0","0","0","0"},{"10.1","-0.02","0.001","0"}}}),
    e::CubicHistorySegment("-10","0",z("10"))}).appended(*known.paths[1].segment);
  auto ancestor=producer.step(changed,known.evidence,known.end,"0.0078125","0.001",std::nullopt);
  assert(ancestor.code=="VFS-H0-01" && ancestor.evidence==nullptr);
  bool append_refused=false;
  try {producer.extend(changed,known);} catch(const std::invalid_argument&) {append_refused=true;}
  assert(append_refused);
  std::cout<<"Independent sealed evidence probes pass: genuine inheritance, missing evidence, changed coupling, changed charge, C1-compatible changed ancestor, misapplied append.\n";
}
