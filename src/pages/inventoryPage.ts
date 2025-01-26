import { Page } from "@playwright/test";
import { Product } from "@models/product";
import { ProductBuilder } from "@builders/productBuilder";
import { MenuComponent } from "src/components/menuComponent";

export class InventoryPage {
  private menuComponent: MenuComponent;

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async clickSortByNameAsc() {
    await this.page.selectOption(".product_sort_container", "az");
  }

  async clickSortByNameDesc() {
    await this.page.selectOption(".product_sort_container", "za");
  }

  async clickSortByPriceLowToHigh() {
    await this.page.selectOption(".product_sort_container", "lohi");
  }

  async clickSortByPriceHighToLow() {
    await this.page.selectOption(".product_sort_container", "hilo");
  }

  async getProducts(): Promise<Product[]> {
    const productElementNames = await this.page.locator(
      "//a/div[@class='inventory_item_name ']"
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

  async navigate() {
    await this.menuComponent.navigateToInventory();
  }

  async addItemToCart(productName: string) {
    const productLocator = this.page
      .locator(".inventory_item")
      .filter({ hasText: productName });
    await productLocator.locator('[data-test^="add-to-cart-"]').click();
  }
}
