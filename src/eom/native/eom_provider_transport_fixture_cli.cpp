#include "architrino/eom/ProviderTransport.hpp"
#include "architrino/eom/SpeedDomain.hpp"
#include "architrino/eom/Checkpoint.hpp"
#include <iostream>
#include <stdexcept>

namespace e = architrino::eom;
namespace {
void check(bool value, const std::string& message) { if (!value) throw std::runtime_error(message); }
e::RetainedHistory polynomial(const std::string& b, const std::string& error="0") {
  return e::RetainedHistory("known-polynomial", {e::CubicHistorySegment("0","1",
    {{{"0",b,"1.5","-1"},{"0","0","0","0"},{"0","0","0","0"}}}, {"0","0","0"},{error,"0","0"})});
}
e::NativeCoupledEvolutionRequest request(const std::string& kind) {
  e::NativeCoupledEvolutionRequest r;
  r.run_id="stage-c";
  r.equation_selection=e::EquationSelection{"canonical-surface/v1","strict","halt","surface","numerical"};
  r.surface_geometry.emplace();r.surface_geometry->kind=kind;
  r.surface_geometry->flattening=kind=="oblate"?"0.5":"1";
  r.paths={{"a","1",e::RetainedHistory::uniform_circular("a",{
    .t_start="-4",.t_end="0",.maximum_segment_step="0.05",
    .cylindrical_radius=kind=="ring-torus"?"3":"1",.height="0",
    .angular_speed=kind=="ring-torus"?"0.1":"0.5",
    .tangential_speed=kind=="ring-torus"?"0.3":"0.5",.phase="0"})}};
  r.start_time="0";r.end_time="0.04";r.initial_step="0.02";r.minimum_step="0.00125";r.maximum_step="0.02";
  r.field_speed="1";r.coupling="1";r.root_tolerance="1e-8";
  r.acceleration_tolerance="1e-4";r.position_tolerance="1e-4";r.velocity_tolerance="1e-4";r.correction_tolerance="1e-4";
  r.surface_numerics.position_tolerance="1e-4";r.surface_numerics.tangent_velocity_tolerance="1e-4";
  r.max_step_attempts=100;r.max_rejected_steps=20;return r;
}
void parity(e::NativeCoupledEvolutionRequest r,std::size_t split) {
  const auto full=e::evolve_native_coupled_histories(r);
  check(full.status=="completed","uninterrupted control failed: "+full.halt_code);
  std::size_t accepted=0;
  r.accepted_step_callback=[&](std::size_t n,const std::string&){accepted=n;};
  r.cancellation_requested=[&]{return accepted==split;};
  const auto prefix=e::evolve_native_coupled_histories(r);
  check(prefix.status=="halted" && prefix.accepted_step_count==split,"cancellation prefix mismatch");
  const auto cp=e::create_provider_checkpoint(r,prefix);
  r.accepted_step_callback={};r.cancellation_requested={};
  const auto resumed=e::resume_provider_checkpoint(r,cp,r.end_time);
  check(resumed.status=="completed" && resumed.accepted_step_count==full.accepted_step_count,"restart count mismatch");
  for(std::size_t i=0;i<full.histories.size();++i)
    check(full.histories[i].history.provenance_fingerprint()==resumed.histories[i].history.provenance_fingerprint(),"restart exact history mismatch");
  auto changed=r;changed.surface_numerics.position_tolerance="2e-4";
  bool rejected=false;try{(void)e::resume_provider_checkpoint(changed,cp,r.end_time);}catch(const e::EquationAdmissionError&){rejected=true;}
  check(rejected,"changed numerical binding accepted");
  auto corrupt=prefix;corrupt.histories[0].validated_evidence.reset();
  rejected=false;try{(void)e::create_provider_checkpoint(r,corrupt);}catch(const e::EquationAdmissionError&){rejected=true;}
  check(rejected,"missing Surface carrier persisted");
  auto empty=r;empty.paths.clear();auto no_paths=prefix;no_paths.histories.clear();
  rejected=false;try{(void)e::create_provider_checkpoint(empty,no_paths);}catch(const e::EquationAdmissionError&){rejected=true;}
  check(rejected,"empty Surface checkpoint persisted");
  rejected=false;try{(void)e::resume_provider_checkpoint(empty,cp,r.end_time);}catch(const e::EquationAdmissionError&){rejected=true;}
  check(rejected,"empty Surface restart admitted");
  std::cout<<r.surface_geometry->kind<<" restart exact fingerprints matched at split="<<split<<" steps="<<full.accepted_step_count<<'\n';
}
}
int main() {
  try {
    const e::EquationSelection strict{"canonical/v1","strict","halt","none","numerical"};
    auto inclusive=strict;inclusive.speed_domain="inclusive";
    // Independent exact derivative: b+3t-3t^2 = b+0.75-3(t-0.5)^2.
    check(e::certify_speed_domain(polynomial("0.2"),strict).certified,"known safe peak rejected");
    check(!e::certify_speed_domain(polynomial("0.5"),strict).certified,"interior peak above 1 accepted");
    check(!e::certify_speed_domain(polynomial("0.25"),strict).certified,"strict contact accepted");
    check(!e::certify_speed_domain(polynomial("0.2","0.06"),inclusive).certified,"velocity error ignored");
    const auto constant=[](const std::string& x,const std::string& y){return e::RetainedHistory("linear",{e::CubicHistorySegment("0","1",{{{"0",x,"0","0"},{"0",y,"0","0"},{"0","0","0","0"}}})});};
    check(e::certify_speed_domain(constant("0.6","0.8"),inclusive).certified,"exact inclusive multiaxis equality rejected");
    check(!e::certify_speed_domain(constant("0.6","0.8"),strict).certified,"strict multiaxis equality accepted");
    check(!e::certify_speed_domain(constant("1.0000000000000000000001","0"),inclusive).certified,"decimal violation rounded into domain");
    std::cout<<"independent dense polynomial, multiaxis equality and decimal/error controls passed before solver targets\n";
    auto selected=request("sphere");selected.surface_geometry.reset();selected.equation_selection=strict;
    bool v7_rejected=false;try{(void)e::native_evolution_model_fingerprint(selected);}catch(const e::EquationAdmissionError&){v7_rejected=true;}
    check(v7_rejected,"restricted canonical selection relabelled into v7");
    selected.joint_root_point_states.emplace("unsupported",e::JointRootBracketRequest{});
    bool joint_rejected=false;try{(void)e::create_provider_checkpoint(selected,e::NativeCoupledEvolutionCertificate{});}catch(const e::EquationAdmissionError& error){joint_rejected=error.code()=="unsupported_model_combination";}
    check(joint_rejected,"unbound typed joint state persisted in v8");
    joint_rejected=false;try{(void)e::resume_provider_checkpoint(selected,"{}",selected.end_time);}catch(const e::EquationAdmissionError& error){joint_rejected=error.code()=="unsupported_model_combination";}
    check(joint_rejected,"unbound typed joint restart admitted in v8");
    for(const std::string kind:{"sphere","oblate","ring-torus"})parity(request(kind),1);
    auto r=request("sphere");r.surface_geometry->radius="0.1";r.paths.clear();r.coupling="0.000001";r.root_tolerance="1e-5";
    r.end_time="0.25";r.initial_step="0.01";r.maximum_step="0.01";
    for(const std::string id:{"a","b"})r.paths.push_back({id,id=="a"?"1":"-1",e::RetainedHistory::uniform_circular(id,{
      .t_start="-0.5",.t_end="0",.maximum_segment_step="0.02",.cylindrical_radius="0.1",.height="0",.angular_speed="0.1",.tangential_speed="0.01",.phase=id=="a"?"0":"3.141592653589793"})});
    parity(r,22);
    const auto duplicates=e::execute_eom_v2_request("{\"operation\":\"capabilities\",\"oper\\u0061tion\":\"inspect\"}");
    check(duplicates.find("duplicate_json_key")!=std::string::npos,"escaped duplicate was accepted");
    std::cout<<"v2 duplicate guard and computed-source continuation passed\n";
  }catch(const std::exception& error){std::cerr<<error.what()<<'\n';return 1;}
}
