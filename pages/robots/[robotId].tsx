import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getRobotById, Robot } from '../../database/robots';
import { parseIntFromContextQuery } from '../../utils/contextQuery';

type Cookie = { id: number; inCart: number };

type Props =
  | {
      error: string;
    }
  | {
      robot: Robot;
      cookie?: Cookie[];
      setCookie?: Dispatch<SetStateAction<Cookie[]>>;
    };

export default function SingleRobot(props: Props) {
  const [quantity, setQuantity] = useState(Number);

  // GET COOKIE OBJECT
  // Define cookie either as props.cookie (if cookie exists) or define it as an empty object (same with robot in the next declaration)
  const cookie =
    'cookie' in props ? props.cookie : ({} as { [key: string]: undefined });

  const robot =
    'robot' in props ? props.robot : ({} as { [key: string]: undefined });

  // Get the cookie object for the specific robot and for that check if the variable cookie is an array
  const singleRobotCookieObject =
    Array.isArray(cookie) &&
    cookie.find((singleRobot) => {
      return singleRobot.id === robot.id;
    });

  // On every change of the single robots cookie value, get the value and set it to 'quantity' or set the quantity to 0
  useEffect(() => {
    if (singleRobotCookieObject) {
      setQuantity(singleRobotCookieObject.inCart);
    }
  }, [singleRobotCookieObject]);

  // Show error page if id is not in the database
  if ('error' in props) {
    return (
      <div className="flex flex-col">
        <Head>
          <title>Robot not found</title>
          <meta name="description" content="Robot not found" />
        </Head>
        <h1 className="text-5xl font-bold mb-10">{props.error}</h1>
        <p>
          Sorry, please see{' '}
          <span className="underline decoration-solid">
            <Link href="/robots" scroll={false}>
              all robots
            </Link>
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.robot.name}</title>
        <meta
          name="description"
          content={`Page of ${props.robot.name}, the ${props.robot.type}`}
        />
      </Head>

      <h1 className="text-5xl font-bold mt-0">{props.robot.name}</h1>
      <div className="text-xs mb-4">Id: {props.robot.id}</div>
      {/* Back Button to the robot page -> 'scroll' is set to 'false' so that the 'all robots page' is in the same scroll position again when coming back to it from a single robot */}
      <div className="underline decoration-solid">
        <Link href="/robots" scroll={false}>
          ⬅ Back to all robots
        </Link>
      </div>
      {/* div container for the robot that has been found by id in the backend down below */}
      <div className="grid justify-items-start w-2/3">
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div>
            <Image
              src={`/${props.robot.id}-${props.robot.name}.png`}
              alt={`/${props.robot.name}, the ${props.robot.type}`}
              data-test-id="product-image"
              width={300}
              height={300}
              className="flex object-scale-down col-span-1"
            />
          </div>
          <div className="font-noto col-span-2">
            <div className="mt-2">
              <span className="font-bold">Type:</span> {props.robot.type}
            </div>
            <div className="mt-2">
              <span className="font-bold">Price:</span>{' '}
              <span data-test-id="product-price">{props.robot.price}</span> €
            </div>

            <div className="mt-2">
              <span className="font-bold">Info:</span> {props.robot.info}
            </div>
            {/* Update the quantity: minus */}
            <div data-test-id="product-quantity" className="mt-4">
              <button
                onClick={() => {
                  if (quantity > 0) {
                    setQuantity(quantity - 1);
                  }
                }}
                className="inline-block px-3 py-1 bg-pink-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                -
              </button>

              {/* Show the quantity */}
              <span className="inline-block px-3 py-1 font-medium text-xs leading-tight uppercase rounded shadow-md">
                {singleRobotCookieObject ? quantity : 0}
              </span>

              {/* Update the quantity: plus */}
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
                className="inline-block px-3 py-1 bg-pink-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                +
              </button>
            </div>
            {/* Add the quantity to 'cart' in the cookie */}
            <div>
              <button
                data-test-id="product-add-to-cart"
                onClick={() => {
                  // if there is no cookie yet, create one and give it the current value of 'quantity'
                  if (!props.cookie) {
                    const newState = [{ id: props.robot.id, inCart: quantity }];
                    props.setCookie?.(newState);
                    // if there is no object in the cookie for this specific robot yet, add one and give it the current value of 'quantity'
                  } else if (!singleRobotCookieObject) {
                    const newState = [
                      ...props.cookie,
                      { id: props.robot.id, inCart: quantity },
                    ];
                    props.setCookie?.(newState);
                    // if an object exists, give it the current value of 'quantity'
                  } else {
                    const newState = [...props.cookie];
                    singleRobotCookieObject.inCart = quantity;
                    props.setCookie?.(newState);
                  }
                }}
                className="font-fredoka mt-2 bg-green-700 font-medium text-white text-xs p-3 leading-tight uppercase rounded shadow-md hover:bg-green-800 hover:shadow-lg focus:bg-green-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-900 active:shadow-lg transition duration-150 ease-in-out"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Get the robot that matches the id in the route from the backend database
export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<import('next').GetServerSidePropsResult<Props>> {
  // Get the number from the dynamic route (the function parseIntFromContextQuery is imported from utils)
  const robotId = await parseIntFromContextQuery(context.query.robotId);

  if (Number.isNaN(robotId)) {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Robot not found',
      },
    };
  }

  // If the robotId is a number, try to get the robot from the database
  const foundRobot = await getRobotById(Number(robotId));

  if (typeof foundRobot === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Robot not found',
      },
    };
  }

  return {
    props: {
      robot: foundRobot,
    },
  };
}
