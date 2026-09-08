#include "architrino/eom/Decimal.hpp"
#include "architrino/eom/ExactPairBatch.hpp"
#include "architrino/eom/History.hpp"

#include <boost/math/constants/constants.hpp>
#include <boost/multiprecision/cpp_dec_float.hpp>
#include <boost/multiprecision/cpp_int.hpp>
#include <boost/property_tree/json_parser.hpp>
#include <boost/property_tree/ptree.hpp>

#include <algorithm>
#include <array>
#include <atomic>
#include <bit>
#include <cerrno>
#include <chrono>
#include <cmath>
#include <condition_variable>
#include <cstdint>
#include <cstring>
#include <filesystem>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <limits>
#include <map>
#include <memory>
#include <mutex>
#include <optional>
#include <set>
#include <sstream>
#include <stdexcept>
#include <string>
#include <string_view>
#include <thread>
#include <type_traits>
#include <vector>

#include <fcntl.h>
#include <unistd.h>

// This is a prescribed-history adapter, not an independent oracle or an
// evolution integrator. Its saved polynomials require separate conformance.
namespace {
namespace eom = architrino::eom;
namespace fs = std::filesystem;
using Tree = boost::property_tree::ptree;
using Real = boost::multiprecision::cpp_dec_float_100;
using Integer = boost::multiprecision::cpp_int;
using Rational = boost::multiprecision::cpp_rational;
using Vector = std::array<Real, 3>;
using Clock = std::chrono::steady_clock;

constexpr std::size_t kMembers = 12;
constexpr std::size_t kSegments = 1032;
constexpr std::size_t kWorkers = 8;
constexpr std::size_t kMaxCells = 300000;
constexpr double kWallLimit = 1800;
constexpr std::string_view kPeriod = "19.63359163663986";
constexpr std::string_view kPositionError = "1.528724905003159e-10";
constexpr std::string_view kVelocityError = "2.866983034112353e-7";
constexpr std::string_view kOutputRoot =
    ".local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart";
constexpr std::string_view kManifestSchema =
    "braid-program/f5-enclosed-root-history-manifest.v1";

struct SourceBinding { const char* id; const char* path; const char* hash; };
constexpr std::array<SourceBinding, 5> kSources{{
    {"approved-config",
     "reference/priorities/braid-program/configurations/f5-phase-varying-campaign.v2.json",
     "e92e450c8ea83086b60184d31ff5b07fe8a470b1e20088ea312592f2b38800fb"},
    {"pilot-fixture",
     "reference/priorities/braid-program/evidence/2026-08-26-f5-phase-varying-root-pilot-source.v2.json",
     "bda39fe695e8b446ac91aee96a9f867c7f48b8228f2c9f6ac547c8172e0da344"},
    {"restart-predeclaration",
     "reference/priorities/braid-program/evidence/2026-08-26-f5-enclosed-root-restart-predeclaration.md",
     "1bc458d0b80c0a4f9e5b5c22e83d7e360306f020526296a937ae26742a6296e5"},
    {"enclosure-evidence",
     "reference/priorities/braid-program/evidence/2026-08-26-f5-independent-interpolation-enclosure.md",
     "931f5d88a209648bde63dfbdd1f24303b7a33e101e11565e75fd608be347d496"},
    {"accepted-enclosure-report",
     ".local-data/braid-analysis/parallel-agent-search/parallel-braid-prescribed-search-20260826-v1/f5-independent-enclosure/accepted-enclosure-report.v1.json",
     "2f8fa7bdd40df643a661b2efae4a1007683120077d074165f8f506a4b9941bd9"},
}};

// SHA-256 is used only for byte identity. The input digest is never supplied
// by the caller, and no digest is a mathematical conformance certificate.
std::string sha256(std::string_view bytes) {
  constexpr std::array<std::uint32_t, 64> k{
      0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
      0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
      0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
      0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
      0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
      0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
      0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
      0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2};
  std::array<std::uint32_t, 8> h{
      0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19};
  std::vector<std::uint8_t> input(bytes.begin(), bytes.end());
  const std::uint64_t bits = static_cast<std::uint64_t>(input.size()) * 8;
  input.push_back(0x80);
  while (input.size() % 64 != 56) input.push_back(0);
  for (int shift = 56; shift >= 0; shift -= 8) input.push_back(bits >> shift);
  for (std::size_t offset = 0; offset < input.size(); offset += 64) {
    std::array<std::uint32_t, 64> w{};
    for (std::size_t i = 0; i < 16; ++i) {
      for (std::size_t j = 0; j < 4; ++j) w[i] = (w[i] << 8) | input[offset + 4*i + j];
    }
    for (std::size_t i = 16; i < 64; ++i) {
      const auto s0 = std::rotr(w[i-15],7) ^ std::rotr(w[i-15],18) ^ (w[i-15] >> 3);
      const auto s1 = std::rotr(w[i-2],17) ^ std::rotr(w[i-2],19) ^ (w[i-2] >> 10);
      w[i] = w[i-16] + s0 + w[i-7] + s1;
    }
    auto [a,b,c,d,e,f,g,z] = h;
    for (std::size_t i = 0; i < 64; ++i) {
      const auto s1 = std::rotr(e,6) ^ std::rotr(e,11) ^ std::rotr(e,25);
      const auto t1 = z + s1 + ((e & f) ^ (~e & g)) + k[i] + w[i];
      const auto s0 = std::rotr(a,2) ^ std::rotr(a,13) ^ std::rotr(a,22);
      const auto t2 = s0 + ((a & b) ^ (a & c) ^ (b & c));
      z=g; g=f; f=e; e=d+t1; d=c; c=b; b=a; a=t1+t2;
    }
    h[0]+=a; h[1]+=b; h[2]+=c; h[3]+=d; h[4]+=e; h[5]+=f; h[6]+=g; h[7]+=z;
  }
  std::ostringstream out;
  out << std::hex << std::setfill('0');
  for (const auto word : h) out << std::setw(8) << word;
  return out.str();
}

std::string quote(std::string_view text) {
  std::ostringstream out;
  out << '"';
  for (const unsigned char ch : text) {
    if (ch == '"' || ch == '\\') out << '\\' << ch;
    else if (ch < 0x20) out << "\\u" << std::hex << std::setw(4) << std::setfill('0') << unsigned(ch);
    else out << ch;
  }
  out << '"';
  return out.str();
}

struct Object {
  std::string text = "{";
  void raw(std::string_view name, std::string_view value) {
    if (text.size() > 1) text += ',';
    text += quote(name) + ':' + std::string(value);
  }
  void string(std::string_view name, std::string_view value) { raw(name, quote(value)); }
  void boolean(std::string_view name, bool value) { raw(name, value ? "true" : "false"); }
  template<class T> void number(std::string_view name, T value) {
    if constexpr (std::is_floating_point_v<T>) {
      if (!std::isfinite(value)) throw std::runtime_error("nonfinite JSON number");
    }
    std::ostringstream out;
    out << std::setprecision(std::numeric_limits<double>::max_digits10) << value;
    raw(name, out.str());
  }
  std::string finish() const { return text + '}'; }
};

template<class Range, class Function>
std::string array_json(const Range& values, Function serialize) {
  std::string result = "[";
  for (const auto& value : values) {
    if (result.size() > 1) result += ',';
    result += serialize(value);
  }
  return result + ']';
}

bool within(const fs::path& path, const fs::path& root) {
  auto a = path.begin();
  for (auto b = root.begin(); b != root.end(); ++a, ++b) {
    if (a == path.end() || *a != *b) return false;
  }
  return true;
}

std::string read_bytes(const fs::path& path) {
  constexpr std::uintmax_t limit = 64 * 1024 * 1024;
  if (!fs::is_regular_file(path) || fs::file_size(path) > limit)
    throw std::runtime_error("input must be a regular file of at most 64 MiB: " + path.string());
  std::ifstream stream(path, std::ios::binary);
  if (!stream) throw std::runtime_error("cannot open input: " + path.string());
  std::string bytes((std::istreambuf_iterator<char>(stream)), {});
  if (stream.bad() || bytes.size() > limit) throw std::runtime_error("input read failed or exceeded limit");
  return bytes;
}

Tree read_json(const std::string& bytes) {
  Tree tree;
  std::istringstream input(bytes);
  boost::property_tree::read_json(input, tree);
  return tree;
}

struct FrozenInputs {
  fs::path root;
  std::array<std::string, kSources.size()> bytes;
  explicit FrozenInputs(const fs::path& requested) : root(fs::canonical(requested)) {
    for (std::size_t index = 0; index < kSources.size(); ++index) {
      const auto target = fs::canonical(root / kSources[index].path);
      if (!within(target, root)) throw std::runtime_error("frozen source escapes repository");
      bytes[index] = read_bytes(target);
      if (sha256(bytes[index]) != kSources[index].hash)
        throw std::runtime_error("frozen source hash mismatch: " + std::string(kSources[index].id));
    }
  }
  void recheck() const {
    for (std::size_t index = 0; index < kSources.size(); ++index) {
      const auto target = fs::canonical(root / kSources[index].path);
      if (!within(target, root) || read_bytes(target) != bytes[index])
        throw std::runtime_error("frozen source changed: " + std::string(kSources[index].id));
    }
  }
  std::string binding_json() const {
    return array_json(kSources, [](const auto& item) {
      Object out;
      out.string("id", item.id); out.string("path", item.path); out.string("sha256", item.hash);
      return out.finish();
    });
  }
};

class ExclusiveOutput {
 public:
  ExclusiveOutput(const fs::path& requested, const fs::path& repository) {
    const auto absolute = fs::absolute(requested).lexically_normal();
    const auto parent = fs::canonical(absolute.parent_path());
    const auto admitted = fs::canonical(repository / kOutputRoot);
    if (!within(parent, admitted) || !within(admitted, repository))
      throw std::runtime_error("output must lie under the frozen ignored restart directory");
    path_ = parent / absolute.filename();
    fd_ = ::open(path_.c_str(), O_WRONLY | O_CREAT | O_EXCL | O_NOFOLLOW, 0600);
    if (fd_ < 0) throw std::runtime_error("exclusive output creation failed: " + path_.string());
  }
  ExclusiveOutput(const ExclusiveOutput&) = delete;
  ExclusiveOutput& operator=(const ExclusiveOutput&) = delete;
  ~ExclusiveOutput() { if (fd_ >= 0) ::close(fd_); }
  void write(std::string_view bytes) {
    while (!bytes.empty()) {
      const auto count = ::write(fd_, bytes.data(), bytes.size());
      if (count < 0 && errno == EINTR) continue;
      if (count <= 0) throw std::runtime_error("output write failed: " + path_.string());
      bytes.remove_prefix(static_cast<std::size_t>(count));
    }
  }
  void sync() { if (::fsync(fd_) != 0) throw std::runtime_error("output sync failed"); }
 private:
  int fd_ = -1;
  fs::path path_;
};

Integer pow10(unsigned exponent) {
  Integer result = 1;
  while (exponent-- > 0) result *= 10;
  return result;
}

Rational exact_decimal(std::string_view token) {
  if (token.empty() || token.size() > 1024) throw std::runtime_error("invalid exact decimal token");
  bool negative = false;
  std::size_t index = 0;
  if (token[index] == '-' || token[index] == '+') negative = token[index++] == '-';
  Integer coefficient = 0;
  int fraction = 0;
  bool dot = false, digit = false;
  for (; index < token.size() && token[index] != 'e' && token[index] != 'E'; ++index) {
    const char c = token[index];
    if (c == '.' && !dot) { dot = true; continue; }
    if (c < '0' || c > '9') throw std::runtime_error("invalid exact decimal digit");
    coefficient = coefficient * 10 + (c - '0');
    if (dot) ++fraction;
    digit = true;
  }
  if (!digit) throw std::runtime_error("exact decimal has no digits");
  int exponent = 0;
  if (index < token.size()) {
    std::string suffix(token.substr(index + 1));
    std::size_t used = 0;
    exponent = std::stoi(suffix, &used);
    if (used != suffix.size()) throw std::runtime_error("invalid decimal exponent");
  }
  exponent -= fraction;
  if (exponent < -2000 || exponent > 2000) throw std::runtime_error("decimal exponent out of bounds");
  if (negative) coefficient = -coefficient;
  Rational result(coefficient);
  if (exponent >= 0) result *= pow10(static_cast<unsigned>(exponent));
  else result /= pow10(static_cast<unsigned>(-exponent));
  return result;
}

std::string scaled_integer(Integer coefficient, unsigned places) {
  const bool negative = coefficient < 0;
  if (negative) coefficient = -coefficient;
  std::string digits = coefficient.str();
  if (digits.size() <= places) digits.insert(0, places + 1 - digits.size(), '0');
  if (places != 0) digits.insert(digits.size() - places, 1, '.');
  while (places != 0 && digits.back() == '0') digits.pop_back();
  if (digits.back() == '.') digits.pop_back();
  return (negative ? "-" : "") + digits;
}

std::pair<std::string, std::string> reception_tokens(unsigned phase, unsigned samples) {
  unsigned power = 0;
  for (unsigned divisor = samples; divisor > 1; divisor >>= 1) ++power;
  Integer numerator = Integer("1963359163663986") * phase;
  for (unsigned i = 0; i < power; ++i) numerator *= 5;
  const unsigned places = 14 + power;
  return {scaled_integer(numerator, places), scaled_integer(numerator - pow10(places), places)};
}

std::string real_token(const Real& value) {
  if (value == 0) return "0";
  const auto result = value.str(65, std::ios_base::scientific);
  const auto carrier = eom::parse_finite_double(result, "constructed coefficient");
  if (carrier == 0 || result.size() > 128) throw std::runtime_error("coefficient outside finite carrier");
  return result;
}

Vector vector_value(const Tree& array) {
  if (array.size() != 3) throw std::runtime_error("expected a three-coordinate source vector");
  Vector result;
  std::size_t index = 0;
  for (const auto& item : array) result[index++] = Real(item.second.data());
  return result;
}

struct Member {
  std::size_t index;
  std::string constituent, worldline, history_id;
  int polarity, axis, ring, branch;
  Real epoch, axial, radius1, radius2, amplitude, phase, frequency;
  Vector center;
  std::array<Vector, 3> axes;
  std::unique_ptr<eom::RetainedHistory> history;
};

std::vector<Member> source_members(const Tree& config) {
  const auto& order = config.get_child("relationships.sourceOrder");
  const auto& worldlines = config.get_child("worldlines");
  const auto& constituents = config.get_child("constituents");
  if (order.size() != kMembers || worldlines.size() != kMembers || constituents.size() != kMembers)
    throw std::runtime_error("approved member inventory changed");
  std::vector<Member> result;
  std::set<std::string> identities;
  for (const auto& item : order) {
    const auto identity = item.second.data();
    if (!identities.insert(identity).second) throw std::runtime_error("duplicate member identity");
    const auto worldline = std::find_if(worldlines.begin(), worldlines.end(), [&](const auto& row) {
      return row.second.template get<std::string>("constituentId") == identity;
    });
    const auto constituent = std::find_if(constituents.begin(), constituents.end(), [&](const auto& row) {
      return row.second.template get<std::string>("id") == identity;
    });
    if (worldline == worldlines.end() || constituent == constituents.end())
      throw std::runtime_error("source order has missing member");
    const auto& op = worldline->second.get_child("operator");
    if (op.get<std::string>("kind") != "f5-phase-varying-member.v1")
      throw std::runtime_error("unsupported prescribed operator");
    Member member{};
    member.index = result.size();
    member.constituent = identity;
    member.worldline = worldline->second.get<std::string>("id");
    member.history_id = "f5-enclosed-root/v1/" + member.worldline;
    member.polarity = op.get<int>("polarity");
    member.axis = op.get<int>("axisIndex");
    member.ring = op.get<int>("ringIndex");
    member.branch = op.get<int>("branchSign");
    if (member.axis < 0 || member.axis > 2 || (member.ring != 1 && member.ring != 2) ||
        std::abs(member.polarity) != 1 || std::abs(member.branch) != 1 ||
        member.polarity != constituent->second.get<int>("polarity"))
      throw std::runtime_error("invalid labeled F5 member");
    member.epoch = Real(op.get<std::string>("epochTime"));
    member.axial = Real(op.get<std::string>("axialHalfSeparation"));
    const auto& radii = op.get_child("transverseRadii");
    if (radii.size() != 2) throw std::runtime_error("two radii required");
    member.radius1 = Real(radii.front().second.data());
    member.radius2 = Real(radii.back().second.data());
    member.amplitude = Real(op.get<std::string>("resultantAmplitude"));
    member.phase = Real(op.get<std::string>("resultantPhase"));
    member.frequency = Real(op.get<std::string>("resultantAngularFrequency"));
    member.center = vector_value(op.get_child("assemblyCenter"));
    const auto& axes = op.get_child("bodyAxes");
    if (axes.size() != 3) throw std::runtime_error("three ordered axes required");
    std::size_t axis = 0;
    for (const auto& entry : axes) member.axes[axis++] = vector_value(entry.second);
    result.push_back(std::move(member));
  }
  if (config.get<std::string>("history.returnPeriod") != kPeriod)
    throw std::runtime_error("approved period changed");
  return result;
}

struct State { Vector position; Vector velocity; };

// Direct construction from the mathematical owner's reconstruction and exact
// tangent. These high-precision values are a subject, not a reference proof.
State analytic_state(const Member& member, const Real& time) {
  const Real theta = member.frequency * (time - member.epoch) + member.phase;
  const Real offset = 2 * boost::math::constants::pi<Real>() / 3;
  const std::array<Real, 3> angles{theta, Real(theta-offset), Real(theta+offset)};
  Vector coordinate, rate;
  for (std::size_t i = 0; i < 3; ++i) {
    coordinate[i] = member.amplitude * cos(angles[i]);
    rate[i] = -member.amplitude * member.frequency * sin(angles[i]);
  }
  Vector c{}, cd{};
  if (member.axis == 0) { c = {0,coordinate[1],coordinate[2]}; cd = {0,rate[1],rate[2]}; }
  if (member.axis == 1) { c = {coordinate[0],0,-coordinate[2]}; cd = {rate[0],0,-rate[2]}; }
  if (member.axis == 2) { c = {-coordinate[0],-coordinate[1],0}; cd = {-rate[0],-rate[1],0}; }
  Real square = 0, projection = 0;
  for (std::size_t i = 0; i < 3; ++i) { square += c[i]*c[i]; projection += c[i]*cd[i]; }
  const Real length = sqrt(square);
  if (!(length > abs(member.radius1-member.radius2) && length < member.radius1+member.radius2))
    throw std::runtime_error("constructed F5 triangle is outside its regular chart");
  const Real length_rate = projection / length;
  const Real difference = member.radius1*member.radius1-member.radius2*member.radius2;
  const Real alpha = (square+difference)/(2*length);
  const Real alpha_rate = length_rate*(1-difference/square)/2;
  const Real beta = sqrt(member.radius1*member.radius1-alpha*alpha);
  if (!(beta > 0)) throw std::runtime_error("constructed triangle has no positive height");
  const Real beta_rate = -alpha*alpha_rate/beta;
  Vector e, ed, tangent{}, tangent_rate{};
  for (std::size_t i = 0; i < 3; ++i) {
    e[i] = c[i]/length;
    ed[i] = (cd[i]-length_rate*e[i])/length;
  }
  // Ordered body-axis cross product n_a x e; no physical magnetic premise.
  const std::size_t u = (member.axis+1)%3, v = (member.axis+2)%3;
  tangent[u] = -e[v]; tangent[v] = e[u];
  tangent_rate[u] = -ed[v]; tangent_rate[v] = ed[u];
  Vector local, velocity;
  for (std::size_t i = 0; i < 3; ++i) {
    const Real first = alpha*e[i]+member.branch*beta*tangent[i];
    const Real first_rate = alpha_rate*e[i]+alpha*ed[i] +
        member.branch*(beta_rate*tangent[i]+beta*tangent_rate[i]);
    local[i] = member.ring == 1 ? first : Real(c[i]-first);
    velocity[i] = member.ring == 1 ? first_rate : Real(cd[i]-first_rate);
  }
  local[member.axis] += (member.ring == 1 ? member.polarity : -member.polarity)*member.axial;
  State result{member.center, {Real(0),Real(0),Real(0)}};
  for (std::size_t i = 0; i < 3; ++i) {
    for (std::size_t j = 0; j < 3; ++j) {
      result.position[j] += local[i]*member.axes[i][j];
      result.velocity[j] += velocity[i]*member.axes[i][j];
    }
  }
  return result;
}

using Grid = std::vector<std::pair<std::string, std::string>>;
Grid accepted_grid(const Tree& report) {
  if (!report.get<bool>("accepted") || report.get<std::string>("status") != "independent-enclosure-passed" ||
      report.get<std::size_t>("coverage.segmentCount") != kSegments)
    throw std::runtime_error("frozen report has no accepted complete partition");
  const auto& segments = report.get_child("segments");
  if (segments.size() != kSegments) throw std::runtime_error("frozen partition count differs");
  Grid grid;
  Rational previous = -1;
  for (const auto& item : segments) {
    const auto start = item.second.get<std::string>("start");
    const auto end = item.second.get<std::string>("end");
    const Rational a = exact_decimal(start), b = exact_decimal(end);
    if (a != previous || b <= a || b-a > exact_decimal("0.02"))
      throw std::runtime_error("invalid frozen partition");
    grid.emplace_back(start, end);
    previous = b;
  }
  if (previous != exact_decimal(kPeriod)) throw std::runtime_error("frozen partition ends at wrong time");
  return grid;
}

struct Progress {
  const FrozenInputs& inputs;
  const Clock::time_point started = Clock::now();
  std::mutex mutex;
  std::condition_variable changed;
  std::atomic<bool> stop{false};
  bool finished = false;
  std::size_t constructed = 0, scheduled = 0, completed = 0, passing = 0, failures = 0;
  std::string cause, manifest_hash;
  std::array<std::optional<std::size_t>, kWorkers> active{};
  std::thread heartbeat;
  explicit Progress(const FrozenInputs& source) : inputs(source) {
    heartbeat = std::thread([this] {
      std::unique_lock lock(mutex);
      while (!changed.wait_for(lock, std::chrono::seconds(15), [this] { return finished; })) {
        try { inputs.recheck(); }
        catch (const std::exception& error) { fail_locked(error.what()); }
        if (elapsed() >= kWallLimit) fail_locked("wall_limit_exceeded");
        event_locked("progress");
      }
    });
  }
  ~Progress() {
    { std::lock_guard lock(mutex); finished = true; }
    changed.notify_all();
    if (heartbeat.joinable()) heartbeat.join();
  }
  double elapsed() const { return std::chrono::duration<double>(Clock::now()-started).count(); }
  void fail_locked(const std::string& reason) {
    stop.store(true);
    if (cause.empty()) cause = reason;
  }
  void event_locked(std::string_view status, const std::string& extra = "") const {
    Object out;
    out.string("schema", "braid-program/f5-enclosed-root-adapter-event.v1");
    out.string("status", status);
    out.number("constructedMemberSegments", constructed);
    out.number("scheduledRows", scheduled);
    out.number("completedRows", completed);
    out.number("passingRows", passing);
    out.number("failureCount", failures);
    out.number("elapsedWallSeconds", elapsed());
    out.string("failureCode", cause);
    out.string("historyManifestSha256", manifest_hash);
    out.boolean("h3EvidenceEligible", false);
    out.raw("activeRowIndices", array_json(active, [](const auto& index) {
      return index.has_value() ? std::to_string(*index) : "null";
    }));
    if (!extra.empty()) out.raw("detail", extra);
    std::cerr << out.finish() << '\n' << std::flush;
  }
};

void build_histories(std::vector<Member>& members, const Grid& grid, Progress& progress) {
  for (auto& member : members) {
    std::vector<eom::CubicHistorySegment> segments;
    segments.reserve(grid.size());
    State left = analytic_state(member, Real(grid.front().first));
    for (const auto& [start, end] : grid) {
      if (progress.stop.load()) throw std::runtime_error("history construction stopped");
      const Real h = Real(end)-Real(start);
      const State right = analytic_state(member, Real(end));
      eom::CubicCoefficientTokens coefficients;
      for (std::size_t axis = 0; axis < 3; ++axis) {
        const Real slope = (right.position[axis]-left.position[axis])/h;
        const Real quadratic = (3*slope-2*left.velocity[axis]-right.velocity[axis])/h;
        const Real cubic = (left.velocity[axis]+right.velocity[axis]-2*slope)/(h*h);
        coefficients[axis] = {real_token(left.position[axis]), real_token(left.velocity[axis]),
                              real_token(quadratic), real_token(cubic)};
      }
      segments.emplace_back(start, end, std::move(coefficients),
                            std::string(kPositionError), std::string(kVelocityError));
      left = right;
      std::lock_guard lock(progress.mutex);
      ++progress.constructed;
    }
    member.history = std::make_unique<eom::RetainedHistory>(member.history_id, std::move(segments));
  }
}

std::string segment_json(const eom::CubicHistorySegment& segment, std::size_t index) {
  Object out;
  out.number("index", index);
  out.string("tStart", segment.t_start_token()); out.string("tEnd", segment.t_end_token());
  out.raw("coefficients", array_json(segment.coefficient_tokens(), [](const auto& axis) {
    return array_json(axis, [](const auto& token) { return quote(token); });
  }));
  out.raw("positionErrors", array_json(segment.position_error_tokens(), [](const auto& token) { return quote(token); }));
  out.raw("velocityErrors", array_json(segment.velocity_error_tokens(), [](const auto& token) { return quote(token); }));
  return out.finish();
}

std::string manifest_json(const std::vector<Member>& members, const std::string& campaign, const std::string& run) {
  Object out;
  out.string("schema", kManifestSchema); out.string("campaignId", campaign); out.string("runId", run);
  out.string("normalizedFieldSpeed", "1"); out.raw("retainedInterval", "[\"-1\",\"19.63359163663986\"]");
  out.string("maximumSegmentStep", "0.02");
  out.string("positionWidth", kPositionError); out.string("velocityWidth", kVelocityError);
  out.raw("members", array_json(members, [](const auto& member) {
    Object item;
    item.number("index", member.index); item.string("constituentId", member.constituent);
    item.string("worldlineId", member.worldline); item.number("polarity", member.polarity);
    item.string("historyId", member.history_id);
    item.string("historyFingerprint", member.history->provenance_fingerprint());
    std::string segments = "[";
    std::size_t index = 0;
    for (const auto& segment : member.history->segments()) {
      if (index != 0) segments += ',';
      segments += segment_json(segment, index++);
    }
    item.raw("segments", segments+']');
    return item.finish();
  }));
  return out.finish() + '\n';
}

std::string certificate_json(const eom::ExactPairCertificate& certificate) {
  Object out;
#define STRING_FIELD(name) out.string(#name, certificate.name)
#define NUMBER_FIELD(name) out.number(#name, certificate.name)
#define BOOL_FIELD(name) out.boolean(#name, certificate.name)
  STRING_FIELD(schema); STRING_FIELD(row_id); STRING_FIELD(receiver_history_id);
  STRING_FIELD(transmitter_history_id); STRING_FIELD(receiver_history_fingerprint);
  STRING_FIELD(transmitter_history_fingerprint); STRING_FIELD(reception_time);
  STRING_FIELD(searched_lower); STRING_FIELD(searched_upper); STRING_FIELD(field_speed);
  STRING_FIELD(root_tolerance); STRING_FIELD(status); STRING_FIELD(failure_code);
  BOOL_FIELD(root_free_complement); BOOL_FIELD(memory_boundary_contact);
  BOOL_FIELD(coincident_endpoint_excluded); BOOL_FIELD(precision_escalated);
  NUMBER_FIELD(achieved_precision_bits); NUMBER_FIELD(visited_cells);
  NUMBER_FIELD(excluded_cells); NUMBER_FIELD(difficult_cells); STRING_FIELD(diagnostic_detail);
  NUMBER_FIELD(binary64_worker_wall_seconds); NUMBER_FIELD(binary64_setup_wall_seconds);
  NUMBER_FIELD(binary64_warm_start_wall_seconds); NUMBER_FIELD(binary64_cell_setup_wall_seconds);
  NUMBER_FIELD(binary64_cell_classification_wall_seconds); NUMBER_FIELD(binary64_finalization_wall_seconds);
  NUMBER_FIELD(mpfr_worker_wall_seconds); NUMBER_FIELD(mpfr_attempt_count);
  NUMBER_FIELD(mpfr_escalation_worker_wall_seconds); NUMBER_FIELD(mpfr_escalation_attempt_count);
  NUMBER_FIELD(warm_excluded_cells); NUMBER_FIELD(reevaluated_cells); NUMBER_FIELD(warm_residual_drift_upper);
  BOOL_FIELD(stable_negative_prefix_certified); STRING_FIELD(stable_negative_prefix_upper);
  NUMBER_FIELD(incremental_prefix_reuse_count); BOOL_FIELD(has_difficult_cell);
  NUMBER_FIELD(difficult_source_segment_index); STRING_FIELD(difficult_cell_lower);
  STRING_FIELD(difficult_cell_upper); STRING_FIELD(difficult_point);
  STRING_FIELD(difficult_point_residual_lower); STRING_FIELD(difficult_point_residual_upper);
  STRING_FIELD(difficult_transmitter_factor_lower); STRING_FIELD(difficult_transmitter_factor_upper);
  STRING_FIELD(difficult_receiver_factor_lower); STRING_FIELD(difficult_receiver_factor_upper);
  NUMBER_FIELD(difficult_lower_sign); NUMBER_FIELD(difficult_upper_sign);
#undef STRING_FIELD
#undef NUMBER_FIELD
#undef BOOL_FIELD
  out.raw("roots", array_json(certificate.roots, [](const auto& root) {
    Object item;
    item.string("lower", root.lower); item.string("upper", root.upper);
    item.string("transmitter_factor_lower", root.transmitter_factor_lower);
    item.string("transmitter_factor_upper", root.transmitter_factor_upper);
    item.string("receiver_factor_lower", root.receiver_factor_lower);
    item.string("receiver_factor_upper", root.receiver_factor_upper);
    item.number("transmitter_factor_sign", root.transmitter_factor_sign);
    item.raw("transmitter_segment_indices", array_json(root.transmitter_segment_indices,
        [](auto index) { return std::to_string(index); }));
    item.string("precision_route", root.precision_route); item.number("precision_bits", root.precision_bits);
    return item.finish();
  }));
  out.raw("root_free_cells", array_json(certificate.root_free_cells, [](const auto& cell) {
    Object item;
    item.number("transmitter_segment_index", cell.transmitter_segment_index);
    item.string("lower", cell.lower); item.string("upper", cell.upper);
    item.string("residual_lower", cell.residual_lower); item.string("residual_upper", cell.residual_upper);
    item.string("receiver_factor_lower", cell.receiver_factor_lower);
    item.string("receiver_factor_upper", cell.receiver_factor_upper);
    item.number("lower_value", cell.lower_value); item.number("upper_value", cell.upper_value);
    item.number("residual_lower_value", cell.residual_lower_value);
    item.number("residual_upper_value", cell.residual_upper_value);
    item.boolean("numeric_values_valid", cell.numeric_values_valid);
    return item.finish();
  }));
  return out.finish();
}

struct RowContext {
  std::size_t index, phase, receiver, transmitter;
  std::string reception, search_lower, id;
};

RowContext row_context(std::size_t index, unsigned samples, const std::vector<Member>& members) {
  RowContext result{};
  result.index = index; result.phase = index/(kMembers*kMembers);
  result.receiver = index/kMembers % kMembers; result.transmitter = index % kMembers;
  auto tokens = reception_tokens(static_cast<unsigned>(result.phase), samples);
  result.reception = std::move(tokens.first); result.search_lower = std::move(tokens.second);
  result.id = members[result.receiver].worldline + '/' + members[result.transmitter].worldline +
      "/phase-" + std::to_string(result.phase);
  return result;
}

std::string row_json(const RowContext& row, const std::vector<Member>& members,
                     const eom::ExactPairCertificate& certificate) {
  Object out;
  out.number("phaseIndex", row.phase); out.string("receptionTime", row.reception);
  out.number("receiverIndex", row.receiver); out.number("transmitterIndex", row.transmitter);
  out.string("receiverConstituentId", members[row.receiver].constituent);
  out.string("transmitterConstituentId", members[row.transmitter].constituent);
  out.string("receiverWorldlineId", members[row.receiver].worldline);
  out.string("transmitterWorldlineId", members[row.transmitter].worldline);
  out.string("rowId", row.id); out.raw("certificate", certificate_json(certificate));
  return out.finish() + '\n';
}

std::string row_failure(const RowContext& row, const eom::ExactPairCertificate& certificate) {
  if (certificate.status != "certified_complete" || !certificate.failure_code.empty() ||
      !certificate.root_free_complement || certificate.memory_boundary_contact ||
      certificate.has_difficult_cell || certificate.difficult_cells != 0 || certificate.visited_cells > kMaxCells)
    return "incomplete_or_resource_contact_certificate";
  if (row.receiver == row.transmitter) {
    if (!certificate.roots.empty() || !certificate.coincident_endpoint_excluded)
      return "unexpected_self_event_or_missing_endpoint_exclusion";
  } else if (certificate.roots.empty() || certificate.coincident_endpoint_excluded) {
    return "partner_root_missing_or_incorrect_endpoint_exclusion";
  }
  std::optional<Rational> previous;
  for (const auto& root : certificate.roots) {
    const auto lower = exact_decimal(root.lower), upper = exact_decimal(root.upper);
    if (upper <= lower || upper-lower > exact_decimal("1e-8") ||
        upper >= exact_decimal(row.reception) || (previous && lower <= *previous))
      return "invalid_root_bracket";
    if (exact_decimal(root.transmitter_factor_lower) <= 0 || exact_decimal(root.receiver_factor_lower) <= 0 ||
        root.transmitter_factor_sign != 1 ||
        exact_decimal(root.transmitter_factor_upper) < exact_decimal(root.transmitter_factor_lower) ||
        exact_decimal(root.receiver_factor_upper) < exact_decimal(root.receiver_factor_lower))
      return "invalid_root_factor";
    previous = upper;
  }
  return "";
}

std::string controls_json(unsigned samples) {
  Object out;
  out.number("rungSamples", samples); out.string("normalizedFieldSpeed", "1");
  out.string("period", kPeriod); out.string("retainedHistoryDepth", "1");
  out.string("rootTolerance", "1e-8"); out.number("rootMaxDepth", 192);
  out.number("rootMaxCells", kMaxCells); out.number("initialMpfrBits", 128);
  out.number("maximumMpfrBits", 512); out.number("workerCount", kWorkers);
  out.boolean("forcePrecisionEscalation", false); out.boolean("deferPrecisionEscalation", false);
  out.boolean("warmStart", false); out.boolean("jointHistory", false);
  out.string("receptionTokenRule", "exact-decimal-period-rational/v1");
  out.number("limitSeconds", kWallLimit); out.number("heartbeatSeconds", 15);
  return out.finish();
}

void run_rows(unsigned samples, const std::vector<Member>& members, ExclusiveOutput& output, Progress& progress) {
  const std::size_t expected = samples*kMembers*kMembers;
  std::vector<std::size_t> phase_completed(samples, 0);
  std::vector<std::optional<Clock::time_point>> phase_started(samples);
  std::vector<std::thread> workers;
  const auto work = [&](std::size_t worker) {
    while (!progress.stop.load()) {
      std::optional<RowContext> row;
      {
        std::lock_guard lock(progress.mutex);
        if (progress.stop.load() || progress.scheduled >= expected) return;
        if (progress.elapsed() >= kWallLimit) { progress.fail_locked("wall_limit_exceeded"); return; }
        row = row_context(progress.scheduled++, samples, members);
        progress.active[worker] = row->index;
        if (!phase_started[row->phase]) phase_started[row->phase] = Clock::now();
      }
      try {
        eom::ExactPairRequest request{};
        request.row_id = row->id;
        request.receiver = members[row->receiver].history.get();
        request.source = members[row->transmitter].history.get();
        request.reception_time = row->reception;
        request.search_lower = row->search_lower; request.search_upper = row->reception;
        request.field_speed = "1"; request.root_tolerance = "1e-8";
        request.max_depth = 192; request.max_cells = kMaxCells;
        request.initial_mpfr_bits = 128; request.maximum_mpfr_bits = 512;
        {
          std::lock_guard lock(progress.mutex);
          if (progress.stop.load()) {
            progress.active[worker].reset();
            return;
          }
          // This receipt is built from the actual request just before the
          // call, rather than inferred later from campaign-level settings.
          Object detail;
          detail.number("rowIndex", row->index); detail.number("workerIndex", worker);
          detail.string("rowId", request.row_id);
          detail.number("phaseIndex", row->phase);
          detail.number("receiverIndex", row->receiver); detail.number("transmitterIndex", row->transmitter);
          detail.string("receiverHistoryId", request.receiver->history_id());
          detail.string("transmitterHistoryId", request.source->history_id());
          detail.string("receiverHistoryFingerprint", request.receiver->provenance_fingerprint());
          detail.string("transmitterHistoryFingerprint", request.source->provenance_fingerprint());
          detail.string("receptionTime", request.reception_time);
          detail.string("searchLower", request.search_lower); detail.string("searchUpper", request.search_upper);
          detail.string("fieldSpeed", request.field_speed); detail.string("rootTolerance", request.root_tolerance);
          detail.number("maxDepth", request.max_depth); detail.number("maxCells", request.max_cells);
          detail.number("initialMpfrBits", request.initial_mpfr_bits);
          detail.number("maximumMpfrBits", request.maximum_mpfr_bits);
          detail.boolean("forcePrecisionEscalation", request.force_precision_escalation);
          detail.boolean("deferPrecisionEscalation", request.defer_precision_escalation);
          detail.boolean("warmStart", request.warm_start != nullptr);
          detail.boolean("jointHistory", request.joint_root_point_state != nullptr ||
              request.joint_receiver_history != nullptr || request.joint_transmitter_history != nullptr);
          progress.event_locked("row-started", detail.finish());
        }
        const auto certificate = eom::certify_exact_pair(request);
        std::string failure;
        try { failure = row_failure(*row, certificate); }
        catch (const std::exception& error) { failure = std::string("invalid_certificate: ")+error.what(); }
        if (!failure.empty()) progress.stop.store(true);
        // Stream even a failed certificate before recording the stop. Already
        // active calls finish and are retained; no new call is then scheduled.
        std::lock_guard lock(progress.mutex);
        output.write(row_json(*row, members, certificate));
        ++progress.completed;
        if (failure.empty()) ++progress.passing;
        else { ++progress.failures; progress.fail_locked(failure); }
        progress.active[worker].reset();
        if (++phase_completed[row->phase] == kMembers*kMembers) {
          Object detail;
          detail.number("phaseIndex", row->phase);
          detail.number("phaseElapsedWallSeconds", std::chrono::duration<double>(Clock::now()-*phase_started[row->phase]).count());
          progress.event_locked("phase-complete", detail.finish());
        }
        if (!failure.empty()) {
          Object detail; detail.number("rowIndex", row->index); detail.string("rowId", row->id);
          progress.event_locked("row-failed", detail.finish());
        }
      } catch (const std::exception& error) {
        progress.stop.store(true);
        std::lock_guard lock(progress.mutex);
        ++progress.failures;
        progress.active[worker].reset();
        progress.fail_locked(std::string("row_exception: ")+error.what());
        Object detail;
        detail.number("rowIndex", row->index); detail.string("rowId", row->id);
        detail.string("receptionTime", row->reception); detail.string("searchLower", row->search_lower);
        detail.number("receiverIndex", row->receiver); detail.number("transmitterIndex", row->transmitter);
        progress.event_locked("row-exception", detail.finish());
        return;
      }
    }
  };
  try {
    for (std::size_t worker = 0; worker < kWorkers; ++worker) workers.emplace_back(work, worker);
  } catch (...) {
    progress.stop.store(true);
    for (auto& worker : workers) worker.join();
    throw;
  }
  for (auto& worker : workers) worker.join();
  output.sync();
}

struct Options {
  std::string mode, campaign, run;
  fs::path repository, output, manifest;
  unsigned samples = 0;
};

Options options(int argc, char** argv) {
  if (argc < 2) throw std::runtime_error("expected manifest or rung; use --help");
  Options result;
  result.mode = argv[1];
  if (result.mode != "manifest" && result.mode != "rung") throw std::runtime_error("unknown mode");
  std::map<std::string, std::string> args;
  for (int i = 2; i < argc; i += 2) {
    if (i+1 >= argc || !args.emplace(argv[i], argv[i+1]).second)
      throw std::runtime_error("missing or duplicate option");
  }
  const std::set<std::string> allowed{"--repo-root","--campaign-id","--run-id","--out","--history-manifest","--samples"};
  for (const auto& [key,value] : args) {
    if (!allowed.contains(key) || value.empty()) throw std::runtime_error("unknown or empty option: "+key);
  }
  result.repository = args.at("--repo-root"); result.output = args.at("--out");
  result.campaign = args.at("--campaign-id"); result.run = args.at("--run-id");
  if (result.campaign.size() > 256 || result.run.size() > 256) throw std::runtime_error("campaign/run ID too long");
  if (result.mode == "rung") {
    result.manifest = args.at("--history-manifest");
    const auto value = args.at("--samples");
    if (value != "8" && value != "32" && value != "128") throw std::runtime_error("samples must be 8, 32, or 128");
    result.samples = static_cast<unsigned>(std::stoul(value));
  } else if (args.contains("--history-manifest") || args.contains("--samples")) {
    throw std::runtime_error("manifest mode does not accept root controls");
  }
  return result;
}

void help() {
  std::cout <<
      "F5 prescribed enclosed-history adapter (no H3 or evolution authority)\n"
      "  manifest --repo-root ROOT --campaign-id ID --run-id ID --out NEW.json\n"
      "  rung --repo-root ROOT --campaign-id ID --run-id ID --history-manifest FILE\n"
      "       --samples 8|32|128 --out NEW.ndjson\n"
      "Outputs must be new files under .local-data/braid-analysis/2026-08-26-f5-enclosed-root-restart/.\n"
      "The output parent directory must already exist. Root rows stream in completion order.\n"
      "Every rung uses the exact supplied manifest bytes after deterministic reconstruction.\n"
      "Eight workers; 15-second stderr heartbeat; fixed 1800-second ceiling.\n"
      "The coordinator must enforce rung order, independent conformance, projected cost,\n"
      "external interruption/watchdog, build provenance, and independent ledger acceptance.\n";
}
}  // namespace

int main(int argc, char** argv) {
  if (argc == 2 && (std::string_view(argv[1]) == "--help" || std::string_view(argv[1]) == "help")) {
    help(); return 0;
  }
  std::unique_ptr<FrozenInputs> inputs;
  std::unique_ptr<Progress> progress;
  try {
    const auto args = options(argc, argv);
    if (sha256("") != "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" ||
        sha256("abc") != "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")
      throw std::runtime_error("SHA-256 known-answer control failed");
    inputs = std::make_unique<FrozenInputs>(args.repository);
    progress = std::make_unique<Progress>(*inputs);
    ExclusiveOutput output(args.output, inputs->root);
    {
      std::lock_guard lock(progress->mutex);
      Object detail;
      detail.string("mode", args.mode); detail.string("campaignId", args.campaign); detail.string("runId", args.run);
      detail.raw("bindings", inputs->binding_json()); detail.raw("controls", controls_json(args.samples));
      progress->event_locked("started", detail.finish());
    }
    const auto config = read_json(inputs->bytes[0]);
    const auto report = read_json(inputs->bytes[4]);
    auto members = source_members(config);
    const auto grid = accepted_grid(report);
    build_histories(members, grid, *progress);
    const auto manifest = manifest_json(members, args.campaign, args.run);
    inputs->recheck();
    {
      std::lock_guard lock(progress->mutex);
      progress->manifest_hash = sha256(manifest);
      progress->event_locked("histories-built");
    }
    if (progress->stop.load()) throw std::runtime_error("adapter stopped before output or root calls");
    if (args.mode == "manifest") {
      output.write(manifest); output.sync();
    } else {
      const auto input_manifest = fs::canonical(args.manifest);
      if (!within(input_manifest, fs::canonical(inputs->root/kOutputRoot)))
        throw std::runtime_error("history manifest must lie within the ignored restart directory");
      if (read_bytes(input_manifest) != manifest)
        throw std::runtime_error("supplied history manifest differs from reconstructed actual histories");
      run_rows(args.samples, members, output, *progress);
      if (read_bytes(input_manifest) != manifest)
        throw std::runtime_error("history manifest changed during root execution");
    }
    inputs->recheck();
    std::lock_guard lock(progress->mutex);
    if (progress->elapsed() >= kWallLimit) progress->fail_locked("wall_limit_exceeded");
    if (args.mode == "rung" && progress->completed != args.samples*kMembers*kMembers)
      progress->fail_locked("incomplete_rung");
    progress->event_locked(progress->stop.load() ? "failed" : "complete");
    return progress->stop.load() ? 2 : 0;
  } catch (const std::exception& error) {
    if (progress) {
      std::lock_guard lock(progress->mutex);
      progress->fail_locked(error.what());
      progress->event_locked("failed");
    } else {
      Object out;
      out.string("schema", "braid-program/f5-enclosed-root-adapter-event.v1");
      out.string("status", "failed"); out.string("failureCode", error.what());
      out.number("completedRows", 0); out.number("passingRows", 0); out.number("failureCount", 0);
      out.number("elapsedWallSeconds", 0); out.boolean("h3EvidenceEligible", false);
      std::cerr << out.finish() << '\n' << std::flush;
    }
    return 2;
  }
}
