import Image from "next/image";
import Link from "next/link";

export default function PageHeader() {
  return (
    <Link href="/" className="sticky bg-sky-50 p-4 flex rounded-full">
      <h1 className="font-bold text-2xl px-4">Snippets</h1>
      <Image
        src="/snippets-logo.png"
        alt="Logo"
        width={50}
        height={50}
      />
    </Link>
  );
}