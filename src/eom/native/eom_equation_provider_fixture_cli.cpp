#include "architrino/eom/Checkpoint.hpp"
#include "architrino/eom/EquationRegistry.hpp"

#include <array>
#include <functional>
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

namespace eom = architrino::eom;
namespace {
void check(bool condition, const char* message) {
  if (!condition) throw std::runtime_error(message);
}
eom::RetainedHistory history(const std::string& id, const std::string& x) {
  return eom::RetainedHistory(id, {eom::CubicHistorySegment(
      "0", "5", eom::CubicCoefficientTokens{
          std::array<std::string, 4>{x, "0", "0", "0"},
          {"0", "0", "0", "0"},
          {"0", "0", "0", "0"}})});
}
eom::NativeCoupledEvolutionRequest request() {
  eom::NativeCoupledEvolutionRequest r;
  r.run_id = "equation-provider-stage-a";
  r.paths = {{"a", "1", history("a", "0")},
             {"b", "-1", history("b", "2")}};
  r.start_time = "5";
  r.end_time = "5.01";
  r.initial_step = "0.01";
  r.minimum_step = "0.01";
  r.field_speed = "1";
  r.coupling = "1";
  r.root_tolerance = "1e-7";
  r.transmitter_factor_floor = "1e-24";
  r.acceleration_tolerance = "1e-5";
  r.position_tolerance = "1e-5";
  r.velocity_tolerance = "1e-5";
  r.correction_tolerance = "1e-7";
  r.root_max_depth = 192;
  r.root_max_cells = 300000;
  r.initial_mpfr_bits = 128;
  r.maximum_mpfr_bits = 512;
  r.max_correction_iterations = 12;
  r.max_step_attempts = 100;
  r.max_rejected_steps = 20;
  r.thread_count = 1;
  return r;
}
std::size_t expect_rejection(const std::string& expected,
                            const std::function<void()>& operation) {
  try { operation(); }
  catch (const eom::EquationAdmissionError& error) {
    check(error.code() == expected, "wrong admission error code");
    return 1;
  }
  throw std::runtime_error("unsupported model was admitted");
}
void compare_snapshot(const eom::NativeAccelerationSnapshotCertificate& a,
                      const eom::NativeAccelerationSnapshotCertificate& b) {
  check(a.status == b.status && a.failure_code == b.failure_code &&
        a.root_certificates.size() == b.root_certificates.size(),
        "snapshot status/root ledger changed");
  const auto& x = a.acceleration.receiver_totals;
  const auto& y = b.acceleration.receiver_totals;
  check(x.size() == y.size(), "receiver total count changed");
  for (std::size_t i = 0; i < x.size(); ++i) {
    check(x[i].receiver_path_id == y[i].receiver_path_id,
          "receiver identity changed");
    for (std::size_t axis = 0; axis < 3; ++axis)
      check(x[i].acceleration[axis].lower() == y[i].acceleration[axis].lower() &&
            x[i].acceleration[axis].upper() == y[i].acceleration[axis].upper(),
            "canonical acceleration interval changed");
  }
}
}  // namespace

int main() {
  try {
    // Known vectors precede hashing any plan, source or model target.
    check(eom::equation_identity_sha256("") ==
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "empty SHA-256 known vector");
    check(eom::equation_identity_sha256("abc") ==
          "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
          "abc SHA-256 known vector");
    check(eom::equation_decimal_identity("+001.000e+0") == "1e0",
          "exact decimal normalization");
    check(eom::equation_decimal_identity("123.4500e-2") == "12345e-4",
          "decimal exponent normalization");
    check(eom::equation_decimal_identity("-0.00") == "0", "zero normalization");
    std::size_t guards = expect_rejection("invalid_decimal_identity", [] {
      (void)eom::equation_decimal_identity("1 trailing");
    });
    guards += expect_rejection("invalid_decimal_identity", [] {
      (void)eom::equation_decimal_identity("1e+-0");
    });
    try {
      const eom::EquationPlan invalid{"invalid/v1",
          {{"x", "provider/v1", "in", "out", {"missing"}}}};
      throw std::runtime_error("missing dependency admitted");
    } catch (const std::invalid_argument&) {}

    auto legacy = request();
    auto explicit_canonical = legacy;
    explicit_canonical.equation_selection.emplace();
    std::vector<eom::NativePublishedPath> histories;
    for (const auto& path : legacy.paths)
      histories.push_back({path.path_id, path.history});
    const auto snapshot = eom::certify_native_acceleration_snapshot(
        legacy, histories, "5");
    check(snapshot.status == "certified_complete", "known binary snapshot not certified");
    compare_snapshot(snapshot, eom::certify_native_acceleration_snapshot(
        explicit_canonical, histories, "5"));
    check(eom::inspect_equation_model(legacy).canonical_json ==
          eom::inspect_equation_model(explicit_canonical).canonical_json,
          "omitted/explicit canonical manifest differs");
    check(eom::native_evolution_model_fingerprint(legacy) ==
          eom::native_evolution_model_fingerprint(explicit_canonical),
          "v7 model fingerprint changed");
    const auto old_result = eom::evolve_native_coupled_histories(legacy);
    const auto selected_result =
        eom::evolve_native_coupled_histories(explicit_canonical);
    check(old_result.accepted_step_count > 0 &&
          old_result.accepted_end_time == legacy.end_time,
          "known binary evolution did not reach endpoint");
    check(old_result.status == selected_result.status &&
          old_result.accepted_step_count == selected_result.accepted_step_count &&
          old_result.rejected_step_count == selected_result.rejected_step_count,
          "canonical evolution status/count changed");
    const auto checkpoint =
        eom::create_native_evolution_checkpoint(legacy, old_result);
    check(eom::serialize_native_evolution_checkpoint(checkpoint) ==
          eom::serialize_native_evolution_checkpoint(
              eom::create_native_evolution_checkpoint(
                  explicit_canonical, selected_result)),
          "v7 checkpoint bytes changed");
    const auto old_resume = eom::resume_native_coupled_histories(
        legacy, checkpoint, "5.02");
    const auto selected_resume = eom::resume_native_coupled_histories(
        explicit_canonical, checkpoint, "5.02");
    check(old_resume.accepted_end_time == "5.02" &&
          old_resume.status == selected_resume.status,
          "canonical resume did not reach endpoint");
    for (std::size_t i = 0; i < old_resume.histories.size(); ++i)
      check(old_resume.histories[i].history.provenance_fingerprint() ==
            selected_resume.histories[i].history.provenance_fingerprint(),
            "resumed canonical history changed");
    explicit_canonical.thread_count = 4;
    compare_snapshot(snapshot, eom::certify_native_acceleration_snapshot(
        explicit_canonical, histories, "5"));

    std::vector<eom::EquationSelection> denied(7);
    denied[0].composition_id = "missing/v1";
    denied[1].composition_id = "canonical-surface/v1";
    denied[2].speed_domain = "inclusive";
    denied[3].speed_domain = "strict";
    denied[4].boundary_policy = "clip";
    denied[5].constraint = "sphere";
    denied[6].method = "analytical";
    std::size_t callbacks = 0;
    for (std::size_t i = 0; i < denied.size(); ++i) {
      auto bad = legacy;
      bad.equation_selection = denied[i];
      bad.accepted_step_callback = [&](std::size_t, const std::string&) {
        ++callbacks;
      };
      const std::string code =
          i == 0 ? "unknown_provider" : "unsupported_model_combination";
      const std::vector<std::function<void()>> operations = {
        [&] { (void)eom::require_equation_provider(bad); },
        [&] { (void)eom::inspect_equation_model(bad); },
        [&] { (void)eom::certify_native_acceleration_snapshot(bad, histories, "5"); },
        [&] { (void)eom::certify_native_atomic_coupled_step(
            bad, histories, 0, "5", "5.01"); },
        [&] { (void)eom::evolve_native_coupled_histories(bad); },
        [&] { (void)eom::certify_native_pinned_fold_temporal_onset(
            bad, histories, snapshot, "5"); },
        [&] { (void)eom::certify_native_common_domain_chart(
            bad, histories, "a", "b", "5", "5.01", "5.01"); },
        [&] { (void)eom::certify_native_fold_caustic_impulse(
            bad, histories[0], histories[1], "1", "-1", "5", "5.01"); },
        [&] { (void)eom::certify_native_regulator_convergence(
            bad, histories[0], histories[1], "1", "-1", "5", "5.01"); },
        [&] { (void)eom::native_joint_event_fallback_is_available(
            bad, eom::NativeAtomicStepCertificate{}); },
        [&] { (void)eom::native_evolution_model_fingerprint(bad); },
        [&] { (void)eom::create_native_evolution_checkpoint(bad, old_result); },
        [&] { (void)eom::resume_native_coupled_histories(bad, checkpoint, "5.02"); },
        [&] { (void)eom::require_equation_provider(legacy).evaluate(
            {bad, histories, "5", nullptr, nullptr, false}); },
      };
      for (const auto& operation : operations)
        guards += expect_rejection(code, operation);
    }
    check(callbacks == 0, "rejected model invoked a publication callback");
    auto near_one = legacy;
    near_one.equation_selection.emplace();
    near_one.field_speed = "1.00000000000000000000000000000000000000000000000001";
    guards += expect_rejection("invalid_normalized_field_speed", [&] {
      (void)eom::require_equation_provider(near_one);
    });
    near_one.field_speed = "+001.000e+0";
    (void)eom::require_equation_provider(near_one);
    near_one.chart_policy = "missing-chart";
    guards += expect_rejection("unsupported_model_combination", [&] {
      (void)eom::inspect_equation_model(near_one);
    });
    std::cout << "{\"status\":\"passed\",\"sha256KnownVectors\":2,"
              << "\"guardRejections\":" << guards
              << ",\"canonicalSnapshotParity\":true,"
              << "\"canonicalEvolutionParity\":true,"
              << "\"v7ByteParity\":true,\"canonicalResumeParity\":true,"
              << "\"threadCountParity\":true,\"publicationCallbacks\":0}\n";
    return 0;
  } catch (const std::exception& error) {
    std::cerr << error.what() << '\n';
    return 1;
  }
}
