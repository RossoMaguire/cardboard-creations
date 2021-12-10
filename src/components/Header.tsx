/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "scss/components/Header.module.scss";
import Link from "next/link";
import { client, MenuLocationEnum } from "client";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartContext } from "./common/CartContext";
import { Badge } from "@mui/material";
import Announcement from "./Announcement";

interface Props {
  description?: string;
}

function Header({ description }: Props): JSX.Element {
  const { cartCount } = useCartContext();

  const { menuItems } = client.useQuery();
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;

  const shrinkHeader = (e) => {
    const header = document.querySelector("#header");
    const logo = document.querySelector("#logo");

    const scrollTop = window.scrollY;
    if (scrollTop >= 100) {
      header.classList.add("shrink-header");
      logo.classList.add("shrink-logo");
    } else {
      header.classList.remove("shrink-header");
      logo.classList.remove("shrink-logo");
    }
  };

  // Sticky Menu
  React.useEffect(() => {
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  });

  return (
    <header id="header" className="sticky">
      <Announcement message="Wordlwide delivery available" />
      <div className={styles.wrap}>
        <Link href="/" passHref>
          <div className={styles["logo-wrap"]}>
            <img
              id="logo"
              className="logo"
              src="/images/cardboard-creations-logo.webp"
              alt="CC Logo"
            />
          </div>
        </Link>
        {description && <p className={styles.description}>{description}</p>}
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
            <li>
              <Link href="/shop/cart" passHref>
                <Badge
                  badgeContent={cartCount}
                  color="primary"
                  style={{ cursor: "pointer" }}
                >
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
