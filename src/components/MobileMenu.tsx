import { Badge } from "@mui/material";
import { client, MenuLocationEnum } from "client";
import Link from "next/link";
import styles from "scss/components/MobileMenu.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useCartContext } from "components";

const MobileMenu = () => {
  const { menuItems } = client.useQuery();
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;

  const { cartCount } = useCartContext();

  function toggleMenu() {
    var x = document.getElementById("mobileLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  return (
    <div className={styles.mobileMenu}>
      <div className={styles.linksContainer}>
        <ul id="mobileLinks" className={styles.menuLinks}>
          {links?.map((link) => (
            <li key={`${link.label}$-menu`} data-testid="menu-item">
              <Link href={link.url ?? ""}>
                <a href={link.url}>{link.label}</a>
              </Link>
            </li>
          ))}
          <li key="Shop$-menu" data-testid="menu-item">
            <Link href="/shop">Shop</Link>
          </li>
          <li key="FAQ$-menu" data-testid="menu-item">
            <Link href="/faqs">FAQs</Link>
          </li>
          <li key="Videos$-menu" data-testid="menu-item">
            <Link href="/assembly-videos">Assembly Videos</Link>
          </li>
          <li key="Contact$-menu" data-testid="menu-item">
            <Link href="/contact">Contact</Link>
          </li>
          <li key="Cart$-menu" data-testid="menu-item">
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
        <div className={styles.hamburger} onClick={() => toggleMenu()}>
          <MenuIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
