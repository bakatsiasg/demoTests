# Project Overview

## Architecture Choices

The architecture of this project is designed to be modular, maintainable, and scalable. Here are the key components and the rationale behind their choices:

### API Layer

- **Configurations**: Centralized configuration management for API endpoints and other settings (e.g., `apiConfig.ts`).
- **Models**: Define the structure of data objects used in API interactions (e.g., `order.ts`, `pet.ts`).
- **Services**: Encapsulate the logic for interacting with different API endpoints, promoting reusability and separation of concerns (e.g., `orderService.ts`, `petService.ts`).

### UI Layer

- **Builders**: Facilitate the creation of complex objects with a fluent interface, improving readability and maintainability (e.g., `customerBuilder.ts`, `productBuilder.ts`).
- **Components**: Encapsulate reusable UI elements, promoting DRY principles (e.g., `cartComponent.ts`, `menuComponent.ts`).
- **Constants**: Store static values such as error messages, making the codebase easier to manage and update (e.g., `errorMessages.ts`).
- **Models**: Define the structure of data objects used in UI interactions (e.g., `customer.ts`, `product.ts`).
- **Pages**: Implement the Page Object Model (POM) pattern, encapsulating the interactions with specific pages of the application, promoting maintainability and readability (e.g., `loginPage.ts`, `inventoryPage.ts`, `checkoutPage.ts`).

### Tests

- **API Tests**: Validate the functionality of API endpoints, ensuring that the backend services work as expected. A `serviceFactory.ts` file was added, to centralize the creation and configuration of service objects used in API tests.
- **UI Tests**: Validate the functionality of the user interface, ensuring that the frontend behaves as expected. A `fixture.ts` file was added, to ensure that each test has access to pre-initialized instances of page and component objects, simplifying the test setup process.

## Cloning and Executing Playwright Tests

To execute the Playwright tests, use the following command:
```bash
npx playwright test
```

### Clone the Repository

```bash
git clone https://github.com/bakatsiasg/demoTests.git
```


