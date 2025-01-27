import { Page } from "@playwright/test";
import { Product } from "src/ui/models/product";
import { ProductBuilder } from "src/ui/builders/productBuilder";
import { MenuComponent } from "src/ui/components/menuComponent";
import { FilterOptions } from "src/ui/constants/filterOptions";

export class InventoryPage {
  private menuComponent: MenuComponent;

  // Selectors as properties
  private selectors = {
    sortContainer: ".product_sort_container",
    inventoryItemName: "//a/div[@class='inventory_item_name ']",
    inventoryItemPrice: "//div[@class='inventory_item_price']",
    inventoryItem: ".inventory_item",
    addToCartButton: '[data-test^="add-to-cart-"]',
  };

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async clickSortByNameAsc() {
    await this.page.selectOption(
      this.selectors.sortContainer,
      FilterOptions.NAME_ASC
    );
  }

  async clickSortByNameDesc() {
    await this.page.selectOption(
      this.selectors.sortContainer,
      FilterOptions.NAME_DESC
    );
  }

  async clickSortByPriceLowToHigh() {
    await this.page.selectOption(
      this.selectors.sortContainer,
      FilterOptions.PRICE_LOW_TO_HIGH
    );
  }

  async clickSortByPriceHighToLow() {
    await this.page.selectOption(
      this.selectors.sortContainer,
      FilterOptions.PRICE_HIGH_TO_LOW
    );
  }

  async getProducts(): Promise<Product[]> {
    const productElementNames = await this.page.locator(
      this.selectors.inventoryItemName
    );
    const productElementPrices = await this.page.locator(
      this.selectors.inventoryItemPrice
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
      .locator(this.selectors.inventoryItem)
      .filter({ hasText: productName });
    await productLocator.locator(this.selectors.addToCartButton).click();
  }
}
