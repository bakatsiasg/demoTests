import { Page } from "@playwright/test";

export class MenuComponent {
  constructor(private page: Page) {}

  async navigateToInventory() {
    await this.page.goto("/inventory.html");
  }

  async logout() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async navigateToCart() {
    await this.page.click(
      '#shopping_cart_container a[data-test="shopping-cart-link"]'
    );
  }

  async openMenu() {
    await this.page.click("#react-burger-menu-btn");
  }

  async closeMenu() {
    await this.page.click("#react-burger-cross-btn");
  }
}
