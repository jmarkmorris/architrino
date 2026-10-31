#!/bin/bash
# Read-only content/path/type verification. ACLs, xattrs and timestamps are not compared.
# Usage: bash verify-documents-backup.sh [source-dir [backup-dir [log-root]]]
# Script exit: 0=PASS, 1=DIFFERENCES/REVIEW, 2=ERROR. Raw rsync status is saved separately.
set -u
umask 077

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)" || exit 2
repo_root="$(cd "$script_dir/../.." && pwd)" || exit 2
source_dir="${1:-$HOME/Documents}"
backup_dir="${2:-/Volumes/Manual Backup/2026-10-25/Documents}"
log_root="${3:-$repo_root/.local-data/aaa-operations/backup-diagnostics/documents-verification}"
rsync_bin=/opt/homebrew/bin/rsync

if ! mkdir -p "$log_root"; then
  printf 'Cannot create log directory: %s\n' "$log_root" >&2
  exit 2
fi
run_dir="$(mktemp -d "$log_root/run-$(date -u +%Y%m%dT%H%M%SZ).XXXXXX")" || exit 2
stdout_log="$run_dir/stdout.log"
stderr_log="$run_dir/stderr.log"
status_file="$run_dir/rsync-exit-status.txt"
summary_file="$run_dir/summary.txt"
started_at="$(TZ=America/New_York date '+%Y-%m-%d %H:%M:%S %Z')"
: > "$stdout_log"
: > "$stderr_log"

interrupted() {
  printf 'not-recorded\n' > "$status_file"
  printf 'Result: INTERRUPTED\nSignal status: %s\nLogs: %s\n' "$1" "$run_dir" > "$summary_file"
  cat "$summary_file"
  exit 2
}
trap 'interrupted 130' INT
trap 'interrupted 143' TERM

printf 'Documents verification is read-only.\nLogs: %s\nChecking file contents; details are written to the logs.\n' "$run_dir"

preflight_status=0
if [ ! -x "$rsync_bin" ]; then
  printf 'Required maintained rsync is unavailable: %s\n' "$rsync_bin" >> "$stderr_log"
  preflight_status=127
elif [ ! -d "$source_dir" ] || [ ! -d "$backup_dir" ]; then
  printf 'Both directories must already exist.\nSource: %s\nBackup: %s\n' "$source_dir" "$backup_dir" >> "$stderr_log"
  preflight_status=66
else
  if ! source_real="$(cd "$source_dir" 2>> "$stderr_log" && pwd -P)" || ! backup_real="$(cd "$backup_dir" 2>> "$stderr_log" && pwd -P)"; then
    printf 'Cannot access a verification directory.\n' >> "$stderr_log"
    preflight_status=66
  elif [ "$source_real" = "$backup_real" ] || [[ "$backup_real" == "$source_real/"* ]] || [[ "$source_real" == "$backup_real/"* ]]; then
    printf 'Source and backup must be separate, non-nested directories.\n' >> "$stderr_log"
    preflight_status=64
  else
    source_dir="$source_real"
    backup_dir="$backup_real"
    run_real="$(cd "$run_dir" && pwd -P)"
    if [[ "$run_real" == "$source_dir/"* ]] || [[ "$run_real" == "$backup_dir/"* ]]; then
      printf 'Verification logs must be outside both compared directories.\n' >> "$stderr_log"
      preflight_status=64
    fi
  fi
fi

if [ "$preflight_status" -ne 0 ]; then
  rsync_status=not-run
  command_status="$preflight_status"
else
  command_args=("$rsync_bin" -rlDc --dry-run --itemize-changes --delete -- "$source_dir/" "$backup_dir/")
  {
    printf 'Started: %s\nSource: %s\nBackup: %s\nCommand: ' "$started_at" "$source_dir" "$backup_dir"
    printf '%q ' /usr/bin/caffeinate -i "${command_args[@]}"
    printf '\n'
    "$rsync_bin" --version
  } > "$run_dir/run-info.txt" 2>> "$stderr_log"
  /usr/bin/caffeinate -i "${command_args[@]}" > "$stdout_log" 2>> "$stderr_log"
  rsync_status=$?
  command_status="$rsync_status"
fi
printf '%s\n' "$rsync_status" > "$status_file"

script_status=0
if [ "$command_status" -ne 0 ]; then
  result=ERROR
  script_status=2
elif [ -s "$stderr_log" ]; then
  result=REVIEW
  script_status=1
elif [ -s "$stdout_log" ]; then
  result=DIFFERENCES
  script_status=1
else
  result=PASS
fi
{
  printf 'Result: %s\nRsync exit status: %s\nScript exit status: %s\n' "$result" "$rsync_status" "$script_status"
  printf 'Preflight exit status: %s\n' "$preflight_status"
  printf 'Scope: regular-file contents, names, symlink targets and special-file types.\n'
  printf 'Not compared: ACLs, extended attributes, timestamps or hard-link topology.\n'
  printf 'Source: %s\nBackup: %s\nStarted: %s\n' "$source_dir" "$backup_dir" "$started_at"
  printf 'Finished: %s\n' "$(TZ=America/New_York date '+%Y-%m-%d %H:%M:%S %Z')"
  printf 'Output lines: %s\n' "$(wc -l < "$stdout_log" | tr -d ' ')"
  printf 'Logs: %s\n' "$run_dir"
} > "$summary_file"
cat "$summary_file"
exit "$script_status"
