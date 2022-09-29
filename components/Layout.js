import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="robot-icon-c-freepik.png" />
      </Head>

      <Header />

      <main className="px-10 py-10 font-fredoka">{props.children}</main>

      <Footer />
    </>
  );
}
