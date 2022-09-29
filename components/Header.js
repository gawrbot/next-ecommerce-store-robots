import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 w-full font-fredoka z-10">
      <nav className="shadow-md py-5 px-10 bg-white relative flex items-center space-around font-bold">
        <div className="relative mr-10">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-700 transition duration-150 ease-in-out"
          >
            Home
          </Link>
        </div>
        <div className="relative">
          <Link
            href="/robots"
            className="text-gray-600 hover:text-gray-700 transition duration-150 ease-in-out"
          >
            Our Robots
          </Link>
        </div>
        <div className="absolute right-10 top-3 flex items-center justify-center rounded-full px-3 py-2 bg-indigo-500 text-white hover:cursor-pointer">
          <Link href="/shopping-cart">X items</Link>
        </div>
      </nav>
    </header>
  );
}
