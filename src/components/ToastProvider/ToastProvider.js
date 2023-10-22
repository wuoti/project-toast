import React from "react";

const ToastContext = React.createContext();

export const useToasts = () => {
  const value = React.useContext(ToastContext);

  if (!value) {
    throw new Error("useToasts must be used within ToastProvider");
  }

  return value;
};

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(
    ({ message, variant }) =>
      setToasts((oldToasts) => [
        ...oldToasts,
        {
          id: crypto.randomUUID(),
          message,
          variant,
        },
      ]),
    []
  );

  const dismissToast = React.useCallback(
    (idToDismiss) =>
      setToasts((oldToasts) =>
        oldToasts.filter(({ id }) => id !== idToDismiss)
      ),
    []
  );

  const clearAllToasts = React.useCallback(() => setToasts([]), []);

  const value = React.useMemo(
    () => ({
      toasts,
      addToast,
      dismissToast,
      clearAllToasts,
    }),
    [addToast, clearAllToasts, dismissToast, toasts]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
