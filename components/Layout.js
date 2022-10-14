import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="robot-icon-c-freepik.png" />
        <meta name="description" content="Layout of robot shop" />
      </Head>
      {/* Passing cookie info to header as props */}
      <Header cookie={props.cookie} />

      <main className="px-10 py-10 font-fredoka bg-cyan-900">
        {props.children}
      </main>

      <Footer />
    </>
  );
}
