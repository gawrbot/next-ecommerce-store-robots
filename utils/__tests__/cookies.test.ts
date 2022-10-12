import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
} from '../cookies';

test('set or update, get and delete a cookie', () => {
  const cookieKey = 'cart';
  const cookieValue = [{ id: '1', cart: 3 }];
  const cookieValueTwo = [{ id: '1', cart: 5 }];

  // Unit: Test functions for adding and removing info from cookie
  expect(getParsedCookie(cookieKey)).toBe(undefined);
  expect(() => setStringifiedCookie(cookieKey, cookieValue)).not.toThrow();
  expect(getParsedCookie(cookieKey)).toStrictEqual(cookieValue);

  // Unit: Test function for updating quantity in item of cookie (eg. adding an item to the cart that already exists)
  expect(() => setStringifiedCookie(cookieKey, cookieValueTwo)).not.toThrow();
  expect(getParsedCookie(cookieKey)).toStrictEqual(cookieValueTwo);

  // Clear state
  expect(deleteCookie(cookieKey)).toBe(undefined);
  expect(getParsedCookie(cookieKey)).toBe(undefined);
});

// Unit: Test cart sum function
test('cart sum', () => {
  const cookieValueThree = [
    { id: '1', cart: 5 },
    { id: '2', cart: 2 },
    { id: '3', cart: 4 },
  ];

  const robotsInCart = cookieValueThree.reduce((prevRobot, currRobot) => {
    return currRobot.cart + prevRobot;
  }, 0);

  expect(robotsInCart).toBe(11);
});
