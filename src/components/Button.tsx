import React from "react";
import styles from "scss/components/Button.module.scss";

interface IButtonProps {
  buttonURL?: string;
  buttonText: string;
  dataTestId?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

function Button({
  buttonURL,
  buttonText,
  dataTestId,
  handleClick,
}: IButtonProps) {
  return (
    <div
      className={styles["button-wrap"]}
      data-testid={dataTestId}
      onClick={handleClick}
    >
      <a href={buttonURL} className="button">
        {buttonText}
      </a>
    </div>
  );
}

export default Button;
