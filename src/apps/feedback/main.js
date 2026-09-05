import { renderPublicFeedbackApp } from "./FeedbackManifestRuntime.js";
import { createStandaloneAppNavigationRuntime } from "../navigator/StandaloneAppNavigationRuntime.js";
import {
  navigateStandaloneAppHome,
  resolveStandaloneSiteHomeHref,
} from "../navigator/StandaloneAppHomeRuntime.js";

renderPublicFeedbackApp();

createStandaloneAppNavigationRuntime({
  host: document.getElementById("feedback-navigation"),
  label: "Feedback navigation",
  home: {
    label: "Go to home page",
    title: "Home",
    onActivate: () => navigateStandaloneAppHome(
      window.location,
      resolveStandaloneSiteHomeHref(window.location.href),
    ),
  },
}).init();
