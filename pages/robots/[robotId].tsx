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
  // Show error page if id is not in the database
  if ('error' in props) {
    return (
      <div className="flex flex-col items-center">
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

  // If the id is in the database, make definitions and render the page
  const [quantity, setQuantity] = useState(Number);

  // Get the robots cookie with the robots id
  const singleRobotCookieObject = props.cookie?.find((singleRobot) => {
    return singleRobot.id === props.robot.id;
  });

  // on first render, get the current value of 'cart' of this robots cookie to show it in the 'quantity' or set the quantity to 0
  useEffect(() => {
    if (singleRobotCookieObject) {
      setQuantity(singleRobotCookieObject.inCart);
    } else {
      setQuantity(0);
    }
  }, [singleRobotCookieObject]);

  return (
    <div>
      <Head>
        <title>{props.robot.name}</title>
        <meta
          name="description"
          content={`the page of ${props.robot.name}, the ${props.robot.type}`}
        />
      </Head>

      <h1 className="text-5xl font-bold mt-0 mb-6">{props.robot.name}</h1>
      {/* Back Button to the robot page -> 'scroll' is set to 'false' so that the 'all robots page' is in the same scroll position again when coming back to it from a single robot */}
      <div className="underline decoration-solid">
        <Link href="/robots" scroll={false}>
          ⬅ Back to all robots
        </Link>
      </div>
      {/* div container for the robot that has been found by id in the backend down below */}
      <div className="flex flex-row gap-5 mt-5">
        <Image
          src={`/${props.robot.id}-${props.robot.name}.png`}
          alt={`/${props.robot.name}, the ${props.robot.type}`}
          data-test-id="product-image"
          width={300}
          height={300}
          className="flex object-scale-down mr-10 basis-2/3"
        />
        <div className="basis-1/3 font-noto">
          <div>Type: {props.robot.type}</div>
          <div data-test-id="product-price">Price: {props.robot.price} €</div>
          <div>Id: {props.robot.id}</div>
          <div>Info: {props.robot.info}</div>
          {/* Update the quantity: minus */}
          <div>
            <button
              onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1);
                }
              }}
              className="inline-block px-3 py-1 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              -
            </button>

            {/* Show the quantity */}
            <span
              data-test-id="product-quantity"
              className="inline-block px-3 py-1 font-medium text-xs leading-tight uppercase rounded shadow-md"
            >
              {quantity}
            </span>

            {/* Update the quantity: plus */}
            <button
              onClick={() => {
                setQuantity(quantity + 1);
              }}
              className="inline-block px-3 py-1 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              +
            </button>

            {/* Add the quantity to 'cart' in the cookie */}
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
              className="inline-block px-2 ml-5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add to cart
            </button>
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

  if (typeof robotId === 'string' || typeof robotId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Robot not found',
      },
    };
  }

  // If the robotId is a number, try to get the robot from the database
  const foundRobot = await getRobotById(robotId);

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