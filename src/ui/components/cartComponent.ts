import { Page } from "@playwright/test";
import { MenuComponent } from "./menuComponent";
import { Product } from "src/ui/models/product";
import { ProductBuilder } from "src/ui/builders/productBuilder";

export class CartComponent {
  private menuComponent: MenuComponent;
  private continueShoppingButton = '[data-test="continue-shopping"]';
  private checkoutButton = '[data-test="checkout"]';
  private productNames = "//a/div[@class='inventory_item_name']";
  private productPrices = "//div[@class='inventory_item_price']";

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async goToCartPage() {
    await this.menuComponent.navigateToCart();
  }

  async continueShopping() {
    await this.page.click(this.continueShoppingButton);
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async getCartProducts(): Promise<Product[]> {
    const productElementNames = await this.page.locator(this.productNames);
    const productElementPrices = await this.page.locator(this.productPrices);

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
