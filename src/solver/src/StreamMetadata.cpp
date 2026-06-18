#include "architrino/solver/StreamMetadata.hpp"

#include <utility>

namespace architrino::solver {

SolverBufferDescriptor make_buffer_descriptor(std::string bufferId,
                                              BinaryLayoutId layoutId,
                                              std::size_t rowCount) {
  const BinaryLayoutDescriptor layout = binary_layout_descriptor(layoutId);
  return SolverBufferDescriptor{
      std::move(bufferId),
      layoutId,
      layout.numericType,
      rowCount,
      layout.rowSizeBytes,
      rowCount * layout.rowSizeBytes,
      true,
  };
}

SolverStreamDescriptor make_transient_stream_descriptor(std::string streamId,
                                                        double timeStart,
                                                        double timeEnd,
                                                        std::vector<SolverBufferDescriptor> buffers) {
  std::uint64_t byteOffset = 0;
  std::vector<StreamRange> ranges;
  ranges.reserve(buffers.size());
  for (const SolverBufferDescriptor& buffer : buffers) {
    ranges.push_back(StreamRange{
        timeStart,
        timeEnd,
        0,
        buffer.rowCount == 0 ? 0 : static_cast<std::uint64_t>(buffer.rowCount - 1),
        byteOffset,
        static_cast<std::uint64_t>(buffer.byteLength),
    });
    byteOffset += static_cast<std::uint64_t>(buffer.byteLength);
  }

  return SolverStreamDescriptor{
      std::move(streamId),
      "solver-stream-manifest.v1",
      BinaryLayoutId::StreamIndexV1,
      std::move(buffers),
      std::move(ranges),
  };
}

}  // namespace architrino::solver
