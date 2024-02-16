import Link from "next/link";

export default function HW5() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/hw5/image-zoom">image-zoom</Link>
          </li>
          <li>
            <Link href="/hw5/image-zoom-advanced">image-zoom-advanced</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
