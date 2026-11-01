#include "architrino/eom/DisplayEvolution.hpp"
#include "architrino/eom/DisplayEvaluation.hpp"
#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/EquationRegistry.hpp"
#include <algorithm>
#include <cmath>
#include <limits>
#include <map>
#include <set>
#include <stdexcept>
namespace architrino::eom {
namespace eom=architrino::eom;
namespace {
bool is_exact_history_storage_failure(const std::string& s){return s.find("exact history")!=std::string::npos||s.find("exact_history")!=std::string::npos;}
IntervalVector point_box(const std::array<double,3>& x){return {Interval::point(x[0]),Interval::point(x[1]),Interval::point(x[2])};}
void project_surface(const SurfaceGeometryDefinition& definition,std::array<double,3>& x,std::array<double,3>& v){
  const SurfaceGeometry shape(definition);
  for(unsigned iteration=0;iteration<8;++iteration){const auto g=shape.evaluate(point_box(x));const double denominator=g.gradient_squared.midpoint();if(!(denominator>0))throw std::runtime_error("display_surface_singular_chart");const double correction=g.defining_value.midpoint()/denominator;for(std::size_t i=0;i<3;++i)x[i]-=correction*g.gradient[i].midpoint();}
  const auto g=shape.evaluate(point_box(x));double dot=0;for(std::size_t i=0;i<3;++i)dot+=v[i]*g.gradient[i].midpoint();
  for(std::size_t i=0;i<3;++i)v[i]-=dot*g.gradient[i].midpoint()/g.gradient_squared.midpoint();
}
}
std::string display_decimal_token(double value) {
  if (!std::isfinite(value)) {
    throw std::runtime_error("display_nonfinite_state");
  }
  return eom::finite_double_token(value);
}

eom::NativeCoupledEvolutionCertificate evolve_display_point_histories(
    const eom::NativeCoupledEvolutionRequest& request) {
  if(request.integration_method!=kOrdinaryIntegrationSelection || !request.joint_histories.empty() ||
      !request.joint_root_point_states.empty() || request.paths.empty())
    throw std::invalid_argument("exploratory evolution requires ordinary nonempty point histories");
  if(equation_decimal_identity(request.field_speed)!="1e0")
    throw std::invalid_argument("exploratory evolution requires normalized field speed 1");
  (void)require_equation_provider(request);
  std::set<std::string> ids;
  for(const auto& path:request.paths)if(path.path_id.empty()||!ids.insert(path.path_id).second)
    throw std::invalid_argument("exploratory paths require unique identities");
  double current_time =
      eom::parse_finite_double(request.start_time, "display start time");
  const double requested_end =
      eom::parse_finite_double(request.end_time, "display end time");
  const double requested_step =
      eom::parse_finite_double(request.initial_step, "display initial step");
  if (!std::isfinite(current_time) || !std::isfinite(requested_end) ||
      !std::isfinite(requested_step) || !(requested_end > current_time) ||
      !(requested_step > 0.0)) {
    throw std::invalid_argument("display_invalid_evaluation_request");
  }
  std::vector<eom::NativePublishedPath> histories=request.continuation_histories;
  histories.reserve(request.paths.size());
  if(histories.empty())for (const auto& path : request.paths) {
    histories.push_back({path.path_id, path.history});
  }
  std::size_t resident_segment_count = 0U;
  for (const auto& path : histories) {
    resident_segment_count +=
        path.history.segments().resident_segment_count();
  }
  const auto disk_stats = eom::history_disk_storage_stats();
  const std::size_t bounded_page_segments = disk_stats.enabled
      ? disk_stats.cached_blocks_per_thread * 64U * request.thread_count
      : 0U;
  const long double memory_estimate_wide =
      static_cast<long double>(
          resident_segment_count + bounded_page_segments +
          64U * histories.size()) *
          4096.0L +
      static_cast<long double>(histories.size()) * 65536.0L +
      static_cast<long double>(histories.size()) * histories.size() * 512.0L;
  const std::uint64_t memory_estimate_bytes = memory_estimate_wide >=
          static_cast<long double>(std::numeric_limits<std::uint64_t>::max())
      ? std::numeric_limits<std::uint64_t>::max()
      : static_cast<std::uint64_t>(std::ceil(memory_estimate_wide));
  if (memory_estimate_bytes > request.memory_budget_bytes) {
    return {
        .schema = "eom_native_display_point_evolution/v1",
        .status = "halted",
        .run_id = request.run_id,
        .start_time = request.start_time,
        .requested_end_time = request.end_time,
        .accepted_end_time = request.start_time,
        .histories = std::move(histories),
        .joint_histories = {},
        .steps = {},
        .accepted_step_count = 0U,
        .rejected_step_count = 0U,
        .controller_step_size = request.initial_step,
        .halt_code = "memory_budget_exhausted",
        .evidence_status = "failed",
        .memory_budget_bytes = request.memory_budget_bytes,
        .memory_estimate_bytes = memory_estimate_bytes,
        .all_steps_atomic = true,
        .timing = {},
    };
  }
  std::size_t accepted_steps = request.initial_accepted_step_count;
  std::vector<SurfaceReceiverDiagnostic> diagnostics;
  std::string current_time_token = request.start_time;
  std::string halt_code;
  while (current_time < requested_end) {
    if(request.cancellation_requested && request.cancellation_requested()){halt_code="cancelled_at_accepted_boundary";break;}
    if(memory_estimate_bytes + static_cast<long double>(accepted_steps-request.initial_accepted_step_count)*histories.size()*4096 > request.memory_budget_bytes){halt_code="memory_budget_exhausted";break;}
    if (accepted_steps >= request.max_step_attempts) {
      halt_code = "numeric_resource_limit_exhausted";
      break;
    }
    eom::DisplayEvaluationRequest display_request{
        .paths = {},
        .reception_time = current_time,
        .field_speed =
            eom::parse_finite_double(request.field_speed, "field speed"),
        .coupling = eom::parse_finite_double(request.coupling, "coupling"),
        .root_relative_tolerance =
            eom::parse_finite_double(
                request.root_tolerance, "root tolerance"),
        .source_normal_floor =
            eom::parse_finite_double(
                request.transmitter_factor_floor,
                "transmitter factor floor"),
        .causal_width =
            eom::parse_finite_double(request.causal_width, "causal width"),
        .core_scale =
            eom::parse_finite_double(request.core_scale, "core scale"),
        .thread_count = request.thread_count,
    };
    display_request.paths.reserve(histories.size());
    for (std::size_t index = 0U; index < histories.size(); ++index) {
      display_request.paths.push_back({
          histories[index].path_id,
          eom::parse_finite_double(
              request.paths[index].charge, "path charge"),
          &histories[index].history,
      });
    }
    display_request.allow_regulation = request.chart_policy != "sharp";
    display_request.radial_kernel = logarithmic_equation_selected(request)?RadialKernel::logarithmic_inverse_distance:RadialKernel::canonical_inverse_square;
    const auto evaluated = eom::evaluate_display_acceleration(display_request);
    if (evaluated.status != "display_evaluated") {
      if (is_exact_history_storage_failure(evaluated.failure_code)) {
        // Storage corruption invalidates the worker-owned store. Escalate it
        // to the request boundary so the server discards that store before
        // accepting another request.
        throw std::runtime_error(evaluated.failure_code);
      }
      halt_code = evaluated.failure_code.empty()
          ? "display_invalid_evaluation_request"
          : evaluated.failure_code;
      break;
    }
    std::map<std::string, std::array<double, 3>> acceleration_by_path;
    for (const auto& receiver : evaluated.receiver_accelerations) {
      acceleration_by_path.emplace(
          receiver.receiver_path_id, receiver.acceleration);
    }
    const double rounding = 64 * std::numeric_limits<double>::epsilon() *
        std::max({1.0,std::abs(current_time),std::abs(requested_end)});
    const double end_time = requested_end-current_time <= requested_step+rounding
        ? requested_end : current_time+requested_step;
    const std::string end_time_token = end_time == requested_end
        ? request.end_time
        : display_decimal_token(end_time);
    if(!(end_time>current_time))throw std::runtime_error("display_time_resolution_exhausted");
    const double dt=end_time-current_time;
    std::vector<SurfaceReceiverDiagnostic> step_diagnostics;
    std::vector<eom::NativePublishedPath> next_histories;
    next_histories.reserve(histories.size());
    for (const auto& path : histories) {
      const auto found = acceleration_by_path.find(path.path_id);
      if (found == acceleration_by_path.end()) {
        throw std::runtime_error("display_invalid_evaluation_request");
      }
      const auto position = path.history.nominal_position(current_time);
      const auto velocity = path.history.nominal_velocity(current_time);
      auto acceleration=found->second;
      if(request.surface_geometry){
        const SurfaceGeometry shape(*request.surface_geometry);
        const auto constrained=evaluate_surface_constraint(shape, point_box(position),point_box(velocity),point_box(acceleration),{point_box({0,0,0}),point_box({0,0,0}),point_box({0,0,0})});
        for(std::size_t axis=0;axis<3;++axis)acceleration[axis]=constrained.diagnostic.total_acceleration[axis].midpoint();
        auto row=constrained.diagnostic;row.path_id=path.path_id;row.reception_lower=current_time_token;row.reception_upper=current_time_token;step_diagnostics.push_back(std::move(row));
      }
      eom::CubicCoefficientTokens coefficients{};
      double position_scale = 1.0;
      double velocity_scale = 1.0;
      for (std::size_t axis = 0U; axis < 3U; ++axis) {
        coefficients[axis] = {
            display_decimal_token(position[axis]),
            display_decimal_token(velocity[axis]),
            display_decimal_token(0.5 * acceleration[axis]),
            "0",
        };
        position_scale = std::max(position_scale, std::abs(position[axis]));
        velocity_scale = std::max(velocity_scale, std::abs(velocity[axis]));
      }
      if(request.surface_geometry){
        std::array<double,3> next_position{},next_velocity{};
        for(std::size_t axis=0;axis<3;++axis){next_position[axis]=position[axis]+dt*velocity[axis]+0.5*dt*dt*acceleration[axis];next_velocity[axis]=velocity[axis]+dt*acceleration[axis];}
        project_surface(*request.surface_geometry,next_position,next_velocity);
        for(std::size_t axis=0;axis<3;++axis){const double delta=next_position[axis]-position[axis];coefficients[axis][2]=display_decimal_token(3*delta/(dt*dt)-(2*velocity[axis]+next_velocity[axis])/dt);coefficients[axis][3]=display_decimal_token(-2*delta/(dt*dt*dt)+(velocity[axis]+next_velocity[axis])/(dt*dt));}
      }
      if(request.equation_selection && request.equation_selection->speed_domain!="unrestricted"){
        std::array<double,3> endpoint_velocity{};for(std::size_t axis=0;axis<3;++axis)endpoint_velocity[axis]=velocity[axis]+dt*acceleration[axis];
        const double speed=std::hypot(endpoint_velocity[0],endpoint_velocity[1],endpoint_velocity[2]);
        if(speed>1 || (request.equation_selection->speed_domain=="strict" && speed>=1)){halt_code="speed_domain_point_boundary";break;}
      }
      const double position_storage_radius =
          path.history.segments().back().position_error() +
          64.0 * std::numeric_limits<double>::epsilon() * position_scale;
      const double velocity_storage_radius =
          path.history.segments().back().velocity_error() +
          64.0 * std::numeric_limits<double>::epsilon() * velocity_scale;
      eom::CubicHistorySegment candidate(
          current_time_token,
          end_time_token,
          std::move(coefficients),
          display_decimal_token(position_storage_radius),
          display_decimal_token(velocity_storage_radius));
      next_histories.push_back({
          path.path_id, path.history.appended(std::move(candidate))});
    }
    if(next_histories.size()!=histories.size())break;
    diagnostics.insert(diagnostics.end(),step_diagnostics.begin(),step_diagnostics.end());
    histories = std::move(next_histories);
    current_time = end_time;
    current_time_token = end_time_token;
    ++accepted_steps;
    if (request.accepted_paths_callback) request.accepted_paths_callback(accepted_steps, current_time_token, histories);
    if(request.accepted_step_callback)request.accepted_step_callback(accepted_steps,current_time_token);
  }
  const bool completed = current_time_token == request.end_time;
  return {
      .schema = "eom_native_display_point_evolution/v1",
      .status = completed ? "completed" : "halted",
      .run_id = request.run_id,
      .start_time = request.start_time,
      .requested_end_time = request.end_time,
      .accepted_end_time = current_time_token,
      .histories = std::move(histories),
      .joint_histories = {},
      .steps = {},
      .accepted_step_count = accepted_steps,
      .rejected_step_count = request.initial_rejected_step_count,
      .controller_step_size = request.initial_step,
      .halt_code = completed ? "" : halt_code,
      .evidence_status = completed ? "display-only" : "failed",
      .memory_budget_bytes = request.memory_budget_bytes,
      .memory_estimate_bytes = memory_estimate_bytes,
      .all_steps_atomic = true,
      .timing = {},
      .exploratory_surface_diagnostics = std::move(diagnostics),
  };
}

}
