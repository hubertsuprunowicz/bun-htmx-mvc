import { NotFoundError } from "elysia";
import { cartRepository } from "../models/Cart";
import { productRepository } from "../models/Product";

class CartController {
  static async add(id: string) {
    const product = productRepository.getById(id);
    if (!product) {
      throw new NotFoundError();
    }
    cartRepository.insert(product);

    return cartRepository.count();
  }
}

export default CartController;
