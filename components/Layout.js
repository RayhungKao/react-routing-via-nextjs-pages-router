import Link from "next/link";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => (
  <>
    <div className={styles.layoutContainer}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/hw1">hw1</Link>
          </li>
          <li>
            <Link href="/hw2">hw2</Link>
          </li>
          <li>
            <Link href="/hw3">hw3</Link>
          </li>
          <li>
            <Link href="/hw4">hw4</Link>
          </li>
          <li>
            <Link href="/hw5">hw5</Link>
          </li>
        </ul>
      </nav>
    </div>
    {children}
  </>
);

export default Layout;
