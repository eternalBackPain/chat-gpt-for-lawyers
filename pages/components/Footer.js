import React from "react";
import styles from "../index.module.css"

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright {currentYear} John Naoom. All rights reserved.</p>
      <div className={styles.socials}>
        <a href="https://www.linkedin.com/in/john-naoom-7593a517b/">
            LinkedIn
        </a>
            |    
        <a href="https://github.com/eternalBackPain">
            Github
        </a>
      </div>
    </footer>
  );
}

export default Footer;
