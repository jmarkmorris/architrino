#include "architrino/solver/Geometry.hpp"
#include "architrino/solver/SolverCAbi.hpp"

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
  const ArchitrinoSolverLinearPathSegmentF64 abiSegment{
      2.0,
      6.0,
      ArchitrinoSolverVector3F64{10.0, -2.0, 1.0},
      ArchitrinoSolverVector3F64{-1.0, 3.0, 0.5},
      0.0,
  };
  const std::uint64_t abiPathKey = 99;
  ArchitrinoSolverBoundsRowF64 abiBounds[1]{};
  int abiBoundsCount = 0;
  const int abiBoundsStatus =
      architrino_solver_compute_path_bounds_f64(
          &abiSegment,
          &abiPathKey,
          1,
          abiBounds,
          1,
          &abiBoundsCount);
  const ArchitrinoSolverSpherePointIntersectionRequestF64 abiSphereRequests[2]{
      ArchitrinoSolverSpherePointIntersectionRequestF64{
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          5.0,
          ArchitrinoSolverVector3F64{3.0, 4.0, 0.0},
          1e-12,
      },
      ArchitrinoSolverSpherePointIntersectionRequestF64{
          ArchitrinoSolverVector3F64{0.0, 0.0, 0.0},
          4.0,
          ArchitrinoSolverVector3F64{3.0, 4.0, 0.0},
          1e-12,
      },
  };
  ArchitrinoSolverSpherePointIntersectionRowF64 abiSphereRows[2]{};
  int abiSphereCount = 0;
  const int abiSphereStatus =
      architrino_solver_intersect_sphere_points_f64(
          abiSphereRequests,
          2,
          abiSphereRows,
          2,
          &abiSphereCount);

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
      nearly_equal(sphereMiss.signedDistance, 1.0) &&
      abiBoundsStatus == 0 &&
      abiBoundsCount == 1 &&
      abiBounds[0].path_key == 99 &&
      nearly_equal(abiBounds[0].min_x, 6.0) &&
      nearly_equal(abiBounds[0].max_y, 10.0) &&
      abiSphereStatus == 0 &&
      abiSphereCount == 2 &&
      abiSphereRows[0].intersects == 1 &&
      abiSphereRows[1].intersects == 0 &&
      nearly_equal(abiSphereRows[0].center_distance, 5.0) &&
      nearly_equal(abiSphereRows[1].signed_distance, 1.0);

  if (!ok) {
    std::cerr << "solver geometry smoke failed\n";
    return 1;
  }

  std::cout << "solver geometry=ok\n";
  return 0;
}
