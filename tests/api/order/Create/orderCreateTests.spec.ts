import { test, expect } from "@playwright/test";
import { ServiceFactory } from "../../serviceFactory";
import { OrderBuilder } from "@builders/orderBuilder";

test.describe("Order Create Tests", () => {
  test("Create_OrderWithAllFieldsFilled_Success", async ({ request }) => {
    // Arrange
    const orderService = ServiceFactory.orderService(request);
    const order = new OrderBuilder()
      .withPetId(12345)
      .withQuantity(1)
      .withShipDate(new Date().toISOString())
      .withStatus("placed")
      .withComplete(true)
      .build();

    // Act
    const { order: createdOrder, status } = await orderService.createOrder(
      order
    );

    // Assert
    expect(status).toBe(200);
    const { shipDate, ...orderWithoutShipDate } = order;
    expect(createdOrder as Record<string, unknown>).toMatchObject(
      orderWithoutShipDate as Record<string, unknown>
    );
  });
});
