import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link
        href="/users"
        className="rounded-md bg-teal-600 px-4 py-2 text-lg font-semibold text-white hover:bg-teal-700"
      >
        Go to Users
      </Link>
    </div>
  );
}