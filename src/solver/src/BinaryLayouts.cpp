#include "architrino/solver/BinaryLayouts.hpp"

namespace architrino::solver {

std::string_view to_string(BinaryLayoutId value) {
  switch (value) {
    case BinaryLayoutId::FrameBufferV1:
      return "frame_buffer.v1";
    case BinaryLayoutId::PathSegmentV1:
      return "path_segment.v1";
    case BinaryLayoutId::AssemblyStateV1:
      return "assembly_state.v1";
    case BinaryLayoutId::AssemblyMembershipV1:
      return "assembly_membership.v1";
    case BinaryLayoutId::AssemblyHierarchyV1:
      return "assembly_hierarchy.v1";
    case BinaryLayoutId::AssemblyEventsV1:
      return "assembly_events.v1";
    case BinaryLayoutId::PathChunkV1:
      return "path_chunk.v1";
    case BinaryLayoutId::RootLedgerV1:
      return "root_ledger.v1";
    case BinaryLayoutId::DelayedHitEventsV1:
      return "delayed_hit_events.v1";
    case BinaryLayoutId::PhaseAtHitV1:
      return "phase_at_hit.v1";
    case BinaryLayoutId::GeometryBufferV1:
      return "geometry_buffer.v1";
    case BinaryLayoutId::StreamIndexV1:
      return "stream_index.v1";
  }
  return "unknown";
}

std::string_view to_string(ByteOrder value) {
  switch (value) {
    case ByteOrder::LittleEndian:
      return "little-endian";
  }
  return "unknown";
}

BinaryLayoutDescriptor binary_layout_descriptor(BinaryLayoutId layoutId) {
  switch (layoutId) {
    case BinaryLayoutId::PathSegmentV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          96,
          "path key, segment index, start/end time, start point, velocity, error bound, state flags",
      };
    case BinaryLayoutId::RootLedgerV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          112,
          "root id, status, emission/hit/delay/distance/residual/J/weight, source point, receiver point",
      };
    case BinaryLayoutId::DelayedHitEventsV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          128,
          "event id, root id, status, emission/hit/distance/J/strength, emission point, receiver point, unit direction",
      };
    case BinaryLayoutId::StreamIndexV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          64,
          "path key, chunk index, row offset/count, time span, byte offset/length",
      };
    default:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          0,
          "layout declared but not implemented in the first solver core",
      };
  }
}

std::vector<BinaryLayoutDescriptor> core_solver_layouts() {
  return {
      binary_layout_descriptor(BinaryLayoutId::PathSegmentV1),
      binary_layout_descriptor(BinaryLayoutId::RootLedgerV1),
      binary_layout_descriptor(BinaryLayoutId::DelayedHitEventsV1),
      binary_layout_descriptor(BinaryLayoutId::StreamIndexV1),
  };
}

}  // namespace architrino::solver
