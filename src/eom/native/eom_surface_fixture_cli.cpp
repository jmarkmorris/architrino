#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/EquationRegistry.hpp"
#include "architrino/eom/SurfaceConstraint.hpp"
#include <cmath>
#include <functional>
#include <iostream>
#include <stdexcept>

namespace e = architrino::eom;
namespace {
e::Interval p(double x) { return e::Interval::point(x); }
e::IntervalVector vec(double x, double y, double z) { return {p(x), p(y), p(z)}; }
e::SurfaceMatrix zero() { return {vec(0,0,0), vec(0,0,0), vec(0,0,0)}; }
void check(bool ok, const char* message) { if (!ok) throw std::runtime_error(message); }
void contains(const e::Interval& value, double exact, const char* message) {
  check(value.lower() <= exact && exact <= value.upper(), message);
}
void rejects(const std::string& code, const std::function<void()>& action) {
  try { action(); } catch (const e::EquationAdmissionError& error) {
    if (error.code() != code) throw std::runtime_error("unexpected rejection: " + error.code()); return;
  }
  throw std::runtime_error("unsupported request admitted");
}
e::NativeCoupledEvolutionRequest request(const std::string& kind = "sphere") {
  e::NativeCoupledEvolutionRequest r;
  r.run_id = "surface-stage-b-control";
  r.equation_selection = e::EquationSelection{"canonical-surface/v1", "unrestricted", "none", "surface", "numerical"};
  r.surface_geometry.emplace(); r.surface_geometry->kind = kind;
  r.surface_geometry->flattening = kind == "oblate" ? "0.5" : "1";
  const std::string radius = kind == "ring-torus" ? "3" : "1";
  const std::string omega = kind == "ring-torus" ? "0.1" : "0.5";
  const std::string speed = kind == "ring-torus" ? "0.3" : "0.5";
  r.paths = {{"a", "1", e::RetainedHistory::uniform_circular("a", {
      .t_start = "-4", .t_end = "0", .maximum_segment_step = "0.05",
      .cylindrical_radius = radius, .height = "0", .angular_speed = omega,
      .tangential_speed = speed, .phase = "0"})}};
  r.start_time = "0"; r.end_time = "0.04"; r.initial_step = "0.02";
  r.minimum_step = "0.00125"; r.maximum_step = "0.02";
  // One coherent subwake path has no positive-delay self hits: A=0 while
  // retaining positive canonical coupling and the complete self root ledger.
  r.field_speed = "1"; r.coupling = "1"; r.root_tolerance = "1e-8";
  r.acceleration_tolerance = "1e-4"; r.position_tolerance = "1e-4";
  r.velocity_tolerance = "1e-4"; r.correction_tolerance = "1e-4";
  r.surface_numerics.position_tolerance = "1e-4";
  r.surface_numerics.tangent_velocity_tolerance = "1e-4";
  r.max_step_attempts = 100; r.max_rejected_steps = 20;
  return r;
}
}
int main() {
  try {
    // Exact reviewed axis cases are known controls, before dense/numerical targets.
    const e::SurfaceGeometry sphere(e::SurfaceGeometryDefinition{});
    auto g = sphere.evaluate(vec(1,0,0));
    contains(g.defining_value, 0, "sphere phi"); contains(g.gradient[0], 2, "sphere gradient");
    contains(g.hessian[1][1], 2, "sphere Hessian");
    auto c = e::evaluate_surface_constraint(sphere, vec(1,0,0), vec(0,0.5,0), vec(2,3,4), zero());
    contains(c.diagnostic.discarded_normal[0], 2, "net discarded normal");
    contains(c.diagnostic.tangent_interaction[1], 3, "tangent receiver total");
    contains(c.diagnostic.curvature[0], -0.25, "great-circle curvature");
    contains(c.diagnostic.support[0], -2.25, "normal support identity");
    contains(c.diagnostic.total_acceleration[2], 4, "total constrained acceleration");
    contains(c.jacobian[0][4], -1, "exact velocity derivative");
    e::SurfaceGeometryDefinition oblate; oblate.kind = "oblate"; oblate.flattening = "0.5";
    const e::SurfaceGeometry flattened(oblate);
    g = flattened.evaluate(vec(0,0,0.5)); contains(g.gradient[2], 4, "oblate polar gradient"); contains(g.hessian[2][2], 8, "oblate polar Hessian");
    c = e::evaluate_surface_constraint(flattened, vec(0,0,0.5), vec(1,0,0), vec(0,0,0), zero());
    contains(c.diagnostic.curvature[2], -0.5, "oblate polar curvature");
    oblate.flattening = "1";
    c = e::evaluate_surface_constraint(e::SurfaceGeometry(oblate), vec(1,0,0), vec(0,0.5,0), vec(2,3,4), zero());
    contains(c.diagnostic.curvature[0], -0.25, "q=1 defining-function invariance");
    e::SurfaceGeometryDefinition torus; torus.kind = "ring-torus";
    const e::SurfaceGeometry ring(torus);
    for (double radial : {1.0, 3.0}) {
      c = e::evaluate_surface_constraint(ring, vec(radial,0,0), vec(0,0.3,0), vec(0,0,0), zero());
      // Parameterized parallel circle: x''=-v^2/radial, independent of phi.
      contains(c.diagnostic.curvature[0], -0.09/radial, "torus inner/outer parallel curvature");
    }
    c = e::evaluate_surface_constraint(ring, vec(3,0,0), vec(0,0,0.3), vec(0,0,0), zero());
    contains(c.diagnostic.curvature[0], -0.09, "parameterized meridian curvature");
    auto moved = oblate; moved.flattening = "0.5"; moved.center = {"1","2","3"};
    moved.orientation = {{{"0","0","1"},{"0","1","0"},{"-1","0","0"}}};
    g = e::SurfaceGeometry(moved).evaluate(vec(1.5,2,3)); contains(g.gradient[0], 4, "translated/rotated polar gradient"); contains(g.hessian[0][0], 8, "rotated Hessian");
    auto bad = moved; bad.orientation[0][2] = "1.00000000000000001";
    rejects("invalid_geometry_frame", [&] { (void)e::SurfaceGeometry(bad); });
    bad = torus; bad.major_radius = "1";
    rejects("invalid_geometry", [&] { (void)e::SurfaceGeometry(bad); });
    rejects("surface_regularity_not_certified", [&] {
      (void)e::evaluate_surface_constraint(sphere, vec(0,0,0), vec(0,1,0), vec(0,0,0), zero()); });
    const e::CubicHistorySegment bow("0", "1", {{{"1","0","0","0"},{"0","1","-1","0"},{"0","0","0","0"}}});
    e::SurfaceNumerics dense; dense.position_tolerance = "0.01"; dense.tangent_velocity_tolerance = "0.01";
    check(!e::certify_surface_segment(sphere, bow, dense).certified, "between-endpoint drift was accepted");
    rejects("surface_preparation_not_certified", [&] { e::admit_surface_preparation(sphere, e::RetainedHistory("generic", {bow})); });
    for (const std::string kind : {"sphere", "oblate", "ring-torus"}) {
      auto r = request(kind); std::size_t publications = 0;
      r.accepted_step_callback = [&](std::size_t, const std::string&) { ++publications; };
      const auto result = e::evolve_native_coupled_histories(r);
      if (result.status != "completed") {
        std::string failure = result.steps.empty() ? "no-step" : result.steps.back().failure_code;
        throw std::runtime_error(kind + " control halted: " + result.halt_code + " / " + failure);
      }
      check(publications == result.accepted_step_count && publications >= 2, "atomic publication count");
      check(result.evidence_status == "constrained_solution_enclosure", "surface evidence provenance");
      const auto endpoint = result.histories[0].history.endpoint_state_hull();
      const double omega = kind == "ring-torus" ? 0.1 : 0.5, radius = kind == "ring-torus" ? 3 : 1;
      // Frozen analytical circle reference; production predicts through the host.
      contains(endpoint.position[0], radius * std::cos(omega * 0.04), "exact circle x inclusion");
      contains(endpoint.position[1], radius * std::sin(omega * 0.04), "exact circle y inclusion");
      contains(endpoint.velocity[0], -radius * omega * std::sin(omega * 0.04), "exact circle vx inclusion");
      contains(endpoint.velocity[1], radius * omega * std::cos(omega * 0.04), "exact circle vy inclusion");
      for (const auto& step : result.steps) if (step.status == "accepted") {
        check(!step.surface_solutions.empty(), "missing dense solution certificates");
        for (const auto& solution : step.surface_solutions)
          check(solution.certified && solution.contraction_bound < 1 && !solution.geometry.empty(), "invalid integral-map certificate");
      }
      rejects("unsupported_model_combination", [&] { (void)e::native_evolution_model_fingerprint(r); });
      rejects("unsupported_model_combination", [&] { (void)e::create_native_evolution_checkpoint(r, result); });
      auto stripped = result.histories; stripped[0].surface_evidence.reset();
      const auto missing = e::certify_surface_publication(r, stripped, result.histories, "0.04", "0.05");
      check(!missing.certified && missing.histories.empty() && missing.failure_code == "surface_solution_provenance_not_certified", "missing continuation carrier admitted");
      auto changed = r; changed.coupling = "2";
      const auto mismatch = e::certify_surface_publication(changed, result.histories, result.histories, "0.04", "0.05");
      check(!mismatch.certified && mismatch.failure_code == "surface_solution_provenance_not_certified", "changed-model carrier admitted");
      r.chart_policy = "finite_width";
      rejects("unsupported_model_combination", [&] { (void)e::evolve_native_coupled_histories(r); });
      std::cout << kind << " completed steps=" << result.accepted_step_count << "\n";
    }
    auto r = request(); r.coupling = "0.01"; r.root_tolerance = "1e-5";
    r.paths.push_back({"b", "-1", e::RetainedHistory::uniform_circular("b", {
        .t_start = "-4", .t_end = "0", .maximum_segment_step = "0.05",
        .cylindrical_radius = "1", .height = "0", .angular_speed = "0.5",
        .tangential_speed = "0.5", .phase = "3.141592653589793"})});
    std::vector<e::NativePublishedPath> initial;
    for (const auto& path : r.paths) initial.push_back({path.path_id, path.history});
    const auto one_thread = e::certify_native_acceleration_snapshot(r, initial, "0");
    r.thread_count = 4;
    const auto four_threads = e::certify_native_acceleration_snapshot(r, initial, "0");
    check(one_thread.status == "certified_complete" && four_threads.status == one_thread.status &&
        one_thread.root_certificates.size() == 4 && one_thread.surface_diagnostics.size() == 2, "complete interacting snapshot/root diagnostics");
    for (std::size_t i = 0; i < 2; ++i) for (std::size_t axis = 0; axis < 3; ++axis)
      check(one_thread.acceleration.receiver_totals[i].acceleration[axis].lower() == four_threads.acceleration.receiver_totals[i].acceleration[axis].lower() &&
          one_thread.acceleration.receiver_totals[i].acceleration[axis].upper() == four_threads.acceleration.receiver_totals[i].acceleration[axis].upper(), "surface thread snapshot parity");
    auto canonical = r; canonical.surface_geometry.reset(); canonical.equation_selection.emplace();
    const auto canonical_snapshot = e::certify_native_acceleration_snapshot(canonical, initial, "0");
    rejects("snapshot_model_identity_mismatch", [&] { (void)e::evolve_native_coupled_histories(r, &canonical_snapshot); });
    const auto interacting = e::evolve_native_coupled_histories(r);
    if (interacting.status != "completed") throw std::runtime_error("interacting smoke halted: " + interacting.halt_code + " / " + interacting.steps.back().failure_code);
    check(interacting.histories.size() == 2 && interacting.accepted_step_count >= 2 && interacting.all_steps_atomic, "coupled atomic Surface smoke");
    rejects("unsupported_model_combination", [&] { (void)e::create_native_evolution_checkpoint(canonical, interacting); });
    rejects("unsupported_model_combination", [&] { (void)e::certify_native_acceleration_snapshot(canonical, interacting.histories, "0.04"); });
    auto duplicate = initial; duplicate[1] = duplicate[0];
    const auto wrong_population = e::certify_surface_publication(r, duplicate, duplicate, "0", "0.02");
    check(!wrong_population.certified && wrong_population.histories.empty() && wrong_population.failure_code == "surface_history_identity_mismatch", "duplicate/missing population admitted");
    rejects("surface_history_identity_mismatch", [&] {
      (void)e::require_equation_provider(r).evaluate({r, duplicate, r.start_time}); });
    rejects("unsupported_model_combination", [&] {
      (void)e::require_equation_provider(canonical).evaluate({canonical, interacting.histories, "0.04"}); });
    auto memory_limited = r; memory_limited.memory_budget_bytes = 1;
    const auto memory_halt = e::evolve_native_coupled_histories(memory_limited);
    check(memory_halt.status == "halted" && memory_halt.accepted_step_count == 0 &&
        memory_halt.schema == "eom_surface_coupled_evolution_certificate/v1", "Surface memory admission/schema");
    const auto huge_phase = e::RetainedHistory::uniform_circular("large-phase", {
        .t_start = "-4", .t_end = "0", .maximum_segment_step = "0.05",
        .cylindrical_radius = "1", .height = "0", .angular_speed = "0.5",
        .tangential_speed = "0.5", .phase = "10000000000000000000000000000000000000000.1"});
    rejects("surface_preparation_reconstruction_not_certified", [&] { e::admit_surface_preparation(sphere, huge_phase); });
    auto extended_prep = r.paths[0].history.appended(e::CubicHistorySegment("0", "0.04",
        {{{"1","0","0","0"},{"0","0.5","0","0"},{"0","0","0","0"}}}, "0.01", "0.1"));
    rejects("surface_preparation_not_certified", [&] { e::admit_surface_preparation(sphere, extended_prep); });
    auto cancelled = r; std::size_t callbacks = 0;
    cancelled.accepted_step_callback = [&](std::size_t, const std::string&) { ++callbacks; };
    cancelled.cancellation_requested = [&] { return callbacks == 1; };
    const auto stopped = e::evolve_native_coupled_histories(cancelled);
    check(stopped.accepted_step_count == 1 && stopped.status == "halted" && stopped.all_steps_atomic, "Surface cancellation boundary");
    auto continued = request(); continued.surface_geometry->radius = "0.1";
    continued.paths.clear(); continued.coupling = "0.000001"; continued.root_tolerance = "1e-5";
    continued.end_time = "0.25"; continued.initial_step = "0.01"; continued.maximum_step = "0.01";
    for (const std::string id : {"a", "b"}) continued.paths.push_back({id, id == "a" ? "1" : "-1",
        e::RetainedHistory::uniform_circular(id, {.t_start = "-0.5", .t_end = "0", .maximum_segment_step = "0.02",
            .cylindrical_radius = "0.1", .height = "0", .angular_speed = "0.1", .tangential_speed = "0.01",
            .phase = id == "a" ? "0" : "3.141592653589793"})});
    const auto carrier_run = e::evolve_native_coupled_histories(continued);
    if (carrier_run.status != "completed") throw std::runtime_error("computed-source carrier smoke halted: " + carrier_run.halt_code + " / " + carrier_run.steps.back().failure_code);
    bool used_computed_source = false;
    for (const auto& step : carrier_run.steps) for (const auto& solution : step.surface_solutions)
      for (const auto& root : solution.partner_roots) {
        check(root.lower_residual.lower() > 0 && root.upper_residual.upper() < 0 && root.transmitter_factor.lower() > 0,
            "whole-slab root signs/ordinary domain");
        used_computed_source = used_computed_source || !root.analytic_source_acceleration;
      }
    check(used_computed_source, "computed-source derivative carrier was not exercised");
    std::cout << "computed source acceleration carrier completed steps=" << carrier_run.accepted_step_count << "\n";
    auto limited = r; limited.surface_numerics.maximum_cells = 1;
    rejects("surface_geometry_cell_budget_exhausted", [&] { (void)e::evolve_native_coupled_histories(limited); });
    std::cout << "interacting smoke, threads, carrier/mode rejection and atomic cancellation passed\n";
    std::cout << "surface geometry, dense negative controls and independent circle inclusion passed\n";
  } catch (const std::exception& error) { std::cerr << error.what() << '\n'; return 1; }
}
