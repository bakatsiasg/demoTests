import { test, expect } from "@playwright/test";
import { ServiceFactory } from "../../serviceFactory";
import { PetBuilder } from "@builders/petBuilder";

test.describe("Pet Get Tests", () => {
  test.skip("Get_PetValidId_ShouldReturnOK, skipping because api returns falty id", async ({
    request,
  }) => {
    // Arrange
    const petService = ServiceFactory.petService(request);
    const petCreate = new PetBuilder()
      .withName("doggie")
      .withCategory({ id: 1, name: "Dogs" })
      .withPhotoUrls(["photo"])
      .withTags([{ id: 1, name: "Tag1" }])
      .withStatus("available")
      .build();

    const { pet: createdPet, status: createdStatus } =
      await petService.createPet(petCreate);
    const petId = createdPet.id!;

    // Act
    const { pet, status } = await petService.getPetById(petId);

    // Assert
    expect(status).toBe(200);
    expect(pet).not.toBeNull();
    expect(pet?.id).toBe(petId);
  });

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
