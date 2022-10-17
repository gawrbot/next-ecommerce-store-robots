import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Welcome page of the robot shop" />
      </Head>
      <h1 className="text-7xl text-pink-600 font-bold mt-0 mb-10 font-silkscreen text-center">
        Welcome to <span className="text-slate-500">Robot</span> World
      </h1>

      <Image
        src="/robot (1).png"
        alt="Red and yellow robot in iconstyle"
        width={300}
        height={300}
      />
    </div>
  );
}
