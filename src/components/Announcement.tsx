import React from "react";
import styles from "scss/components/Announcement.module.scss";

interface IAnnouncementProps {
  message: string;
}

function Announcement({ message }: IAnnouncementProps) {
  const [display, setDisplay] = React.useState("block");
  const hideAnnouncement = (e) => {
    const announcement = document.querySelector("#announcement");

    const scrollTop = window.scrollY;
    if (scrollTop >= 100) {
      setDisplay("none");
    } else {
      setDisplay("block");
    }
  };

  // Sticky Menu
  React.useEffect(() => {
    window.addEventListener("scroll", hideAnnouncement);
    return () => {
      window.removeEventListener("scroll", hideAnnouncement);
    };
  });

  return (
    <div
      id="announcement"
      className={styles.announcement}
      style={{ display: display }}
    >
      <span className={styles.message}>{message}</span>
    </div>
  );
}

export default Announcement;
