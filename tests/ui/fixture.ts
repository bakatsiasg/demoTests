import { test as base, Page } from "@playwright/test";
import { LoginPage } from "src/ui/pages/loginPage";
import { InventoryPage } from "src/ui/pages/inventoryPage";
import { CheckoutPage } from "src/ui/pages/checkoutPage";
import { CartComponent } from "src/ui/components/cartComponent";

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
