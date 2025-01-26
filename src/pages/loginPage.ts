import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.locator(".inventory_list").isVisible();
  }

  async loginWithStandardUser() {
    await this.navigateToLogin();
    await this.login("standard_user", "secret_sauce");
  }
}
