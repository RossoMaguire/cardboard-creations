import Link from "next/link";
import React from "react";
import styles from "scss/components/Button.module.scss";

interface IButtonProps {
  buttonURL?: string;
  buttonText: string;
  dataTestId?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
}

function Button({
  buttonURL,
  buttonText,
  dataTestId,
  handleClick,
  disabled = false,
}: IButtonProps) {
  return (
    <div
      className={
        disabled ? styles["button-wrap-disabled"] : styles["button-wrap"]
      }
      data-testid={dataTestId}
      onClick={handleClick}
    >
      {buttonURL ? (
        <Link href={buttonURL} passHref>
          <span className="button">{buttonText}</span>
        </Link>
      ) : (
        <span className={disabled ? "disabled-button" : "button"}>
          {buttonText}
        </span>
      )}
    </div>
  );
}

export default Button;
