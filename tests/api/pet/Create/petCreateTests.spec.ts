import { test, expect } from "@playwright/test";
import { ServiceFactory } from "../../serviceFactory";
import { PetBuilder } from "@builders/petBuilder";

test.describe("Pet Create Tests", () => {
  test("Create_PetWithAllFieldsFilled_Success", async ({ request }) => {
    // Arrange
    const petService = ServiceFactory.petService(request);
    const pet = new PetBuilder()
      .withName("doggie")
      .withCategory({ id: 1, name: "Dogs" })
      .withPhotoUrls(["http://example.com/photo"])
      .withTags([{ id: 1, name: "Tag1" }])
      .withStatus("available")
      .build();

    // Act
    const { pet: createdPet, status } = await petService.createPet(pet);

    // Assert
    expect(status).toBe(200);
    expect(createdPet as Record<string, unknown>).toMatchObject(
      pet as Record<string, unknown>
    );
  });
});
