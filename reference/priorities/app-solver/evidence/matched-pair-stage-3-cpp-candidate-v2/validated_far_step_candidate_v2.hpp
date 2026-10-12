// Scratch candidate, version 2, not production: a serial validated far-step
// producer using the EOM interval and history types. One step of hypotheses
// H0 to H5 of the generated-history addenda. It publishes a cubic history
// segment whose declared position and velocity radii enclose the true
// continuation at every time of the step, or declines and publishes nothing.
// c_f = 1.
//
// Version 2 corrects two publication findings of the independent review of
// version 1 and replaces its registry by explicit evidence.
//   CPP-P1. Every published coefficient and radius is the exact decimal
//     expansion of a binary64 value, so the published nominal curve is
//     exactly the curve the radii were computed about. The one inexact
//     operation, halving the acceleration centre, is debited when it rounds.
//     Whole-step coverage is certified by lower bounds of the Bernstein
//     coefficients of the slack polynomials, not by sampling.
//   CPP-P2. The step end is the exact decimal sum of the start and step
//     tokens. Histories must end at exactly the start token and start at one
//     common token. Every duration-dependent hypothesis and radius uses an
//     upper bound of the emitted segment's extent as the history layer will
//     represent it.
//   Evidence. A certified step issues a sealed ValidatedPopulationEvidence.
//     A population with declared radii is admitted only with such evidence
//     whose content chains equal those recomputed from the histories
//     supplied. Nothing is registered anywhere.
#pragma once

#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/History.hpp"
#include "architrino/eom/Interval.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"
#include "architrino/eom/ValidatedEvidence.hpp"

#include <gmp.h>

#include <algorithm>
#include <array>
#include <charconv>
#include <cmath>
#include <limits>
#include <map>
#include <memory>
#include <optional>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace vfs {

namespace eom = architrino::eom;
using eom::Interval;
using eom::IntervalVector;

// Shortest round-trip text of a binary64 value. Used only to print numbers.
inline std::string token(double value) {
  if (!std::isfinite(value)) throw std::invalid_argument("nonfinite value");
  std::array<char, 64> buffer{};
  const auto result = std::to_chars(
      buffer.data(), buffer.data() + buffer.size(), value,
      std::chars_format::general, std::numeric_limits<double>::max_digits10);
  return std::string(buffer.data(), result.ptr);
}

// The exact decimal expansion of a binary64 value. Every finite binary64 has
// one, with at most 1074 fractional digits.
inline std::string exact_token(double value) {
  if (!std::isfinite(value)) throw std::invalid_argument("nonfinite value");
  std::array<char, 1600> buffer{};
  const auto result = std::to_chars(
      buffer.data(), buffer.data() + buffer.size(), value,
      std::chars_format::fixed, 1074);
  if (result.ec != std::errc{}) {
    throw std::invalid_argument("exact decimal expansion failed");
  }
  std::string text(buffer.data(), result.ptr);
  if (text.find('.') != std::string::npos) {
    while (text.back() == '0') text.pop_back();
    if (text.back() == '.') text.pop_back();
  }
  if (text == "-0") text = "0";
  return text;
}

// Plain decimal: optional '-', digits, optional '.' and digits. No exponent.
inline bool plain_decimal(const std::string& text) {
  std::size_t i = !text.empty() && text[0] == '-' ? 1U : 0U;
  std::size_t digits = 0;
  bool point = false;
  for (; i < text.size(); ++i) {
    if (text[i] == '.' && !point) {
      point = true;
    } else if (text[i] >= '0' && text[i] <= '9') {
      ++digits;
    } else {
      return false;
    }
  }
  return digits > 0 && text.back() != '.';
}

// Exact sum of two plain decimal tokens, as a plain decimal token.
inline std::string decimal_sum(const std::string& a, const std::string& b) {
  if (!plain_decimal(a) || !plain_decimal(b)) {
    throw std::invalid_argument("time tokens must be plain decimals");
  }
  const auto split = [](const std::string& t, std::string& digits,
                        std::size_t& scale) {
    const auto point = t.find('.');
    digits = point == std::string::npos
        ? t : t.substr(0, point) + t.substr(point + 1U);
    scale = point == std::string::npos ? 0U : t.size() - point - 1U;
  };
  std::string da, db;
  std::size_t sa = 0, sb = 0;
  split(a, da, sa);
  split(b, db, sb);
  const std::size_t scale = std::max(sa, sb);
  da.append(scale - sa, '0');
  db.append(scale - sb, '0');
  mpz_t x, y;
  mpz_init_set_str(x, da.c_str(), 10);
  mpz_init_set_str(y, db.c_str(), 10);
  mpz_add(x, x, y);
  const bool negative = mpz_sgn(x) < 0;
  mpz_abs(x, x);
  char* raw = mpz_get_str(nullptr, 10, x);
  std::string text(raw);
  void (*release)(void*, size_t) = nullptr;
  mp_get_memory_functions(nullptr, nullptr, &release);
  release(raw, std::strlen(raw) + 1U);
  mpz_clear(x);
  mpz_clear(y);
  if (text.size() <= scale) text.insert(0, scale + 1U - text.size(), '0');
  if (scale > 0U) {
    text.insert(text.size() - scale, ".");
    while (text.back() == '0') text.pop_back();
    if (text.back() == '.') text.pop_back();
  }
  return (negative && text != "0" ? "-" : "") + text;
}

// Hull of a history's position or velocity tube over [lower, upper], as the
// union of the history layer's own enclosures on abutting pieces.
inline IntervalVector subdivided_hull(
    const eom::RetainedHistory& history, double lower, double upper,
    bool velocity) {
  constexpr int pieces = 48;
  const auto evaluate = [&](double a, double b) {
    const Interval window(a, b);
    return velocity ? history.velocity_hull(window)
                    : history.position_hull(window);
  };
  if (!(upper > lower)) return evaluate(lower, upper);
  IntervalVector result = evaluate(lower, lower + (upper - lower) / pieces);
  double a = lower + (upper - lower) / pieces;
  for (int k = 2; k <= pieces; ++k) {
    const double b = k == pieces
        ? upper : lower + (upper - lower) * (static_cast<double>(k) / pieces);
    result = eom::hull(result, evaluate(a, b));
    a = b;
  }
  return result;
}

struct Path {
  std::string id;
  std::string charge;
  eom::RetainedHistory history;
};

struct Budgets {
  double position;
  double velocity;
};

struct PairInfo {
  std::string receiver;
  std::string source;
  std::string state;
  double window_lower = 0.0;
  double window_upper = 0.0;
  double distance_lower = 0.0;
  double distance_upper = 0.0;
  double factor_lower = 0.0;
  double factor_upper = 0.0;
};

struct PathResult {
  std::string id;
  std::string charge;
  IntervalVector inherited_position{Interval::point(0), Interval::point(0),
                                    Interval::point(0)};
  IntervalVector inherited_velocity{Interval::point(0), Interval::point(0),
                                    Interval::point(0)};
  IntervalVector position_box{Interval::point(0), Interval::point(0),
                              Interval::point(0)};
  IntervalVector acceleration{Interval::point(0), Interval::point(0),
                              Interval::point(0)};
  std::array<double, 3> position_radius{};
  std::array<double, 3> velocity_radius{};
  std::array<double, 3> growth_position{};
  std::array<double, 3> growth_velocity{};
  // Smallest certified lower bound of the Bernstein coefficients of the
  // position and velocity slack polynomials over the whole step.
  double whole_step_slack = 0.0;
  std::optional<eom::CubicHistorySegment> segment;
};

struct Certificate {
  std::string status = "declined";
  std::string code;
  std::string reason;
  std::string start;
  std::string step;
  std::string end;
  std::string coupling;
  double duration_cover = 0.0;
  double history_start = 0.0;
  double speed_upper = 0.0;
  std::size_t enclosure_iterations = 0;
  std::vector<PairInfo> pairs;
  std::vector<PathResult> paths;
  // The step's growth in the solver's own per-path local-error record.
  std::vector<eom::NativePathLocalError> local_errors;
  // Issued only on certification; binds the published population.
  std::shared_ptr<const eom::ValidatedPopulationEvidence> evidence;
};

using Evidence = std::shared_ptr<const eom::ValidatedPopulationEvidence>;

class Producer {
 public:
  // `inherited` is the evidence issued by the step that published the
  // supplied histories. It is required when any history declares a radius.
  Certificate step(
      const std::vector<Path>& paths,
      const Evidence& inherited,
      const std::string& start,
      const std::string& step_token,
      const std::string& coupling,
      const std::optional<Budgets>& increment,
      const std::optional<Budgets>& total = std::nullopt,
      std::size_t max_iterations = 12);

  // Appends a certified step onto the population that generated it.
  static std::vector<Path> extend(
      const std::vector<Path>& paths, const Certificate& certificate);

 private:
  double segment_speed_upper(const eom::CubicHistorySegment& segment);
  double past_speed_upper(const eom::RetainedHistory& history);
  // Keyed by every token that determines the value; nothing is read from or
  // written to caller data.
  std::map<std::string, double> speed_cache_;
};

inline Certificate decline(
    Certificate certificate, std::string code, std::string reason) {
  certificate.status = "declined";
  certificate.code = std::move(code);
  certificate.reason = std::move(reason);
  certificate.evidence.reset();
  certificate.local_errors.clear();
  for (auto& path : certificate.paths) path.segment.reset();
  return certificate;
}

inline double Producer::segment_speed_upper(
    const eom::CubicHistorySegment& segment) {
  std::string key = segment.t_start_token() + "|" + segment.t_end_token();
  for (const auto& axis : segment.coefficient_tokens()) {
    for (const auto& value : axis) key += "|" + value;
  }
  for (const auto& value : segment.velocity_error_tokens()) key += "|" + value;
  const auto found = speed_cache_.find(key);
  if (found != speed_cache_.end()) return found->second;
  constexpr int pieces = 64;
  const double t0 = segment.t_start();
  const double t1 = segment.t_end();
  double bound = 0.0;
  double lower = t0;
  for (int k = 1; k <= pieces; ++k) {
    const double upper =
        k == pieces ? t1 : t0 + (t1 - t0) * (static_cast<double>(k) / pieces);
    bound = std::max(
        bound,
        eom::norm(segment.velocity_interval(Interval(lower, upper))).upper());
    lower = upper;
  }
  speed_cache_.emplace(std::move(key), bound);
  return bound;
}

inline double Producer::past_speed_upper(const eom::RetainedHistory& history) {
  double bound = 0.0;
  const auto& segments = history.segments();
  for (std::size_t i = 0; i < segments.size(); ++i) {
    bound = std::max(bound, segment_speed_upper(segments.at(i)));
  }
  return bound;
}

inline Certificate Producer::step(
    const std::vector<Path>& paths,
    const Evidence& inherited,
    const std::string& start,
    const std::string& step_token,
    const std::string& coupling,
    const std::optional<Budgets>& increment,
    const std::optional<Budgets>& total,
    std::size_t max_iterations) {
  Certificate certificate;
  certificate.start = start;
  certificate.step = step_token;
  certificate.coupling = coupling;
  if (paths.empty()) {
    return decline(certificate, "VFS-H0-01", "empty population");
  }
  if (!plain_decimal(start) || !plain_decimal(step_token)) {
    return decline(certificate, "VFS-H0-01",
                   "step start and length must be plain decimal tokens");
  }
  if (!(eom::parse_finite_double(step_token, "step") > 0.0) ||
      step_token[0] == '-') {
    return decline(certificate, "VFS-H0-01", "step is not positive");
  }
  // CPP-P2: the end is the exact decimal sum, and every duration-dependent
  // quantity uses an upper bound of the emitted segment's extent as the
  // history layer represents it, which is at least the exact step.
  certificate.end = decimal_sum(start, step_token);
  const Interval T = Interval::decimal_token(start);
  const Interval E = Interval::decimal_token(certificate.end);
  const double cover = std::max(
      (E - T).upper(), Interval::decimal_token(step_token).upper());
  certificate.duration_cover = cover;
  const Interval h = Interval::point(cover);
  const Interval kappa = Interval::decimal_token(coupling);

  // H0.
  bool any_radius = false;
  const std::string start_of_history =
      paths.front().history.segments().front().t_start_token();
  for (std::size_t i = 0; i < paths.size(); ++i) {
    const auto& history = paths[i].history;
    for (std::size_t j = 0; j < i; ++j) {
      if (paths[j].id == paths[i].id) {
        return decline(certificate, "VFS-H0-01", "duplicate path identifier");
      }
    }
    const auto& segments = history.segments();
    if (eom::compare_exact_decimal_tokens(
            segments.front().t_start_token(), start_of_history) != 0) {
      return decline(
          certificate, "VFS-H0-01",
          "retained histories do not start at one common time");
    }
    if (eom::compare_exact_decimal_tokens(
            segments.back().t_end_token(), start) != 0) {
      return decline(certificate, "VFS-H0-01",
                     "a history does not end exactly at the step start");
    }
    if (history.uniform_circular_endpoint_certificate().has_value()) {
      return decline(certificate, "VFS-H0-01",
                     "analytic carrier is outside this candidate");
    }
    for (std::size_t k = 0; k < segments.size(); ++k) {
      const auto segment = segments.at(k);
      for (std::size_t axis = 0; axis < 3; ++axis) {
        any_radius = any_radius || segment.position_errors()[axis] != 0.0 ||
            segment.velocity_errors()[axis] != 0.0;
      }
    }
  }
  std::vector<std::string> digest_before;
  for (const auto& path : paths) {
    digest_before.push_back(eom::validated_history_digest(path.history));
  }
  if (any_radius) {
    if (inherited == nullptr) {
      return decline(certificate, "VFS-H0-01",
                     "histories declare radii but no evidence was supplied");
    }
    if (eom::compare_exact_decimal_tokens(inherited->coupling(), coupling) !=
        0) {
      return decline(
          certificate, "VFS-H0-01",
          "generated history was published under a different coupling");
    }
    if (inherited->members().size() != paths.size()) {
      return decline(certificate, "VFS-H0-01",
                     "evidence is for a different population");
    }
    for (std::size_t i = 0; i < paths.size(); ++i) {
      bool found = false;
      for (const auto& member : inherited->members()) {
        if (member.path_id != paths[i].id) continue;
        found = member.charge == paths[i].charge &&
            member.digest_after == digest_before[i];
        break;
      }
      if (!found) {
        return decline(
            certificate, "VFS-H0-01",
            "evidence does not bind path " + paths[i].id +
                ": identifier, charge or history content differs");
      }
    }
  }
  const double s_min = paths.front().history.t_start();
  certificate.history_start = s_min;
  const Interval S_min = Interval::decimal_token(start_of_history);

  // H1, past part.
  std::vector<double> past_speed;
  for (const auto& path : paths) {
    past_speed.push_back(past_speed_upper(path.history));
    certificate.speed_upper = std::max(certificate.speed_upper,
                                       past_speed.back());
  }
  if (!(certificate.speed_upper < 1.0)) {
    return decline(certificate, "VFS-H1-01",
                   "retained past is not below field speed");
  }

  std::vector<eom::HistoryEndpointState> sections;
  std::vector<Interval> charges;
  for (const auto& path : paths) {
    sections.push_back(path.history.endpoint_state_hull());
    charges.push_back(Interval::decimal_token(path.charge));
    PathResult result;
    result.id = path.id;
    result.charge = path.charge;
    result.inherited_position = sections.back().position;
    result.inherited_velocity = sections.back().velocity;
    certificate.paths.push_back(std::move(result));
  }
  const Interval span(0.0, cover);
  const Interval half(
      0.0, (eom::interval_square(h) * Interval::point(0.5)).upper());
  const Interval unit(-1.0, 1.0);
  const Interval zero = Interval::point(0.0);

  std::vector<IntervalVector> boxes;
  for (const auto& section : sections) {
    boxes.push_back(eom::add(section.position,
                             eom::scale(span, section.velocity)));
  }
  std::vector<IntervalVector> accelerations;
  bool enclosed = false;
  for (std::size_t iteration = 0; iteration < max_iterations; ++iteration) {
    // H2.
    for (std::size_t a = 0; a < paths.size(); ++a) {
      for (std::size_t b = a + 1; b < paths.size(); ++b) {
        if (!(eom::norm(eom::subtract(boxes[a], boxes[b])).lower() > cover)) {
          return decline(certificate, "VFS-H2-01",
                         "step boxes are not farther apart than the step");
        }
      }
    }
    // H3 and H4.
    accelerations.assign(paths.size(), IntervalVector{zero, zero, zero});
    certificate.pairs.clear();
    for (std::size_t a = 0; a < paths.size(); ++a) {
      for (std::size_t b = 0; b < paths.size(); ++b) {
        if (a == b) continue;
        const auto& source = paths[b].history;
        PairInfo info;
        info.receiver = paths[a].id;
        info.source = paths[b].id;
        const Interval start_distance = eom::norm(eom::subtract(
            boxes[a], source.position_hull(Interval::point(s_min))));
        const double earliest = (T - S_min).lower();
        const double latest = (T + h - S_min).upper();
        if (start_distance.lower() > latest) {
          info.state = "absent";
          certificate.pairs.push_back(info);
          continue;
        }
        if (!(start_distance.upper() < earliest)) {
          info.state = "VFS-H3-01";
          certificate.pairs.push_back(info);
          return decline(
              certificate, "VFS-H3-01",
              "lower sign is neither uniformly present nor absent");
        }
        double lo = s_min;
        double hi = source.t_end();
        for (int pass = 0; pass < 64; ++pass) {
          const Interval r = eom::norm(eom::subtract(
              boxes[a], subdivided_hull(source, lo, hi, false)));
          const double new_lo =
              std::max(lo, (T - Interval::point(r.upper())).lower());
          const double new_hi =
              std::min(hi, (T + h - Interval::point(r.lower())).upper());
          if (new_lo > new_hi) {
            return decline(certificate, "VFS-H4-01", "empty root window");
          }
          if (new_lo == lo && new_hi == hi) break;
          lo = new_lo;
          hi = new_hi;
        }
        const IntervalVector d = eom::subtract(
            boxes[a], subdivided_hull(source, lo, hi, false));
        const IntervalVector U = subdivided_hull(source, lo, hi, true);
        const Interval r = eom::norm(d);
        info.window_lower = lo;
        info.window_upper = hi;
        info.distance_lower = r.lower();
        info.distance_upper = r.upper();
        if (!(r.lower() > 0.0)) {
          info.state = "VFS-H4-01";
          certificate.pairs.push_back(info);
          return decline(certificate, "VFS-H4-01",
                         "distance floor is not positive");
        }
        IntervalVector n = eom::divide(d, r);
        for (auto& component : n) {
          component = component.intersection(unit).value();
        }
        const double speed =
            std::min(eom::norm(U).upper(), past_speed[b]);
        const Interval projected =
            eom::dot(n, U).intersection(Interval(-speed, speed)).value();
        const Interval D = Interval::point(1.0) - projected;
        info.factor_lower = D.lower();
        info.factor_upper = D.upper();
        if (!(D.lower() > 0.0)) {
          info.state = "VFS-H4-01";
          certificate.pairs.push_back(info);
          return decline(certificate, "VFS-H4-01",
                         "transmitter factor floor is not positive");
        }
        info.state = "present";
        certificate.pairs.push_back(info);
        const Interval weight =
            kappa * charges[a] * charges[b] / (eom::interval_square(r) * D);
        accelerations[a] = eom::add(accelerations[a], eom::scale(weight, n));
      }
    }
    // H5.
    enclosed = true;
    std::vector<IntervalVector> required;
    for (std::size_t a = 0; a < paths.size(); ++a) {
      required.push_back(eom::add(
          eom::add(sections[a].position, eom::scale(span, sections[a].velocity)),
          eom::scale(half, accelerations[a])));
      for (std::size_t axis = 0; axis < 3; ++axis) {
        enclosed = enclosed && required[a][axis].subset_of(boxes[a][axis]);
      }
    }
    certificate.enclosure_iterations = iteration + 1;
    if (enclosed) break;
    for (std::size_t a = 0; a < paths.size(); ++a) {
      for (std::size_t axis = 0; axis < 3; ++axis) {
        boxes[a][axis] = required[a][axis].inflate(
            required[a][axis].width() * 0.125 + 1e-300);
      }
    }
  }
  if (!enclosed) {
    return decline(certificate, "VFS-H5-01",
                   "no a priori enclosure was found");
  }
  // H1, step part.
  for (std::size_t a = 0; a < paths.size(); ++a) {
    const IntervalVector velocity_box = eom::add(
        sections[a].velocity, eom::scale(span, accelerations[a]));
    certificate.speed_upper =
        std::max(certificate.speed_upper, eom::norm(velocity_box).upper());
    certificate.paths[a].position_box = boxes[a];
    certificate.paths[a].acceleration = accelerations[a];
  }
  if (!(certificate.speed_upper < 1.0)) {
    return decline(certificate, "VFS-H1-01",
                   "step velocity box is not below field speed");
  }

  // Tube and publication. With binary64 centres e0, e1, eA of the inherited
  // sections and the acceleration box, and upward-rounded radii rho about
  // them, the true state at T + tau, 0 <= tau <= H, lies within
  //   rho_x + tau rho_v + tau^2 rho_a / 2   of   e0 + tau e1 + tau^2 eA / 2,
  // and its velocity within rho_v + tau rho_a of e1 + tau eA. The published
  // coefficients are the exact decimal expansions of e0, e1 and c2 = eA / 2
  // as computed, so the published curve differs from that curve only by
  // d2 tau^2 in position and 2 d2 tau in velocity, d2 = |c2 - eA / 2|, which
  // is zero unless the halving rounded. The slack polynomials
  //   R_x - (rho_x + tau rho_v + tau^2 (rho_a / 2 + d2))   and
  //   R_v - (rho_v + tau (rho_a + 2 d2))
  // are certified nonnegative on [0, H] by lower bounds of their Bernstein
  // coefficients, where H bounds the emitted extent from above.
  std::vector<Path> next;
  const Interval hu = Interval::point(cover);
  std::vector<eom::ValidatedPopulationEvidence::Member> members;
  for (std::size_t a = 0; a < paths.size(); ++a) {
    auto& result = certificate.paths[a];
    eom::CubicCoefficientTokens coefficients;
    eom::HistoryErrorTokens position_errors;
    eom::HistoryErrorTokens velocity_errors;
    double slack = std::numeric_limits<double>::infinity();
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const Interval& X0 = sections[a].position[axis];
      const Interval& V0 = sections[a].velocity[axis];
      const Interval& A = accelerations[a][axis];
      const double e0 = X0.midpoint();
      const double e1 = V0.midpoint();
      const double eA = A.midpoint();
      const double c2 = eA * 0.5;
      const double d2 =
          c2 * 2.0 == eA ? 0.0 : std::numeric_limits<double>::denorm_min();
      const auto radius = [](const Interval& box, double centre) {
        return std::max(
            (Interval::point(centre) - Interval::point(box.lower())).upper(),
            (Interval::point(box.upper()) - Interval::point(centre)).upper());
      };
      const Interval rho_x = Interval::point(radius(X0, e0));
      const Interval rho_v = Interval::point(radius(V0, e1));
      const Interval rho_a = Interval::point(radius(A, eA));
      const Interval quad =
          rho_a * Interval::point(0.5) + Interval::point(d2);
      const Interval lin = rho_a + Interval::point(2.0) * Interval::point(d2);
      const Interval need_x_mid = rho_x + hu * rho_v * Interval::point(0.5);
      const Interval need_x_end =
          rho_x + hu * rho_v + eom::interval_square(hu) * quad;
      const Interval need_v_end = rho_v + hu * lin;
      const double inf = std::numeric_limits<double>::infinity();
      const double radius_x = std::nextafter(need_x_end.upper(), inf);
      const double radius_v = std::nextafter(need_v_end.upper(), inf);
      const Interval Rx = Interval::point(radius_x);
      const Interval Rv = Interval::point(radius_v);
      slack = std::min({slack,
                        (Rx - rho_x).lower(), (Rx - need_x_mid).lower(),
                        (Rx - need_x_end).lower(),
                        (Rv - rho_v).lower(), (Rv - need_v_end).lower()});
      coefficients[axis] = {exact_token(e0), exact_token(e1), exact_token(c2),
                            "0"};
      position_errors[axis] = exact_token(radius_x);
      velocity_errors[axis] = exact_token(radius_v);
      result.position_radius[axis] = radius_x;
      result.velocity_radius[axis] = radius_v;
      result.growth_position[axis] = (Rx - rho_x).upper();
      result.growth_velocity[axis] = (Rv - rho_v).upper();
    }
    result.whole_step_slack = slack;
    if (!(slack >= 0.0)) {
      return decline(certificate, "VFS-PUB-01",
                     "whole-step slack is not certified nonnegative");
    }
    try {
      eom::CubicHistorySegment segment(
          start, certificate.end, coefficients, position_errors,
          velocity_errors);
      next.push_back({paths[a].id, paths[a].charge,
                      paths[a].history.appended(segment)});
      result.segment = std::move(segment);
    } catch (const std::exception& error) {
      return decline(certificate, "VFS-PUB-01",
                     std::string("history layer refused the segment: ") +
                         error.what());
    }
    members.push_back({paths[a].id, paths[a].charge, digest_before[a],
                       eom::validated_history_digest(next.back().history)});
    eom::NativePathLocalError ledger;
    ledger.path_id = paths[a].id;
    ledger.position_errors = result.growth_position;
    ledger.velocity_errors = result.growth_velocity;
    ledger.position_error = *std::max_element(
        result.growth_position.begin(), result.growth_position.end());
    ledger.velocity_error = *std::max_element(
        result.growth_velocity.begin(), result.growth_velocity.end());
    certificate.local_errors.push_back(std::move(ledger));
  }
  if (increment.has_value()) {
    for (const auto& ledger : certificate.local_errors) {
      if (ledger.position_error > increment->position ||
          ledger.velocity_error > increment->velocity) {
        return decline(certificate, "VFS-BUDGET-01",
                       "radius growth exceeds the declared increment budget");
      }
    }
  }
  if (total.has_value()) {
    for (const auto& result : certificate.paths) {
      for (std::size_t axis = 0; axis < 3; ++axis) {
        if (result.position_radius[axis] > total->position ||
            result.velocity_radius[axis] > total->velocity) {
          return decline(certificate, "VFS-BUDGET-02",
                         "total published radius exceeds the declared budget");
        }
      }
    }
  }
  certificate.evidence = Evidence(new eom::ValidatedPopulationEvidence(
      coupling, start, certificate.end, std::move(members)));
  certificate.status = "certified";
  return certificate;
}

inline std::vector<Path> Producer::extend(
    const std::vector<Path>& paths, const Certificate& certificate) {
  if (certificate.status != "certified") {
    throw std::invalid_argument("a declined step has no continuation");
  }
  if (certificate.evidence == nullptr) {
    throw std::invalid_argument("certificate carries no producer evidence");
  }
  const auto& members = certificate.evidence->members();
  if (members.size() != paths.size() ||
      certificate.paths.size() != paths.size()) {
    throw std::invalid_argument("certificate population differs");
  }
  std::vector<Path> next;
  for (std::size_t a = 0; a < paths.size(); ++a) {
    const auto& result = certificate.paths[a];
    if (result.id != paths[a].id || members[a].path_id != paths[a].id ||
        members[a].charge != paths[a].charge || !result.segment.has_value()) {
      throw std::invalid_argument("certificate path, charge or segment differs");
    }
    if (members[a].digest_before !=
        eom::validated_history_digest(paths[a].history)) {
      throw std::invalid_argument(
          "certificate was issued for a different preceding history");
    }
    next.push_back({paths[a].id, paths[a].charge,
                    paths[a].history.appended(*result.segment)});
    if (members[a].digest_after !=
        eom::validated_history_digest(next.back().history)) {
      throw std::invalid_argument(
          "certificate's published segments were altered");
    }
  }
  return next;
}

}  // namespace vfs
