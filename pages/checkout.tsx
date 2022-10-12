import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { getRobots, Robot } from '../database/robots';
import { deleteCookie } from '../utils/cookies';

type Cookie = { id: number; inCart: number };

type Props = {
  robots: Robot[];
  cookie?: Cookie[];
  setCookie?: Dispatch<SetStateAction<Cookie[]>>;
};

export default function Checkout(props: Props) {
  const chosenRobotsCookies = props.cookie;
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  if (!props.robots || !chosenRobotsCookies) {
    return (
      <div>
        <h1 className="text-5xl font-bold mt-0 mb-6">Checkout</h1>
        <div>
          Nothing here yet - see the{' '}
          <span className="underline decoration-solid">
            <Link href="/robots" scroll={false}>
              all robots
            </Link>
          </span>{' '}
          page!
        </div>
      </div>
    );
  }

  const chosenRobotsList = props.robots.filter((robot) => {
    return chosenRobotsCookies.some((cookie) => {
      return cookie?.id === robot.id && cookie.inCart > 0;
    });
  });

  const allPrices = chosenRobotsList.map((robot) => {
    const singleRobotCookieObject = props.cookie?.find((singleRobot) => {
      return singleRobot?.id === robot.id;
    });
    if (!singleRobotCookieObject) {
      return;
    }
    const price = Number(robot.price) * singleRobotCookieObject.inCart;
    return price;
  });

  const totalPrice = allPrices.reduce((prevPrice, currPrice) => {
    if (!currPrice || !prevPrice) {
      return;
    }
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
        <form
          className="flex flex-col"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="inline-flex relative w-1/2 border border-2 border-solid rounded-lg px-2 py-3 mb-5">
            <label>
              First Name
              <input
                data-test-id="checkout-first-name"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Last Name
              <input
                data-test-id="checkout-last-name"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              E-Mail
              <input
                data-test-id="checkout-email"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={email}
                onChange={(event) => {
                  setEmail(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Address
              <input
                data-test-id="checkout-address"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={address}
                onChange={(event) => {
                  setAddress(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Postal Code
              <input
                data-test-id="checkout-postal-code"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={postalCode}
                onChange={(event) => {
                  setPostalCode(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              City
              <input
                data-test-id="checkout-city"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={city}
                onChange={(event) => {
                  setCity(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Country
              <input
                data-test-id="checkout-country"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={country}
                onChange={(event) => {
                  setCountry(event.currentTarget.value);
                }}
              />
            </label>
            {/* </form> */}
          </div>

          <h2>Payment Info</h2>
          <div className="inline-flex relative w-1/2 border border-2 border-solid rounded-lg px-2 py-3 mb-5">
            <label>
              Credit Card
              <input
                data-test-id="checkout-credit-card"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={creditCard}
                onChange={(event) => {
                  setCreditCard(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Expiration Date
              <input
                data-test-id="checkout-expiration-date"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={expirationDate}
                onChange={(event) => {
                  setExpirationDate(event.currentTarget.value);
                }}
              />
            </label>
            <label>
              Security Code{' '}
              <input
                data-test-id="checkout-security-code"
                className="font-noto ml-3 mb-3 border border-2 border-solid"
                value={securityCode}
                onChange={(event) => {
                  setSecurityCode(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <button
            disabled={
              !(
                firstName &&
                lastName &&
                email &&
                address &&
                postalCode &&
                city &&
                country &&
                creditCard &&
                expirationDate &&
                securityCode
              )
                ? true
                : false
            }
            onClick={() => {
              const newState: [] = [];
              props.setCookie?.(newState);
              deleteCookie('cart');
              router.push('/thankyou');
            }}
            className="flex items-end px-3 py-1 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md disabled:opacity-75 hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const robots = await getRobots();
  return {
    props: {
      robots: robots,
    },
  };
}
