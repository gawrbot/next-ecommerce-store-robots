import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { robotList } from '../../database/robots';

export default function Robots(props) {
  return (
    <>
      <Head>
        <title>All our robots</title>
        <meta name="description" content="all robots" />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">All Robots</h1>
      <div className="grid grid-cols-4 gap-5">
        {props.robots.map((robot) => {
          return (
            <Link href={`/robots/${robot.id}`} className="" key={robot.id}>
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

export function getServerSideProps() {
  return {
    props: {
      robots: robotList,
    },
  };
}
