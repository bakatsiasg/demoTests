import { CustomerBuilder } from "src/ui/builders/customerBuilder";
import { test, expect } from "../fixture";
import { ErrorMessages } from "src/ui/constants/errorMessages";

test.describe("Checkout Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.loginAsStandardUser();
    expect(await loginPage.verifyLogin()).toBeTruthy();
  });

  test("Checkout_AddItemsFromProductsPage_VerifyOrder", async ({
    inventoryPage,
    cartComponent,
    checkoutPage,
  }) => {
    // Step 1: Select random products from the inventory
    const randomProducts =
      await test.step("Select random products from inventory", async () => {
        const allProducts = await inventoryPage.fetchInventoryProducts();
        return allProducts.slice(
          0,
          Math.floor(Math.random() * allProducts.length) + 1
        );
      });

    // Step 2: Add selected products to the cart
    await test.step("Add selected products to the cart", async () => {
      for (const product of randomProducts) {
        await inventoryPage.addProductToCart(product.name);
      }
    });

    // Step 3: Verify added products in the cart
    await test.step("Navigate to cart and verify added products", async () => {
      await cartComponent.goToCartPage();
      const cartProducts = await cartComponent.getCartProducts();
      const cartProductNames = cartProducts.map((product) => product.name);
      const randomProductNames = randomProducts.map((product) => product.name);
      expect(cartProductNames).toEqual(randomProductNames);
    });

    // Step 4: Proceed to checkout
    await test.step("Proceed to checkout", async () => {
      await cartComponent.proceedToCheckout();
    });

    // Step 5: Fill out checkout form
    await test.step("Fill out checkout form", async () => {
      const customer = new CustomerBuilder().build();
      await checkoutPage.enterFirstName(customer);
      await checkoutPage.enterLastName(customer);
      await checkoutPage.enterPostalCode(customer);
      await checkoutPage.proceedToNextStep();
    });

    // Step 6: Verify products in the checkout overview
    await test.step("Verify products in checkout overview and item total price", async () => {
      const checkoutProducts = await cartComponent.getCartProducts();
      const checkoutProductNames = checkoutProducts.map(
        (product) => product.name
      );
      const randomProductNames = randomProducts.map((product) => product.name);
      expect(checkoutProductNames).toEqual(randomProductNames);

      const expectedTotalPrice = randomProducts.reduce(
        (sum, p) => sum + p.price,
        0
      );
      const actualTotalPrice = await checkoutPage.getTotalItemPrice();
      expect(actualTotalPrice).toBeGreaterThanOrEqual(expectedTotalPrice);
    });

    // Step 7: Complete the order
    await test.step("Complete the order", async () => {
      await checkoutPage.completeCheckout();
    });

    // Step 8: Verify confirmation message
    await test.step("Verify confirmation message", async () => {
      await checkoutPage.verifyOrderConfirmation();
    });
  });

  test("Checkout_InformationFieldsWhenEmpty_ShouldReturnValidationError", async ({
    cartComponent: cartPage,
    checkoutPage,
  }) => {
    const customer = new CustomerBuilder().build();
    await cartPage.goToCartPage();
    await cartPage.proceedToCheckout();
    await checkoutPage.proceedToNextStep();
    await checkoutPage.verifyErrorMessage(ErrorMessages.FirstNameRequired);

    await checkoutPage.enterFirstName(customer);
    await checkoutPage.proceedToNextStep();
    await checkoutPage.verifyErrorMessage(ErrorMessages.LastNameRequired);

    await checkoutPage.enterLastName(customer);
    await checkoutPage.proceedToNextStep();
    await checkoutPage.verifyErrorMessage(ErrorMessages.PostalCodeRequired);

    await checkoutPage.enterPostalCode(customer);
    await checkoutPage.proceedToNextStep();
    await checkoutPage.verifyOnOverviewStep();
  });
});
