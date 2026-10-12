#include "architrino/eom/SpeedDomain.hpp"
#include "SurfaceArithmetic.hpp"
#include <functional>
#include <iomanip>
#include <sstream>
namespace architrino::eom {
void admit_speed_selection(const EquationSelection& s) {
  const bool unrestricted = s.speed_domain == "unrestricted" && s.boundary_policy == "none";
  const bool restricted = (s.speed_domain == "inclusive" || s.speed_domain == "strict") && s.boundary_policy == "halt";
  if (!unrestricted && !restricted)
    throw EquationAdmissionError("unsupported_model_combination", "speed domain requires unrestricted/none or inclusive|strict/halt; no ceiling response is implemented");
}
SpeedDomainCertificate certify_speed_domain(const RetainedHistory& history, const EquationSelection& selection) {
  admit_speed_selection(selection);
  SpeedDomainCertificate result;
  if (selection.speed_domain == "unrestricted") { result.certified = true; return result; }
  const bool inclusive = selection.speed_domain == "inclusive";
  // Exact analytical speed proof is valid only within the original factory
  // certificate. Appended computed history must pass its dense error boxes.
  const auto& circle = history.uniform_circular_endpoint_certificate();
  if (circle && equation_decimal_identity(circle->valid_start_time) == equation_decimal_identity(history.segments().front().t_start_token()) &&
      equation_decimal_identity(circle->valid_reception_time) == equation_decimal_identity(history.segments().back().t_end_token())) {
    detail::SurfaceRational speed(circle->tangential_speed), one("1");
    const int compare = speed < one ? -1 : (speed == one ? 0 : 1);
    if (compare < 0 || (inclusive && compare == 0)) { result.certified = true; return result; }
    result.failure_code = "speed_domain_violation";
    result.lower_time = circle->valid_start_time; result.upper_time = circle->valid_reception_time; return result;
  }
  for (const auto& segment : history.segments()) {
    if (circle && detail::SurfaceRational(circle->valid_start_time) < detail::SurfaceRational(circle->valid_reception_time) &&
        !(detail::SurfaceRational(segment.t_start_token()) < detail::SurfaceRational(circle->valid_start_time)) &&
        !(detail::SurfaceRational(circle->valid_reception_time) < detail::SurfaceRational(segment.t_end_token()))) {
      const detail::SurfaceRational speed(circle->tangential_speed), one("1");
      if (speed < one || (inclusive && speed == one)) continue;
      result.failure_code = "speed_domain_violation";
      result.lower_time = segment.t_start_token(); result.upper_time = segment.t_end_token(); return result;
    }
    // Exact constant Cartesian velocity admits inclusive equality without
    // interpreting an outward-rounded box as an exact equality certificate.
    bool linear = true;
    detail::SurfaceRational squared("0");
    for (std::size_t axis = 0; axis < 3; ++axis) {
      linear = linear && equation_decimal_identity(segment.coefficient_tokens()[axis][2]) == "0" &&
          equation_decimal_identity(segment.coefficient_tokens()[axis][3]) == "0" &&
          equation_decimal_identity(segment.velocity_error_tokens()[axis]) == "0";
      detail::SurfaceRational v(segment.coefficient_tokens()[axis][1]);
      squared = squared + v * v;
    }
    const detail::SurfaceRational one("1");
    const int compare = squared < one ? -1 : (squared == one ? 0 : 1);
    if (linear && (compare < 0 || (inclusive && compare == 0))) continue;
    if (linear && compare >= 0) {
      result.failure_code = "speed_domain_violation";
      result.lower_time = segment.t_start_token(); result.upper_time = segment.t_end_token(); return result;
    }
    std::function<bool(double,double,unsigned)> visit = [&](double lo, double hi, unsigned depth) {
      ++result.visited_cells;
      const auto v = segment.velocity_interval(Interval(lo, hi));
      const Interval squared_speed = interval_square(v[0]) + interval_square(v[1]) + interval_square(v[2]);
      if (inclusive ? squared_speed.upper() <= 1 : squared_speed.upper() < 1) return true;
      if (squared_speed.lower() > 1 || (!inclusive && squared_speed.lower() >= 1)) {
        result.failure_code = "speed_domain_violation";
      } else if (depth >= 24 || result.visited_cells >= 200000 || lo == hi) {
        result.failure_code = "speed_domain_uncertified";
      } else {
        const double mid = lo + (hi - lo) / 2;
        if (mid > lo && mid < hi) return visit(lo, mid, depth + 1) && visit(mid, hi, depth + 1);
        result.failure_code = "speed_domain_uncertified";
      }
      const auto token = [](double value) { std::ostringstream out; out << std::setprecision(17) << value; return out.str(); };
      result.lower_time = token(lo); result.upper_time = token(hi); return false;
    };
    if (!visit(segment.t_start_interval().lower(), segment.t_end_interval().upper(), 0)) return result;
  }
  result.certified = true; return result;
}
void require_prepared_speed_domain(const RetainedHistory& h, const EquationSelection& s) {
  const auto c = certify_speed_domain(h, s);
  if (!c.certified) throw EquationAdmissionError(c.failure_code, "prepared history does not certify the complete selected speed domain on [" + c.lower_time + "," + c.upper_time + "]");
}
}
