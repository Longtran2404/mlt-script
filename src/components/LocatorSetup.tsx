import { useEffect } from "react";

export default function LocatorSetup() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@locator/runtime")
        .then((module) => {
          const setupLocatorUI = module.default || (module as any).setupLocatorUI;
          if (setupLocatorUI && typeof setupLocatorUI === 'function') {
            setupLocatorUI({
              targets: { cursor: "cursor" }, // hoặc 'vscode', 'vscode-insiders'
            });
          }
          // console.log("🔍 LocatorJS initialized successfully!");
        })
        .catch((error) => {
          // console.warn("Failed to initialize LocatorJS:", error);
        });
    }
  }, []);

  return null;
}
