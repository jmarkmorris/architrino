#include "architrino/eom/EquationRegistry.hpp"
#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/ProviderTransport.hpp"
#include "architrino/eom/MultiprecisionAcceleration.hpp"
#include "architrino/eom/SharpAccelerationSensitivity.hpp"
#include <iostream>
#include <iomanip>
#include <stdexcept>

namespace e = architrino::eom;
namespace {
bool contains(const e::Interval& i, double x) { return i.lower() <= x && x <= i.upper(); }
void check(bool value, const std::string& message) { if (!value) throw std::runtime_error(message); }
e::RetainedHistory affine(const std::string& id, const std::string& x, const std::string& vy="0") {
  return e::RetainedHistory(id, {e::CubicHistorySegment("-2", "0", e::CubicCoefficientTokens{{
    {x,"0","0","0"}, {vy=="0"?"0":"-1.2",vy,"0","0"}, {"0","0","0","0"}}})});
}
e::NativeCoupledEvolutionRequest request() {
  e::NativeCoupledEvolutionRequest r;
  r.run_id="logarithmic-qualification";
  r.equation_selection.emplace();r.equation_selection->composition_id="logarithmic/v1";
  r.paths={{"left","1",affine("left","-0.1")},{"right","-1",affine("right","0.1")}};
  r.field_speed="1";r.coupling="0.0001";r.start_time="0";r.end_time="0.25";
  r.initial_step="0.03125";r.maximum_step="0.03125";r.minimum_step="0.0078125";
  r.root_tolerance="1e-9";r.acceleration_tolerance="1e-5";
  r.position_tolerance="1e-6";r.velocity_tolerance="1e-6";r.correction_tolerance="1e-6";
  r.max_step_attempts=64;r.max_rejected_steps=16;
  r.memory_budget_bytes=1024ULL*1024ULL*1024ULL;
  return r;
}
template<class F> void refuses(F f) {try{f();}catch(const e::EquationAdmissionError&){return;}throw std::runtime_error("unsupported combination admitted");}
}
int main() {
 try {
  // Independent reference: derivative of K x/|x|^2 at x=(2,0,0).
  const auto z=e::Interval::point(0), one=e::Interval::point(1);
  const e::IntervalVector zero{z,z,z};
  const std::array<e::IntervalVector,3> basis{{{one,z,z},{z,one,z},{z,z,one}}}, zeros{zero,zero,zero};
  const auto sensitivity=e::certify_sharp_acceleration_sensitivity({
    .displacement={e::Interval::point(2),z,z},.transmitter_velocity=zero,.transmitter_acceleration=zero,
    .receiver_position_coefficients=basis,.transmitter_position_coefficients=zeros,.transmitter_velocity_coefficients=zeros,
    .radial_kernel=e::RadialKernel::logarithmic_inverse_distance});
  check(sensitivity.certified && contains(sensitivity.acceleration[0],0.5),"stationary acceleration closed form");
  for(std::size_t i=0;i<3;++i)for(std::size_t j=0;j<3;++j)
    check(contains(sensitivity.acceleration_coefficients[j][i],i==j?(i==0?-0.25:0.25):0),"stationary Jacobian closed form");
  const auto moving_sensitivity=e::certify_sharp_acceleration_sensitivity({
    .displacement={one,e::Interval::point(.75),z},.transmitter_velocity={z,e::Interval::decimal_token("0.6"),z},.transmitter_acceleration=zero,
    .certified_transmitter_factor=e::Interval::decimal_token("0.64"),
    .receiver_position_coefficients=basis,.transmitter_position_coefficients=zeros,.transmitter_velocity_coefficients=zeros,
    .radial_kernel=e::RadialKernel::logarithmic_inverse_distance});
  const double moving_j[3][3]={{-1,-.75,0},{-.75,1,0},{0,0,1}};
  check(moving_sensitivity.certified,"moving derivative not certified");
  for(std::size_t i=0;i<3;++i)for(std::size_t j=0;j<3;++j)
    check(contains(moving_sensitivity.acceleration_coefficients[j][i],moving_j[i][j]),"moving-source implicit-root Jacobian");
  std::cout<<"known stationary and moving-source acceleration/Jacobian cases passed\n"<<std::flush;
  e::NativePairAccelerationRequest unsupported_mpfr{};unsupported_mpfr.radial_kernel=e::RadialKernel::logarithmic_inverse_distance;
  const auto declined_mpfr=e::certify_mpfr_finite_width_acceleration(unsupported_mpfr,128);
  check(!declined_mpfr.certified && declined_mpfr.failure_code=="unsupported_logarithmic_finite_width_acceleration","canonical MPFR kernel was used for logarithmic selection");
  auto r=request();std::vector<e::NativePublishedPath> histories;
  for(const auto& p:r.paths)histories.push_back({p.path_id,p.history});
  auto snap=e::certify_native_acceleration_snapshot(r,histories,"0");
  check(snap.status=="certified_complete",snap.failure_code);
  check(contains(snap.acceleration.receiver_totals[0].acceleration[0],0.0005),"static logarithmic pair sign/normalization");
  auto canonical=r;canonical.equation_selection.reset();
  const auto cs=e::certify_native_acceleration_snapshot(canonical,histories,"0");
  check(cs.status=="certified_complete" && contains(cs.acceleration.receiver_totals[0].acceleration[0],0.0025),"canonical inverse-square known case");
  check(e::equation_snapshot_identity(r)!=e::equation_snapshot_identity(canonical),"model cache collision");
  refuses([&]{auto q=r;q.use_quarter_step_publication=true;(void)e::require_equation_provider(q);});
  refuses([&]{auto q=r;q.joint_state_fallback_already_applied=true;(void)e::require_equation_provider(q);});
  refuses([&]{auto q=r;q.error_bound_checking="none";(void)e::require_equation_provider(q);});
  refuses([&]{auto q=r;q.chart_policy="finite_width";(void)e::require_equation_provider(q);});
  refuses([&]{auto q=r;q.far_field_enclosure_fraction="0.1";(void)e::require_equation_provider(q);});
  refuses([&]{auto q=r;q.equation_selection->constraint="surface";(void)e::require_equation_provider(q);});
  refuses([&]{auto q=r;q.integration_method="canonical_validated_far_step_evolution/v1";(void)e::require_equation_provider(q);});
  refuses([&]{(void)e::create_native_evolution_checkpoint(r,e::NativeCoupledEvolutionCertificate{});});
  // Analytic causal geometry: source (0,0.6s), receiver (1,0,0), T=0.
  // s=-1.25, r=1.25, D_t=.64, logarithmic row=(1,.75,0).
  auto moving=request();moving.coupling="1";moving.acceleration_tolerance="1e-6";
  moving.paths={{"receiver","1",affine("receiver","1")},{"source","1",affine("source","0","0.6")}};
  histories.clear();for(const auto& p:moving.paths)histories.push_back({p.path_id,p.history});
  snap=e::certify_native_acceleration_snapshot(moving,histories,"0");
  check(snap.status=="certified_complete",snap.failure_code);
  const auto& row=snap.acceleration.pair_certificates[1].rows.at(0);
  check(contains(row.acceleration[0],1) && contains(row.acceleration[1],.75),"moving-source closed form");
  auto receiver_motion=moving;
  receiver_motion.paths={{"receiver","1",e::RetainedHistory("receiver",{e::CubicHistorySegment("-2","0",e::CubicCoefficientTokens{{{"-0.2","0.6","0","0"},{"0","0","0","0"},{"0","0","0","0"}}})})},{"source","1",affine("source","0")}};
  histories.clear();for(const auto& p:receiver_motion.paths)histories.push_back({p.path_id,p.history});
  const auto receiver_snap=e::certify_native_acceleration_snapshot(receiver_motion,histories,"0");
  check(receiver_snap.status=="certified_complete",receiver_snap.failure_code);
  check(contains(receiver_snap.acceleration.pair_certificates[1].rows.at(0).acceleration[0],1),"receiver speed incorrectly multiplies acceleration");
  std::cout<<"known moving-root, receiver-speed and canonical controls passed\n"<<std::flush;
  const auto c=e::evolve_native_coupled_histories(r);
  check(c.status=="completed",c.halt_code+" accepted="+c.accepted_end_time);
  check(c.accepted_step_count>1 && c.histories[0].validated_evidence,"missing validated generated history");
  bool generated=false;
  for(const auto& step:c.steps)for(const auto& s:step.retained_solutions)for(const auto& root:s.partner_roots)
    generated=generated||!root.analytic_source_acceleration;
  check(generated,"qualification did not consume computed history");
  // Independent scalar comparison theorem in the solver manuscript: for this
  // pair 0.0005 <= inward acceleration <= 0.000501 throughout [0,.25].
  // Its integral encloses the true endpoint. Numerical tubes must intersect
  // that independent enclosure and be narrower than the displacement.
  const auto state=c.histories[1].history.endpoint_state_hull();
  const e::Interval expected_x(.1-.5*.000501*.25*.25,.1-.5*.0005*.25*.25);
  const e::Interval expected_v(-.000501*.25,-.0005*.25);
  check(state.position[0].intersection(expected_x).has_value() && state.velocity[0].intersection(expected_v).has_value(),"independent scalar comparison endpoint");
  check(state.position[0].width()<1e-6 && state.velocity[0].width()<1e-6,"endpoint widths");
  std::cout<<"bounded coupled computed-history evolution passed; steps="<<c.accepted_step_count<<"\n"<<std::flush;
  auto circle_request=r;
  circle_request.paths={{"circle","1",e::RetainedHistory::uniform_circular("circle",{"-2","0","0.05","0.1","0","0.1","0.01","0"})}};
  const auto released_circle=e::evolve_native_coupled_histories(circle_request);
  check(released_circle.status=="completed","circular preparation did not release");
  const auto circular_state=released_circle.histories[0].history.endpoint_state_hull();
  check(contains(circular_state.position[0],.1) && contains(circular_state.position[1],.0025) && contains(circular_state.velocity[1],.01),"self-free circular preparation did not release along its exact tangent");
  std::cout<<"circular preparation exact tangent-release control passed\n";
  const auto checkpoint=e::create_provider_checkpoint(r,c);
  const auto resumed=e::resume_provider_checkpoint(r,checkpoint,"0.3125");
  auto uninterrupted_request=r;uninterrupted_request.end_time="0.3125";
  const auto uninterrupted=e::evolve_native_coupled_histories(uninterrupted_request);
  check(resumed.status=="completed" && uninterrupted.status=="completed","resume/uninterrupted endpoint");
  for(std::size_t i=0;i<r.paths.size();++i)
    check(resumed.histories[i].history.provenance_fingerprint()==uninterrupted.histories[i].history.provenance_fingerprint(),"resumed retained history differs");
  refuses([&]{auto q=r;q.coupling="0.0002";(void)e::resume_provider_checkpoint(q,checkpoint,"0.3125");});
  refuses([&]{auto q=r;q.equation_selection->composition_id="canonical/v1";(void)e::resume_provider_checkpoint(q,checkpoint,"0.3125");});
  auto refined_request=r;refined_request.initial_step="0.015625";refined_request.maximum_step="0.015625";
  const auto refined=e::evolve_native_coupled_histories(refined_request);
  check(refined.status=="completed","refinement failed");
  const auto refined_state=refined.histories[1].history.endpoint_state_hull();
  check(refined_state.position[0].intersection(state.position[0]).has_value() && refined_state.velocity[0].intersection(state.velocity[0]).has_value(),"refinement enclosures disagree");
  check(refined_state.position[0].width()<state.position[0].width() && refined_state.velocity[0].width()<state.velocity[0].width(),"refinement did not narrow bounds");
  std::cout<<"checkpoint replay, model refusals and refinement passed\n";
  std::cout<<std::setprecision(17)<<"right endpoint x=["<<state.position[0].lower()<<","<<state.position[0].upper()<<"]\n";
 }catch(const std::exception& ex){std::cerr<<ex.what()<<'\n';return 1;}
}
