#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/EquationRegistry.hpp"
#include <cmath>
#include <iostream>
#include <stdexcept>
using namespace architrino::eom;
int main(){
  // Independent stationary-source control on the unit sphere. Receiver (1,0,0),
  // transmitter (0,1,0), both positive: separation sqrt(2), source factor 1.
  // Tangent y acceleration is -1/(2 sqrt(2)) canonical, -1/2 logarithmic.
  const auto stationary=[](const std::string& id,const std::string& x,const std::string& y){
    return RetainedHistory(id,{CubicHistorySegment("-10","0",{{{x,"0","0","0"},{y,"0","0","0"},{"0","0","0","0"}}},"0","0")});
  };
  NativeCoupledEvolutionRequest r;
  r.run_id="surface-variant-known";r.surface_geometry.emplace();r.field_speed="1";r.coupling="1";
  r.start_time="0";r.end_time="0.000001";r.initial_step="0.000001";r.maximum_step="0.000001";r.minimum_step="0.000001";
  r.root_tolerance="1e-12";r.error_bound_checking="none";
  r.paths={{"receiver","1",stationary("receiver","1","0")},{"source","1",stationary("source","0","1")}};
  for(const auto& id:{"canonical-surface/v1","logarithmic-surface/v1"}){
    r.equation_selection=EquationSelection{id,"unrestricted","none","surface","numerical"};
    const auto result=evolve_native_coupled_histories(r);
    if(result.status!="completed"||result.exploratory_surface_diagnostics.empty())throw std::runtime_error("stationary known case did not complete");
    const double expected=std::string(id)=="canonical-surface/v1"?-1/(2*std::sqrt(2.)):-.5;
    const auto& d=result.exploratory_surface_diagnostics.front();
    if(std::abs(d.tangent_interaction[1].midpoint()-expected)>1e-10||std::abs(d.total_acceleration[1].midpoint()-expected)>1e-10)throw std::runtime_error("independent tangent acceleration failed");
    if(std::abs(d.tangent_interaction[0].midpoint())>1e-10)throw std::runtime_error("normal interaction was not projected out");
    std::cout<<"PASS "<<id<<" independent stationary-sphere tangent acceleration "<<expected<<'\n';
  }
}
