import React from "react";
import styles from "scss/components/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { client, MenuLocationEnum } from "client";
import Button from "./Button";

interface Props {
  title?: string;
  description?: string;
}

function Header({ title, description }: Props): JSX.Element {
  const [showCart, setShowCart] = React.useState(false); // we can change this if items are added to cart

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
            <Link href="/" passHref>
              <div className={styles["logo-wrap"]}>
                <Image
                  src={logo}
                  layout="responsive"
                  alt="Cardboard Creations Logo"
                  height={100}
                  width={100}
                />
              </div>
            </Link>
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
            <li key="Shop$-menu">
              <Link href="/shop">Shop</Link>
            </li>
            <li key="FAQ$-menu">
              <Link href="/faqs">FAQs</Link>
            </li>
            <li key="Videos$-menu">
              <Link href="/assembly-videos">Assembly Videos</Link>
            </li>
            <li key="Contact$-menu">
              <Link href="/contact">Contact</Link>
            </li>
            {showCart && (
              <li>
                <Button buttonText="Cart" buttonURL="/cart" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
