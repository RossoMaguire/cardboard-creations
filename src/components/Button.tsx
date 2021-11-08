import React from "react";
import styles from "scss/components/Button.module.scss";

interface IButtonProps {
  buttonURL: string;
  buttonText: string;
}

function Button({ buttonURL, buttonText }: IButtonProps) {
  return (
    <div className={styles["button-wrap"]}>
      <a href={buttonURL} className="button">
        {buttonText}
      </a>
    </div>
  );
}

export default Button;
