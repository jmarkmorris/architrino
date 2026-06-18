#pragma once

#include "architrino/solver/BinaryLayouts.hpp"

#include <cstddef>
#include <cstdint>
#include <string>
#include <vector>

namespace architrino::solver {

struct StreamRange {
  double timeStart = 0.0;
  double timeEnd = 0.0;
  std::uint64_t frameStart = 0;
  std::uint64_t frameEnd = 0;
  std::uint64_t byteOffset = 0;
  std::uint64_t byteLength = 0;
};

struct SolverBufferDescriptor {
  std::string bufferId;
  BinaryLayoutId layoutId = BinaryLayoutId::RootLedgerV1;
  NumericType numericType = NumericType::F64;
  std::size_t rowCount = 0;
  std::size_t rowSizeBytes = 0;
  std::size_t byteLength = 0;
  bool authoritative = true;
};

struct SolverStreamDescriptor {
  std::string streamId;
  std::string manifestVersion = "solver-stream-manifest.v1";
  BinaryLayoutId indexLayoutId = BinaryLayoutId::StreamIndexV1;
  std::vector<SolverBufferDescriptor> buffers;
  std::vector<StreamRange> ranges;
};

SolverBufferDescriptor make_buffer_descriptor(std::string bufferId,
                                              BinaryLayoutId layoutId,
                                              std::size_t rowCount);

SolverStreamDescriptor make_transient_stream_descriptor(std::string streamId,
                                                        double timeStart,
                                                        double timeEnd,
                                                        std::vector<SolverBufferDescriptor> buffers);

}  // namespace architrino::solver
