import { faker } from "@faker-js/faker";
import { Customer } from "@models/customer";

export class CustomerBuilder {
  private customer: Customer;

  constructor() {
    this.customer = {
      Username: faker.internet.username(),
      Password: faker.internet.password(),
      FirstName: faker.person.firstName(),
      LastName: faker.person.lastName(),
      ZipCode: faker.location.zipCode(),
    };
  }

  withUsername(name: string): CustomerBuilder {
    this.customer.Username = name;
    return this;
  }

  withPassword(password: string): CustomerBuilder {
    this.customer.Password = password;
    return this;
  }

  withFirstName(firstName: string): CustomerBuilder {
    this.customer.FirstName = firstName;
    return this;
  }

  withLastName(lastName: string): CustomerBuilder {
    this.customer.LastName = lastName;
    return this;
  }

  withZipPostalCode(zipCode: string): CustomerBuilder {
    this.customer.ZipCode = zipCode;
    return this;
  }

  build(): Customer {
    return this.customer;
  }
}
