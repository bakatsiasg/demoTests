import { expect, Page } from "@playwright/test";
import { MenuComponent } from "src/components/menuComponent";
import { Customer } from "@models/customer";

export class CheckoutPage {
  private menuComponent: MenuComponent;

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async clickFinish() {
    await this.page.click('[data-test="finish"]');
  }

  async clickContinue() {
    await this.page.click('[data-test="continue"]');
  }

  async clickCancel() {
    await this.page.click('[data-test="cancel"]');
  }

  async fillFirstName(firstName: Customer) {
    await this.page.fill('[data-test="firstName"]', firstName.FirstName);
  }

  async fillLastName(lastName: Customer) {
    await this.page.fill('[data-test="lastName"]', lastName.LastName);
  }

  async fillPostalCode(postalCode: Customer) {
    await this.page.fill('[data-test="postalCode"]', postalCode.ZipCode);
  }

  async navigate() {
    await this.menuComponent.navigateToInventory();
  }

  async assertErrorMessage(expectedMessage: string) {
    const errorMessage = await this.page.textContent(
      ".error-message-container"
    );
    if (!errorMessage) {
      throw new Error("Error message container not found");
    }
    expect(errorMessage.trim()).toBe(expectedMessage);
  }

  async assertOnCheckoutStepTwo() {
    const checkoutStepTwoTitle = await this.page
      .locator(".title")
      .textContent();
    if (!checkoutStepTwoTitle) {
      throw new Error("Could not find the checkout step two title");
    }
    expect(checkoutStepTwoTitle.trim()).toBe("Checkout: Overview");
  }

  async returnTotalItemPrice(): Promise<number> {
    const totalPriceText = await this.page.textContent(".summary_total_label");
    if (!totalPriceText) {
      throw new Error("Total price element not found on the page");
    }
    return parseFloat(totalPriceText.replace("Total: $", "").trim());
  }

  async assertConfirmationMessage() {
    const confirmationMessage =
      (await this.page.textContent(".complete-header"))?.trim() || "";

    expect(confirmationMessage).toBe("Thank you for your order!");
  }
}
