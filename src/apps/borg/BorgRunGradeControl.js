export const BORG_DISPLAY_RUN_GRADE = "display";
export const BORG_CERTIFIED_RUN_GRADE = "certified";

const RUN_GRADE_LABELS = Object.freeze({
  [BORG_DISPLAY_RUN_GRADE]: "Continue through close encounters (display grade)",
  [BORG_CERTIFIED_RUN_GRADE]: "Stop at uncertified encounters (certified grade)",
});

export function createBorgRunGradeControl({
  button,
  initialGrade = BORG_DISPLAY_RUN_GRADE,
  onChange = () => {},
} = {}) {
  if (!button || typeof onChange !== "function") {
    throw new Error("Borg run-grade control requires a button and change handler.");
  }
  let grade = requireRunGrade(initialGrade);

  function syncPresentation() {
    const label = RUN_GRADE_LABELS[grade];
    button.textContent = label;
    button.title = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", String(grade === BORG_CERTIFIED_RUN_GRADE));
    button.dataset.runGrade = grade;
  }

  function setGrade(nextGrade, { notify = true } = {}) {
    const validated = requireRunGrade(nextGrade);
    const changed = validated !== grade;
    grade = validated;
    syncPresentation();
    if (changed && notify) {
      onChange(grade);
    }
    return grade;
  }

  function toggle() {
    return setGrade(
      grade === BORG_DISPLAY_RUN_GRADE
        ? BORG_CERTIFIED_RUN_GRADE
        : BORG_DISPLAY_RUN_GRADE,
    );
  }

  function dispose() {
    button.removeEventListener("click", toggle);
  }

  button.addEventListener("click", toggle);
  syncPresentation();

  return Object.freeze({
    getGrade: () => grade,
    setGrade,
    toggle,
    dispose,
  });
}

function requireRunGrade(value) {
  if (value !== BORG_DISPLAY_RUN_GRADE && value !== BORG_CERTIFIED_RUN_GRADE) {
    throw new TypeError("Borg run grade must be display or certified.");
  }
  return value;
}
