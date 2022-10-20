import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  // Navigating from the homepage to a robot page
  await page.goto('http://localhost:3000/');

  await expect(page.locator('h1')).toHaveText('Welcome to Robot World');

  await expect(
    page.locator(`img[alt="Red and yellow robot in iconstyle"] >> nth=0`),
  ).toBeVisible();

  await page.locator('a:has-text("Our Robots")').click();
  await expect(page).toHaveURL('http://localhost:3000/robots');
  await expect(page.locator('h1')).toHaveText('All our Robots');

  await page.locator('div > h2:has-text("Fink")').click();
  await expect(page).toHaveURL('http://localhost:3000/robots/1');

  // E2E: Add to cart...
  await page.locator('[data-test-id="product-quantity"]').press('Delete');
  await page.locator('[data-test-id="product-quantity"]').fill('3');
  await page.locator('button', { hasText: 'Add to cart' }).click();
  await expect(page.locator('[data-test-id="cart-count"]')).toHaveText('3');

  // ..., change quantity...
  await page.locator('[data-test-id="product-quantity"]').press('Delete');
  await page.locator('[data-test-id="product-quantity"]').fill('2');
  await page.locator('button', { hasText: 'Add to cart' }).click();
  await expect(page.locator('[data-test-id="cart-count"]')).toHaveText('5');

  //  ...and remove from cart
  await page.locator('[data-test-id="cart-count"]').click();
  await expect(
    page.locator('[data-test-id="cart-product-quantity-1"]'),
  ).toHaveText('5');
  await page.locator('[data-test-id="cart-product-remove-1"]').click();
  await expect(
    page.locator('[data-test-id="cart-product-1"]'),
  ).not.toBeVisible();
  await expect(page.locator('[data-test-id="cart-count"]')).toHaveText('0');
});

test('navigation test 2', async ({ page }) => {
  // Navigating to a robot page
  await page.goto('http://localhost:3000/robots/1');

  // Add to cart...
  await page.locator('[data-test-id="product-quantity"]').press('Delete');
  await page.locator('[data-test-id="product-quantity"]').fill('2');
  await page.locator('button', { hasText: 'Add to cart' }).click();
  await expect(page.locator('[data-test-id="cart-count"]')).toHaveText('2');

  // Go to shopping cart
  await page.locator('[data-test-id="cart-count"]').click();
  await expect(
    page.locator('[data-test-id="cart-product-quantity-1"]'),
  ).toHaveText('2');

  // E2E: Checkout flow, payment page, thank you page:
  await page.locator('[data-test-id="cart-checkout"]').click();
  await expect(page).toHaveURL('http://localhost:3000/checkout');

  // Check if confirm button is disabled when the form is not filled out
  await expect(page.locator('button:has-text("Confirm Order")')).toBeDisabled();

  // Fill out form
  await page.getByLabel('First Name').fill('Fink');
  await page.getByLabel('Last Name').fill('Robot');
  await page.getByLabel('E-Mail').fill('fink@robot.com');
  await page.getByLabel('Address').fill('Machine Road 3');
  await page.getByLabel('Postal Code').fill('3333');
  await page.getByLabel('City').fill('Electricity');
  await page.getByLabel('Country').fill('Automatistan');
  await page.getByLabel('Credit Card').fill('1234 5678 9101 1121');
  await page.getByLabel('Expiration Date').fill('12/24');
  await page.getByLabel('Security Code').fill('123');

  // Test confirming the order and check if cart is set back to 0
  await page.locator('button:has-text("Confirm Order")').click();
  await expect(page).toHaveURL('http://localhost:3000/thankyou');
  await expect(page.locator('[data-test-id="cart-count"]')).toHaveText('0');
});
