import { Page } from "@playwright/test";
import { Customer } from "@models/customer";

export class LoginPage {
  // Selectors as properties
  private selectors = {
    usernameInput: "#user-name",
    passwordInput: "#password",
    loginButton: "#login-button",
    inventoryList: ".inventory_list",
  };

  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto("/");
  }

  // Accept a Customer object for login
  async login(customer: Customer) {
    await this.page.fill(this.selectors.usernameInput, customer.Username);
    await this.page.fill(this.selectors.passwordInput, customer.Password);
    await this.page.click(this.selectors.loginButton);
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.locator(this.selectors.inventoryList).isVisible();
  }

  async loginWithStandardUser() {
    const standardUser: Customer = {
      Username: "standard_user",
      Password: "secret_sauce",
      FirstName: "Standard",
      LastName: "User",
      ZipCode: "12345",
    };
    await this.navigateToLogin();
    await this.login(standardUser);
  }
}
