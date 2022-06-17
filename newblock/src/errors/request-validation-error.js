export default class RequestValidationError extends Error {
  constructor(errors) {
    super(errors);
    this.errors = errors;
    this.statusCode = 400;
  }
  serialzeError() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.par };
    });
  }
}
