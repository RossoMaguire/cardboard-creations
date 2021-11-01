import React from "react";
import styles from "scss/components/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { client, MenuLocationEnum } from "client";

interface Props {
  title?: string;
  description?: string;
}

function Header({ title, description }: Props): JSX.Element {
  const { menuItems } = client.useQuery();
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;
  const logo = "/images/cardboard-creations-logo.webp";

  return (
    <header>
      <div className={styles.wrap}>
        <div className={styles["title-wrap"]}>
          {title ? (
            <p className={styles["site-title"]}>
              <Link href="/">
                <a>{title}</a>
              </Link>
            </p>
          ) : (
            <div className={styles["logo-wrap"]}>
              <Image
                src={logo}
                layout="responsive"
                alt="Cardboard Creations Logo"
                height={100}
                width={100}
              />
            </div>
          )}
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.menu}>
          <ul>
            {links?.map((link) => (
              <li key={`${link.label}$-menu`}>
                <Link href={link.url ?? ""}>
                  <a href={link.url}>{link.label}</a>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop">
                <a className="button" href="/shop">
                  Shop Now
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
