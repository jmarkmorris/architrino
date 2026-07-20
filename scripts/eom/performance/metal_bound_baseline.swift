// Reference-only Metal throughput probe. Binary32 results have no EOM authority.

import Foundation
import Metal

struct Config {
    var pairs: Int = 4_000_000
    var repeats: Int = 5
}

func parseConfig() throws -> Config {
    var config = Config()
    var index = 1
    while index < CommandLine.arguments.count {
        guard index + 1 < CommandLine.arguments.count else {
            throw NSError(domain: "eom-metal-baseline", code: 2,
                          userInfo: [NSLocalizedDescriptionKey: "every option requires a value"])
        }
        let option = CommandLine.arguments[index]
        guard let value = Int(CommandLine.arguments[index + 1]), value > 0 else {
            throw NSError(domain: "eom-metal-baseline", code: 2,
                          userInfo: [NSLocalizedDescriptionKey: "option values must be positive integers"])
        }
        switch option {
        case "--pairs": config.pairs = value
        case "--repeats": config.repeats = value
        default:
            throw NSError(domain: "eom-metal-baseline", code: 2,
                          userInfo: [NSLocalizedDescriptionKey: "unknown option \(option)"])
        }
        index += 2
    }
    return config
}

func median(_ values: [Double]) -> Double {
    let ordered = values.sorted()
    if ordered.count % 2 == 1 { return ordered[ordered.count / 2] }
    return (ordered[ordered.count / 2 - 1] + ordered[ordered.count / 2]) / 2.0
}

func commandTimes(_ commandBuffer: MTLCommandBuffer, wallStart: UInt64) -> (Double, Double?) {
    commandBuffer.commit()
    commandBuffer.waitUntilCompleted()
    let wallEnd = DispatchTime.now().uptimeNanoseconds
    let wall = Double(wallEnd - wallStart) / 1_000_000_000.0
    if commandBuffer.gpuEndTime > commandBuffer.gpuStartTime {
        return (wall, commandBuffer.gpuEndTime - commandBuffer.gpuStartTime)
    }
    return (wall, nil)
}

do {
    let config = try parseConfig()
    guard let device = MTLCreateSystemDefaultDevice() else {
        throw NSError(domain: "eom-metal-baseline", code: 3,
                      userInfo: [NSLocalizedDescriptionKey: "no Metal device"])
    }
    guard let queue = device.makeCommandQueue() else {
        throw NSError(domain: "eom-metal-baseline", code: 3,
                      userInfo: [NSLocalizedDescriptionKey: "cannot create Metal command queue"])
    }

    let source = """
    #include <metal_stdlib>
    using namespace metal;
    kernel void classify_bound(
        device const float *receiver [[buffer(0)]],
        device const float *source [[buffer(1)]],
        device uint *classification [[buffer(2)]],
        constant uint &count [[buffer(3)]],
        uint index [[thread_position_in_grid]]) {
      if (index < count) {
        classification[index] = fabs(receiver[index] - source[index]) > 1.0f ? 1u : 0u;
      }
    }
    """
    let library = try device.makeLibrary(source: source, options: nil)
    guard let function = library.makeFunction(name: "classify_bound") else {
        throw NSError(domain: "eom-metal-baseline", code: 3,
                      userInfo: [NSLocalizedDescriptionKey: "cannot create Metal function"])
    }
    let pipeline = try device.makeComputePipelineState(function: function)

    let floatBytes = config.pairs * MemoryLayout<Float>.stride
    let outputBytes = config.pairs * MemoryLayout<UInt32>.stride
    guard let receiver = device.makeBuffer(length: floatBytes, options: .storageModeShared),
          let transmitterBuffer = device.makeBuffer(length: floatBytes, options: .storageModeShared),
          let output = device.makeBuffer(length: outputBytes, options: .storageModeShared) else {
        throw NSError(domain: "eom-metal-baseline", code: 3,
                      userInfo: [NSLocalizedDescriptionKey: "cannot allocate shared Metal buffers"])
    }
    let receiverValues = receiver.contents().bindMemory(to: Float.self, capacity: config.pairs)
    let sourceValues = transmitterBuffer.contents().bindMemory(to: Float.self, capacity: config.pairs)
    for index in 0..<config.pairs {
        receiverValues[index] = Float(index % 4096) * 0.125
        sourceValues[index] = Float((index * 104729 + 17) % 4096) * 0.125
    }

    func runKernel() throws -> (Double, Double?) {
        guard let commandBuffer = queue.makeCommandBuffer(),
              let encoder = commandBuffer.makeComputeCommandEncoder() else {
            throw NSError(domain: "eom-metal-baseline", code: 3,
                          userInfo: [NSLocalizedDescriptionKey: "cannot encode Metal kernel"])
        }
        encoder.setComputePipelineState(pipeline)
        encoder.setBuffer(receiver, offset: 0, index: 0)
        encoder.setBuffer(transmitterBuffer, offset: 0, index: 1)
        encoder.setBuffer(output, offset: 0, index: 2)
        var count = UInt32(config.pairs)
        encoder.setBytes(&count, length: MemoryLayout<UInt32>.stride, index: 3)
        let width = pipeline.threadExecutionWidth
        encoder.dispatchThreads(MTLSize(width: config.pairs, height: 1, depth: 1),
                                threadsPerThreadgroup: MTLSize(width: width, height: 1, depth: 1))
        encoder.endEncoding()
        return commandTimes(commandBuffer, wallStart: DispatchTime.now().uptimeNanoseconds)
    }

    _ = try runKernel()
    var kernelWall: [Double] = []
    var kernelGPU: [Double] = []
    for _ in 0..<config.repeats {
        let (wall, gpu) = try runKernel()
        kernelWall.append(wall)
        if let gpu = gpu { kernelGPU.append(gpu) }
    }

    let transferBytes = 64 * 1024 * 1024
    guard let transferSource = device.makeBuffer(length: transferBytes, options: .storageModeShared),
          let transferPrivate = device.makeBuffer(length: transferBytes, options: .storageModePrivate),
          let transferDestination = device.makeBuffer(length: transferBytes, options: .storageModeShared) else {
        throw NSError(domain: "eom-metal-baseline", code: 3,
                      userInfo: [NSLocalizedDescriptionKey: "cannot allocate transfer buffers"])
    }
    memset(transferSource.contents(), 0x5A, transferBytes)
    var transferWall: [Double] = []
    var transferGPU: [Double] = []
    for _ in 0..<config.repeats {
        guard let commandBuffer = queue.makeCommandBuffer(),
              let encoder = commandBuffer.makeBlitCommandEncoder() else {
            throw NSError(domain: "eom-metal-baseline", code: 3,
                          userInfo: [NSLocalizedDescriptionKey: "cannot encode Metal transfer"])
        }
        encoder.copy(from: transferSource, transmitterOffset: 0,
                     to: transferPrivate, destinationOffset: 0, size: transferBytes)
        encoder.copy(from: transferPrivate, transmitterOffset: 0,
                     to: transferDestination, destinationOffset: 0, size: transferBytes)
        encoder.endEncoding()
        let (wall, gpu) = commandTimes(commandBuffer, wallStart: DispatchTime.now().uptimeNanoseconds)
        transferWall.append(wall)
        if let gpu = gpu { transferGPU.append(gpu) }
    }

    let kernelWallMedian = median(kernelWall)
    let kernelGPUMedian = kernelGPU.isEmpty ? nil : median(kernelGPU)
    let transferWallMedian = median(transferWall)
    let transferGPUMedian = transferGPU.isEmpty ? nil : median(transferGPU)
    let countedBytes = Double(transferBytes * 2)
    let witness = output.contents().bindMemory(to: UInt32.self, capacity: config.pairs)[config.pairs / 2]
    let result: [String: Any] = [
        "schema": "eom_metal_bound_baseline/v1",
        "authority": "reference-benchmark-only",
        "numeric_format": "binary32",
        "device": device.name,
        "device_count": MTLCopyAllDevices().count,
        "unified_memory": device.hasUnifiedMemory,
        "pair_rows": config.pairs,
        "repeats": config.repeats,
        "kernel_wall_seconds_median": kernelWallMedian,
        "kernel_gpu_seconds_median": kernelGPUMedian as Any,
        "kernel_rows_per_second_wall": Double(config.pairs) / kernelWallMedian,
        "kernel_rows_per_second_gpu": kernelGPUMedian.map { Double(config.pairs) / $0 } as Any,
        "transfer_bytes_counted": Int(countedBytes),
        "transfer_wall_seconds_median": transferWallMedian,
        "transfer_gpu_seconds_median": transferGPUMedian as Any,
        "transfer_bytes_per_second_wall": countedBytes / transferWallMedian,
        "transfer_bytes_per_second_gpu": transferGPUMedian.map { countedBytes / $0 } as Any,
        "classification_witness": witness,
        "promotion_limit": "binary32 bulk-bound throughput only; no root, precision, or EOM authority"
    ]
    let data = try JSONSerialization.data(withJSONObject: result, options: [.sortedKeys])
    FileHandle.standardOutput.write(data)
    FileHandle.standardOutput.write(Data([0x0A]))
} catch {
    FileHandle.standardError.write(Data("\(error.localizedDescription)\n".utf8))
    exit(2)
}
