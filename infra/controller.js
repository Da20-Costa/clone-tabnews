import { InternalServerError, MethodNotAllowedError } from "infra/errors";

function onNoMatchHandler(request, response) {
  const publicErrorObect = new MethodNotAllowedError();
  response.status(publicErrorObect.statusCode).json(publicErrorObect);
}

function onErrorHandler(error, request, response) {
  const publicErrorObect = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });

  console.error(publicErrorObect);

  response.status(publicErrorObect.statusCode).json(publicErrorObect);
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
