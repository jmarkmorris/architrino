from __future__ import annotations

import unittest

from mpmath import mp

from scripts.eom.oracle.reference_kernel import (
    causal_residual,
    inertial_history,
    normal_factors,
    sharp_root_acceleration,
)


def polarity(grid: tuple[int, int, int]) -> int:
    return 1 if sum(grid) % 2 == 0 else -1


def canonical_offsets(cutoff: int, shape: str) -> list[tuple[int, int, int]]:
    offsets: list[tuple[int, int, int]] = []
    for nx in range(-cutoff, cutoff + 1):
        for ny in range(-cutoff, cutoff + 1):
            for nz in range(-cutoff, cutoff + 1):
                offset = (nx, ny, nz)
                squared = nx * nx + ny * ny + nz * nz
                if squared == 0:
                    continue
                if shape == "sphere" and squared > cutoff * cutoff:
                    continue
                first_nonzero = next(value for value in offset if value != 0)
                if first_nonzero > 0:
                    offsets.append(offset)
    return offsets


class LatticeLabStationaryOracleTests(unittest.TestCase):
    def setUp(self) -> None:
        mp.dps = 90
        self.reception = mp.mpf("20")

    def evaluate_row(
        self,
        receiver_grid: tuple[int, int, int],
        offset: tuple[int, int, int],
        compression_axis: int = 0,
        compression_factor: mp.mpf = mp.mpf("1"),
    ) -> tuple[mp.mpf, mp.mpf, mp.mpf]:
        transmitter_grid = tuple(
            receiver_grid[index] + offset[index] for index in range(3)
        )
        receiver_position = tuple(
            mp.mpf(value) * (
                compression_factor if index == compression_axis else 1
            )
            for index, value in enumerate(receiver_grid)
        )
        transmitter_position = tuple(
            mp.mpf(value) * (
                compression_factor if index == compression_axis else 1
            )
            for index, value in enumerate(transmitter_grid)
        )
        physical_offset = tuple(
            transmitter_position[index] - receiver_position[index]
            for index in range(3)
        )
        receiver = inertial_history(receiver_position, (0, 0, 0))
        transmitter = inertial_history(transmitter_position, (0, 0, 0))
        separation = mp.sqrt(sum(value * value for value in physical_offset))
        emission = self.reception - separation
        self.assertLess(
            abs(
                causal_residual(
                    receiver,
                    transmitter,
                    self.reception,
                    emission,
                    1,
                )
            ),
            mp.mpf("1e-80"),
        )
        transmitter_factor, _, _, measured_separation = normal_factors(
            receiver,
            transmitter,
            self.reception,
            emission,
            1,
        )
        self.assertEqual(transmitter_factor, 1)
        self.assertLess(abs(measured_separation - separation), mp.mpf("1e-80"))
        charge_product = polarity(receiver_grid) * polarity(transmitter_grid)
        return sharp_root_acceleration(
            receiver,
            transmitter,
            self.reception,
            emission,
            1,
            1,
            charge_product,
        )

    def test_first_two_shells_match_the_declared_polarities_and_cancel(self) -> None:
        receiver_grid = (1, 0, 0)
        rows_by_squared_distance: dict[
            int, list[tuple[tuple[int, int, int], tuple[mp.mpf, mp.mpf, mp.mpf]]]
        ] = {1: [], 2: []}
        for offset in canonical_offsets(2, "cube"):
            squared = sum(value * value for value in offset)
            if squared not in rows_by_squared_distance:
                continue
            for signed_offset in (
                offset,
                tuple(-value for value in offset),
            ):
                transmitter_grid = tuple(
                    receiver_grid[index] + signed_offset[index]
                    for index in range(3)
                )
                rows_by_squared_distance[squared].append(
                    (
                        signed_offset,
                        self.evaluate_row(receiver_grid, signed_offset),
                    )
                )
                expected_transmitter_polarity = (
                    -polarity(receiver_grid)
                    if squared == 1
                    else polarity(receiver_grid)
                )
                self.assertEqual(
                    polarity(transmitter_grid),
                    expected_transmitter_polarity,
                )

        self.assertEqual(len(rows_by_squared_distance[1]), 6)
        self.assertEqual(len(rows_by_squared_distance[2]), 12)
        for rows in rows_by_squared_distance.values():
            residual = tuple(
                mp.fsum(row[1][axis] for row in rows) for axis in range(3)
            )
            self.assertEqual(residual, (0, 0, 0))

    def test_centered_cube_and_sphere_exhaustions_cancel_for_both_receiver_polarities(
        self,
    ) -> None:
        transforms = (
            (0, mp.mpf("1")),
            (0, mp.mpf("0.75")),
            (1, mp.mpf("0.2")),
            (2, mp.mpf("0.000001")),
        )
        for receiver_grid in ((0, 0, 0), (1, 0, 0)):
            for shape in ("cube", "sphere"):
                for cutoff in range(1, 5):
                    for compression_axis, compression_factor in transforms:
                        for offset in canonical_offsets(cutoff, shape):
                            opposite = tuple(-value for value in offset)
                            forward = self.evaluate_row(
                                receiver_grid,
                                offset,
                                compression_axis,
                                compression_factor,
                            )
                            backward = self.evaluate_row(
                                receiver_grid,
                                opposite,
                                compression_axis,
                                compression_factor,
                            )
                            for axis in range(3):
                                self.assertLess(
                                    abs(forward[axis] + backward[axis]),
                                    mp.mpf("1e-70"),
                                )


if __name__ == "__main__":
    unittest.main()
