#pragma once

namespace architrino::eom {
// Complete registered radial responses, not an arbitrary power-law selector.
enum class RadialKernel { canonical_inverse_square, logarithmic_inverse_distance };
}
