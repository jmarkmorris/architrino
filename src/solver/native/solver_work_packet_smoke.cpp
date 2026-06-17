#include "architrino/solver/WorkPacket.hpp"

#include <iostream>
#include <string>
#include <vector>

int main() {
  architrino::solver::WorkPacketHeader packet;
  packet.packetId = "packet-0001";
  packet.runId = "run-0001";
  packet.modelId = "aaa.central-solver";
  packet.precisionPath = architrino::solver::PrecisionPath::EventRootFocused;
  packet.sourceBlock = architrino::solver::WorkPacketIndexRange{0, 8, true};
  packet.receiverBlock = architrino::solver::WorkPacketIndexRange{8, 16, true};
  packet.pathBlock = architrino::solver::WorkPacketIndexRange{0, 4, true};
  packet.timeRange = architrino::solver::WorkPacketTimeRange{0.0, 10.0};
  packet.expectedOutputs = {
      architrino::solver::BinaryLayoutId::RootLedgerV1,
      architrino::solver::BinaryLayoutId::DelayedHitEventsV1,
  };
  packet.inputBuffers = {
      architrino::solver::WorkPacketBufferRef{
          "path-segments-a",
          architrino::solver::BinaryLayoutId::PathSegmentV1,
          architrino::solver::NumericType::F64,
          0,
          384,
          0,
          4,
          "6bd1ec997778a501",
      },
  };
  packet.mergeOrder = 12;
  packet.mergeKey = "run-0001:time-0000:source-0000:receiver-0008";

  const architrino::solver::ValidationReport validation =
      architrino::solver::validate_work_packet_header(packet);
  const std::string serialized = architrino::solver::serialize_work_packet_header(packet);
  const std::string serializedAgain = architrino::solver::serialize_work_packet_header(packet);
  const std::string checksum = architrino::solver::work_packet_header_checksum(packet);
  const std::string checksumAgain = architrino::solver::work_packet_header_checksum(packet);

  architrino::solver::WorkPacketHeader invalid = packet;
  invalid.mergeKey.clear();
  const architrino::solver::ValidationReport invalidValidation =
      architrino::solver::validate_work_packet_header(invalid);

  std::vector<architrino::solver::WorkPacketResultRef> mergeInput{
      architrino::solver::WorkPacketResultRef{"packet-c", 2, "b", {}},
      architrino::solver::WorkPacketResultRef{"packet-b", 1, "a", {}},
      architrino::solver::WorkPacketResultRef{"packet-a", 0, "a", {}},
  };
  const std::vector<architrino::solver::WorkPacketResultRef> merged =
      architrino::solver::deterministic_merge_order(std::move(mergeInput));

  const bool ok =
      validation.ok &&
      !invalidValidation.ok &&
      serialized == serializedAgain &&
      serialized.find("\"schema\":\"solver-work-packet.v1\"") != std::string::npos &&
      serialized.find("\"expectedOutputs\":[\"root_ledger.v1\",\"delayed_hit_events.v1\"]") !=
          std::string::npos &&
      checksum == checksumAgain &&
      checksum.size() == 16 &&
      merged.size() == 3 &&
      merged[0].packetId == "packet-a" &&
      merged[1].packetId == "packet-b" &&
      merged[2].packetId == "packet-c";

  if (!ok) {
    std::cerr << "solver work packet smoke failed\n";
    return 1;
  }

  std::cout << "solver work-packet=ok checksum=" << checksum << '\n';
  return 0;
}
