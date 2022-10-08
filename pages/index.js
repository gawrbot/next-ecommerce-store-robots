import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Welcome to the online shop" />
      </Head>
      <h1 className="text-7xl font-bold mt-0 mb-10 font-nabla text-center">
        Welcome to Robot World
      </h1>
      <Image
        src="/robot-icon-c-freepik.png"
        alt="Red and yellow robot in iconstyle"
        width={300}
        height={300}
      />
    </div>
  );
}
