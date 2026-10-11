#include "architrino/eom/SurfaceGeometry.hpp"
#include "architrino/eom/EquationPlan.hpp"
#include "SurfaceArithmetic.hpp"

#include <algorithm>

namespace architrino::eom {
namespace {
Interval z() { return Interval::point(0); }
SurfaceMatrix admitted_frame(const SurfaceGeometryDefinition& d) {
  using detail::SurfaceRational;
  const SurfaceRational zero, one("1");
  const SurfaceRational radius(d.radius), q(d.flattening), major(d.major_radius);
  if (d.kind != "sphere" && d.kind != "oblate" && d.kind != "ring-torus")
    throw EquationAdmissionError("invalid_geometry", "unknown fixed surface kind");
  if (!(zero < radius) || (d.kind == "oblate" && (!(zero < q) || one < q)) ||
      (d.kind == "ring-torus" && !(radius < major)))
    throw EquationAdmissionError("invalid_geometry", "invalid surface dimensions");
  for (const auto& token : d.center) {
    (void)SurfaceRational(token);
    (void)Interval::decimal_token(token);
  }
  for (std::size_t i = 0; i < 3; ++i) for (std::size_t j = 0; j < 3; ++j) {
    SurfaceRational sum;
    for (std::size_t k = 0; k < 3; ++k)
      sum = sum + SurfaceRational(d.orientation[k][i]) * SurfaceRational(d.orientation[k][j]);
    if (!(sum == (i == j ? one : zero)))
      throw EquationAdmissionError("invalid_geometry_frame", "orientation must be exactly orthogonal; no repair is performed");
  }
  return {{{Interval::decimal_token(d.orientation[0][0]), Interval::decimal_token(d.orientation[0][1]), Interval::decimal_token(d.orientation[0][2])},
           {Interval::decimal_token(d.orientation[1][0]), Interval::decimal_token(d.orientation[1][1]), Interval::decimal_token(d.orientation[1][2])},
           {Interval::decimal_token(d.orientation[2][0]), Interval::decimal_token(d.orientation[2][1]), Interval::decimal_token(d.orientation[2][2])}}};
}
std::string geometry_json(const SurfaceGeometryDefinition& d) {
  const auto n = [](const std::string& t) { return equation_json_quote(equation_decimal_identity(t)); };
  std::string frame = "[";
  for (std::size_t i = 0; i < 3; ++i) {
    if (i) frame += ',';
    frame += '[' + n(d.orientation[i][0]) + ',' + n(d.orientation[i][1]) + ',' + n(d.orientation[i][2]) + ']';
  }
  frame += ']';
  return "{\"center\":[" + n(d.center[0]) + ',' + n(d.center[1]) + ',' + n(d.center[2]) +
      "],\"definition\":\"polynomial-implicit/v1\",\"flattening\":" + n(d.flattening) +
      ",\"kind\":" + equation_json_quote(d.kind) + ",\"majorRadius\":" + n(d.major_radius) +
      ",\"orientation\":" + frame + ",\"radius\":" + n(d.radius) + '}';
}
}

SurfaceGeometry::SurfaceGeometry(SurfaceGeometryDefinition d)
    : definition_(std::move(d)), orientation_(admitted_frame(definition_)),
      canonical_json_(geometry_json(definition_)), digest_(equation_identity_sha256(canonical_json_)) {}
const SurfaceGeometryDefinition& SurfaceGeometry::definition() const noexcept { return definition_; }
const SurfaceMatrix& SurfaceGeometry::orientation() const noexcept { return orientation_; }
const std::string& SurfaceGeometry::canonical_json() const noexcept { return canonical_json_; }
const std::string& SurfaceGeometry::digest() const noexcept { return digest_; }

IntervalVector SurfaceGeometry::body_position(const IntervalVector& x) const {
  const IntervalVector relative = subtract(x, {Interval::decimal_token(definition_.center[0]),
      Interval::decimal_token(definition_.center[1]), Interval::decimal_token(definition_.center[2])});
  IntervalVector y{z(), z(), z()};
  for (std::size_t i = 0; i < 3; ++i) for (std::size_t j = 0; j < 3; ++j)
    y[i] = y[i] + orientation_[j][i] * relative[j];
  return y;
}
IntervalVector SurfaceGeometry::world_vector(const IntervalVector& y) const {
  return {dot(orientation_[0], y), dot(orientation_[1], y), dot(orientation_[2], y)};
}

SurfaceGeometryEvaluation SurfaceGeometry::evaluate(const IntervalVector& x) const {
  const auto y = body_position(x);
  const Interval radius = Interval::decimal_token(definition_.radius);
  const Interval one = Interval::point(1), two = Interval::point(2), four = Interval::point(4), eight = Interval::point(8);
  Interval value = z(), distance = z();
  IntervalVector g{z(), z(), z()};
  SurfaceMatrix h{{{z(), z(), z()}, {z(), z(), z()}, {z(), z(), z()}}};
  if (definition_.kind == "sphere") {
    value = dot(y, y) - interval_square(radius);
    g = scale(two, y);
    for (std::size_t i = 0; i < 3; ++i) h[i][i] = two;
    distance = interval_absolute(norm(y) - radius);
  } else if (definition_.kind == "oblate") {
    const Interval polar = radius * Interval::decimal_token(definition_.flattening);
    const IntervalVector inverse_squared{one / interval_square(radius), one / interval_square(radius), one / interval_square(polar)};
    value = z() - one;
    IntervalVector normalized{y[0] / radius, y[1] / radius, y[2] / polar};
    for (std::size_t i = 0; i < 3; ++i) {
      value = value + inverse_squared[i] * interval_square(y[i]);
      g[i] = two * inverse_squared[i] * y[i]; h[i][i] = two * inverse_squared[i];
    }
    // Radial map in normalized coordinates: |x-a*u| <= max(a)*||y/a|-1|.
    distance = radius * interval_absolute(norm(normalized) - one);
  } else {
    const Interval major = Interval::decimal_token(definition_.major_radius);
    const Interval s = dot(y, y) + interval_square(major) - interval_square(radius);
    value = interval_square(s) - four * interval_square(major) * (interval_square(y[0]) + interval_square(y[1]));
    g = scale(four * s, y);
    for (std::size_t i = 0; i < 2; ++i) g[i] = g[i] - eight * interval_square(major) * y[i];
    for (std::size_t i = 0; i < 3; ++i) for (std::size_t j = 0; j < 3; ++j)
      h[i][j] = eight * y[i] * y[j] + (i == j ? four * s - (i < 2 ? eight * interval_square(major) : z()) : z());
    const Interval rho = interval_sqrt(interval_square(y[0]) + interval_square(y[1]));
    distance = interval_absolute(interval_sqrt(interval_square(rho - major) + interval_square(y[2])) - radius);
  }
  SurfaceMatrix world_h{{{z(), z(), z()}, {z(), z(), z()}, {z(), z(), z()}}};
  for (std::size_t i = 0; i < 3; ++i) for (std::size_t j = 0; j < 3; ++j)
    for (std::size_t k = 0; k < 3; ++k) for (std::size_t l = 0; l < 3; ++l)
      world_h[i][j] = world_h[i][j] + orientation_[i][k] * h[k][l] * orientation_[j][l];
  const auto world_g = world_vector(g);
  const Interval gradient_squared = interval_square(world_g[0]) + interval_square(world_g[1]) + interval_square(world_g[2]);
  return {value, world_g, world_h, gradient_squared, distance};
}

}  // namespace architrino::eom
