class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  console.log(err);
  const code = statusCode || 400;

  res.status(code).json({
    status: 'error',
    code,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
