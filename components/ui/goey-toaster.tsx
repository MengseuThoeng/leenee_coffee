"use client";

import { GoeyToaster as Toaster } from "goey-toast";
import "goey-toast/styles.css";

export function GoeyToaster() {
  return <Toaster position="bottom-right" />;
}

export { goeyToast } from "goey-toast";
