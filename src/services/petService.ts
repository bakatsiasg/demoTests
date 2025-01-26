import { APIRequestContext } from "@playwright/test";

export class PetService {
  constructor(private request: APIRequestContext) {}

  async createPet(pet: any) {
    return await this.request.post("/pet", {
      data: pet,
    });
  }

  async getPetById(petId: number) {
    return await this.request.get(`/pet/${petId}`);
  }

  async deletePet(petId: number) {
    return await this.request.delete(`/pet/${petId}`);
  }
}
