import { CustomerBuilder } from "@builders/customerBuilder";
import { test, expect } from "../fixture";
import { ErrorMessages } from "@constants/errorMessages";

test.describe("Checkout Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToLogin();
    await loginPage.login("standard_user", "secret_sauce");
    expect(await loginPage.isLoggedIn()).toBeTruthy();
  });

  test("Checkout_AddItemsFromProductsPage_VerifyOrder", async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // Randomly pick between products
    const allProducts = await inventoryPage.getProducts();
    const randomProducts = allProducts.slice(
      0,
      Math.floor(Math.random() * allProducts.length) + 1
    );

    // Add products to the cart
    for (const product of randomProducts) {
      await inventoryPage.addItemToCart(product.name);
    }

    // Navigate to the cart and verify added products
    await cartPage.navigate();
    const cartProducts = await cartPage.returnCartProducts();
    const cartProductNames = cartProducts.map((product) => product.name);
    const randomProductNames = randomProducts.map((product) => product.name);
    expect(cartProductNames).toEqual(randomProductNames);

    // Checkout process
    await cartPage.clickCheckout();

    // Fill out the checkout form
    const customer = new CustomerBuilder().build();
    await checkoutPage.fillFirstName(customer);
    await checkoutPage.fillLastName(customer);
    await checkoutPage.fillPostalCode(customer);
    await checkoutPage.clickContinue();

    // Verify products in the checkout overview and item total price
    const checkoutProducts = await cartPage.returnCartProducts();
    const checkoutProductNames = checkoutProducts.map(
      (product) => product.name
    );
    expect(checkoutProductNames).toEqual(randomProductNames);

    const expectedTotalPrice = randomProducts.reduce(
      (sum, p) => sum + p.price,
      0
    );
    const actualTotalPrice = await checkoutPage.returnTotalItemPrice();
    expect(actualTotalPrice).toBeGreaterThanOrEqual(expectedTotalPrice);

    // Complete the order
    await checkoutPage.clickFinish();

    // Verify confirmation page
    await checkoutPage.assertConfirmationMessage();
  });

  test("Checkout_InformationFieldsWhenEmpty_ShouldReturnValidationError", async ({
    cartPage,
    checkoutPage,
  }) => {
    const customer = new CustomerBuilder().build();
    await cartPage.navigate();
    await cartPage.clickCheckout();
    await checkoutPage.clickContinue();
    await checkoutPage.assertErrorMessage(ErrorMessages.FirstNameRequired);

    await checkoutPage.fillFirstName(customer);
    await checkoutPage.clickContinue();
    await checkoutPage.assertErrorMessage(ErrorMessages.LastNameRequired);

    await checkoutPage.fillLastName(customer);
    await checkoutPage.clickContinue();
    await checkoutPage.assertErrorMessage(ErrorMessages.PostalCodeRequired);

    await checkoutPage.fillPostalCode(customer);
    await checkoutPage.clickContinue();
    await checkoutPage.assertOnCheckoutStepTwo();
  });
});
