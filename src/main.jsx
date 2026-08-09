import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { MouseProvider } from "./motion/background/MouseProvider";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* reducedMotion="user" makes every animation in the motion system   */}
    {/* automatically respect prefers-reduced-motion at the framer level */}
    {/* as a second line of defense on top of our own useReducedMotion.  */}
    <MotionConfig reducedMotion="user">
      {/* Single shared mousemove listener for every section's           */}
      {/* mouse-reactive background lighting — see motion/background.    */}
      <MouseProvider>
        <App />
      </MouseProvider>
    </MotionConfig>
  </StrictMode>
);
