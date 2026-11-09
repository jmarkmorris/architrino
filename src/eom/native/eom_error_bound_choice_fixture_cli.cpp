#include "architrino/eom/DisplayEvaluation.hpp"
#include "architrino/eom/History.hpp"
#include <cmath>
#include <iostream>
#include <stdexcept>
using namespace architrino::eom;
int main(){
  // Independent sharp-kernel control: stationary source at x=2, receiver at
  // x=0 moving at -0.2. The source factor is 1, so acceleration is -1/4,
  // independent of receiver velocity. This distinguishes playback weighting.
  const auto history=[](const std::string& id,const std::string& x,const std::string& v){
    CubicCoefficientTokens coefficients{{{x,v,"0","0"},{"0","0","0","0"},{"0","0","0","0"}}};
    return RetainedHistory(id,{CubicHistorySegment("-10","0",coefficients,"0","0")});
  };
  // x(t)=-0.2*t uses coefficient 2 at the local origin t=-10.
  const auto receiver=history("receiver","2","-0.2");
  const auto source=history("source","2","0");
  DisplayEvaluationRequest r{.paths={{"receiver",1,&receiver},{"source",1,&source}},.reception_time=0,.field_speed=1,.coupling=1,.root_relative_tolerance=1e-12,.source_normal_floor=1e-12,.causal_width=.2,.core_scale=.2,.thread_count=1,.allow_regulation=false};
  auto result=evaluate_display_acceleration(r);
  if(result.status!="display_evaluated")throw std::runtime_error(result.failure_code);
  const double actual=result.receiver_accelerations.front().acceleration[0];
  if(std::abs(actual+.25)>1e-10)throw std::runtime_error("independent transmitter-weight control failed");
  r.radial_kernel=RadialKernel::logarithmic_inverse_distance;
  result=evaluate_display_acceleration(r);
  if(result.status!="display_evaluated"||std::abs(result.receiver_accelerations.front().acceleration[0]+.5)>1e-10)
    throw std::runtime_error("independent inverse-distance control failed");
  std::cout<<"PASS independent source-weight controls: canonical -0.25, logarithmic -0.5\n";
}
