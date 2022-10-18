import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  if (
    typeof chosenRobotsCookies === 'undefined' ||
    chosenRobotsCookies.every((cookie) => {
      return cookie.inCart <= 0;
    })
  ) {
    return (
      <div>
        <Head>
          <title>Shopping cart empty</title>
          <meta name="description" content="Empty shopping Cart page" />
        </Head>
        <h1 className="text-5xl font-bold mt-0 mb-6">Shopping Cart</h1>
        <div>
          Nothing here yet - see the{' '}
          <span className="underline decoration-solid">
            <Link href="/robots" scroll={false}>
              all robots
            </Link>
          </span>{' '}
          page
        </div>
      </div>
    );
  }

  const chosenRobotsList = props.robots.filter((robot) => {
    return chosenRobotsCookies.some((cookie) => {
      return cookie?.id === robot.id && cookie.inCart > 0;
    });
  });

  // if (!props.robots || !chosenRobotsCookies) {
  //   return (
  //     <div>
  //       <h1 className="text-5xl font-bold mt-0 mb-6">Checkout</h1>
  //       <div>Nothing here yet!</div>
  //     </div>
  //   );
  // }

  const allPrices = chosenRobotsList.map((robot) => {
    const singleRobotCookieObject = props.cookie?.find((singleRobot) => {
      return singleRobot?.id === robot.id;
    });
    if (!singleRobotCookieObject) {
      return null;
    }
    return Number(robot.price) * singleRobotCookieObject.inCart;
  });

  const totalPrice = allPrices.reduce((prevPrice, currPrice) => {
    return Number(currPrice) + Number(prevPrice);
  }, 0);

  return (
    <>
      <Head>
        <title>Your Shopping Cart</title>
        <meta name="description" content="Shopping Cart page" />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">Your Shopping Cart</h1>

      {/* CHOSEN ROBOTS */}
      <div className="grid justify-items-start">
        {chosenRobotsList.map((robot) => {
          const singleRobotCookieObject = props.cookie?.find((singleRobot) => {
            return singleRobot?.id === robot.id;
          });
          if (!singleRobotCookieObject) {
            return null;
          }
          const priceForRobotAmount =
            Number(robot.price) * singleRobotCookieObject.inCart;
          return (
            <div
              key={robot.id}
              data-test-id={`cart-product-${robot.id}`}
              className="grid grid-cols-3 gap-3 p-4 rounded-lg shadow-lg border-solid border-2 mb-7"
            >
              <div>
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

              <div className="inline-grid font-noto py-2">
                <Link href={`/robots/${robot.id}`}>
                  <h2 className="text-xl font-bold font-fredoka hover:cursor-pointer">
                    {robot.name}
                  </h2>
                </Link>
                <div className="text-xs">Id: {robot.id}</div>

                {/* Updating Cookie Info  */}
                <div>
                  <button
                    // Minus Button
                    onClick={() => {
                      if (singleRobotCookieObject.inCart > 0) {
                        if (Array.isArray(props.cookie)) {
                          const newState: Cookie[] = [...props.cookie];
                          singleRobotCookieObject.inCart--;
                          return props.setCookie?.(newState);
                        }
                      } else if (singleRobotCookieObject.inCart < 0) {
                        if (Array.isArray(props.cookie)) {
                          const newState: Cookie[] = [...props.cookie];
                          singleRobotCookieObject.inCart = 0;
                          props.setCookie?.(newState);
                        }
                      }
                    }}
                    className="inline-block px-3 py-1 bg-pink-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
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
                      if (Array.isArray(props.cookie)) {
                        const newState: Cookie[] = [...props.cookie];
                        singleRobotCookieObject.inCart++;
                        props.setCookie?.(newState);
                      }
                    }}
                    className="inline-block px-3 py-1 bg-pink-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    data-test-id={`cart-product-remove-${robot.id}`}
                    onClick={() => {
                      if (Array.isArray(props.cookie)) {
                        const newState: Cookie[] = [...props.cookie];
                        singleRobotCookieObject.inCart = 0;
                        props.setCookie?.(newState);
                        console.log(newState);
                      }
                    }}
                    className="inline-grid items-end font-fredoka px-2 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="font-noto inline-grid py-2">
                Price: {priceForRobotAmount} €
              </div>
            </div>
          );
        })}

        {/* TOTAL */}
        <div className="p-6 rounded-lg shadow-lg border-solid border-2 mb-10">
          <div>
            Total: <span data-test-id="cart-total">{totalPrice}</span> €
          </div>

          {/* CHECKOUT */}
          <button
            onClick={() => {
              router.push('/checkout').catch(() => {});
            }}
            className="bg-green-700 font-medium text-white text-xs p-3 leading-tight uppercase rounded shadow-md hover:bg-green-800 hover:shadow-lg focus:bg-green-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-900 active:shadow-lg transition duration-150 ease-in-out"
          >
            <a data-test-id="cart-checkout">Checkout</a>
          </button>
        </div>
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
