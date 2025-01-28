import { faker } from "@faker-js/faker";
import { Product } from "src/ui/models/product";

export class ProductBuilder {
  private product: Product;

  constructor() {
    this.product = {
      id: faker.number.int(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
    };
  }

  withName(name: string): ProductBuilder {
    this.product.name = name;
    return this;
  }

  withDescription(description: string): ProductBuilder {
    this.product.description = description;
    return this;
  }

  withPrice(price: number): ProductBuilder {
    this.product.price = price;
    return this;
  }

  build(): Product {
    return this.product;
  }
}
