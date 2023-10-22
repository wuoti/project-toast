import React from "react";

import Button from "../Button";

import { useToasts } from "../ToastProvider";
import ToastShelf from "../ToastShelf";
import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const { addToast } = useToasts();
  const [{ message, variant }, setFormData] = React.useState({
    message: "",
    variant: "notice",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const messageToSend = message;
    setFormData({ message: "", variant });
    if (!messageToSend.trim().length) {
      return;
    }

    addToast({ message: messageToSend, variant });
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf />
      <form className={styles.controlsWrapper} onSubmit={onSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              required
              className={styles.messageInput}
              value={message}
              onChange={({ target: { value } }) =>
                setFormData((oldFormData) => ({
                  ...oldFormData,
                  message: value,
                }))
              }
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          {VARIANT_OPTIONS.map((option) => {
            const id = `variant-${option}`;

            return (
              <div
                key={id}
                className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              >
                <label htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={variant === option}
                    onChange={({ target: { value } }) =>
                      setFormData((oldFormData) => ({
                        ...oldFormData,
                        variant: value,
                      }))
                    }
                  />
                  {option}
                </label>
              </div>
            );
          })}
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
