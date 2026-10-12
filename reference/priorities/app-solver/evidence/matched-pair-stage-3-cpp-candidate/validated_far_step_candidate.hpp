// Scratch candidate, not production: a serial validated far-step producer
// using the EOM interval and history types. One step of hypotheses H0 to H5
// of the generated-history addenda. It publishes a cubic history segment
// whose declared position and velocity radii enclose the true continuation
// at every time of the step, or declines and publishes nothing. c_f = 1.
//
// Evidence. For each certified step the producer keeps, in this process, a
// record of the coupling and of every path's identifier, charge and history
// provenance fingerprint before and after the step, and registers the
// resulting population with the matched-pair module's validated-population
// registry. A population whose histories carry declared radii is admitted
// only when its (identifier, charge, fingerprint) set equals the published
// state of one record under the same coupling. A record exists only if the
// step that made it admitted its own input, so admission of the latest state
// binds the whole chain, to the strength of the history fingerprint.
#pragma once

#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/History.hpp"
#include "architrino/eom/Interval.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"

#include <algorithm>
#include <array>
#include <charconv>
#include <cmath>
#include <limits>
#include <map>
#include <optional>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace vfs {

namespace eom = architrino::eom;
using eom::Interval;
using eom::IntervalVector;

inline std::string token(double value) {
  if (!std::isfinite(value)) throw std::invalid_argument("nonfinite value");
  std::array<char, 64> buffer{};
  const auto result = std::to_chars(
      buffer.data(), buffer.data() + buffer.size(), value,
      std::chars_format::general, std::numeric_limits<double>::max_digits10);
  return std::string(buffer.data(), result.ptr);
}

// A decimal token whose exact value is at least `value`: two units in the
// last place above it, so seventeen-digit rounding cannot fall below.
inline std::string radius_token(double value) {
  const double inf = std::numeric_limits<double>::infinity();
  return token(std::nextafter(std::nextafter(value, inf), inf));
}

inline double up_sum(std::initializer_list<Interval> terms) {
  Interval total = Interval::point(0.0);
  for (const auto& term : terms) total = total + term;
  return total.upper();
}

// Hull of a history's position or velocity tube over [lower, upper], taken
// as the union of the history layer's own enclosures on abutting pieces. The
// layer evaluates a cubic with interval arithmetic, which overestimates on a
// wide window; a union of enclosures on narrower pieces is still an
// enclosure and is much tighter.
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
  IntervalVector result = evaluate(
      lower, pieces == 1 ? upper : lower + (upper - lower) / pieces);
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
  std::string fingerprint_before;
  std::string fingerprint_after;
  IntervalVector position_box{Interval::point(0), Interval::point(0),
                              Interval::point(0)};
  IntervalVector acceleration{Interval::point(0), Interval::point(0),
                              Interval::point(0)};
  std::array<double, 3> position_radius{};
  std::array<double, 3> velocity_radius{};
  double growth_position = 0.0;
  double growth_velocity = 0.0;
  double total_position = 0.0;
  double total_velocity = 0.0;
  double sampled_slack = 0.0;
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
  double history_start = 0.0;
  double speed_upper = 0.0;
  std::size_t enclosure_iterations = 0;
  std::size_t record_index = 0;
  std::vector<PairInfo> pairs;
  std::vector<PathResult> paths;
};

class Producer {
 public:
  Certificate step(
      const std::vector<Path>& paths,
      const std::string& start,
      const std::string& step_token,
      const std::string& coupling,
      const std::optional<Budgets>& increment,
      const std::optional<Budgets>& total = std::nullopt,
      std::size_t max_iterations = 12);

  // Appends a certified step onto the population that generated it.
  std::vector<Path> extend(
      const std::vector<Path>& paths, const Certificate& certificate) const;

  [[nodiscard]] std::size_t record_count() const { return records_.size(); }

 private:
  using State = std::vector<std::array<std::string, 3>>;
  struct Record {
    std::string start, step, coupling;
    State before, after;
  };
  static State state_of(const std::vector<Path>& paths) {
    State state;
    for (const auto& path : paths) {
      state.push_back({path.id, path.charge,
                       path.history.provenance_fingerprint()});
    }
    std::sort(state.begin(), state.end());
    return state;
  }
  static bool same_state(const State& left, const State& right) {
    if (left.size() != right.size()) return false;
    for (std::size_t i = 0; i < left.size(); ++i) {
      if (left[i][0] != right[i][0] || left[i][2] != right[i][2] ||
          eom::compare_exact_decimal_tokens(left[i][1], right[i][1]) != 0) {
        return false;
      }
    }
    return true;
  }
  double segment_speed_upper(const eom::CubicHistorySegment& segment);
  double past_speed_upper(const eom::RetainedHistory& history);

  std::vector<Record> records_;
  // Keyed by every token that determines the value; nothing is read from or
  // written to caller data.
  std::map<std::string, double> speed_cache_;
};

inline Certificate decline(
    Certificate certificate, std::string code, std::string reason) {
  certificate.status = "declined";
  certificate.code = std::move(code);
  certificate.reason = std::move(reason);
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
  // Interval evaluation of a quadratic over a whole segment overestimates;
  // sixty-four abutting pieces keep the bound close to the true maximum.
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
  const double start_value = eom::parse_finite_double(start, "step start");
  const double step_value = eom::parse_finite_double(step_token, "step");
  if (paths.empty() || !(step_value > 0.0)) {
    return decline(certificate, "VFS-H0-01", "empty population or step");
  }
  certificate.end = token(start_value + step_value);
  const Interval T = Interval::decimal_token(start);
  const Interval h = Interval::decimal_token(step_token);
  const Interval kappa = Interval::decimal_token(coupling);

  // H0.
  bool any_radius = false;
  for (std::size_t i = 0; i < paths.size(); ++i) {
    const auto& history = paths[i].history;
    for (std::size_t j = 0; j < i; ++j) {
      if (paths[j].id == paths[i].id) {
        return decline(certificate, "VFS-H0-01", "duplicate path identifier");
      }
    }
    if (history.t_start() != paths.front().history.t_start()) {
      return decline(
          certificate, "VFS-H0-01",
          "retained histories do not start at one common time");
    }
    if (history.t_end() != start_value) {
      return decline(certificate, "VFS-H0-01",
                     "a history does not end at the step start");
    }
    if (history.uniform_circular_endpoint_certificate().has_value()) {
      return decline(certificate, "VFS-H0-01",
                     "analytic carrier is outside this candidate");
    }
    const auto& segments = history.segments();
    for (std::size_t k = 0; k < segments.size(); ++k) {
      const auto segment = segments.at(k);
      for (std::size_t axis = 0; axis < 3; ++axis) {
        any_radius = any_radius || segment.position_errors()[axis] != 0.0 ||
            segment.velocity_errors()[axis] != 0.0;
      }
    }
  }
  const State before = state_of(paths);
  if (any_radius) {
    bool bound = false;
    bool coupling_differs = false;
    for (const auto& record : records_) {
      if (!same_state(record.after, before)) continue;
      if (eom::compare_exact_decimal_tokens(record.coupling, coupling) == 0) {
        bound = true;
        break;
      }
      coupling_differs = true;
    }
    if (!bound) {
      return decline(
          certificate, "VFS-H0-01",
          coupling_differs
              ? "generated history was published under a different coupling"
              : "histories carry declared radii but are not the published "
                "state of a step of this producer for this population and "
                "these charges");
    }
  }
  const double s_min = paths.front().history.t_start();
  certificate.history_start = s_min;
  const Interval S_min = Interval::point(s_min);

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
    result.fingerprint_before = path.history.provenance_fingerprint();
    certificate.paths.push_back(std::move(result));
  }
  const Interval span(0.0, h.upper());
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
        if (!(eom::norm(eom::subtract(boxes[a], boxes[b])).lower() >
              h.upper())) {
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
        const Interval start_distance = eom::norm(
            eom::subtract(boxes[a], source.position_hull(S_min)));
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
        double hi = start_value;
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

  // Tube and publication. About the chosen centres e0, e1, eA of the
  // inherited sections and of the acceleration box, the true state at
  // T + tau lies within rho_x + tau rho_v + tau^2 rho_a / 2 of
  // e0 + tau e1 + tau^2 eA / 2, and its velocity within rho_v + tau rho_a of
  // e1 + tau eA. The published radii are those bounds at tau = h, rounded up;
  // they dominate the bounds at every tau in the step because every term is
  // nonnegative and nondecreasing in tau. The published cubic has exactly
  // the centres as coefficients, and the history layer evaluates it with
  // outward enclosures of those tokens.
  std::vector<Path> next;
  const Interval hu = Interval::point(h.upper());
  for (std::size_t a = 0; a < paths.size(); ++a) {
    auto& result = certificate.paths[a];
    eom::CubicCoefficientTokens coefficients;
    eom::HistoryErrorTokens position_errors;
    eom::HistoryErrorTokens velocity_errors;
    for (std::size_t axis = 0; axis < 3; ++axis) {
      const Interval& X0 = sections[a].position[axis];
      const Interval& V0 = sections[a].velocity[axis];
      const Interval& A = accelerations[a][axis];
      const double e0 = X0.midpoint();
      const double e1 = V0.midpoint();
      const double eA = A.midpoint();
      const auto radius = [](const Interval& box, double centre) {
        return std::max(
            (Interval::point(centre) - Interval::point(box.lower())).upper(),
            (Interval::point(box.upper()) - Interval::point(centre)).upper());
      };
      const Interval rho_x = Interval::point(radius(X0, e0));
      const Interval rho_v = Interval::point(radius(V0, e1));
      const Interval rho_a = Interval::point(radius(A, eA));
      const double radius_x = up_sum(
          {rho_x, hu * rho_v,
           eom::interval_square(hu) * rho_a * Interval::point(0.5)});
      const double radius_v = up_sum({rho_v, hu * rho_a});
      coefficients[axis] = {token(e0), token(e1), token(eA * 0.5), "0"};
      position_errors[axis] = radius_token(radius_x);
      velocity_errors[axis] = radius_token(radius_v);
      result.position_radius[axis] =
          eom::parse_finite_double(position_errors[axis], "radius");
      result.velocity_radius[axis] =
          eom::parse_finite_double(velocity_errors[axis], "radius");
      result.growth_position = std::max(
          result.growth_position,
          (Interval::point(result.position_radius[axis]) - rho_x).upper());
      result.growth_velocity = std::max(
          result.growth_velocity,
          (Interval::point(result.velocity_radius[axis]) - rho_v).upper());
      result.total_position =
          std::max(result.total_position, result.position_radius[axis]);
      result.total_velocity =
          std::max(result.total_velocity, result.velocity_radius[axis]);
    }
    try {
      eom::CubicHistorySegment segment(
          start, certificate.end, coefficients, position_errors,
          velocity_errors);
      // Sampled guard of the whole-step comparison: at nine times the
      // theorem's position and velocity sets must lie inside the published
      // segment's own evaluation. The proof is the monotone bound above.
      double slack = std::numeric_limits<double>::infinity();
      for (int k = 0; k <= 8; ++k) {
        const double tau_value = h.upper() * (static_cast<double>(k) / 8.0);
        const Interval tau = Interval::point(tau_value);
        const Interval time = Interval::point(
            std::min(start_value + tau_value, start_value + step_value));
        const Interval local = Interval::point(time.lower() - start_value);
        const IntervalVector want_x = eom::add(
            eom::add(sections[a].position,
                     eom::scale(local, sections[a].velocity)),
            eom::scale(eom::interval_square(local) * Interval::point(0.5),
                       accelerations[a]));
        const IntervalVector want_v = eom::add(
            sections[a].velocity, eom::scale(local, accelerations[a]));
        const IntervalVector have_x = segment.position_interval(time);
        const IntervalVector have_v = segment.velocity_interval(time);
        (void)tau;
        for (std::size_t axis = 0; axis < 3; ++axis) {
          slack = std::min({slack,
                            want_x[axis].lower() - have_x[axis].lower(),
                            have_x[axis].upper() - want_x[axis].upper(),
                            want_v[axis].lower() - have_v[axis].lower(),
                            have_v[axis].upper() - want_v[axis].upper()});
        }
      }
      result.sampled_slack = slack;
      if (slack < 0.0) {
        return decline(certificate, "VFS-PUB-01",
                       "published tube misses the theorem's set at a sample");
      }
      next.push_back({paths[a].id, paths[a].charge,
                      paths[a].history.appended(segment)});
      result.segment = std::move(segment);
      result.fingerprint_after = next.back().history.provenance_fingerprint();
    } catch (const std::exception& error) {
      return decline(certificate, "VFS-PUB-01",
                     std::string("history layer refused the segment: ") +
                         error.what());
    }
  }
  if (increment.has_value()) {
    for (const auto& result : certificate.paths) {
      if (result.growth_position > increment->position ||
          result.growth_velocity > increment->velocity) {
        return decline(certificate, "VFS-BUDGET-01",
                       "radius growth exceeds the declared increment budget");
      }
    }
  }
  if (total.has_value()) {
    for (const auto& result : certificate.paths) {
      if (result.total_position > total->position ||
          result.total_velocity > total->velocity) {
        return decline(certificate, "VFS-BUDGET-02",
                       "total published radius exceeds the declared budget");
      }
    }
  }
  Record record{start, step_token, coupling, before, state_of(next)};
  eom::MatchedPairValidatedPopulation population;
  population.coupling = coupling;
  for (const auto& entry : record.after) {
    population.members.push_back({entry[0], entry[1], entry[2]});
  }
  eom::matched_pair_register_validated_population(std::move(population));
  records_.push_back(std::move(record));
  certificate.record_index = records_.size();
  certificate.status = "certified";
  return certificate;
}

inline std::vector<Path> Producer::extend(
    const std::vector<Path>& paths, const Certificate& certificate) const {
  if (certificate.status != "certified") {
    throw std::invalid_argument("a declined step has no continuation");
  }
  if (certificate.record_index == 0 ||
      certificate.record_index > records_.size()) {
    throw std::invalid_argument("certificate was not issued by this producer");
  }
  const Record& record = records_[certificate.record_index - 1];
  if (!same_state(record.before, state_of(paths)) ||
      record.start != certificate.start || record.step != certificate.step ||
      record.coupling != certificate.coupling) {
    throw std::invalid_argument(
        "certificate was issued for a different preceding population");
  }
  if (certificate.paths.size() != paths.size()) {
    throw std::invalid_argument("certificate population differs");
  }
  std::vector<Path> next;
  for (std::size_t a = 0; a < paths.size(); ++a) {
    const auto& result = certificate.paths[a];
    if (result.id != paths[a].id || !result.segment.has_value()) {
      throw std::invalid_argument("certificate path order or segment differs");
    }
    next.push_back({paths[a].id, paths[a].charge,
                    paths[a].history.appended(*result.segment)});
  }
  if (!same_state(record.after, state_of(next))) {
    throw std::invalid_argument("certificate's published segments were altered");
  }
  return next;
}

}  // namespace vfs
