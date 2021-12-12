import Heading, { HeadingProps } from "./Heading";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import styles from "scss/components/CTA.module.scss";

interface Props {
  title: string;
  children?: React.ReactNode;
  headingLevel?: HeadingProps["level"];
}

function CTA({ title, children, headingLevel = "h1" }: Props): JSX.Element {
  return (
    <section className={styles.cta}>
      <div className={styles.wrap}>
        <Heading level={headingLevel} className={styles.title}>
          {title}
        </Heading>
        <div className={styles.intro}>
          <div className={styles.children}>{children}</div>
          <InstagramIcon fontSize="large" />
          <FacebookIcon fontSize="large" />
          <TwitterIcon fontSize="large" />
        </div>
      </div>
    </section>
  );
}

export default CTA;
