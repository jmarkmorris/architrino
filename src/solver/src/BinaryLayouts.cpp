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
    case BinaryLayoutId::RootLedgerDetailV1:
      return "root_ledger_detail.v1";
    case BinaryLayoutId::DelayedHitEventsV1:
      return "delayed_hit_events.v1";
    case BinaryLayoutId::PhaseAtHitV1:
      return "phase_at_hit.v1";
    case BinaryLayoutId::SpaceTimeIndexV1:
      return "spacetime_index.v1";
    case BinaryLayoutId::EmissionShellCandidateV1:
      return "emission_shell_candidate.v1";
    case BinaryLayoutId::EmissionShellNarrowPhaseV1:
      return "emission_shell_narrow_phase.v1";
    case BinaryLayoutId::StreamIndexV1:
      return "stream_index.v1";
    case BinaryLayoutId::AssemblyGraphIndexV1:
      return "assembly_graph_index.v1";
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
    case BinaryLayoutId::FrameBufferV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          88,
          "path key, frame index, time, position, velocity, error bound, state flags",
      };
    case BinaryLayoutId::PathSegmentV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          96,
          "path key, segment index, start/end time, start point, velocity, error bound, state flags",
      };
    case BinaryLayoutId::AssemblyStateV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          112,
          "assembly key, state key, time interval, center, velocity, phase, cycle, model and status flags",
      };
    case BinaryLayoutId::AssemblyMembershipV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          80,
          "membership key, path key, assembly key, state key, interval, confidence, role, binding, version, event, flags",
      };
    case BinaryLayoutId::AssemblyHierarchyV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          56,
          "hierarchy key, parent assembly, child assembly, interval, relation, version, status flags",
      };
    case BinaryLayoutId::AssemblyEventsV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          88,
          "event key, affected ids, state references, related path/assembly, branch transition, time, kind, flags",
      };
    case BinaryLayoutId::PathChunkV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          104,
          "chunk index, path key range, row/frame bounds, time span, byte range, checksum, flags",
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
    case BinaryLayoutId::RootLedgerDetailV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          192,
          "ledger keys, source/receiver keys, root support interval, root geometry, entry kind, root kind, status, J stratum, sequence, iterations, flags",
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
    case BinaryLayoutId::PhaseAtHitV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          104,
          "root id, status, source/receiver cycle indices, emission/hit time, source/receiver phase, phase delta/spread, root/layer/role/charge metadata, flags",
      };
    case BinaryLayoutId::SpaceTimeIndexV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          128,
          "cell coordinates, subject key, row offset, exact space/time bounds, subject kind, source layout, flags",
      };
    case BinaryLayoutId::EmissionShellCandidateV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          112,
          "source/receiver path and segment keys, source/receiver row indices, source/receiver time ranges, distance bounds, radius bounds",
      };
    case BinaryLayoutId::EmissionShellNarrowPhaseV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          40,
          "item index, status, sampled hit/miss classification, sample count, hit time, emission time, residual",
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
    case BinaryLayoutId::AssemblyGraphIndexV1:
      return BinaryLayoutDescriptor{
          layoutId,
          to_string(layoutId),
          NumericType::F64,
          ByteOrder::LittleEndian,
          72,
          "assembly graph source layout, key kind, key, row offset/count, time span, byte offset/length, flags",
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
      binary_layout_descriptor(BinaryLayoutId::FrameBufferV1),
      binary_layout_descriptor(BinaryLayoutId::PathSegmentV1),
      binary_layout_descriptor(BinaryLayoutId::AssemblyStateV1),
      binary_layout_descriptor(BinaryLayoutId::AssemblyMembershipV1),
      binary_layout_descriptor(BinaryLayoutId::AssemblyHierarchyV1),
      binary_layout_descriptor(BinaryLayoutId::AssemblyEventsV1),
      binary_layout_descriptor(BinaryLayoutId::PathChunkV1),
      binary_layout_descriptor(BinaryLayoutId::RootLedgerV1),
      binary_layout_descriptor(BinaryLayoutId::RootLedgerDetailV1),
      binary_layout_descriptor(BinaryLayoutId::DelayedHitEventsV1),
      binary_layout_descriptor(BinaryLayoutId::PhaseAtHitV1),
      binary_layout_descriptor(BinaryLayoutId::SpaceTimeIndexV1),
      binary_layout_descriptor(BinaryLayoutId::EmissionShellCandidateV1),
      binary_layout_descriptor(BinaryLayoutId::EmissionShellNarrowPhaseV1),
      binary_layout_descriptor(BinaryLayoutId::StreamIndexV1),
      binary_layout_descriptor(BinaryLayoutId::AssemblyGraphIndexV1),
  };
}

}  // namespace architrino::solver
