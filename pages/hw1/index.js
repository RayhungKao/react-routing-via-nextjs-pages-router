import Link from "next/link";

export default function HW1() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/hw1/welcome">welcome</Link>
          </li>
          <li>
            <Link href="/hw1/welcome-limit-input">welcome-limit-input</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
