import { faker } from "@faker-js/faker";

interface Image {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: Image;
}

function createRandomProduct(): Product {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: {
      url: faker.image.urlPicsumPhotos({ width: 500 }),
      alt: faker.animal.cow(),
      width: 500,
    },
  };
}

const PRODUCTS: Product[] = faker.helpers.multiple(createRandomProduct, {
  count: 10,
});

export const productRepository = {
  all() {
    return PRODUCTS;
  },
  getById(id: string) {
    return PRODUCTS.find((product) => product.id === id);
  },
};
