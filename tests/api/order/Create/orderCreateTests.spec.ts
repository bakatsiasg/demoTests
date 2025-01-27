import { test, expect } from "@playwright/test";
import { ServiceFactory } from "../../serviceFactory";

test.describe("Order Create Tests", () => {
  test("Create_Order_Success", async ({ request }) => {
    // Arrange
    const orderService = ServiceFactory.orderService(request);
    const orderToCreate = {
      petId: 785412,
      quantity: 2,
      complete: false,
      status: "placed",
    };

    // Act
    const { order: createdOrder, status } = await orderService.createOrder(
      orderToCreate
    );

    // Assert
    expect(status).toBe(200);
    expect(createdOrder).toMatchObject(orderToCreate);
  });
});
