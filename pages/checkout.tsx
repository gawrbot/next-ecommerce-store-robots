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
        <Head>
          <title>Checkout empty</title>
          <meta name="description" content="Empty checkout page" />
        </Head>
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
    return Number(currPrice) + Number(prevPrice);
  }, 0);

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Checkout page" />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">Checkout</h1>

      {/* ORDER OVERVIEW */}
      <div className="grid p-6 rounded-lg shadow-lg border-solid border-2 mb-10">
        <h2 className="text-2xl mb-5">Order Overview</h2>

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
            <div key={robot.id} data-test-id={`cart-product-${robot.id}`}>
              <div>
                <Link href={`/robots/${robot.id}`}>
                  <h3 className="text-xl font-bold font-fredoka hover:cursor-pointer">
                    {robot.name}
                  </h3>
                </Link>
              </div>

              <div className="mb-3 font-noto">
                Price: {priceForRobotAmount} €
              </div>
            </div>
          );
        })}
        <div>
          <div className="text-xl pt-2 mt-5 border-t-2">
            Total: <span data-test-id="cart-total">{totalPrice}</span> €
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="grid p-6 rounded-lg shadow-lg border-solid border-2">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h2 className="text-2xl mb-5">Shipping Address</h2>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 mr-3">
              First Name
              <input
                data-test-id="checkout-first-name"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.currentTarget.value);
                }}
              />
            </label>

            <label className="form-label inline-block mb-2 mr-3">
              Last Name
              <input
                data-test-id="checkout-last-name"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.currentTarget.value);
                }}
              />
            </label>
            <label className="form-label inline-block mb-2 mr-3">
              E-Mail
              <input
                data-test-id="checkout-email"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={email}
                onChange={(event) => {
                  setEmail(event.currentTarget.value);
                }}
              />
            </label>
            <label className="form-label inline-block mb-2 mr-3">
              Address
              <input
                data-test-id="checkout-address"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={address}
                onChange={(event) => {
                  setAddress(event.currentTarget.value);
                }}
              />
            </label>
            <label className="form-label inline-block mb-2 mr-3">
              Postal Code
              <input
                data-test-id="checkout-postal-code"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={postalCode}
                onChange={(event) => {
                  setPostalCode(event.currentTarget.value);
                }}
              />
            </label>
            <label className="form-label inline-block mb-2 mr-3">
              City
              <input
                data-test-id="checkout-city"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={city}
                onChange={(event) => {
                  setCity(event.currentTarget.value);
                }}
              />
            </label>
            <label className="form-label inline-block mb-2 mr-3">
              Country
              <input
                data-test-id="checkout-country"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={country}
                onChange={(event) => {
                  setCountry(event.currentTarget.value);
                }}
              />
            </label>
          </div>

          <h2 className="text-2xl mb-5">Payment Info</h2>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 mr-3">
              Credit Card
              <input
                data-test-id="checkout-credit-card"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={creditCard}
                onChange={(event) => {
                  setCreditCard(event.currentTarget.value);
                }}
              />
            </label>
            <label className="form-label inline-block mb-2 mr-3">
              Expiration Date
              <input
                data-test-id="checkout-expiration-date"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={expirationDate}
                onChange={(event) => {
                  setExpirationDate(event.currentTarget.value);
                }}
              />
            </label>
            <label className="form-label inline-block mb-2 mr-3">
              Security Code{' '}
              <input
                data-test-id="checkout-security-code"
                className="font-noto text-black form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-300 rounded"
                value={securityCode}
                onChange={(event) => {
                  setSecurityCode(event.currentTarget.value);
                }}
              />
            </label>
          </div>
          <button
            data-test-id="checkout-confirm-order"
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
            className="bg-green-700 font-medium text-white text-xs p-3 disabled:bg-slate-600 leading-tight uppercase rounded shadow-md hover:bg-green-800 hover:shadow-lg focus:bg-green-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-900 active:shadow-lg transition duration-150 ease-in-out"
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
