import { test as base, Page } from "@playwright/test";
import { LoginPage } from "@pages/loginPage";
import { InventoryPage } from "@pages/inventoryPage";
import { CheckoutPage } from "@pages/checkoutPage";
import { CartComponent } from "@components/cartComponent";

export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  checkoutPage: CheckoutPage;
  cartComponent: CartComponent;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  cartComponent: async ({ page }, use) => {
    await use(new CartComponent(page));
  },
});

export { expect } from "@playwright/test";
