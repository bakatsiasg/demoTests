import { APIRequestContext } from "@playwright/test";
import { Order } from "src/api/models/order";
import { ApiConfig } from "../config/apiConfig";

export class OrderService {
  constructor(private request: APIRequestContext) {}

  async createOrder(
    order: Order | null
  ): Promise<{ order: Order; status: number }> {
    const response = await this.request.post(
      `${ApiConfig.baseUrl}/store/order`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: order,
      }
    );

    if (!response.ok()) {
      throw new Error(`Failed to create order: ${await response.text()}`);
    }

    return {
      order: (await response.json()) as Order,
      status: response.status(),
    };
  }

  async deleteOrder(orderId: number): Promise<{ status: number }> {
    const url = `${ApiConfig.baseUrl}/store/order/${orderId}`;

    const response = await this.request.delete(url);

    return { status: response.status() };
  }
}
