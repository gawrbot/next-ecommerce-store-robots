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
  // Define property 'scrollRef' of context object as variable
  const { scrollRef } = useContext(userContext);

  // EXPLAIN MYSELF UNTIL END OF USEeFFECT HOOK
  useEffect(() => {
    // called when the component has been mounted, sets the scroll to the currently stored scroll position
    window.scrollTo(0, scrollRef.current.scrollPos);

    const handleScrollPos = () => {
      // every time the window is scrolled, update the reference. This will not cause a re-render, meaning smooth uninterrupted scrolling.
      scrollRef.current.scrollPos = window.scrollY;
    };

    window.addEventListener('scroll', handleScrollPos);

    return () => {
      // remove event listener on unmount
      window.removeEventListener('scroll', handleScrollPos);
    };
  });

  return (
    <>
      <Head>
        <title>All Robots</title>
        <meta name="description" content="all robots" />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">All Robots</h1>
      <div className="grid grid-cols-4 gap-5">
        {props.robots.map((robot) => {
          return (
            <Link
              href={`/robots/${robot.id}`}
              key={robot.id}
              data-test-id={`product-${robot.id}`}
            >
              <div className="bg-indigo-500 rounded-lg px-3 py-3 flex flex-col items-center justify-center hover:cursor-pointer">
                <Image
                  src={`/${robot.id}-${robot.name}.png`}
                  alt=""
                  width="150"
                  height="150"
                />
                <h2 className="text-xl font-bold text-white">{robot.name}</h2>
              </div>
            </Link>
          );
        })}
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
