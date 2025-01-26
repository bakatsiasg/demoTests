import { APIRequestContext } from "@playwright/test";
import { Pet } from "@models/pet";
import { ApiConfig } from "../config/apiConfig";

export class PetService {
  constructor(private request: APIRequestContext) {}

  async createPet(pet: Pet | null): Promise<{ pet: Pet; status: number }> {
    const response = await this.request.post(`${ApiConfig.baseUrl}/pet`, {
      data: pet,
    });

    if (!response.ok()) {
      throw new Error(`Failed to create pet: ${await response.text()}`);
    }

    return {
      pet: (await response.json()) as Pet,
      status: response.status(),
    };
  }

  async getPetById(
    petId: number
  ): Promise<{ pet: Pet | null; status: number }> {
    const response = await this.request.get(
      `${ApiConfig.baseUrl}/pet/${petId}`
    );

    if (response.status() === 404) {
      return { pet: null, status: 404 }; // Pet not found
    }

    if (!response.ok()) {
      throw new Error(`Failed to fetch pet: ${await response.text()}`);
    }

    return { pet: (await response.json()) as Pet, status: response.status() };
  }
}
