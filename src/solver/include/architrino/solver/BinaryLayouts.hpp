#pragma once

#include "architrino/solver/SolverTypes.hpp"

#include <cstddef>
#include <string_view>
#include <vector>

namespace architrino::solver {

enum class BinaryLayoutId {
  FrameBufferV1,
  PathSegmentV1,
  AssemblyStateV1,
  AssemblyMembershipV1,
  AssemblyHierarchyV1,
  AssemblyEventsV1,
  PathChunkV1,
  RootLedgerV1,
  RootLedgerDetailV1,
  DelayedHitEventsV1,
  PhaseAtHitV1,
  SpaceTimeIndexV1,
  StreamIndexV1,
};

enum class ByteOrder {
  LittleEndian,
};

struct BinaryLayoutDescriptor {
  BinaryLayoutId layoutId = BinaryLayoutId::RootLedgerV1;
  std::string_view name;
  NumericType numericType = NumericType::F64;
  ByteOrder byteOrder = ByteOrder::LittleEndian;
  std::size_t rowSizeBytes = 0;
  std::string_view columnSummary;
};

std::string_view to_string(BinaryLayoutId value);
std::string_view to_string(ByteOrder value);
BinaryLayoutDescriptor binary_layout_descriptor(BinaryLayoutId layoutId);
std::vector<BinaryLayoutDescriptor> core_solver_layouts();

}  // namespace architrino::solver
