#pragma once

#include "architrino/solver/BinaryLayouts.hpp"

#include <cstddef>
#include <string_view>
#include <vector>

namespace architrino::solver {

struct NumericSerializationDescriptor {
  NumericType numericType = NumericType::F64;
  std::string_view name;
  ByteOrder byteOrder = ByteOrder::LittleEndian;
  std::size_t scalarSizeBytes = 0;
  std::string_view signedness;
  std::string_view scaleFactor;
  std::string_view exponentLayout;
  std::string_view limbOrder;
  std::string_view intervalEndpointConvention;
  std::string_view roundingMode;
  std::string_view comparisonSemantics;
  std::string_view textExport;
  bool appBufferSafe = false;
  bool authoritativeStorageSafe = false;
};

NumericSerializationDescriptor numeric_serialization_descriptor(NumericType numericType);
std::vector<NumericSerializationDescriptor> core_numeric_serialization_descriptors();
bool numeric_serialization_contract_smoke();

}  // namespace architrino::solver
