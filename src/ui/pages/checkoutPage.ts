import { expect, Page } from "@playwright/test";
import { MenuComponent } from "src/ui/components/menuComponent";
import { Customer } from "src/ui/models/customer";

export class CheckoutPage {
  private menuComponent: MenuComponent;
  private finishButton = '[data-test="finish"]';
  private continueButton = '[data-test="continue"]';
  private cancelButton = '[data-test="cancel"]';
  private firstNameInput = '[data-test="firstName"]';
  private lastNameInput = '[data-test="lastName"]';
  private postalCodeInput = '[data-test="postalCode"]';
  private errorMessage = ".error-message-container";
  private checkoutStepTwoTitle = ".title";
  private totalPriceLabel = ".summary_total_label";
  private confirmationMessage = ".complete-header";

  constructor(private page: Page) {
    this.menuComponent = new MenuComponent(page);
  }

  async completeCheckout() {
    await this.page.click(this.finishButton);
  }

  async proceedToNextStep() {
    await this.page.click(this.continueButton);
  }

  async cancelCheckout() {
    await this.page.click(this.cancelButton);
  }

  async enterFirstName(firstName: Customer) {
    await this.page.fill(this.firstNameInput, firstName.FirstName);
  }

  async enterLastName(lastName: Customer) {
    await this.page.fill(this.lastNameInput, lastName.LastName);
  }

  async enterPostalCode(postalCode: Customer) {
    await this.page.fill(this.postalCodeInput, postalCode.ZipCode);
  }

  async goToCheckoutPage() {
    await this.menuComponent.navigateToInventory();
  }

  async verifyErrorMessage(expectedMessage: string) {
    const errorMessage = await this.page.textContent(this.errorMessage);
    if (!errorMessage) {
      throw new Error("Error message container not found");
    }
    expect(errorMessage.trim()).toBe(expectedMessage);
  }

  async verifyOnOverviewStep() {
    const checkoutStepTwoTitle = await this.page.textContent(
      this.checkoutStepTwoTitle
    );
    if (!checkoutStepTwoTitle) {
      throw new Error("Could not find the checkout step two title");
    }
    expect(checkoutStepTwoTitle.trim()).toBe("Checkout: Overview");
  }

  async getTotalItemPrice(): Promise<number> {
    const totalPriceText = await this.page.textContent(this.totalPriceLabel);
    if (!totalPriceText) {
      throw new Error("Total price element not found on the page");
    }
    return parseFloat(totalPriceText.replace("Total: $", "").trim());
  }

  async verifyOrderConfirmation() {
    const confirmationMessage =
      (await this.page.textContent(this.confirmationMessage))?.trim() || "";

    expect(confirmationMessage).toBe("Thank you for your order!");
  }
}
