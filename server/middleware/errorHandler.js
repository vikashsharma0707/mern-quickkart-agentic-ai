module.exports = (err, _req, res, _next) => {
  console.error("[err]", err.message);
  const code = err.status || 500;
  res.status(code).json({ success: false, message: err.message || "Server error" });
};
