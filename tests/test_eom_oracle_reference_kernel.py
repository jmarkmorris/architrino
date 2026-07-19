from __future__ import annotations

import unittest

from mpmath import mp

from scripts.eom.oracle.reference_kernel import (
    bisect_declared_simple_root,
    causal_residual,
    core_kernel,
    finite_width_integrand,
    inertial_history,
    norm,
    normal_factors,
    sharp_root_acceleration,
    vector,
)


class EomOracleReferenceKernelTests(unittest.TestCase):
    def setUp(self) -> None:
        mp.dps = 90
        self.source = inertial_history((0, 0, 0), (0, 0, 0))
        self.receiver = inertial_history((2, 0, 0), (0, 0, 0))

    def test_stationary_simple_root_and_sharp_acceleration(self) -> None:
        residual = lambda emission: causal_residual(
            self.receiver, self.source, 5, emission, 1
        )
        lower, upper = bisect_declared_simple_root(
            residual, 2, 4, mp.mpf("1e-70")
        )
        root = (lower + upper) / 2
        self.assertLess(abs(root - 3), mp.mpf("1e-69"))

        acceleration = sharp_root_acceleration(
            self.receiver, self.source, 5, root, 1, 1, -1
        )
        self.assertLess(abs(acceleration[0] + mp.mpf("0.25")), mp.mpf("1e-68"))
        self.assertEqual(acceleration[1], 0)
        self.assertEqual(acceleration[2], 0)

    def test_receiver_factor_rail_keeps_source_density_acceleration(self) -> None:
        rail_receiver = inertial_history((2, 0, 0), (1, 0, 0), epoch=5)
        transmitter_factor, receiver_factor, _, _ = normal_factors(
            rail_receiver, self.source, 5, 3, 1
        )
        self.assertEqual(transmitter_factor, 1)
        self.assertEqual(receiver_factor, 0)
        acceleration = sharp_root_acceleration(
            rail_receiver, self.source, 5, 3, 1, 1, -1
        )
        self.assertEqual(acceleration, vector((mp.mpf("-0.25"), 0, 0)))

    def test_super_field_speed_receiver_is_not_clamped(self) -> None:
        fast_receiver = inertial_history((2, 0, 0), (2, 0, 0), epoch=5)
        transmitter_factor, receiver_factor, _, _ = normal_factors(
            fast_receiver, self.source, 5, 3, 1
        )
        self.assertEqual(transmitter_factor, 1)
        self.assertEqual(receiver_factor, -1)
        acceleration = sharp_root_acceleration(
            fast_receiver, self.source, 5, 3, 1, 1, -1
        )
        self.assertEqual(acceleration, vector((mp.mpf("-0.25"), 0, 0)))

    def test_constant_super_field_speed_self_history_has_no_nontrivial_root(self) -> None:
        fast_history = inertial_history((0, 0, 0), (2, 0, 0))
        for emission_time in (mp.mpf("0"), mp.mpf("1"), mp.mpf("2.5")):
            self.assertGreater(
                causal_residual(fast_history, fast_history, 3, emission_time, 1),
                0,
            )

    def test_core_kernel_and_full_integrand_zero_extension(self) -> None:
        self.assertEqual(core_kernel(vector((0, 0, 0)), 1), vector((0, 0, 0)))
        coincident_receiver = inertial_history((0, 0, 0), (7, 0, 0), epoch=2)
        integrand = finite_width_integrand(
            coincident_receiver,
            self.source,
            2,
            1,
            1,
            1,
            1,
            mp.mpf("0.1"),
            mp.mpf("0.2"),
        )
        self.assertEqual(integrand, vector((0, 0, 0)))

    def test_finite_width_integral_approaches_core_regularized_branch(self) -> None:
        eta = mp.mpf("0.01")
        epsilon_c = mp.mpf("0.2")

        def component(emission_time: mp.mpf) -> mp.mpf:
            return finite_width_integrand(
                self.receiver,
                self.source,
                5,
                emission_time,
                1,
                1,
                1,
                eta,
                epsilon_c,
            )[0]

        integrated = mp.quad(component, [mp.mpf("2.8"), mp.mpf("3.2")])
        expected = core_kernel(vector((2, 0, 0)), epsilon_c)[0]
        self.assertLess(abs(integrated - expected), mp.mpf("1e-30"))
        self.assertGreater(norm(vector((integrated, 0, 0))), 0)


if __name__ == "__main__":
    unittest.main()
