import React from "react";
import styles from "scss/components/VideoBackGround.module.scss";

interface IBackgroundVideoProps {
  source: string;
  children?: React.ReactNode;
  blur?: string;
}

const BackgroundVideo = ({ source, children, blur }: IBackgroundVideoProps) => {
  return (
    <div className={styles.video_background}>
      <video autoPlay loop muted id="video-id" className="video">
        <source src={source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {children}
    </div>
  );
};

export default BackgroundVideo;
