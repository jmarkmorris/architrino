// Scratch candidate, not production. Evidence that a population's histories
// are the published state of a validated far-step producer.
//
// The evidence object is sealed: its only constructor is private and the
// producer is its only friend, so in this process an instance can come only
// from a certified step. It is immutable. It binds exact content: for every
// path, the identifier, the charge token and a SHA-256 chain over every
// token of every segment of the complete history, together with the coupling
// token and the generating step. A consumer rechecks it by recomputing the
// chain from the histories it was actually handed.
#pragma once

#include "architrino/eom/History.hpp"

#include <array>
#include <cstdint>
#include <cstring>
#include <string>
#include <utility>
#include <vector>

namespace vfs {
class Producer;
}

namespace architrino::eom {

inline std::string sha256_hex(const std::string& message) {
  static constexpr std::uint32_t k[64] = {
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
      0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
      0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
      0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
      0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2};
  std::uint32_t h[8] = {0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
                        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19};
  std::string data = message;
  const std::uint64_t bits = static_cast<std::uint64_t>(message.size()) * 8U;
  data.push_back(static_cast<char>(0x80));
  while (data.size() % 64U != 56U) data.push_back('\0');
  for (int shift = 56; shift >= 0; shift -= 8) {
    data.push_back(static_cast<char>((bits >> shift) & 0xffU));
  }
  const auto rotr = [](std::uint32_t x, int n) {
    return (x >> n) | (x << (32 - n));
  };
  for (std::size_t block = 0; block < data.size(); block += 64U) {
    std::uint32_t w[64];
    for (int i = 0; i < 16; ++i) {
      const auto* p = reinterpret_cast<const unsigned char*>(
          data.data() + block + static_cast<std::size_t>(i) * 4U);
      w[i] = (std::uint32_t{p[0]} << 24) | (std::uint32_t{p[1]} << 16) |
          (std::uint32_t{p[2]} << 8) | std::uint32_t{p[3]};
    }
    for (int i = 16; i < 64; ++i) {
      const std::uint32_t s0 =
          rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >> 3);
      const std::uint32_t s1 =
          rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >> 10);
      w[i] = w[i - 16] + s0 + w[i - 7] + s1;
    }
    std::uint32_t a = h[0], b = h[1], c = h[2], d = h[3];
    std::uint32_t e = h[4], f = h[5], g = h[6], hh = h[7];
    for (int i = 0; i < 64; ++i) {
      const std::uint32_t s1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const std::uint32_t ch = (e & f) ^ (~e & g);
      const std::uint32_t t1 = hh + s1 + ch + k[i] + w[i];
      const std::uint32_t s0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const std::uint32_t maj = (a & b) ^ (a & c) ^ (b & c);
      const std::uint32_t t2 = s0 + maj;
      hh = g; g = f; f = e; e = d + t1;
      d = c; c = b; b = a; a = t1 + t2;
    }
    h[0] += a; h[1] += b; h[2] += c; h[3] += d;
    h[4] += e; h[5] += f; h[6] += g; h[7] += hh;
  }
  static constexpr char digits[] = "0123456789abcdef";
  std::string out;
  for (const std::uint32_t word : h) {
    for (int shift = 28; shift >= 0; shift -= 4) {
      out.push_back(digits[(word >> shift) & 0xfU]);
    }
  }
  return out;
}

// SHA-256 chain over every token of every segment, in order.
inline std::string validated_history_digest(const RetainedHistory& history) {
  std::string chain = sha256_hex("validated-far-step-history-chain");
  const auto& segments = history.segments();
  for (std::size_t i = 0; i < segments.size(); ++i) {
    const auto segment = segments.at(i);
    std::string text = chain;
    text += "|" + segment.t_start_token() + "|" + segment.t_end_token();
    for (const auto& axis : segment.coefficient_tokens()) {
      for (const auto& value : axis) text += "|" + value;
    }
    for (const auto& value : segment.position_error_tokens()) {
      text += "|x" + value;
    }
    for (const auto& value : segment.velocity_error_tokens()) {
      text += "|v" + value;
    }
    chain = sha256_hex(text);
  }
  return chain;
}

class ValidatedPopulationEvidence {
 public:
  struct Member {
    std::string path_id;
    std::string charge;
    std::string digest_before;  // history the step was generated from
    std::string digest_after;   // history the step published
  };

  [[nodiscard]] const std::string& coupling() const noexcept {
    return coupling_;
  }
  [[nodiscard]] const std::string& step_start() const noexcept {
    return step_start_;
  }
  [[nodiscard]] const std::string& step_end() const noexcept {
    return step_end_;
  }
  [[nodiscard]] const std::vector<Member>& members() const noexcept {
    return members_;
  }

  // Empty when `history`, with this identifier and charge, is the published
  // state of this evidence's population. Charges compare as given tokens.
  [[nodiscard]] std::string member_refusal(
      const std::string& path_id,
      const std::string& charge,
      const RetainedHistory& history) const {
    for (const auto& member : members_) {
      if (member.path_id != path_id) continue;
      if (member.charge != charge) return "charge differs for " + path_id;
      if (member.digest_after != validated_history_digest(history)) {
        return "history content differs for " + path_id;
      }
      return {};
    }
    return "path " + path_id + " is not in the evidenced population";
  }

 private:
  friend class ::vfs::Producer;
  ValidatedPopulationEvidence(
      std::string coupling, std::string step_start, std::string step_end,
      std::vector<Member> members)
      : coupling_(std::move(coupling)),
        step_start_(std::move(step_start)),
        step_end_(std::move(step_end)),
        members_(std::move(members)) {}

  std::string coupling_;
  std::string step_start_;
  std::string step_end_;
  std::vector<Member> members_;
};

}  // namespace architrino::eom
