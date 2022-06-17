export default class RequireAuth extends Error {
  statusCode = 511;
  constructor(message) {
    super(message);
  }
  serialzeError() {
    return [{ message: this.message }];
  }
}
