#pragma once

#include "architrino/solver/AssemblyGraph.hpp"
#include "architrino/solver/BinaryLayouts.hpp"

#include <cstddef>
#include <cstdint>
#include <fstream>
#include <string>
#include <string_view>
#include <vector>

namespace architrino::solver {

struct AssemblyGraphStoreOptions {
  std::string storeId = "assembly-graph";
  std::string statePath;
  std::string membershipPath;
  std::string hierarchyPath;
  std::string eventPath;
  std::string metadataPath;
  bool durable = true;
};

struct AssemblyGraphDatasetMetadata {
  BinaryLayoutId layoutId = BinaryLayoutId::AssemblyStateV1;
  std::size_t rowSizeBytes = 0;
  std::uint64_t rowCount = 0;
  std::uint64_t byteLength = 0;
  std::string path;
};

struct AssemblyGraphStoreMetadata {
  std::string storeId;
  std::string manifestVersion = "solver-assembly-graph-manifest.v1";
  NumericType numericType = NumericType::F64;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  bool hasTimeRange = false;
  bool durable = true;
  AssemblyGraphDatasetMetadata states;
  AssemblyGraphDatasetMetadata memberships;
  AssemblyGraphDatasetMetadata hierarchy;
  AssemblyGraphDatasetMetadata events;
  std::string metadataPath;
};

struct AssemblyGraphQuery {
  std::uint64_t pathKey = 0;
  std::uint64_t assemblyKey = 0;
  double timeStart = 0.0;
  double timeEnd = 0.0;
  bool filterPath = false;
  bool filterAssembly = false;
  bool filterTime = false;
};

class AssemblyGraphStoreWriter {
 public:
  explicit AssemblyGraphStoreWriter(AssemblyGraphStoreOptions options);
  ~AssemblyGraphStoreWriter() noexcept;

  AssemblyGraphStoreWriter(const AssemblyGraphStoreWriter&) = delete;
  AssemblyGraphStoreWriter& operator=(const AssemblyGraphStoreWriter&) = delete;

  void append_state(const AssemblyStateRowF64& row);
  void append_membership(const AssemblyMembershipRowF64& row);
  void append_hierarchy(const AssemblyHierarchyRowF64& row);
  void append_event(const AssemblyEventRowF64& row);
  void flush();
  AssemblyGraphStoreMetadata close();
  const AssemblyGraphStoreMetadata& metadata() const;

 private:
  void include_time_range(double start, double end);
  void write_manifest() const;

  AssemblyGraphStoreOptions options_;
  AssemblyGraphStoreMetadata metadata_;
  bool closed_ = false;
  std::ofstream stateStream_;
  std::ofstream membershipStream_;
  std::ofstream hierarchyStream_;
  std::ofstream eventStream_;
};

std::vector<AssemblyStateRowF64> read_assembly_state_rows(std::string_view path,
                                                          std::uint64_t rowOffset,
                                                          std::size_t rowCount);
std::vector<AssemblyMembershipRowF64> read_assembly_membership_rows(std::string_view path,
                                                                    std::uint64_t rowOffset,
                                                                    std::size_t rowCount);
std::vector<AssemblyHierarchyRowF64> read_assembly_hierarchy_rows(std::string_view path,
                                                                  std::uint64_t rowOffset,
                                                                  std::size_t rowCount);
std::vector<AssemblyEventRowF64> read_assembly_event_rows(std::string_view path,
                                                          std::uint64_t rowOffset,
                                                          std::size_t rowCount);

std::vector<AssemblyStateRowF64> query_assembly_states(
    const std::vector<AssemblyStateRowF64>& rows,
    const AssemblyGraphQuery& query);
std::vector<AssemblyMembershipRowF64> query_assembly_memberships(
    const std::vector<AssemblyMembershipRowF64>& rows,
    const AssemblyGraphQuery& query);
std::vector<AssemblyHierarchyRowF64> query_assembly_hierarchy(
    const std::vector<AssemblyHierarchyRowF64>& rows,
    const AssemblyGraphQuery& query);
std::vector<AssemblyEventRowF64> query_assembly_events(
    const std::vector<AssemblyEventRowF64>& rows,
    const AssemblyGraphQuery& query);

}  // namespace architrino::solver
