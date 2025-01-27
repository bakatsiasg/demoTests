import { Page } from "@playwright/test";
import { Customer } from "@models/customer";

export class LoginPage {
  private usernameInput = "#user-name";
  private passwordInput = "#password";
  private loginButton = "#login-button";
  private inventoryList = ".inventory_list";

  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto("/");
  }

  async login(customer: Customer) {
    await this.page.fill(this.usernameInput, customer.Username);
    await this.page.fill(this.passwordInput, customer.Password);
    await this.page.click(this.loginButton);
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.locator(this.inventoryList).isVisible();
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
