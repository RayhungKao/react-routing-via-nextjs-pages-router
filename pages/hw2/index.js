import Link from "next/link";

export default function HW2() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/hw2/component-add-remove">component-add-remove</Link>
          </li>
          <li>
            <Link href="/hw2/component-drag-drop">component-drag-drop</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
