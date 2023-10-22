import React from "react";

const useEscapeKey = (cb) => {
  React.useEffect(() => {
    const onEscape = ({ code }) => {
      if (code === "Escape") {
        cb();
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => window.removeEventListener("keydown", onEscape);
  }, [cb]);
};

export default useEscapeKey;
