import '../styles/globals.css';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { userContext } from '../components/UserContext';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps }) {
  const scrollRef = useRef({
    scrollPos: 0,
  });

  const [cookies, setCookies] = useState();

  useEffect(() => {
    const currentCookieValueToGet = getParsedCookie('cart');
    if (!currentCookieValueToGet) {
      return;
    }
    setCookies(currentCookieValueToGet);
  }, []);

  useEffect(() => {
    if (typeof cookies !== 'undefined') {
      setStringifiedCookie('cart', cookies);
    }
  }, [cookies]);

  return (
    <Layout cookie={cookies}>
      <userContext.Provider value={{ scrollRef: scrollRef }}>
        <Component {...pageProps} cookie={cookies} setCookie={setCookies} />
      </userContext.Provider>
    </Layout>
  );
}
export default MyApp;
