export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || 500;
  const message =
    status === 500 ? "Something went wrong. Please try again." : err.message || "Error";

  if (status >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({
    ok: false,
    error: {
      message,
      code: err.code || "UNKNOWN",
    },
  });
}

