#include "architrino/solver/NumericSerialization.hpp"

#include <algorithm>

namespace architrino::solver {

NumericSerializationDescriptor numeric_serialization_descriptor(NumericType numericType) {
  switch (numericType) {
    case NumericType::F64:
      return NumericSerializationDescriptor{
          numericType,
          to_string(numericType),
          ByteOrder::LittleEndian,
          8,
          "signed",
          "identity",
          "ieee-754-binary64",
          "none",
          "not-interval",
          "nearest-ties-to-even",
          "ordered finite values; NaN is invalid in solver storage",
          "round-trip decimal with 17 significant digits",
          true,
          true,
      };
    case NumericType::ScaledI64:
      return NumericSerializationDescriptor{
          numericType,
          to_string(numericType),
          ByteOrder::LittleEndian,
          8,
          "signed",
          "manifest-declared power-of-ten or power-of-two scale",
          "twos-complement-i64",
          "none",
          "not-interval",
          "exact integer storage; scaled conversion rounds toward nearest with explicit tie policy",
          "compare after applying the declared scale factor",
          "integer literal plus manifest scale",
          false,
          true,
      };
    case NumericType::IntervalF64Pair:
      return NumericSerializationDescriptor{
          numericType,
          to_string(numericType),
          ByteOrder::LittleEndian,
          16,
          "signed",
          "identity per endpoint",
          "two ieee-754-binary64 endpoints",
          "none",
          "closed interval [lower, upper] with lower stored before upper",
          "directed outward rounding required when values are produced",
          "interval overlap/containment; point comparison requires an explicit projection",
          "[lower, upper] with 17 significant digits per endpoint",
          false,
          true,
      };
    case NumericType::Decimal128:
      return NumericSerializationDescriptor{
          numericType,
          to_string(numericType),
          ByteOrder::LittleEndian,
          16,
          "signed",
          "decimal exponent carried by encoded value",
          "decimal128 finite coefficient/exponent encoding",
          "least-significant decimal limb first when limb materialization is used",
          "not-interval",
          "nearest-ties-to-even unless a stage declares directed rounding",
          "decimal numeric order after canonicalization",
          "canonical decimal scientific notation",
          false,
          true,
      };
    case NumericType::MpLimbBlock:
      return NumericSerializationDescriptor{
          numericType,
          to_string(numericType),
          ByteOrder::LittleEndian,
          0,
          "signed",
          "explicit exponent and limb count in the owning row or manifest",
          "sign, exponent, limb-count, little-endian fixed-width limbs",
          "least-significant limb first",
          "not-interval unless wrapped by an interval layout",
          "producer-declared; validation replay must record the rounding mode",
          "arbitrary-precision numeric order after canonicalization",
          "significand and exponent with exact limb checksum",
          false,
          true,
      };
  }
  return NumericSerializationDescriptor{
      numericType,
      "unknown",
      ByteOrder::LittleEndian,
      0,
      "unknown",
      "unknown",
      "unknown",
      "unknown",
      "unknown",
      "unknown",
      "unknown",
      "unknown",
      false,
      false,
  };
}

std::vector<NumericSerializationDescriptor> core_numeric_serialization_descriptors() {
  return {
      numeric_serialization_descriptor(NumericType::F64),
      numeric_serialization_descriptor(NumericType::ScaledI64),
      numeric_serialization_descriptor(NumericType::IntervalF64Pair),
      numeric_serialization_descriptor(NumericType::Decimal128),
      numeric_serialization_descriptor(NumericType::MpLimbBlock),
  };
}

bool numeric_serialization_contract_smoke() {
  const std::vector<NumericSerializationDescriptor> descriptors =
      core_numeric_serialization_descriptors();
  const auto has = [&descriptors](NumericType numericType) {
    return std::any_of(
        descriptors.begin(),
        descriptors.end(),
        [numericType](const NumericSerializationDescriptor& descriptor) {
          return descriptor.numericType == numericType &&
                 descriptor.name == to_string(numericType) &&
                 descriptor.byteOrder == ByteOrder::LittleEndian &&
                 !descriptor.signedness.empty() &&
                 !descriptor.scaleFactor.empty() &&
                 !descriptor.exponentLayout.empty() &&
                 !descriptor.limbOrder.empty() &&
                 !descriptor.intervalEndpointConvention.empty() &&
                 !descriptor.roundingMode.empty() &&
                 !descriptor.comparisonSemantics.empty() &&
                 !descriptor.textExport.empty() &&
                 descriptor.authoritativeStorageSafe;
        });
  };

  const NumericSerializationDescriptor f64 =
      numeric_serialization_descriptor(NumericType::F64);
  const NumericSerializationDescriptor interval =
      numeric_serialization_descriptor(NumericType::IntervalF64Pair);
  const NumericSerializationDescriptor limb =
      numeric_serialization_descriptor(NumericType::MpLimbBlock);

  return descriptors.size() == 5 &&
         has(NumericType::F64) &&
         has(NumericType::ScaledI64) &&
         has(NumericType::IntervalF64Pair) &&
         has(NumericType::Decimal128) &&
         has(NumericType::MpLimbBlock) &&
         f64.scalarSizeBytes == 8 &&
         f64.appBufferSafe &&
         interval.scalarSizeBytes == 16 &&
         interval.intervalEndpointConvention.find("lower") != std::string_view::npos &&
         limb.scalarSizeBytes == 0 &&
         !limb.appBufferSafe;
}

}  // namespace architrino::solver
