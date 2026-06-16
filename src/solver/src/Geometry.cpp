#include "architrino/solver/Geometry.hpp"

#include <algorithm>
#include <cmath>

namespace architrino::solver {

Vector3 add(Vector3 lhs, Vector3 rhs) {
  return Vector3{lhs.x + rhs.x, lhs.y + rhs.y, lhs.z + rhs.z};
}

Vector3 subtract(Vector3 lhs, Vector3 rhs) {
  return Vector3{lhs.x - rhs.x, lhs.y - rhs.y, lhs.z - rhs.z};
}

Vector3 scale(Vector3 value, double factor) {
  return Vector3{value.x * factor, value.y * factor, value.z * factor};
}

double dot(Vector3 lhs, Vector3 rhs) {
  return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
}

double squared_norm(Vector3 value) {
  return dot(value, value);
}

double norm(Vector3 value) {
  return std::sqrt(squared_norm(value));
}

double distance_between(Vector3 lhs, Vector3 rhs) {
  return norm(subtract(lhs, rhs));
}

Vector3 unit_or_zero(Vector3 value) {
  const double length = norm(value);
  if (length == 0.0 || !std::isfinite(length)) {
    return Vector3{};
  }
  return scale(value, 1.0 / length);
}

AxisAlignedBounds path_segment_bounds(const LinearPathSegment& segment) {
  const double duration = segment.endTime - segment.startTime;
  const Vector3 endPoint = add(segment.positionAtStart, scale(segment.velocity, duration));
  return AxisAlignedBounds{
      Vector3{
          std::min(segment.positionAtStart.x, endPoint.x),
          std::min(segment.positionAtStart.y, endPoint.y),
          std::min(segment.positionAtStart.z, endPoint.z),
      },
      Vector3{
          std::max(segment.positionAtStart.x, endPoint.x),
          std::max(segment.positionAtStart.y, endPoint.y),
          std::max(segment.positionAtStart.z, endPoint.z),
      },
  };
}

AxisAlignedBounds merge_bounds(AxisAlignedBounds lhs, AxisAlignedBounds rhs) {
  return AxisAlignedBounds{
      Vector3{
          std::min(lhs.min.x, rhs.min.x),
          std::min(lhs.min.y, rhs.min.y),
          std::min(lhs.min.z, rhs.min.z),
      },
      Vector3{
          std::max(lhs.max.x, rhs.max.x),
          std::max(lhs.max.y, rhs.max.y),
          std::max(lhs.max.z, rhs.max.z),
      },
  };
}

bool bounds_overlap(AxisAlignedBounds lhs, AxisAlignedBounds rhs, double tolerance) {
  return lhs.min.x <= rhs.max.x + tolerance && lhs.max.x + tolerance >= rhs.min.x &&
         lhs.min.y <= rhs.max.y + tolerance && lhs.max.y + tolerance >= rhs.min.y &&
         lhs.min.z <= rhs.max.z + tolerance && lhs.max.z + tolerance >= rhs.min.z;
}

SpherePointIntersection sphere_point_intersection(Vector3 center,
                                                  double radius,
                                                  Vector3 point,
                                                  double tolerance) {
  const double centerDistance = distance_between(center, point);
  const double signedDistance = centerDistance - radius;
  return SpherePointIntersection{
      std::isfinite(centerDistance) && std::isfinite(radius) &&
          std::abs(signedDistance) <= std::max(0.0, tolerance),
      centerDistance,
      signedDistance,
  };
}

}  // namespace architrino::solver
