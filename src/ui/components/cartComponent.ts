import { Page } from "@playwright/test";
import { MenuComponent } from "./menuComponent";
import { Product } from "src/ui/models/product";
import { ProductBuilder } from "src/ui/builders/productBuilder";

export class CartComponent {
  private menuComponent: MenuComponent;

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async navigate() {
    await this.menuComponent.navigateToCart();
  }

  async clickContinueShopping() {
    await this.page.click('[data-test="continue-shopping"]');
  }

  async clickCheckout() {
    await this.page.click('[data-test="checkout"]');
  }

  async returnCartProducts(): Promise<Product[]> {
    const productElementNames = await this.page.locator(
      "//a/div[@class='inventory_item_name']"
    );
    const productElementPrices = await this.page.locator(
      "//div[@class='inventory_item_price']"
    );

    const products: Product[] = [];

    for (let i = 0; i < (await productElementNames.count()); i++) {
      const name = await productElementNames.nth(i).innerText();
      const priceText = await productElementPrices.nth(i).innerText();
      const price = parseFloat(priceText.replace("$", ""));

      const product = new ProductBuilder()
        .withName(name)
        .withPrice(price)
        .build();

      products.push(product);
    }

    return products;
  }
}
