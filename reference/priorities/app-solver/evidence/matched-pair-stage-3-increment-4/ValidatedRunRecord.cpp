#include "architrino/eom/ValidatedRunRecord.hpp"

#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/MatchedPairEnclosure.hpp"

#include <boost/json.hpp>

#include <cmath>
#include <filesystem>
#include <fstream>
#include <functional>
#include <iterator>
#include <stdexcept>
#include <system_error>
#include <utility>

namespace architrino::eom {

namespace json = boost::json;

// Builds and reads records. Declared a friend so that only this unit can
// construct a record's private state.
struct ValidatedRunRecordAccess {
  static ValidatedRunRecord empty() { return ValidatedRunRecord(); }
  static ValidatedRunControls& controls(ValidatedRunRecord& r) {
    return r.controls_;
  }
  static std::string& origin_time(ValidatedRunRecord& r) {
    return r.origin_time_;
  }
  static std::vector<ValidatedFarStepPath>& origin(ValidatedRunRecord& r) {
    return r.origin_;
  }
  static std::vector<ValidatedRunLeg>& legs(ValidatedRunRecord& r) {
    return r.legs_;
  }
  static std::vector<ValidatedRunStep>& steps(ValidatedRunRecord& r) {
    return r.steps_;
  }
  static ValidatedRunFinalState& final_state(ValidatedRunRecord& r) {
    return r.final_;
  }
  static std::vector<std::string>& last_chains(ValidatedRunRecord& r) {
    return r.last_chains_;
  }
};

namespace {

std::string quoted(const std::string& text) {
  return json::serialize(json::value(text));
}

std::string triple(const std::array<double, 3>& values) {
  return "[" + quoted(validated_far_step_exact_token(values[0])) + "," +
      quoted(validated_far_step_exact_token(values[1])) + "," +
      quoted(validated_far_step_exact_token(values[2])) + "]";
}

std::string budget_text(const ValidatedFarStepBudgets& budget) {
  return "[" + quoted(validated_far_step_exact_token(budget.position)) + "," +
      quoted(validated_far_step_exact_token(budget.velocity)) + "]";
}

std::string axis_text(const ValidatedAxisLedger& axis) {
  return "{\"inherited\":" + triple(axis.inherited) + ",\"increment\":" +
      triple(axis.increment) + ",\"total\":" + triple(axis.total) +
      ",\"section_allowance\":" + triple(axis.section_allowance) +
      ",\"step_growth\":" + triple(axis.step_growth) + "}";
}

bool same_budget(const ValidatedFarStepBudgets& a,
                 const ValidatedFarStepBudgets& b) {
  return a.position == b.position && a.velocity == b.velocity;
}

bool same_axis(const ValidatedAxisLedger& a, const ValidatedAxisLedger& b) {
  return a.inherited == b.inherited && a.increment == b.increment &&
      a.total == b.total && a.section_allowance == b.section_allowance &&
      a.step_growth == b.step_growth;
}

bool same_ledger(const std::vector<ValidatedPathLedger>& a,
                 const std::vector<ValidatedPathLedger>& b) {
  if (a.size() != b.size()) return false;
  for (std::size_t i = 0; i < a.size(); ++i) {
    if (a[i].path_id != b[i].path_id ||
        !same_axis(a[i].position, b[i].position) ||
        !same_axis(a[i].velocity, b[i].velocity)) {
      return false;
    }
  }
  return true;
}

// True when two decimal tokens denote the same number. A token that is not
// an exact decimal equals nothing.
bool same_number(const std::string& a, const std::string& b) {
  try {
    return compare_exact_decimal_tokens(a, b) == 0;
  } catch (const std::exception&) {
    return false;
  }
}

ValidatedRunControls controls_of(const ValidatedEvolutionRequest& request) {
  ValidatedRunControls c;
  c.policy = request.policy;
  c.field_speed = request.field_speed;
  c.coupling = request.coupling;
  c.initial_step = request.initial_step;
  c.minimum_step = request.minimum_step;
  c.increment_budget = request.increment_budget;
  c.total_budget = request.total_budget;
  c.max_attempts_per_step = request.max_attempts_per_step;
  c.max_lower_sign_retries = request.max_lower_sign_retries;
  c.growth_cooldown_steps = request.growth_cooldown_steps;
  c.pair_policy = request.pair_policy;
  c.groups = request.groups;
  return c;
}

// The controls a sealed continuation binds. It does not bind the field
// speed, which the driver fixes at 1; the caller's value is carried over.
ValidatedRunControls controls_of(const ValidatedEvolutionState& state,
                                 const std::string& field_speed) {
  ValidatedRunControls c;
  c.policy = state.policy;
  c.field_speed = field_speed;
  c.coupling = state.coupling;
  c.initial_step = state.initial_step;
  c.minimum_step = state.minimum_step;
  c.increment_budget = state.increment_budget;
  c.total_budget = state.total_budget;
  c.max_attempts_per_step = state.max_attempts_per_step;
  c.max_lower_sign_retries = state.max_lower_sign_retries;
  c.growth_cooldown_steps = state.growth_cooldown_steps;
  c.pair_policy = state.pair_policy;
  c.groups = state.groups;
  return c;
}

std::vector<std::string> chains_of(
    const std::vector<ValidatedFarStepPath>& paths) {
  std::vector<std::string> chains;
  for (const auto& path : paths) {
    chains.push_back(validated_history_digest(path.history));
  }
  return chains;
}

std::string body_text(const ValidatedRunRecord& record) {
  const ValidatedRunControls& c = record.controls();
  std::string out = "{\"scalars\":{\"field_speed\":" + quoted(c.field_speed) +
      ",\"coupling\":" + quoted(c.coupling) + "},\"policies\":{\"evolution\":" +
      quoted(c.policy) + ",\"pair\":" + quoted(c.pair_policy) +
      ",\"groups\":[";
  for (std::size_t i = 0; i < c.groups.size(); ++i) {
    out += std::string(i ? "," : "") + "[" + quoted(c.groups[i].leader) + "," +
        quoted(c.groups[i].follower) + "]";
  }
  out += "]},\"controls\":{\"initial_step\":" + quoted(c.initial_step) +
      ",\"minimum_step\":" + quoted(c.minimum_step) +
      ",\"increment_budget\":" + budget_text(c.increment_budget) +
      ",\"total_budget\":" +
      (c.total_budget.has_value() ? budget_text(*c.total_budget)
                                  : std::string("null")) +
      ",\"max_attempts_per_step\":" + std::to_string(c.max_attempts_per_step) +
      ",\"max_lower_sign_retries\":" +
      std::to_string(c.max_lower_sign_retries) +
      ",\"growth_cooldown_steps\":" + std::to_string(c.growth_cooldown_steps) +
      "},\"origin\":{\"time\":" + quoted(record.origin_time()) +
      ",\"paths\":[";
  for (std::size_t i = 0; i < record.origin().size(); ++i) {
    const auto& path = record.origin()[i];
    out += std::string(i ? "," : "") + "{\"id\":" + quoted(path.id) +
        ",\"charge\":" + quoted(path.charge) + ",\"history_id\":" +
        quoted(path.history.history_id()) + ",\"segments\":[";
    const auto& segments = path.history.segments();
    for (std::size_t k = 0; k < segments.size(); ++k) {
      const auto segment = segments.at(k);
      out += std::string(k ? "," : "") + "{\"start\":" +
          quoted(segment.t_start_token()) + ",\"end\":" +
          quoted(segment.t_end_token()) + ",\"coefficients\":[";
      for (std::size_t axis = 0; axis < 3; ++axis) {
        out += std::string(axis ? "," : "") + "[";
        for (std::size_t j = 0; j < 4; ++j) {
          out += std::string(j ? "," : "") +
              quoted(segment.coefficient_tokens()[axis][j]);
        }
        out += "]";
      }
      out += "],\"position_error\":[";
      for (std::size_t axis = 0; axis < 3; ++axis) {
        out += std::string(axis ? "," : "") +
            quoted(segment.position_error_tokens()[axis]);
      }
      out += "],\"velocity_error\":[";
      for (std::size_t axis = 0; axis < 3; ++axis) {
        out += std::string(axis ? "," : "") +
            quoted(segment.velocity_error_tokens()[axis]);
      }
      out += "]}";
    }
    out += "]}";
  }
  out += "]},\"legs\":[";
  for (std::size_t i = 0; i < record.legs().size(); ++i) {
    const auto& leg = record.legs()[i];
    out += std::string(i ? "," : "") + "{\"end_time\":" +
        quoted(leg.end_time) + ",\"max_accepted_steps\":" +
        std::to_string(leg.max_accepted_steps) + ",\"cancelled_after\":" +
        (leg.cancelled_after.has_value()
             ? std::to_string(*leg.cancelled_after) : std::string("null")) +
        ",\"status\":" + quoted(leg.status) + ",\"halt_code\":" +
        quoted(leg.halt_code) + ",\"accepted_steps\":" +
        std::to_string(leg.accepted_steps) + "}";
  }
  out += "],\"steps\":[";
  for (std::size_t i = 0; i < record.steps().size(); ++i) {
    const auto& step = record.steps()[i];
    out += std::string(i ? "," : "") + "{\"ordinal\":" +
        std::to_string(step.ordinal) + ",\"start\":" + quoted(step.start) +
        ",\"step\":" + quoted(step.step) + ",\"end\":" + quoted(step.end) +
        ",\"chains\":[";
    for (std::size_t k = 0; k < step.chains.size(); ++k) {
      out += std::string(k ? "," : "") + quoted(step.chains[k]);
    }
    out += "]}";
  }
  const ValidatedRunFinalState& f = record.final_state();
  out += "],\"final\":{\"accepted_time\":" + quoted(f.accepted_time) +
      ",\"controller_step_size\":" + quoted(f.controller_step_size) +
      ",\"cooldown_remaining\":" + std::to_string(f.cooldown_remaining) +
      ",\"accepted_step_count\":" + std::to_string(f.accepted_step_count) +
      ",\"ledger\":[";
  for (std::size_t i = 0; i < f.ledger.size(); ++i) {
    out += std::string(i ? "," : "") + "{\"path\":" +
        quoted(f.ledger[i].path_id) + ",\"position\":" +
        axis_text(f.ledger[i].position) + ",\"velocity\":" +
        axis_text(f.ledger[i].velocity) + "}";
  }
  return out + "]}}";
}

std::string record_text(const std::string& body) {
  return std::string("{\"format\":") + quoted(kValidatedRunRecordFormat) +
      ",\"digest\":" + quoted(sha256_hex(body)) + ",\"body\":" + body + "}";
}

// ----------------------------------------------------------------- reading
[[noreturn]] void malformed(const std::string& what) {
  throw std::invalid_argument("malformed record: " + what);
}

const json::object& object_of(const json::value& value,
                              const std::string& name) {
  if (!value.is_object()) malformed(name + " is not an object");
  return value.get_object();
}

const json::value& member(const json::object& object,
                          const std::string& name) {
  const auto found = object.find(name);
  if (found == object.end()) malformed("missing " + name);
  return found->value();
}

std::string text_of(const json::object& object, const std::string& name) {
  const json::value& value = member(object, name);
  if (!value.is_string()) malformed(name + " is not a string");
  return std::string(value.get_string().c_str(), value.get_string().size());
}

std::string text_of(const json::value& value, const std::string& name) {
  if (!value.is_string()) malformed(name + " is not a string");
  return std::string(value.get_string().c_str(), value.get_string().size());
}

std::size_t count_of(const json::value& value, const std::string& name) {
  if (value.is_int64() && value.get_int64() >= 0) {
    return static_cast<std::size_t>(value.get_int64());
  }
  if (value.is_uint64()) return static_cast<std::size_t>(value.get_uint64());
  malformed(name + " is not a nonnegative integer");
}

std::size_t count_of(const json::object& object, const std::string& name) {
  return count_of(member(object, name), name);
}

const json::array& array_of(const json::object& object,
                            const std::string& name, std::size_t size = 0) {
  const json::value& value = member(object, name);
  if (!value.is_array()) malformed(name + " is not an array");
  if (size != 0 && value.get_array().size() != size) {
    malformed(name + " has the wrong length");
  }
  return value.get_array();
}

double finite_of(const json::value& value, const std::string& name) {
  const std::string token = text_of(value, name);
  try {
    return parse_finite_double(token, name);
  } catch (const std::exception&) {
    malformed(name + " is not a finite decimal token");
  }
}

ValidatedFarStepBudgets budget_of(const json::value& value,
                                  const std::string& name) {
  if (!value.is_array() || value.get_array().size() != 2U) {
    malformed(name + " is not a pair");
  }
  const ValidatedFarStepBudgets budget{
      finite_of(value.get_array()[0], name),
      finite_of(value.get_array()[1], name)};
  if (!(budget.position > 0.0) || !(budget.velocity > 0.0)) {
    malformed(name + " is not finite and positive");
  }
  return budget;
}

std::array<double, 3> triple_of(const json::object& object,
                                const std::string& name) {
  const json::array& values = array_of(object, name, 3U);
  return {finite_of(values[0], name), finite_of(values[1], name),
          finite_of(values[2], name)};
}

ValidatedAxisLedger axis_of(const json::object& object,
                            const std::string& name) {
  const json::object& axis = object_of(member(object, name), name);
  ValidatedAxisLedger out;
  out.inherited = triple_of(axis, "inherited");
  out.increment = triple_of(axis, "increment");
  out.total = triple_of(axis, "total");
  out.section_allowance = triple_of(axis, "section_allowance");
  out.step_growth = triple_of(axis, "step_growth");
  return out;
}

// Parses the body of a record. Throws std::invalid_argument when it is not
// a well-formed record of this format's admitted domain.
ValidatedRunRecord record_of_body(const json::value& body_value) {
  const json::object& body = object_of(body_value, "body");
  ValidatedRunRecord record = ValidatedRunRecordAccess::empty();
  ValidatedRunControls& c = ValidatedRunRecordAccess::controls(record);
  const json::object& scalars = object_of(member(body, "scalars"), "scalars");
  c.field_speed = text_of(scalars, "field_speed");
  c.coupling = text_of(scalars, "coupling");
  const json::object& policies =
      object_of(member(body, "policies"), "policies");
  c.policy = text_of(policies, "evolution");
  c.pair_policy = text_of(policies, "pair");
  for (const json::value& group : array_of(policies, "groups")) {
    if (!group.is_array() || group.get_array().size() != 2U) {
      malformed("a declared group is not a pair");
    }
    c.groups.push_back({text_of(group.get_array()[0], "group member"),
                        text_of(group.get_array()[1], "group member")});
  }
  const json::object& controls =
      object_of(member(body, "controls"), "controls");
  c.initial_step = text_of(controls, "initial_step");
  c.minimum_step = text_of(controls, "minimum_step");
  c.increment_budget =
      budget_of(member(controls, "increment_budget"), "increment_budget");
  const json::value& total = member(controls, "total_budget");
  if (!total.is_null()) c.total_budget = budget_of(total, "total_budget");
  c.max_attempts_per_step = count_of(controls, "max_attempts_per_step");
  c.max_lower_sign_retries = count_of(controls, "max_lower_sign_retries");
  c.growth_cooldown_steps = count_of(controls, "growth_cooldown_steps");

  if (c.policy != kValidatedFarStepEvolutionPolicy) {
    malformed("unknown evolution policy token");
  }
  if ((c.pair_policy != "disabled" &&
       c.pair_policy != kValidatedWholeStepPairPolicy) ||
      (c.pair_policy == "disabled") != c.groups.empty()) {
    malformed("the pair policy and the declared groups do not agree");
  }
  if (!same_number(c.field_speed, "1")) malformed("field speed is not 1");
  if (!same_number(c.coupling, c.coupling)) {
    malformed("coupling is not an exact decimal token");
  }
  if (!validated_far_step_plain_decimal(c.initial_step) ||
      !validated_far_step_plain_decimal(c.minimum_step)) {
    malformed("a step control is not a plain decimal token");
  }

  const json::object& origin = object_of(member(body, "origin"), "origin");
  ValidatedRunRecordAccess::origin_time(record) = text_of(origin, "time");
  if (!validated_far_step_plain_decimal(record.origin_time())) {
    malformed("origin time is not a plain decimal token");
  }
  for (const json::value& path_value : array_of(origin, "paths")) {
    const json::object& path = object_of(path_value, "origin path");
    std::vector<CubicHistorySegment> segments;
    for (const json::value& segment_value : array_of(path, "segments")) {
      const json::object& segment = object_of(segment_value, "segment");
      CubicCoefficientTokens coefficients;
      const json::array& rows = array_of(segment, "coefficients", 3U);
      for (std::size_t axis = 0; axis < 3; ++axis) {
        if (!rows[axis].is_array() || rows[axis].get_array().size() != 4U) {
          malformed("a coefficient row does not have four tokens");
        }
        for (std::size_t j = 0; j < 4; ++j) {
          coefficients[axis][j] =
              text_of(rows[axis].get_array()[j], "coefficient");
        }
      }
      HistoryErrorTokens position;
      HistoryErrorTokens velocity;
      const json::array& px = array_of(segment, "position_error", 3U);
      const json::array& pv = array_of(segment, "velocity_error", 3U);
      for (std::size_t axis = 0; axis < 3; ++axis) {
        position[axis] = text_of(px[axis], "position_error");
        velocity[axis] = text_of(pv[axis], "velocity_error");
        bool exact = false;
        try {
          exact = exact_decimal_token_is_zero(position[axis]) &&
              exact_decimal_token_is_zero(velocity[axis]);
        } catch (const std::exception&) {
          exact = false;
        }
        if (!exact) malformed("the origin is not exact: it declares a radius");
      }
      try {
        segments.emplace_back(text_of(segment, "start"),
                              text_of(segment, "end"), coefficients, position,
                              velocity);
      } catch (const std::invalid_argument&) {
        throw;
      } catch (const std::exception& error) {
        malformed(std::string("origin segment: ") + error.what());
      }
    }
    if (segments.empty()) malformed("an origin path has no segment");
    try {
      ValidatedRunRecordAccess::origin(record).push_back(
          {text_of(path, "id"), text_of(path, "charge"),
           RetainedHistory(text_of(path, "history_id"), std::move(segments))});
    } catch (const std::invalid_argument& error) {
      malformed(std::string("origin history: ") + error.what());
    } catch (const std::exception& error) {
      malformed(std::string("origin history: ") + error.what());
    }
  }
  if (record.origin().empty()) malformed("the origin has no path");

  for (const json::value& leg_value : array_of(body, "legs")) {
    const json::object& leg = object_of(leg_value, "leg");
    ValidatedRunLeg out;
    out.end_time = text_of(leg, "end_time");
    out.max_accepted_steps = count_of(leg, "max_accepted_steps");
    const json::value& cancelled = member(leg, "cancelled_after");
    if (!cancelled.is_null()) {
      out.cancelled_after = count_of(cancelled, "cancelled_after");
    }
    out.status = text_of(leg, "status");
    out.halt_code = text_of(leg, "halt_code");
    out.accepted_steps = count_of(leg, "accepted_steps");
    if (!validated_far_step_plain_decimal(out.end_time)) {
      malformed("a leg's end is not a plain decimal token");
    }
    ValidatedRunRecordAccess::legs(record).push_back(std::move(out));
  }
  for (const json::value& step_value : array_of(body, "steps")) {
    const json::object& step = object_of(step_value, "step");
    ValidatedRunStep out;
    out.ordinal = count_of(step, "ordinal");
    out.start = text_of(step, "start");
    out.step = text_of(step, "step");
    out.end = text_of(step, "end");
    for (const json::value& chain :
         array_of(step, "chains", record.origin().size())) {
      out.chains.push_back(text_of(chain, "chain"));
    }
    ValidatedRunRecordAccess::steps(record).push_back(std::move(out));
  }
  const json::object& final_value =
      object_of(member(body, "final"), "final");
  ValidatedRunFinalState& f = ValidatedRunRecordAccess::final_state(record);
  f.accepted_time = text_of(final_value, "accepted_time");
  f.controller_step_size = text_of(final_value, "controller_step_size");
  f.cooldown_remaining = count_of(final_value, "cooldown_remaining");
  f.accepted_step_count = count_of(final_value, "accepted_step_count");
  for (const json::value& entry_value : array_of(final_value, "ledger")) {
    const json::object& entry = object_of(entry_value, "ledger entry");
    ValidatedPathLedger entry_out;
    entry_out.path_id = text_of(entry, "path");
    entry_out.position = axis_of(entry, "position");
    entry_out.velocity = axis_of(entry, "velocity");
    f.ledger.push_back(std::move(entry_out));
  }
  ValidatedRunRecordAccess::last_chains(record) =
      record.steps().empty() ? chains_of(record.origin())
                             : record.steps().back().chains;
  return record;
}

struct Parsed {
  json::value root;
  std::string digest;
};

// The outer shape only: an object with a format, a digest and a body.
Parsed outer(const std::string& bytes) {
  Parsed parsed;
  try {
    parsed.root = json::parse(bytes);
  } catch (const std::exception&) {
    malformed("not a JSON document");
  }
  const json::object& root = object_of(parsed.root, "record");
  if (text_of(root, "format") != kValidatedRunRecordFormat) {
    malformed("unknown format or version");
  }
  parsed.digest = text_of(root, "digest");
  (void)member(root, "body");
  return parsed;
}

// Reads and checks a record: shape, admitted domain, digest and canonical
// form. Throws std::invalid_argument with the reason otherwise.
ValidatedRunRecord checked_record(const std::string& bytes) {
  const Parsed parsed = outer(bytes);
  ValidatedRunRecord record =
      record_of_body(member(parsed.root.get_object(), "body"));
  const std::string body = body_text(record);
  if (sha256_hex(body) != parsed.digest) {
    throw std::invalid_argument(
        "the record's digest does not match its body");
  }
  if (record_text(body) != bytes) {
    throw std::invalid_argument("the record is not in canonical form");
  }
  return record;
}

bool is_identity(const std::string& text) {
  if (text.size() != 64U) return false;
  return text.find_first_not_of("0123456789abcdef") == std::string::npos;
}

ValidatedRestoreResult refused(ValidatedRestoreResult result,
                               std::string stage, std::string reason) {
  result.status = "refused";
  result.stage = std::move(stage);
  result.reason = std::move(reason);
  result.paths.clear();
  result.evidence.reset();
  result.continuation.reset();
  result.ledger.clear();
  result.record.reset();
  return result;
}

ValidatedRestoreResult restore(const std::string& bytes,
                               const ValidatedRestoreExpectation* expectation,
                               std::size_t worker_count) {
  ValidatedRestoreResult result;
  result.record_identity = validated_run_record_identity(bytes);
  if (expectation == nullptr) {
    result.identity_basis = "record_only";
  } else {
    const bool has_identity = expectation->record_identity.has_value();
    const bool has_controls = expectation->controls.has_value();
    const bool has_origin = expectation->origin.has_value();
    if (has_identity && (has_controls || has_origin)) {
      return refused(std::move(result), "expectation",
                     "a record identity cannot be combined with expected "
                     "controls or an expected origin");
    }
    if (has_origin && !has_controls) {
      return refused(std::move(result), "expectation",
                     "an expected origin requires expected controls");
    }
    if (!has_identity && !has_controls) {
      return refused(std::move(result), "expectation",
                     "no expectation was supplied; a record-only replay must "
                     "be requested as one");
    }
    result.identity_basis = has_identity ? "expected_record"
                                         : "expected_controls";
    if (has_identity) {
      result.compared_fields.push_back("record_identity");
      if (!is_identity(*expectation->record_identity)) {
        return refused(std::move(result), "expectation",
                       "the expected record identity is not a SHA-256 value");
      }
      if (*expectation->record_identity != result.record_identity) {
        return refused(std::move(result), "expectation",
                       "the record's bytes are not the expected record");
      }
    }
  }
  if (worker_count == 0U) {
    return refused(std::move(result), "read",
                   "worker count must be at least one");
  }
  std::optional<ValidatedRunRecord> claimed;
  try {
    claimed = checked_record(bytes);
  } catch (const std::exception& error) {
    return refused(std::move(result), "read", error.what());
  }
  result.controls = claimed->controls();
  if (expectation != nullptr && expectation->controls.has_value()) {
    for (const char* name :
         {"policy", "field_speed", "coupling", "initial_step", "minimum_step",
          "increment_budget", "total_budget", "max_attempts_per_step",
          "max_lower_sign_retries", "growth_cooldown_steps", "pair_policy",
          "groups"}) {
      result.compared_fields.emplace_back(name);
    }
    const std::string difference = validated_run_controls_difference(
        *expectation->controls, claimed->controls());
    if (!difference.empty()) {
      return refused(std::move(result), "expectation",
                     "the record's control differs from the expected one: " +
                         difference);
    }
    if (expectation->origin.has_value()) {
      result.compared_fields.emplace_back("origin");
      const auto actual = claimed->origin_members();
      const auto& expected = *expectation->origin;
      bool same = actual.size() == expected.size();
      for (std::size_t i = 0; same && i < actual.size(); ++i) {
        same = actual[i].path_id == expected[i].path_id &&
            actual[i].charge == expected[i].charge &&
            actual[i].chain == expected[i].chain;
      }
      if (!same) {
        return refused(std::move(result), "expectation",
                       "the record's origin is not the expected origin");
      }
    }
  }

  // Replay: the real entry point, leg by leg, from the exact origin. Only
  // what it issues is carried forward.
  const ValidatedRunControls& c = claimed->controls();
  ValidatedEvolutionRequest base;
  base.run_id = "validated-run-record-replay";
  base.policy = c.policy;
  base.field_speed = c.field_speed;
  base.coupling = c.coupling;
  base.initial_step = c.initial_step;
  base.minimum_step = c.minimum_step;
  base.increment_budget = c.increment_budget;
  base.total_budget = c.total_budget;
  base.max_attempts_per_step = c.max_attempts_per_step;
  base.max_lower_sign_retries = c.max_lower_sign_retries;
  base.growth_cooldown_steps = c.growth_cooldown_steps;
  base.pair_policy = c.pair_policy;
  base.groups = c.groups;
  base.worker_count = worker_count;

  std::vector<ValidatedFarStepPath> paths = claimed->origin();
  ValidatedFarStepEvidence evidence;
  std::shared_ptr<const ValidatedEvolutionContinuation> continuation;
  std::string time = claimed->origin_time();
  std::optional<ValidatedRunRecord> rebuilt;
  {
    ValidatedEvolutionRequest origin = base;
    origin.paths = paths;
    origin.start_time = time;
    origin.end_time = time;
    try {
      rebuilt = ValidatedRunRecord::open(origin);
    } catch (const std::exception& error) {
      return refused(std::move(result), "admission", error.what());
    }
  }
  std::size_t cursor = 0;
  for (std::size_t index = 0; index < claimed->legs().size(); ++index) {
    const ValidatedRunLeg& leg = claimed->legs()[index];
    const std::string label = "leg " + std::to_string(index + 1U);
    ValidatedEvolutionRequest request = base;
    request.paths = paths;
    request.evidence = evidence;
    request.continuation = continuation;
    request.start_time = time;
    request.end_time = leg.end_time;
    request.max_accepted_steps = leg.max_accepted_steps;
    const auto accepted = std::make_shared<std::size_t>(0U);
    request.accepted_step_callback =
        [accepted](std::size_t, const std::string&) { ++*accepted; };
    if (leg.cancelled_after.has_value()) {
      const std::size_t stop = *leg.cancelled_after;
      request.cancellation_requested = [accepted, stop] {
        return *accepted >= stop;
      };
    }
    ValidatedEvolutionCertificate certificate;
    try {
      certificate = evolve_validated_far_step_histories(request);
    } catch (const std::exception& error) {
      return refused(std::move(result), index == 0U ? "admission" : "replay",
                     label + ": the driver refused the request: " +
                         error.what());
    }
    if (certificate.continuation == nullptr) {
      return refused(std::move(result), index == 0U ? "admission" : "replay",
                     label + ": " + certificate.run.halt_code + ": " +
                         certificate.halt_reason);
    }
    if (certificate.run.status != leg.status ||
        certificate.run.halt_code != leg.halt_code ||
        certificate.run.accepted_step_count != leg.accepted_steps) {
      return refused(std::move(result), "replay",
                     label + " ended differently from its claim: replay gave " +
                         certificate.run.status + " " +
                         certificate.run.halt_code + " after " +
                         std::to_string(certificate.run.accepted_step_count) +
                         " accepted steps");
    }
    const std::string appended = rebuilt->append(request, certificate);
    if (!appended.empty()) {
      return refused(std::move(result), "replay", label + ": " + appended);
    }
    for (; cursor < rebuilt->steps().size(); ++cursor) {
      if (cursor >= claimed->steps().size()) {
        return refused(std::move(result), "replay",
                       label + ": replay accepted a step the record does not "
                               "claim");
      }
      const ValidatedRunStep& got = rebuilt->steps()[cursor];
      const ValidatedRunStep& want = claimed->steps()[cursor];
      const char* field = got.ordinal != want.ordinal ? "ordinal"
          : got.start != want.start ? "start"
          : got.step != want.step ? "step"
          : got.end != want.end ? "end"
          : got.chains != want.chains ? "content chain" : nullptr;
      if (field != nullptr) {
        return refused(std::move(result), "replay",
                       "step " + std::to_string(cursor + 1U) + ": replayed " +
                           field + " differs from the claim");
      }
    }
    paths = certificate.paths;
    evidence = certificate.evidence;
    continuation = certificate.continuation;
    time = certificate.run.accepted_end_time;
    ++result.replayed_legs;
    result.replayed_steps = cursor;
  }
  if (cursor != claimed->steps().size()) {
    return refused(std::move(result), "replay",
                   "the record claims a step that replay did not produce");
  }
  const ValidatedRunFinalState& got = rebuilt->final_state();
  const ValidatedRunFinalState& want = claimed->final_state();
  const char* field = got.accepted_time != want.accepted_time ? "accepted time"
      : got.controller_step_size != want.controller_step_size
          ? "controller step"
      : got.cooldown_remaining != want.cooldown_remaining ? "cooldown"
      : got.accepted_step_count != want.accepted_step_count
          ? "accepted-step count"
      : !same_ledger(got.ledger, want.ledger) ? "ledger" : nullptr;
  if (field != nullptr) {
    return refused(std::move(result), "final",
                   std::string("replayed final ") + field +
                       " differs from the claim");
  }
  if (rebuilt->serialize() != bytes) {
    return refused(std::move(result), "final",
                   "the replayed record differs from the record read");
  }
  result.status = "restored";
  result.paths = std::move(paths);
  result.evidence = std::move(evidence);
  result.continuation = std::move(continuation);
  result.ledger = got.ledger;
  result.record = std::move(rebuilt);
  return result;
}

}  // namespace

std::string validated_run_controls_difference(
    const ValidatedRunControls& a, const ValidatedRunControls& b) {
  if (a.policy != b.policy) return "policy";
  if (!same_number(a.field_speed, b.field_speed)) return "field_speed";
  if (!same_number(a.coupling, b.coupling)) return "coupling";
  if (!same_number(a.initial_step, b.initial_step)) return "initial_step";
  if (!same_number(a.minimum_step, b.minimum_step)) return "minimum_step";
  if (!same_budget(a.increment_budget, b.increment_budget)) {
    return "increment_budget";
  }
  if (a.total_budget.has_value() != b.total_budget.has_value() ||
      (a.total_budget.has_value() &&
       !same_budget(*a.total_budget, *b.total_budget))) {
    return "total_budget";
  }
  if (a.max_attempts_per_step != b.max_attempts_per_step) {
    return "max_attempts_per_step";
  }
  if (a.max_lower_sign_retries != b.max_lower_sign_retries) {
    return "max_lower_sign_retries";
  }
  if (a.growth_cooldown_steps != b.growth_cooldown_steps) {
    return "growth_cooldown_steps";
  }
  if (a.pair_policy != b.pair_policy) return "pair_policy";
  if (a.groups.size() != b.groups.size()) return "groups";
  for (std::size_t i = 0; i < a.groups.size(); ++i) {
    if (a.groups[i].leader != b.groups[i].leader ||
        a.groups[i].follower != b.groups[i].follower) {
      return "groups";
    }
  }
  return {};
}

ValidatedRunRecord ValidatedRunRecord::open(
    const ValidatedEvolutionRequest& origin) {
  if (origin.continuation != nullptr || origin.evidence != nullptr) {
    throw std::invalid_argument(
        "a record opens at an origin, which carries no continuation and no "
        "evidence");
  }
  if (origin.paths.empty()) {
    throw std::invalid_argument("the origin has no path");
  }
  for (const auto& path : origin.paths) {
    if (path.history.uniform_circular_endpoint_certificate().has_value()) {
      throw std::invalid_argument("the origin has an analytic carrier");
    }
    const auto& segments = path.history.segments();
    for (std::size_t k = 0; k < segments.size(); ++k) {
      const auto segment = segments.at(k);
      for (std::size_t axis = 0; axis < 3; ++axis) {
        if (!exact_decimal_token_is_zero(
                segment.position_error_tokens()[axis]) ||
            !exact_decimal_token_is_zero(
                segment.velocity_error_tokens()[axis])) {
          throw std::invalid_argument(
              "the origin is not exact: it declares a radius");
        }
      }
    }
    if (compare_exact_decimal_tokens(
            segments.back().t_end_token(), origin.start_time) != 0) {
      throw std::invalid_argument(
          "an origin history does not end at the origin time");
    }
  }
  ValidatedRunRecord record;
  record.controls_ = controls_of(origin);
  record.origin_time_ = origin.start_time;
  record.origin_ = origin.paths;
  record.final_.accepted_time = origin.start_time;
  record.final_.controller_step_size = origin.initial_step;
  record.last_chains_ = chains_of(origin.paths);
  record.extendable_ = true;
  return record;
}

std::vector<ValidatedRunOriginMember> ValidatedRunRecord::origin_members()
    const {
  std::vector<ValidatedRunOriginMember> members;
  for (const auto& path : origin_) {
    members.push_back(
        {path.id, path.charge, validated_history_digest(path.history)});
  }
  return members;
}

std::string ValidatedRunRecord::append(
    const ValidatedEvolutionRequest& request,
    const ValidatedEvolutionCertificate& certificate) {
  if (!extendable_) {
    return "a record read from bytes cannot be extended; restore it by "
           "replay first";
  }
  // The request must continue this record.
  {
    const std::string difference =
        validated_run_controls_difference(controls_, controls_of(request));
    if (!difference.empty()) {
      return "the request's control differs from the record's: " + difference;
    }
  }
  if (request.start_time != final_.accepted_time) {
    return "the leg does not start at the record's accepted time";
  }
  if (request.continuation != last_continuation_) {
    return "the leg does not carry the continuation of the record's last "
           "boundary";
  }
  if (request.paths.size() != origin_.size() ||
      chains_of(request.paths) != last_chains_) {
    return "the leg's population is not the record's last population";
  }
  // Boundary fields, against the seals the certificate carries.
  if (certificate.continuation == nullptr) {
    return "the certificate is not an accepted boundary: it carries no "
           "continuation";
  }
  const ValidatedEvolutionState& sealed = certificate.continuation->state();
  {
    const std::string difference = validated_run_controls_difference(
        controls_, controls_of(sealed, controls_.field_speed));
    if (!difference.empty()) {
      return "the sealed continuation's control differs from the record's: " +
          difference;
    }
  }
  if (sealed.accepted_time != certificate.run.accepted_end_time) {
    return "the certificate's accepted time differs from its sealed "
           "continuation";
  }
  if (sealed.controller_step_size != certificate.run.controller_step_size) {
    return "the certificate's controller step differs from its sealed "
           "continuation";
  }
  if (sealed.accepted_step_count !=
      final_.accepted_step_count + certificate.run.accepted_step_count) {
    return "the certificate's accepted-step count differs from its sealed "
           "continuation";
  }
  if (!same_ledger(sealed.ledger, certificate.ledger)) {
    return "the certificate's ledger differs from its sealed continuation";
  }
  if (sealed.evidence != certificate.evidence) {
    return "the certificate's evidence is not its sealed continuation's";
  }
  if (certificate.paths.size() != origin_.size() ||
      sealed.members.size() != origin_.size()) {
    return "the certificate's population differs from the record's";
  }
  const std::vector<std::string> chains = chains_of(certificate.paths);
  for (std::size_t i = 0; i < origin_.size(); ++i) {
    const auto& path = certificate.paths[i];
    if (path.id != origin_[i].id || path.charge != origin_[i].charge ||
        sealed.members[i].path_id != path.id ||
        sealed.members[i].charge != path.charge ||
        sealed.members[i].history_digest != chains[i]) {
      return "path " + origin_[i].id +
          ": identifier, charge or content chain differs from the sealed "
          "continuation";
    }
    if (certificate.evidence != nullptr &&
        !certificate.evidence
             ->member_refusal(path.id, path.charge, path.history)
             .empty()) {
      return "path " + path.id + " is not bound by the certificate's evidence";
    }
  }
  if (certificate.evidence != nullptr &&
      !same_number(certificate.evidence->coupling(), controls_.coupling)) {
    return "the certificate's evidence was issued under another coupling";
  }
  // The accepted steps must lead from the record's last population to the
  // certificate's. Each accepted step carries the sealed evidence the
  // producer issued for it, which binds the chains before and after that
  // step; the last of them must be the certificate's own evidence. Without
  // this a genuine certificate of some other run would be accepted.
  {
    std::vector<std::string> running = last_chains_;
    ValidatedFarStepEvidence last;
    for (const auto& attempt : certificate.attempts) {
      if (attempt.disposition != "accepted") continue;
      if (attempt.producer.evidence == nullptr) {
        return "an accepted attempt carries no evidence";
      }
      for (std::size_t i = 0; i < origin_.size(); ++i) {
        bool linked = false;
        for (const auto& member : attempt.producer.evidence->members()) {
          if (member.path_id != origin_[i].id) continue;
          linked = member.charge == origin_[i].charge &&
              member.digest_before == running[i];
          running[i] = member.digest_after;
          break;
        }
        if (!linked) {
          return "an accepted step does not continue the record's population "
                 "at path " + origin_[i].id;
        }
      }
      last = attempt.producer.evidence;
    }
    if (running != chains) {
      return "the accepted steps do not lead to the certificate's population";
    }
    if (last != nullptr && last != certificate.evidence) {
      return "the certificate's evidence is not that of its last accepted "
             "step";
    }
  }
  // The rest of the transcript is plain data, carried as claims.
  std::vector<ValidatedRunStep> added;
  for (const auto& attempt : certificate.attempts) {
    if (attempt.disposition != "accepted") continue;
    if (attempt.producer.evidence == nullptr) {
      return "an accepted attempt carries no evidence";
    }
    ValidatedRunStep step;
    step.ordinal = attempt.step_index;
    step.start = attempt.producer.start;
    step.step = attempt.producer.step;
    step.end = attempt.producer.end;
    for (const auto& path : origin_) {
      std::string chain;
      for (const auto& member : attempt.producer.evidence->members()) {
        if (member.path_id == path.id) chain = member.digest_after;
      }
      if (chain.empty()) {
        return "an accepted attempt's evidence does not name path " + path.id;
      }
      step.chains.push_back(std::move(chain));
    }
    added.push_back(std::move(step));
  }
  if (added.size() != certificate.run.accepted_step_count) {
    return "the certificate's accepted attempts do not match its count";
  }
  ValidatedRunLeg leg;
  leg.end_time = request.end_time;
  leg.max_accepted_steps = request.max_accepted_steps;
  if (certificate.run.status == "cancelled") {
    leg.cancelled_after = certificate.run.accepted_step_count;
  }
  leg.status = certificate.run.status;
  leg.halt_code = certificate.run.halt_code;
  leg.accepted_steps = certificate.run.accepted_step_count;

  legs_.push_back(std::move(leg));
  for (auto& step : added) steps_.push_back(std::move(step));
  final_.accepted_time = sealed.accepted_time;
  final_.controller_step_size = sealed.controller_step_size;
  final_.cooldown_remaining = sealed.cooldown_remaining;
  final_.accepted_step_count = sealed.accepted_step_count;
  final_.ledger = sealed.ledger;
  last_chains_ = chains;
  last_continuation_ = certificate.continuation;
  return {};
}

std::string ValidatedRunRecord::serialize() const {
  return record_text(body_text(*this));
}

std::string validated_run_record_identity(const std::string& bytes) {
  return sha256_hex(bytes);
}

std::string validated_run_record_reseal(const std::string& bytes) {
  const Parsed parsed = outer(bytes);
  const ValidatedRunRecord record =
      record_of_body(member(parsed.root.get_object(), "body"));
  return record.serialize();
}

ValidatedRestoreResult restore_validated_run(
    const std::string& bytes,
    const ValidatedRestoreExpectation& expectation,
    std::size_t worker_count) {
  return restore(bytes, &expectation, worker_count);
}

ValidatedRestoreResult replay_validated_run_record(
    const std::string& bytes, std::size_t worker_count) {
  return restore(bytes, nullptr, worker_count);
}

ValidatedRunRecordClaims read_validated_run_record(const std::string& bytes) {
  ValidatedRunRecordClaims claims;
  claims.record_identity = validated_run_record_identity(bytes);
  try {
    claims.record = checked_record(bytes);
    claims.status = "read";
  } catch (const std::exception& error) {
    claims.status = "refused";
    claims.reason = error.what();
    claims.record.reset();
  }
  return claims;
}

void write_validated_run_record_file(
    const std::string& path, const std::string& bytes) {
  const std::string temporary = path + ".writing";
  {
    std::ofstream out(temporary, std::ios::binary | std::ios::trunc);
    if (out) {
      out.write(bytes.data(), static_cast<std::streamsize>(bytes.size()));
      out.flush();
    }
    if (!out) {
      std::error_code ignored;
      std::filesystem::remove(temporary, ignored);
      throw std::runtime_error("could not write the record's temporary file");
    }
  }
  std::error_code failure;
  std::filesystem::rename(temporary, path, failure);
  if (failure) {
    std::error_code ignored;
    std::filesystem::remove(temporary, ignored);
    throw std::runtime_error("could not publish the record: " +
                             failure.message());
  }
}

std::string read_validated_run_record_file(const std::string& path) {
  std::ifstream in(path, std::ios::binary);
  if (!in) throw std::runtime_error("could not open the record file");
  return std::string(std::istreambuf_iterator<char>(in),
                     std::istreambuf_iterator<char>());
}

}  // namespace architrino::eom
