import {
  createEomRecordedPlaybackHandoff,
} from "../shared/EomRecordedPlaybackHandoff.mjs";

// Borg may package an accepted, completed EOM record for Animator playback.
// This adapter grants no solve authority and does not transform the record.
export async function createBorgRecordedPlaybackHandoff(record, options = {}) {
  return createEomRecordedPlaybackHandoff(record, options);
}
