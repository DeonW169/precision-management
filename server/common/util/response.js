function response(res, status, message, data) {
  res.status(status);
  res.json({
    status,
    message,
    data,
  });
}

module.exports = {
  Ok(res, data) {
    response(res, 200, "Operation Successful", data);
  },
  OkNoData(res, data) {
    response(res, 200, "Request Successful - no data", data);
  },
  Created(res, data) {
    response(res, 201, "Created Successfully", data);
  },
  Partial(res, data) {
    response(res, 206, "Partial Content", data);
  },
  BadRequest(res, data) {
    response(res, 400, "Bad Request", data);
  },
  Unauthorized(res, data) {
    response(res, 401, "Unauthorized", data);
  },
  Forbidden(res, data) {
    response(res, 403, "Forbidden", data);
  },
  NotFound(res, data) {
    response(res, 404, "Not Found", data);
  },
  InternalServerError(res, data) {
    response(res, 500, "Internal Server Error", data);
  },
};
