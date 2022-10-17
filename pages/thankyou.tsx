import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="Thank you page" />
      </Head>
      <h1 className="text-7xl text-pink-600 font-bold mt-0 mb-10 font-silkscreen text-center">
        <span className="text-slate-500">Thank you</span> for your order!
      </h1>
    </div>
  );
}
