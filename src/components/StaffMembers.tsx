import React from "react";
import { client } from "../client";
import styles from "scss/components/StaffMembers.module.scss";

function StaffMembers() {
  const { useQuery } = client;
  const staffMembers = useQuery().staffMembers()?.nodes;

  return (
    <div className={styles.staffMembers}>
      {staffMembers.map((staffMember, index) => {
        return (
          <div key={`staff-member-${index}`} className={styles.staffMember}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={staffMember.profileImage.mediaItemUrl}
              alt={staffMember.profileImage.altText}
              data-testid="staff-member"
            />
            <div className={styles.details}>
              <h3>{staffMember.jobTitle}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: staffMember.description }}
              />
              <div
                className={styles.links}
                dangerouslySetInnerHTML={{ __html: staffMember.links }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StaffMembers;
