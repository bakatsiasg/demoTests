import { test, expect } from "@playwright/test";
import { ServiceFactory } from "../../serviceFactory";
import { faker } from "@faker-js/faker";

test.describe("Order Delete Tests", () => {
  test("Delete_OrderValidId_ShouldReturnOK", async ({ request }) => {
    // Arrange
    const orderService = ServiceFactory.orderService(request);

    // Create an order directly without the builder
    const orderToCreate = {
      id: faker.number.int({ min: 100000000, max: 999999999 }),
      quantity: faker.number.int({ min: 1, max: 9 }),
      petId: faker.number.int({ min: 1, max: 999999999 }),
      complete: true,
      status: faker.helpers.arrayElement(["placed", "complete"]),
    };

    const { order: createdOrder, status: createStatus } =
      await orderService.createOrder(orderToCreate);
    expect(createStatus).toBe(200);

    const orderId = createdOrder.id!;
    expect(orderId).toBeDefined();

    // Act
    const { status: deleteStatus } = await orderService.deleteOrder(orderId);

    // Assert
    expect(deleteStatus).toBe(200);
  });
});
