#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/EquationRegistry.hpp"
#include "architrino/eom/SharpAccelerationSensitivity.hpp"
#include "architrino/eom/SurfaceConstraint.hpp"
#include "EquationSourceIdentity.hpp"

#include <algorithm>
#include <cmath>
#include <limits>
#include <set>

namespace architrino::eom {
namespace {
Interval z() { return Interval::point(0); }
IntervalVector zero_vector() { return {z(), z(), z()}; }
SurfaceMatrix zero_matrix() { return {zero_vector(), zero_vector(), zero_vector()}; }
double magnitude(const Interval& i) { return std::max(std::abs(i.lower()), std::abs(i.upper())); }
IntervalVector nominal_velocity(const CubicHistorySegment& segment, const Interval& time) {
  const Interval t = time - segment.t_start_interval(); auto result = zero_vector();
  const auto& c = segment.coefficient_tokens();
  for (std::size_t i = 0; i < 3; ++i) result[i] =
      (Interval::point(3) * Interval::decimal_token(c[i][3]) * t + Interval::point(2) * Interval::decimal_token(c[i][2])) * t + Interval::decimal_token(c[i][1]);
  return result;
}
IntervalVector nominal_acceleration(const CubicHistorySegment& segment, const Interval& time) {
  const Interval t = time - segment.t_start_interval(); auto result = zero_vector();
  const auto& c = segment.coefficient_tokens();
  for (std::size_t i = 0; i < 3; ++i) result[i] =
      Interval::point(6) * Interval::decimal_token(c[i][3]) * t + Interval::point(2) * Interval::decimal_token(c[i][2]);
  return result;
}
const NativeCoupledPathInput& preparation(const NativeCoupledEvolutionRequest& r, const std::string& id) {
  const auto it = std::find_if(r.paths.begin(), r.paths.end(), [&](const auto& p) { return p.path_id == id; });
  if (it == r.paths.end()) throw EquationAdmissionError("surface_history_identity_mismatch", "unknown path in surface publication");
  return *it;
}
void require_subwake_history(const RetainedHistory& history) {
  for (const auto& segment : history.segments()) {
    const auto speed = norm(segment.velocity_interval(Interval(segment.t_start_interval().lower(), segment.t_end_interval().upper())));
    if (!(speed.upper() < 1)) throw EquationAdmissionError("surface_solution_chart_not_certified", "initial validated route requires a coherent path with certified speed below 1; no velocity is altered");
  }
}

IntervalVector source_acceleration(const NativeCoupledEvolutionRequest& r,
    const NativePublishedPath& source, const Interval& emission) {
  const auto& original = preparation(r, source.path_id).history;
  const double boundary = original.t_end();
  bool covered = false; auto bound = zero_vector();
  if (emission.lower() <= boundary) {
    const Interval part(emission.lower(), std::min(emission.upper(), original.segments().back().t_end_interval().upper()));
    if (logarithmic_equation_selected(r) && !original.uniform_circular_endpoint_certificate()) {
      admit_logarithmic_preparation(original);
      bound = zero_vector(); covered = true;
    } else {
    const auto analytic = original.uniform_circular_analytic_state(part);
    if (!analytic) throw EquationAdmissionError("surface_source_derivative_not_certified", "analytic source acceleration does not cover delayed emission slab");
    bound = analytic->acceleration; covered = true;
    }
  }
  if (emission.upper() > original.segments().back().t_end_interval().upper()) {
    if (!source.validated_evidence) throw EquationAdmissionError("surface_source_derivative_not_certified", "evolved source has no validated acceleration carrier");
    double frontier = std::max(emission.lower(), original.segments().back().t_end_interval().lower());
    std::vector<const RetainedEvolutionEvidence*> chain;
    for (auto carrier = source.validated_evidence.get(); carrier; carrier = carrier->previous().get()) chain.push_back(carrier);
    std::reverse(chain.begin(), chain.end());
    std::vector<const RetainedSolutionCertificate*> solutions;
    for (const auto* carrier : chain) for (const auto& solution : carrier->solutions()) solutions.push_back(&solution);
    for (const auto* selected : solutions) {
      const auto& solution = *selected;
      const Interval lo = Interval::decimal_token(solution.start_time), hi = Interval::decimal_token(solution.end_time);
      if (hi.upper() < frontier || lo.lower() > emission.upper()) continue;
      if (lo.lower() > frontier) throw EquationAdmissionError("surface_source_derivative_not_certified", "gap in source acceleration carrier");
      bound = covered ? hull(bound, solution.acceleration_bound) : solution.acceleration_bound;
      covered = true; frontier = std::max(frontier, hi.upper());
      if (frontier >= emission.upper()) break;
    }
    if (frontier < emission.upper()) throw EquationAdmissionError("surface_source_derivative_not_certified", "source acceleration carrier ends before emission slab");
  }
  if (!covered) throw EquationAdmissionError("surface_source_derivative_not_certified", "no true source acceleration bound");
  return bound;
}

struct Interaction { IntervalVector total; SurfaceMatrix jacobian; std::vector<RetainedSolutionCertificate::SlabRoot> roots; };
Interaction slab_interaction(const NativeCoupledEvolutionRequest& r,
    const std::vector<NativePublishedPath>& histories, const std::string& receiver,
    const Interval& time, const IntervalVector& x, const std::string& step_start) {
  std::vector<IntervalVector> contributions;
  std::array<std::vector<IntervalVector>, 3> derivative_columns;
  std::vector<RetainedSolutionCertificate::SlabRoot> roots;
  const std::array<IntervalVector, 3> basis{{{Interval::point(1), z(), z()},
                                          {z(), Interval::point(1), z()},
                                          {z(), z(), Interval::point(1)}}};
  const std::array<IntervalVector, 3> zeros{zero_vector(), zero_vector(), zero_vector()};
  for (const auto& source : histories) {
    // On the proved coherent subwake solution, no strictly delayed self root
    // exists. This is checked for every included path before publication;
    // point snapshots still run the unchanged full canonical root ledger.
    if (source.path_id == receiver) continue;
    const auto residual = [&](double s) {
      return time - Interval::point(s) - norm(subtract(x, source.history.position_hull(Interval::point(s))));
    };
    const double earliest = source.history.segments().front().t_start_interval().upper();
    const double latest = Interval::decimal_token(step_start).lower();
    if (!(residual(earliest).lower() > 0))
      throw EquationAdmissionError("surface_delayed_history_coverage_not_certified", "whole-slab lower root sign is not strictly positive");
    if (!(residual(latest).upper() < 0))
      throw EquationAdmissionError("surface_method_of_steps_gap_not_certified", "partner root is not uniformly before the accepted step start");
    // f_S <= -(1-speed) <0 on the coherent source. Two threshold bisections
    // preserve uniform lower/upper signs even when a mid residual straddles 0.
    double root_lo = earliest, search_hi = latest;
    for (unsigned iteration = 0; iteration < 60; ++iteration) {
      const double mid = root_lo + (search_hi - root_lo) / 2;
      if (!(root_lo < mid && mid < search_hi)) break;
      if (residual(mid).lower() > 0) root_lo = mid; else search_hi = mid;
    }
    double search_lo = earliest, root_hi = latest;
    for (unsigned iteration = 0; iteration < 60; ++iteration) {
      const double mid = search_lo + (root_hi - search_lo) / 2;
      if (!(search_lo < mid && mid < root_hi)) break;
      if (residual(mid).upper() < 0) root_hi = mid; else search_lo = mid;
    }
    const Interval emission(root_lo, root_hi);
    const auto displacement = subtract(x, source.history.position_hull(emission));
    const auto velocity = source.history.velocity_hull(emission);
    const Interval separation = norm(displacement);
    if (!(separation.lower() > 0)) throw EquationAdmissionError("surface_separation_not_certified", "delayed separation tube contains zero");
    const Interval factor = Interval::point(1) - dot(divide(displacement, separation), velocity);
    if (!(factor.lower() > Interval::decimal_token(r.transmitter_factor_floor).upper()))
      throw EquationAdmissionError("surface_transmitter_factor_not_certified", "sharp root derivative/floor is not certified across slab");
    const auto sensitivity = certify_sharp_acceleration_sensitivity({
        .displacement = displacement, .transmitter_velocity = velocity,
        .transmitter_acceleration = source_acceleration(r, source, emission),
        .field_speed = Interval::point(1), .certified_transmitter_factor = factor,
        .signed_coupling = Interval::decimal_token(r.coupling) *
            Interval::decimal_token(preparation(r, receiver).charge) * Interval::decimal_token(preparation(r, source.path_id).charge),
        .receiver_position_coefficients = basis,
        .transmitter_position_coefficients = zeros, .transmitter_velocity_coefficients = zeros,
        .radial_kernel = logarithmic_equation_selected(r) ? RadialKernel::logarithmic_inverse_distance : RadialKernel::canonical_inverse_square});
    if (!sensitivity.certified) throw EquationAdmissionError("surface_interaction_derivative_not_certified", sensitivity.failure_code);
    roots.push_back({source.path_id, source.history.provenance_fingerprint(), time, emission,
        residual(root_lo), residual(root_hi), factor,
        emission.upper() <= preparation(r, source.path_id).history.segments().back().t_end_interval().upper()});
    contributions.push_back(sensitivity.acceleration);
    for (std::size_t j = 0; j < 3; ++j) derivative_columns[j].push_back(sensitivity.acceleration_coefficients[j]);
  }
  Interaction result{contributions.empty() ? zero_vector() : fixed_pairwise_sum(contributions), zero_matrix(), std::move(roots)};
  for (std::size_t j = 0; j < 3; ++j) {
    const auto column = derivative_columns[j].empty() ? zero_vector() : fixed_pairwise_sum(derivative_columns[j]);
    for (std::size_t i = 0; i < 3; ++i) result.jacobian[i][j] = column[i];
  }
  return result;
}

struct Tube { RetainedSolutionCertificate certificate; CubicHistorySegment segment; };
Tube validated_segment(const NativeCoupledEvolutionRequest& r, const std::optional<SurfaceGeometry>& shape,
    const std::vector<NativePublishedPath>& input, const std::string& id,
    const CubicHistorySegment& segment, const HistoryEndpointState& initial,
    const std::string& step_start) {
  auto initial_x = subtract(initial.position, segment.nominal_position_interval(segment.t_start_interval()));
  auto initial_v = subtract(initial.velocity, nominal_velocity(segment, segment.t_start_interval()));
  const Interval h = segment.t_end_interval() - segment.t_start_interval();
  std::array<double, 3> rx{}, rv{};
  for (std::size_t i = 0; i < 3; ++i) {
    rx[i] = std::max(segment.position_errors()[i], magnitude(initial_x[i]));
    rv[i] = std::max(segment.velocity_errors()[i], magnitude(initial_v[i]));
  }
  RetainedSolutionCertificate certificate{id, segment.t_start_token(), segment.t_end_token(), false,
      "surface_solution_inclusion_not_certified", zero_vector(), zero_vector(), zero_vector(), 0, {}, {}};
  for (unsigned iteration = 0; iteration < 16; ++iteration) {
    auto defect = zero_vector(), acceleration = zero_vector();
    double lx = 0, lv = 0; bool have_acceleration = false;
    double speed_upper = 0;
    std::vector<SurfaceReceiverDiagnostic> diagnostics;
    std::vector<RetainedSolutionCertificate::SlabRoot> roots;
    constexpr unsigned subdivisions = 64;
    for (unsigned cell = 0; cell < subdivisions; ++cell) {
      // Shared dyadic boundaries cover the entire outward time enclosure.
      const double start = segment.t_start_interval().lower(), end = segment.t_end_interval().upper();
      const double lower = cell == 0 ? start : start + (end - start) * (static_cast<double>(cell) / subdivisions);
      const double upper = cell + 1 == subdivisions ? end : start + (end - start) * (static_cast<double>(cell + 1) / subdivisions);
      const Interval time(lower, upper);
      auto x = segment.nominal_position_interval(time), v = nominal_velocity(segment, time);
      for (std::size_t i = 0; i < 3; ++i) { x[i] = x[i].inflate(rx[i]); v[i] = v[i].inflate(rv[i]); }
      const double speed = norm(v).upper(); speed_upper = std::max(speed_upper, speed);
      if (!(speed < 1)) throw EquationAdmissionError("surface_solution_chart_not_certified", "validated solution tube is not wholly below wake speed; no speed limit is imposed");
      const auto interaction = slab_interaction(r, input, id, time, x, step_start);
      roots.insert(roots.end(), interaction.roots.begin(), interaction.roots.end());
      const std::array<Interval, 6> zero_row{z(), z(), z(), z(), z(), z()};
      SurfaceConstraintEvaluation constrained{
        {id, "", "", zero_vector(), zero_vector(), zero_vector(), zero_vector(), zero_vector(), zero_vector(), z()},
        {zero_row, zero_row, zero_row}};
      if (shape) constrained = evaluate_surface_constraint(*shape, x, v, interaction.total, interaction.jacobian);
      else {
        constrained.diagnostic.total_acceleration = interaction.total;
        for (std::size_t i = 0; i < 3; ++i) for (std::size_t j = 0; j < 6; ++j)
          constrained.jacobian[i][j] = j < 3 ? interaction.jacobian[i][j] : z();
      }
      const auto error = subtract(constrained.diagnostic.total_acceleration, nominal_acceleration(segment, time));
      for (std::size_t i = 0; i < 3; ++i) {
        defect[i] = Interval::point(std::max(defect[i].upper(), magnitude(error[i])));
        Interval row_x = z(), row_v = z();
        for (std::size_t j = 0; j < 3; ++j) {
          row_x = row_x + Interval::point(magnitude(constrained.jacobian[i][j]));
          row_v = row_v + Interval::point(magnitude(constrained.jacobian[i][3 + j]));
        }
        lx = std::max(lx, row_x.upper()); lv = std::max(lv, row_v.upper());
      }
      acceleration = have_acceleration ? hull(acceleration, constrained.diagnostic.total_acceleration) : constrained.diagnostic.total_acceleration;
      have_acceleration = true;
      constrained.diagnostic.path_id = id; constrained.diagnostic.reception_lower = finite_double_token(lower);
      constrained.diagnostic.reception_upper = finite_double_token(upper); if (shape) diagnostics.push_back(std::move(constrained.diagnostic));
    }
    const double q = (interval_square(h) * Interval::point(lx) + h * Interval::point(lv)).upper();
    if (!(q < 1)) throw EquationAdmissionError("surface_solution_contraction_not_certified", "weighted integral map is not a contraction");
    bool included = true; std::array<double, 3> next_x{}, next_v{};
    for (std::size_t i = 0; i < 3; ++i) {
      next_x[i] = (Interval::point(magnitude(initial_x[i])) + h * Interval::point(magnitude(initial_v[i])) + Interval::point(0.5) * interval_square(h) * defect[i]).upper();
      next_v[i] = (Interval::point(magnitude(initial_v[i])) + h * defect[i]).upper();
      included = included && next_x[i] <= rx[i] && next_v[i] <= rv[i];
    }
    if (included) {
      HistoryErrorTokens xerr, verr;
      for (std::size_t i = 0; i < 3; ++i) {
        xerr[i] = finite_double_token(rx[i]); verr[i] = finite_double_token(rv[i]);
        certificate.position_error[i] = Interval(-rx[i], rx[i]); certificate.velocity_error[i] = Interval(-rv[i], rv[i]);
        if (rx[i] > Interval::decimal_token(r.position_tolerance).lower() || rv[i] > Interval::decimal_token(r.velocity_tolerance).lower())
          throw EquationAdmissionError("surface_solution_error_budget_exceeded", "validated reconstruction exceeds EOM position/velocity tolerances");
      }
      CubicHistorySegment validated(segment.t_start_token(), segment.t_end_token(), segment.coefficient_tokens(), xerr, verr);
      if (shape) {
        auto geometry = certify_surface_segment(*shape, validated, r.surface_numerics); geometry.path_id = id;
        if (!geometry.certified) throw EquationAdmissionError(geometry.failure_code, "validated dense surface geometry fails");
        certificate.geometry.push_back(std::move(geometry));
      }
      certificate.certified = true; certificate.failure_code.clear(); certificate.contraction_bound = q;
      certificate.acceleration_bound = acceleration; certificate.diagnostics = std::move(diagnostics);
      certificate.partner_roots = std::move(roots);
      certificate.solution_speed_upper = speed_upper;
      return {std::move(certificate), std::move(validated)};
    }
    for (std::size_t i = 0; i < 3; ++i) {
      rx[i] = std::max(rx[i], (Interval::point(next_x[i]) * Interval::point(1.05) + Interval::point(1e-15)).upper());
      rv[i] = std::max(rv[i], (Interval::point(next_v[i]) * Interval::point(1.05) + Interval::point(1e-15)).upper());
    }
  }
  throw EquationAdmissionError("surface_solution_inclusion_not_certified", "integral map failed tube inclusion after bounded inflation");
}
}

std::string retained_request_identity(const NativeCoupledEvolutionRequest& r) {
  if (r.surface_geometry) return surface_request_identity(r);
  std::string identity = inspect_equation_model(r).digest;
  for (const auto& p : r.paths) identity += equation_json_quote(p.path_id) + equation_json_quote(equation_decimal_identity(p.charge)) + p.history.provenance_fingerprint();
  return equation_identity_sha256(identity);
}

std::string surface_request_identity(const NativeCoupledEvolutionRequest& r) {
  if (!r.surface_geometry) throw EquationAdmissionError("invalid_geometry", "surface definition is required");
  std::string identity = "{\"build\":" + equation_json_quote(detail::kEquationBuildDigest) +
      ",\"canonicalDefinition\":" + equation_json_quote(detail::kCanonicalDefinitionDigest) +
      ",\"composition\":\"canonical-surface/v1\",\"coupling\":" + equation_json_quote(equation_decimal_identity(r.coupling)) +
      ",\"fieldSpeed\":" + equation_json_quote(equation_decimal_identity(r.field_speed)) +
      ",\"geometry\":" + SurfaceGeometry(*r.surface_geometry).canonical_json() + ",\"paths\":[";
  bool first = true;
  for (const auto& path : r.paths) {
    if (!first) identity += ',';
    first = false;
    identity += "{\"charge\":" + equation_json_quote(equation_decimal_identity(path.charge)) +
        ",\"history\":" + equation_json_quote(path.history.provenance_fingerprint()) +
        ",\"id\":" + equation_json_quote(path.path_id) + '}';
  }
  identity += "],\"speedDomain\":" + equation_json_quote(r.equation_selection->speed_domain) +
      ",\"boundaryPolicy\":" + equation_json_quote(r.equation_selection->boundary_policy) +
      ",\"surfaceDefinition\":" + equation_json_quote(detail::kSurfaceDefinitionDigest) + '}';
  return equation_identity_sha256(identity);
}

RetainedPublicationCertificate certify_retained_publication(const NativeCoupledEvolutionRequest& r,
    const std::vector<NativePublishedPath>& input, const std::vector<NativePublishedPath>& candidate,
    const std::string& start_time, const std::string& end_time) {
  RetainedPublicationCertificate result;
  try {
    (void)require_equation_provider(r);
    if (!retained_publication_required(r))
      throw EquationAdmissionError("unsupported_model_combination", "surface publication requires the Surface provider");
    const auto shape = r.surface_geometry ? std::optional<SurfaceGeometry>(*r.surface_geometry) : std::nullopt;
    const auto identity = retained_request_identity(r);
    if (input.size() != r.paths.size() || candidate.size() != input.size())
      throw EquationAdmissionError("surface_history_identity_mismatch", "surface publication path count mismatch");
    const auto identities = [](const auto& paths) {
      std::set<std::string> ids;
      for (const auto& path : paths) if (path.path_id.empty() || !ids.insert(path.path_id).second)
        throw EquationAdmissionError("surface_history_identity_mismatch", "surface paths must have nonempty unique ids");
      return ids;
    };
    const auto expected = identities(r.paths);
    if (identities(input) != expected || identities(candidate) != expected)
      throw EquationAdmissionError("surface_history_identity_mismatch", "surface publication population differs from the selected request");
    for (const auto& source : input) {
      const auto& initial = preparation(r, source.path_id).history;
      const bool original = source.history.provenance_fingerprint() == initial.provenance_fingerprint();
      if (!original && (!source.validated_evidence || source.validated_evidence->model_identity() != identity ||
          source.validated_evidence->history_fingerprint() != source.history.provenance_fingerprint()))
        throw EquationAdmissionError("surface_solution_provenance_not_certified", "continued history lacks a matching immutable validated carrier");
      require_subwake_history(source.history);
    }
    for (const auto& old : input) {
      const auto it = std::find_if(candidate.begin(), candidate.end(), [&](const auto& path) { return path.path_id == old.path_id; });
      if (it == candidate.end() || equation_decimal_identity(old.history.segments().back().t_end_token()) != equation_decimal_identity(start_time))
        throw EquationAdmissionError("surface_history_identity_mismatch", "input history endpoint/path mismatch");
      RetainedHistory published = old.history;
      HistoryEndpointState state = old.history.endpoint_state_hull();
      if (!old.validated_evidence) {
        if (shape) admit_surface_preparation(*shape, old.history);
        else admit_logarithmic_preparation(old.history);
        if (old.history.uniform_circular_endpoint_certificate()) {
          const auto analytic = old.history.uniform_circular_analytic_state(Interval::decimal_token(start_time));
          if (!analytic) throw EquationAdmissionError("surface_preparation_not_certified", "initial analytic state is unavailable");
          state = {analytic->position, analytic->velocity};
        }
      }
      std::vector<RetainedSolutionCertificate> records;
      bool extended = false;
      for (const auto& segment : it->history.segments()) {
        if (segment.t_end() <= old.history.t_end()) continue;
        if (equation_decimal_identity(segment.t_start_token()) != equation_decimal_identity(published.segments().back().t_end_token()))
          throw EquationAdmissionError("surface_history_gap_not_certified", "candidate extension does not continuously join accepted history");
        auto tube = validated_segment(r, shape, input, old.path_id, segment, state, start_time);
        published = published.appended(tube.segment);
        state = published.endpoint_state_hull();
        records.push_back(tube.certificate); result.solutions.push_back(std::move(tube.certificate)); extended = true;
      }
      if (!extended || equation_decimal_identity(published.segments().back().t_end_token()) != equation_decimal_identity(end_time))
        throw EquationAdmissionError("surface_history_gap_not_certified", "candidate does not cover requested publication endpoint");
      // All retained/new exact paths have coherent initial/continued C1 state
      // and certified subwake speeds. Thus their partner-only ODE solutions
      // also satisfy full canonical positive-delay self accounting and have
      // no additional partner roots beyond the method-of-steps boundary.
      auto evidence = std::shared_ptr<const RetainedEvolutionEvidence>(new RetainedEvolutionEvidence(identity, published.provenance_fingerprint(), std::move(records), old.validated_evidence));
      result.histories.push_back({old.path_id, std::move(published), std::move(evidence)});
    }
    result.certified = true;
  } catch (const EquationAdmissionError& error) {
    result.failure_code = error.code();
    if (logarithmic_equation_selected(r) && result.failure_code.starts_with("surface_"))
      result.failure_code.replace(0, 8, "logarithmic_");
    result.histories.clear(); result.solutions.clear();
  }
  return result;
}

}  // namespace architrino::eom
