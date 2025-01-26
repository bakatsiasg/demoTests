import { Order } from "@models/order";

export class OrderBuilder {
  private order: Order;

  constructor() {
    this.order = {};
  }

  withId(id: number): OrderBuilder {
    this.order.id = id;
    return this;
  }

  withPetId(petId: number): OrderBuilder {
    this.order.petId = petId;
    return this;
  }

  withQuantity(quantity: number): OrderBuilder {
    this.order.quantity = quantity;
    return this;
  }

  withShipDate(shipDate: string): OrderBuilder {
    this.order.shipDate = shipDate;
    return this;
  }

  withStatus(status: string): OrderBuilder {
    this.order.status = status;
    return this;
  }

  withComplete(complete: boolean): OrderBuilder {
    this.order.complete = complete;
    return this;
  }

  build(): Order {
    return this.order;
  }
}
