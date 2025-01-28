import { test, expect } from "../fixture";

test.describe("Product Sorting Tests", () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.loginAsStandardUser();
    expect(await loginPage.verifyLogin()).toBeTruthy();
    await inventoryPage.goToInventoryPage();
  });

  test("ListProducts_SortByNameAsc(AtoZ)_ReturnsAscendingOrder", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortProductsByNameAscending();
    const products = await inventoryPage.fetchInventoryProducts();
    const productNames = products.map((p) => p.name);
    expect(productNames).toEqual(productNames.slice().sort());
  });

  test("ListProducts_SortByNameDesc(ZtoA)_ReturnsDescendingOrder", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortProductsByNameDescending();
    const products = await inventoryPage.fetchInventoryProducts();
    const productNames = products.map((p) => p.name);
    expect(productNames).toEqual(productNames.slice().sort().reverse());
  });

  test("ListProducts_SortByPriceAsc(LowToHigh)_ReturnsAscendingOrder", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortProductsByPriceAscending();
    const products = await inventoryPage.fetchInventoryProducts();
    const productPrices = products.map((p) => p.price);
    expect(productPrices).toEqual(productPrices.slice().sort((a, b) => a - b));
  });

  test("ListProducts_SortByPriceDesc(HighToLow)_ReturnsDescendingOrder", async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortProductsByPriceDescending();
    const products = await inventoryPage.fetchInventoryProducts();
    const productPrices = products.map((p) => p.price);
    expect(productPrices).toEqual(productPrices.slice().sort((a, b) => b - a));
  });

  test("ListProducts_SortByNameAsc_AfterPageRefresh_ReturnsAscendingOrder", async ({
    inventoryPage,
    page,
  }) => {
    await page.reload();
    const products = await inventoryPage.fetchInventoryProducts();
    const productNames = products.map((p) => p.name);
    expect(productNames).toEqual(productNames.slice().sort());
  });
});
