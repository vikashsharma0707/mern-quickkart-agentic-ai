exports.ok = (res, data, message = "OK") => res.json({ success: true, message, data });
exports.fail = (res, code, message, data = null) =>
  res.status(code).json({ success: false, message, data });
