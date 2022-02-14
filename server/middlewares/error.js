import ApiError from "../";
export default function (err, req, res, next) {
  if (err in ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Server error" });
}
