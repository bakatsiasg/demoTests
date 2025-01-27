import { Page } from "@playwright/test";

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

  async login(username: string, password: string) {
    await this.page.fill(this.selectors.usernameInput, username);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.loginButton);
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.locator(this.selectors.inventoryList).isVisible();
  }

  async loginWithStandardUser() {
    await this.navigateToLogin();
    await this.login("standard_user", "secret_sauce");
  }
}
