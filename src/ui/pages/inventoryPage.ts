import { Page } from "@playwright/test";
import { Product } from "src/ui/models/product";
import { ProductBuilder } from "src/ui/builders/productBuilder";
import { MenuComponent } from "src/ui/components/menuComponent";
import { FilterOptions } from "src/ui/constants/filterOptions";

export class InventoryPage {
  private menuComponent: MenuComponent;
  private sortContainer = ".product_sort_container";
  private inventoryItemName = "//a/div[@class='inventory_item_name ']";
  private inventoryItemPrice = "//div[@class='inventory_item_price']";
  private inventoryItem = ".inventory_item";
  private addToCartButton = '[data-test^="add-to-cart-"]';

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async sortProductsByNameAscending() {
    await this.page.selectOption(this.sortContainer, FilterOptions.NAME_ASC);
  }

  async sortProductsByNameDescending() {
    await this.page.selectOption(this.sortContainer, FilterOptions.NAME_DESC);
  }

  async sortProductsByPriceAscending() {
    await this.page.selectOption(
      this.sortContainer,
      FilterOptions.PRICE_LOW_TO_HIGH
    );
  }

  async sortProductsByPriceDescending() {
    await this.page.selectOption(
      this.sortContainer,
      FilterOptions.PRICE_HIGH_TO_LOW
    );
  }

  async fetchInventoryProducts(): Promise<Product[]> {
    const productElementNames = await this.page.locator(this.inventoryItemName);
    const productElementPrices = await this.page.locator(
      this.inventoryItemPrice
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

  async goToInventoryPage() {
    await this.menuComponent.navigateToInventory();
  }

  async addProductToCart(productName: string) {
    const productLocator = this.page
      .locator(this.inventoryItem)
      .filter({ hasText: productName });
    await productLocator.locator(this.addToCartButton).click();
  }
}
