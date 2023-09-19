import Mustache from "mustache";

class ErrorController {
  static async notFound() {
    const html = Mustache.render("<h1>Not found :(</h1>", null);
    return new Response(html, { headers: { "Content-Type": "text/html" } });
  }
}

export default ErrorController;
