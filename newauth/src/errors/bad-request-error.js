//general purpose error
export default class BadRequestError extends Error {
  statusCode = 400;
  constructor(message) {
    super(message);
  }
  serialzeError() {
    return [{ message: this.message }];
  }
}
