import { test, expect } from "@playwright/test";
import { ServiceFactory } from "../../serviceFactory";

test.describe("Pet Create Tests", () => {
  test("Create_Pet_Success", async ({ request }) => {
    // Arrange
    const petService = ServiceFactory.petService(request);
    const petToCreate = {
      name: "doggie",
      status: "available",
    };

    // Act
    const { pet: createdPet, status } = await petService.createPet(petToCreate);

    // Assert
    expect(status).toBe(200);
    expect(createdPet).toMatchObject(petToCreate);
  });
});
