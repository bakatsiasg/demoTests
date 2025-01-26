import { Page } from "@playwright/test";
import { MenuComponent } from "src/components/menuComponent";

export class ProductPage {
  private menuComponent: MenuComponent;

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async getProductName(): Promise<string> {
    return (
      (await this.page.locator(".inventory_details_name").textContent()) || ""
    );
  }

  async getProductDescription(): Promise<string> {
    return (
      (await this.page.locator(".inventory_details_desc").textContent()) || ""
    );
  }

  async getProductPrice(): Promise<string> {
    return (
      (await this.page.locator(".inventory_details_price").textContent()) || ""
    );
  }

  async addToCart() {
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async removeFromCart() {
    await this.page.click('[data-test="remove-sauce-labs-backpack"]');
  }

  async navigate() {
    await this.menuComponent.navigateToInventory();
  }
}
