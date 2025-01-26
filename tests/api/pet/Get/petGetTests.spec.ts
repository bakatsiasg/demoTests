import { test, expect } from "@playwright/test";
import { ServiceFactory } from "../../serviceFactory";
import { PetBuilder } from "@builders/petBuilder";

test.describe("Pet Get Tests", () => {
  test("Get_PetInvalidId_ShouldReturnNotFound", async ({ request }) => {
    // Arrange
    const petService = ServiceFactory.petService(request);

    // Act
    const { pet, status } = await petService.getPetById(0);

    // Assert
    expect(status).toBe(404);
    expect(pet).toBeNull();
  });
});
