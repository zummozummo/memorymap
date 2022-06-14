import RequestValidationError from "../errors/request-validation-error.js";
import NotFoundError from "../errors/not-found-error.js";
import BadRequestError from "../errors/bad-request-error.js";
export const errorHandler = (err, req, res, next) => {
  if (err instanceof RequestValidationError) {
    res.status(err.statusCode).send({ errors: err.serialzeError() });
  }
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).send({ errors: err.serialzeError() });
  }
  if (err instanceof BadRequestError) {
    res.status(err.statusCode).send({ errors: err.serialzeError() });
  }
};
