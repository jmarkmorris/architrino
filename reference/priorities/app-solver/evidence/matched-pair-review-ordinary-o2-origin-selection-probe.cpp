// Independent caller-origin binding probe; reuses only the separately
// authored exact static input, not an implementation-derived oracle.
#define main replay_seal_probe_unused_main
#include "matched-pair-review-ordinary-o2-replay-seal-probe.cpp"
#undef main
#include "architrino/eom/EquationPlan.hpp"
#include <boost/json.hpp>
#include <algorithm>
namespace j=boost::json;
j::value sorted(const j::value& v){
  if(v.is_object()){
    std::vector<std::string> names;
    for(const auto& x:v.as_object())names.emplace_back(x.key());
    std::sort(names.begin(),names.end());j::object out;
    for(const auto& key:names)out[key]=sorted(v.as_object().at(key));
    return out;
  }
  if(v.is_array()){j::array out;for(const auto& x:v.as_array())out.push_back(sorted(x));return out;}
  return v;
}
std::string canonical(const j::value& v){return j::serialize(sorted(v));}
std::string reseal(j::object o){o.erase("digest");o["digest"]=e::equation_identity_sha256(canonical(o));return canonical(o);}
int main(){
  if(e::equation_identity_sha256("abc")!="ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"||
     canonical(j::parse("{\"b\":2,\"a\":1}"))!="{\"a\":1,\"b\":2}")
    throw std::runtime_error("known digest or canonicalization failed");
  std::cout<<"KNOWN SHA256 abc and sorted object PASS"<<std::endl;
  auto r=input();auto run=e::evolve_native_coupled_histories(r);
  auto cp=e::create_validated_provider_checkpoint(r,run);
  if(reseal(j::parse(cp).as_object())!=cp)throw std::runtime_error("known checkpoint reseal failed");
  auto id=e::validated_run_record_identity(run.validated_continuation->record()->serialize());
  auto good=e::resume_validated_provider_checkpoint(r,cp,"0.015625",1,id);
  if(good.run.status!="completed"||good.run.accepted_step_count!=2||good.identity_basis!="expected_record")
    throw std::runtime_error("known original selected restart failed");
  std::cout<<"KNOWN self-reseal and original selected-record restart PASS"<<std::endl;
  auto other=r;
  e::CubicCoefficientTokens c{{{"0","0","0","0"},{"0","0","0","0"},{"15","0","0","0"}}};
  other.paths[1].history=e::RetainedHistory("s",{e::CubicHistorySegment("-20","0",c)});
  auto other_run=e::evolve_native_coupled_histories(other);
  auto other_cp=j::parse(e::create_validated_provider_checkpoint(other,other_run)).as_object();
  auto swapped=j::parse(cp).as_object();
  for(const auto key:{"acceptedTime","controllerStep","acceptedCount","rejectedCount","histories","providerState"})
    swapped.at(key)=other_cp.at(key);
  auto text=reseal(swapped);
  auto other_id=e::validated_run_record_identity(other_run.validated_continuation->record()->serialize());
  for(bool full:{false,true})try{
    auto result=e::resume_validated_provider_checkpoint(r,text,"0.015625",1,
      full?std::optional<std::string>{other_id}:std::nullopt);
    std::cout<<"TARGET unrelated-origin "<<(full?"expected_record":"expected_controls")
      <<" status="<<result.run.status<<" accepted="<<result.run.accepted_step_count
      <<" continuation="<<bool(result.request.validated.continuation)
      <<" retained_source_origin="<<result.request.paths[1].history.segments().front().coefficient_tokens()[2][0]
      <<" caller_source_origin="<<r.paths[1].history.segments().front().coefficient_tokens()[2][0]
      <<" basis="<<result.identity_basis<<std::endl;
  }catch(const std::exception& ex){
    std::cout<<"TARGET unrelated-origin "<<(full?"expected_record":"expected_controls")<<" refused="<<ex.what()<<std::endl;
  }
}
