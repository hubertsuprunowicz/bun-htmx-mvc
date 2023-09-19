import Mustache from "mustache";
import { productRepository } from "../models/Product";
import { cartRepository } from "../models/Cart";
import { NotFoundError } from "elysia";

const rootView = await Bun.file("./src/views/index.html").text();
const navigationPartial = await Bun.file(
  "./src/views/partials/navigation.html"
).text();
const productCardsPartial = await Bun.file(
  "./src/views/partials/product-cards.html"
).text();

class ProductController {
  static async index() {
    const view = await Bun.file("./src/views/contents/home.html").text();
    const data = {
      products: productRepository.all(),
      itemsInCart: cartRepository.count(),
    };
    const partials = {
      navigation: navigationPartial,
      content: view,
      productCards: productCardsPartial,
    };

    const html = Mustache.render(rootView, data, partials);
    return new Response(html, { headers: { "Content-Type": "text/html" } });
  }

  static async get(id: string) {
    const view = await Bun.file(
      "./src/views/contents/product-details.html"
    ).text();
    const partials = {
      navigation: navigationPartial,
      content: view,
    };
    const product = productRepository.getById(id);
    if (!product) {
      throw new NotFoundError();
    }

    const data = {
      product,
      itemsInCart: cartRepository.count(),
    };

    const html = Mustache.render(view, data, partials);

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  }
}

export default ProductController;
