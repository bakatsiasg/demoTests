import { APIRequestContext } from "@playwright/test";
import { PetService } from "src/api/services/petService";
import { OrderService } from "src/api/services/orderService";

export class ServiceFactory {
  static petService(request: APIRequestContext): PetService {
    return new PetService(request);
  }

  static orderService(request: APIRequestContext): OrderService {
    return new OrderService(request);
  }
}
