#include "architrino/eom/SurfaceConstraint.hpp"
#include "architrino/eom/EquationPlan.hpp"
#include "SurfaceArithmetic.hpp"

#include <algorithm>
#include <cmath>
#include <limits>

namespace architrino::eom {
namespace {
Interval z() { return Interval::point(0); }
struct Jet {
  Interval value;
  std::array<Interval, 6> derivative{z(), z(), z(), z(), z(), z()};
  Jet(Interval v) : value(v) {}
};
Jet operator+(const Jet& a, const Jet& b) {
  Jet r(a.value + b.value);
  for (std::size_t i = 0; i < 6; ++i) r.derivative[i] = a.derivative[i] + b.derivative[i];
  return r;
}
Jet operator-(const Jet& a, const Jet& b) {
  Jet r(a.value - b.value);
  for (std::size_t i = 0; i < 6; ++i) r.derivative[i] = a.derivative[i] - b.derivative[i];
  return r;
}
Jet operator*(const Jet& a, const Jet& b) {
  Jet r(a.value * b.value);
  for (std::size_t i = 0; i < 6; ++i) r.derivative[i] = a.derivative[i] * b.value + a.value * b.derivative[i];
  return r;
}
Jet operator/(const Jet& a, const Jet& b) {
  Jet r(a.value / b.value);
  for (std::size_t i = 0; i < 6; ++i) r.derivative[i] =
      (a.derivative[i] - r.value * b.derivative[i]) / b.value;
  return r;
}
using JV = std::array<Jet, 3>;
JV zeros() { return {Jet(z()), Jet(z()), Jet(z())}; }
Jet product(const JV& a, const JV& b) {
  Jet result(z()); for (std::size_t i = 0; i < 3; ++i) result = result + a[i] * b[i]; return result;
}
IntervalVector values(const JV& v) { return {v[0].value, v[1].value, v[2].value}; }
double upper_absolute(const Interval& i) { return std::max(std::abs(i.lower()), std::abs(i.upper())); }
}

SurfaceConstraintEvaluation evaluate_surface_constraint(
    const SurfaceGeometry& geometry, const IntervalVector& x,
    const IntervalVector& v, const IntervalVector& a, const SurfaceMatrix& da) {
  const auto evaluated = geometry.evaluate(x);
  if (!(evaluated.gradient_squared.lower() > 0))
    throw EquationAdmissionError("surface_regularity_not_certified", "gradient norm contains zero on geometry tube");
  JV xx = zeros(), vv = zeros(), aa = zeros();
  for (std::size_t i = 0; i < 3; ++i) {
    xx[i].value = x[i]; xx[i].derivative[i] = Interval::point(1);
    vv[i].value = v[i]; vv[i].derivative[3 + i] = Interval::point(1);
    aa[i].value = a[i]; for (std::size_t j = 0; j < 3; ++j) aa[i].derivative[j] = da[i][j];
  }
  const auto& d = geometry.definition(); const auto& u = geometry.orientation();
  JV y = zeros();
  for (std::size_t i = 0; i < 3; ++i) for (std::size_t j = 0; j < 3; ++j)
    y[i] = y[i] + Jet(u[j][i]) * (xx[j] - Jet(Interval::decimal_token(d.center[j])));
  JV g = zeros();
  std::array<JV, 3> h{zeros(), zeros(), zeros()};
  const Jet two(Interval::point(2)), four(Interval::point(4)), eight(Interval::point(8));
  const Interval radius = Interval::decimal_token(d.radius);
  if (d.kind == "sphere") {
    for (std::size_t i = 0; i < 3; ++i) { g[i] = two * y[i]; h[i][i] = two; }
  } else if (d.kind == "oblate") {
    const Interval polar = radius * Interval::decimal_token(d.flattening);
    const std::array<Interval, 3> axis{radius, radius, polar};
    for (std::size_t i = 0; i < 3; ++i) {
      const Jet twice_inverse(Interval::point(2) / interval_square(axis[i]));
      g[i] = twice_inverse * y[i]; h[i][i] = twice_inverse;
    }
  } else {
    const Jet major_squared(interval_square(Interval::decimal_token(d.major_radius)));
    const Jet s = product(y, y) + major_squared - Jet(interval_square(radius));
    for (std::size_t i = 0; i < 3; ++i) {
      g[i] = four * s * y[i] - (i < 2 ? eight * major_squared * y[i] : Jet(z()));
      for (std::size_t j = 0; j < 3; ++j)
        h[i][j] = eight * y[i] * y[j] + (i == j ? four * s - (i < 2 ? eight * major_squared : Jet(z())) : Jet(z()));
    }
  }
  JV world_g = zeros(); std::array<JV, 3> world_h{zeros(), zeros(), zeros()};
  for (std::size_t i = 0; i < 3; ++i) for (std::size_t j = 0; j < 3; ++j) {
    world_g[i] = world_g[i] + Jet(u[i][j]) * g[j];
    for (std::size_t k = 0; k < 3; ++k) for (std::size_t l = 0; l < 3; ++l)
      world_h[i][j] = world_h[i][j] + Jet(u[i][k]) * h[k][l] * Jet(u[j][l]);
  }
  Jet g2 = product(world_g, world_g);
  // Sharpen only the value using squared interval components. Derivatives
  // remain the exact chain rule on the same box.
  g2.value = evaluated.gradient_squared;
  JV hv = zeros();
  for (std::size_t i = 0; i < 3; ++i) hv[i] = product(world_h[i], vv);
  const Jet normal_scale = product(world_g, aa) / g2;
  const Jet curvature_scale = Jet(z()) - product(vv, hv) / g2;
  JV discarded = zeros(), tangent = zeros(), curvature = zeros(), support = zeros(), total = zeros();
  SurfaceJacobian jacobian{{{z(), z(), z(), z(), z(), z()}, {z(), z(), z(), z(), z(), z()}, {z(), z(), z(), z(), z(), z()}}};
  for (std::size_t i = 0; i < 3; ++i) {
    discarded[i] = normal_scale * world_g[i]; tangent[i] = aa[i] - discarded[i];
    curvature[i] = curvature_scale * world_g[i]; support[i] = curvature[i] - discarded[i];
    total[i] = tangent[i] + curvature[i]; jacobian[i] = total[i].derivative;
  }
  return {{"", "", "", a, values(tangent), values(discarded), values(curvature), values(support), values(total), evaluated.gradient_squared}, jacobian};
}

SurfaceHistoryCertificate certify_surface_segment(const SurfaceGeometry& shape,
    const CubicHistorySegment& segment, const SurfaceNumerics& numerics) {
  const double xtol = Interval::decimal_token(numerics.position_tolerance).lower();
  const double vtol = Interval::decimal_token(numerics.tangent_velocity_tolerance).lower();
  if (!(xtol > 0 && vtol > 0) || numerics.maximum_cells == 0)
    throw EquationAdmissionError("invalid_surface_numerics", "surface tolerances and cell budget must be positive");
  SurfaceHistoryCertificate result;
  result.start_time = segment.t_start_token(); result.end_time = segment.t_end_token();
  result.minimum_gradient_squared = std::numeric_limits<double>::infinity();
  struct Cell { double lo, hi; std::size_t depth; };
  std::vector<Cell> pending{{segment.t_start_interval().lower(), segment.t_end_interval().upper(), 0}};
  while (!pending.empty()) {
    const Cell c = pending.back(); pending.pop_back();
    if (++result.visited_cells > numerics.maximum_cells) { result.failure_code = "surface_geometry_cell_budget_exhausted"; return result; }
    const Interval time(c.lo, c.hi);
    const auto g = shape.evaluate(segment.position_interval(time));
    const bool regular = g.gradient_squared.lower() > 0;
    const double tangent = regular ? upper_absolute(dot(g.gradient, segment.velocity_interval(time)) /
        interval_sqrt(g.gradient_squared)) : std::numeric_limits<double>::infinity();
    if (regular && g.distance_bound.upper() <= xtol && tangent <= vtol) {
      result.maximum_distance = std::max(result.maximum_distance, g.distance_bound.upper());
      result.maximum_tangent_velocity = std::max(result.maximum_tangent_velocity, tangent);
      result.minimum_gradient_squared = std::min(result.minimum_gradient_squared, g.gradient_squared.lower());
      continue;
    }
    const double mid = c.lo + (c.hi - c.lo) / 2;
    if (c.depth >= numerics.maximum_depth || !(c.lo < mid && mid < c.hi)) {
      result.failure_code = !regular ? "surface_regularity_not_certified" : "surface_dense_tolerance_exceeded"; return result;
    }
    pending.push_back({mid, c.hi, c.depth + 1}); pending.push_back({c.lo, mid, c.depth + 1});
  }
  result.certified = true; return result;
}

void admit_surface_preparation(const SurfaceGeometry& shape, const RetainedHistory& history) {
  using detail::SurfaceRational; using detail::square;
  const auto& c = history.uniform_circular_endpoint_certificate();
  if (!c.has_value()) throw EquationAdmissionError("surface_preparation_not_certified", "generic cubics do not prove surface-consistent preparation");
  if (equation_decimal_identity(c->valid_start_time) != equation_decimal_identity(history.segments().front().t_start_token()) ||
      equation_decimal_identity(c->valid_reception_time) != equation_decimal_identity(history.segments().back().t_end_token()))
    throw EquationAdmissionError("surface_preparation_not_certified", "original preparation must be entirely within the exact circular factory domain");
  const auto& d = shape.definition(); const SurfaceRational zero, one("1");
  SurfaceRational omega(c->angular_speed); if (omega < zero) omega = zero - omega;
  const SurfaceRational rho = SurfaceRational(c->tangential_speed) / omega;
  const bool untilted = SurfaceRational(c->tilt_x) == zero && SurfaceRational(c->tilt_y) == zero;
  const bool origin = std::all_of(d.center.begin(), d.center.end(), [&](const auto& t) { return SurfaceRational(t) == zero; });
  const bool axis = SurfaceRational(d.orientation[2][0]) == zero && SurfaceRational(d.orientation[2][1]) == zero;
  if (!(SurfaceRational(d.center[0]) == zero && SurfaceRational(d.center[1]) == zero) ||
      (!untilted && !(d.kind == "sphere" && origin)))
    throw EquationAdmissionError("surface_preparation_not_certified", "this circular preparation/frame relationship has no exact surface certificate");
  const SurfaceRational height = SurfaceRational(c->height) - SurfaceRational(d.center[2]);
  const SurfaceRational radius(d.radius);
  bool on_surface = false;
  if (d.kind == "sphere") on_surface = square(rho) + square(height) == square(radius);
  else if (untilted && axis && d.kind == "oblate")
    on_surface = square(rho / radius) + square(height / (radius * SurfaceRational(d.flattening))) == one;
  else if (untilted && axis && d.kind == "ring-torus")
    on_surface = square(rho - SurfaceRational(d.major_radius)) + square(height) == square(radius);
  if (!on_surface) throw EquationAdmissionError("surface_preparation_not_certified", "analytic circular preparation does not lie exactly on the selected surface");
  // Validate reconstruction against token-defined analytic endpoints. The
  // factory's nominal doubles/roundoff allowance alone are not this proof.
  const Interval angular_speed = interval_absolute(Interval::decimal_token(c->angular_speed));
  const Interval analytic_radius = Interval::decimal_token(c->tangential_speed) / angular_speed;
  const Interval fourth = analytic_radius * interval_square(interval_square(angular_speed));
  for (const auto& segment : history.segments()) {
    const auto left = history.uniform_circular_analytic_state(segment.t_start_interval());
    const auto right = history.uniform_circular_analytic_state(segment.t_end_interval());
    if (!left || !right) throw EquationAdmissionError("surface_preparation_reconstruction_not_certified", "analytic endpoint coverage is insufficient");
    const Interval h = segment.t_end_interval() - segment.t_start_interval();
    if (!(h.lower() > 0)) throw EquationAdmissionError("surface_preparation_reconstruction_not_certified", "prepared segment duration is not certified positive");
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const Interval delta = right->position[axis] - left->position[axis];
      const std::array<Interval, 4> exact_hermite{
          left->position[axis], left->velocity[axis],
          Interval::point(3) * delta / interval_square(h) - (Interval::point(2) * left->velocity[axis] + right->velocity[axis]) / h,
          Interval::point(-2) * delta / (interval_square(h) * h) + (left->velocity[axis] + right->velocity[axis]) / interval_square(h)};
      Interval position_difference = z(), velocity_difference = z();
      Interval power = Interval::point(1), previous_power = Interval::point(1);
      for (std::size_t degree = 0; degree < 4; ++degree) {
        const Interval coefficient_error = interval_absolute(exact_hermite[degree] - Interval::decimal_token(segment.coefficient_tokens()[axis][degree]));
        position_difference = position_difference + coefficient_error * power;
        if (degree) velocity_difference = velocity_difference + Interval::point(static_cast<double>(degree)) * coefficient_error * previous_power;
        previous_power = power; power = power * h;
      }
      const Interval position_bound = position_difference + fourth * interval_square(interval_square(h)) / Interval::point(384);
      // Rolle + quadratic Lagrange remainder for (f-H)' gives M4*h^3/24;
      // this is independent of differentiating a pointwise remainder term.
      const Interval velocity_bound = velocity_difference + fourth * interval_square(h) * h / Interval::point(24);
      if (position_bound.upper() > Interval::decimal_token(segment.position_error_tokens()[axis]).lower() ||
          velocity_bound.upper() > Interval::decimal_token(segment.velocity_error_tokens()[axis]).lower())
        throw EquationAdmissionError("surface_preparation_reconstruction_not_certified", "stored cubic errors do not enclose the exact analytical preparation over the entire segment");
    }
  }
}

}  // namespace architrino::eom
