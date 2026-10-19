import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-black">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-black dark:text-white"
        >
          AUTHDAS
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-black dark:text-white transition-opacity hover:opacity-60"
          >
            Home
          </Link>

          <Link
            href="/About"
            className="text-sm font-medium text-black dark:text-white transition-opacity hover:opacity-60"
          >
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/Register"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900"
          >
            Register
          </Link>

          <Link
            href="/Login"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-black"
          >
            Login
          </Link>
        </div>

      </nav>
    </header>
  );
}