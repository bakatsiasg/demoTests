import { test, expect } from "@playwright/test";
import { ServiceFactory } from "../../serviceFactory";

test.describe("Order Delete Tests", () => {
  test("Delete_OrderValidId_ShouldReturnOK", async ({ request }) => {
    // Arrange
    const orderService = ServiceFactory.orderService(request);

    // Create an order directly without the builder
    const orderToCreate = {
      quantity: 2,
      complete: true,
      status: "placed",
      petId: 12345,
    };

    const { order: createdOrder, status: createStatus } =
      await orderService.createOrder(orderToCreate);
    expect(createStatus).toBe(200);

    const orderId = createdOrder.id!;
    expect(orderId).toBeDefined();

    // Act
    const { success, status: deleteStatus } = await orderService.deleteOrder(
      orderId
    );

    // Assert
    expect(deleteStatus).toBe(200);
    expect(success).toBeTruthy();
  });
});
