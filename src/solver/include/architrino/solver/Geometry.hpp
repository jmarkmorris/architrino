#pragma once

#include "architrino/solver/CausalRootSolver.hpp"

namespace architrino::solver {

struct AxisAlignedBounds {
  Vector3 min;
  Vector3 max;
};

struct SpherePointIntersection {
  bool intersects = false;
  double centerDistance = 0.0;
  double signedDistance = 0.0;
};

Vector3 add(Vector3 lhs, Vector3 rhs);
Vector3 subtract(Vector3 lhs, Vector3 rhs);
Vector3 scale(Vector3 value, double factor);
double dot(Vector3 lhs, Vector3 rhs);
double squared_norm(Vector3 value);
double norm(Vector3 value);
double distance_between(Vector3 lhs, Vector3 rhs);
Vector3 unit_or_zero(Vector3 value);
AxisAlignedBounds path_segment_bounds(const LinearPathSegment& segment);
AxisAlignedBounds merge_bounds(AxisAlignedBounds lhs, AxisAlignedBounds rhs);
bool bounds_overlap(AxisAlignedBounds lhs, AxisAlignedBounds rhs, double tolerance = 0.0);
SpherePointIntersection sphere_point_intersection(Vector3 center,
                                                  double radius,
                                                  Vector3 point,
                                                  double tolerance = 0.0);

}  // namespace architrino::solver
