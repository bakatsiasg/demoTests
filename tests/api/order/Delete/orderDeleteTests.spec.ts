import { test, expect } from "@playwright/test";
import { ServiceFactory } from "../../serviceFactory";
import { OrderBuilder } from "@builders/orderBuilder";

test.describe("Order Delete Tests", () => {
  test.skip("Delete_OrderValidId_ShouldReturnOK,  skipping because api returns falty id", async ({
    request,
  }) => {
    // Arrange
    const orderService = ServiceFactory.orderService(request);
    const orderToCreate = new OrderBuilder()
      .withQuantity(2)
      .withShipDate(new Date().toISOString())
      .withStatus("placed")
      .withComplete(true)
      .build();

    const { order: createdOrder } = await orderService.createOrder(
      orderToCreate
    );
    const orderId = createdOrder.id!;

    // Act
    const { status } = await orderService.deleteOrder(orderId);

    // Assert
    expect(status).toBe(200);
  });
});
