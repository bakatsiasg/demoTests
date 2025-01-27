import { CustomerBuilder } from "src/ui/builders/customerBuilder";
import { test, expect } from "../fixture";
import { ErrorMessages } from "src/ui/constants/errorMessages";

test.describe("Checkout Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.loginWithStandardUser();
    expect(await loginPage.isLoggedIn()).toBeTruthy();
  });

  test("Checkout_AddItemsFromProductsPage_VerifyOrder", async ({
    inventoryPage,
    cartComponent,
    checkoutPage,
  }) => {
    // Step 1: Select random products from the inventory
    const randomProducts =
      await test.step("Select random products from inventory", async () => {
        const allProducts = await inventoryPage.getProducts();
        return allProducts.slice(
          0,
          Math.floor(Math.random() * allProducts.length) + 1
        );
      });

    // Step 2: Add selected products to the cart
    await test.step("Add selected products to the cart", async () => {
      for (const product of randomProducts) {
        await inventoryPage.addItemToCart(product.name);
      }
    });

    // Step 3: Verify added products in the cart
    await test.step("Navigate to cart and verify added products", async () => {
      await cartComponent.navigate();
      const cartProducts = await cartComponent.returnCartProducts();
      const cartProductNames = cartProducts.map((product) => product.name);
      const randomProductNames = randomProducts.map((product) => product.name);
      expect(cartProductNames).toEqual(randomProductNames);
    });

    // Step 4: Proceed to checkout
    await test.step("Proceed to checkout", async () => {
      await cartComponent.clickCheckout();
    });

    // Step 5: Fill out checkout form
    await test.step("Fill out checkout form", async () => {
      const customer = new CustomerBuilder().build();
      await checkoutPage.fillFirstName(customer);
      await checkoutPage.fillLastName(customer);
      await checkoutPage.fillPostalCode(customer);
      await checkoutPage.clickContinue();
    });

    // Step 6: Verify products in the checkout overview
    await test.step("Verify products in checkout overview and item total price", async () => {
      const checkoutProducts = await cartComponent.returnCartProducts();
      const checkoutProductNames = checkoutProducts.map(
        (product) => product.name
      );
      const randomProductNames = randomProducts.map((product) => product.name);
      expect(checkoutProductNames).toEqual(randomProductNames);

      const expectedTotalPrice = randomProducts.reduce(
        (sum, p) => sum + p.price,
        0
      );
      const actualTotalPrice = await checkoutPage.returnTotalItemPrice();
      expect(actualTotalPrice).toBeGreaterThanOrEqual(expectedTotalPrice);
    });

    // Step 7: Complete the order
    await test.step("Complete the order", async () => {
      await checkoutPage.clickFinish();
    });

    // Step 8: Verify confirmation message
    await test.step("Verify confirmation message", async () => {
      await checkoutPage.assertConfirmationMessage();
    });
  });

  test("Checkout_InformationFieldsWhenEmpty_ShouldReturnValidationError", async ({
    cartComponent: cartPage,
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
