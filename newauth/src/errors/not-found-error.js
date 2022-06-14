export default class NotFoundError extends Error {
  statusCode = 404;
  constructor() {
    super("Route not found");
  }
  serialzeError() {
    return [{ message: "Not found" }];
  }
}
