import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { getRobots, Robot } from '../database/robots';

type Cookie = { id: number; inCart: number };

type Props = {
  robots: Robot[];
  cookie?: Cookie[];
  setCookie?: Dispatch<SetStateAction<Cookie[]>>;
};

export default function ShoppingCart(props: Props) {
  const chosenRobotsCookies = props.cookie;

  if (!props.robots || !chosenRobotsCookies) {
    return <div>Nothing here yet!</div>;
  }

  const chosenRobotsList = props.robots.filter((robot) => {
    return chosenRobotsCookies?.some((cookie) => {
      return cookie.id === robot.id && cookie.inCart > 0;
    });
  });

  if (!props.robots || !chosenRobotsCookies) {
    return <div>Nothing here yet!</div>;
  }

  const allPrices = chosenRobotsList.map((robot) => {
    const singleRobotCookieObject = props.cookie?.find((singleRobot) => {
      return singleRobot.id === robot.id;
    });
    if (!singleRobotCookieObject) {
      return;
    }
    return Number(robot.price) * singleRobotCookieObject.inCart;
  });

  const totalPrice = allPrices?.reduce((prevPrice, currPrice) => {
    if (!currPrice || !prevPrice) {
      return;
    }
    return currPrice + prevPrice;
  }, 0);

  return (
    <>
      <Head>
        <title>Your Shopping Cart</title>
        <meta name="description" content="Find your chosen products here" />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">Your Shopping Cart</h1>

      <div className="flex flex-col relative items-center">
        {chosenRobotsList.map((robot) => {
          const singleRobotCookieObject = props.cookie?.find((singleRobot) => {
            return singleRobot.id === robot.id;
          });

          if (!singleRobotCookieObject) {
            return;
          }

          const priceForRobotAmount =
            Number(robot.price) * singleRobotCookieObject.inCart;

          return (
            <div
              key={robot.id}
              data-test-id={`cart-product-${robot.id}`}
              className="inline-flex relative w-1/2 border border-2 border-solid rounded-lg px-2 py-3 mb-5"
            >
              <div className="flex mr-4 mb-0">
                <Link href={`/robots/${robot.id}`}>
                  <Image
                    src={`/${robot.id}-${robot.name}.png`}
                    className="hover:cursor-pointer object-cover"
                    alt=""
                    width="150"
                    height="150"
                  />
                </Link>
              </div>

              <div className="font-noto mr-2 py-2 pl-3">
                <Link href={`/robots/${robot.id}`}>
                  <h2 className="text-xl font-bold font-fredoka hover:cursor-pointer">
                    {robot.name}
                  </h2>
                </Link>
                <div className="text-xs">Id: {robot.id}</div>
                <div className=" pt-2">Type: {robot.type}</div>

                {/* Updating Cookie Info  */}
                <div>
                  <p className="font-bold pt-2">Change quantity</p>

                  <button
                    // Minus Button
                    onClick={() => {
                      if (singleRobotCookieObject.inCart > 0) {
                        const newState: Cookie[] = [...props.cookie];
                        singleRobotCookieObject.inCart--;
                        props.setCookie?.(newState);
                      } else if (singleRobotCookieObject.inCart < 0) {
                        const newState: Cookie[] = [...props.cookie];
                        singleRobotCookieObject.inCart = 0;
                        props.setCookie?.(newState);
                      }
                    }}
                    className="inline-block px-3 py-1 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    -
                  </button>

                  {/* Show value of inCart */}
                  <span
                    data-test-id={`cart-product-quantity-${robot.id}`}
                    className="inline-block px-3 py-1 font-medium text-xs leading-tight uppercase rounded shadow-md"
                  >
                    {singleRobotCookieObject
                      ? singleRobotCookieObject.inCart
                      : 0}
                  </span>

                  <button
                    // Plus Button
                    onClick={() => {
                      const newState: Cookie[] = [...props.cookie];
                      singleRobotCookieObject.inCart++;
                      props.setCookie?.(newState);
                    }}
                    className="inline-block px-3 py-1 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    +
                  </button>
                  <button
                    data-test-id={`cart-product-remove-${robot.id}`}
                    onClick={() => {
                      const newState: Cookie[] = [...props.cookie];
                      singleRobotCookieObject.inCart = 0;
                      props.setCookie?.(newState);
                      console.log(newState);
                    }}
                    className="inline-block px-2 ml-3 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="font-noto absolute bottom-5 right-10">
                Price: {priceForRobotAmount} €
              </div>
            </div>
          );
        })}

        <div className=" relative w-1/2 border border-2 border-solid rounded-lg px-2 py-2 mb-5">
          <div className="text-white">Your Total</div>
          <div className="font-noto font-bold absolute bottom-2 top-2 right-10">
            Total: <span data-test-id="cart-total">{totalPrice}</span> €
          </div>
        </div>

        <Link href="/checkout">
          <a
            data-test-id="cart-checkout"
            className="flex items-end px-3 py-1 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
          >
            Checkout
          </a>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps(): Promise<
  import('next').GetServerSidePropsResult<Props>
> {
  const robots = await getRobots();
  return {
    props: {
      robots: robots,
    },
  };
}
