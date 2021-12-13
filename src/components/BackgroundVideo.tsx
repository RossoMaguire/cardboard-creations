import React from "react";
import styles from "scss/components/VideoBackground.module.scss";

interface IBackgroundVideoProps {
  source: string;
  children?: React.ReactNode;
  blur?: string;
}

const BackgroundVideo = ({ source, children }: IBackgroundVideoProps) => {
  return (
    <div className={styles.video_background}>
      <video
        autoPlay
        loop
        muted
        id="video-id"
        className="video"
        data-testid="background-vid"
      >
        <source src={`${source}#t=5`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {children}
    </div>
  );
};

export default BackgroundVideo;
