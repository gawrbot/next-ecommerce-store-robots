import Link from 'next/link';

export default function Header(props) {
  const robotsInCart = props.cookie?.reduce((prevRobot, currRobot) => {
    return currRobot.inCart + prevRobot;
  }, 0);

  return (
    <header className="sticky top-0 w-full font-fredoka text-black z-10">
      <nav className="shadow-md py-7 px-10 bg-white relative flex items-center space-around font-bold">
        <div className="relative mr-10">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-700 transition duration-150 ease-in-out"
          >
            Home
          </Link>
        </div>
        <Link
          href="/robots"
          className="text-gray-600 hover:text-gray-700 transition duration-150 ease-in-out"
        >
          <a data-test-id="products-link">
            <div className="relative">Our Robots </div>
          </a>
        </Link>
        <Link href="/shopping-cart">
          <a data-test-id="cart-link">
            <div className="absolute right-12 top-5 w-10 h-10 hover:cursor-pointer">
              <img alt="robot icon" src="/robot (1).png" />
            </div>
            <div className="absolute right-9 top-9 flex items-center justify-center rounded-full px-2 py-2 bg-pink-600/[.85] text-white hover:cursor-pointer w-8 h-8">
              <span data-test-id="cart-count">
                {robotsInCart > 0 ? robotsInCart : 0}
              </span>
            </div>
          </a>
        </Link>
      </nav>
    </header>
  );
}
