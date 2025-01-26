import { APIRequestContext } from "@playwright/test";
import { Order } from "@models/order";
import { ApiConfig } from "../config/apiConfig";

export class OrderService {
  constructor(private request: APIRequestContext) {}

  async createOrder(
    order: Order | null
  ): Promise<{ order: Order; status: number }> {
    const response = await this.request.post(
      `${ApiConfig.baseUrl}/store/order`,
      {
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
    const response = await this.request.delete(
      `${ApiConfig.baseUrl}/store/order/${orderId}`
    );

    return { status: response.status() };
  }
}
