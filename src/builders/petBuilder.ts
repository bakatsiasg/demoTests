import { Pet, PetCategory, PetTag } from "@models/pet";

export class PetBuilder {
  private pet: Pet;

  constructor() {
    this.pet = {};
  }

  withId(id: number): PetBuilder {
    this.pet.id = id;
    return this;
  }

  withName(name: string): PetBuilder {
    this.pet.name = name;
    return this;
  }

  withCategory(category: PetCategory): PetBuilder {
    this.pet.category = category;
    return this;
  }

  withPhotoUrls(photoUrls: string[]): PetBuilder {
    this.pet.photoUrls = photoUrls;
    return this;
  }

  withTags(tags: PetTag[]): PetBuilder {
    this.pet.tags = tags;
    return this;
  }

  withStatus(status: "available" | "pending" | "sold"): PetBuilder {
    this.pet.status = status;
    return this;
  }

  build(): Pet {
    return this.pet;
  }
}
