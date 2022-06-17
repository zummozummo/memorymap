export default class NotFoundError extends Error {
  statusCode = 404;
  constructor(message) {
    super(message);
  }
  serialzeError() {
    return [{ message: this.message }];
  }
}
