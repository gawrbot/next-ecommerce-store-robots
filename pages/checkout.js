import Head from 'next/head';
import Link from 'next/link';
import { robotList } from '../database/robots';

export default function Checkout(props) {
  const chosenRobotsCookies = props.cookie;

  const chosenRobotsList = props.robots.filter((robot) => {
    return chosenRobotsCookies?.some((cookie) => {
      return cookie.id === robot.id && cookie.inCart > 0;
    });
  });

  // How to get access to priceForSingleRobotInCart and add them together??
  const allPrices = chosenRobotsList.map((robot) => {
    const singleRobotCookieObject = props.cookie.find((singleRobot) => {
      return singleRobot.id === robot.id;
    });
    return Number(robot.price) * singleRobotCookieObject.inCart;
  });

  const totalPrice = allPrices?.reduce((prevPrice, currPrice) => {
    return currPrice + prevPrice;
  }, 0);

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Confirm your order here" />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">Checkout</h1>
      <div className="flex flex-col items-center">
        <h2>Order Overview</h2>
        {chosenRobotsList.map((robot) => {
          const singleRobotCookieObject = props.cookie.find((singleRobot) => {
            return singleRobot.id === robot.id;
          });

          const priceForRobotAmount =
            Number(robot.price) * singleRobotCookieObject.inCart;

          return (
            <div
              key={robot.id}
              data-test-id={`cart-product-${robot.id}`}
              className="inline-flex relative w-1/2 border border-2 border-solid rounded-lg px-2 py-3 mb-5"
            >
              <div className="font-noto mr-2 py-2 pl-3">
                <Link href={`/robots/${robot.id}`}>
                  <h2 className="text-xl font-bold font-fredoka hover:cursor-pointer">
                    {robot.name}
                  </h2>
                </Link>
                <div className="text-xs">Id: {robot.id}</div>

                {/* Show value of inCart */}
              </div>

              <div className="font-noto absolute bottom-5 right-10">
                Price: {priceForRobotAmount} €
              </div>
            </div>
          );
        })}
        <div className="inline-flex w-1/2 relative px-2 py-2 mb-5">
          <div className="text-white">Your Total</div>
          <div className="font-noto font-bold absolute bottom-2 top-2 right-10">
            Total: <span data-test-id="cart-total">{totalPrice}</span> €
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2>Shipping Address</h2>
        <div className="inline-flex relative w-1/2 border border-2 border-solid rounded-lg px-2 py-3 mb-5">
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label>
              First name
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={() => {}}
              />
            </label>
            <label>
              Last name
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={() => {}}
              />
            </label>
            <label>
              E-Mail
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={() => {}}
              />
            </label>
            <label>
              Address
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={() => {}}
              />
            </label>
            <label>
              Postal Code
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={() => {}}
              />
            </label>
            <label>
              City
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={() => {}}
              />
            </label>
            <label>
              Country
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={() => {}}
              />
            </label>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2>Payment Info</h2>
        <div className="inline-flex relative w-1/2 border border-2 border-solid rounded-lg px-2 py-3 mb-5">
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label>
              Credit Card
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={(event) => {}}
              />
            </label>
            <label>
              Expiration Date
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={(event) => {}}
              />
            </label>
            <label>
              Security Code{' '}
              <input
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                onChange={(event) => {}}
              />
            </label>
          </form>
        </div>
        <Link href="/thankyou">
          <button
            onClick={() => {
              const newState = [];
              props.setCookie(newState);
            }}
            className="flex items-end px-3 py-1 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
          >
            Confirm Order
          </button>
        </Link>
      </div>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: {
      robots: robotList,
    },
  };
}
