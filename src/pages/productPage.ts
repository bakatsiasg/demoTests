import { Page } from "@playwright/test";
import { MenuComponent } from "src/components/menuComponent";

export class ProductPage {
  private menuComponent: MenuComponent;

  // Centralized selectors
  private selectors = {
    productName: ".inventory_details_name",
    productDescription: ".inventory_details_desc",
    productPrice: ".inventory_details_price",
    addToCartButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
    removeFromCartButton: '[data-test="remove-sauce-labs-backpack"]',
  };

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async getProductName(): Promise<string> {
    return (
      (await this.page.locator(this.selectors.productName).textContent()) || ""
    );
  }

  async getProductDescription(): Promise<string> {
    return (
      (await this.page
        .locator(this.selectors.productDescription)
        .textContent()) || ""
    );
  }

  async getProductPrice(): Promise<string> {
    return (
      (await this.page.locator(this.selectors.productPrice).textContent()) || ""
    );
  }

  async addToCart() {
    await this.page.click(this.selectors.addToCartButton);
  }

  async removeFromCart() {
    await this.page.click(this.selectors.removeFromCartButton);
  }

  async navigate() {
    await this.menuComponent.navigateToInventory();
  }
}
