import Link from "next/link";
import styles from "../styles/layout.module.scss";

const Layout = ({ children }) => (
  <>
    <div className={styles.layoutContainer}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
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
          <li>
            <Link href="/data-fetching-getStaticProps">
              Data Fetching Practice via getStaticProps
            </Link>
          </li>
          <li>
            <Link href="/data-fetching-getServerSideProps">
              Data Fetching Practice via getServerSideProps
            </Link>
          </li>
          <li>
            <Link href="/data-fetching-client-side">
              Data Fetching Practice via client side
            </Link>
          </li>
          <li>
            <Link href="/data-fetching-client-side-swr">
              Data Fetching Practice via client side SWR
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    {children}
  </>
);

export default Layout;
