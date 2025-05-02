// components/Footer.js
import styles from "@styles/Footer.module.css";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGooglePlusG,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <a href="#">
          <FaFacebookF />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
        <a href="#">
          <FaTwitter />
        </a>
        <a href="#">
          <FaGooglePlusG />
        </a>
        <a href="#">
          <FaYoutube />
        </a>
      </div>

      <div className={styles.footerBottom}>
        <p>
          Copyright &copy;2022, Designed by <strong>SHIVAM</strong>
        </p>
      </div>
    </footer>
  );
}
