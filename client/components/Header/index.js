import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";
function Header() {
  return (
    <div className={styles.header_container}>
      <div className={styles.brand_title}>Memorymap</div>
      <div className="navbar-links">
        <ul>
          <li>
            <Link href="/s">Enter map</Link>
          </li>
          <li>
            <Link href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fmemorymap.dev%2Fapi%2Fusers%2Fgoogle%2Fcallback&client_id=573267777115-176069s8o4ghodq0qmo541otoqv1nv83.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email">
              google
            </Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
