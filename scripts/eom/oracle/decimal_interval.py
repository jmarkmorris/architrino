"""Directed-rounding decimal intervals for the independent EOM oracle."""

from __future__ import annotations

from dataclasses import dataclass
from decimal import (
    ROUND_CEILING,
    ROUND_FLOOR,
    ROUND_HALF_EVEN,
    Decimal,
    localcontext,
)
from typing import Callable, Iterable


def exact_decimal(value: object) -> Decimal:
    """Parse an exact decimal token without accepting binary floating input."""

    if isinstance(value, float):
        raise TypeError("binary float input is prohibited; supply an exact decimal token")
    if isinstance(value, Decimal):
        return value
    if isinstance(value, (str, int)):
        parsed = Decimal(value)
        if not parsed.is_finite():
            raise ValueError("interval values must be finite")
        return parsed
    raise TypeError(f"unsupported exact decimal input type: {type(value).__name__}")


def _rounded(
    operation: Callable[[], Decimal],
    *,
    precision: int,
    rounding: str,
) -> Decimal:
    with localcontext() as context:
        context.prec = precision
        context.rounding = rounding
        result = operation()
        if not result.is_finite():
            raise ArithmeticError("interval operation produced a nonfinite endpoint")
        return +result


@dataclass(frozen=True)
class DecimalInterval:
    lower: Decimal
    upper: Decimal
    precision: int = 80

    def __post_init__(self) -> None:
        if self.precision < 18:
            raise ValueError("interval precision must be at least 18 decimal digits")
        if not self.lower.is_finite() or not self.upper.is_finite():
            raise ValueError("interval endpoints must be finite")
        if self.lower > self.upper:
            raise ValueError("interval lower endpoint exceeds upper endpoint")

    @classmethod
    def point(cls, value: object, precision: int = 80) -> "DecimalInterval":
        parsed = exact_decimal(value)
        return cls(parsed, parsed, precision)

    @classmethod
    def bounds(
        cls,
        lower: object,
        upper: object,
        precision: int = 80,
    ) -> "DecimalInterval":
        return cls(exact_decimal(lower), exact_decimal(upper), precision)

    def _require_compatible(self, other: "DecimalInterval") -> None:
        if self.precision != other.precision:
            raise ValueError("interval precision mismatch")

    def __add__(self, other: "DecimalInterval") -> "DecimalInterval":
        self._require_compatible(other)
        lower = _rounded(
            lambda: self.lower + other.lower,
            precision=self.precision,
            rounding=ROUND_FLOOR,
        )
        upper = _rounded(
            lambda: self.upper + other.upper,
            precision=self.precision,
            rounding=ROUND_CEILING,
        )
        return DecimalInterval(lower, upper, self.precision)

    def __sub__(self, other: "DecimalInterval") -> "DecimalInterval":
        self._require_compatible(other)
        lower = _rounded(
            lambda: self.lower - other.upper,
            precision=self.precision,
            rounding=ROUND_FLOOR,
        )
        upper = _rounded(
            lambda: self.upper - other.lower,
            precision=self.precision,
            rounding=ROUND_CEILING,
        )
        return DecimalInterval(lower, upper, self.precision)

    def __neg__(self) -> "DecimalInterval":
        return DecimalInterval(-self.upper, -self.lower, self.precision)

    def __mul__(self, other: "DecimalInterval") -> "DecimalInterval":
        self._require_compatible(other)
        endpoint_pairs = (
            (self.lower, other.lower),
            (self.lower, other.upper),
            (self.upper, other.lower),
            (self.upper, other.upper),
        )
        lower_candidates = [
            _rounded(
                lambda left=left, right=right: left * right,
                precision=self.precision,
                rounding=ROUND_FLOOR,
            )
            for left, right in endpoint_pairs
        ]
        upper_candidates = [
            _rounded(
                lambda left=left, right=right: left * right,
                precision=self.precision,
                rounding=ROUND_CEILING,
            )
            for left, right in endpoint_pairs
        ]
        return DecimalInterval(
            min(lower_candidates),
            max(upper_candidates),
            self.precision,
        )

    def reciprocal(self) -> "DecimalInterval":
        if self.contains_zero:
            raise ZeroDivisionError("cannot invert an interval containing zero")
        lower = _rounded(
            lambda: Decimal(1) / self.upper,
            precision=self.precision,
            rounding=ROUND_FLOOR,
        )
        upper = _rounded(
            lambda: Decimal(1) / self.lower,
            precision=self.precision,
            rounding=ROUND_CEILING,
        )
        return DecimalInterval(lower, upper, self.precision)

    def __truediv__(self, other: "DecimalInterval") -> "DecimalInterval":
        return self * other.reciprocal()

    def square(self) -> "DecimalInterval":
        if self.contains_zero:
            lower = Decimal(0)
        else:
            lower = min(
                _rounded(
                    lambda: self.lower * self.lower,
                    precision=self.precision,
                    rounding=ROUND_FLOOR,
                ),
                _rounded(
                    lambda: self.upper * self.upper,
                    precision=self.precision,
                    rounding=ROUND_FLOOR,
                ),
            )
        upper = max(
            _rounded(
                lambda: self.lower * self.lower,
                precision=self.precision,
                rounding=ROUND_CEILING,
            ),
            _rounded(
                lambda: self.upper * self.upper,
                precision=self.precision,
                rounding=ROUND_CEILING,
            ),
        )
        return DecimalInterval(lower, upper, self.precision)

    def sqrt(self) -> "DecimalInterval":
        if self.lower < 0:
            raise ArithmeticError("cannot take the square root of a negative interval")

        def guarded_sqrt(value: Decimal) -> Decimal:
            with localcontext() as context:
                context.prec = self.precision + 12
                return value.sqrt(context=context)

        lower_guard = guarded_sqrt(self.lower)
        upper_guard = guarded_sqrt(self.upper)
        if self.lower == self.upper:
            with localcontext() as context:
                context.prec = self.precision + 12
                if lower_guard * lower_guard == self.lower:
                    exact = +lower_guard
                    return DecimalInterval(exact, exact, self.precision)
        with localcontext() as context:
            context.prec = self.precision + 12
            lower_guard = context.next_minus(lower_guard)
            upper_guard = context.next_plus(upper_guard)
        lower = _rounded(
            lambda: lower_guard,
            precision=self.precision,
            rounding=ROUND_FLOOR,
        )
        upper = _rounded(
            lambda: upper_guard,
            precision=self.precision,
            rounding=ROUND_CEILING,
        )
        if self.lower == 0:
            lower = Decimal(0)
        return DecimalInterval(lower, upper, self.precision)

    def inflate(self, radius: object) -> "DecimalInterval":
        amount = exact_decimal(radius)
        if amount < 0:
            raise ValueError("interval inflation radius must be nonnegative")
        return self + DecimalInterval.bounds(-amount, amount, self.precision)

    def hull(self, other: "DecimalInterval") -> "DecimalInterval":
        self._require_compatible(other)
        return DecimalInterval(
            min(self.lower, other.lower),
            max(self.upper, other.upper),
            self.precision,
        )

    @property
    def contains_zero(self) -> bool:
        return self.lower <= 0 <= self.upper

    @property
    def is_exact_zero(self) -> bool:
        return self.lower == 0 and self.upper == 0

    @property
    def width(self) -> Decimal:
        return _rounded(
            lambda: self.upper - self.lower,
            precision=self.precision,
            rounding=ROUND_CEILING,
        )

    @property
    def midpoint(self) -> Decimal:
        return _rounded(
            lambda: (self.lower + self.upper) / Decimal(2),
            precision=self.precision,
            rounding=ROUND_HALF_EVEN,
        )

    @property
    def strict_sign(self) -> int | None:
        if self.lower > 0:
            return 1
        if self.upper < 0:
            return -1
        if self.is_exact_zero:
            return 0
        return None

    def excludes_zero(self) -> bool:
        return not self.contains_zero


IntervalVector = tuple[DecimalInterval, DecimalInterval, DecimalInterval]


def interval_vector(values: Iterable[DecimalInterval]) -> IntervalVector:
    result = tuple(values)
    if len(result) != 3:
        raise ValueError("interval vectors must have exactly three components")
    return result  # type: ignore[return-value]


def interval_dot(left: IntervalVector, right: IntervalVector) -> DecimalInterval:
    precision = left[0].precision
    total = DecimalInterval.point(0, precision)
    for index in range(3):
        total = total + left[index] * right[index]
    return total


def interval_norm(value: IntervalVector) -> DecimalInterval:
    precision = value[0].precision
    total = DecimalInterval.point(0, precision)
    for component in value:
        total = total + component.square()
    return total.sqrt()
