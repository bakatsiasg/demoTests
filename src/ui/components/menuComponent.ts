import { Page } from "@playwright/test";

export class MenuComponent {
  private menuButton = "#react-burger-menu-btn";
  private closeButton = "#react-burger-cross-btn";
  private shoppingCartLink =
    '#shopping_cart_container a[data-test="shopping-cart-link"]';

  constructor(private page: Page) {}

  async navigateToInventory() {
    await this.page.goto("/inventory.html");
  }

  async logout() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async navigateToCart() {
    await this.page.click(this.shoppingCartLink);
  }

  async openMenu() {
    await this.page.click(this.menuButton);
  }

  async closeMenu() {
    await this.page.click(this.closeButton);
  }
}
