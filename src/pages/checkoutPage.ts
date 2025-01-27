import { expect, Page } from "@playwright/test";
import { MenuComponent } from "src/components/menuComponent";
import { Customer } from "@models/customer";

export class CheckoutPage {
  private menuComponent: MenuComponent;

  // Selectors as properties
  private selectors = {
    finishButton: '[data-test="finish"]',
    continueButton: '[data-test="continue"]',
    cancelButton: '[data-test="cancel"]',
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    errorMessage: ".error-message-container",
    checkoutStepTwoTitle: ".title",
    totalPriceLabel: ".summary_total_label",
    confirmationMessage: ".complete-header",
  };

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async clickFinish() {
    await this.page.click(this.selectors.finishButton);
  }

  async clickContinue() {
    await this.page.click(this.selectors.continueButton);
  }

  async clickCancel() {
    await this.page.click(this.selectors.cancelButton);
  }

  async fillFirstName(firstName: Customer) {
    await this.page.fill(this.selectors.firstNameInput, firstName.FirstName);
  }

  async fillLastName(lastName: Customer) {
    await this.page.fill(this.selectors.lastNameInput, lastName.LastName);
  }

  async fillPostalCode(postalCode: Customer) {
    await this.page.fill(this.selectors.postalCodeInput, postalCode.ZipCode);
  }

  async navigate() {
    await this.menuComponent.navigateToInventory();
  }

  async assertErrorMessage(expectedMessage: string) {
    const errorMessage = await this.page.textContent(
      this.selectors.errorMessage
    );
    if (!errorMessage) {
      throw new Error("Error message container not found");
    }
    expect(errorMessage.trim()).toBe(expectedMessage);
  }

  async assertOnCheckoutStepTwo() {
    const checkoutStepTwoTitle = await this.page.textContent(
      this.selectors.checkoutStepTwoTitle
    );
    if (!checkoutStepTwoTitle) {
      throw new Error("Could not find the checkout step two title");
    }
    expect(checkoutStepTwoTitle.trim()).toBe("Checkout: Overview");
  }

  async returnTotalItemPrice(): Promise<number> {
    const totalPriceText = await this.page.textContent(
      this.selectors.totalPriceLabel
    );
    if (!totalPriceText) {
      throw new Error("Total price element not found on the page");
    }
    return parseFloat(totalPriceText.replace("Total: $", "").trim());
  }

  async assertConfirmationMessage() {
    const confirmationMessage =
      (
        await this.page.textContent(this.selectors.confirmationMessage)
      )?.trim() || "";

    expect(confirmationMessage).toBe("Thank you for your order!");
  }
}
