#include "architrino/solver/Geometry.hpp"

#include <cmath>
#include <iostream>

namespace {

bool nearly_equal(double left, double right, double tolerance = 1e-12) {
  return std::abs(left - right) <= tolerance;
}

}  // namespace

int main() {
  const architrino::solver::Vector3 a{3.0, 4.0, 0.0};
  const architrino::solver::Vector3 b{0.0, 0.0, 0.0};
  const architrino::solver::Vector3 unit = architrino::solver::unit_or_zero(a);
  const architrino::solver::LinearPathSegment segment{
      "path-a",
      2.0,
      6.0,
      architrino::solver::Vector3{10.0, -2.0, 1.0},
      architrino::solver::Vector3{-1.0, 3.0, 0.5},
      architrino::solver::NumericType::F64,
      0.0,
  };
  const architrino::solver::AxisAlignedBounds bounds =
      architrino::solver::path_segment_bounds(segment);
  const architrino::solver::AxisAlignedBounds nearby{
      architrino::solver::Vector3{5.5, 9.5, 2.5},
      architrino::solver::Vector3{7.0, 11.0, 4.0},
  };
  const architrino::solver::SpherePointIntersection sphereHit =
      architrino::solver::sphere_point_intersection(b, 5.0, a, 1e-12);
  const architrino::solver::SpherePointIntersection sphereMiss =
      architrino::solver::sphere_point_intersection(b, 4.0, a, 1e-12);

  const bool ok =
      nearly_equal(architrino::solver::norm(a), 5.0) &&
      nearly_equal(architrino::solver::distance_between(a, b), 5.0) &&
      nearly_equal(unit.x, 0.6) &&
      nearly_equal(unit.y, 0.8) &&
      nearly_equal(bounds.min.x, 6.0) &&
      nearly_equal(bounds.min.y, -2.0) &&
      nearly_equal(bounds.max.y, 10.0) &&
      nearly_equal(bounds.max.z, 3.0) &&
      architrino::solver::bounds_overlap(bounds, nearby, 0.0) &&
      sphereHit.intersects &&
      !sphereMiss.intersects &&
      nearly_equal(sphereHit.centerDistance, 5.0) &&
      nearly_equal(sphereMiss.signedDistance, 1.0);

  if (!ok) {
    std::cerr << "solver geometry smoke failed\n";
    return 1;
  }

  std::cout << "solver geometry=ok\n";
  return 0;
}
