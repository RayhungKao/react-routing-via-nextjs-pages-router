import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <div>
        <nav>
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
    </div>
  );
}
