// A serial validated far-step producer on the EOM interval and history
// types: one step of hypotheses H0 to H5 of the generated-history addenda.
// It publishes, for every path, a cubic history segment whose declared
// position and velocity radii enclose the true continuation at every time of
// the step, or it declines and publishes nothing. c_f = 1.
//
// Scope. This unit is not called by evolution. The evolution entry points
// refuse every grouped policy, and nothing here is persisted or transported.
// It serves single-time snapshots through the validated-tube matched-pair
// policy, which admits its histories only with the evidence it issues.
//
// Publication. Every published coefficient and radius is the exact decimal
// expansion of a binary64 value, so the published curve is exactly the curve
// the radii were computed about; the one operation that can round, halving
// the acceleration centre, is debited when it does. Whole-step coverage is
// certified by lower bounds of the Bernstein coefficients of the slack
// polynomials. The step end is the exact decimal sum of the start and step
// tokens; histories must end at exactly the start token and begin at one
// common token; every duration-dependent bound uses an upper bound of the
// emitted segment's extent.
//
// Growth. The growth a step reports, and the increment budget is compared
// with, is measured from the radius the supplied history declares at the
// step start to the radius the step publishes, rounded upward: declared plus
// growth is never below the published radius. It therefore includes the
// widening of the evaluated and recentred starting section beyond the
// declared radius, which is also reported on its own.
//
// Evidence. A certified step issues a sealed ValidatedPopulationEvidence. A
// population with declared radii is admitted only with such evidence whose
// content chains equal those recomputed from the histories supplied.
#pragma once

#include "architrino/eom/CoupledEvolution.hpp"
#include "architrino/eom/History.hpp"
#include "architrino/eom/Interval.hpp"
#include "architrino/eom/ValidatedEvidence.hpp"

#include <array>
#include <cstddef>
#include <map>
#include <memory>
#include <optional>
#include <string>
#include <vector>

namespace architrino::eom {

// Shortest round-trip text of a binary64 value; for printing only.
[[nodiscard]] std::string validated_far_step_number_token(double value);
// The exact decimal expansion of a finite binary64 value.
[[nodiscard]] std::string validated_far_step_exact_token(double value);
// Optional '-', digits, optional '.' and digits; no exponent.
[[nodiscard]] bool validated_far_step_plain_decimal(const std::string& text);
// Exact sum of two plain decimal tokens, as a plain decimal token.
[[nodiscard]] std::string validated_far_step_decimal_sum(
    const std::string& a, const std::string& b);

struct ValidatedFarStepPath {
  std::string id;
  std::string charge;
  eom::RetainedHistory history;
};

struct ValidatedFarStepBudgets {
  double position;
  double velocity;
};

struct ValidatedFarStepPairInfo {
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

struct ValidatedFarStepPathResult {
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
  // A binary64 value not above the radius the supplied history declares at
  // the step start; equal to it when that radius is a binary64 value.
  std::array<double, 3> declared_position{};
  std::array<double, 3> declared_velocity{};
  // The charge: an upper bound of the published radius minus the declared
  // radius. This is what the increment budget is compared with.
  std::array<double, 3> growth_position{};
  std::array<double, 3> growth_velocity{};
  // The two parts of the charge, each rounded upward: the widening of the
  // evaluated and recentred starting section beyond the declared radius, and
  // the growth over the step from that section.
  std::array<double, 3> section_allowance_position{};
  std::array<double, 3> section_allowance_velocity{};
  std::array<double, 3> step_growth_position{};
  std::array<double, 3> step_growth_velocity{};
  // Smallest certified lower bound of the Bernstein coefficients of the
  // position and velocity slack polynomials over the whole step.
  double whole_step_slack = 0.0;
  std::optional<eom::CubicHistorySegment> segment;
};

struct ValidatedFarStepCertificate {
  std::string status = "declined";
  std::string code;
  std::string reason;
  // Which origin a refusal had, where one code has more than one. For
  // VFS-H1-01: "retained_past_speed" or "step_velocity_box". Empty otherwise.
  std::string cause;
  std::string start;
  std::string step;
  std::string end;
  std::string coupling;
  double duration_cover = 0.0;
  double history_start = 0.0;
  double speed_upper = 0.0;
  std::size_t enclosure_iterations = 0;
  std::vector<ValidatedFarStepPairInfo> pairs;
  std::vector<ValidatedFarStepPathResult> paths;
  // The step's growth in the solver's own per-path local-error record.
  std::vector<eom::NativePathLocalError> local_errors;
  // Issued only on certification; binds the published population.
  std::shared_ptr<const eom::ValidatedPopulationEvidence> evidence;
};

using ValidatedFarStepEvidence = std::shared_ptr<const eom::ValidatedPopulationEvidence>;

class ValidatedFarStepProducer {
 public:
  // `inherited` is the evidence issued by the step that published the
  // supplied histories. It is required when any history declares a radius.
  ValidatedFarStepCertificate step(
      const std::vector<ValidatedFarStepPath>& paths,
      const ValidatedFarStepEvidence& inherited,
      const std::string& start,
      const std::string& step_token,
      const std::string& coupling,
      const std::optional<ValidatedFarStepBudgets>& increment,
      const std::optional<ValidatedFarStepBudgets>& total = std::nullopt,
      std::size_t max_iterations = 12);

  // Empty when the population may begin a step at `start`: a nonempty
  // population with distinct identifiers, a coupling and charges that are
  // exact finite decimal tokens, one common history start token, every
  // history ending at exactly `start`, no analytic carrier, and evidence
  // that binds every path's content and charge under this coupling. Evidence
  // is required where any history declares a radius; evidence that is
  // supplied must bind whether or not a radius is declared. Otherwise the
  // reason. This is the H0 admission that step() applies, callable without
  // taking a step.
  [[nodiscard]] static std::string admission_refusal(
      const std::vector<ValidatedFarStepPath>& paths,
      const ValidatedFarStepEvidence& inherited,
      const std::string& start,
      const std::string& coupling);

  // Appends a certified step onto the population that generated it.
  static std::vector<ValidatedFarStepPath> extend(
      const std::vector<ValidatedFarStepPath>& paths, const ValidatedFarStepCertificate& certificate);

 private:
  double segment_speed_upper(const eom::CubicHistorySegment& segment);
  double past_speed_upper(const eom::RetainedHistory& history);
  // Keyed by every token that determines the value; nothing is read from or
  // written to caller data.
  std::map<std::string, double> speed_cache_;
};

}  // namespace architrino::eom
