import '../styles/globals.css';
import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { userContext } from '../components/UserContext';
import { getParsedCookie, setStringifiedCookie } from '../utils/cookies';

function MyApp({ Component, pageProps }) {
  // useRef will return the 'current' object storing the scroll position (--> stored when the 'all robots' page is loaded and passed in the value property of the userContext provider)
  const scrollRef = useRef({
    scrollPos: 0,
  });

  // Define useState hook for cookie to pass to components
  const [cookie, setCookie] = useState();

  // Get the cookie on first render; if empty, then stop
  useEffect(() => {
    const currentCookieValueToGet = getParsedCookie('cart');
    if (!currentCookieValueToGet) {
      return;
    }
    setCookie(currentCookieValueToGet);
  }, []);

  // If the state value 'cookie' changes, set the cookie to the new state value
  useEffect(() => {
    if (typeof cookie !== 'undefined') {
      setStringifiedCookie('cart', cookie);
    }
  }, [cookie]);

  return (
    // Pass cookie to Layout in order for Layout to pass it to Header and show it in the header
    <Layout cookie={cookie}>
      {/* Pass the 'current' object called 'scrollRef' to the context provider */}
      <userContext.Provider value={{ scrollRef: scrollRef }}>
        {/* Pass the state and setState [cookie, setCookie] to the component being rendered */}
        <Component {...pageProps} cookie={cookie} setCookie={setCookie} />
      </userContext.Provider>
    </Layout>
  );
}
export default MyApp;
