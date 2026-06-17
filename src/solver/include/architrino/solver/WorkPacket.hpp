#pragma once

#include "architrino/solver/BinaryLayouts.hpp"
#include "architrino/solver/SolverTypes.hpp"

#include <cstdint>
#include <string>
#include <vector>

namespace architrino::solver {

struct WorkPacketIndexRange {
  std::uint64_t start = 0;
  std::uint64_t end = 0;
  bool enabled = false;
};

struct WorkPacketTimeRange {
  double start = 0.0;
  double end = 0.0;
};

struct WorkPacketBufferRef {
  std::string bufferId;
  BinaryLayoutId layoutId = BinaryLayoutId::PathSegmentV1;
  NumericType numericType = NumericType::F64;
  std::uint64_t byteOffset = 0;
  std::uint64_t byteLength = 0;
  std::uint64_t rowOffset = 0;
  std::uint64_t rowCount = 0;
  std::string checksum;
};

struct WorkPacketHeader {
  std::string schema = "solver-work-packet.v1";
  std::string packetId;
  std::string runId;
  std::string modelId;
  PrecisionPath precisionPath = PrecisionPath::Auto;
  WorkPacketIndexRange sourceBlock;
  WorkPacketIndexRange receiverBlock;
  WorkPacketIndexRange pathBlock;
  WorkPacketTimeRange timeRange;
  std::vector<BinaryLayoutId> expectedOutputs;
  std::vector<WorkPacketBufferRef> inputBuffers;
  std::uint64_t mergeOrder = 0;
  std::string mergeKey;
};

struct WorkPacketResultRef {
  std::string packetId;
  std::uint64_t mergeOrder = 0;
  std::string mergeKey;
  std::vector<WorkPacketBufferRef> outputs;
};

ValidationReport validate_work_packet_header(const WorkPacketHeader& header);
std::string serialize_work_packet_header(const WorkPacketHeader& header);
std::string work_packet_header_checksum(const WorkPacketHeader& header);
std::vector<WorkPacketResultRef> deterministic_merge_order(std::vector<WorkPacketResultRef> results);

}  // namespace architrino::solver
