import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="Thank you" />
      </Head>
      <h1 className="text-7xl font-bold mt-0 mb-10 font-nabla text-center">
        Thank you for your order!
      </h1>
    </div>
  );
}
