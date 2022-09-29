import Head from 'next/head';

export default function ShoppingCart() {
  return (
    <>
      <Head>
        <title>Your Shopping Cart</title>
        <meta name="description" content="Find your chosen products here" />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">Your Shopping Cart</h1>
    </>
  );
}
