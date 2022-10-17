import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { userContext } from '../../components/UserContext';
import { getRobots, Robot } from '../../database/robots';

type Props = {
  robots: Robot[];
};

export default function Robots(props: Props) {
  // Get 'current' object and fill it with userContext
  const { scrollRef } = useContext(userContext);

  useEffect(() => {
    // sets the scroll to the currently stored scroll position (works when 'Back to all robots' is clicked bc. 'scroll' is set to 'false' in the link)
    window.scrollTo(0, scrollRef.current.scrollPos);

    // update the scroll position on change (called in listener for the event 'scroll')
    const handleScrollPos = () => {
      scrollRef.current.scrollPos = window.scrollY;
    };

    window.addEventListener('scroll', handleScrollPos);

    // cleanup function to remove event listener again to prevent side effects
    return () => {
      window.removeEventListener('scroll', handleScrollPos);
    };
  });

  return (
    <>
      <Head>
        <title>All our Robots</title>
        <meta name="description" content="Page with all available robots" />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">All our Robots</h1>
      {/* div container for all robots which are mapped over inside it */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-5">
        {props.robots.map((robot) => {
          return (
            <Link href={`/robots/${robot.id}`} key={robot.id}>
              <a data-test-id={`product-${robot.id}`}>
                <div className="bg-pink-600 rounded-lg px-3 py-7 flex flex-col items-center justify-center hover:cursor-pointer">
                  <Image
                    src={`/${robot.id}-${robot.name}.png`}
                    alt=""
                    width="350"
                    height="350"
                  />
                  <h2 className="text-3xl font-bold text-white pt-7">
                    {robot.name}
                  </h2>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
}

// Get the robots from the database in the backend
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
