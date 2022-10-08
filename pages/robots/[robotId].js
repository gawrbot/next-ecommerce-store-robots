import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { robotList } from '../../database/robots';

export default function Robot(props) {
  const [quantity, setQuantity] = useState();

  // Get the Cookie Object for the robot with the same id
  const singleRobotCookieObject = props.cookie?.find((singleRobot) => {
    return singleRobot.id === props.robot.id;
  });

  useEffect(() => {
    if (singleRobotCookieObject) {
      setQuantity(singleRobotCookieObject.inCart);
    } else {
      setQuantity(0);
    }
  }, [singleRobotCookieObject]);

  // If there is no robot with the id passed in the URL, show error page
  if (props.error) {
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

  // If it exists, render the robot with the correct id
  return (
    <div>
      <Head>
        <title>{props.robot.name}</title>
        <meta
          name="description"
          content={`${props.robot.name} is a ${props.robot.type}`}
        />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">{props.robot.name}</h1>
      {/* Back Button to the robot page -> Scroll is false so that the page stays in the same scroll position */}
      <div className="underline decoration-solid">
        <Link href="/robots" scroll={false}>
          ⬅ Back to all robots
        </Link>
      </div>
      <div className="flex flex-row gap-5 mt-5">
        <Image
          src={`/${props.robot.id}-${props.robot.name}.png`}
          alt={`/${props.robot.name}, the ${props.robot.type}`}
          data-test-id="product-image"
          className="flex object-scale-down mr-10 basis-2/3"
          width={300}
          height={300}
        />
        <div className="basis-1/3 font-noto">
          <div>Type: {props.robot.type}</div>
          <div data-test-id="product-price">Price: {props.robot.price} €</div>
          <div>Id: {props.robot.id}</div>
          <div>Info: {props.robot.info}</div>
          {/* Updating Cookie Info  */}
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

            <span
              data-test-id="product-quantity"
              className="inline-block px-3 py-1 font-medium text-xs leading-tight uppercase rounded shadow-md"
            >
              {quantity}
            </span>

            <button
              onClick={() => {
                setQuantity(quantity + 1);
              }}
              className="inline-block px-3 py-1 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              +
            </button>

            <button
              data-test-id="product-add-to-cart"
              onClick={() => {
                if (!props.cookie) {
                  const newState = [{ id: props.robot.id, inCart: quantity }];
                  props.setCookie(newState);
                } else if (!singleRobotCookieObject) {
                  const newState = [
                    ...props.cookie,
                    { id: props.robot.id, inCart: quantity },
                  ];
                  props.setCookie(newState);
                } else {
                  const newState = [...props.cookie];
                  singleRobotCookieObject.inCart = quantity;
                  props.setCookie(newState);
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

export function getServerSideProps(context) {
  // Get the right robot from the "database"
  const robotId = parseInt(context.params.robotId);

  const foundRobot = robotList.find((robot) => {
    return robot.id === robotId;
  });

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
