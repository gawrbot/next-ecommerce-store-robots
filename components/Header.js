import Link from 'next/link';

export default function Header(props) {
  const robotsInCart =
    props.cookie?.reduce((prevRobot, currRobot) => {
      return currRobot.inCart + prevRobot;
    }, 0) || 0;

  return (
    <header className="sticky top-0 w-full font-fredoka z-10">
      <nav className="shadow-md py-7 px-10 bg-white relative flex items-center space-around font-bold">
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
            data-test-id="products-link"
            href="/robots"
            className="text-gray-600 hover:text-gray-700 transition duration-150 ease-in-out"
          >
            Our Robots
          </Link>
        </div>
        <div className="absolute right-12 top-5 w-10 h-10 hover:cursor-pointer">
          <Link href="/shopping-cart">
            <img alt="robot icon" src="/robot-icon-c-freepik.png" />
          </Link>
        </div>
        <div className="absolute right-9 top-9 flex items-center justify-center rounded-full px-2 py-2 bg-indigo-500/[.85] text-white hover:cursor-pointer w-8 h-8">
          <Link data-test-id="cart-link" href="/shopping-cart">
            <span data-test-id="cart-count">{robotsInCart}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
